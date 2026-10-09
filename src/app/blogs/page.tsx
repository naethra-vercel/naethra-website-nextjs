import BlogsIndexPage from "@/components/pages/BlogsIndexPage";
import { getPosts } from "@/lib/wordpress";

export const revalidate = 60;

export default async function Page() {
  const blogPosts = await getPosts(1, 20);
  return <BlogsIndexPage blogPosts={blogPosts} />;
}
