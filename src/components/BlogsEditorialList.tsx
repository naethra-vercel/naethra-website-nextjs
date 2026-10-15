import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Link } from "react-router-dom";

import { estimateReadTime } from "@/lib/blog-utils";
import type { WpBlogPost } from "@/lib/wordpress";

function useCanHoverPreview() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return enabled;
}

type PreviewState = {
  visible: boolean;
  image: string;
  rotation: number;
  x: number;
  y: number;
};

type BlogsEditorialListProps = {
  posts: WpBlogPost[];
  emptyMessage?: string;
};

export default function BlogsEditorialList({
  posts,
  emptyMessage = "No articles found for this filter.",
}: BlogsEditorialListProps) {
  const canHoverPreview = useCanHoverPreview();
  const [preview, setPreview] = useState<PreviewState>({
    visible: false,
    image: "",
    rotation: -3.5,
    x: 0,
    y: 0,
  });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const cardVisibleRef = useRef(false);

  const stopRaf = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    const current = currentRef.current;
    const target = targetRef.current;
    current.x += (target.x - current.x) * 0.18;
    current.y += (target.y - current.y) * 0.18;

    setPreview((prev) =>
      prev.visible || cardVisibleRef.current
        ? { ...prev, x: current.x, y: current.y }
        : prev,
    );

    if (
      Math.abs(target.x - current.x) > 0.35 ||
      Math.abs(target.y - current.y) > 0.35 ||
      cardVisibleRef.current
    ) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, []);

  const startRaf = useCallback(() => {
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => () => stopRaf(), [stopRaf]);

  const showPreview = (post: WpBlogPost, event: ReactMouseEvent, rotation: number) => {
    if (!canHoverPreview || !post.image) return;

    targetRef.current = { x: event.clientX, y: event.clientY };
    if (!cardVisibleRef.current) {
      currentRef.current = { x: event.clientX, y: event.clientY };
    }

    cardVisibleRef.current = true;
    setPreview({
      visible: true,
      image: post.image,
      rotation,
      x: currentRef.current.x,
      y: currentRef.current.y,
    });
    startRaf();
  };

  const movePreview = (event: ReactMouseEvent) => {
    if (!canHoverPreview || !cardVisibleRef.current) return;
    targetRef.current = { x: event.clientX, y: event.clientY };
    startRaf();
  };

  const hidePreview = () => {
    cardVisibleRef.current = false;
    setPreview((prev) => ({ ...prev, visible: false }));
  };

  if (posts.length === 0) {
    return <p className="blogs-empty">{emptyMessage}</p>;
  }

  return (
    <>
      <ul className="blogs-editorial-list">
        {posts.map((post, index) => {
          const rotation = index % 2 === 0 ? -4 : 4.5;

          return (
            <li key={post.slug}>
              <Link
                to={`/blogs/${post.slug}`}
                className="blogs-editorial-item"
                onMouseEnter={(event) => showPreview(post, event, rotation)}
                onMouseMove={movePreview}
                onMouseLeave={hidePreview}
                onFocus={hidePreview}
              >
                {post.image ? (
                  <span className="blogs-editorial-thumb" aria-hidden="true">
                    <img src={post.image} alt="" loading="lazy" />
                  </span>
                ) : null}
                <div className="blogs-editorial-copy">
                  <span className="blogs-editorial-category">{post.category}</span>
                  <h3>{post.title}</h3>
                </div>
                <span className="blogs-editorial-meta">{post.readTime || estimateReadTime(post)}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div
        className={`blogs-cursor-preview ${preview.visible ? "is-visible" : ""}`}
        aria-hidden="true"
        style={{
          transform: `translate3d(${preview.x + 18}px, ${preview.y - 36}px, 0) rotate(${
            preview.visible ? preview.rotation : 0
          }deg) scale(${preview.visible ? 1 : 0.86})`,
        }}
      >
        <div className="blogs-cursor-preview-stack" />
        <div className="blogs-cursor-preview-frame">
          {preview.image ? (
            <img src={preview.image} alt="" />
          ) : (
            <div className="blog-card-image-fallback blogs-cursor-preview-fallback" />
          )}
        </div>
      </div>
    </>
  );
}
