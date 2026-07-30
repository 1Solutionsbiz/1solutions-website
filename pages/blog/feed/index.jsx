import { getPosts, stripHtml } from '../../../lib/graphql';

const SITE = 'https://www.1solutions.biz';
const FEED_URL = `${SITE}/blog/feed`;

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;');
}

function buildFeed(posts) {
  const now = new Date().toUTCString();

  const items = posts.map((post) => {
    // No trailing slash — matches the post's own canonical (pages/[slug].jsx).
    const link = `${SITE}/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();
    const description = stripHtml(post.excerpt).slice(0, 500);
    const categories = (post.categories?.nodes || [])
      .map((c) => `\n      <category>${escapeXml(c.name)}</category>`)
      .join('');

    return `
    <item>
      <title>${escapeXml(stripHtml(post.title))}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>${post.author?.node?.name ? `
      <dc:creator>${escapeXml(post.author.node.name)}</dc:creator>` : ''}
      <description>${escapeXml(description)}</description>${categories}
    </item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>1Solutions Blog</title>
    <link>${SITE}/blog</link>
    <description>Web development, digital marketing, and SEO insights from 1Solutions.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}

function FeedXML() { return null; }

export async function getServerSideProps({ res }) {
  let posts = [];
  try {
    const data = await getPosts({ first: 30 });
    posts = data?.nodes || [];
  } catch {
    posts = [];
  }

  const xml = buildFeed(posts);

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
  res.write(xml);
  res.end();

  return { props: {} };
}

export default FeedXML;
