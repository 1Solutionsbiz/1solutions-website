# 1Solutions Website

Next.js + WordPress Headless CMS

## Stack
- **Frontend:** Next.js 16 — primarily **Pages Router** (200+ routes under `pages/`), with a minimal **App Router** shell for the homepage only (`app/layout.jsx`, `app/page.jsx`)
- **Styling:** Tailwind CSS 4 + plain CSS (`styles/globals.css`, `blog.css`, `homepage.css`, `layout.css`)
- **CMS:** WordPress on Hostinger (headless) — primary data layer is **WPGraphQL** (`lib/graphql.js`), with a small REST helper (`lib/wordpress.js`) for static WP pages
- **Deployment:** Vercel, auto-deploys from `main`. Pages use ISR (1-hour revalidate) plus an on-publish webhook for instant rebuilds.

## Setup

```bash
npm install
cp .env.example .env.local
# Add your WordPress API URL(s) to .env.local
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_WORDPRESS_API_URL` | WPGraphQL endpoint — used by `lib/graphql.js` (primary data source) |
| `WORDPRESS_API_URL` | WordPress REST API base URL — used by `lib/wordpress.js` (static WP pages only) |
| `NEXT_PUBLIC_SITE_URL` | Live site URL |
| `OG_SECRET` | Authenticates `/api/og-image` requests from the WP plugin |
| `REVALIDATE_SECRET` | Authenticates `/api/revalidate` webhook from the WP plugin |

## Structure
```
app/ - Homepage shell only (App Router)
pages/ - Everything else: blog, service pages, API routes (Pages Router)
components/layout/ - Header, Footer
components/sections/ - Homepage sections
components/ui/ - Reusable UI components
lib/graphql.js - WPGraphQL queries (primary WordPress data layer)
lib/wordpress.js - REST helpers for static WP pages
styles/ - Tailwind + global CSS, design tokens
public/images/ - Logo files
```

See `Project-Architecture.md` for the full breakdown (routing logic, deployment pipeline, AI content generator plugin, etc).
