import Head from "next/head";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import rm from '../assets/Roadmap.png'
import Image from 'next/image'
import ted_wd from '../assets/ted-warrior-tools.png'

const customLoader = ({src, width, quality}) => {
  return process.env.NODE_ENV === "production" ?
  `${process.env.BASE_URL}/${src}?${width}&q=${quality || 75}`:
`http://localhost:3000/${src}?${width}&q=${quality || 75}`;
}

export default function Gaming() {
  return (
    <>
      <Head>
        <title>📜 Roadmap | MetaTeds</title>
      </Head>
      <NavBar bgFormat={"bg-[#343333]"} />
      <div className="bg-[var(--tw-main-bg-color)]">
        <div className="px-4 py-10 sm:py-10 grid lg:py-12 sm:px-6 sm:grid sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 min-h-screen max-w-full xl:max-w-screen-2xl sm:gap-2 lg:gap-4 mx-auto">
          <div className="h-full py-6 sm:col-span-8 md:col-span-10 lg:col-span-12 xl:col-span-12">
            <div className="h-full pt-4 grid sm:grid-cols-2 place-items-center">
              <div className= "grid place-items-center object-contain object-center py-4 px-2 bg-transparent">
                <Image 
                  loader={customLoader}
                  alt = 'Roadmap'
                  src = {rm}
                  height={'620'}
                  width='auto'
                  placeholder='blur'
                  style = {{objectFit: 'contain', objectPosition: 'center'}}
                />
              </div>
              <div className= "hidden sm:grid place-items-center object-contain object-center py-4 px-2 bg-transparent">
                <Image 
                    loader={customLoader}
                    alt = 'ted_warrior'
                    src = {ted_wd}
                    height={'600'}
                    width='auto'
                    placeholder='blur'
                    style = {{objectFit: 'contain', objectPosition: 'center'}}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer bgFormat={"bg-zinc-800"}/>
    </>
  );
}