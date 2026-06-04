import Link from 'next/link';

/**
 * Cursor-based pagination for WPGraphQL.
 * WPGraphQL uses cursor pagination, not page numbers.
 * We map cursor → URL param for sharing.
 */
export default function Pagination({ pageInfo, baseUrl, currentCursor }) {
  if (!pageInfo?.hasNextPage && !pageInfo?.hasPreviousPage) return null;

  return (
    <nav className="os-pagination" aria-label="Posts navigation">
      <ul>
        {currentCursor && (
          <li>
            <Link href={baseUrl} className="pagination-link">
              ← Back to start
            </Link>
          </li>
        )}
        {pageInfo?.hasNextPage && (
          <li>
            <Link
              href={`${baseUrl}?after=${encodeURIComponent(pageInfo.endCursor)}`}
              className="pagination-link"
            >
              Next Page →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
