/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',        value: 'on' },
  { key: 'X-Frame-Options',               value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',        value: 'nosniff' },
  { key: 'Referrer-Policy',               value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Strict-Transport-Security',     value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection',             value: '1; mode=block' },
];

const nextConfig = {
  // Prevents Vercel CDN from issuing 308 redirects to add/remove trailing slashes.
  // Without this, POST /api/ai-generate gets 308 -> /api/ai-generate/ and the body is dropped.
  skipTrailingSlashRedirect: true,

  // Don't block builds on lint errors — we fix them separately
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: 'midnightblue-lyrebird-831822.hostingersite.com' },
      { protocol: 'https', hostname: 'www.1solutions.biz' },
      { protocol: 'https', hostname: '1solutions.biz' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      { protocol: 'https', hostname: '*.gravatar.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      {
        source: '/images/1solutions-favicon.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
      {
        source: '/api/ai-generate',
        headers: [
          { key: 'Access-Control-Allow-Origin',  value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // ── Common alias URLs ─────────────────────────────────────────────────
      { source: '/about',                     destination: '/who-we-are/',                    permanent: true },
      { source: '/about/',                    destination: '/who-we-are/',                    permanent: true },
      { source: '/talk-to-us',               destination: '/contact-us/',                    permanent: true },
      { source: '/talk-to-us/',              destination: '/contact-us/',                    permanent: true },
      { source: '/careers',                   destination: '/open-positions/',                permanent: true },
      { source: '/careers/',                  destination: '/open-positions/',                permanent: true },

      // ── Dead job-board landing pages (old direct job URLs, now 404 — still linked from external job boards) ──
      { source: '/business-development-manager',  destination: '/apply-online/?position=Business%20Development%20Manager', permanent: true },
      { source: '/business-development-manager/', destination: '/apply-online/?position=Business%20Development%20Manager', permanent: true },
      { source: '/performance-marketing-executive',  destination: '/open-positions/',             permanent: true },
      { source: '/performance-marketing-executive/', destination: '/open-positions/',             permanent: true },
      { source: '/graphic-designer',          destination: '/open-positions/',                permanent: true },
      { source: '/graphic-designer/',         destination: '/open-positions/',                permanent: true },

      // ── GSC "Not found (404)" cleanup — old/renamed page slugs still linked externally ──
      { source: '/app-store-optimization',                    destination: '/app-store-optimization-services/',              permanent: true },
      { source: '/app-store-optimization/',                   destination: '/app-store-optimization-services/',              permanent: true },
      { source: '/content-marketing',                         destination: '/content-marketing-services/',                   permanent: true },
      { source: '/content-marketing/',                        destination: '/content-marketing-services/',                   permanent: true },
      { source: '/openCart-development-company',              destination: '/opencart-development-company/',                 permanent: true },
      { source: '/openCart-development-company/',             destination: '/opencart-development-company/',                 permanent: true },
      { source: '/next-js-development-company',               destination: '/nextjs-development-services/',                  permanent: true },
      { source: '/next-js-development-company/',              destination: '/nextjs-development-services/',                  permanent: true },
      { source: '/nodejs-development-company',                destination: '/nodejs-development-services/',                  permanent: true },
      { source: '/nodejs-development-company/',               destination: '/nodejs-development-services/',                  permanent: true },
      { source: '/saas-development-company',                  destination: '/saas-application-development-company/',        permanent: true },
      { source: '/saas-development-company/',                 destination: '/saas-application-development-company/',        permanent: true },
      { source: '/erp-software-development',                  destination: '/erp-application-development-company/',         permanent: true },
      { source: '/erp-software-development/',                 destination: '/erp-application-development-company/',         permanent: true },
      { source: '/snapchat-emoji-meanings-yellow-heart-guide-for-2025',  destination: '/snapchat-emoji-meanings-yellow-heart-guide/', permanent: true },
      { source: '/snapchat-emoji-meanings-yellow-heart-guide-for-2025/', destination: '/snapchat-emoji-meanings-yellow-heart-guide/', permanent: true },

      // ── GSC 404 cleanup — Jul 2026 batch (service pages) ──────────────────
      { source: '/get-a-free-proposal',                        destination: '/contact-us/',                                  permanent: true },
      { source: '/get-a-free-proposal/',                       destination: '/contact-us/',                                  permanent: true },
      { source: '/psd-to-magento-conversion-services',         destination: '/magento-development-company/',                permanent: true },
      { source: '/psd-to-magento-conversion-services/',        destination: '/magento-development-company/',                permanent: true },
      { source: '/converting-psd-to-html-files-to-web-pages',  destination: '/web-development-services/',                  permanent: true },
      { source: '/converting-psd-to-html-files-to-web-pages/', destination: '/web-development-services/',                  permanent: true },
      { source: '/linkedin',                                   destination: '/linkedin-ads-management/',                     permanent: true },
      { source: '/linkedin/',                                  destination: '/linkedin-ads-management/',                     permanent: true },
      { source: '/google-ads-management',                      destination: '/ppc-management-services/',                    permanent: true },
      { source: '/google-ads-management/',                     destination: '/ppc-management-services/',                    permanent: true },
      { source: '/psd-to-woocommerce',                         destination: '/woocommerce-development-company/',            permanent: true },
      { source: '/psd-to-woocommerce/',                        destination: '/woocommerce-development-company/',            permanent: true },
      { source: '/our-services',                               destination: '/web-development-services/',                   permanent: true },
      { source: '/our-services/',                              destination: '/web-development-services/',                   permanent: true },
      { source: '/website-support-',                           destination: '/website-support-maintenance-services/',        permanent: true },
      { source: '/sitemap_index.xml',                          destination: '/sitemap/',                                     permanent: true },
      { source: '/index.php',                                  destination: '/',                                             permanent: true },

      // ── Old WordPress category pagination ─────────────────────────────────
      // (more specific patterns BEFORE the bare /content/ and /website/ redirects below)
      { source: '/ecommerce/page/:num/',      destination: '/ecommerce-website-development-services/', permanent: true },
      { source: '/ecommerce/page/:num',       destination: '/ecommerce-website-development-services/', permanent: true },
      { source: '/content/page/:num/',        destination: '/blog/',                          permanent: true },
      { source: '/content/page/:num',         destination: '/blog/',                          permanent: true },
      { source: '/local-seo/page/:num/',      destination: '/local-seo-services/',            permanent: true },
      { source: '/local-seo/page/:num',       destination: '/local-seo-services/',            permanent: true },
      { source: '/seo/page/:num*',            destination: '/blog/',                          permanent: true },
      { source: '/website/page/:num*',        destination: '/web-development-services/',      permanent: true },

      // bare /content/ and /website/ come AFTER the /page/:num patterns above
      { source: '/content',                   destination: '/content-marketing-services/',    permanent: true },
      { source: '/content/',                  destination: '/content-marketing-services/',    permanent: true },
      { source: '/website',                   destination: '/web-development-services/',      permanent: true },
      { source: '/website/',                  destination: '/web-development-services/',      permanent: true },

      // ── Old WordPress theme template URLs ─────────────────────────────────
      { source: '/wcf-template/:path*',       destination: '/',                               permanent: true },

      // ── WordPress junk URLs still being crawled by Googlebot ─────────────
      { source: '/wp-content/:path*',         destination: '/',                               permanent: true },
      { source: '/wp-admin/:path*',           destination: '/',                               permanent: true },
      { source: '/wp-login.php',              destination: '/',                               permanent: true },
      { source: '/aio',                       destination: '/blog/',                          permanent: true },
      { source: '/aio/',                      destination: '/blog/',                          permanent: true },
      // WordPress date-archive URLs: /2016/04/ or /2016/04/some-post
      { source: '/:year(\\d{4})/:month(\\d{2})/:slug*', destination: '/blog/',               permanent: true },
      { source: '/:year(\\d{4})/:month(\\d{2})/',       destination: '/blog/',               permanent: true },
      { source: '/:year(\\d{4})/:month(\\d{2})',        destination: '/blog/',               permanent: true },

      // ── Case study subpages ───────────────────────────────────────────────
      { source: '/case-studies/:slug',        destination: '/case-studies/',                  permanent: true },

      // ── Page renames ──────────────────────────────────────────────────────
      { source: '/hire-dedicated-web-designer',  destination: '/hire-web-designer/',             permanent: true },
      { source: '/hire-dedicated-web-designer/', destination: '/hire-web-designer/',            permanent: true },
      { source: '/hire-ui-ux-designer',       destination: '/hire-dedicated-ui-ux-designer',  permanent: true },
      { source: '/hire-ui-ux-designer/',      destination: '/hire-dedicated-ui-ux-designer/', permanent: true },
      { source: '/blockchain-development',    destination: '/hire-blockchain-developer',      permanent: true },
      { source: '/blockchain-development/',   destination: '/hire-blockchain-developer/',     permanent: true },
      { source: '/influencer-marketing',      destination: '/influencer-marketing-services',  permanent: true },
      { source: '/influencer-marketing/',     destination: '/influencer-marketing-services/', permanent: true },
      { source: '/contact',                   destination: '/contact-us',                     permanent: true },
      { source: '/contact/',                  destination: '/contact-us/',                    permanent: true },

      // ── Old WordPress URL → new Next.js slug ─────────────────────────────
      { source: '/social-media-marketing-services-company',  destination: '/social-media-marketing-services',  permanent: true },
      { source: '/social-media-marketing-services-company/', destination: '/social-media-marketing-services/', permanent: true },
      { source: '/google-penguin-recovery-services',         destination: '/penguin-recovery-service',         permanent: true },
      { source: '/google-penguin-recovery-services/',        destination: '/penguin-recovery-service/',        permanent: true },
      { source: '/seo-copywriting-services',                 destination: '/content-copywriting-services',     permanent: true },
      { source: '/seo-copywriting-services/',                destination: '/content-copywriting-services/',    permanent: true },
      { source: '/shopify-development-services',             destination: '/shopify-store-development',        permanent: true },
      { source: '/shopify-development-services/',            destination: '/shopify-store-development/',       permanent: true },
      { source: '/magento-development-services',             destination: '/magento-development-company',      permanent: true },
      { source: '/magento-development-services/',            destination: '/magento-development-company/',     permanent: true },
      { source: '/laravel-development-services',             destination: '/laravel-development-company',      permanent: true },
      { source: '/laravel-development-services/',            destination: '/laravel-development-company/',     permanent: true },
      { source: '/drupal-development-services',              destination: '/drupal-development-company',       permanent: true },
      { source: '/drupal-development-services/',             destination: '/drupal-development-company/',      permanent: true },
      { source: '/react-development-services',               destination: '/hire-reactjs-developer',           permanent: true },
      { source: '/react-development-services/',              destination: '/hire-reactjs-developer/',          permanent: true },
      { source: '/hire-react-developer',                     destination: '/hire-reactjs-developer',           permanent: true },
      { source: '/hire-react-developer/',                    destination: '/hire-reactjs-developer/',          permanent: true },
      { source: '/web-designing-services',                   destination: '/website-design',                   permanent: true },
      { source: '/web-designing-services/',                  destination: '/website-design/',                  permanent: true },
      { source: '/brand-identity-design-services',           destination: '/brand-identity',                   permanent: true },
      { source: '/brand-identity-design-services/',          destination: '/brand-identity/',                  permanent: true },
      { source: '/ui-ux-design-services',                    destination: '/hire-dedicated-ui-ux-designer',    permanent: true },
      { source: '/ui-ux-design-services/',                   destination: '/hire-dedicated-ui-ux-designer/',   permanent: true },
      { source: '/video-animation-services',                 destination: '/video-marketing-services',         permanent: true },
      { source: '/video-animation-services/',                destination: '/video-marketing-services/',        permanent: true },
      { source: '/seo-services',                             destination: '/seo-services-company',             permanent: true },
      { source: '/seo-services/',                            destination: '/seo-services-company/',            permanent: true },
      { source: '/ppc-services',                             destination: '/ppc-management-services',          permanent: true },
      { source: '/ppc-services/',                            destination: '/ppc-management-services/',         permanent: true },
      { source: '/about-us',                                 destination: '/who-we-are',                       permanent: true },
      { source: '/about-us/',                                destination: '/who-we-are/',                      permanent: true },
      { source: '/terms-and-conditions',                     destination: '/terms-of-use',                     permanent: true },
      { source: '/terms-and-conditions/',                    destination: '/terms-of-use/',                    permanent: true },
      { source: '/career',                                   destination: '/open-positions',                   permanent: true },
      { source: '/career/',                                  destination: '/open-positions/',                  permanent: true },
      { source: '/blogs',                                    destination: '/blog',                             permanent: true },
      { source: '/blogs/',                                   destination: '/blog/',                            permanent: true },
      { source: '/values',                                   destination: '/work-culture',                     permanent: true },
      { source: '/values/',                                  destination: '/work-culture/',                    permanent: true },
      { source: '/1solutions-difference',                    destination: '/who-we-are',                       permanent: true },
      { source: '/1solutions-difference/',                   destination: '/who-we-are/',                      permanent: true },

      // ── Blog post URL redirects ────────────────────────────────────────────
      { source: '/top-5-ecommerce-platform-to-build-your-ecommerce-store',   destination: '/best-ecommerce-platforms-guide', permanent: true },
      { source: '/top-5-ecommerce-platform-to-build-your-ecommerce-store/',  destination: '/best-ecommerce-platforms-guide', permanent: true },
      { source: '/top-5-ecommerce-platform-to-build-your-ecommerce-stores',  destination: '/best-ecommerce-platforms-guide', permanent: true },
      { source: '/top-5-ecommerce-platform-to-build-your-ecommerce-stores/', destination: '/best-ecommerce-platforms-guide', permanent: true },
      { source: '/Blogging-Tips-to-become-a-Traffic-Churning-Blogger',       destination: '/blogging-tips-to-become-a-traffic-churning-blogger', permanent: true },
      { source: '/Blogging-Tips-to-become-a-Traffic-Churning-Blogger/',      destination: '/blogging-tips-to-become-a-traffic-churning-blogger', permanent: true },
      { source: '/how-to-create-facebook-lookalike-audiences-2026-guide',    destination: '/how-to-create-facebook-lookalike-audiences/', permanent: true },
      { source: '/how-to-create-facebook-lookalike-audiences-2026-guide/',   destination: '/how-to-create-facebook-lookalike-audiences/', permanent: true },
      { source: '/e-commerce-platforms-2025-choosing-the-right-store-for-your-online-success',  destination: '/best-ecommerce-platforms-guide', permanent: true },
      { source: '/e-commerce-platforms-2025-choosing-the-right-store-for-your-online-success/', destination: '/best-ecommerce-platforms-guide', permanent: true },
      { source: '/complete-guide-to-google-shopping',  destination: '/complete-guide-google-shopping-feed', permanent: true },
      { source: '/complete-guide-to-google-shopping/', destination: '/complete-guide-google-shopping-feed', permanent: true },
      { source: '/best-hosting-provider-for-your-ecommerce-store',  destination: '/best-hosting-providers-for-your-ecommerce-store', permanent: true },
      { source: '/best-hosting-provider-for-your-ecommerce-store/', destination: '/best-hosting-providers-for-your-ecommerce-store', permanent: true },
      { source: '/10-essential-seo-techniques-for-e-commerce-websites',  destination: '/seo-techniques-for-ecommerce-websites', permanent: true },
      { source: '/10-essential-seo-techniques-for-e-commerce-websites/', destination: '/seo-techniques-for-ecommerce-websites', permanent: true },
      { source: '/10-seo-strategies-for-startups',  destination: '/seo-strategies-for-startups', permanent: true },
      { source: '/10-seo-strategies-for-startups/', destination: '/seo-strategies-for-startups', permanent: true },
      { source: '/Online-Reputation-Monitoring-Tips-For-Small-Business',  destination: '/online-reputation-monitoring-tips-for-small-business', permanent: true },
      { source: '/Online-Reputation-Monitoring-Tips-For-Small-Business/', destination: '/online-reputation-monitoring-tips-for-small-business', permanent: true },
      { source: '/21-must-wordpress-plugins-2016',  destination: '/21-must-have-wordpress-plugins', permanent: true },
      { source: '/21-must-wordpress-plugins-2016/', destination: '/21-must-have-wordpress-plugins', permanent: true },
      // ── Blog URL renames — Jul 2026 GSC batch ─────────────────────────────
      { source: '/how-to-set-up-and-install-the-meta-pixel-on-your-website',  destination: '/how-to-set-up-meta-pixel-on-your-website/', permanent: true },
      { source: '/how-to-set-up-and-install-the-meta-pixel-on-your-website/', destination: '/how-to-set-up-meta-pixel-on-your-website/', permanent: true },
      { source: '/security-measures-in-shopify-development-protecting-customer-data-and-building-trust',  destination: '/how-to-secure-your-shopify-store/', permanent: true },
      { source: '/security-measures-in-shopify-development-protecting-customer-data-and-building-trust/', destination: '/how-to-secure-your-shopify-store/', permanent: true },
      { source: '/how-to-fix-ghost-traffic-spam-traffic-in-google-analytics',  destination: '/how-to-identify-and-exclude-bot-traffic-from-google-analytics-4/', permanent: true },
      { source: '/how-to-fix-ghost-traffic-spam-traffic-in-google-analytics/', destination: '/how-to-identify-and-exclude-bot-traffic-from-google-analytics-4/', permanent: true },
      { source: '/how-to-secure-your-wordpress-website',  destination: '/how-to-secure-your-website/', permanent: true },
      { source: '/how-to-secure-your-wordpress-website/', destination: '/how-to-secure-your-website/', permanent: true },
      { source: '/advantages-magento-using-ecommerce-store-development',  destination: '/19-reasons-to-choose-magento-for-ecommerce-website-development/', permanent: true },
      { source: '/advantages-magento-using-ecommerce-store-development/', destination: '/19-reasons-to-choose-magento-for-ecommerce-website-development/', permanent: true },
      { source: '/happy-thanksgiving-wishes-for-friends-family-customers-and-more',  destination: '/why-is-thanksgiving-day-celebrated-history-importance-and-customs-explained/', permanent: true },
      { source: '/happy-thanksgiving-wishes-for-friends-family-customers-and-more/', destination: '/why-is-thanksgiving-day-celebrated-history-importance-and-customs-explained/', permanent: true },
      { source: '/11-must-have-wordpress-plugins-for-every-website',  destination: '/21-must-have-wordpress-plugins/', permanent: true },
      { source: '/11-must-have-wordpress-plugins-for-every-website/', destination: '/21-must-have-wordpress-plugins/', permanent: true },
      { source: '/what-is-hsts-and-why-i-should-implement-in-my-business',  destination: '/how-to-implement-http-strict-transport-security-hsts-policy-for-your-website/', permanent: true },
      { source: '/what-is-hsts-and-why-i-should-implement-in-my-business/', destination: '/how-to-implement-http-strict-transport-security-hsts-policy-for-your-website/', permanent: true },
      // ── Blog posts → service pages (GSC Jul 2026) ─────────────────────────
      { source: '/how-to-improve-your-conversion-rate-with-a-great-ux',  destination: '/conversion-rate-optimization-services/', permanent: true },
      { source: '/how-to-improve-your-conversion-rate-with-a-great-ux/', destination: '/conversion-rate-optimization-services/', permanent: true },
      { source: '/erpcommerce-vs-traditional-ecommerce',  destination: '/erp-application-development-company/', permanent: true },
      { source: '/erpcommerce-vs-traditional-ecommerce/', destination: '/erp-application-development-company/', permanent: true },
      { source: '/7-facebook-retargeting-mistakes-to-avoid-and-how-to-fix-them',  destination: '/facebook-management-services/', permanent: true },
      { source: '/7-facebook-retargeting-mistakes-to-avoid-and-how-to-fix-them/', destination: '/facebook-management-services/', permanent: true },
      { source: '/how-to-install-laravel-8-on-windows-10-xampp',  destination: '/laravel-development-company/', permanent: true },
      { source: '/how-to-install-laravel-8-on-windows-10-xampp/', destination: '/laravel-development-company/', permanent: true },

      { source: '/blog/:slug',          destination: '/:slug',       permanent: true },
      { source: '/blog/category/:slug', destination: '/:slug',       permanent: true },
      { source: '/blog/tag/:slug',      destination: '/tag/:slug',   permanent: true },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
          'https://midnightblue-lyrebird-831822.hostingersite.com/graphql',
      },
      // trailingSlash:true redirects POST /api/ai-generate → 308 /api/ai-generate/,
      // dropping the request body. Rewrite bypasses the redirect so the body is preserved.
      {
        source: '/api/ai-generate',
        destination: '/api/ai-generate/',
      },
    ];
  },
};

module.exports = nextConfig;
