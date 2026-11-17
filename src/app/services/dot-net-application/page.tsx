import ServiceDetailPage from "@/components/ServiceDetailPage";
import { serviceHeroImages } from "@/lib/service-hero-images";
import { getDotNetContent } from "@/lib/wordpress";

export const revalidate = 60;

export default async function Page() {
  const service = await getDotNetContent();
  return (
    <ServiceDetailPage
      service={{ ...service, heroImage: serviceHeroImages.dotNet }}
      heroBanner
    />
  );
}
