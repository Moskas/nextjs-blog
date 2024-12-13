import { getPostsByTag, getAllPosts, listTags } from "@/lib/posts";
import { summary } from "@/lib/summary";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ tags: post.tag }));
}

export default async function HomePage({ params }) {
  const { tags } = await params;
  const posts = getPostsByTag(tags);

  if (posts.length === 0) {
    return (
      <div className="p-5">
        <h1 className="text-xl font-bold">Error</h1>
        <p>No posts with tag: {tags}</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1>
        Blog posts tagged:{" "}
        <span className="text-cyan-700 dark:text-cyan-300 hover:underline">
          #{tags}
        </span>
      </h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="py-3">
            <a href={`/posts/${post.slug}`} className="underline">
              {post.title}
            </a>
            <p className="text-sm text-align-right border-b-2">
              {post.date} | {listTags(post)}
            </p>
            <p className="text-sm">{summary(post)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
