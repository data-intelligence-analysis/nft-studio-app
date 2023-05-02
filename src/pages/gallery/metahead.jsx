import Head from "next/head";
import Image from "next/image";
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useWallet } from "@solana/wallet-adapter-react";
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import PageLayout from "../../components/Layouts/PageLayout";
import Collection from "../../components/NFT/Collection";
export default function Metahead() {
  const router = useRouter();
  const { pathname } = useRouter();
  const routeBack = (e) => {
    e.preventDefault();
    router.back();
  };
  return (
    <>
      <Head>
        <title>🎨 Gallery | MetaHead</title>
      </Head>
      <div className="h-screen overflow-auto">
        <NavBar bgFormat={"bg-slate-900"} />
        <div className="max-w-screen-2xl grid w-screen mx-auto items-center w-full p-3 lg:p-6">
          <nav className="mt-20 pt-5 top-0 pointer-event-auto z-nav w-full overflow-hidden">
            <div className="flex items-center cursor-pointer pointer-events-auto justify-between flex-row gap-4">
              <div className="flex inline-flex p-2">
                <a href="#" onClick={routeBack} className="hover:bg-indigo-700 rounded-md px-2">
                  <ArrowBackIcon />
                </a>
                <div className="pl-2 ">
                  <p>Back</p>
                </div>
              </div>
            </div>
          </nav>
          <PageLayout 
            collection="Metahead"
            pathname={pathname}
          >
            <Collection collection="Metahead" />
          </PageLayout>
        </div>
      </div>
      
    </>
  );
}