import React from "react";
import { BiArrowBack } from "react-icons/bi";
import abi from "../abi/defe.json";
import { ethers } from "ethers";


const contractAddress = "0xB54162510305f168926Da2C386Fe6b8dA2e402dF";

function Compound({ changePageController }) {
  const reward = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);

    let tempSigner = tempProvider.getSigner();

    let tempContract = new ethers.Contract(contractAddress, abi, tempSigner);

    //exeucte mint function from contract
    try {
      
      await tempContract.functions.claimReward(3);
      alert("You won 1 DEFE token, check your wallet balance");
    } catch (error) {
      console.log(error);
      alert("Already claimed the reward !");
    }
  };

  return (
    <div>
      <div className="flex flex-row mb-4 ml-4 items-center">
        <BiArrowBack
          className="cursor-pointer"
          onClick={() => changePageController("home")}
        />
        <h1 className="text-2xl font-bold ml-4">Compound</h1>
      </div>

      <hr />
      <div className="my-4 mx-4">
        <p className="text-base mb-4">
          Compound or Compound Finance is basically a decentralized marketplace
          for crypto investors which offers functionalities for lending and
          borrowing digital assets. Compound crypto is basically a decentralized
          protocol developed over a blockchain. Users have the privilege of
          dictating governance precedents for the Compound protocol with the
          help of the COMP token. From a technical perspective, you can think of
          Compound as a system of smart contracts developed on Ethereum with
          open accessibility.{" "}
        </p>
        <h2 className="font-bold text-base mb-4">About the Quest</h2>
        <p className="text-base mb-4">
          Deposit $5 in Compound protocol to claim rewards
        </p>
      </div>
      <button
        onClick={reward}
        className="max-w-sm ml-4 mt-4 bg-[#00b8d5] rounded-xl py-2 px-6 text-[#0067d5] font-bold"
      >
        Done with the quest ? Claim Reward
      </button>
    </div>
  );
}

export default Compound;
