import Head from "next/head";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Image from 'next/image';
import {buildUrl} from 'cloudinary-build-url';
import ComingSoon from '../../components/ComingSoon'
export default function Home() {
  return (
    <>
      <Head>
        NFTs Gallery | MetaTeds
      </Head>
      <div>
        <ComingSoon />
      </div>
    </>
  )
}