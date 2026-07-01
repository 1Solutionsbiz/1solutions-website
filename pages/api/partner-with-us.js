import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, company, email, phone, type, message, consent, recaptchaToken } = req.body;

  if (!name || !company || !email || !type || !message || !consent) {
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

  const htmlBody = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
      <div style="background:#114171;padding:28px 32px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0;font-size:1.3rem">New Partnership Enquiry</h2>
        <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:0.88rem">1solutions.biz/partner-with-us</p>
      </div>
      <div style="background:#f8fafc;padding:28px 32px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;border-top:none">
        <table style="width:100%;border-collapse:collapse">
          ${[
            ['Name', name],
            ['Company', company],
            ['Email', email],
            ['Phone', phone || '—'],
            ['Partnership Type', type],
          ].map(([label, value]) => `
            <tr>
              <td style="padding:8px 0;font-size:0.82rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;width:140px;vertical-align:top">${label}</td>
              <td style="padding:8px 0;font-size:0.95rem;color:#0F1F40;font-weight:500">${value}</td>
            </tr>
          `).join('')}
        </table>
        <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border:1px solid #e5e7eb">
          <p style="margin:0 0 6px;font-size:0.82rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em">Message</p>
          <p style="margin:0;font-size:0.95rem;color:#374151;line-height:1.65;white-space:pre-wrap">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
        <p style="margin:20px 0 0;font-size:0.8rem;color:#9ca3af">Submitted via 1solutions.biz/partner-with-us</p>
      </div>
    </div>
  `;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"1Solutions Partnership" <contact@1solutions.biz>`,
      to: ['atul@1solutions.biz', 'info@1solutions.biz'],
      replyTo: email,
      subject: `Partnership Enquiry: ${type} — ${name}, ${company}`,
      html: htmlBody,
    });
  } catch (err) {
    console.error('[partner-with-us] email error:', err);
    return res.status(500).json({ message: 'Failed to send. Please try again or email us directly.' });
  }

  return res.status(200).json({ message: 'Enquiry submitted successfully.' });
}
