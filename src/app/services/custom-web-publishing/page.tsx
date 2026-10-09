import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getCustomWebPublishingContent } from "@/lib/wordpress";

export const revalidate = 60;

export default async function Page() {
  const service = await getCustomWebPublishingContent();
  return <ServiceDetailPage service={service} heroBanner />;
}
