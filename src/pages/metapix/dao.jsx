import React, {useRef} from 'react'
import Head from "next/head";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { CircularProgress } from "@material-ui/core";
import { Circles } from "react-loader-spinner";
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';3
import {useRouter} from 'next/router'
import MetaPixNavBar from "../../components/MetaPixNavBar";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
//solana packages
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";

export default function DAO () {
  const wallet = useWallet();
  const {connected} =useWallet();
  const router = useRouter();
  const routeBack = (e) => {
    e.preventDefault();
    router.back();
  };
  const {pathname} = useRouter();
  //Security measure to validate external site urls
  function valURL(url) {
    const parsed = url
    return ['https:', 'http:'].includes(parsed.protocol)
  }
  const METATEDS_HOME = '/'
  {/*<Link href="/" passHref legacyBehavior>
    <ArrowBackIcon />
  </Link>*/}
  const myRef = useRef()
  return (
    <>
      <Head>
        <title>🧸 DAO | MetaTeds</title>
      </Head>
      <div className="bg-slate-900 min-h-screen">
        <MetaPixNavBar bgFormat={"bg-[#320D12]"} opacity={"opacity-100"}/>
        <div className="min-h-full w-screen overflow-x-hidden overflow-y-auto items-center my-2 lg:my-4 max-w-screen-2xl border-shadow mx-auto">
          <section className="w-full bg-slate-900 h-[550px] box-shadow-box gap-2 grid grid-cols-8 lg:grid-cols-13 pb-2 pt-10 px-2 lg:px-4">
            <div className="col-span-8 col-start-1 h-[350px] lg:col-start-2 lg:col-span-11 flex text-center items-center justify-center px-6 sm:px-4">
              <h1 className="text-2xl sm:text-3xl font-pixel uppercase">Empowering community focused & gaming experiences</h1>
            </div>
            <div className="col-start-3 col-span-4 h-[80px] mx-auto lg:col-start-5 lg:col-span-5 font-sans text-center items-center mb-2">
              <p>Click to view more</p>
              <div className="pt-4">
                <button className="">
                  <ArrowCircleDownIcon />
                </button>
              </div>
            </div>
          </section>
          <div className="mt-4 mb-3 lg:mt-6 lg:mb-5 py-4 lg:py-6 px-4 lg:px-6 sm:grid sm:grid-cols-2 place-items-center text-center items-center w-full">
            <div className="text-center sm:px-4 py-4">
              <h1 className="font-pixel">About</h1>
            </div>
            <div className="text-center sm:px-4 py-4">
              <p>Image</p>
            </div>
          </div>
          <section className="my-6 w-full mx-auto p-4 lg:p-8 items-center">
            <h1 className="items-center text-center text-base lg:text-xl mx-auto mt-4 mb-8 font-pixel font-bold">
              MetaPix Blueprints
            </h1>
            <iframe className="p-2 w-full mx-auto px-6" 
                width="420" 
                height="400" 
                src="https://www.youtube.com/embed/tgbNymZ7vqY">
            </iframe>
          </section>
          <section className="my-4 lg:my-8 px-2 sm:px-4 lg:px-6 items-center block mx-auto w-full">
            <div className="p-2 sm:p-4 text-center font-pixel font-bold">
              <h1 className="text-base sm:text-xl lg:text-2xl">Rewarding Holders</h1>
            </div>
            <div className="p-2 lg:px-8 text-center items-center mx-auto font-sans">
              <p className="block">Holders of the MetaTeds NFT would be given an opptunity to compete with other players in our web browser {""} 
                <a className="text-indigo-500 bold font-pixel text-xs" href={valURL(new URL("https://metateds.com/gaming"))?'https://metateds.com/gaming':''} rel="noopener" target="_blank">
									games  
								</a>{" "} for seasonal rewards, which are granted to the top players. 
                          The top 3 positions in our leaderboard for each season would be rewarded with either SOL, 
                          or NFTs that provide exclsive access to features within our 
                          <a className="text-indigo-500 bold font-pixel text-xs" href={valURL(new URL("https://metateds.com/gaming"))?'https://metateds.com/gaming':''} rel="noopener" target="_blank">
									          platform
								          </a>. 
                We combine both web2 and web3 frameworks  
                to reward and provide value to our users coupled with an enriched experience
              </p>
              <div className="mt-4 mb-3 lg:mt-6 lg:mb-5 py-4 lg:py-6 px-4 lg:px-6 sm:grid sm:grid-cols-2 place-items-center text-center items-center w-full">
                <div className="text-center sm:px-4 py-4">
                  <h1 className="font-pixel">Season 1</h1>
                  <p className="mt-2">Description</p>
                </div>
                <div className="text-center sm:px-4 py-4">
                  <p>Image</p>
                </div>
                <div className="text-center sm:px-4 py-4">
                  <h1 className="font-pixel">Season 2</h1>
                  <p className="mt-2">TBA</p>
                </div>
                <div className="text-center sm:px-4 py-4">
                  <p>Image</p>
                </div>
              </div>
              <div className="my-4 lg:my-5">
                <h1 className="mb-3 font-pixel font-bold inline-block text-sm sm:text-lg text-center">[Status] Leaderboard [AWS Dynamo DB, Arweave]</h1>
                <iframe className="w-full mx-auto mt-2" 
                        width="600" 
                        height="800" 
                        src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe>
                <p className="text-left text-xs">
                  refreshed every 45 seconds - {""}
                  <span className="text-xs text-orange-500 font-bold font-sans">powered by metapix</span>
                </p>
              </div>
              <div className="my-4 pt-4 lg:pt-6 lg:my-5 ">
                <h1 className="mb-2 font-pixel font-bold inline-block text-sm sm:text-lg text-center">[Status] Analytics Chart [AWS Quicksight]</h1>
                <iframe className="mt-2 w-full mx-auto" 
                        width="600" 
                        height="800" 
                        src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe>
                <p className="text-left text-xs">
                  refreshed every 45 seconds - {""}
                  <span className="text-xs text-orange-500 font-bold font-sans">powered by metapix</span>
                </p>
                
              </div>
              <h1 className="text-center mt-3 font-pixel font-bold inline-block text-base lg:text-xl">Technology Stack</h1>
              <div className="p-2 sm:p-4 sm:grid sm:grid-cols-3 items-center">
                <p className="p-2">[Images of Web2 technology]</p>
                <p className="p-2">[Images of Web3 technology]</p>
                <p className="p-2">[Images of Web2 technology]</p>
              </div>
            </div>
          </section>
          <section id="elixir-merger" className="my-6 mx-auto p-2 lg:p-4 items-center h-full">
            <h1 className="text-center my-4 font-bold text-base sm:text-xl lg:text-2xl font-pixel">Evolve MetaTed NFT</h1>
            <div className="my-6 lg:my-8 px-4 lg:px-8">
              <p className="text-center text-sm sm:text-base font-sans block">Mutate the first collection of the MetaTed species (SolTed) with an elixir to evolve and unlock new NFT.</p>
            </div>
            {connected && wallet.publicKey ?
              (<div className="bg-orange-400 h-screen overflow-y-auto overflow-auto rounded-md">
                <div className="p-4 sm:p-8 h-full sm:w-full">
                  <div className="sm:grid sm:place-items-center sm:grid-rows-8">
                    <div className="mx-auto my-4 sm:my-6 items-center sm:w-full sm:row-start-1 sm:row-span-3 sm:grid sm:grid-cols-8 lg:grid-cols-13">
                      <div className="mx-auto sm:w-[98%] max-w-xs min-w-md h-[250px] border rounded-md sm:col-start-1 sm:col-span-3 lg:col-start-2 lg:col-span-4">
                      </div>
                      <div className="my-3 text-center items-center sm:row-start-2 sm:row-span-1 sm:col-start-1 sm:col-span-3 lg:col-start-2 lg:col-span-4">
                        <button className="px-4 sm:py-2 py-1 bg-indigo-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                          <p className="font-sans font-bold font-pixel">Load MetaTed ⓵</p>
                        </button>
                      </div>
                      <div className="w-full sm:col-start-4 sm:col-span-2 lg:col-start-6 lg:col-span-3 mx-2 my-4 items-center flex justify-center text-center">
                        <p className="text-3xl text-center hidden sm:block">👉</p>
                        <p className="text-3xl text-center sm:hidden inline-block">👇</p>
                      </div>
                      <div className="mx-auto w-full sm:w-[98%] max-w-xs h-[250px] border rounded-md sm:col-start-6 sm:col-span-3 lg:col-start-9 lg:col-span-4">
                      </div>
                      <div className="my-3 text-center items-center sm:row-start-2 sm:row-span-1 sm:col-start-6 sm:col-span-3 lg:col-start-10 lg:col-span-2">
                        <button className="px-4 sm:py-2 py-1 bg-indigo-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                          <p className="font-sans font-bold font-pixel">Load Elixir ⓶</p>
                        </button>
                      </div>
                    </div>
                    <div className="mx-auto mt-6 pt-4 sm:pt-0 mb-4 sm:mt-0 sm:mb-0 text-center items-center sm:w-full sm:row-span-1 sm:row-start-4 lg:row-start-4">
                      <div className="mx-auto text-center items-center">
                        <button className="px-4 sm:py-2 py-1 bg-slate-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                          <p className="font-sans font-bold font-pixel">Merge ⓷</p>
                        </button>
                      </div>
                    </div>
                    <div className="mx-auto mt-4 mb-2 sm:mt-0 sm:mb-0 items-center sm:place-items-center sm:w-full sm:row-start-5 sm:row-span-3">
                      <div className="mx-auto my-4 sm:w-[98%] max-w-xs min-w-md h-[250px] border rounded-md sm:col-start-1 sm:col-span-3 sm:row-span-2 lg:col-start-2 lg:col-span-4">
                      </div>
                      <div className="mt-3 pb-8 text-center items-center sm:row-span-1 sm:col-start-6 sm:col-span-3 lg:col-start-10 lg:col-span-2">
                        <button className="px-4 sm:py-2 py-1 bg-indigo-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                          <p className="font-sans font-bold font-pixel">Mint ⓸</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>):(
                <div className="bg-orange-400 h-screen grid overflow-y-auto overflow-auto rounded-md">
                  <div className="bg-slate-700/80 h-screen grid grid-cols-2">
                    <div className="my-auto px-4 col-start-1 col-span-2 w-full place-items-center items-center text-center mx-auto flex justify-center">
                      <WalletMultiButton className="font-bold font-display py-2 transition-all duration-150 font-bold hover:ring-4 bg-indigo-700 pointer-cursor hover:bg-indigo-600 hover:ring-indigo-500" style={{background:"#4e44ce", height: "1.9rem", fontSize:"0.875rem", lineHeight: "1.25rem", fontFamily: "Press Start 2P"}} />
                    </div>
                  </div>
                </div>
              )}
          </section>
          <section id="weapon-merger" className="my-6 mx-auto p-2 lg:p-4 items-center h-full">
            <h1 className="text-center my-4 font-bold text-base sm:text-xl lg:text-2xl font-pixel">MetaTed NFT Merger</h1>
            <div className="my-6 lg:my-8 px-4 lg:px-8">
              <p className="text-center text-sm sm:text-base font-sans block">Merge (SolTed) with secondary attributes to unlock new NFTs.</p>
            </div>
            {connected && wallet.publicKey ?
            (<div className="bg-orange-400 h-screen overflow-y-auto overflow-auto rounded-md">
            <div className="p-4 sm:p-8 h-full sm:w-full">
              <div className="sm:grid sm:place-items-center sm:grid-rows-8">
                <div className="mx-auto my-4 sm:my-6 items-center sm:w-full sm:row-start-1 sm:row-span-3 sm:grid sm:grid-cols-8 lg:grid-cols-13">
                  <div className="mx-auto sm:w-[98%] max-w-xs min-w-md h-[250px] border rounded-md sm:col-start-1 sm:col-span-3 lg:col-start-2 lg:col-span-4">
                  </div>
                  <div className="my-3 text-center items-center sm:row-start-2 sm:row-span-1 sm:col-start-1 sm:col-span-3 lg:col-start-2 lg:col-span-4">
                    <button className="px-4 sm:py-2 py-1 bg-indigo-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                      <p className="font-sans font-bold font-pixel">Load MetaTed ⓵</p>
                    </button>
                  </div>
                  <div className="w-full sm:col-start-4 sm:col-span-2 lg:col-start-6 lg:col-span-3 mx-2 my-4 items-center flex justify-center text-center">
                    <p className="text-3xl text-center hidden sm:block">👉</p>
                    <p className="text-3xl text-center sm:hidden inline-block">👇</p>
                  </div>
                  <div className="mx-auto w-full sm:w-[98%] max-w-xs h-[250px] border rounded-md sm:col-start-6 sm:col-span-3 lg:col-start-9 lg:col-span-4">
                  </div>
                  <div className="my-3 text-center items-center sm:row-start-2 sm:row-span-1 sm:col-start-6 sm:col-span-3 lg:col-start-10 lg:col-span-2">
                    <button className="px-4 sm:py-2 py-1 bg-indigo-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                      <p className="font-sans font-bold font-pixel">Load Attributes ⓶</p>
                    </button>
                  </div>
                </div>
                <div className="mx-auto mt-6 pt-4 sm:pt-0 mb-4 sm:mt-0 sm:mb-0 text-center items-center sm:w-full sm:row-span-1 sm:row-start-4 lg:row-start-4">
                  <div className="mx-auto text-center items-center">
                    <button className="px-4 sm:py-2 py-1 bg-slate-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                      <p className="font-sans font-bold font-pixel">Merge ⓷</p>
                    </button>
                  </div>
                </div>
                <div className="mx-auto mt-4 mb-2 sm:mt-0 sm:mb-0 items-center sm:place-items-center sm:w-full sm:row-start-5 sm:row-span-3">
                  <div className="mx-auto my-4 sm:w-[98%] max-w-xs min-w-md h-[250px] border rounded-md sm:col-start-1 sm:col-span-3 sm:row-span-2 lg:col-start-2 lg:col-span-4">
                  </div>
                  <div className="mt-3 pb-8 text-center items-center sm:row-span-1 sm:col-start-6 sm:col-span-3 lg:col-start-10 lg:col-span-2">
                    <button className="px-4 sm:py-2 py-1 bg-indigo-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                      <p className="font-sans font-bold font-pixel">Mint ⓸</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>):(
                <div className="bg-orange-400 h-screen grid overflow-y-auto overflow-auto rounded-md">
                  <div className="bg-slate-700/80 h-screen grid grid-cols-2">
                    <div className="my-auto px-4 col-start-1 col-span-2 w-full place-items-center items-center text-center mx-auto flex justify-center">
                      <WalletMultiButton className="font-bold font-display py-2 transition-all duration-150 font-bold hover:ring-4 bg-indigo-700 pointer-cursor hover:bg-indigo-600 hover:ring-indigo-500" style={{background:"#4e44ce", height: "1.9rem", fontSize:"0.875rem", lineHeight: "1.25rem", fontFamily: "Press Start 2P"}} />
                    </div>
                  </div>
                </div>
              )}
          </section>
          <section id="metapix-pixelate" className="my-6 mx-auto p-2 lg:p-4 items-center h-full">
            <h1 className="text-center my-4 font-bold text-base sm:text-xl lg:text-2xl font-pixel">Pixelate Creation Studio</h1>
            <p className="text-center text-sm sm:text-lg font-sans my-6 lg:my-8">Convert 2D art to pixelate versions for a variety of platform and art dependant uses.</p>
            {connected && wallet.publicKey ?
              (<div className="bg-[#343333] h-screen grid w-full rounded-md overflow-y-auto">
                <div className="m-3">
                  <nav className="top-0 left-0 w-full z-30">
                    <div className="flex items-center justify-between px-2 py-2 sm:py-3 sm:px-6 pointer-events-auto w-full mx-auto">
                      <div className="flex flex-row justify-between items-center font-pixel h-[50px] rounded-full bg-indigo-700 w-[60%] cursor-pointer max-w-xl">
                        <p className="px-3">📣</p>
                        <div className="mr-2 sm:mr-4 py-3 px-2 sm:px-5 text-left">
                          <p className="text-xs sm:text-base lg:text-lg">Tune into the latest pixelate announcement news live on here</p>
                        </div>
                      </div>
                    </div>
                  </nav>
                  <div className="my-6 sm:mt-8 h-full w-full">
                    <div className="grid sm:flex sm:justify-between items-center font-pixel sm:gap-x-4 my-8 sm:mx-8 sm:mx-auto lg:justify-center">
                      <div className="flex-col my-6 sm:my-0 lg:py-6 lg:px-8 text-center">
                        <h1 className="font-pixel text-lg lg:text-xl">Local Image Utility</ h1>
                        <div className="w-[300px] border h-[300px] my-2 mx-auto w-full border-slate-100 rounded-md">

                        </div>
                        <span className="font-pixel px-3 h-full flex items-center justify-center">
                          <p className="inline-block px-2">Pixelation:</p>
                          <input
                            onInput=""
                            type="range"
                            min="0"
                            max="15"
                            defaultValue="0"
                            step="1"
                            className="inline-block"
                            id="pixelationRange"
                            ref={myRef}
                          />
                        </span>
                        <div className="mt-3 px-1 lg:px-2 mb-3 py-1 lg:py-2 grid place-items-center text-center">
                          <input className="block mx-auto pl-20 sm:pl-10" onChange="" ref={myRef} id="upload" type="file" accept="image/*" />
                        </div>
                        <div className="mt-3 p-2 lg:p-4 flex items-center text-center justify-center lg:justify-between gap-x-2 w-full">
                          <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg font-pixel">Download</p>
                          </button>
                          <button className="px-2 lg:px-4 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg font-pixel">Post</p>
                          </button>
                          <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg font-pixel">Tweet</p>
                          </button>
                        </div>
                      </div>
                      <div className="flex-col w-[40%] sm:w-[60%] max-w-xs sm:grid mx-auto items-center hidden">
                        <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                          <p className="text-base lg:text-lg font-pixel text-center">Refresh</p>
                        </button>
                      </div>
                      <div className="flex-col mt-6 sm:mt-0 lg:py-6 lg:px-8 text-center">
                        <h1 className="font-pixel text-lg lg:text-xl">NFT Assets</h1>
                        <div className="w-[300px] border h-[300px] my-2 mx-auto w-full border-slate-100 rounded-md">

                        </div>
                        <span className="font-pixel px-3 h-full flex items-center justify-center">
                          <p className="inline-block px-2">Pixelation:</p>
                          <input
                            onInput=""
                            type="range"
                            min="0"
                            max="15"
                            defaultValue="0"
                            step="1"
                            className="inline-block pixel"
                            id="pixelationRange"
                        />
                        </span>
                        <div className="mt-3 grid place-items-center mx-auto">
                          <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg">Load NFT</p>
                          </button>
                        </div>
                        <div className="mt-3 p-2 lg:p-4 flex items-center text-center justify-center lg:justify-between gap-x-2 w-full">
                          <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg font-pixel">Mint It!</p>
                          </button>
                          <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg font-pixel">Build Community</p>
                          </button>
                        </div>
                      </div>
                      
                    </div>
                    
                  </div>
                </div>
              </div>):(
                <div className="bg-[#343333] h-screen grid w-full rounded-md">
                  <div className="bg-indigo-700/20 h-screen grid grid-cols-2 rounded-md">
                    <div className="my-auto px-4 col-start-1 col-span-2 w-full place-items-center items-center text-center mx-auto flex justify-center">
                      <WalletMultiButton className="font-bold font-display py-2 transition-all duration-150 font-bold hover:ring-4 bg-indigo-700 pointer-cursor hover:bg-indigo-600 hover:ring-indigo-500" style={{background:"#4e44ce", height: "1.9rem", fontSize:"0.875rem", lineHeight: "1.25rem", fontFamily: "Press Start 2P"}} />
                    </div>
                  </div>
                </div>
              )}
          </section>
          <footer>

          </footer>
        </div>
      </div>
      
    </>
  );
}