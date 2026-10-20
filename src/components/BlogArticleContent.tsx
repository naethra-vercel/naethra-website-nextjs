import "@/styles/blog-prose.css";

import { createElement, type ReactNode } from "react";

type ArticleBlock =
  | { type: "heading"; level: 2 | 3 | 4 | 5 | 6; html: string }
  | { type: "paragraph"; html: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "figure"; src: string; alt: string }
  | { type: "blockquote"; html: string }
  | { type: "pre"; html: string };

function decodeBasicEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function extractListItems(listHtml: string) {
  return Array.from(listHtml.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi))
    .map((match) => match[1]!.trim())
    .filter(Boolean);
}

/** Split cleaned article HTML into typed blocks for distinct rendering. */
export function parseArticleBlocks(html: string): ArticleBlock[] {
  if (!html.trim()) return [];

  const blocks: ArticleBlock[] = [];
  const pattern =
    /<(h[2-6]|p|ul|ol|figure|blockquote|pre)\b([^>]*)>([\s\S]*?)<\/\1>/gi;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    const tag = match[1]!.toLowerCase();
    const attrs = match[2] ?? "";
    const inner = match[3] ?? "";

    if (tag.startsWith("h")) {
      const level = Number(tag.slice(1)) as 2 | 3 | 4 | 5 | 6;
      const text = decodeBasicEntities(inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
      if (!text) continue;
      blocks.push({ type: "heading", level, html: inner.trim() });
      continue;
    }

    if (tag === "p") {
      // WP often emits <p><ol>…</ol></p>. Promote the list so we never nest
      // block elements inside <p> (browsers hoist them → hydration mismatch).
      const onlyList = inner.match(/^\s*<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>\s*$/i);
      if (onlyList) {
        const items = extractListItems(onlyList[2]!);
        if (items.length > 0) {
          blocks.push({ type: "list", ordered: onlyList[1]!.toLowerCase() === "ol", items });
        }
        continue;
      }

      if (/<(ul|ol|figure|blockquote|pre|table|h[2-6])\b/i.test(inner)) {
        // Split inline text and nested blocks so neither is dropped.
        const nestedPattern =
          /<(ul|ol|figure|blockquote|pre|table|h[2-6])\b[^>]*>[\s\S]*?<\/\1>/gi;
        let cursor = 0;
        let nested: RegExpExecArray | null;
        while ((nested = nestedPattern.exec(inner)) !== null) {
          const before = inner.slice(cursor, nested.index).trim();
          if (before) {
            const beforeText = decodeBasicEntities(
              before.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
            );
            if (beforeText) blocks.push({ type: "paragraph", html: before });
          }
          blocks.push(...parseArticleBlocks(nested[0]!));
          cursor = nested.index + nested[0].length;
        }
        const after = inner.slice(cursor).trim();
        if (after) {
          const afterText = decodeBasicEntities(
            after.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
          );
          if (afterText) blocks.push({ type: "paragraph", html: after });
        }
        continue;
      }

      const text = decodeBasicEntities(inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
      if (!text) continue;
      blocks.push({ type: "paragraph", html: inner.trim() });
      continue;
    }

    if (tag === "ul" || tag === "ol") {
      const items = extractListItems(inner);
      if (items.length === 0) continue;
      blocks.push({ type: "list", ordered: tag === "ol", items });
      continue;
    }

    if (tag === "figure") {
      const src = inner.match(/\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2]
        ?? attrs.match(/\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2];
      if (!src) continue;
      const alt = inner.match(/\balt\s*=\s*(["'])(.*?)\1/i)?.[2] ?? "";
      blocks.push({ type: "figure", src, alt });
      continue;
    }

    if (tag === "blockquote") {
      blocks.push({ type: "blockquote", html: inner.trim() });
      continue;
    }

    if (tag === "pre") {
      blocks.push({ type: "pre", html: inner.trim() });
    }
  }

  return blocks;
}

const headingClass: Record<2 | 3 | 4 | 5 | 6, string> = {
  2: "mt-10 mb-4 font-display text-[clamp(1.45rem,2.6vw,1.95rem)] font-bold leading-tight tracking-[-0.04em] text-ink first:mt-0",
  3: "mt-8 mb-3 font-display text-[clamp(1.25rem,2.2vw,1.55rem)] font-bold leading-tight tracking-[-0.03em] text-ink",
  4: "mt-7 mb-2.5 font-display text-lg font-bold leading-snug tracking-[-0.02em] text-ink",
  5: "mt-6 mb-2 font-display text-base font-bold leading-snug text-ink",
  6: "mt-6 mb-2 font-display text-sm font-bold uppercase tracking-[0.08em] text-primary",
};

function InlineHtml({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function BlogArticleContent({ html }: { html: string }) {
  const blocks = parseArticleBlocks(html);

  if (blocks.length === 0) {
    return (
      <p className="text-[var(--muted)]">This article has no content yet.</p>
    );
  }

  return (
    <div className="blog-article-content space-y-1">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return createElement(
            `h${block.level}`,
            {
              key: `h-${index}`,
              className: headingClass[block.level],
            },
            <InlineHtml html={block.html} />,
          );
        }

        if (block.type === "paragraph") {
          // Safety net: never put block-level HTML inside <p>.
          const hasBlockChild = /<(ul|ol|figure|blockquote|pre|table|h[2-6])\b/i.test(block.html);
          const Tag = hasBlockChild ? "div" : "p";
          return (
            <Tag
              key={`p-${index}`}
              className="mb-5 max-w-[42rem] text-[1.05rem] leading-[1.8] text-[var(--muted)]"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={`list-${index}`}
              className={[
                "mb-8 max-w-[42rem] list-outside space-y-3 rounded-2xl border border-[var(--line)] bg-white px-6 py-5 text-[1.05rem] leading-[1.7] text-[var(--muted)] shadow-[0_10px_30px_rgb(20_32_51_/_0.04)]",
                block.ordered
                  ? "list-decimal pl-10 marker:font-bold marker:text-primary"
                  : "list-disc pl-10 marker:text-primary",
              ].join(" ")}
            >
              {block.items.map((item, itemIndex) => (
                <li
                  key={`li-${index}-${itemIndex}`}
                  className="pl-1 [&>b]:font-bold [&>b]:text-ink [&>strong]:font-bold [&>strong]:text-ink"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ListTag>
          );
        }

        if (block.type === "figure") {
          return (
            <figure
              key={`fig-${index}`}
              className="group my-8 overflow-hidden rounded-[5px] border border-[rgb(0_91_150_/_0.22)] bg-[#eef2f8] shadow-[0_12px_32px_rgb(20_32_51_/_0.06)] transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_20px_44px_rgb(0_91_150_/_0.16)]"
            >
              <img
                src={block.src}
                alt={block.alt}
                loading="lazy"
                decoding="async"
                className="mx-auto block h-auto w-full max-w-[48rem] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </figure>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote
              key={`bq-${index}`}
              className="my-7 max-w-[40rem] border-l-[3px] border-primary pl-4 font-display text-[1.15rem] tracking-[-0.02em] text-ink"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          );
        }

        if (block.type === "pre") {
          return (
            <pre
              key={`pre-${index}`}
              className="my-6 max-w-[48rem] overflow-x-auto rounded-xl border border-[var(--line)] bg-[#eef2f8] p-4 font-mono text-[0.9em] leading-relaxed text-ink"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          );
        }

        return null as ReactNode;
      })}
    </div>
  );
}
