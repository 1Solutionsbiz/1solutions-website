import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { n:'01', title:'Custom HTML Email Templates', desc:'Hand-coded, pixel-perfect email templates built from scratch to match your brand — no drag-and-drop, no bloated builders, no rendering surprises.', featured:false },
  { n:'02', title:'Responsive Email Design', desc:'Fluid-hybrid layouts that adapt from 640px desktop to 320px mobile, rendering correctly on every screen size without breaking your header or CTA.', featured:true },
  { n:'03', title:'Transactional Email Development', desc:'Order confirmations, receipts, password resets, shipping updates — hand-coded transactional templates optimised for deliverability and brand trust.', featured:false },
  { n:'04', title:'Email Campaign Templates', desc:'Promotional, seasonal, and re-engagement templates designed to convert — tested across every major email client before delivery.', featured:false },
  { n:'05', title:'Klaviyo Template Development', desc:'Native Klaviyo drag-and-drop blocks with editable text, images, and dynamic content — built to your brand and ready for your marketing team.', featured:false },
  { n:'06', title:'Mailchimp Custom Templates', desc:'Mailchimp-compatible editable region templates coded to pixel-perfect standards and delivered as .zip or imported directly to your account.', featured:false },
  { n:'07', title:'HubSpot Email Modules', desc:'Custom HubSpot email modules with inline editing, smart content support, and full brand compliance — deployed directly to your HubSpot portal.', featured:false },
  { n:'08', title:'Salesforce Marketing Cloud', desc:'AMPscript-powered dynamic emails, drag-and-drop content blocks, and complex journey builder templates for Salesforce Marketing Cloud.', featured:false },
  { n:'09', title:'Dark Mode Email Support', desc:'Media query overrides that preserve your brand in dark environments — not just let clients invert your colours. Tested across all dark-mode clients.', featured:false },
  { n:'10', title:'AMP for Email', desc:'Interactive AMP components — carousels, accordions, real-time content — for Gmail and Mail.app, always with the required HTML fallback included.', featured:false },
  { n:'11', title:'Email Accessibility (WCAG)', desc:'Semantic HTML, role="presentation" on layout tables, ALT text on all images, WCAG-compliant colour contrast — emails that work for every subscriber.', featured:false },
  { n:'12', title:'Cross-Client Testing & QA', desc:'Every template tested across 90+ email clients via Litmus or Email on Acid — Gmail, Outlook, Apple Mail, Samsung Mail, Yahoo Mail, and more.', featured:false },
];

const FAQS = [
  { q:'Why hand-code HTML emails instead of using a builder?', a:'Email builders produce bloated, inconsistent code that breaks in Outlook, ignores dark mode, and limits customisation. Hand-coded emails give you precise control over rendering, smaller file sizes (important for deliverability), and templates that actually look like your design.' },
  { q:'Which email clients do you test in?', a:'We test in 90+ clients including all Gmail variants (webmail, iOS, Android), Outlook 2007–2023, Outlook.com, Apple Mail (iOS and macOS), Samsung Mail, Yahoo Mail, and Thunderbird. Testing is done via Litmus or Email on Acid.' },
  { q:'Can you build templates inside Klaviyo, Mailchimp, or HubSpot?', a:"Yes. We deliver templates as native ESP components — Klaviyo drag-and-drop blocks with editable text and image sections, Mailchimp editable region templates, or HubSpot custom email modules — so your marketing team can send without touching code." },
  { q:'Do you support AMP for Email?', a:"Yes. For Gmail and Mail.app, we can add AMP components — carousels, accordions, real-time content — to make emails interactive. We always include the required HTML fallback for clients that don't support AMP." },
  { q:'How long does it take to build an HTML email template?', a:'A single template takes 3–5 business days from brief to tested delivery. A suite of 10–15 templates takes 3–4 weeks. Retainer clients receive templates within 2–3 business days of brief approval.' },
  { q:'What is the file size limit for HTML emails?', a:'Gmail clips emails over 102KB. We target under 100KB for the HTML file (excluding linked images). We optimise code, inline all CSS, and recommend hosting images externally — our templates consistently come in under this limit.' },
  { q:'How do you handle Outlook rendering?', a:"Outlook 2007–2023 uses Microsoft Word's rendering engine, which ignores modern CSS. We use MSO conditional comments, VML backgrounds, table-based layouts, and Outlook-specific resets to ensure your email looks correct across all Outlook versions." },
  { q:'Do you sign NDAs?', a:'Yes. NDA and IP assignment signed as standard before any access to your brand assets or ESP account. Your IP remains yours, always.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Outlook-Proof Coding', desc:"MSO conditional comments, VML backgrounds, and table-based layouts that render perfectly in Outlook 2007 through 2023 — Word rendering engine and all." },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>, title:'Dark Mode Ready', desc:'40%+ of users read email in dark mode. We code media query overrides that preserve your brand in dark environments, not just let clients invert your colours.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>, title:'90+ Client Testing', desc:'Every template tested in Litmus or Email on Acid across Gmail, Outlook, Apple Mail, Samsung Mail, and Thunderbird before delivery. Zero surprises on send day.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>, title:'Responsive on Every Device', desc:'Fluid-hybrid layouts that adapt from 640px desktop to 320px mobile without breaking your header, hero image, or call-to-action button.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>, title:'ESP-Ready Delivery', desc:"Templates delivered in your ESP's native format — Klaviyo blocks, Mailchimp editable regions, HubSpot modules, or raw HTML with fully inlined styles." },
  { icon:<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>, title:'Accessibility First', desc:'Semantic HTML, role="presentation" on layout tables, ALT text on all images, WCAG 2.1 AA colour contrast — emails that work for every subscriber.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'Fast 3–5 Day Turnaround', desc:'Single templates in 3–5 business days from approved brief. Retainer clients get 2–3 day turnaround. No queues, no waiting weeks for a single email.' },
  { icon:<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'NDA & IP Protection', desc:'NDA and IP assignment signed as standard before accessing your brand assets, ESP account, or design files. Your IP remains yours, always.' },
];

const TECH_STACK = [
  { group:'Email Service Providers', items:['Klaviyo','Mailchimp','HubSpot','Salesforce MC','ActiveCampaign','Campaign Monitor','Brevo','Iterable','Customer.io'] },
  { group:'Testing Platforms', items:['Litmus','Email on Acid','Mailtrap','Mail Tester','GlockApps','SpamAssassin'] },
  { group:'Languages & Standards', items:['HTML5','CSS3 (Inline)','VML','MSO Conditionals','AMP for Email','MJML'] },
  { group:'Email Clients Covered', items:['Gmail (Web, iOS, Android)','Outlook 2007–2023','Apple Mail (iOS & macOS)','Samsung Mail','Yahoo Mail','Thunderbird','Outlook.com'] },
  { group:'Accessibility Standards', items:['WCAG 2.1 AA','ARIA Roles','Alt Text','Colour Contrast','Screen Reader Support'] },
  { group:'Design & Dev Tools', items:['Figma','Photoshop','Git','AWS SES','Postman','Litmus Builder'] },
];

const INDUSTRIES = [
  { icon:'🛒', title:'eCommerce & Retail', desc:'Cart abandonment, order confirmations, shipping updates, and promotional campaigns that drive repeat purchases and reduce churn.' },
  { icon:'💼', title:'SaaS & Technology', desc:'Onboarding sequences, feature announcements, usage digests, and lifecycle emails that drive activation and reduce customer churn.' },
  { icon:'🏥', title:'Healthcare & Wellness', desc:'Appointment confirmations, patient reminders, and health content newsletters coded for clarity, privacy, and accessibility.' },
  { icon:'🎓', title:'Education & eLearning', desc:'Course enrollment, lesson reminders, certificate delivery, and instructor updates for online education and LMS platforms.' },
  { icon:'🏦', title:'Financial Services', desc:'Account statements, transaction alerts, payment reminders, and compliance-ready communications with clear, accessible design.' },
  { icon:'🏨', title:'Hospitality & Travel', desc:'Booking confirmations, itinerary emails, loyalty reward notifications, and post-stay review requests that build brand loyalty.' },
  { icon:'📱', title:'Consumer Apps & Mobile', desc:'Re-engagement campaigns, app update announcements, push-to-email digests, and habit-forming lifecycle sequences.' },
  { icon:'⚖️', title:'Professional Services', desc:'Client communications, proposal follow-ups, invoice emails, and newsletter campaigns for agencies and consulting firms.' },
];

export default function HtmlEmailDevelopmentServices() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const stepRefs = useRef([]);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleSteps(prev => prev.includes(i) ? prev : [...prev, i]), i * 150);
            obs.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!whyGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          WHY.forEach((_, i) => setTimeout(() => setVisibleWhyCards(prev => prev.includes(i) ? prev : [...prev, i]), i * 100));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(whyGridRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!testiGridRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0,1,2].forEach(i => setTimeout(() => setVisibleTestiCards(p => p.includes(i) ? p : [...p, i]), i * 150));
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(testiGridRef.current);
    return () => obs.disconnect();
  }, []);


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

  const visibleServices = showAll ? SERVICES : SERVICES.slice(0, 8);

  const [_sfSt, _setSfSt] = useState('idle');
  const _sfSubmit = async (e) => {
    e.preventDefault();
    _setSfSt('loading');
    try {
      const fd = new FormData(e.target);
      const token = await new Promise(r => window.grecaptcha.ready(() =>
        window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'contact' }).then(r)));
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('sf-name') || '', email: fd.get('sf-email') || '',
          phone: (fd.get('sf-cc') ? fd.get('sf-cc') + ' ' : '') + (fd.get('sf-phone') || ''),
          company: fd.get('sf-company') || '', message: fd.get('sf-message') || '',
          source: 'HTML Email Development Services', consent: true, recaptchaToken: token,
        }),
      });
      if (res.ok) { window.location.href = '/thank-you/'; } else { _setSfSt('error'); }
    } catch { _setSfSt('error'); }
  };

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.1solutions.biz/#organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        foundingDate: '2008',
        description: 'HTML email development company delivering hand-coded, responsive email templates tested across 90+ email clients for US, Canada, and Australia.',
        areaServed: [
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'Australia' },
          { '@type': 'Country', name: 'United Kingdom' },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.1solutions.biz/html-email-development-services/',
        url: 'https://www.1solutions.biz/html-email-development-services/',
        name: 'HTML Email Development Services | 1Solutions',
        description: 'Professional HTML email development services from 1Solutions. Hand-coded, responsive templates tested across 90+ email clients for Klaviyo, Mailchimp, HubSpot & more.',
        inLanguage: 'en-US',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
            { '@type': 'ListItem', position: 2, name: 'HTML Email Development Services', item: 'https://www.1solutions.biz/html-email-development-services/' },
          ],
        },
      },
      {
        '@type': 'ProfessionalService',
        name: 'HTML Email Development Services by 1Solutions',
        provider: { '@id': 'https://www.1solutions.biz/#organization' },
        serviceType: 'HTML Email Development',
        url: 'https://www.1solutions.biz/html-email-development-services/',
        areaServed: ['United States', 'Canada', 'Australia', 'United Kingdom'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'HTML Email Development Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom HTML Email Templates' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Responsive Email Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Klaviyo Template Development' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mailchimp Custom Templates' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HubSpot Email Modules' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AMP for Email' } },
          ],
        },
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

  return (
    <>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <title>HTML Email Development Services | 1Solutions</title>
        <meta name="description" content="Professional HTML email development services from 1Solutions. Hand-coded, responsive templates tested across 90+ email clients for Klaviyo, Mailchimp, HubSpot & more." />
        <meta name="keywords" content="html email development, html email template, responsive email design, klaviyo template development, mailchimp custom template, email coding services, outlook email template" />
        <link rel="canonical" href="https://www.1solutions.biz/html-email-development-services/" />
        <meta property="og:title" content="HTML Email Development Services | 1Solutions" />
        <meta property="og:description" content="Hand-coded HTML email templates tested across 90+ email clients. Klaviyo, Mailchimp, HubSpot, Outlook-proof, dark mode ready. Get a free quote." />
        <meta property="og:url" content="https://www.1solutions.biz/html-email-development-services/" />
        <meta property="og:type" content="website" />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-html-email-development-services.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions HTML Email Development Services — hand-coded, tested across 90+ email clients" />
        <meta property="og:site_name" content="1Solutions" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HTML Email Development Services | 1Solutions" />
        <meta name="twitter:description" content="Hand-coded HTML email templates tested across 90+ email clients for Klaviyo, Mailchimp, HubSpot & more." />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-html-email-development-services.jpg" />
        <meta name="twitter:image:alt" content="1Solutions HTML Email Development Services — hand-coded, tested across 90+ email clients" />
        <style>{`
          .he-page {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            background-attachment: fixed;
            color: #0F1F40;
            line-height: 1.6;
            position: relative;
            overflow-x: hidden;
            overflow-y: clip;
          }
          .he-page *, .he-page *::before, .he-page *::after { box-sizing: border-box; }

          .he-aurora { position:absolute; inset:-15%; z-index:0; pointer-events:none; filter:blur(70px) saturate(150%); animation:he-aurora-drift 20s ease-in-out infinite alternate; }
          .he-aurora-b1 { position:absolute; left:20%; top:30%; width:65%; height:65%; border-radius:50%; background:radial-gradient(circle at center,rgba(15,52,96,0.28) 0%,transparent 70%); transform:translate(-50%,-50%); }
          .he-aurora-b2 { position:absolute; left:78%; top:22%; width:48%; height:48%; border-radius:50%; background:radial-gradient(circle at center,rgba(217,119,6,0.20) 0%,transparent 70%); transform:translate(-50%,-50%); }
          .he-aurora-b3 { position:absolute; left:50%; top:82%; width:55%; height:55%; border-radius:50%; background:radial-gradient(circle at center,rgba(26,82,118,0.16) 0%,transparent 70%); transform:translate(-50%,-50%); }
          @keyframes he-aurora-drift { 0%{transform:translate3d(0,0,0) scale(1)} 100%{transform:translate3d(-4%,3%,0) scale(1.10)} }

          /* Shared section styles */
          .he-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .he-section-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px; }
          .he-section-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:680px;margin-bottom:36px; }
          .he-section-sub { font-size:16px;color:#4A6080;margin:0; }
          .he-section-header-center { text-align:center;margin-bottom:52px; }

          /* Section fade-up */
          .he-section-reveal { opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .he-section-reveal.he-revealed { opacity:1;transform:translateY(0); }

          /* Definition block */
          .he-def-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:2; }
          .he-def-inner { max-width:1280px;margin:0 auto; }
          .he-def-block { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .he-def-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px; }
          .he-def-title { font-size:34px;font-weight:900;color:#0F3460;margin-bottom:18px;line-height:1.2;letter-spacing:-0.5px; }
          .he-def-body { font-size:16px;color:#374151;line-height:1.8;margin-bottom:14px;max-width:960px; }
          .he-def-facts { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:1px solid rgba(15,52,96,0.10);padding-top:28px;margin-top:28px; }
          .he-def-fact { display:flex;flex-direction:column;gap:6px; }
          .he-def-fact-num { font-size:28px;font-weight:900;color:#D97706;line-height:1; }
          .he-def-fact-label { font-size:13px;color:#4A6080;line-height:1.5; }

          /* Services */
          .he-services-section { background:#f8fafd;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(15,52,96,0.18),0 -4px 16px rgba(15,52,96,0.10); }
          .he-services-inner { max-width:1280px;margin:0 auto; }
          .he-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
          .he-service-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default; }
          .he-service-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .he-service-card.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .he-service-card::before { content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#D97706,#f59e0b);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1); }
          .he-service-card:hover::before { transform:scaleY(1); }
          .he-service-card:hover h3 { color:#D97706; }
          .he-card-num { position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none; }
          .he-service-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1; }
          .he-service-card p { font-size:13px;color:#4A6080;line-height:1.6;position:relative;z-index:1; }
          .he-services-footer { text-align:center;margin-top:20px; }
          .he-btn-show-more { display:inline-block;background:#ffffff;border:1.5px solid rgba(15,52,96,0.20);color:#0F3460;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(15,52,96,0.08);font-family:inherit; }
          .he-btn-show-more:hover { background:#0F3460;border-color:#0F3460;color:#ffffff;box-shadow:0 8px 28px rgba(15,52,96,0.20);transform:translateY(-2px); }

          /* Process */
          .he-process-section { background:transparent;padding:80px 40px;position:relative;z-index:1; }
          .he-process-top { max-width:1280px;margin:0 auto 56px; }
          .he-process-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .he-process-main-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .he-process-main-desc { font-size:15px;color:#4A6080;line-height:1.7;margin:0; }
          .he-process-divider { border:none;border-top:1px solid rgba(15,52,96,0.15);margin:36px 0 0;width:100%; }
          .he-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start; }
          .he-process-steps { display:flex;flex-direction:column; }
          .he-pstep { display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1); }
          .he-pstep.visible { opacity:1;transform:translateY(0); }
          .he-pstep-left { display:flex;flex-direction:column;align-items:center; }
          .he-pstep-circle { width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background 0.3s,border-color 0.3s; }
          .he-pstep:hover .he-pstep-circle { background:rgba(245,158,11,0.2);border-color:#D97706;color:#D97706; }
          .he-pstep-arrow { flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px; }
          .he-pstep-arrow::before { content:'';width:2px;flex:1;background:#0F3460;opacity:0.25; }
          .he-pstep-arrow::after { content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #0F3460;opacity:0.45;margin-top:-1px; }
          .he-pstep:last-child .he-pstep-arrow { display:none; }
          .he-pstep-content { padding:4px 0 44px; }
          .he-pstep:last-child .he-pstep-content { padding-bottom:0; }
          .he-pstep-title { font-size:22px;font-weight:700;color:#0F3460;margin:0 0 10px;line-height:1.2; }
          .he-pstep-desc { font-size:15px;color:#4A6080;line-height:1.75;margin:0; }
          .he-process-image-col { position:sticky;top:100px;min-width:0; }
          .he-process-img-wrap { width:100%;max-width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(15,52,96,0.15);aspect-ratio:4/5;background:#e8edf5; }
          .he-process-img-wrap img { width:100%;height:100%;object-fit:cover;display:block; }

          /* Tech Stack */
          .he-tech-section { padding:80px 40px;background:transparent;position:relative;z-index:1; }
          .he-tech-inner { max-width:1280px;margin:0 auto; }
          .he-tech-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px; }
          .he-tech-group { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;padding:28px 24px;box-shadow:0 4px 20px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95); }
          .he-tech-group-title { font-size:12px;font-weight:700;color:#D97706;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px; }
          .he-tech-tags { display:flex;flex-wrap:wrap;gap:8px; }
          .he-tech-tag { padding:5px 12px;background:rgba(15,52,96,0.07);border:1px solid rgba(15,52,96,0.12);border-radius:20px;font-size:12px;font-weight:600;color:#374151; }

          /* Industries */
          .he-industries-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .he-industries-inner { max-width:1280px;margin:0 auto; }
          .he-industry-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:44px; }
          .he-industry-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;padding:26px 22px;box-shadow:0 4px 16px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,border-color 0.22s,box-shadow 0.22s;cursor:default; }
          .he-industry-card:hover { transform:translateY(-4px);border-color:rgba(217,119,6,0.35);box-shadow:0 12px 36px rgba(15,52,96,0.12); }
          .he-industry-icon { font-size:28px;margin-bottom:12px;line-height:1; }
          .he-industry-card h3 { font-size:15px;font-weight:700;color:#0F3460;margin-bottom:8px;line-height:1.3; }
          .he-industry-card p { font-size:13px;color:#4A6080;line-height:1.6; }

          /* Comparison Table */
          .he-compare-section { padding:80px 40px;background:transparent;position:relative;z-index:1; }
          .he-compare-inner { max-width:1280px;margin:0 auto; }
          .he-compare-wrap { margin-top:44px;overflow-x:auto;width:100%;-webkit-overflow-scrolling:touch; }
          .he-compare-table { width:100%;border-collapse:separate;border-spacing:0;min-width:580px; }
          .he-compare-table thead tr th { padding:16px 24px;text-align:left;font-size:14px;font-weight:700;background:#0F3460;color:#fff; }
          .he-compare-table thead tr th:first-child { border-radius:12px 0 0 0; }
          .he-compare-table thead tr th:last-child { border-radius:0 12px 0 0; }
          .he-compare-th-hl { background:linear-gradient(135deg,#1a4d80,#0F3460) !important;border-top:3px solid #D97706 !important;color:#fde68a !important; }
          .he-compare-table tbody tr td { padding:13px 24px;font-size:14px;color:#374151;border-bottom:1px solid rgba(15,52,96,0.08);background:rgba(255,255,255,0.65);vertical-align:middle; }
          .he-compare-table tbody tr td:first-child { font-weight:600;color:#0F3460;background:rgba(255,255,255,0.80); }
          .he-compare-table tbody tr td:nth-child(2) { background:rgba(254,243,199,0.35);font-weight:500;color:#0F3460; }
          .he-compare-table tbody tr:last-child td:first-child { border-radius:0 0 0 12px; }
          .he-compare-table tbody tr:last-child td:last-child { border-radius:0 0 12px 0; }
          .he-compare-table tbody tr:hover td { background:rgba(219,234,254,0.40); }
          .he-compare-table tbody tr:hover td:nth-child(2) { background:rgba(254,243,199,0.55); }

          /* Testimonials */
          .he-testi-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .he-testi-inner { max-width:1280px;margin:0 auto; }
          .he-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px; }
          .he-tcard { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s; }
          .he-tcard.he-tcard-visible { opacity:1;transform:translateY(0); }
          .he-tcard:hover { transform:translateY(-6px) !important;border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .he-tcard.featured { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.85) 55%,rgba(219,234,254,0.45) 100%);border-color:rgba(217,119,6,0.25);box-shadow:0 6px 32px rgba(217,119,6,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .he-tcard-stars { font-size:18px;color:#D97706;letter-spacing:2px; }
          .he-tcard-text { font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1; }
          .he-tcard.featured .he-tcard-text { color:#1f2937; }
          .he-tcard-author { display:flex;align-items:center;gap:12px;margin-top:4px; }
          .he-tcard-avatar { width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0; }
          .he-tcard-name { font-size:14px;font-weight:700;color:#0F3460; }
          .he-tcard-role { font-size:12px;color:#6b7280; }
          .he-testi-stats { display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(219,234,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .he-tstat { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1; }
          .he-tstat-num { font-size:28px;font-weight:800;color:#0F3460; }
          .he-tstat-label { font-size:13px;color:#4A6080;font-weight:500; }
          .he-tstat-divider { width:1px;height:40px;background:rgba(15,52,96,0.15); }

          /* Why */
          .he-why-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .he-why-inner { max-width:1280px;margin:0 auto; }
          .he-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px; }
          .he-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;text-align:left;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s; }
          .he-why-card.he-card-visible { opacity:1;transform:translateY(0) scale(1); }
          .he-why-card:hover { transform:translateY(-6px) scale(1) !important;border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .he-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .he-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .he-why-icon svg { width:28px;height:28px;fill:#D97706; }
          .he-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .he-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* Engagement Table */
          .he-engage-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .he-engage-inner { max-width:1280px;margin:0 auto; }
          .he-engage-header { text-align:center;margin-bottom:52px; }
          .he-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 14px; }
          .he-engage-desc { font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 auto; }
          .he-plans-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:20px;align-items:start; }
          .he-pcard { display:flex;flex-direction:column;height:100%;padding:30px 26px;border-radius:20px;border:1.5px solid rgba(15,52,96,0.12);background:rgba(255,255,255,0.80);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);position:relative; }
          .he-pcard--feat { border-color:rgba(217,119,6,0.40);background:linear-gradient(180deg,rgba(254,243,199,0.35) 0%,rgba(255,255,255,0.90) 100%);box-shadow:0 0 60px rgba(217,119,6,0.12),0 8px 40px rgba(15,52,96,0.08); }
          .he-pcard-pop { position:absolute;top:-13px;left:50%;transform:translateX(-50%);padding:4px 14px;border-radius:100px;background:linear-gradient(90deg,#0F3460,#1a5276 50%,#D97706);color:#fff;font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap;box-shadow:0 4px 16px rgba(217,119,6,0.28); }
          .he-pcard-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:#6B7280;background:rgba(15,52,96,0.06);padding:4px 12px;border-radius:100px;margin-bottom:14px; }
          .he-pcard-name { display:block;font-size:17px;font-weight:800;color:#0F3460;margin-bottom:10px;line-height:1.3; }
          .he-pcard--feat .he-pcard-name { color:#b45309; }
          .he-pcard-blurb { font-size:13px;color:#4A6080;line-height:1.7;margin:0 0 20px; }
          .he-pcard-features { list-style:none;padding:0;margin:0 0 24px;flex:1; }
          .he-pcard-features li { padding:8px 0;border-top:1px dashed rgba(15,52,96,0.10);font-size:13.5px;color:#374151;display:flex;align-items:flex-start;gap:8px; }
          .he-pcard-features li::before { content:'✓';color:#16a34a;font-weight:700;flex-shrink:0; }
          .he-pcard-cta { display:block;padding:12px 20px;background:rgba(15,52,96,0.07);border:1.5px solid rgba(15,52,96,0.18);border-radius:50px;color:#0F3460;font-size:13.5px;font-weight:700;text-decoration:none;text-align:center;transition:all 0.2s;margin-top:auto; }
          .he-pcard-cta:hover { background:rgba(15,52,96,0.12);transform:translateY(-1px);text-decoration:none; }
          .he-pcard-cta--feat { background:linear-gradient(135deg,#0F3460,#1a5276);border-color:transparent;color:#fff;box-shadow:0 4px 20px rgba(15,52,96,0.28); }
          .he-pcard-cta--feat:hover { background:linear-gradient(135deg,#0a2444,#0F3460);box-shadow:0 6px 28px rgba(15,52,96,0.38);color:#fff; }
          @media(max-width:1024px){ .he-plans-grid { grid-template-columns:repeat(2,1fr); } }
          @media(max-width:600px){ .he-plans-grid { grid-template-columns:1fr; } }

          /* Contact */
          .he-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .he-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .he-contact-title { font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .he-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .he-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px; }
          .he-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .he-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .he-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75; }
          .he-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .he-stats-box { padding-top:32px;border-top:1px solid rgba(15,52,96,0.12); }
          .he-stats-grid { display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px; }
          .he-stat-number { font-size:40px;font-weight:900;color:#0F3460;line-height:1;display:inline-block;margin-bottom:4px; }
          .he-stat-text { font-size:13px;color:#4A6080;line-height:1.4;font-weight:500; }
          .he-form-box { background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(237,233,254,0.25) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .he-form-box h3 { font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px; }
          .he-contact-form { display:flex;flex-direction:column;gap:16px; }
          .he-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .he-form-group { display:flex;flex-direction:column;gap:6px; }
          .he-form-group.full { grid-column:1/-1; }
          .he-form-group label { font-size:12px;font-weight:500;color:#0F1F40; }
          .he-form-group input,.he-form-group textarea,.he-form-group select { padding:10px 14px;border:1px solid rgba(15,52,96,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(15,52,96,0.06);transition:border-color 0.2s,background 0.2s; }
          .he-form-group input:focus,.he-form-group textarea:focus { outline:none;border-color:#D97706;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(217,119,6,0.12); }
          .he-phone-input { display:flex;border:1px solid rgba(15,52,96,0.15);border-radius:6px;overflow:hidden; }
          .he-phone-input select { padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px; }
          .he-phone-input input { flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none; }
          .he-phone-input input:focus { outline:none; }
          .he-consent { display:flex;gap:8px;align-items:flex-start;margin-top:8px; }
          .he-consent input[type="checkbox"] { margin-top:3px;width:16px;height:16px;cursor:pointer; }
          .he-consent label { font-size:11px;color:#4A6080;line-height:1.5;margin:0; }
          .he-consent a { color:#0F3460;text-decoration:none; }
          .he-submit-btn { padding:14px 28px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(15,52,96,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
          .he-submit-btn:hover { background:rgba(15,52,96,0.95);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }
          .he-submit-btn:disabled { opacity:0.7;cursor:not-allowed; }

          /* FAQ */
          .he-faq-section { padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);position:relative;z-index:1; }
          .he-faq-inner { max-width:1280px;margin:0 auto; }
          .he-faq-heading { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px; }
          .he-faq-list { display:flex;flex-direction:column;gap:12px; }
          .he-faq-item { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .he-faq-item.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .he-faq-item.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .he-faq-question { width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .he-faq-q-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .he-faq-item.open .he-faq-q-badge { background:#D97706;color:#fff; }
          .he-faq-question span { font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .he-faq-item.open .he-faq-question span { color:#D97706; }
          .he-faq-chevron { width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .he-faq-item.open .he-faq-chevron { transform:rotate(180deg);color:#D97706; }
          .he-faq-answer-wrap { overflow:hidden;transition:max-height 0.35s ease;max-height:0; }
          .he-faq-item.open .he-faq-answer-wrap { max-height:400px; }
          .he-faq-answer { padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8; }
          .he-faq-a-badge { display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#0F3460;color:#fff;font-size:12px;font-weight:700;border-radius:6px;margin-right:12px;flex-shrink:0;vertical-align:middle; }

          /* Related */
          .he-related-section { background:rgba(237,233,254,0.18);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px; }
          .he-related-inner { max-width:1280px;margin:0 auto;text-align:center; }
          .he-related-eyebrow { font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A6080;margin:0 0 14px;display:block; }
          .he-related-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px; }
          .he-related-sub { font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px; }
          .he-related-divider { border:none;border-top:1px solid rgba(15,52,96,0.12);margin:40px 0; }
          .he-related-tags { display:flex;flex-wrap:wrap;justify-content:center;gap:12px; }
          .he-rtag { display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s; }
          .he-rtag:hover { filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10); }
          .he-rtag-blue    { background:rgba(59,130,246,0.10);border-color:rgba(59,130,246,0.30);color:#1D4ED8; }
          .he-rtag-violet  { background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9; }
          .he-rtag-amber   { background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309; }
          .he-rtag-teal    { background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E; }
          .he-rtag-rose    { background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C; }
          .he-rtag-green   { background:rgba(34,197,94,0.10);border-color:rgba(34,197,94,0.28);color:#15803D; }
          .he-rtag-indigo  { background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.28);color:#4338CA; }
          .he-rtag-sky     { background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.28);color:#0369A1; }
          .he-rtag-emerald { background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.28);color:#065F46; }

          /* Mobile background */
          @media (max-width:900px) {
            .he-page { background-attachment:scroll !important;background:linear-gradient(160deg,#dbeafe 0%,#ede9fe 30%,#e0f2fe 55%,#fef3c7 78%,#fce7f3 100%) !important; }
          }
          @media (max-width:1024px) {
            .he-services-grid { grid-template-columns:repeat(2,1fr); }
            .he-why-grid { grid-template-columns:repeat(2,1fr); }
            .he-tech-grid { grid-template-columns:repeat(2,1fr); }
            .he-industry-grid { grid-template-columns:repeat(2,1fr); }
            .he-process-inner { grid-template-columns:1fr; }
            .he-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .he-def-section { padding:60px 20px; }
            .he-def-block { padding:28px 20px; }
            .he-def-title { font-size:24px; }
            .he-def-body { font-size:15px; }
            .he-def-facts { grid-template-columns:1fr 1fr;gap:16px; }
            .he-services-section { padding:48px 20px 40px; }
            .he-process-section { padding:60px 20px; }
            .he-process-top { margin-bottom:36px; }
            .he-tech-section { padding:60px 20px; }
            .he-tech-grid { grid-template-columns:1fr 1fr;gap:12px;margin-top:32px; }
            .he-industries-section { padding:60px 20px; }
            .he-industry-grid { grid-template-columns:1fr 1fr;gap:12px;margin-top:32px; }
            .he-compare-section { padding:60px 20px; }
            .he-compare-table thead tr th,.he-compare-table tbody tr td { padding:11px 14px;font-size:13px; }
            .he-testi-section { padding:60px 20px; }
            .he-testi-section .he-section-header-center { text-align:left; }
            .he-testi-grid { grid-template-columns:1fr; }
            .he-testi-stats { flex-wrap:wrap;padding:24px 20px; }
            .he-tstat { flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(15,52,96,0.10); }
            .he-tstat:nth-child(odd) { border-right:1px solid rgba(15,52,96,0.10); }
            .he-tstat:nth-last-child(-n+2) { border-bottom:none; }
            .he-tstat-divider { display:none; }
            .he-why-section { padding:60px 20px; }
            .he-why-section .he-section-header-center { text-align:left; }
            .he-why-grid { grid-template-columns:1fr;margin-top:40px; }
            .he-why-card { padding:24px 20px; }
            .he-engage-section { padding:60px 20px; }
            .he-contact-section { padding:48px 16px; }
            .he-contact-container { grid-template-columns:1fr;gap:20px; }
            .he-contact-title { font-size:28px; }
            .he-form-row { grid-template-columns:1fr; }
            .he-stats-grid { grid-template-columns:1fr 1fr 1fr; }
            .he-faq-section { padding:60px 20px; }
            .he-faq-heading { font-size:26px; }
            .he-faq-question { padding:18px 18px 18px 52px; }
            .he-faq-question span { font-size:14px; }
            .he-faq-answer { padding:0 18px 18px 52px;font-size:14px; }
            .he-faq-q-badge { left:14px; }
            .he-related-section { padding:60px 20px; }
            .he-related-tags { gap:8px; }
            .he-rtag { padding:9px 16px;font-size:13px; }
            .he-section-title,.he-engage-title,.he-process-main-title,.he-related-title { font-size:30px; }
          }
          @media (max-width:480px) {
            .he-section-title,.he-engage-title,.he-process-main-title,.he-related-title { font-size:26px; }
            .he-services-grid { grid-template-columns:1fr; }
            .he-service-card { padding:20px 18px 18px; }
            .he-card-num { font-size:52px; }
            .he-def-facts { grid-template-columns:1fr; }
            .he-tech-grid { grid-template-columns:1fr; }
            .he-industry-grid { grid-template-columns:1fr; }
            .he-tcard { padding:24px 20px; }
            .he-merged-box { padding:18px; }
            .he-contact-title { font-size:24px; }
          }
        
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>

      <div className="he-page">
        <div className="he-aurora" aria-hidden="true">
          <div className="he-aurora-b1" />
          <div className="he-aurora-b2" />
          <div className="he-aurora-b3" />
        </div>

        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="Professional HTML Email Development · Since 2008"
          title={<>HTML Email Development Services — <AuroraText>Pixel-Perfect Emails That Render Everywhere</AuroraText></>}
          subtext="Hand-coded, responsive HTML email templates tested across 90+ email clients. From transactional triggers to full campaign suites — built for Klaviyo, Mailchimp, HubSpot, Salesforce MC, and every major ESP."
          primaryCta={{ label: 'Get a Free Email Template Quote', href: '#contact' }}
          stats={[
            { label: 'Email Templates Built', value: '150', suffix: '+' },
            { label: 'ESPs Supported', value: '12', suffix: '+' },
            { label: 'Email Clients Tested', value: '90', suffix: '+' },
            { label: 'Client Satisfaction', value: '9', prefix: '4.', suffix: '/5' },
          ]}
        />

        {/* ── DEFINITION ── */}
        <section className="he-def-section">
          <div className="he-def-inner">
            <div className={`he-def-block he-section-reveal${visibleSections.has('def') ? ' he-revealed' : ''}`} ref={el => { sectionRefs.current['def'] = el; }}>
              <span className="he-def-eyebrow">Definition</span>
              <h2 className="he-def-title">What Is HTML Email Development?</h2>
              <p className="he-def-body">
                <strong>HTML email development</strong> is the process of hand-coding email templates using table-based HTML, inline CSS, and client-specific techniques to ensure consistent rendering across every inbox. Unlike websites — which benefit from modern CSS Grid, Flexbox, and JavaScript — emails are rendered by dozens of different clients (Gmail, Outlook, Apple Mail) each with their own rendering engine and unique quirks.
              </p>
              <p className="he-def-body">
                Outlook 2007–2023 uses Microsoft Word as its rendering engine. Gmail clips emails over 102KB. Dark mode inverts colours on many clients. A professional HTML email development service ensures your templates survive all of these environments — Outlook-proofed, dark-mode-ready, and responsive from desktop to mobile without breaking.
              </p>
              <div className="he-def-facts">
                {[['90+','email clients and environments we test across'],['102KB','Gmail clip limit — we keep all templates under 100KB'],['40%+','of subscribers read email in dark mode']].map(([num, label]) => (
                  <div className="he-def-fact" key={label}>
                    <span className="he-def-fact-num">{num}</span>
                    <span className="he-def-fact-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="he-services-section">
          <div className="he-services-inner">
            <div className={`he-section-reveal${visibleSections.has('services') ? ' he-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="he-section-eyebrow">Our Services</span>
              <h2 className="he-section-title">HTML Email Development Services We Offer</h2>
              <p className="he-section-desc">From a single transactional template to a full suite of branded components — hand-coded, tested, and delivered in your ESP&apos;s native format.</p>
            </div>
            <div className="he-services-grid">
              {visibleServices.map(s => (
                <div key={s.n} className={`he-service-card${s.featured ? ' featured' : ''}`}>
                  <span className="he-card-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="he-services-footer">
              <button className="he-btn-show-more" onClick={() => setShowAll(v => !v)}>
                {showAll ? 'Show Less ↑' : 'Show More Email Services ↓'}
              </button>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="he-process-section">
          <div className="he-process-top">
            <div className={`he-section-reveal${visibleSections.has('process') ? ' he-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
              <p className="he-process-eyebrow">HOW WE WORK</p>
              <h2 className="he-process-main-title">How We Deliver HTML Email Development</h2>
              <p className="he-process-main-desc">Our email development team follows a 4-step process — brief to tested, inbox-ready delivery. No drag-and-drop shortcuts, no builder bloat, no rendering surprises on send day.</p>
            </div>
            <hr className="he-process-divider" />
          </div>
          <div className="he-process-inner">
            <div className="he-process-steps">
              {[
                ['Brief & Design', 'We review your brand guidelines, ESP environment, and email objectives — then produce a design mockup for your approval before any coding begins.'],
                ['Code & Build', 'We hand-code the template using table-based HTML, MSO conditional comments, and fluid-hybrid responsive techniques — no drag-and-drop builders, no shortcuts.'],
                ['Cross-Client Testing', "We test across 90+ email clients in Litmus or Email on Acid, verify dark mode behaviour, check plain-text rendering, and confirm file size stays under Gmail's 102KB clip limit."],
                ['Deliver & Deploy', "We deliver in your ESP's native format — with editable regions, content blocks, and a handoff guide — ready to schedule and send."],
              ].map(([title, desc], i) => (
                <div
                  className={`he-pstep${visibleSteps.includes(i) ? ' visible' : ''}`}
                  key={title}
                  ref={el => { stepRefs.current[i] = el; }}
                >
                  <div className="he-pstep-left">
                    <div className="he-pstep-circle">{i + 1}</div>
                    {i < 3 && <div className="he-pstep-arrow" />}
                  </div>
                  <div className="he-pstep-content">
                    <h3 className="he-pstep-title">{title}</h3>
                    <p className="he-pstep-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="he-process-image-col">
              <div className="he-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/office.png" alt="1Solutions HTML email development team" />
              </div>
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="he-tech-section">
          <div className="he-tech-inner">
            <div className={`he-section-reveal${visibleSections.has('tech') ? ' he-revealed' : ''}`} ref={el => { sectionRefs.current['tech'] = el; }}>
              <span className="he-section-eyebrow">Technology & Platforms</span>
              <h2 className="he-section-title">ESPs, Tools & Standards We Work With</h2>
              <p className="he-section-desc">We stay current with the full email technology landscape — from widely used ESPs to niche platforms, testing tools, and emerging standards like AMP for Email.</p>
            </div>
            <div className="he-tech-grid">
              {TECH_STACK.map(group => (
                <div className="he-tech-group" key={group.group}>
                  <div className="he-tech-group-title">{group.group}</div>
                  <div className="he-tech-tags">
                    {group.items.map(item => <span className="he-tech-tag" key={item}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="he-industries-section">
          <div className="he-industries-inner">
            <div className={`he-section-reveal${visibleSections.has('industries') ? ' he-revealed' : ''}`} ref={el => { sectionRefs.current['industries'] = el; }}>
              <span className="he-section-eyebrow">Industries We Serve</span>
              <h2 className="he-section-title">HTML Email Development Across Industries</h2>
              <p className="he-section-desc">We have built email templates for businesses across 8+ verticals — bringing domain-specific knowledge to inbox placement, content hierarchy, and conversion-focused design.</p>
            </div>
            <div className="he-industry-grid">
              {INDUSTRIES.map(ind => (
                <div className="he-industry-card" key={ind.title}>
                  <div className="he-industry-icon">{ind.icon}</div>
                  <h3>{ind.title}</h3>
                  <p>{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="he-compare-section">
          <div className="he-compare-inner">
            <div className={`he-section-reveal${visibleSections.has('compare') ? ' he-revealed' : ''}`} ref={el => { sectionRefs.current['compare'] = el; }}>
              <span className="he-section-eyebrow">Why Choose Us</span>
              <h2 className="he-section-title">1Solutions vs DIY Builders vs Freelancers</h2>
              <p className="he-section-desc">See how our dedicated HTML email development service compares against the alternatives.</p>
            </div>
            <div className="he-compare-wrap">
              <table className="he-compare-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="he-compare-th-hl">1Solutions</th>
                    <th>DIY Builder</th>
                    <th>Freelancer</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Code Quality','Hand-coded, clean HTML','Bloated builder output','Varies widely'],
                    ['Outlook Compatibility','MSO conditionals & VML','Often broken','Depends on skill'],
                    ['Dark Mode Support','Tested & coded for dark mode','Usually ignored','Rarely included'],
                    ['Cross-Client Testing','90+ clients via Litmus','None','Sometimes partial'],
                    ['File Size Control','Under 100KB target','Often 150KB+','Varies'],
                    ['ESP Integration','Native blocks & modules','Generic export','Copy-paste only'],
                    ['Turnaround','3–5 business days','Instant (but broken)','Days to weeks'],
                    ['Accessibility','WCAG 2.1 AA built in','None','Rarely included'],
                  ].map(([feature, us, diy, freelancer]) => (
                    <tr key={feature}>
                      <td>{feature}</td>
                      <td>{us}</td>
                      <td>{diy}</td>
                      <td>{freelancer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="he-testi-section">
          <div className="he-testi-inner">
            <div className={`he-section-header-center he-section-reveal${visibleSections.has('testi') ? ' he-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="he-section-eyebrow">Client Reviews</span>
              <h2 className="he-section-title">Know What Our Customers Say</h2>
              <p className="he-section-sub">Trusted by eCommerce brands, SaaS companies, and agencies across the US, Canada, and Australia.</p>
            </div>
            <div className="he-testi-grid" ref={testiGridRef}>
              {[
                { initials:'KR', bg:'#1a4a7a', text:'"1Solutions rebuilt our entire Klaviyo template library from scratch. Every email renders perfectly in Outlook, dark mode looks great, and our click rates went up 22% in the first month. Incredible attention to detail."', name:'Karen Richards', role:'Email Marketing Manager, Retail Brand — USA', featured:false },
                { initials:'TM', bg:'#0F3460', text:"\"We've tried three different freelancers for HTML email work and always ended up with Outlook issues. 1Solutions solved everything first try — MSO conditionals, dark mode, 90+ client testing. This is what professional email development looks like.\"", name:'Tom McCarthy', role:'CTO, SaaS Platform — Australia', featured:true },
                { initials:'SP', bg:'#2d5a8e', text:'"Fast, accurate, and genuinely understand email. Our HubSpot custom modules were delivered in 4 days with full inline editing. We\'ve been on retainer ever since and wouldn\'t use anyone else."', name:'Sarah Park', role:'Digital Director, Agency — Canada', featured:false },
              ].map((t, i) => (
                <div className={`he-tcard${t.featured ? ' featured' : ''}${visibleTestiCards.includes(i) ? ' he-tcard-visible' : ''}`} key={t.name}>
                  <div className="he-tcard-stars">★★★★★</div>
                  <p className="he-tcard-text">{t.text}</p>
                  <div className="he-tcard-author">
                    <div className="he-tcard-avatar" style={{ background: t.bg }}>{t.initials}</div>
                    <div>
                      <div className="he-tcard-name">{t.name}</div>
                      <div className="he-tcard-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="he-testi-stats">
              {[['4.9/5','Average Rating'],['150+','Templates Delivered'],['98%','Client Satisfaction'],['90%','Repeat Clients']].map(([num, label], i, arr) => (
                <>
                  <div className="he-tstat" key={label}>
                    <span className="he-tstat-num">{num}</span>
                    <span className="he-tstat-label">{label}</span>
                  </div>
                  {i < arr.length - 1 && <div className="he-tstat-divider" key={`d${i}`} />}
                </>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section className="he-why-section">
          <div className="he-why-inner">
            <div className={`he-section-reveal${visibleSections.has('why') ? ' he-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }} style={{ textAlign:'center', marginBottom:0 }}>
              <span className="he-section-eyebrow">Why 1Solutions</span>
              <h2 className="he-section-title">Why Businesses Choose Us for HTML Email Development</h2>
              <p className="he-section-sub" style={{ maxWidth:680, margin:'0 auto' }}>We don&apos;t just build templates — we build emails that survive every inbox. Here&apos;s what sets us apart.</p>
            </div>
            <div className="he-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`he-why-card${visibleWhyCards.includes(i) ? ' he-card-visible' : ''}`} key={w.title}>
                  <div className="he-why-card-header">
                    <div className="he-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="he-engage-section" id="engagement">
          <div className="he-engage-inner">
            <div className="he-engage-header">
              <span className="he-section-eyebrow">How We Engage</span>
              <h2 className="he-engage-title">Flexible Engagement Models</h2>
              <p className="he-engage-desc">Pick the model that fits your project, team, and budget — every plan includes a free discovery call and NDA on request.</p>
            </div>

            <div className="he-plans-grid">
              <article className="he-pcard">
                <span className="he-pcard-badge">One-time</span>
                <span className="he-pcard-name">Fixed-Price Project</span>
                <p className="he-pcard-blurb">Defined scope &amp; budget — ideal for clearly-scoped builds with a fixed timeline and deliverables.</p>
                <ul className="he-pcard-features">
                  <li>Shared specialist team</li>
                  <li>Fixed scope &amp; deliverables</li>
                  <li>Budget predictability</li>
                  <li>Monthly progress report</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="he-pcard-cta">Get a Quote</a>
              </article>
              <article className="he-pcard">
                <span className="he-pcard-badge">Flexible</span>
                <span className="he-pcard-name">Time &amp; Materials</span>
                <p className="he-pcard-blurb">Scale with evolving requirements — pay for what's delivered, adjust scope any sprint.</p>
                <ul className="he-pcard-features">
                  <li>Shared specialist team</li>
                  <li>Flexible, evolving scope</li>
                  <li>Bi-weekly reporting</li>
                  <li>Priority task queue</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="he-pcard-cta">Get a Quote</a>
              </article>
              <article className="he-pcard he-pcard--feat">
                <span className="he-pcard-pop">✦ Most Popular</span>
                <span className="he-pcard-name">Dedicated Team</span>
                <p className="he-pcard-blurb">Your extended team — specialists embedded in your workflow, committed to your long-term growth.</p>
                <ul className="he-pcard-features">
                  <li>Dedicated senior specialists</li>
                  <li>Exclusive monthly retainer</li>
                  <li>Daily standups &amp; tracking</li>
                  <li>Same-day support response</li>
                  <li>NDA &amp; full IP protection</li>
                </ul>
                <a href="#contact" className="he-pcard-cta he-pcard-cta--feat">Get Started</a>
              </article>
              <article className="he-pcard">
                <span className="he-pcard-badge">Cost-efficient</span>
                <span className="he-pcard-name">Offshore Model</span>
                <p className="he-pcard-blurb">Maximum ROI with our expert offshore team — senior-level quality at budget-friendly rates.</p>
                <ul className="he-pcard-features">
                  <li>Expert offshore team</li>
                  <li>Cost-effective delivery</li>
                  <li>Monthly progress report</li>
                  <li>Budget-focused pricing</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="he-pcard-cta">Get a Quote</a>
              </article>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="he-contact-section" id="contact">
          <div className="he-contact-container">
            <div>
              <h2 className="he-contact-title">Ready to Build Emails That Actually Render?</h2>
              <p className="he-contact-desc">Tell us your ESP, send volume, and template needs — we&apos;ll quote within 24 hours and deliver your first template in under a week.</p>
              <div className="he-merged-box">
                <div>
                  {[
                    { icon:<svg className="he-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your brand assets and ESP credentials are handled with full confidentiality. NDA signed as standard.' },
                    { icon:<svg className="he-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A real email developer reviews your brief — not automated responses or sales scripts.' },
                    { icon:<svg className="he-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Quote within 24 business hours. First template delivered in 3–5 business days.' },
                    { icon:<svg className="he-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:"No obligation to proceed. Let's just talk about your email needs." },
                  ].map((b, i) => (
                    <div className="he-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="he-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="he-stats-box">
                  <div className="he-stats-grid">
                    {[['150+','Templates Delivered'],['16+','Years Experience'],['90+','Email Clients Tested']].map(([num, text]) => (
                      <div key={text}>
                        <div className="he-stat-number">{num}</div>
                        <div className="he-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="he-form-box">
                <h3>Contact Us</h3>
                <form className="he-contact-form" onSubmit={_sfSubmit}>
                  <div className="he-form-row">
                    <div className="he-form-group"><label>Full Name*</label><input name="sf-name" type="text" placeholder="Full Name*" required /></div>
                    <div className="he-form-group"><label>Business Email*</label><input type="email" name="sf-email" placeholder="Business Email Address*" required /></div>
                  </div>
                  <div className="he-form-row">
                    <div className="he-form-group">
                      <label>Phone Number*</label>
                      <div className="he-phone-input">
                        <select name="sf-cc">
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>
                        <input type="tel" name="sf-phone" placeholder="Phone Number*" required />
                      </div>
                    </div>
                    <div className="he-form-group"><label>Organization*</label><input name="sf-company" type="text" placeholder="Organization / Institution*" required /></div>
                  </div>
                  <div className="he-form-group full"><label>Message*</label><textarea name="sf-message" placeholder="Tell us about your ESP, template type, and send volume..." rows={6} required /></div>
                  <div className="he-consent">
                    <input type="checkbox" id="he-consent" required />
                    <label htmlFor="he-consent">I consent that my personal data will be processed according to <Link href="/privacy-policy/">1Solutions privacy policy</Link></label>
                  </div>
                  <button type="submit" className="he-submit-btn" disabled={_sfSt === 'loading'}>
                    {_sfSt === 'loading' ? 'Sending...' : 'Submit'}
                  </button>
                  {_sfSt === 'error' && <div style={{marginTop:'12px',padding:'12px 16px',background:'#fef2f2',border:'1px solid #fca5a5',borderRadius:'8px',color:'#991b1b',fontSize:'0.875rem',fontWeight:500}}>Something went wrong. Please email info@1solutions.biz</div>}
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="he-faq-section" id="faq">
          <div className="he-faq-inner">
            <h2 className="he-faq-heading">HTML Email Development — Frequently Asked Questions</h2>
            <div className="he-faq-list">
              {FAQS.map((faq, i) => (
                <div className={`he-faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                  <button className="he-faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <div className="he-faq-q-badge">Q</div>
                    <span>{faq.q}</span>
                    <svg className="he-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="he-faq-answer-wrap">
                    <div className="he-faq-answer"><span className="he-faq-a-badge">A</span>{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        <section className="he-related-section">
          <div className="he-related-inner">
            <span className="he-related-eyebrow">RELATED OFFERINGS</span>
            <h2 className="he-related-title">Explore Related Services</h2>
            <p className="he-related-sub">Pair our HTML email development expertise with related digital services to tackle your most important marketing and development initiatives.</p>
            <hr className="he-related-divider" />
            <div className="he-related-tags">
              {[
                ['WordPress Development',            'violet',  '/wordpress-development-company'],
                ['WordPress Maintenance & Support',  'green',   '/wordpress-support-and-maintenance-services'],
                ['Digital Marketing Services',       'amber',   '/digital-marketing-services'],
                ['Next.js Development Services',     'sky',     '/nextjs-development-services'],
                ['SEO Services',                     'rose',    '/seo-services-company'],
                ['UI/UX Design Services',            'blue',    '/website-design'],
                ['eCommerce Development',            'teal',    '/ecommerce-website-development-services'],
                ['Content Marketing',                'emerald', '/content-copywriting-services'],
                ['PPC Management',                   'indigo',  '/ppc-management-services'],
              ].map(([label, color, href]) => (
                <Link href={href} className={`he-rtag he-rtag-${color}`} key={label}>{label}</Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
