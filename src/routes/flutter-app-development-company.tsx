import { createFileRoute } from "@tanstack/react-router";
import { Check, Smartphone, Zap } from "lucide-react";

import NaethraContentPage, { ContentSection } from "@/components/NaethraContentPage";

export const Route = createFileRoute("/flutter-app-development-company")({
  component: FlutterPage,
});

const benefits = [
  "One codebase for iOS and Android",
  "Fast, expressive interfaces",
  "A flexible foundation for future web and mobile experiences",
  "Support for upgrades, fixes, and extensions after launch",
];

function FlutterPage() {
  return (
    <NaethraContentPage
      eyebrow="Flutter application development"
      title="Build innovative apps with Flutter"
      intro="Create a consistent web and mobile experience with a team that understands the product behind the technology."
    >
      <div className="content-callout">
        <div>
          <p className="content-page-eyebrow">Why Flutter</p>
          <h2>One thoughtful experience across the devices your customers use.</h2>
          <p>
            Flutter gives teams a fast path to polished, responsive interfaces without treating
            mobile and web as separate worlds.
          </p>
        </div>
        <div className="content-callout-mark">
          <Smartphone size={42} strokeWidth={1.4} aria-hidden="true" />
          <Zap size={22} aria-hidden="true" />
        </div>
      </div>
      <ContentSection title="What we can help you ship">
        <div className="content-check-list">
          {benefits.map((benefit) => (
            <p key={benefit}>
              <Check size={19} aria-hidden="true" />
              {benefit}
            </p>
          ))}
        </div>
      </ContentSection>
      <ContentSection title="A clear route to the next release">
        <p>
          Whether you are starting from a product idea, extending an existing application, or
          resolving a difficult technical issue, we begin with the context and finish with a useful,
          supportable result.
        </p>
        <a href="/30-mins-meeting" className="button button-orange content-inline-cta">
          Schedule a meet <span aria-hidden="true">→</span>
        </a>
      </ContentSection>
    </NaethraContentPage>
  );
}
