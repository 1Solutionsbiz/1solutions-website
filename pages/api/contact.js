const SENDER = 'info@1solutions.biz';

async function getGraphToken() {
  const res = await fetch(
    `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id:     process.env.AZURE_CLIENT_ID,
        client_secret: process.env.AZURE_CLIENT_SECRET,
        scope:         'https://graph.microsoft.com/.default',
        grant_type:    'client_credentials',
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || 'Failed to get Graph token');
  return data.access_token;
}

async function sendGraphEmail(token, { to, subject, html, replyTo }) {
  const toRecipients = (Array.isArray(to) ? to : [to])
    .map(a => ({ emailAddress: { address: a } }));

  const body = {
    message: {
      subject,
      body: { contentType: 'HTML', content: html },
      toRecipients,
      ...(replyTo ? { replyTo: [{ emailAddress: { address: replyTo } }] } : {}),
    },
    saveToSentItems: false,
  };

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${SENDER}/sendMail`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Graph sendMail failed: ${res.status}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, company, service, budget, message, consent, source, recaptchaToken } = req.body;

  if (!name || !email || !message || !consent) {
    return res.status(400).json({ message: 'Name, email, message, and consent are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }

  if (!recaptchaToken) {
    return res.status(400).json({ message: 'reCAPTCHA verification missing.' });
  }
  const captchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`, { method: 'POST' });
  const captchaData = await captchaRes.json();
  if (!captchaData.success || captchaData.score < 0.5) {
    return res.status(400).json({ message: 'reCAPTCHA check failed. Please try again.' });
  }

  // ── Internal notification email (to 1Solutions team) ──────────────────────
  const internalHtml = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
      <div style="background:#0F1F40;padding:28px 32px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0;font-size:1.3rem">New Contact Form Enquiry</h2>
        <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:0.88rem">${source || 'Contact Us'}</p>
      </div>
      <div style="background:#f8fafc;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none">
        <table style="width:100%;border-collapse:collapse">
          ${[
            ['Source',  source || 'Contact Us'],
            ['Name',    name],
            ['Email',   email],
            ['Phone',   phone || '—'],
            ['Company', company || '—'],
            ['Service', service || '—'],
            ['Budget',  budget || '—'],
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
        <p style="margin:20px 0 0;font-size:0.8rem;color:#9ca3af">Submitted via 1solutions.biz</p>
      </div>
    </div>
  `;

  // ── Auto-reply confirmation email (to the enquirer) ───────────────────────
  const autoReplyHtml = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
      <div style="background:#0F1F40;padding:28px 32px;border-radius:12px 12px 0 0">
        <img src="https://www.1solutions.biz/images/1solutions-logo.png" alt="1Solutions" style="height:36px;display:block;margin-bottom:16px" />
        <h2 style="color:#fff;margin:0;font-size:1.25rem">We've received your message!</h2>
        <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:0.9rem">Thanks for reaching out — we'll get back to you within 24 hours.</p>
      </div>
      <div style="background:#f8fafc;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none">
        <p style="margin:0 0 16px;font-size:0.95rem;color:#374151;line-height:1.6">Hi ${name},</p>
        <p style="margin:0 0 16px;font-size:0.95rem;color:#374151;line-height:1.6">
          Thank you for contacting <strong>1Solutions</strong>. We've received your enquiry and a member of our team will review it and respond within <strong>24 hours</strong>.
        </p>
        <div style="background:#fff;border-radius:8px;border:1px solid #e5e7eb;padding:16px;margin:20px 0">
          <p style="margin:0 0 10px;font-size:0.82rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em">Your enquiry summary</p>
          <table style="width:100%;border-collapse:collapse">
            ${[
              ['Service', service || '—'],
              ['Budget',  budget  || '—'],
              ['Phone',   phone   || '—'],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:5px 0;font-size:0.82rem;color:#6b7280;width:90px">${label}</td>
                <td style="padding:5px 0;font-size:0.9rem;color:#0F1F40;font-weight:500">${value}</td>
              </tr>
            `).join('')}
          </table>
        </div>
        <p style="margin:0 0 16px;font-size:0.95rem;color:#374151;line-height:1.6">
          In the meantime, feel free to browse our
          <a href="https://www.1solutions.biz/portfolio/" style="color:#114171;text-decoration:none;font-weight:600">portfolio</a>
          or read our
          <a href="https://www.1solutions.biz/blog" style="color:#114171;text-decoration:none;font-weight:600">blog</a>
          for insights on web development and digital marketing.
        </p>
        <div style="border-top:1px solid #e5e7eb;margin-top:24px;padding-top:20px">
          <p style="margin:0 0 4px;font-size:0.85rem;color:#6b7280">Warm regards,</p>
          <p style="margin:0;font-size:0.95rem;font-weight:700;color:#0F1F40">The 1Solutions Team</p>
          <p style="margin:4px 0 0;font-size:0.82rem;color:#9ca3af">
            <a href="mailto:info@1solutions.biz" style="color:#114171;text-decoration:none">info@1solutions.biz</a>
            &nbsp;·&nbsp;
            <a href="https://www.1solutions.biz" style="color:#114171;text-decoration:none">www.1solutions.biz</a>
          </p>
        </div>
      </div>
    </div>
  `;

  try {
    const token = await getGraphToken();
    await Promise.all([
      sendGraphEmail(token, {
        to:      ['atul@1solutions.biz', 'info@1solutions.biz'],
        subject: `New enquiry from ${name}${company ? ` — ${company}` : ''}`,
        html:    internalHtml,
        replyTo: email,
      }),
      sendGraphEmail(token, {
        to:      email,
        subject: `We've received your message, ${name.split(' ')[0]}!`,
        html:    autoReplyHtml,
      }),
    ]);
  } catch (err) {
    console.error('[contact] Graph API error:', err.message);
    return res.status(500).json({ message: 'Failed to send. Please try again or email us directly at info@1solutions.biz' });
  }

  return res.status(200).json({ message: 'Message sent successfully.' });
}
