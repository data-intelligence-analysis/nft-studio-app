import React,{ useState, useRef, useEffect, useMemo } from 'react';
import useRouter from 'next/router';
import Image from 'next/image';
import PageLayout from "../Layouts/PageLayout";
import { Circles } from "react-loader-spinner";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, clusterApiUrl, Keypair } from '@solana/web3.js';
import { Metaplex, METADATA_PROGRAM_ID, keypairIdentity, bundlrStorage } from '@metaplex-foundation/js';
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function Collection ({collection}) {
  //4 rows, 3 columns showing nfts
  const initialNftCount = 6;

  //states
  const wallet = useWallet()
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [nftAccounts, setNftAccounts] = useState([]);
  const [loading, setLoading] =useState(true);
  const [displayedNftCount, setDisplayedNftCount] = useState(initialNftCount);
  const [rpcError, setRPCerror] = useState({
    open: false,
    message: "",
    severity: undefined,
  });


  const conn = new Connection(clusterApiUrl("mainnet-beta"));
  const connectionRPC = useMemo (() => new Connection(process.env.NEXT_PUBLIC_VERCEL_SOLANA_RPC_HOST, 'confirmed'), [])
  const metaplex =  useMemo(() => new Metaplex(connectionRPC),[connectionRPC]);

  //Get mint and collection address based on collection
  let collectionMintAddress = ''
  if (collection === "Metahead"){
    collectionMintAddress = process.env.NEXT_PUBLIC_VERCEL_METAHEAD_COLLECTION_KEY;
  }else if (collection === "Metated") {
    collectionMintAddress = process.env.NEXT_PUBLIC_VERCEL_METAHEAD_COLLECTION_KEY;  
  }
  else {
    collectionMintAddress = undefined
  }
  /*useEffect(() => {
    const fetchNftAccounts = async () => {
        const accounts = await connectionRPC.getProgramAccounts(
            //token public key
            new PublicKey(process.env.NEXT_PUBLIC_METAHEAD_MINT_PUBLIC_KEY),
            {
                filters: [
                    {
                        memcmp: {
                            offset: 0,
                            bytes: mintPublicKey.toBase58(),
                        },
                    },
                ],
                encoding: 'jsonParsed',
            },
            { commitment: 'recent' },
        );
        setNftAccounts(accounts);
    };
    fetchNftAccounts();
  }, [connectionRPC, mintPublicKey]);*/

  useEffect(() => {
    const fetchNftAccounts = async (setting) => {
      // Create an AbortController that aborts in 100ms.
      const abortController =  new AbortController();
      setTimeout(() => abortController.abort(), 800);
      if (setting==="creator"){
        const creatorKey = new PublicKey(process.env.NEXT_PUBLIC_VERCEL_SELLER_ADDRESS)
        console.log(creatorKey)
        const nft = await metaplex.nfts().findAllByCreator({creator: creatorKey});
        if (!nft){
          setStatusNFT(false)
          setRPCerror({
            open: true,
            message: 'NFT not available',
            severity: "error",
            hideDuration: 6000
          })
          return;
        }
        console.log(nft);
        //return nfts
        const nfts = await Promise.all(nft.map(async (nft) => {
          const metadata = await metaplex.nfts().load({ metadata: nft });
          if (!metadata) { 
            setMetadataNFT(false)
            return;
          }
          if (metadata?.collection?.address.toString() === collectionMintAddress){
            return metadata
          }
          return null;
        }));
        return nfts.filter((nft) => (nft!==null))
      } else if (setting==="pagination"){
          return null;
      }
      
    }
    const fetchNFTImage = async () => {
      try {
        if (publicKey) {
          setLoading(true)
          //const walletAddress = new PublicKey(publicKey.toString())
          fetchNftAccounts("creator")
          .then((accounts) => {
            setNftAccounts(accounts);
          })
          .then(setLoading(false));
        }
      } catch (error) {
        console.log(error)
        setRPCerror({
          open: true,
          message: error,
          severity: "error",
          hideDuration: 8000
        })
      } 
    };
    fetchNFTImage();
  }, [publicKey, metaplex, collectionMintAddress])
  
  //NFT Collection render
  const NFTCard = ({key, account }) => {
    //const { tokenAmount } = account.account.data.parsed.info
    //const image = tokenAmount?.amount === '1' ? account.account.data.parsed.info?.uri : undefined;
    const image = account
    return (
      <div key={key} className="flex flex-col w-full gap-2 justify-center items-center">
          {image && <img src={image?.collection?.address.toString() === collectionMintAddress ? (image?.json?.image || `${collection==="Metateds" ? '/tednorm.png': '/ted192.png'}`):(null)} 
                    alt="nftCards" 
                    height="100px" 
                    width="100px" 
                    style={{borderRadius:'6px', borderColor: '#ffffff'}} />}
          {/*<div className="mt-2 flex-col flex items-center">
              <p>{account.pubkey.toBase58()}</p>
              <p>{tokenAmount?.amount}x {tokenAmount?.uiAmountString}</p>
          </div>*/}
      </div>
    );
  }
  return (
    <>
      <div className="absolute z-20 m-2 mb-3 text-center item-center text-sm sm:text-base left-0 bottom-0 ">
        <Snackbar
          oopen={rpcError.open}
          autoHideDuration ={
            rpcError.hideDuration === undefined ? 6000: rpcError.hideDuration
          }
          onClose ={() => setRPCerror({...rpcError, open: false})}
        >
          <Alert
            onClose = {() => setRPCerror({...rpcError, open: false})}
            severity = {rpcError.severity}
          >
            {rpcError.message}
          </Alert>
        </Snackbar>
      </div>
      <div id="nftLayout" className="p-2 lg:p-3 sm:col-span-5 lg:col-span-10 place-items-center">
        <div id="nfts" className="mt-2 flex items-center justify-center mb-4 w-full drop-shadow-lg">
          {wallet.publicKey ? (
            <div>
              {loading &&
                  <Circles 
                  width='30' 
                  height='30' 
                  color="white"
                  ariaLabel = "circles-loading"
                  wrapperClass="items-center justify-center"
                  visible={true} />
              }
              {!loading && (
                  <div className="grid place-items-center items-center">
                    <span className="my-8">Coming Sooon</span>
                    {nftAccounts.slice(0, displayedNftCount).map((account, index) => (
                      <NFTCard key={index} account={account} />
                    ))}
                  </div>
                )
              }
            </div>
          ):(<span>Connect Wallet</span>)
          }
        </div>
        <div className="mt-5 flex items-center justify-center mx-auto w-full pointer-events-auto sm:text-base lg:text-lg text-sm font-sans font-bold">
          {/*<button onClick={() => setDisplayedNftCount(displayedNftCount + initialNftCount)}>View More</button>*/}
          <button disabled id="call-more-nfts" type="button" className="cursor-not-allowed rounded-xl p-2 px-4 border-2 border-indigo-700 hover:bg-slate-800">Load More</button>
        </div>
      </div>
    </>
    
  )
}