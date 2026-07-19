'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Intelligent Process Automation', desc:'Replace rule-based RPA with AI-driven automation that handles exceptions, adapts to process changes, and reasons through ambiguous scenarios without human intervention.', featured:false },
  { n:'02', title:'AI Document Processing', desc:'Extract, classify, and validate data from invoices, contracts, forms, and unstructured PDFs at scale — with accuracy that matches or exceeds human reviewers.', featured:true },
  { n:'03', title:'Conversational AI & Chatbots', desc:'Enterprise-grade chatbots and virtual assistants that handle customer queries, internal helpdesk tickets, and sales conversations — integrated with your CRM and knowledge base.', featured:false },
  { n:'04', title:'Data Pipeline Automation', desc:'Automated ETL and ELT pipelines that collect, transform, and load data from any source on any schedule — eliminating manual exports, spreadsheets, and data reconciliation tasks.', featured:false },
  { n:'05', title:'Predictive Analytics & Forecasting', desc:'ML models that predict demand, churn, revenue, and operational bottlenecks before they happen — giving your team the foresight to act rather than react.', featured:false },
  { n:'06', title:'Email & Communication Automation', desc:'AI-powered email triage, auto-responses, follow-up sequences, and escalation routing — reducing inbox processing time by up to 80% without losing the human touch.', featured:false },
  { n:'07', title:'CRM & Sales Automation', desc:'Automate lead scoring, pipeline updates, follow-up reminders, and reporting in Salesforce, HubSpot, or your custom CRM using AI that understands deal context.', featured:false },
  { n:'08', title:'Finance & Accounting Automation', desc:'Automated invoice matching, expense categorisation, reconciliation, and month-end reporting — cutting close cycles from weeks to days with zero manual data entry.', featured:false },
  { n:'09', title:'HR & Recruitment Automation', desc:'Resume screening, interview scheduling, onboarding workflow automation, and HR query bots that let your HR team focus on people — not paperwork.', featured:false },
  { n:'10', title:'Supply Chain Optimisation', desc:'Demand forecasting, inventory level automation, supplier communication bots, and logistics routing AI that keeps your supply chain running without constant manual intervention.', featured:false },
  { n:'11', title:'Marketing Automation with AI', desc:'Content personalisation, campaign optimisation, A/B test automation, and AI-generated copy — all connected to your marketing stack for seamless execution at scale.', featured:false },
  { n:'12', title:'Custom AI Workflow Integration', desc:'End-to-end AI automation built around your unique workflows — connecting your ERP, CRM, cloud storage, APIs, and internal tools into one intelligent, self-running system.', featured:false },
];

const FAQS = [
  { q:'What is AI automation and how is it different from traditional automation?', a:'Traditional automation (RPA) follows fixed rules and breaks when the input changes. AI automation uses machine learning and language models to understand context, handle exceptions, and adapt to variability — meaning it works on messy real-world data, not just perfect inputs. We combine both where appropriate, layering AI reasoning on top of process automation to get reliability and flexibility together.' },
  { q:'How much does an AI automation project cost?', a:'Straightforward automation projects — email triage, document extraction, single-workflow chatbots — typically start from $5,000. Complex end-to-end automation platforms connecting multiple systems with custom ML models range from $20,000 to $80,000+. Every project starts with a free scoping call where we define the scope and provide a fixed-price quote. No retainers, no surprise invoices.' },
  { q:'How long does an AI automation project take to deliver?', a:'A focused automation (single process, clear inputs/outputs) takes 3–6 weeks. A broader automation platform covering multiple workflows and integrations typically takes 10–16 weeks. We deliver in sprints with working demos every two weeks so you see progress throughout — not just at the end.' },
  { q:'Which systems and platforms can you integrate with?', a:'We integrate with Salesforce, HubSpot, SAP, Microsoft Dynamics, QuickBooks, Xero, Shopify, AWS S3, Google Drive, SharePoint, Zendesk, Jira, Slack, Gmail, Outlook, Twilio, and hundreds more via REST APIs, webhooks, and direct database connections. If it has an API or an export, we can automate it.' },
  { q:'Do you work with businesses in the US, Canada, and Australia?', a:'Yes — the majority of our clients are based in the US, Canada, and Australia. We operate in your time zone, communicate in plain English, and follow the data compliance requirements of your region (SOC 2, HIPAA, GDPR where applicable). We have been delivering automation and AI projects remotely since 2008 with a 97% client retention rate.' },
  { q:'What AI models and frameworks do you use?', a:'We work with Claude (Anthropic), GPT-4o (OpenAI), Gemini 1.5 Pro (Google), and open-source models like Llama 3 and Mistral depending on your cost, latency, and data-residency needs. For orchestration we use LangGraph, LangChain, CrewAI, and AutoGen. We choose the stack that fits the problem — not the one we are most familiar with.' },
  { q:'Can AI automation work with our existing on-premise systems?', a:'Yes. We routinely build automation solutions that connect cloud AI to on-premise ERP systems, legacy databases, and internal file servers using secure API gateways, VPN tunnels, and agent-based connectors. Your data never needs to leave your infrastructure unless you want it to.' },
  { q:'What ROI can we expect from AI automation?', a:'Typical ROI ranges from 3x to 10x within the first 12 months, depending on the volume of the process automated. A finance team automating invoice processing at 2,000 invoices/month at 15 minutes each saves 500 hours/month — easily justifying a $30,000 automation project in a single quarter. We model the expected ROI before every project so you know the numbers before you commit.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>, title:'End-to-End Delivery', desc:'We handle everything — process discovery, AI model selection, integration development, testing, deployment, and monitoring. One team, one point of contact, no handoffs.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, title:'Production-Proven Automation', desc:'We build automations that run reliably for months and years — not impressive demos that break on the first edge case. Evaluation-driven development ensures real-world reliability.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>, title:'Security & Compliance First', desc:'Data stays in your infrastructure. We design for SOC 2, HIPAA, and GDPR compliance from day one — not as an afterthought. PII redaction, audit logging, and role-based access built in.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>, title:'ROI-Driven Approach', desc:'Every project begins with an ROI model. We identify which processes give the fastest payback and build in that order — so you see returns within months, not years.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>, title:'Dedicated Project Team', desc:'A senior AI engineer, a project manager, and a QA specialist assigned to your project — not rotated off mid-project. You always know who is responsible for what.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>, title:'15+ Years, 97% Retention', desc:'Since 2008, 97% of our clients come back for their next project. That track record reflects the quality of our work and the honesty of our process — not just our sales pitch.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>, title:'LLM-Agnostic Stack', desc:'We work with every major AI provider — Anthropic, OpenAI, Google, and open-source — choosing the right model for your cost, latency, and data-sovereignty requirements.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Continuous Improvement', desc:'AI automation improves with use. We set up feedback loops, monitoring dashboards, and quarterly optimisation reviews so your automations get better — not stale — over time.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numTarget = parseInt(target.replace(/\D/g, ''), 10);
    if (!numTarget) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function AnimatedStat({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  const hasComma = val.includes(',');
  const display = started ? (hasComma ? num.toLocaleString() : num) + suffix : val;
  return (
    <div className="aas-stat-col">
      <div className="aas-stat-label">{label}</div>
      <div className="aas-stat-value">{display}</div>
    </div>
  );
}

export default function AIAutomationServices() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const stepRefs = useRef([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleSteps(prev => prev.includes(i) ? prev : [...prev, i]), i * 150);
            obs.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!whyGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          WHY.forEach((_, i) => {
            setTimeout(() => setVisibleWhyCards(prev => prev.includes(i) ? prev : [...prev, i]), i * 100);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(whyGridRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!testiGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0,1,2].forEach(i => setTimeout(() => setVisibleTestiCards(p => p.includes(i)?p:[...p,i]), i * 150));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(testiGridRef.current);
    return () => obs.disconnect();
  }, []);


  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, key]));
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const visibleServices = showAll ? SERVICES : SERVICES.slice(0, 8);

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
          source: 'AI Automation Services', consent: true, recaptchaToken: token,
        }),
      });
      if (res.ok) { window.location.href = '/thank-you/'; } else { _setSfSt('error'); }
    } catch { _setSfSt('error'); }
  };

  return (
    <>
      <Head>
        <title>AI Automation Services | Intelligent Business Process Automation | 1Solutions</title>
        <meta name="description" content="1Solutions delivers AI automation services that eliminate manual work, reduce errors, and scale your operations. Custom AI workflows, document processing, chatbots & more for US, Canada & Australia." />
        <meta name="keywords" content="AI automation services, intelligent process automation, AI workflow automation, business process automation, AI chatbots, document automation, RPA with AI, AI integration services" />
        <link rel="canonical" href="https://www.1solutions.biz/ai-automation-services/" />
        <meta property="og:title" content="AI Automation Services | 1Solutions" />
        <meta property="og:description" content="Custom AI automation solutions that eliminate repetitive work, reduce errors, and scale your operations — built for US, Canada & Australia businesses." />
        <meta property="og:url" content="https://www.1solutions.biz/ai-automation-services/" />
        <style>{`
          .aas-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #ede9fe 0%, #dbeafe 25%, #f0fdf4 50%, #fce7f3 75%, #e0f2fe 100%);
            background-attachment: scroll;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .aas-page *, .aas-page *::before, .aas-page *::after { box-sizing: border-box; }

          /* Orbs */
          .aas-aurora { position:absolute; inset:-15%; z-index:0; pointer-events:none; filter:blur(70px) saturate(150%); animation:aas-aurora-drift 20s ease-in-out infinite alternate; }
          .aas-aurora-b1 { position:absolute; left:20%; top:30%; width:65%; height:65%; border-radius:50%; background:radial-gradient(circle at center,rgba(15,52,96,0.28) 0%,transparent 70%); transform:translate(-50%,-50%); }
          .aas-aurora-b2 { position:absolute; left:78%; top:22%; width:48%; height:48%; border-radius:50%; background:radial-gradient(circle at center,rgba(217,119,6,0.20) 0%,transparent 70%); transform:translate(-50%,-50%); }
          .aas-aurora-b3 { position:absolute; left:50%; top:82%; width:55%; height:55%; border-radius:50%; background:radial-gradient(circle at center,rgba(26,82,118,0.16) 0%,transparent 70%); transform:translate(-50%,-50%); }
          @keyframes aas-aurora-drift { 0%{transform:translate3d(0,0,0) scale(1)} 100%{transform:translate3d(-4%,3%,0) scale(1.10)} }

          /* Hero */
          .aas-hero-block { background:transparent;position:relative;overflow:hidden; }
          .aas-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,0.14) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .aas-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(236,72,153,0.14) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .aas-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .aas-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .aas-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aas-aurora 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .aas-hero-content p { font-size:16px;color:#3A507A;line-height:1.65;max-width:640px;margin:0 auto 28px; }
          .aas-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#3730a3;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(55,48,163,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .aas-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(124,58,237,0.5);box-shadow:0 12px 36px rgba(55,48,163,0.15),0 0 0 2px rgba(124,58,237,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#3730a3; }

          /* Stats bar */
          .aas-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(55,48,163,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .aas-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(55,48,163,0.10); }
          .aas-stat-col:last-child { border-right:none; }
          .aas-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .aas-stat-value { font-size:26px;font-weight:900;color:#7c3aed;letter-spacing:-0.5px;line-height:1; }

          /* Clients */
          .aas-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .aas-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .aas-clients-logos { width:100%;overflow:hidden; }
          .aas-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .aas-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Shared section styles */
          .aas-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7c3aed;margin-bottom:12px;display:block; }
          .aas-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aas-aurora 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .aas-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .aas-section-sub { font-size:16px;color:#4A6080;margin:0; }

          /* Services */
          .aas-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(55,48,163,0.12),0 -4px 16px rgba(55,48,163,0.08); }
          .aas-services-inner { max-width:1280px;margin:0 auto; }
          .aas-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .aas-service-card { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(55,48,163,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .aas-service-card:hover { transform:translateY(-6px);border-color:rgba(124,58,237,0.40);box-shadow:0 16px 48px rgba(55,48,163,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .aas-service-card.featured { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.90) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(124,58,237,0.25);box-shadow:0 6px 32px rgba(124,58,237,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .aas-service-card:hover .aas-card-num { color:#7c3aed;opacity:0.10; }
          .aas-service-card:hover h3 { color:#7c3aed; }
          .aas-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#3730a3;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .aas-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .aas-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .aas-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#7c3aed,#a855f7);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .aas-service-card:hover::before { transform:scaleY(1); }
          .aas-services-footer { text-align:center;margin-top:20px; }
          .aas-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(55,48,163,0.20);color:#3730a3;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(55,48,163,0.08);font-family:inherit; }
          .aas-btn-show-more:hover { background:#3730a3;border-color:#3730a3;color:#ffffff;box-shadow:0 8px 28px rgba(55,48,163,0.20);transform:translateY(-2px); }

          /* Tech Stack */
          .aas-tech-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .aas-tech-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(55,48,163,0.10),inset 0 1px 0 rgba(255,255,255,0.95); }
          .aas-tech-header { margin-bottom:36px; }
          .aas-tech-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aas-aurora 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 12px; }
          .aas-tech-subtitle { font-size:15px;color:#4A6080;line-height:1.6;margin:0; }
          .aas-tech-groups { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .aas-tech-group { background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(0,0,0,0.08);border-radius:12px;padding:22px 24px;border-left-width:3px;border-left-style:solid; }
          .aas-tech-group-title { font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 14px; }
          .aas-tech-tags { display:flex;flex-wrap:wrap;gap:8px; }
          .aas-tech-tag { display:inline-block;border-radius:6px;padding:5px 12px;font-size:13px;font-weight:500; }
          /* per-group colour tokens */
          .aas-tg-violet .aas-tech-group-title { color:#7c3aed; }
          .aas-tg-violet { border-left-color:#7c3aed; }
          .aas-tg-violet .aas-tech-tag { background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.20);color:#5b21b6; }
          .aas-tg-blue .aas-tech-group-title { color:#2563eb; }
          .aas-tg-blue { border-left-color:#2563eb; }
          .aas-tg-blue .aas-tech-tag { background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.20);color:#1d4ed8; }
          .aas-tg-teal .aas-tech-group-title { color:#0d9488; }
          .aas-tg-teal { border-left-color:#0d9488; }
          .aas-tg-teal .aas-tech-tag { background:rgba(13,148,136,0.08);border:1px solid rgba(13,148,136,0.22);color:#0f766e; }
          .aas-tg-rose .aas-tech-group-title { color:#e11d48; }
          .aas-tg-rose { border-left-color:#e11d48; }
          .aas-tg-rose .aas-tech-tag { background:rgba(225,29,72,0.07);border:1px solid rgba(225,29,72,0.20);color:#be123c; }
          .aas-tg-amber .aas-tech-group-title { color:#d97706; }
          .aas-tg-amber { border-left-color:#d97706; }
          .aas-tg-amber .aas-tech-tag { background:rgba(217,119,6,0.08);border:1px solid rgba(217,119,6,0.22);color:#b45309; }
          .aas-tg-indigo .aas-tech-group-title { color:#4338ca; }
          .aas-tg-indigo { border-left-color:#4338ca; }
          .aas-tg-indigo .aas-tech-tag { background:rgba(67,56,202,0.08);border:1px solid rgba(67,56,202,0.20);color:#3730a3; }

          /* Process */
          .aas-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .aas-process-top { max-width:1280px;margin:0 auto 56px; }
          .aas-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#7c3aed;margin:0 0 14px; }
          .aas-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aas-aurora 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .aas-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .aas-process-divider { border:none;border-top:1px solid rgba(55,48,163,0.15);margin:36px 0 0;width:100%; }
          .aas-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .aas-process-steps { display:flex;flex-direction:column; }
          .aas-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .aas-pstep.visible { opacity:1;transform:translateY(0); }
          .aas-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .aas-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(55,48,163,0.20);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#3730a3;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .aas-pstep:hover .aas-pstep-circle { background:rgba(124,58,237,0.15);border-color:#7c3aed;color:#7c3aed; }
          .aas-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .aas-pstep-arrow::before { content:'';width:2px;flex:1;background:#3730a3;opacity:0.22; }
          .aas-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #3730a3;opacity:0.40;margin-top:-1px; }
          .aas-pstep:last-child .aas-pstep-arrow { display:none; }
          .aas-pstep-content { padding:4px 0 44px; }
          .aas-pstep:last-child .aas-pstep-content { padding-bottom:0; }
          .aas-pstep-title { font-size:22px;font-weight:700;color:#3730a3;margin:0 0 10px;line-height:1.2; }
          .aas-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .aas-process-image-col { position:sticky;top:100px;min-width:0; }
          .aas-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(55,48,163,0.15);aspect-ratio:4/5;background:#ede9fe; }
          .aas-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .aas-testi-section { background:#f8fafd;border-top:1px solid rgba(55,48,163,0.08);border-bottom:1px solid rgba(55,48,163,0.08);padding:80px 40px;position:relative;z-index:1; }
          .aas-testi-inner { max-width:1280px;margin:0 auto; }
          .aas-section-header-center { text-align:center;margin-bottom:52px; }
          .aas-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .aas-tcard { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(55,48,163,0.07),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .aas-tcard:hover { transform:translateY(-6px);border-color:rgba(124,58,237,0.35);box-shadow:0 16px 48px rgba(55,48,163,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .aas-tcard.featured { background:linear-gradient(135deg,rgba(237,233,254,0.60) 0%,rgba(255,255,255,0.90) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(124,58,237,0.25);box-shadow:0 6px 32px rgba(124,58,237,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .aas-tcard.aas-tcard-visible { opacity:1;transform:translateY(0); }
          .aas-tcard.aas-tcard-visible:hover { transform:translateY(-6px); }
          .aas-tcard-stars { font-size:18px;color:#7c3aed;letter-spacing:2px; }
          .aas-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .aas-tcard.featured .aas-tcard-text { color:#1f2937; }
          .aas-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .aas-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .aas-tcard-name { font-size:14px;font-weight:700;color:#3730a3; }
          .aas-tcard-role { font-size:12px;color:#6b7280; }
          .aas-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(237,233,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(55,48,163,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .aas-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .aas-tstat-num { font-size:28px;font-weight:800;color:#3730a3; }
          .aas-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .aas-tstat-divider { width:1px;height:40px;background:rgba(55,48,163,0.15); }

          /* Why */
          .aas-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(55,48,163,0.08);border-bottom:1px solid rgba(55,48,163,0.08);position:relative;z-index:1; }
          .aas-why-inner { max-width:1280px;margin:0 auto; }
          .aas-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .aas-why-card { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(55,48,163,0.07),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),background 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .aas-why-card:hover { transform:translateY(-6px) scale(1);border-color:rgba(124,58,237,0.35);box-shadow:0 16px 48px rgba(55,48,163,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .aas-why-card.aas-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .aas-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .aas-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .aas-why-icon svg { width:28px;height:28px;fill:none;stroke:#7c3aed;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round; }
          .aas-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .aas-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* Engagement Table */
          .aas-engage-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .aas-engage-inner { max-width:1280px;margin:0 auto; }
          .aas-engage-header { text-align:center;margin-bottom:52px; }
          .aas-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 14px; }
          .aas-engage-desc { font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 auto; }
          .aas-plans-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:20px;align-items:start; }
          .aas-pcard { display:flex;flex-direction:column;height:100%;padding:30px 26px;border-radius:20px;border:1.5px solid rgba(15,52,96,0.12);background:rgba(255,255,255,0.80);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);position:relative; }
          .aas-pcard--feat { border-color:rgba(217,119,6,0.40);background:linear-gradient(180deg,rgba(254,243,199,0.35) 0%,rgba(255,255,255,0.90) 100%);box-shadow:0 0 60px rgba(217,119,6,0.12),0 8px 40px rgba(15,52,96,0.08); }
          .aas-pcard-pop { position:absolute;top:-13px;left:50%;transform:translateX(-50%);padding:4px 14px;border-radius:100px;background:linear-gradient(90deg,#0F3460,#1a5276 50%,#D97706);color:#fff;font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap;box-shadow:0 4px 16px rgba(217,119,6,0.28); }
          .aas-pcard-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:#6B7280;background:rgba(15,52,96,0.06);padding:4px 12px;border-radius:100px;margin-bottom:14px; }
          .aas-pcard-name { display:block;font-size:17px;font-weight:800;color:#0F3460;margin-bottom:10px;line-height:1.3; }
          .aas-pcard--feat .aas-pcard-name { color:#b45309; }
          .aas-pcard-blurb { font-size:13px;color:#4A6080;line-height:1.7;margin:0 0 20px; }
          .aas-pcard-features { list-style:none;padding:0;margin:0 0 24px;flex:1; }
          .aas-pcard-features li { padding:8px 0;border-top:1px dashed rgba(15,52,96,0.10);font-size:13.5px;color:#374151;display:flex;align-items:flex-start;gap:8px; }
          .aas-pcard-features li::before { content:'✓';color:#16a34a;font-weight:700;flex-shrink:0; }
          .aas-pcard-cta { display:block;padding:12px 20px;background:rgba(15,52,96,0.07);border:1.5px solid rgba(15,52,96,0.18);border-radius:50px;color:#0F3460;font-size:13.5px;font-weight:700;text-decoration:none;text-align:center;transition:all 0.2s;margin-top:auto; }
          .aas-pcard-cta:hover { background:rgba(15,52,96,0.12);transform:translateY(-1px);text-decoration:none; }
          .aas-pcard-cta--feat { background:linear-gradient(135deg,#0F3460,#1a5276);border-color:transparent;color:#fff;box-shadow:0 4px 20px rgba(15,52,96,0.28); }
          .aas-pcard-cta--feat:hover { background:linear-gradient(135deg,#0a2444,#0F3460);box-shadow:0 6px 28px rgba(15,52,96,0.38);color:#fff; }
          @media(max-width:1024px){ .aas-plans-grid { grid-template-columns:repeat(2,1fr); } }
          @media(max-width:600px){ .aas-plans-grid { grid-template-columns:1fr; } }

          /* Contact */
          .aas-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(237,233,254,0.80) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.70) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .aas-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .aas-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aas-aurora 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .aas-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .aas-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .aas-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .aas-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .aas-benefit-icon { width:20px;height:20px;color:#7c3aed;stroke:#7c3aed;stroke-width:1.75; }
          .aas-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .aas-stats-box { padding-top:32px;border-top:1px solid rgba(55,48,163,0.12); }
          .aas-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .aas-stat-number { font-size:40px;font-weight:900;color:#3730a3;line-height:1;display:inline-block;margin-bottom:4px; }
          .aas-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .aas-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(55,48,163,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .aas-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .aas-contact-form { display:flex;flex-direction:column;gap:16px; }
          .aas-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .aas-form-group { display:flex;flex-direction:column;gap:6px; }
          .aas-form-group.full { grid-column:1/-1; }
          .aas-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .aas-form-group input,.aas-form-group textarea,.aas-form-group select { padding:10px 14px;border:1px solid rgba(55,48,163,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(55,48,163,0.06);transition:border-color 0.2s,background 0.2s; }
          .aas-form-group input:focus,.aas-form-group textarea:focus { outline:none;border-color:#7c3aed;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(124,58,237,0.12); }
          .aas-phone-input { display:flex;border:1px solid rgba(55,48,163,0.15);border-radius:6px;overflow:hidden; }
          .aas-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .aas-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .aas-phone-input input:focus { outline:none; }
          .aas-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .aas-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .aas-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .aas-consent a { color:#3730a3;text-decoration:none; }
          .aas-submit-btn { padding:14px 28px;background:rgba(55,48,163,0.88);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(55,48,163,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .aas-submit-btn:hover { background:rgba(124,58,237,0.95);border-color:rgba(168,85,247,0.5);transform:translateY(-2px); }
          .aas-submit-btn:disabled { opacity:0.6;cursor:not-allowed;transform:none; }

          /* FAQ */
          .aas-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(55,48,163,0.08);position:relative;z-index:1; }
          .aas-faq-inner { max-width:1280px;margin:0 auto; }
          .aas-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aas-aurora 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .aas-faq-list { display:flex;flex-direction:column;gap:12px; }
          .aas-faq-item { background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(219,234,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(55,48,163,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .aas-faq-item.open { border-color:rgba(124,58,237,0.35);box-shadow:0 8px 32px rgba(55,48,163,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .aas-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#7c3aed;border-radius:3px 0 0 3px; }
          .aas-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .aas-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(55,48,163,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .aas-faq-item.open .aas-faq-q-badge { background:#7c3aed;color:#fff; }
          .aas-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .aas-faq-item.open .aas-faq-question span { color:#7c3aed; }
          .aas-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .aas-faq-item.open .aas-faq-chevron { transform:rotate(180deg);color:#7c3aed; }
          .aas-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .aas-faq-item.open .aas-faq-answer-wrap { max-height:400px; }
          .aas-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .aas-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#3730a3;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Related */
          .aas-related-section { background:rgba(237,233,254,0.20);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .aas-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .aas-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .aas-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aas-aurora 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .aas-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .aas-related-divider { border:none;border-top:1px solid rgba(55,48,163,0.12);margin:40px 0; }
          .aas-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .aas-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .aas-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .aas-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .aas-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .aas-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .aas-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .aas-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .aas-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .aas-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .aas-rtag-pink    { background:rgba(236,72,153,0.10);border-color:rgba(236,72,153,0.28);color:#9D174D; }
          .aas-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490; }
          .aas-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .aas-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }
          .aas-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }

          /* Shimmer */
          .aas-btn-hero-shimmer { position:relative;overflow:hidden; }
          .aas-btn-hero-shimmer::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:aas-shimmer 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes aas-shimmer { 0% { left:-120%; } 35%,100% { left:160%; } }
          @keyframes aas-aurora { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }

          /* Section fade-up */
          .aas-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .aas-section-reveal.aas-revealed { opacity:1;transform:translateY(0); }

          /* Marquee */
          .aas-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:aas-marquee 28s linear infinite; }
          .aas-logos-track:hover { animation-play-state:paused; }
          @keyframes aas-marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }

          /* Responsive */
          @media (max-width:1024px) {
            .aas-hero-content h1 { font-size:40px; }
            .aas-services-grid { grid-template-columns:repeat(2,1fr); }
            .aas-why-grid { grid-template-columns:repeat(2,1fr); }
            .aas-tech-groups { grid-template-columns:repeat(2,1fr); }
            .aas-process-inner { grid-template-columns:1fr; }
            .aas-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .aas-page { overflow-x:hidden; }
            .aas-hero-content { padding:36px 20px 24px; }
            .aas-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .aas-hero-content p { font-size:15px; }
            .aas-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .aas-stat-col { padding:14px 12px; }
            .aas-stat-col:nth-child(2) { border-right:none; }
            .aas-stat-col:nth-child(3) { border-top:1px solid rgba(55,48,163,0.10); }
            .aas-stat-col:nth-child(4) { border-top:1px solid rgba(55,48,163,0.10);border-right:none; }
            .aas-stat-value { font-size:22px; }
            .aas-clients-bar { padding:16px 20px 36px;gap:12px; }
            .aas-services-section { padding:48px 20px 40px; }
            .aas-tech-section { padding:48px 16px; }
            .aas-tech-wrap { padding:24px 20px 32px;border-radius:16px; }
            .aas-tech-groups { grid-template-columns:1fr; }
            .aas-process-section { padding:60px 20px; }
            .aas-process-top { margin-bottom:36px; }
            .aas-testi-section { padding:60px 20px; }
            .aas-testi-section .aas-section-header-center { text-align:left; }
            .aas-why-section { padding:60px 20px; }
            .aas-why-section .aas-section-header-center { text-align:left; }
            .aas-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .aas-why-card { padding:24px 20px; }
            .aas-engage-section { padding:60px 20px; }
            .aas-contact-section { padding:48px 16px; }
            .aas-contact-container { grid-template-columns:1fr;gap:20px; }
            .aas-contact-title { font-size:28px; }
            .aas-faq-section { padding:60px 20px; }
            .aas-faq-heading { font-size:26px; }
            .aas-faq-question { padding:18px 18px 18px 52px; }
            .aas-faq-question span { font-size:14px; }
            .aas-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .aas-faq-q-badge { left:14px; }
            .aas-related-section { padding:60px 20px; }
            .aas-related-tags { gap:8px; }
            .aas-rtag { padding:9px 16px;font-size:13px; }
            .aas-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .aas-testi-grid { grid-template-columns:1fr; }
            .aas-section-title,.aas-engage-title,.aas-process-main-title,.aas-related-title { font-size:30px; }
            .aas-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .aas-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(55,48,163,0.10); }
            .aas-tstat:nth-child(odd) { border-right:1px solid rgba(55,48,163,0.10); }
            .aas-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .aas-tstat-divider { display:none; }
            .aas-form-row { grid-template-columns:1fr; }
            .aas-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .aas-stat-number { font-size:28px; }
            .aas-tech-title { font-size:26px; }
          }
          @media (max-width:480px) {
            .aas-hero-content h1 { font-size:24px; }
            .aas-section-title,.aas-engage-title,.aas-process-main-title,.aas-related-title { font-size:26px; }
            .aas-services-grid { grid-template-columns:1fr; }
            .aas-service-card { padding:20px 18px 18px; }
            .aas-card-num { font-size:52px; }
            .aas-pstep-title { font-size:18px; }
            .aas-contact-title { font-size:24px; }
            .aas-engage-title { font-size:26px; }
            .aas-tcard { padding:24px 20px; }
            .aas-merged-box { padding:18px; }
          }
        `}</style>
      </Head>

      <div className="aas-page">
        <div className="aas-aurora" aria-hidden="true">
          <div className="aas-aurora-b1" />
          <div className="aas-aurora-b2" />
          <div className="aas-aurora-b3" />
        </div>

        {/* ── HERO ── */}
        <div className="aas-hero-block">
          <div className="aas-hero-content">
            <span className="aas-eyebrow">AI Automation Company — US, Canada & Australia</span>
            <h1>AI Automation Services That Eliminate Manual Work and Scale Your Operations</h1>
            <p>From intelligent document processing and AI chatbots to end-to-end workflow automation — 1Solutions builds production-grade AI systems that run reliably, save thousands of hours, and deliver measurable ROI within months.</p>
            <Link href="#contact" className="aas-btn-hero aas-btn-hero-shimmer">Get a Free Automation Audit</Link>
          </div>

          <div className="aas-hero-stats" ref={statsRef}>
            {[['Automations Delivered','150+'],['Hours Saved / Month','10,000+'],['Industries Served','20+'],['Client Retention','97%']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="aas-clients-bar">
            <span className="aas-clients-label">Trusted by Leading Brands</span>
            <div className="aas-clients-logos">
              <div className="aas-logos-track">
                {[
                  ['/logo/Indian_Express_Logo_full.png','Indian Express'],
                  ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],
                  ['/logo/Uniphore.jpg','Uniphore'],
                  ['/logo/ICCoLogo.png','ICC'],
                  ['/logo/Honor_Logo_(2020).svg.png','Honor'],
                  ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],
                  ['/logo/Indian_Express_Logo_full.png','Indian Express2'],
                  ['/logo/Verizon_2015_logo_-vector.svg.png','Verizon2'],
                  ['/logo/Uniphore.jpg','Uniphore2'],
                  ['/logo/ICCoLogo.png','ICC2'],
                  ['/logo/Honor_Logo_(2020).svg.png','Honor2'],
                  ['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv2'],
                ].map(([src,alt]) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="aas-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="aas-services-section">
          <div className="aas-services-inner">
            <div className={`aas-section-reveal${visibleSections.has('services') ? ' aas-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="aas-section-eyebrow">Our Services</span>
              <h2 className="aas-section-title">AI Automation Services We Offer</h2>
              <p className="aas-section-desc">Whether you need to automate a single department or transform your entire operations with AI — our team designs, builds, and deploys automation solutions that work in the real world, not just demos.</p>
            </div>
            <div className="aas-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`aas-service-card${s.featured?' featured':''}`}>
                  <span className="aas-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="aas-services-footer">
              <button className="aas-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="aas-tech-section">
          <div className="aas-tech-wrap">
            <div className={`aas-tech-header aas-section-reveal${visibleSections.has('tech') ? ' aas-revealed' : ''}`} ref={el => { sectionRefs.current['tech'] = el; }}>
              <h2 className="aas-tech-title">Our AI Automation Technology Stack</h2>
              <p className="aas-tech-subtitle">We use best-in-class AI models, orchestration frameworks, and integration platforms — chosen for reliability, cost efficiency, and production readiness.</p>
            </div>
            <div className="aas-tech-groups">
              {[
                { label:'Foundation Models',    color:'aas-tg-violet', tags:['Claude 3.7 Sonnet','GPT-4o','Gemini 1.5 Pro','Llama 3.3','Mistral Large','DeepSeek R1'] },
                { label:'Agent Frameworks',     color:'aas-tg-blue',   tags:['LangGraph','LangChain','AutoGen','CrewAI','Semantic Kernel','Pydantic AI'] },
                { label:'Document & Vision AI', color:'aas-tg-teal',   tags:['Amazon Textract','Google Document AI','Azure Form Recognizer','PyMuPDF','Tesseract OCR','LayoutLM'] },
                { label:'Integration & APIs',   color:'aas-tg-rose',   tags:['Zapier','Make (Integromat)','n8n','REST APIs','GraphQL','Webhooks','Twilio','Slack API'] },
                { label:'Data & Pipelines',     color:'aas-tg-amber',  tags:['Apache Airflow','Prefect','dbt','Pandas','PostgreSQL','MongoDB','Redis','Elasticsearch'] },
                { label:'Cloud & Infrastructure',color:'aas-tg-indigo', tags:['AWS','Google Cloud','Azure','Docker','Kubernetes','FastAPI','GitHub Actions','Terraform'] },
              ].map(group => (
                <div className={`aas-tech-group ${group.color}`} key={group.label}>
                  <div className="aas-tech-group-title">{group.label}</div>
                  <div className="aas-tech-tags">
                    {group.tags.map(tag => <span className="aas-tech-tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="aas-process-section">
          <div className="aas-process-top">
            <div className={`aas-section-reveal${visibleSections.has('process') ? ' aas-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="aas-process-eyebrow">HOW WE WORK</p>
              <h2 className="aas-process-main-title">How We Deliver AI Automation Projects</h2>
              <p className="aas-process-main-desc">We follow a structured process refined over 15+ years of delivering complex automation and AI projects for clients across the US, Canada, and Australia. Clear milestones, measurable outcomes, and full ownership handed to you at launch.</p>
            </div>
            <hr className="aas-process-divider" />
          </div>
          <div className="aas-process-inner">
            <div className="aas-process-steps">
              {[
                ['Discover & Audit','We map your current workflows, identify the highest-ROI automation opportunities, and quantify the time and cost savings. You get a clear picture of what to automate first — and why — before we write a line of code.'],
                ['Design & Architect','Our AI architects design the full automation blueprint — data flows, model selection, integration points, security controls, and exception-handling logic. You approve the design before development begins.'],
                ['Build & Integrate','We develop in two-week sprints, connecting your AI models, APIs, databases, and business systems into one cohesive automation. Weekly demos and a shared staging environment keep you in the loop throughout.'],
                ['Test & Validate','Every automation goes through rigorous testing — accuracy benchmarks, load testing, edge-case simulation, and user acceptance testing. We do not ship until it performs reliably on real-world data.'],
                ['Deploy & Monitor','We deploy to your cloud infrastructure, configure monitoring dashboards, set up alerting, and provide your team with full documentation and training. Post-launch support ensures a smooth go-live.'],
              ].map(([title, desc], i) => (
                <div
                  className={`aas-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="aas-pstep-left">
                    <div className="aas-pstep-circle">{i+1}</div>
                    {i < 4 && <div className="aas-pstep-arrow" />}
                  </div>
                  <div className="aas-pstep-content">
                    <h3 className="aas-pstep-title">{title}</h3>
                    <p className="aas-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="aas-process-image-col">
              <div className="aas-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions AI automation team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="aas-testi-section">
          <div className="aas-testi-inner">
            <div className={`aas-section-header-center aas-section-reveal${visibleSections.has('testi') ? ' aas-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="aas-section-eyebrow">Client Reviews</span>
              <h2 className="aas-section-title">What Our Clients Say</h2>
              <p className="aas-section-sub">Trusted by businesses across the US, Canada, Australia and beyond for 15+ years.</p>
            </div>
            <div className="aas-testi-grid" ref={testiGridRef}>
              {[
                { initials:'JM', bg:'#3730a3', text:'"1Solutions automated our entire invoice processing workflow — what used to take our finance team 3 days every month now runs overnight without anyone touching it. The ROI paid back the project cost in 6 weeks."', name:'James Mitchell', role:'CFO, NexaFin Group — USA', featured:false },
                { initials:'SR', bg:'#6d28d9', text:'"Their AI chatbot handles 70% of our customer support tickets without any human involvement. Response times dropped from 4 hours to 90 seconds and CSAT went up 22 points. Genuinely transformational."', name:'Sophie Richards', role:'Head of CX, TradeLink — Australia', featured:true },
                { initials:'DL', bg:'#4f46e5', text:'"We needed a complex document extraction pipeline for legal contracts. 1Solutions delivered it in 8 weeks with 97% accuracy — well above what our manual team achieved. Professional, transparent, and excellent communicators."', name:'Daniel Lefebvre', role:'VP Operations, LexCore — Canada', featured:false },
              ].map((t,i) => (
                <div className={`aas-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' aas-tcard-visible':''}`} key={t.name}>
                  <div className="aas-tcard-stars">★★★★★</div>
                  <p className="aas-tcard-text">{t.text}</p>
                  <div className="aas-tcard-author">
                    <div className="aas-tcard-avatar" style={{ background:t.bg }}>{t.initials}</div>
                    <div>
                      <div className="aas-tcard-name">{t.name}</div>
                      <div className="aas-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="aas-testi-stats">
              {[['4.9/5','Average Rating'],['150+','Automations Delivered'],['97%','Client Satisfaction'],['10,000+','Hours Saved Monthly']].map(([num,label],i,arr) => (
                <>
                  <div className="aas-tstat" key={label}>
                    <span className="aas-tstat-num">{num}</span>
                    <span className="aas-tstat-label">{label}</span>
                  </div>
                  {i < arr.length - 1 && <div className="aas-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="aas-why-section">
          <div className="aas-why-inner">
            <div className={`aas-section-header-center aas-section-reveal${visibleSections.has('why') ? ' aas-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }}>
              <span className="aas-section-eyebrow">Why 1Solutions</span>
              <h2 className="aas-section-title">Why Businesses Choose Us for AI Automation</h2>
              <p className="aas-section-sub">We build automations that work in production for months and years — not impressive demos that fall apart on edge cases.</p>
            </div>
            <div className="aas-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`aas-why-card${visibleWhyCards.includes(i) ? ' aas-card-visible' : ''}`} key={w.title}>
                  <div className="aas-why-card-header">
                    <div className="aas-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="aas-engage-section" id="engagement">
          <div className="aas-engage-inner">
            <div className="aas-engage-header">
              <span className="aas-section-eyebrow">How We Engage</span>
              <h2 className="aas-engage-title">Flexible Engagement Models</h2>
              <p className="aas-engage-desc">Pick the model that fits your project, team, and budget — every plan includes a free discovery call and NDA on request.</p>
            </div>

            <div className="aas-plans-grid">
              <article className="aas-pcard">
                <span className="aas-pcard-badge">One-time</span>
                <span className="aas-pcard-name">Fixed-Price Project</span>
                <p className="aas-pcard-blurb">Defined scope &amp; budget — ideal for clearly-scoped builds with a fixed timeline and deliverables.</p>
                <ul className="aas-pcard-features">
                  <li>Shared specialist team</li>
                  <li>Fixed scope &amp; deliverables</li>
                  <li>Budget predictability</li>
                  <li>Monthly progress report</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="aas-pcard-cta">Get a Quote</a>
              </article>
              <article className="aas-pcard">
                <span className="aas-pcard-badge">Flexible</span>
                <span className="aas-pcard-name">Time &amp; Materials</span>
                <p className="aas-pcard-blurb">Scale with evolving requirements — pay for what's delivered, adjust scope any sprint.</p>
                <ul className="aas-pcard-features">
                  <li>Shared specialist team</li>
                  <li>Flexible, evolving scope</li>
                  <li>Bi-weekly reporting</li>
                  <li>Priority task queue</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="aas-pcard-cta">Get a Quote</a>
              </article>
              <article className="aas-pcard aas-pcard--feat">
                <span className="aas-pcard-pop">✦ Most Popular</span>
                <span className="aas-pcard-name">Dedicated Team</span>
                <p className="aas-pcard-blurb">Your extended team — specialists embedded in your workflow, committed to your long-term growth.</p>
                <ul className="aas-pcard-features">
                  <li>Dedicated senior specialists</li>
                  <li>Exclusive monthly retainer</li>
                  <li>Daily standups &amp; tracking</li>
                  <li>Same-day support response</li>
                  <li>NDA &amp; full IP protection</li>
                </ul>
                <a href="#contact" className="aas-pcard-cta aas-pcard-cta--feat">Get Started</a>
              </article>
              <article className="aas-pcard">
                <span className="aas-pcard-badge">Cost-efficient</span>
                <span className="aas-pcard-name">Offshore Model</span>
                <p className="aas-pcard-blurb">Maximum ROI with our expert offshore team — senior-level quality at budget-friendly rates.</p>
                <ul className="aas-pcard-features">
                  <li>Expert offshore team</li>
                  <li>Cost-effective delivery</li>
                  <li>Monthly progress report</li>
                  <li>Budget-focused pricing</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="aas-pcard-cta">Get a Quote</a>
              </article>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="aas-contact-section" id="contact">
          <div className="aas-contact-container">
            <div>
              <h2 className="aas-contact-title">Ready to Automate Your Business?</h2>
              <p className="aas-contact-desc">Tell us about the process you want to automate — we will assess the feasibility, estimate the ROI, and recommend the right approach. No obligation, no sales pressure.</p>
              <div className="aas-merged-box">
                {[
                  { label:'Free ROI Assessment', desc:'We model the expected hours saved and cost reduction before you commit to a single dollar.' },
                  { label:'Response in 24 Hours', desc:'A senior AI engineer reviews your request and responds within one business day.' },
                  { label:'No Lock-In Contracts', desc:'Start with a fixed-price project. Expand to a dedicated team only when you see results.' },
                  { label:'Your Data Stays Private', desc:'We sign NDA on request. Your data never leaves your infrastructure without explicit approval.' },
                ].map(b => (
                  <div className="aas-benefit-item" key={b.label}>
                    <div className="aas-benefit-icon-wrap">
                      <svg className="aas-benefit-icon" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <strong style={{fontSize:'13px',color:'#0F1F40',display:'block',marginBottom:'2px'}}>{b.label}</strong>
                      <p>{b.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="aas-stats-box">
                  <div className="aas-stats-grid">
                    {[['150+','Automations Delivered'],['97%','Client Retention'],['15+','Years in Business']].map(([num,text]) => (
                      <div key={text}>
                        <div className="aas-stat-number">{num}</div>
                        <div className="aas-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="aas-form-box">
              <h3>Get Your Free Automation Audit</h3>
              <form className="aas-contact-form" onSubmit={_sfSubmit}>
                <div className="aas-form-row">
                  <div className="aas-form-group">
                    <label htmlFor="sf-name">Full Name *</label>
                    <input id="sf-name" name="sf-name" type="text" placeholder="John Smith" required />
                  </div>
                  <div className="aas-form-group">
                    <label htmlFor="sf-email">Work Email *</label>
                    <input id="sf-email" name="sf-email" type="email" placeholder="john@company.com" required />
                  </div>
                </div>
                <div className="aas-form-row">
                  <div className="aas-form-group">
                    <label htmlFor="sf-company">Company Name</label>
                    <input id="sf-company" name="sf-company" type="text" placeholder="Acme Corp" />
                  </div>
                  <div className="aas-form-group">
                    <label htmlFor="sf-phone">Phone Number</label>
                    <div className="aas-phone-input">
                      <select name="sf-cc" defaultValue="+1">
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+61">+61</option>
                        <option value="+91">+91</option>
                        <option value="+64">+64</option>
                        <option value="+65">+65</option>
                      </select>
                      <input id="sf-phone" name="sf-phone" type="tel" placeholder="(555) 000-0000" />
                    </div>
                  </div>
                </div>
                <div className="aas-form-group full">
                  <label htmlFor="sf-service">What Would You Like to Automate?</label>
                  <select id="sf-service" name="sf-service">
                    <option value="">Select a process...</option>
                    <option>Document Processing &amp; Data Extraction</option>
                    <option>Customer Support &amp; Chatbots</option>
                    <option>Finance &amp; Accounting Automation</option>
                    <option>Sales &amp; CRM Automation</option>
                    <option>HR &amp; Recruitment Automation</option>
                    <option>Data Pipelines &amp; ETL</option>
                    <option>Email &amp; Communication Automation</option>
                    <option>Supply Chain &amp; Logistics</option>
                    <option>Custom AI Workflow</option>
                    <option>Not sure — need advice</option>
                  </select>
                </div>
                <div className="aas-form-group full">
                  <label htmlFor="sf-message">Tell Us About Your Process *</label>
                  <textarea id="sf-message" name="sf-message" rows={4} placeholder="Describe the process you want to automate, how many people are involved, and how often it runs..." required />
                </div>
                <div className="aas-consent">
                  <input type="checkbox" id="sf-consent" name="sf-consent" required />
                  <label htmlFor="sf-consent">
                    I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to being contacted about my enquiry.
                  </label>
                </div>
                <button type="submit" className="aas-submit-btn" disabled={_sfSt === 'loading'}>
                  {_sfSt === 'loading' ? 'Sending...' : 'Get My Free Automation Audit →'}
                </button>
                {_sfSt === 'error' && <p style={{color:'#dc2626',fontSize:'13px',margin:'4px 0 0',textAlign:'center'}}>Something went wrong. Please try again or email us directly.</p>}
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="aas-faq-section">
          <div className="aas-faq-inner">
            <h2 className="aas-faq-heading">Frequently Asked Questions</h2>
            <div className="aas-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`aas-faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                  <button className="aas-faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="aas-faq-q-badge">{`Q${i+1}`}</span>
                    <span>{faq.q}</span>
                    <svg className="aas-faq-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="aas-faq-answer-wrap">
                    <div className="aas-faq-answer">
                      <span className="aas-faq-a-badge">A</span>
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="aas-related-section">
          <div className="aas-related-inner">
            <span className="aas-related-eyebrow">Explore More Services</span>
            <h2 className="aas-related-title">Related AI & Technology Services</h2>
            <p className="aas-related-sub">Expand your automation capabilities with our full suite of AI, development, and digital transformation services.</p>
            <hr className="aas-related-divider" />
            <div className="aas-related-tags">
              {[
                ['/ai-agent-development-services/','AI Agent Development','aas-rtag-violet'],
                ['/ai-chatbot-development-services/','AI Chatbot Development','aas-rtag-blue'],
                ['/python-development-services/','Python Development','aas-rtag-indigo'],
                ['/generative-engine-optimization-services/','Generative Engine Optimisation','aas-rtag-teal'],
                ['/hire-ai-developer/','Hire AI Developer','aas-rtag-rose'],
                ['/devops-services-company/','DevOps Services','aas-rtag-amber'],
                ['/cloud-native-services/','Cloud Native Development','aas-rtag-sky'],
                ['/api-development-services/','API Development','aas-rtag-green'],
                ['/hire-python-developer/','Hire Python Developer','aas-rtag-pink'],
                ['/cloud-migration-services/','Cloud Migration','aas-rtag-cyan'],
                ['/analytics-cro-services/','Analytics & CRO','aas-rtag-slate'],
                ['/erp-application-development-company/','ERP Development','aas-rtag-orange'],
              ].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`aas-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
