# SmartContracts-Ethers.js
This is Exercise 13 in MI4 of Kingsland Universities Blockchain Developer Program.

In this exercise, we will use the ethers.js library to interact with a smart contract deployed on the Ethereum Ropsten <br>
Testnet. We will first compile a contract, deploy it and finally invoke some of the contract’s functions once it’s <br>
deployed.<br>

1. Compiling a Smart Contract <br>
The Smart Contract object is a meta-class, so many of its functions are not defined until it is instantiated with an <br>
Application Binary Interface (ABI) which is usually generated by a compiler, such as the Solidity Compiler. Therefore, <br>
we will use the solc-js library – JavaScript bindings for the Solidity Compiler. <br>
To start, create a new project directory in an appropriate place; open a terminal session and initialize a <br>
package.json file inside the project directory: 

     npm init -y
    
After that, install solc-js:

    npm install ––save solc@^0.8.10
    
Because we will be reading a smart contract from a file, we will need a file-system library:

    npm install ––save fs-extra@^0.30.0
    
Last but not least, we need to install ethers.js:

    npm install ––save ethers@5.5.1

After we have installed our dependencies, create a JavaScript file called ethers-workflow.js and require them:
