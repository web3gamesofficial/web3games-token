import hre from "hardhat";
import { expect } from "chai";
import { parseUnits } from "viem";

describe("WGT", function () {
  it("TotalSupply", async function () {
    const [firstWalletClient] = await hre.viem.getWalletClients();

    const deployer = firstWalletClient.account.address;

    const totalSupply = parseUnits("1000000000", 18);
    const token = await hre.viem.deployContract("WGT", [totalSupply]);

    expect(await token.read.totalSupply()).to.equal(totalSupply);
    expect(await token.read.balanceOf([deployer])).to.equal(totalSupply);

    const burnAmount = parseUnits("1000", 18);
    await token.write.burn([burnAmount]);
    expect(await token.read.balanceOf([deployer])).to.equal(
      totalSupply - burnAmount,
    );
  });
});
