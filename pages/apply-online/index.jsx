'use client';
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const POSITIONS = [
  { title: 'Full Stack Developer', exp: '1–3 yrs', type: 'Full-time', tag: 'Open' },
  { title: 'Social Media Manager', exp: '2–3 yrs', type: 'Full-time', tag: 'Open' },
  { title: 'Business Development Manager', exp: '3–5 yrs', type: 'Full-time', tag: 'Urgent' },
  { title: 'Digital Marketing Trainee', exp: 'Fresher', type: 'Full-time', tag: 'Fresher' },
  { title: 'Senior WordPress Developer', exp: '3–6 yrs', type: 'Full-time', tag: 'Urgent' },
  { title: 'Laravel / PHP Developer', exp: '2–5 yrs', type: 'Full-time', tag: 'Open' },
  { title: 'React / Next.js Developer', exp: '2–5 yrs', type: 'Full-time', tag: 'Open' },
  { title: 'Python / Django Developer', exp: '2–4 yrs', type: 'Full-time', tag: 'Open' },
  { title: 'SEO Executive', exp: '1–3 yrs', type: 'Full-time', tag: 'Open' },
  { title: 'Digital Marketing Executive', exp: '1–3 yrs', type: 'Full-time', tag: 'Open' },
  { title: 'UI/UX Designer', exp: '2–4 yrs', type: 'Full-time', tag: 'Open' },
  { title: 'Business Development Executive', exp: '1–4 yrs', type: 'Full-time', tag: 'Open' },
  { title: 'Junior PHP Developer', exp: '0–2 yrs / Fresher', type: 'Full-time', tag: 'Fresher' },
  { title: 'Content Writer', exp: '1–3 yrs', type: 'Full-time', tag: 'Open' },
  { title: 'Other / General Application', exp: 'Any', type: 'Any', tag: null },
];

const POSITION_NAMES = POSITIONS.map((p) => p.title);

const EXPERIENCE = [
  'Fresher (0–1 year)',
  '1–2 years',
  '2–3 years',
  '3–5 years',
  '5–8 years',
  '8+ years',
];

const NOTICE_PERIODS = [
  'Immediate joiner',
  '15 days',
  '30 days',
  '60 days',
  '90 days',
  'Currently not employed',
];

const SOURCES = [
  'LinkedIn',
  'Naukri.com',
  'Indeed',
  'Internshala',
  'Company website',
  'Referral from employee',
  'Google / Search',
  'Other',
];

const PERKS = [
  { icon: '🚀', title: 'Work on Global Projects', desc: 'Build products used by clients in the US, Canada, and Australia.' },
  { icon: '📈', title: 'Fast Career Growth', desc: 'Clear growth tracks and regular performance reviews every 6 months.' },
  { icon: '🧠', title: 'Skill Development', desc: 'Sponsored certifications, tech talks, and learning subscriptions.' },
  { icon: '🤝', title: 'Collaborative Culture', desc: 'Flat hierarchy, open-door policy, and a team that has each other\'s back.' },
  { icon: '💻', title: 'Modern Tech Stack', desc: 'Work with Next.js, Laravel, Django, React, AWS, Docker, and more.' },
  { icon: '🏡', title: 'Flexible Work Options', desc: 'Hybrid arrangements available for experienced professionals.' },
];

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  position: '',
  experience: '',
  location: '',
  currentSalary: '',
  expectedSalary: '',
  noticePeriod: '',
  linkedin: '',
  resumeUrl: '',
  coverLetter: '',
  source: '',
  consent: false,
};

export default function ApplyOnline() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(null);
  const formRef = useRef(null);

  // Pre-fill position from ?position= query param (linked from /open-positions/)
  useEffect(() => {
    if (!router.isReady) return;
    const qpos = router.query.position;
    if (qpos) {
      const match = POSITION_NAMES.find(
        (p) => p.toLowerCase() === decodeURIComponent(qpos).toLowerCase()
      ) || decodeURIComponent(qpos);
      setSelectedPosition(match);
      setForm((prev) => ({ ...prev, position: match }));
    }
  }, [router.isReady, router.query.position]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function applyForPosition(title) {
    setSelectedPosition(title);
    setForm((prev) => ({ ...prev, position: title }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const recaptchaToken = await new Promise((resolve) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute('6LcOMz8tAAAAAFahNxnljLwn3S8-3Ex-PthvyTRs', { action: 'apply' }).then(resolve);
        });
      });
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed.');
      setStatus('success');
      setForm(INITIAL_FORM);
      setSelectedPosition(null);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again or email us at info@1solutions.biz.');
    }
  }

  return (
    <>
      <Head>
        <title>Apply Online | Careers at 1Solutions — Join Our Team</title>
        <meta
          name="description"
          content="Join 1Solutions — a 15-year-old web development agency in New Delhi hiring WordPress, Laravel, Python, React developers, SEO executives, designers, and more. Apply online today."
        />
        <link rel="canonical" href="https://www.1solutions.biz/apply-online/" />
        <style>{`
          /* ─── Base ─── */
          .ap-page {
            font-family: 'Inter', sans-serif;
            color: #1a1a2e;
            overflow-x: hidden;
          }

          /* ─── Orbs ─── */
          .ap-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            pointer-events: none;
          }

          /* ─── Hero ─── */
          .ap-hero {
            position: relative;
            background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%);
            padding: 100px 24px 80px;
            overflow: hidden;
          }
          .ap-orb-1 { width: 600px; height: 600px; background: rgba(17,65,113,0.08); top: -150px; right: -100px; }
          .ap-orb-2 { width: 400px; height: 400px; background: rgba(254,151,0,0.10); bottom: -80px; left: -80px; }

          .ap-hero-inner {
            max-width: 1100px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            align-items: center;
            position: relative;
            z-index: 1;
          }
          .ap-hero-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(17,65,113,0.15);
            border-radius: 100px;
            padding: 6px 16px;
            font-size: 12px;
            font-weight: 700;
            color: #114171;
            margin-bottom: 22px;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }
          .ap-hero-dot {
            width: 6px; height: 6px;
            background: #44973D;
            border-radius: 50%;
          }
          .ap-hero h1 {
            font-size: clamp(2.2rem, 4vw, 3.4rem);
            font-weight: 800;
            line-height: 1.12;
            letter-spacing: -0.03em;
            color: #0F1F40;
            margin: 0 0 20px;
          }
          .ap-gradient-text {
            background: linear-gradient(90deg, #114171 0%, #FE9700 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .ap-hero-sub {
            font-size: 1.05rem;
            line-height: 1.72;
            color: #374151;
            margin-bottom: 32px;
          }
          .ap-hero-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #114171;
            color: #fff;
            padding: 13px 28px;
            border-radius: 100px;
            font-weight: 700;
            font-size: 0.93rem;
            text-decoration: none;
            transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
            cursor: pointer;
            border: none;
            font-family: inherit;
          }
          .ap-hero-btn:hover {
            background: #0d3260;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(17,65,113,0.28);
          }
          .ap-hero-chips {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .ap-hero-chip {
            background: rgba(255,255,255,0.72);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(17,65,113,0.1);
            border-radius: 14px;
            padding: 16px 18px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .ap-chip-icon {
            font-size: 1.5rem;
            flex-shrink: 0;
          }
          .ap-chip-text { font-size: 0.88rem; font-weight: 600; color: #0F1F40; line-height: 1.3; }
          .ap-chip-sub { font-size: 0.78rem; color: #6b7280; margin-top: 2px; }

          /* ─── Shared ─── */
          .ap-section { padding: 80px 24px; }
          .ap-container { max-width: 1100px; margin: 0 auto; }
          .ap-eyebrow {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #FE9700;
            margin-bottom: 12px;
          }
          .ap-heading {
            font-size: clamp(1.8rem, 3vw, 2.5rem);
            font-weight: 800;
            line-height: 1.18;
            letter-spacing: -0.025em;
            color: #0F1F40;
            margin: 0 0 16px;
          }
          .ap-lead {
            font-size: 1rem;
            line-height: 1.72;
            color: #4b5563;
            max-width: 580px;
          }

          /* ─── Positions ─── */
          .ap-positions-section {
            background: #f8fafc;
          }
          .ap-positions-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-top: 44px;
          }
          .ap-pos-card {
            background: #fff;
            border: 1.5px solid #e5e7eb;
            border-radius: 16px;
            padding: 24px 22px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          }
          .ap-pos-card:hover {
            border-color: #114171;
            box-shadow: 0 8px 28px rgba(17,65,113,0.1);
            transform: translateY(-3px);
          }
          .ap-pos-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 8px;
          }
          .ap-pos-title {
            font-size: 0.98rem;
            font-weight: 700;
            color: #0F1F40;
            line-height: 1.35;
          }
          .ap-pos-badge {
            flex-shrink: 0;
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            padding: 3px 9px;
            border-radius: 100px;
          }
          .ap-badge-urgent { background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; }
          .ap-badge-open { background: #f0fdf4; color: #059669; border: 1px solid #86efac; }
          .ap-badge-fresher { background: #eff6ff; color: #2563eb; border: 1px solid #93c5fd; }
          .ap-pos-meta {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }
          .ap-pos-tag {
            font-size: 0.78rem;
            color: #6b7280;
            background: #f3f4f6;
            padding: 3px 10px;
            border-radius: 100px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .ap-pos-apply {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 0.85rem;
            font-weight: 700;
            color: #114171;
            background: rgba(17,65,113,0.07);
            border: none;
            border-radius: 100px;
            padding: 8px 16px;
            cursor: pointer;
            font-family: inherit;
            transition: background 0.2s, color 0.2s;
            text-align: left;
          }
          .ap-pos-apply:hover { background: #114171; color: #fff; }

          /* ─── Perks ─── */
          .ap-perks-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 44px;
          }
          .ap-perk-card {
            background: rgba(255,255,255,0.75);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(17,65,113,0.1);
            border-radius: 16px;
            padding: 28px 24px;
            box-shadow: 0 2px 16px rgba(17,65,113,0.05),
                        inset 0 1px 0 rgba(255,255,255,0.95);
            transition: transform 0.25s, box-shadow 0.25s;
          }
          .ap-perk-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(17,65,113,0.1),
                        inset 0 1px 0 rgba(255,255,255,0.95);
          }
          .ap-perk-icon { font-size: 1.75rem; margin-bottom: 14px; }
          .ap-perk-title { font-size: 0.97rem; font-weight: 700; color: #0F1F40; margin-bottom: 8px; }
          .ap-perk-desc { font-size: 0.88rem; line-height: 1.62; color: #4b5563; }

          /* ─── Form ─── */
          .ap-form-section {
            background: #f8fafc;
          }
          .ap-form-layout {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 48px;
            align-items: start;
            margin-top: 48px;
          }
          .ap-form-sidebar {
            position: sticky;
            top: 100px;
          }
          .ap-sidebar-card {
            background: rgba(255,255,255,0.85);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(17,65,113,0.1);
            border-radius: 16px;
            padding: 24px 20px;
            margin-bottom: 16px;
            box-shadow: 0 2px 16px rgba(17,65,113,0.06);
          }
          .ap-sidebar-title {
            font-size: 0.85rem;
            font-weight: 700;
            color: #0F1F40;
            margin-bottom: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .ap-sidebar-list {
            list-style: none;
            padding: 0; margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .ap-sidebar-list li {
            font-size: 0.83rem;
            color: #4b5563;
            display: flex;
            align-items: flex-start;
            gap: 8px;
            line-height: 1.45;
          }
          .ap-sidebar-list li::before {
            content: '✓';
            color: #44973D;
            font-weight: 700;
            flex-shrink: 0;
            margin-top: 1px;
          }
          .ap-sidebar-contact {
            font-size: 0.83rem;
            color: #4b5563;
            line-height: 1.6;
          }
          .ap-sidebar-contact a {
            color: #114171;
            font-weight: 600;
            text-decoration: none;
          }
          .ap-sidebar-contact a:hover { text-decoration: underline; }

          /* Form card */
          .ap-form-card {
            background: rgba(255,255,255,0.88);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.95);
            border-radius: 24px;
            padding: 44px 40px;
            box-shadow: 0 8px 48px rgba(17,65,113,0.08),
                        inset 0 1px 0 rgba(255,255,255,1);
          }
          .ap-form-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: #0F1F40;
            margin: 0 0 4px;
            letter-spacing: -0.02em;
          }
          .ap-form-subtitle {
            font-size: 0.9rem;
            color: #6b7280;
            margin: 0 0 32px;
          }

          /* Selected position banner */
          .ap-selected-pos {
            display: flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, rgba(17,65,113,0.07), rgba(254,151,0,0.08));
            border: 1.5px solid rgba(17,65,113,0.18);
            border-radius: 12px;
            padding: 14px 18px;
            margin-bottom: 28px;
          }
          .ap-selected-pos-icon {
            width: 36px; height: 36px;
            background: #114171;
            border-radius: 9px;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
          }
          .ap-selected-pos-label {
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-weight: 700;
            color: #FE9700;
            margin-bottom: 2px;
          }
          .ap-selected-pos-title { font-size: 0.97rem; font-weight: 700; color: #0F1F40; }

          /* Form elements */
          .ap-form { display: flex; flex-direction: column; gap: 18px; }
          .ap-form-section-head {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #9ca3af;
            padding-bottom: 10px;
            border-bottom: 1px solid #f3f4f6;
            margin-bottom: 2px;
          }
          .ap-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
          .ap-field { display: flex; flex-direction: column; gap: 6px; }
          .ap-field.ap-full { grid-column: 1 / -1; }
          .ap-label {
            font-size: 0.82rem;
            font-weight: 600;
            color: #374151;
          }
          .ap-req { color: #FE9700; margin-left: 2px; }
          .ap-input,
          .ap-select,
          .ap-textarea {
            width: 100%;
            padding: 11px 14px;
            border: 1.5px solid rgba(17,65,113,0.15);
            border-radius: 10px;
            font-size: 0.93rem;
            font-family: inherit;
            color: #0F1F40;
            background: rgba(255,255,255,0.6);
            transition: border-color 0.2s, box-shadow 0.2s;
            outline: none;
          }
          .ap-input::placeholder,
          .ap-textarea::placeholder { color: #9ca3af; }
          .ap-input:focus,
          .ap-select:focus,
          .ap-textarea:focus {
            border-color: #114171;
            box-shadow: 0 0 0 3px rgba(17,65,113,0.1);
            background: #fff;
          }
          .ap-select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23374151'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 12px center;
            background-size: 20px;
            padding-right: 40px;
            cursor: pointer;
          }
          .ap-textarea { resize: vertical; min-height: 110px; line-height: 1.6; }

          /* Phone */
          .ap-phone-wrap {
            display: flex;
            border: 1.5px solid rgba(17,65,113,0.15);
            border-radius: 10px;
            overflow: hidden;
            background: rgba(255,255,255,0.6);
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .ap-phone-wrap:focus-within {
            border-color: #114171;
            box-shadow: 0 0 0 3px rgba(17,65,113,0.1);
            background: #fff;
          }
          .ap-phone-cc {
            padding: 11px 10px;
            border: none;
            border-right: 1.5px solid rgba(17,65,113,0.1);
            background: transparent;
            font-size: 0.88rem;
            color: #374151;
            font-family: inherit;
            outline: none;
            cursor: pointer;
            flex-shrink: 0;
          }
          .ap-phone-num {
            flex: 1;
            padding: 11px 14px;
            border: none;
            background: transparent;
            font-size: 0.93rem;
            font-family: inherit;
            color: #0F1F40;
            outline: none;
          }
          .ap-phone-num::placeholder { color: #9ca3af; }

          /* Helper text */
          .ap-hint {
            font-size: 0.76rem;
            color: #9ca3af;
            margin-top: 3px;
            line-height: 1.4;
          }

          /* Consent */
          .ap-consent {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            padding: 14px 16px;
            background: rgba(17,65,113,0.04);
            border-radius: 10px;
            border: 1px solid rgba(17,65,113,0.08);
          }
          .ap-consent input[type="checkbox"] {
            margin-top: 2px;
            width: 16px; height: 16px;
            cursor: pointer;
            flex-shrink: 0;
            accent-color: #114171;
          }
          .ap-consent-label {
            font-size: 0.83rem;
            color: #4b5563;
            line-height: 1.5;
          }

          /* Error */
          .ap-error-msg {
            background: #fef2f2;
            border: 1px solid #fca5a5;
            border-radius: 10px;
            padding: 12px 16px;
            font-size: 0.88rem;
            color: #dc2626;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          /* Submit */
          .ap-submit {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            padding: 15px 32px;
            background: #114171;
            color: #fff;
            border: none;
            border-radius: 100px;
            font-size: 1rem;
            font-weight: 700;
            font-family: inherit;
            cursor: pointer;
            transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
            margin-top: 4px;
          }
          .ap-submit:hover:not(:disabled) {
            background: #0d3260;
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(17,65,113,0.28);
          }
          .ap-submit:disabled { opacity: 0.65; cursor: not-allowed; }
          .ap-spinner {
            width: 18px; height: 18px;
            border: 2.5px solid rgba(255,255,255,0.35);
            border-top-color: #fff;
            border-radius: 50%;
            animation: ap-spin 0.7s linear infinite;
            flex-shrink: 0;
          }
          @keyframes ap-spin { to { transform: rotate(360deg); } }

          /* ─── Success ─── */
          .ap-success {
            text-align: center;
            padding: 16px 0 8px;
          }
          .ap-success-icon {
            width: 76px; height: 76px;
            background: linear-gradient(135deg, #d1fae5, #a7f3d0);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 24px;
          }
          .ap-success-icon svg { width: 38px; height: 38px; color: #059669; }
          .ap-success-title {
            font-size: 1.65rem;
            font-weight: 800;
            color: #0F1F40;
            margin-bottom: 12px;
            letter-spacing: -0.02em;
          }
          .ap-success-sub {
            font-size: 0.97rem;
            color: #4b5563;
            line-height: 1.65;
            margin-bottom: 28px;
            max-width: 380px;
            margin-left: auto;
            margin-right: auto;
          }
          .ap-success-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
          .ap-success-btn {
            display: inline-block;
            padding: 12px 24px;
            background: rgba(17,65,113,0.08);
            color: #114171;
            border-radius: 100px;
            font-weight: 700;
            font-size: 0.9rem;
            text-decoration: none;
            transition: background 0.2s;
          }
          .ap-success-btn:hover { background: rgba(17,65,113,0.14); }
          .ap-success-btn-primary {
            background: #114171;
            color: #fff;
          }
          .ap-success-btn-primary:hover { background: #0d3260; }

          /* ─── Responsive ─── */
          @media (max-width: 1024px) {
            .ap-positions-grid { grid-template-columns: repeat(2, 1fr); }
            .ap-perks-grid { grid-template-columns: repeat(2, 1fr); }
            .ap-form-layout { grid-template-columns: 1fr; }
            .ap-form-sidebar { position: static; }
          }
          @media (max-width: 768px) {
            .ap-hero-inner { grid-template-columns: 1fr; gap: 40px; }
            .ap-hero-chips { grid-template-columns: 1fr 1fr; }
            .ap-section { padding: 56px 20px; }
            .ap-positions-grid { grid-template-columns: 1fr; }
            .ap-perks-grid { grid-template-columns: 1fr; }
            .ap-row { grid-template-columns: 1fr; }
            .ap-form-card { padding: 28px 20px; }
          }
          @media (max-width: 480px) {
            .ap-hero { padding: 80px 20px 60px; }
            .ap-hero-chips { grid-template-columns: 1fr; }
          }
        `}</style>
      </Head>

      <div className="ap-page">

        {/* ── Hero ── */}
        <section className="ap-hero">
          <div className="ap-orb ap-orb-1" />
          <div className="ap-orb ap-orb-2" />
          <div className="ap-hero-inner">
            <div>
              <div className="ap-hero-eyebrow">
                <span className="ap-hero-dot" />
                We&apos;re Hiring — New Delhi, India
              </div>
              <h1>
                Build your career at{' '}
                <span className="ap-gradient-text">1Solutions.</span>
              </h1>
              <p className="ap-hero-sub">
                We&apos;re a 15-year-old web development and digital marketing agency working with
                clients across the US, Canada, and Australia. Join a team that works on real global
                projects, grows fast, and cares about its people.
              </p>
              <button
                className="ap-hero-btn"
                onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                Apply Now
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                </svg>
              </button>
            </div>
            <div className="ap-hero-chips">
              {[
                { icon: '👥', title: '50+ Team Members', sub: 'Collaborative environment' },
                { icon: '🌏', title: 'Global Projects', sub: 'US, Canada, Australia' },
                { icon: '📅', title: 'Est. 2008', sub: '15+ years in operation' },
                { icon: '📍', title: 'New Delhi', sub: 'On-site & hybrid roles' },
              ].map((chip) => (
                <div key={chip.title} className="ap-hero-chip">
                  <div className="ap-chip-icon">{chip.icon}</div>
                  <div>
                    <div className="ap-chip-text">{chip.title}</div>
                    <div className="ap-chip-sub">{chip.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Open Positions ── */}
        <section className="ap-section ap-positions-section">
          <div className="ap-container">
            <p className="ap-eyebrow">Open Roles</p>
            <h2 className="ap-heading">Current open positions.</h2>
            <p className="ap-lead">
              Don&apos;t see a perfect fit? Submit a general application — we review all profiles and
              reach out when a matching role opens up.
            </p>
            <div className="ap-positions-grid">
              {POSITIONS.filter((p) => p.title !== 'Other / General Application').map((pos) => (
                <div key={pos.title} className="ap-pos-card">
                  <div className="ap-pos-top">
                    <div className="ap-pos-title">{pos.title}</div>
                    {pos.tag && (
                      <span
                        className={`ap-pos-badge ${
                          pos.tag === 'Urgent'
                            ? 'ap-badge-urgent'
                            : pos.tag === 'Fresher'
                            ? 'ap-badge-fresher'
                            : 'ap-badge-open'
                        }`}
                      >
                        {pos.tag}
                      </span>
                    )}
                  </div>
                  <div className="ap-pos-meta">
                    <span className="ap-pos-tag">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11">
                        <path d="M20 6h-2.18c.07-.44.18-.88.18-1a3 3 0 0 0-6 0 3 3 0 0 0-6 0c0 .12.11.56.18 1H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
                      </svg>
                      {pos.type}
                    </span>
                    <span className="ap-pos-tag">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                      </svg>
                      New Delhi
                    </span>
                    <span className="ap-pos-tag">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 13H11v-6h1.5v6zm0-8H11V5h1.5v2z" />
                      </svg>
                      {pos.exp}
                    </span>
                  </div>
                  <button
                    className="ap-pos-apply"
                    onClick={() => applyForPosition(pos.title)}
                  >
                    Apply for this role
                    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Perks ── */}
        <section
          className="ap-section"
          style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 25%, #e0f2fe 50%, #fef3c7 75%, #fce7f3 100%)' }}
        >
          <div className="ap-container">
            <div style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
              <p className="ap-eyebrow">Why Join Us</p>
              <h2 className="ap-heading">What working at 1Solutions looks like.</h2>
            </div>
            <div className="ap-perks-grid">
              {PERKS.map((perk) => (
                <div key={perk.title} className="ap-perk-card">
                  <div className="ap-perk-icon">{perk.icon}</div>
                  <div className="ap-perk-title">{perk.title}</div>
                  <div className="ap-perk-desc">{perk.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Application Form ── */}
        <section className="ap-section ap-form-section" id="apply-form">
          <div className="ap-container">
            <p className="ap-eyebrow">Apply Now</p>
            <h2 className="ap-heading">Submit your application.</h2>
            <div className="ap-form-layout">

              {/* Sidebar */}
              <aside className="ap-form-sidebar">
                <div className="ap-sidebar-card">
                  <div className="ap-sidebar-title">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ color: '#FE9700' }}>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    What happens next
                  </div>
                  <ul className="ap-sidebar-list">
                    <li>We review every application within 48 hours</li>
                    <li>Shortlisted candidates get a screening call</li>
                    <li>Technical assessment (role-specific)</li>
                    <li>Final interview with the team lead</li>
                    <li>Offer letter within 5 business days</li>
                  </ul>
                </div>
                <div className="ap-sidebar-card">
                  <div className="ap-sidebar-title">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ color: '#FE9700' }}>
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    Questions?
                  </div>
                  <p className="ap-sidebar-contact">
                    Reach our HR team directly at{' '}
                    <a href="mailto:info@1solutions.biz">info@1solutions.biz</a>
                    {' '}or call{' '}
                    <a href="tel:+919654327900">+91 96543 27900</a>.
                  </p>
                </div>
                <div className="ap-sidebar-card">
                  <div className="ap-sidebar-title">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ color: '#FE9700' }}>
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                    </svg>
                    Resume tip
                  </div>
                  <p className="ap-sidebar-contact">
                    Upload your resume to Google Drive or Dropbox (set to &ldquo;anyone with link can view&rdquo;)
                    and paste the link in the form.
                  </p>
                </div>
              </aside>

              {/* Form card */}
              <div className="ap-form-card" ref={formRef}>
                {status === 'success' ? (
                  <div className="ap-success">
                    <div className="ap-success-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="ap-success-title">Application Received!</div>
                    <p className="ap-success-sub">
                      Thank you for applying. Our HR team will review your profile and
                      get back to you within 48 hours.
                    </p>
                    <div className="ap-success-actions">
                      <a href="/" className="ap-success-btn">Back to Home</a>
                      <a href="/who-we-are/" className="ap-success-btn ap-success-btn-primary">About 1Solutions</a>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="ap-form-title">Application Form</div>
                    <p className="ap-form-subtitle">
                      Fields marked <span style={{ color: '#FE9700' }}>*</span> are required.
                    </p>

                    {selectedPosition && (
                      <div className="ap-selected-pos">
                        <div className="ap-selected-pos-icon">
                          <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                            <path d="M20 6h-2.18c.07-.44.18-.88.18-1a3 3 0 0 0-6 0 3 3 0 0 0-6 0c0 .12.11.56.18 1H4c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="ap-selected-pos-label">Applying For</div>
                          <div className="ap-selected-pos-title">{selectedPosition}</div>
                        </div>
                      </div>
                    )}

                    <form className="ap-form" onSubmit={handleSubmit} noValidate>

                      {/* Personal Details */}
                      <div className="ap-form-section-head">Personal Details</div>

                      <div className="ap-row">
                        <div className="ap-field">
                          <label className="ap-label" htmlFor="ap-name">
                            Full Name <span className="ap-req">*</span>
                          </label>
                          <input
                            id="ap-name" className="ap-input" type="text" name="name"
                            placeholder="Rahul Sharma" value={form.name}
                            onChange={handleChange} required autoComplete="name"
                          />
                        </div>
                        <div className="ap-field">
                          <label className="ap-label" htmlFor="ap-email">
                            Email Address <span className="ap-req">*</span>
                          </label>
                          <input
                            id="ap-email" className="ap-input" type="email" name="email"
                            placeholder="rahul@email.com" value={form.email}
                            onChange={handleChange} required autoComplete="email"
                          />
                        </div>
                      </div>

                      <div className="ap-row">
                        <div className="ap-field">
                          <label className="ap-label" htmlFor="ap-phone">
                            Phone Number <span className="ap-req">*</span>
                          </label>
                          <div className="ap-phone-wrap">
                            <select className="ap-phone-cc" aria-label="Country code">
                              <option value="+91">🇮🇳 +91</option>
                              <option value="+1">🇺🇸 +1</option>
                              <option value="+61">🇦🇺 +61</option>
                              <option value="+44">🇬🇧 +44</option>
                            </select>
                            <input
                              id="ap-phone" className="ap-phone-num" type="tel" name="phone"
                              placeholder="98765 43210" value={form.phone}
                              onChange={handleChange} required autoComplete="tel"
                            />
                          </div>
                        </div>
                        <div className="ap-field">
                          <label className="ap-label" htmlFor="ap-location">
                            Current Location <span className="ap-req">*</span>
                          </label>
                          <input
                            id="ap-location" className="ap-input" type="text" name="location"
                            placeholder="City, State" value={form.location}
                            onChange={handleChange} required
                          />
                        </div>
                      </div>

                      {/* Role Details */}
                      <div className="ap-form-section-head" style={{ marginTop: 6 }}>Role Details</div>

                      <div className="ap-row">
                        <div className="ap-field">
                          <label className="ap-label" htmlFor="ap-position">
                            Position Applying For <span className="ap-req">*</span>
                          </label>
                          <select
                            id="ap-position" className="ap-select" name="position"
                            value={form.position} onChange={handleChange} required
                          >
                            <option value="">Select a position…</option>
                            {POSITION_NAMES.map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                        </div>
                        <div className="ap-field">
                          <label className="ap-label" htmlFor="ap-experience">
                            Total Experience <span className="ap-req">*</span>
                          </label>
                          <select
                            id="ap-experience" className="ap-select" name="experience"
                            value={form.experience} onChange={handleChange} required
                          >
                            <option value="">Select…</option>
                            {EXPERIENCE.map((e) => (
                              <option key={e} value={e}>{e}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="ap-row">
                        <div className="ap-field">
                          <label className="ap-label" htmlFor="ap-current-salary">
                            Current CTC (per annum)
                          </label>
                          <input
                            id="ap-current-salary" className="ap-input" type="text"
                            name="currentSalary" placeholder="e.g. ₹4.5 LPA"
                            value={form.currentSalary} onChange={handleChange}
                          />
                        </div>
                        <div className="ap-field">
                          <label className="ap-label" htmlFor="ap-expected-salary">
                            Expected CTC (per annum)
                          </label>
                          <input
                            id="ap-expected-salary" className="ap-input" type="text"
                            name="expectedSalary" placeholder="e.g. ₹6 LPA"
                            value={form.expectedSalary} onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="ap-row">
                        <div className="ap-field">
                          <label className="ap-label" htmlFor="ap-notice">
                            Notice Period <span className="ap-req">*</span>
                          </label>
                          <select
                            id="ap-notice" className="ap-select" name="noticePeriod"
                            value={form.noticePeriod} onChange={handleChange} required
                          >
                            <option value="">Select…</option>
                            {NOTICE_PERIODS.map((n) => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>
                        <div className="ap-field">
                          <label className="ap-label" htmlFor="ap-source">
                            How Did You Hear About Us?
                          </label>
                          <select
                            id="ap-source" className="ap-select" name="source"
                            value={form.source} onChange={handleChange}
                          >
                            <option value="">Select…</option>
                            {SOURCES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="ap-form-section-head" style={{ marginTop: 6 }}>
                        Your Profile &amp; Portfolio
                      </div>

                      <div className="ap-row">
                        <div className="ap-field">
                          <label className="ap-label" htmlFor="ap-linkedin">LinkedIn Profile</label>
                          <input
                            id="ap-linkedin" className="ap-input" type="url" name="linkedin"
                            placeholder="https://linkedin.com/in/yourname"
                            value={form.linkedin} onChange={handleChange}
                          />
                        </div>
                        <div className="ap-field">
                          <label className="ap-label" htmlFor="ap-resume">
                            Resume / Portfolio URL <span className="ap-req">*</span>
                          </label>
                          <input
                            id="ap-resume" className="ap-input" type="url" name="resumeUrl"
                            placeholder="Google Drive / Dropbox / Portfolio link"
                            value={form.resumeUrl} onChange={handleChange} required
                          />
                          <p className="ap-hint">Share a public link to your resume or portfolio.</p>
                        </div>
                      </div>

                      {/* Cover letter */}
                      <div className="ap-form-section-head" style={{ marginTop: 6 }}>Cover Letter</div>

                      <div className="ap-field ap-full">
                        <label className="ap-label" htmlFor="ap-cover">
                          Why do you want to join 1Solutions? <span className="ap-req">*</span>
                        </label>
                        <textarea
                          id="ap-cover" className="ap-textarea" name="coverLetter"
                          placeholder="Tell us about yourself, your key skills, what excites you about this role, and why you think 1Solutions is the right fit for you…"
                          value={form.coverLetter} onChange={handleChange}
                          required rows={5}
                        />
                      </div>

                      {/* Consent */}
                      <div className="ap-consent">
                        <input
                          type="checkbox" id="ap-consent" name="consent"
                          checked={form.consent} onChange={handleChange} required
                        />
                        <label htmlFor="ap-consent" className="ap-consent-label">
                          I confirm that all information provided is accurate and I consent to
                          1Solutions processing my data for recruitment purposes.{' '}
                          <span style={{ color: '#FE9700' }}>*</span>
                        </label>
                      </div>

                      {status === 'error' && (
                        <div className="ap-error-msg">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" style={{ flexShrink: 0 }}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                          </svg>
                          {errorMsg}
                        </div>
                      )}

                      <button
                        type="submit" className="ap-submit"
                        disabled={status === 'loading'}
                      >
                        {status === 'loading' ? (
                          <>
                            <span className="ap-spinner" />
                            Submitting Application…
                          </>
                        ) : (
                          <>
                            Submit Application
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                          </>
                        )}
                      </button>

                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
