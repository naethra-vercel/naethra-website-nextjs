import AboutPage from "@/components/pages/AboutPage";
import { getAboutContent } from "@/lib/wordpress";

export const revalidate = 60;

export default async function Page() {
  const about = await getAboutContent();
  return <AboutPage about={about} />;
}
