'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.1solutions.biz/#industries' }, { '@type': 'ListItem', position: 3, name: 'Agriculture Software', item: 'https://www.1solutions.biz/agriculture-software-development/' }] },
    { '@type': 'Service', name: 'Agriculture Software Development', url: 'https://www.1solutions.biz/agriculture-software-development/', description: '1Solutions builds custom AgriTech software — farm management systems, precision agriculture platforms, crop monitoring with IoT sensors, livestock management, supply chain traceability, agri-marketplace apps, drone data analytics, and agricultural ERP integration. 15+ years, 60+ AgriTech projects.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '54', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What agriculture software does 1Solutions develop?', acceptedAnswer: { '@type': 'Answer', text: '1Solutions develops farm management systems (FMS), precision agriculture platforms with IoT sensor integration, crop monitoring and yield prediction tools, livestock management software, agricultural supply chain traceability, agri-marketplace and e-commerce platforms, drone and satellite imagery analytics, irrigation management systems, and agricultural ERP and accounting integrations.' } },
      { '@type': 'Question', name: 'Can you build IoT-based farm monitoring software?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — IoT farm monitoring is a core AgriTech capability. We build systems that collect data from soil sensors (moisture, NPK, pH), weather stations, irrigation controllers, livestock trackers, and greenhouse environment sensors. Data flows through MQTT or LoRaWAN to a cloud platform where it is displayed on real-time dashboards, triggers automated alerts, and feeds AI models for yield prediction and disease detection.' } },
    ] },
  ],
};

const SOLUTIONS = [
  { n: '01', title: 'Farm Management System (FMS)', desc: 'End-to-end farm management — field mapping and crop planning, task scheduling, input tracking (seeds, fertilisers, pesticides, water), equipment management, labour tracking, harvest recording, and financial reporting (cost per hectare, yield vs cost, season P&L). Mobile app for farm workers to log activities from the field.' },
  { n: '02', title: 'Precision Agriculture & IoT Platform', desc: 'IoT-connected precision farming — soil sensor integration (moisture, NPK, pH, temperature), weather station data, satellite imagery (NDVI, crop health index), variable-rate application maps, automated irrigation triggers, real-time dashboards, alert notifications, and historical trend analysis for data-driven field management decisions.', feat: true },
  { n: '03', title: 'Crop Monitoring & Yield Prediction', desc: 'AI-powered crop intelligence — multispectral and satellite imagery analysis (Sentinel, Planet Labs), plant growth stage tracking, disease and pest early detection, yield prediction models (ML on historical yield + weather + soil data), harvest timing optimisation, and automated crop health reports delivered to farm managers.' },
  { n: '04', title: 'Livestock Management Software', desc: 'Digital livestock management — individual animal tracking (RFID/EID tags), breeding and calving records, health and vaccination history, weight gain monitoring, feed management and ration formulation, milk production tracking (dairy), mortality and morbidity reporting, regulatory compliance records, and integration with NLIS (AU), BVD (UK), and USDA ear tag databases.' },
  { n: '05', title: 'Agri-Marketplace & eCommerce Platform', desc: 'Digital marketplace for agriculture — B2C and B2B platforms connecting farmers with buyers (produce, livestock, equipment, inputs), real-time pricing and bidding, grade and quality certification display, cold chain and logistics integration, payment processing, farmer profile and ratings, order management, and multilingual mobile app for rural markets with low connectivity.' },
  { n: '06', title: 'Supply Chain & Traceability Platform', desc: 'Farm-to-fork traceability — product provenance tracking from paddock to shelf, lot/batch management, QR code and blockchain-based consumer-facing transparency, cold chain monitoring (temperature and humidity sensors), compliance with GlobalGAP, HACCP, and retailer traceability mandates, and automated certificate of origin generation.' },
  { n: '07', title: 'Irrigation & Water Management System', desc: 'Smart water management — soil moisture-triggered automated irrigation, evapotranspiration (ET) based scheduling, remote valve control, water consumption metering and reporting, weather-adjusted irrigation plans, integration with SCADA and pivot irrigation controllers, water licence compliance tracking, and cost-per-ML water efficiency dashboards.' },
  { n: '08', title: 'Drone & Aerial Imagery Analytics', desc: 'Drone data processing platform — flight plan management, image upload and stitching (orthomosaic, DSM, DTM), NDVI and multispectral analysis, problem area identification and mapping, prescription map generation for variable-rate application, integration with DJI, senseFly, and Parrot drones, and cloud processing with results delivered to the farm management system.' },
  { n: '09', title: 'Weather & Climate Analytics', desc: 'Agricultural weather intelligence — hyperlocal weather data integration (Dark Sky, Bureau of Meteorology, NOAA), degree-day accumulation for pest and disease risk models, frost and heat stress alerts, spray-day calculator (wind speed, humidity, temperature), season summary reports, and multi-year climate trend analysis for crop variety selection.' },
  { n: '10', title: 'Agricultural ERP & Accounting Integration', desc: 'Financial management for agribusiness — integration with MYOB, Xero, QuickBooks, and SAP; paddock-level costing; crop enterprise budgets; inventory (grain, livestock, inputs); depreciation of plant and equipment; payroll for seasonal workers; BAS/GST reporting (AU), VAT returns (UK), and multi-farm consolidated reporting for corporate farming groups.' },
];

const TECH_STACK = [
  { group: 'IoT & Sensors', color: '#3a5a13', items: ['MQTT / LoRaWAN', 'Modbus / RS-485', 'AWS IoT Core', 'Azure IoT Hub', 'Node-RED (edge)', 'InfluxDB (time-series)'] },
  { group: 'Satellite & Imagery', color: '#4d7c0f', items: ['Sentinel-2 (ESA)', 'Planet Labs API', 'Mapbox Satellite', 'NDVI / multispectral', 'Google Earth Engine', 'OpenDroneMap'] },
  { group: 'Frontend & Mobile', color: '#365314', items: ['React / Next.js', 'React Native', 'Offline-first PWA', 'Mapbox GL JS', 'Google Maps Platform', 'TypeScript'] },
  { group: 'Backend & APIs', color: '#0f766e', items: ['Node.js / NestJS', 'Python / FastAPI', 'Django REST Framework', 'GraphQL / REST', 'WebSocket (real-time)', 'Celery (task queue)'] },
  { group: 'AI & Analytics', color: '#6d28d9', items: ['Python ML (scikit-learn)', 'TensorFlow / PyTorch', 'Yield prediction models', 'Disease detection CV', 'Time-series forecasting', 'Snowflake / BigQuery'] },
  { group: 'Blockchain & Traceability', color: '#0369a1', items: ['Ethereum / Polygon', 'Hyperledger Fabric', 'QR / GS1 standards', 'IPFS (media storage)', 'Smart contracts', 'GlobalGAP compliance'] },
  { group: 'Cloud & DevOps', color: '#dc2626', items: ['AWS / GCP / Azure', 'Kubernetes / EKS', 'Terraform (IaC)', 'GitHub Actions CI/CD', 'On-premise / hybrid', 'Edge (Raspberry Pi)'] },
  { group: 'Database & Maps', color: '#b45309', items: ['PostgreSQL / PostGIS', 'InfluxDB (sensor data)', 'MongoDB (field docs)', 'Redis (cache)', 'QGIS integration', 'GeoJSON / Shapefile'] },
];

const ENGAGEMENT = [
  { id: 'platform', name: 'Custom AgriTech Platform', badge: 'Most Popular', bc: '#D97706', feat: true, icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', headline: 'Farm management, IoT monitoring, or agri-marketplace.', desc: 'Full-cycle development of a custom agriculture platform — FMS, IoT sensor integration, crop monitoring, livestock management, or agri-marketplace. Discovery → architecture → agile sprints → launch.', best: ['AgriTech startups building a precision farming SaaS', 'Corporate farms needing a digital FMS to replace spreadsheets', 'Agricultural cooperatives building a farmer marketplace', 'Government or NGO building a smallholder farmer support platform'], tl: 'MVP live in 10–14 weeks; full platform 5–8 months' },
  { id: 'iot', name: 'IoT & Sensor Integration', badge: 'High ROI', bc: '#3a5a13', icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18', headline: 'Connect farm sensors to real-time dashboards fast.', desc: 'Rapid IoT integration — soil sensors, weather stations, irrigation controllers, livestock trackers, and greenhouse sensors connected to a cloud platform with real-time dashboards, automated alerts, and historical analytics.', best: ['Farms with sensors already installed but no analytics platform', 'AgriTech companies adding IoT connectivity to an existing FMS', 'Irrigation districts needing remote water management', 'Greenhouse operators needing environment monitoring and automation'], tl: 'First sensors live on dashboards in 4–8 weeks' },
  { id: 'traceability', name: 'Traceability & Compliance', badge: 'Regulatory Driven', bc: '#0369a1', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', headline: 'Farm-to-fork traceability and audit compliance.', desc: 'Traceability platform covering paddock-to-shelf tracking, QR consumer transparency, GlobalGAP and HACCP compliance, cold chain monitoring, and retailer traceability mandate compliance (Tesco, Woolworths, Walmart).', best: ['Exporters needing EU or US import traceability compliance', 'Food manufacturers facing retailer traceability mandates', 'Organic and premium producers wanting consumer transparency QR', 'Cooperatives managing traceability across hundreds of member farms'], tl: 'Core traceability live in 8–12 weeks' },
];

const TESTIMONIALS = [
  { text: "1Solutions built our precision farming platform — IoT soil sensor integration across 12,000 hectares, NDVI satellite imagery, variable-rate fertiliser maps, and a mobile app for our farm managers. Input costs reduced by 22% in the first season through more precise application. The platform paid for itself within 8 months.", name: 'James H.', role: 'General Manager, Corporate Grain Farming Group (AU)', init: 'JH', bg: '#1a3408' },
  { text: "We hired 1Solutions to build our agri-marketplace connecting 3,000 smallholder vegetable farmers to urban buyers and food service companies. The platform handles listing, grading, logistics booking, and payment — all on a mobile app that works on 2G. Farmer incomes have increased 35% since launch because they sell directly instead of through middlemen.", name: 'Amara K.', role: 'CEO, AgriTech Marketplace (Kenya/UK)', init: 'AK', bg: '#243a12', feat: true },
  { text: "1Solutions built our livestock traceability platform for our beef export business. Individual animal tracking from birth to abattoir, health records, NLIS integration, and QR codes on every carton for buyer verification. We passed our first EU market access audit without a single non-conformance. Outstanding AgriTech expertise.", name: 'Robert C.', role: 'Managing Director, Beef Export Company (AU)', init: 'RC', bg: '#1e3a5f' },
];

const WHY = [
  { t: '60+ AgriTech Projects', d: '1Solutions has built farm management systems, IoT platforms, crop analytics tools, agri-marketplaces, and traceability systems for agricultural businesses in Australia, the UK, the US, and emerging markets over 15+ years.' },
  { t: 'Rural Connectivity Expertise', d: 'Agriculture happens in areas with poor mobile coverage. We build offline-first mobile apps, LoRaWAN IoT systems for connectivity-limited environments, and edge computing solutions that process data locally when connectivity drops.' },
  { t: 'Geospatial & GIS Capability', d: 'PostgreSQL/PostGIS for spatial queries, Mapbox for field mapping, GeoJSON/Shapefile import, NDVI raster processing, and polygon-based field boundary management — proper geospatial architecture, not workarounds.' },
  { t: 'IoT Protocol Depth', d: 'MQTT, LoRaWAN (TTN, Chirpstack), Modbus, and direct sensor SDK integrations — we connect real agricultural hardware to cloud platforms, not just theoretical IoT diagrams.' },
  { t: 'Regulatory Compliance Knowledge', d: 'GlobalGAP, HACCP, NLIS (AU), BVD (UK), EU import traceability (EUDR), and retailer traceability mandates — we know what the regulations require and build systems that satisfy auditors.' },
  { t: 'Smallholder & Emerging Market Experience', d: 'Not all AgriTech is for corporate farms. We have built platforms for smallholder farmers in sub-Saharan Africa and South Asia — low-cost smartphones, feature phone SMS fallback, multilingual, and offline-capable.' },
  { t: 'Satellite & Drone Data Processing', d: 'Sentinel-2, Planet Labs, and drone imagery (orthomosaic, NDVI) processed via Google Earth Engine or cloud pipelines — field health maps, problem zone detection, and prescription maps generated automatically.' },
  { t: 'Post-Launch Agronomic Support', d: 'We work with agronomists during discovery to ensure the software reflects real farming workflows, not assumptions. Post-launch, our team is available to tune AI models with new season data.' },
];

const FAQS = [
  { q: 'What agriculture software does 1Solutions develop?', a: 'Farm management systems (FMS), precision agriculture IoT platforms, crop monitoring and yield prediction, livestock management, agri-marketplaces, supply chain traceability, irrigation management, drone imagery analytics, weather intelligence, and agricultural ERP integration.' },
  { q: 'Can you build IoT-based farm monitoring software?', a: 'Yes — soil sensors (moisture, NPK, pH), weather stations, irrigation controllers, livestock trackers, and greenhouse sensors connected via MQTT or LoRaWAN to cloud dashboards with real-time alerts and historical analytics.' },
  { q: 'Do you build apps that work offline in rural areas?', a: 'Yes — offline-first React Native apps that allow farm workers to log tasks, scan animals, and capture data without mobile coverage. Data syncs automatically when connectivity is restored. Also LoRaWAN IoT systems for very remote farms with no mobile signal.' },
  { q: 'Can you process NDVI satellite imagery for crop monitoring?', a: 'Yes — Sentinel-2 and Planet Labs imagery processed via Google Earth Engine or custom cloud pipelines. NDVI, NDRE, and LAI maps generated on a scheduled cadence and displayed as field health overlays in the farm management platform.' },
  { q: 'How do you build farm-to-fork traceability?', a: 'Lot/batch tracking from field activity through packing and despatch, QR codes on packaging for consumer scanning, cold chain sensor data attached to each consignment, GlobalGAP and HACCP compliance data capture, and blockchain anchoring for immutable audit trails where required by the supply chain.' },
  { q: 'Can you build an agri-marketplace platform?', a: 'Yes — B2C and B2B marketplaces connecting farmers with buyers, with produce listing, grading, real-time pricing, logistics integration, payment processing, and mobile apps designed for low-bandwidth rural environments.' },
  { q: 'What technology stack do you use for AgriTech?', a: 'Frontend: React/Next.js (web), React Native (offline mobile). IoT: MQTT/LoRaWAN, AWS IoT Core. Backend: Node.js or Python. Geo: PostgreSQL/PostGIS, Mapbox. Imagery: Google Earth Engine. Database: InfluxDB (sensor time-series), PostgreSQL. Cloud: AWS or GCP.' },
  { q: 'Can you integrate with farm accounting software like MYOB or Xero?', a: 'Yes — MYOB, Xero, QuickBooks, and SAP integration. Paddock-level costs, crop enterprise budgets, inventory management, seasonal payroll, and BAS/GST (AU) or VAT (UK) reporting all feeding from the farm management system to the accounting platform.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => { if (!start) return; const n = parseInt(target.replace(/\D/g, ''), 10); if (!n) return; let t0 = null; const s = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) requestAnimationFrame(s); }; requestAnimationFrame(s); }, [start, target, duration]);
  return count;
}
function StatItem({ label, val, started }) {
  const n = useCountUp(val, 1800, started);
  const sfx = val.replace(/[\d,]/g, '');
  return (<div className="agr-sc"><div className="agr-sv">{started ? n + sfx : val}</div><div className="agr-sl">{label}</div></div>);
}

export default function AgricultureSoftware() {
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
  const ac = '#3a5a13'; const txt = '#1a2e07'; const txt2 = '#365314';
  return (
    <>
      <Head>
        <title>Agriculture Software Development | AgriTech, Farm Management, IoT Farming | 1Solutions</title>
        <meta name="description" content="Custom agriculture software development — farm management systems, precision agriculture IoT platforms, crop monitoring, livestock management, agri-marketplaces, traceability, and drone analytics. 60+ AgriTech projects. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/agriculture-software-development/" />
        <meta property="og:title" content="Agriculture Software Development | AgriTech Solutions | 1Solutions" />
        <meta property="og:description" content="Farm management systems, precision agriculture IoT, crop monitoring, livestock management, and agri-marketplace platforms. 60+ AgriTech projects." />
        <meta property="og:url" content="https://www.1solutions.biz/agriculture-software-development/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .agr-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#f1f8e9 0%,#dcedc8 20%,#f4fce8 50%,#fef9c3 75%,#f0f9ff 100%);color:${txt};line-height:1.6;position:relative;overflow-x:hidden}
          .agr-page *,.agr-page *::before,.agr-page *::after{box-sizing:border-box}
          .agr-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .agr-o1{width:800px;height:800px;background:radial-gradient(circle,rgba(58,90,19,.16) 0%,transparent 70%);top:-220px;right:-200px}
          .agr-o2{width:700px;height:700px;background:radial-gradient(circle,rgba(180,83,9,.12) 0%,transparent 70%);bottom:0;left:-200px}
          .agr-o3{width:480px;height:480px;background:radial-gradient(circle,rgba(3,105,161,.08) 0%,transparent 70%);top:42%;left:-90px}
          .agr-bc{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .agr-bc ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:${ac}}
          .agr-bc li{display:flex;align-items:center;gap:6px}.agr-bc li::after{content:'/';opacity:.45}.agr-bc li:last-child::after{display:none}
          .agr-bc a{color:${txt};text-decoration:none}
          .agr-hero{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto;padding:44px 40px 28px}
          .agr-ey{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${ac};margin-bottom:14px}
          .agr-hero h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,${txt} 0%,${ac} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .agr-desc{font-size:16px;color:${txt2};line-height:1.65;max-width:720px;margin:0 auto 22px}
          .agr-tr{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-bottom:24px}
          .agr-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:5px 13px;font-size:12px;font-weight:600;color:${txt};box-shadow:0 2px 8px rgba(58,90,19,.07)}
          .agr-dot{width:7px;height:7px;border-radius:50%;background:${ac};flex-shrink:0}
          .agr-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .agr-p{display:inline-block;padding:13px 34px;background:${ac};color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(58,90,19,.28)}
          .agr-p:hover{background:${txt};transform:translateY(-2px)}
          .agr-g{display:inline-block;padding:13px 34px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:${txt};font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .agr-g:hover{background:rgba(255,255,255,.85);border-color:rgba(58,90,19,.5);transform:translateY(-2px)}
          .agr-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:920px;margin:26px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(58,90,19,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .agr-sc{padding:18px 16px;text-align:center;border-right:1px solid rgba(58,90,19,.10)}.agr-sc:last-child{border-right:none}
          .agr-sv{font-size:28px;font-weight:900;color:${ac};letter-spacing:-.5px;line-height:1}
          .agr-sl{font-size:11px;color:${txt2};font-weight:500;margin-top:5px}
          .agr-sec{padding:72px 40px;position:relative;z-index:1}
          .agr-sec-alt{background:rgba(241,248,233,.55);border-top:1px solid rgba(58,90,19,.08);border-bottom:1px solid rgba(58,90,19,.08)}
          .agr-in{max-width:1300px;margin:0 auto}
          .agr-sey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .agr-sh{font-size:44px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,#4d7c0f 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .agr-sd{font-size:15px;color:${txt2};line-height:1.7;max-width:700px}
          .agr-rv{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .agr-rv.agr-ok{opacity:1;transform:translateY(0)}
          .agr-sk-g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
          .agr-card{background:linear-gradient(135deg,rgba(241,248,233,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(58,90,19,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),border-color .2s}
          .agr-card.agr-cv{opacity:1;transform:translateY(0)}.agr-card.agr-cv:hover{transform:translateY(-5px);border-color:rgba(58,90,19,.25);box-shadow:0 14px 40px rgba(58,90,19,.12)}
          .agr-card.feat{border-color:rgba(58,90,19,.18)}
          .agr-cn{position:absolute;top:6px;right:12px;font-size:68px;font-weight:900;line-height:1;color:${ac};opacity:.05;pointer-events:none;user-select:none}
          .agr-card h3{font-size:15px;font-weight:700;color:${txt};margin:0 0 7px;position:relative;z-index:1}
          .agr-card p{font-size:13px;color:${txt2};line-height:1.65;margin:0;position:relative;z-index:1}
          .agr-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,${ac},#4d7c0f);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top;transition:transform .3s}
          .agr-card.agr-cv:hover::before{transform:scaleY(1)}
          .agr-sm{text-align:center;margin-top:20px}
          .agr-bm{display:inline-block;background:#fff;border:1.5px solid rgba(58,90,19,.18);color:${txt};padding:9px 28px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .agr-bm:hover{background:${ac};border-color:${ac};color:#fff;transform:translateY(-2px)}
          .agr-tec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
          .agr-tc2{background:linear-gradient(135deg,rgba(241,248,233,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:20px 18px;box-shadow:0 4px 24px rgba(58,90,19,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .agr-tc2.agr-sv2{opacity:1;transform:translateY(0)}.agr-tc2.agr-sv2:hover{border-color:rgba(58,90,19,.22);box-shadow:0 12px 36px rgba(58,90,19,.10)}
          .agr-tg{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:10px;padding-bottom:7px;border-bottom:2px solid}
          .agr-pills{display:flex;flex-wrap:wrap;gap:5px}
          .agr-pill{display:inline-block;font-size:11px;font-weight:500;padding:3px 9px;border-radius:100px;border:1px solid}
          .agr-en-g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
          .agr-en{background:linear-gradient(135deg,rgba(241,248,233,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(58,90,19,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1),border-color .2s}
          .agr-en.agr-ev{opacity:1;transform:translateY(0)}.agr-en.agr-ev:hover{border-color:rgba(58,90,19,.22);box-shadow:0 14px 44px rgba(58,90,19,.12)}
          .agr-en.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(241,248,233,.45) 100%);border-color:rgba(217,119,6,.26);transform:translateY(-6px)}
          .agr-en.feat.agr-ev{transform:translateY(-6px)}.agr-en.feat.agr-ev:hover{transform:translateY(-10px)}
          .agr-en-b{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:4px 11px;border-radius:100px;border:1px solid;margin-bottom:16px}
          .agr-en-i{width:44px;height:44px;background:rgba(58,90,19,.08);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
          .agr-en.feat .agr-en-i{background:rgba(217,119,6,.10)}
          .agr-en-n{font-size:20px;font-weight:900;color:${txt};margin:0 0 5px;letter-spacing:-.3px}
          .agr-en-h{font-size:13px;font-weight:600;color:${ac};margin-bottom:10px}
          .agr-en.feat .agr-en-h{color:#D97706}
          .agr-en-d{font-size:13px;color:${txt2};line-height:1.7;margin-bottom:14px}
          .agr-en-ll{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${ac};margin-bottom:7px}
          .agr-en-li{list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:6px}
          .agr-en-li li{display:flex;align-items:flex-start;gap:7px;font-size:13px;color:#374151;line-height:1.5}
          .agr-en-li li::before{content:'✓';font-weight:800;color:${ac};flex-shrink:0;margin-top:1px}
          .agr-en.feat .agr-en-li li::before{color:#D97706}
          .agr-en-tl{font-size:11px;font-weight:600;color:#D97706;display:block;padding-top:10px;border-top:1px solid rgba(58,90,19,.08)}
          .agr-en-a{display:block;margin-top:14px;padding:10px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(58,90,19,.09);color:${txt};border:1.5px solid rgba(58,90,19,.18)}
          .agr-en-a:hover{background:${txt};color:#fff}
          .agr-en.feat .agr-en-a{background:${ac};color:#fff;border-color:${ac}}
          .agr-en.feat .agr-en-a:hover{background:${txt};border-color:${txt}}
          .agr-tg2{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
          .agr-tc{background:linear-gradient(135deg,rgba(241,248,233,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:26px 22px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 24px rgba(58,90,19,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
          .agr-tc.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(241,248,233,.42) 100%);border-color:rgba(217,119,6,.20)}
          .agr-tc.agr-tv{opacity:1;transform:translateY(0)}.agr-tc.agr-tv:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(58,90,19,.12)}
          .agr-stars{font-size:15px;color:#D97706;letter-spacing:2px}
          .agr-ttxt{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .agr-au{display:flex;align-items:center;gap:11px}
          .agr-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .agr-an{font-size:14px;font-weight:700;color:${txt}}
          .agr-ar{font-size:12px;color:#6b7280}
          .agr-wy-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px}
          .agr-wc{background:linear-gradient(135deg,rgba(241,248,233,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:22px 18px;box-shadow:0 4px 24px rgba(58,90,19,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px) scale(.97);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .agr-wc.agr-wv{opacity:1;transform:translateY(0) scale(1)}.agr-wc.agr-wv:hover{transform:translateY(-4px) scale(1);border-color:rgba(58,90,19,.22);box-shadow:0 12px 36px rgba(58,90,19,.10)}
          .agr-wd{width:9px;height:9px;border-radius:50%;background:${ac};margin-bottom:10px}
          .agr-wc h3{font-size:13px;font-weight:700;color:${txt};margin:0 0 7px;line-height:1.35}
          .agr-wc p{font-size:12px;color:${txt2};line-height:1.6;margin:0}
          .agr-ct{padding:64px 40px;background:linear-gradient(135deg,rgba(241,248,233,.55) 0%,rgba(255,255,255,.60) 40%,rgba(240,249,255,.50) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .agr-ct-g{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;gap:28px;align-items:start}
          .agr-cth{font-size:38px;font-weight:900;line-height:1.18;margin:0 0 12px;background:linear-gradient(90deg,${txt} 0%,${ac} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .agr-ctd{font-size:14px;color:${txt2};line-height:1.6;margin:0 0 18px}
          .agr-ben{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px}
          .agr-be{display:flex;gap:9px;align-items:flex-start}
          .agr-bi{flex-shrink:0;color:${ac};font-weight:800;font-size:15px;margin-top:1px}
          .agr-be p{font-size:13px;color:${txt2};margin:0;line-height:1.5}
          .agr-fb{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(241,248,233,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:18px;padding:30px;box-shadow:0 8px 40px rgba(58,90,19,.08),inset 0 1px 0 rgba(255,255,255,1)}
          .agr-fb h3{font-size:20px;font-weight:700;color:${txt};margin:0 0 20px}
          .agr-form{display:flex;flex-direction:column;gap:12px}
          .agr-fr{display:grid;grid-template-columns:1fr 1fr;gap:11px}
          .agr-fg{display:flex;flex-direction:column;gap:4px}
          .agr-fg.full{grid-column:1/-1}
          .agr-fg label{font-size:12px;font-weight:500;color:${txt}}
          .agr-fg input,.agr-fg textarea,.agr-fg select{padding:10px 12px;border:1px solid rgba(58,90,19,.14);border-radius:6px;font-size:13px;font-family:inherit;color:${txt};background:rgba(255,255,255,.55);transition:border-color .2s}
          .agr-fg input:focus,.agr-fg textarea:focus,.agr-fg select:focus{outline:none;border-color:${ac};box-shadow:0 0 0 3px rgba(58,90,19,.10)}
          .agr-co{display:flex;gap:8px;align-items:flex-start}
          .agr-co input{margin-top:3px;width:14px;height:14px}
          .agr-co label{font-size:11px;color:${txt2};line-height:1.5}.agr-co a{color:${txt}}
          .agr-sub{width:100%;padding:13px;background:${ac};border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(58,90,19,.25)}
          .agr-sub:hover{background:${txt};transform:translateY(-2px)}
          .agr-fq{padding:72px 40px;background:rgba(241,248,233,.55);border-top:1px solid rgba(58,90,19,.08);position:relative;z-index:1}
          .agr-fq h2{font-size:42px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,#4d7c0f 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .agr-fq-sub{font-size:15px;color:${txt2};margin:0 0 32px}
          .agr-fql{display:flex;flex-direction:column;gap:9px}
          .agr-fi{background:linear-gradient(135deg,rgba(241,248,233,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(58,90,19,.05);transition:border-color .2s}
          .agr-fi.open{border-color:rgba(58,90,19,.28)}.agr-fi.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,${ac},#4d7c0f);border-radius:3px 3px 0 0}
          .agr-fqb{width:100%;background:none;border:none;padding:18px 18px 18px 52px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:12px;font-family:inherit;position:relative}
          .agr-fqn{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:rgba(58,90,19,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:5px}
          .agr-fi.open .agr-fqn{background:${ac};color:#fff}
          .agr-fqb span{font-size:14px;font-weight:600;color:${txt};line-height:1.4}.agr-fi.open .agr-fqb span{color:${ac}}
          .agr-fch{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform .3s}.agr-fi.open .agr-fch{transform:rotate(180deg);color:${ac}}
          .agr-faw{overflow:hidden;transition:max-height .35s ease;max-height:0}.agr-fi.open .agr-faw{max-height:400px}
          .agr-fa{padding:0 18px 18px 52px;font-size:14px;color:#4b5563;line-height:1.8}
          .agr-rel{padding:64px 40px;background:rgba(241,248,233,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .agr-ri{max-width:1300px;margin:0 auto;text-align:center}
          .agr-ri h2{font-size:30px;font-weight:900;background:linear-gradient(90deg,${txt} 0%,#4d7c0f 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 10px}
          .agr-ri hr{border:none;border-top:1px solid rgba(58,90,19,.10);margin:24px 0}
          .agr-rts{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
          .agr-rt{display:inline-block;padding:9px 18px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all .22s}
          .agr-rt:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.08)}
          .agr-ra{background:rgba(58,90,19,.09);border-color:rgba(58,90,19,.28);color:#3a5a13}
          .agr-rb{background:rgba(12,74,110,.09);border-color:rgba(12,74,110,.28);color:#0c4a6e}
          .agr-rc{background:rgba(120,53,15,.09);border-color:rgba(120,53,15,.28);color:#78350f}
          .agr-rd{background:rgba(20,83,45,.09);border-color:rgba(20,83,45,.28);color:#14532d}
          @media(max-width:1024px){.agr-hero h1,.agr-sh,.agr-fq h2{font-size:34px}.agr-sk-g{grid-template-columns:repeat(2,1fr)}.agr-tec-g{grid-template-columns:repeat(2,1fr)}.agr-en-g{grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto}.agr-en.feat{transform:none}.agr-en.feat.agr-ev{transform:none}.agr-en.feat.agr-ev:hover{transform:translateY(-4px)}.agr-wy-g{grid-template-columns:repeat(2,1fr)}.agr-tg2{grid-template-columns:1fr}.agr-ct-g{grid-template-columns:1fr}}
          @media(max-width:768px){.agr-bc,.agr-hero,.agr-sec,.agr-ct,.agr-fq,.agr-rel{padding-left:20px;padding-right:20px}.agr-hero{padding-top:28px;padding-bottom:16px}.agr-hero h1{font-size:26px}.agr-stats{grid-template-columns:1fr 1fr}.agr-sc:nth-child(2){border-right:none}.agr-sc:nth-child(3),.agr-sc:nth-child(4){border-top:1px solid rgba(58,90,19,.10)}.agr-sc:nth-child(4){border-right:none}.agr-sk-g,.agr-tec-g,.agr-wy-g{grid-template-columns:1fr}.agr-fr{grid-template-columns:1fr}.agr-cth{font-size:26px}}
        `}</style>
      </Head>
      <div className="agr-page">
        <div className="agr-orb agr-o1" /><div className="agr-orb agr-o2" /><div className="agr-orb agr-o3" />
        <nav className="agr-bc" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList"><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li><li><span>Industries</span></li><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">Agriculture Software</span><meta itemProp="position" content="3" /></li></ol></nav>
        <section className="agr-hero">
          <span className="agr-ey">Agriculture & AgriTech Industry</span>
          <h1>Agriculture Software Development — Farm Management, IoT Precision Farming & AgriTech</h1>
          <p className="agr-desc">Custom AgriTech for corporate farms, cooperatives, agri-marketplaces, and food companies — farm management systems, IoT precision agriculture, crop monitoring, livestock management, supply chain traceability, and drone analytics. 60+ AgriTech projects. 15+ years.</p>
          <div className="agr-tr">{['Farm Management System','Precision Agriculture IoT','Crop Monitoring & AI','Livestock Management','Agri-Marketplace'].map(b => (<div className="agr-badge" key={b}><span className="agr-dot" />{b}</div>))}</div>
          <div className="agr-ctas"><Link href="#contact" className="agr-p">Discuss Your AgriTech Project</Link><Link href="#solutions" className="agr-g">View Solutions →</Link></div>
        </section>
        <div className="agr-stats" ref={stR}>{[['60+','AgriTech Projects'],['15+','Years Dev Experience'],['22%','Avg Input Cost Reduction'],['99.9%','Platform Uptime SLA']].map(([v, l]) => <StatItem key={l} label={l} val={v} started={ss} />)}</div>
        <section id="solutions" className="agr-sec"><div className="agr-in"><div className={`agr-rv${vis.has('sk') ? ' agr-ok' : ''}`} ref={el => { secR.current['sk'] = el; }}><span className="agr-sey">AgriTech Solutions</span><h2 className="agr-sh">What We Build for Agriculture</h2><p className="agr-sd">Farm management systems, precision agriculture IoT, crop monitoring, livestock management, agri-marketplaces, traceability, irrigation, drone analytics, weather intelligence, and agricultural ERP integration.</p></div><div className="agr-sk-g" ref={skR}>{visS.map((s, i) => (<div key={s.n} className={`agr-card${s.feat ? ' feat' : ''}${vSk.includes(i) ? ' agr-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="agr-cn">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>{SOLUTIONS.length > 6 && <div className="agr-sm"><button className="agr-bm" onClick={() => setShowAll(p => !p)}>{showAll ? 'Show fewer ↑' : `Show all ${SOLUTIONS.length} solutions ↓`}</button></div>}</div></section>
        <section className="agr-sec agr-sec-alt"><div className="agr-in"><div className={`agr-rv${vis.has('stk') ? ' agr-ok' : ''}`} ref={el => { secR.current['stk'] = el; }}><span className="agr-sey">Technology Stack</span><h2 className="agr-sh">AgriTech Technology We Work With</h2><p className="agr-sd">MQTT/LoRaWAN IoT, Sentinel satellite imagery, React Native offline apps, Python ML, PostGIS, AWS IoT, and the full precision agriculture tech ecosystem.</p></div><div className="agr-tec-g" ref={stGr}>{TECH_STACK.map((g, i) => (<div key={g.group} className={`agr-tc2${vSt.includes(i) ? ' agr-sv2' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="agr-tg" style={{ color: g.color, borderBottomColor: g.color + '33' }}>{g.group}</div><div className="agr-pills">{g.items.map(it => <span key={it} className="agr-pill" style={{ color: g.color, background: g.color + '12', borderColor: g.color + '30' }}>{it}</span>)}</div></div>))}</div></div></section>
        <section className="agr-sec"><div className="agr-in"><div className={`agr-rv${vis.has('eng') ? ' agr-ok' : ''}`} ref={el => { secR.current['eng'] = el; }}><span className="agr-sey">Engagement Models</span><h2 className="agr-sh">How We Work with Agriculture Companies</h2><p className="agr-sd">Custom AgriTech platform, IoT sensor integration, or traceability and compliance system — structured for farming environments and seasonal delivery cycles.</p></div><div className="agr-en-g" ref={enR}>{ENGAGEMENT.map((m, i) => (<div key={m.id} className={`agr-en${m.feat ? ' feat' : ''}${vEn.includes(i) ? ' agr-ev' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><span className="agr-en-b" style={{ color: m.bc, borderColor: m.bc + '44', background: m.bc + '14' }}>{m.badge}</span><div className="agr-en-i"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={m.feat ? '#D97706' : ac} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg></div><div className="agr-en-n">{m.name}</div><div className="agr-en-h">{m.headline}</div><div className="agr-en-d">{m.desc}</div><div className="agr-en-ll">Best for</div><ul className="agr-en-li">{m.best.map(b => <li key={b}>{b}</li>)}</ul><span className="agr-en-tl">{m.tl}</span><Link href="#contact" className="agr-en-a">Get a free estimate →</Link></div>))}</div></div></section>
        <section className="agr-sec agr-sec-alt"><div className="agr-in"><div className={`agr-rv${vis.has('ts') ? ' agr-ok' : ''}`} ref={el => { secR.current['ts'] = el; }}><span className="agr-sey">Client Outcomes</span><h2 className="agr-sh">AgriTech Clients</h2><p className="agr-sd">Corporate farms, cooperatives, and agri-marketplaces on building agriculture technology with 1Solutions.</p></div><div className="agr-tg2" ref={teR}>{TESTIMONIALS.map((t, i) => (<div key={i} className={`agr-tc${t.feat ? ' feat' : ''}${vTe.includes(i) ? ' agr-tv' : ''}`} style={{ transitionDelay: `${i * 90}ms` }} itemScope itemType="https://schema.org/Review"><div className="agr-stars">★★★★★</div><p className="agr-ttxt" itemProp="reviewBody">{t.text}</p><div className="agr-au"><div className="agr-av" style={{ background: t.bg }}>{t.init}</div><div><div className="agr-an" itemProp="author">{t.name}</div><div className="agr-ar">{t.role}</div></div></div></div>))}</div></div></section>
        <section className="agr-sec"><div className="agr-in"><div className={`agr-rv${vis.has('wy') ? ' agr-ok' : ''}`} ref={el => { secR.current['wy'] = el; }}><span className="agr-sey">Why 1Solutions</span><h2 className="agr-sh">Why Agriculture Companies Choose 1Solutions</h2><p className="agr-sd">Rural connectivity expertise, geospatial GIS capability, IoT protocol depth, regulatory compliance, satellite imagery processing, and smallholder market experience.</p></div><div className="agr-wy-g" ref={whR}>{WHY.map((c, i) => (<div key={i} className={`agr-wc${vWh.includes(i) ? ' agr-wv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="agr-wd" /><h3>{c.t}</h3><p>{c.d}</p></div>))}</div></div></section>
        <section id="contact" className="agr-ct"><div className="agr-ct-g"><div><h2 className="agr-cth">Build Your AgriTech Platform</h2><p className="agr-ctd">Share your agriculture technology requirements and we will respond within 24 hours with a proposal, timeline, and team composition.</p><div className="agr-ben">{[['✓','Technical proposal within 24–48 hours'],['✓','IoT, geospatial, and AgriTech specialists'],['✓','NDA signed before any technical discussions'],['✓','60+ AgriTech projects — FMS, IoT, traceability, marketplaces'],['✓','Offline-capable, rural-ready, SLA-backed delivery']].map(([ic, tx]) => (<div className="agr-be" key={tx}><span className="agr-bi">{ic}</span><p>{tx}</p></div>))}</div></div>
        <div className="agr-fb"><h3>Tell Us About Your AgriTech Project</h3><form className="agr-form" onSubmit={e => e.preventDefault()}><div className="agr-fr"><div className="agr-fg"><label>Full Name *</label><input type="text" placeholder="Your name" required /></div><div className="agr-fg"><label>Work Email *</label><input type="email" placeholder="you@company.com" required /></div></div><div className="agr-fr"><div className="agr-fg"><label>Company / Farm</label><input type="text" placeholder="Company name" /></div><div className="agr-fg"><label>Phone / WhatsApp</label><input type="tel" placeholder="+1 555 000 0000" /></div></div><div className="agr-fg full"><label>Type of AgriTech Platform *</label><select required><option value="">Select...</option><option>Farm Management System (FMS)</option><option>Precision Agriculture / IoT Platform</option><option>Crop Monitoring & Yield Prediction</option><option>Livestock Management Software</option><option>Agri-Marketplace / eCommerce</option><option>Supply Chain Traceability</option><option>Irrigation Management System</option><option>Drone / Aerial Imagery Analytics</option><option>Weather & Climate Analytics</option><option>Agricultural ERP Integration</option><option>Other</option></select></div><div className="agr-fg full"><label>Project Description *</label><textarea rows={4} placeholder="Describe your agriculture software project — farm type, scale, current systems, key challenges, and timeline..." required /></div><div className="agr-co"><input type="checkbox" required /><label>I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label></div><button type="submit" className="agr-sub">Get an AgriTech Proposal →</button></form></div></div></section>
        <section className="agr-fq"><div className="agr-in" style={{ maxWidth: 840 }}><span className="agr-sey">FAQ</span><h2>Agriculture Software — FAQ</h2><p className="agr-fq-sub">Farm management, IoT sensors, precision farming, traceability, and agri-marketplace questions answered.</p><div className="agr-fql">{FAQS.map((f, i) => (<div key={i} className={`agr-fi${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="agr-fqb" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="agr-fqn">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{f.q}</span><svg className="agr-fch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="agr-faw"><div className="agr-fa" itemProp="text">{f.a}</div></div></div>))}</div></div></section>
        <section className="agr-rel"><div className="agr-ri"><span className="agr-sey">Related Services</span><h2>Related Industry & Technology Services</h2><hr /><div className="agr-rts">{[['/manufacturing-software-development-services/','Manufacturing Software','agr-rc'],['/logistics-software-development-services/','Logistics Software','agr-rd'],['/iot-software-development/','IoT Development','agr-rb'],['/healthcare-software-development/','Healthcare Software','agr-ra'],['/fintech-software-development-company/','FinTech Software','agr-rb'],['/it-outsourcing-services/','IT Outsourcing','agr-ra'],['/offshore-development-company/','Offshore Development','agr-rc'],['/mobile-app-development/','Mobile Apps','agr-rd']].map(([hr, lb, cl]) => (<Link key={hr} href={hr} className={`agr-rt ${cl}`}>{lb}</Link>))}</div></div></section>
      </div>
    </>
  );
}
