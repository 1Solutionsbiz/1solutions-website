import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Penalty Diagnosis & Root Cause Analysis', desc: 'Identify whether you have a manual action (reported in Google Search Console) or an algorithmic penalty (traffic drop correlated with a confirmed Google update) — and pinpoint the exact cause before any recovery work begins.' },
  { n: '02', title: 'Google Search Console Audit', desc: 'Full GSC audit — manual action messages, coverage errors, security issues, Core Web Vitals failures, and any structured data issues that may be contributing to reduced search visibility.' },
  { n: '03', title: 'Toxic Backlink Audit & Disavow', desc: 'Comprehensive backlink profile analysis using Ahrefs, Semrush, and Google Search Console — identifying toxic, spammy, and unnatural links, removing what can be removed, and preparing a Google Disavow file.' },
  { n: '04', title: 'Thin & Duplicate Content Audit', desc: 'Site-wide content audit for thin pages, near-duplicate content, scraped content, keyword stuffing, and auto-generated pages — identifying and remediating the content quality issues that trigger algorithmic penalties.' },
  { n: '05', title: 'Manual Action Reconsideration Request', desc: 'Preparation of a detailed, evidence-backed Reconsideration Request for Google — documenting all remediation steps taken, providing evidence of compliance, and presenting the strongest possible case for penalty removal.' },
  { n: '06', title: 'Technical SEO Remediation', desc: 'Fixing the technical issues that often accompany or contribute to penalties: crawl errors, redirect chains, hreflang errors, Core Web Vitals failures, cloaking, and hidden text — issues that can delay recovery if left unaddressed.' },
  { n: '07', title: 'Content Quality Improvement', desc: 'Rewriting or removing thin, low-quality, and over-optimised content — replacing it with authoritative, expert content that meets Google\'s E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) standards.' },
  { n: '08', title: 'Recovery Monitoring & Reporting', desc: 'Post-remediation monitoring — tracking ranking recovery, organic traffic trends, GSC coverage improvements, and index status — with regular progress reports until full recovery is confirmed.' },
];

const PENALTIES = ['Manual Actions', 'Panda / Helpful Content', 'Penguin / Link Spam', 'Core Algorithm Updates', 'Product Reviews Update', 'Spam Policies', 'Thin Content', 'Cloaking / Sneaky Redirects', 'Structured Data Abuse'];

const PROCESS = [
  { step: '01', title: 'Traffic Drop Analysis', desc: 'Map your organic traffic drop against Google update dates — confirming whether the issue is a manual action, algorithmic penalty, or technical de-indexation.' },
  { step: '02', title: 'Full Site Audit', desc: 'Technical SEO, content quality, backlink profile, and GSC data — a complete picture of everything that could be causing or prolonging the penalty.' },
  { step: '03', title: 'Remediation Plan', desc: 'A prioritised, documented remediation plan — what to fix first, what to remove, what to disavow, and what content to improve — agreed with you before work begins.' },
  { step: '04', title: 'Implementation', desc: 'Technical fixes, content improvements, toxic link removal, and disavow file submission — executed methodically with change documentation at every step.' },
  { step: '05', title: 'Reconsideration Request (Manual Only)', desc: 'For manual actions: preparation and submission of a detailed Reconsideration Request to Google — documenting every remediation step with evidence.' },
  { step: '06', title: 'Recovery Monitoring', desc: 'Ongoing monitoring of rankings, traffic, and GSC data — tracking the recovery curve and identifying any residual issues requiring further action.' },
];

const WHY = [
  { title: 'Penalty Type Expertise', desc: 'Manual actions and algorithmic penalties require completely different approaches. We correctly diagnose which type you have before any work begins — because treating a Helpful Content penalty as a link issue (or vice versa) wastes months and delays recovery.' },
  { title: 'Documented Remediation', desc: 'Every action taken is documented — URLs changed, content removed, links disavowed, technical fixes implemented. This documentation is essential for a successful Reconsideration Request and for proving compliance to Google.' },
  { title: 'Realistic Recovery Timelines', desc: 'We set honest expectations. Manual action recovery after a successful Reconsideration Request typically takes 2 to 6 weeks. Algorithmic recovery follows the next algorithm refresh cycle — which can be weeks or months. We will not promise unrealistic timelines.' },
  { title: 'E-E-A-T Content Rebuilding', desc: 'Most algorithm penalties are about content quality. Recovery requires more than deleting thin pages — it requires rebuilding content that demonstrates genuine expertise, experience, and trustworthiness. We build the content strategy to sustain recovery long-term.' },
  { title: 'Disavow File Expertise', desc: 'An incorrect disavow file can disavow good links and leave toxic ones untouched — making things worse. Our disavow methodology is careful and conservative, targeting only clearly manipulative links while preserving legitimate backlinks.' },
  { title: 'Post-Recovery SEO Strategy', desc: 'Recovery is not the end goal — it is the start of rebuilding. Once penalties are resolved, we work with you on a clean, sustainable SEO strategy that rebuilds rankings without the practices that caused the original penalty.' },
];

const FAQS = [
  { q: 'How do I know if my site has a Google penalty?', a: 'There are two types of Google penalties with different symptoms. Manual actions appear in Google Search Console under Security & Manual Actions — they are explicit messages from Google explaining what rule was violated. Algorithmic penalties show no message — instead you see a significant, sudden drop in organic traffic (often 20 to 60% or more) that correlates with a confirmed Google algorithm update date. Tools like Semrush, Ahrefs, and Google\'s own update history can help correlate traffic drops with specific updates. If your traffic dropped suddenly and you see a message in GSC, it is a manual action. If traffic dropped around an algorithm update date with no message, it is likely algorithmic.' },
  { q: 'What is the difference between a manual action and an algorithmic penalty?', a: 'A manual action is a human decision by a Google Search Quality Reviewer who has reviewed your site and found a deliberate violation of Google\'s spam policies — unnatural links, thin content, cloaking, hidden text, or structured data abuse. It appears as a notification in Google Search Console and can be resolved through a Reconsideration Request after fixing the issues. An algorithmic penalty is not a deliberate action by Google staff — it is your site being re-evaluated by an algorithm update (Panda, Penguin, Helpful Content, etc.) and found to be lower quality than previously ranked. Recovery requires substantive quality improvements and then waiting for the next algorithm refresh to reprocess your site.' },
  { q: 'How long does Google penalty recovery take?', a: 'Recovery timelines depend on penalty type and severity: Manual action recovery: After you fix the issues and submit a Reconsideration Request, Google typically responds within 2 to 6 weeks. If the request is denied (insufficient remediation), the process restarts. Algorithmic recovery: After fixing the underlying issues, you must wait for the next algorithm refresh cycle. Major algorithm updates (Core, Helpful Content) run on irregular schedules — typically every 2 to 6 months. Recovery can therefore take 3 to 9 months from the point remediation is complete, depending on when the next refresh runs. During the waiting period, organic traffic remains suppressed even if all issues are fixed.' },
  { q: 'Can all Google penalties be recovered from?', a: 'Most penalties can be recovered from if the root causes are genuinely fixed. However, some situations make full recovery very difficult: sites that were built primarily on manipulative link schemes with limited legitimate authority; sites with extensive thin, AI-generated, or plagiarised content across thousands of pages; sites that have repeatedly violated Google\'s policies after previous recoveries; and very old domains that have accumulated years of poor quality signals. In these cases, recovery may be partial — restoring some traffic but not pre-penalty levels. We assess recovery potential honestly during our initial audit and will not take on cases where we believe full recovery is unlikely without being transparent about it.' },
  { q: 'What is a Reconsideration Request?', a: 'A Reconsideration Request is a formal submission to Google via Search Console asking them to review your site after you have fixed a manual action. An effective Reconsideration Request: acknowledges the specific policy violation identified; documents every remediation action taken (with evidence — screenshots, change logs, disavow file); explains why the issue will not recur; and demonstrates a commitment to Google\'s quality guidelines. Poorly written Reconsideration Requests that do not address the root cause, lack evidence, or are submitted before remediation is complete are routinely denied. We write and submit Reconsideration Requests as part of our penalty recovery service.' },
  { q: 'What is a disavow file and when should I use one?', a: 'A disavow file is a text file submitted to Google via Search Console that instructs Google to ignore specific backlinks when assessing your site. You should use a disavow file when: you have received a manual action for unnatural links; you have a significant volume of clearly toxic or spammy backlinks (from link farms, PBNs, or purchased link schemes) that you cannot have removed manually; or after a Penguin algorithm penalty where your backlink profile is clearly a contributing factor. Disavow files should be used cautiously — disavowing legitimate backlinks can harm your rankings. We conduct a careful audit before preparing any disavow file and only include links where the harm is clear.' },
  { q: 'My traffic dropped — is it definitely a penalty?', a: 'Not necessarily. Traffic drops can be caused by many things that are not penalties: algorithm updates that simply redistributed rankings without penalising your site; seasonal fluctuations in search demand; a competitor significantly improving their content or acquiring strong backlinks; technical issues (crawl errors, accidental noindex tags, broken hreflang, robots.txt blocking); changes to Google Search Console data sampling; or your own site changes (redirects, URL changes, content removal). Part of our penalty diagnosis service is determining whether you have an actual penalty or another type of ranking issue — because the fix for each is completely different.' },
  { q: 'Do you guarantee Google penalty recovery?', a: 'No — and you should be very cautious of any agency that does. Google penalty recovery depends on factors outside any agency\'s control: the specific nature and severity of the penalty; Google\'s response to a Reconsideration Request (for manual actions); and when Google\'s next algorithm refresh runs (for algorithmic penalties). What we guarantee is a thorough, evidence-backed remediation process — identifying the root causes correctly, fixing them completely, documenting everything professionally, and monitoring recovery diligently. Our track record of successful penalty recoveries is strong, but honest timelines and realistic expectations are more valuable than guarantees we cannot keep.' },
];

const STATS = [
  { label: 'Penalties Recovered', val: '200+' },
  { label: 'Avg Traffic Restored', val: '84%' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Success Rate', val: '91%' },
];

export default function GooglePenaltyRecoveryServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Google Penalty Recovery', item: 'https://www.1solutions.biz/google-penalty-recovery-services/' }] }, { '@type': 'Service', name: 'Google Penalty Recovery Services', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Google Penalty Recovery', url: 'https://www.1solutions.biz/google-penalty-recovery-services/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Google Penalty Recovery Services | Manual Action & Algorithm Recovery | 1Solutions</title>
        <meta name="description" content="Google penalty recovery services for manual actions and algorithmic penalties. Toxic backlink audit, disavow file preparation, Reconsideration Request writing, and content quality remediation." />
        <meta name="keywords" content="google penalty recovery services, google manual action recovery, google algorithmic penalty recovery, disavow file service, reconsideration request, google penalty removal" />
        <link rel="canonical" href="https://www.1solutions.biz/google-penalty-recovery-services/" />
        <meta property="og:title" content="Google Penalty Recovery Services | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/google-penalty-recovery-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .gpr-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .gpr-page *,.gpr-page *::before,.gpr-page *::after{box-sizing:border-box}
          .gpr-hero{background:linear-gradient(135deg,#fff5f5 0%,#fee2e2 30%,#fecaca 65%,#fff5f5 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .gpr-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(220,38,38,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .gpr-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(127,29,29,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .gpr-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .gpr-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .gpr-bc a{color:#6b7280;text-decoration:none}.gpr-bc a:hover{color:#DC2626}.gpr-bc span{color:#d1d5db}
          .gpr-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#DC2626;margin-bottom:28px}
          .gpr-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#7F1D1D 0%,#DC2626 50%,#B91C1C 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .gpr-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .gpr-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .gpr-btn-p{display:inline-flex;align-items:center;gap:8px;background:#DC2626;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(220,38,38,0.28)}
          .gpr-btn-p:hover{background:#7F1D1D;box-shadow:0 8px 32px rgba(220,38,38,0.38);transform:translateY(-2px)}
          .gpr-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .gpr-btn-s:hover{border-color:#DC2626;color:#DC2626;transform:translateY(-2px)}
          .gpr-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(220,38,38,0.07)}
          .gpr-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(220,38,38,0.08)}.gpr-stat:last-child{border-right:none}
          .gpr-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .gpr-stat-v{font-size:1.6rem;font-weight:900;color:#DC2626;letter-spacing:-0.5px}
          .gpr-svc{background:#f8fafd;padding:80px 40px}.gpr-svc-in{max-width:1280px;margin:0 auto}
          .gpr-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#DC2626;margin-bottom:10px;display:block}
          .gpr-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#7F1D1D 0%,#DC2626 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .gpr-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .gpr-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .gpr-card{background:linear-gradient(135deg,rgba(255,245,245,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(254,226,226,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(220,38,38,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease}
          .gpr-card.visible{opacity:1;transform:translateY(0)}.gpr-card:hover{transform:translateY(-6px);border-color:rgba(220,38,38,0.22);box-shadow:0 16px 48px rgba(220,38,38,0.09)}
          .gpr-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#DC2626;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .gpr-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .gpr-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .gpr-types{background:linear-gradient(135deg,#7F1D1D 0%,#DC2626 100%);padding:60px 40px}
          .gpr-types-in{max-width:1280px;margin:0 auto;text-align:center}
          .gpr-types h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .gpr-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .gpr-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .gpr-proc{background:linear-gradient(135deg,#fff5f5 0%,#fff5f5 50%,#fee2e2 100%);padding:80px 40px}
          .gpr-proc-in{max-width:900px;margin:0 auto}
          .gpr-steps{display:flex;flex-direction:column;margin-top:44px}
          .gpr-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(220,38,38,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .gpr-step:last-child{border-bottom:none}.gpr-step.visible{opacity:1;transform:translateX(0)}
          .gpr-snum{font-size:3rem;font-weight:900;color:rgba(220,38,38,0.15);line-height:1;letter-spacing:-2px}
          .gpr-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .gpr-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .gpr-why{background:#fff;padding:80px 40px}.gpr-why-in{max-width:1280px;margin:0 auto}
          .gpr-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .gpr-wcard{background:linear-gradient(135deg,#fff5f5 0%,#fff 60%,#fee2e2 100%);border:1px solid rgba(220,38,38,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .gpr-wcard.visible{opacity:1;transform:translateY(0)}.gpr-wcard:hover{border-color:rgba(220,38,38,0.20);box-shadow:0 8px 32px rgba(220,38,38,0.07)}
          .gpr-dot{width:8px;height:8px;border-radius:50%;background:#DC2626;margin-bottom:16px}
          .gpr-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .gpr-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .gpr-faq{background:#f8fafd;padding:80px 40px}.gpr-faq-in{max-width:860px;margin:0 auto}
          .gpr-fitem{border-bottom:1px solid #e5e7eb}
          .gpr-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .gpr-fq:hover{color:#DC2626}
          .gpr-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .gpr-fitem.open .gpr-ficon{border-color:#DC2626;color:#DC2626;background:rgba(220,38,38,0.06)}
          .gpr-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .gpr-fitem.open .gpr-fa{max-height:600px;padding-bottom:22px}
          .gpr-cta{background:linear-gradient(135deg,rgba(220,38,38,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(127,29,29,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .gpr-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(220,38,38,0.10) 0%,transparent 70%);pointer-events:none}
          .gpr-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(127,29,29,0.08) 0%,transparent 70%);pointer-events:none}
          .gpr-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .gpr-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#7F1D1D 0%,#DC2626 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .gpr-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.gpr-grid{grid-template-columns:repeat(2,1fr)}.gpr-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.gpr-hero,.gpr-svc,.gpr-types,.gpr-proc,.gpr-why,.gpr-faq,.gpr-cta{padding:60px 24px}.gpr-hero{padding-top:60px;padding-bottom:0}.gpr-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.gpr-stat:nth-child(2){border-right:none}.gpr-grid{grid-template-columns:1fr}.gpr-why-grid{grid-template-columns:1fr}.gpr-step{grid-template-columns:56px 1fr}.gpr-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="gpr-page">
        <section className="gpr-hero"><div className="gpr-o1"/><div className="gpr-o2"/>
          <div className="gpr-in">
            <nav className="gpr-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO</Link><span>/</span><span style={{color:'#DC2626'}}>Google Penalty Recovery</span></nav>
            <span className="gpr-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#DC2626',display:'inline-block'}}/> Manual Actions · Algorithmic Penalties · Disavow</span>
            <h1 className="gpr-h1">Google Penalty Recovery Services — Diagnose, Fix & Restore Lost Rankings</h1>
            <p className="gpr-sub">Expert Google penalty recovery for manual actions and algorithmic penalties — toxic backlink audits, disavow file preparation, Reconsideration Requests, and content quality remediation to restore your organic traffic.</p>
            <div className="gpr-btns">
              <Link href="/contact" className="gpr-btn-p">Get an Emergency Penalty Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-audit-services" className="gpr-btn-s">SEO Audit Services</Link>
            </div>
            <div className="gpr-stats">{STATS.map(s => <div key={s.label} className="gpr-stat"><div className="gpr-stat-l">{s.label}</div><div className="gpr-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="gpr-svc"><div className="gpr-svc-in">
          <span className="gpr-ey2">What We Do</span><h2 className="gpr-ttl">Google Penalty Recovery Services</h2>
          <p className="gpr-desc">From diagnosis to Reconsideration Request — a complete penalty recovery service covering every type of Google manual action and algorithmic penalty.</p>
          <div className="gpr-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`gpr-card${visibleCards.includes(i)?' visible':''}`}><div className="gpr-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="gpr-types"><div className="gpr-types-in"><h2>Penalty Types We Recover From</h2><div className="gpr-pills">{PENALTIES.map(p => <span key={p} className="gpr-pill">{p}</span>)}</div></div></section>
        <section className="gpr-proc"><div className="gpr-proc-in">
          <span className="gpr-ey2">Our Approach</span><h2 className="gpr-ttl">Google Penalty Recovery Process</h2>
          <p className="gpr-desc">Diagnosis before treatment — we identify the correct penalty type and root cause before any remediation work begins.</p>
          <div className="gpr-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`gpr-step${visibleSteps.includes(i)?' visible':''}`}><div className="gpr-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="gpr-why"><div className="gpr-why-in">
          <span className="gpr-ey2">Why 1Solutions</span><h2 className="gpr-ttl">Honest Assessment, Documented Recovery, Long-Term Rebuilding</h2>
          <p className="gpr-desc">We treat every penalty case with the rigour it requires — correct diagnosis, complete documentation, and honest timelines. No guarantees we can not keep.</p>
          <div className="gpr-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`gpr-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="gpr-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="gpr-faq"><div className="gpr-faq-in">
          <span className="gpr-ey2">Got Questions?</span><h2 className="gpr-ttl">Google Penalty Recovery FAQs</h2>
          <p className="gpr-desc" style={{marginBottom:44}}>Everything you need to know about Google penalties, recovery timelines, and our process.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`gpr-fitem${openFaq===i?' open':''}`}><button className="gpr-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="gpr-ficon">{openFaq===i?'−':'+'}</span></button><div className="gpr-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="gpr-cta"><div className="gpr-cta-o1"/><div className="gpr-cta-o2"/>
          <div className="gpr-cta-in">
            <span className="gpr-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Lost rankings after a Google update or manual action?</span>
            <h2 className="gpr-cta-t">Get a Free Penalty Diagnosis</h2>
            <p className="gpr-cta-s">Share your domain and the date your traffic dropped — we&rsquo;ll diagnose the penalty type, identify the root cause, and outline a recovery plan within 48 hours.</p>
            <div className="gpr-btns">
              <Link href="/contact" className="gpr-btn-p">Request a Free Penalty Diagnosis <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/seo-audit-services" className="gpr-btn-s">SEO Audit Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
