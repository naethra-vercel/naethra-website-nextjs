import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Cloud,
  Database,
  Globe2,
  Menu,
  MoveUpRight,
  Palette,
  Quote,
  Smartphone,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import founderImage from "@/assets/putech-founder.jpg";
import projectImage from "@/assets/putech-project.jpg";
import teamImage from "@/assets/putech-team.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Naethra Technologies | Comprehensive Full Stack Development Outsourcing" },
      {
        name: "description",
        content:
          "Naethra Technologies delivers full-stack web, mobile, cross-platform, UX/UI, FileMaker, and enterprise application development.",
      },
      {
        property: "og:title",
        content: "Naethra Technologies | Comprehensive Full Stack Development Outsourcing",
      },
      {
        property: "og:description",
        content:
          "Mastering web, mobile native, and cross-platform applications for ambitious businesses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const navItems = [
  ["Mobile", "#mobile"],
  ["Web App", "#web-app"],
  ["Portfolio", "#work"],
  ["Services", "#services"],
  ["FileMaker", "#filemaker"],
  ["About Us", "#about"],
  ["Contact Us", "#contact"],
];

const services = [
  [
    "01",
    "Web & enterprise applications",
    "Outsource web applications, enterprise systems, UX/UI planning, and usability testing to an experienced delivery team.",
    Globe2,
  ],
  [
    "02",
    "Cross-platform mobile apps",
    "Build mobile applications with Ionic Framework, Cordova, Flutter, or the native approach your product requires.",
    Smartphone,
  ],
  [
    "03",
    "User interface & graphic design",
    "Responsive, mobile-first design concepts that make your product easier and more enjoyable to use.",
    Palette,
  ],
  [
    "04",
    "Claris FileMaker development",
    "FileMaker integration, database development, WebDirect, Custom Web Publishing, and custom application development.",
    Database,
  ],
  [
    "05",
    "Content management systems",
    "Powerful CMS solutions with PHP, WordPress, Joomla, and Magento for teams that need to publish and grow.",
    Cloud,
  ],
  [
    "06",
    "Zoho & cloud applications",
    "Quickly build and deploy cloud applications with Zoho Creator, plus maintenance and support for existing systems.",
    Users,
  ],
] as const;

const process = [
  [
    "01",
    "Understand",
    "We listen first, map the real problem, and create a clear plan your team can believe in.",
  ],
  [
    "02",
    "Make",
    "Small, senior teams turn the plan into a useful product with visible progress at every step.",
  ],
  [
    "03",
    "Improve",
    "After launch, we stay close to the product and help it become more valuable over time.",
  ],
];

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" className="brand-mark" aria-label="Naethra Technologies home">
      <img
        src="/logo.png"
        alt="Naethra Technologies"
        className={`brand-logo ${inverse ? "brand-logo-inverse" : ""}`}
        width={220}
        height={49}
      />
    </a>
  );
}

function Eyebrow({ children, inverse = false }: { children: string; inverse?: boolean }) {
  return (
    <div className={`eyebrow ${inverse ? "eyebrow-inverse" : ""}`}>
      <span />
      {children}
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");
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
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main id="top" className="site-page">
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="site-container header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="button button-orange header-cta">
            30 mins meeting <ArrowUpRight size={16} />
          </a>
          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
            <a href="#contact" className="button button-orange" onClick={() => setMenuOpen(false)}>
              30 mins meeting <ArrowRight size={16} />
            </a>
          </nav>
        )}
      </header>

      <section className="hero-section">
        <div className="site-container hero-layout">
          <div className="hero-copy" data-reveal="hero">
            <Eyebrow>Naethra Technologies · Full-stack development outsourcing</Eyebrow>
            <h1>
              Comprehensive full-stack <em>development outsourcing.</em>
            </h1>
            <p>
              Mastering web, mobile native, and cross-platform applications with the experience to
              build, improve, and support the software your business depends on.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="button button-orange">
                Schedule a 30-minute meeting <ArrowUpRight size={17} />
              </a>
              <a href="#work" className="text-link">
                Explore our services <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="hero-visual" data-reveal="image">
            <div className="hero-image-frame">
              <img
                src={teamImage}
                alt="Naethra team collaborating on a digital product"
                width={1408}
                height={1008}
              />
              <div className="hero-image-glow" />
            </div>
            <div className="hero-note hero-note-top">
              <Sparkles size={16} />
              <span>Ideas into systems</span>
            </div>
            <div className="hero-note hero-note-bottom">
              <span className="status-dot" />
              <span>Shipping with intent</span>
              <ArrowUpRight size={15} />
            </div>
          </div>
        </div>
        <div className="hero-bottom site-container" data-reveal="fade-up">
          <span>Web · Mobile · UX/UI · FileMaker · Enterprise applications</span>
          <span className="hero-scroll">
            <ChevronDown size={16} /> Scroll to explore
          </span>
        </div>
      </section>

      <section className="trust-strip">
        <div className="site-container trust-grid">
          <div>
            <strong>
              20<span>+</span>
            </strong>
            <span>years of experience</span>
          </div>
          <div>
            <strong>
              15<span>+</span>
            </strong>
            <span>technology capabilities</span>
          </div>
          <div>
            <strong>
              100<span>+</span>
            </strong>
            <span>projects delivered</span>
          </div>
          <div>
            <strong>
              24<span>/7</span>
            </strong>
            <span>long-term support</span>
          </div>
        </div>
      </section>

      <section id="services" className="section section-services">
        <div className="site-container">
          <div className="section-heading split-heading" data-reveal="fade-up">
            <div>
              <Eyebrow>Our major software development services</Eyebrow>
              <h2>
                One capable team for every <em>digital need.</em>
              </h2>
            </div>
            <p>
              Tailored solutions for businesses that need dependable technology, a flexible delivery
              partner, and a product that keeps creating value after launch.
            </p>
          </div>
          <div className="services-grid">
            {services.map(([number, title, body, Icon], index) => (
              <article
                key={title}
                id={
                  title === "Cross-platform mobile apps"
                    ? "mobile"
                    : title === "Web & enterprise applications"
                      ? "web-app"
                      : title === "Claris FileMaker development"
                        ? "filemaker"
                        : undefined
                }
                className="service-card"
                data-reveal="fade-up"
                data-reveal-delay={String((index % 3) + 1)}
              >
                <div className="service-card-top">
                  <span>{number}</span>
                  <Icon size={22} strokeWidth={1.7} />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
                <ArrowUpRight className="service-arrow" size={19} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section process-section">
        <div className="site-container process-layout">
          <div data-reveal="fade-up">
            <Eyebrow inverse>Why Naethra Technologies</Eyebrow>
            <h2>
              You make real things. We make them <em>happen.</em>
            </h2>
            <p>
              Our experienced developers understand the latest web and mobile technologies, work
              around your needs, and stay with you through delivery, maintenance, and support.
            </p>
            <a href="#contact" className="button button-light">
              Schedule a 30-minute meeting <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="process-list">
            {process.map(([number, title], index) => (
              <div
                className="process-item"
                key={title}
                data-reveal="fade-up"
                data-reveal-delay={String(index + 1)}
              >
                <span>{number}</span>
                <div>
                  <h3>
                    {title === "Understand"
                      ? "Tailored solutions"
                      : title === "Make"
                        ? "Agile delivery"
                        : "Ongoing support"}
                  </h3>
                  <p>
                    {title === "Understand"
                      ? "We understand your requirements and shape the right web, mobile, or custom data solution for your business."
                      : title === "Make"
                        ? "Our agile team adapts quickly as the product takes shape, keeping quality and communication visible."
                        : "Maintenance, DevOps, and support services help you get the most from your investment."}
                  </p>
                </div>
                <MoveUpRight size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="section work-section">
        <div className="site-container">
          <div className="section-heading split-heading" data-reveal="fade-up">
            <div>
              <Eyebrow>Portfolio</Eyebrow>
              <h2>
                Custom software that <em>works for people.</em>
              </h2>
            </div>
            <a href="#contact" className="text-link">
              View all projects <ArrowRight size={16} />
            </a>
          </div>
          <div className="work-grid">
            <article className="work-card work-card-large" data-reveal="fade-up">
              <img
                src={projectImage}
                alt="Product team reviewing an app experience"
                width={1200}
                height={1504}
              />
              <div className="work-caption">
                <span>Healthcare / Web and mobile application</span>
                <h3>Digital experiences built around real users.</h3>
                <ArrowUpRight size={20} />
              </div>
            </article>
            <article className="work-card" data-reveal="fade-up" data-reveal-delay="1">
              <img
                src={founderImage}
                alt="Founder working with a technology team"
                width={1200}
                height={1104}
              />
              <div className="work-caption">
                <span>Advisory / Enterprise application</span>
                <h3>Technology that makes work easier.</h3>
                <ArrowUpRight size={20} />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="site-container about-layout">
          <div className="about-visual" data-reveal="image">
            <div className="about-image about-image-tall">
              <img
                src={founderImage}
                alt="Naethra team member working on a digital product"
                width={1200}
                height={1104}
              />
            </div>
            <div className="about-image about-image-small">
              <img
                src={teamImage}
                alt="Naethra colleagues collaborating in a modern office"
                width={1408}
                height={1008}
              />
            </div>
            <div className="about-image about-image-wide">
              <img
                src={projectImage}
                alt="Naethra team discussing a software project"
                width={1200}
                height={1504}
              />
            </div>
            <div className="about-stat">
              <strong>
                2k<span>+</span>
              </strong>
              <span>Projects completed</span>
            </div>
          </div>
          <div className="about-copy" data-reveal="fade-up" data-reveal-delay="1">
            <Eyebrow>About us</Eyebrow>
            <h2>
              Innovate. Integrate. <em>Elevate tech.</em>
            </h2>
            <p>
              Technology is constantly evolving, shaping the way we live and work. It encompasses
              innovation, automation, and connectivity, driving progress for businesses everywhere.
            </p>
            <div className="about-statements">
              <span>Tech forward. Future ready. Your tomorrow, enhanced today.</span>
              <span>Revolutionizing reality through technology. Tech it to the next level.</span>
              <span>Tech-savvy lives, brighter tomorrows. Connect. Create. Transform.</span>
            </div>
            <div className="about-help">
              <span className="about-help-icon">
                <Users size={22} />
              </span>
              <div>
                <span>Need help?</span>
                <strong>+91 44 3500 3204</strong>
              </div>
            </div>
            <div className="about-proof">
              <Check size={16} />
              <span>Experienced developers, tailored delivery, dependable support.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="site-container quote-layout" data-reveal="fade-up">
          <Quote size={38} className="quote-icon" />
          <blockquote>
            “We recently had the pleasure of outsourcing our application development to Naethra, and
            we are extremely satisfied with the results.”
          </blockquote>
          <div className="quote-author">
            <span>VB</span>
            <div>
              <strong>Vasudha Bhushan</strong>
              <small>Vasudha Bhushan · Manager, Software Technology &amp; Engineering</small>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="site-container contact-layout">
          <div data-reveal="fade-up">
            <Eyebrow inverse>Request a free demo today</Eyebrow>
            <h2>Let&apos;s build your next application.</h2>
            <p>
              Tell us what you need to build, improve, or connect. Schedule a 30-minute meeting and
              get a clear next step from our team.
            </p>
          </div>
          <div className="contact-actions" data-reveal="fade-up" data-reveal-delay="1">
            <a href="mailto:info@naethra.com" className="contact-email">
              info@naethra.com <ArrowUpRight size={22} />
            </a>
            <a href="tel:+914435003204" className="contact-phone">
              +91 44 3500 3204
            </a>
            <a href="mailto:info@naethra.com" className="button button-light">
              Schedule a 30-minute meeting <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-container footer-grid">
          <div>
            <Logo inverse />
            <p>Comprehensive full-stack development outsourcing.</p>
          </div>
          <div className="footer-address">
            <span>Visit us</span>
            <p>
              Viswanathapuram Main Road
              <br />
              Kodambakkam, Chennai
            </p>
          </div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>
          <span className="footer-copy">© 2026 Naethra Technologies</span>
        </div>
      </footer>
    </main>
  );
}
