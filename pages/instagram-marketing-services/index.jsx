import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Instagram Content Strategy', desc: 'Monthly content strategy — content pillars, post themes, Reels topics, Stories series, and campaign calendar aligned to your brand identity and growth objectives.' },
  { n: '02', title: 'Feed Content Creation', desc: 'On-brand static posts, carousels, and infographics for your Instagram feed — designed to the latest aspect ratios, with captioning and hashtag research optimised for reach and engagement.' },
  { n: '03', title: 'Instagram Reels Production', desc: 'Short-form video content — Reels scripts, editing, captions, audio selection, and cover image creation — optimised for the Instagram algorithm\'s video-first distribution strategy.' },
  { n: '04', title: 'Instagram Stories', desc: 'Daily or weekly Story sequences — behind-the-scenes content, product spotlights, polls, Q&As, countdown stickers, and swipe-up links — keeping your audience engaged between feed posts.' },
  { n: '05', title: 'Instagram Ads Management', desc: 'Paid Instagram advertising across Feed, Stories, Reels, Explore, and Shopping placements — audience targeting, creative testing, budget management, and ROAS optimisation via Meta Ads Manager.' },
  { n: '06', title: 'Instagram Shopping & Product Tagging', desc: 'Instagram Shop setup, product catalogue integration, product tagging in posts and Stories, and collection creation — turning your Instagram into a shoppable storefront for ecommerce brands.' },
  { n: '07', title: 'Influencer Collaboration Strategy', desc: 'Influencer identification, brief development, collaboration negotiation, content review, and performance tracking — coordinating micro and mid-tier influencer partnerships that align with your brand.' },
  { n: '08', title: 'Instagram Analytics & Reporting', desc: 'Monthly performance reports — reach, impressions, engagement rate, follower growth, profile visits, website clicks, and ad ROAS — with audience insights and next month\'s content recommendations.' },
];

const FORMATS = ['Instagram Reels', 'Feed Posts', 'Carousel Posts', 'Instagram Stories', 'Instagram Shopping', 'Reels Ads', 'Story Ads', 'Explore Ads', 'Collaboration Posts', 'UGC Campaigns'];

const PROCESS = [
  { step: '01', title: 'Profile & Audience Audit', desc: 'Audit your current Instagram profile — bio optimisation, highlights structure, feed aesthetic, follower quality, and engagement rate benchmarking.' },
  { step: '02', title: 'Content Strategy', desc: 'Content pillars, post frequency, Reels cadence, and 30-day content calendar — all agreed before month one begins.' },
  { step: '03', title: 'Content Creation & Approval', desc: 'Monthly content batch created — feed posts, Reels, Stories — reviewed and approved by you before scheduling.' },
  { step: '04', title: 'Publishing & Engagement', desc: 'Scheduled publishing at optimal times, comment responses, Story interactions, and community engagement to grow genuine relationships.' },
  { step: '05', title: 'Paid Campaign Management', desc: 'Instagram ad campaigns launched and optimised — targeting your ideal audience with tested creative and tracked conversions.' },
  { step: '06', title: 'Monthly Report & Strategy', desc: 'Full performance report with engagement metrics, growth data, and next month\'s strategic adjustments based on what is working.' },
];

const WHY = [
  { title: 'Reels-First Strategy', desc: 'Instagram is rewarding Reels with outsized organic reach. Every management package includes Reels as a core component — not a bolt-on — because that\'s where Instagram growth is happening in 2025.' },
  { title: 'Visual Brand Consistency', desc: 'Instagram success depends on a coherent visual identity — consistent colour palette, typography style, and compositional approach that makes your feed instantly recognisable at a glance.' },
  { title: 'Ecommerce Instagram Expertise', desc: 'Instagram Shopping, product tagging, checkout integration, and shoppable Reels — we build Instagram into a direct sales channel for ecommerce brands, not just a brand awareness platform.' },
  { title: 'Content + Ads Aligned', desc: 'Paid Instagram ads amplify organic content and build custom audiences from your engaged followers. We manage both in coordination — consistent message, smarter targeting, better ROAS.' },
  { title: 'Influencer Partnership Access', desc: 'We have established relationships with UK and international micro and mid-tier influencers across fashion, beauty, fitness, food, tech, and lifestyle — for brands wanting creator-led growth.' },
  { title: 'Engagement Rate Focus', desc: 'We do not chase follower vanity metrics — we optimise for engagement rate, profile visits, and website clicks. A smaller, highly engaged audience converts better than a large passive one.' },
];

const FAQS = [
  { q: 'What does Instagram marketing management include?', a: 'Our Instagram management service includes: content strategy (monthly content pillars and 30-day calendar); feed content creation (static posts and carousels); Reels production (scripting, editing, and publishing); Instagram Stories creation and publishing; hashtag research and optimisation; community management (comment and DM responses); monthly performance analytics report; and a strategy review call. Optional additions include Instagram Ads management, Instagram Shopping setup, and influencer collaboration coordination.' },
  { q: 'How many posts per week do you create?', a: 'Post frequency depends on your package tier: our standard management packages include 3 to 5 feed posts per week plus daily Stories. Reels are published 2 to 4 times per week as a separate content stream. The optimal posting frequency for your account depends on your audience size, content type, and industry — we recommend a frequency during onboarding based on benchmarking against similar accounts. Consistency matters more than volume — a reliable 4 posts per week outperforms sporadic bursts of 10 posts.' },
  { q: 'Do you produce Instagram Reels or just photos?', a: 'Yes — Reels are a core part of all our Instagram management packages, not an optional extra. In 2025, Instagram heavily prioritises Reels in its algorithm because the platform competes with TikTok for short-form video attention. Every monthly content plan includes dedicated Reels as part of the core strategy. We script, edit, caption, and optimise Reels — handling the full production workflow. If you want to be a on-camera talent, we can script and brief you; if you prefer brand-created content, we produce it without your on-screen involvement.' },
  { q: 'How do you grow Instagram followers organically?', a: 'Organic Instagram follower growth comes from: consistently high-quality Reels that get distributed to non-followers via the Explore page and Reels feed; strategic hashtag use that increases post discoverability to targeted audiences; engagement bait content (polls, questions, quizzes in Stories) that keeps current followers active, which signals the algorithm to expand reach; collaboration posts (collab feature) with complementary accounts that expose you to each other\'s audiences; and profile SEO optimisation (keyword in name field, keyword-optimised bio) for Instagram search visibility. We do not use follow-unfollow tactics or bot engagement — sustainable growth only.' },
  { q: 'Can you manage Instagram Ads alongside organic management?', a: 'Yes. Instagram advertising is managed via Meta Ads Manager and works best when coordinated with your organic content strategy. We run ads across Feed, Stories, Reels, and Explore placements — targeting your ideal audience with custom audiences (from your email list or website visitors), lookalike audiences, and interest-based targeting. Ad creatives are tested in variations, budgets are managed daily, and ROAS is tracked and reported monthly. Ads management is priced separately from organic management but integrated into the same strategic framework.' },
  { q: 'What results can I expect from Instagram marketing?', a: 'Realistic Instagram results depend on your starting point, budget, industry, and content quality. Engagement rate improvements (more likes, comments, and saves per post) are typically visible within 4 to 8 weeks of consistent, quality management. Follower growth of 200 to 500 new followers per month is achievable for most accounts with a quality organic strategy. Paid Instagram advertising can drive measurable website traffic or leads from month one. Profile visit and website click growth typically compounds over 3 to 6 months. We set specific, realistic KPIs for your account during onboarding based on your starting metrics.' },
  { q: 'Do you work with ecommerce brands on Instagram?', a: 'Yes. Ecommerce is a large part of our Instagram client base. For ecommerce brands we offer: Instagram Shopping setup (product catalogue sync, shop tab, product tagging in posts and Stories); shoppable Reels with product tags; dynamic product ads (showing users the products they viewed on your website); Instagram Checkout (where available); and influencer seeding to reach new audiences with social proof. Instagram is a powerful top-funnel and mid-funnel channel for ecommerce — particularly for fashion, beauty, home, lifestyle, and food and beverage brands.' },
  { q: 'How do you measure Instagram marketing success?', a: 'We track multiple performance layers: reach and impressions (how many people see your content); engagement rate (likes, comments, saves, shares as a percentage of reach — more meaningful than raw numbers); follower growth rate; profile visits (traffic to your profile page); website clicks (traffic from Instagram bio link, Stories link, and shoppable posts); and for ad campaigns, CTR, CPC, CPM, and ROAS. Every monthly report covers all these metrics with trend analysis and a qualitative assessment of content performance by format and theme.' },
];

const STATS = [
  { label: 'Instagram Accounts Managed', val: '150+' },
  { label: 'Avg Engagement Rate', val: '4.8%' },
  { label: 'Reels Produced', val: '2,000+' },
  { label: 'Client Retention', val: '90%' },
];

export default function InstagramMarketingServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Social Media', item: 'https://www.1solutions.biz/social-media-marketing-services/' }, { '@type': 'ListItem', position: 3, name: 'Instagram Marketing', item: 'https://www.1solutions.biz/instagram-marketing-services/' }] }, { '@type': 'Service', name: 'Instagram Marketing Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Instagram Marketing', url: 'https://www.1solutions.biz/instagram-marketing-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Instagram Marketing Services | Instagram Management & Reels Agency | 1Solutions</title>
        <meta name="description" content="Instagram marketing services — content strategy, Reels production, Instagram Ads, Shopping setup, and community management. Grow your Instagram presence with a specialist social media team." />
        <meta name="keywords" content="instagram marketing services, instagram management agency, instagram reels marketing, instagram ads management, instagram marketing agency, social media marketing instagram" />
        <link rel="canonical" href="https://www.1solutions.biz/instagram-marketing-services/" />
        <meta property="og:title" content="Instagram Marketing Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/instagram-marketing-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .igm-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .igm-page *,.igm-page *::before,.igm-page *::after{box-sizing:border-box}
          .igm-hero{background:linear-gradient(135deg,#fdf2f8 0%,#fce7f3 25%,#fbcfe8 60%,#fdf2f8 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .igm-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(219,39,119,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .igm-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(157,23,77,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .igm-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .igm-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .igm-bc a{color:#6b7280;text-decoration:none}.igm-bc a:hover{color:#DB2777}.igm-bc span{color:#d1d5db}
          .igm-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(219,39,119,0.08);border:1px solid rgba(219,39,119,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#DB2777;margin-bottom:28px}
          .igm-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#9D174D 0%,#DB2777 50%,#BE185D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .igm-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .igm-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .igm-btn-p{display:inline-flex;align-items:center;gap:8px;background:#DB2777;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(219,39,119,0.28)}
          .igm-btn-p:hover{background:#BE185D;box-shadow:0 8px 32px rgba(219,39,119,0.38);transform:translateY(-2px)}
          .igm-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .igm-btn-s:hover{border-color:#DB2777;color:#DB2777;transform:translateY(-2px)}
          .igm-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(219,39,119,0.07)}
          .igm-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(219,39,119,0.08)}.igm-stat:last-child{border-right:none}
          .igm-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .igm-stat-v{font-size:1.6rem;font-weight:900;color:#DB2777;letter-spacing:-0.5px}
          .igm-svc{background:#f8fafd;padding:80px 40px}.igm-svc-in{max-width:1280px;margin:0 auto}
          .igm-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#DB2777;margin-bottom:10px;display:block}
          .igm-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#9D174D 0%,#DB2777 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .igm-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .igm-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .igm-card{background:linear-gradient(135deg,rgba(253,242,248,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(252,231,243,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(219,39,119,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .igm-card.visible{opacity:1;transform:translateY(0)}.igm-card:hover{transform:translateY(-6px);border-color:rgba(219,39,119,0.22);box-shadow:0 16px 48px rgba(219,39,119,0.09)}
          .igm-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#DB2777;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .igm-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .igm-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .igm-fmt{background:linear-gradient(135deg,#9D174D 0%,#DB2777 100%);padding:60px 40px}
          .igm-fmt-in{max-width:1280px;margin:0 auto;text-align:center}
          .igm-fmt h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .igm-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .igm-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .igm-proc{background:linear-gradient(135deg,#fdf2f8 0%,#fdf2f8 50%,#fce7f3 100%);padding:80px 40px}
          .igm-proc-in{max-width:900px;margin:0 auto}
          .igm-steps{display:flex;flex-direction:column;margin-top:44px}
          .igm-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(219,39,119,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .igm-step:last-child{border-bottom:none}.igm-step.visible{opacity:1;transform:translateX(0)}
          .igm-snum{font-size:3rem;font-weight:900;color:rgba(219,39,119,0.15);line-height:1;letter-spacing:-2px}
          .igm-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .igm-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .igm-why{background:#fff;padding:80px 40px}.igm-why-in{max-width:1280px;margin:0 auto}
          .igm-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .igm-wcard{background:linear-gradient(135deg,#fdf2f8 0%,#fff 60%,#fce7f3 100%);border:1px solid rgba(219,39,119,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .igm-wcard.visible{opacity:1;transform:translateY(0)}.igm-wcard:hover{border-color:rgba(219,39,119,0.20);box-shadow:0 8px 32px rgba(219,39,119,0.07)}
          .igm-dot{width:8px;height:8px;border-radius:50%;background:#DB2777;margin-bottom:16px}
          .igm-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .igm-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .igm-faq{background:#f8fafd;padding:80px 40px}.igm-faq-in{max-width:860px;margin:0 auto}
          .igm-fitem{border-bottom:1px solid #e5e7eb}
          .igm-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .igm-fq:hover{color:#DB2777}
          .igm-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .igm-fitem.open .igm-ficon{border-color:#DB2777;color:#DB2777;background:rgba(219,39,119,0.06)}
          .igm-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .igm-fitem.open .igm-fa{max-height:500px;padding-bottom:22px}
          .igm-cta{background:linear-gradient(135deg,rgba(219,39,119,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(157,23,77,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .igm-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(219,39,119,0.10) 0%,transparent 70%);pointer-events:none}
          .igm-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(157,23,77,0.08) 0%,transparent 70%);pointer-events:none}
          .igm-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .igm-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#9D174D 0%,#DB2777 50%,#BE185D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .igm-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .igm-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.igm-grid{grid-template-columns:repeat(2,1fr)}.igm-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.igm-hero,.igm-svc,.igm-fmt,.igm-proc,.igm-why,.igm-faq,.igm-cta{padding:60px 24px}.igm-hero{padding-top:60px;padding-bottom:0}.igm-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.igm-stat:nth-child(2){border-right:none}.igm-grid{grid-template-columns:1fr}.igm-why-grid{grid-template-columns:1fr}.igm-step{grid-template-columns:56px 1fr}.igm-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="igm-page">
        <section className="igm-hero"><div className="igm-o1"/><div className="igm-o2"/>
          <div className="igm-in">
            <nav className="igm-bc"><Link href="/">Home</Link><span>/</span><Link href="/social-media-marketing-services">Social Media</Link><span>/</span><span style={{color:'#DB2777'}}>Instagram Marketing</span></nav>
            <span className="igm-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#DB2777',display:'inline-block'}}/> Reels · Feed · Shopping · Ads</span>
            <h1 className="igm-h1">Instagram Marketing Services — Reels, Growth & Sales for Your Brand</h1>
            <p className="igm-sub">Content strategy, Reels production, Instagram Ads, Shopping integration, and community management — everything your Instagram needs to grow an engaged audience and drive real business results.</p>
            <div className="igm-btns">
              <Link href="/contact-us" className="igm-btn-p">Get an Instagram Marketing Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/facebook-management-services" className="igm-btn-s">Facebook Management</Link>
            </div>
            <div className="igm-stats">{STATS.map(s => <div key={s.label} className="igm-stat"><div className="igm-stat-l">{s.label}</div><div className="igm-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="igm-svc"><div className="igm-svc-in">
          <span className="igm-ey2">What We Do</span><h2 className="igm-ttl">Instagram Marketing Services</h2>
          <p className="igm-desc">Feed content, Reels, Stories, Shopping, and Ads — full Instagram management from content creation to paid growth.</p>
          <div className="igm-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`igm-card${visibleCards.includes(i)?' visible':''}`}><div className="igm-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="igm-fmt"><div className="igm-fmt-in">
          <h2>Content Formats &amp; Placements</h2>
          <div className="igm-pills">{FORMATS.map(c => <span key={c} className="igm-pill">{c}</span>)}</div>
        </div></section>
        <section className="igm-proc"><div className="igm-proc-in">
          <span className="igm-ey2">How We Work</span><h2 className="igm-ttl">Our Instagram Management Process</h2>
          <p className="igm-desc">Profile audit to monthly content execution — a clear process with full content approval before anything goes live.</p>
          <div className="igm-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`igm-step${visibleSteps.includes(i)?' visible':''}`}><div className="igm-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="igm-why"><div className="igm-why-in">
          <span className="igm-ey2">Why 1Solutions</span><h2 className="igm-ttl">Reels-First, Results-Focused Instagram Management</h2>
          <p className="igm-desc">We build Instagram strategies around how the algorithm actually works in 2025 — with Reels at the core, Shopping integrated for ecommerce, and paid ads amplifying organic growth.</p>
          <div className="igm-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`igm-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="igm-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="igm-faq"><div className="igm-faq-in">
          <span className="igm-ey2">Got Questions?</span><h2 className="igm-ttl">Instagram Marketing FAQs</h2>
          <p className="igm-desc">Everything you need to know about our Instagram marketing and management services.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`igm-fitem${openFaq===i?' open':''}`}><button className="igm-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="igm-ficon">{openFaq===i?'−':'+'}</span></button><div className="igm-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="igm-cta"><div className="igm-cta-o1"/><div className="igm-cta-o2"/>
          <div className="igm-cta-in">
            <span className="igm-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Build an Instagram Presence That Converts?</span>
            <h2 className="igm-cta-t">Start Your Instagram Marketing Strategy</h2>
            <p className="igm-cta-s">We&rsquo;ll audit your current Instagram profile and competitor landscape — and build a strategy around the content formats and tactics that will grow your specific audience.</p>
            <div className="igm-cta-btns">
              <Link href="/contact-us" className="igm-btn-p">Get an Instagram Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/social-media-marketing-services" className="igm-btn-s">Social Media Overview</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
