const ethers = require("ethers");
const solc = require("solc");
const Contract = ethers.Contract;
const provider = ethers.getDefaultProvider("ropsten"); // this is just a connection to the network, the EVM. for querying and sending state changes
const fs = require("fs-extra");

