import { Check, Smartphone, Zap } from "lucide-react";

import { RouteLoading } from "@/components/RouteLoading";
import { useAsyncResource } from "@/hooks/use-async-resource";
import { useDocumentTitle } from "@/hooks/use-document-title";
import flutterHeroImage from "@/assets/flutter/hero.png";
import { ContentSection, NaethraContentHeader } from "@/components/NaethraContentPage";
import TalkToUsSection from "@/components/TalkToUsSection";
import { getFlutterContent } from "@/lib/wordpress";
import { assetSrc } from "@/lib/asset-src";

export default function FlutterPage() {
  useDocumentTitle("Naethra Technologies");
  const state = useAsyncResource(() => getFlutterContent(), []);
  if (state.status === "loading") return <RouteLoading />;
  if (state.status === "error" || !state.data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p>Unable to load this page right now.</p>
      </div>
    );
  }
  const content = state.data;


  return (
    <main className="content-page flutter-page">
      <NaethraContentHeader />
      <section className="content-page-hero content-page-hero-banner">
        <h1 className="sr-only">{content.title}</h1>
        <img
          className="content-page-hero-banner-img"
          src={assetSrc(flutterHeroImage)}
          alt=""
        />
      </section>
      <TalkToUsSection>{content.intro}</TalkToUsSection>
      <article className="content-page-body site-container">
        <div className="content-callout">
          <div>
            <p className="content-page-eyebrow">{content.calloutEyebrow}</p>
            <h2>{content.calloutTitle}</h2>
            <p>{content.calloutBody}</p>
          </div>
          <div className="content-callout-mark">
            <Smartphone size={42} strokeWidth={1.4} aria-hidden="true" />
            <Zap size={22} aria-hidden="true" />
          </div>
        </div>
        <ContentSection title={content.benefitsTitle}>
          <div className="content-check-list">
            {content.benefits.map((benefit) => (
              <p key={benefit}>
                <Check size={19} aria-hidden="true" />
                {benefit}
              </p>
            ))}
          </div>
        </ContentSection>
        <ContentSection title={content.closingTitle}>
          <p>{content.closingBody}</p>
          <a href="/contact-us" className="talk-to-us-button content-inline-cta">
            Talk to us
          </a>
        </ContentSection>
      </article>
    </main>
  );
}
