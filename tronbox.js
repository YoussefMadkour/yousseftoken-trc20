try {
  require('dotenv').config({ path: './.env' });
} catch(e) {
  // dotenv already loaded
}

module.exports = {
  networks: {
    development: {
      // For development/testing on local node
      privateKey: process.env.PRIVATE_KEY_DEV || 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0',
      userFeePercentage: 100,
      feeLimit: 1000 * 1e6,
      fullHost: 'http://127.0.0.1:9090',
      network_id: '9'
    },
    nile: {
      // TRON Nile Testnet
      privateKey: process.env.TRON_PRIVATE_KEY,
      userFeePercentage: 100,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://nile.trongrid.io',
      network_id: '3',
      headers: { "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY }
    },
    mainnet: {
      // TRON Mainnet (DO NOT USE UNTIL READY!)
      privateKey: process.env.TRON_PRIVATE_KEY_MAINNET,
      userFeePercentage: 100,
      feeLimit: 1000 * 1e6,
      fullHost: 'https://api.trongrid.io',
      network_id: '1'
    }
  },
  compilers: {
    solc: {
      version: '0.5.10',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
  // Specify contracts directory
  contracts_directory: './TRC20-Token-Template',
  contracts_build_directory: './build/contracts'
};

