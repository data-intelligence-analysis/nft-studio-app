import { CircleStackIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import classNames from "classnames";
export const SideBar = ({pathname, collection1, collection2}) => {
  const sideBarElements = [
    {
      id: 0,
      name: `${collection1} [BETA]`,
      icon: <GlobeAltIcon className="h-5 w-5 mr-2 sm:mr-3 flex-shrink-0"/>,
      type: 'button',
      href: `/gallery/${collection1.toLowerCase()}`
    },
    {
      id: 1,
      name: `${collection2} [MAIN]`,
      icon: <CircleStackIcon className="h-5 w-5 mr-2 sm:mr-3 flex-shrink-0" />,
      type: 'button',
      href: `/gallery/${collection2.toLowerCase()}`
    },
  ]
  const [sideBar, setSideBar] = useState(sideBarElements);
  return(
    <>
      <div id="sidebar" className="p-2 lg:p-4 sm:col-span-2 lg:col-span-3">
        <div className="sm:flex-col flex flex-row items-center justify-center sm:block drop-shadow-xl">
          {sideBar.map((item, index) => (
            <div key={index} className="mx-2 sm:mb-4 items-center">
                <div className={`items-center`}>
                  <Link href={item.href} passHref legacyBehavior>
                    <a href="#" 
                      className={classNames (
                        {
                          'text-slate-50 bg-slate-600': 
                          pathname === item.href,
                          'hover:bg-slate-500 text-slate-200': 
                          pathname !== item.href
                        },
                        'items-center p-2 text-base lg:text-lg flex font-sans font-semibold cursor-pointer rounded-lg'
                      )}>
                      {item.icon}
                      <span className="truncate sm:text-sm lg:text-lg">{item.name}</span>
                    </a>
                  </Link>
                </div> 
            </div>
          ))}
        </div>
      </div>
    </>
  )
}