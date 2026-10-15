import ServicesIndexPage from "@/components/pages/ServicesIndexPage";
import { RouteLoading } from "@/components/RouteLoading";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { getServicesPageContent } from "@/lib/wordpress";

export default function ServicesRoute() {
  useDocumentTitle("Services | Naethra Technologies");
  const state = useAsyncResource(() => getServicesPageContent(), []);

  if (state.status === "loading") return <RouteLoading />;
  if (state.status === "error" || !state.data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p>Unable to load services right now.</p>
      </div>
    );
  }

  return <ServicesIndexPage content={state.data} />;
}
