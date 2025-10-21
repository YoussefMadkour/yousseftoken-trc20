# YoussefToken (YTN) - TRC20 Smart Contract

A secure, verified TRC20 token deployed on the TRON blockchain with complete functionality and professional documentation.

## 🚀 Live Contract

**Contract Address**: `TDjgDnXoSuG3RWwNe5qP6hEwRZduaZM7p6`  
**Network**: TRON Nile Testnet  
**Explorer**: [View on TRONScan](https://nile.tronscan.org/#/contract/TDjgDnXoSuG3RWwNe5qP6hEwRZduaZM7p6)

## 📊 Token Details

- **Name**: YoussefToken
- **Symbol**: YTN
- **Decimals**: 18
- **Total Supply**: 10,000,000,000 YTN
- **Standard**: TRC20 (TRON's ERC20 equivalent)
- **Status**: ✅ Verified and Live

## 🛠️ Features

- ✅ **Secure**: Based on OpenZeppelin standards
- ✅ **Verified**: Source code verified on TRONScan
- ✅ **Fixed Supply**: No additional minting possible
- ✅ **Standard Compliant**: Full TRC20 compatibility
- ✅ **Cross-Chain Ready**: Same code works on Ethereum/BSC/Polygon
- ✅ **Professional**: Production-ready with proper documentation

## 🏗️ Project Structure

```
├── TRC20-Token-Template/     # Smart contract source files
│   ├── Token.sol            # Main token contract
│   ├── TRC20.sol            # Core TRC20 implementation
│   ├── ITRC20.sol           # TRC20 interface
│   ├── TRC20Detailed.sol    # Token metadata
│   └── SafeMath.sol         # Arithmetic safety
├── Token_Flattened.sol      # Single-file version for verification
├── tron-deploy.js           # Deployment script
├── send-to-wallet-addresses.js  # Transaction testing script
├── tronbox.js               # TronBox configuration
└── migrations/              # Deployment migrations
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- TronLink wallet
- TRON testnet TRX (from [faucet](https://nileex.io))

### Installation

```bash
git clone <repository-url>
cd verify-contract
npm install
```

### Environment Setup

Create a `.env` file:

```env
TRON_PRIVATE_KEY=your_private_key_here
TRONGRID_API_KEY=your_api_key_here
TRON_WALLET_ADDRESS=your_wallet_address_here
```

### Deployment

```bash
# Compile contracts
tronbox compile

# Deploy to Nile testnet
tronbox migrate --network nile --reset

# Or use the custom deployment script
node tron-deploy.js
```

## 🧪 Testing

Test token transfers:

```bash
node send-to-piiyush-addresses.js
```

This script demonstrates:
- Token transfer functionality
- Balance checking
- Transaction creation
- Event emission

## 📋 Contract Functions

### Standard TRC20 Functions

- `name()` - Returns token name
- `symbol()` - Returns token symbol  
- `decimals()` - Returns decimal places (18)
- `totalSupply()` - Returns total token supply
- `balanceOf(address)` - Returns balance of an address
- `transfer(to, amount)` - Transfer tokens
- `approve(spender, amount)` - Approve spending allowance
- `transferFrom(from, to, amount)` - Transfer from approved allowance
- `allowance(owner, spender)` - Check approved allowance

### Additional Functions

- `increaseAllowance(spender, amount)` - Safely increase allowance
- `decreaseAllowance(spender, amount)` - Safely decrease allowance

## 🔐 Security Features

- **SafeMath**: All arithmetic operations protected from overflow/underflow
- **Zero Address Checks**: Prevents transfers to/from zero address
- **Standard Compliance**: Follows TRC20/ERC20 specifications exactly
- **No Owner Functions**: No privileged access or backdoors
- **Fixed Supply**: Total supply set at deployment, no minting possible
- **Verified Source**: Code verified on TRONScan for transparency

## 🌐 Network Configuration

### TRON Nile Testnet
- **RPC**: https://nile.trongrid.io
- **Explorer**: https://nile.tronscan.org
- **Faucet**: https://nileex.io

### TRON Mainnet (Production)
- **RPC**: https://api.trongrid.io  
- **Explorer**: https://tronscan.org
- **Cost**: ~500-1000 TRX for deployment

## 📈 Usage Examples

### Web3 Integration

```javascript
const { TronWeb } = require('tronweb');

const tronWeb = new TronWeb({
  fullHost: 'https://nile.trongrid.io',
  privateKey: 'your_private_key'
});

const contract = await tronWeb.contract(abi, contractAddress);

// Check balance
const balance = await contract.balanceOf(address).call();

// Transfer tokens
await contract.transfer(recipient, amount).send();
```

### TronLink Integration

```javascript
// Check if TronLink is available
if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
  const contract = await window.tronWeb.contract(abi, contractAddress);
  // Interact with contract
}
```

## 🔧 Development

### Compile Contracts

```bash
tronbox compile
```

### Deploy to Different Networks

```bash
# Nile Testnet
tronbox migrate --network nile

# Mainnet (production)
tronbox migrate --network mainnet
```

### Verify Contract

Use `Token_Flattened.sol` for verification on TRONScan:

1. Go to contract page on TRONScan
2. Click "Verify Contract"
3. Upload `Token_Flattened.sol`
4. Set compiler version: 0.5.10
5. Enable optimization: 200 runs

## 📊 Technical Specifications

- **Solidity Version**: 0.5.10
- **Optimization**: Enabled (200 runs)
- **License**: MIT
- **Dependencies**: OpenZeppelin-inspired contracts
- **Gas Efficiency**: Optimized for low transaction costs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Contract**: [TRONScan](https://nile.tronscan.org/#/contract/TDjgDnXoSuG3RWwNe5qP6hEwRZduaZM7p6)
- **TRON Documentation**: [developers.tron.network](https://developers.tron.network/)
- **TronBox**: [tronbox.tronweb3.com](https://tronbox.tronweb3.com/)

## 👨‍💻 Author

**Youssef Madkour**  
Smart Contract & Web3 Developer

---

*Built with ❤️ for the TRON ecosystem*
