import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#004040';
const ACCENT_MID = '#009999';
const ACCENT_RGB = '0, 64, 64';

const challenges = [
  {
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10',
    title: 'Amazon Loses More Inventory Than You Realise',
    desc: "Amazon's FBA warehouses process millions of units daily across hundreds of facilities. Items get lost during receiving, misplaced during storage, miscounted in transfer between warehouses, or damaged by warehouse equipment. Most sellers are owed reimbursements for 1-3% of their total FBA inventory value every month — and most never know it.",
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Reimbursement Claims Are Time-Sensitive',
    desc: 'Amazon limits reimbursement claims to specific windows (typically 9-18 months depending on claim type). Sellers who do not reconcile regularly forfeit valid claims permanently. The most common reason sellers lose legitimate reimbursements is simply running out the clock.',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'The Claim Process Is Complex and Tedious',
    desc: 'Filing an FBA reimbursement claim requires pulling reconciliation reports, cross-referencing shipment contents against received quantities, identifying the specific FNSKU-level discrepancies, drafting the case, and following up with Amazon Seller Support. Most sellers do not have the time, tools, or expertise to do this systematically.',
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Storage Fee Overcharges Go Unnoticed',
    desc: 'Amazon sometimes charges incorrect long-term storage fees, applies wrong cubic foot measurements to products, or continues billing for units that have already been returned or disposed of. Without a systematic fee audit, sellers pay thousands annually in fees they should not owe.',
  },
];

const services = [
  {
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10',
    title: 'Inbound Shipment Reconciliation',
    desc: 'Line-by-line audit of every FBA shipment you have sent in the past 18 months, comparing quantity shipped vs quantity received to identify every discrepancy eligible for reimbursement.',
  },
  {
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    title: 'Lost & Damaged Inventory Claims',
    desc: "Identification and filing of claims for inventory lost in Amazon's warehouse network, damaged by Amazon's handling, or destroyed without your authorisation.",
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'FBA Fee Audit',
    desc: 'Systematic review of your FBA fulfilment fees, storage fees, and long-term storage fees for overcharges, incorrect product dimensions, and billing errors.',
  },
  {
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    title: 'Reimbursement Claim Filing & Follow-Up',
    desc: 'Professional claim drafting, submission through Seller Central, and persistent follow-up with Amazon Seller Support until claims are approved or formally escalated.',
  },
  {
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    title: 'Returns Reconciliation',
    desc: 'Audit of customer returns to ensure all returned units are received and credited correctly — identifying units that were "returned" but never actually made it back to FBA inventory.',
  },
  {
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'Removal Order Discrepancy Audit',
    desc: 'Verification that units removed from FBA arrived correctly at your nominated address, with claims filed for any missing units in the removal process.',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Ongoing Monthly Reconciliation',
    desc: 'Continuous monthly monitoring of your FBA account to catch discrepancies in real time, maximising claim eligibility windows and providing a monthly recovery report.',
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Seller Central Case Management',
    desc: 'Expert handling of Amazon Seller Support cases, escalation to internal teams when initial claims are rejected, and documentation of all recovery activity.',
  },
];

const caseStudies = [
  {
    badge: 'Case Study',
    seller: 'US Consumer Electronics Seller',
    before: 'Unknown FBA losses',
    after: '$47,200 recovered in 90 days',
    time: '90 days',
    actions: [
      '18-month shipment reconciliation audit identified 340 discrepant units',
      'Lost inventory claims filed for 12 FBA facilities',
      'Fee audit recovered $3,100 in long-term storage overcharges',
    ],
  },
  {
    badge: 'Case Study',
    seller: 'UK Beauty & Skincare Brand',
    before: '$0 in historic claims filed',
    after: '$8,200/mo ongoing recovery',
    time: 'Ongoing',
    actions: [
      'Systematic monthly reconciliation programme established',
      'Customer returns audit identified 28% of returns not credited correctly',
      'Amazon escalation team engaged for 6 rejected high-value claims',
    ],
  },
];

const steps = [
  { n: '01', title: 'FBA Account Access & Data Pull', desc: 'Secure read-only access to Seller Central; we pull all inventory event reports, shipment reports, and fee billing history for the past 18 months.' },
  { n: '02', title: 'Shipment Reconciliation Audit', desc: 'Line-by-line comparison of every inbound shipment against received quantities to map all unit discrepancies by FNSKU and facility.' },
  { n: '03', title: 'Claims Identification & Prioritisation', desc: 'All eligible claims categorised by type (lost, damaged, returns, fees) and prioritised by value and time-sensitivity.' },
  { n: '04', title: 'Claim Filing', desc: 'Professional claims drafted and submitted to Amazon Seller Support within 48 hours of audit completion.' },
  { n: '05', title: 'Follow-Up & Escalation', desc: "Persistent follow-up on open cases; escalation to Amazon's internal reconciliation team for rejected high-value claims." },
  { n: '06', title: 'Recovery Report', desc: 'Detailed monthly report showing all filed claims, approved reimbursements, pending cases, and total recovered amount.' },
];

const FAQS = [
  { q: "How do you access my Amazon Seller Central data?", a: "We use secondary user permissions within your Seller Central account — you grant us specific permissions (inventory, reports, cases) and can revoke access at any time. We never request your primary login credentials. The access level we need is limited to reading reports, submitting support cases, and viewing inventory data." },
  { q: "What types of FBA reimbursements can you recover?", a: "We file claims for the full range of FBA reimbursement categories: inventory lost in transit to Amazon fulfilment centres, inventory damaged at fulfilment centres, customer returns not restocked correctly, units destroyed without authorisation, inbound shipment quantity discrepancies, and customer refunds issued without inventory being returned. Most sellers have unclaimed reimbursements across multiple categories." },
  { q: "How much can I expect to recover?", a: "Most FBA sellers with 6 or more months of history recover 1 to 3 percent of their annual FBA revenue in our first audit. For a seller doing $500K per year in FBA, that is typically $5,000 to $15,000 recovered. The exact amount depends on how long since the last reconciliation and how many inbound shipment discrepancies have accumulated." },
  { q: "How long does the reconciliation process take?", a: "Initial audit and claim filing typically takes 5 to 10 business days depending on the volume of historical data. Amazon response time on claims varies: straightforward inventory discrepancy claims are typically resolved within 2 to 4 weeks. Complex cases requiring escalation can take 6 to 12 weeks." },
  { q: "Do I need to do anything during the process?", a: "Very little. We handle the full process from data pull through claim submission and follow-up. You may need to provide documentation such as your original inbound shipment packing lists if Amazon disputes a claim, but most claims are resolved using data we pull from your Seller Central reports directly." },
  { q: "What are the time limits for filing FBA reimbursement claims?", a: "Amazon has a 9-month lookback window for most claim types — claims older than 9 months from the incident date are no longer eligible. This is why regular reconciliation is important. Some claim types such as overcharge fees have different windows. We file all eligible claims as quickly as possible after the audit to avoid approaching these deadlines." },
];

export default function FBAReconciliation() {
  const [form, setForm] = useState({ name: '', email: '', company: '', revenue: 'Under $10K/mo', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Head>
        <title>Amazon FBA Shipment Reconciliation Services | FBA Reimbursement Experts | 1Solutions</title>
        <meta name="description" content="Recover lost FBA revenue with 1Solutions. We audit Amazon FBA shipments, file reimbursement claims for lost and damaged inventory, and recover money Amazon owes you." />
        <link rel="canonical" href="https://1solutions.biz/amazon-fba-shipment-reconciliation-services/" />
      </Head>

      <style>{`
        .fbar-page { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; }

        .fbar-breadcrumb { background: #f8f9fa; border-bottom: 1px solid #e9ecef; padding: 12px 0; }
        .fbar-breadcrumb-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; gap: 8px; font-size: 14px; }
        .fbar-breadcrumb a { color: ${ACCENT}; text-decoration: none; }
        .fbar-breadcrumb a:hover { text-decoration: underline; }
        .fbar-breadcrumb-sep { color: #adb5bd; }
        .fbar-breadcrumb-current { color: #6c757d; }

        .fbar-hero { background: linear-gradient(135deg, #001919 0%, #004040 60%, #006060 100%); color: #fff; padding: 80px 24px 72px; position: relative; overflow: hidden; }
        .fbar-hero-orb1 { position: absolute; top: -80px; right: -80px; width: 400px; height: 400px; background: rgba(${ACCENT_RGB}, 0.4); border-radius: 50%; filter: blur(80px); pointer-events: none; }
        .fbar-hero-orb2 { position: absolute; bottom: -100px; left: -60px; width: 300px; height: 300px; background: rgba(0,153,153,0.2); border-radius: 50%; filter: blur(60px); pointer-events: none; }
        .fbar-hero-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
        .fbar-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 50px; padding: 6px 16px; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 24px; }
        .fbar-eyebrow-dot { width: 6px; height: 6px; background: #4ade80; border-radius: 50%; }
        .fbar-hero h1 { font-size: clamp(28px, 4vw, 52px); font-weight: 800; line-height: 1.15; max-width: 860px; margin: 0 0 24px; }
        .fbar-hero-desc { font-size: 18px; line-height: 1.7; max-width: 760px; opacity: 0.9; margin-bottom: 40px; }
        .fbar-stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.15); border-radius: 12px; overflow: hidden; margin-bottom: 40px; }
        .fbar-stat { background: rgba(255,255,255,0.08); padding: 20px 16px; text-align: center; }
        .fbar-stat-num { font-size: 28px; font-weight: 800; color: #fff; display: block; }
        .fbar-stat-label { font-size: 12px; opacity: 0.75; margin-top: 4px; display: block; }
        .fbar-hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 36px; }
        .fbar-btn-primary { background: #fff; color: ${ACCENT}; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: none; cursor: pointer; transition: transform 0.2s; }
        .fbar-btn-primary:hover { transform: translateY(-2px); }
        .fbar-btn-secondary { background: transparent; color: #fff; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: 2px solid rgba(255,255,255,0.4); cursor: pointer; transition: border-color 0.2s; }
        .fbar-btn-secondary:hover { border-color: #fff; }
        .fbar-trust-badges { display: flex; flex-wrap: wrap; gap: 12px; }
        .fbar-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; padding: 6px 12px; font-size: 13px; }
        .fbar-badge-check { color: #4ade80; font-size: 14px; }

        .fbar-challenges { padding: 80px 24px; background: #fff; }
        .fbar-section-inner { max-width: 1200px; margin: 0 auto; }
        .fbar-section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${ACCENT}; margin-bottom: 12px; }
        .fbar-section-h2 { font-size: clamp(24px, 3vw, 40px); font-weight: 800; margin: 0 0 16px; line-height: 1.2; }
        .fbar-section-h2 span { background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .fbar-section-sub { font-size: 17px; color: #555; max-width: 700px; margin-bottom: 48px; line-height: 1.6; }
        .fbar-challenges-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .fbar-challenge-card { background: #f8f9fa; border-radius: 16px; padding: 28px 24px; border: 1px solid #e9ecef; }
        .fbar-challenge-icon { width: 48px; height: 48px; background: rgba(${ACCENT_RGB}, 0.08); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .fbar-challenge-icon svg { width: 24px; height: 24px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .fbar-challenge-title { font-size: 16px; font-weight: 700; margin: 0 0 10px; color: #1a1a2e; }
        .fbar-challenge-desc { font-size: 14px; color: #555; line-height: 1.6; margin: 0; }

        .fbar-services { padding: 80px 24px; background: linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%); }
        .fbar-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .fbar-service-card { background: rgba(255,255,255,0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(${ACCENT_RGB}, 0.12); border-radius: 16px; padding: 28px 24px; transition: transform 0.2s, box-shadow 0.2s; }
        .fbar-service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(${ACCENT_RGB}, 0.12); }
        .fbar-service-icon { width: 48px; height: 48px; background: linear-gradient(135deg, rgba(${ACCENT_RGB}, 0.1) 0%, rgba(0,153,153,0.08) 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .fbar-service-icon svg { width: 24px; height: 24px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .fbar-service-title { font-size: 16px; font-weight: 700; margin: 0 0 8px; color: #1a1a2e; }
        .fbar-service-desc { font-size: 14px; color: #555; line-height: 1.6; margin: 0; }

        .fbar-results { padding: 64px 24px; background: linear-gradient(135deg, #001919 0%, #004040 100%); color: #fff; }
        .fbar-results-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: 1200px; margin: 0 auto; text-align: center; }
        .fbar-result-num { font-size: 52px; font-weight: 900; line-height: 1; display: block; }
        .fbar-result-label { font-size: 16px; opacity: 0.8; margin-top: 8px; display: block; }

        .fbar-cases { padding: 80px 24px; background: #fff; }
        .fbar-cases-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        .fbar-case-card { background: #fff; border: 1px solid #e9ecef; border-radius: 20px; padding: 36px 32px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .fbar-case-badge { display: inline-block; background: rgba(${ACCENT_RGB}, 0.08); color: ${ACCENT}; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; }
        .fbar-case-seller { font-size: 20px; font-weight: 800; margin: 0 0 20px; color: #1a1a2e; }
        .fbar-case-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .fbar-case-metric { background: #f8f9fa; border-radius: 10px; padding: 14px 16px; }
        .fbar-case-metric-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 4px; }
        .fbar-case-metric-val { font-size: 16px; font-weight: 700; color: #1a1a2e; }
        .fbar-case-metric-val.fbar-after { color: ${ACCENT}; }
        .fbar-case-time { font-size: 12px; color: #888; margin-bottom: 20px; font-weight: 600; }
        .fbar-case-actions { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .fbar-case-action { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: #444; line-height: 1.5; }
        .fbar-case-action-dot { width: 6px; height: 6px; background: ${ACCENT}; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }

        .fbar-process { padding: 80px 24px; background: #fafafa; }
        .fbar-process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .fbar-step-card { background: #fff; border-radius: 16px; padding: 28px 24px; border: 1px solid #e9ecef; position: relative; overflow: hidden; }
        .fbar-step-num { position: absolute; top: 16px; right: 20px; font-size: 56px; font-weight: 900; color: rgba(${ACCENT_RGB}, 0.06); line-height: 1; pointer-events: none; }
        .fbar-step-badge { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: ${ACCENT}; color: #fff; border-radius: 10px; font-size: 14px; font-weight: 800; margin-bottom: 16px; }
        .fbar-step-title { font-size: 16px; font-weight: 700; margin: 0 0 8px; color: #1a1a2e; }
        .fbar-step-desc { font-size: 14px; color: #666; line-height: 1.6; margin: 0; }

        .fbar-contact { padding: 80px 24px; background: linear-gradient(180deg, #fff 0%, #f8f9fa 100%); }
        .fbar-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .fbar-contact-h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 800; margin: 0 0 16px; line-height: 1.25; }
        .fbar-contact-h2 span { background: linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_MID} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .fbar-contact-desc { font-size: 16px; color: #555; line-height: 1.7; margin-bottom: 36px; }
        .fbar-contact-items { display: flex; flex-direction: column; gap: 16px; }
        .fbar-contact-item { display: flex; align-items: center; gap: 12px; font-size: 15px; color: #333; }
        .fbar-contact-item svg { width: 20px; height: 20px; stroke: ${ACCENT}; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
        .fbar-form-card { background: #fff; border-radius: 20px; padding: 36px 32px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); border: 1px solid #e9ecef; }
        .fbar-form-group { margin-bottom: 20px; }
        .fbar-form-label { display: block; font-size: 13px; font-weight: 600; color: #444; margin-bottom: 6px; }
        .fbar-form-input, .fbar-form-select, .fbar-form-textarea { width: 100%; padding: 11px 14px; border: 1.5px solid #dde1e7; border-radius: 8px; font-size: 15px; color: #1a1a2e; background: #fff; box-sizing: border-box; transition: border-color 0.2s; font-family: inherit; }
        .fbar-form-input:focus, .fbar-form-select:focus, .fbar-form-textarea:focus { outline: none; border-color: ${ACCENT}; }
        .fbar-form-textarea { resize: vertical; min-height: 110px; }
        .fbar-form-submit { width: 100%; background: ${ACCENT}; color: #fff; border: none; border-radius: 8px; padding: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .fbar-form-submit:hover { opacity: 0.88; }
        .fbar-success { text-align: center; padding: 40px 20px; }
        .fbar-success-icon { font-size: 48px; margin-bottom: 16px; }
        .fbar-success-title { font-size: 22px; font-weight: 800; color: #1a1a2e; margin-bottom: 8px; }
        .fbar-success-text { font-size: 15px; color: #666; }

        .fbar-cta-strip { background: ${ACCENT}; color: #fff; padding: 64px 24px; text-align: center; }
        .fbar-cta-strip h2 { font-size: clamp(22px, 3vw, 36px); font-weight: 800; margin: 0 0 12px; }
        .fbar-cta-strip p { font-size: 17px; opacity: 0.88; margin: 0 0 28px; max-width: 600px; margin-left: auto; margin-right: auto; }
        .fbar-cta-strip-btn { background: #fff; color: ${ACCENT}; padding: 14px 32px; border-radius: 8px; font-weight: 700; font-size: 15px; text-decoration: none; display: inline-block; }
        .fbar-cta-strip-btn:hover { opacity: 0.9; }

        @media (max-width: 900px) {
          .fbar-challenges-grid { grid-template-columns: repeat(2, 1fr); }
          .fbar-services-grid { grid-template-columns: repeat(2, 1fr); }
          .fbar-stats-bar { grid-template-columns: repeat(2, 1fr); }
          .fbar-contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .fbar-cases-grid { grid-template-columns: 1fr; }
          .fbar-results-grid { grid-template-columns: 1fr; gap: 24px; }
          .fbar-process-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .fbar-challenges-grid { grid-template-columns: 1fr; }
          .fbar-services-grid { grid-template-columns: 1fr; }
          .fbar-process-grid { grid-template-columns: 1fr; }
        }
        /* ── FAQ ── */
        .fbar-faq-sec { padding:80px 24px;background:#f8fafd;border-top:1px solid rgba(${ACCENT_RGB},0.08); }
        .fbar-faq-inner { max-width:1200px;margin:0 auto; }
        .fbar-faq-h { font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${ACCENT} 0%,${ACCENT_MID} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 36px;line-height:1.15; }
        .fbar-faq-list { display:flex;flex-direction:column;gap:12px; }
        .fbar-faq-item { background:linear-gradient(135deg,rgba(${ACCENT_RGB},0.06) 0%,rgba(255,255,255,0.85) 60%,rgba(${ACCENT_RGB},0.04) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(${ACCENT_RGB},0.07);transition:border-color 0.2s;position:relative; }
        .fbar-faq-item.open { border-color:rgba(${ACCENT_RGB},0.30); }
        .fbar-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:${ACCENT};border-radius:3px 0 0 3px; }
        .fbar-faq-btn { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
        .fbar-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(${ACCENT_RGB},0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
        .fbar-faq-item.open .fbar-faq-q-badge { background:${ACCENT};color:#fff; }
        .fbar-faq-btn span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45; }
        .fbar-faq-item.open .fbar-faq-btn span { color:${ACCENT}; }
        .fbar-faq-chev { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
        .fbar-faq-item.open .fbar-faq-chev { transform:rotate(180deg);color:${ACCENT}; }
        .fbar-faq-ans-wrap { overflow:hidden;max-height:0;transition:max-height 0.35s ease; }
        .fbar-faq-item.open .fbar-faq-ans-wrap { max-height:500px; }
        .fbar-faq-ans { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
        .fbar-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:${ACCENT};color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }
        /* ── Related Services ── */
        .fbar-rel-sec { background:rgba(${ACCENT_RGB},0.04);border-top:1px solid rgba(${ACCENT_RGB},0.08);padding:80px 24px; }
        .fbar-rel-inner { max-width:1200px;margin:0 auto;text-align:center; }
        .fbar-rel-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
        .fbar-rel-h { font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${ACCENT} 0%,${ACCENT_MID} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 16px;line-height:1.15; }
        .fbar-rel-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
        .fbar-rel-div { border:none;border-top:1px solid rgba(${ACCENT_RGB},0.12);margin:40px 0; }
        .fbar-rel-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
        .fbar-rtag { display:inline-flex;align-items:center;padding:8px 16px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;border:1.5px solid;transition:all 0.2s; }
        .fbar-rtag:hover { transform:translateY(-2px); }
        .fbar-rtag-a { background:rgba(${ACCENT_RGB},0.08);color:${ACCENT};border-color:rgba(${ACCENT_RGB},0.25); }
        .fbar-rtag-b { background:rgba(79,70,229,0.07);color:#4338ca;border-color:rgba(79,70,229,0.22); }
        .fbar-rtag-c { background:rgba(5,150,105,0.07);color:#047857;border-color:rgba(5,150,105,0.22); }
        .fbar-rtag-d { background:rgba(217,119,6,0.07);color:#b45309;border-color:rgba(217,119,6,0.22); }
        .fbar-rtag-e { background:rgba(219,39,119,0.07);color:#be185d;border-color:rgba(219,39,119,0.22); }
        .fbar-rtag-f { background:rgba(8,145,178,0.07);color:#0e7490;border-color:rgba(8,145,178,0.22); }
      `}</style>

      <div className="fbar-page">
        <nav className="fbar-breadcrumb">
          <div className="fbar-breadcrumb-inner">
            <Link href="/">Home</Link>
            <span className="fbar-breadcrumb-sep">›</span>
            <Link href="/amazon-account-management">Amazon Services</Link>
            <span className="fbar-breadcrumb-sep">›</span>
            <span className="fbar-breadcrumb-current">FBA Shipment Reconciliation</span>
          </div>
        </nav>

        <section className="fbar-hero">
          <div className="fbar-hero-orb1" />
          <div className="fbar-hero-orb2" />
          <div className="fbar-hero-inner">
            <div className="fbar-eyebrow">
              <span className="fbar-eyebrow-dot" />
              Amazon FBA Reconciliation
            </div>
            <h1>Amazon FBA Reconciliation Services That Recover Money Amazon Owes You</h1>
            <p className="fbar-hero-desc">
              Amazon loses, damages, or miscounts FBA inventory every single month — and most sellers never claim the reimbursements they are owed. 1Solutions audits your FBA shipments, identifies every discrepancy, files claims on your behalf, and follows up until the money is recovered.
            </p>
            <div className="fbar-stats-bar">
              <div className="fbar-stat"><span className="fbar-stat-num">$3.2M+</span><span className="fbar-stat-label">Recovered for FBA sellers</span></div>
              <div className="fbar-stat"><span className="fbar-stat-num">87%</span><span className="fbar-stat-label">Average claim approval rate</span></div>
              <div className="fbar-stat"><span className="fbar-stat-num">1-3%</span><span className="fbar-stat-label">of FBA revenue lost monthly on average</span></div>
              <div className="fbar-stat"><span className="fbar-stat-num">60-day</span><span className="fbar-stat-label">Maximum claim window (time-sensitive)</span></div>
            </div>
            <div className="fbar-hero-ctas">
              <Link href="#contact" className="fbar-btn-primary">Find Out What Amazon Owes You →</Link>
              <Link href="#services" className="fbar-btn-secondary">Explore Services</Link>
            </div>
            <div className="fbar-trust-badges">
              {['Amazon Seller Central expertise', 'No recovery no fee option', 'Claims filed within 48 hours', 'Dedicated reconciliation specialist'].map(b => (
                <span key={b} className="fbar-badge"><span className="fbar-badge-check">✓</span>{b}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="fbar-challenges">
          <div className="fbar-section-inner">
            <p className="fbar-section-label">Common FBA Seller Pain Points</p>
            <h2 className="fbar-section-h2">Why <span>FBA Sellers Lose Money</span></h2>
            <p className="fbar-section-sub">Amazon owes most FBA sellers reimbursements every month. Here is why those claims never get filed.</p>
            <div className="fbar-challenges-grid">
              {challenges.map(c => (
                <div key={c.title} className="fbar-challenge-card">
                  <div className="fbar-challenge-icon">
                    <svg viewBox="0 0 24 24"><path d={c.icon} /></svg>
                  </div>
                  <h3 className="fbar-challenge-title">{c.title}</h3>
                  <p className="fbar-challenge-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="fbar-services" id="services">
          <div className="fbar-section-inner">
            <p className="fbar-section-label">Our Services</p>
            <h2 className="fbar-section-h2">What Our <span>FBA Reconciliation Covers</span></h2>
            <p className="fbar-section-sub">A complete audit and recovery service covering every category of FBA discrepancy and billing error.</p>
            <div className="fbar-services-grid">
              {services.map(s => (
                <div key={s.title} className="fbar-service-card">
                  <div className="fbar-service-icon">
                    <svg viewBox="0 0 24 24"><path d={s.icon} /></svg>
                  </div>
                  <h3 className="fbar-service-title">{s.title}</h3>
                  <p className="fbar-service-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="fbar-results">
          <div className="fbar-results-grid">
            <div>
              <span className="fbar-result-num">$3.2M+</span>
              <span className="fbar-result-label">Total FBA reimbursements recovered for clients</span>
            </div>
            <div>
              <span className="fbar-result-num">87%</span>
              <span className="fbar-result-label">Average first-submission claim approval rate</span>
            </div>
            <div>
              <span className="fbar-result-num">$4,800</span>
              <span className="fbar-result-label">Average monthly ongoing recovery per active account</span>
            </div>
          </div>
        </section>

        <section className="fbar-cases">
          <div className="fbar-section-inner">
            <p className="fbar-section-label">Client Results</p>
            <h2 className="fbar-section-h2">FBA Reconciliation <span>Success Stories</span></h2>
            <p className="fbar-section-sub">Real reimbursements recovered for real sellers.</p>
            <div className="fbar-cases-grid">
              {caseStudies.map(cs => (
                <div key={cs.seller} className="fbar-case-card">
                  <span className="fbar-case-badge">{cs.badge}</span>
                  <h3 className="fbar-case-seller">{cs.seller}</h3>
                  <div className="fbar-case-metrics">
                    <div className="fbar-case-metric">
                      <div className="fbar-case-metric-label">Before</div>
                      <div className="fbar-case-metric-val">{cs.before}</div>
                    </div>
                    <div className="fbar-case-metric">
                      <div className="fbar-case-metric-label">After</div>
                      <div className="fbar-case-metric-val fbar-after">{cs.after}</div>
                    </div>
                  </div>
                  <p className="fbar-case-time">Timeline: {cs.time}</p>
                  <ul className="fbar-case-actions">
                    {cs.actions.map(a => (
                      <li key={a} className="fbar-case-action"><span className="fbar-case-action-dot" />{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="fbar-process">
          <div className="fbar-section-inner">
            <p className="fbar-section-label">How We Work</p>
            <h2 className="fbar-section-h2">Our <span>6-Step Recovery Process</span></h2>
            <p className="fbar-section-sub">A systematic, documented process for auditing and recovering every dollar Amazon owes you.</p>
            <div className="fbar-process-grid">
              {steps.map(s => (
                <div key={s.n} className="fbar-step-card">
                  <span className="fbar-step-num">{s.n}</span>
                  <div className="fbar-step-badge">{s.n}</div>
                  <h3 className="fbar-step-title">{s.title}</h3>
                  <p className="fbar-step-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="fbar-contact" id="contact">
          <div className="fbar-section-inner">
            <div className="fbar-contact-grid">
              <div>
                <p className="fbar-section-label">Get Started</p>
                <h2 className="fbar-contact-h2">Find Out How Much <span>Amazon Owes You</span></h2>
                <p className="fbar-contact-desc">We will run a free preliminary audit of your FBA account and give you an estimate of recoverable reimbursements before you commit to anything.</p>
                <div className="fbar-contact-items">
                  <div className="fbar-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span>hello@1solutions.biz</span>
                  </div>
                  <div className="fbar-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>
                    <span>+1 (800) 1SOLUTIONS</span>
                  </div>
                  <div className="fbar-contact-item">
                    <svg viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Free preliminary audit with no commitment</span>
                  </div>
                </div>
              </div>
              <div className="fbar-form-card">
                {sent ? (
                  <div className="fbar-success">
                    <div className="fbar-success-icon">✅</div>
                    <div className="fbar-success-title">Audit Request Received</div>
                    <p className="fbar-success-text">We will pull your FBA data and send you an estimate of recoverable reimbursements within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="fbar-form-group">
                      <label className="fbar-form-label">Full Name *</label>
                      <input className="fbar-form-input" type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" />
                    </div>
                    <div className="fbar-form-group">
                      <label className="fbar-form-label">Email Address *</label>
                      <input className="fbar-form-input" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@yourbrand.com" />
                    </div>
                    <div className="fbar-form-group">
                      <label className="fbar-form-label">Company / Brand Name</label>
                      <input className="fbar-form-input" type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your Brand" />
                    </div>
                    <div className="fbar-form-group">
                      <label className="fbar-form-label">Monthly FBA Revenue</label>
                      <select className="fbar-form-select" value={form.revenue} onChange={e => setForm({ ...form, revenue: e.target.value })}>
                        <option>Under $10K/mo</option>
                        <option>$10K-$50K/mo</option>
                        <option>$50K-$200K/mo</option>
                        <option>$200K+/mo</option>
                      </select>
                    </div>
                    <div className="fbar-form-group">
                      <label className="fbar-form-label">Tell us about your FBA situation</label>
                      <textarea className="fbar-form-textarea" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Number of SKUs, FBA marketplaces, any known issues..." />
                    </div>
                    <button type="submit" className="fbar-form-submit">Request Free FBA Audit →</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="fbar-faq-sec" id="faq">
          <div className="fbar-faq-inner">
            <h2 className="fbar-faq-h">Frequently Asked Questions</h2>
            <div className="fbar-faq-list">
              {FAQS.map((faq, i) => (
                <div key={i} className={'fbar-faq-item' + (openFaq === i ? ' open' : '')}>
                  <button className="fbar-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <div className="fbar-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="fbar-faq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="fbar-faq-ans-wrap">
                    <div className="fbar-faq-ans"><span className="fbar-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="fbar-rel-sec">
          <div className="fbar-rel-inner">
            <span className="fbar-rel-eyebrow">PLATFORM RELATED OFFERINGS</span>
            <h2 className="fbar-rel-h">Explore Related Services and Technologies</h2>
            <p className="fbar-rel-sub">Pair our FBA reconciliation expertise with complementary services that protect and grow your Amazon revenue.</p>
            <hr className="fbar-rel-div" />
            <div className="fbar-rel-tags">
              <Link href="/amazon-account-management-services/" className="fbar-rtag fbar-rtag-a">Amazon Management</Link>
              <Link href="/walmart-account-management-services/" className="fbar-rtag fbar-rtag-b">Walmart Marketplace</Link>
              <Link href="/ebay-account-management-services/" className="fbar-rtag fbar-rtag-c">eBay Management</Link>
              <Link href="/ecommerce-seo-services/" className="fbar-rtag fbar-rtag-d">eCommerce SEO</Link>
              <Link href="/google-shopping-management/" className="fbar-rtag fbar-rtag-e">Google Shopping Ads</Link>
              <Link href="/email-marketing-services/" className="fbar-rtag fbar-rtag-f">Email Automation</Link>
              <Link href="/woocommerce-development-company/" className="fbar-rtag fbar-rtag-a">WooCommerce Development</Link>
              <Link href="/social-media-marketing-services/" className="fbar-rtag fbar-rtag-b">Social Commerce</Link>
              <Link href="/magento-development-company/" className="fbar-rtag fbar-rtag-c">Magento Development</Link>
              <Link href="/ecommerce-website-development-services/" className="fbar-rtag fbar-rtag-d">eCommerce Development</Link>
              <Link href="/etsy-account-management-services/" className="fbar-rtag fbar-rtag-e">Etsy Shop Management</Link>
              <Link href="/flipkart-account-management-services/" className="fbar-rtag fbar-rtag-f">Flipkart Management</Link>
            </div>
          </div>
        </section>

        <section className="fbar-cta-strip">
          <h2>Stop Leaving FBA Reimbursements on the Table</h2>
          <p>Every month without reconciliation is money permanently lost. Let us audit your FBA account and recover what Amazon owes you.</p>
          <Link href="#contact" className="fbar-cta-strip-btn">Get Your Free FBA Audit →</Link>
        </section>
      </div>
    </>
  );
}
