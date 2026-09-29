const WP_BASE =
  import.meta.env["VITE_WORDPRESS_API_URL"]?.replace(/\/$/, "") ||
  "https://naethra.com/wp-json/wp/v2";

export type WpBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateIso: string;
  author: string;
  category: string;
  categories: string[];
  image: string;
  contentHtml: string;
  readTime: string;
};

export type WpPortfolioProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  categories: string[];
  image: string;
  href: string;
  summary: string;
};

export type WpPage = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
};

export type AboutContent = {
  specialtyHeadline: string;
  specialtyLead: string;
  specialtyCopy: string;
  servicesHeading: string;
  services: Array<{ title: string; description: string }>;
  team: Array<{ name: string; role: string; description: string; image?: string }>;
};

export type WebAppContent = {
  quoteTitle: string;
  quoteSubtitle: string;
  introEyebrow: string;
  introTitle: string;
  introParagraphs: string[];
  outsourcingTitle: string;
  outsourcingReasons: Array<{ title: string; text: string }>;
  techTitle: string;
  websiteTitle: string;
  websiteReasons: Array<{ title: string; text: string }>;
  closingText: string;
};

const ABOUT_FALLBACK: AboutContent = {
  specialtyHeadline:
    "The efficient use of data technology at both the workgroup and enterprise levels.",
  specialtyLead:
    "The efficient use of data technology at both the workgroup and enterprise levels - with systems that are designed to keep growing with your business.",
  specialtyCopy:
    "To be an invaluable resource by helping you and your team get the maximum benefit of the customized data tools we develop with you, and making sure your team is getting the most out of those tools including MySQL, PostgreSQL, AJAX, PHP, Java and more for LAN/WAN, Web and mobile deployments. We have provided a variety of companies, organizations and industries worldwide with innovative and diverse custom development services.",
  servicesHeading: "Passion rendered in our services.",
  services: [
    {
      title: "Website Development",
      description:
        "Our skilled and experienced development team offers a rich set of possible technology and user interface solutions, whatever your needs.",
    },
    {
      title: "PHP/MySQL Applications",
      description:
        "PHP is a widely-used general-purpose scripting language that is especially suited for Web development.",
    },
    {
      title: "Cloud Solutions",
      description:
        "Cloud computing is the delivery of computing services, including servers, storage, databases, and networking.",
    },
  ],
  team: [
    {
      name: "Murali Ramakrishnan",
      role: "CEO",
      description:
        "Murali Ramakrishnan holds a Bachelors degree in Computer Science and has an overall industry experience of 18 years. He has spent over 11 years with Tata Consultancy Services (TCS). He has worked in large IT Development projects and managed delivery for several large engagements. He was involved in setting up the offshore delivery center of Barclays. His areas of expertise include managing large delivery centers, transition management and Business Process Outsourcing (BPO) delivery. He has worked for client organizations such as Nedcor Group, Qwest, Concert, AT&T, among others.",
    },
    {
      name: "NP Murali",
      role: "COO",
      description:
        "NP Murali (NP) holds a Bachelors degree in Mechanical Engineering and has a Masters Degree in Business Administration. He has worked with Tata Consultancy Services (TCS) for 5+ years executing projects in Activity Based Management (ABM), Business Process Reengineering (BPR) and BPO delivery. His areas of expertise include relationship management, transition management and development of new business lines in BPO and conceptualizing service guidelines for Finance & accounting (F&A) processes. NP has 11+ years of industry experience and has worked in IDBI Bank, ISRO and India Pistons Ltd.",
    },
    {
      name: "Ramachandran",
      role: "CFO",
      description:
        "Ramachandran holds a degree in Commerce and has about 20 years of experience in Business Management. He is a first generation entrepreneur and has incubated several companies. He has extensive experience in managing the finance function of large corporations in India and the Middle East.",
    },
  ],
};

const WEB_APP_FALLBACK: WebAppContent = {
  quoteTitle: "Planning to create a web application?",
  quoteSubtitle: "Share your requirements to receive a quote.",
  introEyebrow: "Outsourced software development",
  introTitle: "Build with a team that understands the whole picture.",
  introParagraphs: [
    "Naethra is a creative web development company. We design, develop, and maintain responsive web and mobile applications. We crystallise business requirements, build, test, and securely deploy the applications.",
    "We build websites that leverage powerful technologies like PHP, HTML, Ajax, jQuery, DotNet, and JavaScript to help our clients stand out from the crowd.",
    "By working with custom software development teams, you can save the time and hassle of a lengthy hiring process while avoiding the cost of training and managing an in-house team. Based on your budget, business requirements, and objectives, you can select the best engagement model.",
  ],
  outsourcingTitle: "6 reasons to outsource software development to India",
  outsourcingReasons: [
    {
      title: "Professionalism",
      text: "The best part of hiring talented developers from Indian companies is that they know advanced technologies and can be held accountable while remaining extremely professional. By choosing an experienced web development company, your eCommerce or SaaS application can reach the market on time and within budget.",
    },
    {
      title: "An eye for detail",
      text: "Web development teams understand that time is of the essence. We pay close attention to web application design and development, so your product can be completed on time with a pixel-perfect experience and the details needed to support your wider marketing strategy.",
    },
    {
      title: "On-time delivery",
      text: "A well-designed web application is essential for attracting customers and driving sales, but many teams do not have the time or expertise to build one alone. A full-stack delivery team can take care of front-end and back-end development while keeping progress visible.",
    },
  ],
  techTitle: "Web application",
  websiteTitle: "Everything your web application needs",
  websiteReasons: [
    {
      title: "Everything under one roof",
      text: "A high-quality web application should feel user-friendly, consistent with your brand, and ready for the digital age. Our teams bring design, development, testing, and deployment together so you do not have to coordinate several vendors for one product.",
    },
    {
      title: "Economical",
      text: "Web development companies in India provide technologically advanced solutions at an affordable cost. You get access to designers, coders, and specialists when you need them, without carrying the overhead of building a complete in-house team.",
    },
    {
      title: "Low maintenance and support cost",
      text: "Custom web applications must stay operational around the clock. Experienced developers can provide the support and maintenance needed to protect performance, resolve issues quickly, and keep your application useful as the business grows.",
    },
  ],
  closingText:
    "If you are looking for a software development company that suits your budget and meets your expectations, Naethra Technologies is the right outsourcing partner for you. Time and materials contracts, fixed bids, outstaffing, and dedicated teams are some of the advantages you get by outsourcing your software development to us.",
};

type WpRendered = { rendered?: string };
type WpTerm = { taxonomy?: string; name?: string };
type WpMedia = { source_url?: string; alt_text?: string };
type WpAuthor = { name?: string };

type WpPost = {
  id?: number;
  slug?: string;
  date?: string;
  link?: string;
  menu_order?: number;
  featured_media?: number;
  title?: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  person?: {
    name?: string;
    position?: string;
    phone?: string;
    email?: string;
    link?: string;
  };
  _embedded?: {
    author?: WpAuthor[];
    "wp:featuredmedia"?: WpMedia[];
    "wp:term"?: WpTerm[][];
  };
};

/** Public CDN URLs for portfolio items whose featured media is not publicly embeddable. */
const PORTFOLIO_IMAGE_FALLBACKS: Record<string, string> = {
  "courier-management-system":
    "https://naethra.com/wp-content/uploads/2022/06/courier-management-system-thegem-portfolio-masonry.jpg",
  "proof-of-coverage":
    "https://naethra.com/wp-content/uploads/2019/09/proof-of-coverage-thegem-portfolio-masonry.jpg",
  "healthcare-marketing-website":
    "https://naethra.com/wp-content/uploads/2022/06/healthcare-marketing-website-thegem-portfolio-masonry.jpg",
};

async function wpFetch<T>(path: string): Promise<T> {
  // Avoid custom headers like User-Agent — browsers treat them as
  // non-simple and WordPress CORS preflight rejects them.
  const res = await fetch(`${WP_BASE}${path}`, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`WP ${res.status}: ${path}`);
  return res.json();
}

function stripHtml(markup: string) {
  return markup
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function findMatchingClose(html: string, openIndex: number): number {
  const tagMatch = html.slice(openIndex).match(/^<([a-zA-Z0-9:-]+)\b[^>]*>/);
  if (!tagMatch) return -1;
  const tag = tagMatch[1]?.toLowerCase() ?? "";
  if (!tag) return -1;

  // Self-closing style open tags.
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

function removeMatchingBlocks(html: string, openPattern: RegExp, shouldRemove: (block: string) => boolean) {
  let result = "";
  let cursor = 0;
  const pattern = new RegExp(openPattern.source, openPattern.flags.includes("g") ? openPattern.flags : `${openPattern.flags}g`);

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

  // WP/Elementor posts often ship white text meant for dark theme sections.
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

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getCategories(post: WpPost, taxonomy = "category") {
  const groups = post._embedded?.["wp:term"] ?? [];
  return groups
    .flat()
    .filter((term) => term.taxonomy === taxonomy && term.name)
    .map((term) => term.name as string);
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      if (/^[A-Z0-9]+(?:\/[A-Z0-9]+)?$/.test(word)) return word;
      if (word.includes("-")) {
        return word
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
          .join("-");
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function estimateReadTimeFromText(...parts: string[]) {
  const text = parts
    .join(" ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

export function mapWpPost(post: WpPost, options?: { includeContent?: boolean }): WpBlogPost {
  const includeContent = options?.includeContent !== false;
  const rawContent = includeContent ? (post.content?.rendered ?? "") : "";
  const contentHtml = includeContent ? sanitizeBlogHtml(rawContent) : "";
  const categories = getCategories(post);
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";
  const dateIso = post.date ?? "";
  const author = post._embedded?.author?.[0]?.name?.trim() || "Naethra";
  const title = stripHtml(post.title?.rendered ?? "Untitled");
  const excerpt = stripHtml(post.excerpt?.rendered ?? "");

  return {
    slug: post.slug ?? "",
    title,
    excerpt,
    date: dateIso ? formatDate(dateIso) : "",
    dateIso,
    author,
    category: categories[0] ?? "Blog",
    categories,
    image,
    contentHtml,
    readTime: estimateReadTimeFromText(title, excerpt, rawContent || contentHtml),
  };
}

export function mapWpPortfolio(post: WpPost): WpPortfolioProject {
  const slug = post.slug ?? "";
  const categories = getCategories(post, "portfolio-category");
  const embeddedImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";
  const contentText = stripHtml(post.content?.rendered ?? "");
  const summary =
    stripHtml(post.excerpt?.rendered ?? "") ||
    (contentText ? `${contentText.slice(0, 160).trim()}…` : "");

  return {
    id: post.id ?? 0,
    slug,
    title: titleCase(stripHtml(post.title?.rendered ?? "Untitled")),
    category: categories[0] ?? "Portfolio",
    categories,
    image: embeddedImage || PORTFOLIO_IMAGE_FALLBACKS[slug] || "",
    href: post.link ?? `https://naethra.com/blog/portfolio/${slug}/`,
    summary,
  };
}

export function mapWpPage(page: WpPost): WpPage {
  return {
    id: page.id ?? 0,
    slug: page.slug ?? "",
    title: stripHtml(page.title?.rendered ?? "Untitled"),
    excerpt: stripHtml(page.excerpt?.rendered ?? ""),
    contentHtml: page.content?.rendered ?? "",
  };
}

export async function getPageBySlug(slug: string) {
  const pages = await wpFetch<WpPost[]>(`/pages?slug=${encodeURIComponent(slug)}&_embed`);
  const page = pages[0];
  return page ? mapWpPage(page) : null;
}

function extractHtmlChunks(html: string) {
  return Array.from(
    html.matchAll(/<(?:p|div|h[1-6]|span)[^>]*>([\s\S]*?)<\/(?:p|div|h[1-6]|span)>/gi),
  )
    .map((match) => stripHtml(match[1] ?? ""))
    .filter((text) => text.length > 20);
}

function findChunk(chunks: string[], matcher: (text: string) => boolean) {
  return chunks.find(matcher) ?? "";
}

export function mapAboutContent(html: string): AboutContent {
  const chunks = extractHtmlChunks(html);
  const specialtyLead =
    findChunk(chunks, (text) => /efficient use of data technology/i.test(text)) ||
    ABOUT_FALLBACK.specialtyLead;
  const specialtyCopy =
    findChunk(chunks, (text) => /invaluable resource/i.test(text)) || ABOUT_FALLBACK.specialtyCopy;

  const services = ABOUT_FALLBACK.services.map((service) => {
    if (/website development/i.test(service.title)) {
      return {
        ...service,
        description:
          findChunk(chunks, (text) => /skilled and experienced development team/i.test(text)) ||
          service.description,
      };
    }
    if (/php\/mysql/i.test(service.title)) {
      return {
        ...service,
        description:
          findChunk(chunks, (text) => /widely-used general-purpose scripting language/i.test(text)) ||
          service.description,
      };
    }
    if (/cloud solutions/i.test(service.title)) {
      return {
        ...service,
        description:
          findChunk(chunks, (text) => /cloud computing is the delivery/i.test(text)) ||
          service.description,
      };
    }
    return service;
  });

  const specialtyHeadline = specialtyLead.includes("–")
    ? `${specialtyLead.split("–")[0]!.trim()}.`
    : specialtyLead.includes(" - ")
      ? `${specialtyLead.split(" - ")[0]!.trim()}.`
      : specialtyLead;

  return {
    specialtyHeadline,
    specialtyLead,
    specialtyCopy,
    servicesHeading: ABOUT_FALLBACK.servicesHeading,
    services,
    team: ABOUT_FALLBACK.team,
  };
}

export function mapTeamPerson(post: WpPost) {
  const name =
    post.person?.name?.trim() ||
    stripHtml(post.title?.rendered ?? "") ||
    "Team member";
  const role = post.person?.position?.trim() || "";
  const description = stripHtml(post.content?.rendered ?? post.excerpt?.rendered ?? "");
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";

  return {
    id: post.id ?? 0,
    name,
    role,
    description,
    image,
    order: post.menu_order ?? 0,
  };
}

export async function getTeamPersons(perPage = 20) {
  const items = await wpFetch<WpPost[]>(
    `/thegem_team_person?per_page=${perPage}&_embed&orderby=menu_order&order=asc&status=publish`,
  );
  return items
    .map(mapTeamPerson)
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export async function getAboutContent() {
  try {
    const page = await getPageBySlug("about-us");
    const about = page?.contentHtml ? mapAboutContent(page.contentHtml) : { ...ABOUT_FALLBACK };

    try {
      const teamPersons = await getTeamPersons();
      if (teamPersons.length > 0) {
        about.team = teamPersons.map(({ name, role, description, image }) => ({
          name,
          role: role || "Team",
          description:
            description ||
            ABOUT_FALLBACK.team.find((member) =>
              member.name.toLowerCase().includes(name.split(" ")[0]!.toLowerCase()),
            )?.description ||
            "",
          image,
        }));
      }
    } catch {
      // Team CPT may not be REST-enabled yet; keep fallback team.
    }

    return about;
  } catch {
    return ABOUT_FALLBACK;
  }
}

function extractHeadingText(html: string, level: string, matcher: RegExp) {
  const matches = Array.from(
    html.matchAll(new RegExp(`<${level}[^>]*>([\\s\\S]*?)<\\/${level}>`, "gi")),
  );
  for (const match of matches) {
    const text = stripHtml(match[1] ?? "");
    if (matcher.test(text)) return text;
  }
  return "";
}

function extractSectionAfterHeading(html: string, headingMatcher: RegExp) {
  const headingRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  const headings: Array<{ index: number; end: number; level: string; text: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(html)) !== null) {
    headings.push({
      index: match.index,
      end: match.index + match[0].length,
      level: match[1]!.toLowerCase(),
      text: stripHtml(match[2] ?? ""),
    });
  }

  const start = headings.findIndex((heading) => headingMatcher.test(heading.text));
  if (start < 0) return "";

  const current = headings[start]!;
  const next = headings.slice(start + 1).find((heading) => {
    if (current.level === "h3") return heading.level === "h3" || heading.level === "h2";
    return heading.level === "h2" || heading.level === "h1";
  });
  const slice = html.slice(current.end, next ? next.index : html.length);
  return stripHtml(slice);
}

export function mapWebAppContent(html: string): WebAppContent {
  const chunks = extractHtmlChunks(html);
  const quoteTitle =
    extractHeadingText(html, "h2", /planning to create/i) || WEB_APP_FALLBACK.quoteTitle;

  const introParagraphs = [
    findChunk(chunks, (text) => /creative web development company/i.test(text)),
    findChunk(chunks, (text) => /leverage powerful technologies/i.test(text)),
    findChunk(chunks, (text) => /custom software development teams/i.test(text)),
    findChunk(chunks, (text) => /avoid the high costs of training/i.test(text)),
    findChunk(chunks, (text) => /select the best engagement model/i.test(text)),
  ].filter(Boolean);

  const mapReason = (fallback: { title: string; text: string }, matcher: RegExp) => {
    const fromWp = extractSectionAfterHeading(html, matcher);
    return {
      title: extractHeadingText(html, "h3", matcher) || fallback.title,
      text: fromWp || fallback.text,
    };
  };

  const closingText = [
    findChunk(chunks, (text) => /right outsourcing partner/i.test(text)),
    findChunk(chunks, (text) => /dedicated teams for many of our happy clients/i.test(text)),
  ]
    .filter(Boolean)
    .join(" ");

  return {
    quoteTitle,
    quoteSubtitle:
      findChunk(chunks, (text) => /share your requirements/i.test(text)) ||
      WEB_APP_FALLBACK.quoteSubtitle,
    introEyebrow: "Web application development",
    introTitle:
      extractHeadingText(html, "h1", /outsourced software development/i) ||
      WEB_APP_FALLBACK.introEyebrow,
    introParagraphs:
      introParagraphs.length > 0 ? introParagraphs : WEB_APP_FALLBACK.introParagraphs,
    outsourcingTitle:
      extractHeadingText(html, "h2", /reasons to outsource/i) ||
      WEB_APP_FALLBACK.outsourcingTitle,
    outsourcingReasons: [
      mapReason(WEB_APP_FALLBACK.outsourcingReasons[0]!, /professionalism/i),
      mapReason(WEB_APP_FALLBACK.outsourcingReasons[1]!, /eye for detail/i),
      mapReason(WEB_APP_FALLBACK.outsourcingReasons[2]!, /on-?time delivery/i),
    ],
    techTitle: WEB_APP_FALLBACK.techTitle,
    websiteTitle:
      extractHeadingText(html, "h2", /website development company/i) ||
      WEB_APP_FALLBACK.websiteTitle,
    websiteReasons: [
      mapReason(WEB_APP_FALLBACK.websiteReasons[0]!, /everything under one roof/i),
      mapReason(WEB_APP_FALLBACK.websiteReasons[1]!, /economical/i),
      mapReason(WEB_APP_FALLBACK.websiteReasons[2]!, /low maintenance/i),
    ],
    closingText: closingText || WEB_APP_FALLBACK.closingText,
  };
}

export async function getWebAppContent() {
  try {
    const page = await getPageBySlug("web-app");
    if (!page?.contentHtml) return WEB_APP_FALLBACK;
    return mapWebAppContent(page.contentHtml);
  } catch {
    return WEB_APP_FALLBACK;
  }
}

export type CmsContent = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  heroImage: string;
  sections: Array<{ title: string; body: string; image?: string; bullets?: string[] }>;
};

const CMS_FALLBACK: CmsContent = {
  slug: "cms",
  title: "Outsource CMS Development India",
  eyebrow: "Content management systems",
  intro:
    "Naethra offers cost-effective CMS development services using PHP, WordPress, Joomla, and Magento, with WooCommerce and payment gateway integration when your product needs it.",
  heroImage: "https://naethra.com/wp-content/uploads/2022/06/web-app-changed.jpg",
  sections: [
    {
      title: "Website and CMS development in India",
      body: "For over 8 years, Indian website developers have delivered custom-tailored CMS solutions that are flexible and agile enough to adapt to a changing business model. From design and development to security enhancement, we create robust systems that fit the way your organisation works.",
      image: "https://naethra.com/wp-content/uploads/2022/09/cms-details.jpg",
    },
    {
      title: "A complete publishing system",
      body: "Our teams customise open-source CMS frameworks like WordPress, Joomla, and Drupal. We deliver end-to-end content management packages with responsive design, integrated analytics, and less maintenance across ecommerce, learning management, real estate, and business listing applications.",
    },
    {
      title: "Benefits of outsourcing CMS development",
      body: "Outsourcing gives you access to specialist teams, reliable delivery, and a flexible cost model while your internal team stays focused on the work only it can do.",
      image: "https://naethra.com/wp-content/uploads/2022/05/7-4-1.jpg",
      bullets: [
        "Quality assurance",
        "Cost-effective services",
        "Saving on infrastructure",
        "24/7 services",
        "Versatility",
      ],
    },
  ],
};

export function mapCmsContent(html: string): CmsContent {
  const chunks = extractHtmlChunks(html);
  const intro =
    findChunk(chunks, (text) => /cms development services/i.test(text)) || CMS_FALLBACK.intro;

  const developmentBody = [
    findChunk(chunks, (text) => /for over 8 years/i.test(text)),
    findChunk(chunks, (text) => /end-to-end content management/i.test(text)),
    findChunk(chunks, (text) => /open-source cms frameworks/i.test(text)),
    findChunk(chunks, (text) => /endeavour to provide services in all technologies/i.test(text)),
  ]
    .filter(Boolean)
    .join(" ");

  const benefitsIntro =
    findChunk(chunks, (text) => /favored for outsourcing services/i.test(text)) ||
    CMS_FALLBACK.sections[2]!.body;

  const bulletTitles = [
    extractHeadingText(html, "h4", /quality assurance/i),
    extractHeadingText(html, "h4", /cost-effective services/i),
    extractHeadingText(html, "h4", /saving on infrastructure/i),
    extractHeadingText(html, "h4", /24\*?7 services|24\/7 services/i),
    extractHeadingText(html, "h4", /versatility/i),
  ].filter(Boolean);

  const developmentImage = CMS_FALLBACK.sections[0]?.image;
  const benefitsImage = CMS_FALLBACK.sections[2]?.image;
  const benefitsBullets =
    bulletTitles.length > 0 ? bulletTitles : CMS_FALLBACK.sections[2]?.bullets;

  return {
    slug: "cms",
    title:
      extractHeadingText(html, "h1", /outsource cms development/i) || CMS_FALLBACK.title,
    eyebrow: CMS_FALLBACK.eyebrow,
    intro,
    heroImage: CMS_FALLBACK.heroImage,
    sections: [
      {
        title:
          extractHeadingText(html, "h2", /website and cms development/i) ||
          CMS_FALLBACK.sections[0]!.title,
        body: developmentBody || CMS_FALLBACK.sections[0]!.body,
        ...(developmentImage ? { image: developmentImage } : {}),
      },
      {
        title: CMS_FALLBACK.sections[1]!.title,
        body:
          [
            findChunk(chunks, (text) => /open-source cms frameworks/i.test(text)),
            findChunk(chunks, (text) => /endeavour to provide services in all technologies/i.test(text)),
          ]
            .filter(Boolean)
            .join(" ") || CMS_FALLBACK.sections[1]!.body,
      },
      {
        title:
          extractHeadingText(html, "h2", /benefits of outsourcing cms/i) ||
          CMS_FALLBACK.sections[2]!.title,
        body: benefitsIntro,
        ...(benefitsImage ? { image: benefitsImage } : {}),
        ...(benefitsBullets ? { bullets: benefitsBullets } : {}),
      },
    ],
  };
}

export async function getCmsContent() {
  try {
    const page = await getPageBySlug("cms");
    if (!page?.contentHtml) return CMS_FALLBACK;
    return mapCmsContent(page.contentHtml);
  } catch {
    return CMS_FALLBACK;
  }
}

export type FileMakerContent = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  heroImage: string;
  sections: Array<{ title: string; body: string; image?: string; bullets?: string[] }>;
};

const FILEMAKER_FALLBACK: FileMakerContent = {
  slug: "claris-filemaker-application",
  title: "Claris FileMaker Application",
  eyebrow: "FileMaker solutions",
  intro:
    "One-stop FileMaker solutions for design, development, hosting, maintenance, and 24 x 7 support services.",
  heroImage: "https://naethra.com/wp-content/uploads/2025/10/filemaker-ser-new-1.jpg",
  sections: [
    {
      title: "One-stop shop for FileMaker solutions",
      body: "We are full of people who are experts in the FileMaker field, from A-Z. We can assist with the design, development, implementation, and support of customised FileMaker solutions that connect with internal and external websites.",
      bullets: [
        "FileMaker Pro custom development",
        "FileMaker Go development",
        "WebDirect",
        "Cloud",
        "Integration",
        "Consulting",
        "Support and maintenance",
        "Migration and conversion",
      ],
    },
    {
      title: "Experience across industries and locations",
      body: "We have more than 20 years of market experience and industry know-how. More than 100 clients have chosen us for FileMaker projects across finance, construction, media, technology, retail, manufacturing, legal, education, health, and other sectors around the world.",
      image: "https://naethra.com/wp-content/uploads/2022/12/naethra-filemaker.jpg",
    },
    {
      title: "Integration, migration, and support",
      body: "FileMaker data can be integrated and synchronised with other data sources through ODBC. We can also perform complete migrations and conversions from another database, then support the solution as it grows.",
    },
  ],
};

function extractClosingListItems(html: string) {
  return Array.from(html.matchAll(/([^<>\n]{2,80}?)<\/li>/gi))
    .map((match) => stripHtml(match[1] ?? ""))
    .filter((text) => text.length > 1 && !/^https?:/i.test(text));
}

export function mapFileMakerContent(html: string): FileMakerContent {
  const chunks = extractHtmlChunks(html);

  const servicesBody =
    findChunk(chunks, (text) => /experts in the filemaker/i.test(text)) ||
    FILEMAKER_FALLBACK.sections[0]!.body;

  const experienceBody = [
    findChunk(chunks, (text) => /20 years of market experience/i.test(text)),
    findChunk(chunks, (text) => /sectors\s*[–-]/i.test(text) || /finance,? construction/i.test(text)),
    findChunk(chunks, (text) => /over 100 clients/i.test(text)),
  ]
    .filter(Boolean)
    .join(" ");

  const integrationBody =
    findChunk(chunks, (text) => /odbc/i.test(text) && /migration/i.test(text)) ||
    findChunk(chunks, (text) => /integrated and synchronized/i.test(text)) ||
    FILEMAKER_FALLBACK.sections[2]!.body;

  const bullets = extractClosingListItems(html).filter((item) =>
    /filemaker|webdirect|cloud|integration|consulting|support|migration/i.test(item),
  );

  const experienceImage = FILEMAKER_FALLBACK.sections[1]?.image;
  const serviceBullets =
    bullets.length > 0 ? bullets : FILEMAKER_FALLBACK.sections[0]?.bullets;

  return {
    slug: "claris-filemaker-application",
    title:
      extractHeadingText(html, "h1", /one-stop shop for filemaker/i) ||
      FILEMAKER_FALLBACK.title,
    eyebrow: FILEMAKER_FALLBACK.eyebrow,
    intro:
      extractHeadingText(html, "h5", /design.*develop.*hosting/i) ||
      findChunk(chunks, (text) => /design\s*\|\s*develop/i.test(text)) ||
      FILEMAKER_FALLBACK.intro,
    heroImage: FILEMAKER_FALLBACK.heroImage,
    sections: [
      {
        title:
          extractHeadingText(html, "h5", /our filemaker services/i) ||
          extractHeadingText(html, "h1", /one-stop shop for filemaker/i) ||
          FILEMAKER_FALLBACK.sections[0]!.title,
        body: servicesBody,
        ...(serviceBullets ? { bullets: serviceBullets } : {}),
      },
      {
        title: FILEMAKER_FALLBACK.sections[1]!.title,
        body: experienceBody || FILEMAKER_FALLBACK.sections[1]!.body,
        ...(experienceImage ? { image: experienceImage } : {}),
      },
      {
        title: FILEMAKER_FALLBACK.sections[2]!.title,
        body: integrationBody,
      },
    ],
  };
}

export async function getFileMakerContent() {
  try {
    const page = await getPageBySlug("claris-filemaker-application");
    if (!page?.contentHtml) return FILEMAKER_FALLBACK;
    return mapFileMakerContent(page.contentHtml);
  } catch {
    return FILEMAKER_FALLBACK;
  }
}

export type DotNetContent = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  heroImage: string;
  sections: Array<{ title: string; body: string; image?: string; bullets?: string[] }>;
};

const DOT_NET_FALLBACK: DotNetContent = {
  slug: "dot-net-application",
  title: ".NET Application Development",
  eyebrow: "Microsoft .NET development",
  intro:
    "Naethra provides full-cycle development services in Microsoft .NET for independent software vendors, product companies, and teams that need scalable custom applications.",
  heroImage: "https://naethra.com/wp-content/uploads/2022/12/net-2.jpg",
  sections: [
    {
      title: "Benefits of ASP.NET in development",
      body: ".NET provides a steady, adaptable, user-friendly, dependable, and flexible platform with low maintenance cost and strong compatibility. It enables teams to build ecommerce and business applications for customers wherever they are.",
      image: "https://naethra.com/wp-content/uploads/2022/12/net-2.jpg",
    },
    {
      title: "Maintenance and support services",
      body: "Naethra offers sustainable, constant specialist support that helps applications, websites, and digital products keep working smoothly. Prompt maintenance gives customers accuracy, continuity, and confidence after launch.",
    },
    {
      title: "Why choose Naethra for .NET services?",
      body: "We offer a broad range of ASP.NET and .NET web development services globally, with the proven capability to build robust, scalable custom applications that meet demanding business requirements.",
    },
  ],
};

export function mapDotNetContent(html: string): DotNetContent {
  const chunks = extractHtmlChunks(html);

  const intro =
    [
      findChunk(chunks, (text) => /asp\s*\.?\s*net/i.test(text) && /cross-platform/i.test(text)),
      findChunk(chunks, (text) => /excelled in delivering customized web based applications/i.test(text)),
    ]
      .filter(Boolean)
      .join(" ") || DOT_NET_FALLBACK.intro;

  const benefitsBody =
    findChunk(chunks, (text) => /highly steady|adaptable|low maintenance/i.test(text)) ||
    DOT_NET_FALLBACK.sections[0]!.body;

  const maintenanceBody =
    findChunk(chunks, (text) => /sustainable|prompt maintenance|specialized backings/i.test(text)) ||
    DOT_NET_FALLBACK.sections[1]!.body;

  const whyBody =
    findChunk(chunks, (text) => /wide range of asp|proven potential|scalable web and custom/i.test(text)) ||
    DOT_NET_FALLBACK.sections[2]!.body;

  const migrationBody = findChunk(
    chunks,
    (text) => /migrate to \.?net|flawless migration from legacy/i.test(text),
  );

  const benefitsImage = DOT_NET_FALLBACK.sections[0]?.image;

  return {
    slug: "dot-net-application",
    title: DOT_NET_FALLBACK.title,
    eyebrow: DOT_NET_FALLBACK.eyebrow,
    intro,
    heroImage: DOT_NET_FALLBACK.heroImage,
    sections: [
      {
        title:
          extractHeadingText(html, "h4", /benefits of asp/i) ||
          DOT_NET_FALLBACK.sections[0]!.title,
        body: benefitsBody,
        ...(benefitsImage ? { image: benefitsImage } : {}),
      },
      {
        title:
          extractHeadingText(html, "h4", /maintenance and support/i) ||
          DOT_NET_FALLBACK.sections[1]!.title,
        body: maintenanceBody,
      },
      {
        title:
          extractHeadingText(html, "h4", /why choose naethra/i) ||
          DOT_NET_FALLBACK.sections[2]!.title,
        body: whyBody,
      },
      ...(migrationBody
        ? [
            {
              title:
                extractHeadingText(html, "h4", /migration of other applications/i) ||
                "Why migrate other applications to ASP.NET",
              body: migrationBody,
            },
          ]
        : []),
    ],
  };
}

export async function getDotNetContent() {
  try {
    const page = await getPageBySlug("dot-net-application");
    if (!page?.contentHtml) return DOT_NET_FALLBACK;
    return mapDotNetContent(page.contentHtml);
  } catch {
    return DOT_NET_FALLBACK;
  }
}

export type AwsContent = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  heroImage: string;
  sections: Array<{ title: string; body: string; image?: string; bullets?: string[] }>;
};

const AWS_FALLBACK: AwsContent = {
  slug: "aws-cloud-support",
  title: "AWS and Cloud Support",
  eyebrow: "Cloud infrastructure and support",
  intro:
    "Move from infrastructure pressure to dependable delivery with cloud architecture, deployment, monitoring, and support shaped around your product and team.",
  heroImage: "https://naethra.com/wp-content/uploads/2022/09/web-app-img.jpg",
  sections: [
    {
      title: "Managed services",
      body: "We provide expert IT infrastructure support that can be remotely managed across servers, storage, desktop, and network management.",
      bullets: [
        "Remote IT infrastructure support",
        "Servers, storage, desktop, and network management",
        "Full ownership of your infrastructure",
        "Multi-platform support for Windows, Linux, and Mac",
      ],
    },
    {
      title: "Cloud services",
      body: "Expertise across AWS, Microsoft Azure, and GCP for hosting, migrations, infrastructure maintenance, and backup automation.",
      bullets: [
        "AWS, Microsoft Azure, and GCP",
        "Cloud-based web hosting and support",
        "On-premises to cloud migrations",
        "Cloud infrastructure maintenance",
        "Cloud-based backup automation",
      ],
    },
    {
      title: "Support beyond launch",
      body: "Our team can stay close after deployment with proactive maintenance, technical guidance, and a clear route for the next stage of your application.",
    },
  ],
};

export function mapAwsContent(html: string): AwsContent {
  const chunks = extractHtmlChunks(html);
  const listItems = extractClosingListItems(html);

  const managedBullets = listItems.filter((item) =>
    /infrastructure|servers|storage|desktop|network|ownership|windows|linux|mac/i.test(item),
  );
  const cloudBullets = listItems.filter((item) =>
    /aws|azure|gcp|cloud|migration|backup|hosting/i.test(item),
  );

  const managedBody =
    managedBullets[0] ||
    findChunk(chunks, (text) => /it infrastructure support/i.test(text)) ||
    AWS_FALLBACK.sections[0]!.body;

  const cloudBody =
    cloudBullets[0] ||
    findChunk(chunks, (text) => /expertise level experience on aws/i.test(text)) ||
    AWS_FALLBACK.sections[1]!.body;

  const managedList =
    managedBullets.length > 0 ? managedBullets : AWS_FALLBACK.sections[0]?.bullets;
  const cloudList =
    cloudBullets.length > 0 ? cloudBullets : AWS_FALLBACK.sections[1]?.bullets;

  return {
    slug: "aws-cloud-support",
    title: AWS_FALLBACK.title,
    eyebrow: AWS_FALLBACK.eyebrow,
    intro: AWS_FALLBACK.intro,
    heroImage: AWS_FALLBACK.heroImage,
    sections: [
      {
        title:
          extractHeadingText(html, "h4", /managed services/i) ||
          AWS_FALLBACK.sections[0]!.title,
        body: managedBody,
        ...(managedList ? { bullets: managedList } : {}),
      },
      {
        title:
          extractHeadingText(html, "h4", /cloud services/i) ||
          AWS_FALLBACK.sections[1]!.title,
        body: cloudBody,
        ...(cloudList ? { bullets: cloudList } : {}),
      },
      {
        title: AWS_FALLBACK.sections[2]!.title,
        body: AWS_FALLBACK.sections[2]!.body,
      },
    ],
  };
}

export async function getAwsContent() {
  try {
    const page = await getPageBySlug("aws-cloud-support");
    if (!page?.contentHtml) return AWS_FALLBACK;
    return mapAwsContent(page.contentHtml);
  } catch {
    return AWS_FALLBACK;
  }
}

export type CustomWebPublishingContent = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  heroImage: string;
  sections: Array<{ title: string; body: string; image?: string; bullets?: string[] }>;
};

const CWP_FALLBACK: CustomWebPublishingContent = {
  slug: "custom-web-publishing",
  title: "Custom Web Publishing",
  eyebrow: "FileMaker integrations",
  intro:
    "FileMaker Custom Web Publishing integrates a FileMaker database with a custom website, giving teams secure control over how business data is published and used on the web.",
  heroImage: "https://naethra.com/wp-content/uploads/2022/12/filemaker-server.jpg",
  sections: [
    {
      title: "Publish the data your users need",
      body: "FileMaker has an API that enables access through PHP, a standard tool for web development. With CWP, a website can securely publish all or a portion of your data to a few remote users or the entire web.",
      bullets: [
        "Angular",
        "PHP",
        "JavaScript and jQuery",
        "HTML5, AJAX and CSS3",
        "MySQL",
        "FileMaker Data API",
      ],
    },
    {
      title: "Custom web publishing with PHP",
      body: "The FileMaker API for PHP provides an object-oriented interface to FileMaker Pro databases. Because the web pages are built as a custom application, your team has complete control over the interface and how users interact with the data.",
      image: "https://naethra.com/wp-content/uploads/2022/12/filemaker-api-php.jpg",
      bullets: [
        "Integrate your database with another website",
        "Determine how users interact with data",
        "Control how data displays in web browsers",
      ],
    },
    {
      title: "A dependable publishing stack",
      body: "FileMaker Server brings together the web server, Web Publishing Engine, PHP engine, database server, and Admin Console. Our team can design, build, and support the connection between those layers.",
    },
  ],
};

export function mapCustomWebPublishingContent(html: string): CustomWebPublishingContent {
  const chunks = extractHtmlChunks(html);
  const listItems = extractClosingListItems(html);

  const intro =
    [
      findChunk(chunks, (text) => /custom web publishing/i.test(text) && /integrate a filemaker database/i.test(text)),
      findChunk(chunks, (text) => /with cwp, a website can be developed/i.test(text)),
    ]
      .filter(Boolean)
      .join(" ") || CWP_FALLBACK.intro;

  const techBullets = listItems.filter((item) =>
    /angular|php|javascript|jquery|html|ajax|css|mysql|data api|fm data/i.test(item),
  );

  const phpCapabilityBullets = listItems.filter((item) =>
    /integrate your database|interact with data|displays in web browsers/i.test(item),
  );

  const phpBody =
    findChunk(chunks, (text) => /filemaker api for php provides an object-oriented/i.test(text)) ||
    CWP_FALLBACK.sections[1]!.body;

  const stackBody = [
    findChunk(chunks, (text) => /web server:/i.test(text)),
    findChunk(chunks, (text) => /web publishing engine:/i.test(text)),
    findChunk(chunks, (text) => /php engine:/i.test(text)),
    findChunk(chunks, (text) => /database server:/i.test(text)),
    findChunk(chunks, (text) => /admin console:/i.test(text)),
  ]
    .filter(Boolean)
    .join(" ");

  const publishBody =
    findChunk(chunks, (text) => /application programming interface \(api\)/i.test(text)) ||
    findChunk(chunks, (text) => /enable access through php/i.test(text)) ||
    CWP_FALLBACK.sections[0]!.body;

  const phpImage = CWP_FALLBACK.sections[1]?.image;
  const techList = techBullets.length > 0 ? techBullets : CWP_FALLBACK.sections[0]?.bullets;
  const phpList =
    phpCapabilityBullets.length > 0
      ? phpCapabilityBullets
      : CWP_FALLBACK.sections[1]?.bullets;

  return {
    slug: "custom-web-publishing",
    title: CWP_FALLBACK.title,
    eyebrow: CWP_FALLBACK.eyebrow,
    intro,
    heroImage: CWP_FALLBACK.heroImage,
    sections: [
      {
        title: CWP_FALLBACK.sections[0]!.title,
        body: publishBody,
        ...(techList ? { bullets: techList } : {}),
      },
      {
        title:
          extractHeadingText(html, "h4", /custom web publishing with php/i) ||
          CWP_FALLBACK.sections[1]!.title,
        body: phpBody,
        ...(phpImage ? { image: phpImage } : {}),
        ...(phpList ? { bullets: phpList } : {}),
      },
      {
        title: CWP_FALLBACK.sections[2]!.title,
        body: stackBody || CWP_FALLBACK.sections[2]!.body,
      },
    ],
  };
}

export async function getCustomWebPublishingContent() {
  try {
    const page = await getPageBySlug("custom-web-publishing");
    if (!page?.contentHtml) return CWP_FALLBACK;
    return mapCustomWebPublishingContent(page.contentHtml);
  } catch {
    return CWP_FALLBACK;
  }
}

export type ServicesPageItem = {
  title: string;
  description: string;
  href: string;
};

export type ServicesPageContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: ServicesPageItem[];
};

const SERVICES_FALLBACK: ServicesPageContent = {
  eyebrow: "What we do",
  title: "Technology that works for the way you work.",
  subtitle:
    "One engineering squad creating websites, proprietary FileMaker products, and mobile applications.",
  items: [
    {
      title: "iOS, Android and hybrid mobility applications",
      description:
        "Build connected mobile experiences across native and cross-platform technologies.",
      href: "/mobile-app",
    },
    {
      title: "Website development",
      description: "Websites and application experiences shaped around your product and users.",
      href: "/web-app",
    },
    {
      title: "Content management system",
      description: "Flexible CMS solutions with publishing workflows, integrations, and analytics.",
      href: "/cms",
    },
    {
      title: "Java/J2EE applications",
      description: "Enterprise Java solutions that improve the way your business builds software.",
      href: "/services/dot-net-application",
    },
    {
      title: "PHP/MySQL applications",
      description: "Practical, scalable PHP and database applications for growing organisations.",
      href: "/web-app",
    },
    {
      title: ".NET applications",
      description: "Full-cycle Microsoft .NET development for robust custom applications.",
      href: "/services/dot-net-application",
    },
    {
      title: "FileMaker development",
      description: "Certified FileMaker development, integrations, and custom business tools.",
      href: "/services/claris-filemaker-application",
    },
    {
      title: "Custom web publishing with PHP",
      description: "Publish FileMaker data securely through custom web applications.",
      href: "/services/custom-web-publishing",
    },
    {
      title: "Cloud solutions",
      description: "Cloud infrastructure, support, and application delivery that can scale with you.",
      href: "/services/aws-cloud-support",
    },
  ],
};

function findServiceDescription(chunks: string[], titleMatcher: RegExp, descriptionMatcher: RegExp) {
  const titled = chunks.find((text) => titleMatcher.test(text));
  if (titled && titled.length > 40 && descriptionMatcher.test(titled)) {
    return titled.replace(titleMatcher, "").trim() || titled;
  }
  return findChunk(chunks, (text) => descriptionMatcher.test(text));
}

export function mapServicesPageContent(html: string): ServicesPageContent {
  const chunks = extractHtmlChunks(html);
  const plain = stripHtml(html);

  const mapItem = (
    fallback: ServicesPageItem,
    titleMatcher: RegExp,
    descriptionMatcher: RegExp,
  ): ServicesPageItem => {
    const titleFromWp =
      chunks.find((text) => titleMatcher.test(text) && text.length < 90)?.trim() ||
      plain.match(titleMatcher)?.[0] ||
      "";

    const description =
      findServiceDescription(chunks, titleMatcher, descriptionMatcher) || fallback.description;

    return {
      title: titleFromWp
        ? titleFromWp
            .replace(/\s+/g, " ")
            .replace(/\bJave\b/i, "Java")
            .replace(/\s*\(CWP\)\s*$/i, "")
            .replace(/\bIOS\b/g, "iOS")
            .replace(/\bANDROID\b/g, "Android")
            .replace(/\bHYBRID MOBILITY APPLICATIONS\b/i, "hybrid mobility applications")
            .replace(/\bWEBSITE DEVELOPMENT\b/i, "Website development")
            .replace(/\bCONTENT MANAGEMENT SYSTEM\b/i, "Content management system")
            .replace(/\bJAVE?\/J2EE APPLICATIONS\b/i, "Java/J2EE applications")
            .replace(/\bPHP\/MYSQL APPLICATIONS\b/i, "PHP/MySQL applications")
            .replace(/\b\.?\s*Net Applications\b/i, ".NET applications")
            .replace(/\bFileMaker Development\b/i, "FileMaker development")
            .replace(/\bCustom Web Publishing with PHP\b/i, "Custom web publishing with PHP")
            .replace(/\bCloud Solutions\b/i, "Cloud solutions")
        : fallback.title,
      description: description.replace(/…$/, "…").trim() || fallback.description,
      href: fallback.href,
    };
  };

  return {
    eyebrow: SERVICES_FALLBACK.eyebrow,
    title: SERVICES_FALLBACK.title,
    subtitle: SERVICES_FALLBACK.subtitle,
    items: [
      mapItem(
        SERVICES_FALLBACK.items[0]!,
        /ios,? android and hybrid mobility applications/i,
        /first mobile app project|mobile applications have been the fastest/i,
      ),
      mapItem(
        SERVICES_FALLBACK.items[1]!,
        /website development/i,
        /skilled and experienced development team|technology and user interface solutions/i,
      ),
      mapItem(
        SERVICES_FALLBACK.items[2]!,
        /content management system/i,
        /open source content management systems|easily downloaded by anyone/i,
      ),
      mapItem(
        SERVICES_FALLBACK.items[3]!,
        /jav[ea]?\/j2ee applications/i,
        /java competency center|improve the way it builds software/i,
      ),
      mapItem(
        SERVICES_FALLBACK.items[4]!,
        /php\/mysql applications/i,
        /widely-used general-purpose scripting language|especially suited for web development/i,
      ),
      mapItem(
        SERVICES_FALLBACK.items[5]!,
        /\.?net applications/i,
        /full-cycle development services in microsoft \.?net|independent software vendors/i,
      ),
      mapItem(
        SERVICES_FALLBACK.items[6]!,
        /filemaker development/i,
        /100 person years|certified fm developers/i,
      ),
      mapItem(
        SERVICES_FALLBACK.items[7]!,
        /custom web publishing with php/i,
        /filemaker-to-web solution|controlled public access to your data/i,
      ),
      mapItem(
        SERVICES_FALLBACK.items[8]!,
        /cloud solutions/i,
        /cloud computing is the delivery of computing services/i,
      ),
    ],
  };
}

export async function getServicesPageContent() {
  try {
    const page = await getPageBySlug("services");
    if (!page?.contentHtml) return SERVICES_FALLBACK;
    return mapServicesPageContent(page.contentHtml);
  } catch {
    return SERVICES_FALLBACK;
  }
}

export type HomeTestimonial = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

const HOME_TESTIMONIALS_FALLBACK: HomeTestimonial[] = [
  {
    name: "Vasudha Bhushan",
    role: "Manager, Software Technology & Engineering",
    quote:
      "We recently had the pleasure of outsourcing our application development to Naethra, and we are extremely satisfied with the results.",
    image: "",
  },
  {
    name: "Steve Chun",
    role: "Howard Investments Inc., New York",
    quote:
      "Naethra continues to do great work for us. We look forward to additional development of our custom application.",
    image: "",
  },
  {
    name: "Sandeep Shah",
    role: "Director, Rajdeep Automation",
    quote:
      "Their professionalism, detailed explanations, and commitment made the whole website development experience a pleasure.",
    image: "",
  },
  {
    name: "Shazad Din",
    role: "Boro Blinds, Middlesbrough",
    quote:
      "These guys are FileMaker experts. They really know their stuff and deliver dependable results.",
    image: "",
  },
];

export function mapHomeTestimonials(html: string): HomeTestimonial[] {
  const start = html.search(/what\s+naethra.?s\s+clients\s+say/i);
  if (start < 0) return HOME_TESTIMONIALS_FALLBACK;

  const endMatch = html.slice(start).search(/proud\s+to\s+have\s+picked/i);
  const section = html.slice(start, endMatch > 0 ? start + endMatch : undefined);
  const cleaned = section.replace(/<style[\s\S]*?<\/style>/gi, "");

  const matches = Array.from(
    cleaned.matchAll(
      /(?:^|>)\s*([A-Za-z][^<\n]{1,80}?)\s*<\/div>\s*([^<\n]{2,140}?)\s*<\/div>\s*[“"]?([^<\n]{15,}?)[”"]?\s*<\/p>/g,
    ),
  );

  const testimonials = matches
    .map((match) => {
      const name = stripHtml(match[1] ?? "");
      const role = stripHtml(match[2] ?? "");
      const quote = stripHtml(match[3] ?? "").replace(/^[“"']|[”"']$/g, "").trim();
      if (!name || !quote || /^what\s+naethra/i.test(name)) return null;
      return {
        name,
        role,
        quote,
        image: "",
      };
    })
    .filter((item): item is HomeTestimonial => Boolean(item));

  return testimonials.length > 0 ? testimonials : HOME_TESTIMONIALS_FALLBACK;
}

export async function getHomeTestimonials() {
  try {
    const page = await getPageBySlug("home");
    if (!page?.contentHtml) return HOME_TESTIMONIALS_FALLBACK;
    return mapHomeTestimonials(page.contentHtml);
  } catch {
    return HOME_TESTIMONIALS_FALLBACK;
  }
}

export type FlutterContent = {
  eyebrow: string;
  title: string;
  intro: string;
  calloutEyebrow: string;
  calloutTitle: string;
  calloutBody: string;
  benefitsTitle: string;
  benefits: string[];
  closingTitle: string;
  closingBody: string;
};

const FLUTTER_FALLBACK: FlutterContent = {
  eyebrow: "Flutter application development",
  title: "Build innovative apps with Flutter",
  intro:
    "Build innovative apps with Flutter for enhanced web and mobile experience.",
  calloutEyebrow: "Why Flutter",
  calloutTitle: "One thoughtful experience across the devices your customers use.",
  calloutBody:
    "Flutter app development is quickly transforming the world of native applications. With a single codebase, teams ship polished, responsive interfaces without treating mobile and web as separate worlds.",
  benefitsTitle: "What we can help you ship",
  benefits: [
    "One codebase for iOS and Android",
    "Fast, expressive interfaces",
    "A flexible foundation for future web and mobile experiences",
    "Support for upgrades, fixes, and extensions after launch",
  ],
  closingTitle: "A clear route to the next release",
  closingBody:
    "Whether you are starting from a product idea, extending an existing application, or resolving a difficult technical issue, we begin with the context and finish with a useful, supportable result.",
};

export function mapFlutterContent(html: string): FlutterContent {
  const chunks = extractHtmlChunks(html);
  const plain = stripHtml(html);

  const benefitMatchers: Array<[RegExp, string]> = [
    [/one codebase|efficient code building/i, "One codebase for iOS and Android"],
    [/fast,? high-performance|smooth performance/i, "Fast, expressive interfaces"],
    [/support for older devices|consistently across multiple platforms/i, "A flexible foundation for future web and mobile experiences"],
    [/support and maintenance|bug fixing|feature updates/i, "Support for upgrades, fixes, and extensions after launch"],
  ];

  const benefits = benefitMatchers
    .map(([matcher, fallback]) => {
      if (matcher.test(plain)) return fallback;
      const fromWp = findChunk(chunks, (text) => matcher.test(text));
      return fromWp ? fallback : "";
    })
    .filter(Boolean);

  const heroBenefits = ["Advanced Features", "Best User Experience", "Cost Effective"].filter(
    (label) => plain.toLowerCase().includes(label.toLowerCase()),
  );

  return {
    eyebrow: FLUTTER_FALLBACK.eyebrow,
    title:
      findChunk(chunks, (text) => /build innovative apps with flutter/i.test(text))
        ?.replace(/\s+for enhanced.*$/i, "")
        .trim() || FLUTTER_FALLBACK.title,
    intro:
      findChunk(chunks, (text) => /build innovative apps with flutter/i.test(text)) ||
      findChunk(chunks, (text) => /leading flutter app development company/i.test(text)) ||
      FLUTTER_FALLBACK.intro,
    calloutEyebrow: FLUTTER_FALLBACK.calloutEyebrow,
    calloutTitle:
      findChunk(chunks, (text) => /persuasive reasons to choose flutter/i.test(text)) ||
      FLUTTER_FALLBACK.calloutTitle,
    calloutBody:
      findChunk(chunks, (text) => /quickly transforming the world of native/i.test(text)) ||
      FLUTTER_FALLBACK.calloutBody,
    benefitsTitle: FLUTTER_FALLBACK.benefitsTitle,
    benefits:
      benefits.length > 0
        ? benefits
        : heroBenefits.length > 0
          ? heroBenefits
          : FLUTTER_FALLBACK.benefits,
    closingTitle:
      findChunk(chunks, (text) => /hire flutter app developers/i.test(text)) ||
      FLUTTER_FALLBACK.closingTitle,
    closingBody:
      findChunk(chunks, (text) => /mobile app development using flutter/i.test(text)) ||
      findChunk(chunks, (text) => /flutter mobile app development services are designed/i.test(text)) ||
      FLUTTER_FALLBACK.closingBody,
  };
}

export async function getFlutterContent() {
  try {
    const page = await getPageBySlug("flutter-app-development-company");
    if (!page?.contentHtml) return FLUTTER_FALLBACK;
    return mapFlutterContent(page.contentHtml);
  } catch {
    return FLUTTER_FALLBACK;
  }
}

export type MobileAppContent = {
  title: string;
  introParagraphs: string[];
  trackRecord: Array<{ title: string; body: string }>;
  techTitle: string;
  capabilities: Array<{ title: string; body: string }>;
  skillPoolTitle: string;
  skillPoolBody: string;
  skillPoolImage: string;
  callout: string;
  blogTitle: string;
  blogCategory: string;
  blogHeadline: string;
  blogExcerpt: string;
  blogHref: string;
  blogImage: string;
};

const MOBILE_APP_FALLBACK: MobileAppContent = {
  title: "Mobile App Development Service",
  introParagraphs: [
    "We help our customers stay connected through interactive and functional mobile apps. We have strong capabilities across the app development lifecycle starting with Business analysis of the initial idea, UI/UX design, software development, Quality assurance and secure PlayStore deployment. We are technology agnostic and have strong capabilities in native iOS, Android and cross-platform technologies such as Angular, Cordova, Ionic native, Flutter and React native etc.",
    "Do you want an innovative solution to support your business? Bring it to us! We deliver mobile solutions that fit your budget and are delivered on time.",
  ],
  trackRecord: [
    {
      title: "STRONG TRACK RECORD",
      body: "Indian app developers are a popular choice for businesses looking to get the most bang for their buck. They are some of the most cost-effective developers in the world, while also being good at what they do. Indian app developers are skilled in a variety of programming languages, cutting-edge technology, and cross-platform mobile application development, so they can easily accommodate most outsourcing needs.",
    },
    {
      title: "POPULAR DESTINATION",
      body: "As the mobile app market continues to grow, so does the demand for skilled app developers. India has become a popular destination for companies looking to outsource their app development projects due to the vast pool of talented developers and lower cost of labor. Indian app developers can accommodate Native Android, iOS, and cross-platform application needs.",
    },
    {
      title: "GOVERNMENT SUPPORT",
      body: "In recent years, the Government of India has made significant strides to improve the business environment for Android app developers and entrepreneurs. Initiatives like Startup India have provided infrastructure and policy support, helping development firms and entrepreneurs thrive while mobile internet adoption continues to grow.",
    },
  ],
  techTitle: "Mobile App",
  capabilities: [
    {
      title: "FAMILIARITY WITH TECHNOLOGIES",
      body: "Indian app developers working in cutting-edge mobile app development companies are familiar with Java, Android Studio, and other popular app development frameworks and toolsets. This allows teams to rapidly develop high-quality apps for a wide range of platforms and devices while keeping up with the latest mobile technology advancements.",
    },
    {
      title: "DELIVERING HIGH-QUALITY STANDARDS",
      body: "Indian IT companies working on digital solutions and application development services offer quality standards on par with the best in the world. They invest in training, daily scrum meetings, and stringent quality control measures. As a result, mobile application development companies provide excellent service at competitive prices.",
    },
    {
      title: "GREAT TALENT",
      body: "Indian app developers are some of the most talented in the world. They understand user experience and mobile app design, creating high-quality apps that are user-friendly and visually appealing. They also understand design thinking principles and how to create engaging interfaces for audiences in the United States and Europe.",
    },
  ],
  skillPoolTitle: "LARGE SKILL POOL",
  skillPoolBody:
    "India is home to a large pool of skilled developers, making it an attractive location for app development companies. The cost of doing business in India is also relatively low, which lowers the overall project budget. This makes India an attractive destination for mobile app development companies.",
  skillPoolImage: "https://naethra.com/wp-content/uploads/2022/07/mob-app-landing.jpg",
  callout:
    "If you are looking for a software development company or a Web and Mobile app development solution, Naethra Technologies is here to help you. We have put together a team that is dedicated to helping you achieve your goals.",
  blogTitle: "Blogs",
  blogCategory: "Hybrid App",
  blogHeadline: "Hybrid App",
  blogExcerpt:
    "Hybrid App development is a kind of coding approach, rather than a particular variety of apps.",
  blogHref: "/blogs/hybrid-app",
  blogImage:
    "https://naethra.com/wp-content/uploads/2022/08/hyprid-app-thegem-post-thumb-large.png",
};

export function mapMobileAppContent(html: string): MobileAppContent {
  const chunks = extractHtmlChunks(html);

  const mapCard = (fallback: { title: string; body: string }, matcher: RegExp) => {
    const fromWp = extractSectionAfterHeading(html, matcher);
    return {
      title: extractHeadingText(html, "h3", matcher) || fallback.title,
      body: fromWp || findChunk(chunks, (text) => matcher.test(text)) || fallback.body,
    };
  };

  const introParagraphs = [
    findChunk(chunks, (text) => /help our customers stay connected/i.test(text)),
    findChunk(chunks, (text) => /innovative solution to support your business/i.test(text)),
  ].filter(Boolean);

  return {
    title:
      extractHeadingText(html, "h1", /mobile app development service/i) ||
      MOBILE_APP_FALLBACK.title,
    introParagraphs:
      introParagraphs.length > 0 ? introParagraphs : MOBILE_APP_FALLBACK.introParagraphs,
    trackRecord: [
      mapCard(MOBILE_APP_FALLBACK.trackRecord[0]!, /strong track record/i),
      mapCard(MOBILE_APP_FALLBACK.trackRecord[1]!, /popular destination/i),
      mapCard(MOBILE_APP_FALLBACK.trackRecord[2]!, /government support/i),
    ],
    techTitle:
      extractHeadingText(html, "h2", /^mobile app$/i) || MOBILE_APP_FALLBACK.techTitle,
    capabilities: [
      mapCard(MOBILE_APP_FALLBACK.capabilities[0]!, /familiarity with technologies/i),
      mapCard(MOBILE_APP_FALLBACK.capabilities[1]!, /delivering high-quality standards/i),
      mapCard(MOBILE_APP_FALLBACK.capabilities[2]!, /great talent/i),
    ],
    skillPoolTitle:
      extractHeadingText(html, "h2", /large skill pool/i) || MOBILE_APP_FALLBACK.skillPoolTitle,
    skillPoolBody:
      findChunk(chunks, (text) => /large pool of skilled developers/i.test(text)) ||
      MOBILE_APP_FALLBACK.skillPoolBody,
    skillPoolImage: MOBILE_APP_FALLBACK.skillPoolImage,
    callout:
      findChunk(chunks, (text) => /software development company in india that suits your budget/i.test(text)) ||
      findChunk(chunks, (text) => /naethra technologies in chennai/i.test(text)) ||
      MOBILE_APP_FALLBACK.callout,
    blogTitle:
      extractHeadingText(html, "h4", /blogs/i) || MOBILE_APP_FALLBACK.blogTitle,
    blogCategory: MOBILE_APP_FALLBACK.blogCategory,
    blogHeadline:
      findChunk(chunks, (text) => /^hybrid app$/i.test(text)) ||
      MOBILE_APP_FALLBACK.blogHeadline,
    blogExcerpt:
      findChunk(chunks, (text) => /hybrid (app )?development is a kind of coding approach/i.test(text)) ||
      MOBILE_APP_FALLBACK.blogExcerpt,
    blogHref: MOBILE_APP_FALLBACK.blogHref,
    blogImage: MOBILE_APP_FALLBACK.blogImage,
  };
}

export async function getMobileAppContent() {
  try {
    const page = await getPageBySlug("mobile-app");
    if (!page?.contentHtml) return MOBILE_APP_FALLBACK;
    return mapMobileAppContent(page.contentHtml);
  } catch {
    return MOBILE_APP_FALLBACK;
  }
}

export async function getPosts(page = 1, perPage = 20) {
  // List views omit full post HTML so the route payload stays small enough for
  // client navigations (full content is only loaded on the detail route).
  const posts = await wpFetch<WpPost[]>(
    `/posts?page=${page}&per_page=${perPage}&_embed&status=publish&_fields=id,date,slug,title,excerpt,_links,_embedded`,
  );
  return posts.map((post) => mapWpPost(post, { includeContent: false }));
}

export async function getPostBySlug(slug: string) {
  const posts = await wpFetch<WpPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed&status=publish`,
  );
  const post = posts[0];
  return post ? mapWpPost(post, { includeContent: true }) : null;
}

export async function getPortfolio(perPage = 50) {
  const items = await wpFetch<WpPost[]>(`/portfolio?per_page=${perPage}&_embed`);
  return items.map(mapWpPortfolio);
}
