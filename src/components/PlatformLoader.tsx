import { animate, createTimeline, stagger } from "animejs";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import androidIcon from "@/assets/icons/Android.svg";
import angularIcon from "@/assets/icons/Angular.svg";
import appleIcon from "@/assets/icons/Apple.svg";
import awsIcon from "@/assets/icons/AWS.svg";
import azureIcon from "@/assets/icons/Azure.svg";
import flutterIcon from "@/assets/icons/Flutter.svg";
import javaIcon from "@/assets/icons/Java.svg";
import nestIcon from "@/assets/icons/Nest.js.svg";
import nextIcon from "@/assets/icons/Next.js.svg";
import { assetSrc } from "@/lib/asset-src";

const technologies = [
  ["Android", "#78c257", assetSrc(androidIcon)],
  ["Angular", "#dd0031", assetSrc(angularIcon)],
  ["Apple", "#142033", assetSrc(appleIcon)],
  ["AWS", "#ff9900", assetSrc(awsIcon)],
  ["Azure", "#0089d6", assetSrc(azureIcon)],
  ["Flutter", "#02569b", assetSrc(flutterIcon)],
  ["Java", "#e76f00", assetSrc(javaIcon)],
  ["Nest.js", "#e0234e", assetSrc(nestIcon)],
  ["Next.js", "#111827", assetSrc(nextIcon)],
] as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type PlatformLoaderProps = {
  /** fullscreen = first paint / boot; inline = route data wait */
  variant?: "fullscreen" | "inline";
  onComplete?: () => void;
};

export default function PlatformLoader({
  variant = "fullscreen",
  onComplete,
}: PlatformLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);
  const [status, setStatus] = useState("Connecting digital ecosystem");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const stoppers: Array<{ cancel: () => void }> = [];
    const reduced = prefersReducedMotion();
    const orbs = root.querySelectorAll<HTMLElement>("[data-loader-orb]");

    const cleanup = () => {
      stoppers.forEach((entry) => entry.cancel());
    };

    if (reduced) {
      orbs.forEach((orb) => {
        orb.style.opacity = "1";
      });
      if (progressRef.current) progressRef.current.style.width = "100%";
      root.style.opacity = "1";
      if (variant === "fullscreen") {
        const timer = window.setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 350);
        return () => {
          window.clearTimeout(timer);
          cleanup();
        };
      }
      return cleanup;
    }

    const enter = createTimeline({ defaults: { ease: "out(3)" } });
    enter.add(root, { opacity: [0, 1], duration: 420 });
    if (logoRef.current) {
      enter.add(
        logoRef.current,
        { opacity: [0, 1], scale: [0.9, 1], duration: 560 },
        70,
      );
    }
    if (orbs.length) {
      // Opacity only — keep CSS rotate/translate orbit transform intact
      enter.add(
        orbs,
        {
          opacity: [0, 1],
          delay: stagger(50),
          duration: 640,
          ease: "out(4)",
        },
        140,
      );
    }
    stoppers.push(enter);

    if (orbitRef.current) {
      stoppers.push(
        animate(orbitRef.current, {
          rotate: "1turn",
          duration: variant === "inline" ? 9000 : 12000,
          ease: "linear",
          loop: true,
        }),
      );
    }

    if (ringRef.current) {
      stoppers.push(
        animate(ringRef.current, {
          scale: [1, 1.3],
          opacity: [0.55, 0.16],
          duration: 1700,
          ease: "inOut(2)",
          loop: true,
          alternate: true,
        }),
      );
    }

    if (logoRef.current) {
      stoppers.push(
        animate(logoRef.current, {
          scale: [1, 1.025],
          duration: 1500,
          ease: "inOut(2)",
          loop: true,
          alternate: true,
          delay: 650,
        }),
      );
    }

    if (variant === "fullscreen" && progressRef.current) {
      stoppers.push(
        animate(progressRef.current, {
          width: ["0%", "100%"],
          duration: 2600,
          ease: "inOut(3)",
          onUpdate: (self) => {
            const pct = Math.round((self.progress ?? 0) * 100);
            if (pct > 70) setStatus("System integrated");
          },
          onComplete: () => {
            setStatus("Ready");
            if (labelRef.current) {
              stoppers.push(
                animate(labelRef.current, {
                  opacity: [1, 0.5, 1],
                  duration: 320,
                  ease: "out(2)",
                }),
              );
            }
            stoppers.push(
              animate(root, {
                opacity: [1, 0],
                duration: 460,
                ease: "in(2)",
                delay: 160,
                onComplete: () => {
                  setVisible(false);
                  onComplete?.();
                },
              }),
            );
          },
        }),
      );
    } else if (variant === "inline" && progressRef.current) {
      progressRef.current.style.width = "38%";
      stoppers.push(
        animate(progressRef.current, {
          x: ["-130%", "270%"],
          duration: 1100,
          ease: "inOut(2)",
          loop: true,
        }),
      );
    }

    return cleanup;
  }, [onComplete, variant]);

  if (!visible && variant === "fullscreen") return null;

  const isInline = variant === "inline";

  return (
    <div
      ref={rootRef}
      className={`platform-loader ${isInline ? "platform-loader-inline" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="platform-loader-glow platform-loader-glow-top" aria-hidden="true" />
      <div className="platform-loader-glow platform-loader-glow-bottom" aria-hidden="true" />

      <div className="platform-loader-stage">
        <div ref={orbitRef} className="platform-loader-orbit" aria-hidden="true">
          {technologies.map(([name, color, icon], index) => (
            <span
              className="platform-loader-orb"
              data-loader-orb
              key={name}
              style={
                {
                  "--orb-angle": `${(index / technologies.length) * 360}deg`,
                  "--orb-color": color,
                } as CSSProperties
              }
            >
              <img src={icon} alt="" className="platform-loader-icon" />
            </span>
          ))}
        </div>
        <div ref={logoRef} className="platform-loader-logo-wrap">
          <img src="/logo.png" alt="Naethra" className="platform-loader-logo" />
          <span ref={ringRef} className="platform-loader-ring" aria-hidden="true" />
        </div>
      </div>

      <footer className="platform-loader-footer">
        <div className="platform-loader-progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>
        <span ref={labelRef}>{isInline ? "Loading" : status}</span>
      </footer>
    </div>
  );
}
