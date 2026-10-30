"use client";

import "@/styles/home.css";

import { HugeiconsIcon } from "@hugeicons/react";
import { WORDPRESS_ORIGIN } from "@/lib/wordpress-config";
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
import {
  type CSSProperties,
  type FormEvent,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

import aboutElevateImage from "@/assets/design/about-section/about-elevate.jpg";
import aboutInnovateImage from "@/assets/design/about-section/about-innovate.jpg";
import aboutIntegrateImage from "@/assets/design/about-section/about-integrate.jpg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
import SectionEyebrow from "@/components/SectionEyebrow";
import AnimatedCtaButton from "@/components/AnimatedCtaButton";
import { AnimeSubmenu, NavDropdown } from "@/components/NavDropdown";
import { ModernDropdown } from "@/components/ModernDropdown";
import { MagicCard } from "@/components/ui/magic-card";

const CONTACT_REASON_OPTIONS = [
  {
    value: "Web application",
    label: "Web application",
    description: "Sites, portals, and custom web apps",
  },
  {
    value: "Mobile application",
    label: "Mobile application",
    description: "iOS, Android, or cross-platform",
  },
  {
    value: "FileMaker development",
    label: "FileMaker development",
    description: "Claris FileMaker apps and integrations",
  },
  {
    value: "Support and maintenance",
    label: "Support and maintenance",
    description: "Ongoing care for what you already run",
  },
];
import { submitFooterContactForm } from "@/lib/contact-form";
import { getPrimaryMenu, splitPrimaryMenu } from "@/lib/navigation";
import { portfolioProjects as portfolioFallback } from "@/lib/portfolio-data";
import { SOCIAL_PROFILES } from "@/lib/social";
import { getHomeContent, getPosts, type WpPortfolioProject } from "@/lib/wordpress";
import { assetSrc } from "@/lib/asset-src";

const IntegrationSection = lazy(() => import("@/components/IntegrationSection"));

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

const valuedClients = [
  { name: "Chemtools", logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/04/Chemtools.webp` },
  { name: "Namanama", logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/02/namanama-Logo.jpeg` },
  {
    name: "Sabine Surveyors",
    logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/04/Sabine-Surveyors.webp`,
  },
  { name: "Shingda", logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/04/shingda.webp` },
  {
    name: "Fyrepower",
    logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/02/New-fyrepower-logo-copy.png`,
  },
  {
    name: "CURA Emergency Services",
    logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/04/CURA-Emergency-Services.webp`,
  },
  {
    name: "Expat Aircon Services",
    logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/02/EXPAT-AIRCON-SERVICES.png`,
  },
  {
    name: "Sauna Specialist",
    logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/04/Sauna_Specialist_Logo.png`,
  },
  { name: "Syndeo", logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/02/Syndeo.jpg` },
  { name: "Sabine", logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/04/Sabine.png` },
  { name: "OEG", logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/02/OEG-logo.svg` },
  { name: "Mahathri", logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/04/Mahathri-Logo.webp` },
  {
    name: "MacPros",
    logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/04/MacPros_Logo_med_white.webp`,
  },
  { name: "IRITS", logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/04/IRITS-logo.webp` },
  { name: "AARMS", logo: `${WORDPRESS_ORIGIN}/wp-content/uploads/2023/02/AARMS.png` },
  { name: "Driev", logo: "https://driev.bike/assets/newimgs/longlogodriev.png" },
];

const offerServiceMeta = [
  {
    key: /ios|android|hybrid|mobility/i,
    icon: Smartphone,
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: /website development/i,
    icon: Flag,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: /content management/i,
    icon: Presentation,
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: /java|j2ee/i,
    icon: TrendingUp,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: /php|mysql/i,
    icon: LayoutGrid,
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: /\.?net/i,
    icon: Monitor,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: /filemaker/i,
    icon: FileCode,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: /custom web publishing|cwp/i,
    icon: Laptop,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
  },
  {
    key: /cloud/i,
    icon: CloudIconLucide,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
  },
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

function isPlaceholderPortrait(src?: string) {
  if (!src) return true;
  // Shared WP profile-2.png counts as placeholder; unique ui-avatars do not.
  if (/ui-avatars\.com/i.test(src)) return false;
  return /profile|avatar|placeholder|default|gravatar|mystery|dummy|user[-_]?icon|profile-2/i.test(
    src,
  );
}

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function uniquePortrait(name: string, index: number) {
  const colors = ["005b96", "061d45", "0a6fae", "1d4ed8", "334155"];
  const background = colors[index % colors.length];
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=fff&size=256&bold=true&format=png`;
}

export type HomePageProps = {
  blogPosts: Awaited<ReturnType<typeof getPosts>>;
  home: Awaited<ReturnType<typeof getHomeContent>>;
  menu: Awaited<ReturnType<typeof getPrimaryMenu>>;
  recentProjects?: WpPortfolioProject[];
};

export default function HomePage({
  blogPosts,
  home,
  menu,
  recentProjects: recentProjectsProp = [],
}: HomePageProps) {
  const { navigationItems, meetingItem } = splitPrimaryMenu(menu);
  const usedPortfolioFallback = recentProjectsProp.length === 0;
  const recentProjects =
    recentProjectsProp.length > 0
      ? recentProjectsProp
      : portfolioFallback.slice(0, 5).map((project, index) => ({
          id: index + 1,
          slug: project.href.replace(/^\/portfolio\//, ""),
          title: project.title,
          category: project.category,
          categories: [project.category],
          image: project.image,
          href: project.href,
          summary: project.summary,
        }));
  // #region agent log
  if (typeof window !== "undefined") {
    fetch("http://127.0.0.1:7800/ingest/94ea0936-4433-4e8f-b586-7fcc797a61ea", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "f894e3" },
      body: JSON.stringify({
        sessionId: "f894e3",
        runId: "post-fix",
        hypothesisId: "H1",
        location: "src/components/pages/HomePage.tsx:recentProjects",
        message: "Home portfolio source (client)",
        data: {
          side: "client",
          usedPortfolioFallback,
          propCount: recentProjectsProp.length,
          firstImage: recentProjects[0]?.image?.slice(0, 80) ?? null,
          firstHref: recentProjects[0]?.href?.slice(0, 80) ?? null,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  }
  // #endregion
  const heroSlides =
    home.heroSlides.length > 0
      ? home.heroSlides
      : [
          {
            title: home.heroTitle,
            subtitle: home.heroSubtitle,
            cta: home.heroCta,
            ctaHref: home.heroCtaHref,
            mediaType: home.heroVideo ? ("video" as const) : ("image" as const),
            mediaUrl: home.heroVideo,
          },
        ];
  const testimonials = home.testimonials.map((item, index) => {
    const rawImage = item.image?.trim() ?? "";
    const hasRealPortrait = rawImage.length > 0 && !isPlaceholderPortrait(rawImage);
    return {
      ...item,
      image: hasRealPortrait ? rawImage : uniquePortrait(item.name, index),
    };
  });
  const clients = home.clients.length > 0 ? home.clients : valuedClients;
  const offerServices = home.offerServices.map((service) => {
    const meta =
      offerServiceMeta.find((item) => item.key.test(service.title)) ?? offerServiceMeta[0]!;
    return {
      ...service,
      icon: meta.icon,
      image: meta.image,
    };
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileMenuId, setOpenMobileMenuId] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [contactMessage, setContactMessage] = useState("");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteOverflows, setQuoteOverflows] = useState(false);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const quoteModalRef = useRef<HTMLDivElement>(null);
  const quoteModalPanelRef = useRef<HTMLDivElement>(null);
  const quoteModalAvatarRef = useRef<HTMLDivElement>(null);
  const quoteModalWordsRef = useRef<HTMLParagraphElement>(null);
  const activeTestimonial = testimonials[testimonialIndex] ?? testimonials[0];
  const activeHero = heroSlides[heroIndex % heroSlides.length] ?? heroSlides[0]!;
  const activePortrait = activeTestimonial?.image || "";
  const activeInitials = initialsFromName(activeTestimonial?.name ?? "N");
  const modalQuote = (activeTestimonial?.quote ?? "").replace(/\s+/g, " ").trim();

  useEffect(() => {
    setQuoteModalOpen(false);
  }, [testimonialIndex]);

  useEffect(() => {
    const node = quoteRef.current;
    if (!node) return;

    const measure = () => {
      setQuoteOverflows(node.scrollHeight > node.clientHeight + 1);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeTestimonial?.quote, testimonialIndex]);

  useEffect(() => {
    if (!quoteModalOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const overlay = quoteModalRef.current;
    const panel = quoteModalPanelRef.current;
    const avatar = quoteModalAvatarRef.current;
    const wordsRoot = quoteModalWordsRef.current;
    if (!overlay || !panel) return;

    const words = wordsRoot
      ? Array.from(wordsRoot.querySelectorAll<HTMLElement>(".quote-modal-word"))
      : [];
    const ctx = gsap.context(() => {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        panel,
        { opacity: 0, y: 28, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" },
      );
      if (avatar) {
        gsap.fromTo(
          avatar,
          { opacity: 0, scale: 0.82 },
          { opacity: 1, scale: 1, duration: 0.55, delay: 0.08, ease: "power3.out" },
        );
      }
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          { opacity: 1, duration: 0.4, stagger: 0.016, delay: 0.16, ease: "power1.out" },
        );
      }
    }, overlay);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQuoteModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [quoteModalOpen, activeTestimonial?.quote]);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setContactStatus("submitting");
    setContactMessage("");

    try {
      await submitFooterContactForm({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        reason: String(data.get("reason") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      form.reset();
      setContactStatus("success");
    } catch (error) {
      setContactMessage(error instanceof Error ? error.message : "Unable to send your message.");
      setContactStatus("error");
    }
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
    if (testimonials.length === 0 || quoteModalOpen) return;
    const rotation = window.setInterval(() => {
      setTestimonialIndex((index) => (index + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(rotation);
  }, [testimonials.length, quoteModalOpen]);

  useEffect(() => {
    setHeroIndex(0);
  }, [heroSlides.length, home.heroTitle]);

  useEffect(() => {
    if (heroSlides.length < 2) return;
    const rotation = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(rotation);
  }, [heroSlides.length]);

  return (
    <main id="top" className="site-page">
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="site-container header-inner">
          <Logo />
          <nav className="desktop-nav theme-nav" aria-label="Primary navigation">
            {navigationItems.map((item) =>
              item.children.length > 0 ? (
                <NavDropdown
                  key={item.id}
                  item={item}
                  variant="home"
                  {...(item.label === "Services" ? { triggerClassName: "nav-services-link" } : {})}
                />
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
          <AnimatedCtaButton href={meetingItem.href} className="header-cta">
            {meetingItem.label}
          </AnimatedCtaButton>
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
            {navigationItems.map((item) =>
              item.children.length > 0 ? (
                <div className="mobile-nav-group" key={item.id}>
                  <button
                    className="mobile-nav-services-toggle"
                    type="button"
                    aria-expanded={openMobileMenuId === item.id}
                    onClick={() =>
                      setOpenMobileMenuId((openId) => (openId === item.id ? null : item.id))
                    }
                  >
                    {item.label}
                    <span aria-hidden="true">{openMobileMenuId === item.id ? "−" : "+"}</span>
                  </button>
                  {openMobileMenuId === item.id && (
                    <AnimeSubmenu className="mobile-nav-submenu">
                      <a data-nav-item href={item.href} onClick={() => setMenuOpen(false)}>
                        View {item.label}
                      </a>
                      {item.children.map((child) => (
                        <a
                          data-nav-item
                          key={child.id}
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </AnimeSubmenu>
                  )}
                </div>
              ) : (
                <a key={item.id} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                </a>
              ),
            )}
          </nav>
        )}
      </header>

      <div className="home-hero-stage">
        <section
          className={`hero-section${
            activeHero.mediaUrl
              ? activeHero.mediaType === "video"
                ? " is-video"
                : " is-image"
              : ""
          }`}
        >
          {activeHero.mediaUrl && activeHero.mediaType === "image" ? (
            <img
              key={activeHero.mediaUrl}
              className="hero-media"
              src={activeHero.mediaUrl}
              alt=""
              aria-hidden="true"
            />
          ) : null}
          {activeHero.mediaUrl && activeHero.mediaType === "video" ? (
            <video
              key={activeHero.mediaUrl}
              className="hero-media"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              src={activeHero.mediaUrl}
              aria-hidden="true"
              onLoadedMetadata={(event) => {
                const video = event.currentTarget;
                const start = activeHero.mediaStart;
                if (typeof start === "number" && start > 0 && start < video.duration) {
                  video.currentTime = start;
                }
              }}
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                const start =
                  typeof activeHero.mediaStart === "number" &&
                  activeHero.mediaStart < video.duration
                    ? activeHero.mediaStart
                    : 0;
                const end = activeHero.mediaEnd;
                if (
                  typeof end === "number" &&
                  end > start &&
                  end < video.duration &&
                  video.currentTime >= end
                ) {
                  video.currentTime = start;
                }
              }}
            />
          ) : null}
          <div className="hero-overlay" />
          <div className="site-container hero-inner">
            <div className="hero-copy" key={`hero-copy-${heroIndex}`}>
              <h1>{activeHero.title}</h1>
              <p>{activeHero.subtitle}</p>
              <AnimatedCtaButton href={activeHero.ctaHref} className="sentinel-meet hero-meet">
                {activeHero.cta}
              </AnimatedCtaButton>
            </div>
            {heroSlides.length > 1 && (
              <div className="hero-slide-dots" aria-label="Hero slides">
                {heroSlides.map((slide, index) => (
                  <button
                    key={`${slide.mediaUrl}-${index}`}
                    type="button"
                    className={index === heroIndex ? "is-active" : undefined}
                    aria-label={`Show slide ${index + 1}`}
                    aria-current={index === heroIndex ? "true" : undefined}
                    onClick={() => setHeroIndex(index)}
                  />
                ))}
              </div>
            )}
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
      </div>

      <section id="about" className="section about-section">
        <div className="site-container about-layout">
          <div className="about-visual" data-reveal="image">
            <div className="about-image about-image-tall">
              <MagicCard
                className="about-magic-card"
                gradientSize={260}
                gradientColor="rgb(255 255 255 / 0.22)"
                gradientOpacity={0.55}
                gradientFrom="#005b96"
                gradientTo="#9ec9e4"
              >
                <img
                  src={assetSrc(aboutInnovateImage)}
                  alt="Innovate — building modern digital products"
                  width={1200}
                  height={1104}
                  loading="lazy"
                  decoding="async"
                />
              </MagicCard>
            </div>
            <div className="about-image about-image-small">
              <MagicCard
                className="about-magic-card"
                gradientSize={200}
                gradientColor="rgb(255 255 255 / 0.22)"
                gradientOpacity={0.55}
                gradientFrom="#005b96"
                gradientTo="#9ec9e4"
              >
                <img
                  src={assetSrc(aboutIntegrateImage)}
                  alt="Integrate — connecting systems and teams"
                  width={1408}
                  height={1008}
                  loading="lazy"
                  decoding="async"
                />
              </MagicCard>
            </div>
            <div className="about-image about-image-wide">
              <MagicCard
                className="about-magic-card"
                gradientSize={280}
                gradientColor="rgb(255 255 255 / 0.22)"
                gradientOpacity={0.55}
                gradientFrom="#005b96"
                gradientTo="#9ec9e4"
              >
                <img
                  src={assetSrc(aboutElevateImage)}
                  alt="Elevate — scaling technology for growth"
                  width={1200}
                  height={1504}
                  loading="lazy"
                  decoding="async"
                />
              </MagicCard>
            </div>
            <div className="about-stat">
              <strong>
                2k<span>+</span>
              </strong>
              <span>Projects completed</span>
            </div>
            <div className="about-visual-cta">
              <p>
                Ready to start your next build?
                <br />
                Let’s map the right stack together.
              </p>
              <a className="talk-to-us-button about-talk-to-us" href="/contact-us">
                Talk to us
              </a>
            </div>
          </div>
          <div className="about-copy" data-reveal="fade-up" data-reveal-delay="1">
            <SectionEyebrow>About us</SectionEyebrow>
            <h2>{home.aboutTitle}</h2>
            {home.aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            <div className="about-statements">
              {home.aboutHighlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
            <div className="about-proof">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
              <span>{home.whyTitle}</span>
            </div>
            {home.whyParagraphs.slice(0, 1).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section section-services">
        <div className="site-container">
          <div className="services-heading" data-reveal="fade-up">
            <div>
              <SectionEyebrow>{home.servicesEyebrow}</SectionEyebrow>
              <h2>{home.servicesTitle}</h2>
            </div>
            <p>{home.servicesIntro}</p>
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
                    alt=""
                    width={1000}
                    height={750}
                    loading="lazy"
                  />
                  <div className="service-card-content">
                    <span className="service-icon-badge" aria-hidden="true">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </span>
                    <h3 className="service-card-title">
                      <a href={service.href}>{service.title}</a>
                    </h3>
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
            <SectionEyebrow>Recent Projects</SectionEyebrow>
            <h2>
              Explore the Recent Works
              <br />
              We Have Done!
            </h2>
          </div>
          <div
            className="work-grid"
            data-count={recentProjects.length}
            aria-label="Recent portfolio projects"
          >
            {recentProjects.map((project, index) => {
              const href = project.href || "/portfolio";
              const isExternal = href.startsWith("http");
              return (
                <article
                  className="work-card"
                  key={project.id || project.slug || href}
                  data-reveal="fade-up"
                  data-reveal-delay={String((index % 3) + 1)}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt=""
                      width={1200}
                      height={1104}
                      loading="lazy"
                    />
                  ) : (
                    <span className="work-card-fallback" aria-hidden="true" />
                  )}
                  <div className="work-hover-content">
                    <span>{project.category}</span>
                    <h3>
                      <a
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                      >
                        {project.title}
                      </a>
                    </h3>
                  </div>
                  <span className="work-hover-arrow" aria-hidden="true">
                    ↗
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <IntegrationSection />
      </Suspense>

      <section id="insights" className="section insights-section">
        <div className="site-container">
          <div className="insights-heading" data-reveal="fade-up">
            <div>
              <SectionEyebrow>Our blog</SectionEyebrow>
              <h2>Insights &amp; Ideas</h2>
              <p>
                Fresh perspectives on business growth, innovation, leadership, and operational
                efficiency.
              </p>
            </div>
            <a href="/blogs" className="button button-dark">
              See all blog <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} />
            </a>
          </div>
          <div className="insights-grid">
            {blogPosts.map((post, index) => (
              <article
                className="insight-card"
                key={post.slug}
                data-reveal="fade-up"
                data-reveal-delay={String((index % 2) + 1)}
              >
                {post.image ? (
                  <img src={post.image} alt="" width={1200} height={1104} />
                ) : (
                  <div className="insight-card-fallback" aria-hidden="true" />
                )}
                <div className="insight-card-copy">
                  <div className="insight-meta">
                    <span>{post.category}</span>
                    <time dateTime={post.dateIso}>{post.date}</time>
                  </div>
                  <h3>
                    <a href={`/blogs/${post.slug}`}>{post.title}</a>
                  </h3>
                </div>
                <HugeiconsIcon className="insight-arrow" icon={ArrowUpRight01Icon} size={19} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="client-strip" aria-label="Client logos" data-reveal="fade-up">
        <div className="site-container client-strip-inner">
          <p className="sr-only">{home.clientsHeading}</p>
          <div className="client-logo-window">
            <TooltipProvider delayDuration={100}>
              <div className="client-logo-track">
                {[...clients, ...clients].map((client, index) => (
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
                    <TooltipContent
                      side="top"
                      className="font-sans font-semibold text-xs bg-slate-900 text-white border border-slate-700/80 shadow-xl px-3 py-1.5 rounded-lg z-50"
                    >
                      {client.name}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="site-container testimonial-layout" data-reveal="fade-up">
          <div className="testimonial-visual">
            {activePortrait ? (
              <img
                src={activePortrait}
                alt={`${activeTestimonial?.name ?? "Customer"} testimonial portrait`}
                width={512}
                height={512}
              />
            ) : (
              <div className="testimonial-visual-initials" aria-hidden="true">
                {activeInitials}
              </div>
            )}
            <div className="testimonial-avatars" role="tablist" aria-label="Customer testimonials">
              {testimonials.map(({ name, image }, index) => (
                <button
                  type="button"
                  key={`${name}-${index}`}
                  className={`testimonial-avatar ${index === testimonialIndex ? "is-active" : ""}`}
                  onClick={() => setTestimonialIndex(index)}
                  role="tab"
                  aria-selected={index === testimonialIndex}
                  aria-label={`Read testimonial from ${name}`}
                >
                  {image ? (
                    <img src={image} alt="" width={96} height={96} />
                  ) : (
                    <span aria-hidden="true">{initialsFromName(name)}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="testimonial-copy">
            <SectionEyebrow>Testimonial</SectionEyebrow>
            <h2>
              Reviews from our <em>customers.</em>
            </h2>
            <HugeiconsIcon icon={QuoteDownIcon} size={48} className="quote-icon" />
            <div className="testimonial-quote-block">
              <blockquote ref={quoteRef} className="testimonial-quote is-clamped">
                “{activeTestimonial?.quote}”
              </blockquote>
              {quoteOverflows ? (
                <button
                  type="button"
                  className="testimonial-more"
                  onClick={() => setQuoteModalOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={quoteModalOpen}
                >
                  More
                </button>
              ) : null}
            </div>
            <div className="quote-author">
              <span className="quote-author-avatar">{activeInitials}</span>
              <div>
                <strong>{activeTestimonial?.name}</strong>
                <small>{activeTestimonial?.role}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {quoteModalOpen && activeTestimonial ? (
        <div
          ref={quoteModalRef}
          className="quote-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setQuoteModalOpen(false);
          }}
        >
          <div ref={quoteModalPanelRef} className="quote-modal-panel">
            <button
              type="button"
              className="quote-modal-close"
              onClick={() => setQuoteModalOpen(false)}
              aria-label="Close testimonial"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={16} />
            </button>
            <div className="quote-modal-head">
              <div ref={quoteModalAvatarRef} className="quote-modal-avatar">
                {activePortrait ? (
                  <img src={activePortrait} alt="" width={96} height={96} />
                ) : (
                  <span aria-hidden="true">{activeInitials}</span>
                )}
              </div>
              <div className="quote-modal-identity">
                <h2 id="quote-modal-title" className="quote-modal-title">
                  {activeTestimonial.name}
                </h2>
                <p className="quote-modal-role">{activeTestimonial.role}</p>
              </div>
            </div>
            <p ref={quoteModalWordsRef} className="quote-modal-message">
              {modalQuote.split(/\s+/).map((word, index, words) => (
                <span className="quote-modal-word" key={`${word}-${index}`}>
                  {word}
                  {index < words.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      ) : null}

      <section id="contact" className="contact-section">
        <div className="site-container contact-layout">
          <div className="contact-intro" data-reveal="fade-up">
            <SectionEyebrow>Contact us</SectionEyebrow>
            <h2>Get in touch</h2>
            <p>
              Technology is constantly evolving, shaping the way we live and work. It encompasses
              innovation, automation, and connectivity driving progress.
            </p>
            <div className="contact-details">
              <a
                href="https://maps.google.com/?q=37%2C+Viswanathapuram+Main+Rd%2C+Azeez+Nagar%2C+Kodambakkam%2C+Chennai%2C+Tamil+Nadu+600024"
                className="contact-detail-card"
              >
                <HugeiconsIcon icon={Location01Icon} size={22} />
                <span>Address</span>
                <strong>
                  37, Viswanathapuram Main Rd,
                  <br />
                  Azeez Nagar, Kodambakkam, Chennai, Tamil Nadu 600024
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
                <ModernDropdown
                  name="reason"
                  placeholder="Choose a Reason"
                  options={CONTACT_REASON_OPTIONS}
                  variant="line"
                  aria-label="Choose a reason"
                />
              </label>
            </div>
            <label className="contact-message">
              <span className="sr-only">Your message</span>
              <textarea name="message" placeholder="Message here.." rows={4} required />
            </label>
            <button
              type="submit"
              className="button button-blue"
              disabled={contactStatus === "submitting"}
            >
              {contactStatus === "submitting" ? "Sending…" : "Send a message"}
            </button>
            {contactStatus === "success" && (
              <p className="contact-success" role="status">
                Thanks. We&apos;ll get back to you at the earliest.
              </p>
            )}
            {contactStatus === "error" && (
              <p className="contact-error" role="alert">
                {contactMessage}
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
            <p>
              Technology is constantly evolving, shaping the way we live and work. It encompasses
              innovation, automation, and connectivity.
            </p>
            <div className="footer-socials" aria-label="Social links">
              {SOCIAL_PROFILES.map((profile) => (
                <a
                  key={profile.id}
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer me"
                  aria-label={profile.label}
                >
                  {profile.short}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-address">
            <h3>Contact</h3>
            <div className="footer-contact-row">
              <span className="footer-contact-icon">
                <HugeiconsIcon icon={Location01Icon} size={17} />
              </span>
              <div>
                <span>Address</span>
                <strong>
                  37, Viswanathapuram Main Rd,
                  <br />
                  Azeez Nagar, Kodambakkam,
                  <br />
                  Chennai, Tamil Nadu 600024
                </strong>
              </div>
            </div>
          </div>
          <div className="footer-contact-details">
            <div className="footer-contact-row">
              <span className="footer-contact-icon">
                <HugeiconsIcon icon={SmartPhone01Icon} size={17} />
              </span>
              <div>
                <span>Phone Number</span>
                <strong>+91 44 3500 3204</strong>
              </div>
            </div>
            <div className="footer-contact-row">
              <span className="footer-contact-icon">
                <HugeiconsIcon icon={Mail01Icon} size={17} />
              </span>
              <div>
                <span>Email</span>
                <strong>info@naethra.com</strong>
              </div>
            </div>
          </div>
          <div className="footer-copy">
            <span>
              2026 © Copyrights <strong>Naethra Technologies</strong> | Designed by{" "}
              <strong>Naethra Technologies</strong>
            </span>
            <div className="footer-links">
              <a href="/contact-us">Contact Us</a>
              <a href="/terms-and-conditions">Terms and Conditions</a>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/disclaimer-and-notification">Disclaimer and Notification</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
