import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getAuthorWithPosts } from '../../lib/graphql';
import BlogCard from '../../components/blog/BlogCard';
import Pagination from '../../components/blog/Pagination';

// Author social/contact mapping
const AUTHOR_LINKEDIN = {
  'atul-chaudhary':  'https://www.linkedin.com/in/atulchaudhary01/',
  'Atul Chaudhary':  'https://www.linkedin.com/in/atulchaudhary01/',
  'ritika':          'https://www.linkedin.com/company/1solutions',
  'Ritika':          'https://www.linkedin.com/company/1solutions',
};

const AUTHOR_TWITTER = {
  'atul-chaudhary': 'https://x.com/atulchaudhary01',
};

const AUTHOR_EMAIL = {
  'atul-chaudhary': 'atul@1solutions.biz',
  'ritika':         'ritika@1solutions.biz',
};

export default function AuthorPage({ author, posts, pageInfo, slug }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';
  const linkedin = AUTHOR_LINKEDIN[slug] || AUTHOR_LINKEDIN[author.name];
  const twitter  = AUTHOR_TWITTER[slug]  || AUTHOR_TWITTER[author.name];
  const email    = AUTHOR_EMAIL[slug]    || AUTHOR_EMAIL[author.name];
  const postCount = author.posts?.pageInfo
    ? posts.length
    : posts.length;

  return (
    <>
      <Head>
        <title>{author.name} — Author | 1Solutions Blog</title>
        <meta name="description" content={author.description || `Articles by ${author.name} on web development, SEO, and digital marketing.`} />
        <link rel="canonical" href={`${siteUrl}/author/${slug}`} />
        <meta property="og:title"       content={`${author.name} | 1Solutions`} />
        <meta property="og:description" content={author.description || `Read articles by ${author.name}`} />
        <meta property="og:type"        content="profile" />
        {author.avatar?.url && <meta property="og:image" content={author.avatar.url} />}
      </Head>

      {/* ── AUTHOR HERO ── */}
      <section className="author-archive-hero">
        <div className="author-archive-container">
          <div className="author-archive-avatar-wrap">
            {author.avatar?.url ? (
              <Image
                src={author.avatar.url}
                alt={author.name}
                width={120}
                height={120}
                className="author-archive-avatar"
                style={{ borderRadius: '50%', border: '4px solid var(--orange)' }}
                priority
              />
            ) : (
              <div className="author-archive-avatar-placeholder">
                {author.name?.charAt(0)}
              </div>
            )}
          </div>

          <div className="author-archive-info">
            <div className="author-archive-badge">Author</div>
            <h1 className="author-archive-name">{author.name}</h1>
            {author.description && (
              <p className="author-archive-bio">{author.description}</p>
            )}

            {/* Social links */}
            <div className="author-archive-socials">
              {author.url && (
                <a href={author.url} className="author-social-pill" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  Website
                </a>
              )}
              {linkedin && (
                <a href={linkedin} className="author-social-pill" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.043-8.811 0-9.726h3.554v1.375c.427-.659 1.191-1.597 2.898-1.597 2.117 0 3.704 1.384 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.748-1.915-1.686 0-.955.768-1.686 1.959-1.686 1.19 0 1.916.73 1.916 1.686 0 .938-.726 1.686-1.96 1.686zm1.6 11.019H3.738V9.726h3.199v10.726zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/></svg>
                  LinkedIn
                </a>
              )}
              {twitter && (
                <a href={twitter} className="author-social-pill" target="_blank" rel="noopener noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.694l-5.248-6.856-6.027 6.856H2.421l7.782-8.917L2.959 2.25h6.863l4.744 6.278 5.578-6.278z"/></svg>
                  X / Twitter
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="author-social-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Email
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── POSTS ── */}
      <div className="blog-container">
        <div className="author-posts-header">
          <h2 className="author-posts-title">Articles by {author.name}</h2>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <Pagination
              pageInfo={pageInfo}
              baseUrl={`/author/${slug}`}
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
    const author = await getAuthorWithPosts(params.slug, { first: 9 });
    if (!author) return { notFound: true };

    return {
      props: {
        author,
        posts:    author.posts?.nodes || [],
        pageInfo: author.posts?.pageInfo || null,
        slug:     params.slug,
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error('Author page error:', err);
    return { notFound: true };
  }
}
