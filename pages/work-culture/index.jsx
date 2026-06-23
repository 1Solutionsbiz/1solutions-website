import Head from 'next/head';
import Link from 'next/link';

const UPDATED = 'June 13, 2025';

const VALUES = [
  { icon: '🤝', title: 'Respect & Dignity', desc: 'Every person at 1Solutions is treated with respect, regardless of role, tenure, or background. We do not tolerate disrespect in any form.' },
  { icon: '🎯', title: 'Ownership', desc: 'We take responsibility for our work — the good and the bad. When something goes wrong, we fix it without making excuses.' },
  { icon: '📣', title: 'Candour', desc: 'We say what we think, respectfully. Honest feedback is a gift, not an attack. We value direct communication over corporate politeness.' },
  { icon: '🌱', title: 'Continuous Growth', desc: 'We are all perpetual learners. Curiosity and skill development are encouraged and supported through resources and time.' },
  { icon: '🏆', title: 'Excellence', desc: 'We set high standards for ourselves. Good enough is not enough. We take pride in craft and quality in everything we deliver.' },
  { icon: '🤲', title: 'Collaboration', desc: 'The best work happens when people share knowledge and help each other. Silos and hoarding of information have no place here.' },
];

const SECTIONS = [
  {
    id: 'overview',
    title: '1. Our Culture in Brief',
    body: `At 1Solutions, culture is not what we put on a poster — it is what we do when no one is watching. It is the cumulative effect of how we treat each other, make decisions, give feedback, and show up every day.

We are a team of 50+ professionals working on projects for clients across the US, Canada, and Australia. We have been doing this for 15+ years, and we know that the quality of our work is a direct reflection of the quality of our environment.

This Work Culture document outlines our shared commitments — to our team, to our clients, and to our own growth. It applies to everyone at 1Solutions: full-time employees, contractors, interns, and leadership.`,
  },
  {
    id: 'values',
    title: '2. Our Core Values',
    type: 'values',
  },
  {
    id: 'environment',
    title: '3. Work Environment & Hours',
    body: `Our primary office is in New Delhi, India. We are an on-site-first team, with hybrid arrangements available for senior professionals based on role requirements and mutual agreement.

Standard working hours:
• Monday to Friday, 10:00 AM – 7:00 PM IST
• Flexible start times (10:00 AM – 12:00 PM window) available by arrangement

We do not expect or celebrate unnecessary overtime. If someone consistently works late, we treat it as a planning or workload problem to solve — not a badge of dedication.

Client time-zone coverage:
Some roles (client management, business development) require overlap with US/Australia business hours. These schedules are agreed upfront and compensated fairly.`,
  },
  {
    id: 'communication',
    title: '4. Communication Standards',
    body: `We communicate with clarity, respect, and intent.

Internal communication:
• Written communication (Slack, email) should be clear and direct — we do not use passive-aggressive language
• Meetings must have an agenda. If there is no agenda, the meeting should be an email
• We respect focused work time — not every message needs an immediate reply
• We document decisions so knowledge is not siloed in one person's memory

Feedback culture:
• Feedback is given directly — not through intermediaries, and not in front of a crowd
• We separate feedback about work from judgement of character
• We welcome questions. "I don't know" is an acceptable and respected answer

Conflict:
If you have a disagreement with a colleague, raise it directly first. If it cannot be resolved, involve your team lead or HR. We do not allow grievances to fester.`,
  },
  {
    id: 'growth',
    title: '5. Career Growth & Learning',
    body: `We invest in our people because skilled, engaged people build better products.

What we provide:
• Clear career tracks with defined criteria for progression (reviewed every 6 months)
• Access to learning platforms, online courses, and certifications (sponsored by the company)
• Weekly internal tech talks and knowledge-sharing sessions
• Mentorship: junior team members are paired with experienced mentors
• Opportunities to work on diverse projects across industries and technology stacks

Promotions are based on demonstrated performance and skill growth — not tenure or politics. We document criteria transparently so there are no surprises.

If you want to grow into a new area (e.g., a developer interested in moving into project management), raise it with your lead. We actively support internal transitions.`,
  },
  {
    id: 'diversity',
    title: '6. Diversity, Equity & Inclusion',
    body: `1Solutions is an equal opportunity employer. We hire, promote, and compensate based on skill, performance, and potential — not on gender, religion, caste, nationality, age, disability, sexual orientation, or any other characteristic unrelated to the work.

Our commitments:
• We actively work to reduce bias in our hiring and review processes
• We maintain equal pay for equal work, reviewed annually
• We provide a safe channel for reporting discrimination or harassment (info@1solutions.biz or directly to the owner)
• Any form of discrimination, harassment, bullying, or intimidation is a zero-tolerance violation
• Reported concerns are investigated promptly, fairly, and confidentially

We recognise that we are not a finished product. We are actively working to make 1Solutions more diverse and inclusive, and we welcome feedback on how to improve.`,
  },
  {
    id: 'wellbeing',
    title: '7. Wellbeing & Leave',
    body: `We care about the whole person, not just the professional output.

Leave entitlements (full-time employees):
• Annual leave: 18 days per year (prorated for the first year)
• Sick leave: 10 days per year (non-cumulative, no documentation required for up to 3 consecutive days)
• National and public holidays: as per the official India/Delhi holiday calendar
• Maternity leave: per applicable law; we will always meet or exceed statutory requirements
• Paternity leave: 10 days, fully paid

Mental health:
We acknowledge that mental health is health. If you are struggling, please talk to your team lead or HR. We will accommodate reasonable adjustments — time off, schedule changes, or workload adjustments — without judgement.

We do not glorify burnout. Taking your leave and logging off at the end of the day is not a lack of commitment. It is what allows you to do great work sustainably.`,
  },
  {
    id: 'conduct',
    title: '8. Code of Conduct',
    body: `All team members are expected to:

✓ Treat every colleague with respect and professionalism
✓ Keep client information strictly confidential
✓ Use company resources (devices, software, internet) for work purposes
✓ Represent 1Solutions honestly and professionally in all external communications
✓ Report unethical behaviour — to a lead, to HR, or to info@1solutions.biz

The following are grounds for immediate disciplinary action or termination:
• Harassment, discrimination, or bullying of any kind
• Sharing confidential client or company information with unauthorised parties
• Falsifying work records, timesheets, or deliverables
• Insubordination or deliberate sabotage
• Any conduct that brings the company or its clients into disrepute

We handle disciplinary matters through a fair, documented process. We do not act on rumour — we investigate facts.`,
  },
  {
    id: 'feedback-channel',
    title: '9. Raising Concerns',
    body: `We want to know when something is not working — before it becomes a serious problem.

How to raise a concern:
1. Speak directly to your immediate team lead (for work or process issues)
2. Email info@1solutions.biz for HR-related matters, policy concerns, or if you prefer a confidential channel
3. For serious matters (harassment, discrimination, financial impropriety), you may email the owner directly

We guarantee:
• Acknowledgement within 48 hours
• A fair and confidential investigation
• No retaliation for raising a legitimate concern in good faith

Anonymous concerns can be submitted in writing, though these are harder to investigate fully.`,
  },
  {
    id: 'updates',
    title: '10. Updates to This Document',
    body: `This Work Culture document is a living document. We will review and update it at least annually — or sooner if there are significant changes to the company, applicable laws, or team feedback.

All team members will be notified of material changes. Previous versions are available upon request.

Culture is built by everyone here, not just by leadership. If you see something that contradicts what is written here — or something we should add — please let us know.`,
  },
];

export default function WorkCulture() {
  return (
    <>
      <Head>
        <title>Work Culture | 1Solutions — How We Work & Who We Are</title>
        <meta name="description" content="1Solutions Work Culture — our values, communication standards, DEI commitments, leave policy, and code of conduct for our team in New Delhi." />
        <link rel="canonical" href="https://www.1solutions.biz/work-culture/" />
        <style>{`
          .wc-page { font-family:'Inter',sans-serif; color:#1a1a2e; background:#f8fafc; }
          .wc-hero { background:linear-gradient(135deg,#f0fdf4 0%,#dbeafe 30%,#ede9fe 60%,#fef3c7 100%); padding:80px 24px 60px; position:relative; overflow:hidden; }
          .wc-orb { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
          .wc-orb-1 { width:500px; height:500px; background:rgba(5,150,105,0.08); top:-120px; right:-100px; }
          .wc-orb-2 { width:350px; height:350px; background:rgba(17,65,113,0.08); bottom:-60px; left:-60px; }
          .wc-hero-inner { max-width:1100px; margin:0 auto; position:relative; z-index:1; }
          .wc-breadcrumb { display:flex; align-items:center; gap:6px; font-size:.82rem; color:#6b7280; margin-bottom:20px; flex-wrap:wrap; }
          .wc-breadcrumb a { color:#114171; text-decoration:none; font-weight:500; }
          .wc-breadcrumb a:hover { text-decoration:underline; }
          .wc-hero h1 { font-size:clamp(2rem,4vw,3rem); font-weight:800; line-height:1.14; letter-spacing:-.025em; color:#0F1F40; margin:0 0 14px; }
          .wc-hero-sub { font-size:1rem; line-height:1.65; color:#374151; max-width:540px; margin:0; }
          .wc-hero-meta { font-size:.88rem; color:#6b7280; display:flex; align-items:center; gap:18px; flex-wrap:wrap; margin-top:14px; }
          .wc-hero-meta span { display:flex; align-items:center; gap:6px; }
          .wc-body { max-width:1100px; margin:0 auto; padding:56px 24px 80px; display:grid; grid-template-columns:220px 1fr; gap:48px; align-items:start; }
          .wc-toc { position:sticky; top:100px; }
          .wc-toc-title { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#9ca3af; margin-bottom:14px; }
          .wc-toc-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:2px; }
          .wc-toc-list a { display:block; font-size:.82rem; color:#4b5563; text-decoration:none; padding:6px 10px; border-radius:8px; transition:background .15s,color .15s; line-height:1.4; }
          .wc-toc-list a:hover { background:rgba(17,65,113,0.07); color:#114171; }
          .wc-related { margin-top:28px; border-top:1px solid #e5e7eb; padding-top:20px; }
          .wc-related-title { font-size:.72rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#9ca3af; margin-bottom:10px; }
          .wc-related-link { display:flex; align-items:center; gap:6px; font-size:.82rem; color:#114171; text-decoration:none; padding:6px 10px; border-radius:8px; font-weight:500; transition:background .15s; margin-bottom:4px; }
          .wc-related-link:hover { background:rgba(17,65,113,0.07); }
          .wc-content { min-width:0; }
          .wc-intro { background:rgba(5,150,105,0.06); border-left:3px solid #059669; border-radius:0 10px 10px 0; padding:16px 20px; margin-bottom:40px; font-size:.92rem; line-height:1.68; color:#374151; }
          .wc-section { margin-bottom:44px; }
          .wc-section:last-child { margin-bottom:0; }
          .wc-section-title { font-size:1.12rem; font-weight:700; color:#0F1F40; margin:0 0 14px; padding-bottom:10px; border-bottom:1.5px solid #e5e7eb; letter-spacing:-.01em; }
          .wc-body-text { font-size:.93rem; line-height:1.78; color:#374151; white-space:pre-line; }
          .wc-values-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; margin-top:4px; }
          .wc-value-card { background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:18px 18px; transition:border-color .2s,box-shadow .2s; }
          .wc-value-card:hover { border-color:#114171; box-shadow:0 4px 16px rgba(17,65,113,0.08); }
          .wc-value-icon { font-size:1.5rem; margin-bottom:10px; }
          .wc-value-title { font-size:.93rem; font-weight:700; color:#0F1F40; margin-bottom:6px; }
          .wc-value-desc { font-size:.86rem; line-height:1.6; color:#4b5563; }
          .wc-cta-card { background:linear-gradient(135deg,rgba(5,150,105,0.07),rgba(17,65,113,0.07)); border:1px solid rgba(5,150,105,0.18); border-radius:14px; padding:24px 22px; margin-top:32px; }
          .wc-cta-card h3 { font-size:1.05rem; font-weight:700; color:#0F1F40; margin:0 0 8px; }
          .wc-cta-card p { font-size:.9rem; line-height:1.65; color:#374151; margin:0 0 16px; }
          .wc-cta-actions { display:flex; gap:10px; flex-wrap:wrap; }
          .wc-btn { display:inline-flex; align-items:center; gap:6px; padding:10px 20px; border-radius:100px; font-size:.88rem; font-weight:700; text-decoration:none; transition:all .2s; }
          .wc-btn-primary { background:#114171; color:#fff; }
          .wc-btn-primary:hover { background:#0d3260; }
          .wc-btn-green { background:#059669; color:#fff; }
          .wc-btn-green:hover { background:#047857; }
          @media(max-width:768px){
            .wc-body { grid-template-columns:1fr; padding:40px 20px 60px; gap:0; }
            .wc-toc { position:static; margin-bottom:32px; }
            .wc-hero { padding:60px 20px 44px; }
            .wc-values-grid { grid-template-columns:1fr; }
          }
        `}</style>
      </Head>
      <div className="wc-page">
        <div className="wc-hero">
          <div className="wc-orb wc-orb-1" /><div className="wc-orb wc-orb-2" />
          <div className="wc-hero-inner">
            <nav className="wc-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span style={{color:'#d1d5db'}}>›</span>
              <span>Work Culture</span>
            </nav>
            <h1>Work Culture</h1>
            <p className="wc-hero-sub">How we work, what we value, and what you can expect as part of the 1Solutions team.</p>
            <div className="wc-hero-meta">
              <span><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 13H11v-6h1.5v6zm0-8H11V5h1.5v2z"/></svg>Last updated: {UPDATED}</span>
              <span><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>Applies to all 1Solutions team members</span>
            </div>
          </div>
        </div>
        <div className="wc-body">
          <nav className="wc-toc" aria-label="Page contents">
            <div className="wc-toc-title">Contents</div>
            <ul className="wc-toc-list">{SECTIONS.map(s=><li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>)}</ul>
            <div className="wc-related">
              <div className="wc-related-title">Careers</div>
              <Link href="/open-positions/" className="wc-related-link"><svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>Open Positions</Link>
              <Link href="/apply-online/" className="wc-related-link"><svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>Apply Online</Link>
              <Link href="/who-we-are/" className="wc-related-link"><svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>About 1Solutions</Link>
            </div>
          </nav>
          <main className="wc-content">
            <div className="wc-intro">
              This document applies to <strong>all team members at 1Solutions</strong> — full-time employees, contractors, interns, and leadership. It is a living document and reflects our ongoing commitment to building a team we are proud to be part of.
            </div>
            {SECTIONS.map(s => (
              <section key={s.id} id={s.id} className="wc-section">
                <h2 className="wc-section-title">{s.title}</h2>
                {s.type === 'values' ? (
                  <div className="wc-values-grid">
                    {VALUES.map(v => (
                      <div key={v.title} className="wc-value-card">
                        <div className="wc-value-icon">{v.icon}</div>
                        <div className="wc-value-title">{v.title}</div>
                        <div className="wc-value-desc">{v.desc}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="wc-body-text">{s.body}</p>
                )}
              </section>
            ))}
            <div className="wc-cta-card">
              <h3>Interested in joining the team?</h3>
              <p>Browse our open roles or submit a general application — we review all profiles and reach out when a match arises.</p>
              <div className="wc-cta-actions">
                <Link href="/open-positions/" className="wc-btn wc-btn-green">View Open Positions</Link>
                <Link href="/apply-online/" className="wc-btn wc-btn-primary">Apply Online</Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
