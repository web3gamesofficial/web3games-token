// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WGT is ERC20 {
    constructor(uint256 totalSupply_) ERC20("Web3Games.com", "WGT") {
        _mint(msg.sender, totalSupply_);
    }

    function burn(uint256 value) external {
        _burn(msg.sender, value);
    }
}
