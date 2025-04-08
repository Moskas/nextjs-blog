import { getAllPosts, getPostsByYear, listTags } from "@/lib/posts";

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const uniqueYears = Array.from(
    new Set(allPosts.map((post) => post.date.getFullYear())),
  );
  return uniqueYears.map((year) => ({ year }));
}

export default async function HomePage({ params }) {
  const { year } = params;
  const posts = getPostsByYear(year);
  if (posts.length === 0) {
    return (
      <div className="p-5">
        <h1 className="text-xl font-bold">Error</h1>
        <p>No posts for the year: {year}</p>
      </div>
    );
  }
  return (
    <div className="p-5">
      <h1>Blog posts from {year}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="py-3">
            <a href={`/posts/${post.slug}`} className="underline">
              {post.title}
            </a>
            <p className="text-sm text-align-right border-b-2">
              {post.date.toDateString()} | {listTags(post)}
            </p>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
