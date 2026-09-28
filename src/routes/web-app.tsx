import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Eye,
  FileText,
  Layers3,
  Settings,
  WalletCards,
} from "lucide-react";

import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";
import TechToolkitSection from "@/components/TechToolkitSection";
import WhyOutsourceSection from "@/components/WhyOutsourceSection";
import heroImage from "@/assets/web/hero.png";

export const Route = createFileRoute("/web-app")({ component: WebAppPage });

const websiteReasons = [
  {
    title: "Everything under one roof",
    icon: Layers3,
    text: "A high-quality web application should feel user-friendly, consistent with your brand, and ready for the digital age. Our teams bring design, development, testing, and deployment together so you do not have to coordinate several vendors for one product.",
  },
  {
    title: "Economical",
    icon: WalletCards,
    text: "Web development companies in India provide technologically advanced solutions at an affordable cost. You get access to designers, coders, and specialists when you need them, without carrying the overhead of building a complete in-house team.",
  },
  {
    title: "Low maintenance and support cost",
    icon: Settings,
    text: "Custom web applications must stay operational around the clock. Experienced developers can provide the support and maintenance needed to protect performance, resolve issues quickly, and keep your application useful as the business grows.",
  },
];

function WebAppPage() {
  return (
    <main className="web-app-page">
      <NaethraContentHeader />
      <section className="web-app-hero">
        <div
          className="web-app-hero-image"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="web-app-hero-overlay" />
      </section>

      <section className="web-app-quote-band">
        <div className="site-container web-app-quote-inner">
          <img
            src="https://naethra.com/wp-content/uploads/2022/09/web-app-img.jpg"
            alt="Web application interface on a laptop"
          />
          <div>
            <h1>Planning to create a web application?</h1>
            <p>Share your requirements to receive a quote.</p>
            <a className="button button-orange" href="/contact-us">
              Contact us <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="web-app-intro">
        <div className="site-container web-app-narrow">
          <p className="web-app-eyebrow">Outsourced software development</p>
          <h2>Build with a team that understands the whole picture.</h2>
          <p>
            Naethra is a creative web development company. We design, develop, and maintain
            responsive web and mobile applications. We crystallise business requirements, build,
            test, and securely deploy the applications.
          </p>
          <p>
            We build websites that leverage powerful technologies like PHP, HTML, Ajax, jQuery,
            DotNet, and JavaScript to help our clients stand out from the crowd.
          </p>
          <p>
            By working with custom software development teams, you can save the time and hassle of a
            lengthy hiring process while avoiding the cost of training and managing an in-house
            team. Based on your budget, business requirements, and objectives, you can select the
            best engagement model.
          </p>
        </div>
      </section>

      <WhyOutsourceSection />

      <TechToolkitSection />

      <ReasonSection
        className="web-app-reasons web-app-purple-section web-app-website-reasons"
        eyebrow="Website development company"
        title="Everything your web application needs"
        reasons={websiteReasons}
      />

      <section className="web-app-closing">
        <div className="site-container web-app-narrow">
          <p>
            If you are looking for a software development company that suits your budget and meets
            your expectations, Naethra Technologies is the right outsourcing partner for you. Time
            and materials contracts, fixed bids, outstaffing, and dedicated teams are some of the
            advantages you get by outsourcing your software development to us.
          </p>
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
  reasons: Array<{ title: string; text: string; icon: typeof BriefcaseBusiness }>;
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
