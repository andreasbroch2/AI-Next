import Head from 'next/head'
import { GetStaticProps } from 'next'
import Container from '../components/container'
import Layout from '../components/layout'
import { getAllProducts, getNavMenu } from '../lib/api'
import Header from '../components/header'
import { useRouter } from 'next/router'
import React from "react";
import Products from '../components/products'
const parse = require('html-react-parser');


export default function Index({ data, preview, menuItems, footerMenuItems }) {
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Indlæser...</div>;
  }
  return (
    <Layout preview={preview} footerMenuItems={footerMenuItems} data={data}>
    <Head>
      <title>Products</title>
    </Head>
    <Container>
      <Header menuItems={menuItems}/>
          <Products products={data?.edges ?? []}/>
    </Container>
  </Layout>
  )
}
export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const data = await getAllProducts();
  const menuItems = await getNavMenu('PRIMARY')
  const footerMenuItems = await getNavMenu('FOOTER')
  return {
    props: { data, preview, menuItems, footerMenuItems },
    revalidate: 10,
  }
}