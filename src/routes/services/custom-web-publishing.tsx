import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-data";
import customWebPublishingHero from "@/assets/custom-web-publish/hero.png";

const service = {
  ...serviceDetails["custom-web-publishing"],
  heroImage: customWebPublishingHero,
};

export const Route = createFileRoute("/services/custom-web-publishing")({
  component: () => <ServiceDetailPage service={service} />,
});

