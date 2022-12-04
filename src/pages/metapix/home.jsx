import Head from "next/head";
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import {useRouter} from 'next/router';
import metapix_logo from '../../assets/metapix_banner.png'
import head_pixel from '../../assets/metapix_head_pixel.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const artShowApp = {
  backgroundImage: 'url(/img/workstation.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100%',
  backgroundPosition: 'center center',
  backgroundAttachment: 'fixed'
}
const HomeURL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:3000";


const customLoader = ({src, width, quality}) => {
  return process.env.NODE_ENV === "production" ?
  `${process.env.BASE_URL}/${src}?${width}&q=${quality || 75}`:
`http://localhost:3000/${src}?${width}&q=${quality || 75}`;
}


export default function Home () {
  const router = useRouter();

  const Back = (event) => {
    event.preventDefault();
    router.back();
  };
  return (
    <>
      <Head>
        <title>✨ Metapix | MetaTeds</title>
      </Head>
      <div>
      <section className="min-h-full min-h-screen w-full relative" style={artShowApp}>
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <nav className="fixed top-0 left-0 w-full z-20 bg-[#320D06]">
            <div className="mx-auto px-2 py-2 flex text-center items-center gap-x-1 sm:gap-x-2 justify-between pointer-events-auto flex-row">
              <a href="#" onClick={Back} className="rounded-lg hover:bg-slate-900 rounded-lg cursor-pointer px-2 py-2">
                <span><ArrowBackIcon /></span>
                <span className="ml-2 inline-block text-base leading-7">Back</span>
              </a>
              <p className="inline-box font-sans text-center text-xs sm:text-sm md:text-lg">MetaPix for gamers and community members!</p>
              <a href={HomeURL} className="rounded-lg hover:bg-slate-900 rounded-lg cursor-pointer px-1 py-1 sm:px-2 sm:py-2">
                <span className="mr-2 inline-block text-base leading-6">Home</span>
                <ArrowForwardIcon />
              </a>
            </div>
          </nav>
          <div className="sm:h-screen text-align items-center justify-center flex flex-col m-4 p-5 sm:p-8 md:p-10 sm:grid sm:place-items-center sm:grid-cols-10">
            <div className="mt-20 mb-5 sm:mb-10 col-span-5 col-start-1 mx-auto">
              <span className="box-border block overflow-hidden bg-none opacity-100 border-0 m-0 p-0 relative">
                <Image
                  loader={customLoader}
                  quality='90'
                  src={metapix_logo}
                  alt="metapix"
                  height="250"
                  width= "500"
                  placeholder='blur'
                  style = {{objectFit: 'contain', objectPosition: 'center', borderRadius: '15px'}}
                />
              </span>
            </div>
            <div className="mt-5 sm:mb-10 col-span-6 col-start-6">
              <div className="px-4 py-2 sm:py-4 sm:px-8 mx-auto flex rounded-md h-full sm:h-full w-full drop-shadow-xl border-indigo-700 bg-[#5C5C5C]">
                <div className="flex flex-col px-2 py-4 items-center justify-center cursor-pointer">
                <span className="box-border block overflow-hidden bg-none opacity-100 border-0 m-0 p-0 relative">
                  <Image
                    loader={customLoader}
                    quality='78'
                    src={head_pixel}
                    alt="head_banner"
                    height="150"
                    width= "160"
                    placeholder='blur'
                    style = {{objectFit: 'contain', objectPosition: 'center', borderRadius: '18px'}}
                  />
                </span>
                  <div className="mt-4 pointer-cursor">
                    <Link href='/metapix/dao' rel ="noopener noreferrer">
                      <button type="button" className="flex text-base sm:text-lgpt-4 bg-indigo-700 hover:bg-amber-500 hover:ring-indigo-700 hover:ring-2 w-full px-2 py-2 rounded-lg">
                          Metapix - DAO
                      </button>
                    </Link>
                  </div>
                  <div className="mt-4 pointer-cursor">
                    <Link href='/metapix/service' rel ="noopener noreferrer">
                      <button type="button" className="flex text-base sm:text-lgpt-4 bg-indigo-700 hover:bg-amber-500 hover:ring-indigo-700 hover:ring-2 w-full px-2 py-2 rounded-lg">
                          Metapix - Free
                      </button>
                    </Link>
                  </div>
                  <div className="mt-4 pointer-cursor">
                    <button type="button" className="flex text-base sm:text-lgpt-4 bg-indigo-700 hover:bg-amber-500 hover:ring-indigo-700 hover:ring-2 w-full px-2 py-2 rounded-lg" onClick={()=>alert('Python script - pixelate avatars, nfts and much more (Coming Soon...)')}>
                        Download Script
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>


    </>

  )
  
}