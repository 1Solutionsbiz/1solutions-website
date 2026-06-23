import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Facebook Page Setup & Optimisation', desc: 'Complete Facebook Business Page setup — category selection, contact details, business description, CTA button, and URL customisation — or full audit and optimisation of your existing page.' },
  { n: '02', title: 'Facebook Cover Photo Design', desc: 'Custom Facebook cover photo (820×312px) — brand-consistent design that communicates your value proposition, current promotion, or brand story in the prime visual real estate of your page.' },
  { n: '03', title: 'Facebook Profile Picture Design', desc: 'Optimised profile picture — correctly sized logo or brand image for Facebook\'s circular crop, optimised for recognition at small sizes in comments, ads, and the news feed.' },
  { n: '04', title: 'Facebook Highlights & Story Covers', desc: 'Branded Facebook Story highlight covers — consistent icon set matching your brand colour palette that makes your page look polished and organised at first glance.' },
  { n: '05', title: 'Facebook Post Template Design', desc: 'Custom post template suite — branded Canva or Adobe templates for your content team to use, ensuring every post stays on-brand without needing a designer for every piece of content.' },
  { n: '06', title: 'Facebook Ad Creative Design', desc: 'Custom ad creative templates and one-off ad assets — feed ads, Story ads, and carousel formats — designed to Meta\'s ad specifications and optimised for scroll-stopping visual impact.' },
  { n: '07', title: 'Facebook Event Cover Design', desc: 'Branded Facebook Event cover images (1920×1005px) for product launches, webinars, sales events, and in-person events — designed to attract attention and communicate event details clearly.' },
  { n: '08', title: 'Facebook Shop Visual Design', desc: 'Facebook Shop collection cover images, featured product selection, and visual merchandising design — making your Facebook Shop look as compelling as a dedicated ecommerce site.' },
];

const SPECS = ['Cover Photo (820×312)', 'Profile Picture (170×170)', 'Post Image (1200×630)', 'Story (1080×1920)', 'Feed Ad (1200×628)', 'Carousel Ad (1080×1080)', 'Event Cover (1920×1005)', 'Group Cover (1640×856)'];

const PROCESS = [
  { step: '01', title: 'Brand Assets Review', desc: 'Review your existing logo, colour palette, fonts, and brand guidelines — or work from scratch to establish the visual direction if you are launching a new brand.' },
  { step: '02', title: 'Design Brief', desc: 'Current promotion, key message, and visual preferences — a brief for each asset ensuring the design serves a specific communication purpose.' },
  { step: '03', title: 'Design Concepts', desc: '2 to 3 initial design concepts for key assets (cover photo, profile picture) — presenting different visual directions before committing to the full suite.' },
  { step: '04', title: 'Revisions', desc: '1 to 2 revision rounds on approved direction — refining copy, imagery, colour, and layout based on your feedback.' },
  { step: '05', title: 'Full Suite Delivery', desc: 'All assets delivered in correct Facebook specifications — PNG, JPG, and editable source files — ready to upload immediately.' },
  { step: '06', title: 'Template Setup', desc: 'Post templates set up in Canva or Figma — ready for your team to create on-brand content independently going forward.' },
];

const WHY = [
  { title: 'Platform-Spec Expertise', desc: 'Facebook has specific image dimension requirements and safe zones that change periodically. We design to current Meta specifications — no cropping, no pixelation, no text in restricted areas.' },
  { title: 'Brand Consistency Focus', desc: 'Your Facebook page is often a prospect\'s first touchpoint. Every visual element — cover, profile, posts, ads — should tell a consistent brand story that builds immediate credibility.' },
  { title: 'Editable Templates Included', desc: 'We do not just deliver finished assets — we create reusable Canva or Figma templates your team can update independently, so you are never dependent on a designer for every post.' },
  { title: 'Ad Creative Experience', desc: 'Facebook ad creative follows different rules from organic content — text limits, attention patterns, and scroll-stopping requirements. We bring paid creative expertise to every ad asset we design.' },
  { title: 'Fast Turnaround', desc: 'Standard Facebook page design package (cover, profile, post templates, 3 ad creatives) delivered within 3 to 5 business days — so you can launch or relaunch your page without delay.' },
  { title: 'Ongoing Creative Support', desc: 'Beyond the initial page design, we offer monthly creative refresh services — new cover photos for campaigns, seasonal ad creatives, and event banners — keeping your page visually current.' },
];

const FAQS = [
  { q: 'What size is a Facebook cover photo?', a: 'The Facebook cover photo displays at 820×312 pixels on desktop and 640×360 pixels on mobile. To ensure your cover looks correct on both, design at 820×312px and keep all important visual elements and text in the central safe zone (centred within approximately 640×312px). The profile picture overlaps the bottom-left corner of the cover photo on mobile, so avoid placing critical content in that area. We design Facebook cover photos to the current Meta specifications with all safe zones respected.' },
  { q: 'What is the best profile picture for a Facebook Business Page?', a: 'For a Facebook Business Page, the profile picture should be your logo or brand icon — not a photo of a person (unless you are a personal brand or sole trader). The profile picture displays as a circle cropped from a 170×170px image. It appears at very small sizes in comments and ads (as small as 32×32px), so the image must be simple and recognisable at tiny sizes. A complex logo with fine detail or small text will not be legible at small sizes. If needed, we create a simplified icon version of your logo specifically for profile picture use.' },
  { q: 'Do I need custom Facebook post templates?', a: 'Custom Facebook post templates are valuable if you publish regular content and want consistency without needing a designer for every post. Branded templates in Canva or Figma allow your marketing team or social media manager to create on-brand posts independently — maintaining visual consistency without the time or cost of commissioning individual designs. We create template suites covering your core content types: promotional posts, testimonial cards, product spotlights, blog promotions, and event announcements.' },
  { q: 'Can you design Facebook ad creatives?', a: 'Yes. Facebook ad creative design is a specific skill — different from organic post design. Effective ad creatives need to stop the scroll within 1 to 2 seconds, communicate the offer clearly, include social proof or urgency, and work without sound for video. We design static feed ads (1200×628px), square ads (1080×1080px), Story ads (1080×1920px), and carousel ad frames — all following Meta\'s current text and overlay guidelines. For split testing, we design multiple creative variants per campaign so you can identify the highest-performing format.' },
  { q: 'How long does Facebook page design take?', a: 'A complete Facebook page design package — cover photo, profile picture optimisation, 3 to 5 post templates, and 2 ad creative variants — typically takes 3 to 5 business days from brief sign-off. Individual assets (a single cover photo or one ad creative) can often be delivered within 24 to 48 hours. Rush delivery is available for time-sensitive campaign launches. Full brand identity development before page design adds time — typically 1 to 2 additional weeks if no brand guidelines exist.' },
  { q: 'What file formats do you deliver Facebook design assets in?', a: 'Facebook page design assets are delivered in: PNG (web-optimised, transparent background for logos); JPG (compressed for cover photos and post images); and the source/editable file (Figma, Adobe Photoshop .psd, or Canva shareable link) for future editing. All assets are delivered at the correct Facebook specifications — no resizing required. For post templates delivered in Canva, you receive a shared Canva folder with all templates accessible and editable by your team.' },
  { q: 'Do you optimise the Facebook page copy as well as the design?', a: 'Yes. Our Facebook page design service includes reviewing and optimising your page copy alongside the visual design: Page name and username (Facebook URL customisation); Business description (keyword-optimised, compelling, correct length); Category selection (affects Facebook search discoverability); CTA button selection and destination URL; About section completeness; and Pinned post strategy. A fully optimised Facebook page — great visuals AND complete, search-optimised copy — makes a significantly stronger first impression and ranks better in Facebook search.' },
  { q: 'Can you refresh an existing Facebook page design?', a: 'Yes. Page design refresh is common — particularly ahead of a rebrand, new campaign, or seasonal promotion. A refresh typically involves: updating the cover photo for the new campaign or season; reviewing and updating page copy for current messaging; creating new ad creative templates for current offers; and reviewing profile picture for any brand updates. A full page refresh can be completed in 2 to 3 business days for established brands with clear visual guidelines.' },
];

const STATS = [
  { label: 'Facebook Pages Designed', val: '400+' },
  { label: 'Avg Page CTR Improvement', val: '+42%' },
  { label: 'Years Experience', val: '12+' },
  { label: 'Client Satisfaction', val: '97%' },
];

export default function FacebookPageDesigning() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Social Media', item: 'https://www.1solutions.biz/social-media-marketing-services/' }, { '@type': 'ListItem', position: 3, name: 'Facebook Page Design', item: 'https://www.1solutions.biz/facebook-page-designing/' }] }, { '@type': 'Service', name: 'Facebook Page Design Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Facebook Page Design', url: 'https://www.1solutions.biz/facebook-page-designing/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Facebook Page Designing Services | Cover Photo, Templates & Ad Creative | 1Solutions</title>
        <meta name="description" content="Facebook page design services — cover photos, post templates, ad creatives, and full page setup. Professional Facebook page design that builds brand trust and drives engagement." />
        <meta name="keywords" content="facebook page designing, facebook page design services, facebook cover photo design, facebook business page design, facebook post template design, facebook ad creative design" />
        <link rel="canonical" href="https://www.1solutions.biz/facebook-page-designing/" />
        <meta property="og:title" content="Facebook Page Designing Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/facebook-page-designing/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .fbpd-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .fbpd-page *,.fbpd-page *::before,.fbpd-page *::after{box-sizing:border-box}
          .fbpd-hero{background:linear-gradient(135deg,#f0f9ff 0%,#bae6fd 25%,#7dd3fc 50%,#f0f9ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .fbpd-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(3,105,161,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .fbpd-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(7,89,133,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .fbpd-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .fbpd-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .fbpd-bc a{color:#6b7280;text-decoration:none}.fbpd-bc a:hover{color:#0369A1}.fbpd-bc span{color:#d1d5db}
          .fbpd-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(3,105,161,0.08);border:1px solid rgba(3,105,161,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0369A1;margin-bottom:28px}
          .fbpd-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#0C4A6E 0%,#0369A1 50%,#075985 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .fbpd-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .fbpd-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .fbpd-btn-p{display:inline-flex;align-items:center;gap:8px;background:#0369A1;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(3,105,161,0.28)}
          .fbpd-btn-p:hover{background:#0C4A6E;box-shadow:0 8px 32px rgba(3,105,161,0.38);transform:translateY(-2px)}
          .fbpd-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .fbpd-btn-s:hover{border-color:#0369A1;color:#0369A1;transform:translateY(-2px)}
          .fbpd-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(3,105,161,0.07)}
          .fbpd-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(3,105,161,0.08)}.fbpd-stat:last-child{border-right:none}
          .fbpd-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .fbpd-stat-v{font-size:1.6rem;font-weight:900;color:#0369A1;letter-spacing:-0.5px}
          .fbpd-svc{background:#f8fafd;padding:80px 40px}.fbpd-svc-in{max-width:1280px;margin:0 auto}
          .fbpd-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0369A1;margin-bottom:10px;display:block}
          .fbpd-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0C4A6E 0%,#0369A1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .fbpd-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .fbpd-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .fbpd-card{background:linear-gradient(135deg,rgba(240,249,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(186,230,253,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(3,105,161,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease,box-shadow 0.22s}
          .fbpd-card.visible{opacity:1;transform:translateY(0)}.fbpd-card:hover{transform:translateY(-6px);border-color:rgba(3,105,161,0.22);box-shadow:0 16px 48px rgba(3,105,161,0.09)}
          .fbpd-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0369A1;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .fbpd-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1}
          .fbpd-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .fbpd-spec{background:linear-gradient(135deg,#0C4A6E 0%,#0369A1 100%);padding:60px 40px}
          .fbpd-spec-in{max-width:1280px;margin:0 auto;text-align:center}
          .fbpd-spec h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .fbpd-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .fbpd-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .fbpd-proc{background:linear-gradient(135deg,#f0f9ff 0%,#f0f9ff 50%,#bae6fd 100%);padding:80px 40px}
          .fbpd-proc-in{max-width:900px;margin:0 auto}
          .fbpd-steps{display:flex;flex-direction:column;margin-top:44px}
          .fbpd-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(3,105,161,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .fbpd-step:last-child{border-bottom:none}.fbpd-step.visible{opacity:1;transform:translateX(0)}
          .fbpd-snum{font-size:3rem;font-weight:900;color:rgba(3,105,161,0.15);line-height:1;letter-spacing:-2px}
          .fbpd-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .fbpd-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .fbpd-why{background:#fff;padding:80px 40px}.fbpd-why-in{max-width:1280px;margin:0 auto}
          .fbpd-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .fbpd-wcard{background:linear-gradient(135deg,#f0f9ff 0%,#fff 60%,#bae6fd 100%);border:1px solid rgba(3,105,161,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .fbpd-wcard.visible{opacity:1;transform:translateY(0)}.fbpd-wcard:hover{border-color:rgba(3,105,161,0.20);box-shadow:0 8px 32px rgba(3,105,161,0.07)}
          .fbpd-dot{width:8px;height:8px;border-radius:50%;background:#0369A1;margin-bottom:16px}
          .fbpd-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .fbpd-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .fbpd-faq{background:#f8fafd;padding:80px 40px}.fbpd-faq-in{max-width:860px;margin:0 auto}
          .fbpd-fitem{border-bottom:1px solid #e5e7eb}
          .fbpd-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .fbpd-fq:hover{color:#0369A1}
          .fbpd-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .fbpd-fitem.open .fbpd-ficon{border-color:#0369A1;color:#0369A1;background:rgba(3,105,161,0.06)}
          .fbpd-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .fbpd-fitem.open .fbpd-fa{max-height:500px;padding-bottom:22px}
          .fbpd-cta{background:linear-gradient(135deg,rgba(3,105,161,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(12,74,110,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .fbpd-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(3,105,161,0.10) 0%,transparent 70%);pointer-events:none}
          .fbpd-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(12,74,110,0.08) 0%,transparent 70%);pointer-events:none}
          .fbpd-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .fbpd-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#0C4A6E 0%,#0369A1 50%,#075985 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .fbpd-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          .fbpd-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          @media(max-width:1024px){.fbpd-grid{grid-template-columns:repeat(2,1fr)}.fbpd-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.fbpd-hero,.fbpd-svc,.fbpd-spec,.fbpd-proc,.fbpd-why,.fbpd-faq,.fbpd-cta{padding:60px 24px}.fbpd-hero{padding-top:60px;padding-bottom:0}.fbpd-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.fbpd-stat:nth-child(2){border-right:none}.fbpd-grid{grid-template-columns:1fr}.fbpd-why-grid{grid-template-columns:1fr}.fbpd-step{grid-template-columns:56px 1fr}.fbpd-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="fbpd-page">
        <section className="fbpd-hero"><div className="fbpd-o1"/><div className="fbpd-o2"/>
          <div className="fbpd-in">
            <nav className="fbpd-bc"><Link href="/">Home</Link><span>/</span><Link href="/social-media-marketing-services">Social Media</Link><span>/</span><span style={{color:'#0369A1'}}>Facebook Page Design</span></nav>
            <span className="fbpd-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#0369A1',display:'inline-block'}}/> Cover Photo · Templates · Ad Creative</span>
            <h1 className="fbpd-h1">Facebook Page Designing — Make Your First Impression Count</h1>
            <p className="fbpd-sub">Professional Facebook Business Page design — cover photos, post templates, ad creatives, and full page setup — ensuring your Facebook presence looks as credible as your business deserves.</p>
            <div className="fbpd-btns">
              <Link href="/contact-us" className="fbpd-btn-p">Get a Facebook Page Designed <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/facebook-management-services" className="fbpd-btn-s">Facebook Management</Link>
            </div>
            <div className="fbpd-stats">{STATS.map(s => <div key={s.label} className="fbpd-stat"><div className="fbpd-stat-l">{s.label}</div><div className="fbpd-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="fbpd-svc"><div className="fbpd-svc-in">
          <span className="fbpd-ey2">What We Design</span><h2 className="fbpd-ttl">Facebook Page Design Services</h2>
          <p className="fbpd-desc">Every visual element of your Facebook Business Page — designed to Meta specifications, consistent with your brand, and built to make a strong first impression.</p>
          <div className="fbpd-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`fbpd-card${visibleCards.includes(i)?' visible':''}`}><div className="fbpd-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="fbpd-spec"><div className="fbpd-spec-in">
          <h2>Facebook Image Specifications We Design To</h2>
          <div className="fbpd-pills">{SPECS.map(c => <span key={c} className="fbpd-pill">{c}</span>)}</div>
        </div></section>
        <section className="fbpd-proc"><div className="fbpd-proc-in">
          <span className="fbpd-ey2">How We Work</span><h2 className="fbpd-ttl">Our Facebook Page Design Process</h2>
          <p className="fbpd-desc">Brand review to full page delivery in 3 to 5 days — with editable templates included so your team can keep content fresh independently.</p>
          <div className="fbpd-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`fbpd-step${visibleSteps.includes(i)?' visible':''}`}><div className="fbpd-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="fbpd-why"><div className="fbpd-why-in">
          <span className="fbpd-ey2">Why 1Solutions</span><h2 className="fbpd-ttl">Spec-Accurate, Brand-Consistent Facebook Design</h2>
          <p className="fbpd-desc">We design to current Meta specifications, build reusable templates, and optimise both visuals and copy — so your Facebook page works as hard as the rest of your marketing.</p>
          <div className="fbpd-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`fbpd-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="fbpd-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="fbpd-faq"><div className="fbpd-faq-in">
          <span className="fbpd-ey2">Got Questions?</span><h2 className="fbpd-ttl">Facebook Page Design FAQs</h2>
          <p className="fbpd-desc">Answers to the most common questions about Facebook page design and setup.</p>
          <div style={{marginTop:44}}>{FAQS.map((f,i) => <div key={i} className={`fbpd-fitem${openFaq===i?' open':''}`}><button className="fbpd-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="fbpd-ficon">{openFaq===i?'−':'+'}</span></button><div className="fbpd-fa" style={openFaq===i?{maxHeight:500,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="fbpd-cta"><div className="fbpd-cta-o1"/><div className="fbpd-cta-o2"/>
          <div className="fbpd-cta-in">
            <span className="fbpd-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to Make Your Facebook Page Look Its Best?</span>
            <h2 className="fbpd-cta-t">Get Your Facebook Page Professionally Designed</h2>
            <p className="fbpd-cta-s">Share your brand assets and goals — we&rsquo;ll deliver a complete Facebook page design package within 3 to 5 business days.</p>
            <div className="fbpd-cta-btns">
              <Link href="/contact-us" className="fbpd-btn-p">Get a Facebook Page Design Quote <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/facebook-management-services" className="fbpd-btn-s">Facebook Management Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
