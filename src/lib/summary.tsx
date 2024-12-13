export function summary(post: Post) {
  if (post.summary) {
    return post.summary;
  } else {
    return "No summary available";
  }
}
