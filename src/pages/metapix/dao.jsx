import React, {useRef, useState, useEffect} from 'react'
import Head from "next/head";
import Image from "next/image";
import { FaAws } from 'react-icons/fa'
import { SiAmazondynamodb } from 'react-icons/si';
import { FaUnity } from 'react-icons/fa';
import { DiMongodb } from 'react-icons/di';
import { SiFirebase } from 'react-icons/si';
import Link from 'next/link';
import { Circles } from "react-loader-spinner";
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import {useRouter} from 'next/router'
import MetaPixNavBar from "../../components/MetaPixNavBar";
import {buildUrl} from 'cloudinary-build-url';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { MdLeaderboard } from 'react-icons/md'
import { IconContext } from "react-icons";
import { FcComboChart } from "react-icons/fc";
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
//solana packages
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";

//AWS context
import AWSTpls from "../../components/aws/AWSTpls";
import AWSMtb from "../../components/aws/AWSMtb";
import AWSRpg from "../../components/aws/AWSRpg";

//<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(87, 100, 241);"><title></title><path d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.468-2.14-1.404-2.14-1.404s.134.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.404.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334.002-.74.573-1.338 1.27-1.338zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334 0-.74.57-1.338 1.27-1.338z"></path></svg>


/*export async function getServerSideProps() {
  try {
    const options = {
      headers: {
        'X-API-KEY': process.env.AWS_API_KEY,
      }
    }
    const images = [];
    //const imagesRes = await fetch('https://x6sxx9rnl7.execute-api.us-east-1.amazonaws.com/prod/images', options)
    const imageRes = await fetch('https://x6sxx9rnl7.execute-api.us-east-1.amazonaws.com/prod/image', options)
    //const { data: imagesData } = await imagesRes.json();
    const imageData = await imageRes.json();
    //console.log({data: imagesData});
    console.log(imageData);
    images.push(`https://x6sxx9rnl7.execute-api.us-east-1.amazonaws.com/prod/signed-url?key=${imageData.Key}`)
    //imagesData.forEach(({ Key }) =>
      //images.push(`https://x6sxx9rnl7.execute-api.us-east-1.amazonaws.com/prod/signed-url?key=${Key}`),
    //);
    
    console.log(images);
    // map every url to the promise of the fetch
    const requests = images.map(url => fetch(url, options));

    const responses = await Promise.all(requests);
    const data = [];
    await Promise.all(
      responses.map(async (resp) => {
        const json = await resp.json();

        data.push(json);
      }),
    );

    if (!data) {
      throw new Error('Data not found');
    }
    console.log(data)
    return {
      props: {
        data
      }, // will be passed to the page component as props
    }
  } catch (error) {
      return {
        notFound: true,
      }
  };
}*/


export default function DAO ({data}) {
  const activeGame = [
    {
			id: 1,
			name: "The Presumed Lone Survivor",
      period: [
        {time:"Today"},
        {time:"Past Week"},
        {time:"All Time"}
      ],
      
    },
    {
			id: 2,
			name:"MetaTeds: Journey In The Metaverse",
      period: [
        {time:"Today"},
        {time:"Past Week"},
        {time:"All Time"}
      ],
    },
    {
			id: 3,
			name: "RPG",
      period: [
        {time:"Today"},
        {time:"Past Week"},
        {time:"All Time"}
      ],
    },
  ]
  const wallet = useWallet();
  const {connected} =useWallet();
  const router = useRouter();
  const routeBack = (e) => {
    e.preventDefault();
    router.back();
  };
  const {pathname} = useRouter();

  //States
  const [activeGameItems] = useState(activeGame)
  const [activeStats, setActiveStats] = useState(null);
  const [activePeriod, setActivePeriod] = useState(null);
  //const [showFirst, setShowFirst] = useState(false)

  //Active LeaderBoard

  
  const activeLeaderBoard = (event, index) => {
    setActiveStats(index)
  }
  //useEffect
  useEffect(() => {
    window.onload = (event) => {
      console.log('page is fully loaded')

    } 
  },[]);
  
  //Security measure to validate external site urls
  function valURL(url) {
    const parsed = url
    return ['https:', 'http:'].includes(parsed.protocol)
  }
  //cloudinary build url
  const image = '<place_img_here>'
  const url = buildUrl(`metapix_media/${image}`, {
    cloud:{
      cloudName: 'dg7z2hep5',
      resourceType: 'image',
      storageType:'upload'
    },
  })
  const urlBlurred = buildUrl(`metapix_media/${image}`, {
    cloud:{
      cloudName: 'dg7z2hep5',
      resourceType: 'image',
      storageType:'upload'
    },
    transformations:{
      effect:{
        name: 'blur:1000',
        quality: 1
      }
    }
  })
  const metapixImg = {
    background: 'url(/img/spaceship-interior-1.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    inset: '0px',
    backgroundPosition: 'center center',
    position: 'absolute',
    width: '100%',
    height: '550px',
  }
  const metapixImgBluured ={
    background: `url(${urlBlurred}`,
    position: 'relative',
    height: 0,
    backgrounPosition: 'center center',
    backgroundSize: '100%'
  }
  const METATEDS_HOME = '/'
  {/*<Link href="/" passHref legacyBehavior>
    <ArrowBackIcon />
  </Link>*/}

  const myRef = useRef()

  //onclick contexts

  const RenderAWScontexts = ({...props}) => { 
    return (
      <div>
        {props.id === 1 &&
          <AWSTpls props={props}/>
        }
        {props.id === 2 &&
          <AWSMtb props={props}/>
        }
        {props.id === 3 &&
          <AWSRpg props={props}/>
        }
      </div>
    )
  }
  //Sign In Modal
  const signIn = () => {

  }
  return (
    <>
      <Head>
        <title>🧸 DAO | MetaTeds</title>
      </Head>
      <div className="bg-slate-900 min-h-screen">
        <MetaPixNavBar bgFormat={"bg-[#320D12]"} opacity={"opacity-100"}/>
        <div className="min-h-full max-w-full overflow-x-hidden overflow-y-auto items-center py-2 lg:py-4 max-w-screen-2xl border-shadow mx-auto">
          <div className="w-full z-20 bg-slate-900 h-[550px] box-shadow-box gap-2 grid grid-cols-8 lg:grid-cols-13 pb-2 mt-10 px-2 lg:px-4 relative">
            <div className="z-10 animate-zoomin sm:mt-2 lg:mt-4" style={metapixImg}>
              {/*data.map((imgUrl, index) => <Image alt="spaceship-interior" key={imgUrl} src={imgUrl} width={1920} height={1080} />)*/}
            </div>
            <div className="col-span-8 col-start-1 h-[350px] lg:col-start-2 lg:col-span-11 flex text-center items-center justify-center px-6 sm:px-4 z-20">
              <h1 className="text-base sm:text-2xl lg:text-3xl font-pixel uppercase">Empowering community focused & gaming experiences</h1>
            </div>
            <div className="col-start-3 col-span-4 h-[80px] mx-auto lg:col-start-5 lg:col-span-5 font-sans text-center items-center mb-2 z-20">
              <p>Click to view more</p>
              <div className="pt-4">
                <button className="">
                  <ArrowCircleDownIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="z-30 mt-20 mb-3 lg:mt-40 lg:mb-5 py-4 lg:py-6 px-4 lg:px-6 sm:grid sm:grid-cols-2 place-items-center text-center items-center w-full">
            {/*<div className="text-center sm:px-4 py-4">
              <h1 className="font-pixel">About</h1>
            </div>
            <div className="text-center sm:px-4 py-4">
              <p>Image</p>
            </div>*/}
          </div>
          <section className="z-30 my-6 w-full mx-auto p-4 lg:p-8 items-center">
            <h1 className="items-center text-center text-base lg:text-xl mx-auto mt-4 mb-8 font-pixel font-bold">
              MetaPix Blueprints
            </h1>
            <iframe className="p-2 w-full mx-auto px-6" 
                width="420" 
                height="400" 
                src="">
            </iframe>
          </section>
          <section className="my-4 lg:my-8 px-2 sm:px-4 lg:px-6 items-center block mx-auto w-full">
            <div className="p-2 sm:p-4 text-center font-pixel font-bold">
              <h1 className="text-base sm:text-xl lg:text-2xl">Rewarding Holders</h1>
            </div>
            <div className="p-2 lg:px-8 text-center items-center mx-auto font-sans">
              <p className="block">Holders of the MetaTeds NFT would be given an opptunity to compete with other players in our web browser {""} 
                    <span className='inline-flex items-baseline'>
                            <a className="text-indigo-400 underline underline-offset-2 visited:text-indigo-600" 
                                href={valURL(new URL("https://metateds.com/gaming"))?'https://metateds.com/gaming':''} 
                                rel="noopener noreferrer" 
                                target="_blank">
									              <span className="font-sans font-bold text-base inline-flex items-baseline">game</span>
								            </a>
                          </span>{" "} for seasonal rewards, which are granted to the top players. 
                          The top 3 positions in our leaderboard for each season would be rewarded with either SOL, 
                          or NFTs that provide exclsive access to features within our {""}
                          <span className='inline-flex items-baseline'>
                            <a className="text-indigo-400 underline underline-offset-2 visited:text-indigo-600" 
                                href={valURL(new URL("https://metateds.com/"))?'https://metateds.com/':''} 
                                rel="noopener noreferrer" 
                                target="_blank">
									              <span className="font-sans font-bold text-base inline-flex items-baseline">platform</span>
								            </a>
                          </span>. 
                We combine both web2 and web3 frameworks  
                to reward and provide value to our users coupled with an enriched experience
              </p>
              <div className="mt-4 mb-3 lg:mt-6 lg:mb-5 py-4 lg:py-6 px-4 lg:px-6 sm:grid sm:grid-cols-2 place-items-center text-center items-center w-full">
                <div className="text-center sm:px-4 py-4">
                  <h1 className="font-pixel">Season 1</h1>
                  <p className="mt-2">Description</p>
                </div>
                <div className="text-center sm:px-4 py-4">
                  <p>Image</p>
                </div>
                <div className="text-center sm:px-4 py-4">
                  <h1 className="font-pixel">Season 2</h1>
                  <p className="mt-2">TBA</p>
                </div>
                <div className="text-center sm:px-4 py-4">
                  <p>Image</p>
                </div>
              </div>
              <div className="my-4 lg:my-5 p-2 sm:p-4 lg:p-6">
                <div className="pb-6 lg:pb-8 flex items-center justify-center gap-x-2">
                  <IconContext.Provider value={{ size: "3em", className: "global-class-name" }} >
                    <div>
                      <MdLeaderboard />
                    </div>
                  </IconContext.Provider>
                  <h1 className="font-pixel font-bold inline-block text-sm sm:text-lg text-center">Leaderboard</h1>
                </div>
                <div className='py-2 lg:py-6 flex webkitutil-center text-center items-start justify-center min-h-screen relative'>
                  <div className="webkitutil-center flex justify-center w-full px-1 flex-col max-w-2xl">
                    <div className="w-full m-auto">
                      <div className="flex mt-3 mb-2 w-full relative gap-x-4 lg:gap-x-5">
                        {activeGameItems.map((elem, i) => (
                          <button
                            onClick={(event) => activeLeaderBoard(event, i)}
                            type="button"
                            key={i} 
                            className={`sm:skew-x-[-45deg] hover:animate-pulse hover:transition transition-all ${activeStats===i ? "outline outline-2 outline-offset-2 outline-green-600 bg-indigo-500 hover:bg-indigo-800 transition duration-150 ease-out hover:ease-in":""}bg-blue-900 p-1 outline outline-1 outline-offset-2 outline-pink-600 inline-flex webkitutil-center webkit-box-pack items-center align-middle rounded-md font-semibold justify-center relative border-0 h-11 w-[30%] min-w-[2.5rem] select-none`}>
                            <h3 className="font-sans text-[0.6rem] sm:text-xs sm:skew-x-[45deg]">
                              {elem.name}
                            </h3>
                          </button>)
                        )}
                      </div>
                      <div className="flex mt-6 mb-2 w-full items-center webkitutil-center text-center justify-center">
                        {activeGameItems.map((elem, i) => (
                          <div key={i}>
                            {activeStats===i &&
                              <RenderAWScontexts
                                id={elem.id}
                                name={elem.name}
                                period={elem.period}
                              />
                            }
                          </div>
                        ))}
                      </div>
                    </div>
                    
                  </div>
                  
                </div>
                
                <p className="text-left text-xs">
                  refreshed daily - {""}
                  <span className="text-xs text-orange-500 font-bold font-sans">powered by metapix</span>
                </p>
              </div>
              <div className="my-4 pt-4 lg:pt-6 lg:my-5 ">
              <div className="mb-3 flex items-center justify-center gap-x-2">
                  <IconContext.Provider value={{ size: "3em", className: "global-class-name" }} >
                    <div>
                      <FcComboChart />
                    </div>
                  </IconContext.Provider>
                  
                  <h1 className="font-pixel font-bold inline-block text-sm sm:text-lg text-center">Dashboard</h1>
                </div>
                <iframe className="mt-2 w-full mx-auto" 
                        width="600" 
                        height="800" 
                        src="">
                </iframe>
                <p className="text-left text-xs">
                  refreshed daily - {""}
                  <span className="text-xs text-orange-500 font-bold font-sans">powered by metapix</span>
                </p>
                
              </div>
              <h1 className="text-center mt-3 font-pixel font-bold inline-block text-base lg:text-xl">Technology Stack</h1>
              <div className="p-2 sm:p-4 grid grid-cols-2 sm:grid-cols-4 place-items-center items-center">
                {/*<QuickSight fontSize={150} />
                <DynamoDB fontSize={150} />
                <Glue size ={100} />
                <SiAmazondynamodb />*/}
                <IconContext.Provider value={{ size: "6em", className: "global-class-name" }} >
                  <div>
                    <DiMongodb />
                  </div>
                </IconContext.Provider>
                <IconContext.Provider value={{ size: "6em", className: "global-class-name" }} >
                  <div>
                    <FaAws />
                  </div>
                </IconContext.Provider>
                <IconContext.Provider value={{ size: "6em", className: "global-class-name" }} >
                  <div>
                    <FaUnity />
                  </div>
                </IconContext.Provider>
                <IconContext.Provider value={{ size: "6em", className: "global-class-name" }} >
                  <div>
                    <SiFirebase />
                  </div>
                </IconContext.Provider>
                
              </div>
            </div>
          </section>
          <section id="elixir-merger" className="my-6 mx-auto p-2 lg:p-4 items-center h-full">
            <h1 className="text-center my-4 font-bold text-base sm:text-xl lg:text-2xl font-pixel">Evolve MetaTed NFT</h1>
            <div className="my-6 lg:my-8 px-4 lg:px-8">
              <p className="text-center text-sm sm:text-base font-sans block">Mutate the first collection of the MetaTed species (SolTed) with an elixir to evolve and unlock new NFT.</p>
            </div>
            {connected && wallet.publicKey ?
              (<div className="bg-orange-400 h-screen overflow-y-auto overflow-auto rounded-md px-4 lg:px-8">
                <div className="p-4 sm:p-8 h-full sm:w-full">
                  <div className="sm:grid sm:place-items-center sm:grid-rows-8">
                    <div className="mx-auto my-4 sm:my-6 items-center sm:w-full sm:row-start-1 sm:row-span-3 sm:grid sm:grid-cols-8 lg:grid-cols-13">
                      <div className="mx-auto sm:w-[98%] max-w-xs min-w-md h-[250px] border rounded-md sm:col-start-1 sm:col-span-3 lg:col-start-2 lg:col-span-4">
                      </div>
                      <div className="my-3 text-center items-center sm:row-start-2 sm:row-span-1 sm:col-start-1 sm:col-span-3 lg:col-start-2 lg:col-span-4">
                        <button className="px-4 sm:py-2 py-1 bg-indigo-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                          <p className="font-sans font-bold">Load MetaTed ⓵</p>
                        </button>
                      </div>
                      <div className="w-full sm:col-start-4 sm:col-span-2 lg:col-start-6 lg:col-span-3 mx-2 my-4 items-center flex justify-center text-center">
                        <p className="text-3xl text-center hidden sm:block">👉</p>
                        <p className="text-3xl text-center sm:hidden inline-block">👇</p>
                      </div>
                      <div className="mx-auto w-full sm:w-[98%] max-w-xs h-[250px] border rounded-md sm:col-start-6 sm:col-span-3 lg:col-start-9 lg:col-span-4">
                      </div>
                      <div className="my-3 text-center items-center sm:row-start-2 sm:row-span-1 sm:col-start-6 sm:col-span-3 lg:col-start-10 lg:col-span-2">
                        <button className="px-4 sm:py-2 py-1 bg-indigo-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                          <p className="font-sans font-bold">Load Elixir ⓶</p>
                        </button>
                      </div>
                    </div>
                    <div className="mx-auto mt-6 pt-4 sm:pt-0 mb-4 sm:mt-0 sm:mb-0 text-center items-center sm:w-full sm:row-span-1 sm:row-start-4 lg:row-start-4">
                      <div className="mx-auto text-center items-center">
                        <button className="px-4 sm:py-2 py-1 bg-slate-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                          <p className="font-sans font-bold">Merge ⓷</p>
                        </button>
                      </div>
                    </div>
                    <div className="mx-auto mt-4 mb-2 sm:mt-0 sm:mb-0 items-center sm:place-items-center sm:w-full sm:row-start-5 sm:row-span-3">
                      <div className="mx-auto my-4 sm:w-[98%] max-w-xs min-w-md h-[250px] border rounded-md sm:col-start-1 sm:col-span-3 sm:row-span-2 lg:col-start-2 lg:col-span-4">
                      </div>
                      <div className="mt-3 pb-8 text-center items-center sm:row-span-1 sm:col-start-6 sm:col-span-3 lg:col-start-10 lg:col-span-2">
                        <button className="px-4 sm:py-2 py-1 bg-indigo-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                          <p className="font-sans font-bold">Mint ⓸</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>):(
                <div className="px-3 sm:px-6 lg:px-9 lg:py-4 md:grid-cols-8 lg:grid-cols-13 lg:gap-4 py-2 mx-auto">
                  <div className="md:col-span-8 lg:col-span-10 xl:col-span-13 h-full">
                    <section className="bg-transparent text-slate-200 rounded-md shadow-lg p-4 text-center">
                      <h3 className="font-sans text-slate-100 font-pixel text-base lg:text-lg mb-4"><button className="text-indigo-600 visited:text-blue-600 cursor-pointer hover:underline hover:underline-offset-4">Sign in</button> to use this feature</h3>
                    </section>
                  </div>
                </div> 
              )}
          </section>
          <section id="weapon-merger" className="my-6 mx-auto p-2 lg:p-4 items-center h-full">
            <h1 className="text-center my-4 font-bold text-base sm:text-xl lg:text-2xl font-pixel">MetaTed NFT Merger</h1>
            <div className="my-6 lg:my-8 px-4 lg:px-8">
              <p className="text-center text-sm sm:text-base font-sans block">Merge (SolTed) with secondary attributes to unlock new NFTs.</p>
            </div>
            {connected && wallet.publicKey ?
            (<div className="bg-orange-400 h-screen overflow-y-auto overflow-auto rounded-md">
            <div className="p-4 sm:p-8 h-full sm:w-full">
              <div className="sm:grid sm:place-items-center sm:grid-rows-8">
                <div className="mx-auto my-4 sm:my-6 items-center sm:w-full sm:row-start-1 sm:row-span-3 sm:grid sm:grid-cols-8 lg:grid-cols-13">
                  <div className="mx-auto sm:w-[98%] max-w-xs min-w-md h-[250px] border rounded-md sm:col-start-1 sm:col-span-3 lg:col-start-2 lg:col-span-4">
                  </div>
                  <div className="my-3 text-center items-center sm:row-start-2 sm:row-span-1 sm:col-start-1 sm:col-span-3 lg:col-start-2 lg:col-span-4">
                    <button className="px-4 sm:py-2 py-1 bg-indigo-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                      <p className="font-sans font-bold text-sm">Load MetaTed ⓵</p>
                    </button>
                  </div>
                  <div className="w-full sm:col-start-4 sm:col-span-2 lg:col-start-6 lg:col-span-3 mx-2 my-4 items-center flex justify-center text-center">
                    <p className="text-3xl text-center hidden sm:block">👉</p>
                    <p className="text-3xl text-center sm:hidden inline-block">👇</p>
                  </div>
                  <div className="mx-auto w-full sm:w-[98%] max-w-xs h-[250px] border rounded-md sm:col-start-6 sm:col-span-3 lg:col-start-9 lg:col-span-4">
                  </div>
                  <div className="my-3 text-center items-center sm:row-start-2 sm:row-span-1 sm:col-start-6 sm:col-span-3 lg:col-start-10 lg:col-span-2">
                    <button className="px-4 sm:py-2 py-1 bg-indigo-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                      <p className="font-sans font-bold text-sm">Load Attributes ⓶</p>
                    </button>
                  </div>
                </div>
                <div className="mx-auto mt-6 pt-4 sm:pt-0 mb-4 sm:mt-0 sm:mb-0 text-center items-center sm:w-full sm:row-span-1 sm:row-start-4 lg:row-start-4">
                  <div className="mx-auto text-center items-center">
                    <button className="px-4 sm:py-2 py-1 bg-slate-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                      <p className="font-sans font-bold text-sm">Merge ⓷</p>
                    </button>
                  </div>
                </div>
                <div className="mx-auto mt-4 mb-2 sm:mt-0 sm:mb-0 items-center sm:place-items-center sm:w-full sm:row-start-5 sm:row-span-3">
                  <div className="mx-auto my-4 sm:w-[98%] max-w-xs min-w-md h-[250px] border rounded-md sm:col-start-1 sm:col-span-3 sm:row-span-2 lg:col-start-2 lg:col-span-4">
                  </div>
                  <div className="mt-3 pb-8 text-center items-center sm:row-span-1 sm:col-start-6 sm:col-span-3 lg:col-start-10 lg:col-span-2">
                    <button className="px-4 sm:py-2 py-1 bg-indigo-600 hover:bg-slate-900 rounded-md hover:ring-indigo-700 hover:ring-4" onClick={()=>alert('functionality coming soon')}>
                      <p className="font-sans font-bold text-sm">Mint ⓸</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>):(
                <div className="px-3 sm:px-6 lg:px-9 lg:py-4 md:grid-cols-8 lg:grid-cols-13 lg:gap-4 py-2 mx-auto">
                  <div className="md:col-span-8 lg:col-span-10 xl:col-span-13 h-full">
                    <section className="bg-transparent text-slate-200 rounded-md shadow-lg p-4 text-center">
                      <h3 className="font-sans text-slate-100 font-pixel text-base lg:text-lg mb-4"><button onClick="" className="text-indigo-600 visited:text-blue-600 cursor-pointer hover:underline hover:underline-offset-4">Sign in</button> to use this feature</h3>
                    </section>
                  </div>
                </div> 
              )}
          </section>
          <section id="metapix-pixelate" className="my-6 mx-auto p-2 lg:p-4 items-center h-full">
            <h1 className="text-center my-4 font-bold text-base sm:text-xl lg:text-2xl font-pixel">Pixelate Creation Studio</h1>
            <p className="text-center text-sm sm:text-lg font-sans my-6 lg:my-8">Convert 2D art to pixelate versions for a variety of platform and art dependant uses.</p>
            {connected && wallet.publicKey ?
              (<div className="bg-[#343333] h-screen grid w-full rounded-md overflow-y-auto">
                <div className="m-3">
                  <nav className="top-0 left-0 w-full z-30">
                    <div className="flex items-center justify-between px-2 py-2 sm:py-3 sm:px-6 pointer-events-auto w-full mx-auto">
                      <div className="flex flex-row justify-between items-center font-sans h-[50px] rounded-full bg-indigo-700 w-[60%] cursor-pointer max-w-xl">
                        <p className="px-3">📣</p>
                        <div className="mr-2 sm:mr-4 py-3 px-2 sm:px-5 text-left">
                          <p className="text-xs sm:text-base lg:text-lg">Tune into the latest pixelate announcement news live on here</p>
                        </div>
                      </div>
                    </div>
                  </nav>
                  <div className="my-6 sm:mt-8 h-full w-full">
                    <div className="grid sm:flex sm:justify-between items-center sm:gap-x-4 my-8 sm:mx-8 sm:mx-auto lg:justify-center">
                      <div className="flex-col my-6 sm:my-0 lg:py-6 lg:px-8 text-center">
                        <h1 className="font-pixel text-lg lg:text-xl">Local Image Utility</ h1>
                        <div className="w-[300px] border h-[300px] my-2 mx-auto w-full border-slate-100 rounded-md">

                        </div>
                        <span className="font-pixel px-3 h-full flex items-center justify-center">
                          <p className="inline-block px-2">Pixelation:</p>
                          <input
                            onInput=""
                            type="range"
                            min="0"
                            max="15"
                            defaultValue="0"
                            step="1"
                            className="inline-block font-sans"
                            id="pixelationRange"
                            ref={myRef}
                          />
                        </span>
                        <div className="mt-3 px-1 lg:px-2 mb-3 py-1 lg:py-2 grid place-items-center text-center font-sans">
                          <input className="block mx-auto pl-20 sm:pl-10" onChange="" ref={myRef} id="upload" type="file" accept="image/*" />
                        </div>
                        <div className="mt-3 p-2 lg:p-4 flex font-sans font-bold items-center text-center justify-center lg:justify-between gap-x-2 w-full">
                          <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg">Download</p>
                          </button>
                          <button className="px-2 lg:px-4 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg">Post</p>
                          </button>
                          <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg">Tweet</p>
                          </button>
                        </div>
                      </div>
                      <div className="flex-col w-[40%] sm:w-[60%] max-w-xs sm:grid mx-auto items-center hidden">
                        <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                          <p className="text-base lg:text-lg font-pixel text-center">Refresh</p>
                        </button>
                      </div>
                      <div className="flex-col mt-6 sm:mt-0 lg:py-6 lg:px-8 text-center">
                        <h1 className="font-pixel text-lg lg:text-xl">NFT Assets</h1>
                        <div className="w-[300px] border h-[300px] my-2 mx-auto w-full border-slate-100 rounded-md">

                        </div>
                        <span className="font-pixel px-3 h-full flex items-center justify-center">
                          <p className="inline-block px-2">Pixelation:</p>
                          <input
                            onInput=""
                            type="range"
                            min="0"
                            max="15"
                            defaultValue="0"
                            step="1"
                            className="inline-block pixel"
                            id="pixelationRange"
                        />
                        </span>
                        {/*<div className="mt-3 font-sans grid place-items-center mx-auto">
                          <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg">Load NFT</p>
                          </button>
                        </div>*/}
                        <div className="font-sans font-bold mt-3 p-2 lg:p-4 flex items-center text-center justify-center lg:justify-between gap-x-2 w-full">
                          <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg">Load NFT</p>
                          </button>
                          <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg">Mint</p>
                          </button>
                          <button className="px-1 lg:px-2 py-1 lg:py-2 bg-indigo-700 rounded-md">
                            <p className="text-base lg:text-lg">Build Community</p>
                          </button>
                        </div>
                      </div>
                      
                    </div>
                    
                  </div>
                </div>
              </div>):(
                <div className="px-3 sm:px-6 lg:px-9 lg:py-4 md:grid-cols-8 lg:grid-cols-13 lg:gap-4 py-2 mx-auto">
                  <div className="md:col-span-8 lg:col-span-10 xl:col-span-13 h-full">
                    <section className="bg-transparent text-slate-200 rounded-md shadow-lg p-4 text-center">
                      <h3 className="font-sans text-slate-100 font-pixel text-base lg:text-lg mb-4"><button onClick="" className="text-indigo-600 visited:text-blue-600 cursor-pointer hover:underline hover:underline-offset-4">Sign in</button> to use this feature</h3>
                    </section>
                  </div>
                </div> 
              )}
          </section>
          <footer>

          </footer>
        </div>
      </div>
      
    </>
  );
}

