import { createFileRoute } from "@tanstack/react-router";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getFileMakerContent } from "@/lib/wordpress";

export const Route = createFileRoute("/services/claris-filemaker-application")({
  loader: async () => getFileMakerContent(),
  component: FileMakerPage,
});

function FileMakerPage() {
  const service = Route.useLoaderData();
  return <ServiceDetailPage service={service} />;
}
