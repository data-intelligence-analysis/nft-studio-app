import React, {useEffect, useState, useCallback, useMemo, useRef} from 'react';
import { Connection, PublicKey,
  Transaction,
  SYSVAR_SLOT_HASHES_PUBKEY } from "@solana/web3.js";
import { Program, Provider, web3} from "@project-serum/anchor";
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
import RenderDropTimer from './DropTimer';
import MintButton from './MintButton'
import Typography from "@material-ui/core/Typography";

//Material UI dependencies for Mint Container
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Container, Snackbar } from "@material-ui/core";

import styled from 'styled-components'

const { SystemProgram } = web3;

const opts = {
  preflightCommitment: "processed"
};

/*constexport const returnGetCandyMachineState = async () => {

}*/
const CandyMachine = (walletAddress) => {
  //hooks
  const [isUserMinting, setIsUserMinting] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  
  // Add state property inside your component like this
  const [candyMachine, setCandyMachine] = useState(null);
  const [itemsRemaining, setItemsRemaining] = useState();

  //Error handling for env variables
  let error = undefined;
    if (process.env.REACT_APP_SOLANA_NETWORK === undefined) {
      error =
        "Your REACT_APP_SOLANA_NETWORK value in the .env file doesn't look right! The options are devnet and mainnet-beta!";
    } else if (process.env.REACT_APP_SOLANA_RPC_HOST === undefined) {
      error =
        "Your REACT_APP_SOLANA_RPC_HOST value in the .env file doesn't look right! Make sure you enter it in as a plain-text url (i.e., https://metaplex.devnet.rpcpool.com/)";
    }
  //get candyMachineId
  
  const getCandyMachineId = () =>{
    try {
      return new web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID);
    } catch (e) {
      console.log("Failed to construct CandyMachineId", e);
      return undefined;
    }
  }
  
  //env helpers
  const candyMachineId = getCandyMachineId()
  const network = (process.env.REACT_APP_SOLANA_NETWORK ?? "devnet");
  const rpcHost = (process.env.REACT_APP_SOLANA_RPC_HOST ?? web3.clusterApiUrl("devnet"));
  const cluster = network
  const rpcUrl = rpcHost
  const connection = new web3.Connection(rpcHost); //Connection(rpcHost)
  //const Connection3 = useConnection();

  //new
  const anchorWallet = useMemo(() => {
    if (
      !walletAddress ||
      !walletAddress.publicKey ||
      !walletAddress.signAllTransactions ||
      !walletAddress.signTransaction
    ) {
      return;
    }

    return {
      publicKey: walletAddress.publicKey,
      signAllTransactions: walletAddress.signAllTransactions,
      signTransaction: walletAddress.signTransaction,
    } 
  }, [walletAddress]);

  const getMetadata = async (mint) => {
    return (
      //PublicKey.findProgramAddress - old
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"), 
          TOKEN_METADATA_PROGRAM_ID.toBuffer(), 
          mint.toBuffer()
        ],
          TOKEN_METADATA_PROGRAM_ID
      )
    )[0];
  };

  const getCandyMachineCreator = async (candyMachine) => {
    const candyMachineID = new web3.PublicKey(candyMachine);
    //PublicKey.findProgramAddress -old
    return await web3.PublicKey.findProgramAddress(
      [Buffer.from("candy_machine"), candyMachineID.toBuffer()], 
      candyMachineProgram);
  };

  const getMasterEdition = async (mint) => {
    return (
      //PublicKey.findProgramAddress - old
      await web3.PublicKey.findProgramAddress(
          [
            Buffer.from("metadata"), 
            TOKEN_METADATA_PROGRAM_ID.toBuffer(), 
            mint.toBuffer(), 
            Buffer.from("edition")
          ],
          TOKEN_METADATA_PROGRAM_ID
      )
    )[0];
  };
  const getCollectionPDA = async (candyMachineAddress) => {
    //const candyMachineID = new PublicKey(candyMachine);
    return await web3.PublicKey.findProgramAddress(
      [Buffer.from("collection"), candyMachineAddress.toBuffer()],
      candyMachineProgram
    );
  };

  const getCollectionAuthorityRecordPDA = async (mint,newAuthority) => {
    return (
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mint.toBuffer(),
          Buffer.from("collection_authority"),
          newAuthority.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      )
    )[0];
  };
  const getCountdownDate = (candyMachine)=> {
    if (
      candyMachine.state.isActive &&
      candyMachine.state.endSettings?.endSettingType.date
    ) {
      return toDate(candyMachine.state.endSettings.number);
    }
  
    return toDate(
      candyMachine.state.goLiveDate
        ? candyMachine.state.goLiveDate
        : candyMachine.state.isPresale
        ? new anchor.BN(new Date().getTime() / 1000)
        : undefined
    );
  };
  const createAssociatedTokenAccountInstruction = (
    associatedTokenAddress, 
    payer, 
    walletAddress, 
    splTokenMintAddress) => {
    const keys = [
      { pubkey: payer, isSigner: true, isWritable: true },
      { pubkey: associatedTokenAddress, isSigner: false, isWritable: true },
      { pubkey: walletAddress, isSigner: false, isWritable: false },
      { pubkey: splTokenMintAddress, isSigner: false, isWritable: false },
      {
          pubkey: web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
      },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      {
          pubkey: web3.SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false,
      },
    ];
    return new web3.TransactionInstruction({
        keys,
        programId: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        data: Buffer.from([]),
    });
  };

  const getProvider = () =>{
    //const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST
    //const connection = new Connection(rpcHost);
    //Create a new Solana provider object with
    const provider = new Provider(
      connection,
      anchorWallet, //window.solana
      opts.preflightCommitment   
    )
  
    return provider 
  }

  
  //Declare getCandyMachineState as an async method
  const getCandyMachineState = async () =>{
    if (error !== undefined){
      setAlertState({
        open: true,
        message: error,
        severity: "error",
        hideDuration: null,
      });
      return;
    }
    const provider = getProvider();
  
    //Get metadata about your deployed candy machine program
    //const idl = await Program.fetchIdl(candyMachineProgram, provider);
  
    //create a program that you can call
    //const program = new Program(idl, candyMachineProgram, provider);

    
    //fetch the metadata from your candy machine program
    //const candyMachine = await program.account.candyMachine.fetch(
        //candyMachineId//process.env.REACT_APP_CANDY_MACHINE_ID //Candy Machine ID
    //)

    const getProgramState = async () => {
      const idl = await Program.fetchIdl(candyMachineProgram, provider);
      const program = new Program(idl, candyMachineProgram, provider);
      const candyMachine = await program.account.candyMachine.fetch(candyMachineId);
      return [program, candyMachine];
    };
  
    const getCurrentBlockTime = async () => {
      const slot = await connection.getSlot();
      return (await connection.getBlockTime(slot)) ?? new Date().getTime() / 1000;
    };
  
    const [[program, candyMachine], currentBlockTime] = await Promise.all([
      getProgramState(),
      getCurrentBlockTime(),
    ]);

    //Parse out all of our metadata and log it out
  
    const itemsAvailable = candyMachine.data.itemsAvailable.toNumber();
    const itemsRedeemed = candyMachine.itemsRedeemed.toNumber();
    const itemsRemaining = itemsAvailable - itemsRedeemed;
    const goLiveData = candyMachine.data.goLiveDate.toNumber();
    const timeDiff = new Date().getTime() / 1000 - currentBlockTime;
    const goLiveDate = candyMachine.data.goLiveDate !== null ? candyMachine.data.goLiveDate + timeDiff : null;
    const presale =
      candyMachine.data.whitelistMintSettings &&
      candyMachine.data.whitelistMintSettings.presale &&
      (!candyMachine.data.goLiveDate ||
        candyMachine.data.goLiveDate.toNumber() > new Date().getTime()/1000);
    
    
    // Used later in our UI so let's generate this now
    // render the data in a person's local timezone
    const goLiveDateTimeString = `${new Date(
      goLiveData * 1000
    ).toLocaleDateString()} @ ${new Date(
      goLiveData * 1000
    ).toLocaleTimeString()}`;

    // Add this data to your state to render
    setCandyMachine({
      id: candyMachineId, //process.env.REACT_APP_CANDY_MACHINE_ID,
      program,
      state: {
        authority: candyMachine.authority,
        itemsAvailable,
        itemsRedeemed,
        itemsRemaining,
        goLiveData,
        goLiveDateTimeString,
        isSoldOut: itemsRemaining === 0,
        isActive:
          (presale ||
            candyMachine.data.goLiveDate.toNumber() < new Date().getTime() / 1000) &&
          (candyMachine.endSettings
            ? candyMachine.endSettings.endSettingType.date
              ? candyMachine.endSettings.number.toNumber() > new Date().getTime() / 1000
              : itemsRedeemed < candyMachine.endSettings.number.toNumber()
            : true),
        isPresale: presale,
        goLiveDate: candyMachine.data.goLiveDate,
        treasury: candyMachine.wallet,
        tokenMint: candyMachine.tokenMint,
        gatekeeper: candyMachine.data.gatekeeper,
        endSettings: candyMachine.data.endSettings,
        whitelistMintSettings: candyMachine.data.whitelistMintSettings,
        hiddenSettings: candyMachine.data.hiddenSettings,
        price: candyMachine.data.price,
        retainAuthority: candyMachine.data.retainAuthority
      },
    });
    console.log({
      itemsAvailable,
      itemsRedeemed,
      itemsRemaining,
      goLiveDate,
      goLiveData,
      goLiveDateTimeString,
      presale,
    });
  }
  //refresh candyMint when changes occur and return alerts - optional
  /*const refreshCandyMachineState = useCallback (

  );*/
  const mintToken = async (
    ) => {
      const mint = web3.Keypair.generate()
      const userTokenAccountAddress = (
        await getAtaForMint(mint.publicKey, walletAddress.publicKey)
      )[0];
    
      const userPayingAccountAddress = candyMachine.state.tokenMint
      ? (await getAtaForMint(candyMachine.state.tokenMint, walletAddress.publicKey))[0]
      : walletAddress.publicKey;
      
    
      
      const cleanupInstructions = [];
      const candyMachineAddress = candyMachine.id;
      const remainingAccounts = [];
      const signers = [mint];
  
      const instructions = [
        web3.SystemProgram.createAccount({
          fromPubkey: walletAddress.publicKey,
          newAccountPubkey: mint.publicKey,
          space: MintLayout.span,
          lamports:
            await candyMachine.program.provider.connection.getMinimumBalanceForRentExemption(
              MintLayout.span,
            ),
          programId: TOKEN_PROGRAM_ID,
        }),
        Token.createInitMintInstruction(
          TOKEN_PROGRAM_ID,
          mint.publicKey,
          0,
          walletAddress.publicKey,
          walletAddress.publicKey,
        ),
        createAssociatedTokenAccountInstruction(
          userTokenAccountAddress,
          walletAddress.publicKey,
          walletAddress.publicKey,
          mint.publicKey,
        ),
        Token.createMintToInstruction(
          TOKEN_PROGRAM_ID,
          mint.publicKey,
          userTokenAccountAddress,
          walletAddress.publicKey,
          [],
          1,
        ),
      ];
  
      if (candyMachine.state.gatekeeper) {
        remainingAccounts.push({
          pubkey: (await getNetworkToken(walletAddress.publicKey, candyMachine.state.gatekeeper.gatekeeperNetwork))[0],
          isWritable: true,
          isSigner: false,
        });
        if (candyMachine.state.gatekeeper.expireOnUse) {
            remainingAccounts.push({
                pubkey: CIVIC,
                isWritable: false,
                isSigner: false,
            });
            remainingAccounts.push({
                pubkey: (await getNetworkExpire(candyMachine.state.gatekeeper.gatekeeperNetwork))[0],
                isWritable: false,
                isSigner: false,
            });
        }
      }
      
      if (candyMachine.state.whitelistMintSettings) {
        const mint = new web3.PublicKey(candyMachine.state.whitelistMintSettings.mint);
  
        const whitelistToken = (await getAtaForMint(mint, walletAddress.publicKey))[0];
        remainingAccounts.push({
            pubkey: whitelistToken,
            isWritable: true,
            isSigner: false,
        });
  
        if (candyMachine.state.whitelistMintSettings.mode.burnEveryTime) {
          const whitelistBurnAuthority = web3.Keypair.generate();
  
          remainingAccounts.push({
              pubkey: mint,
              isWritable: true,
              isSigner: false,
          });
          remainingAccounts.push({
              pubkey: whitelistBurnAuthority.publicKey,
              isWritable: false,
              isSigner: true,
          });
          signers.push(whitelistBurnAuthority);
          const exists = await candyMachine.program.provider.connection.getAccountInfo(whitelistToken);
          if (exists) {
              instructions.push(
                  Token.createApproveInstruction(
                      TOKEN_PROGRAM_ID,
                      whitelistToken,
                      whitelistBurnAuthority.publicKey,
                      walletAddress.publicKey,
                      [],
                      1
                  )
              );
              cleanupInstructions.push(Token.createRevokeInstruction(TOKEN_PROGRAM_ID, whitelistToken, walletAddress.publicKey, []));
          }
        }
      }
    
      if (candyMachine.state.tokenMint) {
        const transferAuthority = web3.Keypair.generate();
  
        signers.push(transferAuthority);
        remainingAccounts.push({
            pubkey: userPayingAccountAddress,
            isWritable: true,
            isSigner: false,
        });
        remainingAccounts.push({
            pubkey: transferAuthority.publicKey,
            isWritable: false,
            isSigner: true,
        });
  
        instructions.push(
            Token.createApproveInstruction(
                TOKEN_PROGRAM_ID,
                userPayingAccountAddress,
                transferAuthority.publicKey,
                walletAddress.publicKey,
                [],
                candyMachine.state.price.toNumber()
            )
        );
        cleanupInstructions.push(
            Token.createRevokeInstruction(TOKEN_PROGRAM_ID, userPayingAccountAddress, walletAddress.publicKey, [])
        );
      }
      const metadataAddress = await getMetadata(mint.publicKey);
      const masterEdition = await getMasterEdition(mint.publicKey);
  
      const [candyMachineCreator, creatorBump] = await getCandyMachineCreator(candyMachineAddress);
  
      console.log(remainingAccounts.map((rm) => rm.pubkey.toBase58()));
      instructions.push(
        await candyMachine.program.instruction.mintNft(creatorBump, {
          accounts: {
            candyMachine: candyMachineAddress,
            candyMachineCreator,
            payer: walletAddress.publicKey,
            wallet: candyMachine.state.treasury,
            mint: mint.publicKey,
            metadata: metadataAddress,
            masterEdition,
            mintAuthority: walletAddress.publicKey,
            updateAuthority: walletAddress.publicKey,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: web3.SYSVAR_RENT_PUBKEY,
            clock: web3.SYSVAR_CLOCK_PUBKEY,
            recentBlockhashes:SYSVAR_SLOT_HASHES_PUBKEY,//web3.SYSVAR_RECENT_BLOCKHASHES_PUBKEY, //SYSVAR_SLOT_HASHES_PUBKEY, 
            instructionSysvarAccount: web3.SYSVAR_INSTRUCTIONS_PUBKEY,
          },
          remainingAccounts:
            remainingAccounts.length > 0 ? remainingAccounts : undefined,
        }),
      );
  
      
      try{
        setIsUserMinting(true)
        
        //const mintTxn = txns[0]
        return(
          await sendTransactions(
            candyMachine.program.provider.connection,
            candyMachine.program.provider.wallet,
            [instructions, cleanupInstructions],
            [signers, []],
            /*"StopOnFailure",
            "singleGossip",
            () => {},
            () => false,
            undefined*/
          )).txs.map((t) => t.txid)
      }catch(error){ //new
        console.log(error)
  
      }
      return [];
  }
  useEffect(() => {
    getCandyMachineState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return(
    
    <Container sx={{marginTop: 5, width:"100%"}}>
      <Container maxWidth="xs" minWidth="xs" sx={{position: "relative"}}>
        <Paper
          sx={{
            padding: 24,
            paddingBottom: 10,
            backgroundColor: "#151A1F",
            borderRadiues: 6,
          }}
        >
          {/*candyMachine && candyMachine.state && (*/}
            <Grid
              container
              direction="row"
              justifyContent="center"
              wrap="nowrap"
            >
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary">
                  Remaining
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {/*`${candyMachine.state.itemsRemaining}`*/}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary">
                  Size
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {/*`${candyMachine.state.itemsAvailable}`*/}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2" color="textSecondary">
                  Minted
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {/*`${candyMachine.state.itemsRedeemed}`*/}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary">
                    Price
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{ fontWeight: "bold" }}
                >
                  {/*`◎ ${formatNumber.asNumber(
                        candyMachine.state.price
                  )}`*/}
                </Typography>
              </Grid>
            </Grid>
          {/*)}*/}
          <MintContainer>
              {
                /*candyMachine?.state.isActive &&
                candyMachine?.state.gatekeeper &&
                walletAddress.publicKey &&
                walletAddress.signTransaction ? (
                  <MintButton 
                    candyMachine={candyMachine}
                    onMint={mintToken}
                    isMinting={isUserMinting}
                  />
                ):(
                  console.log("Can't load candyMachine state")
                )
                */}
          </MintContainer>
        </Paper>
      </Container>
    </Container>
  )
  
}

const MintContainer = styled.div`
  display: block
`;

export default CandyMachine