import { NextResponse } from 'next/server';

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
