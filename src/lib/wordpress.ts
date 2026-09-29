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
  const res = await fetch(`${WP_BASE}${path}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "NaethraFrontend/1.0",
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

export function mapWpPost(post: WpPost): WpBlogPost {
  const contentHtml = post.content?.rendered ?? "";
  const categories = getCategories(post);
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "";
  const dateIso = post.date ?? "";
  const author = post._embedded?.author?.[0]?.name?.trim() || "Naethra";

  return {
    slug: post.slug ?? "",
    title: stripHtml(post.title?.rendered ?? "Untitled"),
    excerpt: stripHtml(post.excerpt?.rendered ?? ""),
    date: dateIso ? formatDate(dateIso) : "",
    dateIso,
    author,
    category: categories[0] ?? "Blog",
    categories,
    image,
    contentHtml,
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
  const posts = await wpFetch<WpPost[]>(
    `/posts?page=${page}&per_page=${perPage}&_embed&status=publish`,
  );
  return posts.map(mapWpPost);
}

export async function getPostBySlug(slug: string) {
  const posts = await wpFetch<WpPost[]>(
    `/posts?slug=${encodeURIComponent(slug)}&_embed&status=publish`,
  );
  const post = posts[0];
  return post ? mapWpPost(post) : null;
}

export async function getPortfolio(perPage = 50) {
  const items = await wpFetch<WpPost[]>(`/portfolio?per_page=${perPage}&_embed`);
  return items.map(mapWpPortfolio);
}
