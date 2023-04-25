import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from "next/image";
import axios from "axios";
import Bottleneck from "bottleneck";
import { Circles } from "react-loader-spinner";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, Keypair, clusterApiUrl} from '@solana/web3.js';
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
  //const connectionCluster = new Connection(clusterApiUrl('mainnet-beta'));
  const connectionRPC = useMemo (() => new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST),[])
  const conn = useMemo (() => new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST, 'confirmed'), [])
  const metaplex =  useMemo(() => new Metaplex(conn),[conn])
  const tokenProgram = new PublicKey(process.env.NEXT_PUBLIC_TOKEN_PROGRAM)
  const numImages = 2;
  //
  /*const metaplex = useMemo(
    () => Metaplex.make(connection).use(walletAdapterIdentity(wallet)),
    [connection, wallet]
  );*/

  //Get mint and collection address based on collection
  //const mintPublicKey = new PublicKey(process.env.NEXT_PUBLIC_METAHEAD_MINT_PUBLIC_KEY);
  let mintPublicKey = ''
  let collectionMintAddress = ''
  if (collection === "Metahead"){
    mintPublicKey = new PublicKey(process.env.NEXT_PUBLIC_METAHEAD_MINT_PUBLIC_KEY);
    collectionMintAddress = new PublicKey(process.env.NEXT_PUBLIC_METAHEAD_COLLECTION_KEY);
  }else if (collection === "Metated") {
    mintPublicKey = new PublicKey(process.env.NEXT_PUBLIC_METAHEAD_MINT_PUBLIC_KEY);
    collectionMintAddress = new PublicKey(process.env.NEXT_PUBLIC_METAHEAD_COLLECTION_KEY);  
  }
  else {
    mintPublicKey = undefined
    collectionMintAddress = undefined
    throw new Error("Mint Address Not Defined");
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
      const tokenAccounts = await connectionRPC.getParsedTokenAccountsByOwner(walletAddress, { mint: mintPublicKey });
      
      //const tokenAccounts_programID = await connectionRPC.getParsedTokenAccountsByOwner(walletAddress, { programId: tokenProgram });
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
      //console.log(myNfts)
      //metadata
      //console.log(nft.json.image);
      //console.log(metadata.uri);
      //console.log(metadata.name); // logs the name of the token
      //console.log(metadata.symbol); // logs the symbol of the token
      //console.log(metadata.data.description); // logs the description of the token
      //console.log(metadata.data.image); // logs the URL of the image associated with the token
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
    const getAllNFTsWallet = async (publicKey, random) => {
      /*const tokenAccounts = await connectionRPC.getParsedTokenAccountsByOwner(publicKey, { mint: mintPublicKey });
      const tokenAccount = tokenAccounts.value[0].account;
      const tokenID = tokenAccount.data.parsed.info.tokenAmount.uiAmount;
      console.log(tokenAccount);*/
      const myNFTs = await metaplex.nfts().findAllByOwner({
        owner: publicKey
      })
      if (!myNFTs.length) {
        setStatusNFT(false)
        return;
      }
      if (random === "true") {
        const randIdx = Math.floor(Math.random() * myNFTs.length);
        const nft = await metaplex.nfts().load({ metadata: myNFTs[randIdx] });
        const imageURL = nft?.json?.image
        const imageArr = [];
        const imageURLs = imageArr.push(imageURL);
        return imageURLs;
      }else if (random === "false"){
        try {
          const nfts = await Promise.all(myNFTs.map(async (nft) => {
            const metadata = await metaplex.nfts().load({ metadata: nft });
            if (!metadata) { 
              setMetadataNFT(false)
              return;
            }
            const imageURL = metadata?.json?.image
            return imageURL;
          }));
          return nfts.filter((nft) => nft !== null)
        } catch (error){

        }
        
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
          getAllNFTsWallet(walletAddress, "false")
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
      } catch (e) {
          console.error(e);
        }
    };
    
    fetchNFTImage();
    
  }, [publicKey, connectionRPC, metaplex, collectionMintAddress, mintPublicKey]);

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
      <section id="userNFT" className="mt-4 flex items-center justify-center w-full mx-auto">
        {wallet.publicKey && wallet.connected ? (
          <div className="flex flex-row items-center justify-center text-base font-sans font-semibold w-full h-[200px] overflow-auto mx-4">
            {statusNFT ? 
              (
                <div>
                  {metadataNFT ? 
                    (
                      <div>
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
                              {nftImages.length > numImages ? (<button className="animate-beat"onClick={previousSlide}><ArrowLeftCircleIcon className='h-5 w-5' /></button>): (null) }
                                {nftImages.slice(startIndex, startIndex + numImages).map((img, index) => (
                                  <div key={index} className={`slide`}>
                                    {/*use <img> class to prevent the neeed to define domain*/}
                                    <div className="flex flex-col items-center justify-center"> 
                                      <img 
                                        src={img || `${collection==="Metateds" ? '/tednorm.png': '/ted192.png'}`} 
                                        alt={`${collection}`} 
                                        className="rounded-md object h-full w-full object-cover"
                                        height="150"
                                        width="150"
                                      />
                                    </div> 
                                  </div>
                                ))}
                              {nftImages.length > numImages ? (<button className="animate-beat" onClick={nextSlide}><ArrowRightCircleIcon className='h-5 w-5' /></button>): (null) }
                              {/*<Image 
                                src={nftImage} 
                                alt={`${collection}`} 
                                className="rounded-md h-[200px] w-[200px]"
                                height="200"
                                width="200"
                                onLoadingComplete={handleLoad}
                              />*/}
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
  )
}
