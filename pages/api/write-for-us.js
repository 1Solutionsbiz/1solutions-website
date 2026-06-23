export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, website, title, topic, level, pitch, samples, consent } = req.body;

  if (!name || !email || !title || !topic || !level || !pitch || !consent) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'info@1solutions.biz';

  const htmlBody = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
      <div style="background:#114171;padding:28px 32px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0;font-size:1.3rem">New Guest Post Pitch</h2>
        <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:0.88rem">1solutions.biz/write-for-us</p>
      </div>
      <div style="background:#f8fafc;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none">
        <table style="width:100%;border-collapse:collapse">
          ${[
            ['Name', name],
            ['Email', email],
            ['Website', website || '—'],
            ['Article Title', title],
            ['Topic Category', topic],
            ['Audience Level', level],
            ['Sample Articles', samples || '—'],
          ].map(([label, value]) => `
            <tr>
              <td style="padding:8px 0;font-size:0.82rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;width:130px;vertical-align:top">${label}</td>
              <td style="padding:8px 0;font-size:0.95rem;color:#0F1F40;font-weight:500">${value}</td>
            </tr>
          `).join('')}
        </table>
        <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border:1px solid #e5e7eb">
          <p style="margin:0 0 6px;font-size:0.82rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em">Pitch / Summary</p>
          <p style="margin:0;font-size:0.95rem;color:#374151;line-height:1.65;white-space:pre-wrap">${pitch.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
        <p style="margin:20px 0 0;font-size:0.8rem;color:#9ca3af">
          Submitted via 1solutions.biz/write-for-us — reply directly to respond to the contributor.
        </p>
      </div>
    </div>
  `;

  if (process.env.RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Guest Post Pitch <onboarding@resend.dev>',
          to: [toEmail],
          reply_to: email,
          subject: `Guest Post Pitch: ${title} — ${name}`,
          html: htmlBody,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error('Resend error:', err);
        return res.status(500).json({ message: 'Failed to send. Please try again or email us directly.' });
      }
    } catch (err) {
      console.error('Write-for-us email error:', err);
      return res.status(500).json({ message: 'Failed to send. Please try again or email us directly.' });
    }
  } else {
    console.log('[write-for-us]', { name, email, title, topic, level, pitch: pitch.slice(0, 80) });
  }

  return res.status(200).json({ message: 'Pitch submitted successfully.' });
}
