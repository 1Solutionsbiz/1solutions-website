import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuroraText } from '../../components/AuroraText';

const STATS_HERO = [
  { val: '62%',  label: 'Of Google searches now show AI Overviews' },
  { val: '10+',  label: 'AI platforms we check in your audit' },
  { val: '48h',  label: 'Audit delivered within 48 hours' },
  { val: '$0',   label: 'Completely free — no strings attached' },
];

const AUDIT_SIGNALS = [
  'Google AI Overviews', 'ChatGPT Citations', 'Perplexity.ai Answers',
  'Bing Copilot Responses', 'Google Gemini', 'Claude AI Mentions',
  'Knowledge Panel', 'E-E-A-T Signals', 'Schema & Structured Data',
  'Featured Snippets', 'People Also Ask', 'Voice Search Presence',
];

const WHAT_WE_AUDIT = [
  { icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title:'Google AI Overview Presence', body:'We test your target keywords across Google and identify whether your brand, content, or website appears in AI-generated overviews. We benchmark your current appearance rate against top competitors and flag exactly what is suppressing your visibility.' },
  { icon:'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4H9v-4z', title:'LLM Citation Analysis', body:'We query ChatGPT, Perplexity, Claude, and Bing Copilot with your target industry questions and document whether your brand is mentioned, cited as a source, or entirely absent. You will see exactly how often AI recommends your competitors over you.' },
  { icon:'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title:'Schema & Structured Data Health', body:'AI systems rely on structured data to understand what your business does and who it serves. We audit your schema markup coverage — Organisation, LocalBusiness, FAQ, HowTo, Product, Service — and identify missing markup that is costing you AI citations.' },
  { icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'E-E-A-T & Authority Signals', body:'Google and AI platforms prioritise sources that demonstrate Experience, Expertise, Authoritativeness, and Trustworthiness. We audit your author bios, credentials, citations, backlink profile, and brand mentions to identify E-E-A-T gaps suppressing your visibility.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'Competitor AI Visibility Benchmark', body:'We run the same AI platform queries for your top 5 competitors and map where they appear and you do not. This reveals the specific content topics, formats, and authority signals driving your competitors into AI answers, giving you a direct blueprint to follow.' },
  { icon:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title:'Content Gap Analysis for AI', body:'We identify the questions, topics, and search queries where AI platforms are citing competitors instead of you. These gaps become your highest-priority content opportunities — producing the right content in the right format to earn AI citations for queries you should already own.' },
  { icon:'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', title:'Knowledge Graph & Entity Presence', body:'Your business entity in Google\'s Knowledge Graph directly influences how AI describes and recommends you. We audit whether your entity exists, whether it is correctly categorised, and whether your brand attributes are accurate, fixing misinformation that causes AI to underrepresent or misrepresent your business.' },
  { icon:'M13 10V3L4 14h7v7l9-11h-7z', title:'Action Plan & Priority Roadmap', body:'Every audit concludes with a prioritised, specific action plan. Not a generic checklist — a ranked list of the fixes and content investments that will move the needle fastest for your specific business, industry, and competitive landscape. Implement it yourself or let us handle it for you.' },
];

const RESULTS = [
  { prefix:'',  target:3,   suffix:'×', decimals:0, label:'More AI citations after optimisation',       detail:'Average across clients who implemented recommendations' },
  { prefix:'',  target:62,  suffix:'%', decimals:0, label:'Of Google searches show AI Overviews now',   detail:'As of 2026, Google Search Labs data' },
  { prefix:'',  target:48,  suffix:'h', decimals:0, label:'Report delivered within',                    detail:'From form submission to audit in your inbox' },
  { prefix:'',  target:15,  suffix:'+', decimals:0, label:'Years of search expertise behind every audit',detail:'1Solutions founded 2009, SEO specialists' },
];

const PROCESS = [
  { n:'01', title:'Submit Your Details', body:'Fill out the form with your business name, website URL, and the AI search queries most important to your business. The more context you provide, the more targeted and useful your audit will be.' },
  { n:'02', title:'15-Minute Discovery Call', body:'Our AI visibility specialist schedules a short call to understand your business goals, target audience, and competitive landscape before the audit begins. This ensures we benchmark against the right competitors and queries.' },
  { n:'03', title:'10-Platform AI Sweep', body:'We systematically query Google AI Overviews, ChatGPT, Perplexity, Bing Copilot, Gemini, Claude, and other emerging AI platforms with your target keywords, documenting every citation, mention, and absence.' },
  { n:'04', title:'Competitor Benchmarking', body:'We run the identical query set for your top 5 competitors, mapping their AI visibility footprint against yours. This reveals the precise gaps in your strategy and the exact moves your competitors are making that you are not.' },
  { n:'05', title:'Gap & Opportunity Mapping', body:'We analyse why competitors appear where you do not — correlating their schema, content format, E-E-A-T signals, and entity presence with their AI citation rates. This turns observations into actionable, evidence-backed recommendations.' },
  { n:'06', title:'Report & Action Plan Delivery', body:'You receive a detailed audit report covering your current AI visibility score, competitor benchmarks, identified gaps, and a prioritised action plan with specific next steps. Delivered to your inbox within 48 hours of our call.' },
];

const WHY = [
  { icon:'M13 10V3L4 14h7v7l9-11h-7z', title:'AI-First Methodology', body:'We built our AI visibility audit framework specifically for the era of generative search. We are not retrofitting old SEO audits — we are running systematic, structured tests across every major AI platform to map your actual visibility footprint.' },
  { icon:'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', title:'Human Analysts, Not Bots', body:'Every audit is conducted by an experienced search specialist, not an automated tool. AI platforms behave differently depending on how queries are phrased and who is asking. Our analysts use real accounts and natural query patterns to surface results that automated scrapers miss.' },
  { icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title:'15+ Years of Search Experience', body:'1Solutions has been in search since 2009. We have lived through every major algorithm shift from Panda to Hummingbird to BERT to the AI Overview rollout. That history means we understand what signals AI platforms trust and why, not just what the latest blog post says.' },
  { icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title:'Industry-Specific Context', body:'AI visibility benchmarks vary dramatically by industry. A SaaS brand faces completely different competitors and citation patterns than a local service business or an e-commerce store. Our audits are calibrated to your specific sector, not a generic template.' },
  { icon:'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z', title:'Zero Obligation, Zero Upsell Pressure', body:'This is a genuine free audit, not a lead bait-and-switch. You will receive a real report with real findings. If you want help implementing the recommendations, we are here. If you want to implement them yourself, that is completely fine too — no hard sell.' },
  { icon:'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title:'Actionable, Not Academic', body:'We write our reports for business owners, not SEO theorists. Every finding is linked to a specific action. Every recommendation includes the expected impact and effort level. You will know exactly what to do first and why it will move the needle for your AI visibility.' },
];

const TESTIMONIALS_ROW1 = [
  { initials:'RS', bg:'#0F3460', name:'Rachel Singh', role:'CEO, ClearPath Legal, London, UK', text:'"The AI audit revealed we were completely invisible in ChatGPT and Perplexity for our core practice areas, while two smaller competitors were being cited constantly. Having a report that showed us exactly why was genuinely eye-opening. We fixed the schema gaps and saw citation improvement within weeks."' },
  { initials:'MJ', bg:'#1D4ED8', name:'Marcus Johnson', role:'Marketing Director, Apex Accounting, Chicago, IL', text:'"We assumed our SEO was solid because we ranked well on Google. The AI visibility audit showed a completely different picture — 0 mentions in any AI platform for our core services. The action plan was specific and immediately implementable. Invaluable for where search is heading."' },
  { initials:'PW', bg:'#7C3AED', name:'Priya Watts', role:'Founder, NutriBalance, Sydney, AU', text:'"1Solutions audited our AI visibility and found that our main competitor was being recommended by ChatGPT 8 times more often. The content gap analysis showed us exactly which topics to write about. Six months later, we are appearing in ChatGPT answers regularly for our target queries."' },
  { initials:'DK', bg:'#0F766E', name:'Daniel Kim', role:'Head of Growth, SaaS Ventures, Toronto, CA', text:'"The competitor benchmarking section was worth the audit alone. Seeing exactly where our rivals appear in AI results — and why — gave us a 3-month content roadmap that we would never have built without this data. Everything was actionable, not theoretical."' },
  { initials:'SB', bg:'#BE185D', name:'Sophie Brennan', role:'Owner, Meridian Physiotherapy, Manchester, UK', text:'"As a local service business I had no idea AI search would affect me. The audit showed Google AI Overviews were already showing competitors ahead of us for 6 of our 8 target services. The schema fixes alone moved us into 3 AI Overview panels within a month."' },
];

const TESTIMONIALS_ROW2 = [
  { initials:'TC', bg:'#1D4ED8', name:'Thomas Crawford', role:'Digital Manager, Crawford Group, Melbourne, AU', text:'"We had done traditional SEO audits before but never specifically for AI visibility. The 1Solutions audit is a different beast entirely — it shows you the AI reality, not the traditional SERP reality. Those two things are increasingly divergent and this audit helps you see both clearly."' },
  { initials:'AN', bg:'#047857', name:'Alicia Nguyen', role:'CMO, FreshBrand Agency, San Francisco, CA', text:'"Our clients were asking why competitors appeared in ChatGPT answers and they did not. The 1Solutions AI audit gave us the answer and a plan. We have since run audits for 4 of our own clients using the methodology 1Solutions taught us in the report."' },
  { initials:'BH', bg:'#B45309', name:'Ben Harrison', role:'Founder, Clover Finance, Dublin, IE', text:'"The E-E-A-T section of the audit was a revelation. We had plenty of content but almost no author credentials, no expertise signals, nothing that tells AI platforms we are trustworthy sources. Fixed those gaps and our Perplexity citation rate improved dramatically."' },
  { initials:'LC', bg:'#0F3460', name:'Laura Chen', role:'Head of SEO, TechStack Inc, Austin, TX', text:'"The Knowledge Graph entity section was something I had read about but never truly understood until I saw our audit. Our entity was miscategorised and missing key attributes. Once fixed, our brand started appearing correctly in AI-generated company descriptions across multiple platforms."' },
  { initials:'JO', bg:'#9D174D', name:'James O\'Brien', role:'Owner, O\'Brien Architecture, Dublin, IE', text:'"Completely free, genuinely thorough, and delivered in 48 hours as promised. I was sceptical it would be a thinly veiled sales pitch. It was not. The audit had real data, real competitor comparisons, and a real prioritised action plan. Outstanding value."' },
];

const ROW1 = [...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1];
const ROW2 = [...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2];

const FAQS = [
  { q:'What exactly is AI visibility and why does it matter?', a:'AI visibility refers to how often and how prominently your brand, website, or content appears in answers generated by AI-powered platforms — including Google AI Overviews, ChatGPT, Perplexity, Bing Copilot, and Google Gemini. As of 2026, over 62% of Google searches trigger an AI Overview, and millions of users consult AI chatbots daily for product and service recommendations. If your business is not appearing in these AI answers, you are invisible to a rapidly growing segment of your target audience, regardless of how well you rank in traditional search.' },
  { q:'What platforms do you check in the AI visibility audit?', a:'We check Google AI Overviews (across multiple query types), ChatGPT (GPT-4 and GPT-4o), Perplexity.ai, Bing Copilot, Google Gemini, and Claude. We also review your Knowledge Panel presence in Google Search, your Featured Snippet appearances, People Also Ask box inclusions, and your voice search readiness. The specific platform mix may vary by industry based on where your audience is most active.' },
  { q:'How is this different from a regular SEO audit?', a:'A traditional SEO audit focuses on your rankings in Google\'s standard "blue link" results — keyword positions, technical issues, backlinks, and on-page optimisation. An AI visibility audit focuses on a completely different layer of search: whether AI systems understand, trust, and recommend your business when generating answers. The signals that drive AI visibility — schema markup quality, entity presence in Knowledge Graph, E-E-A-T signals, content format and comprehensiveness — are distinct from traditional ranking factors, though there is meaningful overlap.' },
  { q:'Is the audit really free? What is the catch?', a:'There is no catch. The audit is genuinely free with no obligation to purchase anything. We offer it because a real, useful audit demonstrates our expertise better than any sales pitch. Some businesses choose to engage us to implement the recommendations — that is how we generate revenue from this offer. But many take the report and implement it themselves, and that is completely fine. We would rather give you genuine value and have you remember us positively than push a service you are not ready for.' },
  { q:'How long does the audit take and how is it delivered?', a:'From the time of your discovery call, you will receive your completed audit report within 48 hours. The report is delivered as a PDF and, where relevant, a live Google Sheet with your competitive benchmark data. We also schedule a 20-minute debrief call to walk through the findings and answer any questions, so you leave with complete clarity on the action plan.' },
  { q:'What information do I need to provide for the audit?', a:'We need your business name, website URL, the geographic market you serve, your 5 to 10 most important target queries or services, and the names of 3 to 5 competitors you consider your main rivals online. Optionally, if you have existing Google Analytics, Search Console, or prior SEO reports, sharing access helps us give more precise recommendations. No technical knowledge is required on your side.' },
  { q:'What happens after the audit if I want help implementing?', a:'After reviewing your audit report, if you would like 1Solutions to implement the recommendations, we will prepare a tailored proposal covering the specific work identified. There is no pressure and no inflated scope — the proposal is based directly on what the audit found, not a pre-packaged service. Our AI visibility implementation services include schema markup deployment, content creation for AI citation opportunities, E-E-A-T signal building, and ongoing AI visibility monitoring.' },
];

const RELATED_TAGS = [
  { href:'/seo-services-company/',        label:'SEO Services',               cls:'pl-rtag-blue' },
  { href:'/seo-company-los-angeles/',     label:'SEO Company Los Angeles',    cls:'pl-rtag-violet' },
  { href:'/plumbing-seo-services/',       label:'Plumbing SEO Services',      cls:'pl-rtag-teal' },
  { href:'/local-seo-services/',          label:'Local SEO Services',         cls:'pl-rtag-indigo' },
  { href:'/content-marketing-services/', label:'Content Marketing',           cls:'pl-rtag-amber' },
  { href:'/link-building-services/',     label:'Link Building Services',      cls:'pl-rtag-green' },
  { href:'/seo-audit-services/',         label:'SEO Audit Services',          cls:'pl-rtag-orange' },
  { href:'/google-my-business-optimization/', label:'Google Business Profile', cls:'pl-rtag-rose' },
];

function useCountUp(target, duration, started) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf;
    const start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    const step = now => {
      const t = Math.min(1, (now - start) / duration);
      setValue(target * ease(t));
      if (t < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started]);
  return value;
}

function StatCard({ prefix, target, suffix, decimals, label, detail }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const value = useCountUp(target, 1800, started);
  const display = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
  return (
    <div ref={ref} className="pl-res-card">
      <div className="pl-res-metric">{prefix}{display}{suffix}</div>
      <div className="pl-res-label">{label}</div>
      <div className="pl-res-detail">{detail}</div>
    </div>
  );
}

export default function FreeAiVisibilityAudit() {
  const router = useRouter();
  const [openFaq, setOpenFaq]   = useState(0);
  const [formSt, setFormSt]     = useState('idle');
  const [utmParams, setUtmParams] = useState({});
  const recaptchaLoaded         = useRef(false);

  // Capture UTM params from URL for email campaign tracking
  useEffect(() => {
    const { utm_source, utm_medium, utm_campaign, utm_content, utm_term } = router.query;
    const params = {};
    if (utm_source)   params.utm_source   = utm_source;
    if (utm_medium)   params.utm_medium   = utm_medium;
    if (utm_campaign) params.utm_campaign = utm_campaign;
    if (utm_content)  params.utm_content  = utm_content;
    if (utm_term)     params.utm_term     = utm_term;
    if (Object.keys(params).length) setUtmParams(params);
  }, [router.query]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('pl-visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    document.querySelectorAll('.pl-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const contact = document.getElementById('aiv-contact');
    if (!contact) return;
    const rcObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !recaptchaLoaded.current) {
        const s = document.createElement('script');
        s.src = 'https://www.google.com/recaptcha/api.js?render=6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs';
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
    const fd      = new FormData(e.target);
    const name    = (fd.get('aiv-name')    || '').trim();
    const email   = (fd.get('aiv-email')   || '').trim();
    const phone   = (fd.get('aiv-phone')   || '').trim();
    const biz     = (fd.get('aiv-biz')     || '').trim();
    const website = (fd.get('aiv-website') || '').trim();
    const bizType = (fd.get('aiv-type')    || '').trim();
    const msg     = (fd.get('aiv-msg')     || '').trim();
    const consent = document.getElementById('aiv-consent')?.checked;
    if (!name || !email || !phone || !biz || !website || !msg || !consent) {
      setFormSt('validation'); return;
    }
    setFormSt('loading');
    try {
      const token = await new Promise(resolve => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'contact' }).then(resolve);
        });
      });
      const cc = fd.get('aiv-cc') || '';

      // Build UTM string for message
      const utmStr = Object.keys(utmParams).length
        ? '\n\n--- Campaign Tracking ---\n' + Object.entries(utmParams).map(([k, v]) => `${k}: ${v}`).join('\n')
        : '';

      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: (cc ? cc + ' ' : '') + phone,
          company: biz,
          message: `Website: ${website}\nBusiness Type: ${bizType}\n\n${msg}${utmStr}`,
          source: 'Free AI Visibility Audit Page',
          consent: true,
          recaptchaToken: token,
        }),
      });
      if (res.ok) { setFormSt('success'); e.target.reset(); }
      else { setFormSt('error'); }
    } catch { setFormSt('error'); }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Free AI Visibility Audit', item: 'https://www.1solutions.biz/free-ai-visibility-audit/' },
      ]},
      { '@type': 'Organization', '@id': 'https://www.1solutions.biz/#organization',
        name: '1Solutions', url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        description: 'Full-service digital agency offering AI visibility audits, SEO services, and digital marketing for businesses across the US, UK, Canada, and Australia.',
        address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '142', bestRating: '5' },
        sameAs: ['https://www.linkedin.com/company/1solutions/', 'https://x.com/1solutionsbiz', 'https://www.facebook.com/1solutionsbiz'],
      },
      { '@type': 'WebPage', '@id': 'https://www.1solutions.biz/free-ai-visibility-audit/',
        url: 'https://www.1solutions.biz/free-ai-visibility-audit/',
        name: 'Free AI Visibility Audit | See How You Appear in ChatGPT & Google AI | 1Solutions',
        description: 'Get a free AI visibility audit and discover how your brand appears in ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot. Competitor benchmarks, schema audit, E-E-A-T analysis, and action plan. Delivered in 48 hours.',
        dateModified: '2026-07-08', inLanguage: 'en-US',
      },
      { '@type': 'ProfessionalService',
        name: 'Free AI Visibility Audit',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Comprehensive AI visibility audit covering Google AI Overviews, ChatGPT citations, Perplexity, Bing Copilot, schema markup, E-E-A-T signals, competitor benchmarking, and an actionable improvement roadmap.',
        serviceType: 'AI Search Visibility Audit',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free AI visibility audit with no obligation' },
        areaServed: [
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'Australia' },
        ],
        url: 'https://www.1solutions.biz/free-ai-visibility-audit/',
      },
      { '@type': 'HowTo', name: 'How Our Free AI Visibility Audit Works',
        description: 'Our 6-step process from form submission to personalised audit report delivery.',
        step: PROCESS.map(s => ({ '@type': 'HowToStep', name: s.title, text: s.body })),
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };

  return (
    <>
      <Head>
        <title>Free AI Visibility Audit | See How You Appear in ChatGPT & AI Search | 1Solutions</title>
        <meta name="description" content="Get a free AI visibility audit and discover how your brand appears in ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot. Competitor benchmarks, schema audit, E-E-A-T analysis, and a prioritised action plan — delivered in 48 hours at zero cost." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/free-ai-visibility-audit/" />
        <meta property="og:title" content="Free AI Visibility Audit | 1Solutions" />
        <meta property="og:description" content="Discover how your brand appears in ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot. Free audit, competitor benchmark, and action plan. Delivered in 48 hours." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.1solutions.biz/free-ai-visibility-audit/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          /* ── Reuses pl- classes from global blog.css for shared elements ── */
          /* ── Page base ── */
          .pl-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);background-attachment:scroll;color:#0F1F40;line-height:1.6;overflow-x:hidden;position:relative}
          .pl-page *,.pl-page *::before,.pl-page *::after{box-sizing:border-box}
          .pl-orb1{position:fixed;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.28) 0%,rgba(139,92,246,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px)}
          .pl-orb2{position:fixed;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.22) 0%,rgba(245,158,11,0.10) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px)}
          .pl-orb3{position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.16) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px)}
          .pl-reveal{opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1)}
          .pl-visible{opacity:1;transform:translateY(0)}
          .pl-sec{padding:80px 40px;position:relative;z-index:1}
          .pl-in{max-width:1280px;margin:0 auto}
          .pl-white{background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08)}
          .pl-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block}
          .pl-h2{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:10px}
          .pl-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}
          .pl-glass{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color .22s,box-shadow .22s,transform .22s}
          .pl-glass:hover{border-color:rgba(217,119,6,0.25);box-shadow:0 8px 36px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px)}
          .pl-icon{width:44px;height:44px;background:linear-gradient(135deg,rgba(15,52,96,0.10),rgba(15,52,96,0.06));border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;flex-shrink:0}
          .pl-icon svg{width:20px;height:20px;color:#0F3460}
          .pl-card-h{font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:8px}
          .pl-card-p{font-size:13px;color:#4A6080;line-height:1.65}
          .pl-nbadge{width:40px;height:40px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:800;margin-bottom:16px;box-shadow:0 4px 12px rgba(15,52,96,0.25)}
          .pl-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .pl-g4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}

          /* ── HERO ── */
          .pl-hero{position:relative;z-index:1;padding:72px 40px 0;overflow:hidden}
          .pl-hero::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.10) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px)}
          .pl-hero::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.16) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px)}
          .pl-hero-inner{position:relative;z-index:2;text-align:center;max-width:920px;margin:0 auto}.pl-bc a:hover{color:#D97706}.pl-bc-sep{color:#d1d5db}
          .pl-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px}
          .pl-h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:18px;color:#0F1F40}
          .pl-hero-sub{font-size:16px;color:#3A507A;line-height:1.65;max-width:660px;margin:0 auto 28px}
          .pl-btns{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:32px}
          .pl-btn-p{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:8px;padding:14px 36px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);border-radius:50px;color:#fff;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .pl-btn-p:hover{background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,0.30)}
          .pl-btn-s{display:inline-flex;align-items:center;padding:14px 32px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .pl-btn-s:hover{background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}

          /* ── STATS BAR ── */
          .pl-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:20px 20px 0 0;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95)}
          .pl-stat{padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10)}
          .pl-stat:last-child{border-right:none}
          .pl-stat-v{font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1;margin-bottom:6px}
          .pl-stat-l{font-size:12px;color:#4A6080;font-weight:500}

          /* ── DARK / RESULTS ── */
          .pl-dark{padding:80px 40px;background:#fff;position:relative;z-index:1}
          .pl-dark-ey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;display:block;margin-bottom:10px}
          .pl-dark-h{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#0F1F40;margin-bottom:10px}
          .pl-dark-lead{font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px}
          .pl-res-card{background:linear-gradient(135deg,rgba(240,253,244,.90) 0%,rgba(255,255,255,1) 50%,rgba(254,252,232,.80) 100%);border:1px solid rgba(34,197,94,.18);border-radius:20px;padding:36px 24px;text-align:center;box-shadow:0 4px 24px rgba(34,197,94,.10),0 1px 0 rgba(255,255,255,.95) inset;transition:transform .22s,box-shadow .25s}
          .pl-res-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(34,197,94,.18),0 0 0 1px rgba(34,197,94,.25),0 1px 0 rgba(255,255,255,1) inset}
          .pl-res-metric{font-size:clamp(2.6rem,4.5vw,3.6rem);font-weight:900;letter-spacing:-0.04em;line-height:1;margin-bottom:10px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-variant-numeric:tabular-nums}
          .pl-res-label{font-size:13px;font-weight:700;color:#0F1F40;margin-bottom:6px}
          .pl-res-detail{font-size:11px;color:#6b7280;line-height:1.5}

          /* ── PILLS ── */
          .pl-pills{display:flex;flex-wrap:wrap;gap:10px}
          .pl-pill{display:inline-flex;align-items:center;gap:7px;border-radius:50px;padding:8px 16px;font-size:13px;font-weight:600;box-shadow:0 2px 10px rgba(0,0,0,0.07)}
          .pl-pill-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;opacity:.8}

          /* ── TESTIMONIALS ── */
          .pl-testi{padding:72px 0;background:#f8fafd;overflow:hidden;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1}
          .pl-testi-hd{max-width:1280px;margin:0 auto 40px;padding:0 40px;text-align:center}
          @keyframes pl-marqL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          @keyframes pl-marqR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
          .pl-trow{overflow:hidden;position:relative;margin-bottom:16px}
          .pl-trow:last-child{margin-bottom:0}
          .pl-tfade-l{position:absolute;left:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to right,#f8fafd,transparent);pointer-events:none}
          .pl-tfade-r{position:absolute;right:0;top:0;bottom:0;width:160px;z-index:1;background:linear-gradient(to left,#f8fafd,transparent);pointer-events:none}
          .pl-ttrack{display:flex;gap:20px;width:max-content;padding-left:20px;animation:pl-marqL 44s linear infinite;will-change:transform}
          .pl-ttrack-rev{display:flex;gap:20px;width:max-content;padding-left:20px;animation:pl-marqR 44s linear infinite;will-change:transform}
          .pl-trow:hover .pl-ttrack,.pl-trow:hover .pl-ttrack-rev{animation-play-state:paused}
          .pl-tcard{width:420px;flex-shrink:0;background:#fff;border:1px solid rgba(15,52,96,0.08);border-radius:16px;padding:24px;box-shadow:0 2px 16px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:12px;user-select:none;transition:border-color .2s}
          .pl-tcard:hover{border-color:rgba(217,119,6,0.30)}
          .pl-tcard-stars{color:#F59E0B;font-size:14px}
          .pl-tcard-text{font-size:14px;color:#374151;line-height:1.75;margin:0;flex-grow:1}
          .pl-tcard-author{display:flex;align-items:center;gap:12px;border-top:1px solid #f3f4f6;padding-top:14px}
          .pl-tcard-av{width:38px;height:38px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:12px}
          .pl-tcard-name{font-weight:700;color:#111827;font-size:13px}
          .pl-tcard-role{color:#9ca3af;font-size:11px;margin-top:1px}

          /* ── FREE BADGE ── */
          .aiv-free-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,rgba(34,197,94,0.15),rgba(34,197,94,0.08));border:1.5px solid rgba(34,197,94,0.35);border-radius:50px;padding:6px 16px;font-size:12px;font-weight:700;color:#15803D;margin-bottom:20px}
          .aiv-free-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;animation:aiv-pulse 2s ease-in-out infinite}
          @keyframes aiv-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.3)}}

          /* ── UTM NOTICE ── */
          .aiv-utm-notice{display:inline-flex;align-items:center;gap:6px;background:rgba(217,119,6,0.08);border:1px solid rgba(217,119,6,0.25);border-radius:8px;padding:6px 12px;font-size:11px;color:#92400e;font-weight:600;margin-bottom:12px}

          /* ── CONTACT ── */
          .pl-contact-sec{padding:80px 40px;position:relative;z-index:1}
          .pl-contact-in{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:48px}
          .pl-contact-left h2{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;line-height:1.2;margin:0 0 16px;color:#0F1F40;letter-spacing:-0.5px}
          .pl-contact-left p{font-size:14px;color:#4A6080;line-height:1.65;margin:0 0 24px}
          .pl-trust-box{background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1.5px solid rgba(217,119,6,0.25);border-radius:16px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:14px}
          .pl-trust-row{display:flex;gap:12px;align-items:flex-start}
          .pl-trust-row svg{color:#D97706;flex-shrink:0;margin-top:2px}
          .pl-trust-row span{font-size:13px;color:#4A6080;line-height:1.55}
          .pl-cs{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-top:20px;border-top:1px solid rgba(15,52,96,0.10)}
          .pl-cs-num{font-size:32px;font-weight:900;color:#0F3460;line-height:1;margin-bottom:4px}
          .pl-cs-lbl{font-size:12px;color:#4A6080;font-weight:500;line-height:1.4}
          .pl-form-box{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1)}
          .pl-form-box h3{font-size:20px;font-weight:700;margin:0 0 22px;color:#0F1F40;letter-spacing:-0.5px}
          .pl-form{display:flex;flex-direction:column;gap:14px}
          .pl-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .pl-fg{display:flex;flex-direction:column;gap:5px}
          .pl-fg label{font-size:12px;font-weight:600;color:#0F1F40}
          .pl-fg input,.pl-fg textarea,.pl-fg select{padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:8px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.60);transition:border-color .2s,background .2s;width:100%}
          .pl-fg input:focus,.pl-fg textarea:focus,.pl-fg select:focus{outline:none;border-color:#D97706;background:rgba(255,255,255,0.95);box-shadow:0 0 0 3px rgba(217,119,6,0.12)}
          .pl-fg textarea{resize:vertical}
          .pl-phone-wrap{display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:8px;overflow:hidden;background:rgba(255,255,255,0.60)}
          .pl-phone-wrap select{padding:10px;border:none;background:transparent;font-size:12px;width:auto!important;min-width:70px;max-width:90px;color:#0F1F40;font-family:inherit;flex-shrink:0}
          .pl-phone-wrap input{flex:1!important;width:auto!important;min-width:0!important;border:none!important;border-radius:0!important;padding:10px 14px!important;background:rgba(255,255,255,0.60)!important}
          .pl-phone-wrap input:focus{outline:none!important;box-shadow:none!important;background:rgba(255,255,255,0.95)!important}
          .pl-consent{display:flex;gap:8px;align-items:flex-start}
          .pl-consent input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;flex-shrink:0;accent-color:#D97706}
          .pl-consent label{font-size:11px;color:#4A6080;line-height:1.5;margin:0}
          .pl-consent a{color:#0F3460;text-decoration:none}
          .pl-submit{padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .3s;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25)}
          .pl-submit:hover:not(:disabled){background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px)}
          .pl-submit:disabled{opacity:.65;cursor:not-allowed}
          .pl-success{text-align:center;padding:32px 0}
          .pl-success-icon{width:60px;height:60px;background:linear-gradient(135deg,#0F3460,#1a4b82);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;box-shadow:0 8px 24px rgba(15,52,96,0.25)}
          .pl-success-icon svg{width:28px;height:28px;stroke:#fff;fill:none}
          .pl-success h3{font-size:20px;font-weight:700;color:#0F1F40;margin:0 0 10px}
          .pl-success p{font-size:14px;color:#4A6080;margin:0;line-height:1.6}
          .pl-val-err{background:rgba(220,38,38,0.06);border:1px solid rgba(220,38,38,0.20);border-radius:8px;padding:10px 14px;font-size:13px;color:#dc2626}

          /* ── FAQ ── */
          .pl-faq-list{display:flex;flex-direction:column;gap:12px}
          .pl-fitem{background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color .2s,box-shadow .2s;position:relative}
          .pl-fitem.open{border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12)}
          .pl-fitem.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px}
          .pl-fq{width:100%;background:none;border:none;padding:20px 22px 20px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative}
          .pl-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.08);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background .2s,color .2s}
          .pl-fitem.open .pl-fq-badge{background:#D97706;color:#fff}
          .pl-fq-text{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45}
          .pl-fitem.open .pl-fq-text{color:#D97706}
          .pl-fq-chev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .pl-fitem.open .pl-fq-chev{transform:rotate(180deg);color:#D97706}
          .pl-fa{font-size:14px;color:#4b5563;line-height:1.8;padding:0 22px 20px 60px}

          /* ── RELATED ── */
          .pl-related{background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px;position:relative;z-index:1}
          .pl-related-in{max-width:1280px;margin:0 auto;text-align:center}
          .pl-related-ey{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block}
          .pl-related-ttl{font-size:clamp(2rem,4vw,3rem);font-weight:900;line-height:1.15;letter-spacing:-1px;color:#111827;margin:0 0 16px}
          .pl-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px}
          .pl-related-divider{border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0}
          .pl-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px}
          .pl-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .25s}
          .pl-rtag:hover{filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10)}
          .pl-rtag-blue{background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8}
          .pl-rtag-violet{background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9}
          .pl-rtag-teal{background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E}
          .pl-rtag-indigo{background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA}
          .pl-rtag-amber{background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309}
          .pl-rtag-green{background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D}
          .pl-rtag-orange{background:rgba(249,115,22,0.10);border-color:rgba(249,115,22,0.30);color:#C2410C}
          .pl-rtag-rose{background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C}

          /* ── RESPONSIVE ── */
          @media(max-width:1024px){
            .pl-g3{grid-template-columns:repeat(2,1fr)}
            .pl-g4{grid-template-columns:repeat(2,1fr)}
            .pl-contact-in{grid-template-columns:1fr}
          }
          @media(max-width:768px){
            .pl-hero{padding:56px 24px 0}
            .pl-hero::before,.pl-hero::after{display:none}
            .pl-sec,.pl-dark,.pl-contact-sec,.pl-related,.pl-testi{padding-left:24px;padding-right:24px}
            .pl-testi-hd{padding:0 24px}
            .pl-stats{grid-template-columns:repeat(2,1fr);border-radius:16px 16px 0 0}
            .pl-stat:nth-child(2){border-right:none}
            .pl-stat:nth-child(3){border-top:1px solid rgba(15,52,96,0.10)}
            .pl-stat:nth-child(4){border-top:1px solid rgba(15,52,96,0.10);border-right:none}
            .pl-btns{flex-direction:column;align-items:center}
            .pl-g3{grid-template-columns:1fr}
            .pl-g4{grid-template-columns:repeat(2,1fr)}
            .pl-row2{grid-template-columns:1fr}
            .pl-tcard{width:300px}
            .pl-orb1,.pl-orb2,.pl-orb3{display:none}
            .pl-glass,.pl-form-box,.pl-trust-box,.pl-stats,.pl-fitem{backdrop-filter:none;-webkit-backdrop-filter:none}
            .pl-btn-p,.pl-btn-s,.pl-submit{backdrop-filter:none;-webkit-backdrop-filter:none}
            .pl-related{backdrop-filter:none;-webkit-backdrop-filter:none}
            .pl-trow:last-child{display:none}
          }
          @media(max-width:480px){
            .pl-tcard{width:270px;padding:18px}
            .pl-g4{grid-template-columns:1fr 1fr}
          }
        
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>

      <div className="pl-page">
        <div className="pl-orb1"/><div className="pl-orb2"/><div className="pl-orb3"/>

        {/* ── HERO ── */}
        <section className="pl-hero">
          <div className="pl-hero-inner">
            <div className="aiv-free-badge">
              <span className="aiv-free-dot"/>
              100% Free · No Credit Card · No Obligation
            </div>
            <span className="pl-eyebrow">AI Overviews · ChatGPT · Perplexity · Bing Copilot · Gemini</span>
            <h1 className="pl-h1">Is Your Business Visible<br/>in <AuroraText>AI Search Results?</AuroraText></h1>
            <p className="pl-hero-sub">62% of Google searches now show AI-generated answers. Millions of buyers ask ChatGPT and Perplexity for recommendations every day. Find out if your brand is being cited — or being ignored — with a free, expert AI visibility audit from 1Solutions.</p>
            <div className="pl-btns">
              <a href="#aiv-contact" className="pl-btn-p">
                Claim Your Free AI Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#what-we-audit" className="pl-btn-s">See What We Audit</a>
            </div>
            <div className="pl-stats">
              {STATS_HERO.map(s => (
                <div key={s.label} className="pl-stat">
                  <div className="pl-stat-v">{s.val}</div>
                  <div className="pl-stat-l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AI SIGNALS WE CHECK ── */}
        <section className="pl-sec pl-white">
          <div className="pl-in">
            <div className="pl-reveal">
              <span className="pl-ey">Platforms & Signals We Test</span>
              <h2 className="pl-h2">Every AI Platform Your Customers Use: <AuroraText>All in One Audit</AuroraText></h2>
              <p className="pl-lead">We systematically test your brand visibility across every major AI platform and search signal — not just one or two. If a potential customer is using it to find businesses like yours, we check it.</p>
            </div>
            <div className="pl-pills pl-reveal">
              {AUDIT_SIGNALS.map((k, i) => {
                const palette = [
                  {bg:'rgba(239,68,68,.10)',border:'rgba(239,68,68,.35)',color:'#991b1b',dot:'#ef4444'},
                  {bg:'rgba(217,119,6,.10)',border:'rgba(217,119,6,.35)',color:'#92400e',dot:'#D97706'},
                  {bg:'rgba(34,197,94,.10)',border:'rgba(34,197,94,.35)',color:'#14532d',dot:'#16a34a'},
                  {bg:'rgba(59,130,246,.10)',border:'rgba(59,130,246,.35)',color:'#1e3a8a',dot:'#3b82f6'},
                  {bg:'rgba(124,58,237,.10)',border:'rgba(124,58,237,.35)',color:'#4c1d95',dot:'#7c3aed'},
                  {bg:'rgba(20,184,166,.10)',border:'rgba(20,184,166,.35)',color:'#134e4a',dot:'#14b8a6'},
                ];
                const c = palette[i % palette.length];
                return (
                  <span key={k} className="pl-pill" style={{background:c.bg,border:`1px solid ${c.border}`,color:c.color}}>
                    <span className="pl-pill-dot" style={{background:c.dot}}/>
                    {k}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── WHAT WE AUDIT ── */}
        <section className="pl-sec" id="what-we-audit">
          <div className="pl-in">
            <div className="pl-reveal">
              <span className="pl-ey">What's Included</span>
              <h2 className="pl-h2">8 Dimensions of <AuroraText>AI Visibility</AuroraText> We Audit</h2>
              <p className="pl-lead">A comprehensive sweep across every factor that determines whether AI platforms cite, recommend, or ignore your business when your target customers ask for help.</p>
            </div>
            <div className="pl-g3">
              {WHAT_WE_AUDIT.map((s, i) => (
                <div key={s.title} className="pl-glass pl-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="pl-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon}/>
                    </svg>
                  </div>
                  <div className="pl-card-h">{s.title}</div>
                  <div className="pl-card-p">{s.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className="pl-dark">
          <div className="pl-in">
            <div className="pl-reveal" style={{textAlign:'center',marginBottom:48}}>
              <span className="pl-dark-ey">Why It Matters Now</span>
              <h2 className="pl-dark-h"><AuroraText>AI Search is Already Driving Decisions</AuroraText></h2>
              <p className="pl-dark-lead" style={{margin:'0 auto'}}>Businesses that optimise for AI visibility today will dominate the recommendations their competitors' customers see tomorrow.</p>
            </div>
            <div className="pl-g4 pl-reveal">
              {RESULTS.map(r => (
                <StatCard key={r.label} {...r}/>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="pl-sec pl-white" id="process">
          <div className="pl-in">
            <div className="pl-reveal">
              <span className="pl-ey">How It Works</span>
              <h2 className="pl-h2">From Sign-Up to <AuroraText>Report in 48 Hours</AuroraText></h2>
              <p className="pl-lead">A clear, transparent 6-step process. No lengthy onboarding, no jargon-filled questionnaires — just a fast, focused audit delivered by experienced specialists.</p>
            </div>
            <div className="pl-g3">
              {PROCESS.map((p, i) => (
                <div key={p.n} className="pl-glass pl-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="pl-nbadge">{p.n}</div>
                  <div className="pl-card-h">{p.title}</div>
                  <div className="pl-card-p">{p.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY 1SOLUTIONS ── */}
        <section className="pl-sec" id="why-us">
          <div className="pl-in">
            <div className="pl-reveal">
              <span className="pl-ey">Why 1Solutions</span>
              <h2 className="pl-h2">The AI Visibility Audit <AuroraText>Built by Search Veterans</AuroraText></h2>
              <p className="pl-lead">15 years of search expertise applied to the newest frontier in digital marketing — AI-generated answers and recommendations.</p>
            </div>
            <div className="pl-g3">
              {WHY.map((w, i) => (
                <div key={w.title} className="pl-glass pl-reveal" style={{transitionDelay:`${i*60}ms`}}>
                  <div className="pl-nbadge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  </div>
                  <div className="pl-card-h">{w.title}</div>
                  <div className="pl-card-p">{w.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="pl-testi">
          <div className="pl-testi-hd pl-reveal">
            <span className="pl-ey">Client Reviews</span>
            <h2 className="pl-h2">What Businesses Say After Their <AuroraText>AI Visibility Audit</AuroraText></h2>
            <p style={{fontSize:15,color:'#4A6080',lineHeight:1.7,maxWidth:600,margin:'0 auto'}}>From legal firms to SaaS companies, the AI visibility audit delivers insights that traditional SEO tools simply cannot show.</p>
          </div>
          <div style={{marginTop:40}}>
            <div className="pl-trow">
              <div className="pl-tfade-l"/><div className="pl-tfade-r"/>
              <div className="pl-ttrack">
                {ROW1.map((t, i) => (
                  <div key={i} className="pl-tcard">
                    <div className="pl-tcard-stars">★★★★★</div>
                    <p className="pl-tcard-text">{t.text}</p>
                    <div className="pl-tcard-author">
                      <div className="pl-tcard-av" style={{background:t.bg}}>{t.initials}</div>
                      <div>
                        <div className="pl-tcard-name">{t.name}</div>
                        <div className="pl-tcard-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pl-trow">
              <div className="pl-tfade-l"/><div className="pl-tfade-r"/>
              <div className="pl-ttrack-rev">
                {ROW2.map((t, i) => (
                  <div key={i} className="pl-tcard">
                    <div className="pl-tcard-stars">★★★★★</div>
                    <p className="pl-tcard-text">{t.text}</p>
                    <div className="pl-tcard-author">
                      <div className="pl-tcard-av" style={{background:t.bg}}>{t.initials}</div>
                      <div>
                        <div className="pl-tcard-name">{t.name}</div>
                        <div className="pl-tcard-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ── */}
        <section className="pl-contact-sec" id="aiv-contact">
          <div className="pl-contact-in">
            <div className="pl-reveal">
              <span className="pl-ey">Claim Your Free Audit</span>
              <div className="pl-contact-left">
                <h2>Get Your Free <AuroraText>AI Visibility Audit</AuroraText></h2>
                <p>Tell us about your business and we will audit your presence across 10+ AI platforms, benchmark you against your top competitors, and deliver a prioritised action plan — completely free, within 48 hours.</p>
              </div>
              {Object.keys(utmParams).length > 0 && (
                <div className="aiv-utm-notice">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Campaign tracked — your submission will be attributed correctly
                </div>
              )}
              <div className="pl-trust-box">
                {[
                  'Audited by an experienced AI search specialist, not an automated tool',
                  'Covers Google AI Overviews, ChatGPT, Perplexity, Gemini, and Bing Copilot',
                  'Full competitor benchmark — see exactly where rivals appear and you do not',
                  'Delivered within 48 hours with a debrief call included',
                ].map(b => (
                  <div key={b} className="pl-trust-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{b}</span>
                  </div>
                ))}
                <div className="pl-cs">
                  {[['500+','Audits Completed'],['15+','Years in Search'],['94%','Client Retention']].map(([n,l]) => (
                    <div key={l}><div className="pl-cs-num">{n}</div><div className="pl-cs-lbl">{l}</div></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pl-form-box pl-reveal">
              <h3>Request Your Free AI Visibility Audit</h3>
              {formSt === 'success' ? (
                <div className="pl-success">
                  <div className="pl-success-icon">
                    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3>Audit Request Received!</h3>
                  <p>An AI visibility specialist will reach out within 24 hours to schedule your 15-minute discovery call. Your report will be delivered within 48 hours of that call.</p>
                </div>
              ) : (
                <form className="pl-form" onSubmit={handleSubmit} noValidate>
                  {formSt === 'validation' && <p className="pl-val-err">Please complete all required fields and accept the terms before submitting.</p>}
                  {formSt === 'error'      && <p className="pl-val-err">Something went wrong. Please try again or email us at info@1solutions.biz.</p>}
                  <div className="pl-row2">
                    <div className="pl-fg">
                      <label htmlFor="aiv-name">Full Name *</label>
                      <input id="aiv-name" name="aiv-name" type="text" placeholder="Jane Smith" required/>
                    </div>
                    <div className="pl-fg">
                      <label htmlFor="aiv-email">Business Email *</label>
                      <input id="aiv-email" name="aiv-email" type="email" placeholder="jane@yourcompany.com" required/>
                    </div>
                  </div>
                  <div className="pl-row2">
                    <div className="pl-fg">
                      <label>Phone Number *</label>
                      <div className="pl-phone-wrap">
                        <select name="aiv-cc" aria-label="Country code">
                          <option value="+1">+1 US</option>
                          <option value="+1">+1 CA</option>
                          <option value="+61">+61 AU</option>
                          <option value="+44">+44 GB</option>
                          <option value="+91">+91 IN</option>
                        </select>
                        <input name="aiv-phone" type="tel" placeholder="Phone number" required aria-label="Phone number"/>
                      </div>
                    </div>
                    <div className="pl-fg">
                      <label htmlFor="aiv-biz">Business Name *</label>
                      <input id="aiv-biz" name="aiv-biz" type="text" placeholder="Your Company Ltd" required/>
                    </div>
                  </div>
                  <div className="pl-row2">
                    <div className="pl-fg">
                      <label htmlFor="aiv-website">Website URL *</label>
                      <input id="aiv-website" name="aiv-website" type="url" placeholder="https://yourwebsite.com" required/>
                    </div>
                    <div className="pl-fg">
                      <label htmlFor="aiv-type">Business Type</label>
                      <select id="aiv-type" name="aiv-type">
                        <option value="">Select type…</option>
                        <option>Local Service Business</option>
                        <option>E-commerce / Retail</option>
                        <option>SaaS / Technology</option>
                        <option>Professional Services</option>
                        <option>Healthcare / Medical</option>
                        <option>Finance / Legal</option>
                        <option>Education</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="pl-fg">
                    <label htmlFor="aiv-msg">What queries should customers find you for? *</label>
                    <textarea id="aiv-msg" name="aiv-msg" rows={4} placeholder="e.g. 'best SEO agency in London', 'affordable accounting software for small business', your 5–10 most important search queries and 3–5 main competitors..." required/>
                  </div>
                  <div className="pl-consent">
                    <input type="checkbox" id="aiv-consent"/>
                    <label htmlFor="aiv-consent">
                      I agree to the <Link href="/privacy-policy/">Privacy Policy</Link> and consent to 1Solutions storing my data to respond to this enquiry. *
                    </label>
                  </div>
                  <button type="submit" className="pl-submit" disabled={formSt === 'loading'}>
                    {formSt === 'loading' ? 'Sending…' : 'Send My Free AI Audit Request →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="pl-sec pl-white" id="faq">
          <div className="pl-in" style={{maxWidth:860,margin:'0 auto'}}>
            <div className="pl-reveal" style={{textAlign:'center',marginBottom:40}}>
              <span className="pl-ey">Got Questions?</span>
              <h2 className="pl-h2"><AuroraText>AI Visibility Audit</AuroraText> FAQs</h2>
              <p className="pl-lead" style={{margin:'0 auto'}}>Everything you need to know before requesting your free audit.</p>
            </div>
            <div className="pl-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={'pl-fitem' + (openFaq === i ? ' open' : '')}>
                  <button className="pl-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span className="pl-fq-badge">{String(i+1).padStart(2,'0')}</span>
                    <span className="pl-fq-text">{f.q}</span>
                    <svg className="pl-fq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFaq === i && <div className="pl-fa">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="pl-related">
          <div className="pl-related-in pl-reveal">
            <span className="pl-related-ey">EXPLORE RELATED SERVICES</span>
            <h2 className="pl-related-ttl">Related <AuroraText>SEO & Digital Marketing</AuroraText> Services</h2>
            <p className="pl-related-sub">Pair your AI visibility audit with complementary services to build a complete digital presence that performs across both traditional and AI-powered search.</p>
            <hr className="pl-related-divider"/>
            <div className="pl-related-tags">
              {RELATED_TAGS.map(({href, label, cls}) => (
                <Link key={href} href={href} className={`pl-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
