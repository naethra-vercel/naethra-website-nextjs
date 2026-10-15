import HomePage from "@/components/pages/HomePage";
import { RouteLoading } from "@/components/RouteLoading";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { getPrimaryMenu } from "@/lib/navigation";
import { getHomeContent, getPortfolio, getPosts } from "@/lib/wordpress";

export default function HomeRoute() {
  useDocumentTitle(
    "Naethra Technologies | Comprehensive Full Stack Development Outsourcing",
  );

  const state = useAsyncResource(async () => {
    const [blogPosts, home, menu, portfolioProjects] = await Promise.all([
      getPosts(1, 4).catch(() => []),
      getHomeContent(),
      getPrimaryMenu(),
      getPortfolio(5).catch(() => []),
    ]);
    return {
      blogPosts,
      home,
      menu,
      recentProjects: portfolioProjects.slice(0, 5),
    };
  }, []);

  if (state.status === "loading") return <RouteLoading />;
  if (state.status === "error" || !state.data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p>Unable to load the home page right now.</p>
      </div>
    );
  }

  return <HomePage {...state.data} />;
}
