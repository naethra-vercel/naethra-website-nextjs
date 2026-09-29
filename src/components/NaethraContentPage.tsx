import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import SiteFooter from "@/components/SiteFooter";
import AnimatedCtaButton from "@/components/AnimatedCtaButton";

const mobileItems = [["Flutter", "/flutter-app-development-company"]] as const;
const serviceItems = [
  ["Content Management System", "/cms"],
  ["Custom Web Publishing", "/services/custom-web-publishing"],
  ["Dot Net Application", "/services/dot-net-application"],
  ["AWS & Cloud Support", "/services/aws-cloud-support"],
] as const;
const aboutItems = [["Blog", "/blogs"]] as const;

export function NaethraContentHeader() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
          <div className="content-page-nav-dropdown">
            <a href="/about" aria-haspopup="true">
              About Us <ChevronDown size={13} aria-hidden="true" />
            </a>
            <div className="content-page-nav-menu">
              {aboutItems.map(([label, href]) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
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
              if (label === "About Us") {
                return (
                  <div className="content-page-mobile-group" key={label}>
                    <a href={href} onClick={() => setOpen(false)}>
                      {label}
                      <ArrowUpRight size={16} />
                    </a>
                    <div className="content-page-mobile-submenu">
                      {aboutItems.map(([itemLabel, itemHref]) => (
                        <a key={itemLabel} href={itemHref} onClick={() => setOpen(false)}>
                          {itemLabel}
                          <ArrowUpRight size={15} />
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }
              if (label === "Services") {
                return (
                  <div className="content-page-mobile-group" key={label}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((value) => !value)}
                      aria-expanded={servicesOpen}
                    >
                      {label} <span>{servicesOpen ? "-" : "+"}</span>
                    </button>
                    {servicesOpen && (
                      <div className="content-page-mobile-submenu">
                        {serviceItems.map(([itemLabel, itemHref]) => (
                          <a key={itemLabel} href={itemHref} onClick={() => setOpen(false)}>
                            {itemLabel}
                            <ArrowUpRight size={15} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
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
  footerVariant?: "simple" | "detailed";
  className?: string;
  heroBannerImage?: string;
};

export default function NaethraContentPage({
  eyebrow,
  title,
  intro,
  children,
  compact = false,
  footerVariant = "detailed",
  className = "",
  heroBannerImage,
}: ContentPageProps) {
  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-8% 0px", threshold: 0.12 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    return () => revealObserver.disconnect();
  }, []);

  return (
    <main className={['content-page', className].filter(Boolean).join(' ')}>
      <NaethraContentHeader />
      {heroBannerImage ? (
        <section className="content-page-hero content-page-hero-banner" data-reveal="hero">
          <h1 className="sr-only">{title}</h1>
          <img className="content-page-hero-banner-img" src={heroBannerImage} alt="" />
        </section>
      ) : (
        <section
          className={`content-page-hero ${compact ? "content-page-hero-compact" : ""}`}
          data-reveal="hero"
        >
          <div className="site-container">
            <p className="content-page-eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            {intro && <p className="content-page-intro">{intro}</p>}
          </div>
        </section>
      )}
      <article className="content-page-body site-container" data-reveal="fade-up">
        {children}
      </article>
      <SiteFooter className="content-page-footer" variant={footerVariant} data-reveal="fade-up" />
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
