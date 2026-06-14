/**
 * Branded OG Image Generator for 1Solutions Blog
 * Usage: GET /api/og-image?title=Your+Title&secret=YOUR_SECRET
 * Returns: 1200x630 PNG image
 */

import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title  = searchParams.get('title')  || '1Solutions Blog';
  const secret = searchParams.get('secret') || '';

  // Validate secret
  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Truncate long titles
  const displayTitle = title.length > 80 ? title.substring(0, 77) + '...' : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: '#050D1F',
          position: 'relative',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Orange top stripe */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8px', background: '#FE9700', display: 'flex' }} />

        {/* Decorative circle top-right */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'rgba(17,65,113,0.4)', display: 'flex',
        }} />

        {/* Decorative circle bottom-right */}
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-60px',
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'rgba(254,151,0,0.15)', display: 'flex',
        }} />

        {/* Main content area */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '52px 64px 0 64px' }}>

          {/* Brand name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              fontSize: '28px', fontWeight: '900', color: '#FE9700',
              letterSpacing: '-0.5px', display: 'flex',
            }}>
              1SOLUTIONS
            </div>
          </div>

          {/* Tagline */}
          <div style={{ fontSize: '13px', color: '#7A9CC0', letterSpacing: '0.1em', marginBottom: '40px', display: 'flex' }}>
            WEB DEVELOPMENT &amp; DIGITAL MARKETING
          </div>

          {/* Divider */}
          <div style={{ width: '60px', height: '3px', background: '#FE9700', marginBottom: '36px', display: 'flex' }} />

          {/* Blog title */}
          <div style={{
            fontSize: displayTitle.length > 50 ? '44px' : '54px',
            fontWeight: '800',
            color: '#FFFFFF',
            lineHeight: '1.15',
            letterSpacing: '-1px',
            maxWidth: '900px',
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {displayTitle}
          </div>
        </div>

        {/* Blue bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: '#114171', padding: '0 64px', height: '60px',
          marginTop: 'auto',
        }}>
          <div style={{ fontSize: '13px', color: '#A0B4D2', display: 'flex' }}>
            Blog
          </div>
          <div style={{ fontSize: '14px', color: '#A0B4D2', fontWeight: '500', display: 'flex' }}>
            www.1solutions.biz
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
