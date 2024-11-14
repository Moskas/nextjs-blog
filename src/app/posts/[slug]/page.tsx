import MarkdownIt from "markdown-it";
import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";

const md = new MarkdownIt();

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function fetchPost(slug) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = md.render(post.content);

  return (
    <article className="p-5 max-w-4xl mx-auto">
      <h1 className="md:underline">{post.title}</h1>
      <p className="post-meta">
        {post.date} | {post.author}
      </p>
      {Array.isArray(post.tags) ? (
        post.tags.map((tag) => (
          <a className="text-cyan-300" href={`/tags/${tag}`} key={tag}>
            #{tag}{" "}
          </a>
        ))
      ) : (
        <span></span>
      )}
      <div
        className="post-content py-5 prose"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
