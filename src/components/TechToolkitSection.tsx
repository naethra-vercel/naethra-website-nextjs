import React, { useState } from "react";

import androidIcon from "@/assets/icons/Android.svg";
import angularIcon from "@/assets/icons/Angular.svg";
import appleIcon from "@/assets/icons/Apple.svg";
import awsIcon from "@/assets/icons/AWS.svg";
import googleCloudIcon from "@/assets/icons/Google Cloud.svg";
import javaScriptIcon from "@/assets/icons/JavaScript.svg";
import nextIcon from "@/assets/icons/Next.js.svg";
import nodeIcon from "@/assets/icons/Node.js.svg";
import phpIcon from "@/assets/icons/PHP.svg";
import pythonIcon from "@/assets/icons/Python.svg";
import reactIcon from "@/assets/icons/React.svg";
import typeScriptIcon from "@/assets/icons/TypeScript.svg";

export type TechItem = {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "cloud-mobile";
};

export const TECH_ITEMS: TechItem[] = [
  { name: "React", icon: reactIcon, category: "frontend" },
  { name: "Next.js", icon: nextIcon, category: "frontend" },
  { name: "Angular", icon: angularIcon, category: "frontend" },
  { name: "TypeScript", icon: typeScriptIcon, category: "frontend" },
  { name: "JavaScript", icon: javaScriptIcon, category: "frontend" },
  { name: "Node.js", icon: nodeIcon, category: "backend" },
  { name: "Python", icon: pythonIcon, category: "backend" },
  { name: "PHP", icon: phpIcon, category: "backend" },
  { name: "AWS", icon: awsIcon, category: "cloud-mobile" },
  { name: "Google Cloud", icon: googleCloudIcon, category: "cloud-mobile" },
  { name: "Android", icon: androidIcon, category: "cloud-mobile" },
  { name: "iOS", icon: appleIcon, category: "cloud-mobile" },
];

export interface TechToolkitSectionProps {
  badgeText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
  items?: TechItem[];
  className?: string;
}

export default function TechToolkitSection({
  badgeText = "TECHNOLOGIES WE WORK WITH",
  titlePrefix = "Web ",
  titleHighlight = "application",
  subtitle = "We work with modern technologies to build scalable, secure and high-performing web and mobile applications.",
  items = TECH_ITEMS,
  className = "",
}: TechToolkitSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section className={`toolkit-section ${className}`}>
      {/* Dynamic Background Radial Glow */}
      <div className="toolkit-bg-glow" aria-hidden="true" />

      <div className="site-container toolkit-container">
        {/* Header Block */}
        <div className="toolkit-header">
          <div className="toolkit-badge-wrap">
            <span className="toolkit-badge">{badgeText}</span>
          </div>
          <h2 className="toolkit-title">
            {titlePrefix}
            <span className="toolkit-title-highlight">{titleHighlight}</span>
          </h2>
          {subtitle && <p className="toolkit-subtitle">{subtitle}</p>}

          {/* Interactive Category Filter Pills */}
          <div className="toolkit-filter-pills" role="tablist" aria-label="Filter technologies">
            {[
              { id: "all", label: "All Stack" },
              { id: "frontend", label: "Frontend" },
              { id: "backend", label: "Backend" },
              { id: "cloud-mobile", label: "Cloud & Mobile" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === tab.id}
                className={`toolkit-pill ${activeCategory === tab.id ? "is-active" : ""}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Column Card Grid matching image design with micro-animations */}
        <div className="toolkit-grid">
          {filteredItems.map((tech, index) => (
            <div
              key={tech.name}
              className={`toolkit-card ${hoveredIndex === index ? "is-hovered" : ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="toolkit-card-shimmer" aria-hidden="true" />
              <div className="toolkit-card-icon-wrap">
                <img
                  src={tech.icon}
                  alt={`${tech.name} logo`}
                  className="toolkit-card-icon"
                  loading="lazy"
                />
              </div>
              <span className="toolkit-card-label">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
