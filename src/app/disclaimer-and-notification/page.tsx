import { notFound } from "next/navigation";

import NaethraContentPage from "@/components/NaethraContentPage";
import { getPageBySlug } from "@/lib/wordpress";

export const revalidate = 60;

export default async function Page() {
  const page = await getPageBySlug("disclaimer-and-notification");
  if (!page) notFound();

  return (
    <NaethraContentPage eyebrow="Important information" title={page.title} compact>
      <div
        className="content-page-html"
        dangerouslySetInnerHTML={{ __html: page.contentHtml }}
      />
    </NaethraContentPage>
  );
}
