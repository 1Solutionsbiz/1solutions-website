import Link from 'next/link';

/**
 * Numbered pagination component.
 * Props:
 *   currentPage  — 1-based current page number
 *   totalPages   — total number of pages
 *   baseUrl      — base path, e.g. "/blog" or "/seo"
 *                  Page 1 links to baseUrl, pages 2+ link to baseUrl/page/N
 */
export default function Pagination({ currentPage = 1, totalPages = 1, baseUrl = '/blog' }) {
  if (totalPages <= 1) return null;

  const pageHref = (n) => (n === 1 ? baseUrl : `${baseUrl}/page/${n}`);

  // Build the page number window: always show first, last, and up to 5 around current
  const pages = [];
  const delta = 2; // pages on each side of current

  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd   = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);

  if (rangeStart > 2) pages.push('...');

  for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i);

  if (rangeEnd < totalPages - 1) pages.push('...');

  if (totalPages > 1) pages.push(totalPages);

  return (
    <nav className="pagination-wrap" aria-label="Blog pagination">
      <div className="pagination-inner">

        {/* Prev arrow */}
        {currentPage > 1 ? (
          <Link href={pageHref(currentPage - 1)} className="pag-arrow pag-prev" aria-label="Previous page">
            ‹
          </Link>
        ) : (
          <span className="pag-arrow pag-prev pag-disabled" aria-hidden>‹</span>
        )}

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="pag-ellipsis">…</span>
          ) : (
            <Link
              key={p}
              href={pageHref(p)}
              className={`pag-num${p === currentPage ? ' pag-active' : ''}`}
              aria-current={p === currentPage ? 'page' : undefined}
            >
              {p}
            </Link>
          )
        )}

        {/* Next arrow */}
        {currentPage < totalPages ? (
          <Link href={pageHref(currentPage + 1)} className="pag-arrow pag-next" aria-label="Next page">
            ›
          </Link>
        ) : (
          <span className="pag-arrow pag-next pag-disabled" aria-hidden>›</span>
        )}

      </div>
    </nav>
  );
}
