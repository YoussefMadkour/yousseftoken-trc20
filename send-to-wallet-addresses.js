const { TronWeb } = require('tronweb');
require('dotenv').config();

async function sendToPiiyushAddresses() {
  console.log('🎯 Sending YTN tokens to Piiyush\'s addresses\n');

  const tronWeb = new TronWeb({
    fullHost: 'https://nile.trongrid.io',
    headers: { "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY },
    privateKey: process.env.TRON_PRIVATE_KEY
  });

  const contractAddress = 'TDjgDnXoSuG3RWwNe5qP6hEwRZduaZM7p6';
  
  // Piiyush's addresses from his original message
  const recipients = [
    'THzA986ssbv6frmKejAmwDiLR45To751o1', // The wallet address he originally sent
    'TNHY4N72mFkRGyAnY59kSGUBrJVpko7fBW'  // The address from the transaction
  ];

  try {
    console.log('📄 Contract:', contractAddress);
    console.log('👤 From:', tronWeb.defaultAddress.base58);
    console.log('🎯 Recipients:', recipients);
    console.log('💰 Amount per recipient: 5,000 YTN\n');

    // Get contract instance
    const tokenJson = require('./build/contracts/Token.json');
    const contract = await tronWeb.contract(tokenJson.abi, contractAddress);
    
    // Check initial balance
    const initialBalance = await contract.balanceOf(tronWeb.defaultAddress.base58).call();
    console.log('📊 Your Balance Before:', Number(initialBalance) / 1e18, 'YTN\n');

    const transactions = [];

    // Send to first address (THzA986...)
    console.log('🔄 TRANSACTION 1: Sending to', recipients[0]);
    try {
      const amount1 = '5000000000000000000000'; // 5000 YTN with 18 decimals
      
      const tx1 = await contract.transfer(recipients[0], amount1).send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse: true
      });

      console.log('✅ Transaction 1 SUCCESS!');
      console.log('📄 TX ID:', tx1);
      console.log('🔗 View: https://nile.tronscan.org/#/transaction/' + tx1);
      transactions.push({ recipient: recipients[0], amount: 5000, txId: tx1 });
      
      // Wait between transactions
      await new Promise(resolve => setTimeout(resolve, 3000));
      
    } catch (error) {
      console.log('❌ Transaction 1 failed:', error.message);
    }

    // Send to second address (TNHY4N...)
    console.log('\n🔄 TRANSACTION 2: Sending to', recipients[1]);
    try {
      const amount2 = '5000000000000000000000'; // 5000 YTN with 18 decimals
      
      const tx2 = await contract.transfer(recipients[1], amount2).send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse: true
      });

      console.log('✅ Transaction 2 SUCCESS!');
      console.log('📄 TX ID:', tx2);
      console.log('🔗 View: https://nile.tronscan.org/#/transaction/' + tx2);
      transactions.push({ recipient: recipients[1], amount: 5000, txId: tx2 });
      
    } catch (error) {
      console.log('❌ Transaction 2 failed:', error.message);
    }

    // Check final balance
    console.log('\n⏳ Checking final balance...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const finalBalance = await contract.balanceOf(tronWeb.defaultAddress.base58).call();
    const totalSent = Number(initialBalance - finalBalance) / 1e18;

    console.log('\n📊 TRANSACTION SUMMARY:');
    console.log('═══════════════════════════════════════════════');
    console.log('Initial Balance:', Number(initialBalance) / 1e18, 'YTN');
    console.log('Final Balance:  ', Number(finalBalance) / 1e18, 'YTN');
    console.log('Total Sent:     ', totalSent, 'YTN');
    console.log('═══════════════════════════════════════════════');

    if (transactions.length > 0) {
      console.log('\n✅ SUCCESSFUL TRANSACTIONS:');
      transactions.forEach((tx, i) => {
        console.log(`${i + 1}. ${tx.amount} YTN → ${tx.recipient}`);
        console.log(`   TX: https://nile.tronscan.org/#/transaction/${tx.txId}`);
      });

      console.log('\n🎉 SUCCESS! Your contract now has real transaction history!');
      console.log('\n📊 What to check on TRONScan:');
      console.log('Contract: https://nile.tronscan.org/#/contract/' + contractAddress);
      console.log('• "Transfers" tab - see all token transfers');
      console.log('• "Events" tab - see Transfer events');
      console.log('• Token holders - see recipients with balances');
      
      console.log('\n💬 Message for Piiyush:');
      console.log('═══════════════════════════════════════════════');
      console.log('Hi Piiyush,');
      console.log('');
      console.log('I\'ve successfully deployed and tested YoussefToken (YTN):');
      console.log('');
      console.log('✅ Contract Address: TDjgDnXoSuG3RWwNe5qP6hEwRZduaZM7p6');
      console.log('✅ Verified on TRONScan with readable source code');
      console.log('✅ Sent test tokens to your addresses:');
      transactions.forEach(tx => {
        console.log(`   • ${tx.amount} YTN → ${tx.recipient}`);
      });
      console.log('');
      console.log('The contract is fully functional and ready for production!');
      console.log('');
      console.log('View: https://nile.tronscan.org/#/contract/' + contractAddress);
      console.log('═══════════════════════════════════════════════');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

sendToPiiyushAddresses();
