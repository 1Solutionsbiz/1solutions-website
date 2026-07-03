import { NextResponse } from 'next/server';

// trailingSlash: true + skipTrailingSlashRedirect: true means Next.js no longer
// issues automatic CDN-level 308 redirects for missing trailing slashes.
// This middleware re-implements trailing-slash redirects for page routes only,
// deliberately skipping /api/* so POST bodies are never dropped on redirect.
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Never redirect: API routes, Next.js internals, static files, already-slash paths
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.endsWith('/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Add trailing slash to all page routes (301 for SEO)
  const url = request.nextUrl.clone();
  url.pathname = pathname + '/';
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon\\.ico).*)',
};
