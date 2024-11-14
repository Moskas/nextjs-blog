import MarkdownIt from "markdown-it";
import { getAllPosts, listTags } from "@/lib/posts";
import { notFound } from "next/navigation";
import hljs from "highlight.js";
import "highlight.js/styles/dark.css"; // Import your chosen theme

const md = new MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (err) {
        console.error(err);
      }
    }
    return ""; // return empty string if no language is specified
  },
});

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
      Tags: {listTags(post)}
      <div
        className="post-content py-5 prose"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
