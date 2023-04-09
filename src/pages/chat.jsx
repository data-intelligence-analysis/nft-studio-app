import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import ComingSoon from '../components/ComingSoon';
export default function chat (){
  return (
    <div>
      <Head>
        <title>💬 Chat | MetaTeds</title>
      </Head>
      <div>
        <ComingSoon />
      </div>
    </div>
  )
}
