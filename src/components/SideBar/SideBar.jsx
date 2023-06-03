import { CircleStackIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import classNames from "classnames";
export const SideBar = ({pathname, collection1, collection2}) => {
  //states
  const [showHoverText, setShowHoverText ] = useState(false);

  const handleMouseEnter = () => {
    setShowHoverText(true);
  }

  const handleMouseLeave = () => {
    setShowHoverText(false); 
  }
  const Live = () => {
    return (
      <>
        <button 
            id="ExploreMint"
            type="button"  
            className="inline-flex items-center gap-x-2 p-1 font-sans font-semibold"
            >
          <span className="flex w-2 h-2">
            <span className="animate-ping relative w-full h-full rounded-md bg-green-500/80"> 
            </span>
            <span className="absolute inline-flex rounded-full w-2 h-2 bg-green-500"></span>
          </span>
          <p className="text-[10px] lg:text-xs items-baseline sm:items-center">Live</p>   
        </button>
      </>
    )
  }
  const NotLive = () => {
    return (
      <>
        <button 
            id="ExploreMint"
            type="button"  
            className="inline-flex items-center gap-x-2 p-1 font-sans font-semibold"
            >
          <span className="flex w-2 h-2">
            <span className="animate-ping relative w-full h-full rounded-md bg-red-700/80"> 
            </span>
            <span className="absolute inline-flex rounded-full w-2 h-2 bg-red-700"></span>
          </span>
          {/*<p className="text-[10px] lg:text-xs">Offline</p>*/}
        </button>
      </>
    )
  }
  const Pending = () => {
    return (
      <>
        <button 
            id="ExploreMint"
            type="button"  
            className="inline-flex items-center gap-x-2 p-1 font-sans font-semibold"
            >
          <span className="flex w-2 h-2">
            <span className="animate-ping relative w-full h-full rounded-md bg-[#EAA640]/80"> 
            </span>
            <span className="absolute inline-flex rounded-full w-2 h-2 bg-[#EAA640]"></span>
          </span>
          {/*<p className="text-[10px] lg:text-[11px] items-baseline sm:items-center">Pending</p>*/}   
        </button>
        
      </>
    )
    
  }
  const sideBarElements = [
    {
      id: 0,
      name: `${collection1}`,
      status: <Pending />,
      statusDesc: 'Some features are available',
      icon: <GlobeAltIcon className="h-5 w-5 mr-2 sm:mr-3 flex-shrink-0"/>,
      type: 'button',
      href: `/gallery/${collection1.toLowerCase()}`
    },
    {
      id: 1,
      name: `${collection2}`,
      status: <NotLive />,
      statusDesc: 'Features not avaialble',
      icon: <CircleStackIcon className="h-5 w-5 mr-2 sm:mr-3 flex-shrink-0" />,
      type: 'button',
      href: `/gallery/${collection2.toLowerCase()}`
    },
  ]
  const [sideBar, setSideBar] = useState(sideBarElements);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {setMounted(true)},[])
  useEffect(()=> {

  },[])
  if(!mounted) return null
  return(
    <>
      <div id="sidebar" className="p-2 lg:p-4 mt-8 mb-4 sm:mt-0 sm:mb-0 sm:col-span-2 lg:col-span-3">
        <div className="sm:flex-col flex flex-row gap-5 items-center justify-center sm:block drop-shadow-xl">
          {sideBar.map((item, index) => (
            <div key={index} className="mx-2 sm:mb-8 gap-y-6 space-y-4 items-center pointer-events-auto">
              <div className={`items-center relative`}>
                <Link href={item.href} passHref legacyBehavior>
                  <button 
                    onMouseEnter = {pathname === item.href ?(handleMouseEnter):(null)}
                    onMouseLeave = {pathname === item.href ?(handleMouseLeave):(null)}
                    className="w-full relative cursor-pointer z-10">
                    <a href="#" 
                      className={classNames (
                        {
                          'text-slate-50 bg-[#4e44ce]': 
                          pathname === item.href,
                          'hover:bg-slate-500 text-slate-200': 
                          pathname !== item.href
                        },
                        'items-center p-2 text-base lg:text-lg flex font-sans font-semibold rounded-lg'
                      )}>
                        {item.icon}
                        <div className="truncate text-xs sm:text-sm lg:text-lg inline-flex justify-center items-center">
                          {item.name}
                          <div className="mx-1 flex items-center text-center">
                            {item.status}
                          </div>
                        </div>
                    </a>
                  </button>
                  
                </Link>
                {(pathname === item.href ? (showHoverText && 
                  (
                    <div className={`absolute top-[-53px] left-0 mb-2 ${item.id ===1 ? 'sm:top-[48px]':'sm:top-[-46px]'} sm:left-10 lg:left-20 z-20`}><div className={`font-inter p-1 bg-slate-900/80 border border-indigo-700 text-white rounded text-[10px] lg:text-sm`}>{(item.statusDesc)}</div></div>
                  )
                ):(null))} 
              </div> 
            </div>
          ))}
        </div>
      </div>
    </>
  )
}