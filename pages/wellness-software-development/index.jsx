'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' }, { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://www.1solutions.biz/#industries' }, { '@type': 'ListItem', position: 3, name: 'Wellness Software', item: 'https://www.1solutions.biz/wellness-software-development/' }] },
    { '@type': 'Service', name: 'Wellness Software Development', url: 'https://www.1solutions.biz/wellness-software-development/', description: '1Solutions builds custom digital wellness and health tech software — mental health apps, fitness and coaching platforms, corporate wellness portals, nutrition tracking apps, meditation and mindfulness apps, chronic disease management tools, wellness marketplace platforms, and wearable device integration. 15+ years, 65+ wellness and digital health projects.', provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '58', bestRating: '5' } },
    { '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'What wellness software does 1Solutions build?', acceptedAnswer: { '@type': 'Answer', text: '1Solutions builds mental health and therapy apps, fitness and personal coaching platforms, corporate wellness portals, nutrition and meal planning apps, meditation and mindfulness apps, sleep tracking and improvement platforms, chronic disease self-management tools, wellness marketplace platforms (connecting users with practitioners), wearable device integration (Apple Health, Google Fit, Garmin, Fitbit), and digital wellness analytics dashboards.' } },
      { '@type': 'Question', name: 'Do you build HIPAA-compliant wellness apps?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — 1Solutions builds HIPAA-compliant wellness and digital health apps. This includes end-to-end encryption for health data at rest and in transit, role-based access controls, audit logging, BAA (Business Associate Agreement) with cloud providers, secure telehealth video (HIPAA-compliant WebRTC), data residency controls, and penetration testing. We also support GDPR (EU), My Health Records Act (AU), and equivalent data privacy regulations.' } },
    ] },
  ],
};

const SOLUTIONS = [
  { n: '01', title: 'Mental Health & Therapy App', desc: 'Digital mental health platform — therapist / coach profile marketplace, HIPAA-compliant booking and video sessions (WebRTC), secure messaging between user and therapist, mood tracking journal (CBT-style prompts, emotion logging), clinical assessment tools (PHQ-9, GAD-7, AUDIT digitised), crisis resource integration, anonymous peer support community, and outcome tracking over time.', feat: true },
  { n: '02', title: 'Fitness & Personal Coaching Platform', desc: 'Fitness and coaching SaaS — coach profile and client management, custom workout plan builder (exercise library with video demos, sets/reps/rest), client progress tracking (weight, body measurements, performance benchmarks), live class scheduling and booking, on-demand video library, in-app messaging between coach and client, nutrition plan integration, and coach revenue dashboard.' },
  { n: '03', title: 'Corporate Wellness Portal', desc: 'Employee wellness platform — company-branded portal, wellness challenge builder (steps, hydration, sleep, mindfulness), points and rewards system, wellbeing survey and pulse check tools (burnout indicators, engagement score), EAP (Employee Assistance Programme) resource hub, subsidised fitness class booking, anonymised workforce health analytics for HR, and SSO integration with Okta or Azure AD.' },
  { n: '04', title: 'Nutrition & Meal Planning App', desc: 'Digital nutrition coaching app — food diary with barcode scanner (Open Food Facts, USDA FoodData Central), macro and micronutrient tracking, AI meal plan generator (based on goals, dietary restrictions, preferred cuisines), recipe database and customisation, grocery list generator, registered dietitian consultation booking, progress charts (weight trend, macro adherence), and Apple Health / Google Fit sync.', feat: true },
  { n: '05', title: 'Meditation & Mindfulness App', desc: 'Mindfulness and meditation platform — guided meditation audio library (original recordings), breathing exercises (4-7-8, box breathing, Wim Hof), sleep story and body scan content, daily mindfulness streak and reminder, in-app journal, personalised programme recommendation based on stress, sleep, or focus goals, corporate licence for team mindfulness sessions, and premium subscription billing.' },
  { n: '06', title: 'Sleep Tracking & Improvement Platform', desc: 'Sleep health platform — wearable integration (Apple Watch, Garmin, Fitbit, Oura Ring) for sleep stage data (REM, deep, light, awake), sleep hygiene checklist and personalised recommendations, cognitive behavioural therapy for insomnia (CBT-I) programme modules, sleep debt calculator, environmental factors logging (caffeine, alcohol, screen time), trend analysis, and clinician dashboard for sleep disorder screening.' },
  { n: '07', title: 'Chronic Disease Self-Management App', desc: 'Digital self-management tool for chronic conditions — symptom and medication logging (with dose reminders), condition-specific dashboards (diabetes: glucose log, HbA1c trend; hypertension: BP readings; asthma: peak flow log), HL7 FHIR integration for EHR data pull, GP report generation (PDF export of logs), care team messaging, patient education content library, and outcome measurement (quality of life scales).' },
  { n: '08', title: 'Wellness Marketplace Platform', desc: 'Multi-vendor wellness marketplace — practitioner profiles and service listings (personal trainers, yoga instructors, nutritionists, physiotherapists, life coaches), booking and calendar management, video consultation (Zoom SDK or custom WebRTC), reviews and ratings, package and subscription purchase, commission-based billing with practitioner payouts (Stripe Connect), and consumer mobile app.' },
  { n: '09', title: 'Wearable & IoT Health Integration', desc: 'Wearable data integration layer — Apple HealthKit and Apple Watch SDK, Google Fit API and Wear OS SDK, Garmin Connect IQ and Health API, Fitbit Web API, Oura Ring API, Withings (scales, BP cuffs), and continuous glucose monitors (Dexcom, Libre APIs). Data normalised into a unified health timeline with trend analytics, anomaly alerting, and practitioner-shareable health summaries.' },
  { n: '10', title: 'Wellness Analytics & Population Health', desc: 'Analytics for wellness platforms and corporate clients — user engagement analytics (session frequency, streak retention, feature adoption), programme completion rates, health outcome tracking (pre-post assessment comparisons), population health segmentation (high-risk user identification), NPS and satisfaction surveys, employer ROI reporting (absenteeism, EAP utilisation, productivity proxy scores), and HIPAA/GDPR-compliant data exports.' },
];

const TECH_STACK = [
  { group: 'Mobile & Wearable', color: '#4a1942', items: ['React Native', 'Apple HealthKit', 'Google Fit API', 'Garmin / Fitbit API', 'Oura / Withings API', 'Watch OS / Wear OS'] },
  { group: 'Telehealth & Video', color: '#701a75', items: ['WebRTC (HIPAA)', 'Twilio Video', 'Daily.co / Whereby SDK', 'Secure messaging', 'E2E encryption', 'Recording & storage'] },
  { group: 'Frontend & Web', color: '#9333ea', items: ['React / Next.js', 'TypeScript', 'Recharts / D3 (charts)', 'Tailwind / CSS-in-JS', 'Storybook', 'Accessibility (WCAG 2.1)'] },
  { group: 'Backend & APIs', color: '#7c3aed', items: ['Node.js / NestJS', 'Python / FastAPI', 'GraphQL / REST', 'HL7 FHIR (EHR)', 'WebSocket (chat)', 'Celery / BullMQ'] },
  { group: 'Auth & Compliance', color: '#a21caf', items: ['Auth0 / Cognito', 'SSO / SAML', 'HIPAA encryption (AES-256)', 'Audit logging', 'BAA with AWS/GCP', 'GDPR / My Health Records'] },
  { group: 'AI & Personalisation', color: '#6d28d9', items: ['OpenAI API (coach assist)', 'Recommendation models', 'Mood / symptom NLP', 'Clinical risk scoring', 'Content personalisation', 'Python ML (scikit-learn)'] },
  { group: 'Payments & Billing', color: '#0369a1', items: ['Stripe / Braintree', 'Stripe Connect (payouts)', 'Subscription billing', 'Corporate invoicing', 'Package / credit packs', 'Insurance billing (US)'] },
  { group: 'Cloud & DevOps', color: '#dc2626', items: ['AWS / GCP (HIPAA BAA)', 'Kubernetes / ECS', 'Terraform (IaC)', 'GitHub Actions CI/CD', 'Datadog / Sentry', 'HIPAA pen testing'] },
];

const ENGAGEMENT = [
  { id: 'app', name: 'Custom Wellness App', badge: 'Most Popular', bc: '#D97706', feat: true, icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', headline: 'Digital wellness product from MVP to launch.', desc: 'Full-cycle wellness app development — user-facing iOS/Android app, practitioner portal, booking and billing, HIPAA/GDPR compliance, wearable integrations, and analytics. Discovery → design → agile sprints → launch.', best: ['Wellness startups building a B2C mental health or fitness app', 'Dietitians or personal trainers productising their coaching into a SaaS', 'Employers building a branded employee wellness platform', 'HealthTech companies adding a consumer wellness product line'], tl: 'MVP live in 10–14 weeks; full platform 5–8 months' },
  { id: 'corporate', name: 'Corporate Wellness Portal', badge: 'Enterprise Demand', bc: '#4a1942', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', headline: 'SSO-integrated wellbeing portal for your employees.', desc: 'Company-branded corporate wellness portal — wellness challenges, points and rewards, wellbeing surveys, EAP resource hub, subsidised class booking, anonymised HR analytics, and SSO integration with your existing identity provider.', best: ['HR teams rolling out a company-wide employee wellbeing programme', 'Insurers building a corporate wellness product for employer clients', 'EAP providers building a digital companion to their telephone service', 'Benefits platforms adding a digital wellness module to their offering'], tl: 'Corporate portal live in 8–12 weeks' },
  { id: 'integration', name: 'Wearable & EHR Integration', badge: 'Technical Specialist', bc: '#0369a1', icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18', headline: 'Connect wearables and EHR to your wellness platform.', desc: 'Specialist integration work — Apple HealthKit, Google Fit, Garmin, Fitbit, Oura, Withings, CGM APIs, and HL7 FHIR integration with EHR systems (Epic, Cerner, Athena) for a unified health data layer.', best: ['Wellness apps adding wearable data without an in-house iOS/Android team', 'Digital health companies building HL7 FHIR integration for care coordination', 'Corporate wellness platforms pulling employee biometric data from wearables', 'Clinical platforms needing CGM data (Dexcom/Libre) in their patient view'], tl: 'First wearable integration live in 4–8 weeks' },
];

const TESTIMONIALS = [
  { text: "1Solutions built our digital mental health platform — therapist marketplace, HIPAA-compliant video sessions, mood tracking journal, PHQ-9 and GAD-7 digital assessments, and peer support community. We onboarded 120 licensed therapists in the first 3 months and reached 18,000 active users within a year. The compliance architecture passed our HIPAA audit without a single finding.", name: 'Dr. Rachel S.', role: 'CEO, Mental Health Platform (US)', init: 'RS', bg: '#280d38' },
  { text: "1Solutions built our corporate wellness portal for a 6,000-person organisation — company-branded, integrated with Azure AD for SSO, wellness challenges, anonymised HR analytics, and EAP resource hub. Employee engagement with wellbeing initiatives increased from 12% to 67% in the first programme cycle. HR now has data to justify the investment to the board.", name: 'Michael C.', role: 'Head of People & Culture, Professional Services Firm (AU)', init: 'MC', bg: '#1e0a2e', feat: true },
  { text: "1Solutions built our nutrition and fitness coaching platform — custom meal plan generator, barcode food scanning, macro tracking, Apple Health and Garmin sync, and a coach revenue dashboard. Our dietitians can now manage 3x more clients through the platform than they could through manual spreadsheets. Revenue per dietitian increased 240% in year one.", name: 'Emma B.', role: 'Founder, Nutrition Coaching Platform (UK)', init: 'EB', bg: '#1e3a5f' },
];

const WHY = [
  { t: '65+ Wellness & Digital Health Projects', d: '1Solutions has built mental health apps, fitness and coaching platforms, corporate wellness portals, nutrition apps, meditation tools, chronic disease self-management, wellness marketplaces, and wearable integrations over 15+ years.' },
  { t: 'HIPAA & GDPR Compliance Depth', d: 'AES-256 encryption at rest and in transit, role-based access controls, audit logging, BAA with AWS and GCP, HIPAA-compliant video (WebRTC), data residency controls, and penetration testing — we understand what regulators actually look for.' },
  { t: 'Wearable Integration Breadth', d: 'Apple HealthKit, Apple Watch SDK, Google Fit API, Wear OS SDK, Garmin Health API, Fitbit Web API, Oura Ring API, Withings, Dexcom, and Libre — we maintain integrations for the full wearable ecosystem, not just one platform.' },
  { t: 'HL7 FHIR & EHR Connectivity', d: 'HL7 FHIR R4 implementation for pulling patient data from Epic, Cerner, and Athena EHR systems — care coordination, patient portal integration, and clinician-facing data from consumer wellness apps feeding into the clinical record.' },
  { t: 'Clinical Workflow Understanding', d: 'Wellness apps that touch clinical outcomes must understand clinical workflows — assessment tool digitisation (PHQ-9, GAD-7, AUDIT), care plan management, outcome measurement, and clinician-facing dashboards that fit into real care team processes.' },
  { t: 'Behaviour Change Product Design', d: 'Wellness apps must drive sustained behaviour change, not just first-session engagement. We design onboarding flows, streak mechanics, progress visualisation, personalised coaching nudges, and habit cue-routine-reward loops grounded in behaviour change science.' },
  { t: 'Corporate HR & Benefits Integration', d: 'SSO (Okta, Azure AD, Google Workspace), HRIS integration (Workday, BambooHR), anonymised aggregate reporting for HR, and payroll deduction for benefits — we know what enterprise HR buyers need before they ask.' },
  { t: 'AI-Assisted Wellness Features', d: 'Mood analysis from journal text, AI meal plan generation, personalised programme recommendation, clinical risk flagging (early identification of high-risk users for clinical escalation), and coaching message suggestions — AI as a productivity multiplier for wellness practitioners.' },
];

const FAQS = [
  { q: 'What wellness software does 1Solutions build?', a: 'Mental health and therapy apps, fitness and personal coaching platforms, corporate wellness portals, nutrition and meal planning apps, meditation and mindfulness apps, sleep tracking platforms, chronic disease self-management apps, wellness marketplace platforms, wearable device integrations, and wellness analytics dashboards.' },
  { q: 'Do you build HIPAA-compliant wellness apps?', a: 'Yes — AES-256 encryption at rest and in transit, role-based access controls, audit logging, BAA with AWS/GCP, HIPAA-compliant telehealth video, data residency controls, and penetration testing. We also support GDPR (EU), My Health Records Act (AU), and equivalent data privacy regulations.' },
  { q: 'Can you integrate Apple Health and Google Fit into a wellness app?', a: 'Yes — Apple HealthKit for iOS (steps, heart rate, sleep, HRV, workout data), Google Fit API for Android, Garmin Health API, Fitbit Web API, Oura Ring API, and Withings for smart scales and BP cuffs. Data is normalised into a unified health timeline in our backend.' },
  { q: 'Can you build a telehealth video consultation feature?', a: 'Yes — HIPAA-compliant WebRTC-based video sessions using Twilio Video, Daily.co, or a custom WebRTC implementation. End-to-end encryption, session recording (with consent), waiting room, practitioner scheduling and availability, and appointment reminders via email and push notification.' },
  { q: 'Do you build corporate wellness platforms with SSO?', a: 'Yes — SSO integration with Okta, Azure AD (Microsoft Entra), and Google Workspace via SAML 2.0 or OIDC. HRIS integration (Workday, BambooHR) for employee roster sync. Anonymised aggregate wellbeing analytics for HR. Company-branded portal with custom domain.' },
  { q: 'Can you build a wellness marketplace for practitioners?', a: 'Yes — multi-vendor marketplace with practitioner profiles, service listings, booking and calendar management, video consultation, reviews and ratings, package and subscription purchase, commission billing with Stripe Connect payouts, and consumer iOS/Android app.' },
  { q: 'How do you handle clinical risk in mental health apps?', a: 'Crisis resource integration (emergency service links and safe messaging guidelines), clinical risk scoring from mood and assessment data (flagging users scoring above clinical thresholds), escalation workflows to clinical team members, mandatory safety check-in features for users identified as high-risk, and audit logs for all high-risk events.' },
  { q: 'What technology stack do you use for wellness apps?', a: 'Mobile: React Native with HealthKit/Google Fit SDK. Backend: Node.js/NestJS or Python/FastAPI. Auth: Auth0 with HIPAA audit logging. Video: Twilio or WebRTC. Payments: Stripe Connect. Wearables: native iOS/Android SDKs. EHR: HL7 FHIR R4. Cloud: AWS or GCP with HIPAA BAA.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => { if (!start) return; const n = parseInt(target.replace(/\D/g, ''), 10); if (!n) return; let t0 = null; const s = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * n)); if (p < 1) requestAnimationFrame(s); }; requestAnimationFrame(s); }, [start, target, duration]);
  return count;
}
function StatItem({ label, val, started }) {
  const n = useCountUp(val, 1800, started);
  const sfx = val.replace(/[\d,]/g, '');
  return (<div className="wls-sc"><div className="wls-sv">{started ? n + sfx : val}</div><div className="wls-sl">{label}</div></div>);
}

export default function WellnessSoftware() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [ss, setSs] = useState(false);
  const [vis, setVis] = useState(new Set());
  const [vSk, setVSk] = useState([]); const [vEn, setVEn] = useState([]); const [vWh, setVWh] = useState([]); const [vTe, setVTe] = useState([]); const [vSt, setVSt] = useState([]);
  const stR = useRef(null); const secR = useRef({});
  const skR = useRef(null); const enR = useRef(null); const whR = useRef(null); const teR = useRef(null); const stGr = useRef(null);
  useEffect(() => { if (!stR.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSs(true); o.disconnect(); } }, { threshold: 0.4 }); o.observe(stR.current); return () => o.disconnect(); }, []);
  useEffect(() => {
    const pairs = [[skR, SOLUTIONS.length, setVSk], [enR, 3, setVEn], [whR, WHY.length, setVWh], [teR, 3, setVTe], [stGr, TECH_STACK.length, setVSt]];
    const obs = pairs.map(([ref, count, setter]) => { if (!ref.current) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 75)); o.disconnect(); } }, { threshold: 0.05 }); o.observe(ref.current); return o; });
    return () => obs.forEach(o => o?.disconnect());
  }, []);
  useEffect(() => { const ks = Object.keys(secR.current); const obs = ks.map(k => { const el = secR.current[k]; if (!el) return null; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(p => new Set([...p, k])); o.disconnect(); } }, { threshold: 0.1 }); o.observe(el); return o; }); return () => obs.forEach(o => o?.disconnect()); }, []);
  const visS = showAll ? SOLUTIONS : SOLUTIONS.slice(0, 6);
  const ac = '#4a1942'; const ac2 = '#7c3aed'; const txt = '#2d0d30'; const txt2 = '#581c87';
  return (
    <>
      <Head>
        <title>Wellness Software Development | Mental Health App, Fitness Platform, Corporate Wellness | 1Solutions</title>
        <meta name="description" content="Custom wellness software development — mental health apps, fitness and coaching platforms, corporate wellness portals, nutrition apps, meditation apps, wearable integration, and HIPAA/GDPR compliance. 65+ wellness projects. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/wellness-software-development/" />
        <meta property="og:title" content="Wellness Software Development | Digital Health & Wellbeing Tech | 1Solutions" />
        <meta property="og:description" content="Mental health apps, fitness coaching platforms, corporate wellness portals, nutrition apps, wearable integration, and HIPAA compliance. 65+ digital wellness projects." />
        <meta property="og:url" content="https://www.1solutions.biz/wellness-software-development/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .wls-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#fdf4ff 0%,#f5d0fe 20%,#fdf4ff 50%,#fce7f3 75%,#fef3c7 100%);color:${txt};line-height:1.6;position:relative;overflow-x:hidden}
          .wls-page *,.wls-page *::before,.wls-page *::after{box-sizing:border-box}
          .wls-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .wls-o1{width:800px;height:800px;background:radial-gradient(circle,rgba(74,25,66,.16) 0%,transparent 70%);top:-220px;right:-200px}
          .wls-o2{width:700px;height:700px;background:radial-gradient(circle,rgba(124,58,237,.12) 0%,transparent 70%);bottom:0;left:-200px}
          .wls-o3{width:480px;height:480px;background:radial-gradient(circle,rgba(217,119,6,.08) 0%,transparent 70%);top:42%;left:-90px}
          .wls-bc{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .wls-bc ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:${ac2}}
          .wls-bc li{display:flex;align-items:center;gap:6px}.wls-bc li::after{content:'/';opacity:.45}.wls-bc li:last-child::after{display:none}
          .wls-bc a{color:${txt};text-decoration:none}
          .wls-hero{position:relative;z-index:2;text-align:center;max-width:940px;margin:0 auto;padding:44px 40px 28px}
          .wls-ey{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${ac2};margin-bottom:14px}
          .wls-hero h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .wls-desc{font-size:16px;color:${txt2};line-height:1.65;max-width:720px;margin:0 auto 22px}
          .wls-tr{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;margin-bottom:24px}
          .wls-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:5px 13px;font-size:12px;font-weight:600;color:${txt};box-shadow:0 2px 8px rgba(74,25,66,.07)}
          .wls-dot{width:7px;height:7px;border-radius:50%;background:${ac2};flex-shrink:0}
          .wls-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .wls-p{display:inline-block;padding:13px 34px;background:${ac};color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(74,25,66,.28)}
          .wls-p:hover{background:${txt};transform:translateY(-2px)}
          .wls-g{display:inline-block;padding:13px 34px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:${txt};font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .wls-g:hover{background:rgba(255,255,255,.85);border-color:rgba(74,25,66,.5);transform:translateY(-2px)}
          .wls-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:920px;margin:26px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(74,25,66,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .wls-sc{padding:18px 16px;text-align:center;border-right:1px solid rgba(74,25,66,.10)}.wls-sc:last-child{border-right:none}
          .wls-sv{font-size:28px;font-weight:900;color:${ac2};letter-spacing:-.5px;line-height:1}
          .wls-sl{font-size:11px;color:${txt2};font-weight:500;margin-top:5px}
          .wls-sec{padding:72px 40px;position:relative;z-index:1}
          .wls-sec-alt{background:rgba(253,244,255,.55);border-top:1px solid rgba(74,25,66,.08);border-bottom:1px solid rgba(74,25,66,.08)}
          .wls-in{max-width:1300px;margin:0 auto}
          .wls-sey{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .wls-sh{font-size:44px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .wls-sd{font-size:15px;color:${txt2};line-height:1.7;max-width:700px}
          .wls-rv{opacity:0;transform:translateY(40px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
          .wls-rv.wls-ok{opacity:1;transform:translateY(0)}
          .wls-sk-g{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
          .wls-card{background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(252,231,243,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:24px 20px 20px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(74,25,66,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1),border-color .2s}
          .wls-card.wls-cv{opacity:1;transform:translateY(0)}.wls-card.wls-cv:hover{transform:translateY(-5px);border-color:rgba(74,25,66,.25);box-shadow:0 14px 40px rgba(74,25,66,.12)}
          .wls-card.feat{border-color:rgba(74,25,66,.18)}
          .wls-cn{position:absolute;top:6px;right:12px;font-size:68px;font-weight:900;line-height:1;color:${ac2};opacity:.05;pointer-events:none;user-select:none}
          .wls-card h3{font-size:15px;font-weight:700;color:${txt};margin:0 0 7px;position:relative;z-index:1}
          .wls-card p{font-size:13px;color:${txt2};line-height:1.65;margin:0;position:relative;z-index:1}
          .wls-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,${ac},${ac2});border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top;transition:transform .3s}
          .wls-card.wls-cv:hover::before{transform:scaleY(1)}
          .wls-sm{text-align:center;margin-top:20px}
          .wls-bm{display:inline-block;background:#fff;border:1.5px solid rgba(74,25,66,.18);color:${txt};padding:9px 28px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .wls-bm:hover{background:${ac};border-color:${ac};color:#fff;transform:translateY(-2px)}
          .wls-tec-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:36px}
          .wls-tc2{background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(252,231,243,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:20px 18px;box-shadow:0 4px 24px rgba(74,25,66,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .wls-tc2.wls-sv2{opacity:1;transform:translateY(0)}.wls-tc2.wls-sv2:hover{border-color:rgba(74,25,66,.22);box-shadow:0 12px 36px rgba(74,25,66,.10)}
          .wls-tg{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:10px;padding-bottom:7px;border-bottom:2px solid}
          .wls-pills{display:flex;flex-wrap:wrap;gap:5px}
          .wls-pill{display:inline-block;font-size:11px;font-weight:500;padding:3px 9px;border-radius:100px;border:1px solid}
          .wls-en-g{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
          .wls-en{background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(252,231,243,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:22px;padding:28px 24px;box-shadow:0 4px 24px rgba(74,25,66,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1),border-color .2s}
          .wls-en.wls-ev{opacity:1;transform:translateY(0)}.wls-en.wls-ev:hover{border-color:rgba(74,25,66,.22);box-shadow:0 14px 44px rgba(74,25,66,.12)}
          .wls-en.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(253,244,255,.45) 100%);border-color:rgba(217,119,6,.26);transform:translateY(-6px)}
          .wls-en.feat.wls-ev{transform:translateY(-6px)}.wls-en.feat.wls-ev:hover{transform:translateY(-10px)}
          .wls-en-b{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:4px 11px;border-radius:100px;border:1px solid;margin-bottom:16px}
          .wls-en-i{width:44px;height:44px;background:rgba(74,25,66,.08);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
          .wls-en.feat .wls-en-i{background:rgba(217,119,6,.10)}
          .wls-en-n{font-size:20px;font-weight:900;color:${txt};margin:0 0 5px;letter-spacing:-.3px}
          .wls-en-h{font-size:13px;font-weight:600;color:${ac};margin-bottom:10px}
          .wls-en.feat .wls-en-h{color:#D97706}
          .wls-en-d{font-size:13px;color:${txt2};line-height:1.7;margin-bottom:14px}
          .wls-en-ll{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${ac};margin-bottom:7px}
          .wls-en-li{list-style:none;padding:0;margin:0 0 14px;display:flex;flex-direction:column;gap:6px}
          .wls-en-li li{display:flex;align-items:flex-start;gap:7px;font-size:13px;color:#374151;line-height:1.5}
          .wls-en-li li::before{content:'✓';font-weight:800;color:${ac2};flex-shrink:0;margin-top:1px}
          .wls-en.feat .wls-en-li li::before{color:#D97706}
          .wls-en-tl{font-size:11px;font-weight:600;color:#D97706;display:block;padding-top:10px;border-top:1px solid rgba(74,25,66,.08)}
          .wls-en-a{display:block;margin-top:14px;padding:10px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(74,25,66,.09);color:${txt};border:1.5px solid rgba(74,25,66,.18)}
          .wls-en-a:hover{background:${txt};color:#fff}
          .wls-en.feat .wls-en-a{background:${ac};color:#fff;border-color:${ac}}
          .wls-en.feat .wls-en-a:hover{background:${txt};border-color:${txt}}
          .wls-tg2{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:36px}
          .wls-tc{background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(252,231,243,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:26px 22px;display:flex;flex-direction:column;gap:10px;box-shadow:0 4px 24px rgba(74,25,66,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
          .wls-tc.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.88) 55%,rgba(253,244,255,.42) 100%);border-color:rgba(217,119,6,.20)}
          .wls-tc.wls-tv{opacity:1;transform:translateY(0)}.wls-tc.wls-tv:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(74,25,66,.12)}
          .wls-stars{font-size:15px;color:#D97706;letter-spacing:2px}
          .wls-ttxt{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .wls-au{display:flex;align-items:center;gap:11px}
          .wls-av{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .wls-an{font-size:14px;font-weight:700;color:${txt}}
          .wls-ar{font-size:12px;color:#6b7280}
          .wls-wy-g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px}
          .wls-wc{background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(252,231,243,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:18px;padding:22px 18px;box-shadow:0 4px 24px rgba(74,25,66,.07),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(28px) scale(.97);transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .2s}
          .wls-wc.wls-wv{opacity:1;transform:translateY(0) scale(1)}.wls-wc.wls-wv:hover{transform:translateY(-4px) scale(1);border-color:rgba(74,25,66,.22);box-shadow:0 12px 36px rgba(74,25,66,.10)}
          .wls-wd{width:9px;height:9px;border-radius:50%;background:${ac2};margin-bottom:10px}
          .wls-wc h3{font-size:13px;font-weight:700;color:${txt};margin:0 0 7px;line-height:1.35}
          .wls-wc p{font-size:12px;color:${txt2};line-height:1.6;margin:0}
          .wls-ct{padding:64px 40px;background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.60) 40%,rgba(252,231,243,.50) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .wls-ct-g{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.1fr;gap:28px;align-items:start}
          .wls-cth{font-size:38px;font-weight:900;line-height:1.18;margin:0 0 12px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .wls-ctd{font-size:14px;color:${txt2};line-height:1.6;margin:0 0 18px}
          .wls-ben{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:12px}
          .wls-be{display:flex;gap:9px;align-items:flex-start}
          .wls-bi{flex-shrink:0;color:${ac2};font-weight:800;font-size:15px;margin-top:1px}
          .wls-be p{font-size:13px;color:${txt2};margin:0;line-height:1.5}
          .wls-fb{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(253,244,255,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:18px;padding:30px;box-shadow:0 8px 40px rgba(74,25,66,.08),inset 0 1px 0 rgba(255,255,255,1)}
          .wls-fb h3{font-size:20px;font-weight:700;color:${txt};margin:0 0 20px}
          .wls-form{display:flex;flex-direction:column;gap:12px}
          .wls-fr{display:grid;grid-template-columns:1fr 1fr;gap:11px}
          .wls-fg{display:flex;flex-direction:column;gap:4px}
          .wls-fg.full{grid-column:1/-1}
          .wls-fg label{font-size:12px;font-weight:500;color:${txt}}
          .wls-fg input,.wls-fg textarea,.wls-fg select{padding:10px 12px;border:1px solid rgba(74,25,66,.14);border-radius:6px;font-size:13px;font-family:inherit;color:${txt};background:rgba(255,255,255,.55);transition:border-color .2s}
          .wls-fg input:focus,.wls-fg textarea:focus,.wls-fg select:focus{outline:none;border-color:${ac2};box-shadow:0 0 0 3px rgba(124,58,237,.10)}
          .wls-co{display:flex;gap:8px;align-items:flex-start}
          .wls-co input{margin-top:3px;width:14px;height:14px}
          .wls-co label{font-size:11px;color:${txt2};line-height:1.5}.wls-co a{color:${txt}}
          .wls-sub{width:100%;padding:13px;background:${ac};border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(74,25,66,.25)}
          .wls-sub:hover{background:${txt};transform:translateY(-2px)}
          .wls-fq{padding:72px 40px;background:rgba(253,244,255,.55);border-top:1px solid rgba(74,25,66,.08);position:relative;z-index:1}
          .wls-fq h2{font-size:42px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .wls-fq-sub{font-size:15px;color:${txt2};margin:0 0 32px}
          .wls-fql{display:flex;flex-direction:column;gap:9px}
          .wls-fi{background:linear-gradient(135deg,rgba(253,244,255,.55) 0%,rgba(255,255,255,.88) 55%,rgba(252,231,243,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(74,25,66,.05);transition:border-color .2s}
          .wls-fi.open{border-color:rgba(74,25,66,.28)}.wls-fi.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,${ac},${ac2});border-radius:3px 3px 0 0}
          .wls-fqb{width:100%;background:none;border:none;padding:18px 18px 18px 52px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:12px;font-family:inherit;position:relative}
          .wls-fqn{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:24px;height:24px;background:rgba(74,25,66,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:5px}
          .wls-fi.open .wls-fqn{background:${ac};color:#fff}
          .wls-fqb span{font-size:14px;font-weight:600;color:${txt};line-height:1.4}.wls-fi.open .wls-fqb span{color:${ac2}}
          .wls-fch{width:20px;height:20px;flex-shrink:0;color:#9ca3af;transition:transform .3s}.wls-fi.open .wls-fch{transform:rotate(180deg);color:${ac2}}
          .wls-faw{overflow:hidden;transition:max-height .35s ease;max-height:0}.wls-fi.open .wls-faw{max-height:400px}
          .wls-fa{padding:0 18px 18px 52px;font-size:14px;color:#4b5563;line-height:1.8}
          .wls-rel{padding:64px 40px;background:rgba(253,244,255,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .wls-ri{max-width:1300px;margin:0 auto;text-align:center}
          .wls-ri h2{font-size:30px;font-weight:900;background:linear-gradient(90deg,${txt} 0%,${ac2} 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 10px}
          .wls-ri hr{border:none;border-top:1px solid rgba(74,25,66,.10);margin:24px 0}
          .wls-rts{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
          .wls-rt{display:inline-block;padding:9px 18px;border:1.5px solid;border-radius:50px;font-size:13px;font-weight:500;text-decoration:none;transition:all .22s}
          .wls-rt:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(0,0,0,.08)}
          .wls-ra{background:rgba(74,25,66,.09);border-color:rgba(74,25,66,.28);color:#4a1942}
          .wls-rb{background:rgba(124,58,237,.09);border-color:rgba(124,58,237,.28);color:#7c3aed}
          .wls-rc{background:rgba(3,105,161,.09);border-color:rgba(3,105,161,.28);color:#0369a1}
          .wls-rd{background:rgba(20,83,45,.09);border-color:rgba(20,83,45,.28);color:#14532d}
          @media(max-width:1024px){.wls-hero h1,.wls-sh,.wls-fq h2{font-size:34px}.wls-sk-g{grid-template-columns:repeat(2,1fr)}.wls-tec-g{grid-template-columns:repeat(2,1fr)}.wls-en-g{grid-template-columns:1fr;max-width:460px;margin-left:auto;margin-right:auto}.wls-en.feat{transform:none}.wls-en.feat.wls-ev{transform:none}.wls-en.feat.wls-ev:hover{transform:translateY(-4px)}.wls-wy-g{grid-template-columns:repeat(2,1fr)}.wls-tg2{grid-template-columns:1fr}.wls-ct-g{grid-template-columns:1fr}}
          @media(max-width:768px){.wls-bc,.wls-hero,.wls-sec,.wls-ct,.wls-fq,.wls-rel{padding-left:20px;padding-right:20px}.wls-hero{padding-top:28px;padding-bottom:16px}.wls-hero h1{font-size:26px}.wls-stats{grid-template-columns:1fr 1fr}.wls-sc:nth-child(2){border-right:none}.wls-sc:nth-child(3),.wls-sc:nth-child(4){border-top:1px solid rgba(74,25,66,.10)}.wls-sc:nth-child(4){border-right:none}.wls-sk-g,.wls-tec-g,.wls-wy-g{grid-template-columns:1fr}.wls-fr{grid-template-columns:1fr}.wls-cth{font-size:26px}}
        `}</style>
      </Head>
      <div className="wls-page">
        <div className="wls-orb wls-o1" /><div className="wls-orb wls-o2" /><div className="wls-orb wls-o3" />
        <nav className="wls-bc" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList"><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><Link href="/" itemProp="item"><span itemProp="name">Home</span></Link><meta itemProp="position" content="1" /></li><li><span>Industries</span></li><li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement"><span itemProp="name">Wellness Software</span><meta itemProp="position" content="3" /></li></ol></nav>
        <section className="wls-hero">
          <span className="wls-ey">Wellness & Digital Health Industry</span>
          <h1>Wellness Software Development — Mental Health Apps, Fitness Platforms & Corporate Wellness</h1>
          <p className="wls-desc">Custom digital wellness software — mental health and therapy apps, fitness and personal coaching platforms, corporate wellness portals, nutrition apps, meditation tools, chronic disease self-management, wearable integration (Apple Health, Garmin, Fitbit), and HIPAA/GDPR compliance. 65+ wellness projects. 15+ years.</p>
          <div className="wls-tr">{['Mental Health App','HIPAA Compliant','Wearable Integration','Corporate Wellness','Nutrition Coaching'].map(b => (<div className="wls-badge" key={b}><span className="wls-dot" />{b}</div>))}</div>
          <div className="wls-ctas"><Link href="#contact" className="wls-p">Discuss Your Wellness Project</Link><Link href="#solutions" className="wls-g">View Solutions →</Link></div>
        </section>
        <div className="wls-stats" ref={stR}>{[['65+','Wellness Projects'],['15+','Years Dev Experience'],['240%','Avg Practitioner Revenue Growth'],['99.9%','Platform Uptime SLA']].map(([v, l]) => <StatItem key={l} label={l} val={v} started={ss} />)}</div>
        <section id="solutions" className="wls-sec"><div className="wls-in"><div className={`wls-rv${vis.has('sk') ? ' wls-ok' : ''}`} ref={el => { secR.current['sk'] = el; }}><span className="wls-sey">Wellness Solutions</span><h2 className="wls-sh">What We Build for Wellness & Digital Health</h2><p className="wls-sd">Mental health apps, fitness and coaching platforms, corporate wellness portals, nutrition apps, meditation tools, sleep platforms, chronic disease apps, wellness marketplaces, wearable integration, and population health analytics.</p></div><div className="wls-sk-g" ref={skR}>{visS.map((s, i) => (<div key={s.n} className={`wls-card${s.feat ? ' feat' : ''}${vSk.includes(i) ? ' wls-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><span className="wls-cn">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>))}</div>{SOLUTIONS.length > 6 && <div className="wls-sm"><button className="wls-bm" onClick={() => setShowAll(p => !p)}>{showAll ? 'Show fewer ↑' : `Show all ${SOLUTIONS.length} solutions ↓`}</button></div>}</div></section>
        <section className="wls-sec wls-sec-alt"><div className="wls-in"><div className={`wls-rv${vis.has('stk') ? ' wls-ok' : ''}`} ref={el => { secR.current['stk'] = el; }}><span className="wls-sey">Technology Stack</span><h2 className="wls-sh">Wellness Technology We Use</h2><p className="wls-sd">React Native with HealthKit/Google Fit, HIPAA-compliant WebRTC telehealth, HL7 FHIR EHR integration, Stripe Connect practitioner payouts, and the full digital health tech stack.</p></div><div className="wls-tec-g" ref={stGr}>{TECH_STACK.map((g, i) => (<div key={g.group} className={`wls-tc2${vSt.includes(i) ? ' wls-sv2' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="wls-tg" style={{ color: g.color, borderBottomColor: g.color + '33' }}>{g.group}</div><div className="wls-pills">{g.items.map(it => <span key={it} className="wls-pill" style={{ color: g.color, background: g.color + '12', borderColor: g.color + '30' }}>{it}</span>)}</div></div>))}</div></div></section>
        <section className="wls-sec"><div className="wls-in"><div className={`wls-rv${vis.has('eng') ? ' wls-ok' : ''}`} ref={el => { secR.current['eng'] = el; }}><span className="wls-sey">Engagement Models</span><h2 className="wls-sh">How We Work with Wellness Companies</h2><p className="wls-sd">Custom wellness app, corporate wellness portal, or specialist wearable and EHR integration — matched to your product and compliance requirements.</p></div><div className="wls-en-g" ref={enR}>{ENGAGEMENT.map((m, i) => (<div key={m.id} className={`wls-en${m.feat ? ' feat' : ''}${vEn.includes(i) ? ' wls-ev' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}><span className="wls-en-b" style={{ color: m.bc, borderColor: m.bc + '44', background: m.bc + '14' }}>{m.badge}</span><div className="wls-en-i"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={m.feat ? '#D97706' : ac2} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg></div><div className="wls-en-n">{m.name}</div><div className="wls-en-h">{m.headline}</div><div className="wls-en-d">{m.desc}</div><div className="wls-en-ll">Best for</div><ul className="wls-en-li">{m.best.map(b => <li key={b}>{b}</li>)}</ul><span className="wls-en-tl">{m.tl}</span><Link href="#contact" className="wls-en-a">Get a free estimate →</Link></div>))}</div></div></section>
        <section className="wls-sec wls-sec-alt"><div className="wls-in"><div className={`wls-rv${vis.has('ts') ? ' wls-ok' : ''}`} ref={el => { secR.current['ts'] = el; }}><span className="wls-sey">Client Outcomes</span><h2 className="wls-sh">Wellness Clients</h2><p className="wls-sd">Mental health platforms, corporate wellness teams, and nutrition coaching apps on building wellness technology with 1Solutions.</p></div><div className="wls-tg2" ref={teR}>{TESTIMONIALS.map((t, i) => (<div key={i} className={`wls-tc${t.feat ? ' feat' : ''}${vTe.includes(i) ? ' wls-tv' : ''}`} style={{ transitionDelay: `${i * 90}ms` }} itemScope itemType="https://schema.org/Review"><div className="wls-stars">★★★★★</div><p className="wls-ttxt" itemProp="reviewBody">{t.text}</p><div className="wls-au"><div className="wls-av" style={{ background: t.bg }}>{t.init}</div><div><div className="wls-an" itemProp="author">{t.name}</div><div className="wls-ar">{t.role}</div></div></div></div>))}</div></div></section>
        <section className="wls-sec"><div className="wls-in"><div className={`wls-rv${vis.has('wy') ? ' wls-ok' : ''}`} ref={el => { secR.current['wy'] = el; }}><span className="wls-sey">Why 1Solutions</span><h2 className="wls-sh">Why Wellness Companies Choose 1Solutions</h2><p className="wls-sd">65+ wellness projects — HIPAA/GDPR compliance, wearable integration breadth, HL7 FHIR connectivity, clinical workflow understanding, behaviour change product design, and corporate HR integration.</p></div><div className="wls-wy-g" ref={whR}>{WHY.map((c, i) => (<div key={i} className={`wls-wc${vWh.includes(i) ? ' wls-wv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}><div className="wls-wd" /><h3>{c.t}</h3><p>{c.d}</p></div>))}</div></div></section>
        <section id="contact" className="wls-ct"><div className="wls-ct-g"><div><h2 className="wls-cth">Build Your Wellness Platform</h2><p className="wls-ctd">Share your wellness software requirements and we will respond within 24 hours with a proposal, compliance assessment, and team composition.</p><div className="wls-ben">{[['✓','Technical proposal within 24–48 hours'],['✓','HIPAA, GDPR, and wearable integration specialists'],['✓','NDA signed before any technical discussions'],['✓','65+ wellness projects — mental health, fitness, nutrition, corporate'],['✓','Compliant, wearable-ready, SLA-backed delivery']].map(([ic, tx]) => (<div className="wls-be" key={tx}><span className="wls-bi">{ic}</span><p>{tx}</p></div>))}</div></div>
        <div className="wls-fb"><h3>Tell Us About Your Wellness Project</h3><form className="wls-form" onSubmit={e => e.preventDefault()}><div className="wls-fr"><div className="wls-fg"><label>Full Name *</label><input type="text" placeholder="Your name" required /></div><div className="wls-fg"><label>Work Email *</label><input type="email" placeholder="you@company.com" required /></div></div><div className="wls-fr"><div className="wls-fg"><label>Company</label><input type="text" placeholder="Company name" /></div><div className="wls-fg"><label>Phone / WhatsApp</label><input type="tel" placeholder="+1 555 000 0000" /></div></div><div className="wls-fg full"><label>Type of Wellness Platform *</label><select required><option value="">Select...</option><option>Mental Health & Therapy App</option><option>Fitness & Personal Coaching Platform</option><option>Corporate Wellness Portal</option><option>Nutrition & Meal Planning App</option><option>Meditation & Mindfulness App</option><option>Sleep Tracking & Improvement Platform</option><option>Chronic Disease Self-Management App</option><option>Wellness Marketplace Platform</option><option>Wearable & EHR Integration</option><option>Wellness Analytics Dashboard</option><option>Other</option></select></div><div className="wls-fg full"><label>Project Description *</label><textarea rows={4} placeholder="Describe your wellness software project — target users, core features, compliance requirements (HIPAA, GDPR), wearable integration needed, and go-live timeline..." required /></div><div className="wls-co"><input type="checkbox" required /><label>I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. Details are treated confidentially.</label></div><button type="submit" className="wls-sub">Get a Wellness Tech Proposal →</button></form></div></div></section>
        <section className="wls-fq"><div className="wls-in" style={{ maxWidth: 840 }}><span className="wls-sey">FAQ</span><h2>Wellness Software — FAQ</h2><p className="wls-fq-sub">Mental health apps, HIPAA compliance, wearable integration, corporate wellness, and telehealth questions answered.</p><div className="wls-fql">{FAQS.map((f, i) => (<div key={i} className={`wls-fi${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question"><button className="wls-fqb" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><div className="wls-fqn">{String(i + 1).padStart(2, '0')}</div><span itemProp="name">{f.q}</span><svg className="wls-fch" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg></button><div className="wls-faw"><div className="wls-fa" itemProp="text">{f.a}</div></div></div>))}</div></div></section>
        <section className="wls-rel"><div className="wls-ri"><span className="wls-sey">Related Services</span><h2>Related Industry & Technology Services</h2><hr /><div className="wls-rts">{[['/healthcare-software-development/','Healthcare Software','wls-ra'],['/mobile-app-development/','Mobile App Development','wls-rb'],['/saas-application-development-company/','SaaS Development','wls-rc'],['/social-media-app-development-company/','Social Media Apps','wls-rd'],['/it-outsourcing-services/','IT Outsourcing','wls-ra'],['/offshore-development-company/','Offshore Development','wls-rb'],['/ai-ml-development/','AI/ML Development','wls-rc'],['/elearning-software-development-services/','eLearning Software','wls-rd']].map(([hr, lb, cl]) => (<Link key={hr} href={hr} className={`wls-rt ${cl}`}>{lb}</Link>))}</div></div></section>
      </div>
    </>
  );
}
