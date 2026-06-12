import Head from 'next/head';
import Link from 'next/link';
import { getTagWithPosts, getCategories } from '../../lib/graphql';
import BlogCard from '../../components/blog/BlogCard';
import Pagination from '../../components/blog/Pagination';

export default function TagArchive({ tag, posts, pageInfo, categories }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';

  return (
    <>
      <Head>
        <title>{tag.name} - Blog | 1Solutions</title>
        <meta name="description" content={`Articles tagged with ${tag.name} from 1Solutions — ${tag.count} posts.`} />
        <link rel="canonical" href={`${siteUrl}/tag/${tag.slug}`} />
      </Head>

      {/* ── TAG HERO ── */}
      <section className="archive-hero tag-hero">
        <div className="archive-hero-container">
          <span className="archive-hero-badge cat-blue">Tag</span>
          <h1 className="archive-title">#{tag.name}</h1>
          {tag.description && <p className="archive-description">{tag.description}</p>}
          <div className="archive-hero-meta">
            <span className="archive-count">{tag.count} article{tag.count !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </section>

      {/* Related Topics */}
      <div className="archive-filters-bar">
        <div className="archive-filters-inner">
          <span className="filters-label">Browse by Topic:</span>
          <div className="filters">
            <Link href="/blog" className="filter-btn">All</Link>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`} className="filter-btn">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="blog-container">
        {posts.length > 0 ? (
          <>
            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <Pagination
              pageInfo={pageInfo}
              baseUrl={`/tag/${tag.slug}`}
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
    paths:    [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  try {
    const [tag, categories] = await Promise.all([
      getTagWithPosts(params.slug, { first: 9 }),
      getCategories({ first: 10 }),
    ]);

    if (!tag) return { notFound: true };

    return {
      props: {
        tag,
        posts:    tag.posts?.nodes || [],
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
