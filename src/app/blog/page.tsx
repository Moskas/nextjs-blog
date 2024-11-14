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
              {post.date} |{" "}
              {Array.isArray(post.tags) ? (
                post.tags.map((tag) => (
                  <a className="text-cyan-300" href={`/tags/${tag}`} key={tag}>
                    #{tag}{" "}
                  </a>
                ))
              ) : (
                <span></span>
              )}
            </p>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
