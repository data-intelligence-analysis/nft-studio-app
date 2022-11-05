
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

