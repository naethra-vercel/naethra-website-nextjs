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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Smartphone,
  Flag,
  Presentation,
  TrendingUp,
  LayoutGrid,
  Monitor,
  FileCode,
  Laptop,
  Cloud as CloudIconLucide,
} from "lucide-react";
import IntegrationSection from "@/components/IntegrationSection";
import { JarvisArcReactor, openJarvis } from "@/components/JarvisArcReactor";

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

const serviceMenuItems = [
  ["Content Management System", "#integration"],
  ["Custom Web Publishing", "#filemaker"],
  ["Dot Net Application", "#web-app"],
  ["AWS & Cloud Support", "#integration"],
] as const;

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
  { name: "Chemtools", logo: "https://naethra.com/wp-content/uploads/2023/04/Chemtools.webp" },
  { name: "Namanama", logo: "https://naethra.com/wp-content/uploads/2023/02/namanama-Logo.jpeg" },
  { name: "Sabine Surveyors", logo: "https://naethra.com/wp-content/uploads/2023/04/Sabine-Surveyors.webp" },
  { name: "Shingda", logo: "https://naethra.com/wp-content/uploads/2023/04/shingda.webp" },
  { name: "Fyrepower", logo: "https://naethra.com/wp-content/uploads/2023/02/New-fyrepower-logo-copy.png" },
  { name: "CURA Emergency Services", logo: "https://naethra.com/wp-content/uploads/2023/04/CURA-Emergency-Services.webp" },
  { name: "Expat Aircon Services", logo: "https://naethra.com/wp-content/uploads/2023/02/EXPAT-AIRCON-SERVICES.png" },
  { name: "Sauna Specialist", logo: "https://naethra.com/wp-content/uploads/2023/04/Sauna_Specialist_Logo.png" },
  { name: "Syndeo", logo: "https://naethra.com/wp-content/uploads/2023/02/Syndeo.jpg" },
  { name: "Sabine", logo: "https://naethra.com/wp-content/uploads/2023/04/Sabine.png" },
  { name: "OEG", logo: "https://naethra.com/wp-content/uploads/2023/02/OEG-logo.svg" },
  { name: "Mahathri", logo: "https://naethra.com/wp-content/uploads/2023/04/Mahathri-Logo.webp" },
  { name: "MacPros", logo: "https://naethra.com/wp-content/uploads/2023/04/MacPros_Logo_med_white.webp" },
  { name: "IRITS", logo: "https://naethra.com/wp-content/uploads/2023/04/IRITS-logo.webp" },
  { name: "AARMS", logo: "https://naethra.com/wp-content/uploads/2023/02/AARMS.png" },
];

const recentProjects = [
  [projectImage, "Team collaborating on a software project", "Business Development", "Digital Marketing"],
  [teamImage, "Product team reviewing a digital experience", "Finance strategy", "Finance"],
  [projectImage, "Team presenting project analytics", "Process optimization", "Operations"],
  [founderImage, "Technology team working together", "Marketing research", "Growth"],
] as const;

const consultingServices = [
  [founderImage, "Business strategy"],
  [teamImage, "Process optimization"],
  [projectImage, "Financial advisory"],
  [projectImage, "Marketing Research"],
] as const;

const offerServices = [
  // Top Row
  {
    title: "iOS, Android And Hybrid Mobility Applications",
    description:
      "Our first mobile app project was delivered 2 years ago and since then mobile applications have been the fastest growing part..",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Website Development",
    description:
      "Our skilled and experienced development team offers a rich set of possible technology and user interface solutions, whatever your needs .Some areas where we've done work...",
    icon: Flag,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Content Management System",
    description:
      "We work on a number of open source Content Management Systems (CMS), which can be easily downloaded by anyone...",
    icon: Presentation,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
  },

  // Middle Row
  {
    title: "Java/J2ee Applications",
    description:
      "Our Java Competency Center solutions help your company fundamentally improve the way it builds software solutions using JEE..",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Php/Mysql Applications",
    description:
      "PHP is a widely-used general-purpose scripting language that is especially suited for Web development...",
    icon: LayoutGrid,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: ".Net Applications",
    description:
      "Naethra provides full-cycle development services in Microsoft .NET to Independent Software Vendors (ISVs), product...",
    icon: Monitor,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80",
  },

  // Bottom Row
  {
    title: "FileMaker Development",
    description:
      "We have over 100 person years experience in FileMaker skills. Our developers are certified FM developers and.",
    icon: FileCode,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Custom Web Publishing With PHP(CWP)",
    description:
      "With our Filemaker-to-Web solution, you can offer controlled public access to your data, while it remains connected...",
    icon: Laptop,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Cloud Solutions",
    description:
      "Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software...",
    icon: CloudIconLucide,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
  },
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
      <span className="eyebrow-mark">+</span>
      <span className="eyebrow-label">{children}</span>
      <span className="eyebrow-mark">+</span>
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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

  useEffect(() => {
    const rotation = window.setInterval(() => {
      setTestimonialIndex((index) => (index + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(rotation);
  }, []);

  return (
    <main id="top" className="site-page">
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="site-container header-inner">
          <Logo />
          <nav className="desktop-nav theme-nav" aria-label="Primary navigation">
            {navItems.map(([label, href]) =>
              label === "Services" ? (
                <div className="nav-dropdown" key={label}>
                  <a className="nav-services-link" href={href} aria-haspopup="true">
                    {label}<span className="nav-chevron" aria-hidden="true" />
                  </a>
                  <div className="nav-dropdown-menu">
                    {serviceMenuItems.map(([itemLabel, itemHref]) => (
                      <a key={itemLabel} href={itemHref}>{itemLabel}</a>
                    ))}
                  </div>
                </div>
              ) : (
                <a className={label === "About Us" ? "nav-about-link" : undefined} key={label} href={href}>
                  {label}
                </a>
              ),
            )}
          </nav>
          <div className="flex items-center gap-x-2.5">
            <button
              type="button"
              onClick={openJarvis}
              className="flex items-center gap-x-2 rounded-full border border-[#005b96]/30 bg-[#e8edf6] px-3.5 py-1.5 text-xs font-bold text-[#005b96] transition-all hover:bg-[#d9e3f2] hover:scale-105 active:scale-95 shadow-sm"
              title="Launch Jarvis AI Assistant"
            >
              <JarvisArcReactor size={26} label="J" />
              <span className="hidden xs:inline">JARVIS AI</span>
            </button>
            <a href="#contact" className="button button-orange header-cta">
              <span>30 mins meeting</span><i aria-hidden="true">›</i>
            </a>
          </div>
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
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openJarvis();
              }}
              className="flex w-full items-center justify-between rounded-xl bg-[#e8edf6] p-3 text-left font-bold text-[#005b96] border border-[#005b96]/20 shadow-sm"
            >
              <div className="flex items-center gap-x-3">
                <JarvisArcReactor size={32} label="J" />
                <span>Launch JARVIS AI</span>
              </div>
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
            </button>
            {navItems.map(([label, href]) => (
              label === "Services" ? (
                <div className="mobile-nav-group" key={label}>
                  <button
                    className="mobile-nav-services-toggle"
                    type="button"
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((open) => !open)}
                  >
                    {label}
                    <span aria-hidden="true">{servicesOpen ? "−" : "+"}</span>
                  </button>
                  {servicesOpen && <div className="mobile-nav-submenu">
                    {serviceMenuItems.map(([itemLabel, itemHref]) => (
                      <a key={itemLabel} href={itemHref} onClick={() => setMenuOpen(false)}>
                        {itemLabel}
                      </a>
                    ))}
                  </div>}
                </div>
              ) : (
                <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                </a>
              )
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
              <span>30 mins meeting</span><b>›</b>
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
              <a href="#contact" onClick={() => setMenuOpen(false)}>30 mins meeting</a>
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
          </div>
          <div className="sentinel-bottom">
            <div className="sentinel-stats">
              <div><strong>112+</strong><span>Countries<br />Protected<br />Globally</span></div>
              <i aria-hidden="true" />
              <div><strong>55K+</strong><span>Clients<br />Secured</span></div>
            </div>
            <a className="sentinel-meet" href="#contact">
              <img alt="" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_105822_bf7c2d53-9957-4521-bbbf-7c1ab7a70130.png" />
              <b>Meet Sentinel</b><span aria-hidden="true">›</span>
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
          <div className="services-heading" data-reveal="fade-up">
            <div>
              <Eyebrow>What we offer</Eyebrow>
              <h2>Our core consulting services</h2>
            </div>
            <p>We provide tailored consulting solutions to help businesses overcome challenges, seize opportunities, and achieve sustainable growth.</p>
          </div>
          <div className="services-grid">
            {offerServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  className="service-card"
                  key={service.title}
                  data-reveal="fade-up"
                  data-reveal-delay={String((index % 3) + 1)}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    width={1000}
                    height={750}
                    loading="lazy"
                  />
                  <div className="service-card-content">
                    <span className="service-icon-badge">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </span>
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-desc">{service.description}</p>
                  </div>
                </article>
              );
            })}
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
            {recentProjects.map(([image, alt, title, category], index) => (
              <article className="work-card" key={alt} data-reveal="fade-up" data-reveal-delay={String((index % 3) + 1)}>
                <img src={image} alt={alt} width={1200} height={1104} />
                <div className="work-hover-content">
                  <span>{category}</span>
                  <h3>{title}</h3>
                </div>
                <span className="work-hover-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <IntegrationSection />

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
            <TooltipProvider delayDuration={100}>
              <div className="client-logo-track">
                {[...valuedClients, ...valuedClients].map((client, index) => (
                  <Tooltip key={`${client.name}-${index}`}>
                    <TooltipTrigger asChild>
                      <div className="client-logo cursor-pointer">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="client-logo-img"
                          loading="lazy"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="font-sans font-semibold text-xs bg-slate-900 text-white border border-slate-700/80 shadow-xl px-3 py-1.5 rounded-lg z-50">
                      {client.name}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
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
              <span className="quote-author-avatar">{activeTestimonial[0].slice(0, 1)}</span>
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
          <div className="footer-copy">
            <span>2026 © Copyrights <strong>Naethra Technologies</strong></span>
            <div className="footer-links">
              <a href="#contact">Contact Us</a>
              <a href="#contact">Terms and Conditions</a>
              <a href="#contact">Privacy Policy</a>
              <a href="#contact">Disclaimer and Notification</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
