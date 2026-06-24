/**
 * Vercel serverless function — AI content generation via SSE streaming.
 *
 * PHP builds the prompt (Brave research + instructions) and sends it here.
 * This function streams from Anthropic and forwards keepalive pings to the
 * browser so the connection stays open for the full generation duration.
 *
 * Required Vercel env vars:
 *   ANTHROPIC_API_KEY   — Anthropic API key
 *   AI_GENERATE_SECRET  — shared secret entered in WP plugin settings
 */

export const maxDuration = 300; // 5 minutes — requires Vercel Pro

export default async function handler(req, res) {
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
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set in Vercel environment variables.' });
  }

  // Switch to SSE so the browser connection stays alive during generation
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  // Ping every 5 seconds so Vercel and the browser know the connection is alive
  const keepAlive = setInterval(() => {
    try { res.write(': ping\n\n'); } catch (e) { clearInterval(keepAlive); }
  }, 5000);

  function send(payload) {
    clearInterval(keepAlive);
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
    res.end();
  }

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-6',
        max_tokens: 10000,
        stream:     true,
        messages:   [{ role: 'user', content: prompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const err = await anthropicRes.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Anthropic API error ${anthropicRes.status}`);
    }

    // Stream from Anthropic, accumulate text
    let fullText = '';
    const reader  = anthropicRes.body.getReader();
    const decoder = new TextDecoder();
    let   buffer  = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (raw === '[DONE]') continue;
        try {
          const parsed = JSON.parse(raw);
          if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
            fullText += parsed.delta.text;
          }
        } catch (e) { /* skip malformed lines */ }
      }
    }

    if (!fullText.includes('</POST_CONTENT>')) {
      throw new Error('Content generation was incomplete — Claude stopped early. Try a shorter topic or try again.');
    }

    const parse = (tag) => {
      const m = fullText.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
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

    send({ success: true, ...result });

  } catch (err) {
    send({ error: err.message || 'Generation failed' });
  }
}
