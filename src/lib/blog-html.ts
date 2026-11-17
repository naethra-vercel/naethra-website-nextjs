/**
 * Extract clean semantic HTML from WordPress / Elementor blog content
 * so it can be styled with Tailwind instead of raw page-builder chrome.
 */

const ALLOWED_TAGS = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "code",
  "em",
  "figcaption",
  "figure",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "img",
  "li",
  "ol",
  "p",
  "pre",
  "span",
  "strong",
  "sub",
  "sup",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
]);

function findMatchingClose(html: string, openIndex: number): number {
  const tagMatch = html.slice(openIndex).match(/^<([a-zA-Z0-9:-]+)\b[^>]*>/);
  if (!tagMatch) return -1;
  const tag = tagMatch[1]?.toLowerCase() ?? "";
  if (!tag) return -1;
  if (/\/>$/.test(tagMatch[0])) return openIndex + tagMatch[0].length;

  let depth = 0;
  const token = new RegExp(`<(/)?${tag}\\b[^>]*>`, "gi");
  token.lastIndex = openIndex;

  let match: RegExpExecArray | null;
  while ((match = token.exec(html))) {
    const isClose = Boolean(match[1]);
    const full = match[0];
    if (!isClose && /\/>$/.test(full)) continue;
    depth += isClose ? -1 : 1;
    if (depth === 0) return match.index + full.length;
  }

  return -1;
}

function removeMatchingBlocks(
  html: string,
  openPattern: RegExp,
  shouldRemove: (block: string) => boolean,
) {
  let result = "";
  let cursor = 0;
  const pattern = new RegExp(
    openPattern.source,
    openPattern.flags.includes("g") ? openPattern.flags : `${openPattern.flags}g`,
  );

  while (cursor < html.length) {
    pattern.lastIndex = cursor;
    const match = pattern.exec(html);
    if (!match) {
      result += html.slice(cursor);
      break;
    }

    const start = match.index;
    result += html.slice(cursor, start);

    const end = findMatchingClose(html, start);
    if (end < 0) {
      result += match[0];
      cursor = start + match[0].length;
      continue;
    }

    const block = html.slice(start, end);
    if (shouldRemove(block)) {
      cursor = end;
      continue;
    }

    result += block;
    cursor = end;
  }

  return result;
}

/** Strip TheGem / Elementor related-posts chrome from WP content. */
export function sanitizeBlogHtml(html: string) {
  if (!html) return "";

  let cleaned = html;

  cleaned = removeMatchingBlocks(
    cleaned,
    /<(div|section)\b[^>]*(?:thegem-extended-blog-grid|portfolio-preloader-wrapper|portfolio-set|portfolio-sharing-pane|socials-sharing|gem-button-container)[^>]*>/gi,
    (block) =>
      /thegem-extended-blog-grid|portfolio-preloader-wrapper|portfolio-set|portfolio-sharing-pane|socials-sharing|View all posts|Clear Filters|Most popular/i.test(
        block,
      ),
  );

  cleaned = removeMatchingBlocks(
    cleaned,
    /<section\b[^>]*elementor-(?:top-)?section[^>]*>/gi,
    (block) => {
      const isRelatedChrome =
        /Most popular|Clear Filters|thegem-extended-blog-grid|filters_text_labels_clear_text|View all posts/i.test(
          block,
        );
      const isArticleMedia = /wp-image-|attachment-|size-large|FileMaker_And_Moisture/i.test(block);
      return isRelatedChrome && !isArticleMedia;
    },
  );

  cleaned = cleaned.replace(/\sstyle=(["'])(.*?)\1/gi, (_full, quote: string, styleValue: string) => {
    const next = styleValue
      .replace(
        /(^|;)\s*color\s*:\s*(#fff(?:fff)?|white|rgb\(\s*255\s*,\s*255\s*,\s*255\s*\)|rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*[\d.]+\s*\))\s*/gi,
        "$1",
      )
      .replace(/;;+/g, ";")
      .replace(/^;\s*|;$/g, "")
      .trim();

    return next ? ` style=${quote}${next}${quote}` : "";
  });

  cleaned = cleaned
    .replace(/<section\b[^>]*>\s*<\/section>/gi, "")
    .replace(/<div\b[^>]*>\s*<\/div>/gi, "")
    .replace(/\b(Most popular|Clear Filters)\b/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return cleaned;
}

function decodeEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function stripTags(value: string) {
  return decodeEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function normalizeTitleKey(value: string) {
  return stripTags(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function isDuplicateTitle(text: string, title?: string) {
  if (!title) return false;
  return normalizeTitleKey(text) === normalizeTitleKey(title);
}

function cleanAttributes(tag: string, attrs: string) {
  const name = tag.toLowerCase();
  const kept: string[] = [];

  if (name === "a") {
    const href = attrs.match(/\bhref\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (href && !/^javascript:/i.test(href)) {
      kept.push(`href="${href.replace(/"/g, "&quot;")}"`);
      if (/^https?:\/\//i.test(href)) {
        kept.push('target="_blank"', 'rel="noopener noreferrer"');
      }
    }
  }

  if (name === "img") {
    const src = attrs.match(/\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2];
    const alt = attrs.match(/\balt\s*=\s*(["'])(.*?)\1/i)?.[2] ?? "";
    const width = attrs.match(/\bwidth\s*=\s*(["']?)(\d+)\1/i)?.[2];
    const height = attrs.match(/\bheight\s*=\s*(["']?)(\d+)\1/i)?.[2];
    if (src) {
      kept.push(`src="${src.replace(/"/g, "&quot;")}"`);
      kept.push(`alt="${alt.replace(/"/g, "&quot;")}"`);
      kept.push('loading="lazy"', 'decoding="async"');
      if (width) kept.push(`width="${width}"`);
      if (height) kept.push(`height="${height}"`);
    }
  }

  return kept.length ? ` ${kept.join(" ")}` : "";
}

/** Strip Elementor/TheGem noise and keep only semantic tags. */
function sanitizeFragment(html: string): string {
  let out = html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  // Promote leftover div wrappers into paragraphs when they hold text.
  out = out.replace(/<div\b[^>]*>([\s\S]*?)<\/div>/gi, (_full, inner: string) => {
    const cleaned = inner.trim();
    if (!cleaned) return "";
    if (/^<(?:p|h[1-6]|ul|ol|figure|blockquote|pre|table)\b/i.test(cleaned)) return cleaned;
    return `<p>${cleaned}</p>`;
  });

  out = out
    .replace(/<\/?(?:section|picture|source|label)\b[^>]*>/gi, "");

  out = out.replace(
    /<(h[1-6])\b([^>]*)>([\s\S]*?)<\/\1>/gi,
    (_full, tag: string, attrs: string, inner: string) => {
      const text = stripTags(inner);
      if (!text) return "";
      const level = Number(tag.slice(1));
      const looksLikeSectionTitle =
        level >= 4 ||
        /font-size:\s*1[0-6]px|data-elementor-setting-key="title"|data-pen-placeholder/i.test(
          attrs + inner,
        );
      const nextTag = looksLikeSectionTitle || level === 1 ? "h2" : tag.toLowerCase();
      const body = inner.replace(/<\/?span\b[^>]*>/gi, "").trim();
      // Title-case short section labels like "objective:"
      const pretty =
        text.length < 40 && /:$/.test(text)
          ? `${text.charAt(0).toUpperCase()}${text.slice(1)}`
          : body;
      return `<${nextTag}>${pretty}</${nextTag}>`;
    },
  );

  out = out.replace(/<\/?([a-z0-9]+)(\s[^>]*)?>/gi, (full, tag: string, attrs = "") => {
    const name = tag.toLowerCase();
    if (!ALLOWED_TAGS.has(name)) return "";
    if (full.startsWith("</")) return `</${name}>`;
    if (name === "br" || name === "hr" || name === "img") {
      return `<${name}${cleanAttributes(name, attrs || "")}>`;
    }
    return `<${name}${cleanAttributes(name, attrs || "")}>`;
  });

  out = out
    .replace(/<(strong|b|em|i|u|span)>\s*<\/\1>/gi, "")
    .replace(/<(p|h[1-6]|li|span)>\s*<\/\1>/gi, "")
    .replace(/(<br\s*\/?>\s*){2,}/gi, "<br>")
    .replace(/\s{2,}/g, " ")
    .replace(/>\s+</g, ">\n<")
    .trim();

  return out;
}

function isRelatedThumbnail(src: string) {
  return /thegem-product|transparent-thegem|justified-square/i.test(src);
}

function extractWidgetBlocks(html: string) {
  const blocks: Array<{ type: string; html: string }> = [];
  const re =
    /<div\b[^>]*\belementor-widget-(heading|text-editor|image)\b[^>]*>[\s\S]*?<div\b[^>]*\belementor-widget-container\b[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;

  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    blocks.push({ type: match[1]!.toLowerCase(), html: match[2]!.trim() });
  }
  return blocks;
}

function normalizeBlock(type: string, html: string, title?: string): string {
  if (type === "image") {
    const src = html.match(/\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (!src || isRelatedThumbnail(src)) return "";
    const alt = html.match(/\balt\s*=\s*(["'])(.*?)\1/i)?.[2] ?? "";
    return `<figure><img src="${src}" alt="${alt.replace(/"/g, "&quot;")}" loading="lazy" decoding="async" /></figure>`;
  }

  const cleaned = sanitizeFragment(html);
  if (!cleaned) return "";

  const onlyHeading = cleaned.match(/^<(h[1-6])>([\s\S]*?)<\/\1>$/i);
  if (onlyHeading && isDuplicateTitle(onlyHeading[2]!, title)) return "";

  return cleaned;
}

/** Convert consecutive "1. … 2. …" paragraphs into a proper ordered list. */
function promoteNumberedParagraphs(html: string) {
  // Match a run of numbered paragraphs (optionally with blank text between).
  return html.replace(
    /(?:<p>\s*\d+\.[\s\S]*?<\/p>\s*){2,}/gi,
    (block) => {
      const items = Array.from(block.matchAll(/<p>\s*\d+\.\s*([\s\S]*?)<\/p>/gi)).map((match) => {
        const body = match[1]!.replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim();
        return body ? `<li>${body}</li>` : "";
      }).filter(Boolean);
      return items.length >= 2 ? `<ol>\n${items.join("\n")}\n</ol>\n` : block;
    },
  );
}

/**
 * WordPress/Elementor often wraps lists (and other blocks) in `<p>…</p>`.
 * Browsers hoist those out of `<p>`, which breaks React hydration when we
 * re-inject the same HTML via dangerouslySetInnerHTML.
 */
function unwrapBlockElementsFromParagraphs(html: string) {
  const blockTag = "ol|ul|figure|blockquote|pre|table|h[2-6]";
  return html.replace(
    new RegExp(
      `<p(?:\\s[^>]*)?>\\s*((?:<(?:${blockTag})\\b[\\s\\S]*?<\\/(?:${blockTag})>\\s*)+)<\\/p>`,
      "gi",
    ),
    "$1",
  );
}

/**
 * Portfolio CPT HTML is usually well-formed (`<p><b>…</b>…</p>`).
 * Some older exports are mid-tag fragments (`Client:</b>…</p>`); repair those only.
 */
export function extractPortfolioArticleHtml(html: string): string {
  if (!html.trim()) return "";

  // Real WP API content already has opening block tags — sanitize only.
  if (/<(?:p|h[1-6]|ul|ol)\b/i.test(html)) {
    return extractBlogArticleHtml(html);
  }

  const lines = html
    .replace(/&nbsp;/gi, " ")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const out: string[] = [];

  for (const line of lines) {
    if (
      /^<\/?ul\b/i.test(line) ||
      /^<\/?ol\b/i.test(line) ||
      /^<li\b/i.test(line) ||
      /^<\/li>/i.test(line)
    ) {
      out.push(line);
      continue;
    }

    let match = line.match(/^(.+?)\s*<\/h[2-6]>\s*$/i);
    if (match) {
      const title = match[1]!.replace(/:$/, "").trim();
      if (title) out.push(`<h3>${title}</h3>`);
      continue;
    }

    match = line.match(/^(.+?)<\/b>(.*)$/i);
    if (match) {
      const label = match[1]!.trim();
      const rest = match[2]!
        .replace(/<\/p>\s*$/i, "")
        .replace(/^<\/p>\s*$/i, "")
        .trim();
      out.push(`<p><strong>${label}</strong>${rest ? ` ${rest}` : ""}</p>`);
      continue;
    }

    if (/^<\/p>$/i.test(line)) continue;

    const body = line.replace(/<\/p>\s*$/i, "").trim();
    if (body) out.push(`<p>${body}</p>`);
  }

  return extractBlogArticleHtml(out.join("\n"));
}

/** Convert WordPress/Elementor HTML into clean article markup. */
export function extractBlogArticleHtml(html: string, title?: string): string {
  if (!html) return "";

  const sanitized = sanitizeBlogHtml(html);
  const widgets = extractWidgetBlocks(sanitized);

  let article = "";

  if (widgets.length > 0) {
    article = widgets
      .map((widget) => normalizeBlock(widget.type, widget.html, title))
      .filter(Boolean)
      .join("\n");
  } else {
    article = sanitizeFragment(sanitized);
  }

  // Rescue orphan numbered steps that lost paragraph wrappers.
  article = article.replace(
    /(?<=<\/(?:p|h[1-6]|ul|ol|figure)>|^)\s*(\d+\.(?:\s|&nbsp;)*(?:<b>|<strong>)[\s\S]*?)(?=<p\b|<h[1-6]\b|<ul\b|<ol\b|<figure\b|$)/gi,
    (chunk) => {
      const body = chunk
        .replace(/<\/?p>/gi, "")
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/\s+/g, " ")
        .trim();
      return body ? `\n<p>${body}</p>\n` : "";
    },
  );

  // Normalize paragraph openers before list promotion.
  article = article
    .replace(/<p>\s*(?:<br\s*\/?>\s*)+/gi, "<p>")
    .replace(/&nbsp;/gi, " ");

  article = promoteNumberedParagraphs(article);
  article = unwrapBlockElementsFromParagraphs(article);

  return article
    .replace(/\b(Most popular|Clear Filters|View all posts)\b/gi, "")
    .replace(/<(strong|b|em|i|u)>\s*<\/\1>/gi, "")
    .replace(/(<p>\s*<\/p>\s*)+/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
