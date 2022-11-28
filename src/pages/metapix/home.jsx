import Head from "next/head";
import Link from 'next/link'
import Image from 'next/image'
import metapix_logo from '../../assets/metapix_banner.png'
const artShowApp = {
  backgroundImage: 'url(/img/artShowApp.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100vh',
  backgroundPosition: 'center center',
  backgroundAttachment: 'fixed'
}
const HomeURL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:3000";
export default function Home () {

  return (
    <>
      <Head>
        <title>✨ Metapix | MetaTeds</title>
      </Head>
      <div>
      <section classNamae="min-h-full min-h-screen w-full relative" style={artShowApp}>
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto">
          <div className="sm:h-screen text-align items-center justify-center flex flex-col m-4 p-5 sm:p-8 md:p-10 sm:grid sm:place-items-center sm:grid-cols-10">
            <div className="mt-10 mb-5 sm:mb-10 col-span-6 col-start-1 mx-auto">
              <span className="box-border block overflow-hidden bg-none opacity-100 border-0 m-0 p-0 relative">
                <Image
                  src={metapix_logo}
                  alt="metapix"
                  height="250"
                  width= "500"
                  placeholder='blur'
                  priority="true"
                  style = {{objectFit: 'contain', objectPosition: 'center', borderRadius: '15px'}}
                />
              </span>
            </div>
            <div className="mt-5 sm:mb-10 col-span-4 col-start-7">
              <div className="px-4 py-2 sm:py-4 sm:px-8 mx-auto flex rounded-md h-full sm:h-full w-full border-indigo-700 bg-zinc-600">
                <div className="flex flex-col px-2 py-4 items-center justify-center">
                  <h1>Placeholder Image</h1>
                  <p className="pt-4">Button 1</p>
                  <p className="pt-4">Button 2</p>
                  <p className="pt-4">Button 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>


    </>

  )
  
}