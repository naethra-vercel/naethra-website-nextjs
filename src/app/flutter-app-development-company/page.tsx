import { Check, Smartphone, Zap } from "lucide-react";

import flutterHeroImage from "@/assets/flutter/hero.png";
import { ContentSection, NaethraContentHeader } from "@/components/NaethraContentPage";
import TalkToUsSection from "@/components/TalkToUsSection";
import UniqueAccordion from "@/components/UniqueAccordion";
import { getFlutterContent } from "@/lib/wordpress";
import { assetSrc } from "@/lib/asset-src";

export const revalidate = 60;

export default async function Page() {
  const content = await getFlutterContent();

  return (
    <main className="content-page flutter-page">
      <NaethraContentHeader />
      <section className="content-page-hero content-page-hero-banner">
        <h1 className="sr-only">{content.aboutTitle}</h1>
        <img
          className="content-page-hero-banner-img"
          src={assetSrc(flutterHeroImage)}
          alt=""
        />
      </section>

      <TalkToUsSection>{content.lead}</TalkToUsSection>

      <article className="content-page-body site-container">
        <div className="content-callout">
          <div>
            <p className="content-page-eyebrow">Flutter</p>
            <h2>{content.aboutTitle}</h2>
            <p>{content.lead}</p>
            <div className="content-check-list flutter-highlights">
              {content.highlights.map((item) => (
                <p key={item}>
                  <Check size={19} aria-hidden="true" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="content-callout-mark">
            <Smartphone size={42} strokeWidth={1.4} aria-hidden="true" />
            <Zap size={22} aria-hidden="true" />
          </div>
        </div>

        <ContentSection title={content.aboutTitle}>
          <p className="content-page-eyebrow">{content.aboutEyebrow}</p>
          <p>{content.aboutBody}</p>
          <ul className="flutter-offer-list">
            {content.offeringItems.map((item) => (
              <li key={item.title}>
                <strong>{item.title}:</strong> {item.body}
              </li>
            ))}
          </ul>
          <p>{content.aboutClosing}</p>
        </ContentSection>

        <ContentSection title={content.servicesTitle}>
          <p>{content.servicesIntro}</p>
          <div className="flutter-card-grid">
            {content.services.map((service) => (
              <article className="flutter-card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            ))}
          </div>
        </ContentSection>

        <ContentSection title={content.hireTitle}>
          <p>{content.hireBody}</p>
          <div className="flutter-chip-row">
            {content.integrations.map((item) => (
              <span className="flutter-chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </ContentSection>

        <ContentSection title={content.reasonsTitle}>
          <p>{content.reasonsIntro}</p>
          <div className="flutter-card-grid flutter-card-grid-2">
            {content.reasons.map((reason) => (
              <article className="flutter-card" key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.body}</p>
              </article>
            ))}
          </div>
        </ContentSection>

        <ContentSection title={content.whyTitle}>
          <p>{content.whyIntro}</p>
          <div className="flutter-card-grid flutter-card-grid-2">
            {content.whyPoints.map((point) => (
              <article className="flutter-card" key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </ContentSection>

        <ContentSection title={content.comprehensiveTitle}>
          <p>{content.comprehensiveBody}</p>
          <a href="/30-mins-meeting" className="talk-to-us-button content-inline-cta">
            30 Mins Meeting
          </a>
        </ContentSection>

        <ContentSection title="Frequently Asked Questions">
          <UniqueAccordion
            items={content.faqs.map((faq, index) => ({
              id: `faq-${index + 1}`,
              title: faq.question,
              content: faq.answer,
            }))}
          />
        </ContentSection>

        <ContentSection title={content.testimonialsTitle}>
          <div className="flutter-quote-grid">
            {content.testimonials.map((item) => (
              <blockquote className="flutter-quote" key={item.name}>
                <p>“{item.quote}”</p>
                <footer>
                  <strong>{item.name}</strong>
                  <span>{item.location}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <a href="/contact-us" className="talk-to-us-button content-inline-cta">
            Talk to us
          </a>
        </ContentSection>
      </article>
    </main>
  );
}
