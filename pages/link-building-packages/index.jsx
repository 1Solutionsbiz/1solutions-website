import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    slug: 'starter',
    monthlyPrice: 499,
    yearlyPrice: 415,
    yearlySave: 1008,
    desc: 'For businesses starting to build domain authority with quality backlinks.',
    popular: false,
    features: [
      '5 high-DA links per month',
      'DR40+ domains only',
      'Guest post placements',
      'Manual outreach',
      'Niche-relevant sites',
      'Anchor text optimisation',
      'Monthly link delivery report',
      'Google Sheets live tracker',
    ],
  },
  {
    name: 'Growth',
    slug: 'growth',
    monthlyPrice: 899,
    yearlyPrice: 749,
    yearlySave: 1800,
    desc: 'For businesses serious about building authority through diverse, high-quality links.',
    popular: true,
    features: [
      '12 high-DA links per month',
      'DR50+ domains',
      'Guest posts + niche edits',
      'Manual outreach + relationship building',
      'Niche-relevant sites',
      'Full anchor text strategy',
      'Competitor backlink gap analysis',
      'Disavow audit (if needed)',
      'Monthly link report + review call',
      'Live link tracker dashboard',
    ],
  },
  {
    name: 'Authority',
    slug: 'authority',
    monthlyPrice: 1499,
    yearlyPrice: 1249,
    yearlySave: 3000,
    desc: 'For competitive industries needing scale, premium placements, and digital PR.',
    popular: false,
    features: [
      '25 high-DA links per month',
      'DR60+ domains',
      'Guest posts + niche edits + digital PR',
      'Premium publication placements',
      'Full link profile strategy',
      'Monthly competitor gap analysis',
      'Ongoing disavow management',
      'Custom anchor text map',
      'Monthly report + strategy call',
      'Dedicated link building strategist',
    ],
  },
];

const WHY_MATTERS = [
  { num: '3.8×', desc: 'more backlinks the #1 Google result has compared to pages ranking 2–10', source: 'Backlinko, 2024' },
  { num: '92%', desc: 'of SEO professionals say link building significantly impacts search rankings', source: 'Aira State of Link Building' },
  { num: '5×', desc: 'more organic traffic received by pages with a strong backlink profile vs. pages without', source: 'Backlinko Research' },
];

const METHODOLOGY = [
  {
    n: '01',
    title: 'Discovery & Strategy',
    desc: 'We audit your existing backlink profile and analyse your top 5 competitors to identify authority gaps and the highest-value link opportunities.',
    detail: ['Current backlink profile audit', 'Competitor link gap analysis', 'Keyword-to-page link targets', 'Anchor text strategy map'],
  },
  {
    n: '02',
    title: 'Prospect Research & Vetting',
    desc: 'We identify prospective link sites using 15+ quality signals — DR, organic traffic, niche relevance, spam score, editorial standards, and link velocity.',
    detail: ['DR + traffic threshold checks', 'Spam score < 2% filter', 'Niche relevance scoring', 'Editorial quality review'],
  },
  {
    n: '03',
    title: 'Manual Outreach & Relationship Building',
    desc: 'Our outreach team contacts site editors and publishers through personalised pitches — never automated templates. We build genuine relationships for consistent placement.',
    detail: ['Personalised outreach pitches', 'Editor relationship management', 'No automated mass outreach', 'Positive reply rate tracking'],
  },
  {
    n: '04',
    title: 'Content Creation & Editorial Review',
    desc: "For guest posts, our writers create original, expert-level content written for the target publication's audience — not repurposed content from your blog.",
    detail: ['Original article per placement', 'Niche subject-matter writing', 'Editorial guideline compliance', 'Natural link integration'],
  },
  {
    n: '05',
    title: 'Quality Assurance & Placement',
    desc: 'Every link is verified before delivery: live URL checked, anchor text confirmed, dofollow status verified, and site quality re-audited at time of placement.',
    detail: ['Live URL verification', 'Dofollow status confirmed', 'Anchor text accuracy check', 'Final site quality audit'],
  },
  {
    n: '06',
    title: 'Reporting & Strategy Iteration',
    desc: 'Monthly reports document every link built — URL, DR, traffic, anchor text, target page. Growth and Authority clients get a strategy call to review and plan next month.',
    detail: ['Full link delivery report', 'Live Google Sheets tracker', 'Monthly strategy review call', 'Ongoing anchor text refinement'],
  },
];

const QUALITY_SIGNALS = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'DR40+ Minimum Threshold',
    desc: 'Every link site is pre-screened against Ahrefs DR thresholds. Starter requires DR40+, Growth DR50+, Authority DR60+. No exceptions.',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Real Organic Traffic',
    desc: 'We only place links on sites with genuine organic search traffic — typically 1,000+ monthly organic visits minimum. Low-traffic sites provide no authority signal.',
  },
  {
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9',
    title: 'Niche Topical Relevance',
    desc: 'Links placed on topically relevant sites carry more authority signal than off-topic placements. We match link sites to your industry, topic, and target pages.',
  },
  {
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    title: 'Editorial Standards Check',
    desc: "We review each publication's editorial standards: original content, author bios, real social presence? No content farms accepted.",
  },
  {
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    title: 'Spam Score < 2%',
    desc: 'We use Moz Spam Score alongside Ahrefs metrics to filter out sites with manipulative link patterns, thin content, and algorithmic risk profiles.',
  },
  {
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    title: 'Dofollow Verified Placements',
    desc: 'All links are verified as dofollow before delivery. We report the follow status in every monthly report so you always know exactly what equity each link passes.',
  },
];

const INDUSTRIES = [
  { icon: '🛒', label: 'Ecommerce' },
  { icon: '⚖️', label: 'Legal' },
  { icon: '💊', label: 'Healthcare' },
  { icon: '💰', label: 'Finance' },
  { icon: '🏠', label: 'Real Estate' },
  { icon: '💻', label: 'SaaS / Tech' },
  { icon: '🎓', label: 'Education' },
  { icon: '🏗️', label: 'Home Services' },
  { icon: '✈️', label: 'Travel' },
  { icon: '📊', label: 'B2B Services' },
  { icon: '🍽️', label: 'Hospitality' },
  { icon: '🌿', label: 'Wellness' },
];

const RESULTS = [
  { metric: 'DR28→DR52', label: 'Domain authority growth in 8 months', detail: 'SaaS startup — Growth package', sub: '4 commercial keywords moved to page 1' },
  { metric: '340%', label: 'Organic traffic increase over 12 months', detail: 'Ecommerce — Authority package', sub: '8,200 → 36,000 monthly sessions' },
  { metric: 'Pos 24→8', label: 'Primary keyword ranking jump', detail: 'B2B agency — Growth package (6 months)', sub: '18 new DR55+ referring domains added' },
];

const WHYS = [
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    title: '100% Manual Outreach',
    desc: 'Every link is acquired through human-led outreach. No automated tools, no scraped lists, no mass email blasts — just genuine editor relationships.',
  },
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Full Transparency',
    desc: 'Live link tracker updated as each link goes live. Monthly reports include the URL, DR, traffic, anchor text, and target page for every single placement.',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: '15+ Years of Outreach',
    desc: 'Founded in 2008, our link building team has built over 50,000 backlinks across 1,000+ campaigns in a wide range of niches and markets.',
  },
  {
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    title: 'Strategy-First Approach',
    desc: "We don't just build links. We build the right links — to the right pages, with the right anchors — based on your ranking targets and backlink gap.",
  },
  {
    icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
    title: 'No Contracts on Monthly',
    desc: "Monthly plans require only 30 days' notice to cancel. No lock-in, no cancellation fees. Yearly plans offer a 17% discount with flexible mid-year adjustment.",
  },
  {
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
    title: 'Dedicated Support',
    desc: 'Growth and Authority clients get a named link building strategist and monthly strategy call. Starter clients get direct email support with 24-hour response.',
  },
];

const FAQS = [
  { q: 'What is link building and why does it matter for SEO?', a: "Link building is the process of acquiring hyperlinks from other websites that point back to yours. Google treats these backlinks as votes of confidence — a link from a credible, high-authority site signals to Google that your content is trustworthy and valuable. The number and quality of backlinks pointing to your domain is one of the strongest ranking factors in Google's algorithm. Without a strong backlink profile, it is very difficult to rank competitively for high-value keywords, regardless of how well your on-page content is optimised." },
  { q: 'What are link building packages?', a: "Link building packages are monthly subscription plans that give you a set number of high-authority backlinks acquired through manual outreach each month. Unlike one-off link purchases, packages provide a consistent, compounding backlink acquisition strategy. Each package specifies the number of links per month, minimum domain rating (DR) thresholds, link types included, and reporting. A monthly package is the right approach because Google's algorithm rewards consistent, natural-looking link growth over time — not sudden spikes." },
  { q: 'What is Domain Rating (DR) and why does it matter?', a: "Domain Rating (DR) is a metric developed by Ahrefs that measures the strength of a website's backlink profile on a scale from 0 to 100. A higher DR indicates a stronger, more authoritative domain. In our packages, we specify minimum DR thresholds (DR40+, DR50+, DR60+) to ensure the links we build come from genuinely authoritative websites rather than low-quality sites that could harm your profile. We use DR alongside other qualitative signals — niche relevance, organic traffic, editorial standards — to evaluate each prospective link placement site before outreach." },
  { q: 'What types of links do you build?', a: 'We build two primary types of links: Guest posts — original content written and published on third-party websites in your niche, with a contextual link back to your site. Niche edits — placements of your link within existing, already-indexed content on relevant authority sites. On the Authority package, we also pursue digital PR placements — coverage in online publications, news sites, and industry media. We do not build links from link farms, private blog networks (PBNs), spammy directories, or any other low-quality sources.' },
  { q: 'What is the difference between a guest post and a niche edit?', a: "A guest post involves writing and publishing a brand-new, original article on a third-party website, with your link placed naturally within the content. A niche edit (link insertion) places your link within an article that already exists and is already indexed on a third-party website. Niche edits can be faster to secure than guest posts and often carry strong authority because the article has already accumulated backlinks and traffic. We use both in combination for maximum effect on Growth and Authority plans." },
  { q: 'What is digital PR link building?', a: 'Digital PR link building involves earning links from high-authority news sites, industry publications, and online media through newsworthy content assets — original research, data studies, expert commentary, or product/service stories. These links typically come from DR70+ domains and are editorially given rather than purchased. Digital PR is the gold standard of link building but requires significant investment in content and outreach. We include digital PR as part of the Authority package and can run standalone digital PR campaigns for clients who need high-authority press links fast.' },
  { q: 'How long does it take to see results from link building?', a: 'Link building results take time to manifest because Google needs to crawl and index the new links, and then the domain authority gains need to translate to ranking improvements. Typically: new links start being indexed within 2 to 6 weeks of placement; domain authority improvements are visible within 2 to 4 months; ranking improvements for target keywords are typically observable within 3 to 6 months; significant organic traffic growth occurs within 6 to 9 months. Link building compounds over time — a consistent monthly programme delivers exponentially better results at 12 months than at 3 months.' },
  { q: 'How many links per month do I need?', a: "The right number of links per month depends on your current domain authority compared to your target competitors, the keyword competitiveness of your target market, and how aggressively you want to close the backlink gap. For markets where the top 3 competitors have DR50+ with 200–500 referring domains, we typically recommend the Growth package (12 links/month) as a minimum. For highly competitive markets (finance, legal, SaaS) with DR70+ competitors, Authority (25 links/month) is the right starting point. We perform a free backlink gap analysis before recommending a package." },
  { q: 'Can I see the links you build each month?', a: 'Yes. Every link we build is documented in your dedicated live link tracker (Google Sheets or dashboard). The monthly report includes: the URL of the page where your link appears; the anchor text used; the DR of the linking domain; the estimated organic traffic of the linking page; the date the link went live; and the target page on your site that received the link. You have full visibility into every link placed. The Growth and Authority packages also include a monthly call to review the links and align on strategy for the next month.' },
  { q: 'Is link building safe? Will it hurt my site?', a: "White-hat link building using manual outreach and editorial placements on genuine websites is safe and is exactly what Google recommends. The risks come from low-quality tactics: buying links from link farms, using PBNs, creating spammy directory submissions, or participating in link exchange schemes. These are tactics we never use. All links we build are from real websites with genuine organic traffic, editorial standards, and topical relevance to your niche. If you have previously received a manual penalty from Google for unnatural links, we include a disavow audit in Growth and above packages." },
  { q: 'What happens if a link goes down?', a: 'If a link we build goes down within 90 days of delivery — due to the publisher removing the article, changing the URL, or the site going offline — we will replace it at no additional cost. We track every live link on an ongoing basis and flag removals in your monthly report. For links that go down after 90 days due to editorial changes outside our control, we will work with you on a replacement at a preferential rate. Our 90-day replacement policy is industry-leading.' },
  { q: 'Can you build links to product or category pages?', a: "Yes. We build links directly to the pages that need authority — including product pages, category pages, service pages, and landing pages. Linking directly to commercial pages is harder because publishers are selective about linking to overtly commercial content, so it typically requires niche edit placements or digital PR rather than guest posts. We will advise during strategy on the right mix of target pages and link types for your site. Product and category page links are highest-priority for ecommerce clients because they directly improve rankings for transactional keywords." },
  { q: 'Do you offer white-label link building?', a: 'Yes. We offer white-label link building for SEO agencies and digital marketing companies. Under a white-label arrangement, all reports and communications are unbranded — your clients see only your agency branding. Pricing for white-label is the same as our standard packages. If you need custom volumes (e.g., 50+ links per month across multiple client accounts), we offer custom agency pricing. Contact us with your projected monthly volume to discuss agency rates. We currently have over 30 agency partners who resell our link building as their own service.' },
  { q: 'What anchor text strategy do you use?', a: 'Anchor text strategy is one of the most important elements of a safe, effective link building campaign. Over-optimised exact-match anchors is a common cause of Google penalties. We use a diversified anchor text strategy: roughly 30% exact-match or partial-match keyword anchors; 40% branded anchors (your company or domain name); 20% generic anchors (click here, learn more, visit); and 10% naked URL anchors. We build and refine an anchor text map at the start of your campaign and update it each month based on your existing profile.' },
  { q: 'Do you offer custom link building plans?', a: "If the Starter, Growth, or Authority packages do not fit your exact requirements — for example, you need 40 links per month, only DR60+ placements, only guest posts with no niche edits, or specific publication targets — we can build a fully custom plan. Custom plans are also available for specific campaigns: product launches, national expansion, competitive keyword pushes. Contact us with your requirements and we will provide a custom proposal within 48 hours. Custom plans are available on a monthly or project basis." },
  { q: 'Can you perform a backlink gap analysis before I commit?', a: "Yes, and we recommend it. A backlink gap analysis compares your referring domain count, average DR, and link velocity against your top 3–5 competitors for your target keywords. It tells us exactly how many links and what DR profile you need to be competitive. We offer a free backlink gap analysis as part of our pre-sales process — no commitment required. Share your domain and your top 3 competitors, and we'll return a gap analysis report within 48 hours showing the exact deficit and what it would take to close it." },
  { q: 'How do you measure ROI from link building?', a: 'Link building ROI is measured through ranking improvements and organic traffic growth rather than direct revenue attribution. We track: the DR growth of your domain over time; the referring domain count increase; keyword ranking changes for your target keywords; organic traffic growth from Google Search Console; and conversion data if you share access. At 3 months we review early DR and ranking signals; at 6 months we expect observable ranking movement; at 12 months we measure full organic traffic and conversion improvement. Growth and Authority plans include a quarterly ROI summary.' },
  { q: 'Do you build links for any industry or niche?', a: 'We build links across most industries, including B2B, ecommerce, SaaS, professional services, home services, healthcare, legal, finance, education, technology, and lifestyle. Some industries are harder to build links in due to limited publication options or editorial restrictions. We will advise honestly during scoping if your niche presents specific challenges and adjust the strategy accordingly. For highly competitive niches like finance or legal, DR thresholds are more important and we recommend Growth or Authority packages.' },
  { q: 'What contract length is required?', a: "Monthly plans require no long-term contract — just 30 days' notice to cancel. Yearly plans are paid upfront (saving 17%) but can be paused or adjusted mid-year in exceptional circumstances. There is no setup fee on any plan. We recommend a minimum 3-month commitment to see meaningful results, but we do not lock you into that contractually. Most clients continue for 6–12+ months because link building compounds — the authority gains in month 4 and beyond are significantly higher than in months 1–2." },
  { q: 'Can I combine link building with an SEO package?', a: 'Yes. Link building works best as part of a coordinated SEO strategy rather than in isolation. When link building is combined with on-page SEO, technical optimisation, and content creation, the authority gains translate to ranking improvements much more efficiently. Our ecommerce SEO and managed SEO packages include link building as a component — if you are already on one of those packages, you may not need a standalone link building package. If you have an existing in-house SEO team handling on-page work but need external link building expertise, our standalone packages are the right fit.' },
];

const STATS = [
  { label: 'Links Built', val: '50,000+' },
  { label: 'Avg Domain Rating', val: 'DR50+' },
  { label: 'Years Experience', val: '15+' },
  { label: 'Client Retention', val: '92%' },
];

const CHECK = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function LinkBuildingPackages() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

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
        { threshold: 0.12 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'Link Building Packages', item: 'https://www.1solutions.biz/link-building-packages/' },
        ],
      },
      {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: 'https://www.1solutions.biz/images/1solutions-logo.png',
        sameAs: ['https://www.linkedin.com/company/1solutions/', 'https://twitter.com/1solutionsbiz', 'https://www.facebook.com/1solutionsbiz'],
        address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127', bestRating: '5' },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://www.1solutions.biz/link-building-packages/',
        url: 'https://www.1solutions.biz/link-building-packages/',
        name: 'Link Building Packages | Monthly Backlink Plans & Pricing | 1Solutions',
        description: 'White-hat link building packages from $499/month. Manual outreach, DR40+ to DR60+ guest posts, niche edits, and digital PR for any industry.',
        dateModified: '2026-06-24',
        inLanguage: 'en-US',
      },
      {
        '@type': 'Service',
        name: 'Link Building Packages',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        serviceType: 'Link Building',
        url: 'https://www.1solutions.biz/link-building-packages/',
        description: 'White-hat link building through manual outreach. Guest posts, niche edits, and digital PR from DR40+ to DR60+ niche-relevant websites.',
        areaServed: 'Worldwide',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '127', bestRating: '5' },
        offers: PLANS.map(p => ({
          '@type': 'Offer',
          name: `${p.name} Link Building Package`,
          price: p.monthlyPrice,
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', price: p.monthlyPrice, priceCurrency: 'USD', unitText: 'month' },
        })),
      },
      {
        '@type': 'HowTo',
        name: 'How Our Link Building Process Works',
        description: 'Our 6-step manual link building methodology for acquiring high-authority backlinks.',
        step: METHODOLOGY.map(m => ({ '@type': 'HowToStep', name: m.title, text: m.desc })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Link Building Packages | Monthly Backlink Plans &amp; Pricing | 1Solutions</title>
        <meta name="description" content="White-hat link building packages from $499/month. Manual outreach, DR40+ to DR60+ guest posts, niche edits, and digital PR for any industry. Full link tracker on every plan." />
        <meta name="keywords" content="link building packages, link building pricing, link building plans, backlink packages, guest post packages, link building service pricing, monthly link building, white-hat link building, DR40 backlinks, niche edits" />
        <link rel="canonical" href="https://www.1solutions.biz/link-building-packages/" />
        <meta property="og:title" content="Link Building Packages &amp; Pricing | 1Solutions" />
        <meta property="og:description" content="White-hat link building packages from $499/month. Manual outreach, DR40–DR60+ guest posts, niche edits, and digital PR. Live link tracker on every plan." />
        <meta property="og:url" content="https://www.1solutions.biz/link-building-packages/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <style>{`
          /* ── BASE ── */
          .lbp-page { font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif; background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%); background-attachment:scroll; color:#0F1F40; line-height:1.6; overflow-x:hidden; position:relative; }
          .lbp-page *,.lbp-page *::before,.lbp-page *::after { box-sizing:border-box; }

          /* ── ORBS ── */
          .lbp-orb1 { position:fixed;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,0.30) 0%,rgba(139,92,246,0.12) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px); }
          .lbp-orb2 { position:fixed;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,0.25) 0%,rgba(245,158,11,0.12) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px); }
          .lbp-orb3 { position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,0.18) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px); }

          /* ── HERO ── */
          .lbp-hero { position:relative;overflow:hidden;padding:0 40px; }
          .lbp-hero::before { content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px); }
          .lbp-hero::after { content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px); }
          .lbp-hero-content { position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 0 40px; }
          .lbp-bc { display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:6px;font-size:12px;color:#6b7280;margin-bottom:24px;font-weight:500; }
          .lbp-bc a { color:#6b7280;text-decoration:none; } .lbp-bc a:hover { color:#D97706; } .lbp-bc-sep { color:#d1d5db; }
          .lbp-eyebrow { display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px; }
          .lbp-h1 { font-size:clamp(2rem,5vw,3.2rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .lbp-hero-sub { font-size:16px;color:#3A507A;line-height:1.65;max-width:620px;margin:0 auto 28px; }

          /* ── KEY TAKEAWAYS ── */
          .lbp-kt { background:rgba(255,255,255,0.50);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;padding:20px 28px;max-width:720px;margin:0 auto 32px;text-align:left;box-shadow:0 4px 20px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95); }
          .lbp-kt-t { font-size:11px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;color:#D97706;margin-bottom:12px; }
          .lbp-kt-list { list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px; }
          .lbp-kt-list li { display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#374151;line-height:1.5; }
          .lbp-kt-list li::before { content:'✓';color:#D97706;font-weight:700;flex-shrink:0;margin-top:1px; }

          /* ── HERO BUTTON ── */
          .lbp-btn-hero { display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1);margin-bottom:56px; }
          .lbp-btn-hero:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);box-shadow:0 12px 36px rgba(15,52,96,0.15),0 0 0 2px rgba(245,158,11,0.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460; }

          /* ── STATS BAR ── */
          .lbp-stats { position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .lbp-stat { padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,0.10); } .lbp-stat:last-child { border-right:none; }
          .lbp-stat-l { font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px; }
          .lbp-stat-v { font-size:26px;font-weight:900;color:#D97706;letter-spacing:-0.5px;line-height:1; }

          /* ── SHARED SECTION ── */
          .lbp-sec { padding:80px 40px;position:relative;z-index:1; }
          .lbp-sec-in { max-width:1280px;margin:0 auto; }
          .lbp-white-sec { background:#f8fafd;border-top:1px solid rgba(15,52,96,0.08);border-bottom:1px solid rgba(15,52,96,0.08); }
          .lbp-sec-ey { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:12px;display:block; }
          .lbp-sec-ttl { font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px; }
          .lbp-sec-desc { font-size:15px;color:#4A6080;line-height:1.7;max-width:640px;margin-bottom:40px; }

          /* ── SECTION REVEAL ── */
          .lbp-reveal { opacity:0;transform:translateY(44px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1); }
          .lbp-reveal.lbp-visible { opacity:1;transform:translateY(0); }

          /* ── GLASSMORPHISM CARD ── */
          .lbp-glass { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .lbp-glass:hover { border-color:rgba(217,119,6,0.45);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }

          /* ── DEFINITION ── */
          .lbp-def-box { padding:36px;max-width:1000px;margin:0 auto; }
          .lbp-def-intro { font-size:1.02rem;color:#374151;line-height:1.8;margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid rgba(15,52,96,0.08); }
          .lbp-def-intro strong { color:#0F3460; }
          .lbp-def-aspects { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
          .lbp-def-aspect { background:rgba(255,255,255,0.55);border:1px solid rgba(15,52,96,0.10);border-radius:14px;padding:20px;transition:border-color 0.2s; }
          .lbp-def-aspect:hover { border-color:rgba(217,119,6,0.35); }
          .lbp-def-aspect-t { font-weight:700;color:#0F3460;font-size:14px;margin-bottom:6px; }
          .lbp-def-aspect-d { font-size:13px;color:#4A6080;line-height:1.6; }

          /* ── WHY MATTERS ── */
          .lbp-why-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .lbp-why-card { padding:32px 28px;text-align:center;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .lbp-why-card:hover { transform:translateY(-6px); }
          .lbp-why-num { font-size:3.2rem;font-weight:900;background:linear-gradient(90deg,#0F3460,#D97706);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-1.5px;line-height:1;margin-bottom:12px; }
          .lbp-why-desc { font-size:14px;color:#374151;line-height:1.6;margin-bottom:8px; }
          .lbp-why-src { font-size:11px;color:#9ca3af;font-style:italic; }

          /* ── PRICING ── */
          .lbp-pricing-bg { background:rgba(255,255,255,0.40);backdrop-filter:blur(8px); }
          .lbp-tog-row { display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:48px; }
          .lbp-tog-lbl { font-size:15px;font-weight:600;color:#6b7280;transition:color 0.2s; }
          .lbp-tog-lbl.active { color:#0F1F40; }
          .lbp-tog-btn { width:50px;height:28px;background:#d1d5db;border-radius:100px;position:relative;cursor:pointer;border:none;padding:0;transition:background 0.25s;flex-shrink:0; }
          .lbp-tog-btn.on { background:#D97706; }
          .lbp-tog-knob { position:absolute;top:4px;left:4px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform 0.25s;box-shadow:0 1px 4px rgba(0,0,0,0.18); }
          .lbp-tog-btn.on .lbp-tog-knob { transform:translateX(22px); }
          .lbp-save-badge { display:inline-flex;align-items:center;background:rgba(217,119,6,0.12);color:#B45309;font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;margin-left:6px; }
          .lbp-cards { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start; }
          .lbp-card { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:32px 28px;position:relative;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.08),inset 0 1px 0 rgba(255,255,255,0.95); }
          .lbp-card:hover { transform:translateY(-4px);border-color:rgba(217,119,6,0.40);box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1); }
          .lbp-card-pop { background:linear-gradient(135deg,#0F3460 0%,#1a3a6e 50%,#0a2549 100%);border-color:transparent;transform:scale(1.04);box-shadow:0 20px 60px rgba(15,52,96,0.30); }
          .lbp-card-pop:hover { transform:scale(1.04) translateY(-4px); }
          .lbp-pop-tag { position:absolute;top:20px;right:20px;background:rgba(217,119,6,0.90);color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;letter-spacing:0.5px; }
          .lbp-plan-name { font-size:22px;font-weight:800;color:#0F1F40;margin-bottom:6px; }
          .lbp-card-pop .lbp-plan-name { color:#fff; }
          .lbp-plan-desc { font-size:13px;color:#6b7280;line-height:1.55;margin-bottom:24px; }
          .lbp-card-pop .lbp-plan-desc { color:rgba(255,255,255,0.70); }
          .lbp-price-row { display:flex;align-items:baseline;gap:4px;margin-bottom:4px; }
          .lbp-currency { font-size:1.4rem;font-weight:700;color:#D97706; }
          .lbp-amount { font-size:3rem;font-weight:900;letter-spacing:-2px;color:#0F1F40;line-height:1; }
          .lbp-card-pop .lbp-amount { color:#fff; }
          .lbp-card-pop .lbp-currency { color:rgba(255,255,255,0.80); }
          .lbp-per { font-size:13px;color:#9ca3af;font-weight:500;margin-left:2px; }
          .lbp-card-pop .lbp-per { color:rgba(255,255,255,0.60); }
          .lbp-billed { font-size:12px;color:#9ca3af;margin-bottom:4px; }
          .lbp-card-pop .lbp-billed { color:rgba(255,255,255,0.55); }
          .lbp-save-line { font-size:12px;font-weight:700;color:#16a34a;margin-bottom:20px;min-height:18px; }
          .lbp-card-pop .lbp-save-line { color:#86efac; }
          .lbp-cta-card { display:block;width:100%;text-align:center;padding:13px;border-radius:50px;font-weight:700;font-size:0.9rem;text-decoration:none;background:rgba(15,52,96,0.85);color:#fff;transition:all 0.22s;margin-bottom:24px;box-shadow:0 4px 16px rgba(15,52,96,0.20); }
          .lbp-cta-card:hover { background:rgba(15,52,96,1);transform:translateY(-1px);box-shadow:0 6px 24px rgba(15,52,96,0.30); }
          .lbp-card-pop .lbp-cta-card { background:rgba(255,255,255,0.18);backdrop-filter:blur(12px);border:1.5px solid rgba(255,255,255,0.35);color:#fff; }
          .lbp-card-pop .lbp-cta-card:hover { background:rgba(255,255,255,0.28);border-color:rgba(245,158,11,0.6); }
          .lbp-divider { height:1px;background:rgba(15,52,96,0.08);margin-bottom:20px; }
          .lbp-card-pop .lbp-divider { background:rgba(255,255,255,0.15); }
          .lbp-feat-list { list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px; }
          .lbp-feat-list li { display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#374151;line-height:1.4; }
          .lbp-card-pop .lbp-feat-list li { color:rgba(255,255,255,0.85); }
          .lbp-feat-list li svg { color:#D97706; }
          .lbp-card-pop .lbp-feat-list li svg { color:#fcd34d; }
          .lbp-trust { display:flex;justify-content:center;gap:28px;flex-wrap:wrap;margin-top:32px;padding-top:32px;border-top:1px solid rgba(15,52,96,0.08); }
          .lbp-trust span { font-size:13px;color:#4A6080;display:flex;align-items:center;gap:6px;font-weight:500; }
          .lbp-trust svg { color:#D97706; }

          /* ── COMPARISON TABLE ── */
          .lbp-tbl-wrap { overflow-x:auto;border-radius:16px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(15,52,96,0.08); }
          .lbp-tbl { width:100%;border-collapse:collapse;background:rgba(255,255,255,0.75);min-width:640px; }
          .lbp-tbl th { background:linear-gradient(135deg,#0F3460 0%,#1a3a6e 100%);color:#fff;font-size:13px;font-weight:700;padding:14px 20px;text-align:center; }
          .lbp-tbl th:first-child { text-align:left; }
          .lbp-tbl td { padding:13px 20px;font-size:13px;color:#374151;border-bottom:1px solid rgba(15,52,96,0.06);text-align:center; }
          .lbp-tbl td:first-child { text-align:left;font-weight:600;color:#0F1F40; }
          .lbp-tbl tr:last-child td { border-bottom:none; }
          .lbp-tbl tr:hover td { background:rgba(217,119,6,0.03); }
          .lbp-tbl-y { color:#D97706;font-weight:700; }
          .lbp-tbl-n { color:#d1d5db; }

          /* ── METHODOLOGY ── */
          .lbp-method-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:20px; }
          .lbp-method-card { padding:28px;display:flex;gap:20px;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .lbp-method-card:hover { transform:translateY(-4px);border-color:rgba(217,119,6,0.40) !important;box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1) !important; }
          .lbp-method-n { font-size:2rem;font-weight:900;color:rgba(15,52,96,0.15);line-height:1;flex-shrink:0;min-width:48px; }
          .lbp-method-t { font-size:1rem;font-weight:700;color:#0F3460;margin-bottom:8px; }
          .lbp-method-d { font-size:13px;color:#4A6080;line-height:1.65;margin-bottom:12px; }
          .lbp-method-ul { list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px; }
          .lbp-method-ul li { font-size:12px;color:#6b7280;display:flex;align-items:flex-start;gap:8px; }
          .lbp-method-ul li::before { content:'→';color:#D97706;flex-shrink:0; }

          /* ── QUALITY ── */
          .lbp-qual-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
          .lbp-qual-card { padding:26px;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .lbp-qual-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.45) !important;box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1) !important; }
          .lbp-qual-icon { width:44px;height:44px;display:flex;align-items:center;justify-content:center;margin-bottom:14px; }
          .lbp-qual-icon svg { width:26px;height:26px;color:#D97706;stroke:#D97706;fill:none; }
          .lbp-qual-t { font-size:14px;font-weight:700;color:#0F1F40;margin-bottom:6px; }
          .lbp-qual-d { font-size:13px;color:#4A6080;line-height:1.6; }

          /* ── INDUSTRIES ── */
          .lbp-ind-grid { display:grid;grid-template-columns:repeat(6,1fr);gap:16px; }
          .lbp-ind-card { padding:18px 12px;text-align:center;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s; }
          .lbp-ind-card:hover { transform:translateY(-5px);border-color:rgba(217,119,6,0.45) !important;box-shadow:0 12px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1) !important; }
          .lbp-ind-emoji { font-size:1.8rem;margin-bottom:8px;display:block; }
          .lbp-ind-lbl { font-size:12px;font-weight:600;color:#374151; }

          /* ── RESULTS ── */
          .lbp-results { background:linear-gradient(135deg,#071e3d 0%,#0F3460 40%,#0a2549 100%);padding:80px 40px;position:relative;overflow:hidden;z-index:1; }
          .lbp-res-orb { position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(217,119,6,0.18) 0%,transparent 65%);top:-150px;right:-100px;pointer-events:none;filter:blur(30px); }
          .lbp-res-in { max-width:1280px;margin:0 auto;position:relative;z-index:2; }
          .lbp-res-ey { font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:10px;display:block;text-align:center; }
          .lbp-res-ttl { font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;text-align:center;margin-bottom:12px;line-height:1.15;background:linear-gradient(90deg,#fff 30%,#fcd34d 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
          .lbp-res-sub { font-size:1rem;color:rgba(255,255,255,0.60);text-align:center;max-width:560px;margin:0 auto 52px; }
          .lbp-res-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
          .lbp-res-card { background:rgba(255,255,255,0.07);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:32px;text-align:center;transition:background 0.25s,border-color 0.25s; }
          .lbp-res-card:hover { background:rgba(255,255,255,0.11);border-color:rgba(217,119,6,0.45); }
          .lbp-res-metric { font-size:2.4rem;font-weight:900;color:#fcd34d;margin-bottom:8px;line-height:1; }
          .lbp-res-label { font-size:14px;color:rgba(255,255,255,0.80);font-weight:600;margin-bottom:6px; }
          .lbp-res-detail { font-size:12px;color:rgba(255,255,255,0.50);margin-bottom:4px; }
          .lbp-res-sub2 { font-size:11px;color:rgba(255,255,255,0.40);font-style:italic; }

          /* ── WHY CHOOSE ── */
          .lbp-why-ch-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:16px; }
          .lbp-why-ch-card { padding:28px 24px;text-align:left;transition:transform 0.25s,box-shadow 0.25s,border-color 0.25s; }
          .lbp-why-ch-card:hover { transform:translateY(-6px);border-color:rgba(217,119,6,0.40) !important;box-shadow:0 16px 48px rgba(15,52,96,0.14),inset 0 1px 0 rgba(255,255,255,1) !important; }
          .lbp-why-ch-icon { width:40px;height:40px;display:flex;align-items:center;justify-content:center;margin-bottom:12px; }
          .lbp-why-ch-icon svg { width:26px;height:26px;stroke:#D97706;fill:none; }
          .lbp-why-ch-t { font-size:15px;font-weight:700;color:#0F1F40;margin-bottom:6px; }
          .lbp-why-ch-d { font-size:13px;color:#4A6080;line-height:1.65; }

          /* ── FAQ ── */
          .lbp-faq-list { display:flex;flex-direction:column;gap:12px; }
          .lbp-fitem { background:linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.80) 60%,rgba(237,233,254,0.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s; }
          .lbp-fitem.open { border-color:rgba(217,119,6,0.40);box-shadow:0 8px 32px rgba(15,52,96,0.12),inset 0 1px 0 rgba(255,255,255,1); }
          .lbp-fitem.open::before { content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#D97706;border-radius:3px 0 0 3px; }
          .lbp-fq { width:100%;background:none;border:none;padding:20px 22px 20px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative; }
          .lbp-fq-badge { position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(15,52,96,0.08);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s; }
          .lbp-fitem.open .lbp-fq-badge { background:#D97706;color:#fff; }
          .lbp-fq-text { font-size:15px;font-weight:600;color:#0F1F40;line-height:1.45; }
          .lbp-fitem.open .lbp-fq-text { color:#D97706; }
          .lbp-fq-chevron { width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s; }
          .lbp-fitem.open .lbp-fq-chevron { transform:rotate(180deg);color:#D97706; }
          .lbp-fa { font-size:14px;color:#4b5563;line-height:1.8;padding:0 22px 20px 60px; }

          /* ── AUTHOR BAR ── */
          .lbp-author-bar { background:linear-gradient(135deg,rgba(254,243,199,0.50) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.45) 100%);border-top:1px solid rgba(217,119,6,0.15);border-bottom:1px solid rgba(217,119,6,0.15);padding:20px 40px;position:relative;z-index:1; }
          .lbp-author-inner { max-width:860px;margin:0 auto;display:flex;align-items:center;gap:16px; }
          .lbp-author-icon { width:44px;height:44px;background:linear-gradient(135deg,#0F3460,#1a3a6e);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
          .lbp-author-text { font-size:13px;color:#4A6080;line-height:1.55; }
          .lbp-author-text strong { color:#0F3460; }

          /* ── CTA SECTION ── */
          .lbp-cta { background:linear-gradient(135deg,rgba(254,243,199,0.70) 0%,rgba(255,255,255,0.60) 40%,rgba(219,234,254,0.65) 100%);backdrop-filter:blur(20px);padding:80px 40px;position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80); }
          .lbp-cta-in { max-width:760px;margin:0 auto;text-align:center;position:relative;z-index:1; }
          .lbp-cta-t { font-size:clamp(1.8rem,3.5vw,2.8rem);font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:16px;line-height:1.2; }
          .lbp-cta-s { font-size:1.05rem;color:#4A6080;line-height:1.75;margin:0 auto 28px;max-width:520px; }
          .lbp-pricing-note { background:rgba(255,255,255,0.60);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:16px 24px;margin-bottom:32px;font-size:14px;color:#4A6080;line-height:1.65;text-align:left;box-shadow:0 4px 16px rgba(15,52,96,0.06); }
          .lbp-pricing-note strong { color:#0F3460; }
          .lbp-btns { display:flex;gap:14px;justify-content:center;flex-wrap:wrap; }
          .lbp-btn-p { display:inline-flex;align-items:center;gap:8px;padding:14px 32px;background:rgba(15,52,96,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.20);color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 6px 24px rgba(15,52,96,0.25); }
          .lbp-btn-p:hover { background:rgba(15,52,96,1);border-color:rgba(245,158,11,0.6);transform:translateY(-2px);box-shadow:0 12px 36px rgba(15,52,96,0.30); }
          .lbp-btn-s { display:inline-flex;align-items:center;gap:8px;padding:14px 32px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);color:#0F3460;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(15,52,96,0.10),inset 0 1px 0 rgba(255,255,255,1); }
          .lbp-btn-s:hover { background:rgba(255,255,255,0.85);border-color:rgba(245,158,11,0.6);transform:translateY(-2px); }

          /* ── RESPONSIVE ── */
          @media(max-width:1024px) {
            .lbp-cards { grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto; }
            .lbp-card-pop { transform:none; } .lbp-card-pop:hover { transform:translateY(-4px); }
            .lbp-method-grid { grid-template-columns:1fr; }
            .lbp-qual-grid { grid-template-columns:repeat(2,1fr); }
            .lbp-ind-grid { grid-template-columns:repeat(4,1fr); }
            .lbp-why-ch-grid { grid-template-columns:repeat(2,1fr); }
            .lbp-res-grid { grid-template-columns:1fr;max-width:420px;margin-left:auto;margin-right:auto; }
            .lbp-why-grid { grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto; }
          }
          @media(max-width:768px) {
            .lbp-hero,.lbp-sec,.lbp-results,.lbp-cta { padding-left:24px;padding-right:24px; }
            .lbp-hero-content { padding:40px 0 28px; }
            .lbp-h1 { font-size:clamp(1.7rem,6vw,2.4rem); }
            .lbp-stats { grid-template-columns:repeat(2,1fr); }
            .lbp-stat:nth-child(2) { border-right:none; }
            .lbp-stat:nth-child(3) { border-top:1px solid rgba(15,52,96,0.10); }
            .lbp-stat:nth-child(4) { border-top:1px solid rgba(15,52,96,0.10);border-right:none; }
            .lbp-def-aspects { grid-template-columns:1fr; }
            .lbp-qual-grid { grid-template-columns:1fr; }
            .lbp-ind-grid { grid-template-columns:repeat(3,1fr); }
            .lbp-why-ch-grid { grid-template-columns:1fr; }
            .lbp-author-bar { padding:20px 24px; }
            .lbp-method-card { flex-direction:column;gap:8px; }
            .lbp-btns { flex-direction:column;align-items:center; }
            .lbp-trust { gap:16px; }
            .lbp-fq { padding:18px 18px 18px 52px; }
            .lbp-fq-text { font-size:14px; }
            .lbp-fa { padding:0 18px 18px 52px; }
            .lbp-fq-badge { left:14px; }
          }
        `}</style>
      </Head>

      <div className="lbp-page">
        {/* Orbs */}
        <div className="lbp-orb1"/><div className="lbp-orb2"/><div className="lbp-orb3"/>

        {/* ── HERO ── */}
        <section className="lbp-hero">
          <div className="lbp-hero-content">
            <nav className="lbp-bc" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span className="lbp-bc-sep">/</span>
              <Link href="/seo-services-company">SEO Services</Link><span className="lbp-bc-sep">/</span>
              <span style={{color:'#D97706'}}>Link Building Packages</span>
            </nav>
            <span className="lbp-eyebrow">Manual Outreach · DR40–DR60+ · White-Hat Only</span>
            <h1 className="lbp-h1">Link Building Packages — High-DA Backlinks Through Manual Outreach</h1>
            <p className="lbp-hero-sub">White-hat link building packages with transparent monthly pricing — guest posts, niche edits, and digital PR from DR40+ to DR60+ niche-relevant websites. Every link reported, every placement tracked.</p>
            <div className="lbp-kt">
              <div className="lbp-kt-t">Key Takeaways</div>
              <ul className="lbp-kt-list">
                <li>Link building packages provide a consistent monthly stream of high-authority backlinks through manual outreach — no automation, no PBNs</li>
                <li>Plans start at $499/month (5 links, DR40+) and scale to $1,499/month (25 links, DR60+) with digital PR included</li>
                <li>Every link is tracked in a live dashboard — URL, DR, organic traffic, anchor text, and target page reported monthly</li>
                <li>The #1 Google result has 3.8× more backlinks than positions 2–10 — consistent link building is the path to closing that gap</li>
              </ul>
            </div>
            <Link href="/contact-us" className="lbp-btn-hero">Talk to a Link Building Specialist →</Link>
          </div>
          <div className="lbp-stats">
            {STATS.map(s => (
              <div key={s.label} className="lbp-stat">
                <div className="lbp-stat-l">{s.label}</div>
                <div className="lbp-stat-v">{s.val}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DEFINITION ── */}
        <section className="lbp-sec lbp-white-sec">
          <div className="lbp-sec-in" style={{textAlign:'center'}}>
            <div className={`lbp-reveal${visibleSections.has('def')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['def']=el;}}>
              <span className="lbp-sec-ey">Understanding Link Building</span>
              <h2 className="lbp-sec-ttl">What Are Link Building Packages?</h2>
              <p className="lbp-sec-desc" style={{margin:'0 auto 32px'}}>A plain-English explanation of what you are buying and why it works.</p>
            </div>
            <div className="lbp-glass lbp-def-box">
              <p className="lbp-def-intro">
                <strong>Link building packages</strong> are monthly subscription plans that deliver a fixed number of high-authority backlinks to your website each month through manual outreach to real website editors. Each package specifies the volume of links, minimum domain rating (DR) threshold, and link types included — giving you a predictable, compounding backlink acquisition programme rather than one-off link purchases. Google&rsquo;s algorithm treats links from authoritative, niche-relevant sites as editorial endorsements — and pages with the strongest backlink profiles rank highest for competitive keywords.
              </p>
              <div className="lbp-def-aspects">
                {[
                  { t: 'Why monthly packages?', d: "Google's algorithm rewards consistent, natural-looking link growth. A steady monthly programme builds authority signals in a pattern that mirrors how real sites earn links organically — and compounds over 6–12 months." },
                  { t: 'What makes a link valuable?', d: 'Domain rating, organic traffic, topical relevance, dofollow status, and editorial placement context all determine link value. We vet every site against 15+ signals before outreach.' },
                  { t: 'Guest posts vs. niche edits?', d: 'Guest posts are new articles published on a third-party site with your link included. Niche edits insert your link into an existing, indexed article. Both are valuable; the best strategy uses both.' },
                ].map(a => (
                  <div key={a.t} className="lbp-def-aspect">
                    <div className="lbp-def-aspect-t">{a.t}</div>
                    <div className="lbp-def-aspect-d">{a.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY IT MATTERS ── */}
        <section className="lbp-sec">
          <div className="lbp-sec-in">
            <div className={`lbp-reveal${visibleSections.has('why')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['why']=el;}} style={{textAlign:'center',marginBottom:40}}>
              <span className="lbp-sec-ey">The Data</span>
              <h2 className="lbp-sec-ttl">Why Link Building Matters in 2025</h2>
              <p className="lbp-sec-desc" style={{margin:'0 auto'}}>Links remain the single strongest off-page ranking signal in Google&rsquo;s algorithm.</p>
            </div>
            <div className="lbp-why-grid">
              {WHY_MATTERS.map(w => (
                <div key={w.num} className="lbp-why-card lbp-glass">
                  <div className="lbp-why-num">{w.num}</div>
                  <div className="lbp-why-desc">{w.desc}</div>
                  <div className="lbp-why-src">Source: {w.source}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className="lbp-sec lbp-white-sec lbp-pricing-bg">
          <div className="lbp-sec-in">
            <div className={`lbp-reveal${visibleSections.has('pricing')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['pricing']=el;}} style={{textAlign:'center'}}>
              <span className="lbp-sec-ey">Pricing Plans</span>
              <h2 className="lbp-sec-ttl">Choose Your Link Building Package</h2>
              <p className="lbp-sec-desc" style={{margin:'0 auto 44px'}}>All packages use 100% manual outreach — no automated tools, no PBNs, no link farms. Full transparency with a live link tracker on every plan.</p>
            </div>
            <div className="lbp-tog-row">
              <span className={`lbp-tog-lbl${!isYearly?' active':''}`}>Monthly</span>
              <button className={`lbp-tog-btn${isYearly?' on':''}`} onClick={()=>setIsYearly(!isYearly)} aria-label="Toggle billing period">
                <span className="lbp-tog-knob"/>
              </button>
              <span className={`lbp-tog-lbl${isYearly?' active':''}`}>Yearly <span className="lbp-save-badge">Save 17%</span></span>
            </div>
            <div className="lbp-cards">
              {PLANS.map(plan => (
                <div key={plan.slug} className={`lbp-card${plan.popular?' lbp-card-pop':''}`}>
                  {plan.popular && <span className="lbp-pop-tag">Most Popular</span>}
                  <div className="lbp-plan-name">{plan.name}</div>
                  <p className="lbp-plan-desc">{plan.desc}</p>
                  <div className="lbp-price-row">
                    <span className="lbp-currency">$</span>
                    <span className="lbp-amount">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                    <span className="lbp-per">/mo</span>
                  </div>
                  <div className="lbp-billed">{isYearly ? 'Billed annually' : 'Billed monthly'}</div>
                  <div className="lbp-save-line">{isYearly ? `Save $${plan.yearlySave.toLocaleString()} per year` : ' '}</div>
                  <Link href="/contact-us" className="lbp-cta-card">Get Started →</Link>
                  <div className="lbp-divider"/>
                  <ul className="lbp-feat-list">
                    {plan.features.map(f => <li key={f}>{CHECK}<span>{f}</span></li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="lbp-trust">
              {['100% white-hat, manual outreach','Live link tracker on all plans','No setup fee','Cancel monthly with 30 days notice'].map(t => (
                <span key={t}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {' '}{t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="lbp-sec" style={{paddingTop:60,paddingBottom:60}}>
          <div className="lbp-sec-in">
            <div style={{textAlign:'center',marginBottom:32}}>
              <span className="lbp-sec-ey">Plan Comparison</span>
              <h2 className="lbp-sec-ttl">Package Comparison at a Glance</h2>
            </div>
            <div className="lbp-tbl-wrap">
              <table className="lbp-tbl">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Starter — $499/mo</th>
                    <th>Growth — $899/mo</th>
                    <th>Authority — $1,499/mo</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Links per month','5','12','25'],
                    ['Minimum domain rating','DR40+','DR50+','DR60+'],
                    ['Guest posts','✓','✓','✓'],
                    ['Niche edits','✗','✓','✓'],
                    ['Digital PR','✗','✗','✓'],
                    ['Anchor text strategy','Basic','Full','Custom map'],
                    ['Competitor gap analysis','✗','Monthly','Monthly'],
                    ['Disavow audit','✗','If needed','Ongoing'],
                    ['Monthly report','✓','✓','✓'],
                    ['Strategy call','✗','Monthly','Monthly'],
                    ['Dedicated strategist','✗','✗','✓'],
                    ['Live link tracker','✓','✓','✓'],
                  ].map(([feat,s,g,a]) => (
                    <tr key={feat}>
                      <td>{feat}</td>
                      <td className={s==='✗'?'lbp-tbl-n':'lbp-tbl-y'}>{s}</td>
                      <td className={g==='✗'?'lbp-tbl-n':'lbp-tbl-y'}>{g}</td>
                      <td className={a==='✗'?'lbp-tbl-n':'lbp-tbl-y'}>{a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── METHODOLOGY ── */}
        <section className="lbp-sec lbp-white-sec">
          <div className="lbp-sec-in">
            <div className={`lbp-reveal${visibleSections.has('method')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['method']=el;}} style={{textAlign:'center',marginBottom:44}}>
              <span className="lbp-sec-ey">Our Process</span>
              <h2 className="lbp-sec-ttl">How Our Link Building Process Works</h2>
              <p className="lbp-sec-desc" style={{margin:'0 auto'}}>Six rigorous steps from strategy to live link — every campaign, every month.</p>
            </div>
            <div className="lbp-method-grid">
              {METHODOLOGY.map(m => (
                <div key={m.n} className="lbp-method-card lbp-glass">
                  <div className="lbp-method-n">{m.n}</div>
                  <div>
                    <div className="lbp-method-t">{m.title}</div>
                    <p className="lbp-method-d">{m.desc}</p>
                    <ul className="lbp-method-ul">
                      {m.detail.map(d => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUALITY ── */}
        <section className="lbp-sec" style={{paddingTop:60,paddingBottom:60}}>
          <div className="lbp-sec-in">
            <div className={`lbp-reveal${visibleSections.has('qual')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['qual']=el;}} style={{textAlign:'center',marginBottom:40}}>
              <span className="lbp-sec-ey">Quality Standards</span>
              <h2 className="lbp-sec-ttl">What Makes Our Links Different</h2>
              <p className="lbp-sec-desc" style={{margin:'0 auto'}}>We vet every link site against 15+ quality signals before a single outreach email is sent.</p>
            </div>
            <div className="lbp-qual-grid">
              {QUALITY_SIGNALS.map(q => (
                <div key={q.title} className="lbp-qual-card lbp-glass">
                  <div className="lbp-qual-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={q.icon}/>
                    </svg>
                  </div>
                  <div className="lbp-qual-t">{q.title}</div>
                  <div className="lbp-qual-d">{q.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="lbp-sec lbp-white-sec" style={{paddingTop:60,paddingBottom:60}}>
          <div className="lbp-sec-in">
            <div style={{textAlign:'center',marginBottom:36}}>
              <span className="lbp-sec-ey">Industries We Serve</span>
              <h2 className="lbp-sec-ttl">Link Building Across Every Niche</h2>
            </div>
            <div className="lbp-ind-grid">
              {INDUSTRIES.map(ind => (
                <div key={ind.label} className="lbp-ind-card lbp-glass">
                  <span className="lbp-ind-emoji">{ind.icon}</span>
                  <div className="lbp-ind-lbl">{ind.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className="lbp-results">
          <div className="lbp-res-orb"/>
          <div className="lbp-res-in">
            <span className="lbp-res-ey">Client Results</span>
            <h2 className="lbp-res-ttl">Real Outcomes from Real Campaigns</h2>
            <p className="lbp-res-sub">Representative results from active clients. Individual results vary by niche, competition, and starting authority.</p>
            <div className="lbp-res-grid">
              {RESULTS.map(r => (
                <div key={r.metric} className="lbp-res-card">
                  <div className="lbp-res-metric">{r.metric}</div>
                  <div className="lbp-res-label">{r.label}</div>
                  <div className="lbp-res-detail">{r.detail}</div>
                  <div className="lbp-res-sub2">{r.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE ── */}
        <section className="lbp-sec lbp-white-sec">
          <div className="lbp-sec-in">
            <div className={`lbp-reveal${visibleSections.has('why-ch')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['why-ch']=el;}} style={{textAlign:'center',marginBottom:48}}>
              <span className="lbp-sec-ey">Why 1Solutions</span>
              <h2 className="lbp-sec-ttl">Why Choose Our Link Building Service</h2>
            </div>
            <div className="lbp-why-ch-grid">
              {WHYS.map(w => (
                <div key={w.title} className="lbp-why-ch-card lbp-glass">
                  <div className="lbp-why-ch-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={w.icon}/>
                    </svg>
                  </div>
                  <div className="lbp-why-ch-t">{w.title}</div>
                  <div className="lbp-why-ch-d">{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="lbp-sec" style={{paddingTop:80,paddingBottom:80}}>
          <div className="lbp-sec-in" style={{maxWidth:980,margin:'0 auto'}}>
            <div className={`lbp-reveal${visibleSections.has('faq')?' lbp-visible':''}`} ref={el=>{sectionRefs.current['faq']=el;}}>
              <span className="lbp-sec-ey">Common Questions</span>
              <h2 className="lbp-sec-ttl">Link Building Package FAQs</h2>
              <p className="lbp-sec-desc">Everything you need to know about our link building packages before getting started.</p>
            </div>
            <div className="lbp-faq-list">
              {FAQS.map((f, i) => (
                <div key={i} className={`lbp-fitem${openFaq===i?' open':''}`}>
                  <button className="lbp-fq" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                    <span className="lbp-fq-badge">{String(i+1).padStart(2,'0')}</span>
                    <span className="lbp-fq-text">{f.q}</span>
                    <svg className="lbp-fq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="lbp-fa" style={{display: openFaq===i?'block':'none'}}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AUTHOR BAR ── */}
        <div className="lbp-author-bar">
          <div className="lbp-author-inner">
            <div className="lbp-author-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <p className="lbp-author-text">Written and reviewed by the <strong>1Solutions Link Building Team</strong> — 15+ years of manual outreach experience, 50,000+ links built across 1,000+ campaigns. Updated June 2025 to reflect current Google quality guidelines and DR benchmark data.</p>
          </div>
        </div>

        {/* ── CTA ── */}
        <section className="lbp-cta">
          <div className="lbp-cta-in">
            <span className="lbp-sec-ey" style={{display:'block',textAlign:'center',marginBottom:16}}>Not sure how many links you need?</span>
            <h2 className="lbp-cta-t">Get a Free Backlink Gap Analysis</h2>
            <p className="lbp-cta-s">Share your domain and top competitors — we&rsquo;ll analyse the backlink gap and recommend exactly how many links per month you need to close it.</p>
            <div className="lbp-pricing-note">
              <strong>How much does link building cost?</strong> Our link building packages start from <strong>$499/month</strong> for 5 DR40+ guest post placements. The Growth plan at <strong>$899/month</strong> is our most popular option for businesses targeting competitive keywords. Custom plans are available for agencies and high-volume requirements — <Link href="/contact-us" style={{color:'#D97706',fontWeight:600}}>contact us to discuss</Link>.
            </div>
            <div className="lbp-btns">
              <Link href="/contact-us" className="lbp-btn-p">
                Request a Free Backlink Audit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/ecommerce-seo-packages" className="lbp-btn-s">Ecommerce SEO Packages</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
