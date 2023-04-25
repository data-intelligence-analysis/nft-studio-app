
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="MetaTeds Studio"/>
        <meta name="description" content="MetaTeds - A collection of 1,000 intergalactic Teds building a platform"/>

        {/*--Facebook*/}
        <meta property="og:title" content="MetaTeds Studio" />
        <meta property="og:description" content="MetaTeds - A collection of 1,000 intergalactic Teds building a platform" />
        <meta property="og:image" content="%PUBLIC_URL%/ted192.png"/>

        {/*Twitter*/}
        <meta property="twitter:title" content="MetaTeds Studio"/>
        <meta property="twitter:description" content="MetaTeds - A collection of 1,000 intergalactic Teds building a platform"/>
        <meta property="twitter:image" content="%PUBLIC_URL%/ted192.png"/>

        {/*Links for icons*/}
        <link rel="icon" href="/ted.ico" />
        <link rel="apple-touch-icon" href="/ted192.png" />
        
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap" rel="stylesheet"  />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Ranchers&display=swap" rel="stylesheet" />
        
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <body className='text-slate-100 ranchers'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

