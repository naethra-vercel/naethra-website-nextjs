import ServicesIndexPage from "@/components/pages/ServicesIndexPage";
import { getServicesPageContent } from "@/lib/wordpress";

export const revalidate = 60;

export default async function Page() {
  const content = await getServicesPageContent();
  return <ServicesIndexPage content={content} />;
}
