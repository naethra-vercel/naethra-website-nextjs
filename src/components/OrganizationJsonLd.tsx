import { useEffect } from "react";

import { ORGANIZATION_SAME_AS } from "@/lib/social";

/** Brand entity markup — reinforces “Naethra” spelling + official socials for search. */
export default function OrganizationJsonLd() {
  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://naethra.com/#organization",
      name: "Naethra Technologies",
      legalName: "Naethra Technologies Pvt Ltd",
      alternateName: ["Naethra", "Naethra Technologies Pvt. Ltd.", "NTPL"],
      url: "https://naethra.com",
      logo: "https://naethra.com/logo.png",
      email: "info@naethra.com",
      telephone: "+91-44-3500-3204",
      foundingDate: "2014",
      address: {
        "@type": "PostalAddress",
        streetAddress: "37, Viswanathapuram Main Rd, Azeez Nagar, Kodambakkam",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "600024",
        addressCountry: "IN",
      },
      areaServed: ["IN", "US", "AU", "GB", "EU"],
      sameAs: ORGANIZATION_SAME_AS,
      knowsAbout: [
        "FileMaker development company India",
        "Claris FileMaker development",
        "Mobile app development",
        "Flutter development",
        "Web application development",
        "Full stack development outsourcing",
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "organization-jsonld";
    script.text = JSON.stringify(data);

    const existing = document.getElementById("organization-jsonld");
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      document.getElementById("organization-jsonld")?.remove();
    };
  }, []);

  return null;
}
