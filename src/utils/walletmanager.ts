import { ethers } from 'ethers';
import { config } from '../config';

export class WalletManager {
  private wallets: ethers.Wallet[];
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);
    this.wallets = config.privateKeys.slice(0, config.numWallets).map(
      (key) => new ethers.Wallet(key.trim(), this.provider)
    );
  }

  async getBalance(address: string): Promise<bigint> {
    return this.provider.getBalance(address);
  }

  async distributeFunds(masterWallet: ethers.Wallet, amountPerWallet: bigint): Promise<void> {
    for (let i = 0; i < this.wallets.length; i++) {
      const tx = await masterWallet.sendTransaction({
        to: await this.wallets[i].getAddress(),
        value: amountPerWallet,
      });
      await tx.wait();
      console.log(`Distributed to wallet ${i + 1}: ${ethers.formatEther(amountPerWallet)} ETH`);
      // Stealth mode: Delay to avoid detection
      if (i < this.wallets.length - 1) {
        await new Promise(resolve => setTimeout(resolve, config.stealthDelay));
      }
    }
  }

  getWallets(): ethers.Wallet[] {
    return this.wallets;
  }
}