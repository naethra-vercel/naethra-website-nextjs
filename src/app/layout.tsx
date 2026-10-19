import type { Metadata } from "next";
import { Arimo, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { AppShell } from "@/components/AppShell";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { WORDPRESS_ORIGIN } from "@/lib/wordpress-config";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arimo",
  display: "swap",
});

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
    images: [
      {
        url: "/logo.png",
        width: 2169,
        height: 725,
        alt: "Naethra Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@naethratech",
    images: ["/logo.png"],
  },

  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${arimo.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href={WORDPRESS_ORIGIN} />
        <link rel="dns-prefetch" href="https://automation-saas-ns-next.vercel.app" />
        <link rel="dns-prefetch" href="https://d8j0ntlcm91z4.cloudfront.net" />
        <OrganizationJsonLd />
      </head>
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
