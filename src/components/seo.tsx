import { NextSeo } from 'next-seo';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default function Seo({ seo, uri, data, type = "website" }) {
	const {
		title,
		metaDesc,
		canonical,
		metaRobotsNoindex,
		metaRobotsNofollow,
		opengraphDescription,
		opengraphTitle,
		opengraphImage,
		opengraphSiteName, 
		opengraphModifiedTime,
		opengraphPublishedTime
	} = seo;
	const opengraphUrl = process.env.NEXT_PUBLIC_NEXTJS_SITE_URL + uri;
	if (type == "website") {
		return (
			<>
				<Head>
					<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: seo.schema?.raw }} />
				</Head>
				<NextSeo
					title={title}
					description={opengraphDescription || metaDesc}
					// String repalcement to remove .ditsmartehjem from canonical url
					canonical={opengraphUrl}
					openGraph={{
						type: "website",
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
						site_name: opengraphSiteName,
						/* eslint-enable */
						// If type is article, add article specific properties
					}} />
			</>
		);
	} else if (type == "article") {
		return (
			<>
				<Head>
					<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: seo.schema?.raw }} />
				</Head>
				<NextSeo
					title={title}
					description={opengraphDescription || metaDesc}
					// String repalcement to remove .ditsmartehjem from canonical url
					canonical={opengraphUrl}
					openGraph={{
						type: "article",
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
						site_name: opengraphSiteName,
						/* eslint-enable */
						article: {
							publishedTime: opengraphPublishedTime,
							modifiedTime: opengraphModifiedTime,
						},
					}} />
			</>
		)
	}
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
