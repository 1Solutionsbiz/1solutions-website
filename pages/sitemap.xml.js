const SITE = 'https://www.1solutions.biz';

const STATIC_PAGES = [
  // Company
  { url: '/',                                    priority: '1.0', changefreq: 'weekly' },
  { url: '/who-we-are',                          priority: '0.8', changefreq: 'monthly' },
  { url: '/work-culture',                        priority: '0.6', changefreq: 'monthly' },
  { url: '/portfolio',                           priority: '0.8', changefreq: 'monthly' },
  { url: '/case-studies',                        priority: '0.8', changefreq: 'monthly' },
  { url: '/open-positions',                      priority: '0.6', changefreq: 'weekly' },
  { url: '/apply-online',                        priority: '0.5', changefreq: 'monthly' },
  { url: '/contact',                             priority: '0.9', changefreq: 'monthly' },
  { url: '/book-consultation',                   priority: '0.8', changefreq: 'monthly' },
  { url: '/blog',                                priority: '0.9', changefreq: 'daily' },
  { url: '/sitemap',                             priority: '0.5', changefreq: 'monthly' },
  { url: '/search',                              priority: '0.4', changefreq: 'monthly' },

  // Web & App Development
  { url: '/wordpress-development-company',       priority: '0.9', changefreq: 'monthly' },
  { url: '/nextjs-development-services',         priority: '0.8', changefreq: 'monthly' },
  { url: '/laravel-development-company',         priority: '0.8', changefreq: 'monthly' },
  { url: '/python-development-services',         priority: '0.8', changefreq: 'monthly' },
  { url: '/codeigniter-development-company',     priority: '0.7', changefreq: 'monthly' },
  { url: '/drupal-development-company',          priority: '0.7', changefreq: 'monthly' },
  { url: '/joomla-development-company',          priority: '0.7', changefreq: 'monthly' },
  { url: '/tibco-development-services',          priority: '0.6', changefreq: 'monthly' },
  { url: '/php-development-services',            priority: '0.7', changefreq: 'monthly' },
  { url: '/android-application-development-company', priority: '0.8', changefreq: 'monthly' },
  { url: '/ios-app-development-company',         priority: '0.8', changefreq: 'monthly' },
  { url: '/flutter-app-development-services',    priority: '0.8', changefreq: 'monthly' },
  { url: '/react-native-app-development',        priority: '0.8', changefreq: 'monthly' },
  { url: '/social-media-app-development-company', priority: '0.7', changefreq: 'monthly' },
  { url: '/erp-application-development-company', priority: '0.7', changefreq: 'monthly' },
  { url: '/crm-application-development-company', priority: '0.7', changefreq: 'monthly' },
  { url: '/saas-application-development-company', priority: '0.7', changefreq: 'monthly' },
  { url: '/ecommerce-website-development-services', priority: '0.9', changefreq: 'monthly' },
  { url: '/magento-development-company',         priority: '0.8', changefreq: 'monthly' },
  { url: '/shopify-store-development',           priority: '0.9', changefreq: 'monthly' },
  { url: '/shopify-migration-services',          priority: '0.8', changefreq: 'monthly' },
  { url: '/woocommerce-development-company',     priority: '0.8', changefreq: 'monthly' },
  { url: '/opencart-development-company',        priority: '0.7', changefreq: 'monthly' },
  { url: '/app-maintenance-services',            priority: '0.6', changefreq: 'monthly' },
  { url: '/app-store-optimization-services',     priority: '0.7', changefreq: 'monthly' },

  // UI/UX & Design
  { url: '/website-design',                      priority: '0.8', changefreq: 'monthly' },
  { url: '/mobile-app-design',                   priority: '0.7', changefreq: 'monthly' },
  { url: '/brand-identity',                      priority: '0.7', changefreq: 'monthly' },
  { url: '/design-systems',                      priority: '0.7', changefreq: 'monthly' },
  { url: '/prototyping-services',                priority: '0.7', changefreq: 'monthly' },
  { url: '/ux-research',                         priority: '0.7', changefreq: 'monthly' },
  { url: '/logo-design-services',                priority: '0.7', changefreq: 'monthly' },
  { url: '/landing-page-design-services',        priority: '0.7', changefreq: 'monthly' },
  { url: '/infographics-design',                 priority: '0.6', changefreq: 'monthly' },
  { url: '/facebook-page-designing',             priority: '0.6', changefreq: 'monthly' },
  { url: '/app-ui-ux-design',                    priority: '0.7', changefreq: 'monthly' },
  { url: '/home-services-website-design',        priority: '0.8', changefreq: 'monthly' },

  // Cloud, DevOps & IT
  { url: '/cloud-migration-services',            priority: '0.8', changefreq: 'monthly' },
  { url: '/cloud-native-services',               priority: '0.7', changefreq: 'monthly' },
  { url: '/devops-services-company',             priority: '0.8', changefreq: 'monthly' },
  { url: '/virtual-cto-services',                priority: '0.7', changefreq: 'monthly' },
  { url: '/it-outsourcing-services',             priority: '0.7', changefreq: 'monthly' },
  { url: '/it-staff-augmentation-services',      priority: '0.7', changefreq: 'monthly' },
  { url: '/offshore-development-company',        priority: '0.8', changefreq: 'monthly' },
  { url: '/software-development-cost-optimization', priority: '0.6', changefreq: 'monthly' },
  { url: '/website-support-maintenance-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/wordpress-support-and-maintenance-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/virtual-assistant-services',          priority: '0.8', changefreq: 'monthly' },

  // Digital Marketing
  { url: '/digital-marketing-services',          priority: '0.9', changefreq: 'monthly' },
  { url: '/seo-services-company',                priority: '0.9', changefreq: 'monthly' },
  { url: '/affordable-seo-packages',             priority: '0.8', changefreq: 'monthly' },
  { url: '/seo-audit-services',                  priority: '0.8', changefreq: 'monthly' },
  { url: '/local-seo-services',                  priority: '0.8', changefreq: 'monthly' },
  { url: '/local-seo-packages',                  priority: '0.8', changefreq: 'monthly' },
  { url: '/ecommerce-seo-services',              priority: '0.8', changefreq: 'monthly' },
  { url: '/ecommerce-seo-packages',              priority: '0.8', changefreq: 'monthly' },
  { url: '/link-building-packages',              priority: '0.8', changefreq: 'monthly' },
  { url: '/amazon-seo-services',                 priority: '0.8', changefreq: 'monthly' },
  { url: '/seo-services-for-small-business',     priority: '0.8', changefreq: 'monthly' },
  { url: '/google-penalty-recovery-services',    priority: '0.8', changefreq: 'monthly' },
  { url: '/google-panda-recovery-services',      priority: '0.8', changefreq: 'monthly' },
  { url: '/penguin-recovery-service',            priority: '0.8', changefreq: 'monthly' },
  { url: '/free-45-day-seo-trial',               priority: '0.9', changefreq: 'monthly' },
  { url: '/reputation-management-services',      priority: '0.8', changefreq: 'monthly' },
  { url: '/managed-seo-services',                priority: '0.7', changefreq: 'monthly' },
  { url: '/enterprise-seo-services',             priority: '0.7', changefreq: 'monthly' },
  { url: '/technical-seo-optimization',          priority: '0.7', changefreq: 'monthly' },
  { url: '/seo-training-laxmi-nagar',            priority: '0.7', changefreq: 'monthly' },
  { url: '/voice-search-optimization-services',  priority: '0.7', changefreq: 'monthly' },
  { url: '/answer-engine-optimization-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/generative-engine-optimization-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/ppc-management-services',             priority: '0.8', changefreq: 'monthly' },
  { url: '/ppc-audit-services',                  priority: '0.7', changefreq: 'monthly' },
  { url: '/google-shopping-management',          priority: '0.7', changefreq: 'monthly' },
  { url: '/google-my-business-optimization',     priority: '0.8', changefreq: 'monthly' },
  { url: '/remarketing-services',                priority: '0.7', changefreq: 'monthly' },
  { url: '/analytics-cro-services',              priority: '0.7', changefreq: 'monthly' },
  { url: '/conversion-rate-optimization-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/social-media-marketing-services',     priority: '0.8', changefreq: 'monthly' },
  { url: '/linkedin-ads-management',             priority: '0.7', changefreq: 'monthly' },
  { url: '/meta-ads-management',                 priority: '0.7', changefreq: 'monthly' },
  { url: '/influencer-marketing',                priority: '0.7', changefreq: 'monthly' },
  { url: '/content-marketing-services',          priority: '0.8', changefreq: 'monthly' },
  { url: '/email-marketing-services',            priority: '0.8', changefreq: 'monthly' },
  { url: '/html-email-development-services',     priority: '0.8', changefreq: 'monthly' },
  { url: '/klaviyo-email-marketing-agency',      priority: '0.8', changefreq: 'monthly' },
  { url: '/video-marketing-services',            priority: '0.7', changefreq: 'monthly' },
  { url: '/facebook-management-services',        priority: '0.8', changefreq: 'monthly' },
  { url: '/instagram-marketing-services',        priority: '0.7', changefreq: 'monthly' },
  { url: '/content-copywriting-services',        priority: '0.8', changefreq: 'monthly' },
  { url: '/ecommerce-marketing-services',        priority: '0.8', changefreq: 'monthly' },
  { url: '/lawn-care-marketing-services',        priority: '0.7', changefreq: 'monthly' },
  { url: '/hvac-seo-services',                   priority: '0.7', changefreq: 'monthly' },
  { url: '/photography-seo-services',            priority: '0.7', changefreq: 'monthly' },

  // SEO by Industry
  { url: '/dental-seo-services',                 priority: '0.7', changefreq: 'monthly' },
  { url: '/law-firm-seo-services',               priority: '0.7', changefreq: 'monthly' },
  { url: '/insurance-seo-services',              priority: '0.7', changefreq: 'monthly' },
  { url: '/home-repair-seo-services',            priority: '0.7', changefreq: 'monthly' },
  { url: '/plumbing-seo-services',               priority: '0.7', changefreq: 'monthly' },
  { url: '/restaurants-seo-services',            priority: '0.7', changefreq: 'monthly' },
  { url: '/petcare-seo-services',                priority: '0.7', changefreq: 'monthly' },

  // SEO by Platform
  { url: '/magento-seo-services',                priority: '0.7', changefreq: 'monthly' },
  { url: '/shopify-seo-services',                priority: '0.7', changefreq: 'monthly' },
  { url: '/woocommerce-seo-services',            priority: '0.7', changefreq: 'monthly' },
  { url: '/wordpress-seo-services',              priority: '0.7', changefreq: 'monthly' },
  { url: '/opencart-seo-services',               priority: '0.7', changefreq: 'monthly' },
  { url: '/wix-seo-services',                    priority: '0.6', changefreq: 'monthly' },

  // SEO by Location
  { url: '/seo-company-austin',                  priority: '0.7', changefreq: 'monthly' },
  { url: '/seo-company-burlington',              priority: '0.7', changefreq: 'monthly' },
  { url: '/seo-company-delhi',                   priority: '0.7', changefreq: 'monthly' },
  { url: '/seo-company-toronto',                 priority: '0.7', changefreq: 'monthly' },
  { url: '/seo-company-vancouver',               priority: '0.7', changefreq: 'monthly' },

  // eCommerce & Marketplace
  { url: '/amazon-account-management-services',  priority: '0.8', changefreq: 'monthly' },
  { url: '/amazon-fba-shipment-reconciliation-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/ebay-account-management-services',    priority: '0.7', changefreq: 'monthly' },
  { url: '/flipkart-account-management-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/etsy-account-management-services',    priority: '0.7', changefreq: 'monthly' },
  { url: '/walmart-account-management-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/wayfair-account-management-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/home-depot-account-management-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/temu-account-management-services',    priority: '0.6', changefreq: 'monthly' },
  { url: '/houzz-product-listing-services',      priority: '0.6', changefreq: 'monthly' },
  { url: '/b2b-ecommerce',                       priority: '0.7', changefreq: 'monthly' },

  // Industry Solutions
  { url: '/healthcare-software-development',     priority: '0.8', changefreq: 'monthly' },
  { url: '/fintech-software-development-company', priority: '0.8', changefreq: 'monthly' },
  { url: '/real-estate-software-development',    priority: '0.7', changefreq: 'monthly' },
  { url: '/manufacturing-software-development-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/logistics-software-development-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/retail-ecommerce-software-development', priority: '0.7', changefreq: 'monthly' },
  { url: '/agriculture-software-development',    priority: '0.6', changefreq: 'monthly' },
  { url: '/automotive-software-solutions',       priority: '0.7', changefreq: 'monthly' },
  { url: '/ev-software-development-company',     priority: '0.7', changefreq: 'monthly' },
  { url: '/elearning-software-development-services', priority: '0.7', changefreq: 'monthly' },
  { url: '/entertainment-software-development',  priority: '0.6', changefreq: 'monthly' },
  { url: '/travel-and-tourism-software-solutions', priority: '0.7', changefreq: 'monthly' },
  { url: '/wellness-software-development',       priority: '0.6', changefreq: 'monthly' },

  // Hire Developers & Designers
  { url: '/hire-reactjs-developer',              priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-nodejs-developer',               priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-wordpress-developer',            priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-php-developer',                  priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-python-developer',               priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-javascript-developer',           priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-full-stack-developer',           priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-mean-stack-developer',           priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-mern-stack-developer',           priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-shopify-developer',              priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-magento-developer',              priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-drupal-developer',               priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-angularjs-developer',            priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-swift-developer',                priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-prestashop-developer',           priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-pwa-developer',                  priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-salesforce-developer',           priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-android-developer',              priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-ios-developer',                  priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-flutter-developer',              priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-react-native-developer',         priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-app-developer',                  priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-ai-developer',                   priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-ml-developer',                   priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-blockchain-developer',           priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-data-scientist',                 priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-ar-developer',                   priority: '0.6', changefreq: 'monthly' },
  { url: '/hire-vr-developer',                   priority: '0.6', changefreq: 'monthly' },
  { url: '/hire-dedicated-ui-ux-designer',       priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-web-designer',                   priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-web-developer',                  priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-dedicated-resources',            priority: '0.7', changefreq: 'monthly' },
  { url: '/hire-trending-developer',             priority: '0.6', changefreq: 'monthly' },
  { url: '/hire-nextjs-developers',              priority: '0.8', changefreq: 'monthly' },
  { url: '/hire-dedicated-graphic-designer',     priority: '0.8', changefreq: 'monthly' },

  // Legal
  { url: '/privacy-policy',                      priority: '0.3', changefreq: 'yearly' },
  { url: '/terms-of-use',                        priority: '0.3', changefreq: 'yearly' },
  { url: '/cookie-policy',                       priority: '0.3', changefreq: 'yearly' },
  { url: '/refund-policy',                       priority: '0.3', changefreq: 'yearly' },
];

async function getAllPostSlugsWithDates() {
  const WP_API = process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'https://midnightblue-lyrebird-831822.hostingersite.com/graphql';
  try {
    let posts = [];
    let hasNextPage = true;
    let endCursor = null;

    while (hasNextPage) {
      const query = `
        query GetAllSlugs($after: String) {
          posts(first: 100, after: $after, where: { status: PUBLISH }) {
            pageInfo { hasNextPage endCursor }
            nodes { slug date modified }
          }
        }
      `;
      const res = await fetch(WP_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { after: endCursor } }),
      });
      const json = await res.json();
      const data = json.data?.posts;
      if (!data) break;
      posts = posts.concat(data.nodes);
      hasNextPage = data.pageInfo.hasNextPage;
      endCursor = data.pageInfo.endCursor;
    }
    return posts;
  } catch {
    return [];
  }
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/'/g, '&apos;').replace(/"/g, '&quot;').replace(/>/g, '&gt;').replace(/</g, '&lt;');
}

function buildSitemap(staticPages, posts) {
  const today = new Date().toISOString().split('T')[0];

  const staticEntries = staticPages.map(({ url, priority, changefreq }) => `
  <url>
    <loc>${SITE}${escapeXml(url)}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

  const postEntries = posts.map(({ slug, modified, date }) => {
    const lastmod = (modified || date || today).split('T')[0];
    return `
  <url>
    <loc>${SITE}/${escapeXml(slug)}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticEntries}
${postEntries}
</urlset>`;
}

function SitemapXML() { return null; }

export async function getServerSideProps({ res }) {
  const posts = await getAllPostSlugsWithDates();
  const xml = buildSitemap(STATIC_PAGES, posts);

  res.setHeader('Content-Type', 'text/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
  res.write(xml);
  res.end();

  return { props: {} };
}

export default SitemapXML;
