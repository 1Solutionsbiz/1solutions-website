import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n: '01', title: 'Custom PHP Web Application Development', desc: 'Fully bespoke PHP web applications built around your business logic — scalable architecture, clean codebase, and long-term maintainability from day one.' },
  { n: '02', title: 'Laravel Application Development', desc: 'Sophisticated web applications built on Laravel — the most robust PHP framework. REST APIs, admin panels, SaaS platforms, and complex business portals.' },
  { n: '03', title: 'REST API & Backend Development', desc: 'Fast, secure, and well-documented RESTful APIs and GraphQL endpoints — built to power web apps, mobile apps, and third-party integrations at any scale.' },
  { n: '04', title: 'PHP CMS Development', desc: 'Custom CMS builds and extensions on WordPress, Drupal, and Joomla — tailored to your editorial workflow and content structure requirements.' },
  { n: '05', title: 'Legacy PHP Migration & Modernisation', desc: 'Refactor or rebuild legacy PHP 5.x/7.x codebases onto modern PHP 8 + Laravel or Symfony — improving security, performance, and developer productivity.' },
  { n: '06', title: 'PHP eCommerce Development', desc: 'Custom ecommerce platforms and WooCommerce extensions built in PHP — with bespoke pricing engines, ERP integrations, and buyer-specific workflows.' },
  { n: '07', title: 'PHP Portal & Dashboard Development', desc: 'Multi-user portals, admin dashboards, reporting tools, and client-facing self-service platforms — with role-based access control and clean data visualisation.' },
  { n: '08', title: 'PHP Support & Maintenance', desc: 'Ongoing support for existing PHP applications — bug fixing, security patching, performance optimisation, dependency updates, and feature enhancements.' },
];

const FRAMEWORKS = [
  'Laravel', 'Symfony', 'CodeIgniter', 'CakePHP', 'Yii2',
  'WordPress', 'Drupal', 'Joomla', 'PHP 8.x', 'Composer',
  'MySQL / PostgreSQL', 'Redis', 'REST & GraphQL', 'Docker',
];

const PROCESS = [
  { step: '01', title: 'Discovery & Technical Scoping', desc: 'We map your business requirements to a concrete technical specification — architecture decisions, database design, API contracts, and third-party integration points.' },
  { step: '02', title: 'Architecture & Database Design', desc: 'Before coding begins, we design the data model, service layer, and API structure — ensuring the foundation supports future scale without costly reworks.' },
  { step: '03', title: 'Agile Development in Sprints', desc: 'Two-week sprints with demo-ready milestones. Code reviews, automated tests, and staging deployments at every sprint so you see progress, not promises.' },
  { step: '04', title: 'QA, Security Audit & Staging', desc: 'Functional testing, unit and integration test suites, OWASP security review, and performance profiling before any production deployment.' },
  { step: '05', title: 'Deployment, Handover & Support', desc: 'Production deployment, server configuration, documentation handover, and a hypercare period covering any issues that arise post-launch.' },
];

const WHY = [
  { title: '15+ Years of PHP Expertise', desc: 'We\'ve been building PHP applications since 2008. From small APIs to multi-tenant SaaS platforms with millions of users — our team has seen and solved the full range of PHP complexity.' },
  { title: 'Laravel Specialists', desc: 'Laravel is our framework of choice for complex applications. We follow Laravel best practices — service containers, Eloquent relationships, queues, broadcasting, and full test coverage.' },
  { title: 'Security-First Development', desc: 'Every PHP application we build includes OWASP-aligned security practices: input validation, prepared statements, CSRF protection, rate limiting, and regular dependency audits.' },
  { title: 'Clean, Documented Code', desc: 'We write code that your team — or a future developer — can understand, extend, and maintain. Full PHPDoc, README documentation, and architecture decision records on every project.' },
  { title: 'US, Canada & Australia Focused', desc: 'We understand the infrastructure, compliance, and performance requirements of western markets. Servers in your region, GDPR/CCPA awareness, and western business-hour support.' },
  { title: 'Full-Stack Delivery', desc: 'Backend PHP development, React/Next.js frontends, cloud infrastructure, CI/CD pipelines, and ongoing maintenance — all under one roof. No outsourcing, no finger-pointing.' },
];

const FAQS = [
  {
    q: 'Is PHP still a good choice for web application development in 2025?',
    a: 'Yes — PHP 8.x is a modern, high-performance language with significant improvements in type safety, performance (JIT compilation), and developer ergonomics compared to PHP 5 or 7. PHP powers over 77% of server-side websites globally, including Facebook, Wikipedia, Slack\'s backend, and millions of Laravel and WordPress applications. With frameworks like Laravel and Symfony, PHP applications are highly structured, testable, and maintainable. For API-heavy applications, ecommerce, CMS, or business portals, PHP remains an excellent and pragmatic choice.',
  },
  {
    q: 'What is Laravel and why do you recommend it?',
    a: 'Laravel is the most popular PHP framework, providing a rich ecosystem for building modern web applications: an expressive ORM (Eloquent), built-in authentication, queues, caching, broadcasting, and a powerful CLI (Artisan). It follows MVC architecture, has excellent documentation, and a massive community. We recommend Laravel for medium-to-large PHP applications because it provides structure that keeps large codebases maintainable over time, and because its ecosystem (Forge, Vapor, Nova) solves common infrastructure and admin panel needs without custom code.',
  },
  {
    q: 'How much does custom PHP development cost?',
    a: 'PHP development costs vary based on complexity. A simple web application (5–10 features, basic API) typically starts from $8,000–$20,000. A mid-complexity Laravel application with user management, integrations, admin panel, and reporting ranges from $20,000–$60,000. Complex multi-tenant SaaS platforms or enterprise applications can exceed $100,000. We provide detailed fixed-price quotes after a discovery workshop — with full technical specifications so costs are predictable and scope is controlled.',
  },
  {
    q: 'Can you modernise our legacy PHP application?',
    a: 'Yes — legacy PHP migration and modernisation is one of our most common engagements. We typically encounter PHP 5.6 or 7.x applications with no framework, global variables, procedural code, and security vulnerabilities. Our approach: audit the existing codebase, map all functionality, then incrementally refactor or rebuild onto PHP 8 + Laravel, with a parallel test suite ensuring no functionality regression. We prefer incremental migration over big-bang rewrites to reduce risk and maintain business continuity throughout the process.',
  },
  {
    q: 'Do you write tests for your PHP applications?',
    a: 'Yes — automated testing is part of our standard development process. We write unit tests for business logic, feature tests for API endpoints, and integration tests for critical user flows using PHPUnit and Laravel\'s built-in testing tools. Test coverage targets are agreed at project scope — typically 70–80% for business-critical code. CI pipelines run the full test suite on every code push. Test coverage significantly reduces regression risk, improves deployment confidence, and reduces maintenance cost over the application\'s lifetime.',
  },
  {
    q: 'Can you integrate our PHP application with third-party services?',
    a: 'Yes — third-party integration is a core part of most PHP projects we deliver. Common integrations include: payment gateways (Stripe, PayPal, Braintree, Authorize.net), CRMs (Salesforce, HubSpot, Zoho), ERPs (SAP, NetSuite, Dynamics), shipping carriers (FedEx, UPS, Australia Post, Canada Post), email services (SendGrid, Mailgun, Postmark), SMS providers (Twilio), and data warehouses (BigQuery, Snowflake). We design integrations with proper error handling, retry logic, and webhooks — not fragile synchronous calls that fail silently.',
  },
  {
    q: 'How do you handle PHP application security?',
    a: 'Security is built into our PHP development process from the architecture phase. We follow OWASP Top 10 mitigations: SQL injection prevention (prepared statements/Eloquent ORM), XSS prevention (output encoding), CSRF protection (Laravel middleware), authentication security (hashed passwords, rate limiting, 2FA support), file upload security (mime validation, virus scanning), and API security (token authentication, rate limiting, input validation). We conduct a security review at the end of every project before production deployment.',
  },
  {
    q: 'Do you provide ongoing PHP support after the project launches?',
    a: 'Yes — we offer dedicated PHP support and maintenance retainers post-launch. This covers: bug fixing and crash resolution, PHP and dependency version upgrades, security patching, performance monitoring and optimisation, minor feature enhancements, and database maintenance. We also offer dedicated development retainers if you need ongoing feature development. All support clients get a named account manager, monthly reports, and access to our support ticketing system with guaranteed response times based on issue severity.',
  },
];

const STATS = [
  { label: 'PHP Projects Delivered', val: '500+' },
  { label: 'Years of PHP Experience', val: '15+' },
  { label: 'Frameworks Mastered', val: '10+' },
  { label: 'Client Retention Rate', val: '96%' },
];

export default function PhpDevelopmentServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleWhy, setVisibleWhy] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const stepRefs = useRef([]);
  const whyRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const obs = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisibleSteps(p => p.includes(i) ? p : [...p, i]), i * 120);
          o.disconnect();
        }
      }, { threshold: 0.2 });
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!whyRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        WHY.forEach((_, i) => setTimeout(() => setVisibleWhy(p => p.includes(i) ? p : [...p, i]), i * 90));
        o.disconnect();
      }
    }, { threshold: 0.1 });
    o.observe(whyRef.current);
    return () => o.disconnect();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        SERVICES.forEach((_, i) => setTimeout(() => setVisibleCards(p => p.includes(i) ? p : [...p, i]), i * 60));
        o.disconnect();
      }
    }, { threshold: 0.05 });
    o.observe(cardsRef.current);
    return () => o.disconnect();
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'PHP Development Services',
        description: 'Custom PHP web application development — Laravel applications, REST APIs, legacy migration, CMS, ecommerce, and business portals for US, Canada & Australia.',
        provider: {
          '@type': 'Organization',
          name: '1Solutions',
          url: 'https://www.1solutions.biz',
          areaServed: ['US', 'CA', 'AU'],
        },
        serviceType: 'PHP Development',
        url: 'https://www.1solutions.biz/php-development-services',
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
        <title>PHP Development Services | Laravel & Custom PHP Web Apps | 1Solutions</title>
        <meta name="description" content="Expert PHP development services — custom web apps, Laravel applications, REST APIs, legacy migration & CMS. Scalable, secure PHP built for US, Canada & Australia businesses." />
        <meta name="keywords" content="php development services, php development company, laravel development, custom php development, php web application development, php agency" />
        <link rel="canonical" href="https://www.1solutions.biz/php-development-services" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PHP Development Services | 1Solutions" />
        <meta property="og:description" content="Custom PHP & Laravel web application development. Clean code, security-first, fully documented. Serving US, Canada & Australia since 2008." />
        <meta property="og:url" content="https://www.1solutions.biz/php-development-services" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style>{`
          .php-page { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #0F1F40; line-height: 1.6; overflow-x: hidden; }
          .php-page *, .php-page *::before, .php-page *::after { box-sizing: border-box; }

          .php-hero { background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 30%, #ede9fe 65%, #f0f9ff 100%); position: relative; overflow: hidden; padding: 80px 40px 0; }
          .php-hero-orb1 { position: absolute; top: -100px; right: -100px; width: 560px; height: 560px; border-radius: 50%; background: radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 65%); pointer-events: none; filter: blur(30px); }
          .php-hero-orb2 { position: absolute; bottom: 0; left: -80px; width: 440px; height: 440px; border-radius: 50%; background: radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 65%); pointer-events: none; filter: blur(30px); }
          .php-hero-inner { max-width: 1280px; margin: 0 auto; position: relative; z-index: 2; text-align: center; }
          .php-breadcrumb { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px; font-size: 12px; color: #6b7280; margin-bottom: 24px; font-weight: 500; }
          .php-breadcrumb a { color: #6b7280; text-decoration: none; }
          .php-breadcrumb a:hover { color: #4F46E5; }
          .php-breadcrumb span { color: #d1d5db; }
          .php-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(79,70,229,0.08); border: 1px solid rgba(79,70,229,0.20); border-radius: 100px; padding: 5px 14px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #4338CA; margin-bottom: 28px; }
          .php-hero-h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 900; line-height: 1.1; letter-spacing: -1px; background: linear-gradient(90deg, #0F3460 0%, #4F46E5 50%, #7C3AED 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 20px; max-width: 920px; margin-left: auto; margin-right: auto; }
          .php-hero-sub { font-size: 1.08rem; color: #4A6080; line-height: 1.75; max-width: 660px; margin: 0 auto 36px; }
          .php-hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
          .php-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #4F46E5; color: #fff; padding: 14px 30px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: all 0.25s; box-shadow: 0 4px 20px rgba(79,70,229,0.28); }
          .php-btn-primary:hover { background: #4338CA; box-shadow: 0 8px 32px rgba(79,70,229,0.38); transform: translateY(-2px); }
          .php-btn-secondary { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.65); backdrop-filter: blur(12px); border: 1.5px solid rgba(15,52,96,0.18); color: #0F3460; padding: 14px 30px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; text-decoration: none; transition: all 0.25s; }
          .php-btn-secondary:hover { border-color: #4F46E5; color: #4F46E5; transform: translateY(-2px); }
          .php-stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 900px; margin: 0 auto; background: rgba(255,255,255,0.55); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.85); border-radius: 20px 20px 0 0; box-shadow: 0 4px 24px rgba(79,70,229,0.07); }
          .php-stat { padding: 20px 24px; text-align: center; border-right: 1px solid rgba(79,70,229,0.08); }
          .php-stat:last-child { border-right: none; }
          .php-stat-label { font-size: 11px; color: #6b7280; font-weight: 500; margin-bottom: 4px; }
          .php-stat-val { font-size: 1.6rem; font-weight: 900; color: #4F46E5; letter-spacing: -0.5px; }

          .php-services-section { background: #f8fafd; padding: 80px 40px; box-shadow: 0 -20px 60px rgba(79,70,229,0.06); }
          .php-services-inner { max-width: 1280px; margin: 0 auto; }
          .php-section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #4F46E5; margin-bottom: 10px; display: block; }
          .php-section-title { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; line-height: 1.15; letter-spacing: -1px; background: linear-gradient(90deg, #0F3460 0%, #4F46E5 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px; }
          .php-section-desc { font-size: 15px; color: #4A6080; line-height: 1.7; max-width: 640px; margin-bottom: 44px; }
          .php-services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
          .php-service-card { background: linear-gradient(135deg, rgba(238,242,255,0.65) 0%, rgba(255,255,255,0.88) 60%, rgba(237,233,254,0.45) 100%); border: 1px solid rgba(255,255,255,0.85); border-radius: 20px; padding: 26px 22px 22px; position: relative; overflow: hidden; box-shadow: 0 4px 24px rgba(79,70,229,0.05); opacity: 0; transform: translateY(20px); transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.22s, border-color 0.22s; }
          .php-service-card.visible { opacity: 1; transform: translateY(0); }
          .php-service-card:hover { transform: translateY(-6px); border-color: rgba(79,70,229,0.25); box-shadow: 0 16px 48px rgba(79,70,229,0.10); }
          .php-card-num { position: absolute; top: 8px; right: 14px; font-size: 72px; font-weight: 900; line-height: 1; color: #4F46E5; opacity: 0.05; letter-spacing: -4px; pointer-events: none; user-select: none; }
          .php-service-card h3 { font-size: 15px; font-weight: 700; color: #0F1F40; line-height: 1.3; margin-bottom: 8px; position: relative; z-index: 1; }
          .php-service-card p { font-size: 13px; color: #4A6080; line-height: 1.6; position: relative; z-index: 1; margin: 0; }

          .php-fw-section { background: #fff; padding: 70px 40px; }
          .php-fw-inner { max-width: 1280px; margin: 0 auto; }
          .php-fw-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 36px; }
          .php-fw-pill { background: #eef2ff; border: 1.5px solid rgba(79,70,229,0.18); border-radius: 50px; padding: 8px 18px; font-size: 13px; font-weight: 600; color: #3730A3; transition: all 0.2s; }
          .php-fw-pill:hover { background: #e0e7ff; border-color: #4F46E5; transform: translateY(-2px); }

          .php-process-section { background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #ede9fe 100%); padding: 80px 40px; }
          .php-process-inner { max-width: 900px; margin: 0 auto; }
          .php-process-steps { display: flex; flex-direction: column; margin-top: 44px; }
          .php-process-step { display: grid; grid-template-columns: 80px 1fr; gap: 24px; align-items: flex-start; padding: 28px 0; border-bottom: 1px solid rgba(79,70,229,0.10); opacity: 0; transform: translateX(-20px); transition: opacity 0.45s ease, transform 0.45s ease; }
          .php-process-step:last-child { border-bottom: none; }
          .php-process-step.visible { opacity: 1; transform: translateX(0); }
          .php-step-num { font-size: 3rem; font-weight: 900; color: rgba(79,70,229,0.15); line-height: 1; letter-spacing: -2px; }
          .php-step-body h3 { font-size: 1.1rem; font-weight: 800; color: #0F1F40; margin-bottom: 6px; }
          .php-step-body p { font-size: 0.9rem; color: #4A6080; line-height: 1.7; margin: 0; }

          .php-why-section { background: #fff; padding: 80px 40px; }
          .php-why-inner { max-width: 1280px; margin: 0 auto; }
          .php-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 44px; }
          .php-why-card { background: linear-gradient(135deg, #eef2ff 0%, #fff 60%, #ede9fe 100%); border: 1px solid rgba(79,70,229,0.10); border-radius: 16px; padding: 28px; opacity: 0; transform: translateY(16px); transition: opacity 0.4s ease, transform 0.4s ease; }
          .php-why-card.visible { opacity: 1; transform: translateY(0); }
          .php-why-card:hover { border-color: rgba(79,70,229,0.22); box-shadow: 0 8px 32px rgba(79,70,229,0.07); }
          .php-why-dot { width: 8px; height: 8px; border-radius: 50%; background: #4F46E5; margin-bottom: 16px; }
          .php-why-card h3 { font-size: 1rem; font-weight: 800; color: #0F1F40; margin-bottom: 10px; }
          .php-why-card p { font-size: 0.88rem; color: #4A6080; line-height: 1.7; margin: 0; }

          .php-faq-section { background: #f8fafd; padding: 80px 40px; }
          .php-faq-inner { max-width: 860px; margin: 0 auto; }
          .php-faq-list { margin-top: 44px; }
          .php-faq-item { border-bottom: 1px solid #e5e7eb; }
          .php-faq-q { width: 100%; background: none; border: none; text-align: left; padding: 22px 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; cursor: pointer; font-family: inherit; font-size: 1rem; font-weight: 700; color: #0F1F40; line-height: 1.4; }
          .php-faq-q:hover { color: #4F46E5; }
          .php-faq-icon { width: 22px; height: 22px; border: 2px solid #e5e7eb; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; color: #9ca3af; transition: all 0.2s; margin-top: 2px; }
          .php-faq-item.open .php-faq-icon { border-color: #4F46E5; color: #4F46E5; background: rgba(79,70,229,0.06); }
          .php-faq-a { font-size: 0.92rem; color: #4A6080; line-height: 1.8; overflow: hidden; max-height: 0; transition: max-height 0.35s ease, padding-bottom 0.35s ease; }
          .php-faq-item.open .php-faq-a { max-height: 500px; padding-bottom: 22px; }

          .php-cta-section { background: linear-gradient(135deg, rgba(79,70,229,0.06) 0%, rgba(255,255,255,0.80) 40%, rgba(124,58,237,0.05) 100%); padding: 90px 40px; position: relative; overflow: hidden; }
          .php-cta-orb1 { position: absolute; top: -80px; right: -80px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(79,70,229,0.10) 0%, transparent 70%); pointer-events: none; }
          .php-cta-orb2 { position: absolute; bottom: -60px; left: -60px; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%); pointer-events: none; }
          .php-cta-inner { max-width: 760px; margin: 0 auto; text-align: center; position: relative; z-index: 1; }
          .php-cta-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; background: linear-gradient(90deg, #0F3460 0%, #4F46E5 50%, #7C3AED 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 16px; line-height: 1.2; }
          .php-cta-sub { font-size: 1.05rem; color: #4A6080; line-height: 1.75; margin: 0 auto 36px; max-width: 520px; }
          .php-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

          @media (max-width: 1024px) { .php-services-grid { grid-template-columns: repeat(2, 1fr); } .php-why-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 768px) {
            .php-hero { padding: 60px 24px 0; }
            .php-services-section, .php-fw-section, .php-process-section, .php-why-section, .php-faq-section, .php-cta-section { padding: 60px 24px; }
            .php-stats-bar { grid-template-columns: repeat(2, 1fr); border-radius: 16px 16px 0 0; }
            .php-stat:nth-child(2) { border-right: none; }
            .php-services-grid { grid-template-columns: 1fr; }
            .php-why-grid { grid-template-columns: 1fr; }
            .php-process-step { grid-template-columns: 56px 1fr; }
            .php-hero-btns { flex-direction: column; align-items: center; }
          }
        `}</style>
      </Head>

      <div className="php-page">
        <section className="php-hero">
          <div className="php-hero-orb1" />
          <div className="php-hero-orb2" />
          <div className="php-hero-inner">
            <nav className="php-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span>
              <span>Services</span><span>/</span>
              <span>Web Development</span><span>/</span>
              <span style={{ color: '#4F46E5' }}>PHP Development</span>
            </nav>
            <span className="php-eyebrow">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F46E5', display: 'inline-block' }} />
              Web Development
            </span>
            <h1 className="php-hero-h1">PHP Development Services for Custom Web Applications &amp; APIs</h1>
            <p className="php-hero-sub">Custom PHP and Laravel applications built clean, secure, and documented — for startups, SMEs, and enterprises across the US, Canada, and Australia.</p>
            <div className="php-hero-btns">
              <Link href="/contact" className="php-btn-primary">
                Start a PHP Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/laravel-development-company" className="php-btn-secondary">Explore Laravel Services</Link>
            </div>
            <div className="php-stats-bar">
              {STATS.map(s => (
                <div key={s.label} className="php-stat">
                  <div className="php-stat-label">{s.label}</div>
                  <div className="php-stat-val">{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="php-services-section">
          <div className="php-services-inner">
            <span className="php-section-eyebrow">What We Build</span>
            <h2 className="php-section-title">PHP Development Services</h2>
            <p className="php-section-desc">From custom applications and Laravel backends to legacy modernisation and API development — full-spectrum PHP delivery under one roof.</p>
            <div className="php-services-grid" ref={cardsRef}>
              {SERVICES.map((s, i) => (
                <div key={s.n} className={`php-service-card${visibleCards.includes(i) ? ' visible' : ''}`}>
                  <div className="php-card-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="php-fw-section">
          <div className="php-fw-inner">
            <span className="php-section-eyebrow">Tech Stack</span>
            <h2 className="php-section-title">Frameworks &amp; Technologies</h2>
            <p className="php-section-desc">We work with the full PHP ecosystem — choosing the right framework and tooling for each project&rsquo;s specific requirements and scale.</p>
            <div className="php-fw-grid">
              {FRAMEWORKS.map(f => <span key={f} className="php-fw-pill">{f}</span>)}
            </div>
          </div>
        </section>

        <section className="php-process-section">
          <div className="php-process-inner">
            <span className="php-section-eyebrow">How We Work</span>
            <h2 className="php-section-title">Our PHP Development Process</h2>
            <p className="php-section-desc">A structured, transparent process from discovery through to deployment — with working software at each milestone, not just at the end.</p>
            <div className="php-process-steps">
              {PROCESS.map((p, i) => (
                <div key={p.step} ref={el => { stepRefs.current[i] = el; }} className={`php-process-step${visibleSteps.includes(i) ? ' visible' : ''}`}>
                  <div className="php-step-num">{p.step}</div>
                  <div className="php-step-body"><h3>{p.title}</h3><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="php-why-section">
          <div className="php-why-inner">
            <span className="php-section-eyebrow">Why 1Solutions</span>
            <h2 className="php-section-title">Why Choose Us for PHP Development</h2>
            <p className="php-section-desc">15+ years of PHP delivery means we&rsquo;ve solved the edge cases, seen what fails in production, and built the process to deliver PHP applications you can depend on.</p>
            <div className="php-why-grid" ref={whyRef}>
              {WHY.map((w, i) => (
                <div key={w.title} className={`php-why-card${visibleWhy.includes(i) ? ' visible' : ''}`}>
                  <div className="php-why-dot" />
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="php-faq-section">
          <div className="php-faq-inner">
            <span className="php-section-eyebrow">Got Questions?</span>
            <h2 className="php-section-title">PHP Development FAQs</h2>
            <p className="php-section-desc">Answers to the questions businesses ask us most before starting a PHP or Laravel project.</p>
            <div className="php-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`php-faq-item${openFaq === i ? ' open' : ''}`}>
                  <button className="php-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    {f.q}
                    <span className="php-faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                  </button>
                  <div className="php-faq-a" style={openFaq === i ? { maxHeight: 500, paddingBottom: 22 } : {}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="php-cta-section">
          <div className="php-cta-orb1" /><div className="php-cta-orb2" />
          <div className="php-cta-inner">
            <span className="php-section-eyebrow" style={{ textAlign: 'center', display: 'block', marginBottom: 16 }}>Start Your Project</span>
            <h2 className="php-cta-title">Ready to Build Something Solid in PHP?</h2>
            <p className="php-cta-sub">Book a free discovery call. We&rsquo;ll review your requirements, recommend the right PHP framework and architecture, and give you a no-obligation project outline.</p>
            <div className="php-cta-btns">
              <Link href="/contact" className="php-btn-primary">
                Book a Free Discovery Call
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/laravel-development-company" className="php-btn-secondary">See Laravel Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
