import type { ReactNode } from "react";

import SectionEyebrow from "@/components/SectionEyebrow";
import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";

type AboutSubpageLayoutProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export default function AboutSubpageLayout({
  eyebrow,
  title,
  intro,
  children,
}: AboutSubpageLayoutProps) {
  return (
    <main className="about-subpage">
      <NaethraContentHeader />

      <section className="about-subpage-hero">
        <div className="site-container about-subpage-hero-inner">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>

      <div className="about-subpage-content site-container">{children}</div>

      <SiteFooter className="about-subpage-footer" />
    </main>
  );
}
