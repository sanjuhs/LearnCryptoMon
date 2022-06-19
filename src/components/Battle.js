import React,{useState, useEffect} from 'react';
import { ethers } from 'ethers';
import gameabi from "./abi/game.json";

function Battle({closeBattleHandler}) {


    const contractAddress = "0xB54162510305f168926Da2C386Fe6b8dA2e402dF";
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = tempProvider.getSigner();
    let tempContract = new ethers.Contract(contractAddress, gameabi, tempSigner);

    const [myPet, changeMyPet] = useState({});
    const [opPet, changeOpPet] = useState({});

    const [myHP, changeMyHP] = useState(0);
    const [opHP, changeOpHP] = useState(0);

    useEffect(() => {

        tempContract.on("Attacked",(petID, newHP) => {
            console.log("attacked !");
            const petID_num = ethers.BigNumber.from(petID).toNumber();
            const newHP_num = ethers.BigNumber.from(newHP).toNumber();

            console.log(petID_num, newHP_num);

            if(petID_num == '0'){
                myPet.currenthp = newHP_num;
                changeMyHP(myPet.currenthp*100/myPet.maxhp);
                
            }
            else{
                opPet.currenthp = newHP_num;
                changeOpHP(opPet.currenthp*100/opPet.maxhp);
                
            }
            getData();
        });

        tempContract.on("CaptureSuccessful",(id) =>{
            alert("Successfully Captured !")
        });

        tempContract.on("CaptureFailed",(id) => {
            alert("Capturing Failed, try again after some more attacks !")
        });

        const getData = async () => {
            try {

                //owned pet
                const data = await tempContract.pets("0");
                let temp = {};
                temp.name = data.name;
                temp.imgURL = data.imgURL;
                temp.currenthp = ethers.BigNumber.from(data.currenthp).toNumber();
                temp.maxhp = ethers.BigNumber.from(data.maxhp).toNumber();

                changeMyHP(temp.currenthp*100/temp.maxhp)

                changeMyPet(temp);
                console.log(temp);
                

                //opponent pet
                let data1 = await tempContract.pets("1");
                let temp1 = {};
                temp1.name = data1.name;
                temp1.imgURL = data1.imgURL;
                temp1.currenthp = ethers.BigNumber.from(data1.currenthp).toNumber();
                temp1.maxhp = ethers.BigNumber.from(data1.maxhp).toNumber();

                changeOpHP(temp1.currenthp*100/temp1.maxhp)
                changeOpPet(temp1);
                console.log(temp1);

    
                // ChangePets([...pets, {
                //     name: data.name,
                //     imgURL: data.imgURL,
                //     currenthp: ethers.BigNumber.from(data.currenthp).toNumber(),
                //     maxhp: ethers.BigNumber.from(data.maxhp).toNumber(),
                // }])
               
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    },[]);

    const attack = async (attackName) => {
        try {
            await tempContract.attack(attackName,"0","1");
        } catch (error) {
            console.log(error);
        }
    }

    const capture = async () => {
        try {
            await tempContract.capture("1");
            alert('trying to capture..')
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='flex flex-col z-30 w-[80%] h-[500px] p-4 absolute top-[10%] left-[10%] bg-white border-black rounded-xl'>
        <div onClick={closeBattleHandler}
                className='flex flex-row justify-end text-2xl cursor-pointer mx-1 my-1'>x</div>
        {
            <div className="flex flex-row justify-center">
                {
                    myPet && (
                        <div className="flex flex-col items-center">
                            <div className="w-18 px-4 py-2 bg-yellow-300 mb-4">My Pet</div>
                            <div className="w-72 h-72">
                            <img src={myPet.imgURL} alt="mypet"/>
                            </div>
                           
                            <h1 className="text-base">{myPet.name}</h1>
                            <div  className="my-4 w-48 h-4 rounded-full bg-red-400 relative">
                                <div id="mypet" style={{width:myHP+"%"}} className="absolute left-0 bottom-0 h-4 rounded-full bg-lime-300"></div>
                            </div>
                        </div>
                    )
                }
                <div className="flex flex-col">
                    <button onClick={() => attack("tackle")}
                    className="w-48 bg-cyan-100 rounded-xl px-4 py-2 my-4">Tackle</button>
                    <button onClick={() => attack("hit")}
                    className="w-48 bg-cyan-100 rounded-xl px-4 py-2 my-4">Hit</button>
                    <button onClick={() => attack("punch")}
                    className="w-48 bg-cyan-100 rounded-xl px-4 py-2 my-4">Punch</button>
                    <button onClick={() => attack("superbeam")}
                    className="w-48 bg-cyan-100 rounded-xl px-4 py-2 my-4">Super beam</button>

<button onClick={() => attack("capture")}
                    className="w-48 bg-sky-500 rounded-xl px-4 py-2 my-4 text-white">Capture</button>
                    
                </div>
                 {
                    opPet && (
                        <div className="flex flex-col items-center">
                            <div className="w-18 px-4 py-2 bg-yellow-300 mb-4">Opponent</div>
                            <div className="w-72 h-72">
                            <img src={opPet.imgURL} alt="oppet"/>
                            </div>
                            
                            <h1 className="text-base">{opPet.name}</h1>
                            <div  className="my-4 w-48 h-4 rounded-full bg-red-400 relative">
                                <div id="oppet" style={{width:opHP+"%"}} className="absolute left-0 bottom-0 h-4 rounded-full bg-lime-300"></div>
                            </div>
                        </div>
                    )
                }


            </div>
        }
        
        
    </div>
  )
}

export default Battle