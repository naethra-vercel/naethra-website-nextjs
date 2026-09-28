import { ArrowUpRight, Award, CheckCircle2 } from "lucide-react";

import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";
import type { ServiceDetail } from "@/lib/service-data";

export default function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  return (
    <main className="service-detail-page">
      <NaethraContentHeader />
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
      <article className="service-detail-content">
        <div className="site-container service-detail-intro">
          <p>{service.intro}</p>
          <a className="button button-orange" href="/contact-us">
            Talk to us <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        {service.certifications && (
          <section className="service-detail-certification-section">
            <div className="site-container">
              <div className="service-detail-certification-header">
                <span className="certification-badge-pill">
                  <Award size={16} aria-hidden="true" /> Official Certifications
                </span>
                <h2>{service.certifications.title}</h2>
                {service.certifications.description && (
                  <p>{service.certifications.description}</p>
                )}
              </div>
              <div className="service-detail-certification-banner-card">
                <img
                  src={service.certifications.image}
                  alt="Claris Partner & Certified FileMaker Developer Credentials"
                  className="certification-banner-img"
                  loading="lazy"
                />
              </div>
              {service.certifications.badges && (
                <div className="service-detail-certification-badges-grid">
                  {service.certifications.badges.map((badge) => (
                    <div key={badge.version} className="certification-badge-item">
                      <div className="badge-icon">
                        <CheckCircle2 size={16} aria-hidden="true" />
                      </div>
                      <div className="badge-text">
                        <span className="badge-version">{badge.version}</span>
                        <span className="badge-title">{badge.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

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
