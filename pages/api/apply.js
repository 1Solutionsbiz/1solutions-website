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

  const rows = [
    ['Position', position],
    ['Experience', experience],
    ['Notice Period', noticePeriod],
    ['Location', location],
    ['Current CTC', currentSalary || '—'],
    ['Expected CTC', expectedSalary || '—'],
    ['LinkedIn', linkedin ? `<a href="${linkedin}" style="color:#114171">${linkedin}</a>` : '—'],
    ['Resume / Portfolio', resumeUrl ? `<a href="${resumeUrl}" style="color:#114171;font-weight:700">View Resume →</a>` : '—'],
    ['How They Found Us', source || '—'],
  ];

  const htmlBody = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;color:#1a1a2e">
      <div style="background:#0F1F40;padding:28px 32px;border-radius:12px 12px 0 0">
        <p style="color:#FE9700;font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 6px">New Job Application</p>
        <h2 style="color:#fff;margin:0;font-size:1.4rem;font-weight:800">${name.replace(/</g, '&lt;')}</h2>
        <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:0.9rem">Applying for: <strong style="color:#FE9700">${position.replace(/</g, '&lt;')}</strong></p>
      </div>
      <div style="background:#f8fafc;padding:28px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
        <div style="margin-bottom:20px">
          <a href="mailto:${email}" style="display:inline-block;padding:10px 20px;background:#114171;color:#fff;text-decoration:none;border-radius:100px;font-weight:700;font-size:0.88rem">Reply to Applicant</a>
          ${resumeUrl ? `<a href="${resumeUrl}" style="display:inline-block;margin-left:10px;padding:10px 20px;background:#FE9700;color:#fff;text-decoration:none;border-radius:100px;font-weight:700;font-size:0.88rem">View Resume →</a>` : ''}
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
          <tr>
            <td style="padding:8px 0;font-size:0.78rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;width:130px;vertical-align:top">Email</td>
            <td style="padding:8px 0;font-size:0.93rem;color:#0F1F40"><a href="mailto:${email}" style="color:#114171;font-weight:600">${email.replace(/</g, '&lt;')}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:0.78rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;vertical-align:top">Phone</td>
            <td style="padding:8px 0;font-size:0.93rem;color:#0F1F40">${phone.replace(/</g, '&lt;')}</td>
          </tr>
          ${rows.map(([label, value]) => `
          <tr>
            <td style="padding:8px 0;font-size:0.78rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;vertical-align:top">${label}</td>
            <td style="padding:8px 0;font-size:0.93rem;color:#0F1F40">${value}</td>
          </tr>`).join('')}
        </table>
        <div style="background:#fff;border-radius:10px;border:1px solid #e5e7eb;padding:18px 20px">
          <p style="margin:0 0 8px;font-size:0.78rem;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em">Cover Letter</p>
          <p style="margin:0;font-size:0.93rem;color:#374151;line-height:1.7;white-space:pre-wrap">${coverLetter.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
        <p style="margin:20px 0 0;font-size:0.78rem;color:#9ca3af">Submitted via 1solutions.biz/apply-online</p>
      </div>
    </div>
  `;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"1Solutions Careers" <contact@1solutions.biz>`,
      to: ['atul@1solutions.biz', 'info@1solutions.biz'],
      replyTo: email,
      subject: `Job Application: ${name} — ${position}`,
      html: htmlBody,
    });
  } catch (err) {
    console.error('[apply] email error:', err);
    return res.status(500).json({ message: 'Failed to submit. Please try again or email us at info@1solutions.biz.' });
  }

  return res.status(200).json({ message: 'Application submitted successfully.' });
}
