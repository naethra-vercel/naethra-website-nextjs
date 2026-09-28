import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-data";
import awsHero from "@/assets/aws/hero.png";

const service = {
  ...serviceDetails["aws-cloud-support"],
  heroImage: awsHero,
};

export const Route = createFileRoute("/services/aws-cloud-support")({
  component: () => <ServiceDetailPage service={service} />,
});

