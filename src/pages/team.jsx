import React, { useState, useEffect } from 'react';
import Head from "next/head";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { Exhibit } from '@readyplayerme/visage';
import { SiTwitter } from "@react-icons/all-files/si/SiTwitter";
import { SiLinkedin } from "@react-icons/all-files/si/SiLinkedin";
import Nico from "../assets/pfp/nico.png";
import Den from "../assets/pfp/dennis.png";
import { IconContext } from "react-icons";
export default function Team() {
  //states
  const [avatarURL, setAvatarUrl] = useState('')
  const [avatarURL2, setAvatarUrl2] = useState('')

  //tapping the API endpoint 
  /*useEffect(() => {
    fetch('https://models.readyplayer.me/64417f4c2f3f9b83bb95b9b7.glb')
      .then(response => response.json())
      .then(data => setAvatarUrl(data.avatar))
      .catch(error => console.error(error));
  }, []);
  useEffect(() => {
    fetch('https://models.readyplayer.me/64417f4c2f3f9b83bb95b9b7.glb')
      .then(response => response.json())
      .then(data => setAvatarUrl2(data.avatar))
      .catch(error => console.error(error));
  }, []);*/

  //Security measure to validate external site urls
  function valURL(url) {
    const parsed = url
    return ['https:', 'http:'].includes(parsed.protocol)
  }
  return (
    <>
      <Head>
        <title>🦍 Team | MetaTeds</title>
      </Head>
      <NavBar bgFormat={"bg-slate-900/80"} />
        <div className="bg-slate-900 overflow-x-auto w-screen h-screen text-center items-center">
          <div className="w-full py-20 px-5 flex items-center">
            <div className="grid sm:grid-cols-10 my-4 mx-auto max-w-screen-2xl">
              <div className="text-center sm:text-left sm:col-start-1 sm:col-span-5">
                <div className="overflow-auto mt-5">
                  <h1 className="text-2xl text-amber-500 sm:text-3xl tracking-wider font-bold">Mission</h1>
                  <div className="font-sans">
                    <p className="pt-5 inline-block">We are creators, innovators, and community builders with the objective of developing a platform that intellectually empowers
                    communities to be involved and become citizens of the Web3 space.</p>
                    <p className="pt-5 inline-block ">To accomplish this we are driven to build the next-gen applications
                    with a deep understanding of the decentralized ecosystem to deliver value to stakeholders and foster engagement.
                    Our focus is on building experiences in each of the following: <b>Web3 Blog</b>, <b>Marketplace</b>, <b>Metaverse & Gaming</b>, and <b>DAO (Decentralized Autonomous Organization)</b></p>
                  </div>
                  
                </div>
                <div className="mt-10 overflow-auto">
                  <h1 className="text-2xl text-amber-500 sm:text-3xl tracking-wider font-bold">Utility</h1>
                  <div className="font-sans">
                    <p className="pt-3">If you are new to Solana space, please head over to this <a href ="https://youtu.be/mJiXmsiLS3w" target="_blank" rel="noreferrer noopener" className="font-['Ranchers'] font-bold tracking-wide">link</a> to learn how to 
                    create and connect your Solana wallet, 
                    or head on over to our <a href ="http://discord.gg/N5wB8JTBBS" target="_blank" rel="noreferrer noopener" className="font-['Ranchers'] font-bold tracking-wide">Discord</a> to request for assistance, 
                    meet members of the community, 
                    and learn more about our platform. </p>
                    <p className="pt-3">Our utility is centered around our NFTs and tokens that offer holder (membership) benefits. 
                    Currently, those benefits would be accessible through our <a href ="https://metateds.com" className="font-['Ranchers'] font-bold tracking-wide" target="_blank" rel="noreferrer noopener" >blog platform</a>, which include but not limited to the ability for each holder to build a
                    personalized page to feature their blogs, publish content and make posts, view other blogs, and follow and interact with other members.</p>
                    <p className="pt-3">
                      You can access our blog through our ecosystem as well by connecting to our <Link href="/utility" className="font-['Ranchers'] font-bold tracking-wide">Utility</Link> page. with your Solana wallet.
                    </p>
                    <p className="pt-3">
                      Eventually, we would mutate those NFTS into gamefied utility tokens  
                      utilized in our <a href="https://metateds.com/gaming" target="_blank" rel="noreferrer noopener" className="font-['Ranchers'] font-bold tracking-wide">Gaming</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 items-center sm:mx-4 sm:col-start-6 sm:col-span-6">
                <h1 className="md:ml-4 text-center sm:text-left text-amber-500 text-2xl sm:text-3xl tracking-wider font-bold">Builders</h1>
                <div className="mx-auto flex justify-center text-center items-center p-2 lg:p-4">
                  <div className="font-sans text-center justify-center items-center sm:w-full sm:flex-col flex mx-auto gap-4">
                    <div className="min-w-[200px] w-[25%] sm:max-w-sm border-2 sm:w-full border-indigo-600 w-full rounded-md text-zinc-300 p-2 sm:p-4 sm:mb-4">
                      <div className="flex flex-col flex-1 w-full">
                        <div className="max-w-fit box-border flex items-center justify-center overflow-hidden bg-none border-0 opacity-100 m-0 p-0 relative">
                          {<Image 
                            src={Den}
                            alt="mr-d"
                            priority="true"
                            height="auto"
                            style={{borderRadius: "6px"}}
                          />}
                        </div>
                        <p className="uppercase text-xs sm:text-base lg:text-xl font-bold block mt-2">Dennis Osafo</p>
                        <p className="text-xs sm:text-sm lg:text-base font-bold">Founder - Software Engineer & Artist</p>
                      </div>
                      <div className="py-2 px-2 flex flex-row items-center text-center gap-x-4 justify-center">
                        <a href={valURL(new URL("https://twitter.com/archiDevOps"))? 'https://twitter.com/archiDevOps' : ''} target="_blank" rel="noopener noreferrer">
                          <IconContext.Provider value={{ color: "white", size: "2em", className: "global-class-name" }}>
                            <div>
                              <SiTwitter />
                            </div>
                          </IconContext.Provider>
                        </a>
                        <a href={valURL(new URL("https://www.linkedin.com/in/gribzdevo"))? 'https://www.linkedin.com/in/gribzdevo' : ''} target="_blank" rel="noopener noreferrer">
                          <IconContext.Provider value={{ color: "white", size: "2em", className: "global-class-name" }}>
                            <div>
                              <SiLinkedin />
                            </div>
                          </IconContext.Provider>
                        </a>
                      </div>
                    </div>
                    <div className="min-w-[200px] w-[50%] sm:max-w-sm sm:w-full border-2 border-indigo-600 rounded-md text-zinc-300 p-4">
                      <div className="flex flex-col flex-1 w-full">
                        <div className="min-w-[30%] box-border block flex justify-center items-center overflow-hidden bg-none opacity-100 border-0 m-0 p-0 relative">
                          {<Image 
                            src={Nico}
                            alt="nico"
                            priority="true"
                            height="auto"
                            style={{borderRadius: "6px"}}
                        />}
                        </div>
                        <p className="uppercase text-xs sm:text-base lg:text-xl font-bold block mt-2">Nicholas Stranquist</p>
                        <p className="text-xs sm:text-sm lg:text-base font-bold">Founder - Software & Blockchain Developer</p>
                      </div>
                      <div className="py-2 px-2 flex flex-row items-center text-center gap-x-4 justify-center">
                        <a href={valURL(new URL("https://twitter.com/nico_builds"))? 'https://twitter.com/nico_builds' : ''} target="_blank" rel="noopener noreferrer">
                          <IconContext.Provider value={{ color: "white", size: "2em", className: "global-class-name" }}>
                            <div>
                              <SiTwitter />
                            </div>
                          </IconContext.Provider>
                        </a>
                        <a href={valURL(new URL("https://www.linkedin.com/in/nstranquist"))? 'https://www.linkedin.com/in/nstranquist' : ''} target="_blank" rel="noopener noreferrer">
                          <IconContext.Provider value={{ color: "white", size: "2em", className: "global-class-name" }}>
                            <div>
                              <SiLinkedin />
                            </div>
                          </IconContext.Provider>
                        </a>
                      </div>
                    </div>
                    {/*<div className="bg-indigo-600 border-2 border-indigo-400/100 text-zinc-300 my-4 sm:my-0 sm:hidden rounded-md">
                      <div className="flex flex-col">
                        <span className="box-border block overflow-hidden bg-none opacity-100 border-0 m-0 p-0 relative">
                          <Image 
                            src={require('../assets/pfp/conor.png')}
                            alt="mr-d"
                            height="auto"
                            width= "450"
                            priority="true"
                          />
                        </span>
                        <p className="uppercase text-xs sm:text-base lg:text-xl font-bold block">Conor Kolmer</p>
                        <p className="text-xs sm:text-sm lg:text-base font-bold">Co-Founder - Technical Architect & Business Analyst</p>
                      </div>
                      <div className="py-2 px-2 flex flex-row items-center text-center gap-x-1 sm:gap-x-2 justify-center">
                        <span className="text-sm sm:text-base">Twitter</span>
                        <span className="text-sm sm:text-base">LinkedIn</span>
                      </div>
                    </div>*/}
                  </div>
                  {/*<div className="hidden sm:font-sans sm:row-span-1 sm:mt-6 sm:flex sm:items-center sm:justify-center sm:gap-x-4">
                    <div className="bg-indigo-600 border-2 border-indigo-400/100 text-zinc-300 rounded-md">
                      <div className="flex flex-col">
                        <span className="box-border block overflow-hidden bg-none opacity-100 border-0 m-0 p-0 relative">
                          <Image 
                            src={require('../assets/pfp/conor.png')}
                            alt="mr-d"
                            height="auto"
                            width= "400"
                            priority="true"
                          />
                        </span>
                        <p className="uppercase text-xs sm:text-base lg:text-xl font-bold block">Conor</p>
                        <p className="text-xs sm:text-sm lg:text-base font-bold">Co-Founder - Technical Architect & Business Analyst</p>
                      </div>
                      <div className="py-2 px-2 flex flex-row items-center text-center gap-x-1 sm:gap-x-2 justify-center">
                        <span className="text-sm sm:text-base">Twitter</span>
                        <span className="text-sm sm:text-base">LinkedIn</span>
                      </div>
                    </div>
                </div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer bgFormat={"bg-slate-900/80"}/>
    </>
  );
}