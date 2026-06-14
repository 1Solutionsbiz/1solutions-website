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
        { '@type': 'ListItem', position: 2, name: 'Cloud Native Services', item: 'https://www.1solutions.biz/cloud-native-services/' },
      ],
    },
    {
      '@type': 'Service',
      name: 'Cloud Native Services',
      url: 'https://www.1solutions.biz/cloud-native-services/',
      description: 'Expert cloud native development services — cloud native architecture design, microservices development, Kubernetes containerisation, serverless applications, service mesh, event-driven architecture, cloud native security, API gateway management, cloud native CI/CD, and cloud native consulting for businesses worldwide.',
      provider: {
        '@type': 'Organization',
        name: '1Solutions',
        url: 'https://www.1solutions.biz',
        logo: { '@type': 'ImageObject', url: 'https://www.1solutions.biz/images/1solutions-logo.png' },
        foundingDate: '2008',
        areaServed: ['US', 'GB', 'AU', 'CA', 'IN'],
      },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '68', bestRating: '5' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What does "cloud native" mean?', acceptedAnswer: { '@type': 'Answer', text: "Cloud native refers to applications that are designed and built to run in cloud environments from the ground up — rather than traditional applications originally built for on-premises servers that have been moved to cloud (lift and shift). The Cloud Native Computing Foundation (CNCF) defines cloud native as using containers, microservices, declarative APIs, immutable infrastructure, and dynamic orchestration (Kubernetes). Key characteristics: the application is packaged in containers (not VMs); it is broken into small, independently deployable microservices (not a monolith); it is managed by an orchestrator (Kubernetes); it is configured declaratively (infrastructure as code); it scales automatically based on demand; and it is deployed via automated CI/CD pipelines. Cloud native applications are designed for reliability, scalability, and operational efficiency in cloud — not adapted for it." } },
        { '@type': 'Question', name: 'What is the difference between cloud native and cloud migration?', acceptedAnswer: { '@type': 'Answer', text: "Cloud migration is the process of moving existing applications from on-premises infrastructure to cloud — it may involve minimal code changes (lift and shift/rehost) or moderate rework (re-platforming). The resulting application still follows its original architecture, just hosted in cloud instead of on-premises servers. Cloud native development is building new applications (or fundamentally re-architecting existing ones) using patterns that exploit cloud capabilities — microservices, containers, Kubernetes, serverless, event-driven architecture, and managed cloud services. A cloud migration gets you to cloud; cloud native development gets you the full operational and scalability benefits of cloud. Most mature cloud journeys involve both: migrate first, then gradually re-architect to cloud native over subsequent quarters." } },
        { '@type': 'Question', name: 'When should I use microservices vs a monolith?', acceptedAnswer: { '@type': 'Answer', text: "The honest answer is: start with a monolith unless you have a clear reason not to. Microservices introduce significant operational complexity — multiple deployable units, distributed tracing across service boundaries, network latency between services, distributed transactions, and a much larger Kubernetes and DevOps footprint. A well-structured monolith deployed on containers (a modular monolith) is easier to develop, test, debug, and operate — and can scale vertically or be horizontally sharded if needed. Microservices become the right choice when: you have multiple teams that cannot coordinate releases without blocking each other (Conway's Law justification); specific components have dramatically different scaling requirements (the recommendation engine needs 100x the CPU of the checkout service); or specific components have different compliance boundaries (payment processing isolated from the rest of the application). We advise clients on when microservices genuinely help vs when they add complexity without proportional benefit." } },
        { '@type': 'Question', name: 'What is serverless and when does it make sense?', acceptedAnswer: { '@type': 'Answer', text: "Serverless (AWS Lambda, Azure Functions, Google Cloud Functions) means running code without managing servers — you deploy a function, the cloud provider handles provisioning, scaling, and patching. You pay per invocation (not for idle capacity). Serverless makes sense for: event-driven workloads triggered by HTTP requests, S3 events, SQS messages, or scheduled cron jobs; workloads with highly variable traffic (scales from zero to thousands of concurrent invocations automatically); background processing tasks (image resizing, PDF generation, email sending); and API backends where per-request pricing is cheaper than reserved capacity. Serverless is less suitable for: long-running compute tasks (Lambda has a 15-minute maximum); applications that maintain in-memory state between invocations; or workloads with predictable, high-volume steady-state traffic where reserved EC2/ECS capacity is cheaper. We design serverless architectures where they genuinely reduce cost and operational overhead — and recommend containers or managed compute where serverless is the wrong fit." } },
        { '@type': 'Question', name: 'What is a service mesh and do I need one?', acceptedAnswer: { '@type': 'Answer', text: "A service mesh (Istio, Linkerd, AWS App Mesh) is an infrastructure layer that manages service-to-service communication in a microservices architecture — providing mTLS encryption between services, traffic routing and load balancing, circuit breakers, retries, rate limiting, observability (metrics, traces, and logs per service), and canary and blue-green deployment traffic splitting. You need a service mesh when: you have many microservices (10+) and need consistent observability and security across all service-to-service communication; you need mTLS for compliance (zero-trust networking); or you need sophisticated traffic management (canary deployments, A/B testing at the network level). You do not need a service mesh for a small number of services — the operational overhead (Istio in particular is complex to operate) outweighs the benefit. We implement Istio and Linkerd service meshes when the architecture justifies the investment, and steer clients away from premature service mesh adoption." } },
        { '@type': 'Question', name: 'What is event-driven architecture and what are its benefits?', acceptedAnswer: { '@type': 'Answer', text: "Event-driven architecture (EDA) is a software design pattern where components communicate by producing and consuming events through a message broker (Apache Kafka, AWS SNS/SQS, Azure Service Bus, RabbitMQ, Google Pub/Sub) rather than through direct synchronous API calls. Key benefits: loose coupling — services do not depend on each other being available at the moment a request is made; scalability — consumers can be independently scaled based on event queue depth; resilience — events are persisted in the broker and can be reprocessed if a consumer fails; and audit trail — the event stream provides a complete record of what happened and when. EDA is particularly valuable for: asynchronous business processes (order processing, notification delivery, payment reconciliation), real-time data pipelines, multi-system integration without tight coupling, and event sourcing patterns. We design and implement event-driven architectures on Kafka, AWS SQS/SNS/EventBridge, and Azure Service Bus." } },
        { '@type': 'Question', name: 'How do you approach cloud native security?', acceptedAnswer: { '@type': 'Answer', text: "Cloud native security operates across multiple layers — we implement security at all of them. Container image security: minimal base images (distroless or Alpine), no root processes, Trivy image scanning in CI/CD, signed images with Cosign. Kubernetes security: RBAC with least-privilege service accounts, Pod Security Standards (restrict profile), NetworkPolicies to limit pod-to-pod communication, OPA/Gatekeeper admission control for policy enforcement, and runtime security with Falco for detecting anomalous container behaviour. Application security: SAST and SCA in CI/CD, DAST against staging environments, secrets managed via HashiCorp Vault or cloud secrets manager (never in environment variables or ConfigMaps). Network security: mTLS between services (Istio), private subnets for workloads, WAF for public-facing APIs, VPC/network segmentation, and AWS Security Hub/Azure Defender for cloud security posture management." } },
        { '@type': 'Question', name: 'How long does it take to build a cloud native application?', acceptedAnswer: { '@type': 'Answer', text: "A cloud native greenfield SaaS application — microservices or modular monolith on Kubernetes, with CI/CD, monitoring, and authentication — typically takes 12–20 weeks for an MVP. Re-architecting an existing monolith to cloud native using the Strangler Fig pattern (gradually extracting microservices) takes 6–18 months depending on monolith size and team velocity. A cloud native data platform on Kafka with stream processing takes 8–16 weeks for an initial pipeline. A serverless API backend on AWS Lambda with API Gateway takes 4–8 weeks. We provide detailed timelines in the technical discovery and architecture phase before any development begins." } },
      ],
    },
  ],
};

const SERVICES = [
  { n: '01', title: 'Cloud Native Architecture Design & Review', desc: 'Cloud native architecture design for greenfield applications and re-architecture of existing monoliths — service decomposition strategy, data store per service pattern, event-driven vs synchronous communication design, Kubernetes workload design (Deployments, StatefulSets, Jobs, CronJobs), resilience patterns (circuit breakers, retries, bulkheads), and ADR (Architecture Decision Records) for all major design choices.' },
  { n: '02', title: 'Microservices Development', desc: 'Microservices design and development — service decomposition using Domain-Driven Design (DDD) bounded contexts, RESTful and gRPC service APIs, synchronous inter-service communication with timeouts and retries, shared libraries without tight coupling, containerised deployment, independent CI/CD pipelines per service, distributed tracing (Jaeger/Zipkin), and log correlation across service boundaries.', feat: true },
  { n: '03', title: 'Kubernetes Containerisation & Orchestration', desc: 'End-to-end Kubernetes workload design and deployment — Dockerfiles (multi-stage builds, distroless base images), Helm chart development, Kubernetes Deployments and StatefulSets, ConfigMaps and Secrets management (with Vault Agent Injector), HPA and VPA autoscaling, KEDA event-driven autoscaling, PodDisruptionBudgets, resource requests and limits, and liveness/readiness/startup probes.' },
  { n: '04', title: 'Serverless Application Development', desc: 'Serverless architecture design and implementation — AWS Lambda, Azure Functions, and Google Cloud Functions for event-driven workloads, Step Functions and Durable Functions for serverless orchestration, API Gateway integration, SQS/SNS/EventBridge event sources, cold start optimisation, Lambda Layers for shared dependencies, function sizing and timeout optimisation, and local development with SAM CLI or Azure Functions Core Tools.' },
  { n: '05', title: 'Event-Driven Architecture & Apache Kafka', desc: 'Event-driven system design and implementation — Apache Kafka topic design and partition strategy, Kafka Streams for real-time stream processing, Kafka Connect for source and sink connectors, AWS SNS/SQS/EventBridge event routing, Azure Service Bus and Event Hubs, event sourcing and CQRS patterns, schema registry for event contracts (Confluent Schema Registry or AWS Glue), and dead letter queue handling.' },
  { n: '06', title: 'Service Mesh (Istio & Linkerd)', desc: 'Service mesh implementation for mature microservices environments — Istio installation and configuration (sidecar injection, mTLS mesh-wide encryption, Envoy proxy configuration), Linkerd as a lightweight alternative, traffic management (VirtualService, DestinationRule for canary and blue-green), circuit breaking, fault injection for chaos testing, Kiali visualisation, and service mesh observability integration with Prometheus and Grafana.' },
  { n: '07', title: 'Cloud Native CI/CD & GitOps', desc: 'Cloud native CI/CD pipeline design — GitHub Actions or GitLab CI with container build stages, automated security scanning (Trivy, Snyk, Semgrep), Helm chart deployment, and progressive delivery with Flagger (canary deployments with automated rollback based on Prometheus metrics). GitOps with ArgoCD — Git as the single source of truth for all Kubernetes workload state, automated sync, and multi-cluster delivery.' },
  { n: '08', title: 'Cloud Native Observability', desc: 'Full-stack observability for cloud native applications — distributed tracing with Jaeger or OpenTelemetry SDK, Prometheus metrics with Kubernetes service monitors, Grafana dashboards per service and business metric, centralised logging with Loki or ELK Stack, alerting on SLO burn rate rather than raw thresholds, Kubernetes event monitoring, and application performance monitoring with Datadog or New Relic.' },
  { n: '09', title: 'Cloud Native Security (DevSecOps)', desc: 'Security integrated across the full cloud native stack — container image scanning with Trivy in CI/CD, signed images with Cosign, Kubernetes RBAC least-privilege, Pod Security Standards (restrict profile), NetworkPolicies, OPA/Gatekeeper admission controller, runtime security with Falco, secrets management with HashiCorp Vault or AWS Secrets Manager, and mTLS with Istio service mesh.' },
  { n: '10', title: 'Cloud Native Consulting & Legacy Modernisation', desc: 'Independent cloud native assessment of existing applications — architecture review (is this a good candidate for microservices?), Strangler Fig pattern planning for incremental monolith decomposition, Kubernetes readiness assessment, DevOps maturity review, cloud native maturity roadmap, and hands-on technical leadership to guide your engineering team through the cloud native adoption journey.' },
];

const TECH_STACK = [
  { group: 'Container Runtime & Orchestration', color: '#9333ea', items: ['Docker', 'Kubernetes (EKS/AKS/GKE)', 'Helm', 'Kustomize', 'Karpenter', 'KEDA'] },
  { group: 'Service Mesh & Networking', color: '#7c3aed', items: ['Istio', 'Linkerd', 'Envoy Proxy', 'AWS App Mesh', 'Nginx Ingress', 'Cilium'] },
  { group: 'Serverless', color: '#D97706', items: ['AWS Lambda', 'Azure Functions', 'Google Cloud Functions', 'AWS Step Functions', 'API Gateway', 'SAM / Serverless Framework'] },
  { group: 'Event Streaming & Messaging', color: '#0891b2', items: ['Apache Kafka', 'Kafka Streams', 'AWS SQS / SNS', 'Azure Service Bus', 'Google Pub/Sub', 'RabbitMQ'] },
  { group: 'CI/CD & GitOps', color: '#b45309', items: ['GitHub Actions', 'GitLab CI', 'ArgoCD', 'Flux CD', 'Flagger (canary)', 'Tekton'] },
  { group: 'Observability', color: '#059669', items: ['Prometheus', 'Grafana', 'Jaeger / OpenTelemetry', 'Loki', 'Datadog', 'AWS CloudWatch / X-Ray'] },
  { group: 'Security & Policy', color: '#dc2626', items: ['HashiCorp Vault', 'OPA / Gatekeeper', 'Falco', 'Trivy', 'Cosign (image signing)', 'Kyverno'] },
  { group: 'Languages & Frameworks', color: '#0369a1', items: ['Go', 'Node.js / TypeScript', 'Python (FastAPI / Django)', 'Java / Spring Boot', 'Rust', '.NET Core / C#'] },
];

const ENGAGEMENT_MODELS = [
  {
    id: 'dedicated',
    name: 'Dedicated Cloud Native Team',
    badge: 'Most Popular',
    badgeColor: '#D97706',
    feat: true,
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    headline: 'A dedicated cloud native engineering team for your product.',
    desc: 'Full-time cloud native engineers — backend microservices developers, Kubernetes/DevOps engineers, and optionally a cloud native architect — working as a natural extension of your product team. They own the cloud native architecture alongside you, join your sprints, commit to your repos, and build the platform iteratively.',
    bestFor: ['SaaS products being re-architected from monolith to microservices', 'Greenfield cloud native platforms being built from scratch', 'Engineering teams that need cloud native expertise they do not have internally', 'Series A/B startups building for scale from the beginning'],
    process: 'Architecture design → Team assembly → Sprint-based delivery → Ongoing platform evolution',
    timeline: 'Team available within 5–7 business days',
  },
  {
    id: 'fixed',
    name: 'Fixed-Scope Cloud Native Project',
    badge: 'Defined outcome',
    badgeColor: '#9333ea',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    headline: 'A fixed-scope cloud native build or modernisation project.',
    desc: 'A well-defined cloud native engagement — containerising an existing application, building a specific microservice, implementing a Kafka event pipeline, setting up a service mesh, or building a serverless API. Scoped, priced, and delivered with a fixed timeline.',
    bestFor: ['Containerising and Kubernetes-deploying an existing application', 'Building a specific microservice or serverless component', 'Implementing an Apache Kafka event streaming pipeline', 'Cloud native security hardening (Kubernetes RBAC, OPA, Vault)'],
    process: 'Architecture review → Fixed scope definition → Development → Deployment → Handover',
    timeline: 'Typical 4–16 week engagements',
  },
  {
    id: 'advisory',
    name: 'Cloud Native Consulting & Advisory',
    badge: 'Strategic guidance',
    badgeColor: '#0369a1',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z',
    headline: 'Cloud native architecture advisory and hands-on technical leadership.',
    desc: 'Strategic cloud native architecture consulting — architecture review of your current application and infrastructure, cloud native maturity roadmap, microservices decomposition strategy, Kubernetes platform design, hands-on technical leadership embedded with your team, and training for your engineers on cloud native patterns.',
    bestFor: ['CTOs planning a cloud native modernisation programme', 'Engineering teams lacking cloud native architecture experience', 'Independent review of existing cloud native architecture', 'Kubernetes platform design and internal developer platform planning'],
    process: 'Architecture assessment → Roadmap → Advisory sessions → Technical leadership',
    timeline: 'Monthly retainer or fixed-term engagement',
  },
];

const PROCESS_STEPS = [
  { num: '01', title: 'Cloud Native Readiness Assessment & Architecture Design', desc: 'We begin with an architectural assessment of your current application — monolith or existing services, data model, dependencies, traffic patterns, team structure, and operational maturity. We produce a cloud native architecture proposal covering: service decomposition map (bounded contexts), data store strategy (database per service), communication patterns (synchronous REST/gRPC vs event-driven), Kubernetes workload design, observability strategy, and a phased delivery roadmap. All decisions are documented in Architecture Decision Records.' },
  { num: '02', title: 'Platform Engineering — Kubernetes Foundation', desc: 'Before application microservices are developed, we establish the Kubernetes platform — cluster provisioning on EKS/AKS/GKE (or on-premises), cluster hardening (RBAC, Pod Security Standards, NetworkPolicies, OPA/Gatekeeper), Helm chart library, ArgoCD GitOps setup, Prometheus+Grafana observability stack, Loki log aggregation, service mesh (if warranted), and developer tooling (local Kubernetes with Minikube or Kind, Skaffold for inner loop development).' },
  { num: '03', title: 'Microservice Development — API-First', desc: 'Each microservice is developed API-first (OpenAPI specification or protobuf for gRPC) before implementation. We implement the service in Go, Node.js, Python, Java, or .NET depending on your team preferences and use case, write unit and integration tests, containerise with a multi-stage Dockerfile, write a Helm chart, configure health check endpoints, add distributed tracing with OpenTelemetry, and implement structured logging (JSON to stdout — consumed by Loki or ELK).' },
  { num: '04', title: 'Event-Driven Integration (Kafka / SQS)', desc: 'For event-driven components, we design the event contract (Avro or JSON schema registered in Schema Registry), implement Kafka producers and consumers (Kafka Streams for stateful processing, or Kafka Connect for source/sink connectors), configure topic partitioning and retention, implement consumer group management, dead letter queue handling, and idempotency at the consumer level. AWS SNS/SQS or Azure Service Bus for simpler event routing needs.' },
  { num: '05', title: 'Cloud Native CI/CD & Progressive Delivery', desc: 'Full CI/CD pipeline per microservice — GitHub Actions or GitLab CI with Trivy container scanning, Snyk SCA, unit test gate, Docker build and push to ECR/ACR, Helm chart deployment to dev via ArgoCD, integration test suite against dev, and promotion to staging and production via GitOps pull request. Flagger for canary deployments with automatic rollback if Prometheus SLOs are breached. Zero-downtime deployments on every merge.' },
  { num: '06', title: 'Observability, SLOs & Production Readiness', desc: 'Production readiness review before each service goes live — SLI and SLO definition (latency p99, error rate, availability targets), Prometheus alert rules on SLO burn rate, Grafana dashboards per service and business domain, distributed traces configured end-to-end, PagerDuty alert routing, runbook for each alert, production readiness checklist (health checks, graceful shutdown, zero-downtime deployment tested, load test at 2x expected peak traffic), and DR failover test.' },
];

const TESTIMONIALS = [
  {
    text: "1Solutions designed and built our cloud native platform from scratch — microservices on Kubernetes EKS, Kafka for event streaming between services, ArgoCD for GitOps deployment, and Istio for mTLS between services. Six months after launch we scaled from 50K to 2M daily active users with zero architecture changes. The platform they built scaled horizontally exactly as designed. We could not have done this with our internal team alone.",
    name: 'Marcus L.', role: 'CTO, Consumer SaaS Platform (UK)', init: 'ML', bg: '#0F3460',
  },
  {
    text: "We had a 8-year-old Python monolith that was hitting performance limits and blocking our team velocity — 4 backend engineers could not ship independently because everything was coupled. 1Solutions designed a Strangler Fig decomposition strategy, built the first 3 microservices (auth, notifications, billing) in 6 months, and established the Kubernetes platform and CI/CD tooling. Our deployment frequency went from once a fortnight to 30+ times per day.",
    name: 'Anisha T.', role: 'VP Engineering, B2B SaaS (AU)', init: 'AT', bg: '#1a0533', feat: true,
  },
  {
    text: "1Solutions built our real-time data pipeline on Apache Kafka — ingesting events from 12 source systems, processing them with Kafka Streams, and materialising views for our analytics dashboard. Processing 4 million events per hour with under 200ms end-to-end latency. The Kafka architecture they designed is rock solid. In 18 months of production, we have not had a single data loss incident.",
    name: 'Rachel K.', role: 'Head of Data Engineering, Fintech (US)', init: 'RK', bg: '#1e3a5f',
  },
];

const WHY_CARDS = [
  { title: '15+ Years Distributed Systems Experience', desc: 'We have been designing and building distributed systems since before Kubernetes existed — from message-queue-based SOA architectures through container-based microservices to modern cloud native platforms. We have learned the failure modes of distributed systems the hard way and design cloud native architectures that are genuinely resilient, not just architecturally correct on paper.' },
  { title: 'CNCF Ecosystem Specialists', desc: "We work deeply in the Cloud Native Computing Foundation (CNCF) ecosystem — Kubernetes, Prometheus, Grafana, Jaeger, Envoy, ArgoCD, Flagger, OPA, Falco, Helm, and more. We track CNCF project maturity and only recommend production-ready projects for production workloads. We don't chase shiny new CNCF projects — we build on proven foundations." },
  { title: 'Microservices When They Make Sense, Monolith When They Do Not', desc: 'We do not sell microservices as the answer to every problem. A well-structured modular monolith deployed on Kubernetes is often the right starting point for early-stage products. We recommend microservices decomposition when team scaling, independent deployment, or compliance isolation genuinely justify the additional complexity — and we say so clearly when they do not.' },
  { title: 'Event-Driven Architecture Depth', desc: 'Kafka is not a simple queue — it requires careful topic partitioning strategy, consumer group design, schema management, and idempotency handling to work correctly at scale. We have designed and operated Kafka clusters processing hundreds of millions of events per day, and we bring that depth of experience to your event-driven architecture design.' },
  { title: 'Security Designed In, Not Added On', desc: 'Cloud native security is an architectural decision, not a feature added after launch. We implement zero-trust networking (mTLS with Istio), Kubernetes RBAC and Pod Security Standards, OPA/Gatekeeper admission control, runtime security with Falco, and image signing with Cosign from day one. Security posture is reviewed at each milestone, not at the end of the project.' },
  { title: 'GitOps From the Start', desc: 'GitOps (ArgoCD/Flux) is not an afterthought — it is how we deploy everything. Git is the single source of truth for all Kubernetes workload state from the first sprint. No kubectl apply from a laptop in production, ever. Every deployment is a pull request, reviewed, merged, and automatically applied. Rollback is a git revert. Drift is detected and corrected automatically.' },
  { title: 'Observable by Design', desc: 'Observability is not added to cloud native applications after they go live — it is a first-class engineering concern from service design. Every service we build emits structured logs (JSON to stdout), exposes Prometheus metrics via /metrics, and instruments distributed traces with OpenTelemetry. SLIs and SLOs are defined before go-live, not after the first incident.' },
  { title: 'Kubernetes Experts — Platform and Application Layer', desc: 'We know Kubernetes at both the platform level (cluster provisioning, hardening, networking, storage, autoscaling, multi-tenancy) and the application level (workload design, health probes, rolling deployments, PodDisruptionBudgets, resource management). When your Kubernetes cluster or workload has a problem in production, we diagnose and fix it — not escalate to a generic cloud support ticket.' },
];

const FAQS = [
  { q: 'What does "cloud native" mean?', a: "Cloud native refers to applications designed to run in cloud environments from the ground up — using containers, microservices, declarative APIs, immutable infrastructure, and dynamic orchestration (Kubernetes). Key characteristics: containerised workloads, independently deployable microservices, Kubernetes orchestration, declarative IaC configuration, automatic scaling, and automated CI/CD deployment. Cloud native applications exploit cloud capabilities by design, rather than being adapted for cloud from on-premises origins." },
  { q: 'What is the difference between cloud native and cloud migration?', a: "Cloud migration moves existing applications to cloud — with minimal code changes (lift and shift) or moderate rework (re-platforming). Cloud native development builds new applications (or fundamentally re-architects existing ones) using cloud-specific patterns: microservices, containers, Kubernetes, serverless, and event-driven architecture. Migration gets you to cloud; cloud native gets you the full scalability and operational benefits of cloud." },
  { q: 'When should I use microservices vs a monolith?', a: "Start with a modular monolith unless you have clear reasons not to. Microservices introduce significant complexity — distributed tracing, network latency between services, distributed transactions, and a much larger Kubernetes footprint. Microservices are the right choice when multiple teams cannot coordinate releases without blocking each other, when components have dramatically different scaling requirements, or when compliance boundaries require service isolation. We advise when microservices genuinely help vs when they add complexity without proportional benefit." },
  { q: 'What is serverless and when does it make sense?', a: "Serverless (AWS Lambda, Azure Functions, GCF) runs code without managing servers — the cloud provider handles provisioning, scaling, and patching; you pay per invocation. Serverless suits: event-driven workloads with variable traffic, background processing tasks, and API backends. It is less suitable for long-running compute, in-memory state between invocations, or high-volume steady-state workloads where reserved capacity is cheaper." },
  { q: 'What is a service mesh and do I need one?', a: "A service mesh (Istio, Linkerd) manages service-to-service communication in microservices — providing mTLS encryption, traffic routing, circuit breakers, retries, and observability per service. You need it when you have 10+ microservices requiring consistent security and observability, mTLS for zero-trust compliance, or sophisticated traffic management (canary deployments). For smaller service counts, the operational overhead of a service mesh outweighs the benefit." },
  { q: 'What is event-driven architecture and what are its benefits?', a: "Event-driven architecture (EDA) uses a message broker (Kafka, AWS SQS/SNS, Azure Service Bus) instead of direct synchronous API calls — services produce and consume events asynchronously. Benefits: loose coupling (services do not depend on each other being available), independent scalability, resilience (events are persisted and reprocessable), and a complete audit trail. EDA suits asynchronous business processes, real-time data pipelines, and multi-system integration." },
  { q: 'How do you approach cloud native security?', a: "Cloud native security spans multiple layers: container image security (minimal base images, Trivy scanning, Cosign signing), Kubernetes security (RBAC, Pod Security Standards, NetworkPolicies, OPA/Gatekeeper), application security (SAST, SCA in CI/CD, Vault secrets management), and network security (mTLS via Istio, WAF for public APIs, cloud security posture management). Security is a first-class concern from architecture design, not a review at project end." },
  { q: 'How long does it take to build a cloud native application?', a: "A cloud native greenfield SaaS MVP — microservices on Kubernetes with CI/CD and monitoring — takes 12–20 weeks. Re-architecting an existing monolith with the Strangler Fig pattern takes 6–18 months depending on size and team velocity. A serverless API backend takes 4–8 weeks. A Kafka event streaming pipeline takes 8–16 weeks. We provide detailed timelines after the architecture discovery phase." },
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
    <div className="cn-stat-col">
      <div className="cn-stat-val">{started ? (val.includes(',') ? num.toLocaleString() : num) + suffix : val}</div>
      <div className="cn-stat-label">{label}</div>
    </div>
  );
}

export default function CloudNativeServices() {
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
        <title>Cloud Native Services | Microservices, Kubernetes, Kafka, Serverless | 1Solutions</title>
        <meta name="description" content="Expert cloud native development services — microservices architecture, Kubernetes containerisation, Apache Kafka event streaming, serverless applications, service mesh (Istio), GitOps, cloud native security, and dedicated cloud native engineering teams. 15+ years." />
        <link rel="canonical" href="https://www.1solutions.biz/cloud-native-services/" />
        <meta property="og:title" content="Cloud Native Services | Microservices, Kubernetes & Kafka | 1Solutions" />
        <meta property="og:description" content="Cloud native architecture design, microservices development, Kubernetes, Apache Kafka, serverless, Istio service mesh, GitOps, observability, and dedicated cloud native teams." />
        <meta property="og:url" content="https://www.1solutions.biz/cloud-native-services/" />
        <meta property="og:image" content="https://www.1solutions.biz/images/banner-1sol.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
        <style>{`
          .cn-page{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:linear-gradient(135deg,#faf5ff 0%,#f3e8ff 20%,#ede9fe 50%,#fef3c7 75%,#f0f9ff 100%);color:#0F1F40;line-height:1.6;position:relative;overflow-x:hidden}
          .cn-page *,.cn-page *::before,.cn-page *::after{box-sizing:border-box}
          .cn-orb{position:absolute;border-radius:50%;pointer-events:none;z-index:0;filter:blur(20px)}
          .cn-orb-1{width:880px;height:880px;background:radial-gradient(circle,rgba(147,51,234,.20) 0%,rgba(167,139,250,.08) 40%,transparent 70%);top:-280px;right:-260px}
          .cn-orb-2{width:780px;height:780px;background:radial-gradient(circle,rgba(217,119,6,.22) 0%,rgba(245,158,11,.10) 40%,transparent 70%);bottom:0;left:-230px}
          .cn-orb-3{width:550px;height:550px;background:radial-gradient(circle,rgba(3,105,161,.14) 0%,transparent 70%);top:42%;left:-120px;transform:translateY(-50%)}
          .cn-breadcrumb{position:relative;z-index:2;padding:16px 40px 0;max-width:1440px;margin:0 auto}
          .cn-breadcrumb ol{display:flex;flex-wrap:wrap;gap:6px;list-style:none;margin:0;padding:0;font-size:13px;color:#6A80A0}
          .cn-breadcrumb li{display:flex;align-items:center;gap:6px}
          .cn-breadcrumb li::after{content:'/';opacity:.45}
          .cn-breadcrumb li:last-child::after{display:none}
          .cn-breadcrumb a{color:#0F3460;text-decoration:none}
          .cn-breadcrumb a:hover{text-decoration:underline}
          .cn-hero{position:relative;z-index:2;text-align:center;max-width:960px;margin:0 auto;padding:44px 40px 32px}
          .cn-eyebrow{display:block;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#4A6080;margin-bottom:14px}
          .cn-hero h1{font-size:50px;font-weight:900;line-height:1.09;letter-spacing:-1.5px;margin-bottom:16px;background:linear-gradient(90deg,#0F3460 0%,#9333ea 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .cn-hero-desc{font-size:16px;color:#3A507A;line-height:1.65;max-width:740px;margin:0 auto 24px}
          .cn-trust-row{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:26px}
          .cn-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.60);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.85);border-radius:100px;padding:6px 14px;font-size:12px;font-weight:600;color:#0F3460;box-shadow:0 2px 8px rgba(15,52,96,.07)}
          .cn-badge-dot{width:7px;height:7px;border-radius:50%;background:#9333ea;flex-shrink:0}
          .cn-ctas{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
          .cn-btn-primary{display:inline-block;padding:14px 36px;background:#9333ea;color:#fff;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(147,51,234,.28)}
          .cn-btn-primary:hover{background:#0F3460;transform:translateY(-2px)}
          .cn-btn-ghost{display:inline-block;padding:14px 36px;background:rgba(255,255,255,.55);backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.85);border-radius:50px;color:#0F3460;font-weight:700;font-size:15px;text-decoration:none;transition:all .25s}
          .cn-btn-ghost:hover{background:rgba(255,255,255,.85);border-color:rgba(147,51,234,.5);transform:translateY(-2px)}
          .cn-stats{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);max-width:940px;margin:28px auto 0;background:rgba(255,255,255,.45);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.85);box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95)}
          .cn-stat-col{padding:18px 16px;text-align:center;border-right:1px solid rgba(15,52,96,.10)}
          .cn-stat-col:last-child{border-right:none}
          .cn-stat-val{font-size:28px;font-weight:900;color:#9333ea;letter-spacing:-.5px;line-height:1}
          .cn-stat-label{font-size:11px;color:#4A6080;font-weight:500;margin-top:5px}
          .cn-logos{position:relative;z-index:2;padding:24px 40px 52px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .cn-logos-label{font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6A80A0}
          .cn-logos-wrap{width:100%;overflow:hidden}
          .cn-logos-track{display:flex;align-items:center;gap:60px;width:max-content;animation:cn-marquee 28s linear infinite}
          .cn-logos-track:hover{animation-play-state:paused}
          @keyframes cn-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
          .cn-clogo{height:24px;width:auto;max-width:110px;object-fit:contain;filter:grayscale(100%);opacity:.45;transition:opacity .25s,filter .25s}
          .cn-clogo:hover{opacity:.85;filter:grayscale(0%)}
          .cn-s-eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#D97706;margin-bottom:10px;display:block}
          .cn-s-title{font-size:46px;font-weight:900;line-height:1.12;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:10px}
          .cn-s-desc{font-size:15px;color:#4A6080;line-height:1.7}
          .cn-s-reveal{opacity:0;transform:translateY(44px);transition:opacity .7s cubic-bezier(0.22,1,.36,1),transform .7s cubic-bezier(0.22,1,.36,1)}
          .cn-s-reveal.cn-revealed{opacity:1;transform:translateY(0)}
          .cn-inner{max-width:1300px;margin:0 auto}
          .cn-svc-section{background:transparent;padding:72px 40px 60px;position:relative;z-index:1}
          .cn-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
          .cn-svc-card{background:linear-gradient(135deg,rgba(250,245,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px 22px;position:relative;overflow:hidden;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(36px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .2s}
          .cn-svc-card.cn-cv{opacity:1;transform:translateY(0)}
          .cn-svc-card.cn-cv:hover{transform:translateY(-6px);border-color:rgba(147,51,234,.30);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .cn-svc-card.feat{border-color:rgba(147,51,234,.20)}
          .cn-svc-num{position:absolute;top:8px;right:14px;font-size:72px;font-weight:900;line-height:1;color:#0F3460;opacity:.055;pointer-events:none;letter-spacing:-4px;user-select:none}
          .cn-svc-card h3{font-size:16px;font-weight:700;color:#0F1F40;margin:0 0 8px;position:relative;z-index:1}
          .cn-svc-card p{font-size:13px;color:#4A6080;line-height:1.65;margin:0;position:relative;z-index:1}
          .cn-svc-card::before{content:'';position:absolute;left:0;top:12%;height:76%;width:3px;background:linear-gradient(180deg,#9333ea,#c084fc);border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:top center;transition:transform .3s cubic-bezier(0.22,1,.36,1)}
          .cn-svc-card.cn-cv:hover::before{transform:scaleY(1)}
          .cn-svc-more{text-align:center;margin-top:22px}
          .cn-btn-more{display:inline-block;background:#fff;border:1.5px solid rgba(15,52,96,.18);color:#0F3460;padding:10px 30px;border-radius:20px;font-weight:600;font-size:14px;cursor:pointer;transition:all .2s;font-family:inherit}
          .cn-btn-more:hover{background:#0F3460;border-color:#0F3460;color:#fff;transform:translateY(-2px)}
          .cn-stack-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:72px 40px;position:relative;z-index:1}
          .cn-stack-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:40px}
          .cn-stack-card{background:linear-gradient(135deg,rgba(250,245,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:22px 20px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .cn-stack-card.cn-sv{opacity:1;transform:translateY(0)}
          .cn-stack-card.cn-sv:hover{border-color:rgba(147,51,234,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .cn-stack-group{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
          .cn-stack-pills{display:flex;flex-wrap:wrap;gap:6px}
          .cn-pill{display:inline-block;font-size:11.5px;font-weight:500;padding:4px 10px;border-radius:100px;border:1px solid}
          .cn-eng-section{padding:80px 40px;position:relative;z-index:1}
          .cn-eng-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
          .cn-eng-card{background:linear-gradient(135deg,rgba(250,245,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:24px;padding:32px 28px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(44px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1),border-color .2s,box-shadow .25s}
          .cn-eng-card.cn-ev{opacity:1;transform:translateY(0)}
          .cn-eng-card.cn-ev:hover{border-color:rgba(147,51,234,.25);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .cn-eng-card.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(250,245,255,.45) 100%);border-color:rgba(217,119,6,.28);box-shadow:0 8px 32px rgba(217,119,6,.12),inset 0 1px 0 rgba(255,255,255,1);transform:translateY(-8px)}
          .cn-eng-card.feat.cn-ev{transform:translateY(-8px)}
          .cn-eng-card.feat.cn-ev:hover{transform:translateY(-12px)}
          .cn-eng-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;border:1px solid;margin-bottom:18px}
          .cn-eng-icon{width:48px;height:48px;background:rgba(15,52,96,.07);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;transition:background .2s}
          .cn-eng-card.cn-ev:hover .cn-eng-icon{background:rgba(147,51,234,.10)}
          .cn-eng-card.feat .cn-eng-icon{background:rgba(217,119,6,.10)}
          .cn-eng-icon svg{fill:#0F3460;transition:fill .2s}
          .cn-eng-card.cn-ev:hover .cn-eng-icon svg{fill:#9333ea}
          .cn-eng-card.feat .cn-eng-icon svg{fill:#D97706}
          .cn-eng-name{font-size:22px;font-weight:900;color:#0F3460;margin:0 0 6px;letter-spacing:-.3px}
          .cn-eng-headline{font-size:13px;font-weight:600;color:#D97706;margin-bottom:12px}
          .cn-eng-desc{font-size:14px;color:#4A6080;line-height:1.7;margin-bottom:18px}
          .cn-eng-list-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6A80A0;margin-bottom:8px}
          .cn-eng-list{list-style:none;padding:0;margin:0 0 18px;display:flex;flex-direction:column;gap:7px}
          .cn-eng-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#374151;line-height:1.5}
          .cn-eng-list li::before{content:'✓';font-weight:800;color:#9333ea;flex-shrink:0;margin-top:1px}
          .cn-eng-process{font-size:12px;color:#6A80A0;padding-top:14px;border-top:1px solid rgba(15,52,96,.08)}
          .cn-eng-process strong{color:#0F3460}
          .cn-eng-timeline{display:inline-block;font-size:11px;font-weight:600;color:#D97706;margin-top:6px}
          .cn-eng-cta{display:block;margin-top:18px;padding:11px;border-radius:50px;font-size:13px;font-weight:700;text-align:center;text-decoration:none;transition:all .22s;background:rgba(15,52,96,.09);color:#0F3460;border:1.5px solid rgba(15,52,96,.18)}
          .cn-eng-cta:hover{background:#0F3460;color:#fff}
          .cn-eng-card.feat .cn-eng-cta{background:#9333ea;color:#fff;border-color:#9333ea}
          .cn-eng-card.feat .cn-eng-cta:hover{background:#0F3460;border-color:#0F3460}
          .cn-process-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .cn-psteps{display:flex;flex-direction:column;margin-top:52px}
          .cn-pstep{display:grid;grid-template-columns:56px 1fr;gap:0 20px;opacity:0;transform:translateY(48px);transition:opacity .65s cubic-bezier(0.22,1,.36,1),transform .65s cubic-bezier(0.22,1,.36,1)}
          .cn-pstep.cn-pv{opacity:1;transform:translateY(0)}
          .cn-pstep-l{display:flex;flex-direction:column;align-items:center}
          .cn-pstep-circle{width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.65);backdrop-filter:blur(8px);border:2px solid rgba(15,52,96,.18);display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;color:#0F3460;flex-shrink:0;transition:background .3s,border-color .3s}
          .cn-pstep.cn-pv:hover .cn-pstep-circle{background:rgba(147,51,234,.10);border-color:#9333ea;color:#9333ea}
          .cn-pstep-connector{flex:1;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:42px}
          .cn-pstep-connector::before{content:'';width:2px;flex:1;background:#0F3460;opacity:.22}
          .cn-pstep-connector::after{content:'';border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #0F3460;opacity:.40}
          .cn-pstep:last-child .cn-pstep-connector{display:none}
          .cn-pstep-r{padding:4px 0 38px}
          .cn-pstep:last-child .cn-pstep-r{padding-bottom:0}
          .cn-pstep-title{font-size:20px;font-weight:700;color:#0F3460;margin:0 0 9px}
          .cn-pstep-desc{font-size:15px;color:#4A6080;line-height:1.75;margin:0}
          .cn-testi{background:transparent;padding:80px 40px;position:relative;z-index:1}
          .cn-center-head{text-align:center;margin-bottom:48px}
          .cn-tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:44px}
          .cn-tcard{background:linear-gradient(135deg,rgba(250,245,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:28px 24px;display:flex;flex-direction:column;gap:12px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(40px);transition:opacity .6s cubic-bezier(0.22,1,.36,1),transform .6s cubic-bezier(0.22,1,.36,1),box-shadow .3s}
          .cn-tcard.feat{background:linear-gradient(135deg,rgba(254,243,199,.52) 0%,rgba(255,255,255,.87) 55%,rgba(250,245,255,.42) 100%);border-color:rgba(217,119,6,.22)}
          .cn-tcard.cn-tv{opacity:1;transform:translateY(0)}
          .cn-tcard.cn-tv:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(15,52,96,.14)}
          .cn-stars{font-size:16px;color:#D97706;letter-spacing:2px}
          .cn-ttext{font-size:14px;line-height:1.75;color:#374151;flex:1}
          .cn-tauthor{display:flex;align-items:center;gap:12px}
          .cn-tavatar{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
          .cn-tname{font-size:14px;font-weight:700;color:#0F3460}
          .cn-trole{font-size:12px;color:#6b7280}
          .cn-why-section{background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);border-bottom:1px solid rgba(15,52,96,.08);padding:80px 40px;position:relative;z-index:1}
          .cn-why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:48px}
          .cn-wcard{background:linear-gradient(135deg,rgba(250,245,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:20px;padding:26px 22px;box-shadow:0 4px 24px rgba(15,52,96,.08),inset 0 1px 0 rgba(255,255,255,.95);opacity:0;transform:translateY(32px) scale(.97);transition:opacity .55s cubic-bezier(0.22,1,.36,1),transform .55s cubic-bezier(0.22,1,.36,1),border-color .2s}
          .cn-wcard.cn-wv{opacity:1;transform:translateY(0) scale(1)}
          .cn-wcard.cn-wv:hover{transform:translateY(-5px) scale(1);border-color:rgba(147,51,234,.25);box-shadow:0 14px 40px rgba(15,52,96,.12)}
          .cn-wcard-dot{width:10px;height:10px;border-radius:50%;background:#9333ea;margin-bottom:12px}
          .cn-wcard h3{font-size:14px;font-weight:700;color:#0F1F40;margin:0 0 8px;line-height:1.35}
          .cn-wcard p{font-size:13px;color:#4A6080;line-height:1.65;margin:0}
          .cn-contact{padding:70px 40px;background:linear-gradient(135deg,rgba(250,245,255,.55) 0%,rgba(255,255,255,.60) 40%,rgba(237,233,254,.55) 100%);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.80);position:relative;z-index:1}
          .cn-contact-grid{max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1.15fr;gap:32px;align-items:start}
          .cn-ctitle{font-size:42px;font-weight:900;line-height:1.18;margin:0 0 14px;background:linear-gradient(90deg,#0F3460 0%,#9333ea 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          .cn-cdesc{font-size:14px;color:#4A6080;line-height:1.6;margin:0 0 22px}
          .cn-cbenefits{background:rgba(255,255,255,.70);border:1px solid rgba(255,255,255,.90);border-radius:14px;padding:22px;backdrop-filter:blur(12px);display:flex;flex-direction:column;gap:14px}
          .cn-cbenefit{display:flex;gap:10px;align-items:flex-start}
          .cn-cbenefit-icon{flex-shrink:0;color:#9333ea;font-weight:800;font-size:16px;margin-top:1px}
          .cn-cbenefit p{font-size:13px;color:#4A6080;margin:0;line-height:1.55}
          .cn-form-box{background:linear-gradient(135deg,rgba(255,255,255,.88) 0%,rgba(250,245,255,.18) 50%,rgba(255,255,255,.84) 100%);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.92);border-radius:20px;padding:34px;box-shadow:0 8px 40px rgba(15,52,96,.10),inset 0 1px 0 rgba(255,255,255,1)}
          .cn-form-box h3{font-size:22px;font-weight:700;color:#0F1F40;margin:0 0 22px;letter-spacing:-.3px}
          .cn-form{display:flex;flex-direction:column;gap:13px}
          .cn-frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .cn-fg{display:flex;flex-direction:column;gap:5px}
          .cn-fg.full{grid-column:1/-1}
          .cn-fg label{font-size:12px;font-weight:500;color:#0F1F40}
          .cn-fg input,.cn-fg textarea,.cn-fg select{padding:10px 13px;border:1px solid rgba(15,52,96,.14);border-radius:6px;font-size:13px;font-family:inherit;color:#0F1F40;background:rgba(255,255,255,.55);transition:border-color .2s}
          .cn-fg input:focus,.cn-fg textarea:focus,.cn-fg select:focus{outline:none;border-color:#9333ea;box-shadow:0 0 0 3px rgba(147,51,234,.10)}
          .cn-consent{display:flex;gap:8px;align-items:flex-start}
          .cn-consent input{margin-top:3px;width:15px;height:15px}
          .cn-consent label{font-size:11px;color:#4A6080;line-height:1.5}
          .cn-consent a{color:#0F3460}
          .cn-submit{width:100%;padding:14px;background:#9333ea;border:none;color:#fff;border-radius:50px;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit;transition:all .25s;box-shadow:0 6px 24px rgba(147,51,234,.26)}
          .cn-submit:hover{background:#0F3460;transform:translateY(-2px);box-shadow:0 10px 30px rgba(15,52,96,.28)}
          .cn-faq{padding:80px 40px;background:#f8fafd;border-top:1px solid rgba(15,52,96,.08);position:relative;z-index:1}
          .cn-faq h2{font-size:46px;font-weight:900;letter-spacing:-1px;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:0 0 8px}
          .cn-faq-sub{font-size:15px;color:#4A6080;margin:0 0 36px}
          .cn-faq-list{display:flex;flex-direction:column;gap:10px}
          .cn-fitem{background:linear-gradient(135deg,rgba(250,245,255,.50) 0%,rgba(255,255,255,.85) 55%,rgba(237,233,254,.40) 100%);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.85);border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(15,52,96,.06);transition:border-color .2s}
          .cn-fitem.open{border-color:rgba(147,51,234,.30)}
          .cn-fitem.open::before{content:'';display:block;height:3px;background:linear-gradient(90deg,#9333ea,#c084fc);border-radius:3px 3px 0 0}
          .cn-fq{width:100%;background:none;border:none;padding:20px 20px 20px 58px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;text-align:left;gap:14px;font-family:inherit;position:relative}
          .cn-fq-badge{position:absolute;left:16px;top:50%;transform:translateY(-50%);width:26px;height:26px;background:rgba(15,52,96,.08);color:#374151;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:background .2s,color .2s}
          .cn-fitem.open .cn-fq-badge{background:#9333ea;color:#fff}
          .cn-fq span{font-size:15px;font-weight:600;color:#0F1F40;line-height:1.4}
          .cn-fitem.open .cn-fq span{color:#6b21a8}
          .cn-fchev{width:22px;height:22px;flex-shrink:0;color:#9ca3af;transition:transform .3s}
          .cn-fitem.open .cn-fchev{transform:rotate(180deg);color:#9333ea}
          .cn-fanswer-wrap{overflow:hidden;transition:max-height .35s ease;max-height:0}
          .cn-fitem.open .cn-fanswer-wrap{max-height:500px}
          .cn-fanswer{padding:0 20px 20px 58px;font-size:14px;color:#4b5563;line-height:1.8}
          .cn-related{padding:80px 40px;background:rgba(250,245,255,.14);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,.60)}
          .cn-related-inner{max-width:1300px;margin:0 auto;text-align:center}
          .cn-related h2{font-size:34px;font-weight:900;background:linear-gradient(90deg,#0F3460 0%,#D97706 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin:10px 0 12px}
          .cn-related-sub{font-size:14px;color:#4A6080;margin:0 auto;max-width:560px}
          .cn-related hr{border:none;border-top:1px solid rgba(15,52,96,.10);margin:32px 0}
          .cn-rtags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
          .cn-rtag{display:inline-block;padding:10px 20px;border:1.5px solid;border-radius:50px;font-size:14px;font-weight:500;text-decoration:none;transition:all .22s}
          .cn-rtag:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.09)}
          .cn-rtag-blue{background:rgba(3,105,161,.09);border-color:rgba(3,105,161,.28);color:#0369a1}
          .cn-rtag-violet{background:rgba(147,51,234,.09);border-color:rgba(147,51,234,.28);color:#6b21a8}
          .cn-rtag-amber{background:rgba(180,83,9,.09);border-color:rgba(180,83,9,.28);color:#b45309}
          .cn-rtag-green{background:rgba(22,163,74,.09);border-color:rgba(22,163,74,.28);color:#14532d}
          .cn-rtag-rose{background:rgba(225,29,72,.09);border-color:rgba(225,29,72,.28);color:#9f1239}
          .cn-rtag-teal{background:rgba(15,118,110,.09);border-color:rgba(15,118,110,.28);color:#0f766e}
          @media(max-width:1024px){.cn-hero h1,.cn-s-title,.cn-faq h2{font-size:36px}.cn-svc-grid{grid-template-columns:repeat(2,1fr)}.cn-stack-grid{grid-template-columns:repeat(2,1fr)}.cn-eng-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto}.cn-eng-card.feat{transform:none}.cn-eng-card.feat.cn-ev{transform:none}.cn-eng-card.feat.cn-ev:hover{transform:translateY(-4px)}.cn-why-grid{grid-template-columns:repeat(2,1fr)}.cn-tgrid{grid-template-columns:1fr}.cn-contact-grid{grid-template-columns:1fr}}
          @media(max-width:768px){.cn-breadcrumb{padding:12px 20px 0}.cn-hero{padding:28px 20px 20px}.cn-hero h1{font-size:26px;letter-spacing:-.3px}.cn-stats{grid-template-columns:1fr 1fr}.cn-stat-col:nth-child(2){border-right:none}.cn-stat-col:nth-child(3){border-top:1px solid rgba(15,52,96,.10)}.cn-stat-col:nth-child(4){border-top:1px solid rgba(15,52,96,.10);border-right:none}.cn-logos{padding:16px 20px 28px}.cn-svc-section,.cn-stack-section,.cn-eng-section,.cn-process-section,.cn-testi,.cn-why-section,.cn-faq,.cn-related{padding:52px 20px}.cn-contact{padding:48px 20px}.cn-svc-grid,.cn-stack-grid,.cn-why-grid{grid-template-columns:1fr}.cn-frow{grid-template-columns:1fr}.cn-ctitle{font-size:28px}.cn-s-title{font-size:28px}}
        `}</style>
      </Head>

      <div className="cn-page">
        <div className="cn-orb cn-orb-1" /><div className="cn-orb cn-orb-2" /><div className="cn-orb cn-orb-3" />

        <nav className="cn-breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <Link href="/" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
              <span itemProp="name">Cloud Native Services</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <section className="cn-hero">
          <span className="cn-eyebrow">Cloud Native Services</span>
          <h1>Cloud Native Development — Microservices, Kubernetes, Kafka & Serverless</h1>
          <p className="cn-hero-desc">Expert cloud native development services — microservices architecture and development, Kubernetes containerisation and orchestration, Apache Kafka event streaming, serverless application development, Istio service mesh, GitOps with ArgoCD, cloud native security, full-stack observability, and dedicated cloud native engineering teams for businesses worldwide.</p>
          <div className="cn-trust-row">
            {['Microservices & DDD','Kubernetes EKS/AKS/GKE','Apache Kafka','Serverless (Lambda/Functions)','GitOps with ArgoCD'].map(b => (
              <div className="cn-badge" key={b}><span className="cn-badge-dot" />{b}</div>
            ))}
          </div>
          <div className="cn-ctas">
            <Link href="#contact" className="cn-btn-primary">Build Your Cloud Native Platform</Link>
            <Link href="#engagement" className="cn-btn-ghost">View Engagement Models →</Link>
          </div>
        </section>

        <div className="cn-stats" ref={statsRef}>
          {[['100+','Cloud Native Projects'],['15+','Years Distributed Systems'],['10x','Scalability Achieved'],['98%','Client Retention']].map(([v, l]) => (
            <StatItem key={l} label={l} val={v} started={statsStarted} />
          ))}
        </div>

        <div className="cn-logos">
          <span className="cn-logos-label">Trusted by Engineering Teams Building at Scale</span>
          <div className="cn-logos-wrap">
            <div className="cn-logos-track">
              {[['/logo/Indian_Express_Logo_full.png','Indian Express'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon'],['/logo/Uniphore.jpg','Uniphore'],['/logo/ICCoLogo.png','ICC'],['/logo/Honor_Logo_(2020).svg.png','Honor'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv'],['/logo/Indian_Express_Logo_full.png','Indian Express 2'],['/logo/Verizon_2015_logo_-vector.svg.png','Verizon 2'],['/logo/Uniphore.jpg','Uniphore 2'],['/logo/ICCoLogo.png','ICC 2'],['/logo/Honor_Logo_(2020).svg.png','Honor 2'],['/logo/Zuari-Finserv-logo-new.png','Zuari Finserv 2']].map(([src, alt]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={alt} src={src} alt={alt.replace(/ \d$/, '')} className="cn-clogo" />
              ))}
            </div>
          </div>
        </div>

        <section className="cn-svc-section" aria-labelledby="cn-svc-heading">
          <div className="cn-inner">
            <div className={`cn-s-reveal${visibleSections.has('svc') ? ' cn-revealed' : ''}`} ref={el => { sectionRefs.current['svc'] = el; }}>
              <span className="cn-s-eyebrow">What We Build</span>
              <h2 id="cn-svc-heading" className="cn-s-title">Cloud Native Services We Deliver</h2>
              <p className="cn-s-desc" style={{ maxWidth: 720 }}>From cloud native architecture design and microservices development through Kubernetes containerisation, Apache Kafka event streaming, serverless, Istio service mesh, GitOps CI/CD, full-stack observability, cloud native security, and legacy modernisation.</p>
            </div>
            <div className="cn-svc-grid" ref={svcGridRef}>
              {visibleServices.map((s, i) => (
                <div key={s.n} className={`cn-svc-card${s.feat ? ' feat' : ''}${visibleSvcCards.includes(i) ? ' cn-cv' : ''}`} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="cn-svc-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            {SERVICES.length > 6 && (
              <div className="cn-svc-more">
                <button className="cn-btn-more" onClick={() => setShowAllSvc(p => !p)}>
                  {showAllSvc ? 'Show fewer services ↑' : `Show all ${SERVICES.length} services ↓`}
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="stack" className="cn-stack-section" aria-labelledby="cn-stack-heading">
          <div className="cn-inner">
            <div className={`cn-s-reveal${visibleSections.has('stk') ? ' cn-revealed' : ''}`} ref={el => { sectionRefs.current['stk'] = el; }}>
              <span className="cn-s-eyebrow">Technology Stack</span>
              <h2 id="cn-stack-heading" className="cn-s-title">Cloud Native Tools & Technologies</h2>
              <p className="cn-s-desc" style={{ maxWidth: 680 }}>Kubernetes (EKS/AKS/GKE), Helm, Istio, Linkerd, AWS Lambda, Azure Functions, Apache Kafka, Kafka Streams, Prometheus, Grafana, Jaeger, OpenTelemetry, ArgoCD, Flagger, OPA/Gatekeeper, Falco, HashiCorp Vault, Go, Node.js, Python, Java, and the full CNCF ecosystem.</p>
            </div>
            <div className="cn-stack-grid" ref={stackGridRef}>
              {TECH_STACK.map((grp, i) => (
                <div key={grp.group} className={`cn-stack-card${visibleStackCards.includes(i) ? ' cn-sv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="cn-stack-group" style={{ color: grp.color, borderBottomColor: grp.color + '33' }}>{grp.group}</div>
                  <div className="cn-stack-pills">
                    {grp.items.map(item => <span key={item} className="cn-pill" style={{ color: grp.color, background: grp.color + '12', borderColor: grp.color + '30' }}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="engagement" className="cn-eng-section" aria-labelledby="cn-eng-heading">
          <div className="cn-inner">
            <div className={`cn-s-reveal${visibleSections.has('eng') ? ' cn-revealed' : ''}`} ref={el => { sectionRefs.current['eng'] = el; }}>
              <span className="cn-s-eyebrow">How We Work</span>
              <h2 id="cn-eng-heading" className="cn-s-title">Cloud Native Engagement Models</h2>
              <p className="cn-s-desc" style={{ maxWidth: 680 }}>Hire a dedicated cloud native team, engage on a fixed-scope cloud native project, or get strategic cloud native architecture advisory and technical leadership for your engineering team.</p>
            </div>
            <div className="cn-eng-grid" ref={engGridRef}>
              {ENGAGEMENT_MODELS.map((m, i) => (
                <div key={m.id} className={`cn-eng-card${m.feat ? ' feat' : ''}${visibleEngCards.includes(i) ? ' cn-ev' : ''}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="cn-eng-badge" style={{ color: m.badgeColor, borderColor: m.badgeColor + '44', background: m.badgeColor + '14' }}>{m.badge}</span>
                  <div className="cn-eng-icon"><svg viewBox="0 0 24 24" width="26" height="26"><path d={m.icon} /></svg></div>
                  <div className="cn-eng-name">{m.name}</div>
                  <div className="cn-eng-headline">{m.headline}</div>
                  <div className="cn-eng-desc">{m.desc}</div>
                  <div className="cn-eng-list-label">Best for</div>
                  <ul className="cn-eng-list">{m.bestFor.map(b => <li key={b}>{b}</li>)}</ul>
                  <div className="cn-eng-process"><strong>Process:</strong> {m.process}<br /><span className="cn-eng-timeline">{m.timeline}</span></div>
                  <Link href="#contact" className="cn-eng-cta">Get a free estimate →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cn-process-section" aria-labelledby="cn-proc-heading">
          <div className="cn-inner" style={{ maxWidth: 760 }}>
            <div className={`cn-s-reveal${visibleSections.has('proc') ? ' cn-revealed' : ''}`} ref={el => { sectionRefs.current['proc'] = el; }}>
              <span className="cn-s-eyebrow">How We Deliver</span>
              <h2 id="cn-proc-heading" className="cn-s-title">Our Cloud Native Delivery Process</h2>
              <p className="cn-s-desc">From cloud native readiness assessment and architecture design through Kubernetes platform setup, microservice development, event-driven integration, GitOps CI/CD, and observability and production readiness.</p>
            </div>
            <div className="cn-psteps">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`cn-pstep${visibleSections.has('proc') ? ' cn-pv' : ''}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="cn-pstep-l">
                    <div className="cn-pstep-circle">{step.num}</div>
                    <div className="cn-pstep-connector" />
                  </div>
                  <div className="cn-pstep-r">
                    <div className="cn-pstep-title">{step.title}</div>
                    <p className="cn-pstep-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cn-testi" aria-labelledby="cn-ts-heading">
          <div className="cn-inner">
            <div className={`cn-center-head cn-s-reveal${visibleSections.has('ts') ? ' cn-revealed' : ''}`} ref={el => { sectionRefs.current['ts'] = el; }}>
              <span className="cn-s-eyebrow">Client Results</span>
              <h2 id="cn-ts-heading" className="cn-s-title">What Our Cloud Native Clients Say</h2>
              <p className="cn-s-desc">Engineering teams across the US, UK, and Australia trust 1Solutions to design and build cloud native platforms that scale — from Kafka-based data pipelines through Kubernetes microservices architectures and Strangler Fig monolith decomposition programmes.</p>
            </div>
            <div className="cn-tgrid" ref={testiGridRef}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className={`cn-tcard${t.feat ? ' feat' : ''}${visibleTestiCards.includes(i) ? ' cn-tv' : ''}`} style={{ transitionDelay: `${i * 100}ms` }} itemScope itemType="https://schema.org/Review">
                  <div className="cn-stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="cn-ttext" itemProp="reviewBody">{t.text}</p>
                  <div className="cn-tauthor">
                    <div className="cn-tavatar" style={{ background: t.bg }}>{t.init}</div>
                    <div><div className="cn-tname" itemProp="author">{t.name}</div><div className="cn-trole">{t.role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cn-why-section" aria-labelledby="cn-wy-heading">
          <div className="cn-inner">
            <div className={`cn-s-reveal${visibleSections.has('wy') ? ' cn-revealed' : ''}`} ref={el => { sectionRefs.current['wy'] = el; }}>
              <span className="cn-s-eyebrow">Why 1Solutions</span>
              <h2 id="cn-wy-heading" className="cn-s-title">Why Choose 1Solutions for Cloud Native Development</h2>
              <p className="cn-s-desc" style={{ maxWidth: 680 }}>15+ years of distributed systems experience, deep CNCF ecosystem expertise, honest microservices advice, Kafka depth, security designed in, GitOps from the start, observable by design, and Kubernetes expertise at both platform and application layer.</p>
            </div>
            <div className="cn-why-grid" ref={whyGridRef}>
              {WHY_CARDS.map((c, i) => (
                <div key={i} className={`cn-wcard${visibleWhyCards.includes(i) ? ' cn-wv' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="cn-wcard-dot" />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="cn-contact" aria-labelledby="cn-contact-heading">
          <div className="cn-contact-grid">
            <div>
              <h2 id="cn-contact-heading" className="cn-ctitle">Build Your Cloud Native Platform</h2>
              <p className="cn-cdesc">Tell us about your application and cloud native goals, and we will schedule a free architecture discovery call. Whether you are building a new cloud native platform from scratch, decomposing a monolith to microservices, implementing Kafka event streaming, containerising on Kubernetes, or need cloud native security hardening — our engineers will design your architecture and provide a transparent quote within 24 hours.</p>
              <div className="cn-cbenefits">
                {[['✓','Free cloud native architecture discovery call with a senior distributed systems engineer'],['✓','Honest microservices advice — we recommend a monolith when it is the right answer'],['✓','Full CNCF ecosystem coverage: Kubernetes, Kafka, Istio, ArgoCD, Prometheus, OPA, Falco'],['✓','GitOps from sprint one, observability designed in, security from day one'],['✓','Response within 24 business hours from our cloud native engineering team']].map(([icon, text]) => (
                  <div className="cn-cbenefit" key={text}><span className="cn-cbenefit-icon">{icon}</span><p>{text}</p></div>
                ))}
              </div>
            </div>
            <div className="cn-form-box">
              <h3>Tell Us About Your Cloud Native Project</h3>
              <form className="cn-form" onSubmit={e => e.preventDefault()}>
                <div className="cn-frow">
                  <div className="cn-fg"><label htmlFor="cn-name">Full Name *</label><input id="cn-name" type="text" placeholder="Your name" required /></div>
                  <div className="cn-fg"><label htmlFor="cn-email">Work Email *</label><input id="cn-email" type="email" placeholder="you@company.com" required /></div>
                </div>
                <div className="cn-frow">
                  <div className="cn-fg"><label htmlFor="cn-company">Company / Product Name</label><input id="cn-company" type="text" placeholder="Your company name" /></div>
                  <div className="cn-fg"><label htmlFor="cn-phone">Phone / WhatsApp</label><input id="cn-phone" type="tel" placeholder="+1 555 000 0000" /></div>
                </div>
                <div className="cn-fg full">
                  <label htmlFor="cn-type">Cloud Native Service Needed *</label>
                  <select id="cn-type" required>
                    <option value="">Select service...</option>
                    <option>Cloud Native Architecture Design &amp; Review</option>
                    <option>Microservices Development</option>
                    <option>Kubernetes Containerisation &amp; Orchestration</option>
                    <option>Serverless Application Development</option>
                    <option>Apache Kafka Event Streaming</option>
                    <option>Istio / Linkerd Service Mesh</option>
                    <option>GitOps &amp; ArgoCD CI/CD</option>
                    <option>Cloud Native Observability (Prometheus / Grafana / Jaeger)</option>
                    <option>Cloud Native Security (DevSecOps / Vault / OPA)</option>
                    <option>Monolith to Microservices Modernisation</option>
                    <option>Dedicated Cloud Native Team</option>
                    <option>Cloud Native Advisory / Architecture Review</option>
                  </select>
                </div>
                <div className="cn-fg full">
                  <label htmlFor="cn-current">Current Architecture</label>
                  <select id="cn-current">
                    <option value="">Select current state...</option>
                    <option>Greenfield — building from scratch</option>
                    <option>Monolith to be decomposed (Strangler Fig)</option>
                    <option>Existing microservices needing improvement</option>
                    <option>VM-based workloads to be containerised</option>
                    <option>Already on Kubernetes, need support</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <div className="cn-fg full">
                  <label htmlFor="cn-msg">Project Description &amp; Goals *</label>
                  <textarea id="cn-msg" rows={4} placeholder="Describe your application, architecture goals, scale requirements (requests/sec, events/sec, data volumes), team size, current pain points (monolith coupling, scaling issues, deployment frequency), and target cloud platform..." required />
                </div>
                <div className="cn-consent">
                  <input id="cn-consent" type="checkbox" required />
                  <label htmlFor="cn-consent">I agree to the <Link href="/privacy-policy">Privacy Policy</Link>. All details are treated confidentially.</label>
                </div>
                <button type="submit" className="cn-submit">Get Free Cloud Native Consultation →</button>
              </form>
            </div>
          </div>
        </section>

        <section className="cn-faq" aria-labelledby="cn-faq-heading">
          <div className="cn-inner" style={{ maxWidth: 860 }}>
            <span className="cn-s-eyebrow">FAQ</span>
            <h2 id="cn-faq-heading">Cloud Native — Frequently Asked Questions</h2>
            <p className="cn-faq-sub">Common questions about cloud native development — what cloud native means, microservices vs monolith, serverless, service mesh, event-driven architecture, security, and timelines.</p>
            <div className="cn-faq-list">
              {FAQS.map((item, i) => (
                <div key={i} className={`cn-fitem${openFaq === i ? ' open' : ''}`} itemScope itemType="https://schema.org/Question">
                  <button className="cn-fq" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                    <div className="cn-fq-badge">{String(i + 1).padStart(2, '0')}</div>
                    <span itemProp="name">{item.q}</span>
                    <svg className="cn-fchev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="6 9 12 15 18 9" /></svg>
                  </button>
                  <div className="cn-fanswer-wrap" itemScope itemType="https://schema.org/Answer">
                    <div className="cn-fanswer" itemProp="text">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cn-related">
          <div className="cn-related-inner">
            <span className="cn-s-eyebrow">Explore More</span>
            <h2>Related Cloud & Engineering Services</h2>
            <p className="cn-related-sub">We also provide cloud migration, DevOps automation, and enterprise software development services for businesses worldwide.</p>
            <hr />
            <div className="cn-rtags">
              {[['/cloud-migration-services/','Cloud Migration Services','cn-rtag-blue'],['/devops-services-company/','DevOps Services','cn-rtag-amber'],['/aws-development-services/','AWS Development','cn-rtag-blue'],['/nextjs-development-services/','Next.js Development','cn-rtag-blue'],['/tibco-development-services/','TIBCO Integration','cn-rtag-violet'],['/erp-development-company/','ERP Development','cn-rtag-amber'],['/nodejs-development-company/','Node.js Development','cn-rtag-green'],['/software-development-company/','Software Development','cn-rtag-teal'],['/website-support-maintenance-services/','Website Maintenance','cn-rtag-teal'],['/mobile-app-development-company/','Mobile App Development','cn-rtag-rose']].map(([href, label, cls]) => (
                <Link key={href} href={href} className={`cn-rtag ${cls}`}>{label}</Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
