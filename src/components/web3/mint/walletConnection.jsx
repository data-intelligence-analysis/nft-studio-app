import React from 'react'
import Image from 'next/image'
import tedintosh from '../../../assets/tedintosh.gif'
import CandyMachine from './candyMachine'
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
//require('@solana/wallet-adapter-react-ui/styles.css');

const Div = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  top:5%;
  text-align: center;
  width: 100%;
  height: 55%;
  background-color: transparent;
  z-index: 0;
  transform: rotate(-.1deg);
  left: 0;
  font-size: 25px;
  padding: 0;
  transition: .5s transform ease;
  border-radius: 10px;
  @media (min-width: 490px){
    display: flex;
    position: absolute;
    width: 60%;
    left: 19.5%;
    padding-bottom: 2rem;
  }
  @media (min-width: 768px){
    grid-column: 1/-1;
    width: 85%;
    left: 8%;
    padding-bottom: 4rem;
  }
  @media (min-width: 1024px){
    left: 7%
  }
`

const customLoader = ({src, width, quality}) => {
  return process.env.NODE_ENV === "production" ?
  `${process.env.BASE_URL}/${src}?${width}&q=${quality || 75}`:
`http://localhost:3000/${src}?${width}&q=${quality || 75}`;
}
const WalletConnection = () => {
  
  const wallet = useWallet();
  //const {connected} = useWallet();
  //let walletAddress = '';
  
  const WalletIsConnected = () => {
    return (
      <>
        <div className="py-20 md:py-40 xl:py-50 w-full">
          <div className="mx-auto items-center">
            <div className="relative md:gap-2 justify-content mx-47 sm:mx-40 px-20 sm:px-6 pb-10 md:grid md:place-items-center md:grid-cols-8 sm:pb-5 z-10 text-align mx-auto">
              <Image
                loader={customLoader}
                alt="computer"
                priority="true"
                src={tedintosh}
                width={450}
                height={550}
                style={{objectFit: 'contain', gridColumn: '1 /-1', objectPosition: 'center' }}
              />
              <Div>
                <CandyMachine walletAddress={wallet} />
              </Div>
              
            </div>
          </div>
        </div> 
      </>
    )
  }
      
  return (
      <>
        {/*<nav className="pt-1 relative sm:sticky top-[5rem] pointer-event-none z-nav w-full">
          <div className="absolute w-full mt-4">
            <div className="flex items-center float-left sm:float-right font-pixel flex-row px-4">
              <div className= "items-center text-[0.625rem] font-pixel leading-5 sm:leading-6 sm:text-xs md:text-sm pointer-events-auto cursor-pointer bg-[#4e44ce] rounded-full hover:rounded-full hover:text-slate-200 hover:bg-gray-800 justify-center px-0.5">
                <WalletMultiButton className="uppercase" />
              </div>
            </div>
          </div>
        </nav>*/}
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
