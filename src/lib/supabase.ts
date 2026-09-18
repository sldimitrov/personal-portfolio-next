interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  date?: string;
}

const API_KEY = process.env.API_KEY || "";
const DATA_API_URL = process.env.DATA_API_URL || "";

if (!API_KEY || !DATA_API_URL) {
  throw new Error("Missing Supabase environment variables: API_KEY and DATA_API_URL");
}

async function fetchPosts(): Promise<Post[]> {
  const url = `${DATA_API_URL}posts`;

  const response = await fetch(url, {
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  const posts = await response.json();
  return posts;
}

async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await fetchPosts();
  return posts.find((post) => post.slug === slug) || null;
}

async function getSortedPosts(): Promise<Post[]> {
  const posts = await fetchPosts();
  return posts.sort((a, b) => {
    const dateA = new Date(b.date || 0).getTime();
    const dateB = new Date(a.date || 0).getTime();
    return dateA - dateB;
  });
}

export { fetchPosts, getPostBySlug, getSortedPosts, type Post };
