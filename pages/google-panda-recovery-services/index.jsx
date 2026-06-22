import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Panda / Helpful Content Penalty Diagnosis', desc: 'Correlate your traffic drop with confirmed Google Panda or Helpful Content Update dates — confirming whether your site was impacted and by which update iteration, to inform the correct recovery strategy.' },
  { n: '02', title: 'Thin Content Identification & Audit', desc: 'Site-wide audit identifying every thin, low-quality, and near-duplicate page — pages with insufficient content depth, poor keyword relevance, or content clearly written for search engines rather than users.' },
  { n: '03', title: 'Content Quality Scoring', desc: 'Page-by-page content quality assessment — evaluating depth, expertise, uniqueness, user value, and E-E-A-T signals — to triage which pages need rewriting, merging, improvement, or removal.' },
  { n: '04', title: 'Duplicate & Scraped Content Removal', desc: 'Identifying duplicate internal content, near-duplicate variations, and externally scraped or copied content — and resolving it through canonical tags, consolidation, rewriting, or removal with appropriate redirects.' },
  { n: '05', title: 'Content Improvement & Rewriting', desc: 'Rewriting thin, shallow content into comprehensive, expert resources that satisfy user intent — adding depth, data, examples, expert perspective, and E-E-A-T signals that the Helpful Content algorithm rewards.' },
  { n: '06', title: 'Content Consolidation & Merging', desc: 'Merging fragmented thin content spread across multiple URLs into a single, authoritative page — combining content, redirecting the merged URLs, and concentrating link equity for maximum ranking recovery.' },
  { n: '07', title: 'Noindex & Content Removal Strategy', desc: 'For pages that cannot be improved to an acceptable quality level — applying noindex directives or removing the content entirely with 301 redirects — reducing the proportion of low-quality content in your crawled index.' },
  { n: '08', title: 'Post-Recovery Content Strategy', desc: 'Building a sustainable content creation framework — editorial guidelines, E-E-A-T content standards, and a topical authority strategy — that prevents re-penalisation and drives long-term organic growth.' },
];

const SIGNALS = ['Thin Content', 'Duplicate Pages', 'Auto-Generated Content', 'AI Content (Unedited)', 'Scraped Content', 'Keyword Stuffing', 'Low-Value Aggregator Pages', 'Doorway Pages', 'Poor E-E-A-T', 'Unhelpful Content'];

const PROCESS = [
  { step: '01', title: 'Traffic Drop Correlation', desc: 'Map your organic traffic history against Google Panda and Helpful Content Update rollout dates — confirming the specific update that impacted your site.' },
  { step: '02', title: 'Full Content Audit', desc: 'Crawl your entire site, assess content quality on a page-by-page basis, and categorise every URL: keep, improve, consolidate, or remove.' },
  { step: '03', title: 'Recovery Plan', desc: 'A prioritised content improvement plan — starting with the highest-traffic and highest-authority pages — with clear timelines and improvement specifications for each page.' },
  { step: '04', title: 'Content Improvement', desc: 'Rewriting, expanding, and improving thin content — adding genuine depth, expertise signals, and user value. Removing or redirecting content that cannot be saved.' },
  { step: '05', title: 'Technical Implementation', desc: 'Canonicals, noindex directives, redirects, and structured data updates implemented — ensuring Google correctly understands and indexes your improved content.' },
  { step: '06', title: 'Recovery Monitoring', desc: 'Tracking rankings and organic traffic across the next algorithm refresh cycle — monitoring recovery progress and identifying any remaining quality issues.' },
];

const WHY = [
  { title: 'Helpful Content Update Specialists', desc: 'The Helpful Content Update (and its integration into the core algorithm) targets content written for search engines rather than users. Our recovery focuses on demonstrating genuine E-E-A-T — Experience, Expertise, Authoritativeness, and Trustworthiness — not just adding words to thin pages.' },
  { title: 'Triage Before Treatment', desc: 'Not all thin content can be improved to a quality level that Google rewards. We triage your content honestly — identifying which pages are worth investing in, which should be consolidated, and which should simply be removed. This prevents wasted effort on pages with no recovery potential.' },
  { title: 'Quantity Reduction, Quality Increase', desc: 'Panda and Helpful Content penalties often affect sites with a high ratio of low-quality pages. Counter-intuitively, having fewer but better pages often produces faster recovery. We are not afraid to recommend significant content reduction when the data supports it.' },
  { title: 'E-E-A-T Content Creation', desc: 'Recovery requires replacing thin content with pages that demonstrate genuine expertise and experience. We write or commission content with real author expertise, citations, original data, and the depth that satisfies what Google measures as E-E-A-T.' },
  { title: 'Algorithm Refresh Patience', desc: 'Helpful Content and Panda are "site-wide" signals that are reassessed during algorithm refreshes — not on a crawl-by-crawl basis. We explain this clearly and set realistic timelines. Recovery is confirmed at the next refresh, not the next crawl.' },
  { title: 'Future-Proof Content Standards', desc: 'We do not just fix the penalty — we implement content quality standards, editorial guidelines, and review processes that prevent re-penalisation as Google continues to improve its ability to assess content quality.' },
];

const FAQS = [
  { q: 'What is Google Panda and the Helpful Content Update?', a: 'Google Panda was introduced in 2011 to target "thin" and low-quality content — pages with little original value, duplicate content, keyword stuffing, and content that ranked well but failed to satisfy user intent. It was originally run as a periodic update but was incorporated into Google\'s core algorithm in 2016. The Helpful Content Update (first rolled out in August 2022, and fully integrated into the core algorithm in March 2024) extended this concept with a focus on "content written for search engines rather than people" — including low-quality AI-generated content, content without genuine expertise, and content that does not satisfy the searcher\'s actual need. Both target the same underlying principle: content quality and genuine usefulness to the reader.' },
  { q: 'How does the Helpful Content algorithm work?', a: 'The Helpful Content algorithm generates a site-wide classifier signal — it assesses the overall proportion of unhelpful content on your site, not just individual pages. A site with a significant proportion of low-quality, thin, or AI-generated content receives a sitewide quality signal that suppresses rankings across the entire domain — including pages that are individually good. This is why recovery requires addressing the overall proportion of unhelpful content, not just fixing the worst offenders. The signal is recalculated at algorithm refresh cycles, which run on irregular schedules. Recovery therefore requires both quality improvement and waiting for the next refresh to reprocess your site.' },
  { q: 'What types of content trigger Panda / Helpful Content penalties?', a: 'Content that triggers these penalties includes: thin content (pages with very little original information); near-duplicate content (multiple pages covering the same topic with minimal variation); auto-generated or template-generated content with insufficient human oversight; AI-generated content that has not been meaningfully edited, fact-checked, or enhanced by an expert; scraped or republished content from other sources; content clearly written to target keywords rather than to help the reader; aggregator pages that add no original value beyond compiling information from elsewhere; and content that lacks demonstrable E-E-A-T (the site or author has no obvious expertise or experience on the topic). Low-quality user-generated content (reviews, forum posts, comments) can also contribute.' },
  { q: 'How long does Panda / Helpful Content recovery take?', a: 'Recovery depends on the algorithm refresh cycle. The Helpful Content signal is reassessed during algorithm refreshes — typically coinciding with core updates, which Google now runs approximately 2 to 4 times per year. After completing content remediation, you must wait for the next refresh to process your improved site. This means: if you complete remediation two months before the next core update, you could see recovery then. If the next update runs a day after you finish, you will need to wait for the following one. Practically, most sites see recovery within 3 to 9 months of completing substantive content improvements — but we cannot guarantee timing because the refresh schedule is Google\'s decision, not ours.' },
  { q: 'Should I just delete all my thin content?', a: 'Not necessarily — deletion is one of several options, and the right choice depends on the page. For pages with zero search traffic, low inbound links, and thin content that cannot be improved: yes, remove them (with a 301 redirect to a relevant page). For pages with existing traffic, rankings, or backlinks: improve the content rather than delete it. For multiple thin pages covering the same topic: consolidate into one authoritative page and redirect the others. For pages with good information but poor structure or depth: improve, expand, and properly format them. The overall goal is to increase the proportion of helpful, high-quality content on your site — which can be achieved through a combination of improvement, consolidation, and strategic removal.' },
  { q: 'Is AI-generated content the cause of Helpful Content penalties?', a: 'AI-generated content is a contributing factor but is not automatically penalised. Google\'s Helpful Content guidance focuses on whether content is "helpful, reliable, and people-first" — not on whether it was produced by a human or AI. However, unedited AI-generated content is often thin, generic, factually unreliable, and clearly written to fill a keyword slot rather than genuinely help the reader — which is exactly what the algorithm targets. AI content that has been substantially edited, fact-checked, enhanced with real expertise, and genuinely serves the reader\'s needs is treated the same as human-written content. The test is quality, not authorship.' },
  { q: 'Will removing thin content hurt my traffic further?', a: 'In the short term, removing pages will cause those pages to lose whatever rankings they had. If those pages had very little traffic, the immediate impact is negligible. If they had some traffic — even from low-quality rankings — there can be a short-term dip. However, a Helpful Content penalty means your entire site is being suppressed because of that low-quality content. Removing it reduces the drag on your higher-quality pages and improves the overall content quality signal. Most sites that have been through Panda or Helpful Content recovery see the short-term traffic reduction from removal offset by broader ranking recovery once the next algorithm refresh processes the improved site.' },
  { q: 'Do you work with sites that have large amounts of AI content?', a: 'Yes — we have worked with sites that deployed large volumes of AI-generated content and subsequently saw significant ranking declines. The recovery approach involves: auditing all AI content against quality criteria (depth, accuracy, E-E-A-T, user value); rewriting or substantially enhancing the pages worth keeping; consolidating near-duplicate AI content; and removing or noindexing pages that cannot be improved to an acceptable standard. We also implement content quality review processes to prevent the same issue recurring. If the volume of affected content is very large, we prioritise by traffic and authority potential and work through the backlog systematically.' },
];

const STATS = [
  { label: 'Panda / HC Recoveries', val: '150+' },
  { label: 'Avg Traffic Restored', val: '79%' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Success Rate', val: '88%' },
];

export default function GooglePandaRecoveryServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Google Panda Recovery', item: 'https://www.1solutions.biz/google-panda-recovery-services/' }] }, { '@type': 'Service', name: 'Google Panda Recovery Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Google Panda Recovery', url: 'https://www.1solutions.biz/google-panda-recovery-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  const ACC = '#0F766E'; const ACC_DARK = '#134E4A';
  return (
    <>
      <Head>
        <title>Google Panda Recovery Services | Helpful Content Penalty Recovery | 1Solutions</title>
        <meta name="description" content="Google Panda and Helpful Content Update recovery — thin content audit, E-E-A-T content rewriting, consolidation strategy, and content quality improvement to restore rankings after a Panda or HC penalty." />
        <meta name="keywords" content="google panda recovery, helpful content update recovery, thin content penalty recovery, google panda penalty fix, content quality recovery seo, helpful content penalty recovery" />
        <link rel="canonical" href="https://www.1solutions.biz/google-panda-recovery-services/" />
        <meta property="og:title" content="Google Panda Recovery Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/google-panda-recovery-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .panda-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .panda-page *,.panda-page *::before,.panda-page *::after{box-sizing:border-box}
          .panda-hero{background:linear-gradient(135deg,#f0fdfa 0%,#ccfbf1 30%,#99f6e4 65%,#f0fdfa 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .panda-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(15,118,110,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .panda-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(19,78,74,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .panda-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .panda-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .panda-bc a{color:#6b7280;text-decoration:none}.panda-bc a:hover{color:#0F766E}.panda-bc span{color:#d1d5db}
          .panda-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(15,118,110,0.08);border:1px solid rgba(15,118,110,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0F766E;margin-bottom:28px}
          .panda-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#134E4A 0%,#0F766E 50%,#0D9488 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .panda-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .panda-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .panda-btn-p{display:inline-flex;align-items:center;gap:8px;background:#0F766E;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(15,118,110,0.28)}
          .panda-btn-p:hover{background:#134E4A;box-shadow:0 8px 32px rgba(15,118,110,0.38);transform:translateY(-2px)}
          .panda-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .panda-btn-s:hover{border-color:#0F766E;color:#0F766E;transform:translateY(-2px)}
          .panda-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(15,118,110,0.07)}
          .panda-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(15,118,110,0.08)}.panda-stat:last-child{border-right:none}
          .panda-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .panda-stat-v{font-size:1.6rem;font-weight:900;color:#0F766E;letter-spacing:-0.5px}
          .panda-svc{background:#f8fafd;padding:80px 40px}.panda-svc-in{max-width:1280px;margin:0 auto}
          .panda-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0F766E;margin-bottom:10px;display:block}
          .panda-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#134E4A 0%,#0F766E 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .panda-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .panda-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .panda-card{background:linear-gradient(135deg,rgba(240,253,250,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(204,251,241,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,118,110,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease}
          .panda-card.visible{opacity:1;transform:translateY(0)}.panda-card:hover{transform:translateY(-6px);border-color:rgba(15,118,110,0.22);box-shadow:0 16px 48px rgba(15,118,110,0.09)}
          .panda-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F766E;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .panda-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .panda-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .panda-signals{background:linear-gradient(135deg,#134E4A 0%,#0F766E 100%);padding:60px 40px}
          .panda-signals-in{max-width:1280px;margin:0 auto;text-align:center}
          .panda-signals h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .panda-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .panda-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .panda-proc{background:linear-gradient(135deg,#f0fdfa 0%,#f0fdfa 50%,#ccfbf1 100%);padding:80px 40px}
          .panda-proc-in{max-width:900px;margin:0 auto}
          .panda-steps{display:flex;flex-direction:column;margin-top:44px}
          .panda-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(15,118,110,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .panda-step:last-child{border-bottom:none}.panda-step.visible{opacity:1;transform:translateX(0)}
          .panda-snum{font-size:3rem;font-weight:900;color:rgba(15,118,110,0.15);line-height:1;letter-spacing:-2px}
          .panda-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .panda-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .panda-why{background:#fff;padding:80px 40px}.panda-why-in{max-width:1280px;margin:0 auto}
          .panda-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .panda-wcard{background:linear-gradient(135deg,#f0fdfa 0%,#fff 60%,#ccfbf1 100%);border:1px solid rgba(15,118,110,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .panda-wcard.visible{opacity:1;transform:translateY(0)}.panda-wcard:hover{border-color:rgba(15,118,110,0.20);box-shadow:0 8px 32px rgba(15,118,110,0.07)}
          .panda-dot{width:8px;height:8px;border-radius:50%;background:#0F766E;margin-bottom:16px}
          .panda-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .panda-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .panda-faq{background:#f8fafd;padding:80px 40px}.panda-faq-in{max-width:860px;margin:0 auto}
          .panda-fitem{border-bottom:1px solid #e5e7eb}
          .panda-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .panda-fq:hover{color:#0F766E}
          .panda-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .panda-fitem.open .panda-ficon{border-color:#0F766E;color:#0F766E;background:rgba(15,118,110,0.06)}
          .panda-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .panda-fitem.open .panda-fa{max-height:600px;padding-bottom:22px}
          .panda-cta{background:linear-gradient(135deg,rgba(15,118,110,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(19,78,74,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .panda-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(15,118,110,0.10) 0%,transparent 70%);pointer-events:none}
          .panda-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(19,78,74,0.08) 0%,transparent 70%);pointer-events:none}
          .panda-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .panda-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#134E4A 0%,#0F766E 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .panda-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.panda-grid{grid-template-columns:repeat(2,1fr)}.panda-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.panda-hero,.panda-svc,.panda-signals,.panda-proc,.panda-why,.panda-faq,.panda-cta{padding:60px 24px}.panda-hero{padding-top:60px;padding-bottom:0}.panda-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.panda-stat:nth-child(2){border-right:none}.panda-grid{grid-template-columns:1fr}.panda-why-grid{grid-template-columns:1fr}.panda-step{grid-template-columns:56px 1fr}.panda-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="panda-page">
        <section className="panda-hero"><div className="panda-o1"/><div className="panda-o2"/>
          <div className="panda-in">
            <nav className="panda-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO</Link><span>/</span><Link href="/google-penalty-recovery-services">Penalty Recovery</Link><span>/</span><span style={{color:'#0F766E'}}>Panda Recovery</span></nav>
            <span className="panda-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#0F766E',display:'inline-block'}}/> Thin Content · Helpful Content Update · E-E-A-T</span>
            <h1 className="panda-h1">Google Panda Recovery Services — Fix Thin Content &amp; Restore Lost Rankings</h1>
            <p className="panda-sub">Specialist Google Panda and Helpful Content Update recovery — content quality audits, E-E-A-T content rewriting, consolidation strategy, and thin content removal to recover your organic traffic after a content quality penalty.</p>
            <div className="panda-btns">
              <Link href="/contact" className="panda-btn-p">Get a Free Content Quality Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/google-penalty-recovery-services" className="panda-btn-s">All Penalty Recovery Services</Link>
            </div>
            <div className="panda-stats">{STATS.map(s => <div key={s.label} className="panda-stat"><div className="panda-stat-l">{s.label}</div><div className="panda-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="panda-svc"><div className="panda-svc-in">
          <span className="panda-ey2">What We Do</span><h2 className="panda-ttl">Google Panda &amp; Helpful Content Recovery Services</h2>
          <p className="panda-desc">From content audit to E-E-A-T rewriting — a complete Panda and Helpful Content recovery service targeting every content quality signal Google uses to rank or suppress your site.</p>
          <div className="panda-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`panda-card${visibleCards.includes(i)?' visible':''}`}><div className="panda-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="panda-signals"><div className="panda-signals-in"><h2>Content Quality Issues We Recover From</h2><div className="panda-pills">{SIGNALS.map(p => <span key={p} className="panda-pill">{p}</span>)}</div></div></section>
        <section className="panda-proc"><div className="panda-proc-in">
          <span className="panda-ey2">Our Approach</span><h2 className="panda-ttl">Google Panda Recovery Process</h2>
          <p className="panda-desc">Audit-first, quality-first — every recovery decision is based on data, not guesswork.</p>
          <div className="panda-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`panda-step${visibleSteps.includes(i)?' visible':''}`}><div className="panda-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="panda-why"><div className="panda-why-in">
          <span className="panda-ey2">Why 1Solutions</span><h2 className="panda-ttl">Content Quality Experts — Not Just Technical SEOs</h2>
          <p className="panda-desc">Panda recovery requires genuine content improvement — not just technical fixes. We combine SEO expertise with real content creation capability.</p>
          <div className="panda-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`panda-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="panda-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="panda-faq"><div className="panda-faq-in">
          <span className="panda-ey2">Got Questions?</span><h2 className="panda-ttl">Google Panda &amp; Helpful Content FAQs</h2>
          <p className="panda-desc" style={{marginBottom:44}}>Everything you need to know about Panda penalties, Helpful Content Updates, and how we recover from them.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`panda-fitem${openFaq===i?' open':''}`}><button className="panda-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="panda-ficon">{openFaq===i?'−':'+'}</span></button><div className="panda-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="panda-cta"><div className="panda-cta-o1"/><div className="panda-cta-o2"/>
          <div className="panda-cta-in">
            <span className="panda-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Suffering from thin content or Helpful Content rankings drop?</span>
            <h2 className="panda-cta-t">Get a Free Content Quality Diagnosis</h2>
            <p className="panda-cta-s">Share your domain and traffic drop date — we&rsquo;ll identify exactly which Panda or Helpful Content Update hit you, audit your content quality, and outline a recovery plan.</p>
            <div className="panda-btns">
              <Link href="/contact" className="panda-btn-p">Request a Free Content Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/content-copywriting-services" className="panda-btn-s">Content Writing Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
