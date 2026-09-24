import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-data";

export const Route = createFileRoute("/services/aws-cloud-support")({
  component: () => <ServiceDetailPage service={serviceDetails["aws-cloud-support"]} />,
});
