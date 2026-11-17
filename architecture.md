# Project Architecture

Naethra Technologies marketing site — a multi-page React application with SSR, content loaded from WordPress REST API (with local fallbacks), built on TanStack Start and Vite.

---

## 1. Overview

| Concern | Choice |
|--------|--------|
| App type | Marketing / showcase site (services, portfolio, blogs, about, contact) |
| Framework | React 19 + TanStack Start (SSR) + TanStack Router |
| Build | Vite 8 + Nitro (Cloudflare-oriented via Lovable config) |
| Styling | Tailwind CSS 4 + modular CSS modules under `src/styles/` |
| Content | WordPress REST API (`wp/v2`) with static TypeScript fallbacks |
| Hosting / editor | Lovable-connected repo; avoid rewriting published git history |

The site is primarily **content presentation**. Contact CTAs link out; there is no first-party auth or app database. Optional WordPress credentials in `.env` are for private tooling, not browser fetches.

---

## 2. High-level architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                        Client / Browser                      │
│  React routes · loaders · React Query context · Jarvis UI    │
└────────────────────────────┬────────────────────────────────┘
                             │ SSR + hydration
┌────────────────────────────▼────────────────────────────────┐
│                 TanStack Start (src/server.ts)               │
│  Request middleware (CSRF, error HTML) · Nitro fetch entry  │
└────────────────────────────┬────────────────────────────────┘
                             │ Route loaders
┌────────────────────────────▼────────────────────────────────┐
│              Data layer (src/lib/wordpress.ts)               │
│  wpFetch → map*Content / mapWpPost → typed page models      │
│  On failure → *_FALLBACK / service-data / blog-data          │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS JSON
┌────────────────────────────▼────────────────────────────────┐
│         WordPress REST API (VITE_WORDPRESS_API_URL)          │
│  /posts · /pages · /portfolio · team CPT (optional)         │
└─────────────────────────────────────────────────────────────┘
```

**Request path (typical page):**

1. Browser hits a URL → Nitro / Start `fetch` (`src/server.ts`).
2. Router matches a file route under `src/routes/`.
3. Route `loader` calls a `get*Content()` / `getPosts()` helper.
4. Helper fetches WP JSON, parses HTML into structured sections, or returns fallback.
5. Component renders via shared layouts (`NaethraContentHeader`, `ServiceDetailPage`, etc.).
6. Root shell hydrates with QueryClient, smooth scroll, footer, Jarvis assistant.

---

## 3. Tech stack

### Runtime & app shell

- **React 19** — UI
- **TanStack Router** — file-based routes; `src/routeTree.gen.ts` is generated
- **TanStack Start** — SSR, `src/start.ts` middleware, `src/server.ts` entry
- **TanStack React Query** — provided on the router context / root (available for client data)
- **Vite** — bundler; config via `@lovable.dev/vite-tanstack-config`
- **Nitro** — server build target (default Cloudflare-oriented through Lovable plugin)

### UI & motion

- **Tailwind CSS 4** + **tw-animate-css**
- **shadcn/ui** (New York) under `src/components/ui/`
- **Lucide** / **Hugeicons** — icons
- **Lenis** — smooth scroll (`SmoothScroll`)
- **Three.js** — used by Jarvis / arc-reactor visuals where applicable
- **Embla** — carousels (portfolio)

### Forms / validation (available)

- React Hook Form, Zod, Radix primitives — present in the kit; contact page is mostly presentation/CTA oriented

---

## 4. Directory map

```text
naethra-new/
├── architecture.md          # This document
├── design.md                # Visual / brand rules (About + site-wide)
├── AGENTS.md                # Lovable git-safety notes for agents
├── docs/
│   └── WORDPRESS_TO_STRAPI_MAPPING.md
├── public/                  # Static assets (logo, favicon, robots)
├── wordpress/               # WP-side helpers (e.g. team REST enable)
├── src/
│   ├── start.ts             # Start middleware: errors + CSRF for serverFns
│   ├── server.ts            # SSR fetch wrapper; normalizes catastrophic 500s
│   ├── router.tsx           # createRouter + QueryClient context
│   ├── routeTree.gen.ts     # Generated route tree (do not hand-edit)
│   ├── styles.css           # Tailwind entry + style sheet imports
│   ├── styles/              # base, home, content, pages, blog-prose
│   ├── routes/              # File-based pages (see §5)
│   ├── components/          # App chrome + feature components
│   │   └── ui/              # shadcn primitives
│   ├── lib/                 # Data, HTML parsing, utils, errors
│   ├── assets/              # Local images (heroes, founders, services)
│   └── hooks/
├── vite.config.ts
└── package.json
```

### Ownership of key folders

| Path | Role |
|------|------|
| `src/routes/` | One file ≈ one URL; loaders own data fetching |
| `src/lib/wordpress.ts` | Single integration surface for WP + page mappers + fallbacks |
| `src/lib/service-data.ts` | Static service catalog + parallel service detail models |
| `src/lib/blog-data.ts` / `portfolio-data.ts` | Static fallback / reference content |
| `src/lib/blog-html.ts` | Clean WP post HTML for article rendering |
| `src/components/` | Shared page chrome and page-specific compositions |
| `src/styles/` | Large layout CSS split by surface (home / content / pages) |

---

## 5. Routing & pages

Routes use TanStack **file-based routing**. `createFileRoute("/path")` in each file registers the route; the plugin regenerates `routeTree.gen.ts`.

### Site map

| Route | Purpose | Primary data |
|-------|---------|--------------|
| `/` | Home (services, work, insights, contact) | Testimonials + posts (WP) |
| `/about/` | Specialty, services, team | `getAboutContent()` |
| `/about/specialty`, `/about/services`, `/about/team` | About subpages | Layout wrappers |
| `/services/` | Services index | `getServicesPageContent()` |
| `/services/claris-filemaker-application` | FileMaker | `getFileMakerContent()` |
| `/services/dot-net-application` | .NET | `getDotNetContent()` |
| `/services/aws-cloud-support` | AWS / cloud | `getAwsContent()` |
| `/services/custom-web-publishing` | CWP / PHP | `getCustomWebPublishingContent()` |
| `/cms` | CMS service | `getCmsContent()` |
| `/web-app` | Web app service | `getWebAppContent()` |
| `/mobile-app` | Mobile service | `getMobileAppContent()` |
| `/flutter-app-development-company` | Flutter | `getFlutterContent()` |
| `/portfolio` | Portfolio carousel / grid | `getPortfolio()` |
| `/blogs/`, `/blogs/$slug` | Blog list & article | `getPosts` / `getPostBySlug` |
| `/contact-us` | Contact | Static UI |
| `/privacy-policy`, `/terms-and-conditions`, `/disclaimer-and-notification` | Legal | WP pages via slug |

### Route patterns

**Service detail (thin route + shared page):**

```text
Route file
  → loader: get*Content()
  → <ServiceDetailPage service={data} heroBanner? />
```

**Content / marketing pages:**

```text
Route file
  → loader: get*Content()
  → custom JSX + NaethraContentHeader + SiteFooter (footer often from root)
```

**Root layout (`src/routes/__root.tsx`):**

- HTML shell (`shellComponent`) with `HeadContent` / `Scripts`
- Global CSS + Google fonts
- `QueryClientProvider`
- `SmoothScroll`, spotlight cursor, Jarvis AI, scroll-to-top
- `SiteFooter` on all paths except `/`
- `FakeJobsDisclaimerModal` on home only
- Shared 404 and error UI (Jarvis-themed)

---

## 6. Data layer

### WordPress client

`src/lib/wordpress.ts` is the **central content adapter**:

1. **`wpFetch(path)`** — `GET ${VITE_WORDPRESS_API_URL}${path}` with `Accept: application/json` only (avoids CORS preflight issues).
2. **Raw fetch helpers** — `getPageBySlug`, `getPosts`, `getPostBySlug`, `getPortfolio`, `getTeamPersons`.
3. **HTML → structured models** — `mapAboutContent`, `mapFileMakerContent`, `mapCmsContent`, etc. parse Elementor/WP HTML into `{ title, intro, heroImage, sections[] }`.
4. **Fallbacks** — each `get*Content()` wraps fetch/map in `try/catch` and returns a `*_FALLBACK` constant so the site stays online if WP is down.

### Content model (services)

Most service pages share:

```ts
{
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  heroImage: string;           // often local @/assets/... import
  sections: Array<{
    title: string;
    body: string;
    image?: string;            // local or WP media URL
    bullets?: string[];
  }>;
}
```

`ServiceDetailPage` renders this shape. Local images under `src/assets/{service}/` are preferred for heroes and key section art (e.g. FileMaker `services.png`).

### Parallel static modules

| Module | Use |
|--------|-----|
| `service-data.ts` | Home/services nav catalog + static `serviceDetails` mirror |
| `blog-data.ts` | Typed blog fallback shape / sample posts |
| `portfolio-data.ts` | Static portfolio list with WP media URLs |

Live pages generally prefer **wordpress.ts loaders**; static modules backfill and support UI that does not hit the API.

### Planned CMS evolution

`docs/WORDPRESS_TO_STRAPI_MAPPING.md` documents a Strapi migration path. The React app should keep calling the same adapter functions; only the backend behind `VITE_WORDPRESS_API_URL` (or a future Strapi base) would change.

---

## 7. UI component architecture

```text
Root (__root)
├── SmoothScroll
├── SpotlightCursor
├── <Outlet />  ← page content
├── SiteFooter (non-home)
├── JarvisAIAssistant → NaethraAIAssistant
├── FakeJobsDisclaimerModal (home)
└── ScrollToTopButton
```

### Shared chrome

| Component | Role |
|-----------|------|
| `NaethraContentHeader` | Sticky branded nav for content/service pages |
| `NaethraContentPage` | Generic content page shell helpers |
| `SiteFooter` | Site-wide footer |
| `ServiceDetailPage` | Hero + intro CTA + alternating sections |
| `AboutSubpageLayout` | About child pages |
| `SectionEyebrow` | Small uppercase section label |
| `PortfolioCarousel` | Portfolio presentation |
| `BlogArticleContent` / `BlogsEditorialList` | Blog surfaces |
| `JarvisAIAssistant` / `JarvisArcReactor` | In-site AI assistant UX |

### UI kit

`src/components/ui/*` — shadcn/Radix primitives (`button`, `dialog`, `sheet`, etc.). Prefer these for interactive controls; marketing layouts often use custom CSS classes from `styles/`.

---

## 8. Styling architecture

Entry: `src/styles.css`

```text
styles.css
├── Tailwind (@import "tailwindcss")
├── tw-animate-css
├── styles/base.css      # tokens, resets, shared utilities
├── styles/home.css      # homepage + about-max sections
├── styles/content.css   # content-page header, contact, footer
├── styles/pages.css     # services index, service-detail, portfolio
└── styles/blog-prose.css
```

**Design tokens** live as CSS custom properties (e.g. `--blue`, `--ink`, `--paper`, About `--about-*`). Brand rules and About-specific constraints are documented in `design.md`.

**Layout approach:** hybrid — Tailwind utilities in JSX for one-off spacing/typography; larger editorial sections use BEM-like class names in the CSS modules above.

Fonts: Manrope + Arimo (loaded in CSS / root head); display pairings also referenced in `design.md`.

---

## 9. Server, SSR, and errors

| File | Responsibility |
|------|----------------|
| `src/start.ts` | Global request middleware: catch unexpected errors → branded HTML 500; CSRF middleware for server functions |
| `src/server.ts` | Server entry wrapping TanStack Start; converts h3 “swallowed” JSON 500s into HTML error pages |
| `src/lib/error-page.ts` | HTML for catastrophic failures |
| `src/lib/error-capture.ts` | Captures last SSR error for logging |
| `src/lib/lovable-error-reporting.ts` | Reports client boundary errors to Lovable |

Client route errors use `__root` `errorComponent` / `notFoundComponent`.

---

## 10. Environment

From `.env.example`:

| Variable | Scope | Purpose |
|----------|--------|---------|
| `VITE_WORDPRESS_API_URL` | Public (Vite) | WP REST base, default `https://naethra.com/wp-json/wp/v2` |
| `WORDPRESS_URL` | Server / local only | Authenticated WP tooling |
| `WORDPRESS_USERNAME` | Server / local only | App password auth |
| `WORDPRESS_APP_PASSWORD` | Server / local only | App password auth |

Public loaders use only `VITE_WORDPRESS_API_URL`. Do not commit real credentials.

---

## 11. Build & development

```sh
npm install
npm run dev      # Vite dev server
npm run build    # Production build (Nitro / Start)
npm run preview  # Preview production build
npm run lint
npm run format
```

Path alias: `@/` → `src/` (via Lovable / Vite config).

**Lovable:** `vite.config.ts` uses `@lovable.dev/vite-tanstack-config` (do not duplicate TanStack/React/Tailwind plugins). Commits sync with the Lovable editor; do not force-push or rewrite published history (`AGENTS.md`).

---

## 12. Cross-cutting features

| Feature | Location | Notes |
|---------|----------|-------|
| Jarvis AI assistant | `JarvisAIAssistant` → `NaethraAIAssistant` | Global overlay; opened from 404/error UI |
| Smooth scroll | `components/ui/smooth-scroll` | Lenis-based |
| Spotlight cursor | `components/ui/spotlight-cursor` | Decorative pointer effect |
| Fake jobs disclaimer | `FakeJobsDisclaimerModal` | Home only |
| SEO / head | Per-route `head` + root defaults | Meta, OG, fonts, favicon |

---

## 13. Mental model for changes

| If you need to… | Touch… |
|-----------------|--------|
| Add a page | New file in `src/routes/` (+ optional loader in `wordpress.ts`) |
| Change service copy/structure | Mapper + `*_FALLBACK` in `wordpress.ts` (and `service-data.ts` if mirrored) |
| Swap a hero / section image | Import under `src/assets/...` and assign in fallback/mapper |
| Adjust service layout | `ServiceDetailPage.tsx` + `styles/pages.css` |
| Adjust home / about look | Route JSX + `styles/home.css` / `design.md` |
| Change nav | `NaethraContentPage.tsx` (and home header if separate) |
| Change global chrome | `__root.tsx`, `SiteFooter.tsx` |

---

## 14. Architecture principles (current codebase)

1. **Loaders own data** — pages stay presentational; fetch/map lives in `lib/`.
2. **WP optional at runtime** — every content path has a fallback so production does not hard-depend on WP uptime.
3. **HTML is an API** — many pages scrape WP page HTML into typed sections rather than custom fields.
4. **Shared service shell** — detail pages converge on `ServiceDetailPage` for consistency.
5. **CSS by surface** — large marketing CSS is split by page family, not by component file.
6. **Lovable-safe git** — preserve linear history on the connected branch.

---

*Last reviewed against the TanStack Start + WordPress adapter layout in this repository.*
