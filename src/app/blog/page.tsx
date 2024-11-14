import { getAllPosts, listTags } from "@/lib/posts";

export function summary(post: Post) {
  if (post.summary) {
    return <p>{post.summary}</p>;
  } else {
    return <p>No summary available</p>;
  }
}

export default function HomePage() {
  const posts = getAllPosts();

  // Group posts by year
  const postsByYear: { [year: string]: typeof posts } = {};

  posts.forEach((post) => {
    // Get the third element (year) from "day month year hour:minute:second" format
    const year = post.date.split(" ")[2];
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      {Object.keys(postsByYear)
        .sort()
        .reverse()
        .map((year) => (
          <section key={year} className="mb-6">
            <h2 className="text-xl font-semibold border-b-2 border-dashed text-right text-green-800 dark:text-green-300">
              <a href="#" className="hover:underline">
                {year}
              </a>
            </h2>
            <ul>
              {postsByYear[year].map((post) => (
                <li key={post.slug} className="py-3">
                  <a href={`/posts/${post.slug}`} className="underline">
                    {post.title}
                  </a>
                  <p className="text-sm border-b-2">
                    {post.date} |{" "}
                    <span className="italic">{listTags(post)}</span>
                  </p>
                  {summary(post)}
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
