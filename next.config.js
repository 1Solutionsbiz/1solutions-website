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
      // Redirect old /blog/[slug] post URLs to /[slug] (301 permanent for SEO)
      // Note: only matches single-segment paths — /blog/category/x, /blog/tag/x etc are unaffected
      {
        source: '/blog/:slug',
        destination: '/:slug',
        permanent: true,
      },
      // Redirect old /blog/category/[slug] to /[slug]
      {
        source: '/blog/category/:slug',
        destination: '/:slug',
        permanent: true,
      },
      // Redirect old /blog/tag/[slug] to /tag/[slug]
      {
        source: '/blog/tag/:slug',
        destination: '/tag/:slug',
        permanent: true,
      },
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
