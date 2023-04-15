import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';
import Container from '../components/container';
import Header from '../components/header';
import { GetStaticProps } from 'next';
import { getNavMenu } from '../lib/api';


function Error404( {data, preview, footerMenuItems, menuItems} ) {
	return (
		<Layout preview={preview} footerMenuItems={footerMenuItems} data={data}>
        <Head>
            <title>404 Page</title>
        </Head>
		<Container>
			<Header menuItems={menuItems} />
			<section>
			<div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
						<div
							className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
							<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                                Sorry No result found
							</h1>
							<div className="flex justify-center">
								<Link href="/" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
									Back to Home
								</Link>
							</div>
						</div>
						<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
							<img className="object-cover object-center rounded" alt="hero"
								src="https://dummyimage.com/620x400"/>
						</div>
					</div>
			</section>
		</Container>
	</Layout>
	);
}

export default Error404;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	const menuItems = await getNavMenu('PRIMARY');
	const footerMenuItems = await getNavMenu('FOOTER');

	return {
		props: {
			preview,
			menuItems: menuItems,
			footerMenuItems: footerMenuItems,
		},
		revalidate: 1,
	};

}