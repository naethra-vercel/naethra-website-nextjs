"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { FakeJobsDisclaimerModal } from "@/components/FakeJobsDisclaimerModal";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import SiteFooter from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";

const JarvisAIAssistant = dynamic(
  () =>
    import("@/components/JarvisAIAssistant").then((mod) => mod.JarvisAIAssistant),
  { ssr: false },
);

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SmoothScroll>
      <SpotlightCursor />
      {children}
      {pathname !== "/" && <SiteFooter />}
      <JarvisAIAssistant />
      {pathname === "/" && <FakeJobsDisclaimerModal />}
      <ScrollToTopButton />
    </SmoothScroll>
  );
}
