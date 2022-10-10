const ethers = require("ethers");
const solc = require("solc");
const Contract = ethers.Contract;
const provider = ethers.getDefaultProvider("ropsten"); // this is just a connection to the network, the EVM
//for querying and sending state changes
const fs = require("fs-extra");

//Create a function that readds a file and returns its content.

function readFile(fileName) {
    return fs.readFileSync(fileName, "utf8"); ///Ask Jason what exactly this means/does?
}
