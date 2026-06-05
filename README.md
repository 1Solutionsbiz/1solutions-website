# 1Solutions Website

Next.js 16 + WordPress Headless CMS

## Stack
- **Frontend:** Next.js 16 (App Router), Tailwind CSS 4
- **CMS:** WordPress on Hostinger (headless, REST API)
- **Deployment:** Vercel

## Setup

```bash
npm install
cp .env.example .env.local
# Add your WordPress API URL to .env.local
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `WORDPRESS_API_URL` | WordPress REST API base URL |
| `NEXT_PUBLIC_SITE_URL` | Live site URL |

## Structure
```
app/           → Pages (App Router)
components/
  layout/      → Header, Footer
  sections/    → Homepage sections
  ui/          → Reusable UI components
lib/           → WordPress API helpers
styles/        → Global CSS + design tokens
public/images/ → Logo files
```
# Blog tags update
