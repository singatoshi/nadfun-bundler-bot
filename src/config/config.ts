import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  privateKeys: process.env.PRIVATE_KEYS?.split(',') || [],
  rpcUrl: process.env.RPC_URL || 'https://monad-testnet.rpc.example.com',
  nadfunContract: process.env.NADFUN_CONTRACT || '0x123...NadfunAddress',
  bondingCurveFundAmount: parseFloat(process.env.BONDING_CURVE_FUND_AMOUNT || '0.1'),
  numWallets: parseInt(process.env.NUM_WALLETS || '5'),
  stealthDelay: parseInt(process.env.STEALTH_DELAY || '10000'),
};