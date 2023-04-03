import React, {useRef, useState, useEffect} from 'react'
import Head from "next/head";
import Image from "next/image";
import { FaAws } from 'react-icons/fa'
import { SiAmazondynamodb, SiFirebase } from 'react-icons/si';
import { FaUnity } from 'react-icons/fa';
import { DiMongodb } from 'react-icons/di';
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
import { BsCashCoin } from "react-icons/bs";
import { MdToken } from "react-icons/md";
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
//solana packages
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import DesktopWarnModal from "../../components/layouts/DesktopWarnModal";
import { SiBlueprint } from 'react-icons/si';
import CookieBanner from "../../components/layouts/CookieBanner"

//AWS context
import AWSTpls from "../../components/aws/AWSTpls";
import AWSMtb from "../../components/aws/AWSMtb";
import AWSRpg from "../../components/aws/AWSRpg";

//how to send emails with mailgun in nodejs?


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
  const [activeState, setActiveState] = useState(false)
  const [activePeriod, setActivePeriod] = useState(null);
  const [showFirst, setShowFirst] = useState(false)
  //Active LeaderBoard

  
  const activeLeaderBoard = (event, index) => {
    setActiveStats(index)
    setActiveState(true);
  }
  
  
  //Security measure to validate external site urls
  function valURL(url) {
    const parsed = url
    return ['https:', 'http:'].includes(parsed.protocol)
  }
  //cloudinary build url
  const image = '<place_img_here>'
  const image_2 = 'metapix_blueprints_k7z4yf.png'
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
  const blurredUrl = buildUrl(`metapix_media/${image_2}`, {
    cloud:{
      cloudName: 'dg7z2hep5',
      resourceType: 'image',
      storageType:'upload'
    },
  })
  const blueprintsBlurred = buildUrl(`metapix_media/${image_2}`, {
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
    backgroundColor: '#2c2d30',
    backgroundSize: 'cover',
    inset: '0px',
    backgroundPosition: 'center center',
    position: 'absolute',
    width: '100%',
    height: '560px',
    zIndex: '1'
  }
  const metapixImgBlurred = {
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

  //scroll behaviour

  const handleScrollClick = () => {
    const section = document.getElementById('metapix-plan');
    window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
  };
  //onclick contexts
  //leaderboard
  const RenderAWScontexts = ({...props}) => { 
    return (
      <div>
        {/*<AWSTpls props={props}/>*/}
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
  //quicksight - render quicksight dashboard
  const QuickSightChart = () => {
    //replace dashboard-id in the url variable with the ID of the QuickSight dashboard that you want to embed. 
    //The width, height, frameborder, and allow fullscreen attributes of the iframe can be customized to fit your needs.

    //Note that to embed a QuickSight dashboard in an application, you need to first create an embeddable URL for the dashboard in the QuickSight console. 
    //You also need to make sure that the user has the necessary permissions to view the dashboard.
    const url = 'https://us-east-2.quicksight.aws.amazon.com/embed/dashboard/dashboard-id?isAuthEnabled=true&identityProvider=aws';
    return (
      <iframe
        src={url}
        width="100%"
        height="500px"
        frameborder="0"
        allowfullscreen
      />
    );
  }
  

  
  //useEffect
  /*useEffect(() => /*{
    window.onload = (event) => {
      console.log('page is fully loaded')
      setLoadGame(<AWSTpls props={props}/>)
    }
  }*//*showFirst,[]);*/

  //Sign In Modal
  const signIn = () => {

  }
  return (
    <>
      <Head>
        <title>🧸 DAO | MetaTeds</title>
      </Head>
      <DesktopWarnModal />
      <CookieBanner />
      <div className="bg-slate-900 min-h-screen">
        <MetaPixNavBar bgFormat={"bg-[#320D12]"} opacity={"opacity-100"}/>
        <div className="min-h-full max-w-full overflow-x-hidden overflow-y-auto items-center py-2 lg:py-4 max-w-screen-2xl border-shadow mx-auto">
          <div className="w-full bg-slate-900 h-[550px] box-shadow-box gap-2 grid grid-cols-8 lg:grid-cols-13 pb-2 mt-10 px-2 lg:px-4 relative">
            <div className="z-10 animate-zoomin sm:mt-2 lg:mt-4" style={metapixImg}>
              {/*data.map((imgUrl, index) => <Image alt="spaceship-interior" key={imgUrl} src={imgUrl} width={1920} height={1080} />)*/}
            </div>
            <div className='sm:h-[567px] lg:h-[575px] xl:h-[578px] h-[560px] w-full z-20 absolute mx-auto bg-zinc-800/30'>

            </div>
            <div className="col-span-8 col-start-1 h-[350px] lg:col-start-2 lg:col-span-11 flex text-center items-center justify-center px-6 sm:px-4 z-20">
              <h1 className="text-base sm:text-2xl lg:text-3xl font-pixel uppercase">Empowering community focused & gaming experiences</h1>
            </div>
            <div className="font-pixel col-start-3 col-span-4 h-[80px] mx-auto lg:col-start-5 lg:col-span-5 font-sans text-center items-center mb-2 z-20">
              <p className="text-xs font-pixel font-semibold">Click to view more</p>
              <div className="pt-4">
                <button onClick={handleScrollClick} className="animate-beat hover:bg-rose-900/90 hover:rounded-md">
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
          <section id="metapix-plan" className="z-30 my-6 w-full mx-auto p-4 lg:p-8 items-center">
            <h1 className="items-center text-center text-base lg:text-xl mx-auto mt-4 mb-8 font-pixel font-bold">
              MetaPix Blueprints
            </h1>
            <section className="mb-4 font-sans text-lg flex flex-col text-center justify-center mx-auto items-center">
              <p className="mt-4">
                We present to you our {""}
                <span class="inline-flex items-baseline">
                  <SiBlueprint />
                  <span className="font-bold">Builders Guild</span>
                </span>
                {""} the kreme de la creme
              </p>
              <div className='mt-8 w-full flex justify-center mx-auto items-center'>
                <Image 
                  alt='blueprints'
                  src={blurredUrl}
                  loading='lazy'
                  height='550'
                  width='550'
                  placeholder='blur'
                  blurDataURL={blueprintsBlurred}
                />
              </div>
            </section>
          </section>
          <section className="my-4 lg:my-8 px-2 sm:px-4 lg:px-6 items-center block mx-auto w-full">
            <div className="p-2 sm:p-4 text-center font-pixel font-bold">
              <h1 className="text-base sm:text-xl lg:text-2xl">Rewarding Holders</h1>
            </div>
            <div className="p-2 lg:px-8 text-center items-center mx-auto font-sans">
              <p className="block">Holders of the MetaTeds NFT would be given an opportunity to compete with other players in our web browser {""} 
                    <span className='inline-flex items-baseline'>
                            <a className="text-indigo-400 underline underline-offset-2 visited:text-indigo-600" 
                                href={valURL(new URL("https://metateds.com/gaming"))?'https://metateds.com/gaming':''} 
                                rel="noopener noreferrer" 
                                target="_blank">
									              <span className="font-sans font-bold text-base inline-flex items-baseline">Game</span>
								            </a>
                          </span>{" "} for seasonal rewards, which are granted to the top players. To learn more visit our <span className='inline-flex items-baseline'>
                            <a className="text-indigo-400 underline underline-offset-2 visited:text-indigo-600" 
                                href={valURL(new URL("https://metated-labs.gitbook.io/metated-labs"))?'https://metated-labs.gitbook.io/metated-labs':''} 
                                rel="noopener noreferrer" 
                                target="_blank">
									              <span className="font-sans font-bold text-base inline-flex items-baseline">Gitbook</span>
								            </a>
                          </span>.{" "}
                          The top positioned players for each season would be rewarded with either SOL, 
                          or MetaTed NFTs that provide exclusive access to features within our {""}
                          <span className='inline-flex items-baseline'>
                            <a className="text-indigo-400 underline underline-offset-2 visited:text-indigo-600" 
                                href={valURL(new URL("https://metateds.com/"))?'https://metateds.com/':''} 
                                rel="noopener noreferrer" 
                                target="_blank">
									              <span className="font-sans font-bold text-base inline-flex items-baseline">Platform</span>
								            </a>
                          </span>. 
                We combine both web2 and web3 frameworks  
                to reward and provide value to our users coupled with an enriched experience
              </p>
              <div className="mt-4 mb-3 lg:mt-6 lg:mb-5 py-4 lg:py-6 px-4 lg:px-6 sm:grid sm:grid-cols-2 place-items-center text-center items-center w-full">
                <div className="text-center sm:px-4 py-4">
                  <h1 className="font-pixel">Season 1</h1>
                  <p className="mt-2">TBA</p>
                </div>
                <div className="text-center sm:px-4 py-4 grid place-items-center">
                  <IconContext.Provider value={{ size: "6em", className: "global-class-name" }} >
                    <div>
                      <BsCashCoin />
                    </div>
                  </IconContext.Provider>
                </div>
                <div className="text-center sm:px-4 py-4">
                  <h1 className="font-pixel">Season 2</h1>
                  <p className="mt-2">TBA</p>
                </div>
                <div className="text-center sm:px-4 py-4 grid place-items-center">
                  <IconContext.Provider value={{ size: "6em", className: "global-class-name" }} >
                    <div>
                      <MdToken />
                    </div>
                  </IconContext.Provider>
                </div>
              </div>
              <div id="leaderboard" className="my-4 lg:my-5 p-2 sm:p-4 lg:p-6">
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
                      <div id="click-to-expand" className={`grid place-items-center ${activeState ? 'hidden':'grid'}`}>
                        <p className='font-sans font-bold'>Click button to expand</p>
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
              <div id="dashboard" className="mb-4 flex items-center justify-center gap-x-2 text-center">
                <IconContext.Provider value={{ size: "3em", className: "global-class-name" }} >
                  <div>
                    <FcComboChart />
                  </div>
                </IconContext.Provider>
                
                <h1 className="font-pixel font-bold inline-block text-sm sm:text-lg text-center">Dashboard</h1>
                </div>
                <p className="mt-6 text-center text-2xl font-bold font-sans">Coming Soon</p>
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
                      <h3 className="font-sans text-slate-100 font-pixel text-base lg:text-lg mb-4"><button onClick={()=>alert('functionality coming soon')} className="text-indigo-600 visited:text-blue-600 cursor-pointer hover:underline hover:underline-offset-4">Sign in</button> to use this feature</h3>
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
                      <h3 className="font-sans text-slate-100 font-pixel text-base lg:text-lg mb-4"><button onClick={()=>alert('functionality coming soon')}className="text-indigo-600 visited:text-blue-600 cursor-pointer hover:underline hover:underline-offset-4">Sign in</button> to use this feature</h3>
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
                      <h3 className="font-sans text-slate-100 font-pixel text-base lg:text-lg mb-4"><button onClick={()=>alert('functionality coming soon')} className="text-indigo-600 visited:text-blue-600 cursor-pointer hover:underline hover:underline-offset-4">Sign in</button> to use this feature</h3>
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

