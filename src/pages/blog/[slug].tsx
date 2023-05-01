import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { GetStaticPaths, GetStaticProps } from 'next'
import Container from '../../components/container'
import postConverter from '../../lib/postConverter'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import { getAllPostsWithSlug, getPostAndMorePosts, getNavMenu } from '../../lib/api'
import Image from 'next/image'
import ServerToc from '../../components/ServerToc'
import { BreadcrumbJsonLd, VideoJsonLd } from 'next-seo'
import Link from 'next/link'
import { useState, useEffect } from 'react'


export default function Post({ post, preview, menuItems, footerMenuItems, cleanElement }) {
  const router = useRouter()
  const [imageClicked, setImageClicked] = useState(true);

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Blog',
            item: 'https://aiedgemarketing.com/blog/',
          },
          {
            position: 2,
            name: post?.title,
          },
        ]}
      />
      {post.postsACF.youtubeId ? (
      <VideoJsonLd
        name={post?.title}
        description={post?.excerpt}
        embedUrl={`https://www.youtube.com/embed/${post.postsACF.youtubeId}?rel=0&showinfo=0&autoplay=1`}
        uploadDate={post?.modified}
        thumbnailUrls={[`https://img.youtube.com/vi/${post.postsACF.youtubeId}/sddefault.jpg`]}
      />
      ):(null)}
      <Layout data={post} type="article">
        <Container>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article className='single-post my-4 md:my-8'>
                <div className="entry-content md:px-4 flex">
                  <div className="md:basis-2/3 px-4">
                    <div className="max-w-3xl mx-auto">
                      <div id="breadcrumbs" className='mb-4 text-xs'>
                        <span><Link href={'/blog/'}>Blog</Link></span>
                        <span className="separator">  /  </span>
                        <span>{post.title}</span>
                      </div>
                      <h1>{`${post.title}`}</h1>

                      {/* Add author and modified date */}
                      <div className="post-meta flex my-4 items-center gap-2 text-sm">
                        <div className="post-meta__author-avatar">
                          <Image
                            className="rounded-full"
                            src={post.author?.node.avatar.url}
                            alt={post.author?.node.name}
                            width={30}
                            height={30}
                            priority
                          />
                        </div>
                        <div className="post-meta__author-name">
                          <span>By </span>
                          <span>{post.author?.node.firstName}</span>
                        </div>
                        <span>|</span>
                        <div className="post-meta__date">
                          <span>Updated </span>
                          {/** print modified date to this format: Jan 20, 2023 */}
                          <span>{new Date(post.modified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                      </div>
                      {/** If post.postsACF.youtubeId is not empty print it. else print image  */}
                      {post.postsACF.youtubeId ? (
                        <div className='relative video-post'>
                          {!imageClicked ? (
                            <>
                              <Image
                                src={`https://img.youtube.com/vi/${post.postsACF.youtubeId}/sddefault.jpg`}
                                fill
                                alt="yt thumbnail"
                                priority
                              />
                              <img className='play' id="play-button" src="http://addplaybuttontoimage.way4info.net/Images/Icons/7.png" alt="play button" />
                            </>
                          ) : (
                            <iframe
                              allowFullScreen
                              src={
                                imageClicked
                                  ? `https://www.youtube.com/embed/${post.postsACF.youtubeId}?rel=0&showinfo=0&autoplay=1`
                                  : ""
                              }
                              title="youtube video"
                            />
                          )}
                        </div>
                      ) : (
                        <div className="relative">
                          <Image
                            className="object-cover"
                            src={post.featuredImage?.node.sourceUrl}
                            alt={post.featuredImage?.node.altText}
                            width={post.featuredImage?.node.mediaDetails.width}
                            height={post.featuredImage?.node.mediaDetails.height}
                            sizes="
                      (max-width: 768px) 100vw,
                      50vw"
                          />
                        </div>
                      )}
                      <div id="article-text">
                        {postConverter(cleanElement)}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:basis-1/3 md:block">
                    <div className='ad-container flex place-content-center items-center flex-col'>
                      <h3 className='text-center mb-4'>Sign up for a FREE Copy.ai account!</h3>
                      <a href="https://www.copy.ai/?via=ai-edge-marketing" target='_blank'>
                        <Image src="/images/copy-ai-ad.png" alt="Copy.ai Ad" width={300} height={300} priority />
                      </a>
                    </div>
                    <div className='sticky top-0 max-h-[95vh] overflow-y-auto'>
                      <div className="toc-container mt-6 w-fit mx-auto">
                        <div className="info">
                          <p className="headlines">Table of contents</p>
                          <div className="ib-toc-separator" style={{ height: "2px" }}></div>
                          <ServerToc html={post?.content} />
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
  cleanElement = cleanElement.replace(/href='https:\/\/aiedgemarketing\.ditsmartehjem\.dk/g, "href='");
  cleanElement = cleanElement.replace(/href="https:\/\/aiedgemarketing\.ditsmartehjem\.dk/g, 'href="');
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
