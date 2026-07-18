'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function AuroraText({ children }) {
  return (
    <span style={{background:'linear-gradient(135deg,#f43f5e,#ec4899,#a855f7,#8b5cf6,#3b82f6,#06b6d4)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',backgroundSize:'200% auto',animation:'acd-aurora 4s linear infinite'}}>{children}</span>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────── */
const STATS = [
  { label:'Chatbots Deployed',    val:'200+' },
  { label:'Avg Response Accuracy', val:'94%' },
  { label:'Industries Served',    val:'20+'  },
  { label:'Years AI Experience',  val:'5+'   },
];

const CHATBOTS = [
  { n:'01', icon:'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', title:'Customer Support Chatbots', desc:'24/7 first-line support that resolves common issues, handles tickets, processes returns, and escalates to human agents — with full context — when it hits its limit.' },
  { n:'02', icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Sales & Lead Generation Chatbots', desc:'Qualify inbound leads 24/7, answer product questions, personalise responses based on user behaviour, and book demos directly into your sales team\'s calendar.' },
  { n:'03', icon:'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title:'eCommerce Chatbots', desc:'Product discovery, order tracking, returns initiation, cart recovery, and personalised recommendations — reducing support load while increasing conversion on your store.' },
  { n:'04', icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1', title:'Internal IT & HR Helpdesk Bots', desc:'Employee-facing bots for IT troubleshooting, HR policy lookups, onboarding guides, leave requests, and expense queries — reducing internal support tickets by up to 60%.' },
  { n:'05', icon:'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title:'Appointment Booking Chatbots', desc:'Conversational scheduling for consultations, demos, clinic appointments, and service calls — with real-time calendar availability checks and confirmation notifications.' },
  { n:'06', icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title:'RAG Knowledge Base Chatbots', desc:'Answer questions from your documentation, PDFs, product manuals, and policies using Retrieval-Augmented Generation — always accurate, always cited, always up to date.' },
  { n:'07', icon:'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', title:'WhatsApp & Messaging Chatbots', desc:'Native chatbots for WhatsApp Business, Facebook Messenger, Telegram, Slack, and Microsoft Teams — meeting your customers on the platforms they already use every day.' },
  { n:'08', icon:'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title:'Voice Chatbots', desc:'Voice-enabled conversation for IVR replacement, phone-based customer support, and appointment management — integrated with Twilio, Vonage, or your existing telephony infrastructure.' },
];

const PLATFORMS = ['Website Widget','WhatsApp Business','Facebook Messenger','Slack','Microsoft Teams','Telegram','SMS / MMS','iOS & Android Apps','REST API'];

const PROCESS = [
  { n:'01', icon:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title:'Discovery & Intent Mapping', desc:'Define the chatbot\'s goals, map the most common user intents, identify integrations required, and agree on escalation triggers and success metrics before any development begins.' },
  { n:'02', icon:'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title:'Conversation Design', desc:'Design conversation flows, fallback handling, tone of voice, and persona. We design for real user behaviour — including the unexpected inputs that break rule-based bots.' },
  { n:'03', icon:'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title:'Development & Integration', desc:'Build the chatbot on your chosen LLM, connect to your CRM, helpdesk, knowledge base, calendar, or database. Implement RAG pipelines where knowledge accuracy matters.' },
  { n:'04', icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'Training & Testing', desc:'Test across hundreds of real user scenarios, measure accuracy and hallucination rate, refine prompts and retrieval, and validate human handoff triggers before going live.' },
  { n:'05', icon:'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', title:'Deployment', desc:'Deploy to your website, app, or messaging platform with monitoring, logging, and cost controls live from day one. We handle both widget integration and API-based deployments.' },
  { n:'06', icon:'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title:'Continuous Improvement', desc:'Post-launch review of unresolved queries, user drop-off points, and misidentified intents. Regular updates keep accuracy high as your product, policies, and users evolve.' },
];

const WHY = [
  { icon:'M13 10V3L4 14h7v7l9-11h-7z', title:'LLM-Powered, Not Rule-Based', desc:'Our chatbots understand natural language variations, context across a conversation, and implicit intent — not just exact keyword matches. They handle how real users actually type.' },
  { icon:'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title:'Deep CRM & Helpdesk Integration', desc:'Salesforce, HubSpot, Zendesk, Freshdesk, Intercom, and custom APIs — chatbots that read and write to your existing systems rather than operating in isolation.' },
  { icon:'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', title:'Human Handoff Done Right', desc:'Smooth escalation to live agents with full conversation context transferred — no repeating themselves. We configure escalation triggers based on sentiment, complexity, and user request.' },
  { icon:'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', title:'Multi-Language Support', desc:'Chatbots that detect and respond in 50+ languages out of the box — without separate training per language. Ideal for global products and multilingual customer bases.' },
  { icon:'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title:'Compliance & Data Security', desc:'GDPR-compliant by design. PII redaction in logs, data residency controls, and audit trails. Healthcare, finance, and legal clients get sector-specific compliance architecture from the start.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Measurable Outcomes', desc:'We track containment rate, CSAT, resolution time, and ticket deflection — not just conversation volume. Every chatbot we build is tied to a business metric, not just a deployment count.' },
];

const VS = {
  chatbot: {
    label: 'AI Chatbot',
    color: '#3b82f6',
    when: [
      'You need 24/7 first-line customer support',
      'Users ask predictable, recurring questions',
      'Goal is deflecting tickets or qualifying leads',
      'Faster time-to-value is a priority',
      'Budget is fixed and scope is well-defined',
    ],
  },
  agent: {
    label: 'AI Agent',
    color: '#D97706',
    when: [
      'Tasks require multi-step autonomous decision-making',
      'The bot needs to take actions across multiple systems',
      'Workflows are complex and vary case by case',
      'You need research, analysis, or content creation',
      'The end goal changes dynamically mid-task',
    ],
  },
};

const USE_CASES = [
  { icon:'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', title:'eCommerce', items:['Order tracking & returns chatbots','Product recommendation bots','Cart recovery conversations','Post-purchase support automation'] },
  { icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1', title:'SaaS & Tech', items:['In-app onboarding assistants','Feature discovery & help bots','Support ticket deflection','Trial conversion chat flows'] },
  { icon:'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title:'Healthcare', items:['Patient FAQ & symptom triage','Appointment booking bots','Insurance & billing queries','Post-visit follow-up automation'] },
  { icon:'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title:'Finance & Legal', items:['Account & product FAQ bots','Loan eligibility pre-qualification','Document upload guidance','Client intake chatbots'] },
];

const FAQS = [
  { q:'What is the difference between an AI chatbot and a rule-based chatbot?', a:'A rule-based chatbot follows decision trees and keyword triggers — it only understands inputs it was explicitly programmed to handle, and fails on anything outside that list. An AI chatbot powered by an LLM (GPT-4o, Claude, Gemini) understands natural language in all its variations, interprets context across a conversation, handles unexpected phrasing, and generates relevant responses it was never specifically trained for. AI chatbots have dramatically higher containment rates for real-world user queries.' },
  { q:'How long does it take to build and deploy an AI chatbot?', a:'A focused single-channel chatbot (website widget or WhatsApp) with one or two integrations typically takes 3 to 6 weeks from scoping to live deployment. Multi-channel chatbots with RAG knowledge bases and CRM integrations typically take 6 to 10 weeks. We deliver a working prototype in the first two weeks so you can see and validate the core experience before full build-out.' },
  { q:'Can the chatbot integrate with our CRM and helpdesk?', a:'Yes. CRM and helpdesk integration is one of the most common — and highest-value — parts of a chatbot build. We integrate with Salesforce, HubSpot, Zoho, Zendesk, Freshdesk, Intercom, ServiceNow, and custom internal systems via API. The chatbot can read customer records, create tickets, update fields, and trigger workflows in your existing tools without any manual handoff.' },
  { q:'How does human handoff work?', a:'Human handoff is triggered by configurable conditions: the user explicitly asks for a human, sentiment analysis detects frustration, the chatbot confidence score falls below a threshold, or specific topic types are flagged (complaints, escalations, complex requests). When handoff triggers, the full conversation transcript is transferred to your live agent tool — Zendesk, Intercom, Freshchat, or any other — so the user never has to repeat themselves.' },
  { q:'What languages does the chatbot support?', a:'Modern LLMs support 50+ languages natively without separate training per language. The chatbot detects the language the user is writing in and responds accordingly. For business-critical languages (your primary markets), we validate accuracy specifically during testing. Multilingual support is included by default — not an add-on — for all chatbots we build.' },
  { q:'What does AI chatbot development cost?', a:'A focused single-purpose chatbot (support FAQ, lead qualification, appointment booking) built on an existing LLM typically starts from $5,000 to $12,000 USD depending on integration complexity. Multi-channel deployments with RAG knowledge bases, CRM integrations, and custom conversation flows range from $15,000 to $40,000+. Voice chatbots and enterprise-grade deployments are scoped individually. We provide a detailed estimate after a free discovery call.' },
  { q:'How accurate will the chatbot be on our specific content?', a:'Accuracy depends on the quality of your knowledge base and the specificity of user queries. For well-documented domains (product FAQs, policy documents, technical guides), RAG-powered chatbots consistently achieve 90–95%+ accuracy on in-scope questions. For out-of-scope questions, the chatbot is designed to acknowledge its limits and offer human handoff rather than hallucinate an answer. We measure and report accuracy during the testing phase before launch.' },
  { q:'Do you build chatbots for WhatsApp and other messaging apps?', a:'Yes. We build chatbots for WhatsApp Business API, Facebook Messenger, Telegram, Slack, Microsoft Teams, and SMS — in addition to website widgets and in-app deployments. WhatsApp is particularly high-value for businesses with customers in India, Southeast Asia, Latin America, and the Middle East, where it is the primary communication channel. We handle the WhatsApp Business API setup and verification process as part of the engagement.' },
];

const RELATED = [
  { icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', title:'AI Agent Development', href:'/ai-agent-development-services', desc:'For complex multi-step tasks that go beyond conversation — autonomous agents that plan, decide, and act across your systems.' },
  { icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1', title:'Artificial Intelligence Services', href:'/artificial-intelligence', desc:'Custom ML models, NLP, computer vision, generative AI integration, and predictive analytics — the full spectrum of AI development.' },
  { icon:'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', title:'Answer Engine Optimisation', href:'/answer-engine-optimization-services', desc:'Get your brand cited in AI-generated answers. Content optimised for Google AI Overviews, Perplexity, and ChatGPT Search.' },
  { icon:'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', title:'Hire an AI Developer', href:'/hire-ai-developer', desc:'Dedicated AI developers on a flexible engagement model — for teams that need to extend capacity on specific chatbot or AI projects.' },
  { icon:'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z', title:'eCommerce Development', href:'/ecommerce-website-development-services', desc:'Custom eCommerce platforms built for chatbot integration — Shopify, WooCommerce, and headless commerce with first-party chat support.' },
  { icon:'M13 10V3L4 14h7v7l9-11h-7z', title:'Digital Transformation', href:'/digital-transformation', desc:'Chatbots are one piece of the puzzle. We help organisations digitise customer interactions, internal operations, and service delivery end to end.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'Home',                   item:'https://www.1solutions.biz/'                                              },
        { '@type':'ListItem', position:2, name:'Artificial Intelligence',item:'https://www.1solutions.biz/artificial-intelligence/'                      },
        { '@type':'ListItem', position:3, name:'AI Chatbot Development Services', item:'https://www.1solutions.biz/ai-chatbot-development-services/'     },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.1solutions.biz/ai-chatbot-development-services/',
      url: 'https://www.1solutions.biz/ai-chatbot-development-services/',
      name: 'AI Chatbot Development Services | Custom Chatbots for Business | 1Solutions',
      description: 'Custom AI chatbot development for customer support, sales, eCommerce, and internal helpdesks. GPT-4o, Claude, RAG, CRM integrations, WhatsApp & multi-channel. 200+ chatbots deployed.',
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
      aggregateRating: { '@type':'AggregateRating', ratingValue:'4.9', reviewCount:'112', bestRating:'5' },
    },
    {
      '@type': 'ProfessionalService',
      name: 'AI Chatbot Development Services',
      serviceType: 'AI Chatbot Development',
      url: 'https://www.1solutions.biz/ai-chatbot-development-services/',
      description: 'Custom AI chatbots for customer support, sales, eCommerce, internal helpdesks, and knowledge bases. GPT-4o, Claude, Gemini. WhatsApp, Messenger, Slack, Teams, and website widget deployments.',
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
      name: 'How We Build AI Chatbots',
      step: PROCESS.map((p, i) => ({ '@type':'HowToStep', position:i + 1, name:p.title, text:p.desc })),
    },
  ],
};

const RC_KEY = '6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';

export default function AIChatbotDevelopmentServices() {
  const [openFaq, setOpenFaq]     = useState(0);
  const [form, setForm]           = useState({ name:'', email:'', website:'', message:'' });
  const [formState, setFormState] = useState('idle');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const els = document.querySelectorAll('.acd-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('acd-vis'); obs.unobserve(e.target); } });
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
        window.grecaptcha.ready(() => window.grecaptcha.execute(RC_KEY, { action:'acd_contact' }).then(resolve))
      );
      const res = await fetch('/api/contact', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name:form.name, email:form.email, company:form.website, service:'AI Chatbot Development', message:form.message, consent:true, source:'AI Chatbot Development Page', recaptchaToken }),
      });
      if (!res.ok) { const d = await res.json().catch(()=>({})); throw new Error(d.message||'Submission failed.'); }
      setFormState('success');
    } catch(err) { setFormState('error'); setFormError(err.message); }
  }

  return (
    <>
      <Head>
        <title>AI Chatbot Development Services | Custom Chatbots for Business | 1Solutions</title>
        <meta name="description" content="Custom AI chatbot development for customer support, sales, eCommerce & internal helpdesks. GPT-4o, Claude, RAG pipelines, CRM integrations, WhatsApp & multi-channel. 200+ chatbots deployed." />
        <link rel="canonical" href="https://www.1solutions.biz/ai-chatbot-development-services/" />
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content="AI Chatbot Development Services | 1Solutions" />
        <meta property="og:description" content="Custom AI chatbots for customer support, sales & eCommerce. GPT-4o, Claude, RAG, CRM integrations, WhatsApp & multi-channel. 200+ chatbots deployed." />
        <meta property="og:url"         content="https://www.1solutions.biz/ai-chatbot-development-services/" />
        <meta property="og:image"       content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <meta name="twitter:card"       content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          @keyframes acd-aurora{0%{background-position:0% center}100%{background-position:200% center}}
          .acd-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .acd-page *,.acd-page *::before,.acd-page *::after{box-sizing:border-box}
          .acd-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .acd-orb1{width:900px;height:900px;background:radial-gradient(circle,rgba(99,130,255,.35) 0%,rgba(139,92,246,.15) 40%,transparent 70%);top:-300px;right:-300px}
          .acd-orb2{width:800px;height:800px;background:radial-gradient(circle,rgba(251,146,60,.30) 0%,rgba(245,158,11,.15) 40%,transparent 70%);bottom:0;left:-250px}
          .acd-orb3{width:600px;height:600px;background:radial-gradient(circle,rgba(20,184,166,.20) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%)}
          .acd-reveal{opacity:0;transform:translateY(28px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .acd-reveal.acd-vis{opacity:1;transform:translateY(0)}.acd-bc a:hover{color:#D97706}.acd-bc-sep{color:#d1d5db}
          .acd-hero{position:relative;z-index:1;padding:72px 40px 0}
          .acd-hero-inner{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto}
          .acd-eyebrow{font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;display:block;margin-bottom:18px}
          .acd-h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:18px;color:#0F1F40}
          .acd-hero-sub{font-size:16px;color:#3A507A;line-height:1.65;max-width:700px;margin:0 auto 28px}
          .acd-btns{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:32px}
          .acd-btn-p{position:relative;display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);border-radius:50px;color:#fff;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .acd-btn-p:hover{background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,0.30)}
          .acd-btn-s{display:inline-flex;align-items:center;padding:14px 32px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .acd-btn-s:hover{background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}
          .acd-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95)}
          .acd-stat{padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}.acd-stat:last-child{border-right:none}
          .acd-stat-v{font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1;margin-bottom:6px}
          .acd-stat-l{font-size:12px;color:#4A6080;font-weight:500}
          .acd-sec{padding:80px 40px;position:relative;z-index:1}
          .acd-white{background:#fff}
          .acd-in{max-width:1280px;margin:0 auto}
          .acd-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .acd-h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:12px}
          .acd-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}
          .acd-glass{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s,border-color .22s}
          .acd-glass:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(15,52,96,.12);border-color:rgba(217,119,6,.30)}
          .acd-g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
          .acd-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
          .acd-g2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
          .acd-nbadge{width:40px;height:40px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;margin-bottom:16px;box-shadow:0 4px 12px rgba(15,52,96,0.25);flex-shrink:0}
          .acd-card-h{font-size:16px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .acd-card-p{font-size:13px;color:#4A6080;line-height:1.65}
          .acd-step-num{font-family:'Courier New',ui-monospace,monospace;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#6b7280;margin-bottom:12px}
          /* Platforms strip */
          .acd-plat-sec{background:linear-gradient(135deg,#0F1F40 0%,#1a3a6b 100%);padding:52px 40px;position:relative;z-index:1;text-align:center}
          .acd-plat-h{font-size:clamp(1.2rem,2.5vw,1.6rem);font-weight:800;color:#fff;margin-bottom:24px}
          .acd-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .acd-pill{background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.22);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff;letter-spacing:.02em}
          /* VS section */
          .acd-vs-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:8px}
          .acd-vs-card{border-radius:22px;padding:32px 28px;position:relative;overflow:hidden}
          .acd-vs-chatbot{background:linear-gradient(135deg,rgba(59,130,246,.08) 0%,rgba(255,255,255,.85) 60%,rgba(219,234,254,.50) 100%);border:2px solid rgba(59,130,246,.25);box-shadow:0 4px 24px rgba(59,130,246,.08)}
          .acd-vs-agent{background:linear-gradient(135deg,rgba(217,119,6,.08) 0%,rgba(255,255,255,.85) 60%,rgba(254,243,199,.50) 100%);border:2px solid rgba(217,119,6,.25);box-shadow:0 4px 24px rgba(217,119,6,.08)}
          .acd-vs-label{font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:8px}
          .acd-vs-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
          .acd-vs-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
          .acd-vs-list li{font-size:14px;color:#374151;padding-left:22px;position:relative;line-height:1.5}
          .acd-vs-list li::before{content:'✓';position:absolute;left:0;font-weight:700;font-size:13px}
          .acd-vs-chatbot .acd-vs-list li::before{color:#3b82f6}
          .acd-vs-agent .acd-vs-list li::before{color:#D97706}
          .acd-vs-cta{margin-top:24px;text-align:center;padding:20px;background:rgba(15,52,96,.04);border-radius:14px;border:1px dashed rgba(15,52,96,.15)}
          /* Use case list */
          .acd-uc-list{display:flex;flex-direction:column;gap:8px;margin-top:14px;padding:0;list-style:none}
          .acd-uc-list li{font-size:13px;color:#4A6080;padding-left:18px;position:relative;line-height:1.5}
          .acd-uc-list li::before{content:'';position:absolute;left:0;top:7px;width:6px;height:6px;border-radius:50%;background:#D97706}
          /* FAQ */
          .acd-flist{display:flex;flex-direction:column;gap:10px;margin-top:40px}
          .acd-fitem{background:linear-gradient(135deg,rgba(219,234,254,.55) 0%,rgba(255,255,255,.80) 60%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06),inset 0 1px 0 rgba(255,255,255,.95);transition:border-color .2s}
          .acd-fitem.acd-open{border-color:rgba(217,119,6,.35)}
          .acd-fitem.acd-open::before{content:'';display:block;height:3px;background:#D97706;border-radius:3px 3px 0 0}
          .acd-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .acd-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .acd-fitem.acd-open .acd-fq-badge{background:#D97706;color:#fff}
          .acd-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .acd-fitem.acd-open .acd-fq-text{color:#B45309}
          .acd-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .acd-fitem.acd-open .acd-fchev{transform:rotate(180deg);color:#D97706}
          .acd-fanswer-wrap{overflow:hidden;max-height:0;transition:max-height .35s ease}
          .acd-fitem.acd-open .acd-fanswer-wrap{max-height:600px}
          .acd-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          /* Related */
          .acd-rel-card{display:block;text-decoration:none}.acd-rel-card .acd-glass{height:100%}
          .acd-rel-card:hover .acd-card-h{color:#D97706}
          /* Form */
          .acd-form-sec{padding:80px 40px;position:relative;z-index:1}
          .acd-form-card{background:rgba(255,255,255,0.70);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.90);border-radius:28px;padding:52px 48px;box-shadow:0 8px 48px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1);max-width:720px;margin:0 auto}
          .acd-field{display:flex;flex-direction:column;gap:7px;margin-bottom:20px}
          .acd-label{font-size:13px;font-weight:600;color:#374151}
          .acd-input{padding:12px 16px;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,.15);border-radius:12px;font-size:14px;color:#0F1F40;font-family:inherit;transition:border-color .2s,box-shadow .2s;outline:none}
          .acd-input:focus{border-color:#D97706;box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .acd-textarea{padding:12px 16px;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,.15);border-radius:12px;font-size:14px;color:#0F1F40;font-family:inherit;resize:vertical;min-height:120px;transition:border-color .2s,box-shadow .2s;outline:none}
          .acd-textarea:focus{border-color:#D97706;box-shadow:0 0 0 3px rgba(217,119,6,.12)}
          .acd-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
          .acd-submit{width:100%;margin-top:8px;padding:15px 32px;background:rgba(15,52,96,0.88);color:#fff;border:none;border-radius:50px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,.22);display:flex;align-items:center;justify-content:center;gap:8px}
          .acd-submit:hover:not(:disabled){background:rgba(15,52,96,1);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,.28)}
          .acd-submit:disabled{opacity:.65;cursor:not-allowed}
          .acd-success{display:flex;flex-direction:column;align-items:center;gap:16px;padding:24px;text-align:center}
          .acd-success-icon{width:60px;height:60px;background:rgba(34,197,94,.12);border-radius:50%;display:flex;align-items:center;justify-content:center}
          .acd-cta-sec{padding:80px 40px;background:linear-gradient(135deg,rgba(254,243,199,.70) 0%,rgba(255,255,255,.60) 40%,rgba(219,234,254,.65) 100%);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1;text-align:center}
          .acd-cta-h{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:14px}
          .acd-cta-p{font-size:15px;color:#4A6080;line-height:1.7;max-width:580px;margin:0 auto 32px}
          @media(max-width:1024px){.acd-g4{grid-template-columns:repeat(2,1fr)}.acd-g3{grid-template-columns:repeat(2,1fr)}.acd-vs-grid{grid-template-columns:1fr}}
          @media(max-width:768px){
            .acd-hero{padding:56px 24px 0}
            .acd-sec,.acd-form-sec,.acd-cta-sec,.acd-plat-sec{padding:52px 20px}
            .acd-stats{grid-template-columns:repeat(2,1fr)}
            .acd-stat:nth-child(2){border-right:none}
            .acd-stat:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}
            .acd-stat:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}
            .acd-glass,.acd-fitem,.acd-form-card{backdrop-filter:none;-webkit-backdrop-filter:none}
            .acd-g4,.acd-g3,.acd-g2{grid-template-columns:1fr}
            .acd-fq{padding:18px 18px 18px 52px}
            .acd-fanswer{padding:0 18px 18px 52px}
            .acd-fq-badge{left:12px}
            .acd-form-card{padding:32px 24px}
            .acd-form-row{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <div className="acd-page">
        <div className="acd-orb acd-orb1"/><div className="acd-orb acd-orb2"/><div className="acd-orb acd-orb3"/>

        {/* ── HERO ── */}
        <section className="acd-hero">
          <div className="acd-hero-inner">
            <span className="acd-eyebrow">AI Chatbots · GPT-4o · Claude · RAG · CRM Integrations · WhatsApp</span>
            <h1 className="acd-h1">AI Chatbot Development Services<br/>for <AuroraText>Support, Sales & Beyond</AuroraText></h1>
            <p className="acd-hero-sub">We build custom AI chatbots that understand natural language, integrate with your existing tools, and resolve real customer queries — not just answer FAQs from a fixed list.</p>
            <div className="acd-btns">
              <a href="#contact-form" className="acd-btn-p">
                Discuss Your Chatbot
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <Link href="/ai-agent-development-services/" className="acd-btn-s">Need an AI Agent Instead?</Link>
            </div>
            <div className="acd-stats">
              {STATS.map(s => (
                <div key={s.label} className="acd-stat">
                  <div className="acd-stat-v">{s.val}</div>
                  <div className="acd-stat-l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHATBOT TYPES ── */}
        <section className="acd-sec" id="services">
          <div className="acd-in">
            <div className="acd-reveal">
              <span className="acd-ey">What We Build</span>
              <h2 className="acd-h2">Eight Types of <AuroraText>AI Chatbots We Develop</AuroraText></h2>
              <p className="acd-lead">Every chatbot we build is purpose-designed for its use case — not a generic bot with your logo on it.</p>
            </div>
            <div className="acd-g4">
              {CHATBOTS.map((c, i) => (
                <div key={c.n} className="acd-glass acd-reveal" style={{transitionDelay:`${i*55}ms`}}>
                  <div className="acd-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon}/></svg>
                  </div>
                  <div className="acd-step-num">{c.n}</div>
                  <div className="acd-card-h">{c.title}</div>
                  <p className="acd-card-p">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLATFORMS ── */}
        <section className="acd-plat-sec">
          <div className="acd-in">
            <h2 className="acd-plat-h">Channels & Platforms We Deploy To</h2>
            <div className="acd-pills">{PLATFORMS.map(p => <span key={p} className="acd-pill">{p}</span>)}</div>
          </div>
        </section>

        {/* ── CHATBOT vs AGENT ── */}
        <section className="acd-sec acd-white" id="chatbot-vs-agent">
          <div className="acd-in" style={{maxWidth:900}}>
            <div className="acd-reveal">
              <span className="acd-ey">Choosing the Right Solution</span>
              <h2 className="acd-h2">AI Chatbot vs <AuroraText>AI Agent — Which Do You Need?</AuroraText></h2>
              <p className="acd-lead">Both are built on LLMs, but they solve different problems. Use this to pick the right starting point.</p>
            </div>
            <div className="acd-vs-grid acd-reveal">
              <div className="acd-vs-card acd-vs-chatbot">
                <div className="acd-vs-label" style={{color:'#1d4ed8'}}>
                  <span className="acd-vs-dot" style={{background:'#3b82f6'}}/>
                  Choose an AI Chatbot when…
                </div>
                <ul className="acd-vs-list">
                  {VS.chatbot.when.map(w => <li key={w}>{w}</li>)}
                </ul>
              </div>
              <div className="acd-vs-card acd-vs-agent">
                <div className="acd-vs-label" style={{color:'#92400e'}}>
                  <span className="acd-vs-dot" style={{background:'#D97706'}}/>
                  Choose an AI Agent when…
                </div>
                <ul className="acd-vs-list">
                  {VS.agent.when.map(w => <li key={w}>{w}</li>)}
                </ul>
              </div>
            </div>
            <div className="acd-vs-cta acd-reveal">
              <p style={{fontSize:14,color:'#4A6080',margin:'0 0 12px'}}>Not sure which is right for your project?</p>
              <a href="#contact-form" className="acd-btn-p" style={{display:'inline-flex'}}>
                Tell us what you need — we&rsquo;ll recommend
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="acd-sec" id="process">
          <div className="acd-in">
            <div className="acd-reveal">
              <span className="acd-ey">How We Work</span>
              <h2 className="acd-h2">Our AI Chatbot <AuroraText>Development Process</AuroraText></h2>
              <p className="acd-lead">From intent mapping to continuous improvement — a process built around shipping chatbots that actually contain queries, not just respond to them.</p>
            </div>
            <div className="acd-g3">
              {PROCESS.map((p, i) => (
                <div key={p.n} className="acd-glass acd-reveal" style={{transitionDelay:`${i*70}ms`}}>
                  <div className="acd-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon}/></svg>
                  </div>
                  <div className="acd-step-num">{p.n}</div>
                  <div className="acd-card-h">{p.title}</div>
                  <p className="acd-card-p">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY 1SOLUTIONS ── */}
        <section className="acd-sec acd-white" id="why-us">
          <div className="acd-in">
            <div className="acd-reveal">
              <span className="acd-ey">Why 1Solutions</span>
              <h2 className="acd-h2">Chatbots That <AuroraText>Contain Queries, Not Just Answer Them</AuroraText></h2>
              <p className="acd-lead">We have shipped chatbots across 20+ industries. Here is what separates a 94% containment rate from a bot your users learn to ignore.</p>
            </div>
            <div className="acd-g3">
              {WHY.map((w, i) => (
                <div key={w.title} className="acd-glass acd-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="acd-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <div className="acd-card-h">{w.title}</div>
                  <p className="acd-card-p">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRY USE CASES ── */}
        <section className="acd-sec" id="industries">
          <div className="acd-in">
            <div className="acd-reveal">
              <span className="acd-ey">Industry Applications</span>
              <h2 className="acd-h2">AI Chatbots Built for <AuroraText>Your Industry</AuroraText></h2>
              <p className="acd-lead">Domain context is what separates a chatbot that works from one that frustrates users. We bring it for eCommerce, SaaS, healthcare, and finance.</p>
            </div>
            <div className="acd-g2" style={{maxWidth:960,margin:'0 auto'}}>
              {USE_CASES.map((uc, i) => (
                <div key={uc.title} className="acd-glass acd-reveal" style={{transitionDelay:`${i*70}ms`}}>
                  <div className="acd-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={uc.icon}/></svg>
                  </div>
                  <div className="acd-card-h">{uc.title}</div>
                  <ul className="acd-uc-list">
                    {uc.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="acd-sec acd-white" id="faq">
          <div className="acd-in" style={{maxWidth:900}}>
            <div className="acd-reveal">
              <span className="acd-ey">Common Questions</span>
              <h2 className="acd-h2">AI Chatbot Development <AuroraText>FAQs</AuroraText></h2>
              <p className="acd-lead">The questions we get asked most before a chatbot project starts.</p>
            </div>
            <div className="acd-flist">
              {FAQS.map((f, i) => (
                <div key={i} className={`acd-fitem${openFaq === i ? ' acd-open' : ''}`}>
                  <button className="acd-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="acd-fq-badge">{String(i + 1).padStart(2, '0')}</span>
                    <span className="acd-fq-text">{f.q}</span>
                    <svg className="acd-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <div className="acd-fanswer-wrap">
                    <div className="acd-fanswer">{f.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="acd-sec" id="related">
          <div className="acd-in">
            <div className="acd-reveal">
              <span className="acd-ey">Keep Exploring</span>
              <h2 className="acd-h2">Related <AuroraText>AI & Digital Services</AuroraText></h2>
              <p className="acd-lead">AI chatbots are one piece of a broader digital strategy. Explore what pairs naturally with your chatbot project.</p>
            </div>
            <div className="acd-g3">
              {RELATED.map((r, i) => (
                <Link key={r.href} href={r.href} className="acd-rel-card acd-reveal" style={{transitionDelay:`${i*70}ms`}}>
                  <div className="acd-glass">
                    <div className="acd-nbadge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={r.icon}/></svg>
                    </div>
                    <div className="acd-card-h">{r.title}</div>
                    <p className="acd-card-p">{r.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="acd-form-sec" id="contact-form">
          <div className="acd-in">
            <div className="acd-reveal" style={{textAlign:'center',maxWidth:640,margin:'0 auto 40px'}}>
              <span className="acd-ey">Let&rsquo;s Build Together</span>
              <h2 className="acd-h2">Start Your <AuroraText>AI Chatbot Project</AuroraText></h2>
              <p className="acd-lead" style={{marginBottom:0}}>Tell us your use case, the channel you want to deploy on, and the systems to integrate — we&rsquo;ll come back with a scope and estimate within 48 hours.</p>
            </div>
            <div className="acd-form-card acd-reveal">
              {formState === 'success' ? (
                <div className="acd-success">
                  <div className="acd-success-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 style={{fontSize:20,fontWeight:800,color:'#0F1F40',margin:0}}>Message received — thank you!</h3>
                  <p style={{fontSize:14,color:'#4A6080',margin:0,maxWidth:420}}>We&rsquo;ll review your requirements and reply with an initial scope within two business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="acd-form-row">
                    <div className="acd-field">
                      <label className="acd-label" htmlFor="acd-name">Full Name *</label>
                      <input id="acd-name" className="acd-input" type="text" required placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} />
                    </div>
                    <div className="acd-field">
                      <label className="acd-label" htmlFor="acd-email">Email Address *</label>
                      <input id="acd-email" className="acd-input" type="email" required placeholder="jane@company.com" value={form.email} onChange={e => setForm(f => ({...f, email:e.target.value}))} />
                    </div>
                  </div>
                  <div className="acd-field">
                    <label className="acd-label" htmlFor="acd-website">Company / Website</label>
                    <input id="acd-website" className="acd-input" type="text" placeholder="Acme Inc. or https://yoursite.com" value={form.website} onChange={e => setForm(f => ({...f, website:e.target.value}))} />
                  </div>
                  <div className="acd-field">
                    <label className="acd-label" htmlFor="acd-message">Describe your chatbot project *</label>
                    <textarea id="acd-message" className="acd-textarea" required placeholder="What should the chatbot do? Which channel (website, WhatsApp, Slack)? Which systems should it connect to?..." value={form.message} onChange={e => setForm(f => ({...f, message:e.target.value}))} />
                  </div>
                  {formState === 'error' && <p style={{fontSize:13,color:'#dc2626',marginBottom:12}}>{formError||'Something went wrong. Please try again.'}</p>}
                  <button type="submit" className="acd-submit" disabled={formState === 'sending'}>
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
        <section className="acd-cta-sec">
          <div className="acd-in">
            <div className="acd-reveal">
              <span className="acd-ey" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Build?</span>
              <h2 className="acd-cta-h">Build an AI Chatbot That <AuroraText>Your Users Actually Use</AuroraText></h2>
              <p className="acd-cta-p">From a simple FAQ bot to a full multi-channel support automation — we scope, build, and ship chatbots that resolve queries, not just respond to them.</p>
              <div className="acd-btns">
                <a href="#contact-form" className="acd-btn-p">
                  Start the Conversation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                <Link href="/artificial-intelligence/" className="acd-btn-s">All AI Services</Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
