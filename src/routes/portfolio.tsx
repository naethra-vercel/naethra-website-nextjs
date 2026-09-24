import { createFileRoute } from "@tanstack/react-router";

import { NaethraContentHeader } from "@/components/NaethraContentPage";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import SiteFooter from "@/components/SiteFooter";
import { portfolioProjects } from "@/lib/portfolio-data";

export const Route = createFileRoute("/portfolio")({ component: PortfolioPage });

const technologiesByCategory: Record<string, string[]> = {
  ".Net": [".NET", "C#", "SQL"],
  CMS: ["CMS", "PHP", "MySQL"],
  CWP: ["FileMaker", "PHP", "API"],
  "Java/J2EE": ["Java", "J2EE", "PostgreSQL"],
  "Mobile App": ["Flutter", "Android", "iOS"],
  "Web App": ["React", "Node.js", "Cloud"],
};

function PortfolioPage() {
  return (
    <main className="portfolio-page">
      <NaethraContentHeader />
      <section className="portfolio-hero">
        <div className="site-container portfolio-hero-inner">
          <p className="portfolio-kicker">Selected work / Naethra Technologies</p>
          <h1>Useful systems for ambitious teams.</h1>
          <p>
            From mobile products and web platforms to operational tools, we design and build digital
            work that makes complex business simpler.
          </p>
        </div>
      </section>

      <section className="portfolio-index site-container" aria-label="Portfolio projects">
        <PortfolioCarousel
          projects={portfolioProjects.map((project, index) => ({
            id: `${project.category}-${index}-${project.title}`,
            title: project.title,
            technologies: technologiesByCategory[project.category] ?? [project.category],
            image: project.image,
            slug: project.href,
          }))}
        />
      </section>

      <SiteFooter className="content-page-footer portfolio-footer" />
    </main>
  );
}
