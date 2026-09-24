import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

import SiteFooter from "@/components/SiteFooter";
import AnimatedCtaButton from "@/components/AnimatedCtaButton";

const mobileItems = [["Flutter", "/flutter-app-development-company"]] as const;
const serviceItems = [
  ["Content Management System", "/cms"],
  ["Custom Web Publishing", "/services/custom-web-publishing"],
  ["Dot Net Application", "/services/dot-net-application"],
  ["AWS & Cloud Support", "/services/aws-cloud-support"],
] as const;

export function NaethraContentHeader() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="content-page-header">
      <div className="site-container content-page-header-inner">
        <a href="/" className="brand-mark" aria-label="Naethra Technologies home">
          <img
            src="/logo.png"
            alt="Naethra Technologies"
            className="brand-logo"
            width={220}
            height={49}
          />
        </a>
        <nav className="content-page-nav" aria-label="Primary navigation">
          <div className="content-page-nav-dropdown">
            <a href="/mobile-app" aria-haspopup="true">
              Mobile <ChevronDown size={13} aria-hidden="true" />
            </a>
            <div className="content-page-nav-menu">
              {mobileItems.map(([label, href]) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <a href="/web-app">Web App</a>
          <a href="/portfolio">Portfolio</a>
          <div className="content-page-nav-dropdown">
            <a href="/services" aria-haspopup="true">
              Services <ChevronDown size={13} aria-hidden="true" />
            </a>
            <div className="content-page-nav-menu">
              {serviceItems.map(([label, href]) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <a href="/services/claris-filemaker-application">FileMaker</a>
          <a href="/about">About Us</a>
          <a href="/contact-us">Contact Us</a>
        </nav>
        <AnimatedCtaButton href="/30-mins-meeting" className="content-page-cta">
          30 mins meeting
        </AnimatedCtaButton>
        <button
          className="content-page-menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="content-page-mobile-nav" aria-label="Mobile navigation">
          <div className="content-page-mobile-group">
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-expanded={mobileOpen}
            >
              Mobile <span>{mobileOpen ? "-" : "+"}</span>
            </button>
            {mobileOpen && (
              <div className="content-page-mobile-submenu">
                {mobileItems.map(([label, href]) => (
                  <a key={label} href={href} onClick={() => setOpen(false)}>
                    {label}
                    <ArrowUpRight size={15} />
                  </a>
                ))}
              </div>
            )}
          </div>
          {["Web App", "Portfolio", "Services", "FileMaker", "About Us", "Contact Us"].map(
            (label) => {
              const href =
                label === "Web App"
                  ? "/web-app"
                  : label === "Portfolio"
                    ? "/portfolio"
                    : label === "Services"
                      ? "/services"
                      : label === "FileMaker"
                        ? "/services/claris-filemaker-application"
                        : label === "About Us"
                          ? "/about"
                          : "/contact-us";
              return (
                <a href={href} key={label} onClick={() => setOpen(false)}>
                  {label}
                  <ArrowUpRight size={16} />
                </a>
              );
            },
          )}
        </nav>
      )}
    </header>
  );
}

type ContentPageProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  compact?: boolean;
};

export default function NaethraContentPage({
  eyebrow,
  title,
  intro,
  children,
  compact = false,
}: ContentPageProps) {
  return (
    <main className="content-page">
      <NaethraContentHeader />
      <section className={`content-page-hero ${compact ? "content-page-hero-compact" : ""}`}>
        <div className="site-container">
          <p className="content-page-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {intro && <p className="content-page-intro">{intro}</p>}
        </div>
      </section>
      <article className="content-page-body site-container">{children}</article>
      <SiteFooter className="content-page-footer" />
    </main>
  );
}

export function ContentSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="content-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
