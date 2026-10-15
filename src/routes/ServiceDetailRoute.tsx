import { useEffect } from "react";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { RouteLoading } from "@/components/RouteLoading";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { useDocumentTitle } from "@/hooks/use-document-title";
import type { ServiceDetail } from "@/lib/service-data";

type ServiceDetailRouteProps = {
  title: string;
  loader: () => Promise<ServiceDetail>;
  jsonLd?: Record<string, unknown>;
};

export default function ServiceDetailRoute({
  title,
  loader,
  jsonLd,
}: ServiceDetailRouteProps) {
  useDocumentTitle(title);
  const state = useAsyncResource(loader, []);

  useEffect(() => {
    if (!jsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "service-jsonld";
    script.text = JSON.stringify(jsonLd);
    document.getElementById("service-jsonld")?.remove();
    document.head.appendChild(script);
    return () => {
      document.getElementById("service-jsonld")?.remove();
    };
  }, [jsonLd]);

  if (state.status === "loading") return <RouteLoading />;
  if (state.status === "error" || !state.data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p>Unable to load this service page right now.</p>
      </div>
    );
  }

  return <ServiceDetailPage service={state.data} heroBanner />;
}
