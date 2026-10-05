import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getJavaContent } from "@/lib/wordpress";

export const Route = createFileRoute("/services/java-j2ee-applications")({
  loader: async () => getJavaContent(),
  component: JavaPage,
});

function JavaPage() {
  const service = Route.useLoaderData();
  return <ServiceDetailPage service={service} heroBanner />;
}
