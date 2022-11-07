import Head from "next/head";
import { useRouter } from "next/router";

export default function PageNotFound(){
  const router = useRouter();
  const routeBack = (e) => {
    e.preventDefault();
    router.back();
  };
  const HOME_URL = '/'
  return (
    <>
      <Head>
        <title>Page Not Found | MetaTeds</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-full min-h-screen m-auto text-white bg-indigo-900">
        <h1 className="mb-8 font-sans text-4xl">404: Page Not Found</h1>
        <a
          href={HOME_URL}
          className="px-5 py-3 text-lg text-white bg-indigo-500 rounded-lg shadow cursor-pointer hover:bg-indigo-400 mb-8"
        >
          <span className="mr-2">Go Home</span>
          <span className="text-lg">🚀</span>
        </a>
        <a
          href="#"
          onClick={routeBack}
          className="px-5 py-3 text-white dark:text-slate-100 rounded-lg bg-indigo-500 bg-opacity-0 hover:bg-opacity-40 dark:hover:bg-opacity-40 dark:hover:text-white cursor-pointer hover:underline"
        >
          Back
        </a>
      </div>
    </>
      
  )
}