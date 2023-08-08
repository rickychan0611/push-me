import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <title>Pikadish - suite</title>
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no" />
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@300;400;500;700;900&family=Rubik:wght@700&family=Ubuntu:wght@300;400;500&display=swap" rel="stylesheet" />

        {/* <script
          type="text/javascript"
          src={'https://maps.googleapis.com/maps/api/js?key=' + process.env.NEXT_PUBLIC_MAP_API + '&libraries=places'}
          async
        ></script> */}

        <script src="https://cdn.rawgit.com/jeromeetienne/ar.js/2.2.0/aframe/build/aframe-ar.js"></script>

        <Script
          async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
          strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID}');
          `}
        </Script>

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

