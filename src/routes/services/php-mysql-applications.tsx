import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getPhpMysqlContent } from "@/lib/wordpress";

export const Route = createFileRoute("/services/php-mysql-applications")({
  loader: async () => getPhpMysqlContent(),
  component: PhpMysqlPage,
});

function PhpMysqlPage() {
  const service = Route.useLoaderData();
  return <ServiceDetailPage service={service} heroBanner />;
}
