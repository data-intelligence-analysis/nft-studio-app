
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="MetaTeds Studio"/>
        <meta name="description" content="Building a Web 3 Ecosystem"/>
        {/*<link href="../../dist/output.css" rel="stylesheet"></link>*/}
        {/*Links for icons*/}
        <link rel="icon" href="/ted.ico" />
        {/*Logos - Device Type*/}
        <link rel="apple-touch-icon" href="/ted192.png" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

