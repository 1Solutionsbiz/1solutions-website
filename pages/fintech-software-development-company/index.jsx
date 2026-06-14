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
        { '@type': 'ListItem', position: 2, name: 'Fintech Software Development Company', item: 'https://www.1solutions.biz/fintech-software-development-company/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Fintech Software Development',
      url: 'https://www.1solutions.biz/fintech-software-development-company/',
      description: 'Custom fintech software development — PCI DSS-compliant digital banking, payment gateways, neobank platforms, investment apps, lending systems, InsurTech, RegTech, and blockchain solutions.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '112', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Do you develop PCI DSS-compliant fintech software?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every fintech engagement at 1Solutions is built to PCI DSS Level 1 requirements — the highest standard for payment security. This includes tokenisation, end-to-end encryption, network segmentation, vulnerability scanning, and penetration testing. We also implement KYC/AML compliance workflows, SOC 2 Type II controls, and GDPR data protection measures as required by jurisdiction.' } },
        { '@type': 'Question', name: 'Can you integrate with banking APIs, SWIFT, and payment processors?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We have delivered integrations with Stripe, Braintree, Adyen, PayPal, Square, Razorpay, SWIFT GPI, Plaid, Yodlee, MX, and Open Banking APIs across the UK, EU, and Australia. We support ISO 20022, FIX Protocol, SEPA, ACH, BACS, and custom core banking system connectors via middleware layers.' } },
        { '@type': 'Question', name: 'How long does fintech software development take?', acceptedAnswer: { '@type': 'Answer', text: 'Timelines vary by scope. A payment gateway integration typically takes 6–10 weeks. A neobank MVP takes 16–24 weeks. A full lending platform or investment app can take 6–12 months. PCI DSS compliance QA and security testing add 4–6 weeks to any project. We provide milestone-based estimates after a paid discovery phase.' } },
        { '@type': 'Question', name: 'What security standards do you implement in fintech applications?', acceptedAnswer: { '@type': 'Answer', text: 'We implement PCI DSS Level 1, SOC 2 Type II, ISO 27001 controls, AML/KYC frameworks, OAuth 2.0/OpenID Connect, MFA/biometric authentication, AES-256 encryption at rest, TLS 1.3 in transit, OWASP ASVS Level 2/3 standards, fraud detection systems, and real-time transaction monitoring. All fintech products undergo independent penetration testing before launch.' } },
        { '@type': 'Question', name: 'Which engagement model is best for a fintech startup?', acceptedAnswer: { '@type': 'Answer', text: 'For most fintech startups, the Dedicated Team model gives the best outcomes. You get a full-stack team with fintech domain expertise working exclusively on your product at a fraction of US or UK hiring cost. You retain all IP and technical direction. The team scales as your funding and roadmap evolve.' } },
        { '@type': 'Question', name: 'Do you offer post-launch support for fintech applications?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — all projects include a 30-day hypercare period. Ongoing support is available in Standard (business hours, 48hr SLA), Professional (extended hours, 24hr SLA), and Enterprise (24/7, 2hr critical SLA) tiers. All plans include security patch management, PCI DSS re-assessment support, compliance monitoring, and quarterly feature reviews.' } },
      ],
    },
  ],
};

/* ─── Page data ──────────────────────────────────────────────── */
const SERVICES = [
  { n: '01', title: 'Digital Banking Platforms', desc: 'Full-featured core banking systems with current accounts, savings products, debit/credit card issuance, multi-currency support, and real-time transaction processing built for scale.' },
  { n: '02', title: 'Payment Gateway Development', desc: 'Secure, PCI DSS-compliant payment gateways with multi-acquirer routing, 3D Secure 2.0, tokenisation, split payments, and reconciliation dashboards for high-volume transactions.', feat: true },
  { n: '03', title: 'Neobank & Challenger Bank Solutions', desc: 'End-to-end neobank platforms — account opening, KYC verification, virtual/physical cards, P2P transfers, savings pots, spending analytics, and Open Banking integrations.' },
  { n: '04', title: 'Investment & Trading Platforms', desc: 'Stock, ETF, crypto, and robo-advisor platforms with real-time market data, portfolio analytics, fractional investing, order management systems, and regulatory reporting.' },
  { n: '05', title: 'Personal Finance Management Apps', desc: 'Smart money management apps with account aggregation, expense categorisation, budget tracking, savings goals, bill prediction, and AI-powered financial insights.' },
  { n: '06', title: 'Lending & Loan Management Systems', desc: 'Automated lending platforms covering credit scoring, loan origination, underwriting, disbursement, repayment scheduling, collections, and regulatory reporting for banks and NBFCs.' },
  { n: '07', title: 'Insurance Technology (InsurTech)', desc: 'Digital insurance platforms with online quoting, policy management, claims automation, IoT/telematics integration, and reinsurance data exchange for carriers and MGAs.' },
  { n: '08', title: 'RegTech & Compliance Solutions', desc: 'Automated compliance platforms for KYC/AML screening, transaction monitoring, suspicious activity reporting, regulatory filing, and audit trail management.' },
  { n: '09', title: 'Blockchain & DeFi Development', desc: 'Smart contracts, DeFi protocols, tokenisation platforms, cross-chain bridges, crypto wallets, and private blockchain networks built for financial institutions.' },
  { n: '10', title: 'Open Banking & API Development', desc: 'PSD2-compliant Open Banking platforms, TPP aggregation APIs, consent management systems, and developer portals for financial data sharing ecosystems.' },
];

const TECH_STACK = [
  {
    group: 'Backend Development',
    color: '#6366f1',
    items: ['Node.js / Express', 'Python / Django', 'Java / Spring Boot', 'Go (Golang)', '.NET Core', 'GraphQL'],
  },
  {
    group: 'Frontend & Web',
    color: '#8b5cf6',
    items: ['React.js', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Progressive Web Apps'],
  },
  {
    group: 'Mobile Development',
    color: '#0ea5e9',
    items: ['React Native', 'Flutter', 'Swift (iOS)', 'Kotlin (Android)', 'Apple Pay SDK', 'Google Pay SDK'],
  },
  {
    group: 'Cloud & DevOps',
    color: '#f59e0b',
    items: ['AWS (PCI DSS-eligible)', 'Microsoft Azure', 'Google Cloud Platform', 'Docker / Kubernetes', 'Terraform', 'CI/CD Pipelines'],
  },
  {
    group: 'Databases',
    color: '#ec4899',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Apache Cassandra', 'TimescaleDB'],
  },
  {
    group: 'Fintech Standards',
    color: '#14b8a6',
    items: ['PCI DSS Level 1', 'Open Banking (PSD2)', 'ISO 20022', 'SWIFT GPI', 'FIX Protocol', 'SEPA / ACH / BACS'],
  },
  {
    group: 'Security & Compliance',
    color: '#6366f1',
    items: ['PCI DSS / SOC 2 Type II', 'KYC / AML Frameworks', 'OAuth 2.0 / OpenID Connect', 'AES-256 Encryption', 'TLS 1.3', 'GDPR / FCA / ASIC'],
  },
  {
    group: 'AI / ML & Analytics',
    color: '#f97316',
    items: ['Fraud Detection Models', 'Credit Scoring ML', 'TensorFlow / PyTorch', 'Apache Spark', 'Power BI', 'Tableau'],
  },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'fixed',
    name: 'Fixed Price',
    badge: 'Well-defined projects',
    badgeColor: '#0ea5e9',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Agreed price. Agreed scope. No surprises.',
    desc: 'Ideal when your requirements are well-documented and the scope is clear. We agree on deliverables, price, and timeline upfront. Milestone-based payments keep both sides aligned throughout delivery.',
    bestFor: ['Payment gateway integration', 'KYC/AML compliance module', 'Specific Open Banking connector', 'Feature additions to an existing fintech platform'],
    process: 'Detailed spec → Fixed quote → Milestone delivery → Sign-off',
    timeline: 'Best for projects 6–20 weeks',
  },
  {
    id: 'dedicated',
    name: 'Dedicated Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'Your offshore fintech engineering team. Full-time. Fully yours.',
    desc: 'A dedicated squad of fintech specialists — PM, architect, frontend, backend, security engineer, and QA — working exclusively on your product at a fraction of US/UK hiring cost. You retain full IP ownership and technical direction.',
    bestFor: ['Fintech startups scaling a platform', 'Long-term product development', 'Replacing or extending an in-house team', 'Complex, evolving financial products'],
    process: 'Team assembly → Onboarding → Weekly sprint delivery → Continuous roadmap',
    timeline: 'Ongoing — scale up or down each quarter',
  },
  {
    id: 'tm',
    name: 'Time & Material',
    badge: 'Agile & flexible',
    badgeColor: '#6366f1',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Pay for hours worked. Adapt as you go.',
    desc: 'Billed on actual time and resources used. Best for R&D projects, complex third-party integrations, or products where regulatory requirements drive frequent scope changes.',
    bestFor: ['Proof-of-concept & R&D builds', 'Complex banking API integrations', 'Blockchain / DeFi exploration', 'Products with rapidly changing regulatory scope'],
    process: 'Sprint planning → Biweekly delivery → Iterative refinement → Transparent timesheets',
    timeline: 'Start in 1 week — no lengthy onboarding',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Regulatory Scoping', desc: 'We map your business model, target jurisdiction, and regulatory obligations — PCI DSS, FCA, ASIC, FinCEN, or GDPR — and define a compliant architecture from day one.' },
  { num: '02', title: 'Secure Architecture Design', desc: 'Our security architects design a PCI DSS / SOC 2-ready infrastructure with network segmentation, encryption strategy, secrets management, and access control frameworks.' },
  { num: '03', title: 'UI/UX Design for Financial Workflows', desc: 'We design frictionless onboarding flows, KYC journeys, trading dashboards, and payment interfaces that balance regulatory requirements with exceptional user experience.' },
  { num: '04', title: 'Agile Development & Integrations', desc: 'Two-week sprints with fortnightly demos. We integrate payment processors, banking APIs, identity providers, market data feeds, and fraud engines in parallel with feature development.' },
  { num: '05', title: 'Security Testing & Compliance Audit', desc: 'Independent penetration testing, OWASP ASVS verification, PCI DSS gap assessment, AML/KYC workflow audit, and load testing under simulated production traffic.' },
  { num: '06', title: 'Launch, Monitoring & Ongoing Support', desc: 'Zero-downtime deployment with real-time fraud monitoring, transaction anomaly alerts, PCI DSS re-assessment support, and tiered SLA-backed engineering support post-launch.' },
];

const TESTIMONIALS = [
  {
    text: "1Solutions built our neobank platform from scratch — account opening, card issuance, P2P transfers, and Open Banking integrations. They understood PSD2 inside out. We launched in 19 weeks and passed our FCA technical audit on the first submission.",
    name: 'Daniel M.', role: 'CTO, Digital Challenger Bank (UK)', init: 'DM', bg: '#0F3460',
  },
  {
    text: "We needed a PCI DSS-compliant payment gateway with split payment and multi-acquirer routing for our marketplace. The 1Solutions team delivered on time and on budget. Their security architecture review alone saved us months of compliance remediation.",
    name: 'Sarah L.', role: 'VP Engineering, Payments Platform (US)', init: 'SL', bg: '#1a4a7a', feat: true,
  },
  {
    text: "Our lending platform required deep integration with credit bureaus and a custom scoring model. 1Solutions delivered a production-ready system handling 500+ loan applications daily. Their documentation and code quality are exceptional.",
    name: 'Raj T.', role: 'CFO, Digital Lending Company (AU)', init: 'RT', bg: '#312e81',
  },
];

const WHY_CARDS = [
  { title: 'PCI DSS-Native Development', desc: 'Security is built into the architecture from day one — not bolted on at the end. Every sprint includes a security review against PCI DSS and OWASP ASVS controls.' },
  { title: 'Deep Fintech Domain Expertise', desc: 'Our engineers have shipped digital banking, payment, lending, and investment platforms. We understand regulatory constraints, not just code.' },
  { title: '15+ Years of Proven Delivery', desc: 'We have been building financial software since 2008 — through PSD2, open banking mandates, GDPR, and multiple technology cycles.' },
  { title: 'Full-Stack Security Engineering', desc: 'Dedicated security engineers on every fintech project — threat modelling, SAST/DAST scanning, penetration testing, and compliance certification support.' },
  { title: 'Zero Payment Breaches', desc: 'Across 100+ fintech clients and 15+ years, we have maintained a zero-breach record on payment and financial data infrastructure we have built and managed.' },
  { title: 'End-to-End Fintech Team', desc: 'PM, architect, frontend, backend, mobile, security, QA, and DevOps — every skill your fintech product needs, in a single accountable team.' },
  { title: 'US / UK / AU / CA Expertise', desc: 'We understand PCI DSS, FCA, ASIC, FinCEN, OSFI, and CDR open banking. Jurisdiction-specific compliance is part of our discovery process, not an afterthought.' },
  { title: 'Transparent, Milestone-Based Delivery', desc: 'Fortnightly demos, weekly status reports, and full source code access from day one. No black boxes. No surprises at invoice time.' },
];

const FAQS = [
  { q: 'Do you develop PCI DSS-compliant fintech software?', a: "Yes. Every fintech engagement at 1Solutions is architected to PCI DSS Level 1 — the highest payment security standard. This includes card data tokenisation, end-to-end AES-256 encryption, network segmentation, real-time fraud monitoring, vulnerability scanning, and annual penetration testing. We also implement KYC/AML workflows, SOC 2 Type II controls, and GDPR/FCA/ASIC compliance as required by jurisdiction." },
  { q: 'Can you integrate with Stripe, Adyen, Plaid, SWIFT, and existing banking APIs?', a: 'Yes. We have delivered integrations with Stripe, Adyen, Braintree, PayPal, Square, Razorpay, Worldpay, Plaid, Yodlee, MX, and Open Banking APIs across the UK, EU, US, and Australia. We support ISO 20022, SWIFT GPI, FIX Protocol, SEPA, ACH, BACS, and build custom middleware for proprietary core banking systems that lack a published API.' },
  { q: 'How long does fintech software development take?', a: 'Timelines depend on scope. A payment gateway integration typically takes 6–10 weeks. A neobank MVP (accounts, cards, notifications) takes 16–24 weeks. A full lending platform or investment app can take 6–12 months. PCI DSS compliance QA and security testing add 4–6 weeks to any project. We provide detailed milestone-based estimates after a paid discovery phase.' },
  { q: 'What security standards do you implement in fintech applications?', a: 'We implement PCI DSS Level 1, SOC 2 Type II, ISO 27001 controls, AML/KYC screening, OAuth 2.0/OpenID Connect, MFA and biometric authentication, AES-256 encryption at rest, TLS 1.3 in transit, OWASP ASVS Level 2/3, and real-time transaction anomaly detection. All fintech products undergo independent penetration testing and a security architecture review before launch.' },
  { q: 'Which engagement model is best for a fintech startup?', a: "For most early-stage fintech startups, the Dedicated Team model delivers the best outcomes. You get a full-stack team with fintech domain expertise — PM, architect, frontend, backend, security engineer, QA — working exclusively on your product at significantly less than equivalent US or UK hiring cost. You direct the work and retain all IP. The team scales as your funding grows and your regulatory requirements evolve." },
  { q: 'Do you offer post-launch support for fintech applications?', a: 'Yes — all projects include a 30-day hypercare period post-launch. Ongoing support is available in three tiers: Standard (business hours, 48hr SLA), Professional (extended hours, 24hr SLA), and Enterprise (24/7, 2hr critical SLA). All plans include security patch management, PCI DSS re-assessment support, compliance monitoring, performance alerts, and quarterly roadmap review calls.' },
  { q: 'Do you work with US, UK, Australian, and Canadian fintech companies?', a: 'Yes. The majority of our fintech clients are in the US (PCI DSS, FinCEN, OCC), UK (FCA, PSD2, open banking), Australia (ASIC, CDR, open banking), and Canada (FINTRAC, OSFI). We adapt our compliance and architecture frameworks per jurisdiction. Our team covers US and Australian-friendly hours with async communication for UK and European clients.' },
  { q: 'Can you build AI-powered fraud detection and credit scoring into fintech software?', a: "Yes. We have built real-time fraud detection systems using gradient boosting, neural networks, and rule-based engines operating at sub-100ms latency. We also develop alternative credit scoring models using transaction history, cash flow analysis, and behavioural data, as well as AI-powered AML transaction monitoring. We use TensorFlow, PyTorch, and scikit-learn on PCI DSS-compliant cloud infrastructure." },
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
    <div className="ft-stat-col">
      <div className="ft-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="ft-stat-label">{label}</div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export default function FintechSoftwareDevelopment() {
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
        <title>Fintech Software Development Company | PCI DSS Compliant | 1Solutions</title>
        <meta name="description" content="Custom fintech software development — PCI DSS-compliant digital banking, payment gateways, neobank platforms, investment apps & lending systems. 15+ years | 100+ fintech clients | Free discovery call." />
        <link rel="canonical" href="https://www.1solutions.biz/fintech-software-development-company/" />
        <meta property="og:title" content="Fintech Software Development Company | 1Solutions" />
        <meta property="og:description" content="PCI DSS-compliant fintech software development — digital banking, payment gateways, neobank, investment, lending & blockchain solutions. 15+ years, 100+ fintech clients." />
        <meta property="og:url" content="https://www.1solutions.biz/fintech-software-development-company/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .ft-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; position:relative; overflow-x:hidden; }
          .ft-page *,.ft-page *::before,.ft-page *::after { box-sizing:border-box; }

          /* Orbs */
          .ft-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(20px); }
          .ft-orb-1 { width:880px;height:880px;background:radial-gradient(circle,rgba(99,102,241,.26) 0%,rgba(139,92,246,.13) 40%,transparent 70%);top:-280px;right:-260px; }
          .ft-orb-2 { width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.11) 40%,transparent 70%);bottom:0;left:-230px; }
          .ft-orb-3 { width:550px;height:550px;background:radial-gradient(circle,rgba(14,165,233,.16) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%); }

          /* Breadcrumb */
          .ft-breadcrumb { position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto; }
          .ft-breadcrumb ol { display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0; }
          .ft-breadcrumb li { display:flex;align-items:center;gap:6px; }
          .ft-breadcrumb li::after { content:'/';opacity:.45; }
          .ft-breadcrumb li:last-child::after { display:none; }
          .ft-breadcrumb a { color:#0F3460;text-decoration:none; }
          .ft-breadcrumb a:hover { text-decoration:underline; }

          /* Hero */
          .ft-hero { position:relative;z-index:2;text-align:center;max-width:900px;margin:0 auto;padding:44px 40px 32px; }
          .ft-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px; }
          .ft-hero h1 { font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#6366f1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .ft-hero-desc { font-size:16px;color:#3A507A;line-height:1.65;max-width:680px;margin:0 auto 24px; }
          .ft-trust-row { display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px; }
          .ft-badge { display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07); }
          .ft-badge-dot { width:7px;height:7px;border-radius:50%;background:#6366f1;flex-shrink:0; }
          .ft-ctas { display:flex;flex-wrap:wrap;gap:12px;justify-content:center; }
          .ft-btn-primary { display:inline-block;padding:14px 36px;background:#0F3460;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(15,52,96,.25); }
          .ft-btn-primary:hover { background:#6366f1;transform:translateY(-2px); }
          .ft-btn-ghost { display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s; }
          .ft-btn-ghost:hover { background:rgba(255,255,255,.85);border-color:rgba(99,102,241,.5);transform:translateY(-2px); }

          /* Stats */
          .ft-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95); }
          .ft-stat-col { padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10); }
          .ft-stat-col:last-child { border-right:none; }
          .ft-stat-val { font-size:28px;font-weight:900;color:#6366f1;letter-spacing:-.5px;line-height:1; }
          .ft-stat-label { font-size:11px;color:#4A6080;font-weight:500;margin-top:5px; }

          /* Logos */
          .ft-logos { position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px; }
          .ft-logos-label { font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0; }
          .ft-logos-wrap { width:100%;overflow:hidden; }
          .ft-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:ft-marquee 28s linear infinite; }
          .ft-logos-track:hover { animation-play-state:paused; }
          @keyframes ft-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .ft-clogo { height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s; }
          .ft-clogo:hover { opacity:.85;filter:grayscale(0%); }

          /* Shared */
          .ft-s-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block; }
          .ft-s-title { font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .ft-s-desc { font-size:15px;color:#4A6080;line-height:1.7; }
          .ft-s-reveal { opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1); }
          .ft-s-reveal.ft-revealed { opacity:1;transform:translateY(0); }
          .ft-inner { max-width:1300px;margin:0 auto; }

          /* Services */
          .ft-svc-section { background:transparent;padding:72px 40px 60px;position:relative;z-index:1; }
          .ft-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px; }
          .ft-svc-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s; }
          .ft-svc-card.ft-cv { opacity:1;transform:translateY(0); }
          .ft-svc-card.ft-cv:hover { transform:translateY(-6px);border-color:rgba(99,102,241,.40);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .ft-svc-card.feat { background:linear-gradient(135deg,rgba(224,231,255,.55) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(99,102,241,.22); }
          .ft-svc-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .ft-svc-card h3 { font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1; }
          .ft-svc-card p { font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1; }
          .ft-svc-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#6366f1,#818cf8);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1); }
          .ft-svc-card.ft-cv:hover::before { transform:scaleY(1); }
          .ft-svc-more { text-align:center;margin-top:22px; }
          .ft-btn-more { display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit; }
          .ft-btn-more:hover { background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px); }

          /* Tech Stack */
          .ft-stack-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1; }
          .ft-stack-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px; }
          .ft-stack-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .ft-stack-card.ft-sv { opacity:1;transform:translateY(0); }
          .ft-stack-card.ft-sv:hover { border-color:rgba(99,102,241,.35);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .ft-stack-group { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid; }
          .ft-stack-pills { display:flex;flex-wrap:wrap;gap:6px; }
          .ft-pill { display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid; }

          /* Engagement Models */
          .ft-eng-section { padding:80px 40px;position:relative;z-index:1; }
          .ft-eng-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
          .ft-eng-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s; }
          .ft-eng-card.ft-ev { opacity:1;transform:translateY(0); }
          .ft-eng-card.ft-ev:hover { border-color:rgba(99,102,241,.35);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .ft-eng-card.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .ft-eng-card.feat.ft-ev { transform:translateY(-8px); }
          .ft-eng-card.feat.ft-ev:hover { transform:translateY(-12px); }
          .ft-eng-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px; }
          .ft-eng-icon { width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s; }
          .ft-eng-card.ft-ev:hover .ft-eng-icon { background:rgba(99,102,241,.12); }
          .ft-eng-card.feat .ft-eng-icon { background:rgba(217,119,6,.10); }
          .ft-eng-icon svg { fill:#0F3460;transition:fill .2s; }
          .ft-eng-card.ft-ev:hover .ft-eng-icon svg { fill:#6366f1; }
          .ft-eng-card.feat .ft-eng-icon svg { fill:#D97706; }
          .ft-eng-name { font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px; }
          .ft-eng-headline { font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px; }
          .ft-eng-desc { font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px; }
          .ft-eng-list-label { font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px; }
          .ft-eng-list { list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px; }
          .ft-eng-list li { display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5; }
          .ft-eng-list li::before { content:'✓';font-weight:800;color:#6366f1;flex-shrink:0;margin-top:1px; }
          .ft-eng-process { font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08); }
          .ft-eng-process strong { color:#0F3460; }
          .ft-eng-timeline { display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px; }
          .ft-eng-cta { display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18); }
          .ft-eng-cta:hover { background:#0F3460;color:#fff; }
          .ft-eng-card.feat .ft-eng-cta { background:#0F3460;color:#fff; }
          .ft-eng-card.feat .ft-eng-cta:hover { background:#6366f1;border-color:#6366f1; }

          /* Process */
          .ft-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .ft-psteps { display:flex;flex-direction:column;margin-top:52px; }
          .ft-pstep { display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1); }
          .ft-pstep.ft-pv { opacity:1;transform:translateY(0); }
          .ft-pstep-l { display:flex;flex-direction:column;align-items:center; }
          .ft-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s; }
          .ft-pstep.ft-pv:hover .ft-pstep-circle { background:rgba(99,102,241,.15);border-color:#6366f1;color:#6366f1; }
          .ft-pstep-connector { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px; }
          .ft-pstep-connector::before { content:'';width:2px;flex:1;background:#0F3460;opacity:.22; }
          .ft-pstep-connector::after { content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40; }
          .ft-pstep:last-child .ft-pstep-connector { display:none; }
          .ft-pstep-r { padding:4px 0 38px; }
          .ft-pstep:last-child .ft-pstep-r { padding-bottom:0; }
          .ft-pstep-title { font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px; }
          .ft-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* Testimonials */
          .ft-testi { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .ft-center-head { text-align:center;margin-bottom:48px; }
          .ft-tgrid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px; }
          .ft-tcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s; }
          .ft-tcard.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.22); }
          .ft-tcard.ft-tv { opacity:1;transform:translateY(0); }
          .ft-tcard.ft-tv:hover { transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .ft-stars { font-size:16px;color:#D97706;letter-spacing:2px; }
          .ft-ttext { font-size:14px;line-height:1.75;color:#374151;flex:1; }
          .ft-tauthor { display:flex;align-items:center;gap:12px; }
          .ft-tavatar { width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
          .ft-tname { font-size:14px;font-weight:700;color:#0F3460; }
          .ft-trole { font-size:12px;color:#6b7280; }

          /* Why */
          .ft-why-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .ft-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px; }
          .ft-wcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .ft-wcard.ft-wv { opacity:1;transform:translateY(0) scale(1); }
          .ft-wcard.ft-wv:hover { transform:translateY(-5px) scale(1);border-color:rgba(99,102,241,.35);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .ft-wcard-dot { width:10px;height:10px;border-radius:50%;background:#6366f1;margin-bottom:12px; }
          .ft-wcard h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .ft-wcard p { font-size:13px;color:#4A6080;line-height:1.65;margin:0; }

          /* Contact */
          .ft-contact { padding:70px 40px;background:linear-gradient(135deg,rgba(224,231,255,.55) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1; }
          .ft-contact-grid { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start; }
          .ft-ctitle { font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#6366f1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .ft-cdesc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px; }
          .ft-cbenefits { background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px; }
          .ft-cbenefit { display:flex;gap:10px;align-items:flex-start; }
          .ft-cbenefit-icon { flex-shrink:0;color:#6366f1;font-weight:800;font-size:16px;margin-top:1px; }
          .ft-cbenefit p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .ft-form-box { background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(237,233,254,.25) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1); }
          .ft-form-box h3 { font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px; }
          .ft-form { display:flex;flex-direction:column;gap:13px; }
          .ft-frow { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .ft-fg { display:flex;flex-direction:column;gap:5px; }
          .ft-fg.full { grid-column:1/-1; }
          .ft-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .ft-fg input,.ft-fg textarea,.ft-fg select { padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s; }
          .ft-fg input:focus,.ft-fg textarea:focus,.ft-fg select:focus { outline:none;border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.10); }
          .ft-consent { display:flex;gap:8px;align-items:flex-start; }
          .ft-consent input { margin-top:3px;width:15px;height:15px; }
          .ft-consent label { font-size:11px;color:#4A6080;line-height:1.5; }
          .ft-consent a { color:#0F3460; }
          .ft-submit { width:100%;padding:14px;background:#0F3460;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(15,52,96,.22); }
          .ft-submit:hover { background:#6366f1;transform:translateY(-2px);box-shadow:0 10px 30px rgba(99,102,241,.30); }

          /* FAQ */
          .ft-faq { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1; }
          .ft-faq h2 { font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px; }
          .ft-faq-sub { font-size:15px;color:#4A6080;margin:0 0 36px; }
          .ft-faq-list { display:flex;flex-direction:column;gap:10px; }
          .ft-fitem { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s; }
          .ft-fitem.open { border-color:rgba(99,102,241,.35); }
          .ft-fitem.open::before { content:'';display:block;height:3px;background:linear-gradient(90deg,#6366f1,#818cf8);border-radius:3px 3px 0 0; }
          .ft-fq { width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .ft-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s; }
          .ft-fitem.open .ft-fq-badge { background:#6366f1;color:#fff; }
          .ft-fq span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4; }
          .ft-fitem.open .ft-fq span { color:#312e81; }
          .ft-fchev { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s; }
          .ft-fitem.open .ft-fchev { transform:rotate(180deg);color:#6366f1; }
          .ft-fanswer-wrap { overflow:hidden;transition:max-height .35s ease;max-height:0; }
          .ft-fitem.open .ft-fanswer-wrap { max-height:500px; }
          .ft-fanswer { padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8; }

          /* Related */
          .ft-related { padding:80px 40px;background:rgba(237,233,254,.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60); }
          .ft-related-inner { max-width:1300px;margin:0 auto;text-align:center; }
          .ft-related h2 { font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px; }
          .ft-related-sub { font-size:14px;color:#4A6080;margin:0 auto;max-width:560px; }
          .ft-related hr { border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0; }
          .ft-rtags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .ft-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s; }
          .ft-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09); }
          .ft-rtag-blue   { background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8; }
          .ft-rtag-violet { background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9; }
          .ft-rtag-amber  { background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309; }
          .ft-rtag-teal   { background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E; }
          .ft-rtag-green  { background:rgba(16,185,129,.09);border-color:rgba(16,185,129,.26);color:#065f46; }
          .ft-rtag-indigo { background:rgba(99,102,241,.09);border-color:rgba(99,102,241,.28);color:#3730a3; }

          /* Responsive */
          @media(max-width:1024px){
            .ft-hero h1,.ft-s-title,.ft-faq h2 { font-size:36px; }
            .ft-svc-grid { grid-template-columns:repeat(2,1fr); }
            .ft-stack-grid { grid-template-columns:repeat(2,1fr); }
            .ft-eng-grid { grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto; }
            .ft-eng-card.feat { transform:none; }
            .ft-eng-card.feat.ft-ev { transform:none; }
            .ft-eng-card.feat.ft-ev:hover { transform:translateY(-4px); }
            .ft-why-grid { grid-template-columns:repeat(2,1fr); }
            .ft-tgrid { grid-template-columns:1fr; }
            .ft-contact-grid { grid-template-columns:1fr; }
          }
          @media(max-width:768px){
            .ft-breadcrumb { padding:12px 20px 0; }
            .ft-hero { padding:28px 20px 20px; }
            .ft-hero h1 { font-size:26px;letter-spacing:-.3px; }
            .ft-stats { grid-template-columns:1fr 1fr; }
            .ft-stat-col:nth-child(2) { border-right:none; }
            .ft-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,.10); }
            .ft-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,.10);border-right:none; }
            .ft-logos { padding:16px 20px 28px; }
            .ft-svc-section,.ft-stack-section,.ft-eng-section,.ft-process-section,.ft-testi,.ft-why-section,.ft-faq,.ft-related { padding:52px 20px; }
            .ft-contact { padding:48px 20px; }
            .ft-svc-grid,.ft-stack-grid,.ft-why-grid { grid-template-columns:1fr; }
            .ft-frow { grid-template-columns:1fr; }
            .ft-ctitle { font-size:28px; }
            .ft-s-title { font-size:28px; }
          }
        `}</style>
      </Head>

      <div className="ft-page">
        <div className="ft-orb ft-orb-1" />
        <div className="ft-orb ft-orb-2" />
        <div className="ft-orb ft-orb-3" />

        {/* ── BREADCRUMB ── */}
        <nav className="ft-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Fintech Software Development Company</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <section className="ft-hero">
          <span className="ft-eyebrow">Fintech Software Development Company</span>
          <h1>Custom Fintech Software Development — PCI DSS Compliant, Secure &amp; Scalable</h1>
          <p className="ft-hero-desc">We design and build digital banking platforms, payment gateways, neobank solutions, investment apps, lending systems, InsurTech, and blockchain products for fintech startups, banks, and financial institutions across the US, UK, Australia, and Canada.</p>
          <div className="ft-trust-row">
            {['PCI DSS Compliant','SOC 2 Type II','15+ Years Experience','100+ Fintech Clients','End-to-End Development'].map(b => (
              <div className="ft-badge" key={b}><span className="ft-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="ft-ctas">
            <Link href="#contact" className="ft-btn-primary">Start Your Fintech Project</Link>
            <Link href="#engagement" className="ft-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="ft-stats" ref={statsRef}>
          {[['100+','Fintech Clients'],['300+','Projects Delivered'],['15+','Years Experience'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        {/* ── CLIENT LOGOS ── */}
        <div className="ft-logos">
          <span className="ft-logos-label">Trusted by Leading Organisations</span>
          <div className="ft-logos-wrap">
            <div className="ft-logos-track">
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
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="ft-clogo" />
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="ft-svc-section" aria-labelledby="ft-svc-heading">
          <div className="ft-inner">
            <div className={`ft-s-reveal${visibleSections.has('svc') ? ' ft-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="ft-s-eyebrow">What We Build</span>
              <h2 id="ft-svc-heading" className="ft-s-title">Fintech Software Solutions We Deliver</h2>
              <p className="ft-s-desc" style={{ maxWidth: 720 }}>From core digital banking and payment infrastructure to AI-powered lending, blockchain, and RegTech compliance platforms — we cover the full spectrum of financial technology with deep PCI DSS and regulatory expertise.</p>
            </div>
            <div className="ft-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`ft-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' ft-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="ft-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="ft-svc-more">
                <button className="ft-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section id="stack" className="ft-stack-section" aria-labelledby="ft-stack-heading">
          <div className="ft-inner">
            <div className={`ft-s-reveal${visibleSections.has('stk') ? ' ft-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="ft-s-eyebrow">The Fintech Tech Stack We Use</span>
              <h2 id="ft-stack-heading" className="ft-s-title">Technology Built for Financial-Grade Performance</h2>
              <p className="ft-s-desc" style={{ maxWidth: 680 }}>Every tool in our stack is selected for security, regulatory compliance, and the sub-millisecond reliability that financial systems demand — from payment processing to real-time fraud detection.</p>
            </div>
            <div className="ft-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`ft-stack-card${visibleStackCards.includes(i) ? ' ft-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="ft-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="ft-stack-pills">
                    {grp.items.map(item => (
                      <span key={item} className="ft-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section id="engagement" className="ft-eng-section" aria-labelledby="ft-eng-heading">
          <div className="ft-inner">
            <div className={`ft-s-reveal${visibleSections.has('eng') ? ' ft-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="ft-s-eyebrow">How We Work With You</span>
              <h2 id="ft-eng-heading" className="ft-s-title">Engagement Models for Fintech Development</h2>
              <p className="ft-s-desc" style={{ maxWidth: 680 }}>Whether you need a fixed-price MVP, a long-term dedicated engineering team, or flexible time-and-material development, we adapt our delivery model to your stage, budget, and regulatory timeline.</p>
            </div>
            <div className="ft-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`ft-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' ft-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="ft-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="ft-eng-icon">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg>
                  </div>
                  <div className="ft-eng-name">{m.name}</div>
                  <div className="ft-eng-headline">{m.headline}</div>
                  <div className="ft-eng-desc">{m.desc}</div>
                  <div className="ft-eng-list-label">Best for</div>
                  <ul className="ft-eng-list">
                    {m.bestFor.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="ft-eng-process">
                    <strong>Process:</strong> {m.process}<br />
                    <span className="ft-eng-timeline">{m.timeline}</span>
                  </div>
                  <Link href="#contact" className="ft-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="ft-process-section" aria-labelledby="ft-proc-heading">
          <div className="ft-inner" style={{ maxWidth: 760 }}>
            <div className={`ft-s-reveal${visibleSections.has('proc') ? ' ft-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="ft-s-eyebrow">How We Deliver</span>
              <h2 id="ft-proc-heading" className="ft-s-title">Our Fintech Development Process</h2>
              <p className="ft-s-desc">A structured six-stage process designed for compliance-first financial software — from regulatory scoping to production monitoring.</p>
            </div>
            <div className="ft-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`ft-pstep${visibleSections.has('proc') ? ' ft-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="ft-pstep-l">
                    <div className="ft-pstep-circle">{step.num}</div>
                    <div className="ft-pstep-connector" />
                  </div>
                  <div className="ft-pstep-r">
                    <div className="ft-pstep-title">{step.title}</div>
                    <p className="ft-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="ft-testi" aria-labelledby="ft-ts-heading">
          <div className="ft-inner">
            <div className={`ft-center-head ft-s-reveal${visibleSections.has('ts') ? ' ft-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="ft-s-eyebrow">Client Results</span>
              <h2 id="ft-ts-heading" className="ft-s-title">What Our Fintech Clients Say</h2>
              <p className="ft-s-desc">Trusted by digital banks, payment platforms, and lending companies across the US, UK, and Australia.</p>
            </div>
            <div className="ft-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`ft-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' ft-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}
                  itemScope itemType="https://schema.org/Review">
                  <div className="ft-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="ft-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="ft-tauthor">
                    <div className="ft-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div>
                      <div className="ft-tname" itemProp="author">{t.name}</div>
                      <div className="ft-trole">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="ft-why-section" aria-labelledby="ft-wy-heading">
          <div className="ft-inner">
            <div className={`ft-s-reveal${visibleSections.has('wy') ? ' ft-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="ft-s-eyebrow">Why 1Solutions</span>
              <h2 id="ft-wy-heading" className="ft-s-title">Why Choose Us for Fintech Development</h2>
              <p className="ft-s-desc" style={{ maxWidth: 680 }}>15+ years of financial software engineering, a zero-breach security record, and deep regulatory expertise across PCI DSS, FCA, ASIC, and FinCEN jurisdictions.</p>
            </div>
            <div className="ft-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`ft-wcard${visibleWhyCards.includes(i) ? ' ft-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="ft-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="ft-contact" aria-labelledby="ft-contact-heading">
          <div className="ft-contact-grid">
            <div>
              <h2 id="ft-contact-heading" className="ft-ctitle">Start Your Fintech Project</h2>
              <p className="ft-cdesc">Tell us about your product and we will schedule a free 60-minute discovery call with a senior fintech architect. No sales pitch — just technical clarity on what you need to build and how to build it compliantly.</p>
              <div className="ft-cbenefits">
                {[
                  ['✓', 'Free 60-minute discovery call with a senior fintech architect'],
                  ['✓', 'Preliminary PCI DSS / regulatory scoping at no charge'],
                  ['✓', 'Architecture recommendation and tech stack advice before you commit'],
                  ['✓', 'NDA available on request — your idea stays protected'],
                  ['✓', 'Response within 24 business hours from our fintech team'],
                ].map(([icon, text]) => (
                  <div className="ft-cbenefit" key={text}>
                    <span className="ft-cbenefit-icon">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ft-form-box">
              <h3>Tell Us About Your Fintech Project</h3>
              <form className="ft-form" onSubmit={e => e.preventDefault()}>
                <div className="ft-frow">
                  <div className="ft-fg">
                    <label htmlFor="ft-name">Full Name *</label>
                    <input id="ft-name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="ft-fg">
                    <label htmlFor="ft-email">Work Email *</label>
                    <input id="ft-email" type="email" placeholder="you@company.com" required />
                  </div>
                </div>
                <div className="ft-frow">
                  <div className="ft-fg">
                    <label htmlFor="ft-company">Company</label>
                    <input id="ft-company" type="text" placeholder="Company name" />
                  </div>
                  <div className="ft-fg">
                    <label htmlFor="ft-phone">Phone / WhatsApp</label>
                    <input id="ft-phone" type="tel" placeholder="+1 555 000 0000" />
                  </div>
                </div>
                <div className="ft-fg full">
                  <label htmlFor="ft-type">Fintech Project Type *</label>
                  <select id="ft-type" required>
                    <option value="">Select project type...</option>
                    <option>Digital Banking Platform</option>
                    <option>Payment Gateway</option>
                    <option>Neobank / Challenger Bank</option>
                    <option>Investment / Trading Platform</option>
                    <option>Personal Finance App</option>
                    <option>Lending / Loan Management</option>
                    <option>InsurTech Platform</option>
                    <option>RegTech / KYC / AML</option>
                    <option>Blockchain / DeFi</option>
                    <option>Open Banking / API</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="ft-fg full">
                  <label htmlFor="ft-msg">Project Brief *</label>
                  <textarea id="ft-msg" rows={4} placeholder="Describe your fintech product, target market, regulatory requirements, and timeline..." required />
                </div>
                <div className="ft-consent">
                  <input id="ft-consent" type="checkbox" required />
                  <label htmlFor="ft-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. An NDA is available on request to protect your idea before our first call.</label>
                </div>
                <button type="submit" className="ft-submit">Get Free Discovery Call →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="ft-faq" aria-labelledby="ft-faq-heading">
          <div className="ft-inner" style={{ maxWidth: 860 }}>
            <span className="ft-s-eyebrow">FAQ</span>
            <h2 id="ft-faq-heading">Fintech Development — Frequently Asked Questions</h2>
            <p className="ft-faq-sub">Everything you need to know about building PCI DSS-compliant, production-ready fintech software with 1Solutions.</p>
            <div className="ft-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`ft-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="ft-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="ft-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="ft-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="ft-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="ft-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="ft-related">
          <div className="ft-related-inner">
            <span className="ft-s-eyebrow">Explore More</span>
            <h2>Related Services &amp; Industries</h2>
            <p className="ft-related-sub">We also build software for healthcare, eCommerce, education, logistics, and on-demand platforms.</p>
            <hr />
            <div className="ft-rtags">
              {[
                ['/healthcare-software-development/', 'Healthcare Software Development', 'ft-rtag-green'],
                ['/ecommerce-website-development/', 'eCommerce Development', 'ft-rtag-blue'],
                ['/mobile-app-development/', 'Mobile App Development', 'ft-rtag-violet'],
                ['/blockchain-development/', 'Blockchain Development', 'ft-rtag-indigo'],
                ['/custom-software-development/', 'Custom Software Development', 'ft-rtag-amber'],
                ['/ai-ml-development/', 'AI / ML Development', 'ft-rtag-teal'],
                ['/react-js-development-company/', 'React.js Development', 'ft-rtag-blue'],
                ['/node-js-development-company/', 'Node.js Development', 'ft-rtag-green'],
                ['/python-development-company/', 'Python Development', 'ft-rtag-indigo'],
                ['/api-development-company/', 'API Development', 'ft-rtag-violet'],
              ].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`ft-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
