import Head from "next/head";
import React, {useEffect, useState} from 'react'
//import {AiFillDollarCircle} from "@react-icons/all-files/ai/AiFillDollarCircle";
import {TbCurrencySolana} from "react-icons/tb";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Donate from '../components/Donate';
import CloseIcon from '@mui/icons-material/Close';
import {
    useWallet,
    //useConnection
} from '@solana/wallet-adapter-react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Circles } from "react-loader-spinner";
import Link from 'next/link';
import DesktopWarnModal from "../components/layouts/DesktopWarnModal";


//import {server} from '../config'

const WalletContainer =() =>{
  //react states
  const [loading, setLoading] =useState(false)
  const wallet = useWallet();
  const {publicKey} = useWallet();
  const [priceSOL, setPrice] = useState([]);
  const [modal, setModal] = useState(false);

  //paypal states
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState("");
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  

  /*Paypal Functions*/
  const PayPalamt = "35"
  const PayPalcurrency = "USD"
  const PayPalstyle = {
    color: "blue",
    shape: "pill",
    label: "pay",
    tagline: false,
    layout: "vertical",
    label: "donate"
  }
  //create paypal order

  const createDonateOrder = (data, actions) => {
    return actions.order
        .create({
            purchase_units: [
                {
                    amount: {
                        value: PayPalamt,
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: PayPalamt,
                            },
                        },
                    },
                    items: [
                        {
                            name: "donation-example",
                            quantity: "1",
                            unit_amount: {
                                currency_code: "USD",
                                value: PayPalamt,
                            },
                            category: "DONATION",
                        },
                    ],
                },
            ],
        })
        .then((orderId) => {
            // Your code here after create the donation
            return orderId;
        });
  }
  const createPayPalOrder = (data, actions) => {
    return actions.order
            .create(
              {
                purchase_units: [
                  {
                    amount: {
                      //price charged per order
                      currency_code: PayPalcurrency, 
                      value: PayPalamt
                    }
                  }
                ],
                application_context: {
                  shipping_preference: "NO_SHIPPING"
                },
              }
            )
            .then((orderID) => {
              setOrderID(orderID);
              return orderID;
            })
  }
  //run when paypal payment is approved
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details){
      const {payer} = details;
      setBillingDetails(payer, details);
      setSucceeded(true);
    }).catch(err=> setPaypalErrorMessage("Something went wrong"))
  };

  
  const toggleModal = () => {
    setModal(!modal);
  }
  function valURL(url) {
    const parsed = url
    return ['https:', 'http:'].includes(parsed.protocol)
  }
  const Faq = () => {
    return (
      <>
        {modal ? (
        <div className="inset-0 z-10 fixed bg-[#2e2e30e6]">
          <div className="relative my-10 justify-center mx-auto min-h-full overflow-y-auto p-2 items-center lg:max-w-screen-2xl">
            <div className="mt-8 sticky w-full items-center">
              <button className="text-[30px] py-1 ml-auto flex justify-center items-center h-full text-white bg-transparent cursor-pointer outline-none overflow-hidden hover:ring-4 hover:ring-indigo-600 rounded-md" onClick={toggleModal}>
                <CloseIcon sx={{width: 50, height:38}}/>
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
        ): (null)}
      </>
    )
  }

  useEffect(() => {
    dispatch({
        type: "resetOptions",
        value: {
            ...options,
            currency: PayPalcurrency,
        },
    });
}, [PayPalcurrency]);

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
                <p className="inline-block">Donate</p> <TbCurrencySolana alt="solana" width= {"35"} height={"35"} style={{marginRight:"3px"}}/> {/*<Image alt="solana" width= {"40"} height={"18"} src={solanaPayImg} priority="true" style={{marginRight:"3"}} />*/}
              </button>
            </div>
            {/*<div className="mt-5 flex items-center justify-center sm:mt-10">
              <button type="submit" onClick = {() => alert("Connect your solana wallet, to make payment!")}
                className="solana-button-text bg-[#4e44ce] flex items-center gap-x-1 text-base sm:text-lg font-bold px-2.5 py-1 text-center">
                <p className="inline-block">Donate</p><AiFillDollarCircle alt="usdc" width= {"30"} height={"20"} style={{marginRight:"3px"}} />
              </button> 
            </div>*/} 
            <div className="my-5 flex items-center justify-center sm:mt-10">
              {isPending ? 
              (<Circles 
                  width='50' 
                  height='50' 
                  color="purple"
                  ariaLabel = "circles-loading"
                  wrapperClass="items-center justify-center p-2"
                  wrapperStyle=""
              visible={true} />): (null)}
                <div className="z-10">
                  <PayPalButtons
                      disabled={false}
                      fundingSource="paypal"
                      //forceReRender={[PayPalamt, PayPalcurrency, PayPalstyle]}
                      style={PayPalstyle}
                      createOrder={createDonateOrder}
                      //onApprove={onApprove}
                  />
                </div>
            
              {/*<button type="submit" onClick = {() => alert("Connect your solana wallet, to make payment!")}
                className="solana-button-text bg-[#4e44ce] flex items-center gap-x-1 text-base sm:text-lg font-bold px-2.5 py-1 text-center">
                <p className="inline-block">Paypal</p><FaPaypal alt="Paypal" width={"35"} height={"35"} scale={{marginRight:"3px"}} />
                </button>*/}
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
      
      <NavBar bgFormat={"bg-slate-900/80"} />
      <DesktopWarnModal/>
      <div className="bg-slate-900 h-screen">
        <div className="h-full mx-4 w-full mx-auto max-w-screen-2xl">
          <div className="m-auto py-20 h-full overflow-y-auto">
            <nav className="top-5 lg:sticky relative pointer-events-none z-index">
              <div className="absolute mt-1 w-full">
                {!wallet.connected && !wallet.publicKey ?
                  (
                    <>
                      
                      <div className="flex flex-row gap-4 rounded-full justify-between px-3 float-left align-middle pointer-events-auto text-center items-center cursor-pointer">
                        <h1 className="inline-block text-base sm:text-xl lg:text-3xl text-indigo-500">Connect to wallet above </h1>
                      </div>
                    </>
                    
                  ):(
                    <div className="flex flex-row gap-4 rounded-full justify-between px-3 float-left align-middle pointer-events-auto text-center items-center cursor-pointer">
                      <h1 className="inline-block text-base sm:text-xl lg:text-3xl text-indigo-500">🎉 {""} Connected</h1>
                    </div>)
                }
              </div>
            </nav>
            <div className="mt-12 sm:mt-20 grid place-items-center sm:grid-cols-2 mx-auto items-center text-center">
              <div className="mt-6 mx-5 flex bg-slate-200 support-box-shadow cursor-pointer rounded-3xl h-[280px] sm:h-[450px] border-2 border-indigo-500/100 w-[88%] sm:w-[90%] lg:max-w-md">
                <div className="text-center justify-center w-full p-5 font-['Inter'] h-full">
                  <h1 className="text-slate-900 font-bold text-xl sm:text-3xl font-bold">Donation</h1>
                  <div className="flex items-center justify-center m-4 sm:m-8 cursor-pointer">
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
                  <div className="text-center m-4 sm:m-8 cursor-pointer">
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
      <Footer bgFormat={"bg-slate-900"}/>
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