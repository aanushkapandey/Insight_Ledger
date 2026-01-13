"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import styles from "./dashboard.module.css"; // Optional: use a CSS module for styling

export default function MetaMaskDashboard({ walletAddress }) {
  const [ethBalance, setEthBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (walletAddress && typeof window !== "undefined" && window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const balance = await provider.getBalance(walletAddress);
          // Format the balance from Wei to Ether
          setEthBalance(ethers.utils.formatEther(balance));
        } catch (error) {
          console.error("Error fetching ETH balance:", error);
        }
      }
    };

    fetchBalance();
  }, [walletAddress]);

  return (
    <div className={styles.dashboardContainer}>
      <h2>MetaMask Dashboard</h2>
      <p>
        <strong>Wallet Address:</strong> {walletAddress}
      </p>
      <p>
        <strong>ETH Balance:</strong>{" "}
        {ethBalance !== null ? `${ethBalance} ETH` : "Loading..."}
      </p>
      {/* Additional wallet details or dashboard components can be added here */}
    </div>
  );
}
