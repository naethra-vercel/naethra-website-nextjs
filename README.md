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

| Variable                                                          | Required     | Notes                                                          |
| ----------------------------------------------------------------- | ------------ | -------------------------------------------------------------- |
| `NEXT_PUBLIC_WORDPRESS_API_URL`                                   | Yes          | WordPress REST base, e.g. `https://naethra.com/wp-json/wp/v2`  |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`                                  | Contact form | CF7 reCAPTCHA v3 site key (secret stays in WordPress)          |
| `WORDPRESS_URL` / `WORDPRESS_USERNAME` / `WORDPRESS_APP_PASSWORD` | No           | Local tooling only; not used by the public site                |
| `INSTANTLY_API_KEY`                                               | Instantly    | API v2 key; server-only                                        |
| `INSTANTLY_ADMIN_TOKEN`                                           | Instantly    | Bearer token protecting this app's private management routes   |
| `INSTANTLY_WEBHOOK_SECRET`                                        | Instantly    | Bearer token configured in each Instantly webhook subscription |

Do not commit secrets. `NEXT_PUBLIC_*` values are embedded in the client bundle.

## Instantly integration

The management endpoints are server-to-server and require `Authorization: Bearer $INSTANTLY_ADMIN_TOKEN`:

- `GET /api/instantly/accounts`
- `GET` and `POST /api/instantly/campaigns`
- `POST /api/instantly/leads`
- `GET /api/instantly/webhooks`

They call the official API v2 from the server and do not expose `INSTANTLY_API_KEY` to browsers. Campaign creation requires a `name`. Lead creation follows the API contract: a campaign UUID requires an email; a list UUID requires at least an email, first name, or last name. Requests are limited to 60 per minute per running app instance. Use an edge/shared rate limiter as well when deploying multiple instances.

Grant the Instantly API key only the scopes needed by these routes: `accounts:read`, `campaigns:read` and `campaigns:create`, `leads:create`, and `webhooks:read`.

### Register webhook subscriptions

Set a strong random `INSTANTLY_WEBHOOK_SECRET` in the deployment environment. Instantly API v2 accepts custom delivery headers on webhook subscriptions. Register one subscription per event type using the API key and the custom bearer header below; replace the placeholders with deployment values:

```bash
curl --request POST 'https://api.instantly.ai/api/v2/webhooks' \
  --header "Authorization: Bearer $INSTANTLY_API_KEY" \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Naethra reply notifications",
    "target_hook_url": "https://your-domain.example/api/webhooks/instantly",
    "event_type": "reply_received",
    "headers": {
      "Authorization": "Bearer YOUR_INSTANTLY_WEBHOOK_SECRET"
    }
  }'
```

Repeat with `lead_interested` or any other documented event type, then inspect the configured subscriptions with `GET /api/instantly/webhooks`. Instantly delivers events to `POST /api/webhooks/instantly`. Valid events are acknowledged; logs contain event type, timestamp, and a payload hash, never lead content. Duplicate suppression is bounded and process-local because this application has no database or shared event store; configure durable persistence/idempotency before relying on webhook events for business-critical work or deploying multiple instances.

### Website Visitors

Website Visitors tracking is not enabled in this repository. The app has no Instantly dashboard-generated tracking snippet or consent configuration, so no script URL or client identifier is assumed. To enable it, copy the exact script generated in your Instantly workspace, confirm the intended pages and cookie-consent rules, then load it with `next/script` using a non-blocking strategy.

### Verification

Run `npm test`, `npm run lint`, and `npm run build`. For a real workspace, set the three server-side environment variables, call the management routes from a trusted server with `INSTANTLY_ADMIN_TOKEN`, and verify authorized/unauthorized requests, campaign/lead validation, and API error handling. Register a test webhook subscription as above and confirm `reply_received`/`lead_interested` deliveries are acknowledged; replay the same payload to check duplicate acknowledgment. Never use a real lead unless permitted by your workspace policies.

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
