import NaethraContentPage from "@/components/NaethraContentPage";
import { RouteLoading } from "@/components/RouteLoading";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { useDocumentTitle } from "@/hooks/use-document-title";
import { getPageBySlug } from "@/lib/wordpress";
import NotFoundPage from "@/routes/NotFoundPage";

type LegalPageRouteProps = {
  slug: string;
  eyebrow: string;
  titleFallback: string;
};

export default function LegalPageRoute({
  slug,
  eyebrow,
  titleFallback,
}: LegalPageRouteProps) {
  const state = useAsyncResource(() => getPageBySlug(slug), [slug]);
  useDocumentTitle(
    state.status === "success" && state.data
      ? `${state.data.title} | Naethra Technologies`
      : `${titleFallback} | Naethra Technologies`,
  );

  if (state.status === "loading") return <RouteLoading />;
  if (state.status === "error") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p>Unable to load this page right now.</p>
      </div>
    );
  }
  if (!state.data) return <NotFoundPage />;

  return (
    <NaethraContentPage eyebrow={eyebrow} title={state.data.title} compact>
      <div
        className="content-page-html"
        dangerouslySetInnerHTML={{ __html: state.data.contentHtml }}
      />
    </NaethraContentPage>
  );
}
