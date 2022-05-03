import { expect } from "chai";
import { ethers } from "hardhat";

describe("AlexEchoHydrow", () => {
  it("Should deploy the AlexEchoHydrow contract", async () => {
    const Hydrow = await ethers.getContractFactory("AlexEchoHydrow");
    const hydrow = await Hydrow.deploy("Alex Echo Hydrow Collab", "AEHYDROW");
    await hydrow.deployed();
  });
});
