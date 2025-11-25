import { config } from './config';
import { NadfunBundler } from './bundler';

async function main() {
  if (config.privateKeys.length === 0) {
    throw new Error('No private keys provided in .env');
  }

  const bundler = new NadfunBundler(config.privateKeys[0]); // Master key

  try {
    // Example: Launch a token
    const tokenAddress = await bundler.launchAndFundToken(
      'TestToken',
      'TTK',
      ethers.parseEther('1000000') // 1M supply
    );
    console.log(`Bundling complete. Token: ${tokenAddress}`);
  } catch (error) {
    console.error('Error in bundling:', error);
  }
}

main().catch(console.error);