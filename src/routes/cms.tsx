import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-data";

export const Route = createFileRoute("/cms")({
  component: () => <ServiceDetailPage service={serviceDetails["cms"]} />,
});
