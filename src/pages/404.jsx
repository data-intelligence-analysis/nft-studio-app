import Head from "next/head";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageNotFound from "../components/PageNotFound";
import Link from 'next/link';
export default function NotFound404() {
  return (
    <>
      <Head>
        <title>😔 Page Not Found 404 | MetaTeds</title>
      </Head>
      <div className="bg-[#343333] h-screen grid grid-cols-5 gap-10">
        <nav className="place-items-center col-start-1 col-span-1 top-0 pointer-event-none z-nav w-full">
          <div className="mt-4 w-full">
            <div className="flex fixed items-center cursor-pointer pointer-events-auto justify-between flex-row px-4">
              <div className="hover:bg-indigo-700">
                <Link href="/" passHref legacyBehavior>
                  <ArrowBackIcon />
                </Link>
              </div>
              
              <div className="pl-4">
                <p>Home</p>
              </div>
            </div>
          </div>
        </nav>
        <div className="place-items-center my-auto col-start-2 col-span-3 text-center">
          <h1 className="text-lg sm:text-xl md:text-2xl">🚀 404 - Page Not Found </h1>
        </div>
        
      </div>
      
    </>
  );
}