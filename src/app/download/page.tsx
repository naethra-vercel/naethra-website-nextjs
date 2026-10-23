import type { Metadata } from "next";

import DownloadsPage from "@/components/pages/DownloadsPage";
import { getDownloads } from "@/lib/downloads";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Downloads | Naethra Technologies",
  description: "Download project profiles and technical resources from Naethra Technologies.",
  alternates: { canonical: "/download/" },
};

export default async function Page() {
  const downloads = await getDownloads();
  return <DownloadsPage downloads={downloads} />;
}
