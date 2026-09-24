import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import projectImage from "@/assets/putech-project.jpg";
import muraliImage from "@/assets/founders/Murali_Ramakrishnan.webp";
import npMuraliImage from "@/assets/founders/NP_Murali.webp";
import ramachandranImage from "@/assets/founders/Ramachandran.webp";

export const Route = createFileRoute("/about/")({
  component: AboutPage,
});

const services = [
  ["◎", "Website Development", "Our skilled and experienced development team offers a rich set of possible technology and user interface solutions, whatever your needs."],
  ["◇", "PHP/MySQL Applications", "PHP is a widely-used general-purpose scripting language that is especially suited for Web development."],
  ["☁", "Cloud Solutions", "Cloud computing is the delivery of computing services, including servers, storage, databases, and networking."],
] as const;

const teamMembers = [
  ["Murali Ramakrishnan", "CEO", muraliImage, "Murali Ramakrishnan holds a Bachelors degree in Computer Science and has an overall industry experience of 18 years. He has spent over 11 years with Tata Consultancy Services (TCS). He has worked in large IT Development projects and managed delivery for several large engagements. He was involved in setting up the offshore delivery center of Barclays. His areas of expertise include managing large delivery centers, transition management and Business Process Outsourcing (BPO) delivery. He has worked for client organizations such as Nedcor Group, Qwest, Concert, AT&T, among others."],
  ["NP Murali", "COO", npMuraliImage, "NP Murali (NP) holds a Bachelors degree in Mechanical Engineering and has a Masters Degree in Business Administration. He has worked with Tata Consultancy Services (TCS) for 5+ years executing projects in Activity Based Management (ABM), Business Process Reengineering (BPR) and BPO delivery. His areas of expertise include relationship management, transition management and development of new business lines in BPO and conceptualizing service guidelines for Finance & accounting (F&A) processes. NP has 11+ years of industry experience and has worked in IDBI Bank, ISRO and India Pistons Ltd."],
  ["Ramachandran", "CFO", ramachandranImage, "Ramachandran holds a degree in Commerce and has about 20 years of experience in Business Management. He is a first generation entrepreneur and has incubated several companies. He has extensive experience in managing the finance function of large corporations in India and the Middle East."],
] as const;

const WORDPRESS_ABOUT_API = import.meta.env["VITE_WORDPRESS_API_URL"];

type WordPressAboutPage = {
  title?: { rendered?: string };
  content?: { rendered?: string };
};

function getWordPressText(markup: string) {
  if (typeof document === "undefined") return "";
  const container = document.createElement("div");
  container.innerHTML = markup;
  return container.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

function AboutPage() {
  const [wordpressPage, setWordpressPage] = useState<WordPressAboutPage | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    if (!WORDPRESS_ABOUT_API) return () => controller.abort();

    fetch(WORDPRESS_ABOUT_API, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((page: WordPressAboutPage | null) => {
        if (page) setWordpressPage(page);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  const wordpressTitle = getWordPressText(wordpressPage?.title?.rendered ?? "");
  const wordpressContent = getWordPressText(wordpressPage?.content?.rendered ?? "");

  return (
    <main className="about-max about-single-page">
      <header className="about-max-header">
        <div className="site-container about-max-nav">
          <a href="/" className="brand-mark" aria-label="Naethra Technologies home">
            <img src="/logo.png" alt="Naethra Technologies" className="brand-logo" width={220} height={49} />
          </a>
          <nav aria-label="About page sections" className="about-max-links">
            <span>About / 2026</span>
            <a href="#specialty">01 Specialty</a>
            <a href="#services">02 Services</a>
            <a href="#team">03 Team</a>
          </nav>
          <a href="/#contact" className="about-max-contact">Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <section className="about-max-hero">
        <div className="about-max-hero-grid">
          <div className="about-max-hero-copy">
            <span className="about-max-kicker">Independent technology partner</span>
            <h1>{wordpressTitle || <>About<br /><em>us.</em></>}</h1>
            <p>People, systems, and practical technology built to move ambitious teams forward.</p>
            <a href="#specialty" className="about-max-scroll">Scroll to explore <span aria-hidden="true">↓</span></a>
          </div>
          <div className="about-max-hero-media">
            <img src={projectImage} alt="Team working on a digital product" width={1200} height={1504} />
            <span className="about-max-media-label">Naethra / 01</span>
          </div>
        </div>
      </section>

      {wordpressContent && (
        <section className="about-max-api-content" aria-label="WordPress About content">
          <div className="site-container">
            <span className="about-max-kicker">From WordPress</span>
            <p>{wordpressContent}</p>
          </div>
        </section>
      )}

      <section id="specialty" className="about-max-specialty">
        <div className="site-container about-max-section-grid">
          <div className="about-max-section-index">01 <span>Our specialty</span></div>
          <div className="about-max-specialty-content">
            <h2>The efficient use of data technology at both the workgroup and enterprise levels.</h2>
            <p className="about-specialty-lead">The efficient use of data technology at both the workgroup and enterprise levels - with systems that are designed to keep growing with your business.</p>
            <p className="about-specialty-copy">To be an invaluable resource by helping you and your team get the maximum benefit of the customized data tools we develop with you, and making sure your team is getting the most out of those tools including MySQL, PostgreSQL, AJAX, PHP, Java and more for LAN/WAN, Web and mobile deployments. We have provided a variety of companies, organizations and industries worldwide with innovative and diverse custom development services.</p>
          </div>
        </div>
      </section>

      <section id="services" className="about-max-services">
        <div className="site-container">
          <div className="about-max-section-heading">
            <div className="about-max-section-index">02 <span>Our services</span></div>
            <h2>Passion rendered<br /><em>in our services.</em></h2>
          </div>
          <div className="about-max-service-list">
            {services.map(([icon, title, description], index) => (
              <article className="about-max-service-row" key={title}>
                <span className="about-max-service-number">0{index + 1}</span>
                <span className="about-max-service-icon" aria-hidden="true">{icon}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="about-max-service-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="about-max-team">
        <div className="site-container">
          <div className="about-max-section-heading about-max-team-heading">
            <div className="about-max-section-index">03 <span>Our team</span></div>
            <h2>People behind<br /><em>the work.</em></h2>
          </div>
          <div className="about-team-list">
            {teamMembers.map(([name, role, image, description], index) => (
              <article className={`about-max-team-card about-max-team-card-${index + 1}`} key={name}>
                <img src={image} alt={name} width={1200} height={1104} />
                <div>
                  <div className="about-max-team-meta"><span>0{index + 1}</span><span>{role}</span></div>
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <a href="/#contact" aria-label={`Contact about ${name}`}>Meet the team member <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="about-max-footer">
        <div className="site-container">
          <span>2026 © Copyrights <strong>Naethra Technologies</strong></span>
          <a href="/">Back to home <span aria-hidden="true">↗</span></a>
        </div>
      </footer>
    </main>
  );
}
