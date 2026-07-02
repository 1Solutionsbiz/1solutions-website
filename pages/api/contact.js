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
  if (!res.ok) {
    console.error('[contact] Token error:', JSON.stringify(data));
    throw new Error(data.error_description || data.error || 'Failed to get Graph token');
  }
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
    console.error('[contact] sendMail error:', res.status, JSON.stringify(err));
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
  const firstName = name.split(' ')[0];
  const summaryRows = [
    ['Name',    name],
    ['Email',   email],
    ...(service ? [['Service', service]] : []),
    ...(budget  ? [['Budget',  budget]]  : []),
    ...(phone   ? [['Phone',   phone]]   : []),
    ...(company ? [['Company', company]] : []),
  ];

  const autoReplyHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background-color:#f2f4f8;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f2f4f8" style="background-color:#f2f4f8;">
<tr><td align="center" style="padding:48px 16px 0;">

  <!-- Logo above card -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
    <tr>
      <td align="center" style="padding-bottom:24px;">
        <a href="https://www.1solutions.biz" style="display:inline-block;text-decoration:none;">
          <img src="https://www.1solutions.biz/images/1solutions-logo.png" alt="1Solutions" width="160" style="display:block;border:0;height:auto;max-width:160px;" />
        </a>
      </td>
    </tr>
  </table>

  <!-- Main card -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);">

    <!-- Blue header -->
    <tr>
      <td align="center" bgcolor="#114171" style="background-color:#114171;padding:36px 40px 30px;">
        <!-- Checkmark circle -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 16px;">
          <tr>
            <td width="56" height="56" align="center" valign="middle" bgcolor="#1a5ca8" style="background-color:#1a5ca8;border-radius:50%;font-size:26px;color:#ffffff;font-weight:700;line-height:56px;text-align:center;">&#10003;</td>
          </tr>
        </table>
        <h1 style="color:#ffffff;font-size:20px;font-weight:700;margin:0 0 8px;letter-spacing:-0.3px;line-height:1.3;">We&apos;ve received your message!</h1>
        <p style="color:rgba(255,255,255,0.72);font-size:14px;margin:0;line-height:1.55;">Thanks for reaching out, ${firstName}. We&apos;ll be in touch within 24 hours.</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td bgcolor="#ffffff" style="background-color:#ffffff;padding:36px 40px 32px;">

        <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 12px;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 28px;">
          Thank you for contacting <strong style="color:#114171;">1Solutions</strong>. Your enquiry has been received and a member of our team will review it and respond within <strong>24 hours</strong>.
        </p>

        <!-- Summary box -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8fafc" style="background-color:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:28px;">
          <tr>
            <td style="padding:18px 20px;">
              <p style="font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 14px;">Your Enquiry Summary</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${summaryRows.map(([label, value]) => `
                <tr>
                  <td width="88" style="padding:5px 0;font-size:13px;color:#6b7280;vertical-align:top;">${label}</td>
                  <td style="padding:5px 0;font-size:13px;color:#111827;font-weight:600;">${String(value).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
                </tr>`).join('')}
              </table>
            </td>
          </tr>
        </table>

        <!-- CTA -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
          <tr>
            <td align="center">
              <a href="https://www.1solutions.biz/portfolio/" style="display:inline-block;background-color:#114171;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:13px 30px;border-radius:100px;letter-spacing:0.01em;">View Our Portfolio &rarr;</a>
            </td>
          </tr>
        </table>

        <!-- Divider -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #e5e7eb;padding-bottom:20px;"></td></tr></table>

        <!-- Signature -->
        <p style="font-size:13px;color:#6b7280;margin:0 0 3px;">Warm regards,</p>
        <p style="font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 4px;">The 1Solutions Team</p>
        <p style="font-size:12px;color:#9ca3af;margin:0;">
          <a href="mailto:info@1solutions.biz" style="color:#114171;text-decoration:none;">info@1solutions.biz</a>
          &nbsp;&middot;&nbsp;
          <a href="https://www.1solutions.biz" style="color:#114171;text-decoration:none;">www.1solutions.biz</a>
          &nbsp;&middot;&nbsp;
          <a href="tel:+919654327900" style="color:#114171;text-decoration:none;">+91 96543 27900</a>
        </p>

      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;margin-top:20px;">
    <tr>
      <td align="center" style="padding:0 20px 48px;">
        <p style="font-size:12px;color:#9ca3af;line-height:1.7;margin:0 0 6px;">
          This email was sent to <a href="mailto:${email}" style="color:#6b7280;text-decoration:underline;">${email}</a> because you submitted a contact form on <a href="https://www.1solutions.biz" style="color:#6b7280;text-decoration:underline;">1solutions.biz</a>.
        </p>
        <p style="font-size:11px;color:#c0c0c8;margin:0;">
          &copy; ${new Date().getFullYear()} 1Solutions &nbsp;&middot;&nbsp; New Delhi, India &nbsp;&middot;&nbsp;
          <a href="https://www.1solutions.biz/privacy-policy/" style="color:#c0c0c8;text-decoration:none;">Privacy Policy</a>
        </p>
      </td>
    </tr>
  </table>

</td></tr>
</table>
</body>
</html>`;

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
    return res.status(500).json({ message: `Failed to send: ${err.message}` });
  }

  return res.status(200).json({ message: 'Message sent successfully.' });
}
