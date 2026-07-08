/**
 * Bulk ISR cache purge — revalidates every blog post, category, and listing page.
 * Usage: POST /api/revalidate-all   Body: { "secret": "..." }
 *   or   GET  /api/revalidate-all?secret=...
 */

const WP_API =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  'https://midnightblue-lyrebird-831822.hostingersite.com/graphql';

async function fetchAllSlugs() {
  const query = `
    query BulkSlugs {
      posts(first: 1000, where: { status: PUBLISH }) {
        nodes { slug }
      }
      categories(first: 100, where: { hideEmpty: true }) {
        nodes { slug }
      }
    }
  `;
  const res = await fetch(WP_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  return {
    postSlugs:     json.data?.posts?.nodes?.map((p) => p.slug) || [],
    categorySlugs: json.data?.categories?.nodes?.map((c) => c.slug) || [],
  };
}

export default async function handler(req, res) {
  const secret =
    req.method === 'POST' ? req.body?.secret : req.query?.secret;

  const validSecret =
    process.env.REVALIDATE_SECRET || process.env.REVALIDATION_SECRET;

  if (!validSecret || secret !== validSecret) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    const { postSlugs, categorySlugs } = await fetchAllSlugs();

    const paths = [
      '/blog',
      '/blog/page/1',
      ...postSlugs.map((s) => `/${s}`),
      ...categorySlugs.map((s) => `/${s}`),
    ];

    // Revalidate in parallel batches of 20 to avoid overwhelming Vercel
    const BATCH = 20;
    const results = [];
    for (let i = 0; i < paths.length; i += BATCH) {
      const batch = paths.slice(i, i + BATCH);
      await Promise.all(
        batch.map((p) =>
          res.revalidate(p).then(() => results.push({ path: p, ok: true })).catch(() => results.push({ path: p, ok: false }))
        )
      );
    }

    const failed = results.filter((r) => !r.ok).map((r) => r.path);
    return res.status(200).json({
      revalidated: results.filter((r) => r.ok).length,
      failed: failed.length,
      failedPaths: failed,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Revalidation failed', error: err.message });
  }
}
