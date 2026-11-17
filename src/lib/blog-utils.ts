import type { WpBlogPost } from "@/lib/wordpress";

export function estimateReadTime(
  post: Pick<WpBlogPost, "title" | "excerpt" | "contentHtml"> & { readTime?: string },
): string {
  if (post.readTime) return post.readTime;

  const text = `${post.title} ${post.excerpt} ${post.contentHtml}`
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}
