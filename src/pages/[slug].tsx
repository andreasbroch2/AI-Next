import { useRouter } from 'next/router';
import Layout from '../components/layout';
import Head from 'next/head';
import Container from '../components/container';
import { GetStaticPaths, GetStaticProps } from 'next'
import Header from '../components/header';
import imgConverter from '../lib/imgConverter';
import { getAllPagesWithSlug, getSinglePage, getNavMenu } from '../lib/api'; 

export default function Page({ data, preview = false, menuItems, footerMenuItems }) {
	const router = useRouter();

	if (router.isFallback || !data?.slug) {
		return <div>Indlæser...</div>;
	}

	return (
		<Layout data={data}>
			<Head>
				<title>{data?.seo.title}</title>
			</Head>
			<Container>
				<Header menuItems={menuItems} />
				<section>
					<div className='entry-content'>{data.content}</div>
				</section>
			</Container>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const data = await getSinglePage(params?.slug);
	const menuItems = await getNavMenu('PRIMARY');
	const footerMenuItems = await getNavMenu('FOOTER');
	if ( !data ) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			data: data || {},
			menuItems: menuItems,
			footerMenuItems: footerMenuItems,
		},
		revalidate: 1,
	};

}

export const getStaticPaths: GetStaticPaths = async () => {
	const allPages = await getAllPagesWithSlug();
	// Remove node if slug is one of following: 'blog' 'cart' 'checkout''404'
	const filteredPages = allPages.edges.filter(({ node }) => {
		return node.slug !== 'blog' && node.slug !== 'cart' && node.slug !== 'checkout' && node.slug !== '404' && node.slug !== 'front-page';
	});

	return {
		paths: filteredPages?.map(({ node }) => `/${node.slug}`) || [],
		fallback: 'blocking',
	};
}
