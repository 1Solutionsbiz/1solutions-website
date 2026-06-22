import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Photography Website SEO Audit', desc: 'A complete SEO audit of your photography website — covering page speed (critical for image-heavy sites), technical health, keyword rankings, Google Business Profile, and competitor positioning — identifying every opportunity to rank higher and attract more enquiries.' },
  { n: '02', title: 'Local SEO for Photographers', desc: 'Dominate local search for photography services in your area — Google Business Profile optimisation, local citation building, review management, and geo-targeted keyword strategy to appear when local clients search for photographers near them.' },
  { n: '03', title: 'Photography Keyword Research', desc: 'Identifying the exact search terms your potential clients use — from broad ("wedding photographer London") to specific ("elopement photographer Peak District") — targeting commercially valuable keywords with realistic ranking potential for your market.' },
  { n: '04', title: 'Image SEO & Alt Text Optimisation', desc: 'Optimising your portfolio images for search — descriptive alt text, SEO-friendly image file names, image compression for page speed, structured data markup, and Google Image Search optimisation to attract traffic from visual search results.' },
  { n: '05', title: 'Portfolio & Gallery Page SEO', desc: 'Optimising your gallery and portfolio pages with targeted keywords, descriptive content, location tags, and proper URL structures — turning your best work into SEO landing pages that rank for specific photography style and location searches.' },
  { n: '06', title: 'SEO Blog & Content Strategy', desc: 'Building topical authority through targeted blog content — wedding planning guides, venue reviews, photography tips, and location-specific posts that attract organic traffic from engaged potential clients at the research stage of the booking journey.' },
  { n: '07', title: 'Link Building for Photographers', desc: 'Building backlinks from wedding directories, venue websites, photography publications, and local press — increasing your domain authority and improving rankings for competitive photography keywords in your market.' },
  { n: '08', title: 'Google Business Profile Management', desc: 'Ongoing Google Business Profile management — posts, review responses, Q&A management, photo uploads, and service listing updates — maximising local map pack visibility and driving enquiry calls from local searches.' },
];

const NICHES = ['Wedding Photography', 'Portrait Photography', 'Commercial Photography', 'Newborn & Family', 'Event Photography', 'Fashion Photography', 'Real Estate Photography', 'Product Photography', 'Boudoir Photography', 'Sports Photography'];

const PROCESS = [
  { step: '01', title: 'Photography Business Discovery', desc: 'Understanding your photography niche, target clients, geographic market, booking calendar goals, and current visibility — the context needed to build the right SEO strategy for your specific business.' },
  { step: '02', title: 'Keyword & Competitor Research', desc: 'Research the keywords your ideal clients search for — by style, location, and occasion — and benchmark where you rank against competing photographers for each.' },
  { step: '03', title: 'Technical & Image SEO Foundations', desc: 'Page speed, image optimisation, technical fixes, and structured data — the performance and technical foundations that make your portfolio site rank-worthy and fast.' },
  { step: '04', title: 'Page & Portfolio Optimisation', desc: 'Optimising key service pages and gallery pages with location-specific, style-specific keywords and compelling content that ranks and converts enquiries.' },
  { step: '05', title: 'Content & Link Building', desc: 'Monthly blog content targeting long-tail photography keywords, combined with link acquisition from wedding directories, venues, and industry publications.' },
  { step: '06', title: 'Monthly Reporting', desc: 'Rankings, organic traffic, Google Business Profile insights, and enquiry trend data — a clear view of how your SEO investment is translating into bookings.' },
];

const WHY = [
  { title: 'Photography-Specific SEO Strategy', desc: 'Photographer websites have unique SEO challenges: image-heavy pages that load slowly, portfolio content with little text, and local market competition from other photographers. Our strategies are built around these specific challenges — not adapted from a generic SEO playbook.' },
  { title: 'Page Speed for Image Sites', desc: 'Photography websites are notorious for being slow because of large image files. Slow page speed is a significant ranking factor. We specialise in image optimisation, CDN implementation, and Core Web Vitals improvement for portfolio sites without compromising image quality.' },
  { title: 'Visual Search Optimisation', desc: 'Google Images is a meaningful traffic source for photographers. Properly optimised alt text, image file names, and structured data help your work appear in image search results — driving additional organic traffic from people searching for photography inspiration.' },
  { title: 'Local Market Dominance', desc: 'Most photographers compete in a specific geographic market. We focus on the local SEO tactics that get you into the Google Maps pack and top organic positions for "[your niche] photographer [your location]" searches — the queries with the highest booking intent.' },
  { title: 'Content That Attracts Ideal Clients', desc: 'The right blog content — venue reviews, real wedding features, photography guides for specific locations — attracts searchers who are exactly the type of clients you want. We build a content strategy around your niche and your ideal booking type.' },
  { title: 'Wedding & Events Industry Knowledge', desc: 'The wedding and events photography market has specific seasonal patterns, booking timelines, and client search behaviour. We understand the industry well enough to build SEO timelines around peak booking seasons — so your rankings peak when clients are actively searching.' },
];

const FAQS = [
  { q: 'Why is SEO important for photographers?', a: 'Photography is a highly competitive service market, and most potential clients start their search online. Ranking on page 1 of Google for searches like "wedding photographer [your city]" or "newborn photographer [your area]" places you directly in front of people actively looking to book. Unlike paid advertising, organic SEO rankings continue generating enquiries without ongoing click costs. For photographers who rely heavily on word-of-mouth or Instagram, SEO provides an additional discovery channel that reaches potential clients you would never reach through your existing network or social following. A well-optimised photography website can generate consistent enquiry volume from organic search with relatively modest ongoing investment.' },
  { q: 'What are the most important SEO keywords for photographers?', a: 'Photography SEO keywords typically follow the pattern of [niche] + photographer + [location]: "wedding photographer London," "newborn photographer Manchester," "headshot photographer Birmingham." These commercial intent keywords are the highest priority because they attract people actively looking to book. Below these, location-specific long-tail terms like "wedding photographer [specific venue name]," "elopement photographer [national park]," or "[style] photographer [town]" are lower competition and often highly converting — clients searching this specifically have already narrowed their decision criteria. Informational keywords (wedding planning guides, photography tips, venue reviews) attract research-stage traffic that builds brand familiarity before the booking decision.' },
  { q: 'How does image SEO work for photography websites?', a: 'Image SEO helps your photographs appear in Google Image Search results and helps individual portfolio pages rank in web search. Key elements include: alt text — descriptive text added to each image tag that tells Google what the image shows; relevant, descriptive file names (not IMG_4521.jpg); image compression to reduce file size without quality loss; responsive images that serve appropriate sizes for different devices; and schema markup (ImageObject or LocalBusiness) that provides structured data about your work and business. Google Image Search is a significant traffic source for photographers — particularly for inspiration-driven searches like "[style] wedding photography," "dark moody wedding photos," or "[venue name] wedding." Proper image SEO allows your portfolio to appear in these results.' },
  { q: 'How do I rank for wedding photography in my city?', a: 'Ranking for competitive wedding photography keywords in a city requires: an authoritative, fast, technically sound website; dedicated service pages with location-specific content targeting your main keywords; portfolio and gallery pages optimised for specific styles and venues in your area; a well-maintained Google Business Profile with photos, reviews, and regular posts; backlinks from local wedding directories (Hitched, Bridebook, The Wedding Directory), venue websites, and local press coverage; and consistent content creation about local venues, real weddings, and wedding planning in your city. In highly competitive markets (London, Manchester, New York), building sufficient domain authority to rank on page 1 for primary keywords takes 12 to 24 months of consistent SEO investment. In smaller markets, meaningful rankings can come within 6 to 12 months.' },
  { q: 'Should I use a photography platform (like Squarespace or Pic-Time) or a custom WordPress site for SEO?', a: 'For SEO purposes, a custom WordPress website offers the most flexibility and control — plugins like Yoast or RankMath, full control over URLs and technical settings, and the ability to implement any SEO technique without platform limitations. However, a well-configured Squarespace or ShowIt website can perform adequately for SEO — particularly for local photography markets where the competition is manageable. Pic-Time and similar client-facing gallery platforms (Pixieset, Cloudspot) are not designed for SEO and should not be your primary web presence for search visibility — they are client delivery tools, not marketing websites. If you are on a photography-specific platform that limits your SEO options significantly, we can advise on whether migration to WordPress would be worth the investment for your specific goals.' },
  { q: 'How long does SEO take to work for a photographer?', a: 'Timeline varies by market competitiveness and starting position. For new websites or domains: initial technical and on-page improvements can show ranking movement within 6 to 12 weeks; meaningful organic traffic from target keywords typically takes 6 to 12 months; competitive local market dominance usually requires 12 to 24 months. For established websites with prior SEO: improvements to existing rankings often appear within 4 to 8 weeks of on-page optimisation; significant rank improvements for competitive keywords take 3 to 9 months depending on current authority. Local SEO (Google Maps pack) can show faster improvement — particularly for photographers who have not yet fully optimised their Google Business Profile, where meaningful improvement can appear in 4 to 8 weeks.' },
  { q: 'Can Instagram replace SEO for photographers?', a: 'Instagram and SEO are complementary rather than competing channels — but they reach different audiences at different stages of the booking journey. Instagram attracts people who follow you and people who discover you through hashtags and Reels — it is excellent for building a style portfolio and generating direct engagement with your audience. However, Instagram reach depends on the algorithm, which can change and limits reach to followers plus discovery within the platform. SEO reaches people who are actively searching to book — higher purchase intent at the moment of search. Instagram is much better for brand building and inspiration; SEO is much better for capturing demand from people who are ready to enquire. Relying solely on Instagram means you are invisible to a large segment of potential clients who search Google first.' },
  { q: 'Do you work with photographers outside of the UK?', a: 'Yes. We work with photographers in the UK, US, Australia, Canada, and other English-speaking markets. The SEO principles are the same across markets — local keyword targeting, Google Business Profile optimisation, portfolio page SEO, and content strategy — though the competitive landscape, search volumes, and local directory landscape differ by region. We tailor our approach to the specific market you operate in. For photographers in highly competitive markets (New York, Los Angeles, Sydney, London), we are transparent about the longer timeline and higher investment required to reach page 1 for primary keywords.' },
];

const STATS = [
  { label: 'Photographer Clients', val: '120+' },
  { label: 'Avg Enquiry Growth', val: '+82%' },
  { label: 'Years Experience', val: '12+' },
  { label: 'Client Retention', val: '91%' },
];

export default function PhotographySeoServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Photography SEO Services', item: 'https://www.1solutions.biz/photography-seo-services/' }] }, { '@type': 'Service', name: 'Photography SEO Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Photography SEO', url: 'https://www.1solutions.biz/photography-seo-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Photography SEO Services | SEO for Photographers | 1Solutions</title>
        <meta name="description" content="SEO services for photographers — local search optimisation, image SEO, portfolio page optimisation, and Google Business Profile management to rank higher and book more clients from organic search." />
        <meta name="keywords" content="photography seo services, seo for photographers, wedding photographer seo, photographer local seo, photography website seo, image seo, photographer google business profile" />
        <link rel="canonical" href="https://www.1solutions.biz/photography-seo-services/" />
        <meta property="og:title" content="Photography SEO Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/photography-seo-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .phseo-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .phseo-page *,.phseo-page *::before,.phseo-page *::after{box-sizing:border-box}
          .phseo-hero{background:linear-gradient(135deg,#fdf4ff 0%,#fae8ff 30%,#f5d0fe 65%,#fdf4ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .phseo-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(168,85,247,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .phseo-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(107,33,168,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .phseo-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .phseo-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .phseo-bc a{color:#6b7280;text-decoration:none}.phseo-bc a:hover{color:#A855F7}.phseo-bc span{color:#d1d5db}
          .phseo-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#A855F7;margin-bottom:28px}
          .phseo-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#6B21A8 0%,#A855F7 50%,#9333EA 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .phseo-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .phseo-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .phseo-btn-p{display:inline-flex;align-items:center;gap:8px;background:#A855F7;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(168,85,247,0.28)}
          .phseo-btn-p:hover{background:#6B21A8;box-shadow:0 8px 32px rgba(168,85,247,0.38);transform:translateY(-2px)}
          .phseo-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .phseo-btn-s:hover{border-color:#A855F7;color:#A855F7;transform:translateY(-2px)}
          .phseo-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(168,85,247,0.07)}
          .phseo-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(168,85,247,0.08)}.phseo-stat:last-child{border-right:none}
          .phseo-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .phseo-stat-v{font-size:1.6rem;font-weight:900;color:#A855F7;letter-spacing:-0.5px}
          .phseo-svc{background:#f8fafd;padding:80px 40px}.phseo-svc-in{max-width:1280px;margin:0 auto}
          .phseo-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#A855F7;margin-bottom:10px;display:block}
          .phseo-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#6B21A8 0%,#A855F7 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .phseo-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .phseo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .phseo-card{background:linear-gradient(135deg,rgba(253,244,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(250,232,255,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(168,85,247,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease}
          .phseo-card.visible{opacity:1;transform:translateY(0)}.phseo-card:hover{transform:translateY(-6px);border-color:rgba(168,85,247,0.22);box-shadow:0 16px 48px rgba(168,85,247,0.09)}
          .phseo-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#A855F7;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .phseo-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .phseo-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .phseo-niches{background:linear-gradient(135deg,#6B21A8 0%,#A855F7 100%);padding:60px 40px}
          .phseo-niches-in{max-width:1280px;margin:0 auto;text-align:center}
          .phseo-niches h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .phseo-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .phseo-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .phseo-proc{background:linear-gradient(135deg,#fdf4ff 0%,#fdf4ff 50%,#fae8ff 100%);padding:80px 40px}
          .phseo-proc-in{max-width:900px;margin:0 auto}
          .phseo-steps{display:flex;flex-direction:column;margin-top:44px}
          .phseo-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(168,85,247,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .phseo-step:last-child{border-bottom:none}.phseo-step.visible{opacity:1;transform:translateX(0)}
          .phseo-snum{font-size:3rem;font-weight:900;color:rgba(168,85,247,0.15);line-height:1;letter-spacing:-2px}
          .phseo-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .phseo-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .phseo-why{background:#fff;padding:80px 40px}.phseo-why-in{max-width:1280px;margin:0 auto}
          .phseo-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .phseo-wcard{background:linear-gradient(135deg,#fdf4ff 0%,#fff 60%,#fae8ff 100%);border:1px solid rgba(168,85,247,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .phseo-wcard.visible{opacity:1;transform:translateY(0)}.phseo-wcard:hover{border-color:rgba(168,85,247,0.20);box-shadow:0 8px 32px rgba(168,85,247,0.07)}
          .phseo-dot{width:8px;height:8px;border-radius:50%;background:#A855F7;margin-bottom:16px}
          .phseo-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .phseo-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .phseo-faq{background:#f8fafd;padding:80px 40px}.phseo-faq-in{max-width:860px;margin:0 auto}
          .phseo-fitem{border-bottom:1px solid #e5e7eb}
          .phseo-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .phseo-fq:hover{color:#A855F7}
          .phseo-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .phseo-fitem.open .phseo-ficon{border-color:#A855F7;color:#A855F7;background:rgba(168,85,247,0.06)}
          .phseo-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .phseo-fitem.open .phseo-fa{max-height:600px;padding-bottom:22px}
          .phseo-cta{background:linear-gradient(135deg,rgba(168,85,247,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(107,33,168,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .phseo-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(168,85,247,0.10) 0%,transparent 70%);pointer-events:none}
          .phseo-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(107,33,168,0.08) 0%,transparent 70%);pointer-events:none}
          .phseo-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .phseo-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#6B21A8 0%,#A855F7 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .phseo-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.phseo-grid{grid-template-columns:repeat(2,1fr)}.phseo-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.phseo-hero,.phseo-svc,.phseo-niches,.phseo-proc,.phseo-why,.phseo-faq,.phseo-cta{padding:60px 24px}.phseo-hero{padding-top:60px;padding-bottom:0}.phseo-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.phseo-stat:nth-child(2){border-right:none}.phseo-grid{grid-template-columns:1fr}.phseo-why-grid{grid-template-columns:1fr}.phseo-step{grid-template-columns:56px 1fr}.phseo-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="phseo-page">
        <section className="phseo-hero"><div className="phseo-o1"/><div className="phseo-o2"/>
          <div className="phseo-in">
            <nav className="phseo-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO</Link><span>/</span><span style={{color:'#A855F7'}}>Photography SEO Services</span></nav>
            <span className="phseo-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#A855F7',display:'inline-block'}}/> Local SEO · Image SEO · Portfolio Optimisation · GBP</span>
            <h1 className="phseo-h1">Photography SEO Services — Rank Higher &amp; Book More Clients from Google</h1>
            <p className="phseo-sub">SEO services built specifically for photographers — local search optimisation, portfolio page SEO, image optimisation, and content strategy to generate consistent enquiries from organic search.</p>
            <div className="phseo-btns">
              <Link href="/contact" className="phseo-btn-p">Get a Free Photography SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/local-seo-services" className="phseo-btn-s">Local SEO Services</Link>
            </div>
            <div className="phseo-stats">{STATS.map(s => <div key={s.label} className="phseo-stat"><div className="phseo-stat-l">{s.label}</div><div className="phseo-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="phseo-svc"><div className="phseo-svc-in">
          <span className="phseo-ey2">What We Do</span><h2 className="phseo-ttl">Photography SEO Services</h2>
          <p className="phseo-desc">Every SEO service a photographer needs — from image optimisation to local map pack visibility and content strategy that attracts ideal clients.</p>
          <div className="phseo-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`phseo-card${visibleCards.includes(i)?' visible':''}`}><div className="phseo-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="phseo-niches"><div className="phseo-niches-in"><h2>Photography Niches We Work With</h2><div className="phseo-pills">{NICHES.map(n => <span key={n} className="phseo-pill">{n}</span>)}</div></div></section>
        <section className="phseo-proc"><div className="phseo-proc-in">
          <span className="phseo-ey2">How We Work</span><h2 className="phseo-ttl">Our Photography SEO Process</h2>
          <p className="phseo-desc">Discovery to bookings — a structured approach built around your niche, your local market, and your ideal clients.</p>
          <div className="phseo-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`phseo-step${visibleSteps.includes(i)?' visible':''}`}><div className="phseo-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="phseo-why"><div className="phseo-why-in">
          <span className="phseo-ey2">Why 1Solutions</span><h2 className="phseo-ttl">Photography-Specific SEO — Not One-Size-Fits-All</h2>
          <p className="phseo-desc">Photography websites have unique challenges. We build strategies around them — not around a generic template.</p>
          <div className="phseo-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`phseo-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="phseo-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="phseo-faq"><div className="phseo-faq-in">
          <span className="phseo-ey2">Got Questions?</span><h2 className="phseo-ttl">Photography SEO FAQs</h2>
          <p className="phseo-desc" style={{marginBottom:44}}>Answers to the most common questions about SEO for photographers.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`phseo-fitem${openFaq===i?' open':''}`}><button className="phseo-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="phseo-ficon">{openFaq===i?'−':'+'}</span></button><div className="phseo-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="phseo-cta"><div className="phseo-cta-o1"/><div className="phseo-cta-o2"/>
          <div className="phseo-cta-in">
            <span className="phseo-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to be found by clients searching for photographers?</span>
            <h2 className="phseo-cta-t">Get a Free Photography Website SEO Audit</h2>
            <p className="phseo-cta-s">We&rsquo;ll audit your website, your Google Business Profile, and your local keyword rankings — and show you exactly what to fix to generate more organic enquiries.</p>
            <div className="phseo-btns">
              <Link href="/contact" className="phseo-btn-p">Request a Free Photography SEO Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/local-seo-packages" className="phseo-btn-s">Local SEO Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
