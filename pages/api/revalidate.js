/**
 * On-demand ISR revalidation
 * Called by WordPress when a post is published/updated.
 * WordPress plugin: WPGraphQL Smart Cache or a custom webhook.
 *
 * Usage: POST /api/revalidate
 * Body: { secret: "xxx", slug: "post-slug", type: "post" | "category" }
 *   or: { secret: "xxx", path: "/blog/page/3" }  ← direct path revalidation
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { secret, slug, type, path } = req.body

  const validSecret = process.env.REVALIDATE_SECRET || process.env.REVALIDATION_SECRET
  if (secret !== validSecret) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  try {
    const paths = []

    if (path) {
      // Direct path revalidation — e.g. /blog/page/3
      paths.push(path)
    } else if (type === 'post' && slug) {
      paths.push(`/${slug}`)
      paths.push('/blog')
      paths.push('/blog/page/1')
    } else if (type === 'category' && slug) {
      paths.push(`/${slug}`)
    } else if (type === 'tag' && slug) {
      paths.push(`/tag/${slug}`)
    } else if (type === 'author' && slug) {
      paths.push(`/author/${slug}`)
    } else if (type === 'blog-page' && slug) {
      paths.push(`/blog/page/${slug}`)
    }

    if (paths.length === 0) {
      return res.status(400).json({ message: 'No paths to revalidate' })
    }

    await Promise.all(paths.map((p) => res.revalidate(p)))

    return res.status(200).json({ revalidated: true, paths })
  } catch (err) {
    return res.status(500).json({ message: 'Revalidation failed', error: err.message })
  }
}
