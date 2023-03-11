import Head from "next/head";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
export default function Legion() {
  return (
    <>
      <Head>
        <title>🦍 Legion | MetaTeds</title>
      </Head>
      <NavBar bgFormat={"bg-slate-900/80"} />
        <div className="bg-slate-900 overflow-x-hidden w-screen h-screen text-center items-center">
          <div className="w-full py-20 px-5 flex items-center">
            <div className="grid md:grid-cols-10 my-4 mx-auto max-w-screen-2xl">
              <div className="text-center md:text-left sm:col-start-1 sm:col-span-5">
                <div className="overflow-auto mt-5">
                  <h1 className="text-2xl text-amber-500 sm:text-3xl tracking-wider font-bold">Ted Mission</h1>
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
              <div className="mt-5 items-center sm:mx-2 lg:mx-4 place-items-center sm:col-span-6 md:col-start-6 md:col-span-5">
                <h1 className="md:ml-4 text-center md:text-left text-amber-500 text-2xl sm:text-3xl tracking-wider font-bold">Builders</h1>
                <div className="sm:text-center text-left items-center grid-rows-2 lg:py-4 lg:px-6">
                  <div className="font-sans items-center text-center sm:row-span-1 sm:w-full w-[60%] sm:justify-between sm:flex py-5 px-3 mx-auto sm:gap-x-4">
                    <div className="bg-indigo-600 border-2 border-indigo-400/100 my-4 sm:my-0 rounded-md block text-center h-[50%] text-zinc-300">
                      <div className="flex flex-col">
                        <span className="box-border block overflow-hidden bg-none opacity-100 border-0 m-0 p-0 relative">
                          <Image 
                            src={require('../assets/pfp/dennis.png')}
                            alt="mr-d"
                            height="auto"
                            width= "400"
                            priority="true"
                          />
                        </span>
                        <p className="uppercase text-xs sm:text-base lg:text-xl font-bold block">Dennis</p>
                        <p className="text-xs sm:text-sm lg:text-base font-bold">Co-Founder - Software / Blockchain Developer & Artist</p>
                      </div>
                      <div className="py-2 px-2 flex flex-row items-center text-center gap-x-1 sm:gap-x-2 justify-center">
                        <span className="text-sm sm:text-base">Twitter</span>
                        <span className="text-sm sm:text-base">LinkedIn</span>
                      </div>
                    </div>
                    <div className="bg-indigo-600 border-2 border-indigo-400/100 rounded-md text-zinc-300 my-4 sm:my-0">
                      <div className="flex flex-col">
                        <span className="box-border block overflow-hidden bg-none opacity-100 border-0 m-0 p-0 relative">
                          <Image 
                            src={require('../assets/pfp/nico.png')}
                            alt="mr-d"
                            height="auto"
                            width= "400"
                            priority="true"
                          />
                        </span>
                        <p className="uppercase text-xs sm:text-base lg:text-xl font-bold block">Nicholas</p>
                        <p className="text-xs sm:text-sm lg:text-base font-bold">Co-Founder - Software Engineer & Blockchain Developer</p>
                      </div>
                      <div className="py-2 px-2 flex flex-row items-center text-center gap-x-1 sm:gap-x-2 justify-center">
                        <span className="text-sm sm:text-base">Twitter</span>
                        <span className="text-sm sm:text-base">LinkedIn</span>
                      </div>
                    </div>
                    <div className="bg-indigo-600 border-2 border-indigo-400/100 text-zinc-300 my-4 sm:my-0 sm:hidden rounded-md">
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
                    </div>
                  </div>
                  <div className="hidden sm:font-sans sm:row-span-1 sm:mt-6 sm:flex sm:items-center sm:justify-center sm:gap-x-4">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer bgFormat={"bg-slate-900/80"}/>
    </>
  );
}