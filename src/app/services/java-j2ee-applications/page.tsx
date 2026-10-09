import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getJavaContent } from "@/lib/wordpress";

export const revalidate = 60;

export default async function Page() {
  const service = await getJavaContent();
  return <ServiceDetailPage service={service} heroBanner />;
}
