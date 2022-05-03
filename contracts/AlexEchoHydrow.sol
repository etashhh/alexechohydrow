//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract AlexEchoHydrow is ERC721, Ownable {

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        console.log("Deploying an ERC721 Token with symbol:", symbol);
    }
}
