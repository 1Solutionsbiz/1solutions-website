/**
 * Vercel serverless function — AI content generation.
 *
 * WordPress plugin sends the pre-built prompt here.
 * This function calls Claude and returns structured content.
 * Kept off Hostinger PHP entirely so LiteSpeed timeouts never apply.
 *
 * Required Vercel env vars:
 *   ANTHROPIC_API_KEY  — Anthropic API key
 *   REVALIDATE_SECRET  — shared secret (same one already used for ISR revalidation)
 */

export const maxDuration = 60; // seconds — works on both Hobby and Pro plans

export default async function handler(req, res) {
  // CORS — sidebar runs on Hostinger, Vercel is a different origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt, secret } = req.body || {};

  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  const expectedSecret = process.env.AI_GENERATE_SECRET;
  if (!expectedSecret || secret !== expectedSecret) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set in Vercel environment variables. Add it in the Vercel dashboard under Settings > Environment Variables.' });
  }

  try {
    const result = await callClaude(prompt, apiKey);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Generation failed' });
  }
}

async function callClaude(prompt, apiKey) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key':         apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-beta':    'output-128k-2025-02-19',
      'content-type':      'application/json',
    },
    body: JSON.stringify({
      model:      'claude-sonnet-4-6',
      max_tokens: 16000,
      messages:   [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Anthropic API error ${response.status}`);
  }

  const data = await response.json();

  if (data.stop_reason === 'max_tokens') {
    throw new Error('Content was too long and got cut off. Try a slightly shorter topic.');
  }

  const text = (data?.content?.[0]?.text || '').trim();

  if (!text.includes('</POST_CONTENT>')) {
    throw new Error('Content generation was incomplete. Please try again.');
  }

  const parse = (tag) => {
    const m = text.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
    return m ? m[1].trim() : '';
  };

  const result = {
    title:            parse('POST_TITLE'),
    slug:             parse('POST_SLUG'),
    meta_title:       parse('META_TITLE'),
    meta_description: parse('META_DESCRIPTION'),
    focus_keyword:    parse('FOCUS_KEYWORD'),
    content:          parse('POST_CONTENT'),
  };

  for (const [key, value] of Object.entries(result)) {
    if (!value) throw new Error(`Missing field in Claude response: ${key}`);
  }

  return result;
}
