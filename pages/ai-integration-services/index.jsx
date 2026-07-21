import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { n:'01', title:'OpenAI & ChatGPT API Integration', desc:"Integrate GPT-4o, o3, and OpenAI's API suite into your application — chat interfaces, content generation pipelines, customer support automation, document analysis, and AI-powered search." },
  { n:'02', title:'Claude & Anthropic API Integration', desc:"Build with Anthropic's Claude models — known for long-context processing, safety, and nuanced reasoning. Ideal for document summarisation, customer support, legal and financial analysis, and complex reasoning tasks." },
  { n:'03', title:'Google Gemini & Vertex AI Integration', desc:"Integrate Google's Gemini models for multimodal AI workflows — processing text, images, video, and audio together. Vertex AI deployment for enterprise-grade scalability and Google Cloud ecosystem integration." },
  { n:'04', title:'RAG & Knowledge Base Systems', desc:'Retrieval-augmented generation (RAG) systems that connect AI models to your proprietary data — customer databases, product catalogues, documentation, and internal knowledge bases — for accurate, grounded AI responses.' },
  { n:'05', title:'AI Workflow Automation', desc:'Connect AI models to your existing workflows — CRM data enrichment, automated content generation, intelligent document processing, meeting summarisation, and email triage — using n8n, Zapier, Make, or custom pipelines.' },
  { n:'06', title:'Custom AI Application Development', desc:'Full-stack AI application development — from API selection and prompt engineering to UI, database design, and deployment. Web apps, internal tools, and customer-facing AI features built to production standards.' },
];

const FAQS = [
  { q:'What is AI integration and why does my business need it?', a:"AI integration is the process of connecting AI models and APIs — like OpenAI's ChatGPT, Anthropic's Claude, or Google's Gemini — to your existing business systems, workflows, and applications. Rather than using AI tools manually via browser interfaces, integration embeds AI capabilities directly into your products, websites, CRMs, and internal tools. Businesses that integrate AI see significant productivity improvements: automated content generation, intelligent customer support, faster data analysis, and reduced manual processing — all operating at scale without proportional headcount increases." },
  { q:'Which AI models do you integrate?', a:'We integrate all major commercial AI models: OpenAI GPT-4o, GPT-4.1, and o-series; Anthropic Claude Sonnet, Haiku, and Opus; Google Gemini Pro and Ultra via Vertex AI; Meta Llama via Groq or Together AI for open-source deployments; Mistral and Cohere for European or compliance-sensitive deployments; and custom fine-tuned models trained on proprietary data. Model selection depends on your use case — we recommend the right model for your task, cost constraints, and performance requirements.' },
  { q:'How long does an AI integration project take?', a:'Simple API integrations (a single AI feature — a chat widget, content generator, or email responder) typically take 2–4 weeks. Mid-complexity integrations (RAG systems connected to a knowledge base, multi-step AI pipelines, CRM integration) take 6–10 weeks. Full AI application development (a new product or complex multi-model workflow) takes 3–6 months. We provide a detailed project timeline after a technical discovery session.' },
  { q:'Is my data safe when integrating with OpenAI or other AI APIs?', a:"Data privacy in AI integrations depends on the provider's data handling terms and your implementation. OpenAI's API does not use your data to train models by default (unlike the ChatGPT consumer product). For sensitive data, we recommend: implementing data minimisation (send only what the AI needs), anonymising PII before sending to AI APIs, using enterprise agreements with providers that include data processing agreements, or deploying open-source models (Llama, Mistral) in your own cloud infrastructure where data never leaves your environment. We advise on the appropriate architecture for your compliance requirements." },
  { q:'Can you integrate AI into our existing website or CRM?', a:'Yes — this is the most common integration request. We integrate AI features into existing WordPress/Shopify/Next.js websites, Salesforce, HubSpot, Zoho, and custom CRMs, and internal tools built in any tech stack. The integration method depends on your platform: REST API calls, webhook-based pipelines, embedded chat interfaces, or backend AI processing triggered by user actions. We assess your existing tech stack in a discovery call and recommend the appropriate integration architecture.' },
];

const RELATED = [
  { href:'/ai-solutions/', label:'AI Solutions' },
  { href:'/ai-automation-services/', label:'AI Automation Services' },
  { href:'/ai-chatbot-development-services/', label:'AI Chatbot Development' },
  { href:'/ai-agent-development-services/', label:'AI Agent Development' },
  { href:'/generative-ai-services/', label:'Generative AI Services' },
  { href:'/ai-utilization-review/', label:'AI Utilization Review' },
  { href:'/web-development-services/', label:'Web Development' },
  { href:'/api-integration-services/', label:'API Integration' },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Head>
        <title>{`AI Integration Services | Connect AI Tools to Your Business | 1Solutions`}</title>
        <meta name="description" content={`AI integration services — connect OpenAI, Claude, Gemini, and custom AI models to your website, CRM, and workflows. Expert API integration for US, Canada & Australia.`} />
        <link rel="canonical" href="https://www.1solutions.biz/ai-integration-services/" />
        <meta property="og:title" content={`AI Integration Services | Connect AI Tools to Your Business | 1Solutions`} />
        <meta property="og:description" content={`AI integration services — connect OpenAI, Claude, Gemini, and custom AI models to your website, CRM, and workflows. Expert API integration for US, Canada & Australia.`} />
        <meta property="og:url" content="https://www.1solutions.biz/ai-integration-services/" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org',
          '@type':'ProfessionalService',
          name:'1Solutions — AI Integration Services',
          url:'https://www.1solutions.biz/ai-integration-services/',
          telephone:'+91-9654327900',
          areaServed:['US','CA','AU','GB'],
          aggregateRating:{'@type':'AggregateRating',ratingValue:'4.9',reviewCount:'150',bestRating:'5'},
          mainEntity:FAQS.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})),
        }) }} />
        <style>{`
          .aiint-btn-p{display:inline-flex;align-items:center;gap:8px;background:#D97706;color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(217,119,6,0.35)}
          .aiint-btn-p:hover{background:#B45309;transform:translateY(-2px)}
          .aiint-svc{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px}
          .aiint-svc-inner{max-width:1280px;margin:0 auto}
          .aiint-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .aiint-sec-h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 12px}
          .aiint-sec-p{font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 0 44px}
          .aiint-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          .aiint-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);transition:transform .25s,box-shadow .25s,border-color .25s}
          .aiint-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,0.30);box-shadow:0 14px 42px rgba(15,52,96,0.10)}
          .aiint-card-n{position:absolute;top:6px;right:12px;font-size:64px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;pointer-events:none}
          .aiint-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin:0 0 8px;position:relative;z-index:1}
          .aiint-card p{font-size:13px;color:#4A6080;line-height:1.6;margin:0;position:relative;z-index:1}
          .aiint-faq{background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:80px 40px}
          .aiint-faq-inner{max-width:860px;margin:0 auto}
          .aiint-faq-item{border-bottom:1px solid rgba(15,52,96,0.08)}
          .aiint-faq-q{width:100%;background:none;border:none;text-align:left;padding:20px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .aiint-faq-q:hover{color:#D97706}
          .aiint-faq-icon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .aiint-faq-item.open .aiint-faq-icon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .aiint-faq-a{font-size:0.91rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .aiint-faq-item.open .aiint-faq-a{max-height:600px;padding-bottom:20px}
          .aiint-cta{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 100%);padding:70px 40px;text-align:center}
          .aiint-cta h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#fff;margin:0 0 12px;line-height:1.2}
          .aiint-cta p{font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 28px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
          .aiint-related{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:60px 40px}
          .aiint-rel-inner{max-width:1280px;margin:0 auto}
          .aiint-rel-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .aiint-rel-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,0.12);color:#0F3460;transition:all .2s}
          .aiint-rel-tag:hover{border-color:#D97706;color:#D97706;background:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(15,52,96,0.08)}
          @media(max-width:1024px){.aiint-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){
            .aiint-svc,.aiint-faq,.aiint-cta,.aiint-related{padding:60px 20px}
            .aiint-grid{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <ServiceHero
        eyebrow="1Solutions AI Practice"
        title={<>AI Integration Services — <AuroraText>Connect AI to Your Business Systems</AuroraText></>}
        subtext="From ChatGPT API to custom LLM integrations — we connect AI models to your website, CRM, eCommerce platform, and internal tools so your business runs smarter, not just harder."
        primaryCta={{ label: 'Get a Free Consultation →', href: '#contact' }}
        secondaryCta={{ label: 'View Services', href: '#services' }}
        stats={[
          { label: 'AI Integrations Delivered', value: '200', suffix: '+' },
          { label: 'AI Models Integrated', value: '15', suffix: '+' },
          { label: 'Years Tech Experience', value: '15', suffix: '+' },
          { label: 'Client Retention', value: '97', suffix: '%' },
        ]}
      />

      <section className="aiint-svc" id="services">
        <div className="aiint-svc-inner">
          <span className="aiint-sec-ey">What We Do</span>
          <h2 className="aiint-sec-h2">AI Integration Services We Offer</h2>
          <p className="aiint-sec-p">Expert ai integration services for businesses in the US, Canada, and Australia — from strategy through implementation and ongoing optimization.</p>
          <div className="aiint-grid">
            {SERVICES.map(s => (
              <div className="aiint-card" key={s.n}>
                <span className="aiint-card-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aiint-faq" id="faq">
        <div className="aiint-faq-inner">
          <span className="aiint-sec-ey">Got Questions?</span>
          <h2 className="aiint-sec-h2">AI Integration Services — Frequently Asked Questions</h2>
          <div style={{marginTop:32}}>
            {FAQS.map((f,i) => (
              <div className={`aiint-faq-item${openFaq===i?' open':''}`} key={f.q}>
                <button className="aiint-faq-q" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                  {f.q}<span className="aiint-faq-icon">{openFaq===i?'−':'+'}</span>
                </button>
                <div className="aiint-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aiint-cta" id="contact">
        <h2>Ready to Get Started with AI Integration Services?</h2>
        <p>Speak to our team for a free, no-obligation consultation. We'll assess your current position and recommend the right strategy.</p>
        <Link href="/contact-us/" className="aiint-btn-p">Book a Free Consultation →</Link>
      </section>

      <section className="aiint-related">
        <div className="aiint-rel-inner">
          <span className="aiint-sec-ey">Related Services</span>
          <h2 className="aiint-sec-h2" style={{fontSize:'1.5rem',margin:'0'}}>Explore Related Offerings</h2>
          <div className="aiint-rel-tags">
            {RELATED.map(r => <Link key={r.href} href={r.href} className="aiint-rel-tag">{r.label}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
