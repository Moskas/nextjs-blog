import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="p-5">
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="py-3">
            <a href={`/posts/${post.slug}`} className="underline">
              {post.title}
            </a>
            <p className="text-sm text-align-right border-b-2">
              {post.date} | {post.formattedTags}
            </p>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
