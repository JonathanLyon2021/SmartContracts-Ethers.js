//SPDX-License-Identifier: MIT  

pragma solidity >=0.6.0 <0.9.0;

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

    function count() public view returns (uint256 factCount) {
        return facts.length;
    }

    function getFact(uint256 index) public view returns (string memory fact){
        return facts[index];
    }
}
