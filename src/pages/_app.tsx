import { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/index.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import localFont from 'next/font/local'
import Head from 'next/head'
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const poppins = localFont({
  src: [
    {
      path: './Poppins-Regular.ttf',
      weight: '400'
    }
  ],
  variable: '--font-poppins'
})



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
    <Script id="google-tag-manager" strategy='afterInteractive'>
          {`
          (function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TG6SCN8');
          `}
        </Script>
    </Head>
    <div className={poppins.className}>
      <Script src="/js/app.js" />
      <Script src="/js/fontAwesome.js" />
      <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
