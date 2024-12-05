import { useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const fetchMessage = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_MANTLE_RPC_URL);
      const contractAbi = [
        "function message() public view returns (string)"
      ];
      const contractAddress = "YOUR_CONTRACT_ADDRESS";  // 部署成功后替换此地址
      const contract = new ethers.Contract(contractAddress, contractAbi, provider);
      const currentMessage = await contract.message();
      setMessage(currentMessage);
    } catch (err) {
      console.error(err);
    }
  };

  const updateMessage = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask");
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAbi = [
        "function updateMessage(string memory newMessage) public"
      ];
      const contractAddress = "YOUR_CONTRACT_ADDRESS";
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

      const tx = await contract.updateMessage(newMessage);
      await tx.wait();
      alert("Message updated!");
      fetchMessage();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Current Message: {message}</h1>
      <button onClick={fetchMessage}>Fetch Message</button>
      <input
        type="text"
        placeholder="New message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={updateMessage}>Update Message</button>
    </div>
  );
}
