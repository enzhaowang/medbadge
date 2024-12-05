// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
    const MedBadge = await ethers.getContractFactory("MedBadge");
    const medBadge = await MedBadge.deploy("Hello, MedBadge!");

    await medBadge.deployed();
    console.log("Contract deployed to:", medBadge.address);
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});
