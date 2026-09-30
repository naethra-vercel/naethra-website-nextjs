import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";

import { NaethraContentHeader } from "@/components/NaethraContentPage";
import { getServicesPageContent } from "@/lib/wordpress";
import servicesHeaderImage from "@/assets/services/header.png";

export const Route = createFileRoute("/services/")({
  loader: async () => getServicesPageContent(),
  component: ServicesPage,
});

const servicePresentation: Record<
  string,
  { benefits: string[]; tags: string[]; focus: string }
> = {
  "iOS, Android and hybrid mobility applications": {
    benefits: [
      "Native and cross-platform mobile applications",
      "Product flows designed for real-world users",
      "Secure API and backend integrations",
      "Release support across iOS and Android",
    ],
    tags: ["Flutter", "iOS", "Android", "APIs"],
    focus: "Connected mobile products that people return to",
  },
  "Website development": {
    benefits: [
      "Full-stack web applications",
      "Responsive product and marketing experiences",
      "Technical SEO and performance foundations",
      "Custom portals and publishing systems",
    ],
    tags: ["React", "Vite", "PHP", "SEO"],
    focus: "High-performance web platforms and digital experiences",
  },
  "Content management system": {
    benefits: [
      "Flexible publishing workflows",
      "Custom WordPress and CMS implementations",
      "Analytics and third-party integrations",
      "Secure, maintainable content operations",
    ],
    tags: ["WordPress", "Joomla", "PHP", "MySQL"],
    focus: "Publishing systems that grow with your organisation",
  },
  "Java/J2EE applications": {
    benefits: [
      "Enterprise application architecture",
      "Reliable business process automation",
      "Secure service and database integrations",
      "Long-term support for critical systems",
    ],
    tags: ["Java", "J2EE", "APIs", "Enterprise"],
    focus: "Dependable software for complex business operations",
  },
  "PHP/MySQL applications": {
    benefits: [
      "Practical custom web applications",
      "Scalable database-backed workflows",
      "Secure authentication and integrations",
      "Performance tuning and ongoing support",
    ],
    tags: ["PHP", "MySQL", "Laravel", "APIs"],
    focus: "Useful applications built around the way your team works",
  },
  ".NET applications": {
    benefits: [
      "Custom Microsoft .NET applications",
      "Internal tools and enterprise workflows",
      "Robust integrations with existing systems",
      "Testing, deployment, and maintenance support",
    ],
    tags: [".NET", "C#", "Azure", "SQL"],
    focus: "Robust custom applications for growing teams",
  },
  "FileMaker development": {
    benefits: [
      "Custom FileMaker business applications",
      "Data modelling and workflow design",
      "FileMaker Data API integrations",
      "Hosting, maintenance, and support",
    ],
    tags: ["FileMaker", "Data API", "PHP", "Automation"],
    focus: "Business tools that make your data more useful",
  },
  "Custom web publishing with PHP": {
    benefits: [
      "Secure FileMaker web publishing",
      "Custom interfaces for business data",
      "PHP and API integration architecture",
      "Controlled access for distributed teams",
    ],
    tags: ["PHP", "FileMaker", "AJAX", "MySQL"],
    focus: "Your data, published exactly where your users need it",
  },
  "Cloud solutions": {
    benefits: [
      "Cloud infrastructure and application delivery",
      "Reliable deployment and monitoring workflows",
      "Security, backups, and operational support",
      "Scalable foundations for digital products",
    ],
    tags: ["AWS", "Cloud", "DevOps", "Support"],
    focus: "A dependable technical foundation for what comes next",
  },
};

function ServicesPage() {
  const content = Route.useLoaderData();

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".service-slide");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="services-page">
      <NaethraContentHeader />
      <section className="services-hero">
        <div
          className="services-hero-image"
          style={{ backgroundImage: `url(${servicesHeaderImage})` }}
        />
        <div className="services-hero-overlay" />
        <div className="services-hero-copy site-container">
          <p>{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <span>{content.subtitle}</span>
        </div>
      </section>
      <section className="services-index">
        <div className="services-index-inner site-container">
          <div className="services-card-list">
            {content.items.map(({ title, description, href }, index) => {
              const presentation = servicePresentation[title] ?? {
                benefits: [description],
                tags: [],
                focus: description,
              };

              return (
                <Link
                  className={`service-slide ${index % 2 === 1 ? "service-slide-blue" : ""}`}
                  to={href}
                  key={title}
                >
                  <div className="service-slide-main">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <div className="service-slide-focus">
                      <span>Focus</span>
                      <strong>{presentation.focus}</strong>
                    </div>
                  </div>
                  <div className="service-slide-details">
                    <h3>What you get</h3>
                    <ul>
                      {presentation.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                    <div className="service-slide-tags">
                      {presentation.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <span className="service-slide-link">
                      Start a project <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
