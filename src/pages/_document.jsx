
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="MetaTeds Studio"/>
        <meta name="description" content="MetaTeds - A collection of 1,000 intergalactic Teds building a platform"/>

        {/*--Facebook*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatedstudio.com/" />
        <meta property="og:title" content="MetaTeds" />
        <meta property="og:description" content="Building a Web3 Community Platform" />
        <meta property="og:image" content="%PUBLIC_URL%/ted192.png"/>

        {/*Twitter*/}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://metatedstudio.com/"/>
        <meta property="twitter:title" content="MetaTeds"/>
        <meta property="twitter:description" content="Building a Web3 Community Platform"/>
        <meta property="twitter:image" content="%PUBLIC_URL%/ted192.png"/>

        {/*<link href="../../dist/output.css" rel="stylesheet"></link>*/}
        {/*Links for icons*/}
        <link rel="icon" href="/ted.ico" />
        {/*Logos - Device Type*/}
        <link rel="apple-touch-icon" href="/ted192.png" />
        {/*<link rel="preload prefetch" href="/img/metateds-header.png" as="font" />*/}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap" rel="stylesheet"  />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

