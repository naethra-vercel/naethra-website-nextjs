import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { serviceDetails } from "@/lib/service-data";
import dotNetHero from "@/assets/dot-net/hero.png";

const service = {
  ...serviceDetails["dot-net-application"],
  heroImage: dotNetHero,
};

export const Route = createFileRoute("/services/dot-net-application")({
  component: () => <ServiceDetailPage service={service} />,
});

