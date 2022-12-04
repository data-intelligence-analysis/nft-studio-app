import Head from "next/head";
import React, {useMemo, useEffect, useState} from 'react'
import solanaPayImg from '../assets/solana_pay_white.png';
import usdcPayImg from '../assets/usdc_logo.png'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import StraightIcon from '@mui/icons-material/Straight';
import UserLogo from '../assets/user-logo.png';
import Donate from '../components/Donate';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    GlowWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import {
    useWallet,
    //useConnection
} from '@solana/wallet-adapter-react';
import Image from "next/legacy/image";
import { clusterApiUrl } from "@solana/web3.js";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Circles } from "react-loader-spinner";
//import {server} from '../config'
//required for Solana modal
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContainer =() =>{
  //react hooks

  const [loading, setLoading] =useState(false)
  const wallet = useWallet();
  const { publicKey} = useWallet();
  const [priceSOL, setPrice] = useState([]);
  useEffect(()=>{
    setLoading(true)
    if (publicKey){
      fetch(`/api/fetchPrice`)
        .then(response => response.json())
        .then( data => {
          setPrice(data);
          console.log("SOL Payment Price Info", data)
        })
        .then(setLoading(false))
    }
  }, [publicKey])
  const CheckWallet = () => {
    try{
      if (wallet.connected && wallet.publicKey && loading) {
        
        return (
          <Circles 
            width='50' 
            height='50' 
            color="purple"
            ariaLabel = "circles-loading"
            wrapperClass="items-center justify-center"
            wrapperStyle=""
            visible={true} />
        )
        
        
      }else if (wallet.connected && wallet.publicKey){
        return (
          <div>
            {
              priceSOL.map((price) => (
                <Donate key={price.id} priceInfo = {price} />
              ))
            } 
          </div>
        )
      }
      
      else{
        return (
          <div>
            <div className="flex items-center justify-center">
              <button type="submit" onClick = {() => alert("Connect your solana wallet, to make payment!")}
                className="solana-button-text flex items-center text-base gap-x-1 sm:text-lg font-bold px-2.5 py-1 text-center">
                <p className="inline-block">Donate</p><Image alt="solana" width= {"40"} height={"18"} src={solanaPayImg} priority="true" style={{marginRight:"3"}} />
              </button>
            </div>
            <div className="mt-5 flex items-center justify-center sm:mt-10">
              <button type="submit" onClick = {() => alert("Connect your solana wallet, to make payment!")}
                className="solana-button-text flex items-center gap-x-1 text-base sm:text-lg font-bold px-2.5 py-1 text-center">
                <p className="inline-block">Donate</p><Image alt="usdc" width= {"30"} height={"18"} src={usdcPayImg} priority="true" style={{marginRight:"3"}} />
              </button> 
            </div> 
          </div>
        )
      }
    }catch(err){
        console.error(err)
    }

  }
  
  return (
    <>
      <Head>
        <title>🎗 Support | MetaTeds</title>
      </Head>
      <NavBar bgFormat={"bg-[#343333]"} />
      <div className="bg-[var(--tw-main-bg-color)] h-screen">
        <div className="h-full mx-4">
          <div className="m-auto py-20 h-full overflow-y-auto">
            <nav className="top-5 lg:sticky relative pointer-events-none z-index">
              <div className="absolute mt-4 w-full">
                <div className="flex flex-row gap-4 rounded-full justify-between px-3 float-left align-middle pointer-events-auto text-center items-center cursor-pointer">
                  <h1 className="inline-block text-base sm:text-xl lg:text-3xl text-indigo-500">🎉 Connect to wallet above </h1><StraightIcon />
                </div>
              </div>
            </nav>
            <div className="mt-12 sm:mt-20 grid place-items-center sm:grid-cols-2 mx-auto items-center text-center">
              <div className="mt-6 mx-5 flex bg-slate-200 support-box-shadow cursor-pointer rounded-3xl h-[280px] sm:h-[450px] border-2 border-indigo-500/100 w-[88%] sm:w-[90%] lg:max-w-md">
                <div className="text-center justify-center w-full p-5 font-['Inter']">
                  <h1 className="text-slate-900 font-bold text-xl sm:text-3xl">Support Us</h1>
                  <div className="flex items-center justify-center m-5 sm:m-10 cursor-pointer">
                    <CheckWallet />
                  </div>
                </div>
                
              </div>
              <div className="mt-6 mx-2 sm:mx-4 flex bg-slate-200 support-box-shadow cursor-pointer rounded-3xl h-[280px] sm:h-[450px] border-2 border-indigo-500/100 w-[88%] sm:w-[90%] lg:max-w-md">
                <div className="text-center justify-center font-['Inter'] w-full p-5">
                  <h1 className="text-slate-900 font-bold text-xl sm:text-3xl">Contact Us</h1>
                  <div className="text-center m-5 sm:m-10 cursor-pointer">
                    <a className="solana-pay" href="https://forms.gle/2p813UayRdro1wxf8" target="_blank" rel="noreferrer">
                        <button className="solana-button-text inline-block font-bold px-2.5 py-1 text-base sm:text-lg"> 
                            Join Our Team <span className="join-team-icon-position"><GroupAddIcon /></span>
                        </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer bgFormat={"bg-zinc-800"}/>
    </>
  )
}
export default function Support() {
  return (
    <>
      <WalletContainer />
    </>
  );
}