import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Eye,
  FileText,
  Layers3,
  Settings,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";
import angularIcon from "@/assets/icons/Angular.svg";
import javaScriptIcon from "@/assets/icons/JavaScript.svg";
import javaIcon from "@/assets/icons/Java.svg";
import nodeIcon from "@/assets/icons/Node.js.svg";
import phpIcon from "@/assets/icons/PHP.svg";
import reactIcon from "@/assets/icons/React.svg";
import dotNetIcon from "@/assets/icons/NET.svg";
import { getWebAppContent } from "@/lib/wordpress";

export const Route = createFileRoute("/web-app")({
  loader: async () => getWebAppContent(),
  component: WebAppPage,
});

const outsourcingIcons: Record<string, LucideIcon> = {
  Professionalism: BriefcaseBusiness,
  "An eye for detail": Eye,
  "An Eye for Detail": Eye,
  "On-time delivery": FileText,
  "On-Time Delivery": FileText,
};

const websiteIcons: Record<string, LucideIcon> = {
  "Everything under one roof": Layers3,
  "Everything Under One Roof": Layers3,
  Economical: WalletCards,
  "Low maintenance and support cost": Settings,
  "Low Maintenance and Support cost": Settings,
};

const technologies = [
  ["Angular", angularIcon],
  ["React", reactIcon],
  ["Node.js", nodeIcon],
  ["JavaScript", javaScriptIcon],
  ["PHP", phpIcon],
  [".NET", dotNetIcon],
  ["Java", javaIcon],
] as const;

function WebAppPage() {
  const content = Route.useLoaderData();

  return (
    <main className="web-app-page">
      <NaethraContentHeader />
      <section className="web-app-hero">
        <div className="web-app-hero-image" />
        <div className="web-app-hero-overlay" />
      </section>

      <section className="web-app-quote-band">
        <div className="site-container web-app-quote-inner">
          <img
            src="https://naethra.com/wp-content/uploads/2022/09/web-app-img.jpg"
            alt="Web application interface on a laptop"
          />
          <div>
            <h1>{content.quoteTitle}</h1>
            <p>{content.quoteSubtitle}</p>
            <a className="button button-orange" href="/contact-us">
              Contact us <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="web-app-intro">
        <div className="site-container web-app-narrow">
          <p className="web-app-eyebrow">{content.introEyebrow}</p>
          <h2>{content.introTitle}</h2>
          {content.introParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <ReasonSection
        className="web-app-reasons web-app-purple-section"
        eyebrow="Why outsource"
        title={content.outsourcingTitle}
        reasons={content.outsourcingReasons.map((reason) => ({
          ...reason,
          icon: outsourcingIcons[reason.title] ?? BriefcaseBusiness,
        }))}
      />

      <section className="web-app-tech">
        <div className="site-container">
          <p className="web-app-eyebrow">Our toolkit</p>
          <h2>{content.techTitle}</h2>
          <div className="web-app-tech-grid">
            {technologies.map(([label, icon]) => (
              <div className="web-app-tech-item" key={label}>
                <span>
                  <img src={icon} alt="" />
                </span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReasonSection
        className="web-app-reasons web-app-purple-section web-app-website-reasons"
        eyebrow="Website development company"
        title={content.websiteTitle}
        reasons={content.websiteReasons.map((reason) => ({
          ...reason,
          icon: websiteIcons[reason.title] ?? Layers3,
        }))}
      />

      <section className="web-app-closing">
        <div className="site-container web-app-narrow">
          <p>{content.closingText}</p>
          <a className="button button-orange" href="/contact-us">
            Contact us <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
      <SiteFooter className="web-app-footer" />
    </main>
  );
}

function ReasonSection({
  className,
  eyebrow,
  title,
  reasons,
}: {
  className: string;
  eyebrow: string;
  title: string;
  reasons: Array<{ title: string; text: string; icon: LucideIcon }>;
}) {
  return (
    <section className={className}>
      <div className="site-container web-app-reasons-inner">
        <p className="web-app-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="web-app-reason-list">
          {reasons.map(({ title: reasonTitle, text, icon: Icon }) => (
            <article className="web-app-reason" key={reasonTitle}>
              <div className="web-app-reason-icon">
                <Icon size={20} aria-hidden="true" />
              </div>
              <div>
                <h3>{reasonTitle}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
