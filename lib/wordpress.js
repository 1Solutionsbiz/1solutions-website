const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(endpoint, params = {}) {
  const url = new URL(`${API_URL}/${endpoint}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  })

  if (!res.ok) throw new Error(`WordPress API error: ${res.status} on ${endpoint}`)
  return res.json()
}

// ── Pages ──────────────────────────────────────────────
export async function getPageBySlug(slug) {
  const pages = await fetchAPI('pages', { slug, _embed: 1 })
  return pages[0] || null
}

// ── Posts (Blog) ───────────────────────────────────────
export async function getPosts({ perPage = 10, page = 1, category } = {}) {
  const params = { per_page: perPage, page, _embed: 1 }
  if (category) params.categories = category
  return fetchAPI('posts', params)
}

export async function getPostBySlug(slug) {
  const posts = await fetchAPI('posts', { slug, _embed: 1 })
  return posts[0] || null
}

// ── Custom Post Types ──────────────────────────────────
export async function getCaseStudies({ perPage = 10 } = {}) {
  return fetchAPI('case-studies', { per_page: perPage, _embed: 1 })
}

export async function getCaseStudyBySlug(slug) {
  const items = await fetchAPI('case-studies', { slug, _embed: 1 })
  return items[0] || null
}

export async function getServices() {
  return fetchAPI('services', { per_page: 100, _embed: 1 })
}

// ── Media ──────────────────────────────────────────────
export function getFeaturedImageUrl(post) {
  return post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
}

export function getExcerpt(post, maxLength = 160) {
  const raw = post?.excerpt?.rendered || post?.content?.rendered || ''
  const text = raw.replace(/<[^>]+>/g, '').trim()
  return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + '…' : text
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}
