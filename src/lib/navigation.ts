import { getWordpressApiUrl } from "@/lib/env";

const WORDPRESS_API_BASE = getWordpressApiUrl();

const WORDPRESS_ORIGIN =
  WORDPRESS_API_BASE.replace(/\/wp-json\/wp\/v2\/?$/i, "") || "https://naethra.com";

export type NavigationItem = {
  id: number;
  label: string;
  href: string;
  target: string;
  children: NavigationItem[];
};

export const PRIMARY_MENU_FALLBACK: NavigationItem[] = [
  {
    id: -1,
    label: "Mobile",
    href: "/mobile-app",
    target: "",
    children: [
      {
        id: -2,
        label: "Flutter",
        href: "/flutter-app-development-company",
        target: "",
        children: [],
      },
    ],
  },
  { id: -3, label: "Web App", href: "/web-app", target: "", children: [] },
  { id: -4, label: "Portfolio", href: "/portfolio", target: "", children: [] },
  {
    id: -5,
    label: "Services",
    href: "/services",
    target: "",
    children: [
      {
        id: -6,
        label: "Content Management System",
        href: "/cms",
        target: "",
        children: [],
      },
      {
        id: -7,
        label: "Custom Web Publishing",
        href: "/services/custom-web-publishing",
        target: "",
        children: [],
      },
      {
        id: -8,
        label: "Dot Net Application",
        href: "/services/dot-net-application",
        target: "",
        children: [],
      },
      {
        id: -9,
        label: "AWS & Cloud Support",
        href: "/services/aws-cloud-support",
        target: "",
        children: [],
      },
    ],
  },
  {
    id: -10,
    label: "FileMaker",
    href: "/services/claris-filemaker-application",
    target: "",
    children: [],
  },
  {
    id: -11,
    label: "About Us",
    href: "/about",
    target: "",
    children: [{ id: -12, label: "Blogs", href: "/blogs", target: "", children: [] }],
  },
  { id: -13, label: "Contact Us", href: "/contact-us", target: "", children: [] },
  {
    id: -14,
    label: "30 mins meeting",
    href: "/30-mins-meeting",
    target: "",
    children: [],
  },
];

type WordPressMenuItem = {
  id?: number;
  label?: string;
  url?: string;
  target?: string;
  children?: WordPressMenuItem[];
};

type WordPressMenuResponse = {
  items?: WordPressMenuItem[];
};

function normalizeMenuHref(url: string) {
  try {
    const parsed = new URL(url, WORDPRESS_ORIGIN);

    if (parsed.origin !== new URL(WORDPRESS_ORIGIN).origin) {
      return url;
    }

    let pathname = parsed.pathname.replace(/\/+$/, "") || "/";
    if (pathname === "/about-us") pathname = "/about";
    return `${pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return url;
  }
}

function decodeMenuLabel(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCharCode(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'");
}

function mapMenuItem(item: WordPressMenuItem): NavigationItem | null {
  if (typeof item.id !== "number" || !item.label || !item.url) return null;

  return {
    id: item.id,
    label: decodeMenuLabel(item.label),
    href: normalizeMenuHref(item.url),
    target: item.target ?? "",
    children: (item.children ?? [])
      .map(mapMenuItem)
      .filter((child): child is NavigationItem => child !== null),
  };
}

export async function getPrimaryMenu() {
  try {
    const response = await fetch(`${WORDPRESS_ORIGIN}/wp-json/naethra/v1/menu/primary`);
    if (!response.ok) throw new Error(`Menu request failed: ${response.status}`);

    const data = (await response.json()) as WordPressMenuResponse;
    const items = (data.items ?? [])
      .map(mapMenuItem)
      .filter((item): item is NavigationItem => item !== null);

    return items.length > 0 ? items : PRIMARY_MENU_FALLBACK;
  } catch {
    return PRIMARY_MENU_FALLBACK;
  }
}

export function splitPrimaryMenu(items: NavigationItem[]) {
  const meetingItem = items.find((item) => /30\s*mins?\s*meeting/i.test(item.label));
  return {
    navigationItems: items.filter((item) => item !== meetingItem),
    meetingItem:
      meetingItem ??
      PRIMARY_MENU_FALLBACK.find((item) => /30\s*mins?\s*meeting/i.test(item.label))!,
  };
}
