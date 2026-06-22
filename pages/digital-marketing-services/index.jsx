import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Search Engine Optimisation (SEO)', desc: 'Organic search rankings that drive qualified traffic without per-click cost — technical SEO, on-page optimisation, content strategy, link building, and local SEO — the long-term organic growth engine for your business.', href: '/seo-services-company' },
  { n: '02', title: 'Pay-Per-Click Advertising (PPC)', desc: 'Google Ads and Bing Ads campaigns for immediate visibility on high-intent search queries — keyword strategy, ad copywriting, bid management, landing page optimisation, and conversion tracking for measurable, scalable paid growth.', href: '/contact' },
  { n: '03', title: 'Social Media Marketing', desc: 'Facebook, Instagram, LinkedIn, and YouTube management — organic content strategy, paid social advertising, community management, and audience growth campaigns that build brand presence and generate leads from social platforms.', href: '/facebook-management-services' },
  { n: '04', title: 'Content Marketing', desc: 'SEO-optimised blog content, pillar pages, case studies, white papers, and email newsletters — building topical authority, attracting organic traffic, and nurturing prospects through the buying journey with valuable content.', href: '/content-copywriting-services' },
  { n: '05', title: 'Email Marketing', desc: 'Lead nurturing sequences, promotional campaigns, abandoned cart recovery, and customer retention emails — segmented, personalised email marketing that generates revenue from your existing subscriber list.', href: '/contact' },
  { n: '06', title: 'Ecommerce Marketing', desc: 'Full-funnel ecommerce marketing — Google Shopping, Meta Shopping, email and SMS, SEO, and CRO — for Shopify, WooCommerce, Magento, and BigCommerce stores. Revenue growth across every touchpoint of the customer journey.', href: '/ecommerce-marketing-services' },
  { n: '07', title: 'Amazon Marketing', desc: 'Amazon SEO, Sponsored Products, Sponsored Brands, A+ Content, and Brand Store design — everything needed to rank higher in Amazon search, win the Buy Box, and convert browsers into buyers on the world\'s largest product marketplace.', href: '/amazon-seo-services' },
  { n: '08', title: 'Reputation Management', desc: 'Monitoring, managing, and improving your online reputation — Google review management, negative content suppression, brand monitoring, and proactive review generation strategies that protect and strengthen your brand perception.', href: '/reputation-management-services' },
];

const INDUSTRIES = ['Ecommerce & Retail', 'SaaS & Technology', 'Healthcare & Medical', 'Legal & Professional Services', 'Real Estate', 'Home Services (HVAC, Plumbing, Lawn Care)', 'Hospitality & Travel', 'Education & Training', 'Finance & Insurance', 'Manufacturing & B2B'];

const PROCESS = [
  { step: '01', title: 'Discovery & Audit', desc: 'Understanding your business goals, target customers, competitive landscape, and current digital marketing performance — the foundation for a strategy that is specific to your situation, not a generic template.' },
  { step: '02', title: 'Channel Strategy', desc: 'Recommending the right mix of digital marketing channels for your specific goals, budget, and competitive position — prioritised by expected ROI, not by what is fashionable.' },
  { step: '03', title: 'Campaign Architecture', desc: 'Setting up tracking, account structures, and measurement frameworks before any campaigns launch — so every result is attributable and every decision is data-backed from day one.' },
  { step: '04', title: 'Launch & Optimisation', desc: 'Campaigns launched, content published, and ads activated — followed by continuous optimisation based on performance data: what is working gets more budget, what is not gets fixed or replaced.' },
  { step: '05', title: 'Monthly Reporting', desc: 'Clear performance reporting by channel and goal — leads generated, cost per lead, revenue attributed, organic rankings, and traffic growth — with plain-language commentary and next month\'s priorities.' },
  { step: '06', title: 'Strategy Evolution', desc: 'Quarterly strategy reviews — evaluating channel performance, testing new opportunities, responding to algorithm updates and competitive changes, and evolving the approach as your business grows.' },
];

const WHY = [
  { title: '15+ Years of Digital Marketing Experience', desc: 'Founded in 2009 and continuously active in SEO, PPC, and digital marketing since — across hundreds of clients in India, the UK, the US, and Australia. We have been through every major Google algorithm update, every platform change, and every market shift that has happened in digital marketing in the last 15 years.' },
  { title: 'Integrated Multi-Channel Expertise', desc: 'Most agencies specialise in one channel — SEO or PPC or social — and treat others as add-ons. We have genuine expertise across organic search, paid search, social media, content, email, and ecommerce marketing, which means we can build integrated strategies where channels reinforce each other rather than operating in silos.' },
  { title: 'Business Outcomes, Not Vanity Metrics', desc: 'We report on leads, revenue, and cost per acquisition — not sessions, impressions, or reach. Every campaign is connected to business outcomes from day one. If a channel is not contributing to your business goals, we say so and redirect budget to channels that are.' },
  { title: 'Sector-Specific Experience', desc: 'We have worked in over 40 industries — from ecommerce and SaaS to home services, healthcare, legal, and professional services. Sector experience means we know the specific search patterns, competitive dynamics, and content strategies that work in your market — not generic digital marketing theory applied to your industry.' },
  { title: 'Transparent, Accessible Reporting', desc: 'We believe you should always understand what your digital marketing investment is doing. Monthly reports use plain language, show real results against agreed KPIs, and include a clear explanation of what we are working on next and why.' },
  { title: 'No-Jargon Communication', desc: 'Digital marketing is full of jargon that agencies use to obscure what they are doing and make results seem more complex than they are. We explain our strategy, our actions, and our results in clear language — always.' },
];

const FAQS = [
  { q: 'What is digital marketing?', a: 'Digital marketing is the promotion of a business, product, or service through digital channels — search engines (Google, Bing), social media platforms (Facebook, Instagram, LinkedIn, YouTube), email, content marketing, and ecommerce marketplaces (Amazon, Google Shopping). It encompasses both free (organic) channels — SEO, organic social, content marketing, email — and paid channels — Google Ads, Facebook/Instagram Ads, YouTube Ads, and sponsored placements. Digital marketing differs from traditional marketing (TV, radio, print) in that it is measurable at every step, targetable to specific audiences, and adjustable in real time based on performance data. For most businesses, digital marketing is now the primary growth lever, often delivering better ROI and more precise targeting than traditional channels.' },
  { q: 'Which digital marketing channels are most effective?', a: 'Effectiveness depends entirely on your business type, target customer, and goals. As general guidance: SEO (search engine optimisation) is the highest long-term ROI channel for most businesses that can rank for commercially valuable keywords — it generates compounding organic traffic without per-click cost. Google Ads (PPC) delivers immediate visibility for high-intent searches and is effective for businesses with strong conversion economics that justify the click cost. Social media advertising (Facebook, Instagram, LinkedIn) is highly effective for B2C products with visual appeal, ecommerce, and B2B lead generation. Email marketing has the highest ROI of any channel for businesses with established subscriber lists. Ecommerce channels (Google Shopping, Amazon, Meta Shopping) are essential for product-based businesses. We recommend the right channel mix for your specific situation after reviewing your business, budget, and competition.' },
  { q: 'How much should I spend on digital marketing?', a: 'Marketing budget benchmarks vary by industry and growth stage. Common guidance: early-stage or growth-focused businesses typically spend 10 to 15% of revenue on marketing; established businesses in competitive markets spend 5 to 10%; businesses in less competitive markets or with strong word-of-mouth spend 3 to 5%. For absolute budget guidance: a minimum viable digital marketing budget for a small business wanting measurable results is approximately $800 to $1,500 per month; for a mid-size business wanting multi-channel growth, $3,000 to $8,000 per month; for competitive markets or ecommerce with significant ad spend, $10,000+ per month. We provide custom budget recommendations after understanding your specific goals, competitive position, and current performance.' },
  { q: 'What is the difference between SEO and PPC?', a: 'SEO (Search Engine Optimisation) and PPC (Pay-Per-Click advertising) both aim to get your business visible in search results, but they work differently. SEO builds organic rankings — free positions in search results earned by optimising your website for Google\'s algorithm. SEO is slower (typically 3 to 12 months to significant results) but compounds over time and generates traffic without per-click cost. Once strong rankings are established, the cost per lead from organic search is typically lower than any paid channel. PPC buys paid positions at the top and bottom of search results. It delivers immediate visibility and traffic but stops the moment you stop paying. PPC is essential for new businesses, competitive keywords, and time-sensitive campaigns. The most effective digital marketing strategies combine both: PPC for immediate results and time-sensitive opportunities, SEO for long-term sustainable traffic growth.' },
  { q: 'How long does digital marketing take to produce results?', a: 'Timelines vary significantly by channel. Immediate results (days to weeks): Google Ads, Facebook/Instagram Ads, and email marketing campaigns can generate leads and traffic within days of launching. Short-term results (weeks to months): on-page SEO improvements, Google Business Profile optimisation, and technical SEO fixes can produce ranking improvements within 4 to 12 weeks. Medium-term results (3 to 6 months): meaningful organic ranking improvements for moderately competitive keywords, content marketing traffic growth, and brand social media growth. Long-term results (6 to 18+ months): significant organic search authority, highly competitive keyword rankings, and established organic traffic volumes. We set honest timelines at the start of every engagement — and we run paid channels alongside SEO so clients see immediate results while organic growth builds.' },
  { q: 'Do you work with businesses outside of India?', a: 'Yes. While based in New Delhi with a specific focus on the Indian market for local services like SEO training, we serve clients in the UK, US, Australia, Canada, and the UAE. Our digital marketing services are delivered remotely — we have managed campaigns in English-language markets globally for 15+ years. The majority of our international clients are in ecommerce, SaaS, professional services, and hospitality. Time zone differences are managed through asynchronous communication (email, shared dashboards) and scheduled monthly calls. Our UK and US clients typically work with us during their business hours through a dedicated account manager.' },
  { q: 'How do I know if my digital marketing is working?', a: 'You know digital marketing is working when it is producing measurable business outcomes — leads, enquiries, sales, and revenue attributable to specific digital channels. Key metrics to track by channel: SEO — organic sessions, keyword rankings, and leads from organic traffic; PPC — impressions, clicks, conversion rate, cost per lead, and ROAS; social media — reach, engagement, follower growth, and lead form completions; email — open rate, click rate, and revenue per email; ecommerce — ROAS, revenue by channel, and customer acquisition cost. We set up tracking before campaigns launch and report against agreed KPIs monthly. If a channel is not producing against its targets, we investigate, adjust, or redirect budget — we do not report metrics that do not connect to your business goals.' },
  { q: 'Do you sign long-term contracts for digital marketing?', a: 'No. Our digital marketing services operate on a month-to-month basis with 30 days notice to cancel. We earn your continued investment through results — not by locking you into contracts. Annual plans are available at a discount for clients who prefer the financial commitment and certainty, but the choice is entirely yours. For new clients, we strongly recommend starting with a 3-month commitment to give campaigns enough time to pass the initial learning period — digital marketing requires time to optimise, and results in month 1 do not reflect what a well-optimised campaign produces in months 4 to 6.' },
];

const STATS = [
  { label: 'Clients Served', val: '600+' },
  { label: 'Industries Covered', val: '40+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Client Retention', val: '89%' },
];

export default function DigitalMarketingServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Digital Marketing Services', item: 'https://www.1solutions.biz/digital-marketing-services/' }] }, { '@type': 'Service', name: 'Digital Marketing Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Digital Marketing', url: 'https://www.1solutions.biz/digital-marketing-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Digital Marketing Services | SEO, PPC, Social Media & Content | 1Solutions</title>
        <meta name="description" content="Digital marketing services — SEO, Google Ads, social media marketing, content marketing, email, ecommerce, and Amazon marketing. 15+ years of experience across 600+ clients in 40+ industries." />
        <meta name="keywords" content="digital marketing services, seo services, ppc advertising, social media marketing, content marketing, email marketing, ecommerce marketing, digital marketing company india" />
        <link rel="canonical" href="https://www.1solutions.biz/digital-marketing-services/" />
        <meta property="og:title" content="Digital Marketing Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/digital-marketing-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .dmhub-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .dmhub-page *,.dmhub-page *::before,.dmhub-page *::after{box-sizing:border-box}
          .dmhub-hero{background:linear-gradient(135deg,#0F1F40 0%,#1a2e5a 40%,#114171 80%,#0F1F40 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .dmhub-o1{position:absolute;top:-100px;right:-100px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(17,65,113,0.60) 0%,transparent 65%);pointer-events:none;filter:blur(40px)}
          .dmhub-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(254,151,0,0.08) 0%,transparent 65%);pointer-events:none;filter:blur(40px)}
          .dmhub-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .dmhub-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:24px;font-weight:500}
          .dmhub-bc a{color:rgba(255,255,255,0.5);text-decoration:none}.dmhub-bc a:hover{color:#FE9700}.dmhub-bc span{color:rgba(255,255,255,0.25)}
          .dmhub-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(254,151,0,0.12);border:1px solid rgba(254,151,0,0.28);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#FE9700;margin-bottom:28px}
          .dmhub-h1{font-size:clamp(2.4rem,5vw,4rem);font-weight:900;line-height:1.05;letter-spacing:-1.5px;color:#fff;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .dmhub-h1 span{background:linear-gradient(90deg,#FE9700 0%,#FFC14D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .dmhub-sub{font-size:1.08rem;color:rgba(255,255,255,0.70);line-height:1.75;max-width:660px;margin:0 auto 36px}
          .dmhub-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .dmhub-btn-p{display:inline-flex;align-items:center;gap:8px;background:#FE9700;color:#fff;padding:15px 32px;border-radius:50px;font-weight:800;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(254,151,0,0.35)}
          .dmhub-btn-p:hover{background:#e08700;box-shadow:0 8px 36px rgba(254,151,0,0.50);transform:translateY(-2px)}
          .dmhub-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.22);color:#fff;padding:15px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .dmhub-btn-s:hover{border-color:rgba(254,151,0,0.60);background:rgba(254,151,0,0.10);transform:translateY(-2px)}
          .dmhub-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.06);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.10);border-radius:20px 20px 0 0}
          .dmhub-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(255,255,255,0.07)}.dmhub-stat:last-child{border-right:none}
          .dmhub-stat-l{font-size:11px;color:rgba(255,255,255,0.45);font-weight:500;margin-bottom:4px}
          .dmhub-stat-v{font-size:1.6rem;font-weight:900;color:#FE9700;letter-spacing:-0.5px}
          .dmhub-svc{background:#f8fafd;padding:80px 40px}.dmhub-svc-in{max-width:1280px;margin:0 auto}
          .dmhub-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#114171;margin-bottom:10px;display:block}
          .dmhub-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F1F40 0%,#114171 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .dmhub-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .dmhub-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .dmhub-card{background:linear-gradient(135deg,rgba(240,246,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(240,246,255,0.25) 100%);border:1px solid rgba(17,65,113,0.08);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(17,65,113,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease;text-decoration:none;display:block}
          .dmhub-card.visible{opacity:1;transform:translateY(0)}.dmhub-card:hover{transform:translateY(-6px);border-color:rgba(17,65,113,0.20);box-shadow:0 16px 48px rgba(17,65,113,0.10)}
          .dmhub-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#114171;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .dmhub-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .dmhub-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .dmhub-ind{background:linear-gradient(135deg,#0F1F40 0%,#114171 100%);padding:60px 40px}
          .dmhub-ind-in{max-width:1280px;margin:0 auto;text-align:center}
          .dmhub-ind h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .dmhub-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .dmhub-pill{background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .dmhub-proc{background:linear-gradient(135deg,#fff 0%,#f0f6ff 50%,#fff 100%);padding:80px 40px}
          .dmhub-proc-in{max-width:900px;margin:0 auto}
          .dmhub-steps{display:flex;flex-direction:column;margin-top:44px}
          .dmhub-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(17,65,113,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .dmhub-step:last-child{border-bottom:none}.dmhub-step.visible{opacity:1;transform:translateX(0)}
          .dmhub-snum{font-size:3rem;font-weight:900;color:rgba(17,65,113,0.15);line-height:1;letter-spacing:-2px}
          .dmhub-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .dmhub-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .dmhub-why{background:#fff;padding:80px 40px}.dmhub-why-in{max-width:1280px;margin:0 auto}
          .dmhub-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .dmhub-wcard{background:linear-gradient(135deg,#f0f6ff 0%,#fff 60%,#f0f6ff 100%);border:1px solid rgba(17,65,113,0.08);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .dmhub-wcard.visible{opacity:1;transform:translateY(0)}.dmhub-wcard:hover{border-color:rgba(17,65,113,0.18);box-shadow:0 8px 32px rgba(17,65,113,0.06)}
          .dmhub-dot{width:8px;height:8px;border-radius:50%;background:#FE9700;margin-bottom:16px}
          .dmhub-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .dmhub-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .dmhub-faq{background:#f8fafd;padding:80px 40px}.dmhub-faq-in{max-width:860px;margin:0 auto}
          .dmhub-fitem{border-bottom:1px solid #e5e7eb}
          .dmhub-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .dmhub-fq:hover{color:#114171}
          .dmhub-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .dmhub-fitem.open .dmhub-ficon{border-color:#114171;color:#114171;background:rgba(17,65,113,0.06)}
          .dmhub-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .dmhub-fitem.open .dmhub-fa{max-height:600px;padding-bottom:22px}
          .dmhub-cta{background:linear-gradient(135deg,#0F1F40 0%,#114171 50%,#1a3a6e 100%);padding:100px 40px;position:relative;overflow:hidden;text-align:center}
          .dmhub-cta-o{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(254,151,0,0.12) 0%,transparent 65%);pointer-events:none}
          .dmhub-cta-in{position:relative;z-index:1;max-width:700px;margin:0 auto}
          .dmhub-cta-t{font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#fff;line-height:1.1;margin-bottom:16px}
          .dmhub-cta-s{font-size:1.05rem;color:rgba(255,255,255,0.70);line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.dmhub-grid{grid-template-columns:repeat(2,1fr)}.dmhub-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.dmhub-hero,.dmhub-svc,.dmhub-ind,.dmhub-proc,.dmhub-why,.dmhub-faq,.dmhub-cta{padding:60px 24px}.dmhub-hero{padding-top:60px;padding-bottom:0}.dmhub-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.dmhub-stat:nth-child(2){border-right:none}.dmhub-grid{grid-template-columns:1fr}.dmhub-why-grid{grid-template-columns:1fr}.dmhub-step{grid-template-columns:56px 1fr}.dmhub-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="dmhub-page">
        <section className="dmhub-hero"><div className="dmhub-o1"/><div className="dmhub-o2"/>
          <div className="dmhub-in">
            <nav className="dmhub-bc"><Link href="/">Home</Link><span>/</span><span style={{color:'#FE9700'}}>Digital Marketing Services</span></nav>
            <span className="dmhub-badge"><span style={{width:6,height:6,borderRadius:'50%',background:'#FE9700',display:'inline-block'}}/> SEO · PPC · Social · Content · Email · Ecommerce</span>
            <h1 className="dmhub-h1">Digital Marketing Services — <span>Measurable Growth</span> Across Every Channel</h1>
            <p className="dmhub-sub">A full-service digital marketing agency with 15+ years of experience — SEO, Google Ads, social media marketing, content, email, ecommerce, and Amazon marketing across 600+ clients in 40+ industries.</p>
            <div className="dmhub-btns">
              <Link href="/contact" className="dmhub-btn-p">Get a Free Digital Marketing Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/free-45-day-seo-trial" className="dmhub-btn-s">Try SEO Free for 45 Days</Link>
            </div>
            <div className="dmhub-stats">{STATS.map(s => <div key={s.label} className="dmhub-stat"><div className="dmhub-stat-l">{s.label}</div><div className="dmhub-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="dmhub-svc"><div className="dmhub-svc-in">
          <span className="dmhub-ey2">Our Services</span><h2 className="dmhub-ttl">Digital Marketing Services</h2>
          <p className="dmhub-desc">Every digital marketing channel — organic and paid — with genuine expertise across SEO, PPC, social, content, email, ecommerce, and Amazon.</p>
          <div className="dmhub-grid" ref={cardsRef}>{SERVICES.map((s,i) => <Link key={s.n} href={s.href} className={`dmhub-card${visibleCards.includes(i)?' visible':''}`}><div className="dmhub-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></Link>)}</div>
        </div></section>
        <section className="dmhub-ind"><div className="dmhub-ind-in"><h2>Industries We Serve</h2><div className="dmhub-pills">{INDUSTRIES.map(ind => <span key={ind} className="dmhub-pill">{ind}</span>)}</div></div></section>
        <section className="dmhub-proc"><div className="dmhub-proc-in">
          <span className="dmhub-ey2">How We Work</span><h2 className="dmhub-ttl">Our Digital Marketing Process</h2>
          <p className="dmhub-desc">Discovery to strategy to results — a structured approach that connects every channel to your business goals from day one.</p>
          <div className="dmhub-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`dmhub-step${visibleSteps.includes(i)?' visible':''}`}><div className="dmhub-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="dmhub-why"><div className="dmhub-why-in">
          <span className="dmhub-ey2">Why 1Solutions</span><h2 className="dmhub-ttl">15+ Years, 600+ Clients, 40+ Industries — Digital Marketing That Delivers</h2>
          <p className="dmhub-desc">Experience, multi-channel expertise, and a focus on business outcomes — not vanity metrics.</p>
          <div className="dmhub-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`dmhub-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="dmhub-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="dmhub-faq"><div className="dmhub-faq-in">
          <span className="dmhub-ey2">Got Questions?</span><h2 className="dmhub-ttl">Digital Marketing FAQs</h2>
          <p className="dmhub-desc" style={{marginBottom:44}}>Common questions about digital marketing services.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`dmhub-fitem${openFaq===i?' open':''}`}><button className="dmhub-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="dmhub-ficon">{openFaq===i?'−':'+'}</span></button><div className="dmhub-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="dmhub-cta"><div className="dmhub-cta-o"/>
          <div className="dmhub-cta-in">
            <h2 className="dmhub-cta-t">Ready to Grow Through Digital Marketing?</h2>
            <p className="dmhub-cta-s">Tell us your goals, your budget, and your timeline — we&rsquo;ll recommend the right digital marketing mix and show you exactly what we would do.</p>
            <div className="dmhub-btns">
              <Link href="/contact" className="dmhub-btn-p">Get a Free Digital Marketing Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/free-45-day-seo-trial" className="dmhub-btn-s">Try SEO Free — 45 Days</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
