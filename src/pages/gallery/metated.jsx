import Head from "next/head";
import Image from "next/image";
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useWallet } from "@solana/wallet-adapter-react";
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import PageLayout from "../../components/Layouts/PageLayout";
import Collection from "../../components/NFT/Collection";
import { Circles } from "react-loader-spinner";
import classNames from "classnames";

export default function Metated() {
  //states
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { pathname } = useRouter();
  const routeBack = (e) => {
    e.preventDefault();
    router.back();
  };
  const wallet = useWallet();
  {/*const isPhoneEnvironment = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );*/}
  const Connected = () => {
    return (
      <div className="p-4 h-full flex items-center text-center">
        <button 
            id="ExploreMint"
            type="button"
            className="inline-flex items-center text-center gap-x-2.5 p-2 rounded-full font-sans font-semibold hover:bg-indigo-700"
            >
          <span className="flex h-2 w-2 sm:h-3 sm:w-3">
            <span className="relative w-full h-full rounded-md bg-green-500/80"> 
            </span>
            {/*<span className="absolute inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-green-500"></span>*/}
          </span>
          <p className="text-xs items-baseline inline-flex sm:text-sm sm:items-center">Wallet Connected</p>   
        </button>
      </div>
    )
  }
  
  const NotConnected = () => {
    return (
      <div className="p-4 h-full flex items-center text-center">
        <button 
            id="ExploreMint"
            type="button"  
            className="inline-flex items-center text-center gap-x-2 p-2 rounded-full font-sans font-semibold hover:bg-indigo-700"
            >
          <span className="flex h-2 w-2 sm:h-3 sm:w-3">
            <span className="relative w-full h-full rounded-md bg-red-700/80"> 
            </span>
            {/*<span className="absolute inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-red-700"></span>*/}
          </span>
          <p className="text-xs items-baseline inline-flex sm:text-sm sm:items-center">Wallet Offline</p>
        </button>
      </div>
      
    )
  }
  useEffect(() => {
    const handleStart = () => {setIsLoading(true)}
    const handleComplete = () => {setIsLoading(false)}
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routerChangeErorr', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routerChangeErorr', handleComplete);
    }

  }, [router]);
  return (
    <>
      <Head>
        <title>🎨 Gallery | MetaTed</title>
        <meta name="description" content="MetaTed - Gallery Playground"/>
        <meta property="image" content="%PUBLIC_URL%/tednorm.png"/>
        {<meta name="viewport" content="width=device-width, initial-scale=1.0" />}
      </Head>
      <div className="h-screen overflow-auto">
        <NavBar bgFormat={"bg-slate-900"} />
        <div className="max-w-screen-2xl grid w-screen mx-auto items-center p-3 lg:p-6">
          
          {isLoading ? (
            <div className="h-screen w-screen grid place-items-center">
              <Circles 
                width='50' 
                height='50' 
                color="white"
                ariaLabel = "circles-loading"
                wrapperClass="object-center items-center justify-center"
                visible={true} />
            </div>):
          
              (
                <>
                  <nav className="mt-20 pt-5 top-0 pointer-event-auto z-nav w-full overflow-hidden">
                    <div className="flex items-center w-full h-full justify-between flex-row gap-4">
                      <a href="#" onClick={routeBack} className="hover:bg-indigo-700 rounded-md">
                        <div className="inline-flex items-center p-2">
                          <ArrowBackIcon />
                          <p className="mx-1">Back</p>
                        </div>
                      </a>
                      <div>
                        {wallet.connected && wallet.publicKey ? 
                        (<Connected />): (<NotConnected />)
                      }
                      </div>
                    </div>
                  </nav>
                  <PageLayout 
                    collection="Metated"
                    pathname={pathname}
                  >
                    <Collection collection="Metated" />
                  </PageLayout>
                </>
              )
          }
        </div>
      </div>
    </>
  );
}