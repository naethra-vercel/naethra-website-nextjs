import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-data";

export const Route = createFileRoute("/services/claris-filemaker-application")({
  component: () => <ServiceDetailPage service={serviceDetails["claris-filemaker-application"]} />,
});
