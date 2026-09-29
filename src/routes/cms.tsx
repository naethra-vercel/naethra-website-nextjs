import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getCmsContent } from "@/lib/wordpress";

export const Route = createFileRoute("/cms")({
  loader: async () => getCmsContent(),
  component: CmsPage,
});

function CmsPage() {
  const service = Route.useLoaderData();
  return <ServiceDetailPage service={service} />;
}
