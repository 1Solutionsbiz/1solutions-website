/**
 * /api/search?q=keyword
 * Server-side search via WPGraphQL — avoids CORS from browser.
 */
import { searchPosts, stripHtml } from '../../lib/graphql';

export default async function handler(req, res) {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({ error: 'Query too short', posts: [] });
  }

  try {
    const data  = await searchPosts(q.trim(), 12);
    const posts = (data.nodes || []).map((p) => ({
      ...p,
      excerpt: stripHtml(p.excerpt),
    }));

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({ posts });
  } catch (err) {
    console.error('Search API error:', err);
    return res.status(500).json({ error: 'Search failed', posts: [] });
  }
}
