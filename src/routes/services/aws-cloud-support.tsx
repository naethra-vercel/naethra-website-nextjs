import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getAwsContent } from "@/lib/wordpress";

export const Route = createFileRoute("/services/aws-cloud-support")({
  loader: async () => getAwsContent(),
  component: AwsPage,
});

function AwsPage() {
  const service = Route.useLoaderData();
  return <ServiceDetailPage service={service} heroBanner />;
}
