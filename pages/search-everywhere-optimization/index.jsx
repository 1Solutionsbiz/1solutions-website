import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { n:'01', title:'Google & Traditional Search', desc:'Full technical SEO, content strategy, and link building for dominance in Google and Bing blue-link results — the still-dominant search surface for commercial and high-intent queries.' },
  { n:'02', title:'AI Search Optimization', desc:'Optimize for ChatGPT, Perplexity, Google AI Overviews, SearchGPT, and Meta AI citations — building the entity authority and content depth that AI search engines retrieve and recommend.' },
  { n:'03', title:'Social Search Optimization', desc:'Build discovery on TikTok Search, Instagram Search, Pinterest, and YouTube Search — where younger audiences and product discovery searches are increasingly happening outside traditional search engines.' },
  { n:'04', title:'Voice & Assistant Search', desc:'Optimize for Siri, Google Assistant, Alexa, and Cortana voice queries — conversational keyword targeting, featured snippet capture, and local search optimization for hands-free search surfaces.' },
  { n:'05', title:'Amazon & Marketplace Search', desc:'Product listing optimization, A+ content, sponsored placements, and review strategy for Amazon, Etsy, and other marketplace search surfaces where product searches increasingly bypass Google.' },
  { n:'06', title:'YouTube & Video Search', desc:'YouTube SEO — keyword-optimized titles, descriptions, chapters, and closed captions — combined with video schema markup to surface your video content in Google video results and YouTube search simultaneously.' },
];

const FAQS = [
  { q:'What is Search Everywhere Optimization?', a:"Search Everywhere Optimization (SEO for every surface) is the strategy of building your brand's search visibility across all platforms where your audience discovers content, not just Google. The modern buyer journey spans Google, ChatGPT, TikTok, YouTube, Amazon, Instagram, voice assistants, and AI-powered search tools. Search Everywhere Optimization ensures your brand appears — consistently and credibly — at every touchpoint where your audience is searching, rather than optimising for a single platform that represents a diminishing share of total search activity." },
  { q:'Is Google search declining in importance?', a:"Google remains the world's largest search engine and the primary driver of organic traffic for most businesses. However, its share of all 'search' activity is declining as searches shift to YouTube, TikTok (especially for Gen Z), Amazon (for product queries), ChatGPT and Perplexity (for research and information), and social platforms for discovery. Google itself is evolving with AI Overviews that reduce click-through rates for informational queries. A Search Everywhere strategy ensures you capture demand across the full landscape — reducing dependency on any single platform while maximising total reach." },
  { q:'Do you optimize for TikTok and Instagram search?', a:'Yes. TikTok search is now used by over half of Gen Z as a primary discovery tool for restaurants, products, and services. Instagram is used heavily for local business and product discovery. We create platform-specific keyword strategies, content structures, and hashtag frameworks for TikTok and Instagram that improve algorithmic distribution and in-platform search visibility — working alongside your existing Google SEO rather than replacing it.' },
  { q:'How do you measure success across all search surfaces?', a:'Each search surface has its own measurable metrics: Google ranks and organic traffic (GSC, Ahrefs); AI citation frequency (custom query tracking across ChatGPT, Perplexity, Gemini); YouTube ranking and views (YouTube Analytics, TubeBuddy); Amazon listing rank and sales metrics; voice search featured snippet share (GSC impressions for voice queries); and social platform reach and profile search impressions. We consolidate reporting across all surfaces into a unified monthly dashboard so you can see your total search presence in one place.' },
  { q:'Where should I start with Search Everywhere Optimization?', a:'Start with the channels where your audience already searches most — which varies significantly by industry, audience demographic, and product type. B2B services typically prioritise Google + AI search + LinkedIn. Consumer products often prioritise Google + Amazon + TikTok + Instagram. Local businesses prioritise Google + Maps + voice search. We begin every Search Everywhere engagement with an audience search behaviour audit — mapping where your specific audience searches before recommending a channel prioritisation.' },
];

const RELATED = [
  { href:'/ai-search-services/', label:'AI Search Services' },
  { href:'/ai-seo-services/', label:'AI SEO Services' },
  { href:'/answer-engine-optimization-services/', label:'Answer Engine Optimization' },
  { href:'/seo-services-company/', label:'SEO Services' },
  { href:'/social-media-marketing-services/', label:'Social Media Marketing' },
  { href:'/youtube-seo-services/', label:'YouTube SEO' },
  { href:'/amazon-seo-services/', label:'Amazon SEO' },
  { href:'/local-seo-services/', label:'Local SEO' },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <Head>
        <title>{`Search Everywhere Optimization Services | All Search Surfaces | 1Solutions`}</title>
        <meta name="description" content={`Search Everywhere Optimization — dominate Google, ChatGPT, Perplexity, TikTok, YouTube, Amazon, and AI search. Full-spectrum search visibility for US & Australia businesses.`} />
        <link rel="canonical" href="https://www.1solutions.biz/search-everywhere-optimization/" />
        <meta property="og:title" content={`Search Everywhere Optimization Services | All Search Surfaces | 1Solutions`} />
        <meta property="og:description" content={`Search Everywhere Optimization — dominate Google, ChatGPT, Perplexity, TikTok, YouTube, Amazon, and AI search. Full-spectrum search visibility for US & Australia businesses.`} />
        <meta property="og:url" content="https://www.1solutions.biz/search-everywhere-optimization/" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-search-everywhere-optimization.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions Search Everywhere Optimization" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-search-everywhere-optimization.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Search Everywhere Optimization" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context':'https://schema.org',
          '@type':'ProfessionalService',
          name:'1Solutions — Search Everywhere Optimization',
          url:'https://www.1solutions.biz/search-everywhere-optimization/',
          telephone:'+91-9654327900',
          areaServed:['US','CA','AU','GB'],
          aggregateRating:{'@type':'AggregateRating',ratingValue:'4.9',reviewCount:'150',bestRating:'5'},
          mainEntity:FAQS.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}})),
        }) }} />
        <style>{`
          .seev-btn-p{display:inline-flex;align-items:center;gap:8px;background:#D97706;color:#fff;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.93rem;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(217,119,6,0.35)}
          .seev-btn-p:hover{background:#B45309;transform:translateY(-2px)}
          .seev-svc{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px}
          .seev-svc-inner{max-width:1280px;margin:0 auto}
          .seev-sec-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:12px}
          .seev-sec-h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 12px}
          .seev-sec-p{font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 0 44px}
          .seev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
          .seev-card{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);transition:transform .25s,box-shadow .25s,border-color .25s}
          .seev-card:hover{transform:translateY(-5px);border-color:rgba(217,119,6,0.30);box-shadow:0 14px 42px rgba(15,52,96,0.10)}
          .seev-card-n{position:absolute;top:6px;right:12px;font-size:64px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;pointer-events:none}
          .seev-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin:0 0 8px;position:relative;z-index:1}
          .seev-card p{font-size:13px;color:#4A6080;line-height:1.6;margin:0;position:relative;z-index:1}
          .seev-faq{background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:80px 40px}
          .seev-faq-inner{max-width:860px;margin:0 auto}
          .seev-faq-item{border-bottom:1px solid rgba(15,52,96,0.08)}
          .seev-faq-q{width:100%;background:none;border:none;text-align:left;padding:20px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .seev-faq-q:hover{color:#D97706}
          .seev-faq-icon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all .2s;margin-top:2px}
          .seev-faq-item.open .seev-faq-icon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .seev-faq-a{font-size:0.91rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height .35s ease,padding-bottom .35s ease}
          .seev-faq-item.open .seev-faq-a{max-height:600px;padding-bottom:20px}
          .seev-cta{background:linear-gradient(135deg,#0F3460 0%,#1a1a5e 100%);padding:70px 40px;text-align:center}
          .seev-cta h2{font-size:clamp(1.8rem,3vw,2.4rem);font-weight:900;color:#fff;margin:0 0 12px;line-height:1.2}
          .seev-cta p{font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 28px;max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7}
          .seev-related{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:60px 40px}
          .seev-rel-inner{max-width:1280px;margin:0 auto}
          .seev-rel-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
          .seev-rel-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,0.12);color:#0F3460;transition:all .2s}
          .seev-rel-tag:hover{border-color:#D97706;color:#D97706;background:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(15,52,96,0.08)}
          @media(max-width:1024px){.seev-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){
            .seev-svc,.seev-faq,.seev-cta,.seev-related{padding:60px 20px}
            .seev-grid{grid-template-columns:1fr}
          }
        `}</style>
      </Head>

      <ServiceHero
        eyebrow="Search Everywhere Optimization · AI Search Practice"
        title={<>Search Everywhere Optimization - <AuroraText>Be Found on Every Search Surface</AuroraText></>}
        subtext="Your customers no longer search only on Google. They ask ChatGPT, browse TikTok, search Amazon, use voice assistants, and query Perplexity AI. Search Everywhere Optimization builds your presence across all of them."
        primaryCta={{ label: 'Get a Free Consultation', href: '#contact' }}
        secondaryCta={{ label: 'View Services', href: '#services' }}
        stats={[
          { label: 'Search Surfaces Optimised', value: '15', suffix: '+' },
          { label: 'Brands Ranked Everywhere', value: '250', suffix: '+' },
          { label: 'Years SEO Experience', value: '15', suffix: '+' },
          { label: 'Client Retention', value: '97', suffix: '%' },
        ]}
      />

      <section className="seev-svc" id="services">
        <div className="seev-svc-inner">
          <span className="seev-sec-ey">What We Do</span>
          <h2 className="seev-sec-h2">Search Everywhere Optimization We Offer</h2>
          <p className="seev-sec-p">Expert search everywhere optimization for businesses in the US, Canada, and Australia — from strategy through implementation and ongoing optimization.</p>
          <div className="seev-grid">
            {SERVICES.map(s => (
              <div className="seev-card" key={s.n}>
                <span className="seev-card-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="seev-faq" id="faq">
        <div className="seev-faq-inner">
          <span className="seev-sec-ey">Got Questions?</span>
          <h2 className="seev-sec-h2">Search Everywhere Optimization — Frequently Asked Questions</h2>
          <div style={{marginTop:32}}>
            {FAQS.map((f,i) => (
              <div className={`seev-faq-item${openFaq===i?' open':''}`} key={f.q}>
                <button className="seev-faq-q" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                  {f.q}<span className="seev-faq-icon">{openFaq===i?'−':'+'}</span>
                </button>
                <div className="seev-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="seev-cta" id="contact">
        <h2>Ready to Get Started with Search Everywhere Optimization?</h2>
        <p>Speak to our team for a free, no-obligation consultation. We'll assess your current position and recommend the right strategy.</p>
        <Link href="/contact-us/" className="seev-btn-p">Book a Free Consultation →</Link>
      </section>

      <section className="seev-related">
        <div className="seev-rel-inner">
          <span className="seev-sec-ey">Related Services</span>
          <h2 className="seev-sec-h2" style={{fontSize:'1.5rem',margin:'0'}}>Explore Related Offerings</h2>
          <div className="seev-rel-tags">
            {RELATED.map(r => <Link key={r.href} href={r.href} className="seev-rel-tag">{r.label}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
