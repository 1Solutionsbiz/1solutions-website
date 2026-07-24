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
    console.error('[apply] Token error:', JSON.stringify(data));
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
      from: { emailAddress: { address: SENDER, name: '1Solutions' } },
      sender: { emailAddress: { address: SENDER, name: '1Solutions' } },
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
    console.error('[apply] sendMail error:', res.status, JSON.stringify(err));
    throw new Error(err.error?.message || `Graph sendMail failed: ${res.status}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    name, email, phone, position, experience, location,
    currentSalary, expectedSalary, noticePeriod, linkedin,
    resumeUrl, coverLetter, source, consent, recaptchaToken,
  } = req.body;

  if (!name || !email || !phone || !position || !experience || !location || !noticePeriod || !resumeUrl || !coverLetter || !consent) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
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

  const esc = (v) => String(v).replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // ── Internal notification email (to 1Solutions team) ──────────────────────
  const notifDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const internalRows = [
    ['Position',       esc(position)],
    ['Email',          esc(email)],
    ['Phone',          esc(phone)],
    ['Experience',     esc(experience)],
    ['Notice Period',  esc(noticePeriod)],
    ['Location',       esc(location)],
    ...(currentSalary  ? [['Current CTC',  esc(currentSalary)]]  : []),
    ...(expectedSalary ? [['Expected CTC', esc(expectedSalary)]] : []),
    ...(linkedin       ? [['LinkedIn', `<a href="${linkedin}" style="color:#114171;font-weight:600">${esc(linkedin)}</a>`]] : []),
    ['Resume / Portfolio', `<a href="${resumeUrl}" style="color:#114171;font-weight:600">View Resume &rarr;</a>`],
    ...(source ? [['Source', esc(source)]] : []),
  ];

  const internalHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#e8eaf0;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#e8eaf0" style="background-color:#e8eaf0;">
<tr><td align="center" style="padding:40px 16px 32px;">

  <!-- Main card -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="max-width:580px;background-color:#ffffff;">

    <!-- Logo -->
    <tr>
      <td align="center" style="padding:40px 40px 32px;">
        <a href="https://www.1solutions.biz" style="display:inline-block;text-decoration:none;">
          <img src="https://www.1solutions.biz/images/1solutions-logo.png" alt="1Solutions" width="200" style="display:block;border:0;height:auto;max-width:200px;" />
        </a>
      </td>
    </tr>

    <!-- Divider -->
    <tr><td style="padding:0 40px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #e5e7eb;"></td></tr></table></td></tr>

    <!-- Intro -->
    <tr>
      <td style="padding:28px 40px 8px;">
        <p style="font-size:15px;color:#374151;margin:0 0 6px;">New application from <strong style="color:#0F1F40;">${esc(name)}</strong></p>
        <p style="font-size:15px;color:#374151;margin:0;">Submission Date: <strong style="color:#FE9700;">${notifDate}</strong></p>
      </td>
    </tr>

    <!-- Fields -->
    <tr>
      <td style="padding:16px 40px 8px 60px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${internalRows.map(([label, value]) => `
          <tr>
            <td width="120" style="padding:5px 0;font-size:13px;color:#6b7280;vertical-align:top;">${label}</td>
            <td style="padding:5px 0;font-size:13px;color:#111827;font-weight:600;">${value}</td>
          </tr>`).join('')}
        </table>
      </td>
    </tr>

    <!-- Cover letter -->
    <tr>
      <td style="padding:16px 40px 28px 60px;">
        <p style="font-size:13px;color:#6b7280;margin:0 0 6px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;">Cover Letter</p>
        <p style="font-size:14px;color:#374151;line-height:1.7;margin:0;white-space:pre-wrap;">${esc(coverLetter)}</p>
      </td>
    </tr>

    <!-- Divider -->
    <tr><td style="padding:0 40px 20px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #e5e7eb;"></td></tr></table></td></tr>

  </table>

  <!-- Below-card footer -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;">
    <tr>
      <td align="center" style="padding:16px 20px 0;">
        <p style="font-size:12px;color:#9ca3af;line-height:1.65;margin:0;">
          This email was sent to atul@1solutions.biz and info@1solutions.biz via 1solutions.biz/apply-online.
        </p>
      </td>
    </tr>
  </table>

</td></tr>
</table>
</body>
</html>`;

  // ── Auto-reply confirmation email (to the applicant) ──────────────────────
  const firstName = name.split(' ')[0];
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
          Your application for <strong style="color:#FE9700;">${esc(position)}</strong> at <strong style="color:#114171;">1Solutions</strong> has been received.
        </p>
      </td>
    </tr>

    <!-- Indented content block -->
    <tr>
      <td style="padding:0 40px 28px 60px;">
        <p style="font-size:15px;color:#374151;line-height:1.75;margin:0 0 14px;">Hi ${esc(firstName)},</p>
        <p style="font-size:15px;color:#374151;line-height:1.75;margin:0 0 14px;">
          Thank you for applying to <strong style="color:#114171;">1Solutions</strong>. Our hiring team will review your application and get in touch if your profile is shortlisted for the <strong>${esc(position)}</strong> role.
        </p>
        <p style="font-size:15px;color:#374151;line-height:1.75;margin:0 0 6px;">Your submitted details:</p>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 4px;">&nbsp;&nbsp;<strong>Position:</strong> ${esc(position)}</p>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 4px;">&nbsp;&nbsp;<strong>Experience:</strong> ${esc(experience)}</p>
        <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 4px;">&nbsp;&nbsp;<strong>Location:</strong> ${esc(location)}</p>
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
          <a href="https://www.1solutions.biz/open-positions/" style="color:#1a1aa8;text-decoration:underline;">View open positions</a>
        </p>
      </td>
    </tr>

    <!-- Divider -->
    <tr><td style="padding:0 40px 20px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #e5e7eb;"></td></tr></table></td></tr>

    <!-- Recipients note -->
    <tr>
      <td style="padding:0 40px 36px;">
        <p style="font-size:14px;color:#6b7280;line-height:1.6;margin:0;">
          This confirmation was sent to <strong>${esc(name)}</strong> and the 1Solutions hiring team.
        </p>
      </td>
    </tr>

  </table>

  <!-- Below-card footer -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;">
    <tr>
      <td align="center" style="padding:20px 20px 4px;">
        <a href="https://www.linkedin.com/company/1solutions/" target="_blank" rel="noopener noreferrer" style="display:inline-block;text-decoration:none;">
          <img src="https://www.1solutions.biz/images/linkedin-icon.png" width="32" height="32" alt="Follow 1Solutions on LinkedIn" style="display:block;border:0;border-radius:8px;" />
        </a>
        <p style="font-size:12px;color:#6b7280;margin:8px 0 0;">
          Follow us on <a href="https://www.linkedin.com/company/1solutions/" target="_blank" rel="noopener noreferrer" style="color:#114171;font-weight:600;text-decoration:none;">LinkedIn</a>
        </p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding:12px 20px 0;">
        <p style="font-size:12px;color:#9ca3af;line-height:1.65;margin:0;">
          This email was sent to ${esc(email)} because you applied for a role on 1solutions.biz.
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
        subject: `New Job Application: ${position} - ${name}`,
        html:    internalHtml,
        replyTo: email,
      }),
      sendGraphEmail(token, {
        to:      email,
        subject: `We've received your application, ${firstName}!`,
        html:    autoReplyHtml,
      }),
    ]);
  } catch (err) {
    console.error('[apply] Graph API error:', err.message);
    return res.status(500).json({ message: `Failed to submit. Please try again or email us at info@1solutions.biz.` });
  }

  return res.status(200).json({ message: 'Application submitted successfully.' });
}
