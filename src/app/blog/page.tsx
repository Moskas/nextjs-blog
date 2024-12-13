import { getAllPosts, listTags } from "@/lib/posts";
import { summary } from "@/lib/summary";

export default function HomePage() {
  const posts = getAllPosts();

  // Group posts by year
  const postsByYear: { [year: string]: typeof posts } = {};
  posts.forEach((post) => {
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
            <ul className="">
              {postsByYear[year].map((post) => (
                <li key={post.slug} className="m-2 p-3 bg-neutral-600/20">
                  <a
                    href={`/posts/${post.slug}`}
                    className="text-xl hover:underline"
                  >
                    {post.title}
                  </a>
                  <p className="text-sm border-b-2">
                    {post.date} |{" "}
                    <span className="italic">{listTags(post)}</span>
                  </p>
                  <p>{summary(post)}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  );
}
