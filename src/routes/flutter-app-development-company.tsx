import { createFileRoute } from "@tanstack/react-router";
import { Check, Smartphone, Zap } from "lucide-react";

import NaethraContentPage, { ContentSection } from "@/components/NaethraContentPage";
import { getFlutterContent } from "@/lib/wordpress";
import flutterHeroImage from "@/assets/flutter/hero.png";

export const Route = createFileRoute("/flutter-app-development-company")({
  loader: async () => getFlutterContent(),
  component: FlutterPage,
});

function FlutterPage() {
  const content = Route.useLoaderData();

  return (
    <NaethraContentPage
      eyebrow={content.eyebrow}
      title={content.title}
      intro={content.intro}
      heroBannerImage={flutterHeroImage}
    >
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
        <a href="/30-mins-meeting" className="button button-orange content-inline-cta">
          Schedule a meet <span aria-hidden="true">→</span>
        </a>
      </ContentSection>
    </NaethraContentPage>
  );
}
