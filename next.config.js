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
  // Don't block builds on lint errors — we fix them separately
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
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
    ];
  },

  async redirects() {
    return [
      // ── Page renames ──────────────────────────────────────────────────────
      { source: '/hire-ui-ux-designer',       destination: '/hire-dedicated-ui-ux-designer',  permanent: true },
      { source: '/hire-ui-ux-designer/',      destination: '/hire-dedicated-ui-ux-designer/', permanent: true },
      { source: '/influencer-marketing',      destination: '/influencer-marketing-services',  permanent: true },
      { source: '/influencer-marketing/',     destination: '/influencer-marketing-services/', permanent: true },
      { source: '/contact',                   destination: '/contact-us',                     permanent: true },
      { source: '/contact/',                  destination: '/contact-us/',                    permanent: true },

      // ── Old WordPress URL → new Next.js slug ─────────────────────────────
      { source: '/social-media-marketing-services-company',  destination: '/social-media-marketing-services',  permanent: true },
      { source: '/social-media-marketing-services-company/', destination: '/social-media-marketing-services/', permanent: true },
      { source: '/google-penguin-recovery-services',         destination: '/penguin-recovery-service',         permanent: true },
      { source: '/google-penguin-recovery-services/',        destination: '/penguin-recovery-service/',        permanent: true },
      { source: '/link-building-services',                   destination: '/link-building-packages',           permanent: true },
      { source: '/link-building-services/',                  destination: '/link-building-packages/',          permanent: true },
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
    ];
  },
};

module.exports = nextConfig;
