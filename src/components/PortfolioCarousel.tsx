import { MathUtils, Vector3 } from "three";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent, type WheelEvent } from "react";

export type PortfolioCarouselProject = {
  id: string | number;
  title: string;
  technologies: string[];
  image: string;
  slug: string;
};

type PortfolioCarouselProps = {
  projects: PortfolioCarouselProject[];
};

function getOffset(index: number, activeIndex: number, total: number) {
  const rawOffset = index - activeIndex;
  if (rawOffset > total / 2) return rawOffset - total;
  if (rawOffset < -total / 2) return rawOffset + total;
  return rawOffset;
}

export default function PortfolioCarousel({ projects }: PortfolioCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const wheelLock = useRef(false);
  const total = projects.length;

  useEffect(() => {
    setActiveIndex(0);
  }, [projects]);

  useEffect(() => {
    if (isPaused || total < 2) return;
    const rotation = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % total);
    }, 4500);
    return () => window.clearInterval(rotation);
  }, [isPaused, total]);

  if (total === 0) return null;

  const goTo = (index: number) => {
    setActiveIndex((index + total) % total);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (wheelLock.current || Math.abs(event.deltaY) < 12) return;
    wheelLock.current = true;
    goTo(activeIndex + (event.deltaY > 0 ? 1 : -1));
    window.setTimeout(() => {
      wheelLock.current = false;
    }, 420);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) > 45) goTo(activeIndex + (distance < 0 ? 1 : -1));
  };

  return (
    <section
      className="portfolio-carousel"
      aria-label="Portfolio project carousel"
      onWheel={handleWheel}
    >
      <div className="portfolio-carousel-grid" aria-hidden="true" />
      <div
        className="portfolio-carousel-stage"
        onPointerDown={(event) => {
          setIsPaused(true);
          handlePointerDown(event);
        }}
        onPointerUp={(event) => {
          handlePointerUp(event);
          setIsPaused(false);
        }}
        onPointerCancel={() => setIsPaused(false)}
      >
        {projects.map((project, index) => {
          const offset = getOffset(index, activeIndex, total);
          const distance = Math.abs(offset);
          const position = new Vector3(offset * 18, 0, -distance * 14);
          const rotation = MathUtils.clamp(offset * -32, -58, 58);
          const scale = MathUtils.clamp(1 - distance * 0.085, 0.72, 1);
          const opacity = MathUtils.clamp(1 - distance * 0.2, 0, 1);
          const isActive = offset === 0;
          const hidden = distance > 4;

          return (
            <button
              className={`portfolio-carousel-card ${isActive ? "is-active" : ""}`}
              key={project.id}
              type="button"
              aria-label={`${isActive ? "Open" : "Center"} ${project.title}`}
              aria-hidden={hidden}
              tabIndex={hidden ? -1 : 0}
              onClick={() => (isActive ? (window.location.href = project.slug) : goTo(index))}
              style={{
                opacity,
                pointerEvents: hidden ? "none" : "auto",
                transform: `translate3d(${position.x}rem, ${distance * 0.35}rem, ${position.z}px) rotateY(${rotation}deg) scale(${scale})`,
                zIndex: 10 - distance,
                filter: `blur(${distance * 0.65}px)`,
              }}
            >
              <span
                className="portfolio-carousel-image"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <span className="portfolio-carousel-shade" />
              <span className="portfolio-carousel-content">
                <span className="portfolio-carousel-tags">
                  {project.technologies.slice(0, 3).map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </span>
                <strong>{project.title}</strong>
                <span className="portfolio-carousel-open">
                  View case <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="portfolio-carousel-footer">
        <button
          type="button"
          className="portfolio-carousel-control"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous project"
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div>
          <strong>{projects[activeIndex]?.title}</strong>
        </div>
        <button
          type="button"
          className="portfolio-carousel-control"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next project"
        >
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
