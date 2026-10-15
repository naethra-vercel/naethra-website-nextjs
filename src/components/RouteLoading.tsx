import { animate } from "animejs";
import { useEffect, useRef } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Simple route / data wait loader. */
export function RouteLoading() {
  const ringRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const stoppers: Array<{ cancel: () => void }> = [];

    if (ringRef.current) {
      stoppers.push(
        animate(ringRef.current, {
          rotate: "1turn",
          duration: 900,
          ease: "linear",
          loop: true,
        }),
      );
    }

    if (markRef.current) {
      stoppers.push(
        animate(markRef.current, {
          opacity: [0.55, 1],
          duration: 900,
          ease: "inOut(2)",
          loop: true,
          alternate: true,
        }),
      );
    }

    return () => stoppers.forEach((entry) => entry.cancel());
  }, []);

  return (
    <div className="route-loading" role="status" aria-live="polite" aria-busy="true">
      <div className="route-loading-inner">
        <span className="route-loading-ring" ref={ringRef} aria-hidden="true" />
        <img
          ref={markRef}
          className="route-loading-logo"
          src="/logo.png"
          alt=""
          width={120}
          height={40}
        />
        <p className="route-loading-label">Loading</p>
      </div>
    </div>
  );
}
