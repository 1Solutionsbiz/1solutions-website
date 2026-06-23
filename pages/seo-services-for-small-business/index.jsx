import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Small Business SEO Audit', desc: 'A focused SEO audit covering technical health, on-page optimisation, local presence, keyword rankings, and competitor benchmarking — identifying the highest-impact opportunities for your specific business and market.' },
  { n: '02', title: 'Local SEO for Small Businesses', desc: 'Google Business Profile optimisation, citation building, review management, and local keyword targeting — helping you dominate the local map pack and attract nearby customers who are ready to buy.' },
  { n: '03', title: 'Website On-Page SEO', desc: 'Title tags, meta descriptions, header structure, keyword optimisation, internal linking, and page speed improvements — the on-page foundations that enable every other SEO effort to work effectively.' },
  { n: '04', title: 'Technical SEO Fixes', desc: 'Crawlability, indexation, site speed, mobile usability, and schema markup — resolving the technical issues that prevent your site from being properly crawled, indexed, and ranked by Google.' },
  { n: '05', title: 'Keyword Research & Content Strategy', desc: 'Finding the specific keywords your target customers are searching for — including low-competition long-tail keywords that a small business can realistically rank for without a large budget or high domain authority.' },
  { n: '06', title: 'Blog & Content Creation', desc: 'SEO-optimised blog posts and service pages targeting informational and local keywords — building topical authority over time and attracting organic traffic from customers in research mode before they buy.' },
  { n: '07', title: 'Link Building for Small Businesses', desc: 'Building high-quality backlinks from local business directories, industry publications, and relevant websites — increasing domain authority at a pace and budget suited to a small business operation.' },
  { n: '08', title: 'Monthly SEO Reporting', desc: 'A clear, jargon-free monthly report covering keyword rankings, organic traffic growth, Google Business Profile performance, and what is being worked on next — so you always know what your SEO investment is achieving.' },
];

const INCLUDES = ['Local SEO', 'Google Business Profile', 'On-Page SEO', 'Technical Fixes', 'Keyword Research', 'Content Writing', 'Link Building', 'Monthly Reports', 'Schema Markup', 'Core Web Vitals'];

const PROCESS = [
  { step: '01', title: 'Discovery & Audit', desc: 'Understanding your business, your customers, your competitors, and your current online visibility — then auditing your website and Google presence to identify the fastest paths to ranking improvement.' },
  { step: '02', title: 'SEO Strategy', desc: 'A realistic, prioritised SEO plan built around your budget, your timeline, and the specific keywords your target customers are searching for in your area and industry.' },
  { step: '03', title: 'Technical & On-Page Work', desc: 'Fixing technical issues, optimising existing pages, and improving your site structure — the foundations that need to be in place before content and links can have maximum impact.' },
  { step: '04', title: 'Content & Local SEO', desc: 'Creating new content targeting keyword opportunities, optimising your Google Business Profile, and building local citations — expanding your organic footprint month by month.' },
  { step: '05', title: 'Link Building', desc: 'Building authoritative backlinks from relevant local and industry sources — gradually improving your domain authority to compete for more competitive keywords over time.' },
  { step: '06', title: 'Monthly Review', desc: 'Results review, performance report, and next month\'s priorities — a regular touchpoint to make sure the strategy is working and adapting to any changes in your market.' },
];

const WHY = [
  { title: 'Realistic for Small Business Budgets', desc: 'Our small business SEO service is designed for businesses with realistic budgets — not enterprise-level spend. We prioritise the highest-impact work first so you see results before the budget is exhausted on lower-priority items.' },
  { title: 'Local + Organic Combined', desc: 'Most small businesses need both local SEO (Google Maps, GBP) and organic SEO (website rankings). We treat both as part of one coordinated strategy — because customers find you both ways.' },
  { title: 'No Jargon, Clear Reporting', desc: 'We explain what we are doing and why in plain language. Monthly reports show keyword rankings, traffic growth, and leads — not just technical metrics that do not relate to business outcomes.' },
  { title: 'Long-Tail Keyword Focus', desc: 'Small businesses do not need to rank for the most competitive keywords in their industry — they need to rank for the specific searches their local customers make. We focus on attainable, commercial keywords with realistic ranking timelines.' },
  { title: 'No Long-Term Contracts', desc: 'Our small business SEO packages run month-to-month. We earn your continued investment by delivering results — not by locking you into contracts. Annual plans are available at a discount for businesses ready to commit.' },
  { title: '15 Years of Small Business Experience', desc: 'We have been doing SEO for small businesses since 2009 — before social media dominated marketing spend. We know what works for small businesses with limited budgets, and we know how to get results without wasting your money.' },
];

const FAQS = [
  { q: 'Can small businesses really compete in SEO against larger companies?', a: 'Yes — often very effectively, for two reasons. First, local SEO: in Google Maps and local search results, small businesses compete on a level playing field with large national brands. A local plumber with an optimised Google Business Profile and good local citations can outrank a national home services company for "plumber near me" searches. Second, long-tail keywords: large companies focus their SEO on high-volume, competitive head terms. Small businesses can capture significant traffic by ranking for specific, long-tail search queries (e.g., "vegan bakery in Bristol" or "residential electrician in Leeds") that large competitors do not target specifically.' },
  { q: 'How much should a small business spend on SEO?', a: 'SEO budget for small businesses varies widely depending on market competitiveness, business goals, and current website health. As a rough guide: a local single-location business in a moderately competitive market can see meaningful results from £400 to £800 per month. A business competing in multiple locations or a competitive industry (legal, financial, healthcare) typically needs £800 to £1,500 per month. Very small, highly localised businesses in low-competition markets can see results with focused quarterly projects costing £1,000 to £2,000. We provide custom quotes after understanding your specific situation — we will not recommend more than you need to achieve your goals.' },
  { q: 'How long does small business SEO take to show results?', a: 'Local SEO improvements (Google Business Profile optimisation, citation building) can show results within 4 to 8 weeks. On-page SEO improvements can improve rankings within 4 to 12 weeks for existing pages. Content creation targeting new keywords typically shows ranking results in 3 to 6 months. For newer or low-authority websites, results can take 6 to 12 months to become significant. We set honest timelines based on your current position — the more established your domain and the less competition in your market, the faster the results.' },
  { q: 'What is the most important SEO priority for a small business?', a: 'For most small businesses, local SEO is the highest-priority starting point because it delivers results fastest and directly targets local customers. Google Business Profile optimisation, citation consistency, and review management can meaningfully improve local map pack rankings within weeks. Beyond local SEO, technical SEO foundations (fixing crawl errors, improving page speed, basic on-page optimisation) have the highest return because they improve the effectiveness of all future SEO work. Content and link building are important for long-term growth but are longer-duration investments. We sequence work to deliver quick wins first while building the foundations for sustained organic growth.' },
  { q: 'Do I need SEO if I already use Google Ads?', a: 'Yes. Google Ads and SEO serve different strategic purposes. Google Ads delivers immediate traffic but stops the moment you stop paying — there is no compounding return. SEO builds organic rankings that generate traffic continuously without per-click cost. Businesses that rely solely on paid ads are exposed to rising CPCs, platform policy changes, and competitor bidding. SEO provides a more sustainable, cost-efficient traffic channel over time. Most successful small businesses use both: Google Ads for immediate lead generation while SEO builds the organic foundation that eventually reduces dependence on paid traffic.' },
  { q: 'Do you work with businesses that have no existing SEO?', a: 'Yes — many of our small business clients start with no prior SEO, no Google Business Profile, and a website that has never been optimised. Starting from zero actually has advantages: there are no previous penalty risks, no bad practices to undo, and the first round of technical and on-page improvements often produces dramatic early ranking gains because the baseline is so low. New businesses or businesses with no SEO history also have a clean slate for content strategy — we can build a well-structured site architecture and keyword framework from the ground up rather than retrofitting an existing site.' },
  { q: 'What types of small businesses do you work with?', a: 'We work with small businesses across a wide range of sectors, including: trade and home services (plumbers, electricians, builders, landscapers, cleaning services); professional services (accountants, solicitors, financial advisers, consultants); health and wellness (physiotherapists, dentists, opticians, gyms, personal trainers); retail (local shops, boutiques, specialist retailers); hospitality and food (restaurants, cafés, B&Bs, catering); and B2B service providers (marketing agencies, IT support, recruitment). We have experience in all these sectors and understand the specific search patterns and competitive dynamics of each.' },
  { q: 'Will I be locked into a long-term contract?', a: 'No. Our small business SEO packages run month-to-month with 30 days notice to cancel. We do not believe in locking small businesses into long contracts — we earn your continued investment by delivering results. Annual plans are available at a 17% discount for businesses confident in committing to a 12-month SEO programme, but there is no penalty for choosing month-to-month. We will always recommend the billing option that makes the most sense for your cash flow and confidence level.' },
];

const STATS = [
  { label: 'Small Businesses Served', val: '500+' },
  { label: 'Avg Organic Growth', val: '+94%' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Client Retention', val: '89%' },
];

export default function SeoServicesForSmallBusiness() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'SEO for Small Business', item: 'https://www.1solutions.biz/seo-services-for-small-business/' }] }, { '@type': 'Service', name: 'SEO Services for Small Business', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Small Business SEO', url: 'https://www.1solutions.biz/seo-services-for-small-business/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>SEO Services for Small Business | Affordable Small Business SEO | 1Solutions</title>
        <meta name="description" content="SEO services for small businesses — local SEO, on-page optimisation, content creation, and link building designed for small business budgets. No long-term contracts. Real results from month one." />
        <meta name="keywords" content="seo services for small business, small business seo, affordable seo for small business, local seo small business, small business seo packages, seo company for small business" />
        <link rel="canonical" href="https://www.1solutions.biz/seo-services-for-small-business/" />
        <meta property="og:title" content="SEO Services for Small Business | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/seo-services-for-small-business/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .smbbiz-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .smbbiz-page *,.smbbiz-page *::before,.smbbiz-page *::after{box-sizing:border-box}
          .smbbiz-hero{background:linear-gradient(135deg,#f0fdf4 0%,#dcfce7 30%,#bbf7d0 65%,#f0fdf4 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .smbbiz-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(22,163,74,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .smbbiz-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(21,128,61,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .smbbiz-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .smbbiz-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .smbbiz-bc a{color:#6b7280;text-decoration:none}.smbbiz-bc a:hover{color:#16A34A}.smbbiz-bc span{color:#d1d5db}
          .smbbiz-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(22,163,74,0.08);border:1px solid rgba(22,163,74,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#16A34A;margin-bottom:28px}
          .smbbiz-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#14532D 0%,#16A34A 50%,#15803D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .smbbiz-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .smbbiz-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .smbbiz-btn-p{display:inline-flex;align-items:center;gap:8px;background:#16A34A;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(22,163,74,0.28)}
          .smbbiz-btn-p:hover{background:#14532D;box-shadow:0 8px 32px rgba(22,163,74,0.38);transform:translateY(-2px)}
          .smbbiz-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .smbbiz-btn-s:hover{border-color:#16A34A;color:#16A34A;transform:translateY(-2px)}
          .smbbiz-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(22,163,74,0.07)}
          .smbbiz-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(22,163,74,0.08)}.smbbiz-stat:last-child{border-right:none}
          .smbbiz-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .smbbiz-stat-v{font-size:1.6rem;font-weight:900;color:#16A34A;letter-spacing:-0.5px}
          .smbbiz-svc{background:#f8fafd;padding:80px 40px}.smbbiz-svc-in{max-width:1280px;margin:0 auto}
          .smbbiz-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#16A34A;margin-bottom:10px;display:block}
          .smbbiz-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#14532D 0%,#16A34A 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .smbbiz-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .smbbiz-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .smbbiz-card{background:linear-gradient(135deg,rgba(240,253,244,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(220,252,231,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(22,163,74,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease}
          .smbbiz-card.visible{opacity:1;transform:translateY(0)}.smbbiz-card:hover{transform:translateY(-6px);border-color:rgba(22,163,74,0.22);box-shadow:0 16px 48px rgba(22,163,74,0.09)}
          .smbbiz-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#16A34A;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .smbbiz-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .smbbiz-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .smbbiz-inc{background:linear-gradient(135deg,#14532D 0%,#16A34A 100%);padding:60px 40px}
          .smbbiz-inc-in{max-width:1280px;margin:0 auto;text-align:center}
          .smbbiz-inc h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .smbbiz-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .smbbiz-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .smbbiz-proc{background:linear-gradient(135deg,#f0fdf4 0%,#f0fdf4 50%,#dcfce7 100%);padding:80px 40px}
          .smbbiz-proc-in{max-width:900px;margin:0 auto}
          .smbbiz-steps{display:flex;flex-direction:column;margin-top:44px}
          .smbbiz-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(22,163,74,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .smbbiz-step:last-child{border-bottom:none}.smbbiz-step.visible{opacity:1;transform:translateX(0)}
          .smbbiz-snum{font-size:3rem;font-weight:900;color:rgba(22,163,74,0.15);line-height:1;letter-spacing:-2px}
          .smbbiz-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .smbbiz-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .smbbiz-why{background:#fff;padding:80px 40px}.smbbiz-why-in{max-width:1280px;margin:0 auto}
          .smbbiz-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .smbbiz-wcard{background:linear-gradient(135deg,#f0fdf4 0%,#fff 60%,#dcfce7 100%);border:1px solid rgba(22,163,74,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .smbbiz-wcard.visible{opacity:1;transform:translateY(0)}.smbbiz-wcard:hover{border-color:rgba(22,163,74,0.20);box-shadow:0 8px 32px rgba(22,163,74,0.07)}
          .smbbiz-dot{width:8px;height:8px;border-radius:50%;background:#16A34A;margin-bottom:16px}
          .smbbiz-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .smbbiz-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .smbbiz-faq{background:#f8fafd;padding:80px 40px}.smbbiz-faq-in{max-width:860px;margin:0 auto}
          .smbbiz-fitem{border-bottom:1px solid #e5e7eb}
          .smbbiz-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .smbbiz-fq:hover{color:#16A34A}
          .smbbiz-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .smbbiz-fitem.open .smbbiz-ficon{border-color:#16A34A;color:#16A34A;background:rgba(22,163,74,0.06)}
          .smbbiz-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .smbbiz-fitem.open .smbbiz-fa{max-height:600px;padding-bottom:22px}
          .smbbiz-cta{background:linear-gradient(135deg,rgba(22,163,74,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(20,83,45,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .smbbiz-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(22,163,74,0.10) 0%,transparent 70%);pointer-events:none}
          .smbbiz-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(20,83,45,0.08) 0%,transparent 70%);pointer-events:none}
          .smbbiz-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .smbbiz-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#14532D 0%,#16A34A 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .smbbiz-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.smbbiz-grid{grid-template-columns:repeat(2,1fr)}.smbbiz-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.smbbiz-hero,.smbbiz-svc,.smbbiz-inc,.smbbiz-proc,.smbbiz-why,.smbbiz-faq,.smbbiz-cta{padding:60px 24px}.smbbiz-hero{padding-top:60px;padding-bottom:0}.smbbiz-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.smbbiz-stat:nth-child(2){border-right:none}.smbbiz-grid{grid-template-columns:1fr}.smbbiz-why-grid{grid-template-columns:1fr}.smbbiz-step{grid-template-columns:56px 1fr}.smbbiz-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="smbbiz-page">
        <section className="smbbiz-hero"><div className="smbbiz-o1"/><div className="smbbiz-o2"/>
          <div className="smbbiz-in">
            <nav className="smbbiz-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO</Link><span>/</span><span style={{color:'#16A34A'}}>SEO for Small Business</span></nav>
            <span className="smbbiz-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#16A34A',display:'inline-block'}}/> Local SEO · On-Page · Content · No Lock-In</span>
            <h1 className="smbbiz-h1">SEO Services for Small Business — Grow Organically Without Wasting Budget</h1>
            <p className="smbbiz-sub">Affordable SEO services designed specifically for small businesses — local SEO, on-page optimisation, content creation, and link building prioritised for maximum impact on a realistic budget. No jargon, no lock-in contracts.</p>
            <div className="smbbiz-btns">
              <Link href="/contact-us" className="smbbiz-btn-p">Get a Free Small Business SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/local-seo-packages" className="smbbiz-btn-s">View Local SEO Packages</Link>
            </div>
            <div className="smbbiz-stats">{STATS.map(s => <div key={s.label} className="smbbiz-stat"><div className="smbbiz-stat-l">{s.label}</div><div className="smbbiz-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="smbbiz-svc"><div className="smbbiz-svc-in">
          <span className="smbbiz-ey2">What We Do</span><h2 className="smbbiz-ttl">Small Business SEO Services</h2>
          <p className="smbbiz-desc">Every SEO service a small business needs — local visibility, website optimisation, content, and links — delivered in order of impact, not complexity.</p>
          <div className="smbbiz-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`smbbiz-card${visibleCards.includes(i)?' visible':''}`}><div className="smbbiz-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="smbbiz-inc"><div className="smbbiz-inc-in"><h2>What Every Small Business SEO Plan Includes</h2><div className="smbbiz-pills">{INCLUDES.map(c => <span key={c} className="smbbiz-pill">{c}</span>)}</div></div></section>
        <section className="smbbiz-proc"><div className="smbbiz-proc-in">
          <span className="smbbiz-ey2">How We Work</span><h2 className="smbbiz-ttl">Our Small Business SEO Process</h2>
          <p className="smbbiz-desc">Discovery to results — a clear, structured approach that delivers quick wins first and builds sustainable organic growth over time.</p>
          <div className="smbbiz-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`smbbiz-step${visibleSteps.includes(i)?' visible':''}`}><div className="smbbiz-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="smbbiz-why"><div className="smbbiz-why-in">
          <span className="smbbiz-ey2">Why 1Solutions</span><h2 className="smbbiz-ttl">Built for Small Business — Not Adapted from Enterprise SEO</h2>
          <p className="smbbiz-desc">Small business SEO needs a different approach: realistic keyword targets, budget-efficient priorities, and results that relate to actual customers and revenue — not technical metrics.</p>
          <div className="smbbiz-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`smbbiz-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="smbbiz-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="smbbiz-faq"><div className="smbbiz-faq-in">
          <span className="smbbiz-ey2">Got Questions?</span><h2 className="smbbiz-ttl">Small Business SEO FAQs</h2>
          <p className="smbbiz-desc" style={{marginBottom:44}}>Answers to the questions small business owners ask most about SEO.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`smbbiz-fitem${openFaq===i?' open':''}`}><button className="smbbiz-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="smbbiz-ficon">{openFaq===i?'−':'+'}</span></button><div className="smbbiz-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="smbbiz-cta"><div className="smbbiz-cta-o1"/><div className="smbbiz-cta-o2"/>
          <div className="smbbiz-cta-in">
            <span className="smbbiz-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to grow your business through organic search?</span>
            <h2 className="smbbiz-cta-t">Get a Free Small Business SEO Audit</h2>
            <p className="smbbiz-cta-s">We&rsquo;ll review your website, your Google Business Profile, and your local competitors — then recommend the most cost-effective SEO strategy for your budget and goals.</p>
            <div className="smbbiz-btns">
              <Link href="/contact-us" className="smbbiz-btn-p">Request a Free SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/affordable-seo-packages" className="smbbiz-btn-s">Affordable SEO Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
