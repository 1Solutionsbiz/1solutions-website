'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Hire AI Developer', item: 'https://www.1solutions.biz/hire-ai-developer/' }] },
    { '@type': 'Service', name: 'Hire AI Developer', url: 'https://www.1solutions.biz/hire-ai-developer/', description: 'Hire expert AI developers from 1Solutions — pre-vetted AI engineers specialising in LLM integration, RAG pipelines, AI agents, OpenAI/Anthropic/Gemini APIs, LangChain, vector databases, fine-tuning, and production AI product development.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz', logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' }, foundingDate: '2008', areaServed: ['US', 'GB', 'AU', 'CA', 'IN'] }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '58', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What does an AI developer do?', acceptedAnswer: { '@type': 'Answer', text: "An AI developer designs and builds AI-powered features and products — integrating large language models (LLMs like GPT-4o, Claude, Gemini) via API into applications, building RAG (Retrieval-Augmented Generation) systems that ground LLM responses in proprietary company data, designing AI agent frameworks (using LangChain, LlamaIndex, or custom orchestration) for multi-step autonomous task completion, implementing semantic search with vector databases (Pinecone, Weaviate, pgvector), fine-tuning open-source models (Llama 3, Mistral, Qwen) for domain-specific tasks, building conversational AI interfaces (chatbots, voice assistants), and deploying AI models to production with monitoring, evaluation, and cost management. An AI developer combines software engineering skills (APIs, databases, backend services) with AI/ML knowledge (prompt engineering, embeddings, model evaluation, context window management)." } },
      { '@type': 'Question', name: 'What is the difference between an AI developer and a machine learning engineer?', acceptedAnswer: { '@type': 'Answer', text: "An AI developer (in the current context) primarily builds AI-powered software products using pre-trained foundation models and LLM APIs — they focus on LLM integration, prompt engineering, RAG architecture, AI agents, and making AI capabilities usable in production applications. A machine learning engineer primarily trains, evaluates, and deploys machine learning models — writing model training pipelines, feature engineering, model evaluation, and MLOps infrastructure. There is overlap: some AI developers also fine-tune models, and ML engineers increasingly work with LLMs. If you need someone to integrate GPT-4o or Claude into your product and build AI features on top of it, you want an AI developer. If you need someone to train a custom tabular prediction model from a proprietary dataset, you want an ML engineer." } },
      { '@type': 'Question', name: 'What AI APIs and platforms do your developers work with?', acceptedAnswer: { '@type': 'Answer', text: "Our AI developers work with: OpenAI API (GPT-4o, GPT-4-turbo, GPT-3.5-turbo, DALL-E 3, Whisper, TTS, Embeddings), Anthropic Claude API (Claude 3.5 Sonnet, Haiku, Opus), Google Gemini API (Gemini 1.5 Pro/Flash, embedding models), AWS Bedrock (model access and enterprise compliance), Azure OpenAI Service (GPT-4 deployment with Azure compliance controls), Meta Llama 3 / Mistral / Qwen (open-source models via HuggingFace or self-hosted with Ollama/vLLM), and open-source embedding models (sentence-transformers, text-embedding-ada-002, Cohere embeddings)." } },
      { '@type': 'Question', name: 'What is RAG and do your AI developers build RAG systems?', acceptedAnswer: { '@type': 'Answer', text: "RAG (Retrieval-Augmented Generation) is an architecture that grounds LLM responses in your own documents, databases, or knowledge bases rather than relying solely on what the model was trained on. It works by: (1) converting documents into vector embeddings, (2) storing them in a vector database (Pinecone, Weaviate, Qdrant, pgvector), (3) when a user asks a question, embedding the query and retrieving the most relevant document chunks, and (4) passing the retrieved context to the LLM to generate a grounded, factual response. RAG is the standard approach for building AI systems that answer questions about internal company data, documentation, or knowledge bases. Yes — our AI developers design and build production RAG systems, including chunking strategies, hybrid search (vector + keyword), re-ranking, and evaluation pipelines." } },
      { '@type': 'Question', name: 'Can your AI developers build AI agents?', acceptedAnswer: { '@type': 'Answer', text: "Yes. AI agents are LLM-powered systems that can take multi-step actions to complete tasks — using tools (web search, code execution, database queries, API calls), making decisions about which tool to use next, and iterating until a goal is achieved. Our AI developers build agents using LangChain (agents, tool-calling, memory), LlamaIndex, AutoGen, or custom orchestration frameworks. They implement tool-calling with OpenAI function calling or Anthropic tool use APIs, design agent memory (conversation history, vector-stored long-term memory), and build multi-agent systems where specialised agents collaborate on complex tasks." } },
      { '@type': 'Question', name: 'What programming languages do your AI developers use?', acceptedAnswer: { '@type': 'Answer', text: "Primary: Python — the standard language for AI/ML work, used with LangChain, LlamaIndex, HuggingFace Transformers, FastAPI for AI microservices, and async frameworks (asyncio, aiohttp) for concurrent LLM API calls. Secondary: TypeScript/JavaScript — for AI features built into Next.js or Node.js applications using the Vercel AI SDK, LangChain.js, or direct API calls to OpenAI/Anthropic. Our AI developers can integrate AI capabilities into your existing Python or Node.js/TypeScript backend, or build dedicated AI microservices." } },
      { '@type': 'Question', name: 'How do your AI developers handle AI costs and model evaluation?', acceptedAnswer: { '@type': 'Answer', text: "LLM API costs and response quality are both first-class engineering concerns. Our AI developers implement: cost-aware prompt design (minimising token usage without sacrificing quality), model selection strategy (GPT-4o for complex reasoning vs GPT-3.5-turbo or Haiku for simpler tasks), caching of LLM responses for repeated queries, streaming responses to improve perceived performance, and token usage monitoring with alerting. For evaluation: they build automated evaluation pipelines using frameworks like RAGAS (for RAG systems), LangSmith, or custom LLM-as-judge evaluation — measuring answer relevancy, faithfulness, context recall, and hallucination rate." } },
      { '@type': 'Question', name: 'Do your AI developers work with fine-tuning?', acceptedAnswer: { '@type': 'Answer', text: "Yes. Fine-tuning (adapting a pre-trained model on domain-specific data) is appropriate when: the task requires consistent formatting or style that prompt engineering alone cannot reliably achieve; you have proprietary domain knowledge that benefits from model weights rather than RAG context; or you need the model to follow a very specific response structure or persona consistently. Our AI developers work with OpenAI fine-tuning API (GPT-3.5-turbo, GPT-4o-mini), LoRA/QLoRA fine-tuning of open-source models (Llama 3, Mistral, Phi-3) using HuggingFace PEFT, and supervised fine-tuning (SFT) with instruction datasets. They also advise when fine-tuning is the right approach vs RAG vs prompt engineering — because fine-tuning is often the wrong tool when RAG would work better." } },
    ] },
  ],
};

const SKILLS = [
  { n: '01', title: 'LLM Integration & AI Feature Development', desc: 'Production LLM integration into web and mobile applications — OpenAI GPT-4o/Claude/Gemini API integration, streaming responses with Server-Sent Events, multi-turn conversation management, system prompt design and optimisation, function calling and tool use, structured output with Zod validation, and AI feature development in Next.js, FastAPI, Node.js, or Django backends.' },
  { n: '02', title: 'RAG Pipeline Design & Implementation', desc: 'End-to-end RAG system development — document ingestion and chunking strategy (fixed-size, recursive, semantic, document-aware), embedding generation with OpenAI text-embedding-3 or open-source models, vector database integration (Pinecone, Weaviate, Qdrant, pgvector/PostgreSQL), hybrid search (dense vector + BM25 keyword), re-ranking with cross-encoders, context assembly, and RAG evaluation (RAGAS metrics: faithfulness, answer relevancy, context recall).', feat: true },
  { n: '03', title: 'AI Agents & Agentic Workflows', desc: 'AI agent design and implementation — tool-calling agents (web search, code execution, database queries, API calls), multi-step reasoning with chain-of-thought, LangChain and LlamaIndex agent frameworks, OpenAI Assistants API with persistent threads, ReAct (Reason + Act) agent patterns, agent memory (short-term conversation, long-term vector-stored), multi-agent orchestration (AutoGen, CrewAI), and agent evaluation and safety guardrails.' },
  { n: '04', title: 'Prompt Engineering & Optimisation', desc: 'Systematic prompt engineering — few-shot and zero-shot prompt design, chain-of-thought and tree-of-thought prompting for complex reasoning, role and persona design, output format constraints, prompt versioning and A/B testing, context window management for long documents, and prompt injection defence for user-facing AI applications. We treat prompts as code — version controlled, tested, and optimised.' },
  { n: '05', title: 'Fine-Tuning & Model Customisation', desc: 'Model fine-tuning for domain-specific tasks — OpenAI fine-tuning API (GPT-4o-mini, GPT-3.5-turbo) for consistent output formatting and specialised knowledge; LoRA/QLoRA fine-tuning of open-source models (Llama 3 8B/70B, Mistral 7B, Phi-3, Qwen 2.5) using HuggingFace PEFT library; supervised fine-tuning dataset preparation from production conversation logs; and DPO (Direct Preference Optimisation) for alignment.' },
  { n: '06', title: 'AI Chatbot & Conversational AI Development', desc: 'Production conversational AI products — multi-turn AI chatbots with conversation history management, streaming UI with Vercel AI SDK or direct SSE, intent classification and slot filling, fallback handling and graceful degradation, chat widget integration into web apps, voice interface integration (Whisper STT, TTS), and conversation analytics and monitoring for quality improvement.' },
  { n: '07', title: 'Semantic Search & AI-Powered Search', desc: 'AI-powered search beyond keyword matching — semantic search using dense embeddings (OpenAI, Cohere, sentence-transformers), hybrid search combining vector similarity and BM25 full-text search, query expansion with LLMs, re-ranking with cross-encoder models (Cohere Rerank, ColBERT), faceted filtering on vector search results, and integration with existing search infrastructure (Elasticsearch, OpenSearch, Algolia).' },
  { n: '08', title: 'AI Microservices & Production Deployment', desc: 'AI backend engineering — FastAPI microservices for LLM inference and RAG, async LLM API calls with rate limiting and retry logic, LLM response caching (Redis, in-memory), token budget management per user/organisation, cost monitoring dashboards, GPU inference infrastructure for self-hosted models (vLLM, Ollama, text-generation-inference), Kubernetes deployment, and LLMOps with LangSmith or custom observability.' },
  { n: '09', title: 'Multimodal AI (Vision, Audio, Documents)', desc: 'Multimodal AI application development — GPT-4o vision for image understanding and document analysis, Claude 3 vision for chart interpretation and screenshot analysis, Whisper for audio transcription, AI-powered OCR and document extraction (extracting structured data from PDFs, invoices, contracts), image generation with DALL-E 3 or Stable Diffusion, and video content analysis.' },
  { n: '10', title: 'AI Strategy, Review & Technical Advisory', desc: 'Independent AI technical advisory — AI product strategy review (build vs buy, which LLM provider, RAG vs fine-tuning decision), AI architecture review of existing implementations (identifying hallucination risks, context window management issues, cost optimisation opportunities), AI roadmap planning, and hands-on technical leadership to guide engineering teams building AI-powered products.' },
];

const TECH_STACK = [
  { group: 'LLM APIs & Providers', color: '#6d28d9', items: ['OpenAI GPT-4o / o1', 'Anthropic Claude 3.5', 'Google Gemini 1.5', 'AWS Bedrock', 'Azure OpenAI Service', 'Llama 3 / Mistral / Qwen'] },
  { group: 'AI Frameworks', color: '#7c3aed', items: ['LangChain / LangGraph', 'LlamaIndex', 'Vercel AI SDK', 'AutoGen / CrewAI', 'HuggingFace Transformers', 'PEFT / LoRA (fine-tuning)'] },
  { group: 'Vector Databases', color: '#0f766e', items: ['Pinecone', 'Weaviate', 'Qdrant', 'pgvector (PostgreSQL)', 'Chroma', 'Redis Vector Search'] },
  { group: 'Embeddings & Search', color: '#0369a1', items: ['text-embedding-3-large', 'Cohere Embed', 'sentence-transformers', 'BM25 / Elasticsearch', 'Cohere Rerank', 'ColBERT'] },
  { group: 'Backend & APIs', color: '#b45309', items: ['Python / FastAPI', 'Node.js / TypeScript', 'Next.js (AI features)', 'Django REST', 'asyncio / aiohttp', 'Redis (caching)'] },
  { group: 'MLOps & Observability', color: '#dc2626', items: ['LangSmith', 'RAGAS (RAG eval)', 'Weights & Biases', 'Prometheus + Grafana', 'OpenTelemetry', 'Datadog LLM monitoring'] },
  { group: 'Model Serving (Self-hosted)', color: '#059669', items: ['vLLM', 'Ollama', 'HuggingFace TGI', 'NVIDIA Triton', 'AWS SageMaker', 'Modal / Replicate'] },
  { group: 'Databases & Storage', color: '#c2185b', items: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS S3', 'Supabase', 'DynamoDB'] },
];

const ENGAGEMENT_MODELS = [
  { id: 'full', name: 'Full-Time Dedicated AI Developer', badge: 'Most Popular', badgeColor: '#D97706', feat: true, icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z', headline: '160 hrs/month — owning your AI product development.', desc: 'A dedicated AI developer working exclusively on your product full-time — integrating LLMs, building RAG pipelines, designing agent workflows, and shipping AI features iteratively. They attend standups, commit to your repos, and own the AI layer of your product end-to-end.', bestFor: ['SaaS products adding AI features (chat, search, summarisation)', 'AI-first startups building their core AI product', 'Teams that need LLM expertise they do not have internally', 'Enterprises building internal AI tools on proprietary data (RAG)'], process: 'Requirements → shortlist in 24 hrs → interview → start in 3–5 days', timeline: 'Available within 3–5 business days' },
  { id: 'part', name: 'Part-Time AI Developer (80 hrs/month)', badge: 'Flexible', badgeColor: '#6d28d9', icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z', headline: '80 hrs/month — AI expertise without full-time overhead.', desc: 'A part-time AI developer for products with steady but not intensive AI development needs — maintaining and improving an existing AI feature set, iterative prompt optimisation, adding new AI capabilities incrementally, or AI consulting alongside internal engineers.', bestFor: ['Products with existing AI features that need iteration and improvement', 'Teams adding AI to a specific part of their product', 'AI feature maintenance and prompt optimisation', 'Evaluating AI approaches before committing to full-time hiring'], process: 'Requirements → shortlist → interview → start within 2–3 days', timeline: 'Available within 2–3 business days' },
  { id: 'hourly', name: 'Hourly / AI Project Sprint', badge: 'Task-focused', badgeColor: '#0284c7', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z', headline: 'Pay per hour — ideal for scoped AI tasks.', desc: 'Hourly or project-based AI engagement for well-defined AI work — building a specific RAG pipeline, integrating an LLM into an existing endpoint, fine-tuning a model on a labelled dataset, an AI architecture review, or a 2-week AI feature sprint.', bestFor: ['Building a specific RAG system or chatbot', 'LLM API integration into an existing product', 'AI architecture review and recommendations', 'Fine-tuning or prompt optimisation for a specific task'], process: 'Scope discussion → estimate → start within 24 hrs', timeline: 'Can start within 24 business hours' },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Share Your AI Requirements', desc: 'Tell us about your AI project — the LLM providers you want to use (or whether you are open to recommendations), the type of AI feature you are building (RAG, chatbot, agents, search, generation), your existing tech stack (Python, Node.js, Next.js), data privacy requirements (cloud APIs vs self-hosted models), and your team\'s existing AI knowledge. The context helps us match an AI developer with the right LLM provider experience and architecture depth.' },
  { num: '02', title: 'AI Developer Shortlist Within 24 Hours', desc: 'Within 24 business hours, we send you 2–3 pre-vetted AI developer profiles — each with their specific LLM integration experience (which APIs, RAG architectures built, agent frameworks used, production AI products shipped), Python or TypeScript stack preferences, and context about their approach to cost management, evaluation, and AI safety.' },
  { num: '03', title: 'Technical Interview — AI-Specific Assessment', desc: 'Interview the shortlisted AI developers on your specific use case. Ask them to design a RAG architecture for your data, describe how they would manage context window limits, explain their approach to hallucination reduction, or walk through a fine-tuning vs RAG decision. We want you to see real AI engineering reasoning, not rehearsed answers.' },
  { num: '04', title: 'Optional Paid AI Proof-of-Concept (1–2 Weeks)', desc: 'For AI projects, we recommend an optional paid 1–2 week proof-of-concept before a longer engagement — building a minimal working version of your key AI feature (a basic RAG pipeline, a working LLM integration, or an agent prototype). This validates the technical approach, lets you evaluate the developer\'s AI problem-solving depth, and de-risks the full engagement.' },
  { num: '05', title: 'Engagement Kick-Off & Environment Setup', desc: 'Once selected, the AI developer joins your communication channels and repositories. They set up local AI development environment (API keys, vector database access, model testing infrastructure), review your existing codebase and data, and attend sprint planning. Our account manager handles onboarding formalities — NDA, IP assignment, and working hours agreement.' },
  { num: '06', title: 'Ongoing Reviews & Iterative Improvement', desc: 'AI products require continuous iteration — prompt improvement, retrieval quality tuning, model upgrades as better versions release, and cost optimisation as usage scales. Monthly check-ins assess delivery quality, AI feature performance metrics, and engagement satisfaction. If the developer is not the right fit, rapid 5-day replacement at no extra cost.' },
];

const TESTIMONIALS = [
  { text: "We needed to add AI chat to our SaaS product — customers asking questions about their own data. 1Solutions matched us with an AI developer who designed our RAG architecture on pgvector, built the ingestion pipeline, integrated GPT-4o with streaming, and shipped the feature in 6 weeks. Our CSAT for the AI feature is 4.8/5. He joined as full-time after the project.", name: 'Tom W.', role: 'CTO, Analytics SaaS (UK)', init: 'TW', bg: '#0F3460' },
  { text: "We had internal AI tools built by a previous contractor that were hallucinating 30% of the time and costing $8K/month in API fees. 1Solutions sent us an AI developer who audited the prompts, redesigned the RAG chunking strategy, added a re-ranking step, and implemented GPT-4o-mini for cheaper tasks. Hallucination rate dropped to under 4%, costs down to $1.2K/month.", name: 'Lisa K.', role: 'Head of Engineering, LegalTech (AU)', init: 'LK', bg: '#1a0030', feat: true },
  { text: "We hired an AI developer from 1Solutions to build our AI agent framework — a multi-step agent that researches companies, drafts outreach messages, and logs results to our CRM. She built it in LangGraph with GPT-4o tool calling, handled the rate limiting and retry logic, and built a monitoring dashboard for agent runs. Saves our sales team 3 hours per day.", name: 'Carlos M.', role: 'VP Product, Sales Intelligence (US)', init: 'CM', bg: '#1e3a5f' },
];

const WHY_CARDS = [
  { title: 'Production AI, Not Just Demos', desc: "Building a GPT-4o chatbot that works in a demo is easy. Building one that handles edge cases, manages context gracefully, doesn't hallucinate on out-of-scope questions, stays within API cost budgets, and works reliably under load — that is what our AI developers deliver. We have built production AI products, not just proof-of-concepts." },
  { title: 'LLM Provider Agnostic', desc: 'Our AI developers have experience across OpenAI, Anthropic, Google Gemini, AWS Bedrock, and open-source models (Llama 3, Mistral). They select the right model for each use case — not just the most popular one. They advise on provider trade-offs (cost, capability, latency, compliance, self-hosting options) before writing a line of code.' },
  { title: 'RAG Architecture Depth', desc: 'RAG is not just "embed documents and search" — chunking strategy, embedding model selection, hybrid search, re-ranking, context assembly, and evaluation all significantly affect answer quality. Our AI developers design RAG systems that achieve high faithfulness and answer relevancy scores in production, not just in a 10-document demo.' },
  { title: 'Honest RAG vs Fine-Tuning Advice', desc: "Fine-tuning is often not the right answer when RAG would work better — and it is more expensive and complex to maintain. Our AI developers give you honest architectural advice about which approach fits your use case, rather than recommending fine-tuning because it sounds impressive." },
  { title: 'Cost and Latency Engineering', desc: 'LLM API costs and latency are engineering concerns, not afterthoughts. Our AI developers design for cost-efficiency from the start — model tiering (GPT-4o for complex tasks, Haiku for simple ones), prompt caching, response caching, token budget management, and streaming to improve perceived latency.' },
  { title: 'AI Safety & Guardrails', desc: 'Production AI products need guardrails — prompt injection defence, output filtering, hallucination detection, PII redaction before LLM processing, and refusal handling. Our AI developers implement safety layers appropriate to your use case and user base, including compliance considerations for regulated industries.' },
  { title: 'Python + TypeScript Stack Coverage', desc: 'Our AI developers work in Python (FastAPI AI microservices, HuggingFace, LangChain) and TypeScript/JavaScript (Vercel AI SDK, LangChain.js, Next.js AI features). They can build AI capabilities into your existing stack rather than requiring a separate Python service for everything.' },
  { title: 'Evaluation Pipelines, Not Just Vibes', desc: "AI quality cannot be assessed by eye-balling 10 test outputs. Our AI developers build automated evaluation pipelines — using RAGAS for RAG systems, LLM-as-judge evaluation for generation quality, regression test suites for prompt changes, and dashboards tracking AI performance metrics over time. You know if AI quality is improving or degrading." },
];

const FAQS = [
  { q: 'What does an AI developer do?', a: "An AI developer designs and builds AI-powered features — integrating LLMs (GPT-4o, Claude, Gemini) into applications, building RAG systems grounded in company data, designing AI agents for multi-step tasks, implementing semantic search with vector databases, fine-tuning open-source models, and deploying AI to production with monitoring and cost management." },
  { q: 'What is the difference between an AI developer and a machine learning engineer?', a: "An AI developer primarily builds AI-powered products using pre-trained foundation models and LLM APIs — focusing on LLM integration, RAG, agents, and making AI usable in production. An ML engineer primarily trains, evaluates, and deploys custom ML models from data. If you need GPT-4o or Claude integrated into your product, you want an AI developer." },
  { q: 'What AI APIs and platforms do your developers work with?', a: "OpenAI (GPT-4o, DALL-E 3, Whisper, embeddings), Anthropic Claude 3.5 (Sonnet, Haiku, Opus), Google Gemini 1.5 (Pro/Flash), AWS Bedrock, Azure OpenAI Service, and open-source models (Llama 3, Mistral, Qwen) via HuggingFace, Ollama, or vLLM." },
  { q: 'What is RAG and do your AI developers build RAG systems?', a: "RAG (Retrieval-Augmented Generation) grounds LLM responses in your own documents or databases — using vector embeddings, vector databases (Pinecone, pgvector, Weaviate), and hybrid search to retrieve relevant context before generating a response. Yes, our AI developers design and build production RAG systems including chunking, hybrid search, re-ranking, and RAGAS evaluation." },
  { q: 'Can your AI developers build AI agents?', a: "Yes. Our AI developers build AI agents that use tools (web search, code execution, database queries, API calls) in multi-step workflows to complete tasks — using LangChain, LangGraph, LlamaIndex, AutoGen, or OpenAI Assistants API with custom tool calling." },
  { q: 'What programming languages do your AI developers use?', a: "Primary: Python (FastAPI, LangChain, HuggingFace, asyncio). Secondary: TypeScript/Node.js (Vercel AI SDK, LangChain.js, Next.js AI features). They can integrate AI into your existing Python or TypeScript backend, or build dedicated AI microservices." },
  { q: 'How do your AI developers handle AI costs and evaluation?', a: "Cost: model tiering, prompt caching, response caching, token budget management, and monitoring dashboards. Evaluation: automated evaluation pipelines with RAGAS (for RAG), LLM-as-judge evaluation, regression tests for prompt changes, and performance metric dashboards — not just manual spot-checking." },
  { q: 'Do your AI developers work with fine-tuning?', a: "Yes — OpenAI fine-tuning API (GPT-4o-mini), LoRA/QLoRA fine-tuning of open-source models (Llama 3, Mistral, Phi-3) with HuggingFace PEFT. We also advise honestly when RAG or prompt engineering is a better solution than fine-tuning for your specific use case." },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (!num) return;
    let t0 = null;
    const step = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * num)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}
function StatItem({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  return (<div className="hia-stat-col"><div className="hia-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div><div className="hia-stat-label">{label}</div></div>);
}

export default function HireAIDeveloper() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [vis, setVis] = useState(new Set());
  const [vSk, setVSk] = useState([]); const [vEn, setVEn] = useState([]); const [vWh, setVWh] = useState([]); const [vTe, setVTe] = useState([]); const [vSt, setVSt] = useState([]);
  const statsRef = useRef(null); const secRefs = useRef({});
  const skRef = useRef(null); const enRef = useRef(null); const whRef = useRef(null); const teRef = useRef(null); const stRef = useRef(null);
  useEffect(() => { if (!statsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); o.disconnect(); } }, { threshold: 0.4 }); o.observe(statsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => {
    const pairs = [[skRef, SKILLS.length, setVSk],[enRef, 3, setVEn],[whRef, WHY_CARDS.length, setVWh],[teRef, 3, setVTe],[stRef, TECH_STACK.length, setVSt]];
    const obs = pairs.map(([ref, count, setter]) => { if (!ref.current) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 80)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(ref.current); return o; });
    return () => obs.forEach(o => o?.disconnect());
  }, []);
  useEffect(() => {
    const ks = Object.keys(secRefs.current);
    const obs = ks.map(k => { const el = secRefs.current[k]; if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(p => new Set([...p, k])); o.disconnect(); } }, { threshold: 0.1 }); o.observe(el); return o; });
    return () => obs.forEach(o => o?.disconnect());
  }, []);
  const visSkills = showAll ? SKILLS : SKILLS.slice(0, 6);
  return (
    <>
      <Head>
        <title>Hire AI Developer | LLM, RAG, AI Agents Expert | 1Solutions</title>
        <meta name="description" content="Hire expert AI developers from 1Solutions — LLM integration, RAG pipelines, AI agents, OpenAI/Anthropic/Gemini APIs, LangChain, vector databases, fine-tuning, and production AI product development. Dedicated, part-time, or hourly." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-ai-developer/" />
        <meta property="og:title" content="Hire AI Developer | LLM, RAG & AI Agents | 1Solutions" />
        <meta property="og:description" content="Hire vetted AI developers — GPT-4o/Claude/Gemini integration, RAG, AI agents, LangChain, vector databases, fine-tuning. Dedicated, part-time, or hourly. Start in 3–5 days." />
        <meta property="og:url" content="https://www.1solutions.biz/hire-ai-developer/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .hia-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#f5f3ff 0%,#ede9fe 20%,#faf5ff 50%,#fef3c7 75%,#f0f9ff 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .hia-page *,.hia-page *::before,.hia-page *::after{box-sizing:border-box}
          .hia-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .hia-orb-1{width:860px;height:860px;background:radial-gradient(circle,rgba(109,40,217,.22) 0%,rgba(139,92,246,.09) 40%,transparent 70%);top:-260px;right:-240px}
          .hia-orb-2{width:760px;height:760px;background:radial-gradient(circle,rgba(217,119,6,.18) 0%,rgba(245,158,11,.08) 40%,transparent 70%);bottom:0;left:-220px}
          .hia-orb-3{width:520px;height:520px;background:radial-gradient(circle,rgba(2,132,199,.12) 0%,transparent 70%);top:44%;left:-100px;transform:translateY(-50%)}
          .hia-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .hia-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .hia-breadcrumb li{display:flex;align-items:center;gap:6px}
          .hia-breadcrumb li::after{content:'/';opacity:.45}
          .hia-breadcrumb li:last-child::after{display:none}
          .hia-breadcrumb a{color:#0F3460;text-decoration:none}
          .hia-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .hia-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .hia-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#6d28d9 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .hia-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .hia-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .hia-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .hia-badge-dot{width:7px;height:7px;border-radius:50%;background:#6d28d9;flex-shrink:0}
          .hia-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hia-btn-primary{display:inline-block;padding:14px 36px;background:#6d28d9;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(109,40,217,.28)}
          .hia-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .hia-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .hia-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(109,40,217,.5);transform:translateY(-2px)}
          .hia-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .hia-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .hia-stat-col:last-child{border-right:none}
          .hia-stat-val{font-size:28px;font-weight:900;color:#6d28d9;letter-spacing:-.5px;line-height:1}
          .hia-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .hia-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .hia-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .hia-logos-wrap{width:100%;overflow:hidden}
          .hia-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:hia-mq 28s linear infinite}
          .hia-logos-track:hover{animation-play-state:paused}
          @keyframes hia-mq{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .hia-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .hia-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .hia-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .hia-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .hia-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .hia-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .hia-s-reveal.hia-revealed{opacity:1;transform:translateY(0)}
          .hia-inner{max-width:1300px;margin:0 auto}
          .hia-sk-sec{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .hia-sk-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .hia-sk-card{background:linear-gradient(135deg,rgba(245,243,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .hia-sk-card.hia-cv{opacity:1;transform:translateY(0)}
          .hia-sk-card.hia-cv:hover{transform:translateY(-6px);border-color:rgba(109,40,217,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .hia-sk-card.feat{border-color:rgba(109,40,217,.20)}
          .hia-sk-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .hia-sk-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .hia-sk-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .hia-sk-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#6d28d9,#a78bfa);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .hia-sk-card.hia-cv:hover::before{transform:scaleY(1)}
          .hia-sk-more{text-align:center;margin-top:22px}
          .hia-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .hia-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .hia-st-sec{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .hia-st-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .hia-st-card{background:linear-gradient(135deg,rgba(245,243,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .hia-st-card.hia-sv{opacity:1;transform:translateY(0)}
          .hia-st-card.hia-sv:hover{border-color:rgba(109,40,217,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .hia-st-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .hia-st-pills{display:flex;flex-wrap:wrap;gap:6px}
          .hia-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .hia-en-sec{padding:80px 40px;position:relative;z-index:1}
          .hia-en-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .hia-en-card{background:linear-gradient(135deg,rgba(245,243,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .hia-en-card.hia-ev{opacity:1;transform:translateY(0)}
          .hia-en-card.hia-ev:hover{border-color:rgba(109,40,217,.25);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .hia-en-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(245,243,255,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .hia-en-card.feat.hia-ev{transform:translateY(-8px)}
          .hia-en-card.feat.hia-ev:hover{transform:translateY(-12px)}
          .hia-en-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .hia-en-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px}
          .hia-en-icon svg{fill:#0F3460}
          .hia-en-card.feat .hia-en-icon{background:rgba(217,119,6,.10)}
          .hia-en-card.feat .hia-en-icon svg{fill:#D97706}
          .hia-en-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .hia-en-headline{font-size:13px;font-weight:600;color:#6d28d9;margin-bottom:12px}
          .hia-en-card.feat .hia-en-headline{color:#D97706}
          .hia-en-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .hia-en-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .hia-en-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .hia-en-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .hia-en-list li::before{content:'✓';font-weight:800;color:#6d28d9;flex-shrink:0;margin-top:1px}
          .hia-en-card.feat .hia-en-list li::before{color:#D97706}
          .hia-en-proc{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .hia-en-proc strong{color:#0F3460}
          .hia-en-tl{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .hia-en-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .hia-en-cta:hover{background:#0F3460;color:#fff}
          .hia-en-card.feat .hia-en-cta{background:#6d28d9;color:#fff;border-color:#6d28d9}
          .hia-en-card.feat .hia-en-cta:hover{background:#0F3460;border-color:#0F3460}
          .hia-pr-sec{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .hia-psteps{display:flex;flex-direction:column;margin-top:52px}
          .hia-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .hia-pstep.hia-pv{opacity:1;transform:translateY(0)}
          .hia-pstep-l{display:flex;flex-direction:column;align-items:center}
          .hia-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0}
          .hia-pstep.hia-pv:hover .hia-pstep-circle{background:rgba(109,40,217,.10);border-color:#6d28d9;color:#6d28d9}
          .hia-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .hia-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .hia-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .hia-pstep:last-child .hia-pstep-connector{display:none}
          .hia-pstep-r{padding:4px 0 38px}
          .hia-pstep:last-child .hia-pstep-r{padding-bottom:0}
          .hia-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .hia-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .hia-te-sec{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .hia-center-head{text-align:center;margin-bottom:48px}
          .hia-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .hia-tcard{background:linear-gradient(135deg,rgba(245,243,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1)}
          .hia-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(245,243,255,.42) 100%);border-color:rgba(217,119,6,.22)}
          .hia-tcard.hia-tv{opacity:1;transform:translateY(0)}
          .hia-tcard.hia-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .hia-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .hia-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .hia-tauthor{display:flex;align-items:center;gap:12px}
          .hia-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .hia-tname{font-size:14px;font-weight:700;color:#0F3460}
          .hia-trole{font-size:12px;color:#6b7280}
          .hia-wy-sec{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .hia-wy-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .hia-wcard{background:linear-gradient(135deg,rgba(245,243,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .hia-wcard.hia-wv{opacity:1;transform:translateY(0) scale(1)}
          .hia-wcard.hia-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(109,40,217,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .hia-wcard-dot{width:10px;height:10px;border-radius:50%;background:#6d28d9;margin-bottom:12px}
          .hia-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .hia-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .hia-ct-sec{padding:70px 40px;background:linear-gradient(135deg,rgba(245,243,255,.55) 0%,rgba(255,255,255,.60) 40%,rgba(237,233,254,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .hia-ct-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .hia-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#6d28d9 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .hia-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .hia-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .hia-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .hia-cbenefit-icon{flex-shrink:0;color:#6d28d9;font-weight:800;font-size:16px;margin-top:1px}
          .hia-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .hia-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(245,243,255,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .hia-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .hia-form{display:flex;flex-direction:column;gap:13px}
          .hia-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .hia-fg{display:flex;flex-direction:column;gap:5px}
          .hia-fg.full{grid-column:1/-1}
          .hia-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .hia-fg input,.hia-fg textarea,.hia-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .hia-fg input:focus,.hia-fg textarea:focus,.hia-fg select:focus{outline:none;border-color:#6d28d9;box-shadow:0 0 0 3px rgba(109,40,217,.10)}
          .hia-consent{display:flex;gap:8px;align-items:flex-start}
          .hia-consent input{margin-top:3px;width:15px;height:15px}
          .hia-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .hia-consent a{color:#0F3460}
          .hia-submit{width:100%;padding:14px;background:#6d28d9;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(109,40,217,.26)}
          .hia-submit:hover{background:#0F3460;transform:translateY(-2px)}
          .hia-fq-sec{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .hia-fq-sec h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .hia-fq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .hia-faq-list{display:flex;flex-direction:column;gap:10px}
          .hia-fitem{background:linear-gradient(135deg,rgba(245,243,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .hia-fitem.open{border-color:rgba(109,40,217,.30)}
          .hia-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#6d28d9,#a78bfa);border-radius:3px 3px 0 0}
          .hia-fq-btn{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .hia-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px}
          .hia-fitem.open .hia-fq-badge{background:#6d28d9;color:#fff}
          .hia-fq-btn span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .hia-fitem.open .hia-fq-btn span{color:#4c1d95}
          .hia-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .hia-fitem.open .hia-fchev{transform:rotate(180deg);color:#6d28d9}
          .hia-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .hia-fitem.open .hia-fanswer-wrap{max-height:500px}
          .hia-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .hia-rel{padding:80px 40px;background:rgba(245,243,255,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .hia-rel-inner{max-width:1300px;margin:0 auto;text-align:center}
          .hia-rel h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .hia-rel-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .hia-rel hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .hia-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .hia-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .hia-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .hia-rtag-v{background:rgba(109,40,217,.09);border-color:rgba(109,40,217,.28);color:#4c1d95}
          .hia-rtag-f{background:rgba(162,28,175,.09);border-color:rgba(162,28,175,.28);color:#701a75}
          .hia-rtag-b{background:rgba(30,64,175,.09);border-color:rgba(30,64,175,.28);color:#1e3a8a}
          .hia-rtag-g{background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d}
          .hia-rtag-a{background:rgba(202,138,4,.09);border-color:rgba(202,138,4,.28);color:#92400e}
          @media(max-width:1024px){.hia-hero h1,.hia-s-title,.hia-fq-sec h2{font-size:36px}.hia-sk-grid{grid-template-columns:repeat(2,1fr)}.hia-st-grid{grid-template-columns:repeat(2,1fr)}.hia-en-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.hia-en-card.feat{transform:none}.hia-en-card.feat.hia-ev{transform:none}.hia-en-card.feat.hia-ev:hover{transform:translateY(-4px)}.hia-wy-grid{grid-template-columns:repeat(2,1fr)}.hia-tgrid{grid-template-columns:1fr}.hia-ct-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.hia-breadcrumb{padding:12px 20px 0}.hia-hero{padding:28px 20px 20px}.hia-hero h1{font-size:26px;letter-spacing:-.3px}.hia-stats{grid-template-columns:1fr 1fr}.hia-stat-col:nth-child(2){border-right:none}.hia-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.hia-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.hia-logos{padding:16px 20px 28px}.hia-sk-sec,.hia-st-sec,.hia-en-sec,.hia-pr-sec,.hia-te-sec,.hia-wy-sec,.hia-fq-sec,.hia-rel{padding:52px 20px}.hia-ct-sec{padding:48px 20px}.hia-sk-grid,.hia-st-grid,.hia-wy-grid{grid-template-columns:1fr}.hia-frow{grid-template-columns:1fr}.hia-ctitle{font-size:28px}.hia-s-title{font-size:28px}}
        `}</style>
      </Head>
      <div className="hia-page">
        <div className="hia-orb hia-orb-1" /><div className="hia-orb hia-orb-2" /><div className="hia-orb hia-orb-3" />
        <nav className="hia-breadcrumb" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList"><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">Hire AI Developer</span><meta itemProp="position" content="2" /></li></ol></nav>
        <section className="hia-hero">
          <span className="hia-eyebrow">Hire AI Developer</span>
          <h1>Hire Expert AI Developers — LLM, RAG, Agents & Generative AI</h1>
          <p className="hia-hero-desc">Hire pre-vetted AI developers specialising in LLM integration (GPT-4o, Claude 3.5, Gemini), RAG pipeline design, AI agents (LangChain, LangGraph), vector databases (Pinecone, pgvector), fine-tuning, and production AI product development. Dedicated, part-time, or hourly. Start in 3–5 business days.</p>
          <div className="hia-trust-row">{['GPT-4o / Claude 3.5','RAG Pipelines','AI Agents','LangChain / LangGraph','Vector Databases'].map(b => (<div className="hia-badge" key={b}><span className="hia-badge-dot" />{b}</div>))}</div>
          <div className="hia-ctas"><Link href="#contact" className="hia-btn-primary">Hire an AI Developer</Link><Link href="#engagement" className="hia-btn-ghost">View Engagement Models →</Link></div>
        </section>
        <div className="hia-stats" ref={statsRef}>{[['80+','AI Products Built'],['15+','Years Dev Experience'],['48hr','Avg Developer Match'],['98%','Client Retention']].map(([v, l]) => (<StatItem key={l} label={l} val={v} started={statsStarted} />))}</div>
        <div className="hia-logos"><span className="hia-logos-label">Trusted by AI-Forward Engineering Teams</span><div className="hia-logos-wrap"><div className="hia-logos-track">{[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (<img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="hia-clogo" />))}</div></div></div>
        <section className="hia-sk-sec" aria-labelledby="hia-sk-h"><div className="hia-inner"><div className={`hia-s-reveal${vis.has('sk') ? ' hia-revealed' : ''}`} ref={el => { secRefs.current['sk'] = el; }}><span className="hia-s-eyebrow">What Our AI Developers Build</span><h2 id="hia-sk-h" className="hia-s-title">AI Development Skills & Expertise</h2><p className="hia-s-desc" style={{ maxWidth: 720 }}>LLM integration, RAG systems, AI agents, prompt engineering, fine-tuning, conversational AI, semantic search, AI microservices, multimodal AI, and AI architecture advisory.</p></div><div className="hia-sk-grid" ref={skRef}>{visSkills.map((s, i) => (<div key={s.n} className={`hia-sk-card${s.feat ? ' feat' : ''}${vSk.includes(i) ? ' hia-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="hia-sk-num">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>{SKILLS.length > 6 && (<div className="hia-sk-more"><button className="hia-btn-more" onClick={() => setShowAll(p => !p)}>{showAll ? 'Show fewer ↑' : `Show all ${SKILLS.length} AI capabilities ↓`}</button></div>)}</div></section>
        <section className="hia-st-sec" aria-labelledby="hia-st-h"><div className="hia-inner"><div className={`hia-s-reveal${vis.has('stk') ? ' hia-revealed' : ''}`} ref={el => { secRefs.current['stk'] = el; }}><span className="hia-s-eyebrow">AI Technology Stack</span><h2 id="hia-st-h" className="hia-s-title">AI Tools & Technologies</h2><p className="hia-s-desc" style={{ maxWidth: 680 }}>OpenAI GPT-4o, Claude 3.5, Gemini, AWS Bedrock, LangChain, LangGraph, LlamaIndex, Pinecone, pgvector, Weaviate, HuggingFace, vLLM, FastAPI, Vercel AI SDK, RAGAS, LangSmith, and the full AI engineering stack.</p></div><div className="hia-st-grid" ref={stRef}>{TECH_STACK.map((grp, i) => (<div key={grp.group} className={`hia-st-card${vSt.includes(i) ? ' hia-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}><div className="hia-st-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div><div className="hia-st-pills">{grp.items.map(item => <span key={item} className="hia-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}</div></div>))}</div></div></section>
        <section id="engagement" className="hia-en-sec" aria-labelledby="hia-en-h"><div className="hia-inner"><div className={`hia-s-reveal${vis.has('eng') ? ' hia-revealed' : ''}`} ref={el => { secRefs.current['eng'] = el; }}><span className="hia-s-eyebrow">Engagement Models</span><h2 id="hia-en-h" className="hia-s-title">How to Hire an AI Developer</h2><p className="hia-s-desc" style={{ maxWidth: 680 }}>Full-time dedicated AI developer, part-time AI engagement, or hourly/project-based AI sprint — choose the model that fits your AI product stage.</p></div><div className="hia-en-grid" ref={enRef}>{ENGAGEMENT_MODELS.map((m, i) => (<div key={m.id} className={`hia-en-card${m.feat ? ' feat' : ''}${vEn.includes(i) ? ' hia-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}><span className="hia-en-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span><div className="hia-en-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div><div className="hia-en-name">{m.name}</div><div className="hia-en-headline">{m.headline}</div><div className="hia-en-desc">{m.desc}</div><div className="hia-en-list-label">Best for</div><ul className="hia-en-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul><div className="hia-en-proc"><strong>Process:</strong> {m.process}<br /><span className="hia-en-tl">{m.timeline}</span></div><Link href="#contact" className="hia-en-cta">Get a free estimate →</Link></div>))}</div></div></section>
        <section className="hia-pr-sec" aria-labelledby="hia-pr-h"><div className="hia-inner" style={{ maxWidth: 760 }}><div className={`hia-s-reveal${vis.has('proc') ? ' hia-revealed' : ''}`} ref={el => { secRefs.current['proc'] = el; }}><span className="hia-s-eyebrow">How We Hire</span><h2 id="hia-pr-h" className="hia-s-title">Our AI Developer Hiring Process</h2><p className="hia-s-desc">From AI requirements to first commit in 3–5 business days — AI-specific vetting, your interview, optional proof-of-concept, and ongoing AI quality reviews.</p></div><div className="hia-psteps">{PROCESS_STEPS.map((step, i) => (<div key={step.num} className={`hia-pstep${vis.has('proc') ? ' hia-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}><div className="hia-pstep-l"><div className="hia-pstep-circle">{step.num}</div><div className="hia-pstep-connector" /></div><div className="hia-pstep-r"><div className="hia-pstep-title">{step.title}</div><p className="hia-pstep-desc">{step.desc}</p></div></div>))}</div></div></section>
        <section className="hia-te-sec" aria-labelledby="hia-te-h"><div className="hia-inner"><div className={`hia-center-head hia-s-reveal${vis.has('ts') ? ' hia-revealed' : ''}`} ref={el => { secRefs.current['ts'] = el; }}><span className="hia-s-eyebrow">Client Results</span><h2 id="hia-te-h" className="hia-s-title">What Our Clients Say</h2><p className="hia-s-desc">CTOs, Engineering Leads, and Product VPs across the US, UK, and Australia on hiring AI developers from 1Solutions.</p></div><div className="hia-tgrid" ref={teRef}>{TESTIMONIALS.map((t, i) => (<div key={i} className={`hia-tcard${t.feat ? ' feat' : ''}${vTe.includes(i) ? ' hia-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review"><div className="hia-stars">★★★★★</div><p className="hia-ttext" itemProp="reviewBody">{t.text}</p><div className="hia-tauthor"><div className="hia-tavatar" style={{ background: t.bg }}>{t.init}</div><div><div className="hia-tname" itemProp="author">{t.name}</div><div className="hia-trole">{t.role}</div></div></div></div>))}</div></div></section>
        <section className="hia-wy-sec" aria-labelledby="hia-wy-h"><div className="hia-inner"><div className={`hia-s-reveal${vis.has('wy') ? ' hia-revealed' : ''}`} ref={el => { secRefs.current['wy'] = el; }}><span className="hia-s-eyebrow">Why 1Solutions</span><h2 id="hia-wy-h" className="hia-s-title">Why Hire AI Developers From 1Solutions</h2><p className="hia-s-desc" style={{ maxWidth: 680 }}>Production AI experience, LLM-provider agnostic, RAG architecture depth, honest fine-tuning advice, cost and latency engineering, AI safety guardrails, Python and TypeScript coverage, and automated evaluation pipelines.</p></div><div className="hia-wy-grid" ref={whRef}>{WHY_CARDS.map((c, i) => (<div key={i} className={`hia-wcard${vWh.includes(i) ? ' hia-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}><div className="hia-wcard-dot" /><h3>{c.title}</h3><p>{c.desc}</p></div>))}</div></div></section>
        <section id="contact" className="hia-ct-sec" aria-labelledby="hia-ct-h"><div className="hia-ct-grid"><div><h2 id="hia-ct-h" className="hia-ctitle">Hire an AI Developer Today</h2><p className="hia-cdesc">Share your AI project requirements — LLM provider preferences, type of AI feature (RAG, agents, chatbot, search), existing tech stack, data privacy constraints, and start date — and we will shortlist pre-vetted AI developers within 24 business hours.</p><div className="hia-cbenefits">{[['✓','Shortlisted AI developers within 24 business hours'],['✓','AI-specific vetting — LLM APIs, RAG design, agent frameworks, evaluation'],['✓','Full-time, part-time, or hourly/project sprint — flexible from day one'],['✓','Optional 1–2 week paid AI proof-of-concept before longer engagement'],['✓','5-day rapid replacement guarantee — no penalty']].map(([icon, text]) => (<div className="hia-cbenefit" key={text}><span className="hia-cbenefit-icon">{icon}</span><p>{text}</p></div>))}</div></div>
        <div className="hia-form-box"><h3>Tell Us Your AI Requirements</h3><form className="hia-form" onSubmit={e => e.preventDefault()}>
          <div className="hia-frow"><div className="hia-fg"><label htmlFor="hia-name">Full Name *</label><input id="hia-name" type="text" placeholder="Your name" required /></div><div className="hia-fg"><label htmlFor="hia-email">Work Email *</label><input id="hia-email" type="email" placeholder="you@company.com" required /></div></div>
          <div className="hia-frow"><div className="hia-fg"><label htmlFor="hia-co">Company Name</label><input id="hia-co" type="text" placeholder="Your company" /></div><div className="hia-fg"><label htmlFor="hia-ph">Phone / WhatsApp</label><input id="hia-ph" type="tel" placeholder="+1 555 000 0000" /></div></div>
          <div className="hia-fg full"><label htmlFor="hia-eng">Engagement Type *</label><select id="hia-eng" required><option value="">Select engagement...</option><option>Full-Time Dedicated AI Developer (160 hrs/month)</option><option>Part-Time AI Developer (80 hrs/month)</option><option>Hourly / AI Project Sprint</option></select></div>
          <div className="hia-fg full"><label htmlFor="hia-type">Primary AI Use Case *</label><select id="hia-type" required><option value="">Select AI use case...</option><option>LLM Integration (GPT-4o / Claude / Gemini into existing product)</option><option>RAG System (AI Q&amp;A over company documents/data)</option><option>AI Agent / Agentic Workflow</option><option>AI Chatbot / Conversational AI</option><option>Semantic Search</option><option>Fine-Tuning (domain-specific model)</option><option>Multimodal AI (vision, audio, documents)</option><option>AI Architecture Review / Advisory</option></select></div>
          <div className="hia-fg full"><label htmlFor="hia-msg">Project Description *</label><textarea id="hia-msg" rows={4} placeholder="Describe your AI product/feature, current tech stack (Python / Node.js / Next.js), data privacy requirements (cloud API vs self-hosted), LLM provider preferences, team size, and start date..." required /></div>
          <div className="hia-consent"><input id="hia-con" type="checkbox" required /><label htmlFor="hia-con">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label></div>
          <button type="submit" className="hia-submit">Get Shortlisted AI Developers in 24 Hours →</button>
        </form></div></div></section>
        <section className="hia-fq-sec" aria-labelledby="hia-fq-h"><div className="hia-inner" style={{ maxWidth: 860 }}><span className="hia-s-eyebrow">FAQ</span><h2 id="hia-fq-h">Hiring AI Developers — FAQ</h2><p className="hia-fq-sub">Common questions about hiring AI developers — LLMs, RAG, agents, fine-tuning, APIs, costs, and production deployment.</p><div className="hia-faq-list">{FAQS.map((item, i) => (<div key={i} className={`hia-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="hia-fq-btn" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="hia-fq-badge">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{item.q}</span><svg className="hia-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="hia-fanswer-wrap" itemScope itemType="https://schema.org/Answer"><div className="hia-fanswer" itemProp="text">{item.a}</div></div></div>))}</div></div></section>
        <section className="hia-rel"><div className="hia-rel-inner"><span className="hia-s-eyebrow">Explore More</span><h2>Related Hire Developer Pages</h2><p className="hia-rel-sub">We also provide dedicated ML engineers, data scientists, blockchain developers, and full-stack engineering teams.</p><hr /><div className="hia-rtags">{[['/hire-ml-developer/','Hire ML Developer','hia-rtag-f'],['/hire-data-scientist/','Hire Data Scientist','hia-rtag-b'],['/hire-blockchain-developer/','Hire Blockchain Developer','hia-rtag-a'],['/hire-ar-developer/','Hire AR Developer','hia-rtag-g'],['/hire-javascript-developer/','Hire JavaScript Developer','hia-rtag-a'],['/hire-angularjs-developer/','Hire Angular Developer','hia-rtag-v'],['/cloud-native-services/','Cloud Native Services','hia-rtag-v'],['/software-development-company/','Software Development','hia-rtag-b']].map(([href, label, cls]) => (<Link key={href} href={href} className={`hia-rtag ${cls}`}>{label}</Link>))}</div></div></section>
      </div>
    </>
  );
}
