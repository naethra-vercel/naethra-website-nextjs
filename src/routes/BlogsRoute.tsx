import BlogsIndexPage from "@/components/pages/BlogsIndexPage";
import { RouteLoading } from "@/components/RouteLoading";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { getPosts } from "@/lib/wordpress";

export default function BlogsRoute() {
  useDocumentTitle("Blogs | Naethra Technologies");
  const state = useAsyncResource(() => getPosts(1, 20), []);

  if (state.status === "loading") return <RouteLoading />;
  if (state.status === "error" || !state.data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p>Unable to load articles right now.</p>
      </div>
    );
  }

  return <BlogsIndexPage blogPosts={state.data} />;
}
