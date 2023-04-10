import Head from 'next/head'
import Script from 'next/script'

export default function Meta() {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon/favicon.png" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/favicon.png" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta charSet="utf-8" />

      </Head>
    </>
  )
}
