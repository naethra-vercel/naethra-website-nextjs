import { createFileRoute, notFound } from "@tanstack/react-router";

import NaethraContentPage from "@/components/NaethraContentPage";
import { getPageBySlug } from "@/lib/wordpress";

export const Route = createFileRoute("/terms-and-conditions")({
  loader: async () => {
    const page = await getPageBySlug("terms-and-conditions");
    if (!page) throw notFound();
    return page;
  },
  component: TermsPage,
});

function TermsPage() {
  const page = Route.useLoaderData();

  return (
    <NaethraContentPage eyebrow="Agreement and support" title={page.title} compact>
      <div
        className="content-page-html"
        dangerouslySetInnerHTML={{ __html: page.contentHtml }}
      />
    </NaethraContentPage>
  );
}
