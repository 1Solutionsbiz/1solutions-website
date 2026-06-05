import Image from 'next/image';
import Link from 'next/link';
import { formatDate, stripHtml, getCategoryColor, getReadingTime } from '../../lib/graphql';

export default function BlogCard({ post }) {
  const cat     = post.categories?.nodes?.[0];
  const color   = cat ? getCategoryColor(cat.slug) : 'cat-orange';
  const thumb   = post.featuredImage?.node;
  const excerpt = stripHtml(post.excerpt);

  return (
    <article className="blog-card">
      <Link href={`/blog/${post.slug}`} className="blog-card-image-link" tabIndex={-1} aria-hidden>
        <div className="blog-card-image">
          {thumb ? (
            <Image
              src={thumb.sourceUrl}
              alt={thumb.altText || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
          ) : (
            <span className="img-placeholder">📝</span>
          )}
        </div>
      </Link>

      <div className="blog-card-content">
        {cat && (
          <Link href={`/blog/category/${cat.slug}`} className={`blog-tag ${color}`}>
            {cat.name}
          </Link>
        )}

        <h3>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        {excerpt && <p className="blog-description">{excerpt.slice(0, 120)}…</p>}

        {/* Tags */}
        {post.tags?.nodes?.length > 0 && (
          <div className="blog-card-tags">
            {post.tags.nodes.slice(0, 3).map((tag) => (
              <Link key={tag.slug} href={`/blog/tag/${tag.slug}`} className="blog-card-tag">
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        <div className="blog-footer">
          <div className="blog-author">
            {post.author?.node?.avatar?.url && (
              <Image
                src={post.author.node.avatar.url}
                alt={post.author.node.name}
                width={28}
                height={28}
                className="author-avatar"
                style={{ borderRadius: '50%' }}
              />
            )}
            <span>{post.author?.node?.name}</span>
          </div>
          <div className="blog-meta-right">
            <span className="blog-date">{formatDate(post.date)}</span>
            <span className="blog-read-time">{getReadingTime(post.excerpt)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
