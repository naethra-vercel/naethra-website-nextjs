import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Cloud, Code2, Database, type LucideIcon } from "lucide-react";
import { useEffect } from "react";

import muraliImage from "@/assets/founders/Murali_Ramakrishnan.webp";
import npMuraliImage from "@/assets/founders/NP_Murali.webp";
import ramachandranImage from "@/assets/founders/Ramachandran.webp";
import SiteFooter from "@/components/SiteFooter";
import SectionEyebrow from "@/components/SectionEyebrow";
import { NaethraContentHeader } from "@/components/NaethraContentPage";
import { getAboutContent } from "@/lib/wordpress";

export const Route = createFileRoute("/about/")({
  loader: async () => getAboutContent(),
  component: AboutPage,
});

const serviceIcons: Record<string, LucideIcon> = {
  "Website Development": Code2,
  "PHP/MySQL Applications": Database,
  "Cloud Solutions": Cloud,
};

const teamImages: Record<string, string> = {
  "Murali Ramakrishnan": muraliImage,
  "NP Murali": npMuraliImage,
  Ramachandran: ramachandranImage,
};

function AboutPage() {
  const about = Route.useLoaderData();

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".about-max-team-card");

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 },
    );

    cards.forEach((card) => {
      card.classList.add("about-card-reveal");
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="about-max about-single-page">
      <NaethraContentHeader />

      <section id="specialty" className="about-max-specialty">
        <div className="site-container about-max-specialty-inner">
          <SectionEyebrow>Our specialty</SectionEyebrow>
          <div className="about-max-specialty-content">
            <h2>{about.specialtyHeadline}</h2>
            <p className="about-specialty-lead">{about.specialtyLead}</p>
            <p className="about-specialty-copy">{about.specialtyCopy}</p>
          </div>
        </div>
      </section>

      <section id="services" className="about-max-services">
        <div className="site-container">
          <div className="about-max-section-heading">
            <SectionEyebrow>Our services</SectionEyebrow>
            <h2>
              Passion rendered
              <br />
              <em>in our services.</em>
            </h2>
          </div>
          <div className="about-max-service-list">
            {about.services.map((service) => {
              const Icon = serviceIcons[service.title] ?? Code2;
              return (
                <article className="about-max-service-row" key={service.title}>
                  <span className="about-max-service-icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={1.6} />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ArrowUpRight
                    className="about-max-service-arrow"
                    aria-hidden="true"
                    size={22}
                    strokeWidth={1.6}
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="team" className="about-max-team">
        <div className="site-container">
          <div className="about-max-section-heading about-max-team-heading">
            <SectionEyebrow>Our team</SectionEyebrow>
            <h2>
              People behind
              <br />
              <em>the work.</em>
            </h2>
          </div>
          <div className="about-team-list">
            {about.team.map((member, index) => (
              <article
                className={`about-max-team-card about-max-team-card-${index + 1}`}
                key={member.name}
              >
                <img
                  src={member.image || teamImages[member.name] || muraliImage}
                  alt={member.name}
                  width={1200}
                  height={1104}
                />
                <div>
                  <div className="about-max-team-meta">
                    <span>{member.role}</span>
                  </div>
                  <h3>{member.name}</h3>
                  <p>{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter className="about-max-footer" />
    </main>
  );
}
