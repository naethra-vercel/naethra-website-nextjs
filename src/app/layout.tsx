import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AppShell } from "@/components/AppShell";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://naethra.com"),
  authors: [{ name: "Putech" }],
  openGraph: {
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
