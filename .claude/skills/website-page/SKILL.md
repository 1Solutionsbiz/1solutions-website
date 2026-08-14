---
name: website-page
description: "Create a new service/location page or redesign a section of an existing page on the 1solutions-nextjs site, following this repo's established structure, visual language, and shipping workflow. Triggers on: create a new page, add a new service page, build a landing page, redesign this section, update the pricing section, make this page match [other page], add a process section, add a pricing section."
version: 1.0.0
---

# Website Page Skill (1solutions-nextjs)

This repo has ~230+ hand-built service/location pages, all following the same conventions even though each is a single self-contained `.jsx` file with inline styled-jsx (no shared CSS, no shared page components beyond `ServiceHero`, `AuroraText`, and the site chrome). This skill captures those conventions so new pages and edits look native immediately instead of drifting into a one-off style.

**Read this whole file before touching code.** Then read 1-2 of the reference pages named below in full before writing anything — the patterns below are summaries; the actual pages are the source of truth for exact CSS values and markup.

## Canonical reference pages

This is the exact design system to follow — **one canonical reference per section**, not a loose pick from several. Don't guess at a pattern or blend two references — copy the named page's section verbatim and adapt copy/colors.

| Section | Canonical reference | Section heading on that page |
|---|---|---|
| Hero | `pages/seo-services-company/index.jsx` | (`<ServiceHero>` at the top) |
| What-Is | `pages/seo-services-company/index.jsx` | "What Is SEO and How Does It Work?" (`.seo-glass.seo-def-box`, `.seo-def-aspects`) |
| Coverage cards | `pages/wordpress-development-company/index.jsx` | "WordPress Development Services We Offer" (`.wp-services-grid`, `.wp-service-card`) |
| Pricing | `pages/link-building-packages/index.jsx` | `#pricing` section (`.lbp-*`) |
| Package comparison table | `pages/link-building-packages/index.jsx` | "Package Comparison at a Glance" — required companion to Pricing, not optional |
| Process | `pages/php-development-services/index.jsx` | "Our PHP Development Process" (`.php-process-*`) |
| Testimonials | `pages/webflow-maintenance-services/index.jsx` | "What Our Webflow Maintenance Clients Say" (`.wfm-testi-*`, two-row marquee) |
| Why Us | `pages/webflow-maintenance-services/index.jsx` | "Why Companies Pick 1Solutions for Webflow Maintenance" (`.wfm-why-*`, `WHY_CARDS`) |
| Contact | `pages/affordable-seo-packages/index.jsx` | `#asp-contact` section — 2-col: benefits list + form box (see Contact note below) |
| Related services | `pages/affordable-seo-packages/index.jsx` | "More Ways We Can Grow Your Business" (`.asp-rtags`, tag-pill link cloud) |

**Contact section note:** as of `1a69adc`, `affordable-seo-packages`'s contact form is the correct working reference — it was previously non-functional (`onSubmit={e=>e.preventDefault()}`, no submit logic at all) and has since been fixed to use the same `handleSubmit`/`FormData`/reCAPTCHA-v3/`fetch('/api/contact')` pattern every other page uses. When copying this section, copy the current (fixed) version, not an older cached read of the file.

## Page skeleton (top to bottom)

1. `<Head>` — title, meta description, canonical, OG tags, JSON-LD (see SEO section below)
2. `<ServiceHero>` (per `seo-services-company`) — eyebrow, title (with `<AuroraText>` on the key phrase), subtext, primary/secondary CTA, `stats` array
3. **What-Is** (per `seo-services-company`) — centered eyebrow/title/desc header, then `.seo-glass.seo-def-box`: an intro paragraph + 3 aspect cards (`.seo-def-aspects`) — include on pages targeting a concept visitors may not know (GEO, Webflow CMS, etc.), skip on pages targeting a well-understood service
4. **Coverage cards** (per `wordpress-development-company`) — uniform glassmorphic `.wp-service-card` grid, ghost number per card, one `.featured` variant, "Show more/less" toggle if more than ~8 items — see Coverage cards section below
5. Optional: tech-stack pills, platform list, or tools-covered strip
6. **Pricing + Package Comparison at a Glance** (per `link-building-packages`) — the pricing cards section immediately followed by the comparison table section, both required together
7. **Process** (per `php-development-services`) — bordered-row numbered steps + sticky image column
8. **Testimonials** (per `webflow-maintenance-services`) — two-row infinite marquee
9. **Why Choose Us** (per `webflow-maintenance-services`) — badge pill + two-column header + icon-card grid
10. **FAQ** — accordion + `FAQPage` schema, 8-20 items
11. **Contact** (per `affordable-seo-packages`, fixed version) — 2-col benefits list + form box, real submit logic
12. **Related services** (per `affordable-seo-packages`) — centered header + colored tag-pill link cloud

Not every page needs every section — match scope to what the user actually asked for. But when a section IS included, build it exactly per its canonical reference above, not a new one-off design.

## Visual language

- **Class prefix**: pick a 2-4 letter prefix unique to the page (`wfm-`, `gsd-`, `lbp-`, `php-`, `wp-`) and use it for every class in that page's `<style>` block. Never reuse another page's prefix verbatim — copy the *pattern*, rename the classes.
- **Base palette**: navy `#0F3460` / amber `#D97706` for most service pages. AI/GEO pages lean indigo/violet (`#4f46e5`, `#7c3aed`). Match the palette of the closest sibling page, don't invent a new one per page.
- **Headings**: `background: linear-gradient(...)` text with `-webkit-background-clip: text`, often animated (`aurora-text` keyframe cycling through violet→purple→pink→blue→cyan) for hero/section H2s on newer pages.
- **Cards**: glassmorphic (`backdrop-filter: blur(16-24px)`, translucent white/tinted background, soft shadow) for testimonial/plan/tech cards. Coverage cards and Why-Us cards use **solid pastel gradients** instead (see Colors below) — don't glass-blur those.
- **Page background**: `.{prefix}-page` usually carries a soft pastel gradient (`linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%)`) behind the hero; individual sections then override to `#fff` or `#f8fafd` as needed. A "What Is X" or "Why Choose Us" section should usually sit on **white**, not the page gradient, unless told otherwise.

## Coverage cards

Per `wordpress-development-company`'s "WordPress Development Services We Offer": **not** individually-colored cards — a uniform glassmorphic grid instead:

```css
.{prefix}-services-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.{prefix}-service-card{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08)}
.{prefix}-service-card.featured{background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.25)}
.{prefix}-card-num{ /* big faint number, top-right corner, ~opacity .1-.15, becomes accent-colored on hover */ }
```

One card can carry a `.featured` variant (subtly warmer gradient, no other special treatment). Every card shows a large low-opacity ghost number (`01`, `02`, ...) in the corner. If there are more than ~8 items, show 6-8 by default behind a "Show more/less" toggle button (`{s.n}` key, `visibleServices` state slice) rather than rendering all of them at once.

## Why Us cards (icon-color variant)

Per `webflow-maintenance-services`'s "Why Companies Pick 1Solutions..." — this is a **different** card style from Coverage cards: a 6-12 color cycling palette, one distinct gradient + border per card (never repeat the same color on adjacent cards), rendered as a small icon **square** (not the whole card colored):

```js
const CARD_COLORS = [
  { bg: 'linear-gradient(135deg,#ede9fe 0%,#ddd6fe 100%)', border: 'rgba(139,92,246,.35)' }, // violet
  { bg: 'linear-gradient(135deg,#eff6ff 0%,#bfdbfe 100%)', border: 'rgba(59,130,246,.35)' },  // blue
  { bg: 'linear-gradient(135deg,#ecfdf5 0%,#a7f3d0 100%)', border: 'rgba(16,185,129,.35)' },  // mint
  { bg: 'linear-gradient(135deg,#fefce8 0%,#fde68a 100%)', border: 'rgba(217,119,6,.35)' },   // cream
  { bg: 'linear-gradient(135deg,#fff7ed 0%,#fed7aa 100%)', border: 'rgba(249,115,22,.35)' },  // peach
  { bg: 'linear-gradient(135deg,#fdf2f8 0%,#fbcfe8 100%)', border: 'rgba(236,72,153,.35)' },  // pink
  { bg: 'linear-gradient(135deg,#f0fdfa 0%,#99f6e4 100%)', border: 'rgba(20,184,166,.35)' },  // teal
  { bg: 'linear-gradient(135deg,#eef2ff 0%,#c7d2fe 100%)', border: 'rgba(99,102,241,.35)' },  // indigo
  { bg: 'linear-gradient(135deg,#fff1f2 0%,#fecdd3 100%)', border: 'rgba(244,63,94,.35)' },   // rose
  { bg: 'linear-gradient(135deg,#f7fee7 0%,#d9f99d 100%)', border: 'rgba(132,204,22,.35)' },  // lime
  { bg: 'linear-gradient(135deg,#f0f9ff 0%,#bae6fd 100%)', border: 'rgba(14,165,233,.35)' },  // sky
  { bg: 'linear-gradient(135deg,#fffbeb 0%,#fcd34d 100%)', border: 'rgba(245,158,11,.35)' },  // amber
];
```

Icon square is solid gradient, 52x52px, `border-radius:14px`, with a white line-icon SVG inside — see `.wfm-wcard-icon`. The card itself (background/border) stays transparent/plain; only the icon square is colored. Section header: badge pill with a dot (`.wfm-why-badge`/`.wfm-why-dot`) + two-column heading/description (`.wfm-why-header`) + divider (`.wfm-why-divider`) above the grid.

### Line icons

Use simple 24x24 stroke-style SVGs (`fill="none" stroke="currentColor" strokeWidth="1.8"`), one `<path>` per icon (multiple `M` subpaths in a single `d` string are valid SVG — use that instead of nesting `<circle>`/`<rect>` elements, it keeps the data array simple: `icon: 'M... M...'` then render `<path d={item.icon} />` generically). Pick icons that actually match the concept (pencil for content edits, shield for security/staging, link for integrations, trending-up for growth/SEO, etc.) — don't reuse the same icon across unrelated cards on the same page.

## Related services

Per `affordable-seo-packages`'s "More Ways We Can Grow Your Business": centered eyebrow/heading/lede, then a wrapped row of pill-shaped links (`.asp-rtags`), each pill tinted with one of a handful of accent-color classes (`.asp-rtag-amber`, `.asp-rtag-blue`, `.asp-rtag-teal`, `.asp-rtag-violet`, `.asp-rtag-green`, `.asp-rtag-orange`) cycled across the list — 6-10 links to genuinely related pages (broader/narrower service, adjacent offering, a general contact link).

## Pricing sections

Model exactly on `pages/link-building-packages/index.jsx`'s `#pricing` section:
- 4-column grid of glassmorphic cards, one tier scaled up + tagged "Most Popular" (amber gradient tag), one top tier tagged with a distinct "Elite"-style label (purple gradient tag)
- Price row: currency symbol + big number + `/mo`
- Feature checklist below a divider, genuinely different length/content per tier (never the same list truncated)
- **Do not wire up Razorpay unless real plan IDs exist for that page.** Every new pricing page built without payment plan IDs uses a plain CTA button (`Get Started` → `#{prefix}-contact`) styled to match the card instead of `<RazorpayButton>`.
- If the user gives specific ₹ or $ amounts, use them exactly — don't round or invent tiers they didn't ask for.
- **Always follow the pricing cards with a "Package Comparison at a Glance" table** (same reference page, the section right after `#pricing`) — a full feature-by-feature comparison table across all tiers (`.lbp-tbl-wrap`/`.lbp-tbl`), each row an array of `[featureLabel, ...perTierValue]`, cells using raw `✓`/`✗` characters or a short value string, styled via `.lbp-tbl-y` (default), `.lbp-tbl-n` (for `✗`), `.lbp-tbl-elite` (last/top-tier column). This is a required companion section, not an optional extra.

## Process sections

Bordered-row style (not the older circle+connector-arrow style):
```css
.{prefix}-process-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.{prefix}-step{display:grid;grid-template-columns:80px 1fr;gap:24px;padding:28px 0;border-bottom:1px solid rgba(...,.10);opacity:0;transform:translateX(-20px);transition:opacity .45s ease,transform .45s ease}
.{prefix}-step:last-child{border-bottom:none}
.{prefix}-snum{font-size:3rem;font-weight:900;color:rgba(...,.15);line-height:1;letter-spacing:-2px}
```
Background is **white**, not a tinted gradient. Right column is `position: sticky; top: 100px` holding an `<img>`.

**Number of steps**: default to 4-6. If the user says "N step process," treat that as a hard requirement — consolidate or expand step content to hit exactly N, don't just truncate a longer list and leave dangling references elsewhere on the page.

**Images for the sticky column**: only add one if the user supplies it (or one is copied from `~/Downloads/`). Never reuse another page's branded graphic or a generic stock photo as filler — an honest single-column steps list (no image) is better than a mismatched image. When an image is supplied:
1. Copy it into `public/images/<page-slug>.jpg` (or a descriptive name matching the slug)
2. Check native dimensions: `file public/images/<name>.jpg`
3. Set the `<img>` with **explicit `width`/`height` attributes matching the native pixels**, plus CSS `max-width:100%; width:{native-width}px; height:auto` on the image (not just `width:100%`) — a bare `width:100%` on a grid/flex child can get stretched by the container; capping at native width prevents that.
4. Wrap in a `display:flex; justify-content:center` column if the column is wider than the image, so it doesn't just left-align oddly.

## SEO / `<Head>` block

- Canonical URL: static pages canonicalize **with** a trailing slash — confirm against `pages/sitemap.xml.js`'s comment explaining the one exception (case-study details and blog posts canonicalize *without* one).
- OG image: reuse the site-wide fallback (`banner-1sol.jpg`) unless a dedicated `og-<slug>.jpg` already exists — don't invent a new OG image path that doesn't exist on disk.
- JSON-LD: `BreadcrumbList` + `LocalBusiness`/`ProfessionalService` (with `@id` referencing the org) + `FAQPage` (mirroring every visible FAQ) as a minimum. Add `Review` entries if the page has testimonials with schema-worthy content.

## Sitemap

Every new page **must** be added to `pages/sitemap.xml.js`'s `STATIC_PAGES` array, grouped near its closest sibling pages, `priority` 0.7-0.9 (match siblings), `changefreq: 'monthly'`.

## Interlinking

New pages should:
1. Link **out** to 2-3 closely related existing pages (broader service, sibling location, adjacent offering) in a natural spot (related-tags section, a "need X instead?" aside).
2. Get **reciprocal links back** from those same pages — small, surgical edits (one new entry in an existing related-links array/list), never a restructure of the page you're linking from. Read the target file fully before editing it.

## Verification checklist (every change, no exceptions)

1. `npx eslint pages/<slug>/index.jsx` (and any other file touched) — must exit 0. Fix anything you introduced; pre-existing unrelated errors in a file you only lightly touched can be left, but note them.
2. `npm run dev` in the background (`run_in_background` or `&`), wait for `Ready in` in the log.
3. Load the Chrome MCP tools if not already loaded (`select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__read_console_messages`).
4. Navigate to `http://localhost:3000/<slug>`, scroll to and screenshot every section you touched. For a reveal-on-scroll section that isn't visible yet, force it via `document.querySelectorAll('.{prefix}-step, .{prefix}-s-reveal').forEach(el => el.classList.add('vis', 'revealed'))` (exact class names vary per page) rather than fighting the IntersectionObserver.
5. `read_console_messages` with `onlyErrors: true` on a **fresh navigation** (not mid-session — your own test scripts can trigger false-positive hydration warnings if you mutate the DOM before checking console).
6. Kill the dev server: `pkill -f "next dev"`.
7. `git checkout -- next-env.d.ts` if `npm run dev` touched it (it's auto-generated, not a real change).

## Shipping checklist

1. `git status --short` — confirm only the files you meant to touch are staged.
2. `git fetch origin && git log HEAD..origin/main --oneline` — check for concurrent pushes before committing (other agents/sessions may be working on this repo).
3. Commit with a message explaining **why**, not just what — match the repo's existing commit style (see `git log` for tone: root cause first, then the fix, in prose paragraphs, no bullet-point changelogs for single-purpose commits).
4. `git push origin main`.
5. Confirm the deploy actually reaches production — don't assume a successful push means it's live:
   - Vercel deploys on this project (700+ pages) typically take 2-4 minutes to build.
   - Poll `curl -s https://www.1solutions.biz/<slug>` for a string unique to your change (or use the Vercel plugin's `list_deployments`/`get_deployment` to check `state: READY`), on an interval of ~20s.
   - A `state: READY` deployment can still lag a few seconds on the CDN edge before `curl` reflects it — if a Monitor-based check says "not live yet" but Vercel shows `READY`, re-verify directly with `curl` before assuming something's wrong.

## When to delegate to a fork

Building a brand-new page from scratch (reading 3-4 reference pages, writing 400-800 lines, wiring interlinks both directions, full verification) is a good candidate for `Agent` with `subagent_type: "fork"` — it's heavy exploration + long output you don't need to keep in your own context, and the fork inherits this conversation's context including this skill. Give the fork prompt the exact canonical reference files to read, the exact content/pricing/copy requirements, and the full verification + shipping checklist above — don't make it re-derive conventions from scratch.

Section-level edits to an existing page (recolor cards, swap an image, trim steps, redesign one section to match another page) are fast enough to do directly — forking adds overhead without saving meaningful context for a change under ~100 lines.
