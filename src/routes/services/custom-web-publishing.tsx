import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-data";

export const Route = createFileRoute("/services/custom-web-publishing")({
  component: () => <ServiceDetailPage service={serviceDetails["custom-web-publishing"]} />,
});
