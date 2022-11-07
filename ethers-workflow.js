const ethers = require("ethers");
const solc = require("solc");
const Contract = ethers.Contract;
const provider = ethers.getDefaultProvider("ropsten"); // this is just a connection to the network, the EVM
//for querying and sending state changes
const fs = require("fs-extra");

//Create a function that reads a file and returns its content.

function readFile(fileName) {
    return fs.readFileSync(fileName, "utf8"); ///Ask Jason what exactly this means/does?
}

function compileContract(fileName, contractName) {
    let contractStr = readFile(fileName);
    let input = JSON.stringify({
        language: 'Solidity',
        sources: {
            'source_1': {
                content: contactStr
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    });
    let output = JSON.parse(solc.compile(input)).contracts['source_1'];
    return output[contractName];
}

(async() => {
    console.log("\nCOMPILING CONTRACT");
    const compiledContract = compileContract("./ArrayOfFacts.sol", "ArrayOfFacts");
    console.log(compiledContract);
    const abi = compiledContract.abi;
})();

const privateKey = ''; //Fill in from MetaMaask

function deployContract(privateKey, fileName, contractName) {
    let wallet = new ethers.Wallet(privateKey, provider);
    let contract = compileContract(fileName, contractName);
    let bytecode = "0x" + contract.evm.bytecode.object;
    let abi = contract.abi;
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    return factory.deploy().then((contract) => {
        console.log("Transacion created: ");
        console.log(contract.deployTransaction);
        console.log("Contract address: " + contract.address);
        return contract;
    });
}

function addFact(privateKey, abi, contractAdress, facts){
	let wallet = new ethers.Wallet(privateKey, provider);
	let contract = new ethers.Contract(contractAdress, abi, wallet);

	return contract.add(fact).then((transaction) => {
		console.log("Transaction: ");
		console.log(transaction);
		return transaction;
	})
}

