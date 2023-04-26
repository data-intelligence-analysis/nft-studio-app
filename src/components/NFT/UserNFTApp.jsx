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
  const [currentView, setCurrentView] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [numImg, setNumImg] = useState(0)
  const perPage = 1;
  
  //solana network connections
  //const connection = new Connection(clusterApiUrl('mainnet-beta'));
  //const mx = Metaplex.make(connection);
  const connectionRPC = useMemo (() => new Connection(process.env.NEXT_PUBLIC_VERCEL_SOLANA_RPC_HOST, 'confirmed'), [])
  const metaplex =  useMemo(() => new Metaplex(connectionRPC),[connectionRPC])
  const tokenProgram = useMemo(() => new PublicKey(process.env.NEXT_PUBLIC_VERCEL_TOKEN_PROGRAM), [])
  const numImages = 2;
  //
  /*const metaplex = useMemo(
    () => Metaplex.make(connection).use(walletAdapterIdentity(wallet)),
    [connection, wallet]
  );*/

  //Get mint and collection address based on collection
  let mintPublicKey = ''
  let collectionMintAddress = ''
  if (collection === "Metahead"){
    mintPublicKey = new PublicKey(process.env.NEXT_PUBLIC_VERCEL_METAHEAD_MINT_PUBLIC_KEY);
    collectionMintAddress = new PublicKey(process.env.NEXT_PUBLIC_VERCEL_METAHEAD_COLLECTION_KEY);
  }else if (collection === "Metated") {
    mintPublicKey = new PublicKey(process.env.NEXT_PUBLIC_VERCEL_METAHEAD_MINT_PUBLIC_KEY);
    collectionMintAddress = new PublicKey(process.env.NEXT_PUBLIC_VERCEL_METAHEAD_COLLECTION_KEY);  
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
  

  
  const handleLoad = () => {
    setLoading(false)
  };

  const handleError = () => {
    setHasError(true);
  };
  
  function valURL(url) {
    const parsed = url
    return ['https:', 'http:'].includes(parsed.protocol)
  }
  useEffect(() => {
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
    const getAllNFTsWallet = async (walletAddress, setting) => {
      /*const tokenAccounts = await connectionRPC.getParsedTokenAccountsByOwner(publicKey, { mint: mintPublicKey });
      const tokenAccount = tokenAccounts.value[0].account;
      const tokenID = tokenAccount.data.parsed.info.tokenAmount.uiAmount;
      console.log(tokenAccount);*/

      // Create an AbortController that aborts in 100ms.
      const abortController = new AbortController();
      setTimeout(() => abortController.abort(), 800);

      const myNFTs = await metaplex.nfts().findAllByOwner({
        owner: walletAddress
      }, {signal: abortController.signal})
      

      if (!myNFTs.length) {
        setStatusNFT(false)
        return;
      }
      if (setting === "random") {
        const randIdx = Math.floor(Math.random() * myNFTs.length);
        const metadata = await metaplex.nfts().load({ metadata: myNFTs[randIdx] }, {signal: abortController.signal});
        if (!metadata){
          setMetadataNFT(false)
          return;
        }
        return metadata;
      }else if (setting === "loadAll"){
        const nfts = await Promise.all(myNFTs.map(async (nft) => {
          const metadata = await metaplex.nfts().load({ metadata: nft }, {signal: abortController.signal});
          if (!metadata) { 
            setMetadataNFT(false)
            return;
          }
          return metadata;
        }));
        return nfts.filter((nft) => nft !== null)
      } else if (setting === "program"){
        //get token accounts from spl token program id
        const tokenAccounts = await connectionRPC.getParsedTokenAccountsByOwner(walletAddress, { programId: tokenProgram });
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
      }else if (setting === "creator") {
        //const nft = await metaplex.nfts().findByMints({ mints: [mintPublicKey, collectionMintAddress] }, {signal: abortController.signal});
        //const wallet = Keypair.generate();
        const mx = Metaplex.make(connectionRPC)
                  .use(walletAddress)
                  .use(bundlrStorage())

        const creatorKey = new PublicKey(process.env.NEXT_PUBLIC_SELLER_ADDRESS)
        const nft = await mx.nfts().findAllByCreator({creator: creatorKey});
        if (!nft){
          setStatusNFT(false)
          return;
        }
        console.log(nft)
        //return nfts
        const nfts = await Promise.all(nft.map(async (nft) => {
          const metadata = await metaplex.nfts().load({ metadata: nft });
          if (!metadata) { 
            setMetadataNFT(false)
            return;
          }
          return metadata;
        }));
        return nfts.filter((nft) => nft !== null)
      }
      
    }
    /*const execute = async () => {
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = currentPage * perPage;
      const nfts = await loadData(startIndex, endIndex);

      setCurrentView(nfts);
      setLoading(false);
    };*/
    const fetchNFTImage = async () => {
      try {
        setLoading(true)
      
        if (publicKey) {
          const walletAddress = new PublicKey(publicKey.toString())
          /*getNFTImage(walletAddress)
          .then((imageURL) => {
            setNFTImage(imageURL);
          })
          .then(setLoading(false))*/
          //setCurrentView(null)
          getAllNFTsWallet(walletAddress, "loadAll")
          .then((imageURL) => {
            setNFTImages(imageURL);
          })
          .then(setLoading(false))
          //setCurrentPage(1)
          /*getNFTImages(walletAddress)
          .then((imageURL) => {
            setNFTImages(imageURL);
          })
          .then(setLoading(false))*/
          //execute();
        }
      } catch (error) {
          setRPCerror({
            open: true,
            message: error,
            severity: "error",
            hideDuration: 8000
          })
        }
    };
    
    fetchNFTImage();
    
  }, [publicKey, metaplex, connectionRPC, tokenProgram, collectionMintAddress, mintPublicKey]);

  const settings = {
    arrow: true,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
  }

  const previousSlide = () => {
    setStartIndex(Math.max(startIndex - numImages, 0));
  };
  
  const nextSlide = () => {
    setStartIndex(Math.min(startIndex + numImages, nftImages.length - numImages));
  };
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
      <section id="userNFT" className="mt-4 flex items-center justify-center w-full h-full mx-auto">
        {wallet.publicKey && wallet.connected ? (
          <div className="flex items-center justify-center font-sans font-semibold mx-4">
            {statusNFT ? 
              (
                <div className="relative">
                  {metadataNFT ? 
                    (
                      <div className="relative">
                        {loading &&
                            <Circles 
                            width='20' 
                            height='20' 
                            color="white"
                            ariaLabel = "circles-loading"
                            wrapperClass="items-center justify-center"
                            visible={true} />
                        }
                        {/*hasError && <span className="font-sans text-base rounded-xl border-2 border-indigo-600 p-2 px-3">Error Loading NFT</span>*/}
                        {!loading && 
                          (
                            <div className='flex-row gap-3 flex items-center justify-center overflow-hidden'>
                              {nftImages.length ? 
                                (
                                  <div className="flex-row gap-3 flex items-center">
                                    {nftImages.length > numImages ? (<button className="animate-beat"onClick={previousSlide}><ArrowLeftCircleIcon className='h-5 w-5' /></button>): (null) }
                                      {nftImages.slice(startIndex, startIndex + numImages).map((img, index) => (
                                        <div key={index} className={`flex flex-col items-center justify-center h-full`}>
                                          {/*use <img> class to prevent the neeed to define domain*/}
                                            <div className="slide ">
                                              <img 
                                                src={img?.json?.image || `${collection==="Metateds" ? '/tednorm.png': '/ted192.png'}`} 
                                                alt={img.name} 
                                                className="rounded-md h-full w-full object-cover"
                                                height="150"
                                                width="150"
                                              />
                                            </div>
                                            <p className="text-slate-05 block">{img.name}</p>
                                        </div>
                                        
                                      ))}
                                    {nftImages.length > numImages ? (<button className="animate-beat" onClick={nextSlide}><ArrowRightCircleIcon className='h-5 w-5' /></button>): (null) }
                                  </div>
                                )
                                :
                                (
                                  <div>
                                    <img
                                      src={nftImages?.json?.image} 
                                      alt={nftImages.name} 
                                      className="rounded-md h-[200px] w-[200px]"
                                      height="150"
                                      width="150"
                                    />
                                  </div>
                                )
                              }
                            </div>
                          )
                        }
                      </div>
                    ):(
                      <span className="font-sans text-base rounded-xl border-2 border-indigo-600 p-2 px-3">NFT Metadata Not Available</span>
                    )
                  }
                </div>
              ):(
                <div>
                  {collection === "Metahead" &&
                    (
                      <a href={valURL(new URL("https://metateds.com/beta"))? 'https://metateds.com/beta' : ''} target="_blank" rel="noreferrer" className='font-sans text-base rounded-xl border-2 hover:bg-slate-700 border-indigo-600 p-2 px-3'>
                        <span className="text-sm sm:text-base lg:text-lg">Register For NFT</span>
                      </a>
                    )
                  }
                  {collection === "Metated" &&
                    (
                      <a href={valURL(new URL("https://metateds.com/studio"))? 'https://metateds.com/studio' : ''} target="_blank" rel="noreferrer" className='font-sans text-base rounded-xl border-2 hover:bg-slate-700 border-indigo-600 p-2 px-3'>
                        <span className="text-sm sm:text-base lg:text-lg">Buy NFT</span>
                      </a>
                    )
                  }
                </div>
              )
            }
          </div>): (
          <div className="font-sans text-xl rounded-xl border-2 border-indigo-600 p-2 px-3">
            Select Wallet To View NFTs
          </div>
          )
        }
      </section>
    </>
  )
}
