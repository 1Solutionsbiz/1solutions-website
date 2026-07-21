import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const ACCENT = '#1a0028';
const SERVICES = [
  { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', title: 'YouTube Channel Strategy & Management', desc: 'Channel positioning, content roadmap, upload scheduling, YouTube SEO, end screen strategy, playlist architecture, and ongoing channel growth management - treating YouTube as the search engine it is.' },
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Video SEO (YouTube & Google)', desc: 'Title optimisation, description keyword structure, tag strategy, closed captions, chapter markers, and schema markup - maximising discoverability on both YouTube search and Google video results.' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Short-Form Video (Reels, TikTok, Shorts)', desc: 'Short-form video content strategy and production briefs for Instagram Reels, TikTok, and YouTube Shorts - hook-first scripts, trend research, and platform-specific optimisation for maximum reach.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'YouTube Ads Management', desc: 'TrueView in-stream, bumper ad, and Video Action campaigns managed for view cost and conversion performance - with audience targeting, creative testing, and weekly bid optimisation.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Video Script Writing', desc: 'Hook-first scripts written to hold attention from the first 3 seconds - structured for the platform format, brand voice, and call to action, with A/B script variants for testing.' },
  { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Video Production Coordination', desc: 'Production brief creation, talent briefing, filming schedule coordination, and post-production direction - bridging strategy and execution for your internal or external production team.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Thumbnail Design Strategy', desc: 'Click-through-rate-optimised YouTube thumbnail strategy - face framing, contrast, text hierarchy, and A/B testing - because your thumbnail is the most important creative element on YouTube.' },
  { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Video Analytics & Reporting', desc: 'Monthly video performance report - views, watch time, CTR, subscriber growth, top-performing videos, audience retention curves, and YouTube Ads attribution - with next-month recommendations.' },
];
const RESULTS = [
  { metric: '2.8M', label: 'Views in 90 days', sub: 'AU DTC product - YouTube strategy', color: '#9b59b6' },
  { metric: '3.1×', label: 'Website traffic from video', sub: 'US B2B brand', color: '#c39bd3' },
  { metric: '58%', label: 'Lower CPV vs industry avg', sub: 'Canadian brand - YouTube Ads', color: '#d7bde2' },
];
const PROCESS = [
  { n: '01', title: 'Video Strategy Audit', desc: 'We audit your existing YouTube channel or video presence - SEO, content gaps, competitor channels, audience data, and growth opportunities - establishing a baseline before producing anything new.' },
  { n: '02', title: 'Channel Optimisation', desc: 'Channel art, About section, keyword-rich channel description, playlist architecture, channel keywords, and featured video - optimising every element that influences discoverability and subscriber conversion.' },
  { n: '03', title: 'Content Calendar', desc: 'Monthly video content calendar - topics prioritised by search volume, audience intent, and business goals - with format mix (long-form, Shorts, and series) planned 4 weeks in advance.' },
  { n: '04', title: 'Script & Brief Creation', desc: 'Hook-first video scripts or detailed briefs for every planned video - including opening hook, narrative arc, talking points, B-roll direction, CTA, and end screen strategy.' },
  { n: '05', title: 'Publish & Optimise', desc: 'Videos published with SEO-optimised titles, descriptions, tags, chapters, and thumbnails - then indexed and monitored for CTR and retention performance from the first 48 hours.' },
  { n: '06', title: 'Analyse & Scale', desc: 'Audience retention analysis, CTR benchmarking, subscriber growth tracking, and search ranking monitoring - identifying what to repeat, expand, and retire each month.' },
];
const WHY = [
  { title: 'YouTube SEO Expertise', desc: 'We treat YouTube as the second-largest search engine it is - with keyword-driven content strategy, title optimisation, and description structure that drives organic discoverability.' },
  { title: 'Short-Form Native', desc: 'We create Reels, TikTok, and Shorts content with native hooks, trends, and formats - not just repurposed long-form content that performs poorly on short-form platforms.' },
  { title: 'Script & Brief Included', desc: 'Every video strategy engagement includes scripts or detailed production briefs - so your production team (internal or external) has everything they need to film.' },
  { title: 'YouTube Ads Integration', desc: 'Organic video strategy and YouTube Ads are aligned - high-performing organic videos become paid retargeting assets, and ad audience data informs organic content decisions.' },
  { title: 'Cross-Platform Distribution', desc: 'Each piece of video content is planned for repurposing across YouTube, LinkedIn, Instagram, TikTok, and website embedding - maximising the return on every video produced.' },
  { title: 'Data-Driven Iteration', desc: 'Audience retention curves, CTR data, and search ranking reports guide every content decision. We double down on what the data shows is working and cut what is not.' },
];
const FAQS = [
  { q: 'Should I focus on YouTube or TikTok?', a: 'YouTube and TikTok serve different roles. YouTube is a long-term search and discovery platform - videos rank in Google and YouTube search for years. TikTok is a short-form entertainment platform that offers faster reach but shorter content lifespan. For most B2B brands and those selling considered purchases, YouTube delivers higher-quality long-term traffic. For B2C brands targeting under-35 audiences, TikTok offers exceptional reach. The strongest video strategies use both.' },
  { q: 'What production quality do I need for YouTube?', a: 'Production quality matters less than content quality. Many of the highest-performing YouTube channels are filmed with a smartphone and good lighting. What matters most is audio quality, clear value delivery, and strong retention in the first 30 seconds. We focus on script quality, hook strength, and thumbnail design before recommending production investment.' },
  { q: 'What is video SEO and how does it work?', a: 'Video SEO is the practice of optimising YouTube videos to rank in YouTube search and Google video results. The key factors are the video title (keyword in the first 40 characters), description (natural keyword use in the first 150 characters), tags, closed captions, chapter markers, and engagement signals (likes, comments, watch time, CTR). We optimise all of these elements for every video published.' },
  { q: 'Is YouTube Shorts worth investing in?', a: 'Yes. YouTube Shorts benefit from dedicated algorithm promotion and have a separate discovery feed from long-form content. Shorts can grow your subscriber base quickly - but Shorts subscribers often have lower watch time rates on long-form content. We recommend a mixed strategy: Shorts for reach and subscriber growth, long-form for depth and search ranking, with Shorts serving as entry points into your long-form content.' },
  { q: 'How long before a YouTube channel shows results?', a: 'YouTube channel growth follows a compounding curve. Most channels see meaningful search traction at 20 to 30 published videos, and significant organic traffic by 50 to 80 videos over 6 to 12 months. Channels with strong keyword research and SEO optimisation from the start grow faster than those relying on social sharing. YouTube is a long-term investment - the content library compounds in value over time.' },
  { q: 'Do you write the video scripts?', a: 'Yes. Our video strategy engagement includes full scripts or detailed production briefs for every planned video. Scripts include the opening hook (first 3 to 5 seconds), structured body, B-roll direction notes, CTA placement, and end screen strategy. For clients who prefer to speak naturally on camera, we produce structured talking point briefs instead of word-for-word scripts.' },
];

export default function VideoMarketingServices() {
  const [openFaq, setOpenFaq] = useState(null);
  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'Digital Marketing', item: 'https://www.1solutions.biz/seo-services-company/' },
        { '@type': 'ListItem', position: 3, name: 'Video Marketing Services', item: 'https://www.1solutions.biz/video-marketing-services/' },
      ]},
      { '@type': 'ProfessionalService', name: 'Video Marketing Services', provider: { '@type': 'Organization', name: '1Solutions' },
        description: 'Video marketing by 1Solutions - YouTube channel strategy, short-form video content for Reels/TikTok, video SEO, and YouTube Ads management.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '49', bestRating: '5' },
      },
      { '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
  return (
    <>
      <Head>
        <title>Video Marketing Services | 1Solutions</title>
        <meta name="description" content="Video marketing by 1Solutions - YouTube channel strategy, short-form video content for Reels/TikTok, video SEO, and YouTube Ads management." />
        <link rel="canonical" href="https://www.1solutions.biz/video-marketing-services/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box}
          .vmkt-in{max-width:1200px;margin:0 auto;position:relative;z-index:1}
          .vmkt-bp{display:inline-flex;align-items:center;gap:8px;background:${ACCENT};color:#fff;padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(26,0,40,.25)}
          .vmkt-bp:hover{background:#0d0018;transform:translateY(-2px)}
          .vmkt-bs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.7);color:${ACCENT};padding:14px 28px;border-radius:50px;font-weight:700;font-size:.95rem;text-decoration:none;border:1.5px solid rgba(26,0,40,.18);transition:all .25s;backdrop-filter:blur(8px)}
          .vmkt-bs:hover{background:#fff;transform:translateY(-2px)}
          .vmkt-bci a:hover{color:${ACCENT}}.vmkt-cur{color:${ACCENT};font-weight:500}
          .vmkt-sec{padding:80px 40px}.vmkt-bg{background:#f8fafd}
          .vmkt-si2{max-width:1200px;margin:0 auto}
          .vmkt-tag{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:${ACCENT};margin-bottom:12px}
          .vmkt-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;color:#0A1628;margin:0 0 16px}
          .vmkt-h2 span{background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .vmkt-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px}
          .vmkt-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .vmkt-card{background:linear-gradient(135deg,rgba(26,0,40,.06) 0%,rgba(255,255,255,.88) 60%,rgba(155,89,182,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(26,0,40,.07),inset 0 1px 0 rgba(255,255,255,.95);transition:transform .22s,box-shadow .22s}
          .vmkt-card:hover{transform:translateY(-6px);border-color:rgba(26,0,40,.25);box-shadow:0 16px 48px rgba(26,0,40,.12)}
          .vmkt-icon{width:48px;height:48px;border-radius:14px;background:rgba(26,0,40,.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px}
          .vmkt-icon svg{width:22px;height:22px;color:${ACCENT}}
          .vmkt-ch{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3}
          .vmkt-cp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .vmkt-rb{background:linear-gradient(135deg,#060010 0%,${ACCENT} 100%);padding:64px 40px}
          .vmkt-ri{max-width:1200px;margin:0 auto}
          .vmkt-rt{display:block;font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(155,89,182,.8);margin-bottom:12px;text-align:center}
          .vmkt-rh{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2}
          .vmkt-rg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
          .vmkt-rc{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:36px 28px;text-align:center}
          .vmkt-rm{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px}
          .vmkt-rl{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px}
          .vmkt-rs{font-size:12.5px;color:rgba(255,255,255,.50)}
          .vmkt-wc{background:linear-gradient(135deg,rgba(26,0,40,.06) 0%,rgba(255,255,255,.88) 60%,rgba(155,89,182,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(26,0,40,.07)}
          .vmkt-wck{width:36px;height:36px;border-radius:10px;background:rgba(26,0,40,.10);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
          .vmkt-wck svg{width:18px;height:18px;color:${ACCENT}}
          .vmkt-wh{font-size:15px;font-weight:700;color:#0A1628;margin:0 0 8px}
          .vmkt-wp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .vmkt-pn{font-size:3.5rem;font-weight:900;color:rgba(26,0,40,.07);line-height:1;margin-bottom:8px;letter-spacing:-2px}
          .vmkt-pl{width:40px;height:3px;background:linear-gradient(90deg,${ACCENT},rgba(26,0,40,.3));border-radius:2px;margin-bottom:16px}
          .vmkt-ph{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px}
          .vmkt-pp{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0}
          .vmkt-fl{display:flex;flex-direction:column;gap:10px}
          .vmkt-fi{background:linear-gradient(135deg,rgba(26,0,40,.06) 0%,rgba(255,255,255,.88) 60%,rgba(155,89,182,.05) 100%);border:1px solid rgba(255,255,255,.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(26,0,40,.06)}
          .vmkt-fi.open{border-color:rgba(26,0,40,.35)}
          .vmkt-fb{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit}
          .vmkt-fq{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4}
          .vmkt-fic{width:28px;height:28px;border-radius:50%;background:rgba(26,0,40,.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s,transform .2s}
          .vmkt-fi.open .vmkt-fic{background:rgba(26,0,40,.15);transform:rotate(45deg)}
          .vmkt-fic svg{width:14px;height:14px;color:${ACCENT}}
          .vmkt-fa{padding:0 24px 20px;font-size:14px;color:#4b5563;line-height:1.8}
          .vmkt-cta{background:linear-gradient(135deg,rgba(26,0,40,.10) 0%,rgba(255,255,255,.70) 40%,rgba(155,89,182,.08) 100%);padding:90px 40px;text-align:center}
          .vmkt-cth{font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-.5px;margin:0 0 18px;background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .vmkt-ctp{font-size:1.05rem;color:#4b5563;line-height:1.75;margin:0 0 36px}
          @media(max-width:900px){.vmkt-g3,.vmkt-rg{grid-template-columns:1fr 1fr}}
          @media(max-width:600px){.vmkt-sec,.vmkt-rb,.vmkt-cta{padding-left:20px;padding-right:20px}.vmkt-g3,.vmkt-rg{grid-template-columns:1fr}.vmkt-bc{padding:12px 20px}}
        
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>
      <ServiceHero
        eyebrow="Video Marketing · YouTube Strategy · Video SEO · YouTube Ads"
        title={<>Video Marketing That <AuroraText>Builds Authority and Drives Conversions</AuroraText></>}
        subtext="1Solutions builds video marketing programs that grow YouTube channels, rank in search, dominate short-form feeds, and convert viewers into customers - with strategy, scripts, SEO, and YouTube Ads working together."
        primaryCta={{ label: 'Get a Free Video Audit', href: '/contact-us' }}
        secondaryCta={{ label: 'Discuss Your Video Strategy', href: '/contact-us' }}
        stats={[
          { label: 'Views in 90 Days', value: '8', prefix: '2.', suffix: 'M' },
          { label: 'Traffic from Video', value: '1', prefix: '3.', suffix: '×' },
          { label: 'Lower CPV', value: '58', suffix: '%' },
          { label: 'Years Experience', value: '15', suffix: '+' },
        ]}
      />
      <section className="vmkt-sec vmkt-bg"><div className="vmkt-si2">
        <span className="vmkt-tag">What We Deliver</span>
        <h2 className="vmkt-h2">Complete <span>Video Marketing Services</span></h2>
        <p className="vmkt-lead">From YouTube strategy and SEO to short-form scripts and YouTube Ads - every component of a video marketing program that builds authority and drives revenue.</p>
        <div className="vmkt-g3">{SERVICES.map(s=><div key={s.title} className="vmkt-card"><div className="vmkt-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg></div><h3 className="vmkt-ch">{s.title}</h3><p className="vmkt-cp">{s.desc}</p></div>)}</div>
      </div></section>
      <section className="vmkt-rb"><div className="vmkt-ri">
        <span className="vmkt-rt">Client Results</span>
        <h2 className="vmkt-rh">Video Marketing Results That Compound Over Time</h2>
        <div className="vmkt-rg">{RESULTS.map(r=><div key={r.label} className="vmkt-rc"><div className="vmkt-rm" style={{color:r.color}}>{r.metric}</div><div className="vmkt-rl">{r.label}</div><div className="vmkt-rs">{r.sub}</div></div>)}</div>
      </div></section>
      <section className="vmkt-sec"><div className="vmkt-si2">
        <span className="vmkt-tag">Why 1Solutions</span>
        <h2 className="vmkt-h2">The Video Partner <span>That Treats YouTube as a Search Engine</span></h2>
        <p className="vmkt-lead">We build video strategies around discoverability and authority - not just production quality. Great videos that nobody finds do not grow businesses.</p>
        <div className="vmkt-g3">{WHY.map(w=><div key={w.title} className="vmkt-wc"><div className="vmkt-wck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div><h3 className="vmkt-wh">{w.title}</h3><p className="vmkt-wp">{w.desc}</p></div>)}</div>
      </div></section>
      <section className="vmkt-sec vmkt-bg"><div className="vmkt-si2">
        <span className="vmkt-tag">How We Work</span>
        <h2 className="vmkt-h2">Our <span>6-Step Video Marketing Process</span></h2>
        <p className="vmkt-lead">From channel audit to compounding growth - a structured approach to video that builds a library of search-ranking, revenue-driving content.</p>
        <div className="vmkt-g3">{PROCESS.map(p=><div key={p.n}><div className="vmkt-pn">{p.n}</div><div className="vmkt-pl"/><h3 className="vmkt-ph">{p.title}</h3><p className="vmkt-pp">{p.desc}</p></div>)}</div>
      </div></section>
      <section className="vmkt-sec"><div className="vmkt-si2">
        <span className="vmkt-tag">Got Questions?</span>
        <h2 className="vmkt-h2">Video Marketing <span>FAQs</span></h2>
        <div className="vmkt-fl">{FAQS.map((f,i)=><div key={i} className={'vmkt-fi'+(openFaq===i?' open':'')}><button className="vmkt-fb" onClick={()=>setOpenFaq(openFaq===i?null:i)}><span className="vmkt-fq">{f.q}</span><span className="vmkt-fic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span></button>{openFaq===i&&<div className="vmkt-fa">{f.a}</div>}</div>)}</div>
      </div></section>
      <section className="vmkt-cta"><div className="vmkt-si2">
        <span className="vmkt-tag" style={{display:'block',textAlign:'center',marginBottom:12}}>Ready to Build a Video Presence That Drives Revenue?</span>
        <h2 className="vmkt-cth">Get a Free Video Marketing Audit</h2>
        <p className="vmkt-ctp">We will review your YouTube channel or video presence, identify content and SEO gaps, and share a video strategy roadmap - completely free.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/contact-us" className="vmkt-bp">Request Free Video Audit <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
          <Link href="/contact-us" className="vmkt-bs">Talk to a Video Specialist</Link>
        </div>
      </div></section>
    </>
  );
}
