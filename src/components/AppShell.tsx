import { lazy, Suspense, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { FakeJobsDisclaimerModal } from "@/components/FakeJobsDisclaimerModal";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import SiteFooter from "@/components/SiteFooter";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";

const JarvisAIAssistant = lazy(() =>
  import("@/components/JarvisAIAssistant").then((mod) => ({
    default: mod.JarvisAIAssistant,
  })),
);

const HIDE_FOOTER_TOP_CONTACT = new Set(["/contact-us", "/30-mins-meeting"]);

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const hideTopContact = HIDE_FOOTER_TOP_CONTACT.has(pathname);

  return (
    <SmoothScroll>
      <SpotlightCursor />
      {children}
      {pathname !== "/" && <SiteFooter hideTopContact={hideTopContact} />}
      <Suspense fallback={null}>
        <JarvisAIAssistant />
      </Suspense>
      {pathname === "/" && <FakeJobsDisclaimerModal />}
      <ScrollToTopButton />
    </SmoothScroll>
  );
}
