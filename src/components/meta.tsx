import Head from 'next/head'
import Script from 'next/script'

export default function Meta() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="shortcut icon" href="/favicon/favicon.png" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/favicon.png" />
        <meta name="facebook-domain-verification" content="o2k2qwp36ooqmeihp3w4pi1a740q3y" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta charSet="utf-8" />

      </Head>
    </>
  )
}
