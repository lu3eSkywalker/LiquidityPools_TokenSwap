import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import TokenSwapsInfo from "./Walkthrough/TokenSwapsInfo";
import { MetaMaskInpageProvider } from "@metamask/providers";
import Image from "next/image";
import asset1 from "../assets/asset1.png";
import asset2 from "../assets/asset2.jpeg";
import asset4 from "../assets/asset4.jpg";
import cryptoPunks from "../assets/cryptoPunks.png";
import pattern_randomized from "../assets/pattern-randomized.svg";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

const TokenSwaps = () => {
  const [tokenFromAmount, setTokenFromAccount] = useState<number>(0);

  const [fromAddress, setFromAddress] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");

  const [liquidityPoolAddress, setLiquidityPoolAddress] = useState<string>("");

  const [tokenSwapSuccessfull, setTokenSwapSuccessfull] = useState<string>("");

  const [loadingBar, setLoadingBar] = useState<boolean>(false);

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

        setLoadingBar(true);
        const res = await sendTokens.wait();
        setLoadingBar(false);

        console.log(res.toString());

        if (res.status == 1) {
          setTokenSwapSuccessfull("Tokens Swapped Successfully");
        } else {
          setTokenSwapSuccessfull("Error Swapping Tokens");
        }
      } catch (error) {
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
    <div
      className="bg-container"
      style={{
        backgroundImage: `url(${pattern_randomized.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "90vh",
      }}
    >
      <div>
        <div>
          <div className="flex justify-between items-center">
            <div className="flex justify-end">
              <Image src={asset2} alt="Description of the image" width={290} />
            </div>

            <div className="flex justify-center flex-grow ml-[200px]">
              <TokenSwapsInfo />
            </div>

            <div className="flex justify-start">
              <Image
                src={asset1}
                alt="Description of the image"
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="absolute left-0" style={{ marginTop: "1px" }}>
            <Image src={asset4} alt="Ethereum Logo" width={400} height={200} />
          </div>

          <div
            className="absolute right-0 rounded-full mx-[80px]"
            style={{ marginTop: "35px" }}
          >
            <Image
              src={cryptoPunks}
              alt="cryptoPunks"
              width={300}
              height={150}
            />
          </div>

          <div
            className="flex flex-col justify-center items-center"
            style={{ height: "40vh" }}
          >
            <div className="absolute w-[600px] h-[450px] bg-blue-500 rounded-lg transform -rotate-6 opacity-50 my-[490px] top-[-80px]"></div>

            <div className="relative bg-white shadow-md rounded-lg p-8 w-[450px] mb-6">
              <div>
                <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2 border-4">
                  Quantity:
                  <input
                    className="grow"
                    type="number"
                    placeholder="Quantity of Token To Send"
                    onChange={(e) =>
                      setTokenFromAccount(parseInt(e.target.value))
                    }
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2 border-4">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="Liquidity Pool Address"
                    onChange={(e) => setLiquidityPoolAddress(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2 border-4">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="Address of Token to Send"
                    onChange={(e) => setFromAddress(e.target.value)}
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 font-black text-xl my-2 border-4">
                  Address:
                  <input
                    className="grow"
                    type="text"
                    placeholder="Address of Token to Receive"
                    onChange={(e) => setToAddress(e.target.value)}
                  />
                </label>
              </div>

              <br />

              <button
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-bold text-xl"
                onClick={() => tokenSwap()}
              >
                Token Swap
              </button>

              <br />

              {loadingBar ? (
                <div>
                  <div className="font-bold mx-[90px]">
                    Transaction Processing...
                  </div>
                  <div className="mx-[85px]">
                    <progress className="progress w-56"></progress>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              {<div className="text-xl">{tokenSwapSuccessfull}</div>}
            </div>

            <br />
            <br />
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
      </div>
    </div>
  );
};

export default TokenSwaps;
