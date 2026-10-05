import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CloudArrowUp, Code, Database } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type ComponentType } from "react";

import aboutElevateImage from "@/assets/design/about-section/about-elevate.jpg";
import aboutInnovateImage from "@/assets/design/about-section/about-innovate.jpg";
import aboutIntegrateImage from "@/assets/design/about-section/about-integrate.jpg";
import muraliImage from "@/assets/founders/Murali_Ramakrishnan.webp";
import npMuraliImage from "@/assets/founders/NP_Murali.webp";
import ramachandranImage from "@/assets/founders/Ramachandran.webp";
import { NaethraContentHeader } from "@/components/NaethraContentPage";
import { getAboutContent } from "@/lib/wordpress";

export const Route = createFileRoute("/about/")({
  loader: async () => getAboutContent(),
  component: AboutPage,
});

type IconComponent = ComponentType<{ size?: number; weight?: "regular" | "bold" | "duotone" }>;

const serviceIcons: Record<string, IconComponent> = {
  "Website Development": Code,
  "PHP/MySQL Applications": Database,
  "Cloud Solutions": CloudArrowUp,
};

const teamImages: Record<string, string> = {
  "Murali Ramakrishnan": muraliImage,
  "NP Murali": npMuraliImage,
  Ramachandran: ramachandranImage,
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

function AboutPage() {
  const about = Route.useLoaderData();
  const reduceMotion = useReducedMotion();
  const [activeService, setActiveService] = useState(0);

  const motionProps = reduceMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <main className="about-modern overflow-x-hidden w-full max-w-full">
      <NaethraContentHeader />

      <section className="about-modern-hero">
        <div className="site-container about-modern-hero-grid">
          <motion.div
            className="about-modern-hero-copy"
            variants={stagger}
            {...motionProps}
          >
            <motion.p className="about-modern-brand" variants={fadeUp}>
              Naethra Technologies
            </motion.p>
            <motion.h1 variants={fadeUp}>
              Build systems that
              <span> keep growing</span> with the business.
            </motion.h1>
            <motion.p className="about-modern-hero-lead" variants={fadeUp}>
              {about.specialtyLead}
            </motion.p>
            <motion.div className="about-modern-hero-actions" variants={fadeUp}>
              <a href="#team" className="about-modern-btn about-modern-btn-dark">
                Meet the team
              </a>
              <a href="/contact-us" className="about-modern-btn about-modern-btn-line">
                Start a project
                <ArrowUpRight size={18} weight="bold" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="about-modern-hero-media"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="about-modern-hero-frame about-modern-hero-frame-a">
              <img src={aboutInnovateImage} alt="" width={1200} height={1104} />
            </div>
            <div className="about-modern-hero-frame about-modern-hero-frame-b">
              <img src={aboutIntegrateImage} alt="" width={1408} height={1008} />
            </div>
            <div className="about-modern-hero-frame about-modern-hero-frame-c">
              <img src={aboutElevateImage} alt="" width={1200} height={1504} />
            </div>
            <div className="about-modern-hero-stat">
              <strong>
                20<span>+</span>
              </strong>
              <span>years shipping software</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="specialty" className="about-modern-specialty">
        <div className="site-container about-modern-specialty-grid">
          <motion.div
            className="about-modern-specialty-visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={aboutElevateImage}
              alt="Teams collaborating on modern technology delivery"
              width={1200}
              height={1504}
            />
          </motion.div>
          <motion.div className="about-modern-specialty-copy" variants={stagger} {...motionProps}>
            <motion.h2 variants={fadeUp}>{about.specialtyHeadline}</motion.h2>
            <motion.p variants={fadeUp}>{about.specialtyCopy}</motion.p>
            <motion.ul className="about-modern-pillars" variants={fadeUp}>
              <li>Custom data tools</li>
              <li>Web & mobile delivery</li>
              <li>Long-term support</li>
            </motion.ul>
          </motion.div>
        </div>
      </section>

      <section id="services" className="about-modern-services">
        <div className="site-container">
          <motion.div className="about-modern-section-head" variants={stagger} {...motionProps}>
            <motion.h2 variants={fadeUp}>
              Passion rendered
              <br />
              <em>in our services.</em>
            </motion.h2>
            <motion.p variants={fadeUp}>
              Focused capabilities that turn requirements into durable products.
            </motion.p>
          </motion.div>

          <div
            className="about-modern-accordion"
            onMouseLeave={() => setActiveService(0)}
          >
            {about.services.map((service, index) => {
              const Icon = serviceIcons[service.title] ?? Code;
              const isActive = activeService === index;
              return (
                <motion.article
                  key={service.title}
                  className={`about-modern-accordion-item ${isActive ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                  tabIndex={0}
                  layout
                  transition={{ type: "spring", stiffness: 120, damping: 22 }}
                >
                  <div className="about-modern-accordion-top">
                    <span className="about-modern-accordion-icon" aria-hidden="true">
                      <Icon size={22} weight="duotone" />
                    </span>
                    <h3>{service.title}</h3>
                    <ArrowUpRight size={20} weight="bold" className="about-modern-accordion-arrow" />
                  </div>
                  <p>{service.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="team" className="about-modern-team">
        <div className="site-container">
          <motion.div className="about-modern-section-head about-modern-team-head" variants={stagger} {...motionProps}>
            <motion.h2 variants={fadeUp}>
              People behind
              <br />
              <em>the work.</em>
            </motion.h2>
            <motion.p variants={fadeUp}>
              Leadership that pairs delivery discipline with product judgment.
            </motion.p>
          </motion.div>

          <div className="about-modern-team-stack">
            {about.team.map((member, index) => (
              <motion.article
                className={`about-modern-team-card about-modern-team-card-${index + 1}`}
                key={`${member.name}-${member.role}-${index}`}
                initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.06,
                }}
              >
                <div className="about-modern-team-photo">
                  <img
                    src={member.image || teamImages[member.name] || muraliImage}
                    alt={member.name}
                    width={1200}
                    height={1104}
                  />
                </div>
                <div className="about-modern-team-copy">
                  <span>{member.role}</span>
                  <h3>{member.name}</h3>
                  <p>{member.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-modern-cta">
        <div className="site-container about-modern-cta-inner">
          <div>
            <h2>Ready to build the next release?</h2>
            <p>Share the problem space. We will map the stack, timeline, and delivery model.</p>
          </div>
          <a href="/contact-us" className="about-modern-btn about-modern-btn-dark">
            Talk to us
            <ArrowUpRight size={18} weight="bold" />
          </a>
        </div>
      </section>
    </main>
  );
}
