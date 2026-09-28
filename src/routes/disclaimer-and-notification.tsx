import { createFileRoute, notFound } from "@tanstack/react-router";

import NaethraContentPage from "@/components/NaethraContentPage";
import { getPageBySlug } from "@/lib/wordpress";

export const Route = createFileRoute("/disclaimer-and-notification")({
  loader: async () => {
    const page = await getPageBySlug("disclaimer-and-notification");
    if (!page) throw notFound();
    return page;
  },
  component: DisclaimerPage,
});

function DisclaimerPage() {
  const page = Route.useLoaderData();

  return (
    <NaethraContentPage eyebrow="Important information" title={page.title} compact>
      <div
        className="content-page-html"
        dangerouslySetInnerHTML={{ __html: page.contentHtml }}
      />
    </NaethraContentPage>
  );
}
