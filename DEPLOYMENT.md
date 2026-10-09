# Deployment (Node.js / cPanel / VPS)

This app is a **Next.js 15 App Router** site. It must run as a **Node.js server** (`next start`). It is **not** configured for Cloudflare Workers or static export.

## Requirements

- **Node.js 20+** (recommended: Node 20 LTS or 22 LTS)
- npm (lockfile: `package-lock.json`)
- Outbound HTTPS access to your WordPress REST API host

## Environment variables

Copy `.env.example` to `.env` (or set the same keys in the host panel):

| Variable | Required | Notes |
|----------|----------|--------|
| `NEXT_PUBLIC_WORDPRESS_API_URL` | Yes | e.g. `https://naethra.com/wp-json/wp/v2` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | For contact form | CF7 reCAPTCHA v3 site key (secret stays in WordPress) |
| `WORDPRESS_URL` / `WORDPRESS_USERNAME` / `WORDPRESS_APP_PASSWORD` | No | Local/MCP tooling only; not used by the public site |

Do not commit real secrets. Public `NEXT_PUBLIC_*` values are embedded in the client bundle.

## Build and run

```bash
npm ci
npm run build
npm run start
```

By default `next start` listens on **port 3000**. Override with:

```bash
PORT=3000 npm run start
# or
npx next start -H 0.0.0.0 -p 3000
```

## Process management

Keep the Node process alive across reboots.

### PM2 (typical VPS)

```bash
npm ci && npm run build
pm2 start npm --name naethra -- start
pm2 save
pm2 startup
```

Restart after deploys: `pm2 restart naethra`.

### cPanel “Setup Node.js App”

1. Create a Node.js application (Node 20+).
2. Set the application root to this project directory.
3. Set the startup file / script to `npm run start` (or `node_modules/next/dist/bin/next start`).
4. Add the environment variables above in the cPanel UI.
5. Run `npm ci && npm run build` in the app’s virtual environment terminal, then restart the app.

## Reverse proxy and HTTPS

Put Apache or Nginx in front of the Node process. Terminate TLS on the proxy and forward to `http://127.0.0.1:3000`.

### Nginx (sketch)

```nginx
server {
  listen 443 ssl http2;
  server_name naethra.com www.naethra.com;

  # ssl_certificate ...;
  # ssl_certificate_key ...;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### Apache (sketch)

Use `ProxyPass` / `ProxyPassReverse` to `http://127.0.0.1:3000` with `RequestHeader set X-Forwarded-Proto "https"` when behind HTTPS.

## Caching

WordPress-backed pages use `revalidate = 60` (ISR). After content changes in WordPress, updated HTML appears within about one minute on the next request (no full redeploy required).

## Vercel

This is a **Next.js** app (`vercel.json` sets `framework: "nextjs"`). Vercel serves from `.next` automatically — there is **no** `dist` folder.

In **Project Settings → General → Build & Development Settings**:

| Setting | Value |
|---------|--------|
| Framework Preset | **Next.js** (not Vite / Other) |
| Build Command | `npm run build` (or leave default) |
| Output Directory | **Leave empty** — do not set `dist` |
| Install Command | `npm ci` (or leave default) |
| Node.js Version | **20.x** or newer |

If you still see `No Output Directory named "dist"`, clear the Output Directory override in the dashboard and redeploy.

## What not to do

- Do **not** set Output Directory to `dist` (that was for the old Vite build).
- Do **not** set `output: 'export'` unless every dynamic/server feature has been removed and verified.
- Do **not** deploy this build as a Cloudflare Worker / Pages Functions target; Nitro/Cloudflare Start tooling was removed in the Next.js migration.
- Do **not** expose WordPress application passwords to the browser.

## Health check

After start:

1. Open `/` and confirm the homepage renders (fallback content if WordPress is down).
2. Hit `/blogs`, `/contact-us`, and one service page.
3. Confirm `robots.txt` and favicon under `/public` are served.
