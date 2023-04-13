import {useRouter} from 'next/router';
import Layout from '../components/layout';
import Head from 'next/head';
import Container from '../components/container';
import { GetStaticPaths, GetStaticProps } from 'next'
import Header from '../components/header';
import imgConverter from '../lib/imgConverter';
import {getAllPagesWithSlug, getSinglePage, getNavMenu} from '../lib/api';

export default function Page( {data, preview = false, menuItems, footerMenuItems} ) {
	const router = useRouter();

	if ( router.isFallback  || !data?.slug ) {
		return <div>Indlæser...</div>;
	}

	return (
        <Layout preview={preview} footerMenuItems={footerMenuItems} data={data}>
        <Head>
          <title>{data?.seo.title}</title>
        </Head>
        <Container>
          	<Header menuItems={menuItems}/> 
			  <div className='entry-content'>{imgConverter(data.content)}</div>
        </Container>
      </Layout>
	);
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const data = await getSinglePage( params?.slug);
    const menuItems = await getNavMenu('PRIMARY');
	const footerMenuItems = await getNavMenu('FOOTER');
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
	const {data} = await getAllPagesWithSlug();
	const pathsData = [];
	data?.pages?.nodes && data?.pages?.nodes.map( page => {
			var slugs = page?.uri?.split( '/' ).filter( pageSlug => pageSlug );
			pathsData.push( {params: {slug: slugs}} );
			}
	);
	return {
		paths: pathsData,
        fallback: 'blocking',
	};
}
