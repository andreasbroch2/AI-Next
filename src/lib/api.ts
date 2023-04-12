const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }
  // WPGraphQL Plugin must be enabled
  const res = await fetch('https://aiedgemarketing.ditsmartehjem.dk/graphql', {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}
export async function checkoutMutation(input){
  const data = await fetchAPI(`
  mutation CHECKOUT_MUTATION( $input: CheckoutInput! ){
    checkout(input: $input) {
      clientMutationId
      order {
        id
        orderKey
        orderNumber
        status
        refunds {
          nodes {
            amount
          }
        }
      }
      result
      redirect
    }
  }
  `,
  {
    variables: { input },
  })
  return data?.checkout
}
export async function getPreviewPost(id, idType = 'DATABASE_ID') {
  const data = await fetchAPI(
    `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
    {
      variables: { id, idType },
    }
  )
  return data.post
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.posts
}
// Get all pages
export async function getAllPagesWithSlug() {
  const data = await fetchAPI(`
    {
      pages(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.pages
}
export async function getAllProductsWithSlug() {
  const data = await fetchAPI(`
    {
      products(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  return data?.products
}
export async function getAllProducts() {
  const data = await fetchAPI(`
  {
    products {
      edges {
        node {
          content
          excerpt
          slug
          seo {
            breadcrumbs {
              text
              url
            }
            title
            canonical
            metaDesc
            metaRobotsNoindex
            metaRobotsNofollow
            opengraphAuthor
            opengraphDescription
            opengraphTitle
            opengraphImage {
              sourceUrl
            }
            opengraphSiteName
            opengraphPublishedTime
            opengraphModifiedTime
            schema {
              raw
            }
            twitterTitle
            twitterDescription
            twitterImage {
              sourceUrl
            }
          }
          featuredImage { 
            node {
              altText
              sourceUrl
            }
          }
          name
          title
          ... on SimpleProduct {
            id
            name
            regularPrice
          }
        }
      }
    }
  }
  `)
  return data?.products
}
export async function getACFHomepage() {
  const data = await fetchAPI(`
    query GET_ACF_HOMEPAGE {
      page(id: "15", idType: DATABASE_ID) 
      {
      id
      homePage {
        heroCta
        heroDescription
        heroHeadline
        heroImage {
          altText
          sourceUrl
        }
      }
	    title
	    content
	    slug
	    uri
      seo {
        breadcrumbs {
          text
          url
        }
        title
        canonical
        metaDesc
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphAuthor
        opengraphDescription
        opengraphTitle
        opengraphImage {
          sourceUrl
        }
        opengraphSiteName
        opengraphPublishedTime
        opengraphModifiedTime
        schema {
          raw
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
      }
  }
}`
  )
  return data?.page;
}
export async function getSinglePage(slug) {
  const data = await fetchAPI(`
	query GET_PAGE{
	  page: pageBy(uri: "${slug}") {
	    id
	    title
	    content
	    slug
	    uri
      seo {
        breadcrumbs {
          text
          url

        }
        title
        canonical
        metaDesc
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphAuthor
        opengraphDescription
        opengraphTitle
        opengraphImage {
          sourceUrl
        }
        opengraphSiteName
        opengraphPublishedTime
        opengraphModifiedTime
        schema {
          raw
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
  }
          }
	  }
	}
  `,
    {
      variables: {
        slug: slug,
      },
    })
  return data?.page
}
export async function getSingleProduct(slug) {
  const data = await fetchAPI(`
  query GET_PRODUCT {
	  product(id: "${slug}", idType: SLUG) {
	    id
	    title
	    content
	    slug
	    uri
      productId
      image {
        id
        uri
        title
        srcSet
        sourceUrl
        altText
        }
        ... on SimpleProduct {
          price
          id
          regularPrice(format: RAW)
          salePrice(format: RAW)
          }
      seo {
        breadcrumbs {
          text
          url

        }
        title
        canonical
        metaDesc
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphAuthor
        opengraphDescription
        opengraphTitle
        opengraphImage {
          sourceUrl
        }
        opengraphSiteName
        opengraphPublishedTime
        opengraphModifiedTime
        schema {
          raw
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
      }
	  }
  }
  `,
    {
      variables: {
        slug: slug,
      },
    })
  return data
}
export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        onlyEnabled: !preview,
        preview,
      },
    }
  )

  return data?.posts
}

export async function getPostAndMorePosts(slug, preview, previewData) {
  const postPreview = preview && previewData?.post
  // The slug may be the id of an unpublished post
  const isId = Number.isInteger(Number(slug))
  const isSamePost = isId
    ? Number(slug) === postPreview.id
    : slug === postPreview.slug
  const isDraft = isSamePost && postPreview?.status === 'draft'
  const isRevision = isSamePost && postPreview?.status === 'publish'
  const data = await fetchAPI(
    `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          ...AuthorFields
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        seo {
          breadcrumbs {
            text
            url
          }
          canonical
          title
          metaDesc
          metaRobotsNoindex
          metaRobotsNofollow
          opengraphAuthor
          opengraphDescription
          opengraphTitle
          opengraphImage {
            sourceUrl
          }
          opengraphSiteName
          opengraphPublishedTime
          opengraphModifiedTime
          schema {
            raw
          }
          twitterTitle
          twitterDescription
          twitterImage {
            sourceUrl
          }
        }
        ${
    // Only some of the fields of a revision are considered as there are some inconsistencies
    isRevision
      ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        
        `
      : ''
    }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
    {
      variables: {
        id: isDraft ? postPreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'SLUG',
      },
    }
  )

  // Draft posts may not have an slug
  if (isDraft) data.post.slug = postPreview.id
  // Apply a revision (changes in a published post)
  if (isRevision && data.post.revisions) {
    const revision = data.post.revisions.edges[0]?.node

    if (revision) Object.assign(data.post, revision)
    delete data.post.revisions
  }

  // Filter out the main post
  data.posts.edges = data.posts.edges.filter(({ node }) => node.slug !== slug)
  // If there are still 3 posts, remove the last one
  if (data.posts.edges.length > 2) data.posts.edges.pop()

  return data
}
export async function getNavMenu(location) {
  const data = await fetchAPI(`
    {
      menuItems(where: {location: ${location}}) {
        edges {
          node {
            label
            url
            cssClasses
            childItems {
              edges {
                node {
                  label
                  url
                }
              }
            }
          }
        }
      }
    }
  `)
  return data?.menuItems
}
export async function getAllAutomations() {
  const data = await fetchAPI(`
    {
      automations(first: 10000) {
          nodes {
            id
            title
            content
        }
      }
    }
  `)
  return data?.automations
}
export async function getAllHardwares() {
  const data = await fetchAPI(`
    {
      hardwares(first: 10000) {
          nodes {
            id
            title
            content
        }
      }
    }
  `)
  return data?.hardwares
}