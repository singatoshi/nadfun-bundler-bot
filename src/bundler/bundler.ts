import { ethers } from 'ethers';
import { config } from './config';
import { WalletManager } from './utils/walletManager';

const NADFUN_ABI = [
  // Simplified ABI for Nadfun launchpad - adjust based on actual contract
  'function launchToken(string name, string symbol, uint256 supply) external returns (address token)',
  'function fundBondingCurve(address token, uint256 amount) external',
  'event TokenLaunched(address indexed token, address indexed launcher)',
];

export class NadfunBundler {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  private walletManager: WalletManager;
  private masterWallet: ethers.Wallet;

  constructor(masterPrivateKey: string) {
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);
    this.masterWallet = new ethers.Wallet(masterPrivateKey.trim(), this.provider);
    this.contract = new ethers.Contract(config.nadfunContract, NADFUN_ABI, this.masterWallet);
    this.walletManager = new WalletManager();
  }

  async launchAndFundToken(name: string, symbol: string, supply: bigint): Promise<string> {
    console.log(`Launching token: ${name} (${symbol})`);
    
    // Step 1: Launch token
    const launchTx = await this.contract.launchToken(name, symbol, supply);
    const receipt = await launchTx.wait();
    const tokenAddress = receipt?.logs[0]?.topics[1] || ''; // Parse from event
    const tokenAddr = ethers.getAddress(tokenAddress);
    console.log(`Token launched: ${tokenAddr}`);

    // Step 2: Fund bonding curve
    const fundAmount = ethers.parseEther(config.bondingCurveFundAmount.toString());
    const fundTx = await this.contract.fundBondingCurve(tokenAddr, fundAmount);
    await fundTx.wait();
    console.log(`Funded bonding curve with ${config.bondingCurveFundAmount} ETH`);

    // Step 3: Distribute funds to trading wallets (stealth)
    const totalDist = fundAmount * BigInt(2); // Example: Distribute double for trades
    const perWallet = totalDist / BigInt(this.walletManager.getWallets().length);
    await this.walletManager.distributeFunds(this.masterWallet, perWallet);

    return tokenAddr;
  }
}