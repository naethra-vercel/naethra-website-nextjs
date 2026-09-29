import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import BlogsEditorialList from "@/components/BlogsEditorialList";
import { NaethraContentHeader } from "@/components/NaethraContentPage";
import SiteFooter from "@/components/SiteFooter";
import { getPosts } from "@/lib/wordpress";

export const Route = createFileRoute("/blogs/")({
  loader: async () => getPosts(1, 20),
  component: BlogsPage,
});

function BlogFilters({
  categories,
  activeCategory,
  onSelect,
}: {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(categories.length);
  const [moreOpen, setMoreOpen] = useState(false);

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const measureEl = measureRef.current;
    if (!wrap || !measureEl) return;

    const available = wrap.clientWidth;
    const items = Array.from(measureEl.querySelectorAll<HTMLElement>("[data-filter-measure]"));
    const moreWidth =
      measureEl.querySelector<HTMLElement>("[data-filter-more-measure]")?.offsetWidth ?? 72;
    const gap = 6;

    if (items.length === 0) {
      setVisibleCount(0);
      return;
    }

    let used = 0;
    let fit = items.length;

    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (!item) break;
      const width = item.offsetWidth;
      const next = used + (i > 0 ? gap : 0) + width;
      const remaining = items.length - (i + 1);
      const reserve = remaining > 0 ? gap + moreWidth : 0;

      if (next + reserve > available) {
        fit = i;
        break;
      }

      used = next;
    }

    setVisibleCount(Math.max(1, Math.min(fit, items.length)));
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [categories, activeCategory, measure]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(wrap);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useEffect(() => {
    if (!moreOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (wrapRef.current?.contains(target)) return;
      setMoreOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  const visible = categories.slice(0, visibleCount);
  const overflow = categories.slice(visibleCount);
  const activeInOverflow = overflow.includes(activeCategory);

  return (
    <div className="blogs-filters" aria-label="Filter articles" ref={wrapRef}>
      <div className="blogs-filters-measure" aria-hidden="true" ref={measureRef}>
        {categories.map((category) => (
          <button
            type="button"
            key={`measure-${category}`}
            data-filter-measure={category}
            tabIndex={-1}
          >
            {category}
          </button>
        ))}
        <button type="button" data-filter-more-measure tabIndex={-1}>
          More
          <ChevronDown size={12} aria-hidden="true" />
        </button>
      </div>

      <div className="blogs-filters-row">
        {visible.map((category) => (
          <button
            className={activeCategory === category ? "is-active" : ""}
            key={category}
            type="button"
            onClick={() => {
              onSelect(category);
              setMoreOpen(false);
            }}
          >
            {category}
          </button>
        ))}

        {overflow.length > 0 && (
          <div className={`blogs-filters-more ${moreOpen ? "is-open" : ""}`}>
            <button
              type="button"
              className={`blogs-filters-more-trigger ${activeInOverflow ? "is-active" : ""}`}
              aria-expanded={moreOpen}
              aria-haspopup="listbox"
              onClick={() => setMoreOpen((open) => !open)}
            >
              More
              <ChevronDown size={12} aria-hidden="true" />
            </button>
            {moreOpen && (
              <div className="blogs-filters-more-menu" role="listbox" aria-label="More categories">
                {overflow.map((category) => (
                  <button
                    key={category}
                    type="button"
                    role="option"
                    aria-selected={activeCategory === category}
                    className={activeCategory === category ? "is-active" : ""}
                    onClick={() => {
                      onSelect(category);
                      setMoreOpen(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogsPage() {
  const blogPosts = Route.useLoaderData();
  const categories = [
    "All",
    ...Array.from(new Set(blogPosts.flatMap((post) => post.categories).filter(Boolean))).sort(
      (a, b) => a.localeCompare(b),
    ),
  ];

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.categories.includes(activeCategory));

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
          <BlogFilters
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        <BlogsEditorialList posts={filteredPosts} />
      </section>

      <SiteFooter className="content-page-footer blogs-footer" />
    </main>
  );
}
