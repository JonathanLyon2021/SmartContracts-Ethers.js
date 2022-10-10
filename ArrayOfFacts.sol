//SPDX-License-Identifier: MIT  

pragma solidity ^0.8.7;

contract ArrayOfFacts {
    string[] private facts;
    address private owner;

    constructor() public {
        owner = msg.sender;
    }
}
