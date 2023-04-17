import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import Container from '../../components/container'
import postConverter from '../../lib/postConverter'
import Header from '../../components/header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import { getAllPostsWithSlug, getPostAndMorePosts, getNavMenu } from '../../lib/api'
import Image from 'next/image'
import Toc from '../../components/toc'


export default function Post({ post, preview, menuItems, footerMenuItems, cleanElement }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Layout preview={preview} footerMenuItems={footerMenuItems} data={post}>
        <Container>
          <Header menuItems={menuItems} />
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article className='single-post'>
                <Head>
                  <title>
                    {`${post?.title}`}
                  </title>
                  <meta
                    property="og:image"
                    content={post.featuredImage?.node.sourceUrl} />
                </Head>
                <div className="alignfull flex flex-col md:flex-row">
                  <div className="md:basis-1/2 w-full h-72 md:h-[420px] relative cover">
                    <Image className="rounded-none object-cover" src={post.featuredImage?.node.sourceUrl} alt={post.featuredImage?.node.altText} fill priority sizes={"100vw"} />
                  </div>
                  <div className="md:basis-1/2 bg-light flex items-center w-full">
                    <div className="max-w-xl px-4 py-12 mx-auto">
                      <h1>{`${post.title}`}</h1>
                    </div>
                  </div>
                </div>
                <div className="entry-content md:px-4 flex">
                  <div className="md:basis-2/3 px-4">
                    <div className="max-w-3xl mx-auto">
                      <div id="article-text">
                        {postConverter(cleanElement)}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:basis-1/3 md:block">
                    <div className='sticky top-6 max-h-[95vh] overflow-y-auto'>
                      <div className='ad-container flex place-content-center items-center mt-6 flex-col'>
                        <h3 className='text-center mb-4'>Sign up for a FREE Copy.ai account!</h3>
                        <a href="https://www.copy.ai/?via=ai-edge-marketing" target='_blank'>
                          <img src="/images/copy-ai-ad-2.gif" alt="Copy.ai Ad" width={300} height={300} />
                        </a>
                      </div>
                      <div className="toc-container mt-6 w-fit">
                        <div className="info">
                          <p className="headlines">Table of contents</p>
                          <div className="ib-toc-separator" style={{ height: "2px" }}></div>
                          <Toc />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </>
          )}
        </Container>
      </Layout></>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const data = await getPostAndMorePosts(params?.slug, preview, previewData)
  const menuItems = await getNavMenu('PRIMARY');
  const footerMenuItems = await getNavMenu('FOOTER');
  var cleanElement = data.post.content.replace(/\n/g, '')
  cleanElement = cleanElement.replace(/href="https:\/\/aiedgemarketing\.ditsmartehjem\.dk/g, 'href="https://aiedgemarketing.com');
  return {
    props: {
      preview,
      post: data.post,
      posts: data.posts,
      menuItems,
      footerMenuItems,
      cleanElement,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: true,
  }
}
