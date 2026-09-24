import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";
import { services } from "@/lib/service-data";

export const Route = createFileRoute("/services/")({ component: ServicesPage });

function ServicesPage() {
  return (
    <main className="services-page">
      <NaethraContentHeader />
      <section className="services-hero">
        <div className="services-hero-image" />
        <div className="services-hero-overlay" />
      </section>
      <section className="services-index site-container">
        <p className="service-eyebrow">What we do</p>
        <h1>Technology that works for the way you work.</h1>
        <div className="services-grid">
          {services.map(({ title, description, href, icon: Icon }) => (
            <Link className="service-tile" to={href} key={title}>
              <Icon size={24} aria-hidden="true" />
              <h2>{title}</h2>
              <p>{description}</p>
              <span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="services-cta">
        <div className="site-container">
          <p className="service-eyebrow">Start with the real problem</p>
          <h2>Tell us what you are trying to make better.</h2>
          <a className="button button-orange" href="/contact-us">
            Contact us <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
      <SiteFooter className="service-page-footer" />
    </main>
  );
}
