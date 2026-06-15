'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Hire JavaScript Developer', item: 'https://www.1solutions.biz/hire-javascript-developer/' }] },
    { '@type': 'Service', name: 'Hire JavaScript Developer', url: 'https://www.1solutions.biz/hire-javascript-developer/', description: 'Hire expert JavaScript developers from 1Solutions — full-stack JS engineers with deep React, Node.js, Vue.js, TypeScript, and Next.js expertise. Dedicated, part-time, or hourly engagement. 15+ years of JavaScript development experience.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz', logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' }, foundingDate: '2008', areaServed: ['US', 'GB', 'AU', 'CA', 'IN'] }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '82', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What can I expect from a dedicated JavaScript developer from 1Solutions?', acceptedAnswer: { '@type': 'Answer', text: 'A dedicated JavaScript developer from 1Solutions functions as a full member of your engineering team — attending daily standups, committing directly to your repositories, joining sprint planning, and owning features end-to-end. They are pre-vetted across JavaScript fundamentals (closures, event loop, async/await, prototypal inheritance), modern frontend (React/Vue/Angular), backend (Node.js, Express, NestJS), TypeScript, REST and GraphQL API design, and testing (Jest, Vitest, Playwright). You get a developer who can work across the full JS stack — not a narrow specialist who needs hand-holding outside their exact sub-skill.' } },
      { '@type': 'Question', name: 'How quickly can I hire a JavaScript developer?', acceptedAnswer: { '@type': 'Answer', text: "You can have a shortlisted JavaScript developer within 24 business hours of sharing your requirements. Our pre-vetted bench of JavaScript engineers means we don't start searching after you submit — we match from an active pool of screened candidates. From requirements received to developer starting engagement: typically 3–5 business days for a dedicated hire, 1–2 days for an hourly engagement." } },
      { '@type': 'Question', name: 'Do your JavaScript developers work in my time zone?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We have JavaScript developers available across IST, GMT, and overlapping hours for US EST/PST and AU AEST time zones. When you share your time zone requirement, we match developers with compatible working hours — ensuring real-time collaboration during your working day rather than asynchronous communication only.' } },
      { '@type': 'Question', name: 'Can a JavaScript developer handle both frontend and backend?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — our JavaScript developers are full-stack JS engineers. They are proficient in React, Vue.js, or Angular on the frontend, and Node.js (Express or NestJS) on the backend. They can design and implement REST and GraphQL APIs, work with relational and NoSQL databases (PostgreSQL, MongoDB, Redis), and handle deployment on AWS, GCP, Azure, or Vercel. If you need a narrow frontend-only or Node.js-only specialist, we can match that too.' } },
      { '@type': 'Question', name: 'What is the difference between hiring a full-time vs hourly JavaScript developer?', acceptedAnswer: { '@type': 'Answer', text: 'A full-time dedicated JavaScript developer (160 hours/month) gives you a consistent engineer who builds deep context about your codebase, architecture, and business domain — best for ongoing product development. A part-time engagement (80 hours/month) suits products in maintenance or gradual feature development phases. Hourly/project-based engagement suits well-defined, discrete tasks (building a specific feature, debugging, code review, TypeScript migration) where you do not need ongoing dedicated capacity. We recommend starting with the engagement model that fits your current pipeline, with the option to adjust as your needs evolve.' } },
      { '@type': 'Question', name: 'Are your JavaScript developers proficient in TypeScript?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — TypeScript is a first-class skill for our JavaScript developers, not an add-on. They work with strict TypeScript configuration, utility types (Partial, Required, Pick, Omit, ReturnType, infer), discriminated unions, generics, and module augmentation. They can migrate existing JavaScript codebases to TypeScript incrementally and configure tsconfig.json for monorepo setups (Turborepo, Nx).' } },
      { '@type': 'Question', name: 'How do you vet your JavaScript developers?', acceptedAnswer: { '@type': 'Answer', text: "Our JavaScript developer screening covers: (1) JavaScript fundamentals — event loop, closures, prototypal inheritance, async/await vs Promises, memory model; (2) React or Vue/Angular proficiency — component lifecycle, state management (Redux/Zustand/Pinia), hooks, rendering optimisation; (3) Node.js — streams, middleware, authentication (JWT, OAuth), database integration; (4) TypeScript — generic types, strict mode, utility types; (5) testing — Jest/Vitest unit tests, Playwright E2E tests; (6) code quality — live coding exercise reviewed for architecture, readability, and edge case handling. Only developers who pass all stages join our bench." } },
      { '@type': 'Question', name: 'What frameworks do your JavaScript developers specialise in?', acceptedAnswer: { '@type': 'Answer', text: 'Frontend: React (with Next.js, Remix, or Vite), Vue.js (3.x with Composition API and Pinia), Angular (15+), Svelte/SvelteKit. Backend: Node.js with Express, NestJS, Fastify, or Hono; Bun runtime. Full-stack: Next.js App Router with Server Components and Server Actions, Nuxt 3, SvelteKit. Build tooling: Vite, Turbopack, esbuild, Rollup. Testing: Jest, Vitest, Playwright, Testing Library, Storybook. We match developers to your specific framework stack rather than sending generalists.' } },
    ] },
  ],
};

const SKILLS = [
  { n: '01', title: 'React & Next.js Application Development', desc: 'Production React applications — functional components, hooks (useState, useEffect, useCallback, useMemo, useRef, custom hooks), React Context, state management with Zustand or Redux Toolkit, React Query/TanStack Query for server state, Next.js App Router with Server Components and Server Actions, streaming SSR, and incremental static regeneration. Performance optimisation: code splitting, lazy loading, memoisation, bundle analysis.' },
  { n: '02', title: 'Node.js Backend & REST/GraphQL APIs', desc: 'Scalable Node.js backends — Express.js or NestJS (with dependency injection, modules, guards, interceptors, decorators), REST API design (versioning, pagination, filtering, OpenAPI spec), GraphQL (Apollo Server or Pothos with Prisma), JWT and OAuth 2.0 authentication, rate limiting, caching with Redis, WebSocket real-time layers with Socket.io or uWebSockets.', feat: true },
  { n: '03', title: 'Vue.js & Nuxt 3 Development', desc: 'Vue 3 with Composition API — composables, Pinia state management, Vue Router 4, Teleport, Suspense, script setup syntax. Nuxt 3 with auto-imports, server routes (Nitro engine), hybrid rendering (SSR/SSG/SPA), Nuxt Content for content-driven sites, and Nuxt UI or PrimeVue component libraries. Performance-tuned for Core Web Vitals.' },
  { n: '04', title: 'TypeScript Migration & Architecture', desc: 'TypeScript adoption and migration — incremental JS-to-TS migration strategy, strict mode configuration, utility types and generics, discriminated unions for type-safe state machines, module augmentation, declaration merging, and monorepo TypeScript configuration with Turborepo or Nx. Code review and architecture guidance for TypeScript codebases.' },
  { n: '05', title: 'Angular Enterprise Development', desc: 'Angular (v15+) — standalone components, signals-based reactivity, RxJS (operators: switchMap, concatMap, mergeMap, exhaustMap, BehaviorSubject, combineLatest), NgRx for complex state, Angular Material or PrimeNG UI, lazy-loaded feature modules, guards and resolvers, interceptors for auth/logging, and performance optimisation with OnPush change detection.' },
  { n: '06', title: 'Full-Stack JavaScript (MERN / MEAN / T3)', desc: 'End-to-end JavaScript product development — MERN (MongoDB, Express, React, Node), MEAN (with Angular), T3 Stack (Next.js, TypeScript, tRPC, Prisma, Tailwind), or custom full-stack architecture. Database integration: PostgreSQL (with Prisma or Drizzle ORM), MongoDB (Mongoose or native driver), Redis, and Supabase.' },
  { n: '07', title: 'JavaScript Performance & Core Web Vitals', desc: 'Performance engineering for JavaScript applications — Lighthouse auditing, Core Web Vitals optimisation (LCP, CLS, INP/FID, TTFB), bundle size reduction (tree shaking, dynamic imports, Rollup/Vite build analysis), image optimisation (next/image, Sharp), font optimisation, HTTP/2 and CDN configuration, and server-side caching strategies.' },
  { n: '08', title: 'Testing, CI/CD & JavaScript Quality', desc: 'JavaScript quality engineering — Jest or Vitest for unit and integration tests, React Testing Library for component tests, Playwright for E2E tests, MSW (Mock Service Worker) for API mocking, Storybook for component documentation, Husky pre-commit hooks with ESLint and Prettier, GitHub Actions CI/CD pipeline with test gating and automated deployment.' },
  { n: '09', title: 'Real-Time & Serverless JavaScript', desc: 'Real-time JavaScript features — WebSocket servers with Socket.io, Server-Sent Events for live dashboards, WebRTC peer-to-peer communication. Serverless: AWS Lambda with Node.js runtime, Vercel Edge Functions, Cloudflare Workers, AWS API Gateway, event-driven architecture with SQS and SNS. Edge computing with Deno Deploy or Fastly Compute.' },
  { n: '10', title: 'JavaScript Code Review, Audits & Mentorship', desc: 'Independent JavaScript codebase audit — security review (XSS, injection, dependency vulnerabilities), architecture review, performance profiling, technical debt assessment, and refactoring roadmap. Senior JS developer embedded with your team for code review, pair programming, architectural decision-making, and upskilling junior JavaScript engineers.' },
];

const TECH_STACK = [
  { group: 'Frontend Frameworks', color: '#ca8a04', items: ['React 18/19', 'Next.js (App Router)', 'Vue 3 / Nuxt 3', 'Angular 15+', 'Svelte / SvelteKit', 'Remix'] },
  { group: 'State Management', color: '#b45309', items: ['Zustand', 'Redux Toolkit', 'TanStack Query', 'Pinia', 'Jotai', 'SWR'] },
  { group: 'Backend / Runtime', color: '#0369a1', items: ['Node.js', 'NestJS', 'Express', 'Fastify', 'Hono', 'Bun'] },
  { group: 'Language & Type Safety', color: '#6d28d9', items: ['TypeScript (strict)', 'JavaScript (ES2024)', 'JSDoc', 'Zod', 'tRPC', 'OpenAPI / Swagger'] },
  { group: 'Database & ORM', color: '#0f766e', items: ['PostgreSQL / Prisma', 'MongoDB / Mongoose', 'Redis', 'Supabase', 'Drizzle ORM', 'PlanetScale'] },
  { group: 'Testing', color: '#dc2626', items: ['Jest / Vitest', 'Playwright', 'React Testing Library', 'MSW', 'Storybook', 'Cypress'] },
  { group: 'Build & Tooling', color: '#059669', items: ['Vite', 'Turbopack', 'esbuild', 'Rollup', 'Webpack 5', 'Turborepo / Nx'] },
  { group: 'Cloud & Deployment', color: '#0284c7', items: ['Vercel', 'AWS Lambda / EC2', 'Cloudflare Workers', 'Docker / Kubernetes', 'GitHub Actions', 'Netlify'] },
];

const ENGAGEMENT_MODELS = [
  { id: 'full', name: 'Full-Time Dedicated Developer', badge: 'Most Popular', badgeColor: '#D97706', feat: true, icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z', headline: '160 hrs/month — one developer, fully yours.', desc: 'A dedicated JavaScript developer working exclusively on your product for 160 hours per month. They attend your daily standups, commit to your repos, join sprint planning, and build deep context about your architecture and business domain. Best for ongoing product development with continuous delivery needs.', bestFor: ['SaaS products requiring continuous feature development', 'Engineering teams extending capacity with a JS specialist', 'Startups building their core JavaScript product', 'Agencies delivering multiple client JS projects concurrently'], process: 'Requirements → shortlist in 24 hrs → interview → start in 3–5 days', timeline: 'Available within 3–5 business days' },
  { id: 'part', name: 'Part-Time Developer (80 hrs/month)', badge: 'Flexible', badgeColor: '#ca8a04', icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z', headline: '80 hrs/month — consistent capacity, lower overhead.', desc: 'A part-time JavaScript developer for products that do not require full-time engineering attention. Ideal for maintenance-phase products, steady feature additions, bug fix backlogs, or teams that need a JavaScript specialist a few days per week alongside internal engineers.', bestFor: ['Products in maintenance or gradual growth phase', 'Teams needing a JS specialist 2–3 days per week', 'Bug backlog clearance alongside internal engineers', 'Steady feature additions to existing JS products'], process: 'Requirements → shortlist → interview → start within 2–3 days', timeline: 'Available within 2–3 business days' },
  { id: 'hourly', name: 'Hourly / Project-Based', badge: 'Task-focused', badgeColor: '#0284c7', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z', headline: 'Pay per hour — ideal for defined tasks.', desc: 'Hourly or project-based engagement for well-scoped JavaScript work — a specific feature build, performance audit, TypeScript migration, code review, debugging session, or architecture consultation. No minimum commitment. Start immediately.', bestFor: ['Specific feature development (fixed scope)', 'JavaScript performance audit and optimisation', 'TypeScript migration of an existing JS codebase', 'Code review, refactoring, or architecture consultation'], process: 'Scope discussion → estimate → start within 24 hrs', timeline: 'Can start within 24 business hours' },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Share Your JavaScript Requirements', desc: 'Tell us what you need — the JavaScript frameworks in your stack, the nature of the work (feature development, bug fixing, architecture, migration), your team size, time zone requirements, and your start date. The more context you give, the better the developer match. A 15-minute call with our technical team helps us understand your stack depth and team dynamics.' },
  { num: '02', title: 'Shortlisted Developers Within 24 Hours', desc: 'Within 24 business hours, we send you a shortlist of 2–3 pre-vetted JavaScript developers who match your requirements. Each profile includes their specific JavaScript expertise (frameworks, seniority level, open-source contributions or portfolio), communication style, time zone availability, and sample code or past project descriptions. No generic CVs — these are developers who have already cleared our technical vetting.' },
  { num: '03', title: 'Technical Interview — Your Questions, Your Bar', desc: 'You interview the shortlisted developers directly. We encourage you to test them on your specific stack — have them solve a problem relevant to your codebase, ask about edge cases they have encountered, or do a live code review of a snippet from your project. We do not coach developers for your interview. What you see is who they are.' },
  { num: '04', title: 'Optional Paid Trial (1 Week)', desc: 'Before committing to a longer engagement, you can run a one-week paid trial with your chosen JavaScript developer — a real task from your backlog. This lets you assess code quality, communication cadence, initiative, and how well they ramp up on your codebase before making an ongoing commitment.' },
  { num: '05', title: 'Engagement Kick-Off & Onboarding', desc: 'Once you select a developer, we handle the engagement formalities — NDA, IP assignment, working hours agreement, and communication norms. The developer joins your Slack/Teams, gets access to your repositories, and attends your first sprint planning or team standup. We provide an account manager as a single point of contact for any operational concerns.' },
  { num: '06', title: 'Ongoing Quality Reviews & Easy Replacement', desc: 'We conduct monthly check-ins to ensure delivery quality and team satisfaction — not just yours, but the developer\'s too. If at any point the engagement is not working (performance, communication, changing requirements), we replace the developer within 5 business days, no exit penalty. Your engagement continues without interruption.' },
];

const TESTIMONIALS = [
  { text: "We hired a dedicated JavaScript developer from 1Solutions to extend our React/Node.js team. He was fully up to speed on our codebase within 3 days and shipping features in week one. Code quality is excellent — he introduced patterns (custom hooks, proper React Query usage, Zod validation) that our own team has since adopted. Highly recommend for React/Node fullstack work.", name: 'Oliver H.', role: 'CTO, B2B SaaS Platform (UK)', init: 'OH', bg: '#0F3460' },
  { text: "We needed a Vue 3 / Nuxt specialist for a client project with a tight 8-week deadline. 1Solutions shortlisted developers within a day, we interviewed two, and our hire started on day 3. She delivered the entire Nuxt 3 frontend — including complex Pinia state and server-side rendering — on time, at quality. The client was happy, and we extended the engagement for phase 2.", name: 'Priya M.', role: 'Delivery Manager, Digital Agency (AU)', init: 'PM', bg: '#1a1a2e', feat: true },
  { text: "Brought in a JS developer from 1Solutions specifically for a TypeScript migration of our 80K-line React codebase. He produced a clear migration plan, implemented it incrementally without disrupting our normal sprint delivery, and finished in 10 weeks. No regressions, strict mode enabled throughout. Exactly what we needed.", name: 'James R.', role: 'Engineering Manager, FinTech (US)', init: 'JR', bg: '#1e3a5f' },
];

const WHY_CARDS = [
  { title: '15+ Years of JavaScript Expertise', desc: 'We have been writing JavaScript since before Node.js, React, or Angular existed. Our developers have lived through the JS ecosystem\'s evolution — from jQuery and Backbone through Angular 1, the React revolution, and the modern full-stack JS era. That history means they understand the why behind architecture decisions, not just the how.' },
  { title: 'Full-Stack JS, Not Just Frontend', desc: 'Every JavaScript developer we hire can work across the full stack — React or Vue on the frontend, Node.js on the backend, and PostgreSQL or MongoDB as the data layer. We do not send you frontend-only developers when your role requires full-stack contribution.' },
  { title: 'TypeScript-First Mindset', desc: 'TypeScript is not an optional skill for our JavaScript developers — it is a baseline requirement. They work with strict mode, proper generics, utility types, and Zod runtime validation. Your codebase will not accumulate any escape hatches.' },
  { title: 'Communication-First Hiring', desc: 'Technical skill without communication creates silos. We screen for English communication fluency, async documentation habits, and the ability to ask clarifying questions rather than make assumptions. Our developers participate in your standups as contributing team members, not silent contractors who only push commits.' },
  { title: 'Transparent Matching, No Bait-and-Switch', desc: 'The developer you interview is the developer you get. We do not present a senior developer in the interview and assign a junior for the engagement. The profile, the interview, and the working developer are the same person.' },
  { title: 'Rapid Replacement Guarantee', desc: 'If a developer is not meeting expectations — for any reason — we replace them within 5 business days at no additional cost. You are never locked in to a poor match. This guarantee applies for the entire duration of your engagement.' },
  { title: 'IP Ownership & NDAs From Day One', desc: 'All code written by 1Solutions JavaScript developers is your intellectual property. Every developer signs an NDA and IP assignment agreement before starting. Source code, documentation, and designs produced during the engagement belong entirely to you.' },
  { title: 'No Vendor Lock-In', desc: 'Our developers work in your tools — your Git repositories, your project management, your Slack or Teams, your CI/CD pipelines. When an engagement ends, you take everything with you. No proprietary platforms, no data held hostage.' },
];

const FAQS = [
  { q: 'What can I expect from a dedicated JavaScript developer from 1Solutions?', a: "A dedicated JavaScript developer from 1Solutions functions as a full member of your engineering team — attending daily standups, committing directly to your repositories, joining sprint planning, and owning features end-to-end. They are pre-vetted across JavaScript fundamentals, modern frontend frameworks, Node.js backend, TypeScript, and testing. You get a developer who works across the full JS stack, not a narrow specialist." },
  { q: 'How quickly can I hire a JavaScript developer?', a: "You can have a shortlisted JavaScript developer within 24 business hours of sharing your requirements. From requirements received to developer starting engagement: typically 3–5 business days for a dedicated hire, 1–2 days for an hourly engagement." },
  { q: 'Do your JavaScript developers work in my time zone?', a: "Yes. We have JavaScript developers available across IST, GMT, and overlapping hours for US EST/PST and AU AEST time zones. We match developers with compatible working hours for real-time collaboration." },
  { q: 'Can a JavaScript developer handle both frontend and backend?', a: "Yes — our JavaScript developers are full-stack JS engineers. They are proficient in React, Vue.js, or Angular on the frontend, and Node.js (Express or NestJS) on the backend. They design REST and GraphQL APIs, work with relational and NoSQL databases, and handle cloud deployment." },
  { q: "What is the difference between full-time and hourly JavaScript hiring?", a: "A full-time dedicated developer (160 hours/month) builds deep context about your codebase — best for ongoing product development. Part-time (80 hours/month) suits maintenance or gradual development phases. Hourly suits well-scoped, discrete tasks like a specific feature, performance audit, or TypeScript migration." },
  { q: 'Are your JavaScript developers proficient in TypeScript?', a: "Yes — TypeScript is a baseline skill for our JavaScript developers, not an add-on. They work with strict configuration, utility types, discriminated unions, generics, and can migrate existing JS codebases to TypeScript incrementally." },
  { q: 'How do you vet your JavaScript developers?', a: "Our screening covers: JavaScript fundamentals (event loop, closures, async/await), React or Vue/Angular proficiency, Node.js capabilities, TypeScript in strict mode, testing with Jest/Playwright, and a live coding exercise reviewed for architecture and edge case handling." },
  { q: 'What frameworks do your JavaScript developers specialise in?', a: "Frontend: React/Next.js, Vue 3/Nuxt 3, Angular 15+, Svelte/SvelteKit, Remix. Backend: Node.js with NestJS, Express, or Fastify. Full-stack: Next.js App Router, T3 Stack (Next.js/TypeScript/tRPC/Prisma). Testing: Jest, Vitest, Playwright, Testing Library." },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (!num) return;
    let t0 = null;
    const step = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * num)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  return (
    <div className="hj-stat-col">
      <div className="hj-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="hj-stat-label">{label}</div>
    </div>
  );
}

export default function HireJavaScriptDeveloper() {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleSkillCards, setVisibleSkillCards] = useState([]);
  const [visibleEngCards, setVisibleEngCards] = useState([]);
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleStackCards, setVisibleStackCards] = useState([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const skillGridRef = useRef(null);
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
    const pairs = [[skillGridRef, SKILLS.length, setVisibleSkillCards],[engGridRef, 3, setVisibleEngCards],[whyGridRef, WHY_CARDS.length, setVisibleWhyCards],[testiGridRef, 3, setVisibleTestiCards],[stackGridRef, TECH_STACK.length, setVisibleStackCards]];
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

  const visibleSkills = showAllSkills ? SKILLS : SKILLS.slice(0, 6);

  return (
    <>
      <Head>
        <title>Hire JavaScript Developer | Expert JS Engineers | 1Solutions</title>
        <meta name="description" content="Hire expert JavaScript developers from 1Solutions — full-stack JS engineers with React, Node.js, Vue.js, TypeScript, Next.js, and Angular expertise. Dedicated, part-time, or hourly. Start in 24–72 hours." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-javascript-developer/" />
        <meta property="og:title" content="Hire JavaScript Developer | React, Node.js, TypeScript | 1Solutions" />
        <meta property="og:description" content="Hire vetted JavaScript developers — React, Node.js, Vue.js, TypeScript, Next.js. Dedicated, part-time, or hourly. 15+ years experience. Start in 3–5 days." />
        <meta property="og:url" content="https://www.1solutions.biz/hire-javascript-developer/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .hj-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#fefce8 0%,#fef9c3 20%,#fff7ed 50%,#fef3c7 75%,#f0fdf4 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .hj-page *,.hj-page *::before,.hj-page *::after{box-sizing:border-box}
          .hj-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .hj-orb-1{width:860px;height:860px;background:radial-gradient(circle,rgba(202,138,4,.22) 0%,rgba(245,158,11,.09) 40%,transparent 70%);top:-260px;right:-240px}
          .hj-orb-2{width:760px;height:760px;background:radial-gradient(circle,rgba(3,105,161,.18) 0%,rgba(6,182,212,.08) 40%,transparent 70%);bottom:0;left:-220px}
          .hj-orb-3{width:520px;height:520px;background:radial-gradient(circle,rgba(5,150,105,.12) 0%,transparent 70%);top:44%;left:-100px;transform:translateY(-50%)}
          .hj-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .hj-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .hj-breadcrumb li{display:flex;align-items:center;gap:6px}
          .hj-breadcrumb li::after{content:'/';opacity:.45}
          .hj-breadcrumb li:last-child::after{display:none}
          .hj-breadcrumb a{color:#0F3460;text-decoration:none}
          .hj-breadcrumb a:hover{text-decoration:underline}
          .hj-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .hj-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .hj-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#ca8a04 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .hj-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .hj-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .hj-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .hj-badge-dot{width:7px;height:7px;border-radius:50%;background:#ca8a04;flex-shrink:0}
          .hj-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hj-btn-primary{display:inline-block;padding:14px 36px;background:#ca8a04;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(202,138,4,.28)}
          .hj-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .hj-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .hj-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(202,138,4,.5);transform:translateY(-2px)}
          .hj-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .hj-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .hj-stat-col:last-child{border-right:none}
          .hj-stat-val{font-size:28px;font-weight:900;color:#ca8a04;letter-spacing:-.5px;line-height:1}
          .hj-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .hj-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .hj-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .hj-logos-wrap{width:100%;overflow:hidden}
          .hj-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:hj-marquee 28s linear infinite}
          .hj-logos-track:hover{animation-play-state:paused}
          @keyframes hj-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .hj-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .hj-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .hj-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .hj-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .hj-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .hj-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .hj-s-reveal.hj-revealed{opacity:1;transform:translateY(0)}
          .hj-inner{max-width:1300px;margin:0 auto}
          .hj-skill-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .hj-skill-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .hj-skill-card{background:linear-gradient(135deg,rgba(254,252,232,.50) 0%,rgba(255,255,255,.85) 55%,rgba(255,247,237,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .hj-skill-card.hj-cv{opacity:1;transform:translateY(0)}
          .hj-skill-card.hj-cv:hover{transform:translateY(-6px);border-color:rgba(202,138,4,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .hj-skill-card.feat{border-color:rgba(202,138,4,.20)}
          .hj-skill-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .hj-skill-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .hj-skill-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .hj-skill-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#ca8a04,#fbbf24);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .hj-skill-card.hj-cv:hover::before{transform:scaleY(1)}
          .hj-skill-more{text-align:center;margin-top:22px}
          .hj-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .hj-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .hj-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .hj-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .hj-stack-card{background:linear-gradient(135deg,rgba(254,252,232,.50) 0%,rgba(255,255,255,.85) 55%,rgba(255,247,237,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .hj-stack-card.hj-sv{opacity:1;transform:translateY(0)}
          .hj-stack-card.hj-sv:hover{border-color:rgba(202,138,4,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .hj-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .hj-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .hj-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .hj-eng-section{padding:80px 40px;position:relative;z-index:1}
          .hj-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .hj-eng-card{background:linear-gradient(135deg,rgba(254,252,232,.50) 0%,rgba(255,255,255,.85) 55%,rgba(255,247,237,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .hj-eng-card.hj-ev{opacity:1;transform:translateY(0)}
          .hj-eng-card.hj-ev:hover{border-color:rgba(202,138,4,.25);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .hj-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(254,252,232,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .hj-eng-card.feat.hj-ev{transform:translateY(-8px)}
          .hj-eng-card.feat.hj-ev:hover{transform:translateY(-12px)}
          .hj-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .hj-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
          .hj-eng-card.hj-ev:hover .hj-eng-icon{background:rgba(202,138,4,.10)}
          .hj-eng-card.feat .hj-eng-icon{background:rgba(217,119,6,.10)}
          .hj-eng-icon svg{fill:#0F3460}
          .hj-eng-card.feat .hj-eng-icon svg{fill:#D97706}
          .hj-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .hj-eng-headline{font-size:13px;font-weight:600;color:#ca8a04;margin-bottom:12px}
          .hj-eng-card.feat .hj-eng-headline{color:#D97706}
          .hj-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .hj-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .hj-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .hj-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .hj-eng-list li::before{content:'✓';font-weight:800;color:#ca8a04;flex-shrink:0;margin-top:1px}
          .hj-eng-card.feat .hj-eng-list li::before{color:#D97706}
          .hj-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .hj-eng-process strong{color:#0F3460}
          .hj-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .hj-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .hj-eng-cta:hover{background:#0F3460;color:#fff}
          .hj-eng-card.feat .hj-eng-cta{background:#ca8a04;color:#fff;border-color:#ca8a04}
          .hj-eng-card.feat .hj-eng-cta:hover{background:#0F3460;border-color:#0F3460}
          .hj-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .hj-psteps{display:flex;flex-direction:column;margin-top:52px}
          .hj-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .hj-pstep.hj-pv{opacity:1;transform:translateY(0)}
          .hj-pstep-l{display:flex;flex-direction:column;align-items:center}
          .hj-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0}
          .hj-pstep.hj-pv:hover .hj-pstep-circle{background:rgba(202,138,4,.10);border-color:#ca8a04;color:#ca8a04}
          .hj-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .hj-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .hj-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .hj-pstep:last-child .hj-pstep-connector{display:none}
          .hj-pstep-r{padding:4px 0 38px}
          .hj-pstep:last-child .hj-pstep-r{padding-bottom:0}
          .hj-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .hj-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .hj-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .hj-center-head{text-align:center;margin-bottom:48px}
          .hj-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .hj-tcard{background:linear-gradient(135deg,rgba(254,252,232,.50) 0%,rgba(255,255,255,.85) 55%,rgba(255,247,237,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1)}
          .hj-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(254,252,232,.42) 100%);border-color:rgba(217,119,6,.22)}
          .hj-tcard.hj-tv{opacity:1;transform:translateY(0)}
          .hj-tcard.hj-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .hj-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .hj-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .hj-tauthor{display:flex;align-items:center;gap:12px}
          .hj-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .hj-tname{font-size:14px;font-weight:700;color:#0F3460}
          .hj-trole{font-size:12px;color:#6b7280}
          .hj-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .hj-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .hj-wcard{background:linear-gradient(135deg,rgba(254,252,232,.50) 0%,rgba(255,255,255,.85) 55%,rgba(255,247,237,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .hj-wcard.hj-wv{opacity:1;transform:translateY(0) scale(1)}
          .hj-wcard.hj-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(202,138,4,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .hj-wcard-dot{width:10px;height:10px;border-radius:50%;background:#ca8a04;margin-bottom:12px}
          .hj-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .hj-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .hj-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(254,252,232,.55) 0%,rgba(255,255,255,.60) 40%,rgba(255,247,237,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .hj-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .hj-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#ca8a04 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .hj-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .hj-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .hj-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .hj-cbenefit-icon{flex-shrink:0;color:#ca8a04;font-weight:800;font-size:16px;margin-top:1px}
          .hj-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .hj-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(254,252,232,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .hj-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .hj-form{display:flex;flex-direction:column;gap:13px}
          .hj-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .hj-fg{display:flex;flex-direction:column;gap:5px}
          .hj-fg.full{grid-column:1/-1}
          .hj-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .hj-fg input,.hj-fg textarea,.hj-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .hj-fg input:focus,.hj-fg textarea:focus,.hj-fg select:focus{outline:none;border-color:#ca8a04;box-shadow:0 0 0 3px rgba(202,138,4,.10)}
          .hj-consent{display:flex;gap:8px;align-items:flex-start}
          .hj-consent input{margin-top:3px;width:15px;height:15px}
          .hj-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .hj-consent a{color:#0F3460}
          .hj-submit{width:100%;padding:14px;background:#ca8a04;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(202,138,4,.26)}
          .hj-submit:hover{background:#0F3460;transform:translateY(-2px)}
          .hj-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .hj-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .hj-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .hj-faq-list{display:flex;flex-direction:column;gap:10px}
          .hj-fitem{background:linear-gradient(135deg,rgba(254,252,232,.50) 0%,rgba(255,255,255,.85) 55%,rgba(255,247,237,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .hj-fitem.open{border-color:rgba(202,138,4,.30)}
          .hj-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#ca8a04,#fbbf24);border-radius:3px 3px 0 0}
          .hj-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .hj-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px}
          .hj-fitem.open .hj-fq-badge{background:#ca8a04;color:#fff}
          .hj-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .hj-fitem.open .hj-fq span{color:#92400e}
          .hj-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .hj-fitem.open .hj-fchev{transform:rotate(180deg);color:#ca8a04}
          .hj-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .hj-fitem.open .hj-fanswer-wrap{max-height:500px}
          .hj-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .hj-related{padding:80px 40px;background:rgba(254,252,232,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .hj-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .hj-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .hj-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .hj-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .hj-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .hj-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .hj-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .hj-rtag-amber{background:rgba(202,138,4,.09);border-color:rgba(202,138,4,.28);color:#92400e}
          .hj-rtag-blue{background:rgba(3,105,161,.09);border-color:rgba(3,105,161,.28);color:#0369a1}
          .hj-rtag-green{background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d}
          .hj-rtag-violet{background:rgba(109,40,217,.09);border-color:rgba(109,40,217,.28);color:#4c1d95}
          .hj-rtag-rose{background:rgba(225,29,72,.09);border-color:rgba(225,29,72,.28);color:#9f1239}
          @media(max-width:1024px){.hj-hero h1,.hj-s-title,.hj-faq h2{font-size:36px}.hj-skill-grid{grid-template-columns:repeat(2,1fr)}.hj-stack-grid{grid-template-columns:repeat(2,1fr)}.hj-eng-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.hj-eng-card.feat{transform:none}.hj-eng-card.feat.hj-ev{transform:none}.hj-eng-card.feat.hj-ev:hover{transform:translateY(-4px)}.hj-why-grid{grid-template-columns:repeat(2,1fr)}.hj-tgrid{grid-template-columns:1fr}.hj-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.hj-breadcrumb{padding:12px 20px 0}.hj-hero{padding:28px 20px 20px}.hj-hero h1{font-size:26px;letter-spacing:-.3px}.hj-stats{grid-template-columns:1fr 1fr}.hj-stat-col:nth-child(2){border-right:none}.hj-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.hj-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.hj-logos{padding:16px 20px 28px}.hj-skill-section,.hj-stack-section,.hj-eng-section,.hj-process-section,.hj-testi,.hj-why-section,.hj-faq,.hj-related{padding:52px 20px}.hj-contact{padding:48px 20px}.hj-skill-grid,.hj-stack-grid,.hj-why-grid{grid-template-columns:1fr}.hj-frow{grid-template-columns:1fr}.hj-ctitle{font-size:28px}.hj-s-title{font-size:28px}}
        `}</style>
      </Head>
      <div className="hj-page">
        <div className="hj-orb hj-orb-1" /><div className="hj-orb hj-orb-2" /><div className="hj-orb hj-orb-3" />
        <nav className="hj-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">Hire JavaScript Developer</span><meta itemProp="position" content="2" /></li>
          </ol>
        </nav>
        <section className="hj-hero">
          <span className="hj-eyebrow">Hire JavaScript Developer</span>
          <h1>Hire Expert JavaScript Developers — React, Node.js & TypeScript</h1>
          <p className="hj-hero-desc">Hire pre-vetted full-stack JavaScript engineers with deep expertise in React, Next.js, Node.js, Vue.js, Angular, and TypeScript. Dedicated developers available for full-time, part-time, or hourly engagement. Start in 3–5 business days.</p>
          <div className="hj-trust-row">
            {['React & Next.js','Node.js / NestJS','Vue 3 / Nuxt 3','TypeScript Strict','Angular 15+'].map(b => (<div className="hj-badge" key={b}><span className="hj-badge-dot" />{b}</div>))}
          </div>
          <div className="hj-ctas">
            <Link href="#contact" className="hj-btn-primary">Hire a JavaScript Developer</Link>
            <Link href="#engagement" className="hj-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>
        <div className="hj-stats" ref={statsRef}>
          {[['200+','JS Projects Delivered'],['15+','Years JS Experience'],['48hr','Avg Developer Match'],['98%','Client Retention']].map(([v, l]) => (<StatItem key={l} label={l} val={v} started={statsStarted} />))}
        </div>
        <div className="hj-logos">
          <span className="hj-logos-label">Trusted by Engineering Teams Worldwide</span>
          <div className="hj-logos-wrap">
            <div className="hj-logos-track">
              {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="hj-clogo" />
              ))}
            </div>
          </div>
        </div>
        <section className="hj-skill-section" aria-labelledby="hj-skill-heading">
          <div className="hj-inner">
            <div className={`hj-s-reveal${visibleSections.has('sk') ? ' hj-revealed' : ''}`} ref={el => { sectionRefs.current['sk'] = el; }}>
              <span className="hj-s-eyebrow">What Our Developers Build</span>
              <h2 id="hj-skill-heading" className="hj-s-title">JavaScript Skills & Expertise</h2>
              <p className="hj-s-desc" style={{ maxWidth: 720 }}>From React and Next.js frontends through Node.js APIs, Vue 3, Angular, TypeScript migration, full-stack MERN/T3 products, performance engineering, real-time features, and code review — our JS developers cover the full spectrum.</p>
            </div>
            <div className="hj-skill-grid" ref={skillGridRef}>
              {visibleSkills.map((s, i) => (<div key={s.n} className={`hj-skill-card${s.feat ? ' feat' : ''}${visibleSkillCards.includes(i) ? ' hj-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="hj-skill-num">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}
            </div>
            {SKILLS.length > 6 && (<div className="hj-skill-more"><button className="hj-btn-more" onClick={() => setShowAllSkills(p => !p)}>{showAllSkills ? 'Show fewer ↑' : `Show all ${SKILLS.length} skill areas ↓`}</button></div>)}
          </div>
        </section>
        <section className="hj-stack-section" aria-labelledby="hj-stack-heading">
          <div className="hj-inner">
            <div className={`hj-s-reveal${visibleSections.has('stk') ? ' hj-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="hj-s-eyebrow">Technology Stack</span>
              <h2 id="hj-stack-heading" className="hj-s-title">JavaScript Tools & Technologies</h2>
              <p className="hj-s-desc" style={{ maxWidth: 680 }}>React 18/19, Next.js App Router, Vue 3, Nuxt 3, Angular 15+, NestJS, TypeScript, TanStack Query, Zustand, Prisma, PostgreSQL, Redis, Jest, Vitest, Playwright, Vite, Turbopack, Vercel, and AWS.</p>
            </div>
            <div className="hj-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (<div key={grp.group} className={`hj-stack-card${visibleStackCards.includes(i) ? ' hj-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}><div className="hj-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div><div className="hj-stack-pills">{grp.items.map(item => <span key={item} className="hj-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}</div></div>))}
            </div>
          </div>
        </section>
        <section id="engagement" className="hj-eng-section" aria-labelledby="hj-eng-heading">
          <div className="hj-inner">
            <div className={`hj-s-reveal${visibleSections.has('eng') ? ' hj-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="hj-s-eyebrow">Engagement Models</span>
              <h2 id="hj-eng-heading" className="hj-s-title">How to Hire a JavaScript Developer</h2>
              <p className="hj-s-desc" style={{ maxWidth: 680 }}>Full-time dedicated developer, part-time engagement, or hourly/project-based hiring — choose the model that fits your product stage and delivery needs.</p>
            </div>
            <div className="hj-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (<div key={m.id} className={`hj-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' hj-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}><span className="hj-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span><div className="hj-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div><div className="hj-eng-name">{m.name}</div><div className="hj-eng-headline">{m.headline}</div><div className="hj-eng-desc">{m.desc}</div><div className="hj-eng-list-label">Best for</div><ul className="hj-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul><div className="hj-eng-process"><strong>Process:</strong> {m.process}<br /><span className="hj-eng-timeline">{m.timeline}</span></div><Link href="#contact" className="hj-eng-cta">Get a free estimate →</Link></div>))}
            </div>
          </div>
        </section>
        <section className="hj-process-section" aria-labelledby="hj-proc-heading">
          <div className="hj-inner" style={{ maxWidth: 760 }}>
            <div className={`hj-s-reveal${visibleSections.has('proc') ? ' hj-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="hj-s-eyebrow">How We Hire</span>
              <h2 id="hj-proc-heading" className="hj-s-title">Our JavaScript Developer Hiring Process</h2>
              <p className="hj-s-desc">From requirements to first commit in 3–5 business days — transparent, technical, and no bait-and-switch.</p>
            </div>
            <div className="hj-psteps">
              {PROCESS_STEPS.map((step, i) => (<div key={step.num} className={`hj-pstep${visibleSections.has('proc') ? ' hj-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hj-pstep-l"><div className="hj-pstep-circle">{step.num}</div><div className="hj-pstep-connector" /></div><div className="hj-pstep-r"><div className="hj-pstep-title">{step.title}</div><p className="hj-pstep-desc">{step.desc}</p></div></div>))}
            </div>
          </div>
        </section>
        <section className="hj-testi" aria-labelledby="hj-ts-heading">
          <div className="hj-inner">
            <div className={`hj-center-head hj-s-reveal${visibleSections.has('ts') ? ' hj-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="hj-s-eyebrow">Client Results</span>
              <h2 id="hj-ts-heading" className="hj-s-title">What Our Clients Say</h2>
              <p className="hj-s-desc">Engineering managers, CTOs, and agency delivery leads across the US, UK, and Australia on hiring JavaScript developers from 1Solutions.</p>
            </div>
            <div className="hj-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (<div key={i} className={`hj-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' hj-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review"><div className="hj-stars">★★★★★</div><p className="hj-ttext" itemProp="reviewBody">{t.text}</p><div className="hj-tauthor"><div className="hj-tavatar" style={{ background: t.bg }}>{t.init}</div><div><div className="hj-tname" itemProp="author">{t.name}</div><div className="hj-trole">{t.role}</div></div></div></div>))}
            </div>
          </div>
        </section>
        <section className="hj-why-section" aria-labelledby="hj-wy-heading">
          <div className="hj-inner">
            <div className={`hj-s-reveal${visibleSections.has('wy') ? ' hj-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="hj-s-eyebrow">Why 1Solutions</span>
              <h2 id="hj-wy-heading" className="hj-s-title">Why Hire JavaScript Developers From 1Solutions</h2>
              <p className="hj-s-desc" style={{ maxWidth: 680 }}>15+ years of JS expertise, full-stack not just frontend, TypeScript-first, communication-first, transparent matching, rapid replacement guarantee, IP ownership, and no vendor lock-in.</p>
            </div>
            <div className="hj-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (<div key={i} className={`hj-wcard${visibleWhyCards.includes(i) ? ' hj-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}><div className="hj-wcard-dot" /><h3>{c.title}</h3><p>{c.desc}</p></div>))}
            </div>
          </div>
        </section>
        <section id="contact" className="hj-contact" aria-labelledby="hj-contact-heading">
          <div className="hj-contact-grid">
            <div>
              <h2 id="hj-contact-heading" className="hj-ctitle">Hire a JavaScript Developer Today</h2>
              <p className="hj-cdesc">Share your JavaScript requirements and we will shortlist pre-vetted developers within 24 business hours. Tell us your stack (React, Node.js, Vue, Angular, Next.js), the nature of the work, your time zone, and your start date — and we will match you with a developer who can hit the ground running.</p>
              <div className="hj-cbenefits">
                {[['✓','Shortlisted developers within 24 business hours — not 2 weeks'],['✓','Pre-vetted across JavaScript fundamentals, TypeScript, frameworks, and testing'],['✓','Full-time, part-time, or hourly — flexible engagement from day one'],['✓','Optional paid 1-week trial before committing to a longer engagement'],['✓','5-day rapid replacement guarantee if the match is not right']].map(([icon, text]) => (<div className="hj-cbenefit" key={text}><span className="hj-cbenefit-icon">{icon}</span><p>{text}</p></div>))}
              </div>
            </div>
            <div className="hj-form-box">
              <h3>Tell Us Your JavaScript Requirements</h3>
              <form className="hj-form" onSubmit={e => e.preventDefault()}>
                <div className="hj-frow">
                  <div className="hj-fg"><label htmlFor="hj-name">Full Name *</label><input id="hj-name" type="text" placeholder="Your name" required /></div>
                  <div className="hj-fg"><label htmlFor="hj-email">Work Email *</label><input id="hj-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="hj-frow">
                  <div className="hj-fg"><label htmlFor="hj-company">Company Name</label><input id="hj-company" type="text" placeholder="Your company" /></div>
                  <div className="hj-fg"><label htmlFor="hj-phone">Phone / WhatsApp</label><input id="hj-phone" type="tel" placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="hj-fg full">
                  <label htmlFor="hj-eng">Engagement Type *</label>
                  <select id="hj-eng" required>
                    <option value="">Select engagement...</option>
                    <option>Full-Time Dedicated Developer (160 hrs/month)</option>
                    <option>Part-Time Developer (80 hrs/month)</option>
                    <option>Hourly / Project-Based</option>
                  </select>
                </div>
                <div className="hj-fg full">
                  <label htmlFor="hj-stack">JavaScript Stack Needed *</label>
                  <select id="hj-stack" required>
                    <option value="">Select primary stack...</option>
                    <option>React / Next.js (Frontend)</option>
                    <option>Node.js / NestJS (Backend)</option>
                    <option>Full-Stack React + Node.js</option>
                    <option>Vue 3 / Nuxt 3</option>
                    <option>Angular 15+</option>
                    <option>TypeScript Migration</option>
                    <option>Other / Mixed</option>
                  </select>
                </div>
                <div className="hj-fg full">
                  <label htmlFor="hj-msg">Project Description *</label>
                  <textarea id="hj-msg" rows={4} placeholder="Describe your product, current stack, the type of work needed, team size, time zone preference, and start date..." required />
                </div>
                <div className="hj-consent">
                  <input id="hj-consent" type="checkbox" required />
                  <label htmlFor="hj-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label>
                </div>
                <button type="submit" className="hj-submit">Get Shortlisted Developers in 24 Hours →</button>
              </form>
            </div>
          </div>
        </section>
        <section className="hj-faq" aria-labelledby="hj-faq-heading">
          <div className="hj-inner" style={{ maxWidth: 860 }}>
            <span className="hj-s-eyebrow">FAQ</span>
            <h2 id="hj-faq-heading">Hiring JavaScript Developers — FAQ</h2>
            <p className="hj-faq-sub">Common questions about hiring JavaScript developers — vetting, frameworks, time zones, engagement models, and TypeScript.</p>
            <div className="hj-faq-list">
              {FAQS.map((item, i) => (<div key={i} className={`hj-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="hj-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="hj-fq-badge">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{item.q}</span><svg className="hj-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="hj-fanswer-wrap" itemScope itemType="https://schema.org/Answer"><div className="hj-fanswer" itemProp="text">{item.a}</div></div></div>))}
            </div>
          </div>
        </section>
        <section className="hj-related">
          <div className="hj-related-inner">
            <span className="hj-s-eyebrow">Explore More</span>
            <h2>Related Hire Developer Pages</h2>
            <p className="hj-related-sub">We also provide dedicated Angular, React, Node.js, Python, and full-stack developer hiring for businesses worldwide.</p>
            <hr />
            <div className="hj-rtags">
              {[['/hire-angularjs-developer/','Hire Angular Developer','hj-rtag-rose'],['/hire-ai-developer/','Hire AI Developer','hj-rtag-violet'],['/hire-blockchain-developer/','Hire Blockchain Developer','hj-rtag-amber'],['/hire-ml-developer/','Hire ML Developer','hj-rtag-violet'],['/hire-data-scientist/','Hire Data Scientist','hj-rtag-blue'],['/nodejs-development-company/','Node.js Development','hj-rtag-green'],['/nextjs-development-services/','Next.js Development','hj-rtag-blue'],['/software-development-company/','Software Development','hj-rtag-blue'],['/hire-wordpress-developer/','Hire WordPress Developer','hj-rtag-blue'],['/hire-shopify-developer/','Hire Shopify Developer','hj-rtag-green']].map(([href, label, cls]) => (<Link key={href} href={href} className={`hj-rtag ${cls}`}>{label}</Link>))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
