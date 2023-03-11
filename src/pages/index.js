import Head from 'next/head'
import React, {useRef} from 'react'
import FrontPage from '../components/FrontPage'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'


export default function Home() {
  const ref = useRef()
  return (
    <>
      <Head>
        <title>🚀 Home | MetaTeds </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="MetaTeds Studio - Web3 Community Experience"/>
      </Head>
      <NavBar bgFormat={"bg-slate-900/80"}/>
      <main className="h-screen m-auto items-center text-center w-full bg-slate-900" ref={ref}>
        {" "}
        {/* Main Pages Rendered */}
        <FrontPage />
        
      </main>
      <Footer bgFormat={"bg-slate-900/75"}/>
      
    </>
  )
}


