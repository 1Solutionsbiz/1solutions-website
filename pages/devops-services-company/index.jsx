'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.1solutions.biz/' },
        { '@type': 'ListItem', position: 2, name: 'DevOps Services', item: 'https://www.1solutions.biz/devops-services-company/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'DevOps Services',
      url: 'https://www.1solutions.biz/devops-services-company/',
      description: 'End-to-end DevOps services — CI/CD pipeline automation, infrastructure as code with Terraform/Pulumi, Kubernetes container orchestration, cloud DevOps on AWS/Azure/GCP, DevSecOps, monitoring and observability, site reliability engineering, and dedicated DevOps engineers for businesses worldwide.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '76', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What DevOps services does 1Solutions provide?', acceptedAnswer: { '@type': 'Answer', text: "1Solutions provides end-to-end DevOps services including CI/CD pipeline design and implementation (GitHub Actions, GitLab CI, Jenkins, CircleCI), infrastructure as code with Terraform and Pulumi, Kubernetes container orchestration on EKS, AKS, and GKE, cloud DevOps on AWS, Azure, and GCP, DevSecOps with security scanning integrated into pipelines, monitoring and observability with Prometheus, Grafana, Datadog, and PagerDuty, site reliability engineering (SRE) practices including SLO/SLI definition, GitOps with ArgoCD and Flux, and dedicated DevOps engineers on a retainer model for ongoing infrastructure automation." } },
        { '@type': 'Question', name: 'What is the difference between DevOps and SRE?', acceptedAnswer: { '@type': 'Answer', text: "DevOps is a cultural and engineering philosophy that unifies software development and IT operations — with the goal of shortening the development lifecycle through automation, CI/CD pipelines, infrastructure as code, and continuous delivery. SRE (Site Reliability Engineering), pioneered at Google, applies software engineering principles specifically to operations and reliability problems — defining SLIs (Service Level Indicators), SLOs (Service Level Objectives), error budgets, and using automation to eliminate toil. In practice the two disciplines overlap heavily. 1Solutions applies DevOps engineering practices (CI/CD, IaC, containerisation) alongside SRE principles (reliability targets, on-call runbooks, incident management, chaos engineering) for production workloads that require high availability guarantees." } },
        { '@type': 'Question', name: 'What CI/CD platforms do you work with?', acceptedAnswer: { '@type': 'Answer', text: "We design and implement CI/CD pipelines on GitHub Actions, GitLab CI/CD, Jenkins (including Jenkins X), CircleCI, TeamCity, Buildkite, and AWS CodePipeline / Azure DevOps Pipelines. For GitOps-based continuous delivery we use ArgoCD and Flux. The right platform depends on your existing toolchain — if you are already on GitHub, GitHub Actions is the natural choice; for complex enterprise pipelines with existing Jenkins investment we can modernise rather than replace. We also implement multi-stage pipelines with automated testing gates, security scanning (SAST, DAST, SCA), Docker image building, Helm chart deployment, and environment promotion workflows (dev → staging → production)." } },
        { '@type': 'Question', name: 'How do you approach infrastructure as code?', acceptedAnswer: { '@type': 'Answer', text: "We write all infrastructure as code — no manual console clicks that create untracked resources. Our primary IaC tool is Terraform (with Terragrunt for DRY module reuse), with Pulumi as the alternative for teams that prefer a programming language over HCL. For configuration management we use Ansible. For AWS-native workloads we use CloudFormation or AWS CDK. All IaC is version-controlled in Git, reviewed via pull request with Terraform plan output posted as a PR comment, and applied via CI/CD pipeline (never from a developer laptop in production). We implement remote state with locking (S3 + DynamoDB, Terraform Cloud), environment-specific variable files, and drift detection." } },
        { '@type': 'Question', name: 'What Kubernetes services do you offer?', acceptedAnswer: { '@type': 'Answer', text: "We offer full-lifecycle Kubernetes services — cluster design and provisioning on EKS (AWS), AKS (Azure), GKE (GCP), or on-premises with kubeadm or RKE2; application containerisation (writing Dockerfiles, multi-stage builds, image optimisation); Helm chart development for application deployment; Kubernetes networking (Ingress controllers, service mesh with Istio or Linkerd, network policies); cluster security hardening (RBAC, Pod Security Standards, OPA/Gatekeeper policies, image scanning with Trivy); autoscaling (HPA, VPA, Cluster Autoscaler, KEDA event-driven autoscaling); persistent storage with StatefulSets and storage classes; and GitOps deployment with ArgoCD. We also conduct Kubernetes health audits for existing clusters." } },
        { '@type': 'Question', name: 'How do you implement monitoring and observability?', acceptedAnswer: { '@type': 'Answer', text: "We implement the three pillars of observability — metrics, logs, and traces — using the right tool for your stack. For metrics we use Prometheus with Grafana dashboards (and alerting via Alertmanager) or Datadog. For logs we use the ELK Stack (Elasticsearch, Logstash/Fluentd, Kibana), Loki + Grafana, or Datadog Log Management. For distributed tracing we use Jaeger, Zipkin, or Datadog APM. We define SLIs and SLOs for business-critical services, build runbooks for common alerts, integrate with PagerDuty or OpsGenie for on-call routing, and implement synthetic uptime monitoring. Monitoring is configured as code (Grafana dashboards as JSON in Git, alert rules in YAML) — not created manually in the UI." } },
        { '@type': 'Question', name: 'What does DevSecOps mean in practice?', acceptedAnswer: { '@type': 'Answer', text: "DevSecOps means security is enforced automatically in the CI/CD pipeline — not as a separate manual gate after development is complete. In practice this means: SAST (Static Application Security Testing) with SonarQube or Semgrep scanning source code on every PR; SCA (Software Composition Analysis) with Snyk or Dependabot checking for vulnerable open-source dependencies; container image scanning with Trivy or Clair before images are pushed to the registry; DAST (Dynamic Application Security Testing) against deployed staging environments; secrets scanning to prevent credentials from being committed to Git (with GitLeaks or Gitleaks); and infrastructure security scanning with Checkov (Terraform) or kube-bench (Kubernetes). Security findings block the pipeline and must be resolved before merge." } },
        { '@type': 'Question', name: 'How quickly can you set up a CI/CD pipeline or DevOps environment?', acceptedAnswer: { '@type': 'Answer', text: "A basic CI/CD pipeline for an existing application (build, test, Docker build, deploy to staging, promote to production) can be set up in 1–2 weeks. A complete DevOps environment including infrastructure as code for a new cloud environment, Kubernetes cluster provisioning, CI/CD pipeline, monitoring stack (Prometheus + Grafana), and log aggregation takes 4–8 weeks. A full enterprise DevOps transformation including multi-account AWS/Azure setup, landing zone, centralised logging and security tooling, developer platform, and GitOps deployment takes 12–20 weeks. We deliver in phases — so your team sees working automation at the end of the first sprint, not after months of invisible work." } },
      ],
    },
  ],
};

const SERVICES = [
  { n: '01', title: 'CI/CD Pipeline Design & Implementation', desc: 'End-to-end CI/CD pipeline implementation on GitHub Actions, GitLab CI, Jenkins, CircleCI, or AWS CodePipeline — automated build, unit/integration/E2E test stages, security scanning gates, Docker image build and push, Helm/Kubernetes deployment, environment promotion (dev → staging → production), and rollback automation. Pipeline-as-code in your repository from day one.' },
  { n: '02', title: 'Infrastructure as Code (Terraform & Pulumi)', desc: 'All cloud infrastructure written as version-controlled, peer-reviewed code — Terraform with Terragrunt for DRY module reuse, Pulumi for teams preferring TypeScript/Python/Go, CloudFormation and AWS CDK for AWS-native workloads. Remote state with locking, environment-specific variable files, CI/CD-applied plans, and drift detection. No manual console changes.', feat: true },
  { n: '03', title: 'Kubernetes Container Orchestration', desc: 'Full-lifecycle Kubernetes services — cluster provisioning on EKS/AKS/GKE or on-premises with RKE2, application containerisation and Helm chart development, RBAC and Pod Security Standards hardening, Ingress controllers, autoscaling (HPA/VPA/KEDA), persistent storage, service mesh (Istio/Linkerd), and GitOps deployment with ArgoCD or Flux.' },
  { n: '04', title: 'Cloud DevOps (AWS / Azure / GCP)', desc: 'Cloud-native DevOps automation — AWS multi-account landing zones with Control Tower, Azure Landing Zones with Management Groups, GCP Organisation hierarchy setup, VPC/VNet networking, IAM least-privilege policies, managed Kubernetes (EKS/AKS/GKE), serverless deployment pipelines, RDS/Aurora database automation, and cost governance with tagging policies and budget alerts.' },
  { n: '05', title: 'DevSecOps & Security Automation', desc: 'Security integrated into every CI/CD stage — SAST with SonarQube/Semgrep on every PR, SCA with Snyk for dependency vulnerabilities, container image scanning with Trivy, DAST against staging environments, secrets scanning with Gitleaks, infrastructure security scanning with Checkov (Terraform) and kube-bench (Kubernetes), and HashiCorp Vault for secrets management.' },
  { n: '06', title: 'Monitoring, Observability & Alerting', desc: 'The three pillars of observability implemented as code — Prometheus + Grafana for metrics and dashboards, Loki or ELK Stack for centralised log aggregation, Jaeger or Datadog APM for distributed tracing, SLI/SLO definition and error budget tracking, PagerDuty / OpsGenie on-call routing, synthetic uptime monitoring, and anomaly detection alerts. All dashboards and alert rules in Git.' },
  { n: '07', title: 'Site Reliability Engineering (SRE)', desc: 'SRE practices applied to your production workloads — SLI and SLO definition aligned to business objectives, error budget policies, toil reduction through automation, incident management runbooks, post-mortem process, chaos engineering with Chaos Monkey or LitmusChaos, capacity planning, and production readiness reviews before service launches.' },
  { n: '08', title: 'GitOps & Automated Deployment', desc: 'GitOps deployment model with ArgoCD or Flux — Git as the single source of truth for all Kubernetes workload state, automated sync of cluster state to Git, PR-based environment promotion, automated rollback on failed health checks, multi-cluster application delivery, progressive delivery with Flagger (canary and blue-green deployments), and deployment notifications to Slack.' },
  { n: '09', title: 'Containerisation & Docker Optimisation', desc: 'Legacy application containerisation — Dockerfile authoring with multi-stage builds for minimal image sizes, Docker Compose for local development parity, container registry setup (ECR/ACR/GCR/Docker Hub), image signing and verification with Cosign, vulnerability scanning, and migration from VM-based deployments to container-based Kubernetes workloads.' },
  { n: '10', title: 'DevOps Consulting, Audit & Transformation', desc: 'Independent DevOps maturity assessment — CI/CD pipeline review, IaC coverage gap analysis, security posture audit, observability coverage assessment, DORA metrics baselining (deployment frequency, lead time, MTTR, change failure rate), DevOps transformation roadmap, platform engineering recommendations, and hands-on uplift for your internal engineering team.' },
];

const TECH_STACK = [
  { group: 'CI/CD & GitOps', color: '#b45309', items: ['GitHub Actions', 'GitLab CI/CD', 'Jenkins / Jenkins X', 'CircleCI', 'ArgoCD', 'Flux CD'] },
  { group: 'Infrastructure as Code', color: '#D97706', items: ['Terraform / Terragrunt', 'Pulumi', 'Ansible', 'AWS CDK', 'CloudFormation', 'Crossplane'] },
  { group: 'Containers & Orchestration', color: '#0369a1', items: ['Docker', 'Kubernetes', 'Helm', 'EKS / AKS / GKE', 'Istio / Linkerd', 'Karpenter'] },
  { group: 'Cloud Platforms', color: '#059669', items: ['AWS', 'Microsoft Azure', 'Google Cloud (GCP)', 'DigitalOcean', 'Hetzner Cloud', 'Oracle Cloud'] },
  { group: 'Monitoring & Observability', color: '#7c3aed', items: ['Prometheus + Grafana', 'Datadog', 'ELK Stack', 'Loki', 'Jaeger', 'PagerDuty / OpsGenie'] },
  { group: 'Security & Secrets', color: '#dc2626', items: ['HashiCorp Vault', 'SonarQube / Semgrep', 'Snyk', 'Trivy / Clair', 'Checkov', 'Gitleaks'] },
  { group: 'Scripting & Automation', color: '#0891b2', items: ['Python', 'Bash / Shell', 'Go', 'PowerShell', 'Makefile', 'Taskfile'] },
  { group: 'Source Control & Collaboration', color: '#16a34a', items: ['Git', 'GitHub / GitHub Enterprise', 'GitLab', 'Bitbucket', 'Jira', 'Confluence'] },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'dedicated',
    name: 'Dedicated DevOps Engineer(s)',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'Dedicated DevOps engineers embedded in your engineering team.',
    desc: "One or more full-time DevOps engineers working alongside your developers — joining your standups, committing to your repos, managing your infrastructure, and continuously improving your deployment pipeline. All the expertise of a senior DevOps hire at a fraction of the cost of a local equivalent.",
    bestFor: ['Engineering teams without dedicated DevOps capacity', 'Companies scaling infrastructure as their product grows', 'Post-seed/Series A startups building their DevOps foundation', 'Enterprises replacing expensive local DevOps contractors'],
    process: 'Team assembly → Infrastructure audit → IaC foundation → Ongoing automation',
    timeline: 'Engineers available within 5–7 business days',
  },
  {
    id: 'fixed',
    name: 'Fixed-Scope DevOps Project',
    badge: 'Defined outcome',
    badgeColor: '#b45309',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'A defined DevOps deliverable, scoped and priced upfront.',
    desc: 'Perfect for a well-scoped DevOps engagement — CI/CD pipeline setup, Kubernetes cluster provisioning, IaC migration, monitoring stack implementation, or cloud migration. Fixed price, fixed timeline, clear deliverables. No ongoing commitment required.',
    bestFor: ['CI/CD pipeline setup for an existing application', 'Kubernetes cluster provisioning and migration', 'Cloud environment setup with Terraform IaC', 'Monitoring and observability stack implementation'],
    process: 'Scope definition → Fixed quote → Implementation → Handover & knowledge transfer',
    timeline: 'Typical 2–12 week engagements',
  },
  {
    id: 'retainer',
    name: 'DevOps Retainer & On-Call',
    badge: 'Ongoing support',
    badgeColor: '#0369a1',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Monthly DevOps support hours with on-call incident cover.',
    desc: 'A monthly bank of DevOps hours for infrastructure maintenance, pipeline improvements, security patching, dependency upgrades, scaling events, and on-call incident response — without a full-time engagement commitment. Transparent hours reporting monthly.',
    bestFor: ['Post-setup ongoing infrastructure maintenance', 'Teams that need DevOps on-call without a full-time hire', 'Regular security patching and dependency upgrades', 'Infrastructure support for applications with predictable workloads'],
    process: 'Monthly hours bank → Ticket prioritisation → Hours report → On-call via PagerDuty',
    timeline: 'Start within 3–5 business days',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'DevOps Assessment & Current State Analysis', desc: 'We begin with a structured audit of your current engineering processes — how code moves from commit to production, your current infrastructure (manually provisioned vs IaC), CI/CD pipeline state (or absence), monitoring coverage, security posture, and DORA metrics baseline (deployment frequency, lead time for changes, change failure rate, MTTR). The output is a written assessment and a prioritised DevOps improvement roadmap.' },
  { num: '02', title: 'IaC Foundation & Cloud Environment Setup', desc: 'Before automating deployments, infrastructure must be codified. We write Terraform or Pulumi modules for your cloud environment — VPC/network topology, IAM roles and policies, compute (EC2, ECS, EKS, Lambda), database services (RDS, Aurora, DynamoDB), S3/blob storage, DNS, and CDN. All infrastructure is version-controlled in Git, applied via CI/CD, and documented.' },
  { num: '03', title: 'CI/CD Pipeline Implementation', desc: 'We design and implement your CI/CD pipeline — triggered on every pull request and merge to main, running automated tests, security scans (SAST, SCA, container scanning), Docker image build and push to registry, Helm deployment to staging, automated integration tests against staging, and one-click or fully automated promotion to production. Pipeline YAML/HCL is reviewed like application code.' },
  { num: '04', title: 'Kubernetes Cluster Setup & Application Migration', desc: 'We provision your Kubernetes cluster (EKS/AKS/GKE or on-prem), harden it (RBAC, Network Policies, Pod Security Standards, image scanning admission controller), containerise your applications (Dockerfiles, multi-stage builds), write Helm charts, configure Ingress and TLS, set up HPA and Cluster Autoscaler, and migrate workloads from VMs or other orchestrators.' },
  { num: '05', title: 'Monitoring, Alerting & Runbook Setup', desc: 'We deploy your observability stack — Prometheus + Grafana (metrics and dashboards), Loki or ELK (centralised logs), Jaeger or Datadog APM (distributed traces), synthetic uptime checks, and PagerDuty / OpsGenie on-call routing. We define SLIs and SLOs for your key services, build alert rules for actionable signals (not noise), and write runbooks so your team knows how to respond.' },
  { num: '06', title: 'Knowledge Transfer, Documentation & Handover', desc: 'Every DevOps engagement ends with a handover package — architecture documentation (how the infrastructure is organised, what each Terraform module does), runbooks for common operational tasks, on-call guide, deployment guide, and a live walkthrough with your engineering team. We offer a 30-day post-handover support window. For retainer engagements, we operate your DevOps environment continuously.' },
];

const TESTIMONIALS = [
  {
    text: "Our deployment process was a nightmare — hand-crafted bash scripts run from one engineer's laptop, no staging environment, production broken twice a month. 1Solutions built our complete CI/CD pipeline and Kubernetes setup in 8 weeks. We now deploy to production 12 times a day with zero manual steps and zero outages in six months. The ROI was immediate.",
    name: 'Alex R.', role: 'CTO, B2B SaaS Platform (UK)', init: 'AR', bg: '#0F3460',
  },
  {
    text: "1Solutions built our entire AWS infrastructure from scratch using Terraform — multi-account setup, EKS clusters for all environments, Prometheus/Grafana monitoring, and a GitHub Actions pipeline that handles 200 deploys per week. Their DevOps engineer joined our standups, worked in our repos, and felt like part of our team from day one. 18 months in we have not had a single production incident caused by an infrastructure failure.",
    name: 'Neha P.', role: 'VP Engineering, Fintech Startup (AU)', init: 'NP', bg: '#1c1917', feat: true,
  },
  {
    text: "We had a major AWS cost problem — our bill had grown to $85K/month for a product with 10K users. 1Solutions audited our infrastructure, identified the waste, rearchitected with Terraform and Karpenter on EKS, and reduced our bill to $28K/month. Same performance, two-thirds the cost. The engagement paid for itself in six weeks.",
    name: 'Marcus T.', role: 'Head of Engineering, eCommerce Platform (US)', init: 'MT', bg: '#1e3a5f',
  },
];

const WHY_CARDS = [
  { title: '15+ Years Cloud & Infrastructure Experience', desc: 'We have been building and automating cloud infrastructure since AWS launched EC2 in 2006 and Kubernetes moved to GA in 2015. We have navigated every major platform evolution — bare metal to VMs to containers to serverless — and know when each approach is the right tool for the job.' },
  { title: "Platform Agnostic — AWS, Azure, GCP & Multi-Cloud", desc: "We are equally experienced on AWS, Microsoft Azure, and Google Cloud. We do not push clients towards a specific cloud vendor — we recommend the platform that best fits your existing investments, team skills, compliance requirements, and cost targets. We also implement multi-cloud and hybrid cloud architectures where they genuinely make sense." },
  { title: 'IaC From Day One — No Snowflake Servers', desc: "Every resource we create is in Terraform or Pulumi before it exists in the cloud. We never provision resources manually and consider a manually-created resource a bug to be fixed. Every client inherits a Git repository containing their complete infrastructure definition — not a list of console steps that no one has documented." },
  { title: 'DORA Metrics as Our Success Measure', desc: "We measure DevOps success the way Google's DORA research does — deployment frequency, lead time for changes, change failure rate, and mean time to restore. We baseline these metrics at the start of every engagement and target Elite DORA performance (daily deploys, sub-hour lead time, <5% change failure rate, sub-hour MTTR) as the definition of done." },
  { title: 'Security Baked In, Not Bolted On', desc: 'DevSecOps is not a separate security review after development — it is security tooling embedded in every CI/CD stage. SAST, SCA, container scanning, secrets detection, and infrastructure policy checks all run automatically on every pull request. Security findings block merge. We also implement runtime security monitoring and periodic penetration testing recommendations.' },
  { title: 'Kubernetes Specialists, Not Generalists', desc: 'Kubernetes expertise is rare. Our engineers hold CKA/CKAD certifications and have designed and operated Kubernetes clusters at scale — from single-region EKS clusters for startups through multi-region, multi-cluster fleet management for enterprise workloads. We know the failure modes that kill Kubernetes clusters in production and design to avoid them.' },
  { title: 'Offshore Team, Onshore Accountability', desc: 'Our DevOps engineers work in your timezone overlap, join your standups, commit to your Git repositories, and are accountable for SLA targets. They are not ticket-based support — they are engineers embedded in your team. For on-call retainers, we integrate with PagerDuty so our engineers are paged for production incidents at any hour.' },
  { title: 'Cost Optimisation Built In', desc: 'Cloud bills grow silently until they become a crisis. We implement cost governance from the start — resource tagging policies, AWS Cost Explorer/Azure Cost Management dashboards, rightsizing recommendations, Reserved Instance/Committed Use Discount planning, spot instance usage for non-critical workloads, and Karpenter/Cluster Autoscaler for Kubernetes cost efficiency.' },
];

const FAQS = [
  { q: 'What DevOps services does 1Solutions provide?', a: "1Solutions provides end-to-end DevOps services including CI/CD pipeline design and implementation (GitHub Actions, GitLab CI, Jenkins, CircleCI), infrastructure as code with Terraform and Pulumi, Kubernetes container orchestration on EKS, AKS, and GKE, cloud DevOps on AWS, Azure, and GCP, DevSecOps with security scanning in pipelines, monitoring and observability with Prometheus/Grafana/Datadog, site reliability engineering (SRE), GitOps with ArgoCD, and dedicated DevOps engineers on a retainer." },
  { q: 'What is the difference between DevOps and SRE?', a: "DevOps is a cultural and engineering philosophy that unifies software development and IT operations through automation, CI/CD, IaC, and continuous delivery. SRE applies software engineering principles to operations and reliability — defining SLIs, SLOs, error budgets, and using automation to eliminate toil. The two disciplines overlap heavily. 1Solutions applies DevOps engineering practices alongside SRE principles for production workloads requiring high availability guarantees." },
  { q: 'What CI/CD platforms do you work with?', a: "We design and implement CI/CD pipelines on GitHub Actions, GitLab CI/CD, Jenkins, CircleCI, TeamCity, Buildkite, and AWS CodePipeline/Azure DevOps Pipelines. For GitOps continuous delivery we use ArgoCD and Flux. We implement multi-stage pipelines with automated testing gates, security scanning, Docker image building, Helm chart deployment, and environment promotion workflows (dev → staging → production)." },
  { q: 'How do you approach infrastructure as code?', a: "We write all infrastructure as code — no manual console changes. Our primary IaC tool is Terraform with Terragrunt for DRY module reuse, with Pulumi as an alternative. All IaC is version-controlled in Git, reviewed via PR with Terraform plan output posted as a comment, and applied via CI/CD (never from a developer laptop in production). We implement remote state with locking, environment-specific variable files, and drift detection." },
  { q: 'What Kubernetes services do you offer?', a: "We offer full-lifecycle Kubernetes services — cluster provisioning on EKS/AKS/GKE, application containerisation, Helm chart development, RBAC and Pod Security Standards hardening, Ingress controllers, autoscaling (HPA/VPA/KEDA), persistent storage, service mesh (Istio/Linkerd), and GitOps deployment with ArgoCD. We also conduct Kubernetes health audits for existing clusters and can resolve cluster issues under production pressure." },
  { q: 'How do you implement monitoring and observability?', a: "We implement the three pillars of observability — metrics with Prometheus and Grafana, logs with ELK Stack or Loki, and distributed traces with Jaeger or Datadog APM. We define SLIs and SLOs for business-critical services, build runbooks for common alerts, integrate with PagerDuty for on-call routing, and implement synthetic uptime monitoring. Monitoring is configured as code — Grafana dashboards in Git, alert rules in YAML." },
  { q: 'What does DevSecOps mean in practice?', a: "DevSecOps means security is enforced automatically in the CI/CD pipeline. In practice: SAST with SonarQube or Semgrep scans source code on every PR; SCA with Snyk checks for vulnerable dependencies; container image scanning with Trivy before images are pushed; DAST against deployed staging environments; secrets scanning with Gitleaks to prevent credential leaks; and infrastructure scanning with Checkov or kube-bench. Security findings block the pipeline." },
  { q: 'How quickly can you set up a CI/CD pipeline or DevOps environment?', a: "A basic CI/CD pipeline for an existing application takes 1–2 weeks. A complete DevOps environment including IaC, Kubernetes cluster, CI/CD pipeline, and monitoring takes 4–8 weeks. A full enterprise DevOps transformation with multi-account cloud setup and developer platform takes 12–20 weeks. We deliver in phases — your team sees working automation at the end of the first sprint, not after months of invisible work." },
];

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (!num) return;
    let t0 = null;
    const step = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatItem({ label, val, started }) {
  const num = useCountUp(val, 1800, started);
  const suffix = val.replace(/[\d,]/g, '');
  return (
    <div className="dv-stat-col">
      <div className="dv-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="dv-stat-label">{label}</div>
    </div>
  );
}

export default function DevopsServicesCompany() {
  const [showAllSvc, setShowAllSvc] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [statsStarted, setStatsStarted] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [visibleSvcCards, setVisibleSvcCards] = useState([]);
  const [visibleEngCards, setVisibleEngCards] = useState([]);
  const [visibleWhyCards, setVisibleWhyCards] = useState([]);
  const [visibleTestiCards, setVisibleTestiCards] = useState([]);
  const [visibleStackCards, setVisibleStackCards] = useState([]);
  const statsRef = useRef(null);
  const sectionRefs = useRef({});
  const svcGridRef = useRef(null);
  const engGridRef = useRef(null);
  const whyGridRef = useRef(null);
  const testiGridRef = useRef(null);
  const stackGridRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const pairs = [[svcGridRef, SERVICES.length, setVisibleSvcCards],[engGridRef, 3, setVisibleEngCards],[whyGridRef, WHY_CARDS.length, setVisibleWhyCards],[testiGridRef, 3, setVisibleTestiCards],[stackGridRef, TECH_STACK.length, setVisibleStackCards]];
    const observers = pairs.map(([ref, count, setter]) => {
      if (!ref.current) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { Array.from({ length: count }, (_, i) => setTimeout(() => setter(p => p.includes(i) ? p : [...p, i]), i * 80)); obs.disconnect(); } }, { threshold: 0.05 });
      obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  useEffect(() => {
    const keys = Object.keys(sectionRefs.current);
    const observers = keys.map(key => {
      const el = sectionRefs.current[key];
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisibleSections(p => new Set([...p, key])); obs.disconnect(); } }, { threshold: 0.1 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const visibleServices = showAllSvc ? SERVICES : SERVICES.slice(0, 6);

  return (
    <>
      <Head>
        <title>DevOps Services Company | CI/CD, Kubernetes, Terraform, AWS DevOps | 1Solutions</title>
        <meta name="description" content="Expert DevOps services — CI/CD pipeline automation, Terraform infrastructure as code, Kubernetes orchestration, AWS/Azure/GCP cloud DevOps, DevSecOps, monitoring & observability, SRE, and dedicated DevOps engineers. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/devops-services-company/" />
        <meta property="og:title" content="DevOps Services Company | 1Solutions" />
        <meta property="og:description" content="DevOps automation services — CI/CD pipelines, Terraform IaC, Kubernetes, cloud DevOps on AWS/Azure/GCP, DevSecOps, monitoring, SRE, and dedicated DevOps engineers." />
        <meta property="og:url" content="https://www.1solutions.biz/devops-services-company/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .dv-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#fffbeb 0%,#fef3c7 20%,#f0f9ff 50%,#fff7ed 75%,#f0fdf4 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .dv-page *,.dv-page *::before,.dv-page *::after{box-sizing:border-box}
          .dv-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .dv-orb-1{width:880px;height:880px;background:radial-gradient(circle,rgba(180,83,9,.18) 0%,rgba(245,158,11,.08) 40%,transparent 70%);top:-280px;right:-260px}
          .dv-orb-2{width:780px;height:780px;background:radial-gradient(circle,rgba(3,105,161,.20) 0%,rgba(14,165,233,.08) 40%,transparent 70%);bottom:0;left:-230px}
          .dv-orb-3{width:550px;height:550px;background:radial-gradient(circle,rgba(22,163,74,.12) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%)}
          .dv-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .dv-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .dv-breadcrumb li{display:flex;align-items:center;gap:6px}
          .dv-breadcrumb li::after{content:'/';opacity:.45}
          .dv-breadcrumb li:last-child::after{display:none}
          .dv-breadcrumb a{color:#0F3460;text-decoration:none}
          .dv-breadcrumb a:hover{text-decoration:underline}
          .dv-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .dv-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .dv-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#b45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .dv-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .dv-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .dv-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .dv-badge-dot{width:7px;height:7px;border-radius:50%;background:#b45309;flex-shrink:0}
          .dv-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .dv-btn-primary{display:inline-block;padding:14px 36px;background:#b45309;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(180,83,9,.28)}
          .dv-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .dv-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .dv-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(180,83,9,.5);transform:translateY(-2px)}
          .dv-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .dv-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .dv-stat-col:last-child{border-right:none}
          .dv-stat-val{font-size:28px;font-weight:900;color:#b45309;letter-spacing:-.5px;line-height:1}
          .dv-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .dv-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .dv-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .dv-logos-wrap{width:100%;overflow:hidden}
          .dv-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:dv-marquee 28s linear infinite}
          .dv-logos-track:hover{animation-play-state:paused}
          @keyframes dv-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .dv-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .dv-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .dv-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .dv-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .dv-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .dv-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .dv-s-reveal.dv-revealed{opacity:1;transform:translateY(0)}
          .dv-inner{max-width:1300px;margin:0 auto}
          .dv-svc-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .dv-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .dv-svc-card{background:linear-gradient(135deg,rgba(255,251,235,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .dv-svc-card.dv-cv{opacity:1;transform:translateY(0)}
          .dv-svc-card.dv-cv:hover{transform:translateY(-6px);border-color:rgba(180,83,9,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .dv-svc-card.feat{border-color:rgba(180,83,9,.20)}
          .dv-svc-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .dv-svc-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .dv-svc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .dv-svc-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#b45309,#D97706);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .dv-svc-card.dv-cv:hover::before{transform:scaleY(1)}
          .dv-svc-more{text-align:center;margin-top:22px}
          .dv-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .dv-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .dv-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .dv-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .dv-stack-card{background:linear-gradient(135deg,rgba(255,251,235,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .dv-stack-card.dv-sv{opacity:1;transform:translateY(0)}
          .dv-stack-card.dv-sv:hover{border-color:rgba(180,83,9,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .dv-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .dv-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .dv-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .dv-eng-section{padding:80px 40px;position:relative;z-index:1}
          .dv-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .dv-eng-card{background:linear-gradient(135deg,rgba(255,251,235,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .dv-eng-card.dv-ev{opacity:1;transform:translateY(0)}
          .dv-eng-card.dv-ev:hover{border-color:rgba(180,83,9,.25);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .dv-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(255,251,235,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .dv-eng-card.feat.dv-ev{transform:translateY(-8px)}
          .dv-eng-card.feat.dv-ev:hover{transform:translateY(-12px)}
          .dv-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .dv-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s}
          .dv-eng-card.dv-ev:hover .dv-eng-icon{background:rgba(180,83,9,.10)}
          .dv-eng-card.feat .dv-eng-icon{background:rgba(217,119,6,.10)}
          .dv-eng-icon svg{fill:#0F3460;transition:fill .2s}
          .dv-eng-card.dv-ev:hover .dv-eng-icon svg{fill:#b45309}
          .dv-eng-card.feat .dv-eng-icon svg{fill:#D97706}
          .dv-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .dv-eng-headline{font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px}
          .dv-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .dv-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .dv-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .dv-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .dv-eng-list li::before{content:'✓';font-weight:800;color:#b45309;flex-shrink:0;margin-top:1px}
          .dv-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .dv-eng-process strong{color:#0F3460}
          .dv-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .dv-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .dv-eng-cta:hover{background:#0F3460;color:#fff}
          .dv-eng-card.feat .dv-eng-cta{background:#b45309;color:#fff;border-color:#b45309}
          .dv-eng-card.feat .dv-eng-cta:hover{background:#0F3460;border-color:#0F3460}
          .dv-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .dv-psteps{display:flex;flex-direction:column;margin-top:52px}
          .dv-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .dv-pstep.dv-pv{opacity:1;transform:translateY(0)}
          .dv-pstep-l{display:flex;flex-direction:column;align-items:center}
          .dv-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s}
          .dv-pstep.dv-pv:hover .dv-pstep-circle{background:rgba(180,83,9,.10);border-color:#b45309;color:#b45309}
          .dv-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .dv-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .dv-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .dv-pstep:last-child .dv-pstep-connector{display:none}
          .dv-pstep-r{padding:4px 0 38px}
          .dv-pstep:last-child .dv-pstep-r{padding-bottom:0}
          .dv-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .dv-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .dv-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .dv-center-head{text-align:center;margin-bottom:48px}
          .dv-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .dv-tcard{background:linear-gradient(135deg,rgba(255,251,235,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s}
          .dv-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(255,251,235,.42) 100%);border-color:rgba(217,119,6,.22)}
          .dv-tcard.dv-tv{opacity:1;transform:translateY(0)}
          .dv-tcard.dv-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .dv-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .dv-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .dv-tauthor{display:flex;align-items:center;gap:12px}
          .dv-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .dv-tname{font-size:14px;font-weight:700;color:#0F3460}
          .dv-trole{font-size:12px;color:#6b7280}
          .dv-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .dv-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .dv-wcard{background:linear-gradient(135deg,rgba(255,251,235,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .dv-wcard.dv-wv{opacity:1;transform:translateY(0) scale(1)}
          .dv-wcard.dv-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(180,83,9,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .dv-wcard-dot{width:10px;height:10px;border-radius:50%;background:#b45309;margin-bottom:12px}
          .dv-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .dv-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .dv-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(255,251,235,.55) 0%,rgba(255,255,255,.60) 40%,rgba(240,249,255,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .dv-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .dv-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#b45309 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .dv-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .dv-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .dv-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .dv-cbenefit-icon{flex-shrink:0;color:#b45309;font-weight:800;font-size:16px;margin-top:1px}
          .dv-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .dv-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(255,251,235,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .dv-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .dv-form{display:flex;flex-direction:column;gap:13px}
          .dv-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .dv-fg{display:flex;flex-direction:column;gap:5px}
          .dv-fg.full{grid-column:1/-1}
          .dv-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .dv-fg input,.dv-fg textarea,.dv-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .dv-fg input:focus,.dv-fg textarea:focus,.dv-fg select:focus{outline:none;border-color:#b45309;box-shadow:0 0 0 3px rgba(180,83,9,.10)}
          .dv-consent{display:flex;gap:8px;align-items:flex-start}
          .dv-consent input{margin-top:3px;width:15px;height:15px}
          .dv-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .dv-consent a{color:#0F3460}
          .dv-submit{width:100%;padding:14px;background:#b45309;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(180,83,9,.26)}
          .dv-submit:hover{background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28)}
          .dv-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .dv-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .dv-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .dv-faq-list{display:flex;flex-direction:column;gap:10px}
          .dv-fitem{background:linear-gradient(135deg,rgba(255,251,235,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,249,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .dv-fitem.open{border-color:rgba(180,83,9,.30)}
          .dv-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#b45309,#D97706);border-radius:3px 3px 0 0}
          .dv-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .dv-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .dv-fitem.open .dv-fq-badge{background:#b45309;color:#fff}
          .dv-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .dv-fitem.open .dv-fq span{color:#92400e}
          .dv-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .dv-fitem.open .dv-fchev{transform:rotate(180deg);color:#b45309}
          .dv-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .dv-fitem.open .dv-fanswer-wrap{max-height:500px}
          .dv-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .dv-related{padding:80px 40px;background:rgba(255,251,235,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .dv-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .dv-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .dv-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .dv-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .dv-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .dv-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .dv-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .dv-rtag-blue{background:rgba(3,105,161,.09);border-color:rgba(3,105,161,.28);color:#0369a1}
          .dv-rtag-amber{background:rgba(180,83,9,.09);border-color:rgba(180,83,9,.28);color:#b45309}
          .dv-rtag-green{background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d}
          .dv-rtag-violet{background:rgba(124,58,237,.09);border-color:rgba(124,58,237,.28);color:#6D28D9}
          .dv-rtag-rose{background:rgba(225,29,72,.09);border-color:rgba(225,29,72,.28);color:#9f1239}
          .dv-rtag-teal{background:rgba(15,118,110,.09);border-color:rgba(15,118,110,.28);color:#0f766e}
          @media(max-width:1024px){.dv-hero h1,.dv-s-title,.dv-faq h2{font-size:36px}.dv-svc-grid{grid-template-columns:repeat(2,1fr)}.dv-stack-grid{grid-template-columns:repeat(2,1fr)}.dv-eng-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.dv-eng-card.feat{transform:none}.dv-eng-card.feat.dv-ev{transform:none}.dv-eng-card.feat.dv-ev:hover{transform:translateY(-4px)}.dv-why-grid{grid-template-columns:repeat(2,1fr)}.dv-tgrid{grid-template-columns:1fr}.dv-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.dv-breadcrumb{padding:12px 20px 0}.dv-hero{padding:28px 20px 20px}.dv-hero h1{font-size:26px;letter-spacing:-.3px}.dv-stats{grid-template-columns:1fr 1fr}.dv-stat-col:nth-child(2){border-right:none}.dv-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.dv-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.dv-logos{padding:16px 20px 28px}.dv-svc-section,.dv-stack-section,.dv-eng-section,.dv-process-section,.dv-testi,.dv-why-section,.dv-faq,.dv-related{padding:52px 20px}.dv-contact{padding:48px 20px}.dv-svc-grid,.dv-stack-grid,.dv-why-grid{grid-template-columns:1fr}.dv-frow{grid-template-columns:1fr}.dv-ctitle{font-size:28px}.dv-s-title{font-size:28px}}
        `}</style>
      </Head>

      <div className="dv-page">
        <div className="dv-orb dv-orb-1" /><div className="dv-orb dv-orb-2" /><div className="dv-orb dv-orb-3" />

        <nav className="dv-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">DevOps Services</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <section className="dv-hero">
          <span className="dv-eyebrow">DevOps Services Company</span>
          <h1>DevOps Services — CI/CD Pipelines, Terraform IaC, Kubernetes & Cloud Automation</h1>
          <p className="dv-hero-desc">End-to-end DevOps engineering services — automated CI/CD pipelines, infrastructure as code with Terraform and Pulumi, Kubernetes container orchestration, cloud DevOps on AWS, Azure, and GCP, DevSecOps security automation, monitoring and observability, site reliability engineering, and dedicated DevOps engineers for businesses worldwide.</p>
          <div className="dv-trust-row">
            {['GitHub Actions & GitLab CI','Terraform & Pulumi IaC','Kubernetes EKS/AKS/GKE','AWS, Azure & GCP','DevSecOps Built-In'].map(b => (
              <div className="dv-badge" key={b}><span className="dv-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="dv-ctas">
            <Link href="#contact" className="dv-btn-primary">Start Your DevOps Transformation</Link>
            <Link href="#engagement" className="dv-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        <div className="dv-stats" ref={statsRef}>
          {[['200+','DevOps Projects Delivered'],['15+','Years Cloud Experience'],['99.99%','SLA Achieved'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        <div className="dv-logos">
          <span className="dv-logos-label">Trusted by Engineering Teams Worldwide</span>
          <div className="dv-logos-wrap">
            <div className="dv-logos-track">
              {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="dv-clogo" />
              ))}
            </div>
          </div>
        </div>

        <section className="dv-svc-section" aria-labelledby="dv-svc-heading">
          <div className="dv-inner">
            <div className={`dv-s-reveal${visibleSections.has('svc') ? ' dv-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="dv-s-eyebrow">What We Do</span>
              <h2 id="dv-svc-heading" className="dv-s-title">DevOps Services We Deliver</h2>
              <p className="dv-s-desc" style={{ maxWidth: 720 }}>From CI/CD pipeline automation and infrastructure as code through Kubernetes orchestration, cloud DevOps, DevSecOps security integration, monitoring and observability, site reliability engineering, and ongoing dedicated DevOps engineer retainers.</p>
            </div>
            <div className="dv-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`dv-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' dv-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="dv-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="dv-svc-more">
                <button className="dv-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="stack" className="dv-stack-section" aria-labelledby="dv-stack-heading">
          <div className="dv-inner">
            <div className={`dv-s-reveal${visibleSections.has('stk') ? ' dv-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="dv-s-eyebrow">Tech Stack</span>
              <h2 id="dv-stack-heading" className="dv-s-title">DevOps Tools & Technologies We Work With</h2>
              <p className="dv-s-desc" style={{ maxWidth: 680 }}>GitHub Actions, GitLab CI, Jenkins, ArgoCD, Terraform, Pulumi, Ansible, Docker, Kubernetes (EKS/AKS/GKE), AWS/Azure/GCP, Prometheus, Grafana, Datadog, HashiCorp Vault, SonarQube, Snyk, Trivy, and the full modern DevOps toolchain.</p>
            </div>
            <div className="dv-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`dv-stack-card${visibleStackCards.includes(i) ? ' dv-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="dv-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="dv-stack-pills">
                    {grp.items.map(item => <span key={item} className="dv-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="engagement" className="dv-eng-section" aria-labelledby="dv-eng-heading">
          <div className="dv-inner">
            <div className={`dv-s-reveal${visibleSections.has('eng') ? ' dv-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="dv-s-eyebrow">How We Work</span>
              <h2 id="dv-eng-heading" className="dv-s-title">DevOps Engagement Models</h2>
              <p className="dv-s-desc" style={{ maxWidth: 680 }}>Hire dedicated DevOps engineers embedded in your team, engage on a fixed-scope DevOps project, or take a monthly retainer for ongoing infrastructure support and on-call cover — whichever model fits your team and budget.</p>
            </div>
            <div className="dv-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`dv-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' dv-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="dv-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="dv-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div>
                  <div className="dv-eng-name">{m.name}</div>
                  <div className="dv-eng-headline">{m.headline}</div>
                  <div className="dv-eng-desc">{m.desc}</div>
                  <div className="dv-eng-list-label">Best for</div>
                  <ul className="dv-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                  <div className="dv-eng-process"><strong>Process:</strong> {m.process}<br /><span className="dv-eng-timeline">{m.timeline}</span></div>
                  <Link href="#contact" className="dv-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dv-process-section" aria-labelledby="dv-proc-heading">
          <div className="dv-inner" style={{ maxWidth: 760 }}>
            <div className={`dv-s-reveal${visibleSections.has('proc') ? ' dv-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="dv-s-eyebrow">How We Deliver</span>
              <h2 id="dv-proc-heading" className="dv-s-title">Our DevOps Delivery Process</h2>
              <p className="dv-s-desc">From DevOps maturity assessment and IaC foundation through CI/CD pipeline implementation, Kubernetes setup, monitoring and observability, and knowledge transfer — with working automation delivered at every sprint.</p>
            </div>
            <div className="dv-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`dv-pstep${visibleSections.has('proc') ? ' dv-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="dv-pstep-l">
                    <div className="dv-pstep-circle">{step.num}</div>
                    <div className="dv-pstep-connector" />
                  </div>
                  <div className="dv-pstep-r">
                    <div className="dv-pstep-title">{step.title}</div>
                    <p className="dv-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dv-testi" aria-labelledby="dv-ts-heading">
          <div className="dv-inner">
            <div className={`dv-center-head dv-s-reveal${visibleSections.has('ts') ? ' dv-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="dv-s-eyebrow">Client Results</span>
              <h2 id="dv-ts-heading" className="dv-s-title">What Our DevOps Clients Say</h2>
              <p className="dv-s-desc">Engineering teams across the US, UK, and Australia trust 1Solutions to automate their deployments, codify their infrastructure, and keep their production systems reliable — at offshore rates with onshore accountability.</p>
            </div>
            <div className="dv-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`dv-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' dv-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review">
                  <div className="dv-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="dv-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="dv-tauthor">
                    <div className="dv-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div><div className="dv-tname" itemProp="author">{t.name}</div><div className="dv-trole">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dv-why-section" aria-labelledby="dv-wy-heading">
          <div className="dv-inner">
            <div className={`dv-s-reveal${visibleSections.has('wy') ? ' dv-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="dv-s-eyebrow">Why 1Solutions</span>
              <h2 id="dv-wy-heading" className="dv-s-title">Why Choose 1Solutions for DevOps</h2>
              <p className="dv-s-desc" style={{ maxWidth: 680 }}>15+ years of cloud and infrastructure experience, platform-agnostic across AWS, Azure, and GCP, IaC from day one, DORA metrics as our success measure, security built into every pipeline, certified Kubernetes expertise, and offshore delivery with onshore accountability.</p>
            </div>
            <div className="dv-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`dv-wcard${visibleWhyCards.includes(i) ? ' dv-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="dv-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="dv-contact" aria-labelledby="dv-contact-heading">
          <div className="dv-contact-grid">
            <div>
              <h2 id="dv-contact-heading" className="dv-ctitle">Start Your DevOps Transformation</h2>
              <p className="dv-cdesc">Tell us about your current deployment process and infrastructure, and we will schedule a free DevOps discovery call. Whether you need CI/CD pipelines set up from scratch, Kubernetes migration, Terraform IaC for your cloud environment, monitoring and observability, or a dedicated DevOps engineer — we will scope your engagement and provide a transparent quote within 24 hours.</p>
              <div className="dv-cbenefits">
                {[['✓','Free DevOps maturity assessment and discovery call with a senior DevOps engineer'],['✓','CI/CD, IaC, Kubernetes, and cloud platform recommendations before any commitment'],['✓','Platform agnostic — AWS, Azure, GCP, or multi-cloud, whichever fits your needs'],['✓','DORA metrics baselining — we measure deployment frequency, lead time, MTTR, and change failure rate'],['✓','Response within 24 business hours from our DevOps engineering team']].map(([icon, text]) => (
                  <div className="dv-cbenefit" key={text}><span className="dv-cbenefit-icon">{icon}</span><p>{text}</p></div>
                ))}
              </div>
            </div>
            <div className="dv-form-box">
              <h3>Tell Us About Your DevOps Needs</h3>
              <form className="dv-form" onSubmit={e => e.preventDefault()}>
                <div className="dv-frow">
                  <div className="dv-fg"><label htmlFor="dv-name">Full Name *</label><input id="dv-name" type="text" placeholder="Your name" required /></div>
                  <div className="dv-fg"><label htmlFor="dv-email">Work Email *</label><input id="dv-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="dv-frow">
                  <div className="dv-fg"><label htmlFor="dv-company">Company / Website URL</label><input id="dv-company" type="text" placeholder="Company or existing URL" /></div>
                  <div className="dv-fg"><label htmlFor="dv-phone">Phone / WhatsApp</label><input id="dv-phone" type="tel" placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="dv-fg full">
                  <label htmlFor="dv-type">DevOps Service Needed *</label>
                  <select id="dv-type" required>
                    <option value="">Select service...</option>
                    <option>CI/CD Pipeline Setup</option>
                    <option>Infrastructure as Code (Terraform / Pulumi)</option>
                    <option>Kubernetes Cluster Setup &amp; Migration</option>
                    <option>Cloud DevOps (AWS / Azure / GCP)</option>
                    <option>DevSecOps &amp; Security Automation</option>
                    <option>Monitoring, Observability &amp; Alerting</option>
                    <option>Site Reliability Engineering (SRE)</option>
                    <option>GitOps &amp; ArgoCD Implementation</option>
                    <option>Containerisation &amp; Docker Optimisation</option>
                    <option>DevOps Consulting &amp; Audit</option>
                    <option>Dedicated DevOps Engineer(s)</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="dv-fg full">
                  <label htmlFor="dv-cloud">Current Cloud Platform</label>
                  <select id="dv-cloud">
                    <option value="">Select cloud platform...</option>
                    <option>AWS</option>
                    <option>Microsoft Azure</option>
                    <option>Google Cloud (GCP)</option>
                    <option>Multi-cloud (AWS + Azure or GCP)</option>
                    <option>DigitalOcean</option>
                    <option>On-premises / bare metal</option>
                    <option>Not yet on cloud</option>
                  </select>
                </div>
                <div className="dv-fg full">
                  <label htmlFor="dv-msg">Current Situation &amp; Goals *</label>
                  <textarea id="dv-msg" rows={4} placeholder="Describe your current deployment process, infrastructure, pain points (slow deploys, manual steps, missing CI/CD, high cloud costs, production incidents), and what you want to achieve..." required />
                </div>
                <div className="dv-consent">
                  <input id="dv-consent" type="checkbox" required />
                  <label htmlFor="dv-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. We treat all details confidentially.</label>
                </div>
                <button type="submit" className="dv-submit">Get Free DevOps Consultation →</button>
              </form>
            </div>
          </div>
        </section>

        <section className="dv-faq" aria-labelledby="dv-faq-heading">
          <div className="dv-inner" style={{ maxWidth: 860 }}>
            <span className="dv-s-eyebrow">FAQ</span>
            <h2 id="dv-faq-heading">DevOps Services — Frequently Asked Questions</h2>
            <p className="dv-faq-sub">Common questions about DevOps services — what we do, CI/CD platforms, IaC approach, Kubernetes, monitoring, DevSecOps, and timelines.</p>
            <div className="dv-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`dv-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="dv-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="dv-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="dv-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="dv-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="dv-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dv-related">
          <div className="dv-related-inner">
            <span className="dv-s-eyebrow">Explore More</span>
            <h2>Related Cloud & Infrastructure Services</h2>
            <p className="dv-related-sub">We also provide cloud migration, cloud native, and managed cloud infrastructure services for businesses worldwide.</p>
            <hr />
            <div className="dv-rtags">
              {[['/cloud-migration-services/','Cloud Migration Services','dv-rtag-blue'],['/cloud-native-services/','Cloud Native Development','dv-rtag-violet'],['/aws-development-services/','AWS Development','dv-rtag-amber'],['/azure-development-services/','Azure Development','dv-rtag-blue'],['/nextjs-development-services/','Next.js Development','dv-rtag-blue'],['/erp-development-company/','ERP Development','dv-rtag-amber'],['/website-support-maintenance-services/','Website Maintenance','dv-rtag-teal'],['/php-development-company/','Backend Development','dv-rtag-violet'],['/nodejs-development-company/','Node.js Development','dv-rtag-green'],['/software-development-company/','Software Development','dv-rtag-rose']].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`dv-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
