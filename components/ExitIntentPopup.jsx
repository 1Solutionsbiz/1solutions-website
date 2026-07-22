'use client'
import { useEffect, useRef, useState } from 'react'

const SESSION_KEY = 'onesol_exit_popup_shown'
const ARM_DELAY_MS = 6000
const MOBILE_FALLBACK_MS = 40000
const EXCLUDED_PATH_PREFIXES = ['/apply-online', '/thank-you', '/contact-us']
const RC_SRC = 'https://www.google.com/recaptcha/api.js?render=6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs'

const INITIAL_FORM = { name: '', email: '', phone: '', consent: false }

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const triggeredRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(SESSION_KEY)) return
    const path = window.location.pathname
    if (EXCLUDED_PATH_PREFIXES.some((p) => path.startsWith(p))) return

    let armed = false
    const armTimer = setTimeout(() => { armed = true }, ARM_DELAY_MS)

    function trigger() {
      if (triggeredRef.current || !armed) return
      triggeredRef.current = true
      sessionStorage.setItem(SESSION_KEY, '1')
      setVisible(true)
      cleanup()
    }

    function onMouseOut(e) {
      if (e.clientY <= 0 && !e.relatedTarget) trigger()
    }

    document.addEventListener('mouseout', onMouseOut)
    const mobileTimer = setTimeout(trigger, MOBILE_FALLBACK_MS)

    function cleanup() {
      clearTimeout(armTimer)
      clearTimeout(mobileTimer)
      document.removeEventListener('mouseout', onMouseOut)
    }
    return cleanup
  }, [])

  useEffect(() => {
    // The trigger events (mouseout, a timer) aren't among the app-wide
    // interaction events that lazy-load reCAPTCHA, so make sure it's on
    // its way in as soon as the popup appears rather than only on submit.
    if (visible && !document.querySelector(`script[src="${RC_SRC}"]`)) {
      const s = document.createElement('script')
      s.src = RC_SRC
      s.async = true
      document.head.appendChild(s)
    }
  }, [visible])

  useEffect(() => {
    if (!visible) return
    function onKey(e) { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible])

  function close() {
    setVisible(false)
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMsg('')
    setStatus('loading')
    try {
      const recaptchaToken = await new Promise((resolve, reject) => {
        let waited = 0
        const poll = setInterval(() => {
          if (window.grecaptcha) {
            clearInterval(poll)
            window.grecaptcha.ready(() => {
              window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'exit_intent' }).then(resolve)
            })
          } else if ((waited += 200) > 8000) {
            clearInterval(poll)
            reject(new Error('Please try again in a moment.'))
          }
        }, 200)
      })
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          message: 'Requested a free strategy call via the exit-intent popup.',
          source: 'Exit-Intent Popup',
          recaptchaToken,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed.')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again or email us at info@1solutions.biz.')
    }
  }

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes eipFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes eipCardIn { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .eip-overlay {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(10, 15, 30, 0.6); backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: eipFadeIn 0.25s ease both;
        }
        .eip-card {
          position: relative; width: 100%; max-width: 440px;
          background: #fff; border-radius: 18px; overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.35);
          animation: eipCardIn 0.3s cubic-bezier(0.22,1,0.36,1) both;
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
        }
        .eip-head { background: linear-gradient(135deg, #114171 0%, #0a2a50 100%); padding: 28px 28px 22px; color: #fff; }
        .eip-close {
          position: absolute; top: 14px; right: 14px; z-index: 2;
          width: 30px; height: 30px; border-radius: 50%; border: none;
          background: rgba(255,255,255,0.15); color: #fff; cursor: pointer;
          font-size: 16px; line-height: 1; display: flex; align-items: center; justify-content: center;
        }
        .eip-close:hover { background: rgba(255,255,255,0.28); }
        .eip-body { padding: 24px 28px 28px; }
        .eip-field { margin-bottom: 12px; }
        .eip-field input[type="text"], .eip-field input[type="email"], .eip-field input[type="tel"] {
          width: 100%; padding: 11px 14px; border: 1.5px solid #e5e7eb; border-radius: 10px;
          font-size: 14px; font-family: inherit; outline: none; transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .eip-field input:focus { border-color: #114171; }
        .eip-submit {
          width: 100%; padding: 13px; border: none; border-radius: 10px;
          background: linear-gradient(135deg, #FE9700 0%, #F59E0B 100%); color: #fff;
          font-size: 14.5px; font-weight: 700; cursor: pointer; transition: opacity 0.2s;
        }
        .eip-submit:hover { opacity: 0.92; }
        .eip-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .eip-consent { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: #6b7280; margin: 14px 0; line-height: 1.5; }
        .eip-consent input { margin-top: 3px; flex-shrink: 0; }
        @media (max-width: 480px) {
          .eip-head { padding: 22px 22px 18px; }
          .eip-body { padding: 20px 22px 22px; }
        }
      `}</style>

      <div className="eip-overlay" onClick={(e) => { if (e.target === e.currentTarget) close() }}>
        <div className="eip-card" role="dialog" aria-modal="true" aria-label="Get a free strategy call">
          <button className="eip-close" aria-label="Close" onClick={close}>✕</button>

          {status === 'success' ? (
            <div className="eip-body" style={{ paddingTop: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, margin: '0 0 8px', color: '#111827' }}>Thanks, {form.name.split(' ')[0] || 'there'}!</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                We&apos;ve got your details. Our team will reach out within 24 hours to schedule your free strategy call.
              </p>
            </div>
          ) : (
            <>
              <div className="eip-head">
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#FE9700', margin: '0 0 8px' }}>
                  Before You Go
                </p>
                <h3 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 8px', lineHeight: 1.2 }}>
                  Get a Free Strategy Call
                </h3>
                <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5 }}>
                  See exactly how we&apos;d grow your website and revenue - no obligation, 30 minutes with a real expert.
                </p>
              </div>
              <form className="eip-body" onSubmit={handleSubmit} noValidate>
                <div className="eip-field">
                  <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="eip-field">
                  <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
                </div>
                <div className="eip-field">
                  <input type="tel" name="phone" placeholder="Phone Number (optional)" value={form.phone} onChange={handleChange} />
                </div>
                <label className="eip-consent">
                  <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required />
                  I agree to be contacted about my project. No spam, ever.
                </label>
                {status === 'error' && (
                  <p style={{ color: '#dc2626', fontSize: '13px', margin: '0 0 12px' }}>{errorMsg}</p>
                )}
                <button type="submit" className="eip-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : 'Claim My Free Call'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
