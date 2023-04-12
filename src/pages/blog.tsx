import {useRouter} from 'next/router';
import Layout from '../components/layout';
import Head from 'next/head';
import Container from '../components/container';
import Header from '../components/header';
import Posts from '../components/posts';
import {getSinglePage, getNavMenu, getAllPostsForHome} from '../lib/api';
import imgConverter from '../lib/imgConverter';

const Page = ( {allPosts, data, preview = false, menuItems, footerMenuItems} ) => {
	const router = useRouter();

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if ( router.isFallback ) {
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
              <Posts posts={allPosts?.edges ?? []}/>
        </Container>
      </Layout>
	);
};

export default Page;

export async function getStaticProps() {
    const data = await getSinglePage( '/blog');
    const menuItems = await getNavMenu('PRIMARY');
    const footerMenuItems = await getNavMenu('FOOTER');
    const allPosts = await getAllPostsForHome(false);
	return {
		props: {
			data: data || {},
      menuItems: menuItems,
      allPosts: allPosts,
      footerMenuItems: footerMenuItems,
		},
		/**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */
		revalidate: 1,
	};

}
