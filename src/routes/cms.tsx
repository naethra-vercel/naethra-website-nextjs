import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-data";
import cmsHero from "@/assets/cms/hero.png";

const service = {
  ...serviceDetails.cms,
  heroImage: cmsHero,
};

export const Route = createFileRoute("/cms")({
  component: () => <ServiceDetailPage service={service} />,
});

