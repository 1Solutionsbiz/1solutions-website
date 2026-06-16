'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const ROLES = [
  { n:'01', title:'Full-Stack Developers', desc:'React, Next.js, Node.js, Python, and .NET developers who ship features end-to-end — frontend, backend, and everything in between.', featured:true },
  { n:'02', title:'Frontend Developers', desc:'React, Vue, Angular, and Next.js specialists who build fast, accessible, pixel-perfect interfaces that work across every device and browser.', featured:false },
  { n:'03', title:'Backend Developers', desc:'Node.js, Python, PHP, Java, and .NET engineers who design robust APIs, microservices, and data layers that scale under production load.', featured:false },
  { n:'04', title:'Mobile Developers', desc:'iOS (Swift, SwiftUI), Android (Kotlin, Jetpack), and cross-platform (React Native, Flutter) developers who build apps that users keep on their phones.', featured:false },
  { n:'05', title:'DevOps & Cloud Engineers', desc:'AWS, Azure, and GCP engineers who build CI/CD pipelines, Kubernetes clusters, and IaC setups that keep your infrastructure reliable and cost-efficient.', featured:false },
  { n:'06', title:'AI & ML Engineers', desc:'Python ML engineers and LLM integration specialists who build custom models, RAG pipelines, chatbots, and intelligent automation that goes to production.', featured:false },
  { n:'07', title:'UI/UX Designers', desc:'Product designers who conduct user research, create wireframes and prototypes, and design interfaces that reduce friction and improve conversion.', featured:false },
  { n:'08', title:'WordPress Developers', desc:'WordPress and WooCommerce specialists for custom themes, plugin development, headless WordPress builds, and complex multi-site networks.', featured:false },
  { n:'09', title:'eCommerce Developers', desc:'Shopify, WooCommerce, and Magento developers who build high-converting stores, custom apps, and payment integrations that lift revenue.', featured:false },
  { n:'10', title:'QA Engineers', desc:'Manual and automation QA engineers (Selenium, Playwright, Cypress) who catch bugs before your users do and build regression suites that scale.', featured:false },
  { n:'11', title:'SEO Specialists', desc:'Technical and content SEO experts who improve site architecture, fix crawlability issues, build topical authority, and grow organic traffic.', featured:false },
  { n:'12', title:'Project Managers', desc:'Experienced digital PMs who manage stakeholders, run Agile sprints, remove blockers, and keep multi-disciplinary projects on time and on budget.', featured:false },
];

const FAQS = [
  { q:'How quickly can we hire a developer?', a:'Most clients have their first developer on a call within 48–72 hours of submitting a brief. We pre-screen our talent network continuously — when you brief us, we match you from a pool of already-vetted candidates rather than starting a search from scratch. For niche skills (rare ML stacks, specific CMS expertise), allow 5–7 business days. Time-to-hire is consistently faster than internal recruitment or most staffing agencies.' },
  { q:'What is the difference between a dedicated developer and a freelancer?', a:'A dedicated developer works exclusively on your project during agreed hours, attends your standups, uses your tools, and operates as a true extension of your team. A freelancer typically juggles multiple clients, has divided attention, and often needs to be re-briefed between sessions. Our developers are committed to your project for the duration of the engagement and are managed by a 1Solutions account lead who monitors quality and output on your behalf.' },
  { q:'Do your developers work in our time zone?', a:'Yes. We offer flexible time-zone alignment across US (ET, CT, PT), Canada, and Australia. Developers can work overlapping hours with your core team for standups, reviews, and collaboration — typically a 4–6 hour overlap window. Fully async engagements are also available for teams that prefer structured handoffs over real-time collaboration.' },
  { q:'Can we trial a developer before committing?', a:'Yes. We offer a 2-week paid trial for all dedicated developer engagements. During the trial, the developer works on real tasks from your backlog. At the end of the 2 weeks, you decide whether to continue — no obligation, no awkward conversations. If the fit is not right, we replace the developer or refund the trial period. Most clients continue after the trial.' },
  { q:'What engagement models do you offer?', a:'We offer three models: (1) Dedicated Full-Time — a developer works 160 hours/month exclusively on your project; (2) Dedicated Part-Time — 80 hours/month, ideal for ongoing maintenance or smaller feature streams; (3) Team Extension — a pre-assembled pod of 2–6 engineers with a PM, ideal for building a feature or product from scratch. All models are on monthly rolling contracts with 30-day notice to scale up or down.' },
  { q:'How do you ensure the quality of developers you place?', a:'Every developer in our network passes a 4-stage vetting process: (1) Technical screen — a timed coding test calibrated to the role; (2) System design or portfolio review; (3) Communication and collaboration assessment with a senior engineer; (4) Reference check from a previous employer or client. Less than 12% of applicants pass all four stages. We also conduct monthly performance reviews throughout active engagements.' },
  { q:'What happens if a developer is not performing?', a:'Your 1Solutions account lead monitors velocity, code quality, and communication throughout the engagement. If performance drops below expectations, we address it with the developer immediately. If the issue is not resolved within 5 business days, we replace the developer with no gap in your billing cycle. You are never left managing a performance issue alone.' },
  { q:'What is the cost of hiring a dedicated developer?', a:'Costs vary by role, experience level, and engagement model. Full-stack developers start from $2,800/month for part-time and $4,500/month for full-time. Senior and specialist roles (ML engineers, DevOps architects) range from $5,500–$9,000/month full-time. All rates include vetting, onboarding, account management, and performance monitoring — there are no additional placement fees or hidden costs.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path fill="#059669" d="M9 11l3 3L22 4"/><path fill="#059669" d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>, title:'Pre-Vetted Talent Only', desc:'Every developer passes 4 rounds of technical and communication screening before joining our network. Less than 12% of applicants make it through.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#059669" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'48-Hour Matching', desc:'Most clients are on a call with matched candidates within 48–72 hours of submitting a brief. No 3-month hiring cycles.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#059669" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'True Team Extension', desc:'Your developer joins your Slack, attends your standups, uses your tools, and operates as a team member — not a vendor with tickets.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#059669" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'Time-Zone Alignment', desc:'Developers work overlapping hours with your team in US, Canada, or Australia — 4–6 hour overlap windows for standups and real-time collaboration.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#059669" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'No Lock-In Contracts', desc:'Monthly rolling contracts with 30 days notice to scale up, scale down, or end the engagement. No 6-month minimums, no termination fees.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#059669" d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>, title:'Monitored Performance', desc:'Your account lead tracks velocity, code quality, and communication monthly. If performance slips, we fix it or replace the developer — you never manage it alone.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#059669" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'IP & NDA Protection', desc:'All developers sign IP assignment and NDA agreements before starting. Your code, your data, and your ideas remain 100% yours.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#059669" d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline fill="none" stroke="#059669" strokeWidth="2" points="22 4 12 14.01 9 11.01"/></svg>, title:'15+ Years Placing Talent', desc:'Since 2008, we have placed developers with startups, scale-ups, and enterprise teams across the US, Canada, and Australia.' },
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
    <div className="hd-stat-col">
      <div className="hd-stat-label">{label}</div>
      <div className="hd-stat-value">{display}</div>
    </div>
  );
}

export default function HireDedicatedDevelopersPage() {
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
        ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i)?p:[...p,i]), i*150); obs.disconnect(); } },
        { threshold: 0.25 }
      );
      obs.observe(el); return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(statsRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!whyGridRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_,i) => setTimeout(() => setVisibleWhyCards(p => p.includes(i)?p:[...p,i]), i*100)); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(whyGridRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!testiGridRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { [0,1,2].forEach(i => setTimeout(() => setVisibleTestiCards(p => p.includes(i)?p:[...p,i]), i*150)); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(testiGridRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!eCardsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { [0,1,2,3].forEach(i => setTimeout(() => setVisibleECards(p => p.includes(i)?p:[...p,i]), i*130)); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(eCardsRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key]; if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); } }, { threshold: 0.15 });
      obs.observe(el); return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const visibleRoles = showAll ? ROLES : ROLES.slice(0, 8);

  return (
    <>
      <Head>
        <title>Hire Dedicated Developers | Remote Development Teams | 1Solutions</title>
        <meta name="description" content="Hire vetted dedicated developers, designers, and engineers from 1Solutions. Full-stack, frontend, backend, mobile, DevOps, and AI specialists. 48-hour matching. Monthly contracts." />
        <meta name="keywords" content="hire dedicated developers, remote development team, hire full stack developer, offshore developers, dedicated software development team" />
        <link rel="canonical" href="https://www.1solutions.biz/hire-dedicated-developers/" />
        <meta property="og:title" content="Hire Dedicated Developers | 1Solutions" />
        <meta property="og:description" content="Pre-vetted dedicated developers matched in 48 hours. Monthly contracts, time-zone aligned, true team extension." />
        <meta property="og:url" content="https://www.1solutions.biz/hire-dedicated-developers/" />
        <style>{`
          .hd-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#f0fdf4 0%,#dcfce7 25%,#ecfdf5 55%,#f0f9ff 80%,#fafafa 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden;overflow-y:clip;}
          .hd-page *,.hd-page *::before,.hd-page *::after{box-sizing:border-box;}
          .hd-orb-1{position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(5,150,105,0.22) 0%,rgba(16,185,129,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px);}
          .hd-orb-2{position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.16) 0%,rgba(5,150,105,0.08) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px);}
          .hd-orb-3{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.14) 0%,transparent 70%);top:40%;right:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px);}

          .hd-hero-block{background:transparent;position:relative;overflow:hidden;}
          .hd-hero-block::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(5,150,105,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px);}
          .hd-hero-block::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.12) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px);}
          .hd-hero-content{position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px;}
          .hd-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#047857;margin-bottom:18px;}
          .hd-hero-content h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#064E3B 0%,#059669 45%,#0EA5E9 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .hd-hero-content p{font-size:16px;color:#374151;line-height:1.65;max-width:640px;margin:0 auto 28px;}
          .hd-btn-hero{display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#064E3B;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(5,150,105,0.12),inset 0 1px 0 rgba(255,255,255,1);position:relative;overflow:hidden;}
          .hd-btn-hero::after{content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:hd-shimmer 2.5s ease-in-out infinite;pointer-events:none;}
          @keyframes hd-shimmer{0%{left:-120%;}35%,100%{left:160%;}}
          .hd-btn-hero:hover{background:rgba(255,255,255,0.85);border-color:rgba(5,150,105,0.5);box-shadow:0 12px 36px rgba(5,150,105,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#064E3B;}

          .hd-hero-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(5,150,105,0.08),inset 0 1px 0 rgba(255,255,255,0.95);}
          .hd-stat-col{padding:18px 20px;text-align:center;border-right:1px solid rgba(5,150,105,0.10);}
          .hd-stat-col:last-child{border-right:none;}
          .hd-stat-label{font-size:12px;color:#374151;font-weight:500;margin-bottom:6px;}
          .hd-stat-value{font-size:26px;font-weight:900;color:#059669;letter-spacing:-0.5px;line-height:1;}

          .hd-clients-bar{position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px;}
          .hd-clients-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0;}
          .hd-clients-logos{width:100%;overflow:hidden;}
          .hd-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:hd-marquee 28s linear infinite;}
          .hd-logos-track:hover{animation-play-state:paused;}
          @keyframes hd-marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
          .hd-client-logo{height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s;}
          .hd-client-logo:hover{opacity:0.85;filter:grayscale(0%);}

          .hd-section-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#059669;margin-bottom:12px;display:block;}
          .hd-section-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#064E3B 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px;}
          .hd-section-desc{font-size:15px;color:#374151;line-height:1.7;max-width:680px;margin-bottom:36px;}

          .hd-roles-section{background:#f0fdf4;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(5,150,105,0.05),0 -4px 16px rgba(5,150,105,0.03);}
          .hd-roles-inner{max-width:1280px;margin:0 auto;}
          .hd-roles-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
          .hd-role-card{background:linear-gradient(135deg,rgba(220,252,231,0.60) 0%,rgba(255,255,255,0.88) 60%,rgba(240,249,255,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(5,150,105,0.06),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default;}
          .hd-role-card:hover{transform:translateY(-6px);border-color:rgba(5,150,105,0.35);box-shadow:0 16px 48px rgba(5,150,105,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .hd-role-card.featured{border-color:rgba(5,150,105,0.15);}
          .hd-role-card:hover h3{color:#059669;}
          .hd-card-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#064E3B;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none;}
          .hd-role-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1;}
          .hd-role-card p{font-size:13px;color:#374151;line-height:1.6;position:relative;z-index:1;}
          .hd-role-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#059669,#34d399);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1);}
          .hd-role-card:hover::before{transform:scaleY(1);}
          .hd-roles-footer{text-align:center;margin-top:20px;}
          .hd-btn-show-more{display:inline-block;background:#ffffff;border:1.5px solid rgba(5,150,105,0.20);color:#047857;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(5,150,105,0.08);font-family:inherit;}
          .hd-btn-show-more:hover{background:#059669;border-color:#059669;color:#ffffff;box-shadow:0 8px 28px rgba(5,150,105,0.20);transform:translateY(-2px);}

          .hd-how-section{background:transparent;padding:80px 40px;position:relative;z-index:1;}
          .hd-how-wrap{max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(5,150,105,0.07),inset 0 1px 0 rgba(255,255,255,0.95);}
          .hd-how-title{font-size:38px;font-weight:900;line-height:1.15;letter-spacing:-0.8px;background:linear-gradient(90deg,#064E3B 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 12px;}
          .hd-how-sub{font-size:15px;color:#374151;line-height:1.7;max-width:580px;margin:0 0 36px;}
          .hd-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
          .hd-compare-col{background:rgba(255,255,255,0.65);border:1px solid rgba(5,150,105,0.12);border-radius:14px;padding:28px 24px;}
          .hd-compare-col.highlight{border-color:rgba(5,150,105,0.35);background:rgba(240,253,244,0.80);}
          .hd-compare-badge{display:inline-block;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;}
          .hd-compare-col h3{font-size:18px;font-weight:700;color:#064E3B;margin:0 0 16px;}
          .hd-compare-list{display:flex;flex-direction:column;gap:10px;}
          .hd-compare-item{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#374151;line-height:1.55;}
          .hd-compare-icon{flex-shrink:0;font-size:14px;margin-top:1px;}

          .hd-process-section{background:transparent;padding:80px 40px;position:relative;z-index:1;}
          .hd-process-top{max-width:1280px;margin:0 auto 56px;}
          .hd-process-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#059669;margin:0 0 14px;}
          .hd-process-main-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#064E3B 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .hd-process-main-desc{font-size:15px;color:#374151;line-height:1.7;margin:0;}
          .hd-process-divider{border:none;border-top:1px solid rgba(5,150,105,0.15);margin:36px 0 0;width:100%;}
          .hd-process-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start;}
          .hd-process-steps{display:flex;flex-direction:column;}
          .hd-pstep{display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1);}
          .hd-pstep.visible{opacity:1;transform:translateY(0);}
          .hd-pstep-left{display:flex;flex-direction:column;align-items:center;}
          .hd-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(5,150,105,0.20);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#064E3B;flex-shrink:0;transition:background 0.3s,border-color 0.3s;}
          .hd-pstep:hover .hd-pstep-circle{background:rgba(5,150,105,0.12);border-color:#059669;color:#059669;}
          .hd-pstep-arrow{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px;}
          .hd-pstep-arrow::before{content:'';width:2px;flex:1;background:#059669;opacity:0.25;}
          .hd-pstep-arrow::after{content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #059669;opacity:0.45;margin-top:-1px;}
          .hd-pstep:last-child .hd-pstep-arrow{display:none;}
          .hd-pstep-content{padding:4px 0 44px;}
          .hd-pstep:last-child .hd-pstep-content{padding-bottom:0;}
          .hd-pstep-title{font-size:22px;font-weight:700;color:#064E3B;margin:0 0 10px;line-height:1.2;}
          .hd-pstep-desc{font-size:15px;color:#374151;line-height:1.75;margin:0;}
          .hd-process-image-col{position:sticky;top:100px;min-width:0;}
          .hd-process-img-wrap{width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(5,150,105,0.15);aspect-ratio:4/5;background:#dcfce7;}
          .hd-process-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;}

          .hd-testi-section{background:#f0fdf4;border-top:1px solid rgba(5,150,105,0.08);border-bottom:1px solid rgba(5,150,105,0.08);padding:80px 40px;position:relative;z-index:1;}
          .hd-testi-inner{max-width:1280px;margin:0 auto;}
          .hd-section-header-center{text-align:center;margin-bottom:52px;}
          .hd-testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px;}
          .hd-tcard{background:linear-gradient(135deg,rgba(220,252,231,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(240,249,255,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(5,150,105,0.06),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s;}
          .hd-tcard.hd-tcard-visible{opacity:1;transform:translateY(0);}
          .hd-tcard:hover{transform:translateY(-6px);border-color:rgba(5,150,105,0.35);box-shadow:0 16px 48px rgba(5,150,105,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .hd-tcard.featured{border-color:rgba(5,150,105,0.20);}
          .hd-tcard-stars{font-size:18px;color:#059669;letter-spacing:2px;}
          .hd-tcard-text{font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1;}
          .hd-tcard-author{display:flex;align-items:center;gap:12px;margin-top:4px;}
          .hd-tcard-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0;}
          .hd-tcard-name{font-size:14px;font-weight:700;color:#064E3B;}
          .hd-tcard-role{font-size:12px;color:#6b7280;}
          .hd-testi-stats{display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(220,252,231,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(240,249,255,0.35) 100%);backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(5,150,105,0.06),inset 0 1px 0 rgba(255,255,255,0.95);}
          .hd-tstat{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;}
          .hd-tstat-num{font-size:28px;font-weight:800;color:#064E3B;}
          .hd-tstat-label{font-size:13px;color:#374151;font-weight:500;}
          .hd-tstat-divider{width:1px;height:40px;background:rgba(5,150,105,0.15);}

          .hd-why-section{padding:80px 40px;background:#f0fdf4;border-top:1px solid rgba(5,150,105,0.08);border-bottom:1px solid rgba(5,150,105,0.08);position:relative;z-index:1;}
          .hd-why-inner{max-width:1280px;margin:0 auto;}
          .hd-why-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px;}
          .hd-why-card{background:linear-gradient(135deg,rgba(220,252,231,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(240,249,255,0.35) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(5,150,105,0.06),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s;}
          .hd-why-card.hd-card-visible{opacity:1;transform:translateY(0) scale(1);}
          .hd-why-card:hover{transform:translateY(-6px);border-color:rgba(5,150,105,0.35);box-shadow:0 16px 48px rgba(5,150,105,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .hd-why-card-header{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
          .hd-why-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;}
          .hd-why-icon svg{width:28px;height:28px;}
          .hd-why-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35;}
          .hd-why-card p{font-size:13px;color:#374151;line-height:1.7;margin:0;}

          .hd-engage-section{background:#f0fdf4;border-top:1px solid rgba(5,150,105,0.08);padding:80px 40px;position:relative;z-index:1;}
          .hd-engage-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch;}
          .hd-engage-left{position:sticky;top:100px;display:flex;flex-direction:column;}
          .hd-engage-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#064E3B 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .hd-engage-desc{font-size:15px;color:#374151;line-height:1.75;margin:0 0 32px;}
          .hd-engage-img-wrap{border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(5,150,105,0.15);flex:1;min-height:300px;}
          .hd-engage-img-wrap img{width:100%;height:100%;min-height:300px;object-fit:cover;display:block;}
          .hd-engage-right{display:flex;flex-direction:column;gap:16px;}
          .hd-ecard{background:linear-gradient(135deg,rgba(220,252,231,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(240,249,255,0.35) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(5,150,105,0.06),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s;}
          .hd-ecard.hd-ecard-visible{opacity:1;transform:translateX(0);}
          .hd-ecard:hover{border-color:rgba(5,150,105,0.40);box-shadow:0 16px 48px rgba(5,150,105,0.10);transform:translateX(4px);}
          .hd-ecard-header{display:flex;align-items:center;gap:14px;margin-bottom:10px;}
          .hd-ecard-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;}
          .hd-ecard-icon svg{width:26px;height:26px;stroke:#059669;fill:none;}
          .hd-ecard-title{font-size:18px;font-weight:700;color:#064E3B;margin:0;}
          .hd-ecard-desc{font-size:14px;color:#374151;line-height:1.65;margin:0 0 16px;}
          .hd-ecard-features{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;}
          .hd-efeat{display:flex;align-items:center;gap:8px;font-size:13px;color:#064E3B;font-weight:500;}
          .hd-efeat-check{color:#059669;font-size:12px;flex-shrink:0;}

          .hd-contact-section{padding:70px 40px;background:linear-gradient(135deg,rgba(220,252,231,0.65) 0%,rgba(255,255,255,0.60) 40%,rgba(240,249,255,0.55) 100%);backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80);}
          .hd-contact-container{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px;}
          .hd-contact-left{padding:0;align-self:start;}
          .hd-contact-title{font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#064E3B 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;}
          .hd-contact-desc{font-size:14px;color:#374151;line-height:1.6;margin:0 0 24px;}
          .hd-merged-box{background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(220,252,231,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px;}
          .hd-benefit-item{display:flex;gap:10px;align-items:flex-start;}
          .hd-benefit-icon-wrap{width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .hd-benefit-icon{width:20px;height:20px;stroke:#059669;stroke-width:1.75;}
          .hd-benefit-item p{font-size:13px;color:#374151;margin:0;line-height:1.5;}
          .hd-stats-box{padding-top:32px;border-top:1px solid rgba(5,150,105,0.12);}
          .hd-stats-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
          .hd-stat-number{font-size:40px;font-weight:900;color:#064E3B;line-height:1;display:inline-block;margin-bottom:4px;}
          .hd-stat-text{font-size:13px;color:#374151;line-height:1.4;font-weight:500;}
          .hd-contact-right{align-self:start;}
          .hd-form-box{background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(220,252,231,0.22) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(5,150,105,0.07),inset 0 1px 0 rgba(255,255,255,1);}
          .hd-form-box h3{font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px;}
          .hd-contact-form{display:flex;flex-direction:column;gap:16px;}
          .hd-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
          .hd-form-group{display:flex;flex-direction:column;gap:6px;}
          .hd-form-group.full{grid-column:1/-1;}
          .hd-form-group label{font-size:12px;font-weight:500;color:#0F1F40;}
          .hd-form-group input,.hd-form-group textarea,.hd-form-group select{padding:10px 14px;border:1px solid rgba(5,150,105,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(5,150,105,0.06);transition:border-color 0.2s,background 0.2s;}
          .hd-form-group input:focus,.hd-form-group textarea:focus{outline:none;border-color:#059669;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(5,150,105,0.12);}
          .hd-phone-input{display:flex;border:1px solid rgba(5,150,105,0.15);border-radius:6px;overflow:hidden;}
          .hd-phone-input select{padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px;}
          .hd-phone-input input{flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none;}
          .hd-phone-input input:focus{outline:none;}
          .hd-consent{display:flex;gap:8px;align-items:flex-start;margin-top:8px;}
          .hd-consent input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;}
          .hd-consent label{font-size:11px;color:#374151;line-height:1.5;margin:0;}
          .hd-consent a{color:#064E3B;text-decoration:none;}
          .hd-submit-btn{padding:14px 28px;background:rgba(6,78,59,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(5,150,105,0.25),inset 0 1px 0 rgba(255,255,255,0.15);}
          .hd-submit-btn:hover{background:rgba(6,78,59,0.95);border-color:rgba(14,165,233,0.5);transform:translateY(-2px);}

          .hd-faq-section{padding:80px 40px;background:#f0fdf4;border-top:1px solid rgba(5,150,105,0.08);position:relative;z-index:1;}
          .hd-faq-inner{max-width:1280px;margin:0 auto;}
          .hd-faq-heading{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#064E3B 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px;}
          .hd-faq-list{display:flex;flex-direction:column;gap:12px;}
          .hd-faq-item{background:linear-gradient(135deg,rgba(220,252,231,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(240,249,255,0.35) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(5,150,105,0.05),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s;}
          .hd-faq-item.open{border-color:rgba(5,150,105,0.35);box-shadow:0 8px 32px rgba(5,150,105,0.08);}
          .hd-faq-item.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#059669;border-radius:3px 0 0 3px;}
          .hd-faq-question{width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative;}
          .hd-faq-q-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(5,150,105,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s;}
          .hd-faq-item.open .hd-faq-q-badge{background:#059669;color:#fff;}
          .hd-faq-question span{font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45;}
          .hd-faq-item.open .hd-faq-question span{color:#059669;}
          .hd-faq-chevron{width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s;}
          .hd-faq-item.open .hd-faq-chevron{transform:rotate(180deg);color:#059669;}
          .hd-faq-answer-wrap{overflow:hidden;transition:max-height 0.35s ease;max-height:0;}
          .hd-faq-item.open .hd-faq-answer-wrap{max-height:400px;}
          .hd-faq-answer{padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8;}

          .hd-related-section{background:rgba(220,252,231,0.20);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px;}
          .hd-related-inner{max-width:1280px;margin:0 auto;text-align:center;}
          .hd-related-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#374151;margin:0 0 14px;display:block;}
          .hd-related-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#064E3B 0%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .hd-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px;}
          .hd-related-divider{border:none;border-top:1px solid rgba(5,150,105,0.12);margin:40px 0;}
          .hd-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;}
          .hd-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s;}
          .hd-rtag:hover{filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10);}
          .hd-rtag-green{background:rgba(5,150,105,0.10);border-color:rgba(5,150,105,0.30);color:#065F46;}
          .hd-rtag-sky{background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.30);color:#0369A1;}
          .hd-rtag-indigo{background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.30);color:#4338CA;}
          .hd-rtag-amber{background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309;}
          .hd-rtag-violet{background:rgba(124,58,237,0.10);border-color:rgba(124,58,237,0.30);color:#6D28D9;}
          .hd-rtag-rose{background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C;}
          .hd-rtag-teal{background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E;}

          .hd-section-reveal{opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1);}
          .hd-section-reveal.hd-revealed{opacity:1;transform:translateY(0);}

          @media(max-width:900px){.hd-page{background:linear-gradient(160deg,#f0fdf4 0%,#dcfce7 30%,#ecfdf5 60%,#f0f9ff 100%) !important;}}
          @media(max-width:1024px){
            .hd-hero-content h1{font-size:40px;}
            .hd-roles-grid{grid-template-columns:repeat(2,1fr);}
            .hd-why-grid{grid-template-columns:repeat(2,1fr);}
            .hd-compare-grid{grid-template-columns:1fr;}
            .hd-engage-inner{grid-template-columns:1fr;}
            .hd-engage-left{position:static;}
            .hd-process-inner{grid-template-columns:1fr;}
            .hd-process-image-col{display:none;}
          }
          @media(max-width:768px){
            .hd-page{overflow-x:hidden;}
            .hd-hero-content{padding:36px 20px 24px;}
            .hd-hero-content h1{font-size:28px;letter-spacing:-0.3px;}
            .hd-hero-content p{font-size:15px;}
            .hd-hero-stats{grid-template-columns:1fr 1fr;max-width:100%;}
            .hd-stat-col{padding:14px 12px;}
            .hd-stat-col:nth-child(2){border-right:none;}
            .hd-stat-col:nth-child(3){border-top:1px solid rgba(5,150,105,0.10);}
            .hd-stat-col:nth-child(4){border-top:1px solid rgba(5,150,105,0.10);border-right:none;}
            .hd-stat-value{font-size:22px;}
            .hd-clients-bar{padding:16px 20px 36px;gap:12px;}
            .hd-roles-section,.hd-why-section,.hd-engage-section,.hd-faq-section,.hd-testi-section{padding:48px 20px 40px;}
            .hd-how-section{padding:48px 16px;}
            .hd-how-wrap{padding:24px 20px 32px;border-radius:16px;}
            .hd-process-section{padding:60px 20px;}
            .hd-contact-section{padding:48px 16px;}
            .hd-contact-container{grid-template-columns:1fr;gap:20px;}
            .hd-contact-title,.hd-section-title,.hd-engage-title,.hd-process-main-title,.hd-related-title{font-size:28px;}
            .hd-faq-heading{font-size:26px;}
            .hd-faq-question{padding:18px 18px 18px 52px;}
            .hd-faq-question span{font-size:14px;}
            .hd-faq-answer{padding:0 18px 18px 52px;font-size:14px;}
            .hd-faq-q-badge{left:14px;}
            .hd-related-section{padding:60px 20px;}
            .hd-related-tags{gap:8px;}
            .hd-rtag{padding:9px 16px;font-size:13px;}
            .hd-roles-grid{grid-template-columns:1fr 1fr;gap:10px;}
            .hd-testi-grid{grid-template-columns:1fr;}
            .hd-why-grid{grid-template-columns:1fr;margin-top:40px;}
            .hd-testi-stats{flex-wrap:wrap;gap:0;padding:24px 20px;}
            .hd-tstat{flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(5,150,105,0.10);}
            .hd-tstat:nth-child(odd){border-right:1px solid rgba(5,150,105,0.10);}
            .hd-tstat:nth-last-child(-n+2){border-bottom:none;}
            .hd-tstat-divider{display:none;}
            .hd-form-row{grid-template-columns:1fr;}
            .hd-stats-grid{grid-template-columns:1fr 1fr 1fr;}
            .hd-stat-number{font-size:28px;}
          }
          @media(max-width:480px){
            .hd-hero-content h1{font-size:24px;}
            .hd-roles-grid{grid-template-columns:1fr;}
            .hd-role-card{padding:20px 18px 18px;}
            .hd-card-num{font-size:52px;}
            .hd-ecard{padding:20px;}
            .hd-ecard-features{grid-template-columns:1fr;}
            .hd-merged-box{padding:18px;}
          }
        `}</style>
      </Head>

      <div className="hd-page">
        <div className="hd-orb-1"/><div className="hd-orb-2"/><div className="hd-orb-3"/>

        {/* HERO */}
        <div className="hd-hero-block">
          <div className="hd-hero-content">
            <span className="hd-eyebrow">Hire Dedicated Developers — 48-Hour Matching</span>
            <h1>Hire Dedicated Developers — Pre-Vetted Talent That Works as Part of Your Team</h1>
            <p>Full-stack, frontend, backend, mobile, DevOps, AI, and design talent — hired in 48 hours, time-zone aligned, on monthly rolling contracts with no lock-in. Your team, extended.</p>
            <Link href="#contact" className="hd-btn-hero">Post Your Developer Brief</Link>
          </div>
          <div className="hd-hero-stats" ref={statsRef}>
            {[['Developers Placed','500+'],['Time to Match','48hrs'],['Client Retention','96%'],['Years Experience','15+']].map(([label,val])=>(
              <AnimatedStat key={label} label={label} val={val} started={statsStarted}/>
            ))}
          </div>
          <div className="hd-clients-bar">
            <span className="hd-clients-label">Teams That Trust Our Talent</span>
            <div className="hd-clients-logos">
              <div className="hd-logos-track">
                {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon2'],['/logo/Uniphore.jpg','Uniphore2'],['/logo/ICCoLogo.png','ICC2'],['/logo/Honor_Logo_(2020).svg.png','Honor2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv2']].map(([src,alt])=>(
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="hd-client-logo"/>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROLES */}
        <section className="hd-roles-section">
          <div className="hd-roles-inner">
            <div className={`hd-section-reveal${visibleSections.has('roles')?' hd-revealed':''}`} ref={el=>{sectionRefs.current['roles']=el;}}>
              <span className="hd-section-eyebrow">Roles We Place</span>
              <h2 className="hd-section-title">Dedicated Developers & Specialists Available to Hire</h2>
              <p className="hd-section-desc">Every role passes our 4-stage technical and communication vetting process. Less than 12% of candidates make it through.</p>
            </div>
            <div className="hd-roles-grid">
              {visibleRoles.map(r=>(
                <div key={r.n} className={`hd-role-card${r.featured?' featured':''}`}>
                  <span className="hd-card-num">{r.n}</span><h3>{r.title}</h3><p>{r.desc}</p>
                </div>
              ))}
            </div>
            <div className="hd-roles-footer">
              <button className="hd-btn-show-more" onClick={()=>setShowAll(v=>!v)}>{showAll?'Show Less ↑':'Show All Roles ↓'}</button>
            </div>
          </div>
        </section>

        {/* HOW IT COMPARES */}
        <section className="hd-how-section">
          <div className="hd-how-wrap">
            <h2 className={`hd-how-title hd-section-reveal${visibleSections.has('how')?' hd-revealed':''}`} ref={el=>{sectionRefs.current['how']=el;}}>
              Dedicated Developer vs. Freelancer vs. Hiring In-House
            </h2>
            <p className="hd-how-sub">Not all talent models are equal. Here is how a dedicated developer from 1Solutions compares to the alternatives.</p>
            <div className="hd-compare-grid">
              <div className="hd-compare-col highlight">
                <span className="hd-compare-badge" style={{background:'#dcfce7',color:'#065F46'}}>1Solutions Dedicated Developer</span>
                <h3>Dedicated via 1Solutions</h3>
                <div className="hd-compare-list">
                  {['Vetted through 4 technical stages','Matched in 48–72 hours','Dedicated to your project only','Joins Slack, attends standups','Account manager monitors performance','Monthly rolling contract, 30-day notice','No placement fees or markup surprises','IP assignment and NDA included','Time-zone aligned (US / Canada / AU)','Replaced if performance drops'].map(t=><div key={t} className="hd-compare-item"><span className="hd-compare-icon">✅</span>{t}</div>)}
                </div>
              </div>
              <div className="hd-compare-col">
                <span className="hd-compare-badge" style={{background:'#f3f4f6',color:'#6b7280'}}>Alternatives</span>
                <h3>Freelancer or In-House Hire</h3>
                <div className="hd-compare-list">
                  {['Self-screened, quality varies widely','3–6 month recruitment timeline','Divides attention across multiple clients','Works independently, not as team member','No one monitors quality on your behalf','Minimum 3–6 months or permanent contract','Agency placement fees, recruiter markups','NDA negotiated separately each time','Time-zone mismatch common','Managing poor performance falls on you'].map(t=><div key={t} className="hd-compare-item"><span className="hd-compare-icon">⚠️</span>{t}</div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="hd-process-section">
          <div className="hd-process-top">
            <div className={`hd-section-reveal${visibleSections.has('process')?' hd-revealed':''}`} ref={el=>{sectionRefs.current['process']=el;}}>
              <p className="hd-process-eyebrow">HOW HIRING WORKS</p>
              <h2 className="hd-process-main-title">From Brief to Developer in 4 Steps</h2>
              <p className="hd-process-main-desc">Most clients have a developer on their project within 5–7 business days of submitting a brief. Here is exactly how it works.</p>
            </div>
            <hr className="hd-process-divider"/>
          </div>
          <div className="hd-process-inner">
            <div className="hd-process-steps">
              {[
                ['Submit Your Brief','Tell us the role, required skills, experience level, time-zone needs, and expected start date. Takes 10 minutes. We acknowledge within 2 hours.'],
                ['Receive Matched Candidates','Within 48–72 hours we send you 2–3 pre-screened candidate profiles — with technical assessment scores, work samples, and video introductions — matched to your brief.'],
                ['Interview & Trial','You interview your preferred candidate. If they pass your review, they start a 2-week paid trial on real tasks from your backlog. No obligation to continue after the trial.'],
                ['Onboard & Ship','Candidate joins your Slack, is added to your project management tools, and starts delivering from day one. Your account lead checks in weekly during the first month.'],
              ].map(([title,desc],i)=>(
                <div className={`hd-pstep${visibleSteps.includes(i)?' visible':''}`} key={title} ref={el=>{stepRefs.current[i]=el;}}>
                  <div className="hd-pstep-left"><div className="hd-pstep-circle">{i+1}</div>{i<3&&<div className="hd-pstep-arrow"/>}</div>
                  <div className="hd-pstep-content"><h3 className="hd-pstep-title">{title}</h3><p className="hd-pstep-desc">{desc}</p></div>
                </div>
              ))}
            </div>
            <div className="hd-process-image-col">
              <div className="hd-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://placehold.co/480x600/064E3B/ffffff?text=Hire+Process" alt="Developer hiring process" loading="lazy"/>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="hd-testi-section">
          <div className="hd-testi-inner">
            <div className={`hd-section-header-center hd-section-reveal${visibleSections.has('testi')?' hd-revealed':''}`} ref={el=>{sectionRefs.current['testi']=el;}}>
              <span className="hd-section-eyebrow">Client Stories</span>
              <h2 className="hd-section-title">Teams That Extended with 1Solutions</h2>
              <p className="hd-section-desc" style={{margin:'0 auto 0'}}>What hiring managers say about working with our dedicated developers.</p>
            </div>
            <div className="hd-testi-grid" ref={testiGridRef}>
              {[
                { stars:'★★★★★',featured:true, text:'"We hired a senior React developer through 1Solutions on a Monday and she was merged into our codebase by Wednesday. Two years later she is still on our team. The screening is genuinely rigorous — she was better than our last two in-house hires."', name:'Jordan Blake', role:'CTO, Archivio SaaS — San Francisco, CA', initials:'JB', color:'#064E3B' },
                { stars:'★★★★★',featured:false, text:'"We needed a WordPress expert fast — our agency had let us down. 1Solutions placed someone in 3 days who understood our multi-site setup on day one. He has shipped 47 features since we hired him 14 months ago."', name:'Emma Rousseau', role:'Head of Digital, Prestige Group — Vancouver, BC', initials:'ER', color:'#059669' },
                { stars:'★★★★★',featured:false, text:'"The 2-week trial model is brilliant. We tested a Node.js backend developer on real tasks before committing. He outperformed our internal benchmark on every metric. We extended immediately and have had zero issues in 9 months."', name:'Kai Watanabe', role:'VP Engineering, LaunchPad Health — Sydney, AU', initials:'KW', color:'#0EA5E9' },
              ].map((t,i)=>(
                <div key={t.name} className={`hd-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' hd-tcard-visible':''}`}>
                  <div className="hd-tcard-stars">{t.stars}</div>
                  <p className="hd-tcard-text">{t.text}</p>
                  <div className="hd-tcard-author"><div className="hd-tcard-avatar" style={{background:t.color}}>{t.initials}</div><div><div className="hd-tcard-name">{t.name}</div><div className="hd-tcard-role">{t.role}</div></div></div>
                </div>
              ))}
            </div>
            <div className="hd-testi-stats">
              {[['500+','Developers Placed'],null,['48hrs','Time to Match'],null,['96%','Client Retention'],null,['15+','Years Placing Talent']].map((item,i)=>
                item===null?<div key={i} className="hd-tstat-divider"/>:<div key={item[0]} className="hd-tstat"><span className="hd-tstat-num">{item[0]}</span><span className="hd-tstat-label">{item[1]}</span></div>
              )}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="hd-why-section">
          <div className="hd-why-inner">
            <div className={`hd-section-header-center hd-section-reveal${visibleSections.has('why')?' hd-revealed':''}`} ref={el=>{sectionRefs.current['why']=el;}}>
              <span className="hd-section-eyebrow">Why 1Solutions</span>
              <h2 className="hd-section-title">Why Teams Hire Through Us</h2>
              <p className="hd-section-desc" style={{margin:'0 auto 0'}}>We have placed 500+ developers since 2008. Here is what makes our model different from a recruiter or a staffing agency.</p>
            </div>
            <div className="hd-why-grid" ref={whyGridRef}>
              {WHY.map((w,i)=>(
                <div key={w.title} className={`hd-why-card${visibleWhyCards.includes(i)?' hd-card-visible':''}`} style={{transitionDelay:`${i*80}ms`}}>
                  <div className="hd-why-card-header"><div className="hd-why-icon">{w.icon}</div><h3>{w.title}</h3></div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENGAGEMENT */}
        <section className="hd-engage-section">
          <div className="hd-engage-inner">
            <div className="hd-engage-left">
              <div className={`hd-section-reveal${visibleSections.has('engage')?' hd-revealed':''}`} ref={el=>{sectionRefs.current['engage']=el;}}>
                <span className="hd-section-eyebrow">Engagement Models</span>
                <h2 className="hd-engage-title">Hire One Developer or Build a Full Team</h2>
                <p className="hd-engage-desc">From a single part-time specialist to a complete product engineering team — we scale to match your current stage.</p>
              </div>
              <div className="hd-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://placehold.co/560x420/064E3B/ffffff?text=Team+Extension" alt="Team extension engagement models" loading="lazy"/>
              </div>
            </div>
            <div className="hd-engage-right" ref={eCardsRef}>
              {[
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" strokeLinecap="round"/></svg>, title:'Dedicated Full-Time Developer', desc:'One developer, 160 hours/month, fully dedicated to your project. Attends standups, joins your tools, ships under your codebase. Monthly rolling contract. From $4,500/month.', features:['160 hrs/month','Joins your Slack','2-week paid trial','30-day notice'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="8" r="3"/><circle cx="15" cy="8" r="3"/><path d="M3 20c0-3 2.7-5 6-5M15 15c3.3 0 6 2 6 5"/></svg>, title:'Dedicated Part-Time Developer', desc:'80 hours/month — ideal for ongoing maintenance, a secondary feature stream, or specialist support alongside an in-house team. From $2,800/month.', features:['80 hrs/month','Flexible scheduling','Same vetting standards','Scale up anytime'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, title:'Team Extension Pod', desc:'A pre-assembled pod of 2–6 engineers with a PM — ideal for building a feature or product from scratch. Fully managed sprint delivery. From $12,000/month.', features:['PM included','Sprint delivery','Daily standups','Weekly reports'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, title:'Short-Term Project Hire', desc:'A developer for a specific project with a defined scope — migration, redesign, integration build. Fixed scope, fixed price, no ongoing commitment required.', features:['Defined deliverables','Fixed timeline','Fixed price','Handover documentation'] },
              ].map((ec,i)=>(
                <div key={ec.title} className={`hd-ecard${visibleECards.includes(i)?' hd-ecard-visible':''}`} style={{transitionDelay:`${i*100}ms`}}>
                  <div className="hd-ecard-header"><div className="hd-ecard-icon">{ec.icon}</div><h3 className="hd-ecard-title">{ec.title}</h3></div>
                  <p className="hd-ecard-desc">{ec.desc}</p>
                  <div className="hd-ecard-features">{ec.features.map(f=><div key={f} className="hd-efeat"><span className="hd-efeat-check">✔</span>{f}</div>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="hd-contact-section" id="contact">
          <div className="hd-contact-container">
            <div className="hd-contact-left">
              <div className={`hd-section-reveal${visibleSections.has('contact')?' hd-revealed':''}`} ref={el=>{sectionRefs.current['contact']=el;}}>
                <h2 className="hd-contact-title">Post Your Developer Brief</h2>
                <p className="hd-contact-desc">Tell us who you need, when you need them, and what they will be working on. We respond within 2 hours with availability and next steps.</p>
              </div>
              <div className="hd-merged-box">
                {[
                  { label:'Matched Candidates in 48 Hours', desc:'We send 2–3 pre-screened profiles within 48–72 hours of receiving your brief — with technical scores, work samples, and video intros. No waiting 3 months.' },
                  { label:'2-Week Paid Trial, No Obligation', desc:'Test the developer on real tasks from your backlog before committing. If the fit is not right, we replace them or refund the trial. No awkward conversations required.' },
                  { label:'Monthly Rolling Contracts', desc:'No 6-month minimums, no termination fees. Scale up, scale down, or end the engagement with 30 days notice. Your risk stays low throughout.' },
                ].map(b=>(
                  <div key={b.label} className="hd-benefit-item">
                    <div className="hd-benefit-icon-wrap">
                      <svg className="hd-benefit-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.75"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p><strong>{b.label}</strong> — {b.desc}</p>
                  </div>
                ))}
                <div className="hd-stats-box">
                  <div className="hd-stats-grid">
                    {[['500+','Developers placed'],['48hrs','Time to match'],['96%','Client retention']].map(([n,t])=>(
                      <div key={t}><div className="hd-stat-number">{n}</div><div className="hd-stat-text">{t}</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="hd-contact-right">
              <div className="hd-form-box">
                <h3>Tell Us Who You Need</h3>
                <form className="hd-contact-form" onSubmit={e=>e.preventDefault()}>
                  <div className="hd-form-row">
                    <div className="hd-form-group"><label htmlFor="hd-fname">First Name *</label><input id="hd-fname" type="text" placeholder="Sam" required/></div>
                    <div className="hd-form-group"><label htmlFor="hd-lname">Last Name *</label><input id="hd-lname" type="text" placeholder="Wilson" required/></div>
                  </div>
                  <div className="hd-form-row">
                    <div className="hd-form-group"><label htmlFor="hd-email">Work Email *</label><input id="hd-email" type="email" placeholder="sam@company.com" required/></div>
                    <div className="hd-form-group">
                      <label htmlFor="hd-phone">Phone</label>
                      <div className="hd-phone-input">
                        <select aria-label="Country code"><option>+1</option><option>+61</option><option>+44</option><option>+91</option></select>
                        <input id="hd-phone" type="tel" placeholder="(555) 000-0000"/>
                      </div>
                    </div>
                  </div>
                  <div className="hd-form-row">
                    <div className="hd-form-group">
                      <label htmlFor="hd-role">Role You Need *</label>
                      <select id="hd-role" required>
                        <option value="">Select role…</option>
                        <option>Full-Stack Developer</option><option>Frontend Developer</option>
                        <option>Backend Developer</option><option>Mobile Developer</option>
                        <option>DevOps / Cloud Engineer</option><option>AI / ML Engineer</option>
                        <option>UI/UX Designer</option><option>WordPress Developer</option>
                        <option>eCommerce Developer</option><option>QA Engineer</option>
                        <option>SEO Specialist</option><option>Project Manager</option>
                      </select>
                    </div>
                    <div className="hd-form-group">
                      <label htmlFor="hd-model">Engagement Model</label>
                      <select id="hd-model">
                        <option value="">Select model…</option>
                        <option>Full-Time (160 hrs/month)</option>
                        <option>Part-Time (80 hrs/month)</option>
                        <option>Team Pod (2–6 engineers)</option>
                        <option>Short-Term Project</option>
                      </select>
                    </div>
                  </div>
                  <div className="hd-form-group full">
                    <label htmlFor="hd-msg">Describe What They Will Work On *</label>
                    <textarea id="hd-msg" rows={4} placeholder="e.g. We need a senior React developer to join our 4-person team. They will be building a new dashboard feature in Next.js 14, working with our existing Node.js backend, attending daily standups at 9am PST…" required/>
                  </div>
                  <div className="hd-consent">
                    <input type="checkbox" id="hd-consent" required/>
                    <label htmlFor="hd-consent">I agree to 1Solutions&apos; <Link href="/privacy-policy">Privacy Policy</Link> and consent to being contacted about my enquiry.</label>
                  </div>
                  <button type="submit" className="hd-submit-btn">Send My Hiring Brief →</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="hd-faq-section">
          <div className="hd-faq-inner">
            <div className={`hd-section-reveal${visibleSections.has('faq')?' hd-revealed':''}`} ref={el=>{sectionRefs.current['faq']=el;}}>
              <h2 className="hd-faq-heading">Frequently Asked Questions</h2>
            </div>
            <div className="hd-faq-list">
              {FAQS.map((faq,i)=>(
                <div key={i} className={`hd-faq-item${openFaq===i?' open':''}`}>
                  <button className="hd-faq-question" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                    <span className="hd-faq-q-badge">{String.fromCharCode(65+i)}</span>
                    <span>{faq.q}</span>
                    <svg className="hd-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="hd-faq-answer-wrap"><div className="hd-faq-answer">{faq.a}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED */}
        <section className="hd-related-section">
          <div className="hd-related-inner">
            <span className="hd-related-eyebrow">Explore Related Services</span>
            <h2 className="hd-related-title">More Ways We Can Help</h2>
            <p className="hd-related-sub">Need a team or a product built, not just a developer? Explore our project delivery and managed services options.</p>
            <hr className="hd-related-divider"/>
            <div className="hd-related-tags">
              {[
                ['/digital-transformation','Custom Software Development','hd-rtag-indigo'],
                ['/ecommerce-development','eCommerce Development','hd-rtag-amber'],
                ['/cloud-devops','Cloud & DevOps Services','hd-rtag-sky'],
                ['/artificial-intelligence','AI & Machine Learning','hd-rtag-violet'],
                ['/digital-marketing','Digital Marketing','hd-rtag-green'],
                ['/wordpress-development-company','WordPress Development','hd-rtag-teal'],
                ['/website-support-maintenance-services','Website Maintenance','hd-rtag-rose'],
                ['/hire-dedicated-resources','Hire Dedicated Resources','hd-rtag-green'],
                ['/shopify-store-development','Shopify Development','hd-rtag-amber'],
                ['/ui-ux-design-services','UI/UX Design','hd-rtag-violet'],
                ['/mobile-app-development','Mobile App Development','hd-rtag-sky'],
              ].map(([href,label,cls])=>(
                <Link key={href} href={href} className={`hd-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
