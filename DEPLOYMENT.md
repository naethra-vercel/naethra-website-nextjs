# Deployment (static SPA / cPanel)

This app is a **Vite + React** single-page application. Production output is static files — no Node.js server is required on the host.

## Requirements

- **Node.js 20+** on the machine that builds the site
- Apache (or equivalent) with `mod_rewrite` for SPA deep links
- Outbound HTTPS from the browser to your WordPress REST API host

## Environment variables

Copy `.env.example` to `.env` before building:

| Variable | Required | Notes |
|----------|----------|--------|
| `VITE_WORDPRESS_API_URL` | Yes | e.g. `https://naethra.com/wp-json/wp/v2` |
| `VITE_RECAPTCHA_SITE_KEY` | For contact form | CF7 reCAPTCHA v3 site key (secret stays in WordPress) |
| `WORDPRESS_URL` / `WORDPRESS_USERNAME` / `WORDPRESS_APP_PASSWORD` | No | Local tooling only |

`VITE_*` values are baked into the client bundle at build time.

## Build

```bash
npm ci
npm run build
```

This produces:

1. `dist/` — Vite production output
2. `cpanel/` — copy of `dist/` plus `.htaccess` for Apache SPA fallback

## Upload to cPanel

1. In cPanel File Manager (or FTP), open `public_html` (or your domain document root).
2. Upload **everything inside** the local `cpanel/` folder (not the folder itself), including:
   - `index.html`
   - `assets/`
   - `.htaccess`
   - favicons / `robots.txt` / logos
3. Confirm `.htaccess` was uploaded (it may be hidden in File Manager — enable “Show Hidden Files”).

Deep links such as `/about` or `/blogs/some-slug` rely on the `.htaccess` rewrite to `index.html`.

## Local preview

```bash
npm run build
npm run preview
```

## Notes

- The AI assistant runs a guided menu flow in the browser (no Gemini API).
- WordPress content and download unlock calls are made from the browser to the WordPress REST / WPDM endpoints.
- Rebuild and re-upload `cpanel/` whenever env vars or source change.
