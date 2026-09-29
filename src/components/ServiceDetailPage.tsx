import { ArrowUpRight } from "lucide-react";

import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";
import type { ServiceDetail } from "@/lib/service-data";

export default function ServiceDetailPage({
  service,
  heroBanner = false,
}: {
  service: ServiceDetail;
  heroBanner?: boolean;
}) {
  return (
    <main className="service-detail-page">
      <NaethraContentHeader />
      {heroBanner ? (
        <section className="service-detail-hero service-detail-hero-banner">
          <h1 className="sr-only">{service.title}</h1>
          <img
            className="service-detail-hero-banner-img"
            src={service.heroImage}
            alt=""
          />
        </section>
      ) : (
        <section className="service-detail-hero">
          <div
            className="service-detail-hero-image"
            style={{ backgroundImage: `url(${service.heroImage})` }}
          />
          <div className="service-detail-hero-overlay" />
          <div className="site-container service-detail-hero-copy">
            <p className="service-eyebrow">{service.eyebrow}</p>
            <h1>{service.title}</h1>
          </div>
        </section>
      )}
      <article className="service-detail-content">
        <div className="site-container service-detail-intro">
          <p>{service.intro}</p>
          <a className="button button-orange" href="/contact-us">
            Talk to us <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        {service.sections.map((section, index) => (
          <section
            className={`service-detail-section ${index % 2 ? "is-soft" : ""}`}
            key={section.title}
          >
            <div className="site-container service-detail-section-inner">
              <div>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
              {section.image && <img src={section.image} alt="" loading="lazy" />}
            </div>
          </section>
        ))}
      </article>
      <SiteFooter className="service-page-footer" />
    </main>
  );
}
