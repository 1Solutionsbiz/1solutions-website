'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.1solutions.biz/#industries' }, { '@type': 'ListItem', position: 3, name: 'SaaS Development', item: 'https://www.1solutions.biz/saas-application-development-company/' }] },
    { '@type': 'Service', name: 'SaaS Application Development Company', url: 'https://www.1solutions.biz/saas-application-development-company/', description: '1Solutions is a SaaS product development company building B2B and B2C SaaS platforms — multi-tenant architecture, subscription billing, usage metering, self-serve onboarding, integrations marketplace, white-labelling, and SaaS analytics dashboards. 15+ years, 80+ SaaS products shipped.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '73', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What SaaS products does 1Solutions build?', acceptedAnswer: { '@type': 'Answer', text: '1Solutions builds B2B and B2C SaaS products — HR and payroll SaaS, CRM and sales SaaS, project management tools, marketing automation platforms, LMS and EdTech SaaS, FinTech SaaS, field service management, customer support tools, API-first platforms, and white-label SaaS products. We cover multi-tenant architecture, subscription billing, onboarding flows, integrations, and analytics.' } },
      { '@type': 'Question', name: 'How do you architect a multi-tenant SaaS application?', acceptedAnswer: { '@type': 'Answer', text: 'We evaluate three multi-tenancy models: shared schema (one DB, tenant_id column — lowest cost, highest isolation risk), shared database separate schema (PostgreSQL schemas per tenant — good balance), and database-per-tenant (highest isolation, highest cost). Choice depends on compliance requirements (GDPR, HIPAA, SOC 2), customer data sensitivity, and expected tenant count. We implement row-level security (RLS), tenant context middleware, and data isolation testing as standard.' } },
    ] },
  ],
};

const SOLUTIONS = [
  { n: '01', title: 'SaaS Product Architecture & MVP', desc: 'Greenfield SaaS product design and MVP — multi-tenant architecture selection (shared schema, schema-per-tenant, DB-per-tenant), technology stack choice (Next.js, Node.js, PostgreSQL, Redis), auth system (magic link, SSO/SAML, Google OAuth), subscription billing integration (Stripe), CI/CD pipeline, and deployment on AWS or GCP. MVP shipped in 10–14 weeks.', feat: true },
  { n: '02', title: 'Multi-Tenant Architecture', desc: 'Robust multi-tenancy implementation — row-level security (RLS) in PostgreSQL, tenant context middleware, data isolation testing, cross-tenant query prevention, tenant onboarding automation, subdomain routing per tenant, custom domain mapping, tenant-level feature flags, and zero-downtime tenant migration scripts. Passes SOC 2 and ISO 27001 audits.' },
  { n: '03', title: 'Subscription Billing & Metering', desc: 'Stripe-powered subscription billing — plan and pricing management, free trial with card capture, usage-based billing (metered API calls, seats, storage), dunning management (failed payment recovery), coupon and promotion engine, invoice generation and PDF download, upgrade/downgrade proration, tax calculation (TaxJar / Stripe Tax), and MRR/ARR revenue dashboard.' },
  { n: '04', title: 'SaaS Onboarding & Activation Flow', desc: 'Self-serve onboarding that converts — product tour (Intercom or custom), progressive disclosure of features, in-app task checklist, email drip onboarding sequence, sample data pre-population, invite team members flow, CSV import wizard, and activation event tracking (segment the users who complete key actions within 7 days vs those who churn).', feat: true },
  { n: '05', title: 'Integrations Marketplace / API Platform', desc: 'Third-party integrations and API-first architecture — OAuth 2.0 integration framework for Slack, HubSpot, Salesforce, Zapier, and custom webhooks; public REST and GraphQL API with API key management and rate limiting; developer documentation portal (Swagger/Redoc); webhook retry logic and event log; and an in-app integrations marketplace page for marketing discoverability.' },
  { n: '06', title: 'White-Label SaaS Platform', desc: 'White-labelling for resellers and enterprise clients — custom subdomain and custom domain per client, logo and colour theme per tenant, email white-labelling (custom SMTP), removal of product branding, reseller pricing overrides, reseller admin panel with client management, and branded onboarding flows. Full audit trail for reseller compliance.' },
  { n: '07', title: 'SaaS Analytics & Product Intelligence', desc: 'Product analytics and business intelligence — Segment CDP integration, Amplitude or Mixpanel funnel analysis, feature usage heatmaps, NPS survey integration, cohort retention analysis, subscription MRR/churn dashboards, revenue forecasting model, and A/B testing framework. Built-in customer health scoring to predict churn before it happens.' },
  { n: '08', title: 'Admin Panel & Ops Tooling', desc: 'Internal back-office tooling for SaaS operations — super-admin panel (all tenants, plan management, impersonation), support agent view (customer timeline, subscription, recent activity), feature flag management UI, billing override and credit tooling, manual subscription manipulation for sales deals, and audit log for admin actions.' },
  { n: '09', title: 'SaaS Performance & Scalability', desc: 'Scale a SaaS product that is hitting limits — database query profiling and index optimisation, background job queue architecture (BullMQ, Celery), caching strategy (Redis for session and hot data, CDN for assets), horizontal scaling architecture on Kubernetes, load testing to 10x expected peak, and monitoring and alerting (Datadog, Sentry).' },
  { n: '10', title: 'SaaS Security & Compliance (SOC 2 / GDPR)', desc: 'Security and compliance engineering for SaaS — SOC 2 Type II audit readiness (access controls, logging, encryption), GDPR right-to-erasure implementation (data purge workflow), data residency controls (EU vs US data storage routing), penetration testing, secret management (AWS Secrets Manager), and dependency vulnerability scanning in CI/CD.' },
];

const TECH_STACK = [
  { group: 'Frontend', color: '#0f4c81', items: ['React / Next.js 14+', 'TypeScript', 'Tailwind / CSS-in-JS', 'Storybook (design system)', 'Recharts / D3 (charts)', 'Framer Motion'] },
  { group: 'Backend & API', color: '#1d4ed8', items: ['Node.js / NestJS', 'Python / Django REST', 'FastAPI (async)', 'GraphQL (Apollo)', 'REST / OpenAPI', 'tRPC (type-safe)'] },
  { group: 'Auth & Identity', color: '#2d1b69', items: ['Auth0 / Clerk', 'NextAuth.js', 'SSO / SAML 2.0', 'SCIM provisioning', 'Magic link / Passkeys', 'MFA (TOTP / SMS)'] },
  { group: 'Billing & Payments', color: '#0369a1', items: ['Stripe Billing', 'Stripe Tax', 'Usage-based metering', 'Chargebee / Recurly', 'Dunning management', 'Revenue recognition'] },
  { group: 'Database & Cache', color: '#0891b2', items: ['PostgreSQL (RLS)', 'MySQL / PlanetScale', 'Redis (cache/queue)', 'MongoDB (document)', 'Prisma ORM', 'ClickHouse (analytics)'] },
  { group: 'Analytics & Monitoring', color: '#7c3aed', items: ['Segment CDP', 'Amplitude / Mixpanel', 'Datadog / New Relic', 'Sentry (error tracking)', 'PostHog (product)', 'OpenTelemetry'] },
  { group: 'Cloud & DevOps', color: '#dc2626', items: ['AWS / GCP / Azure', 'Kubernetes / EKS', 'Terraform (IaC)', 'GitHub Actions CI/CD', 'Docker / ECR', 'Vercel / Railway'] },
  { group: 'Integrations', color: '#b45309', items: ['Zapier / Make (no-code)', 'Slack / HubSpot / SF', 'Webhooks framework', 'OAuth 2.0 integrations', 'API gateway (Kong)', 'Developer docs portal'] },
];

const ENGAGEMENT = [
  { id: 'build', name: 'SaaS Product Build', badge: 'Most Popular', bc: '#D97706', feat: true, icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', headline: 'From zero to live SaaS product.', desc: 'Full SaaS product development — architecture, MVP, subscription billing, onboarding, integrations, and launch. Discovery → design → agile sprints → QA → production deployment on AWS or GCP.', best: ['Founders building a B2B SaaS product to validate PMF', 'Agencies building a white-label SaaS to package their services', 'Enterprise software vendors launching a cloud SaaS offering', 'Startups with funding ready to build beyond an MVP prototype'], tl: 'MVP in 10–14 weeks; full v1 in 5–7 months' },
  { id: 'scale', name: 'SaaS Scale & Modernisation', badge: 'Growing Products', bc: '#0f4c81', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', headline: 'Fix performance, multi-tenancy, or billing.', desc: 'Targeted engineering for SaaS products hitting growth limits — multi-tenancy re-architecture, billing complexity, performance bottlenecks, SOC 2 audit prep, monolith-to-microservices migration, or data residency requirements.', best: ['SaaS products growing past 1,000 tenants with shared-schema strain', 'Products needing enterprise-grade SSO/SAML and SCIM for upmarket deals', 'SaaS hitting database performance bottlenecks under load', 'Products preparing for SOC 2 Type II or ISO 27001 audit'], tl: 'Architecture plan in 2 weeks; migration in 2–4 months' },
  { id: 'audit', name: 'SaaS Technical Audit', badge: 'Due Diligence', bc: '#7c3aed', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', headline: 'Independent review of code, security, and scalability.', desc: 'Independent technical audit for investors, acquirers, or founders — architecture review, security posture assessment (OWASP Top 10, multi-tenancy isolation), scalability headroom analysis, code quality and tech debt scoring, and actionable remediation priority list.', best: ['Investors running technical due diligence pre-Series A/B', 'Founders preparing for a strategic acquisition process', 'SaaS companies assessing offshore or agency-built code quality', 'Products planning a SOC 2 audit with no current compliance baseline'], tl: 'Full audit report in 10–15 business days' },
];

const TESTIMONIALS = [
  { text: "1Solutions built our B2B HR SaaS product from scratch — multi-tenant PostgreSQL architecture, Stripe subscription billing with usage-based pricing, SSO/SAML integration for enterprise clients, and a self-serve onboarding flow that reduced time-to-activation from 3 days to 4 hours. We hit $1M ARR within 18 months of launch. Exceptional SaaS engineering team.", name: 'Marcus T.', role: 'CEO & Co-founder, HR Tech SaaS (UK)', init: 'MT', bg: '#0a1f40' },
  { text: "We had a SaaS product built by a local agency that could not handle more than 200 concurrent users. 1Solutions diagnosed the shared-schema multi-tenancy issues, re-architected the database layer with proper RLS, introduced Redis caching, and migrated us to Kubernetes. We now handle 5,000 concurrent users without breaking a sweat. Outstanding engineering.", name: 'Priya S.', role: 'CTO, Project Management SaaS (AU)', init: 'PS', bg: '#0f2560', feat: true },
  { text: "1Solutions built our integrations marketplace — OAuth 2.0 connections to Salesforce, HubSpot, Slack, and Zapier, a developer API with rate limiting and key management, and a public docs portal. Integrations became our highest-cited reason for choosing us over competitors. Three enterprise deals closed specifically because we had the Salesforce integration.", name: 'Claire B.', role: 'VP Product, Marketing Automation SaaS (US)', init: 'CB', bg: '#1e3a5f' },
];

const WHY = [
  { t: '80+ SaaS Products Shipped', d: 'HR SaaS, CRM, project management, marketing automation, LMS, FinTech SaaS, field service management, and API-first platforms — 80+ SaaS products across B2B and B2C categories over 15+ years.' },
  { t: 'Multi-Tenancy Architecture Expertise', d: 'Shared schema with RLS, schema-per-tenant, and database-per-tenant — we know the trade-offs in depth and select the right model for your compliance requirements, tenant count, and cost constraints.' },
  { t: 'Stripe Billing Complexity', d: 'Beyond the Stripe quick-start — usage metering, seat-based pricing, volume tiers, proration edge cases, dunning and retry logic, revenue recognition, and MRR/ARR dashboards that map to investor reporting requirements.' },
  { t: 'Enterprise Readiness (SSO, SCIM, SOC 2)', d: 'The deals that push SaaS ARR over $1M typically require SSO/SAML, SCIM provisioning, audit logs, and SOC 2. We build these capabilities early so they are not blockers when the enterprise contract arrives.' },
  { t: 'Product Thinking, Not Just Engineering', d: 'We engage with your GTM context — ICP, pricing model, churn drivers — and build product features that map to business outcomes (activation rate, feature adoption, expansion revenue) rather than just shipping tickets.' },
  { t: 'Self-Serve Onboarding Depth', d: 'We have built onboarding flows for dozens of SaaS products. We know that the fastest path to activation includes progressive disclosure, smart defaults, pre-populated sample data, and an in-app checklist that drives users to the key "aha moment."' },
  { t: 'Integrations & Ecosystem Strategy', d: 'Zapier, Make, and OAuth 2.0 integration framework — plus native Slack, HubSpot, Salesforce, and CRM integrations. An integrations strategy is often the difference between a product that is embedded in the customer workflow and one that is churned.' },
  { t: 'Performance at Scale Validated', d: 'We load-test SaaS products to multiples of expected peak before launch. We have migrated SaaS products from shared hosting to multi-region Kubernetes clusters with zero downtime — database migrations included.' },
];

const FAQS = [
  { q: 'What SaaS products does 1Solutions build?', a: 'B2B and B2C SaaS products — HR and payroll SaaS, CRM and sales tools, project management, marketing automation, LMS and EdTech, FinTech SaaS, field service management, customer support tools, API-first platforms, and white-label SaaS products.' },
  { q: 'How do you architect a multi-tenant SaaS application?', a: 'We evaluate shared schema (one DB, tenant_id column — lowest cost), shared database separate schema (PostgreSQL schemas per tenant — good balance), and database-per-tenant (highest isolation, highest cost). Choice depends on compliance requirements (GDPR, HIPAA, SOC 2), data sensitivity, and tenant count. We implement row-level security (RLS) and tenant isolation testing as standard.' },
  { q: 'How long does it take to build a SaaS MVP?', a: 'A focused SaaS MVP — core feature set, auth, subscription billing, onboarding — typically takes 10–14 weeks with our team. Timeline depends on feature scope, complexity of billing model, and number of third-party integrations required.' },
  { q: 'Can you help prepare our SaaS for SOC 2 audit?', a: 'Yes — access control review, audit logging, encryption at rest and in transit, secret management (AWS Secrets Manager / Vault), dependency scanning in CI/CD, and documentation of security policies. We have supported multiple SaaS products through SOC 2 Type II audit preparation.' },
  { q: 'Can you add SSO/SAML to our existing SaaS product?', a: 'Yes — SAML 2.0 integration (Okta, Azure AD, OneLogin, Google Workspace), SCIM user provisioning and de-provisioning, and admin-configurable IdP settings per tenant. We use Auth0, Clerk, or custom implementations depending on your existing auth stack.' },
  { q: 'Do you build white-label SaaS platforms?', a: 'Yes — custom subdomain and custom domain per reseller or enterprise tenant, logo and colour theme overrides, email white-labelling, removal of product branding, reseller admin panel with client management, and reseller-specific pricing configuration.' },
  { q: 'Can you fix our multi-tenancy data isolation issues?', a: 'Yes — we audit your current tenancy model, identify cross-tenant data leak risks, implement row-level security (RLS) in PostgreSQL or equivalent isolation patterns, add integration tests that verify tenant isolation, and migrate data safely to the new model.' },
  { q: 'What tech stack do you use for SaaS products?', a: 'Frontend: React/Next.js with TypeScript. Backend: Node.js/NestJS or Python/Django/FastAPI. Database: PostgreSQL (with RLS). Auth: Auth0, Clerk, or NextAuth.js. Billing: Stripe. Analytics: Segment, Amplitude. Deployment: Kubernetes on AWS or GCP. CI/CD: GitHub Actions.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => { if (!start) return; const n = parseInt(target.replace(/\D/g, ''), 10); if (!n) return; let t0 = null; const s = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) requestAnimationFrame(s); }; requestAnimationFrame(s); }, [start, target, duration]);
  return count;
}
function StatItem({ label, val, started }) {
  const n = useCountUp(val, 1800, started);
  const sfx = val.replace(/[\d,]/g, '');
  return (<div className="sas-sc"><div className="sas-sv">{started ? n + sfx : val}</div><div className="sas-sl">{label}</div></div>);
}

export default function SaaSDevelopment() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [ss, setSs] = useState(false);
  const [vis, setVis] = useState(new Set());
  const [vSk, setVSk] = useState([]); const [vEn, setVEn] = useState([]); const [vWh, setVWh] = useState([]); const [vTe, setVTe] = useState([]); const [vSt, setVSt] = useState([]);
  const stR = useRef(null); const secR = useRef({});
  const skR = useRef(null); const enR = useRef(null); const whR = useRef(null); const teR = useRef(null); const stGr = useRef(null);
  useEffect(() => { if (!stR.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSs(true); o.disconnect(); } }, { threshold: 0.4 }); o.observe(stR.current); return () => o.disconnect(); }, []);
  useEffect(() => {
    const pairs = [[skR, SOLUTIONS.length, setVSk], [enR, 3, setVEn], [whR, WHY.length, setVWh], [teR, 3, setVTe], [stGr, TECH_STACK.length, setVSt]];
    const obs = pairs.map(([ref, count, setter]) => { if (!ref.current) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 75)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(ref.current); return o; });
    return () => obs.forEach(o => o?.disconnect());
  }, []);
  useEffect(() => { const ks = Object.keys(secR.current); const obs = ks.map(k => { const el = secR.current[k]; if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(p => new Set([...p, k])); o.disconnect(); } }, { threshold: 0.1 }); o.observe(el); return o; }); return () => obs.forEach(o => o?.disconnect()); }, []);
  const visS = showAll ? SOLUTIONS : SOLUTIONS.slice(0, 6);
  const ac = '#0f4c81'; const ac2 = '#1d4ed8'; const txt = '#0a1f3d'; const txt2 = '#1e3a6e';
  return (
    <>
      <Head>
        <title>SaaS Application Development Company | B2B SaaS, Multi-Tenant, Stripe Billing | 1Solutions</title>
        <meta name="description" content="SaaS application development company — B2B and B2C SaaS products built with multi-tenant architecture, Stripe subscription billing, SSO/SAML, self-serve onboarding, integrations marketplace, and SOC 2 compliance. 80+ SaaS products shipped. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/saas-application-development-company/" />
        <meta property="og:title" content="SaaS Application Development Company | 1Solutions" />
        <meta property="og:description" content="B2B SaaS product development — multi-tenant architecture, Stripe billing, SSO, onboarding, integrations, and SOC 2 compliance. 80+ SaaS products shipped." />
        <meta property="og:url" content="https://www.1solutions.biz/saas-application-development-company/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .sas-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 20%,#eff6ff 50%,#fef3c7 75%,#f0fdf4 100%);color:${txt};line-height:1.6;position:relative;overflow-x:hidden}
          .sas-page *,.sas-page *::before,.sas-page *::after{box-sizing:border-box}
          .sas-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .sas-o1{width:800px;height:800px;background:radial-gradient(circle,rgba(15,76,129,.16) 0%,transparent 70%);top:-220px;right:-200px}
          .sas-o2{width:700px;height:700px;background:radial-gradient(circle,rgba(29,78,216,.12) 0%,transparent 70%);bottom:0;left:-200px}
          .sas-o3{width:480px;height:480px;background:radial-gradient(circle,rgba(217,119,6,.08) 0%,transparent 70%);top:42%;left:-90px}
          .sas-bc{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .sas-bc ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:${ac}}
          .sas-bc li{display:flex;align-items:center;gap:6px}.sas-bc li::after{content:'/';opacity:.45}.sas-bc li:last-child::after{display:none}
          .sas-bc a{color:${txt};text-decoration:none}
          .sas-hero{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto;padding:44px 40px 28px}
          .sas-ey{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${ac};margin-bottom:14px}
          .sas-hero h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .sas-desc{font-size:16px;color:${txt2};line-height:1.65;max-width:720px;margin:0 auto 22px}
          .sas-tr{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-bottom:24px}
          .sas-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:5px 13px;font-size:12px;font-weight:600;color:${txt};box-shadow:0 2px 8px rgba(15,76,129,.07)}
          .sas-dot{width:7px;height:7px;border-radius:50%;background:${ac2};flex-shrink:0}
          .sas-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .sas-p{display:inline-block;padding:13px 34px;background:${ac};color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(15,76,129,.28)}
          .sas-p:hover{background:${txt};transform:translateY(-2px)}
          .sas-g{display:inline-block;padding:13px 34px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:${txt};font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .sas-g:hover{background:rgba(255,255,255,.85);border-color:rgba(15,76,129,.5);transform:translateY(-2px)}
          .sas-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:920px;margin:26px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,76,129,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .sas-sc{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,76,129,.10)}.sas-sc:last-child{border-right:none}
          .sas-sv{font-size:28px;font-weight:900;color:${ac2};letter-spacing:-.5px;line-height:1}
          .sas-sl{font-size:11px;color:${txt2};font-weight:500;margin-top:5px}
          .sas-sec{padding:72px 40px;position:relative;z-index:1}
          .sas-sec-alt{background:rgba(239,246,255,.55);border-top:1px solid rgba(15,76,129,.08);border-bottom:1px solid rgba(15,76,129,.08)}
          .sas-in{max-width:1300px;margin:0 auto}
          .sas-sey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .sas-sh{font-size:44px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .sas-sd{font-size:15px;color:${txt2};line-height:1.7;max-width:700px}
          .sas-rv{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .sas-rv.sas-ok{opacity:1;transform:translateY(0)}
          .sas-sk-g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
          .sas-card{background:linear-gradient(135deg,rgba(239,246,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,76,129,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),border-color .2s}
          .sas-card.sas-cv{opacity:1;transform:translateY(0)}.sas-card.sas-cv:hover{transform:translateY(-5px);border-color:rgba(15,76,129,.25);box-shadow:0 14px 40px rgba(15,76,129,.12)}
          .sas-card.feat{border-color:rgba(15,76,129,.18)}
          .sas-cn{position:absolute;top:6px;right:12px;font-size:68px;font-weight:900;line-height:1;color:${ac2};opacity:.05;pointer-events:none;user-select:none}
          .sas-card h3{font-size:15px;font-weight:700;color:${txt};margin:0 0 7px;position:relative;z-index:1}
          .sas-card p{font-size:13px;color:${txt2};line-height:1.65;margin:0;position:relative;z-index:1}
          .sas-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,${ac},${ac2});border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top;transition:transform .3s}
          .sas-card.sas-cv:hover::before{transform:scaleY(1)}
          .sas-sm{text-align:center;margin-top:20px}
          .sas-bm{display:inline-block;background:#fff;border:1.5px solid rgba(15,76,129,.18);color:${txt};padding:9px 28px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .sas-bm:hover{background:${ac};border-color:${ac};color:#fff;transform:translateY(-2px)}
          .sas-tec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
          .sas-tc2{background:linear-gradient(135deg,rgba(239,246,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:20px 18px;box-shadow:0 4px 24px rgba(15,76,129,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .sas-tc2.sas-sv2{opacity:1;transform:translateY(0)}.sas-tc2.sas-sv2:hover{border-color:rgba(15,76,129,.22);box-shadow:0 12px 36px rgba(15,76,129,.10)}
          .sas-tg{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:10px;padding-bottom:7px;border-bottom:2px solid}
          .sas-pills{display:flex;flex-wrap:wrap;gap:5px}
          .sas-pill{display:inline-block;font-size:11px;font-weight:500;padding:3px 9px;border-radius:100px;border:1px solid}
          .sas-en-g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
          .sas-en{background:linear-gradient(135deg,rgba(239,246,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,76,129,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1),border-color .2s}
          .sas-en.sas-ev{opacity:1;transform:translateY(0)}.sas-en.sas-ev:hover{border-color:rgba(15,76,129,.22);box-shadow:0 14px 44px rgba(15,76,129,.12)}
          .sas-en.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(239,246,255,.45) 100%);border-color:rgba(217,119,6,.26);transform:translateY(-6px)}
          .sas-en.feat.sas-ev{transform:translateY(-6px)}.sas-en.feat.sas-ev:hover{transform:translateY(-10px)}
          .sas-en-b{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:4px 11px;border-radius:100px;border:1px solid;margin-bottom:16px}
          .sas-en-i{width:44px;height:44px;background:rgba(15,76,129,.08);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
          .sas-en.feat .sas-en-i{background:rgba(217,119,6,.10)}
          .sas-en-n{font-size:20px;font-weight:900;color:${txt};margin:0 0 5px;letter-spacing:-.3px}
          .sas-en-h{font-size:13px;font-weight:600;color:${ac};margin-bottom:10px}
          .sas-en.feat .sas-en-h{color:#D97706}
          .sas-en-d{font-size:13px;color:${txt2};line-height:1.7;margin-bottom:14px}
          .sas-en-ll{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${ac};margin-bottom:7px}
          .sas-en-li{list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:6px}
          .sas-en-li li{display:flex;align-items:flex-start;gap:7px;font-size:13px;color:#374151;line-height:1.5}
          .sas-en-li li::before{content:'✓';font-weight:800;color:${ac2};flex-shrink:0;margin-top:1px}
          .sas-en.feat .sas-en-li li::before{color:#D97706}
          .sas-en-tl{font-size:11px;font-weight:600;color:#D97706;display:block;padding-top:10px;border-top:1px solid rgba(15,76,129,.08)}
          .sas-en-a{display:block;margin-top:14px;padding:10px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,76,129,.09);color:${txt};border:1.5px solid rgba(15,76,129,.18)}
          .sas-en-a:hover{background:${txt};color:#fff}
          .sas-en.feat .sas-en-a{background:${ac};color:#fff;border-color:${ac}}
          .sas-en.feat .sas-en-a:hover{background:${txt};border-color:${txt}}
          .sas-tg2{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
          .sas-tc{background:linear-gradient(135deg,rgba(239,246,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:26px 22px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 24px rgba(15,76,129,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
          .sas-tc.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(239,246,255,.42) 100%);border-color:rgba(217,119,6,.20)}
          .sas-tc.sas-tv{opacity:1;transform:translateY(0)}.sas-tc.sas-tv:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(15,76,129,.12)}
          .sas-stars{font-size:15px;color:#D97706;letter-spacing:2px}
          .sas-ttxt{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .sas-au{display:flex;align-items:center;gap:11px}
          .sas-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .sas-an{font-size:14px;font-weight:700;color:${txt}}
          .sas-ar{font-size:12px;color:#6b7280}
          .sas-wy-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px}
          .sas-wc{background:linear-gradient(135deg,rgba(239,246,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:22px 18px;box-shadow:0 4px 24px rgba(15,76,129,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px) scale(.97);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .sas-wc.sas-wv{opacity:1;transform:translateY(0) scale(1)}.sas-wc.sas-wv:hover{transform:translateY(-4px) scale(1);border-color:rgba(15,76,129,.22);box-shadow:0 12px 36px rgba(15,76,129,.10)}
          .sas-wd{width:9px;height:9px;border-radius:50%;background:${ac2};margin-bottom:10px}
          .sas-wc h3{font-size:13px;font-weight:700;color:${txt};margin:0 0 7px;line-height:1.35}
          .sas-wc p{font-size:12px;color:${txt2};line-height:1.6;margin:0}
          .sas-ct{padding:64px 40px;background:linear-gradient(135deg,rgba(239,246,255,.55) 0%,rgba(255,255,255,.60) 40%,rgba(240,253,244,.50) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .sas-ct-g{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;gap:28px;align-items:start}
          .sas-cth{font-size:38px;font-weight:900;line-height:1.18;margin:0 0 12px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .sas-ctd{font-size:14px;color:${txt2};line-height:1.6;margin:0 0 18px}
          .sas-ben{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px}
          .sas-be{display:flex;gap:9px;align-items:flex-start}
          .sas-bi{flex-shrink:0;color:${ac2};font-weight:800;font-size:15px;margin-top:1px}
          .sas-be p{font-size:13px;color:${txt2};margin:0;line-height:1.5}
          .sas-fb{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(239,246,255,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:18px;padding:30px;box-shadow:0 8px 40px rgba(15,76,129,.08),inset 0 1px 0 rgba(255,255,255,1)}
          .sas-fb h3{font-size:20px;font-weight:700;color:${txt};margin:0 0 20px}
          .sas-form{display:flex;flex-direction:column;gap:12px}
          .sas-fr{display:grid;grid-template-columns:1fr 1fr;gap:11px}
          .sas-fg{display:flex;flex-direction:column;gap:4px}
          .sas-fg.full{grid-column:1/-1}
          .sas-fg label{font-size:12px;font-weight:500;color:${txt}}
          .sas-fg input,.sas-fg textarea,.sas-fg select{padding:10px 12px;border:1px solid rgba(15,76,129,.14);border-radius:6px;font-size:13px;font-family:inherit;color:${txt};background:rgba(255,255,255,.55);transition:border-color .2s}
          .sas-fg input:focus,.sas-fg textarea:focus,.sas-fg select:focus{outline:none;border-color:${ac2};box-shadow:0 0 0 3px rgba(29,78,216,.10)}
          .sas-co{display:flex;gap:8px;align-items:flex-start}
          .sas-co input{margin-top:3px;width:14px;height:14px}
          .sas-co label{font-size:11px;color:${txt2};line-height:1.5}.sas-co a{color:${txt}}
          .sas-sub{width:100%;padding:13px;background:${ac};border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(15,76,129,.25)}
          .sas-sub:hover{background:${txt};transform:translateY(-2px)}
          .sas-fq{padding:72px 40px;background:rgba(239,246,255,.55);border-top:1px solid rgba(15,76,129,.08);position:relative;z-index:1}
          .sas-fq h2{font-size:42px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .sas-fq-sub{font-size:15px;color:${txt2};margin:0 0 32px}
          .sas-fql{display:flex;flex-direction:column;gap:9px}
          .sas-fi{background:linear-gradient(135deg,rgba(239,246,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(15,76,129,.05);transition:border-color .2s}
          .sas-fi.open{border-color:rgba(15,76,129,.28)}.sas-fi.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,${ac},${ac2});border-radius:3px 3px 0 0}
          .sas-fqb{width:100%;background:none;border:none;padding:18px 18px 18px 52px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:12px;font-family:inherit;position:relative}
          .sas-fqn{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:rgba(15,76,129,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:5px}
          .sas-fi.open .sas-fqn{background:${ac};color:#fff}
          .sas-fqb span{font-size:14px;font-weight:600;color:${txt};line-height:1.4}.sas-fi.open .sas-fqb span{color:${ac}}
          .sas-fch{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform .3s}.sas-fi.open .sas-fch{transform:rotate(180deg);color:${ac2}}
          .sas-faw{overflow:hidden;transition:max-height .35s ease;max-height:0}.sas-fi.open .sas-faw{max-height:400px}
          .sas-fa{padding:0 18px 18px 52px;font-size:14px;color:#4b5563;line-height:1.8}
          .sas-rel{padding:64px 40px;background:rgba(239,246,255,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .sas-ri{max-width:1300px;margin:0 auto;text-align:center}
          .sas-ri h2{font-size:30px;font-weight:900;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 10px}
          .sas-ri hr{border:none;border-top:1px solid rgba(15,76,129,.10);margin:24px 0}
          .sas-rts{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
          .sas-rt{display:inline-block;padding:9px 18px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all .22s}
          .sas-rt:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.08)}
          .sas-ra{background:rgba(15,76,129,.09);border-color:rgba(15,76,129,.28);color:#0f4c81}
          .sas-rb{background:rgba(45,27,105,.09);border-color:rgba(45,27,105,.28);color:#2d1b69}
          .sas-rc{background:rgba(120,53,15,.09);border-color:rgba(120,53,15,.28);color:#78350f}
          .sas-rd{background:rgba(20,83,45,.09);border-color:rgba(20,83,45,.28);color:#14532d}
          @media(max-width:1024px){.sas-hero h1,.sas-sh,.sas-fq h2{font-size:34px}.sas-sk-g{grid-template-columns:repeat(2,1fr)}.sas-tec-g{grid-template-columns:repeat(2,1fr)}.sas-en-g{grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto}.sas-en.feat{transform:none}.sas-en.feat.sas-ev{transform:none}.sas-en.feat.sas-ev:hover{transform:translateY(-4px)}.sas-wy-g{grid-template-columns:repeat(2,1fr)}.sas-tg2{grid-template-columns:1fr}.sas-ct-g{grid-template-columns:1fr}}
          @media(max-width:768px){.sas-bc,.sas-hero,.sas-sec,.sas-ct,.sas-fq,.sas-rel{padding-left:20px;padding-right:20px}.sas-hero{padding-top:28px;padding-bottom:16px}.sas-hero h1{font-size:26px}.sas-stats{grid-template-columns:1fr 1fr}.sas-sc:nth-child(2){border-right:none}.sas-sc:nth-child(3),.sas-sc:nth-child(4){border-top:1px solid rgba(15,76,129,.10)}.sas-sc:nth-child(4){border-right:none}.sas-sk-g,.sas-tec-g,.sas-wy-g{grid-template-columns:1fr}.sas-fr{grid-template-columns:1fr}.sas-cth{font-size:26px}}
        `}</style>
      </Head>
      <div className="sas-page">
        <div className="sas-orb sas-o1" /><div className="sas-orb sas-o2" /><div className="sas-orb sas-o3" />
        <nav className="sas-bc" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList"><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li><li><span>Industries</span></li><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">SaaS Development</span><meta itemProp="position" content="3" /></li></ol></nav>
        <section className="sas-hero">
          <span className="sas-ey">SaaS Industry</span>
          <h1>SaaS Application Development Company — B2B SaaS, Multi-Tenant Architecture & Stripe Billing</h1>
          <p className="sas-desc">1Solutions builds B2B and B2C SaaS products — multi-tenant architecture (PostgreSQL RLS, schema-per-tenant), Stripe subscription billing, SSO/SAML enterprise auth, self-serve onboarding, integrations marketplace, white-labelling, and SOC 2 compliance. 80+ SaaS products shipped. 15+ years.</p>
          <div className="sas-tr">{['Multi-Tenant Architecture','Stripe Subscription Billing','SSO/SAML Enterprise Auth','Self-Serve Onboarding','SOC 2 Compliance'].map(b => (<div className="sas-badge" key={b}><span className="sas-dot" />{b}</div>))}</div>
          <div className="sas-ctas"><Link href="#contact" className="sas-p">Discuss Your SaaS Product</Link><Link href="#solutions" className="sas-g">View Solutions →</Link></div>
        </section>
        <div className="sas-stats" ref={stR}>{[['80+','SaaS Products Shipped'],['15+','Years Dev Experience'],['$1M+','Avg ARR Reached by Clients'],['99.9%','Platform Uptime SLA']].map(([v, l]) => <StatItem key={l} label={l} val={v} started={ss} />)}</div>
        <section id="solutions" className="sas-sec"><div className="sas-in"><div className={`sas-rv${vis.has('sk') ? ' sas-ok' : ''}`} ref={el => { secR.current['sk'] = el; }}><span className="sas-sey">SaaS Solutions</span><h2 className="sas-sh">What We Build for SaaS Companies</h2><p className="sas-sd">SaaS MVP, multi-tenancy architecture, Stripe billing, onboarding flows, integrations, white-labelling, analytics, admin tooling, performance, and SOC 2 compliance engineering.</p></div><div className="sas-sk-g" ref={skR}>{visS.map((s, i) => (<div key={s.n} className={`sas-card${s.feat ? ' feat' : ''}${vSk.includes(i) ? ' sas-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="sas-cn">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>{SOLUTIONS.length > 6 && <div className="sas-sm"><button className="sas-bm" onClick={() => setShowAll(p => !p)}>{showAll ? 'Show fewer ↑' : `Show all ${SOLUTIONS.length} solutions ↓`}</button></div>}</div></section>
        <section className="sas-sec sas-sec-alt"><div className="sas-in"><div className={`sas-rv${vis.has('stk') ? ' sas-ok' : ''}`} ref={el => { secR.current['stk'] = el; }}><span className="sas-sey">Technology Stack</span><h2 className="sas-sh">SaaS Technology We Use</h2><p className="sas-sd">React/Next.js, Node.js/NestJS, PostgreSQL with RLS, Stripe, Auth0/Clerk, Kubernetes, Segment, and the full modern SaaS stack.</p></div><div className="sas-tec-g" ref={stGr}>{TECH_STACK.map((g, i) => (<div key={g.group} className={`sas-tc2${vSt.includes(i) ? ' sas-sv2' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="sas-tg" style={{ color: g.color, borderBottomColor: g.color + '33' }}>{g.group}</div><div className="sas-pills">{g.items.map(it => <span key={it} className="sas-pill" style={{ color: g.color, background: g.color + '12', borderColor: g.color + '30' }}>{it}</span>)}</div></div>))}</div></div></section>
        <section className="sas-sec"><div className="sas-in"><div className={`sas-rv${vis.has('eng') ? ' sas-ok' : ''}`} ref={el => { secR.current['eng'] = el; }}><span className="sas-sey">Engagement Models</span><h2 className="sas-sh">How We Work with SaaS Companies</h2><p className="sas-sd">Full SaaS product build, scale and modernisation engineering, or independent technical audit — matched to your product stage.</p></div><div className="sas-en-g" ref={enR}>{ENGAGEMENT.map((m, i) => (<div key={m.id} className={`sas-en${m.feat ? ' feat' : ''}${vEn.includes(i) ? ' sas-ev' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><span className="sas-en-b" style={{ color: m.bc, borderColor: m.bc + '44', background: m.bc + '14' }}>{m.badge}</span><div className="sas-en-i"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={m.feat ? '#D97706' : ac2} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg></div><div className="sas-en-n">{m.name}</div><div className="sas-en-h">{m.headline}</div><div className="sas-en-d">{m.desc}</div><div className="sas-en-ll">Best for</div><ul className="sas-en-li">{m.best.map(b => <li key={b}>{b}</li>)}</ul><span className="sas-en-tl">{m.tl}</span><Link href="#contact" className="sas-en-a">Get a free estimate →</Link></div>))}</div></div></section>
        <section className="sas-sec sas-sec-alt"><div className="sas-in"><div className={`sas-rv${vis.has('ts') ? ' sas-ok' : ''}`} ref={el => { secR.current['ts'] = el; }}><span className="sas-sey">Client Outcomes</span><h2 className="sas-sh">SaaS Clients</h2><p className="sas-sd">Founders and CTOs on building SaaS products with 1Solutions.</p></div><div className="sas-tg2" ref={teR}>{TESTIMONIALS.map((t, i) => (<div key={i} className={`sas-tc${t.feat ? ' feat' : ''}${vTe.includes(i) ? ' sas-tv' : ''}`} style={{ transitionDelay: `${i * 90}ms` }} itemScope itemType="https://schema.org/Review"><div className="sas-stars">★★★★★</div><p className="sas-ttxt" itemProp="reviewBody">{t.text}</p><div className="sas-au"><div className="sas-av" style={{ background: t.bg }}>{t.init}</div><div><div className="sas-an" itemProp="author">{t.name}</div><div className="sas-ar">{t.role}</div></div></div></div>))}</div></div></section>
        <section className="sas-sec"><div className="sas-in"><div className={`sas-rv${vis.has('wy') ? ' sas-ok' : ''}`} ref={el => { secR.current['wy'] = el; }}><span className="sas-sey">Why 1Solutions</span><h2 className="sas-sh">Why SaaS Companies Choose 1Solutions</h2><p className="sas-sd">80+ SaaS products shipped — multi-tenancy depth, Stripe billing complexity, enterprise SSO/SOC 2, product-led thinking, integrations ecosystem, and validated scale engineering.</p></div><div className="sas-wy-g" ref={whR}>{WHY.map((c, i) => (<div key={i} className={`sas-wc${vWh.includes(i) ? ' sas-wv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="sas-wd" /><h3>{c.t}</h3><p>{c.d}</p></div>))}</div></div></section>
        <section id="contact" className="sas-ct"><div className="sas-ct-g"><div><h2 className="sas-cth">Build Your SaaS Product</h2><p className="sas-ctd">Share your SaaS requirements and we will respond within 24 hours with a proposal, architecture recommendation, and team composition.</p><div className="sas-ben">{[['✓','Technical proposal within 24–48 hours'],['✓','SaaS architects with 80+ products shipped'],['✓','NDA signed before any technical discussions'],['✓','Multi-tenant, Stripe billing, SSO, SOC 2 specialists'],['✓','MVP in 10–14 weeks; full v1 in 5–7 months']].map(([ic, tx]) => (<div className="sas-be" key={tx}><span className="sas-bi">{ic}</span><p>{tx}</p></div>))}</div></div>
        <div className="sas-fb"><h3>Tell Us About Your SaaS Product</h3><form className="sas-form" onSubmit={e => e.preventDefault()}><div className="sas-fr"><div className="sas-fg"><label>Full Name *</label><input type="text" placeholder="Your name" required /></div><div className="sas-fg"><label>Work Email *</label><input type="email" placeholder="you@company.com" required /></div></div><div className="sas-fr"><div className="sas-fg"><label>Company</label><input type="text" placeholder="Company name" /></div><div className="sas-fg"><label>Phone / WhatsApp</label><input type="tel" placeholder="+1 555 000 0000" /></div></div><div className="sas-fg full"><label>SaaS Category *</label><select required><option value="">Select...</option><option>HR / Payroll SaaS</option><option>CRM / Sales SaaS</option><option>Project Management</option><option>Marketing Automation</option><option>LMS / EdTech SaaS</option><option>FinTech SaaS</option><option>Field Service Management</option><option>Customer Support / Helpdesk</option><option>API-First / Developer Tools</option><option>White-Label SaaS Platform</option><option>Other B2B SaaS</option><option>B2C SaaS</option></select></div><div className="sas-fg full"><label>Project Description *</label><textarea rows={4} placeholder="Describe your SaaS product — target users, core features, billing model (seat-based, usage-based, flat), integrations needed, and go-live timeline..." required /></div><div className="sas-co"><input type="checkbox" required /><label>I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label></div><button type="submit" className="sas-sub">Get a SaaS Architecture Proposal →</button></form></div></div></section>
        <section className="sas-fq"><div className="sas-in" style={{ maxWidth: 840 }}><span className="sas-sey">FAQ</span><h2>SaaS Development — FAQ</h2><p className="sas-fq-sub">Multi-tenancy, Stripe billing, SSO, SOC 2, and SaaS architecture questions answered.</p><div className="sas-fql">{FAQS.map((f, i) => (<div key={i} className={`sas-fi${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="sas-fqb" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="sas-fqn">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{f.q}</span><svg className="sas-fch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="sas-faw"><div className="sas-fa" itemProp="text">{f.a}</div></div></div>))}</div></div></section>
        <section className="sas-rel"><div className="sas-ri"><span className="sas-sey">Related Services</span><h2>Related Industry & Technology Services</h2><hr /><div className="sas-rts">{[['/fintech-software-development-company/','FinTech Software','sas-ra'],['/healthcare-software-development/','Healthcare Software','sas-rb'],['/it-outsourcing-services/','IT Outsourcing','sas-rc'],['/offshore-development-company/','Offshore Development','sas-rd'],['/web-development/','Web Development','sas-ra'],['/mobile-app-development/','Mobile App Development','sas-rb'],['/ai-ml-development/','AI/ML Development','sas-rc'],['/api-development/','API Development','sas-rd']].map(([hr, lb, cl]) => (<Link key={hr} href={hr} className={`sas-rt ${cl}`}>{lb}</Link>))}</div></div></section>
      </div>
    </>
  );
}
