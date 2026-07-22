import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { n:'01', title:'Entity Authority Building', desc:"Establish your brand as a recognised entity in ChatGPT's training and retrieval data — through Wikipedia-style content, structured data, knowledge graph signals, and authoritative brand mentions across the web." },
  { n:'02', title:'E-E-A-T Content Optimization', desc:'Build the Experience, Expertise, Authoritativeness, and Trustworthiness signals that ChatGPT uses to evaluate source credibility — author bios, credentials, original research, and cited expert opinions.' },
  { n:'03', title:'Source Citation Analysis', desc:'Audit which sources ChatGPT currently cites for your priority queries — identifying the content formats, structural patterns, and authority signals shared by cited pages, then replicating and surpassing them.' },
  { n:'04', title:'Structured Content Creation', desc:'Create the in-depth, well-structured content that ChatGPT retrieves and cites — comprehensive guides, authoritative definitions, comparison content, and expert commentary that answers the questions your audience asks AI.' },
  { n:'05', title:'Brand Mention Acquisition', desc:'Build the third-party brand mentions, press coverage, and editorial links that signal brand authority to AI systems — the same signals that increase ChatGPT citation frequency over time.' },
  { n:'06', title:'ChatGPT Citation Monitoring', desc:'Track how often and in what context your brand appears in ChatGPT responses for your priority queries — monthly reporting on citation frequency, sentiment, and comparison against key competitors.' },
];

const FAQS = [
  { q:'How does ChatGPT decide which brands to cite?', a:'ChatGPT uses a combination of its training data (information absorbed during model training) and retrieval-augmented generation (RAG) for ChatGPT Search — pulling real-time web content for current queries. Citation decisions are influenced by: source authority (domain strength, backlink profile, E-E-A-T signals), content relevance (semantic match to the query), brand mention frequency across authoritative sources, structured data clarity, and content depth on the topic. Brands with comprehensive, authoritative content on a topic are more likely to be cited than those with thin or absent coverage.' },
  { q:'Is ChatGPT SEO the same as traditional SEO?', a:'ChatGPT SEO shares the same foundational principles as traditional SEO — authoritative content, E-E-A-T signals, structured data, and strong domain authority — but the optimisation focus is different. Traditional SEO targets ranking position in blue-link results. ChatGPT SEO targets inclusion in AI-generated answers, which prioritises entity clarity, content comprehensiveness, and third-party brand authority over traditional ranking signals like click-through rate or bounce rate. The two strategies are complementary and reinforce each other.' },
  { q:'How long until my brand appears in ChatGPT answers?', a:"For established domains with existing authority, initial citation improvements are typically visible within 2–3 months of implementing entity optimization and content improvements. For newer domains or industries where your brand has limited web presence, 4–6 months is more realistic. ChatGPT's retrieval system for ChatGPT Search updates in near real-time, while the base model training updates less frequently. We track citation frequency monthly so you can see measurable progress." },
  { q:'Which industries benefit most from ChatGPT SEO?', a:"B2B SaaS, professional services (legal, finance, accounting, consulting), healthcare and medical, technology and software, eCommerce, and any industry where buyers research products or services via conversational AI queries. ChatGPT is particularly widely used for comparison queries ('best X for Y'), how-to research, product recommendations, and vendor shortlisting — making ChatGPT citation especially valuable for businesses competing on consideration-stage searches." },
  { q:'What content formats does ChatGPT cite most?', a:'ChatGPT tends to cite comprehensive guides, authoritative comparison content, definition-style explanations, original research and data, and content from recognisable brand sources with clear E-E-A-T signals. Long-form, in-depth content on a topic consistently outperforms thin pages. Schema markup (HowTo, FAQPage, Article) improves structured data clarity. First-person expert content with clear author credentials and original insights scores higher on trust signals than generic informational content.' },
];

const RELATED = [
  { href:'/ai-search-services/', label:'AI Search Services' },
  { href:'/searchgpt-seo/', label:'SearchGPT SEO' },
  { href:'/answer-engine-optimization-services/', label:'Answer Engine Optimization' },
  { href:'/generative-engine-optimization-services/', label:'Generative Engine Optimization' },
  { href:'/ai-seo-services/', label:'AI SEO Services' },
  { href:'/google-ai-seo/', label:'Google AI SEO' },
  { href:'/seo-services-company/', label:'SEO Services' },
  { href:'/content-marketing-services/', label:'Content Marketing' },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Head>
        <title>{`ChatGPT SEO Services | Get Cited in ChatGPT Answers | 1Solutions`}</title>
        <meta name="description" content={`ChatGPT SEO services — optimise your brand to appear as a cited source in ChatGPT responses and OpenAI SearchGPT. Expert AI citation optimization for US & Australia.`} />
        <link rel="canonical" href="https://www.1solutions.biz/chatgpt-seo/" />
        <meta property="og:title" content={`ChatGPT SEO Services | Get Cited in ChatGPT Answers | 1Solutions`} />
        <meta property="og:description" content={`ChatGPT SEO services — optimise your brand to appear as a cited source in ChatGPT responses and OpenAI SearchGPT. Expert AI citation optimization for US & Australia.`} />
        <meta property="og:url" content="https://www.1solutions.biz/chatgpt-seo/" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org',
          '@type':'ProfessionalService',
          name:'1Solutions — ChatGPT SEO Services',
          url:'https://www.1solutions.biz/chatgpt-seo/',
          telephone:'+91-9654327900',
          areaServed:['US','CA','AU','GB'],
          aggregateRating:{'@type':'AggregateRating',ratingValue:'4.9',reviewCount:'150',bestRating:'5'},
          mainEntity:FAQS.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})),
        }) }} />
        <style>{`
          .cgpt-btn-p{display:inline-flex;align-items:center;gap:8px;background:#D97706;color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(217,119,6,0.35)}
          .cgpt-btn-p:hover{background:#B45309;transform:translateY(-2px)}
          .cgpt-svc{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px}
          .cgpt-svc-inner{max-width:1280px;margin:0 auto}
          .cgpt-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .cgpt-sec-h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 12px}
          .cgpt-sec-p{font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 0 44px}
          .cgpt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          .cgpt-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);transition:transform .25s,box-shadow .25s,border-color .25s}
          .cgpt-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,0.30);box-shadow:0 14px 42px rgba(15,52,96,0.10)}
          .cgpt-card-n{position:absolute;top:6px;right:12px;font-size:64px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;pointer-events:none}
          .cgpt-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin:0 0 8px;position:relative;z-index:1}
          .cgpt-card p{font-size:13px;color:#4A6080;line-height:1.6;margin:0;position:relative;z-index:1}
          .cgpt-faq{background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:80px 40px}
          .cgpt-faq-inner{max-width:860px;margin:0 auto}
          .cgpt-faq-item{border-bottom:1px solid rgba(15,52,96,0.08)}
          .cgpt-faq-q{width:100%;background:none;border:none;text-align:left;padding:20px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .cgpt-faq-q:hover{color:#D97706}
          .cgpt-faq-icon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .cgpt-faq-item.open .cgpt-faq-icon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .cgpt-faq-a{font-size:0.91rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .cgpt-faq-item.open .cgpt-faq-a{max-height:600px;padding-bottom:20px}
          .cgpt-cta{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 100%);padding:70px 40px;text-align:center}
          .cgpt-cta h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#fff;margin:0 0 12px;line-height:1.2}
          .cgpt-cta p{font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 28px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
          .cgpt-related{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:60px 40px}
          .cgpt-rel-inner{max-width:1280px;margin:0 auto}
          .cgpt-rel-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .cgpt-rel-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,0.12);color:#0F3460;transition:all .2s}
          .cgpt-rel-tag:hover{border-color:#D97706;color:#D97706;background:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(15,52,96,0.08)}
          @media(max-width:1024px){.cgpt-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){
            .cgpt-svc,.cgpt-faq,.cgpt-cta,.cgpt-related{padding:60px 20px}
            .cgpt-grid{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <ServiceHero
        eyebrow="1Solutions AI Practice"
        title={<>ChatGPT SEO Services — <AuroraText>Get Your Brand Cited in ChatGPT</AuroraText></>}
        subtext="Over 200 million people use ChatGPT weekly. When they ask about your industry, your competitors, or your services — is your brand part of the answer? We build the authority signals that make ChatGPT cite your brand."
        primaryCta={{ label: 'Get a Free Consultation', href: '#contact' }}
        secondaryCta={{ label: 'View Services', href: '#services' }}
        stats={[
          { label: 'Brands Optimised for ChatGPT', value: '150', suffix: '+' },
          { label: 'Avg Citation Increase', value: '3', suffix: 'x' },
          { label: 'Years SEO Experience', value: '15', suffix: '+' },
          { label: 'Client Retention', value: '97', suffix: '%' },
        ]}
      />

      <section className="cgpt-svc" id="services">
        <div className="cgpt-svc-inner">
          <span className="cgpt-sec-ey">What We Do</span>
          <h2 className="cgpt-sec-h2">ChatGPT SEO Services We Offer</h2>
          <p className="cgpt-sec-p">Expert chatgpt seo services for businesses in the US, Canada, and Australia — from strategy through implementation and ongoing optimization.</p>
          <div className="cgpt-grid">
            {SERVICES.map(s => (
              <div className="cgpt-card" key={s.n}>
                <span className="cgpt-card-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cgpt-faq" id="faq">
        <div className="cgpt-faq-inner">
          <span className="cgpt-sec-ey">Got Questions?</span>
          <h2 className="cgpt-sec-h2">ChatGPT SEO Services — Frequently Asked Questions</h2>
          <div style={{marginTop:32}}>
            {FAQS.map((f,i) => (
              <div className={`cgpt-faq-item${openFaq===i?' open':''}`} key={f.q}>
                <button className="cgpt-faq-q" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                  {f.q}<span className="cgpt-faq-icon">{openFaq===i?'−':'+'}</span>
                </button>
                <div className="cgpt-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cgpt-cta" id="contact">
        <h2>Ready to Get Started with ChatGPT SEO Services?</h2>
        <p>Speak to our team for a free, no-obligation consultation. We'll assess your current position and recommend the right strategy.</p>
        <Link href="/contact-us/" className="cgpt-btn-p">Book a Free Consultation →</Link>
      </section>

      <section className="cgpt-related">
        <div className="cgpt-rel-inner">
          <span className="cgpt-sec-ey">Related Services</span>
          <h2 className="cgpt-sec-h2" style={{fontSize:'1.5rem',margin:'0'}}>Explore Related Offerings</h2>
          <div className="cgpt-rel-tags">
            {RELATED.map(r => <Link key={r.href} href={r.href} className="cgpt-rel-tag">{r.label}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
