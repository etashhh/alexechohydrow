import { ethers } from "hardhat";

async function main() {
  const Hydrow = await ethers.getContractFactory("HydrowAlexEchoCollab");
  const hydrow = await Hydrow.deploy("Hydrow Alex Echo Collab", "HYDROWAE", 30);

  await hydrow.deployed();

  console.log("ERC721 contract deployed to:", hydrow.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
