import { ethers } from "hardhat";

async function main() {
  const Hydrow = await ethers.getContractFactory("AlexEchoHydrow");
  const hydrow = await Hydrow.deploy("Alex Echo Hydrow Collab", "AEHYDROW", 30);

  await hydrow.deployed();

  console.log("ERC721 contract deployed to:", hydrow.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
