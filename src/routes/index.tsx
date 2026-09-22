import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
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
  Message01Icon,
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
    "01",
    "Web & enterprise applications",
    "Outsource web applications, enterprise systems, UX/UI planning, and usability testing to an experienced delivery team.",
    Globe02Icon,
  ],
  [
    "02",
    "Cross-platform mobile apps",
    "Build mobile applications with Ionic Framework, Cordova, Flutter, or the native approach your product requires.",
    SmartPhone01Icon,
  ],
  [
    "03",
    "User interface & graphic design",
    "Responsive, mobile-first design concepts that make your product easier and more enjoyable to use.",
    PaletteIcon,
  ],
  [
    "04",
    "Claris FileMaker development",
    "FileMaker integration, database development, WebDirect, Custom Web Publishing, and custom application development.",
    Database02Icon,
  ],
  [
    "05",
    "Content management systems",
    "Powerful CMS solutions with PHP, WordPress, Joomla, and Magento for teams that need to publish and grow.",
    CloudIcon,
  ],
  [
    "06",
    "Zoho & cloud applications",
    "Quickly build and deploy cloud applications with Zoho Creator, plus maintenance and support for existing systems.",
    UserGroupIcon,
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

const techStack = [
  ["Angular", "#5550a8"],
  ["React", "#d94c7b"],
  ["Node.js", "#198c5c"],
  ["JavaScript", "#3d6db5"],
  ["Ionic", "#c89834"],
  ["React Native", "#68b737"],
  ["Cloud AWS", "#ed773c"],
  ["PHP", "#e56b50"],
  [".NET", "#ec345d"],
  ["Java", "#df3b32"],
  ["Android", "#9e2850"],
  ["iOS", "#102d70"],
  ["Flutter", "#ff7800"],
  ["Azure GCP", "#a348aa"],
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
      <span />
      {children}
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
          <a href="#contact" className="button button-orange header-cta">
            30 mins meeting <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
          </a>
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
            <a href="#contact" className="button button-orange" onClick={() => setMenuOpen(false)}>
              30 mins meeting <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
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
                Schedule a 30-minute meeting <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} />
              </a>
              <a href="#work" className="text-link">
                Explore our services <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
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
              <HugeiconsIcon icon={SparklesIcon} size={16} />
              <span>Ideas into systems</span>
            </div>
            <div className="hero-note hero-note-bottom">
              <span className="status-dot" />
              <span>Shipping with intent</span>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} />
            </div>
          </div>
        </div>
        <div className="hero-bottom site-container" data-reveal="fade-up">
          <span>Web · Mobile · UX/UI · FileMaker · Enterprise applications</span>
          <span className="hero-scroll">
            <HugeiconsIcon icon={ArrowDown01Icon} size={16} /> Scroll to explore
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

      <section className="client-strip" aria-label="Our valued clients" data-reveal="fade-up">
        <div className="site-container client-strip-inner">
          <Eyebrow>Our valued clients</Eyebrow>
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
              <span className="integration-pill-dot" /> Current technology stack
            </div>
            <h2>
              Your entire tech stack — <em>fully connected.</em>
            </h2>
            <p>
              Integrate your favorite apps and build workflows that move data, trigger actions, and
              keep everything in sync.
            </p>
            <a href="#contact" className="button button-orange">
              Start a conversation <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
            </a>
          </div>
          <div
            className="integration-orbit"
            data-reveal="scale-in"
            aria-label="Current technology stack orbit"
          >
            <div className="orbit-ring orbit-ring-outer" />
            <div className="orbit-ring orbit-ring-inner" />
            <div className="orbit-loader">
              <span />
            </div>
            <div className="orbit-core">
              <span>N</span>
              <strong>Naethra</strong>
            </div>
            {integrations.map(([label, color], index) => (
              <span
                key={label}
                className="orbit-app"
                style={
                  {
                    "--orbit-angle": `${index * 22.5}deg`,
                    "--orbit-color": color,
                    "--orbit-delay": `${index * 60}ms`,
                  } as CSSProperties
                }
                title={label}
              >
                {label === "YouTube Music" ? "YT Music" : label}
              </span>
            ))}
          </div>
        </div>
        <div className="tech-stack-band" data-reveal="fade-up">
          <div className="site-container">
            <div className="tech-stack-intro">
              <Eyebrow inverse>Current technology stack</Eyebrow>
              <p>Flexible by design. Proven in delivery.</p>
            </div>
            <div className="tech-stack-grid">
              {techStack.map(([label, color], index) => (
                <span
                  key={label}
                  className="tech-tile"
                  style={
                    { "--tile-color": color, "--tile-delay": `${index * 40}ms` } as CSSProperties
                  }
                >
                  {label}
                </span>
              ))}
            </div>
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
              Schedule a 30-minute meeting <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
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
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
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
              View all projects <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
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
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={20} />
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
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={20} />
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
                <HugeiconsIcon icon={UserGroupIcon} size={22} />
              </span>
              <div>
                <span>Need help?</span>
                <strong>+91 44 3500 3204</strong>
              </div>
            </div>
            <div className="about-proof">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
              <span>Experienced developers, tailored delivery, dependable support.</span>
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
              {contactSubmitted ? "Message ready to send" : "Send a message"}{" "}
              <HugeiconsIcon icon={Message01Icon} size={18} />
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
