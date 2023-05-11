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
            <div className="mt-10 w-full h-full p-4">
              <h1 className="mt-5 text-3xl text-center sm:text-4xl lg:text-5xl h-full font-bold text-transparent bg-gradient-to-r bg-clip-text from-indigo-500 from-40% via-purple-500 via-20% to-pink-500 to-30%">
                Gallery Playground: An Exploration of Art In The Digital Realm
              </h1>
              <div id="apps-intro" className="mt-10 flex  flex-col items-center justify-center mx-auto w-full">
                <div className="">
                  <p>
                    <span></span>
                  </p>
                </div>
                <div className='flex flex-col items-center gap-4 justify-center mx-auto'>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}