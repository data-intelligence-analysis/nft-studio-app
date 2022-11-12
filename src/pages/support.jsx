import Head from "next/head";
import React, {useMemo, useEffect, useState} from 'react'
import solanaPayImg from '../assets/solana_pay_white.png';
import usdcPayImg from '../assets/usdc_logo.png'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import UserLogo from '../assets/user-logo.png';
import Donatesol from '../components/Donatesol';
import Donateusd from '../components/Donateusd'
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
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
//required for Solana modal
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContainer =() =>{
  const wallet = useWallet();
  const { publicKey} = useWallet();
  const [pricePay, setPrice] = useState([]);
  useEffect(()=>{
    if (publicKey){
      fetch(`/api/fetchPrice`)
        .then(response => response.json())
        .then( data => {
          setPrice(data);
          console.log("Payment Price Info", data)
        })
    }
  }, [publicKey])
  
  const CheckWalletSOL = () => {
    try{
      if (wallet.connected && wallet.publicKey) {
        return (
          <>
            {
              pricePay.map((price) => (
                <Donatesol key= {price.id} priceInfo = {price} />
              ))
            } 
          </>
        )
      }else{
        return (
          <>
            {<button type="submit" onClick = {() => alert("Connect your solana wallet. To make payment!")}
                className="solana-button-text text-lg sm:text-base font-bold px-2.5 py-1">
                Donate with <Image alt="solana-pay-icon" width= {"40"} height={"20"} src={solanaPayImg} layout="intrinsic" priority="true" style={{padding:'20px'}} />{/*<img className = "solana-pay-img" alt= "Solana Pay" src={solanaPayImg} />*/}
            </button>  }
          </>
        )
      }
    }catch(err){
        console.error(err)
    }

  }
  const CheckWalletUSD = () => {
    try{
      if (wallet.connected && wallet.publicKey) {
        return (
          <>
            {
              pricePay.map((price) => (
                <Donateusd key= {price.id} priceInfo = {price} />
              ))
            } 
          </>
        )
      }else{
        return (
          <>
            {<button type="submit" onClick = {() => alert("Connect your solana wallet. To make payment!")}
                className="solana-button-text text-lg sm:text-base font-bold px-2.5 py-1">
                Donate with <Image alt="usdc" src={usdcPayImg} width ={"20"} height={"20"} priority="true" style=""/>
            </button>  }
          </>
        )
      }
    }catch(err){
        console.error(err)
    }

  }
  return (
    <>
      <Head>
        <title> Support | MetaTeds</title>
      </Head>
      <NavBar />
      <div className="bg-[var(--tw-main-bg-color)] h-screen">
        <div className="h-full mx-4">
          <div className="m-auto py-20 h-full overflow-y-auto">
            <nav className="top-1 sm:sticky relative pointer-events-none z-index">
              <div className="absolute mt-1 w-full">
                <div className="flex flex-row gap-4 uppercase rounded-full justify-between px-3 float-left align-middle justify-center pointer-events-auto cursor-pointer">
                  <WalletMultiButton />
                </div>
              </div>
            </nav>
            <div className="mt-12 sm:mt-20 grid place-items-center sm:grid-cols-2 mx-auto items-center text-center">
              <div className="mt-6 mx-5 flex bg-slate-200 support-box-shadow cursor-pointer rounded-3xl h-[280px] sm:h-[450px] border-2 border-indigo-500/100 w-[88%] sm:w-[90%] lg:max-w-md">
                <div className="text-center justify-center w-full p-5 font-['Inter']">
                  <h1 className="text-slate-900 font-bold text-xl sm:text-3xl">Support Us</h1>
                  <div className="text-center m-5 sm:m-10 cursor-pointer">
                    <CheckWalletSOL />
                  </div>
                  <div className="text-center m-5 sm:m-10 cursor-pointer">
                    <CheckWalletUSD />
                  </div>
                </div>
                
              </div>
              <div className="mt-6 mx-2 sm:mx-4 flex bg-slate-200 support-box-shadow cursor-pointer rounded-3xl h-[280px] sm:h-[450px] border-2 border-indigo-500/100 w-[88%] sm:w-[90%] lg:max-w-md">
                <div className="text-center justify-center font-['Inter'] w-full p-5">
                  <h1 className="text-slate-900 font-bold text-xl sm:text-3xl">Contact Us</h1>
                  <div className="text-center m-10 sm:m-20 cursor-pointer">
                    <a className="solana-pay" href="https://forms.gle/2p813UayRdro1wxf8" target="_blank" rel="noreferrer">
                        <button className="solana-button-text font-bold px-2.5 py-1 text-lg sm:text-base"> 
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
      <Footer />
    </>
  )
}
export default function Support() {

  //{!wallet.connected ? <RenderNotConnectedWallet /> : <RenderConnectedWallet />}
    //const connection = useConnection();
    /*if (!connection || !wallet) {
        return <RenderNotConnectedWallet />;
    }*/
    

    //const [walletConnect, setWalletConnect] = useState(false);

    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new GlowWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            
        ],
        [network]
    );
    /*const wallet = useWallet();
    let walletAddress = '';
    try{
        if (wallet.connected && wallet.publicKey) {
            walletAddress = wallet.publicKey.toString()
            console.log(walletAddress)
        }
    }catch(e){console.log(e)}*/
    
    return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              {<WalletContainer />}
            </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}