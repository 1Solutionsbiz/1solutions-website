// Contact form API route
//
// To enable real email delivery, set these in Vercel → Settings → Environment Variables:
//   RESEND_API_KEY   — free at resend.com (100 emails/day free tier)
//   CONTACT_TO_EMAIL — where enquiries go (default: info@1solutions.biz)
//
// Without RESEND_API_KEY the route still returns 200 so the form UX works.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, company, service, budget, message, consent } = req.body;

  if (!name || !email || !message || !consent) {
    return res.status(400).json({ message: 'Name, email, message, and consent are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  const toEmails = ['atul@1solutions.biz', 'info@1solutions.biz'];

  const htmlBody = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
      <div style="background:#0F1F40;padding:28px 32px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0;font-size:1.3rem">New Contact Form Enquiry</h2>
        <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:0.88rem">1solutions.biz/contact</p>
      </div>
      <div style="background:#f8fafc;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none">
        <table style="width:100%;border-collapse:collapse">
          ${[
            ['Name', name],
            ['Email', email],
            ['Phone', phone || '—'],
            ['Company', company || '—'],
            ['Service', service || '—'],
            ['Budget', budget || '—'],
          ].map(([label, value]) => `
            <tr>
              <td style="padding:8px 0;font-size:0.82rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;width:110px;vertical-align:top">${label}</td>
              <td style="padding:8px 0;font-size:0.95rem;color:#0F1F40;font-weight:500">${value}</td>
            </tr>
          `).join('')}
        </table>
        <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border:1px solid #e5e7eb">
          <p style="margin:0 0 6px;font-size:0.82rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em">Message</p>
          <p style="margin:0;font-size:0.95rem;color:#374151;line-height:1.65;white-space:pre-wrap">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
        <p style="margin:20px 0 0;font-size:0.8rem;color:#9ca3af">
          Submitted via 1solutions.biz/contact — reply directly to this email to respond to the enquiry.
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
          from: 'Contact Form <hello@1solutions.biz>',
          to: toEmails,
          reply_to: email,
          subject: `New enquiry from ${name}${company ? ` — ${company}` : ''}`,
          html: htmlBody,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error('Resend error:', err);
        return res.status(500).json({ message: 'Failed to send email. Please try again or contact us directly.' });
      }
    } catch (err) {
      console.error('Email send error:', err);
      return res.status(500).json({ message: 'Failed to send email. Please try again or contact us directly.' });
    }
  } else {
    // Log submission when email is not configured (dev / preview)
    console.log('[contact form]', { name, email, company, service, budget, message: message.slice(0, 80) });
  }

  return res.status(200).json({ message: 'Message sent successfully.' });
}
