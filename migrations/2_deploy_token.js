const Token = artifacts.require("Token");

module.exports = function(deployer, network, accounts) {
  console.log("\n🚀 Deploying YoussefToken (YTN) to TRON...");
  console.log("📍 Network:", network);
  console.log("👤 Deployer:", accounts[0]);
  
  deployer.deploy(Token).then(async () => {
    console.log("\n✅ SUCCESS! YoussefToken deployed to TRON!");
    console.log("═══════════════════════════════════════════════");
    console.log("📄 Contract Address:", Token.address);
    console.log("═══════════════════════════════════════════════");
    
    // Get token instance
    const token = await Token.deployed();
    
    // Get token details
    const name = await token.name();
    const symbol = await token.symbol();
    const decimals = await token.decimals();
    const totalSupply = await token.totalSupply();
    const deployerBalance = await token.balanceOf(accounts[0]);
    
    console.log("\n📊 Token Information:");
    console.log("─────────────────────────────────────────────");
    console.log("Token Name:      ", name);
    console.log("Token Symbol:    ", symbol);
    console.log("Decimals:        ", decimals.toString());
    console.log("Total Supply:    ", (totalSupply / 1e18).toLocaleString(), symbol);
    console.log("Your Balance:    ", (deployerBalance / 1e18).toLocaleString(), symbol);
    console.log("─────────────────────────────────────────────");
    
    if (network === 'nile') {
      console.log("\n🔗 View on TRONScan:");
      console.log("https://nile.tronscan.org/#/contract/" + Token.address);
    } else if (network === 'mainnet') {
      console.log("\n🔗 View on TRONScan:");
      console.log("https://tronscan.org/#/contract/" + Token.address);
    }
    
    console.log("\n🎉 Deployment complete!");
  });
};

