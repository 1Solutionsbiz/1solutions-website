'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Custom Software Development', desc:'Bespoke web and desktop applications built from scratch — designed to automate your unique business workflows and eliminate manual processes.', featured:true },
  { n:'02', title:'Web Application Development', desc:'Scalable, cloud-ready web apps built with React, Next.js, Vue, and Angular — from MVPs to enterprise-grade platforms.', featured:false },
  { n:'03', title:'Mobile Application Development', desc:'Native iOS, Android, and cross-platform Flutter apps that extend your digital services to every device your customers use.', featured:false },
  { n:'04', title:'API Development & Integration', desc:'RESTful and GraphQL APIs that connect your systems — CRM, ERP, payment gateways, and third-party platforms — into one seamless ecosystem.', featured:false },
  { n:'05', title:'Legacy System Modernisation', desc:'Re-architect and migrate outdated monolithic systems to modern, modular, cloud-native architectures without disrupting live operations.', featured:false },
  { n:'06', title:'Digital Workflow Automation', desc:'Replace repetitive manual processes with intelligent automation — using RPA, workflow engines, and AI-powered decision layers.', featured:false },
  { n:'07', title:'Enterprise Software Development', desc:'Robust, multi-tenant platforms built for scale — from internal tools to customer-facing SaaS products with enterprise security standards.', featured:false },
  { n:'08', title:'Digital Strategy Consulting', desc:'A 90-day digital roadmap built with your leadership team — identifying automation opportunities, tech stack gaps, and the highest-ROI initiatives.', featured:false },
  { n:'09', title:'Cloud Migration & Architecture', desc:'Lift-and-shift or re-architect workloads to AWS, Azure, or GCP with zero-downtime migration plans and post-migration optimisation.', featured:false },
  { n:'10', title:'UI/UX Design & Prototyping', desc:'Research-led design sprints that produce wireframes, interactive prototypes, and production-ready design systems before a line of code is written.', featured:false },
  { n:'11', title:'QA & Test Automation', desc:'End-to-end test suites, automated regression testing, and performance benchmarking that catch issues before they reach production.', featured:false },
  { n:'12', title:'DevOps & CI/CD Implementation', desc:'Automated build, test, and deploy pipelines that let your team ship faster with confidence — and roll back safely when needed.', featured:false },
];

const FAQS = [
  { q:'What does digital transformation actually mean for a business?', a:'Digital transformation means replacing manual, paper-based, or siloed processes with integrated digital systems that automate work, surface data in real time, and enable faster decision-making. In practice, this ranges from building a custom internal portal to modernising a legacy ERP to launching a customer-facing SaaS product. We start with a discovery process to identify which changes will deliver the most ROI for your specific business.' },
  { q:'How long does a digital transformation project take?', a:'Scope determines timeline. A focused workflow automation project or internal tool can go live in 6-10 weeks. A full legacy system re-architecture or enterprise SaaS build typically takes 4-9 months with phased delivery. We break every engagement into 2-week sprints so you see working software quickly — not just a Gantt chart. Detailed timelines are scoped in our paid discovery phase before development begins.' },
  { q:'Do you work with clients in the US, Canada, and Australia?', a:'Yes — all of our delivery is remote. We\'ve been partnering with clients across the US, Canada, and Australia since 2008. We assign a dedicated project manager who works your time zone, runs weekly demo calls, and maintains a live project board you can check any time.' },
  { q:'How much does a custom software project cost?', a:'Custom web applications typically start from $15,000 for focused MVPs and scale to $80,000+ for complex enterprise platforms with multiple integrations. Mobile apps start from $20,000. The investment depends on scope, complexity, number of integrations, and compliance requirements. We provide fixed-price proposals after a paid discovery sprint — so there are no surprises mid-project.' },
  { q:'What technology stack do you use?', a:'We\'re stack-agnostic and choose based on your requirements. For web apps: React, Next.js, Vue, Angular on the frontend; Node.js, Python, .NET, Laravel on the backend. For mobile: Flutter for cross-platform, Swift for iOS, Kotlin for Android. For cloud: AWS, Azure, GCP. For databases: PostgreSQL, MongoDB, MySQL, Redis. We recommend the right stack for your use case — not the one we happen to prefer.' },
  { q:'Can you take over a project another agency started?', a:'Yes. We regularly inherit in-progress projects from agencies or freelancers. Our process starts with a code audit and architecture review — we give you an honest assessment of what is sound, what needs refactoring, and what the path forward looks like. We\'ve successfully rescued projects that were months behind schedule and delivered them to production.' },
  { q:'Do you offer ongoing support after launch?', a:'Yes. Every project includes a 30-day post-launch hypercare period. After that, we offer monthly support retainers covering bug fixes, minor feature requests, dependency updates, performance monitoring, and security patching. Retainers start from $800/month. Most clients stay on retainer because having the team that built the system maintain it is simply the most efficient arrangement.' },
  { q:'What is your development process?', a:'We follow a structured 4-phase process: Discover (stakeholder interviews, process mapping, requirements), Define (architecture design, tech stack selection, fixed-price proposal), Develop (2-week agile sprints with live demos), Deploy (UAT, staging, production cutover with zero-downtime strategy). You have a dedicated point of contact throughout and never lose visibility into what\'s being built.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'15+ Years of Software Delivery', desc:'Since 2008, we\'ve delivered 500+ projects across industries — from funded startups to Fortune 500 enterprises in US, Canada, and Australia.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'Fixed-Price, No-Surprise Delivery', desc:'Detailed scoping before development means you know the exact cost and timeline before we write a single line of code. No change-order surprises.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'2-Week Sprint Cadence', desc:'Agile delivery with fortnightly demo calls means you see working software early and often — and can redirect before large costs are sunk.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'Western Market Experience', desc:'We understand US, Canadian, and Australian compliance requirements, data residency rules, and enterprise procurement processes.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Security-First Architecture', desc:'SOC 2-ready infrastructure design, OWASP-compliant code practices, and penetration testing available for every project we deliver.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Cross-Functional Team', desc:'Every project gets a project manager, architect, frontend and backend developers, QA engineer, and designer — no juggling freelancers.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>, title:'You Own Everything', desc:'Full source code ownership, IP assignment, and documentation handover on completion. No vendor lock-in — ever.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'Our average client relationship spans 4+ years. We stay invested in your product\'s success well beyond the initial launch.' },
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
    <div className="dt-stat-col">
      <div className="dt-stat-label">{label}</div>
      <div className="dt-stat-value">{display}</div>
    </div>
  );
}

export default function DigitalTransformationPage() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleECards, setVisibleECards] = useState([]);
  const stepRefs = useRef([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);
  const eCardsRef = useRef(null);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i)?p:[...p,i]), i*150); obs.disconnect(); } },
        { threshold: 0.25 }
      );
      obs.observe(el); return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.5 }
    );
    obs.observe(statsRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!whyGridRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { WHY.forEach((_,i) => setTimeout(() => setVisibleWhyCards(p => p.includes(i)?p:[...p,i]), i*100)); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(whyGridRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!testiGridRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { [0,1,2].forEach(i => setTimeout(() => setVisibleTestiCards(p => p.includes(i)?p:[...p,i]), i*150)); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(testiGridRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!eCardsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { [0,1,2,3].forEach(i => setTimeout(() => setVisibleECards(p => p.includes(i)?p:[...p,i]), i*130)); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(eCardsRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key]; if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); } },
        { threshold: 0.15 }
      );
      obs.observe(el); return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const visibleServices = showAll ? SERVICES : SERVICES.slice(0, 8);

  return (
    <>
      <Head>
        <title>Digital Transformation Services | Custom Software & Web Application Development | 1Solutions</title>
        <meta name="description" content="1Solutions delivers end-to-end digital transformation — custom software, web apps, mobile apps, API integrations, and legacy modernisation for US, Canada & Australia businesses." />
        <meta name="keywords" content="digital transformation, custom software development, web application development, legacy system modernisation, workflow automation, enterprise software" />
        <link rel="canonical" href="https://www.1solutions.biz/digital-transformation/" />
        <meta property="og:title" content="Digital Transformation Services | 1Solutions" />
        <meta property="og:description" content="Digitize and automate complex workflows with modular, scalable software. 15+ years, 500+ projects, US/Canada/Australia clients." />
        <meta property="og:url" content="https://www.1solutions.biz/digital-transformation/" />
        <style>{`
          .dt-page {
            font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;
            background:linear-gradient(135deg,#eef2ff 0%,#e0e7ff 25%,#ede9fe 55%,#fdf4ff 80%,#f0f9ff 100%);
            color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden;overflow-y:clip;
          }
          .dt-page *,.dt-page *::before,.dt-page *::after{box-sizing:border-box;}

          .dt-orb-1{position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.28) 0%,rgba(139,92,246,0.12) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px);}
          .dt-orb-2{position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.25) 0%,rgba(245,158,11,0.10) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px);}
          .dt-orb-3{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.18) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px);}

          .dt-hero-block{background:transparent;position:relative;overflow:hidden;}
          .dt-hero-block::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px);}
          .dt-hero-block::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.14) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px);}
          .dt-hero-content{position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px;}
          .dt-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4338CA;margin-bottom:18px;}
          .dt-hero-content h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#3730A3 0%,#D97706 60%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .dt-hero-content p{font-size:16px;color:#374151;line-height:1.65;max-width:640px;margin:0 auto 28px;}
          .dt-btn-hero{display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#3730A3;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(55,48,163,0.12),inset 0 1px 0 rgba(255,255,255,1);position:relative;overflow:hidden;}
          .dt-btn-hero::after{content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:dt-shimmer 2.5s ease-in-out infinite;pointer-events:none;}
          @keyframes dt-shimmer{0%{left:-120%;}35%,100%{left:160%;}}
          .dt-btn-hero:hover{background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(55,48,163,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#3730A3;}

          .dt-hero-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(55,48,163,0.08),inset 0 1px 0 rgba(255,255,255,0.95);}
          .dt-stat-col{padding:18px 20px;text-align:center;border-right:1px solid rgba(55,48,163,0.10);}
          .dt-stat-col:last-child{border-right:none;}
          .dt-stat-label{font-size:12px;color:#374151;font-weight:500;margin-bottom:6px;}
          .dt-stat-value{font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1;}

          .dt-clients-bar{position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px;}
          .dt-clients-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0;}
          .dt-clients-logos{width:100%;overflow:hidden;}
          .dt-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:dt-marquee 28s linear infinite;}
          .dt-logos-track:hover{animation-play-state:paused;}
          @keyframes dt-marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
          .dt-client-logo{height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s;}
          .dt-client-logo:hover{opacity:0.85;filter:grayscale(0%);}

          .dt-section-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6D28D9;margin-bottom:12px;display:block;}
          .dt-section-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#3730A3 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px;}
          .dt-section-desc{font-size:15px;color:#374151;line-height:1.7;max-width:680px;margin-bottom:36px;}

          .dt-services-section{background:#f5f3ff;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(55,48,163,0.10),0 -4px 16px rgba(55,48,163,0.06);}
          .dt-services-inner{max-width:1280px;margin:0 auto;}
          .dt-services-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
          .dt-service-card{background:linear-gradient(135deg,rgba(224,231,255,0.55) 0%,rgba(255,255,255,0.85) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(55,48,163,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default;}
          .dt-service-card:hover{transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(55,48,163,0.12),inset 0 1px 0 rgba(255,255,255,1);}
          .dt-service-card.featured{border-color:rgba(99,102,241,0.20);box-shadow:0 6px 32px rgba(99,102,241,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .dt-service-card:hover h3{color:#6D28D9;}
          .dt-card-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#3730A3;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none;}
          .dt-service-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1;}
          .dt-service-card p{font-size:13px;color:#374151;line-height:1.6;position:relative;z-index:1;}
          .dt-service-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#6D28D9,#a78bfa);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1);}
          .dt-service-card:hover::before{transform:scaleY(1);}
          .dt-services-footer{text-align:center;margin-top:20px;}
          .dt-btn-show-more{display:inline-block;background:#ffffff;border:1.5px solid rgba(55,48,163,0.20);color:#3730A3;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(55,48,163,0.08);font-family:inherit;}
          .dt-btn-show-more:hover{background:#3730A3;border-color:#3730A3;color:#ffffff;box-shadow:0 8px 28px rgba(55,48,163,0.20);transform:translateY(-2px);}

          .dt-pillars-section{background:transparent;padding:80px 40px;position:relative;z-index:1;}
          .dt-pillars-wrap{max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(55,48,163,0.08),inset 0 1px 0 rgba(255,255,255,0.95);}
          .dt-pillars-header{margin-bottom:40px;}
          .dt-pillars-title{font-size:38px;font-weight:900;line-height:1.15;letter-spacing:-0.8px;background:linear-gradient(90deg,#3730A3 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 12px;}
          .dt-pillars-sub{font-size:15px;color:#374151;line-height:1.7;max-width:600px;margin:0;}
          .dt-pillars-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
          .dt-pillar-card{background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(55,48,163,0.12);border-radius:14px;padding:28px 24px;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s;}
          .dt-pillar-card:hover{transform:translateY(-4px);border-color:rgba(217,119,6,0.5);box-shadow:0 12px 40px rgba(0,0,0,0.10);}
          .dt-pillar-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
          .dt-pillar-icon svg{width:26px;height:26px;}
          .dt-pillar-card h3{font-size:16px;font-weight:700;color:#3730A3;margin:0 0 8px;}
          .dt-pillar-card p{font-size:13px;color:#374151;line-height:1.6;margin:0;}

          .dt-process-section{background:transparent;padding:80px 40px;position:relative;z-index:1;}
          .dt-process-top{max-width:1280px;margin:0 auto 56px;}
          .dt-process-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#6D28D9;margin:0 0 14px;}
          .dt-process-main-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#3730A3 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .dt-process-main-desc{font-size:15px;color:#374151;line-height:1.7;margin:0;}
          .dt-process-divider{border:none;border-top:1px solid rgba(55,48,163,0.15);margin:36px 0 0;width:100%;}
          .dt-process-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start;}
          .dt-process-steps{display:flex;flex-direction:column;}
          .dt-pstep{display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1);}
          .dt-pstep.visible{opacity:1;transform:translateY(0);}
          .dt-pstep-left{display:flex;flex-direction:column;align-items:center;}
          .dt-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(55,48,163,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#3730A3;flex-shrink:0;transition:background 0.3s,border-color 0.3s;}
          .dt-pstep:hover .dt-pstep-circle{background:rgba(109,40,217,0.15);border-color:#6D28D9;color:#6D28D9;}
          .dt-pstep-arrow{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px;}
          .dt-pstep-arrow::before{content:'';width:2px;flex:1;background:#3730A3;opacity:0.25;}
          .dt-pstep-arrow::after{content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #3730A3;opacity:0.45;margin-top:-1px;}
          .dt-pstep:last-child .dt-pstep-arrow{display:none;}
          .dt-pstep-content{padding:4px 0 44px;}
          .dt-pstep:last-child .dt-pstep-content{padding-bottom:0;}
          .dt-pstep-title{font-size:22px;font-weight:700;color:#3730A3;margin:0 0 10px;line-height:1.2;}
          .dt-pstep-desc{font-size:15px;color:#374151;line-height:1.75;margin:0;}
          .dt-process-image-col{position:sticky;top:100px;min-width:0;}
          .dt-process-img-wrap{width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(55,48,163,0.15);aspect-ratio:4/5;background:#e0e7ff;}
          .dt-process-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;}

          .dt-testi-section{background:#f5f3ff;border-top:1px solid rgba(55,48,163,0.08);border-bottom:1px solid rgba(55,48,163,0.08);padding:80px 40px;position:relative;z-index:1;}
          .dt-testi-inner{max-width:1280px;margin:0 auto;}
          .dt-section-header-center{text-align:center;margin-bottom:52px;}
          .dt-testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px;}
          .dt-tcard{background:linear-gradient(135deg,rgba(224,231,255,0.55) 0%,rgba(255,255,255,0.85) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(55,48,163,0.07),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s;}
          .dt-tcard.dt-tcard-visible{opacity:1;transform:translateY(0);}
          .dt-tcard:hover{transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(55,48,163,0.12),inset 0 1px 0 rgba(255,255,255,1);}
          .dt-tcard.featured{background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.88) 55%,rgba(224,231,255,0.40) 100%);border-color:rgba(217,119,6,0.25);}
          .dt-tcard-stars{font-size:18px;color:#D97706;letter-spacing:2px;}
          .dt-tcard-text{font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1;}
          .dt-tcard-author{display:flex;align-items:center;gap:12px;margin-top:4px;}
          .dt-tcard-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0;}
          .dt-tcard-name{font-size:14px;font-weight:700;color:#3730A3;}
          .dt-tcard-role{font-size:12px;color:#6b7280;}
          .dt-testi-stats{display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(224,231,255,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(55,48,163,0.07),inset 0 1px 0 rgba(255,255,255,0.95);}
          .dt-tstat{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;}
          .dt-tstat-num{font-size:28px;font-weight:800;color:#3730A3;}
          .dt-tstat-label{font-size:13px;color:#374151;font-weight:500;}
          .dt-tstat-divider{width:1px;height:40px;background:rgba(55,48,163,0.15);}

          .dt-why-section{padding:80px 40px;background:#f5f3ff;border-top:1px solid rgba(55,48,163,0.08);border-bottom:1px solid rgba(55,48,163,0.08);position:relative;z-index:1;}
          .dt-why-inner{max-width:1280px;margin:0 auto;}
          .dt-why-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px;}
          .dt-why-card{background:linear-gradient(135deg,rgba(224,231,255,0.55) 0%,rgba(255,255,255,0.85) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(55,48,163,0.07),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s;}
          .dt-why-card.dt-card-visible{opacity:1;transform:translateY(0) scale(1);}
          .dt-why-card:hover{transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(55,48,163,0.12),inset 0 1px 0 rgba(255,255,255,1);}
          .dt-why-card-header{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
          .dt-why-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;}
          .dt-why-icon svg{width:28px;height:28px;fill:#6D28D9;}
          .dt-why-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35;}
          .dt-why-card p{font-size:13px;color:#374151;line-height:1.7;margin:0;}

          .dt-engage-section{background:#f5f3ff;border-top:1px solid rgba(55,48,163,0.08);padding:80px 40px;position:relative;z-index:1;}
          .dt-engage-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch;}
          .dt-engage-left{position:sticky;top:100px;display:flex;flex-direction:column;}
          .dt-engage-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#3730A3 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .dt-engage-desc{font-size:15px;color:#374151;line-height:1.75;margin:0 0 32px;}
          .dt-engage-img-wrap{border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(55,48,163,0.15);flex:1;min-height:300px;}
          .dt-engage-img-wrap img{width:100%;height:100%;min-height:300px;object-fit:cover;display:block;}
          .dt-engage-right{display:flex;flex-direction:column;gap:16px;}
          .dt-ecard{background:linear-gradient(135deg,rgba(224,231,255,0.55) 0%,rgba(255,255,255,0.85) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(55,48,163,0.07),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s;}
          .dt-ecard.dt-ecard-visible{opacity:1;transform:translateX(0);}
          .dt-ecard:hover{border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(55,48,163,0.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateX(4px);}
          .dt-ecard-header{display:flex;align-items:center;gap:14px;margin-bottom:10px;}
          .dt-ecard-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;}
          .dt-ecard-icon svg{width:26px;height:26px;stroke:#6D28D9;fill:none;}
          .dt-ecard-title{font-size:18px;font-weight:700;color:#3730A3;margin:0;}
          .dt-ecard-desc{font-size:14px;color:#374151;line-height:1.65;margin:0 0 16px;}
          .dt-ecard-features{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;}
          .dt-efeat{display:flex;align-items:center;gap:8px;font-size:13px;color:#3730A3;font-weight:500;}
          .dt-efeat-check{color:#6D28D9;font-size:12px;flex-shrink:0;}

          .dt-contact-section{padding:70px 40px;background:linear-gradient(135deg,rgba(224,231,255,0.65) 0%,rgba(255,255,255,0.60) 40%,rgba(254,243,199,0.60) 100%);backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80);}
          .dt-contact-container{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px;}
          .dt-contact-left{padding:0;align-self:start;}
          .dt-contact-title{font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#3730A3 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;}
          .dt-contact-desc{font-size:14px;color:#374151;line-height:1.6;margin:0 0 24px;}
          .dt-merged-box{background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(224,231,255,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px;}
          .dt-benefit-item{display:flex;gap:10px;align-items:flex-start;}
          .dt-benefit-icon-wrap{width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .dt-benefit-icon{width:20px;height:20px;stroke:#6D28D9;stroke-width:1.75;}
          .dt-benefit-item p{font-size:13px;color:#374151;margin:0;line-height:1.5;}
          .dt-stats-box{padding-top:32px;border-top:1px solid rgba(55,48,163,0.12);}
          .dt-stats-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
          .dt-stat-number{font-size:40px;font-weight:900;color:#3730A3;line-height:1;display:inline-block;margin-bottom:4px;}
          .dt-stat-text{font-size:13px;color:#374151;line-height:1.4;font-weight:500;}
          .dt-contact-right{align-self:start;}
          .dt-form-box{background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(224,231,255,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(55,48,163,0.08),inset 0 1px 0 rgba(255,255,255,1);}
          .dt-form-box h3{font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px;}
          .dt-contact-form{display:flex;flex-direction:column;gap:16px;}
          .dt-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
          .dt-form-group{display:flex;flex-direction:column;gap:6px;}
          .dt-form-group.full{grid-column:1/-1;}
          .dt-form-group label{font-size:12px;font-weight:500;color:#0F1F40;}
          .dt-form-group input,.dt-form-group textarea,.dt-form-group select{padding:10px 14px;border:1px solid rgba(55,48,163,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(55,48,163,0.06);transition:border-color 0.2s,background 0.2s;}
          .dt-form-group input:focus,.dt-form-group textarea:focus{outline:none;border-color:#6D28D9;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(109,40,217,0.12);}
          .dt-phone-input{display:flex;border:1px solid rgba(55,48,163,0.15);border-radius:6px;overflow:hidden;}
          .dt-phone-input select{padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px;}
          .dt-phone-input input{flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none;}
          .dt-phone-input input:focus{outline:none;}
          .dt-consent{display:flex;gap:8px;align-items:flex-start;margin-top:8px;}
          .dt-consent input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;}
          .dt-consent label{font-size:11px;color:#374151;line-height:1.5;margin:0;}
          .dt-consent a{color:#3730A3;text-decoration:none;}
          .dt-submit-btn{padding:14px 28px;background:rgba(55,48,163,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(55,48,163,0.25),inset 0 1px 0 rgba(255,255,255,0.15);}
          .dt-submit-btn:hover{background:rgba(55,48,163,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);}

          .dt-faq-section{padding:80px 40px;background:#f5f3ff;border-top:1px solid rgba(55,48,163,0.08);position:relative;z-index:1;}
          .dt-faq-inner{max-width:1280px;margin:0 auto;}
          .dt-faq-heading{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#3730A3 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px;}
          .dt-faq-list{display:flex;flex-direction:column;gap:12px;}
          .dt-faq-item{background:linear-gradient(135deg,rgba(224,231,255,0.55) 0%,rgba(255,255,255,0.85) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(55,48,163,0.06),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s;}
          .dt-faq-item.open{border-color:rgba(109,40,217,0.35);box-shadow:0 8px 32px rgba(55,48,163,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .dt-faq-item.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#6D28D9;border-radius:3px 0 0 3px;}
          .dt-faq-question{width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative;}
          .dt-faq-q-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(55,48,163,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s;}
          .dt-faq-item.open .dt-faq-q-badge{background:#6D28D9;color:#fff;}
          .dt-faq-question span{font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45;}
          .dt-faq-item.open .dt-faq-question span{color:#6D28D9;}
          .dt-faq-chevron{width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s;}
          .dt-faq-item.open .dt-faq-chevron{transform:rotate(180deg);color:#6D28D9;}
          .dt-faq-answer-wrap{overflow:hidden;transition:max-height 0.35s ease;max-height:0;}
          .dt-faq-item.open .dt-faq-answer-wrap{max-height:400px;}
          .dt-faq-answer{padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8;}

          .dt-related-section{background:rgba(224,231,255,0.20);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px;}
          .dt-related-inner{max-width:1280px;margin:0 auto;text-align:center;}
          .dt-related-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#374151;margin:0 0 14px;display:block;}
          .dt-related-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#3730A3 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .dt-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px;}
          .dt-related-divider{border:none;border-top:1px solid rgba(55,48,163,0.12);margin:40px 0;}
          .dt-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;}
          .dt-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s;}
          .dt-rtag:hover{filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10);}
          .dt-rtag-indigo{background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA;}
          .dt-rtag-violet{background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9;}
          .dt-rtag-blue{background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8;}
          .dt-rtag-amber{background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309;}
          .dt-rtag-teal{background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E;}
          .dt-rtag-green{background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D;}
          .dt-rtag-orange{background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C;}
          .dt-rtag-sky{background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1;}

          .dt-section-reveal{opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1);}
          .dt-section-reveal.dt-revealed{opacity:1;transform:translateY(0);}

          @media(max-width:900px){.dt-page{background:linear-gradient(160deg,#eef2ff 0%,#e0e7ff 30%,#ede9fe 60%,#fdf4ff 85%,#f0f9ff 100%) !important;}}
          @media(max-width:1024px){
            .dt-hero-content h1{font-size:40px;}
            .dt-services-grid{grid-template-columns:repeat(2,1fr);}
            .dt-why-grid{grid-template-columns:repeat(2,1fr);}
            .dt-pillars-grid{grid-template-columns:repeat(2,1fr);}
            .dt-engage-inner{grid-template-columns:1fr;}
            .dt-engage-left{position:static;}
            .dt-process-inner{grid-template-columns:1fr;}
            .dt-process-image-col{display:none;}
          }
          @media(max-width:768px){
            .dt-page{overflow-x:hidden;}
            .dt-hero-content{padding:36px 20px 24px;}
            .dt-hero-content h1{font-size:28px;letter-spacing:-0.3px;}
            .dt-hero-content p{font-size:15px;}
            .dt-hero-stats{grid-template-columns:1fr 1fr;max-width:100%;}
            .dt-stat-col{padding:14px 12px;}
            .dt-stat-col:nth-child(2){border-right:none;}
            .dt-stat-col:nth-child(3){border-top:1px solid rgba(55,48,163,0.10);}
            .dt-stat-col:nth-child(4){border-top:1px solid rgba(55,48,163,0.10);border-right:none;}
            .dt-stat-value{font-size:22px;}
            .dt-clients-bar{padding:16px 20px 36px;gap:12px;}
            .dt-client-logo{height:20px;}
            .dt-services-section{padding:48px 20px 40px;}
            .dt-pillars-section{padding:48px 16px;}
            .dt-pillars-wrap{padding:24px 20px 32px;border-radius:16px;}
            .dt-pillars-grid{grid-template-columns:1fr;}
            .dt-pillars-title{font-size:26px;}
            .dt-process-section{padding:60px 20px;}
            .dt-testi-section{padding:60px 20px;}
            .dt-testi-section .dt-section-header-center{text-align:left;}
            .dt-why-section{padding:60px 20px;}
            .dt-why-section .dt-section-header-center{text-align:left;}
            .dt-why-grid{grid-template-columns:1fr;margin-top:40px;}
            .dt-engage-section{padding:60px 20px;}
            .dt-contact-section{padding:48px 16px;}
            .dt-contact-container{grid-template-columns:1fr;gap:20px;}
            .dt-contact-title{font-size:28px;}
            .dt-faq-section{padding:60px 20px;}
            .dt-faq-heading{font-size:26px;}
            .dt-faq-question{padding:18px 18px 18px 52px;}
            .dt-faq-question span{font-size:14px;}
            .dt-faq-answer{padding:0 18px 18px 52px;font-size:14px;}
            .dt-faq-q-badge{left:14px;}
            .dt-related-section{padding:60px 20px;}
            .dt-related-tags{gap:8px;}
            .dt-rtag{padding:9px 16px;font-size:13px;}
            .dt-services-grid{grid-template-columns:1fr 1fr;gap:10px;}
            .dt-testi-grid{grid-template-columns:1fr;}
            .dt-section-title,.dt-engage-title,.dt-process-main-title,.dt-related-title{font-size:30px;}
            .dt-testi-stats{flex-wrap:wrap;gap:0;padding:24px 20px;}
            .dt-tstat{flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(55,48,163,0.10);}
            .dt-tstat:nth-child(odd){border-right:1px solid rgba(55,48,163,0.10);}
            .dt-tstat:nth-last-child(-n+2){border-bottom:none;}
            .dt-tstat-divider{display:none;}
            .dt-form-row{grid-template-columns:1fr;}
            .dt-stats-grid{grid-template-columns:1fr 1fr 1fr;}
            .dt-stat-number{font-size:28px;}
          }
          @media(max-width:480px){
            .dt-hero-content h1{font-size:24px;}
            .dt-section-title,.dt-engage-title,.dt-process-main-title,.dt-related-title{font-size:26px;}
            .dt-services-grid{grid-template-columns:1fr;}
            .dt-service-card{padding:20px 18px 18px;}
            .dt-card-num{font-size:52px;}
            .dt-contact-title{font-size:24px;}
            .dt-engage-title{font-size:26px;}
            .dt-tcard{padding:24px 20px;}
            .dt-ecard{padding:20px;}
            .dt-ecard-features{grid-template-columns:1fr;}
            .dt-merged-box{padding:18px;}
          }
        `}</style>
      </Head>

      <div className="dt-page">
        <div className="dt-orb-1" /><div className="dt-orb-2" /><div className="dt-orb-3" />

        {/* HERO */}
        <div className="dt-hero-block">
          <div className="dt-hero-content">
            <span className="dt-eyebrow">End-to-End Digital Transformation Partner</span>
            <h1>Digital Transformation Services — Modernise, Automate & Scale Your Business</h1>
            <p>From custom software and web applications to legacy modernisation and workflow automation — 1Solutions delivers the technology your business needs to operate faster, smarter, and at scale.</p>
            <Link href="#contact" className="dt-btn-hero">Start Your Transformation</Link>
          </div>
          <div className="dt-hero-stats" ref={statsRef}>
            {[['Projects Delivered','1,200+'],['Enterprise Clients','120+'],['Years in Business','15+'],['Client Retention','97%']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>
          <div className="dt-clients-bar">
            <span className="dt-clients-label">Trusted by Leading Brands</span>
            <div className="dt-clients-logos">
              <div className="dt-logos-track">
                {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon2'],['/logo/Uniphore.jpg','Uniphore2'],['/logo/ICCoLogo.png','ICC2'],['/logo/Honor_Logo_(2020).svg.png','Honor2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv2']].map(([src,alt]) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="dt-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <section className="dt-services-section">
          <div className="dt-services-inner">
            <div className={`dt-section-reveal${visibleSections.has('services')?' dt-revealed':''}`} ref={el=>{sectionRefs.current['services']=el;}}>
              <span className="dt-section-eyebrow">What We Build</span>
              <h2 className="dt-section-title">Digital Transformation Services We Offer</h2>
              <p className="dt-section-desc">From modernising legacy systems to building greenfield SaaS platforms — every engagement is scoped, fixed-price, and delivered in agile sprints.</p>
            </div>
            <div className="dt-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`dt-service-card${s.featured?' featured':''}`}>
                  <span className="dt-card-num">{s.n}</span>
                  <h3>{s.title}</h3><p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="dt-services-footer">
              <button className="dt-btn-show-more" onClick={()=>setShowAll(v=>!v)}>
                {showAll?'Show Less ↑':'Show More Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* PILLARS */}
        <section className="dt-pillars-section">
          <div className="dt-pillars-wrap">
            <div className="dt-pillars-header">
              <h2 className={`dt-pillars-title dt-section-reveal${visibleSections.has('pillars')?' dt-revealed':''}`} ref={el=>{sectionRefs.current['pillars']=el;}}>
                Built on Four Technology Pillars
              </h2>
              <p className="dt-pillars-sub">Every transformation we deliver is grounded in the same four principles — regardless of industry or stack.</p>
            </div>
            <div className="dt-pillars-grid">
              {[
                { bg:'#eef2ff', icon:<svg viewBox="0 0 24 24" fill="none" stroke="#4338CA" strokeWidth="2" width="26" height="26"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="17" x2="22" y2="17"/><rect x="9" y="20" width="6" height="2" fill="#4338CA" stroke="none"/></svg>, title:'Modular Architecture', desc:'Systems built as composable services — so you can swap, scale, or extend any component without rewriting the whole platform.' },
                { bg:'#fdf4ff', icon:<svg viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" width="26" height="26"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title:'Security by Design', desc:'OWASP-compliant code, encrypted data at rest and in transit, role-based access control, and penetration testing on every build.' },
                { bg:'#eff6ff', icon:<svg viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" width="26" height="26"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Performance-First', desc:'Sub-second load times, optimised database queries, CDN distribution, and auto-scaling infrastructure that handles traffic spikes.' },
                { bg:'#fef3c7', icon:<svg viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" width="26" height="26"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, title:'Full Documentation', desc:'Inline code comments, API docs, architecture diagrams, and runbooks delivered with every project — so your team can maintain it independently.' },
                { bg:'#f0fdf4', icon:<svg viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" width="26" height="26"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, title:'Real-Time Analytics', desc:'Built-in observability with logging, error tracking, uptime monitoring, and custom dashboards from day one — not bolted on after launch.' },
                { bg:'#fff7ed', icon:<svg viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" width="26" height="26"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>, title:'Accessibility & Compliance', desc:'WCAG 2.1 AA compliance, GDPR/CCPA-ready data handling, and ADA-compliant UI patterns built into every client-facing product.' },
              ].map(p=>(
                <div className="dt-pillar-card" key={p.title}>
                  <div className="dt-pillar-icon" style={{background:p.bg}}>{p.icon}</div>
                  <h3>{p.title}</h3><p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="dt-process-section">
          <div className="dt-process-top">
            <div className={`dt-section-reveal${visibleSections.has('process')?' dt-revealed':''}`} ref={el=>{sectionRefs.current['process']=el;}}>
              <p className="dt-process-eyebrow">HOW WE DELIVER</p>
              <h2 className="dt-process-main-title">Our 4D Software Delivery Process</h2>
              <p className="dt-process-main-desc">Every project follows the same structured process — from discovery to deployment — so you always know what is being built, when it will be ready, and how much it will cost.</p>
            </div>
            <hr className="dt-process-divider" />
          </div>
          <div className="dt-process-inner">
            <div className="dt-process-steps">
              {[
                ['Discover','Stakeholder interviews, process mapping, and technical discovery sessions to fully understand your requirements before any architecture decisions are made.'],
                ['Define','Architecture design, technology selection, UI wireframes, and a fixed-price proposal with sprint-level timeline. No development starts until you approve the scope.'],
                ['Develop','2-week agile sprints with live demos at every milestone. You see working software early and can provide feedback before significant costs are sunk.'],
                ['Deploy','UAT on staging, performance testing, security review, and zero-downtime production cutover. Followed by 30-day hypercare and optional long-term support retainer.'],
              ].map(([title,desc],i)=>(
                <div className={`dt-pstep${visibleSteps.includes(i)?' visible':''}`} key={title} ref={el=>{stepRefs.current[i]=el;}}>
                  <div className="dt-pstep-left">
                    <div className="dt-pstep-circle">{i+1}</div>
                    {i<3&&<div className="dt-pstep-arrow"/>}
                  </div>
                  <div className="dt-pstep-content">
                    <h3 className="dt-pstep-title">{title}</h3>
                    <p className="dt-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="dt-process-image-col">
              <div className="dt-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://placehold.co/480x600/3730A3/ffffff?text=Software+Delivery+Process" alt="Software delivery process" loading="lazy"/>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="dt-testi-section">
          <div className="dt-testi-inner">
            <div className={`dt-section-header-center dt-section-reveal${visibleSections.has('testi')?' dt-revealed':''}`} ref={el=>{sectionRefs.current['testi']=el;}}>
              <span className="dt-section-eyebrow">Client Results</span>
              <h2 className="dt-section-title">What Clients Say About Our Work</h2>
              <p className="dt-section-desc" style={{margin:'0 auto 0'}}>Real projects, real results — from businesses that chose 1Solutions to lead their digital transformation.</p>
            </div>
            <div className="dt-testi-grid" ref={testiGridRef}>
              {[
                { stars:'★★★★★',featured:true, text:'"1Solutions rebuilt our entire operations platform — 8 years of spaghetti code — in 6 months without disrupting our live business. The new system processes 10x the transaction volume and our ops team actually loves using it."', name:'Michael Torres', role:'COO, LogiCore Systems — Chicago, IL', initials:'MT', color:'#4338CA' },
                { stars:'★★★★★',featured:false, text:'"We needed a custom client portal with complex permissions and reporting. 1Solutions delivered exactly what we scoped, on time, on budget. The code quality was exceptional — our in-house team inherited it easily."', name:'Rebecca Walsh', role:'CTO, Meridian Capital — Toronto, ON', initials:'RW', color:'#7C3AED' },
                { stars:'★★★★★',featured:false, text:'"Three agencies quoted us for the same project and gave us very different answers. 1Solutions was the only one who genuinely understood what we were building and why. 14 months later they are still our technology partner."', name:'Andrew Kimani', role:'Founder, HealthTrack Pro — Sydney, AU', initials:'AK', color:'#2563EB' },
              ].map((t,i)=>(
                <div key={t.name} className={`dt-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' dt-tcard-visible':''}`}>
                  <div className="dt-tcard-stars">{t.stars}</div>
                  <p className="dt-tcard-text">{t.text}</p>
                  <div className="dt-tcard-author">
                    <div className="dt-tcard-avatar" style={{background:t.color}}>{t.initials}</div>
                    <div><div className="dt-tcard-name">{t.name}</div><div className="dt-tcard-role">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="dt-testi-stats">
              {[['1,200+','Projects Delivered'],null,['97%','Client Retention'],null,['15+','Years Experience'],null,['120+','Enterprise Clients']].map((item,i)=>
                item===null ? <div key={i} className="dt-tstat-divider"/> : <div key={item[0]} className="dt-tstat"><span className="dt-tstat-num">{item[0]}</span><span className="dt-tstat-label">{item[1]}</span></div>
              )}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="dt-why-section">
          <div className="dt-why-inner">
            <div className={`dt-section-header-center dt-section-reveal${visibleSections.has('why')?' dt-revealed':''}`} ref={el=>{sectionRefs.current['why']=el;}}>
              <span className="dt-section-eyebrow">Why 1Solutions</span>
              <h2 className="dt-section-title">Why Businesses Choose Us</h2>
              <p className="dt-section-desc" style={{margin:'0 auto 0'}}>Not a body-shop. Not a generic outsourcing firm. Here is what makes our approach to software delivery different.</p>
            </div>
            <div className="dt-why-grid" ref={whyGridRef}>
              {WHY.map((w,i)=>(
                <div key={w.title} className={`dt-why-card${visibleWhyCards.includes(i)?' dt-card-visible':''}`} style={{transitionDelay:`${i*80}ms`}}>
                  <div className="dt-why-card-header"><div className="dt-why-icon">{w.icon}</div><h3>{w.title}</h3></div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENGAGEMENT MODELS */}
        <section className="dt-engage-section">
          <div className="dt-engage-inner">
            <div className="dt-engage-left">
              <div className={`dt-section-reveal${visibleSections.has('engage')?' dt-revealed':''}`} ref={el=>{sectionRefs.current['engage']=el;}}>
                <span className="dt-section-eyebrow">How We Engage</span>
                <h2 className="dt-engage-title">Engagement Models Built Around Your Project</h2>
                <p className="dt-engage-desc">Whether you need a full product team or specialist augmentation, we have a model that fits your requirements.</p>
              </div>
              <div className="dt-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://placehold.co/560x420/3730A3/ffffff?text=Engagement+Models" alt="Engagement models" loading="lazy"/>
              </div>
            </div>
            <div className="dt-engage-right" ref={eCardsRef}>
              {[
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>, title:'Dedicated Project Team', desc:'A fixed-price, fixed-scope engagement with a dedicated team — PM, architect, developers, QA, and designer — delivering your project end-to-end.', features:['Fixed price & timeline','Full team allocated','Weekly sprint demos','Source code ownership'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title:'Staff Augmentation', desc:'Embed 1Solutions engineers directly in your existing team — scaling capacity up or down as your roadmap demands, with no long-term hiring overhead.', features:['1–20 engineers on-demand','Your tools & processes','Day-rate or monthly billing','Ramp up in 1 week'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, title:'Discovery & Architecture Sprint', desc:'A 2-4 week paid discovery engagement that produces a full technical specification, architecture diagram, and fixed-price build proposal — before committing to development.', features:['Requirements workshops','Architecture design','Fixed-price proposal','No obligation to proceed'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title:'Managed Support Retainer', desc:'Ongoing maintenance and feature development for your live product — bug fixes, updates, monitoring, and quarterly roadmap reviews for a predictable monthly fee.', features:['Bug fixes & patches','Dependency updates','Uptime monitoring','Quarterly reviews'] },
              ].map((ec,i)=>(
                <div key={ec.title} className={`dt-ecard${visibleECards.includes(i)?' dt-ecard-visible':''}`} style={{transitionDelay:`${i*100}ms`}}>
                  <div className="dt-ecard-header"><div className="dt-ecard-icon">{ec.icon}</div><h3 className="dt-ecard-title">{ec.title}</h3></div>
                  <p className="dt-ecard-desc">{ec.desc}</p>
                  <div className="dt-ecard-features">{ec.features.map(f=><div key={f} className="dt-efeat"><span className="dt-efeat-check">✔</span>{f}</div>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="dt-contact-section" id="contact">
          <div className="dt-contact-container">
            <div className="dt-contact-left">
              <div className={`dt-section-reveal${visibleSections.has('contact')?' dt-revealed':''}`} ref={el=>{sectionRefs.current['contact']=el;}}>
                <h2 className="dt-contact-title">Ready to Modernise Your Business?</h2>
                <p className="dt-contact-desc">Tell us about your project. We will respond within 24 hours with an honest assessment and a clear next step — no hard sell.</p>
              </div>
              <div className="dt-merged-box">
                {[
                  { label:'Free Technical Consultation', desc:'A 30-minute call with a senior architect who will ask the right questions and give you honest guidance on the best approach for your project.' },
                  { label:'Fixed-Price Proposal in 48 Hours', desc:'A detailed proposal covering scope, architecture, technology stack, timeline, and a fixed price — so there are no surprises when development starts.' },
                  { label:'You Own Everything', desc:'Full source code, IP assignment, and documentation on project completion. No lock-in, no ongoing licence fees — just clean handover.' },
                ].map(b=>(
                  <div key={b.label} className="dt-benefit-item">
                    <div className="dt-benefit-icon-wrap">
                      <svg className="dt-benefit-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.75"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p><strong>{b.label}</strong> — {b.desc}</p>
                  </div>
                ))}
                <div className="dt-stats-box">
                  <div className="dt-stats-grid">
                    {[['1,200+','Projects delivered'],['97%','Client retention'],['15+','Years experience']].map(([n,t])=>(
                      <div key={t}><div className="dt-stat-number">{n}</div><div className="dt-stat-text">{t}</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="dt-contact-right">
              <div className="dt-form-box">
                <h3>Tell Us About Your Project</h3>
                <form className="dt-contact-form" onSubmit={e=>e.preventDefault()}>
                  <div className="dt-form-row">
                    <div className="dt-form-group"><label htmlFor="dt-fname">First Name *</label><input id="dt-fname" type="text" placeholder="John" required/></div>
                    <div className="dt-form-group"><label htmlFor="dt-lname">Last Name *</label><input id="dt-lname" type="text" placeholder="Smith" required/></div>
                  </div>
                  <div className="dt-form-row">
                    <div className="dt-form-group"><label htmlFor="dt-email">Work Email *</label><input id="dt-email" type="email" placeholder="john@company.com" required/></div>
                    <div className="dt-form-group">
                      <label htmlFor="dt-phone">Phone</label>
                      <div className="dt-phone-input">
                        <select aria-label="Country code"><option>+1</option><option>+61</option><option>+44</option><option>+91</option></select>
                        <input id="dt-phone" type="tel" placeholder="(555) 000-0000"/>
                      </div>
                    </div>
                  </div>
                  <div className="dt-form-row">
                    <div className="dt-form-group">
                      <label htmlFor="dt-service">Service Needed</label>
                      <select id="dt-service">
                        <option value="">Select…</option>
                        <option>Custom Software Development</option>
                        <option>Web Application Development</option>
                        <option>Mobile App Development</option>
                        <option>Legacy Modernisation</option>
                        <option>Workflow Automation</option>
                        <option>API Integration</option>
                        <option>Staff Augmentation</option>
                        <option>Technical Consultation</option>
                      </select>
                    </div>
                    <div className="dt-form-group">
                      <label htmlFor="dt-budget">Estimated Budget</label>
                      <select id="dt-budget">
                        <option value="">Select range…</option>
                        <option>Under $15,000</option>
                        <option>$15,000 – $30,000</option>
                        <option>$30,000 – $60,000</option>
                        <option>$60,000 – $120,000</option>
                        <option>$120,000+</option>
                      </select>
                    </div>
                  </div>
                  <div className="dt-form-group full">
                    <label htmlFor="dt-msg">Describe Your Project *</label>
                    <textarea id="dt-msg" rows={4} placeholder="e.g. We have a legacy .NET system that handles our order management. We need to modernise it and add a customer-facing portal…" required/>
                  </div>
                  <div className="dt-consent">
                    <input type="checkbox" id="dt-consent" required/>
                    <label htmlFor="dt-consent">I agree to 1Solutions&apos; <Link href="/privacy-policy">Privacy Policy</Link> and consent to being contacted about my enquiry.</label>
                  </div>
                  <button type="submit" className="dt-submit-btn">Send My Project Brief →</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="dt-faq-section">
          <div className="dt-faq-inner">
            <div className={`dt-section-reveal${visibleSections.has('faq')?' dt-revealed':''}`} ref={el=>{sectionRefs.current['faq']=el;}}>
              <h2 className="dt-faq-heading">Frequently Asked Questions</h2>
            </div>
            <div className="dt-faq-list">
              {FAQS.map((faq,i)=>(
                <div key={i} className={`dt-faq-item${openFaq===i?' open':''}`}>
                  <button className="dt-faq-question" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                    <span className="dt-faq-q-badge">{String.fromCharCode(65+i)}</span>
                    <span>{faq.q}</span>
                    <svg className="dt-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="dt-faq-answer-wrap"><div className="dt-faq-answer">{faq.a}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED */}
        <section className="dt-related-section">
          <div className="dt-related-inner">
            <span className="dt-related-eyebrow">Explore Related Services</span>
            <h2 className="dt-related-title">More Ways We Can Help</h2>
            <p className="dt-related-sub">Digital transformation works best end-to-end. Explore the specialist services that complement your core build.</p>
            <hr className="dt-related-divider"/>
            <div className="dt-related-tags">
              {[
                ['/wordpress-development-company','WordPress Development','dt-rtag-violet'],
                ['/ecommerce-website-development-services','eCommerce Development','dt-rtag-amber'],
                ['/nextjs-development-services','Next.js Development','dt-rtag-indigo'],
                ['/saas-application-development-company','SaaS Development','dt-rtag-blue'],
                ['/api-integration','API Integration','dt-rtag-teal'],
                ['/devops-services-company','DevOps Services','dt-rtag-orange'],
                ['/cloud-migration-services','Cloud Migration','dt-rtag-sky'],
                ['/mobile-app-development','Mobile App Development','dt-rtag-green'],
                ['/hire-dedicated-resources','Hire Dedicated Developers','dt-rtag-violet'],
                ['/digital-marketing','Digital Marketing','dt-rtag-amber'],
                ['/it-staff-augmentation-services','IT Staff Augmentation','dt-rtag-indigo'],
                ['/virtual-cto-services','Virtual CTO Services','dt-rtag-blue'],
              ].map(([href,label,cls])=>(
                <Link key={href} href={href} className={`dt-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
