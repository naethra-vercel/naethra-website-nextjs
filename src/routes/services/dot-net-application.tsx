import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-data";

export const Route = createFileRoute("/services/dot-net-application")({
  component: () => <ServiceDetailPage service={serviceDetails["dot-net-application"]} />,
});
