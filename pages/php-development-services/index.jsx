'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { n:'01', title:'Custom PHP Web Application Development', desc:'Bespoke PHP applications built around your business logic — scalable architecture, clean codebase, and long-term maintainability delivered from day one.', featured:false },
  { n:'02', title:'Laravel Application Development', desc:'Sophisticated web apps, REST APIs, admin panels, and SaaS platforms built on Laravel — the most robust PHP framework trusted by global enterprises.', featured:true },
  { n:'03', title:'REST API & Backend Development', desc:'Fast, secure, and well-documented RESTful APIs and GraphQL endpoints powering web apps, mobile apps, and third-party integrations at any scale.', featured:false },
  { n:'04', title:'PHP CMS Development', desc:'Custom CMS builds and extensions on WordPress, Drupal, and Joomla — tailored to your editorial workflow, permissions model, and content structure.', featured:false },
  { n:'05', title:'Legacy PHP Migration & Modernisation', desc:'Refactor or rebuild legacy PHP 5.x/7.x codebases onto modern PHP 8 + Laravel or Symfony — improving security, performance, and developer productivity.', featured:false },
  { n:'06', title:'PHP eCommerce Development', desc:'Custom ecommerce platforms and WooCommerce extensions built in PHP — with bespoke pricing engines, ERP integrations, and buyer-specific checkout workflows.', featured:false },
  { n:'07', title:'PHP Portal & Dashboard Development', desc:'Multi-user portals, admin dashboards, reporting tools, and client-facing self-service platforms — with role-based access control and clean data visualisation.', featured:false },
  { n:'08', title:'Third-Party API Integration', desc:'Connect your PHP application with CRMs, payment gateways, ERPs, and external platforms — Stripe, Salesforce, HubSpot, QuickBooks, and more.', featured:false },
  { n:'09', title:'PHP Microservices Architecture', desc:'Decouple monolithic PHP applications into maintainable microservices using modern patterns — event-driven architecture, message queues, and containerised deployments.', featured:false },
  { n:'10', title:'PHP Security & Performance Audits', desc:'OWASP-aligned security reviews, code audits, query optimisation, and caching strategies — fixing vulnerabilities and boosting response times in existing PHP apps.', featured:false },
  { n:'11', title:'Headless CMS & API-First Development', desc:'Decouple your PHP backend from the frontend — WordPress or custom PHP as a headless CMS powering React, Next.js, or mobile frontends via REST or GraphQL.', featured:false },
  { n:'12', title:'PHP Support & Maintenance', desc:'Ongoing support for live PHP applications — bug fixing, security patching, dependency updates, performance monitoring, and feature enhancements on retainer.', featured:false },
];

const FAQS = [
  { q:'Is PHP still a good choice for web development in 2025?', a:'Absolutely. PHP 8.x is a modern, high-performance language with significant improvements in type safety, performance (JIT compilation), and developer ergonomics. It powers over 75% of all websites including Facebook (via Hack), Wikipedia, and WordPress. With Laravel, PHP is fully competitive with Node.js, Python, and Ruby for web application development — with a massive ecosystem and 30 years of proven reliability in production.' },
  { q:'What is Laravel and why do you recommend it?', a:'Laravel is the most popular PHP framework — providing a rich ecosystem for building modern web applications. It includes Eloquent ORM, Blade templating, built-in authentication, queue management, job scheduling, real-time broadcasting, and an extensive package ecosystem via Composer. For most PHP web applications, API backends, and SaaS products, Laravel is our framework of choice because it enforces good architecture and dramatically accelerates development while maintaining code quality.' },
  { q:'How much does custom PHP development cost?', a:'PHP development costs vary significantly based on complexity. A simple web application (5-10 features, basic API) typically costs $5,000-$15,000. A medium-complexity Laravel application with custom APIs, user roles, and integrations runs $15,000-$40,000. Enterprise-grade platforms with complex business logic, multiple integrations, and high scalability requirements range from $40,000-$150,000+. We provide fixed-price quotes after a free discovery session — no surprises, no hidden costs.' },
  { q:'How long does a typical PHP development project take?', a:'A simple custom PHP application typically takes 6-10 weeks. A medium-complexity Laravel project runs 10-18 weeks. Large enterprise PHP platforms can take 4-9 months depending on scope. We share a detailed project timeline in the proposal stage and maintain weekly progress updates throughout. Our sprint-based process means you see working software every 2 weeks — not just progress reports.' },
  { q:'Can you modernise our legacy PHP application?', a:'Yes — legacy PHP migration is one of our most common and impactful engagements. We typically encounter PHP 5.x or early 7.x codebases with mixed procedural and OOP code, no test coverage, and outdated dependencies. Our modernisation approach involves an architecture assessment, incremental refactoring to PHP 8 + Laravel/Symfony, introducing test coverage, and containerising the deployment — resulting in a maintainable, secure, and performant application.' },
  { q:'Do you work with clients in the US, Canada, and Australia?', a:'Yes — 100% of our PHP development work is delivered remotely to clients across the US, Canada, and Australia. We have been working internationally since 2008. We schedule meetings in your time zone, use Slack, Notion, and Loom for communication, and maintain full transparency with weekly sprint demos and shared project dashboards. Our 97% client retention rate reflects the quality of our remote delivery model.' },
  { q:'Do you write tests for PHP applications?', a:'Yes — automated testing is part of our standard development process. For Laravel projects, we write PHPUnit and Pest tests covering unit tests for business logic, feature tests for API endpoints, and integration tests for external service interactions. We aim for meaningful test coverage on critical paths rather than arbitrary percentage targets. Test coverage is handed over as part of the project, enabling your team to extend the application confidently.' },
  { q:'What PHP frameworks do you work with?', a:'Our primary framework is Laravel, which we use for the majority of new PHP projects. We also work extensively with Symfony (particularly for enterprise applications and API Platform), CodeIgniter (for simpler projects and legacy modernisation), Yii2 (for existing Yii applications), and CakePHP. For CMS-based projects, we have deep expertise in WordPress (including headless), Drupal, and Joomla. We always recommend the framework best suited to your specific project requirements and team.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>, title:'15+ Years of PHP Expertise', desc:'Since 2008 we have delivered 300+ PHP projects — from simple APIs to multi-tenant SaaS platforms. Our depth of experience means fewer surprises and faster, cleaner delivery.' },
  { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>, title:'Laravel-First Approach', desc:'Laravel is our framework of choice for complex applications. We follow Laravel best practices — service containers, repository patterns, queue workers, and API resources out of the box.' },
  { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, title:'Security-First Development', desc:'Every PHP application includes OWASP-aligned practices: input validation, prepared statements, CSRF protection, rate limiting, and regular dependency audits — security by design.' },
  { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, title:'Clean, Documented Code', desc:'We write code your team can understand, extend, and maintain. Full PHPDoc comments, README documentation, API docs via Swagger/OpenAPI, and meaningful commit history.' },
  { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title:'US, Canada & Australia Focused', desc:'We understand the infrastructure, compliance expectations, and market requirements of western markets — timezone overlap, clear communication, and no cultural friction.' },
  { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, title:'Full-Stack Delivery', desc:'PHP backend, React or Next.js frontend, cloud infrastructure on AWS or DigitalOcean, CI/CD pipelines, and ongoing support — complete delivery under one roof.' },
  { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title:'Dedicated Project Manager', desc:'No ticket queues or offshore account managers. You get a single dedicated PM who understands your application, tracks every sprint, and keeps you updated in plain English.' },
  { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title:'97% Client Retention Rate', desc:'We do not disappear after launch. Maintenance retainers, support plans, and long-term development partnerships — we stay invested in your application\'s success.' },
];

const TECH_STACK = [
  { group:'Frameworks & Libraries', items:['Laravel 11.x','Symfony 7','CodeIgniter 4','Yii2','CakePHP','Lumen / Slim'] },
  { group:'CMS Platforms',          items:['WordPress / WooCommerce','Drupal 10','Joomla 4','Headless CMS','WPGraphQL','ACF Pro'] },
  { group:'Languages & Databases',  items:['PHP 8.x','MySQL / MariaDB','PostgreSQL','Redis','Elasticsearch','REST & GraphQL'] },
  { group:'DevOps & Cloud',         items:['AWS (EC2, RDS, S3)','DigitalOcean','Docker','Kubernetes','GitHub Actions','Forge / Envoyer'] },
  { group:'Frontend Integration',   items:['React / Next.js','Vue.js / Inertia.js','Alpine.js','Blade Templates','Tailwind CSS','HTMX'] },
  { group:'Testing & Security',     items:['PHPUnit / Pest','Laravel Dusk','OWASP Top 10','Composer Audit','Horizon','Laravel Telescope'] },
];

const INDUSTRIES = [
  { icon:'🛒', title:'eCommerce & Retail',       desc:'Custom WooCommerce extensions, bespoke checkout flows, ERP integrations, and multi-currency platforms for D2C and B2B brands.' },
  { icon:'🏥', title:'Healthcare & MedTech',     desc:'HIPAA-aware PHP applications for clinics, patient portals, telehealth platforms, and medical data management systems.' },
  { icon:'🏦', title:'FinTech & Finance',         desc:'Secure financial dashboards, payment integrations, loan origination platforms, and reporting tools for regulated financial services.' },
  { icon:'🎓', title:'Education & eLearning',    desc:'LMS platforms with LearnDash, course management systems, student portals, and subscription-based learning applications in PHP.' },
  { icon:'🏠', title:'Real Estate & PropTech',   desc:'Property listing portals, CRM integrations, automated valuation tools, and agent management platforms built in Laravel.' },
  { icon:'🚀', title:'SaaS & B2B Software',      desc:'Multi-tenant SaaS platforms, billing integrations with Stripe, feature-flagging, usage analytics, and subscription management in PHP.' },
  { icon:'🏭', title:'Manufacturing & Logistics', desc:'Custom ERP modules, inventory management systems, fleet tracking integrations, and supply chain dashboards built on PHP.' },
  { icon:'📊', title:'Analytics & Reporting',    desc:'Business intelligence dashboards, data aggregation pipelines, scheduled report generation, and API-driven analytics platforms.' },
];

const PROCESS_STEPS = [
  { n:'01', title:'Discovery & Technical Scoping', desc:'We map your business requirements to a concrete technical specification — architecture decisions, database design, API contracts, and integration points documented before a single line of code is written.' },
  { n:'02', title:'Architecture & Database Design', desc:'We design the data model, service layer, and API structure upfront — ensuring the foundation supports future scale without costly rewrites. Laravel\'s Eloquent ORM and service container architecture guide every decision.' },
  { n:'03', title:'Agile Development in Sprints', desc:'Two-week sprints with demo-ready milestones. Code reviews, automated tests, and staging deployments at every sprint — you see working software, not progress reports.' },
  { n:'04', title:'QA, Security Review & Deployment', desc:'Functional testing, PHPUnit/Pest test suites, OWASP security review, and performance profiling — followed by production deployment, server configuration, and a 30-day hypercare period.' },
];

const TESTIMONIALS = [
  { name:'David Harcourt', role:'CTO, Nexus Commerce — US', rating:5, text:'1Solutions rebuilt our legacy PHP 5 eCommerce platform on Laravel 10. The migration was seamless — zero downtime, full test coverage, and performance improved by 4x. Their team understood our complex pricing logic and delivered exactly what we scoped.' },
  { name:'Sarah Liu', role:'Founder, HealthTrack — Australia', rating:5, text:'We needed a custom PHP application for patient data management with strict security requirements. 1Solutions delivered an OWASP-compliant Laravel platform on time and on budget. Their documentation and code quality is exceptional.' },
  { name:'James Thornton', role:'VP Engineering, B2B SaaS — Canada', rating:5, text:'We\'ve used 1Solutions as our PHP development partner for 3 years across 5 projects. Consistent quality, transparent communication, and they actually care about code maintainability — not just shipping features.' },
];

export default function PhpDevelopmentServices() {
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
          WHY.forEach((_, i) => {
            setTimeout(() => setVisibleWhyCards(prev => prev.includes(i) ? prev : [...prev, i]), i * 100);
          });
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
          [0,1,2].forEach(i => setTimeout(() => setVisibleTestiCards(p => p.includes(i)?p:[...p,i]), i * 150));
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

  const _sfSubmit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = { name: fd.get('sf-name'), email: fd.get('sf-email'), phone: fd.get('sf-phone'), company: fd.get('sf-company'), message: fd.get('sf-message'), source: 'PHP Development Services' };
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
      if (res.ok) { e.target.reset(); alert('Thank you! We will be in touch within 24 hours.'); }
    } catch {}
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: 'https://www.1solutions.biz/logo.png',
        contactPoint: { '@type':'ContactPoint', telephone:'+91-9654327900', contactType:'customer service', areaServed:['US','CA','AU','GB'] },
        sameAs: ['https://www.facebook.com/1solutions','https://x.com/1solutionsbiz','https://www.linkedin.com/company/1solutions'],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.1solutions.biz/php-development-services/',
        url: 'https://www.1solutions.biz/php-development-services/',
        name: 'PHP Development Services | Laravel & Custom PHP Solutions | 1Solutions',
        description: 'Expert PHP development services — custom web applications, Laravel, REST APIs, legacy migration, ecommerce & CMS for US, Canada & Australia.',
        inLanguage: 'en-US',
        breadcrumb: { '@type':'BreadcrumbList', itemListElement:[{ '@type':'ListItem', position:1, name:'Home', item:'https://www.1solutions.biz/' },{ '@type':'ListItem', position:2, name:'PHP Development Services', item:'https://www.1solutions.biz/php-development-services/' }] },
      },
      {
        '@type': 'ProfessionalService',
        name: '1Solutions — PHP Development Services',
        url: 'https://www.1solutions.biz/php-development-services/',
        image: 'https://www.1solutions.biz/logo.png',
        telephone: '+91-9654327900',
        email: 'info@1solutions.biz',
        address: { '@type':'PostalAddress', streetAddress:'47, Vijay Block, Laxmi Nagar', addressLocality:'New Delhi', postalCode:'110092', addressCountry:'IN' },
        areaServed: ['US','CA','AU','GB'],
        priceRange: '$$',
        aggregateRating: { '@type':'AggregateRating', ratingValue:'4.9', reviewCount:'200', bestRating:'5' },
      },
      {
        '@type': 'HowTo',
        name: 'How We Deliver PHP Development Projects',
        step: PROCESS_STEPS.map((s, i) => ({ '@type':'HowToStep', position: i + 1, name: s.title, text: s.desc })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a } })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>PHP Development Services | Laravel & Custom PHP Solutions | 1Solutions</title>
        <meta name="description" content="Expert PHP development company — custom web apps, Laravel, REST APIs, legacy migration & ecommerce for US, Canada & Australia. 300+ PHP projects delivered since 2008." />
        <meta name="keywords" content="php development services, php development company, laravel development, custom php development, php web application development, php agency, laravel agency" />
        <link rel="canonical" href="https://www.1solutions.biz/php-development-services/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PHP Development Services | Laravel & Custom PHP | 1Solutions" />
        <meta property="og:description" content="Custom PHP & Laravel web application development. Clean code, security-first, fully documented. Serving US, Canada & Australia since 2008." />
        <meta property="og:url" content="https://www.1solutions.biz/php-development-services/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
          .php-section-reveal { opacity:0;transform:translateY(24px);transition:opacity 0.55s ease,transform 0.55s ease; }
          .php-revealed { opacity:1;transform:translateY(0); }

          /* Section eyebrow / title shared */
          .php-section-eyebrow { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .php-section-title { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 14px; }
          .php-section-desc { font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 0 44px; }

          /* Services */
          .php-services-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:90px 40px; }
          .php-services-inner { max-width:1280px;margin:0 auto; }
          .php-services-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:44px; }
          .php-svc-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(237,233,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.05);transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .php-svc-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.30);box-shadow:0 16px 48px rgba(15,52,96,0.10); }
          .php-svc-card.featured { border-color:rgba(217,119,6,0.40);background:linear-gradient(135deg,rgba(254,243,199,0.60) 0%,rgba(255,255,255,0.95) 60%,rgba(255,237,213,0.30) 100%); }
          .php-svc-num { position:absolute;top:8px;right:14px;font-size:68px;font-weight:900;line-height:1;color:#0F3460;opacity:0.04;letter-spacing:-4px;pointer-events:none; }
          .php-svc-card h3 { font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin:0 0 8px;position:relative;z-index:1; }
          .php-svc-card p { font-size:13px;color:#4A6080;line-height:1.6;margin:0;position:relative;z-index:1; }

          /* Process */
          .php-process-section { background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:90px 40px; }
          .php-process-inner { max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center; }
          .php-process-steps { display:flex;flex-direction:column;gap:0; }
          .php-process-step { display:grid;grid-template-columns:56px 1fr;gap:20px;align-items:flex-start;padding:28px 0;border-bottom:1px solid rgba(15,52,96,0.06);opacity:0;transform:translateX(-20px);transition:opacity 0.45s ease,transform 0.45s ease; }
          .php-process-step:last-child { border-bottom:none; }
          .php-process-step.visible { opacity:1;transform:translateX(0); }
          .php-step-num { font-size:2.8rem;font-weight:900;color:rgba(15,52,96,0.12);line-height:1;letter-spacing:-2px; }
          .php-step-body h3 { font-size:1.05rem;font-weight:800;color:#0F1F40;margin:0 0 6px; }
          .php-step-body p { font-size:0.88rem;color:#4A6080;line-height:1.7;margin:0; }
          .php-process-image-col { position:sticky;top:100px; }
          .php-process-image-col img { width:100%;border-radius:20px;box-shadow:0 24px 72px rgba(15,52,96,0.12); }

          /* Tech Stack */
          .php-tech-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:90px 40px; }
          .php-tech-inner { max-width:1280px;margin:0 auto; }
          .php-tech-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:44px; }
          .php-tech-group { background:rgba(255,255,255,0.70);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;padding:24px; }
          .php-tech-group-title { font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#D97706;margin:0 0 14px; }
          .php-tech-pills { display:flex;flex-wrap:wrap;gap:8px; }
          .php-tech-pill { font-size:12px;font-weight:600;color:#0F3460;background:rgba(15,52,96,0.07);border:1px solid rgba(15,52,96,0.12);border-radius:50px;padding:5px 13px;white-space:nowrap; }

          /* Industries */
          .php-industries-section { background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:90px 40px; }
          .php-industries-inner { max-width:1280px;margin:0 auto; }
          .php-industries-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:44px; }
          .php-industry-card { background:linear-gradient(135deg,rgba(219,234,254,0.40) 0%,rgba(255,255,255,0.85) 100%);border:1px solid rgba(15,52,96,0.08);border-radius:16px;padding:24px;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .php-industry-card:hover { transform:translateY(-4px);border-color:rgba(217,119,6,0.30);box-shadow:0 12px 36px rgba(15,52,96,0.08); }
          .php-industry-icon { font-size:28px;margin-bottom:12px; }
          .php-industry-card h3 { font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px; }
          .php-industry-card p { font-size:12.5px;color:#4A6080;line-height:1.6;margin:0; }

          /* Why */
          .php-why-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:90px 40px; }
          .php-why-inner { max-width:1280px;margin:0 auto; }
          .php-why-grid { display:grid;grid-template-columns:repeat(4,1fr);margin-top:44px;gap:16px; }
          .php-why-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s;opacity:0;transform:translateY(20px); }
          .php-why-card.visible { opacity:1;transform:translateY(0); }
          .php-why-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .php-why-card-header { display:flex;align-items:center;gap:12px;margin-bottom:10px; }
          .php-why-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .php-why-icon svg { width:24px;height:24px;stroke:#D97706;fill:none; }
          .php-why-card h3 { font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35; }
          .php-why-card p { font-size:13px;color:#4A6080;line-height:1.7;margin:0; }

          /* Testimonials */
          .php-testi-section { background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:90px 40px; }
          .php-testi-inner { max-width:1280px;margin:0 auto; }
          .php-testi-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px; }
          .php-testi-card { background:linear-gradient(135deg,rgba(219,234,254,0.45) 0%,rgba(255,255,255,0.90) 60%,rgba(254,243,199,0.30) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px;box-shadow:0 4px 24px rgba(15,52,96,0.06);opacity:0;transform:translateY(20px);transition:opacity 0.5s ease,transform 0.5s ease; }
          .php-testi-card.visible { opacity:1;transform:translateY(0); }
          .php-testi-stars { color:#D97706;font-size:15px;margin-bottom:12px;letter-spacing:1px; }
          .php-testi-text { font-size:14px;color:#1e293b;line-height:1.75;margin:0 0 18px;font-style:italic; }
          .php-testi-name { font-size:13px;font-weight:700;color:#0F3460; }
          .php-testi-role { font-size:12px;color:#6B7280;margin-top:2px; }

          /* Engagement Table */
          .php-engage-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08);padding:80px 40px;position:relative;z-index:1; }
          .php-engage-inner { max-width:1280px;margin:0 auto; }
          .php-engage-header { text-align:center;margin-bottom:52px; }
          .php-engage-title { font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 14px; }
          .php-engage-desc { font-size:15px;color:#3A507A;line-height:1.7;max-width:640px;margin:0 auto; }
          .php-plans-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:20px;align-items:start; }
          .php-pcard { display:flex;flex-direction:column;height:100%;padding:30px 26px;border-radius:20px;border:1.5px solid rgba(15,52,96,0.12);background:rgba(255,255,255,0.80);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);position:relative; }
          .php-pcard--feat { border-color:rgba(217,119,6,0.40);background:linear-gradient(180deg,rgba(254,243,199,0.35) 0%,rgba(255,255,255,0.90) 100%);box-shadow:0 0 60px rgba(217,119,6,0.12),0 8px 40px rgba(15,52,96,0.08); }
          .php-pcard-pop { position:absolute;top:-13px;left:50%;transform:translateX(-50%);padding:4px 14px;border-radius:100px;background:linear-gradient(90deg,#0F3460,#1a5276 50%,#D97706);color:#fff;font-size:10px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap;box-shadow:0 4px 16px rgba(217,119,6,0.28); }
          .php-pcard-badge { display:inline-block;font-size:10px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:#6B7280;background:rgba(15,52,96,0.06);padding:4px 12px;border-radius:100px;margin-bottom:14px; }
          .php-pcard-name { display:block;font-size:17px;font-weight:800;color:#0F3460;margin-bottom:10px;line-height:1.3; }
          .php-pcard--feat .php-pcard-name { color:#b45309; }
          .php-pcard-blurb { font-size:13px;color:#4A6080;line-height:1.7;margin:0 0 20px; }
          .php-pcard-features { list-style:none;padding:0;margin:0 0 24px;flex:1; }
          .php-pcard-features li { padding:8px 0;border-top:1px dashed rgba(15,52,96,0.10);font-size:13.5px;color:#374151;display:flex;align-items:flex-start;gap:8px; }
          .php-pcard-features li::before { content:'✓';color:#16a34a;font-weight:700;flex-shrink:0; }
          .php-pcard-cta { display:block;padding:12px 20px;background:rgba(15,52,96,0.07);border:1.5px solid rgba(15,52,96,0.18);border-radius:50px;color:#0F3460;font-size:13.5px;font-weight:700;text-decoration:none;text-align:center;transition:all 0.2s;margin-top:auto; }
          .php-pcard-cta:hover { background:rgba(15,52,96,0.12);transform:translateY(-1px);text-decoration:none; }
          .php-pcard-cta--feat { background:linear-gradient(135deg,#0F3460,#1a5276);border-color:transparent;color:#fff;box-shadow:0 4px 20px rgba(15,52,96,0.28); }
          .php-pcard-cta--feat:hover { background:linear-gradient(135deg,#0a2444,#0F3460);box-shadow:0 6px 28px rgba(15,52,96,0.38);color:#fff; }
          @media(max-width:1024px){ .php-plans-grid { grid-template-columns:repeat(2,1fr); } }
          @media(max-width:600px){ .php-plans-grid { grid-template-columns:1fr; } }

          /* Contact */
          .php-contact-section { padding:70px 40px;background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,0.80); }
          .php-contact-container { max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px; }
          .php-contact-title { font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;line-height:1.2;margin:0 0 12px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent; }
          .php-contact-desc { font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 24px; }
          .php-merged-box { background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:20px; }
          .php-benefit-item { display:flex;gap:10px;align-items:flex-start; }
          .php-benefit-icon-wrap { width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .php-benefit-icon { width:20px;height:20px;color:#D97706;stroke:#D97706;stroke-width:1.75; }
          .php-benefit-item p { font-size:13px;color:#4A6080;margin:0;line-height:1.5; }
          .php-stats-box { padding-top:32px;border-top:1px solid rgba(15,52,96,0.12); }
          .php-stats-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:16px; }
          .php-stat-number { font-size:1.6rem;font-weight:900;color:#0F3460;line-height:1; }
          .php-stat-text { font-size:11px;color:#6B7280;margin-top:4px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px; }
          .php-form-box { background:rgba(255,255,255,0.85);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.90);border-radius:20px;padding:32px;box-shadow:0 8px 40px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,1); }
          .php-form-box h3 { font-size:1.3rem;font-weight:800;color:#0F1F40;margin:0 0 20px; }
          .php-contact-form { display:flex;flex-direction:column;gap:14px; }
          .php-form-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
          .php-form-group { display:flex;flex-direction:column;gap:6px; }
          .php-form-group label { font-size:12px;font-weight:600;color:#374151; }
          .php-contact-form input,.php-contact-form select,.php-contact-form textarea { width:100%;padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#1e293b;background:#fff;outline:none;transition:border-color 0.2s; }
          .php-contact-form input:focus,.php-contact-form select:focus,.php-contact-form textarea:focus { border-color:#D97706; }
          .php-contact-form textarea { resize:vertical;min-height:100px; }
          .php-submit-btn { background:#D97706;color:#fff;border:none;padding:13px 28px;border-radius:50px;font-weight:700;font-size:0.95rem;cursor:pointer;transition:background 0.2s,transform 0.2s;width:100%; }
          .php-submit-btn:hover { background:#B45309;transform:translateY(-1px); }

          /* FAQ */
          .php-faq-section { background:#fff;border-top:1px solid rgba(15,52,96,0.06);padding:90px 40px; }
          .php-faq-inner { max-width:860px;margin:0 auto; }
          .php-faq-item { border-bottom:1px solid rgba(15,52,96,0.08); }
          .php-faq-q { width:100%;background:none;border:none;text-align:left;padding:22px 0;display:flex;align-items:flex-start;justify-content:space-between;gap:16px;cursor:pointer;font-family:inherit;font-size:1rem;font-weight:700;color:#0F1F40;line-height:1.4; }
          .php-faq-q:hover { color:#D97706; }
          .php-faq-icon { width:22px;height:22px;border:2px solid #e5e7eb;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:14px;color:#9ca3af;transition:all 0.2s;margin-top:2px; }
          .php-faq-item.open .php-faq-icon { border-color:#D97706;color:#D97706;background:rgba(217,119,6,0.06); }
          .php-faq-a { font-size:0.92rem;color:#4A6080;line-height:1.8;overflow:hidden;max-height:0;transition:max-height 0.35s ease,padding-bottom 0.35s ease; }
          .php-faq-item.open .php-faq-a { max-height:500px;padding-bottom:22px; }

          /* Related */
          .php-related-section { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);padding:70px 40px; }
          .php-related-inner { max-width:1280px;margin:0 auto; }
          .php-related-title { font-size:1.5rem;font-weight:800;color:#0F1F40;margin:0 0 8px; }
          .php-related-desc { font-size:14px;color:#4A6080;margin:0 0 28px;line-height:1.6; }
          .php-related-tags { display:flex;flex-wrap:wrap;gap:10px; }
          .php-related-tag { display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;background:rgba(255,255,255,0.80);border:1.5px solid rgba(15,52,96,0.12);color:#0F3460;transition:all 0.2s; }
          .php-related-tag:hover { border-color:#D97706;color:#D97706;background:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(15,52,96,0.08); }

          /* Responsive */
          @media (max-width:1024px) {
            .php-services-grid { grid-template-columns:repeat(2,1fr); }
            .php-why-grid { grid-template-columns:repeat(2,1fr); }
            .php-industries-grid { grid-template-columns:repeat(2,1fr); }
            .php-tech-grid { grid-template-columns:repeat(2,1fr); }
            .php-testi-grid { grid-template-columns:1fr; }
            .php-process-inner { grid-template-columns:1fr; }
            .php-process-image-col { display:none; }
          }
          @media (max-width:768px) {
            .php-services-section,.php-process-section,.php-tech-section,.php-industries-section,.php-why-section,.php-testi-section,.php-engage-section,.php-contact-section,.php-faq-section,.php-related-section { padding:60px 20px; }
            .php-services-grid,.php-why-grid,.php-industries-grid,.php-tech-grid { grid-template-columns:1fr; }
            .php-contact-container { grid-template-columns:1fr; }
            .php-form-row { grid-template-columns:1fr; }
            .php-engage-title { font-size:32px; }
            .php-section-title { font-size:1.8rem; }
          }
          @media (max-width:480px) {
            .php-engage-title { font-size:26px; }
          }
        `}</style>
      </Head>

      <div>
        {/* ── HERO ── */}
        <ServiceHero
          eyebrow="PHP Development Since 2008"
          title={<>PHP Development Services <AuroraText>Built to Last</AuroraText></>}
          subtext="Custom PHP web applications, Laravel APIs, and legacy modernisation — delivered clean, secure, and fully documented for US, Canada, and Australia."
          primaryCta={{ label: 'Start a PHP Project', href: '#contact' }}
          secondaryCta={{ label: 'View Engagement Models', href: '#engagement' }}
          stats={[
            { label: 'PHP Projects', value: '300', suffix: '+' },
            { label: 'PHP Developers', value: '25', suffix: '+' },
            { label: 'Years of PHP', value: '15', suffix: '+' },
            { label: 'Client Retention', value: '97', suffix: '%' },
          ]}
        />

        {/* ── SERVICES ── */}
        <section className="php-services-section" id="services">
          <div className="php-services-inner">
            <div className={`php-section-reveal${visibleSections.has('services') ? ' php-revealed' : ''}`} ref={el => { sectionRefs.current['services'] = el; }}>
              <span className="php-section-eyebrow">Our Services</span>
              <h2 className="php-section-title">PHP Development Services We Offer</h2>
              <p className="php-section-desc">From custom applications and Laravel backends to legacy modernisation and API development — full-spectrum PHP delivery under one roof.</p>
            </div>
            <div className="php-services-grid">
              {visibleServices.map(s => (
                <div className={`php-svc-card${s.featured ? ' featured' : ''}`} key={s.n}>
                  <span className="php-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {!showAll && SERVICES.length > 8 && (
              <div style={{ textAlign:'center',marginTop:28 }}>
                <button onClick={() => setShowAll(true)} style={{ background:'none',border:'1.5px solid rgba(15,52,96,0.20)',borderRadius:50,padding:'10px 28px',fontSize:13,fontWeight:700,color:'#0F3460',cursor:'pointer' }}>
                  Show {SERVICES.length - 8} More Services ↓
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section className="php-process-section" id="process">
          <div className="php-process-inner">
            <div className="php-process-steps">
              <div className={`php-section-reveal${visibleSections.has('process') ? ' php-revealed' : ''}`} ref={el => { sectionRefs.current['process'] = el; }}>
                <span className="php-section-eyebrow">How We Work</span>
                <h2 className="php-section-title">Our PHP Development Process</h2>
                <p className="php-section-desc">A structured, transparent process from discovery through deployment — with working software at every milestone.</p>
              </div>
              {PROCESS_STEPS.map((s, i) => (
                <div className={`php-process-step${visibleSteps.includes(i) ? ' visible' : ''}`} key={s.n} ref={el => { stepRefs.current[i] = el; }}>
                  <span className="php-step-num">{s.n}</span>
                  <div className="php-step-body">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="php-process-image-col">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Partner-with-us.jpg" alt="1Solutions PHP development team" />
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="php-tech-section" id="tech">
          <div className="php-tech-inner">
            <div className={`php-section-reveal${visibleSections.has('tech') ? ' php-revealed' : ''}`} ref={el => { sectionRefs.current['tech'] = el; }}>
              <span className="php-section-eyebrow">Technology Stack</span>
              <h2 className="php-section-title">PHP Technologies We Work With</h2>
              <p className="php-section-desc">We stay current across the full PHP ecosystem — choosing the right framework, database, and tooling for each project's requirements.</p>
            </div>
            <div className="php-tech-grid">
              {TECH_STACK.map(g => (
                <div className="php-tech-group" key={g.group}>
                  <p className="php-tech-group-title">{g.group}</p>
                  <div className="php-tech-pills">
                    {g.items.map(item => <span className="php-tech-pill" key={item}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="php-industries-section" id="industries">
          <div className="php-industries-inner">
            <div className={`php-section-reveal${visibleSections.has('industries') ? ' php-revealed' : ''}`} ref={el => { sectionRefs.current['industries'] = el; }}>
              <span className="php-section-eyebrow">Industries We Serve</span>
              <h2 className="php-section-title">PHP Development Across Industries</h2>
              <p className="php-section-desc">We have delivered PHP solutions across 8+ verticals — bringing domain-specific understanding to every project.</p>
            </div>
            <div className="php-industries-grid">
              {INDUSTRIES.map(ind => (
                <div className="php-industry-card" key={ind.title}>
                  <div className="php-industry-icon">{ind.icon}</div>
                  <h3>{ind.title}</h3>
                  <p>{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ── */}
        <section className="php-why-section" id="why">
          <div className="php-why-inner">
            <div className={`php-section-reveal${visibleSections.has('why') ? ' php-revealed' : ''}`} ref={el => { sectionRefs.current['why'] = el; }}>
              <span className="php-section-eyebrow">Why 1Solutions</span>
              <h2 className="php-section-title">Why Businesses Choose Us for PHP</h2>
              <p className="php-section-desc">15+ years of PHP delivery means we have solved the edge cases, seen what fails in production, and built the processes that prevent it.</p>
            </div>
            <div className="php-why-grid" ref={whyGridRef}>
              {WHY.map((w, i) => (
                <div className={`php-why-card${visibleWhyCards.includes(i) ? ' visible' : ''}`} key={w.title} style={{ transitionDelay:`${i * 0.08}s` }}>
                  <div className="php-why-card-header">
                    <div className="php-why-icon">{w.icon}</div>
                    <h3>{w.title}</h3>
                  </div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="php-testi-section" id="testimonials">
          <div className="php-testi-inner">
            <div className={`php-section-reveal${visibleSections.has('testi') ? ' php-revealed' : ''}`} ref={el => { sectionRefs.current['testi'] = el; }}>
              <span className="php-section-eyebrow">Client Reviews</span>
              <h2 className="php-section-title">What Our PHP Clients Say</h2>
              <p className="php-section-desc">Trusted by businesses across the US, Canada, and Australia for 15+ years of PHP development.</p>
            </div>
            <div className="php-testi-grid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div className={`php-testi-card${visibleTestiCards.includes(i) ? ' visible' : ''}`} key={t.name} style={{ transitionDelay:`${i * 0.12}s` }}>
                  <div className="php-testi-stars">{'★'.repeat(t.rating)}</div>
                  <p className="php-testi-text">"{t.text}"</p>
                  <div className="php-testi-name">{t.name}</div>
                  <div className="php-testi-role">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENGAGEMENT MODELS ── */}
        <section className="php-engage-section" id="engagement">
          <div className="php-engage-inner">
            <div className="php-engage-header">
              <span className="php-section-eyebrow">How We Engage</span>
              <h2 className="php-engage-title">Flexible Engagement Models</h2>
              <p className="php-engage-desc">Pick the model that fits your project, team, and budget — every plan includes a free discovery call and NDA on request.</p>
            </div>
            <div className="php-plans-grid">
              <article className="php-pcard">
                <span className="php-pcard-badge">One-time</span>
                <span className="php-pcard-name">Fixed-Price Project</span>
                <p className="php-pcard-blurb">Defined scope &amp; budget — ideal for clearly-scoped builds with a fixed timeline and deliverables.</p>
                <ul className="php-pcard-features">
                  <li>Shared specialist team</li>
                  <li>Fixed scope &amp; deliverables</li>
                  <li>Budget predictability</li>
                  <li>Monthly progress report</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="php-pcard-cta">Get a Quote</a>
              </article>
              <article className="php-pcard">
                <span className="php-pcard-badge">Flexible</span>
                <span className="php-pcard-name">Time &amp; Materials</span>
                <p className="php-pcard-blurb">Scale with evolving requirements — pay for what's delivered, adjust scope any sprint.</p>
                <ul className="php-pcard-features">
                  <li>Shared specialist team</li>
                  <li>Flexible, evolving scope</li>
                  <li>Bi-weekly reporting</li>
                  <li>Priority task queue</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="php-pcard-cta">Get a Quote</a>
              </article>
              <article className="php-pcard php-pcard--feat">
                <span className="php-pcard-pop">✦ Most Popular</span>
                <span className="php-pcard-name">Dedicated Team</span>
                <p className="php-pcard-blurb">Your extended team — specialists embedded in your workflow, committed to your long-term growth.</p>
                <ul className="php-pcard-features">
                  <li>Dedicated senior specialists</li>
                  <li>Exclusive monthly retainer</li>
                  <li>Daily standups &amp; tracking</li>
                  <li>Same-day support response</li>
                  <li>NDA &amp; full IP protection</li>
                </ul>
                <a href="#contact" className="php-pcard-cta php-pcard-cta--feat">Get Started</a>
              </article>
              <article className="php-pcard">
                <span className="php-pcard-badge">Cost-efficient</span>
                <span className="php-pcard-name">Offshore Model</span>
                <p className="php-pcard-blurb">Maximum ROI with our expert offshore team — senior-level quality at budget-friendly rates.</p>
                <ul className="php-pcard-features">
                  <li>Expert offshore team</li>
                  <li>Cost-effective delivery</li>
                  <li>Monthly progress report</li>
                  <li>Budget-focused pricing</li>
                  <li>NDA on request</li>
                </ul>
                <a href="#contact" className="php-pcard-cta">Get a Quote</a>
              </article>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="php-contact-section" id="contact">
          <div className="php-contact-container">
            <div className="php-contact-left">
              <h2 className="php-contact-title">Let's Build Your PHP Application Together</h2>
              <p className="php-contact-desc">Tell us about your project and we will get back to you within 24 hours with a tailored technical plan.</p>
              <div className="php-merged-box">
                <div>
                  {[
                    { icon:<svg className="php-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text:'Your project details are confidential. We respect your privacy and sign NDAs on request.' },
                    { icon:<svg className="php-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, text:'A senior PHP engineer reviews your requirements — not automated responses or offshore account managers.' },
                    { icon:<svg className="php-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text:'Response within 24 business hours with a detailed technical assessment of your requirements.' },
                    { icon:<svg className="php-benefit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>, text:'Free scoping session — no obligation to proceed after the discovery call.' },
                  ].map((b, i) => (
                    <div className="php-benefit-item" key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
                      <div className="php-benefit-icon-wrap">{b.icon}</div>
                      <p>{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="php-stats-box">
                  <div className="php-stats-grid">
                    {[['300+','PHP Projects'],['15+','Years Experience'],['97%','Client Retention']].map(([num, text]) => (
                      <div key={text}>
                        <div className="php-stat-number">{num}</div>
                        <div className="php-stat-text">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="php-contact-right">
              <div className="php-form-box">
                <h3>Contact Us</h3>
                <form className="php-contact-form" onSubmit={_sfSubmit}>
                  <div className="php-form-row">
                    <div className="php-form-group"><label>Full Name*</label><input name="sf-name" type="text" placeholder="Full Name*" required /></div>
                    <div className="php-form-group"><label>Business Email*</label><input type="email" name="sf-email" placeholder="Business Email*" required /></div>
                  </div>
                  <div className="php-form-row">
                    <div className="php-form-group"><label>Phone Number</label><input name="sf-phone" type="tel" placeholder="Phone Number" /></div>
                    <div className="php-form-group"><label>Company</label><input name="sf-company" type="text" placeholder="Company Name" /></div>
                  </div>
                  <div className="php-form-group">
                    <label>Project Brief*</label>
                    <textarea name="sf-message" placeholder="Describe your PHP project — tech stack, timeline, features needed..." required />
                  </div>
                  <button type="submit" className="php-submit-btn">Send Message →</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="php-faq-section" id="faq">
          <div className="php-faq-inner">
            <div className={`php-section-reveal${visibleSections.has('faq') ? ' php-revealed' : ''}`} ref={el => { sectionRefs.current['faq'] = el; }}>
              <span className="php-section-eyebrow">Got Questions?</span>
              <h2 className="php-section-title">PHP Development — Frequently Asked Questions</h2>
            </div>
            <div className="php-faq-list" style={{ marginTop:36 }}>
              {FAQS.map((f, i) => (
                <div className={`php-faq-item${openFaq === i ? ' open' : ''}`} key={f.q}>
                  <button className="php-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {f.q}
                    <span className="php-faq-icon">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="php-faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="php-related-section">
          <div className="php-related-inner">
            <span className="php-section-eyebrow">PHP Related Offerings</span>
            <h2 className="php-related-title">Explore Related Services</h2>
            <p className="php-related-desc">Pair our PHP expertise with related services to build a complete, scalable solution.</p>
            <div className="php-related-tags">
              {[
                ['Laravel Development','laravel-development-company'],
                ['WordPress Development','wordpress-development-company'],
                ['Drupal Development','drupal-development-company'],
                ['CodeIgniter Development','codeigniter-development-company'],
                ['eCommerce Development','ecommerce-website-development-services'],
                ['WooCommerce Development','woocommerce-development-company'],
                ['Hire PHP Developer','hire-php-developer'],
                ['API Development','web-development-services'],
                ['Web Development','web-development-services'],
              ].map(([label, href]) => (
                <Link key={label} href={`/${href}`} className="php-related-tag">{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
