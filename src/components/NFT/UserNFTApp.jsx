import React, { useState, useEffect, useMemo} from 'react';
import Image from "next/image";
import axios from "axios";
import Bottleneck from "bottleneck";
import { Circles } from "react-loader-spinner";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, clusterApiUrl, Keypair } from '@solana/web3.js';
import { Metaplex, METADATA_PROGRAM_ID, keypairIdentity, bundlrStorage } from '@metaplex-foundation/js';
import Slider from "react-slick";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function UserNFTApp ({collection}){

  //states
  const wallet = useWallet()
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [statusNFT, setStatusNFT] = useState(true);
  const [mintStatus, setMintStatus] = useState(false);
  const [metadataNFT, setMetadataNFT] = useState(true);
  const [nftImage, setNFTImage] = useState('');
  const [nftImages, setNFTImages] = useState([]);
  const [loading, setLoading] =useState(true);
  const [hasError, setHasError] = useState(false);
  const [rpcError, setRPCerror] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [numImg, setNumImg] = useState(0)
  const numImages = 2;
  
  //solana network connections
  //const connection = new Connection(clusterApiUrl('mainnet-beta'));
  //const mx = Metaplex.make(connection);
  const connectionRPC = useMemo (() => new Connection(process.env.NEXT_PUBLIC_VERCEL_SOLANA_RPC_HOST, 'confirmed'), [])
  const metaplex =  useMemo(() => new Metaplex(connectionRPC),[connectionRPC])
  const tokenProgram = useMemo(() => new PublicKey(process.env.NEXT_PUBLIC_VERCEL_TOKEN_PROGRAM), [])
  //const metaplex = useMemo(
  //  () => Metaplex.make(connection).use(walletAdapterIdentity(wallet)),
  //  [connection, wallet]
  //);

  //Get mint and collection address based on collection
  let mintPublicKey = ''
  let collectionMintAddress = ''
  let creator = process.env.NEXT_PUBLIC_VERCEL_SELLER_ADDRESS
  if (collection === "Metahead"){
    mintPublicKey = new PublicKey(process.env.NEXT_PUBLIC_VERCEL_METAHEAD_MINT_PUBLIC_KEY);
    collectionMintAddress = process.env.NEXT_PUBLIC_VERCEL_METAHEAD_COLLECTION_KEY;
  }else if (collection === "Metated") {
    mintPublicKey = new PublicKey(process.env.NEXT_PUBLIC_VERCEL_METAHEAD_MINT_PUBLIC_KEY);
    collectionMintAddress = null;  
  }
  else {
    mintPublicKey = undefined
    collectionMintAddress = undefined
    setRPCerror({
      open: true,
      message: 'token and collection mint address not available',
      severity: "error",
      hideDuration: 6000
    })
  }
  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 100,
    maxReservations: 10,
  });
  function valURL(url) {
    const parsed = url
    return ['https:', 'http:'].includes(parsed.protocol)
  }
  
  

  useEffect(() => {
    const getAllNFTsWallet = async (walletAddress, setting) => {
      //const tokenAccounts = await connectionRPC.getParsedTokenAccountsByOwner(publicKey, { mint: mintPublicKey });
      //const tokenAccount = tokenAccounts.value[0].account;
      //const tokenID = tokenAccount.data.parsed.info.tokenAmount.uiAmount;
      //console.log(tokenAccount);
      // Create an AbortController that aborts in 100ms.
      const abortController =  new AbortController();
      setTimeout(() => abortController.abort(), 900);

      const myNFTs = await metaplex.nfts().findAllByOwner({
        owner: walletAddress
      }, {signal: abortController.signal} )
      
      
      
      if (!myNFTs.length) {
        setStatusNFT(false)
        setRPCerror({
          open: true,
          message: 'No NFTs available',
          severity: "error",
          hideDuration: 6000
        })
        return;
      }

      if (setting === "random") {
        const randIdx = Math.floor(Math.random() * myNFTs.length);
        const metadata = await metaplex.nfts().load({ metadata: myNFTs[randIdx] });
        if (!metadata){
          setMetadataNFT(false)
          return;
        }
        return metadata;
      }else if (setting === "loadAll"){
        if (collectionMintAddress !== null) {
          const nfts = await Promise.all(myNFTs.map(async (nft) => {
            const metadata = await metaplex.nfts().load({ metadata: nft});
            if (!metadata) { 
              setStatusNFT(false)
              setMetadataNFT(false)
              return;
            }
            if (metadata?.collection?.address.toString() === collectionMintAddress){
              setStatusNFT(true)
              setMetadataNFT(true)
              return metadata
            }else{
              setStatusNFT(false)
              return null;
            }
          }));
          return nfts.filter((nft) => (nft!==null))
        } else {
            setStatusNFT(false)
        }
        
      } 
      else if (setting === "pagination"){
        const start = (currentPage - 1) * numImages;
        const end = currentPage * numImages;
        const nftsToLoad = myNFTs.filter((_, index) => (index >= start && index < end))
        const promises = nftsToLoad.map((metadata) => metaplex.nfts().load({ metadata }));
        return Promise.all(promises);
      }
      else if (setting === "program"){
        //get token accounts from spl token program id
        const tokenAccounts = await connectionRPC.getParsedTokenAccountsByOwner(walletAddress, { programId: tokenProgram });
        const nftAccount = tokenAccounts.value.find((account) => account.account.data.parsed.info.tokenAmount.uiAmount > 0);
        if(!nftAccount){
          setStatusNFT(false)
          //throw new Error("NFT not found in wallet");
        }
        const nft = await metaplex.nfts().findByMint({ mintAddress: mintPublicKey }, {signal: abortController.signal});
        if(!nft){
          setMetadataNFT(false)
          //throw new Error("NFT metadata account not found");
        }
      }else if (setting === "creator") {
        //const nft = await metaplex.nfts().findByMints({ mints: [mintPublicKey, collectionMintAddress] }, {signal: abortController.signal});
        //const wallet = Keypair.generate();
        /*const mx = Metaplex.make(connectionRPC)
                  .use(walletAddress)
                  .use(bundlrStorage())*/
        //const mx = Metaplex.make(connectionRPC)
        const creatorKey = new PublicKey(process.env.NEXT_PUBLIC_VERCEL_SELLER_ADDRESS)
        const nft = await metaplex.nfts().findAllByCreator({creator: creatorKey});
        if (!nft){
          setStatusNFT(false)
          return;
        }
        //return nfts
        const nfts = await Promise.all(nft.map(async (nft) => {
          const metadata = await metaplex.nfts().load({ metadata: nft });
          if (!metadata) { 
            setMetadataNFT(false)
            return;
          }
          return metadata;
        }));
        
      }
    }
    const fetchNFTImage = async () => {
      try {
        if (publicKey) {
          setLoading(true)
          const walletAddress = new PublicKey(publicKey.toString())
          //getNFTImage(walletAddress)
          //.then((imageURL) => {
          //  setNFTImage(imageURL);
          //})
          //.then(setLoading(false))
          //setCurrentView(null)
          
          getAllNFTsWallet(walletAddress, "loadAll")
          .then((imageURL) => {
            setNFTImages(imageURL);
          })
          .then(setLoading(false))
          //setCurrentPage(1)
          //getNFTImages(walletAddress)
          //.then((imageURL) => {
            //setNFTImages(imageURL);
          //})
          //.then(setLoading(false))
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
    
  }, [publicKey, metaplex, startIndex, currentPage, connectionRPC, tokenProgram, collectionMintAddress, mintPublicKey]);

  const currentSlide = (operation) => {
    setLoading(true);
    setCurrentPage(1);
    if (operation==='prev'){
      setCurrentPage((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));
      setStartIndex(Math.max(startIndex - numImages, 0));
    }
    else if (operation==='next'){
      setCurrentPage((prevValue) => prevValue + 1);
      setStartIndex(Math.min(startIndex + numImages, nftImages.length - numImages));
    }
  };

  return (
    <>
      <div className="absolute z-30 m-2 mb-3 text-center item-center text-sm sm:text-base left-0 bottom-10 ">
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
      <section id="userNFT" className="mt-4 flex items-center justify-center w-full h-full mx-auto">
        {wallet.publicKey && wallet.connected ? (
          <div className="flex items-center justify-center font-sans font-semibold mx-4">
            {statusNFT ? 
              (
                <div className="relative">
                  {metadataNFT ? 
                    (
                      <div className="">
                        {loading &&
                            <Circles 
                            width='30' 
                            height='30' 
                            color="white"
                            ariaLabel = "circles-loading"
                            wrapperClass="items-center justify-center"
                            visible={true} />
                        }
                        
                        {!loading && 
                          (
                            <div className='flex h-full w-full items-center justify-center overflow-hidden'>
                              
                              {nftImages.length ? 
                                (
                                  <div className='flex flex-col gap-1 items-center justify-center'>
                                    {/*<div className='mb-2 w-full mx-auto text-center'>
                                      {collection === 'Metated' &&
                                        <p className='font-sans text-xs sm:text-sm'>
                                          Metated NFTs provide lifetime subscription to the platform, <a className="text-indigo-400 underline underline-offset-2 visited:text-indigo-600" 
                                            href={valURL(new URL("https://metated-labs.gitbook.io/metated-labs/subscription-sign-up/paid-packages-supernova/nft-collections/home"))?'https://metated-labs.gitbook.io/metated-labs/subscription-sign-up/paid-packages-supernova/nft-collections/home':''} 
                                            rel="noopener noreferrer" 
                                            target="_blank">
                                            <span className="font-bold">learn more</span>
                                          </a>
                                          </p>
                                      }
                                      {collection === 'Metahead' &&
                                        <p className="font-sans font-sans text-xs sm:text-sm" >
                                          Metahead NFTs provide free services to the platform, <a className="text-indigo-400 underline underline-offset-2 visited:text-indigo-600" 
                                              href={valURL(new URL("https://metated-labs.gitbook.io/metated-labs/subscription-sign-up/free-packages-good/nft-collection/2-metahead"))?'https://metated-labs.gitbook.io/metated-labs/subscription-sign-up/free-packages-good/nft-collection/2-metahead':''} 
                                              rel="noopener noreferrer" 
                                              target="_blank">
                                              <span className="font-bold">learn more</span>
                                          </a>
                                        </p>
                                      }
                                    </div>*/}
                                    <div className="flex-row gap-3 flex items-center">
                                      {nftImages.length>numImages && (<button disabled={currentPage===1} 
                                                                        className={`${currentPage===1 ? 'text-slate-600 cursor-not-allowed': 'text-slate-50 animate-beat'}`}
                                                                        onClick={() => currentSlide('prev')}><ArrowLeftCircleIcon className='h-5 w-5' /></button>) }
                                              <div className='flex flex-col gap-1 items-center'>
                                                <span className='ranchers text-base sm:text-lg'>Click Me, Learn More!</span>
                                                <a href={collection === 'MetaTed'? 
                                                    'https://metated-labs.gitbook.io/metated-labs/subscription-sign-up/paid-packages-supernova/nft-collections/home'
                                                    :'https://metated-labs.gitbook.io/metated-labs/subscription-sign-up/free-packages-good/nft-collection/2-metahead'}
                                                    rel="noopener noreferrer" 
                                                    target="_blank">                                            
                                                  {nftImages.slice(startIndex, startIndex + numImages).map((img, index) => (
                                                      <div key={index} className={`flex items-center justify-center mx-auto`}>
                                                        <div className="flex flex-col items-center justify-center w-full">
                                                          <div className="slide">
                                                            <img 
                                                              src={img?.collection?.address.toString() === collectionMintAddress ? (img?.json?.image || `${collection==="Metateds" ? '/tednorm.png': '/ted192.png'}`):(null)} 
                                                              alt={img?.name} 
                                                              className="rounded-md h-full w-full object-cover"
                                                              height="150"
                                                              width="150"
                                                            />
                                                          </div>
                                                          <p className="text-slate-05 block">{img?.name}</p> 
                                                        </div>
                                                      </div>
                                                  ))}
                                                </a> 
                                              </div>
                                      {nftImages.length>numImages && (<button disabled={(nftImages.length / numImages) === currentPage} 
                                                                                  className={`${nftImages.length / numImages === currentPage ? 'text-slate-600 cursor-not-allowed': 'text-slate-50 animate-beat'}`}
                                                                                  onClick={()=> currentSlide('next')}><ArrowRightCircleIcon className='h-5 w-5' /></button>)}
                                        
                                    </div>
                                  </div>
                                )
                                :
                                (
                                  <div className='flex items-center justify-center'>
                                    {<Circles 
                                      width='30' 
                                      height='30' 
                                      color="white"
                                      ariaLabel = "circles-loading"
                                      wrapperClass="items-center justify-center"
                                      visible={true} /> }
                                  </div>
                                )
                              }
                            </div>
                          )
                        }
                      </div>
                    ):(
                      <span className="font-sans text-sm sm:text-base lg:text-xl rounded-xl border-2 border-indigo-600 p-2 px-3">NFT Metadata Not Available</span>
                    )
                  }
                </div>
              ):(
                <div>
                  {collection === "Metahead" &&
                    (
                      <a href={valURL(new URL("https://metateds.com/beta"))? 'https://metateds.com/beta' : ''} target="_blank" rel="noreferrer" className='font-sans text-base rounded-xl border-2 hover:bg-slate-700 border-indigo-600 p-2 px-3'>
                        <span className="text-sm sm:text-base lg:text-xl">Register For NFT</span>
                      </a>
                    )
                  }
                  {collection === "Metated" &&
                    (
                      <a href={valURL(new URL("https://metateds.com/studio"))? 'https://metateds.com/studio' : ''} target="_blank" rel="noreferrer" className='font-sans text-base rounded-xl border-2 hover:bg-slate-700 border-indigo-600 p-2 px-3'>
                        <button disabled className="text-sm sm:text-base lg:text-xl cursor-not-allowed">Mint coming soon!</button>
                      </a>
                    )
                  }
                </div>
              )
            }
          </div>): (
          <div className="font-sans text-sm sm:text-base lg:text-xl rounded-xl border-2 border-indigo-600 p-2 px-3">
            Select Wallet To View NFTs
          </div>
          )
        }
      </section>
    </>
  )
}

{/*<div className='p-3'>
    {collection === "Metahead" &&
      (
        <a href={valURL(new URL("https://metateds.com/beta"))? 'https://metateds.com/beta' : ''} target="_blank" rel="noreferrer" className='font-sans text-base rounded-xl border-2 hover:bg-slate-700 border-indigo-600 p-2 px-3'>
          <span className="text-sm sm:text-base lg:text-xl">Register For NFT</span>
        </a>
      )
    }
    {collection === "Metated" &&
      (
        <a href={valURL(new URL("https://metateds.com/studio"))? 'https://metateds.com/studio' : ''} target="_blank" rel="noreferrer" className='font-sans text-base rounded-xl border-2 hover:bg-slate-700 border-indigo-600 p-2 px-3'>
          <span className="text-sm sm:text-base lg:text-xl">Buy NFT</span>
        </a>
      )
    }
  </div>*/}
/*hasError && <span className="font-sans text-base rounded-xl border-2 border-indigo-600 p-2 px-3">Error Loading NFT</span>*/
/*const prevSlide = () => {
    setStartIndex(Math.max(startIndex - numImages, 0));
  }
  const nextSlide = () => {
    setStartIndex(Math.min(startIndex + numImages, nftImages.length - numImages));
  }*/
/*const currentSlide = (operation) => {
    //setLoading(true);
    if (operation==='prev'){
      //setCurrentPage((prevValue) => prevValue + 1);
      setStartIndex(Math.max(startIndex - numImages, 0));
    }
    else if (operation==='next'){
      //setCurrentPage((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));
      setStartIndex(Math.min(startIndex + numImages, nftImages.length - numImages));
    }
  };*/

//Image onLoad & onError
/*const handleLoad = () => {
    setLoading(false)
  };

  const handleError = () => {
    setHasError(true);
  };*/
/*const getNFTImage = async (walletAddress, walletPublicKey) => {
      //using rate limits
      const endpoint = `${connectionRPC}/token/${
        mintPublicKey.toBase58()
      }/accounts/?owner=${walletPublicKey.toBase58()}`;
      const response = await limiter.schedule(() => axios.get(endpoint))
      const tokenAccounts = response.data.value
      const nftAccount = tokenAccounts.find(
        (account) => account.account.data.parsed.info.tokenAmount.uiAmount > 0
      );
      //const tokenAccounts = await connectionRPC.getParsedTokenAccountsByOwner(walletAddress, { mint: mintPublicKey });
      //const tokenAccounts_programID = await connectionRPC.getParsedTokenAccountsByOwner(walletPublicKey, { programId: mintPublicKey });
      //const tokenAccount = tokenAccounts.value[0].account;

      //const nftAccount = tokenAccounts_programID.value.find((account) => account.account.data.parsed.info.tokenAmount.uiAmount > 0);

      if(!nftAccount){
        setStatusNFT('Buy NFT')
        throw new Error("NFT not found in wallet");
      }
      //const tokenID = tokenAccount.data.parsed.info.tokenAmount.uiAmount;
      const nftMetadataAddress = new PublicKey(nftAccount.account.data.parsed.info.tokenAmount.tokenInfo.metadata);
      //const metadataAddress = new PublicKey(tokenAccount.data.parsed.info.tokenAmount.metadata);
      
      const metadataAccount = await connectionRPC.getAccountInfo(nftMetadataAddress);
      if(!metadataAccount){
        setMetadataNFT('NFT metadata account not found')
        throw new Error("NFT metadata account not found");
      }
      //const metadata = await connectionRPC.getAccountInfo(metadataAddress);
      //const metadataJSON = JSON.parse(Buffer.from(metadata.data).toString());
      //const imageURL = metadataJSON.data.image;
      const metadata = JSON.parse(Buffer.from(metadataAccount.data).toString());
      const imageURL = metadata.data.image;
      
      return imageURL;
    };
    //solana is injected into the DOM
    //const publicKey = new PublicKey(window.solana.publicKey.tostring());
    //const publicKey = publicKey.toString()
    }*/
    /*const getNFTImage = async (walletAddress) => {
      //using rate limits
      //const endpoint = `${connectionRPC}/token/${
        //mintPublicKey.toBase58()
      //}/accounts/?owner=${walletAddress.toBase58()}`;
      //const response = await limiter.schedule(() => axios.get(endpoint))
      //const tokenAccounts = response.data.value
      //const nftAccount = tokenAccounts.find(
        //(account) => account.account.data.parsed.info.tokenAmount.uiAmount > 0
      //);

      //get token accounts
      const tokenAccounts = await connectionRPC.getParsedTokenAccountsByOwner(walletAddress, { mint: mintPublicKey });
      //const tokenAccount = tokenAccounts.value[0].account;
      //const tokenID = tokenAccount.data.parsed.info.tokenAmount.uiAmount;
      const nftAccount = tokenAccounts.value.find((account) => account.account.data.parsed.info.tokenAmount.uiAmount > 0);
      
      if(!nftAccount){
        setStatusNFT(false)
        //throw new Error("NFT not found in wallet");
      }
      const nft = await metaplex.nfts().findByMint({ mintAddress: mintPublicKey });
      if(!nft){
        setMetadataNFT(false)
        //throw new Error("NFT metadata account not found");
      }
      //metadata
      const imageURL = nft.json.image
      return imageURL
    }*/
    /*const getNFTImages = async (walletAddress) => {
      const tokenAccounts = await connectionRPC.getProgramAccounts(
        new PublicKey(process.env.NEXT_PUBLIC_TOKEN_PROGRAM),
        {
          filters: [
            {
              memcmp: {
                offset: 32,
                bytes: collectionMintAddress.toBase58(),
              },
            },
            {
              dataSize: 165,
            },
            {
              memcmp: {
                offset: 0,
                bytes: walletAddress.toBase58(),
              },
            },
          ],
        }
      );
      const metadataKeys = tokenAccounts.map((tokenAccount) => {
        const [metadataAddress] = PublicKey.findProgramAddressSync(
          [
            Buffer.from('metadata'),
            collectionMintAddress.toBuffer(),
            tokenAccount.account.data.slice(0, 32),
          ],
          new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
        );

        return metadataAddress;
      });
      const metadataAccounts = await Promise.all(
        metadataKeys.map(async (metadataKey) => {
          return await connectionRPC.getAccountInfo(metadataKey);
        })
      );

      const nftImage = metadataAccounts.map((metadataAccount) => {
        const metadata = new Metadata(metadataAccount.data);

        console.log(metadata.data.uri)
        //return metadata.data.uri;
      });
      return nftImage;
    };*/