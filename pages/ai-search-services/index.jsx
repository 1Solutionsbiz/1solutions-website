import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { n:'01', title:'ChatGPT & SearchGPT Optimization', desc:"Optimise your content and brand signals to appear as a cited source in ChatGPT responses and OpenAI's SearchGPT — including structured data, E-E-A-T signals, and entity authority." },
  { n:'02', title:'Google AI Overviews Optimization', desc:"Ensure your brand is cited in Google's AI Overviews by building the authoritative, well-structured content that Google's generative AI pulls from when answering queries." },
  { n:'03', title:'Perplexity AI Visibility', desc:"Optimise for Perplexity AI citations through source authority building, structured content, and entity optimization — appearing in Perplexity's cited web sources for high-value queries." },
  { n:'04', title:'Meta AI Optimization', desc:"Build visibility in Meta AI across Facebook, Instagram, WhatsApp, and Messenger — through social authority signals, knowledge graph presence, and content that Meta's AI surfaces." },
  { n:'05', title:'Answer Engine Optimization (AEO)', desc:'Structure content to be selected as the direct answer across all AI and traditional answer surfaces — featured snippets, PAA boxes, AI Overviews, and voice search results.' },
  { n:'06', title:'AI Brand Monitoring', desc:"Track where your brand appears (and where it doesn't) across all major AI search platforms — ChatGPT, Perplexity, Gemini, Meta AI, and SearchGPT — with monthly citation reports." },
];

const FAQS = [
  { q:'What are AI Search Services?', a:"AI Search Services are a category of digital marketing services focused on optimising your brand's visibility in AI-powered search engines and chatbots — including ChatGPT, Perplexity, Google AI Overviews, SearchGPT, and Meta AI. Unlike traditional SEO which focuses on ranking in Google's blue-link results, AI Search Services focus on earning citations, mentions, and recommendations within AI-generated answers. As consumers increasingly use AI chatbots as their first point of search, appearing in AI responses is becoming as important as appearing in Google search results." },
  { q:'How is AI search different from traditional Google search?', a:'Traditional Google search returns a list of links ranked by relevance and authority. AI-powered search engines like ChatGPT, Perplexity, and Google AI Overviews generate a synthesised answer using information from multiple sources — citing some and ignoring others. Being cited in an AI answer requires different optimisation signals: entity authority, source credibility, structured content, topical expertise, and brand mentions across authoritative third-party sources. AI search also tends to favour brands with a clear, consistent digital presence rather than pages optimised purely for traditional ranking factors.' },
  { q:'Which AI search platforms do you optimise for?', a:'We optimise for all major AI search surfaces: Google AI Overviews and Gemini, ChatGPT and OpenAI SearchGPT, Perplexity AI, Meta AI (Facebook, Instagram, WhatsApp), Microsoft Copilot and Bing AI, Apple Intelligence, and voice assistants including Google Assistant, Siri, and Alexa. The optimisation approach varies by platform — some weight structured data, others weight entity authority, brand mentions, or topical depth — and we tailor strategy to each surface.' },
  { q:'How long does it take to see results in AI search?', a:'AI citation visibility typically improves within 2–4 months for brands with existing domain authority and content depth. For newer or lower-authority domains, 4–8 months is more realistic. AI systems are updated frequently — Perplexity and ChatGPT refresh their knowledge continuously, while Google AI Overviews respond to algorithm updates. We track citation frequency monthly and report on which queries your brand appears in, so progress is measurable rather than anecdotal.' },
  { q:'Can you guarantee my brand will appear in ChatGPT answers?', a:'No agency can guarantee specific citations in AI-generated responses — AI systems determine citations algorithmically based on authority, relevance, and content quality signals. What we can guarantee is a systematic approach to building the signals that make AI citation more likely: authoritative content, entity optimization, E-E-A-T signals, third-party brand mentions, and structured data. Brands that complete our AI search optimization program consistently report higher citation frequency across all major AI platforms.' },
];

const RELATED = [
  { href:'/answer-engine-optimization-services/', label:'Answer Engine Optimization' },
  { href:'/ai-seo-services/', label:'AI SEO Services' },
  { href:'/generative-engine-optimization-services/', label:'Generative Engine Optimization' },
  { href:'/chatgpt-seo/', label:'ChatGPT SEO' },
  { href:'/perplexity-ai-seo/', label:'Perplexity AI SEO' },
  { href:'/google-ai-seo/', label:'Google AI SEO' },
  { href:'/seo-services-company/', label:'SEO Services' },
  { href:'/content-marketing-services/', label:'Content Marketing' },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Head>
        <title>{`AI Search Services | ChatGPT, Perplexity & AI Visibility | 1Solutions`}</title>
        <meta name="description" content={`AI search optimization services — get cited in ChatGPT, Perplexity, Google AI Overviews, SearchGPT & Meta AI. 15+ years experience, US, Canada & Australia.`} />
        <link rel="canonical" href="https://www.1solutions.biz/ai-search-services/" />
        <meta property="og:title" content={`AI Search Services | ChatGPT, Perplexity & AI Visibility | 1Solutions`} />
        <meta property="og:description" content={`AI search optimization services — get cited in ChatGPT, Perplexity, Google AI Overviews, SearchGPT & Meta AI. 15+ years experience, US, Canada & Australia.`} />
        <meta property="og:url" content="https://www.1solutions.biz/ai-search-services/" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org',
          '@type':'ProfessionalService',
          name:'1Solutions — AI Search Services',
          url:'https://www.1solutions.biz/ai-search-services/',
          telephone:'+91-9654327900',
          areaServed:['US','CA','AU','GB'],
          aggregateRating:{'@type':'AggregateRating',ratingValue:'4.9',reviewCount:'150',bestRating:'5'},
          mainEntity:FAQS.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})),
        }) }} />
        <style>{`
          .ais-btn-p{display:inline-flex;align-items:center;gap:8px;background:#D97706;color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(217,119,6,0.35)}
          .ais-btn-p:hover{background:#B45309;transform:translateY(-2px)}
          .ais-svc{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px}
          .ais-svc-inner{max-width:1280px;margin:0 auto}
          .ais-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .ais-sec-h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 12px}
          .ais-sec-p{font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 0 44px}
          .ais-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          .ais-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);transition:transform .25s,box-shadow .25s,border-color .25s}
          .ais-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,0.30);box-shadow:0 14px 42px rgba(15,52,96,0.10)}
          .ais-card-n{position:absolute;top:6px;right:12px;font-size:64px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;pointer-events:none}
          .ais-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin:0 0 8px;position:relative;z-index:1}
          .ais-card p{font-size:13px;color:#4A6080;line-height:1.6;margin:0;position:relative;z-index:1}
          .ais-faq{background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:80px 40px}
          .ais-faq-inner{max-width:860px;margin:0 auto}
          .ais-faq-item{border-bottom:1px solid rgba(15,52,96,0.08)}
          .ais-faq-q{width:100%;background:none;border:none;text-align:left;padding:20px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .ais-faq-q:hover{color:#D97706}
          .ais-faq-icon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .ais-faq-item.open .ais-faq-icon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .ais-faq-a{font-size:0.91rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .ais-faq-item.open .ais-faq-a{max-height:600px;padding-bottom:20px}
          .ais-cta{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 100%);padding:70px 40px;text-align:center}
          .ais-cta h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#fff;margin:0 0 12px;line-height:1.2}
          .ais-cta p{font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 28px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
          .ais-related{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:60px 40px}
          .ais-rel-inner{max-width:1280px;margin:0 auto}
          .ais-rel-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .ais-rel-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,0.12);color:#0F3460;transition:all .2s}
          .ais-rel-tag:hover{border-color:#D97706;color:#D97706;background:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(15,52,96,0.08)}
          @media(max-width:1024px){.ais-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){
            .ais-svc,.ais-faq,.ais-cta,.ais-related{padding:60px 20px}
            .ais-grid{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <ServiceHero
        eyebrow="1Solutions AI Practice"
        title={<>AI Search Services — <AuroraText>Be Found Everywhere AI Answers</AuroraText></>}
        subtext="People are searching in ChatGPT, Perplexity, Google AI Overviews, and Meta AI — not just Google. We help your brand get cited, recommended, and found across every AI-powered search surface."
        primaryCta={{ label: 'Get a Free Consultation →', href: '#contact' }}
        secondaryCta={{ label: 'View Services', href: '#services' }}
        stats={[
          { label: 'AI Platforms Optimised', value: '12', suffix: '+' },
          { label: 'Brands Cited in AI', value: '300', suffix: '+' },
          { label: 'Years SEO Experience', value: '15', suffix: '+' },
          { label: 'Client Retention', value: '97', suffix: '%' },
        ]}
      />

      <section className="ais-svc" id="services">
        <div className="ais-svc-inner">
          <span className="ais-sec-ey">What We Do</span>
          <h2 className="ais-sec-h2">AI Search Services We Offer</h2>
          <p className="ais-sec-p">Expert ai search services for businesses in the US, Canada, and Australia — from strategy through implementation and ongoing optimization.</p>
          <div className="ais-grid">
            {SERVICES.map(s => (
              <div className="ais-card" key={s.n}>
                <span className="ais-card-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ais-faq" id="faq">
        <div className="ais-faq-inner">
          <span className="ais-sec-ey">Got Questions?</span>
          <h2 className="ais-sec-h2">AI Search Services — Frequently Asked Questions</h2>
          <div style={{marginTop:32}}>
            {FAQS.map((f,i) => (
              <div className={`ais-faq-item${openFaq===i?' open':''}`} key={f.q}>
                <button className="ais-faq-q" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                  {f.q}<span className="ais-faq-icon">{openFaq===i?'−':'+'}</span>
                </button>
                <div className="ais-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ais-cta" id="contact">
        <h2>Ready to Get Started with AI Search Services?</h2>
        <p>Speak to our team for a free, no-obligation consultation. We'll assess your current position and recommend the right strategy.</p>
        <Link href="/contact-us/" className="ais-btn-p">Book a Free Consultation →</Link>
      </section>

      <section className="ais-related">
        <div className="ais-rel-inner">
          <span className="ais-sec-ey">Related Services</span>
          <h2 className="ais-sec-h2" style={{fontSize:'1.5rem',margin:'0'}}>Explore Related Offerings</h2>
          <div className="ais-rel-tags">
            {RELATED.map(r => <Link key={r.href} href={r.href} className="ais-rel-tag">{r.label}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
