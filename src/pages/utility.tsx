import React, {FC, useMemo, useState} from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter
} from '@solana/wallet-adapter-wallets';
import {
  GlowWalletAdapter
} from '@solana/wallet-adapter-glow';
import {
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import {Responsive, WidthProvider} from "react-grid-layout";
import styled from "styled-components";
import { clusterApiUrl, 
      Connection, 
      LAMPORTS_PER_SOL, 
      PublicKey, 
      SystemProgram, 
      Transaction  
} from '@solana/web3.js';
import Torus from "@toruslabs/solana-embed";
/*import { SolanaWalletAdapter } from "@web3auth/torus-solana-adapter"
import { SolanaWallet } from "@web3auth/solana-provider";
import Web3 from "web3";
import { Web3AuthCore } from "@web3auth/core";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";*/
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');