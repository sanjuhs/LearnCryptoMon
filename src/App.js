import React, {useState} from 'react';
import "./App.css";
import { ethers } from 'ethers';
import gameabi from "./components/abi/game.json";
import { Unity, useUnityContext } from "react-unity-webgl";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {GrCircleInformation} from "react-icons/gr";
import {AiFillGift} from "react-icons/ai";
import {GiBattleAxe, GiHealthNormal} from "react-icons/gi";
import Dashboard from './components/Dashboard';
import Learning from './components/Learning';
import Battle from './components/Battle';

// const unityContext = new UnityContext({
//   loaderUrl: "/build/build1.loader.js",
//   dataUrl: "/build/build1.data.unityweb",
//   frameworkUrl: "/build/build1.framework.js.unityweb",
//   codeUrl: "/build/build1.wasm.unityweb",
// });
const contractAddress = "0xB54162510305f168926Da2C386Fe6b8dA2e402dF";

function App() {

  let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
  let tempSigner = tempProvider.getSigner();
  let tempContract = new ethers.Contract(contractAddress, gameabi, tempSigner);

  const { unityProvider } = useUnityContext({
    loaderUrl: "/build/build2.loader.js",
    dataUrl: "/build/build2.data",
    frameworkUrl: "/build/build2.framework.js",
    codeUrl: "/build/build2.wasm",
  });

  // unityContext.on("Senddata", function (eventdata, eventname) {
  //   alert("this is true !");
  //   //questcompletion();
  //   console.log("eventdata : " + String(eventdata));
  //   console.log(eventname);
  // });

  const [showDashboard, changeShowDashboard] = useState(false);
  const [showLearning, changeShowLearning] = useState(false);
  const [showBattle, changeShowBattle] = useState(false);

  const showTheDashboard = () => changeShowDashboard(true);

  const closeDashboard = () => changeShowDashboard(false);

  const showTheLearning = () => changeShowLearning(true);

  const showTheBattle = () => changeShowBattle(true);

  const closeTheLearning = () => changeShowLearning(false);

  const closeTheBattle = () => changeShowBattle(false);

  const claimMinerpet = async() => {
    console.log("claiming pet....");
    try {
      await tempContract.claimMinerpet();
      alert('Successfully claimed Minerpet - Icecream');
    } catch (error) {
      alert('something went wrong..')
      console.log(error);
    }

  }

  const healPets = async() => {
    console.log("healing pets....");
    try {
      await tempContract.heal("0","1");
      alert('Healing Minerpets in 15 seconds....');
    } catch (error) {
      alert('something went wrong..')
      console.log(error);
    }
  }

  return (
    <div className="relative">
      
        <Unity
          className="unityy"
          unityProvider={unityProvider}
          // style={{ width: 800, height: 600 }}
        />
              <div
        onClick={showTheDashboard}
        className="flex items-center justify-center w-12 h-12 absolute top-[50px] left-4 bg-white border-black rounded-xl cursor-pointer"
      >
        <MdOutlineSpaceDashboard className="text-2xl" />
      </div>
      <div
        onClick={showTheLearning}
        className="flex items-center justify-center w-12 h-12 absolute top-[125px] left-4 bg-white border-black rounded-xl cursor-pointer"
      >
        <GrCircleInformation className="text-2xl" />
      </div>

      <div
        onClick={claimMinerpet}
        className="flex items-center justify-center w-12 h-12 absolute top-[200px] left-4 bg-white border-black rounded-xl cursor-pointer"
      >
        <AiFillGift className="text-2xl" />
      </div>

      <div
        onClick={healPets}
        className="flex items-center justify-center w-12 h-12 absolute bottom-[175px] left-4 bg-white border-black rounded-xl cursor-pointer"
      >
        <GiHealthNormal className="text-2xl" />
      </div>

      <div
        onClick={showTheBattle}
        className="flex items-center justify-center w-12 h-12 absolute bottom-[100px] left-4 bg-white border-black rounded-xl cursor-pointer"
      >
        <GiBattleAxe className="text-2xl" />
      </div>
      {showDashboard && <Dashboard closeDashboardHandler={closeDashboard} />}
      {showLearning && <Learning closeLearningHandler={closeTheLearning} />}
      {showBattle && <Battle closeBattleHandler={closeTheBattle}/>}
    </div>
  );
}

export default App;
