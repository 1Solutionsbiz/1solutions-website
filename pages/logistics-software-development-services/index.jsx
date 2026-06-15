'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.1solutions.biz/#industries' }, { '@type': 'ListItem', position: 3, name: 'Logistics Software', item: 'https://www.1solutions.biz/logistics-software-development-services/' }] },
    { '@type': 'Service', name: 'Logistics Software Development Services', url: 'https://www.1solutions.biz/logistics-software-development-services/', description: '1Solutions builds custom logistics and supply chain software — TMS (Transportation Management Systems), WMS (Warehouse Management Systems), last-mile delivery platforms, fleet management, freight forwarding software, carrier integrations, real-time shipment tracking, and supply chain visibility platforms. 15+ years, 100+ logistics projects.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '84', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What logistics software does 1Solutions develop?', acceptedAnswer: { '@type': 'Answer', text: '1Solutions develops Transportation Management Systems (TMS), Warehouse Management Systems (WMS), last-mile delivery platforms, fleet management and telematics systems, freight forwarding and freight brokerage software, carrier and 3PL integration APIs, real-time shipment tracking portals, supply chain visibility platforms, customs and trade compliance tools, and 3PL/4PL management platforms.' } },
      { '@type': 'Question', name: 'Can you integrate with carrier APIs like FedEx, UPS, and DHL?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — carrier API integration is one of our most common logistics engagements. We integrate FedEx (Web Services, REST API), UPS (Developer Kit), DHL (Express / Freight API), USPS, Royal Mail, Australia Post, TNT, and regional carriers. We also integrate with multi-carrier rate shopping platforms (EasyPost, ShipStation, Shippit, Starshipit) and freight aggregators to compare rates across carriers in real time.' } },
      { '@type': 'Question', name: 'How long does it take to build a TMS or WMS?', acceptedAnswer: { '@type': 'Answer', text: 'A core TMS (carrier booking, rate shopping, shipment tracking, POD management): 12–16 weeks. A full-featured TMS with dynamic routing, load optimisation, multi-carrier integration, customer portal, and analytics: 6–9 months. A WMS (receiving, put-away, pick, pack, ship with barcode scanning): 14–18 weeks for a standard implementation. We use an MVP-first approach — core workflows live before all features are complete.' } },
    ] },
  ],
};

const SOLUTIONS = [
  { n: '01', title: 'Transportation Management System (TMS)', desc: 'Custom TMS — shipment planning and booking, carrier rate shopping and tendering, load optimisation (full and partial truckload, LTL consolidation), multi-carrier integration (FedEx, UPS, DHL, regional carriers), track and trace, proof of delivery (POD) capture, freight invoice auditing, carrier performance scorecards, and a customer shipment portal with self-service booking and tracking.' },
  { n: '02', title: 'Warehouse Management System (WMS)', desc: 'End-to-end WMS — inbound receiving and ASN processing, directed put-away with location optimisation, pick strategies (wave, batch, zone, cluster), pack and ship workflow with cartonisation, barcode/RFID scanning, licence plate and pallet tracking, cross-docking, returns processing, slotting optimisation, cycle count management, and a 3PL billing module for multi-client warehouse operations.', feat: true },
  { n: '03', title: 'Last-Mile Delivery Platform', desc: 'Last-mile logistics software — delivery route optimisation (OSRM, Google OR-Tools), driver mobile app (iOS/Android) with turn-by-turn navigation, digital POD (signature, photo, OTP), real-time customer tracking page with ETA, delivery time window management, failed delivery and re-delivery workflow, multi-depot dispatch scheduling, and delivery analytics (on-time rate, cost per delivery, customer satisfaction).' },
  { n: '04', title: 'Fleet Management & Telematics', desc: 'Fleet management platform — real-time vehicle tracking (GPS telematics integration: Samsara, Verizon Connect, Geotab), driver behaviour monitoring (harsh braking, speeding, idle time), vehicle maintenance scheduling and alerts, fuel consumption reporting, driver hours and tachograph compliance (DVSA, ELD mandate), route replay, asset utilisation dashboard, and driver mobile app for pre-trip inspection.' },
  { n: '05', title: 'Freight Forwarding & Brokerage Software', desc: 'Freight management system — shipment quotation and booking workflow, multi-modal freight management (air, sea, road, rail), customs entry management and tariff classification, Bill of Lading and AWB generation, freight brokerage load board and carrier matching, rate management and spot rate tools, port and vessel tracking integration (MarineTraffic, AIS), and customer and agent portal.' },
  { n: '06', title: 'Carrier & 3PL Integration Platform', desc: 'API integration hub for logistics — FedEx, UPS, DHL, Royal Mail, Australia Post, and 50+ carrier API integrations; ERP connectivity (SAP, Oracle, Dynamics, NetSuite); eCommerce platform integration (Shopify, Magento, WooCommerce); 3PL portal with EDI (810, 850, 856, 940, 945) and API support; and a normalised logistics API layer that abstracts multi-carrier complexity from your application layer.' },
  { n: '07', title: 'Supply Chain Visibility Platform', desc: 'End-to-end supply chain visibility — inbound purchase order tracking, supplier on-time delivery performance, multi-tier supply chain event management (disruption alerts, alternative routing), ocean and air freight milestone tracking, inventory in-transit visibility, customer-facing order tracking page, ESG and carbon footprint tracking per shipment, and supply chain KPI dashboard for leadership teams.' },
  { n: '08', title: 'Route Optimisation Engine', desc: 'AI-powered route planning — multi-stop route optimisation with time windows, vehicle capacity constraints, driver shift limits, priority deliveries, and traffic-aware dynamic re-routing. REST API for integration into your existing TMS or dispatch platform. Batch optimisation for overnight planning, dynamic re-optimisation for same-day adds, and real-time ETA recalculation using live traffic data (Google Maps, HERE, TomTom).' },
  { n: '09', title: '3PL / 4PL Management Platform', desc: 'Third-party logistics management — multi-client WMS with client-specific rules, inventory segregation, and billing; 3PL customer portal with real-time inventory and order status; EDI integration for retail compliance (Target, Walmart, Tesco, Coles mandates); freight audit and payment; SLA monitoring per client; and carrier network management for 4PL providers orchestrating multiple 3PLs.' },
  { n: '10', title: 'Logistics Analytics & Business Intelligence', desc: 'Logistics data platform — freight spend analysis by lane, carrier, and mode; delivery performance (OTIF — on time in full), transit time analytics, carrier reliability scorecards, warehouse productivity (picks per hour, dock-to-stock time), carbon reporting by shipment and carrier, predictive demand and capacity planning, and executive logistics KPI dashboard (Power BI, Metabase, or custom).' },
];

const TECH_STACK = [
  { group: 'Frontend & Mobile', color: '#14532d', items: ['React / Next.js', 'React Native (driver app)', 'TypeScript', 'Google Maps / Mapbox', 'HERE Maps integration', 'Progressive Web App'] },
  { group: 'Backend & APIs', color: '#166534', items: ['Node.js / NestJS', 'Python / FastAPI', 'Go (routing engine)', 'REST & GraphQL APIs', 'gRPC (real-time)', 'WebSocket (tracking)'] },
  { group: 'Carrier & Freight APIs', color: '#15803d', items: ['FedEx REST API', 'UPS Developer Kit', 'DHL Express API', 'EasyPost / ShipStation', 'Royal Mail / AUS Post', 'MarineTraffic AIS API'] },
  { group: 'Route Optimisation', color: '#0f766e', items: ['Google OR-Tools', 'OSRM / Valhalla', 'Google Maps Platform', 'HERE Routing API', 'TomTom Traffic API', 'Custom VRP solver'] },
  { group: 'IoT & Telematics', color: '#0891b2', items: ['Samsara API', 'Verizon Connect', 'Geotab SDK', 'GPS / GNSS devices', 'MQTT (IoT messaging)', 'AWS IoT Greengrass'] },
  { group: 'Integration & EDI', color: '#6d28d9', items: ['EDI 850 / 856 / 940 / 945', 'SAP / Oracle / Dynamics', 'Shopify / Magento API', 'MuleSoft / Boomi', 'AS2 / SFTP', 'REST API middleware'] },
  { group: 'Cloud & DevOps', color: '#dc2626', items: ['AWS / GCP / Azure', 'Kubernetes / EKS', 'Terraform (IaC)', 'GitHub Actions CI/CD', 'Cloudflare CDN', 'Multi-region HA'] },
  { group: 'Database & Analytics', color: '#b45309', items: ['PostgreSQL / PostGIS', 'Redis (real-time track)', 'InfluxDB (GPS history)', 'Snowflake / BigQuery', 'Power BI / Metabase', 'Elasticsearch (search)'] },
];

const ENGAGEMENT = [
  { id: 'tms', name: 'Custom TMS / WMS Build', badge: 'Most Requested', bc: '#D97706', feat: true, icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0', headline: 'Purpose-built TMS or WMS for your operation.', desc: 'Full-cycle development of a custom Transportation or Warehouse Management System — carrier integration, shipment management, route optimisation, WMS with scanning, POD, and analytics. Discovery → architecture → agile sprints → go-live.', best: ['3PLs and 4PLs replacing generic WMS with a purpose-built platform', 'Retailers and e-tailers building their own carrier management system', 'Freight forwarders needing a modern TMS to replace manual processes', 'Last-mile delivery companies needing route optimisation and a driver app'], tl: 'Core TMS/WMS live in 12–16 weeks; full platform 5–8 months' },
  { id: 'lastmile', name: 'Last-Mile Delivery Platform', badge: 'Fast Growing', bc: '#14532d', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', headline: 'Driver app, route optimisation, and customer tracking.', desc: 'Last-mile delivery platform — route optimisation engine, driver iOS/Android app with turn-by-turn navigation, real-time customer tracking page, digital POD (signature/photo/OTP), ETA notifications, and delivery analytics.', best: ['Grocery and food delivery companies needing same-day delivery tech', 'Retailers building a delivery fleet alongside carrier network', 'Logistics startups launching an on-demand delivery service', 'Manufacturers delivering direct to end customers (D2C logistics)'], tl: 'MVP driver app and tracking page live in 8–12 weeks' },
  { id: 'integration', name: 'Carrier & ERP Integration Sprint', badge: 'Quick Win', bc: '#0369a1', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', headline: 'Carrier APIs and ERP/eCommerce connected fast.', desc: 'Fixed-scope integration of carrier APIs (FedEx, UPS, DHL, regional), ERP systems (SAP, Oracle, Dynamics), eCommerce platforms (Shopify, Magento, WooCommerce), and 3PL EDI into your logistics platform. Defined deliverables, fixed timeline.', best: ['eCommerce brands adding multi-carrier shipping to their platform', 'Logistics companies adding new carrier connections to their TMS', 'Retailers connecting SAP or Oracle ERP to their WMS/3PL', 'Companies building EDI connectivity for retail compliance (Target, Tesco)'], tl: 'Integration complete in 4–8 weeks' },
];

const TESTIMONIALS = [
  { text: "1Solutions built our multi-carrier TMS from scratch — rate shopping across 12 carriers, shipment booking, track and trace, POD management, and a customer portal. The system processes 6,000 shipments per day and has reduced our freight spend by 18% through better carrier selection. Their logistics domain knowledge is exceptional.", name: 'Anthony R.', role: 'CEO, Logistics Technology Company (UK)', init: 'AR', bg: '#0a2a18' },
  { text: "We hired 1Solutions to build our last-mile delivery platform — route optimisation, a driver app with digital POD, and a real-time customer tracking page. On-time delivery rate went from 84% to 96% within 3 months of go-live. The route optimiser reduced our cost-per-delivery by 22%. Brilliant logistics software team.", name: 'Priya N.', role: 'Head of Operations, D2C Delivery Company (AU)', init: 'PN', bg: '#163a28', feat: true },
  { text: "1Solutions built the WMS for our 3PL business — multi-client inventory management, directed put-away, wave picking, cartonisation, EDI integration for Walmart and Target compliance, and a client portal. We onboarded 8 new clients in the first 6 months because the platform made it easy to manage each client independently. Game-changing for our business.", name: 'David C.', role: 'Founder, Third-Party Logistics Provider (US)', init: 'DC', bg: '#1e3a5f' },
];

const WHY = [
  { t: '100+ Logistics Projects', d: '1Solutions has built TMS, WMS, last-mile platforms, fleet management systems, freight forwarding software, and carrier integrations for logistics companies in the UK, US, Australia, and Canada over 15+ years.' },
  { t: 'Carrier API Specialists', d: 'FedEx, UPS, DHL, Royal Mail, Australia Post, and 50+ carrier integrations. We know the quirks of each carrier API — authentication flows, rate structures, label formats, and tracking event data models — built from repeated real integrations.' },
  { t: 'Route Optimisation Expertise', d: 'Google OR-Tools, OSRM, Valhalla, and custom VRP solvers — we build route optimisation engines that handle time windows, vehicle capacity, driver hours, and real-time traffic re-routing. Not a simple point-to-point calculator.' },
  { t: 'Real-Time GPS Tracking at Scale', d: 'WebSocket-based real-time tracking, Redis-backed position caching, InfluxDB GPS history, and Elasticsearch geo-queries — our tracking systems handle thousands of vehicles without latency.' },
  { t: 'EDI & Retail Compliance', d: 'EDI 850/856/856/940/945 for Walmart, Target, Tesco, Coles, Amazon, and other major retailers. We build EDI mapping, validation, and error-handling that keeps your 3PL out of chargebacks.' },
  { t: 'PostGIS Geospatial Queries', d: 'PostgreSQL with PostGIS for territory management, delivery zone optimisation, nearest depot routing, and spatial reporting — proper geospatial database design, not client-side coordinate crunching.' },
  { t: 'Multi-Client 3PL Architecture', d: 'WMS and TMS platforms built for 3PL operators — tenant isolation per client, client-specific picking rules and labelling, consolidated reporting, and per-client billing modules. Not a single-tenant system poorly adapted.' },
  { t: 'Post-Launch SLA Support', d: 'Logistics platforms are operational systems — downtime costs money per shipment. SLA-backed post-launch support with P1 response under 2 hours, 24/7 monitoring, and on-call support during peak shipping periods (Black Friday, Christmas, end of quarter).' },
];

const FAQS = [
  { q: 'What logistics software does 1Solutions develop?', a: 'Transportation Management Systems (TMS), Warehouse Management Systems (WMS), last-mile delivery platforms with route optimisation, fleet management and telematics, freight forwarding software, carrier and 3PL API integrations, supply chain visibility platforms, 3PL/4PL management systems, and logistics analytics platforms.' },
  { q: 'Can you integrate with carrier APIs like FedEx, UPS, and DHL?', a: 'Yes — FedEx (Web Services, REST), UPS (Developer Kit), DHL (Express and Freight API), USPS, Royal Mail, Australia Post, TNT, and regional carriers. Also EasyPost, ShipStation, Shippit, and Starshipit for multi-carrier rate shopping. We normalise carrier responses into a standard data model your application can use without carrier-specific logic.' },
  { q: 'How long does it take to build a TMS or WMS?', a: 'Core TMS (carrier booking, rate shopping, tracking, POD): 12–16 weeks. Full TMS with dynamic routing, load optimisation, and customer portal: 6–9 months. WMS with receiving, put-away, pick/pack/ship, and barcode scanning: 14–18 weeks. We phase delivery so core workflows go live before all features are complete.' },
  { q: 'Can you build a route optimisation engine?', a: 'Yes — Google OR-Tools or OSRM-based route optimisation handling multi-stop routes with time windows, vehicle capacity, driver shift constraints, and priority deliveries. Available as an API to integrate into your TMS or dispatch system. Real-time dynamic re-routing using live traffic data from Google Maps, HERE, or TomTom.' },
  { q: 'What EDI formats do you support?', a: 'EDI 850 (PO), 856 (ASN), 810 (invoice), 940 (warehouse shipping order), 945 (warehouse shipping advice), and other X12 and EDIFACT transaction sets. AS2 and SFTP transmission. We build EDI for retail compliance (Walmart, Target, Amazon, Tesco, Coles) and 3PL-to-shipper connectivity. We also build modern EDI alternatives using API and webhook integration.' },
  { q: 'Can you build a driver mobile app with offline capability?', a: 'Yes — React Native driver app with offline-first architecture. Route and delivery manifests are downloaded when online; POD capture (signature, photo, OTP), status updates, and GPS tracking continue offline with sync when connectivity is restored. Critical for rural and warehouse areas with poor signal.' },
  { q: 'Can you integrate with our existing ERP (SAP, Oracle, Dynamics)?', a: 'Yes — bi-directional integration with SAP (BAPI/RFC, S/4HANA REST), Oracle ERP Cloud, Microsoft Dynamics 365, Epicor, NetSuite, and custom ERP systems. Typical logistics data flows: purchase orders, sales orders, inventory movements, shipment despatch advice, and proof of delivery confirmation synced back to ERP.' },
  { q: 'Do you build multi-client platforms for 3PLs?', a: 'Yes — WMS and TMS platforms with full tenant isolation per 3PL client: separate inventory, pick rules, labelling, customer portals, billing rates, and EDI configurations. Clients can see their own data only; the 3PL sees consolidated reporting across all clients. Onboarding a new client is configuration, not a code change.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => { if (!start) return; const n = parseInt(target.replace(/\D/g, ''), 10); if (!n) return; let t0 = null; const s = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) requestAnimationFrame(s); }; requestAnimationFrame(s); }, [start, target, duration]);
  return count;
}
function StatItem({ label, val, started }) {
  const n = useCountUp(val, 1800, started);
  const sfx = val.replace(/[\d,]/g, '');
  return (<div className="lgt-sc"><div className="lgt-sv">{started ? n + sfx : val}</div><div className="lgt-sl">{label}</div></div>);
}

export default function LogisticsSoftware() {
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
  const ac = '#14532d'; const txt = '#052e16'; const txt2 = '#14532d';
  return (
    <>
      <Head>
        <title>Logistics Software Development | TMS, WMS, Last-Mile, Fleet Management | 1Solutions</title>
        <meta name="description" content="Custom logistics software development — TMS, WMS, last-mile delivery platforms, route optimisation, fleet management, carrier integrations (FedEx, UPS, DHL), supply chain visibility, and 3PL platforms. 100+ logistics projects. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/logistics-software-development-services/" />
        <meta property="og:title" content="Logistics Software Development Services | 1Solutions" />
        <meta property="og:description" content="TMS, WMS, last-mile delivery, route optimisation, fleet management, and carrier integrations. 100+ logistics projects." />
        <meta property="og:url" content="https://www.1solutions.biz/logistics-software-development-services/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .lgt-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#f0fdf4 0%,#dcfce7 20%,#f0fdf9 50%,#fef9c3 75%,#f0f9ff 100%);color:${txt};line-height:1.6;position:relative;overflow-x:hidden}
          .lgt-page *,.lgt-page *::before,.lgt-page *::after{box-sizing:border-box}
          .lgt-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .lgt-o1{width:800px;height:800px;background:radial-gradient(circle,rgba(20,83,45,.16) 0%,transparent 70%);top:-220px;right:-200px}
          .lgt-o2{width:700px;height:700px;background:radial-gradient(circle,rgba(15,118,110,.13) 0%,transparent 70%);bottom:0;left:-200px}
          .lgt-o3{width:480px;height:480px;background:radial-gradient(circle,rgba(12,74,110,.08) 0%,transparent 70%);top:42%;left:-90px}
          .lgt-bc{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .lgt-bc ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:${ac}}
          .lgt-bc li{display:flex;align-items:center;gap:6px}.lgt-bc li::after{content:'/';opacity:.45}.lgt-bc li:last-child::after{display:none}
          .lgt-bc a{color:${txt};text-decoration:none}
          .lgt-hero{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto;padding:44px 40px 28px}
          .lgt-ey{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${ac};margin-bottom:14px}
          .lgt-hero h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,${txt} 0%,${ac} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .lgt-desc{font-size:16px;color:${txt2};line-height:1.65;max-width:720px;margin:0 auto 22px}
          .lgt-tr{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-bottom:24px}
          .lgt-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:5px 13px;font-size:12px;font-weight:600;color:${txt};box-shadow:0 2px 8px rgba(20,83,45,.07)}
          .lgt-dot{width:7px;height:7px;border-radius:50%;background:${ac};flex-shrink:0}
          .lgt-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .lgt-p{display:inline-block;padding:13px 34px;background:${ac};color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(20,83,45,.28)}
          .lgt-p:hover{background:${txt};transform:translateY(-2px)}
          .lgt-g{display:inline-block;padding:13px 34px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:${txt};font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .lgt-g:hover{background:rgba(255,255,255,.85);border-color:rgba(20,83,45,.5);transform:translateY(-2px)}
          .lgt-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:920px;margin:26px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(20,83,45,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .lgt-sc{padding:18px 16px;text-align:center;border-right:1px solid rgba(20,83,45,.10)}.lgt-sc:last-child{border-right:none}
          .lgt-sv{font-size:28px;font-weight:900;color:${ac};letter-spacing:-.5px;line-height:1}
          .lgt-sl{font-size:11px;color:${txt2};font-weight:500;margin-top:5px}
          .lgt-sec{padding:72px 40px;position:relative;z-index:1}
          .lgt-sec-alt{background:rgba(240,253,244,.55);border-top:1px solid rgba(20,83,45,.08);border-bottom:1px solid rgba(20,83,45,.08)}
          .lgt-in{max-width:1300px;margin:0 auto}
          .lgt-sey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .lgt-sh{font-size:44px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,#0f766e 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .lgt-sd{font-size:15px;color:${txt2};line-height:1.7;max-width:700px}
          .lgt-rv{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .lgt-rv.lgt-ok{opacity:1;transform:translateY(0)}
          .lgt-sk-g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
          .lgt-card{background:linear-gradient(135deg,rgba(240,253,244,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(20,83,45,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),border-color .2s}
          .lgt-card.lgt-cv{opacity:1;transform:translateY(0)}.lgt-card.lgt-cv:hover{transform:translateY(-5px);border-color:rgba(20,83,45,.25);box-shadow:0 14px 40px rgba(20,83,45,.12)}
          .lgt-card.feat{border-color:rgba(20,83,45,.18)}
          .lgt-cn{position:absolute;top:6px;right:12px;font-size:68px;font-weight:900;line-height:1;color:${ac};opacity:.05;pointer-events:none;user-select:none}
          .lgt-card h3{font-size:15px;font-weight:700;color:${txt};margin:0 0 7px;position:relative;z-index:1}
          .lgt-card p{font-size:13px;color:${txt2};line-height:1.65;margin:0;position:relative;z-index:1}
          .lgt-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,${ac},#0f766e);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top;transition:transform .3s}
          .lgt-card.lgt-cv:hover::before{transform:scaleY(1)}
          .lgt-sm{text-align:center;margin-top:20px}
          .lgt-bm{display:inline-block;background:#fff;border:1.5px solid rgba(20,83,45,.18);color:${txt};padding:9px 28px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .lgt-bm:hover{background:${ac};border-color:${ac};color:#fff;transform:translateY(-2px)}
          .lgt-tec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
          .lgt-tc2{background:linear-gradient(135deg,rgba(240,253,244,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:20px 18px;box-shadow:0 4px 24px rgba(20,83,45,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .lgt-tc2.lgt-sv2{opacity:1;transform:translateY(0)}.lgt-tc2.lgt-sv2:hover{border-color:rgba(20,83,45,.22);box-shadow:0 12px 36px rgba(20,83,45,.10)}
          .lgt-tg{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:10px;padding-bottom:7px;border-bottom:2px solid}
          .lgt-pills{display:flex;flex-wrap:wrap;gap:5px}
          .lgt-pill{display:inline-block;font-size:11px;font-weight:500;padding:3px 9px;border-radius:100px;border:1px solid}
          .lgt-en-g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
          .lgt-en{background:linear-gradient(135deg,rgba(240,253,244,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(20,83,45,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1),border-color .2s}
          .lgt-en.lgt-ev{opacity:1;transform:translateY(0)}.lgt-en.lgt-ev:hover{border-color:rgba(20,83,45,.22);box-shadow:0 14px 44px rgba(20,83,45,.12)}
          .lgt-en.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.45) 100%);border-color:rgba(217,119,6,.26);transform:translateY(-6px)}
          .lgt-en.feat.lgt-ev{transform:translateY(-6px)}.lgt-en.feat.lgt-ev:hover{transform:translateY(-10px)}
          .lgt-en-b{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:4px 11px;border-radius:100px;border:1px solid;margin-bottom:16px}
          .lgt-en-i{width:44px;height:44px;background:rgba(20,83,45,.08);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
          .lgt-en.feat .lgt-en-i{background:rgba(217,119,6,.10)}
          .lgt-en-n{font-size:20px;font-weight:900;color:${txt};margin:0 0 5px;letter-spacing:-.3px}
          .lgt-en-h{font-size:13px;font-weight:600;color:${ac};margin-bottom:10px}
          .lgt-en.feat .lgt-en-h{color:#D97706}
          .lgt-en-d{font-size:13px;color:${txt2};line-height:1.7;margin-bottom:14px}
          .lgt-en-ll{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${ac};margin-bottom:7px}
          .lgt-en-li{list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:6px}
          .lgt-en-li li{display:flex;align-items:flex-start;gap:7px;font-size:13px;color:#374151;line-height:1.5}
          .lgt-en-li li::before{content:'✓';font-weight:800;color:${ac};flex-shrink:0;margin-top:1px}
          .lgt-en.feat .lgt-en-li li::before{color:#D97706}
          .lgt-en-tl{font-size:11px;font-weight:600;color:#D97706;display:block;padding-top:10px;border-top:1px solid rgba(20,83,45,.08)}
          .lgt-en-a{display:block;margin-top:14px;padding:10px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(20,83,45,.09);color:${txt};border:1.5px solid rgba(20,83,45,.18)}
          .lgt-en-a:hover{background:${txt};color:#fff}
          .lgt-en.feat .lgt-en-a{background:${ac};color:#fff;border-color:${ac}}
          .lgt-en.feat .lgt-en-a:hover{background:${txt};border-color:${txt}}
          .lgt-tg2{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
          .lgt-tc{background:linear-gradient(135deg,rgba(240,253,244,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:26px 22px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 24px rgba(20,83,45,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
          .lgt-tc.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(240,253,244,.42) 100%);border-color:rgba(217,119,6,.20)}
          .lgt-tc.lgt-tv{opacity:1;transform:translateY(0)}.lgt-tc.lgt-tv:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(20,83,45,.12)}
          .lgt-stars{font-size:15px;color:#D97706;letter-spacing:2px}
          .lgt-ttxt{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .lgt-au{display:flex;align-items:center;gap:11px}
          .lgt-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .lgt-an{font-size:14px;font-weight:700;color:${txt}}
          .lgt-ar{font-size:12px;color:#6b7280}
          .lgt-wy-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px}
          .lgt-wc{background:linear-gradient(135deg,rgba(240,253,244,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:22px 18px;box-shadow:0 4px 24px rgba(20,83,45,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px) scale(.97);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .lgt-wc.lgt-wv{opacity:1;transform:translateY(0) scale(1)}.lgt-wc.lgt-wv:hover{transform:translateY(-4px) scale(1);border-color:rgba(20,83,45,.22);box-shadow:0 12px 36px rgba(20,83,45,.10)}
          .lgt-wd{width:9px;height:9px;border-radius:50%;background:${ac};margin-bottom:10px}
          .lgt-wc h3{font-size:13px;font-weight:700;color:${txt};margin:0 0 7px;line-height:1.35}
          .lgt-wc p{font-size:12px;color:${txt2};line-height:1.6;margin:0}
          .lgt-ct{padding:64px 40px;background:linear-gradient(135deg,rgba(240,253,244,.55) 0%,rgba(255,255,255,.60) 40%,rgba(240,249,255,.50) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .lgt-ct-g{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;gap:28px;align-items:start}
          .lgt-cth{font-size:38px;font-weight:900;line-height:1.18;margin:0 0 12px;background:linear-gradient(90deg,${txt} 0%,${ac} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .lgt-ctd{font-size:14px;color:${txt2};line-height:1.6;margin:0 0 18px}
          .lgt-ben{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px}
          .lgt-be{display:flex;gap:9px;align-items:flex-start}
          .lgt-bi{flex-shrink:0;color:${ac};font-weight:800;font-size:15px;margin-top:1px}
          .lgt-be p{font-size:13px;color:${txt2};margin:0;line-height:1.5}
          .lgt-fb{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(240,253,244,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:18px;padding:30px;box-shadow:0 8px 40px rgba(20,83,45,.08),inset 0 1px 0 rgba(255,255,255,1)}
          .lgt-fb h3{font-size:20px;font-weight:700;color:${txt};margin:0 0 20px}
          .lgt-form{display:flex;flex-direction:column;gap:12px}
          .lgt-fr{display:grid;grid-template-columns:1fr 1fr;gap:11px}
          .lgt-fg{display:flex;flex-direction:column;gap:4px}
          .lgt-fg.full{grid-column:1/-1}
          .lgt-fg label{font-size:12px;font-weight:500;color:${txt}}
          .lgt-fg input,.lgt-fg textarea,.lgt-fg select{padding:10px 12px;border:1px solid rgba(20,83,45,.14);border-radius:6px;font-size:13px;font-family:inherit;color:${txt};background:rgba(255,255,255,.55);transition:border-color .2s}
          .lgt-fg input:focus,.lgt-fg textarea:focus,.lgt-fg select:focus{outline:none;border-color:${ac};box-shadow:0 0 0 3px rgba(20,83,45,.10)}
          .lgt-co{display:flex;gap:8px;align-items:flex-start}
          .lgt-co input{margin-top:3px;width:14px;height:14px}
          .lgt-co label{font-size:11px;color:${txt2};line-height:1.5}.lgt-co a{color:${txt}}
          .lgt-sub{width:100%;padding:13px;background:${ac};border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(20,83,45,.25)}
          .lgt-sub:hover{background:${txt};transform:translateY(-2px)}
          .lgt-fq{padding:72px 40px;background:rgba(240,253,244,.55);border-top:1px solid rgba(20,83,45,.08);position:relative;z-index:1}
          .lgt-fq h2{font-size:42px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,#0f766e 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .lgt-fq-sub{font-size:15px;color:${txt2};margin:0 0 32px}
          .lgt-fql{display:flex;flex-direction:column;gap:9px}
          .lgt-fi{background:linear-gradient(135deg,rgba(240,253,244,.55) 0%,rgba(255,255,255,.88) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(20,83,45,.05);transition:border-color .2s}
          .lgt-fi.open{border-color:rgba(20,83,45,.28)}.lgt-fi.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,${ac},#0f766e);border-radius:3px 3px 0 0}
          .lgt-fqb{width:100%;background:none;border:none;padding:18px 18px 18px 52px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:12px;font-family:inherit;position:relative}
          .lgt-fqn{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:rgba(20,83,45,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:5px}
          .lgt-fi.open .lgt-fqn{background:${ac};color:#fff}
          .lgt-fqb span{font-size:14px;font-weight:600;color:${txt};line-height:1.4}.lgt-fi.open .lgt-fqb span{color:${ac}}
          .lgt-fch{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform .3s}.lgt-fi.open .lgt-fch{transform:rotate(180deg);color:${ac}}
          .lgt-faw{overflow:hidden;transition:max-height .35s ease;max-height:0}.lgt-fi.open .lgt-faw{max-height:400px}
          .lgt-fa{padding:0 18px 18px 52px;font-size:14px;color:#4b5563;line-height:1.8}
          .lgt-rel{padding:64px 40px;background:rgba(240,253,244,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .lgt-ri{max-width:1300px;margin:0 auto;text-align:center}
          .lgt-ri h2{font-size:30px;font-weight:900;background:linear-gradient(90deg,${txt} 0%,#0f766e 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 10px}
          .lgt-ri hr{border:none;border-top:1px solid rgba(20,83,45,.10);margin:24px 0}
          .lgt-rts{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
          .lgt-rt{display:inline-block;padding:9px 18px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all .22s}
          .lgt-rt:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.08)}
          .lgt-ra{background:rgba(20,83,45,.09);border-color:rgba(20,83,45,.28);color:#14532d}
          .lgt-rb{background:rgba(120,53,15,.09);border-color:rgba(120,53,15,.28);color:#78350f}
          .lgt-rc{background:rgba(12,74,110,.09);border-color:rgba(12,74,110,.28);color:#0c4a6e}
          .lgt-rd{background:rgba(190,24,93,.09);border-color:rgba(190,24,93,.28);color:#9d174d}
          @media(max-width:1024px){.lgt-hero h1,.lgt-sh,.lgt-fq h2{font-size:34px}.lgt-sk-g{grid-template-columns:repeat(2,1fr)}.lgt-tec-g{grid-template-columns:repeat(2,1fr)}.lgt-en-g{grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto}.lgt-en.feat{transform:none}.lgt-en.feat.lgt-ev{transform:none}.lgt-en.feat.lgt-ev:hover{transform:translateY(-4px)}.lgt-wy-g{grid-template-columns:repeat(2,1fr)}.lgt-tg2{grid-template-columns:1fr}.lgt-ct-g{grid-template-columns:1fr}}
          @media(max-width:768px){.lgt-bc,.lgt-hero,.lgt-sec,.lgt-ct,.lgt-fq,.lgt-rel{padding-left:20px;padding-right:20px}.lgt-hero{padding-top:28px;padding-bottom:16px}.lgt-hero h1{font-size:26px}.lgt-stats{grid-template-columns:1fr 1fr}.lgt-sc:nth-child(2){border-right:none}.lgt-sc:nth-child(3),.lgt-sc:nth-child(4){border-top:1px solid rgba(20,83,45,.10)}.lgt-sc:nth-child(4){border-right:none}.lgt-sk-g,.lgt-tec-g,.lgt-wy-g{grid-template-columns:1fr}.lgt-fr{grid-template-columns:1fr}.lgt-cth{font-size:26px}}
        `}</style>
      </Head>
      <div className="lgt-page">
        <div className="lgt-orb lgt-o1" /><div className="lgt-orb lgt-o2" /><div className="lgt-orb lgt-o3" />
        <nav className="lgt-bc" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList"><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li><li><span>Industries</span></li><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">Logistics Software</span><meta itemProp="position" content="3" /></li></ol></nav>
        <section className="lgt-hero">
          <span className="lgt-ey">Logistics & Supply Chain Industry</span>
          <h1>Logistics Software Development — TMS, WMS, Last-Mile & Fleet Management</h1>
          <p className="lgt-desc">Custom logistics technology for 3PLs, carriers, retailers, and supply chain companies — Transportation Management Systems (TMS), Warehouse Management Systems (WMS), last-mile delivery platforms, route optimisation, fleet management, carrier integrations, and supply chain visibility. 100+ logistics projects. 15+ years.</p>
          <div className="lgt-tr">{['TMS Development','WMS Development','Last-Mile Delivery','Route Optimisation','Carrier API Integration'].map(b => (<div className="lgt-badge" key={b}><span className="lgt-dot" />{b}</div>))}</div>
          <div className="lgt-ctas"><Link href="#contact" className="lgt-p">Discuss Your Logistics Platform</Link><Link href="#solutions" className="lgt-g">View Solutions →</Link></div>
        </section>
        <div className="lgt-stats" ref={stR}>{[['100+','Logistics Projects'],['15+','Years Dev Experience'],['22%','Avg Cost-per-Delivery Reduction'],['99.9%','Platform Uptime SLA']].map(([v, l]) => <StatItem key={l} label={l} val={v} started={ss} />)}</div>
        <section id="solutions" className="lgt-sec"><div className="lgt-in"><div className={`lgt-rv${vis.has('sk') ? ' lgt-ok' : ''}`} ref={el => { secR.current['sk'] = el; }}><span className="lgt-sey">Logistics Technology Solutions</span><h2 className="lgt-sh">What We Build for Logistics & Supply Chain</h2><p className="lgt-sd">TMS, WMS, last-mile delivery, route optimisation, fleet management, freight forwarding software, carrier integrations, supply chain visibility, 3PL platforms, and logistics analytics.</p></div><div className="lgt-sk-g" ref={skR}>{visS.map((s, i) => (<div key={s.n} className={`lgt-card${s.feat ? ' feat' : ''}${vSk.includes(i) ? ' lgt-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="lgt-cn">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>{SOLUTIONS.length > 6 && <div className="lgt-sm"><button className="lgt-bm" onClick={() => setShowAll(p => !p)}>{showAll ? 'Show fewer ↑' : `Show all ${SOLUTIONS.length} solutions ↓`}</button></div>}</div></section>
        <section className="lgt-sec lgt-sec-alt"><div className="lgt-in"><div className={`lgt-rv${vis.has('stk') ? ' lgt-ok' : ''}`} ref={el => { secR.current['stk'] = el; }}><span className="lgt-sey">Technology Stack</span><h2 className="lgt-sh">Logistics Technology We Work With</h2><p className="lgt-sd">React Native, Node.js, Google OR-Tools, FedEx/UPS/DHL APIs, Samsara telematics, PostGIS, AWS IoT, and the full logistics integration ecosystem.</p></div><div className="lgt-tec-g" ref={stGr}>{TECH_STACK.map((g, i) => (<div key={g.group} className={`lgt-tc2${vSt.includes(i) ? ' lgt-sv2' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="lgt-tg" style={{ color: g.color, borderBottomColor: g.color + '33' }}>{g.group}</div><div className="lgt-pills">{g.items.map(it => <span key={it} className="lgt-pill" style={{ color: g.color, background: g.color + '12', borderColor: g.color + '30' }}>{it}</span>)}</div></div>))}</div></div></section>
        <section className="lgt-sec"><div className="lgt-in"><div className={`lgt-rv${vis.has('eng') ? ' lgt-ok' : ''}`} ref={el => { secR.current['eng'] = el; }}><span className="lgt-sey">Engagement Models</span><h2 className="lgt-sh">How We Work with Logistics Companies</h2><p className="lgt-sd">Custom TMS/WMS build, last-mile delivery platform, or carrier and ERP integration sprint — structured for operational environments and phased rollouts.</p></div><div className="lgt-en-g" ref={enR}>{ENGAGEMENT.map((m, i) => (<div key={m.id} className={`lgt-en${m.feat ? ' feat' : ''}${vEn.includes(i) ? ' lgt-ev' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><span className="lgt-en-b" style={{ color: m.bc, borderColor: m.bc + '44', background: m.bc + '14' }}>{m.badge}</span><div className="lgt-en-i"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={m.feat ? '#D97706' : ac} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg></div><div className="lgt-en-n">{m.name}</div><div className="lgt-en-h">{m.headline}</div><div className="lgt-en-d">{m.desc}</div><div className="lgt-en-ll">Best for</div><ul className="lgt-en-li">{m.best.map(b => <li key={b}>{b}</li>)}</ul><span className="lgt-en-tl">{m.tl}</span><Link href="#contact" className="lgt-en-a">Get a free estimate →</Link></div>))}</div></div></section>
        <section className="lgt-sec lgt-sec-alt"><div className="lgt-in"><div className={`lgt-rv${vis.has('ts') ? ' lgt-ok' : ''}`} ref={el => { secR.current['ts'] = el; }}><span className="lgt-sey">Client Outcomes</span><h2 className="lgt-sh">Logistics Technology Clients</h2><p className="lgt-sd">CEOs, operations directors, and logistics founders on building logistics technology with 1Solutions.</p></div><div className="lgt-tg2" ref={teR}>{TESTIMONIALS.map((t, i) => (<div key={i} className={`lgt-tc${t.feat ? ' feat' : ''}${vTe.includes(i) ? ' lgt-tv' : ''}`} style={{ transitionDelay: `${i * 90}ms` }} itemScope itemType="https://schema.org/Review"><div className="lgt-stars">★★★★★</div><p className="lgt-ttxt" itemProp="reviewBody">{t.text}</p><div className="lgt-au"><div className="lgt-av" style={{ background: t.bg }}>{t.init}</div><div><div className="lgt-an" itemProp="author">{t.name}</div><div className="lgt-ar">{t.role}</div></div></div></div>))}</div></div></section>
        <section className="lgt-sec"><div className="lgt-in"><div className={`lgt-rv${vis.has('wy') ? ' lgt-ok' : ''}`} ref={el => { secR.current['wy'] = el; }}><span className="lgt-sey">Why 1Solutions</span><h2 className="lgt-sh">Why Logistics Companies Choose 1Solutions</h2><p className="lgt-sd">Carrier API specialists, route optimisation expertise, real-time GPS tracking at scale, EDI compliance, PostGIS geospatial queries, multi-client 3PL architecture, and 24/7 SLA support during peak shipping periods.</p></div><div className="lgt-wy-g" ref={whR}>{WHY.map((c, i) => (<div key={i} className={`lgt-wc${vWh.includes(i) ? ' lgt-wv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="lgt-wd" /><h3>{c.t}</h3><p>{c.d}</p></div>))}</div></div></section>
        <section id="contact" className="lgt-ct"><div className="lgt-ct-g"><div><h2 className="lgt-cth">Build Your Logistics Platform</h2><p className="lgt-ctd">Share your logistics technology requirements — TMS, WMS, last-mile, route optimisation, or carrier integration — and we will respond within 24 hours with a proposal, timeline, and team composition.</p><div className="lgt-ben">{[['✓','Technical proposal within 24–48 hours'],['✓','Carrier API and route optimisation specialists'],['✓','NDA signed before any technical discussions'],['✓','100+ logistics projects — TMS, WMS, last-mile, fleet management'],['✓','Phased rollout approach, SLA-backed post-launch support']].map(([ic, tx]) => (<div className="lgt-be" key={tx}><span className="lgt-bi">{ic}</span><p>{tx}</p></div>))}</div></div>
        <div className="lgt-fb"><h3>Tell Us About Your Logistics Project</h3><form className="lgt-form" onSubmit={e => e.preventDefault()}><div className="lgt-fr"><div className="lgt-fg"><label>Full Name *</label><input type="text" placeholder="Your name" required /></div><div className="lgt-fg"><label>Work Email *</label><input type="email" placeholder="you@company.com" required /></div></div><div className="lgt-fr"><div className="lgt-fg"><label>Company</label><input type="text" placeholder="Company name" /></div><div className="lgt-fg"><label>Phone / WhatsApp</label><input type="tel" placeholder="+1 555 000 0000" /></div></div><div className="lgt-fg full"><label>Type of Logistics Platform *</label><select required><option value="">Select...</option><option>Transportation Management System (TMS)</option><option>Warehouse Management System (WMS)</option><option>Last-Mile Delivery Platform</option><option>Route Optimisation Engine</option><option>Fleet Management & Telematics</option><option>Freight Forwarding / Brokerage Software</option><option>Carrier & 3PL API Integration</option><option>Supply Chain Visibility Platform</option><option>3PL / 4PL Management Platform</option><option>Logistics Analytics Dashboard</option><option>Other</option></select></div><div className="lgt-fg full"><label>Project Description *</label><textarea rows={4} placeholder="Describe your logistics software project — current systems (if any), shipment volumes, carrier network, key challenges, and timeline..." required /></div><div className="lgt-co"><input type="checkbox" required /><label>I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label></div><button type="submit" className="lgt-sub">Get a Logistics Platform Proposal →</button></form></div></div></section>
        <section className="lgt-fq"><div className="lgt-in" style={{ maxWidth: 840 }}><span className="lgt-sey">FAQ</span><h2>Logistics Software — FAQ</h2><p className="lgt-fq-sub">TMS, WMS, last-mile delivery, route optimisation, carrier integrations, EDI, ERP connectivity, and 3PL platforms.</p><div className="lgt-fql">{FAQS.map((f, i) => (<div key={i} className={`lgt-fi${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="lgt-fqb" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="lgt-fqn">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{f.q}</span><svg className="lgt-fch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="lgt-faw"><div className="lgt-fa" itemProp="text">{f.a}</div></div></div>))}</div></div></section>
        <section className="lgt-rel"><div className="lgt-ri"><span className="lgt-sey">Related Services</span><h2>Related Industry & Technology Services</h2><hr /><div className="lgt-rts">{[['/manufacturing-software-development-services/','Manufacturing Software','lgt-rb'],['/retail-ecommerce-software-development/','Retail & eCommerce','lgt-rd'],['/real-estate-software-development/','Real Estate Software','lgt-rc'],['/travel-and-tourism-software-solutions/','Travel & Tourism','lgt-rc'],['/fintech-software-development-company/','FinTech Software','lgt-rb'],['/it-outsourcing-services/','IT Outsourcing','lgt-ra'],['/offshore-development-company/','Offshore Development','lgt-rd'],['/mobile-app-development/','Mobile Apps','lgt-ra']].map(([hr, lb, cl]) => (<Link key={hr} href={hr} className={`lgt-rt ${cl}`}>{lb}</Link>))}</div></div></section>
      </div>
    </>
  );
}
