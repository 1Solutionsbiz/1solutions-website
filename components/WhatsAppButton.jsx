'use client'
import { useState } from 'react'

const WHATSAPP_NUMBER = '919654327900'
const DEFAULT_MESSAGE = "Hi! I'd like to know more about your services."

function openWhatsApp(text) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text || DEFAULT_MESSAGE)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  function handleSend(e) {
    e.preventDefault()
    openWhatsApp(message)
    setMessage('')
    setOpen(false)
  }

  return (
    <>
      <style>{`
        @keyframes waPulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.55); }
          70%  { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        @keyframes waPanelIn {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .wa-fab {
          /* bottom offset clears Google reCAPTCHA's default floating badge */
          position: fixed; right: 24px; bottom: 90px; z-index: 9000;
          width: 58px; height: 58px; border-radius: 50%;
          background: #25D366; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          animation: waPulse 2.6s ease-out infinite;
          transition: transform 0.2s ease;
        }
        .wa-fab:hover { transform: scale(1.07); }
        .wa-panel {
          position: fixed; right: 24px; bottom: 160px; z-index: 9001;
          width: 320px; max-width: calc(100vw - 32px);
          background: #fff; border-radius: 14px; overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.25);
          animation: waPanelIn 0.25s cubic-bezier(0.22,1,0.36,1) both;
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
        }
        .wa-panel-header {
          background: #075E54; color: #fff; padding: 14px 16px;
          display: flex; align-items: center; gap: 10px;
        }
        .wa-panel-avatar {
          width: 38px; height: 38px; border-radius: 50%; background: #25D366;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .wa-panel-close {
          margin-left: auto; background: none; border: none; color: rgba(255,255,255,0.8);
          font-size: 18px; cursor: pointer; line-height: 1; padding: 4px;
        }
        .wa-panel-close:hover { color: #fff; }
        .wa-panel-body { background: #ECE5DD; padding: 16px; }
        .wa-bubble {
          background: #fff; border-radius: 10px; padding: 10px 12px; font-size: 13.5px;
          color: #1a1a2e; line-height: 1.55; box-shadow: 0 1px 2px rgba(0,0,0,0.08);
          max-width: 88%;
        }
        .wa-panel-footer { display: flex; gap: 8px; padding: 12px; background: #fff; border-top: 1px solid #eee; }
        .wa-panel-input {
          flex: 1; border: 1px solid #ddd; border-radius: 20px; padding: 9px 14px;
          font-size: 13.5px; outline: none; font-family: inherit;
        }
        .wa-panel-input:focus { border-color: #25D366; }
        .wa-panel-send {
          width: 36px; height: 36px; border-radius: 50%; background: #25D366; border: none;
          color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer;
          flex-shrink: 0;
        }
        .wa-panel-send:hover { background: #1fb955; }
        @media (prefers-reduced-motion: reduce) {
          .wa-fab { animation: none; }
          .wa-panel { animation: none; }
        }
      `}</style>

      {open && (
        <div className="wa-panel" role="dialog" aria-label="Chat with 1Solutions on WhatsApp">
          <div className="wa-panel-header">
            <div className="wa-panel-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.27 4.9L2 22l5.25-1.38a9.96 9.96 0 004.79 1.22h.01c5.52 0 10-4.48 10-10s-4.49-9.84-10.01-9.84zm5.87 14.3c-.25.7-1.24 1.28-2.02 1.44-.55.12-1.26.21-3.67-.79-2.83-1.17-4.65-4.05-4.8-4.24-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.25-.28.55-.35.74-.35.19 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.83 2.07.9 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11 1 2.05 1.31 2.34 1.46.29.15.46.13.63-.05.17-.18.72-.84.91-1.13.19-.29.38-.24.63-.15.25.1 1.62.77 1.9.91.28.14.46.21.53.33.07.12.07.68-.18 1.38z" /></svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px' }}>1Solutions</div>
              <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.75)' }}>Typically replies within minutes</div>
            </div>
            <button className="wa-panel-close" aria-label="Close chat" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="wa-panel-body">
            <div className="wa-bubble">
              👋 Hi there! Have a project in mind? Message us on WhatsApp and we&apos;ll get back to you right away.
            </div>
          </div>
          <form className="wa-panel-footer" onSubmit={handleSend}>
            <input
              className="wa-panel-input"
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus
            />
            <button type="submit" className="wa-panel-send" aria-label="Send on WhatsApp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
            </button>
          </form>
        </div>
      )}

      <button
        className="wa-fab"
        aria-label={open ? 'Close WhatsApp chat' : 'Chat with us on WhatsApp'}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.27 4.9L2 22l5.25-1.38a9.96 9.96 0 004.79 1.22h.01c5.52 0 10-4.48 10-10s-4.49-9.84-10.01-9.84zm5.87 14.3c-.25.7-1.24 1.28-2.02 1.44-.55.12-1.26.21-3.67-.79-2.83-1.17-4.65-4.05-4.8-4.24-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.25-.28.55-.35.74-.35.19 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.83 2.07.9 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11 1 2.05 1.31 2.34 1.46.29.15.46.13.63-.05.17-.18.72-.84.91-1.13.19-.29.38-.24.63-.15.25.1 1.62.77 1.9.91.28.14.46.21.53.33.07.12.07.68-.18 1.38z" /></svg>
      </button>
    </>
  )
}
