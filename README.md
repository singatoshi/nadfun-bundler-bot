# Nadfun Bundler

A bundler bot for the Monad chain that automates token launches and bonding curve funding on the Nadfun launchpad platform.

## Overview

Nadfun Bundler streamlines the process of launching tokens and funding their bonding curves. It manages multiple wallets with stealth delays between transactions to minimize detection risk, and provides comprehensive logging with timestamps for all operations.

## Features

- **Automated Token Launching**: Launch tokens directly through the Nadfun launchpad contract
- **Bonding Curve Funding**: Automatically fund bonding curves with configurable ETH amounts
- **Multi-Wallet Management**: Distribute funds across multiple wallets with configurable delays
- **Stealth Mode**: Configurable delays between wallet transactions to avoid detection
- **Timestamp Logging**: All operations logged with ISO 8601 timestamps for audit trails
- **Error Handling**: Comprehensive error handling and reporting

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Nadfun-Bundler
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env-example .env
```

## Configuration

Edit `.env` with your settings:

```env
PRIVATE_KEYS=0xYourMasterPrivateKey,0xWallet1PrivateKey,0xWallet2PrivateKey
RPC_URL=https://monad-testnet.rpc.example.com
NADFUN_CONTRACT=0xNadfunLaunchpadAddress
BONDING_CURVE_FUND_AMOUNT=0.1
NUM_WALLETS=5
STEALTH_DELAY=10000
```

### Configuration Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `PRIVATE_KEYS` | Comma-separated private keys (first is master key) | Required |
| `RPC_URL` | Monad chain RPC endpoint | https://monad-testnet.rpc.example.com |
| `NADFUN_CONTRACT` | Nadfun launchpad contract address | 0x123...NadfunAddress |
| `BONDING_CURVE_FUND_AMOUNT` | ETH to fund per token | 0.1 |
| `NUM_WALLETS` | Number of wallets to use for distribution | 5 |
| `STEALTH_DELAY` | Delay (ms) between wallet transactions | 10000 |

## Usage

Run the bundler:

```bash
npm start
```

This will:
1. Launch a token with the configured name, symbol, and supply
2. Fund the token's bonding curve with the specified ETH amount
3. Distribute funds to trading wallets with stealth delays
4. Log all operations with timestamps

## Project Structure

```
Nadfun-Bundler/
├── src/
│   ├── bundler/
│   │   └── bundler.ts         # Core bundler logic
│   ├── config/
│   │   └── config.ts          # Configuration management
│   ├── utils/
│   │   ├── logger.ts          # Timestamp-based logging
│   │   └── walletmanager.ts   # Multi-wallet management
│   └── main.ts                # Entry point
├── package.json
├── tsconfig.json
├── .env-example
└── README.md
```

## API Reference

### NadfunBundler

Main bundler class for token operations.

#### `constructor(masterPrivateKey: string)`
Initialize bundler with master wallet private key.

#### `launchAndFundToken(name: string, symbol: string, supply: bigint): Promise<string>`
Launch a token and fund its bonding curve.

**Parameters:**
- `name`: Token name
- `symbol`: Token symbol
- `supply`: Total token supply

**Returns:** Token contract address

### WalletManager

Manages multiple wallets for fund distribution.

#### `getBalance(address: string): Promise<bigint>`
Get wallet balance in wei.

#### `distributeFunds(masterWallet: ethers.Wallet, amountPerWallet: bigint): Promise<void>`
Distribute funds from master wallet to all managed wallets with stealth delays.

### Logger

Provides timestamp-based logging for all operations.

#### Methods
- `info(message: string): void` - Log info messages
- `warn(message: string): void` - Log warnings
- `error(message: string): void` - Log errors
- `debug(message: string): void` - Log debug messages

All log messages include ISO 8601 timestamps.

## Dependencies

- **ethers**: v6.15.0 - Ethereum library for blockchain interactions
- **chalk**: v5.6.2 - Terminal string styling
- **axios**: v1.13.2 - HTTP client for API requests
- **ws**: v8.18.3 - WebSocket client
- **bip39**: v3.1.0 - BIP39 seed phrase utility
- **express**: v5.1.0 - Web framework
- **typescript**: v5.9.3 - TypeScript compiler

## Security Considerations

⚠️ **Important**: Keep your private keys secure. Never commit `.env` files or private keys to version control.

- Use environment variables for all sensitive data
- Consider using hardware wallets for master keys in production
- The stealth delay feature helps minimize detection risk
- Always validate contract addresses before execution

## License

ISC
