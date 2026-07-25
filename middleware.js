import { NextResponse } from 'next/server';

// Every static page's own <link rel="canonical"> declares a trailing-slash
// URL (206 of ~220 pages checked), and sitemap.xml lists them the same way
// — but skipTrailingSlashRedirect (set in next.config.js to stop a POST
// /api/ai-generate redirect from dropping its body) also disabled Next's
// automatic slash redirect for every other route, so both
// /seo-company-delhi and /seo-company-delhi/ serve 200 with no redirect
// between them. This restores the redirect, scoped to an exact allowlist
// of known static top-level page paths only.
//
// Deliberately NOT a blanket "any path without a trailing slash" rule:
// dynamic content (blog posts/categories via [slug].jsx, case-studies
// sub-pages, apply-online sub-pages) has its own canonical logic pulled
// from WordPress or built per-item, and at least one confirmed case
// (case-studies/[slug].jsx) explicitly canonicalizes WITHOUT a trailing
// slash — redirecting those would contradict their own canonical tag
// instead of fixing anything. An exact-match allowlist means this only
// ever touches paths already confirmed to want the slash.
const SLASH_PAGES = new Set([
  'affiliate-marketing-services', 'affordable-seo-packages', 'agriculture-software-development',
  'ai-agent-development-services', 'ai-automation-services', 'ai-chatbot-development-services',
  'ai-integration-services', 'ai-search-services', 'ai-seo-services', 'ai-solutions',
  'ai-utilization-review', 'amazon-account-management-services',
  'amazon-fba-shipment-reconciliation-services', 'amazon-seo-services', 'analytics-cro-services',
  'android-application-development-company', 'answer-engine-optimization-services',
  'app-maintenance-services', 'app-store-optimization-services', 'app-ui-ux-design',
  'apply-online', 'artificial-intelligence', 'automotive-software-solutions', 'b2b-ecommerce',
  'book-consultation', 'brand-identity', 'case-studies', 'chatgpt-seo', 'cloud-migration-services',
  'cloud-native-services', 'codeigniter-development-company', 'contact-us',
  'content-copywriting-services', 'content-marketing-services',
  'conversion-rate-optimization-services', 'cookie-policy', 'corporate-responsibility',
  'crm-application-development-company', 'dental-seo-services', 'design-systems',
  'devops-services-company', 'digital-marketing-services', 'digital-transformation',
  'drupal-development-company', 'ebay-account-management-services', 'ecommerce-marketing-services',
  'ecommerce-seo-packages', 'ecommerce-seo-services', 'ecommerce-website-development-services',
  'elearning-software-development-services', 'email-marketing-services', 'enterprise-seo-services',
  'entertainment-software-development', 'erp-application-development-company',
  'etsy-account-management-services', 'ev-software-development-company',
  'facebook-management-services', 'facebook-page-designing',
  'fintech-software-development-company', 'flipkart-account-management-services',
  'flutter-app-development-services', 'free-45-day-seo-trial', 'free-ai-visibility-audit',
  'generative-ai-services', 'generative-engine-optimization-services', 'google-ai-seo',
  'google-my-business-optimization', 'google-panda-recovery-services',
  'google-penalty-recovery-services', 'google-shopping-management', 'graphic-design-services',
  'headless-wordpress-development', 'healthcare-software-development', 'hire-ai-developer',
  'hire-android-developer', 'hire-angularjs-developer', 'hire-app-developer', 'hire-ar-developer',
  'hire-blockchain-developer', 'hire-data-scientist', 'hire-dedicated-graphic-designer',
  'hire-dedicated-resources', 'hire-dedicated-ui-ux-designer', 'hire-drupal-developer',
  'hire-flutter-developer', 'hire-full-stack-developer', 'hire-ios-developer',
  'hire-javascript-developer', 'hire-laravel-developer', 'hire-magento-developer',
  'hire-mean-stack-developer', 'hire-mern-stack-developer', 'hire-ml-developer',
  'hire-nextjs-developers', 'hire-nodejs-developer', 'hire-php-developer',
  'hire-prestashop-developer', 'hire-pwa-developer', 'hire-python-developer',
  'hire-react-native-developer', 'hire-reactjs-developer', 'hire-salesforce-developer',
  'hire-shopify-developer', 'hire-swift-developer', 'hire-trending-developer', 'hire-vr-developer',
  'hire-web-designer', 'hire-web-developer', 'hire-wordpress-developer',
  'home-depot-account-management-services', 'home-repair-seo-services',
  'home-services-website-design', 'houzz-product-listing-services',
  'html-email-development-services', 'hvac-seo-services', 'influencer-marketing-services',
  'infographics-design', 'instagram-marketing-services', 'insurance-seo-services',
  'ios-app-development-company', 'it-outsourcing-services', 'it-staff-augmentation-services',
  'joomla-development-company', 'klaviyo-email-marketing-agency', 'landing-page-design-services',
  'laravel-development-company', 'law-firm-seo-services', 'lawn-care-marketing-services',
  'link-building-packages', 'link-building-services', 'linkedin-ads-management',
  'local-seo-packages', 'local-seo-services', 'logistics-software-development-services',
  'logo-design-services', 'magento-development-company', 'magento-seo-services',
  'managed-seo-services', 'manufacturing-software-development-services', 'meta-ads-management',
  'meta-ai-seo', 'mobile-app-design', 'mobile-app-development', 'nextjs-development-services',
  'nodejs-development-services', 'offshore-development-company', 'open-positions',
  'opencart-development-company', 'opencart-seo-services', 'partner-with-us',
  'penguin-recovery-service', 'performance-marketing-agency', 'perplexity-ai-seo',
  'petcare-seo-services', 'photography-seo-services', 'php-development-services',
  'plumbing-seo-services', 'portfolio', 'ppc-audit-services', 'ppc-management-services',
  'privacy-policy', 'prototyping-services', 'python-development-services',
  'react-native-app-development', 'real-estate-software-development', 'refund-policy',
  'remarketing-services', 'reputation-management-services', 'restaurants-seo-services',
  'retail-ecommerce-software-development', 'saas-application-development-company', 'search',
  'search-everywhere-optimization', 'searchgpt-seo', 'seo-audit-services', 'seo-company-austin',
  'seo-company-burlington', 'seo-company-delhi', 'seo-company-los-angeles', 'seo-company-toronto',
  'seo-company-vancouver', 'seo-services-california', 'seo-services-company',
  'seo-services-for-small-business', 'seo-services-jacksonville', 'seo-training-laxmi-nagar',
  'shopify-migration-services', 'shopify-seo-services', 'shopify-store-development', 'sitemap',
  'snapchat-emoji-meanings-yellow-heart-guide', 'social-media-app-development-company',
  'social-media-marketing-services', 'software-development-cost-optimization',
  'technical-seo-optimization', 'temu-account-management-services', 'terms-of-use', 'thank-you',
  'tibco-development-services', 'travel-and-tourism-software-solutions', 'ux-research',
  'video-marketing-services', 'virtual-assistant-services', 'virtual-cto-services',
  'voice-search-optimization-services', 'walmart-account-management-services',
  'wayfair-account-management-services', 'web-development-services',
  'webflow-development-services', 'website-design', 'website-support-maintenance-services',
  'wellness-software-development', 'white-label-ppc-services', 'white-label-seo-services',
  'who-we-are', 'wix-seo-services', 'woocommerce-development-company', 'woocommerce-seo-services',
  'wordpress-development-company', 'wordpress-seo-services',
  'wordpress-support-and-maintenance-services', 'work-culture', 'write-for-us',
]);

export function middleware(request) {
  const host = request.headers.get('host') || '';
  const nextUrl = request.nextUrl;
  let targetHost = host === '1solutions.biz' ? 'www.1solutions.biz' : nextUrl.host;
  let targetPathname = nextUrl.pathname;

  // Exact match only (no leading/trailing slash) — see SLASH_PAGES comment.
  const slug = nextUrl.pathname.slice(1);
  if (!nextUrl.pathname.endsWith('/') && SLASH_PAGES.has(slug)) {
    targetPathname = `${nextUrl.pathname}/`;
  }

  if (targetHost !== nextUrl.host || targetPathname !== nextUrl.pathname) {
    // NextURL's pathname setter re-normalizes against the app's
    // trailingSlash config (default false) and silently drops an appended
    // slash, so the redirect target is built as a plain string/URL instead
    // of via request.nextUrl.clone().
    const target = new URL(`${nextUrl.protocol}//${targetHost}${targetPathname}${nextUrl.search}`);
    return NextResponse.redirect(target, { status: 308 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
