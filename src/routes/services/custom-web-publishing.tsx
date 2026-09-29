import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getCustomWebPublishingContent } from "@/lib/wordpress";

export const Route = createFileRoute("/services/custom-web-publishing")({
  loader: async () => getCustomWebPublishingContent(),
  component: CustomWebPublishingPage,
});

function CustomWebPublishingPage() {
  const service = Route.useLoaderData();
  return <ServiceDetailPage service={service} />;
}
