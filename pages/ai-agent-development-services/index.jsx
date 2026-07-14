'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function AuroraText({ children }) {
  return (
    <span style={{background:'linear-gradient(135deg,#f43f5e,#ec4899,#a855f7,#8b5cf6,#3b82f6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',backgroundSize:'200% auto',animation:'aad-aurora 4s linear infinite'}}>{children}</span>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────── */
const STATS = [
  { label:'AI Agents Built',      val:'100+' },
  { label:'LLMs Integrated',      val:'10+'  },
  { label:'Industries Served',    val:'15+'  },
  { label:'Years AI Experience',  val:'5+'   },
];

const AGENTS = [
  { n:'01', icon:'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', title:'Conversational AI Agents', desc:'Customer support, internal helpdesk, and sales assistants that hold context across long conversations and integrate with your CRM, ticketing system, and knowledge base.' },
  { n:'02', icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1', title:'Autonomous Task Agents', desc:'Self-directed agents that plan and execute multi-step tasks without supervision — research, data collection, report generation, and workflow completion from a single prompt.' },
  { n:'03', icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'RAG Knowledge Agents', desc:'Document Q&A, internal knowledge bases, and research assistants powered by Retrieval-Augmented Generation. Your proprietary data, always current, every answer cited.' },
  { n:'04', icon:'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z', title:'Workflow Automation Agents', desc:'End-to-end process automation for approval chains, data entry, cross-system orchestration, and report generation — replacing brittle rule-based RPA with reasoning-capable AI.' },
  { n:'05', icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', title:'Multi-Agent Systems', desc:'Orchestrated teams of specialised agents working in parallel — one plans, one researches, one writes, one reviews — for complex tasks no single agent can handle reliably alone.' },
  { n:'06', icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Data Analysis Agents', desc:'Agents that connect to your databases, write and run queries, interpret results, and surface actionable insights in plain language — no dedicated BI analyst required.' },
  { n:'07', icon:'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title:'Voice AI Agents', desc:'Phone and voice-enabled agents for inbound customer service, outbound follow-up, and appointment booking — integrated with Twilio, Vonage, or your existing telephony stack.' },
  { n:'08', icon:'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', title:'Custom LLM Fine-Tuning', desc:'Domain-specific model fine-tuning on your proprietary data — terminology, compliance constraints, tone, and domain knowledge baked into the model itself rather than the prompt.' },
];

const PROCESS = [
  { n:'01', icon:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title:'Discovery & Scoping', desc:"Define the agent's goals, decision boundaries, tool access, and success metrics. Map the workflows it will replace or augment and agree on evaluation criteria before writing a line of code." },
  { n:'02', icon:'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', title:'Architecture Design', desc:'Choose the right LLM, orchestration framework (LangGraph, AutoGen, CrewAI), memory strategy, tool integrations, and RAG pipeline design. Architecture decisions made before development save weeks of rework.' },
  { n:'03', icon:'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title:'Development & Integration', desc:'Build the agent core, connect APIs and databases, implement RAG pipelines, and wire up all required tool calls. We deliver working increments early so you can validate direction throughout development.' },
  { n:'04', icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'Testing & Red-Teaming', desc:'Evaluate accuracy, hallucination rates, latency, cost per query, and edge-case handling. Adversarially test for prompt injection, unexpected behaviour, and failure modes before any user sees the agent.' },
  { n:'05', icon:'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', title:'Deployment & Scaling', desc:'Deploy to your cloud infrastructure (AWS, GCP, Azure) with monitoring, logging, rate limiting, cost controls, and human escalation paths configured from day one.' },
  { n:'06', icon:'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title:'Monitoring & Optimisation', desc:'Track production performance, collect failure cases, tune retrieval and prompts, and evolve the agent as requirements grow. Agents improve with use — we set up the feedback loops that make that happen.' },
];

const WHY = [
  { icon:'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', title:'LLM-Agnostic Approach', desc:'We work with GPT-4o, Claude 3.5/3.7 Sonnet, Gemini 1.5 Pro, Llama 3, and Mistral — selecting the right model for your cost, performance, latency, and data-residency requirements.' },
  { icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'Full RAG Stack Expertise', desc:'We design, build, and tune complete RAG pipelines — chunking strategy, embedding models, vector store selection, hybrid search, re-ranking — not LLM wrappers that hallucinate because retrieval is broken.' },
  { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'Production-Ready from Day One', desc:'Rate limiting, cost monitoring, fallback logic, human escalation paths, structured logging, and observability — built into the agent architecture, not bolted on after the first production incident.' },
  { icon:'M13 10V3L4 14h7v7l9-11h-7z', title:'Proven Framework Depth', desc:'Deep experience with LangChain, LangGraph, AutoGen, CrewAI, and Semantic Kernel. We choose the framework that fits the task complexity and your team\'s long-term maintenance needs.' },
  { icon:'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title:'Security & Compliance First', desc:'Data stays in your infrastructure. We architect for prompt injection prevention, PII redaction, role-based access controls, and audit logging — not as afterthoughts, but as design requirements.' },
  { icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title:'Beyond the Proof of Concept', desc:'We build agents that run reliably in production for months — not impressive demos that fall apart on edge cases. Evaluation-driven development ensures what ships actually works.' },
];

const STACK = [
  { category:'Foundation Models',  items:['GPT-4o','Claude 3.7 Sonnet','Gemini 1.5 Pro','Llama 3.3','Mistral Large','DeepSeek R1'] },
  { category:'Agent Frameworks',   items:['LangGraph','AutoGen','CrewAI','LangChain','Semantic Kernel','Pydantic AI'] },
  { category:'Vector & RAG',       items:['Pinecone','Weaviate','ChromaDB','pgvector','Qdrant','LlamaIndex'] },
  { category:'Cloud & Infra',      items:['AWS Bedrock','Google Vertex AI','Azure OpenAI','Docker','Kubernetes','FastAPI'] },
];

const USE_CASES = [
  { icon:'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title:'eCommerce', items:['Product recommendation agents','AI-powered customer support','Inventory & pricing analysis','Post-purchase follow-up agents'] },
  { icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1', title:'SaaS & Tech', items:['Automated user onboarding agents','Developer documentation assistants','Code review & QA agents','Customer success automation'] },
  { icon:'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title:'Healthcare', items:['Patient intake & triage agents','Clinical document summarisation','Appointment scheduling agents','Medical knowledge bases (RAG)'] },
  { icon:'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title:'Finance & Legal', items:['Contract review & summarisation','Compliance checking agents','Financial data analysis agents','Due diligence automation'] },
];

const FAQS = [
  { q:'What is an AI agent and how is it different from a chatbot?', a:'A chatbot responds to user messages using predefined scripts or a language model. An AI agent goes further — it reasons through a problem, decides which tools to use, takes actions across external systems (APIs, databases, browsers), and works toward a goal over multiple steps without needing step-by-step instructions. A chatbot answers questions; an AI agent completes tasks.' },
  { q:'How long does it take to build an AI agent?', a:'A focused single-purpose agent — customer support, document Q&A, data lookup — typically takes 4 to 8 weeks from scoping to production deployment. Multi-agent systems with complex orchestration, custom RAG pipelines, and deep integrations typically take 10 to 16 weeks. We build in working increments so you see a functional agent within the first two to three weeks.' },
  { q:'Which LLM do you use for AI agent development?', a:'We are model-agnostic and select based on your requirements. Claude 3.5/3.7 Sonnet is our default for most agentic tasks — strong instruction-following, long context, low hallucination. GPT-4o is preferred for code-heavy agents and tool use. Llama 3 and Mistral are used when data must stay on-premise or cost efficiency is a priority. We evaluate multiple models during the architecture phase and recommend based on benchmarks against your actual use case.' },
  { q:'Can you integrate AI agents with our existing software?', a:'Yes. Most of the value of AI agents comes from connecting them to your existing systems — CRMs (Salesforce, HubSpot), databases (PostgreSQL, MongoDB), ERPs, ticketing systems (Zendesk, Freshdesk), communication tools (Slack, Teams), and internal APIs. Tool integration is a core part of our development process, not an add-on.' },
  { q:'What does AI agent development cost?', a:'A focused proof-of-concept or single-purpose agent typically starts from $8,000 to $15,000 USD depending on integration complexity. Production-ready agents with full RAG pipelines, multiple tool integrations, and cloud deployment range from $20,000 to $60,000+. Multi-agent systems with custom fine-tuning are scoped individually. We provide a detailed estimate after the discovery phase, which is available at no cost.' },
  { q:'Is our data secure during development and after deployment?', a:'Yes. We work within your chosen cloud infrastructure (AWS, GCP, Azure) so your data never passes through our servers. We implement prompt injection prevention, PII redaction in logs, role-based access controls, and audit trails. For regulated industries (healthcare, finance, legal) we architect specifically for compliance — HIPAA, SOC 2, GDPR — from the start.' },
  { q:'Do I need a large proprietary dataset to build an AI agent?', a:'Not necessarily. Foundation models like GPT-4o and Claude already have broad world knowledge. For a customer support agent, your existing knowledge base, product documentation, and FAQ content is usually sufficient as a RAG data source. Custom fine-tuning is only required when you need the model to deeply internalize domain-specific terminology, a specific writing style, or proprietary reasoning patterns that cannot be captured through retrieval and prompting.' },
  { q:'What ongoing support do you provide after deployment?', a:'We offer post-deployment support packages covering monitoring, incident response, prompt and retrieval tuning, model updates as providers release new versions, and feature additions. Agents in production change — user queries evolve, edge cases emerge, and new requirements arise — and we structure our support around keeping agents accurate and reliable over time, not just at launch.' },
];

const RELATED = [
  { icon:'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', title:'AI Chatbot Development', href:'/ai-chatbot-development-services', desc:'Conversational AI chatbots for customer support, sales, and internal helpdesks — built on GPT-4o, Claude, and Gemini with CRM and ticketing integrations.' },
  { icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1', title:'Artificial Intelligence Services', href:'/artificial-intelligence', desc:'Custom ML model development, computer vision, predictive analytics, NLP, and generative AI integration — the full spectrum of AI development.' },
  { icon:'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', title:'Generative Engine Optimisation', href:'/generative-engine-optimization-services', desc:'Get your brand cited in Google AI Overviews, ChatGPT, and Perplexity. GEO content strategy for AI-era search visibility.' },
  { icon:'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', title:'Hire an AI Developer', href:'/hire-ai-developer', desc:'Dedicated AI developers available on a flexible engagement model — for teams that need to extend capacity on specific AI projects.' },
  { icon:'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z', title:'SaaS Application Development', href:'/saas-application-development-company', desc:'End-to-end SaaS product development — a natural pairing when AI agents need a product shell, admin dashboard, or multi-tenant architecture.' },
  { icon:'M13 10V3L4 14h7v7l9-11h-7z', title:'Digital Transformation', href:'/digital-transformation', desc:'Strategy and execution for organisations adopting AI at scale — from process mapping and change management to system integration and governance.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'Home',                      item:'https://www.1solutions.biz/'                                           },
        { '@type':'ListItem', position:2, name:'Artificial Intelligence',   item:'https://www.1solutions.biz/artificial-intelligence/'                   },
        { '@type':'ListItem', position:3, name:'AI Agent Development Services', item:'https://www.1solutions.biz/ai-agent-development-services/'         },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.1solutions.biz/ai-agent-development-services/',
      url: 'https://www.1solutions.biz/ai-agent-development-services/',
      name: 'AI Agent Development Services | Custom AI Agents | 1Solutions',
      description: 'Custom AI agent development — conversational agents, autonomous task agents, RAG knowledge agents, multi-agent systems. LangChain, AutoGen, CrewAI. GPT-4o, Claude, Gemini.',
      inLanguage: 'en',
      speakable: { '@type':'SpeakableSpecification', cssSelector:['h1','h2'] },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.1solutions.biz/#organization',
      name: '1Solutions',
      url: 'https://www.1solutions.biz',
      logo: { '@type':'ImageObject', url:'https://www.1solutions.biz/images/1solutions-logo.png' },
      foundingDate: '2008',
      aggregateRating: { '@type':'AggregateRating', ratingValue:'4.9', reviewCount:'94', bestRating:'5' },
    },
    {
      '@type': 'ProfessionalService',
      name: 'AI Agent Development Services',
      serviceType: 'AI Agent Development',
      url: 'https://www.1solutions.biz/ai-agent-development-services/',
      description: 'Custom AI agent development services — conversational agents, RAG knowledge agents, autonomous task agents, multi-agent systems, voice agents, and LLM fine-tuning. 100+ agents built.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type':'ImageObject', url:'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US','GB','AU','CA','IN'],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a } })),
    },
    {
      '@type': 'HowTo',
      name: 'How We Build AI Agents',
      step: PROCESS.map((p, i) => ({ '@type':'HowToStep', position:i + 1, name:p.title, text:p.desc })),
    },
  ],
};

const RC_KEY = '6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';

export default function AIAgentDevelopmentServices() {
  const [openFaq, setOpenFaq]     = useState(0);
  const [form, setForm]           = useState({ name:'', email:'', website:'', message:'' });
  const [formState, setFormState] = useState('idle');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const els = document.querySelectorAll('.aad-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('aad-vis'); obs.unobserve(e.target); } });
    }, { threshold: 0.10 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setFormState('sending'); setFormError('');
    try {
      const recaptchaToken = await new Promise(resolve =>
        window.grecaptcha.ready(() => window.grecaptcha.execute(RC_KEY, { action:'aad_contact' }).then(resolve))
      );
      const res = await fetch('/api/contact', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name:form.name, email:form.email, company:form.website, service:'AI Agent Development', message:form.message, consent:true, source:'AI Agent Development Page', recaptchaToken }),
      });
      if (!res.ok) { const d = await res.json().catch(()=>({})); throw new Error(d.message||'Submission failed.'); }
      setFormState('success');
    } catch(err) { setFormState('error'); setFormError(err.message); }
  }

  return (
    <>
      <Head>
        <title>AI Agent Development Services | Custom AI Agents Built for Production | 1Solutions</title>
        <meta name="description" content="Custom AI agent development — conversational agents, autonomous task agents, RAG knowledge bases, multi-agent systems, voice agents. GPT-4o, Claude, LangGraph, AutoGen. 100+ agents built." />
        <link rel="canonical" href="https://www.1solutions.biz/ai-agent-development-services/" />
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content="AI Agent Development Services | 1Solutions" />
        <meta property="og:description" content="Custom AI agents built for production. Conversational agents, RAG pipelines, autonomous task agents, multi-agent systems. GPT-4o, Claude, LangGraph, AutoGen." />
        <meta property="og:url"         content="https://www.1solutions.biz/ai-agent-development-services/" />
        <meta property="og:image"       content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <meta name="twitter:card"       content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          @keyframes aad-aurora{0%{background-position:0% center}100%{background-position:200% center}}
          .aad-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .aad-page *,.aad-page *::before,.aad-page *::after{box-sizing:border-box}
          .aad-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .aad-orb1{width:900px;height:900px;background:radial-gradient(circle,rgba(99,130,255,.35) 0%,rgba(139,92,246,.15) 40%,transparent 70%);top:-300px;right:-300px}
          .aad-orb2{width:800px;height:800px;background:radial-gradient(circle,rgba(251,146,60,.30) 0%,rgba(245,158,11,.15) 40%,transparent 70%);bottom:0;left:-250px}
          .aad-orb3{width:600px;height:600px;background:radial-gradient(circle,rgba(20,184,166,.20) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%)}
          .aad-reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .aad-reveal.aad-vis{opacity:1;transform:translateY(0)}
          /* Breadcrumb */
          .aad-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;padding:16px 40px 0;max-width:1280px;margin:0 auto;position:relative;z-index:2;font-weight:500}
          .aad-bc a{color:#6b7280;text-decoration:none}.aad-bc a:hover{color:#D97706}.aad-bc-sep{color:#d1d5db}
          /* Hero */
          .aad-hero{position:relative;z-index:1;padding:72px 40px 0}
          .aad-hero-inner{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto}
          .aad-eyebrow{font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;display:block;margin-bottom:18px}
          .aad-h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:18px;color:#0F1F40}
          .aad-hero-sub{font-size:16px;color:#3A507A;line-height:1.65;max-width:700px;margin:0 auto 28px}
          .aad-btns{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:32px}
          .aad-btn-p{position:relative;display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);border-radius:50px;color:#fff;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .aad-btn-p:hover{background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,0.30)}
          .aad-btn-s{display:inline-flex;align-items:center;padding:14px 32px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .aad-btn-s:hover{background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}
          /* Stats bar */
          .aad-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95)}
          .aad-stat{padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}.aad-stat:last-child{border-right:none}
          .aad-stat-v{font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1;margin-bottom:6px}
          .aad-stat-l{font-size:12px;color:#4A6080;font-weight:500}
          /* Sections */
          .aad-sec{padding:80px 40px;position:relative;z-index:1}
          .aad-white{background:#fff}
          .aad-in{max-width:1280px;margin:0 auto}
          .aad-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .aad-h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:12px}
          .aad-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}
          /* Glass card */
          .aad-glass{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s,border-color .22s}
          .aad-glass:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(15,52,96,.12);border-color:rgba(217,119,6,.30)}
          /* Grids */
          .aad-g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
          .aad-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .aad-g2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
          /* Icon badge */
          .aad-nbadge{width:40px;height:40px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:16px;box-shadow:0 4px 12px rgba(15,52,96,0.25);flex-shrink:0}
          .aad-card-h{font-size:16px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .aad-card-p{font-size:13px;color:#4A6080;line-height:1.65}
          .aad-step-num{font-family:'Courier New',ui-monospace,monospace;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#6b7280;margin-bottom:12px}
          /* Tech stack */
          .aad-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:8px}
          .aad-stack-card{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:24px 20px;box-shadow:0 4px 24px rgba(15,52,96,.06),inset 0 1px 0 rgba(255,255,255,.95)}
          .aad-stack-cat{font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#D97706;margin-bottom:14px}
          .aad-stack-pills{display:flex;flex-wrap:wrap;gap:7px}
          .aad-stack-pill{background:rgba(15,52,96,.07);border:1px solid rgba(15,52,96,.12);border-radius:100px;padding:4px 10px;font-size:12px;font-weight:600;color:#0F3460}
          /* Use cases */
          .aad-uc-list{display:flex;flex-direction:column;gap:8px;margin-top:14px;padding:0;list-style:none}
          .aad-uc-list li{font-size:13px;color:#4A6080;padding-left:18px;position:relative;line-height:1.5}
          .aad-uc-list li::before{content:'';position:absolute;left:0;top:7px;width:6px;height:6px;border-radius:50%;background:#D97706}
          /* FAQ */
          .aad-flist{display:flex;flex-direction:column;gap:10px;margin-top:40px}
          .aad-fitem{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06),inset 0 1px 0 rgba(255,255,255,.95);transition:border-color .2s}
          .aad-fitem.aad-open{border-color:rgba(217,119,6,.35)}
          .aad-fitem.aad-open::before{content:'';display:block;height:3px;background:#D97706;border-radius:3px 3px 0 0}
          .aad-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .aad-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .aad-fitem.aad-open .aad-fq-badge{background:#D97706;color:#fff}
          .aad-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .aad-fitem.aad-open .aad-fq-text{color:#B45309}
          .aad-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .aad-fitem.aad-open .aad-fchev{transform:rotate(180deg);color:#D97706}
          .aad-fanswer-wrap{overflow:hidden;max-height:0;transition:max-height .35s ease}
          .aad-fitem.aad-open .aad-fanswer-wrap{max-height:600px}
          .aad-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          /* Related cards */
          .aad-rel-card{display:block;text-decoration:none}.aad-rel-card .aad-glass{height:100%}
          .aad-rel-card:hover .aad-card-h{color:#D97706}
          /* Form */
          .aad-form-sec{padding:80px 40px;position:relative;z-index:1}
          .aad-form-card{background:rgba(255,255,255,0.70);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.90);border-radius:28px;padding:52px 48px;box-shadow:0 8px 48px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1);max-width:720px;margin:0 auto}
          .aad-field{display:flex;flex-direction:column;gap:7px;margin-bottom:20px}
          .aad-label{font-size:13px;font-weight:600;color:#374151}
          .aad-input{padding:12px 16px;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,.15);border-radius:12px;font-size:14px;color:#0F1F40;font-family:inherit;transition:border-color .2s,box-shadow .2s;outline:none}
          .aad-input:focus{border-color:#D97706;box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .aad-textarea{padding:12px 16px;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,.15);border-radius:12px;font-size:14px;color:#0F1F40;font-family:inherit;resize:vertical;min-height:120px;transition:border-color .2s,box-shadow .2s;outline:none}
          .aad-textarea:focus{border-color:#D97706;box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .aad-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
          .aad-submit{width:100%;margin-top:8px;padding:15px 32px;background:rgba(15,52,96,0.88);color:#fff;border:none;border-radius:50px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,.22);display:flex;align-items:center;justify-content:center;gap:8px}
          .aad-submit:hover:not(:disabled){background:rgba(15,52,96,1);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,.28)}
          .aad-submit:disabled{opacity:.65;cursor:not-allowed}
          .aad-success{display:flex;flex-direction:column;align-items:center;gap:16px;padding:24px;text-align:center}
          .aad-success-icon{width:60px;height:60px;background:rgba(34,197,94,.12);border-radius:50%;display:flex;align-items:center;justify-content:center}
          /* CTA */
          .aad-cta-sec{padding:80px 40px;background:linear-gradient(135deg,rgba(254,243,199,.70) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1;text-align:center}
          .aad-cta-h{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:14px}
          .aad-cta-p{font-size:15px;color:#4A6080;line-height:1.7;max-width:580px;margin:0 auto 32px}
          /* Responsive */
          @media(max-width:1024px){.aad-g4{grid-template-columns:repeat(2,1fr)}.aad-g3{grid-template-columns:repeat(2,1fr)}.aad-stack-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){
            .aad-bc{padding:12px 20px 0}
            .aad-hero{padding:56px 24px 0}
            .aad-sec,.aad-form-sec,.aad-cta-sec{padding:52px 20px}
            .aad-stats{grid-template-columns:repeat(2,1fr)}
            .aad-stat:nth-child(2){border-right:none}
            .aad-stat:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}
            .aad-stat:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}
            .aad-glass,.aad-fitem,.aad-form-card,.aad-stack-card{backdrop-filter:none;-webkit-backdrop-filter:none}
            .aad-g4,.aad-g3,.aad-g2,.aad-stack-grid{grid-template-columns:1fr}
            .aad-fq{padding:18px 18px 18px 52px}
            .aad-fanswer{padding:0 18px 18px 52px}
            .aad-fq-badge{left:12px}
            .aad-form-card{padding:32px 24px}
            .aad-form-row{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <div className="aad-page">
        <div className="aad-orb aad-orb1"/><div className="aad-orb aad-orb2"/><div className="aad-orb aad-orb3"/>

        {/* ── BREADCRUMB ── */}
        <nav className="aad-bc" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span className="aad-bc-sep">/</span>
          <Link href="/artificial-intelligence/">Artificial Intelligence</Link><span className="aad-bc-sep">/</span>
          <span style={{color:'#D97706'}}>AI Agent Development Services</span>
        </nav>

        {/* ── HERO ── */}
        <section className="aad-hero">
          <div className="aad-hero-inner">
            <span className="aad-eyebrow">AI Agents · LangGraph · AutoGen · GPT-4o · Claude · Gemini</span>
            <h1 className="aad-h1">AI Agent Development Services<br/>Built for <AuroraText>Production, Not Demos</AuroraText></h1>
            <p className="aad-hero-sub">We design, build, and deploy custom AI agents — conversational agents, autonomous task agents, RAG knowledge systems, and multi-agent pipelines — that work reliably in the real world, not just in a sandbox.</p>
            <div className="aad-btns">
              <a href="#contact-form" className="aad-btn-p">
                Discuss Your Agent Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <Link href="/artificial-intelligence/" className="aad-btn-s">All AI Services</Link>
            </div>
            <div className="aad-stats">
              {STATS.map(s => (
                <div key={s.label} className="aad-stat">
                  <div className="aad-stat-v">{s.val}</div>
                  <div className="aad-stat-l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AGENT TYPES ── */}
        <section className="aad-sec" id="services">
          <div className="aad-in">
            <div className="aad-reveal">
              <span className="aad-ey">What We Build</span>
              <h2 className="aad-h2">Eight Types of <AuroraText>AI Agents We Develop</AuroraText></h2>
              <p className="aad-lead">From single-purpose conversational agents to complex multi-agent orchestration systems — built on the frameworks and models best suited to your use case.</p>
            </div>
            <div className="aad-g4">
              {AGENTS.map((a, i) => (
                <div key={a.n} className="aad-glass aad-reveal" style={{transitionDelay:`${i*55}ms`}}>
                  <div className="aad-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={a.icon}/></svg>
                  </div>
                  <div className="aad-step-num">{a.n}</div>
                  <div className="aad-card-h">{a.title}</div>
                  <p className="aad-card-p">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="aad-sec aad-white" id="tech-stack">
          <div className="aad-in">
            <div className="aad-reveal">
              <span className="aad-ey">Technology</span>
              <h2 className="aad-h2">Our AI Agent <AuroraText>Technology Stack</AuroraText></h2>
              <p className="aad-lead">We are framework- and model-agnostic — we pick the right tools for each project, not the ones we happen to favour.</p>
            </div>
            <div className="aad-stack-grid aad-reveal">
              {STACK.map((s, i) => (
                <div key={s.category} className="aad-stack-card" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="aad-stack-cat">{s.category}</div>
                  <div className="aad-stack-pills">
                    {s.items.map(item => <span key={item} className="aad-stack-pill">{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="aad-sec" id="process">
          <div className="aad-in">
            <div className="aad-reveal">
              <span className="aad-ey">How We Work</span>
              <h2 className="aad-h2">Our AI Agent <AuroraText>Development Process</AuroraText></h2>
              <p className="aad-lead">From scoping to production monitoring — a structured process that reduces rework and gets reliable agents into the hands of real users faster.</p>
            </div>
            <div className="aad-g3">
              {PROCESS.map((p, i) => (
                <div key={p.n} className="aad-glass aad-reveal" style={{transitionDelay:`${i*70}ms`}}>
                  <div className="aad-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon}/></svg>
                  </div>
                  <div className="aad-step-num">{p.n}</div>
                  <div className="aad-card-h">{p.title}</div>
                  <p className="aad-card-p">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY 1SOLUTIONS ── */}
        <section className="aad-sec aad-white" id="why-us">
          <div className="aad-in">
            <div className="aad-reveal">
              <span className="aad-ey">Why 1Solutions</span>
              <h2 className="aad-h2">AI Agents That <AuroraText>Actually Work in Production</AuroraText></h2>
              <p className="aad-lead">We have been building production AI systems since before agentic AI was a mainstream term. Here is what that experience means for your project.</p>
            </div>
            <div className="aad-g3">
              {WHY.map((w, i) => (
                <div key={w.title} className="aad-glass aad-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="aad-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <div className="aad-card-h">{w.title}</div>
                  <p className="aad-card-p">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── USE CASES BY INDUSTRY ── */}
        <section className="aad-sec" id="industries">
          <div className="aad-in">
            <div className="aad-reveal">
              <span className="aad-ey">Industry Applications</span>
              <h2 className="aad-h2">AI Agents Across <AuroraText>Every Industry</AuroraText></h2>
              <p className="aad-lead">We build AI agents for eCommerce, SaaS, healthcare, and finance teams — with the domain context that makes the difference between a generic agent and one that works for your users.</p>
            </div>
            <div className="aad-g2" style={{maxWidth:960,margin:'0 auto'}}>
              {USE_CASES.map((uc, i) => (
                <div key={uc.title} className="aad-glass aad-reveal" style={{transitionDelay:`${i*70}ms`}}>
                  <div className="aad-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={uc.icon}/></svg>
                  </div>
                  <div className="aad-card-h">{uc.title}</div>
                  <ul className="aad-uc-list">
                    {uc.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="aad-sec aad-white" id="faq">
          <div className="aad-in" style={{maxWidth:900}}>
            <div className="aad-reveal">
              <span className="aad-ey">Common Questions</span>
              <h2 className="aad-h2">AI Agent Development <AuroraText>FAQs</AuroraText></h2>
              <p className="aad-lead">Answers to the questions we hear most often before a project starts.</p>
            </div>
            <div className="aad-flist">
              {FAQS.map((f, i) => (
                <div key={i} className={`aad-fitem${openFaq === i ? ' aad-open' : ''}`}>
                  <button className="aad-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="aad-fq-badge">{String(i + 1).padStart(2, '0')}</span>
                    <span className="aad-fq-text">{f.q}</span>
                    <svg className="aad-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <div className="aad-fanswer-wrap">
                    <div className="aad-fanswer">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="aad-sec" id="related">
          <div className="aad-in">
            <div className="aad-reveal">
              <span className="aad-ey">Keep Exploring</span>
              <h2 className="aad-h2">Related <AuroraText>AI & Digital Services</AuroraText></h2>
              <p className="aad-lead">AI agent development works best alongside complementary services. Explore what pairs naturally with your agent project.</p>
            </div>
            <div className="aad-g3">
              {RELATED.map((r, i) => (
                <Link key={r.href} href={r.href} className="aad-rel-card aad-reveal" style={{transitionDelay:`${i*70}ms`}}>
                  <div className="aad-glass">
                    <div className="aad-nbadge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={r.icon}/></svg>
                    </div>
                    <div className="aad-card-h">{r.title}</div>
                    <p className="aad-card-p">{r.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="aad-form-sec" id="contact-form">
          <div className="aad-in">
            <div className="aad-reveal" style={{textAlign:'center',maxWidth:640,margin:'0 auto 40px'}}>
              <span className="aad-ey">Let&rsquo;s Build Something</span>
              <h2 className="aad-h2">Start Your <AuroraText>AI Agent Project</AuroraText></h2>
              <p className="aad-lead" style={{marginBottom:0}}>Tell us what you want to automate or augment — we&rsquo;ll scope the right agent architecture and share a realistic estimate within 48 hours.</p>
            </div>
            <div className="aad-form-card aad-reveal">
              {formState === 'success' ? (
                <div className="aad-success">
                  <div className="aad-success-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 style={{fontSize:20,fontWeight:800,color:'#0F1F40',margin:0}}>Message received — thank you!</h3>
                  <p style={{fontSize:14,color:'#4A6080',margin:0,maxWidth:420}}>We&rsquo;ll review your requirements and come back with an initial scope and estimate within two business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="aad-form-row">
                    <div className="aad-field">
                      <label className="aad-label" htmlFor="aad-name">Full Name *</label>
                      <input id="aad-name" className="aad-input" type="text" required placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} />
                    </div>
                    <div className="aad-field">
                      <label className="aad-label" htmlFor="aad-email">Email Address *</label>
                      <input id="aad-email" className="aad-input" type="email" required placeholder="jane@company.com" value={form.email} onChange={e => setForm(f => ({...f, email:e.target.value}))} />
                    </div>
                  </div>
                  <div className="aad-field">
                    <label className="aad-label" htmlFor="aad-website">Company / Website</label>
                    <input id="aad-website" className="aad-input" type="text" placeholder="Acme Inc. or https://yoursite.com" value={form.website} onChange={e => setForm(f => ({...f, website:e.target.value}))} />
                  </div>
                  <div className="aad-field">
                    <label className="aad-label" htmlFor="aad-message">Describe your project *</label>
                    <textarea id="aad-message" className="aad-textarea" required placeholder="What do you want the agent to do? What systems should it connect to? What problem are you solving?..." value={form.message} onChange={e => setForm(f => ({...f, message:e.target.value}))} />
                  </div>
                  {formState === 'error' && <p style={{fontSize:13,color:'#dc2626',marginBottom:12}}>{formError||'Something went wrong. Please try again.'}</p>}
                  <button type="submit" className="aad-submit" disabled={formState === 'sending'}>
                    {formState === 'sending' ? 'Sending…' : (
                      <>Send Project Brief <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                    )}
                  </button>
                  <p style={{fontSize:12,color:'#9ca3af',textAlign:'center',marginTop:14}}>We respond within two business days. No spam, ever.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA BOTTOM ── */}
        <section className="aad-cta-sec">
          <div className="aad-in">
            <div className="aad-reveal">
              <span className="aad-ey" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Build?</span>
              <h2 className="aad-cta-h">Let&rsquo;s Build an AI Agent That <AuroraText>Runs in Production</AuroraText></h2>
              <p className="aad-cta-p">From a focused single-purpose agent to a full multi-agent system — we scope, build, and ship AI that works in the real world.</p>
              <div className="aad-btns">
                <a href="#contact-form" className="aad-btn-p">
                  Start the Conversation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <Link href="/artificial-intelligence/" className="aad-btn-s">All AI Services</Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
