import { getAllPosts, listTags } from "@/lib/posts";

export function summary(post: Post) {
  if (post.summary) {
    return <p>{post.summary}</p>;
  } else {
    return <p>No summary available</p>;
  }
}

export default function Home() {
  const posts = getAllPosts();
  return (
    <main className="p-5 max-w-4xl mx-auto">
      <h1 className="text-xl py-5 underline">Welcome to My Coding Corner!</h1>
      <p>
        Hey there, fellow reader! I’m so glad you found your way to my little
        corner of the internet!
      </p>
      <p>
        This blog is my passion project, where I share everything I’ve learned
        (and am still learning) about coding, tech, and the exciting world of
        software development.
      </p>
      <h1 className="text-xl py-5 border-b-2">Recent Posts</h1>
      <ul>
        {posts.slice(0, 5).map((post) => (
          <li key={post.slug} className="py-3">
            <a
              href={`/posts/${post.slug}`}
              className="underline hover:text-green-500 dark:hover:text-green-300"
            >
              {post.title}
            </a>
            <p className="text-sm text-align-right border-b-2">
              {post.date} | {listTags(post)}
            </p>
            {summary(post)}
          </li>
        ))}
      </ul>
    </main>
  );
}
