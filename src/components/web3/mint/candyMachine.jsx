import React, { useEffect, useState, useCallback, useMemo, useRef} from 'react';
import { Connection, PublicKey,
  Transaction,
  SYSVAR_SLOT_HASHES_PUBKEY } from "@solana/web3.js";
import { Program, AnchorProvider, web3, BN } from "@project-serum/anchor";
import { MintLayout, TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import { sendTransactions, sleep, DEFAULT_TIMEOUT } from "./connection";
import { CircularProgress } from "@material-ui/core";
import {
  candyMachineProgram,
  TOKEN_METADATA_PROGRAM_ID,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  getAtaForMint,
  getNetworkExpire,
  getNetworkToken,
  CIVIC,
  formatNumber,
  CIVIC_GATEKEEPER_NETWORK,
  toDate
} from "./helpers";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Snackbar } from "@material-ui/core";


const candyMachine = () => {
  return (
    <div>
      
    </div>
  )
}

export default candyMachine