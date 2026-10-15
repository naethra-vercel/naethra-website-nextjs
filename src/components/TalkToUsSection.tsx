import type { ReactNode } from "react";

type TalkToUsSectionProps = {
  children: ReactNode;
  className?: string;
};

/** CMS-style lead copy + Talk to us CTA used across service/product pages. */
export default function TalkToUsSection({ children, className = "" }: TalkToUsSectionProps) {
  return (
    <section className={["talk-to-us-section", className].filter(Boolean).join(" ")}>
      <div className="site-container service-detail-intro">
        <p>{children}</p>
        <a className="talk-to-us-button" href="/contact-us">
          Talk to us
        </a>
      </div>
    </section>
  );
}
