import Head from 'next/head';
import React, {useRef} from 'react';
import { useRouter } from 'next/router';
import { IconContext } from "react-icons";
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid';
import NavBar from '../../components/NavBar'
import NFTPolicy from "../../components/Layouts/NFTPolicy"
export default function Terms (){
  const router = useRouter();
  const routeBack = (e) => {
    e.preventDefault();
    router.back();
  };
  
  return (
    <>
      <Head>
        <title>Terms | MetaTeds</title>
      </Head>
      <div className="bg-slate-900 h-screen">
        <div className="mx-auto min-h-full overflow-y-auto p-4 px-8 items-center lg:max-w-screen-xl">
        <NavBar bgFormat={"bg-slate-900/80"}/>
          <nav className="mt-20 flex items-center justify-between top-0 pointer-event-auto z-nav w-full">
            <div className="mt-4 w-full">
              <div className="flex items-center cursor-pointer pointer-events-auto inline-flex flex-row px-4">
                <div className="p-2 hover:bg-indigo-700 rounded-lg cursor-pointer">
                  <a href="#" onClick={routeBack} className="inline-flex items-center gap-x-2 flex">
                    <ArrowSmallLeftIcon className="text-white h-5 w-5 items-center" />
                    <p className="inline-block items-center">Back</p>
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <div className="px-6 p-2 mx-auto overflow-hidden items-center text-center text-slate-50 transform transition-all my-2 sm:p-5 opacity-100 translate-y-0 sm:scale-100">
            <NFTPolicy />
          </div>
        </div>
      </div>
    </>
    
  )
}
