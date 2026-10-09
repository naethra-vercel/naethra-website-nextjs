import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getFileMakerContent } from "@/lib/wordpress";

export const revalidate = 60;

export default async function Page() {
  const service = await getFileMakerContent();
  return <ServiceDetailPage service={service} heroBanner />;
}
