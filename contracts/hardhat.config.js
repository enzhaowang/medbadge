require("@nomicfoundation/hardhat-toolbox");

require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    mantleTestnet: {
      url: process.env.MANTLE_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};


