// ERC20Token.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    event transaction(address from, address to, uint value);
    uint public deploymentBlockNumber;

    constructor() ERC20("ALYRA", "ALY") {
        _mint(msg.sender, 1000 ether);
        deploymentBlockNumber = block.number;
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        bool transferred = super.transfer(to, amount);
        if (transferred) {
            emit transaction(msg.sender, to, amount);
        }
        return transferred;
    }
}
