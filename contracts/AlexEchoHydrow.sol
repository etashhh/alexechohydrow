//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract AlexEchoHydrow is ERC721, ERC721Enumerable, Ownable {

    uint256 public maxSupply;
    string private _baseTokenURI;

    event SetBaseTokenURI(string indexed baseTokenURI);

    constructor(string memory name, string memory symbol, uint256 _maxSupply) ERC721(name, symbol) {
        console.log("Deploying an ERC721 Token with symbol:", symbol);
        maxSupply = _maxSupply;
    }

    function setBaseTokenURI(string memory baseTokenURI) external onlyOwner {
       _baseTokenURI = baseTokenURI;
       emit SetBaseTokenURI(_baseTokenURI);
    }

    function getBaseTokenURI() external view returns (string memory) {
        return _baseTokenURI;
    }

    function _mintToken(address addr, uint256 amount) internal returns (bool) {
        for (uint256 i = 0; i < amount; i++) {
            uint256 tokenIndex = totalSupply();
            if (tokenIndex < maxSupply) _safeMint(addr, tokenIndex +1);
        }
        return true;
    }

    function airdrop(address[] memory addresses, uint256 amount)
        external
        onlyOwner
    {
        require(
            totalSupply() + amount <= maxSupply,
            "Exceeds max supply limit."
        );

        for (uint256 i = 0; i < addresses.length; i++) {
            _mintToken(addresses[i], amount);
        }
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
