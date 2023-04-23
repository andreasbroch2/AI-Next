import { fetchAPI } from './api';

export async function getSearchData() {
  const response = await getAllPosts();
  const json = generateIndexSearch(response);
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
    let posts = [];
  
    try {
      const nodes = [...data.posts.edges.map(({ node = {} }) => node)];
  
      posts = nodes.map((post) => {
        const data = { ...post };
  
        if (data.author) {
          data.author = data.author.node.name;
        }
  
        if (data.categories) {
          data.categories = data.categories.edges.map(({ node }) => node.name);
        }
  
        if (data.excerpt) {
          //Sanitize the excerpt by removing all HTML tags
          const regExHtmlTags = /(<([^>]+)>)/g;
          data.excerpt = data.excerpt.replace(regExHtmlTags, '');
        }
  
        return data;
      });
  
      return {
        posts,
      };
    } catch (e) {
      throw new Error(`[${process}] Failed to fetch posts: ${e.message}`);
    }
  }
export function generateIndexSearch({ posts }) {
    const index = posts.map((post = {}) => {
  
      return {
        title: post.title,
        slug: post.slug,
        date: post.date,
      };
    });
  
    const indexJson = JSON.stringify({
      generated: Date.now(),
      posts: index,
    });
  
    return indexJson;
  }