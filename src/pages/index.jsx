import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FrontPage from '../components/frontpage'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | MetaTeds </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="MetaTeds Studio - Web3 Community Experience"/>
      </Head>
      <div className={styles.container}>
        <NavBar />
        {/* Main Pages Rendered */}
        <main className={styles.main}>
          <FrontPage />
        </main>
        <Footer />
      </div>
    </>
  )
}
