const BREVO_API = 'https://api.brevo.com/v3/contacts';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, recaptchaToken } = req.body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'A valid email address is required.' });
  }

  if (!recaptchaToken) {
    return res.status(400).json({ message: 'reCAPTCHA verification missing.' });
  }
  const captchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`, { method: 'POST' });
  const captchaData = await captchaRes.json();
  if (!captchaData.success || captchaData.score < 0.5) {
    return res.status(400).json({ message: 'reCAPTCHA check failed. Please try again.' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('[newsletter] BREVO_API_KEY env var not set');
    return res.status(500).json({ message: 'Newsletter service not configured.' });
  }

  const listId = parseInt(process.env.BREVO_LIST_ID || '2', 10);

  const brevoRes = await fetch(BREVO_API, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
      attributes: { SOURCE: 'Blog – Weekly Insights' },
    }),
  });

  // 201 = created
  if (brevoRes.status === 201 || brevoRes.status === 204) {
    return res.status(200).json({ message: 'Subscribed successfully.' });
  }

  const body = await brevoRes.json().catch(() => ({}));

  // Already subscribed — still a success from the user's perspective
  if (brevoRes.status === 400 && body.code === 'duplicate_parameter') {
    return res.status(200).json({ message: 'You are already subscribed.' });
  }

  console.error('[newsletter] Brevo error:', brevoRes.status, JSON.stringify(body));
  return res.status(500).json({ message: 'Could not subscribe. Please try again.' });
}
