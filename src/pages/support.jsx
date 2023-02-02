import Head from "next/head";
import React, {useMemo, useEffect, useState} from 'react'
import solanaPayImg from '../assets/solana_pay_white.png';
import {AiFillDollarCircle} from "@react-icons/all-files/ai/AiFillDollarCircle"
//import usdcPayImg from '../assets/usdc_logo.png'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import StraightIcon from '@mui/icons-material/Straight';
//import UserLogo from '../assets/user-logo.png';
import Donate from '../components/Donate';
import CloseIcon from '@mui/icons-material/Close';
import Home from '../pages/index'
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
import Link from 'next/link'
//import {server} from '../config'
//required for Solana modal
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContainer =() =>{
  //react hooks

  const [loading, setLoading] =useState(false)
  const wallet = useWallet();
  const { publicKey} = useWallet();
  const [priceSOL, setPrice] = useState([]);
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(prev => !prev);
  }
  function valURL(url) {
    const parsed = url
    return ['https:', 'http:'].includes(parsed.protocol)
  }
  const Faq = () => {
    return (
      <>
        <div className="inset-0 z-10 fixed bg-[#2e2e30e6]">
          <div className="relative my-10 justify-center mx-auto min-h-full overflow-y-auto p-2 items-center lg:max-w-screen-2xl">
            <div className="mt-5 sticky w-full h-[45px] items-center">
              <button className="text-[30px] pt-0.5 ml-auto flex justify-center items-center h-full mr-2.5 text-white bg-transparent pointer-cursor outline-none overflow-hidden hover:ring-4 hover:ring-indigo-600 rounded-md" onClick={toggleModal}>
                {modal ? (
                  <CloseIcon sx={{width: 50, height:38}}/>)
                :(
                  <Home />
                )}
              </button>
            </div>
            <div className="absolute px-4 pt-4 pb-20 overflow-hidden text-left text-slate-50 transform transition-all sm:px-8 opacity-100 translate-y-0 sm:scale-100">
              <div className="font-sans mt-1 sm:mt-2 items-center text-left">
                <h2 className="text-xl text-white font-bold leading-6">📣 Frequently Asked Questions</h2>
                <div className="mt-4">
                  <h2 className="mt-4 mb-2 text-lg font-bold">What is MetaTeds?</h2>
                  <p className="mb-6 leading-5">
                    A collection of intergalactic Teds engineering and developing Web3 experiences. 
                    Our main focus is to create an ecosystem of applications that focuses on providing value to the 
                    space and establishing community engagement.
                    
                  </p>
                  <h2 className="mt-4 mb-2 text-lg font-bold">When is the Roadmap is released?</h2>
                  <p className="mb-6 leading-5">
                    Roadmap is avaialable and can be found at this {" "}
                    <Link 
                      href="/roadmap"
                      legacyBehavior>
                      <a target="_blank" rel="noopener noreferrer" className="hover:underline font-bold visited:text-amber-500 text-base cursor-pointer text-violet-800">Link</a>
                    </Link>.
                  </p>
                  <h2 className="mt-4 mb-2 text-lg font-bold">How many NFTS would be sold in total?</h2>
                  <p className="mb-6 leading-5">
                    There are multiple collections that would be sold to align with the capabilities of the platform. 
                    The first collection will contain 1000 SolTeds that will provide exclusive access to features of the platform.
                    Eventually the team plans to offer lager collection sizes for premium services. More to details to come!
                  </p>
                  <h2 className="mt-4 mb-2 text-lg font-bold">Will the MetaTed NFTs have special traits?</h2>
                  <p className="mb-6 leading-5">
                    The MetaTed Labs 
                  </p>
                  <h2 className="mt-4 mb-2 text-lg font-bold">What is the Utility behind the NFTs</h2>
                  <p className="mb-4 leading-5">
                    
                  </p>
                  <h2 className="mt-4 mb-2 text-lg font-bold">Are the MetaTed NFTs unique?</h2>
                  <p className="mb-1 leading-5">
                    Each NFT, and its corresponding metadata, is uniquely generated, with unique set of attributes using MetaTed Labs NFT generative program.
                  </p>
                  <h2 className="mt-4 mb-2 text-lg font-bold">How much does each MetaTed NFT cost?</h2>
                  <p className="mb-1 leading-5">
                    
                  </p>
                  <h2 className="mt-4 mb-2 text-lg font-bold">What Solana Wallet is preferred?</h2>
                  <p className="mb-1 leading-5">
                    Phantom wallet is the most trusted and highly recommended wallet, but you can use others like Sollet.
                  </p>
                  <h2 className="mt-4 mb-2 text-lg font-bold">What secondary marketplace would be utilized?</h2>
                  <p className="mb-8 leading-5">
                    Curently, the team is undecided, but MetaTed Labs has its very own marketplace called <a href={valURL(new URL("https://solsurfer.xyz/"))? 'https://solsurfer.xyz' : ''} target="_blank" rel="noopener noreferrer" className="hover:underline font-bold visited:text-amber-500 text-base cursor-pointer text-violet-800">Solsurfer</a> and could potentially use that amongst other avaialable options.
                  </p>
                  <h2 className="mt-4 mb-2 text-lg font-bold">How do I view my NFT?</h2>
                  <p className="mb-8 leading-5">
                    Curently, the team is undecided, but MetaTed Labs has its very own marketplace called <a href={valURL(new URL("https://solsurfer.xyz/"))? 'https://solsurfer.xyz' : ''} target="_blank" rel="noopener noreferrer" className="hover:underline font-bold visited:text-amber-500 text-base cursor-pointer text-violet-800">Solsurfer</a> and could potentially use that amongst other avaialable options.
                  </p>
                  <h2 className="mt-4 mb-2 text-lg font-bold">Is there a limit to how many I can mint?</h2>
                  <p className="mb-8 leading-5">
                    One mint per transaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
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
                className="solana-button-text bg-[#4e44ce] flex items-center text-base gap-x-1 sm:text-lg font-bold px-2.5 py-1 text-center">
                <p className="inline-block">Donate</p><Image alt="solana" width= {"40"} height={"18"} src={solanaPayImg} priority="true" style={{marginRight:"3"}} />
              </button>
            </div>
            <div className="mt-5 flex items-center justify-center sm:mt-10">
              <button type="submit" onClick = {() => alert("Connect your solana wallet, to make payment!")}
                className="solana-button-text bg-[#4e44ce] flex items-center gap-x-1 text-base sm:text-lg font-bold px-2.5 py-1 text-center">
                <p className="inline-block">Donate</p><AiFillDollarCircle alt="usdc" width= {"30"} height={"20"} style={{marginRight:"3px"}} />
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
              <div className="absolute mt-1 w-full">
                {!wallet.connected && !wallet.publicKey ?
                  (
                    <div className="flex flex-row gap-4 rounded-full justify-between px-3 float-left align-middle pointer-events-auto text-center items-center cursor-pointer">
                      <h1 className="inline-block text-base sm:text-xl lg:text-3xl text-indigo-500">Connect to wallet above </h1>
                    </div>
                  ):(
                    <div className="flex flex-row gap-4 rounded-full justify-between px-3 float-left align-middle pointer-events-auto text-center items-center cursor-pointer">
                      <h1 className="inline-block text-base sm:text-xl lg:text-3xl text-indigo-500">🎉 {""} Connected</h1>
                    </div>)
                }
              </div>
            </nav>
            <div className="mt-12 sm:mt-20 grid place-items-center sm:grid-cols-2 mx-auto items-center text-center">
              <div className="mt-6 mx-5 flex bg-slate-200 support-box-shadow cursor-pointer rounded-3xl h-[280px] sm:h-[450px] border-2 border-indigo-500/100 w-[88%] sm:w-[90%] lg:max-w-md">
                <div className="text-center justify-center w-full p-5 font-['Inter']">
                  <h1 className="text-slate-900 font-bold text-xl sm:text-3xl font-bold">Donation</h1>
                  <div className="flex items-center justify-center m-5 sm:m-10 cursor-pointer">
                    <CheckWallet />
                  </div>
                </div>
                
              </div>
              <div className="mt-6 mx-2 sm:mx-4 flex bg-slate-200 support-box-shadow cursor-pointer rounded-3xl h-[280px] sm:h-[450px] border-2 border-indigo-500/100 w-[88%] sm:w-[90%] lg:max-w-md">
                <div className="text-center justify-center font-['Inter'] w-full p-5">
                  <h1 className="text-slate-900 font-bold text-xl sm:text-3xl font-bold">Help Center</h1>
                  <div className="text-center m-5 sm:m-10 cursor-pointer">
                    <a className="solana-pay" href="https://forms.gle/2p813UayRdro1wxf8" target="_blank" rel="noreferrer">
                        <button className="solana-button-text inline-block font-bold px-2.5 py-1 text-base sm:text-lg bg-[#4e44ce]"> 
                            Join Our Team <span className="join-team-icon-position"><GroupAddIcon /></span>
                        </button>
                    </a>
                  </div>
                  <div className="text-center m-5 sm:m-10 cursor-pointer">
                    <button className="solana-button-text inline-block font-bold px-2.5 py-1 text-base sm:text-lg bg-[#4e44ce]" onClick={toggleModal}> 
                        <p className="inline-block items-center text-center">FAQ {" "} 📜</p>
                    </button>
                  </div>
                  {modal && <Faq />}
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