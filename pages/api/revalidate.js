/**
 * On-demand ISR revalidation
 * Called by WordPress when a post is published/updated.
 * WordPress plugin: WPGraphQL Smart Cache or a custom webhook.
 *
 * Usage: POST /api/revalidate
 * Body: { secret: "xxx", slug: "post-slug", type: "post" | "category" }
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { secret, slug, type } = req.body;

  if (secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' });
  }

  try {
    const paths = [];

    if (type === 'post' && slug) {
      paths.push(`/blog/${slug}`);
      paths.push('/blog');
    } else if (type === 'category' && slug) {
      paths.push(`/blog/category/${slug}`);
    }

    await Promise.all(paths.map((p) => res.revalidate(p)));

    return res.status(200).json({ revalidated: true, paths });
  } catch (err) {
    return res.status(500).json({ message: 'Revalidation failed', error: err.message });
  }
}
