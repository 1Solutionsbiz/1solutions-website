import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import {
  getPostBySlug, getAllPostSlugs, getRelatedPosts,
  formatDate, stripHtml, getCategoryColor, getReadingTime
} from '../lib/graphql';
import BlogCard from '../components/blog/BlogCard';

// Author social links mapping (update here)
const AUTHOR_LINKEDIN = {
  'atul@1solutions.biz': 'https://www.linkedin.com/in/atulchaudhary01/',
  'Atul Chaudhary': 'https://www.linkedin.com/in/atulchaudhary01/',
  'ritika@1solutions.biz': 'https://www.linkedin.com/company/1solutions',
  'Ritika': 'https://www.linkedin.com/company/1solutions',
};

const AUTHOR_EMAIL = {
  'atul@1solutions.biz': 'atul@1solutions.biz',
  'Atul Chaudhary': 'atul@1solutions.biz',
  'ritika@1solutions.biz': 'ritika@1solutions.biz',
  'Ritika': 'ritika@1solutions.biz',
};

const AUTHOR_WEBSITE = {
  'atul@1solutions.biz': 'https://www.1solutions.biz',
  'Atul Chaudhary': 'https://www.1solutions.biz',
  'ritika@1solutions.biz': 'https://www.1solutions.biz',
  'Ritika': 'https://www.1solutions.biz',
};

export default function SinglePost({ post, relatedPosts }) {
  const tocRef     = useRef(null);
  const contentRef = useRef(null);

  const cat      = post.categories?.nodes?.[0];
  const catColor = cat ? getCategoryColor(cat.slug) : 'cat-orange';
  const siteUrl  = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.1solutions.biz';
  const postUrl  = `${siteUrl}/${post.slug}`;

  // Auto-generate TOC from h2/h3 in article content
  useEffect(() => {
    const toc     = tocRef.current;
    const content = contentRef.current;
    if (!toc || !content) return;

    const headings = content.querySelectorAll('h2, h3');
    toc.innerHTML  = '';

    headings.forEach((h, i) => {
      if (!h.id) h.id = `heading-${i}-${h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

      const a       = document.createElement('a');
      a.href        = `#${h.id}`;
      a.textContent = h.textContent;
      a.className   = h.tagName === 'H3' ? 'toc-h3' : 'toc-h2';

      a.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      toc.appendChild(a);
    });

    // Active TOC item on scroll
    const links = toc.querySelectorAll('a');
    const onScroll = () => {
      const scrollPos = window.scrollY + 120;
      let active = null;
      headings.forEach((h, i) => { if (h.offsetTop <= scrollPos) active = links[i]; });
      links.forEach((l) => l.classList.toggle('toc-active', l === active));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [post.slug]);

  // Mobile TOC toggle
  const handleTocToggle = () => {
    const sidebar = document.getElementById('post-sidebar');
    const btn     = document.getElementById('toc-toggle');
    if (!sidebar || !btn) return;
    const open = sidebar.classList.toggle('active');
    btn.textContent = open ? '✕ Close' : '☰ Table of Contents';
  };

  // Copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl).catch(() => {});
  };

  const seoTitle       = post.seo?.title       || `${post.title} | 1Solutions`;
  const seoDescription = post.seo?.metaDesc    || stripHtml(post.excerpt).slice(0, 160);
  const seoImage       = post.seo?.opengraphImage?.sourceUrl || post.featuredImage?.node?.sourceUrl;

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={post.seo?.canonical || postUrl} />
        {/* Open Graph */}
        <meta property="og:title"       content={post.seo?.opengraphTitle || seoTitle} />
        <meta property="og:description" content={post.seo?.opengraphDescription || seoDescription} />
        <meta property="og:url"         content={postUrl} />
        <meta property="og:type"        content="article" />
        {seoImage && <meta property="og:image" content={seoImage} />}
        {/* Article meta */}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time"  content={post.modified} />
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context':         'https://schema.org',
            '@type':            'Article',
            headline:           post.title,
            description:        seoDescription,
            datePublished:      post.date,
            dateModified:       post.modified,
            author:             { '@type': 'Person', name: post.author?.node?.name },
            publisher:          { '@type': 'Organization', name: '1Solutions', logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo.png` } },
            mainEntityOfPage:   { '@type': 'WebPage', '@id': postUrl },
            ...(seoImage ? { image: { '@type': 'ImageObject', url: seoImage } } : {}),
          }) }}
        />
      </Head>

      <div className="single-post-wrapper">
        <div className="single-post-layout">

          {/* ── ARTICLE ── */}
          <main className="post-article" id="main-content">

            <button className="toc-toggle" id="toc-toggle" onClick={handleTocToggle} aria-expanded="false">
              ☰ Table of Contents
            </button>

            {/* Breadcrumb */}
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blog">Blog</Link>
              {cat && (<><span>/</span><Link href={`/blog/category/${cat.slug}`}>{cat.name}</Link></>)}
              <span>/</span>
              <span className="breadcrumb-current">{post.title}</span>
            </nav>

            {/* Header */}
            <header className="article-header">
              {cat && (
                <Link href={`/blog/category/${cat.slug}`} className={`article-category-badge ${catColor}`}>
                  {cat.name}
                </Link>
              )}
              <h1 className="article-title">{post.title}</h1>
              <div className="article-meta">
                <div className="article-author-meta">
                  {post.author?.node?.avatar?.url && (
                    <Image
                      src={post.author.node.avatar.url}
                      alt={post.author.node.name}
                      width={36} height={36}
                      className="author-avatar-sm"
                      style={{ borderRadius: '50%' }}
                    />
                  )}
                  <span className="author-meta-name">{post.author?.node?.name}</span>
                </div>
                <time className="meta-date" dateTime={post.date}>{formatDate(post.date)}</time>
                {post.readingTime && <span className="meta-read-time">⏱ {post.readingTime}</span>}
                <div className="article-share" aria-label="Share">
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`} className="share-btn share-linkedin" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.043-8.811 0-9.726h3.554v1.375c.427-.659 1.191-1.597 2.898-1.597 2.117 0 3.704 1.384 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.748-1.915-1.686 0-.955.768-1.686 1.959-1.686 1.19 0 1.916.73 1.916 1.686 0 .938-.726 1.686-1.96 1.686zm1.6 11.019H3.738V9.726h3.199v10.726zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/></svg>
                  </a>
                  <a href={`https://x.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`} className="share-btn share-x" target="_blank" rel="noopener noreferrer" aria-label="Share on X">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.694l-5.248-6.856-6.027 6.856H2.421l7.782-8.917L2.959 2.25h6.863l4.744 6.278 5.578-6.278z"/></svg>
                  </a>
                  <button className="share-btn share-copy" onClick={handleCopyLink} aria-label="Copy link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  </button>
                </div>
              </div>
            </header>

            {/* Featured image */}
            {post.featuredImage?.node && (
              <div className="article-featured-image">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  width={1200} height={480}
                  style={{ width: '100%', height: '480px', objectFit: 'cover' }}
                  priority
                />
              </div>
            )}

            {/* Article body */}
            <div
              className="article-content"
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags?.nodes?.length > 0 && (
              <div className="article-tags">
                <span className="tags-label">Tags:</span>
                {post.tags.nodes.map((tag) => (
                  <Link key={tag.slug} href={`/blog/tag/${tag.slug}`} className="article-tag-link">
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Author box */}
            {post.author?.node && (
              <div className="author-box">
                <div className="author-box-avatar">
                  {post.author.node.avatar?.url && (
                    <Image
                      src={post.author.node.avatar.url}
                      alt={post.author.node.name}
                      width={80} height={80}
                      className="author-avatar-lg"
                      style={{ borderRadius: '50%' }}
                    />
                  )}
                </div>
                <div className="author-box-content">
                  <h4>{post.author.node.name}</h4>
                  {post.author.node.description && (
                    <p className="author-bio">{post.author.node.description}</p>
                  )}
                  {(AUTHOR_WEBSITE[post.author.node.name] || AUTHOR_EMAIL[post.author.node.name] || AUTHOR_LINKEDIN[post.author.node.name]) && (
                    <div className="author-social-links">
                      {AUTHOR_WEBSITE[post.author.node.name] && (
                        <a href={AUTHOR_WEBSITE[post.author.node.name]} className="author-social-link" target="_blank" rel="noopener noreferrer" aria-label="Website">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        </a>
                      )}
                      {AUTHOR_EMAIL[post.author.node.name] && (
                        <a href={`mailto:${AUTHOR_EMAIL[post.author.node.name]}`} className="author-social-link" aria-label="Email">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </a>
                      )}
                      {AUTHOR_LINKEDIN[post.author.node.name] && (
                        <a href={AUTHOR_LINKEDIN[post.author.node.name]} className="author-social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.25-.129.599-.129.948v5.439h-3.554s.043-8.811 0-9.726h3.554v1.375c.427-.659 1.191-1.597 2.898-1.597 2.117 0 3.704 1.384 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.748-1.915-1.686 0-.955.768-1.686 1.959-1.686 1.19 0 1.916.73 1.916 1.686 0 .938-.726 1.686-1.96 1.686zm1.6 11.019H3.738V9.726h3.199v10.726zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/></svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Related articles */}
            {relatedPosts?.length > 0 && (
              <section className="related-articles" aria-label="Related articles">
                <h3 className="related-title">Related Articles</h3>
                <div className="related-grid">
                  {relatedPosts.map((rp) => {
                    const rpCat  = rp.categories?.nodes?.[0];
                    const rpColor = rpCat ? getCategoryColor(rpCat.slug) : 'cat-blue';
                    return (
                      <article key={rp.slug} className="related-card">
                        {rp.featuredImage?.node && (
                          <Link href={`/${rp.slug}`} className="related-card-img-wrap">
                            <Image
                              src={rp.featuredImage.node.sourceUrl}
                              alt={rp.featuredImage.node.altText || rp.title}
                              width={400}
                              height={200}
                              className="related-card-img"
                            />
                          </Link>
                        )}
                        <div className="related-card-body">
                        <h4><Link href={`/${rp.slug}`}>{rp.title}</Link></h4>
                        {rp.excerpt && (
                          <p className="related-card-excerpt">
                            {stripHtml(rp.excerpt).slice(0, 90).trim()}{stripHtml(rp.excerpt).length > 90 ? '…' : ''}
                          </p>
                        )}
                        <div className="related-card-footer">
                          {rp.author?.node && (
                            <div className="related-card-author">
                              {rp.author.node.avatar?.url && (
                                <Image
                                  src={rp.author.node.avatar.url}
                                  alt={rp.author.node.name}
                                  width={20}
                                  height={20}
                                  className="related-author-avatar"
                                />
                              )}
                              <span className="related-author-name">{rp.author.node.name}</span>
                            </div>
                          )}
                          <div className="related-card-meta">
                            {formatDate(rp.date)}{rp.readingTime ? ` · ${rp.readingTime}` : ''}
                          </div>
                        </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

          </main>

          {/* ── SIDEBAR ── */}
          <aside className="post-sidebar" id="post-sidebar">

            {/* TOC */}
            <div className="toc-widget">
              <div className="toc-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                TABLE OF CONTENTS
              </div>
              <nav className="toc-list" ref={tocRef} aria-label="Table of contents" />
            </div>

            {/* Newsletter */}
            <div className="sidebar-newsletter">
              <div className="newsletter-header">
                <div className="newsletter-icon">✉</div>
                <h4>Weekly Insights</h4>
              </div>
              <p>Get the latest in web development, SEO, and digital marketing — every Tuesday.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="newsletter-btn">Subscribe →</button>
              </form>
            </div>

            {/* CTA */}
            <div className="sidebar-cta">
              <div className="sidebar-cta-badge">1Solutions</div>
              <h4>Ready to Grow Your Business Online?</h4>
              <p>16+ years building digital products and driving measurable growth worldwide.</p>
              <ul className="sidebar-cta-features">
                <li>✓ Web Development</li>
                <li>✓ SEO &amp; Digital Marketing</li>
                <li>✓ Dedicated Resource Teams</li>
              </ul>
              <Link href="/#contact" className="sidebar-cta-btn">Book Free Consultation →</Link>
            </div>

          </aside>

        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const slugs = await getAllPostSlugs();
    return {
      paths:    slugs.map((slug) => ({ params: { slug } })),
      fallback: 'blocking',
    };
  } catch (err) {
    console.error('getStaticPaths [slug] error:', err);
    // Don't pre-build any paths at build time — generate on demand
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) return { notFound: true };

    // Calculate reading time from content
    post.readingTime = getReadingTime(post.content);

    const primaryCatSlug = post.categories?.nodes?.[0]?.slug;
    const relatedRaw = primaryCatSlug
      ? await getRelatedPosts(primaryCatSlug, params.slug, 3)
      : [];
    const related = relatedRaw.map((rp) => {
      const { content, ...rest } = rp;
      return { ...rest, readingTime: content ? getReadingTime(content) : null };
    });

    return {
      props:      { post, relatedPosts: related },
      revalidate: 3600,
    };
  } catch (err) {
    console.error('Single post error:', err);
    return { notFound: true };
  }
}
