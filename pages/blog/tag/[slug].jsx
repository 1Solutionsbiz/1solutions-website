import Head from 'next/head';
import Link from 'next/link';
import { getTagWithPosts, getCategories, formatDate, stripHtml } from '../../../lib/graphql';
import BlogCard from '../../../components/blog/BlogCard';
import Pagination from '../../../components/blog/Pagination';

export default function TagArchive({ tag, posts, pageInfo, categories }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';

  return (
    <>
      <Head>
        <title>{tag.name} - Blog | 1Solutions</title>
        <meta name="description" content={`Articles tagged with ${tag.name}`} />
        <link rel="canonical" href={`${siteUrl}/blog/tag/${tag.slug}`} />
      </Head>

      {/* ── TAG HERO ── */}
      <section className="archive-hero tag-hero">
        <div className="archive-hero-container">
          <span className="archive-hero-badge">Tag</span>
          <h1 className="archive-title">#{tag.name}</h1>
          <p className="archive-description">{tag.count} article{tag.count !== 1 ? 's' : ''}</p>
        </div>
      </section>

      <div className="blog-container">
        {/* ── FILTERS ── */}
        <div className="filters-section">
          <p className="filters-label">Browse by Topic</p>
          <div className="filters">
            <Link href="/blog" className="filter-btn">All</Link>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`} className="filter-btn">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* ── BLOG GRID ── */}
        {posts.length > 0 ? (
          <>
            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <Pagination
              pageInfo={pageInfo}
              baseUrl={`/blog/tag/${tag.slug}`}
            />
          </>
        ) : (
          <div className="no-posts">
            <h2>No articles found.</h2>
            <Link href="/blog" className="read-more-btn">← Back to Blog</Link>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  try {
    const [tag, categories] = await Promise.all([
      getTagWithPosts(params.slug, { first: 9 }),
      getCategories({ first: 10 }),
    ]);

    if (!tag) {
      return { notFound: true };
    }

    const posts = tag.posts?.nodes || [];

    return {
      props: {
        tag,
        posts,
        pageInfo: tag.posts?.pageInfo || null,
        categories: categories || [],
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error('Tag archive error:', err);
    return { notFound: true };
  }
}
