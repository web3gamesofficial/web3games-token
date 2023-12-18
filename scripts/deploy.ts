import hre from "hardhat";
import { parseUnits } from "viem";

async function main() {
  const totalSupply = parseUnits("1000000000", 18);

  const publicClient = await hre.viem.getPublicClient();

  const gasPrice = await publicClient.getGasPrice();

  const token = await hre.viem.deployContract("WGT", [totalSupply], {
    gasPrice,
  });
  console.log("Token deployed to: ", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
