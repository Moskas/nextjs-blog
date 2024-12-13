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

export function getPostsByTag(tag) {
  const allPosts = getAllPosts();
  const filteredPosts = allPosts.filter(
    (post) => post.tags && post.tags.includes(tag),
  );
  return filteredPosts;
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
      summary: post.summary,
      url: `http://localhost:3000/posts/${post.slug}`, // link to the post
      guid: post.slug, // unique identifier for the post
      date: post.date, // publication date
    });
  });
  // Return the RSS XML as a string
  return feed.xml({ indent: true });
}

export function listTags(post) {
  // Check if post.tags is an array and return appropriate JSX
  if (Array.isArray(post.tags) && post.tags.length > 0) {
    return (
      <>
        {post.tags.map((tag) => (
          <a
            className="text-cyan-700 dark:text-cyan-300 italic hover:underline"
            href={`/tags/${tag}`}
            key={tag}
          >
            #{tag}{" "}
          </a>
        ))}
      </>
    );
  } else {
    return (
      <span className="text-gray-600 dark:text-gray-300">
        No tags available
      </span>
    ); // More informative message
  }
}

export function getPostsByYear(year) {
  const allPosts = getAllPosts();
  const filteredPosts = allPosts.filter(
    (post) => post.date && new Date(post.date).getFullYear() === year,
  );
  return filteredPosts;
}
