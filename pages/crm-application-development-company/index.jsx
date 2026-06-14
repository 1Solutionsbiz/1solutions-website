'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

/* ─── Schema ─────────────────────────────────────────────────── */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'CRM Application Development Company', item: 'https://www.1solutions.biz/crm-application-development-company/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'CRM Application Development',
      url: 'https://www.1solutions.biz/crm-application-development-company/',
      description: 'Custom CRM application development — sales pipeline automation, marketing CRM, customer service portals, CRM integration with ERP and third-party APIs, mobile CRM apps, AI-powered lead scoring, and white-label CRM platforms for SaaS companies.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '117', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why build a custom CRM instead of using Salesforce or HubSpot?', acceptedAnswer: { '@type': 'Answer', text: 'Off-the-shelf CRMs like Salesforce and HubSpot are powerful but come with significant trade-offs: high per-seat licensing costs that scale steeply, complex configuration layers that rarely map cleanly to your actual sales process, and limited flexibility for industry-specific workflows. A custom CRM is built precisely around your pipeline stages, customer data model, team hierarchy, and integration requirements — with no per-seat fees, no feature bloat, and full ownership of your data and code.' } },
        { '@type': 'Question', name: 'How long does custom CRM development take?', acceptedAnswer: { '@type': 'Answer', text: 'A core CRM with contact and account management, a custom sales pipeline, activity tracking, basic reporting, and user roles typically takes 14–18 weeks. Adding marketing automation, a customer service ticketing module, or mobile apps adds 6–10 weeks per module. Full-featured enterprise CRM platforms with AI lead scoring, advanced analytics, and multi-tenant architecture typically take 6–12 months. We provide milestone-based estimates after a free discovery session.' } },
        { '@type': 'Question', name: 'Can you integrate a custom CRM with our existing ERP or third-party tools?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. CRM integration is one of our core specialisations. We have built bidirectional integrations with ERP systems (SAP, Oracle NetSuite, Microsoft Dynamics), marketing platforms (Mailchimp, Klaviyo, ActiveCampaign), telephony (Twilio, RingCentral, Aircall), support desks (Zendesk, Freshdesk), eCommerce platforms (Shopify, WooCommerce), and accounting tools (QuickBooks, Xero). We build integration layers using REST APIs, webhooks, and message queues for reliable, real-time data synchronisation.' } },
        { '@type': 'Question', name: 'Do you build mobile CRM applications?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We develop native iOS and Android mobile CRM apps using Flutter or React Native, with offline-first architecture so your sales team can access contact data, log calls, update pipeline stages, and add notes without connectivity. Real-time sync with the backend CRM occurs automatically when back online. Push notifications for follow-up reminders, deal stage changes, and new lead assignments are also included.' } },
        { '@type': 'Question', name: 'Can you build a white-label CRM we can resell to clients?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Multi-tenant, white-label CRM development is a core service. We build CRM platforms with per-tenant custom domain support, isolated data environments, configurable branding (logo, colours, fonts), subscription billing integration (Stripe, Razorpay), and a self-service tenant onboarding flow. Full source code and IP ownership is retained by you. We have delivered white-label CRM platforms for agencies, SaaS companies, and industry-vertical software providers.' } },
        { '@type': 'Question', name: 'Do you migrate data from Salesforce, HubSpot, or Zoho to a custom CRM?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We handle full CRM data migrations from Salesforce, HubSpot, Zoho, Pipedrive, Microsoft Dynamics, SugarCRM, and other platforms. This includes contacts, accounts, deals/opportunities, activity history, notes, attachments, custom field mapping, and relationship data. We run migrations in a staging environment first, validate data integrity, and perform a final delta sync before cutover to minimise data loss risk.' } },
      ],
    },
  ],
};

/* ─── Page data ──────────────────────────────────────────────── */
const SERVICES = [
  { n: '01', title: 'Custom CRM Development', desc: 'End-to-end custom CRM platforms built around your exact sales process — contact and account management, custom pipeline stages, activity logging, deal tracking, role-based access control, and branded user portals.' },
  { n: '02', title: 'Sales Pipeline & Automation', desc: 'Visual drag-and-drop sales pipelines with automated stage transitions, follow-up reminders, deal scoring, email sequence triggers, task auto-assignment, and sales performance dashboards for managers and reps.', feat: true },
  { n: '03', title: 'CRM Integration & API Connectivity', desc: 'Bidirectional CRM integrations with ERP systems (SAP, NetSuite), marketing platforms (Mailchimp, Klaviyo), telephony (Twilio, Aircall), support desks (Zendesk), eCommerce (Shopify, WooCommerce), and accounting tools (QuickBooks, Xero).' },
  { n: '04', title: 'Marketing Automation CRM', desc: 'CRM modules covering lead capture, lead nurturing workflows, email drip campaigns, landing page integration, lead scoring models, UTM tracking, campaign ROI reporting, and audience segmentation for targeted outreach.' },
  { n: '05', title: 'Customer Service & Support CRM', desc: 'Integrated support ticketing within the CRM — multi-channel inbox (email, chat, phone), SLA tracking, escalation rules, customer satisfaction (CSAT) surveys, knowledge base, and agent performance analytics.' },
  { n: '06', title: 'Mobile CRM Applications', desc: 'Native iOS and Android mobile CRM apps with offline-first architecture — access contacts, update deals, log calls, add notes, and receive push notifications for follow-up reminders anywhere, syncing automatically when back online.' },
  { n: '07', title: 'AI-Powered Lead Scoring & Analytics', desc: 'Machine learning lead scoring models that rank inbound leads by conversion probability based on firmographic data, engagement history, and behavioural signals — helping sales teams prioritise the right prospects at the right time.' },
  { n: '08', title: 'CRM Analytics & Reporting Dashboards', desc: 'Custom CRM reporting with real-time sales dashboards, funnel conversion analytics, forecast accuracy tracking, rep leaderboards, customer lifetime value (CLV) reporting, and scheduled executive summaries.' },
  { n: '09', title: 'White-Label CRM for SaaS & Agencies', desc: 'Multi-tenant white-label CRM platforms with per-tenant domain, isolated data, configurable branding, subscription billing, and self-service onboarding — built for agencies and SaaS companies to resell under their own brand.' },
  { n: '10', title: 'CRM Migration & Legacy System Modernisation', desc: 'Full CRM data migrations from Salesforce, HubSpot, Zoho, Pipedrive, or any legacy system — with contact, account, deal, activity history, and custom field mapping, staged validation, and zero-downtime cutover.' },
];

const TECH_STACK = [
  {
    group: 'Backend Development',
    color: '#0891b2',
    items: ['Node.js / Express', 'Python / Django', 'PHP / Laravel', 'Java / Spring Boot', 'Go (Golang)', 'GraphQL / REST APIs'],
  },
  {
    group: 'Frontend Development',
    color: '#0e7490',
    items: ['React.js', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
  },
  {
    group: 'Mobile CRM',
    color: '#3858e9',
    items: ['Flutter', 'React Native', 'Swift (iOS)', 'Kotlin (Android)', 'Offline-first sync', 'Push Notifications'],
  },
  {
    group: 'CRM Integrations',
    color: '#D97706',
    items: ['Salesforce API', 'HubSpot API', 'Zoho CRM API', 'Microsoft Dynamics', 'Twilio / Aircall', 'Mailchimp / Klaviyo'],
  },
  {
    group: 'AI / ML & Analytics',
    color: '#f97316',
    items: ['Lead Scoring ML', 'Predictive Analytics', 'NLP (Sentiment Analysis)', 'OpenAI / LLM Integration', 'Recommendation Engines', 'Power BI / Metabase'],
  },
  {
    group: 'Databases & Search',
    color: '#14b8a6',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis (caching)', 'Elasticsearch', 'ClickHouse (analytics)'],
  },
  {
    group: 'Cloud & DevOps',
    color: '#6366f1',
    items: ['AWS (EC2, RDS, Lambda)', 'Azure', 'Google Cloud', 'Docker / Kubernetes', 'CI/CD (GitHub Actions)', 'Terraform'],
  },
  {
    group: 'Security & Compliance',
    color: '#7c3aed',
    items: ['GDPR / CCPA Compliant', 'Role-based Access (RBAC)', 'OAuth2 / SSO (SAML)', 'Data Encryption (AES-256)', 'Audit Logs', 'SOC 2 Ready'],
  },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'dedicated',
    name: 'Dedicated Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'Your offshore CRM engineering team. Full-time. Fully yours.',
    desc: 'A dedicated squad of CRM specialists — backend engineer, frontend developer, mobile developer, QA, and DevOps — working exclusively on your CRM product at a fraction of US/UK/AU hiring cost. Full IP ownership retained by you.',
    bestFor: ['Long-term CRM product development', 'Growing SaaS CRM platform', 'Replacing or augmenting an in-house CRM team', 'White-label CRM built for resale'],
    process: 'Team assembly → Onboarding → Weekly sprint delivery → Continuous roadmap',
    timeline: 'Ongoing — scale up or down each quarter',
  },
  {
    id: 'fixed',
    name: 'Fixed Price',
    badge: 'Well-defined projects',
    badgeColor: '#0891b2',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Agreed price. Agreed scope. Delivered on time.',
    desc: 'Ideal for well-scoped CRM projects — a core CRM build, a specific integration module, a CRM migration, or a reporting dashboard. We agree on deliverables, price, and timeline upfront with milestone-based delivery and full transparency.',
    bestFor: ['Core CRM MVP build', 'Specific CRM integration (ERP, telephony)', 'CRM data migration from Salesforce/HubSpot', 'Custom analytics and reporting module'],
    process: 'Detailed spec → Fixed quote → Milestone delivery → Sign-off',
    timeline: 'Best for projects 8–24 weeks',
  },
  {
    id: 'tm',
    name: 'Time & Material',
    badge: 'Agile & flexible',
    badgeColor: '#f97316',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Pay for hours worked. Adapt as scope evolves.',
    desc: 'Billed on actual time and resources used. Best for early-stage CRM startups iterating rapidly on user feedback, or for adding AI features, new integration connectors, or analytics modules to an existing CRM platform.',
    bestFor: ['CRM MVP with evolving requirements', 'Adding AI lead scoring or automation', 'Exploratory integration or API prototyping', 'CRM audit, performance, or security review'],
    process: 'Sprint planning → Biweekly delivery → Iterative refinement → Transparent timesheets',
    timeline: 'Start in 1 week — no lengthy onboarding',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'CRM Discovery & Workflow Mapping', desc: 'We map your sales process, customer lifecycle stages, team hierarchy, data model requirements, and integration touchpoints before any development begins. This discovery phase prevents expensive rework and ensures the CRM reflects how your business actually operates.' },
  { num: '02', title: 'Architecture Design & Data Modelling', desc: 'Our architects design a scalable, multi-tenant-ready data architecture with a custom entity-relationship model covering contacts, accounts, deals, activities, and your specific business objects — plus an API layer designed for future integration extensibility.' },
  { num: '03', title: 'Agile CRM Development — Core Modules First', desc: 'Development begins with the CRM core (contacts, pipeline, activities, roles) and expands in sprint cycles. Frontend, backend, and mobile streams run in parallel. Each sprint delivers working, stageable features reviewed directly by your team.' },
  { num: '04', title: 'Integration Development & API Connectivity', desc: 'We build and test all required integrations — ERP, marketing automation, telephony, support desk, eCommerce, and accounting tools — using REST APIs, webhooks, and message queues, with full error handling, retry logic, and integration monitoring.' },
  { num: '05', title: 'QA, User Acceptance Testing & Data Migration', desc: 'Systematic functional and regression testing, cross-browser and mobile QA, security and penetration testing, and load testing for concurrent user scenarios. For migrations, we run a full data validation pass in staging before final cutover.' },
  { num: '06', title: 'Launch, Training & Ongoing Optimisation', desc: 'Zero-downtime production deployment with staged rollout, admin and user training sessions, real-time performance monitoring, and tiered SLA-backed post-launch support. Feature releases continue on a defined sprint cadence after go-live.' },
];

const TESTIMONIALS = [
  {
    text: "We replaced Salesforce with a custom CRM built by 1Solutions and saved over $180,000 a year in licensing. The new platform matches our exact sales workflow, integrates directly with our ERP and telephony, and our sales team adopted it without friction. Best technology decision of the year.",
    name: 'Marcus D.', role: 'VP Sales, B2B SaaS Company (US)', init: 'MD', bg: '#0F3460',
  },
  {
    text: "1Solutions built our multi-tenant white-label CRM from scratch. We resell it to 40+ agencies and it handles everything — custom domains, isolated data, subscription billing, and configurable branding. The platform is rock-solid and they continue to deliver new features on schedule.",
    name: 'Fiona L.', role: 'CEO, Agency Software Platform (UK)', init: 'FL', bg: '#0e4a5f', feat: true,
  },
  {
    text: "Our real estate business needed a CRM with property pipeline stages, automated email sequences, and a mobile app for agents in the field. 1Solutions built exactly that — including a Twilio integration for call logging — in 16 weeks. Conversions improved 34% in the first quarter.",
    name: 'Rahul P.', role: 'Director, Real Estate Group (AU)', init: 'RP', bg: '#1a4a3a',
  },
];

const WHY_CARDS = [
  { title: '15+ Years CRM & Enterprise App Expertise', desc: 'We have been building CRM systems, sales automation tools, and customer data platforms since 2008 — across B2B SaaS, real estate, financial services, healthcare, retail, and professional services.' },
  { title: 'Built Around Your Workflow, Not a Template', desc: 'Every CRM we build starts with a deep workflow mapping session. We model your pipeline stages, deal objects, custom fields, team hierarchy, and automation rules from scratch — not from a rigid template.' },
  { title: 'Deep Integration Experience', desc: 'We have built CRM integrations with 50+ third-party platforms — ERP systems, marketing tools, telephony providers, support desks, eCommerce platforms, and accounting software — using REST APIs, webhooks, and event queues.' },
  { title: 'AI & Predictive Analytics Ready', desc: 'We integrate machine learning lead scoring, predictive churn models, NLP-based sentiment analysis on customer interactions, and AI-powered next-best-action recommendations directly into the CRM workflow.' },
  { title: 'No Per-Seat Licensing. Ever.', desc: 'A custom CRM eliminates per-seat SaaS fees permanently. For most organisations, the development investment pays back within 12–18 months. After that, your CRM costs only what infrastructure and support require.' },
  { title: 'GDPR, CCPA & SOC 2 Ready', desc: 'We architect CRM platforms with RBAC, AES-256 data encryption at rest and in transit, comprehensive audit logs, data retention policies, right-to-erasure workflows, and consent management — compliant with GDPR, CCPA, and SOC 2 requirements.' },
  { title: 'US / UK / AU Market Expertise', desc: 'We serve B2B SaaS companies, agencies, professional services firms, and enterprise sales teams across North America, Europe, and Australia — adapting CRM data models to regional compliance and sales culture nuances.' },
  { title: 'Transparent Delivery, Full Ownership', desc: 'Fortnightly demos, weekly sprint reports, shared task boards, and direct developer access on Slack or Teams. All source code, data, and IP are 100% yours from day one — no vendor lock-in.' },
];

const FAQS = [
  { q: 'Why build a custom CRM instead of using Salesforce or HubSpot?', a: 'Off-the-shelf CRMs like Salesforce and HubSpot are powerful but expensive and inflexible at scale. Per-seat licensing costs escalate steeply as your team grows, configuration layers rarely map cleanly to your actual sales process, and customisation quickly requires specialist consultants at high day rates. A custom CRM is built precisely around your pipeline stages, customer data model, team hierarchy, and integration requirements — with no per-seat fees, no feature bloat, and full ownership of your data and code. For most organisations, the investment pays back in 12–18 months.' },
  { q: 'How long does custom CRM development take?', a: 'A core CRM with contact and account management, a custom sales pipeline, activity tracking, basic reporting, and user roles typically takes 14–18 weeks. Adding marketing automation, a customer service ticketing module, or mobile apps adds 6–10 weeks per module. A full-featured enterprise CRM with AI lead scoring, advanced analytics, and multi-tenant white-label architecture typically takes 6–12 months. We provide milestone-based estimates after a free discovery session.' },
  { q: 'Can you integrate a custom CRM with our existing ERP or third-party tools?', a: 'Yes. CRM integration is a core specialisation. We have built bidirectional integrations with ERP systems (SAP, Oracle NetSuite, Microsoft Dynamics), marketing platforms (Mailchimp, Klaviyo, ActiveCampaign), telephony (Twilio, RingCentral, Aircall), support desks (Zendesk, Freshdesk), eCommerce platforms (Shopify, WooCommerce), and accounting tools (QuickBooks, Xero). We build integration layers using REST APIs, webhooks, and message queues for reliable, real-time data synchronisation with full error handling and retry logic.' },
  { q: 'Do you build mobile CRM applications?', a: 'Yes. We develop native iOS and Android mobile CRM apps using Flutter or React Native, with offline-first architecture so your sales team can access contacts, log calls, update pipeline stages, and add notes without connectivity. Automatic sync with the backend CRM occurs when back online. Push notifications for follow-up reminders, deal stage changes, and new lead assignments are included as standard.' },
  { q: 'Can you build a white-label CRM platform for resale?', a: 'Yes. Multi-tenant, white-label CRM development is a core service. We build CRM platforms with per-tenant custom domain support, isolated data environments, configurable branding (logo, colours, fonts), subscription billing integration via Stripe or Razorpay, and a self-service tenant onboarding flow. Full source code and IP ownership is retained by you. We have delivered white-label CRM platforms for agencies, vertical SaaS companies, and industry software providers.' },
  { q: 'Do you migrate data from Salesforce, HubSpot, or Zoho to a custom CRM?', a: 'Yes. We handle full CRM data migrations from Salesforce, HubSpot, Zoho, Pipedrive, Microsoft Dynamics, SugarCRM, and other platforms. This includes contacts, accounts, deals and opportunities, activity history, notes and attachments, custom field mapping, and relationship data. We run migrations in a staging environment first, validate data integrity with automated checks, and perform a final delta sync before cutover to minimise data loss risk.' },
  { q: 'What security and compliance standards does a custom CRM meet?', a: 'We architect CRM platforms with role-based access control (RBAC), AES-256 data encryption at rest and in transit, comprehensive audit logs, data retention and purge policies, right-to-erasure workflows for GDPR compliance, and consent management. For US clients we support CCPA requirements. SSO via SAML 2.0 and OAuth2 is standard. Platforms handling sensitive data can be architected for SOC 2 Type II readiness with appropriate audit trail controls.' },
  { q: 'Do you offer ongoing support and feature development after launch?', a: 'Yes — all CRM projects include a 30-day post-launch hypercare period with prioritised bug fix SLA. We then offer ongoing support plans covering security patches, performance optimisation, third-party API updates as provider APIs change, and feature development sprints. Our dedicated team model is particularly well-suited for post-launch CRM evolution — your team continues on a sprint cadence delivering the next roadmap features as your business grows.' },
];

/* ─── Hooks ──────────────────────────────────────────────────── */
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
    <div className="cr-stat-col">
      <div className="cr-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="cr-stat-label">{label}</div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export default function CrmApplicationDevelopment() {
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
    const pairs = [
      [svcGridRef, SERVICES.length, setVisibleSvcCards],
      [engGridRef, 3, setVisibleEngCards],
      [whyGridRef, WHY_CARDS.length, setVisibleWhyCards],
      [testiGridRef, 3, setVisibleTestiCards],
      [stackGridRef, TECH_STACK.length, setVisibleStackCards],
    ];
    const observers = pairs.map(([ref, count, setter]) => {
      if (!ref.current) return null;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 80)); obs.disconnect(); }
      }, { threshold: 0.05 });
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
        <title>CRM Application Development Company | Custom CRM Software | 1Solutions</title>
        <meta name="description" content="Custom CRM application development — sales pipeline automation, marketing CRM, AI lead scoring, ERP integration, mobile CRM apps & white-label CRM platforms. 15+ years | 150+ CRM projects | Free discovery call." />
        <link rel="canonical" href="https://www.1solutions.biz/crm-application-development-company/" />
        <meta property="og:title" content="CRM Application Development Company | 1Solutions" />
        <meta property="og:description" content="Custom CRM software development — sales automation, marketing CRM, AI lead scoring, ERP integration & white-label CRM. 15+ years | 150+ projects | GDPR compliant." />
        <meta property="og:url" content="https://www.1solutions.biz/crm-application-development-company/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .cr-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; position:relative; overflow-x:hidden; }
          .cr-page *,.cr-page *::before,.cr-page *::after { box-sizing:border-box; }

          /* Orbs */
          .cr-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(20px); }
          .cr-orb-1 { width:880px;height:880px;background:radial-gradient(circle,rgba(8,145,178,.22) 0%,rgba(14,116,144,.10) 40%,transparent 70%);top:-280px;right:-260px; }
          .cr-orb-2 { width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px; }
          .cr-orb-3 { width:550px;height:550px;background:radial-gradient(circle,rgba(99,102,241,.16) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%); }

          /* Breadcrumb */
          .cr-breadcrumb { position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto; }
          .cr-breadcrumb ol { display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0; }
          .cr-breadcrumb li { display:flex;align-items:center;gap:6px; }
          .cr-breadcrumb li::after { content:'/';opacity:.45; }
          .cr-breadcrumb li:last-child::after { display:none; }
          .cr-breadcrumb a { color:#0F3460;text-decoration:none; }
          .cr-breadcrumb a:hover { text-decoration:underline; }

          /* Hero */
          .cr-hero { position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px; }
          .cr-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px; }
          .cr-hero h1 { font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#0891b2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .cr-hero-desc { font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px; }
          .cr-trust-row { display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px; }
          .cr-badge { display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07); }
          .cr-badge-dot { width:7px;height:7px;border-radius:50%;background:#0891b2;flex-shrink:0; }
          .cr-ctas { display:flex;flex-wrap:wrap;gap:12px;justify-content:center; }
          .cr-btn-primary { display:inline-block;padding:14px 36px;background:#0891b2;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(8,145,178,.30); }
          .cr-btn-primary:hover { background:#0F3460;transform:translateY(-2px); }
          .cr-btn-ghost { display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s; }
          .cr-btn-ghost:hover { background:rgba(255,255,255,.85);border-color:rgba(8,145,178,.5);transform:translateY(-2px); }

          /* Stats */
          .cr-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95); }
          .cr-stat-col { padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10); }
          .cr-stat-col:last-child { border-right:none; }
          .cr-stat-val { font-size:28px;font-weight:900;color:#0891b2;letter-spacing:-.5px;line-height:1; }
          .cr-stat-label { font-size:11px;color:#4A6080;font-weight:500;margin-top:5px; }

          /* Logos */
          .cr-logos { position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px; }
          .cr-logos-label { font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0; }
          .cr-logos-wrap { width:100%;overflow:hidden; }
          .cr-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:cr-marquee 28s linear infinite; }
          .cr-logos-track:hover { animation-play-state:paused; }
          @keyframes cr-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .cr-clogo { height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s; }
          .cr-clogo:hover { opacity:.85;filter:grayscale(0%); }

          /* Shared */
          .cr-s-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block; }
          .cr-s-title { font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .cr-s-desc { font-size:15px;color:#4A6080;line-height:1.7; }
          .cr-s-reveal { opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1); }
          .cr-s-reveal.cr-revealed { opacity:1;transform:translateY(0); }
          .cr-inner { max-width:1300px;margin:0 auto; }

          /* Services */
          .cr-svc-section { background:transparent;padding:72px 40px 60px;position:relative;z-index:1; }
          .cr-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px; }
          .cr-svc-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(224,242,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s; }
          .cr-svc-card.cr-cv { opacity:1;transform:translateY(0); }
          .cr-svc-card.cr-cv:hover { transform:translateY(-6px);border-color:rgba(8,145,178,.35);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .cr-svc-card.feat { background:linear-gradient(135deg,rgba(224,242,254,.55) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(8,145,178,.20); }
          .cr-svc-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .cr-svc-card h3 { font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1; }
          .cr-svc-card p { font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1; }
          .cr-svc-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#0891b2,#0e7490);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1); }
          .cr-svc-card.cr-cv:hover::before { transform:scaleY(1); }
          .cr-svc-more { text-align:center;margin-top:22px; }
          .cr-btn-more { display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit; }
          .cr-btn-more:hover { background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px); }

          /* Tech Stack */
          .cr-stack-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1; }
          .cr-stack-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px; }
          .cr-stack-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(224,242,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .cr-stack-card.cr-sv { opacity:1;transform:translateY(0); }
          .cr-stack-card.cr-sv:hover { border-color:rgba(8,145,178,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .cr-stack-group { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid; }
          .cr-stack-pills { display:flex;flex-wrap:wrap;gap:6px; }
          .cr-pill { display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid; }

          /* Engagement Models */
          .cr-eng-section { padding:80px 40px;position:relative;z-index:1; }
          .cr-eng-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
          .cr-eng-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(224,242,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s; }
          .cr-eng-card.cr-ev { opacity:1;transform:translateY(0); }
          .cr-eng-card.cr-ev:hover { border-color:rgba(8,145,178,.30);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .cr-eng-card.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .cr-eng-card.feat.cr-ev { transform:translateY(-8px); }
          .cr-eng-card.feat.cr-ev:hover { transform:translateY(-12px); }
          .cr-eng-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px; }
          .cr-eng-icon { width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s; }
          .cr-eng-card.cr-ev:hover .cr-eng-icon { background:rgba(8,145,178,.10); }
          .cr-eng-card.feat .cr-eng-icon { background:rgba(217,119,6,.10); }
          .cr-eng-icon svg { fill:#0F3460;transition:fill .2s; }
          .cr-eng-card.cr-ev:hover .cr-eng-icon svg { fill:#0891b2; }
          .cr-eng-card.feat .cr-eng-icon svg { fill:#D97706; }
          .cr-eng-name { font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px; }
          .cr-eng-headline { font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px; }
          .cr-eng-desc { font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px; }
          .cr-eng-list-label { font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px; }
          .cr-eng-list { list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px; }
          .cr-eng-list li { display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5; }
          .cr-eng-list li::before { content:'✓';font-weight:800;color:#0891b2;flex-shrink:0;margin-top:1px; }
          .cr-eng-process { font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08); }
          .cr-eng-process strong { color:#0F3460; }
          .cr-eng-timeline { display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px; }
          .cr-eng-cta { display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18); }
          .cr-eng-cta:hover { background:#0F3460;color:#fff; }
          .cr-eng-card.feat .cr-eng-cta { background:#0891b2;color:#fff;border-color:#0891b2; }
          .cr-eng-card.feat .cr-eng-cta:hover { background:#0F3460;border-color:#0F3460; }

          /* Process */
          .cr-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .cr-psteps { display:flex;flex-direction:column;margin-top:52px; }
          .cr-pstep { display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1); }
          .cr-pstep.cr-pv { opacity:1;transform:translateY(0); }
          .cr-pstep-l { display:flex;flex-direction:column;align-items:center; }
          .cr-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s; }
          .cr-pstep.cr-pv:hover .cr-pstep-circle { background:rgba(8,145,178,.12);border-color:#0891b2;color:#0891b2; }
          .cr-pstep-connector { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px; }
          .cr-pstep-connector::before { content:'';width:2px;flex:1;background:#0F3460;opacity:.22; }
          .cr-pstep-connector::after { content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40; }
          .cr-pstep:last-child .cr-pstep-connector { display:none; }
          .cr-pstep-r { padding:4px 0 38px; }
          .cr-pstep:last-child .cr-pstep-r { padding-bottom:0; }
          .cr-pstep-title { font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px; }
          .cr-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* Testimonials */
          .cr-testi { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .cr-center-head { text-align:center;margin-bottom:48px; }
          .cr-tgrid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px; }
          .cr-tcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(224,242,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s; }
          .cr-tcard.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.22); }
          .cr-tcard.cr-tv { opacity:1;transform:translateY(0); }
          .cr-tcard.cr-tv:hover { transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .cr-stars { font-size:16px;color:#D97706;letter-spacing:2px; }
          .cr-ttext { font-size:14px;line-height:1.75;color:#374151;flex:1; }
          .cr-tauthor { display:flex;align-items:center;gap:12px; }
          .cr-tavatar { width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
          .cr-tname { font-size:14px;font-weight:700;color:#0F3460; }
          .cr-trole { font-size:12px;color:#6b7280; }

          /* Why */
          .cr-why-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .cr-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px; }
          .cr-wcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(224,242,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .cr-wcard.cr-wv { opacity:1;transform:translateY(0) scale(1); }
          .cr-wcard.cr-wv:hover { transform:translateY(-5px) scale(1);border-color:rgba(8,145,178,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .cr-wcard-dot { width:10px;height:10px;border-radius:50%;background:#0891b2;margin-bottom:12px; }
          .cr-wcard h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .cr-wcard p { font-size:13px;color:#4A6080;line-height:1.65;margin:0; }

          /* Contact */
          .cr-contact { padding:70px 40px;background:linear-gradient(135deg,rgba(224,242,254,.55) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1; }
          .cr-contact-grid { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start; }
          .cr-ctitle { font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#0891b2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .cr-cdesc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px; }
          .cr-cbenefits { background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px; }
          .cr-cbenefit { display:flex;gap:10px;align-items:flex-start; }
          .cr-cbenefit-icon { flex-shrink:0;color:#0891b2;font-weight:800;font-size:16px;margin-top:1px; }
          .cr-cbenefit p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .cr-form-box { background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(224,242,254,.22) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1); }
          .cr-form-box h3 { font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px; }
          .cr-form { display:flex;flex-direction:column;gap:13px; }
          .cr-frow { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .cr-fg { display:flex;flex-direction:column;gap:5px; }
          .cr-fg.full { grid-column:1/-1; }
          .cr-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .cr-fg input,.cr-fg textarea,.cr-fg select { padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s; }
          .cr-fg input:focus,.cr-fg textarea:focus,.cr-fg select:focus { outline:none;border-color:#0891b2;box-shadow:0 0 0 3px rgba(8,145,178,.10); }
          .cr-consent { display:flex;gap:8px;align-items:flex-start; }
          .cr-consent input { margin-top:3px;width:15px;height:15px; }
          .cr-consent label { font-size:11px;color:#4A6080;line-height:1.5; }
          .cr-consent a { color:#0F3460; }
          .cr-submit { width:100%;padding:14px;background:#0891b2;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(8,145,178,.28); }
          .cr-submit:hover { background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28); }

          /* FAQ */
          .cr-faq { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1; }
          .cr-faq h2 { font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px; }
          .cr-faq-sub { font-size:15px;color:#4A6080;margin:0 0 36px; }
          .cr-faq-list { display:flex;flex-direction:column;gap:10px; }
          .cr-fitem { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(224,242,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s; }
          .cr-fitem.open { border-color:rgba(8,145,178,.35); }
          .cr-fitem.open::before { content:'';display:block;height:3px;background:linear-gradient(90deg,#0891b2,#0e7490);border-radius:3px 3px 0 0; }
          .cr-fq { width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .cr-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s; }
          .cr-fitem.open .cr-fq-badge { background:#0891b2;color:#fff; }
          .cr-fq span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4; }
          .cr-fitem.open .cr-fq span { color:#0c4a6e; }
          .cr-fchev { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s; }
          .cr-fitem.open .cr-fchev { transform:rotate(180deg);color:#0891b2; }
          .cr-fanswer-wrap { overflow:hidden;transition:max-height .35s ease;max-height:0; }
          .cr-fitem.open .cr-fanswer-wrap { max-height:500px; }
          .cr-fanswer { padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8; }

          /* Related */
          .cr-related { padding:80px 40px;background:rgba(224,242,254,.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60); }
          .cr-related-inner { max-width:1300px;margin:0 auto;text-align:center; }
          .cr-related h2 { font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px; }
          .cr-related-sub { font-size:14px;color:#4A6080;margin:0 auto;max-width:560px; }
          .cr-related hr { border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0; }
          .cr-rtags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .cr-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s; }
          .cr-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09); }
          .cr-rtag-blue   { background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8; }
          .cr-rtag-violet { background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9; }
          .cr-rtag-amber  { background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309; }
          .cr-rtag-teal   { background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E; }
          .cr-rtag-green  { background:rgba(16,185,129,.09);border-color:rgba(16,185,129,.26);color:#065f46; }
          .cr-rtag-cyan   { background:rgba(8,145,178,.09);border-color:rgba(8,145,178,.28);color:#0c4a6e; }

          /* Responsive */
          @media(max-width:1024px){
            .cr-hero h1,.cr-s-title,.cr-faq h2 { font-size:36px; }
            .cr-svc-grid { grid-template-columns:repeat(2,1fr); }
            .cr-stack-grid { grid-template-columns:repeat(2,1fr); }
            .cr-eng-grid { grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto; }
            .cr-eng-card.feat { transform:none; }
            .cr-eng-card.feat.cr-ev { transform:none; }
            .cr-eng-card.feat.cr-ev:hover { transform:translateY(-4px); }
            .cr-why-grid { grid-template-columns:repeat(2,1fr); }
            .cr-tgrid { grid-template-columns:1fr; }
            .cr-contact-grid { grid-template-columns:1fr; }
          }
          @media(max-width:768px){
            .cr-breadcrumb { padding:12px 20px 0; }
            .cr-hero { padding:28px 20px 20px; }
            .cr-hero h1 { font-size:26px;letter-spacing:-.3px; }
            .cr-stats { grid-template-columns:1fr 1fr; }
            .cr-stat-col:nth-child(2) { border-right:none; }
            .cr-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,.10); }
            .cr-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,.10);border-right:none; }
            .cr-logos { padding:16px 20px 28px; }
            .cr-svc-section,.cr-stack-section,.cr-eng-section,.cr-process-section,.cr-testi,.cr-why-section,.cr-faq,.cr-related { padding:52px 20px; }
            .cr-contact { padding:48px 20px; }
            .cr-svc-grid,.cr-stack-grid,.cr-why-grid { grid-template-columns:1fr; }
            .cr-frow { grid-template-columns:1fr; }
            .cr-ctitle { font-size:28px; }
            .cr-s-title { font-size:28px; }
          }
        `}</style>
      </Head>

      <div className="cr-page">
        <div className="cr-orb cr-orb-1" />
        <div className="cr-orb cr-orb-2" />
        <div className="cr-orb cr-orb-3" />

        {/* ── BREADCRUMB ── */}
        <nav className="cr-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">CRM Application Development Company</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <section className="cr-hero">
          <span className="cr-eyebrow">CRM Application Development Company</span>
          <h1>Custom CRM Development — Built Around Your Sales, Marketing &amp; Service Workflows</h1>
          <p className="cr-hero-desc">We build custom CRM applications that replace expensive off-the-shelf platforms and match your exact pipeline, customer data model, and team hierarchy — with sales automation, marketing workflows, AI lead scoring, ERP integration, mobile apps, and white-label multi-tenant architecture.</p>
          <div className="cr-trust-row">
            {['150+ CRM Projects','No Per-Seat Licensing','GDPR & CCPA Compliant','15+ Years Experience','Full IP Ownership'].map(b => (
              <div className="cr-badge" key={b}><span className="cr-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="cr-ctas">
            <Link href="#contact" className="cr-btn-primary">Start Your CRM Project</Link>
            <Link href="#engagement" className="cr-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="cr-stats" ref={statsRef}>
          {[['150+','CRM Projects'],['15+','Years Experience'],['50+','Integrations Built'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        {/* ── CLIENT LOGOS ── */}
        <div className="cr-logos">
          <span className="cr-logos-label">Trusted by Leading Organisations</span>
          <div className="cr-logos-wrap">
            <div className="cr-logos-track">
              {[
                ['/logo/Indian_Express_Logo_full.png','Indian Express'],
                ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],
                ['/logo/Uniphore.jpg','Uniphore'],
                ['/logo/ICCoLogo.png','ICC'],
                ['/logo/Honor_Logo_(2020).svg.png','Honor'],
                ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],
                ['/logo/Indian_Express_Logo_full.png','Indian Express 2'],
                ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],
                ['/logo/Uniphore.jpg','Uniphore 2'],
                ['/logo/ICCoLogo.png','ICC 2'],
                ['/logo/Honor_Logo_(2020).svg.png','Honor 2'],
                ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2'],
              ].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="cr-clogo" />
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="cr-svc-section" aria-labelledby="cr-svc-heading">
          <div className="cr-inner">
            <div className={`cr-s-reveal${visibleSections.has('svc') ? ' cr-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="cr-s-eyebrow">What We Build</span>
              <h2 id="cr-svc-heading" className="cr-s-title">CRM Development Services We Deliver</h2>
              <p className="cr-s-desc" style={{ maxWidth: 720 }}>From sales pipeline automation and marketing CRM modules to AI lead scoring, ERP integrations, mobile CRM apps, and white-label multi-tenant platforms — we engineer every layer of your CRM system.</p>
            </div>
            <div className="cr-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`cr-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' cr-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="cr-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="cr-svc-more">
                <button className="cr-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section id="stack" className="cr-stack-section" aria-labelledby="cr-stack-heading">
          <div className="cr-inner">
            <div className={`cr-s-reveal${visibleSections.has('stk') ? ' cr-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="cr-s-eyebrow">The CRM Tech Stack We Use</span>
              <h2 id="cr-stack-heading" className="cr-s-title">Technology That Powers Modern CRM Platforms</h2>
              <p className="cr-s-desc" style={{ maxWidth: 680 }}>Every technology choice is driven by scalability, integration flexibility, and security — from a robust multi-tenant backend to real-time analytics pipelines and AI-powered lead intelligence layers.</p>
            </div>
            <div className="cr-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`cr-stack-card${visibleStackCards.includes(i) ? ' cr-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="cr-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="cr-stack-pills">
                    {grp.items.map(item => (
                      <span key={item} className="cr-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section id="engagement" className="cr-eng-section" aria-labelledby="cr-eng-heading">
          <div className="cr-inner">
            <div className={`cr-s-reveal${visibleSections.has('eng') ? ' cr-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="cr-s-eyebrow">How We Work With You</span>
              <h2 id="cr-eng-heading" className="cr-s-title">Engagement Models for CRM Development</h2>
              <p className="cr-s-desc" style={{ maxWidth: 680 }}>Whether you need a dedicated CRM engineering team, a fixed-price platform build, or flexible sprint-based development — we have a model that fits your budget, timeline, and growth stage.</p>
            </div>
            <div className="cr-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`cr-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' cr-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="cr-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="cr-eng-icon">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg>
                  </div>
                  <div className="cr-eng-name">{m.name}</div>
                  <div className="cr-eng-headline">{m.headline}</div>
                  <div className="cr-eng-desc">{m.desc}</div>
                  <div className="cr-eng-list-label">Best for</div>
                  <ul className="cr-eng-list">
                    {m.bestFor.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="cr-eng-process">
                    <strong>Process:</strong> {m.process}<br />
                    <span className="cr-eng-timeline">{m.timeline}</span>
                  </div>
                  <Link href="#contact" className="cr-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="cr-process-section" aria-labelledby="cr-proc-heading">
          <div className="cr-inner" style={{ maxWidth: 760 }}>
            <div className={`cr-s-reveal${visibleSections.has('proc') ? ' cr-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="cr-s-eyebrow">How We Deliver</span>
              <h2 id="cr-proc-heading" className="cr-s-title">Our CRM Application Development Process</h2>
              <p className="cr-s-desc">A structured six-stage process designed to deliver a CRM that your sales team actually adopts — from deep workflow discovery and data modelling to integration build, QA, and post-launch optimisation.</p>
            </div>
            <div className="cr-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`cr-pstep${visibleSections.has('proc') ? ' cr-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="cr-pstep-l">
                    <div className="cr-pstep-circle">{step.num}</div>
                    <div className="cr-pstep-connector" />
                  </div>
                  <div className="cr-pstep-r">
                    <div className="cr-pstep-title">{step.title}</div>
                    <p className="cr-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="cr-testi" aria-labelledby="cr-ts-heading">
          <div className="cr-inner">
            <div className={`cr-center-head cr-s-reveal${visibleSections.has('ts') ? ' cr-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="cr-s-eyebrow">Client Results</span>
              <h2 id="cr-ts-heading" className="cr-s-title">What Our CRM Clients Say</h2>
              <p className="cr-s-desc">Trusted by B2B SaaS companies, agencies, real estate firms, and enterprise sales teams across the US, UK, and Australia.</p>
            </div>
            <div className="cr-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`cr-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' cr-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}
                  itemScope itemType="https://schema.org/Review">
                  <div className="cr-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="cr-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="cr-tauthor">
                    <div className="cr-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div>
                      <div className="cr-tname" itemProp="author">{t.name}</div>
                      <div className="cr-trole">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="cr-why-section" aria-labelledby="cr-wy-heading">
          <div className="cr-inner">
            <div className={`cr-s-reveal${visibleSections.has('wy') ? ' cr-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="cr-s-eyebrow">Why 1Solutions</span>
              <h2 id="cr-wy-heading" className="cr-s-title">Why Choose Us for CRM Application Development</h2>
              <p className="cr-s-desc" style={{ maxWidth: 680 }}>15+ years building custom CRM systems, sales automation platforms, and customer data applications — with deep integration expertise, AI-ready architecture, and a track record of replacing Salesforce and HubSpot at a fraction of the cost.</p>
            </div>
            <div className="cr-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`cr-wcard${visibleWhyCards.includes(i) ? ' cr-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="cr-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="cr-contact" aria-labelledby="cr-contact-heading">
          <div className="cr-contact-grid">
            <div>
              <h2 id="cr-contact-heading" className="cr-ctitle">Start Your Custom CRM Project</h2>
              <p className="cr-cdesc">Tell us about your sales process and we will schedule a free 60-minute CRM discovery call with a senior solutions architect. We will map your pipeline, identify integration touchpoints, and give you a realistic scope and cost estimate — at no charge.</p>
              <div className="cr-cbenefits">
                {[
                  ['✓', 'Free 60-minute CRM discovery and workflow mapping session'],
                  ['✓', 'Preliminary data model, integration map, and scope estimate at no charge'],
                  ['✓', 'Salesforce / HubSpot cost comparison and custom CRM ROI analysis'],
                  ['✓', 'NDA available on request — your sales process and data stay protected'],
                  ['✓', 'Response within 24 business hours from our CRM engineering team'],
                ].map(([icon, text]) => (
                  <div className="cr-cbenefit" key={text}>
                    <span className="cr-cbenefit-icon">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="cr-form-box">
              <h3>Tell Us About Your CRM Requirements</h3>
              <form className="cr-form" onSubmit={e => e.preventDefault()}>
                <div className="cr-frow">
                  <div className="cr-fg">
                    <label htmlFor="cr-name">Full Name *</label>
                    <input id="cr-name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="cr-fg">
                    <label htmlFor="cr-email">Work Email *</label>
                    <input id="cr-email" type="email" placeholder="you@company.com" required />
                  </div>
                </div>
                <div className="cr-frow">
                  <div className="cr-fg">
                    <label htmlFor="cr-company">Company</label>
                    <input id="cr-company" type="text" placeholder="Company name" />
                  </div>
                  <div className="cr-fg">
                    <label htmlFor="cr-phone">Phone / WhatsApp</label>
                    <input id="cr-phone" type="tel" placeholder="+1 555 000 0000" />
                  </div>
                </div>
                <div className="cr-fg full">
                  <label htmlFor="cr-type">CRM Project Type *</label>
                  <select id="cr-type" required>
                    <option value="">Select project type...</option>
                    <option>Custom CRM Development (from scratch)</option>
                    <option>Sales Pipeline & Automation</option>
                    <option>Marketing Automation CRM Module</option>
                    <option>Customer Service & Support CRM</option>
                    <option>Mobile CRM Application</option>
                    <option>AI Lead Scoring & Predictive Analytics</option>
                    <option>CRM Integration (ERP, Telephony, Marketing)</option>
                    <option>White-Label CRM for SaaS / Agency</option>
                    <option>CRM Migration (Salesforce, HubSpot, Zoho)</option>
                    <option>CRM Audit & Optimisation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="cr-fg full">
                  <label htmlFor="cr-msg">Project Brief *</label>
                  <textarea id="cr-msg" rows={4} placeholder="Describe your sales process, team size, current CRM (if any), integrations needed (ERP, telephony, marketing tools), number of users, and go-live timeline..." required />
                </div>
                <div className="cr-consent">
                  <input id="cr-consent" type="checkbox" required />
                  <label htmlFor="cr-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. An NDA is available on request before we review your sales workflows or existing CRM data.</label>
                </div>
                <button type="submit" className="cr-submit">Get Free CRM Discovery Call →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="cr-faq" aria-labelledby="cr-faq-heading">
          <div className="cr-inner" style={{ maxWidth: 860 }}>
            <span className="cr-s-eyebrow">FAQ</span>
            <h2 id="cr-faq-heading">CRM Application Development — Frequently Asked Questions</h2>
            <p className="cr-faq-sub">Everything you need to know about building a custom CRM platform with 1Solutions — from cost and timeline to compliance and migration.</p>
            <div className="cr-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`cr-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="cr-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="cr-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="cr-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="cr-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="cr-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="cr-related">
          <div className="cr-related-inner">
            <span className="cr-s-eyebrow">Explore More</span>
            <h2>Related Software Development Services</h2>
            <p className="cr-related-sub">We also build ERP systems, SaaS platforms, mobile apps, and AI-powered business applications.</p>
            <hr />
            <div className="cr-rtags">
              {[
                ['/custom-software-development/', 'Custom Software Development', 'cr-rtag-cyan'],
                ['/saas-development-company/', 'SaaS Development Company', 'cr-rtag-violet'],
                ['/erp-software-development/', 'ERP Software Development', 'cr-rtag-amber'],
                ['/ai-ml-development/', 'AI / ML Development', 'cr-rtag-amber'],
                ['/mobile-app-development/', 'Mobile App Development', 'cr-rtag-blue'],
                ['/fintech-software-development-company/', 'Fintech Software Development', 'cr-rtag-violet'],
                ['/healthcare-software-development/', 'Healthcare Software Development', 'cr-rtag-green'],
                ['/react-js-development-company/', 'React.js Development', 'cr-rtag-blue'],
                ['/node-js-development-company/', 'Node.js Development', 'cr-rtag-green'],
                ['/api-development-company/', 'API Development & Integration', 'cr-rtag-teal'],
              ].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`cr-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
