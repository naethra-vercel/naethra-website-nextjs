# Naethra Technologies

Marketing site for [Naethra Technologies](https://naethra.com) — **Vite + React 19 SPA**, TypeScript, Tailwind CSS 4, WordPress REST API.

## Requirements

- Node.js **20+**
- npm (`package-lock.json`)

## Quick start

```bash
cp .env.example .env   # then fill in values
npm ci
npm run dev            # http://localhost:5173
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite development server |
| `npm run build` | Production build → `dist/`, then copy to `cpanel/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Environment

See [`.env.example`](.env.example).

| Variable | Required | Notes |
|----------|----------|--------|
| `VITE_WORDPRESS_API_URL` | Yes | WordPress REST base, e.g. `https://naethra.com/wp-json/wp/v2` |
| `VITE_RECAPTCHA_SITE_KEY` | Contact form | CF7 reCAPTCHA v3 site key (secret stays in WordPress) |
| `WORDPRESS_URL` / `WORDPRESS_USERNAME` / `WORDPRESS_APP_PASSWORD` | No | Local tooling only; not used by the public site |

Do not commit secrets. `VITE_*` values are embedded in the client bundle.

## Project layout

```
src/routes/        # React Router page routes
src/components/    # UI and page sections
src/lib/           # WordPress client and shared helpers
public/            # Static assets
cpanel/            # Generated upload folder (npm run build)
```

## Deploy (cPanel)

```bash
npm ci
npm run build
```

Upload the **contents** of `cpanel/` to your cPanel `public_html` (includes `.htaccess` for SPA routing). See [`DEPLOYMENT.md`](DEPLOYMENT.md).
