import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const MODULES = [
  { n: '01', title: 'SEO Fundamentals & How Google Works', desc: 'Understanding how search engines crawl, index, and rank web pages — the foundational knowledge behind every SEO decision. Core concepts: PageRank, E-E-A-T, search intent, keyword types, and the anatomy of a SERP.' },
  { n: '02', title: 'Keyword Research & Search Intent', desc: 'Finding the keywords your target audience uses — search volume, keyword difficulty, commercial vs informational intent — using tools like Google Keyword Planner, Semrush, Ahrefs, and Ubersuggest. Building a keyword map for a real website.' },
  { n: '03', title: 'On-Page SEO & Content Optimisation', desc: 'Title tags, meta descriptions, header structure (H1–H6), URL optimisation, keyword placement, internal linking, and content quality — the on-page elements that make individual pages rank for target keywords.' },
  { n: '04', title: 'Technical SEO', desc: 'Site speed, mobile usability, crawlability, indexation, robots.txt, XML sitemaps, HTTPS, Core Web Vitals, and structured data (schema markup) — the technical foundation that Google needs before on-page and off-page efforts can reach their potential.' },
  { n: '05', title: 'Local SEO & Google Business Profile', desc: 'Optimising for local search — Google Business Profile setup and management, local citations and NAP consistency, review generation strategy, and location page optimisation for businesses serving specific geographic areas.' },
  { n: '06', title: 'Link Building & Off-Page SEO', desc: 'Building backlinks that move rankings — editorial link acquisition, digital PR, guest posting, local citations, and competitor backlink analysis. Understanding what makes a good link and how to evaluate backlink quality.' },
  { n: '07', title: 'SEO Tools & Analytics', desc: 'Hands-on training with Google Search Console, Google Analytics 4, Semrush, Ahrefs, Screaming Frog, and PageSpeed Insights — the professional toolkit for executing and measuring SEO campaigns.' },
  { n: '08', title: 'SEO Reporting & Client Communication', desc: 'Building SEO reports, presenting results to clients, managing expectations, and demonstrating ROI — the commercial skills needed to build a freelance SEO career or manage clients as an agency professional.' },
];

const TOOLS_COVERED = ['Google Search Console', 'Google Analytics 4', 'Semrush', 'Ahrefs', 'Ubersuggest', 'Screaming Frog', 'PageSpeed Insights', 'Google Keyword Planner', 'Yoast SEO', 'Schema Markup'];

const PROCESS = [
  { step: '01', title: 'Batch Orientation & Goal Setting', desc: 'First session covers your goals — freelancing, job placement, in-house SEO, or agency career — and sets the learning path to match your specific objective.' },
  { step: '02', title: 'Theory + Tool Practicals', desc: 'Every module combines concept explanation with hands-on tool practice — you work on real websites (including your own if you have one) to apply learning immediately.' },
  { step: '03', title: 'Live SEO Project Work', desc: 'Mid-training, you take on a live SEO project — audit, keyword research, on-page optimisation, and implementation — under mentor guidance, building a real portfolio piece.' },
  { step: '04', title: 'Mock Audits & Client Simulations', desc: 'Practicing full site audits and client briefing simulations — preparing you for real agency and freelance work scenarios before the training ends.' },
  { step: '05', title: 'Certification & Portfolio', desc: 'On course completion, you receive a 1Solutions SEO Training certification and a project portfolio you can share with employers or clients.' },
  { step: '06', title: 'Post-Training Mentorship', desc: '30-day post-training support — WhatsApp group access, doubt resolution sessions, and alumni community access so your learning continues after the course ends.' },
];

const WHY = [
  { title: 'Taught by Practitioners, Not Academics', desc: 'Our trainers are working SEO professionals at 1Solutions — actively managing SEO campaigns for real clients across India and internationally. You learn what actually works in live campaigns, not textbook theory.' },
  { title: 'Small Batch Sizes', desc: 'Maximum 8 to 12 students per batch — so every student gets individual attention, their questions are answered in class, and the trainer can address the specific gaps in each person\'s understanding.' },
  { title: 'Live Project Portfolio', desc: 'You graduate with at least one real SEO project in your portfolio — an audit, keyword strategy, and on-page implementation on a real website. This is what employers and freelance clients want to see.' },
  { title: 'Placement & Freelancing Support', desc: 'We have an active network of digital agencies and in-house SEO teams in Delhi and Laxmi Nagar. Graduates who want job placement get introductions. Freelancers get guidance on client acquisition, pricing, and scope management.' },
  { title: 'Flexible Timing for Working Professionals', desc: 'Morning and evening batches available for students and working professionals. Weekend intensive options available for those who cannot attend weekday sessions.' },
  { title: 'Laxmi Nagar Location — Easy Access', desc: 'Our training centre is easily accessible from Laxmi Nagar metro station (Blue Line). Located in the heart of East Delhi\'s professional and commercial hub — convenient for students from Laxmi Nagar, Preet Vihar, Mayur Vihar, Patparganj, and surrounding areas.' },
];

const FAQS = [
  { q: 'What does the SEO training in Laxmi Nagar cover?', a: 'Our SEO training in Laxmi Nagar covers the complete SEO syllabus: SEO fundamentals and how Google\'s algorithm works; keyword research and search intent analysis; on-page SEO — titles, meta descriptions, header structure, content optimisation; technical SEO — site speed, crawlability, Core Web Vitals, structured data; local SEO and Google Business Profile management; link building and off-page SEO strategy; professional SEO tools — Google Search Console, GA4, Semrush, Ahrefs, Screaming Frog; and SEO reporting and client management. The course includes live project work and a 30-day post-training support period. Total duration: 6 to 8 weeks (3 sessions per week, 2 hours per session).' },
  { q: 'Is this SEO course suitable for beginners?', a: 'Yes. The course is designed for complete beginners with no prior SEO or digital marketing experience. We start from the absolute fundamentals — explaining how search engines work before teaching any strategy or technique. We also accept students who have some SEO exposure but want to fill gaps and learn professional-level execution. If you are a complete beginner, you are in the right place. You do not need a technical background or coding knowledge — SEO does not require programming skills, and we explain any technical concepts in accessible terms.' },
  { q: 'What are the fees for SEO training in Laxmi Nagar?', a: 'Please contact us or visit our training centre for current batch fees. Fees vary based on batch type (weekday / weekend / fast-track), batch size, and any current offer periods. We keep our fees competitive for the quality of training and practitioner-level instruction offered — significantly below large coaching institutes that use junior trainers. We also offer instalment payment options for students. Call or WhatsApp to get the current fee structure and available batch timings.' },
  { q: 'Will I get a job after completing this SEO course?', a: 'Our placement support gives you a genuine advantage — introductions to digital agencies and in-house teams in the Delhi NCR market who have hired our graduates. However, job placement depends on your effort, communication skills, and the quality of your portfolio. Our role is to give you the skills, the certification, and the introductions. The job is yours to earn from there. Past graduates have joined digital marketing agencies in Laxmi Nagar, Noida, and Delhi, as well as starting successful freelance SEO careers. No legitimate training provider can guarantee employment — but our track record of student placements in the Delhi market is strong.' },
  { q: 'Can I do SEO freelancing after this course?', a: 'Yes — SEO freelancing is one of the most viable career paths after this training. SEO skills translate directly to freelance client work: keyword research and site audits for local businesses, monthly SEO retainers for small businesses, and project-based work for website launches. We include a dedicated freelancing module covering: how to find your first client; how to price SEO services; how to scope and propose projects; how to structure monthly retainer agreements; and how to report to clients. Graduates who want to freelance rather than take employment also get ongoing community support through our alumni WhatsApp group.' },
  { q: 'How is this SEO training different from free YouTube tutorials?', a: 'Free YouTube tutorials teach concepts — our training builds skills. The difference is: structured progression from fundamentals to advanced topics in a logical sequence, not random videos; live hands-on practice on real websites during class, not passive watching; a trainer who answers your specific questions about your specific situation in real time; a real project portfolio at the end — a concrete demonstration of skills employers and clients can evaluate; accountability of scheduled sessions that keep you progressing rather than dropping off after a few videos; and post-training support and placement assistance. YouTube is excellent for ongoing learning — but for building job-ready or freelance-ready skills, structured training with practitioner mentors accelerates progress dramatically.' },
  { q: 'Do you provide a certificate after the SEO course?', a: 'Yes. On successful completion of the course and the final project, you receive a 1Solutions SEO Training completion certificate. While this is not a government-accredited certification, it demonstrates to employers and clients that you have completed structured, professional-level SEO training at a reputable digital agency. The certificate combined with your project portfolio — a real-world SEO audit and optimisation project — is a far stronger job or freelance application credential than a certificate alone.' },
  { q: 'What is the batch timing and duration?', a: 'Current batch options: Weekday Morning Batch: 8:30 AM to 10:30 AM, Monday to Friday (4 weeks). Weekday Evening Batch: 7:00 PM to 9:00 PM, Monday to Friday (4 weeks). Weekend Batch: 10:00 AM to 1:00 PM, Saturday and Sunday (6 to 8 weeks). Fast-Track Intensive: Flexible timing, 1 to 2 weeks for students with some prior digital marketing exposure. Contact us for the current batch start dates — new batches begin monthly. Seats are limited to 8 to 12 students per batch.' },
];

const STATS = [
  { label: 'Students Trained', val: '800+' },
  { label: 'Placement Rate', val: '78%' },
  { label: 'Years Running', val: '10+' },
  { label: 'Google Rating', val: '4.9★' },
];

export default function SeoTrainingLaxmiNagar() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { MODULES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Training Laxmi Nagar', item: 'https://www.1solutions.biz/seo-training-laxmi-nagar/' }] }, { '@type': 'EducationalOrganization', name: '1Solutions SEO Training', url: 'https://www.1solutions.biz/seo-training-laxmi-nagar/', address: { '@type': 'PostalAddress', addressLocality: 'Laxmi Nagar', addressRegion: 'Delhi', postalCode: '110092', addressCountry: 'IN' } }, { '@type': 'Course', name: 'Professional SEO Training Course — Laxmi Nagar', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, courseMode: 'In Person', educationalLevel: 'Beginner to Advanced', timeRequired: 'P6W', url: 'https://www.1solutions.biz/seo-training-laxmi-nagar/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>SEO Training in Laxmi Nagar | Professional SEO Course Delhi | 1Solutions</title>
        <meta name="description" content="SEO training in Laxmi Nagar, Delhi — professional SEO course taught by working SEO practitioners. Small batches, live project work, placement support, and 30-day post-training mentorship." />
        <meta name="keywords" content="seo training laxmi nagar, seo course laxmi nagar, seo training delhi, seo institute laxmi nagar, seo classes laxmi nagar, digital marketing course laxmi nagar, seo training east delhi" />
        <link rel="canonical" href="https://www.1solutions.biz/seo-training-laxmi-nagar/" />
        <meta property="og:title" content="SEO Training in Laxmi Nagar | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/seo-training-laxmi-nagar/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .seotln-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .seotln-page *,.seotln-page *::before,.seotln-page *::after{box-sizing:border-box}
          .seotln-hero{background:linear-gradient(135deg,#fff7ed 0%,#ffedd5 30%,#fed7aa 65%,#fff7ed 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .seotln-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(234,88,12,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .seotln-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(154,52,18,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .seotln-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .seotln-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .seotln-bc a{color:#6b7280;text-decoration:none}.seotln-bc a:hover{color:#EA580C}.seotln-bc span{color:#d1d5db}
          .seotln-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(234,88,12,0.08);border:1px solid rgba(234,88,12,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#EA580C;margin-bottom:28px}
          .seotln-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#9A3412 0%,#EA580C 50%,#C2410C 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .seotln-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .seotln-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .seotln-btn-p{display:inline-flex;align-items:center;gap:8px;background:#EA580C;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(234,88,12,0.28)}
          .seotln-btn-p:hover{background:#9A3412;box-shadow:0 8px 32px rgba(234,88,12,0.38);transform:translateY(-2px)}
          .seotln-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .seotln-btn-s:hover{border-color:#EA580C;color:#EA580C;transform:translateY(-2px)}
          .seotln-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(234,88,12,0.07)}
          .seotln-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(234,88,12,0.08)}.seotln-stat:last-child{border-right:none}
          .seotln-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .seotln-stat-v{font-size:1.6rem;font-weight:900;color:#EA580C;letter-spacing:-0.5px}
          .seotln-svc{background:#f8fafd;padding:80px 40px}.seotln-svc-in{max-width:1280px;margin:0 auto}
          .seotln-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#EA580C;margin-bottom:10px;display:block}
          .seotln-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#9A3412 0%,#EA580C 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .seotln-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .seotln-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .seotln-card{background:linear-gradient(135deg,rgba(255,247,237,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(255,237,213,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(234,88,12,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease}
          .seotln-card.visible{opacity:1;transform:translateY(0)}.seotln-card:hover{transform:translateY(-6px);border-color:rgba(234,88,12,0.22);box-shadow:0 16px 48px rgba(234,88,12,0.09)}
          .seotln-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#EA580C;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .seotln-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .seotln-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .seotln-tools{background:linear-gradient(135deg,#9A3412 0%,#EA580C 100%);padding:60px 40px}
          .seotln-tools-in{max-width:1280px;margin:0 auto;text-align:center}
          .seotln-tools h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .seotln-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .seotln-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .seotln-proc{background:linear-gradient(135deg,#fff7ed 0%,#fff7ed 50%,#ffedd5 100%);padding:80px 40px}
          .seotln-proc-in{max-width:900px;margin:0 auto}
          .seotln-steps{display:flex;flex-direction:column;margin-top:44px}
          .seotln-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(234,88,12,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .seotln-step:last-child{border-bottom:none}.seotln-step.visible{opacity:1;transform:translateX(0)}
          .seotln-snum{font-size:3rem;font-weight:900;color:rgba(234,88,12,0.15);line-height:1;letter-spacing:-2px}
          .seotln-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .seotln-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .seotln-why{background:#fff;padding:80px 40px}.seotln-why-in{max-width:1280px;margin:0 auto}
          .seotln-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .seotln-wcard{background:linear-gradient(135deg,#fff7ed 0%,#fff 60%,#ffedd5 100%);border:1px solid rgba(234,88,12,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .seotln-wcard.visible{opacity:1;transform:translateY(0)}.seotln-wcard:hover{border-color:rgba(234,88,12,0.20);box-shadow:0 8px 32px rgba(234,88,12,0.07)}
          .seotln-dot{width:8px;height:8px;border-radius:50%;background:#EA580C;margin-bottom:16px}
          .seotln-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .seotln-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .seotln-faq{background:#f8fafd;padding:80px 40px}.seotln-faq-in{max-width:860px;margin:0 auto}
          .seotln-fitem{border-bottom:1px solid #e5e7eb}
          .seotln-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .seotln-fq:hover{color:#EA580C}
          .seotln-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .seotln-fitem.open .seotln-ficon{border-color:#EA580C;color:#EA580C;background:rgba(234,88,12,0.06)}
          .seotln-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .seotln-fitem.open .seotln-fa{max-height:600px;padding-bottom:22px}
          .seotln-cta{background:linear-gradient(135deg,rgba(234,88,12,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(154,52,18,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .seotln-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(234,88,12,0.10) 0%,transparent 70%);pointer-events:none}
          .seotln-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(154,52,18,0.08) 0%,transparent 70%);pointer-events:none}
          .seotln-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .seotln-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#9A3412 0%,#EA580C 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .seotln-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.seotln-grid{grid-template-columns:repeat(2,1fr)}.seotln-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.seotln-hero,.seotln-svc,.seotln-tools,.seotln-proc,.seotln-why,.seotln-faq,.seotln-cta{padding:60px 24px}.seotln-hero{padding-top:60px;padding-bottom:0}.seotln-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.seotln-stat:nth-child(2){border-right:none}.seotln-grid{grid-template-columns:1fr}.seotln-why-grid{grid-template-columns:1fr}.seotln-step{grid-template-columns:56px 1fr}.seotln-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="seotln-page">
        <section className="seotln-hero"><div className="seotln-o1"/><div className="seotln-o2"/>
          <div className="seotln-in">
            <nav className="seotln-bc"><Link href="/">Home</Link><span>/</span><span style={{color:'#EA580C'}}>SEO Training Laxmi Nagar</span></nav>
            <span className="seotln-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#EA580C',display:'inline-block'}}/> Laxmi Nagar · Delhi · Small Batches · Placement Support</span>
            <h1 className="seotln-h1">SEO Training in Laxmi Nagar — Professional SEO Course by Practitioners</h1>
            <p className="seotln-sub">Professional SEO training in Laxmi Nagar, Delhi — taught by working SEO professionals, not academics. Small batches of 8–12 students, live project work, SEO tools training, and 30-day post-course mentorship.</p>
            <div className="seotln-btns">
              <Link href="/contact-us" className="seotln-btn-p">Enquire About Next Batch <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-services-company" className="seotln-btn-s">SEO Services</Link>
            </div>
            <div className="seotln-stats">{STATS.map(s => <div key={s.label} className="seotln-stat"><div className="seotln-stat-l">{s.label}</div><div className="seotln-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="seotln-svc"><div className="seotln-svc-in">
          <span className="seotln-ey2">Course Curriculum</span><h2 className="seotln-ttl">What You Learn in Our SEO Course</h2>
          <p className="seotln-desc">8 comprehensive modules — from SEO fundamentals to professional client management — with hands-on tool practice and live project work throughout.</p>
          <div className="seotln-grid" ref={cardsRef}>{MODULES.map((m,i) => <div key={m.n} className={`seotln-card${visibleCards.includes(i)?' visible':''}`}><div className="seotln-num">{m.n}</div><h3>{m.title}</h3><p>{m.desc}</p></div>)}</div>
        </div></section>
        <section className="seotln-tools"><div className="seotln-tools-in"><h2>SEO Tools You Will Learn</h2><div className="seotln-pills">{TOOLS_COVERED.map(t => <span key={t} className="seotln-pill">{t}</span>)}</div></div></section>
        <section className="seotln-proc"><div className="seotln-proc-in">
          <span className="seotln-ey2">Training Structure</span><h2 className="seotln-ttl">How the SEO Training Programme Works</h2>
          <p className="seotln-desc">Orientation to certification — a clear learning journey with live project work and post-training mentorship built in.</p>
          <div className="seotln-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`seotln-step${visibleSteps.includes(i)?' visible':''}`}><div className="seotln-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="seotln-why"><div className="seotln-why-in">
          <span className="seotln-ey2">Why Choose 1Solutions</span><h2 className="seotln-ttl">SEO Training by Practitioners — Built for Career and Freelancing Success</h2>
          <p className="seotln-desc">Not an institute with junior instructors — a working digital agency training you with the skills and portfolio to compete in the real Delhi SEO job market.</p>
          <div className="seotln-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`seotln-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="seotln-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="seotln-faq"><div className="seotln-faq-in">
          <span className="seotln-ey2">Got Questions?</span><h2 className="seotln-ttl">SEO Training FAQs</h2>
          <p className="seotln-desc" style={{marginBottom:44}}>Common questions about our Laxmi Nagar SEO training course.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`seotln-fitem${openFaq===i?' open':''}`}><button className="seotln-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="seotln-ficon">{openFaq===i?'−':'+'}</span></button><div className="seotln-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="seotln-cta"><div className="seotln-cta-o1"/><div className="seotln-cta-o2"/>
          <div className="seotln-cta-in">
            <span className="seotln-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Ready to start your SEO career?</span>
            <h2 className="seotln-cta-t">Enquire About the Next SEO Batch in Laxmi Nagar</h2>
            <p className="seotln-cta-s">Contact us to get current batch timings, fees, and seat availability. New batches start monthly — seats are limited to 8–12 students per batch.</p>
            <div className="seotln-btns">
              <Link href="/contact-us" className="seotln-btn-p">Enquire About Next Batch <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/free-45-day-seo-trial" className="seotln-btn-s">Try Our 45-Day Free SEO Trial</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
