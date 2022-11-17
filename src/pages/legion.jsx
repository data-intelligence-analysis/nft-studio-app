import Head from "next/head";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function Legion() {
  return (
    <>
      <Head>
        <title>🦍 Legion | MetaTeds</title>
      </Head>
      <NavBar bgFormat={"bg-[#343333]"} />
        <div className="bg-[#343333] overflow-x-idden w-screen h-screen text-center items-center">
          <div className="h-full w-full py-20 px-5">
            <div className="h-full grid sm:grid-cols-10 my-4 mx-auto max-w-screen-lg">
              <div className="sm:col-start-1 sm:col-span-4">
              
              </div>
              <div className="sm:col-start-7 sm:col-span-4"></div>
            </div>
          </div>
        </div>
      <Footer bgFormat={"bg-zinc-800"}/>
    </>
  );
}