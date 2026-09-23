import type { ReactNode } from "react";

type SectionEyebrowProps = {
  children: ReactNode;
  inverse?: boolean;
};

export default function SectionEyebrow({ children, inverse = false }: SectionEyebrowProps) {
  return (
    <div className={`eyebrow ${inverse ? "eyebrow-inverse" : ""}`}>
      <span className="eyebrow-mark">+</span>
      <span className="eyebrow-label">{children}</span>
      <span className="eyebrow-mark">+</span>
    </div>
  );
}
