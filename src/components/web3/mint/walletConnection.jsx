import React, {Fragment, useCallback, useState, useEffect} from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import { WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import CandyMachine from './home';
import Image from 'next/image'
import tedintosh from '../../../assets/tedintosh.gif'
//import CandyMachine from './index'
/*import { clusterApiUrl, 
  Connection, 
  LAMPORTS_PER_SOL, 
  PublicKey, 
  SystemProgram, 
  Transaction  
} from '@solana/web3.js';*/
import {
  useWallet,
} from '@solana/wallet-adapter-react';
import styled from 'styled-components'
import { createTheme, ThemeProvider } from "@material-ui/core";
require('@solana/wallet-adapter-react-ui/styles.css');
const Img = styled.img`
  height: 40%;
  width: 40%;
  z-index=1;
  pointer-events: none;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  position: relative;
`

const Div = styled.div`
  position: absolute;
  top:13%;
  width: 28.5%;
  height: 42%;
  background-color: transparent;
  z-index: 0;
  transform: rotate(-.1deg);
  left: 35.7%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: #000;
  font-family: Dogica,Helvetica,Arial;
  padding: 0;
  text-align: center;
  transition: .5s transform ease;
  border-radius: 10px;
}

`
const WalletConnection = () => {
  
  const wallet = useWallet();
  //const {connected} = useWallet();
  //let walletAddress = '';
  
  const WalletIsConnected = () => {
    return (
      <>
        <div className="pt-44 md:pt-64 xl:pt-88 w-full">
          <div className="mx-auto items-center">
            <div className="relative mx-47 sm:mx-40 px-20 sm:px-6 pb-10 md:grid md:place-items-center sm:pb-5 z-10 text-align mx-auto">
                  <Image 
                    alt="computer"
                    priority="true"
                    src={tedintosh}
                    width={450}
                    height={550}
                    style={{objectFit: 'contain', objectPosition: 'center'}}
                  />
                  <Div>

                  </Div>
                
                
            </div>
          </div>
        </div> 
      </>
    )
  }
      
  return (
      <>
        <nav className="pt-1 relative sm:sticky top-[5rem] pointer-event-none z-nav w-full">
          <div className="absolute w-full mt-4">
            <div className="flex items-center float-left sm:float-right font-pixel flex-row px-4">
              <div className= "items-center text-[0.625rem] font-pixel leading-5 sm:leading-6 sm:text-xs md:text-sm pointer-events-auto cursor-pointer bg-[#4e44ce] rounded-full hover:rounded-full hover:text-slate-200 hover:bg-gray-800 justify-center px-0.5">
                <WalletMultiButton className="uppercase" />
              </div>
            </div>
          </div>
        </nav>
        <main>
          {<WalletIsConnected />}
        </main>
      </>
  )
}

export default WalletConnection
//Sanitize data before injecting native HTML codes into the react DOM:
//<div dangerouslySetInnerHTML={{ __html:purify.sanitize(data) }} />

/*const App = ({data}: Props) => {
    <div dangerouslySetInnerHTML={data} />
   }
   <App data={__html:purify.sanitize(data)} />*/
