# Naethra Technologies

Marketing site for [Naethra Technologies](https://naethra.com) — **Next.js 16 App Router**, React 19, TypeScript, Tailwind CSS 4, WordPress REST API.

## Requirements

- Node.js **20+**
- npm (`package-lock.json`)

## Quick start

```bash
cp .env.example .env   # then fill in values
npm ci
npm run dev            # http://localhost:3000
```

## Scripts

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `npm run dev`    | Next.js development server       |
| `npm run build`  | Production build                 |
| `npm run start`  | Production server (`next start`) |
| `npm run lint`   | ESLint                           |
| `npm run format` | Prettier                         |

## Environment

See [`.env.example`](.env.example).

| Variable                                                          | Required     | Notes                                                         |
| ----------------------------------------------------------------- | ------------ | ------------------------------------------------------------- |
| `NEXT_PUBLIC_WORDPRESS_API_URL`                                   | Yes          | WordPress REST base, e.g. `https://naethra.com/wp-json/wp/v2` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`                                  | Contact form | CF7 reCAPTCHA v3 site key (secret stays in WordPress)         |
| `WORDPRESS_URL` / `WORDPRESS_USERNAME` / `WORDPRESS_APP_PASSWORD` | No           | Local tooling only; not used by the public site               |

Do not commit secrets. `NEXT_PUBLIC_*` values are embedded in the client bundle.

## Project layout

```
src/app/           # App Router pages
src/components/    # UI and page sections
src/lib/           # WordPress client and shared helpers
public/            # Static assets
```

## Deploy

This app runs as a **Node.js** server (`next start`). It is **not** a Vite static build and does **not** use a `dist` output folder.

- **Vercel:** Framework preset **Next.js**; leave **Output Directory** empty (do not set `dist`). See `vercel.json`.
- **cPanel / VPS:** See [`DEPLOYMENT.md`](DEPLOYMENT.md).

```bash
npm ci
npm run build
npm run start
```

```bash
All WordPress files now load from data.naethra.com only.

What that means in the app:

API — pages, posts, menu, downloads, contact form → data.naethra.com
Static media — logos, portfolio images, service images, hero fallbacks → data.naethra.com
WordPress HTML — any naethra.com/wp-content/... or wp-includes/... (including Elementor-escaped video URLs like banner-hero.mp4) is rewritten to data.naethra.com
Public site URLs stay on naethra.com (canonical links, sitemap, email). Those are not WordPress files.

Restart the Next.js server so it picks up .env and these changes.

```
