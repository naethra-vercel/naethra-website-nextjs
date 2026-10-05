import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Cloud, Code2, Database, type LucideIcon } from "lucide-react";
import { useEffect } from "react";

import muraliImage from "@/assets/founders/Murali_Ramakrishnan.webp";
import npMuraliImage from "@/assets/founders/NP_Murali.webp";
import ramachandranImage from "@/assets/founders/Ramachandran.webp";
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

      <section
        id="specialty"
        className="relative isolate overflow-hidden bg-[#f4f7fc] pt-[clamp(5rem,9vw,8rem)] pb-10 sm:pb-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 size-[28rem] rounded-full bg-[radial-gradient(circle,rgb(0_91_150/0.14),transparent_68%)] blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-0 size-[22rem] rounded-full bg-[radial-gradient(circle,rgb(20_32_51/0.06),transparent_70%)] blur-2xl"
        />

        <div className="site-container relative">
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="flex flex-col gap-6 sm:gap-8">
              <SectionEyebrow>Our specialty</SectionEyebrow>
              <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
                <h2 className="max-w-3xl !font-display text-[clamp(2.4rem,5.5vw,4.75rem)] !font-semibold !leading-[0.95] !tracking-[-0.07em] !text-[#142033]">
                  {about.specialtyHeadline}
                </h2>
                <p className="max-w-md text-base leading-relaxed text-[#4b5870] sm:text-lg lg:pb-2">
                  {about.specialtyLead}
                </p>
              </div>
            </div>

            <div className="relative border-t border-[#005b96]/15 pt-6 lg:pt-8">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-0.5 w-20 bg-[#005b96] sm:w-28"
              />
              <p className="max-w-3xl text-[0.95rem] leading-[1.8] text-[#637086] sm:text-base">
                {about.specialtyCopy}
              </p>
            </div>
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
                key={`${member.name}-${member.role}-${index}`}
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
    </main>
  );
}
