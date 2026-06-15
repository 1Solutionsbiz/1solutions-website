'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.1solutions.biz/#industries' }, { '@type': 'ListItem', position: 3, name: 'Manufacturing Software', item: 'https://www.1solutions.biz/manufacturing-software-development-services/' }] },
    { '@type': 'Service', name: 'Manufacturing Software Development Services', url: 'https://www.1solutions.biz/manufacturing-software-development-services/', description: '1Solutions builds custom manufacturing software — MES (Manufacturing Execution Systems), ERP integration, production planning and scheduling, quality management systems (QMS), supply chain visibility platforms, IoT/IIoT data collection, predictive maintenance, and manufacturing analytics. 15+ years, 90+ manufacturing projects.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '72', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What manufacturing software does 1Solutions develop?', acceptedAnswer: { '@type': 'Answer', text: '1Solutions develops Manufacturing Execution Systems (MES), ERP integration and customisation, production planning and scheduling tools, Quality Management Systems (QMS), supply chain visibility platforms, IoT/IIoT data collection and dashboards, predictive maintenance systems, factory floor monitoring, digital work instructions, traceability and batch tracking, and manufacturing analytics platforms.' } },
      { '@type': 'Question', name: 'Can you integrate with our existing ERP system?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — ERP integration is central to manufacturing software. We integrate with SAP (S/4HANA, R/3, Business One), Oracle ERP Cloud, Microsoft Dynamics 365, Epicor, Infor, NetSuite, and custom ERP systems. Integration approaches include REST/SOAP API, SAP BAPI/RFC, BizTalk/MuleSoft middleware, and direct database connectors. We build bi-directional sync of production orders, inventory, BOM, routing, and quality data.' } },
      { '@type': 'Question', name: 'Do you develop IoT/IIoT software for factories?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — IIoT (Industrial IoT) development is one of our manufacturing specialties. We build data collection layers for PLCs, SCADA systems, CNC machines, and sensors (OPC-UA, MQTT, Modbus); edge computing solutions for low-latency factory processing; cloud IoT platforms (AWS IoT Core, Azure IoT Hub); real-time dashboards for OEE monitoring; and predictive maintenance systems using vibration, temperature, and cycle-count data.' } },
    ] },
  ],
};

const SOLUTIONS = [
  { n: '01', title: 'Manufacturing Execution System (MES)', desc: 'Custom MES for shop floor control — production order management and dispatch, work centre and machine scheduling, digital work instructions, real-time WIP tracking, operator task management, production reporting (yield, scrap, cycle time), integration with ERP (SAP, Oracle, Dynamics), barcode/RFID scan points, and shift handover and downtime logging.' },
  { n: '02', title: 'ERP Integration & Customisation', desc: 'Manufacturing ERP integration — bi-directional sync of production orders, BOM, routing, inventory, and quality data between MES/custom applications and SAP (S/4HANA, Business One), Oracle ERP Cloud, Microsoft Dynamics 365, Epicor, Infor, or NetSuite. Custom ERP modules for industry-specific processes that off-the-shelf ERP does not cover. API middleware and iPaaS (MuleSoft, Azure Integration Services).', feat: true },
  { n: '03', title: 'Production Planning & Scheduling', desc: 'Advanced production scheduling — finite capacity scheduling, machine and labour resource allocation, what-if scenario simulation, demand-driven MRP, sales order-to-production order conversion, customer promise date calculation, bottleneck identification, priority rules management, and visual Gantt chart scheduling board with drag-and-drop rescheduling for planners.' },
  { n: '04', title: 'Quality Management System (QMS)', desc: 'Digital QMS for manufacturing — inspection plan management, incoming quality control (IQC), in-process inspection and SPC (statistical process control), final inspection, non-conformance (NCR) and corrective action (CAPA) management, supplier quality management, document control (SOPs, work instructions, inspection forms), audit management, and FDA 21 CFR Part 11 / ISO 9001 compliance support.' },
  { n: '05', title: 'IoT / IIoT Factory Monitoring', desc: 'Industrial IoT data platform — machine connectivity (OPC-UA, MQTT, Modbus, RS-232/485), PLC and SCADA data collection, edge computing for local processing, cloud IoT platform integration (AWS IoT Core, Azure IoT Hub), real-time OEE (Overall Equipment Effectiveness) dashboard, energy monitoring, alarm and notification system, and historian data storage with trend analysis.' },
  { n: '06', title: 'Predictive Maintenance Platform', desc: 'AI-driven predictive maintenance — sensor data collection (vibration, temperature, current, acoustic), anomaly detection models, remaining useful life (RUL) prediction, maintenance alert and work order generation, historical fault pattern analysis, integration with CMMS (Computerised Maintenance Management System), and maintenance analytics dashboards for plant engineers and managers.' },
  { n: '07', title: 'Supply Chain Visibility Platform', desc: 'End-to-end supply chain visibility — supplier portal for PO confirmation and delivery ETAs, inbound logistics tracking, raw material inventory tracking, demand signal integration from customers and distributors, supplier risk scoring, carbon footprint tracking, and supply chain event management (exception alerts, alternative sourcing recommendations, delay impact simulation).' },
  { n: '08', title: 'Traceability & Batch Tracking', desc: 'Full-genealogy traceability — batch/lot traceability from raw material receipt through production and despatch, serialisation for high-value components, RFID and barcode scan integration, one-up/one-down traceability for rapid recall, GS1 compliance, blockchain-based traceability for supply chain transparency, and regulatory reporting for pharma, food, and medical device manufacturers.' },
  { n: '09', title: 'Digital Work Instructions (DWI)', desc: 'Paperless factory floor — structured digital work instructions with text, images, video, and AR overlay; step-by-step operator guidance on tablets or wearables; version control and controlled release; integration with MES for auto-release when a production order is dispatched; sign-off and acknowledgement capture; and translation management for multi-language workforces.' },
  { n: '10', title: 'Manufacturing Analytics & OEE Dashboard', desc: 'Manufacturing intelligence platform — OEE calculation and trending (Availability x Performance x Quality), downtime Pareto analysis, scrap and yield analytics, throughput and cycle time analysis, cost-of-quality reporting, shift comparison, machine utilisation heatmap, first-pass yield by product and production line, and executive manufacturing KPI dashboard (Power BI, Metabase, or custom).' },
];

const TECH_STACK = [
  { group: 'Industrial Connectivity', color: '#78350f', items: ['OPC-UA / OPC-DA', 'MQTT / AMQP', 'Modbus TCP/RTU', 'RS-232 / RS-485', 'PROFINET / EtherNet/IP', 'Siemens S7 / Allen-Bradley'] },
  { group: 'IoT & Edge', color: '#92400e', items: ['AWS IoT Core', 'Azure IoT Hub', 'GCP IoT Core', 'Edge computing (Node-RED)', 'SCADA integration', 'InfluxDB (time-series)'] },
  { group: 'Backend & APIs', color: '#b45309', items: ['Node.js / NestJS', 'Python / FastAPI', 'Java / Spring Boot', '.NET Core / C#', 'REST & GraphQL', 'gRPC (real-time)'] },
  { group: 'ERP Integration', color: '#0369a1', items: ['SAP S/4HANA / ECC', 'Oracle ERP Cloud', 'Microsoft Dynamics 365', 'Epicor / Infor', 'NetSuite', 'MuleSoft / BizTalk'] },
  { group: 'Frontend & Mobile', color: '#7c2d12', items: ['React / Next.js', 'React Native (tablet)', 'Electron (desktop HMI)', 'D3.js (charts)', 'Progressive Web App', 'WPF / WinForms'] },
  { group: 'AI & Analytics', color: '#6d28d9', items: ['Python ML (scikit-learn)', 'TensorFlow / PyTorch', 'Time-series forecasting', 'Anomaly detection', 'Power BI / Metabase', 'Snowflake / BigQuery'] },
  { group: 'Database & Storage', color: '#059669', items: ['PostgreSQL / SQL Server', 'InfluxDB (time-series)', 'TimescaleDB', 'Redis (real-time)', 'MongoDB (config)', 'AWS S3 (data lake)'] },
  { group: 'Cloud & DevOps', color: '#dc2626', items: ['AWS / Azure / GCP', 'Kubernetes / EKS', 'Docker (containers)', 'GitHub Actions CI/CD', 'Terraform (IaC)', 'On-premise deployment'] },
];

const ENGAGEMENT = [
  { id: 'mes', name: 'Custom MES Development', badge: 'Most Requested', bc: '#D97706', feat: true, icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', headline: 'Shop floor control and production visibility.', desc: 'Full-cycle MES development — production order management, machine scheduling, digital work instructions, WIP tracking, quality capture, ERP integration, and OEE reporting. Discovery → architecture → agile sprints → factory rollout.', best: ['Manufacturers with paper-based or spreadsheet production tracking', 'Factories losing yield to untracked scrap and rework', 'Plants needing real-time OEE measurement across all production lines', 'Manufacturers integrating shop floor data with their ERP for the first time'], tl: 'Core MES live in 12–16 weeks; full rollout 5–8 months' },
  { id: 'iot', name: 'IIoT & Predictive Maintenance', badge: 'High ROI', bc: '#78350f', icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18', headline: 'Real-time machine monitoring and failure prediction.', desc: 'IIoT platform connecting PLCs, SCADA, and sensors to a cloud analytics layer — real-time OEE, downtime alerts, energy monitoring, and ML-based predictive maintenance that reduces unplanned downtime by 20–40%.', best: ['Manufacturers with high unplanned downtime cost', 'Plants with aging machines that break without warning', 'Factories needing real-time energy monitoring for ESG reporting', 'Maintenance teams moving from reactive to condition-based maintenance'], tl: 'First machines connected and live in 6–10 weeks' },
  { id: 'erp', name: 'ERP Integration Sprint', badge: 'Quick Win', bc: '#0369a1', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', headline: 'Connect your shop floor systems to your ERP.', desc: 'Fixed-scope ERP integration — bi-directional sync of production orders, BOM, inventory, quality, and cost data between your MES/custom applications and SAP, Oracle, Dynamics, or Epicor. Defined deliverables, fixed timeline.', best: ['Manufacturers manually re-keying production data into ERP', 'Plants needing real-time inventory and WIP visibility in ERP', 'Factories connecting a new MES or QMS to their existing ERP', 'Companies implementing SAP S/4HANA and needing MES connectivity'], tl: 'Integration complete in 6–10 weeks' },
];

const TESTIMONIALS = [
  { text: "1Solutions built our custom MES for a 6-line automotive components plant. The system handles production order dispatch, digital work instructions, in-process quality checks, and real-time OEE. Integrated with our SAP S/4HANA system. OEE improved from 62% to 81% in the first 6 months. Their manufacturing domain knowledge was exceptional — they understood our process before writing a single line of code.", name: 'Richard P.', role: 'Plant Director, Automotive Components Manufacturer (UK)', init: 'RP', bg: '#3d1a06' },
  { text: "We hired 1Solutions to build an IIoT predictive maintenance platform for our 80-machine food processing plant. The system collects sensor data from all machines, flags anomaly patterns, and generates maintenance work orders before failure. Unplanned downtime dropped 38% in the first year. The ROI justified the entire project cost in 4 months.", name: 'Sandra L.', role: 'Operations Director, Food Processing Company (AU)', init: 'SL', bg: '#2d3a1a', feat: true },
  { text: "1Solutions built our quality management system and connected it to our Oracle ERP. The QMS handles IQC, in-process inspection, SPC charts, NCR/CAPA workflows, and supplier scorecards. First-pass yield went from 91% to 97.4% within a year of go-live. Achieving ISO 9001:2015 recertification was significantly smoother because all our quality data was properly captured.", name: 'Kevin H.', role: 'Quality Manager, Precision Engineering Firm (US)', init: 'KH', bg: '#1e3a5f' },
];

const WHY = [
  { t: '90+ Manufacturing Projects', d: '1Solutions has built MES, QMS, IIoT platforms, ERP integrations, and supply chain tools for manufacturers in automotive, food & beverage, pharmaceuticals, electronics, and precision engineering across the UK, US, AU, and CA.' },
  { t: 'Shop Floor Protocol Expertise', d: 'OPC-UA, MQTT, Modbus, PROFINET, and direct PLC/SCADA integration — we connect real machines, not just databases. Our engineers understand factory automation protocols and safety constraints.' },
  { t: 'ERP Integration Depth', d: 'SAP (BAPI/RFC, S/4HANA REST API), Oracle, Dynamics 365, Epicor, and Infor — bi-directional data sync for production, BOM, inventory, quality, and cost data. We know the data models, not just the APIs.' },
  { t: 'OEE Improvement Focus', d: 'We measure OEE at baseline before a project starts and track improvement as the primary KPI. Our MES and IIoT platforms are designed to surface the specific losses (availability, performance, quality) that will move OEE in your plant.' },
  { t: 'Regulatory Compliance Support', d: 'FDA 21 CFR Part 11 (pharma/medical device), ISO 9001 QMS, GS1 traceability, and IATF 16949 (automotive) — we have delivered compliant systems in regulated manufacturing environments.' },
  { t: 'Edge to Cloud Architecture', d: 'Edge computing for low-latency factory decisions (sub-100ms PLC feedback), combined with cloud analytics for OEE trending, predictive maintenance, and executive reporting — not one-size-fits-all cloud-only architecture.' },
  { t: 'Phased Rollout Approach', d: 'Manufacturing software rollouts cannot stop production. We use phased deployment — one line or one machine at a time — with parallel-run periods, operator training, and a proven rollout playbook built over 90+ projects.' },
  { t: 'Post-Launch Manufacturing Support', d: 'MES and IIoT platforms are mission-critical. SLA-backed post-launch support with P1 response under 2 hours, 24/7 monitoring during peak production periods, and on-site support for major plant changes.' },
];

const FAQS = [
  { q: 'What manufacturing software does 1Solutions develop?', a: 'Manufacturing Execution Systems (MES), ERP integration (SAP, Oracle, Dynamics), production planning and scheduling, Quality Management Systems (QMS), IIoT factory monitoring, predictive maintenance, supply chain visibility, traceability and batch tracking, digital work instructions, and manufacturing analytics / OEE dashboards.' },
  { q: 'Can you integrate with our existing ERP system?', a: 'Yes — SAP (S/4HANA, ECC, Business One), Oracle ERP Cloud, Microsoft Dynamics 365, Epicor, Infor, and NetSuite. Bi-directional sync of production orders, BOM, inventory, quality, and cost data using REST/SOAP API, SAP BAPI/RFC, or middleware (MuleSoft, Azure Integration Services).' },
  { q: 'Do you develop IIoT software for factories?', a: 'Yes — machine connectivity (OPC-UA, MQTT, Modbus, PROFINET), PLC and SCADA data collection, edge computing, cloud IoT platforms (AWS IoT Core, Azure IoT Hub), real-time OEE dashboards, energy monitoring, and predictive maintenance systems using vibration, temperature, and cycle-count sensor data.' },
  { q: 'Can you build a system for FDA 21 CFR Part 11 compliance?', a: 'Yes — electronic records, electronic signatures, audit trails, user authentication, and access controls in line with FDA 21 CFR Part 11. We have delivered compliant QMS and MES systems for pharmaceutical, medical device, and nutraceutical manufacturers. We document the validation approach upfront and support IQ/OQ/PQ validation activities.' },
  { q: 'What is an MES and how is it different from an ERP?', a: "An ERP manages business processes (finance, HR, procurement, sales orders). An MES manages real-time shop floor execution — it knows what is being produced right now, on which machine, by which operator, with what material lot. An MES sits between ERP and the factory floor, consuming production orders from ERP and feeding back actual quantities, quality results, and time data. They are complementary, not competing systems." },
  { q: 'How long does it take to build a custom MES?', a: 'Core MES (production order dispatch, WIP tracking, basic reporting) for a single production area: 12–16 weeks. Full MES with digital work instructions, quality, ERP integration, and OEE: 5–8 months. Multi-site rollout: 12–18 months total. We phase delivery to go live on one line first, validate with operators, then roll out across the plant.' },
  { q: 'Do you do on-premise deployments for manufacturing?', a: 'Yes — on-premise, cloud, or hybrid. Many manufacturers require on-premise deployment for latency, data sovereignty, or network isolation reasons. We support on-premise deployment on customer infrastructure (Windows Server, Linux, VM, or bare metal), with remote access for support and monitoring. Air-gapped deployments are also supported.' },
  { q: 'Can you connect our machines to a real-time dashboard?', a: 'Yes — we connect to PLCs and controllers via OPC-UA, MQTT, or Modbus; collect cycle counts, alarm states, energy, and quality data; buffer at the edge; and display real-time OEE, downtime events, and alarms on dashboards that plant managers and operators can see from any device.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => { if (!start) return; const n = parseInt(target.replace(/\D/g, ''), 10); if (!n) return; let t0 = null; const s = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) requestAnimationFrame(s); }; requestAnimationFrame(s); }, [start, target, duration]);
  return count;
}
function StatItem({ label, val, started }) {
  const n = useCountUp(val, 1800, started);
  const sfx = val.replace(/[\d,]/g, '');
  return (<div className="mfg-sc"><div className="mfg-sv">{started ? n + sfx : val}</div><div className="mfg-sl">{label}</div></div>);
}

export default function ManufacturingSoftware() {
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
  const ac = '#78350f'; const txt = '#3d1a06'; const txt2 = '#5c2a0a';
  return (
    <>
      <Head>
        <title>Manufacturing Software Development | MES, IIoT, ERP Integration, QMS | 1Solutions</title>
        <meta name="description" content="Custom manufacturing software development — MES, ERP integration (SAP, Oracle, Dynamics), IIoT factory monitoring, predictive maintenance, QMS, supply chain visibility, and OEE analytics. 90+ manufacturing projects. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/manufacturing-software-development-services/" />
        <meta property="og:title" content="Manufacturing Software Development Services | 1Solutions" />
        <meta property="og:description" content="MES, IIoT, ERP integration, predictive maintenance, QMS, and OEE analytics. 90+ manufacturing projects." />
        <meta property="og:url" content="https://www.1solutions.biz/manufacturing-software-development-services/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .mfg-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#fdf6ee 0%,#fef3e2 20%,#fdf8f0 50%,#f0f4e8 75%,#e8f0f8 100%);color:${txt};line-height:1.6;position:relative;overflow-x:hidden}
          .mfg-page *,.mfg-page *::before,.mfg-page *::after{box-sizing:border-box}
          .mfg-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .mfg-o1{width:800px;height:800px;background:radial-gradient(circle,rgba(120,53,15,.16) 0%,transparent 70%);top:-220px;right:-200px}
          .mfg-o2{width:700px;height:700px;background:radial-gradient(circle,rgba(180,83,9,.13) 0%,transparent 70%);bottom:0;left:-200px}
          .mfg-o3{width:480px;height:480px;background:radial-gradient(circle,rgba(5,150,105,.08) 0%,transparent 70%);top:42%;left:-90px}
          .mfg-bc{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .mfg-bc ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:${ac}}
          .mfg-bc li{display:flex;align-items:center;gap:6px}.mfg-bc li::after{content:'/';opacity:.45}.mfg-bc li:last-child::after{display:none}
          .mfg-bc a{color:${txt};text-decoration:none}
          .mfg-hero{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto;padding:44px 40px 28px}
          .mfg-ey{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${ac};margin-bottom:14px}
          .mfg-hero h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,${txt} 0%,${ac} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .mfg-desc{font-size:16px;color:${txt2};line-height:1.65;max-width:720px;margin:0 auto 22px}
          .mfg-tr{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-bottom:24px}
          .mfg-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:5px 13px;font-size:12px;font-weight:600;color:${txt};box-shadow:0 2px 8px rgba(120,53,15,.07)}
          .mfg-dot{width:7px;height:7px;border-radius:50%;background:${ac};flex-shrink:0}
          .mfg-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .mfg-p{display:inline-block;padding:13px 34px;background:${ac};color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(120,53,15,.28)}
          .mfg-p:hover{background:${txt};transform:translateY(-2px)}
          .mfg-g{display:inline-block;padding:13px 34px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:${txt};font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .mfg-g:hover{background:rgba(255,255,255,.85);border-color:rgba(120,53,15,.5);transform:translateY(-2px)}
          .mfg-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:920px;margin:26px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(120,53,15,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .mfg-sc{padding:18px 16px;text-align:center;border-right:1px solid rgba(120,53,15,.10)}.mfg-sc:last-child{border-right:none}
          .mfg-sv{font-size:28px;font-weight:900;color:${ac};letter-spacing:-.5px;line-height:1}
          .mfg-sl{font-size:11px;color:${txt2};font-weight:500;margin-top:5px}
          .mfg-sec{padding:72px 40px;position:relative;z-index:1}
          .mfg-sec-alt{background:rgba(253,246,238,.55);border-top:1px solid rgba(120,53,15,.08);border-bottom:1px solid rgba(120,53,15,.08)}
          .mfg-in{max-width:1300px;margin:0 auto}
          .mfg-sey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .mfg-sh{font-size:44px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,#b45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .mfg-sd{font-size:15px;color:${txt2};line-height:1.7;max-width:700px}
          .mfg-rv{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .mfg-rv.mfg-ok{opacity:1;transform:translateY(0)}
          .mfg-sk-g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
          .mfg-card{background:linear-gradient(135deg,rgba(253,246,238,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,244,232,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(120,53,15,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),border-color .2s}
          .mfg-card.mfg-cv{opacity:1;transform:translateY(0)}.mfg-card.mfg-cv:hover{transform:translateY(-5px);border-color:rgba(120,53,15,.25);box-shadow:0 14px 40px rgba(120,53,15,.12)}
          .mfg-card.feat{border-color:rgba(120,53,15,.18)}
          .mfg-cn{position:absolute;top:6px;right:12px;font-size:68px;font-weight:900;line-height:1;color:${ac};opacity:.05;pointer-events:none;user-select:none}
          .mfg-card h3{font-size:15px;font-weight:700;color:${txt};margin:0 0 7px;position:relative;z-index:1}
          .mfg-card p{font-size:13px;color:${txt2};line-height:1.65;margin:0;position:relative;z-index:1}
          .mfg-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,${ac},#b45309);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top;transition:transform .3s}
          .mfg-card.mfg-cv:hover::before{transform:scaleY(1)}
          .mfg-sm{text-align:center;margin-top:20px}
          .mfg-bm{display:inline-block;background:#fff;border:1.5px solid rgba(120,53,15,.18);color:${txt};padding:9px 28px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .mfg-bm:hover{background:${ac};border-color:${ac};color:#fff;transform:translateY(-2px)}
          .mfg-tec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
          .mfg-tc2{background:linear-gradient(135deg,rgba(253,246,238,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,244,232,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:20px 18px;box-shadow:0 4px 24px rgba(120,53,15,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .mfg-tc2.mfg-sv2{opacity:1;transform:translateY(0)}.mfg-tc2.mfg-sv2:hover{border-color:rgba(120,53,15,.22);box-shadow:0 12px 36px rgba(120,53,15,.10)}
          .mfg-tg{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:10px;padding-bottom:7px;border-bottom:2px solid}
          .mfg-pills{display:flex;flex-wrap:wrap;gap:5px}
          .mfg-pill{display:inline-block;font-size:11px;font-weight:500;padding:3px 9px;border-radius:100px;border:1px solid}
          .mfg-en-g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
          .mfg-en{background:linear-gradient(135deg,rgba(253,246,238,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,244,232,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(120,53,15,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1),border-color .2s}
          .mfg-en.mfg-ev{opacity:1;transform:translateY(0)}.mfg-en.mfg-ev:hover{border-color:rgba(120,53,15,.22);box-shadow:0 14px 44px rgba(120,53,15,.12)}
          .mfg-en.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(253,246,238,.45) 100%);border-color:rgba(217,119,6,.26);transform:translateY(-6px)}
          .mfg-en.feat.mfg-ev{transform:translateY(-6px)}.mfg-en.feat.mfg-ev:hover{transform:translateY(-10px)}
          .mfg-en-b{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:4px 11px;border-radius:100px;border:1px solid;margin-bottom:16px}
          .mfg-en-i{width:44px;height:44px;background:rgba(120,53,15,.08);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
          .mfg-en.feat .mfg-en-i{background:rgba(217,119,6,.10)}
          .mfg-en-n{font-size:20px;font-weight:900;color:${txt};margin:0 0 5px;letter-spacing:-.3px}
          .mfg-en-h{font-size:13px;font-weight:600;color:${ac};margin-bottom:10px}
          .mfg-en.feat .mfg-en-h{color:#D97706}
          .mfg-en-d{font-size:13px;color:${txt2};line-height:1.7;margin-bottom:14px}
          .mfg-en-ll{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${ac};margin-bottom:7px}
          .mfg-en-li{list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:6px}
          .mfg-en-li li{display:flex;align-items:flex-start;gap:7px;font-size:13px;color:#374151;line-height:1.5}
          .mfg-en-li li::before{content:'✓';font-weight:800;color:${ac};flex-shrink:0;margin-top:1px}
          .mfg-en.feat .mfg-en-li li::before{color:#D97706}
          .mfg-en-tl{font-size:11px;font-weight:600;color:#D97706;display:block;padding-top:10px;border-top:1px solid rgba(120,53,15,.08)}
          .mfg-en-a{display:block;margin-top:14px;padding:10px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(120,53,15,.09);color:${txt};border:1.5px solid rgba(120,53,15,.18)}
          .mfg-en-a:hover{background:${txt};color:#fff}
          .mfg-en.feat .mfg-en-a{background:${ac};color:#fff;border-color:${ac}}
          .mfg-en.feat .mfg-en-a:hover{background:${txt};border-color:${txt}}
          .mfg-tg2{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
          .mfg-tc{background:linear-gradient(135deg,rgba(253,246,238,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,244,232,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:26px 22px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 24px rgba(120,53,15,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
          .mfg-tc.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(253,246,238,.42) 100%);border-color:rgba(217,119,6,.20)}
          .mfg-tc.mfg-tv{opacity:1;transform:translateY(0)}.mfg-tc.mfg-tv:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(120,53,15,.12)}
          .mfg-stars{font-size:15px;color:#D97706;letter-spacing:2px}
          .mfg-ttxt{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .mfg-au{display:flex;align-items:center;gap:11px}
          .mfg-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .mfg-an{font-size:14px;font-weight:700;color:${txt}}
          .mfg-ar{font-size:12px;color:#6b7280}
          .mfg-wy-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px}
          .mfg-wc{background:linear-gradient(135deg,rgba(253,246,238,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,244,232,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:22px 18px;box-shadow:0 4px 24px rgba(120,53,15,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px) scale(.97);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .mfg-wc.mfg-wv{opacity:1;transform:translateY(0) scale(1)}.mfg-wc.mfg-wv:hover{transform:translateY(-4px) scale(1);border-color:rgba(120,53,15,.22);box-shadow:0 12px 36px rgba(120,53,15,.10)}
          .mfg-wd{width:9px;height:9px;border-radius:50%;background:${ac};margin-bottom:10px}
          .mfg-wc h3{font-size:13px;font-weight:700;color:${txt};margin:0 0 7px;line-height:1.35}
          .mfg-wc p{font-size:12px;color:${txt2};line-height:1.6;margin:0}
          .mfg-ct{padding:64px 40px;background:linear-gradient(135deg,rgba(253,246,238,.55) 0%,rgba(255,255,255,.60) 40%,rgba(240,244,232,.50) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .mfg-ct-g{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;gap:28px;align-items:start}
          .mfg-cth{font-size:38px;font-weight:900;line-height:1.18;margin:0 0 12px;background:linear-gradient(90deg,${txt} 0%,${ac} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .mfg-ctd{font-size:14px;color:${txt2};line-height:1.6;margin:0 0 18px}
          .mfg-ben{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px}
          .mfg-be{display:flex;gap:9px;align-items:flex-start}
          .mfg-bi{flex-shrink:0;color:${ac};font-weight:800;font-size:15px;margin-top:1px}
          .mfg-be p{font-size:13px;color:${txt2};margin:0;line-height:1.5}
          .mfg-fb{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(253,246,238,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:18px;padding:30px;box-shadow:0 8px 40px rgba(120,53,15,.08),inset 0 1px 0 rgba(255,255,255,1)}
          .mfg-fb h3{font-size:20px;font-weight:700;color:${txt};margin:0 0 20px}
          .mfg-form{display:flex;flex-direction:column;gap:12px}
          .mfg-fr{display:grid;grid-template-columns:1fr 1fr;gap:11px}
          .mfg-fg{display:flex;flex-direction:column;gap:4px}
          .mfg-fg.full{grid-column:1/-1}
          .mfg-fg label{font-size:12px;font-weight:500;color:${txt}}
          .mfg-fg input,.mfg-fg textarea,.mfg-fg select{padding:10px 12px;border:1px solid rgba(120,53,15,.14);border-radius:6px;font-size:13px;font-family:inherit;color:${txt};background:rgba(255,255,255,.55);transition:border-color .2s}
          .mfg-fg input:focus,.mfg-fg textarea:focus,.mfg-fg select:focus{outline:none;border-color:${ac};box-shadow:0 0 0 3px rgba(120,53,15,.10)}
          .mfg-co{display:flex;gap:8px;align-items:flex-start}
          .mfg-co input{margin-top:3px;width:14px;height:14px}
          .mfg-co label{font-size:11px;color:${txt2};line-height:1.5}.mfg-co a{color:${txt}}
          .mfg-sub{width:100%;padding:13px;background:${ac};border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(120,53,15,.25)}
          .mfg-sub:hover{background:${txt};transform:translateY(-2px)}
          .mfg-fq{padding:72px 40px;background:rgba(253,246,238,.55);border-top:1px solid rgba(120,53,15,.08);position:relative;z-index:1}
          .mfg-fq h2{font-size:42px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,#b45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .mfg-fq-sub{font-size:15px;color:${txt2};margin:0 0 32px}
          .mfg-fql{display:flex;flex-direction:column;gap:9px}
          .mfg-fi{background:linear-gradient(135deg,rgba(253,246,238,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,244,232,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(120,53,15,.05);transition:border-color .2s}
          .mfg-fi.open{border-color:rgba(120,53,15,.28)}.mfg-fi.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,${ac},#b45309);border-radius:3px 3px 0 0}
          .mfg-fqb{width:100%;background:none;border:none;padding:18px 18px 18px 52px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:12px;font-family:inherit;position:relative}
          .mfg-fqn{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:rgba(120,53,15,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:5px}
          .mfg-fi.open .mfg-fqn{background:${ac};color:#fff}
          .mfg-fqb span{font-size:14px;font-weight:600;color:${txt};line-height:1.4}.mfg-fi.open .mfg-fqb span{color:${ac}}
          .mfg-fch{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform .3s}.mfg-fi.open .mfg-fch{transform:rotate(180deg);color:${ac}}
          .mfg-faw{overflow:hidden;transition:max-height .35s ease;max-height:0}.mfg-fi.open .mfg-faw{max-height:400px}
          .mfg-fa{padding:0 18px 18px 52px;font-size:14px;color:#4b5563;line-height:1.8}
          .mfg-rel{padding:64px 40px;background:rgba(253,246,238,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .mfg-ri{max-width:1300px;margin:0 auto;text-align:center}
          .mfg-ri h2{font-size:30px;font-weight:900;background:linear-gradient(90deg,${txt} 0%,#b45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 10px}
          .mfg-ri hr{border:none;border-top:1px solid rgba(120,53,15,.10);margin:24px 0}
          .mfg-rts{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
          .mfg-rt{display:inline-block;padding:9px 18px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all .22s}
          .mfg-rt:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.08)}
          .mfg-ra{background:rgba(120,53,15,.09);border-color:rgba(120,53,15,.28);color:#78350f}
          .mfg-rb{background:rgba(22,101,52,.09);border-color:rgba(22,101,52,.28);color:#14532d}
          .mfg-rc{background:rgba(12,74,110,.09);border-color:rgba(12,74,110,.28);color:#0c4a6e}
          .mfg-rd{background:rgba(124,45,18,.09);border-color:rgba(124,45,18,.28);color:#7c2d12}
          @media(max-width:1024px){.mfg-hero h1,.mfg-sh,.mfg-fq h2{font-size:34px}.mfg-sk-g{grid-template-columns:repeat(2,1fr)}.mfg-tec-g{grid-template-columns:repeat(2,1fr)}.mfg-en-g{grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto}.mfg-en.feat{transform:none}.mfg-en.feat.mfg-ev{transform:none}.mfg-en.feat.mfg-ev:hover{transform:translateY(-4px)}.mfg-wy-g{grid-template-columns:repeat(2,1fr)}.mfg-tg2{grid-template-columns:1fr}.mfg-ct-g{grid-template-columns:1fr}}
          @media(max-width:768px){.mfg-bc,.mfg-hero,.mfg-sec,.mfg-ct,.mfg-fq,.mfg-rel{padding-left:20px;padding-right:20px}.mfg-hero{padding-top:28px;padding-bottom:16px}.mfg-hero h1{font-size:26px}.mfg-stats{grid-template-columns:1fr 1fr}.mfg-sc:nth-child(2){border-right:none}.mfg-sc:nth-child(3),.mfg-sc:nth-child(4){border-top:1px solid rgba(120,53,15,.10)}.mfg-sc:nth-child(4){border-right:none}.mfg-sk-g,.mfg-tec-g,.mfg-wy-g{grid-template-columns:1fr}.mfg-fr{grid-template-columns:1fr}.mfg-cth{font-size:26px}}
        `}</style>
      </Head>
      <div className="mfg-page">
        <div className="mfg-orb mfg-o1" /><div className="mfg-orb mfg-o2" /><div className="mfg-orb mfg-o3" />
        <nav className="mfg-bc" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList"><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li><li><span>Industries</span></li><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">Manufacturing Software</span><meta itemProp="position" content="3" /></li></ol></nav>
        <section className="mfg-hero">
          <span className="mfg-ey">Manufacturing Industry</span>
          <h1>Manufacturing Software Development — MES, IIoT, ERP Integration & QMS</h1>
          <p className="mfg-desc">Custom manufacturing technology for plant managers, IT leaders, and operations teams — Manufacturing Execution Systems (MES), ERP integration (SAP, Oracle, Dynamics), IIoT factory monitoring, predictive maintenance, QMS, supply chain visibility, and OEE analytics. 90+ manufacturing projects. 15+ years.</p>
          <div className="mfg-tr">{['MES Development','IIoT & Industry 4.0','ERP Integration (SAP/Oracle)','Quality Management (QMS)','Predictive Maintenance'].map(b => (<div className="mfg-badge" key={b}><span className="mfg-dot" />{b}</div>))}</div>
          <div className="mfg-ctas"><Link href="#contact" className="mfg-p">Discuss Your Manufacturing Project</Link><Link href="#solutions" className="mfg-g">View Solutions →</Link></div>
        </section>
        <div className="mfg-stats" ref={stR}>{[['90+','Manufacturing Projects'],['15+','Years Dev Experience'],['38%','Avg Unplanned Downtime Reduction'],['99.9%','Platform Uptime SLA']].map(([v, l]) => <StatItem key={l} label={l} val={v} started={ss} />)}</div>
        <section id="solutions" className="mfg-sec"><div className="mfg-in"><div className={`mfg-rv${vis.has('sk') ? ' mfg-ok' : ''}`} ref={el => { secR.current['sk'] = el; }}><span className="mfg-sey">Manufacturing Technology Solutions</span><h2 className="mfg-sh">What We Build for Manufacturing</h2><p className="mfg-sd">MES, ERP integration, production scheduling, QMS, IIoT monitoring, predictive maintenance, supply chain visibility, traceability, digital work instructions, and OEE analytics.</p></div><div className="mfg-sk-g" ref={skR}>{visS.map((s, i) => (<div key={s.n} className={`mfg-card${s.feat ? ' feat' : ''}${vSk.includes(i) ? ' mfg-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="mfg-cn">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>{SOLUTIONS.length > 6 && <div className="mfg-sm"><button className="mfg-bm" onClick={() => setShowAll(p => !p)}>{showAll ? 'Show fewer ↑' : `Show all ${SOLUTIONS.length} solutions ↓`}</button></div>}</div></section>
        <section className="mfg-sec mfg-sec-alt"><div className="mfg-in"><div className={`mfg-rv${vis.has('stk') ? ' mfg-ok' : ''}`} ref={el => { secR.current['stk'] = el; }}><span className="mfg-sey">Technology Stack</span><h2 className="mfg-sh">Manufacturing Technology We Work With</h2><p className="mfg-sd">OPC-UA, MQTT, Node.js, Python, SAP BAPI, Oracle REST, Dynamics 365 API, InfluxDB, AWS IoT, and the full industrial connectivity ecosystem.</p></div><div className="mfg-tec-g" ref={stGr}>{TECH_STACK.map((g, i) => (<div key={g.group} className={`mfg-tc2${vSt.includes(i) ? ' mfg-sv2' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="mfg-tg" style={{ color: g.color, borderBottomColor: g.color + '33' }}>{g.group}</div><div className="mfg-pills">{g.items.map(it => <span key={it} className="mfg-pill" style={{ color: g.color, background: g.color + '12', borderColor: g.color + '30' }}>{it}</span>)}</div></div>))}</div></div></section>
        <section className="mfg-sec"><div className="mfg-in"><div className={`mfg-rv${vis.has('eng') ? ' mfg-ok' : ''}`} ref={el => { secR.current['eng'] = el; }}><span className="mfg-sey">Engagement Models</span><h2 className="mfg-sh">How We Work with Manufacturers</h2><p className="mfg-sd">Custom MES build, IIoT/predictive maintenance platform, or ERP integration sprint — structured for factory environments and phased production rollouts.</p></div><div className="mfg-en-g" ref={enR}>{ENGAGEMENT.map((m, i) => (<div key={m.id} className={`mfg-en${m.feat ? ' feat' : ''}${vEn.includes(i) ? ' mfg-ev' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><span className="mfg-en-b" style={{ color: m.bc, borderColor: m.bc + '44', background: m.bc + '14' }}>{m.badge}</span><div className="mfg-en-i"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={m.feat ? '#D97706' : ac} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg></div><div className="mfg-en-n">{m.name}</div><div className="mfg-en-h">{m.headline}</div><div className="mfg-en-d">{m.desc}</div><div className="mfg-en-ll">Best for</div><ul className="mfg-en-li">{m.best.map(b => <li key={b}>{b}</li>)}</ul><span className="mfg-en-tl">{m.tl}</span><Link href="#contact" className="mfg-en-a">Get a free estimate →</Link></div>))}</div></div></section>
        <section className="mfg-sec mfg-sec-alt"><div className="mfg-in"><div className={`mfg-rv${vis.has('ts') ? ' mfg-ok' : ''}`} ref={el => { secR.current['ts'] = el; }}><span className="mfg-sey">Client Outcomes</span><h2 className="mfg-sh">Manufacturing Technology Clients</h2><p className="mfg-sd">Plant directors, operations leaders, and quality managers on building manufacturing technology with 1Solutions.</p></div><div className="mfg-tg2" ref={teR}>{TESTIMONIALS.map((t, i) => (<div key={i} className={`mfg-tc${t.feat ? ' feat' : ''}${vTe.includes(i) ? ' mfg-tv' : ''}`} style={{ transitionDelay: `${i * 90}ms` }} itemScope itemType="https://schema.org/Review"><div className="mfg-stars">★★★★★</div><p className="mfg-ttxt" itemProp="reviewBody">{t.text}</p><div className="mfg-au"><div className="mfg-av" style={{ background: t.bg }}>{t.init}</div><div><div className="mfg-an" itemProp="author">{t.name}</div><div className="mfg-ar">{t.role}</div></div></div></div>))}</div></div></section>
        <section className="mfg-sec"><div className="mfg-in"><div className={`mfg-rv${vis.has('wy') ? ' mfg-ok' : ''}`} ref={el => { secR.current['wy'] = el; }}><span className="mfg-sey">Why 1Solutions</span><h2 className="mfg-sh">Why Manufacturers Choose 1Solutions</h2><p className="mfg-sd">Factory floor protocol expertise, ERP integration depth, OEE improvement focus, regulatory compliance, edge-to-cloud architecture, and phased plant rollout methodology.</p></div><div className="mfg-wy-g" ref={whR}>{WHY.map((c, i) => (<div key={i} className={`mfg-wc${vWh.includes(i) ? ' mfg-wv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="mfg-wd" /><h3>{c.t}</h3><p>{c.d}</p></div>))}</div></div></section>
        <section id="contact" className="mfg-ct"><div className="mfg-ct-g"><div><h2 className="mfg-cth">Build Your Manufacturing Platform</h2><p className="mfg-ctd">Share your manufacturing technology requirements — MES, IIoT, ERP integration, or QMS — and we will respond within 24 hours with a proposal, timeline, and team composition.</p><div className="mfg-ben">{[['✓','Technical proposal within 24–48 hours'],['✓','OPC-UA, SAP, and IIoT specialists on every project'],['✓','NDA signed before any technical discussions'],['✓','90+ manufacturing projects — MES, IIoT, QMS, ERP integration'],['✓','Phased factory rollout, on-premise support, SLA-backed delivery']].map(([ic, tx]) => (<div className="mfg-be" key={tx}><span className="mfg-bi">{ic}</span><p>{tx}</p></div>))}</div></div>
        <div className="mfg-fb"><h3>Tell Us About Your Manufacturing Project</h3><form className="mfg-form" onSubmit={e => e.preventDefault()}><div className="mfg-fr"><div className="mfg-fg"><label>Full Name *</label><input type="text" placeholder="Your name" required /></div><div className="mfg-fg"><label>Work Email *</label><input type="email" placeholder="you@company.com" required /></div></div><div className="mfg-fr"><div className="mfg-fg"><label>Company / Plant</label><input type="text" placeholder="Company name" /></div><div className="mfg-fg"><label>Phone / WhatsApp</label><input type="tel" placeholder="+1 555 000 0000" /></div></div><div className="mfg-fg full"><label>Type of Manufacturing System *</label><select required><option value="">Select...</option><option>Manufacturing Execution System (MES)</option><option>ERP Integration (SAP / Oracle / Dynamics)</option><option>IIoT Factory Monitoring</option><option>Predictive Maintenance</option><option>Quality Management System (QMS)</option><option>Production Planning & Scheduling</option><option>Supply Chain Visibility</option><option>Traceability / Batch Tracking</option><option>Digital Work Instructions</option><option>OEE Analytics Dashboard</option><option>Other</option></select></div><div className="mfg-fg full"><label>Project Description *</label><textarea rows={4} placeholder="Describe your manufacturing software project — industry (automotive, food, pharma, etc.), current systems (ERP, SCADA, PLC types), key challenges, and timeline..." required /></div><div className="mfg-co"><input type="checkbox" required /><label>I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label></div><button type="submit" className="mfg-sub">Get a Manufacturing Software Proposal →</button></form></div></div></section>
        <section className="mfg-fq"><div className="mfg-in" style={{ maxWidth: 840 }}><span className="mfg-sey">FAQ</span><h2>Manufacturing Software — FAQ</h2><p className="mfg-fq-sub">MES, IIoT, ERP integration, predictive maintenance, QMS, traceability, and compliance questions answered.</p><div className="mfg-fql">{FAQS.map((f, i) => (<div key={i} className={`mfg-fi${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="mfg-fqb" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="mfg-fqn">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{f.q}</span><svg className="mfg-fch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="mfg-faw"><div className="mfg-fa" itemProp="text">{f.a}</div></div></div>))}</div></div></section>
        <section className="mfg-rel"><div className="mfg-ri"><span className="mfg-sey">Related Services</span><h2>Related Industry & Technology Services</h2><hr /><div className="mfg-rts">{[['/logistics-software-development-services/','Logistics Software','mfg-rb'],['/retail-ecommerce-software-development/','Retail & eCommerce','mfg-rd'],['/fintech-software-development-company/','FinTech Software','mfg-rc'],['/real-estate-software-development/','Real Estate Software','mfg-rd'],['/travel-and-tourism-software-solutions/','Travel & Tourism','mfg-rc'],['/it-outsourcing-services/','IT Outsourcing','mfg-ra'],['/offshore-development-company/','Offshore Development','mfg-rb'],['/virtual-cto-services/','Virtual CTO','mfg-ra']].map(([hr, lb, cl]) => (<Link key={hr} href={hr} className={`mfg-rt ${cl}`}>{lb}</Link>))}</div></div></section>
      </div>
    </>
  );
}
