import React, { useState } from "react";
import worldImage from "@/assets/web/world.png";

export type OutsourceReason = {
  num: string;
  title: string;
  text: string;
};

export const DEFAULT_OUTSOURCING_REASONS: OutsourceReason[] = [
  {
    num: "01",
    title: "Cost Effective",
    text: "Get high-quality development at competitive rates without compromising on quality.",
  },
  {
    num: "02",
    title: "Access to Top Talent",
    text: "Work with a large pool of skilled and experienced developers.",
  },
  {
    num: "03",
    title: "High Quality Standards",
    text: "Follow global best practices and deliver reliable solutions.",
  },
  {
    num: "04",
    title: "Flexible Engagement Models",
    text: "Choose from dedicated teams, offshore development or project-based models.",
  },
  {
    num: "05",
    title: "Time Zone Advantage",
    text: "Ensure faster development with round-the-clock productivity.",
  },
  {
    num: "06",
    title: "Focus on Core Business",
    text: "Let us handle the technology while you focus on growing your business.",
  },
];

export interface WhyOutsourceSectionProps {
  badgeText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  reasons?: OutsourceReason[];
  className?: string;
}

export default function WhyOutsourceSection({
  badgeText = "WHY OUTSOURCE",
  titlePrefix = "6 reasons to outsource ",
  titleHighlight = "software development to India",
  reasons = DEFAULT_OUTSOURCING_REASONS,
  className = "",
}: WhyOutsourceSectionProps) {
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

  return (
    <section className={`why-outsource-section ${className}`}>
      <div className="site-container why-outsource-container">
        {/* Left Column: Reasons List */}
        <div className="why-outsource-left">
          <div className="why-outsource-badge-wrap">
            <span className="why-outsource-badge">{badgeText}</span>
          </div>

          <h2 className="why-outsource-title">
            {titlePrefix}
            <span className="why-outsource-title-highlight">{titleHighlight}</span>
          </h2>

          <div className="why-outsource-list">
            <div className="why-outsource-line" aria-hidden="true" />
            {reasons.map((reason, index) => (
              <div
                key={reason.num}
                className={`why-outsource-item ${activeHoverIndex === index ? "is-hovered" : ""}`}
                onMouseEnter={() => setActiveHoverIndex(index)}
                onMouseLeave={() => setActiveHoverIndex(null)}
              >
                <div className="why-outsource-num">{reason.num}</div>
                <div className="why-outsource-text-block">
                  <h3 className="why-outsource-item-title">{reason.title}</h3>
                  <p className="why-outsource-item-text">{reason.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Animated World Globe Illustration */}
        <div className="why-outsource-right">
          <div className="why-outsource-globe-glow" aria-hidden="true" />
          <div className="why-outsource-globe-wrap">
            <img
              src={worldImage}
              alt="Global software development outsourcing to India"
              className="why-outsource-globe-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
