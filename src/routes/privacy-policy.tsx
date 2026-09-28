import { createFileRoute, notFound } from "@tanstack/react-router";

import NaethraContentPage from "@/components/NaethraContentPage";
import { getPageBySlug } from "@/lib/wordpress";

export const Route = createFileRoute("/privacy-policy")({
  loader: async () => {
    const page = await getPageBySlug("privacy-policy");
    if (!page) throw notFound();
    return page;
  },
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const page = Route.useLoaderData();

  return (
    <NaethraContentPage eyebrow="Privacy and data" title={page.title} compact>
      <div
        className="content-page-html"
        dangerouslySetInnerHTML={{ __html: page.contentHtml }}
      />
    </NaethraContentPage>
  );
}
