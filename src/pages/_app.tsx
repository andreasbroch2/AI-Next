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
import { SearchProvider } from '../hooks/use-search';

const poppins = localFont({
  src: [
    {
      path: './Poppins-Regular.ttf',
      weight: '400'
    }
  ],
  variable: '--font-poppins'
})
const outfit = localFont({
  src: [
    {
      path: './Outfit-VariableFont_wght.ttf'
    }
  ],
  variable: '--font-outfit'
})



function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-P8GKKRH' });
}, []);
  return (
    <SearchProvider>
    <div className={`${poppins.className} ${outfit.className}`}>
      <Script src="/js/app.js" />
      <Script src="/js/fontAwesome.js" />
      <Component {...pageProps} />
      </div>
    </SearchProvider>
  )
}

export default MyApp
