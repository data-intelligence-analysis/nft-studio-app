import Head from 'next/head'
import styles from '../styles/home.module.css'
import FrontPage from '../components/FrontPage'
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
