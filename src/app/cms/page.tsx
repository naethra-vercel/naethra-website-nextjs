import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getCmsContent } from "@/lib/wordpress";

export const revalidate = 60;

export default async function Page() {
  const service = await getCmsContent();
  return <ServiceDetailPage service={service} heroBanner />;
}
