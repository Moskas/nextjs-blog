import RSS from "rss";
import { getAllPosts } from "@/lib/posts"; // Adjust the import based on your file structure

export async function GET() {
  const posts = await getAllPosts(); // Fetch your posts

  const feed = new RSS({
    title: "Moskas' Blog",
    description: "Moskas' Ramblings",
    feed_url: "https://localhost:3000/feed", // Update this URL accordingly
    site_url: "https://localhost:3000",
    language: "en",
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.content,
      content: post.content,
      url: `https://localhost:3000/posts/${post.slug}`,
      guid: post.slug,
      date: post.date,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
