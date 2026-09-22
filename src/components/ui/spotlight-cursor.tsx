import React, { HTMLAttributes, useEffect, useRef, useState } from "react";

export interface SpotlightConfig {
  radius?: number;
  brightness?: number;
  color?: string;
  smoothing?: number;
  spotlightSize?: number;
  spotlightIntensity?: number;
  fadeSpeed?: number;
  glowColor?: string;
  themeShadowColor?: string;
  pulseSpeed?: number;
}

export interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightConfig;
}

export function useSpotlightEffect(config: SpotlightConfig = {}) {
  const {
    spotlightSize = 250,
    spotlightIntensity = 0.35,
    fadeSpeed = 0.15,
    glowColor = "56, 189, 248",
    themeShadowColor = "0, 91, 150",
    pulseSpeed = 2000,
  } = config;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const spotlightPos = useRef({ x: -500, y: -500 });
  const targetPos = useRef({ x: -500, y: -500 });
  const animationFrame = useRef<number | null>(null);
  const [, setIsHovered] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const checkIsLightBg = (x: number, y: number): boolean => {
      if (typeof document === "undefined" || x < 0 || y < 0) return true;
      const el = document.elementFromPoint(x, y);
      if (!el) return true;

      // Dark containers
      const darkContainer = el.closest(
        ".hero-section, .process-section, .trust-strip, .site-footer, .quote-section, .bg-slate-900, .bg-black"
      );
      if (darkContainer) return false;

      // Inspect background color luminance
      let current: HTMLElement | null = el as HTMLElement;
      while (current && current !== document.body) {
        const bg = window.getComputedStyle(current).backgroundColor;
        if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
          const match = bg.match(/\d+/g);
          if (match && match[0] && match[1] && match[2]) {
            const r = parseInt(match[0], 10);
            const g = parseInt(match[1], 10);
            const b = parseInt(match[2], 10);
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            return luminance > 120;
          }
        }
        current = current.parentElement;
      }
      return true;
    };

    const render = () => {
      if (!canvas || !ctx) return;

      spotlightPos.current.x = lerp(
        spotlightPos.current.x,
        targetPos.current.x,
        fadeSpeed
      );
      spotlightPos.current.y = lerp(
        spotlightPos.current.y,
        targetPos.current.y,
        fadeSpeed
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLight = checkIsLightBg(spotlightPos.current.x, spotlightPos.current.y);
      const pulseScale =
        1 + 0.06 * Math.sin((Date.now() / pulseSpeed) * Math.PI * 2);
      const currentSpotlightSize = spotlightSize * pulseScale;

      const gradient = ctx.createRadialGradient(
        spotlightPos.current.x,
        spotlightPos.current.y,
        0,
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSpotlightSize
      );

      if (isLight) {
        // On light background, draw theme brand shadow glow (#005b96)
        gradient.addColorStop(0, `rgba(${themeShadowColor}, 0.22)`);
        gradient.addColorStop(0.4, `rgba(${themeShadowColor}, 0.08)`);
        gradient.addColorStop(1, "rgba(0, 91, 150, 0)");
      } else {
        // On dark background, draw bright spotlight glow
        gradient.addColorStop(0, `rgba(${glowColor}, ${spotlightIntensity})`);
        gradient.addColorStop(0.4, `rgba(${glowColor}, ${spotlightIntensity * 0.4})`);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      }

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSpotlightSize,
        0,
        Math.PI * 2
      );
      ctx.fill();

      animationFrame.current = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    animationFrame.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [spotlightSize, spotlightIntensity, fadeSpeed, glowColor, themeShadowColor, pulseSpeed]);

  return canvasRef;
}

export const SpotlightCursor = ({
  config = {},
  className = "",
  ...rest
}: SpotlightCursorProps) => {
  const spotlightConfig = {
    spotlightSize: 240,
    spotlightIntensity: 0.35,
    glowColor: "56, 189, 248",
    themeShadowColor: "0, 91, 150",
    ...config,
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full ${className}`}
      {...rest}
    />
  );
};

export const Component = SpotlightCursor;
export default SpotlightCursor;
