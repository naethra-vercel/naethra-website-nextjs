import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getAwsContent } from "@/lib/wordpress";

export const revalidate = 60;

export default async function Page() {
  const service = await getAwsContent();
  return <ServiceDetailPage service={service} heroBanner />;
}
