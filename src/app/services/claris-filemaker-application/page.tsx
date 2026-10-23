import type { Metadata } from "next";

import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getFileMakerContent } from "@/lib/wordpress";

export const revalidate = 60;

const FILEMAKER_DESCRIPTION =
  "Naethra is a FileMaker development company in India offering Claris FileMaker Pro, Go, WebDirect, Custom Web Publishing, integration, migration, and 24×7 support.";

export const metadata: Metadata = {
  title: "FileMaker Development Company India | Claris FileMaker Experts | Naethra",
  description: FILEMAKER_DESCRIPTION,
  keywords: [
    "FileMaker development company India",
    "Claris FileMaker developers India",
    "FileMaker Pro development",
    "FileMaker WebDirect",
    "FileMaker Custom Web Publishing",
    "Naethra Technologies",
  ],
  alternates: { canonical: "/services/claris-filemaker-application" },
  openGraph: {
    title: "FileMaker Development Company India | Naethra Technologies",
    description:
      "Certified FileMaker development, integrations, hosting, and support from Naethra Technologies in Chennai, India.",
    url: "/services/claris-filemaker-application",
    type: "website",
  },
};

export default async function Page() {
  const service = await getFileMakerContent();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "FileMaker Development Company India",
    serviceType: "Claris FileMaker application development",
    provider: {
      "@type": "Organization",
      "@id": "https://naethra.com/#organization",
      name: "Naethra Technologies",
    },
    areaServed: "IN",
    url: "https://naethra.com/services/claris-filemaker-application",
    description: FILEMAKER_DESCRIPTION,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailPage service={service} heroBanner />
    </>
  );
}
