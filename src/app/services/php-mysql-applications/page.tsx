import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getPhpMysqlContent } from "@/lib/wordpress";

export const revalidate = 60;

export default async function Page() {
  const service = await getPhpMysqlContent();
  return <ServiceDetailPage service={service} heroBanner />;
}
