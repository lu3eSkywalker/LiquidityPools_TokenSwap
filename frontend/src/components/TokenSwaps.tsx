import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import TokenSwapsInfo from "./Walkthrough/TokenSwapsInfo";

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

  const [tokenSwapSuccessfull, setTokenSwapSuccessfull] = useState<string>("");

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

        if(res.status == 1) {
          setTokenSwapSuccessfull("Tokens Swapped Successfully")
        } else {
          setTokenSwapSuccessfull("Error Swapping Tokens")
        }
      } catch (error: any) {
        console.error("Error Swapping Tokens", error);
        alert(
          "An error occurred while swapping Tokens. Check console for details."
        );
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }

  return (
    <div className="bg-gray-100">
      <br />
      <br />
      <br />
      <div className="flex justify-center bg-gray-100">
        <TokenSwapsInfo />
      </div>

      <div
        className="flex flex-col justify-center items-center h-screen bg-gray-100"
        style={{ height: "70vh" }}
      >
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
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => tokenSwap()}
              >
                Swap
              </button>

              <br />
              <br />


              <div className="text-xl">
              {tokenSwapSuccessfull}
              </div>

            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />

        <div className="text-center text-gray-700 font-medium">
          <div className="text-center text-gray-700 font-medium">
            <ul className="steps text-xl">
              <li className="step step-primary">
                <a href="./createliquiditypool">Create Liquidity Pool</a>
              </li>
              <li className="step step-primary">
                <a href="./liquiditypoolbyuser">
                  Get Our Liquidity Pool Contract Address
                </a>
              </li>
              <li className="step step-primary">
                <a href="./approvetokens">Approve the Tokens</a>
              </li>
              <li className="step step-primary">
                <a href="./addliquidity">Add Liquidity</a>
              </li>
              <li className="step step-primary">
                <a href="./removeliquidity">Remove Liquidity</a>
              </li>
              <li className="step step-primary">
                <a href="./tokenswaps">Token Swap</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenSwaps;
