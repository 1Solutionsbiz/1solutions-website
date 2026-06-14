'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Next.js Development Services', item: 'https://www.1solutions.biz/nextjs-development-services/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Next.js Development Services',
      url: 'https://www.1solutions.biz/nextjs-development-services/',
      description: 'Expert Next.js development services — custom Next.js web applications, SaaS platforms, headless eCommerce storefronts, enterprise portals, API Routes and full-stack Next.js, headless CMS integration, Next.js migration, performance optimisation, and dedicated Next.js development teams for businesses worldwide.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '88', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why choose Next.js for web application development?', acceptedAnswer: { '@type': 'Answer', text: 'Next.js is the leading React framework for production web applications. It offers multiple rendering strategies in a single framework — Static Site Generation (SSG) for maximum CDN-cached performance, Server-Side Rendering (SSR) for dynamic SEO-friendly pages, Incremental Static Regeneration (ISR) for high-traffic sites that need fresh data without full rebuilds, and React Server Components for streaming HTML from the server. The App Router (Next.js 13+) unifies routing, layouts, and data fetching into a single model. Next.js is the default choice at Vercel and is used in production by companies including Vercel, TikTok, Twitch, Nike, Hulu, and thousands of SaaS businesses.' } },
        { '@type': 'Question', name: 'What is the difference between Next.js App Router and Pages Router?', acceptedAnswer: { '@type': 'Answer', text: "The Pages Router is Next.js's original routing model (pre-v13) — pages are files in the /pages/ directory, data fetching uses getServerSideProps/getStaticProps, and client/server boundaries are at the page level. The App Router (Next.js 13+, stable in v14) uses the /app/ directory, introduces React Server Components as the default, enables nested layouts without layout shift, streaming rendering with Suspense, and co-located loading/error UI. The App Router is Vercel's recommended approach for new projects. We build on App Router for all new projects and can migrate existing Pages Router applications to App Router when the benefits justify the migration cost." } },
        { '@type': 'Question', name: 'Can Next.js be used as a full-stack framework?', acceptedAnswer: { '@type': 'Answer', text: "Yes. Next.js covers the full stack via API Routes (Pages Router) and Route Handlers (App Router) — you can write Node.js server-side logic, database queries, authentication, file uploads, and third-party API calls directly in the same Next.js project as your frontend. For more complex backends, we pair Next.js with separate backend services (Node.js/Express, NestJS, Django, Go) connected via REST or GraphQL. Server Actions (Next.js 14+) further blur the frontend/backend boundary by allowing server-side mutations to be called directly from React Server Components without a separate API endpoint." } },
        { '@type': 'Question', name: 'What databases and backends work with Next.js?', acceptedAnswer: { '@type': 'Answer', text: 'Next.js is database and backend agnostic. We connect Next.js applications to PostgreSQL (via Prisma, Drizzle ORM, or direct pg), MySQL, MongoDB, Redis, and Supabase (PostgreSQL with real-time and auth). For ORMs we primarily use Prisma (type-safe schema-first ORM) and Drizzle ORM. For auth we use NextAuth.js / Auth.js, Clerk, or custom JWT/session implementations. For file storage we use AWS S3, Cloudflare R2, or Supabase Storage. The right stack depends on your application requirements — we advise on the best combination before the project begins.' } },
        { '@type': 'Question', name: 'How does Next.js handle SEO?', acceptedAnswer: { '@type': 'Answer', text: "Next.js has first-class SEO support. The Metadata API (App Router) allows per-page and layout-level SEO meta tags, Open Graph tags, Twitter cards, and JSON-LD structured data with full TypeScript types. Server-Side Rendering and Static Site Generation ensure search engines receive fully rendered HTML rather than a blank React shell — the primary SEO advantage over a client-rendered SPA. The generateMetadata function allows dynamic SEO tags generated from database or CMS content at build time (SSG) or request time (SSR). We implement canonical URLs, hreflang for international sites, structured data (FAQ, Breadcrumb, Product, Article schemas), and XML sitemap generation as standard on all Next.js projects." } },
        { '@type': 'Question', name: 'How long does a Next.js project take to build?', acceptedAnswer: { '@type': 'Answer', text: 'A Next.js marketing website with CMS integration (Contentful, Sanity, or Strapi) takes 4–8 weeks. A Next.js SaaS application with authentication, subscription billing (Stripe), and a dashboard UI takes 12–20 weeks for an MVP. A Next.js headless eCommerce storefront (Shopify Storefront API or WooCommerce) takes 8–16 weeks. An enterprise Next.js portal with SSO, role-based access control, and ERP integration takes 16–24 weeks. We provide a detailed project timeline in the scoping document before work begins — and use incremental delivery so you can review working features throughout the build.' } },
        { '@type': 'Question', name: 'Do you migrate existing React or Gatsby sites to Next.js?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We migrate React single-page applications (Create React App, Vite) and Gatsby sites to Next.js. The migration brings SSR/SSG rendering, improved SEO, built-in image optimisation, file-based routing, and the Next.js ecosystem. For CRA/Vite SPAs the migration typically takes 4–10 weeks depending on application complexity. For Gatsby sites (which already have SSG concepts) the migration is usually 6–12 weeks — Gatsby plugins are replaced with Next.js equivalents and the GraphQL data layer is replaced with direct CMS SDK calls. We maintain SEO continuity throughout the migration with redirect mapping and Search Console monitoring.' } },
        { '@type': 'Question', name: 'Where do you deploy Next.js applications?', acceptedAnswer: { '@type': 'Answer', text: "Vercel is the native deployment platform for Next.js and supports all Next.js features (including ISR, Edge Runtime, and Server Actions) out of the box. We also deploy Next.js to AWS (via AWS Amplify, ECS, or Lambda@Edge), Google Cloud Run, Railway, Render, and self-hosted Node.js servers on DigitalOcean or Hetzner. For static exports (Next.js output: export) we deploy to Cloudflare Pages, AWS S3+CloudFront, or GitHub Pages. The right deployment platform depends on your traffic patterns, compliance requirements, and budget — we advise on the best option for your specific project." } },
      ],
    },
  ],
};

const SERVICES = [
  { n: '01', title: 'Custom Next.js Web Application Development', desc: 'End-to-end Next.js application development — App Router architecture, React Server Components, server actions, nested layouts, streaming rendering with Suspense, TypeScript throughout, and full-stack API routes. From marketing sites to complex data-driven web applications built on Next.js 14/15.' },
  { n: '02', title: 'Next.js SaaS Application Development', desc: 'Multi-tenant SaaS platforms built on Next.js — authentication and user management (NextAuth.js / Clerk), subscription billing (Stripe), role-based access control, dashboard UI, usage metering, team/organisation management, onboarding flows, and transactional email. Architected for scale from day one.', feat: true },
  { n: '03', title: 'Headless eCommerce (Shopify / WooCommerce)', desc: 'Headless eCommerce storefronts built with Next.js and the Shopify Storefront API, WooCommerce REST API, or custom backend — delivering sub-second LCP, full Lighthouse 100 scores, and design freedom beyond standard Shopify themes. Includes cart, checkout, product search, and customer account pages.' },
  { n: '04', title: 'Headless CMS Integration', desc: 'Next.js applications integrated with headless CMS platforms — Contentful, Sanity, Strapi, Prismic, DatoCMS, Storyblok, and WordPress (as headless via WPGraphQL). ISR for stale-while-revalidate content freshness at CDN edge. Preview mode for live content editing before publishing.' },
  { n: '05', title: 'Next.js Enterprise Application Development', desc: 'Enterprise-grade Next.js portals — SSO integration (SAML 2.0 / OIDC via Auth0 or Okta), fine-grained RBAC, audit logging, multi-tenant data isolation, ERP and CRM integration via REST/GraphQL, WCAG 2.1 AA accessibility compliance, and enterprise security hardening.' },
  { n: '06', title: 'Next.js API Routes & Full-Stack Development', desc: 'Full-stack Next.js with Route Handlers (App Router) — REST and GraphQL APIs, database access via Prisma or Drizzle ORM, server-side cron jobs, webhook receivers, file upload handling, third-party API orchestration, and Server Actions for form mutations directly from React Server Components.' },
  { n: '07', title: 'React SPA / Gatsby Migration to Next.js', desc: 'Migration of Create React App, Vite React SPAs, and Gatsby sites to Next.js — bringing SSR/SSG rendering, improved Core Web Vitals, Next.js Image and Font optimisation, file-based routing, and first-class TypeScript support. SEO redirect mapping and Search Console monitoring throughout.' },
  { n: '08', title: 'Next.js Performance & Core Web Vitals Optimisation', desc: 'Next.js performance audits and optimisation — LCP, INP, and CLS improvements, Next.js Image component migration, Web Font optimisation, bundle analysis and code splitting, edge caching configuration (Vercel / Cloudflare), React Server Component migration to reduce client JS, and Lighthouse score improvements.' },
  { n: '09', title: 'Next.js Consulting & Architecture Review', desc: 'Independent review of existing Next.js codebases — App Router vs Pages Router assessment, data fetching strategy audit (too much client-side fetching?), rendering mode recommendations (SSG vs SSR vs ISR per route), bundle size review, caching strategy, deployment architecture, and database and ORM choices.' },
  { n: '10', title: 'Next.js Maintenance & Dedicated Developer Retainer', desc: 'Ongoing Next.js maintenance retainers — Next.js version upgrades (major version migrations handled carefully, e.g. Pages Router to App Router), dependency updates, performance regression monitoring, feature additions, bug fixes, and dedicated Next.js developer(s) available full-time or part-time on a monthly retainer.' },
];

const TECH_STACK = [
  { group: 'Next.js Core', color: '#0070f3', items: ['Next.js 14 / 15', 'App Router', 'React Server Components', 'Server Actions', 'Streaming / Suspense', 'Turbopack'] },
  { group: 'Language & UI', color: '#3178c6', items: ['TypeScript 5.x', 'React 18 / 19', 'Tailwind CSS 3.x', 'shadcn/ui', 'Radix UI / Headless UI', 'Framer Motion'] },
  { group: 'Data Fetching & State', color: '#D97706', items: ['TanStack Query', 'SWR', 'Zustand / Jotai', 'Zod (validation)', 'React Hook Form', 'tRPC'] },
  { group: 'Database & ORM', color: '#f97316', items: ['PostgreSQL / MySQL', 'Prisma ORM', 'Drizzle ORM', 'Supabase', 'MongoDB / Mongoose', 'Redis / Upstash'] },
  { group: 'Auth & Payments', color: '#6366f1', items: ['NextAuth.js / Auth.js', 'Clerk', 'Auth0 / Okta (SSO)', 'Stripe / Paddle', 'SAML 2.0 / OIDC', 'JWT / Session Auth'] },
  { group: 'CMS & Content', color: '#a855f7', items: ['Contentful', 'Sanity.io', 'Strapi', 'Prismic / DatoCMS', 'WordPress (Headless)', 'Storyblok'] },
  { group: 'Testing & Quality', color: '#16a34a', items: ['Jest / Vitest', 'React Testing Library', 'Playwright (E2E)', 'Storybook', 'ESLint / Prettier', 'Husky / lint-staged'] },
  { group: 'Deployment & DevOps', color: '#0891b2', items: ['Vercel', 'AWS Amplify / ECS', 'Cloudflare Pages', 'GitHub Actions / CI', 'Docker', 'Sentry / Datadog'] },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'dedicated',
    name: 'Dedicated Next.js Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'A dedicated Next.js team working exclusively on your product.',
    desc: 'Full-time offshore Next.js engineers, a UI/UX designer, and QA working as a natural extension of your product team. They join your standups, commit to your Git repo, and own the roadmap alongside you — at a fraction of the cost of equivalent US/UK/AU hires. You own all code and IP from day one.',
    bestFor: ['SaaS products with ongoing feature roadmap', 'Startups that need to scale engineering capacity fast', 'Replacing an expensive local Next.js agency', 'Enterprise portals requiring continuous development'],
    process: 'Team assembly → Technical discovery → Sprint delivery → Ongoing roadmap',
    timeline: 'Team available within 5–7 business days',
  },
  {
    id: 'fixed',
    name: 'Fixed Price Project',
    badge: 'Defined scope',
    badgeColor: '#0070f3',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Fixed price, fixed scope, fixed schedule.',
    desc: 'Best for a well-defined Next.js project — a headless marketing website, a React SPA migration, a headless eCommerce storefront, or an MVP with a clear specification. Fixed price covering design, development, testing, and deployment. No scope creep, no surprise invoices at launch.',
    bestFor: ['Next.js marketing site with headless CMS', 'CRA / Gatsby → Next.js migration', 'Headless Shopify storefront build', 'Next.js MVP with defined feature set'],
    process: 'Detailed spec → Fixed quote → Milestone delivery → UAT → Launch',
    timeline: 'Best for 6–20 week projects',
  },
  {
    id: 'retainer',
    name: 'Monthly Retainer',
    badge: 'Flexible ongoing',
    badgeColor: '#a855f7',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Monthly Next.js dev hours for ongoing work and support.',
    desc: 'A monthly bank of Next.js developer hours for feature additions, dependency updates, Next.js version upgrades, performance work, bug fixes, and third-party API changes — without a full dedicated team commitment. Transparent hours reporting each month.',
    bestFor: ['Post-launch Next.js applications needing ongoing work', 'Next.js sites needing regular content and feature updates', 'Version upgrades and dependency maintenance', 'Flexible support without a full-time engagement'],
    process: 'Monthly hours bank → Ticket-based prioritisation → Hours report → Rolling rollover',
    timeline: 'Start within 3–5 business days',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Technical Discovery & Architecture Planning', desc: 'We begin with a deep-dive into your requirements — application type, data model, user roles, rendering strategy per route (SSG, SSR, ISR, or client-only), third-party integrations, authentication requirements, and scalability targets. We produce a written architecture document covering App Router structure, data fetching strategy, database schema overview, API design, and deployment architecture before any code is written.' },
  { num: '02', title: 'UI/UX Design & Component System', desc: 'High-fidelity Figma mockups of all page templates and interactive states, designed with your brand system — typography, colour tokens, spacing scale, and component library. We design the full component inventory (buttons, forms, cards, tables, modals, navigation) before development begins, eliminating design ambiguity mid-sprint and preventing rework.' },
  { num: '03', title: 'Next.js Development — App Router First', desc: 'Feature development in two-week sprints on the Next.js App Router — React Server Components for data-fetching pages, client components scoped to interactive islands, server actions for mutations, nested layouts for persistent UI, and streaming with Suspense for progressive page loading. TypeScript strict mode, ESLint, Prettier, and Husky pre-commit hooks enforced from sprint one.' },
  { num: '04', title: 'API, Database & Integration Development', desc: 'Route Handler development (REST or tRPC), Prisma or Drizzle ORM schema and migrations, authentication flows (NextAuth.js / Clerk / Auth0), Stripe subscription billing, headless CMS SDK integration, third-party API connectors, webhook receivers, background jobs (Inngest / Trigger.dev / cron), and email delivery (Resend / SendGrid).' },
  { num: '05', title: 'Testing, Performance & Accessibility', desc: 'Unit and integration testing with Vitest and React Testing Library, end-to-end testing with Playwright covering critical user flows (sign up, onboarding, checkout, core features). Lighthouse and Core Web Vitals benchmarking. WCAG 2.1 AA accessibility audit. Bundle analysis and code splitting optimisation. Sentry error tracking and performance monitoring configured before launch.' },
  { num: '06', title: 'Deployment, Launch & Post-Launch Support', desc: 'Vercel or preferred platform deployment with preview environments per PR, production deployment with rollback capability, custom domain and SSL, CDN caching configuration, environment variables and secrets management, uptime monitoring, and structured post-launch support period. For dedicated team engagements, development continues into the next sprint cycle immediately after launch.' },
];

const TESTIMONIALS = [
  {
    text: "1Solutions migrated our CRA single-page application to Next.js App Router in 10 weeks. The SEO impact was immediate — we went from near-zero indexing on our content pages to full coverage within 6 weeks of launch. Core Web Vitals went from red to green across the board. Our organic traffic has grown 140% in the six months since migration. They knew exactly what they were doing.",
    name: 'James L.', role: 'CTO, B2B SaaS Platform (UK)', init: 'JL', bg: '#0F3460',
  },
  {
    text: "We needed a senior Next.js team to work on our SaaS product alongside our internal engineers. 1Solutions provided two full-stack Next.js developers who joined our GitHub, Slack, and daily standups from week one. They delivered more story points per sprint than our internal team and the code quality is outstanding. Eighteen months in, we have doubled our feature velocity at half the cost of hiring locally.",
    name: 'Priya K.', role: 'VP Engineering, HR Tech SaaS (AU)', init: 'PK', bg: '#1e1b4b', feat: true,
  },
  {
    text: "1Solutions built our headless Shopify storefront on Next.js with the Storefront API. Our previous Liquid theme scored 32 on mobile Lighthouse. The new Next.js storefront scores 98. Average page load dropped from 4.2s to 0.8s. In the first quarter post-launch, our mobile conversion rate increased 34%. The investment paid back in under 90 days.",
    name: 'Emily T.', role: 'Head of Digital, DTC Brand (US)', init: 'ET', bg: '#1e3a5f',
  },
];

const WHY_CARDS = [
  { title: '15+ Years React & Next.js Expertise', desc: 'We have been building React applications since React 0.14 and Next.js applications since Next.js 9. Our developers have built production applications across every major Next.js version — from Pages Router with getServerSideProps through to App Router with React Server Components and Server Actions in Next.js 14/15.' },
  { title: 'App Router Native — Not Pages Router Leftovers', desc: "All new projects are built on Next.js App Router with React Server Components as the default. We don't retrofit App Router thinking onto a Pages Router architecture. Server Components, nested layouts, streaming, and Server Actions are how our developers think — not features we add later." },
  { title: 'Full-Stack Next.js — Not Just Frontend', desc: 'We build the full stack in Next.js — Route Handlers, Prisma database layer, NextAuth.js authentication, Stripe billing, file uploads to S3/R2, email delivery with Resend, and background jobs with Inngest. You get a cohesive full-stack codebase in one framework, not a fragmented microservices stack for a simple SaaS.' },
  { title: 'TypeScript Strict Mode on Every Project', desc: 'TypeScript strict mode from project initialisation — no escape hatches, no any types, no shortcuts. Zod for runtime validation at system boundaries (API inputs, form data, external API responses). tRPC where it fits for end-to-end type safety from database to UI. Type safety is not optional on our Next.js projects.' },
  { title: 'Core Web Vitals as a Delivery Standard', desc: 'Every Next.js project we deliver hits green Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1) before handover. We instrument Lighthouse in CI so performance regressions are caught in pull request review, not discovered post-launch. Performance is built in, not optimised as an afterthought.' },
  { title: 'SEO-First Architecture', desc: 'SEO is an architectural decision in Next.js — it is determined by rendering mode, Metadata API implementation, structured data, canonical configuration, and sitemap generation. We make these decisions at project kickoff, not as an afterthought. Our Next.js migrations have never lost organic search traffic.' },
  { title: 'Vercel & Multi-Cloud Deployment Expertise', desc: 'We deploy Next.js on Vercel (native, recommended), AWS (Amplify, ECS, Lambda@Edge), Cloudflare Pages, Railway, Render, and self-hosted Node.js. We know which platform is right for each project — Vercel for most SaaS and marketing sites, AWS for regulated enterprise, Cloudflare for global edge performance.' },
  { title: 'Transparent Delivery — No Offshore Surprise', desc: 'Daily GitHub commits, weekly sprint demos of working features, documented architectural decisions, and a handover package at project close including architecture documentation, environment setup guide, deployment runbook, and test coverage report. You are never left with a black-box codebase from an offshore team.' },
];

const FAQS = [
  { q: 'Why choose Next.js for web application development?', a: "Next.js is the leading React framework for production web applications. It offers multiple rendering strategies — SSG for maximum CDN performance, SSR for dynamic SEO-friendly pages, ISR for fresh data without full rebuilds, and React Server Components for server-streamed HTML. The App Router (Next.js 13+) unifies routing, layouts, and data fetching into a single coherent model. It is the default choice for new React projects at scale, used by Vercel, TikTok, Twitch, Nike, Hulu, and thousands of SaaS companies worldwide." },
  { q: 'What is the difference between Next.js App Router and Pages Router?', a: "The Pages Router (/pages/ directory) is Next.js's original model using getServerSideProps/getStaticProps for data fetching. The App Router (/app/ directory, stable in Next.js 14) introduces React Server Components as default, nested layouts, streaming with Suspense, Server Actions for mutations, and co-located loading/error UI. The App Router is Vercel's recommended approach for all new projects. We build on App Router for all new work and can migrate existing Pages Router applications when the benefits justify the cost." },
  { q: 'Can Next.js be used as a full-stack framework?', a: "Yes. Next.js covers the full stack via Route Handlers (App Router) for Node.js server logic, database queries, authentication, and API endpoints — all in the same project as the frontend. Server Actions (Next.js 14+) allow server-side mutations called directly from React Server Components without a separate API endpoint. For complex backends we pair Next.js with separate services (NestJS, Go, Django) connected via REST or GraphQL." },
  { q: 'What databases and backends work with Next.js?', a: 'Next.js is database agnostic. We connect Next.js to PostgreSQL (via Prisma or Drizzle ORM), MySQL, MongoDB, Redis, and Supabase. For auth we use NextAuth.js / Auth.js, Clerk, or Auth0. For file storage we use AWS S3, Cloudflare R2, or Supabase Storage. The right stack depends on your application — we advise on the optimal combination in the technical discovery phase before the project begins.' },
  { q: 'How does Next.js handle SEO?', a: "Next.js has first-class SEO support. The Metadata API allows per-page SEO meta, Open Graph, Twitter cards, and JSON-LD structured data with full TypeScript types. SSR and SSG ensure search engines receive fully rendered HTML — the primary SEO advantage over client-rendered SPAs. The generateMetadata function enables dynamic SEO tags from CMS content at build time (SSG) or request time (SSR). We implement canonical URLs, hreflang, structured data, and XML sitemaps as standard on every Next.js project." },
  { q: 'How long does a Next.js project take?', a: 'A Next.js marketing site with headless CMS takes 4–8 weeks. A Next.js SaaS MVP with auth, billing, and dashboard takes 12–20 weeks. A headless eCommerce storefront takes 8–16 weeks. An enterprise portal with SSO and ERP integration takes 16–24 weeks. We provide a detailed timeline in the scoping document before work begins and use incremental delivery so you can review working features throughout the build.' },
  { q: 'Do you migrate existing React or Gatsby sites to Next.js?', a: "Yes. We migrate Create React App, Vite React SPAs, and Gatsby sites to Next.js — bringing SSR/SSG, better SEO, built-in image optimisation, and the App Router. CRA/Vite migrations typically take 4–10 weeks. Gatsby migrations take 6–12 weeks. We maintain SEO continuity throughout with redirect mapping and Search Console monitoring, and have never lost significant organic traffic in a Next.js migration." },
  { q: 'Where do you deploy Next.js applications?', a: "Vercel is the native platform for Next.js and supports all features (ISR, Edge Runtime, Server Actions) out of the box. We also deploy to AWS (Amplify, ECS, Lambda@Edge), Google Cloud Run, Railway, Render, Cloudflare Pages (for static exports), and self-hosted Node.js servers. The right platform depends on traffic, compliance requirements, and budget — we advise on the best option in the architecture planning phase." },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (!num) return;
    let t0 = null;
    const step = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  return (
    <div className="nx-stat-col">
      <div className="nx-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="nx-stat-label">{label}</div>
    </div>
  );
}

export default function NextjsDevelopmentServices() {
  const [showAllSvc, setShowAllSvc] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleSvcCards, setVisibleSvcCards] = useState([]);
  const [visibleEngCards, setVisibleEngCards] = useState([]);
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleStackCards, setVisibleStackCards] = useState([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const svcGridRef = useRef(null);
  const engGridRef = useRef(null);
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);
  const stackGridRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const pairs = [[svcGridRef, SERVICES.length, setVisibleSvcCards],[engGridRef, 3, setVisibleEngCards],[whyGridRef, WHY_CARDS.length, setVisibleWhyCards],[testiGridRef, 3, setVisibleTestiCards],[stackGridRef, TECH_STACK.length, setVisibleStackCards]];
    const observers = pairs.map(([ref, count, setter]) => {
      if (!ref.current) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 80)); obs.disconnect(); } }, { threshold: 0.05 });
      obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); } }, { threshold: 0.1 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const visibleServices = showAllSvc ? SERVICES : SERVICES.slice(0, 6);

  return (
    <>
      <Head>
        <title>Next.js Development Services | App Router, SaaS, Headless eCommerce | 1Solutions</title>
        <meta name="description" content="Expert Next.js development — custom web apps, SaaS platforms, headless eCommerce, App Router, React Server Components, headless CMS integration, React SPA migration, and dedicated Next.js teams. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/nextjs-development-services/" />
        <meta property="og:title" content="Next.js Development Services | 1Solutions" />
        <meta property="og:description" content="Next.js App Router development — SaaS platforms, headless eCommerce, full-stack Next.js, React migration, Core Web Vitals optimisation, and dedicated Next.js development teams." />
        <meta property="og:url" content="https://www.1solutions.biz/nextjs-development-services/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .nx-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 20%,#f0f9ff 50%,#fef3c7 75%,#f5f3ff 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .nx-page *,.nx-page *::before,.nx-page *::after{box-sizing:border-box}
          .nx-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .nx-orb-1{width:880px;height:880px;background:radial-gradient(circle,rgba(0,112,243,.20) 0%,rgba(59,130,246,.08) 40%,transparent 70%);top:-280px;right:-260px}
          .nx-orb-2{width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px}
          .nx-orb-3{width:550px;height:550px;background:radial-gradient(circle,rgba(168,85,247,.14) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%)}
          .nx-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .nx-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .nx-breadcrumb li{display:flex;align-items:center;gap:6px}
          .nx-breadcrumb li::after{content:'/';opacity:.45}
          .nx-breadcrumb li:last-child::after{display:none}
          .nx-breadcrumb a{color:#0F3460;text-decoration:none}
          .nx-breadcrumb a:hover{text-decoration:underline}
          .nx-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .nx-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .nx-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#0070f3 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .nx-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .nx-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .nx-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .nx-badge-dot{width:7px;height:7px;border-radius:50%;background:#0070f3;flex-shrink:0}
          .nx-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .nx-btn-primary{display:inline-block;padding:14px 36px;background:#0070f3;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(0,112,243,.28)}
          .nx-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .nx-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .nx-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(0,112,243,.5);transform:translateY(-2px)}
          .nx-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .nx-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .nx-stat-col:last-child{border-right:none}
          .nx-stat-val{font-size:28px;font-weight:900;color:#0070f3;letter-spacing:-.5px;line-height:1}
          .nx-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .nx-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .nx-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .nx-logos-wrap{width:100%;overflow:hidden}
          .nx-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:nx-marquee 28s linear infinite}
          .nx-logos-track:hover{animation-play-state:paused}
          @keyframes nx-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .nx-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .nx-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .nx-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .nx-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .nx-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .nx-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .nx-s-reveal.nx-revealed{opacity:1;transform:translateY(0)}
          .nx-inner{max-width:1300px;margin:0 auto}
          .nx-svc-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .nx-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .nx-svc-card{background:linear-gradient(135deg,rgba(239,246,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(245,243,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .nx-svc-card.nx-cv{opacity:1;transform:translateY(0)}
          .nx-svc-card.nx-cv:hover{transform:translateY(-6px);border-color:rgba(0,112,243,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .nx-svc-card.feat{border-color:rgba(0,112,243,.20)}
          .nx-svc-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .nx-svc-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .nx-svc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .nx-svc-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#0070f3,#60a5fa);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .nx-svc-card.nx-cv:hover::before{transform:scaleY(1)}
          .nx-svc-more{text-align:center;margin-top:22px}
          .nx-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .nx-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .nx-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .nx-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .nx-stack-card{background:linear-gradient(135deg,rgba(239,246,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(245,243,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .nx-stack-card.nx-sv{opacity:1;transform:translateY(0)}
          .nx-stack-card.nx-sv:hover{border-color:rgba(0,112,243,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .nx-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .nx-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .nx-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .nx-eng-section{padding:80px 40px;position:relative;z-index:1}
          .nx-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .nx-eng-card{background:linear-gradient(135deg,rgba(239,246,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(245,243,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .nx-eng-card.nx-ev{opacity:1;transform:translateY(0)}
          .nx-eng-card.nx-ev:hover{border-color:rgba(0,112,243,.25);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .nx-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(239,246,255,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .nx-eng-card.feat.nx-ev{transform:translateY(-8px)}
          .nx-eng-card.feat.nx-ev:hover{transform:translateY(-12px)}
          .nx-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .nx-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s}
          .nx-eng-card.nx-ev:hover .nx-eng-icon{background:rgba(0,112,243,.10)}
          .nx-eng-card.feat .nx-eng-icon{background:rgba(217,119,6,.10)}
          .nx-eng-icon svg{fill:#0F3460;transition:fill .2s}
          .nx-eng-card.nx-ev:hover .nx-eng-icon svg{fill:#0070f3}
          .nx-eng-card.feat .nx-eng-icon svg{fill:#D97706}
          .nx-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .nx-eng-headline{font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px}
          .nx-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .nx-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .nx-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .nx-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .nx-eng-list li::before{content:'✓';font-weight:800;color:#0070f3;flex-shrink:0;margin-top:1px}
          .nx-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .nx-eng-process strong{color:#0F3460}
          .nx-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .nx-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .nx-eng-cta:hover{background:#0F3460;color:#fff}
          .nx-eng-card.feat .nx-eng-cta{background:#0070f3;color:#fff;border-color:#0070f3}
          .nx-eng-card.feat .nx-eng-cta:hover{background:#0F3460;border-color:#0F3460}
          .nx-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .nx-psteps{display:flex;flex-direction:column;margin-top:52px}
          .nx-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .nx-pstep.nx-pv{opacity:1;transform:translateY(0)}
          .nx-pstep-l{display:flex;flex-direction:column;align-items:center}
          .nx-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s}
          .nx-pstep.nx-pv:hover .nx-pstep-circle{background:rgba(0,112,243,.10);border-color:#0070f3;color:#0070f3}
          .nx-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .nx-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .nx-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .nx-pstep:last-child .nx-pstep-connector{display:none}
          .nx-pstep-r{padding:4px 0 38px}
          .nx-pstep:last-child .nx-pstep-r{padding-bottom:0}
          .nx-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .nx-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .nx-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .nx-center-head{text-align:center;margin-bottom:48px}
          .nx-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .nx-tcard{background:linear-gradient(135deg,rgba(239,246,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(245,243,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s}
          .nx-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(239,246,255,.42) 100%);border-color:rgba(217,119,6,.22)}
          .nx-tcard.nx-tv{opacity:1;transform:translateY(0)}
          .nx-tcard.nx-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .nx-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .nx-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .nx-tauthor{display:flex;align-items:center;gap:12px}
          .nx-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .nx-tname{font-size:14px;font-weight:700;color:#0F3460}
          .nx-trole{font-size:12px;color:#6b7280}
          .nx-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .nx-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .nx-wcard{background:linear-gradient(135deg,rgba(239,246,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(245,243,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .nx-wcard.nx-wv{opacity:1;transform:translateY(0) scale(1)}
          .nx-wcard.nx-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(0,112,243,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .nx-wcard-dot{width:10px;height:10px;border-radius:50%;background:#0070f3;margin-bottom:12px}
          .nx-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .nx-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .nx-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(239,246,255,.55) 0%,rgba(255,255,255,.60) 40%,rgba(245,243,255,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .nx-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .nx-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#0070f3 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .nx-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .nx-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .nx-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .nx-cbenefit-icon{flex-shrink:0;color:#0070f3;font-weight:800;font-size:16px;margin-top:1px}
          .nx-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .nx-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(239,246,255,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .nx-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .nx-form{display:flex;flex-direction:column;gap:13px}
          .nx-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .nx-fg{display:flex;flex-direction:column;gap:5px}
          .nx-fg.full{grid-column:1/-1}
          .nx-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .nx-fg input,.nx-fg textarea,.nx-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .nx-fg input:focus,.nx-fg textarea:focus,.nx-fg select:focus{outline:none;border-color:#0070f3;box-shadow:0 0 0 3px rgba(0,112,243,.10)}
          .nx-consent{display:flex;gap:8px;align-items:flex-start}
          .nx-consent input{margin-top:3px;width:15px;height:15px}
          .nx-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .nx-consent a{color:#0F3460}
          .nx-submit{width:100%;padding:14px;background:#0070f3;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(0,112,243,.26)}
          .nx-submit:hover{background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28)}
          .nx-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .nx-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .nx-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .nx-faq-list{display:flex;flex-direction:column;gap:10px}
          .nx-fitem{background:linear-gradient(135deg,rgba(239,246,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(245,243,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .nx-fitem.open{border-color:rgba(0,112,243,.30)}
          .nx-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#0070f3,#60a5fa);border-radius:3px 3px 0 0}
          .nx-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .nx-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .nx-fitem.open .nx-fq-badge{background:#0070f3;color:#fff}
          .nx-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .nx-fitem.open .nx-fq span{color:#1e40af}
          .nx-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .nx-fitem.open .nx-fchev{transform:rotate(180deg);color:#0070f3}
          .nx-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .nx-fitem.open .nx-fanswer-wrap{max-height:500px}
          .nx-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .nx-related{padding:80px 40px;background:rgba(239,246,255,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .nx-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .nx-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .nx-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .nx-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .nx-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .nx-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .nx-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .nx-rtag-blue{background:rgba(0,112,243,.09);border-color:rgba(0,112,243,.28);color:#0070f3}
          .nx-rtag-violet{background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9}
          .nx-rtag-amber{background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309}
          .nx-rtag-teal{background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E}
          .nx-rtag-green{background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d}
          .nx-rtag-rose{background:rgba(225,29,72,.09);border-color:rgba(225,29,72,.28);color:#9f1239}
          @media(max-width:1024px){.nx-hero h1,.nx-s-title,.nx-faq h2{font-size:36px}.nx-svc-grid{grid-template-columns:repeat(2,1fr)}.nx-stack-grid{grid-template-columns:repeat(2,1fr)}.nx-eng-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.nx-eng-card.feat{transform:none}.nx-eng-card.feat.nx-ev{transform:none}.nx-eng-card.feat.nx-ev:hover{transform:translateY(-4px)}.nx-why-grid{grid-template-columns:repeat(2,1fr)}.nx-tgrid{grid-template-columns:1fr}.nx-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.nx-breadcrumb{padding:12px 20px 0}.nx-hero{padding:28px 20px 20px}.nx-hero h1{font-size:26px;letter-spacing:-.3px}.nx-stats{grid-template-columns:1fr 1fr}.nx-stat-col:nth-child(2){border-right:none}.nx-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.nx-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.nx-logos{padding:16px 20px 28px}.nx-svc-section,.nx-stack-section,.nx-eng-section,.nx-process-section,.nx-testi,.nx-why-section,.nx-faq,.nx-related{padding:52px 20px}.nx-contact{padding:48px 20px}.nx-svc-grid,.nx-stack-grid,.nx-why-grid{grid-template-columns:1fr}.nx-frow{grid-template-columns:1fr}.nx-ctitle{font-size:28px}.nx-s-title{font-size:28px}}
        `}</style>
      </Head>

      <div className="nx-page">
        <div className="nx-orb nx-orb-1" /><div className="nx-orb nx-orb-2" /><div className="nx-orb nx-orb-3" />

        <nav className="nx-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Next.js Development Services</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <section className="nx-hero">
          <span className="nx-eyebrow">Next.js Development Services</span>
          <h1>Next.js Development — App Router, SaaS Platforms, Headless eCommerce & More</h1>
          <p className="nx-hero-desc">Expert Next.js development — full-stack App Router applications, SaaS platforms with auth and billing, headless eCommerce with Shopify or WooCommerce, headless CMS integration, React SPA migration to Next.js, and dedicated Next.js development teams for businesses worldwide.</p>
          <div className="nx-trust-row">
            {['Next.js App Router Native','TypeScript Strict Mode','Core Web Vitals Green','Full-Stack Next.js','15+ Years Experience'].map(b => (
              <div className="nx-badge" key={b}><span className="nx-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="nx-ctas">
            <Link href="#contact" className="nx-btn-primary">Start Your Next.js Project</Link>
            <Link href="#engagement" className="nx-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        <div className="nx-stats" ref={statsRef}>
          {[['90+','Next.js Projects Delivered'],['15+','Years React Experience'],['100','Lighthouse Score Achieved'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        <div className="nx-logos">
          <span className="nx-logos-label">Trusted by Leading Businesses</span>
          <div className="nx-logos-wrap">
            <div className="nx-logos-track">
              {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="nx-clogo" />
              ))}
            </div>
          </div>
        </div>

        <section className="nx-svc-section" aria-labelledby="nx-svc-heading">
          <div className="nx-inner">
            <div className={`nx-s-reveal${visibleSections.has('svc') ? ' nx-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="nx-s-eyebrow">What We Build</span>
              <h2 id="nx-svc-heading" className="nx-s-title">Next.js Development Services We Deliver</h2>
              <p className="nx-s-desc" style={{ maxWidth: 720 }}>From custom Next.js web applications and full-stack SaaS platforms through headless eCommerce, headless CMS integration, React SPA migrations, performance optimisation, and dedicated Next.js teams on an ongoing retainer.</p>
            </div>
            <div className="nx-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`nx-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' nx-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="nx-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="nx-svc-more">
                <button className="nx-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="stack" className="nx-stack-section" aria-labelledby="nx-stack-heading">
          <div className="nx-inner">
            <div className={`nx-s-reveal${visibleSections.has('stk') ? ' nx-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="nx-s-eyebrow">Tech Stack</span>
              <h2 id="nx-stack-heading" className="nx-s-title">Next.js 14/15, TypeScript & the Modern React Ecosystem</h2>
              <p className="nx-s-desc" style={{ maxWidth: 680 }}>Next.js 14/15 App Router, React Server Components, TypeScript strict mode, Tailwind CSS, Prisma ORM, NextAuth.js / Clerk, Stripe, TanStack Query, Contentful/Sanity headless CMS, Playwright testing, and Vercel/AWS deployment.</p>
            </div>
            <div className="nx-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`nx-stack-card${visibleStackCards.includes(i) ? ' nx-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="nx-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="nx-stack-pills">
                    {grp.items.map(item => <span key={item} className="nx-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="engagement" className="nx-eng-section" aria-labelledby="nx-eng-heading">
          <div className="nx-inner">
            <div className={`nx-s-reveal${visibleSections.has('eng') ? ' nx-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="nx-s-eyebrow">How We Work With You</span>
              <h2 id="nx-eng-heading" className="nx-s-title">Engagement Models for Next.js Development</h2>
              <p className="nx-s-desc" style={{ maxWidth: 680 }}>Hire a dedicated Next.js team for an ongoing product roadmap, engage on a fixed-price project for a defined scope, or take out a monthly retainer for ongoing feature work and maintenance — whichever model fits your project and budget.</p>
            </div>
            <div className="nx-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`nx-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' nx-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="nx-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="nx-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div>
                  <div className="nx-eng-name">{m.name}</div>
                  <div className="nx-eng-headline">{m.headline}</div>
                  <div className="nx-eng-desc">{m.desc}</div>
                  <div className="nx-eng-list-label">Best for</div>
                  <ul className="nx-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                  <div className="nx-eng-process"><strong>Process:</strong> {m.process}<br /><span className="nx-eng-timeline">{m.timeline}</span></div>
                  <Link href="#contact" className="nx-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="nx-process-section" aria-labelledby="nx-proc-heading">
          <div className="nx-inner" style={{ maxWidth: 760 }}>
            <div className={`nx-s-reveal${visibleSections.has('proc') ? ' nx-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="nx-s-eyebrow">How We Deliver</span>
              <h2 id="nx-proc-heading" className="nx-s-title">Our Next.js Development Process</h2>
              <p className="nx-s-desc">From architecture planning and component system design through sprint-based App Router development, API and database integration, testing and performance benchmarking, and Vercel deployment — with working demos at every stage.</p>
            </div>
            <div className="nx-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`nx-pstep${visibleSections.has('proc') ? ' nx-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="nx-pstep-l">
                    <div className="nx-pstep-circle">{step.num}</div>
                    <div className="nx-pstep-connector" />
                  </div>
                  <div className="nx-pstep-r">
                    <div className="nx-pstep-title">{step.title}</div>
                    <p className="nx-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="nx-testi" aria-labelledby="nx-ts-heading">
          <div className="nx-inner">
            <div className={`nx-center-head nx-s-reveal${visibleSections.has('ts') ? ' nx-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="nx-s-eyebrow">Client Results</span>
              <h2 id="nx-ts-heading" className="nx-s-title">What Our Next.js Clients Say</h2>
              <p className="nx-s-desc">Trusted by SaaS companies, DTC brands, B2B platforms, and digital agencies across the US, UK, and Australia who need serious Next.js engineering capability without the cost of a local team.</p>
            </div>
            <div className="nx-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`nx-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' nx-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review">
                  <div className="nx-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="nx-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="nx-tauthor">
                    <div className="nx-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div><div className="nx-tname" itemProp="author">{t.name}</div><div className="nx-trole">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="nx-why-section" aria-labelledby="nx-wy-heading">
          <div className="nx-inner">
            <div className={`nx-s-reveal${visibleSections.has('wy') ? ' nx-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="nx-s-eyebrow">Why 1Solutions</span>
              <h2 id="nx-wy-heading" className="nx-s-title">Why Choose Us for Next.js Development</h2>
              <p className="nx-s-desc" style={{ maxWidth: 680 }}>15+ years of React and Next.js experience, App Router native development, TypeScript strict mode on every project, green Core Web Vitals as a delivery standard, full-stack Next.js capability, and transparent delivery from an offshore team that works like an in-house one.</p>
            </div>
            <div className="nx-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`nx-wcard${visibleWhyCards.includes(i) ? ' nx-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="nx-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="nx-contact" aria-labelledby="nx-contact-heading">
          <div className="nx-contact-grid">
            <div>
              <h2 id="nx-contact-heading" className="nx-ctitle">Start Your Next.js Project</h2>
              <p className="nx-cdesc">Tell us about your Next.js project and we will schedule a free technical discovery call. Whether you need a headless marketing site, a SaaS MVP, a headless eCommerce storefront, a React SPA migration, or a dedicated Next.js development team — our engineers will scope your project and give you a transparent quote within 24 hours.</p>
              <div className="nx-cbenefits">
                {[['✓','Free technical discovery call with a senior Next.js architect'],['✓','Architecture recommendation — App Router, rendering strategy, database, deployment'],['✓','Next.js 14/15 App Router native — React Server Components and Server Actions'],['✓','TypeScript strict mode and Core Web Vitals green as standard on every project'],['✓','Response within 24 business hours from our Next.js engineering team']].map(([icon, text]) => (
                  <div className="nx-cbenefit" key={text}><span className="nx-cbenefit-icon">{icon}</span><p>{text}</p></div>
                ))}
              </div>
            </div>
            <div className="nx-form-box">
              <h3>Tell Us About Your Next.js Project</h3>
              <form className="nx-form" onSubmit={e => e.preventDefault()}>
                <div className="nx-frow">
                  <div className="nx-fg"><label htmlFor="nx-name">Full Name *</label><input id="nx-name" type="text" placeholder="Your name" required /></div>
                  <div className="nx-fg"><label htmlFor="nx-email">Work Email *</label><input id="nx-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="nx-frow">
                  <div className="nx-fg"><label htmlFor="nx-company">Company / Website URL</label><input id="nx-company" type="text" placeholder="Company or existing URL" /></div>
                  <div className="nx-fg"><label htmlFor="nx-phone">Phone / WhatsApp</label><input id="nx-phone" type="tel" placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="nx-fg full">
                  <label htmlFor="nx-type">Project Type *</label>
                  <select id="nx-type" required>
                    <option value="">Select project type...</option>
                    <option>Custom Next.js Web Application</option>
                    <option>Next.js SaaS Platform (with auth &amp; billing)</option>
                    <option>Headless eCommerce (Shopify / WooCommerce)</option>
                    <option>Headless CMS Website (Contentful / Sanity / Strapi)</option>
                    <option>Next.js Enterprise Portal</option>
                    <option>React SPA / Gatsby Migration to Next.js</option>
                    <option>Next.js Performance &amp; Core Web Vitals Optimisation</option>
                    <option>Next.js Architecture Review / Consulting</option>
                    <option>Dedicated Next.js Team (ongoing)</option>
                    <option>Next.js Maintenance Retainer</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="nx-fg full">
                  <label htmlFor="nx-stack">Current Stack / Framework (if migrating)</label>
                  <select id="nx-stack">
                    <option value="">New project — no existing stack</option>
                    <option>Create React App (CRA)</option>
                    <option>Vite React SPA</option>
                    <option>Gatsby</option>
                    <option>Next.js Pages Router (migrating to App Router)</option>
                    <option>Angular</option>
                    <option>Vue / Nuxt</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="nx-fg full">
                  <label htmlFor="nx-msg">Project Brief *</label>
                  <textarea id="nx-msg" rows={4} placeholder="Describe your Next.js project — what it does, who uses it, key features required, integrations (CMS, auth, payments, ERP), expected traffic, and your timeline..." required />
                </div>
                <div className="nx-consent">
                  <input id="nx-consent" type="checkbox" required />
                  <label htmlFor="nx-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. We treat all project details confidentially.</label>
                </div>
                <button type="submit" className="nx-submit">Get Free Next.js Consultation →</button>
              </form>
            </div>
          </div>
        </section>

        <section className="nx-faq" aria-labelledby="nx-faq-heading">
          <div className="nx-inner" style={{ maxWidth: 860 }}>
            <span className="nx-s-eyebrow">FAQ</span>
            <h2 id="nx-faq-heading">Next.js Development — Frequently Asked Questions</h2>
            <p className="nx-faq-sub">Everything you need to know about Next.js development with 1Solutions — why Next.js, App Router vs Pages Router, full-stack usage, databases, SEO, timelines, migrations, and deployment.</p>
            <div className="nx-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`nx-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="nx-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="nx-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="nx-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="nx-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="nx-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="nx-related">
          <div className="nx-related-inner">
            <span className="nx-s-eyebrow">Explore More</span>
            <h2>Related JavaScript & Web Development Services</h2>
            <p className="nx-related-sub">We also build React, Node.js, and full-stack JavaScript applications for businesses worldwide.</p>
            <hr />
            <div className="nx-rtags">
              {[['/react-js-development-company/','React.js Development','nx-rtag-blue'],['/node-js-development-company/','Node.js Development','nx-rtag-green'],['/javascript-development-company/','JavaScript Development','nx-rtag-amber'],['/hire-shopify-developer/','Hire Shopify Developer (Hydrogen)','nx-rtag-green'],['/website-design-and-development/','Website Design & Development','nx-rtag-teal'],['/ecommerce-website-development-services/','eCommerce Development','nx-rtag-amber'],['/cms-development-company/','Headless CMS Development','nx-rtag-violet'],['/website-support-maintenance-services/','Website Maintenance','nx-rtag-teal'],['/seo-services/','SEO Services','nx-rtag-rose'],['/php-development-company/','PHP Development','nx-rtag-violet']].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`nx-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
