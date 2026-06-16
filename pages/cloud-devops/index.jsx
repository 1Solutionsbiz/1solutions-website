'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SERVICES = [
  { n:'01', title:'Cloud Migration & Modernisation', desc:'Lift-and-shift or re-architect — we move workloads from on-premise to AWS, Azure, or GCP with zero downtime and a clear cost model.', featured:true },
  { n:'02', title:'AWS Architecture & Management', desc:'Design, provision, and manage AWS infrastructure — EC2, RDS, S3, Lambda, ECS, EKS — with cost governance and security built in from day one.', featured:false },
  { n:'03', title:'Azure Cloud Services', desc:'Enterprise-grade Azure deployments — App Services, AKS, Azure DevOps, Active Directory, and Azure OpenAI integrations for enterprise teams.', featured:false },
  { n:'04', title:'Google Cloud Platform (GCP)', desc:'GCP infrastructure for data-heavy workloads — BigQuery, Cloud Run, GKE, Vertex AI, and Pub/Sub pipelines tuned for performance and cost.', featured:false },
  { n:'05', title:'Kubernetes & Container Orchestration', desc:'Design and manage Kubernetes clusters — EKS, AKS, GKE — with Helm charts, autoscaling policies, and GitOps-driven deployments.', featured:false },
  { n:'06', title:'CI/CD Pipeline Engineering', desc:'Automated build, test, and deploy pipelines using GitHub Actions, GitLab CI, Jenkins, and ArgoCD — so every push ships safely and quickly.', featured:false },
  { n:'07', title:'Infrastructure as Code (IaC)', desc:'Terraform, Pulumi, and AWS CDK to define, version, and provision cloud infrastructure — reproducible, auditable, and disaster-proof.', featured:false },
  { n:'08', title:'Site Reliability Engineering (SRE)', desc:'SLOs, error budgets, incident runbooks, and observability stacks (Datadog, Grafana, Prometheus) that keep uptime above 99.9%.', featured:false },
  { n:'09', title:'Cloud Security & Compliance', desc:'IAM hardening, network segmentation, secrets management, SIEM integration, and compliance automation for SOC 2, ISO 27001, and GDPR.', featured:false },
  { n:'10', title:'Cost Optimisation & FinOps', desc:'Right-sizing, Reserved Instance strategies, Spot fleet management, and continuous spend analytics that typically cut cloud bills by 25–40%.', featured:false },
  { n:'11', title:'Serverless Architecture', desc:'Lambda, Cloud Functions, and Azure Functions for event-driven workloads — no servers to manage, infinite scale, and pay-per-execution pricing.', featured:false },
  { n:'12', title:'Managed DevOps Retainer', desc:'Embedded DevOps support — on-call engineering, incident response, pipeline maintenance, and weekly infrastructure reviews on a monthly retainer.', featured:false },
];

const FAQS = [
  { q:'How long does a cloud migration take?', a:'A straightforward lift-and-shift of 5–20 servers typically takes 4–8 weeks. Re-architecting applications into microservices or containers takes 3–6 months. Large-scale migrations (100+ workloads, multi-region, compliance requirements) can take 6–18 months. We always start with a Cloud Readiness Assessment to give you a realistic timeline and phased plan before any migration work begins.' },
  { q:'Which cloud provider should we choose — AWS, Azure, or GCP?', a:'AWS is the broadest platform and right for most workloads. Azure is the natural fit if your organisation already runs Microsoft 365, Active Directory, or .NET workloads. GCP is strongest for data engineering, machine learning, and analytics-heavy pipelines. We give you an honest recommendation based on your stack, team skills, and existing vendor agreements — not on partnership incentives.' },
  { q:'How much does cloud infrastructure cost?', a:'Cloud costs depend entirely on workload size, traffic patterns, and the architecture we design. We provide a detailed cost model before any work starts, including projected monthly spend by service. Our FinOps practice typically reduces existing cloud bills by 25–40% through right-sizing, Reserved Instances, and Spot fleet strategies. A fixed-price DevOps engagement starts from $3,500/month.' },
  { q:'Can you take over management of our existing cloud environment?', a:'Yes. We onboard existing AWS, Azure, and GCP environments through a structured audit — reviewing architecture, security posture, cost structure, and operational processes. We then produce a remediation roadmap and, once agreed, take over day-to-day management on a monthly retainer. Most clients see security and cost improvements within the first 30 days.' },
  { q:'What is Infrastructure as Code and why does it matter?', a:'Infrastructure as Code (IaC) means your cloud resources — servers, databases, load balancers, networking — are defined in version-controlled code (Terraform, Pulumi, CDK) rather than configured manually. This makes your infrastructure reproducible, auditable, and disaster-proof. If a region goes down, you can spin up an identical environment in a new region in minutes rather than days.' },
  { q:'How do you approach cloud security and compliance?', a:'Security is built into every layer — IAM least-privilege policies, network segmentation, encrypted secrets management (Vault, AWS Secrets Manager), WAF rules, and SIEM integration. For compliance, we automate control mapping to SOC 2, ISO 27001, HIPAA, and GDPR using tools like AWS Config, Azure Policy, and Wiz. We also prepare evidence packages for audits.' },
  { q:'Do you offer 24/7 incident response?', a:'Yes, on our SRE retainer engagements. We configure alerting thresholds, maintain incident runbooks, and provide on-call coverage with defined SLAs — P1 incidents acknowledged within 15 minutes, resolved within 2 hours for most categories. We use PagerDuty for escalation routing and provide post-incident reports within 24 hours.' },
  { q:'Can you set up CI/CD pipelines for our development team?', a:'Yes. We design and implement CI/CD pipelines tailored to your stack — GitHub Actions, GitLab CI, Jenkins, CircleCI, or ArgoCD for GitOps. This includes automated testing gates, security scanning (SAST/DAST/SCA), staging environment promotion, and production deploy approvals. Most teams reduce deployment frequency from weekly to multiple times per day after implementing a proper pipeline.' },
];

const WHY = [
  { icon:<svg viewBox="0 0 24 24"><path fill="#0EA5E9" d="M20 10.5c0-1.7-1.4-3-3-3-.4-2.2-2.3-3.8-4.5-3.8-2.5 0-4.6 2-4.6 4.5 0 .3 0 .5.1.8C6.3 9.5 5.1 11 5.1 12.8c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4z"/></svg>, title:'Certified Cloud Engineers', desc:'AWS Certified Architects, Azure Solutions Experts, and Google Cloud Engineers — credentials verified, not claimed.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#0EA5E9" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>, title:'Multi-Cloud Experience', desc:'We manage workloads across AWS, Azure, and GCP — and have migrated between them many times over the last decade.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#0EA5E9" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>, title:'25–40% Cost Reduction', desc:'Our FinOps reviews consistently reduce cloud spend by 25–40% through right-sizing, Reserved Instances, and architecture improvements.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#0EA5E9" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>, title:'Security-First Architecture', desc:'IAM, secrets management, network segmentation, and compliance automation built into every environment we design — not bolted on after.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#0EA5E9" d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>, title:'99.9%+ Uptime SLAs', desc:'SRE practices, alerting thresholds, incident runbooks, and on-call coverage that translate directly into uptime guarantees.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#0EA5E9" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>, title:'IaC-First Delivery', desc:'Everything we build is codified in Terraform or Pulumi — version-controlled, reproducible, and disaster-proof from day one.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#0EA5E9" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, title:'Embedded Team Model', desc:'Our engineers join your Slack, attend standups, and operate as an extension of your team — not a faceless external vendor.' },
  { icon:<svg viewBox="0 0 24 24"><path fill="#0EA5E9" d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline fill="none" stroke="#0EA5E9" strokeWidth="2" points="22 4 12 14.01 9 11.01"/></svg>, title:'15+ Years Infrastructure Experience', desc:'Enterprise clients including Fortune 500 companies have trusted us to design and manage mission-critical cloud infrastructure since 2008.' },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numTarget = parseInt(target.replace(/\D/g, ''), 10);
    if (!numTarget) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function AnimatedStat({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  const hasComma = val.includes(',');
  const display = started ? (hasComma ? num.toLocaleString() : num) + suffix : val;
  return (
    <div className="cd-stat-col">
      <div className="cd-stat-label">{label}</div>
      <div className="cd-stat-value">{display}</div>
    </div>
  );
}

export default function CloudDevopsPage() {
  const [showAll, setShowAll] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleECards, setVisibleECards] = useState([]);
  const stepRefs = useRef([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);
  const eCardsRef = useRef(null);

  useEffect(() => {
    const observers = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisibleSteps(p => p.includes(i)?p:[...p,i]), i*150); obs.disconnect(); } },
        { threshold: 0.25 }
      );
      obs.observe(el); return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(statsRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!whyGridRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { WHY.forEach((_,i) => setTimeout(() => setVisibleWhyCards(p => p.includes(i)?p:[...p,i]), i*100)); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(whyGridRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!testiGridRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { [0,1,2].forEach(i => setTimeout(() => setVisibleTestiCards(p => p.includes(i)?p:[...p,i]), i*150)); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(testiGridRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!eCardsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { [0,1,2,3].forEach(i => setTimeout(() => setVisibleECards(p => p.includes(i)?p:[...p,i]), i*130)); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(eCardsRef.current); return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key]; if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); } }, { threshold: 0.15 });
      obs.observe(el); return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  const visibleServices = showAll ? SERVICES : SERVICES.slice(0, 8);

  return (
    <>
      <Head>
        <title>Cloud & DevOps Services | AWS, Azure, GCP & CI/CD Engineering | 1Solutions</title>
        <meta name="description" content="1Solutions delivers cloud migration, infrastructure management, CI/CD pipelines, Kubernetes, and IaC on AWS, Azure, and GCP. Cut cloud costs 25–40%. 99.9%+ uptime SLAs." />
        <meta name="keywords" content="cloud devops services, aws cloud migration, azure devops, kubernetes managed services, ci cd pipeline, infrastructure as code, cloud cost optimisation" />
        <link rel="canonical" href="https://www.1solutions.biz/cloud-devops/" />
        <meta property="og:title" content="Cloud & DevOps Services | 1Solutions" />
        <meta property="og:description" content="Cloud migration, Kubernetes, CI/CD, and IaC on AWS, Azure, and GCP. Cut cloud costs 25–40% with certified engineers." />
        <meta property="og:url" content="https://www.1solutions.biz/cloud-devops/" />
        <style>{`
          .cd-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#f0f9ff 0%,#e0f2fe 25%,#eff6ff 55%,#f0fdf4 80%,#fafafa 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden;overflow-y:clip;}
          .cd-page *,.cd-page *::before,.cd-page *::after{box-sizing:border-box;}
          .cd-orb-1{position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.22) 0%,rgba(99,102,241,0.10) 40%,transparent 70%);top:-300px;right:-300px;pointer-events:none;z-index:0;filter:blur(20px);}
          .cd-orb-2{position:absolute;width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(16,185,129,0.18) 0%,rgba(14,165,233,0.08) 40%,transparent 70%);bottom:0;left:-250px;pointer-events:none;z-index:0;filter:blur(20px);}
          .cd-orb-3{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 70%);top:40%;left:-150px;transform:translateY(-50%);pointer-events:none;z-index:0;filter:blur(20px);}

          .cd-hero-block{background:transparent;position:relative;overflow:hidden;}
          .cd-hero-block::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,0.12) 0%,transparent 70%);top:-120px;left:-80px;pointer-events:none;filter:blur(40px);}
          .cd-hero-block::after{content:'';position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 70%);bottom:-60px;right:-60px;pointer-events:none;filter:blur(40px);}
          .cd-hero-content{position:relative;z-index:2;text-align:center;max-width:860px;margin:0 auto;padding:56px 40px 40px;}
          .cd-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#0369A1;margin-bottom:18px;}
          .cd-hero-content h1{font-size:48px;font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;background:linear-gradient(90deg,#0C4A6E 0%,#6366F1 55%,#10B981 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .cd-hero-content p{font-size:16px;color:#374151;line-height:1.65;max-width:640px;margin:0 auto 28px;}
          .cd-btn-hero{display:inline-block;padding:14px 40px;background:rgba(255,255,255,0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.85);border-radius:50px;color:#0C4A6E;font-weight:700;font-size:15px;text-decoration:none;transition:all 0.3s;box-shadow:0 4px 20px rgba(14,165,233,0.12),inset 0 1px 0 rgba(255,255,255,1);position:relative;overflow:hidden;}
          .cd-btn-hero::after{content:'';position:absolute;top:-10%;left:-120%;width:80%;height:120%;background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,0.75) 45%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.75) 55%,transparent 100%);animation:cd-shimmer 2.5s ease-in-out infinite;pointer-events:none;}
          @keyframes cd-shimmer{0%{left:-120%;}35%,100%{left:160%;}}
          .cd-btn-hero:hover{background:rgba(255,255,255,0.85);border-color:rgba(14,165,233,0.5);box-shadow:0 12px 36px rgba(14,165,233,0.18),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-3px);color:#0C4A6E;}

          .cd-hero-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:900px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 24px rgba(14,165,233,0.08),inset 0 1px 0 rgba(255,255,255,0.95);}
          .cd-stat-col{padding:18px 20px;text-align:center;border-right:1px solid rgba(14,165,233,0.10);}
          .cd-stat-col:last-child{border-right:none;}
          .cd-stat-label{font-size:12px;color:#374151;font-weight:500;margin-bottom:6px;}
          .cd-stat-value{font-size:26px;font-weight:900;color:#0EA5E9;letter-spacing:-0.5px;line-height:1;}

          .cd-clients-bar{position:relative;z-index:2;padding:20px 40px 60px;max-width:1440px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px;}
          .cd-clients-label{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#6A80A0;}
          .cd-clients-logos{width:100%;overflow:hidden;}
          .cd-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:cd-marquee 28s linear infinite;}
          .cd-logos-track:hover{animation-play-state:paused;}
          @keyframes cd-marquee{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
          .cd-client-logo{height:26px;width:auto;max-width:120px;object-fit:contain;filter:grayscale(100%);opacity:0.5;transition:opacity 0.25s,filter 0.25s;}
          .cd-client-logo:hover{opacity:0.85;filter:grayscale(0%);}

          .cd-section-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0EA5E9;margin-bottom:12px;display:block;}
          .cd-section-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0C4A6E 0%,#6366F1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin-bottom:10px;}
          .cd-section-desc{font-size:15px;color:#374151;line-height:1.7;max-width:680px;margin-bottom:36px;}

          .cd-services-section{background:#f0f9ff;padding:72px 40px 60px;position:relative;z-index:2;box-shadow:0 -20px 60px rgba(14,165,233,0.06),0 -4px 16px rgba(14,165,233,0.04);}
          .cd-services-inner{max-width:1280px;margin:0 auto;}
          .cd-services-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
          .cd-service-card{background:linear-gradient(135deg,rgba(224,242,254,0.60) 0%,rgba(255,255,255,0.88) 60%,rgba(240,253,244,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(14,165,233,0.06),inset 0 1px 0 rgba(255,255,255,0.95);transition:transform 0.22s,box-shadow 0.22s,border-color 0.22s;cursor:default;}
          .cd-service-card:hover{transform:translateY(-6px);border-color:rgba(14,165,233,0.40);box-shadow:0 16px 48px rgba(14,165,233,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .cd-service-card.featured{border-color:rgba(14,165,233,0.18);}
          .cd-service-card:hover h3{color:#0EA5E9;}
          .cd-card-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0C4A6E;opacity:0.055;pointer-events:none;letter-spacing:-4px;user-select:none;}
          .cd-service-card h3{font-size:15px;font-weight:700;color:#0F1F40;line-height:1.3;margin-bottom:8px;position:relative;z-index:1;}
          .cd-service-card p{font-size:13px;color:#374151;line-height:1.6;position:relative;z-index:1;}
          .cd-service-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#0EA5E9,#6366F1);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform 0.3s cubic-bezier(0.22,1,0.36,1);}
          .cd-service-card:hover::before{transform:scaleY(1);}
          .cd-services-footer{text-align:center;margin-top:20px;}
          .cd-btn-show-more{display:inline-block;background:#ffffff;border:1.5px solid rgba(14,165,233,0.20);color:#0369A1;padding:10px 32px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 10px rgba(14,165,233,0.08);font-family:inherit;}
          .cd-btn-show-more:hover{background:#0EA5E9;border-color:#0EA5E9;color:#ffffff;box-shadow:0 8px 28px rgba(14,165,233,0.20);transform:translateY(-2px);}

          .cd-stack-section{background:transparent;padding:80px 40px;position:relative;z-index:1;}
          .cd-stack-wrap{max-width:1280px;margin:0 auto;background:rgba(255,255,255,0.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.85);border-radius:24px;padding:44px 44px 50px;box-shadow:0 8px 40px rgba(14,165,233,0.07),inset 0 1px 0 rgba(255,255,255,0.95);}
          .cd-stack-title{font-size:38px;font-weight:900;line-height:1.15;letter-spacing:-0.8px;background:linear-gradient(90deg,#0C4A6E 0%,#6366F1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 12px;}
          .cd-stack-sub{font-size:15px;color:#374151;line-height:1.7;max-width:580px;margin:0 0 36px;}
          .cd-stack-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
          .cd-stack-card{background:rgba(255,255,255,0.65);backdrop-filter:blur(10px);border:1px solid rgba(14,165,233,0.12);border-radius:14px;padding:28px 24px;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s;}
          .cd-stack-card:hover{transform:translateY(-4px);border-color:rgba(14,165,233,0.40);box-shadow:0 12px 40px rgba(0,0,0,0.08);}
          .cd-stack-badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:14px;}
          .cd-stack-card h3{font-size:17px;font-weight:700;color:#0C4A6E;margin:0 0 8px;}
          .cd-stack-card p{font-size:13px;color:#374151;line-height:1.6;margin:0 0 16px;}
          .cd-stack-tags{display:flex;flex-wrap:wrap;gap:6px;}
          .cd-stack-tag{font-size:11px;font-weight:600;padding:3px 10px;border-radius:12px;background:rgba(14,165,233,0.08);color:#0369A1;}

          .cd-process-section{background:transparent;padding:80px 40px;position:relative;z-index:1;}
          .cd-process-top{max-width:1280px;margin:0 auto 56px;}
          .cd-process-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#0EA5E9;margin:0 0 14px;}
          .cd-process-main-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0C4A6E 0%,#6366F1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .cd-process-main-desc{font-size:15px;color:#374151;line-height:1.7;margin:0;}
          .cd-process-divider{border:none;border-top:1px solid rgba(14,165,233,0.15);margin:36px 0 0;width:100%;}
          .cd-process-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:minmax(0,55%) minmax(0,45%);gap:80px;align-items:start;}
          .cd-process-steps{display:flex;flex-direction:column;}
          .cd-pstep{display:grid;grid-template-columns:60px 1fr;gap:0 20px;opacity:0;transform:translateY(52px);transition:opacity 0.65s cubic-bezier(0.22,1,0.36,1),transform 0.65s cubic-bezier(0.22,1,0.36,1);}
          .cd-pstep.visible{opacity:1;transform:translateY(0);}
          .cd-pstep-left{display:flex;flex-direction:column;align-items:center;}
          .cd-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.65);backdrop-filter:blur(8px);border:2px solid rgba(14,165,233,0.20);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#0C4A6E;flex-shrink:0;transition:background 0.3s,border-color 0.3s;}
          .cd-pstep:hover .cd-pstep-circle{background:rgba(14,165,233,0.12);border-color:#0EA5E9;color:#0EA5E9;}
          .cd-pstep-arrow{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:48px;}
          .cd-pstep-arrow::before{content:'';width:2px;flex:1;background:#0EA5E9;opacity:0.25;}
          .cd-pstep-arrow::after{content:'';width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:9px solid #0EA5E9;opacity:0.45;margin-top:-1px;}
          .cd-pstep:last-child .cd-pstep-arrow{display:none;}
          .cd-pstep-content{padding:4px 0 44px;}
          .cd-pstep:last-child .cd-pstep-content{padding-bottom:0;}
          .cd-pstep-title{font-size:22px;font-weight:700;color:#0C4A6E;margin:0 0 10px;line-height:1.2;}
          .cd-pstep-desc{font-size:15px;color:#374151;line-height:1.75;margin:0;}
          .cd-process-image-col{position:sticky;top:100px;min-width:0;}
          .cd-process-img-wrap{width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(14,165,233,0.15);aspect-ratio:4/5;background:#e0f2fe;}
          .cd-process-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;}

          .cd-testi-section{background:#f0f9ff;border-top:1px solid rgba(14,165,233,0.08);border-bottom:1px solid rgba(14,165,233,0.08);padding:80px 40px;position:relative;z-index:1;}
          .cd-testi-inner{max-width:1280px;margin:0 auto;}
          .cd-section-header-center{text-align:center;margin-bottom:52px;}
          .cd-testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:52px;}
          .cd-tcard{background:linear-gradient(135deg,rgba(224,242,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(240,253,244,0.35) 100%);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(14,165,233,0.06),inset 0 1px 0 rgba(255,255,255,0.95);display:flex;flex-direction:column;gap:16px;opacity:0;transform:translateY(44px);transition:opacity 0.6s cubic-bezier(0.22,1,0.36,1),transform 0.6s cubic-bezier(0.22,1,0.36,1),box-shadow 0.3s,border-color 0.3s;}
          .cd-tcard.cd-tcard-visible{opacity:1;transform:translateY(0);}
          .cd-tcard:hover{transform:translateY(-6px);border-color:rgba(14,165,233,0.40);box-shadow:0 16px 48px rgba(14,165,233,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .cd-tcard.featured{border-color:rgba(14,165,233,0.22);}
          .cd-tcard-stars{font-size:18px;color:#0EA5E9;letter-spacing:2px;}
          .cd-tcard-text{font-size:15px;line-height:1.75;color:#374151;margin:0;flex:1;}
          .cd-tcard-author{display:flex;align-items:center;gap:12px;margin-top:4px;}
          .cd-tcard-avatar{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#ffffff;flex-shrink:0;}
          .cd-tcard-name{font-size:14px;font-weight:700;color:#0C4A6E;}
          .cd-tcard-role{font-size:12px;color:#6b7280;}
          .cd-testi-stats{display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(224,242,254,0.50) 0%,rgba(255,255,255,0.75) 50%,rgba(240,253,244,0.35) 100%);backdrop-filter:blur(16px);border-radius:16px;padding:32px 40px;border:1px solid rgba(255,255,255,0.85);box-shadow:0 4px 20px rgba(14,165,233,0.06),inset 0 1px 0 rgba(255,255,255,0.95);}
          .cd-tstat{display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;}
          .cd-tstat-num{font-size:28px;font-weight:800;color:#0C4A6E;}
          .cd-tstat-label{font-size:13px;color:#374151;font-weight:500;}
          .cd-tstat-divider{width:1px;height:40px;background:rgba(14,165,233,0.15);}

          .cd-why-section{padding:80px 40px;background:#f0f9ff;border-top:1px solid rgba(14,165,233,0.08);border-bottom:1px solid rgba(14,165,233,0.08);position:relative;z-index:1;}
          .cd-why-inner{max-width:1280px;margin:0 auto;}
          .cd-why-grid{display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;gap:16px;}
          .cd-why-card{background:linear-gradient(135deg,rgba(224,242,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(240,253,244,0.35) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:20px;padding:32px 28px;box-shadow:0 4px 24px rgba(14,165,233,0.06),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateY(36px) scale(0.97);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),box-shadow 0.25s,border-color 0.25s;}
          .cd-why-card.cd-card-visible{opacity:1;transform:translateY(0) scale(1);}
          .cd-why-card:hover{transform:translateY(-6px);border-color:rgba(14,165,233,0.40);box-shadow:0 16px 48px rgba(14,165,233,0.10),inset 0 1px 0 rgba(255,255,255,1);}
          .cd-why-card-header{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
          .cd-why-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;}
          .cd-why-icon svg{width:28px;height:28px;}
          .cd-why-card h3{font-size:15px;font-weight:700;color:#0F1F40;margin:0;line-height:1.35;}
          .cd-why-card p{font-size:13px;color:#374151;line-height:1.7;margin:0;}

          .cd-engage-section{background:#f0f9ff;border-top:1px solid rgba(14,165,233,0.08);padding:80px 40px;position:relative;z-index:1;}
          .cd-engage-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:stretch;}
          .cd-engage-left{position:sticky;top:100px;display:flex;flex-direction:column;}
          .cd-engage-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0C4A6E 0%,#6366F1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .cd-engage-desc{font-size:15px;color:#374151;line-height:1.75;margin:0 0 32px;}
          .cd-engage-img-wrap{border-radius:14px;overflow:hidden;box-shadow:0 16px 48px rgba(14,165,233,0.15);flex:1;min-height:300px;}
          .cd-engage-img-wrap img{width:100%;height:100%;min-height:300px;object-fit:cover;display:block;}
          .cd-engage-right{display:flex;flex-direction:column;gap:16px;}
          .cd-ecard{background:linear-gradient(135deg,rgba(224,242,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(240,253,244,0.35) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:14px;padding:26px 28px;box-shadow:0 4px 24px rgba(14,165,233,0.06),inset 0 1px 0 rgba(255,255,255,0.95);opacity:0;transform:translateX(40px);transition:opacity 0.55s cubic-bezier(0.22,1,0.36,1),transform 0.55s cubic-bezier(0.22,1,0.36,1),border-color 0.3s,box-shadow 0.3s;}
          .cd-ecard.cd-ecard-visible{opacity:1;transform:translateX(0);}
          .cd-ecard:hover{border-color:rgba(14,165,233,0.40);box-shadow:0 16px 48px rgba(14,165,233,0.10);transform:translateX(4px);}
          .cd-ecard-header{display:flex;align-items:center;gap:14px;margin-bottom:10px;}
          .cd-ecard-icon{width:44px;height:44px;display:flex;align-items:center;justify-content:center;}
          .cd-ecard-icon svg{width:26px;height:26px;stroke:#0EA5E9;fill:none;}
          .cd-ecard-title{font-size:18px;font-weight:700;color:#0C4A6E;margin:0;}
          .cd-ecard-desc{font-size:14px;color:#374151;line-height:1.65;margin:0 0 16px;}
          .cd-ecard-features{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;}
          .cd-efeat{display:flex;align-items:center;gap:8px;font-size:13px;color:#0C4A6E;font-weight:500;}
          .cd-efeat-check{color:#0EA5E9;font-size:12px;flex-shrink:0;}

          .cd-contact-section{padding:70px 40px;background:linear-gradient(135deg,rgba(224,242,254,0.65) 0%,rgba(255,255,255,0.60) 40%,rgba(240,253,244,0.55) 100%);backdrop-filter:blur(20px);position:relative;z-index:1;border-top:1px solid rgba(255,255,255,0.80);}
          .cd-contact-container{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;align-items:start;gap:32px;}
          .cd-contact-left{padding:0;align-self:start;}
          .cd-contact-title{font-size:48px;font-weight:900;line-height:1.2;margin:0 0 16px;background:linear-gradient(90deg,#0C4A6E 0%,#6366F1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;}
          .cd-contact-desc{font-size:14px;color:#374151;line-height:1.6;margin:0 0 24px;}
          .cd-merged-box{background:linear-gradient(135deg,rgba(255,255,255,0.70) 0%,rgba(224,242,254,0.35) 100%);border:1px solid rgba(255,255,255,0.90);border-radius:14px;padding:24px;backdrop-filter:blur(12px);box-shadow:inset 0 1px 0 rgba(255,255,255,1);display:flex;flex-direction:column;gap:20px;}
          .cd-benefit-item{display:flex;gap:10px;align-items:flex-start;}
          .cd-benefit-icon-wrap{width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .cd-benefit-icon{width:20px;height:20px;stroke:#0EA5E9;stroke-width:1.75;}
          .cd-benefit-item p{font-size:13px;color:#374151;margin:0;line-height:1.5;}
          .cd-stats-box{padding-top:32px;border-top:1px solid rgba(14,165,233,0.12);}
          .cd-stats-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
          .cd-stat-number{font-size:40px;font-weight:900;color:#0C4A6E;line-height:1;display:inline-block;margin-bottom:4px;}
          .cd-stat-text{font-size:13px;color:#374151;line-height:1.4;font-weight:500;}
          .cd-contact-right{align-self:start;}
          .cd-form-box{background:linear-gradient(135deg,rgba(255,255,255,0.88) 0%,rgba(224,242,254,0.22) 50%,rgba(255,255,255,0.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.92);border-radius:20px;padding:36px;box-shadow:0 8px 40px rgba(14,165,233,0.07),inset 0 1px 0 rgba(255,255,255,1);}
          .cd-form-box h3{font-size:26px;font-weight:700;margin:0 0 28px;color:#0F1F40;letter-spacing:-0.5px;}
          .cd-contact-form{display:flex;flex-direction:column;gap:16px;}
          .cd-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
          .cd-form-group{display:flex;flex-direction:column;gap:6px;}
          .cd-form-group.full{grid-column:1/-1;}
          .cd-form-group label{font-size:12px;font-weight:500;color:#0F1F40;}
          .cd-form-group input,.cd-form-group textarea,.cd-form-group select{padding:10px 14px;border:1px solid rgba(14,165,233,0.15);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,0.55);box-shadow:inset 0 1px 4px rgba(14,165,233,0.06);transition:border-color 0.2s,background 0.2s;}
          .cd-form-group input:focus,.cd-form-group textarea:focus{outline:none;border-color:#0EA5E9;background:rgba(255,255,255,0.90);box-shadow:0 0 0 3px rgba(14,165,233,0.12);}
          .cd-phone-input{display:flex;border:1px solid rgba(14,165,233,0.15);border-radius:6px;overflow:hidden;}
          .cd-phone-input select{padding:10px;border:none;background:rgba(255,255,255,0.1);font-size:12px;min-width:75px;}
          .cd-phone-input input{flex:1;border:none;border-radius:0;padding:10px 14px;box-shadow:none;}
          .cd-phone-input input:focus{outline:none;}
          .cd-consent{display:flex;gap:8px;align-items:flex-start;margin-top:8px;}
          .cd-consent input[type="checkbox"]{margin-top:3px;width:16px;height:16px;cursor:pointer;}
          .cd-consent label{font-size:11px;color:#374151;line-height:1.5;margin:0;}
          .cd-consent a{color:#0C4A6E;text-decoration:none;}
          .cd-submit-btn{padding:14px 28px;background:rgba(12,74,110,0.85);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,0.30);color:white;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all 0.3s;margin-top:8px;width:100%;box-shadow:0 6px 24px rgba(14,165,233,0.25),inset 0 1px 0 rgba(255,255,255,0.15);}
          .cd-submit-btn:hover{background:rgba(12,74,110,0.95);border-color:rgba(99,102,241,0.5);transform:translateY(-2px);}

          .cd-faq-section{padding:80px 40px;background:#f0f9ff;border-top:1px solid rgba(14,165,233,0.08);position:relative;z-index:1;}
          .cd-faq-inner{max-width:1280px;margin:0 auto;}
          .cd-faq-heading{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0C4A6E 0%,#6366F1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 36px;}
          .cd-faq-list{display:flex;flex-direction:column;gap:12px;}
          .cd-faq-item{background:linear-gradient(135deg,rgba(224,242,254,0.55) 0%,rgba(255,255,255,0.88) 60%,rgba(240,253,244,0.35) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.85);border-radius:16px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(14,165,233,0.05),inset 0 1px 0 rgba(255,255,255,0.95);transition:border-color 0.2s,box-shadow 0.2s;}
          .cd-faq-item.open{border-color:rgba(14,165,233,0.35);box-shadow:0 8px 32px rgba(14,165,233,0.08);}
          .cd-faq-item.open::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:#0EA5E9;border-radius:3px 0 0 3px;}
          .cd-faq-question{width:100%;background:none;border:none;padding:22px 22px 22px 60px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:16px;font-family:inherit;position:relative;}
          .cd-faq-q-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:28px;height:28px;background:rgba(14,165,233,0.10);color:#374151;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;transition:background 0.2s,color 0.2s;}
          .cd-faq-item.open .cd-faq-q-badge{background:#0EA5E9;color:#fff;}
          .cd-faq-question span{font-size:16px;font-weight:600;color:#0F1F40;line-height:1.45;}
          .cd-faq-item.open .cd-faq-question span{color:#0EA5E9;}
          .cd-faq-chevron{width:24px;height:24px;flex-shrink:0;color:#9ca3af;transition:transform 0.3s;}
          .cd-faq-item.open .cd-faq-chevron{transform:rotate(180deg);color:#0EA5E9;}
          .cd-faq-answer-wrap{overflow:hidden;transition:max-height 0.35s ease;max-height:0;}
          .cd-faq-item.open .cd-faq-answer-wrap{max-height:400px;}
          .cd-faq-answer{padding:0 22px 22px 60px;font-size:15px;color:#4b5563;line-height:1.8;}

          .cd-related-section{background:rgba(224,242,254,0.20);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.60);padding:80px 40px;}
          .cd-related-inner{max-width:1280px;margin:0 auto;text-align:center;}
          .cd-related-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#374151;margin:0 0 14px;display:block;}
          .cd-related-title{font-size:48px;font-weight:900;line-height:1.15;letter-spacing:-1px;background:linear-gradient(90deg,#0C4A6E 0%,#6366F1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent;margin:0 0 16px;}
          .cd-related-sub{font-size:15px;color:#0F1F40;line-height:1.7;margin:0 auto;max-width:680px;}
          .cd-related-divider{border:none;border-top:1px solid rgba(14,165,233,0.12);margin:40px 0;}
          .cd-related-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;}
          .cd-rtag{display:inline-block;padding:11px 22px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all 0.25s;}
          .cd-rtag:hover{filter:brightness(0.92);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.10);}
          .cd-rtag-sky{background:rgba(14,165,233,0.10);border-color:rgba(14,165,233,0.30);color:#0369A1;}
          .cd-rtag-indigo{background:rgba(99,102,241,0.10);border-color:rgba(99,102,241,0.30);color:#4338CA;}
          .cd-rtag-green{background:rgba(16,185,129,0.10);border-color:rgba(16,185,129,0.30);color:#065F46;}
          .cd-rtag-amber{background:rgba(245,158,11,0.12);border-color:rgba(245,158,11,0.35);color:#B45309;}
          .cd-rtag-violet{background:rgba(139,92,246,0.10);border-color:rgba(139,92,246,0.30);color:#6D28D9;}
          .cd-rtag-rose{background:rgba(244,63,94,0.10);border-color:rgba(244,63,94,0.28);color:#BE123C;}
          .cd-rtag-teal{background:rgba(20,184,166,0.10);border-color:rgba(20,184,166,0.30);color:#0F766E;}

          .cd-section-reveal{opacity:0;transform:translateY(48px);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1);}
          .cd-section-reveal.cd-revealed{opacity:1;transform:translateY(0);}

          @media(max-width:900px){.cd-page{background:linear-gradient(160deg,#f0f9ff 0%,#e0f2fe 30%,#eff6ff 60%,#f0fdf4 100%) !important;}}
          @media(max-width:1024px){
            .cd-hero-content h1{font-size:40px;}
            .cd-services-grid{grid-template-columns:repeat(2,1fr);}
            .cd-why-grid{grid-template-columns:repeat(2,1fr);}
            .cd-stack-grid{grid-template-columns:repeat(2,1fr);}
            .cd-engage-inner{grid-template-columns:1fr;}
            .cd-engage-left{position:static;}
            .cd-process-inner{grid-template-columns:1fr;}
            .cd-process-image-col{display:none;}
          }
          @media(max-width:768px){
            .cd-page{overflow-x:hidden;}
            .cd-hero-content{padding:36px 20px 24px;}
            .cd-hero-content h1{font-size:28px;letter-spacing:-0.3px;}
            .cd-hero-content p{font-size:15px;}
            .cd-hero-stats{grid-template-columns:1fr 1fr;max-width:100%;}
            .cd-stat-col{padding:14px 12px;}
            .cd-stat-col:nth-child(2){border-right:none;}
            .cd-stat-col:nth-child(3){border-top:1px solid rgba(14,165,233,0.10);}
            .cd-stat-col:nth-child(4){border-top:1px solid rgba(14,165,233,0.10);border-right:none;}
            .cd-stat-value{font-size:22px;}
            .cd-clients-bar{padding:16px 20px 36px;gap:12px;}
            .cd-services-section,.cd-why-section,.cd-engage-section,.cd-faq-section,.cd-testi-section{padding:48px 20px 40px;}
            .cd-stack-section{padding:48px 16px;}
            .cd-stack-wrap{padding:24px 20px 32px;border-radius:16px;}
            .cd-stack-grid{grid-template-columns:1fr;}
            .cd-process-section{padding:60px 20px;}
            .cd-contact-section{padding:48px 16px;}
            .cd-contact-container{grid-template-columns:1fr;gap:20px;}
            .cd-contact-title,.cd-section-title,.cd-engage-title,.cd-process-main-title,.cd-related-title{font-size:28px;}
            .cd-faq-heading{font-size:26px;}
            .cd-faq-question{padding:18px 18px 18px 52px;}
            .cd-faq-question span{font-size:14px;}
            .cd-faq-answer{padding:0 18px 18px 52px;font-size:14px;}
            .cd-faq-q-badge{left:14px;}
            .cd-related-section{padding:60px 20px;}
            .cd-related-tags{gap:8px;}
            .cd-rtag{padding:9px 16px;font-size:13px;}
            .cd-services-grid{grid-template-columns:1fr 1fr;gap:10px;}
            .cd-testi-grid{grid-template-columns:1fr;}
            .cd-why-grid{grid-template-columns:1fr;margin-top:40px;}
            .cd-testi-stats{flex-wrap:wrap;gap:0;padding:24px 20px;}
            .cd-tstat{flex:0 0 50%;width:50%;padding:12px 8px;border-bottom:1px solid rgba(14,165,233,0.10);}
            .cd-tstat:nth-child(odd){border-right:1px solid rgba(14,165,233,0.10);}
            .cd-tstat:nth-last-child(-n+2){border-bottom:none;}
            .cd-tstat-divider{display:none;}
            .cd-form-row{grid-template-columns:1fr;}
            .cd-stats-grid{grid-template-columns:1fr 1fr 1fr;}
            .cd-stat-number{font-size:28px;}
          }
          @media(max-width:480px){
            .cd-hero-content h1{font-size:24px;}
            .cd-services-grid{grid-template-columns:1fr;}
            .cd-service-card{padding:20px 18px 18px;}
            .cd-card-num{font-size:52px;}
            .cd-ecard{padding:20px;}
            .cd-ecard-features{grid-template-columns:1fr;}
            .cd-merged-box{padding:18px;}
          }
        `}</style>
      </Head>

      <div className="cd-page">
        <div className="cd-orb-1"/><div className="cd-orb-2"/><div className="cd-orb-3"/>

        {/* HERO */}
        <div className="cd-hero-block">
          <div className="cd-hero-content">
            <span className="cd-eyebrow">Cloud & DevOps Engineering — AWS, Azure, GCP</span>
            <h1>Cloud & DevOps Services — Infrastructure That Scales Reliably and Costs Less</h1>
            <p>From cloud migration and Kubernetes management to CI/CD pipelines and Infrastructure as Code — 1Solutions builds and manages cloud infrastructure that stays up, scales on demand, and costs 25–40% less than typical setups.</p>
            <Link href="#contact" className="cd-btn-hero">Get a Free Cloud Assessment</Link>
          </div>
          <div className="cd-hero-stats" ref={statsRef}>
            {[['Environments Managed','200+'],['Cloud Cost Reduction','35%'],['Years Experience','15+'],['Uptime SLA','99.9%+']].map(([label,val])=>(
              <AnimatedStat key={label} label={label} val={val} started={statsStarted}/>
            ))}
          </div>
          <div className="cd-clients-bar">
            <span className="cd-clients-label">Trusted by Leading Brands</span>
            <div className="cd-clients-logos">
              <div className="cd-logos-track">
                {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon2'],['/logo/Uniphore.jpg','Uniphore2'],['/logo/ICCoLogo.png','ICC2'],['/logo/Honor_Logo_(2020).svg.png','Honor2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv2']].map(([src,alt])=>(
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={alt} src={src} alt={alt.replace(/\d+$/,'')} className="cd-client-logo"/>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <section className="cd-services-section">
          <div className="cd-services-inner">
            <div className={`cd-section-reveal${visibleSections.has('services')?' cd-revealed':''}`} ref={el=>{sectionRefs.current['services']=el;}}>
              <span className="cd-section-eyebrow">What We Do</span>
              <h2 className="cd-section-title">Cloud & DevOps Services We Deliver</h2>
              <p className="cd-section-desc">From first-cloud migrations to fully managed multi-cloud infrastructure — every service we offer is grounded in production experience, not theory.</p>
            </div>
            <div className="cd-services-grid">
              {visibleServices.map(s=>(
                <div key={s.n} className={`cd-service-card${s.featured?' featured':''}`}>
                  <span className="cd-card-num">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="cd-services-footer">
              <button className="cd-btn-show-more" onClick={()=>setShowAll(v=>!v)}>{showAll?'Show Less ↑':'Show More Services ↓'}</button>
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="cd-stack-section">
          <div className="cd-stack-wrap">
            <h2 className={`cd-stack-title cd-section-reveal${visibleSections.has('stack')?' cd-revealed':''}`} ref={el=>{sectionRefs.current['stack']=el;}}>
              Our Cloud & DevOps Technology Stack
            </h2>
            <p className="cd-stack-sub">We work with the tools your team already uses — and we bring the expertise to make them work together reliably at scale.</p>
            <div className="cd-stack-grid">
              {[
                { badge:'Cloud Platforms', badgeBg:'#e0f2fe', badgeColor:'#0369A1', title:'AWS, Azure & GCP', desc:'Certified architects across all three major cloud platforms. We design for the platform that fits your stack, your team, and your budget — not the one we happen to partner with.', tags:['EC2','EKS','RDS','S3','Lambda','Azure AKS','Cloud Run','BigQuery'] },
                { badge:'Containers & Orchestration', badgeBg:'#eff6ff', badgeColor:'#4338CA', title:'Docker & Kubernetes', desc:'Container builds, Helm chart management, Kubernetes cluster operations, autoscaling, and GitOps deployment workflows across EKS, AKS, and GKE.', tags:['Docker','Kubernetes','Helm','ArgoCD','Istio','EKS','AKS','GKE'] },
                { badge:'CI/CD & Automation', badgeBg:'#f0fdf4', badgeColor:'#065F46', title:'Pipelines & IaC', desc:'Automated pipelines from commit to production — with Terraform or Pulumi for infrastructure, and GitHub Actions or GitLab CI for application deployments.', tags:['Terraform','Pulumi','GitHub Actions','GitLab CI','Jenkins','CircleCI'] },
                { badge:'Observability', badgeBg:'#fdf4ff', badgeColor:'#7C3AED', title:'Monitoring & Alerting', desc:'Full-stack observability — metrics, logs, and traces — with PagerDuty escalation for incidents and weekly infrastructure health reports.', tags:['Datadog','Grafana','Prometheus','PagerDuty','CloudWatch','Loki'] },
                { badge:'Security', badgeBg:'#fff7ed', badgeColor:'#C2410C', title:'Cloud Security', desc:'IAM policies, secrets management, WAF rules, vulnerability scanning, and compliance automation for SOC 2, ISO 27001, HIPAA, and GDPR.', tags:['Vault','AWS Secrets Manager','Wiz','Checkov','AWS Config','Snyk'] },
                { badge:'FinOps', badgeBg:'#ecfdf5', badgeColor:'#15803D', title:'Cost Optimisation', desc:'Right-sizing, Reserved Instance planning, Spot fleet management, and continuous spend analytics — consistently reducing cloud bills by 25–40%.', tags:['AWS Cost Explorer','Infracost','CUDOS','Azure Cost Mgmt','GCP Billing'] },
              ].map(p=>(
                <div className="cd-stack-card" key={p.title}>
                  <span className="cd-stack-badge" style={{background:p.badgeBg,color:p.badgeColor}}>{p.badge}</span>
                  <h3>{p.title}</h3><p>{p.desc}</p>
                  <div className="cd-stack-tags">{p.tags.map(t=><span key={t} className="cd-stack-tag">{t}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="cd-process-section">
          <div className="cd-process-top">
            <div className={`cd-section-reveal${visibleSections.has('process')?' cd-revealed':''}`} ref={el=>{sectionRefs.current['process']=el;}}>
              <p className="cd-process-eyebrow">HOW WE ENGAGE</p>
              <h2 className="cd-process-main-title">Our Cloud & DevOps Engagement Process</h2>
              <p className="cd-process-main-desc">Whether you are starting from scratch or taking over a struggling environment, we follow the same structured process — so nothing critical gets missed.</p>
            </div>
            <hr className="cd-process-divider"/>
          </div>
          <div className="cd-process-inner">
            <div className="cd-process-steps">
              {[
                ['Cloud Readiness Assessment','We audit your existing infrastructure — on-premise or cloud — reviewing architecture, security posture, cost structure, and operational maturity. You receive a prioritised remediation roadmap before any work begins.'],
                ['Architecture Design','We design the target state: platform selection, service boundaries, networking topology, security controls, and cost model. Everything documented and reviewed before a single resource is provisioned.'],
                ['Provision & Automate','Infrastructure deployed via Terraform or Pulumi — version-controlled, reviewed in pull requests, and tested in staging before production. CI/CD pipelines wired up with security scanning gates and automated rollbacks.'],
                ['Monitor & Optimise','Observability stack configured — metrics, logs, traces, and alerting thresholds. Monthly FinOps reviews, security posture checks, and infrastructure health reports keep the environment improving continuously.'],
              ].map(([title,desc],i)=>(
                <div className={`cd-pstep${visibleSteps.includes(i)?' visible':''}`} key={title} ref={el=>{stepRefs.current[i]=el;}}>
                  <div className="cd-pstep-left"><div className="cd-pstep-circle">{i+1}</div>{i<3&&<div className="cd-pstep-arrow"/>}</div>
                  <div className="cd-pstep-content"><h3 className="cd-pstep-title">{title}</h3><p className="cd-pstep-desc">{desc}</p></div>
                </div>
              ))}
            </div>
            <div className="cd-process-image-col">
              <div className="cd-process-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://placehold.co/480x600/0C4A6E/ffffff?text=Cloud+DevOps+Process" alt="Cloud and DevOps process" loading="lazy"/>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="cd-testi-section">
          <div className="cd-testi-inner">
            <div className={`cd-section-header-center cd-section-reveal${visibleSections.has('testi')?' cd-revealed':''}`} ref={el=>{sectionRefs.current['testi']=el;}}>
              <span className="cd-section-eyebrow">Client Results</span>
              <h2 className="cd-section-title">Real Infrastructure, Real Outcomes</h2>
              <p className="cd-section-desc" style={{margin:'0 auto 0'}}>Engineering teams that trusted 1Solutions with their cloud infrastructure.</p>
            </div>
            <div className="cd-testi-grid" ref={testiGridRef}>
              {[
                { stars:'★★★★★',featured:true, text:'"1Solutions migrated our entire on-premise environment to AWS in 6 weeks — zero downtime, full IaC in Terraform, and our monthly infrastructure bill dropped from $28k to $16k. Best engineering investment we\'ve made."', name:'David Reeve', role:'CTO, LogiFlow Systems — Toronto, ON', initials:'DR', color:'#0C4A6E' },
                { stars:'★★★★★',featured:false, text:'"They took over our chaotic AWS account — no tagging, no IaC, spiralling costs. Three months later we had Terraform state, proper IAM, automated cost dashboards, and a 34% lower bill."', name:'Sarah Mitchell', role:'VP Engineering, Nexara — Austin, TX', initials:'SM', color:'#6366F1' },
                { stars:'★★★★★',featured:false, text:'"Our Kubernetes migration was a nightmare until 1Solutions stepped in. They stabilised the cluster, implemented GitOps with ArgoCD, and we\'ve had zero deployment incidents in 8 months."', name:'James Okonkwo', role:'Head of Platform, Waverly Health — Melbourne, AU', initials:'JO', color:'#10B981' },
              ].map((t,i)=>(
                <div key={t.name} className={`cd-tcard${t.featured?' featured':''}${visibleTestiCards.includes(i)?' cd-tcard-visible':''}`}>
                  <div className="cd-tcard-stars">{t.stars}</div>
                  <p className="cd-tcard-text">{t.text}</p>
                  <div className="cd-tcard-author"><div className="cd-tcard-avatar" style={{background:t.color}}>{t.initials}</div><div><div className="cd-tcard-name">{t.name}</div><div className="cd-tcard-role">{t.role}</div></div></div>
                </div>
              ))}
            </div>
            <div className="cd-testi-stats">
              {[['200+','Environments Managed'],null,['35%','Avg. Cost Reduction'],null,['99.9%+','Uptime SLA'],null,['15+','Years Experience']].map((item,i)=>
                item===null?<div key={i} className="cd-tstat-divider"/>:<div key={item[0]} className="cd-tstat"><span className="cd-tstat-num">{item[0]}</span><span className="cd-tstat-label">{item[1]}</span></div>
              )}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="cd-why-section">
          <div className="cd-why-inner">
            <div className={`cd-section-header-center cd-section-reveal${visibleSections.has('why')?' cd-revealed':''}`} ref={el=>{sectionRefs.current['why']=el;}}>
              <span className="cd-section-eyebrow">Why 1Solutions</span>
              <h2 className="cd-section-title">Why Engineering Teams Choose Us</h2>
              <p className="cd-section-desc" style={{margin:'0 auto 0'}}>We have managed 200+ cloud environments. Here is what makes our approach different from a typical DevOps consultant.</p>
            </div>
            <div className="cd-why-grid" ref={whyGridRef}>
              {WHY.map((w,i)=>(
                <div key={w.title} className={`cd-why-card${visibleWhyCards.includes(i)?' cd-card-visible':''}`} style={{transitionDelay:`${i*80}ms`}}>
                  <div className="cd-why-card-header"><div className="cd-why-icon">{w.icon}</div><h3>{w.title}</h3></div>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ENGAGEMENT */}
        <section className="cd-engage-section">
          <div className="cd-engage-inner">
            <div className="cd-engage-left">
              <div className={`cd-section-reveal${visibleSections.has('engage')?' cd-revealed':''}`} ref={el=>{sectionRefs.current['engage']=el;}}>
                <span className="cd-section-eyebrow">How We Engage</span>
                <h2 className="cd-engage-title">Engagement Models for Every Stage</h2>
                <p className="cd-engage-desc">Whether you need a one-time cloud audit or a fully embedded DevOps team, we have a model that fits your current stage.</p>
              </div>
              <div className="cd-engage-img-wrap">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://placehold.co/560x420/0C4A6E/ffffff?text=DevOps+Partnership" alt="DevOps engagement models" loading="lazy"/>
              </div>
            </div>
            <div className="cd-engage-right" ref={eCardsRef}>
              {[
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10.5c0-1.7-1.4-3-3-3-.4-2.2-2.3-3.8-4.5-3.8-2.5 0-4.6 2-4.6 4.5 0 .3 0 .5.1.8C6.3 9.5 5.1 11 5.1 12.8c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4z"/></svg>, title:'Cloud Migration Project', desc:'Fixed-scope, fixed-price cloud migration — from discovery and architecture through to production cutover and handover documentation.', features:['Cloud Readiness Assessment','Terraform IaC build','Zero-downtime cutover','30-day hypercare'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, title:'CI/CD & DevOps Setup', desc:'Build your end-to-end pipeline from scratch — SCM strategy, automated testing gates, staging promotion, and production deploy controls. Fixed price.', features:['Pipeline architecture','Security scanning','Staging environments','Documentation & training'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title:'Cloud Security & Compliance', desc:'Targeted engagement to harden your cloud security posture and generate audit evidence for SOC 2, ISO 27001, HIPAA, or GDPR.', features:['IAM audit & hardening','Compliance automation','Secrets management','Audit evidence package'] },
                { icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, title:'Managed DevOps Retainer', desc:'Embedded DevOps engineers on a monthly retainer — on-call incident response, pipeline maintenance, cost optimisation, and feature development from $3,500/month.', features:['On-call coverage','Monthly FinOps review','Unlimited deployments','Weekly health reports'] },
              ].map((ec,i)=>(
                <div key={ec.title} className={`cd-ecard${visibleECards.includes(i)?' cd-ecard-visible':''}`} style={{transitionDelay:`${i*100}ms`}}>
                  <div className="cd-ecard-header"><div className="cd-ecard-icon">{ec.icon}</div><h3 className="cd-ecard-title">{ec.title}</h3></div>
                  <p className="cd-ecard-desc">{ec.desc}</p>
                  <div className="cd-ecard-features">{ec.features.map(f=><div key={f} className="cd-efeat"><span className="cd-efeat-check">✔</span>{f}</div>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="cd-contact-section" id="contact">
          <div className="cd-contact-container">
            <div className="cd-contact-left">
              <div className={`cd-section-reveal${visibleSections.has('contact')?' cd-revealed':''}`} ref={el=>{sectionRefs.current['contact']=el;}}>
                <h2 className="cd-contact-title">Ready to Build Infrastructure That Works?</h2>
                <p className="cd-contact-desc">Tell us about your current environment and goals. We respond within 24 hours with an honest assessment and a clear next step.</p>
              </div>
              <div className="cd-merged-box">
                {[
                  { label:'Free Cloud Readiness Assessment', desc:'A 45-minute call with a senior cloud architect — we review your current environment and give honest recommendations on architecture, cost, and security.' },
                  { label:'Fixed-Price Proposal in 48 Hours', desc:'Detailed scope covering platform, services, IaC approach, migration timeline, team structure, and fixed monthly cost — no hourly billing surprises.' },
                  { label:'25–40% Cloud Cost Reduction', desc:'Our FinOps review and right-sizing process consistently reduces cloud spend by 25–40% in the first 90 days of an engagement.' },
                ].map(b=>(
                  <div key={b.label} className="cd-benefit-item">
                    <div className="cd-benefit-icon-wrap">
                      <svg className="cd-benefit-icon" viewBox="0 0 24 24" fill="none" strokeWidth="1.75"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p><strong>{b.label}</strong> — {b.desc}</p>
                  </div>
                ))}
                <div className="cd-stats-box">
                  <div className="cd-stats-grid">
                    {[['200+','Environments managed'],['35%','Avg. cost reduction'],['99.9%+','Uptime SLA']].map(([n,t])=>(
                      <div key={t}><div className="cd-stat-number">{n}</div><div className="cd-stat-text">{t}</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="cd-contact-right">
              <div className="cd-form-box">
                <h3>Tell Us About Your Infrastructure</h3>
                <form className="cd-contact-form" onSubmit={e=>e.preventDefault()}>
                  <div className="cd-form-row">
                    <div className="cd-form-group"><label htmlFor="cd-fname">First Name *</label><input id="cd-fname" type="text" placeholder="John" required/></div>
                    <div className="cd-form-group"><label htmlFor="cd-lname">Last Name *</label><input id="cd-lname" type="text" placeholder="Smith" required/></div>
                  </div>
                  <div className="cd-form-row">
                    <div className="cd-form-group"><label htmlFor="cd-email">Work Email *</label><input id="cd-email" type="email" placeholder="john@company.com" required/></div>
                    <div className="cd-form-group">
                      <label htmlFor="cd-phone">Phone</label>
                      <div className="cd-phone-input">
                        <select aria-label="Country code"><option>+1</option><option>+61</option><option>+44</option><option>+91</option></select>
                        <input id="cd-phone" type="tel" placeholder="(555) 000-0000"/>
                      </div>
                    </div>
                  </div>
                  <div className="cd-form-row">
                    <div className="cd-form-group">
                      <label htmlFor="cd-cloud">Current Cloud</label>
                      <select id="cd-cloud">
                        <option value="">Select…</option>
                        <option>On-premise (migrating)</option>
                        <option>AWS</option><option>Azure</option><option>GCP</option>
                        <option>Multi-cloud</option><option>Not sure</option>
                      </select>
                    </div>
                    <div className="cd-form-group">
                      <label htmlFor="cd-budget">Monthly Cloud Budget</label>
                      <select id="cd-budget">
                        <option value="">Select range…</option>
                        <option>Under $1,000/mo</option><option>$1,000–$5,000/mo</option>
                        <option>$5,000–$20,000/mo</option><option>$20,000–$50,000/mo</option><option>$50,000+/mo</option>
                      </select>
                    </div>
                  </div>
                  <div className="cd-form-group full">
                    <label htmlFor="cd-msg">Describe Your Infrastructure Challenge *</label>
                    <textarea id="cd-msg" rows={4} placeholder="e.g. We are on AWS but our bill is out of control, we have no IaC, and deployments are manual. We need a DevOps team to stabilise the environment…" required/>
                  </div>
                  <div className="cd-consent">
                    <input type="checkbox" id="cd-consent" required/>
                    <label htmlFor="cd-consent">I agree to 1Solutions&apos; <Link href="/privacy-policy">Privacy Policy</Link> and consent to being contacted about my enquiry.</label>
                  </div>
                  <button type="submit" className="cd-submit-btn">Send My Infrastructure Brief →</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="cd-faq-section">
          <div className="cd-faq-inner">
            <div className={`cd-section-reveal${visibleSections.has('faq')?' cd-revealed':''}`} ref={el=>{sectionRefs.current['faq']=el;}}>
              <h2 className="cd-faq-heading">Frequently Asked Questions</h2>
            </div>
            <div className="cd-faq-list">
              {FAQS.map((faq,i)=>(
                <div key={i} className={`cd-faq-item${openFaq===i?' open':''}`}>
                  <button className="cd-faq-question" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                    <span className="cd-faq-q-badge">{String.fromCharCode(65+i)}</span>
                    <span>{faq.q}</span>
                    <svg className="cd-faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div className="cd-faq-answer-wrap"><div className="cd-faq-answer">{faq.a}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED */}
        <section className="cd-related-section">
          <div className="cd-related-inner">
            <span className="cd-related-eyebrow">Explore Related Services</span>
            <h2 className="cd-related-title">More Ways We Can Help</h2>
            <p className="cd-related-sub">Cloud infrastructure works best alongside strong development practices and ongoing digital strategy.</p>
            <hr className="cd-related-divider"/>
            <div className="cd-related-tags">
              {[
                ['/artificial-intelligence','AI & Machine Learning','cd-rtag-indigo'],
                ['/digital-transformation','Custom Software Development','cd-rtag-sky'],
                ['/ecommerce-development','eCommerce Development','cd-rtag-amber'],
                ['/managed-wordpress-hosting','Managed WordPress Hosting','cd-rtag-green'],
                ['/api-integration-services','API Integration Services','cd-rtag-violet'],
                ['/digital-marketing','Digital Marketing','cd-rtag-teal'],
                ['/hire-dedicated-resources','Hire DevOps Engineers','cd-rtag-rose'],
                ['/website-security-services','Website Security','cd-rtag-sky'],
                ['/wordpress-development-company','WordPress Development','cd-rtag-indigo'],
                ['/website-support-maintenance-services','Website Support','cd-rtag-green'],
                ['/hire-dedicated-developers','Hire On Demand','cd-rtag-amber'],
              ].map(([href,label,cls])=>(
                <Link key={href} href={href} className={`cd-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
