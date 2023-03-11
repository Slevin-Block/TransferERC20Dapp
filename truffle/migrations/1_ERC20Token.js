
module.exports = function (deployer) {
    (async()=>{
        const ERC20Token = artifacts.require("ERC20Token");
        deployer.deploy(ERC20Token);
    
    
    })()
};

/* 

    deployer.deploy(ERC20Token);
    const instance = await ERC20Token.deployed();
    const address = instance.address;
    const txHash = ERC20Token.transactionHash;
    const blockNumber = (await ERC20Token.web3.eth.getTransaction(hash)).blockNumber
    console.log("address : ",address,)
    console.log("txHash : ",txHash,)
    console.log("blockNumber : ",blockNumber,)
    
*/