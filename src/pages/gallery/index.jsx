import React, {useState, useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import Head from "next/head";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Image from 'next/image';
import {buildUrl} from 'cloudinary-build-url';
import ComingSoon from '../../components/ComingSoon'
import NavBar from '../../components/NavBar'
import { MdOutlineDashboard } from "react-icons/md";
import { IconContext } from "react-icons";
import metahead from "../../assets/ted512.png";
import {TwitterShareButton, TwitterIcon} from "react-share";
import {server} from '../../config';
import {SiTwitter} from "@react-icons/all-files/si/SiTwitter";
import Gallery3D from "../../assets/gallery.gif";
import CollectionChart from "../../components/NFT/CollectionChart";
import { FireIcon, BoltIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
//import * as LottiePlayer from "@lottiefiles/lottie-player";
//import { create } from '@lottiefiles/lottie-interactivity';
const galleryCards = [
  {
    id: '0',
    imgSrc: '',
    social: '',
    title: '',
  },
  {
    id: '1',
    imgSrc: '',
    social: '',
    title: '',
  }
]
export default function Home() {
  const { pathname } = useRouter();
  const lottieRef = useRef();
  //states
  const [cardElements, setCardElements] = useState(galleryCards);
  const ref = useRef(null);

  {/*useEffect(()=>{
    // window is accessible here.
    if (typeof window !== 'undefined') {
      console.log("window.innerHeight", window.innerHeight);
      const loadLottie = (e) => {
        if (lottieRef.current && lottieRef.current.contains(e.target)){
          // 4. configure the interactivity library
          create({
            mode: 'scroll',
            player: '#firstLottie',
            actions: [
              {
                visibility: [0, 1],
                type: 'seek',
                frames: [0, 100],
              },
            ],
          });
        }
      }
      
      document.body.addEventListener('load', loadLottie)
      // CLEANUP
      // remove event listener
      return () => {
        document.body.removeEventListener("load", loadLottie)
      }
    }
  },[]);*/}
  /*componentDidMount() {
    // 3. listen for player load. see lottie player repo for other events
    lottieRef.current.addEventListener('load', function (e) {
      // 4. configure the interactivity library
      create({
        mode: 'scroll',
        player: '#firstLottie',
        actions: [
          {
            visibility: [0, 1],
            type: 'seek',
            frames: [0, 100],
          },
        ],
      });
    });
  }*/
  /*useEffect(() => {
    const scrollEffect = () => {
      const element = ref.current
      const elementPosition = element.getBoundingClientRect
      const windowHeight = window.innerHeight;
      if (elementPosition < windowHeight){
        element.classList.add('animate');
      }
    };
    //Attach scroll event listener
    window.addEventListener('scroll', scrollEffect)

    //Cleanup
    return () => {
      window.removeEventListener('scroll', scrollEffect)
    };
  }, []);*/
  
  return (
    <>
      <Head>
        <title>
          🍩 Digital Playground | MetaTeds
        </title>
      </Head>
      <div  className="min-h-full overflow-y-auto bg-gradient-to-b from-slate-900/80 to-[var(--tw-purple-ted-2)]">
        <NavBar bgFormat='bg-slate-900/70'/>
        <div className="max-w-screen-2xl mx-auto items-center w-screen">
          <div className="min-h-full m-4 sm:m-8 py-10 my-10 flex justify-center items-center mx-auto">
            <div className="mt-8 w-full p-4">
              <div className="flex justify-center my-5 sm:mx-6 lg:mx-10 ">
                <h1 className="p-2 max-w-2xl tracking-normal flex justify-center items-center font-inter text-3xl text-center sm:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r bg-clip-text from-indigo-500 from-40% via-purple-500 via-20% to-pink-500 to-30%">
                  Meta Playground: An Exploration of Art In The Digital Realm
                </h1>
              </div>
              {/*https://lottie.host/a31dd9fd-970b-4182-aa7f-18f8d2998880/We7MrzGE36.json
                https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json
              */}
              <div id="apps" className=" mt-10 flex flex-col items-center justify-center mx-auto w-full">
                <div className="text-slate-300 sm:flex sm:flex-row sm:justify-center gap-6 font-inter font-bold text-sm lg:text-base mb-4">
                  <div className="sm:mx-4 lg:mx-8 flex items-center justify-center drop-shadow-xl">
                    {/*<lottie-player
                      ref={lottieRef} // 2. set the reference for the player
                      id="firstLottie"
                      autoplay
                      controls
                      loop
                      mode="normal"
                      src="https://lottie.host/a31dd9fd-970b-4182-aa7f-18f8d2998880/We7MrzGE36.json"
                      style={{ width: '350px' }}
                    ></lottie-player>*/}
                    {
                      <Image 
                        alt='gallery' 
                        src={Gallery3D} 
                        loading='lazy' 
                        style={{width: '350px', 
                                objectPosition: 'center', 
                                filter: 'dropShadow(0 10px 8px rgb(0 0 0 / 0.04)) dropShadow(0 4px 3px rgb(0 0 0 / 0.1))',
                                borderRadius: '10px'
                              }}
                      />
                    }
                    {/*<IconContext.Provider value={{ color: "white", size: "23em", className: "global-class-name" }} >
                      <div>
                        <MdOutlineDashboard />
                      </div>
                  </IconContext.Provider>*/}
                  </div>
                  <div className="m-4 sm:ml-4 lg:ml-8 flex justify-center items-center">
                    <p className="max-w-md p-4 lg:p-8 sm:text-left text-center text-lg sm:text-base block font-heebo">
                      Utilizing artwork to explore the intersections of technology, 
                      culture, and creativity. 
                    </p>
                  </div>
                </div>
                <div className="w-full mt-8 mx-auto items-center flex justify-center ">
                <div id="popular" className="mb-5">
                      <span className="inline-flex items-center">
                        <span className="p-1 bg-indigo-700 rounded-lg"><BoltIcon className="flex h-5 w-5"/></span>
                        <h1 className="mx-3 font-inter font-bold text-xl sm:text-2xl lg:text-3xl text-transparent bg-gradient-to-r bg-clip-text from-indigo-500 from-40% via-purple-500 via-20% to-pink-500 to-30%">Featured</h1>
                      </span>
                    </div>
                </div>
                <div id="cards" className='sm:mt-5 mt-2 grid place-items-center sm:flex sm:flex-row sm:justify-center sm:p-10 p-4 items-center mb-4 w-full gap-8'>
                  <div id="card1" className="gradient-box flex flex-col items-center mx-4 p-1 max-width-[200px] px-[5%] py-2">
                    <div className="mb-4">
                      <Image src={metahead} 
                            alt="metahead"
                            height={180}
                            width={180} 
                            style={{borderRadius:"10px", 
                                    objectFit:'cover', 
                                    objectPosition:'center',
                                    }} 
                      />
                    </div>
                    <div id="socials" className="mb-3 flex flex-row">
                      <TwitterShareButton
                          url={`${server}/gallery/metahead`}
                          title={"Check out MetaHead gallery: "}
                          hashtag="#metateds"
                          className={`items-center hover:animate-beat`}
                        >
                          <SiTwitter />
                      </TwitterShareButton>
                    </div>
                    <div id="btn-container" className="mb-3 pointer-events-auto">
                      <Link href={`${pathname}/metahead`} passHref legacyBehavior>
                        <a rel="noopener noreferrer">
                          <button type="button" className="font-heebo rounded-lg text-sm lg:text-base px-4 py-2 m-auto bg-purple-700 hover:bg-gradient-to-r from-indigo-500 from-10% via-purple-600 via-30% to-indigo-700 to-90%">
                              MetaHead Gallery
                          </button>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div id="card2" className="gradient-box flex flex-col items-center mx-4 p-1 max-width-[200px] px-[5%] py-2">
                    <div className="mb-4 items-center">
                      <img src={"./tednorm.png"} height="180px" width="180px" alt="metated" className="rounded-[10px] object-cover object-center" />
                    </div>
                    <div id="socials" className="mb-3 flex flex-row">
                      <TwitterShareButton
                        url={`${server}/gallery/metated`}
                        title={"Check out Metated gallery: "}
                        hashtag="#metateds"
                        className={`items-center hover:animate-beat`}
                      >
                        <SiTwitter />
                      </TwitterShareButton>
                    </div>
                    <div id="btn-container" className="mb-3 pointer-events-auto">
                      <Link href={`${pathname}/metated`} passHref legacyBehavior>
                        <a rel="noopener noreferrer">
                          <button type="button" className="font-heebo rounded-lg text-sm lg:text-base px-4 py-2 m-auto bg-purple-700 hover:bg-gradient-to-r from-indigo-500 from-10% via-purple-600 via-30% to-indigo-700 to-90%">
                              MetaTed Gallery
                          </button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <section name="on-chain-collection" className="my-5 mx-2 items-center w-full">
                  <div className="p-2 sm:p-4 mb-8">
                    <div id="popular" className="mb-5">
                      <span className="inline-flex items-center">
                        <span className="p-1 bg-rose-700 rounded-lg"><FireIcon className="flex h-5 w-5 sm:h-6 sm:w-6"/></span>
                        <h1 className="mx-3 font-inter font-bold text-xl sm:text-2xl lg:text-3xl text-transparent bg-gradient-to-r bg-clip-text from-indigo-500 from-40% via-purple-500 via-20% to-pink-500 to-30%">Popular Collections</h1>
                      </span>
                    </div>
                    <CollectionChart type={'popular'}/>
                  </div>
                  <div className="p-2 sm:p-4 mb-8">
                    <div id="new" className="mb-5 items-center">
                      <span className="inline-flex items-center">
                        <span className="p-1 bg-blue-700 rounded-lg"><CheckBadgeIcon className="flex h-5 w-5 sm:h-6 sm:w-6"/></span>
                        <h1 className="mx-3 font-inter font-bold text-xl sm:text-2xl lg:text-3xl text-transparent bg-gradient-to-r bg-clip-text from-indigo-500 from-40% via-purple-500 via-20% to-pink-500 to-30%">New Collections</h1>
                      </span>
                    </div>
                    <CollectionChart type={'new'}/>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}