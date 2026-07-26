import { NextResponse } from 'next/server';

// Trailing-slash allowlist redirect logic (added in 4b54a33) temporarily
// reverted while investigating reports that every inner page loads
// partially/blank with a dead hero — this file was the only change
// touching every route between a confirmed-good deployment and now.
// Back to just the host redirect until that's confirmed one way or the
// other; re-add the slash-canonicalization fix once it's cleared.
export function middleware(request) {
  const host = request.headers.get('host') || '';
  // Permanently redirect bare domain to www — eliminates duplicate-content
  // signal that was preventing Google from indexing both versions.
  if (host === '1solutions.biz') {
    const url = request.nextUrl.clone();
    url.host = 'www.1solutions.biz';
    return NextResponse.redirect(url, { status: 301 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
