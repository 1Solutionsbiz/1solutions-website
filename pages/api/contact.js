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

  const submittedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const autoReplyHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background-color:#e8eaf0;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#e8eaf0" style="background-color:#e8eaf0;">
<tr><td align="center" style="padding:40px 16px 32px;">

  <!-- Main card -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="max-width:580px;background-color:#ffffff;">

    <!-- Logo row -->
    <tr>
      <td align="center" style="padding:40px 40px 32px;">
        <a href="https://www.1solutions.biz" style="display:inline-block;text-decoration:none;">
          <img src="https://www.1solutions.biz/images/1solutions-logo.png" alt="1Solutions" width="200" style="display:block;border:0;height:auto;max-width:200px;" />
        </a>
      </td>
    </tr>

    <!-- Divider -->
    <tr><td style="padding:0 40px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #e5e7eb;"></td></tr></table></td></tr>

    <!-- Body -->
    <tr>
      <td style="padding:32px 40px 12px;">
        <p style="font-size:15px;color:#1a1a2e;line-height:1.75;margin:0 0 18px;">
          A <strong>contact enquiry</strong> has been received from <strong style="color:#FE9700;">${name}</strong> via the <strong style="color:#114171;">1Solutions website</strong>.
        </p>
        <p style="font-size:15px;color:#374151;line-height:1.3;margin:0 0 28px;">
          Message Title: <strong>Contact Form Submission</strong>
        </p>
      </td>
    </tr>

    <!-- Indented content block -->
    <tr>
      <td style="padding:0 40px 28px 60px;">
        <p style="font-size:15px;color:#374151;line-height:1.75;margin:0 0 14px;">Hi ${firstName},</p>
        <p style="font-size:15px;color:#374151;line-height:1.75;margin:0 0 14px;">
          Thank you for contacting <strong style="color:#114171;">1Solutions</strong>. We have received your enquiry and a member of our team will respond within <strong>24 hours</strong>.
        </p>
        ${summaryRows.filter(([l]) => !['Name','Email'].includes(l)).length > 0 ? `
        <p style="font-size:15px;color:#374151;line-height:1.75;margin:0 0 6px;">Your submitted details:</p>
        ${summaryRows.filter(([l]) => !['Name','Email'].includes(l)).map(([label, value]) => `
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 4px;">&nbsp;&nbsp;<strong>${label}:</strong> ${String(value).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`).join('')}
        ` : ''}
        <p style="font-size:15px;color:#374151;line-height:1.75;margin:18px 0 4px;"><strong>Regards,</strong></p>
        <p style="font-size:15px;color:#374151;line-height:1.75;margin:0;">The 1Solutions Team</p>
      </td>
    </tr>

    <!-- Date + links row -->
    <tr>
      <td style="padding:0 40px 28px;">
        <p style="font-size:15px;color:#374151;line-height:1.75;margin:0 0 10px;">
          Submission Date: <strong style="color:#FE9700;">${submittedDate}</strong>
        </p>
        <p style="font-size:15px;margin:0;">
          <a href="https://www.1solutions.biz/portfolio/" style="color:#1a1aa8;text-decoration:underline;">View our portfolio</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a href="https://www.1solutions.biz/blog" style="color:#1a1aa8;text-decoration:underline;">Read our blog</a>
        </p>
      </td>
    </tr>

    <!-- Divider -->
    <tr><td style="padding:0 40px 20px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #e5e7eb;"></td></tr></table></td></tr>

    <!-- Recipients note -->
    <tr>
      <td style="padding:0 40px 36px;">
        <p style="font-size:14px;color:#6b7280;line-height:1.6;margin:0;">
          This confirmation was sent to <strong>${name}</strong> and the 1Solutions team.
        </p>
      </td>
    </tr>

  </table>

  <!-- Below-card footer -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;">
    <tr>
      <td align="center" style="padding:16px 20px 0;">
        <p style="font-size:12px;color:#9ca3af;line-height:1.65;margin:0;">
          This email was sent to ${email} because you submitted a contact form on 1solutions.biz.
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
