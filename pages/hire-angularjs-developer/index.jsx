'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Hire AngularJS Developer', item: 'https://www.1solutions.biz/hire-angularjs-developer/' }] },
    { '@type': 'Service', name: 'Hire AngularJS Developer', url: 'https://www.1solutions.biz/hire-angularjs-developer/', description: 'Hire expert Angular developers from 1Solutions — pre-vetted Angular engineers with deep Angular 2–17 expertise, RxJS, NgRx, TypeScript, Angular Material, and enterprise-grade application development. Dedicated, part-time, or hourly.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz', logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' }, foundingDate: '2008', areaServed: ['US', 'GB', 'AU', 'CA', 'IN'] }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '64', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What Angular versions do your developers work with?', acceptedAnswer: { '@type': 'Answer', text: 'Our Angular developers work with Angular 2 through Angular 17+. They are proficient in standalone components (introduced in Angular 14), the new control flow syntax (@if, @for, @switch) introduced in Angular 17, signals-based reactivity (Angular 16+), functional guards and resolvers (Angular 14+), inject() function, and the Ivy rendering engine. They can also maintain AngularJS (Angular 1.x) codebases and execute AngularJS-to-Angular migration projects.' } },
      { '@type': 'Question', name: 'What is the difference between Angular (modern) and AngularJS?', acceptedAnswer: { '@type': 'Answer', text: 'AngularJS (Angular 1.x) is the original 2010 framework using JavaScript, two-way data binding with watchers, controllers, and a digest cycle. It is in long-term support and no longer receiving new features. Angular (Angular 2+) is a complete rewrite using TypeScript, component-based architecture, RxJS for reactive programming, Ivy rendering engine, and a modular dependency injection system. When clients search for "AngularJS developers" they typically mean Angular 2–17+ developers — our team covers both, with primary expertise in modern Angular.' } },
      { '@type': 'Question', name: 'Are your Angular developers proficient in RxJS?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — RxJS proficiency is a core requirement for our Angular developers, not a bonus. They work comfortably with complex operator chains (switchMap, concatMap, mergeMap, exhaustMap, forkJoin, combineLatest, withLatestFrom, debounceTime, distinctUntilChanged), Subject variants (BehaviorSubject, ReplaySubject, AsyncSubject), error handling (catchError, retry, retryWhen), and memory leak prevention (takeUntil, takeUntilDestroyed, async pipe). They understand the difference between hot and cold observables and know when to use observables vs promises vs signals.' } },
      { '@type': 'Question', name: 'Can your Angular developers handle enterprise-scale applications?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our Angular developers have built and maintained enterprise Angular applications — multi-module applications with lazy-loaded feature modules, monorepo setups with Nx, design system integration with Angular Material or PrimeNG, complex NgRx state trees with entity adapters and selectors, real-time data with WebSockets, role-based access control with route guards, server-side rendering with Angular Universal, and micro-frontend architectures using module federation.' } },
      { '@type': 'Question', name: 'How quickly can I hire an Angular developer from 1Solutions?', acceptedAnswer: { '@type': 'Answer', text: 'You can receive a shortlist of pre-vetted Angular developers within 24 business hours of sharing your requirements. A dedicated developer can be started within 3–5 business days. For hourly or project-based work, we can often start within 24–48 hours.' } },
      { '@type': 'Question', name: 'Do your Angular developers work with NgRx?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our Angular developers are proficient in NgRx (Redux pattern for Angular) — store setup, actions, reducers with on() functions, effects for side effects, selectors with memoisation (createSelector), entity adapters for normalised state, NgRx ComponentStore for local component state, and NgRx Router Store. They also work with lighter alternatives (Akita, NGXS) and know when to recommend NgRx vs simpler service-based state management based on application complexity.' } },
      { '@type': 'Question', name: 'Can your Angular developers migrate from AngularJS to Angular?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our developers have executed AngularJS-to-Angular migrations using the ngUpgrade strategy — running both frameworks simultaneously, migrating components and services incrementally, and eventually removing the AngularJS dependency entirely. This approach minimises disruption to ongoing feature delivery. We assess the complexity and size of the AngularJS application and provide a migration roadmap with estimated timeline before starting.' } },
      { '@type': 'Question', name: 'What testing tools do your Angular developers use?', acceptedAnswer: { '@type': 'Answer', text: 'Our Angular developers write tests using Jasmine/Karma (the default Angular testing stack) or Jest (increasingly preferred for speed and snapshot testing), Angular Testing Utilities (TestBed, ComponentFixture, async, fakeAsync), HttpClientTestingModule for API mocking, and Playwright or Cypress for end-to-end tests. They configure CI/CD pipelines to enforce test coverage gates and integrate code coverage reporting with tools like Istanbul/nyc.' } },
    ] },
  ],
};

const SKILLS = [
  { n: '01', title: 'Angular 2–17 Enterprise Application Development', desc: 'Full-cycle Angular application development — module architecture (feature modules, shared modules, core modules), lazy-loaded routes, Angular Router (guards, resolvers, route animations), Angular Forms (reactive forms with FormBuilder, FormGroup, FormArray, custom validators, async validators), HTTP interceptors for auth and logging, and Angular Universal for SSR.' },
  { n: '02', title: 'RxJS & Reactive Angular Patterns', desc: 'Expert RxJS usage in Angular applications — observable streams for HTTP, WebSocket, and user interaction events, complex operator chains (switchMap, mergeMap, concatMap, exhaustMap, combineLatest, withLatestFrom, debounceTime), Subject and BehaviorSubject for component communication, async pipe in templates for subscription management, and signals migration (Angular 16+) for fine-grained reactivity.', feat: true },
  { n: '03', title: 'NgRx State Management', desc: 'NgRx for complex Angular application state — store configuration, action creators, reducers with createReducer and on(), memoised selectors with createSelector and createFeatureSelector, effects for async side effects (HTTP calls, WebSocket, local storage), entity adapters for normalised collections, NgRx Router Store, NgRx ComponentStore for local state, and NgRx DevTools for debugging.' },
  { n: '04', title: 'Angular Material & UI Component Libraries', desc: 'Angular Material implementation — component theming with SCSS variables and Angular CDK, form field customisation, data tables with sorting, filtering, and pagination (MatTable, MatSort, MatPaginator), virtual scrolling with CdkVirtualScrollViewport, drag-and-drop with CdkDragDrop, overlays and dialogs (MatDialog, MatSnackBar, MatMenu), and accessibility compliance (ARIA attributes).' },
  { n: '05', title: 'Angular Performance Optimisation', desc: 'Angular performance engineering — OnPush change detection strategy (and when to use it), memoised pipes for template computation, Angular zone.js optimisation and NgZone.runOutsideAngular for third-party libraries, lazy loading routes and standalone components, deferrable views (@defer block in Angular 17), bundle analysis with webpack-bundle-analyzer, and Core Web Vitals optimisation for Angular Universal SSR apps.' },
  { n: '06', title: 'Standalone Components & Angular 17+ Features', desc: 'Modern Angular patterns — standalone components (no NgModule), the inject() function for functional dependency injection, functional route guards and resolvers, new template control flow syntax (@if/@else, @for with track, @switch), deferrable views (@defer with loading/error/placeholder), signals reactivity model (signal(), computed(), effect()), and migration from NgModule-based to standalone architecture.' },
  { n: '07', title: 'Angular Micro-Frontends (Module Federation)', desc: 'Angular micro-frontend architecture using Webpack 5 Module Federation — host/remote shell setup, dynamic module loading, shared Angular framework instance, independent deployment of micro-frontend applications, cross-application communication via shared services or custom events, and Nx monorepo tooling for managing multiple Angular applications and libraries within a single repository.' },
  { n: '08', title: 'AngularJS to Angular Migration', desc: 'Full AngularJS (1.x) to Angular (2+) migration — codebase audit and migration roadmap, ngUpgrade hybrid application strategy (running both frameworks simultaneously), incremental component and service migration, two-way data binding to reactive forms conversion, $http to HttpClient migration, Karma/Jasmine test migration, and final AngularJS dependency removal with zero regression target.' },
  { n: '09', title: 'Angular Testing (Unit, Integration & E2E)', desc: 'Angular test suite development — Jasmine/Karma or Jest unit tests for components, services, pipes, and directives; Angular TestBed integration tests with dependency injection; HttpClientTestingModule for mocking API calls; component testing with ComponentFixture and async/fakeAsync helpers; Playwright or Cypress for E2E tests against the Angular app; CI/CD integration with coverage thresholds and automated reporting.' },
  { n: '10', title: 'Angular Code Review, Architecture & Consulting', desc: 'Independent Angular application review — architecture assessment (module structure, state management approach, routing design, performance patterns), security audit (XSS via bypass methods, CSRF, unsafe inline styles), code quality review (RxJS subscription management, change detection strategy, bundle size), and hands-on architectural consulting for teams building or scaling Angular enterprise applications.' },
];

const TECH_STACK = [
  { group: 'Angular Core', color: '#c2185b', items: ['Angular 14–17+', 'Standalone Components', 'Angular Signals', 'Angular Universal', 'Angular CDK', 'Angular CLI / Nx'] },
  { group: 'Reactive Programming', color: '#880e4f', items: ['RxJS 7+', 'BehaviorSubject', 'switchMap / combineLatest', 'async pipe', 'Signals (Angular 16+)', 'Zone.js'] },
  { group: 'State Management', color: '#7b1fa2', items: ['NgRx Store', 'NgRx Effects', 'NgRx Entity', 'NgRx ComponentStore', 'Akita', 'NGXS'] },
  { group: 'UI & Styling', color: '#0288d1', items: ['Angular Material', 'PrimeNG', 'Tailwind CSS', 'SCSS / CSS Variables', 'Angular Animations', 'CdkDragDrop'] },
  { group: 'Language & Type Safety', color: '#0f766e', items: ['TypeScript (strict)', 'ESLint / Prettier', 'Zod', 'OpenAPI / Swagger', 'i18n', 'Angular Schematics'] },
  { group: 'Testing', color: '#b45309', items: ['Jasmine / Karma', 'Jest', 'Angular TestBed', 'Playwright', 'Cypress', 'HttpClientTestingModule'] },
  { group: 'Build & Architecture', color: '#dc2626', items: ['Webpack 5 / esbuild', 'Module Federation', 'Turborepo / Nx', 'Angular ESBuild Builder', 'Lazy Loading', 'Tree Shaking'] },
  { group: 'Backend Integration', color: '#059669', items: ['REST / OpenAPI', 'GraphQL (Apollo)', 'WebSockets (RxJS)', 'Node.js / NestJS', 'Firebase / Supabase', 'OAuth 2.0 / OIDC'] },
];

const ENGAGEMENT_MODELS = [
  { id: 'full', name: 'Full-Time Dedicated Angular Developer', badge: 'Most Popular', badgeColor: '#D97706', feat: true, icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z', headline: '160 hrs/month — deeply embedded in your Angular team.', desc: 'A dedicated Angular developer working exclusively on your product for 160 hours per month. They attend your standups, commit to your repository, own features end-to-end, and build deep familiarity with your Angular architecture — including your specific NgRx patterns, RxJS operator choices, and component library conventions.', bestFor: ['Enterprise Angular applications requiring continuous development', 'Teams needing an Angular specialist alongside existing engineers', 'Products migrating from AngularJS to Angular (2+)', 'Organisations building complex NgRx state management architectures'], process: 'Requirements → shortlist in 24 hrs → interview → start in 3–5 days', timeline: 'Available within 3–5 business days' },
  { id: 'part', name: 'Part-Time Angular Developer (80 hrs/month)', badge: 'Flexible', badgeColor: '#c2185b', icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z', headline: '80 hrs/month — Angular expertise without full-time overhead.', desc: 'Part-time Angular engagement for products that need consistent specialist capacity without a full-time hire. Ideal for Angular applications in maintenance or gradual feature development phases, or teams that need an Angular expert available a few days per week alongside internal generalist engineers.', bestFor: ['Angular applications in maintenance or moderate growth', 'Teams needing Angular expertise 2–3 days per week', 'Steady feature backlog alongside internal frontend engineers', 'Angular upgrade projects (e.g., Angular 12 to Angular 17)'], process: 'Requirements → shortlist → interview → start within 2–3 days', timeline: 'Available within 2–3 business days' },
  { id: 'hourly', name: 'Hourly / Project-Based Angular Work', badge: 'Task-focused', badgeColor: '#0288d1', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z', headline: 'Pay per hour — ideal for scoped Angular tasks.', desc: 'Hourly or fixed-price Angular engagement for well-defined work — a specific Angular component or feature, RxJS debugging, NgRx store setup, AngularJS migration planning, Angular 17 upgrade, performance audit, or architecture review. No minimum commitment required.', bestFor: ['Specific Angular feature or component development', 'RxJS debugging or refactoring of complex operator chains', 'Angular version upgrade (e.g., Angular 12 → Angular 17)', 'AngularJS migration planning and ngUpgrade setup'], process: 'Scope discussion → estimate → start within 24 hrs', timeline: 'Can start within 24 business hours' },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Share Your Angular Requirements', desc: 'Tell us about your Angular application — the version, your current architecture (NgModule vs standalone, NgRx or service-based state, SSR or CSR), the nature of the work, your team size and structure, time zone requirements, and your start date. The more detail you provide, the more precisely we can match an Angular developer to your specific codebase conventions and team culture.' },
  { num: '02', title: 'Angular Developer Shortlist Within 24 Hours', desc: 'Within 24 business hours, we send you 2–3 pre-vetted Angular developer profiles. Each profile details their specific Angular expertise — version familiarity, RxJS depth, NgRx experience, UI library preferences, testing approach, and past project descriptions with Angular context. We do not send generic frontend developer CVs — these are Angular specialists.' },
  { num: '03', title: 'Technical Interview — Test What Matters to You', desc: "Interview the shortlisted developers on your specific Angular requirements. Test their RxJS operator knowledge with your real use cases, ask them to walk through their NgRx store design decisions, or have them review a snippet from your codebase. We don't coach developers for your interview — you see their real capabilities." },
  { num: '04', title: 'Optional Paid 1-Week Trial', desc: 'Before committing to a longer engagement, run a one-week paid trial with your chosen Angular developer on a real task from your backlog. This lets you assess Angular code quality, RxJS patterns, test coverage habits, Git hygiene, communication cadence, and how quickly they ramp up on your specific Angular architecture.' },
  { num: '05', title: 'Engagement Kick-Off', desc: 'Once you select a developer, we handle NDA, IP assignment, and working hours agreement. The Angular developer joins your Slack/Teams, gets repository access, reviews your architecture documentation, and attends your first sprint planning or standup. An account manager serves as your single point of contact for operational questions.' },
  { num: '06', title: 'Monthly Reviews & Rapid Replacement', desc: 'Monthly check-ins ensure delivery quality and mutual satisfaction. If the engagement is not working for any reason — performance, communication, evolving requirements — we replace the Angular developer within 5 business days at no additional cost, with no interruption to your engagement.' },
];

const TESTIMONIALS = [
  { text: "We hired an Angular developer from 1Solutions to take ownership of our enterprise portal — a 150K-line Angular 12 codebase with complex NgRx state. He proposed a store normalisation refactor in month one that reduced our selector query time by 60%. He now leads our Angular architecture decisions and has become a core member of our team. Could not have scaled without him.", name: 'David C.', role: 'VP Engineering, Enterprise SaaS (UK)', init: 'DC', bg: '#0F3460' },
  { text: "We needed a developer to execute our AngularJS to Angular 17 migration — a 5-year-old, 80K-line AngularJS application. 1Solutions matched us with an Angular specialist who had done this before. She produced a migration plan in week one, ran the ngUpgrade hybrid for 6 months, and we completed the full migration in 8 months with zero regressions. Exceptional Angular depth.", name: 'Sarah N.', role: 'CTO, Insurance Platform (AU)', init: 'SN', bg: '#1a0020', feat: true },
  { text: "Hired a part-time Angular developer to handle our RxJS-heavy real-time dashboard. The previous team had left a rats nest of nested subscriptions causing memory leaks on navigation. Our hire refactored it to use async pipe, takeUntilDestroyed, and proper switchMap patterns in two weeks. Dashboard memory usage dropped 80%. Excellent RxJS knowledge.", name: 'Mark P.', role: 'Engineering Manager, FinTech (US)', init: 'MP', bg: '#1e3a5f' },
];

const WHY_CARDS = [
  { title: 'Angular-Specific Vetting, Not Generic Frontend', desc: "We don't test Angular developers on generic JavaScript. Our vetting covers Angular-specific knowledge — change detection strategies, RxJS operator selection and memory management, NgRx selector memoisation, standalone component migration, signals, and Angular-specific security concerns (DomSanitizer, CSP). You get a genuine Angular specialist." },
  { title: 'RxJS Depth as a Baseline', desc: "RxJS is Angular's most powerful and most misused feature. We screen for real RxJS proficiency — operator selection (knowing the difference between switchMap and mergeMap and when each is correct), subscription management (no memory leaks), error handling (catchError, retry), and the emerging signals alternative." },
  { title: 'Enterprise Angular Experience', desc: "Our Angular developers have built enterprise-scale applications — Nx monorepos with 20+ libraries, NgRx state trees managing hundreds of actions and selectors, Angular Universal SSR for SEO-critical applications, micro-frontend architectures with module federation, and design systems using Angular Material or custom component libraries." },
  { title: 'AngularJS Migration Specialists', desc: 'We have executed multiple AngularJS-to-Angular migration projects and know the ngUpgrade strategy inside out — the gotchas, the performance implications of running both frameworks simultaneously, and the incremental migration patterns that minimise risk while keeping feature delivery moving.' },
  { title: 'TypeScript Strict Mode Practitioners', desc: 'All our Angular developers write TypeScript in strict mode. No any types, no non-null assertion shortcuts, proper generic typing for services and state. They use utility types, discriminated unions for action types, and generics for reusable component APIs.' },
  { title: 'Communication-First Developer Matching', desc: 'Technical Angular depth without clear communication creates silos in your team. We screen for English communication quality, proactive status updates, the ability to ask clarifying questions before writing code, and documentation habits — async communication that keeps your whole team informed.' },
  { title: 'Rapid Replacement — 5 Business Days', desc: 'If an Angular developer is not meeting your expectations — for any reason, at any point in the engagement — we replace them within 5 business days at no extra cost. No penalty clauses, no notice period that leaves you without coverage.' },
  { title: 'Committed to Your Angular Codebase, Not Ours', desc: 'Our developers commit to your repositories, follow your branching strategy (Gitflow or trunk-based), respect your Angular style guide, and write code that reads as if your own team wrote it. When the engagement ends, the codebase is entirely yours.' },
];

const FAQS = [
  { q: 'What Angular versions do your developers work with?', a: 'Our Angular developers work with Angular 2 through Angular 17+, covering standalone components, signals, new control flow syntax (@if/@for), functional guards, and the inject() function. They can also maintain AngularJS (1.x) codebases and execute AngularJS-to-Angular migration projects.' },
  { q: 'What is the difference between Angular (modern) and AngularJS?', a: 'AngularJS (Angular 1.x) uses JavaScript, two-way data binding with watchers, and controllers. Angular (2+) is a TypeScript rewrite with component-based architecture, RxJS, Ivy rendering, and a modular DI system. Our developers cover both, with primary expertise in modern Angular 2–17+.' },
  { q: 'Are your Angular developers proficient in RxJS?', a: 'Yes — RxJS is a core vetting requirement. Our developers know complex operator chains (switchMap, concatMap, mergeMap, exhaustMap, combineLatest, withLatestFrom), Subject variants, error handling (catchError, retry), subscription management (takeUntil, takeUntilDestroyed, async pipe), and the difference between hot and cold observables.' },
  { q: 'Can your Angular developers handle enterprise-scale applications?', a: 'Yes. Our Angular developers have built enterprise apps with multi-module lazy loading, Nx monorepos, complex NgRx state with entity adapters, real-time WebSocket data, RBAC route guards, Angular Universal SSR, and micro-frontend architectures using module federation.' },
  { q: 'How quickly can I hire an Angular developer from 1Solutions?', a: 'Shortlist of pre-vetted developers within 24 business hours. A dedicated developer can start within 3–5 business days. For hourly or project-based work, we can often start within 24–48 hours.' },
  { q: 'Do your Angular developers work with NgRx?', a: 'Yes. Our developers are proficient in NgRx — store, actions, reducers, memoised selectors, effects, entity adapters, ComponentStore, Router Store, and NgRx DevTools. They also know lighter alternatives (Akita, NGXS) and recommend the right state management approach for your application complexity.' },
  { q: 'Can your Angular developers migrate from AngularJS to Angular?', a: 'Yes. We have executed AngularJS-to-Angular migrations using the ngUpgrade strategy — running both frameworks simultaneously, migrating components and services incrementally, and removing the AngularJS dependency entirely. We assess complexity and provide a migration roadmap before starting.' },
  { q: 'What testing tools do your Angular developers use?', a: 'Jasmine/Karma or Jest for unit tests, Angular TestBed for integration tests, HttpClientTestingModule for API mocking, and Playwright or Cypress for E2E tests. They configure CI/CD coverage gates and integrate coverage reporting in GitHub Actions or GitLab CI.' },
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
    <div className="ha-stat-col">
      <div className="ha-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="ha-stat-label">{label}</div>
    </div>
  );
}

export default function HireAngularJsDeveloper() {
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
        <title>Hire AngularJS Developer | Expert Angular Engineers | 1Solutions</title>
        <meta name="description" content="Hire expert Angular developers from 1Solutions — pre-vetted Angular 2–17 engineers with deep RxJS, NgRx, TypeScript, Angular Material, and enterprise application expertise. Dedicated, part-time, or hourly. Start in 3–5 days." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-angularjs-developer/" />
        <meta property="og:title" content="Hire Angular Developer | RxJS, NgRx, TypeScript | 1Solutions" />
        <meta property="og:description" content="Hire vetted Angular developers — Angular 2–17, RxJS, NgRx, TypeScript strict, Angular Material, AngularJS migration. Dedicated, part-time, or hourly. 15+ years experience." />
        <meta property="og:url" content="https://www.1solutions.biz/hire-angularjs-developer/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .ha-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#fff0f3 0%,#ffe4ec 20%,#fff5f7 50%,#fef3c7 75%,#f0f9ff 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .ha-page *,.ha-page *::before,.ha-page *::after{box-sizing:border-box}
          .ha-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .ha-orb-1{width:860px;height:860px;background:radial-gradient(circle,rgba(194,24,91,.20) 0%,rgba(233,30,99,.08) 40%,transparent 70%);top:-260px;right:-240px}
          .ha-orb-2{width:760px;height:760px;background:radial-gradient(circle,rgba(2,136,209,.18) 0%,rgba(3,169,244,.08) 40%,transparent 70%);bottom:0;left:-220px}
          .ha-orb-3{width:520px;height:520px;background:radial-gradient(circle,rgba(123,31,162,.12) 0%,transparent 70%);top:44%;left:-100px;transform:translateY(-50%)}
          .ha-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .ha-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .ha-breadcrumb li{display:flex;align-items:center;gap:6px}
          .ha-breadcrumb li::after{content:'/';opacity:.45}
          .ha-breadcrumb li:last-child::after{display:none}
          .ha-breadcrumb a{color:#0F3460;text-decoration:none}
          .ha-breadcrumb a:hover{text-decoration:underline}
          .ha-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .ha-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .ha-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#c2185b 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .ha-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .ha-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .ha-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .ha-badge-dot{width:7px;height:7px;border-radius:50%;background:#c2185b;flex-shrink:0}
          .ha-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .ha-btn-primary{display:inline-block;padding:14px 36px;background:#c2185b;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(194,24,91,.28)}
          .ha-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .ha-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .ha-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(194,24,91,.5);transform:translateY(-2px)}
          .ha-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .ha-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .ha-stat-col:last-child{border-right:none}
          .ha-stat-val{font-size:28px;font-weight:900;color:#c2185b;letter-spacing:-.5px;line-height:1}
          .ha-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .ha-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .ha-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .ha-logos-wrap{width:100%;overflow:hidden}
          .ha-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:ha-marquee 28s linear infinite}
          .ha-logos-track:hover{animation-play-state:paused}
          @keyframes ha-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .ha-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .ha-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .ha-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .ha-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .ha-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .ha-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .ha-s-reveal.ha-revealed{opacity:1;transform:translateY(0)}
          .ha-inner{max-width:1300px;margin:0 auto}
          .ha-skill-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .ha-skill-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .ha-skill-card{background:linear-gradient(135deg,rgba(255,240,243,.50) 0%,rgba(255,255,255,.85) 55%,rgba(255,245,247,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .ha-skill-card.ha-cv{opacity:1;transform:translateY(0)}
          .ha-skill-card.ha-cv:hover{transform:translateY(-6px);border-color:rgba(194,24,91,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .ha-skill-card.feat{border-color:rgba(194,24,91,.20)}
          .ha-skill-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .ha-skill-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .ha-skill-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .ha-skill-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#c2185b,#f06292);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .ha-skill-card.ha-cv:hover::before{transform:scaleY(1)}
          .ha-skill-more{text-align:center;margin-top:22px}
          .ha-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .ha-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .ha-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .ha-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .ha-stack-card{background:linear-gradient(135deg,rgba(255,240,243,.50) 0%,rgba(255,255,255,.85) 55%,rgba(255,245,247,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .ha-stack-card.ha-sv{opacity:1;transform:translateY(0)}
          .ha-stack-card.ha-sv:hover{border-color:rgba(194,24,91,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .ha-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .ha-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .ha-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .ha-eng-section{padding:80px 40px;position:relative;z-index:1}
          .ha-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .ha-eng-card{background:linear-gradient(135deg,rgba(255,240,243,.50) 0%,rgba(255,255,255,.85) 55%,rgba(255,245,247,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .ha-eng-card.ha-ev{opacity:1;transform:translateY(0)}
          .ha-eng-card.ha-ev:hover{border-color:rgba(194,24,91,.25);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .ha-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(255,240,243,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .ha-eng-card.feat.ha-ev{transform:translateY(-8px)}
          .ha-eng-card.feat.ha-ev:hover{transform:translateY(-12px)}
          .ha-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .ha-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
          .ha-eng-icon svg{fill:#0F3460}
          .ha-eng-card.feat .ha-eng-icon{background:rgba(217,119,6,.10)}
          .ha-eng-card.feat .ha-eng-icon svg{fill:#D97706}
          .ha-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .ha-eng-headline{font-size:13px;font-weight:600;color:#c2185b;margin-bottom:12px}
          .ha-eng-card.feat .ha-eng-headline{color:#D97706}
          .ha-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .ha-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .ha-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .ha-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .ha-eng-list li::before{content:'✓';font-weight:800;color:#c2185b;flex-shrink:0;margin-top:1px}
          .ha-eng-card.feat .ha-eng-list li::before{color:#D97706}
          .ha-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .ha-eng-process strong{color:#0F3460}
          .ha-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .ha-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .ha-eng-cta:hover{background:#0F3460;color:#fff}
          .ha-eng-card.feat .ha-eng-cta{background:#c2185b;color:#fff;border-color:#c2185b}
          .ha-eng-card.feat .ha-eng-cta:hover{background:#0F3460;border-color:#0F3460}
          .ha-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .ha-psteps{display:flex;flex-direction:column;margin-top:52px}
          .ha-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .ha-pstep.ha-pv{opacity:1;transform:translateY(0)}
          .ha-pstep-l{display:flex;flex-direction:column;align-items:center}
          .ha-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0}
          .ha-pstep.ha-pv:hover .ha-pstep-circle{background:rgba(194,24,91,.10);border-color:#c2185b;color:#c2185b}
          .ha-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .ha-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .ha-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .ha-pstep:last-child .ha-pstep-connector{display:none}
          .ha-pstep-r{padding:4px 0 38px}
          .ha-pstep:last-child .ha-pstep-r{padding-bottom:0}
          .ha-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .ha-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .ha-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .ha-center-head{text-align:center;margin-bottom:48px}
          .ha-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .ha-tcard{background:linear-gradient(135deg,rgba(255,240,243,.50) 0%,rgba(255,255,255,.85) 55%,rgba(255,245,247,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1)}
          .ha-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(255,240,243,.42) 100%);border-color:rgba(217,119,6,.22)}
          .ha-tcard.ha-tv{opacity:1;transform:translateY(0)}
          .ha-tcard.ha-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .ha-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .ha-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .ha-tauthor{display:flex;align-items:center;gap:12px}
          .ha-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .ha-tname{font-size:14px;font-weight:700;color:#0F3460}
          .ha-trole{font-size:12px;color:#6b7280}
          .ha-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .ha-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .ha-wcard{background:linear-gradient(135deg,rgba(255,240,243,.50) 0%,rgba(255,255,255,.85) 55%,rgba(255,245,247,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .ha-wcard.ha-wv{opacity:1;transform:translateY(0) scale(1)}
          .ha-wcard.ha-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(194,24,91,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .ha-wcard-dot{width:10px;height:10px;border-radius:50%;background:#c2185b;margin-bottom:12px}
          .ha-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .ha-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .ha-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(255,240,243,.55) 0%,rgba(255,255,255,.60) 40%,rgba(255,245,247,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .ha-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .ha-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#c2185b 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .ha-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .ha-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .ha-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .ha-cbenefit-icon{flex-shrink:0;color:#c2185b;font-weight:800;font-size:16px;margin-top:1px}
          .ha-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .ha-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(255,240,243,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .ha-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .ha-form{display:flex;flex-direction:column;gap:13px}
          .ha-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .ha-fg{display:flex;flex-direction:column;gap:5px}
          .ha-fg.full{grid-column:1/-1}
          .ha-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .ha-fg input,.ha-fg textarea,.ha-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .ha-fg input:focus,.ha-fg textarea:focus,.ha-fg select:focus{outline:none;border-color:#c2185b;box-shadow:0 0 0 3px rgba(194,24,91,.10)}
          .ha-consent{display:flex;gap:8px;align-items:flex-start}
          .ha-consent input{margin-top:3px;width:15px;height:15px}
          .ha-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .ha-consent a{color:#0F3460}
          .ha-submit{width:100%;padding:14px;background:#c2185b;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(194,24,91,.26)}
          .ha-submit:hover{background:#0F3460;transform:translateY(-2px)}
          .ha-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .ha-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .ha-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .ha-faq-list{display:flex;flex-direction:column;gap:10px}
          .ha-fitem{background:linear-gradient(135deg,rgba(255,240,243,.50) 0%,rgba(255,255,255,.85) 55%,rgba(255,245,247,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .ha-fitem.open{border-color:rgba(194,24,91,.30)}
          .ha-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#c2185b,#f06292);border-radius:3px 3px 0 0}
          .ha-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .ha-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px}
          .ha-fitem.open .ha-fq-badge{background:#c2185b;color:#fff}
          .ha-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .ha-fitem.open .ha-fq span{color:#880e4f}
          .ha-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .ha-fitem.open .ha-fchev{transform:rotate(180deg);color:#c2185b}
          .ha-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .ha-fitem.open .ha-fanswer-wrap{max-height:500px}
          .ha-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .ha-related{padding:80px 40px;background:rgba(255,240,243,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .ha-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .ha-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .ha-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .ha-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .ha-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .ha-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .ha-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .ha-rtag-rose{background:rgba(194,24,91,.09);border-color:rgba(194,24,91,.28);color:#880e4f}
          .ha-rtag-amber{background:rgba(202,138,4,.09);border-color:rgba(202,138,4,.28);color:#92400e}
          .ha-rtag-blue{background:rgba(2,132,199,.09);border-color:rgba(2,132,199,.28);color:#0369a1}
          .ha-rtag-green{background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d}
          .ha-rtag-violet{background:rgba(109,40,217,.09);border-color:rgba(109,40,217,.28);color:#4c1d95}
          @media(max-width:1024px){.ha-hero h1,.ha-s-title,.ha-faq h2{font-size:36px}.ha-skill-grid{grid-template-columns:repeat(2,1fr)}.ha-stack-grid{grid-template-columns:repeat(2,1fr)}.ha-eng-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.ha-eng-card.feat{transform:none}.ha-eng-card.feat.ha-ev{transform:none}.ha-eng-card.feat.ha-ev:hover{transform:translateY(-4px)}.ha-why-grid{grid-template-columns:repeat(2,1fr)}.ha-tgrid{grid-template-columns:1fr}.ha-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.ha-breadcrumb{padding:12px 20px 0}.ha-hero{padding:28px 20px 20px}.ha-hero h1{font-size:26px;letter-spacing:-.3px}.ha-stats{grid-template-columns:1fr 1fr}.ha-stat-col:nth-child(2){border-right:none}.ha-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.ha-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.ha-logos{padding:16px 20px 28px}.ha-skill-section,.ha-stack-section,.ha-eng-section,.ha-process-section,.ha-testi,.ha-why-section,.ha-faq,.ha-related{padding:52px 20px}.ha-contact{padding:48px 20px}.ha-skill-grid,.ha-stack-grid,.ha-why-grid{grid-template-columns:1fr}.ha-frow{grid-template-columns:1fr}.ha-ctitle{font-size:28px}.ha-s-title{font-size:28px}}
        `}</style>
      </Head>
      <div className="ha-page">
        <div className="ha-orb ha-orb-1" /><div className="ha-orb ha-orb-2" /><div className="ha-orb ha-orb-3" />
        <nav className="ha-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">Hire AngularJS Developer</span><meta itemProp="position" content="2" /></li>
          </ol>
        </nav>
        <section className="ha-hero">
          <span className="ha-eyebrow">Hire Angular Developer</span>
          <h1>Hire Expert Angular Developers — RxJS, NgRx & TypeScript</h1>
          <p className="ha-hero-desc">Hire pre-vetted Angular engineers with deep Angular 2–17 expertise — RxJS, NgRx, TypeScript strict mode, Angular Material, standalone components, Angular signals, and enterprise-scale application development. Dedicated, part-time, or hourly. Start in 3–5 business days.</p>
          <div className="ha-trust-row">
            {['Angular 2–17+','RxJS Operators','NgRx / NgRx Effects','TypeScript Strict','Angular Material'].map(b => (<div className="ha-badge" key={b}><span className="ha-badge-dot" />{b}</div>))}
          </div>
          <div className="ha-ctas">
            <Link href="#contact" className="ha-btn-primary">Hire an Angular Developer</Link>
            <Link href="#engagement" className="ha-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>
        <div className="ha-stats" ref={statsRef}>
          {[['150+','Angular Projects Delivered'],['15+','Years Angular/JS Exp'],['48hr','Avg Developer Match'],['98%','Client Retention']].map(([v, l]) => (<StatItem key={l} label={l} val={v} started={statsStarted} />))}
        </div>
        <div className="ha-logos">
          <span className="ha-logos-label">Trusted by Engineering Teams Worldwide</span>
          <div className="ha-logos-wrap">
            <div className="ha-logos-track">
              {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="ha-clogo" />
              ))}
            </div>
          </div>
        </div>
        <section className="ha-skill-section" aria-labelledby="ha-skill-heading">
          <div className="ha-inner">
            <div className={`ha-s-reveal${visibleSections.has('sk') ? ' ha-revealed' : ''}`} ref={el => { sectionRefs.current['sk'] = el; }}>
              <span className="ha-s-eyebrow">What Our Developers Build</span>
              <h2 id="ha-skill-heading" className="ha-s-title">Angular Skills & Expertise</h2>
              <p className="ha-s-desc" style={{ maxWidth: 720 }}>Enterprise Angular development, RxJS reactive patterns, NgRx state management, Angular Material UI, performance optimisation, standalone components, micro-frontends, AngularJS migration, testing, and Angular architecture consulting.</p>
            </div>
            <div className="ha-skill-grid" ref={skillGridRef}>
              {visibleSkills.map((s, i) => (<div key={s.n} className={`ha-skill-card${s.feat ? ' feat' : ''}${visibleSkillCards.includes(i) ? ' ha-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="ha-skill-num">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}
            </div>
            {SKILLS.length > 6 && (<div className="ha-skill-more"><button className="ha-btn-more" onClick={() => setShowAllSkills(p => !p)}>{showAllSkills ? 'Show fewer ↑' : `Show all ${SKILLS.length} skill areas ↓`}</button></div>)}
          </div>
        </section>
        <section className="ha-stack-section" aria-labelledby="ha-stack-heading">
          <div className="ha-inner">
            <div className={`ha-s-reveal${visibleSections.has('stk') ? ' ha-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="ha-s-eyebrow">Technology Stack</span>
              <h2 id="ha-stack-heading" className="ha-s-title">Angular Tools & Technologies</h2>
              <p className="ha-s-desc" style={{ maxWidth: 680 }}>Angular 14–17+, RxJS 7, NgRx, Angular Material, TypeScript strict, Jest, Playwright, Webpack 5 Module Federation, Nx, Angular Universal, Jasmine/Karma, and full backend integration.</p>
            </div>
            <div className="ha-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (<div key={grp.group} className={`ha-stack-card${visibleStackCards.includes(i) ? ' ha-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}><div className="ha-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div><div className="ha-stack-pills">{grp.items.map(item => <span key={item} className="ha-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}</div></div>))}
            </div>
          </div>
        </section>
        <section id="engagement" className="ha-eng-section" aria-labelledby="ha-eng-heading">
          <div className="ha-inner">
            <div className={`ha-s-reveal${visibleSections.has('eng') ? ' ha-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="ha-s-eyebrow">Engagement Models</span>
              <h2 id="ha-eng-heading" className="ha-s-title">How to Hire an Angular Developer</h2>
              <p className="ha-s-desc" style={{ maxWidth: 680 }}>Full-time dedicated Angular developer, part-time engagement, or hourly/project-based Angular work — choose the model that fits your product stage and team needs.</p>
            </div>
            <div className="ha-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (<div key={m.id} className={`ha-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' ha-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}><span className="ha-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span><div className="ha-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div><div className="ha-eng-name">{m.name}</div><div className="ha-eng-headline">{m.headline}</div><div className="ha-eng-desc">{m.desc}</div><div className="ha-eng-list-label">Best for</div><ul className="ha-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul><div className="ha-eng-process"><strong>Process:</strong> {m.process}<br /><span className="ha-eng-timeline">{m.timeline}</span></div><Link href="#contact" className="ha-eng-cta">Get a free estimate →</Link></div>))}
            </div>
          </div>
        </section>
        <section className="ha-process-section" aria-labelledby="ha-proc-heading">
          <div className="ha-inner" style={{ maxWidth: 760 }}>
            <div className={`ha-s-reveal${visibleSections.has('proc') ? ' ha-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="ha-s-eyebrow">How We Hire</span>
              <h2 id="ha-proc-heading" className="ha-s-title">Our Angular Developer Hiring Process</h2>
              <p className="ha-s-desc">From requirements to first commit in 3–5 business days — Angular-specific vetting, your interview, optional trial, and ongoing quality assurance.</p>
            </div>
            <div className="ha-psteps">
              {PROCESS_STEPS.map((step, i) => (<div key={step.num} className={`ha-pstep${visibleSections.has('proc') ? ' ha-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="ha-pstep-l"><div className="ha-pstep-circle">{step.num}</div><div className="ha-pstep-connector" /></div><div className="ha-pstep-r"><div className="ha-pstep-title">{step.title}</div><p className="ha-pstep-desc">{step.desc}</p></div></div>))}
            </div>
          </div>
        </section>
        <section className="ha-testi" aria-labelledby="ha-ts-heading">
          <div className="ha-inner">
            <div className={`ha-center-head ha-s-reveal${visibleSections.has('ts') ? ' ha-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="ha-s-eyebrow">Client Results</span>
              <h2 id="ha-ts-heading" className="ha-s-title">What Our Clients Say</h2>
              <p className="ha-s-desc">CTOs, VP Engineers, and Engineering Managers across the US, UK, and Australia on hiring Angular developers from 1Solutions.</p>
            </div>
            <div className="ha-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (<div key={i} className={`ha-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' ha-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review"><div className="ha-stars">★★★★★</div><p className="ha-ttext" itemProp="reviewBody">{t.text}</p><div className="ha-tauthor"><div className="ha-tavatar" style={{ background: t.bg }}>{t.init}</div><div><div className="ha-tname" itemProp="author">{t.name}</div><div className="ha-trole">{t.role}</div></div></div></div>))}
            </div>
          </div>
        </section>
        <section className="ha-why-section" aria-labelledby="ha-wy-heading">
          <div className="ha-inner">
            <div className={`ha-s-reveal${visibleSections.has('wy') ? ' ha-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="ha-s-eyebrow">Why 1Solutions</span>
              <h2 id="ha-wy-heading" className="ha-s-title">Why Hire Angular Developers From 1Solutions</h2>
              <p className="ha-s-desc" style={{ maxWidth: 680 }}>Angular-specific vetting, RxJS depth as a baseline, enterprise Angular experience, AngularJS migration specialists, TypeScript strict practitioners, communication-first, rapid replacement guarantee, and your codebase stays yours.</p>
            </div>
            <div className="ha-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (<div key={i} className={`ha-wcard${visibleWhyCards.includes(i) ? ' ha-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}><div className="ha-wcard-dot" /><h3>{c.title}</h3><p>{c.desc}</p></div>))}
            </div>
          </div>
        </section>
        <section id="contact" className="ha-contact" aria-labelledby="ha-contact-heading">
          <div className="ha-contact-grid">
            <div>
              <h2 id="ha-contact-heading" className="ha-ctitle">Hire an Angular Developer Today</h2>
              <p className="ha-cdesc">Share your Angular requirements — version, architecture, RxJS/NgRx complexity, time zone, and start date — and we will shortlist pre-vetted Angular developers within 24 business hours. We match on Angular depth, not just frontend generalism.</p>
              <div className="ha-cbenefits">
                {[['✓','Shortlisted Angular developers within 24 business hours'],['✓','Angular-specific vetting — RxJS depth, NgRx, TypeScript strict, Angular versions'],['✓','Full-time, part-time, or hourly — flexible from day one'],['✓','Optional paid 1-week trial before committing to longer engagement'],['✓','5-day rapid replacement guarantee — no penalty']].map(([icon, text]) => (<div className="ha-cbenefit" key={text}><span className="ha-cbenefit-icon">{icon}</span><p>{text}</p></div>))}
              </div>
            </div>
            <div className="ha-form-box">
              <h3>Tell Us Your Angular Requirements</h3>
              <form className="ha-form" onSubmit={e => e.preventDefault()}>
                <div className="ha-frow">
                  <div className="ha-fg"><label htmlFor="ha-name">Full Name *</label><input id="ha-name" type="text" placeholder="Your name" required /></div>
                  <div className="ha-fg"><label htmlFor="ha-email">Work Email *</label><input id="ha-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="ha-frow">
                  <div className="ha-fg"><label htmlFor="ha-company">Company Name</label><input id="ha-company" type="text" placeholder="Your company" /></div>
                  <div className="ha-fg"><label htmlFor="ha-phone">Phone / WhatsApp</label><input id="ha-phone" type="tel" placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="ha-fg full">
                  <label htmlFor="ha-eng">Engagement Type *</label>
                  <select id="ha-eng" required><option value="">Select engagement...</option><option>Full-Time Dedicated Angular Developer (160 hrs/month)</option><option>Part-Time Angular Developer (80 hrs/month)</option><option>Hourly / Project-Based</option></select>
                </div>
                <div className="ha-fg full">
                  <label htmlFor="ha-ver">Angular Version & Stack *</label>
                  <select id="ha-ver" required><option value="">Select Angular version/context...</option><option>Angular 15–17+ (latest, standalone components)</option><option>Angular 12–14 (maintenance or upgrade)</option><option>AngularJS (1.x) maintenance</option><option>AngularJS to Angular migration</option><option>Angular with NgRx (complex state management)</option><option>Angular Universal (SSR)</option><option>Angular Micro-Frontends (Module Federation)</option></select>
                </div>
                <div className="ha-fg full">
                  <label htmlFor="ha-msg">Project Description *</label>
                  <textarea id="ha-msg" rows={4} placeholder="Describe your Angular application, current state management approach, RxJS complexity, team size, time zone, and what you need the developer to own..." required />
                </div>
                <div className="ha-consent">
                  <input id="ha-consent" type="checkbox" required />
                  <label htmlFor="ha-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label>
                </div>
                <button type="submit" className="ha-submit">Get Shortlisted Angular Developers →</button>
              </form>
            </div>
          </div>
        </section>
        <section className="ha-faq" aria-labelledby="ha-faq-heading">
          <div className="ha-inner" style={{ maxWidth: 860 }}>
            <span className="ha-s-eyebrow">FAQ</span>
            <h2 id="ha-faq-heading">Hiring Angular Developers — FAQ</h2>
            <p className="ha-faq-sub">Common questions about hiring Angular developers — versions, RxJS, NgRx, AngularJS migration, testing, and enterprise-scale applications.</p>
            <div className="ha-faq-list">
              {FAQS.map((item, i) => (<div key={i} className={`ha-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="ha-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="ha-fq-badge">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{item.q}</span><svg className="ha-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="ha-fanswer-wrap" itemScope itemType="https://schema.org/Answer"><div className="ha-fanswer" itemProp="text">{item.a}</div></div></div>))}
            </div>
          </div>
        </section>
        <section className="ha-related">
          <div className="ha-related-inner">
            <span className="ha-s-eyebrow">Explore More</span>
            <h2>Related Hire Developer Pages</h2>
            <p className="ha-related-sub">We also provide dedicated JavaScript, React, Vue.js, and full-stack developer hiring for businesses worldwide.</p>
            <hr />
            <div className="ha-rtags">
              {[['/hire-javascript-developer/','Hire JavaScript Developer','ha-rtag-amber'],['/hire-ai-developer/','Hire AI Developer','ha-rtag-violet'],['/hire-ml-developer/','Hire ML Developer','ha-rtag-violet'],['/hire-salesforce-developer/','Hire Salesforce Developer','ha-rtag-blue'],['/hire-blockchain-developer/','Hire Blockchain Developer','ha-rtag-amber'],['/nextjs-development-services/','Next.js Development','ha-rtag-blue'],['/nodejs-development-company/','Node.js Development','ha-rtag-green'],['/software-development-company/','Software Development','ha-rtag-blue']].map(([href, label, cls]) => (<Link key={href} href={href} className={`ha-rtag ${cls}`}>{label}</Link>))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
