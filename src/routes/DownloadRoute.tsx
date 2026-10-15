import DownloadsPage from "@/components/pages/DownloadsPage";
import { RouteLoading } from "@/components/RouteLoading";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { getDownloads } from "@/lib/downloads";

export default function DownloadRoute() {
  useDocumentTitle("Downloads | Naethra Technologies");
  const state = useAsyncResource(() => getDownloads(), []);

  if (state.status === "loading") return <RouteLoading />;
  if (state.status === "error" || !state.data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p>Unable to load downloads right now.</p>
      </div>
    );
  }

  return <DownloadsPage downloads={state.data} />;
}
