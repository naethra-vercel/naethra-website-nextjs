"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Sticky card stack. Each card scales down and shifts up as the next one
 * scrolls over it.
 *
 * Progress is taken from page scroll and the card's in-flow position.
 * Measuring the sticky element itself stays at 0 once the card locks,
 * so the scale never runs.
 */
function layoutDocumentTop(el: HTMLElement) {
  const parent = el.parentElement;
  if (!parent) return 0;

  let top = 0;
  let node: HTMLElement | null = parent;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }

  const gap = Number.parseFloat(getComputedStyle(parent).rowGap) || 0;
  for (const child of Array.from(parent.children)) {
    if (child === el) break;
    if (child instanceof HTMLElement) top += child.offsetHeight + gap;
  }
  return top;
}

export function StackContainer({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="about-modern-team-stack relative w-full">
      {children}
    </div>
  );
}

export function StackCard({
  children,
  index,
  totalCards,
}: {
  children: ReactNode;
  index: number;
  totalCards: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const scaleTo = 1 - (totalCards - index) * 0.03;
  const scale = useTransform(scrollY, (value) => {
    const el = cardRef.current;
    if (!el) return 1;
    const start = layoutDocumentTop(el);
    const progress = Math.min(1, Math.max(0, (value - start) / (el.offsetHeight || 1)));
    return 1 + (scaleTo - 1) * progress;
  });
  const yOffset = useTransform(scrollY, (value) => {
    const el = cardRef.current;
    if (!el) return 0;
    const start = layoutDocumentTop(el);
    const progress = Math.min(1, Math.max(0, (value - start) / (el.offsetHeight || 1)));
    return -15 * index * progress;
  });

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale: reduceMotion ? 1 : scale,
        y: reduceMotion ? 0 : yOffset,
        top: `${index * 30 + 100}px`,
        zIndex: index + 1,
      }}
      className="about-modern-team-stack-card origin-top transition-shadow duration-300"
    >
      {children}
    </motion.div>
  );
}
