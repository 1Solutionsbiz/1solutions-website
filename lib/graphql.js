/**
 * 1Solutions — WordPress GraphQL Client
 * All WPGraphQL queries for blog, categories, search, case studies.
 *
 * WordPress endpoint: process.env.NEXT_PUBLIC_WORDPRESS_API_URL
 */

const WP_API = process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  'https://midnightblue-lyrebird-831822.hostingersite.com/graphql';

/* ============================================================
   CORE FETCHER
   ============================================================ */
export async function fetchGraphQL(query, variables = {}) {
  const res = await fetch(WP_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 }, // ISR — revalidate every hour
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    // Log errors but return partial data if available (don't crash the page)
    console.error('GraphQL Errors:', JSON.stringify(json.errors));
  }

  return json.data || {};
}

/* ============================================================
   FRAGMENTS
   ============================================================ */
const POST_CARD_FIELDS = `
  fragment PostCardFields on Post {
    id
    databaseId
    title
    slug
    excerpt
    date
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    categories {
      nodes { id name slug }
    }
    tags {
      nodes { id name slug }
    }
    author {
      node {
        name
        avatar { url }
      }
    }
  }
`;

const POST_FULL_FIELDS = `
  fragment PostFullFields on Post {
    id
    databaseId
    title
    slug
    excerpt
    content
    date
    modified
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    categories {
      nodes { id name slug }
    }
    tags {
      nodes { id name slug }
    }
    author {
      node {
        name
        slug
        description
        url
        email
        avatar { url }
        userId
      }
    }
  }
`;

/* ============================================================
   1. BLOG LISTING — paginated posts
   ============================================================ */
export async function getPosts({ first = 9, after = null, categorySlug = null } = {}) {
  const query = `
    ${POST_CARD_FIELDS}
    query GetPosts($first: Int!, $after: String, $categorySlug: String) {
      posts(
        first: $first
        after: $after
        where: {
          status: PUBLISH
          categoryName: $categorySlug
          orderby: { field: DATE, order: DESC }
        }
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        nodes {
          ...PostCardFields
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { first, after, categorySlug });
  return data.posts;
}

/* ============================================================
   2. FEATURED POST — latest single post for hero
   ============================================================ */
export async function getFeaturedPost() {
  const query = `
    ${POST_CARD_FIELDS}
    query GetFeaturedPost {
      posts(first: 1, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes { ...PostCardFields }
      }
    }
  `;
  const data = await fetchGraphQL(query);
  return data.posts.nodes[0] || null;
}

/* ============================================================
   3. SINGLE POST by slug
   ============================================================ */
export async function getPostBySlug(slug) {
  const query = `
    ${POST_FULL_FIELDS}
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        ...PostFullFields
      }
    }
  `;
  const data = await fetchGraphQL(query, { slug });
  return data.post;
}

/* ============================================================
   4. ALL POST SLUGS — for getStaticPaths
   ============================================================ */
export async function getAllPostSlugs() {
  const query = `
    query GetAllPostSlugs {
      posts(first: 1000, where: { status: PUBLISH }) {
        nodes { slug }
      }
    }
  `;
  const data = await fetchGraphQL(query);
  return data?.posts?.nodes?.map((p) => p.slug) || [];
}

/* ============================================================
   5. RELATED POSTS — same category, exclude current
   ============================================================ */
export async function getRelatedPosts(categorySlug, excludeSlug, count = 3) {
  const query = `
    ${POST_CARD_FIELDS}
    query GetRelatedPosts($categorySlug: String!, $first: Int!) {
      posts(
        first: $first
        where: { status: PUBLISH, categoryName: $categorySlug, orderby: { field: DATE, order: DESC } }
      ) {
        nodes {
          ...PostCardFields
          content
        }
      }
    }
  `;
  const data = await fetchGraphQL(query, { categorySlug, first: count + 1 });
  return data.posts.nodes.filter((p) => p.slug !== excludeSlug).slice(0, count);
}

/* ============================================================
   6. ALL CATEGORIES
   ============================================================ */
export async function getCategories({ first = 20 } = {}) {
  const query = `
    query GetCategories($first: Int!) {
      categories(first: $first, where: { hideEmpty: true }) {
        nodes {
          id
          databaseId
          name
          slug
          description
          count
        }
      }
    }
  `;
  const data = await fetchGraphQL(query, { first });
  return data?.categories?.nodes || [];
}

/* ============================================================
   7. SINGLE CATEGORY by slug + its posts
   ============================================================ */
export async function getCategoryWithPosts(slug, { first = 9, after = null } = {}) {
  const query = `
    ${POST_CARD_FIELDS}
    query GetCategoryWithPosts($slug: ID!, $first: Int!, $after: String) {
      category(id: $slug, idType: SLUG) {
        id
        name
        slug
        description
        count
        posts(first: $first, after: $after, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes { ...PostCardFields }
        }
      }
    }
  `;
  const data = await fetchGraphQL(query, { slug, first, after });
  return data.category;
}

/* ============================================================
   8. ALL CATEGORY SLUGS — for getStaticPaths
   ============================================================ */
export async function getAllCategorySlugs() {
  const query = `
    query GetAllCategorySlugs {
      categories(first: 100, where: { hideEmpty: true }) {
        nodes { slug }
      }
    }
  `;
  const data = await fetchGraphQL(query);
  return data?.categories?.nodes?.map((c) => c.slug) || [];
}

/* ============================================================
   9. SEARCH
   ============================================================ */
export async function searchPosts(searchTerm, first = 12) {
  const query = `
    ${POST_CARD_FIELDS}
    query SearchPosts($search: String!, $first: Int!) {
      posts(
        first: $first
        where: { search: $search, status: PUBLISH, orderby: { field: DATE, order: DESC } }
      ) {
        pageInfo { hasNextPage endCursor }
        nodes { ...PostCardFields }
      }
    }
  `;
  const data = await fetchGraphQL(query, { search: searchTerm, first });
  return data.posts;
}

/* ============================================================
   10. AUTHOR by slug + their posts
   ============================================================ */
export async function getAuthorWithPosts(slug, { first = 9, after = null } = {}) {
  const query = `
    ${POST_CARD_FIELDS}
    query GetAuthorWithPosts($slug: ID!, $first: Int!, $after: String) {
      user(id: $slug, idType: SLUG) {
        id
        name
        description
        url
        avatar { url }
        posts(first: $first, after: $after, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
          pageInfo { hasNextPage endCursor }
          nodes { ...PostCardFields }
        }
      }
    }
  `;
  const data = await fetchGraphQL(query, { slug, first, after });
  return data.user;
}

/* ============================================================
   11. TAGS
   ============================================================ */
export async function getTagWithPosts(slug, { first = 9, after = null } = {}) {
  const query = `
    ${POST_CARD_FIELDS}
    query GetTagWithPosts($slug: ID!, $first: Int!, $after: String) {
      tag(id: $slug, idType: SLUG) {
        id
        name
        slug
        description
        count
        posts(first: $first, after: $after, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
          pageInfo { hasNextPage endCursor }
          nodes { ...PostCardFields }
        }
      }
    }
  `;
  const data = await fetchGraphQL(query, { slug, first, after });
  return data.tag;
}

/* ============================================================
   12. CASE STUDIES (Custom Post Type)
   ============================================================ */
export async function getCaseStudies(first = 9) {
  const query = `
    query GetCaseStudies($first: Int!) {
      caseStudies(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          databaseId
          title
          slug
          excerpt
          date
          featuredImage {
            node { sourceUrl altText }
          }
        }
      }
    }
  `;
  const data = await fetchGraphQL(query, { first });
  return data.caseStudies?.nodes || [];
}

/* ============================================================
   13. TESTIMONIALS
   ============================================================ */
export async function getTestimonials(first = 20) {
  const query = `
    query GetTestimonials($first: Int!) {
      testimonials(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          title
          content
          featuredImage {
            node { sourceUrl altText }
          }
        }
      }
    }
  `;
  const data = await fetchGraphQL(query, { first });
  return data.testimonials?.nodes || [];
}

/* ============================================================
   14. FAQS
   ============================================================ */
export async function getFaqs(first = 50) {
  const query = `
    query GetFaqs($first: Int!) {
      faqs(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          title
          content
        }
      }
    }
  `;
  const data = await fetchGraphQL(query, { first });
  return data.faqs?.nodes || [];
}

/* ============================================================
   HELPERS
   ============================================================ */

/** Estimate reading time from HTML content string */
export function getReadingTime(content) {
  if (!content) return '1 min read';
  const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200)) + ' min read';
}

/** Format WP date → "Jun 4, 2026" */
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

/** Strip HTML tags from excerpt */
export function stripHtml(html) {
  return html?.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ').trim() || '';
}

/** Map category slug → CSS colour class */
export function getCategoryColor(slug) {
  const map = {
    'seo':               'cat-orange',
    'digital-marketing': 'cat-blue',
    'social-media':      'cat-purple',
    'ecommerce':         'cat-cyan',
    'wordpress':         'cat-blue',
    'ai':                'cat-purple',
    'development':       'cat-green',
    'link-building':     'cat-orange',
    'local-seo':         'cat-green',
    'latest-articles':   'cat-blue',
    'news':              'cat-cyan',
    'shopify':           'cat-green',
    'strategy':          'cat-purple',
  };
  return map[slug] || 'cat-orange';
}
