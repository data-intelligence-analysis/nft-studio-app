import Head from "next/head";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
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
  return (
    <>
      <Head>
        <title>🧸 DAO | MetaTeds</title>
      </Head>
      <div className="bg-slate-900 min-h-screen">
        <MetaPixNavBar bgFormat={"bg-[#320D12]"} opacity={"opacity-100"}/>
        <div className="min-h-full w-screen overflow-x-hidden overflow-y-auto items-center py-2 lg:py-4 max-w-screen-2xl mx-auto">
          <section className="w-full bg-slate-900 h-[550px] box-shadow-box gap-2 grid grid-cols-8 lg:grid-cols-13 pb-2 pt-10 px-2 lg:px-4">
            <div className="col-span-8 col-start-1 h-[350px] lg:col-start-2 lg:col-span-11 flex text-center items-center justify-center px-6 sm:px-4">
              <h1 className="text-2xl sm:text-3xl font-pixel uppercase">Empowering community focused & gaming experiences</h1>
            </div>
            <div className="col-start-3 col-span-4 h-[80px] mx-auto lg:col-start-5 lg:col-span-5 font-sans text-center items-center mb-2">
              <p>Click to view more</p>
              <div className="pt-4">
                <button className="" onClick>
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
          <section className="my-4 lg:my-8 px-4 sm:px-6 lg:px-8 items-center block mx-auto w-full">
            <div className="p-2 sm:p-4 flex items-center justify-center font-pixel text-lg sm:text-2xl">
              <h1 ClassName="text-center inline-block">Rewarding Holders</h1>
            </div>
            <div className="p-2 sm:p-4 text-center items-center mx-auto font-sans">
              <p>Holders of the MetaTeds NFT would be given an opptunity to compete with other players in our web browser {""} 
                <a className="text-indigo-500 bold font-pixel text-xs" href={valURL(new URL("https://metateds.com/gaming"))?'https://metateds.com/gaming':''} rel="noopener" target="_blank">
									gaming experience
								</a>{" "} and be rewarded with SOL NFTs that would provide exclsive access to features within our <a className="text-indigo-500 bold font-pixel text-xs" href={valURL(new URL("https://metateds.com/gaming"))?'https://metateds.com/gaming':''} rel="noopener" target="_blank">
									platform
								</a>{" "} . We are merging both web2 and web3 technology, 
                      which is the foundation of platform to bring value to users, 
                      by utilizing AWS and Arweave and other decentralized storage applications 
                      to achieve this goal.</p>
              <div className="p-2 sm:p-4 sm:grid sm:grid-cols-3">
                <p className="p-2">[Images of Web2 technology]</p>
                <p className="p-2">[Images of Web3 technology]</p>
                <p className="p-2">[Images of Web2 technology]</p>
              </div>
            </div>
          </section>
          <section className="my-6 w-full mx-auto p-4 lg:p-8 items-center">
            <h1 className ="items-center text-center text-lg sm:text-2xl mx-auto mt-4 mb-8 font-pixel">
              Blueprints
            </h1>
            <iframe className="w-full mx-auto" 
                width="420" 
                height="400" 
                src="https://www.youtube.com/embed/tgbNymZ7vqY">
            </iframe>
          </section>
          <section id="merger" className="my-6 w-full mx-auto p-2 lg:p-4 items-center h-full">
            <h1 className="text-center my-4 sm:text-2xl font-pixel">Merge Tokens</h1>
            <p className="text-center font-sans my-6 lg:my-8">Description</p>
            {connected && wallet.publicKey ?
              (<div className="overflow-y-auto overflow-auto">
                <div>
                  <div>

                  </div>
                  <div>

                  </div>
                </div>
              </div>):(
                <div className="bg-indigo-700 h-[80vh] grid w-full">
                  <div className="bg-slate-700/80 h-[80vh] grid grid-cols-2 rounded-md ">
                    <div className="my-auto px-4 col-start-1 col-span-2 w-full place-items-center items-center text-center mx-auto flex justify-center">
                      <WalletMultiButton className="font-bold font-display py-2 transition-all duration-150 font-bold hover:ring-4 bg-indigo-700 pointer-cursor hover:bg-indigo-600 hover:ring-indigo-500" style={{background:"#4e44ce", height: "1.9rem", fontSize:"0.875rem", lineHeight: "1.25rem", fontFamily: "Press Start 2P"}}>
                        <p className="font-pixel text-xs">Connect Wallet</p>
                      </WalletMultiButton>
                    </div>
                  </div>
                </div>
              )}
          </section>
          <section id="pixelate" className="">

          </section>
          <footer>

          </footer>
        </div>
      </div>
      
    </>
  );
}