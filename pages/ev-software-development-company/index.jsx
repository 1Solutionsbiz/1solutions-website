'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.1solutions.biz/#industries' }, { '@type': 'ListItem', position: 3, name: 'EV Software Development', item: 'https://www.1solutions.biz/ev-software-development-company/' }] },
    { '@type': 'Service', name: 'EV Software Development Company', url: 'https://www.1solutions.biz/ev-software-development-company/', description: '1Solutions builds custom electric vehicle and clean energy software — EV charging station management (OCPP), fleet electrification platforms, EV driver apps, energy management systems, battery analytics, charge network operator software, V2G integration, and EV telematics. 15+ years, 45+ EV and clean energy projects.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '42', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What EV software does 1Solutions develop?', acceptedAnswer: { '@type': 'Answer', text: '1Solutions develops EV charging station management systems (CSMS) with OCPP 1.6 and 2.0.1 compliance, EV fleet management and electrification platforms, EV driver apps (find/reserve/pay for charging), charge network operator back-office software, energy management systems (EMS) for demand response and smart charging, battery health analytics, V2G (vehicle-to-grid) integration, and EV telematics dashboards.' } },
      { '@type': 'Question', name: 'Do you build OCPP-compliant EV charging management software?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — 1Solutions builds OCPP 1.6 and OCPP 2.0.1 compliant charge station management systems (CSMS). This includes charge point registration and firmware management, remote start/stop, real-time status monitoring, load balancing across multiple charge points, RFID and app-based authentication, Plug & Charge (ISO 15118), payment processing, dynamic pricing, and OCPI integration for roaming between charge networks.' } },
    ] },
  ],
};

const SOLUTIONS = [
  { n: '01', title: 'Charge Station Management System (CSMS)', desc: 'OCPP 1.6 and 2.0.1 compliant charge station management — charge point registration and provisioning, real-time status monitoring (Available/Charging/Faulted), remote start/stop and unlock, load balancing (static and dynamic), RFID and app-based authentication, Plug & Charge (ISO 15118), firmware OTA updates, diagnostics, and multi-CPO network management.', feat: true },
  { n: '02', title: 'EV Driver App (Find, Reserve & Pay)', desc: 'Consumer-facing EV charging app — real-time charge point availability map (live status from CSMS), advance reservation, remote session start/stop via QR scan or NFC, live session monitoring (kWh delivered, cost, time), payment processing (card, Apple Pay, wallet credits), charging history, invoice download, favourite locations, and push notifications for session events and nearby availability.' },
  { n: '03', title: 'Fleet Electrification Platform', desc: 'Electric fleet management — EV fleet dashboard (SoC per vehicle, range, charging status, location), intelligent depot charging scheduler (overnight load balancing to avoid demand peaks), route planning with range and charging stop optimisation, driver assignment and trip logging, maintenance scheduling for EVs (tyre rotation, battery health alerts), CO2 reduction reporting, and TCO vs ICE comparison analysis.' },
  { n: '04', title: 'Energy Management System (EMS) & Smart Charging', desc: 'Grid-smart charging platform — real-time grid demand signals integration, dynamic load management across a charging site (avoid demand charges), solar and battery storage integration (optimise self-consumption), time-of-use tariff optimisation (shift charging to off-peak), demand response participation, site energy dashboard, and Modbus/BACnet integration with building energy systems.', feat: true },
  { n: '05', title: 'Charge Network Operator (CNO) Back-Office', desc: 'Multi-tenant back-office for charge network operators — charge point owner and site management, RFID card issuance and management, tariff and pricing management (per kWh, per minute, flat session fee), revenue reporting and settlement, roaming partner management (OCPI), customer support portal with session history, fault alerting and field technician dispatch, and white-label portal for site hosts.' },
  { n: '06', title: 'Battery Health & Analytics Platform', desc: 'Battery intelligence platform — SoC (state-of-charge) and SoH (state-of-health) tracking, degradation curve modelling, cycle count and depth-of-discharge analytics, abnormal cell voltage and temperature alerting, predictive battery replacement scheduling, second-life battery value assessment, and fleet-level battery health comparison dashboard for EV fleet managers and OEM warranty teams.' },
  { n: '07', title: 'V2G / V2B Integration Platform', desc: 'Vehicle-to-grid (V2G) and vehicle-to-building (V2B) software — bidirectional charger communication (CHAdeMO, ISO 15118-2 Annex D), grid dispatch command integration (aggregator API), charge/discharge schedule optimisation, grid service revenue tracking, fleet battery as a virtual power plant (VPP) aggregation, and regulatory reporting for grid ancillary services participation.' },
  { n: '08', title: 'EV Telematics & Connected Vehicle Platform', desc: 'Connected EV telematics — OBD-II and OEM telematics API integration (Tesla, Rivian, Ford Pro, IONITY), real-time SoC, range, location, and speed telemetry, geofence alerts, charging event capture, driver behaviour scoring (regenerative braking, efficiency), trip reporting, and integration with fleet management systems and insurance UBI platforms.' },
  { n: '09', title: 'Charge Point Roaming (OCPI) Integration', desc: 'OCPI 2.2.1 roaming network integration — CPO and eMSP role implementation, location and EVSE data publication, CDR (charge detail record) exchange and settlement, authorisation token roaming, real-time availability push, tariff publication, and integration with roaming hubs (Hubject, Gireve, eMIP) to make your charge points accessible to all major EV driver apps.' },
  { n: '10', title: 'EV Analytics & Reporting Dashboard', desc: 'Operational and business intelligence for EV charging — station utilisation rates, revenue per port and per site, energy consumption (kWh) by period, peak demand analysis, session duration distribution, fault frequency and MTTR, user acquisition and retention for the driver app, CO2 offset reporting (for carbon credit and ESG reporting), and investor-ready KPI dashboards.' },
];

const TECH_STACK = [
  { group: 'EV Protocols', color: '#0a3d2e', items: ['OCPP 1.6 / 2.0.1', 'OCPI 2.2.1', 'ISO 15118 (PnC)', 'OICP / eMIP', 'OSCP (smart charging)', 'Modbus / BACnet (EMS)'] },
  { group: 'Real-Time & IoT', color: '#064e3b', items: ['WebSocket (OCPP)', 'MQTT (telemetry)', 'AWS IoT Core', 'Apache Kafka (events)', 'InfluxDB (time-series)', 'Node-RED (edge)'] },
  { group: 'Frontend & Mobile', color: '#065f46', items: ['React / Next.js', 'React Native', 'Mapbox GL JS', 'Google Maps Platform', 'TypeScript', 'Offline-capable PWA'] },
  { group: 'Backend & API', color: '#0f766e', items: ['Node.js / NestJS', 'Python / FastAPI', 'GraphQL / REST', 'gRPC (microservices)', 'Redis (cache/pub-sub)', 'Celery / BullMQ'] },
  { group: 'Payments & Billing', color: '#0369a1', items: ['Stripe / Braintree', 'In-app wallet', 'RFID entitlements', 'Dynamic pricing engine', 'CDR settlement', 'Revenue recognition'] },
  { group: 'Energy & Grid APIs', color: '#0891b2', items: ['Entsoe-e (EU grid)', 'OpenADR (demand resp)', 'Smart meter APIs', 'Solar PV / BESS APIs', 'EV OEM APIs (Tesla)', 'VPP aggregator APIs'] },
  { group: 'Cloud & DevOps', color: '#dc2626', items: ['AWS / GCP / Azure', 'Kubernetes / EKS', 'Terraform (IaC)', 'GitHub Actions CI/CD', 'Prometheus / Grafana', 'Datadog (observability)'] },
  { group: 'Database & Maps', color: '#b45309', items: ['PostgreSQL / PostGIS', 'InfluxDB (sensor data)', 'MongoDB (docs)', 'Redis (session cache)', 'Elasticsearch (search)', 'Mapbox (charge maps)'] },
];

const ENGAGEMENT = [
  { id: 'csms', name: 'CSMS / Charge Network Platform', badge: 'Most Popular', bc: '#D97706', feat: true, icon: 'M13 10V3L4 14h7v7l9-11h-7z', headline: 'Full charge network from OCPP to driver app.', desc: 'End-to-end charge network platform — OCPP-compliant CSMS, EV driver app, charge network operator back-office, billing, roaming (OCPI), and analytics. Delivered in agile sprints with EV protocol specialists.', best: ['CPOs launching a new EV charging network', 'Property developers deploying workplace or retail charging hubs', 'Utilities building a public fast-charge network', 'Fleet operators deploying depot charging for electric vehicles'], tl: 'Core CSMS live in 10–14 weeks; full platform 5–8 months' },
  { id: 'fleet', name: 'Fleet Electrification Platform', badge: 'Growing Segment', bc: '#0a3d2e', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4', headline: 'Manage an electric fleet from depot to road.', desc: 'Electric fleet management platform — SoC monitoring, route planning with charging stops, intelligent depot charging scheduler, driver app, maintenance scheduling, CO2 reporting, and TCO analysis.', best: ['Last-mile delivery companies transitioning to electric vans', 'Local councils electrifying their own vehicle fleets', 'Car rental companies managing a mixed or EV-only fleet', 'Corporate fleet managers adding EVs to employee car schemes'], tl: 'Fleet management MVP in 8–12 weeks; full platform 4–6 months' },
  { id: 'ems', name: 'Energy Management & Smart Charging', badge: 'High ROI', bc: '#0369a1', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', headline: 'Reduce grid costs and maximise solar use.', desc: 'Energy management system — dynamic load balancing to avoid demand charges, solar and BESS integration, time-of-use tariff optimisation, OpenADR demand response, and grid ancillary services for V2G revenue.', best: ['Charging hubs wanting to avoid expensive peak demand charges', 'Sites with solar PV wanting to maximise self-consumption for charging', 'Fleet operators participating in grid ancillary services with V2G', 'Building energy managers adding EV charging to existing EMS'], tl: 'EMS integration live in 6–10 weeks' },
];

const TESTIMONIALS = [
  { text: "1Solutions built our OCPP 2.0.1 charge station management system and EV driver app from scratch. 300 charge points live across the UK, real-time status monitoring, RFID and app-based authentication, dynamic load balancing, and OCPI roaming integration with major networks. Our driver app reached 40,000 downloads in the first year. Exceptional EV protocol expertise.", name: 'James R.', role: 'CEO, EV Charge Network Operator (UK)', init: 'JR', bg: '#061e17' },
  { text: "We commissioned 1Solutions to build our fleet electrification platform for our 800-van electric delivery fleet. Depot charging scheduler, intelligent overnight load balancing, route planning with charging stops, driver app, and CO2 reporting for our sustainability team. Energy costs for charging reduced by 31% versus unmanaged overnight charging. Brilliant work.", name: 'Sandra L.', role: 'Head of Fleet Operations, Last-Mile Delivery (AU)', init: 'SL', bg: '#0a2d22', feat: true },
  { text: "1Solutions built our energy management system integrating our solar PV, battery storage, and 24 AC charge points. Real-time demand management means we have never triggered a demand charge event since launch. The V2G dispatch module generates additional revenue from grid services during peak demand windows. ROI achieved in under 12 months.", name: 'Kevin H.', role: 'Director of Sustainability, Commercial Property (US)', init: 'KH', bg: '#1e3a5f' },
];

const WHY = [
  { t: '45+ EV & Clean Energy Projects', d: '1Solutions has built CSMS platforms, EV driver apps, fleet electrification software, EMS systems, battery analytics, and OCPI roaming integrations for charge network operators, fleet companies, utilities, and property developers over 15+ years.' },
  { t: 'OCPP & OCPI Protocol Depth', d: 'OCPP 1.6 and 2.0.1 implementation for CSMS, OCPI 2.2.1 for roaming, Plug & Charge (ISO 15118), and OSCP for smart charging — real EV protocol expertise, not generic IoT wrapped in EV terminology.' },
  { t: 'Real-Time WebSocket Architecture', d: 'OCPP requires persistent WebSocket connections between CSMS and every charge point. We build reliable, scalable WebSocket server architectures with automatic reconnection, connection monitoring, and message queue replay for offline charge points.' },
  { t: 'Energy & Grid Integration Knowledge', d: 'OpenADR demand response, solar and BESS API integration, Modbus for building EMS, grid tariff APIs (time-of-use pricing), and VPP aggregator APIs — we understand the energy system context, not just EV charging in isolation.' },
  { t: 'Multi-Tenant CPO Architecture', d: 'Building for charge network operators means multi-tenant architecture with site host portals, CPO back-offices, eMSP driver access, and roaming hub integration — all with proper data isolation and billing attribution.' },
  { t: 'Geospatial & Mapping Capability', d: 'EV driver apps need real-time charge point availability on maps — Mapbox GL JS with live status overlays, route planning with charging stop optimisation, search by connector type and power level, and address/landmark search with proximity results.' },
  { t: 'Fleet Electrification Domain Knowledge', d: 'Depot charging scheduler, range anxiety management (realistic range with weather and load factors), charging stop planning for intercity routes, and CO2 offset calculation (market-based vs location-based) — we understand fleet operator requirements beyond the technology.' },
  { t: 'Post-Launch Operational Support', d: 'EV charging infrastructure is operational technology — faults in the CSMS mean revenue loss and customer dissatisfaction. We provide post-launch monitoring, alerting, and on-call support aligned to the operational nature of charge networks.' },
];

const FAQS = [
  { q: 'What EV software does 1Solutions develop?', a: 'Charge station management systems (CSMS) with OCPP 1.6 and 2.0.1, EV driver apps, fleet electrification platforms, energy management systems, charge network operator back-office, battery health analytics, V2G integration, EV telematics, OCPI roaming, and EV analytics dashboards.' },
  { q: 'Do you build OCPP-compliant EV charging management software?', a: 'Yes — OCPP 1.6 and OCPP 2.0.1 compliant CSMS. Charge point registration, remote start/stop, real-time status monitoring, load balancing, RFID and app-based authentication, Plug & Charge (ISO 15118), firmware OTA updates, and OCPI roaming integration.' },
  { q: 'Can you build an EV driver app for finding and paying for charging?', a: 'Yes — real-time charge point availability map, advance reservation, remote session start/stop (QR or NFC), live session monitoring (kWh, cost, time), payment processing, charging history, invoice download, and push notifications. iOS and Android via React Native.' },
  { q: 'How do you implement smart charging and load balancing?', a: 'Static load management caps the total current draw across a charging site. Dynamic load balancing adjusts individual charge point limits in real time based on total site consumption. We integrate with smart meters or building EMS via Modbus or direct meter APIs and implement OSCP for CSMS-to-DSO communication.' },
  { q: 'Can you integrate OCPI roaming with Hubject or Gireve?', a: 'Yes — OCPI 2.2.1 CPO and eMSP role implementation, location and EVSE data publication, CDR exchange and settlement, authorisation token roaming, and integration with Hubject, Gireve, and eMIP roaming hubs. Your charge points become accessible to all major EV driver networks.' },
  { q: 'Can you build a fleet electrification management platform?', a: 'Yes — EV fleet dashboard (SoC, range, charging status), depot charging scheduler with intelligent load balancing, route planning with charging stops, driver app, maintenance scheduling, CO2 reduction reporting, and TCO analysis vs ICE alternatives.' },
  { q: 'What technology stack do you use for EV software?', a: 'OCPP/OCPI via Node.js/NestJS WebSocket servers. Telematics and IoT via MQTT and InfluxDB. Frontend: React/Next.js and React Native. Maps: Mapbox GL JS. Payments: Stripe. Database: PostgreSQL with PostGIS for geospatial. Cloud: AWS or GCP with Kubernetes.' },
  { q: 'Do you support V2G (vehicle-to-grid) software development?', a: 'Yes — bidirectional charger communication (CHAdeMO, ISO 15118-2), grid dispatch integration (aggregator API), charge/discharge schedule optimisation, grid service revenue tracking, and fleet battery aggregation for virtual power plant (VPP) participation.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => { if (!start) return; const n = parseInt(target.replace(/\D/g, ''), 10); if (!n) return; let t0 = null; const s = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) requestAnimationFrame(s); }; requestAnimationFrame(s); }, [start, target, duration]);
  return count;
}
function StatItem({ label, val, started }) {
  const n = useCountUp(val, 1800, started);
  const sfx = val.replace(/[\d,]/g, '');
  return (<div className="ev-sc"><div className="ev-sv">{started ? n + sfx : val}</div><div className="ev-sl">{label}</div></div>);
}

export default function EVSoftware() {
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
  const ac = '#0a3d2e'; const ac2 = '#065f46'; const txt = '#052018'; const txt2 = '#064e3b';
  return (
    <>
      <Head>
        <title>EV Software Development Company | OCPP Charging, Fleet Electrification, EMS | 1Solutions</title>
        <meta name="description" content="Custom EV software development — OCPP-compliant charge station management (CSMS), EV driver apps, fleet electrification platforms, energy management systems, battery analytics, V2G, and OCPI roaming. 45+ EV projects. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/ev-software-development-company/" />
        <meta property="og:title" content="EV Software Development Company | OCPP, Fleet EV, Energy Management | 1Solutions" />
        <meta property="og:description" content="OCPP-compliant CSMS, EV driver apps, fleet electrification, energy management systems, battery analytics, and V2G integration. 45+ EV and clean energy projects." />
        <meta property="og:url" content="https://www.1solutions.biz/ev-software-development-company/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .ev-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#ecfdf5 0%,#d1fae5 20%,#ecfdf5 50%,#fef9c3 75%,#eff6ff 100%);color:${txt};line-height:1.6;position:relative;overflow-x:hidden}
          .ev-page *,.ev-page *::before,.ev-page *::after{box-sizing:border-box}
          .ev-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .ev-o1{width:800px;height:800px;background:radial-gradient(circle,rgba(10,61,46,.16) 0%,transparent 70%);top:-220px;right:-200px}
          .ev-o2{width:700px;height:700px;background:radial-gradient(circle,rgba(3,105,161,.12) 0%,transparent 70%);bottom:0;left:-200px}
          .ev-o3{width:480px;height:480px;background:radial-gradient(circle,rgba(217,119,6,.08) 0%,transparent 70%);top:42%;left:-90px}
          .ev-bc{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .ev-bc ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:${ac2}}
          .ev-bc li{display:flex;align-items:center;gap:6px}.ev-bc li::after{content:'/';opacity:.45}.ev-bc li:last-child::after{display:none}
          .ev-bc a{color:${txt};text-decoration:none}
          .ev-hero{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto;padding:44px 40px 28px}
          .ev-ey{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${ac2};margin-bottom:14px}
          .ev-hero h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .ev-desc{font-size:16px;color:${txt2};line-height:1.65;max-width:720px;margin:0 auto 22px}
          .ev-tr{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-bottom:24px}
          .ev-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:5px 13px;font-size:12px;font-weight:600;color:${txt};box-shadow:0 2px 8px rgba(10,61,46,.07)}
          .ev-dot{width:7px;height:7px;border-radius:50%;background:${ac2};flex-shrink:0}
          .ev-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .ev-p{display:inline-block;padding:13px 34px;background:${ac};color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(10,61,46,.28)}
          .ev-p:hover{background:${txt};transform:translateY(-2px)}
          .ev-g{display:inline-block;padding:13px 34px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:${txt};font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .ev-g:hover{background:rgba(255,255,255,.85);border-color:rgba(10,61,46,.5);transform:translateY(-2px)}
          .ev-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:920px;margin:26px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(10,61,46,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .ev-sc{padding:18px 16px;text-align:center;border-right:1px solid rgba(10,61,46,.10)}.ev-sc:last-child{border-right:none}
          .ev-sv{font-size:28px;font-weight:900;color:${ac2};letter-spacing:-.5px;line-height:1}
          .ev-sl{font-size:11px;color:${txt2};font-weight:500;margin-top:5px}
          .ev-sec{padding:72px 40px;position:relative;z-index:1}
          .ev-sec-alt{background:rgba(236,253,245,.55);border-top:1px solid rgba(10,61,46,.08);border-bottom:1px solid rgba(10,61,46,.08)}
          .ev-in{max-width:1300px;margin:0 auto}
          .ev-sey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .ev-sh{font-size:44px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .ev-sd{font-size:15px;color:${txt2};line-height:1.7;max-width:700px}
          .ev-rv{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .ev-rv.ev-ok{opacity:1;transform:translateY(0)}
          .ev-sk-g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
          .ev-card{background:linear-gradient(135deg,rgba(236,253,245,.55) 0%,rgba(255,255,255,.88) 55%,rgba(239,246,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(10,61,46,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),border-color .2s}
          .ev-card.ev-cv{opacity:1;transform:translateY(0)}.ev-card.ev-cv:hover{transform:translateY(-5px);border-color:rgba(10,61,46,.25);box-shadow:0 14px 40px rgba(10,61,46,.12)}
          .ev-card.feat{border-color:rgba(10,61,46,.18)}
          .ev-cn{position:absolute;top:6px;right:12px;font-size:68px;font-weight:900;line-height:1;color:${ac2};opacity:.05;pointer-events:none;user-select:none}
          .ev-card h3{font-size:15px;font-weight:700;color:${txt};margin:0 0 7px;position:relative;z-index:1}
          .ev-card p{font-size:13px;color:${txt2};line-height:1.65;margin:0;position:relative;z-index:1}
          .ev-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,${ac},${ac2});border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top;transition:transform .3s}
          .ev-card.ev-cv:hover::before{transform:scaleY(1)}
          .ev-sm{text-align:center;margin-top:20px}
          .ev-bm{display:inline-block;background:#fff;border:1.5px solid rgba(10,61,46,.18);color:${txt};padding:9px 28px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .ev-bm:hover{background:${ac};border-color:${ac};color:#fff;transform:translateY(-2px)}
          .ev-tec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
          .ev-tc2{background:linear-gradient(135deg,rgba(236,253,245,.55) 0%,rgba(255,255,255,.88) 55%,rgba(239,246,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:20px 18px;box-shadow:0 4px 24px rgba(10,61,46,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .ev-tc2.ev-sv2{opacity:1;transform:translateY(0)}.ev-tc2.ev-sv2:hover{border-color:rgba(10,61,46,.22);box-shadow:0 12px 36px rgba(10,61,46,.10)}
          .ev-tg{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:10px;padding-bottom:7px;border-bottom:2px solid}
          .ev-pills{display:flex;flex-wrap:wrap;gap:5px}
          .ev-pill{display:inline-block;font-size:11px;font-weight:500;padding:3px 9px;border-radius:100px;border:1px solid}
          .ev-en-g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
          .ev-en{background:linear-gradient(135deg,rgba(236,253,245,.55) 0%,rgba(255,255,255,.88) 55%,rgba(239,246,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(10,61,46,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1),border-color .2s}
          .ev-en.ev-ev2{opacity:1;transform:translateY(0)}.ev-en.ev-ev2:hover{border-color:rgba(10,61,46,.22);box-shadow:0 14px 44px rgba(10,61,46,.12)}
          .ev-en.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(236,253,245,.45) 100%);border-color:rgba(217,119,6,.26);transform:translateY(-6px)}
          .ev-en.feat.ev-ev2{transform:translateY(-6px)}.ev-en.feat.ev-ev2:hover{transform:translateY(-10px)}
          .ev-en-b{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:4px 11px;border-radius:100px;border:1px solid;margin-bottom:16px}
          .ev-en-i{width:44px;height:44px;background:rgba(10,61,46,.08);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
          .ev-en.feat .ev-en-i{background:rgba(217,119,6,.10)}
          .ev-en-n{font-size:20px;font-weight:900;color:${txt};margin:0 0 5px;letter-spacing:-.3px}
          .ev-en-h{font-size:13px;font-weight:600;color:${ac2};margin-bottom:10px}
          .ev-en.feat .ev-en-h{color:#D97706}
          .ev-en-d{font-size:13px;color:${txt2};line-height:1.7;margin-bottom:14px}
          .ev-en-ll{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${ac2};margin-bottom:7px}
          .ev-en-li{list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:6px}
          .ev-en-li li{display:flex;align-items:flex-start;gap:7px;font-size:13px;color:#374151;line-height:1.5}
          .ev-en-li li::before{content:'✓';font-weight:800;color:${ac2};flex-shrink:0;margin-top:1px}
          .ev-en.feat .ev-en-li li::before{color:#D97706}
          .ev-en-tl{font-size:11px;font-weight:600;color:#D97706;display:block;padding-top:10px;border-top:1px solid rgba(10,61,46,.08)}
          .ev-en-a{display:block;margin-top:14px;padding:10px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(10,61,46,.09);color:${txt};border:1.5px solid rgba(10,61,46,.18)}
          .ev-en-a:hover{background:${txt};color:#fff}
          .ev-en.feat .ev-en-a{background:${ac};color:#fff;border-color:${ac}}
          .ev-en.feat .ev-en-a:hover{background:${txt};border-color:${txt}}
          .ev-tg2{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
          .ev-tc{background:linear-gradient(135deg,rgba(236,253,245,.55) 0%,rgba(255,255,255,.88) 55%,rgba(239,246,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:26px 22px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 24px rgba(10,61,46,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
          .ev-tc.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(236,253,245,.42) 100%);border-color:rgba(217,119,6,.20)}
          .ev-tc.ev-tv{opacity:1;transform:translateY(0)}.ev-tc.ev-tv:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(10,61,46,.12)}
          .ev-stars{font-size:15px;color:#D97706;letter-spacing:2px}
          .ev-ttxt{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .ev-au{display:flex;align-items:center;gap:11px}
          .ev-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .ev-an{font-size:14px;font-weight:700;color:${txt}}
          .ev-ar{font-size:12px;color:#6b7280}
          .ev-wy-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px}
          .ev-wc{background:linear-gradient(135deg,rgba(236,253,245,.55) 0%,rgba(255,255,255,.88) 55%,rgba(239,246,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:22px 18px;box-shadow:0 4px 24px rgba(10,61,46,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px) scale(.97);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .ev-wc.ev-wv{opacity:1;transform:translateY(0) scale(1)}.ev-wc.ev-wv:hover{transform:translateY(-4px) scale(1);border-color:rgba(10,61,46,.22);box-shadow:0 12px 36px rgba(10,61,46,.10)}
          .ev-wd{width:9px;height:9px;border-radius:50%;background:${ac2};margin-bottom:10px}
          .ev-wc h3{font-size:13px;font-weight:700;color:${txt};margin:0 0 7px;line-height:1.35}
          .ev-wc p{font-size:12px;color:${txt2};line-height:1.6;margin:0}
          .ev-ct{padding:64px 40px;background:linear-gradient(135deg,rgba(236,253,245,.55) 0%,rgba(255,255,255,.60) 40%,rgba(239,246,255,.50) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .ev-ct-g{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;gap:28px;align-items:start}
          .ev-cth{font-size:38px;font-weight:900;line-height:1.18;margin:0 0 12px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .ev-ctd{font-size:14px;color:${txt2};line-height:1.6;margin:0 0 18px}
          .ev-ben{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px}
          .ev-be{display:flex;gap:9px;align-items:flex-start}
          .ev-bi{flex-shrink:0;color:${ac2};font-weight:800;font-size:15px;margin-top:1px}
          .ev-be p{font-size:13px;color:${txt2};margin:0;line-height:1.5}
          .ev-fb{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(236,253,245,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:18px;padding:30px;box-shadow:0 8px 40px rgba(10,61,46,.08),inset 0 1px 0 rgba(255,255,255,1)}
          .ev-fb h3{font-size:20px;font-weight:700;color:${txt};margin:0 0 20px}
          .ev-form{display:flex;flex-direction:column;gap:12px}
          .ev-fr{display:grid;grid-template-columns:1fr 1fr;gap:11px}
          .ev-fg{display:flex;flex-direction:column;gap:4px}
          .ev-fg.full{grid-column:1/-1}
          .ev-fg label{font-size:12px;font-weight:500;color:${txt}}
          .ev-fg input,.ev-fg textarea,.ev-fg select{padding:10px 12px;border:1px solid rgba(10,61,46,.14);border-radius:6px;font-size:13px;font-family:inherit;color:${txt};background:rgba(255,255,255,.55);transition:border-color .2s}
          .ev-fg input:focus,.ev-fg textarea:focus,.ev-fg select:focus{outline:none;border-color:${ac2};box-shadow:0 0 0 3px rgba(6,95,70,.10)}
          .ev-co{display:flex;gap:8px;align-items:flex-start}
          .ev-co input{margin-top:3px;width:14px;height:14px}
          .ev-co label{font-size:11px;color:${txt2};line-height:1.5}.ev-co a{color:${txt}}
          .ev-sub{width:100%;padding:13px;background:${ac};border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(10,61,46,.25)}
          .ev-sub:hover{background:${txt};transform:translateY(-2px)}
          .ev-fq{padding:72px 40px;background:rgba(236,253,245,.55);border-top:1px solid rgba(10,61,46,.08);position:relative;z-index:1}
          .ev-fq h2{font-size:42px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .ev-fq-sub{font-size:15px;color:${txt2};margin:0 0 32px}
          .ev-fql{display:flex;flex-direction:column;gap:9px}
          .ev-fi{background:linear-gradient(135deg,rgba(236,253,245,.55) 0%,rgba(255,255,255,.88) 55%,rgba(239,246,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(10,61,46,.05);transition:border-color .2s}
          .ev-fi.open{border-color:rgba(10,61,46,.28)}.ev-fi.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,${ac},${ac2});border-radius:3px 3px 0 0}
          .ev-fqb{width:100%;background:none;border:none;padding:18px 18px 18px 52px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:12px;font-family:inherit;position:relative}
          .ev-fqn{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:rgba(10,61,46,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:5px}
          .ev-fi.open .ev-fqn{background:${ac};color:#fff}
          .ev-fqb span{font-size:14px;font-weight:600;color:${txt};line-height:1.4}.ev-fi.open .ev-fqb span{color:${ac2}}
          .ev-fch{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform .3s}.ev-fi.open .ev-fch{transform:rotate(180deg);color:${ac2}}
          .ev-faw{overflow:hidden;transition:max-height .35s ease;max-height:0}.ev-fi.open .ev-faw{max-height:400px}
          .ev-fa{padding:0 18px 18px 52px;font-size:14px;color:#4b5563;line-height:1.8}
          .ev-rel{padding:64px 40px;background:rgba(236,253,245,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .ev-ri{max-width:1300px;margin:0 auto;text-align:center}
          .ev-ri h2{font-size:30px;font-weight:900;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 10px}
          .ev-ri hr{border:none;border-top:1px solid rgba(10,61,46,.10);margin:24px 0}
          .ev-rts{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
          .ev-rt{display:inline-block;padding:9px 18px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all .22s}
          .ev-rt:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.08)}
          .ev-ra{background:rgba(10,61,46,.09);border-color:rgba(10,61,46,.28);color:#0a3d2e}
          .ev-rb{background:rgba(12,74,110,.09);border-color:rgba(12,74,110,.28);color:#0c4a6e}
          .ev-rc{background:rgba(120,53,15,.09);border-color:rgba(120,53,15,.28);color:#78350f}
          .ev-rd{background:rgba(45,27,105,.09);border-color:rgba(45,27,105,.28);color:#2d1b69}
          @media(max-width:1024px){.ev-hero h1,.ev-sh,.ev-fq h2{font-size:34px}.ev-sk-g{grid-template-columns:repeat(2,1fr)}.ev-tec-g{grid-template-columns:repeat(2,1fr)}.ev-en-g{grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto}.ev-en.feat{transform:none}.ev-en.feat.ev-ev2{transform:none}.ev-en.feat.ev-ev2:hover{transform:translateY(-4px)}.ev-wy-g{grid-template-columns:repeat(2,1fr)}.ev-tg2{grid-template-columns:1fr}.ev-ct-g{grid-template-columns:1fr}}
          @media(max-width:768px){.ev-bc,.ev-hero,.ev-sec,.ev-ct,.ev-fq,.ev-rel{padding-left:20px;padding-right:20px}.ev-hero{padding-top:28px;padding-bottom:16px}.ev-hero h1{font-size:26px}.ev-stats{grid-template-columns:1fr 1fr}.ev-sc:nth-child(2){border-right:none}.ev-sc:nth-child(3),.ev-sc:nth-child(4){border-top:1px solid rgba(10,61,46,.10)}.ev-sc:nth-child(4){border-right:none}.ev-sk-g,.ev-tec-g,.ev-wy-g{grid-template-columns:1fr}.ev-fr{grid-template-columns:1fr}.ev-cth{font-size:26px}}
        `}</style>
      </Head>
      <div className="ev-page">
        <div className="ev-orb ev-o1" /><div className="ev-orb ev-o2" /><div className="ev-orb ev-o3" />
        <nav className="ev-bc" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList"><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li><li><span>Industries</span></li><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">EV Software Development</span><meta itemProp="position" content="3" /></li></ol></nav>
        <section className="ev-hero">
          <span className="ev-ey">Electric Vehicle Industry</span>
          <h1>EV Software Development Company — OCPP Charging, Fleet Electrification & Energy Management</h1>
          <p className="ev-desc">Custom electric vehicle and clean energy software — OCPP 1.6 and 2.0.1 charge station management, EV driver apps, fleet electrification platforms, energy management systems, battery analytics, V2G integration, and OCPI roaming. 45+ EV projects. 15+ years.</p>
          <div className="ev-tr">{['OCPP 1.6 & 2.0.1 CSMS','EV Driver App','Fleet Electrification','Energy Management','V2G Integration'].map(b => (<div className="ev-badge" key={b}><span className="ev-dot" />{b}</div>))}</div>
          <div className="ev-ctas"><Link href="#contact" className="ev-p">Discuss Your EV Project</Link><Link href="#solutions" className="ev-g">View Solutions →</Link></div>
        </section>
        <div className="ev-stats" ref={stR}>{[['45+','EV & Clean Energy Projects'],['15+','Years Dev Experience'],['31%','Avg Charging Cost Reduction'],['99.9%','Platform Uptime SLA']].map(([v, l]) => <StatItem key={l} label={l} val={v} started={ss} />)}</div>
        <section id="solutions" className="ev-sec"><div className="ev-in"><div className={`ev-rv${vis.has('sk') ? ' ev-ok' : ''}`} ref={el => { secR.current['sk'] = el; }}><span className="ev-sey">EV Solutions</span><h2 className="ev-sh">What We Build for EV & Clean Energy</h2><p className="ev-sd">CSMS, EV driver apps, fleet electrification, energy management, charge network operator back-office, battery analytics, V2G, EV telematics, OCPI roaming, and EV analytics dashboards.</p></div><div className="ev-sk-g" ref={skR}>{visS.map((s, i) => (<div key={s.n} className={`ev-card${s.feat ? ' feat' : ''}${vSk.includes(i) ? ' ev-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="ev-cn">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>{SOLUTIONS.length > 6 && <div className="ev-sm"><button className="ev-bm" onClick={() => setShowAll(p => !p)}>{showAll ? 'Show fewer ↑' : `Show all ${SOLUTIONS.length} solutions ↓`}</button></div>}</div></section>
        <section className="ev-sec ev-sec-alt"><div className="ev-in"><div className={`ev-rv${vis.has('stk') ? ' ev-ok' : ''}`} ref={el => { secR.current['stk'] = el; }}><span className="ev-sey">Technology Stack</span><h2 className="ev-sh">EV Technology We Use</h2><p className="ev-sd">OCPP/OCPI protocols, WebSocket CSMS architecture, IoT telemetry, React Native EV apps, Mapbox for charge maps, and the full clean energy tech stack.</p></div><div className="ev-tec-g" ref={stGr}>{TECH_STACK.map((g, i) => (<div key={g.group} className={`ev-tc2${vSt.includes(i) ? ' ev-sv2' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="ev-tg" style={{ color: g.color, borderBottomColor: g.color + '33' }}>{g.group}</div><div className="ev-pills">{g.items.map(it => <span key={it} className="ev-pill" style={{ color: g.color, background: g.color + '12', borderColor: g.color + '30' }}>{it}</span>)}</div></div>))}</div></div></section>
        <section className="ev-sec"><div className="ev-in"><div className={`ev-rv${vis.has('eng') ? ' ev-ok' : ''}`} ref={el => { secR.current['eng'] = el; }}><span className="ev-sey">Engagement Models</span><h2 className="ev-sh">How We Work with EV Companies</h2><p className="ev-sd">Full charge network platform, electric fleet management, or energy management system — structured for the operational nature of EV infrastructure.</p></div><div className="ev-en-g" ref={enR}>{ENGAGEMENT.map((m, i) => (<div key={m.id} className={`ev-en${m.feat ? ' feat' : ''}${vEn.includes(i) ? ' ev-ev2' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><span className="ev-en-b" style={{ color: m.bc, borderColor: m.bc + '44', background: m.bc + '14' }}>{m.badge}</span><div className="ev-en-i"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={m.feat ? '#D97706' : ac2} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg></div><div className="ev-en-n">{m.name}</div><div className="ev-en-h">{m.headline}</div><div className="ev-en-d">{m.desc}</div><div className="ev-en-ll">Best for</div><ul className="ev-en-li">{m.best.map(b => <li key={b}>{b}</li>)}</ul><span className="ev-en-tl">{m.tl}</span><Link href="#contact" className="ev-en-a">Get a free estimate →</Link></div>))}</div></div></section>
        <section className="ev-sec ev-sec-alt"><div className="ev-in"><div className={`ev-rv${vis.has('ts') ? ' ev-ok' : ''}`} ref={el => { secR.current['ts'] = el; }}><span className="ev-sey">Client Outcomes</span><h2 className="ev-sh">EV Clients</h2><p className="ev-sd">Charge network operators, fleet companies, and property developers on building EV software with 1Solutions.</p></div><div className="ev-tg2" ref={teR}>{TESTIMONIALS.map((t, i) => (<div key={i} className={`ev-tc${t.feat ? ' feat' : ''}${vTe.includes(i) ? ' ev-tv' : ''}`} style={{ transitionDelay: `${i * 90}ms` }} itemScope itemType="https://schema.org/Review"><div className="ev-stars">★★★★★</div><p className="ev-ttxt" itemProp="reviewBody">{t.text}</p><div className="ev-au"><div className="ev-av" style={{ background: t.bg }}>{t.init}</div><div><div className="ev-an" itemProp="author">{t.name}</div><div className="ev-ar">{t.role}</div></div></div></div>))}</div></div></section>
        <section className="ev-sec"><div className="ev-in"><div className={`ev-rv${vis.has('wy') ? ' ev-ok' : ''}`} ref={el => { secR.current['wy'] = el; }}><span className="ev-sey">Why 1Solutions</span><h2 className="ev-sh">Why EV Companies Choose 1Solutions</h2><p className="ev-sd">OCPP/OCPI protocol depth, real-time WebSocket architecture, energy system integration, multi-tenant CPO architecture, geospatial capability, and operational post-launch support.</p></div><div className="ev-wy-g" ref={whR}>{WHY.map((c, i) => (<div key={i} className={`ev-wc${vWh.includes(i) ? ' ev-wv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="ev-wd" /><h3>{c.t}</h3><p>{c.d}</p></div>))}</div></div></section>
        <section id="contact" className="ev-ct"><div className="ev-ct-g"><div><h2 className="ev-cth">Build Your EV Software Platform</h2><p className="ev-ctd">Share your EV software requirements and we will respond within 24 hours with a proposal, architecture recommendation, and team composition.</p><div className="ev-ben">{[['✓','Technical proposal within 24–48 hours'],['✓','OCPP, OCPI, and EV fleet specialists'],['✓','NDA signed before any technical discussions'],['✓','45+ EV projects — CSMS, fleet, EMS, V2G'],['✓','Operationally-ready, SLA-backed delivery']].map(([ic, tx]) => (<div className="ev-be" key={tx}><span className="ev-bi">{ic}</span><p>{tx}</p></div>))}</div></div>
        <div className="ev-fb"><h3>Tell Us About Your EV Project</h3><form className="ev-form" onSubmit={e => e.preventDefault()}><div className="ev-fr"><div className="ev-fg"><label>Full Name *</label><input type="text" placeholder="Your name" required /></div><div className="ev-fg"><label>Work Email *</label><input type="email" placeholder="you@company.com" required /></div></div><div className="ev-fr"><div className="ev-fg"><label>Company</label><input type="text" placeholder="Company name" /></div><div className="ev-fg"><label>Phone / WhatsApp</label><input type="tel" placeholder="+1 555 000 0000" /></div></div><div className="ev-fg full"><label>Type of EV Platform *</label><select required><option value="">Select...</option><option>Charge Station Management System (CSMS)</option><option>EV Driver App</option><option>Fleet Electrification Platform</option><option>Energy Management System (EMS)</option><option>Charge Network Operator Back-Office</option><option>Battery Health & Analytics</option><option>V2G / V2B Integration</option><option>EV Telematics Platform</option><option>OCPI Roaming Integration</option><option>EV Analytics Dashboard</option><option>Other</option></select></div><div className="ev-fg full"><label>Project Description *</label><textarea rows={4} placeholder="Describe your EV software project — type of platform, number of charge points or vehicles, current systems, OCPP version required, and go-live timeline..." required /></div><div className="ev-co"><input type="checkbox" required /><label>I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label></div><button type="submit" className="ev-sub">Get an EV Software Proposal →</button></form></div></div></section>
        <section className="ev-fq"><div className="ev-in" style={{ maxWidth: 840 }}><span className="ev-sey">FAQ</span><h2>EV Software — FAQ</h2><p className="ev-fq-sub">OCPP, CSMS, fleet electrification, smart charging, and V2G questions answered.</p><div className="ev-fql">{FAQS.map((f, i) => (<div key={i} className={`ev-fi${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="ev-fqb" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="ev-fqn">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{f.q}</span><svg className="ev-fch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="ev-faw"><div className="ev-fa" itemProp="text">{f.a}</div></div></div>))}</div></div></section>
        <section className="ev-rel"><div className="ev-ri"><span className="ev-sey">Related Services</span><h2>Related Industry & Technology Services</h2><hr /><div className="ev-rts">{[['/automotive-software-solutions/','Automotive Software','ev-ra'],['/iot-software-development/','IoT Development','ev-rb'],['/manufacturing-software-development-services/','Manufacturing Software','ev-rc'],['/logistics-software-development-services/','Logistics Software','ev-ra'],['/agriculture-software-development/','Agriculture Software','ev-rd'],['/it-outsourcing-services/','IT Outsourcing','ev-rb'],['/offshore-development-company/','Offshore Development','ev-rc'],['/mobile-app-development/','Mobile Apps','ev-rd']].map(([hr, lb, cl]) => (<Link key={hr} href={hr} className={`ev-rt ${cl}`}>{lb}</Link>))}</div></div></section>
      </div>
    </>
  );
}
