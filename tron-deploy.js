const { TronWeb } = require('tronweb');
const fs = require('fs');
require('dotenv').config();

async function deploy() {
  console.log('🚀 Starting TRON deployment...\n');

  // Initialize TronWeb
  const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io',
    headers: { "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY },
    privateKey: process.env.TRON_PRIVATE_KEY
  });

  console.log('📍 Connected to TRON Nile Testnet');
  console.log('👤 Deployer address:', tronWeb.defaultAddress.base58);
  
  // Check balance
  const balance = await tronWeb.trx.getBalance(tronWeb.defaultAddress.base58);
  console.log('💰 Balance:', tronWeb.fromSun(balance), 'TRX\n');

  if (balance === 0) {
    console.log('❌ No TRX balance! Get testnet TRX from: https://nileex.io');
    process.exit(1);
  }

  // Read compiled contract
  console.log('📦 Loading compiled contract...');
  const tokenJson = JSON.parse(fs.readFileSync('./build/contracts/Token.json'));
  
  console.log('⏳ Deploying YoussefToken contract...');
  console.log('   This may take 30-60 seconds...\n');

  try {
    // Deploy contract
    const contract = await tronWeb.contract().new({
      abi: tokenJson.abi,
      bytecode: tokenJson.bytecode,
      feeLimit: 1000_000_000,
      callValue: 0,
      userFeePercentage: 100,
      originEnergyLimit: 10_000_000
    });

    console.log('\n✅ SUCCESS! YoussefToken deployed to TRON!');
    console.log('═══════════════════════════════════════════════');
    console.log('📄 Contract Address:', contract.address);
    console.log('═══════════════════════════════════════════════');

    // Wait a bit for contract to be indexed
    console.log('\n⏳ Waiting for contract to be indexed...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Get token details
    console.log('📊 Fetching token information...\n');
    
    const name = await contract.name().call();
    const symbol = await contract.symbol().call();
    const decimals = await contract.decimals().call();
    const totalSupply = await contract.totalSupply().call();
    const balance = await contract.balanceOf(tronWeb.defaultAddress.base58).call();

    console.log('📊 Token Information:');
    console.log('─────────────────────────────────────────────');
    console.log('Token Name:      ', name);
    console.log('Token Symbol:    ', symbol);
    console.log('Decimals:        ', decimals.toString());
    console.log('Total Supply:    ', Number(totalSupply) / 1e18 + ' ' + symbol);
    console.log('Your Balance:    ', Number(balance) / 1e18 + ' ' + symbol);
    console.log('─────────────────────────────────────────────');

    console.log('\n🔗 View on TRONScan:');
    console.log('https://nile.tronscan.org/#/contract/' + contract.address);
    
    console.log('\n💾 SAVE THIS INFORMATION:');
    console.log('Contract Address:', contract.address);
    console.log('Network: TRON Nile Testnet');
    console.log('Deployer:', tronWeb.defaultAddress.base58);
    
    console.log('\n🎉 Deployment complete!');

    // Save deployment info
    const deploymentInfo = {
      network: 'TRON Nile Testnet',
      contractAddress: contract.address,
      deployer: tronWeb.defaultAddress.base58,
      tokenName: name,
      tokenSymbol: symbol,
      decimals: decimals.toString(),
      totalSupply: totalSupply.toString(),
      deployedAt: new Date().toISOString(),
      tronscanUrl: 'https://nile.tronscan.org/#/contract/' + contract.address
    };

    fs.writeFileSync(
      './TRON_DEPLOYMENT_INFO.json',
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log('\n📄 Deployment info saved to TRON_DEPLOYMENT_INFO.json');

  } catch (error) {
    console.error('\n❌ Deployment failed:');
    console.error(error.message || error);
    process.exit(1);
  }
}

deploy();

