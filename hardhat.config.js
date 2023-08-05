/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");

require('dotenv').config('./.env');

module.exports = {
  solidity: "0.8.19",

  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/nfxLvZa4aNN8wNG_zC0sKTbpm6ZypHro`,
      accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`],
    },
  },
};
// 0x5d5Cb51b677300947E110E6073a7c61459ff0485