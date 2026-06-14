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
        { '@type': 'ListItem', position: 2, name: 'Cloud Migration Services', item: 'https://www.1solutions.biz/cloud-migration-services/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Cloud Migration Services',
      url: 'https://www.1solutions.biz/cloud-migration-services/',
      description: 'Expert cloud migration services — cloud readiness assessment, lift and shift migration, application re-platforming, database migration to cloud, multi-cloud strategy, hybrid cloud implementation, AWS/Azure/GCP migration, cloud cost optimisation, disaster recovery, and post-migration managed services for businesses worldwide.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '71', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What are the 6 Rs of cloud migration?', acceptedAnswer: { '@type': 'Answer', text: "The 6 Rs are the six migration strategies for moving applications to cloud — originally defined by Gartner and popularised by AWS. Rehost (lift and shift): move the application as-is to cloud VMs with no code changes — fastest and lowest risk. Replatform (lift and reshape): make minimal optimisations during migration, such as moving to a managed database service (RDS instead of self-managed MySQL on EC2) without changing the application core. Repurchase: replace with a SaaS alternative (e.g., move from an on-premises CRM to Salesforce). Refactor/Re-architect: redesign the application to be cloud-native, using microservices, containers, and serverless — highest effort, highest long-term benefit. Retire: decommission applications that are no longer needed. Retain: keep applications on-premises that are not suitable for migration yet. 1Solutions applies the appropriate R strategy per application based on your business case, technical complexity, and timeline." } },
        { '@type': 'Question', name: 'Which cloud platform should I migrate to — AWS, Azure, or Google Cloud?', acceptedAnswer: { '@type': 'Answer', text: "The right cloud platform depends on your existing technology investments, team skills, compliance requirements, and long-term strategy. AWS has the broadest service catalogue and largest ecosystem, making it the default for most greenfield cloud migrations and startups. Azure is the natural choice for organisations deeply invested in Microsoft technology (Office 365, Active Directory, SQL Server, .NET) due to hybrid connectivity, Azure AD integration, and Microsoft licensing benefits. Google Cloud is strongest for organisations prioritising Kubernetes (GKE is the reference implementation), BigQuery analytics, and AI/ML workloads. Many enterprises use multiple clouds — AWS for production workloads, Azure for identity and M365 integration, GCP for analytics. 1Solutions is platform-agnostic — we migrate to the platform that best fits your specific needs, not the one we prefer." } },
        { '@type': 'Question', name: 'How long does a cloud migration take?', acceptedAnswer: { '@type': 'Answer', text: "A simple rehost (lift and shift) migration for a single application with a well-understood architecture can be completed in 2–6 weeks. A medium-complexity migration portfolio of 20–50 applications using a mix of rehost and replatform strategies typically takes 3–9 months. A large enterprise migration programme covering hundreds of applications, data centre decommission, and organisational change management typically takes 12–36 months. We use a wave-based migration approach — migrating applications in prioritised groups (easy wins first) to deliver business value quickly while more complex applications are planned and prepared. Timeline estimates are provided in the cloud migration assessment before any work begins." } },
        { '@type': 'Question', name: 'How do you handle database migration to cloud?', acceptedAnswer: { '@type': 'Answer', text: "Database migration is often the most complex and risk-laden part of a cloud migration. We handle Oracle to AWS RDS Oracle or Aurora, SQL Server to AWS RDS SQL Server or Azure SQL Database, MySQL to AWS RDS MySQL or Aurora MySQL, PostgreSQL to AWS RDS PostgreSQL or Aurora PostgreSQL, and on-premises MongoDB to MongoDB Atlas. Tools include AWS Database Migration Service (DMS), Azure Database Migration Service, and native dump-restore for simpler scenarios. We always run homologation (validation) testing to verify row counts, data integrity, stored procedure compatibility, and application query performance against the target database. For large databases (multi-TB), we use DMS continuous replication to minimise cutover downtime to under 1 hour." } },
        { '@type': 'Question', name: 'What is a hybrid cloud and when does it make sense?', acceptedAnswer: { '@type': 'Answer', text: "A hybrid cloud architecture connects your on-premises data centre or private cloud with one or more public clouds (AWS, Azure, GCP) via a private network connection (AWS Direct Connect, Azure ExpressRoute, or Google Cloud Interconnect) rather than the public internet. Hybrid cloud makes sense when: some workloads have regulatory requirements that prohibit public cloud (financial services, healthcare data in certain jurisdictions); legacy applications cannot be migrated immediately due to technical complexity or cost; you want to burst workloads to public cloud during peak demand while keeping baseline capacity on-premises; or you need low-latency connectivity between on-premises operational technology (manufacturing, SCADA) and cloud analytics. 1Solutions designs, implements, and manages hybrid cloud architectures on AWS, Azure, and GCP." } },
        { '@type': 'Question', name: 'How do you reduce cloud costs after migration?', acceptedAnswer: { '@type': 'Answer', text: "Cloud cost optimisation starts before the migration — rightsizing VMs based on actual utilisation data (not provisioned specs), identifying workloads suitable for spot/preemptible instances (batch processing, dev/test environments), planning Reserved Instance or Committed Use Discount purchases for steady-state workloads, and eliminating unused resources before they move to cloud. Post-migration, we implement: AWS Cost Explorer or Azure Cost Management dashboards, resource tagging policies for allocation and accountability, autoscaling to match actual demand, storage tiering (S3 Intelligent-Tiering, Azure Cool Blob), database rightsizing with Performance Insights, and quarterly cost reviews. Our cloud migrations typically reduce infrastructure costs by 30–50% compared to equivalent on-premises spend when optimisation is included." } },
        { '@type': 'Question', name: 'What is cloud migration risk and how do you manage it?', acceptedAnswer: { '@type': 'Answer', text: "Cloud migration risk falls into four categories: technical risk (application compatibility issues, data loss, performance regression), business continuity risk (production outages during cutover), security risk (misconfigured cloud resources, unintended public exposure), and cost risk (unexpected cloud spend post-migration). We manage risk through: thorough pre-migration assessment and proof-of-concept testing, parallel-run periods where applications run simultaneously in both environments before cutover, automated rollback capability (snapshot-based for rehost, blue-green for replatform), network security review before any workload goes live in cloud, and cost budgeting alerts. We have never had a data loss incident or unexpected multi-day outage in a cloud migration engagement." } },
        { '@type': 'Question', name: 'Do you provide post-migration managed services?', acceptedAnswer: { '@type': 'Answer', text: "Yes. Post-migration we offer managed cloud services — infrastructure monitoring and alerting (Prometheus/Grafana or AWS CloudWatch/Azure Monitor), cost optimisation reviews, security posture reviews (AWS Security Hub, Azure Defender, GCP Security Command Center), patch management, backup and disaster recovery testing, scaling event management, and ongoing architecture evolution as your workloads grow. We also provide a cloud operations knowledge transfer to your internal team, documentation of all cloud architecture decisions, and a runbook for common operational tasks. Managed services are available on a monthly retainer." } },
      ],
    },
  ],
};

const SERVICES = [
  { n: '01', title: 'Cloud Readiness Assessment & Migration Strategy', desc: 'Structured assessment of your application portfolio — application inventory (infrastructure, dependencies, data volumes, integration points), 6R strategy assignment per application (rehost, replatform, repurchase, refactor, retire, or retain), business case and TCO analysis, migration wave planning, risk identification, and a detailed migration roadmap before any migration work begins.' },
  { n: '02', title: 'Lift & Shift Cloud Migration (Rehost)', desc: 'Migrate applications to cloud VMs as-is with no code changes — fastest path to cloud with minimal risk. We use AWS Server Migration Service, Azure Migrate, and VMware HCX for VM-based migrations, configure equivalent cloud networking and security groups, establish backup and monitoring, validate application functionality post-migration, and decommission source servers. Typical timelines: 1–3 weeks per application group.', feat: true },
  { n: '03', title: 'Application Re-platforming & Modernisation', desc: 'Migrate applications to cloud-managed services while preserving the application core — move from self-managed MySQL/PostgreSQL to RDS/Aurora, from on-premises app servers to ECS/EKS containers or Elastic Beanstalk, from Windows services to serverless Lambda functions, and from NFS file shares to EFS/Azure Files/GCS. Reduce operational overhead without rewriting application logic.' },
  { n: '04', title: 'Database Migration to Cloud', desc: 'End-to-end database migration — Oracle, SQL Server, MySQL, PostgreSQL, MariaDB, and MongoDB to AWS RDS, Aurora, Azure SQL Database, Azure Database for PostgreSQL/MySQL, or GCP Cloud SQL. Using AWS Database Migration Service, Azure Database Migration Service, or pg_dump/restore for smaller databases. Homologation testing for data integrity and stored procedure compatibility before cutover.' },
  { n: '05', title: 'AWS Cloud Migration', desc: 'Full-lifecycle AWS migration — multi-account landing zone setup with AWS Control Tower, VPC design and Direct Connect/Site-to-Site VPN connectivity, EC2 instance right-sizing, RDS/Aurora database migration, ECS or EKS containerisation, S3 data migration, IAM role design, CloudWatch monitoring, AWS Backup configuration, and AWS Security Hub for cloud security posture management.' },
  { n: '06', title: 'Azure Cloud Migration', desc: 'Microsoft Azure migration — Azure Landing Zone with Management Groups and Policy, Azure Virtual Network and ExpressRoute connectivity, Azure Migrate for VM rehost, Azure SQL Database and Azure Database for PostgreSQL migration, Azure Kubernetes Service (AKS) deployment, Azure Active Directory integration (Hybrid Identity), Azure Monitor and Azure Defender for cloud security, and Azure Cost Management.' },
  { n: '07', title: 'Google Cloud (GCP) Migration', desc: 'Google Cloud Platform migration — GCP organisation and folder hierarchy setup, VPC with Cloud Interconnect connectivity, Compute Engine migration with Migrate for Compute Engine, Cloud SQL for PostgreSQL/MySQL/SQL Server, Google Kubernetes Engine (GKE) containerisation, Cloud Storage data migration, IAM and VPC Service Controls, Cloud Monitoring, and BigQuery for analytics migration.' },
  { n: '08', title: 'Hybrid Cloud & Multi-Cloud Architecture', desc: 'Design and implementation of hybrid and multi-cloud environments — AWS Direct Connect or Azure ExpressRoute private connectivity from your data centre to cloud, hybrid DNS and identity federation (Azure AD Connect, AWS Directory Service), workload placement strategy across on-premises and cloud, multi-cloud networking (Aviatrix, Cloud WAN), and unified observability across environments.' },
  { n: '09', title: 'Cloud Cost Optimisation', desc: 'Post-migration cloud cost reduction — VM rightsizing with utilisation analysis, Reserved Instance and Savings Plan purchasing, spot/preemptible instance adoption for suitable workloads, storage tiering (S3 Intelligent-Tiering, Azure Cool), database performance and cost rightsizing, auto-scaling implementation, unused resource identification, resource tagging and cost allocation, and quarterly FinOps reviews.' },
  { n: '10', title: 'Disaster Recovery & Business Continuity in Cloud', desc: 'Cloud-based disaster recovery implementation — RPO/RTO definition per application criticality, AWS Elastic Disaster Recovery (CloudEndure) or Azure Site Recovery for VM replication, database read replica and multi-region failover, S3/Azure Blob cross-region replication, disaster recovery runbook development, DR failover testing (quarterly scheduled tests), and backup validation automation.' },
];

const TECH_STACK = [
  { group: 'AWS Migration Services', color: '#f97316', items: ['AWS Server Migration Service', 'AWS Database Migration Service', 'AWS Control Tower', 'AWS Elastic DR', 'CloudEndure Migration', 'AWS Migration Hub'] },
  { group: 'Azure Migration Services', color: '#0078d4', items: ['Azure Migrate', 'Azure Database Migration Svc', 'Azure Site Recovery', 'Azure AD Connect', 'Azure Landing Zone', 'Azure Arc'] },
  { group: 'GCP Migration Services', color: '#4285f4', items: ['Migrate for Compute Engine', 'Database Migration Service', 'Transfer Appliance', 'Cloud Storage Transfer', 'Anthos', 'Cloud Interconnect'] },
  { group: 'Infrastructure as Code', color: '#b45309', items: ['Terraform / Terragrunt', 'AWS CDK / CloudFormation', 'Pulumi', 'Azure Bicep', 'Ansible', 'HashiCorp Packer'] },
  { group: 'Database Migration', color: '#0369a1', items: ['AWS DMS', 'Oracle to Aurora', 'SQL Server to Azure SQL', 'MySQL to RDS Aurora', 'MongoDB Atlas', 'PostgreSQL to Cloud SQL'] },
  { group: 'Containers & Kubernetes', color: '#7c3aed', items: ['Docker', 'Amazon EKS', 'Azure AKS', 'Google GKE', 'Helm Charts', 'AWS Fargate / ECS'] },
  { group: 'Networking & Security', color: '#dc2626', items: ['AWS Direct Connect', 'Azure ExpressRoute', 'Cloud VPN', 'AWS WAF / Shield', 'Azure Firewall', 'Zero Trust Networking'] },
  { group: 'Monitoring & FinOps', color: '#059669', items: ['AWS CloudWatch', 'Azure Monitor', 'GCP Cloud Monitoring', 'Datadog', 'AWS Cost Explorer', 'Azure Cost Management'] },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'full-migration',
    name: 'Full Cloud Migration Programme',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'End-to-end cloud migration from assessment to post-migration operations.',
    desc: 'A complete cloud migration engagement — cloud readiness assessment, migration strategy and wave planning, infrastructure as code for the target cloud environment, wave-by-wave application migration (rehost, replatform, and re-architect), database migration, cutover management, post-migration optimisation, and cloud operations setup. Fixed-price programme or T&M for larger portfolios.',
    bestFor: ['Organisations planning a full data centre exit', 'Businesses migrating 20+ applications to cloud', 'Companies with mixed rehost/replatform/re-architect requirements', 'Enterprises with compliance and security requirements'],
    process: 'Assessment → Strategy → Wave 1 pilot → Wave N migrations → Post-migration ops',
    timeline: '3–18 months depending on portfolio size',
  },
  {
    id: 'single-app',
    name: 'Application / Workload Migration',
    badge: 'Defined scope',
    badgeColor: '#0369a1',
    icon: 'M20 6h-2.18c.07-.44.18-.88.18-1.35C18 2.53 15.48 0 12.35 0 10.2 0 8.55 1.15 7.55 2.8L7 3.5 6.45 2.8C5.45 1.15 3.8 0 1.65 0-1.48 0-4 2.53-4 5.65c0 .47.11.91.18 1.35H-6C-7.1 7-8 7.9-8 9v12c0 1.1.9 2 2 2h24c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z',
    headline: 'Migration of a specific application or workload to cloud.',
    desc: 'A focused engagement for migrating a single application, workload, or database to cloud — scoped, priced, and delivered with a fixed timeline. We handle the cloud environment setup (VPC, IAM, networking), application deployment or VM migration, database migration, testing, cutover, and post-go-live validation.',
    bestFor: ['Migrating a single web application or database to AWS/Azure/GCP', 'Proof-of-concept cloud migration before committing to a full programme', 'Dev/test environment migration to reduce on-premises costs', 'Specific compliance-driven migration (e.g., move to an Azure region for data residency)'],
    process: 'Scoping → Cloud env setup → Migration → Testing → Cutover → Sign-off',
    timeline: '2–12 weeks per workload',
  },
  {
    id: 'advisory',
    name: 'Cloud Migration Advisory & Managed Services',
    badge: 'Ongoing engagement',
    badgeColor: '#7c3aed',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Strategic cloud advisory and post-migration managed operations.',
    desc: 'Cloud architecture advisory for organisations planning their migration strategy, or post-migration managed services covering cloud operations, cost optimisation reviews, security posture reviews, scaling management, and ongoing infrastructure evolution. Monthly retainer with transparent hours reporting.',
    bestFor: ['CTO/IT leadership needing strategic cloud migration advice', 'Post-migration cloud operations and cost management', 'Organisations without internal cloud expertise post-migration', 'Ongoing security posture and compliance review'],
    process: 'Kickoff → Monthly advisory sessions → Cost reviews → Architecture evolution',
    timeline: 'Ongoing monthly retainer',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery & Cloud Readiness Assessment', desc: "We begin with a comprehensive assessment of your application portfolio — documenting each application's architecture, dependencies (databases, APIs, messaging), data volumes, performance requirements, compliance constraints (GDPR, HIPAA, PCI-DSS, SOC 2), current infrastructure utilisation, and integration points. We interview application owners and operations teams. Output: a scored application inventory with recommended migration strategy (6R) per application, risk ratings, and dependency mapping." },
  { num: '02', title: 'Migration Strategy & Business Case', desc: 'We produce a migration strategy document covering: target cloud platform recommendation (AWS, Azure, GCP, or multi-cloud) with rationale, cost comparison (current on-premises TCO vs projected cloud TCO with optimisation), wave plan (prioritised migration groups — low-risk rehost applications first, complex refactor applications last), estimated timeline and resource requirements, risk register and mitigation plan, and success criteria for each migration wave.' },
  { num: '03', title: 'Cloud Landing Zone & IaC Foundation', desc: 'Before migrating any application, we establish your cloud foundation — multi-account or subscription architecture (AWS Control Tower or Azure Landing Zones), VPC/VNet network topology, private connectivity (Direct Connect or ExpressRoute), DNS configuration, IAM/RBAC policies with least-privilege principles, centralised logging and security event collection, cost budgeting and tagging policies. All infrastructure is written in Terraform and version-controlled in Git.' },
  { num: '04', title: 'Wave Migration — Pilot, Then Scale', desc: 'Migration proceeds in waves — starting with a small pilot wave of 3–5 lower-risk applications to validate the migration process, tooling, and runbooks before scaling to larger waves. Each wave includes: pre-migration checklist, VM or application migration execution, database migration and validation, network connectivity testing, application functional testing, performance baseline comparison to on-premises, and cutover execution with rollback capability.' },
  { num: '05', title: 'Database Migration & Validation', desc: 'Database migrations are executed separately from application migrations to minimise risk — pre-migration schema validation, AWS DMS or Azure DMS continuous replication setup (for large databases), homologation testing (row counts, data integrity, stored procedure execution, query performance), parallel-run period with both source and target databases live and synchronised, and final cutover with minimal downtime (typically under 1 hour for DMS-based migrations).' },
  { num: '06', title: 'Post-Migration Optimisation & Handover', desc: 'After each wave goes live: cloud cost review and rightsizing, security posture review (public exposure audit, IAM permissions review), performance comparison to pre-migration baseline, monitoring and alerting validation, runbook documentation for common operational tasks, and knowledge transfer to your cloud operations team. We provide a 30-day hypercare period post-migration with heightened monitoring and rapid incident response.' },
];

const TESTIMONIALS = [
  {
    text: "1Solutions migrated our 40-application portfolio from an ageing VMware data centre to AWS in 9 months. They ran the full programme — assessment, wave planning, IaC with Terraform, rehost migrations, two re-platform projects (moving to RDS Aurora), and our Oracle database migration. Zero data loss, zero production outages. Our infrastructure bill dropped from $180K/month to $72K/month in year one.",
    name: 'David M.', role: 'CTO, SaaS Platform (UK)', init: 'DM', bg: '#0F3460',
  },
  {
    text: "We had 18 months to exit our on-premises data centre before the lease expired. 1Solutions delivered a 3-wave Azure migration covering 60 workloads — including our SQL Server databases to Azure SQL Managed Instance, our Windows Server applications to Azure VMs, and our file servers to Azure Files. They finished in 14 months with two months to spare. The Azure ExpressRoute connectivity and hybrid DNS setup they designed is rock solid.",
    name: 'Sarah K.', role: 'Head of Infrastructure, Financial Services (AU)', init: 'SK', bg: '#0c2340', feat: true,
  },
  {
    text: "1Solutions conducted our cloud readiness assessment and helped us avoid a $2M mistake. We were planning to lift-and-shift our entire monolith to EC2 instances and we would have had the same operational overhead with a cloud bill on top. They redesigned our approach — a targeted replatform of three components to serverless and ECS containers, with the rest staying on-premises until we refactor. We saved 18 months of wasted cloud spend.",
    name: 'James W.', role: 'VP Engineering, Healthcare Technology (US)', init: 'JW', bg: '#1e3a5f',
  },
];

const WHY_CARDS = [
  { title: 'Cloud-Agnostic — AWS, Azure & GCP Certified', desc: 'We are platform-agnostic and experienced across AWS, Microsoft Azure, and Google Cloud. We recommend the right cloud for your specific requirements — not the platform we prefer or are commercially incentivised to recommend. We hold AWS Solutions Architect, Azure Administrator, and GCP Professional Cloud Architect certifications on our team.' },
  { title: 'Assessment-First — No Migration Without a Plan', desc: 'We never start migrating before we understand the full picture. Every engagement begins with a structured cloud readiness assessment — application inventory, dependency mapping, 6R strategy, risk assessment, cost modelling, and wave planning. The assessment prevents surprises mid-migration and ensures the business case is sound before commitment.' },
  { title: 'Wave-Based Migration — Value From Sprint One', desc: 'We do not take a 12-month "big bang" approach to migration. We migrate in waves — prioritising low-risk, high-value applications in early waves to deliver quick wins and validate tooling before tackling complex workloads. You see applications running in cloud within weeks, not months.' },
  { title: 'Zero Data Loss Record', desc: 'Database migration is the highest-risk element of any cloud migration. Our methodology — continuous DMS replication, parallel-run validation, data integrity checksums, stored procedure parity testing, and final cutover under 1 hour — has achieved zero data loss across all database migrations we have delivered. We do not cut corners on database validation.' },
  { title: 'FinOps Built In From Day One', desc: 'Cloud migrations that do not plan for cost optimisation often result in cloud bills higher than the on-premises spend they replaced. We implement rightsizing, Reserved Instance planning, auto-scaling, storage tiering, and tagging from the start — our cloud migrations typically achieve 30–50% total infrastructure cost reduction compared to on-premises equivalents.' },
  { title: 'Security-First Cloud Architecture', desc: 'Every cloud environment we build is security-first — least-privilege IAM, no public S3 buckets, encrypted storage and transit, CloudTrail/audit logging, Security Hub or Azure Defender, VPC security groups and NACLs, WAF for public-facing applications. We conduct a security posture review before each wave goes live and again 30 days post-migration.' },
  { title: 'IaC for Everything — No Console Sprawl', desc: 'All cloud infrastructure — networks, security groups, compute, databases, S3 buckets, IAM roles — is provisioned via Terraform or AWS CDK, never manually in the cloud console. You inherit a Git repository containing your complete cloud infrastructure definition, applied via CI/CD. Console-created resources are tech debt from day one.' },
  { title: 'Post-Migration Managed Services Available', desc: 'The migration is not the end — cloud environments need ongoing management, cost optimisation, security review, and architecture evolution. We offer post-migration managed services on a monthly retainer, providing monitoring, cost reviews, patch management, incident response, and architecture advisory as your workloads grow and evolve.' },
];

const FAQS = [
  { q: 'What are the 6 Rs of cloud migration?', a: "The 6 Rs are the six migration strategies: Rehost (lift and shift — move as-is to cloud VMs), Replatform (lift and reshape — minimal optimisations like moving to managed database), Repurchase (replace with SaaS), Refactor/Re-architect (redesign as cloud-native), Retire (decommission), and Retain (keep on-premises). 1Solutions applies the appropriate R strategy per application based on your business case, technical complexity, and timeline." },
  { q: 'Which cloud platform should I migrate to — AWS, Azure, or Google Cloud?', a: "The right cloud depends on your existing investments and requirements. AWS has the broadest service catalogue and is the default for most migrations. Azure is natural for Microsoft-heavy organisations (Office 365, Active Directory, SQL Server, .NET). GCP is strongest for Kubernetes, BigQuery analytics, and AI/ML. 1Solutions is platform-agnostic — we recommend the platform that fits your specific needs, not the one we prefer." },
  { q: 'How long does a cloud migration take?', a: "A simple lift-and-shift of a single application takes 2–6 weeks. A portfolio of 20–50 applications using rehost and replatform strategies takes 3–9 months. A large enterprise migration covering hundreds of applications and data centre decommission takes 12–36 months. We use wave-based migration to deliver quick wins early while more complex applications are planned." },
  { q: 'How do you handle database migration to cloud?', a: "We handle Oracle, SQL Server, MySQL, PostgreSQL, and MongoDB migration to cloud using AWS DMS, Azure Database Migration Service, or native dump-restore. We run homologation testing for data integrity, stored procedure compatibility, and query performance. For large databases, DMS continuous replication minimises cutover downtime to under 1 hour." },
  { q: 'What is a hybrid cloud and when does it make sense?', a: "Hybrid cloud connects your on-premises environment to public cloud via private network (AWS Direct Connect, Azure ExpressRoute). It makes sense when regulatory requirements prohibit full public cloud, legacy applications cannot be migrated immediately, or you need low-latency connectivity between on-premises operational technology and cloud analytics. 1Solutions designs and implements hybrid cloud architectures on AWS, Azure, and GCP." },
  { q: 'How do you reduce cloud costs after migration?', a: "Cloud cost optimisation includes rightsizing VMs based on actual utilisation, Reserved Instance and Savings Plan purchasing, spot/preemptible instances for batch workloads, storage tiering (S3 Intelligent-Tiering), auto-scaling, and quarterly FinOps reviews. Our cloud migrations typically achieve 30–50% infrastructure cost reduction compared to equivalent on-premises spend when optimisation is included." },
  { q: 'What is cloud migration risk and how do you manage it?', a: "Cloud migration risk includes technical (application compatibility, data loss, performance regression), business continuity (production outages during cutover), security (misconfigured cloud resources), and cost risks. We manage risk through thorough pre-migration assessment, parallel-run periods, automated rollback capability (snapshot-based), security review before go-live, and cost budget alerts." },
  { q: 'Do you provide post-migration managed services?', a: "Yes. Post-migration we offer managed cloud services — infrastructure monitoring, cost optimisation reviews, security posture reviews, patch management, backup and DR testing, and scaling event management. We also provide full architecture documentation and operational runbooks. Managed services are available on a monthly retainer." },
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
    <div className="cm-stat-col">
      <div className="cm-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="cm-stat-label">{label}</div>
    </div>
  );
}

export default function CloudMigrationServices() {
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
        <title>Cloud Migration Services | AWS, Azure, GCP Migration | 1Solutions</title>
        <meta name="description" content="Expert cloud migration services — cloud readiness assessment, lift & shift, re-platforming, database migration, AWS/Azure/GCP migration, hybrid cloud, cloud cost optimisation, disaster recovery, and post-migration managed services. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/cloud-migration-services/" />
        <meta property="og:title" content="Cloud Migration Services | AWS, Azure & GCP | 1Solutions" />
        <meta property="og:description" content="End-to-end cloud migration — cloud readiness assessment, lift & shift, re-platforming, database migration to AWS/Azure/GCP, hybrid cloud, cost optimisation, and post-migration managed services." />
        <meta property="og:url" content="https://www.1solutions.biz/cloud-migration-services/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .cm-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#f0f9ff 0%,#e0f2fe 20%,#f0fdf4 50%,#fef3c7 75%,#eff6ff 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .cm-page *,.cm-page *::before,.cm-page *::after{box-sizing:border-box}
          .cm-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .cm-orb-1{width:880px;height:880px;background:radial-gradient(circle,rgba(3,105,161,.20) 0%,rgba(14,165,233,.08) 40%,transparent 70%);top:-280px;right:-260px}
          .cm-orb-2{width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px}
          .cm-orb-3{width:550px;height:550px;background:radial-gradient(circle,rgba(22,163,74,.14) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%)}
          .cm-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .cm-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .cm-breadcrumb li{display:flex;align-items:center;gap:6px}
          .cm-breadcrumb li::after{content:'/';opacity:.45}
          .cm-breadcrumb li:last-child::after{display:none}
          .cm-breadcrumb a{color:#0F3460;text-decoration:none}
          .cm-breadcrumb a:hover{text-decoration:underline}
          .cm-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .cm-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .cm-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#0369a1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .cm-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .cm-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .cm-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .cm-badge-dot{width:7px;height:7px;border-radius:50%;background:#0369a1;flex-shrink:0}
          .cm-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .cm-btn-primary{display:inline-block;padding:14px 36px;background:#0369a1;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(3,105,161,.28)}
          .cm-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .cm-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .cm-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(3,105,161,.5);transform:translateY(-2px)}
          .cm-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .cm-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .cm-stat-col:last-child{border-right:none}
          .cm-stat-val{font-size:28px;font-weight:900;color:#0369a1;letter-spacing:-.5px;line-height:1}
          .cm-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .cm-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .cm-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .cm-logos-wrap{width:100%;overflow:hidden}
          .cm-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:cm-marquee 28s linear infinite}
          .cm-logos-track:hover{animation-play-state:paused}
          @keyframes cm-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .cm-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .cm-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .cm-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .cm-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .cm-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .cm-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .cm-s-reveal.cm-revealed{opacity:1;transform:translateY(0)}
          .cm-inner{max-width:1300px;margin:0 auto}
          .cm-svc-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .cm-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .cm-svc-card{background:linear-gradient(135deg,rgba(240,249,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .cm-svc-card.cm-cv{opacity:1;transform:translateY(0)}
          .cm-svc-card.cm-cv:hover{transform:translateY(-6px);border-color:rgba(3,105,161,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .cm-svc-card.feat{border-color:rgba(3,105,161,.20)}
          .cm-svc-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .cm-svc-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .cm-svc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .cm-svc-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#0369a1,#38bdf8);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .cm-svc-card.cm-cv:hover::before{transform:scaleY(1)}
          .cm-svc-more{text-align:center;margin-top:22px}
          .cm-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .cm-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .cm-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .cm-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .cm-stack-card{background:linear-gradient(135deg,rgba(240,249,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .cm-stack-card.cm-sv{opacity:1;transform:translateY(0)}
          .cm-stack-card.cm-sv:hover{border-color:rgba(3,105,161,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .cm-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .cm-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .cm-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .cm-eng-section{padding:80px 40px;position:relative;z-index:1}
          .cm-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .cm-eng-card{background:linear-gradient(135deg,rgba(240,249,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .cm-eng-card.cm-ev{opacity:1;transform:translateY(0)}
          .cm-eng-card.cm-ev:hover{border-color:rgba(3,105,161,.25);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .cm-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(240,249,255,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .cm-eng-card.feat.cm-ev{transform:translateY(-8px)}
          .cm-eng-card.feat.cm-ev:hover{transform:translateY(-12px)}
          .cm-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .cm-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s}
          .cm-eng-card.cm-ev:hover .cm-eng-icon{background:rgba(3,105,161,.10)}
          .cm-eng-card.feat .cm-eng-icon{background:rgba(217,119,6,.10)}
          .cm-eng-icon svg{fill:#0F3460;transition:fill .2s}
          .cm-eng-card.cm-ev:hover .cm-eng-icon svg{fill:#0369a1}
          .cm-eng-card.feat .cm-eng-icon svg{fill:#D97706}
          .cm-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .cm-eng-headline{font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px}
          .cm-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .cm-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .cm-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .cm-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .cm-eng-list li::before{content:'✓';font-weight:800;color:#0369a1;flex-shrink:0;margin-top:1px}
          .cm-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .cm-eng-process strong{color:#0F3460}
          .cm-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .cm-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .cm-eng-cta:hover{background:#0F3460;color:#fff}
          .cm-eng-card.feat .cm-eng-cta{background:#0369a1;color:#fff;border-color:#0369a1}
          .cm-eng-card.feat .cm-eng-cta:hover{background:#0F3460;border-color:#0F3460}
          .cm-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .cm-psteps{display:flex;flex-direction:column;margin-top:52px}
          .cm-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .cm-pstep.cm-pv{opacity:1;transform:translateY(0)}
          .cm-pstep-l{display:flex;flex-direction:column;align-items:center}
          .cm-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s}
          .cm-pstep.cm-pv:hover .cm-pstep-circle{background:rgba(3,105,161,.10);border-color:#0369a1;color:#0369a1}
          .cm-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .cm-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .cm-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .cm-pstep:last-child .cm-pstep-connector{display:none}
          .cm-pstep-r{padding:4px 0 38px}
          .cm-pstep:last-child .cm-pstep-r{padding-bottom:0}
          .cm-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .cm-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .cm-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .cm-center-head{text-align:center;margin-bottom:48px}
          .cm-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .cm-tcard{background:linear-gradient(135deg,rgba(240,249,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s}
          .cm-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(240,249,255,.42) 100%);border-color:rgba(217,119,6,.22)}
          .cm-tcard.cm-tv{opacity:1;transform:translateY(0)}
          .cm-tcard.cm-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .cm-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .cm-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .cm-tauthor{display:flex;align-items:center;gap:12px}
          .cm-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .cm-tname{font-size:14px;font-weight:700;color:#0F3460}
          .cm-trole{font-size:12px;color:#6b7280}
          .cm-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .cm-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .cm-wcard{background:linear-gradient(135deg,rgba(240,249,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .cm-wcard.cm-wv{opacity:1;transform:translateY(0) scale(1)}
          .cm-wcard.cm-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(3,105,161,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .cm-wcard-dot{width:10px;height:10px;border-radius:50%;background:#0369a1;margin-bottom:12px}
          .cm-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .cm-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .cm-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(240,249,255,.55) 0%,rgba(255,255,255,.60) 40%,rgba(240,253,244,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .cm-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .cm-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#0369a1 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .cm-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .cm-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .cm-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .cm-cbenefit-icon{flex-shrink:0;color:#0369a1;font-weight:800;font-size:16px;margin-top:1px}
          .cm-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .cm-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(240,249,255,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .cm-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .cm-form{display:flex;flex-direction:column;gap:13px}
          .cm-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .cm-fg{display:flex;flex-direction:column;gap:5px}
          .cm-fg.full{grid-column:1/-1}
          .cm-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .cm-fg input,.cm-fg textarea,.cm-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .cm-fg input:focus,.cm-fg textarea:focus,.cm-fg select:focus{outline:none;border-color:#0369a1;box-shadow:0 0 0 3px rgba(3,105,161,.10)}
          .cm-consent{display:flex;gap:8px;align-items:flex-start}
          .cm-consent input{margin-top:3px;width:15px;height:15px}
          .cm-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .cm-consent a{color:#0F3460}
          .cm-submit{width:100%;padding:14px;background:#0369a1;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(3,105,161,.26)}
          .cm-submit:hover{background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28)}
          .cm-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .cm-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .cm-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .cm-faq-list{display:flex;flex-direction:column;gap:10px}
          .cm-fitem{background:linear-gradient(135deg,rgba(240,249,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(240,253,244,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .cm-fitem.open{border-color:rgba(3,105,161,.30)}
          .cm-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#0369a1,#38bdf8);border-radius:3px 3px 0 0}
          .cm-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .cm-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .cm-fitem.open .cm-fq-badge{background:#0369a1;color:#fff}
          .cm-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .cm-fitem.open .cm-fq span{color:#075985}
          .cm-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .cm-fitem.open .cm-fchev{transform:rotate(180deg);color:#0369a1}
          .cm-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .cm-fitem.open .cm-fanswer-wrap{max-height:500px}
          .cm-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .cm-related{padding:80px 40px;background:rgba(240,249,255,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .cm-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .cm-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .cm-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .cm-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .cm-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .cm-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .cm-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .cm-rtag-blue{background:rgba(3,105,161,.09);border-color:rgba(3,105,161,.28);color:#0369a1}
          .cm-rtag-violet{background:rgba(124,58,237,.09);border-color:rgba(124,58,237,.28);color:#6D28D9}
          .cm-rtag-amber{background:rgba(180,83,9,.09);border-color:rgba(180,83,9,.28);color:#b45309}
          .cm-rtag-green{background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d}
          .cm-rtag-rose{background:rgba(225,29,72,.09);border-color:rgba(225,29,72,.28);color:#9f1239}
          .cm-rtag-teal{background:rgba(15,118,110,.09);border-color:rgba(15,118,110,.28);color:#0f766e}
          @media(max-width:1024px){.cm-hero h1,.cm-s-title,.cm-faq h2{font-size:36px}.cm-svc-grid{grid-template-columns:repeat(2,1fr)}.cm-stack-grid{grid-template-columns:repeat(2,1fr)}.cm-eng-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.cm-eng-card.feat{transform:none}.cm-eng-card.feat.cm-ev{transform:none}.cm-eng-card.feat.cm-ev:hover{transform:translateY(-4px)}.cm-why-grid{grid-template-columns:repeat(2,1fr)}.cm-tgrid{grid-template-columns:1fr}.cm-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.cm-breadcrumb{padding:12px 20px 0}.cm-hero{padding:28px 20px 20px}.cm-hero h1{font-size:26px;letter-spacing:-.3px}.cm-stats{grid-template-columns:1fr 1fr}.cm-stat-col:nth-child(2){border-right:none}.cm-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.cm-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.cm-logos{padding:16px 20px 28px}.cm-svc-section,.cm-stack-section,.cm-eng-section,.cm-process-section,.cm-testi,.cm-why-section,.cm-faq,.cm-related{padding:52px 20px}.cm-contact{padding:48px 20px}.cm-svc-grid,.cm-stack-grid,.cm-why-grid{grid-template-columns:1fr}.cm-frow{grid-template-columns:1fr}.cm-ctitle{font-size:28px}.cm-s-title{font-size:28px}}
        `}</style>
      </Head>

      <div className="cm-page">
        <div className="cm-orb cm-orb-1" /><div className="cm-orb cm-orb-2" /><div className="cm-orb cm-orb-3" />

        <nav className="cm-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Cloud Migration Services</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <section className="cm-hero">
          <span className="cm-eyebrow">Cloud Migration Services</span>
          <h1>Cloud Migration Services — AWS, Azure & GCP Migration Done Right</h1>
          <p className="cm-hero-desc">End-to-end cloud migration services — cloud readiness assessment and 6R strategy, lift and shift rehost, application re-platforming, database migration, AWS Landing Zone and Azure Landing Zone setup, hybrid cloud design, cloud cost optimisation, disaster recovery in cloud, and post-migration managed services for businesses worldwide.</p>
          <div className="cm-trust-row">
            {['AWS, Azure & GCP Certified','6R Migration Strategy','Zero Data Loss Record','IaC with Terraform','30–50% Cost Reduction'].map(b => (
              <div className="cm-badge" key={b}><span className="cm-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="cm-ctas">
            <Link href="#contact" className="cm-btn-primary">Start Your Cloud Migration</Link>
            <Link href="#engagement" className="cm-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        <div className="cm-stats" ref={statsRef}>
          {[['150+','Cloud Migrations Delivered'],['15+','Years Cloud Experience'],['40%','Avg Cost Reduction'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        <div className="cm-logos">
          <span className="cm-logos-label">Trusted by Businesses Migrating to Cloud</span>
          <div className="cm-logos-wrap">
            <div className="cm-logos-track">
              {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="cm-clogo" />
              ))}
            </div>
          </div>
        </div>

        <section className="cm-svc-section" aria-labelledby="cm-svc-heading">
          <div className="cm-inner">
            <div className={`cm-s-reveal${visibleSections.has('svc') ? ' cm-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="cm-s-eyebrow">What We Do</span>
              <h2 id="cm-svc-heading" className="cm-s-title">Cloud Migration Services We Deliver</h2>
              <p className="cm-s-desc" style={{ maxWidth: 720 }}>From cloud readiness assessment and migration strategy through lift-and-shift rehost, application re-platforming, database migration, AWS/Azure/GCP environment setup, hybrid cloud, disaster recovery, cloud cost optimisation, and post-migration managed services.</p>
            </div>
            <div className="cm-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`cm-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' cm-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="cm-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="cm-svc-more">
                <button className="cm-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="stack" className="cm-stack-section" aria-labelledby="cm-stack-heading">
          <div className="cm-inner">
            <div className={`cm-s-reveal${visibleSections.has('stk') ? ' cm-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="cm-s-eyebrow">Tech Stack</span>
              <h2 id="cm-stack-heading" className="cm-s-title">Cloud Migration Tools & Technologies</h2>
              <p className="cm-s-desc" style={{ maxWidth: 680 }}>AWS Migration Hub, Azure Migrate, Google Cloud Migration services, Terraform for landing zone IaC, AWS DMS and Azure DMS for database migration, Kubernetes on EKS/AKS/GKE, CloudWatch/Azure Monitor/GCP Cloud Monitoring, and AWS Cost Explorer for post-migration FinOps.</p>
            </div>
            <div className="cm-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`cm-stack-card${visibleStackCards.includes(i) ? ' cm-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="cm-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="cm-stack-pills">
                    {grp.items.map(item => <span key={item} className="cm-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="engagement" className="cm-eng-section" aria-labelledby="cm-eng-heading">
          <div className="cm-inner">
            <div className={`cm-s-reveal${visibleSections.has('eng') ? ' cm-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="cm-s-eyebrow">How We Work</span>
              <h2 id="cm-eng-heading" className="cm-s-title">Cloud Migration Engagement Models</h2>
              <p className="cm-s-desc" style={{ maxWidth: 680 }}>Run a full cloud migration programme for your application portfolio, migrate a single application or workload, or engage for ongoing cloud advisory and post-migration managed services.</p>
            </div>
            <div className="cm-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`cm-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' cm-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="cm-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="cm-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div>
                  <div className="cm-eng-name">{m.name}</div>
                  <div className="cm-eng-headline">{m.headline}</div>
                  <div className="cm-eng-desc">{m.desc}</div>
                  <div className="cm-eng-list-label">Best for</div>
                  <ul className="cm-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                  <div className="cm-eng-process"><strong>Process:</strong> {m.process}<br /><span className="cm-eng-timeline">{m.timeline}</span></div>
                  <Link href="#contact" className="cm-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cm-process-section" aria-labelledby="cm-proc-heading">
          <div className="cm-inner" style={{ maxWidth: 760 }}>
            <div className={`cm-s-reveal${visibleSections.has('proc') ? ' cm-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="cm-s-eyebrow">How We Deliver</span>
              <h2 id="cm-proc-heading" className="cm-s-title">Our Cloud Migration Process</h2>
              <p className="cm-s-desc">From discovery and readiness assessment through migration strategy, cloud landing zone setup, wave-by-wave application migration, database migration, and post-migration optimisation with hypercare support.</p>
            </div>
            <div className="cm-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`cm-pstep${visibleSections.has('proc') ? ' cm-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="cm-pstep-l">
                    <div className="cm-pstep-circle">{step.num}</div>
                    <div className="cm-pstep-connector" />
                  </div>
                  <div className="cm-pstep-r">
                    <div className="cm-pstep-title">{step.title}</div>
                    <p className="cm-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cm-testi" aria-labelledby="cm-ts-heading">
          <div className="cm-inner">
            <div className={`cm-center-head cm-s-reveal${visibleSections.has('ts') ? ' cm-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="cm-s-eyebrow">Client Results</span>
              <h2 id="cm-ts-heading" className="cm-s-title">What Our Cloud Migration Clients Say</h2>
              <p className="cm-s-desc">Engineering and IT leadership teams across the US, UK, and Australia trust 1Solutions to plan and execute their cloud migrations — from single application moves to full data centre exit programmes.</p>
            </div>
            <div className="cm-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`cm-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' cm-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review">
                  <div className="cm-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="cm-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="cm-tauthor">
                    <div className="cm-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div><div className="cm-tname" itemProp="author">{t.name}</div><div className="cm-trole">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cm-why-section" aria-labelledby="cm-wy-heading">
          <div className="cm-inner">
            <div className={`cm-s-reveal${visibleSections.has('wy') ? ' cm-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="cm-s-eyebrow">Why 1Solutions</span>
              <h2 id="cm-wy-heading" className="cm-s-title">Why Choose 1Solutions for Cloud Migration</h2>
              <p className="cm-s-desc" style={{ maxWidth: 680 }}>Cloud-agnostic expertise across AWS, Azure, and GCP, assessment-first approach, wave-based migration delivery, zero data loss record, FinOps built in, security-first architecture, IaC for everything, and post-migration managed services available.</p>
            </div>
            <div className="cm-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`cm-wcard${visibleWhyCards.includes(i) ? ' cm-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="cm-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="cm-contact" aria-labelledby="cm-contact-heading">
          <div className="cm-contact-grid">
            <div>
              <h2 id="cm-contact-heading" className="cm-ctitle">Start Your Cloud Migration</h2>
              <p className="cm-cdesc">Tell us about your current environment and cloud migration goals, and we will schedule a free cloud readiness discovery call. Whether you need a single application migrated, a full data centre exit programme, a hybrid cloud design, or a cloud cost optimisation review — our cloud architects will scope your engagement and provide a transparent quote within 24 hours.</p>
              <div className="cm-cbenefits">
                {[['✓','Free cloud readiness discovery call with a senior cloud architect'],['✓','Platform-agnostic — AWS, Azure, GCP, or multi-cloud recommendation with rationale'],['✓','6R migration strategy per application — rehost, replatform, repurchase, refactor, retire, retain'],['✓','Zero data loss record across all database migrations we have delivered'],['✓','Response within 24 business hours from our cloud migration team']].map(([icon, text]) => (
                  <div className="cm-cbenefit" key={text}><span className="cm-cbenefit-icon">{icon}</span><p>{text}</p></div>
                ))}
              </div>
            </div>
            <div className="cm-form-box">
              <h3>Tell Us About Your Cloud Migration</h3>
              <form className="cm-form" onSubmit={e => e.preventDefault()}>
                <div className="cm-frow">
                  <div className="cm-fg"><label htmlFor="cm-name">Full Name *</label><input id="cm-name" type="text" placeholder="Your name" required /></div>
                  <div className="cm-fg"><label htmlFor="cm-email">Work Email *</label><input id="cm-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="cm-frow">
                  <div className="cm-fg"><label htmlFor="cm-company">Company / Organisation</label><input id="cm-company" type="text" placeholder="Your company name" /></div>
                  <div className="cm-fg"><label htmlFor="cm-phone">Phone / WhatsApp</label><input id="cm-phone" type="tel" placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="cm-fg full">
                  <label htmlFor="cm-target">Target Cloud Platform *</label>
                  <select id="cm-target" required>
                    <option value="">Select target cloud...</option>
                    <option>AWS (Amazon Web Services)</option>
                    <option>Microsoft Azure</option>
                    <option>Google Cloud (GCP)</option>
                    <option>Multi-cloud (AWS + Azure or GCP)</option>
                    <option>Hybrid Cloud (on-premises + cloud)</option>
                    <option>Not yet decided — need advice</option>
                  </select>
                </div>
                <div className="cm-fg full">
                  <label htmlFor="cm-type">Migration Type *</label>
                  <select id="cm-type" required>
                    <option value="">Select migration type...</option>
                    <option>Full data centre exit / migration programme</option>
                    <option>Single application migration</option>
                    <option>Database migration to cloud</option>
                    <option>Lift &amp; shift (rehost) migration</option>
                    <option>Application re-platforming (containers / managed services)</option>
                    <option>Hybrid cloud setup</option>
                    <option>Cloud cost optimisation</option>
                    <option>Cloud readiness assessment only</option>
                    <option>Disaster recovery in cloud</option>
                    <option>Post-migration managed services</option>
                  </select>
                </div>
                <div className="cm-fg full">
                  <label htmlFor="cm-msg">Current Environment &amp; Migration Goals *</label>
                  <textarea id="cm-msg" rows={4} placeholder="Describe your current environment (number of applications, data centre, databases, operating systems), migration timeline, compliance requirements (GDPR, HIPAA, PCI-DSS), and your goals (cost reduction, agility, DR, compliance)..." required />
                </div>
                <div className="cm-consent">
                  <input id="cm-consent" type="checkbox" required />
                  <label htmlFor="cm-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. All details are treated confidentially.</label>
                </div>
                <button type="submit" className="cm-submit">Get Free Cloud Migration Consultation →</button>
              </form>
            </div>
          </div>
        </section>

        <section className="cm-faq" aria-labelledby="cm-faq-heading">
          <div className="cm-inner" style={{ maxWidth: 860 }}>
            <span className="cm-s-eyebrow">FAQ</span>
            <h2 id="cm-faq-heading">Cloud Migration — Frequently Asked Questions</h2>
            <p className="cm-faq-sub">Common questions about cloud migration — the 6R strategies, choosing AWS vs Azure vs GCP, migration timelines, database migration, hybrid cloud, cost optimisation, risk management, and post-migration support.</p>
            <div className="cm-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`cm-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="cm-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="cm-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="cm-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="cm-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="cm-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cm-related">
          <div className="cm-related-inner">
            <span className="cm-s-eyebrow">Explore More</span>
            <h2>Related Cloud & Infrastructure Services</h2>
            <p className="cm-related-sub">We also provide cloud native development, DevOps automation, and managed cloud infrastructure services for businesses worldwide.</p>
            <hr />
            <div className="cm-rtags">
              {[['/cloud-native-services/','Cloud Native Development','cm-rtag-violet'],['/devops-services-company/','DevOps Services','cm-rtag-amber'],['/aws-development-services/','AWS Development','cm-rtag-blue'],['/azure-development-services/','Azure Development','cm-rtag-blue'],['/erp-development-company/','ERP Development','cm-rtag-amber'],['/nextjs-development-services/','Next.js Development','cm-rtag-blue'],['/tibco-development-services/','TIBCO Integration','cm-rtag-rose'],['/website-support-maintenance-services/','Website Maintenance','cm-rtag-teal'],['/software-development-company/','Software Development','cm-rtag-green'],['/crm-development-company/','CRM Development','cm-rtag-teal']].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`cm-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
