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
	
    /*console.log('\nDeploying Contract');
	let contract = await deployContract(privateKey, "./ArrayOfFacts.sol", "ArrayOfFacts");
	console.log('\nWAITING FOR CONTRACT TO BE MINED);
	await contract.deployed();
	contractAddress = contract.address;
	console.log(contractAddress);
	*/
	
	console.log("\nADDING A FACT");
	let fact = "The Times 03/Jan/2009 Chancellor on brink of second bailout for the banks!";
	let tx = await addFact(privateKey, abi, contractAddress, fact);
	console.log("\nWAITING FOR TRANSACTION TO BE MINED");	
	await tx.wait();
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
	});
}

function getFact(provider, abi, contractAddress, index){
	let contract = new ethers.Contract(contractAddress, abi, provider);
	return contract.getFact(index).then((fact) => {
		console.log("Fact " + ++index + " : " + fact);
	});
}

