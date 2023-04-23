import Layout from "../components/layout";
import CheckoutForm from "../components/checkout/CheckoutForm";
import Header from "../components/header";
import { GetStaticProps } from 'next'
import Container from "../components/container";
import { getNavMenu } from "../lib/api";
import Head from "next/head";

const Checkout = ({preview, menuItems, footerMenuItems, data}) => (
	<Layout data={data}>
		<Head>
          <title>Checkout</title>
        </Head>
		<Container>
		<div className="checkout container mx-auto my-8 px-4 xl:px-0">
			<h1 className="mb-5 text-2xl uppercase">Checkout Page</h1>
			<CheckoutForm />
		</div>
		</Container>
	</Layout>
);

export default Checkout;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const menuItems = await getNavMenu('PRIMARY')
	const footerMenuItems = await getNavMenu('FOOTER')
	return {
	  props: { preview, menuItems, footerMenuItems },
	  revalidate: 10,
	}
  }