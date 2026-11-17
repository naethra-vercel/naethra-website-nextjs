"use client";

import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon } from "@hugeicons/core-free-icons";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto">
      <button
        type="button"
        onClick={scrollToTop}
        className="group flex items-center gap-x-2 rounded-full border border-[#005b96]/30 bg-white px-3.5 py-1.5 text-xs font-bold text-[#005b96] shadow-md backdrop-blur-md transition-all duration-300 hover:bg-[#005b96] hover:text-white hover:border-[#005b96] hover:shadow-lg hover:scale-105 active:scale-95"
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <span className="flex size-5 items-center justify-center rounded-full bg-[#e8edf6] text-[#005b96] group-hover:bg-white/20 group-hover:text-white transition-all">
          <HugeiconsIcon
            icon={ArrowUp01Icon}
            size={14}
            className="animate-bounce transition-transform duration-300 group-hover:-translate-y-1"
          />
        </span>
        <span className="tracking-wide uppercase font-sans text-[11px]">Scroll to Top</span>
      </button>
    </div>
  );
}
