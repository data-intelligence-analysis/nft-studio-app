import Head from "next/head";
import React, {useMemo} from 'react'
import solanaPayImg from '../assets/solana_pay_white.png';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
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
import { clusterApiUrl } from "@solana/web3.js";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
//required for Solana modal
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContainer =() =>{
  const wallet = useWallet();
    //let walletAddress = '';

    const CheckWallet = () => {
      try{
        if (wallet.connected && wallet.publicKey) {
          //walletAddress = wallet.publicKey.toString()
          return (
              <>
                {/*Donate*/}    
              </> 
          )
        }else{
          return (
              <>
                {<button type="submit" onClick = {() => alert("Connect your solana wallet. To intiate the transaction!")}
                    className="solana-button-text">
                    Donate with <img className = "solana-pay-img" alt= "Solana Pay" src={solanaPayImg} />
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
          <div className="h-full mx-6">
            <div className="m-auto py-20 h-full overflow-y-auto">
              <nav className="top-1 sticky relative pointer-events-none z-index">
                <div className="absolute mt-1 w-full">
                  <div className="flex flex-row gap-4 uppercase rounded-full justify-between px-3 float-left align-middle justify-center pointer-events-auto cursor-pointer">
                    <WalletMultiButton />
                  </div>
                </div>
              </nav>
              <div className="mt-20 grid place-items-center sm:grid-cols-2 mx-auto items-center text-center">
                <div className="mt-6 mx-6 flex bg-slate-200 support-box-shadow cursor-pointer rounded-3xl h-[490px] border-2 border-indigo-500/100 w-[90%] lg:max-w-md"></div>
                <div className="mt-6 mx-6 flex bg-slate-200 support-box-shadow cursor-pointer rounded-3xl h-[490px] border-2 border-indigo-500/100 w-[90%] lg:max-w-md"></div>
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