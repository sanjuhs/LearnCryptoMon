import React from 'react'
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';

import { updateAave, updateUniswapV1, walletLogin } from '../reducers/user';



function Dashboard({ closeDashboardHandler }) {

    const dispatch = useDispatch();

    const isConnected = useSelector((state) => state.user.loggedIn);
    const address = useSelector((state) => state.user.address);
    const aave = useSelector((state) => state.user.aave);
    const uniswap = useSelector((state) => state.user.uniswap);


    const addAave = async (address) => {
        try {
            const res = await axios.get(`https://api.covalenthq.com/v1/1/address/0x57f139225c3193854C67d435aC3482373176bA1F/stacks/aave_v2/balances/?&key=${process.env.REACT_APP_ckey}`);
            if (res.data.data.aave.balances.length > 0) {
                const aavebalance = res.data.data.aave.balances[0].balance.quote;
                console.log(aavebalance);
                dispatch(updateAave(aavebalance))
            }

        } catch (error) {
            console.log(error);
        }
    }

    const adduniswapv1 = async (address) => {
        try {
            const res = await axios.get(`https://api.covalenthq.com/v1/1/address/0x57f139225c3193854C67d435aC3482373176bA1F/stacks/uniswap_v1/balances/?&key=${process.env.REACT_APP_ckey}`);
            if (res.data.data.uniswap_v1.balances.length > 0) {
                const uniswapbalance = res.data.data.uniswap_v1.balances[0].balance.quote;
                console.log(uniswapbalance);
                dispatch(updateUniswapV1(uniswapbalance))
            }

        } catch (error) {
            console.log(error);
        }
    }

    const addCompound = async(address) => {
        try {
            const res = await axios.get(`https://api.covalenthq.com/v1/1/address/0x57f139225c3193854C67d435aC3482373176bA1F/stacks/compound/balances/?&key=${process.env.REACT_APP_ckey}`);
            if (res.data.data.compound.length > 0) {
                const compoundbalance = res.data.data.compound.balances[0].balance.quote;
                console.log(compoundbalance);
                dispatch(updateUniswapV1(compoundbalance))
            }

        } catch (error) {
            console.log(error);
        }
    }

    const connectMetamask = async () => {
        if (window.ethereum) {
            try {
                //change network to Polygon Mumbai
                // on




                //connect wallet
                const result = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                console.log(result);


                dispatch(walletLogin(result[0]));

            } catch (error) {
                console.log(error.message);

            }
        } else {
            alert("You need to install Metamask first !");
        }
    };

    // Polygon Mumbai testnet details
    const networks = {
        polygon: {
            chainId: `0x${Number(80001).toString(16)}`,
            chainName: "Mumbai Testnet",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            rpcUrls: ["https://rpc-mumbai.matic.today/"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
        },
        ropsten:{
            chainId: `0x${Number(3).toString(16)}`,
            chainName: "Ropsten",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            rpcUrls: ["https://ropsten.infura.io/v3/f5b6417e2b644389adeb2bc2928bfa49"],
            blockExplorerUrls: ["https://ropsten.etherscan.io/"]
        }
    }



    return (
        <div className='flex flex-col z-30 w-2/4 h-3/4 p-4 absolute top-4 left-4 bg-white border-black rounded-xl'>
            <div onClick={closeDashboardHandler}
                className='flex flex-row justify-end text-2xl cursor-pointer mx-1 my-1'>x</div>
            {
                !isConnected ? (
                    <div className='flex flex-col justify-center items-center my-32'>
                        {/* <button
                            className="max-w-sm top-9 bg-[#00b8d5] right-4 rounded-xl py-2 px-6 text-[#0067d5] font-bold my-4">Use Coinbase Wallet</button>
                        <button
                            className="max-w-sm top-9 bg-[#00b8d5] right-4 rounded-xl py-2 px-6 text-[#0067d5] font-bold my-4">Use WalletConnect</button> */}
                        <button onClick={connectMetamask}
                            className="max-w-sm top-9 bg-[#e6e6e6] right-4 rounded-xl py-2 px-6 text-[#000] font-bold my-4">Connect My Web3 Wallet</button>
                    </div>
                ) : (
                    <div className='px-4'>
                        <h1 className='text-2xl font-bold'>My Defi Assets</h1>
                        <p className='text-slate-400 text-xs mb-4'>Address : {address}</p>
                        <hr />
                        <div className='grid grid-cols-2 mt-12 gap-4'>
                            <div className='rounded-xl px-4 py-4 bg-gray-100'>
                                <h2 className='font-bold text-base'>Uniswap V1 </h2>
                                <p className='text-sm'>$0</p>
                            </div>

                            <div className='rounded-xl px-4 py-4 bg-gray-100'>
                                <h2 className='font-bold text-base'>Aave V2 Supply Position</h2>
                                <p className='text-sm'>${aave}</p>
                            </div>

                            <div className='rounded-xl px-4 py-4 bg-gray-100'>
                                <h2 className='font-bold text-base'>Compound</h2>
                                <p className='text-sm'>$0</p>
                            </div>

                            <div className='rounded-xl px-4 py-4 bg-gray-100'>
                                <h2 className='font-bold text-base'>Curve</h2>
                                <p className='text-sm'>$0</p>
                            </div>

                        </div>

                    </div>
                )
            }

        </div>
    )
}

export default Dashboard