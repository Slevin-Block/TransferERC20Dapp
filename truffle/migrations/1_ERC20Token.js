
module.exports = function (deployer) {
    let blockNumber
    (async()=>{
        const ERC20Token = artifacts.require("ERC20Token");
        await deployer.deploy(ERC20Token);
    })()
};