import type { ReactNode } from "react";

import SectionEyebrow from "@/components/SectionEyebrow";
import SiteFooter from "@/components/SiteFooter";

type AboutSubpageLayoutProps = {
  eyebrow: string;
  title: string;
  intro: string;
  activePage: "specialty" | "services" | "team";
  children: ReactNode;
};

const pageLinks = [
  ["specialty", "Our Specialty", "/about/specialty"],
  ["services", "Our Services", "/about/services"],
  ["team", "Our Team", "/about/team"],
] as const;

export default function AboutSubpageLayout({
  eyebrow,
  title,
  intro,
  activePage,
  children,
}: AboutSubpageLayoutProps) {
  return (
    <main className="about-subpage">
      <header className="about-subpage-header">
        <div className="site-container about-subpage-nav">
          <a href="/" className="brand-mark" aria-label="Naethra Technologies home">
            <img
              src="/logo.png"
              alt="Naethra Technologies"
              className="brand-logo"
              width={220}
              height={49}
            />
          </a>
          <nav aria-label="About navigation" className="about-subpage-links">
            {pageLinks.map(([key, label, href]) => (
              <a key={key} href={href} className={activePage === key ? "is-active" : undefined}>
                {label}
              </a>
            ))}
          </nav>
          <a href="/#contact" className="button button-orange about-subpage-cta">
            Contact us
          </a>
        </div>
      </header>

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
