'use client'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const raf = useRef(null)
  const start = (t) => {
    const s = performance.now()
    const step = (now) => {
      const p = Math.min((now - s) / duration, 1)
      setCount(Math.floor(p * t))
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
  }
  useEffect(() => () => cancelAnimationFrame(raf.current), [])
  return [count, start]
}

const ACCENT = '#0F3460'
const AMBER = '#F59E0B'

const RESOURCE_TYPES = [
  { icon: '💻', title: 'Frontend Developers', desc: 'React.js, Next.js, Angular, Vue.js, TypeScript specialists who build pixel-perfect, performant UIs.', tags: ['React', 'Next.js', 'Angular', 'Vue.js'] },
  { icon: '⚙️', title: 'Backend Developers', desc: 'Node.js, Python, PHP, .NET, and Java engineers for APIs, microservices, and server-side systems.', tags: ['Node.js', 'Python', 'PHP', '.NET'] },
  { icon: '📱', title: 'Mobile App Developers', desc: 'iOS, Android, Flutter, and React Native experts for cross-platform and native mobile applications.', tags: ['Flutter', 'React Native', 'iOS', 'Android'] },
  { icon: '🛒', title: 'eCommerce Developers', desc: 'Shopify, WooCommerce, Magento, and BigCommerce developers to build and scale your online store.', tags: ['Shopify', 'WooCommerce', 'Magento'] },
  { icon: '🤖', title: 'AI / ML Engineers', desc: 'Python-based AI, LLM integration, NLP, computer vision, and predictive analytics specialists.', tags: ['Python', 'TensorFlow', 'LLMs', 'NLP'] },
  { icon: '☁️', title: 'Cloud & DevOps Engineers', desc: 'AWS, Azure, GCP, Kubernetes, and CI/CD experts to modernise and automate your infrastructure.', tags: ['AWS', 'Azure', 'Docker', 'Kubernetes'] },
  { icon: '🎨', title: 'UI/UX Designers', desc: 'Figma-first product designers who deliver wireframes, prototypes, and design systems aligned with your brand.', tags: ['Figma', 'Prototyping', 'Design Systems'] },
  { icon: '📈', title: 'Digital Marketing Experts', desc: 'SEO strategists, PPC managers, content writers, and social media specialists to grow your visibility and ROI.', tags: ['SEO', 'Google Ads', 'Meta Ads', 'Content'] },
  { icon: '🔍', title: 'QA Engineers', desc: 'Manual and automation QA testers using Selenium, Playwright, and Cypress for thorough quality assurance.', tags: ['Playwright', 'Cypress', 'Selenium'] },
]

const POPULAR_ROLES = [
  { label: 'Hire React.js Developer', href: '/hire-reactjs-developer' },
  { label: 'Hire Node.js Developer', href: '/hire-nodejs-developer' },
  { label: 'Hire Flutter Developer', href: '/hire-flutter-developer' },
  { label: 'Hire Python Developer', href: '/hire-python-developer' },
  { label: 'Hire Shopify Developer', href: '/hire-shopify-developer' },
  { label: 'Hire UI/UX Designer', href: '/hire-ui-ux-designer' },
  { label: 'Hire WordPress Developer', href: '/hire-wordpress-developer' },
  { label: 'Hire Full-Stack Developer', href: '/hire-full-stack-developer' },
  { label: 'Hire Android Developer', href: '/hire-android-developer' },
  { label: 'Hire iOS Developer', href: '/hire-ios-developer' },
  { label: 'Hire React Native Developer', href: '/hire-react-native-developer' },
  { label: 'Hire Data Scientist', href: '/hire-data-scientist' },
  { label: 'Hire Magento Developer', href: '/hire-magento-developer' },
  { label: 'Hire Blockchain Developer', href: '/hire-blockchain-developer' },
  { label: 'Hire Angular Developer', href: '/hire-angularjs-developer' },
  { label: 'Hire PHP Developer', href: '/hire-php-developer' },
]

const MODELS = [
  {
    icon: '👤',
    title: 'Full-Time Dedicated',
    sub: '160 hrs / month',
    desc: 'A resource works exclusively on your project — 8 hrs/day, 5 days/week. Full accountability, deep product context, and seamless integration with your team.',
    best: 'Best for: Long-term product builds, scaling teams, complex ongoing projects',
  },
  {
    icon: '⏰',
    title: 'Part-Time Dedicated',
    sub: '80 hrs / month',
    desc: 'A vetted specialist commits half their workday to your project. Ideal for ongoing feature work, iterative improvements, or supporting an in-house team.',
    best: 'Best for: Feature additions, support & maintenance, team augmentation',
  },
  {
    icon: '🕐',
    title: 'Hourly / Sprint-Based',
    sub: 'Pay as you go',
    desc: 'Flexible hourly engagements with no monthly commitment. Perfect for code reviews, performance audits, prototype development, or short sprints.',
    best: 'Best for: Audits, MVPs, short-term sprints, consulting',
  },
]

const WHY = [
  { h: '150+ Pre-Vetted Professionals', b: 'Every developer, designer, and digital expert is vetted through multi-stage technical assessments, portfolio reviews, and communication screening before they reach you.' },
  { h: 'Profiles in 48 Hours', b: 'Submit your requirements and receive 2–3 matched candidate profiles within 48 business hours — with detailed CVs, skill assessments, and project samples.' },
  { h: 'No Lock-In Contracts', b: "Start month-to-month with the flexibility to scale up, scale down, or change resources anytime. We don't hold you hostage with long-term commitments." },
  { h: 'NDA & IP Ownership', b: 'Confidentiality and IP assignment agreements are signed before any engagement begins. Your codebase, designs, and data remain 100% yours.' },
  { h: 'Timezone Alignment', b: 'Our resources work overlapping hours with UK, US, Canadian, and Australian teams. No waking up at 3 AM for a standup.' },
  { h: 'Dedicated Account Manager', b: 'A single point of contact manages your engagement — from onboarding through delivery — so you spend time building, not managing logistics.' },
]

const PROCESS = [
  { n: '01', h: 'Share Your Requirements', b: "Tell us the role, seniority, tech stack, engagement type, and working hours. The more detail you share, the better the match." },
  { n: '02', h: 'Receive Matched Profiles', b: '2–3 shortlisted profiles land in your inbox within 48 business hours — complete with CVs, portfolios, and our assessment notes.' },
  { n: '03', h: 'Interview & Select', b: 'Run your own technical interviews — live coding, system design, portfolio walk-through, or a paid trial task. You choose who joins.' },
  { n: '04', h: 'Onboard & Deliver', b: 'Your resource joins your tools, repo, and sprint cycle. First deliverable typically within 7 days of signing.' },
]

const INDUSTRIES = [
  'Technology & SaaS', 'Finance & Fintech', 'Healthcare & MedTech',
  'Retail & eCommerce', 'Real Estate & PropTech', 'Education & EdTech',
  'Media & Entertainment', 'Logistics & Supply Chain', 'Manufacturing',
  'Legal & Professional Services', 'Travel & Hospitality', 'Non-Profit & Government',
]

const FAQS = [
  {
    q: 'What is a dedicated resource model?',
    a: 'A dedicated resource is a vetted professional — developer, designer, or marketing expert — who works exclusively or primarily on your project for a defined period. Unlike a freelancer, a dedicated resource integrates into your team, follows your processes, and is managed by 1Solutions for HR and operational matters.',
  },
  {
    q: 'How quickly can I onboard a dedicated resource?',
    a: 'We deliver matched candidate profiles within 48 business hours of receiving your brief. Once you select a candidate and contracts are signed, the resource typically joins your tools and begins work within 7 days.',
  },
  {
    q: 'Can I scale the team up or down?',
    a: 'Yes. Our engagement model is built for flexibility. You can add resources as your workload grows, reduce the team during slower periods, or swap specialisations as your project phase changes — with as little as 2 weeks notice.',
  },
  {
    q: 'What seniority levels are available?',
    a: 'We provide resources across all levels: Junior (1–3 years), Mid-Level (3–6 years), Senior (6–10 years), and Lead/Architect (10+ years). We also offer team leads and technical programme managers for larger engagements.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. A mutual NDA and IP assignment agreement are executed as standard before any engagement begins and before any access is granted to your codebase, designs, or proprietary information.',
  },
  {
    q: 'What if the resource is not the right fit?',
    a: 'We offer a 2-week replacement guarantee. If the assigned resource is not meeting expectations, notify your account manager and we will provide a replacement profile within 5 business days at no additional cost.',
  },
  {
    q: 'Do your resources work in our timezone?',
    a: 'Yes. We support timezone overlap with UK (GMT/BST), US (EST, CST, PST), Canada (EST/PST), and Australia (AEST). Resources adjust their working hours to ensure a minimum 4-hour daily overlap with your core team.',
  },
]

const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Hire Dedicated Resources', item: 'https://www.1solutions.biz/hire-dedicated-resources/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Hire Dedicated Resources',
      provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
      description: 'Hire dedicated developers, designers, and digital marketing experts from 1Solutions. Pre-vetted professionals on full-time, part-time, or hourly engagement models. Profiles in 48 hours.',
      serviceType: 'Staff Augmentation',
      areaServed: ['IN', 'US', 'CA', 'GB', 'AU'],
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '213', bestRating: '5' },
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
}

export default function HireDedicatedResources() {
  const rtR = useRef(null); const [rtV, setRtV] = useState(false)
  const enR = useRef(null); const [enV, setEnV] = useState(false)
  const whR = useRef(null); const [whV, setWhV] = useState(false)
  const prR = useRef(null); const [prV, setPrV] = useState(false)
  const stR = useRef(null); const [stV, setStV] = useState(false)
  const [c1, s1] = useCountUp(150)
  const [c2, s2] = useCountUp(350)
  const [c3, s3] = useCountUp(48)
  const [c4, s4] = useCountUp(97)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const mkObs = (ref, setter) => {
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setter(true); o.disconnect() } }, { threshold: 0.1 })
      if (ref.current) o.observe(ref.current)
      return o
    }
    const o1 = mkObs(rtR, setRtV)
    const o2 = mkObs(enR, setEnV)
    const o3 = mkObs(whR, setWhV)
    const o4 = mkObs(prR, setPrV)
    const o5 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStV(true); s1(150); s2(350); s3(48); s4(97); o5.disconnect() }
    }, { threshold: 0.2 })
    if (stR.current) o5.observe(stR.current)
    return () => [o1, o2, o3, o4, o5].forEach(o => o.disconnect())
  }, [])

  return (
    <>
      <Head>
        <title>Hire Dedicated Resources — Developers, Designers & Digital Experts | 1Solutions</title>
        <meta name="description" content="Hire dedicated developers, designers, and digital marketing experts from 1Solutions. Pre-vetted professionals on full-time, part-time, or hourly engagements. Profiles in 48 hours. No lock-in contracts." />
        <link rel="canonical" href="https://www.1solutions.biz/hire-dedicated-resources/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          .hdr-hero{background:linear-gradient(135deg,${ACCENT} 0%,#071a35 60%,#122444 100%);color:#fff;padding:100px 20px 80px;text-align:center;position:relative;overflow:hidden}
          .hdr-hero::before{content:'';position:absolute;top:-40%;left:-20%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%);pointer-events:none}
          .hdr-hero h1{font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin:0 0 20px;line-height:1.15;position:relative}
          .hdr-hero h1 span{color:${AMBER}}
          .hdr-hero p{font-size:1.12rem;max-width:640px;margin:0 auto 36px;opacity:.88;line-height:1.75;position:relative}
          .hdr-hero-badges{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:40px;position:relative}
          .hdr-badge{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:40px;padding:6px 16px;font-size:.85rem;font-weight:600;color:rgba(255,255,255,0.9)}
          .hdr-hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative}
          .hdr-btn-primary{background:${AMBER};color:#fff;padding:15px 36px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s;display:inline-block}
          .hdr-btn-primary:hover{opacity:.88}
          .hdr-btn-outline{border:2px solid rgba(255,255,255,.65);color:#fff;padding:14px 30px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s;display:inline-block}
          .hdr-btn-outline:hover{border-color:#fff}

          .hdr-sec{padding:80px 20px}
          .hdr-sec-alt{background:#f8f9fc}
          .hdr-sec-dark{background:${ACCENT};color:#fff}
          .hdr-wrap{max-width:1160px;margin:0 auto}
          .hdr-title{font-size:clamp(1.65rem,3.5vw,2.3rem);font-weight:800;color:#111;text-align:center;margin:0 0 12px}
          .hdr-title-white{color:#fff}
          .hdr-sub{text-align:center;color:#555;font-size:1.05rem;max-width:640px;margin:0 auto 52px;line-height:1.75}
          .hdr-sub-white{color:rgba(255,255,255,.8)}

          /* Resource types grid */
          .hdr-rt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}
          .hdr-rt-card{background:#fff;border-radius:16px;padding:30px 28px;border:1.5px solid #e5e7eb;box-shadow:0 2px 12px rgba(0,0,0,.04);transition:all .3s;opacity:0;transform:translateY(22px)}
          .hdr-rt-card.hdr-in{opacity:1;transform:none}
          .hdr-rt-card:hover{border-color:${ACCENT};box-shadow:0 8px 32px rgba(15,52,96,.1);transform:translateY(-4px)}
          .hdr-rt-icon{font-size:2.2rem;margin-bottom:14px}
          .hdr-rt-card h3{font-size:1.1rem;font-weight:700;color:#111;margin:0 0 10px}
          .hdr-rt-card p{color:#555;line-height:1.7;font-size:.93rem;margin:0 0 16px}
          .hdr-rt-tags{display:flex;flex-wrap:wrap;gap:8px}
          .hdr-rt-tag{background:rgba(15,52,96,.07);color:${ACCENT};border-radius:20px;padding:4px 12px;font-size:.8rem;font-weight:600}

          /* Popular roles */
          .hdr-roles-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
          .hdr-role-link{background:#fff;border:1.5px solid #e5e7eb;border-radius:10px;padding:14px 18px;font-size:.92rem;font-weight:600;color:${ACCENT};text-decoration:none;display:flex;align-items:center;gap:8px;transition:all .3s}
          .hdr-role-link::before{content:'→';font-size:1rem;flex-shrink:0;transition:transform .2s}
          .hdr-role-link:hover{border-color:${ACCENT};background:rgba(15,52,96,.04);box-shadow:0 4px 12px rgba(15,52,96,.08)}
          .hdr-role-link:hover::before{transform:translateX(4px)}

          /* Engagement models */
          .hdr-em-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:24px}
          .hdr-em-card{background:#fff;border-radius:16px;padding:36px 30px;border:1.5px solid #e5e7eb;box-shadow:0 2px 12px rgba(0,0,0,.05);opacity:0;transform:translateY(22px);transition:opacity .5s,transform .5s;display:flex;flex-direction:column;gap:14px}
          .hdr-em-card.hdr-in{opacity:1;transform:none}
          .hdr-em-card:hover{border-color:${AMBER};box-shadow:0 8px 32px rgba(245,158,11,.12)}
          .hdr-em-icon{font-size:2.4rem}
          .hdr-em-title{font-size:1.15rem;font-weight:800;color:#111;margin:0}
          .hdr-em-sub{display:inline-block;background:rgba(245,158,11,.12);color:#b45309;border-radius:20px;padding:3px 12px;font-size:.8rem;font-weight:700;width:fit-content}
          .hdr-em-card p{color:#555;line-height:1.7;font-size:.93rem;margin:0;flex-grow:1}
          .hdr-em-best{font-size:.83rem;color:${ACCENT};font-weight:600;background:rgba(15,52,96,.06);border-radius:8px;padding:10px 14px;line-height:1.5}

          /* Why grid */
          .hdr-why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:22px}
          .hdr-why-item{background:rgba(255,255,255,.06);border-radius:14px;padding:28px 26px;border-left:4px solid ${AMBER};opacity:0;transform:translateX(-18px);transition:opacity .5s,transform .5s}
          .hdr-why-item.hdr-in{opacity:1;transform:none}
          .hdr-why-item h3{font-size:1.05rem;font-weight:700;color:#fff;margin:0 0 10px}
          .hdr-why-item p{color:rgba(255,255,255,.75);line-height:1.7;font-size:.93rem;margin:0}

          /* Stats */
          .hdr-stats-strip{background:${AMBER};padding:50px 20px}
          .hdr-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:28px;max-width:900px;margin:0 auto;text-align:center}
          .hdr-stat-val{font-size:2.8rem;font-weight:900;color:#fff;line-height:1}
          .hdr-stat-lbl{font-size:.93rem;color:rgba(255,255,255,.88);margin-top:6px;font-weight:500}

          /* Process */
          .hdr-process-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px}
          .hdr-step{text-align:center;padding:36px 24px;background:#fff;border-radius:14px;border:1.5px solid #e5e7eb;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s}
          .hdr-step.hdr-in{opacity:1;transform:none}
          .hdr-step-n{width:52px;height:52px;border-radius:50%;background:${ACCENT};color:#fff;font-size:1.1rem;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 18px}
          .hdr-step h3{font-size:1.02rem;font-weight:700;color:#111;margin:0 0 10px}
          .hdr-step p{color:#666;font-size:.9rem;line-height:1.65;margin:0}

          /* Industries */
          .hdr-ind-grid{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .hdr-ind-pill{background:#fff;border:1.5px solid #dde2ec;border-radius:40px;padding:10px 22px;font-size:.93rem;font-weight:600;color:${ACCENT};transition:all .3s}
          .hdr-ind-pill:hover{background:${ACCENT};color:#fff;border-color:${ACCENT}}

          /* FAQ */
          .hdr-faq{max-width:780px;margin:0 auto}
          .hdr-faq-item{border-bottom:1px solid #e5e7eb;padding:22px 0}
          .hdr-faq-q{display:flex;justify-content:space-between;align-items:center;cursor:pointer;font-weight:700;color:#111;font-size:1rem;gap:12px;line-height:1.5}
          .hdr-faq-icon{font-size:1.5rem;color:${ACCENT};flex-shrink:0;transition:transform .25s;font-weight:400}
          .hdr-faq-icon.hdr-open{transform:rotate(45deg)}
          .hdr-faq-a{margin-top:14px;color:#555;line-height:1.8;font-size:.95rem}

          /* CTA */
          .hdr-cta{background:linear-gradient(135deg,${ACCENT} 0%,#071a35 100%);padding:90px 20px;text-align:center;color:#fff}
          .hdr-cta h2{font-size:clamp(1.8rem,4vw,2.7rem);font-weight:800;margin:0 0 16px;line-height:1.2}
          .hdr-cta p{font-size:1.08rem;opacity:.85;max-width:580px;margin:0 auto 40px;line-height:1.75}
          .hdr-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
          .hdr-btn-amber{background:${AMBER};color:#fff;padding:15px 38px;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;transition:opacity .2s;display:inline-block}
          .hdr-btn-amber:hover{opacity:.88}
          .hdr-btn-white{border:2px solid rgba(255,255,255,.65);color:#fff;padding:14px 30px;border-radius:8px;font-weight:600;font-size:1rem;text-decoration:none;transition:border-color .2s;display:inline-block}
          .hdr-btn-white:hover{border-color:#fff}

          @media(max-width:768px){
            .hdr-stats-grid{grid-template-columns:repeat(2,1fr);gap:20px}
            .hdr-hero h1{font-size:1.8rem}
          }
          @media(max-width:480px){
            .hdr-hero{padding:80px 18px 60px}
            .hdr-stats-grid{grid-template-columns:1fr 1fr}
            .hdr-stat-val{font-size:2.2rem}
          }
        `}</style>
      </Head>

      {/* ── Hero ── */}
      <section className="hdr-hero">
        <h1>Hire <span>Dedicated Resources</span> —<br />Developers, Designers &amp; Digital Experts</h1>
        <p>Scale your team with pre-vetted full-time, part-time, or hourly professionals from 1Solutions. Onboard in 7 days. No lock-in contracts.</p>
        <div className="hdr-hero-badges">
          <span className="hdr-badge">&#10003; 150+ Vetted Professionals</span>
          <span className="hdr-badge">&#10003; Profiles in 48 Hours</span>
          <span className="hdr-badge">&#10003; NDA &amp; IP Protected</span>
          <span className="hdr-badge">&#10003; Month-to-Month Flexibility</span>
        </div>
        <div className="hdr-hero-btns">
          <Link href="/contact-us" className="hdr-btn-primary">Hire a Resource Now →</Link>
          <Link href="/portfolio" className="hdr-btn-outline">View Our Work</Link>
        </div>
      </section>

      {/* ── Resource Types ── */}
      <section className="hdr-sec" ref={rtR}>
        <div className="hdr-wrap">
          <h2 className="hdr-title">What Kind of Resources Can You Hire?</h2>
          <p className="hdr-sub">From frontend engineers to performance marketers — every role is pre-vetted, technically assessed, and ready to integrate into your workflow.</p>
          <div className="hdr-rt-grid">
            {RESOURCE_TYPES.map((rt, i) => (
              <div key={rt.title} className={`hdr-rt-card${rtV ? ' hdr-in' : ''}`} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="hdr-rt-icon">{rt.icon}</div>
                <h3>{rt.title}</h3>
                <p>{rt.desc}</p>
                <div className="hdr-rt-tags">
                  {rt.tags.map(tag => <span key={tag} className="hdr-rt-tag">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Roles ── */}
      <section className="hdr-sec hdr-sec-alt">
        <div className="hdr-wrap">
          <h2 className="hdr-title">Browse Popular Hire Pages</h2>
          <p className="hdr-sub">Looking for a specific skill? Explore our dedicated hire pages for detailed profiles, tech stacks, and engagement options.</p>
          <div className="hdr-roles-grid">
            {POPULAR_ROLES.map(role => (
              <Link key={role.href} href={role.href} className="hdr-role-link">{role.label}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement Models ── */}
      <section className="hdr-sec" ref={enR}>
        <div className="hdr-wrap">
          <h2 className="hdr-title">Flexible Engagement Models</h2>
          <p className="hdr-sub">Choose the commitment level that matches your project timeline, budget, and workload requirements.</p>
          <div className="hdr-em-grid">
            {MODELS.map((m, i) => (
              <div key={m.title} className={`hdr-em-card${enV ? ' hdr-in' : ''}`} style={{ transitionDelay: `${i * 130}ms` }}>
                <div className="hdr-em-icon">{m.icon}</div>
                <h3 className="hdr-em-title">{m.title}</h3>
                <span className="hdr-em-sub">{m.sub}</span>
                <p>{m.desc}</p>
                <div className="hdr-em-best">{m.best}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <div className="hdr-stats-strip" ref={stR}>
        <div className="hdr-stats-grid">
          <div>
            <div className="hdr-stat-val">{stV ? c1 : 0}+</div>
            <div className="hdr-stat-lbl">Vetted Professionals</div>
          </div>
          <div>
            <div className="hdr-stat-val">{stV ? c2 : 0}+</div>
            <div className="hdr-stat-lbl">Projects Delivered</div>
          </div>
          <div>
            <div className="hdr-stat-val">{stV ? c3 : 0}h</div>
            <div className="hdr-stat-lbl">Avg Time to Profiles</div>
          </div>
          <div>
            <div className="hdr-stat-val">{stV ? c4 : 0}%</div>
            <div className="hdr-stat-lbl">Client Retention Rate</div>
          </div>
        </div>
      </div>

      {/* ── Why 1Solutions ── */}
      <section className="hdr-sec hdr-sec-dark" ref={whR}>
        <div className="hdr-wrap">
          <h2 className="hdr-title hdr-title-white">Why Hire Dedicated Resources from 1Solutions?</h2>
          <p className="hdr-sub hdr-sub-white">We don&apos;t just fill seats — we match the right professional to your team culture, tech stack, and delivery standards.</p>
          <div className="hdr-why-grid">
            {WHY.map((w, i) => (
              <div key={w.h} className={`hdr-why-item${whV ? ' hdr-in' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <h3>{w.h}</h3>
                <p>{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="hdr-sec hdr-sec-alt" ref={prR}>
        <div className="hdr-wrap">
          <h2 className="hdr-title">How to Hire a Dedicated Resource in 4 Steps</h2>
          <p className="hdr-sub">From brief to first sprint deliverable — in under two weeks.</p>
          <div className="hdr-process-grid">
            {PROCESS.map((p, i) => (
              <div key={p.n} className={`hdr-step${prV ? ' hdr-in' : ''}`} style={{ transitionDelay: `${i * 110}ms` }}>
                <div className="hdr-step-n">{p.n}</div>
                <h3>{p.h}</h3>
                <p>{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="hdr-sec">
        <div className="hdr-wrap">
          <h2 className="hdr-title">Industries We Serve</h2>
          <p className="hdr-sub">Our dedicated resources have delivered projects across diverse verticals — from early-stage startups to Fortune 500 enterprises.</p>
          <div className="hdr-ind-grid">
            {INDUSTRIES.map(ind => <div key={ind} className="hdr-ind-pill">{ind}</div>)}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="hdr-sec hdr-sec-alt">
        <div className="hdr-wrap">
          <h2 className="hdr-title">Frequently Asked Questions</h2>
          <p className="hdr-sub">Everything you need to know before hiring dedicated resources from 1Solutions.</p>
          <div className="hdr-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="hdr-faq-item">
                <div className="hdr-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className={`hdr-faq-icon${openFaq === i ? ' hdr-open' : ''}`}>+</span>
                </div>
                {openFaq === i && <p className="hdr-faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hdr-cta">
        <div className="hdr-wrap">
          <h2>Ready to Hire Your Dedicated Team?</h2>
          <p>Share your requirements and receive matched professional profiles within 48 hours — no commitment required to start the conversation.</p>
          <div className="hdr-cta-btns">
            <Link href="/contact-us" className="hdr-btn-amber">Get Matched Profiles →</Link>
            <Link href="/who-we-are" className="hdr-btn-white">About 1Solutions</Link>
          </div>
        </div>
      </section>
    </>
  )
}
