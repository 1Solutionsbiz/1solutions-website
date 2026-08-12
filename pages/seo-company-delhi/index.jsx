import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { AuroraText } from '../../components/AuroraText';
import ServiceHero from '../../components/sections/ServiceHero';

const SERVICES = [
  { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', title: 'Keyword Research & Strategy', desc: 'In-depth analysis of how Delhi customers search for your services - high-intent buying queries, local neighbourhood terms, and competitive gaps your rivals are missing.' },
  { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Technical SEO', desc: 'Core Web Vitals optimisation, mobile speed, crawl error fixes, structured data, and site architecture - the technical foundation that lets every other SEO effort compound.' },
  { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'On-Page SEO', desc: 'Title tags, meta descriptions, heading structure, internal linking, and content optimisation for every key page - written for Delhi buyers, tuned for Google ranking signals.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Local SEO Delhi', desc: 'Google Business Profile optimisation, Google Maps 3-pack strategy, Delhi-specific citation building, and NAP consistency management to dominate local search results in Delhi NCR.' },
  { icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', title: 'Link Building', desc: 'Quality backlinks from Indian authority websites, Delhi business publications, industry directories, and digital PR - building the domain authority that sustains Page 1 positions.' },
  { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: 'Content Marketing', desc: 'SEO-driven blog articles, service page copy, and landing pages built around what Delhi customers are searching for - content that ranks and converts, not just fills word counts.' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', title: 'eCommerce SEO', desc: 'Product and category page optimisation for Delhi-based online stores on Shopify, WooCommerce, Magento, and custom platforms - more organic visibility, lower customer acquisition cost.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'SEO Reporting & Analytics', desc: 'Monthly reports showing keyword ranking movement, organic traffic growth, lead attribution, and ROI - clear numbers that show exactly what your Delhi SEO investment is generating.' },
];

const RESULTS = [
  { metric: '310%', label: 'Organic traffic growth', sub: 'Delhi real estate portal - 10 months', color: '#60A5FA' },
  { metric: 'Top 3', label: 'Google positions for 80+ keywords', sub: 'Delhi B2B manufacturer - 9 months', color: '#FE9700' },
  { metric: '4.8×', label: 'Increase in organic leads', sub: 'Delhi healthcare services - 7 months', color: '#059669' },
];

const TESTIMONIALS = [
  { name: 'Rohan Mehta', role: 'Director, South Delhi Real Estate Group', rating: 5, text: '1Solutions took our real estate portal from page 4 to the top 3 for every high-intent Delhi property keyword we cared about. Inbound enquiries from organic search have more than tripled in under a year.' },
  { name: 'Priya Kapoor', role: 'Founder, Gurugram Wellness Clinic', rating: 5, text: 'Our Google Business Profile and local rankings were invisible before 1Solutions. Now we show up in the Maps 3-pack for every neighbourhood we serve, and walk-in patients regularly mention finding us on Google.' },
  { name: 'Vikram Chawla', role: 'CEO, Okhla B2B Manufacturing', rating: 5, text: 'Honest timelines, clear monthly reporting, and rankings that have actually held through two Google core updates. 1Solutions is the first SEO agency in Delhi that treated our account like a long-term partnership, not a quick sale.' },
];

// Row 2 uses a separate set of reviews (not a reorder of row 1) so the two
// marquee rows never show identical testimonial content.
const TESTIMONIALS_ROW2 = [
  { name: 'Ananya Sethi', role: 'Marketing Head, Nehru Place IT Solutions', rating: 5, text: 'We compared four Delhi SEO agencies before signing with 1Solutions. Eight months in, we rank Page 1 for 40+ B2B keywords and our sales team says organic is now our best-qualified lead source.' },
  { name: 'Karan Bhatia', role: 'Owner, Karol Bagh Retail Chain', rating: 5, text: 'Local SEO from 1Solutions filled a gap none of our previous vendors even flagged. Store footfall from "near me" searches is up noticeably, and we finally show up ahead of bigger competitors in Karol Bagh.' },
  { name: 'Meera Iyer', role: 'Co-Founder, Dwarka EdTech Startup', rating: 5, text: 'As a startup with a tight budget, we needed an agency that prioritised the right keywords first. 1Solutions built us a phased roadmap and we saw our first Page 1 rankings within 10 weeks.' },
];

const PROCESS = [
  { n: '01', title: 'Free Delhi SEO Audit', desc: 'We audit your website for technical health, current keyword rankings, backlink profile, competitor positions, and the specific gaps holding your Delhi business back from Page 1.' },
  { n: '02', title: 'Keyword & Market Research', desc: 'Deep analysis of how Delhi customers search for your services - mapping every high-intent query, local modifier, and competitor keyword gap into a prioritised ranking roadmap.' },
  { n: '03', title: 'Technical Optimisation', desc: 'We fix the technical foundations first - Core Web Vitals, mobile performance, crawl errors, schema markup, and site structure - so every subsequent effort builds on solid ground.' },
  { n: '04', title: 'On-Page & Content', desc: 'Optimising every key page for target keywords and creating new content that captures Delhi buyer demand across the full search intent spectrum - informational to transactional.' },
  { n: '05', title: 'Authority & Link Building', desc: 'Building quality backlinks from relevant Indian authority sites, Delhi publications, and business directories - compounding domain authority that holds rankings through algorithm updates.' },
  { n: '06', title: 'Monthly Reporting & Scale', desc: 'Clear monthly reports with ranking movement, traffic growth, and lead data - plus a forward roadmap so you always know what is happening and what we are prioritising next.' },
];

const WHY = [
  { bg:'linear-gradient(165deg,#ede9fe 0%,#ddd6fe 100%)', icon:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Delhi Market Expertise', desc: "We understand Delhi's competitive digital landscape - from the startup density in Gurugram to the retail concentration in Connaught Place. Our strategy is built on real Delhi search data, not generic templates." },
  { bg:'linear-gradient(165deg,#dbeafe 0%,#bfdbfe 100%)', icon:'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: '15+ Years SEO Experience', desc: "Founded in 2009, 1Solutions has navigated every major Google update - Panda, Penguin, Hummingbird, BERT, and Helpful Content - delivering consistent rankings for clients across Delhi NCR." },
  { bg:'linear-gradient(165deg,#dcfce7 0%,#bbf7d0 100%)', icon:'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', title: 'Dedicated Account Manager', desc: 'Every Delhi client has one point of contact who understands your business, reports to you monthly, and is reachable when you need answers - no rotating account teams, no offshore handoffs.' },
  { bg:'linear-gradient(165deg,#fdf3dd 0%,#fbe8b8 100%)', icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'White-Hat SEO Only', desc: "No shortcuts. We build rankings through technical excellence, content quality, and genuine authority building - methods that last well beyond the next algorithm update and never put your domain at risk." },
  { bg:'linear-gradient(165deg,#fde8dc 0%,#fbd0b5 100%)', icon:'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: 'Transparent Reporting', desc: 'You see exactly what we did, what moved, and what it generated. Keyword rankings, organic sessions, and lead attribution in a clear monthly report - no smoke and mirrors.' },
  { bg:'linear-gradient(165deg,#fce7f3 0%,#fbcfe8 100%)', icon:'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z', title: 'No Lock-In Contracts', desc: "Month-to-month engagements because our results earn your continued business. You stay because your Delhi rankings keep climbing - not because a contract traps you." },
];

const INDUSTRIES = [
  { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', name: 'Real Estate & Property' },
  { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', name: 'Healthcare & Clinics' },
  { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', name: 'Education & Coaching' },
  { icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', name: 'Legal Services' },
  { icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', name: 'Retail & eCommerce' },
  { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', name: 'IT & SaaS Companies' },
  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', name: 'Hospitality & Hotels' },
  { icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', name: 'Manufacturing & B2B' },
  { icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1', name: 'Automotive & Dealerships' },
  { icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z', name: 'Restaurants & Food Delivery' },
  { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', name: 'Finance & Insurance' },
  { icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8', name: 'Travel & Tourism' },
  { icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', name: 'Fashion & Apparel' },
  { icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z', name: 'Home Services & Contractors' },
  { icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-6.857 2.286L12 21l-2.286-6.714L3 12l6.714-2.143L12 3z', name: 'Fitness & Wellness' },
  { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', name: 'Logistics & Supply Chain' },
];

const AREAS = [
  'Connaught Place', 'Karol Bagh', 'Saket', 'Hauz Khas', 'Lajpat Nagar',
  'Greater Kailash', 'Nehru Place', 'Pitampura', 'Rohini', 'Dwarka',
  'Janakpuri', 'Rajouri Garden', 'Laxmi Nagar', 'Preet Vihar', 'Mayur Vihar',
  'Malviya Nagar', 'Vasant Kunj', 'Patel Nagar', 'Shalimar Bagh', 'Patparganj',
  'Gurugram (DLF, Cyber City)', 'Noida (Sector 18, 62, 63)', 'Faridabad',
  'Ghaziabad', 'Greater Noida',
];

const SEO_PACKAGES = [
  {
    slug: 'starter',
    name: 'Starter',
    price: '15,000',
    desc: 'For small Delhi businesses taking their first serious step into SEO.',
    features: [
      '10 target keywords tracked',
      'On-page SEO for up to 5 pages',
      'Monthly technical SEO audit',
      'Google Business Profile optimisation',
      '5 quality backlinks per month',
      'Monthly performance report',
    ],
  },
  {
    slug: 'growth',
    name: 'Growth',
    price: '25,000',
    popular: true,
    desc: 'For growing Delhi businesses ready to compete for Page 1.',
    features: [
      '25 target keywords tracked',
      'On-page SEO for up to 15 pages',
      'Technical SEO fixes included',
      'Local SEO for up to 3 locations',
      '10 quality backlinks per month',
      '2 SEO blog articles per month',
      'Monthly report + strategy call',
    ],
  },
  {
    slug: 'authority',
    name: 'Authority',
    price: '45,000',
    desc: 'For businesses competing in crowded Delhi NCR markets.',
    features: [
      '50 target keywords tracked',
      'Full-site on-page optimisation',
      'Advanced technical SEO',
      'Local SEO for up to 5 locations',
      '20 quality backlinks per month',
      '4 SEO blog articles per month',
      'Dedicated account manager',
      'Monthly report + strategy call',
      'Competitor gap analysis',
    ],
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    price: '75,000',
    desc: 'For large businesses and multi-location, aggressive growth targets.',
    features: [
      '100+ target keywords tracked',
      'Unlimited on-page optimisation',
      'Priority technical SEO',
      'Local SEO for unlimited locations',
      '35+ quality backlinks per month',
      '8 SEO blog articles per month',
      'Dedicated senior strategist',
      'Weekly check-ins',
      'Competitor gap analysis + market research',
    ],
  },
];

const PACKAGE_COMPARISON = [
  ['Target keywords tracked', '10', '25', '50', '100+'],
  ['Pages optimised (on-page SEO)', '5', '15', 'Full site', 'Unlimited'],
  ['Technical SEO audit', 'Monthly', 'Monthly', 'Advanced', 'Priority'],
  ['Google Business Profile optimisation', '✓', '✓', '✓', '✓'],
  ['Local SEO locations covered', '1', 'Up to 3', 'Up to 5', 'Unlimited'],
  ['Backlinks per month', '5', '10', '20', '35+'],
  ['SEO blog articles per month', '✗', '2', '4', '8'],
  ['Competitor gap analysis', '✗', '✗', '✓', '✓ + market research'],
  ['Dedicated account manager', '✗', '✗', '✓', 'Senior strategist'],
  ['Strategy call', '✗', 'Monthly', 'Monthly', 'Weekly check-ins'],
  ['Performance reporting', 'Monthly', 'Monthly', 'Monthly', 'Monthly'],
];

const FAQS = [
  { q: "How much does SEO cost in Delhi?", a: "Our Delhi SEO packages start at INR 15,000 per month for small businesses and local SEO. Comprehensive packages for competitive industries range from INR 30,000 to INR 1,00,000 per month depending on industry competition, keyword volume, and growth targets. We provide a tailored quote after your free SEO audit - no guesswork." },
  { q: "How long does it take to rank on Google in Delhi?", a: "Low-competition local keywords typically show ranking movement within 2 to 3 months. Mid-competition terms take 3 to 5 months. High-competition Delhi categories like real estate, legal, and healthcare usually require 6 to 9 months of consistent work. We give honest timelines in your free audit based on real competitor data - not optimistic promises to win the sale." },
  { q: "Is 1Solutions based in Delhi?", a: "Yes. 1Solutions has a team dedicated to the Delhi NCR market with SEO specialists who understand Delhi's competitive digital environment. We work with clients across Central Delhi, South Delhi, Gurugram, Noida, Faridabad, and Ghaziabad - both in person and fully remotely." },
  { q: "What industries do you serve in Delhi?", a: "We work across Delhi's major sectors: real estate, healthcare, education and coaching institutes, legal services, retail and eCommerce, IT companies, hospitality, and B2B manufacturing. Our keyword and content strategies are always built from actual Delhi search volume data for your specific industry - not repurposed from other markets." },
  { q: "Do you provide local SEO for Delhi businesses?", a: "Yes. Local SEO for Delhi businesses is a core service - Google Business Profile optimisation, Delhi-specific directory citations, NAP consistency audits, and Google Maps 3-pack ranking strategy. If you serve customers in specific Delhi areas or have a physical location, local SEO is the highest-ROI channel for driving calls and footfall." },
  { q: "Can you help a Delhi startup with limited SEO budget?", a: "Absolutely. We work with Delhi startups at multiple stages - pre-revenue companies building organic foundations early and growth-stage startups scaling their inbound channel. For limited budgets, we focus on keyword gap opportunities and content strategies that generate organic traction within 3 to 4 months without a large initial investment." },
  { q: "How do you measure and report SEO results?", a: "We track keyword ranking movement for all target terms, organic sessions from Google Analytics, organic goal completions (leads, calls, form fills), and revenue attributed to organic search where measurable. Monthly reports are delivered in the first week of each month with a clear summary of changes, wins, and the next quarter roadmap." },
];

export default function SeoCompanyDelhi() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '', industry: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const LD = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
          { '@type': 'ListItem', position: 2, name: 'SEO Services', item: 'https://www.1solutions.biz/seo-services-company/' },
          { '@type': 'ListItem', position: 3, name: 'SEO Company in Delhi', item: 'https://www.1solutions.biz/seo-company-delhi/' },
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.1solutions.biz/#organization',
        name: '1Solutions - SEO Company in Delhi',
        url: 'https://www.1solutions.biz',
        telephone: '+919654327900',
        email: 'info@1solutions.biz',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'New Delhi',
          addressRegion: 'Delhi',
          addressCountry: 'IN',
        },
        areaServed: [
          { '@type': 'City', name: 'New Delhi' },
          { '@type': 'City', name: 'Gurugram' },
          { '@type': 'City', name: 'Noida' },
          { '@type': 'City', name: 'Faridabad' },
          { '@type': 'City', name: 'Ghaziabad' },
        ],
        description: 'Top SEO company in Delhi offering keyword research, technical SEO, local SEO, link building, and content strategy for Delhi NCR businesses.',
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '142', bestRating: '5' },
        priceRange: '₹₹',
        openingHours: 'Mo-Fr 09:00-18:00',
      },
      {
        '@type': 'ProfessionalService',
        name: 'SEO Services in Delhi',
        provider: { '@type': 'Organization', name: '1Solutions', url: 'https://www.1solutions.biz' },
        description: 'Comprehensive SEO services for Delhi businesses - technical SEO, on-page optimisation, local SEO, link building, and content strategy to achieve Page 1 Google rankings.',
        areaServed: { '@type': 'City', name: 'New Delhi' },
        serviceType: 'Search Engine Optimisation',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <Head>
        <title>SEO Company in Delhi | Best SEO Agency Delhi NCR | 1Solutions</title>
        <meta name="description" content="Looking for the best SEO company in Delhi? 1Solutions delivers Page 1 rankings for Delhi businesses - technical SEO, local SEO, link building, and content" />
        <meta name="keywords" content="SEO company in Delhi, SEO agency Delhi, SEO services Delhi, best SEO company Delhi, SEO company Delhi NCR, search engine optimization Delhi" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.1solutions.biz/seo-company-delhi/" />
        <meta property="og:title" content="SEO Company in Delhi | Best SEO Agency Delhi NCR | 1Solutions" />
        <meta property="og:description" content="Top SEO company in Delhi with 15+ years experience. We help Delhi businesses rank on Page 1 of Google through ethical, data-driven SEO strategies." />
        <meta key="og-image" property="og:image" content="https://www.1solutions.biz/images/og-seo-company-delhi.jpg" />
        <meta key="og-image-w" property="og:image:width" content="1200" />
        <meta key="og-image-h" property="og:image:height" content="630" />
        <meta key="og-image-type" property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="1Solutions SEO Company in Delhi" />
        <meta property="og:url" content="https://www.1solutions.biz/seo-company-delhi/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.1solutions.biz/images/og-seo-company-delhi.jpg" />
        <meta name="twitter:image:alt" content="1Solutions SEO Company in Delhi" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
        <style>{`
          *{box-sizing:border-box;}
          body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;}
          .dsel-bc a:hover{color:#0c2461;}.dsel-bc-cur{color:#0c2461;font-weight:500;}
          .dsel-sec{padding:80px 40px;}
          .dsel-bg{background:#f8fafd;}
          .dsel-sec-inner{max-width:1200px;margin:0 auto;}
          .dsel-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#1d56d0;margin-bottom:12px;}
          .dsel-h2{font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;line-height:1.2;letter-spacing:-0.5px;color:#0A1628;margin:0 0 16px;}
          .dsel-h2 span{background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .dsel-lead{font-size:1rem;color:#4b5563;line-height:1.75;max-width:620px;margin:0 0 48px;}
          .dsel-grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
          .dsel-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .dsel-grid2{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .dsel-card{background:linear-gradient(135deg,rgba(224,231,255,0.45) 0%,rgba(255,255,255,0.90) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px 24px;box-shadow:0 4px 24px rgba(12,36,97,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;}
          .dsel-card:hover{transform:translateY(-6px);border-color:rgba(29,86,208,0.25);box-shadow:0 16px 48px rgba(12,36,97,0.12);}
          .dsel-icon{width:48px;height:48px;border-radius:14px;background:rgba(12,36,97,0.07);display:flex;align-items:center;justify-content:center;margin-bottom:18px;}
          .dsel-icon svg{width:22px;height:22px;color:#0c2461;}
          .dsel-card-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;line-height:1.3;}
          .dsel-card-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}

          /* Packages */
          .dsel-pkg-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;align-items:start;}
          .dsel-pkg-card{background:linear-gradient(135deg,rgba(224,231,255,0.45) 0%,rgba(255,255,255,0.90) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:28px 24px;position:relative;transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;box-shadow:0 4px 24px rgba(12,36,97,0.07),inset 0 1px 0 rgba(255,255,255,0.95);}
          .dsel-pkg-card:hover{transform:translateY(-6px);border-color:rgba(29,86,208,0.25);box-shadow:0 16px 48px rgba(12,36,97,0.12);}
          .dsel-pkg-pop{background:linear-gradient(135deg,rgba(255,251,235,0.92) 0%,rgba(255,255,255,0.98) 50%,rgba(255,249,219,0.85) 100%);border-color:rgba(217,119,6,0.55);box-shadow:0 20px 60px rgba(217,119,6,0.16),0 0 0 2px rgba(217,119,6,0.14);}
          .dsel-pkg-pop:hover{transform:translateY(-6px) scale(1.02);box-shadow:0 28px 72px rgba(217,119,6,0.22),0 0 0 2px rgba(217,119,6,0.20);}
          .dsel-pkg-tag{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#D97706,#F59E0B);color:#fff;font-size:10px;font-weight:700;padding:3px 12px;border-radius:100px;letter-spacing:.5px;white-space:nowrap;box-shadow:0 4px 12px rgba(217,119,6,0.30);}
          .dsel-pkg-name{font-size:20px;font-weight:800;color:#0A1628;margin-bottom:6px;}
          .dsel-pkg-desc{font-size:12.5px;color:#6b7280;line-height:1.55;margin-bottom:20px;min-height:38px;}
          .dsel-pkg-price-row{display:flex;align-items:baseline;gap:4px;margin-bottom:18px;}
          .dsel-pkg-currency{font-size:1.1rem;font-weight:700;color:#1d56d0;}
          .dsel-pkg-amount{font-size:2.2rem;font-weight:900;letter-spacing:-1px;color:#0A1628;line-height:1;}
          .dsel-pkg-per{font-size:12px;color:#9ca3af;font-weight:500;margin-left:2px;}
          .dsel-pkg-cta{display:block;width:100%;text-align:center;padding:12px;border-radius:50px;font-weight:700;font-size:0.875rem;text-decoration:none;background:#0c2461;color:#fff;transition:all 0.22s;box-shadow:0 4px 16px rgba(12,36,97,0.20);box-sizing:border-box;}
          .dsel-pkg-cta:hover{opacity:0.9;transform:translateY(-1px);}
          .dsel-pkg-pop .dsel-pkg-cta{background:linear-gradient(135deg,#D97706,#F59E0B);box-shadow:0 6px 20px rgba(217,119,6,0.35);}
          .dsel-pkg-divider{height:1px;background:rgba(12,36,97,0.08);margin:20px 0 18px;}
          .dsel-pkg-feat-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:9px;}
          .dsel-pkg-feat-list li{display:flex;align-items:flex-start;gap:9px;font-size:12.5px;color:#374151;line-height:1.4;}
          .dsel-pkg-feat-list li svg{color:#1d56d0;flex-shrink:0;margin-top:2px;}
          .dsel-pkg-pop .dsel-pkg-feat-list li svg{color:#D97706;}

          /* Package comparison table */
          .dsel-tbl-wrap{overflow-x:auto;border-radius:16px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(12,36,97,0.08);}
          .dsel-tbl{width:100%;border-collapse:collapse;background:rgba(255,255,255,0.85);min-width:700px;}
          .dsel-tbl th{background:linear-gradient(135deg,#0c2461 0%,#1a3a6e 100%);color:#fff;font-size:12px;font-weight:700;padding:13px 16px;text-align:center;line-height:1.5;}
          .dsel-tbl th:first-child{text-align:left;}
          .dsel-tbl td{padding:12px 16px;font-size:12.5px;color:#374151;border-bottom:1px solid rgba(12,36,97,0.06);text-align:center;}
          .dsel-tbl td:first-child{text-align:left;font-weight:600;color:#0A1628;}
          .dsel-tbl-y{color:#1d56d0;font-weight:700;}
          .dsel-tbl-n{color:#d1d5db;}
          .dsel-def-box{background:linear-gradient(135deg,rgba(224,231,255,0.45) 0%,rgba(255,255,255,0.90) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:40px;box-shadow:0 4px 24px rgba(12,36,97,0.07),inset 0 1px 0 rgba(255,255,255,0.95);}
          .dsel-def-intro{font-size:1.02rem;color:#374151;line-height:1.8;margin:0 0 28px;padding-bottom:28px;border-bottom:1px solid rgba(12,36,97,0.08);}
          .dsel-def-intro strong{color:#0c2461;}
          .dsel-def-aspects{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
          .dsel-def-aspect{background:rgba(255,255,255,0.6);border:1px solid rgba(12,36,97,0.10);border-radius:14px;padding:20px;transition:border-color 0.2s;}
          .dsel-def-aspect:hover{border-color:rgba(254,151,0,0.35);}
          .dsel-def-t{font-weight:700;color:#0c2461;font-size:14px;margin-bottom:6px;}
          .dsel-def-d{font-size:13px;color:#4b5563;line-height:1.6;}
          .dsel-results{background:linear-gradient(135deg,#060d2e 0%,#0c2461 100%);padding:64px 40px;}
          .dsel-results-inner{max-width:1200px;margin:0 auto;}
          .dsel-res-tag{display:block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(147,197,253,0.80);margin-bottom:12px;text-align:center;}
          .dsel-res-h{font-size:clamp(1.8rem,3vw,2.6rem);font-weight:900;color:#fff;text-align:center;margin:0 0 48px;line-height:1.2;}
          .dsel-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
          .dsel-res-card{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:36px 28px;text-align:center;}
          .dsel-res-metric{font-size:3.5rem;font-weight:900;line-height:1;margin-bottom:10px;letter-spacing:-2px;}
          .dsel-res-label{font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;}
          .dsel-res-sub{font-size:12.5px;color:rgba(255,255,255,0.50);}
          .dsel-testi-section{background:#fff;border-top:1px solid rgba(12,36,97,0.06);padding:90px 0;overflow:hidden;}
          .dsel-testi-inner{max-width:1200px;margin:0 auto;padding:0 40px;}
          .dsel-testi-marquee-outer{position:relative;margin-top:44px;}
          .dsel-testi-marquee-wrap{overflow:hidden;margin-bottom:20px;}
          .dsel-testi-marquee-wrap:last-child{margin-bottom:0;}
          .dsel-testi-track{display:flex;gap:20px;width:max-content;animation:dselTestiScroll 32s linear infinite;}
          .dsel-testi-track--rev{animation-name:dselTestiScrollRev;}
          .dsel-testi-marquee-wrap:hover .dsel-testi-track{animation-play-state:paused;}
          @keyframes dselTestiScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
          @keyframes dselTestiScrollRev{from{transform:translateX(-50%);}to{transform:translateX(0);}}
          @media(prefers-reduced-motion:reduce){.dsel-testi-track{animation:none !important;}}
          .dsel-testi-fade{position:absolute;top:0;bottom:0;width:120px;z-index:1;pointer-events:none;}
          .dsel-testi-fade--l{left:0;background:linear-gradient(to right,#fff,transparent);}
          .dsel-testi-fade--r{right:0;background:linear-gradient(to left,#fff,transparent);}
          .dsel-testi-card{width:400px;flex-shrink:0;background:linear-gradient(135deg,rgba(224,231,255,0.45) 0%,rgba(255,255,255,0.90) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:28px;box-shadow:0 4px 24px rgba(12,36,97,0.07);user-select:none;}
          .dsel-testi-stars{color:#D97706;font-size:15px;margin-bottom:12px;letter-spacing:1px;}
          .dsel-testi-text{font-size:14px;color:#1e293b;line-height:1.75;margin:0 0 18px;font-style:italic;}
          .dsel-testi-name{font-size:13px;font-weight:700;color:#0c2461;}
          .dsel-testi-role{font-size:12px;color:#6B7280;margin-top:2px;}
          @media(max-width:600px){.dsel-testi-fade{width:48px;}}
          .dsel-why-card{border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(12,36,97,0.07);}
          .dsel-why-head{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
          .dsel-why-icon{width:22px;height:22px;color:#0c2461;flex-shrink:0;}
          .dsel-why-h{font-size:15px;font-weight:700;color:#0A1628;margin:0;}
          .dsel-why-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .dsel-proc-num{font-size:3.5rem;font-weight:900;color:rgba(12,36,97,0.07);line-height:1;margin-bottom:8px;letter-spacing:-2px;}
          .dsel-proc-line{width:40px;height:3px;background:linear-gradient(90deg,#0c2461,rgba(29,86,208,0.30));border-radius:2px;margin-bottom:16px;}
          .dsel-proc-h{font-size:1rem;font-weight:700;color:#0A1628;margin:0 0 10px;}
          .dsel-proc-p{font-size:13.5px;color:#4b5563;line-height:1.7;margin:0;}
          .dsel-ind-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
          .dsel-ind-card{background:linear-gradient(135deg,rgba(224,231,255,0.45) 0%,rgba(255,255,255,0.90) 60%,rgba(219,234,254,0.35) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:20px 16px;display:flex;align-items:center;gap:12px;box-shadow:0 4px 24px rgba(12,36,97,0.07),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;}
          .dsel-ind-card:hover{transform:translateY(-4px);border-color:rgba(29,86,208,0.25);box-shadow:0 12px 36px rgba(12,36,97,0.12);}
          .dsel-ind-icon{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,rgba(254,151,0,0.16),rgba(254,151,0,0.06));display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .dsel-ind-icon svg{width:18px;height:18px;color:#FE9700;}
          .dsel-ind-name{font-size:13.5px;font-weight:600;color:#0A1628;line-height:1.3;}
          .dsel-areas-wrap{display:flex;flex-wrap:wrap;gap:10px;}
          .dsel-area-tag{border-radius:50px;padding:6px 16px;font-size:13px;font-weight:600;transition:transform 0.18s,box-shadow 0.18s;}
          .dsel-area-tag:hover{transform:translateY(-2px);}
          .dsel-area-tag--0{background:rgba(79,70,229,0.08);border:1px solid rgba(79,70,229,0.24);color:#4338CA;}
          .dsel-area-tag--1{background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.24);color:#6D28D9;}
          .dsel-area-tag--2{background:rgba(13,148,136,0.08);border:1px solid rgba(13,148,136,0.24);color:#0F766E;}
          .dsel-area-tag--3{background:rgba(2,132,199,0.08);border:1px solid rgba(2,132,199,0.24);color:#0369A1;}
          .dsel-area-tag--4{background:rgba(219,39,119,0.08);border:1px solid rgba(219,39,119,0.24);color:#BE185D;}
          .dsel-area-tag--5{background:rgba(217,119,6,0.08);border:1px solid rgba(217,119,6,0.24);color:#B45309;}
          .dsel-faq-list{display:flex;flex-direction:column;gap:10px;}
          .dsel-faq-item{background:linear-gradient(135deg,rgba(224,231,255,0.40) 0%,rgba(255,255,255,0.88) 60%,rgba(219,234,254,0.30) 100%);border:1px solid rgba(255,255,255,0.85);border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(12,36,97,0.06);position:relative;transition:border-color 0.2s;}
          .dsel-faq-item.open{border-color:rgba(29,86,208,0.28);}
          .dsel-faq-item.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#0c2461;border-radius:3px 0 0 3px;}
          .dsel-faq-btn{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:20px 24px 20px 28px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:inherit;}
          .dsel-faq-qt{font-size:15px;font-weight:600;color:#0A1628;line-height:1.4;}
          .dsel-faq-item.open .dsel-faq-qt{color:#0c2461;}
          .dsel-faq-icon{width:28px;height:28px;border-radius:50%;background:rgba(12,36,97,0.07);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s,transform 0.2s;}
          .dsel-faq-item.open .dsel-faq-icon{background:rgba(12,36,97,0.12);transform:rotate(45deg);}
          .dsel-faq-icon svg{width:14px;height:14px;color:#0c2461;}
          .dsel-faq-a{padding:0 24px 20px 28px;font-size:14px;color:#4b5563;line-height:1.8;}
          .dsel-contact-sec{padding:80px 40px;background:linear-gradient(135deg,rgba(224,231,255,0.55) 0%,rgba(255,255,255,0.70) 50%,rgba(219,234,254,0.50) 100%);}
          .dsel-contact-inner{max-width:1200px;margin:0 auto;}
          .dsel-contact-grid{display:grid;grid-template-columns:1fr 1.25fr;gap:60px;align-items:start;}
          .dsel-contact-info-h{font-size:clamp(1.6rem,2.8vw,2.4rem);font-weight:900;color:#0A1628;margin:0 0 16px;line-height:1.25;}
          .dsel-contact-info-h span{background:linear-gradient(135deg,#4f46e5,#7c3aed,#a855f7,#ec4899,#3b82f6,#06b6d4,#4f46e5);background-size:300% 300%;animation:aurora-text 6s ease infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .dsel-contact-info-p{font-size:1rem;color:#4b5563;line-height:1.75;margin:0 0 28px;}
          .dsel-contact-item{display:flex;align-items:flex-start;gap:14px;margin-bottom:18px;}
          .dsel-contact-item-icon{width:40px;height:40px;border-radius:12px;background:rgba(12,36,97,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .dsel-contact-item-icon svg{width:18px;height:18px;color:#0c2461;}
          .dsel-contact-item-text strong{display:block;font-size:13px;font-weight:700;color:#0A1628;margin-bottom:2px;}
          .dsel-contact-item-text a,.dsel-contact-item-text span{font-size:13.5px;color:#4b5563;text-decoration:none;}
          .dsel-trust-list{display:flex;flex-direction:column;gap:10px;margin-top:28px;}
          .dsel-trust-item{display:flex;align-items:center;gap:10px;font-size:13.5px;color:#4b5563;}
          .dsel-trust-item svg{flex-shrink:0;color:#059669;}
          .dsel-form-wrap{background:#fff;border-radius:24px;padding:40px;box-shadow:0 4px 40px rgba(0,0,0,0.09);}
          .dsel-field{display:flex;flex-direction:column;gap:6px;margin-bottom:16px;}
          .dsel-field label{font-size:13px;font-weight:600;color:#374151;}
          .dsel-field input,.dsel-field select,.dsel-field textarea{padding:11px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;font-family:inherit;color:#111827;outline:none;transition:border-color 0.2s;background:#fff;}
          .dsel-field input:focus,.dsel-field select:focus,.dsel-field textarea:focus{border-color:#0c2461;}
          .dsel-field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
          .dsel-sent{text-align:center;padding:48px 24px;}
          .dsel-sent-icon{width:64px;height:64px;border-radius:50%;background:#0c2461;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
          .dsel-sent-icon svg{width:28px;height:28px;color:#fff;}
          .dsel-sent h3{font-size:1.5rem;font-weight:800;color:#0A1628;margin:0 0 10px;}
          .dsel-sent p{color:#4b5563;font-size:1rem;line-height:1.7;margin:0;}
          .dsel-submit-btn{width:100%;padding:14px;background:#0c2461;color:#fff;border:none;border-radius:50px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity 0.2s;margin-top:4px;}
          .dsel-submit-btn:hover{opacity:0.88;}
          .dsel-related-section{background:linear-gradient(135deg,#f7e9d7 0%,#fbe3ea 35%,#f3e6f5 60%,#e2e3f7 100%);border-top:1px solid rgba(12,36,97,0.08);padding:70px 40px;}
          .dsel-related-inner{max-width:1200px;margin:0 auto;}
          .dsel-related-title{font-size:1.5rem;font-weight:800;color:#0A1628;margin:0 0 8px;}
          .dsel-related-desc{font-size:14px;color:#4b5563;margin:0 0 28px;line-height:1.6;}
          .dsel-related-tags{display:flex;flex-wrap:wrap;gap:10px;}
          .dsel-related-tag{display:inline-flex;align-items:center;padding:9px 18px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;transition:all 0.2s;}
          .dsel-related-tag--0{background:rgba(79,70,229,0.08);border:1.5px solid rgba(79,70,229,0.24);color:#4338CA;}
          .dsel-related-tag--0:hover{background:#4F46E5;border-color:#4F46E5;color:#fff;transform:translateY(-2px);box-shadow:0 6px 18px rgba(79,70,229,0.28);}
          .dsel-related-tag--1{background:rgba(124,58,237,0.08);border:1.5px solid rgba(124,58,237,0.24);color:#6D28D9;}
          .dsel-related-tag--1:hover{background:#7C3AED;border-color:#7C3AED;color:#fff;transform:translateY(-2px);box-shadow:0 6px 18px rgba(124,58,237,0.28);}
          .dsel-related-tag--2{background:rgba(13,148,136,0.08);border:1.5px solid rgba(13,148,136,0.24);color:#0F766E;}
          .dsel-related-tag--2:hover{background:#0D9488;border-color:#0D9488;color:#fff;transform:translateY(-2px);box-shadow:0 6px 18px rgba(13,148,136,0.28);}
          .dsel-related-tag--3{background:rgba(2,132,199,0.08);border:1.5px solid rgba(2,132,199,0.24);color:#0369A1;}
          .dsel-related-tag--3:hover{background:#0284C7;border-color:#0284C7;color:#fff;transform:translateY(-2px);box-shadow:0 6px 18px rgba(2,132,199,0.28);}
          .dsel-related-tag--4{background:rgba(219,39,119,0.08);border:1.5px solid rgba(219,39,119,0.24);color:#BE185D;}
          .dsel-related-tag--4:hover{background:#DB2777;border-color:#DB2777;color:#fff;transform:translateY(-2px);box-shadow:0 6px 18px rgba(219,39,119,0.28);}
          .dsel-related-tag--5{background:rgba(217,119,6,0.08);border:1.5px solid rgba(217,119,6,0.24);color:#B45309;}
          .dsel-related-tag--5:hover{background:#D97706;border-color:#D97706;color:#fff;transform:translateY(-2px);box-shadow:0 6px 18px rgba(217,119,6,0.28);}
          @media(max-width:900px){
            .dsel-grid4{grid-template-columns:1fr 1fr;}
            .dsel-grid3,.dsel-grid2{grid-template-columns:1fr 1fr;}
            .dsel-res-grid{grid-template-columns:1fr 1fr;}
            .dsel-ind-grid{grid-template-columns:1fr 1fr;}
            .dsel-pkg-grid{grid-template-columns:1fr 1fr;}
            .dsel-contact-grid{grid-template-columns:1fr;gap:40px;}
            .dsel-def-aspects{grid-template-columns:1fr;}
            .dsel-def-box{padding:28px;}
          }
          @media(max-width:600px){
            .dsel-sec,.dsel-results,.dsel-related-section,.dsel-contact-sec{padding-left:20px;padding-right:20px;}
            .dsel-testi-section{padding:60px 0;}
            .dsel-grid4,.dsel-grid3,.dsel-grid2,.dsel-res-grid,.dsel-ind-grid{grid-template-columns:1fr;}
            .dsel-pkg-grid{grid-template-columns:1fr;max-width:400px;margin-left:auto;margin-right:auto;}
            .dsel-field-row{grid-template-columns:1fr;}
            .dsel-form-wrap{padding:24px 20px;}
            .dsel-def-box{padding:22px;}
          }
        
          @keyframes aurora-text{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        `}
        </style>
      </Head>

      {/* Hero */}
      <ServiceHero
        eyebrow="SEO Company in Delhi & NCR · White-Hat Only"
        title={<>Top-Ranked <AuroraText>SEO Company in Delhi</AuroraText> That Delivers Page 1 Rankings</>}
        subtext="1Solutions is a results-driven SEO company in Delhi with 15+ years of experience helping Delhi NCR businesses rank on Page 1 of Google. From technical SEO and local search to link building and content strategy - we build organic visibility that generates leads, not just traffic."
        primaryCta={{ label: 'Get a Free SEO Audit', href: '#contact' }}
        secondaryCta={{ label: 'View SEO Packages', href: '#packages' }}
        stats={[
          { label: 'SEO Clients Served', value: '500', suffix: '+' },
          { label: 'Years Experience', value: '15', suffix: '+' },
          { label: 'Rankings Delivered', value: '1', prefix: 'Page ' },
          { label: 'Client Retention', value: '97', suffix: '%' },
        ]}
      />

      {/* What Is SEO */}
      <section className="dsel-sec" id="what-is-seo">
        <div className="dsel-sec-inner" style={{textAlign:'center'}}>
          <span className="dsel-tag">Understanding SEO</span>
          <h2 className="dsel-h2">What Is <span>SEO in Delhi</span> and How Does It Work?</h2>
          <p className="dsel-lead" style={{margin:'0 auto 48px'}}>In a market where hundreds of Delhi businesses compete for the same search terms, SEO decides who gets found first - and who stays invisible. Here&apos;s exactly how it works, and what it takes to win Page 1 in Delhi NCR.</p>
          <div className="dsel-def-box" style={{textAlign:'left'}}>
            <p className="dsel-def-intro"><strong>SEO (Search Engine Optimisation)</strong> is the practice of improving your website&apos;s visibility in Google&apos;s organic, non-paid search results so your business appears when Delhi customers search for the products or services you offer. In a market as competitive as Delhi NCR, hundreds of businesses are often chasing the same customer for terms like &quot;SEO company Delhi&quot; or &quot;SEO services Delhi&quot; - SEO is what determines who Google shows first. It works by aligning your website&apos;s technical foundation, on-page content, and off-site authority signals with the ranking criteria Google uses to decide which pages best answer a given search, including proximity and relevance to the searcher&apos;s location. Unlike paid ads that stop the moment you stop spending, organic rankings from SEO Delhi campaigns compound over time - a well-optimised page keeps generating enquiries for months or years after the work is done.</p>
            <div className="dsel-def-aspects">
              {[
                { t: 'The three pillars of SEO', d: 'Technical SEO (site speed, crawlability, structure), On-page SEO (content, keywords, schema), and Off-page SEO (backlinks, local citations, authority). A Delhi SEO company has to get all three right for rankings to hold.' },
                { t: 'How Google ranks Delhi businesses', d: 'Google weighs relevance, authority, and proximity - which is why local signals like your Google Business Profile, Delhi-specific citations, and reviews matter as much as on-site content for local SEO Delhi searches.' },
                { t: 'Why SEO Delhi results compound', d: "Every optimised page, backlink, and technical fix adds permanently to your site's authority. SEO momentum builds month over month, so the longer you invest with an SEO company in Delhi, the cheaper each new ranking becomes." },
              ].map(a => (
                <div key={a.t} className="dsel-def-aspect">
                  <div className="dsel-def-t">{a.t}</div>
                  <div className="dsel-def-d">{a.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Services */}
      <section className="dsel-sec dsel-bg" id="services">
        <div className="dsel-sec-inner">
          <span className="dsel-tag">Our Delhi SEO Services</span>
          <h2 className="dsel-h2">Complete <span>SEO Services in Delhi</span></h2>
          <p className="dsel-lead">Every component of a winning SEO strategy - delivered by a dedicated team that understands the Delhi market and your growth goals.</p>
          <div className="dsel-grid4">
            {SERVICES.map(s => (
              <div key={s.title} className="dsel-card">
                <div className="dsel-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg></div>
                <h3 className="dsel-card-h">{s.title}</h3>
                <p className="dsel-card-p">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Packages */}
      <section className="dsel-sec" id="packages">
        <div className="dsel-sec-inner">
          <span className="dsel-tag">Transparent Pricing</span>
          <h2 className="dsel-h2">Delhi <span>SEO Packages</span> Built for Every Stage</h2>
          <p className="dsel-lead">Four straightforward monthly packages - no hidden fees, no long-term lock-in. Every plan includes 100% white-hat SEO and a monthly performance report.</p>
          <div className="dsel-pkg-grid">
            {SEO_PACKAGES.map(p => (
              <div key={p.slug} className={`dsel-pkg-card${p.popular ? ' dsel-pkg-pop' : ''}`}>
                {p.popular && <span className="dsel-pkg-tag">Most Popular</span>}
                <div className="dsel-pkg-name">{p.name}</div>
                <p className="dsel-pkg-desc">{p.desc}</p>
                <div className="dsel-pkg-price-row">
                  <span className="dsel-pkg-currency">INR</span>
                  <span className="dsel-pkg-amount">{p.price}</span>
                  <span className="dsel-pkg-per">/mo</span>
                </div>
                <a href="#contact" className="dsel-pkg-cta">Get Started</a>
                <div className="dsel-pkg-divider" />
                <ul className="dsel-pkg-feat-list">
                  {p.features.map(f => (
                    <li key={f}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Comparison */}
      <section className="dsel-sec dsel-bg" id="package-comparison">
        <div className="dsel-sec-inner">
          <span className="dsel-tag">Plan Comparison</span>
          <h2 className="dsel-h2"><span>Package Comparison</span> at a Glance</h2>
          <p className="dsel-lead">See exactly what's included at every level so you can pick the right starting point for your Delhi SEO goals.</p>
          <div className="dsel-tbl-wrap">
            <table className="dsel-tbl">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Starter<br />INR 15,000/mo</th>
                  <th>Growth<br />INR 25,000/mo</th>
                  <th>Authority<br />INR 45,000/mo</th>
                  <th>Enterprise<br />INR 75,000/mo</th>
                </tr>
              </thead>
              <tbody>
                {PACKAGE_COMPARISON.map(([feat, ...cols]) => (
                  <tr key={feat}>
                    <td>{feat}</td>
                    {cols.map((val, i) => (
                      <td key={i} className={val === '✗' ? 'dsel-tbl-n' : 'dsel-tbl-y'}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="dsel-results">
        <div className="dsel-results-inner">
          <span className="dsel-res-tag">Proven Delhi SEO Results</span>
          <h2 className="dsel-res-h">What Our SEO Delivers for Delhi Businesses</h2>
          <div className="dsel-res-grid">
            {RESULTS.map(r => (
              <div key={r.label} className="dsel-res-card">
                <div className="dsel-res-metric" style={{ color: r.color }}>{r.metric}</div>
                <div className="dsel-res-label">{r.label}</div>
                <div className="dsel-res-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="dsel-testi-section" id="testimonials">
        <div className="dsel-testi-inner">
          <span className="dsel-tag">Client Reviews</span>
          <h2 className="dsel-h2">What Our <span>Delhi Clients Say</span></h2>
          <p className="dsel-lead" style={{ marginBottom: 0 }}>Trusted by real estate, healthcare, and B2B businesses across Delhi NCR.</p>
        </div>
        <div className="dsel-testi-marquee-outer">
          <div className="dsel-testi-fade dsel-testi-fade--l" />
          <div className="dsel-testi-fade dsel-testi-fade--r" />

          <div className="dsel-testi-marquee-wrap">
            <div className="dsel-testi-track">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div className="dsel-testi-card" key={`row1-${t.name}-${i}`}>
                  <div className="dsel-testi-stars">{'★'.repeat(t.rating)}</div>
                  <p className="dsel-testi-text">"{t.text}"</p>
                  <div className="dsel-testi-name">{t.name}</div>
                  <div className="dsel-testi-role">{t.role}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="dsel-testi-marquee-wrap">
            <div className="dsel-testi-track dsel-testi-track--rev">
              {[...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2].map((t, i) => (
                <div className="dsel-testi-card" key={`row2-${t.name}-${i}`}>
                  <div className="dsel-testi-stars">{'★'.repeat(t.rating)}</div>
                  <p className="dsel-testi-text">"{t.text}"</p>
                  <div className="dsel-testi-name">{t.name}</div>
                  <div className="dsel-testi-role">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why 1Solutions */}
      <section className="dsel-sec" id="why-us">
        <div className="dsel-sec-inner" style={{textAlign:'center'}}>
          <span className="dsel-tag">Why Choose 1Solutions</span>
          <h2 className="dsel-h2">The Delhi SEO Agency <span>That Makes Rankings Last</span></h2>
          <p className="dsel-lead" style={{margin:'0 auto 48px', maxWidth:720}}>We build SEO foundations that outlast algorithm updates and deliver compounding organic growth - not short-term spikes that disappear when Google updates.</p>
          <div className="dsel-grid2" style={{textAlign:'left'}}>
            {WHY.map(w => (
              <div key={w.title} className="dsel-why-card" style={{background:w.bg}}>
                <div className="dsel-why-head">
                  <svg className="dsel-why-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={w.icon}/></svg>
                  <h3 className="dsel-why-h">{w.title}</h3>
                </div>
                <p className="dsel-why-p">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="dsel-sec dsel-bg" id="process">
        <div className="dsel-sec-inner" style={{textAlign:'center'}}>
          <span className="dsel-tag">How We Work</span>
          <h2 className="dsel-h2">Our <span>6-Step Delhi SEO Process</span></h2>
          <p className="dsel-lead" style={{margin:'0 auto 48px'}}>A structured, transparent methodology that compounds organic growth over time - from your first free audit to sustained Page 1 dominance.</p>
          <div className="dsel-grid3" style={{textAlign:'left'}}>
            {PROCESS.map(p => (
              <div key={p.n}>
                <div className="dsel-proc-num">{p.n}</div>
                <div className="dsel-proc-line" />
                <h3 className="dsel-proc-h">{p.title}</h3>
                <p className="dsel-proc-p">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="dsel-sec">
        <div className="dsel-sec-inner" style={{textAlign:'center'}}>
          <span className="dsel-tag">Delhi Industries We Serve</span>
          <h2 className="dsel-h2">SEO for <span>Every Delhi Business Sector</span></h2>
          <p className="dsel-lead" style={{margin:'0 auto 48px'}}>From Connaught Place retail to Gurugram tech startups - we deliver SEO strategies built around the specific competitive landscape of your Delhi industry.</p>
          <div className="dsel-ind-grid" style={{textAlign:'left'}}>
            {INDUSTRIES.map(ind => (
              <div key={ind.name} className="dsel-ind-card">
                <div className="dsel-ind-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={ind.icon} /></svg></div>
                <span className="dsel-ind-name">{ind.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="dsel-sec dsel-bg">
        <div className="dsel-sec-inner" style={{textAlign:'center'}}>
          <span className="dsel-tag">Areas We Cover</span>
          <h2 className="dsel-h2">SEO Services Across <span>Delhi &amp; NCR</span></h2>
          <p className="dsel-lead" style={{margin:'0 auto 48px'}}>We serve businesses throughout the Delhi National Capital Region - from the central business districts to the growing satellite cities of the NCR corridor.</p>
          <div className="dsel-areas-wrap" style={{justifyContent:'center'}}>
            {AREAS.map((area, ai) => (
              <span key={area} className={`dsel-area-tag dsel-area-tag--${ai % 6}`}>{area}</span>
            ))}
          </div>
          <p style={{ marginTop: 32, fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.7, maxWidth: 780, marginLeft: 'auto', marginRight: 'auto' }}>
            Whether your business is headquartered in South Delhi, operates out of a Gurugram tech park, or serves customers across the entire NCR region - our Delhi SEO strategies are built around your specific geographic target market and local competition intensity.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="dsel-sec" id="faq">
        <div className="dsel-sec-inner">
          <span className="dsel-tag">Frequently Asked Questions</span>
          <h2 className="dsel-h2">SEO Company Delhi <span>FAQs</span></h2>
          <p className="dsel-lead" style={{ marginBottom: 32 }}>Honest answers to the questions Delhi businesses ask most before starting their SEO journey.</p>
          <div className="dsel-faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className={'dsel-faq-item' + (openFaq === i ? ' open' : '')}>
                <button className="dsel-faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="dsel-faq-qt">{f.q}</span>
                  <span className="dsel-faq-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </span>
                </button>
                {openFaq === i && <div className="dsel-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="dsel-contact-sec" id="contact">
        <div className="dsel-contact-inner">
          <div className="dsel-contact-grid">
            <div>
              <h2 className="dsel-contact-info-h">Get Your Free <span>Delhi SEO Audit</span></h2>
              <p className="dsel-contact-info-p">Tell us about your Delhi business and we will prepare a detailed SEO audit - covering your current rankings, technical health, competitor gaps, and a clear roadmap to Page 1. Completely free, no commitment.</p>
              <div className="dsel-contact-item">
                <div className="dsel-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div className="dsel-contact-item-text">
                  <strong>Email</strong>
                  <a href="mailto:info@1solutions.biz">info@1solutions.biz</a>
                </div>
              </div>
              <div className="dsel-contact-item">
                <div className="dsel-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>
                </div>
                <div className="dsel-contact-item-text">
                  <strong>WhatsApp / Call</strong>
                  <a href="tel:+919654327900">+91 9654327900</a>
                </div>
              </div>
              <div className="dsel-contact-item">
                <div className="dsel-contact-item-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="dsel-contact-item-text">
                  <strong>Response Time</strong>
                  <span>Within 24 hours</span>
                </div>
              </div>
              <div className="dsel-trust-list">
                {['Free audit - no credit card, no commitment', 'Dedicated Delhi SEO specialist assigned', 'Honest timelines based on real competitor data', 'White-hat strategies only - no ranking risk'].map(t => (
                  <span key={t} className="dsel-trust-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="dsel-form-wrap">
              {sent ? (
                <div className="dsel-sent">
                  <div className="dsel-sent-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3>Audit Request Received</h3>
                  <p>Thank you! Our Delhi SEO team will review your website and be in touch within 24 hours with your free audit findings.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="dsel-field-row">
                    <div className="dsel-field">
                      <label>Your Name *</label>
                      <input required type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="dsel-field">
                      <label>Email Address *</label>
                      <input required type="email" placeholder="rahul@company.in" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="dsel-field-row">
                    <div className="dsel-field">
                      <label>Phone Number *</label>
                      <input type="tel" placeholder="+91 98xxxxxxxx" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required />
                    </div>
                    <div className="dsel-field">
                      <label>Your Website URL *</label>
                      <input required type="url" placeholder="https://yourcompany.in" value={form.website} onChange={e => setForm({...form, website: e.target.value})} />
                    </div>
                  </div>
                  <div className="dsel-field">
                    <label>Business Industry</label>
                    <select value={form.industry} onChange={e => setForm({...form, industry: e.target.value})}>
                      <option>Select your industry</option>
                      <option>Real Estate & Property</option>
                      <option>Healthcare & Clinics</option>
                      <option>Education & Coaching</option>
                      <option>Legal Services</option>
                      <option>Retail & eCommerce</option>
                      <option>IT & SaaS</option>
                      <option>Hospitality & Hotels</option>
                      <option>Manufacturing & B2B</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="dsel-field">
                    <label>What are your main SEO goals?</label>
                    <textarea rows={4} placeholder="More organic leads, better rankings for specific keywords, faster website, etc." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                  </div>
                  <button type="submit" className="dsel-submit-btn">Request Free Delhi SEO Audit →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="dsel-related-section">
        <div className="dsel-related-inner">
          <div style={{textAlign:'center'}}>
            <span className="dsel-tag">Delhi SEO Related Offerings</span>
            <h2 className="dsel-related-title">Explore Related Services</h2>
            <p className="dsel-related-desc">Pair our Delhi SEO expertise with related services to build a complete digital growth strategy.</p>
          </div>
          <div className="dsel-related-tags" style={{justifyContent:'center'}}>
            {[
              ['Generative Search Optimization (GEO) Delhi', 'generative-search-optimization-services-geo-delhi'],
              ['Local SEO Services', 'local-seo-services'],
              ['Technical SEO', 'technical-seo-optimization'],
              ['Link Building Services', 'link-building-services'],
              ['Content Marketing', 'content-marketing-services'],
              ['eCommerce SEO', 'ecommerce-seo-services'],
              ['PPC Management', 'ppc-management-services'],
              ['Affordable SEO Packages', 'affordable-seo-packages'],
              ['SEO Audit Services', 'seo-audit-services'],
              ['Web Development', 'web-development-services'],
            ].map(([label, href], ti) => (
              <Link key={label} href={`/${href}/`} className={`dsel-related-tag dsel-related-tag--${ti % 6}`}>{label}</Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
