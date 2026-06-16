'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'User Interviews', desc: 'One-on-one qualitative sessions to uncover goals, pain points, mental models, and decision-making behaviours that quantitative data can never reveal.' },
  { n: '02', title: 'Usability Testing', desc: 'Moderated and unmoderated task-based sessions that surface real friction points in your product — with video recordings, transcripts, and severity ratings.' },
  { n: '03', title: 'Customer Journey Mapping', desc: 'Visual maps of every touchpoint from awareness through advocacy, identifying gaps, moments of truth, and opportunities for differentiation.' },
  { n: '04', title: 'Heuristic Evaluation', desc: 'Expert review against Nielsen\'s 10 heuristics with severity ratings (critical / major / minor) and actionable fixes prioritised by impact and effort.', featured: true },
  { n: '05', title: 'Card Sorting & Tree Testing', desc: 'Information architecture research that reveals how real users categorise and navigate content — so your nav structure matches their mental model, not yours.' },
  { n: '06', title: 'Survey Design & Analysis', desc: 'Quantitative surveys deployed at scale with statistical analysis, significance testing, and insight reports that complement qualitative findings.' },
  { n: '07', title: 'Eye Tracking & Click Heatmaps', desc: 'Behavioural data overlays that show exactly where attention lands, what gets ignored, and where users drop off — powered by session recording tools.' },
  { n: '08', title: 'Persona & Empathy Map Creation', desc: 'Evidence-based personas grounded in real user data — not demographic assumptions — that create shared team understanding and guide design decisions.' },
];

const PROCESS = [
  { title: 'Research Planning', desc: 'We define the research questions, choose the right methodologies, set success metrics, and build a research protocol. Good research starts with a plan — not a script.' },
  { title: 'Participant Recruitment', desc: 'We recruit participants who match your target user profile using screener surveys, recruitment panels, and your existing customer base — ensuring representative, bias-free samples.' },
  { title: 'Data Collection', desc: 'We run the sessions — interviews, usability tests, surveys, heuristic reviews — capturing video, audio, click paths, and qualitative notes using industry-standard research tools.' },
  { title: 'Analysis & Synthesis', desc: 'Raw data is coded, themed, and synthesised using affinity diagrams and thematic analysis. Patterns emerge that individual sessions would never reveal on their own.' },
  { title: 'Insight Report', desc: 'A structured research report delivers key findings, supporting evidence, user quotes, severity ratings, and a prioritised list of opportunities — ready to present to any stakeholder.' },
  { title: 'Design Recommendations', desc: 'We don\'t just stop at findings. Every insight is mapped to a specific, actionable design recommendation with rationale — feeding directly into your next design sprint.' },
];

const WHY = [
  { icon: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: '5,000+ Users Tested', desc: 'Across SaaS, fintech, healthcare, retail, and enterprise platforms — our research experience spans every industry and user type. We have seen every pattern.' },
  { icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: 'Research-First Approach', desc: 'We treat research as a discipline, not a box to tick. Every project follows rigorous methodological standards — so your design decisions are built on evidence you can defend.' },
  { icon: <svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, title: 'Mixed-Methods Expertise', desc: 'We combine qualitative depth (interviews, usability tests) with quantitative breadth (surveys, analytics, heatmaps) to give you a complete picture, not a partial view.' },
  { icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: 'Fast-Turnaround Reports', desc: 'Research reports are delivered within 5 business days of the final session. You don\'t wait weeks for insights that should feed immediately into your sprint cycle.' },
  { icon: <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, title: '45% Average Satisfaction Lift', desc: 'Across our research-led redesign projects, client products see an average 45% improvement in user satisfaction scores (SUS / CSAT) within 6 months of implementing findings.' },
  { icon: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, title: 'Findings Your Team Will Actually Use', desc: 'We write reports for product teams, not academic journals. Clear headlines, actionable recommendations, and visual summaries that drive decisions — not desk-drawer dust.' },
  { icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: 'Remote Research Capability', desc: 'We run fully remote research sessions across US, Canada, Australia, and UK time zones — using Zoom, Lookback, UserZoom, and Maze for high-quality remote data collection.' },
  { icon: <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>, title: 'Research That Feeds Design Directly', desc: 'Every research engagement is structured to feed directly into your next design sprint. We don\'t hand over a PDF and disappear — we work alongside your team to act on insights.' },
];

const FAQS = [
  {
    q: 'What is UX research and why does my product need it?',
    a: 'UX research is the systematic study of your users — their behaviours, needs, motivations, and pain points — using both qualitative and quantitative methods. Without it, product teams design based on assumptions, internal opinions, and hippo (highest-paid person\'s opinion) decisions. With it, every design choice is grounded in evidence from the people who actually use the product. Skipping research doesn\'t save time — it creates expensive rework when assumptions turn out to be wrong, which they almost always are.',
  },
  {
    q: 'How do you recruit participants for user testing?',
    a: 'We recruit through multiple channels depending on your audience: your existing user base (opt-in invitations), professional recruitment panels (UserZoom, Respondent, User Interviews), social media outreach, and specialist B2B recruitment networks for hard-to-reach personas. Every participant is screened using a custom screener survey to ensure they match your target user profile. We typically recruit 5–8 participants for qualitative studies and 100–500 for quantitative surveys.',
  },
  {
    q: 'How long does a UX research project take?',
    a: 'Timeline depends on scope and methodology. A focused usability study (5–8 participants, 2 rounds of sessions) typically takes 2–3 weeks from kick-off to report delivery. A comprehensive research programme covering interviews, journey mapping, and a heuristic evaluation typically takes 4–8 weeks. Heuristic evaluations can be turned around in 5–7 business days as they do not require participant recruitment. We share a precise timeline after your brief.',
  },
  {
    q: 'What deliverables do I receive?',
    a: 'Standard deliverables include: a research plan and discussion guide, session recordings (video + audio) with transcripts, an affinity diagram or thematic analysis document, a structured insight report with key findings, supporting quotes, and severity ratings, actionable design recommendations mapped to each finding, and (depending on scope) journey maps, personas, empathy maps, or information architecture recommendations. Everything is delivered in formats your team can use immediately.',
  },
  {
    q: 'Can you run remote usability testing?',
    a: 'Yes. Remote usability testing is our default approach and accounts for the majority of the research we run. We use tools including Zoom (moderated sessions with screen share), Lookback and UserZoom (moderated with session recording and note-taking), Maze and Useberry (unmoderated task-based testing at scale), and Hotjar / FullStory (behavioural heatmaps and session recordings on live products). Remote testing gives us access to participants in any geography — particularly important for US, Canadian, and Australian markets.',
  },
  {
    q: 'How do your research findings integrate into the design process?',
    a: 'We structure every research engagement to feed directly into a subsequent design action. The insight report includes a prioritised opportunity backlog that maps directly to design tasks. We offer research-to-design sprint facilitation where we work alongside your design team to translate findings into wireframes or prototype iterations within the same sprint cycle. We can also embed a researcher into your existing design process on a retainer basis for ongoing research support.',
  },
];

const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'UX Research', item: 'https://www.1solutions.biz/ux-research' },
      ],
    },
    {
      '@type': 'Service',
      name: 'UX Research Services',
      provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
      description: 'User testing, journey mapping, heuristic evaluation, and qualitative research that replaces guesswork with evidence. 250+ research projects delivered.',
      serviceType: 'UX Research',
      areaServed: ['IN', 'US', 'CA', 'GB', 'AU'],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '63', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

// Count-up hook
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numTarget = parseInt(String(target).replace(/\D/g, ''), 10);
    if (!numTarget) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function AnimatedStat({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = String(val).replace(/[\d,]/g, '');
  const display = started ? num + suffix : val;
  return (
    <div className="uxr-stat-col">
      <div className="uxr-stat-value">{display}</div>
      <div className="uxr-stat-label">{label}</div>
    </div>
  );
}

export default function UXResearch() {
  const [openFaq, setOpenFaq] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleSections, setVisibleSections] = useState(new Set());

  const statsRef = useRef(null);
  const stepRefs = useRef([]);
  const whyGridRef = useRef(null);
  const sectionRefs = useRef({});

  // Count-up trigger
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Process steps reveal
  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleSteps(prev => prev.includes(i) ? prev : [...prev, i]), i * 140);
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  // Why cards stagger
  useEffect(() => {
    if (!whyGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          WHY.forEach((_, i) => {
            setTimeout(() => setVisibleWhyCards(prev => prev.includes(i) ? prev : [...prev, i]), i * 90);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(whyGridRef.current);
    return () => obs.disconnect();
  }, []);

  // Section heading fade-up
  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, key]));
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  return (
    <>
      <Head>
        <title>UX Research Agency | User Testing & Journey Mapping | 1Solutions</title>
        <meta name="description" content="1Solutions UX research agency delivers user interviews, usability testing, journey mapping, and heuristic evaluations that replace guesswork with evidence. 250+ projects, 5,000+ users tested." />
        <meta name="keywords" content="UX research agency, usability testing, user testing, journey mapping, heuristic evaluation, UX research services, user research company" />
        <link rel="canonical" href="https://www.1solutions.biz/ux-research" />
        <meta property="og:title" content="UX Research Agency | User Testing & Journey Mapping | 1Solutions" />
        <meta property="og:description" content="Structured UX research that replaces guesswork with evidence. User interviews, usability testing, journey mapping, and heuristic audits." />
        <meta property="og:url" content="https://www.1solutions.biz/ux-research" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .uxr-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #ecfdf5 0%, #e0f2fe 25%, #dbeafe 55%, #f0fdf4 80%, #fef3c7 100%);
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
          }
          .uxr-page *, .uxr-page *::before, .uxr-page *::after { box-sizing: border-box; }

          /* Orbs */
          .uxr-orb-1 { position:absolute;width:820px;height:820px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.25) 0%,rgba(20,184,166,0.10) 40%,transparent 70%);top:-280px;right:-240px;pointer-events:none;z-index:0;filter:blur(22px); }
          .uxr-orb-2 { position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,0.22) 0%,rgba(99,102,241,0.08) 40%,transparent 70%);bottom:60px;left:-200px;pointer-events:none;z-index:0;filter:blur(22px); }
          .uxr-orb-3 { position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.16) 0%,transparent 70%);top:55%;right:-100px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(22px); }

          /* ── HERO ── */
          .uxr-hero { position:relative;overflow:hidden; }
          .uxr-hero-content { position:relative;z-index:2;text-align:center;max-width:900px;margin:0 auto;padding:64px 40px 44px; }
          .uxr-eyebrow { display:inline-block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:20px;background:rgba(255,255,255,0.55);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.70);padding:6px 18px;border-radius:40px; }
          .uxr-hero-content h1 { font-size:52px;font-weight:900;line-height:1.08;letter-spacing:-1.5px;margin-bottom:18px;background:linear-gradient(100deg,#065f46 0%,#0F3460 45%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .uxr-hero-content p { font-size:17px;color:#3A507A;line-height:1.7;max-width:660px;margin:0 auto 32px; }
          .uxr-hero-btns { display:flex;gap:14px;justify-content:center;flex-wrap:wrap; }
          .uxr-btn-primary { display:inline-block;padding:15px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1);position:relative;overflow:hidden; }
          .uxr-btn-primary::after { content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:uxr-shimmer 2.8s ease-in-out infinite;pointer-events:none; }
          @keyframes uxr-shimmer { 0%{left:-120%} 35%,100%{left:160%} }
          .uxr-btn-primary:hover { background:rgba(255,255,255,0.85);border-color:rgba(16,185,129,0.5);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(16,185,129,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }
          .uxr-btn-secondary { display:inline-block;padding:14px 36px;border:1.5px solid rgba(15,52,96,0.22);border-radius:50px;color:#0F3460;font-weight:600;font-size:15px;text-decoration:none;transition:all 0.3s; }
          .uxr-btn-secondary:hover { background:rgba(255,255,255,0.60);border-color:#0F3460;transform:translateY(-2px); }

          /* Stats bar */
          .uxr-stats-bar { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:0 auto;background:rgba(255,255,255,0.50);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.90);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,1); }
          .uxr-stat-col { padding:20px 24px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); }
          .uxr-stat-col:last-child { border-right:none; }
          .uxr-stat-value { font-size:28px;font-weight:900;color:#10b981;letter-spacing:-0.5px;line-height:1;margin-bottom:5px; }
          .uxr-stat-label { font-size:12px;color:#4A6080;font-weight:500; }

          /* Trust badges */
          .uxr-trust-bar { position:relative;z-index:2;display:flex;gap:20px;justify-content:center;flex-wrap:wrap;padding:24px 40px 56px; }
          .uxr-trust-badge { display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.55);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.75);border-radius:40px;padding:8px 18px;font-size:13px;font-weight:600;color:#2A3F6F; }
          .uxr-trust-badge svg { width:16px;height:16px;fill:#10b981;flex-shrink:0; }

          /* ── SERVICES ── */
          .uxr-services-section { background:#f8fafd;padding:80px 40px 64px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.14),0 -4px 16px rgba(15,52,96,0.08); }
          .uxr-services-inner { max-width:1280px;margin:0 auto; }
          .uxr-section-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#10b981;margin-bottom:12px; }
          .uxr-section-title { font-size:44px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#10b981 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:12px; }
          .uxr-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:40px; }
          .uxr-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
          .uxr-service-card { background:linear-gradient(135deg,rgba(209,250,229,0.50) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px 24px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .uxr-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#10b981,#D97706);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .uxr-service-card:hover::before { transform:scaleY(1); }
          .uxr-service-card:hover { transform:translateY(-6px);border-color:rgba(16,185,129,0.30);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .uxr-service-card.featured { background:linear-gradient(135deg,rgba(209,250,229,0.60) 0%,rgba(255,255,255,0.90) 55%,rgba(254,243,199,0.35) 100%);border-color:rgba(16,185,129,0.18);box-shadow:0 6px 32px rgba(16,185,129,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .uxr-card-num { position:absolute;top:8px;right:14px;font-size:68px;font-weight:900;line-height:1;color:#0F3460;opacity:0.05;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .uxr-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:9px;position:relative;z-index:1; }
          .uxr-service-card p { font-size:13px;color:#4A6080;line-height:1.65;position:relative;z-index:1;margin:0; }
          .uxr-service-card:hover h3 { color:#059669; }

          /* Section reveal */
          .uxr-section-reveal { opacity:0;transform:translateY(44px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .uxr-section-reveal.uxr-revealed { opacity:1;transform:translateY(0); }

          /* ── WHY US ── */
          .uxr-why-section { padding:80px 40px;background:transparent;position:relative;z-index:1; }
          .uxr-why-inner { max-width:1280px;margin:0 auto; }
          .uxr-why-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:52px; }
          .uxr-why-card { background:linear-gradient(135deg,rgba(209,250,229,0.50) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:30px 26px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.25s,box-shadow 0.25s; }
          .uxr-why-card.uxr-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .uxr-why-card:hover { border-color:rgba(16,185,129,0.30);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-5px) scale(1); }
          .uxr-why-icon { width:42px;height:42px;display:flex;align-items:center;justify-content:center;margin-bottom:12px; }
          .uxr-why-icon svg { width:26px;height:26px;fill:none;stroke:#10b981;stroke-width:2;stroke-linecap:round;stroke-linejoin:round; }
          .uxr-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35; }
          .uxr-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* ── PROCESS ── */
          .uxr-process-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .uxr-process-inner { max-width:1280px;margin:0 auto; }
          .uxr-process-layout { display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start;margin-top:52px; }
          .uxr-process-steps { display:flex;flex-direction:column; }
          .uxr-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .uxr-pstep.visible { opacity:1;transform:translateY(0); }
          .uxr-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .uxr-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .uxr-pstep:hover .uxr-pstep-circle { background:rgba(16,185,129,0.18);border-color:#10b981;color:#059669; }
          .uxr-pstep-line { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:44px; }
          .uxr-pstep-line::before { content:'';width:2px;flex:1;background:#0F3460;opacity:0.2; }
          .uxr-pstep-line::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:0.35;margin-top:-1px; }
          .uxr-pstep:last-child .uxr-pstep-line { display:none; }
          .uxr-pstep-content { padding:4px 0 42px; }
          .uxr-pstep:last-child .uxr-pstep-content { padding-bottom:0; }
          .uxr-pstep-title { font-size:21px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .uxr-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .uxr-process-aside { position:sticky;top:100px; }
          .uxr-process-card { background:linear-gradient(135deg,rgba(209,250,229,0.60) 0%,rgba(255,255,255,0.92) 55%,rgba(219,234,254,0.35) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px 32px;box-shadow:0 12px 48px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .uxr-process-card h3 { font-size:22px;font-weight:800;color:#0F3460;margin:0 0 18px;line-height:1.2; }
          .uxr-deliverable-list { display:flex;flex-direction:column;gap:12px; }
          .uxr-deliverable-item { display:flex;align-items:flex-start;gap:12px; }
          .uxr-deliverable-icon { width:28px;height:28px;border-radius:8px;background:rgba(16,185,129,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px; }
          .uxr-deliverable-item p { font-size:13px;color:#374151;line-height:1.55;margin:0; }
          .uxr-deliverable-item strong { color:#0F3460;font-weight:600; }
          .uxr-process-cta { margin-top:28px;display:block;width:100%;text-align:center;padding:14px 20px;background:linear-gradient(90deg,#10b981,#059669);color:#fff;font-weight:700;font-size:15px;text-decoration:none;border-radius:50px;transition:opacity 0.2s,transform 0.2s;box-shadow:0 6px 24px rgba(16,185,129,0.30); }
          .uxr-process-cta:hover { opacity:0.90;transform:translateY(-2px); }

          /* ── TESTIMONIALS ── */
          .uxr-testi-section { border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .uxr-testi-inner { max-width:1280px;margin:0 auto; }
          .uxr-section-center { text-align:center;margin-bottom:48px; }
          .uxr-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .uxr-tcard { background:linear-gradient(135deg,rgba(209,250,229,0.50) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s; }
          .uxr-tcard:hover { transform:translateY(-6px);border-color:rgba(16,185,129,0.30);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .uxr-tcard-stars { font-size:17px;color:#D97706;letter-spacing:2px; }
          .uxr-tcard-text { font-size:14px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .uxr-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .uxr-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .uxr-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .uxr-tcard-role { font-size:12px;color:#6b7280; }

          /* ── FAQ ── */
          .uxr-faq-section { padding:80px 40px;background:#f8fafd;position:relative;z-index:1;border-top:1px solid rgba(15,52,96,0.08); }
          .uxr-faq-inner { max-width:1280px;margin:0 auto; }
          .uxr-faq-layout { display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start; }
          .uxr-faq-left { position:sticky;top:100px; }
          .uxr-faq-heading { font-size:44px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#10b981 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .uxr-faq-intro { font-size:15px;color:#4A6080;line-height:1.75;margin:0 0 28px; }
          .uxr-faq-contact-nudge { display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:rgba(255,255,255,0.55);backdrop-filter:blur(10px);border:1.5px solid rgba(255,255,255,0.80);border-radius:50px;color:#0F3460;font-weight:600;font-size:14px;text-decoration:none;transition:all 0.3s; }
          .uxr-faq-contact-nudge:hover { background:rgba(255,255,255,0.80);transform:translateY(-2px); }
          .uxr-faq-methods { margin-top:28px; }
          .uxr-faq-methods h4 { font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#6b7280;margin:0 0 12px; }
          .uxr-method-tags { display:flex;flex-wrap:wrap;gap:8px; }
          .uxr-method-tag { background:rgba(16,185,129,0.10);border:1px solid rgba(16,185,129,0.25);color:#059669;border-radius:20px;padding:5px 14px;font-size:12px;font-weight:600; }
          .uxr-faq-list { display:flex;flex-direction:column;gap:10px; }
          .uxr-faq-item { background:linear-gradient(135deg,rgba(209,250,229,0.45) 0%,rgba(255,255,255,0.85) 60%,rgba(219,234,254,0.30) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s;position:relative; }
          .uxr-faq-item.open { border-color:rgba(16,185,129,0.30);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .uxr-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#10b981;border-radius:3px 0 0 3px; }
          .uxr-faq-question { width:100%;background:none;border:none;padding:20px 20px 20px 56px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative; }
          .uxr-faq-q-badge { position:absolute;left:14px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .uxr-faq-item.open .uxr-faq-q-badge { background:#10b981;color:#fff; }
          .uxr-faq-question span { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .uxr-faq-item.open .uxr-faq-question span { color:#059669; }
          .uxr-faq-chevron { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .uxr-faq-item.open .uxr-faq-chevron { transform:rotate(180deg);color:#10b981; }
          .uxr-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .uxr-faq-item.open .uxr-faq-answer-wrap { max-height:500px; }
          .uxr-faq-answer { padding:0 20px 20px 56px;font-size:14px;color:#4b5563;line-height:1.8; }

          /* ── CONTACT ── */
          .uxr-contact-section { padding:72px 40px;background:linear-gradient(135deg,rgba(209,250,229,0.65) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.60) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .uxr-contact-container { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;align-items:start;gap:36px; }
          .uxr-contact-title { font-size:44px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0F3460 0%,#10b981 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .uxr-contact-desc { font-size:14px;color:#4A6080;line-height:1.65;margin:0 0 24px; }
          .uxr-contact-perks { display:flex;flex-direction:column;gap:14px;margin-bottom:28px; }
          .uxr-perk { display:flex;align-items:flex-start;gap:10px; }
          .uxr-perk-check { width:22px;height:22px;border-radius:50%;background:rgba(16,185,129,0.14);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:11px;color:#10b981;font-weight:800;margin-top:1px; }
          .uxr-perk p { font-size:13px;color:#4A6080;margin:0;line-height:1.55; }
          .uxr-contact-stats { display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:24px;border-top:1px solid rgba(15,52,96,0.10); }
          .uxr-cstat-num { font-size:32px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px; }
          .uxr-cstat-text { font-size:12px;color:#4A6080;font-weight:500;line-height:1.4; }
          .uxr-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.90) 0%,rgba(209,250,229,0.20) 50%,rgba(255,255,255,0.88) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .uxr-form-box h3 { font-size:24px;font-weight:700;margin:0 0 26px;color:#0F1F40;letter-spacing:-0.4px; }
          .uxr-contact-form { display:flex;flex-direction:column;gap:14px; }
          .uxr-form-row { display:grid;grid-template-columns:1fr 1fr;gap:12px; }
          .uxr-form-group { display:flex;flex-direction:column;gap:5px; }
          .uxr-form-group.full { grid-column:1/-1; }
          .uxr-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .uxr-form-group input,.uxr-form-group textarea,.uxr-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .uxr-form-group input:focus,.uxr-form-group textarea:focus { outline:none;border-color:#10b981;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(16,185,129,0.12); }
          .uxr-phone-row { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .uxr-phone-row select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:78px;font-family:inherit; }
          .uxr-phone-row input { flex:1;border:none;border-radius:0;padding:10px 14px;font-family:inherit;font-size:13px;color:#0F1F40;background:transparent; }
          .uxr-phone-row input:focus { outline:none; }
          .uxr-consent { display:flex;gap:8px;align-items:flex-start;margin-top:4px; }
          .uxr-consent input[type="checkbox"] { margin-top:3px;width:15px;height:15px;cursor:pointer; }
          .uxr-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .uxr-consent a { color:#10b981;text-decoration:none; }
          .uxr-submit-btn { padding:14px 28px;background:linear-gradient(90deg,#10b981,#059669);color:white;border:none;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:6px;width:100%;box-shadow:0 6px 24px rgba(16,185,129,0.28); }
          .uxr-submit-btn:hover { background:linear-gradient(90deg,#059669,#047857);transform:translateY(-2px);box-shadow:0 10px 32px rgba(16,185,129,0.38); }

          /* ── RELATED SERVICES ── */
          .uxr-related-section { background:rgba(209,250,229,0.15);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:72px 40px; }
          .uxr-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .uxr-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .uxr-related-title { font-size:40px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#10b981 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 14px; }
          .uxr-related-sub { font-size:15px;color:#4A6080;line-height:1.7;margin:0 auto 40px;max-width:620px; }
          .uxr-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.10);margin:0 0 36px; }
          .uxr-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:10px; }
          .uxr-rtag { display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .uxr-rtag:hover { transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10);filter:brightness(0.92); }
          .uxr-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .uxr-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .uxr-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .uxr-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .uxr-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .uxr-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .uxr-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .uxr-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }

          /* ── RESPONSIVE ── */
          @media (max-width:1024px) {
            .uxr-services-grid { grid-template-columns:repeat(2,1fr); }
            .uxr-why-grid { grid-template-columns:repeat(2,1fr); }
            .uxr-process-layout { grid-template-columns:1fr; }
            .uxr-process-aside { position:static; }
            .uxr-faq-layout { grid-template-columns:1fr; }
            .uxr-faq-left { position:static; }
            .uxr-contact-container { grid-template-columns:1fr; }
          }
          @media (max-width:768px) {
            .uxr-page { overflow-x:hidden; }
            .uxr-hero-content { padding:44px 20px 28px; }
            .uxr-hero-content h1 { font-size:30px;letter-spacing:-0.4px; }
            .uxr-hero-content p { font-size:15px; }
            .uxr-stats-bar { grid-template-columns:1fr 1fr; }
            .uxr-stat-col:nth-child(2) { border-right:none; }
            .uxr-stat-col:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .uxr-stat-col:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .uxr-trust-bar { padding:16px 20px 36px;gap:10px; }
            .uxr-services-section { padding:52px 20px 44px; }
            .uxr-why-section { padding:60px 20px; }
            .uxr-why-grid { grid-template-columns:1fr;margin-top:36px; }
            .uxr-process-section { padding:60px 20px; }
            .uxr-faq-section { padding:60px 20px; }
            .uxr-testi-section { padding:60px 20px; }
            .uxr-testi-grid { grid-template-columns:1fr; }
            .uxr-contact-section { padding:52px 20px; }
            .uxr-section-title,.uxr-faq-heading,.uxr-contact-title,.uxr-related-title { font-size:28px; }
            .uxr-form-row { grid-template-columns:1fr; }
            .uxr-related-section { padding:60px 20px; }
            .uxr-related-tags { gap:8px; }
          }
          @media (max-width:480px) {
            .uxr-hero-content h1 { font-size:24px; }
            .uxr-services-grid { grid-template-columns:1fr; }
            .uxr-section-title,.uxr-faq-heading,.uxr-contact-title,.uxr-related-title { font-size:24px; }
            .uxr-contact-stats { grid-template-columns:1fr 1fr; }
            .uxr-hero-btns { flex-direction:column;align-items:center; }
          }
          @media (max-width:900px) {
            .uxr-page { background-attachment:scroll !important; }
          }
        `}</style>
      </Head>

      <div className="uxr-page">
        <div className="uxr-orb-1" />
        <div className="uxr-orb-2" />
        <div className="uxr-orb-3" />

        {/* ── HERO ── */}
        <div className="uxr-hero">
          <div className="uxr-hero-content">
            <span className="uxr-eyebrow">UX Research Agency — 16+ Years Experience</span>
            <h1>UX Research That Replaces Guesswork With Evidence</h1>
            <p>We uncover what your users actually need through structured research — interviews, usability tests, journey maps, and heuristic audits that feed directly into design decisions.</p>
            <div className="uxr-hero-btns">
              <Link href="#contact" className="uxr-btn-primary">Get a Free Research Consultation</Link>
              <Link href="/portfolio" className="uxr-btn-secondary">View Our Work →</Link>
            </div>
          </div>

          <div className="uxr-stats-bar" ref={statsRef}>
            {[
              ['250+ Research Projects', '250+'],
              ['5,000+ Users Tested', '5000+'],
              ['16+ Years Experience', '16+'],
              ['45% Avg Satisfaction Lift', '45%'],
            ].map(([label, val]) => (
              <AnimatedStat key={label} label={label} val={val} started={statsStarted} />
            ))}
          </div>

          <div className="uxr-trust-bar">
            {[
              'Moderated & Unmoderated Testing',
              'Remote Research Worldwide',
              'Mixed-Methods Approach',
              'Actionable Insight Reports',
              'Design-Ready Recommendations',
            ].map(badge => (
              <div className="uxr-trust-badge" key={badge}>
                <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section className="uxr-services-section" id="services">
          <div className="uxr-services-inner">
            <div
              className={`uxr-section-reveal${visibleSections.has('services') ? ' uxr-revealed' : ''}`}
              ref={el => { sectionRefs.current['services'] = el; }}
            >
              <span className="uxr-section-eyebrow">What We Deliver</span>
              <h2 className="uxr-section-title">UX Research Services We Offer</h2>
              <p className="uxr-section-desc">From exploratory discovery research to evaluative usability testing — every methodology is chosen to answer your specific product questions.</p>
            </div>
            <div className="uxr-services-grid">
              {SERVICES.map(s => (
                <div key={s.n} className={`uxr-service-card${s.featured ? ' featured' : ''}`}>
                  <span className="uxr-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="uxr-why-section">
          <div className="uxr-why-inner">
            <div
              className={`uxr-section-reveal${visibleSections.has('why') ? ' uxr-revealed' : ''}`}
              ref={el => { sectionRefs.current['why'] = el; }}
              style={{ textAlign: 'center', marginBottom: 0 }}
            >
              <span className="uxr-section-eyebrow">Why 1Solutions</span>
              <h2 className="uxr-section-title">Why Product Teams Choose Us for UX Research</h2>
              <p className="uxr-section-desc" style={{ maxWidth: 680, margin: '0 auto 0' }}>We run research programmes that generate insights your team will actually act on — not 80-page decks that sit unread in a shared drive.</p>
            </div>
            <div className="uxr-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div
                  key={w.title}
                  className={`uxr-why-card${visibleWhyCards.includes(i) ? ' uxr-card-visible' : ''}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="uxr-why-icon">{w.icon}</div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="uxr-process-section" id="process">
          <div className="uxr-process-inner">
            <div
              className={`uxr-section-reveal${visibleSections.has('process') ? ' uxr-revealed' : ''}`}
              ref={el => { sectionRefs.current['process'] = el; }}
            >
              <span className="uxr-section-eyebrow">Our Process</span>
              <h2 className="uxr-section-title">How We Run UX Research Projects</h2>
              <p className="uxr-section-desc">A rigorous 6-stage process — from research planning through design recommendations — so every engagement produces findings you can act on immediately.</p>
            </div>
            <div className="uxr-process-layout">
              <div className="uxr-process-steps">
                {PROCESS.map((step, i) => (
                  <div
                    key={step.title}
                    className={`uxr-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                    ref={el => { stepRefs.current[i] = el; }}
                  >
                    <div className="uxr-pstep-left">
                      <div className="uxr-pstep-circle">{i + 1}</div>
                      {i < PROCESS.length - 1 && <div className="uxr-pstep-line" />}
                    </div>
                    <div className="uxr-pstep-content">
                      <h3 className="uxr-pstep-title">{step.title}</h3>
                      <p className="uxr-pstep-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="uxr-process-aside">
                <div className="uxr-process-card">
                  <h3>Research Deliverables</h3>
                  <div className="uxr-deliverable-list">
                    {[
                      ['📋', 'Research plan & discussion guide', 'Methodology rationale, screener survey, session protocol, and moderation guide'],
                      ['🎥', 'Session recordings & transcripts', 'Full video recordings and timestamped transcripts from every research session'],
                      ['🗺️', 'Affinity diagram', 'Synthesised thematic clustering of all findings with supporting evidence links'],
                      ['📊', 'Insight report', 'Structured findings with severity ratings, user quotes, and opportunity priorities'],
                      ['👥', 'Personas & empathy maps', 'Evidence-based user personas grounded in real interview and observation data'],
                      ['🎯', 'Design recommendations', 'Actionable design changes mapped to each finding with rationale and priority score'],
                    ].map(([icon, title, desc]) => (
                      <div className="uxr-deliverable-item" key={title}>
                        <div className="uxr-deliverable-icon">{icon}</div>
                        <p><strong>{title}</strong> — {desc}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="#contact" className="uxr-process-cta">Start Your Research Project →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="uxr-testi-section">
          <div className="uxr-testi-inner">
            <div
              className={`uxr-section-center uxr-section-reveal${visibleSections.has('testi') ? ' uxr-revealed' : ''}`}
              ref={el => { sectionRefs.current['testi'] = el; }}
            >
              <span className="uxr-section-eyebrow">Client Reviews</span>
              <h2 className="uxr-section-title">What Our Clients Say</h2>
              <p style={{ fontSize: 15, color: '#4A6080', margin: 0 }}>Trusted by product teams across the US, Canada, Australia, and the UK.</p>
            </div>
            <div className="uxr-testi-grid">
              {[
                { initials: 'MP', bg: '#059669', text: '"The user interview findings completely changed our product roadmap. 1Solutions identified pain points we had been ignoring for two years and made the case for fixing them so compellingly that even our most sceptical stakeholders were convinced."', name: 'Maya Patel', role: 'Product Director, HealthTrack — USA' },
                { initials: 'JW', bg: '#0F3460', text: '"We commissioned a heuristic evaluation and usability study before our redesign. The report was genuinely excellent — clear priorities, concrete recommendations, and the kind of evidence that gets design changes approved at board level."', name: 'James Whitfield', role: 'Head of Digital, RetailGroup — Australia' },
                { initials: 'SC', bg: '#10b981', text: '"1Solutions ran our card sorting and tree testing for a complete information architecture overhaul. Navigation task success went from 52% to 89% after we implemented their recommendations. Exceptional ROI."', name: 'Sophie Chen', role: 'UX Lead, FinancePro — Canada' },
              ].map(t => (
                <div className="uxr-tcard" key={t.name}>
                  <div className="uxr-tcard-stars">★★★★★</div>
                  <p className="uxr-tcard-text">{t.text}</p>
                  <div className="uxr-tcard-author">
                    <div className="uxr-tcard-avatar" style={{ background: t.bg }}>{t.initials}</div>
                    <div>
                      <div className="uxr-tcard-name">{t.name}</div>
                      <div className="uxr-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="uxr-faq-section" id="faq">
          <div className="uxr-faq-inner">
            <div className="uxr-faq-layout">
              <div className="uxr-faq-left">
                <span className="uxr-section-eyebrow">FAQ</span>
                <h2 className="uxr-faq-heading">Frequently Asked Questions</h2>
                <p className="uxr-faq-intro">Everything you need to know before commissioning UX research from 1Solutions. Have a specific question? Let's talk.</p>
                <Link href="#contact" className="uxr-faq-contact-nudge">
                  Ask Us Anything →
                </Link>
                <div className="uxr-faq-methods">
                  <h4>Methods We Use</h4>
                  <div className="uxr-method-tags">
                    {['User Interviews', 'Usability Testing', 'Card Sorting', 'Tree Testing', 'Heuristic Evaluation', 'Eye Tracking', 'Click Heatmaps', 'Surveys', 'Diary Studies', 'Affinity Diagramming'].map(m => (
                      <span key={m} className="uxr-method-tag">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="uxr-faq-list">
                {FAQS.map((faq, i) => (
                  <div key={i} className={`uxr-faq-item${openFaq === i ? ' open' : ''}`}>
                    <button className="uxr-faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                      <div className="uxr-faq-q-badge">Q</div>
                      <span>{faq.q}</span>
                      <svg className="uxr-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <div className="uxr-faq-answer-wrap">
                      <div className="uxr-faq-answer">{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="uxr-contact-section" id="contact">
          <div className="uxr-contact-container">
            <div>
              <h2 className="uxr-contact-title">Ready to Replace Guesswork With Evidence?</h2>
              <p className="uxr-contact-desc">Tell us about your product and your research questions. We'll respond within 24 business hours with a methodology recommendation and timeline.</p>
              <div className="uxr-contact-perks">
                {[
                  'All briefs and findings are kept strictly confidential — NDA available on request.',
                  'A senior UX researcher reviews every enquiry and proposes the right methodology.',
                  'We respond within 24 business hours with a tailored research plan outline.',
                  'Free 30-minute discovery call to understand your product questions before you commit.',
                ].map((perk, i) => (
                  <div className="uxr-perk" key={i}>
                    <div className="uxr-perk-check">✓</div>
                    <p>{perk}</p>
                  </div>
                ))}
              </div>
              <div className="uxr-contact-stats">
                {[['250+', 'Research Projects'], ['5,000+', 'Users Tested'], ['97%', 'Client Retention']].map(([num, text]) => (
                  <div key={text}>
                    <div className="uxr-cstat-num">{num}</div>
                    <div className="uxr-cstat-text">{text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="uxr-form-box">
                <h3>Request a Research Consultation</h3>
                <form className="uxr-contact-form" onSubmit={e => e.preventDefault()}>
                  <div className="uxr-form-row">
                    <div className="uxr-form-group">
                      <label>Full Name*</label>
                      <input type="text" placeholder="Full Name*" required />
                    </div>
                    <div className="uxr-form-group">
                      <label>Business Email*</label>
                      <input type="email" placeholder="Business Email*" required />
                    </div>
                  </div>
                  <div className="uxr-form-row">
                    <div className="uxr-form-group">
                      <label>Phone Number*</label>
                      <div className="uxr-phone-row">
                        <select>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+1-CA">🇨🇦 +1</option>
                        </select>
                        <input type="tel" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="uxr-form-group">
                      <label>Organization*</label>
                      <input type="text" placeholder="Company / Startup*" required />
                    </div>
                  </div>
                  <div className="uxr-form-group full">
                    <label>Research Brief*</label>
                    <textarea
                      placeholder="Describe your product, what you want to learn from your users, and any known pain points or hypotheses..."
                      rows={5}
                      required
                    />
                  </div>
                  <div className="uxr-consent">
                    <input type="checkbox" id="uxr-consent" required />
                    <label htmlFor="uxr-consent">
                      I consent to 1Solutions processing my data in accordance with their{' '}
                      <Link href="/privacy-policy">Privacy Policy</Link>.
                    </label>
                  </div>
                  <button type="submit" className="uxr-submit-btn">Send My Research Brief →</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="uxr-related-section">
          <div className="uxr-related-inner">
            <span className="uxr-related-eyebrow">Related UX & Design Offerings</span>
            <h2 className="uxr-related-title">Explore Related Services</h2>
            <p className="uxr-related-sub">Pair our UX research expertise with complementary services to take your product from insight to launch.</p>
            <hr className="uxr-related-divider" />
            <div className="uxr-related-tags">
              {[
                ['Prototyping Services', 'violet', '/prototyping-services'],
                ['UI/UX Design Services', 'blue', '/hire-ui-ux-designer'],
                ['Hire UI/UX Designer', 'emerald', '/hire-ui-ux-designer'],
                ['Analytics & CRO Services', 'amber', '/analytics-cro-services'],
                ['Web Application Development', 'teal', '/ecommerce-website-development-services'],
                ['WordPress Development', 'indigo', '/wordpress-development-company'],
                ['Digital Marketing Services', 'rose', '/seo-services-company'],
                ['Content Marketing Services', 'green', '/content-marketing-services'],
              ].map(([label, color, href]) => (
                <Link href={href} className={`uxr-rtag uxr-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
