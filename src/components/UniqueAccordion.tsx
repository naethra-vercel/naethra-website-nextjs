"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type UniqueAccordionItem = {
  id: string;
  title: string;
  content: string;
};

type UniqueAccordionProps = {
  items: UniqueAccordionItem[];
  defaultOpenId?: string | null;
  className?: string;
};

export default function UniqueAccordion({
  items,
  defaultOpenId,
  className = "",
}: UniqueAccordionProps) {
  const initialId = defaultOpenId === undefined ? (items[0]?.id ?? null) : defaultOpenId;
  const [activeId, setActiveId] = useState<string | null>(initialId);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <div className={["unique-accordion", className].filter(Boolean).join(" ")}>
      <div className="unique-accordion-list">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isHovered = hoveredId === item.id;

          return (
            <div key={item.id} className="unique-accordion-item">
              <motion.button
                type="button"
                onClick={() => setActiveId(isActive ? null : item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="unique-accordion-trigger"
                initial={false}
                aria-expanded={isActive}
              >
                <div className="unique-accordion-row">
                  <motion.h3
                    className="unique-accordion-title"
                    animate={{
                      x: isActive || isHovered ? 4 : 0,
                      color: isActive || isHovered ? "var(--ink)" : "var(--muted)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    {item.title}
                  </motion.h3>

                  <motion.div
                    className="unique-accordion-icon"
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      animate={{ opacity: isActive || isHovered ? 1 : 0.4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        d="M8 1V15M1 8H15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  </motion.div>
                </div>

                <motion.div className="unique-accordion-rule" initial={false} />
                <motion.div
                  className="unique-accordion-rule-active"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : isHovered ? 0.3 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </motion.button>

              <AnimatePresence mode="wait">
                {isActive ? (
                  <motion.div
                    key={`${item.id}-panel`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2, delay: 0.1 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.1 },
                      },
                    }}
                    className="unique-accordion-panel"
                  >
                    <motion.p
                      className="unique-accordion-content"
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      {item.content}
                    </motion.p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
