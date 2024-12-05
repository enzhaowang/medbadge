// backend/index.js
const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

const provider = new ethers.providers.JsonRpcProvider(process.env.MANTLE_RPC_URL);
const contractAbi = [
  "function message() public view returns (string)",
  "function updateMessage(string memory newMessage) public"
];
const contractAddress = "YOUR_CONTRACT_ADDRESS";  // 部署成功后替换此地址
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractAbi, wallet);

app.get('/message', async (req, res) => {
  try {
    const currentMessage = await contract.message();
    res.send({ message: currentMessage });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
