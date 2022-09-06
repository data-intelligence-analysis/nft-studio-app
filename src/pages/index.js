import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FrontPage from '../components/FrontPage.js'
import NavBar from '../components/NavBar.js'
import Footer from '../components/Footer.js'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
      <title>Home | MetaTeds </title>
        <meta name="description" content="MetaTeds Utility Landing Page" />
        <link rel="icon" href="/ted.ico" />
      </Head>
      <NavBar />
      <main className={styles.main}>
        <FrontPage />
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  )
}
