import Head from "next/head";
import React, {Component, useRef} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import {useRouter} from 'next/router'
import { CircularProgress } from "@material-ui/core";
//import { CustomPlaceholder } from 'react-placeholder-image';
import MetaPixNavBar from "../../components/MetaPixNavBar";
import { Circles } from "react-loader-spinner";
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
export default function Service () {
  const router = useRouter();
  const routeBack = (e) => {
    e.preventDefault();
    router.back();
  };
  const METATEDS_HOME = '/'
  {/*<Link href="/" passHref legacyBehavior>
    <ArrowBackIcon />
  </Link>*/}
  const myRef = useRef()
  return (
    <>
      <Head>
        <title>🧸 Service | MetaTeds</title>
      </Head>
      <div className="bg-slate-900 min-h-screen">
        <MetaPixNavBar bgFormat={"bg-[#320D12]"} opacity={"opacity-100"}/>
        <div className="min-h-full w-screen overflow-y-auto items-center m-3 lg:m-4 max-w-screen-2xl border-shadow mx-auto">
          <nav className="top-10 mt-10 lg:pt-3 left-0 w-full z-30">
            <div className="flex items-center justify-between px-2 py-2 sm:py-3 sm:px-6 pointer-events-auto w-full mx-auto">
              <div className="flex flex-row justify-between items-center font-sans h-[50px] rounded-full bg-indigo-700 w-[60%] cursor-pointer max-w-xl min-w-fit">
                <p className="px-3 inline-block">📣</p>
                <div className="mr-2 sm:mr-4 py-3 px-2 sm:px-5 text-left">
                  <p className="text-xs sm:text-base font-bold">Tune into the latest pixelate announcement news live on here</p>
                </div>
              </div>
            </div>
          </nav>
          <div className="grid place-items-center text-center mb-4 mt-8 w-full px-4 lg:px-8">
            <div className="flex-col my-4 px-2 mx-auto text-center">
              <div className="w-[300px] border h-[300px] my-2 w-full border-slate-100 rounded-md">

              </div>
              <span className="px-2 flex items-center justify-center">
                <p className="inline-block font-pixel text-xs">Pixelation:</p>
                <input
                  onInput=""
                  type="range"
                  min="0"
                  max="15"
                  defaultValue="0"
                  step="1"
                  className="inline-block"
                  id="pixelationRange"
                  ref={myRef}
                />
              </span>
            </div>
            <div className="mt-3 px-1 lg:px-2 mb-3 py-1 lg:py-2 font-sans items-center">
              <input className="text-center" onChange="" ref={myRef} id="upload" type="file" accept="image/*" />
            </div>
            <div className="mt-3 p-2 lg:p-4 flex items-center text-center justify-center gap-x-4 w-full">
              <button className="px-2 lg:px-4 py-2 lg:py-3 bg-indigo-700 rounded-md hover:bg-slate-900 hover:ring-indigo-700 hover:ring-4">
                <p className="sm:text-base text-xs font-pixel">Download</p>
              </button>
              <button className="px-2 lg:px-4 py-2 lg:py-3 bg-indigo-700 rounded-md hover:bg-slate-900 hover:ring-indigo-700 hover:ring-4">
                <p className="sm:text-base text-xs font-pixel">Build PFP</p>
              </button>
            </div>
          </div>
          
        </div>
      </div>
      
    </>
  );
}