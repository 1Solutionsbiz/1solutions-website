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
        { '@type': 'ListItem', position: 2, name: 'TIBCO Development Services', item: 'https://www.1solutions.biz/tibco-development-services/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'TIBCO Development Services',
      url: 'https://www.1solutions.biz/tibco-development-services/',
      description: 'Expert TIBCO development services — TIBCO BusinessWorks integration, TIBCO EMS messaging, TIBCO BPM, TIBCO Spotfire analytics, TIBCO Cloud Integration, TIBCO API Management, TIBCO to MuleSoft/Boomi migration, performance tuning, TIBCO administration, and enterprise middleware consulting for businesses worldwide.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '62', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is TIBCO BusinessWorks and what does it do?', acceptedAnswer: { '@type': 'Answer', text: 'TIBCO BusinessWorks is an enterprise integration platform (EIP) and middleware solution used to connect disparate business applications, databases, and services through a visual, low-code integration design environment. It supports a wide range of connectors (SAP, Salesforce, Oracle, databases, REST/SOAP, JMS, FTP, file-based), transformation logic, error handling, and orchestration of multi-step business processes. BusinessWorks 5.x (BW5) has been widely deployed since the early 2000s; BusinessWorks 6.x (BWCE — Container Edition) runs on Docker and Kubernetes, enabling cloud-native deployment of TIBCO integrations. 1Solutions develops, maintains, and modernises both BW5 and BW6/BWCE environments.' } },
        { '@type': 'Question', name: 'What is TIBCO EMS and how is it different from ActiveMQ or Kafka?', acceptedAnswer: { '@type': 'Answer', text: "TIBCO Enterprise Message Service (EMS) is TIBCO's JMS-compliant messaging middleware, providing reliable point-to-point queuing and publish-subscribe topic-based messaging for enterprise systems. EMS is known for its high reliability, fault tolerance, and tight integration with the TIBCO BusinessWorks and TIBCO Rendezvous ecosystem. Compared to Apache ActiveMQ, TIBCO EMS offers stronger enterprise support, certified TIBCO integration, and battle-tested reliability in large financial services and manufacturing environments. Compared to Apache Kafka, EMS is a traditional JMS broker best suited for reliable transactional message delivery, while Kafka is a distributed log optimised for high-throughput streaming and event sourcing. 1Solutions designs, configures, tunes, and maintains TIBCO EMS environments and can advise on the right messaging architecture for your requirements." } },
        { '@type': 'Question', name: 'Can you migrate from TIBCO BusinessWorks to MuleSoft or Boomi?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. 1Solutions provides TIBCO to MuleSoft, TIBCO to Boomi (Dell Boomi / Boomi AtomSphere), and TIBCO to Azure Integration Services migration services. These migrations are undertaken when organisations seek to reduce TIBCO licensing costs, consolidate on a cloud-native iPaaS platform, or take advantage of MuleSoft Anypoint Platform or Boomi capabilities. The migration process involves cataloguing existing TIBCO BusinessWorks processes, mapping them to equivalent MuleSoft flows or Boomi processes, replicating transformation logic, migrating TIBCO EMS topics/queues to JMS or the target platform message broker, testing functional parity, and cutover planning to minimise production downtime.' } },
        { '@type': 'Question', name: 'What is TIBCO Cloud Integration and how does it differ from on-premises TIBCO BusinessWorks?', acceptedAnswer: { '@type': 'Answer', text: "TIBCO Cloud Integration is TIBCO's cloud-based iPaaS (Integration Platform as a Service) offering, encompassing BusinessWorks Cloud (BWCE on cloud), TIBCO Cloud Spotfire for analytics, and TIBCO Cloud Messaging. Unlike on-premises TIBCO BusinessWorks 5.x deployments which require dedicated servers and TIBCO Administrator for management, TIBCO Cloud Integration is subscription-based, hosted on TIBCO-managed cloud infrastructure, and eliminates the overhead of infrastructure management. For organisations on TIBCO BW5 evaluating a modernisation path, BWCE (BusinessWorks Container Edition) provides a containerised runtime that can run on Kubernetes (on-premises or cloud) with the same BW development experience but cloud-native deployment. 1Solutions advises on the right modernisation path and implements both BWCE and TIBCO Cloud Integration environments." } },
        { '@type': 'Question', name: 'What TIBCO Spotfire services do you provide?', acceptedAnswer: { '@type': 'Answer', text: "1Solutions provides TIBCO Spotfire implementation and development services — connecting Spotfire to enterprise data sources (Oracle, SQL Server, SAP HANA, Snowflake, data lakes), building interactive dashboards and visualisations, developing custom Spotfire extensions using the Spotfire API and IronPython scripting, implementing Spotfire Server in enterprise environments (Active Directory integration, SSO, user management), Spotfire Analyst and Web Player deployment, data function integration, and Spotfire upgrade and migration services." } },
        { '@type': 'Question', name: 'How do you tune TIBCO BusinessWorks performance?', acceptedAnswer: { '@type': 'Answer', text: "TIBCO BusinessWorks performance tuning involves multiple layers: engine-level configuration (thread count, job count, checkpoint interval, garbage collection settings for the underlying JVM), process-level design review (identifying subprocess calls, shared variables, and synchronous vs asynchronous process patterns that cause bottlenecks), TIBCO EMS configuration tuning (queue/topic prefetch counts, flow control, persistent vs non-persistent message delivery), adapter and connector optimisation (batch sizes, connection pooling, SQL query performance), and infrastructure-level review (network latency between BW engine and connected systems, disk I/O for persistence). 1Solutions conducts BusinessWorks performance assessments and implements tuning recommendations for BW5, BW6, and BWCE environments." } },
        { '@type': 'Question', name: 'What is TIBCO BPM and what business problems does it solve?', acceptedAnswer: { '@type': 'Answer', text: "TIBCO BPM (Business Process Management) is TIBCO's platform for designing, automating, and monitoring business processes that involve human tasks, system integrations, and decision logic. It combines process modelling (BPMN 2.0), case management, forms-based human task management, business rules (via TIBCO Business Rules Service), and real-time process analytics into a unified environment. Common use cases include loan origination and approval workflows in financial services, insurance claims processing, order-to-cash processes, procurement and purchase order approval, HR onboarding, and compliance audit workflows. 1Solutions designs, develops, and maintains TIBCO BPM processes and can integrate TIBCO BPM with BusinessWorks integrations, ERP systems (SAP, Oracle), and CRM platforms (Salesforce)." } },
        { '@type': 'Question', name: 'Can you provide ongoing TIBCO administration and support?', acceptedAnswer: { '@type': 'Answer', text: "Yes. 1Solutions provides ongoing TIBCO platform administration and support on a retainer basis — covering TIBCO Administrator monitoring and management, BusinessWorks process deployment and lifecycle management, TIBCO EMS queue and topic management, capacity monitoring, incident response for production integration failures, hotfix deployment, version patching, and quarterly health reviews. We also provide L2/L3 support escalation for organisations with internal L1 support teams. Our TIBCO engineers work in your timezone overlap and are available for P1 incident response via PagerDuty or direct escalation." } },
      ],
    },
  ],
};

const SERVICES = [
  { n: '01', title: 'TIBCO BusinessWorks Integration Development', desc: 'End-to-end TIBCO BusinessWorks 5.x and 6.x/BWCE integration development — SAP, Salesforce, Oracle E-Business Suite, ServiceNow, databases (Oracle/SQL Server/PostgreSQL), REST/SOAP APIs, TIBCO EMS, FTP/SFTP, and file-based connectors. Complex process orchestration, error handling, dead-letter queue management, and retry logic.' },
  { n: '02', title: 'TIBCO EMS Design, Configuration & Tuning', desc: 'TIBCO Enterprise Message Service architecture design, broker installation and configuration, queue and topic topology design for your integration landscape, flow control, persistence configuration (reliable vs non-persistent delivery), fault tolerance with active-standby EMS servers, bridge configuration, and performance tuning for high-throughput messaging environments.', feat: true },
  { n: '03', title: 'TIBCO Cloud Integration & BWCE', desc: 'TIBCO BusinessWorks Container Edition (BWCE) deployment on Docker and Kubernetes — containerising existing BW5 processes for cloud-native deployment, TIBCO Cloud Integration setup, Kubernetes Helm chart deployment for BWCE, integration with cloud services (AWS, Azure, GCP), and TIBCO Cloud Messaging. Modernise your TIBCO platform without rewriting integrations.' },
  { n: '04', title: 'TIBCO BusinessWorks 5 to 6 / BWCE Migration', desc: 'Migration of legacy TIBCO BusinessWorks 5.x deployments to BW6/BWCE — process migration assessment, identifying BW5-to-BW6 compatibility gaps (adapter migration, shared variable patterns, subprocess differences), phased migration with functional parity testing, parallel-run strategy, and TIBCO Administrator to BWCE tooling transition.' },
  { n: '05', title: 'TIBCO to MuleSoft / Boomi / Azure Migration', desc: 'Migration from TIBCO BusinessWorks to cloud-native iPaaS platforms — TIBCO to MuleSoft Anypoint Platform, TIBCO to Boomi AtomSphere, and TIBCO to Azure Integration Services / Azure Service Bus. Includes process catalogue and inventory, functional mapping, JMS/EMS to platform messaging migration, testing frameworks, and production cutover planning.' },
  { n: '06', title: 'TIBCO BPM & Business Process Automation', desc: 'TIBCO BPM process design and development — BPMN 2.0 process modelling, human task forms and task management, TIBCO Business Rules Service integration, case management, process analytics dashboards, and integration with BusinessWorks for system-to-system process steps. Common use cases: financial approval workflows, insurance claims, order processing, HR onboarding.' },
  { n: '07', title: 'TIBCO Spotfire Analytics Implementation', desc: 'TIBCO Spotfire deployment and dashboard development — connecting Spotfire to enterprise data sources (Oracle, SQL Server, SAP HANA, Snowflake, data lakes), interactive visualisation and dashboard design, custom extensions via Spotfire API and IronPython, Spotfire Server enterprise setup (AD/SSO integration), Web Player deployment, and data functions.' },
  { n: '08', title: 'TIBCO API Management (Mashery / TIBCO Cloud)', desc: 'TIBCO API Management implementation — TIBCO Mashery API gateway configuration, API proxy design and rate limiting, developer portal setup, OAuth 2.0 and API key authentication, API analytics and monitoring, TIBCO Cloud Integration API exposure, and integration with TIBCO BusinessWorks backend services via REST/SOAP.' },
  { n: '09', title: 'TIBCO Performance Tuning & Optimisation', desc: 'TIBCO BusinessWorks and EMS performance assessment and tuning — JVM garbage collection configuration, BW engine thread and job count optimisation, process-level design review for bottlenecks, EMS prefetch and flow control tuning, database query performance for adapter connections, adapter connection pool tuning, and load testing with realistic message volumes.' },
  { n: '10', title: 'TIBCO Administration, Monitoring & Support', desc: 'Ongoing TIBCO platform administration on retainer — TIBCO Administrator monitoring, BusinessWorks deployment lifecycle management, EMS queue and topic management, capacity monitoring, incident response for production integration failures, version patching, quarterly health reviews, and L2/L3 support escalation for organisations with internal L1 teams.' },
];

const TECH_STACK = [
  { group: 'TIBCO BusinessWorks', color: '#db2777', items: ['BusinessWorks 5.x (BW5)', 'BusinessWorks 6.x / BWCE', 'TIBCO Designer', 'TIBCO Administrator', 'TIBCO Domain Utility', 'TIBCO Hawk'] },
  { group: 'TIBCO Messaging', color: '#9333ea', items: ['TIBCO EMS', 'TIBCO Rendezvous (RV)', 'TIBCO FTL', 'TIBCO eFTL', 'JMS', 'ActiveMatrix Messaging'] },
  { group: 'TIBCO Cloud & Integration', color: '#0369a1', items: ['TIBCO Cloud Integration', 'TIBCO Cloud Messaging', 'TIBCO Mashery (API Mgmt)', 'TIBCO ActiveMatrix BPM', 'TIBCO iProcess', 'TIBCO Nimbus'] },
  { group: 'TIBCO Analytics', color: '#0891b2', items: ['TIBCO Spotfire', 'Spotfire Analyst', 'Spotfire Web Player', 'Spotfire IronPython', 'TIBCO JasperReports', 'TIBCO Data Virtualization'] },
  { group: 'Adapters & Connectors', color: '#D97706', items: ['SAP Adapter', 'Salesforce Adapter', 'Oracle E-Business Suite', 'ServiceNow', 'REST / SOAP / WSDL', 'File / FTP / SFTP / JDBC'] },
  { group: 'Target Platforms (Migration)', color: '#16a34a', items: ['MuleSoft Anypoint Platform', 'Boomi AtomSphere', 'Azure Integration Services', 'Azure Service Bus', 'AWS EventBridge', 'IBM App Connect'] },
  { group: 'Deployment & Infrastructure', color: '#b45309', items: ['Docker / Kubernetes', 'TIBCO Silver Fabric', 'TIBCO ActiveSpaces', 'TIBCO FTL (low-latency)', 'Oracle WebLogic', 'Red Hat JBoss'] },
  { group: 'Supporting Technologies', color: '#374151', items: ['Java / J2EE', 'XML / XSLT / XPath', 'JSON / REST', 'Oracle / SQL Server / DB2', 'LDAP / Active Directory', 'SSL / PKI / Kerberos'] },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'dedicated',
    name: 'Dedicated TIBCO Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'Dedicated TIBCO developers embedded in your integration team.',
    desc: 'Full-time TIBCO BusinessWorks and EMS engineers working exclusively on your integration landscape — joining your standups, working in your TIBCO Administrator environment, developing new integrations, maintaining existing ones, and managing your platform. TIBCO expertise at offshore rates with onshore accountability.',
    bestFor: ['Enterprises with large TIBCO BusinessWorks landscapes', 'Organisations with ongoing TIBCO integration development', 'Teams seeking to replace expensive local TIBCO contractors', 'Post-merger integration programmes using TIBCO middleware'],
    process: 'Team assembly → Environment onboarding → Integration catalogue review → Ongoing development',
    timeline: 'TIBCO engineers available within 5–7 business days',
  },
  {
    id: 'fixed',
    name: 'Fixed-Scope TIBCO Project',
    badge: 'Defined deliverable',
    badgeColor: '#db2777',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'A scoped TIBCO integration or migration project with a fixed price.',
    desc: 'Perfect for a well-defined TIBCO engagement — a new BusinessWorks integration, a BW5-to-BW6 migration, a TIBCO-to-MuleSoft migration, a Spotfire dashboard build, or an EMS environment setup. Fixed price, fixed timeline, clear deliverables.',
    bestFor: ['New TIBCO BusinessWorks integration for a specific system', 'BW5 to BWCE container migration', 'TIBCO to MuleSoft or Boomi migration', 'TIBCO Spotfire dashboard implementation'],
    process: 'Scope definition → Fixed quote → Development → Testing → Handover',
    timeline: 'Typical 4–16 week project engagements',
  },
  {
    id: 'retainer',
    name: 'TIBCO Support Retainer',
    badge: 'Ongoing operations',
    badgeColor: '#0369a1',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Monthly TIBCO support hours with incident response cover.',
    desc: 'A monthly bank of TIBCO hours for integration maintenance, BusinessWorks patches, EMS management, incident response, performance monitoring, and minor enhancement development — without a full dedicated team commitment.',
    bestFor: ['TIBCO environments needing ongoing L2/L3 support', 'Monthly administration and patch management', 'Incident response for production integration failures', 'Augmenting an internal team with TIBCO expertise'],
    process: 'Monthly hours bank → Incident prioritisation → Hours report → On-call escalation',
    timeline: 'Start within 3–5 business days',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'TIBCO Landscape Discovery & Integration Catalogue', desc: 'We begin by understanding your existing TIBCO environment — BusinessWorks version (BW5 or BW6/BWCE), TIBCO Administrator setup, active integration processes (catalogue by system, type, and business criticality), TIBCO EMS broker configuration (queues, topics, bridges, failover setup), active adapters and connectors, error handling patterns, deployment topology, and monitoring coverage. Output: a complete integration inventory and health assessment.' },
  { num: '02', title: 'Architecture Design & Technical Specification', desc: 'For new integrations or migrations, we produce a technical specification before development begins — source and target system APIs and schemas, data mapping and transformation logic, error handling and retry strategy, TIBCO EMS or JMS topic/queue design, performance and throughput requirements, deployment architecture (on-premises BW5, BWCE on Kubernetes, or TIBCO Cloud), and test scenarios. Reviewed and signed off before any code is written.' },
  { num: '03', title: 'TIBCO BusinessWorks Development & Unit Testing', desc: 'Integration development in TIBCO Designer (BW5) or TIBCO Business Studio (BW6/BWCE) — implementing process flows, palette activities, adapters, XSLT transformations, error handling, and checkpoint/recovery logic. Unit testing against stub services and test data sets. Code reviewed against TIBCO best practices — no hardcoded credentials, proper shared variable usage, checkpoint configuration, and process documentation.' },
  { num: '04', title: 'EMS / Messaging Configuration & Testing', desc: 'TIBCO EMS queue and topic creation, persistence configuration (reliable/non-persistent per message type), consumer group configuration, flow control thresholds, bridge configuration for cross-domain messaging, fault-tolerant active-standby EMS setup, and load testing with realistic message volumes to validate throughput targets and identify bottlenecks before production.' },
  { num: '05', title: 'Integration Testing & Performance Validation', desc: 'End-to-end integration testing against staging environments — functional testing of all process flows, error scenario and exception testing, volume testing at expected peak message rates, fault injection testing (EMS broker failover, target system unavailability, malformed payload handling), and performance benchmarking to validate SLA compliance before production promotion.' },
  { num: '06', title: 'Deployment, Monitoring & Handover', desc: 'Production deployment via TIBCO Administrator or BWCE Kubernetes Helm charts, TIBCO Hawk monitoring rules and alerts, integration with enterprise monitoring (Dynatrace, Splunk, ELK), runbooks for common operational tasks (redeploy, EMS queue drain, dead-letter queue processing), knowledge transfer to your operations team, and documentation of all integration designs. Post-deployment support window included.' },
];

const TESTIMONIALS = [
  {
    text: "We had over 200 TIBCO BusinessWorks 5 integrations connecting our SAP, Oracle, and Salesforce systems, and zero documentation. 1Solutions catalogued every process, documented the integration landscape, and migrated 40 of our highest-priority integrations to BWCE running on Kubernetes. Our TIBCO platform is now container-native and we can deploy integrations in minutes instead of days. Outstanding technical team.",
    name: 'James H.', role: 'Head of Integration Architecture, Global Manufacturer (UK)', init: 'JH', bg: '#0F3460',
  },
  {
    text: "1Solutions migrated our entire TIBCO BusinessWorks landscape to MuleSoft Anypoint Platform — 120 integrations, including our TIBCO EMS messaging fabric which was replaced with MuleSoft JMS. They delivered the migration in 14 months with zero production outages and full functional parity on day one of cutover. The TIBCO licensing savings alone paid for the migration in under 18 months. I would not have trusted this to any other team.",
    name: 'Priya S.', role: 'VP Enterprise Architecture, Financial Services (AU)', init: 'PS', bg: '#1c0536', feat: true,
  },
  {
    text: "Our TIBCO EMS environment was a black box — nobody on the team fully understood the queue topology or why certain messages were getting stuck. 1Solutions conducted a full EMS health assessment, redesigned our topic hierarchy, fixed three long-standing flow control issues, and implemented TIBCO Hawk monitoring rules that alert us before messages back up. We went from weekly production incidents to zero in three months.",
    name: 'Michael K.', role: 'Senior Integration Engineer, Healthcare System (US)', init: 'MK', bg: '#1e3a5f',
  },
];

const WHY_CARDS = [
  { title: '15+ Years Enterprise Middleware Experience', desc: 'We have been working with TIBCO BusinessWorks since version 5.x and have experience across BW5, BW6, BWCE, TIBCO EMS, TIBCO Rendezvous, TIBCO BPM, TIBCO Spotfire, and TIBCO Mashery. We understand the quirks of legacy BW5 environments — including undocumented adapter behaviours, shared variable pitfalls, and checkpoint recovery edge cases that surprise less experienced teams.' },
  { title: 'Full TIBCO Ecosystem Coverage', desc: "We cover the full TIBCO product ecosystem — not just BusinessWorks but also EMS messaging, BPM and process automation, Spotfire analytics, API management (Mashery/TIBCO Cloud API), and TIBCO Cloud Integration. You don't need to split your TIBCO work across multiple vendors." },
  { title: 'Migration Specialists — TIBCO to MuleSoft/Boomi', desc: 'TIBCO migration is a specialist discipline requiring deep understanding of both the source (TIBCO BusinessWorks process patterns, EMS messaging semantics, adapter configurations) and the target platform (MuleSoft DataWeave, Boomi Atom, Azure Logic Apps). Our migration methodology minimises risk with phased cutover, parallel-run periods, and full functional parity testing.' },
  { title: 'BWCE Containerisation & Cloud-Native Modernisation', desc: 'For organisations that want to modernise their TIBCO platform without migrating to a different iPaaS, BWCE (BusinessWorks Container Edition) provides a containerised runtime for existing BW integrations. We containerise BW5 processes for BWCE, deploy on Kubernetes (EKS/AKS/GKE), and implement GitOps deployment pipelines — bringing DevOps practices to your TIBCO environment.' },
  { title: 'Deep SAP, Oracle & Salesforce Adapter Experience', desc: 'Most TIBCO environments connect to SAP, Oracle E-Business Suite, and Salesforce as the primary enterprise systems. Our TIBCO engineers have extensive experience with the TIBCO SAP adapter (BAPI, IDOC, RFC), Oracle adapter (database and E-Business Suite), and Salesforce adapter — including complex IDOC handling, Oracle JDBC performance tuning, and Salesforce API limits management.' },
  { title: 'Offshore Rates, Enterprise-Grade Delivery', desc: 'TIBCO expertise commands premium rates in the US, UK, and Australian market. Our offshore TIBCO engineers provide the same enterprise-grade capability at 40–60% lower cost than equivalent local contractors. All engineers are experienced TIBCO practitioners — not juniors learning on your environment.' },
  { title: 'Integration Documentation as a Deliverable', desc: 'TIBCO environments commonly suffer from years of undocumented integrations that only one engineer understands. We treat integration documentation as a core deliverable — every integration we build or inherit receives a one-page design document covering purpose, systems connected, data flows, error handling, and operational runbook. Knowledge is never a single point of failure.' },
  { title: 'Production-Incident Response Capability', desc: 'TIBCO integration failures can cascade across multiple business systems simultaneously. Our support retainer clients have access to experienced TIBCO engineers for P1 incident response — not a generic helpdesk that escalates after 4 hours. We have resolved TIBCO EMS failover failures, BusinessWorks process hangs, and adapter connection pool exhaustion issues under production pressure.' },
];

const FAQS = [
  { q: 'What is TIBCO BusinessWorks and what does it do?', a: "TIBCO BusinessWorks is an enterprise integration platform (EIP) used to connect disparate business applications, databases, and services through a visual, low-code integration design environment. It supports a wide range of connectors (SAP, Salesforce, Oracle, databases, REST/SOAP, JMS, FTP), transformation logic, error handling, and orchestration of multi-step business processes. BusinessWorks 5.x (BW5) has been widely deployed since the early 2000s; BusinessWorks 6.x (BWCE) runs on Docker and Kubernetes. 1Solutions develops, maintains, and modernises both BW5 and BW6/BWCE environments." },
  { q: 'What is TIBCO EMS and how is it different from ActiveMQ or Kafka?', a: "TIBCO EMS is TIBCO's JMS-compliant messaging middleware providing reliable queuing and publish-subscribe messaging for enterprise systems. EMS offers strong enterprise support and tight TIBCO ecosystem integration, making it popular in financial services and manufacturing. Compared to ActiveMQ, EMS has stronger enterprise certification and TIBCO integration. Compared to Kafka, EMS is a traditional JMS broker for reliable transactional delivery, while Kafka is optimised for high-throughput event streaming." },
  { q: 'Can you migrate from TIBCO BusinessWorks to MuleSoft or Boomi?', a: "Yes. 1Solutions provides TIBCO to MuleSoft, TIBCO to Boomi, and TIBCO to Azure Integration Services migration services. The migration process involves cataloguing existing TIBCO BusinessWorks processes, mapping to equivalent MuleSoft flows or Boomi processes, replicating transformation logic, migrating TIBCO EMS topics/queues, testing functional parity, and cutover planning to minimise production downtime." },
  { q: 'What is TIBCO Cloud Integration and how does it differ from on-premises BusinessWorks?', a: "TIBCO Cloud Integration is TIBCO's cloud-based iPaaS offering — subscription-based, hosted on TIBCO-managed cloud infrastructure, and eliminating infrastructure management overhead. For organisations on TIBCO BW5, BWCE (BusinessWorks Container Edition) provides a containerised runtime on Kubernetes with the same BW development experience but cloud-native deployment. 1Solutions advises on the right modernisation path and implements both BWCE and TIBCO Cloud Integration environments." },
  { q: 'What TIBCO Spotfire services do you provide?', a: "1Solutions provides TIBCO Spotfire implementation and development — connecting Spotfire to enterprise data sources (Oracle, SQL Server, SAP HANA, Snowflake), building interactive dashboards and visualisations, developing custom extensions using the Spotfire API and IronPython, implementing Spotfire Server (Active Directory/SSO), Web Player deployment, data function integration, and Spotfire upgrade and migration services." },
  { q: 'How do you tune TIBCO BusinessWorks performance?', a: "TIBCO BusinessWorks performance tuning covers: engine-level JVM and thread configuration, process-level design review for bottlenecks (subprocess calls, shared variables, synchronous vs async patterns), TIBCO EMS configuration tuning (prefetch counts, flow control, persistent vs non-persistent delivery), adapter connection pool optimisation, and database query performance. 1Solutions conducts BusinessWorks performance assessments for BW5, BW6, and BWCE environments." },
  { q: 'What is TIBCO BPM and what business problems does it solve?', a: "TIBCO BPM is TIBCO's platform for designing, automating, and monitoring business processes involving human tasks, system integrations, and decision logic. It combines BPMN 2.0 process modelling, case management, forms-based human task management, business rules, and real-time analytics. Common use cases: loan approval workflows, insurance claims processing, order-to-cash, procurement approval, HR onboarding, and compliance audit workflows." },
  { q: 'Can you provide ongoing TIBCO administration and support?', a: "Yes. 1Solutions provides ongoing TIBCO administration on a retainer — TIBCO Administrator monitoring, BusinessWorks deployment lifecycle management, EMS queue and topic management, capacity monitoring, incident response for production integration failures, hotfix deployment, version patching, and quarterly health reviews. We also provide L2/L3 support escalation for organisations with internal L1 support teams." },
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
    <div className="tb-stat-col">
      <div className="tb-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="tb-stat-label">{label}</div>
    </div>
  );
}

export default function TibcoDevelopmentServices() {
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
        <title>TIBCO Development Services | BusinessWorks, EMS, BPM, Spotfire | 1Solutions</title>
        <meta name="description" content="Expert TIBCO development services — TIBCO BusinessWorks integration, TIBCO EMS messaging, TIBCO BPM, Spotfire analytics, TIBCO Cloud Integration, TIBCO to MuleSoft/Boomi migration, performance tuning, and TIBCO administration. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/tibco-development-services/" />
        <meta property="og:title" content="TIBCO Development Services | 1Solutions" />
        <meta property="og:description" content="TIBCO BusinessWorks integration, EMS messaging, BPM automation, Spotfire analytics, TIBCO Cloud, TIBCO to MuleSoft migration, performance tuning, and ongoing TIBCO administration." />
        <meta property="og:url" content="https://www.1solutions.biz/tibco-development-services/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .tb-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#fdf2f8 0%,#fce7f3 20%,#f5f3ff 50%,#fef3c7 75%,#f0f9ff 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .tb-page *,.tb-page *::before,.tb-page *::after{box-sizing:border-box}
          .tb-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .tb-orb-1{width:880px;height:880px;background:radial-gradient(circle,rgba(219,39,119,.18) 0%,rgba(236,72,153,.07) 40%,transparent 70%);top:-280px;right:-260px}
          .tb-orb-2{width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px}
          .tb-orb-3{width:550px;height:550px;background:radial-gradient(circle,rgba(147,51,234,.14) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%)}
          .tb-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .tb-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .tb-breadcrumb li{display:flex;align-items:center;gap:6px}
          .tb-breadcrumb li::after{content:'/';opacity:.45}
          .tb-breadcrumb li:last-child::after{display:none}
          .tb-breadcrumb a{color:#0F3460;text-decoration:none}
          .tb-breadcrumb a:hover{text-decoration:underline}
          .tb-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .tb-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .tb-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#db2777 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .tb-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .tb-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .tb-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .tb-badge-dot{width:7px;height:7px;border-radius:50%;background:#db2777;flex-shrink:0}
          .tb-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .tb-btn-primary{display:inline-block;padding:14px 36px;background:#db2777;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(219,39,119,.28)}
          .tb-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .tb-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .tb-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(219,39,119,.5);transform:translateY(-2px)}
          .tb-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .tb-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .tb-stat-col:last-child{border-right:none}
          .tb-stat-val{font-size:28px;font-weight:900;color:#db2777;letter-spacing:-.5px;line-height:1}
          .tb-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .tb-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .tb-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .tb-logos-wrap{width:100%;overflow:hidden}
          .tb-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:tb-marquee 28s linear infinite}
          .tb-logos-track:hover{animation-play-state:paused}
          @keyframes tb-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .tb-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .tb-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .tb-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .tb-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .tb-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .tb-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .tb-s-reveal.tb-revealed{opacity:1;transform:translateY(0)}
          .tb-inner{max-width:1300px;margin:0 auto}
          .tb-svc-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .tb-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .tb-svc-card{background:linear-gradient(135deg,rgba(253,242,248,.50) 0%,rgba(255,255,255,.85) 55%,rgba(245,243,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .tb-svc-card.tb-cv{opacity:1;transform:translateY(0)}
          .tb-svc-card.tb-cv:hover{transform:translateY(-6px);border-color:rgba(219,39,119,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .tb-svc-card.feat{border-color:rgba(219,39,119,.20)}
          .tb-svc-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .tb-svc-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .tb-svc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .tb-svc-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#db2777,#f472b6);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .tb-svc-card.tb-cv:hover::before{transform:scaleY(1)}
          .tb-svc-more{text-align:center;margin-top:22px}
          .tb-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .tb-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .tb-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .tb-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .tb-stack-card{background:linear-gradient(135deg,rgba(253,242,248,.50) 0%,rgba(255,255,255,.85) 55%,rgba(245,243,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .tb-stack-card.tb-sv{opacity:1;transform:translateY(0)}
          .tb-stack-card.tb-sv:hover{border-color:rgba(219,39,119,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .tb-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .tb-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .tb-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .tb-eng-section{padding:80px 40px;position:relative;z-index:1}
          .tb-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .tb-eng-card{background:linear-gradient(135deg,rgba(253,242,248,.50) 0%,rgba(255,255,255,.85) 55%,rgba(245,243,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .tb-eng-card.tb-ev{opacity:1;transform:translateY(0)}
          .tb-eng-card.tb-ev:hover{border-color:rgba(219,39,119,.25);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .tb-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(253,242,248,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .tb-eng-card.feat.tb-ev{transform:translateY(-8px)}
          .tb-eng-card.feat.tb-ev:hover{transform:translateY(-12px)}
          .tb-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .tb-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s}
          .tb-eng-card.tb-ev:hover .tb-eng-icon{background:rgba(219,39,119,.10)}
          .tb-eng-card.feat .tb-eng-icon{background:rgba(217,119,6,.10)}
          .tb-eng-icon svg{fill:#0F3460;transition:fill .2s}
          .tb-eng-card.tb-ev:hover .tb-eng-icon svg{fill:#db2777}
          .tb-eng-card.feat .tb-eng-icon svg{fill:#D97706}
          .tb-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .tb-eng-headline{font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px}
          .tb-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .tb-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .tb-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .tb-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .tb-eng-list li::before{content:'✓';font-weight:800;color:#db2777;flex-shrink:0;margin-top:1px}
          .tb-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .tb-eng-process strong{color:#0F3460}
          .tb-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .tb-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .tb-eng-cta:hover{background:#0F3460;color:#fff}
          .tb-eng-card.feat .tb-eng-cta{background:#db2777;color:#fff;border-color:#db2777}
          .tb-eng-card.feat .tb-eng-cta:hover{background:#0F3460;border-color:#0F3460}
          .tb-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .tb-psteps{display:flex;flex-direction:column;margin-top:52px}
          .tb-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .tb-pstep.tb-pv{opacity:1;transform:translateY(0)}
          .tb-pstep-l{display:flex;flex-direction:column;align-items:center}
          .tb-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s}
          .tb-pstep.tb-pv:hover .tb-pstep-circle{background:rgba(219,39,119,.10);border-color:#db2777;color:#db2777}
          .tb-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .tb-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .tb-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .tb-pstep:last-child .tb-pstep-connector{display:none}
          .tb-pstep-r{padding:4px 0 38px}
          .tb-pstep:last-child .tb-pstep-r{padding-bottom:0}
          .tb-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .tb-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .tb-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .tb-center-head{text-align:center;margin-bottom:48px}
          .tb-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .tb-tcard{background:linear-gradient(135deg,rgba(253,242,248,.50) 0%,rgba(255,255,255,.85) 55%,rgba(245,243,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s}
          .tb-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(253,242,248,.42) 100%);border-color:rgba(217,119,6,.22)}
          .tb-tcard.tb-tv{opacity:1;transform:translateY(0)}
          .tb-tcard.tb-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .tb-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .tb-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .tb-tauthor{display:flex;align-items:center;gap:12px}
          .tb-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .tb-tname{font-size:14px;font-weight:700;color:#0F3460}
          .tb-trole{font-size:12px;color:#6b7280}
          .tb-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .tb-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .tb-wcard{background:linear-gradient(135deg,rgba(253,242,248,.50) 0%,rgba(255,255,255,.85) 55%,rgba(245,243,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .tb-wcard.tb-wv{opacity:1;transform:translateY(0) scale(1)}
          .tb-wcard.tb-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(219,39,119,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .tb-wcard-dot{width:10px;height:10px;border-radius:50%;background:#db2777;margin-bottom:12px}
          .tb-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .tb-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .tb-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(253,242,248,.55) 0%,rgba(255,255,255,.60) 40%,rgba(245,243,255,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .tb-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .tb-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#db2777 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .tb-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .tb-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .tb-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .tb-cbenefit-icon{flex-shrink:0;color:#db2777;font-weight:800;font-size:16px;margin-top:1px}
          .tb-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .tb-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(253,242,248,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .tb-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .tb-form{display:flex;flex-direction:column;gap:13px}
          .tb-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .tb-fg{display:flex;flex-direction:column;gap:5px}
          .tb-fg.full{grid-column:1/-1}
          .tb-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .tb-fg input,.tb-fg textarea,.tb-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .tb-fg input:focus,.tb-fg textarea:focus,.tb-fg select:focus{outline:none;border-color:#db2777;box-shadow:0 0 0 3px rgba(219,39,119,.10)}
          .tb-consent{display:flex;gap:8px;align-items:flex-start}
          .tb-consent input{margin-top:3px;width:15px;height:15px}
          .tb-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .tb-consent a{color:#0F3460}
          .tb-submit{width:100%;padding:14px;background:#db2777;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(219,39,119,.26)}
          .tb-submit:hover{background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28)}
          .tb-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .tb-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .tb-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .tb-faq-list{display:flex;flex-direction:column;gap:10px}
          .tb-fitem{background:linear-gradient(135deg,rgba(253,242,248,.50) 0%,rgba(255,255,255,.85) 55%,rgba(245,243,255,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .tb-fitem.open{border-color:rgba(219,39,119,.30)}
          .tb-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#db2777,#f472b6);border-radius:3px 3px 0 0}
          .tb-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .tb-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .tb-fitem.open .tb-fq-badge{background:#db2777;color:#fff}
          .tb-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .tb-fitem.open .tb-fq span{color:#9d174d}
          .tb-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .tb-fitem.open .tb-fchev{transform:rotate(180deg);color:#db2777}
          .tb-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .tb-fitem.open .tb-fanswer-wrap{max-height:500px}
          .tb-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .tb-related{padding:80px 40px;background:rgba(253,242,248,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .tb-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .tb-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .tb-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .tb-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .tb-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .tb-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .tb-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .tb-rtag-blue{background:rgba(3,105,161,.09);border-color:rgba(3,105,161,.28);color:#0369a1}
          .tb-rtag-pink{background:rgba(219,39,119,.09);border-color:rgba(219,39,119,.28);color:#9d174d}
          .tb-rtag-amber{background:rgba(180,83,9,.09);border-color:rgba(180,83,9,.28);color:#b45309}
          .tb-rtag-violet{background:rgba(124,58,237,.09);border-color:rgba(124,58,237,.28);color:#6D28D9}
          .tb-rtag-green{background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d}
          .tb-rtag-teal{background:rgba(8,145,178,.09);border-color:rgba(8,145,178,.28);color:#0e7490}
          @media(max-width:1024px){.tb-hero h1,.tb-s-title,.tb-faq h2{font-size:36px}.tb-svc-grid{grid-template-columns:repeat(2,1fr)}.tb-stack-grid{grid-template-columns:repeat(2,1fr)}.tb-eng-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.tb-eng-card.feat{transform:none}.tb-eng-card.feat.tb-ev{transform:none}.tb-eng-card.feat.tb-ev:hover{transform:translateY(-4px)}.tb-why-grid{grid-template-columns:repeat(2,1fr)}.tb-tgrid{grid-template-columns:1fr}.tb-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.tb-breadcrumb{padding:12px 20px 0}.tb-hero{padding:28px 20px 20px}.tb-hero h1{font-size:26px;letter-spacing:-.3px}.tb-stats{grid-template-columns:1fr 1fr}.tb-stat-col:nth-child(2){border-right:none}.tb-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.tb-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.tb-logos{padding:16px 20px 28px}.tb-svc-section,.tb-stack-section,.tb-eng-section,.tb-process-section,.tb-testi,.tb-why-section,.tb-faq,.tb-related{padding:52px 20px}.tb-contact{padding:48px 20px}.tb-svc-grid,.tb-stack-grid,.tb-why-grid{grid-template-columns:1fr}.tb-frow{grid-template-columns:1fr}.tb-ctitle{font-size:28px}.tb-s-title{font-size:28px}}
        `}</style>
      </Head>

      <div className="tb-page">
        <div className="tb-orb tb-orb-1" /><div className="tb-orb tb-orb-2" /><div className="tb-orb tb-orb-3" />

        <nav className="tb-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">TIBCO Development Services</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <section className="tb-hero">
          <span className="tb-eyebrow">TIBCO Development Services</span>
          <h1>TIBCO Development — BusinessWorks, EMS, BPM, Spotfire & Migration Services</h1>
          <p className="tb-hero-desc">Expert TIBCO development services — TIBCO BusinessWorks 5.x and BWCE integration, TIBCO EMS messaging architecture, TIBCO BPM business process automation, Spotfire analytics, TIBCO Cloud Integration, TIBCO to MuleSoft/Boomi migration, performance tuning, and dedicated TIBCO engineering teams for enterprises worldwide.</p>
          <div className="tb-trust-row">
            {['TIBCO BusinessWorks 5.x & BWCE','TIBCO EMS & Rendezvous','TIBCO BPM & Spotfire','TIBCO to MuleSoft/Boomi Migration','15+ Years Experience'].map(b => (
              <div className="tb-badge" key={b}><span className="tb-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="tb-ctas">
            <Link href="#contact" className="tb-btn-primary">Discuss Your TIBCO Project</Link>
            <Link href="#engagement" className="tb-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        <div className="tb-stats" ref={statsRef}>
          {[['80+','TIBCO Integrations Built'],['15+','Years Middleware Experience'],['500M+','Messages Processed Daily'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        <div className="tb-logos">
          <span className="tb-logos-label">Trusted by Enterprise Clients Worldwide</span>
          <div className="tb-logos-wrap">
            <div className="tb-logos-track">
              {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="tb-clogo" />
              ))}
            </div>
          </div>
        </div>

        <section className="tb-svc-section" aria-labelledby="tb-svc-heading">
          <div className="tb-inner">
            <div className={`tb-s-reveal${visibleSections.has('svc') ? ' tb-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="tb-s-eyebrow">What We Deliver</span>
              <h2 id="tb-svc-heading" className="tb-s-title">TIBCO Development Services We Provide</h2>
              <p className="tb-s-desc" style={{ maxWidth: 720 }}>From TIBCO BusinessWorks integration development and EMS messaging architecture through TIBCO BPM, Spotfire analytics, TIBCO Cloud Integration, TIBCO to MuleSoft migration, performance tuning, and ongoing TIBCO administration and support.</p>
            </div>
            <div className="tb-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`tb-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' tb-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="tb-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="tb-svc-more">
                <button className="tb-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="stack" className="tb-stack-section" aria-labelledby="tb-stack-heading">
          <div className="tb-inner">
            <div className={`tb-s-reveal${visibleSections.has('stk') ? ' tb-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="tb-s-eyebrow">Technology Coverage</span>
              <h2 id="tb-stack-heading" className="tb-s-title">TIBCO Products & Related Technologies We Work With</h2>
              <p className="tb-s-desc" style={{ maxWidth: 680 }}>TIBCO BusinessWorks 5.x and BWCE, TIBCO EMS and Rendezvous, TIBCO BPM, TIBCO Spotfire, TIBCO Mashery, TIBCO Cloud Integration, and the full ecosystem of TIBCO adapters — SAP, Oracle, Salesforce, REST/SOAP, JDBC, FTP/SFTP, and more.</p>
            </div>
            <div className="tb-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`tb-stack-card${visibleStackCards.includes(i) ? ' tb-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="tb-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="tb-stack-pills">
                    {grp.items.map(item => <span key={item} className="tb-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="engagement" className="tb-eng-section" aria-labelledby="tb-eng-heading">
          <div className="tb-inner">
            <div className={`tb-s-reveal${visibleSections.has('eng') ? ' tb-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="tb-s-eyebrow">How We Work</span>
              <h2 id="tb-eng-heading" className="tb-s-title">TIBCO Engagement Models</h2>
              <p className="tb-s-desc" style={{ maxWidth: 680 }}>Hire a dedicated TIBCO team for ongoing integration development, engage on a fixed-scope TIBCO project, or take a monthly support retainer for ongoing TIBCO administration and incident response.</p>
            </div>
            <div className="tb-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`tb-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' tb-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="tb-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="tb-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div>
                  <div className="tb-eng-name">{m.name}</div>
                  <div className="tb-eng-headline">{m.headline}</div>
                  <div className="tb-eng-desc">{m.desc}</div>
                  <div className="tb-eng-list-label">Best for</div>
                  <ul className="tb-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                  <div className="tb-eng-process"><strong>Process:</strong> {m.process}<br /><span className="tb-eng-timeline">{m.timeline}</span></div>
                  <Link href="#contact" className="tb-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tb-process-section" aria-labelledby="tb-proc-heading">
          <div className="tb-inner" style={{ maxWidth: 760 }}>
            <div className={`tb-s-reveal${visibleSections.has('proc') ? ' tb-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="tb-s-eyebrow">How We Deliver</span>
              <h2 id="tb-proc-heading" className="tb-s-title">Our TIBCO Delivery Process</h2>
              <p className="tb-s-desc">From TIBCO landscape discovery and integration catalogue through architecture design, BusinessWorks development, EMS configuration, end-to-end integration testing, and production deployment with monitoring and knowledge transfer.</p>
            </div>
            <div className="tb-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`tb-pstep${visibleSections.has('proc') ? ' tb-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="tb-pstep-l">
                    <div className="tb-pstep-circle">{step.num}</div>
                    <div className="tb-pstep-connector" />
                  </div>
                  <div className="tb-pstep-r">
                    <div className="tb-pstep-title">{step.title}</div>
                    <p className="tb-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tb-testi" aria-labelledby="tb-ts-heading">
          <div className="tb-inner">
            <div className={`tb-center-head tb-s-reveal${visibleSections.has('ts') ? ' tb-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="tb-s-eyebrow">Client Results</span>
              <h2 id="tb-ts-heading" className="tb-s-title">What Our TIBCO Clients Say</h2>
              <p className="tb-s-desc">Enterprise clients across the US, UK, and Australia trust 1Solutions for TIBCO BusinessWorks development, TIBCO migrations, and ongoing TIBCO platform management — at offshore rates with enterprise-grade delivery standards.</p>
            </div>
            <div className="tb-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`tb-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' tb-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review">
                  <div className="tb-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="tb-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="tb-tauthor">
                    <div className="tb-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div><div className="tb-tname" itemProp="author">{t.name}</div><div className="tb-trole">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tb-why-section" aria-labelledby="tb-wy-heading">
          <div className="tb-inner">
            <div className={`tb-s-reveal${visibleSections.has('wy') ? ' tb-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="tb-s-eyebrow">Why 1Solutions</span>
              <h2 id="tb-wy-heading" className="tb-s-title">Why Choose 1Solutions for TIBCO Development</h2>
              <p className="tb-s-desc" style={{ maxWidth: 680 }}>15+ years of enterprise middleware experience, full TIBCO ecosystem coverage, migration specialists for TIBCO to MuleSoft and Boomi, BWCE containerisation expertise, deep SAP/Oracle/Salesforce adapter knowledge, and offshore rates with enterprise-grade delivery.</p>
            </div>
            <div className="tb-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`tb-wcard${visibleWhyCards.includes(i) ? ' tb-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="tb-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="tb-contact" aria-labelledby="tb-contact-heading">
          <div className="tb-contact-grid">
            <div>
              <h2 id="tb-contact-heading" className="tb-ctitle">Discuss Your TIBCO Project</h2>
              <p className="tb-cdesc">Tell us about your TIBCO environment and requirements, and we will schedule a free discovery call with a senior TIBCO engineer. Whether you need new BusinessWorks integrations, TIBCO EMS design and tuning, a BWCE containerisation, a TIBCO-to-MuleSoft migration, Spotfire dashboards, or ongoing TIBCO support — we will scope your engagement and provide a quote within 24 hours.</p>
              <div className="tb-cbenefits">
                {[['✓','Free discovery call with a senior TIBCO BusinessWorks engineer'],['✓','TIBCO landscape review and integration catalogue assessment'],['✓','BW5, BW6/BWCE, EMS, BPM, Spotfire, and Mashery expertise under one roof'],['✓','TIBCO to MuleSoft, Boomi, and Azure migration specialists'],['✓','Response within 24 business hours from our TIBCO engineering team']].map(([icon, text]) => (
                  <div className="tb-cbenefit" key={text}><span className="tb-cbenefit-icon">{icon}</span><p>{text}</p></div>
                ))}
              </div>
            </div>
            <div className="tb-form-box">
              <h3>Tell Us About Your TIBCO Requirements</h3>
              <form className="tb-form" onSubmit={e => e.preventDefault()}>
                <div className="tb-frow">
                  <div className="tb-fg"><label htmlFor="tb-name">Full Name *</label><input id="tb-name" type="text" placeholder="Your name" required /></div>
                  <div className="tb-fg"><label htmlFor="tb-email">Work Email *</label><input id="tb-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="tb-frow">
                  <div className="tb-fg"><label htmlFor="tb-company">Company / Organisation</label><input id="tb-company" type="text" placeholder="Your company name" /></div>
                  <div className="tb-fg"><label htmlFor="tb-phone">Phone / WhatsApp</label><input id="tb-phone" type="tel" placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="tb-fg full">
                  <label htmlFor="tb-type">TIBCO Service Required *</label>
                  <select id="tb-type" required>
                    <option value="">Select TIBCO service...</option>
                    <option>TIBCO BusinessWorks Integration Development (BW5)</option>
                    <option>TIBCO BusinessWorks Container Edition (BWCE / BW6)</option>
                    <option>TIBCO EMS Design &amp; Configuration</option>
                    <option>TIBCO BPM / Business Process Automation</option>
                    <option>TIBCO Spotfire Analytics</option>
                    <option>TIBCO Cloud Integration</option>
                    <option>TIBCO Mashery / API Management</option>
                    <option>TIBCO to MuleSoft Migration</option>
                    <option>TIBCO to Boomi / Azure Migration</option>
                    <option>TIBCO BW5 to BW6/BWCE Migration</option>
                    <option>TIBCO Performance Tuning</option>
                    <option>TIBCO Administration &amp; Support Retainer</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="tb-fg full">
                  <label htmlFor="tb-bw-version">Current TIBCO BusinessWorks Version</label>
                  <select id="tb-bw-version">
                    <option value="">Select version (if applicable)...</option>
                    <option>TIBCO BusinessWorks 5.x (BW5)</option>
                    <option>TIBCO BusinessWorks 6.x / BWCE</option>
                    <option>Both BW5 and BWCE</option>
                    <option>TIBCO Cloud Integration</option>
                    <option>New to TIBCO / Greenfield</option>
                    <option>Not sure</option>
                  </select>
                </div>
                <div className="tb-fg full">
                  <label htmlFor="tb-msg">Project Brief &amp; Current Situation *</label>
                  <textarea id="tb-msg" rows={4} placeholder="Describe your TIBCO environment, integrations, systems connected (SAP, Oracle, Salesforce etc.), what you need to build or fix, migration plans, or support requirements..." required />
                </div>
                <div className="tb-consent">
                  <input id="tb-consent" type="checkbox" required />
                  <label htmlFor="tb-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. All details are treated confidentially.</label>
                </div>
                <button type="submit" className="tb-submit">Get Free TIBCO Consultation →</button>
              </form>
            </div>
          </div>
        </section>

        <section className="tb-faq" aria-labelledby="tb-faq-heading">
          <div className="tb-inner" style={{ maxWidth: 860 }}>
            <span className="tb-s-eyebrow">FAQ</span>
            <h2 id="tb-faq-heading">TIBCO Development — Frequently Asked Questions</h2>
            <p className="tb-faq-sub">Common questions about TIBCO development services — BusinessWorks, EMS, BPM, Spotfire, TIBCO Cloud, migration from TIBCO to MuleSoft/Boomi, performance tuning, and administration.</p>
            <div className="tb-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`tb-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="tb-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="tb-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="tb-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="tb-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="tb-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tb-related">
          <div className="tb-related-inner">
            <span className="tb-s-eyebrow">Explore More</span>
            <h2>Related Enterprise Integration & Middleware Services</h2>
            <p className="tb-related-sub">We also provide MuleSoft, Boomi, SAP, and enterprise application integration services for businesses worldwide.</p>
            <hr />
            <div className="tb-rtags">
              {[['/mulesoft-development-services/','MuleSoft Development','tb-rtag-blue'],['/boomi-development-services/','Boomi Integration','tb-rtag-teal'],['/sap-development-company/','SAP Development','tb-rtag-blue'],['/erp-development-company/','ERP Development','tb-rtag-amber'],['/crm-development-company/','CRM Development','tb-rtag-teal'],['/devops-services-company/','DevOps Services','tb-rtag-amber'],['/cloud-migration-services/','Cloud Migration','tb-rtag-blue'],['/cloud-native-services/','Cloud Native Development','tb-rtag-violet'],['/nodejs-development-company/','Node.js Development','tb-rtag-green'],['/software-development-company/','Software Development','tb-rtag-pink']].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`tb-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
