import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Check if data.tags is defined and is an array
    const formattedTags = Array.isArray(data.tags)
      ? data.tags.map((tag) => ` #${tag}`).join(" ")
      : ""; // Default to an empty string if tags are not defined

    return {
      slug,
      formattedTags,
      ...data,
      content,
    };
  });
}
