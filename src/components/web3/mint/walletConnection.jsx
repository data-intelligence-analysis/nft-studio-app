import React, {Fragment, useCallback, useState, useEffect} from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";
import { WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import CandyMachine from './index';
/*import { clusterApiUrl, 
  Connection, 
  LAMPORTS_PER_SOL, 
  PublicKey, 
  SystemProgram, 
  Transaction  
} from '@solana/web3.js';*/
//import purify from 'dompurify'
import {
  useWallet,
} from '@solana/wallet-adapter-react';
import styled from 'styled-components'
import { createTheme, ThemeProvider } from '@material-ui/core';
const Img = styled.img`
  height: 40%;
  width: 40%;
  z-index=1;
  pointer-events: none;
  align-items: center;
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

export default function WalletConnection(){
  
}
