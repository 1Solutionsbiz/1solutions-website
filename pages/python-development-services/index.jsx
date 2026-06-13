'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Custom Python Development', desc:'Bespoke Python applications built from scratch — scalable, maintainable, and aligned with your specific business logic and workflows.', featured:false },
  { n:'02', title:'Django Web Development', desc:'Robust, secure web applications and portals built on Django — the batteries-included Python framework trusted by Instagram and Pinterest.', featured:true },
  { n:'03', title:'Flask & FastAPI Development', desc:'Lightweight, high-performance REST APIs and microservices with Flask or FastAPI — ideal for modern SaaS products and mobile backends.', featured:false },
  { n:'04', title:'Data Science & Analytics', desc:'Custom data pipelines, dashboards, and analytical models that turn raw data into actionable business intelligence using Pandas, NumPy, and Matplotlib.', featured:false },
  { n:'05', title:'Machine Learning & AI Solutions', desc:'End-to-end ML model development, training, and deployment using scikit-learn, TensorFlow, and PyTorch for classification, prediction, and NLP tasks.', featured:false },
  { n:'06', title:'Python API Development', desc:'Secure, well-documented REST and GraphQL APIs built with Python — designed for performance, versioning, and seamless third-party integrations.', featured:false },
  { n:'07', title:'Automation & Scripting', desc:'Reduce manual work with custom Python scripts that automate repetitive tasks, data entry, report generation, and internal workflows.', featured:false },
  { n:'08', title:'Web Scraping & Data Extraction', desc:'Reliable scrapers and crawlers with BeautifulSoup and Scrapy to collect structured data from any website at scale — ethically and efficiently.', featured:false },
  { n:'09', title:'Python for DevOps & Cloud', desc:'Infrastructure automation, CI/CD pipelines, and cloud deployment scripts using Python with AWS Boto3, Azure SDK, and GCP libraries.', featured:false },
  { n:'10', title:'Python CMS & E-Commerce', desc:'Full-featured web platforms on Wagtail or Django Oscar — scalable CMS and e-commerce solutions with a clean admin interface.', featured:false },
  { n:'11', title:'Python Migration & Modernisation', desc:'Migrate legacy codebases from PHP, Ruby, or Node.js to Python, or upgrade from Python 2 to Python 3 with zero disruption to your business.', featured:false },
  { n:'12', title:'Python Support & Maintenance', desc:'Ongoing code reviews, bug fixes, performance tuning, and security patches — SLA-backed support plans so your Python applications run flawlessly.', featured:false },
];

const FAQS = [
  { q:'What types of Python development services does 1Solutions offer?', a:'We offer end-to-end Python development including custom web applications with Django and Flask, REST API development with FastAPI, machine learning and AI solutions, data science and analytics pipelines, automation scripting, web scraping, and cloud DevOps automation. Whether you need a single microservice or a full-stack data platform, we scope and deliver the right solution.' },
  { q:'How much does custom Python development cost?', a:'Custom Python projects typically start from $3,000 for straightforward automation tools or simple APIs, and range up to $30,000+ for enterprise-grade web platforms or ML pipelines with model training and deployment. Cost depends on complexity, integrations, infrastructure requirements, and timeline. We provide a detailed fixed-price quote after a free scoping call — no surprises.' },
  { q:'How long does a Python web application project take?', a:'A standard Django or Flask web application takes 4–8 weeks from kick-off to deployment. ML/AI projects involving data collection, model training, and API deployment typically take 8–16 weeks depending on data availability and model complexity. We share a detailed milestone timeline in the proposal and provide weekly status updates throughout.' },
  { q:'Do you work with US, Canadian, and Australian clients remotely?', a:'Yes — we have delivered Python projects remotely for clients across the US, Canada, and Australia since 2008. We operate in your time zone, communicate via Slack and Loom, and maintain full transparency with regular demos and updates. Our 97% client retention rate reflects the quality of our remote collaboration.' },
  { q:'Can you integrate Python applications with our existing systems?', a:'Absolutely. We regularly build Python integrations with Salesforce, HubSpot, Stripe, AWS, Google Cloud, Azure, Shopify, QuickBooks, Twilio, and dozens of other platforms. We use secure REST/GraphQL APIs, webhooks, and data pipelines to ensure seamless data flow between your Python application and existing tools.' },
  { q:'What Python frameworks and libraries do your developers use?', a:'Our Python team works with Django, Flask, FastAPI, Celery, SQLAlchemy, Pandas, NumPy, scikit-learn, TensorFlow, PyTorch, Scrapy, BeautifulSoup, Pytest, and more. On the infrastructure side we use Docker, Kubernetes, AWS (EC2, Lambda, RDS, S3), GitHub Actions, and PostgreSQL/MySQL. We choose the right tool for the job, not the fashionable one.' },
  { q:'Do you build machine learning models and deploy them to production?', a:'Yes. We handle the full ML lifecycle: data collection and cleaning, exploratory data analysis, feature engineering, model training and evaluation, hyperparameter tuning, and deployment as a REST API (using FastAPI or Flask) or as a serverless function on AWS Lambda or Google Cloud Run. We also set up monitoring for model drift and performance degradation.' },
  { q:'What makes 1Solutions different from freelance Python developers?', a:'Accountability, depth, and continuity. Unlike freelancers, we offer a dedicated team — a project manager, senior developer, and QA engineer — so your project never stalls. We follow documented development processes, maintain comprehensive test coverage, write clean code with proper documentation, and offer long-term maintenance plans. We are a business partner, not a one-off contractor.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V17H7v2h10v-2h-4v-1.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>, title:'15+ Years of Python Expertise', desc:'Since 2008, our Python developers have shipped 300+ production applications across industries including fintech, healthtech, SaaS, and e-commerce.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'US, Canada & Australia Focused', desc:'We understand the compliance requirements, UX expectations, and technical standards of western markets — not just generic offshore delivery.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'On-Time, On-Budget Delivery', desc:'Our structured Agile process (Discover → Define → Develop → Deploy) ensures projects are scoped correctly and delivered without scope creep or budget overruns.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Security-First Development', desc:'Every application we build follows OWASP security standards — parameterised queries, input validation, JWT auth, encrypted secrets, and dependency auditing.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>, title:'Full-Stack Python Capability', desc:'From backend API to data pipeline to ML model deployment — all under one roof. Django, FastAPI, PostgreSQL, Redis, Docker, AWS — no handoffs, no finger-pointing.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Dedicated Project Manager', desc:'No ticket queues. You get a dedicated PM who speaks plain English, understands your goals, tracks blockers daily, and keeps you updated in real time.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>, title:'Test-Driven Development', desc:'We write unit, integration, and end-to-end tests with Pytest and Selenium — ensuring your code is maintainable, regression-free, and production-ready from day one.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Long-Term Partnership', desc:'97% client retention rate. We maintain your Python applications after launch with support plans, performance monitoring, and dedicated engineering retainers.' },
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
    <div className="py-stat-col">
      <div className="py-stat-label">{label}</div>
      <div className="py-stat-value">{display}</div>
    </div>
  );
}

export default function PythonDevelopmentServices() {
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
    if (!eCardsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0,1,2,3].forEach(i => setTimeout(() => setVisibleECards(p => p.includes(i)?p:[...p,i]), i * 130));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(eCardsRef.current);
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

  return (
    <>
      <Head>
        <title>Python Development Services | Custom Python Development Company | 1Solutions</title>
        <meta name="description" content="1Solutions is a leading Python development company with 15+ years experience. We deliver custom Python web apps, Django & Flask APIs, ML/AI solutions, and data pipelines for US, Canada & Australia." />
        <meta name="keywords" content="python development services, python development company, django development, flask development, fastapi development, python web development, machine learning development, python api development" />
        <link rel="canonical" href="https://www.1solutions.biz/python-development-services/" />
        <meta property="og:title" content="Python Development Services | 1Solutions" />
        <meta property="og:description" content="Custom Python web apps, Django & FastAPI backends, ML/AI solutions, and data pipelines. 15+ years of Python expertise for US, Canada & Australia." />
        <meta property="og:url" content="https://www.1solutions.biz/python-development-services/" />
        <style>{`
          .py-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            background-attachment: scroll;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .py-page *, .py-page *::before, .py-page *::after { box-sizing: border-box; }

          /* Orbs */
          .py-orb-1 { position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.35) 0%,rgba(139,92,246,0.15) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .py-orb-2 { position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.30) 0%,rgba(245,158,11,0.15) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .py-orb-3 { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.20) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* Hero */
          .py-hero-block { background:transparent;position:relative;overflow:hidden; }
          .py-hero-block::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .py-hero-block::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .py-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px; }
          .py-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .py-hero-content h1 { font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .py-hero-content p { font-size:16px;color:#3A507A;line-height:1.65;max-width:620px;margin:0 auto 28px; }
          .py-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .py-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(245,158,11,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }

          /* Stats */
          .py-hero-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .py-stat-col { padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .py-stat-col:last-child { border-right:none; }
          .py-stat-label { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .py-stat-value { font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }

          /* Clients */
          .py-clients-bar { position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px; }
          .py-clients-label { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0; }
          .py-clients-logos { width:100%;overflow:hidden; }
          .py-client-logo { height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s; }
          .py-client-logo:hover { opacity:0.85;filter:grayscale(0%); }

          /* Sections shared */
          .py-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .py-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .py-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .py-section-sub { font-size:16px;color:#4A6080;margin:0; }

          /* Services */
          .py-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.18),0 -4px 16px rgba(15,52,96,0.10); }
          .py-services-inner { max-width:1280px;margin:0 auto; }
          .py-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .py-service-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .py-service-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .py-service-card.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .py-service-card:hover .py-card-num { color:#D97706;opacity:0.12; }
          .py-service-card:hover h3 { color:#D97706; }
          .py-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .py-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .py-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .py-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .py-service-card:hover::before { transform:scaleY(1); }
          .py-services-footer { text-align:center;margin-top:20px; }
          .py-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(15,52,96,0.20);color:#0F3460;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(15,52,96,0.08);font-family:inherit; }
          .py-btn-show-more:hover { background:#0F3460;border-color:#0F3460;color:#ffffff;box-shadow:0 8px 28px rgba(15,52,96,0.20);transform:translateY(-2px); }

          /* Tech Stack */
          .py-tech-section { background:transparent;padding:70px 40px;position:relative;z-index:1; }
          .py-tech-wrap { max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,0.95); }
          .py-tech-header { margin-bottom:36px; }
          .py-tech-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 12px; }
          .py-tech-subtitle { font-size:15px;color:#4A6080;line-height:1.6;margin:0; }
          .py-tech-groups { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .py-tech-group { background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(15,52,96,0.12);border-radius:12px;padding:22px 24px; }
          .py-tech-group-title { font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .py-tech-tags { display:flex;flex-wrap:wrap;gap:8px; }
          .py-tech-tag { display:inline-block;background:rgba(15,52,96,0.07);border:1px solid rgba(15,52,96,0.12);border-radius:6px;padding:5px 12px;font-size:13px;font-weight:500;color:#0F3460; }

          /* Process */
          .py-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .py-process-top { max-width:1280px;margin:0 auto 56px; }
          .py-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .py-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .py-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .py-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.15);margin:36px 0 0;width:100%; }
          .py-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .py-process-steps { display:flex;flex-direction:column; }
          .py-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .py-pstep.visible { opacity:1;transform:translateY(0); }
          .py-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .py-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .py-pstep:hover .py-pstep-circle { background:rgba(245,158,11,0.2);border-color:#D97706;color:#D97706; }
          .py-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .py-pstep-arrow::before { content:'';width:2px;flex:1;background:#0F3460;opacity:0.25; }
          .py-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #0F3460;opacity:0.45;margin-top:-1px; }
          .py-pstep:last-child .py-pstep-arrow { display:none; }
          .py-pstep-content { padding:4px 0 44px; }
          .py-pstep:last-child .py-pstep-content { padding-bottom:0; }
          .py-pstep-title { font-size:22px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .py-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .py-process-image-col { position:sticky;top:100px;min-width:0; }
          .py-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(15,52,96,0.15);aspect-ratio:4/5;background:#e8edf5; }
          .py-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Testimonials */
          .py-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .py-testi-inner { max-width:1280px;margin:0 auto; }
          .py-section-header-center { text-align:center;margin-bottom:52px; }
          .py-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .py-tcard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .py-tcard:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .py-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .py-tcard.py-tcard-visible { opacity:1;transform:translateY(0); }
          .py-tcard.py-tcard-visible:hover { transform:translateY(-6px); }
          .py-tcard-stars { font-size:18px;color:#D97706;letter-spacing:2px; }
          .py-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .py-tcard.featured .py-tcard-text { color:#1f2937; }
          .py-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .py-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .py-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .py-tcard-role { font-size:12px;color:#6b7280; }
          .py-testi-stats { display:flex;align-items:center;justify-content:center;gap:0;background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .py-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .py-tstat-num { font-size:28px;font-weight:800;color:#0F3460; }
          .py-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .py-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.15); }

          /* Why */
          .py-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .py-why-inner { max-width:1280px;margin:0 auto; }
          .py-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .py-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),background 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .py-why-card:hover { transform:translateY(-6px) scale(1);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .py-why-card.py-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .py-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .py-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .py-why-icon svg { width:28px;height:28px;fill:#D97706; }
          .py-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .py-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* Engagement */
          .py-engage-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .py-engage-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch; }
          .py-engage-left { position:sticky;top:100px;display:flex;flex-direction:column; }
          .py-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .py-engage-desc { font-size:15px;color:#3A507A;line-height:1.75;margin:0 0 32px; }
          .py-engage-img-wrap { border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(15,52,96,0.15);flex:1;min-height:300px; }
          .py-engage-img-wrap img { width:100%;height:100%;min-height:300px;object-fit:cover;display:block; }
          .py-engage-right { display:flex;flex-direction:column;gap:16px; }
          .py-ecard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),background 0.3s,border-color 0.3s; }
          .py-ecard:hover { border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1);transform:translateX(4px); }
          .py-ecard.py-ecard-visible { opacity:1;transform:translateX(0); }
          .py-ecard.py-ecard-visible:hover { transform:translateX(4px); }
          .py-ecard-header { display:flex;align-items:center;gap:14px;margin-bottom:10px; }
          .py-ecard-icon { width:44px;height:44px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .py-ecard-icon svg { width:26px;height:26px;stroke:#D97706;fill:none; }
          .py-ecard-title { font-size:18px;font-weight:700;color:#0F3460;margin:0; }
          .py-ecard-desc { font-size:14px;color:#3A507A;line-height:1.65;margin:0 0 16px; }
          .py-ecard-features { display:grid;grid-template-columns:1fr 1fr;gap:8px 16px; }
          .py-efeat { display:flex;align-items:center;gap:8px;font-size:13px;color:#2A3F6F;font-weight:500; }
          .py-efeat-check { color:#D97706;font-size:12px;flex-shrink:0; }

          /* Contact */
          .py-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .py-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .py-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .py-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .py-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .py-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .py-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .py-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75; }
          .py-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .py-stats-box { padding-top:32px;border-top:1px solid rgba(15,52,96,0.12); }
          .py-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .py-stat-number { font-size:40px;font-weight:900;color:#0F3460;line-height:1;display:inline-block;margin-bottom:4px; }
          .py-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .py-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;width:100%;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .py-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .py-contact-form { display:flex;flex-direction:column;gap:16px; }
          .py-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .py-form-group { display:flex;flex-direction:column;gap:6px; }
          .py-form-group.full { grid-column:1/-1; }
          .py-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .py-form-group input,.py-form-group textarea,.py-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .py-form-group input:focus,.py-form-group textarea:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .py-phone-input { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .py-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .py-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .py-phone-input input:focus { outline:none; }
          .py-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .py-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .py-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .py-consent a { color:#0F3460;text-decoration:none; }
          .py-submit-btn { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .py-submit-btn:hover { background:rgba(15,52,96,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          /* FAQ */
          .py-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .py-faq-inner { max-width:1280px;margin:0 auto; }
          .py-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .py-faq-list { display:flex;flex-direction:column;gap:12px; }
          .py-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .py-faq-item.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .py-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .py-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .py-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .py-faq-item.open .py-faq-q-badge { background:#D97706;color:#fff; }
          .py-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .py-faq-item.open .py-faq-question span { color:#D97706; }
          .py-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .py-faq-item.open .py-faq-chevron { transform:rotate(180deg);color:#D97706; }
          .py-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .py-faq-item.open .py-faq-answer-wrap { max-height:400px; }
          .py-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .py-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0F3460;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Related */
          .py-related-section { background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .py-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .py-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .py-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .py-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .py-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0; }
          .py-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .py-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .py-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .py-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .py-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .py-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .py-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .py-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .py-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .py-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .py-rtag-orange  { background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C; }
          .py-rtag-cyan    { background:rgba(6,182,212,0.10);border-color:rgba(6,182,212,0.28);color:#0E7490; }
          .py-rtag-pink    { background:rgba(236,72,153,0.10);border-color:rgba(236,72,153,0.28);color:#9D174D; }
          .py-rtag-slate   { background:rgba(100,116,139,0.10);border-color:rgba(100,116,139,0.28);color:#334155; }
          .py-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }
          .py-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }

          /* CTA shimmer */
          .py-btn-hero-shimmer { position:relative;overflow:hidden; }
          .py-btn-hero-shimmer::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:py-shimmer-sweep 2.5s ease-in-out infinite;pointer-events:none; }
          @keyframes py-shimmer-sweep { 0% { left:-120%; } 35%,100% { left:160%; } }

          /* Section fade-up */
          .py-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .py-section-reveal.py-revealed { opacity:1;transform:translateY(0); }

          /* Client logo marquee */
          .py-logos-track { display:flex;align-items:center;gap:60px;width:max-content;animation:py-marquee 28s linear infinite; }
          .py-logos-track:hover { animation-play-state:paused; }
          @keyframes py-marquee { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }

          /* Responsive */
          @media (max-width:1024px) {
            .py-hero-content h1 { font-size:40px; }
            .py-services-grid { grid-template-columns:repeat(2,1fr); }
            .py-why-grid { grid-template-columns:repeat(2,1fr); }
            .py-tech-groups { grid-template-columns:repeat(2,1fr); }
            .py-engage-inner { grid-template-columns:1fr; }
            .py-engage-left { position:static; }
            .py-process-inner { grid-template-columns:1fr; }
            .py-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .py-page { overflow-x:hidden; }
            .py-hero-content { padding:36px 20px 24px; }
            .py-hero-content h1 { font-size:28px;letter-spacing:-0.3px; }
            .py-hero-content p { font-size:15px; }
            .py-hero-stats { grid-template-columns:1fr 1fr;max-width:100%; }
            .py-stat-col { padding:14px 12px; }
            .py-stat-col:nth-child(2) { border-right:none; }
            .py-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .py-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .py-stat-value { font-size:22px; }
            .py-clients-bar { padding:16px 20px 36px;gap:12px; }
            .py-services-section { padding:48px 20px 40px; }
            .py-tech-section { padding:48px 16px; }
            .py-tech-wrap { padding:24px 20px 32px;border-radius:16px; }
            .py-tech-groups { grid-template-columns:1fr; }
            .py-process-section { padding:60px 20px; }
            .py-process-top { margin-bottom:36px; }
            .py-testi-section { padding:60px 20px; }
            .py-testi-section .py-section-header-center { text-align:left; }
            .py-why-section { padding:60px 20px; }
            .py-why-section .py-section-header-center { text-align:left; }
            .py-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .py-why-card { padding:24px 20px; }
            .py-engage-section { padding:60px 20px; }
            .py-contact-section { padding:48px 16px; }
            .py-contact-container { grid-template-columns:1fr;gap:20px; }
            .py-contact-title { font-size:28px; }
            .py-faq-section { padding:60px 20px; }
            .py-faq-heading { font-size:26px; }
            .py-faq-question { padding:18px 18px 18px 52px; }
            .py-faq-question span { font-size:14px; }
            .py-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .py-faq-q-badge { left:14px; }
            .py-related-section { padding:60px 20px; }
            .py-related-tags { gap:8px; }
            .py-rtag { padding:9px 16px;font-size:13px; }
            .py-services-grid { grid-template-columns:1fr 1fr;gap:10px; }
            .py-testi-grid { grid-template-columns:1fr; }
            .py-section-title,.py-engage-title,.py-process-main-title,.py-related-title { font-size:30px; }
            .py-testi-stats { flex-wrap:wrap;gap:0;padding:24px 20px; }
            .py-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.10); }
            .py-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.10); }
            .py-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .py-tstat-divider { display:none; }
            .py-form-row { grid-template-columns:1fr; }
            .py-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .py-stat-number { font-size:28px; }
            .py-tech-title { font-size:26px; }
          }
          @media (max-width:480px) {
            .py-hero-content h1 { font-size:24px; }
            .py-section-title,.py-engage-title,.py-process-main-title,.py-related-title { font-size:26px; }
            .py-services-grid { grid-template-columns:1fr; }
            .py-service-card { padding:20px 18px 18px; }
            .py-card-num { font-size:52px; }
            .py-pstep-title { font-size:18px; }
            .py-contact-title { font-size:24px; }
            .py-engage-title { font-size:26px; }
            .py-tcard { padding:24px 20px; }
            .py-ecard { padding:20px; }
            .py-ecard-features { grid-template-columns:1fr; }
            .py-merged-box { padding:18px; }
          }
        `}</style>
      </Head>

      <div className="py-page">
        <div className="py-orb-1" />
        <div className="py-orb-2" />
        <div className="py-orb-3" />

        {/* ── HERO ── */}
        <div className="py-hero-block">
          <div className="py-hero-content">
            <span className="py-eyebrow">Expert Python Development Company</span>
            <h1>Python Development Services — Build Smarter, Scale Faster</h1>
            <p>From custom web applications and REST APIs to machine learning pipelines and automation tools — 1Solutions delivers production-grade Python solutions for businesses across the US, Canada, and Australia.</p>
            <Link href="#contact" className="py-btn-hero py-btn-hero-shimmer">Get a Free Consultation Now</Link>
          </div>

          <div className="py-hero-stats" ref={statsRef}>
            {[['Python Projects','300+'],['Python Experts','30+'],['Years in Business','15+'],['Client Retention','97%']].map(([label,val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="py-clients-bar">
            <span className="py-clients-label">Trusted by Leading Brands</span>
            <div className="py-clients-logos">
              <div className="py-logos-track">
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
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="py-client-logo" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="py-services-section">
          <div className="py-services-inner">
            <div className={`py-section-reveal${visibleSections.has('services') ? ' py-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="py-section-eyebrow">Our Services</span>
              <h2 className="py-section-title">Python Development Services We Offer</h2>
              <p className="py-section-desc">From lightweight automation scripts to enterprise-grade Django platforms and production ML systems — our Python experts deliver end-to-end solutions built for performance, security, and long-term maintainability.</p>
            </div>
            <div className="py-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`py-service-card${s.featured?' featured':''}`}>
                  <span className="py-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="py-services-footer">
              <button className="py-btn-show-more" onClick={() => setShowAll(v=>!v)}>
                {showAll ? 'Show Less ↑' : 'Show More Python Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="py-tech-section">
          <div className="py-tech-wrap">
            <div className={`py-tech-header py-section-reveal${visibleSections.has('tech') ? ' py-revealed' : ''}`} ref={el => { sectionRefs.current['tech'] = el; }}>
              <h2 className="py-tech-title">Our Python Technology Stack</h2>
              <p className="py-tech-subtitle">We use battle-tested frameworks and libraries — chosen for reliability, community support, and production readiness.</p>
            </div>
            <div className="py-tech-groups">
              {[
                { label:'Web Frameworks', tags:['Django','Flask','FastAPI','Tornado','Starlette'] },
                { label:'Data & ML', tags:['Pandas','NumPy','scikit-learn','TensorFlow','PyTorch','Keras','Matplotlib','Seaborn'] },
                { label:'APIs & Integration', tags:['REST','GraphQL','Celery','RabbitMQ','Redis','Stripe API','Twilio','Boto3'] },
                { label:'Databases', tags:['PostgreSQL','MySQL','MongoDB','SQLite','Redis','Elasticsearch','SQLAlchemy'] },
                { label:'DevOps & Cloud', tags:['Docker','Kubernetes','AWS','Google Cloud','Azure','GitHub Actions','Terraform','Nginx'] },
                { label:'Testing & Quality', tags:['Pytest','unittest','Selenium','Coverage.py','mypy','Black','Flake8','Bandit'] },
              ].map(group => (
                <div className="py-tech-group" key={group.label}>
                  <div className="py-tech-group-title">{group.label}</div>
                  <div className="py-tech-tags">
                    {group.tags.map(tag => <span className="py-tech-tag" key={tag}>{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="py-process-section">
          <div className="py-process-top">
            <div className={`py-section-reveal${visibleSections.has('process') ? ' py-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="py-process-eyebrow">HOW WE WORK</p>
              <h2 className="py-process-main-title">How We Deliver Python Development Projects</h2>
              <p className="py-process-main-desc">Our Python developers follow a proven Agile process refined over 15+ years of remote project delivery for clients in the US, Canada, and Australia. Clear milestones, weekly demos, and full code ownership handed to you at launch.</p>
            </div>
            <hr className="py-process-divider" />
          </div>
          <div className="py-process-inner">
            <div className="py-process-steps">
              {[
                ['Discover','We start with a free scoping call to understand your business goals, technical constraints, and data landscape. Our senior Python architect maps out the right stack and approach — before a single line of code is written.'],
                ['Define','Together we define the full project scope, technical architecture, database schema, API contracts, and timeline. You approve the spec before development begins — no surprises, no scope creep.'],
                ['Develop','Our Python team builds your solution in two-week sprints with daily standups, weekly demos, and a shared staging environment. Full test coverage, code reviews, and CI/CD pipelines from day one.'],
                ['Deploy','We handle production deployment to your preferred cloud (AWS, GCP, Azure), configure monitoring and alerting, hand over full documentation, and provide post-launch support to ensure a smooth go-live.'],
              ].map(([title, desc], i) => (
                <div
                  className={`py-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="py-pstep-left">
                    <div className="py-pstep-circle">{i+1}</div>
                    {i < 3 && <div className="py-pstep-arrow" />}
                  </div>
                  <div className="py-pstep-content">
                    <h3 className="py-pstep-title">{title}</h3>
                    <p className="py-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-process-image-col">
              <div className="py-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions Python development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-testi-section">
          <div className="py-testi-inner">
            <div className={`py-section-header-center py-section-reveal${visibleSections.has('testi') ? ' py-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="py-section-eyebrow">Client Reviews</span>
              <h2 className="py-section-title">What Our Clients Say</h2>
              <p className="py-section-sub">Trusted by businesses across the US, Canada, Australia and beyond for 15+ years.</p>
            </div>
            <div className="py-testi-grid" ref={testiGridRef}>
              {[
                { initials:'AW', bg:'#1a4a7a', text:'"1Solutions built our entire data pipeline and analytics dashboard in Python. What used to take our team days to process now runs in minutes. Exceptional work and great communication throughout."', name:'Aaron Walsh', role:'Head of Data, FinCore Analytics — USA', featured:false },
                { initials:'CM', bg:'#0F3460', text:'"We needed a complex Django REST API to power our mobile app. The team delivered clean, well-documented code on time and within budget. I have recommended them to three other founders already."', name:'Claire Morrison', role:'CTO, Healthify App — Australia', featured:true },
                { initials:'BT', bg:'#2d5a8e', text:'"Their Python automation work saved us 40 hours of manual data entry every week. Fast, professional, and they actually understand our business processes. Will definitely use 1Solutions again."', name:'Blake Thompson', role:'Operations Manager, NorthTrade — Canada', featured:false },
              ].map((t,i) => (
                <div className={`py-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' py-tcard-visible':''}`} key={t.name}>
                  <div className="py-tcard-stars">★★★★★</div>
                  <p className="py-tcard-text">{t.text}</p>
                  <div className="py-tcard-author">
                    <div className="py-tcard-avatar" style={{ background:t.bg }}>{t.initials}</div>
                    <div>
                      <div className="py-tcard-name">{t.name}</div>
                      <div className="py-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-testi-stats">
              {[['4.9/5','Average Rating'],['200+','Verified Reviews'],['98%','Client Satisfaction'],['97%','Repeat Clients']].map(([num,label],i,arr) => (
                <>
                  <div className="py-tstat" key={label}>
                    <span className="py-tstat-num">{num}</span>
                    <span className="py-tstat-label">{label}</span>
                  </div>
                  {i < arr.length-1 && <div className="py-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="py-why-section">
          <div className="py-why-inner">
            <div className={`py-section-reveal${visibleSections.has('why') ? ' py-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center',marginBottom:0 }}>
              <span className="py-section-eyebrow">Why 1Solutions</span>
              <h2 className="py-section-title">Why Businesses Choose Us for Python Development</h2>
              <p className="py-section-sub" style={{ maxWidth:680,margin:'0 auto' }}>We don't just write Python code — we engineer reliable, scalable solutions. Here's what makes us different from freelancers and generic agencies.</p>
            </div>
            <div className="py-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`py-why-card${visibleWhyCards.includes(i) ? ' py-card-visible' : ''}`} key={w.title}>
                  <div className="py-why-card-header">
                    <div className="py-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="py-engage-section">
          <div className="py-engage-inner">
            <div className="py-engage-left">
              <div className={`py-section-reveal${visibleSections.has('engage') ? ' py-revealed' : ''}`} ref={el => { sectionRefs.current['engage'] = el; }}>
                <span className="py-section-eyebrow">Engagement Models</span>
                <h2 className="py-engage-title">Flexible Engagement Models Built Around You</h2>
                <p className="py-engage-desc">We adapt to your project, timeline, and budget. Whether you need a dedicated Python team, a fixed-price build, or flexible T&M, we offer full transparency at every step.</p>
              </div>
              <div className="py-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/Partner-with-us.jpg" alt="Partner With 1Solutions" />
              </div>
            </div>
            <div className="py-engage-right" ref={eCardsRef}>
              {[
                { title:'Dedicated Team', desc:'Hire a full-time dedicated Python team — a senior developer, ML engineer, or data scientist working exclusively on your product with a dedicated project manager.', features:['Cost-effective Approach','Less Admin Overhead','Rapid Iteration','Timely Reporting'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
                { title:'Fixed-Price', desc:'Ideal for clearly scoped Python projects — automation tools, APIs, data dashboards. We agree on deliverables, timeline, and cost upfront. No surprises.', features:['Full Budget Control','Easy Management','No Hidden Costs','On-time Delivery'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                { title:'Time & Material', desc:'For evolving Python projects — ML experiments, iterative product development, or ongoing data engineering. Pay only for hours worked with full visibility.', features:['Maximum Flexibility','Reduced Risk','Iterative Development','Full Transparency'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
                { title:'Offshore Development', desc:'Leverage our New Delhi-based Python team for significant cost savings. US/AU timezone overlap available. Expert developers at offshore rates without quality compromise.', features:['Access to Expert Talent','Shared Responsibility','Managed Team','Cost-Efficient'],
                  icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
              ].map((e,i) => (
                <div className={`py-ecard${visibleECards.includes(i)?' py-ecard-visible':''}`} key={e.title}>
                  <div className="py-ecard-header">
                    <div className="py-ecard-icon">{e.icon}</div>
                    <h3 className="py-ecard-title">{e.title}</h3>
                  </div>
                  <p className="py-ecard-desc">{e.desc}</p>
                  <div className="py-ecard-features">
                    {e.features.map(f => (
                      <div className="py-efeat" key={f}><span className="py-efeat-check">✔</span>{f}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="py-contact-section" id="contact">
          <div className="py-contact-container">
            <div className="py-contact-left">
              <h2 className="py-contact-title">Let's Build Your Python Solution Together</h2>
              <p className="py-contact-desc">Tell us about your project and we'll get back to you within 24 hours with a tailored technical plan.</p>
              <div className="py-merged-box">
                <div>
                  {[
                    { icon:<svg className="py-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your project details are confidential. We respect your privacy and sign NDAs on request.' },
                    { icon:<svg className="py-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A senior Python engineer reviews your requirements — not automated responses.' },
                    { icon:<svg className="py-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Response within 24 business hours with a detailed technical assessment.' },
                    { icon:<svg className="py-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:"Free scoping session — no obligation to proceed." },
                  ].map((b,i) => (
                    <div className="py-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="py-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="py-stats-box">
                  <div className="py-stats-grid">
                    {[['300+','Python Projects'],['15+','Years Experience'],['97%','Client Retention']].map(([num,text]) => (
                      <div key={text}>
                        <div className="py-stat-number">{num}</div>
                        <div className="py-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-contact-right">
              <div className="py-form-box">
                <h3>Contact Us</h3>
                <form className="py-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="py-form-row">
                    <div className="py-form-group"><label>Full Name*</label><input type="text" placeholder="Full Name*" required /></div>
                    <div className="py-form-group"><label>Business Email*</label><input type="email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="py-form-row">
                    <div className="py-form-group">
                      <label>Phone Number*</label>
                      <div className="py-phone-input">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="py-form-group"><label>Organization*</label><input type="text" placeholder="Organization / Institution*" required /></div>
                  </div>
                  <div className="py-form-group full"><label>Message*</label><textarea placeholder="Describe your Python project requirements..." rows={6} required /></div>
                  <div className="py-consent">
                    <input type="checkbox" id="py-consent" required />
                    <label htmlFor="py-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="py-submit-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-faq-section" id="faq">
          <div className="py-faq-inner">
            <h2 className="py-faq-heading">Frequently Asked Questions</h2>
            <div className="py-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`py-faq-item${openFaq===i?' open':''}`} key={i}>
                  <button className="py-faq-question" onClick={() => setOpenFaq(openFaq===i ? -1 : i)}>
                    <div className="py-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="py-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="py-faq-answer-wrap">
                    <div className="py-faq-answer"><span className="py-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="py-related-section">
          <div className="py-related-inner">
            <span className="py-related-eyebrow">PYTHON RELATED OFFERINGS</span>
            <h2 className="py-related-title">Explore Related Services and Technologies</h2>
            <p className="py-related-sub">Pair our Python development expertise with related services to tackle your most important technology and business initiatives.</p>
            <hr className="py-related-divider" />
            <div className="py-related-tags">
              {[
                ['Django Development','blue'],['Flask Development','violet'],['FastAPI Development','teal'],
                ['Machine Learning Solutions','amber'],['Data Science & Analytics','indigo'],['Python API Development','sky'],
                ['Web Scraping Services','green'],['Python Automation','rose'],['Cloud DevOps Automation','orange'],
                ['React.js Development','cyan'],['Node.js Development','emerald'],['WordPress Development','slate'],
                ['Mobile App Development','pink'],['UI/UX Design Services','violet'],['Digital Marketing Services','indigo'],
              ].map(([label,color]) => (
                <Link href="#contact" className={`py-rtag py-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
