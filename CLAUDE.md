# 1Solutions Next.js — Claude Code Context

## Project Overview
Next.js (Pages Router) frontend for 1Solutions (www.1solutions.biz) — a 15+ year web development and digital marketing agency based in New Delhi. Headless WordPress CMS on Hostinger. Deployed on Vercel.

- **Live site:** https://1solutions-website.vercel.app/
- **WordPress admin:** https://midnightblue-lyrebird-831822.hostingersite.com/wp-admin
- **WordPress GraphQL:** https://midnightblue-lyrebird-831822.hostingersite.com/graphql
- **GitHub repo:** https://github.com/1Solutionsbiz/1solutions-website

## Tech Stack
- Next.js 13+ Pages Router (NOT App Router)
- WordPress + WPGraphQL (headless CMS)
- ISR: `revalidate: 3600` on all pages
- CSS: plain CSS files in `styles/` (no Tailwind, no CSS modules)
- No TypeScript — plain JSX

## Git Workflow
Push to GitHub → Vercel auto-deploys (2–3 min).

```bash
git add .
git commit -m "description"
git push
```

Vercel env vars are already set — no manual deploy steps needed.

## Project Structure

```
pages/
  index.jsx                        # Homepage (static, no WP data)
  [slug].jsx                       # UNIFIED router: handles both posts AND categories
  tag/[slug].jsx                   # Tag archive at /tag/<slug>
  author/[slug].jsx                # Author archive at /author/<slug>
  blog/
    index.jsx                      # Blog listing (/blog)
    page/[page].jsx                # Paginated blog (/blog/page/2, /blog/page/3 ...)
  wordpress-development-company/
    index.jsx                      # WordPress service page
  api/
    og-image.js                    # OG image generator (returns PNG)
    revalidate.js                  # ISR revalidation webhook (called by WP plugin)

components/
  blog/
    BlogCard.jsx                   # Blog grid card
    Pagination.jsx                 # Numbered pagination (1 2 3 … N)
  Header.jsx
  Footer.jsx

lib/
  graphql.js                       # ALL WPGraphQL queries + helpers

styles/
  globals.css                      # Base styles, CSS variables, header, footer
  blog.css                         # All blog-related styles (imported in blog pages)

public/
  images/                          # Static images used in pages
  logo/                            # Client logo files
  fonts/                           # Inter font (self-hosted)
  BG-1Solutions.png                # OG image background banner

next.config.js                     # Image domains, redirects, SVG support
```

## URL Structure (IMPORTANT)
- Blog posts: `/<slug>` (NOT `/blog/<slug>`)
- Categories: `/<slug>` (NOT `/blog/category/<slug>`)
- Tags: `/tag/<slug>`
- Author: `/author/<slug>`
- Blog index: `/blog`
- Blog page 2+: `/blog/page/2`
- Redirects in `next.config.js` handle old `/blog/category/` and `/blog/tag/` URLs

The `pages/[slug].jsx` unified router handles both posts AND categories:
- `getStaticPaths` merges post slugs + category slugs (post slugs take priority on conflict)
- `getStaticProps` tries `getPostBySlug` first, falls back to `getCategoryWithPosts`

## Image Rules (CRITICAL — prevents mobile cropping)
**Never use fixed `height` on image containers.** Always:
```jsx
// Container CSS:
.image-wrap { position: relative; aspect-ratio: 16/9; overflow: hidden; }

// Next.js Image:
<Image fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
```
OG images are 1200×630. Fixed height containers crop them on mobile (especially iPhone 16 Pro 3× display).

For full-width editorial images (blog post featured image):
```jsx
<Image width={1200} height={630} style={{ width: '100%', height: 'auto', display: 'block' }} />
```

## Brand
- **Primary:** #114171 (navy blue)
- **Orange:** #FE9700
- **Green:** #44973D
- **Font:** Inter (self-hosted)
- CSS variables: `--primary`, `--orange`, `--green`, `--text`, `--text-light`, `--border`

## GraphQL Helpers (lib/graphql.js)
Key exports:
- `getPosts({ first, after, categorySlug })` — paginated posts
- `getFeaturedPost()` — latest post for hero
- `getPostBySlug(slug)` — single post (full content)
- `getRelatedPosts(categorySlug, excludeSlug, count)` — related posts
- `getCategoryWithPosts(slug, { first, after })` — category + posts
- `getTagWithPosts(slug, { first, after })` — tag + posts
- `getAuthorWithPosts(slug, { first, after })` — author + posts
- `getTotalPostCount()` — total published posts (for pagination)
- `getCursorAtOffset(offset)` — WPGraphQL cursor for page N
- `getAllPostSlugs()`, `getAllCategorySlugs()` — for getStaticPaths
- `formatDate(dateString)`, `stripHtml(html)`, `getCategoryColor(slug)`, `getReadingTime(content)`

## Pagination Pattern
Blog uses numbered pages (`/blog/page/N`). To add pagination to a new archive page:
```js
const PER_PAGE = 9;
const offset = (page - 1) * PER_PAGE;
const after = await getCursorAtOffset(offset);
const data = await getPosts({ first: PER_PAGE, after });
```
Use `<Pagination currentPage={N} totalPages={T} baseUrl="/blog" />`.

## Existing Service Pages
- `/wordpress-development-company` — LIVE, full-featured page with hero, stats, services, FAQs, testimonials, contact form

## Adding a New Service Page
Create at `pages/<service-slug>/index.jsx`. Follow the WordPress service page pattern:
1. All CSS in a `<style>` block inside `<Head>` with a unique prefix (e.g., `seo-` for SEO page)
2. No `background-attachment: fixed` — broken on iOS. Use `background-attachment: scroll`.
3. Interactive JS (accordions, tabs) → React useState
4. Add `<meta name="viewport" content="width=device-width, initial-scale=1" />` in `pages/_document.jsx` (already done)
5. Images go in `public/images/` — reference as `/images/filename.jpg`

## WordPress Plugin (NOT in git repo)
`1solutions-ai-content-generator` plugin handles:
- AI content generation via Claude API (Anthropic)
- Auto OG image generation on publish (calls Vercel `/api/og-image`)
- ISR revalidation on publish/update (calls Vercel `/api/revalidate`)
- SVG upload support
- Plugin deployed via zip upload to WP Admin (never via git)

## Revalidation Flow
WordPress publish/update → plugin calls `https://1solutions-website.vercel.app/api/revalidate` → Next.js revalidates the relevant path → fresh page on next request.

## Environment Variables (already set in Vercel)
- `NEXT_PUBLIC_WORDPRESS_API_URL` — WPGraphQL endpoint
- `NEXT_PUBLIC_SITE_URL` — https://www.1solutions.biz
- `OG_SECRET` — shared secret for OG image API
- `REVALIDATE_SECRET` — shared secret for revalidation webhook

## Common Gotchas
- `undefined` in `getStaticProps` props → build failure. Always use `null` instead.
- SVG images: `dangerouslyAllowSVG: true` already set in `next.config.js`
- `getCursorAtOffset(0)` returns `null` (correct — means start of list, no `after` param)
- Category colors mapped in `getCategoryColor()` in `lib/graphql.js`
- Author avatar URL comes from WordPress Gravatar — always available if user has avatar set
