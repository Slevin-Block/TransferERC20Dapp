const contractToDeploy = "ERC20Token"
const myContract = artifacts.require(contractToDeploy);

module.exports = async (deployer) => {
        await deployer.deploy(myContract);
        const blockNumber = await web3.eth.getBlockNumber();
        const abi = [
            ...myContract.abi,
            {
                "constant": true,
                "inputs": [],
                "name": "deployBlock",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "blockNumber": blockNumber
            }
        ];
        myContract.abi = abi;
};