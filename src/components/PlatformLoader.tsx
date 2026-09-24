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

const technologies = [
  ["Android", "#78c257", androidIcon],
  ["Angular", "#dd0031", angularIcon],
  ["Apple", "#142033", appleIcon],
  ["AWS", "#ff9900", awsIcon],
  ["Azure", "#0089d6", azureIcon],
  ["Flutter", "#02569b", flutterIcon],
  ["Java", "#e76f00", javaIcon],
  ["Nest.js", "#e0234e", nestIcon],
  ["Next.js", "#111827", nextIcon],
] as const;

const duration = 5000;

function PlatformLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [complete, setComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const burstRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let frame = 0;
    const start = performance.now();
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
    }> = [];

    const resize = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const createBurst = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      particles = technologies.flatMap(([, color]) =>
        Array.from({ length: 12 }, () => {
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 5;
          return {
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            color,
          };
        }),
      );
    };

    const animate = (now: number) => {
      const currentElapsed = Math.min(now - start, duration);
      const currentProgress = currentElapsed / duration;
      setElapsed(currentElapsed);
      setProgress(currentProgress * 100);

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles = particles.filter((particle) => particle.life > 0);
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.94;
        particle.vy *= 0.94;
        particle.life -= 0.025;
        context.globalAlpha = particle.life;
        context.fillStyle = particle.color;
        context.beginPath();
        context.arc(particle.x, particle.y, 2.5, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;

      if (currentElapsed >= 3800 && !burstRef.current) {
        burstRef.current = true;
        createBurst();
      }
      if (currentElapsed >= duration) {
        setComplete(true);
        return;
      }
      frame = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (complete) return null;

  const isConverging = elapsed >= 3800;
  const isFading = elapsed >= 4500;
  return (
    <div
      className={`platform-loader ${isConverging ? "is-converging" : ""} ${isFading ? "is-fading" : ""}`}
      role="status"
      aria-live="polite"
    >
      <canvas ref={canvasRef} className="platform-loader-canvas" aria-hidden="true" />
      <div className="platform-loader-glow platform-loader-glow-top" aria-hidden="true" />
      <div className="platform-loader-glow platform-loader-glow-bottom" aria-hidden="true" />

      <div className="platform-loader-stage">
        <div className="platform-loader-orbit" aria-hidden="true">
          {technologies.map(([name, color, icon], index) => (
            <span
              className="platform-loader-orb"
              key={name}
              style={
                {
                  "--orb-angle": `${(index / technologies.length) * 360}deg`,
                  "--orb-color": color,
                } as CSSProperties
              }
            >
              <img src={icon} alt={`${name} technology`} className="platform-loader-icon" />
            </span>
          ))}
        </div>
        <div className="platform-loader-logo-wrap">
          <img src="/logo.png" alt="Naethra Simplify IT" className="platform-loader-logo" />
          <span className="platform-loader-ring" aria-hidden="true" />
        </div>
      </div>

      <footer className="platform-loader-footer">
        <div className="platform-loader-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <span>{isConverging ? "System integrated" : "Connecting digital ecosystem..."}</span>
      </footer>
    </div>
  );
}

export default PlatformLoader;
