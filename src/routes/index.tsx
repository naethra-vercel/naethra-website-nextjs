import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  CloudIcon,
  Database02Icon,
  Globe02Icon,
  Location01Icon,
  Mail01Icon,
  Menu01Icon,
  PaletteIcon,
  QuoteDownIcon,
  SmartPhone01Icon,
  SparklesIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { type CSSProperties, type FormEvent, useEffect, useState } from "react";

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
    "Web & enterprise applications",
    "Outsource web applications, enterprise systems, UX/UI planning, and usability testing to an experienced delivery team.",
    Globe02Icon,
  ],
  [
    "Cross-platform mobile apps",
    "Build mobile applications with Ionic Framework, Cordova, Flutter, or the native approach your product requires.",
    SmartPhone01Icon,
  ],
  [
    "User interface & graphic design",
    "Responsive, mobile-first design concepts that make your product easier and more enjoyable to use.",
    PaletteIcon,
  ],
  [
    "Claris FileMaker development",
    "FileMaker integration, database development, WebDirect, Custom Web Publishing, and custom application development.",
    Database02Icon,
  ],
  [
    "Content management systems",
    "Powerful CMS solutions with PHP, WordPress, Joomla, and Magento for teams that need to publish and grow.",
    CloudIcon,
  ],
  [
    "Zoho & cloud applications",
    "Quickly build and deploy cloud applications with Zoho Creator, plus maintenance and support for existing systems.",
    UserGroupIcon,
  ],
] as const;

const process = [
  [
    "Understand",
    "We listen first, map the real problem, and create a clear plan your team can believe in.",
  ],
  [
    "Make",
    "Small, senior teams turn the plan into a useful product with visible progress at every step.",
  ],
  [
    "Improve",
    "After launch, we stay close to the product and help it become more valuable over time.",
  ],
];

const integrations = [
  ["Discord", "#7c59e8"],
  ["Mocha", "#222222"],
  ["Pinterest", "#e31b23"],
  ["Reddit", "#ff4f14"],
  ["Snapchat", "#f5d94e"],
  ["X", "#111111"],
  ["YouTube Music", "#ef1d25"],
  ["YouTube", "#ff1717"],
  ["Zapier", "#ff4f12"],
  ["FileMaker", "#2f80ed"],
  ["Zoho", "#e5532d"],
  ["AWS", "#f6a400"],
  ["Flutter", "#38aaf4"],
  ["React", "#59c5e8"],
  ["Node", "#3b9658"],
  ["API", "#005b96"],
];

const blogPosts = [
  [
    "Strategy",
    "June 20, 2025",
    "Why your business needs a thoughtful digital roadmap",
    founderImage,
  ],
  [
    "Planning",
    "June 20, 2025",
    "From goals to delivery: turning vision into measurable progress",
    teamImage,
  ],
  ["Technology", "June 20, 2025", "Five ways modern teams can build better software", projectImage],
  ["Growth", "June 20, 2025", "Digital transformation for service-based businesses", founderImage],
] as const;

const valuedClients = [
  "Namanama",
  "Sabine Surveyors",
  "AECO Energy",
  "Rajdeep Automation",
  "Boro Blinds",
];

const recentProjects = [
  [projectImage, "Team collaborating on a software project"],
  [teamImage, "Product team reviewing a digital experience"],
  [projectImage, "Team presenting project analytics"],
  [founderImage, "Technology team working together"],
] as const;

const testimonials = [
  [
    "Vasudha Bhushan",
    "Manager, Software Technology & Engineering",
    "We recently had the pleasure of outsourcing our application development to Naethra, and we are extremely satisfied with the results.",
    founderImage,
  ],
  [
    "Steve Chun",
    "Howard Investments Inc., New York",
    "Naethra continues to do great work for us. We look forward to additional development of our custom application.",
    teamImage,
  ],
  [
    "Sandeep Shah",
    "Director, Rajdeep Automation",
    "Their professionalism, detailed explanations, and commitment made the whole website development experience a pleasure.",
    projectImage,
  ],
  [
    "Shazad Din",
    "Boro Blinds, Middlesbrough",
    "These guys are FileMaker experts. They really know their stuff and deliver dependable results.",
    founderImage,
  ],
] as const;

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
      <span className="eyebrow-mark">+</span>
      <span className="eyebrow-label">{children}</span>
      <span className="eyebrow-mark">+</span>
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const activeTestimonial = testimonials[testimonialIndex] ?? testimonials[0];

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSubmitted(true);
  };

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
          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            ) : (
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            )}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label}
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="hero-section">
        <video
          className="sentinel-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_105822_bf7c2d53-9957-4521-bbbf-7c1ab7a70130.png"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_105953_21ad8049-9088-4a00-bad3-aee6b5575a2b.mp4"
          aria-hidden="true"
        />
        <div className="sentinel-tint" />
        <div className="sentinel-hero-inner">
          <div className="sentinel-topbar">
            <a className="sentinel-brand" href="#top" aria-label="ConSentinel home">
              <span className="sentinel-mark" aria-hidden="true">◎</span>
              <strong>ConSentinel</strong>
            </a>
            <nav className="sentinel-nav" aria-label="ConSentinel navigation">
              <a href="#top">⌂ <span>Explore</span></a>
              <i aria-hidden="true" />
              <a href="#services">▦ <span>Product</span></a>
            </nav>
            <a className="sentinel-cta" href="#contact">
              <span>Get free plan</span><b>›</b>
            </a>
            <button
              className="sentinel-menu-button"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span /><span />
            </button>
          </div>
          {menuOpen && (
            <nav className="sentinel-mobile-menu" aria-label="ConSentinel mobile navigation">
              <a href="#top" onClick={() => setMenuOpen(false)}>Explore</a>
              <a href="#services" onClick={() => setMenuOpen(false)}>Product</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Get free plan</a>
            </nav>
          )}
          <div className="sentinel-main">
            <div className="sentinel-copy">
              <p className="sentinel-eyebrow">Your digital infrastructure</p>
              <h1>Smarter Security<br />Starts Here</h1>
              <div className="sentinel-tagrow">
                <span className="sentinel-play" aria-hidden="true">▶</span>
                <span>Secure the Sphere. Protect What Matters.</span>
              </div>
            </div>
            <aside className="sentinel-panel">
              <div className="sentinel-panel-top"><span>AI-Driven</span><i /><b>◈</b></div>
              <p>Cloud<br />Infrastructure<br />Protection</p>
              <div className="sentinel-scale"><span>1K</span><span>10K</span><span>50K</span><span>100K</span></div>
              <div className="sentinel-track"><i /></div>
            </aside>
          </div>
          <div className="sentinel-bottom">
            <div className="sentinel-stats">
              <div><strong>112+</strong><span>Countries<br />Protected<br />Globally</span></div>
              <i aria-hidden="true" />
              <div><strong>55K+</strong><span>Clients<br />Secured</span></div>
            </div>
            <a className="sentinel-meet" href="#contact">
              <img alt="" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_105822_bf7c2d53-9957-4521-bbbf-7c1ab7a70130.png" />
              <b>Meet Sentinel</b><span>›</span>
            </a>
          </div>
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
            {services.map(([title, body, Icon], index) => (
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
                  <HugeiconsIcon icon={Icon} size={22} strokeWidth={1.7} />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
                <HugeiconsIcon className="service-arrow" icon={ArrowUpRight01Icon} size={19} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="integration-section section">
        <div className="site-container">
          <div className="integration-heading" data-reveal="fade-up">
            <div className="integration-pill">
              <span className="integration-pill-dot" /> Integration <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
            </div>
            <h2>
              Your entire tech stack —<br /> <em>fully connected.</em>
            </h2>
            <p>
              Integrate your favorite apps and build workflows that move data, trigger actions, and
              keep everything in sync — automatically.
            </p>
          </div>
          <div
            className="integration-orbit"
            data-reveal="scale-in"
            aria-label="Connected technology integrations"
          >
            <div className="arc-line arc-line-outer" aria-hidden="true" />
            <div className="arc-line arc-line-inner" aria-hidden="true" />
            <div className="arc-anchor arc-anchor-left">
              <span>×</span>
            </div>
            <div className="arc-anchor arc-anchor-right">
              <span>×</span>
            </div>
            <div className="orbit-track">
              {[0, 1].map((set) => (
                <div className="orbit-set" key={set} aria-hidden={set === 1}>
                  {integrations.map(([label, color], index) => (
                    <span
                      key={`${label}-${set}`}
                      className="orbit-app"
                      style={
                        {
                          "--orbit-color": color,
                          "--orbit-index": index,
                        } as CSSProperties
                      }
                      title={label}
                    >
                      {label === "YouTube Music" ? "YT Music" : label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <a href="#contact" className="button integration-cta">
              Start free <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
            </a>
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
          </div>
          <div className="process-list">
            {process.map(([title], index) => (
              <div
                className="process-item"
                key={title}
                data-reveal="fade-up"
                data-reveal-delay={String(index + 1)}
              >
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
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="section work-section">
        <div className="site-container">
          <div className="recent-heading" data-reveal="fade-up">
            <Eyebrow>Recent Projects</Eyebrow>
            <h2>
              Explore the Recent Works
              <br />
              We Have Done!
            </h2>
          </div>
          <div className="work-grid">
            {recentProjects.map(([image, alt], index) => (
              <article className="work-card" key={alt} data-reveal="fade-up" data-reveal-delay={String((index % 3) + 1)}>
                <img src={image} alt={alt} width={1200} height={1104} />
              </article>
            ))}
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
            <div className="about-proof">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
              <span>Experienced developers, tailored delivery, dependable support.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="client-strip" aria-label="Client logos" data-reveal="fade-up">
        <div className="site-container client-strip-inner">
          <div className="client-logo-window">
            <div className="client-logo-track">
              {[...valuedClients, ...valuedClients].map((client, index) => (
                <span className="client-logo" key={`${client}-${index}`}>
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="insights" className="section insights-section">
        <div className="site-container">
          <div className="insights-heading" data-reveal="fade-up">
            <div>
              <Eyebrow>Our blog</Eyebrow>
              <h2>Insights &amp; Ideas</h2>
              <p>
                Fresh perspectives on business growth, innovation, leadership, and operational
                efficiency.
              </p>
            </div>
            <a
              href="mailto:info@naethra.com?subject=Naethra%20insights"
              className="button button-dark"
            >
              See all blog <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} />
            </a>
          </div>
          <div className="insights-grid">
            {blogPosts.map(([category, date, title, image], index) => (
              <a
                href="#contact"
                className="insight-card"
                key={title}
                data-reveal="fade-up"
                data-reveal-delay={String((index % 2) + 1)}
              >
                <img src={image} alt="" width={1200} height={1104} />
                <div className="insight-card-copy">
                  <div className="insight-meta">
                    <span>{category}</span>
                    <time>{date}</time>
                  </div>
                  <h3>{title}</h3>
                </div>
                <HugeiconsIcon className="insight-arrow" icon={ArrowUpRight01Icon} size={19} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="site-container testimonial-layout" data-reveal="fade-up">
          <div className="testimonial-visual">
            <img
              src={activeTestimonial[3]}
              alt={`${activeTestimonial[0]} testimonial portrait`}
              width={1200}
              height={1104}
            />
            <div className="testimonial-avatars" role="tablist" aria-label="Customer testimonials">
              {testimonials.map(([name, , , image], index) => (
                <button
                  type="button"
                  key={name}
                  className={`testimonial-avatar ${index === testimonialIndex ? "is-active" : ""}`}
                  onClick={() => setTestimonialIndex(index)}
                  role="tab"
                  aria-selected={index === testimonialIndex}
                  aria-label={`Read testimonial from ${name}`}
                >
                  <img src={image} alt="" width={1200} height={1104} />
                </button>
              ))}
            </div>
          </div>
          <div className="testimonial-copy">
            <Eyebrow>Testimonial</Eyebrow>
            <h2>
              Reviews from our <em>customers.</em>
            </h2>
            <HugeiconsIcon icon={QuoteDownIcon} size={48} className="quote-icon" />
            <blockquote>“{activeTestimonial[2]}”</blockquote>
            <div className="quote-author">
              <span>
                {activeTestimonial[0]
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              <div>
                <strong>{activeTestimonial[0]}</strong>
                <small>{activeTestimonial[1]}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="site-container contact-layout">
          <div className="contact-intro" data-reveal="fade-up">
            <Eyebrow>Contact us</Eyebrow>
            <h2>Get in touch</h2>
            <p>
              Technology is constantly evolving, shaping the way we live and work. It encompasses
              innovation, automation, and connectivity driving progress.
            </p>
            <div className="contact-details">
              <a
                href="https://maps.google.com/?q=Viswanathapuram+Main+Road+Kodambakkam+Chennai"
                className="contact-detail-card"
              >
                <HugeiconsIcon icon={Location01Icon} size={22} />
                <span>Address</span>
                <strong>
                  Viswanathapuram Main Road
                  <br />
                  Kodambakkam, Chennai
                </strong>
              </a>
              <a href="mailto:info@naethra.com" className="contact-detail-card">
                <HugeiconsIcon icon={Mail01Icon} size={22} />
                <span>E-mail</span>
                <strong>info@naethra.com</strong>
              </a>
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={handleContactSubmit}
            data-reveal="fade-up"
            data-reveal-delay="1"
          >
            <h3>Send a message</h3>
            <div className="contact-form-grid">
              <label>
                <span className="sr-only">Your name</span>
                <input name="name" type="text" placeholder="Your Name" required />
              </label>
              <label>
                <span className="sr-only">Your email</span>
                <input name="email" type="email" placeholder="Your Email" required />
              </label>
              <label>
                <span className="sr-only">Your number</span>
                <input name="phone" type="tel" placeholder="Your Number" />
              </label>
              <label>
                <span className="sr-only">Choose a reason</span>
                <select name="reason" defaultValue="">
                  <option value="" disabled>
                    Choose a Reason
                  </option>
                  <option>Web application</option>
                  <option>Mobile application</option>
                  <option>FileMaker development</option>
                  <option>Support and maintenance</option>
                </select>
              </label>
            </div>
            <label className="contact-message">
              <span className="sr-only">Your message</span>
              <textarea name="message" placeholder="Message here.." rows={4} required />
            </label>
            <button type="submit" className="button button-blue">
              {contactSubmitted ? "Message ready to send" : "Send a message"}
            </button>
            {contactSubmitted && (
              <p className="contact-success" role="status">
                Thanks. We&apos;ll get back to you at the earliest.
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-container footer-map-wrap">
          <iframe
            className="footer-map"
            title="Naethra Technologies location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.810857592566!2d80.2267234!3d13.047708300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266f74b625631%3A0xdf28fa08eca396b9!2sNaethra%20Technologies%20Private%20Limited!5e0!3m2!1sen!2sin!4v1790084108341!5m2!1sen!2sin"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="site-container footer-grid">
          <div className="footer-brand">
            <Logo inverse />
            <p>Technology is constantly evolving, shaping the way we live and work. It encompasses innovation, automation, and connectivity.</p>
            <div className="footer-socials" aria-label="Social links">
              <a href="#contact" aria-label="Facebook">f</a>
              <a href="#contact" aria-label="X">X</a>
              <a href="#contact" aria-label="LinkedIn">in</a>
              <a href="#contact" aria-label="Pinterest">p</a>
            </div>
          </div>
          <div className="footer-address">
            <h3>Contact</h3>
            <div className="footer-contact-row">
              <span className="footer-contact-icon"><HugeiconsIcon icon={Location01Icon} size={17} /></span>
              <div><span>Address</span><strong>Viswanathapuram Main Road,<br />Kodambakkam, Chennai</strong></div>
            </div>
            <div className="footer-contact-row">
              <span className="footer-contact-icon"><HugeiconsIcon icon={SmartPhone01Icon} size={17} /></span>
              <div><span>Phone Number</span><strong>+91 44 3500 3204</strong></div>
            </div>
            <div className="footer-contact-row">
              <span className="footer-contact-icon"><HugeiconsIcon icon={Mail01Icon} size={17} /></span>
              <div><span>Email</span><strong>info@naethra.com</strong></div>
            </div>
          </div>
          <div className="footer-newsletter">
            <h3>Newsletter</h3>
            <p>Technology is constantly evolving, shaping the way we live and work.</p>
            <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="footer-email">Your email</label>
              <input id="footer-email" type="email" placeholder="Your email..." required />
              <button type="submit" aria-label="Subscribe"><HugeiconsIcon icon={ArrowUpRight01Icon} size={18} /></button>
            </form>
            <small>It only takes 2 minutes to complete.</small>
          </div>
          <div className="footer-copy">
            <span>© 2026 Naethra Technologies</span>
            <div className="footer-links">
              <a href="#contact">Terms &amp; Condition</a>
              <a href="#contact">Privacy Policy</a>
              <a href="#contact">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
