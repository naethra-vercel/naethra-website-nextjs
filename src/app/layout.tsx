import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppShell } from "@/components/AppShell";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://naethra.com"),
  title: {
    default: "Naethra Technologies | Full Stack Development Outsourcing",
    template: "%s | Naethra Technologies",
  },
  description:
    "Naethra Technologies — FileMaker, mobile, Flutter, and web application development company in India.",
  authors: [{ name: "Naethra Technologies", url: "https://naethra.com" }],
  creator: "Naethra Technologies",
  publisher: "Naethra Technologies",
  applicationName: "Naethra Technologies",
  openGraph: {
    type: "website",
    siteName: "Naethra Technologies",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@naethratech",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://naethra.com" />
        <link rel="dns-prefetch" href="https://automation-saas-ns-next.vercel.app" />
        <link rel="dns-prefetch" href="https://d8j0ntlcm91z4.cloudfront.net" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
        <OrganizationJsonLd />
      </head>
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
