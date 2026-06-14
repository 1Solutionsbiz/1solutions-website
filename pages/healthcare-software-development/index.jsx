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
        { '@type': 'ListItem', position: 2, name: 'Healthcare Software Development', item: 'https://www.1solutions.biz/healthcare-software-development/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Healthcare Software Development',
      url: 'https://www.1solutions.biz/healthcare-software-development/',
      description: 'Custom healthcare software development — HIPAA-compliant EHR/EMR systems, telemedicine platforms, patient portals, healthcare mobile apps, medical billing software, and HL7 FHIR integrations.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '87', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Do you develop HIPAA-compliant healthcare software?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every engagement at 1Solutions follows HIPAA/HITECH compliance requirements — from encrypted data storage and transmission to role-based access control, audit logging, and Business Associate Agreement (BAA) management. We build on HIPAA-eligible cloud infrastructure (AWS GovCloud, Azure Healthcare, Google Cloud Healthcare API) and conduct security penetration testing before every launch.' } },
        { '@type': 'Question', name: 'Can you integrate with existing EHR systems like Epic, Cerner, or Athenahealth?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We have experience integrating with Epic (MyChart, FHIR APIs), Cerner (Millennium, FHIR R4), Athenahealth, AllScripts, eClinicalWorks, and many others. We use HL7 FHIR R4, HL7 v2.x, and CCD/C-CDA standards to ensure interoperability. We also build custom integration middleware for proprietary hospital systems.' } },
        { '@type': 'Question', name: 'How long does healthcare software development take?', acceptedAnswer: { '@type': 'Answer', text: 'Timelines vary by scope. A patient portal MVP typically takes 12–16 weeks. A full EHR system can take 6–18 months depending on complexity and integration requirements. Telemedicine platforms typically take 10–14 weeks for a production-ready MVP. We provide detailed timeline estimates after the discovery phase.' } },
        { '@type': 'Question', name: 'What HL7 FHIR standards do you support?', acceptedAnswer: { '@type': 'Answer', text: 'We support HL7 FHIR R4 (the current standard), HL7 FHIR STU3, HL7 v2.x message formats, CCD/C-CDA document exchange, DICOM for medical imaging, and SMART on FHIR for app authorisation. Our team has built FHIR servers, FHIR-native data stores, and custom FHIR resource mappings for multiple healthcare clients.' } },
        { '@type': 'Question', name: 'Do you offer post-launch support for healthcare applications?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We offer tiered post-launch support plans: Standard (business hours, 48hr SLA), Professional (extended hours, 24hr SLA), and Enterprise (24/7 coverage, 4hr critical SLA). All support plans include security patch management, compliance updates as regulations change, performance monitoring, and feature enhancements.' } },
        { '@type': 'Question', name: 'Which engagement model is best for a healthcare startup?', acceptedAnswer: { '@type': 'Answer', text: 'For most healthcare startups, the Dedicated Team model is the strongest choice. It gives you a full-stack team (PM, architect, frontend, backend, QA, DevOps) working exclusively on your product at a significantly lower cost than US hiring. You retain full IP and direction. As requirements evolve — which they always do in early-stage healthtech — the team adapts without the overhead of contract renegotiation.' } },
      ],
    },
  ],
};

/* ─── Page data ──────────────────────────────────────────────── */
const SERVICES = [
  { n: '01', title: 'EHR / EMR Systems', desc: 'Custom electronic health record systems with patient timeline, SOAP notes, lab integration, e-prescribing, referral management, and granular role-based access control.' },
  { n: '02', title: 'Telemedicine Platforms', desc: 'HIPAA-compliant video consultation, asynchronous messaging, remote patient monitoring, integrated scheduling, and prescription management — all on web and mobile.', feat: true },
  { n: '03', title: 'Patient Portals', desc: 'Self-service portals enabling appointment booking, secure access to medical records, prescription refills, bill payment, and direct messaging with care teams.' },
  { n: '04', title: 'Healthcare Mobile Apps', desc: 'iOS and Android health apps for chronic disease management, medication adherence, fitness tracking, wearable device integration, and remote monitoring.' },
  { n: '05', title: 'Medical Billing Software', desc: 'End-to-end revenue cycle management — eligibility verification, claims submission, denial management, ICD-10/CPT coding, EOB processing, and reporting dashboards.' },
  { n: '06', title: 'Clinical Decision Support', desc: 'AI-assisted tools that surface evidence-based recommendations, drug interaction alerts, allergy checks, and risk stratification scores at the point of care.' },
  { n: '07', title: 'Health Data Analytics', desc: 'Population health dashboards, readmission risk prediction, outcomes analytics, care gap identification, and operational efficiency reporting for health systems.' },
  { n: '08', title: 'Laboratory Information Systems', desc: 'Specimen lifecycle tracking, result reporting, instrument interfacing, quality control management, and accreditation-ready audit trails for clinical and diagnostic labs.' },
  { n: '09', title: 'Pharmacy Management Systems', desc: 'Drug dispensing workflows, inventory control, automated refill processing, drug-drug interaction checking, and POS integration for independent and chain pharmacies.' },
  { n: '10', title: 'HIPAA Compliance Solutions', desc: 'Security risk assessments, audit log frameworks, breach notification workflows, BAA management portals, and staff training platforms aligned to HIPAA/HITECH requirements.' },
];

const TECH_STACK = [
  {
    group: 'Backend Development',
    color: '#0ea5e9',
    items: ['Python / Django', 'Node.js / Express', 'Java / Spring Boot', '.NET Core', 'FastAPI', 'GraphQL'],
  },
  {
    group: 'Frontend & Web',
    color: '#8b5cf6',
    items: ['React.js', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Progressive Web Apps'],
  },
  {
    group: 'Mobile Development',
    color: '#10b981',
    items: ['React Native', 'Flutter', 'Swift (iOS)', 'Kotlin (Android)', 'HealthKit', 'Health Connect (Android)'],
  },
  {
    group: 'Cloud & DevOps',
    color: '#f59e0b',
    items: ['AWS (HIPAA-eligible)', 'Microsoft Azure', 'Google Cloud Healthcare API', 'Docker / Kubernetes', 'Terraform', 'CI/CD Pipelines'],
  },
  {
    group: 'Databases',
    color: '#ec4899',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'FHIR-native Stores'],
  },
  {
    group: 'Healthcare Standards',
    color: '#14b8a6',
    items: ['HL7 FHIR R4', 'HL7 v2.x', 'DICOM', 'ICD-10 / ICD-11', 'CPT Codes', 'SNOMED CT'],
  },
  {
    group: 'Security & Compliance',
    color: '#6366f1',
    items: ['HIPAA / HITECH', 'OAuth 2.0 / SAML 2.0', 'AES-256 Encryption', 'TLS 1.3', 'SOC 2 Type II', 'GDPR (EU clients)'],
  },
  {
    group: 'AI / ML & Analytics',
    color: '#f97316',
    items: ['TensorFlow', 'PyTorch', 'scikit-learn', 'Apache Spark', 'Power BI', 'Tableau'],
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
    bestFor: ['Patient portal MVP', 'Medical billing module build', 'Specific EHR integration', 'Feature additions to an existing system'],
    process: 'Detailed spec → Fixed quote → Milestone delivery → Sign-off',
    timeline: 'Best for projects 8–20 weeks',
  },
  {
    id: 'dedicated',
    name: 'Dedicated Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'Your offshore engineering team. Full-time. Fully yours.',
    desc: 'A dedicated squad of healthcare software specialists — PM, architect, frontend, backend, QA, and DevOps — working exclusively on your product at a fraction of US hiring cost. You retain full IP ownership and technical direction.',
    bestFor: ['Healthcare startups scaling a product', 'Long-term platform development', 'Replacing or extending an in-house team', 'Complex, evolving healthtech products'],
    process: 'Team assembly → Onboarding → Weekly sprint delivery → Continuous roadmap',
    timeline: 'Ongoing — scale up or down each quarter',
  },
  {
    id: 'tm',
    name: 'Time & Material',
    badge: 'Agile & flexible',
    badgeColor: '#10b981',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Pay for hours worked. Adapt as you go.',
    desc: 'Billed on actual time and resources used. Best for projects where the scope evolves, requirements are research-heavy, or you need to pivot quickly as clinical workflows become clearer.',
    bestFor: ['Proof-of-concept & R&D work', 'Complex third-party EHR API integrations', 'Greenfield healthtech platforms', 'Projects with frequently changing requirements'],
    process: 'Sprint planning → Biweekly delivery → Iterative refinement → Transparent timesheets',
    timeline: 'Start in 1 week — no lengthy onboarding',
  },
];

const FAQS = [
  { q: 'Do you develop HIPAA-compliant healthcare software?', a: 'Yes. Every 1Solutions healthcare engagement follows HIPAA/HITECH compliance requirements — encrypted data storage and transmission (AES-256, TLS 1.3), role-based access control, comprehensive audit logging, and Business Associate Agreement (BAA) support. We build on HIPAA-eligible cloud infrastructure (AWS GovCloud, Azure Healthcare API, Google Cloud Healthcare API) and conduct security penetration testing and HIPAA risk assessments before every product launch.' },
  { q: 'Can you integrate with Epic, Cerner, Athenahealth, and other existing EHR systems?', a: 'Yes. We have delivered integrations with Epic (MyChart, FHIR R4 APIs), Cerner Millennium, Athenahealth, AllScripts, eClinicalWorks, and several proprietary hospital systems. We use HL7 FHIR R4, HL7 v2.x message formats, CCD/C-CDA, and SMART on FHIR for authorisation. For systems without a published FHIR API, we build custom middleware and HL7 translation layers.' },
  { q: 'How long does healthcare software development take?', a: 'Timelines depend on scope and complexity. A patient portal MVP typically takes 12–16 weeks. A telemedicine platform takes 10–14 weeks for a production-ready launch. A full custom EHR can take 6–18 months. HIPAA compliance QA and security testing add 3–4 weeks to any project. We provide detailed timeline estimates — broken into milestones — after the discovery phase, which we offer as a paid fixed-price engagement.' },
  { q: 'What HL7 FHIR standards do you support?', a: 'We support HL7 FHIR R4 (current standard), FHIR STU3, HL7 v2.x message formats, CCD/C-CDA document exchange, DICOM for medical imaging, and SMART on FHIR for app authorisation. We have built FHIR servers, FHIR-native data stores, and custom resource mappings for US Certification criteria (ONC/CMS interoperability rules) compliance.' },
  { q: 'Do you offer post-launch support for healthcare applications?', a: 'Yes — all projects include a 30-day hypercare period post-launch. Ongoing support is available in three tiers: Standard (business hours, 48hr SLA), Professional (extended hours, 24hr SLA), and Enterprise (24/7, 4hr critical response SLA). All plans include security patch management, compliance updates as HIPAA rules change, performance monitoring with alerts, and quarterly feature review calls.' },
  { q: 'Which engagement model is best for a healthcare startup?', a: 'For most early-stage healthtech startups, the Dedicated Team model gives the best outcomes. You get a full-stack team (PM, architect, frontend, backend, QA, DevOps) for significantly less than equivalent US hiring. You direct the work, retain all IP, and can scale the team up or down quarterly as funding and roadmap evolve. The fixed-price model works well once specific features or an MVP scope is fully defined.' },
  { q: 'Do you work with US, UK, Australian, and Canadian healthcare providers?', a: 'Yes. The majority of our healthcare clients are in the United States (HIPAA jurisdiction), with others in Australia (Privacy Act/My Health Records Act), the UK (NHS standards, GDPR), and Canada (PIPEDA). We adapt our compliance frameworks to each jurisdiction. Our team works US and Australian-friendly hours and communicates async with UK and European clients.' },
  { q: 'Can you build AI-powered features into healthcare software?', a: 'Yes. We have built clinical NLP tools for medical record summarisation, predictive models for readmission risk and deterioration early warning, AI-assisted diagnosis support tools, and automated medical coding (ICD-10/CPT) using machine learning. We use TensorFlow, PyTorch, and scikit-learn on HIPAA-compliant cloud environments, with full model explainability documentation for regulatory review.' },
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
    <div className="hc-stat-col">
      <div className="hc-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="hc-stat-label">{label}</div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export default function HealthcareSoftwareDevelopment() {
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
      [whyGridRef, 8, setVisibleWhyCards],
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
        <title>Healthcare Software Development Company | HIPAA Compliant | 1Solutions</title>
        <meta name="description" content="Custom healthcare software development — HIPAA-compliant EHR/EMR, telemedicine, patient portals, medical billing & HL7 FHIR integrations. 15+ years | 50+ healthcare clients | Free discovery call." />
        <link rel="canonical" href="https://www.1solutions.biz/healthcare-software-development/" />
        <meta property="og:title" content="Healthcare Software Development Company | 1Solutions" />
        <meta property="og:description" content="HIPAA-compliant healthcare software development — EHR, telemedicine, patient portals, medical billing, HL7 FHIR & AI-powered clinical tools. 15+ years, 50+ healthcare clients." />
        <meta property="og:url" content="https://www.1solutions.biz/healthcare-software-development/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .hc-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; position:relative; overflow-x:hidden; }
          .hc-page *,.hc-page *::before,.hc-page *::after { box-sizing:border-box; }

          /* Orbs */
          .hc-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(20px); }
          .hc-orb-1 { width:880px;height:880px;background:radial-gradient(circle,rgba(16,185,129,.28) 0%,rgba(6,182,212,.14) 40%,transparent 70%);top:-280px;right:-260px; }
          .hc-orb-2 { width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.25) 0%,rgba(245,158,11,.12) 40%,transparent 70%);bottom:0;left:-230px; }
          .hc-orb-3 { width:550px;height:550px;background:radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%); }

          /* Breadcrumb */
          .hc-breadcrumb { position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto; }
          .hc-breadcrumb ol { display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0; }
          .hc-breadcrumb li { display:flex;align-items:center;gap:6px; }
          .hc-breadcrumb li::after { content:'/';opacity:.45; }
          .hc-breadcrumb li:last-child::after { display:none; }
          .hc-breadcrumb a { color:#0F3460;text-decoration:none; }
          .hc-breadcrumb a:hover { text-decoration:underline; }

          /* Hero */
          .hc-hero { position:relative;z-index:2;text-align:center;max-width:900px;margin:0 auto;padding:44px 40px 32px; }
          .hc-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px; }
          .hc-hero h1 { font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .hc-hero-desc { font-size:16px;color:#3A507A;line-height:1.65;max-width:680px;margin:0 auto 24px; }
          .hc-trust-row { display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px; }
          .hc-badge { display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07); }
          .hc-badge-dot { width:7px;height:7px;border-radius:50%;background:#10b981;flex-shrink:0; }
          .hc-ctas { display:flex;flex-wrap:wrap;gap:12px;justify-content:center; }
          .hc-btn-primary { display:inline-block;padding:14px 36px;background:#0F3460;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(15,52,96,.25); }
          .hc-btn-primary:hover { background:#D97706;transform:translateY(-2px); }
          .hc-btn-ghost { display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s; }
          .hc-btn-ghost:hover { background:rgba(255,255,255,.85);border-color:rgba(217,119,6,.5);transform:translateY(-2px); }

          /* Stats */
          .hc-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95); }
          .hc-stat-col { padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10); }
          .hc-stat-col:last-child { border-right:none; }
          .hc-stat-val { font-size:28px;font-weight:900;color:#D97706;letter-spacing:-.5px;line-height:1; }
          .hc-stat-label { font-size:11px;color:#4A6080;font-weight:500;margin-top:5px; }

          /* Logos */
          .hc-logos { position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px; }
          .hc-logos-label { font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0; }
          .hc-logos-wrap { width:100%;overflow:hidden; }
          .hc-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:hc-marquee 28s linear infinite; }
          .hc-logos-track:hover { animation-play-state:paused; }
          @keyframes hc-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .hc-clogo { height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s; }
          .hc-clogo:hover { opacity:.85;filter:grayscale(0%); }

          /* Shared */
          .hc-s-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block; }
          .hc-s-title { font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .hc-s-desc { font-size:15px;color:#4A6080;line-height:1.7; }
          .hc-s-reveal { opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1); }
          .hc-s-reveal.hc-revealed { opacity:1;transform:translateY(0); }
          .hc-inner { max-width:1300px;margin:0 auto; }

          /* Services section */
          .hc-svc-section { background:transparent;padding:72px 40px 60px;position:relative;z-index:1; }
          .hc-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px; }
          .hc-svc-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s; }
          .hc-svc-card.hc-cv { opacity:1;transform:translateY(0); }
          .hc-svc-card.hc-cv:hover { transform:translateY(-6px);border-color:rgba(16,185,129,.40);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .hc-svc-card.feat { background:linear-gradient(135deg,rgba(209,250,229,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(16,185,129,.22); }
          .hc-svc-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .hc-svc-card h3 { font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1; }
          .hc-svc-card p { font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1; }
          .hc-svc-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#10b981,#34d399);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1); }
          .hc-svc-card.hc-cv:hover::before { transform:scaleY(1); }
          .hc-svc-more { text-align:center;margin-top:22px; }
          .hc-btn-more { display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit; }
          .hc-btn-more:hover { background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px); }

          /* Tech Stack */
          .hc-stack-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1; }
          .hc-stack-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px; }
          .hc-stack-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .hc-stack-card.hc-sv { opacity:1;transform:translateY(0); }
          .hc-stack-card.hc-sv:hover { border-color:rgba(217,119,6,.35);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .hc-stack-group { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid; }
          .hc-stack-pills { display:flex;flex-wrap:wrap;gap:6px; }
          .hc-pill { display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid; }

          /* Engagement Models */
          .hc-eng-section { padding:80px 40px;position:relative;z-index:1; }
          .hc-eng-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
          .hc-eng-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s; }
          .hc-eng-card.hc-ev { opacity:1;transform:translateY(0); }
          .hc-eng-card.hc-ev:hover { border-color:rgba(217,119,6,.35);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .hc-eng-card.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .hc-eng-card.feat.hc-ev { transform:translateY(-8px); }
          .hc-eng-card.feat.hc-ev:hover { transform:translateY(-12px); }
          .hc-eng-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px; }
          .hc-eng-icon { width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s; }
          .hc-eng-card.hc-ev:hover .hc-eng-icon { background:rgba(217,119,6,.10); }
          .hc-eng-card.feat .hc-eng-icon { background:rgba(217,119,6,.10); }
          .hc-eng-icon svg { fill:#0F3460;transition:fill .2s; }
          .hc-eng-card.hc-ev:hover .hc-eng-icon svg { fill:#D97706; }
          .hc-eng-card.feat .hc-eng-icon svg { fill:#D97706; }
          .hc-eng-name { font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px; }
          .hc-eng-headline { font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px; }
          .hc-eng-desc { font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px; }
          .hc-eng-list-label { font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px; }
          .hc-eng-list { list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px; }
          .hc-eng-list li { display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5; }
          .hc-eng-list li::before { content:'✓';font-weight:800;color:#10b981;flex-shrink:0;margin-top:1px; }
          .hc-eng-process { font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08); }
          .hc-eng-process strong { color:#0F3460; }
          .hc-eng-timeline { display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px; }
          .hc-eng-cta { display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18); }
          .hc-eng-cta:hover { background:#0F3460;color:#fff; }
          .hc-eng-card.feat .hc-eng-cta { background:#0F3460;color:#fff; }
          .hc-eng-card.feat .hc-eng-cta:hover { background:#D97706;border-color:#D97706; }

          /* Process */
          .hc-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .hc-psteps { display:flex;flex-direction:column;margin-top:52px; }
          .hc-pstep { display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1); }
          .hc-pstep.hc-pv { opacity:1;transform:translateY(0); }
          .hc-pstep-l { display:flex;flex-direction:column;align-items:center; }
          .hc-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s; }
          .hc-pstep.hc-pv:hover .hc-pstep-circle { background:rgba(16,185,129,.15);border-color:#10b981;color:#10b981; }
          .hc-pstep-connector { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px; }
          .hc-pstep-connector::before { content:'';width:2px;flex:1;background:#0F3460;opacity:.22; }
          .hc-pstep-connector::after { content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40; }
          .hc-pstep:last-child .hc-pstep-connector { display:none; }
          .hc-pstep-r { padding:4px 0 38px; }
          .hc-pstep:last-child .hc-pstep-r { padding-bottom:0; }
          .hc-pstep-title { font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px; }
          .hc-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* Testimonials */
          .hc-testi { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .hc-center-head { text-align:center;margin-bottom:48px; }
          .hc-tgrid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px; }
          .hc-tcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s; }
          .hc-tcard.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.22); }
          .hc-tcard.hc-tv { opacity:1;transform:translateY(0); }
          .hc-tcard.hc-tv:hover { transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .hc-stars { font-size:16px;color:#D97706;letter-spacing:2px; }
          .hc-ttext { font-size:14px;line-height:1.75;color:#374151;flex:1; }
          .hc-tauthor { display:flex;align-items:center;gap:12px; }
          .hc-tavatar { width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
          .hc-tname { font-size:14px;font-weight:700;color:#0F3460; }
          .hc-trole { font-size:12px;color:#6b7280; }

          /* Why */
          .hc-why-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .hc-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px; }
          .hc-wcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .hc-wcard:hover { transform:translateY(-5px) scale(1);border-color:rgba(16,185,129,.35);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .hc-wcard.hc-wv { opacity:1;transform:translateY(0) scale(1); }
          .hc-wcard-dot { width:10px;height:10px;border-radius:50%;background:#10b981;margin-bottom:12px; }
          .hc-wcard h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .hc-wcard p { font-size:13px;color:#4A6080;line-height:1.65;margin:0; }

          /* Contact */
          .hc-contact { padding:70px 40px;background:linear-gradient(135deg,rgba(209,250,229,.60) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1; }
          .hc-contact-grid { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start; }
          .hc-ctitle { font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .hc-cdesc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px; }
          .hc-cbenefits { background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px; }
          .hc-cbenefit { display:flex;gap:10px;align-items:flex-start; }
          .hc-cbenefit-icon { flex-shrink:0;color:#10b981;font-weight:800;font-size:16px;margin-top:1px; }
          .hc-cbenefit p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .hc-form-box { background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(237,233,254,.25) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1); }
          .hc-form-box h3 { font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px; }
          .hc-form { display:flex;flex-direction:column;gap:13px; }
          .hc-frow { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .hc-fg { display:flex;flex-direction:column;gap:5px; }
          .hc-fg.full { grid-column:1/-1; }
          .hc-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .hc-fg input,.hc-fg textarea,.hc-fg select { padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s; }
          .hc-fg input:focus,.hc-fg textarea:focus,.hc-fg select:focus { outline:none;border-color:#10b981;box-shadow:0 0 0 3px rgba(16,185,129,.10); }
          .hc-consent { display:flex;gap:8px;align-items:flex-start; }
          .hc-consent input { margin-top:3px;width:15px;height:15px; }
          .hc-consent label { font-size:11px;color:#4A6080;line-height:1.5; }
          .hc-consent a { color:#0F3460; }
          .hc-submit { width:100%;padding:14px;background:#0F3460;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(15,52,96,.22); }
          .hc-submit:hover { background:#10b981;transform:translateY(-2px);box-shadow:0 10px 30px rgba(16,185,129,.30); }

          /* FAQ */
          .hc-faq { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1; }
          .hc-faq h2 { font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px; }
          .hc-faq-sub { font-size:15px;color:#4A6080;margin:0 0 36px; }
          .hc-faq-list { display:flex;flex-direction:column;gap:10px; }
          .hc-fitem { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s; }
          .hc-fitem.open { border-color:rgba(16,185,129,.35); }
          .hc-fitem.open::before { content:'';display:block;height:3px;background:linear-gradient(90deg,#10b981,#34d399);border-radius:3px 3px 0 0; }
          .hc-fq { width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .hc-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s; }
          .hc-fitem.open .hc-fq-badge { background:#10b981;color:#fff; }
          .hc-fq span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4; }
          .hc-fitem.open .hc-fq span { color:#065f46; }
          .hc-fchev { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s; }
          .hc-fitem.open .hc-fchev { transform:rotate(180deg);color:#10b981; }
          .hc-fanswer-wrap { overflow:hidden;transition:max-height .35s ease;max-height:0; }
          .hc-fitem.open .hc-fanswer-wrap { max-height:500px; }
          .hc-fanswer { padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8; }

          /* Related */
          .hc-related { padding:80px 40px;background:rgba(237,233,254,.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60); }
          .hc-related-inner { max-width:1300px;margin:0 auto;text-align:center; }
          .hc-related h2 { font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px; }
          .hc-related-sub { font-size:14px;color:#4A6080;margin:0 auto;max-width:560px; }
          .hc-related hr { border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0; }
          .hc-rtags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .hc-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s; }
          .hc-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09); }
          .hc-rtag-blue   { background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8; }
          .hc-rtag-violet { background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9; }
          .hc-rtag-amber  { background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309; }
          .hc-rtag-teal   { background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E; }
          .hc-rtag-green  { background:rgba(16,185,129,.09);border-color:rgba(16,185,129,.26);color:#065f46; }
          .hc-rtag-orange { background:rgba(249,115,22,.09);border-color:rgba(249,115,22,.28);color:#C2410C; }

          /* Responsive */
          @media(max-width:1024px){
            .hc-hero h1,.hc-s-title,.hc-faq h2 { font-size:36px; }
            .hc-svc-grid { grid-template-columns:repeat(2,1fr); }
            .hc-stack-grid { grid-template-columns:repeat(2,1fr); }
            .hc-eng-grid { grid-template-columns:1fr; max-width:480px; margin-left:auto; margin-right:auto; }
            .hc-eng-card.feat { transform:none; }
            .hc-eng-card.feat.hc-ev { transform:none; }
            .hc-eng-card.feat.hc-ev:hover { transform:translateY(-4px); }
            .hc-why-grid { grid-template-columns:repeat(2,1fr); }
            .hc-tgrid { grid-template-columns:1fr; }
            .hc-contact-grid { grid-template-columns:1fr; }
          }
          @media(max-width:768px){
            .hc-breadcrumb { padding:12px 20px 0; }
            .hc-hero { padding:28px 20px 20px; }
            .hc-hero h1 { font-size:26px;letter-spacing:-.3px; }
            .hc-stats { grid-template-columns:1fr 1fr; }
            .hc-stat-col:nth-child(2) { border-right:none; }
            .hc-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,.10); }
            .hc-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,.10);border-right:none; }
            .hc-logos { padding:16px 20px 28px; }
            .hc-svc-section,.hc-stack-section,.hc-eng-section,.hc-process-section,.hc-testi,.hc-why-section,.hc-faq,.hc-related { padding:52px 20px; }
            .hc-contact { padding:48px 20px; }
            .hc-svc-grid,.hc-stack-grid,.hc-why-grid { grid-template-columns:1fr; }
            .hc-frow { grid-template-columns:1fr; }
            .hc-ctitle { font-size:28px; }
            .hc-s-title { font-size:28px; }
          }
        `}</style>
      </Head>

      <div className="hc-page">
        <div className="hc-orb hc-orb-1" />
        <div className="hc-orb hc-orb-2" />
        <div className="hc-orb hc-orb-3" />

        {/* ── BREADCRUMB ── */}
        <nav className="hc-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Healthcare Software Development</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <section className="hc-hero">
          <span className="hc-eyebrow">Healthcare Software Development Company</span>
          <h1>Custom Healthcare Software Development — HIPAA-Compliant, HL7 FHIR-Ready</h1>
          <p className="hc-hero-desc">We design and develop EHR/EMR systems, telemedicine platforms, patient portals, medical billing software, and AI-powered clinical tools for hospitals, clinics, and healthtech startups across the US, Canada, and Australia.</p>
          <div className="hc-trust-row">
            {['HIPAA Compliant','HL7 FHIR R4','15+ Years Experience','50+ Healthcare Clients','End-to-End Development'].map(b => (
              <div className="hc-badge" key={b}><span className="hc-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="hc-ctas">
            <Link href="#contact" className="hc-btn-primary">Start Your Healthcare Project</Link>
            <Link href="#engagement" className="hc-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="hc-stats" ref={statsRef}>
          {[['50+','Healthcare Clients'],['200+','Projects Delivered'],['15+','Years Experience'],['97%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        {/* ── CLIENT LOGOS ── */}
        <div className="hc-logos">
          <span className="hc-logos-label">Trusted by Leading Organisations</span>
          <div className="hc-logos-wrap">
            <div className="hc-logos-track">
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
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="hc-clogo" />
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="hc-svc-section" aria-labelledby="svc-heading">
          <div className="hc-inner">
            <div className={`hc-s-reveal${visibleSections.has('svc') ? ' hc-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="hc-s-eyebrow">What We Build</span>
              <h2 id="svc-heading" className="hc-s-title">Healthcare Software Solutions We Deliver</h2>
              <p className="hc-s-desc" style={{ maxWidth: 720 }}>From clinical workflow automation to patient-facing apps and interoperability integrations — we cover the full spectrum of healthcare software development with deep HIPAA and HL7 FHIR expertise.</p>
            </div>
            <div className="hc-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`hc-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' hc-cv' : ''}`} style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="hc-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="hc-svc-more">
              <button className="hc-btn-more" onClick={() => setShowAllSvc(v => !v)}>
                {showAllSvc ? 'Show Less ↑' : `View All ${SERVICES.length} Healthcare Solutions ↓`}
              </button>
            </div>
          </div>
        </section>

        {/* ── HEALTHCARE TECH STACK ── */}
        <section className="hc-stack-section" aria-labelledby="stack-heading">
          <div className="hc-inner">
            <div className={`hc-s-reveal${visibleSections.has('stk') ? ' hc-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="hc-s-eyebrow">Healthcare Tech Stack</span>
              <h2 id="stack-heading" className="hc-s-title">The Healthcare Technology Stack We Use</h2>
              <p className="hc-s-desc" style={{ maxWidth: 720 }}>Our technology choices are guided by HIPAA compliance requirements, HL7 FHIR interoperability standards, scalability for health data volumes, and proven reliability in clinical production environments.</p>
            </div>
            <div className="hc-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((cat, i) => (
                <div
                  key={cat.group}
                  className={`hc-stack-card${visibleStackCards.includes(i) ? ' hc-sv' : ''}`}
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <div className="hc-stack-group" style={{ color: cat.color, borderColor: cat.color + '40' }}>
                    {cat.group}
                  </div>
                  <div className="hc-stack-pills">
                    {cat.items.map(item => (
                      <span
                        key={item}
                        className="hc-pill"
                        style={{ color: cat.color, background: cat.color + '10', borderColor: cat.color + '30' }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="hc-eng-section" id="engagement" aria-labelledby="eng-heading">
          <div className="hc-inner">
            <div className={`hc-s-reveal${visibleSections.has('eng') ? ' hc-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }} style={{ textAlign: 'center' }}>
              <span className="hc-s-eyebrow">Engagement Models</span>
              <h2 id="eng-heading" className="hc-s-title">Engagement Models for Healthcare Software Development</h2>
              <p className="hc-s-desc" style={{ maxWidth: 700, margin: '0 auto' }}>Every healthcare project is different. Choose the model that fits your stage, budget, and how well-defined your requirements are — or ask us to recommend the right fit.</p>
            </div>
            <div className="hc-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <article
                  key={m.id}
                  className={`hc-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' hc-ev' : ''}`}
                  style={{ transitionDelay: `${i * 140}ms` }}
                >
                  <span
                    className="hc-eng-badge"
                    style={{ color: m.badgeColor, background: m.badgeColor + '14', borderColor: m.badgeColor + '35' }}
                  >
                    {m.badge}
                  </span>
                  <div className="hc-eng-icon">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg>
                  </div>
                  <div className="hc-eng-name">{m.name}</div>
                  <div className="hc-eng-headline">{m.headline}</div>
                  <p className="hc-eng-desc">{m.desc}</p>
                  <div className="hc-eng-list-label">Best for</div>
                  <ul className="hc-eng-list">
                    {m.bestFor.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="hc-eng-process">
                    <strong>Process:</strong> {m.process}
                    <br />
                    <span className="hc-eng-timeline">⏱ {m.timeline}</span>
                  </div>
                  <Link href="#contact" className="hc-eng-cta">Discuss This Model →</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="hc-process-section" aria-labelledby="proc-heading">
          <div className="hc-inner">
            <div className={`hc-s-reveal${visibleSections.has('proc') ? ' hc-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="hc-s-eyebrow">How We Work</span>
              <h2 id="proc-heading" className="hc-s-title">Our Healthcare Software Development Process</h2>
              <p className="hc-s-desc" style={{ maxWidth: 680 }}>A structured six-phase process designed around the unique compliance, integration, and clinical workflow requirements of healthcare software.</p>
            </div>
            <div className="hc-psteps">
              {[
                ['1', 'Discovery & Requirements', 'Stakeholder interviews with clinicians, administrators, and IT leads. We map existing clinical workflows, identify integration points with EHR/LIS/billing systems, define compliance requirements (HIPAA, state regulations), and produce a detailed technical specification and project roadmap.'],
                ['2', 'HIPAA-Compliant Architecture', 'System architecture designed around healthcare-specific constraints — HIPAA-eligible cloud infrastructure, end-to-end encryption, audit logging at every data access point, role-based access control, and HL7 FHIR API design. Security threat modelling is completed before a single line of code is written.'],
                ['3', 'UI/UX Design for Clinical Workflows', 'Patient-centred and clinician-centred design that reduces cognitive load in high-stakes environments. We follow WCAG 2.1 accessibility standards, conduct usability testing with clinical staff, and produce validated interactive prototypes before development begins.'],
                ['4', 'Agile Development & Integrations', 'Two-week sprints with continuous delivery to a staging environment. We handle all third-party integrations — EHR APIs, lab instruments, payment gateways, identity providers, and device data streams — using HL7 FHIR R4, HL7 v2.x, and proprietary APIs where needed.'],
                ['5', 'QA, Security Testing & Compliance Audit', 'Comprehensive QA including functional testing, performance load testing, and clinical edge-case scenarios. HIPAA security risk assessment, OWASP-aligned penetration testing, WCAG 2.1 accessibility audit, and cross-browser/cross-device testing before every release.'],
                ['6', 'Launch, Training & Ongoing Support', 'Phased production rollout with a 30-day hypercare period, clinical staff training, and full technical documentation. Post-launch support tiers available from business-hours to 24/7 coverage, with proactive monitoring, security patches, and compliance updates as regulations evolve.'],
              ].map(([n, title, desc], i) => (
                <div
                  key={n}
                  className={`hc-pstep${visibleSections.has('proc') ? ' hc-pv' : ''}`}
                  style={{ transitionDelay: `${i * 110}ms` }}
                >
                  <div className="hc-pstep-l">
                    <div className="hc-pstep-circle">{n}</div>
                    <div className="hc-pstep-connector" />
                  </div>
                  <div className="hc-pstep-r">
                    <h3 className="hc-pstep-title">{title}</h3>
                    <p className="hc-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="hc-testi" aria-labelledby="testi-heading">
          <div className="hc-inner">
            <div className={`hc-center-head hc-s-reveal${visibleSections.has('ts') ? ' hc-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="hc-s-eyebrow">Client Stories</span>
              <h2 id="testi-heading" className="hc-s-title">What Our Healthcare Clients Say</h2>
            </div>
            <div className="hc-tgrid" ref={testiGridRef}>
              {[
                { init: 'DM', bg: '#0F3460', text: '"1Solutions built our telemedicine platform from scratch — HIPAA-compliant, Epic-integrated, and live in 14 weeks. Patient adoption hit 78% in the first month. The team understood clinical workflows in a way most tech agencies simply don\'t."', name: 'Dr. Daniel Morrow', role: 'CTO, CareConnect Telehealth — USA', feat: false },
                { init: 'SL', bg: '#1a4a7a', text: '"We needed a patient portal integrated with our Athenahealth EHR within a tight regulatory deadline. 1Solutions delivered on time, passed our HIPAA security audit first attempt, and the clinician feedback has been outstanding. Highly recommended."', name: 'Sarah Lim', role: 'VP Technology, PrimeCare Health Network — Australia', feat: true },
                { init: 'RT', bg: '#065f46', text: '"The medical billing module they built reduced our claims denial rate from 18% to 4% in six months. Tight HL7 integration, clean UX for our billing staff, and the post-launch support has been proactive. Real healthcare software expertise."', name: 'Robert Theron', role: 'CFO, MedBilling Solutions — Canada', feat: false },
              ].map((t, i) => (
                <article
                  key={t.name}
                  className={`hc-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' hc-tv' : ''}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                  itemScope itemType="https://schema.org/Review"
                >
                  <div className="hc-stars">★★★★★</div>
                  <p className="hc-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="hc-tauthor">
                    <div className="hc-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div>
                      <div className="hc-tname">{t.name}</div>
                      <div className="hc-trole">{t.role}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY 1SOLUTIONS ── */}
        <section className="hc-why-section" aria-labelledby="why-heading">
          <div className="hc-inner">
            <div className={`hc-s-reveal${visibleSections.has('wy') ? ' hc-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }} style={{ textAlign: 'center' }}>
              <span className="hc-s-eyebrow">Why 1Solutions</span>
              <h2 id="why-heading" className="hc-s-title">Why Healthcare Organisations Choose 1Solutions</h2>
              <p className="hc-s-desc" style={{ maxWidth: 660, margin: '0 auto' }}>What separates healthcare software specialists from generic development agencies — and why it matters for your patients, your staff, and your compliance obligations.</p>
            </div>
            <div className="hc-why-grid" ref={whyGridRef}>
              {[
                ['HIPAA/HITECH Native', 'We don\'t bolt compliance on at the end. Our architecture patterns, development standards, and QA processes are built around HIPAA requirements from day one — audit logging, encryption, access controls, and risk assessment are standard deliverables, not extras.'],
                ['HL7 FHIR & Interoperability Experts', 'Deep hands-on experience with HL7 FHIR R4, HL7 v2.x, DICOM, CCD/C-CDA, and SMART on FHIR. We have built successful integrations with Epic, Cerner, Athenahealth, AllScripts, and proprietary hospital systems.'],
                ['15+ Years in Healthcare IT', 'We have been building healthcare software since 2008 — through ICD-10 transitions, Meaningful Use requirements, ACA changes, and ONC/CMS interoperability mandates. We know what changes and what stays the same.'],
                ['Clinical Workflow Understanding', 'Our team includes developers with prior healthcare IT experience. We conduct structured workflow discovery with clinicians before writing code — because the right feature built on the wrong workflow creates risk, not value.'],
                ['Zero Compromise on Security', 'HIPAA penetration testing, OWASP security review, encrypted data at rest and in transit, and detailed audit trails for every data access are standard deliverables on every engagement. We have never had a client experience a PHI breach.'],
                ['Full-Stack, End-to-End Delivery', 'Discovery, architecture, design, frontend, backend, mobile, QA, DevOps, and post-launch support — all under one roof with a single accountability point. No vendor coordination overhead.'],
                ['US, Australian & Canadian Market Expertise', 'Deep familiarity with HIPAA (US), My Health Records Act (Australia), PIPEDA (Canada), NHS Digital Standards (UK). Our team works US-friendly hours and adapts compliance frameworks to each jurisdiction.'],
                ['Transparent Delivery Process', 'Weekly sprint demos, live staging environments, Jira tracking, and direct Slack/Teams access to your developers. You always know what\'s been built, what\'s in progress, and what\'s next — no black-box delivery.'],
              ].map(([title, desc], i) => (
                <div
                  key={title}
                  className={`hc-wcard${visibleWhyCards.includes(i) ? ' hc-wv' : ''}`}
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <div className="hc-wcard-dot" />
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="hc-contact" id="contact" aria-labelledby="contact-heading">
          <div className="hc-contact-grid">
            <div>
              <h2 className="hc-ctitle" id="contact-heading">Start Your Healthcare Software Project</h2>
              <p className="hc-cdesc">Tell us what you are building. We will respond within 24 hours with a free consultation, a compliance framework recommendation, and an honest assessment of scope and timeline.</p>
              <div className="hc-cbenefits">
                {[
                  ['✓', 'Free 60-minute discovery call with a healthcare software architect.'],
                  ['✓', 'HIPAA compliance framework recommendation for your specific use case.'],
                  ['✓', 'Honest scope, timeline, and budget estimate — no inflated quotes.'],
                  ['✓', 'NDAs signed before any discussion of proprietary clinical workflows.'],
                  ['✓', 'All three engagement models available — Fixed Price, Dedicated Team, T&M.'],
                ].map(([icon, text]) => (
                  <div className="hc-cbenefit" key={text}>
                    <span className="hc-cbenefit-icon">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hc-form-box">
              <h3>Book a Free Discovery Call</h3>
              <form className="hc-form" onSubmit={e => e.preventDefault()}>
                <div className="hc-frow">
                  <div className="hc-fg"><label>Your Name *</label><input type="text" placeholder="Dr. Jane Smith" required /></div>
                  <div className="hc-fg"><label>Work Email *</label><input type="email" placeholder="jane@clinic.com" required /></div>
                </div>
                <div className="hc-frow">
                  <div className="hc-fg"><label>Organisation</label><input type="text" placeholder="Hospital / Clinic / Startup" /></div>
                  <div className="hc-fg"><label>Phone</label><input type="tel" placeholder="+1 (555) 000-0000" /></div>
                </div>
                <div className="hc-fg full">
                  <label>What are you building?</label>
                  <select>
                    <option value="">Select a solution type…</option>
                    <option>EHR / EMR System</option>
                    <option>Telemedicine Platform</option>
                    <option>Patient Portal</option>
                    <option>Healthcare Mobile App</option>
                    <option>Medical Billing Software</option>
                    <option>Clinical Decision Support Tool</option>
                    <option>Health Analytics Platform</option>
                    <option>EHR / System Integration</option>
                    <option>Other Healthcare Software</option>
                  </select>
                </div>
                <div className="hc-fg full">
                  <label>Describe your project and key requirements</label>
                  <textarea rows="3" placeholder="e.g. We need a HIPAA-compliant telemedicine platform integrated with our Epic EHR, targeting 500 providers across 3 states…" />
                </div>
                <div className="hc-consent">
                  <input type="checkbox" id="hc-con" required />
                  <label htmlFor="hc-con">I agree to the <Link href="/privacy-policy/">Privacy Policy</Link>. I understand 1Solutions will sign an NDA before discussing proprietary project details.</label>
                </div>
                <button type="submit" className="hc-submit">Book My Free Discovery Call →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="hc-faq" aria-labelledby="faq-heading">
          <div className="hc-inner">
            <h2 id="faq-heading">Frequently Asked Questions</h2>
            <p className="hc-faq-sub">Common questions about our healthcare software development services, compliance approach, and engagement models.</p>
            <div className="hc-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`hc-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="hc-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <span className="hc-fq-badge">{String(i + 1).padStart(2, '0')}</span>
                    <span itemProp="name">{f.q}</span>
                    <svg className="hc-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                  <div className="hc-fanswer-wrap" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <div className="hc-fanswer" itemProp="text">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="hc-related" aria-labelledby="related-heading">
          <div className="hc-related-inner">
            <span className="hc-s-eyebrow">Explore More</span>
            <h2 id="related-heading">Related Services & Solutions</h2>
            <p className="hc-related-sub">Healthcare software works best alongside strong web, mobile, and eCommerce foundations. Explore our full range of development services.</p>
            <hr />
            <div className="hc-rtags">
              {[
                ['/python-development-services/', 'Python Development', 'hc-rtag-blue'],
                ['/laravel-development-company/', 'Laravel Development', 'hc-rtag-teal'],
                ['/drupal-development-company/', 'Drupal Development', 'hc-rtag-violet'],
                ['/ecommerce-website-development/', 'eCommerce Development', 'hc-rtag-amber'],
                ['/affordable-seo-packages/', 'Healthcare SEO Packages', 'hc-rtag-green'],
                ['/magento-development-company/', 'Magento Development', 'hc-rtag-orange'],
                ['/woocommerce-development-company/', 'WooCommerce Development', 'hc-rtag-violet'],
                ['/codeigniter-development-company/', 'CodeIgniter Development', 'hc-rtag-blue'],
                ['/portfolio/', 'View Our Portfolio', 'hc-rtag-amber'],
                ['/contact/', 'Contact 1Solutions', 'hc-rtag-teal'],
              ].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`hc-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
