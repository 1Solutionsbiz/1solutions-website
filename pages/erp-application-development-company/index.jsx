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
        { '@type': 'ListItem', position: 2, name: 'ERP Application Development Company', item: 'https://www.1solutions.biz/erp-application-development-company/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'ERP Application Development',
      url: 'https://www.1solutions.biz/erp-application-development-company/',
      description: 'Custom ERP application development — finance, inventory, manufacturing, procurement, HR, and supply chain modules built to unify your operations, eliminate data silos, and replace expensive off-the-shelf ERP licensing with a platform you fully own.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '103', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Why build a custom ERP instead of using SAP or Oracle?', acceptedAnswer: { '@type': 'Answer', text: 'SAP, Oracle, and Microsoft Dynamics are powerful but carry steep licensing costs, lengthy implementation timelines (12–36 months), heavy customisation consultancy fees, and significant process adaptation burden. A custom ERP is built precisely around your business processes — your chart of accounts, your production workflows, your approval hierarchies — with no licensing fees, no forced upgrades, and full ownership of the code and data. For mid-market and growth-stage companies, a custom ERP typically costs 40–70% less over 5 years than an equivalent SAP or Oracle implementation.' } },
        { '@type': 'Question', name: 'How long does custom ERP development take?', acceptedAnswer: { '@type': 'Answer', text: 'A core ERP covering finance (GL, AP/AR, invoicing), inventory management, and basic procurement typically takes 20–28 weeks. Adding manufacturing (BOM, production orders, MES integration), HR and payroll, or advanced supply chain modules adds 8–14 weeks per module. A full enterprise ERP covering all major modules with multi-entity, multi-currency, and BI dashboards typically takes 12–18 months. We use a modular delivery approach — core modules go live first while additional modules are built in parallel.' } },
        { '@type': 'Question', name: 'Can you integrate a custom ERP with our existing systems?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. ERP integration is a core specialisation. We have built integrations with CRM systems (Salesforce, HubSpot, custom CRM), eCommerce platforms (Shopify, WooCommerce, Magento), payment gateways, banking APIs, logistics and 3PL systems (ShipBob, ShipStation), HRMS platforms, EDI for supplier and customer data exchange, customs and tax systems, and BI tools (Power BI, Tableau, Metabase). All integrations are built with error handling, retry logic, and real-time monitoring dashboards.' } },
        { '@type': 'Question', name: 'Can you migrate data from SAP, Oracle, or legacy ERP to a custom system?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We handle full ERP data migrations from SAP Business One, SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics, Sage, Epicor, Infor, and legacy custom ERP systems. Migration covers chart of accounts, GL balances, open transactions, vendor and customer master data, inventory records, historical orders, and employee data. We run the migration on a staging system first, validate data integrity with automated reconciliation checks, and perform a final delta migration before go-live cutover.' } },
        { '@type': 'Question', name: 'Do you build cloud-based ERP systems?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. All ERP systems we build are cloud-native by default, deployed on AWS, Azure, or Google Cloud with auto-scaling infrastructure, multi-availability-zone redundancy, and 99.9% uptime SLA. We also offer hybrid deployment models for organisations with on-premise data requirements — with cloud-based analytics and reporting layers connected to on-premise operational databases. Mobile ERP access for iOS and Android is included across all cloud ERP builds.' } },
        { '@type': 'Question', name: 'What ERP modules do you develop?', acceptedAnswer: { '@type': 'Answer', text: 'We develop the full spectrum of ERP modules: Financial Management (GL, AP, AR, fixed assets, budgeting, multi-entity consolidation), Inventory & Warehouse Management (multi-location, barcode/RFID, lot tracking, reorder automation), Manufacturing (BOM, MRP, production orders, shop floor control), Procurement (purchase orders, supplier management, three-way matching), Sales Order Management, HR & Payroll, Project Management & Job Costing, Supply Chain Management, and Business Intelligence dashboards. Modules are built independently and integrated into a unified data platform.' } },
      ],
    },
  ],
};

/* ─── Page data ──────────────────────────────────────────────── */
const SERVICES = [
  { n: '01', title: 'Custom ERP Development', desc: 'End-to-end custom ERP platforms designed around your business processes — modular architecture covering finance, inventory, manufacturing, procurement, HR, and supply chain, unified in a single data platform with role-based access.' },
  { n: '02', title: 'Financial Management Module', desc: 'General ledger, accounts payable/receivable, invoicing, multi-currency, multi-entity consolidation, fixed asset management, budgeting, cash flow forecasting, and tax compliance reporting built to your chart of accounts.', feat: true },
  { n: '03', title: 'Inventory & Warehouse Management', desc: 'Multi-location inventory control with barcode and RFID integration, lot and serial number tracking, reorder point automation, cycle counting, goods receipt/issue workflows, and warehouse management system (WMS) capabilities.' },
  { n: '04', title: 'Manufacturing & Production (MES)', desc: 'Bill of materials (BOM), material requirements planning (MRP), production order management, shop floor scheduling, work-in-progress (WIP) tracking, capacity planning, quality control, and manufacturing execution system (MES) integration.' },
  { n: '05', title: 'Procurement & Supplier Management', desc: 'Purchase requisition and order management, supplier master data, RFQ and tender management, three-way invoice matching (PO / receipt / invoice), supplier scorecards, and contract management with automated renewal alerts.' },
  { n: '06', title: 'HR, Payroll & Workforce Management', desc: 'Employee master data, organisational hierarchy, leave and attendance management, payroll processing (multi-country), expense claims, performance management, onboarding workflows, and self-service employee portals.' },
  { n: '07', title: 'Supply Chain & Demand Planning', desc: 'End-to-end supply chain visibility with demand forecasting (AI/ML-driven), supplier lead time tracking, safety stock optimisation, logistics integration (3PL, freight, customs), and multi-tier supply chain analytics.' },
  { n: '08', title: 'ERP Integration & API Connectivity', desc: 'Bidirectional integrations with CRM systems, eCommerce platforms (Shopify, WooCommerce), payment gateways, banking APIs, logistics providers, EDI for trading partners, BI tools, and customs/tax compliance systems.' },
  { n: '09', title: 'ERP Migration & Legacy Modernisation', desc: 'Full ERP data migrations from SAP, Oracle NetSuite, Microsoft Dynamics, Sage, Epicor, Infor, or legacy bespoke systems — with GL balance migration, open transaction transfer, master data mapping, and staged cutover.' },
  { n: '10', title: 'ERP Analytics & BI Dashboards', desc: 'Real-time operational dashboards, financial consolidation reports, production efficiency KPIs, inventory turnover analytics, procurement spend analysis, and executive BI dashboards built on ClickHouse, Metabase, or Power BI.' },
];

const TECH_STACK = [
  {
    group: 'Backend Development',
    color: '#ea580c',
    items: ['Node.js / Express', 'Python / Django', 'Java / Spring Boot', '.NET Core', 'PHP / Laravel', 'GraphQL / REST APIs'],
  },
  {
    group: 'Frontend Development',
    color: '#c2410c',
    items: ['React.js', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Ant Design / MUI'],
  },
  {
    group: 'Mobile ERP',
    color: '#0ea5e9',
    items: ['Flutter', 'React Native', 'Swift (iOS)', 'Kotlin (Android)', 'Offline-first sync', 'Barcode / RFID scanning'],
  },
  {
    group: 'ERP Integrations',
    color: '#D97706',
    items: ['SAP API / RFC', 'Oracle NetSuite SuiteScript', 'Microsoft Dynamics 365', 'Odoo ORM / XML-RPC', 'EDI (X12, EDIFACT)', 'Shopify / WooCommerce'],
  },
  {
    group: 'Databases & Warehousing',
    color: '#14b8a6',
    items: ['PostgreSQL', 'MySQL / MariaDB', 'MongoDB', 'Redis (caching)', 'ClickHouse (analytics)', 'Elasticsearch'],
  },
  {
    group: 'AI / ML & Analytics',
    color: '#f97316',
    items: ['Demand Forecasting ML', 'Predictive Maintenance', 'Anomaly Detection', 'NLP (Document AI)', 'Power BI / Metabase', 'Apache Superset'],
  },
  {
    group: 'Cloud & DevOps',
    color: '#6366f1',
    items: ['AWS (EC2, RDS, Lambda)', 'Azure (App Service, AKS)', 'Google Cloud', 'Docker / Kubernetes', 'CI/CD (GitHub Actions)', 'Terraform / Ansible'],
  },
  {
    group: 'Security & Compliance',
    color: '#7c3aed',
    items: ['SOC 2 Ready', 'ISO 27001 Aligned', 'Role-based Access (RBAC)', 'Data Encryption (AES-256)', 'Audit Logs & Trails', 'GDPR / CCPA Compliant'],
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
    headline: 'Your offshore ERP engineering team. Full-time. Fully yours.',
    desc: 'A dedicated squad of ERP specialists — backend engineer, frontend developer, database architect, QA, and DevOps — working exclusively on your ERP platform at a fraction of US/UK/AU hiring cost. Full source code and IP ownership retained by you.',
    bestFor: ['Full ERP platform development (multi-module)', 'Long-term ERP product or SaaS roadmap', 'Replacing or augmenting an in-house ERP team', 'Industry-vertical ERP built for resale'],
    process: 'Team assembly → Discovery sprint → Modular delivery → Continuous roadmap',
    timeline: 'Ongoing — scale up or down each quarter',
  },
  {
    id: 'fixed',
    name: 'Fixed Price',
    badge: 'Well-defined scope',
    badgeColor: '#ea580c',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'Agreed price. Agreed scope. Milestone delivery.',
    desc: 'Best for well-defined ERP modules or a core ERP build with a clear specification. We agree on deliverables, price, and timeline upfront — with milestone-based releases and full transparency. No scope creep, no surprise invoices.',
    bestFor: ['Core ERP MVP (Finance + Inventory + Procurement)', 'Specific ERP module (Manufacturing, HR, WMS)', 'ERP data migration from legacy system', 'Custom ERP integration with a defined API'],
    process: 'Detailed spec → Fixed quote → Milestone delivery → Sign-off',
    timeline: 'Best for projects 12–28 weeks',
  },
  {
    id: 'tm',
    name: 'Time & Material',
    badge: 'Agile & flexible',
    badgeColor: '#0ea5e9',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Pay for hours worked. Adapt as requirements evolve.',
    desc: 'Billed on actual time and resources used. Best for ERP discovery phases, proof-of-concept builds, AI analytics module development, or iterative feature additions to an existing ERP where business requirements are still being defined.',
    bestFor: ['ERP discovery, scoping & process mapping', 'Adding AI demand forecasting or BI module', 'ERP audit, performance, or security review', 'Proof-of-concept for a new ERP module'],
    process: 'Sprint planning → Biweekly delivery → Iterative refinement → Transparent timesheets',
    timeline: 'Start in 1 week — no lengthy onboarding',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Business Process Discovery & Requirements Mapping', desc: 'We conduct structured workshops with your finance, operations, procurement, manufacturing, and HR stakeholders to map existing workflows, identify pain points, define data ownership, and establish integration requirements — before a single line of code is written.' },
  { num: '02', title: 'ERP Architecture & Data Modelling', desc: 'Our architects design a modular, scalable ERP architecture with a unified data model — shared master data (entities, accounts, locations, products) with module-specific transaction tables, a clean API layer, and a reporting data warehouse decoupled from operational databases.' },
  { num: '03', title: 'Phased Module Development — Core First', desc: 'We build and deliver the core financial and inventory modules first, getting your team on live data quickly. Manufacturing, procurement, HR, and supply chain modules are built in parallel sprints, with biweekly demo releases on a shared staging environment.' },
  { num: '04', title: 'Integration Development & EDI/API Connectivity', desc: 'All required integrations are designed, built, and tested — CRM, eCommerce, banking, logistics, EDI trading partners, tax engines, and BI tools. Integration monitoring dashboards with alert thresholds are delivered alongside each connector.' },
  { num: '05', title: 'Data Migration, UAT & Parallel Run', desc: 'Full data migration from your legacy or interim system — GL balances, open transactions, vendor and customer master data, inventory, and historical records. A controlled parallel run period validates ERP data accuracy against your existing system before final cutover.' },
  { num: '06', title: 'Go-Live, Training & Ongoing Optimisation', desc: 'Staged go-live starting with pilot business units, followed by phased rollout. User training sessions, admin documentation, and an ERP helpdesk during the hypercare period. Post-go-live, new modules and features continue on a sprint roadmap.' },
];

const TESTIMONIALS = [
  {
    text: "We replaced a decade-old legacy ERP — finance, inventory, and procurement — with a custom platform built by 1Solutions. The project was delivered on time and on budget, and we went live with zero disruption to month-end close. Our finance team had full real-time visibility for the first time in years.",
    name: 'Claire W.', role: 'CFO, Manufacturing Group (UK)', init: 'CW', bg: '#0F3460',
  },
  {
    text: "Our distribution business had 4 different systems for orders, inventory, finance, and logistics. 1Solutions unified everything into a single ERP with real-time dashboards and EDI connectivity to our top 12 suppliers. Inventory accuracy went from 78% to 98.5% in the first quarter after go-live.",
    name: 'Tom B.', role: 'COO, Distribution Company (US)', init: 'TB', bg: '#431407', feat: true,
  },
  {
    text: "We are a food manufacturing business with complex lot tracking, expiry date management, and food safety compliance requirements. 1Solutions built a custom ERP with full production traceability from raw material to finished goods. Audit prep time dropped from 3 weeks to 2 days.",
    name: 'Anita R.', role: 'Operations Director, Food Manufacturer (AU)', init: 'AR', bg: '#1a4a3a',
  },
];

const WHY_CARDS = [
  { title: '15+ Years ERP & Enterprise Application Expertise', desc: 'We have been building ERP systems and enterprise business applications since 2008 — across manufacturing, distribution, retail, food and beverage, professional services, and government sectors.' },
  { title: 'Modular Architecture — Go Live Faster', desc: 'We build ERP systems module by module. Your core finance and inventory modules go live in 20–28 weeks while manufacturing and HR modules are built in parallel — so your team benefits from the new system long before the full platform is complete.' },
  { title: 'No Licensing Fees. Ever.', desc: 'A custom ERP eliminates per-user ERP licensing permanently. For most mid-market businesses, the development investment pays back within 18–24 months versus SAP or Oracle licensing, implementation consultancy, and annual support costs.' },
  { title: 'Deep Integration Expertise', desc: 'We have built ERP integrations with 60+ external systems — CRM, eCommerce, 3PL and logistics, banking APIs, EDI trading partners, customs platforms, tax engines (Avalara, Vertex), and BI tools — with full monitoring and alerting.' },
  { title: 'AI-Powered Demand & Supply Intelligence', desc: 'We integrate ML-powered demand forecasting, inventory optimisation, supplier risk scoring, predictive maintenance scheduling, and anomaly detection directly into ERP operational workflows — not as a bolt-on afterthought.' },
  { title: 'SOC 2 Ready, ISO 27001 Aligned', desc: 'ERP platforms we build include RBAC, AES-256 encryption at rest and in transit, comprehensive audit logs, immutable financial transaction records, data retention policies, and SOC 2 Type II-ready access control frameworks.' },
  { title: 'US / UK / AU / Global Delivery', desc: 'We serve manufacturers, distributors, retailers, and service businesses across North America, Europe, and Australia — adapting to GAAP, IFRS, GST, VAT, and regional payroll tax requirements in the ERP financial and compliance modules.' },
  { title: 'Transparent Delivery. Full Ownership.', desc: 'Biweekly module demos, weekly progress reports, shared sprint boards, and direct architect access. All source code, data schemas, and IP are 100% yours from day one — no vendor lock-in, no held-hostage upgrades.' },
];

const FAQS = [
  { q: 'Why build a custom ERP instead of using SAP or Oracle?', a: 'SAP, Oracle, and Microsoft Dynamics are powerful but carry steep per-user licensing, lengthy 12–36 month implementation timelines, heavy customisation consultancy fees, and significant process adaptation overhead. A custom ERP is built precisely around your business processes — your chart of accounts, production workflows, approval hierarchies — with no licensing fees, no forced upgrades, and full code ownership. For mid-market businesses, a custom ERP typically costs 40–70% less over 5 years than an equivalent SAP or Oracle implementation with comparable functionality.' },
  { q: 'How long does custom ERP development take?', a: 'A core ERP covering finance (GL, AP/AR, invoicing), inventory management, and basic procurement typically takes 20–28 weeks. Adding manufacturing (BOM, production orders, MES integration), HR and payroll, or advanced supply chain modules adds 8–14 weeks per module. A full enterprise ERP with all major modules, multi-entity consolidation, multi-currency, and BI dashboards typically takes 12–18 months. We use a modular delivery approach — core modules go live first while additional modules are built in parallel sprints.' },
  { q: 'Can you integrate a custom ERP with our existing systems?', a: 'Yes. ERP integration is a core specialisation. We have built integrations with CRM systems (Salesforce, HubSpot, custom CRM), eCommerce platforms (Shopify, WooCommerce, Magento), payment gateways, banking APIs, logistics and 3PL systems (ShipBob, ShipStation), HRMS platforms, EDI for supplier and customer data exchange (X12 and EDIFACT standards), customs and tax systems, and BI tools (Power BI, Tableau, Metabase). All integrations include error handling, retry logic, and real-time monitoring dashboards.' },
  { q: 'Can you migrate data from SAP, Oracle, or a legacy ERP?', a: 'Yes. We handle full ERP data migrations from SAP Business One, SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics, Sage 50/200/300, Epicor, Infor, and legacy bespoke systems. Migration covers chart of accounts, GL opening balances, open AP/AR transactions, vendor and customer master data, inventory records with lot and serial history, and historical purchase and sales orders. We run the migration on staging first, validate with automated reconciliation checks, and perform a final delta migration before go-live cutover.' },
  { q: 'Do you build cloud-based ERP systems?', a: 'Yes. All ERP systems we build are cloud-native by default, deployed on AWS, Azure, or Google Cloud with auto-scaling infrastructure, multi-availability-zone redundancy, and 99.9% uptime SLA. We also support hybrid deployment for organisations with on-premise data requirements — with cloud-based analytics and reporting connected to on-premise operational databases. Mobile ERP access for iOS and Android with offline-first capability is included across all cloud ERP builds.' },
  { q: 'What ERP modules do you develop?', a: 'We develop the full ERP module spectrum: Financial Management (GL, AP, AR, fixed assets, budgeting, multi-entity consolidation), Inventory and Warehouse Management (multi-location, barcode/RFID, lot tracking, reorder automation), Manufacturing (BOM, MRP, production orders, shop floor control, MES integration), Procurement (purchase orders, supplier management, three-way matching), Sales Order Management, HR and Payroll, Project Management and Job Costing, Supply Chain Management, and Business Intelligence dashboards. Modules are built independently and integrated into a unified data platform.' },
  { q: 'Can you build a multi-entity, multi-currency ERP?', a: 'Yes. Multi-entity and multi-currency ERP is a standard capability in the platforms we build. This includes separate legal entity accounting with intercompany transaction elimination, consolidated group reporting in a base currency, real-time exchange rate integration (via open banking or FX API), currency revaluation, and country-specific tax handling. We have delivered multi-entity ERP for groups operating across US, UK, EU, Australia, and the Middle East simultaneously.' },
  { q: 'Do you offer ERP support and feature development after launch?', a: 'Yes — all ERP projects include a 30-day hypercare period post go-live with prioritised SLA support. We then offer ongoing support plans covering security patches, database performance optimisation, third-party API updates as provider APIs evolve, regulatory compliance updates (tax rule changes, payroll updates), and feature development sprints. Our dedicated team model is ideal for post-launch ERP evolution — your team continues on a sprint cadence delivering the next roadmap modules as your business grows.' },
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
    <div className="er-stat-col">
      <div className="er-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="er-stat-label">{label}</div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export default function ErpApplicationDevelopment() {
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
        <title>ERP Application Development Company | Custom ERP Software | 1Solutions</title>
        <meta name="description" content="Custom ERP application development — finance, inventory, manufacturing, procurement, HR & supply chain modules built to replace SAP/Oracle at a fraction of the cost. 15+ years | 120+ ERP projects | Free discovery call." />
        <link rel="canonical" href="https://www.1solutions.biz/erp-application-development-company/" />
        <meta property="og:title" content="ERP Application Development Company | 1Solutions" />
        <meta property="og:description" content="Custom ERP software — finance, inventory, manufacturing, procurement, HR & supply chain. Replace SAP/Oracle licensing with a platform you own. 15+ years | 120+ ERP projects." />
        <meta property="og:url" content="https://www.1solutions.biz/erp-application-development-company/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .er-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; position:relative; overflow-x:hidden; }
          .er-page *,.er-page *::before,.er-page *::after { box-sizing:border-box; }

          /* Orbs */
          .er-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(20px); }
          .er-orb-1 { width:880px;height:880px;background:radial-gradient(circle,rgba(234,88,12,.22) 0%,rgba(249,115,22,.10) 40%,transparent 70%);top:-280px;right:-260px; }
          .er-orb-2 { width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px; }
          .er-orb-3 { width:550px;height:550px;background:radial-gradient(circle,rgba(99,102,241,.16) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%); }

          /* Breadcrumb */
          .er-breadcrumb { position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto; }
          .er-breadcrumb ol { display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0; }
          .er-breadcrumb li { display:flex;align-items:center;gap:6px; }
          .er-breadcrumb li::after { content:'/';opacity:.45; }
          .er-breadcrumb li:last-child::after { display:none; }
          .er-breadcrumb a { color:#0F3460;text-decoration:none; }
          .er-breadcrumb a:hover { text-decoration:underline; }

          /* Hero */
          .er-hero { position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px; }
          .er-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px; }
          .er-hero h1 { font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#ea580c 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .er-hero-desc { font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px; }
          .er-trust-row { display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px; }
          .er-badge { display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07); }
          .er-badge-dot { width:7px;height:7px;border-radius:50%;background:#ea580c;flex-shrink:0; }
          .er-ctas { display:flex;flex-wrap:wrap;gap:12px;justify-content:center; }
          .er-btn-primary { display:inline-block;padding:14px 36px;background:#ea580c;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(234,88,12,.30); }
          .er-btn-primary:hover { background:#0F3460;transform:translateY(-2px); }
          .er-btn-ghost { display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s; }
          .er-btn-ghost:hover { background:rgba(255,255,255,.85);border-color:rgba(234,88,12,.5);transform:translateY(-2px); }

          /* Stats */
          .er-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95); }
          .er-stat-col { padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10); }
          .er-stat-col:last-child { border-right:none; }
          .er-stat-val { font-size:28px;font-weight:900;color:#ea580c;letter-spacing:-.5px;line-height:1; }
          .er-stat-label { font-size:11px;color:#4A6080;font-weight:500;margin-top:5px; }

          /* Logos */
          .er-logos { position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px; }
          .er-logos-label { font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0; }
          .er-logos-wrap { width:100%;overflow:hidden; }
          .er-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:er-marquee 28s linear infinite; }
          .er-logos-track:hover { animation-play-state:paused; }
          @keyframes er-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .er-clogo { height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s; }
          .er-clogo:hover { opacity:.85;filter:grayscale(0%); }

          /* Shared */
          .er-s-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block; }
          .er-s-title { font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .er-s-desc { font-size:15px;color:#4A6080;line-height:1.7; }
          .er-s-reveal { opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1); }
          .er-s-reveal.er-revealed { opacity:1;transform:translateY(0); }
          .er-inner { max-width:1300px;margin:0 auto; }

          /* Services */
          .er-svc-section { background:transparent;padding:72px 40px 60px;position:relative;z-index:1; }
          .er-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px; }
          .er-svc-card { background:linear-gradient(135deg,rgba(255,237,213,.40) 0%,rgba(255,255,255,.82) 55%,rgba(219,234,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s; }
          .er-svc-card.er-cv { opacity:1;transform:translateY(0); }
          .er-svc-card.er-cv:hover { transform:translateY(-6px);border-color:rgba(234,88,12,.35);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .er-svc-card.feat { background:linear-gradient(135deg,rgba(255,237,213,.55) 0%,rgba(255,255,255,.87) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(234,88,12,.22); }
          .er-svc-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .er-svc-card h3 { font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1; }
          .er-svc-card p { font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1; }
          .er-svc-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#ea580c,#f97316);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1); }
          .er-svc-card.er-cv:hover::before { transform:scaleY(1); }
          .er-svc-more { text-align:center;margin-top:22px; }
          .er-btn-more { display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit; }
          .er-btn-more:hover { background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px); }

          /* Tech Stack */
          .er-stack-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1; }
          .er-stack-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px; }
          .er-stack-card { background:linear-gradient(135deg,rgba(255,237,213,.40) 0%,rgba(255,255,255,.82) 55%,rgba(219,234,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .er-stack-card.er-sv { opacity:1;transform:translateY(0); }
          .er-stack-card.er-sv:hover { border-color:rgba(234,88,12,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .er-stack-group { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid; }
          .er-stack-pills { display:flex;flex-wrap:wrap;gap:6px; }
          .er-pill { display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid; }

          /* Engagement Models */
          .er-eng-section { padding:80px 40px;position:relative;z-index:1; }
          .er-eng-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
          .er-eng-card { background:linear-gradient(135deg,rgba(255,237,213,.40) 0%,rgba(255,255,255,.82) 55%,rgba(219,234,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s; }
          .er-eng-card.er-ev { opacity:1;transform:translateY(0); }
          .er-eng-card.er-ev:hover { border-color:rgba(234,88,12,.30);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .er-eng-card.feat { background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(255,237,213,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .er-eng-card.feat.er-ev { transform:translateY(-8px); }
          .er-eng-card.feat.er-ev:hover { transform:translateY(-12px); }
          .er-eng-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px; }
          .er-eng-icon { width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s; }
          .er-eng-card.er-ev:hover .er-eng-icon { background:rgba(234,88,12,.10); }
          .er-eng-card.feat .er-eng-icon { background:rgba(217,119,6,.10); }
          .er-eng-icon svg { fill:#0F3460;transition:fill .2s; }
          .er-eng-card.er-ev:hover .er-eng-icon svg { fill:#ea580c; }
          .er-eng-card.feat .er-eng-icon svg { fill:#D97706; }
          .er-eng-name { font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px; }
          .er-eng-headline { font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px; }
          .er-eng-desc { font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px; }
          .er-eng-list-label { font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px; }
          .er-eng-list { list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px; }
          .er-eng-list li { display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5; }
          .er-eng-list li::before { content:'✓';font-weight:800;color:#ea580c;flex-shrink:0;margin-top:1px; }
          .er-eng-process { font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08); }
          .er-eng-process strong { color:#0F3460; }
          .er-eng-timeline { display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px; }
          .er-eng-cta { display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18); }
          .er-eng-cta:hover { background:#0F3460;color:#fff; }
          .er-eng-card.feat .er-eng-cta { background:#ea580c;color:#fff;border-color:#ea580c; }
          .er-eng-card.feat .er-eng-cta:hover { background:#0F3460;border-color:#0F3460; }

          /* Process */
          .er-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .er-psteps { display:flex;flex-direction:column;margin-top:52px; }
          .er-pstep { display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1); }
          .er-pstep.er-pv { opacity:1;transform:translateY(0); }
          .er-pstep-l { display:flex;flex-direction:column;align-items:center; }
          .er-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s; }
          .er-pstep.er-pv:hover .er-pstep-circle { background:rgba(234,88,12,.12);border-color:#ea580c;color:#ea580c; }
          .er-pstep-connector { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px; }
          .er-pstep-connector::before { content:'';width:2px;flex:1;background:#0F3460;opacity:.22; }
          .er-pstep-connector::after { content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40; }
          .er-pstep:last-child .er-pstep-connector { display:none; }
          .er-pstep-r { padding:4px 0 38px; }
          .er-pstep:last-child .er-pstep-r { padding-bottom:0; }
          .er-pstep-title { font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px; }
          .er-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* Testimonials */
          .er-testi { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .er-center-head { text-align:center;margin-bottom:48px; }
          .er-tgrid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px; }
          .er-tcard { background:linear-gradient(135deg,rgba(255,237,213,.40) 0%,rgba(255,255,255,.82) 55%,rgba(219,234,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s; }
          .er-tcard.feat { background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(255,237,213,.42) 100%);border-color:rgba(217,119,6,.22); }
          .er-tcard.er-tv { opacity:1;transform:translateY(0); }
          .er-tcard.er-tv:hover { transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .er-stars { font-size:16px;color:#D97706;letter-spacing:2px; }
          .er-ttext { font-size:14px;line-height:1.75;color:#374151;flex:1; }
          .er-tauthor { display:flex;align-items:center;gap:12px; }
          .er-tavatar { width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
          .er-tname { font-size:14px;font-weight:700;color:#0F3460; }
          .er-trole { font-size:12px;color:#6b7280; }

          /* Why */
          .er-why-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .er-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px; }
          .er-wcard { background:linear-gradient(135deg,rgba(255,237,213,.40) 0%,rgba(255,255,255,.82) 55%,rgba(219,234,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .er-wcard.er-wv { opacity:1;transform:translateY(0) scale(1); }
          .er-wcard.er-wv:hover { transform:translateY(-5px) scale(1);border-color:rgba(234,88,12,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .er-wcard-dot { width:10px;height:10px;border-radius:50%;background:#ea580c;margin-bottom:12px; }
          .er-wcard h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .er-wcard p { font-size:13px;color:#4A6080;line-height:1.65;margin:0; }

          /* Contact */
          .er-contact { padding:70px 40px;background:linear-gradient(135deg,rgba(255,237,213,.55) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1; }
          .er-contact-grid { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start; }
          .er-ctitle { font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#ea580c 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .er-cdesc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px; }
          .er-cbenefits { background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px; }
          .er-cbenefit { display:flex;gap:10px;align-items:flex-start; }
          .er-cbenefit-icon { flex-shrink:0;color:#ea580c;font-weight:800;font-size:16px;margin-top:1px; }
          .er-cbenefit p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .er-form-box { background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(255,237,213,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1); }
          .er-form-box h3 { font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px; }
          .er-form { display:flex;flex-direction:column;gap:13px; }
          .er-frow { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .er-fg { display:flex;flex-direction:column;gap:5px; }
          .er-fg.full { grid-column:1/-1; }
          .er-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .er-fg input,.er-fg textarea,.er-fg select { padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s; }
          .er-fg input:focus,.er-fg textarea:focus,.er-fg select:focus { outline:none;border-color:#ea580c;box-shadow:0 0 0 3px rgba(234,88,12,.10); }
          .er-consent { display:flex;gap:8px;align-items:flex-start; }
          .er-consent input { margin-top:3px;width:15px;height:15px; }
          .er-consent label { font-size:11px;color:#4A6080;line-height:1.5; }
          .er-consent a { color:#0F3460; }
          .er-submit { width:100%;padding:14px;background:#ea580c;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(234,88,12,.28); }
          .er-submit:hover { background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28); }

          /* FAQ */
          .er-faq { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1; }
          .er-faq h2 { font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px; }
          .er-faq-sub { font-size:15px;color:#4A6080;margin:0 0 36px; }
          .er-faq-list { display:flex;flex-direction:column;gap:10px; }
          .er-fitem { background:linear-gradient(135deg,rgba(255,237,213,.40) 0%,rgba(255,255,255,.82) 55%,rgba(219,234,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s; }
          .er-fitem.open { border-color:rgba(234,88,12,.35); }
          .er-fitem.open::before { content:'';display:block;height:3px;background:linear-gradient(90deg,#ea580c,#f97316);border-radius:3px 3px 0 0; }
          .er-fq { width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .er-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s; }
          .er-fitem.open .er-fq-badge { background:#ea580c;color:#fff; }
          .er-fq span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4; }
          .er-fitem.open .er-fq span { color:#7c2d12; }
          .er-fchev { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s; }
          .er-fitem.open .er-fchev { transform:rotate(180deg);color:#ea580c; }
          .er-fanswer-wrap { overflow:hidden;transition:max-height .35s ease;max-height:0; }
          .er-fitem.open .er-fanswer-wrap { max-height:500px; }
          .er-fanswer { padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8; }

          /* Related */
          .er-related { padding:80px 40px;background:rgba(255,237,213,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60); }
          .er-related-inner { max-width:1300px;margin:0 auto;text-align:center; }
          .er-related h2 { font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px; }
          .er-related-sub { font-size:14px;color:#4A6080;margin:0 auto;max-width:560px; }
          .er-related hr { border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0; }
          .er-rtags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .er-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s; }
          .er-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09); }
          .er-rtag-blue   { background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8; }
          .er-rtag-violet { background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9; }
          .er-rtag-amber  { background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309; }
          .er-rtag-teal   { background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E; }
          .er-rtag-green  { background:rgba(16,185,129,.09);border-color:rgba(16,185,129,.26);color:#065f46; }
          .er-rtag-orange { background:rgba(234,88,12,.09);border-color:rgba(234,88,12,.28);color:#9a3412; }

          /* Responsive */
          @media(max-width:1024px){
            .er-hero h1,.er-s-title,.er-faq h2 { font-size:36px; }
            .er-svc-grid { grid-template-columns:repeat(2,1fr); }
            .er-stack-grid { grid-template-columns:repeat(2,1fr); }
            .er-eng-grid { grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto; }
            .er-eng-card.feat { transform:none; }
            .er-eng-card.feat.er-ev { transform:none; }
            .er-eng-card.feat.er-ev:hover { transform:translateY(-4px); }
            .er-why-grid { grid-template-columns:repeat(2,1fr); }
            .er-tgrid { grid-template-columns:1fr; }
            .er-contact-grid { grid-template-columns:1fr; }
          }
          @media(max-width:768px){
            .er-breadcrumb { padding:12px 20px 0; }
            .er-hero { padding:28px 20px 20px; }
            .er-hero h1 { font-size:26px;letter-spacing:-.3px; }
            .er-stats { grid-template-columns:1fr 1fr; }
            .er-stat-col:nth-child(2) { border-right:none; }
            .er-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,.10); }
            .er-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,.10);border-right:none; }
            .er-logos { padding:16px 20px 28px; }
            .er-svc-section,.er-stack-section,.er-eng-section,.er-process-section,.er-testi,.er-why-section,.er-faq,.er-related { padding:52px 20px; }
            .er-contact { padding:48px 20px; }
            .er-svc-grid,.er-stack-grid,.er-why-grid { grid-template-columns:1fr; }
            .er-frow { grid-template-columns:1fr; }
            .er-ctitle { font-size:28px; }
            .er-s-title { font-size:28px; }
          }
        `}</style>
      </Head>

      <div className="er-page">
        <div className="er-orb er-orb-1" />
        <div className="er-orb er-orb-2" />
        <div className="er-orb er-orb-3" />

        {/* ── BREADCRUMB ── */}
        <nav className="er-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">ERP Application Development Company</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <section className="er-hero">
          <span className="er-eyebrow">ERP Application Development Company</span>
          <h1>Custom ERP Development — Unified Operations, Zero Licensing Fees</h1>
          <p className="er-hero-desc">We build custom ERP systems that unify your finance, inventory, manufacturing, procurement, HR, and supply chain on a single platform — built around your business processes, not a rigid off-the-shelf template. Replace SAP, Oracle, or legacy ERP licensing with a platform you fully own.</p>
          <div className="er-trust-row">
            {['120+ ERP Projects','No Licensing Fees','SOC 2 Ready','15+ Years Experience','GAAP / IFRS Compliant'].map(b => (
              <div className="er-badge" key={b}><span className="er-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="er-ctas">
            <Link href="#contact" className="er-btn-primary">Start Your ERP Project</Link>
            <Link href="#engagement" className="er-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="er-stats" ref={statsRef}>
          {[['120+','ERP Projects'],['15+','Years Experience'],['60+','Integrations Built'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        {/* ── CLIENT LOGOS ── */}
        <div className="er-logos">
          <span className="er-logos-label">Trusted by Leading Organisations</span>
          <div className="er-logos-wrap">
            <div className="er-logos-track">
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
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="er-clogo" />
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="er-svc-section" aria-labelledby="er-svc-heading">
          <div className="er-inner">
            <div className={`er-s-reveal${visibleSections.has('svc') ? ' er-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="er-s-eyebrow">What We Build</span>
              <h2 id="er-svc-heading" className="er-s-title">ERP Development Services We Deliver</h2>
              <p className="er-s-desc" style={{ maxWidth: 720 }}>From core financial management and inventory control to manufacturing execution, supply chain planning, HR modules, and AI-powered analytics — we engineer every layer of your enterprise resource planning platform.</p>
            </div>
            <div className="er-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`er-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' er-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="er-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="er-svc-more">
                <button className="er-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section id="stack" className="er-stack-section" aria-labelledby="er-stack-heading">
          <div className="er-inner">
            <div className={`er-s-reveal${visibleSections.has('stk') ? ' er-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="er-s-eyebrow">The ERP Tech Stack We Use</span>
              <h2 id="er-stack-heading" className="er-s-title">Enterprise-Grade Technology, Built to Scale</h2>
              <p className="er-s-desc" style={{ maxWidth: 680 }}>Every technology choice is made for long-term reliability, data integrity, and integration flexibility — from a robust relational database core to real-time analytics pipelines and AI-powered operational intelligence.</p>
            </div>
            <div className="er-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`er-stack-card${visibleStackCards.includes(i) ? ' er-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="er-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="er-stack-pills">
                    {grp.items.map(item => (
                      <span key={item} className="er-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section id="engagement" className="er-eng-section" aria-labelledby="er-eng-heading">
          <div className="er-inner">
            <div className={`er-s-reveal${visibleSections.has('eng') ? ' er-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="er-s-eyebrow">How We Work With You</span>
              <h2 id="er-eng-heading" className="er-s-title">Engagement Models for ERP Development</h2>
              <p className="er-s-desc" style={{ maxWidth: 680 }}>Whether you need a dedicated ERP engineering team for a long-term product roadmap, a fixed-price core ERP build, or flexible sprint-based module development — we adapt to your project stage and timeline.</p>
            </div>
            <div className="er-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`er-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' er-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="er-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="er-eng-icon">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg>
                  </div>
                  <div className="er-eng-name">{m.name}</div>
                  <div className="er-eng-headline">{m.headline}</div>
                  <div className="er-eng-desc">{m.desc}</div>
                  <div className="er-eng-list-label">Best for</div>
                  <ul className="er-eng-list">
                    {m.bestFor.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="er-eng-process">
                    <strong>Process:</strong> {m.process}<br />
                    <span className="er-eng-timeline">{m.timeline}</span>
                  </div>
                  <Link href="#contact" className="er-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="er-process-section" aria-labelledby="er-proc-heading">
          <div className="er-inner" style={{ maxWidth: 760 }}>
            <div className={`er-s-reveal${visibleSections.has('proc') ? ' er-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="er-s-eyebrow">How We Deliver</span>
              <h2 id="er-proc-heading" className="er-s-title">Our ERP Application Development Process</h2>
              <p className="er-s-desc">A structured six-stage process designed to deliver an ERP your operations team actually adopts — from business process discovery and data modelling through modular development, integration, parallel run, and post-go-live optimisation.</p>
            </div>
            <div className="er-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`er-pstep${visibleSections.has('proc') ? ' er-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="er-pstep-l">
                    <div className="er-pstep-circle">{step.num}</div>
                    <div className="er-pstep-connector" />
                  </div>
                  <div className="er-pstep-r">
                    <div className="er-pstep-title">{step.title}</div>
                    <p className="er-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="er-testi" aria-labelledby="er-ts-heading">
          <div className="er-inner">
            <div className={`er-center-head er-s-reveal${visibleSections.has('ts') ? ' er-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="er-s-eyebrow">Client Results</span>
              <h2 id="er-ts-heading" className="er-s-title">What Our ERP Clients Say</h2>
              <p className="er-s-desc">Trusted by manufacturers, distributors, food and beverage companies, and enterprise operations teams across the US, UK, and Australia.</p>
            </div>
            <div className="er-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`er-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' er-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}
                  itemScope itemType="https://schema.org/Review">
                  <div className="er-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="er-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="er-tauthor">
                    <div className="er-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div>
                      <div className="er-tname" itemProp="author">{t.name}</div>
                      <div className="er-trole">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="er-why-section" aria-labelledby="er-wy-heading">
          <div className="er-inner">
            <div className={`er-s-reveal${visibleSections.has('wy') ? ' er-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="er-s-eyebrow">Why 1Solutions</span>
              <h2 id="er-wy-heading" className="er-s-title">Why Choose Us for ERP Application Development</h2>
              <p className="er-s-desc" style={{ maxWidth: 680 }}>15+ years building custom ERP systems across manufacturing, distribution, food and beverage, retail, and professional services — with deep integration expertise, modular delivery, and a track record of replacing SAP and Oracle at a fraction of the cost.</p>
            </div>
            <div className="er-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`er-wcard${visibleWhyCards.includes(i) ? ' er-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="er-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="er-contact" aria-labelledby="er-contact-heading">
          <div className="er-contact-grid">
            <div>
              <h2 id="er-contact-heading" className="er-ctitle">Start Your Custom ERP Project</h2>
              <p className="er-cdesc">Tell us about your operations and we will schedule a free 60-minute ERP discovery call with a senior solutions architect. We will map your business processes, identify integration requirements, and give you a realistic scope and cost estimate at no charge — including a comparison against SAP or Oracle implementation costs.</p>
              <div className="er-cbenefits">
                {[
                  ['✓', 'Free 60-minute ERP discovery and business process mapping session'],
                  ['✓', 'Preliminary module scope, data model, and integration map at no charge'],
                  ['✓', 'SAP / Oracle cost comparison and custom ERP ROI analysis included'],
                  ['✓', 'NDA available on request — your processes and data stay protected'],
                  ['✓', 'Response within 24 business hours from our ERP engineering team'],
                ].map(([icon, text]) => (
                  <div className="er-cbenefit" key={text}>
                    <span className="er-cbenefit-icon">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="er-form-box">
              <h3>Tell Us About Your ERP Requirements</h3>
              <form className="er-form" onSubmit={e => e.preventDefault()}>
                <div className="er-frow">
                  <div className="er-fg">
                    <label htmlFor="er-name">Full Name *</label>
                    <input id="er-name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="er-fg">
                    <label htmlFor="er-email">Work Email *</label>
                    <input id="er-email" type="email" placeholder="you@company.com" required />
                  </div>
                </div>
                <div className="er-frow">
                  <div className="er-fg">
                    <label htmlFor="er-company">Company</label>
                    <input id="er-company" type="text" placeholder="Company name" />
                  </div>
                  <div className="er-fg">
                    <label htmlFor="er-phone">Phone / WhatsApp</label>
                    <input id="er-phone" type="tel" placeholder="+1 555 000 0000" />
                  </div>
                </div>
                <div className="er-fg full">
                  <label htmlFor="er-type">ERP Project Type *</label>
                  <select id="er-type" required>
                    <option value="">Select project type...</option>
                    <option>Custom ERP Development (full platform)</option>
                    <option>Financial Management Module (GL, AP/AR, Invoicing)</option>
                    <option>Inventory & Warehouse Management (WMS)</option>
                    <option>Manufacturing & Production (MES / MRP)</option>
                    <option>Procurement & Supplier Management</option>
                    <option>HR, Payroll & Workforce Management</option>
                    <option>Supply Chain & Demand Planning</option>
                    <option>ERP Integration (CRM, eCommerce, EDI, 3PL)</option>
                    <option>ERP Migration (SAP, Oracle, Sage, Dynamics)</option>
                    <option>ERP Analytics & BI Dashboards</option>
                    <option>ERP Audit & Modernisation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="er-fg full">
                  <label htmlFor="er-msg">Project Brief *</label>
                  <textarea id="er-msg" rows={4} placeholder="Describe your operations — industry, number of users, current system (ERP or spreadsheets), modules needed, key integrations, and go-live timeline..." required />
                </div>
                <div className="er-consent">
                  <input id="er-consent" type="checkbox" required />
                  <label htmlFor="er-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. An NDA is available on request before we review your business processes or existing system data.</label>
                </div>
                <button type="submit" className="er-submit">Get Free ERP Discovery Call →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="er-faq" aria-labelledby="er-faq-heading">
          <div className="er-inner" style={{ maxWidth: 860 }}>
            <span className="er-s-eyebrow">FAQ</span>
            <h2 id="er-faq-heading">ERP Application Development — Frequently Asked Questions</h2>
            <p className="er-faq-sub">Everything you need to know about building a custom ERP platform with 1Solutions — from timeline and cost to data migration and compliance.</p>
            <div className="er-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`er-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="er-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="er-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="er-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="er-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="er-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="er-related">
          <div className="er-related-inner">
            <span className="er-s-eyebrow">Explore More</span>
            <h2>Related Software Development Services</h2>
            <p className="er-related-sub">We also build CRM systems, SaaS platforms, supply chain applications, and AI-powered business intelligence tools.</p>
            <hr />
            <div className="er-rtags">
              {[
                ['/crm-application-development-company/', 'CRM Application Development', 'er-rtag-teal'],
                ['/custom-software-development/', 'Custom Software Development', 'er-rtag-orange'],
                ['/saas-development-company/', 'SaaS Development Company', 'er-rtag-violet'],
                ['/ai-ml-development/', 'AI / ML Development', 'er-rtag-amber'],
                ['/mobile-app-development/', 'Mobile App Development', 'er-rtag-blue'],
                ['/fintech-software-development-company/', 'Fintech Software Development', 'er-rtag-violet'],
                ['/healthcare-software-development/', 'Healthcare Software Development', 'er-rtag-green'],
                ['/react-js-development-company/', 'React.js Development', 'er-rtag-blue'],
                ['/node-js-development-company/', 'Node.js Development', 'er-rtag-green'],
                ['/api-development-company/', 'API Development & Integration', 'er-rtag-teal'],
              ].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`er-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
