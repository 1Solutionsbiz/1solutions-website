import Head from 'next/head';
import Link from 'next/link';
import { getCategoryWithPosts, getAllCategorySlugs, getCategories, getCategoryColor } from '../../../lib/graphql';
import BlogCard from '../../../components/blog/BlogCard';
import Pagination from '../../../components/blog/Pagination';

export default function CategoryPage({ category, posts, pageInfo, allCategories, currentAfter }) {
  const color    = getCategoryColor(category.slug);
  const siteUrl  = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';

  return (
    <>
      <Head>
        <title>{category.name} Articles | 1Solutions Blog</title>
        <meta name="description" content={category.description || `Browse all ${category.name} articles from 1Solutions — ${category.count} posts.`} />
        <link rel="canonical" href={`${siteUrl}/blog/category/${category.slug}`} />
      </Head>

      {/* Category Hero */}
      <section className="archive-hero category-hero">
        <div className="archive-hero-container">
          <div className={`archive-hero-badge ${color}`}>Category</div>
          <h1>{category.name}</h1>
          {category.description && <p>{category.description}</p>}
          <div className="archive-hero-meta">
            <span className="archive-count">{category.count} Articles</span>
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <div className="archive-filters-bar">
        <div className="archive-filters-inner">
          <span className="filters-label">Related Topics:</span>
          <div className="filters">
            <Link href="/blog" className="filter-btn">All</Link>
            {allCategories
              .filter((c) => c.slug !== category.slug)
              .slice(0, 8)
              .map((c) => (
                <Link key={c.slug} href={`/blog/category/${c.slug}`} className="filter-btn">
                  {c.name}
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
              baseUrl={`/blog/category/${category.slug}`}
              currentCursor={currentAfter}
            />
          </>
        ) : (
          <div className="no-posts">
            <h2>No articles in this category yet.</h2>
            <Link href="/blog" className="read-more-btn">← All Articles</Link>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const slugs = await getAllCategorySlugs();
    return {
      paths:    slugs.map((slug) => ({ params: { slug } })),
      fallback: 'blocking',
    };
  } catch (err) {
    console.error('getStaticPaths category error:', err);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const [category, allCategories] = await Promise.all([
      getCategoryWithPosts(params.slug, { first: 9 }),
      getCategories({ first: 12 }),
    ]);

    if (!category) return { notFound: true };

    return {
      props: {
        category,
        posts:        category.posts?.nodes || [],
        pageInfo:     category.posts?.pageInfo || null,
        allCategories,
        currentAfter: null,
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error('Category page error:', err);
    return { notFound: true };
  }
}
