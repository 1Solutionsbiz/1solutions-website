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
        { '@type': 'ListItem', position: 2, name: 'Automotive Software Solutions', item: 'https://www.1solutions.biz/automotive-software-solutions/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Automotive Software Development',
      url: 'https://www.1solutions.biz/automotive-software-solutions/',
      description: 'Custom automotive software development — connected vehicle platforms, ADAS, fleet management, EV software, in-vehicle infotainment, dealership management systems, and V2X communication solutions.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'DE'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '94', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Do you develop ISO 26262 functional safety-compliant automotive software?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We develop automotive software following ISO 26262 functional safety standards and ASPICE process frameworks. Our engineers are experienced in AUTOSAR-compliant ECU software, MISRA C/C++ coding guidelines, hardware-in-the-loop (HIL) testing, and systematic hazard analysis and risk assessment (HARA). We also support ISO/SAE 21434 automotive cybersecurity requirements for connected vehicle components.' } },
        { '@type': 'Question', name: 'Can you build connected vehicle and telematics platforms?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We have delivered connected vehicle platforms integrating OBD-II/CAN bus data, GPS tracking, real-time telemetry streaming via MQTT and Kafka, cloud ingestion on AWS IoT and Azure IoT Hub, and driver behaviour analytics dashboards. We handle the full stack from embedded firmware to cloud backend to mobile and web dashboards.' } },
        { '@type': 'Question', name: 'How long does automotive software development take?', acceptedAnswer: { '@type': 'Answer', text: 'Timelines depend on complexity. A fleet management platform MVP typically takes 12–18 weeks. A dealership management system takes 16–24 weeks. ADAS feature development depends on the sensor suite and safety certification requirements and typically ranges from 6–18 months. We provide milestone-based estimates after a technical discovery phase.' } },
        { '@type': 'Question', name: 'Do you develop software for electric vehicles (EVs)?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We develop EV-specific software including battery management system (BMS) interfaces, charging station management systems (CSMS/OCPP), range prediction algorithms, energy consumption analytics, OTA firmware update platforms, and EV fleet management dashboards. We have experience with both BEV and PHEV architectures.' } },
        { '@type': 'Question', name: 'Which engagement model is best for an automotive software project?', acceptedAnswer: { '@type': 'Answer', text: 'For long-term automotive product development — connected vehicle platforms, fleet software, or ADAS features — the Dedicated Team model works best. You get a full-stack team with embedded, cloud, and mobile expertise working exclusively on your product. For well-defined modules like a DMS or a specific API integration, Fixed Price gives you cost certainty. Time & Material suits R&D and sensor integration work where requirements evolve with testing results.' } },
        { '@type': 'Question', name: 'Do you offer post-launch support and OTA update management?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We provide post-launch support including OTA firmware and software update management, real-time monitoring and alerting, security patch management, compliance updates as automotive cybersecurity standards evolve, and tiered SLA-backed engineering support. Our Enterprise plan offers 24/7 coverage with a 4-hour critical response SLA.' } },
      ],
    },
  ],
};

/* ─── Page data ──────────────────────────────────────────────── */
const SERVICES = [
  { n: '01', title: 'Connected Vehicle Platforms', desc: 'End-to-end telematics platforms integrating OBD-II/CAN bus, GPS, real-time data streaming, cloud ingestion, driver behaviour analytics, and remote vehicle diagnostics dashboards.' },
  { n: '02', title: 'ADAS & Autonomous Driving Software', desc: 'Advanced driver assistance system software — lane departure warning, collision avoidance, adaptive cruise control, sensor fusion (camera, LiDAR, radar), and computer vision pipelines.', feat: true },
  { n: '03', title: 'Fleet Management Systems', desc: 'Comprehensive fleet platforms with real-time vehicle tracking, route optimisation, fuel monitoring, driver scoring, maintenance scheduling, and compliance reporting for commercial fleets.' },
  { n: '04', title: 'Electric Vehicle (EV) Software', desc: 'BMS interfaces, OCPP-compliant charging station management, range prediction, energy analytics, OTA firmware update platforms, and EV fleet dashboards for BEV and PHEV architectures.' },
  { n: '05', title: 'In-Vehicle Infotainment (IVI) Systems', desc: 'Android Automotive OS and QNX-based IVI development — navigation, media streaming, voice control, smartphone mirroring (CarPlay/Android Auto), and over-the-air content updates.' },
  { n: '06', title: 'Dealership Management Systems (DMS)', desc: 'Custom DMS platforms covering inventory management, sales pipeline, F&I workflows, service scheduling, parts management, CRM integration, and multi-location reporting dashboards.' },
  { n: '07', title: 'Vehicle Diagnostics & OBD Software', desc: 'OBD-II diagnostic tools, DTC reading and interpretation, real-time parameter monitoring, remote diagnostics portals, and predictive maintenance alert engines for passenger and commercial vehicles.' },
  { n: '08', title: 'Automotive Supply Chain Software', desc: 'Supply chain visibility platforms with supplier portals, parts traceability, demand forecasting, JIT inventory management, and EDI integration for OEMs and Tier 1/2 suppliers.' },
  { n: '09', title: 'V2X Communication Platforms', desc: 'Vehicle-to-everything communication software — V2I, V2V, V2P, and V2N protocols (DSRC/C-V2X), roadside unit integration, and smart traffic management system backends.' },
  { n: '10', title: 'Automotive Cybersecurity Solutions', desc: 'ISO/SAE 21434-aligned cybersecurity engineering — threat analysis and risk assessment (TARA), intrusion detection systems (IDS), secure OTA pipelines, PKI, and HSM integration for connected vehicles.' },
];

const TECH_STACK = [
  {
    group: 'Embedded & Systems',
    color: '#dc2626',
    items: ['C / C++', 'Rust', 'Python', 'AUTOSAR Classic/Adaptive', 'FreeRTOS / QNX', 'MISRA C/C++'],
  },
  {
    group: 'Automotive Standards',
    color: '#b91c1c',
    items: ['ISO 26262 (FuSa)', 'ISO/SAE 21434 (CySec)', 'AUTOSAR', 'ASPICE', 'OBD-II / CAN Bus', 'SOME/IP'],
  },
  {
    group: 'Cloud & IoT',
    color: '#f59e0b',
    items: ['AWS IoT Core', 'Azure IoT Hub', 'Google Cloud IoT', 'MQTT / AMQP', 'Apache Kafka', 'Apache Spark'],
  },
  {
    group: 'Backend Development',
    color: '#0ea5e9',
    items: ['Node.js / Express', 'Python / Django', 'Java / Spring Boot', 'Go (Golang)', 'GraphQL', 'gRPC'],
  },
  {
    group: 'Frontend & Mobile',
    color: '#8b5cf6',
    items: ['React.js', 'Next.js', 'Flutter', 'React Native', 'Android Automotive OS', 'TypeScript'],
  },
  {
    group: 'AI / ML & Vision',
    color: '#f97316',
    items: ['Computer Vision (OpenCV)', 'TensorFlow / PyTorch', 'YOLO Object Detection', 'LiDAR Processing', 'Sensor Fusion', 'Predictive Maintenance ML'],
  },
  {
    group: 'Databases',
    color: '#14b8a6',
    items: ['PostgreSQL', 'MongoDB', 'TimescaleDB', 'InfluxDB', 'Redis', 'Apache Cassandra'],
  },
  {
    group: 'Security & Compliance',
    color: '#6366f1',
    items: ['ISO/SAE 21434', 'Secure Boot / HSM', 'PKI / Certificate Mgmt', 'OTA Security (TUF)', 'TLS 1.3', 'Intrusion Detection (IDS)'],
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
    desc: 'Ideal for well-scoped modules — a dealership management system, a fleet tracking MVP, or a specific OBD diagnostic tool. We agree on deliverables, price, and timeline upfront with milestone-based delivery.',
    bestFor: ['Fleet management MVP', 'Dealership management system', 'OBD diagnostic application', 'Specific API or telematics integration'],
    process: 'Detailed spec → Fixed quote → Milestone delivery → Sign-off',
    timeline: 'Best for projects 8–24 weeks',
  },
  {
    id: 'dedicated',
    name: 'Dedicated Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'Your offshore automotive engineering team. Full-time. Fully yours.',
    desc: 'A dedicated squad of automotive software specialists — embedded engineer, cloud architect, frontend, mobile, QA, and DevOps — working exclusively on your product at a fraction of US/EU hiring cost. Full IP ownership retained by you.',
    bestFor: ['Connected vehicle platform development', 'Long-term ADAS feature delivery', 'EV software product teams', 'Replacing or extending an in-house automotive team'],
    process: 'Team assembly → Onboarding → Weekly sprint delivery → Continuous roadmap',
    timeline: 'Ongoing — scale up or down each quarter',
  },
  {
    id: 'tm',
    name: 'Time & Material',
    badge: 'Agile & flexible',
    badgeColor: '#dc2626',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Pay for hours worked. Adapt as you go.',
    desc: 'Billed on actual time and resources used. Best for R&D projects, sensor integration work, or ADAS features where requirements evolve rapidly with hardware testing results and regulatory feedback.',
    bestFor: ['ADAS proof-of-concept & R&D', 'Sensor fusion algorithm development', 'V2X communication prototyping', 'Projects where hardware testing drives scope'],
    process: 'Sprint planning → Biweekly delivery → Iterative refinement → Transparent timesheets',
    timeline: 'Start in 1 week — no lengthy onboarding',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Technical Discovery & Requirements Scoping', desc: 'We analyse your vehicle architecture, target ECUs, connectivity requirements, safety integrity levels (ASIL), and applicable standards — ISO 26262, ISO/SAE 21434, AUTOSAR — before a line of code is written.' },
  { num: '02', title: 'System Architecture & Safety Design', desc: 'Our architects define the software architecture, AUTOSAR stack configuration, hardware abstraction layers, communication interfaces (CAN, Ethernet, LIN), and cybersecurity architecture aligned to TARA outcomes.' },
  { num: '03', title: 'Embedded & Cloud Software Development', desc: 'Parallel development streams — embedded firmware in C/C++ or Rust, cloud backend microservices, real-time data pipelines, and mobile/web dashboards — with strict MISRA compliance and code review gates.' },
  { num: '04', title: 'Hardware-in-the-Loop (HIL/SIL) Testing', desc: 'Systematic testing against requirements using software-in-the-loop (SIL), model-in-the-loop (MIL), and hardware-in-the-loop (HIL) environments. Includes regression testing, fault injection, and boundary condition analysis.' },
  { num: '05', title: 'Safety, Cybersecurity & Compliance Audit', desc: 'Independent safety audit against ISO 26262 ASIL targets, automotive cybersecurity review per ISO/SAE 21434, penetration testing of connected components, and ASPICE process assessment documentation.' },
  { num: '06', title: 'Production Release, OTA & Ongoing Support', desc: 'Zero-regression production deployment with secure OTA update infrastructure (TUF/Uptane), real-time fleet monitoring, intrusion detection alerting, and tiered SLA-backed post-launch engineering support.' },
];

const TESTIMONIALS = [
  {
    text: "1Solutions built our connected vehicle telematics platform from the ground up — CAN bus integration, cloud ingestion, real-time dashboards, and driver scoring. They delivered on schedule and their embedded engineers genuinely understood automotive protocols, not just generic IoT.",
    name: 'Michael R.', role: 'CTO, Commercial Fleet Technology Company (US)', init: 'MR', bg: '#0F3460',
  },
  {
    text: "We needed a custom dealership management system to replace a legacy platform across 18 locations. 1Solutions delivered a scalable, multi-tenant DMS with inventory, F&I, service, and CRM modules. The transition was seamless and the platform has reduced our operational overhead by 30%.",
    name: 'James L.', role: 'COO, Automotive Dealer Group (AU)', init: 'JL', bg: '#7f1d1d', feat: true,
  },
  {
    text: "Our EV charging network needed an OCPP-compliant CSMS with real-time monitoring, dynamic load balancing, and OTA firmware update capability. 1Solutions delivered a production-ready platform in 20 weeks. Their cloud architecture handles our 2,000+ charger network without issues.",
    name: 'Priya S.', role: 'VP Engineering, EV Charging Network (UK)', init: 'PS', bg: '#1a4a7a',
  },
];

const WHY_CARDS = [
  { title: 'Deep Automotive Domain Expertise', desc: 'Our engineers understand CAN bus, LIN, AUTOSAR, OBD-II, SOME/IP, and automotive Ethernet — not just generic software. We speak the language of automotive engineering.' },
  { title: 'ISO 26262 & ASPICE Experience', desc: 'Functional safety and process maturity are built into our delivery approach, not added after the fact. We document to ASPICE Level 2/3 and conduct systematic HARA for safety-critical modules.' },
  { title: '15+ Years of Proven Delivery', desc: 'We have been building automotive and embedded software since 2008 — across OEMs, Tier 1 suppliers, fleet operators, EV startups, and dealership groups.' },
  { title: 'Full-Stack Automotive Team', desc: 'Embedded firmware, cloud backend, real-time data pipelines, mobile apps, and web dashboards — your entire automotive software product delivered by a single accountable team.' },
  { title: 'Secure OTA & Connected Vehicle', desc: 'We design OTA update infrastructure following TUF/Uptane standards with cryptographic signing, rollback protection, and delta update support for bandwidth-constrained vehicle environments.' },
  { title: 'EV & ADAS-Ready Engineering', desc: 'From BMS integration and OCPP charging to computer vision pipelines and sensor fusion — our team has hands-on experience with the technology defining the next generation of vehicles.' },
  { title: 'US / UK / AU / EU Expertise', desc: 'We serve OEMs, Tier 1 suppliers, fleet operators, and automotive startups across North America, Europe, and Australia, adapting to FMVSS, UN R155/R156, and regional homologation requirements.' },
  { title: 'Transparent, Milestone-Based Delivery', desc: 'Fortnightly demos, weekly status reports, and full source code access from day one. No black boxes. No surprises at invoice time. Full IP ownership retained by the client.' },
];

const FAQS = [
  { q: 'Do you develop ISO 26262 functional safety-compliant automotive software?', a: 'Yes. We develop automotive software following ISO 26262 functional safety standards and ASPICE process frameworks. Our engineers are experienced in AUTOSAR-compliant ECU software, MISRA C/C++ coding guidelines, hardware-in-the-loop (HIL) testing, and systematic hazard analysis and risk assessment (HARA). We also support ISO/SAE 21434 automotive cybersecurity requirements for connected vehicle components.' },
  { q: 'Can you build connected vehicle and telematics platforms integrating CAN bus and OBD-II?', a: 'Yes. We have delivered connected vehicle platforms integrating OBD-II/CAN bus, GPS, real-time telemetry streaming via MQTT and Kafka, cloud ingestion on AWS IoT and Azure IoT Hub, and driver behaviour analytics dashboards. We handle the full stack — from embedded firmware and protocol parsing to cloud backend, real-time pipelines, and mobile/web dashboards.' },
  { q: 'How long does automotive software development take?', a: 'Timelines depend on complexity. A fleet management MVP typically takes 12–18 weeks. A dealership management system takes 16–24 weeks. An EV CSMS with OCPP compliance takes 16–20 weeks. ADAS feature development varies significantly based on sensor suite and safety certification requirements — typically 6–18 months. We provide milestone-based estimates after a technical discovery phase.' },
  { q: 'Do you develop software for electric vehicles (EVs) and charging infrastructure?', a: 'Yes. We develop EV-specific software including BMS telemetry interfaces, OCPP 1.6/2.0.1-compliant charging station management systems (CSMS), dynamic load balancing, range prediction algorithms, energy consumption analytics, OTA firmware update platforms, and EV fleet dashboards. We have delivered solutions for both BEV and PHEV architectures across charging network operators and automotive OEMs.' },
  { q: 'Which engagement model is best for an automotive software project?', a: 'For long-term automotive product development — connected vehicle platforms, fleet software, or ADAS features — the Dedicated Team model works best. You get a full-stack team with embedded, cloud, and mobile expertise. For well-defined modules like a DMS or a specific API integration, Fixed Price gives cost certainty. Time & Material suits R&D and sensor integration work where requirements evolve with hardware testing results.' },
  { q: 'Do you support AUTOSAR Classic and Adaptive platform development?', a: 'Yes. We have experience with AUTOSAR Classic for body electronics, powertrain, and chassis ECU development, and AUTOSAR Adaptive for high-performance compute platforms running ADAS and connected services. We configure BSW stacks, develop SWCs compliant with AUTOSAR methodology, and integrate with toolchains including Vector CANoe, ETAS, and dSPACE.' },
  { q: 'Can you build V2X communication and smart mobility software?', a: 'Yes. We develop V2X communication software covering V2I (vehicle-to-infrastructure), V2V (vehicle-to-vehicle), V2P (vehicle-to-pedestrian), and V2N (vehicle-to-network) protocols using both DSRC (IEEE 802.11p) and C-V2X (LTE-V/5G-V2X) standards. We also develop roadside unit (RSU) backends and smart traffic management integrations.' },
  { q: 'Do you offer post-launch support and OTA update management for automotive software?', a: 'Yes — all projects include a 30-day hypercare period post-launch. We provide OTA firmware and software update management following TUF/Uptane standards, real-time fleet monitoring and alerting, intrusion detection system management, security patch delivery, and tiered SLA-backed engineering support. Our Enterprise plan offers 24/7 coverage with a 4-hour critical response SLA.' },
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
    <div className="av-stat-col">
      <div className="av-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="av-stat-label">{label}</div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */
export default function AutomotiveSoftwareSolutions() {
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
        <title>Automotive Software Development Company | Connected Vehicle & ADAS | 1Solutions</title>
        <meta name="description" content="Custom automotive software development — connected vehicle platforms, ADAS, fleet management, EV software, IVI systems & dealership management. 15+ years | ISO 26262 | Free discovery call." />
        <link rel="canonical" href="https://www.1solutions.biz/automotive-software-solutions/" />
        <meta property="og:title" content="Automotive Software Development Company | 1Solutions" />
        <meta property="og:description" content="Custom automotive software — connected vehicles, ADAS, fleet management, EV software, telematics & dealership management systems. ISO 26262 | 15+ years | 60+ automotive clients." />
        <meta property="og:url" content="https://www.1solutions.biz/automotive-software-solutions/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .av-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; position:relative; overflow-x:hidden; }
          .av-page *,.av-page *::before,.av-page *::after { box-sizing:border-box; }

          /* Orbs */
          .av-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(20px); }
          .av-orb-1 { width:880px;height:880px;background:radial-gradient(circle,rgba(220,38,38,.22) 0%,rgba(239,68,68,.10) 40%,transparent 70%);top:-280px;right:-260px; }
          .av-orb-2 { width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px; }
          .av-orb-3 { width:550px;height:550px;background:radial-gradient(circle,rgba(14,165,233,.16) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%); }

          /* Breadcrumb */
          .av-breadcrumb { position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto; }
          .av-breadcrumb ol { display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0; }
          .av-breadcrumb li { display:flex;align-items:center;gap:6px; }
          .av-breadcrumb li::after { content:'/';opacity:.45; }
          .av-breadcrumb li:last-child::after { display:none; }
          .av-breadcrumb a { color:#0F3460;text-decoration:none; }
          .av-breadcrumb a:hover { text-decoration:underline; }

          /* Hero */
          .av-hero { position:relative;z-index:2;text-align:center;max-width:920px;margin:0 auto;padding:44px 40px 32px; }
          .av-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px; }
          .av-hero h1 { font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#dc2626 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .av-hero-desc { font-size:16px;color:#3A507A;line-height:1.65;max-width:700px;margin:0 auto 24px; }
          .av-trust-row { display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px; }
          .av-badge { display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07); }
          .av-badge-dot { width:7px;height:7px;border-radius:50%;background:#dc2626;flex-shrink:0; }
          .av-ctas { display:flex;flex-wrap:wrap;gap:12px;justify-content:center; }
          .av-btn-primary { display:inline-block;padding:14px 36px;background:#0F3460;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(15,52,96,.25); }
          .av-btn-primary:hover { background:#dc2626;transform:translateY(-2px); }
          .av-btn-ghost { display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s; }
          .av-btn-ghost:hover { background:rgba(255,255,255,.85);border-color:rgba(220,38,38,.5);transform:translateY(-2px); }

          /* Stats */
          .av-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95); }
          .av-stat-col { padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10); }
          .av-stat-col:last-child { border-right:none; }
          .av-stat-val { font-size:28px;font-weight:900;color:#dc2626;letter-spacing:-.5px;line-height:1; }
          .av-stat-label { font-size:11px;color:#4A6080;font-weight:500;margin-top:5px; }

          /* Logos */
          .av-logos { position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px; }
          .av-logos-label { font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0; }
          .av-logos-wrap { width:100%;overflow:hidden; }
          .av-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:av-marquee 28s linear infinite; }
          .av-logos-track:hover { animation-play-state:paused; }
          @keyframes av-marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
          .av-clogo { height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s; }
          .av-clogo:hover { opacity:.85;filter:grayscale(0%); }

          /* Shared */
          .av-s-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block; }
          .av-s-title { font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .av-s-desc { font-size:15px;color:#4A6080;line-height:1.7; }
          .av-s-reveal { opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1); }
          .av-s-reveal.av-revealed { opacity:1;transform:translateY(0); }
          .av-inner { max-width:1300px;margin:0 auto; }

          /* Services */
          .av-svc-section { background:transparent;padding:72px 40px 60px;position:relative;z-index:1; }
          .av-svc-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px; }
          .av-svc-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s; }
          .av-svc-card.av-cv { opacity:1;transform:translateY(0); }
          .av-svc-card.av-cv:hover { transform:translateY(-6px);border-color:rgba(220,38,38,.35);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .av-svc-card.feat { background:linear-gradient(135deg,rgba(254,226,226,.45) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(220,38,38,.20); }
          .av-svc-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .av-svc-card h3 { font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1; }
          .av-svc-card p { font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1; }
          .av-svc-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#dc2626,#ef4444);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1); }
          .av-svc-card.av-cv:hover::before { transform:scaleY(1); }
          .av-svc-more { text-align:center;margin-top:22px; }
          .av-btn-more { display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit; }
          .av-btn-more:hover { background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px); }

          /* Tech Stack */
          .av-stack-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1; }
          .av-stack-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px; }
          .av-stack-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .av-stack-card.av-sv { opacity:1;transform:translateY(0); }
          .av-stack-card.av-sv:hover { border-color:rgba(220,38,38,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .av-stack-group { font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid; }
          .av-stack-pills { display:flex;flex-wrap:wrap;gap:6px; }
          .av-pill { display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid; }

          /* Engagement Models */
          .av-eng-section { padding:80px 40px;position:relative;z-index:1; }
          .av-eng-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
          .av-eng-card { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s; }
          .av-eng-card.av-ev { opacity:1;transform:translateY(0); }
          .av-eng-card.av-ev:hover { border-color:rgba(220,38,38,.30);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .av-eng-card.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px); }
          .av-eng-card.feat.av-ev { transform:translateY(-8px); }
          .av-eng-card.feat.av-ev:hover { transform:translateY(-12px); }
          .av-eng-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px; }
          .av-eng-icon { width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s; }
          .av-eng-card.av-ev:hover .av-eng-icon { background:rgba(220,38,38,.10); }
          .av-eng-card.feat .av-eng-icon { background:rgba(217,119,6,.10); }
          .av-eng-icon svg { fill:#0F3460;transition:fill .2s; }
          .av-eng-card.av-ev:hover .av-eng-icon svg { fill:#dc2626; }
          .av-eng-card.feat .av-eng-icon svg { fill:#D97706; }
          .av-eng-name { font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px; }
          .av-eng-headline { font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px; }
          .av-eng-desc { font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px; }
          .av-eng-list-label { font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px; }
          .av-eng-list { list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px; }
          .av-eng-list li { display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5; }
          .av-eng-list li::before { content:'✓';font-weight:800;color:#dc2626;flex-shrink:0;margin-top:1px; }
          .av-eng-process { font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08); }
          .av-eng-process strong { color:#0F3460; }
          .av-eng-timeline { display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px; }
          .av-eng-cta { display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18); }
          .av-eng-cta:hover { background:#0F3460;color:#fff; }
          .av-eng-card.feat .av-eng-cta { background:#0F3460;color:#fff; }
          .av-eng-card.feat .av-eng-cta:hover { background:#dc2626;border-color:#dc2626; }

          /* Process */
          .av-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .av-psteps { display:flex;flex-direction:column;margin-top:52px; }
          .av-pstep { display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1); }
          .av-pstep.av-pv { opacity:1;transform:translateY(0); }
          .av-pstep-l { display:flex;flex-direction:column;align-items:center; }
          .av-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s; }
          .av-pstep.av-pv:hover .av-pstep-circle { background:rgba(220,38,38,.12);border-color:#dc2626;color:#dc2626; }
          .av-pstep-connector { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px; }
          .av-pstep-connector::before { content:'';width:2px;flex:1;background:#0F3460;opacity:.22; }
          .av-pstep-connector::after { content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40; }
          .av-pstep:last-child .av-pstep-connector { display:none; }
          .av-pstep-r { padding:4px 0 38px; }
          .av-pstep:last-child .av-pstep-r { padding-bottom:0; }
          .av-pstep-title { font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px; }
          .av-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }

          /* Testimonials */
          .av-testi { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .av-center-head { text-align:center;margin-bottom:48px; }
          .av-tgrid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px; }
          .av-tcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s; }
          .av-tcard.feat { background:linear-gradient(135deg,rgba(254,243,199,.50) 0%,rgba(255,255,255,.85) 55%,rgba(219,234,254,.45) 100%);border-color:rgba(217,119,6,.22); }
          .av-tcard.av-tv { opacity:1;transform:translateY(0); }
          .av-tcard.av-tv:hover { transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14); }
          .av-stars { font-size:16px;color:#D97706;letter-spacing:2px; }
          .av-ttext { font-size:14px;line-height:1.75;color:#374151;flex:1; }
          .av-tauthor { display:flex;align-items:center;gap:12px; }
          .av-tavatar { width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0; }
          .av-tname { font-size:14px;font-weight:700;color:#0F3460; }
          .av-trole { font-size:12px;color:#6b7280; }

          /* Why */
          .av-why-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1; }
          .av-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px; }
          .av-wcard { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s; }
          .av-wcard.av-wv { opacity:1;transform:translateY(0) scale(1); }
          .av-wcard.av-wv:hover { transform:translateY(-5px) scale(1);border-color:rgba(220,38,38,.30);box-shadow:0 14px 40px rgba(15,52,96,.12); }
          .av-wcard-dot { width:10px;height:10px;border-radius:50%;background:#dc2626;margin-bottom:12px; }
          .av-wcard h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .av-wcard p { font-size:13px;color:#4A6080;line-height:1.65;margin:0; }

          /* Contact */
          .av-contact { padding:70px 40px;background:linear-gradient(135deg,rgba(254,226,226,.45) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1; }
          .av-contact-grid { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start; }
          .av-ctitle { font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#dc2626 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .av-cdesc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px; }
          .av-cbenefits { background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px; }
          .av-cbenefit { display:flex;gap:10px;align-items:flex-start; }
          .av-cbenefit-icon { flex-shrink:0;color:#dc2626;font-weight:800;font-size:16px;margin-top:1px; }
          .av-cbenefit p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .av-form-box { background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(254,226,226,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1); }
          .av-form-box h3 { font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px; }
          .av-form { display:flex;flex-direction:column;gap:13px; }
          .av-frow { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .av-fg { display:flex;flex-direction:column;gap:5px; }
          .av-fg.full { grid-column:1/-1; }
          .av-fg label { font-size:12px;font-weight:500;color:#0F1F40; }
          .av-fg input,.av-fg textarea,.av-fg select { padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s; }
          .av-fg input:focus,.av-fg textarea:focus,.av-fg select:focus { outline:none;border-color:#dc2626;box-shadow:0 0 0 3px rgba(220,38,38,.10); }
          .av-consent { display:flex;gap:8px;align-items:flex-start; }
          .av-consent input { margin-top:3px;width:15px;height:15px; }
          .av-consent label { font-size:11px;color:#4A6080;line-height:1.5; }
          .av-consent a { color:#0F3460; }
          .av-submit { width:100%;padding:14px;background:#0F3460;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(15,52,96,.22); }
          .av-submit:hover { background:#dc2626;transform:translateY(-2px);box-shadow:0 10px 30px rgba(220,38,38,.28); }

          /* FAQ */
          .av-faq { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1; }
          .av-faq h2 { font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px; }
          .av-faq-sub { font-size:15px;color:#4A6080;margin:0 0 36px; }
          .av-faq-list { display:flex;flex-direction:column;gap:10px; }
          .av-fitem { background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s; }
          .av-fitem.open { border-color:rgba(220,38,38,.30); }
          .av-fitem.open::before { content:'';display:block;height:3px;background:linear-gradient(90deg,#dc2626,#ef4444);border-radius:3px 3px 0 0; }
          .av-fq { width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .av-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s; }
          .av-fitem.open .av-fq-badge { background:#dc2626;color:#fff; }
          .av-fq span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4; }
          .av-fitem.open .av-fq span { color:#7f1d1d; }
          .av-fchev { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s; }
          .av-fitem.open .av-fchev { transform:rotate(180deg);color:#dc2626; }
          .av-fanswer-wrap { overflow:hidden;transition:max-height .35s ease;max-height:0; }
          .av-fitem.open .av-fanswer-wrap { max-height:500px; }
          .av-fanswer { padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8; }

          /* Related */
          .av-related { padding:80px 40px;background:rgba(237,233,254,.18);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60); }
          .av-related-inner { max-width:1300px;margin:0 auto;text-align:center; }
          .av-related h2 { font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px; }
          .av-related-sub { font-size:14px;color:#4A6080;margin:0 auto;max-width:560px; }
          .av-related hr { border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0; }
          .av-rtags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .av-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s; }
          .av-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09); }
          .av-rtag-blue   { background:rgba(59,130,246,.09);border-color:rgba(59,130,246,.28);color:#1D4ED8; }
          .av-rtag-violet { background:rgba(139,92,246,.09);border-color:rgba(139,92,246,.28);color:#6D28D9; }
          .av-rtag-amber  { background:rgba(245,158,11,.11);border-color:rgba(245,158,11,.32);color:#B45309; }
          .av-rtag-teal   { background:rgba(20,184,166,.09);border-color:rgba(20,184,166,.28);color:#0F766E; }
          .av-rtag-green  { background:rgba(16,185,129,.09);border-color:rgba(16,185,129,.26);color:#065f46; }
          .av-rtag-red    { background:rgba(220,38,38,.09);border-color:rgba(220,38,38,.28);color:#991b1b; }

          /* Responsive */
          @media(max-width:1024px){
            .av-hero h1,.av-s-title,.av-faq h2 { font-size:36px; }
            .av-svc-grid { grid-template-columns:repeat(2,1fr); }
            .av-stack-grid { grid-template-columns:repeat(2,1fr); }
            .av-eng-grid { grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto; }
            .av-eng-card.feat { transform:none; }
            .av-eng-card.feat.av-ev { transform:none; }
            .av-eng-card.feat.av-ev:hover { transform:translateY(-4px); }
            .av-why-grid { grid-template-columns:repeat(2,1fr); }
            .av-tgrid { grid-template-columns:1fr; }
            .av-contact-grid { grid-template-columns:1fr; }
          }
          @media(max-width:768px){
            .av-breadcrumb { padding:12px 20px 0; }
            .av-hero { padding:28px 20px 20px; }
            .av-hero h1 { font-size:26px;letter-spacing:-.3px; }
            .av-stats { grid-template-columns:1fr 1fr; }
            .av-stat-col:nth-child(2) { border-right:none; }
            .av-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,.10); }
            .av-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,.10);border-right:none; }
            .av-logos { padding:16px 20px 28px; }
            .av-svc-section,.av-stack-section,.av-eng-section,.av-process-section,.av-testi,.av-why-section,.av-faq,.av-related { padding:52px 20px; }
            .av-contact { padding:48px 20px; }
            .av-svc-grid,.av-stack-grid,.av-why-grid { grid-template-columns:1fr; }
            .av-frow { grid-template-columns:1fr; }
            .av-ctitle { font-size:28px; }
            .av-s-title { font-size:28px; }
          }
        `}</style>
      </Head>

      <div className="av-page">
        <div className="av-orb av-orb-1" />
        <div className="av-orb av-orb-2" />
        <div className="av-orb av-orb-3" />

        {/* ── BREADCRUMB ── */}
        <nav className="av-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Automotive Software Solutions</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── HERO ── */}
        <section className="av-hero">
          <span className="av-eyebrow">Automotive Software Development Company</span>
          <h1>Automotive Software Development — Connected, Intelligent &amp; Road-Ready</h1>
          <p className="av-hero-desc">We engineer connected vehicle platforms, ADAS software, fleet management systems, EV solutions, and dealership management platforms for OEMs, Tier 1 suppliers, fleet operators, and automotive startups across the US, UK, Europe, and Australia.</p>
          <div className="av-trust-row">
            {['ISO 26262 Experience','AUTOSAR Compliant','15+ Years Experience','60+ Automotive Clients','Full-Stack Delivery'].map(b => (
              <div className="av-badge" key={b}><span className="av-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="av-ctas">
            <Link href="#contact" className="av-btn-primary">Start Your Automotive Project</Link>
            <Link href="#engagement" className="av-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="av-stats" ref={statsRef}>
          {[['60+','Automotive Clients'],['200+','Projects Delivered'],['15+','Years Experience'],['97%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        {/* ── CLIENT LOGOS ── */}
        <div className="av-logos">
          <span className="av-logos-label">Trusted by Leading Organisations</span>
          <div className="av-logos-wrap">
            <div className="av-logos-track">
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
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="av-clogo" />
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="av-svc-section" aria-labelledby="av-svc-heading">
          <div className="av-inner">
            <div className={`av-s-reveal${visibleSections.has('svc') ? ' av-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="av-s-eyebrow">What We Build</span>
              <h2 id="av-svc-heading" className="av-s-title">Automotive Software Solutions We Deliver</h2>
              <p className="av-s-desc" style={{ maxWidth: 720 }}>From connected vehicle telematics and ADAS features to fleet management, EV charging infrastructure, and dealership platforms — we engineer the full spectrum of automotive software with embedded, cloud, and mobile expertise.</p>
            </div>
            <div className="av-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`av-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' av-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="av-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="av-svc-more">
                <button className="av-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section id="stack" className="av-stack-section" aria-labelledby="av-stack-heading">
          <div className="av-inner">
            <div className={`av-s-reveal${visibleSections.has('stk') ? ' av-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="av-s-eyebrow">The Automotive Tech Stack We Use</span>
              <h2 id="av-stack-heading" className="av-s-title">Technology Built for Automotive-Grade Reliability</h2>
              <p className="av-s-desc" style={{ maxWidth: 680 }}>Every technology we use is selected for the determinism, safety integrity, and regulatory compliance that automotive software demands — from MISRA-compliant embedded code to OCPP-certified charging systems.</p>
            </div>
            <div className="av-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`av-stack-card${visibleStackCards.includes(i) ? ' av-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="av-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="av-stack-pills">
                    {grp.items.map(item => (
                      <span key={item} className="av-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section id="engagement" className="av-eng-section" aria-labelledby="av-eng-heading">
          <div className="av-inner">
            <div className={`av-s-reveal${visibleSections.has('eng') ? ' av-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="av-s-eyebrow">How We Work With You</span>
              <h2 id="av-eng-heading" className="av-s-title">Engagement Models for Automotive Software Development</h2>
              <p className="av-s-desc" style={{ maxWidth: 680 }}>Whether you need a fixed-price product module, a long-term embedded engineering team, or flexible R&D collaboration on ADAS or V2X, we adapt to your project stage and technical requirements.</p>
            </div>
            <div className="av-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`av-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' av-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="av-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="av-eng-icon">
                    <svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg>
                  </div>
                  <div className="av-eng-name">{m.name}</div>
                  <div className="av-eng-headline">{m.headline}</div>
                  <div className="av-eng-desc">{m.desc}</div>
                  <div className="av-eng-list-label">Best for</div>
                  <ul className="av-eng-list">
                    {m.bestFor.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="av-eng-process">
                    <strong>Process:</strong> {m.process}<br />
                    <span className="av-eng-timeline">{m.timeline}</span>
                  </div>
                  <Link href="#contact" className="av-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="av-process-section" aria-labelledby="av-proc-heading">
          <div className="av-inner" style={{ maxWidth: 760 }}>
            <div className={`av-s-reveal${visibleSections.has('proc') ? ' av-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="av-s-eyebrow">How We Deliver</span>
              <h2 id="av-proc-heading" className="av-s-title">Our Automotive Software Development Process</h2>
              <p className="av-s-desc">A structured six-stage process designed for safety-critical automotive software — from requirements scoping and architecture design to HIL testing and production OTA deployment.</p>
            </div>
            <div className="av-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`av-pstep${visibleSections.has('proc') ? ' av-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="av-pstep-l">
                    <div className="av-pstep-circle">{step.num}</div>
                    <div className="av-pstep-connector" />
                  </div>
                  <div className="av-pstep-r">
                    <div className="av-pstep-title">{step.title}</div>
                    <p className="av-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="av-testi" aria-labelledby="av-ts-heading">
          <div className="av-inner">
            <div className={`av-center-head av-s-reveal${visibleSections.has('ts') ? ' av-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="av-s-eyebrow">Client Results</span>
              <h2 id="av-ts-heading" className="av-s-title">What Our Automotive Clients Say</h2>
              <p className="av-s-desc">Trusted by fleet operators, OEMs, EV charging networks, and dealership groups across the US, UK, and Australia.</p>
            </div>
            <div className="av-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`av-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' av-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}
                  itemScope itemType="https://schema.org/Review">
                  <div className="av-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="av-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="av-tauthor">
                    <div className="av-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div>
                      <div className="av-tname" itemProp="author">{t.name}</div>
                      <div className="av-trole">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="av-why-section" aria-labelledby="av-wy-heading">
          <div className="av-inner">
            <div className={`av-s-reveal${visibleSections.has('wy') ? ' av-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="av-s-eyebrow">Why 1Solutions</span>
              <h2 id="av-wy-heading" className="av-s-title">Why Choose Us for Automotive Software Development</h2>
              <p className="av-s-desc" style={{ maxWidth: 680 }}>15+ years engineering automotive and embedded software, with deep expertise across ISO 26262, AUTOSAR, connected vehicle platforms, EV systems, and automotive cybersecurity.</p>
            </div>
            <div className="av-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`av-wcard${visibleWhyCards.includes(i) ? ' av-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="av-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="av-contact" aria-labelledby="av-contact-heading">
          <div className="av-contact-grid">
            <div>
              <h2 id="av-contact-heading" className="av-ctitle">Start Your Automotive Software Project</h2>
              <p className="av-cdesc">Tell us about your product and we will schedule a free 60-minute technical discovery call with a senior automotive software architect. No sales pitch — just clear engineering guidance on what you need to build.</p>
              <div className="av-cbenefits">
                {[
                  ['✓', 'Free 60-minute discovery call with a senior automotive software architect'],
                  ['✓', 'Preliminary ISO 26262 / AUTOSAR / connectivity scoping at no charge'],
                  ['✓', 'Architecture recommendation and tech stack advice before you commit'],
                  ['✓', 'NDA available on request — your product idea stays protected'],
                  ['✓', 'Response within 24 business hours from our automotive engineering team'],
                ].map(([icon, text]) => (
                  <div className="av-cbenefit" key={text}>
                    <span className="av-cbenefit-icon">{icon}</span>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="av-form-box">
              <h3>Tell Us About Your Automotive Project</h3>
              <form className="av-form" onSubmit={e => e.preventDefault()}>
                <div className="av-frow">
                  <div className="av-fg">
                    <label htmlFor="av-name">Full Name *</label>
                    <input id="av-name" type="text" placeholder="Your name" required />
                  </div>
                  <div className="av-fg">
                    <label htmlFor="av-email">Work Email *</label>
                    <input id="av-email" type="email" placeholder="you@company.com" required />
                  </div>
                </div>
                <div className="av-frow">
                  <div className="av-fg">
                    <label htmlFor="av-company">Company</label>
                    <input id="av-company" type="text" placeholder="Company name" />
                  </div>
                  <div className="av-fg">
                    <label htmlFor="av-phone">Phone / WhatsApp</label>
                    <input id="av-phone" type="tel" placeholder="+1 555 000 0000" />
                  </div>
                </div>
                <div className="av-fg full">
                  <label htmlFor="av-type">Automotive Project Type *</label>
                  <select id="av-type" required>
                    <option value="">Select project type...</option>
                    <option>Connected Vehicle / Telematics Platform</option>
                    <option>ADAS / Autonomous Driving Software</option>
                    <option>Fleet Management System</option>
                    <option>Electric Vehicle (EV) Software</option>
                    <option>In-Vehicle Infotainment (IVI)</option>
                    <option>Dealership Management System (DMS)</option>
                    <option>Vehicle Diagnostics / OBD Tool</option>
                    <option>Automotive Supply Chain Software</option>
                    <option>V2X Communication Platform</option>
                    <option>Automotive Cybersecurity</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="av-fg full">
                  <label htmlFor="av-msg">Project Brief *</label>
                  <textarea id="av-msg" rows={4} placeholder="Describe your automotive software product, target vehicle architecture, safety requirements (ASIL level if known), and timeline..." required />
                </div>
                <div className="av-consent">
                  <input id="av-consent" type="checkbox" required />
                  <label htmlFor="av-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. An NDA is available on request to protect your product idea before our first call.</label>
                </div>
                <button type="submit" className="av-submit">Get Free Discovery Call →</button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="av-faq" aria-labelledby="av-faq-heading">
          <div className="av-inner" style={{ maxWidth: 860 }}>
            <span className="av-s-eyebrow">FAQ</span>
            <h2 id="av-faq-heading">Automotive Software Development — Frequently Asked Questions</h2>
            <p className="av-faq-sub">Everything you need to know about building ISO 26262-experienced, production-ready automotive software with 1Solutions.</p>
            <div className="av-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`av-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="av-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="av-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="av-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="av-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="av-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="av-related">
          <div className="av-related-inner">
            <span className="av-s-eyebrow">Explore More</span>
            <h2>Related Services &amp; Industries</h2>
            <p className="av-related-sub">We also build software for healthcare, fintech, logistics, IoT, and on-demand mobility platforms.</p>
            <hr />
            <div className="av-rtags">
              {[
                ['/healthcare-software-development/', 'Healthcare Software Development', 'av-rtag-green'],
                ['/fintech-software-development-company/', 'Fintech Software Development', 'av-rtag-violet'],
                ['/iot-development/', 'IoT Development', 'av-rtag-teal'],
                ['/mobile-app-development/', 'Mobile App Development', 'av-rtag-blue'],
                ['/ai-ml-development/', 'AI / ML Development', 'av-rtag-amber'],
                ['/custom-software-development/', 'Custom Software Development', 'av-rtag-red'],
                ['/react-js-development-company/', 'React.js Development', 'av-rtag-blue'],
                ['/python-development-company/', 'Python Development', 'av-rtag-violet'],
                ['/node-js-development-company/', 'Node.js Development', 'av-rtag-green'],
                ['/api-development-company/', 'API Development', 'av-rtag-teal'],
              ].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`av-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
