# WordPress → Strapi Mapping

> Source of truth: live API `https://naethra.com/wp-json/wp/v2` and `src/lib/wordpress.ts`.  
> React frontend is **not** changed by this migration.

---

## 1. WordPress API base

| Item | Value |
|------|--------|
| Env var | `VITE_WORDPRESS_API_URL` |
| Default | `https://naethra.com/wp-json/wp/v2` |
| Auth (optional) | `WORDPRESS_URL`, `WORDPRESS_USERNAME`, `WORDPRESS_APP_PASSWORD` (not used by public frontend fetches) |

Client helper: `wpFetch(path)` in `src/lib/wordpress.ts` → `GET ${WP_BASE}${path}` with `Accept: application/json`.

---

## 2. Endpoints used by the React project

| Endpoint | How React uses it | Function(s) |
|----------|-------------------|-------------|
| `GET /posts?page=&per_page=&_embed&status=publish` | Blog list / home insights | `getPosts` |
| `GET /posts?slug=&_embed&status=publish` | Blog detail | `getPostBySlug` |
| `GET /pages?slug=&_embed` | CMS pages (HTML parsed in React) | `getPageBySlug` + many mappers |
| `GET /portfolio?per_page=&_embed` | Portfolio grid | `getPortfolio` |
| `GET /thegem_team_person?...` | About team (currently **404** on live site; React falls back to static data) | `getTeamPersons` / `getAboutContent` |

### Endpoints **not** called by React (but useful for complete CMS parity)

| Endpoint | Live totals (approx.) | Notes |
|----------|----------------------|--------|
| `/categories` | 23 | Embedded via `_embed` on posts; migrate for relations |
| `/tags` | 17 | Embedded via `_embed`; mostly unused in UI |
| `/users` | 12 | Embedded as post authors |
| `/media` | 652 | Featured images + content images |
| `/portfolio-category` | 6 | Taxonomy on portfolio CPT |
| `/portfolio-tag` | 0 | Empty; still schema’d for parity |
| `/menus`, `/menu-items` | — | **Not used** (nav is hardcoded in React) |
| Rank Math / Yoast meta | — | **Not consumed** by React (`meta` only has `content-type`, `footnotes`) |

### Page slugs fetched by React

`about-us`, `web-app`, `cms`, `claris-filemaker-application`, `dot-net-application`, `aws-cloud-support`, `custom-web-publishing`, `services`, `home`, `flutter-app-development-company`, `mobile-app`, `terms-and-conditions`, `privacy-policy`, `disclaimer-and-notification`

---

## 3. Live content counts (snapshot)

| Resource | Count |
|----------|------:|
| Pages | 33 |
| Posts | 73 |
| Categories | 23 |
| Tags | 17 |
| Users | 12 |
| Media | 652 |
| Portfolio | 12 |
| Portfolio categories | 6 |
| Portfolio tags | 0 |
| Team person CPT | **unavailable** (`rest_no_route`) |

---

## 4. Proposed Strapi content types

Only types required by actual WP data the app (or a complete content mirror) needs:

| Strapi collection | Kind | Purpose |
|-------------------|------|---------|
| `category` | Collection | WP post categories |
| `tag` | Collection | WP post tags |
| `author` | Collection | WP users (authors) |
| `post` | Collection | WP posts |
| `page` | Collection | WP pages |
| `portfolio-category` | Collection | WP `portfolio-category` taxonomy |
| `portfolio-tag` | Collection | WP `portfolio-tag` (empty today) |
| `portfolio` | Collection | WP `portfolio` CPT |
| `team-member` | Collection | Future TheGem team CPT (optional import when API exists) |

**Media:** Strapi Media Library (not a collection type).  
**SEO:** Optional component on `post` / `page` (title, description, ogImage) — React does not read SEO from WP today; fields stay nullable.

---

## 5. Field mappings

### 5.1 Category ← `/categories`

| WordPress | Strapi |
|-----------|--------|
| `id` | `wordpressId` (integer, unique) |
| `name` | `name` |
| `slug` | `slug` |
| `description` | `description` |
| `parent` | `parent` (relation → category, optional) |
| `count` | `wordpressCount` (integer, informational) |

### 5.2 Tag ← `/tags`

| WordPress | Strapi |
|-----------|--------|
| `id` | `wordpressId` |
| `name` | `name` |
| `slug` | `slug` |
| `description` | `description` |

### 5.3 Author ← `/users`

| WordPress | Strapi |
|-----------|--------|
| `id` | `wordpressId` |
| `name` | `name` |
| `slug` | `slug` |
| `description` | `bio` |
| `avatar_urls['96']` | `avatar` (media, optional) |
| `url` | `url` |

### 5.4 Post ← `/posts`

| WordPress | Strapi |
|-----------|--------|
| `id` | `wordpressId` |
| `slug` | `slug` (**preserve exact slug**) |
| `title.rendered` | `title` (plain text after decode) |
| `content.rendered` | `content` (**raw HTML**, long text) |
| `excerpt.rendered` | `excerpt` (HTML or stripped text) |
| `date` | `publishedAt` (+ draftAndPublish) |
| `modified` | `wordpressModifiedAt` |
| `status` | Strapi publication state (`publish` → published) |
| `featured_media` | `featuredImage` (media) |
| `author` | `author` (relation → author) |
| `categories[]` | `categories` (relation → category, many) |
| `tags[]` | `tags` (relation → tag, many) |
| `link` | `wordpressUrl` |
| `sticky` | `sticky` |
| — | `seo` (component, optional) |

### 5.5 Page ← `/pages`

| WordPress | Strapi |
|-----------|--------|
| `id` | `wordpressId` |
| `slug` | `slug` (**preserve**) |
| `title.rendered` | `title` |
| `content.rendered` | `content` (**raw HTML**) |
| `excerpt.rendered` | `excerpt` |
| `date` | `publishedAt` |
| `modified` | `wordpressModifiedAt` |
| `featured_media` | `featuredImage` |
| `parent` | `parent` (relation → page, optional) |
| `menu_order` | `menuOrder` |
| `template` | `template` |
| `link` | `wordpressUrl` |
| — | `seo` (optional) |

### 5.6 Portfolio category ← `/portfolio-category`

| WordPress | Strapi |
|-----------|--------|
| `id` | `wordpressId` |
| `name` | `name` |
| `slug` | `slug` |
| `description` | `description` |

### 5.7 Portfolio ← `/portfolio`

| WordPress | Strapi |
|-----------|--------|
| `id` | `wordpressId` |
| `slug` | `slug` |
| `title.rendered` | `title` |
| `content.rendered` | `content` (**raw HTML**) |
| `excerpt.rendered` | `excerpt` |
| `date` | `publishedAt` |
| `featured_media` | `featuredImage` |
| `portfolio-category[]` | `portfolioCategories` (relation) |
| `portfolio-tag[]` | `portfolioTags` (relation) |
| `menu_order` | `menuOrder` |
| `link` | `wordpressUrl` |

### 5.8 Team member ← `/thegem_team_person` (when available)

| WordPress | Strapi |
|-----------|--------|
| `id` | `wordpressId` |
| `slug` | `slug` |
| `title.rendered` | `title` |
| `content.rendered` | `content` |
| `person.name` | `name` |
| `person.position` | `position` |
| `person.phone` | `phone` |
| `person.email` | `email` |
| `person.link` | `link` |
| `featured_media` | `photo` |
| `menu_order` | `menuOrder` |

### 5.9 Media ← `/media`

| WordPress | Strapi Media Library |
|-----------|----------------------|
| `id` | file metadata `wordpressId` (in file `provider_metadata` / related `media-asset` index table in migration state) |
| `source_url` | downloaded → uploaded file |
| `alt_text` | `alternativeText` |
| `title.rendered` | `name` / caption |
| `mime_type` | mime |
| `slug` | used for dedupe filename key |

Migration keeps a local map `wordpressMediaId → strapiFileId` so re-runs skip duplicates.

---

## 6. Relationships

```text
post.author              → author
post.categories          → category (many)
post.tags                → tag (many)
post.featuredImage       → media
page.featuredImage       → media
page.parent              → page
portfolio.portfolioCategories → portfolio-category (many)
portfolio.portfolioTags       → portfolio-tag (many)
portfolio.featuredImage       → media
team-member.photo             → media
```

---

## 7. HTML content policy

- Store `content.rendered` **verbatim** (Elementor markup included).
- Do **not** convert to Markdown, Blocks, or plain text.
- Strapi attribute type: long `text` (or custom rich-text HTML field).
- React’s existing `extractBlogArticleHtml` / page mappers continue to work once the frontend is pointed at Strapi later.

---

## 8. Slug policy

- Copy WP `slug` exactly.
- Idempotent upsert key: `wordpressId` (primary), with `slug` uniqueness as secondary constraint.

---

## 9. React API call changes (identify only — do not implement)

When switching the frontend later, only `src/lib/wordpress.ts` needs endpoint swaps:

| Current | Future Strapi (example) |
|---------|-------------------------|
| `/posts?...` | `/api/posts?...&populate=*` |
| `/posts?slug=` | `/api/posts?filters[slug][$eq]=` |
| `/pages?slug=` | `/api/pages?filters[slug][$eq]=` |
| `/portfolio?...` | `/api/portfolios?...` |
| `_embedded` featured media | `populate[featuredImage]` |
| `_embedded` author/terms | `populate[author],populate[categories],...` |

**No React files are modified in this migration phase.**

---

## 10. Migration order

1. Authors  
2. Categories (+ parent pass)  
3. Tags  
4. Portfolio categories / tags  
5. Media (on-demand while creating entries + optional full media pass)  
6. Pages (parents first, then children)  
7. Posts  
8. Portfolio  
9. Team members (skip if WP route 404)

---

## 11. Repeatability

Every collection stores `wordpressId`.  
Migration command:

```bash
npm run migrate:wordpress
npm run migrate:wordpress -- --dry-run
```

Lookup by `wordpressId` → **UPDATE** if exists, else **CREATE**.  
Report written to `migration-report.json`.
