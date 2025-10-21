const { TronWeb } = require('tronweb');
require('dotenv').config();

async function sendYTNTokens() {
  console.log('💸 Send YTN Tokens\n');

  const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io',
    headers: { "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY },
    privateKey: process.env.TRON_PRIVATE_KEY
  });

  const contractAddress = 'TDjgDnXoSuG3RWwNe5qP6hEwRZduaZM7p6';
  
  // CHANGE THESE VALUES:
  const recipient = 'TKVqXdXBXP5R3kNnkiNViJmuY4Y8nrJRTA'; // Your wallet address (safe test)
  const amount = 1000; // Amount of YTN to send

  try {
    console.log('📄 Contract:', contractAddress);
    console.log('👤 From:', tronWeb.defaultAddress.base58);
    console.log('👥 To:', recipient);
    console.log('💰 Amount:', amount, 'YTN\n');

    // Get contract instance
    const tokenJson = require('./build/contracts/Token.json');
    const contract = await tronWeb.contract(tokenJson.abi, contractAddress);
    
    // Check balance before
    const balanceBefore = await contract.balanceOf(tronWeb.defaultAddress.base58).call();
    console.log('📊 Your Balance Before:', Number(balanceBefore) / 1e18, 'YTN');

    // Convert amount to proper format (18 decimals)
    const amountWei = '1000000000000000000000'; // 1000 YTN with 18 decimals
    
    console.log('\n⏳ Sending transaction...');
    
    const txId = await contract.transfer(recipient, amountWei).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: true
    });

    console.log('\n✅ SUCCESS! Transaction completed!');
    console.log('📄 Transaction ID:', txId);
    console.log('🔗 View on TRONScan:');
    console.log('https://nile.tronscan.org/#/transaction/' + txId);

    // Wait for confirmation
    console.log('\n⏳ Waiting for confirmation...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Check balance after
    const balanceAfter = await contract.balanceOf(tronWeb.defaultAddress.base58).call();
    console.log('\n📊 RESULTS:');
    console.log('Balance Before:', Number(balanceBefore) / 1e18, 'YTN');
    console.log('Balance After: ', Number(balanceAfter) / 1e18, 'YTN');
    console.log('Tokens Sent:   ', Number(balanceBefore - balanceAfter) / 1e18, 'YTN');

    console.log('\n🎉 Transfer successful!');

  } catch (error) {
    console.error('\n❌ Transfer failed:', error.message);
    console.log('\n💡 Make sure to:');
    console.log('1. Replace ENTER_RECIPIENT_ADDRESS_HERE with a real TRON address');
    console.log('2. Have enough TRX for transaction fees');
    console.log('3. Check that your .env file has the correct private key');
  }
}

// Ready to run! This will send 1000 YTN to your own wallet (safe test)
sendYTNTokens();
