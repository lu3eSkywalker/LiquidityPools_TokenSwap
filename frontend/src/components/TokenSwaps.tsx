import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const TokenSwaps = () => {
  const [tokenFromAmount, setTokenFromAccount] = useState<number>(0);

  const [fromAddress, setFromAddress] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");

  const [liquidityPoolAddress, setLiquidityPoolAddress] = useState<string>("");

  const ABI = [
    "function swap(uint256, address, address) external returns (uint256)",
  ];

  async function tokenSwap() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          liquidityPoolAddress || "",
          ABI,
          signer
        );

        const sendTokens = await contract.swap(
          tokenFromAmount,
          fromAddress,
          toAddress
        );

        console.log(sendTokens);

        const res = await sendTokens.wait();
        console.log(res.toString());
      } catch (error: any) {
        console.error("Error Adding liquidity", error);
        alert(
          "An error occurred while adding liquidity. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-[500px] mb-6">
          <div>
            <label className="input input-bordered flex items-center gap-2 font-black text-xl">
              Quantity:
              <input
                type="number"
                className="grow"
                placeholder="Quantity of Token To Send"
                onChange={(e) => setTokenFromAccount(parseInt(e.target.value))}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
              Address:
              <input
                type="text"
                className="grow"
                placeholder="Liquidity Pool Address"
                onChange={(e) => setLiquidityPoolAddress(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
              Address:
              <input
                type="text"
                className="grow"
                placeholder="Address of Token to Send"
                onChange={(e) => setFromAddress(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-2 font-black text-xl">
              Address:
              <input
                type="text"
                className="grow"
                placeholder="Address of Token to Receive"
                onChange={(e) => setToAddress(e.target.value)}
              />
            </label>

            <br />
            <div>
              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold"
                onClick={() => tokenSwap()}
              >
                Swap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenSwaps;
