import { useEffect } from 'react';
import Layout from '../components/layout';
import Head from 'next/head';
import Container from '../components/container';
import Posts from '../components/posts';
import useSearch from '../hooks/use-search';

export default function Search() {
    const { query, results, search } = useSearch();
    const title = 'Search';
    const slug = 'search';

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        search({
            query: params.get('q'),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log('results', results)
    return (
        <Layout>
            <Head>
                <title>Search results page - AI Edge Marketing</title>
            </Head>
            <Container>
                <section>
                    <h1 className='text-center'>Search Results for: "{query}"</h1>
                    <Posts posts={results} />
                </section>
            </Container>
        </Layout>
    );
}

// Next.js method to ensure a static page gets rendered
export async function getStaticProps() {
    return {
        props: {},
    };
}
