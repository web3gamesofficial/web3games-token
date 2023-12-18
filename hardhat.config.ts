import { HardhatUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-viem";
import "@nomicfoundation/hardhat-verify";
import "solidity-coverage";

import dotenv from "dotenv";
dotenv.config();

const { MNEMONIC, PRIVATE_KEY, ALCHEMY_API_KEY, ETHERSCAN_API_KEY } =
  process.env;

const ACCOUNTS = MNEMONIC
  ? { mnemonic: MNEMONIC }
  : PRIVATE_KEY
    ? [PRIVATE_KEY]
    : [];

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.21",
        settings: {
          evmVersion: "paris",
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    mainnet: {
      chainId: 1,
      url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: ACCOUNTS,
    },
    polygon: {
      chainId: 137,
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: ACCOUNTS,
    },
    hardhat: {
      chainId: 1337,
    },
  },
  mocha: {
    timeout: 200000,
  },
  etherscan: {
    apiKey: {
      polygon: ETHERSCAN_API_KEY || "",
    },
  },
};

module.exports = config;
