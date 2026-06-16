'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Custom AI Model Development', desc:'Train, fine-tune, and deploy custom machine learning models on your proprietary data — for prediction, classification, ranking, or generation tasks.', featured:true },
  { n:'02', title:'LLM Integration & RAG Systems', desc:'Connect GPT-4, Claude, Gemini, and open-source LLMs to your knowledge bases via Retrieval-Augmented Generation — domain-accurate answers without hallucination.', featured:false },
  { n:'03', title:'AI-Powered Chatbots & Virtual Agents', desc:'Intelligent conversational agents that handle customer support, sales qualification, onboarding, and internal helpdesk — trained on your data and escalating to humans when needed.', featured:false },
  { n:'04', title:'Computer Vision Solutions', desc:'Object detection, image classification, OCR, document intelligence, and video analytics — deployed on cloud or edge devices for manufacturing, retail, and healthcare use cases.', featured:false },
  { n:'05', title:'Natural Language Processing (NLP)', desc:'Sentiment analysis, entity extraction, document summarisation, contract review, and multilingual text classification built for your industry domain.', featured:false },
  { n:'06', title:'Predictive Analytics & Forecasting', desc:'Demand forecasting, churn prediction, fraud detection, and lead scoring models that turn historical data into forward-looking business decisions.', featured:false },
  { n:'07', title:'AI Workflow Automation', desc:'Replace manual, repetitive processes with AI-driven workflows — document processing, data extraction, approval routing, and report generation done automatically.', featured:false },
  { n:'08', title:'Recommendation Engines', desc:'Personalised product, content, and service recommendations using collaborative filtering, embedding models, and real-time feature stores.', featured:false },
  { n:'09', title:'AI Integration & API Development', desc:'Wrap AI models in production-grade REST or GraphQL APIs — with rate limiting, authentication, monitoring, and versioning built in from day one.', featured:false },
  { n:'10', title:'MLOps & Model Lifecycle Management', desc:'Automated training pipelines, model versioning, A/B testing infrastructure, drift detection, and retraining schedules — so your models stay accurate over time.', featured:false },
  { n:'11', title:'Voice AI & Speech Recognition', desc:'Voicebots, speech-to-text transcription, speaker identification, and real-time call analytics built on Whisper, Azure Speech, and custom fine-tuned models.', featured:false },
  { n:'12', title:'AI Strategy & Proof of Concept', desc:'A structured 4-week engagement to identify your highest-ROI AI use case, validate feasibility, and build a functional prototype your stakeholders can evaluate.', featured:false },
];

const FAQS = [
  { q:'How do you ensure AI outputs are accurate and reliable?', a:'Accuracy comes from grounding AI in your data, not generic training data. For LLM applications we use Retrieval-Augmented Generation (RAG) — the model retrieves relevant facts from your knowledge base before generating a response, dramatically reducing hallucination. For predictive models, we establish baseline accuracy metrics during development, run backtesting on held-out data, and set up automated drift detection that alerts you when model performance degrades in production.' },
  { q:'Can you integrate AI into our existing software and workflows?', a:'Yes. We integrate AI capabilities into existing applications via APIs — your team does not need to change tools or workflows. We also build AI-native workflows that replace existing manual processes end-to-end. Integration points include CRM systems (Salesforce, HubSpot), ERP platforms, web applications, mobile apps, and internal tooling. Most integrations are delivered in 4–8 weeks.' },
  { q:'How long does an AI project take?', a:'A Proof of Concept (POC) typically takes 3–5 weeks. A production-grade AI feature integrated into an existing application takes 6–12 weeks. A full custom ML model — data preparation, training, evaluation, API development, and deployment — takes 8–20 weeks depending on data availability and complexity. We always start with a scoping session to give you a realistic timeline and effort estimate before any development begins.' },
  { q:'Do we need a large dataset to build an AI solution?', a:'Not always. For fine-tuning LLMs, even 50–200 high-quality examples can meaningfully improve domain accuracy. For RAG systems, you just need your existing documents, PDFs, or database records. For computer vision tasks, we can often transfer-learn from pre-trained models with as few as 200–500 labelled images. For predictive models, we typically need 6–18 months of historical transactional data. We assess your data situation in the initial scoping session.' },
  { q:'What AI platforms and frameworks do you work with?', a:'We work with the full AI ecosystem: OpenAI (GPT-4o, o1), Anthropic (Claude), Google (Gemini), Meta (Llama), and Mistral for LLMs. PyTorch and TensorFlow for custom model training. LangChain and LlamaIndex for RAG pipelines. AWS SageMaker, Azure ML, and Vertex AI for managed ML infrastructure. Pinecone, Weaviate, and pgvector for vector databases. We recommend the stack that fits your existing infrastructure and team.' },
  { q:'How do you handle data privacy and security in AI projects?', a:'We design data pipelines with privacy-by-default — data minimisation, encryption at rest and in transit, role-based access controls, and audit logging. For sensitive industries (healthcare, finance, legal), we can deploy models on your own infrastructure so data never leaves your environment. We comply with GDPR, HIPAA, and SOC 2 requirements and document all data flows for your compliance team.' },
  { q:'What is the cost of building an AI solution?', a:'A POC engagement starts from $8,000 and typically delivers a working prototype in 3–5 weeks. A production AI feature integrated into an existing application starts from $15,000. A full custom ML model with training infrastructure and MLOps pipeline starts from $30,000. Ongoing model maintenance and retraining retainers start from $1,500/month. We provide fixed-price proposals after a scoping session — no hourly billing.' },
  { q:'Can you help us identify which AI use cases to prioritise?', a:'Yes. Our AI Strategy engagement is a structured 2-week process where we interview your team, map your data assets, and score potential AI use cases against three dimensions: business impact, data feasibility, and implementation complexity. You receive a prioritised roadmap with effort estimates and expected ROI for each use case — so you can make confident investment decisions rather than guessing.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path fill="#7C3AED" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>, title:'Production AI, Not Demos', desc:'We build AI that operates reliably in production — with monitoring, fallbacks, and graceful degradation built in. We have never shipped a demo that failed in the real world.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#7C3AED" d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>, title:'Measurable Business Outcomes', desc:'Every AI project starts with a business metric — cost reduction, conversion lift, error rate — and ends with measured proof that we moved it in the right direction.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#7C3AED" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Data Privacy by Design', desc:'Privacy-first architecture — data minimisation, on-premise deployment options for sensitive workloads, and full GDPR and HIPAA compliance documentation.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#7C3AED" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'Full AI Stack Expertise', desc:'LLMs, RAG, computer vision, predictive ML, NLP, and voice AI — across OpenAI, Anthropic, Google, and open-source models. We pick the right tool, not the fashionable one.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#7C3AED" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Senior AI Engineers Only', desc:'No juniors working unsupervised on production AI. Our team includes ML engineers with experience at enterprise clients across finance, healthcare, and SaaS.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#7C3AED" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'Fixed-Price Engagements', desc:'Detailed scoping before development means you know the exact cost and timeline before we write a single line of model code. No hourly billing, no scope creep.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#7C3AED" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'Multi-Industry Experience', desc:'AI solutions delivered for eCommerce, healthcare, finance, logistics, legal, and SaaS — we understand the domain context, not just the model architecture.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#7C3AED" d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline fill="none" stroke="#7C3AED" strokeWidth="2" points="22 4 12 14.01 9 11.01"/></svg>, title:'Post-Launch Model Monitoring', desc:'Drift detection, accuracy monitoring, and retraining schedules so your models stay accurate as your data distribution evolves over time.' },
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
    <div className="ai-stat-col">
      <div className="ai-stat-label">{label}</div>
      <div className="ai-stat-value">{display}</div>
    </div>
  );
}

export default function ArtificialIntelligencePage() {
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

  const visibleServices = showAll ? SERVICES : SERVICES.slice(0, 8);

  return (
    <>
      <Head>
        <title>Artificial Intelligence Development Services | LLM, ML & AI Automation | 1Solutions</title>
        <meta name="description" content="1Solutions builds custom AI solutions — LLM integrations, RAG systems, ML models, chatbots, computer vision, and AI workflow automation for US, Canada & Australia businesses." />
        <meta name="keywords" content="artificial intelligence development, llm integration, custom ai development, machine learning services, ai chatbot development, rag systems, nlp solutions" />
        <link rel="canonical" href="https://www.1solutions.biz/artificial-intelligence/" />
        <meta property="og:title" content="Artificial Intelligence Development Services | 1Solutions" />
        <meta property="og:description" content="Custom AI development — LLMs, RAG, ML models, chatbots, and automation. Production AI built on your data." />
        <meta property="og:url" content="https://www.1solutions.biz/artificial-intelligence/" />
        <style>{`
          .ai-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#fdf4ff 0%,#ede9fe 25%,#f0f9ff 55%,#fdf2f8 80%,#fafafa 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden;overflow-y:clip;}
          .ai-page *,.ai-page *::before,.ai-page *::after{box-sizing:border-box;}
          .ai-orb-1{position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.22) 0%,rgba(168,85,247,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px);}
          .ai-orb-2{position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.18) 0%,rgba(14,165,233,0.08) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px);}
          .ai-orb-3{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(244,63,94,0.12) 0%,transparent 70%);top:40%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px);}

          .ai-hero-block{background:transparent;position:relative;overflow:hidden;}
          .ai-hero-block::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px);}
          .ai-hero-block::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px);}
          .ai-hero-content{position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px;}
          .ai-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#6D28D9;margin-bottom:18px;}
          .ai-hero-content h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 40%,#6366F1 75%,#0EA5E9 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .ai-hero-content p{font-size:16px;color:#374151;line-height:1.65;max-width:640px;margin:0 auto 28px;}
          .ai-btn-hero{display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#4C1D95;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(124,58,237,0.12),inset 0 1px 0 rgba(255,255,255,1);position:relative;overflow:hidden;}
          .ai-btn-hero::after{content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:ai-shimmer 2.5s ease-in-out infinite;pointer-events:none;}
          @keyframes ai-shimmer{0%{left:-120%;}35%,100%{left:160%;}}
          .ai-btn-hero:hover{background:rgba(255,255,255,0.85);border-color:rgba(124,58,237,0.5);box-shadow:0 12px 36px rgba(124,58,237,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#4C1D95;}

          .ai-hero-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(124,58,237,0.08),inset 0 1px 0 rgba(255,255,255,0.95);}
          .ai-stat-col{padding:18px 20px;text-align:center;border-right:1px solid rgba(124,58,237,0.10);}
          .ai-stat-col:last-child{border-right:none;}
          .ai-stat-label{font-size:12px;color:#374151;font-weight:500;margin-bottom:6px;}
          .ai-stat-value{font-size:26px;font-weight:900;color:#7C3AED;letter-spacing:-0.5px;line-height:1;}

          .ai-clients-bar{position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px;}
          .ai-clients-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0;}
          .ai-clients-logos{width:100%;overflow:hidden;}
          .ai-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:ai-marquee 28s linear infinite;}
          .ai-logos-track:hover{animation-play-state:paused;}
          @keyframes ai-marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
          .ai-client-logo{height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s;}
          .ai-client-logo:hover{opacity:0.85;filter:grayscale(0%);}

          .ai-section-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7C3AED;margin-bottom:12px;display:block;}
          .ai-section-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px;}
          .ai-section-desc{font-size:15px;color:#374151;line-height:1.7;max-width:680px;margin-bottom:36px;}

          .ai-services-section{background:#fdf4ff;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(124,58,237,0.05),0 -4px 16px rgba(124,58,237,0.03);}
          .ai-services-inner{max-width:1280px;margin:0 auto;}
          .ai-services-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
          .ai-service-card{background:linear-gradient(135deg,rgba(237,233,254,0.60) 0%,rgba(255,255,255,0.88) 60%,rgba(240,249,255,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(124,58,237,0.06),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default;}
          .ai-service-card:hover{transform:translateY(-6px);border-color:rgba(124,58,237,0.35);box-shadow:0 16px 48px rgba(124,58,237,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .ai-service-card.featured{border-color:rgba(124,58,237,0.15);}
          .ai-service-card:hover h3{color:#7C3AED;}
          .ai-card-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#4C1D95;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none;}
          .ai-service-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1;}
          .ai-service-card p{font-size:13px;color:#374151;line-height:1.6;position:relative;z-index:1;}
          .ai-service-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#7C3AED,#6366F1);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1);}
          .ai-service-card:hover::before{transform:scaleY(1);}
          .ai-services-footer{text-align:center;margin-top:20px;}
          .ai-btn-show-more{display:inline-block;background:#ffffff;border:1.5px solid rgba(124,58,237,0.20);color:#6D28D9;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(124,58,237,0.08);font-family:inherit;}
          .ai-btn-show-more:hover{background:#7C3AED;border-color:#7C3AED;color:#ffffff;box-shadow:0 8px 28px rgba(124,58,237,0.20);transform:translateY(-2px);}

          .ai-models-section{background:transparent;padding:80px 40px;position:relative;z-index:1;}
          .ai-models-wrap{max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(124,58,237,0.07),inset 0 1px 0 rgba(255,255,255,0.95);}
          .ai-models-title{font-size:38px;font-weight:900;line-height:1.15;letter-spacing:-0.8px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 12px;}
          .ai-models-sub{font-size:15px;color:#374151;line-height:1.7;max-width:580px;margin:0 0 36px;}
          .ai-models-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
          .ai-model-card{background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(124,58,237,0.12);border-radius:14px;padding:28px 24px;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s;}
          .ai-model-card:hover{transform:translateY(-4px);border-color:rgba(124,58,237,0.40);box-shadow:0 12px 40px rgba(0,0,0,0.08);}
          .ai-model-badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:14px;}
          .ai-model-card h3{font-size:17px;font-weight:700;color:#4C1D95;margin:0 0 8px;}
          .ai-model-card p{font-size:13px;color:#374151;line-height:1.6;margin:0 0 16px;}
          .ai-model-tags{display:flex;flex-wrap:wrap;gap:6px;}
          .ai-model-tag{font-size:11px;font-weight:600;padding:3px 10px;border-radius:12px;background:rgba(124,58,237,0.08);color:#6D28D9;}

          .ai-process-section{background:transparent;padding:80px 40px;position:relative;z-index:1;}
          .ai-process-top{max-width:1280px;margin:0 auto 56px;}
          .ai-process-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#7C3AED;margin:0 0 14px;}
          .ai-process-main-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .ai-process-main-desc{font-size:15px;color:#374151;line-height:1.7;margin:0;}
          .ai-process-divider{border:none;border-top:1px solid rgba(124,58,237,0.15);margin:36px 0 0;width:100%;}
          .ai-process-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start;}
          .ai-process-steps{display:flex;flex-direction:column;}
          .ai-pstep{display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1);}
          .ai-pstep.visible{opacity:1;transform:translateY(0);}
          .ai-pstep-left{display:flex;flex-direction:column;align-items:center;}
          .ai-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(124,58,237,0.20);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#4C1D95;flex-shrink:0;transition:background 0.3s,border-color 0.3s;}
          .ai-pstep:hover .ai-pstep-circle{background:rgba(124,58,237,0.12);border-color:#7C3AED;color:#7C3AED;}
          .ai-pstep-arrow{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px;}
          .ai-pstep-arrow::before{content:'';width:2px;flex:1;background:#7C3AED;opacity:0.25;}
          .ai-pstep-arrow::after{content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #7C3AED;opacity:0.45;margin-top:-1px;}
          .ai-pstep:last-child .ai-pstep-arrow{display:none;}
          .ai-pstep-content{padding:4px 0 44px;}
          .ai-pstep:last-child .ai-pstep-content{padding-bottom:0;}
          .ai-pstep-title{font-size:22px;font-weight:700;color:#4C1D95;margin:0 0 10px;line-height:1.2;}
          .ai-pstep-desc{font-size:15px;color:#374151;line-height:1.75;margin:0;}
          .ai-process-image-col{position:sticky;top:100px;min-width:0;}
          .ai-process-img-wrap{width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(124,58,237,0.15);aspect-ratio:4/5;background:#ede9fe;}
          .ai-process-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;}

          .ai-testi-section{background:#fdf4ff;border-top:1px solid rgba(124,58,237,0.08);border-bottom:1px solid rgba(124,58,237,0.08);padding:80px 40px;position:relative;z-index:1;}
          .ai-testi-inner{max-width:1280px;margin:0 auto;}
          .ai-section-header-center{text-align:center;margin-bottom:52px;}
          .ai-testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px;}
          .ai-tcard{background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(240,249,255,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(124,58,237,0.06),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s;}
          .ai-tcard.ai-tcard-visible{opacity:1;transform:translateY(0);}
          .ai-tcard:hover{transform:translateY(-6px);border-color:rgba(124,58,237,0.35);box-shadow:0 16px 48px rgba(124,58,237,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .ai-tcard.featured{border-color:rgba(124,58,237,0.20);}
          .ai-tcard-stars{font-size:18px;color:#7C3AED;letter-spacing:2px;}
          .ai-tcard-text{font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1;}
          .ai-tcard-author{display:flex;align-items:center;gap:12px;margin-top:4px;}
          .ai-tcard-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0;}
          .ai-tcard-name{font-size:14px;font-weight:700;color:#4C1D95;}
          .ai-tcard-role{font-size:12px;color:#6b7280;}
          .ai-testi-stats{display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(237,233,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(240,249,255,0.35) 100%);backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(124,58,237,0.06),inset 0 1px 0 rgba(255,255,255,0.95);}
          .ai-tstat{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;}
          .ai-tstat-num{font-size:28px;font-weight:800;color:#4C1D95;}
          .ai-tstat-label{font-size:13px;color:#374151;font-weight:500;}
          .ai-tstat-divider{width:1px;height:40px;background:rgba(124,58,237,0.15);}

          .ai-why-section{padding:80px 40px;background:#fdf4ff;border-top:1px solid rgba(124,58,237,0.08);border-bottom:1px solid rgba(124,58,237,0.08);position:relative;z-index:1;}
          .ai-why-inner{max-width:1280px;margin:0 auto;}
          .ai-why-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px;}
          .ai-why-card{background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(240,249,255,0.35) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(124,58,237,0.06),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s;}
          .ai-why-card.ai-card-visible{opacity:1;transform:translateY(0) scale(1);}
          .ai-why-card:hover{transform:translateY(-6px);border-color:rgba(124,58,237,0.35);box-shadow:0 16px 48px rgba(124,58,237,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .ai-why-card-header{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
          .ai-why-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;}
          .ai-why-icon svg{width:28px;height:28px;}
          .ai-why-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35;}
          .ai-why-card p{font-size:13px;color:#374151;line-height:1.7;margin:0;}

          .ai-engage-section{background:#fdf4ff;border-top:1px solid rgba(124,58,237,0.08);padding:80px 40px;position:relative;z-index:1;}
          .ai-engage-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch;}
          .ai-engage-left{position:sticky;top:100px;display:flex;flex-direction:column;}
          .ai-engage-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .ai-engage-desc{font-size:15px;color:#374151;line-height:1.75;margin:0 0 32px;}
          .ai-engage-img-wrap{border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(124,58,237,0.15);flex:1;min-height:300px;}
          .ai-engage-img-wrap img{width:100%;height:100%;min-height:300px;object-fit:cover;display:block;}
          .ai-engage-right{display:flex;flex-direction:column;gap:16px;}
          .ai-ecard{background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(240,249,255,0.35) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(124,58,237,0.06),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s;}
          .ai-ecard.ai-ecard-visible{opacity:1;transform:translateX(0);}
          .ai-ecard:hover{border-color:rgba(124,58,237,0.40);box-shadow:0 16px 48px rgba(124,58,237,0.10);transform:translateX(4px);}
          .ai-ecard-header{display:flex;align-items:center;gap:14px;margin-bottom:10px;}
          .ai-ecard-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;}
          .ai-ecard-icon svg{width:26px;height:26px;stroke:#7C3AED;fill:none;}
          .ai-ecard-title{font-size:18px;font-weight:700;color:#4C1D95;margin:0;}
          .ai-ecard-desc{font-size:14px;color:#374151;line-height:1.65;margin:0 0 16px;}
          .ai-ecard-features{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;}
          .ai-efeat{display:flex;align-items:center;gap:8px;font-size:13px;color:#4C1D95;font-weight:500;}
          .ai-efeat-check{color:#7C3AED;font-size:12px;flex-shrink:0;}

          .ai-contact-section{padding:70px 40px;background:linear-gradient(135deg,rgba(237,233,254,0.65) 0%,rgba(255,255,255,0.60) 40%,rgba(240,249,255,0.55) 100%);backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80);}
          .ai-contact-container{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px;}
          .ai-contact-left{padding:0;align-self:start;}
          .ai-contact-title{font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;}
          .ai-contact-desc{font-size:14px;color:#374151;line-height:1.6;margin:0 0 24px;}
          .ai-merged-box{background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px;}
          .ai-benefit-item{display:flex;gap:10px;align-items:flex-start;}
          .ai-benefit-icon-wrap{width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .ai-benefit-icon{width:20px;height:20px;stroke:#7C3AED;stroke-width:1.75;}
          .ai-benefit-item p{font-size:13px;color:#374151;margin:0;line-height:1.5;}
          .ai-stats-box{padding-top:32px;border-top:1px solid rgba(124,58,237,0.12);}
          .ai-stats-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
          .ai-stat-number{font-size:40px;font-weight:900;color:#4C1D95;line-height:1;display:inline-block;margin-bottom:4px;}
          .ai-stat-text{font-size:13px;color:#374151;line-height:1.4;font-weight:500;}
          .ai-contact-right{align-self:start;}
          .ai-form-box{background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.22) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(124,58,237,0.07),inset 0 1px 0 rgba(255,255,255,1);}
          .ai-form-box h3{font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px;}
          .ai-contact-form{display:flex;flex-direction:column;gap:16px;}
          .ai-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
          .ai-form-group{display:flex;flex-direction:column;gap:6px;}
          .ai-form-group.full{grid-column:1/-1;}
          .ai-form-group label{font-size:12px;font-weight:500;color:#0F1F40;}
          .ai-form-group input,.ai-form-group textarea,.ai-form-group select{padding:10px 14px;border:1px solid rgba(124,58,237,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(124,58,237,0.06);transition:border-color 0.2s,background 0.2s;}
          .ai-form-group input:focus,.ai-form-group textarea:focus{outline:none;border-color:#7C3AED;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(124,58,237,0.12);}
          .ai-phone-input{display:flex;border:1px solid rgba(124,58,237,0.15);border-radius:6px;overflow:hidden;}
          .ai-phone-input select{padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px;}
          .ai-phone-input input{flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none;}
          .ai-phone-input input:focus{outline:none;}
          .ai-consent{display:flex;gap:8px;align-items:flex-start;margin-top:8px;}
          .ai-consent input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;}
          .ai-consent label{font-size:11px;color:#374151;line-height:1.5;margin:0;}
          .ai-consent a{color:#4C1D95;text-decoration:none;}
          .ai-submit-btn{padding:14px 28px;background:rgba(76,29,149,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(124,58,237,0.25),inset 0 1px 0 rgba(255,255,255,0.15);}
          .ai-submit-btn:hover{background:rgba(76,29,149,0.95);border-color:rgba(99,102,241,0.5);transform:translateY(-2px);}

          .ai-faq-section{padding:80px 40px;background:#fdf4ff;border-top:1px solid rgba(124,58,237,0.08);position:relative;z-index:1;}
          .ai-faq-inner{max-width:1280px;margin:0 auto;}
          .ai-faq-heading{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px;}
          .ai-faq-list{display:flex;flex-direction:column;gap:12px;}
          .ai-faq-item{background:linear-gradient(135deg,rgba(237,233,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(240,249,255,0.35) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(124,58,237,0.05),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s;}
          .ai-faq-item.open{border-color:rgba(124,58,237,0.35);box-shadow:0 8px 32px rgba(124,58,237,0.08);}
          .ai-faq-item.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#7C3AED;border-radius:3px 0 0 3px;}
          .ai-faq-question{width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative;}
          .ai-faq-q-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(124,58,237,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s;}
          .ai-faq-item.open .ai-faq-q-badge{background:#7C3AED;color:#fff;}
          .ai-faq-question span{font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45;}
          .ai-faq-item.open .ai-faq-question span{color:#7C3AED;}
          .ai-faq-chevron{width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s;}
          .ai-faq-item.open .ai-faq-chevron{transform:rotate(180deg);color:#7C3AED;}
          .ai-faq-answer-wrap{overflow:hidden;transition:max-height 0.35s ease;max-height:0;}
          .ai-faq-item.open .ai-faq-answer-wrap{max-height:500px;}
          .ai-faq-answer{padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8;}

          .ai-related-section{background:rgba(237,233,254,0.20);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px;}
          .ai-related-inner{max-width:1280px;margin:0 auto;text-align:center;}
          .ai-related-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#374151;margin:0 0 14px;display:block;}
          .ai-related-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#4C1D95 0%,#7C3AED 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .ai-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px;}
          .ai-related-divider{border:none;border-top:1px solid rgba(124,58,237,0.12);margin:40px 0;}
          .ai-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;}
          .ai-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s;}
          .ai-rtag:hover{filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10);}
          .ai-rtag-violet{background:rgba(124,58,237,0.10);border-color:rgba(124,58,237,0.30);color:#6D28D9;}
          .ai-rtag-indigo{background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.30);color:#4338CA;}
          .ai-rtag-sky{background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.30);color:#0369A1;}
          .ai-rtag-amber{background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309;}
          .ai-rtag-green{background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.30);color:#065F46;}
          .ai-rtag-rose{background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C;}
          .ai-rtag-teal{background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E;}

          .ai-section-reveal{opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1);}
          .ai-section-reveal.ai-revealed{opacity:1;transform:translateY(0);}

          @media(max-width:900px){.ai-page{background:linear-gradient(160deg,#fdf4ff 0%,#ede9fe 30%,#f0f9ff 60%,#fdf2f8 100%) !important;}}
          @media(max-width:1024px){
            .ai-hero-content h1{font-size:40px;}
            .ai-services-grid{grid-template-columns:repeat(2,1fr);}
            .ai-why-grid{grid-template-columns:repeat(2,1fr);}
            .ai-models-grid{grid-template-columns:repeat(2,1fr);}
            .ai-engage-inner{grid-template-columns:1fr;}
            .ai-engage-left{position:static;}
            .ai-process-inner{grid-template-columns:1fr;}
            .ai-process-image-col{display:none;}
          }
          @media(max-width:768px){
            .ai-page{overflow-x:hidden;}
            .ai-hero-content{padding:36px 20px 24px;}
            .ai-hero-content h1{font-size:28px;letter-spacing:-0.3px;}
            .ai-hero-content p{font-size:15px;}
            .ai-hero-stats{grid-template-columns:1fr 1fr;max-width:100%;}
            .ai-stat-col{padding:14px 12px;}
            .ai-stat-col:nth-child(2){border-right:none;}
            .ai-stat-col:nth-child(3){border-top:1px solid rgba(124,58,237,0.10);}
            .ai-stat-col:nth-child(4){border-top:1px solid rgba(124,58,237,0.10);border-right:none;}
            .ai-stat-value{font-size:22px;}
            .ai-clients-bar{padding:16px 20px 36px;gap:12px;}
            .ai-services-section,.ai-why-section,.ai-engage-section,.ai-faq-section,.ai-testi-section{padding:48px 20px 40px;}
            .ai-models-section{padding:48px 16px;}
            .ai-models-wrap{padding:24px 20px 32px;border-radius:16px;}
            .ai-models-grid{grid-template-columns:1fr;}
            .ai-process-section{padding:60px 20px;}
            .ai-contact-section{padding:48px 16px;}
            .ai-contact-container{grid-template-columns:1fr;gap:20px;}
            .ai-contact-title,.ai-section-title,.ai-engage-title,.ai-process-main-title,.ai-related-title{font-size:28px;}
            .ai-faq-heading{font-size:26px;}
            .ai-faq-question{padding:18px 18px 18px 52px;}
            .ai-faq-question span{font-size:14px;}
            .ai-faq-answer{padding:0 18px 18px 52px;font-size:14px;}
            .ai-faq-q-badge{left:14px;}
            .ai-related-section{padding:60px 20px;}
            .ai-related-tags{gap:8px;}
            .ai-rtag{padding:9px 16px;font-size:13px;}
            .ai-services-grid{grid-template-columns:1fr 1fr;gap:10px;}
            .ai-testi-grid{grid-template-columns:1fr;}
            .ai-why-grid{grid-template-columns:1fr;margin-top:40px;}
            .ai-testi-stats{flex-wrap:wrap;gap:0;padding:24px 20px;}
            .ai-tstat{flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(124,58,237,0.10);}
            .ai-tstat:nth-child(odd){border-right:1px solid rgba(124,58,237,0.10);}
            .ai-tstat:nth-last-child(-n+2){border-bottom:none;}
            .ai-tstat-divider{display:none;}
            .ai-form-row{grid-template-columns:1fr;}
            .ai-stats-grid{grid-template-columns:1fr 1fr 1fr;}
            .ai-stat-number{font-size:28px;}
          }
          @media(max-width:480px){
            .ai-hero-content h1{font-size:24px;}
            .ai-services-grid{grid-template-columns:1fr;}
            .ai-service-card{padding:20px 18px 18px;}
            .ai-card-num{font-size:52px;}
            .ai-ecard{padding:20px;}
            .ai-ecard-features{grid-template-columns:1fr;}
            .ai-merged-box{padding:18px;}
          }
        `}</style>
      </Head>

      <div className="ai-page">
        <div className="ai-orb-1"/><div className="ai-orb-2"/><div className="ai-orb-3"/>

        {/* HERO */}
        <div className="ai-hero-block">
          <div className="ai-hero-content">
            <span className="ai-eyebrow">Artificial Intelligence Development — Production AI on Your Data</span>
            <h1>AI Development Services — Custom Models, LLM Integration & Intelligent Automation</h1>
            <p>From custom ML models and RAG-powered chatbots to computer vision and predictive analytics — 1Solutions builds AI that operates reliably in production, grounded in your data, and delivering measurable business outcomes.</p>
            <Link href="#contact" className="ai-btn-hero">Get a Free AI Strategy Session</Link>
          </div>
          <div className="ai-hero-stats" ref={statsRef}>
            {[['AI Projects Delivered','80+'],['Avg. Automation Rate','68%'],['Years Experience','15+'],['Client Retention','97%']].map(([label,val])=>(
              <AnimatedStat key={label} label={label} val={val} started={statsStarted}/>
            ))}
          </div>
          <div className="ai-clients-bar">
            <span className="ai-clients-label">Trusted by Leading Brands</span>
            <div className="ai-clients-logos">
              <div className="ai-logos-track">
                {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon2'],['/logo/Uniphore.jpg','Uniphore2'],['/logo/ICCoLogo.png','ICC2'],['/logo/Honor_Logo_(2020).svg.png','Honor2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv2']].map(([src,alt])=>(
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="ai-client-logo"/>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <section className="ai-services-section">
          <div className="ai-services-inner">
            <div className={`ai-section-reveal${visibleSections.has('services')?' ai-revealed':''}`} ref={el=>{sectionRefs.current['services']=el;}}>
              <span className="ai-section-eyebrow">AI Services We Deliver</span>
              <h2 className="ai-section-title">Custom AI Development Services</h2>
              <p className="ai-section-desc">We build AI that goes to production — not POCs that gather dust. Every engagement starts with your business objective and ends with a measured outcome.</p>
            </div>
            <div className="ai-services-grid">
              {visibleServices.map(s=>(
                <div key={s.n} className={`ai-service-card${s.featured?' featured':''}`}>
                  <span className="ai-card-num">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="ai-services-footer">
              <button className="ai-btn-show-more" onClick={()=>setShowAll(v=>!v)}>{showAll?'Show Less ↑':'Show More Services ↓'}</button>
            </div>
          </div>
        </section>

        {/* AI MODELS */}
        <section className="ai-models-section">
          <div className="ai-models-wrap">
            <h2 className={`ai-models-title ai-section-reveal${visibleSections.has('models')?' ai-revealed':''}`} ref={el=>{sectionRefs.current['models']=el;}}>
              AI Models & Frameworks We Work With
            </h2>
            <p className="ai-models-sub">We choose the model that fits your use case and data — not the one that is most fashionable this quarter.</p>
            <div className="ai-models-grid">
              {[
                { badge:'Large Language Models', badgeBg:'#ede9fe', badgeColor:'#6D28D9', title:'LLMs & Foundation Models', desc:'GPT-4o, Claude 3.5, Gemini 1.5 Pro, Llama 3, Mistral — we select the model based on your accuracy, cost, latency, and privacy requirements.', tags:['GPT-4o','Claude 3.5','Gemini 1.5','Llama 3','Mistral','Phi-3'] },
                { badge:'Vector & RAG', badgeBg:'#eff6ff', badgeColor:'#4338CA', title:'RAG & Semantic Search', desc:'Retrieval-Augmented Generation pipelines with Pinecone, Weaviate, Chroma, or pgvector — grounding LLM responses in your documents and eliminating hallucination.', tags:['LangChain','LlamaIndex','Pinecone','Weaviate','pgvector','Chroma'] },
                { badge:'ML & Deep Learning', badgeBg:'#f0fdf4', badgeColor:'#065F46', title:'Custom ML Models', desc:'PyTorch and TensorFlow for training custom models — classification, regression, object detection, time-series forecasting — on your labelled datasets.', tags:['PyTorch','TensorFlow','Scikit-learn','XGBoost','Keras','HuggingFace'] },
                { badge:'MLOps', badgeBg:'#fff7ed', badgeColor:'#C2410C', title:'ML Infrastructure', desc:'Model training pipelines, experiment tracking, model registry, A/B testing, drift monitoring, and automated retraining on AWS SageMaker, Azure ML, or Vertex AI.', tags:['MLflow','SageMaker','Azure ML','Vertex AI','DVC','Weights & Biases'] },
                { badge:'Vision AI', badgeBg:'#fdf4ff', badgeColor:'#7C3AED', title:'Computer Vision', desc:'YOLOv8, EfficientDet, and custom CNN architectures for object detection, image classification, OCR, and video analytics deployed on cloud or edge.', tags:['YOLO','OpenCV','Tesseract','Azure Vision','AWS Rekognition','Edge TPU'] },
                { badge:'Voice & Audio', badgeBg:'#ecfdf5', badgeColor:'#15803D', title:'Voice AI', desc:'Whisper for transcription, ElevenLabs for synthesis, and custom fine-tuned speech models for voicebots, call analytics, and real-time transcription pipelines.', tags:['Whisper','ElevenLabs','Azure Speech','AWS Transcribe','DeepSpeech','PyAnnote'] },
              ].map(m=>(
                <div className="ai-model-card" key={m.title}>
                  <span className="ai-model-badge" style={{background:m.badgeBg,color:m.badgeColor}}>{m.badge}</span>
                  <h3>{m.title}</h3><p>{m.desc}</p>
                  <div className="ai-model-tags">{m.tags.map(t=><span key={t} className="ai-model-tag">{t}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="ai-process-section">
          <div className="ai-process-top">
            <div className={`ai-section-reveal${visibleSections.has('process')?' ai-revealed':''}`} ref={el=>{sectionRefs.current['process']=el;}}>
              <p className="ai-process-eyebrow">HOW WE BUILD</p>
              <h2 className="ai-process-main-title">Our AI Development Process</h2>
              <p className="ai-process-main-desc">Every AI project we deliver follows the same structured process — from business case through to production monitoring — so nothing important gets skipped.</p>
            </div>
            <hr className="ai-process-divider"/>
          </div>
          <div className="ai-process-inner">
            <div className="ai-process-steps">
              {[
                ['Discovery & Use Case Scoping','We identify and prioritise AI use cases by scoring each against business impact, data feasibility, and implementation complexity. You leave with a ranked roadmap and effort estimates — so you invest in the highest-ROI use case first.'],
                ['Data Assessment & Preparation','We audit your data — volume, quality, labelling, and access controls. Then we build data pipelines, handle class imbalance, and establish ground-truth benchmarks so the model has a solid foundation to train on.'],
                ['Model Development & Evaluation','Custom model training, fine-tuning, or LLM integration with systematic evaluation against your accuracy, latency, and cost targets. Every model is tested against held-out data before we declare it production-ready.'],
                ['Deployment & Monitoring','Production deployment with API, authentication, rate limiting, and logging. MLOps setup for drift detection, accuracy monitoring, and automated retraining alerts — so the model stays accurate as your data evolves.'],
              ].map(([title,desc],i)=>(
                <div className={`ai-pstep${visibleSteps.includes(i)?' visible':''}`} key={title} ref={el=>{stepRefs.current[i]=el;}}>
                  <div className="ai-pstep-left"><div className="ai-pstep-circle">{i+1}</div>{i<3&&<div className="ai-pstep-arrow"/>}</div>
                  <div className="ai-pstep-content"><h3 className="ai-pstep-title">{title}</h3><p className="ai-pstep-desc">{desc}</p></div>
                </div>
              ))}
            </div>
            <div className="ai-process-image-col">
              <div className="ai-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://placehold.co/480x600/4C1D95/ffffff?text=AI+Development+Process" alt="AI development process" loading="lazy"/>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="ai-testi-section">
          <div className="ai-testi-inner">
            <div className={`ai-section-header-center ai-section-reveal${visibleSections.has('testi')?' ai-revealed':''}`} ref={el=>{sectionRefs.current['testi']=el;}}>
              <span className="ai-section-eyebrow">Client Results</span>
              <h2 className="ai-section-title">Real AI, Real Business Impact</h2>
              <p className="ai-section-desc" style={{margin:'0 auto 0'}}>Companies that built production AI with 1Solutions.</p>
            </div>
            <div className="ai-testi-grid" ref={testiGridRef}>
              {[
                { stars:'★★★★★',featured:true, text:'"1Solutions built us a RAG-based document Q&A system on top of our 12,000-page legal library. Our paralegals now find answers in 30 seconds instead of 45 minutes. We\'ve reduced research time by 83% and the accuracy is remarkable."', name:'Michelle Hartley', role:'Managing Partner, Hartley & Crane LLP — Chicago, IL', initials:'MH', color:'#4C1D95' },
                { stars:'★★★★★',featured:false, text:'"We implemented an AI demand forecasting model that reduced our inventory overstock by $1.2M in the first year. The model is accurate, well-documented, and the MLOps setup means it retrains automatically every quarter."', name:'Omar Tahir', role:'Head of Supply Chain, NovaDist — Toronto, ON', initials:'OT', color:'#7C3AED' },
                { stars:'★★★★★',featured:false, text:'"Our AI support chatbot handles 71% of inbound tickets without human escalation. CSAT is up from 3.4 to 4.7 out of 5. The team understood our domain deeply and the handoff logic to human agents is seamless."', name:'Priya Sharma', role:'VP Customer Experience, HealthBridge — Sydney, AU', initials:'PS', color:'#6366F1' },
              ].map((t,i)=>(
                <div key={t.name} className={`ai-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' ai-tcard-visible':''}`}>
                  <div className="ai-tcard-stars">{t.stars}</div>
                  <p className="ai-tcard-text">{t.text}</p>
                  <div className="ai-tcard-author"><div className="ai-tcard-avatar" style={{background:t.color}}>{t.initials}</div><div><div className="ai-tcard-name">{t.name}</div><div className="ai-tcard-role">{t.role}</div></div></div>
                </div>
              ))}
            </div>
            <div className="ai-testi-stats">
              {[['80+','AI Projects Delivered'],null,['68%','Avg. Automation Rate'],null,['97%','Client Retention'],null,['15+','Years Experience']].map((item,i)=>
                item===null?<div key={i} className="ai-tstat-divider"/>:<div key={item[0]} className="ai-tstat"><span className="ai-tstat-num">{item[0]}</span><span className="ai-tstat-label">{item[1]}</span></div>
              )}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="ai-why-section">
          <div className="ai-why-inner">
            <div className={`ai-section-header-center ai-section-reveal${visibleSections.has('why')?' ai-revealed':''}`} ref={el=>{sectionRefs.current['why']=el;}}>
              <span className="ai-section-eyebrow">Why 1Solutions</span>
              <h2 className="ai-section-title">Why Companies Choose Us for AI</h2>
              <p className="ai-section-desc" style={{margin:'0 auto 0'}}>We have delivered 80+ AI projects. Here is what makes our approach different from a generic software agency that added AI to their homepage.</p>
            </div>
            <div className="ai-why-grid" ref={whyGridRef}>
              {WHY.map((w,i)=>(
                <div key={w.title} className={`ai-why-card${visibleWhyCards.includes(i)?' ai-card-visible':''}`} style={{transitionDelay:`${i*80}ms`}}>
                  <div className="ai-why-card-header"><div className="ai-why-icon">{w.icon}</div><h3>{w.title}</h3></div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENGAGEMENT */}
        <section className="ai-engage-section">
          <div className="ai-engage-inner">
            <div className="ai-engage-left">
              <div className={`ai-section-reveal${visibleSections.has('engage')?' ai-revealed':''}`} ref={el=>{sectionRefs.current['engage']=el;}}>
                <span className="ai-section-eyebrow">How We Engage</span>
                <h2 className="ai-engage-title">Engagement Models for Every Stage</h2>
                <p className="ai-engage-desc">Whether you are exploring AI for the first time or scaling existing models into production, we have a model that fits your current stage.</p>
              </div>
              <div className="ai-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://placehold.co/560x420/4C1D95/ffffff?text=AI+Partnership" alt="AI engagement models" loading="lazy"/>
              </div>
            </div>
            <div className="ai-engage-right" ref={eCardsRef}>
              {[
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="9" cy="10" r="1.5" fill="#7C3AED" stroke="none"/><circle cx="15" cy="10" r="1.5" fill="#7C3AED" stroke="none"/><path d="M8 14c1 2 2.5 3 4 3s3-1 4-3" strokeLinecap="round"/></svg>, title:'AI Strategy & POC', desc:'A 4-week engagement to identify your highest-ROI AI use case, validate feasibility with real data, and build a working prototype your stakeholders can evaluate. Fixed price from $8,000.', features:['Use case scoring','Data feasibility audit','Working prototype','Investment roadmap'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, title:'Custom AI Feature Build', desc:'End-to-end development of a specific AI feature — chatbot, recommender, forecasting model, or automation — integrated into your existing product. Fixed price from $15,000.', features:['Model training & evaluation','API development','App integration','30-day support'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>, title:'LLM Integration & RAG', desc:'Connect your knowledge base to an LLM — ingest documents, build a retrieval pipeline, tune prompts, and deploy a Q&A or search interface. From 4 to 8 weeks depending on data volume.', features:['Document ingestion','Vector search setup','RAG pipeline','Accuracy evaluation'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, title:'MLOps & Ongoing Optimisation', desc:'Post-launch model monitoring, drift detection, quarterly retraining, accuracy reporting, and feature updates — on a monthly retainer from $1,500/month.', features:['Drift monitoring','Retraining automation','Accuracy reporting','Feature updates'] },
              ].map((ec,i)=>(
                <div key={ec.title} className={`ai-ecard${visibleECards.includes(i)?' ai-ecard-visible':''}`} style={{transitionDelay:`${i*100}ms`}}>
                  <div className="ai-ecard-header"><div className="ai-ecard-icon">{ec.icon}</div><h3 className="ai-ecard-title">{ec.title}</h3></div>
                  <p className="ai-ecard-desc">{ec.desc}</p>
                  <div className="ai-ecard-features">{ec.features.map(f=><div key={f} className="ai-efeat"><span className="ai-efeat-check">✔</span>{f}</div>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="ai-contact-section" id="contact">
          <div className="ai-contact-container">
            <div className="ai-contact-left">
              <div className={`ai-section-reveal${visibleSections.has('contact')?' ai-revealed':''}`} ref={el=>{sectionRefs.current['contact']=el;}}>
                <h2 className="ai-contact-title">Ready to Build AI That Works?</h2>
                <p className="ai-contact-desc">Tell us about your use case and data. We respond within 24 hours with an honest assessment of feasibility, timeline, and cost.</p>
              </div>
              <div className="ai-merged-box">
                {[
                  { label:'Free AI Strategy Session', desc:'A 45-minute call with a senior ML engineer — we review your use case, assess data feasibility, and give honest recommendations on approach, model selection, and expected accuracy.' },
                  { label:'Fixed-Price Proposal in 48 Hours', desc:'Detailed scope covering data requirements, model approach, evaluation criteria, integration plan, timeline, and fixed price — no hourly billing, no ambiguous deliverables.' },
                  { label:'Measurable Outcome Guaranteed', desc:'Every AI project starts with a business metric we are targeting and ends with measured proof that we moved it. If the model does not hit the agreed accuracy threshold, we continue until it does.' },
                ].map(b=>(
                  <div key={b.label} className="ai-benefit-item">
                    <div className="ai-benefit-icon-wrap">
                      <svg className="ai-benefit-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.75"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p><strong>{b.label}</strong> — {b.desc}</p>
                  </div>
                ))}
                <div className="ai-stats-box">
                  <div className="ai-stats-grid">
                    {[['80+','AI projects delivered'],['68%','Avg. automation rate'],['15+','Years experience']].map(([n,t])=>(
                      <div key={t}><div className="ai-stat-number">{n}</div><div className="ai-stat-text">{t}</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="ai-contact-right">
              <div className="ai-form-box">
                <h3>Tell Us About Your AI Use Case</h3>
                <form className="ai-contact-form" onSubmit={e=>e.preventDefault()}>
                  <div className="ai-form-row">
                    <div className="ai-form-group"><label htmlFor="ai-fname">First Name *</label><input id="ai-fname" type="text" placeholder="Alex" required/></div>
                    <div className="ai-form-group"><label htmlFor="ai-lname">Last Name *</label><input id="ai-lname" type="text" placeholder="Johnson" required/></div>
                  </div>
                  <div className="ai-form-row">
                    <div className="ai-form-group"><label htmlFor="ai-email">Work Email *</label><input id="ai-email" type="email" placeholder="alex@company.com" required/></div>
                    <div className="ai-form-group">
                      <label htmlFor="ai-phone">Phone</label>
                      <div className="ai-phone-input">
                        <select aria-label="Country code"><option>+1</option><option>+61</option><option>+44</option><option>+91</option></select>
                        <input id="ai-phone" type="tel" placeholder="(555) 000-0000"/>
                      </div>
                    </div>
                  </div>
                  <div className="ai-form-row">
                    <div className="ai-form-group">
                      <label htmlFor="ai-service">AI Service Needed</label>
                      <select id="ai-service">
                        <option value="">Select…</option>
                        <option>LLM Integration / Chatbot</option>
                        <option>RAG / Document Q&A</option>
                        <option>Predictive ML Model</option>
                        <option>Computer Vision</option>
                        <option>AI Workflow Automation</option>
                        <option>AI Strategy / POC</option>
                        <option>Not sure — need advice</option>
                      </select>
                    </div>
                    <div className="ai-form-group">
                      <label htmlFor="ai-budget">Budget Range</label>
                      <select id="ai-budget">
                        <option value="">Select range…</option>
                        <option>Under $10,000</option>
                        <option>$10,000–$30,000</option>
                        <option>$30,000–$75,000</option>
                        <option>$75,000+</option>
                      </select>
                    </div>
                  </div>
                  <div className="ai-form-group full">
                    <label htmlFor="ai-msg">Describe Your AI Use Case *</label>
                    <textarea id="ai-msg" rows={4} placeholder="e.g. We want to build a chatbot that answers questions from our 500-page product documentation. We have a Next.js app and want the bot embedded in the support section…" required/>
                  </div>
                  <div className="ai-consent">
                    <input type="checkbox" id="ai-consent" required/>
                    <label htmlFor="ai-consent">I agree to 1Solutions&apos; <Link href="/privacy-policy">Privacy Policy</Link> and consent to being contacted about my enquiry.</label>
                  </div>
                  <button type="submit" className="ai-submit-btn">Send My AI Brief →</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="ai-faq-section">
          <div className="ai-faq-inner">
            <div className={`ai-section-reveal${visibleSections.has('faq')?' ai-revealed':''}`} ref={el=>{sectionRefs.current['faq']=el;}}>
              <h2 className="ai-faq-heading">Frequently Asked Questions</h2>
            </div>
            <div className="ai-faq-list">
              {FAQS.map((faq,i)=>(
                <div key={i} className={`ai-faq-item${openFaq===i?' open':''}`}>
                  <button className="ai-faq-question" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                    <span className="ai-faq-q-badge">{String.fromCharCode(65+i)}</span>
                    <span>{faq.q}</span>
                    <svg className="ai-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="ai-faq-answer-wrap"><div className="ai-faq-answer">{faq.a}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED */}
        <section className="ai-related-section">
          <div className="ai-related-inner">
            <span className="ai-related-eyebrow">Explore Related Services</span>
            <h2 className="ai-related-title">More Ways We Can Help</h2>
            <p className="ai-related-sub">AI works best as part of a broader digital strategy. Explore the services that work alongside intelligent automation.</p>
            <hr className="ai-related-divider"/>
            <div className="ai-related-tags">
              {[
                ['/digital-transformation','Custom Software Development','ai-rtag-indigo'],
                ['/cloud-devops','Cloud & MLOps Infrastructure','ai-rtag-sky'],
                ['/ecommerce-development','AI-Powered eCommerce','ai-rtag-amber'],
                ['/digital-marketing','AI-Driven Digital Marketing','ai-rtag-green'],
                ['/chatbot-development-services','Chatbot Development','ai-rtag-violet'],
                ['/data-analytics-services','Data Analytics','ai-rtag-teal'],
                ['/api-integration-services','API Integration','ai-rtag-rose'],
                ['/hire-dedicated-resources','Hire AI Engineers','ai-rtag-violet'],
                ['/nlp-development-services','NLP Development','ai-rtag-sky'],
                ['/machine-learning-services','Machine Learning','ai-rtag-indigo'],
                ['/hire-dedicated-developers','Hire On Demand','ai-rtag-amber'],
              ].map(([href,label,cls])=>(
                <Link key={href} href={href} className={`ai-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
