import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Facebook Page Management', desc: 'End-to-end Facebook page management — content calendar, post creation, scheduling, community management, comment and message responses, and ongoing performance monitoring.' },
  { n: '02', title: 'Facebook Content Strategy', desc: 'Monthly content strategy tailored to your brand, audience, and business goals — content pillars, post formats, campaign planning, and seasonal content calendar development.' },
  { n: '03', title: 'Facebook Ads Management', desc: 'Paid Facebook advertising — campaign strategy, audience targeting, ad creative, A/B testing, budget management, and ROAS optimisation across Lead Generation, Traffic, Conversion, and Awareness objectives.' },
  { n: '04', title: 'Facebook Audience Building', desc: 'Organic and paid audience growth — targeted like campaigns, lookalike audience strategies, retargeting custom audiences, and community growth tactics to build an engaged following.' },
  { n: '05', title: 'Facebook Reels & Video', desc: 'Short-form video content creation and strategy for Facebook Reels — scripting, editing, captioning, and optimisation for maximum organic reach in Facebook\'s video-first algorithm.' },
  { n: '06', title: 'Community Management', desc: '24 to 48-hour response management for comments, messages, and reviews — maintaining brand voice, handling complaints professionally, and turning interactions into relationship-building opportunities.' },
  { n: '07', title: 'Facebook Shop & Catalogue', desc: 'Facebook Shop setup and management — product catalogue integration, collection creation, product tagging in posts, and dynamic product ad setup for ecommerce businesses.' },
  { n: '08', title: 'Facebook Analytics & Reporting', desc: 'Monthly performance reports — reach, engagement, follower growth, ad performance (CTR, CPC, ROAS), and conversion attribution — with next month\'s strategic recommendations.' },
];

const CAPABILITIES = ['Facebook Business Suite', 'Meta Ads Manager', 'Facebook Shop', 'Facebook Reels', 'Lookalike Audiences', 'Custom Audiences', 'Lead Ads', 'Dynamic Ads', 'Retargeting', 'Facebook Pixel', 'CAPI Integration'];

const PROCESS = [
  { step: '01', title: 'Page & Account Audit', desc: 'Review of your existing Facebook presence — page completeness, audience health, historical content performance, and current ad account structure.' },
  { step: '02', title: 'Strategy & Content Plan', desc: 'Content pillars, post frequency, ad strategy, and 30-day content calendar — agreed before management begins so you know exactly what is being executed.' },
  { step: '03', title: 'Content Creation', desc: 'Monthly content batch — graphics, captions, video scripts, and ad creatives — created, reviewed, and approved before scheduling.' },
  { step: '04', title: 'Publishing & Community Management', desc: 'Scheduled publishing across optimal times, comment/message monitoring, and community engagement — maintaining an active, responsive presence.' },
  { step: '05', title: 'Paid Campaign Management', desc: 'Ad campaigns launched, monitored daily, and optimised continuously — adjusting targeting, creative, and bids based on performance data.' },
  { step: '06', title: 'Monthly Reporting', desc: 'Full performance report — organic metrics, paid metrics, audience growth, and next month\'s strategy — with a review call to align on priorities.' },
];

const WHY = [
  { title: 'Meta-Certified Team', desc: 'Our social media managers are Meta-trained and stay current with Facebook algorithm changes, ad format updates, and platform policy changes — so your account is always compliant and competitive.' },
  { title: 'Content + Ads Under One Roof', desc: 'Organic content and paid ads need to work together — consistent messaging, coordinated campaigns, and retargeting audiences built from organic engagement. We manage both.' },
  { title: 'No Minimum Spend Lock-In', desc: 'We work with your existing ad budget — whether that is £300/month or £30,000/month. Our management fee is separate from ad spend and scales based on campaign complexity, not budget size.' },
  { title: 'Ecommerce Facebook Expertise', desc: 'Facebook Shop, catalogue ads, dynamic retargeting, and checkout integration — we have specific expertise in ecommerce Facebook management that goes beyond simple post scheduling.' },
  { title: 'Crisis & Reputation Management', desc: 'When negative comments or PR situations arise on Facebook, we handle them quickly and professionally — protecting your brand reputation while maintaining authentic community relationships.' },
  { title: 'Transparent Monthly Reports', desc: 'Every month: reach, engagement, follower growth, ad performance, and leads or sales attributed to Facebook — with clear numbers and honest analysis, not just vanity metrics.' },
];

const FAQS = [
  { q: 'What does Facebook page management include?', a: 'Our Facebook page management service includes: content strategy (monthly content calendar with post topics, formats, and campaign hooks); content creation (graphics, captions, and video for each post); scheduling and publishing (posting at optimal times using Facebook Business Suite); community management (responding to comments and messages within 24 to 48 hours); hashtag and SEO optimisation for Facebook search; monthly performance analysis; and a standing review call to align on the next month\'s priorities. Optional additions include Facebook Ads management, Reels production, and Facebook Shop management.' },
  { q: 'How much does Facebook management cost?', a: 'Facebook management pricing depends on the scope of work: content volume (posts per week), whether ads management is included, community management hours required, and any specialist services like Reels production or Shop management. We offer tiered packages starting from basic page management (3 posts per week, no ads) up to full-service management including paid campaigns, Reels, and ecommerce integration. Contact us for a customised quote based on your specific requirements and business goals.' },
  { q: 'Do you manage Facebook Ads as well as organic content?', a: 'Yes. We manage both organic Facebook content and paid Facebook advertising. They are priced as separate services but work best together — consistent organic content builds brand trust that makes ads more effective, and paid campaigns amplify the organic content that is performing well. If you want ads management, we set up or audit your Meta Ads Manager account, build campaigns, create ad creatives, manage bidding and budgets, A/B test ad variations, and provide detailed monthly ROAS reporting.' },
  { q: 'How quickly can you respond to comments and messages?', a: 'Our standard community management SLA is a response within 24 hours on business days. For clients requiring faster response times (same-day or within a few hours), we offer priority community management tiers. For ecommerce clients where purchase queries come through Facebook Messenger, we typically respond within 4 to 8 business hours. All responses follow approved brand voice guidelines and escalation protocols for complaints or sensitive topics that require your direct involvement.' },
  { q: 'Will I have control over what gets posted?', a: 'Yes. Content is never published without your approval. Our standard process is: we create the monthly content batch; you receive it for review (typically 5 to 7 business days before the first scheduled date); you approve, request edits, or reject individual pieces; we update and resubmit if needed; then we publish according to the approved schedule. You maintain full visibility and approval rights over all content. Urgent or reactive content (responding to news events or trends) may have a shorter approval window, which we agree in advance.' },
  { q: 'How long does it take to see results from Facebook management?', a: 'Organic Facebook growth takes time. In months 1 to 3, the focus is establishing content consistency, optimising posting times, and building the content quality foundation. Measurable engagement improvements typically become visible in months 2 to 4. Significant follower growth and consistent lead generation from organic Facebook typically takes 6 to 12 months of sustained quality management. Paid Facebook advertising delivers faster results — ad campaigns can generate leads or sales from week one, though optimisation compounds over the first 2 to 3 months as the algorithm learns your best-performing audiences.' },
  { q: 'Do you create the graphics and videos, or do I need to provide them?', a: 'We create all content as part of the management service — static graphics, designed post images, short video edits, and Reels. We use your brand assets (logo, colours, fonts, product photography if provided) to create on-brand content. For product-based businesses, high-quality product photos provided by you significantly improve content quality. For video content, we can work with footage you provide or script and direct user-generated style content — but on-location filming is not included in standard management packages.' },
  { q: 'Can you manage Facebook for ecommerce businesses?', a: 'Yes — ecommerce is a significant portion of our Facebook management client base. Ecommerce Facebook management includes: Facebook Shop setup and catalogue management; dynamic product ads (DPA) targeting users who viewed or abandoned products; catalogue-based retargeting; collection ad formats; and Facebook Checkout integration where available. We also coordinate Facebook advertising with Google Shopping and other paid channels for consistent cross-platform coverage.' },
];

const STATS = [
  { label: 'Facebook Pages Managed', val: '200+' },
  { label: 'Avg Engagement Growth', val: '+3.2×' },
  { label: 'Years Experience', val: '12+' },
  { label: 'Client Retention', val: '91%' },
];

export default function FacebookManagementServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Social Media', item: 'https://www.1solutions.biz/social-media-marketing-services/' }, { '@type': 'ListItem', position: 3, name: 'Facebook Management', item: 'https://www.1solutions.biz/facebook-management-services/' }] }, { '@type': 'Service', name: 'Facebook Management Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Facebook Management', url: 'https://www.1solutions.biz/facebook-management-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Facebook Management Services | Facebook Page & Ads Management Agency | 1Solutions</title>
        <meta name="description" content="Facebook management services — page management, content creation, community management, and Facebook Ads. Grow your Facebook presence with a dedicated social media management team." />
        <meta name="keywords" content="facebook management services, facebook page management, facebook marketing services, facebook ads management, social media management agency, facebook marketing agency" />
        <link rel="canonical" href="https://www.1solutions.biz/facebook-management-services/" />
        <meta property="og:title" content="Facebook Management Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/facebook-management-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .fbm-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .fbm-page *,.fbm-page *::before,.fbm-page *::after{box-sizing:border-box}
          .fbm-hero{background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 25%,#bfdbfe 60%,#eff6ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .fbm-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(24,119,242,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .fbm-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(22,111,229,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .fbm-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .fbm-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .fbm-bc a{color:#6b7280;text-decoration:none}.fbm-bc a:hover{color:#1877F2}.fbm-bc span{color:#d1d5db}
          .fbm-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(24,119,242,0.08);border:1px solid rgba(24,119,242,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#1877F2;margin-bottom:28px}
          .fbm-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#1E3A8A 0%,#1877F2 50%,#1D4ED8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .fbm-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .fbm-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .fbm-btn-p{display:inline-flex;align-items:center;gap:8px;background:#1877F2;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(24,119,242,0.28)}
          .fbm-btn-p:hover{background:#166FE5;box-shadow:0 8px 32px rgba(24,119,242,0.38);transform:translateY(-2px)}
          .fbm-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .fbm-btn-s:hover{border-color:#1877F2;color:#1877F2;transform:translateY(-2px)}
          .fbm-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(24,119,242,0.07)}
          .fbm-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(24,119,242,0.08)}.fbm-stat:last-child{border-right:none}
          .fbm-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .fbm-stat-v{font-size:1.6rem;font-weight:900;color:#1877F2;letter-spacing:-0.5px}
          .fbm-svc{background:#f8fafd;padding:80px 40px}.fbm-svc-in{max-width:1280px;margin:0 auto}
          .fbm-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1877F2;margin-bottom:10px;display:block}
          .fbm-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#1E3A8A 0%,#1877F2 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .fbm-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .fbm-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .fbm-card{background:linear-gradient(135deg,rgba(239,246,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(219,234,254,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(24,119,242,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .fbm-card.visible{opacity:1;transform:translateY(0)}.fbm-card:hover{transform:translateY(-6px);border-color:rgba(24,119,242,0.22);box-shadow:0 16px 48px rgba(24,119,242,0.09)}
          .fbm-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#1877F2;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .fbm-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .fbm-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .fbm-cap{background:linear-gradient(135deg,#1E3A8A 0%,#1877F2 100%);padding:60px 40px}
          .fbm-cap-in{max-width:1280px;margin:0 auto;text-align:center}
          .fbm-cap h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .fbm-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .fbm-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .fbm-proc{background:linear-gradient(135deg,#eff6ff 0%,#eff6ff 50%,#dbeafe 100%);padding:80px 40px}
          .fbm-proc-in{max-width:900px;margin:0 auto}
          .fbm-steps{display:flex;flex-direction:column;margin-top:44px}
          .fbm-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(24,119,242,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .fbm-step:last-child{border-bottom:none}.fbm-step.visible{opacity:1;transform:translateX(0)}
          .fbm-snum{font-size:3rem;font-weight:900;color:rgba(24,119,242,0.15);line-height:1;letter-spacing:-2px}
          .fbm-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .fbm-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .fbm-why{background:#fff;padding:80px 40px}.fbm-why-in{max-width:1280px;margin:0 auto}
          .fbm-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .fbm-wcard{background:linear-gradient(135deg,#eff6ff 0%,#fff 60%,#dbeafe 100%);border:1px solid rgba(24,119,242,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .fbm-wcard.visible{opacity:1;transform:translateY(0)}.fbm-wcard:hover{border-color:rgba(24,119,242,0.20);box-shadow:0 8px 32px rgba(24,119,242,0.07)}
          .fbm-dot{width:8px;height:8px;border-radius:50%;background:#1877F2;margin-bottom:16px}
          .fbm-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .fbm-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .fbm-faq{background:#f8fafd;padding:80px 40px}.fbm-faq-in{max-width:860px;margin:0 auto}
          .fbm-fitem{border-bottom:1px solid #e5e7eb}
          .fbm-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .fbm-fq:hover{color:#1877F2}
          .fbm-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .fbm-fitem.open .fbm-ficon{border-color:#1877F2;color:#1877F2;background:rgba(24,119,242,0.06)}
          .fbm-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .fbm-fitem.open .fbm-fa{max-height:500px;padding-bottom:22px}
          .fbm-cta{background:linear-gradient(135deg,rgba(24,119,242,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(30,58,138,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .fbm-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(24,119,242,0.10) 0%,transparent 70%);pointer-events:none}
          .fbm-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(30,58,138,0.08) 0%,transparent 70%);pointer-events:none}
          .fbm-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .fbm-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#1E3A8A 0%,#1877F2 50%,#1D4ED8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .fbm-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .fbm-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.fbm-grid{grid-template-columns:repeat(2,1fr)}.fbm-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.fbm-hero,.fbm-svc,.fbm-cap,.fbm-proc,.fbm-why,.fbm-faq,.fbm-cta{padding:60px 24px}.fbm-hero{padding-top:60px;padding-bottom:0}.fbm-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.fbm-stat:nth-child(2){border-right:none}.fbm-grid{grid-template-columns:1fr}.fbm-why-grid{grid-template-columns:1fr}.fbm-step{grid-template-columns:56px 1fr}.fbm-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="fbm-page">
        <section className="fbm-hero"><div className="fbm-o1"/><div className="fbm-o2"/>
          <div className="fbm-in">
            <nav className="fbm-bc"><Link href="/">Home</Link><span>/</span><Link href="/social-media-marketing-services">Social Media</Link><span>/</span><span style={{color:'#1877F2'}}>Facebook Management</span></nav>
            <span className="fbm-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#1877F2',display:'inline-block'}}/> Page Management · Ads · Community</span>
            <h1 className="fbm-h1">Facebook Management Services — Content, Ads & Community Under One Roof</h1>
            <p className="fbm-sub">End-to-end Facebook management — content strategy, post creation, community management, and paid advertising — handled by a dedicated social media team so you can focus on your business.</p>
            <div className="fbm-btns">
              <Link href="/contact-us" className="fbm-btn-p">Get a Facebook Management Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/instagram-marketing-services" className="fbm-btn-s">Instagram Marketing</Link>
            </div>
            <div className="fbm-stats">{STATS.map(s => <div key={s.label} className="fbm-stat"><div className="fbm-stat-l">{s.label}</div><div className="fbm-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="fbm-svc"><div className="fbm-svc-in">
          <span className="fbm-ey2">What We Do</span><h2 className="fbm-ttl">Facebook Management Services</h2>
          <p className="fbm-desc">Page management, content creation, paid ads, community engagement, and ecommerce integration — everything your Facebook presence needs.</p>
          <div className="fbm-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`fbm-card${visibleCards.includes(i)?' visible':''}`}><div className="fbm-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="fbm-cap"><div className="fbm-cap-in">
          <h2>Tools &amp; Platform Capabilities</h2>
          <div className="fbm-pills">{CAPABILITIES.map(c => <span key={c} className="fbm-pill">{c}</span>)}</div>
        </div></section>
        <section className="fbm-proc"><div className="fbm-proc-in">
          <span className="fbm-ey2">How We Work</span><h2 className="fbm-ttl">Our Facebook Management Process</h2>
          <p className="fbm-desc">Audit to ongoing management — a structured monthly process with full visibility, content approval, and performance reporting.</p>
          <div className="fbm-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`fbm-step${visibleSteps.includes(i)?' visible':''}`}><div className="fbm-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="fbm-why"><div className="fbm-why-in">
          <span className="fbm-ey2">Why 1Solutions</span><h2 className="fbm-ttl">Content + Ads + Community — One Team, One Strategy</h2>
          <p className="fbm-desc">Facebook management works best when organic and paid are aligned. We handle both — coherent messaging, coordinated campaigns, and transparent reporting.</p>
          <div className="fbm-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`fbm-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="fbm-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="fbm-faq"><div className="fbm-faq-in">
          <span className="fbm-ey2">Got Questions?</span><h2 className="fbm-ttl">Facebook Management FAQs</h2>
          <p className="fbm-desc">Answers to the most common questions about our Facebook management services.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`fbm-fitem${openFaq===i?' open':''}`}><button className="fbm-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="fbm-ficon">{openFaq===i?'−':'+'}</span></button><div className="fbm-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="fbm-cta"><div className="fbm-cta-o1"/><div className="fbm-cta-o2"/>
          <div className="fbm-cta-in">
            <span className="fbm-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Grow Your Facebook Presence?</span>
            <h2 className="fbm-cta-t">Start Your Facebook Management Partnership</h2>
            <p className="fbm-cta-s">We&rsquo;ll audit your current Facebook presence, identify the biggest growth opportunities, and build a management plan tailored to your goals.</p>
            <div className="fbm-cta-btns">
              <Link href="/contact-us" className="fbm-btn-p">Get a Facebook Management Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/social-media-marketing-services" className="fbm-btn-s">Social Media Overview</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
