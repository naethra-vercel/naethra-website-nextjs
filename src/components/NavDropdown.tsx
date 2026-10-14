"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type FocusEvent, type ReactNode } from "react";
import { animate, createTimeline, stagger, type Timeline } from "animejs";

import type { NavigationItem } from "@/lib/navigation";

type NavDropdownProps = {
  item: NavigationItem;
  variant: "home" | "content";
  triggerClassName?: string;
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function menuItems(menu: HTMLElement): HTMLElement[] {
  return Array.from(menu.querySelectorAll<HTMLElement>("[data-nav-item]"));
}

function clearMotionStyles(items: Iterable<HTMLElement> | ArrayLike<HTMLElement> | null | undefined) {
  if (!items) return;
  Array.from(items as ArrayLike<HTMLElement>).forEach((item) => {
    if (!item?.style) return;
    item.style.opacity = "";
    item.style.transform = "";
  });
}

export function NavDropdown({ item, variant, triggerClassName }: NavDropdownProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<Timeline | null>(null);
  const phaseRef = useRef<"closed" | "open" | "closing">("closed");
  const runRef = useRef(0);
  const closeTimerRef = useRef<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const rootClass = variant === "home" ? "nav-dropdown" : "content-page-nav-dropdown";
  const menuClass = variant === "home" ? "nav-dropdown-menu" : "content-page-nav-menu";
  const menuId = `nav-menu-${variant}-${item.id}`;

  useEffect(() => {
    const root = rootRef.current;
    root?.classList.add("is-motion");
    if (root && (root.matches(":hover") || root.matches(":focus-within"))) {
      openMenu();
    }
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
      timelineRef.current?.cancel();
      timelineRef.current = null;
      phaseRef.current = "closed";
      const menu = menuRef.current;
      if (menu) {
        menu.classList.remove("is-open", "is-closing");
        menuItems(menu).forEach((entry) => entry.classList.remove("is-revealed"));
        clearMotionStyles(menuItems(menu));
      }
      root?.classList.remove("is-open");
    };
    // Mount-only: pick up a hover that started before anime.js took over.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stopTimeline() {
    timelineRef.current?.cancel();
    timelineRef.current = null;
  }

  function finishClosed(menu: HTMLElement, items: HTMLElement[]) {
    menu.classList.remove("is-open", "is-closing");
    rootRef.current?.classList.remove("is-open");
    items.forEach((entry) => entry.classList.remove("is-revealed"));
    clearMotionStyles(items);
    phaseRef.current = "closed";
    setExpanded(false);
  }

  function revealItems(items: HTMLElement[]) {
    clearMotionStyles(items);
    items.forEach((entry) => entry.classList.add("is-revealed"));
  }

  function playOpen() {
    const menu = menuRef.current;
    const root = rootRef.current;
    if (!menu || !root) return;

    const items = menuItems(menu);
    const runId = ++runRef.current;
    stopTimeline();

    root.classList.add("is-open");
    menu.classList.add("is-open");
    menu.classList.remove("is-closing");
    setExpanded(true);

    if (prefersReducedMotion() || items.length === 0) {
      revealItems(items);
      phaseRef.current = "open";
      return;
    }

    items.forEach((entry) => {
      entry.classList.remove("is-revealed");
      entry.style.opacity = "0";
    });

    const timeline = createTimeline({
      defaults: { composition: "replace" },
      onComplete: () => {
        if (runRef.current !== runId) return;
        // Re-query in case anime.js mutated the original targets list.
        revealItems(menuItems(menu));
        phaseRef.current = "open";
      },
    });

    timeline.add(
      items,
      {
        opacity: [0, 1],
        x: [-18, 0],
        y: [12, 0],
        delay: stagger(52, { from: "first" }),
        duration: 560,
        ease: "outExpo",
      },
      0,
    );

    timelineRef.current = timeline;
  }

  function playClose() {
    const menu = menuRef.current;
    const root = rootRef.current;
    if (!menu || !root || phaseRef.current === "closed") return;

    const items = menuItems(menu);
    const runId = ++runRef.current;
    stopTimeline();
    root.classList.remove("is-open");

    if (prefersReducedMotion() || items.length === 0) {
      finishClosed(menu, items);
      return;
    }

    menu.classList.add("is-closing");
    phaseRef.current = "closing";

    const timeline = createTimeline({
      defaults: { composition: "replace" },
      onComplete: () => {
        if (runRef.current !== runId) return;
        finishClosed(menu, menuItems(menu));
      },
    });

    timeline.add(
      items,
      {
        opacity: 0,
        x: -14,
        y: -8,
        delay: stagger(26, { from: "last" }),
        duration: 200,
        ease: "inQuad",
      },
      0,
    );

    timelineRef.current = timeline;
  }

  function cancelScheduledClose() {
    if (closeTimerRef.current == null) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }

  function openMenu() {
    cancelScheduledClose();
    if (phaseRef.current === "open") return;
    phaseRef.current = "open";
    playOpen();
  }

  function scheduleClose(force = false) {
    const root = rootRef.current;
    if (!force && root?.contains(document.activeElement)) return;
    cancelScheduledClose();
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      playClose();
    }, 90);
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    scheduleClose(true);
  }

  return (
    <div
      ref={rootRef}
      className={rootClass}
      onMouseEnter={openMenu}
      onMouseLeave={() => scheduleClose()}
      onFocus={openMenu}
      onBlur={handleBlur}
    >
      <a
        className={triggerClassName}
        href={item.href}
        target={item.target || undefined}
        rel={item.target === "_blank" ? "noreferrer" : undefined}
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-controls={menuId}
      >
        {item.label}
        {variant === "home" ? (
          <span className="nav-chevron" aria-hidden="true" />
        ) : (
          <>
            {" "}
            <ChevronDown size={13} aria-hidden="true" />
          </>
        )}
      </a>
      <div ref={menuRef} id={menuId} className={menuClass}>
        {item.children.map((child) => (
          <a
            key={child.id}
            data-nav-item
            href={child.href}
            target={child.target || undefined}
            rel={child.target === "_blank" ? "noreferrer" : undefined}
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function AnimeSubmenu({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = menuItems(root);
    if (prefersReducedMotion() || items.length === 0) {
      items.forEach((item) => item.classList.add("is-revealed"));
      return;
    }

    const animation = animate(items, {
      opacity: [0, 1],
      x: [-12, 0],
      y: [10, 0],
      delay: stagger(42, { from: "first" }),
      duration: 480,
      ease: "outExpo",
      composition: "replace",
      onComplete: () => {
        items.forEach((item) => {
          item.style.opacity = "";
          item.style.transform = "";
          item.classList.add("is-revealed");
        });
      },
    });

    return () => {
      animation.cancel();
    };
  }, []);

  return (
    <div ref={ref} className={`${className} is-anime`}>
      {children}
    </div>
  );
}
