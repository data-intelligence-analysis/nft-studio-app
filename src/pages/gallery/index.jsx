import Head from "next/head";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Image from 'next/image';
import {buildUrl} from 'cloudinary-build-url';
import ComingSoon from '../../components/ComingSoon'
import NavBar from '../../components/NavBar'
export default function Home() {
  return (
    <>
      <Head>
        NFTs Gallery | MetaTeds
      </Head>
      <div className="min-h-screen overflow-auto bg-gradient-to-b from-slate-900/80 to-[var(--tw-purple-ted-2)]">
        <NavBar bgFormat='bg-transparent'/>
        <div className="max-w-screen-2xl w-screen mx-auto flex w-full p-8 my-10">
          <div className="min-h-full py-10 mb-10 flex items-center mx-auto">
            <div className="mt-8 w-full p-4">
              <h1 className="p-2 my-5 tracking-normal font-inter text-3xl text-center sm:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r bg-clip-text from-indigo-500 from-40% via-purple-500 via-20% to-pink-500 to-30%">
                Meta Playground: An Exploration of Art In The Digital Realm
              </h1>
              <div id="apps" className="mt-10 flex flex-col items-center justify-center mx-auto w-full">
                <div className="grid text-slate-300 place-items-center sm:flex sm:flex-row gap-6 font-inter font-bold text-sm lg:text-base mb-4">
                  <div className="mx-3 drop-shadow-lg">
                    dashboard
                  </div>
                  <div className="ml-8 flex items-center sm:text-right">
                    <p className="text-center text-sm sm:text-base block">
                      Discover our stunning, and innovative ways in which we use
                      artwork to explore the intersections of technology, 
                      culture, and creativity. 
                      <span></span>
                    </p>
                  </div>
                  
                  
                </div>
                <div id="cards" className='flex flex-row justify-center items-center mb-4 w-full gap-4 mx-auto'>
                  <div className="flex flex-col items-center">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}