import { NextResponse } from 'next/server';

// trailingSlash:true in next.config.js causes POST /api/ai-generate to receive a
// 308 redirect to /api/ai-generate/, which drops the request body and breaks the
// WordPress plugin. Middleware runs before trailingSlash redirect logic, so this
// rewrite reaches the handler without any client-visible redirect.
export function middleware(request) {
  const url = request.nextUrl.clone();
  url.pathname = '/api/ai-generate/';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: '/api/ai-generate',
};
