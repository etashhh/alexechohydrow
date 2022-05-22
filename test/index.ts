import { expect } from "chai";
import { ethers } from "hardhat";
import { HydrowAlexEchoCollab } from "../typechain/HydrowAlexEchoCollab";

const uri = "ipfs://hash/"
describe("Hydrow x Alex Echo Collab", () => {
  let hydrow: HydrowAlexEchoCollab;

  let owner: any;
  let acct1: any;
  
  beforeEach(async () => {
    [owner, acct1] = await ethers.getSigners();

    const Hydrow = await ethers.getContractFactory("HydrowAlexEchoCollab", owner);

    hydrow = (await Hydrow.deploy("Alex Echo Hydrow Collab", "AEHYDROW", 30)) as HydrowAlexEchoCollab;
    await hydrow.deployed();
  });
  describe("Deployment tests", () => {
    it("Should make sure the correct constructor arguments are set", async () => {
      expect(await hydrow.name()).to.equal("Alex Echo Hydrow Collab");
      expect(await hydrow.symbol()).to.equal("AEHYDROW");
      expect(await hydrow.maxSupply()).to.equal(30);
    });
    it("Should make sure the owner is set correctly", async () => {
      expect(await hydrow.owner()).to.equal(owner.address);
    });
  });
  describe("Functionality tests", () => {
    it("Should change the token URI and check the token URI after airdrop", async () => {
      await hydrow.setTokenBaseURI(uri);
      await hydrow.airdrop([acct1.address], 30);
      expect(await hydrow.tokenURI(0)).to.equal("ipfs://hash/0");
    });
    it("Shouldn't let you airdrop more than the max supply", async () => {
      await expect(hydrow.airdrop([acct1.address], 31)).to.be.revertedWith("Exceeds max supply limit.");
    });
  });
});
