import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-data";
import filemakerHero from "@/assets/filemaker/heror.png";

const service = {
  ...serviceDetails["claris-filemaker-application"],
  heroImage: filemakerHero,
};

export const Route = createFileRoute("/services/claris-filemaker-application")({
  component: () => <ServiceDetailPage service={service} />,
});
