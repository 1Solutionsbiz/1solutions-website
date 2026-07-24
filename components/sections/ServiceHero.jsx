import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const DEFAULT_LOGOS = [
  ['/logo/Indian_Express_Logo_full.png', 'Indian Express'],
  ['/logo/Verizon_2015_logo_-vector.svg.png', 'Verizon'],
  ['/logo/Uniphore.jpg', 'Uniphore'],
  ['/logo/ICCoLogo.png', 'ICC'],
  ['/logo/Honor_Logo_(2020).svg.png', 'Honor'],
  ['/logo/Zuari-Finserv-logo-new.png', 'Zuari Finserv'],
  ['/logo/amarujala-print-logo_60e03f7d5b4a8.webp', 'Amar Ujala'],
  ['/logo/Nuance-Symbol-500x281.png', 'Nuance'],
  ['/logo/PHDCCI-Logo-2024.png', 'PHD Chamber'],
  ['/logo/Wilson-logo.svg.png', 'Wilson'],
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numTarget = parseInt(String(target).replace(/\D/g, ''), 10);
    if (!numTarget) return;
    let startTime = null;
    let raf;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return count;
}

function AnimatedStat({ label, value, prefix = '', suffix = '', started }) {
  const num = useCountUp(value, 1800, started);
  const hasComma = String(value).includes(',');
  const display = started ? prefix + (hasComma ? num.toLocaleString() : num) + suffix : prefix + value + suffix;
  return (
    <div className="svh-stat">
      <div className="svh-stat-l">{label}</div>
      <div className="svh-stat-v">{display}</div>
    </div>
  );
}

export default function ServiceHero({
  eyebrow,
  title,
  subtext,
  primaryCta,
  secondaryCta,
  stats,
  logos = DEFAULT_LOGOS,
  showLogos = true,
}) {
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);
  const logosDoubled = [...logos, ...logos];

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .svh-wrap{position:relative;overflow:hidden;z-index:1;background:linear-gradient(135deg,#dbeafe 0%,#ede9fe 25%,#e0f2fe 50%,#fef3c7 75%,#fce7f3 100%);font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif}
        .svh-wrap::before{content:'';position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(99,130,255,.30) 0%,rgba(139,92,246,.12) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px)}
        .svh-wrap::after{content:'';position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(251,146,60,.25) 0%,rgba(245,158,11,.12) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px)}
        .svh-orb3{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,166,.18) 0%,transparent 70%);top:45%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px)}

        .svh-hero-content{position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px}
        .svh-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:18px}
        .svh-h1{font-size:clamp(2rem,5vw,3.4rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;color:#111827}
        .svh-sub{font-size:16px;color:#3A507A;line-height:1.65;max-width:640px;margin:0 auto 28px}

        .svh-btns{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:32px}
        .svh-btn-primary{position:relative;overflow:hidden;display:inline-block;padding:14px 40px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
        .svh-btn-primary:hover{background:rgba(255,255,255,.85);border-color:rgba(245,158,11,.6);box-shadow:0 12px 36px rgba(15,52,96,.15),0 0 0 2px rgba(245,158,11,.22),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0F3460}
        .svh-btn-primary::after{content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,.75) 45%,rgba(255,255,255,.9) 50%,rgba(255,255,255,.75) 55%,transparent 100%);animation:svh-shimmer 2.5s ease-in-out infinite;pointer-events:none}
        @keyframes svh-shimmer{0%{left:-120%}35%,100%{left:160%}}
        .svh-btn-outline{display:inline-block;padding:14px 32px;background:transparent;border:1.5px solid rgba(15,52,96,.25);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .3s}
        .svh-btn-outline:hover{border-color:rgba(217,119,6,.5);color:#D97706;transform:translateY(-2px)}

        .svh-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
        .svh-stat{padding:18px 20px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
        .svh-stat:last-child{border-right:none}
        .svh-stat-l{font-size:12px;color:#4A6080;font-weight:500;margin-bottom:6px}
        .svh-stat-v{font-size:26px;font-weight:900;color:#D97706;letter-spacing:-.5px;line-height:1}

        .svh-clients-bar{position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px}
        .svh-clients-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0}
        .svh-clients-logos{width:100%;overflow:hidden}
        .svh-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:svh-marquee 28s linear infinite}
        .svh-logos-track:hover{animation-play-state:paused}
        @keyframes svh-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .svh-client-logo{height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:.5;transition:opacity .25s,filter .25s}
        .svh-client-logo:hover{opacity:.85;filter:grayscale(0%)}

        @media (max-width:640px){
          .svh-hero-content{padding:36px 20px 24px}
          .svh-h1{font-size:clamp(1.7rem,6vw,2.4rem)}
          .svh-btns{flex-direction:column}
          .svh-stats{grid-template-columns:repeat(2,1fr)}
          .svh-stat:nth-child(2){border-right:none}
          .svh-stat:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}
          .svh-stat:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}
          .svh-clients-bar{padding:16px 20px 36px;gap:12px}
        }
      `}</style>

      <div className="svh-wrap">
        <div className="svh-orb3" />

        <div className="svh-hero-content">
          {eyebrow && <span className="svh-eyebrow">{eyebrow}</span>}
          <h1 className="svh-h1">{title}</h1>
          {subtext && <p className="svh-sub">{subtext}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="svh-btns">
              {primaryCta && <Link href={primaryCta.href} className="svh-btn-primary">{primaryCta.label}</Link>}
              {secondaryCta && <Link href={secondaryCta.href} className="svh-btn-outline">{secondaryCta.label}</Link>}
            </div>
          )}
        </div>

        {stats && stats.length > 0 && (
          <div className="svh-stats" ref={statsRef}>
            {stats.map((s) => (
              <AnimatedStat key={s.label} label={s.label} value={s.value} prefix={s.prefix || ''} suffix={s.suffix || ''} started={statsStarted} />
            ))}
          </div>
        )}

        {showLogos && (
          <div className="svh-clients-bar">
            <span className="svh-clients-label">Trusted by Leading Brands</span>
            <div className="svh-clients-logos">
              <div className="svh-logos-track">
                {logosDoubled.map(([src, alt], i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={`${alt}-${i}`} src={src} alt={alt} className="svh-client-logo" />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
