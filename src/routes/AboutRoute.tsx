import AboutPage from "@/components/pages/AboutPage";
import { RouteLoading } from "@/components/RouteLoading";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { getAboutContent } from "@/lib/wordpress";

export default function AboutRoute() {
  useDocumentTitle("About | Naethra Technologies");
  const state = useAsyncResource(() => getAboutContent(), []);

  if (state.status === "loading") return <RouteLoading />;
  if (state.status === "error" || !state.data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p>Unable to load about content right now.</p>
      </div>
    );
  }

  return <AboutPage about={state.data} />;
}
