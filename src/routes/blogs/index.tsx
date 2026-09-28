import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";
import type { BlogPost } from "@/lib/blog-data";
import { blogCategories, blogPosts } from "@/lib/blog-data";

export const Route = createFileRoute("/blogs/")({ component: BlogsPage });

function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof blogCategories)[number]>("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [activeRotation, setActiveRotation] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  // Mouse position targeting and lerp smoothing
  const targetPos = useRef({ x: 0, y: 0 });
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  // Detect pointer capability and screen width for mobile fallback
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkTouch = () => {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsTouchDevice(isCoarse || isSmallScreen);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Smooth lerp loop for cursor follow effect
  useEffect(() => {
    if (!isHovered || isTouchDevice) return;

    let animId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updatePosition = () => {
      setCardPos((prev) => {
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;

        // Stop updating if extremely close to save CPU
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          return { x: targetPos.current.x, y: targetPos.current.y };
        }

        return {
          x: lerp(prev.x, targetPos.current.x, 0.18),
          y: lerp(prev.y, targetPos.current.y, 0.18),
        };
      });
      animId = requestAnimationFrame(updatePosition);
    };

    animId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, isTouchDevice]);

  const handleMouseEnter = useCallback((post: BlogPost, index: number) => {
    setActivePost(post);
    // Tactile variation: alternating subtle rotations for stacked/layered feel
    const angles = [-3.5, 3, -2.5, 4, -3, 2.5];
    const angle = angles[index % angles.length] ?? 0;
    setActiveRotation(angle);
    setIsHovered(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    targetPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <main className="blogs-page">
      <NaethraContentHeader />
      <section className="blogs-hero">
        <div className="site-container blogs-hero-inner">
          <p className="blogs-kicker">Naethra / Journal</p>
          <h1>Ideas for building what comes next.</h1>
          <p className="blogs-hero-copy">
            Practical notes on product strategy, application development, integrations, and the
            decisions that make digital work more useful.
          </p>
        </div>
      </section>

      <section className="blogs-index site-container" aria-labelledby="blog-list-title">
        <div className="blogs-index-head">
          <div>
            <p className="blogs-kicker">The latest thinking</p>
            <h2 id="blog-list-title">Read the thinking.</h2>
          </div>
          <div className="blogs-filters" aria-label="Filter articles">
            {blogCategories.map((category) => (
              <button
                className={activeCategory === category ? "is-active" : ""}
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Single-Column List */}
        <div className="blog-editorial-list" role="list">
          {filteredPosts.map((post, index) => (
            <Link
              to="/blogs/$slug"
              params={{ slug: post.slug }}
              className="blog-editorial-item"
              key={post.slug}
              role="listitem"
              onMouseEnter={() => handleMouseEnter(post, index)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Mobile Static Fallback Thumbnail */}
              <div className="blog-editorial-mobile-thumb" aria-hidden="true">
                <img src={post.image} alt="" loading="lazy" />
              </div>

              <div className="blog-editorial-content">
                <div className="blog-editorial-tag">{post.category}</div>
                <h3 className="blog-editorial-headline">{post.title}</h3>
                <p className="blog-editorial-excerpt">{post.excerpt}</p>
              </div>

              <div className="blog-editorial-meta">
                <span className="blog-editorial-readtime">{post.readTime}</span>
                <span className="blog-editorial-arrow" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Floating Interactive Cursor Preview Card (Desktop / Fine Pointer) */}
      {!isTouchDevice && activePost && (
        <div
          className={`blog-cursor-preview ${isHovered ? "is-visible" : ""}`}
          style={{
            transform: `translate3d(${cardPos.x + 24}px, ${cardPos.y - 90}px, 0) rotate(${activeRotation}deg) scale(${isHovered ? 1 : 0.85})`,
          }}
          aria-hidden="true"
        >
          <div className="blog-cursor-card-inner">
            <img src={activePost.image} alt="" className="blog-cursor-card-image" />
          </div>
        </div>
      )}

      <SiteFooter className="content-page-footer blogs-footer" />
    </main>
  );
}
