/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'midnightblue-lyrebird-831822.hostingersite.com',
      },
      {
        protocol: 'https',
        hostname: 'www.1solutions.biz',
      },
      {
        protocol: 'https',
        hostname: '1solutions.biz',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://midnightblue-lyrebird-831822.hostingersite.com/graphql',
      },
    ];
  },
};

module.exports = nextConfig;
