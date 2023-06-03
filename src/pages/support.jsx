import Head from "next/head";
import React, {useEffect, useState, useRef} from 'react'
//import {AiFillDollarCircle} from "@react-icons/all-files/ai/AiFillDollarCircle";
import {TbCurrencySolana} from "react-icons/tb";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Donate from '../components/Donate';
import CloseIcon from '@mui/icons-material/Close';
import {
    useWallet,
    //useConnection
} from '@solana/wallet-adapter-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Circles } from "react-loader-spinner";
import Link from 'next/link';
import DesktopWarnModal from "../components/layouts/DesktopWarnModal";
import PayPal from "../components/pay/PayPal";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { IconContext } from "react-icons";
import { buildUrl } from 'cloudinary-build-url';
import {
  CubeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

//import {server} from '../config'

const WalletContainer =() =>{
  //Build Url
  const url = buildUrl('metapix_media/workstation_ifhbpq', {
    cloud:{
      cloudName: 'dg7z2hep5',
      resourceType: 'image',
      storageType:'upload'
    },
  })
  //react states
  const [loading, setLoading] =useState(false)
  const wallet = useWallet();
  const {publicKey} = useWallet();
  const [priceSOL, setPrice] = useState([]);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState({
    open: false,
    message: "",
    severity: undefined,
  })
  const [appsModal, setAppsModal] = useState(false)

  //useRef
  const myRef = useRef()
  const toggleAppModal = () => {
    setAppsModal(prev => !prev)
  }
  const toggleModal = () => {
    setModal(!modal);
  }
  const AppsModal = () => {
    return(
      <div className="relative z-[999]" aria-modal="true" id="modal">
        
        <div className="fixed inset-0 bg-opacity-[0.45] cursor-pointer dark:bg-slate-900/20 bg-[#f8f7ff] backdrop-blur-lg opacity-100 w-full">
          
        </div>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div id="modal-block" data-headlessui-state="open"  className="opacity-100 scale-100">
              <div className="flex flex-col items-center justify-center w-full rounded-3xl mx-auto overflow-hidden 
              max-w-[320px] sm:max-w-[598px] md:max-w-[965px] md:flex-row-reverse shadow-xl relative dark:bg-slate-900/80 bg-white">
                <div className="h-[196px] md:h-[640px]">
                  <img 
                    src={url}
                    alt="Interior Metapixhome"
                    className="w-full h-[196px] w-[430px] md:w-full md:h-[640px] overflow-hidden object-cover"
                  />
                </div>
                <div className="font-sans w-full flex flex-col items-center justify-center px-[30px] py-[35px] sm:px-[66px] md:items-start md:justify-start dark:text-slate-50 text-slate-900">
                  <nav className="mt-5 fixed top-0 left-0 p-2 w-full">
                    <div className="flex items-center justify-between text-center">
                      <div className="flex pl-4 flex items-start h-full">
                        <button onClick={toggleAppModal} className="rounded-full hover:outline hover:outline-2 hover:outline-offset-2 dark:hover:outline-white hover:outline-black">
                          <XMarkIcon className="dark:text-white text-black h-6 w-6 items-flex"/>
                        </button>
                      </div>
                    </div>
                  </nav>
                  <h1 className="font-bold text-2xl mb-10">
                    Support
                  </h1>
                  <div className="w-full text-slate-50">
                    {/*<a className="solana-pay" href="https://forms.gle/2p813UayRdro1wxf8" target="_blank" rel="noreferrer">
                            <button className="solana-button-text inline-block font-bold px-4 py-1 text-base sm:text-lg bg-[#4e44ce] rounded-full"> 
                              <span className="join-team-icon-position"><GroupAddIcon /></span> Join Our Team 
                            </button>
                        </a>*/}
                    <a href={valURL(new URL("https://forms.gle/2p813UayRdro1wxf8"))? 'https://forms.gle/2p813UayRdro1wxf8' : ''}  
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center rounded-[15px] min-h-[46px] px-5 sm:min-h-[65px] sm:px-6 font-semibold solana-button-text bg-[#4e44ce] w-full mb-4">
                      Join Our Team
                    </a>
                    <a href={valURL(new URL("https://discord.gg/QveexJXGQ2"))? 'https://discord.gg/QveexJXGQ2' : ''}  
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center rounded-[15px] min-h-[46px] px-5 sm:min-h-[65px] sm:px-6 font-semibold solana-button-text bg-[#4e44ce] w-full mb-4">
                      Discord Support
                    </a>
                    <button onClick={() => alert('AI Chatbot coming soon')} 
                        className="flex items-center justify-center rounded-[15px] min-h-[46px] px-5 sm:min-h-[65px] sm:px-6 font-semibold solana-button-text bg-[#4e44ce] w-full mb-4">
                      Chatroom
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  function valURL(url) {
    const parsed = url
    return ['https:', 'http:'].includes(parsed.protocol)
  }
  const Faq = () => {
    return (
      <>
        {modal ? (
        <div className="inset-0 z-30 fixed bg-[#2e2e30e6]">
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

  useEffect(()=>{
    setLoading(true)
    if (publicKey){
        fetch(`/api/fetchPrice`,{
            headers: {
              'Accept': 'application/json'
            }
          }
        )
        .then(response => response.json())
        .then( data => {
          setPrice(data);
          console.log("SOL Payment Price Info", data)
        })
        .then(setLoading(false))
        .catch(err => (
            setError({
              open: true,
              message: err,
              severity: 'error',
              hideDuration: 7000
            })
          )
        )
    }
  }, [publicKey])

  useEffect(() => {
    const HandleClicks = (e) => {
      if (myRef.current && !myRef.current.contains(e.target)){
        // user clicked outside of modal container, close the modal
        return;
      }
      setAppsModal(false)
    }
    window.addEventListener("click", HandleClicks)
    // CLEANUP
    // remove event listener
    return () => {
      window.removeEventListener("click", HandleClicks)
    }
  },[])


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
            {<div className="flex items-center justify-center w-full">
              <button type="submit" onClick = {() => alert("Connect your solana wallet, to make payment!")}
                className="solana-button-text bg-[#4e44ce] flex items-center text-base gap-x-1 sm:text-lg font-bold px-14 rounded-full py-1 text-center">
                <p className="inline-block">Donate</p> <TbCurrencySolana alt="solana" width= {"35"} height={"35"} style={{marginRight:"3px"}}/> 
              </button>
            </div>}
            {<PayPal />}
            {/*<Image alt="solana" width= {"40"} height={"18"} src={solanaPayImg} priority="true" style={{marginRight:"3"}} />*/}
            {/*<div className="mt-5 flex items-center justify-center sm:mt-10">
              <button type="submit" onClick = {() => alert("Connect your solana wallet, to make payment!")}
                className="solana-button-text bg-[#4e44ce] flex items-center gap-x-1 text-base sm:text-lg font-bold px-2.5 py-1 text-center">
                <p className="inline-block">Donate</p><AiFillDollarCircle alt="usdc" width= {"30"} height={"20"} style={{marginRight:"3px"}} />
              </button> 
            </div>*/} 
            {/*<div className="my-5 flex items-center justify-center sm:mt-10">
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
              </div>*/}
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
          {appsModal && <div ref={myRef}><AppsModal/></div>}
          <div className="h-full mx-4 w-full mx-auto max-w-screen-2xl">
            <div className="m-auto py-20 h-full overflow-y-auto">
              <nav className="top-10 mb-4 lg:sticky relative pointer-events-none z-index">
                <div className="absolute mt-2 sm:mt-3 w-full">
                  {!wallet.connected && !wallet.publicKey ?
                    (
                      <>
                        {/*<div className="w-screen max-w-screen-2xl flex flex-row gap-4 rounded-full justify-between px-3 float-left align-middle pointer-events-auto text-center items-center cursor-pointer">
                          <h1 className="inline-block text-base sm:text-xl lg:text-3xl text-indigo-500">Connect to wallet above </h1>
                        </div>*/}
                      </>
                    ):(
                      <div className="flex flex-row gap-4 rounded-full justify-between px-3 float-left align-middle pointer-events-auto text-center items-center cursor-pointer">
                        <h1 className="inline-block text-base sm:text-xl lg:text-3xl text-indigo-500">🎉 {""} Connected</h1>
                      </div>)
                  }
                </div>
              </nav>
              <div className="mt-5 sm:mt-10 grid place-items-center sm:grid-cols-2 mx-auto items-center text-center">
                <div className="mt-6 mx-5 flex bg-slate-900/50 support-box-shadow cursor-pointer rounded-3xl h-[280px] sm:h-[450px] border-2 border-indigo-500/100 w-[88%] sm:w-[90%] lg:max-w-md">
                  <div className="text-center justify-center w-full p-5 font-['Inter'] h-full">
                    <h1 className="text-violet-700 font-bold text-xl sm:text-3xl font-bold">Donation</h1>
                    <div className="flex items-center justify-center m-4 sm:m-8 cursor-pointer">
                      <CheckWallet />
                    </div>
                  </div>
                  
                </div>
                <div className="mt-6 mx-2 sm:mx-4 flex bg-slate-900/50 support-box-shadow cursor-pointer rounded-3xl h-[280px] sm:h-[450px] border-2 border-indigo-500/100 w-[88%] sm:w-[90%] lg:max-w-md">
                  <div className="text-center justify-center w-full p-5 font-['Inter'] h-full">
                    <h1 className="text-violet-700 font-bold text-xl sm:text-3xl font-bold">Help Center</h1>
                    <div className="flex items-center justify-center m-4 sm:m-8 cursor-pointer">
                      
                        <button onClick={toggleAppModal} className="solana-button-text inline-block font-bold px-4 py-1 text-base sm:text-lg bg-[#4e44ce] rounded-full"> 
                          <span className="join-team-icon-position"><GroupAddIcon /></span> Contact Us 
                        </button>
                      
                        
                    </div>
                    <div className="text-center m-5 sm:m-10 cursor-pointer">
                      <button className="solana-button-text inline-block font-bold px-14 py-1 text-base sm:text-lg bg-[#4e44ce] rounded-full" onClick={toggleModal}> 
                          <p className="inline-block items-center text-center">FAQ {" "} 📜</p>
                      </button>
                    </div>
                    {modal && <Faq />}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-10 left-0 z-30 mb-4 items-center">
              <Snackbar
                open={error.open}
                autoHideDuration={
                  error.hideDuration === undefined ? 6000 : error.hideDuration
                }
                onClose={() => setError({ ...error, open: false })}
              >
                <div className="p-2 my-3 w-full">
                  <Alert
                    onClose={() => setError({ ...error, open: false })}
                    severity={error.severity}
                  >
                    {error.message}
                  </Alert>
                </div>
              </Snackbar>
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