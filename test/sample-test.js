const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Product = await ethers.getContractFactory("Product");
    const product = await Greeter.deploy();
    await product.deployed();
  });
});
