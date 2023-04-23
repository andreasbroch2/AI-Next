import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Script from 'next/script';
import PropTypes from 'prop-types';

export default function Seo({ seo, uri }) {
	const {
		title,
		metaDesc,
		canonical,
		metaRobotsNoindex,
		metaRobotsNofollow,
		opengraphDescription,
		opengraphTitle,
		opengraphImage,
		opengraphSiteName
	} = seo;
	const opengraphUrl = process.env.NEXT_PUBLIC_NEXTJS_SITE_URL + uri; 
	const schema = seo.schema?.raw.replace(/\.ditsmartehjem.dk/g, '.com');
	return (
		<>
		<Head>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
		</Head>
		<NextSeo
				title={title}
				description={opengraphDescription || metaDesc}
				// String repalcement to remove .ditsmartehjem from canonical url
				canonical={opengraphUrl}
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: opengraphUrl,
					title: opengraphTitle,
					description: opengraphDescription,
					images: [
						{
							url: opengraphImage?.sourceUrl,
							width: 1280,
							height: 720
						}
					],
					/* eslint-disable */
					site_name: opengraphSiteName
					/* eslint-enable */
				}} /></>
	);
};

Seo.propTypes = {
	seo: PropTypes.object
};

Seo.defaultProps = {
	seo: {
		canonical: '',
		title: '',
		metaDesc: '',
		metaRobotsNoindex: '',
		metaRobotsNofollow: '',
		opengraphDescription: '',
		opengraphTitle: '',
		opengraphImage: {
			sourceUrl: ''
		},
		opengraphUrl: '',
		opengraphSiteName: ''
	}
};
