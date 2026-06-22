import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Penguin Penalty Diagnosis', desc: 'Correlate your traffic drop with confirmed Google Penguin and Link Spam Update dates — confirming whether your site was impacted and whether the cause is inbound links, outbound link patterns, or anchor text manipulation.' },
  { n: '02', title: 'Full Backlink Audit', desc: 'Comprehensive backlink analysis using Ahrefs, Semrush, Majestic, and Google Search Console — identifying every toxic, spammy, and unnatural link in your profile: link farms, PBNs, link exchanges, paid links, and over-optimised anchors.' },
  { n: '03', title: 'Toxic Link Categorisation', desc: 'Categorising each suspicious link by risk level — high risk (almost certainly harmful), medium risk (investigate), low risk (probably safe to keep) — providing the data needed for a targeted, conservative disavow approach.' },
  { n: '04', title: 'Link Removal Outreach', desc: 'Contacting webmasters of toxic linking sites requesting link removal — documenting every outreach attempt (required for Reconsideration Requests) — maximising genuine removals before falling back to disavow.' },
  { n: '05', title: 'Google Disavow File Preparation', desc: 'Preparing a precise, evidence-based Google Disavow file — targeting clearly manipulative links while preserving legitimate backlinks. Over-disavowing good links is a common mistake we actively guard against.' },
  { n: '06', title: 'Anchor Text Profile Normalisation', desc: 'Identifying and disavowing links with unnatural, over-optimised anchor text — exact-match keyword anchors in volumes that signal a link scheme to Google\'s algorithm, even if the linking sites appear legitimate.' },
  { n: '07', title: 'Reconsideration Request (Manual Penguin)', desc: 'For manual unnatural links actions: preparing and submitting a detailed Reconsideration Request to Google — with full documentation of outreach attempts, links removed, and disavow file submitted.' },
  { n: '08', title: 'Clean Link Building Post-Recovery', desc: 'After Penguin recovery, building a clean, authoritative backlink profile through editorial content, digital PR, and genuine outreach — replacing toxic link volume with quality links that sustainably improve rankings.' },
];

const LINK_TYPES = ['Link Farms', 'Private Blog Networks', 'Paid Links', 'Link Exchanges', 'Forum Spam Links', 'Directory Spam', 'Over-Optimised Anchors', 'Sitewide Footer Links', 'Negative SEO Links', 'Comment Spam'];

const PROCESS = [
  { step: '01', title: 'Traffic Drop & Update Correlation', desc: 'Map your organic traffic history against Penguin and Link Spam Update dates — confirming the specific update that impacted your site and the scale of the ranking suppression.' },
  { step: '02', title: 'Full Backlink Profile Audit', desc: 'Pull your complete backlink profile from multiple data sources — GSC, Ahrefs, Semrush, Majestic — and assess each link type, domain quality, and anchor text pattern.' },
  { step: '03', title: 'Toxic Link Triage', desc: 'Categorise every suspicious link by risk level — high, medium, low — and produce a prioritised list for removal outreach and disavow consideration.' },
  { step: '04', title: 'Link Removal Outreach', desc: 'Contact webmaster of toxic sites requesting removal — documenting every attempt, response, and outcome for potential Reconsideration Request documentation.' },
  { step: '05', title: 'Disavow File Submission', desc: 'Prepare and submit the disavow file to Google Search Console — covering all high-risk links that could not be removed through outreach.' },
  { step: '06', title: 'Monitoring & Clean Link Building', desc: 'Monitor ranking recovery through the next algorithm refresh, and begin building a clean, high-quality backlink profile to replace the disavowed links.' },
];

const WHY = [
  { title: 'Integrated Penguin Algorithm Expertise', desc: 'Since Google Penguin 4.0 (2016), Penguin runs in real-time and devalues toxic links rather than penalising the whole site. However, the Link Spam Update (2021, 2022) re-introduced site-wide ranking suppression for manipulative link patterns. We understand the differences and apply the right recovery approach for the current algorithm.' },
  { title: 'Conservative Disavow Philosophy', desc: 'Over-disavowing is a serious risk — removing legitimate backlinks can harm rankings significantly. We only disavow links with clear evidence of manipulative intent. Every link in our disavow files is documented with the specific reason for inclusion.' },
  { title: 'Multi-Source Backlink Data', desc: 'No single tool has complete backlink data. We pull backlink profiles from Ahrefs, Semrush, Majestic, and Google Search Console — cross-referencing to ensure we find every toxic link, not just the ones one tool has indexed.' },
  { title: 'Documented Outreach Evidence', desc: 'Reconsideration Requests require evidence that you attempted to have toxic links removed before disavowing. Our outreach documentation process creates a clear audit trail — domain, contact date, response (or non-response), and follow-up — that strengthens Reconsideration Requests.' },
  { title: 'Negative SEO Defence', desc: 'Sometimes toxic links were placed by competitors trying to harm your rankings — known as negative SEO. We identify patterns that suggest deliberate negative SEO (sudden bursts of low-quality links from identical sources) and disavow defensively before they can cause damage.' },
  { title: 'Post-Recovery Link Building Strategy', desc: 'Recovering from Penguin leaves a depleted backlink profile. We do not just remove bad links — we build a clean, sustainable replacement strategy through editorial link building, digital PR, and genuine outreach that builds long-term authority.' },
];

const FAQS = [
  { q: 'What is Google Penguin and how does it work?', a: 'Google Penguin was launched in April 2012 to target websites that were gaming Google\'s ranking algorithm by building large volumes of low-quality, spammy, or paid backlinks. Penguin devalues backlinks that appear manipulative — from link farms, private blog networks, paid link schemes, link exchanges, and directories created solely for link passing. Since Penguin 4.0 (September 2016), the algorithm runs in real-time as part of Google\'s core algorithm — meaning it continuously evaluates your backlink profile rather than applying a periodic refresh. The Link Spam Update (released in 2021 and updated in 2022) extended Penguin-style link spam detection with improved ML-based link quality assessment. Most Penguin-related penalties today are either manual actions ("Unnatural links to your site") shown in Google Search Console, or algorithmic suppressions from Link Spam Updates.' },
  { q: 'How do I know if I have a Penguin penalty?', a: 'A Penguin or link spam penalty shows itself in two ways. Manual action: You will see a notification in Google Search Console under Manual Actions saying "Unnatural links to your site" or "Unnatural links from your site." This is a deliberate human reviewer decision and requires a Reconsideration Request after link removal and disavow. Algorithmic suppression: No message in GSC, but a significant, sudden organic traffic drop that correlates with a confirmed Penguin or Link Spam Update date. If your backlink profile analysis shows a large proportion of links from link farms, PBNs, exact-match anchor text schemes, or low-quality directories, this strongly suggests an algorithmic Penguin issue. Using Ahrefs, Semrush, or Google Search Console to review your backlink profile, anchor text distribution, and referring domain quality is the first diagnostic step.' },
  { q: 'What makes a backlink "toxic" to Google?', a: 'Google considers backlinks toxic when they are clearly intended to manipulate rankings rather than represent genuine editorial endorsements. The main categories of toxic links are: link farms — sites that exist solely to sell or exchange links with no genuine content or audience; private blog networks (PBNs) — groups of websites controlled by one entity, used to pass link juice to target sites; paid links — links bought or exchanged for money, products, or services without a "nofollow" or "sponsored" attribute; keyword-stuffed anchor text — links where the anchor text is heavily over-optimised with exact-match commercial keywords at unnatural scale; sitewide footer or sidebar links — links in templates that appear on every page of a site; link exchanges — reciprocal link schemes where two sites agree to link to each other primarily for ranking benefit; comment spam — links placed in blog comments or forum signatures at scale; and low-quality directory links — bulk submissions to directories that exist primarily as link destinations, not genuine resources.' },
  { q: 'Since Penguin 4.0 is real-time, do I still need to worry about toxic links?', a: 'Yes. Penguin 4.0 devalues (rather than penalises) most toxic links in real-time — meaning Google ignores them rather than using them as a negative signal. However: Manual actions for unnatural links are still issued by human reviewers and are not covered by Penguin 4.0\'s real-time processing — they still require outreach, disavow, and a Reconsideration Request. The Link Spam Update (2021, 2022) uses different ML-based detection that can still suppress entire sites for systematic link manipulation, even without a manual action. Very large volumes of toxic links may not be fully neutralised by Penguin 4.0\'s devaluation — a pattern of thousands of clearly manipulative links can still act as a negative trust signal. And toxic links may be suppressing your rankings even if they are not creating an active "penalty" — removing or disavowing them can allow suppressed authority to recover.' },
  { q: 'Can a competitor hurt my rankings by building bad links to my site?', a: 'Yes. This is called negative SEO — a competitor (or a malicious actor) deliberately builds toxic backlinks pointing to your site to trigger a Penguin or Link Spam penalty. Negative SEO attacks typically involve: sudden large volumes of links from link farms, adult sites, or gambling sites; repetitive exact-match anchor text across hundreds of new referring domains; and patterns of link acquisition that look like a deliberate scheme. The best defence against negative SEO is: monitoring your backlink profile regularly (weekly Ahrefs or GSC alerts); proactively disavowing suspicious new link clusters before they accumulate; and submitting a defensive disavow file even before a penalty occurs. If you suspect negative SEO, we can audit your backlink profile and implement a defensive disavow strategy.' },
  { q: 'How long does Penguin recovery take?', a: 'Recovery timelines vary by penalty type. Manual action (unnatural links): After outreach, disavow, and Reconsideration Request submission, Google typically responds within 2 to 6 weeks. If approved, rankings begin recovering within days. If denied, the process restarts. Algorithmic Penguin suppression: Since Penguin 4.0 runs in real-time, rankings can recover as soon as Google re-crawls and re-evaluates the links in your disavow file. In practice, this means ranking recovery can begin within 1 to 4 weeks of disavow submission for sites where Penguin 4.0 is the primary issue. Link Spam Update suppression: These tend to follow core update cycles and may require waiting for the next major update refresh — typically every 2 to 4 months — after disavow submission for full recovery to be visible.' },
  { q: 'Should I disavow all low-quality links?', a: 'No. Disavowing is not a general tidying exercise — it is a targeted action for links that are causing or likely to cause ranking harm. You should only disavow links that are: clearly from manipulative link schemes (link farms, PBNs, paid link networks); part of a pattern of over-optimised anchor text that signals a link scheme; creating a manual action for unnatural links; or part of a suspected negative SEO attack. You should NOT disavow: low-authority links from real websites (even if the DA is low); links from niche blogs or small publications with genuine audiences; older links from legitimate directories; or any link where there is genuine editorial intent. Aggressive disavowing of legitimate links removes real ranking authority from your site and can cause significant ranking drops.' },
  { q: 'What is a link removal outreach campaign?', a: 'Link removal outreach involves contacting the webmasters of toxic linking sites and requesting removal of the specific link pointing to your site. This is considered best practice before disavowing because: for manual action Reconsideration Requests, Google expects evidence that you attempted removal before resorting to disavow; removal is sometimes successful (particularly for lower-volume link farms that respond to legal-sounding removal requests); and it demonstrates genuine remediation effort to Google. In practice, response rates to link removal outreach are often low (10 to 30%) and many webmaster emails are unresponsive or bounce. This is why disavow is the primary recovery mechanism — but outreach should be documented and attempted first for manual action cases.' },
];

const STATS = [
  { label: 'Penguin Recoveries', val: '180+' },
  { label: 'Toxic Links Disavowed', val: '500K+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Recovery Success Rate', val: '90%' },
];

export default function PenguinRecoveryService() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const cardsRef = useRef(null); const stepRefs = useRef([]); const whyRef = useRef(null);
  useEffect(() => { if (!cardsRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(cardsRef.current); return () => o.disconnect(); }, []);
  useEffect(() => { const obs = stepRefs.current.map((el, i) => { if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120); o.disconnect(); } }, { threshold: 0.2 }); o.observe(el); return o; }); return () => obs.forEach(o => o && o.disconnect()); }, []);
  useEffect(() => { if (!whyRef.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90)); o.disconnect(); } }, { threshold: 0.1 }); o.observe(whyRef.current); return () => o.disconnect(); }, []);
  const jsonLd = { '@context': 'https://schema.org', '@graph': [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' }, { '@type': 'ListItem', position: 3, name: 'Penalty Recovery', item: 'https://www.1solutions.biz/google-penalty-recovery-services/' }, { '@type': 'ListItem', position: 4, name: 'Penguin Recovery', item: 'https://www.1solutions.biz/penguin-recovery-service/' }] }, { '@type': 'Service', name: 'Google Penguin Recovery Service', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, serviceType: 'Penguin Recovery', url: 'https://www.1solutions.biz/penguin-recovery-service/' }, { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (
    <>
      <Head>
        <title>Google Penguin Recovery Service | Toxic Link Audit & Disavow | 1Solutions</title>
        <meta name="description" content="Google Penguin recovery service — toxic backlink audit, link removal outreach, disavow file preparation, and clean link building after a Penguin or Link Spam Update penalty." />
        <meta name="keywords" content="google penguin recovery, penguin penalty recovery, toxic backlink audit, disavow file service, link spam update recovery, unnatural links recovery, penguin recovery service" />
        <link rel="canonical" href="https://www.1solutions.biz/penguin-recovery-service/" />
        <meta property="og:title" content="Google Penguin Recovery Service | 1Solutions" />
        <meta property="og:url" content="https://www.1solutions.biz/penguin-recovery-service/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          .peng-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:#0F1F40;line-height:1.6;overflow-x:hidden}
          .peng-page *,.peng-page *::before,.peng-page *::after{box-sizing:border-box}
          .peng-hero{background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 30%,#bfdbfe 65%,#eff6ff 100%);position:relative;overflow:hidden;padding:80px 40px 0}
          .peng-o1{position:absolute;top:-100px;right:-100px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .peng-o2{position:absolute;bottom:0;left:-80px;width:440px;height:440px;border-radius:50%;background:radial-gradient(circle,rgba(30,58,138,0.07) 0%,transparent 65%);pointer-events:none;filter:blur(30px)}
          .peng-in{max-width:1280px;margin:0 auto;position:relative;z-index:2;text-align:center}
          .peng-bc{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500}
          .peng-bc a{color:#6b7280;text-decoration:none}.peng-bc a:hover{color:#2563EB}.peng-bc span{color:#d1d5db}
          .peng-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.20);border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#2563EB;margin-bottom:28px}
          .peng-h1{font-size:clamp(2.2rem,5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-1px;background:linear-gradient(90deg,#1E3A8A 0%,#2563EB 50%,#1D4ED8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:20px;max-width:900px;margin-left:auto;margin-right:auto}
          .peng-sub{font-size:1.08rem;color:#4A6080;line-height:1.75;max-width:660px;margin:0 auto 36px}
          .peng-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:56px}
          .peng-btn-p{display:inline-flex;align-items:center;gap:8px;background:#2563EB;color:#fff;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s;box-shadow:0 4px 20px rgba(37,99,235,0.28)}
          .peng-btn-p:hover{background:#1E3A8A;box-shadow:0 8px 32px rgba(37,99,235,0.38);transform:translateY(-2px)}
          .peng-btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.65);backdrop-filter:blur(12px);border:1.5px solid rgba(15,52,96,0.18);color:#0F3460;padding:14px 30px;border-radius:50px;font-weight:700;font-size:0.95rem;text-decoration:none;transition:all 0.25s}
          .peng-btn-s:hover{border-color:#2563EB;color:#2563EB;transform:translateY(-2px)}
          .peng-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.55);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(37,99,235,0.07)}
          .peng-stat{padding:20px 24px;text-align:center;border-right:1px solid rgba(37,99,235,0.08)}.peng-stat:last-child{border-right:none}
          .peng-stat-l{font-size:11px;color:#6b7280;font-weight:500;margin-bottom:4px}
          .peng-stat-v{font-size:1.6rem;font-weight:900;color:#2563EB;letter-spacing:-0.5px}
          .peng-svc{background:#f8fafd;padding:80px 40px}.peng-svc-in{max-width:1280px;margin:0 auto}
          .peng-ey2{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#2563EB;margin-bottom:10px;display:block}
          .peng-ttl{font-size:clamp(1.8rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#1E3A8A 0%,#2563EB 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .peng-desc{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:44px}
          .peng-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
          .peng-card{background:linear-gradient(135deg,rgba(239,246,255,0.65) 0%,rgba(255,255,255,0.88) 60%,rgba(219,234,254,0.25) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(37,99,235,0.05);opacity:0;transform:translateY(20px);transition:opacity 0.4s ease,transform 0.4s ease}
          .peng-card.visible{opacity:1;transform:translateY(0)}.peng-card:hover{transform:translateY(-6px);border-color:rgba(37,99,235,0.22);box-shadow:0 16px 48px rgba(37,99,235,0.09)}
          .peng-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#2563EB;opacity:0.05;letter-spacing:-4px;pointer-events:none;user-select:none}
          .peng-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px;position:relative;z-index:1}
          .peng-card p{font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1;margin:0}
          .peng-lt{background:linear-gradient(135deg,#1E3A8A 0%,#2563EB 100%);padding:60px 40px}
          .peng-lt-in{max-width:1280px;margin:0 auto;text-align:center}
          .peng-lt h2{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;color:#fff;margin-bottom:32px}
          .peng-pills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
          .peng-pill{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.20);border-radius:100px;padding:8px 18px;font-size:13px;font-weight:600;color:#fff}
          .peng-proc{background:linear-gradient(135deg,#eff6ff 0%,#eff6ff 50%,#dbeafe 100%);padding:80px 40px}
          .peng-proc-in{max-width:900px;margin:0 auto}
          .peng-steps{display:flex;flex-direction:column;margin-top:44px}
          .peng-step{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(37,99,235,0.10);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease}
          .peng-step:last-child{border-bottom:none}.peng-step.visible{opacity:1;transform:translateX(0)}
          .peng-snum{font-size:3rem;font-weight:900;color:rgba(37,99,235,0.15);line-height:1;letter-spacing:-2px}
          .peng-step h3{font-size:1.1rem;font-weight:800;color:#0F1F40;margin-bottom:6px}
          .peng-step p{font-size:0.9rem;color:#4A6080;line-height:1.7;margin:0}
          .peng-why{background:#fff;padding:80px 40px}.peng-why-in{max-width:1280px;margin:0 auto}
          .peng-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
          .peng-wcard{background:linear-gradient(135deg,#eff6ff 0%,#fff 60%,#dbeafe 100%);border:1px solid rgba(37,99,235,0.10);border-radius:16px;padding:28px;opacity:0;transform:translateY(16px);transition:opacity 0.4s ease,transform 0.4s ease}
          .peng-wcard.visible{opacity:1;transform:translateY(0)}.peng-wcard:hover{border-color:rgba(37,99,235,0.20);box-shadow:0 8px 32px rgba(37,99,235,0.07)}
          .peng-dot{width:8px;height:8px;border-radius:50%;background:#2563EB;margin-bottom:16px}
          .peng-wcard h3{font-size:1rem;font-weight:800;color:#0F1F40;margin-bottom:10px}
          .peng-wcard p{font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0}
          .peng-faq{background:#f8fafd;padding:80px 40px}.peng-faq-in{max-width:860px;margin:0 auto}
          .peng-fitem{border-bottom:1px solid #e5e7eb}
          .peng-fq{width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4}
          .peng-fq:hover{color:#2563EB}
          .peng-ficon{width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px}
          .peng-fitem.open .peng-ficon{border-color:#2563EB;color:#2563EB;background:rgba(37,99,235,0.06)}
          .peng-fa{font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease}
          .peng-fitem.open .peng-fa{max-height:600px;padding-bottom:22px}
          .peng-cta{background:linear-gradient(135deg,rgba(37,99,235,0.06) 0%,rgba(255,255,255,0.80) 40%,rgba(30,58,138,0.04) 100%);padding:90px 40px;position:relative;overflow:hidden}
          .peng-cta-o1{position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,0.10) 0%,transparent 70%);pointer-events:none}
          .peng-cta-o2{position:absolute;bottom:-60px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(30,58,138,0.08) 0%,transparent 70%);pointer-events:none}
          .peng-cta-in{max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1}
          .peng-cta-t{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#1E3A8A 0%,#2563EB 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2}
          .peng-cta-s{font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 36px;max-width:520px}
          @media(max-width:1024px){.peng-grid{grid-template-columns:repeat(2,1fr)}.peng-why-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:768px){.peng-hero,.peng-svc,.peng-lt,.peng-proc,.peng-why,.peng-faq,.peng-cta{padding:60px 24px}.peng-hero{padding-top:60px;padding-bottom:0}.peng-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}.peng-stat:nth-child(2){border-right:none}.peng-grid{grid-template-columns:1fr}.peng-why-grid{grid-template-columns:1fr}.peng-step{grid-template-columns:56px 1fr}.peng-btns{flex-direction:column;align-items:center}}
        `}</style>
      </Head>
      <div className="peng-page">
        <section className="peng-hero"><div className="peng-o1"/><div className="peng-o2"/>
          <div className="peng-in">
            <nav className="peng-bc"><Link href="/">Home</Link><span>/</span><Link href="/seo-services-company">SEO</Link><span>/</span><Link href="/google-penalty-recovery-services">Penalty Recovery</Link><span>/</span><span style={{color:'#2563EB'}}>Penguin Recovery</span></nav>
            <span className="peng-ey"><span style={{width:6,height:6,borderRadius:'50%',background:'#2563EB',display:'inline-block'}}/> Backlink Audit · Disavow · Link Removal · Link Spam</span>
            <h1 className="peng-h1">Google Penguin Recovery Service — Toxic Link Audit &amp; Disavow</h1>
            <p className="peng-sub">Specialist Penguin and Link Spam Update recovery — comprehensive toxic backlink audit, conservative disavow file preparation, link removal outreach, and clean authority link building to restore your organic rankings.</p>
            <div className="peng-btns">
              <Link href="/contact" className="peng-btn-p">Get a Free Backlink Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/google-penalty-recovery-services" className="peng-btn-s">All Penalty Recovery Services</Link>
            </div>
            <div className="peng-stats">{STATS.map(s => <div key={s.label} className="peng-stat"><div className="peng-stat-l">{s.label}</div><div className="peng-stat-v">{s.val}</div></div>)}</div>
          </div>
        </section>
        <section className="peng-svc"><div className="peng-svc-in">
          <span className="peng-ey2">What We Do</span><h2 className="peng-ttl">Penguin &amp; Link Spam Recovery Services</h2>
          <p className="peng-desc">From backlink audit to clean link building — a complete Penguin recovery service covering every stage of toxic link identification, removal, and authority rebuilding.</p>
          <div className="peng-grid" ref={cardsRef}>{SERVICES.map((s,i) => <div key={s.n} className={`peng-card${visibleCards.includes(i)?' visible':''}`}><div className="peng-num">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>)}</div>
        </div></section>
        <section className="peng-lt"><div className="peng-lt-in"><h2>Toxic Link Types We Audit &amp; Disavow</h2><div className="peng-pills">{LINK_TYPES.map(l => <span key={l} className="peng-pill">{l}</span>)}</div></div></section>
        <section className="peng-proc"><div className="peng-proc-in">
          <span className="peng-ey2">Our Approach</span><h2 className="peng-ttl">Penguin Recovery Process</h2>
          <p className="peng-desc">Audit-driven and conservative — we build the evidence base before touching a single link in the disavow file.</p>
          <div className="peng-steps">{PROCESS.map((p,i) => <div key={p.step} ref={el=>{stepRefs.current[i]=el}} className={`peng-step${visibleSteps.includes(i)?' visible':''}`}><div className="peng-snum">{p.step}</div><div><h3>{p.title}</h3><p>{p.desc}</p></div></div>)}</div>
        </div></section>
        <section className="peng-why"><div className="peng-why-in">
          <span className="peng-ey2">Why 1Solutions</span><h2 className="peng-ttl">Conservative Disavow Methodology — Protect Good Links, Remove Bad Ones</h2>
          <p className="peng-desc">Penguin recovery is not about mass disavowing — it is about precision. We build a disavow file based on evidence, not guesswork.</p>
          <div className="peng-why-grid" ref={whyRef}>{WHY.map((w,i) => <div key={w.title} className={`peng-wcard${visibleWhy.includes(i)?' visible':''}`}><div className="peng-dot"/><h3>{w.title}</h3><p>{w.desc}</p></div>)}</div>
        </div></section>
        <section className="peng-faq"><div className="peng-faq-in">
          <span className="peng-ey2">Got Questions?</span><h2 className="peng-ttl">Google Penguin Recovery FAQs</h2>
          <p className="peng-desc" style={{marginBottom:44}}>Everything you need to know about Penguin penalties, toxic links, disavow files, and recovery timelines.</p>
          <div>{FAQS.map((f,i) => <div key={i} className={`peng-fitem${openFaq===i?' open':''}`}><button className="peng-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>{f.q}<span className="peng-ficon">{openFaq===i?'−':'+'}</span></button><div className="peng-fa" style={openFaq===i?{maxHeight:600,paddingBottom:22}:{}}>{f.a}</div></div>)}</div>
        </div></section>
        <section className="peng-cta"><div className="peng-cta-o1"/><div className="peng-cta-o2"/>
          <div className="peng-cta-in">
            <span className="peng-ey2" style={{textAlign:'center',display:'block',marginBottom:16}}>Rankings suppressed by toxic links or a Penguin update?</span>
            <h2 className="peng-cta-t">Get a Free Backlink Profile Audit</h2>
            <p className="peng-cta-s">Share your domain — we&rsquo;ll pull your full backlink profile, identify the toxic links, and outline a recovery plan including disavow strategy and clean link building.</p>
            <div className="peng-btns">
              <Link href="/contact" className="peng-btn-p">Request a Free Backlink Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
              <Link href="/link-building-packages" className="peng-btn-s">Link Building Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
