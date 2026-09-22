import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  Asterisk,
  Braces,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

import founderImage from "@/assets/putech-founder.jpg";
import projectImage from "@/assets/putech-project.jpg";
import securityImage from "@/assets/putech-security.jpg";
import teamImage from "@/assets/putech-team.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Putech — Secure technology, built for what’s next" },
      {
        name: "description",
        content:
          "Putech designs secure digital products, connected platforms, and resilient cloud systems for ambitious teams.",
      },
      { property: "og:title", content: "Putech — Secure technology, built for what’s next" },
      {
        property: "og:description",
        content: "Strategy, design, engineering, and security for technology that moves business forward.",
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
  ["About", "#about"],
  ["Services", "#services"],
  ["Work", "#work"],
  ["Insights", "#insights"],
];

const services = [
  {
    number: "01",
    title: "Digital products",
    body: "Research, product strategy, interface design, and scalable engineering—one senior team from first idea to launch.",
    icon: Code2,
  },
  {
    number: "02",
    title: "Cloud systems",
    body: "Modern infrastructure and connected platforms engineered for performance, observability, and long-term resilience.",
    icon: Cloud,
  },
  {
    number: "03",
    title: "Cyber security",
    body: "Practical security reviews and threat-led improvements built into your product, people, and operating model.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Data & AI",
    body: "Useful intelligence from complex data, with responsible automation that supports better, faster decisions.",
    icon: Database,
  },
];

const insights = [
  ["Security", "Why secure-by-design changes the economics of product development", "6 min"],
  ["Product", "The operating model behind high-performing digital teams", "8 min"],
  ["AI", "From promising prototype to dependable production system", "5 min"],
];

function Logo() {
  return (
    <a href="#top" className="inline-flex items-center gap-2.5" aria-label="Putech home">
      <span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground">
        <Asterisk className="size-4" strokeWidth={2.5} />
      </span>
      <span className="font-display text-[1.05rem] font-bold text-foreground">Putech</span>
    </a>
  );
}

function SectionLabel({ children, inverse = false }: { children: string; inverse?: boolean }) {
  return (
    <div className={`section-label ${inverse ? "text-surface" : "text-muted-foreground"}`}>
      <span className={inverse ? "bg-lime" : "bg-primary"} />
      {children}
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main id="top" className="overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-ink/10">
        <div className="page-shell flex h-20 items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="nav-link">
                {label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="button-primary hidden md:inline-flex">
            Start a project <ArrowRight className="size-4" />
          </a>
          <button
            type="button"
            className="icon-button md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu md:hidden" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label} <ArrowDownRight className="size-5" />
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="button-primary mt-3 justify-center">
              Start a project <ArrowRight className="size-4" />
            </a>
          </nav>
        )}
      </header>

      <section className="hero-grid relative min-h-[760px] border-b border-ink/10 pt-20 md:min-h-[820px]">
        <div className="page-shell relative flex min-h-[680px] flex-col justify-between py-20 md:min-h-[740px] md:py-24">
          <div className="max-w-3xl">
            <SectionLabel>Independent technology partner · London / Global</SectionLabel>
            <h1 className="mt-10 font-display text-[clamp(3.6rem,8vw,7.7rem)] font-semibold leading-[0.86]">
              Smarter security
              <br />
              starts <span className="text-primary">here.</span>
            </h1>
            <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground md:ml-[36%]">
              We design and engineer secure digital products for organisations moving faster than convention.
            </p>
          </div>

          <div className="grid items-end gap-8 md:grid-cols-[1fr_0.75fr_0.45fr]">
            <div className="flex gap-10 border-t border-ink/15 pt-5 md:border-0 md:pt-0">
              <div><strong className="stat">112+</strong><span className="stat-label">Products shipped</span></div>
              <div><strong className="stat">55K+</strong><span className="stat-label">Risks resolved</span></div>
            </div>
            <div className="security-ticket">
              <span className="grid size-9 place-items-center rounded-full bg-lime text-ink"><ShieldCheck className="size-4" /></span>
              <div><span className="text-[0.64rem] uppercase text-muted-foreground">Security status</span><strong className="block text-sm">All systems protected</strong></div>
              <Check className="ml-auto size-4 text-primary" />
            </div>
            <a href="#about" className="group flex items-center justify-end gap-3 text-xs font-semibold uppercase">
              Explore Putech
              <span className="grid size-10 place-items-center rounded-full border border-ink/20 transition-transform group-hover:translate-y-1"><ArrowDownRight className="size-4" /></span>
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="section-space bg-ink text-surface">
        <div className="page-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <SectionLabel inverse>Our company</SectionLabel>
            <p className="mt-8 max-w-xs text-sm leading-6 text-surface/60">Built for the difficult work: connected systems, complex organisations, and technology that cannot fail.</p>
          </div>
          <div>
            <h2 className="section-title text-surface">Technology should create momentum, <span className="text-surface/35">not complexity.</span></h2>
            <div className="mt-14 grid gap-8 border-t border-surface/15 pt-8 sm:grid-cols-2">
              <p className="text-sm leading-7 text-surface/65">Putech is an independent team of strategists, designers, engineers, and security specialists. We bring different disciplines around one table to solve the whole problem.</p>
              <p className="text-sm leading-7 text-surface/65">Our work is direct, collaborative, and outcome-led. No bloated handovers—just senior people making informed decisions with your team.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-space">
        <div className="page-shell">
          <div className="grid gap-8 md:grid-cols-[1fr_1.6fr]">
            <SectionLabel>Capabilities</SectionLabel>
            <div><h2 className="section-title">Our core consulting services.</h2><p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">From strategy to systems, we assemble the right expertise around the outcome—not the org chart.</p></div>
          </div>
          <div className="mt-16 border-t border-ink/15">
            {services.map(({ number, title, body, icon: Icon }) => (
              <article key={title} className="service-row group">
                <span className="text-xs text-muted-foreground">{number}</span>
                <span className="service-icon"><Icon className="size-5" /></span>
                <h3 className="font-display text-2xl font-semibold md:text-3xl">{title}</h3>
                <p className="max-w-md text-sm leading-6 text-muted-foreground">{body}</p>
                <ArrowDownRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-soft-blue">
        <div className="page-shell text-center">
          <SectionLabel>Connected by design</SectionLabel>
          <h2 className="section-title mx-auto mt-8 max-w-2xl">Your entire tech stack—fully connected.</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground">We join the systems your business relies on, removing fragile handoffs and creating a clear operational picture.</p>
          <div className="integration-map mt-16" aria-label="Technology integrations illustration">
            <div className="integration-line" />
            {[
              ["AWS", Cloud], ["API", Braces], ["DATA", Database], ["AI", Sparkles], ["FAST", Zap], ["SAFE", ShieldCheck],
            ].map(([label, Icon], i) => (
              <div key={label as string} className={`integration-node node-${i + 1}`}>
                <Icon className="size-5" /><span>{label as string}</span>
              </div>
            ))}
            <div className="integration-core"><Asterisk className="size-6" /><strong>Putech</strong></div>
          </div>
        </div>
      </section>

      <section id="work" className="section-space">
        <div className="page-shell">
          <div className="grid items-end gap-8 md:grid-cols-2">
            <div><SectionLabel>Selected work</SectionLabel><h2 className="section-title mt-8">Work that moved the needle.</h2></div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground md:justify-self-end">A selection of digital systems and product experiences made with ambitious organisations.</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-[1.4fr_0.6fr]">
            <article className="project-feature group">
              <img src={teamImage} alt="Technology team collaborating around a laptop" width={1408} height={1008} loading="lazy" />
              <div className="project-caption"><span>Finance · 2026</span><h3>Rebuilding trust into every transaction.</h3><ArrowDownRight className="size-5" /></div>
            </article>
            <article className="project-feature group">
              <img src={projectImage} alt="Product designers reviewing a mobile experience" width={1200} height={1504} loading="lazy" />
              <div className="project-caption"><span>Product · 2025</span><h3>A simpler operating system for field teams.</h3><ArrowDownRight className="size-5" /></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-ink/10 bg-ink text-surface">
        <div className="page-shell grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <img className="aspect-[1.15] w-full object-cover" src={securityImage} alt="Security specialist connecting a hardware security key" width={1408} height={912} loading="lazy" />
          <div className="md:pl-10">
            <SectionLabel inverse>Security, built in</SectionLabel>
            <h2 className="section-title mt-8 text-surface">Move fast without leaving the door open.</h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-surface/60">We make security part of the design and engineering process—not a late-stage checklist. Your teams gain confidence without losing momentum.</p>
            <a href="#contact" className="button-light mt-10">Discuss your security <ArrowRight className="size-4" /></a>
          </div>
        </div>
      </section>

      <section id="insights" className="section-space">
        <div className="page-shell">
          <div className="flex items-end justify-between gap-6"><div><SectionLabel>Thinking</SectionLabel><h2 className="section-title mt-8">Insights & ideas.</h2></div><a href="#insights-list" className="button-outline hidden sm:inline-flex">All insights <ArrowRight className="size-4" /></a></div>
          <div id="insights-list" className="mt-14 grid border-t border-ink/15 md:grid-cols-3">
            {insights.map(([category, title, time], i) => (
              <article key={title} className="insight-item">
                <div className={`insight-visual visual-${i + 1}`}><span>{String(i + 1).padStart(2, "0")}</span><Braces className="size-9" /></div>
                <div className="mt-6 flex justify-between text-[0.65rem] font-semibold uppercase text-muted-foreground"><span>{category}</span><span>{time}</span></div>
                <h3 className="mt-4 font-display text-xl font-semibold leading-tight">{title}</h3>
                <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold">Read perspective <ChevronRight className="size-3.5" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-soft-blue">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <img className="aspect-[1.08] w-full object-cover object-center" src={founderImage} alt="Technology founder in a bright design studio" width={1200} height={1104} loading="lazy" />
          <div className="lg:px-12">
            <SectionLabel>Client perspective</SectionLabel>
            <div className="mt-9 font-display text-6xl leading-none text-primary">“</div>
            <blockquote className="font-display text-3xl font-semibold leading-tight md:text-4xl">Putech didn’t just deliver a platform. They gave our team the confidence to think bigger.</blockquote>
            <p className="mt-7 text-sm leading-7 text-muted-foreground">The work was unusually clear and collaborative. Every decision tied back to the real problem, and the quality of the result changed what we thought was possible.</p>
            <div className="mt-8 flex items-center gap-4 border-t border-ink/15 pt-6"><span className="grid size-10 place-items-center rounded-full bg-lime font-display text-sm font-bold">EB</span><div><strong className="block text-sm">Emery Bryan</strong><span className="text-xs text-muted-foreground">Founder, Northbank</span></div></div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-space bg-primary text-primary-foreground">
        <div className="page-shell">
          <SectionLabel inverse>Start a conversation</SectionLabel>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            <div><h2 className="font-display text-[clamp(3.3rem,7vw,7rem)] font-semibold leading-[0.88]">Let’s build what’s next.</h2><p className="mt-8 max-w-md text-sm leading-7 text-primary-foreground/70">Tell us what you’re working through. We’ll bring a senior perspective and a clear next step.</p></div>
            <div className="flex flex-col justify-end border-t border-primary-foreground/25 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <span className="text-xs uppercase text-primary-foreground/60">New business</span>
              <a href="mailto:hello@putech.co" className="mt-3 font-display text-2xl font-semibold md:text-3xl">hello@putech.co</a>
              <a href="mailto:hello@putech.co" className="button-light mt-8 w-fit">Start a project <ArrowRight className="size-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-ink py-10 text-surface">
        <div className="page-shell flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div><Logo /><p className="mt-4 max-w-xs text-xs leading-5 text-surface/45">Secure digital products and connected technology for ambitious organisations.</p></div>
          <div className="flex gap-6 text-xs text-surface/60"><a href="#top">Top</a><a href="#services">Services</a><a href="#work">Work</a></div>
          <span className="text-[0.65rem] text-surface/35">© 2026 Putech</span>
        </div>
      </footer>
    </main>
  );
}