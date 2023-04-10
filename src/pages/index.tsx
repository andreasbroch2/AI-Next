import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import Layout from '../components/layout'
import { getACFHomepage, getNavMenu } from '../lib/api'
import Header from '../components/header'
import { useRouter } from 'next/router'
import Script from 'next/script'
import Image from "next/image";
import React from "react";
import ContactForm from '../components/contactForm'
const parse = require('html-react-parser');


export default function Index({ data, preview, menuItems, footerMenuItems, content }) {
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Indlæser...</div>;
  }
  return (
    <Layout preview={preview} footerMenuItems={footerMenuItems} data={data}>
      <Script src="https://kit.fontawesome.com/bf7aea6dc3.js" />
      <Head>
        <title>{data.seo.title}</title>
      </Head>
      <Container>
        <Header menuItems={menuItems} />
        <div className='entry-content homepage'>
          {/* Hero section with image with text and a cta with a newsletter signup form */}
          <section className='wp-block-cover alignfull hero-section'>
            <span className='wp-block-cover__background'></span>
            <Image src={data.homePage.heroImage.sourceUrl} alt={data.homePage.heroImage.altText} width={1920} height={1080} priority placeholder='blur' blurDataURL={`/_next/image?url=${data.homePage.heroImage.sourceUrl}&w=16&q=1`}></Image>
            <div className='wp-block-cover__inner-container'>
              <div className='flex items-center'>
                <div className='wp-block-column is-layout-flow'>
                  <h1 className='text-white mb-8'>{data.homePage.heroHeadline}</h1>
                  <p className='text-white'>{data.homePage.heroDescription}</p>
                </div>
                <div className='wp-block-column is-layout-flow'>
                  <p className='text-primary'>{data.homePage.heroCta}</p>
                      <ContactForm />
                </div>
              </div>
            </div>
          </section>

        </div>
      </Container>
    </Layout>
  )
}
export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getACFHomepage();
  const menuItems = await getNavMenu('PRIMARY')
  const footerMenuItems = await getNavMenu('FOOTER')
  console.log(data)
  return {
    props: { data, preview, menuItems, footerMenuItems },
    revalidate: 10,
  }
}