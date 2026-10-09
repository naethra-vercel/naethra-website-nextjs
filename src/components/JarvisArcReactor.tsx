"use client";

import React from "react";

export function openJarvis() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-jarvis"));
  }
}

interface JarvisArcReactorProps {
  size?: "sm" | "md" | "lg" | "xl" | number;
  className?: string;
  isListening?: boolean;
  isSpeaking?: boolean;
  label?: string;
  onClick?: () => void;
}

export function JarvisArcReactor({
  size = "md",
  className = "",
  isListening = false,
  isSpeaking = false,
  label = "J.A.R.V.I.S",
  onClick,
}: JarvisArcReactorProps) {
  // Determine pixel size based on preset or custom number
  const pixelSize =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 56
      : size === "md"
      ? 120
      : size === "lg"
      ? 240
      : 320; // xl

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      openJarvis();
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{ width: pixelSize, height: pixelSize }}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
    >
      {/* Outer Ambient Blue/Cyan Glow */}
      <div
        className={`absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl transition-all duration-500 ${
          isSpeaking
            ? "scale-125 opacity-100 animate-pulse"
            : isListening
            ? "scale-110 opacity-80"
            : "scale-100 opacity-40 group-hover:opacity-70"
        }`}
      />

      {/* SVG Arc Reactor matching exact image layers */}
      <svg
        viewBox="0 0 200 200"
        className="size-full text-cyan-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
      >
        <defs>
          <linearGradient id="jarvis-cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <radialGradient id="jarvis-center-core">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#38bdf8" />
            <stop offset="70%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#030712" />
          </radialGradient>
        </defs>

        {/* Ring 1: Outer Segmented Ring (Spins counter-clockwise) */}
        <g
          className="animate-spin"
          style={{ transformOrigin: "100px 100px", animationDuration: "30s", animationDirection: "reverse" }}
        >
          <circle
            cx="100"
            cy="100"
            r="94"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeDasharray="25 10 40 15 15 10"
          />
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2 6"
            opacity="0.6"
          />
        </g>

        {/* Ring 2: Dotted Outer Arc Track (Spins clockwise) */}
        <g
          className="animate-spin"
          style={{ transformOrigin: "100px 100px", animationDuration: "20s" }}
        >
          <circle
            cx="100"
            cy="100"
            r="82"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.75"
          />
          <circle
            cx="100"
            cy="100"
            r="76"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="30 20 60 20"
          />
        </g>

        {/* Ring 3: Segmented Scale Ticks & Curved Dot Arrays */}
        <g
          className="animate-spin"
          style={{ transformOrigin: "100px 100px", animationDuration: "14s", animationDirection: "reverse" }}
        >
          {/* Inner precision tick marks */}
          <circle
            cx="100"
            cy="100"
            r="64"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="1.5 4"
            opacity="0.85"
          />
          {/* Segmented thick block arc */}
          <circle
            cx="100"
            cy="100"
            r="56"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeDasharray="50 120"
            opacity="0.9"
          />
          {/* Dotted 00000 arc section */}
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="3 3 3 3 3 3 3 3 40"
            opacity="0.9"
          />
        </g>

        {/* Ring 4: Inner Core Border & Glowing Ring */}
        <circle
          cx="100"
          cy="100"
          r="45"
          fill="none"
          stroke="url(#jarvis-cyan-glow)"
          strokeWidth="3"
          className="animate-pulse"
        />
        <circle
          cx="100"
          cy="100"
          r="41"
          fill="url(#jarvis-center-core)"
          opacity="0.4"
        />
        <circle
          cx="100"
          cy="100"
          r="38"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="10 5"
        />

        {/* Center Text: J.A.R.V.I.S */}
        <text
          x="100"
          y="104"
          textAnchor="middle"
          fill="#ffffff"
          fontSize={pixelSize > 150 ? "13" : "15"}
          fontWeight="900"
          letterSpacing="2.5"
          className="font-mono drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
