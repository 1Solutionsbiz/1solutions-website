import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const RECAPTCHA_KEY = '6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';

const SERVICES = [
  { n: '01', title: 'Amazon Product Listing Optimisation', desc: 'Keyword-rich product titles, bullet points, and descriptions written to rank in Amazon\'s A9 algorithm and convert browsers into buyers - balancing search visibility with persuasive copywriting.' },
  { n: '02', title: 'Amazon Keyword Research', desc: 'In-depth Amazon keyword research using Helium 10, Jungle Scout, and Amazon\'s own search data - identifying high-volume, high-intent keywords for titles, backend search terms, and PPC campaigns.' },
  { n: '03', title: 'Amazon A+ Content (EBC)', desc: 'Enhanced Brand Content and A+ Detail Page design - visually rich product descriptions with comparison charts, lifestyle images, and brand storytelling that increases conversion rates by up to 10%.' },
  { n: '04', title: 'Amazon Backend Search Terms', desc: 'Optimisation of all backend keyword fields - search terms, subject matter, intended use, target audience - maximising keyword indexing without keyword stuffing visible content.' },
  { n: '05', title: 'Amazon PPC Advertising', desc: 'Sponsored Products, Sponsored Brands, and Sponsored Display campaign management - keyword harvesting, bid optimisation, negative keyword pruning, and ACoS management for profitable ad performance.' },
  { n: '06', title: 'Amazon Brand Store Design', desc: 'Amazon Brand Store (storefront) design - a multi-page branded shopping experience within Amazon that drives cross-selling, improves brand perception, and increases organic sessions from branded searches.' },
  { n: '07', title: 'Amazon Review & Ratings Strategy', desc: 'Review generation strategy - Amazon Vine programme enrolment, follow-up email sequences (compliant with Amazon ToS), and product insert strategies that safely and legitimately increase review volume and ratings.' },
  { n: '08', title: 'Amazon SEO Audit & Competitor Analysis', desc: 'Full Amazon listing audit covering keyword indexing, Buy Box eligibility, listing health, image compliance, category optimisation, and competitor benchmarking - identifying every ranking and conversion gap.' },
];

const TOOLS = ['Helium 10', 'Jungle Scout', 'Amazon Seller Central', 'Amazon Ads Console', 'Brand Analytics', 'Amazon Vine', 'A+ Content Manager', 'Amazon Attribution', 'Merchant Words', 'DataDive'];

const PROCESS = [
  { step: '01', title: 'Amazon Account & Listing Audit', desc: 'Review of your current listings - keyword indexing, content quality, image compliance, review health, and competitor benchmarking - identifying the highest-impact optimisation opportunities.' },
  { step: '02', title: 'Keyword & Market Research', desc: 'Amazon keyword research mapped to purchase intent - primary keywords for titles, secondary for bullets, long-tail for backend - plus competitor keyword gap analysis.' },
  { step: '03', title: 'Listing Optimisation', desc: 'Title, bullet points, description, backend terms, and A+ Content rewritten and optimised - all reviewed and approved before going live.' },
  { step: '04', title: 'PPC Campaign Setup & Launch', desc: 'Sponsored Products, Brands, and Display campaigns structured and launched - initial auto campaigns for keyword harvesting, manual campaigns for priority terms.' },
  { step: '05', title: 'Ongoing Optimisation', desc: 'Weekly PPC bid adjustments, keyword adds and negatives, ACoS monitoring - plus monthly listing reviews reacting to algorithm updates and ranking changes.' },
  { step: '06', title: 'Monthly Reporting', desc: 'Organic ranking positions, PPC performance (ACoS, ROAS, revenue), review scores, and BSR trends - with next month\'s strategy adjustments.' },
];

const WHY = [
  { title: 'Amazon-Specific Expertise', desc: 'Amazon SEO is fundamentally different from Google SEO. The A9/A10 algorithm ranks by conversion probability - not just keyword relevance. Our team understands purchase velocity, review velocity, and the conversion metrics Amazon uses to rank products.' },
  { title: 'PPC + Organic in Coordination', desc: 'Amazon PPC performance feeds organic rankings - high-converting ads increase sales velocity which boosts organic position. We manage both together to maximise total page-1 presence across sponsored and organic placements.' },
  { title: 'A+ Content That Converts', desc: 'We design A+ Content that is not just visually attractive - it is structured to answer the objections that stop browsers from buying, with social proof, comparison tables, and benefit-led storytelling.' },
  { title: 'Brand Registry Expertise', desc: 'Amazon Brand Registry unlocks A+ Content, Brand Stores, Sponsored Brands, and Brand Analytics. If you are not yet enrolled, we guide you through the process and build the full Brand Registry toolkit from day one.' },
  { title: 'Amazon-Compliant Strategies Only', desc: 'We do not use incentivised reviews, black-hat keyword injection, or other tactics that risk account suspension. Every strategy is compliant with Amazon\'s Terms of Service - protecting your account and long-term marketplace position.' },
  { title: 'Integrated with Off-Amazon Traffic', desc: 'Amazon Attribution lets us track traffic from Google, social media, and email to your Amazon listings. We help brands use off-Amazon channels to drive ranking-boosting external traffic that improves organic position.' },
];

const FAQS = [
  { q: 'What is Amazon SEO and how does it work?', a: 'Amazon SEO is the process of optimising your product listings to rank higher in Amazon\'s search results. Amazon\'s A9/A10 algorithm ranks products based on: keyword relevance (how well the listing matches the search query); conversion rate (what percentage of people who see the listing buy it); sales velocity (how many units are selling, especially recently); review score and volume; price competitiveness; and availability/fulfilment method (FBA typically outranks FBM). Unlike Google, Amazon is a purchase-intent search engine - every searcher is a potential buyer. Ranking on page 1 for high-volume product keywords directly translates to incremental revenue.' },
  { q: 'How is Amazon SEO different from Google SEO?', a: 'Amazon and Google SEO share keyword research foundations but differ fundamentally in ranking signals. Google ranks based on authority, backlinks, content quality, and user signals across the open web. Amazon ranks based on purchase probability - conversion rate, sales velocity, review score, and price. There are no backlinks in Amazon\'s algorithm. Content on Amazon (titles, bullets, A+ Content) needs to be optimised for conversion, not just keyword density. Amazon PPC and organic rankings are deeply intertwined - ad spend generates sales velocity which feeds organic ranking. Our approach treats Amazon as a distinct platform requiring platform-specific expertise.' },
  { q: 'What is Amazon A9/A10 algorithm?', a: 'A9 is Amazon\'s core search algorithm, which has been progressively updated (informally called A10) with increased weighting on organic sales versus PPC-driven sales. Key ranking factors include: keyword indexing (is your keyword in the title, bullets, or backend?); click-through rate from search results; conversion rate on the product page; recent sales velocity; seller authority (account age, fulfilment performance, seller feedback); review velocity and score; and availability. The A10 updates have placed more emphasis on organic-driven sales and external traffic - meaning brands that drive traffic from outside Amazon (Google, email, social) get a ranking boost.' },
  { q: 'How long does Amazon SEO take to show results?', a: 'Amazon SEO results are faster than Google because the marketplace is closed and intent is pure. Listing optimisation improvements: clicks and conversions can improve within 1 to 2 weeks of publishing optimised content. Keyword ranking improvements: meaningful ranking changes for target keywords are typically visible within 4 to 8 weeks of combined organic + PPC optimisation. Significant BSR improvements: 2 to 4 months of consistent sales velocity growth. Review score improvements: ongoing, compounding over 3 to 6 months with an active review generation strategy.' },
  { q: 'Should I run Amazon PPC alongside organic SEO?', a: 'Yes - Amazon PPC and organic SEO are most effective when run together. PPC generates immediate sales velocity, which is a significant organic ranking signal - products that sell frequently rank higher organically. The data from PPC campaigns (which keywords are converting, at what ACoS) informs organic listing optimisation. PPC Sponsored Brands campaigns build brand visibility in header positions that organic rankings cannot access. We manage both channels in coordination because the synergy between them significantly outperforms either approach in isolation. Most new product launches require PPC support for the first 2 to 6 months to build the sales velocity needed for strong organic positioning.' },
  { q: 'Do you work with FBA and FBM sellers?', a: 'Yes. We work with both Fulfilled by Amazon (FBA) and Fulfilled by Merchant (FBM) sellers, as well as Seller Fulfilled Prime (SFP) and Vendor Central accounts. FBA products generally have a ranking advantage due to Prime badge eligibility and Amazon\'s fulfilment reliability signals - we factor this into our strategy. For FBM sellers competing in categories dominated by FBA, we focus on price competitiveness, review quality, and listing quality to close the gap. For Vendor Central (1P) accounts, keyword and content optimisation follows similar principles but the platform interface differs.' },
  { q: 'Can you help with Amazon account suspensions or listing suppressions?', a: 'Yes. Amazon account health issues and listing suppressions are handled as part of our Amazon SEO service or as standalone consultancy. Listing suppressions are commonly caused by: image policy violations (incorrect background, dimensions, or prohibited content); pricing errors (price too high relative to recent history); missing required attributes; or policy violations in content. We identify the root cause, prepare the corrected listing, and guide the reinstatement or appeal process. For full account suspensions, we prepare Plan of Action (POA) documents - but complex suspensions may require Amazon-specialist legal support beyond our scope.' },
  { q: 'Do you offer Amazon SEO for new product launches?', a: 'Yes. Amazon new product launches require a specific approach because the listing has no sales history, review history, or organic ranking. Our launch strategy includes: keyword research and fully optimised listing before the first sale; a PPC launch campaign to generate initial sales velocity; early review generation using Amazon Vine (if enrolled in Brand Registry); pricing strategy to remain competitive in the initial ranking phase; and an off-Amazon traffic strategy (Facebook ads, email campaigns with Amazon Attribution links) to drive external traffic that boosts ranking. A well-executed 60-day launch period can establish sustainable organic rankings that reduce long-term reliance on PPC.' },
];

const RELATED = [
  { href: '/amazon-account-management-services/', label: 'Amazon Account Management' },
  { href: '/amazon-fba-shipment-reconciliation-services/', label: 'Amazon FBA Reconciliation' },
  { href: '/ecommerce-seo-services/', label: 'eCommerce SEO Services' },
  { href: '/google-shopping-management/', label: 'Google Shopping Management' },
  { href: '/ppc-management-services/', label: 'PPC Management' },
  { href: '/ecommerce-website-development-services/', label: 'eCommerce Development' },
  { href: '/content-marketing-services/', label: 'Content Marketing' },
  { href: '/seo-services-company/', label: 'SEO Services' },
  { href: '/analytics-cro-services/', label: 'Analytics & CRO' },
  { href: '/ebay-account-management-services/', label: 'eBay Account Management' },
];

export default function AmazonSeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const [formSt, setFormSt] = useState('idle');
  const cardsRef = useRef(null);
  const stepRefs = useRef([]);
  const whyRef = useRef(null);
  const recaptchaLoaded = useRef(false);

  useEffect(() => {
    if (!cardsRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); }
    }, { threshold: 0.05 });
    o.observe(cardsRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const obs = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); }
      }, { threshold: 0.2 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!whyRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); }
    }, { threshold: 0.1 });
    o.observe(whyRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    const contact = document.getElementById('amazseo-contact');
    if (!contact) return;
    const rcObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !recaptchaLoaded.current) {
        const s = document.createElement('script');
        s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_KEY}`;
        s.async = true;
        document.head.appendChild(s);
        recaptchaLoaded.current = true;
        rcObs.disconnect();
      }
    }, { rootMargin: '300px' });
    rcObs.observe(contact);
    return () => rcObs.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name    = (fd.get('as-name') || '').trim();
    const email   = (fd.get('as-email') || '').trim();
    const phone   = (fd.get('as-phone') || '').trim();
    const company = (fd.get('as-brand') || '').trim();
    const asin    = (fd.get('as-asin') || '').trim();
    const msg     = (fd.get('as-msg') || '').trim();
    const consent = document.getElementById('as-consent')?.checked;
    if (!name || !email || !phone || !company || !msg || !consent) { setFormSt('validation'); return; }
    setFormSt('loading');
    try {
      const token = await new Promise(resolve => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(RECAPTCHA_KEY, { action: 'contact' }).then(resolve);
        });
      });
      const cc = fd.get('as-cc') || '';
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          phone: (cc ? cc + ' ' : '') + phone,
          company,
          message: `Brand/Store: ${company}\nASIN / Product Link: ${asin || 'Not provided'}\n\n${msg}`,
          source: 'Amazon SEO Services Page',
          consent: true,
          recaptchaToken: token,
        }),
      });
      if (res.ok) { setFormSt('success'); e.target.reset(); } else { setFormSt('error'); }
    } catch { setFormSt('error'); }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'Amazon SEO Services', item: 'https://www.1solutions.biz/amazon-seo-services/' },
        ],
      },
      {
        '@type': 'ProfessionalService',
        name: 'Amazon SEO Services',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Amazon SEO services by 1Solutions - product listing optimisation, keyword research, A+ content, PPC management, and brand store design to dominate Amazon search results.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127', bestRating: '5' },
        url: 'https://www.1solutions.biz/amazon-seo-services/',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Amazon SEO Services | 1Solutions</title>
        <meta name="description" content="Amazon SEO services - product listing optimisation, keyword research, A+ content, PPC management, and brand store design to dominate Amazon search results." />
        <meta name="keywords" content="amazon seo services, amazon listing optimisation, amazon keyword research, amazon ppc management, amazon a+ content, amazon product ranking, amazon seller seo" />
        <link rel="canonical" href="https://www.1solutions.biz/amazon-seo-services/" />
        <meta property="og:title" content="Amazon SEO Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/amazon-seo-services/" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-amazon-seo-services.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions Amazon SEO Services — rank higher, sell more on Amazon" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-amazon-seo-services.jpg" />
        <meta name="twitter:image:alt" content="1Solutions Amazon SEO Services — rank higher, sell more on Amazon" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .amazseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .amazseo-page *,.amazseo-page *::before,.amazseo-page *::after{box-sizing:border-box}

          /* ── SERVICES ── */
          .amazseo-svc{background:#f8fafd;padding:80px 40px}.amazseo-svc-in{max-width:1280px;margin:0 auto}
          .amazseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .amazseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .amazseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .amazseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .amazseo-card{background:linear-gradient(135deg,rgba(255,251,235,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(254,243,199,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(217,119,6,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease}
          .amazseo-card.visible{opacity:1;transform:translateY(0)}.amazseo-card:hover{transform:translateY(-6px);border-color:rgba(217,119,6,0.22);box-shadow:0 16px 48px rgba(217,119,6,0.09)}
          .amazseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#D97706;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .amazseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .amazseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}

          /* ── TOOLS ── */
          .amazseo-tools{background:linear-gradient(135deg,#92400E 0%,#D97706 100%);padding:60px 40px}
          .amazseo-tools-in{max-width:1280px;margin:0 auto;text-align:center}
          .amazseo-tools h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .amazseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .amazseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}

          /* ── PROCESS ── */
          .amazseo-proc{background:linear-gradient(135deg,#fffbeb 0%,#fffbeb 50%,#fef3c7 100%);padding:80px 40px}
          .amazseo-proc-in{max-width:900px;margin:0 auto}
          .amazseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .amazseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(217,119,6,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .amazseo-step:last-child{border-bottom:none}.amazseo-step.visible{opacity:1;transform:translateX(0)}
          .amazseo-snum{font-size:3rem;font-weight:900;color:rgba(217,119,6,0.15);line-height:1;letter-spacing:-2px}
          .amazseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .amazseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}

          /* ── WHY ── */
          .amazseo-why{background:#fff;padding:80px 40px}.amazseo-why-in{max-width:1280px;margin:0 auto}
          .amazseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .amazseo-wcard{background:linear-gradient(135deg,#fffbeb 0%,#fff 60%,#fef3c7 100%);border:1px solid rgba(217,119,6,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .amazseo-wcard.visible{opacity:1;transform:translateY(0)}.amazseo-wcard:hover{border-color:rgba(217,119,6,0.20);box-shadow:0 8px 32px rgba(217,119,6,0.07)}
          .amazseo-dot{width:8px;height:8px;border-radius:50%;background:#D97706;margin-bottom:16px}
          .amazseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .amazseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}

          /* ── FAQ ── */
          .amazseo-faq{background:#f8fafd;padding:80px 40px}.amazseo-faq-in{max-width:860px;margin:0 auto}
          .amazseo-fitem{border-bottom:1px solid #e5e7eb}
          .amazseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .amazseo-fq:hover{color:#D97706}
          .amazseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .amazseo-fitem.open .amazseo-ficon{border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06)}
          .amazseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .amazseo-fitem.open .amazseo-fa{max-height:600px;padding-bottom:22px}

          /* ── CONTACT FORM ── */
          .amazseo-contact{background:linear-gradient(135deg,rgba(217,119,6,0.06) 0%,rgba(255,255,255,0.90) 50%,rgba(254,243,199,0.20) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .amazseo-contact-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.10) 0%,transparent 70%);pointer-events:none}
          .amazseo-contact-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(146,64,14,0.08) 0%,transparent 70%);pointer-events:none}
          .amazseo-contact-in{max-width:1200px;margin:0 auto;position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start}
          .amazseo-contact-left h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 16px;line-height:1.15;letter-spacing:-0.5px}
          .amazseo-contact-left p{font-size:1rem;color:#4A6080;line-height:1.75;margin:0 0 32px}
          .amazseo-contact-perks{display:flex;flex-direction:column;gap:12px}
          .amazseo-contact-perk{display:flex;align-items:center;gap:10px;font-size:14px;color:#374151;font-weight:500}
          .amazseo-contact-perk svg{flex-shrink:0;color:#D97706}
          .amazseo-form-box{background:rgba(255,255,255,0.88);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.95);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .amazseo-form-box h3{font-size:18px;font-weight:800;color:#0F1F40;margin:0 0 22px;letter-spacing:-0.3px}
          .amazseo-form{display:flex;flex-direction:column;gap:14px}
          .amazseo-row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
          .amazseo-fg{display:flex;flex-direction:column;gap:5px}
          .amazseo-fg label{font-size:12px;font-weight:700;color:#374151;letter-spacing:0.02em;text-transform:uppercase}
          .amazseo-fg input,.amazseo-fg textarea,.amazseo-fg select{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;background:#fff;outline:none;transition:border-color 0.2s,box-shadow 0.2s;width:100%}
          .amazseo-fg input:focus,.amazseo-fg textarea:focus,.amazseo-fg select:focus{border-color:#D97706;box-shadow:0 0 0 3px rgba(217,119,6,0.10)}
          .amazseo-fg textarea{resize:vertical;min-height:110px}
          .amazseo-phone-wrap{display:flex;gap:8px}
          .amazseo-phone-wrap select{width:110px;flex-shrink:0}
          .amazseo-phone-wrap input{flex:1}
          .amazseo-consent{display:flex;align-items:flex-start;gap:10px;font-size:12px;color:#6b7280;line-height:1.55}
          .amazseo-consent input[type="checkbox"]{width:16px;height:16px;margin-top:1px;accent-color:#D97706;flex-shrink:0}
          .amazseo-consent a{color:#D97706;text-decoration:none}
          .amazseo-submit{padding:14px 28px;background:#D97706;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.25s;width:100%;box-shadow:0 6px 24px rgba(217,119,6,0.25)}
          .amazseo-submit:hover:not(:disabled){background:#92400E;transform:translateY(-2px);box-shadow:0 8px 32px rgba(217,119,6,0.35)}
          .amazseo-submit:disabled{opacity:0.65;cursor:not-allowed}
          .amazseo-val-err{font-size:13px;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px 14px;margin:0}
          .amazseo-success{text-align:center;padding:24px 0}
          .amazseo-success-icon{width:56px;height:56px;background:rgba(217,119,6,0.10);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
          .amazseo-success-icon svg{width:28px;height:28px;stroke:#D97706;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
          .amazseo-success h3{font-size:20px;font-weight:800;color:#0F1F40;margin:0 0 8px}
          .amazseo-success p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}

          /* ── RELATED SERVICES ── */
          .amazseo-related{background:linear-gradient(135deg,rgba(255,251,235,0.60) 0%,rgba(255,255,255,0.90) 50%,rgba(254,243,199,0.30) 100%);padding:80px 40px;border-top:1px solid rgba(217,119,6,0.10)}
          .amazseo-related-in{max-width:1280px;margin:0 auto;text-align:center}
          .amazseo-related-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6b7280;margin:0 0 14px;display:block}
          .amazseo-related-ttl{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.15;letter-spacing:-0.5px;color:#0F1F40;margin:0 0 14px}
          .amazseo-related-sub{font-size:15px;color:#4A6080;line-height:1.7;margin:0 auto 36px;max-width:640px}
          .amazseo-related-divider{border:none;border-top:1px solid rgba(217,119,6,0.12);margin:0 0 32px}
          .amazseo-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .amazseo-rtag{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;transition:all 0.22s;border:1.5px solid}
          .amazseo-rtag-amber{background:rgba(217,119,6,0.07);border-color:rgba(217,119,6,0.20);color:#92400E}.amazseo-rtag-amber:hover{background:rgba(217,119,6,0.14);border-color:#D97706;transform:translateY(-2px)}
          .amazseo-rtag-blue{background:rgba(15,52,96,0.06);border-color:rgba(15,52,96,0.15);color:#0F3460}.amazseo-rtag-blue:hover{background:rgba(15,52,96,0.12);border-color:#0F3460;transform:translateY(-2px)}
          .amazseo-rtag-teal{background:rgba(20,184,166,0.07);border-color:rgba(20,184,166,0.20);color:#0f766e}.amazseo-rtag-teal:hover{background:rgba(20,184,166,0.14);border-color:#14b8a6;transform:translateY(-2px)}
          .amazseo-rtag-green{background:rgba(34,197,94,0.07);border-color:rgba(34,197,94,0.20);color:#166534}.amazseo-rtag-green:hover{background:rgba(34,197,94,0.14);border-color:#22c55e;transform:translateY(-2px)}
          .amazseo-rtag-violet{background:rgba(139,92,246,0.07);border-color:rgba(139,92,246,0.20);color:#5b21b6}.amazseo-rtag-violet:hover{background:rgba(139,92,246,0.14);border-color:#8b5cf6;transform:translateY(-2px)}
          .amazseo-rtag-rose{background:rgba(244,63,94,0.07);border-color:rgba(244,63,94,0.20);color:#be123c}.amazseo-rtag-rose:hover{background:rgba(244,63,94,0.14);border-color:#f43f5e;transform:translateY(-2px)}

          /* ── RESPONSIVE ── */
          @media(max-width:1024px){.amazseo-grid{grid-template-columns:repeat(2,1fr)}.amazseo-why-grid{grid-template-columns:repeat(2,1fr)}.amazseo-contact-in{grid-template-columns:1fr}}
          @media(max-width:768px){
            .amazseo-svc,.amazseo-tools,.amazseo-proc,.amazseo-why,.amazseo-faq,.amazseo-contact,.amazseo-related{padding:60px 24px}
            .amazseo-grid{grid-template-columns:1fr}
            .amazseo-why-grid{grid-template-columns:1fr}
            .amazseo-step{grid-template-columns:56px 1fr}
            .amazseo-row2{grid-template-columns:1fr}
          }
        
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>
      <div className="amazseo-page">

        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="Listing Optimisation · PPC · A+ Content · Brand Store"
          title={<>Amazon SEO Services - <AuroraText>Rank Higher, Sell More on Amazon</AuroraText></>}
          subtext="Product listing optimisation, keyword research, A+ Content, Sponsored Ads management, and Brand Store design - everything needed to dominate Amazon search results and convert browsers into buyers."
          primaryCta={{ label: 'Get a Free Amazon SEO Audit', href: '#amazseo-contact' }}
          secondaryCta={{ label: 'Amazon Account Management', href: '/amazon-account-management-services/' }}
          stats={[
            { label: 'Amazon Products Optimised', value: '2,000', suffix: '+' },
            { label: 'Avg Sales Rank Improvement', value: '68', prefix: '+', suffix: '%' },
            { label: 'Years Amazon Experience', value: '10', suffix: '+' },
            { label: 'Client Retention', value: '91', suffix: '%' },
          ]}
        />

        {/* ── SERVICES ── */}
        <section className="amazseo-svc"><div className="amazseo-svc-in">
          <span className="amazseo-ey2">What We Do</span>
          <h2 className="amazseo-ttl">Amazon SEO Services</h2>
          <p className="amazseo-desc">From keyword research to A+ Content - every element of your Amazon presence optimised to rank and convert.</p>
          <div className="amazseo-grid" ref={cardsRef}>
            {SERVICES.map((s,i) => (
              <div key={s.n} className={`amazseo-card${visibleCards.includes(i) ? ' visible' : ''}`}>
                <div className="amazseo-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div></section>

        {/* ── TOOLS ── */}
        <section className="amazseo-tools"><div className="amazseo-tools-in">
          <h2>Tools &amp; Platforms We Use</h2>
          <div className="amazseo-pills">{TOOLS.map(t => <span key={t} className="amazseo-pill">{t}</span>)}</div>
        </div></section>

        {/* ── PROCESS ── */}
        <section className="amazseo-proc"><div className="amazseo-proc-in">
          <span className="amazseo-ey2">How We Work</span>
          <h2 className="amazseo-ttl">Our Amazon SEO Process</h2>
          <p className="amazseo-desc">Audit to ongoing optimisation - a structured process combining organic listing improvements with coordinated PPC campaigns.</p>
          <div className="amazseo-steps">
            {PROCESS.map((p,i) => (
              <div key={p.step} ref={el => { stepRefs.current[i] = el; }} className={`amazseo-step${visibleSteps.includes(i) ? ' visible' : ''}`}>
                <div className="amazseo-snum">{p.step}</div>
                <div><h3>{p.title}</h3><p>{p.desc}</p></div>
              </div>
            ))}
          </div>
        </div></section>

        {/* ── WHY US ── */}
        <section className="amazseo-why"><div className="amazseo-why-in">
          <span className="amazseo-ey2">Why 1Solutions</span>
          <h2 className="amazseo-ttl">Amazon-Specific Expertise - Not Adapted from Google SEO</h2>
          <p className="amazseo-desc">Amazon&rsquo;s A9 algorithm rewards conversion probability, not just keywords. We build strategies around what actually moves the Amazon ranking needle.</p>
          <div className="amazseo-why-grid" ref={whyRef}>
            {WHY.map((w,i) => (
              <div key={w.title} className={`amazseo-wcard${visibleWhy.includes(i) ? ' visible' : ''}`}>
                <div className="amazseo-dot"/>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div></section>

        {/* ── FAQ ── */}
        <section className="amazseo-faq"><div className="amazseo-faq-in">
          <span className="amazseo-ey2">Got Questions?</span>
          <h2 className="amazseo-ttl">Amazon SEO FAQs</h2>
          <p className="amazseo-desc" style={{marginBottom:44}}>Answers to the most common questions about our Amazon SEO and listing optimisation services.</p>
          <div>
            {FAQS.map((f,i) => (
              <div key={i} className={`amazseo-fitem${openFaq === i ? ' open' : ''}`}>
                <button className="amazseo-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  {f.q}
                  <span className="amazseo-ficon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="amazseo-fa" style={openFaq === i ? {maxHeight:600,paddingBottom:22} : {}}>{f.a}</div>
              </div>
            ))}
          </div>
        </div></section>

        {/* ── CONTACT FORM ── */}
        <section className="amazseo-contact" id="amazseo-contact">
          <div className="amazseo-contact-o1"/><div className="amazseo-contact-o2"/>
          <div className="amazseo-contact-in">
            <div className="amazseo-contact-left">
              <span className="amazseo-ey2">Free Amazon SEO Audit</span>
              <h2>Get Your Amazon Listings Ranked &amp; Converting</h2>
              <p>Share your ASIN or storefront link - we&rsquo;ll audit your keyword indexing, content quality, and competitor gaps, then show you exactly what&rsquo;s holding your rankings back. No obligation, no fluff.</p>
              <div className="amazseo-contact-perks">
                {[
                  'Full keyword indexing audit',
                  'A9 ranking factor analysis',
                  'Competitor gap identification',
                  'A+ Content & PPC review',
                  'Free, no-obligation report',
                ].map(perk => (
                  <div key={perk} className="amazseo-contact-perk">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {perk}
                  </div>
                ))}
              </div>
            </div>

            <div className="amazseo-form-box">
              <h3>Request a Free Amazon SEO Audit</h3>
              {formSt === 'success' ? (
                <div className="amazseo-success">
                  <div className="amazseo-success-icon">
                    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>An Amazon SEO specialist will review your listings and be in touch within 24 hours.</p>
                </div>
              ) : (
                <form className="amazseo-form" onSubmit={handleSubmit} noValidate>
                  {formSt === 'validation' && <p className="amazseo-val-err">Please complete all required fields and accept the privacy policy before submitting.</p>}
                  {formSt === 'error' && <p className="amazseo-val-err">Something went wrong. Please try again or email us at info@1solutions.biz</p>}
                  <div className="amazseo-row2">
                    <div className="amazseo-fg">
                      <label htmlFor="as-name">Full Name *</label>
                      <input id="as-name" name="as-name" type="text" placeholder="Jane Smith" required/>
                    </div>
                    <div className="amazseo-fg">
                      <label htmlFor="as-email">Business Email *</label>
                      <input id="as-email" name="as-email" type="email" placeholder="jane@yourbrand.com" required/>
                    </div>
                  </div>
                  <div className="amazseo-row2">
                    <div className="amazseo-fg">
                      <label>Phone Number *</label>
                      <div className="amazseo-phone-wrap">
                        <select name="as-cc" aria-label="Country code">
                          <option value="+1">+1 US</option>
                          <option value="+1">+1 CA</option>
                          <option value="+61">+61 AU</option>
                          <option value="+44">+44 GB</option>
                          <option value="+91">+91 IN</option>
                        </select>
                        <input name="as-phone" type="tel" placeholder="Phone number" required aria-label="Phone number"/>
                      </div>
                    </div>
                    <div className="amazseo-fg">
                      <label htmlFor="as-brand">Brand / Store Name *</label>
                      <input id="as-brand" name="as-brand" type="text" placeholder="Your Amazon brand name" required/>
                    </div>
                  </div>
                  <div className="amazseo-fg">
                    <label htmlFor="as-asin">ASIN or Amazon Storefront URL</label>
                    <input id="as-asin" name="as-asin" type="text" placeholder="e.g. B08N5WRWNW or amazon.com/stores/YourBrand"/>
                  </div>
                  <div className="amazseo-fg">
                    <label htmlFor="as-msg">Tell Us About Your Goals *</label>
                    <textarea id="as-msg" name="as-msg" rows={4} placeholder="Current ranking issues, main competitors, product categories, monthly sales target, PPC budget..." required/>
                  </div>
                  <div className="amazseo-consent">
                    <input type="checkbox" id="as-consent"/>
                    <label htmlFor="as-consent">
                      I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions storing my data to respond to this enquiry. *
                    </label>
                  </div>
                  <button type="submit" className="amazseo-submit" disabled={formSt === 'loading'}>
                    {formSt === 'loading' ? 'Sending...' : 'Request My Free Amazon Audit →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="amazseo-related">
          <div className="amazseo-related-in">
            <span className="amazseo-related-ey">Explore Related Services</span>
            <h2 className="amazseo-related-ttl">Related Amazon &amp; eCommerce Services</h2>
            <p className="amazseo-related-sub">Pair Amazon SEO with complementary services to maximise your marketplace presence and grow revenue across every channel.</p>
            <hr className="amazseo-related-divider"/>
            <div className="amazseo-related-tags">
              <Link href="/amazon-account-management-services/" className="amazseo-rtag amazseo-rtag-amber">Amazon Account Management</Link>
              <Link href="/amazon-fba-shipment-reconciliation-services/" className="amazseo-rtag amazseo-rtag-blue">Amazon FBA Reconciliation</Link>
              <Link href="/ecommerce-seo-services/" className="amazseo-rtag amazseo-rtag-teal">eCommerce SEO Services</Link>
              <Link href="/google-shopping-management/" className="amazseo-rtag amazseo-rtag-green">Google Shopping Management</Link>
              <Link href="/ppc-management-services/" className="amazseo-rtag amazseo-rtag-violet">PPC Management Services</Link>
              <Link href="/ecommerce-website-development-services/" className="amazseo-rtag amazseo-rtag-amber">eCommerce Development</Link>
              <Link href="/content-marketing-services/" className="amazseo-rtag amazseo-rtag-rose">Content Marketing</Link>
              <Link href="/seo-services-company/" className="amazseo-rtag amazseo-rtag-blue">SEO Services</Link>
              <Link href="/analytics-cro-services/" className="amazseo-rtag amazseo-rtag-teal">Analytics &amp; CRO</Link>
              <Link href="/ebay-account-management-services/" className="amazseo-rtag amazseo-rtag-green">eBay Account Management</Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
