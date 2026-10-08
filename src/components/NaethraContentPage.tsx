import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import AnimatedCtaButton from "@/components/AnimatedCtaButton";
import { splitPrimaryMenu, usePrimaryMenu } from "@/lib/navigation";

export function NaethraContentHeader() {
  const menu = usePrimaryMenu();
  const { navigationItems, meetingItem } = splitPrimaryMenu(menu);
  const [open, setOpen] = useState(false);
  const [openMobileMenuId, setOpenMobileMenuId] = useState<number | null>(null);

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
          {navigationItems.map((item) =>
            item.children.length > 0 ? (
              <div className="content-page-nav-dropdown" key={item.id}>
                <a
                  href={item.href}
                  target={item.target || undefined}
                  rel={item.target === "_blank" ? "noreferrer" : undefined}
                  aria-haspopup="true"
                >
                  {item.label} <ChevronDown size={13} aria-hidden="true" />
                </a>
                <div className="content-page-nav-menu">
                  {item.children.map((child) => (
                    <a
                      key={child.id}
                      href={child.href}
                      target={child.target || undefined}
                      rel={child.target === "_blank" ? "noreferrer" : undefined}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item.id}
                href={item.href}
                target={item.target || undefined}
                rel={item.target === "_blank" ? "noreferrer" : undefined}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>
        <AnimatedCtaButton href={meetingItem.href} className="content-page-cta">
          {meetingItem.label}
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
          {navigationItems.map((item) =>
            item.children.length > 0 ? (
              <div className="content-page-mobile-group" key={item.id}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileMenuId((openId) => (openId === item.id ? null : item.id))
                  }
                  aria-expanded={openMobileMenuId === item.id}
                >
                  {item.label} <span>{openMobileMenuId === item.id ? "-" : "+"}</span>
                </button>
                {openMobileMenuId === item.id && (
                  <div className="content-page-mobile-submenu">
                    <a href={item.href} onClick={() => setOpen(false)}>
                      View {item.label}
                      <ArrowUpRight size={15} />
                    </a>
                    {item.children.map((child) => (
                      <a key={child.id} href={child.href} onClick={() => setOpen(false)}>
                        {child.label}
                        <ArrowUpRight size={15} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a href={item.href} key={item.id} onClick={() => setOpen(false)}>
                {item.label}
                <ArrowUpRight size={16} />
              </a>
            ),
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
  className?: string;
  heroBannerImage?: string;
};

export default function NaethraContentPage({
  eyebrow,
  title,
  intro,
  children,
  compact = false,
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
