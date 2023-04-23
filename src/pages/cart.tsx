
import Layout from "../components/layout";
import CartItemsContainer from "../components/woocommerce/CartItemsContainer";
import { getNavMenu } from "../lib/api";
import Head from "next/head";
import Container from "../components/container";
import Header from "../components/header";
import { useRouter } from "next/router";

export default function Cart({ data, preview = false, menuItems, footerMenuItems }) {
    const router = useRouter();

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if ( router.isFallback ) {
		return <div>Indlæser...</div>; 
	}

	return (
    <Layout data={data}>
        <Head>
          <title>Cart</title>
        </Head>
        <Container>
			<CartItemsContainer/>
        </Container>
      </Layout>
	)
};

export async function getStaticProps({preview = false }) {
    const menuItems = await getNavMenu('PRIMARY');
    const footerMenuItems = await getNavMenu('FOOTER');
	return {
		props: {
            menuItems: menuItems,
            footerMenuItems: footerMenuItems,
            preview: preview
		},
		/**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */
		revalidate: 1,
	};

}
