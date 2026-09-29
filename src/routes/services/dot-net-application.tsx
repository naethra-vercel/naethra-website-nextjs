import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getDotNetContent } from "@/lib/wordpress";

export const Route = createFileRoute("/services/dot-net-application")({
  loader: async () => getDotNetContent(),
  component: DotNetPage,
});

function DotNetPage() {
  const service = Route.useLoaderData();
  return <ServiceDetailPage service={service} heroBanner />;
}
