import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Amazon Product Listing Optimisation', desc: 'Keyword-rich product titles, bullet points, and descriptions written to rank in Amazon\'s A9 algorithm and convert browsers into buyers — balancing search visibility with persuasive copywriting.' },
  { n: '02', title: 'Amazon Keyword Research', desc: 'In-depth Amazon keyword research using Helium 10, Jungle Scout, and Amazon\'s own search data — identifying high-volume, high-intent keywords for titles, backend search terms, and PPC campaigns.' },
  { n: '03', title: 'Amazon A+ Content (EBC)', desc: 'Enhanced Brand Content and A+ Detail Page design — visually rich product descriptions with comparison charts, lifestyle images, and brand storytelling that increases conversion rates by up to 10%.' },
  { n: '04', title: 'Amazon Backend Search Terms', desc: 'Optimisation of all backend keyword fields — search terms, subject matter, intended use, target audience — maximising keyword indexing without keyword stuffing visible content.' },
  { n: '05', title: 'Amazon PPC Advertising', desc: 'Sponsored Products, Sponsored Brands, and Sponsored Display campaign management — keyword harvesting, bid optimisation, negative keyword pruning, and ACoS management for profitable ad performance.' },
  { n: '06', title: 'Amazon Brand Store Design', desc: 'Amazon Brand Store (storefront) design — a multi-page branded shopping experience within Amazon that drives cross-selling, improves brand perception, and increases organic sessions from branded searches.' },
  { n: '07', title: 'Amazon Review & Ratings Strategy', desc: 'Review generation strategy — Amazon Vine programme enrolment, follow-up email sequences (compliant with Amazon ToS), and product insert strategies that safely and legitimately increase review volume and ratings.' },
  { n: '08', title: 'Amazon SEO Audit & Competitor Analysis', desc: 'Full Amazon listing audit covering keyword indexing, Buy Box eligibility, listing health, image compliance, category optimisation, and competitor benchmarking — identifying every ranking and conversion gap.' },
];

const TOOLS = ['Helium 10', 'Jungle Scout', 'Amazon Seller Central', 'Amazon Ads Console', 'Brand Analytics', 'Amazon Vine', 'A+ Content Manager', 'Amazon Attribution', 'Merchant Words', 'DataDive'];

const PROCESS = [
  { step: '01', title: 'Amazon Account & Listing Audit', desc: 'Review of your current listings — keyword indexing, content quality, image compliance, review health, and competitor benchmarking — identifying the highest-impact optimisation opportunities.' },
  { step: '02', title: 'Keyword & Market Research', desc: 'Amazon keyword research mapped to purchase intent — primary keywords for titles, secondary for bullets, long-tail for backend — plus competitor keyword gap analysis.' },
  { step: '03', title: 'Listing Optimisation', desc: 'Title, bullet points, description, backend terms, and A+ Content rewritten and optimised — all reviewed and approved before going live.' },
  { step: '04', title: 'PPC Campaign Setup & Launch', desc: 'Sponsored Products, Brands, and Display campaigns structured and launched — initial auto campaigns for keyword harvesting, manual campaigns for priority terms.' },
  { step: '05', title: 'Ongoing Optimisation', desc: 'Weekly PPC bid adjustments, keyword adds and negatives, ACoS monitoring — plus monthly listing reviews reacting to algorithm updates and ranking changes.' },
  { step: '06', title: 'Monthly Reporting', desc: 'Organic ranking positions, PPC performance (ACoS, ROAS, revenue), review scores, and BSR trends — with next month\'s strategy adjustments.' },
];

const WHY = [
  { title: 'Amazon-Specific Expertise', desc: 'Amazon SEO is fundamentally different from Google SEO. The A9/A10 algorithm ranks by conversion probability — not just keyword relevance. Our team understands purchase velocity, review velocity, and the conversion metrics Amazon uses to rank products.' },
  { title: 'PPC + Organic in Coordination', desc: 'Amazon PPC performance feeds organic rankings — high-converting ads increase sales velocity which boosts organic position. We manage both together to maximise total page-1 presence across sponsored and organic placements.' },
  { title: 'A+ Content That Converts', desc: 'We design A+ Content that is not just visually attractive — it is structured to answer the objections that stop browsers from buying, with social proof, comparison tables, and benefit-led storytelling.' },
  { title: 'Brand Registry Expertise', desc: 'Amazon Brand Registry unlocks A+ Content, Brand Stores, Sponsored Brands, and Brand Analytics. If you are not yet enrolled, we guide you through the process and build the full Brand Registry toolkit from day one.' },
  { title: 'Amazon-Compliant Strategies Only', desc: 'We do not use incentivised reviews, black-hat keyword injection, or other tactics that risk account suspension. Every strategy is compliant with Amazon\'s Terms of Service — protecting your account and long-term marketplace position.' },
  { title: 'Integrated with Off-Amazon Traffic', desc: 'Amazon Attribution lets us track traffic from Google, social media, and email to your Amazon listings. We help brands use off-Amazon channels to drive ranking-boosting external traffic that improves organic position.' },
];

const FAQS = [
  { q: 'What is Amazon SEO and how does it work?', a: 'Amazon SEO is the process of optimising your product listings to rank higher in Amazon\'s search results. Amazon\'s A9/A10 algorithm ranks products based on: keyword relevance (how well the listing matches the search query); conversion rate (what percentage of people who see the listing buy it); sales velocity (how many units are selling, especially recently); review score and volume; price competitiveness; and availability/fulfilment method (FBA typically outranks FBM). Unlike Google, Amazon is a purchase-intent search engine — every searcher is a potential buyer. Ranking on page 1 for high-volume product keywords directly translates to incremental revenue.' },
  { q: 'How is Amazon SEO different from Google SEO?', a: 'Amazon and Google SEO share keyword research foundations but differ fundamentally in ranking signals. Google ranks based on authority, backlinks, content quality, and user signals across the open web. Amazon ranks based on purchase probability — conversion rate, sales velocity, review score, and price. There are no backlinks in Amazon\'s algorithm. Content on Amazon (titles, bullets, A+ Content) needs to be optimised for conversion, not just keyword density. Amazon PPC and organic rankings are deeply intertwined — ad spend generates sales velocity which feeds organic ranking. Our approach treats Amazon as a distinct platform requiring platform-specific expertise.' },
  { q: 'What is Amazon A9/A10 algorithm?', a: 'A9 is Amazon\'s core search algorithm, which has been progressively updated (informally called A10) with increased weighting on organic sales versus PPC-driven sales. Key ranking factors include: keyword indexing (is your keyword in the title, bullets, or backend?); click-through rate from search results; conversion rate on the product page; recent sales velocity; seller authority (account age, fulfilment performance, seller feedback); review velocity and score; and availability. The A10 updates have placed more emphasis on organic-driven sales and external traffic — meaning brands that drive traffic from outside Amazon (Google, email, social) get a ranking boost.' },
  { q: 'How long does Amazon SEO take to show results?', a: 'Amazon SEO results are faster than Google because the marketplace is closed and intent is pure. Listing optimisation improvements: clicks and conversions can improve within 1 to 2 weeks of publishing optimised content. Keyword ranking improvements: meaningful ranking changes for target keywords are typically visible within 4 to 8 weeks of combined organic + PPC optimisation. Significant BSR improvements: 2 to 4 months of consistent sales velocity growth. Review score improvements: ongoing, compounding over 3 to 6 months with an active review generation strategy.' },
  { q: 'Should I run Amazon PPC alongside organic SEO?', a: 'Yes — Amazon PPC and organic SEO are most effective when run together. PPC generates immediate sales velocity, which is a significant organic ranking signal — products that sell frequently rank higher organically. The data from PPC campaigns (which keywords are converting, at what ACoS) informs organic listing optimisation. PPC Sponsored Brands campaigns build brand visibility in header positions that organic rankings cannot access. We manage both channels in coordination because the synergy between them significantly outperforms either approach in isolation. Most new product launches require PPC support for the first 2 to 6 months to build the sales velocity needed for strong organic positioning.' },
  { q: 'Do you work with FBA and FBM sellers?', a: 'Yes. We work with both Fulfilled by Amazon (FBA) and Fulfilled by Merchant (FBM) sellers, as well as Seller Fulfilled Prime (SFP) and Vendor Central accounts. FBA products generally have a ranking advantage due to Prime badge eligibility and Amazon\'s fulfilment reliability signals — we factor this into our strategy. For FBM sellers competing in categories dominated by FBA, we focus on price competitiveness, review quality, and listing quality to close the gap. For Vendor Central (1P) accounts, keyword and content optimisation follows similar principles but the platform interface differs.' },
  { q: 'Can you help with Amazon account suspensions or listing suppressions?', a: 'Yes. Amazon account health issues and listing suppressions are handled as part of our Amazon SEO service or as standalone consultancy. Listing suppressions are commonly caused by: image policy violations (incorrect background, dimensions, or prohibited content); pricing errors (price too high relative to recent history); missing required attributes; or policy violations in content. We identify the root cause, prepare the corrected listing, and guide the reinstatement or appeal process. For full account suspensions, we prepare Plan of Action (POA) documents — but complex suspensions may require Amazon-specialist legal support beyond our scope.' },
  { q: 'Do you offer Amazon SEO for new product launches?', a: 'Yes. Amazon new product launches require a specific approach because the listing has no sales history, review history, or organic ranking. Our launch strategy includes: keyword research and fully optimised listing before the first sale; a PPC launch campaign to generate initial sales velocity; early review generation using Amazon Vine (if enrolled in Brand Registry); pricing strategy to remain competitive in the initial ranking phase; and an off-Amazon traffic strategy (Facebook ads, email campaigns with Amazon Attribution links) to drive external traffic that boosts ranking. A well-executed 60-day launch period can establish sustainable organic rankings that reduce long-term reliance on PPC.' },
];

const STATS = [
  { label: 'Amazon Products Optimised', val: '2,000+' },
  { label: 'Avg Sales Rank Improvement', val: '+68%' },
  { label: 'Years Amazon Experience', val: '10+' },
  { label: 'Client Retention', val: '91%' },
];

export default function AmazonSeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Amazon SEO Services', item: 'https://www.1solutions.biz/amazon-seo-services/' }] }, { '@type': 'Service', name: 'Amazon SEO Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Amazon SEO', url: 'https://www.1solutions.biz/amazon-seo-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Amazon SEO Services | Amazon Listing Optimisation & PPC Management | 1Solutions</title>
        <meta name="description" content="Amazon SEO services — product listing optimisation, keyword research, A+ content, PPC management, and brand store design. Rank higher in Amazon search and convert more browsers into buyers." />
        <meta name="keywords" content="amazon seo services, amazon listing optimisation, amazon keyword research, amazon ppc management, amazon a+ content, amazon product ranking, amazon seller seo" />
        <link rel="canonical" href="https://www.1solutions.biz/amazon-seo-services/" />
        <meta property="og:title" content="Amazon SEO Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/amazon-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .amazseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .amazseo-page *,.amazseo-page *::before,.amazseo-page *::after{box-sizing:border-box}
          .amazseo-hero{background:linear-gradient(135deg,#fffbeb 0%,#fef3c7 30%,#fde68a 65%,#fffbeb 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .amazseo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .amazseo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(146,64,14,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .amazseo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .amazseo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .amazseo-bc a{color:#6b7280;text-decoration:none}.amazseo-bc a:hover{color:#D97706}.amazseo-bc span{color:#d1d5db}
          .amazseo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(217,119,6,0.08);border:1px solid rgba(217,119,6,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#D97706;margin-bottom:28px}
          .amazseo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#92400E 0%,#D97706 50%,#B45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .amazseo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .amazseo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .amazseo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#D97706;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(217,119,6,0.28)}
          .amazseo-btn-p:hover{background:#92400E;box-shadow:0 8px 32px rgba(217,119,6,0.38);transform:translateY(-2px)}
          .amazseo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .amazseo-btn-s:hover{border-color:#D97706;color:#D97706;transform:translateY(-2px)}
          .amazseo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(217,119,6,0.07)}
          .amazseo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(217,119,6,0.08)}.amazseo-stat:last-child{border-right:none}
          .amazseo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .amazseo-stat-v{font-size:1.6rem;font-weight:900;color:#D97706;letter-spacing:-0.5px}
          .amazseo-svc{background:#f8fafd;padding:80px 40px}.amazseo-svc-in{max-width:1280px;margin:0 auto}
          .amazseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .amazseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#92400E 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .amazseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .amazseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .amazseo-card{background:linear-gradient(135deg,rgba(255,251,235,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(254,243,199,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(217,119,6,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease}
          .amazseo-card.visible{opacity:1;transform:translateY(0)}.amazseo-card:hover{transform:translateY(-6px);border-color:rgba(217,119,6,0.22);box-shadow:0 16px 48px rgba(217,119,6,0.09)}
          .amazseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#D97706;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .amazseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .amazseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .amazseo-tools{background:linear-gradient(135deg,#92400E 0%,#D97706 100%);padding:60px 40px}
          .amazseo-tools-in{max-width:1280px;margin:0 auto;text-align:center}
          .amazseo-tools h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .amazseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .amazseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .amazseo-proc{background:linear-gradient(135deg,#fffbeb 0%,#fffbeb 50%,#fef3c7 100%);padding:80px 40px}
          .amazseo-proc-in{max-width:900px;margin:0 auto}
          .amazseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .amazseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(217,119,6,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .amazseo-step:last-child{border-bottom:none}.amazseo-step.visible{opacity:1;transform:translateX(0)}
          .amazseo-snum{font-size:3rem;font-weight:900;color:rgba(217,119,6,0.15);line-height:1;letter-spacing:-2px}
          .amazseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .amazseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .amazseo-why{background:#fff;padding:80px 40px}.amazseo-why-in{max-width:1280px;margin:0 auto}
          .amazseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .amazseo-wcard{background:linear-gradient(135deg,#fffbeb 0%,#fff 60%,#fef3c7 100%);border:1px solid rgba(217,119,6,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .amazseo-wcard.visible{opacity:1;transform:translateY(0)}.amazseo-wcard:hover{border-color:rgba(217,119,6,0.20);box-shadow:0 8px 32px rgba(217,119,6,0.07)}
          .amazseo-dot{width:8px;height:8px;border-radius:50%;background:#D97706;margin-bottom:16px}
          .amazseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .amazseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .amazseo-faq{background:#f8fafd;padding:80px 40px}.amazseo-faq-in{max-width:860px;margin:0 auto}
          .amazseo-fitem{border-bottom:1px solid #e5e7eb}
          .amazseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .amazseo-fq:hover{color:#D97706}
          .amazseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .amazseo-fitem.open .amazseo-ficon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .amazseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .amazseo-fitem.open .amazseo-fa{max-height:600px;padding-bottom:22px}
          .amazseo-cta{background:linear-gradient(135deg,rgba(217,119,6,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(146,64,14,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .amazseo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.10) 0%,transparent 70%);pointer-events:none}
          .amazseo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(146,64,14,0.08) 0%,transparent 70%);pointer-events:none}
          .amazseo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .amazseo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#92400E 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .amazseo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.amazseo-grid{grid-template-columns:repeat(2,1fr)}.amazseo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.amazseo-hero,.amazseo-svc,.amazseo-tools,.amazseo-proc,.amazseo-why,.amazseo-faq,.amazseo-cta{padding:60px 24px}.amazseo-hero{padding-top:60px;padding-bottom:0}.amazseo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.amazseo-stat:nth-child(2){border-right:none}.amazseo-grid{grid-template-columns:1fr}.amazseo-why-grid{grid-template-columns:1fr}.amazseo-step{grid-template-columns:56px 1fr}.amazseo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="amazseo-page">
        <section className="amazseo-hero"><div className="amazseo-o1"/><div className="amazseo-o2"/>
          <div className="amazseo-in">
            <nav className="amazseo-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO</Link><span>/</span><span style={{color:'#D97706'}}>Amazon SEO Services</span></nav>
            <span className="amazseo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#D97706',display:'inline-block'}}/> Listing Optimisation · PPC · A+ Content · Brand Store</span>
            <h1 className="amazseo-h1">Amazon SEO Services — Rank Higher, Sell More on Amazon</h1>
            <p className="amazseo-sub">Product listing optimisation, keyword research, A+ Content, Sponsored Ads management, and Brand Store design — everything needed to dominate Amazon search results and convert browsers into buyers.</p>
            <div className="amazseo-btns">
              <Link href="/contact-us" className="amazseo-btn-p">Get an Amazon SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/amazon-account-management-services" className="amazseo-btn-s">Amazon Account Management</Link>
            </div>
            <div className="amazseo-stats">{STATS.map(s => <div key={s.label} className="amazseo-stat"><div className="amazseo-stat-l">{s.label}</div><div className="amazseo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="amazseo-svc"><div className="amazseo-svc-in">
          <span className="amazseo-ey2">What We Do</span><h2 className="amazseo-ttl">Amazon SEO Services</h2>
          <p className="amazseo-desc">From keyword research to A+ Content — every element of your Amazon presence optimised to rank and convert.</p>
          <div className="amazseo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`amazseo-card${visibleCards.includes(i)?' visible':''}`}><div className="amazseo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="amazseo-tools"><div className="amazseo-tools-in"><h2>Tools &amp; Platforms We Use</h2><div className="amazseo-pills">{TOOLS.map(t => <span key={t} className="amazseo-pill">{t}</span>)}</div></div></section>
        <section className="amazseo-proc"><div className="amazseo-proc-in">
          <span className="amazseo-ey2">How We Work</span><h2 className="amazseo-ttl">Our Amazon SEO Process</h2>
          <p className="amazseo-desc">Audit to ongoing optimisation — a structured process combining organic listing improvements with coordinated PPC campaigns.</p>
          <div className="amazseo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`amazseo-step${visibleSteps.includes(i)?' visible':''}`}><div className="amazseo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="amazseo-why"><div className="amazseo-why-in">
          <span className="amazseo-ey2">Why 1Solutions</span><h2 className="amazseo-ttl">Amazon-Specific Expertise — Not Adapted from Google SEO</h2>
          <p className="amazseo-desc">Amazon's A9 algorithm rewards conversion probability, not just keywords. We build strategies around what actually moves the Amazon ranking needle.</p>
          <div className="amazseo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`amazseo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="amazseo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="amazseo-faq"><div className="amazseo-faq-in">
          <span className="amazseo-ey2">Got Questions?</span><h2 className="amazseo-ttl">Amazon SEO FAQs</h2>
          <p className="amazseo-desc" style={{marginBottom:44}}>Answers to the most common questions about our Amazon SEO and listing optimisation services.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`amazseo-fitem${openFaq===i?' open':''}`}><button className="amazseo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="amazseo-ficon">{openFaq===i?'−':'+'}</span></button><div className="amazseo-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="amazseo-cta"><div className="amazseo-cta-o1"/><div className="amazseo-cta-o2"/>
          <div className="amazseo-cta-in">
            <span className="amazseo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to grow your Amazon revenue?</span>
            <h2 className="amazseo-cta-t">Get a Free Amazon Listing Audit</h2>
            <p className="amazseo-cta-s">Share your ASIN or storefront link — we&rsquo;ll audit your keyword indexing, content quality, and competitor gap, and show you exactly what&rsquo;s holding your rankings back.</p>
            <div className="amazseo-btns">
              <Link href="/contact-us" className="amazseo-btn-p">Request a Free Amazon Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/ecommerce-seo-services" className="amazseo-btn-s">Ecommerce SEO Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
