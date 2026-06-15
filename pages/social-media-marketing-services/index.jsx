import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ACCENT = '#1e0a40';
const SERVICES = [
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Social Media Strategy', desc: 'Platform selection, audience research, competitive analysis, content pillars, and 90-day roadmap — a clear strategy before a single post is written.' },
  { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Content Creation (Posts, Reels, Stories)', desc: 'Platform-native content created for each channel — static posts, short-form video scripts, Instagram Stories, carousel posts, and LinkedIn documents tailored to how each algorithm rewards engagement.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Community Management', desc: 'Daily comment monitoring and responses, DM management, mention tracking, and proactive community engagement — building relationships with your audience, not just broadcasting at them.' },
  { icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z', title: 'LinkedIn Company Page Growth', desc: 'Thought leadership content, employee advocacy strategy, article publishing, and connection growth tactics — turning your LinkedIn company page into a consistent B2B lead source.' },
  { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', title: 'Instagram & Facebook Management', desc: 'Feed curation, Stories strategy, Reels content plan, hashtag research, and audience growth tactics — managed for reach, saves, and follower quality, not just vanity likes.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'TikTok Content Strategy', desc: 'Short-form video content strategy and script briefs for TikTok — trend research, sound strategy, hook writing, and posting cadence optimised for the TikTok algorithm.' },
  { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', title: 'X (Twitter) Presence', desc: 'Content calendar, real-time engagement strategy, thread writing, and brand voice maintenance on X — keeping your brand visible in real-time conversations in your industry.' },
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Social Media Audit', desc: 'Comprehensive review of your existing social presence — profile optimisation, content performance, audience quality, competitor benchmarking, and platform-specific growth opportunities identified.' },
];
const RESULTS = [
  { metric: '4.8×', label: 'Follower growth', sub: 'AU DTC brand — 8 months', color: '#7c3aed' },
  { metric: '68%', label: 'Increase in organic reach', sub: 'US professional services', color: '#a78bfa' },
  { metric: '3.2×', label: 'Inbound inquiries from LinkedIn', sub: 'Canadian B2B firm', color: '#c4b5fd' },
];
const PROCESS = [
  { n: '01', title: 'Audit & Strategy', desc: 'We audit your existing social profiles, analyse your competitors, research your audience, and define platform-specific objectives and KPIs before producing any content.' },
  { n: '02', title: 'Brand Voice Guide', desc: 'Documented brand voice, tone, visual style, and content pillars — so every post we create feels authentically yours, even when written by our team.' },
  { n: '03', title: 'Content Calendar', desc: 'Monthly editorial calendar built 2 weeks in advance — each post with caption, visual direction, hashtag strategy, and optimal posting time per platform.' },
  { n: '04', title: 'Creation & Scheduling', desc: 'Content designed, copy written, approved by you, and scheduled — all in one workflow so your calendar stays full without consuming your team\'s time.' },
  { n: '05', title: 'Community Engagement', desc: 'Daily monitoring, responses, and proactive engagement with followers, mentions, and relevant conversations — building genuine community around your brand.' },
  { n: '06', title: 'Monthly Reporting', desc: 'Platform-by-platform performance report — reach, engagement rate, follower growth, top-performing content, and recommendations for next month.' },
];
const WHY = [
  { title: 'Platform-Specific Expertise', desc: 'What works on LinkedIn does not work on TikTok or Instagram. We create platform-native content for each channel — not the same post copied across all profiles.' },
  { title: 'Native Content Style', desc: 'We match the visual and copy style of content that performs natively on each platform — not polished brand content that feels out of place in a social feed.' },
  { title: 'Community-First', desc: 'We respond to every comment and DM in your brand voice — building relationships that convert followers into customers over time.' },
  { title: 'Integrated with Paid Social', desc: 'Organic social insights inform paid social targeting. We share audience data, best-performing creative, and engagement signals across both organic and paid teams.' },
  { title: 'Brand Safety', desc: 'All content is approved by you before publishing. We maintain clear escalation protocols for sensitive topics, negative press, and community issues.' },
  { title: 'Transparent Reporting', desc: 'Monthly reports show real metrics — engagement rate, reach per post, follower quality, and inbound inquiries attributed to social — not vanity numbers.' },
];
const FAQS = [
  { q: 'What is the difference between organic social media and paid social?', a: 'Organic social media is content you publish on your profiles without paying for distribution — relying on your existing followers, algorithm reach, and engagement to spread it. Paid social is advertising — paying to show content to targeted audiences who do not follow you yet. Both serve different roles: organic builds community and brand credibility; paid drives reach, leads, and conversions at scale.' },
  { q: 'How often should I post on social media?', a: 'Posting frequency depends on the platform and your capacity to produce quality content. LinkedIn performs well at 3 to 5 posts per week. Instagram typically benefits from 4 to 6 feed posts per week plus daily Stories. TikTok rewards higher frequency — 1 to 3 videos per day for accounts in growth mode. We recommend a frequency you can sustain with quality over one you can only maintain for a few weeks.' },
  { q: 'Which social media platforms should my business be on?', a: 'Platform choice should follow your audience, not the trend. B2B businesses typically prioritise LinkedIn, with secondary presence on X and YouTube. B2C brands focus on Instagram, TikTok, and Facebook depending on age demographics. We research where your specific audience spends time before recommending a platform mix — not all platforms are right for every business.' },
  { q: 'How long before organic social media shows results?', a: 'Organic growth is a long-term investment. Most businesses see meaningful follower growth and engagement improvement within 3 to 4 months of consistent, quality content. Inbound inquiries and lead attribution from organic social typically emerge at month 4 to 6 as your audience builds trust and familiarity with your brand.' },
  { q: 'How do you maintain our brand voice?', a: 'In the first two weeks, we document your brand voice, tone, values, and content preferences in a brand voice guide. All content is written to this guide and approved by you before scheduling. Over time, we refine the voice based on which posts resonate most with your audience — the guide is a living document.' },
  { q: 'Can social media marketing work for B2B businesses?', a: 'Yes — particularly LinkedIn. B2B businesses that share genuine expertise, case study content, and thought leadership on LinkedIn consistently generate inbound inquiries from decision-makers. The key is posting content that educates and builds credibility, not just company announcements. We have helped B2B firms in professional services, SaaS, and consulting generate 3 to 5 qualified inbound leads per week from LinkedIn alone.' },
];

export default function SocialMediaMarketingServices() {
  const [openFaq, setOpenFaq] = useState(null);
  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Social Media Marketing Services', item: 'https://www.1solutions.biz/social-media-marketing-services/' },
      ]},
      { '@type': 'Service', name: 'Social Media Marketing Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Social media marketing by 1Solutions — content strategy, community management, and organic brand growth across Instagram, LinkedIn, Facebook, X, and TikTok.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '86', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <Head>
        <title>Social Media Marketing Services | Organic Growth & Brand Building | 1Solutions</title>
        <meta name="description" content="Social media marketing by 1Solutions — content strategy, community management, and organic brand growth across Instagram, LinkedIn, Facebook, X, and TikTok." />
        <link rel="canonical" href="https://www.1solutions.biz/social-media-marketing-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box}
          .smkt-hero{position:relative;overflow:hidden;padding:100px 40px 90px;background:linear-gradient(135deg,rgba(30,10,64,0.08) 0%,rgba(255,255,255,0.75) 50%,rgba(124,58,237,0.07) 100%)}
          .smkt-o1{position:absolute;top:-120px;right:-120px;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(30,10,64,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(10px)}
          .smkt-o2{position:absolute;bottom:-80px;left:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.08) 0%,transparent 70%);pointer-events:none;filter:blur(8px)}
          .smkt-in{max-width:1200px;margin:0 auto;position:relative;z-index:1}
          .smkt-ey{display:inline-flex;align-items:center;gap:8px;background:rgba(30,10,64,0.10);border:1px solid rgba(30,10,64,0.25);border-radius:50px;padding:6px 16px;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:24px}
          .smkt-h1{font-size:clamp(2.4rem,4.5vw,3.8rem);font-weight:900;line-height:1.12;letter-spacing:-1.5px;margin:0 0 24px;background:linear-gradient(90deg,#0a0020 0%,${ACCENT} 45%,#7c3aed 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .smkt-p{font-size:1.1rem;color:#4b5563;line-height:1.8;margin:0 0 36px;max-width:660px}
          .smkt-btns{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
          .smkt-bp{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(30,10,64,.25)}
          .smkt-bp:hover{background:#0a0020;transform:translateY(-2px)}
          .smkt-bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);color:${ACCENT};padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;border:1.5px solid rgba(30,10,64,.18);transition:all .25s;backdrop-filter:blur(8px)}
          .smkt-bs:hover{background:#fff;transform:translateY(-2px)}
          .smkt-tr{display:flex;flex-wrap:wrap;gap:20px;align-items:center;margin-bottom:48px}
          .smkt-badge{display:flex;align-items:center;gap:6px;font-size:12px;color:#6b7280;font-weight:500}
          .smkt-sbar{display:flex;border:1px solid rgba(30,10,64,.10);border-radius:16px;background:rgba(255,255,255,.75);backdrop-filter:blur(12px);overflow:hidden;max-width:680px}
          .smkt-si{flex:1;display:flex;flex-direction:column;align-items:center;padding:20px 16px;border-right:1px solid rgba(30,10,64,.08)}
          .smkt-si:last-child{border-right:none}
          .smkt-sn{font-size:1.9rem;font-weight:900;color:${ACCENT};line-height:1;letter-spacing:-1px}
          .smkt-sl{font-size:11px;color:#6b7280;font-weight:500;line-height:1.4;text-align:center;margin-top:4px}
          .smkt-bc{background:#f8fafd;border-bottom:1px solid #edf0f5;padding:12px 40px}
          .smkt-bci{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;font-size:12.5px;color:#6b7280}
          .smkt-bci a{color:#6b7280;text-decoration:none}.smkt-bci a:hover{color:${ACCENT}}
          .smkt-sep{color:#d1d5db}.smkt-cur{color:${ACCENT};font-weight:500}
          .smkt-sec{padding:80px 40px}.smkt-bg{background:#f8fafd}
          .smkt-si2{max-width:1200px;margin:0 auto}
          .smkt-tag{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px}
          .smkt-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;color:#0A1628;margin:0 0 16px}
          .smkt-h2 span{background:linear-gradient(90deg,${ACCENT},#7c3aed);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .smkt-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px}
          .smkt-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .smkt-card{background:linear-gradient(135deg,rgba(30,10,64,.06) 0%,rgba(255,255,255,.88) 60%,rgba(124,58,237,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(30,10,64,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s}
          .smkt-card:hover{transform:translateY(-6px);border-color:rgba(30,10,64,.25);box-shadow:0 16px 48px rgba(30,10,64,.12)}
          .smkt-icon{width:48px;height:48px;border-radius:14px;background:rgba(30,10,64,.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .smkt-icon svg{width:22px;height:22px;color:${ACCENT}}
          .smkt-ch{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3}
          .smkt-cp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .smkt-rb{background:linear-gradient(135deg,#050010 0%,${ACCENT} 100%);padding:64px 40px}
          .smkt-ri{max-width:1200px;margin:0 auto}
          .smkt-rt{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(167,139,250,.8);margin-bottom:12px;text-align:center}
          .smkt-rh{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2}
          .smkt-rg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .smkt-rc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px 28px;text-align:center}
          .smkt-rm{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .smkt-rl{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .smkt-rs{font-size:12.5px;color:rgba(255,255,255,.50)}
          .smkt-wc{background:linear-gradient(135deg,rgba(30,10,64,.06) 0%,rgba(255,255,255,.88) 60%,rgba(124,58,237,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(30,10,64,.07)}
          .smkt-wck{width:36px;height:36px;border-radius:10px;background:rgba(30,10,64,.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .smkt-wck svg{width:18px;height:18px;color:${ACCENT}}
          .smkt-wh{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px}
          .smkt-wp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .smkt-pn{font-size:3.5rem;font-weight:900;color:rgba(30,10,64,.07);line-height:1;margin-bottom:8px;letter-spacing:-2px}
          .smkt-pl{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(30,10,64,.3));border-radius:2px;margin-bottom:16px}
          .smkt-ph{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px}
          .smkt-pp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .smkt-fl{display:flex;flex-direction:column;gap:10px}
          .smkt-fi{background:linear-gradient(135deg,rgba(30,10,64,.06) 0%,rgba(255,255,255,.88) 60%,rgba(124,58,237,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(30,10,64,.06)}
          .smkt-fi.open{border-color:rgba(30,10,64,.35)}
          .smkt-fb{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit}
          .smkt-fq{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4}
          .smkt-fic{width:28px;height:28px;border-radius:50%;background:rgba(30,10,64,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .2s}
          .smkt-fi.open .smkt-fic{background:rgba(30,10,64,.15);transform:rotate(45deg)}
          .smkt-fic svg{width:14px;height:14px;color:${ACCENT}}
          .smkt-fa{padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8}
          .smkt-cta{background:linear-gradient(135deg,rgba(30,10,64,.10) 0%,rgba(255,255,255,.70) 40%,rgba(124,58,237,.08) 100%);padding:90px 40px;text-align:center}
          .smkt-cth{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;margin:0 0 18px;background:linear-gradient(90deg,#0a0020 0%,${ACCENT} 50%,#7c3aed 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .smkt-ctp{font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px}
          @media(max-width:900px){.smkt-g3,.smkt-rg{grid-template-columns:1fr 1fr}}
          @media(max-width:600px){.smkt-hero,.smkt-sec,.smkt-rb,.smkt-cta{padding-left:20px;padding-right:20px}.smkt-hero{padding-top:60px;padding-bottom:50px}.smkt-g3,.smkt-rg{grid-template-columns:1fr}.smkt-bc{padding:12px 20px}}
        `}</style>
      </Head>
      <nav className="smkt-bc"><div className="smkt-bci"><Link href="/">Home</Link><span className="smkt-sep">›</span><Link href="/seo-services-company/">Digital Marketing</Link><span className="smkt-sep">›</span><span className="smkt-cur">Social Media Marketing Services</span></div></nav>
      <section className="smkt-hero"><div className="smkt-o1"/><div className="smkt-o2"/>
        <div className="smkt-in">
          <span className="smkt-ey">Organic Social — Instagram · LinkedIn · Facebook · TikTok · X</span>
          <h1 className="smkt-h1">Social Media Marketing That Builds Real Brand Authority</h1>
          <p className="smkt-p">1Solutions manages organic social media marketing that builds genuine audience relationships, establishes brand authority, and converts followers into customers — across every platform where your audience spends time.</p>
          <div className="smkt-btns">
            <Link href="/contact" className="smkt-bp">Get a Free Social Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
            <Link href="/contact" className="smkt-bs">Discuss Your Social Strategy</Link>
          </div>
          <div className="smkt-tr">{['Platform-native content','Brand voice documented','Community management included','Monthly reporting'].map(t=><span key={t} className="smkt-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{t}</span>)}</div>
          <div className="smkt-sbar">{[{num:'4.8×',lbl:'Follower Growth'},{num:'15+',lbl:'Years Experience'},{num:'68%',lbl:'Reach Increase'},{num:'5',lbl:'Platforms Managed'}].map(s=><div key={s.lbl} className="smkt-si"><span className="smkt-sn">{s.num}</span><span className="smkt-sl">{s.lbl}</span></div>)}</div>
        </div>
      </section>
      <section className="smkt-sec smkt-bg"><div className="smkt-si2">
        <span className="smkt-tag">What We Manage</span>
        <h2 className="smkt-h2">Complete <span>Social Media Marketing Services</span></h2>
        <p className="smkt-lead">Every platform, every content format, and every community interaction — managed by social specialists who understand native content on each channel.</p>
        <div className="smkt-g3">{SERVICES.map(s=><div key={s.title} className="smkt-card"><div className="smkt-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div><h3 className="smkt-ch">{s.title}</h3><p className="smkt-cp">{s.desc}</p></div>)}</div>
      </div></section>
      <section className="smkt-rb"><div className="smkt-ri">
        <span className="smkt-rt">Client Results</span>
        <h2 className="smkt-rh">Social Media Results That Build Sustainable Brand Value</h2>
        <div className="smkt-rg">{RESULTS.map(r=><div key={r.label} className="smkt-rc"><div className="smkt-rm" style={{color:r.color}}>{r.metric}</div><div className="smkt-rl">{r.label}</div><div className="smkt-rs">{r.sub}</div></div>)}</div>
      </div></section>
      <section className="smkt-sec"><div className="smkt-si2">
        <span className="smkt-tag">Why 1Solutions</span>
        <h2 className="smkt-h2">The Social Media Partner <span>That Creates Content That Belongs</span></h2>
        <p className="smkt-lead">We create content that fits naturally on each platform — not polished corporate posts that get scrolled past.</p>
        <div className="smkt-g3">{WHY.map(w=><div key={w.title} className="smkt-wc"><div className="smkt-wck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="smkt-wh">{w.title}</h3><p className="smkt-wp">{w.desc}</p></div>)}</div>
      </div></section>
      <section className="smkt-sec smkt-bg"><div className="smkt-si2">
        <span className="smkt-tag">How We Work</span>
        <h2 className="smkt-h2">Our <span>6-Step Social Media Process</span></h2>
        <p className="smkt-lead">From audit to community — a structured process that builds an engaged audience around your brand.</p>
        <div className="smkt-g3">{PROCESS.map(p=><div key={p.n}><div className="smkt-pn">{p.n}</div><div className="smkt-pl"/><h3 className="smkt-ph">{p.title}</h3><p className="smkt-pp">{p.desc}</p></div>)}</div>
      </div></section>
      <section className="smkt-sec"><div className="smkt-si2">
        <span className="smkt-tag">Got Questions?</span>
        <h2 className="smkt-h2">Social Media Marketing <span>FAQs</span></h2>
        <div className="smkt-fl">{FAQS.map((f,i)=><div key={i} className={'smkt-fi'+(openFaq===i?' open':'')}><button className="smkt-fb" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="smkt-fq">{f.q}</span><span className="smkt-fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>{openFaq===i&&<div className="smkt-fa">{f.a}</div>}</div>)}</div>
      </div></section>
      <section className="smkt-cta"><div className="smkt-si2">
        <span className="smkt-tag" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Build Real Brand Authority on Social?</span>
        <h2 className="smkt-cth">Get a Free Social Media Audit</h2>
        <p className="smkt-ctp">We will review your current social profiles, content performance, and audience quality — and share a platform-specific strategy for building genuine brand authority and inbound leads.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/contact" className="smkt-bp">Request Free Social Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          <Link href="/contact" className="smkt-bs">Talk to a Social Media Specialist</Link>
        </div>
      </div></section>
    </>
  );
}
