//SPDX-License-Identifier: MIT  

pragma solidity ^0.8.7;

contract ArrayOfFacts {
    string[] private facts;
    address private owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'Only contract owner can do this!');
        _;
    }

    function add(string memory fact) public onlyOwner {
        facts.push(fact);
    }
}
