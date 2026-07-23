/**
 * OG Image Generator - /api/og-service
 * 1200×630 branded preview images for service pages that don't have a
 * hand-designed og:image. Same banner background as /api/og-image, but
 * public (no secret) and cached, since it's referenced directly from
 * page <meta property="og:image"> tags rendered to every visitor.
 *
 * Query params:
 *   title - page title to overlay (URL-encoded)
 */

import { ImageResponse } from 'next/og';
import { BANNER_DATA } from '../../lib/ogBanner';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || '1Solutions';

    // Clamp title
    const displayTitle = title.length > 110 ? title.slice(0, 107) + '…' : title;

    // Dynamic font size based on length
    let fontSize = 58;
    if (displayTitle.length > 80) fontSize = 42;
    else if (displayTitle.length > 55) fontSize = 50;

    const fontRes = await fetch(
      'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZJh.woff2',
      { cache: 'force-cache' }
    );
    const fontData = fontRes.ok ? await fontRes.arrayBuffer() : null;

    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '1200px',
            height: '630px',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <img
            src={BANNER_DATA}
            style={{
              position: 'absolute', inset: 0,
              width: '1200px', height: '630px',
              objectFit: 'cover', objectPosition: 'center',
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: '200px',
            width: '800px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              color: '#ffffff',
              fontSize: fontSize + 'px',
              fontWeight: '700',
              lineHeight: '1.25',
              letterSpacing: '-0.3px',
              width: '800px',
              textAlign: 'center',
            }}>
              {displayTitle}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        ...(fontData ? {
          fonts: [{ name: 'Inter', data: fontData, style: 'normal', weight: 700 }],
        } : {}),
      }
    );
    imageResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return imageResponse;
  } catch (err) {
    return new Response('OG image error: ' + err.message, { status: 500 });
  }
}
