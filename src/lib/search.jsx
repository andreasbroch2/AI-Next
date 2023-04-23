import { fetchAPI } from './api';

export async function getSearchData() {
  const response = await getAllPosts();
  const postsData = response?.edges;
  console.log('PostsData', postsData)
  const json = generateIndexSearch(postsData);
  return JSON.parse(json);
}

export async function getAllPosts() {
    const data = await fetchAPI(`
    {
      posts(first: 10000) { 
        edges {
          node {
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
            categories {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
    `);
    return data?.posts;
  }
export function generateIndexSearch( posts ) {
    const indexJson = JSON.stringify({
      generated: Date.now(),
      posts: posts,
    });
  
    return indexJson;
  }