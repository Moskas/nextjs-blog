import fs from "fs";
import path from "path";
import matter from "gray-matter";
import RSS from "rss";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...data,
      content,
    };
  });

  return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function generateRSSFeed() {
  const posts = getAllPosts();

  // Create a new RSS feed
  const feed = new RSS({
    title: "Your Blog Title",
    description: "Description of your blog",
    feed_url: "http://yourwebsite.com/feed",
    site_url: "http://yourwebsite.com",
    language: "en",
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.content,
      url: `http://localhost:3000/posts/${post.slug}`, // link to the post
      guid: post.slug, // unique identifier for the post
      date: post.date, // publication date
    });
  });

  // Return the RSS XML as a string
  return feed.xml({ indent: true });
}
