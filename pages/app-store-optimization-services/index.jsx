import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'ASO Audit & Competitive Analysis', desc: 'Full app store presence audit — keyword rankings, conversion rate, rating health, visual asset quality, and competitor benchmarking across the App Store and Google Play.' },
  { n: '02', title: 'Keyword Research & Optimisation', desc: 'In-depth app keyword research — high-volume discovery terms, mid-tail conversion keywords, and long-tail with low competition. Title, subtitle, and keyword field optimisation for maximum indexation.' },
  { n: '03', title: 'App Title & Metadata Optimisation', desc: 'Optimise app title, subtitle, short description, and long description for both search ranking algorithms and conversion — balancing keyword density with compelling, user-focused copy.' },
  { n: '04', title: 'Screenshot & Creative Optimisation', desc: 'Screenshot strategy, custom preview video guidance, icon A/B testing, and feature graphic optimisation — the visual assets that determine whether a user installs or scrolls past.' },
  { n: '05', title: 'Rating & Review Management', desc: 'Review generation strategy, negative review response templates, rating improvement plan, and in-app review prompt implementation to build and maintain a healthy review profile.' },
  { n: '06', title: 'Localisation ASO', desc: 'Market-specific keyword research and metadata translation for key locales — US, UK, Canada, Australia, Germany, France, and more. Local keyword nuances that automatic translation misses.' },
  { n: '07', title: 'A/B Testing & Conversion Rate Optimisation', desc: 'iOS App Store Product Page Optimisation (PPO) and Google Play Custom Store Listings — systematic A/B testing of screenshots, icons, and descriptions to maximise install conversion rate.' },
  { n: '08', title: 'ASO Reporting & Monitoring', desc: 'Monthly ASO performance reports — keyword ranking movements, category chart positions, conversion rate trends, and rating health across both stores with actionable next steps.' },
];

const STORES = ['Apple App Store', 'Google Play Store', 'iOS (iPhone & iPad)', 'Android', 'App Store PPO', 'Google Play Custom Listings', 'Apple Search Ads', 'Google UAC'];

const PROCESS = [
  { step: '01', title: 'ASO Audit', desc: 'Full review of your app\'s current keyword rankings, metadata quality, visual assets, rating profile, and competitor position across both stores.' },
  { step: '02', title: 'Keyword Strategy', desc: 'Research and prioritise keywords by volume, difficulty, and relevance — then map them to title, subtitle, and keyword field with maximum indexation coverage.' },
  { step: '03', title: 'Metadata Optimisation', desc: 'Rewrite title, subtitle, short description, and long description — optimised for search algorithms and conversion, tested with A/B where supported.' },
  { step: '04', title: 'Visual Asset Review', desc: 'Screenshot strategy, feature graphic, preview video brief, and icon recommendations — the creative assets that drive install conversion rate.' },
  { step: '05', title: 'Review Strategy', desc: 'In-app review prompt implementation, response templates, and rating improvement plan to build a sustainable 4.5+ star profile.' },
  { step: '06', title: 'Monitor & Report', desc: 'Monthly keyword ranking reports, conversion rate tracking, category chart monitoring, and strategic recommendations for ongoing growth.' },
];

const WHY = [
  { title: 'Both Stores Covered', desc: 'Different algorithms, different ranking factors, different metadata structures. We optimise App Store and Google Play independently — not with a copy-paste approach.' },
  { title: 'Keyword Intelligence Tools', desc: 'We use Sensor Tower, AppFollow, AppTweak, and MobileAction to identify keyword opportunities that manual research misses — giving your app an edge in competitive categories.' },
  { title: 'Conversion + Ranking Focus', desc: 'ASO is not just about keyword rankings — an app ranking #1 with a 15% conversion rate loses to an app ranking #3 with a 40% conversion rate. We optimise both.' },
  { title: 'A/B Testing Expertise', desc: 'We leverage iOS Product Page Optimisation and Google Play Experiments to test metadata and visual variants — making data-driven decisions, not assumptions.' },
  { title: 'Localisation Capability', desc: 'Proper ASO localisation requires native-language keyword research, not just translation. We cover US, UK, APAC, and European markets with in-market keyword expertise.' },
  { title: 'Mobile Development Alignment', desc: 'We work alongside our app development team when needed — ensuring ASO strategy informs app feature naming, in-app copy, and review prompt placement from the start.' },
];

const FAQS = [
  { q: 'What is ASO and how is it different from SEO?', a: 'App Store Optimisation (ASO) is the process of improving an app\'s visibility and conversion rate in the Apple App Store and Google Play Store. Like SEO for websites, ASO involves keyword optimisation, metadata quality, and conversion rate improvements. Unlike SEO, ASO is constrained by specific metadata fields (title, subtitle, keyword field on iOS; title, short description, long description on Android), operates within store algorithm rules that differ significantly from Google Search, and includes visual conversion elements (screenshots, preview video, icon) that have no direct SEO equivalent.' },
  { q: 'What does an ASO audit cover?', a: 'Our ASO audit covers: keyword ranking analysis (which keywords your app currently ranks for and at what positions); metadata quality (title, subtitle, keyword field, description — length, keyword density, readability); visual asset review (screenshots, feature graphic, preview video, icon — conversion effectiveness); rating and review profile (current rating, review velocity, response strategy); competitor benchmarking (how your app\'s ASO compares to top-ranking competitors); and conversion rate estimate (install conversion rate based on store category benchmarks). You receive a full written report with prioritised recommendations.' },
  { q: 'How long does ASO take to show results?', a: 'Metadata changes on the App Store typically reflect in keyword rankings within 1 to 3 days of approval. Google Play metadata updates take 1 to 7 days. Keyword ranking improvements from better metadata are often visible within 2 to 4 weeks. Conversion rate improvements from updated screenshots and visuals take longer to measure accurately — we recommend at least 2 to 4 weeks of A/B test data before drawing conclusions. Sustained keyword ranking growth from ongoing optimisation compounds over 3 to 6 months.' },
  { q: 'Do I need to keep updating my app metadata for ASO?', a: 'Yes. ASO is an ongoing process, not a one-time setup. App Store and Google Play search algorithms evolve, competitor apps update their metadata and gain rankings, seasonal keywords fluctuate in volume, and new keywords emerge as user search behaviour changes. We recommend reviewing and updating metadata every 1 to 2 months and monitoring keyword rankings weekly. Rating management — responding to reviews and prompting satisfied users for ratings — is also ongoing.' },
  { q: 'How do screenshots affect ASO conversion rate?', a: 'Screenshots are the single most influential visual element in driving install decisions. Studies show screenshot design and caption messaging can change install conversion rates by 20 to 40%. Effective ASO screenshots: lead with the highest-value feature or benefit; use captions that speak to user pain points; present a logical visual narrative; and are optimised for the specific screenshot slot positions (first 2 screenshots visible in search results are most critical). We develop screenshot strategies based on your target user psychology and competitive landscape.' },
  { q: 'What is the difference between iOS and Android ASO?', a: 'iOS and Android have different metadata structures: iOS uses Title (30 chars), Subtitle (30 chars), Keyword Field (100 chars), and Description; Android uses Title (30 chars), Short Description (80 chars), and Long Description (4,000 chars). iOS indexes only the title, subtitle, and keyword field — so every character matters. Android indexes the full description — allowing more keyword coverage. The ranking algorithms also differ: iOS weighs keyword field placement heavily; Android\'s algorithm is closer to Google Search with more emphasis on external signals and user engagement. We optimise each platform using its specific best practices.' },
  { q: 'Can ASO help with Apple Search Ads or Google UAC performance?', a: 'Yes. Strong ASO improves paid app acquisition performance — particularly for Apple Search Ads, where relevance score is influenced by the quality of your organic ASO. A high-relevance app (good metadata, strong ratings, competitive conversion rate) achieves lower cost-per-install in Apple Search Ads. Similarly, Google Universal App Campaigns use your app listing assets (title, description, screenshots) to generate ad creatives — better ASO assets improve UAC performance. We align organic ASO strategy with paid acquisition to maximise the efficiency of both channels.' },
  { q: 'Do you handle ASO for games as well as utility apps?', a: 'Yes. Game ASO and utility app ASO share core principles but differ in keyword strategy (game genres, character names, and gameplay mechanics become keywords) and visual strategy (games rely heavily on gameplay video previews and in-game screenshots rather than feature benefit screenshots). We have optimised ASO for casual games, mid-core games, and hyper-casual games alongside productivity, healthcare, fitness, and ecommerce apps.' },
];

const STATS = [
  { label: 'Apps Optimised', val: '300+' },
  { label: 'Avg Organic Install Lift', val: '+180%' },
  { label: 'Stores Covered', val: 'iOS & Android' },
  { label: 'Client Retention', val: '93%' },
];

export default function AppStoreOptimizationServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);

  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);

  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Mobile Development', item: 'https://www.1solutions.biz/react-native-app-development/' }, { '@type': 'ListItem', position: 3, name: 'App Store Optimisation', item: 'https://www.1solutions.biz/app-store-optimization-services/' }] }, { '@type': 'Service', name: 'App Store Optimisation Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'App Store Optimisation', url: 'https://www.1solutions.biz/app-store-optimization-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };

  return (
    <>
      <Head>
        <title>App Store Optimisation (ASO) Services | iOS & Android ASO Agency | 1Solutions</title>
        <meta name="description" content="App Store Optimisation (ASO) services for iOS and Android — keyword research, metadata optimisation, screenshot strategy, rating management, and A/B testing to grow organic installs." />
        <meta name="keywords" content="app store optimization services, aso services, app store seo, google play optimization, ios aso, android aso, aso agency" />
        <link rel="canonical" href="https://www.1solutions.biz/app-store-optimization-services/" />
        <meta property="og:title" content="App Store Optimisation Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/app-store-optimization-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .aso-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .aso-page *,.aso-page *::before,.aso-page *::after{box-sizing:border-box}
          .aso-hero{background:linear-gradient(135deg,#faf5ff 0%,#ede9fe 25%,#e9d5ff 60%,#fdf4ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .aso-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(147,51,234,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .aso-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(91,33,182,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .aso-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .aso-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .aso-bc a{color:#6b7280;text-decoration:none}.aso-bc a:hover{color:#9333EA}.aso-bc span{color:#d1d5db}
          .aso-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(147,51,234,0.08);border:1px solid rgba(147,51,234,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#7C3AED;margin-bottom:28px}
          .aso-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#5B21B6 0%,#9333EA 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .aso-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .aso-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .aso-btn-p{display:inline-flex;align-items:center;gap:8px;background:#9333EA;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(147,51,234,0.28)}
          .aso-btn-p:hover{background:#7C3AED;box-shadow:0 8px 32px rgba(147,51,234,0.38);transform:translateY(-2px)}
          .aso-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .aso-btn-s:hover{border-color:#9333EA;color:#9333EA;transform:translateY(-2px)}
          .aso-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(147,51,234,0.07)}
          .aso-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(147,51,234,0.08)}.aso-stat:last-child{border-right:none}
          .aso-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .aso-stat-v{font-size:1.6rem;font-weight:900;color:#9333EA;letter-spacing:-0.5px}
          .aso-svc{background:#f8fafd;padding:80px 40px}.aso-svc-in{max-width:1280px;margin:0 auto}
          .aso-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#9333EA;margin-bottom:10px;display:block}
          .aso-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#5B21B6 0%,#9333EA 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .aso-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .aso-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .aso-card{background:linear-gradient(135deg,rgba(250,245,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(233,213,255,0.30) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(147,51,234,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .aso-card.visible{opacity:1;transform:translateY(0)}.aso-card:hover{transform:translateY(-6px);border-color:rgba(147,51,234,0.22);box-shadow:0 16px 48px rgba(147,51,234,0.09)}
          .aso-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#9333EA;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .aso-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .aso-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .aso-stores{background:linear-gradient(135deg,#5B21B6 0%,#9333EA 100%);padding:60px 40px}
          .aso-stores-in{max-width:1280px;margin:0 auto;text-align:center}
          .aso-stores h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .aso-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .aso-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .aso-proc{background:linear-gradient(135deg,#faf5ff 0%,#fdf4ff 50%,#ede9fe 100%);padding:80px 40px}
          .aso-proc-in{max-width:900px;margin:0 auto}
          .aso-steps{display:flex;flex-direction:column;margin-top:44px}
          .aso-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(147,51,234,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .aso-step:last-child{border-bottom:none}.aso-step.visible{opacity:1;transform:translateX(0)}
          .aso-snum{font-size:3rem;font-weight:900;color:rgba(147,51,234,0.15);line-height:1;letter-spacing:-2px}
          .aso-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .aso-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .aso-why{background:#fff;padding:80px 40px}.aso-why-in{max-width:1280px;margin:0 auto}
          .aso-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .aso-wcard{background:linear-gradient(135deg,#faf5ff 0%,#fff 60%,#ede9fe 100%);border:1px solid rgba(147,51,234,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .aso-wcard.visible{opacity:1;transform:translateY(0)}.aso-wcard:hover{border-color:rgba(147,51,234,0.20);box-shadow:0 8px 32px rgba(147,51,234,0.07)}
          .aso-dot{width:8px;height:8px;border-radius:50%;background:#9333EA;margin-bottom:16px}
          .aso-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .aso-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .aso-faq{background:#f8fafd;padding:80px 40px}.aso-faq-in{max-width:860px;margin:0 auto}
          .aso-fitem{border-bottom:1px solid #e5e7eb}
          .aso-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .aso-fq:hover{color:#9333EA}
          .aso-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .aso-fitem.open .aso-ficon{border-color:#9333EA;color:#9333EA;background:rgba(147,51,234,0.06)}
          .aso-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .aso-fitem.open .aso-fa{max-height:500px;padding-bottom:22px}
          .aso-cta{background:linear-gradient(135deg,rgba(147,51,234,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(91,33,182,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .aso-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(147,51,234,0.10) 0%,transparent 70%);pointer-events:none}
          .aso-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(91,33,182,0.08) 0%,transparent 70%);pointer-events:none}
          .aso-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .aso-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#5B21B6 0%,#9333EA 50%,#0F3460 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .aso-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .aso-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.aso-grid{grid-template-columns:repeat(2,1fr)}.aso-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.aso-hero,.aso-svc,.aso-stores,.aso-proc,.aso-why,.aso-faq,.aso-cta{padding:60px 24px}.aso-hero{padding-top:60px;padding-bottom:0}.aso-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.aso-stat:nth-child(2){border-right:none}.aso-grid{grid-template-columns:1fr}.aso-why-grid{grid-template-columns:1fr}.aso-step{grid-template-columns:56px 1fr}.aso-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="aso-page">
        <section className="aso-hero"><div className="aso-o1"/><div className="aso-o2"/>
          <div className="aso-in">
            <nav className="aso-bc"><Link href="/">Home</Link><span>/</span><Link href="/react-native-app-development">Mobile Development</Link><span>/</span><span style={{color:'#9333EA'}}>App Store Optimisation</span></nav>
            <span className="aso-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#9333EA',display:'inline-block'}}/> iOS App Store · Google Play · A/B Testing</span>
            <h1 className="aso-h1">App Store Optimisation Services That Grow Organic Installs</h1>
            <p className="aso-sub">Keyword research, metadata optimisation, screenshot strategy, rating management, and A/B testing for iOS and Android — ASO that converts more store visitors into installs.</p>
            <div className="aso-btns">
              <Link href="/contact" className="aso-btn-p">Get a Free ASO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/react-native-app-development" className="aso-btn-s">App Development</Link>
            </div>
            <div className="aso-stats">{STATS.map(s => <div key={s.label} className="aso-stat"><div className="aso-stat-l">{s.label}</div><div className="aso-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="aso-svc"><div className="aso-svc-in">
          <span className="aso-ey2">What We Do</span><h2 className="aso-ttl">App Store Optimisation Services</h2>
          <p className="aso-desc">Every ASO layer — keywords, metadata, visuals, ratings, and conversion testing — across both Apple App Store and Google Play.</p>
          <div className="aso-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`aso-card${visibleCards.includes(i)?' visible':''}`}><div className="aso-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="aso-stores"><div className="aso-stores-in">
          <h2>Platforms &amp; Tools</h2>
          <div className="aso-pills">{STORES.map(c => <span key={c} className="aso-pill">{c}</span>)}</div>
        </div></section>
        <section className="aso-proc"><div className="aso-proc-in">
          <span className="aso-ey2">How We Work</span><h2 className="aso-ttl">Our ASO Process</h2>
          <p className="aso-desc">Audit to ongoing optimisation — a structured process that improves keyword rankings and install conversion rate month after month.</p>
          <div className="aso-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`aso-step${visibleSteps.includes(i)?' visible':''}`}><div className="aso-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="aso-why"><div className="aso-why-in">
          <span className="aso-ey2">Why 1Solutions</span><h2 className="aso-ttl">ASO Specialists with Mobile Dev Alignment</h2>
          <p className="aso-desc">We know both app stores — algorithm differences, A/B testing capabilities, localisation requirements — and align ASO with the development roadmap for maximum impact.</p>
          <div className="aso-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`aso-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="aso-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="aso-faq"><div className="aso-faq-in">
          <span className="aso-ey2">Got Questions?</span><h2 className="aso-ttl">App Store Optimisation FAQs</h2>
          <p className="aso-desc">Answers to the most common questions about ASO for iOS and Android.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`aso-fitem${openFaq===i?' open':''}`}><button className="aso-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="aso-ficon">{openFaq===i?'−':'+'}</span></button><div className="aso-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="aso-cta"><div className="aso-cta-o1"/><div className="aso-cta-o2"/>
          <div className="aso-cta-in">
            <span className="aso-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Grow Your App&rsquo;s Organic Installs?</span>
            <h2 className="aso-cta-t">Get Your Free ASO Audit</h2>
            <p className="aso-cta-s">We&rsquo;ll review your app&rsquo;s keyword rankings, metadata quality, visual assets, and competitor position — and send you a prioritised action plan free.</p>
            <div className="aso-cta-btns">
              <Link href="/contact" className="aso-btn-p">Get Free ASO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/react-native-app-development" className="aso-btn-s">React Native App Development</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
