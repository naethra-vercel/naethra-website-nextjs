"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { FakeJobsDisclaimerModal } from "@/components/FakeJobsDisclaimerModal";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";

const SiteFooter = dynamic(() => import("@/components/SiteFooter"));

const JarvisAIAssistant = dynamic(
  () =>
    import("@/components/JarvisAIAssistant").then((mod) => mod.JarvisAIAssistant),
  { ssr: false },
);

const HIDE_FOOTER_TOP_CONTACT = new Set(["/contact-us", "/30-mins-meeting"]);

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideTopContact = HIDE_FOOTER_TOP_CONTACT.has(pathname);

  return (
    <SmoothScroll>
      <SpotlightCursor />
      {children}
      {pathname !== "/" && <SiteFooter hideTopContact={hideTopContact} />}
      <JarvisAIAssistant />
      {pathname === "/" && <FakeJobsDisclaimerModal />}
      <ScrollToTopButton />
    </SmoothScroll>
  );
}
