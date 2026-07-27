'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

/* ─── Schema ─────────────────────────────────────────────────── */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'API Development Company', item: 'https://www.1solutions.biz/api-development-company/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'API Development & Integration',
      url: 'https://www.1solutions.biz/api-development-company/',
      description: 'Custom API development - REST and GraphQL APIs, third-party integrations, webhook systems, API gateway and microservices architecture, legacy system modernisation, and payment gateway integration.',
      provider: {
        '@type': 'LocalBusiness',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Do we need a custom API, or can we use an off-the-shelf integration tool?', acceptedAnswer: { '@type': 'Answer', text: 'No-code tools like Zapier or Make work well for simple, low-volume automations between two apps. Once you need custom business logic, high request volumes, sub-second latency, complex authentication, or an API that your own customers or partners will consume, a custom-built API is the only reliable option - it gives you full control over data validation, rate limiting, versioning, and error handling that generic connector tools cannot provide.' } },
        { '@type': 'Question', name: 'How long does custom API development take?', acceptedAnswer: { '@type': 'Answer', text: 'A focused API with 10-20 endpoints, authentication, and one or two third-party integrations typically takes 6-10 weeks. A full integration layer connecting your CRM, ERP, payment gateway, and internal tools with webhook-driven sync usually takes 10-16 weeks. Enterprise-grade API gateways with microservices architecture, multi-tenant rate limiting, and a public developer portal typically take 4-8 months. We provide a milestone-based estimate after a free scoping call.' } },
        { '@type': 'Question', name: 'Do you build REST APIs, GraphQL APIs, or both?', acceptedAnswer: { '@type': 'Answer', text: 'Both. We choose the protocol based on your use case - REST for straightforward resource-based APIs with wide client compatibility and simple caching, GraphQL when clients need flexible, nested data fetching in a single request (common for mobile apps and dashboards), and gRPC for high-throughput internal service-to-service communication. Many of our API projects expose a REST API publicly while using gRPC or message queues internally between microservices.' } },
        { '@type': 'Question', name: 'Can you integrate our systems with payment gateways, CRMs, and marketplaces?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We have built production integrations with payment gateways (Stripe, Razorpay, PayPal, Braintree), CRMs (Salesforce, HubSpot, Zoho), ERPs (SAP, NetSuite, Microsoft Dynamics), marketplaces (Amazon MWS/SP-API, Walmart, eBay), eCommerce platforms (Shopify, WooCommerce, Magento), and accounting tools (QuickBooks, Xero). We build resilient integration layers with retry logic, idempotency keys, and webhook-based real-time sync.' } },
        { '@type': 'Question', name: 'How do you secure the APIs you build?', acceptedAnswer: { '@type': 'Answer', text: 'Every API we build includes OAuth2 or JWT-based authentication, API key management with scoped permissions, rate limiting and throttling per client, input validation and sanitisation against injection attacks, TLS encryption in transit, and detailed audit logging. For public-facing APIs we add a Web Application Firewall (WAF) and DDoS protection at the gateway layer. We follow OWASP API Security Top 10 guidelines on every project.' } },
        { '@type': 'Question', name: 'Do you provide API documentation for our developers or partners?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every API we deliver ships with an OpenAPI (Swagger) specification, an interactive documentation portal your team or external partners can use to explore and test endpoints, example requests in multiple languages, and a Postman collection. For public APIs, we can build a full self-service developer portal with API key sign-up, usage dashboards, and versioned documentation.' } },
      ],
    },
  ],
};

/* ─── Page data ──────────────────────────────────────────────── */
const SERVICES = [
  { n: '01', title: 'Custom REST API Development', desc: 'Resource-based REST APIs designed around your data model - versioned endpoints, consistent error handling, pagination, filtering, and full OpenAPI (Swagger) documentation from day one.' },
  { n: '02', title: 'GraphQL API Development', desc: 'Schema-first GraphQL APIs that let client apps fetch exactly the data they need in a single request - ideal for mobile apps, dashboards, and multi-source data aggregation with strong typing.', feat: true },
  { n: '03', title: 'Third-Party API Integration', desc: 'Connect your platform to payment gateways, CRMs, ERPs, marketplaces, and SaaS tools - Stripe, Razorpay, Salesforce, SAP, Amazon, Shopify, QuickBooks - with resilient retry logic and error handling.' },
  { n: '04', title: 'Webhook & Event-Driven Architecture', desc: 'Real-time, event-driven systems using webhooks and message queues (Kafka, RabbitMQ, AWS SQS/SNS) so your systems stay in sync the moment something changes, without constant polling.' },
  { n: '05', title: 'API Gateway & Microservices Architecture', desc: 'Break a monolith into independently deployable microservices behind a unified API gateway - with request routing, load balancing, service discovery, and centralised authentication.' },
  { n: '06', title: 'Legacy System API Modernisation', desc: 'Wrap legacy databases, on-premise ERPs, and older SOAP services with a modern REST or GraphQL API layer - so new applications can integrate without touching fragile legacy code directly.' },
  { n: '07', title: 'API Security, Authentication & Rate Limiting', desc: 'OAuth2 / JWT authentication, scoped API keys, per-client rate limiting and throttling, input validation, and OWASP API Security Top 10 compliance built into every endpoint.' },
  { n: '08', title: 'API Documentation & Developer Portals', desc: 'OpenAPI specifications, interactive documentation, Postman collections, and - for public APIs - a full self-service developer portal with API key management and usage analytics.' },
  { n: '09', title: 'Payment Gateway Integration', desc: 'Secure payment processing integrations with Stripe, Razorpay, PayPal, and Braintree - subscription billing, webhooks for payment events, refund handling, and PCI-DSS-conscious architecture.' },
  { n: '10', title: 'API Performance Optimisation & Monitoring', desc: 'Response caching, database query optimisation, connection pooling, and load testing - paired with ongoing uptime monitoring, latency tracking, and error alerting after launch.' },
];

const TECH_STACK = [
  {
    group: 'API Frameworks',
    color: '#4f46e5',
    items: ['Node.js / Express', 'Python / FastAPI', 'PHP / Laravel', 'Java / Spring Boot', 'Go (Golang)', '.NET Core'],
  },
  {
    group: 'API Protocols',
    color: '#0891b2',
    items: ['REST', 'GraphQL', 'gRPC', 'WebSockets', 'SOAP (legacy)', 'OpenAPI / Swagger'],
  },
  {
    group: 'Integration & Messaging',
    color: '#0e7490',
    items: ['Webhooks', 'Apache Kafka', 'RabbitMQ', 'AWS SQS / SNS', 'Zapier / Make', 'n8n'],
  },
  {
    group: 'Payment & Commerce APIs',
    color: '#D97706',
    items: ['Stripe', 'Razorpay', 'PayPal', 'Shopify API', 'WooCommerce API', 'Amazon SP-API'],
  },
  {
    group: 'Auth & Security',
    color: '#7c3aed',
    items: ['OAuth2', 'JWT', 'API Key Management', 'SAML SSO', 'Rate Limiting', 'WAF / DDoS Protection'],
  },
  {
    group: 'API Gateway & Infra',
    color: '#3858e9',
    items: ['Kong / AWS API Gateway', 'Nginx', 'Docker / Kubernetes', 'Terraform', 'AWS Lambda', 'Serverless'],
  },
  {
    group: 'Databases & Caching',
    color: '#14b8a6',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis (caching)', 'Elasticsearch', 'DynamoDB'],
  },
  {
    group: 'Monitoring & Docs',
    color: '#f97316',
    items: ['Postman', 'Swagger UI', 'Datadog', 'New Relic', 'Grafana', 'Sentry'],
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
    headline: 'Your offshore API engineering team. Full-time. Fully yours.',
    desc: 'A dedicated squad of API and integration engineers - backend developer, integration specialist, QA, and DevOps - working exclusively on your integration layer at a fraction of US/UK/AU hiring cost. Full IP ownership retained by you.',
    bestFor: ['Ongoing integration platform development', 'Growing API product with a public developer base', 'Replacing or augmenting an in-house integration team', 'Multi-system integration hub (CRM, ERP, payments)'],
    process: 'Team assembly → Onboarding → Weekly sprint delivery → Continuous roadmap',
    timeline: 'Ongoing - scale up or down each quarter',
  },
  {
    id: 'fixed',
    name: 'Fixed Price',
    badge: 'Well-defined projects',
    badgeColor: '#0891b2',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Agreed price. Agreed scope. Delivered on time.',
    desc: 'Ideal for well-scoped API projects - a single third-party integration, a payment gateway connection, a public API for one client app, or an API modernisation layer over a legacy system. We agree on deliverables, price, and timeline upfront.',
    bestFor: ['Single third-party integration (CRM, ERP, payments)', 'Public API for one mobile or web client', 'Legacy system API wrapper', 'Webhook-based sync between two platforms'],
    process: 'Detailed spec → Fixed quote → Milestone delivery → Sign-off',
    timeline: 'Best for projects 6–16 weeks',
  },
  {
    id: 'tm',
    name: 'Time & Material',
    badge: 'Agile & flexible',
    badgeColor: '#f97316',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Pay for hours worked. Adapt as scope evolves.',
    desc: 'Billed on actual time and resources used. Best for evolving integration requirements, adding new endpoints as your product grows, or exploratory work connecting an unfamiliar third-party API without a fully fixed spec upfront.',
    bestFor: ['API scope that evolves as you learn requirements', 'Adding new integrations to an existing API', 'Exploratory third-party API prototyping', 'API audit, performance, or security review'],
    process: 'Sprint planning → Biweekly delivery → Iterative refinement → Transparent timesheets',
    timeline: 'Start in 1 week - no lengthy onboarding',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'API Discovery & Endpoint Mapping', desc: 'We map every system that needs to talk to your API, the data each one needs, and the events that should trigger real-time sync - before writing a line of code. This prevents costly rework and a bloated, inconsistent endpoint list later.' },
  { num: '02', title: 'Contract-First Design (OpenAPI Spec)', desc: 'We design the full API contract - endpoints, request/response schemas, authentication, and error formats - as an OpenAPI specification first, so your frontend and integration teams can start building against a stable contract while backend work is still underway.' },
  { num: '03', title: 'Agile Development - Core Endpoints First', desc: 'Development begins with core resource endpoints and authentication, then expands in sprint cycles to cover integrations and edge cases. Each sprint delivers working, testable endpoints reviewed directly against the OpenAPI contract.' },
  { num: '04', title: 'Integration Development & Third-Party Connectivity', desc: 'We build and test every required third-party connection - payment gateways, CRMs, ERPs, marketplaces - using REST, webhooks, and message queues, with full retry logic, idempotency handling, and integration-specific error monitoring.' },
  { num: '05', title: 'Security Testing, Load Testing & QA', desc: 'Authentication and authorisation testing, input validation and injection testing against the OWASP API Security Top 10, rate-limit verification, and load testing to confirm the API holds up under real production traffic.' },
  { num: '06', title: 'Launch, Documentation & Monitoring', desc: 'Zero-downtime production deployment, published OpenAPI documentation and Postman collection, uptime and latency monitoring dashboards, and error alerting - plus a tiered SLA-backed support plan for ongoing endpoint additions.' },
];

const TESTIMONIALS = [
  {
    text: "Our internal tools were held together by manual CSV exports between our ERP and our CRM. 1Solutions built a REST API and webhook layer that syncs both systems in real time. What used to take our ops team four hours a week now happens automatically.",
    name: 'Daniel R.', role: 'Head of Operations, B2B Distribution Company (US)', init: 'DR', bg: '#0F3460',
  },
  {
    text: "We needed a public API so partner agencies could pull campaign data into their own dashboards. 1Solutions delivered a fully documented GraphQL API with API key management and a developer portal - partners onboarded themselves within a day.",
    name: 'Priya N.', role: 'CTO, Marketing SaaS Platform (UK)', init: 'PN', bg: '#0e4a5f', feat: true,
  },
  {
    text: "Integrating Stripe, our warehouse system, and three marketplaces (Amazon, Walmart, eBay) into one order pipeline sounded like a nightmare. 1Solutions built the integration hub in 12 weeks with proper retry logic - it hasn't dropped an order since launch.",
    name: 'Carlos M.', role: 'Founder, eCommerce Brand (CA)', init: 'CM', bg: '#1a4a3a',
  },
];

const WHY_CARDS = [
  { title: '15+ Years API & Integration Expertise', desc: 'We have been building REST and GraphQL APIs, integration layers, and event-driven architectures since 2008 - across SaaS, fintech, eCommerce, healthcare, and logistics.' },
  { title: 'Contract-First, Not Code-First', desc: 'Every API starts as an OpenAPI specification agreed with your team before backend work begins - so frontend, mobile, and partner teams can build in parallel against a stable, documented contract.' },
  { title: '50+ Third-Party Integrations Delivered', desc: 'We have built production integrations with payment gateways, CRMs, ERPs, marketplaces, and accounting tools - using REST APIs, webhooks, and message queues with proper retry and idempotency handling.' },
  { title: 'Security-First by Default', desc: 'OAuth2/JWT authentication, scoped API keys, rate limiting, input validation, and OWASP API Security Top 10 compliance are built into every API we ship - not bolted on afterward.' },
  { title: 'Built to Scale', desc: 'From a single-service REST API to a full microservices architecture behind an API gateway, we design for the traffic and integration count you will have in two years, not just launch day.' },
  { title: 'Documentation Your Team Will Actually Use', desc: 'Every API ships with an OpenAPI spec, interactive docs, and a Postman collection - so onboarding a new developer or partner takes minutes, not a support ticket to us.' },
  { title: 'US / UK / AU Market Expertise', desc: 'We serve SaaS companies, eCommerce brands, and enterprise IT teams across North America, Europe, and Australia - adapting integration architecture to regional compliance and vendor ecosystems.' },
  { title: 'Transparent Delivery, Full Ownership', desc: 'Fortnightly demos, weekly sprint reports, shared task boards, and direct developer access on Slack or Teams. All source code, API contracts, and IP are 100% yours from day one - no vendor lock-in.' },
];

const FAQS = [
  { q: 'Do we need a custom API, or can we use an off-the-shelf integration tool?', a: 'No-code tools like Zapier or Make work well for simple, low-volume automations between two apps. Once you need custom business logic, high request volumes, sub-second latency, complex authentication, or an API that your own customers or partners will consume, a custom-built API is the only reliable option - it gives you full control over data validation, rate limiting, versioning, and error handling that generic connector tools cannot provide.' },
  { q: 'How long does custom API development take?', a: 'A focused API with 10-20 endpoints, authentication, and one or two third-party integrations typically takes 6-10 weeks. A full integration layer connecting your CRM, ERP, payment gateway, and internal tools with webhook-driven sync usually takes 10-16 weeks. Enterprise-grade API gateways with microservices architecture, multi-tenant rate limiting, and a public developer portal typically take 4-8 months. We provide a milestone-based estimate after a free scoping call.' },
  { q: 'Do you build REST APIs, GraphQL APIs, or both?', a: 'Both. We choose the protocol based on your use case - REST for straightforward resource-based APIs with wide client compatibility and simple caching, GraphQL when clients need flexible, nested data fetching in a single request (common for mobile apps and dashboards), and gRPC for high-throughput internal service-to-service communication. Many of our API projects expose a REST API publicly while using gRPC or message queues internally between microservices.' },
  { q: 'Can you integrate our systems with payment gateways, CRMs, and marketplaces?', a: 'Yes. We have built production integrations with payment gateways (Stripe, Razorpay, PayPal, Braintree), CRMs (Salesforce, HubSpot, Zoho), ERPs (SAP, NetSuite, Microsoft Dynamics), marketplaces (Amazon MWS/SP-API, Walmart, eBay), eCommerce platforms (Shopify, WooCommerce, Magento), and accounting tools (QuickBooks, Xero). We build resilient integration layers with retry logic, idempotency keys, and webhook-based real-time sync so a dropped connection never means a lost order or payment.' },
  { q: 'How do you secure the APIs you build?', a: 'Every API we build includes OAuth2 or JWT-based authentication, API key management with scoped permissions, rate limiting and throttling per client, input validation and sanitisation against injection attacks, TLS encryption in transit, and detailed audit logging. For public-facing APIs we add a Web Application Firewall (WAF) and DDoS protection at the gateway layer. We follow OWASP API Security Top 10 guidelines on every project.' },
  { q: 'Do you provide API documentation for our developers or partners?', a: 'Yes. Every API we deliver ships with an OpenAPI (Swagger) specification, an interactive documentation portal your team or external partners can use to explore and test endpoints, example requests in multiple languages, and a Postman collection. For public APIs, we can build a full self-service developer portal with API key sign-up, usage dashboards, and versioned documentation.' },
  { q: 'Can you modernise our legacy system with a new API layer?', a: 'Yes. We regularly wrap legacy databases, on-premise ERPs, and older SOAP-based services with a modern REST or GraphQL API layer - so new applications, mobile apps, and partner integrations can connect without touching fragile legacy code directly. This lets you modernise incrementally instead of a risky full rewrite.' },
  { q: 'Do you offer ongoing support after the API is launched?', a: 'Yes - all API projects include a 30-day post-launch hypercare period with a prioritised bug-fix SLA. We then offer ongoing support plans covering security patches, third-party API updates as provider APIs change, uptime and performance monitoring, and sprint-based development for new endpoints as your integration needs grow.' },
];

/* ─── Component ──────────────────────────────────────────────── */
export default function ApiDevelopmentCompany() {
  const [showAllSvc, setShowAllSvc] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleSvcCards, setVisibleSvcCards] = useState([]);
  const [visibleEngCards, setVisibleEngCards] = useState([]);
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleStackCards, setVisibleStackCards] = useState([]);

  const sectionRefs = useRef({});
  const svcGridRef = useRef(null);
  const engGridRef = useRef(null);
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);
  const stackGridRef = useRef(null);

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

  const [_sfSt, _setSfSt] = useState('idle');
  const _sfSubmit = async (e) => {
    e.preventDefault();
    _setSfSt('loading');
    try {
      const fd = new FormData(e.target);
      const token = await new Promise(r => window.grecaptcha.ready(() =>
        window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'contact' }).then(r)));
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('sf-name') || '', email: fd.get('sf-email') || '',
          phone: (fd.get('sf-cc') ? fd.get('sf-cc') + ' ' : '') + (fd.get('sf-phone') || ''),
          company: fd.get('sf-company') || '', message: fd.get('sf-message') || '',
          source: 'Api Development Company', consent: true, recaptchaToken: token,
        }),
      });
      if (res.ok) { window.location.href = '/thank-you/'; } else { _setSfSt('error'); }
    } catch { _setSfSt('error'); }
  };

  return (
    <>
      <Head>
        <title>API Development Company | 1Solutions</title>
        <meta name="description" content="Custom API development - REST & GraphQL APIs, third-party integrations, webhooks, API gateway & microservices architecture, legacy system modernisation & payment gateway integration." />
        <link rel="canonical" href="https://www.1solutions.biz/api-development-company/" />
        <meta property="og:title" content="API Development Company | 1Solutions" />
        <meta property="og:description" content="Custom API development & integration - REST, GraphQL, webhooks, payment gateways, legacy modernisation. 15+ years | 50+ integrations | OWASP-compliant." />
        <meta property="og:url" content="https://www.1solutions.biz/api-development-company/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .ap-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; position:relative; overflow-x:hidden; }
          .ap-page *,.ap-page *::before,.ap-page *::after { box-sizing:border-box; }

          /* Orbs */
          .ap-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(20px); }
          .ap-orb-1 { width:880px;height:880px;background:radial-gradient(circle,rgba(79,70,229,.20) 0%,rgba(99,102,241,.10) 40%,transparent 70%);top:-280px;right:-260px; }
          .ap-orb-2 { width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px; }
          .ap-orb-3 { width:550px;height:550px;background:radial-gradient(circle,rgba(8,145,178,.16) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%); }

          /* Shared */
          .ap-s-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block; }
          .ap-s-title { font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .ap-s-desc { font-size:15px;color:#4A6080;line-height:1.7; }
          .ap-s-reveal { opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1); }
          .ap-s-reveal.ap-revealed { opacity:1;transform:translateY(0); }
          .ap-inner { max-width:1300px;margin:0 auto; }

          /* Services */
          .ap-svc-section { background:transparent;padding:72px 40px 60px;position:relative;z-index:1; }
          .ap-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px; }
          .ap-svc-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(224,242,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s; }
          .ap-svc-card.ap-cv { opacity:1;transform:translateY(0); }
          .ap-svc-card.ap-cv:hover { transform:translateY(-6px);border-color:rgba(79,70,229,.35);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .ap-svc-card.feat { background:linear-gradient(135deg,rgba(224,242,254,.55) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(79,70,229,.20); }
          .ap-svc-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .ap-svc-card h3 { font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1; }
          .ap-svc-card p { font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1; }
          .ap-svc-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#4f46e5,#4338ca);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1); }
          .ap-svc-card.ap-cv:hover::before { transform:scaleY(1); }
          .ap-svc-more { text-align:center;margin-top:22px; }
          .ap-btn-more { display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit; }
          .ap-btn-more:hover { background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px); }

          /* Tech Stack */
          .ap-stack-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1; }
          .ap-stack-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px; }
          .ap-stack-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(224,242,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .ap-stack-card.ap-sv { opacity:1;transform:translateY(0); }
          .ap-stack-card.ap-sv:hover { border-color:rgba(79,70,229,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .ap-stack-group { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid; }
          .ap-stack-pills { display:flex;flex-wrap:wrap;gap:6px; }
          .ap-pill { display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid; }

          /* Engagement Models */
          .ap-eng-section { padding:80px 40px;position:relative;z-index:1; }
          .ap-eng-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
          .ap-eng-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(224,242,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s; }
          .ap-eng-card.ap-ev { opacity:1;transform:translateY(0); }
          .ap-eng-card.ap-ev:hover { border-color:rgba(79,70,229,.30);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .ap-eng-card.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .ap-eng-card.feat.ap-ev { transform:translateY(-8px); }
          .ap-eng-card.feat.ap-ev:hover { transform:translateY(-12px); }
          .ap-eng-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px; }
          .ap-eng-icon { width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s; }
          .ap-eng-card.ap-ev:hover .ap-eng-icon { background:rgba(79,70,229,.10); }
          .ap-eng-card.feat .ap-eng-icon { background:rgba(217,119,6,.10); }
          .ap-eng-icon svg { fill:#0F3460;transition:fill .2s; }
          .ap-eng-card.ap-ev:hover .ap-eng-icon svg { fill:#4f46e5; }
          .ap-eng-card.feat .ap-eng-icon svg { fill:#D97706; }
          .ap-eng-name { font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px; }
          .ap-eng-headline { font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px; }
          .ap-eng-desc { font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px; }
          .ap-eng-list-label { font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px; }
          .ap-eng-list { list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px; }
          .ap-eng-list li { display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5; }
          .ap-eng-list li::before { content:'✓';font-weight:800;color:#4f46e5;flex-shrink:0;margin-top:1px; }
          .ap-eng-process { font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08); }
          .ap-eng-process strong { color:#0F3460; }
          .ap-eng-timeline { display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px; }
          .ap-eng-cta { display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18); }
          .ap-eng-cta:hover { background:#0F3460;color:#fff; }
          .ap-eng-card.feat .ap-eng-cta { background:#4f46e5;color:#fff;border-color:#4f46e5; }
          .ap-eng-card.feat .ap-eng-cta:hover { background:#0F3460;border-color:#0F3460; }

          /* Process */
          .ap-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .ap-psteps { display:flex;flex-direction:column;margin-top:52px; }
          .ap-pstep { display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1); }
          .ap-pstep.ap-pv { opacity:1;transform:translateY(0); }
          .ap-pstep-l { display:flex;flex-direction:column;align-items:center; }
          .ap-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s; }
          .ap-pstep.ap-pv:hover .ap-pstep-circle { background:rgba(79,70,229,.12);border-color:#4f46e5;color:#4f46e5; }
          .ap-pstep-connector { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px; }
          .ap-pstep-connector::before { content:'';width:2px;flex:1;background:#0F3460;opacity:.22; }
          .ap-pstep-connector::after { content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40; }
          .ap-pstep:last-child .ap-pstep-connector { display:none; }
          .ap-pstep-r { padding:4px 0 38px; }
          .ap-pstep:last-child .ap-pstep-r { padding-bottom:0; }
          .ap-pstep-title { font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px; }
          .ap-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* Testimonials */
          .ap-testi { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .ap-center-head { text-align:center;margin-bottom:48px; }
          .ap-tgrid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px; }
          .ap-tcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(224,242,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s; }
          .ap-tcard.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.22); }
          .ap-tcard.ap-tv { opacity:1;transform:translateY(0); }
          .ap-tcard.ap-tv:hover { transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .ap-stars { font-size:16px;color:#D97706;letter-spacing:2px; }
          .ap-ttext { font-size:14px;line-height:1.75;color:#374151;flex:1; }
          .ap-tauthor { display:flex;align-items:center;gap:12px; }
          .ap-tavatar { width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
          .ap-tname { font-size:14px;font-weight:700;color:#0F3460; }
          .ap-trole { font-size:12px;color:#6b7280; }

          /* Why */
          .ap-why-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .ap-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px; }
          .ap-wcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(224,242,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .ap-wcard.ap-wv { opacity:1;transform:translateY(0) scale(1); }
          .ap-wcard.ap-wv:hover { transform:translateY(-5px) scale(1);border-color:rgba(79,70,229,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .ap-wcard-dot { width:10px;height:10px;border-radius:50%;background:#4f46e5;margin-bottom:12px; }
          .ap-wcard h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .ap-wcard p { font-size:13px;color:#4A6080;line-height:1.65;margin:0; }

          /* Contact */
          .ap-contact { padding:70px 40px;background:linear-gradient(135deg,rgba(224,242,254,.55) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1; }
          .ap-contact-grid { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start; }
          .ap-ctitle { font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .ap-cdesc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px; }
          .ap-cbenefits { background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px; }
          .ap-cbenefit { display:flex;gap:10px;align-items:flex-start; }
          .ap-cbenefit-icon { flex-shrink:0;color:#4f46e5;font-weight:800;font-size:16px;margin-top:1px; }
          .ap-cbenefit p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .ap-form-box { background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(224,242,254,.22) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1); }
          .ap-form-box h3 { font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px; }
          .ap-form { display:flex;flex-direction:column;gap:13px; }
          .ap-frow { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .ap-fg { display:flex;flex-direction:column;gap:5px; }
          .ap-fg.full { grid-column:1/-1; }
          .ap-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .ap-fg input,.ap-fg textarea,.ap-fg select { padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s; }
          .ap-fg input:focus,.ap-fg textarea:focus,.ap-fg select:focus { outline:none;border-color:#4f46e5;box-shadow:0 0 0 3px rgba(79,70,229,.10); }
          .ap-consent { display:flex;gap:8px;align-items:flex-start; }
          .ap-consent input { margin-top:3px;width:15px;height:15px; }
          .ap-consent label { font-size:11px;color:#4A6080;line-height:1.5; }
          .ap-consent a { color:#0F3460; }
          .ap-submit { width:100%;padding:14px;background:#4f46e5;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(79,70,229,.28); }
          .ap-submit:hover { background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28); }

          /* FAQ */
          .ap-faq { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1; }
          .ap-faq h2 { font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px; }
          .ap-faq-sub { font-size:15px;color:#4A6080;margin:0 0 36px; }
          .ap-faq-list { display:flex;flex-direction:column;gap:10px; }
          .ap-fitem { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(224,242,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s; }
          .ap-fitem.open { border-color:rgba(79,70,229,.35); }
          .ap-fitem.open::before { content:'';display:block;height:3px;background:linear-gradient(90deg,#4f46e5,#4338ca);border-radius:3px 3px 0 0; }
          .ap-fq { width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .ap-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s; }
          .ap-fitem.open .ap-fq-badge { background:#4f46e5;color:#fff; }
          .ap-fq span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4; }
          .ap-fitem.open .ap-fq span { color:#0c4a6e; }
          .ap-fchev { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s; }
          .ap-fitem.open .ap-fchev { transform:rotate(180deg);color:#4f46e5; }
          .ap-fanswer-wrap { overflow:hidden;transition:max-height .35s ease;max-height:0; }
          .ap-fitem.open .ap-fanswer-wrap { max-height:500px; }
          .ap-fanswer { padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8; }

          /* Related */
          .ap-related { padding:80px 40px;background:rgba(224,242,254,.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60); }
          .ap-related-inner { max-width:1300px;margin:0 auto;text-align:center; }
          .ap-related h2 { font-size:34px;font-weight:900;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px; }
          .ap-related-sub { font-size:14px;color:#4A6080;margin:0 auto;max-width:560px; }
          .ap-related hr { border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0; }
          .ap-rtags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .ap-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s; }
          .ap-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09); }
          .ap-rtag-blue   { background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8; }
          .ap-rtag-violet { background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9; }
          .ap-rtag-amber  { background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309; }
          .ap-rtag-teal   { background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E; }
          .ap-rtag-green  { background:rgba(16,185,129,.09);border-color:rgba(16,185,129,.26);color:#065f46; }
          .ap-rtag-cyan   { background:rgba(8,145,178,.09);border-color:rgba(8,145,178,.28);color:#0c4a6e; }

          /* Responsive */
          @media(max-width:1024px){
            .ap-s-title,.ap-faq h2 { font-size:36px; }
            .ap-svc-grid { grid-template-columns:repeat(2,1fr); }
            .ap-stack-grid { grid-template-columns:repeat(2,1fr); }
            .ap-eng-grid { grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto; }
            .ap-eng-card.feat { transform:none; }
            .ap-eng-card.feat.ap-ev { transform:none; }
            .ap-eng-card.feat.ap-ev:hover { transform:translateY(-4px); }
            .ap-why-grid { grid-template-columns:repeat(2,1fr); }
            .ap-tgrid { grid-template-columns:1fr; }
            .ap-contact-grid { grid-template-columns:1fr; }
          }
          @media(max-width:768px){
            .ap-svc-section,.ap-stack-section,.ap-eng-section,.ap-process-section,.ap-testi,.ap-why-section,.ap-faq,.ap-related { padding:52px 20px; }
            .ap-contact { padding:48px 20px; }
            .ap-svc-grid,.ap-stack-grid,.ap-why-grid { grid-template-columns:1fr; }
            .ap-frow { grid-template-columns:1fr; }
            .ap-ctitle { font-size:28px; }
            .ap-s-title { font-size:28px; }
          }

          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': TESTIMONIALS.map(t => ({
              '@type': 'Review',
              itemReviewed: {
                '@type': 'LocalBusiness',
                '@id': 'https://www.1solutions.biz/#organization',
                name: '1Solutions',
                url: 'https://www.1solutions.biz',
              },
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
              author: { '@type': 'Person', name: t.name },
              reviewBody: t.text,
            })),
          }) }}
        />
      </Head>

      <div className="ap-page">
        <div className="ap-orb ap-orb-1" />
        <div className="ap-orb ap-orb-2" />
        <div className="ap-orb ap-orb-3" />

        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="API Development Company · REST & GraphQL · OWASP-Compliant Security"
          title={<>Custom API Development - <AuroraText>Built to Connect Every System You Run</AuroraText></>}
          subtext="We design and build REST and GraphQL APIs, third-party integrations, and webhook-driven architectures that connect your CRM, ERP, payment gateways, and internal tools - with contract-first design, OWASP-compliant security, and documentation your team will actually use."
          primaryCta={{ label: 'Start Your API Project', href: '#contact' }}
          secondaryCta={{ label: 'View Engagement Models', href: '#engagement' }}
          stats={[
            { label: 'API Projects', value: '120', suffix: '+' },
            { label: 'Years Experience', value: '15', suffix: '+' },
            { label: 'Integrations Built', value: '50', suffix: '+' },
            { label: 'Client Retention', value: '98', suffix: '%' },
          ]}
        />

        {/* ── SERVICES ── */}
        <section className="ap-svc-section" aria-labelledby="ap-svc-heading">
          <div className="ap-inner">
            <div className={`ap-s-reveal${visibleSections.has('svc') ? ' ap-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="ap-s-eyebrow">What We Build</span>
              <h2 id="ap-svc-heading" className="ap-s-title">API Development Services We Deliver</h2>
              <p className="ap-s-desc" style={{ maxWidth: 720 }}>From REST and GraphQL APIs to webhook systems, API gateways, and legacy system modernisation - we engineer every layer of your integration architecture.</p>
            </div>
            <div className="ap-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`ap-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' ap-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="ap-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="ap-svc-more">
                <button className="ap-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section id="stack" className="ap-stack-section" aria-labelledby="ap-stack-heading">
          <div className="ap-inner">
            <div className={`ap-s-reveal${visibleSections.has('stk') ? ' ap-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="ap-s-eyebrow">The API Tech Stack We Use</span>
              <h2 id="ap-stack-heading" className="ap-s-title">Technology That Powers Modern APIs</h2>
              <p className="ap-s-desc" style={{ maxWidth: 680 }}>Every technology choice is driven by scalability, security, and integration flexibility - from robust API frameworks to event-driven messaging and enterprise API gateways.</p>
            </div>
            <div className="ap-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`ap-stack-card${visibleStackCards.includes(i) ? ' ap-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="ap-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="ap-stack-pills">
                    {grp.items.map(item => (
                      <span key={item} className="ap-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section id="engagement" className="ap-eng-section" aria-labelledby="ap-eng-heading">
          <div className="ap-inner">
            <div className={`ap-s-reveal${visibleSections.has('eng') ? ' ap-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="ap-s-eyebrow">How We Work With You</span>
              <h2 id="ap-eng-heading" className="ap-s-title">Engagement Models for API Development</h2>
              <p className="ap-s-desc" style={{ maxWidth: 680 }}>Whether you need a dedicated integration team, a fixed-price API build, or flexible sprint-based development - we have a model that fits your budget, timeline, and growth stage.</p>
            </div>
            <div className="ap-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`ap-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' ap-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="ap-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="ap-eng-icon">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg>
                  </div>
                  <div className="ap-eng-name">{m.name}</div>
                  <div className="ap-eng-headline">{m.headline}</div>
                  <div className="ap-eng-desc">{m.desc}</div>
                  <div className="ap-eng-list-label">Best for</div>
                  <ul className="ap-eng-list">
                    {m.bestFor.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="ap-eng-process">
                    <strong>Process:</strong> {m.process}<br />
                    <span className="ap-eng-timeline">{m.timeline}</span>
                  </div>
                  <Link href="#contact" className="ap-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="ap-process-section" aria-labelledby="ap-proc-heading">
          <div className="ap-inner" style={{ maxWidth: 760 }}>
            <div className={`ap-s-reveal${visibleSections.has('proc') ? ' ap-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="ap-s-eyebrow">How We Deliver</span>
              <h2 id="ap-proc-heading" className="ap-s-title">Our API Development Process</h2>
              <p className="ap-s-desc">A structured six-stage process designed to deliver an API your team and partners actually adopt - from contract-first design and integration build to security testing and post-launch monitoring.</p>
            </div>
            <div className="ap-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`ap-pstep${visibleSections.has('proc') ? ' ap-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="ap-pstep-l">
                    <div className="ap-pstep-circle">{step.num}</div>
                    <div className="ap-pstep-connector" />
                  </div>
                  <div className="ap-pstep-r">
                    <div className="ap-pstep-title">{step.title}</div>
                    <p className="ap-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="ap-testi" aria-labelledby="ap-ts-heading">
          <div className="ap-inner">
            <div className={`ap-center-head ap-s-reveal${visibleSections.has('ts') ? ' ap-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="ap-s-eyebrow">Client Results</span>
              <h2 id="ap-ts-heading" className="ap-s-title">What Our API Clients Say</h2>
              <p className="ap-s-desc">Trusted by B2B SaaS platforms, eCommerce brands, and enterprise IT teams across the US, UK, and Canada.</p>
            </div>
            <div className="ap-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`ap-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' ap-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="ap-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="ap-ttext">{t.text}</p>
                  <div className="ap-tauthor">
                    <div className="ap-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div>
                      <div className="ap-tname">{t.name}</div>
                      <div className="ap-trole">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="ap-why-section" aria-labelledby="ap-wy-heading">
          <div className="ap-inner">
            <div className={`ap-s-reveal${visibleSections.has('wy') ? ' ap-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="ap-s-eyebrow">Why 1Solutions</span>
              <h2 id="ap-wy-heading" className="ap-s-title">Why Choose Us for API Development</h2>
              <p className="ap-s-desc" style={{ maxWidth: 680 }}>15+ years building REST and GraphQL APIs, third-party integrations, and event-driven architectures - with contract-first design, security-first engineering, and a track record of 50+ production integrations.</p>
            </div>
            <div className="ap-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`ap-wcard${visibleWhyCards.includes(i) ? ' ap-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="ap-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="ap-contact" aria-labelledby="ap-contact-heading">
          <div className="ap-contact-grid">
            <div>
              <h2 id="ap-contact-heading" className="ap-ctitle">Start Your API Project</h2>
              <p className="ap-cdesc">Tell us what systems need to talk to each other and we will schedule a free 60-minute API discovery call with a senior solutions architect. We will map your endpoints, identify integration points, and give you a realistic scope and cost estimate - at no charge.</p>
              <div className="ap-cbenefits">
                {[
                  ['✓', 'Free 60-minute API discovery and endpoint mapping session'],
                  ['✓', 'Preliminary OpenAPI contract, integration map, and scope estimate at no charge'],
                  ['✓', 'Security and architecture review of any existing API you already have'],
                  ['✓', 'NDA available on request - your systems and data stay protected'],
                  ['✓', 'Response within 24 business hours from our API engineering team'],
                ].map(([icon, text]) => (
                  <div className="ap-cbenefit" key={text}>
                    <span className="ap-cbenefit-icon">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ap-form-box">
              <h3>Tell Us About Your API Requirements</h3>
              <form className="ap-form" onSubmit={_sfSubmit}>
                <div className="ap-frow">
                  <div className="ap-fg">
                    <label htmlFor="ap-name">Full Name *</label>
                    <input name="sf-name" id="ap-name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="ap-fg">
                    <label htmlFor="ap-email">Work Email *</label>
                    <input id="ap-email" type="email" name="sf-email" placeholder="you@company.com" required />
                  </div>
                </div>
                <div className="ap-frow">
                  <div className="ap-fg">
                    <label htmlFor="ap-company">Company</label>
                    <input name="sf-company" id="ap-company" type="text" placeholder="Company name" />
                  </div>
                  <div className="ap-fg">
                    <label htmlFor="ap-phone">Phone / WhatsApp *</label>
                    <input id="ap-phone" type="tel" name="sf-phone" placeholder="+1 555 000 0000" required />
                  </div>
                </div>
                <div className="ap-fg full">
                  <label htmlFor="ap-type">API Project Type *</label>
                  <select id="ap-type" required>
                    <option value="">Select project type...</option>
                    <option>Custom REST API Development</option>
                    <option>GraphQL API Development</option>
                    <option>Third-Party API Integration</option>
                    <option>Webhook & Event-Driven Architecture</option>
                    <option>API Gateway & Microservices</option>
                    <option>Legacy System API Modernisation</option>
                    <option>Payment Gateway Integration</option>
                    <option>API Security Audit</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="ap-fg full">
                  <label htmlFor="ap-msg">Project Brief *</label>
                  <textarea name="sf-message" id="ap-msg" rows={4} placeholder="Describe the systems that need to connect, any existing API or integration, third-party services involved (payments, CRM, ERP, marketplaces), expected request volume, and go-live timeline..." required />
                </div>
                <div className="ap-consent">
                  <input id="ap-consent" type="checkbox" required />
                  <label htmlFor="ap-consent">I agree to the <Link href="/privacy-policy/">Privacy Policy</Link>. An NDA is available on request before we review your systems or existing API code.</label>
                </div>
                <button type="submit" className="ap-submit">Get Free API Discovery Call →</button>
                  {_sfSt === 'success' && <div style={{marginTop:'12px',padding:'12px 16px',background:'#f0fdf4',border:'1px solid #86efac',borderRadius:'8px',color:'#166534',fontSize:'0.875rem',fontWeight:500}}>&#10003; Message sent! We&apos;ll get back to you within 24 hours.</div>}{_sfSt === 'error' && <div style={{marginTop:'12px',padding:'12px 16px',background:'#fef2f2',border:'1px solid #fca5a5',borderRadius:'8px',color:'#991b1b',fontSize:'0.875rem',fontWeight:500}}>Something went wrong. Please email info@1solutions.biz</div>}
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="ap-faq" aria-labelledby="ap-faq-heading">
          <div className="ap-inner" style={{ maxWidth: 860 }}>
            <span className="ap-s-eyebrow">FAQ</span>
            <h2 id="ap-faq-heading">API Development - Frequently Asked Questions</h2>
            <p className="ap-faq-sub">Everything you need to know about building custom APIs and integrations with 1Solutions - from cost and timeline to security and documentation.</p>
            <div className="ap-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`ap-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="ap-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="ap-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="ap-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="ap-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="ap-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="ap-related">
          <div className="ap-related-inner">
            <span className="ap-s-eyebrow">Explore More</span>
            <h2>Related Software Development Services</h2>
            <p className="ap-related-sub">We also build CRM systems, ERP platforms, SaaS products, and AI-powered business applications.</p>
            <hr />
            <div className="ap-rtags">
              {[
                ['/crm-application-development-company/', 'CRM Application Development', 'ap-rtag-cyan'],
                ['/erp-application-development-company/', 'ERP Application Development', 'ap-rtag-amber'],
                ['/saas-application-development-company/', 'SaaS Application Development', 'ap-rtag-violet'],
                ['/fintech-software-development-company/', 'Fintech Software Development', 'ap-rtag-violet'],
                ['/mobile-app-development/', 'Mobile App Development', 'ap-rtag-blue'],
                ['/ai-integration-services/', 'AI Integration Services', 'ap-rtag-teal'],
                ['/woocommerce-development-company/', 'WooCommerce Development', 'ap-rtag-green'],
                ['/wordpress-development-company/', 'WordPress Development', 'ap-rtag-cyan'],
              ].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`ap-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
