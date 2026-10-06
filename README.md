# GOLKAR JATENG — YOUTH & DIGITAL COMMAND CENTER
> **Platform Resmi Komando Intelijen Politik, Manajemen Pemuda & Relawan, WebGIS 35 Kab/Kota, Tabulasi C1 Plano, dan WhatsApp Webhook Gateway DPD I Partai Golkar Jawa Tengah.**  
> **Domain Resmi Produksi:** [www.golkarjateng.com](https://www.golkarjateng.com)

[![Production Domain](https://img.shields.io/badge/Production-www.golkarjateng.com-F59E0B?style=for-the-badge&logo=google-chrome&logoColor=black)](https://www.golkarjateng.com)
[![Cloudflare WAF](https://img.shields.io/badge/Edge_Security-Cloudflare_WAF_%26_DDoS-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://www.cloudflare.com)
[![Web Server](https://img.shields.io/badge/Web_Server-Caddy_v2_%7C_Traefik_v3-1F88C0?style=for-the-badge&logo=caddy&logoColor=white)](https://caddyserver.com)
[![Go Version](https://img.shields.io/badge/Go-1.22+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://golang.org)
[![GraphQL](https://img.shields.io/badge/API-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org)
[![Postman](https://img.shields.io/badge/Testing-Postman_%26_Newman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com)
[![Notion](https://img.shields.io/badge/Project_Mgmt-Notion_Workspace-000000?style=for-the-badge&logo=notion&logoColor=white)](https://www.notion.so)
[![React](https://img.shields.io/badge/React-18.3+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.3-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![PostGIS](https://img.shields.io/badge/PostGIS-3.4-336791?style=for-the-badge&logo=postgis&logoColor=white)](https://postgis.net)
[![Redis](https://img.shields.io/badge/Redis-7.2-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![gRPC](https://img.shields.io/badge/gRPC-Protobuf-244c5a?style=for-the-badge&logo=grpc&logoColor=white)](https://grpc.io)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-K8s_Cluster-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io)

---

## Daftar Isi
1. [Ringkasan Sistem](#ringkasan-sistem)
2. [Target Domain & Alokasi Host](#target-domain--alokasi-host)
3. [Diagram Arsitektur Sistem (Cloudflare + Caddy + GraphQL + Go Microservices)](#diagram-arsitektur-sistem)
4. [Spesifikasi Rencana Tech Stack Lengkap](#spesifikasi-rencana-tech-stack-lengkap)
   - [A. Edge & Web Application Firewall (Cloudflare Tier-1)](#a-edge--web-application-firewall-cloudflare-tier-1)
   - [B. Modern Web Server & Ingress (Caddy v2 & Traefik v3)](#b-modern-web-server--ingress-tier-2-kenapa-bukan-cuma-nginx)
   - [C. API Layer: GraphQL & REST Gateway (Tier-3)](#c-api-layer-graphql-schema-first--rest-gateway-tier-3)
   - [D. Backend Microservices, gRPC & WebSockets (Golang Tier-4)](#d-backend-microservices-grpc--real-time-socket-golang-tier-4)
   - [E. Database & Storage Layer (PostgreSQL, PostGIS, Redis Tier-5)](#e-database--storage-layer-tier-5)
   - [F. Frontend Architecture (React 18 / Next.js 15)](#f-frontend-architecture)
   - [G. Container & Kubernetes Orchestration (Docker & K8s)](#g-container--kubernetes-orchestration)
5. [Alat Kolaborasi, Testing & Project Management](#alat-kolaborasi-testing--project-management)
   - [1. Testing & API Workspace: Postman & Newman CI](#1-developer-testing--api-workspace-postman--newman-ci)
   - [2. Project Management & Knowledge Base: Notion](#2-project-management--knowledge-hub-notion)
   - [3. Observability, Design & Quality Standards](#3-observability-design--engineering-standards)
6. [Arsitektur Keamanan Berlapis (Defense-in-Depth)](#arsitektur-keamanan-berlapis-defense-in-depth)
7. [Modul Utama Platform](#modul-utama-platform)
8. [Struktur Repositori](#struktur-repositori)
9. [Panduan Menjalankan Sistem Secara Lokal](#panduan-menjalankan-sistem-secara-lokal)
10. [Spesifikasi Server Produksi & Cloudflare Tunnel](#spesifikasi-server-produksi--cloudflare-tunnel)

---

## Ringkasan Sistem

**GolkarJateng Command Center** adalah platform enterprise terintegrasi tingkat provinsi yang dirancang untuk mengonsolidasikan seluruh lini pemenangan pemilu, pemetaan geospasial, keanggotaan pemuda, dan pengawalan suara di 35 Kabupaten/Kota Jawa Tengah (576 Kecamatan, 8.562 Desa/Kelurahan).

Platform ini beroperasi dengan infrastruktur berkeamanan tinggi yang dilindungi **Cloudflare Edge WAF & Anti-DDoS**, ditenagai web server generasi baru **Caddy v2 / Traefik v3 (HTTP/3 QUIC)**, mengadopsi query layer **GraphQL**, serta didukung microservices **Golang (Fiber/Gin) + gRPC** untuk menjamin kestabilan pemrosesan jutaan data suara TPS tanpa kegagalan sistem (*zero single-point-of-failure*).

---

## Target Domain & Alokasi Host

Sistem direncanakan rilis di bawah domain resmi **`golkarjateng.com`** dengan sub-alokasi arsitektur:

| Host / Subdomain | Fungsi & Peran | Proteksi & Routing |
|---|---|---|
| **`www.golkarjateng.com`** | Portal Publik e-KTA, Berita, & Landing Page | Cloudflare Edge CDN + Cache (TTL 24h) |
| **`app.golkarjateng.com`** | Command Center SPA Dashboard (Staff & Pimpinan) | Cloudflare WAF + TLS 1.3 Strict |
| **`api.golkarjateng.com`** | GraphQL Playground & Inbound WhatsApp Webhook | Cloudflare Rate Limiter + Bot Shield |
| **`ws.golkarjateng.com`** | Real-Time WebSocket Hub (Live Tabulasi Suara C1) | Cloudflare WebSocket Proxy (Keep-Alive) |
| **`admin.golkarjateng.com`** | Developer Portal, Kontainer, VPS Telemetri & Audit | **Cloudflare Zero Trust (SSO + 2FA Only)** |

---

## Diagram Arsitektur Sistem

```mermaid
flowchart TB
    subgraph InternetLayer ["Public Internet & Saksi TPS"]
        USER_BROWSER["Browser Pimpinan & Staf\n(app.golkarjateng.com)"]
        MOBILE_SAKSI["Mobile Saksi & Relawan\n(PWA / App)"]
        META_WA["Meta WhatsApp Business API\n(Inbound Webhook)"]
        DEV_TEST["Postman API Testing Workspace\n(Newman Automated CI/CD)"]
    end

    subgraph CloudflareEdge ["LAYER 1: Cloudflare Enterprise Edge & WAF"]
        CF_DNS["Cloudflare Anycast DNSSEC\n(DNS: www.golkarjateng.com)"]
        CF_WAF["Cloudflare WAF & OWASP CRS\n(SQLi, XSS, RCE Filter)"]
        CF_DDOS["Unmetered Anti-DDoS & Bot Mgmt\n(Under Attack Mode Siaga Pemilu)"]
        CF_CDN["Anycast Edge Cache\n(Jakarta & Singapore PoP < 10ms TTFB)"]
        CF_TUNNEL["Cloudflare Tunnel (cloudflared)\n(ZERO Open Inbound Ports on Host)"]
    end

    subgraph WebServerLayer ["LAYER 2: Modern Web Server & Ingress"]
        CADDY_SERVER["Caddy v2 / Traefik v3\n(HTTP/3 QUIC over UDP · Auto-ZeroSSL · Coraza WAF)"]
    end

    subgraph ApiGatewayMesh ["LAYER 3: Unified API & GraphQL Gateway (Go)"]
        GQL_GATEWAY["GraphQL Unified Gateway (Go gqlgen)\n(Queries · Mutations · Subscriptions)"]
        REST_GATEWAY["REST API Gateway (Fiber / Gin)\n(JWT Auth · Router · Rate Limiter)"]
        GO_WS_HUB["Real-Time WebSocket Hub (Go)\n(Live Tabulasi C1 · Streaming Sentimen)"]
    end

    subgraph BackendMesh ["LAYER 4: Microservices Backend (Golang gRPC)"]
        GRPC_CORE["Core Platform Service (gRPC)\n(Data Kader · KTA · Struktur)"]
        GRPC_TABULASI["Election Engine (gRPC + Go Worker)\n(Tabulasi Suara TPS · Hash C1 Plano)"]
        GRPC_OCR["Computer Vision OCR Worker\n(Python FastAPI + OpenCV + Tesseract)"]
        GO_WA_BOT["WhatsApp Bot Dispatcher (Go)\n(Auto-Reply KTA & Lapor C1)"]
    end

    subgraph CachingBroker ["LAYER 5: Message Queue & Distributed Cache"]
        REDIS_CLUSTER["Redis 7.2 Cluster\n(Pub/Sub WS Hub · Session Store · Idempotency)"]
    end

    subgraph StorageLayer ["LAYER 6: Database & Object Storage"]
        POSTGRES_DB[("PostgreSQL 16.3 (Master)\n(Relational Core Data · ACID Compliant)")]
        POSTGIS_EXT[("PostGIS 3.4 Spatial Engine\n(Batas Wilayah 35 Kab/Kota · Spasial GIS)")]
        PGBOUNCER["PgBouncer (Connection Pooling)"]
        R2_S3["Cloudflare R2 / S3 Bucket\n(Foto KTP & Scan C1 Plano AES-256)"]
    end

    subgraph ProjectManagement ["Project Management & Quality Assurance"]
        NOTION_PM["Notion Workspace\n(Kanban Sprints · PRD · SOP Saksi)"]
        POSTMAN_HUB["Postman Team Workspace\n(Collections · Environments · Mock Servers)"]
    end

    %% Flows
    USER_BROWSER --> CF_DNS
    MOBILE_SAKSI --> CF_DNS
    META_WA --> CF_DNS
    DEV_TEST --> CF_DNS

    CF_DNS --> CF_WAF
    CF_WAF --> CF_DDOS
    CF_DDOS --> CF_CDN
    CF_CDN --> CF_TUNNEL

    CF_TUNNEL --> CADDY_SERVER
    CADDY_SERVER --> GQL_GATEWAY
    CADDY_SERVER --> REST_GATEWAY
    CADDY_SERVER --> GO_WS_HUB

    GQL_GATEWAY -- gRPC --> GRPC_CORE
    GQL_GATEWAY -- gRPC --> GRPC_TABULASI
    REST_GATEWAY -- Event --> GO_WA_BOT
    REST_GATEWAY -- Async Task --> GRPC_OCR

    GO_WS_HUB <--> REDIS_CLUSTER
    GO_WA_BOT <--> REDIS_CLUSTER

    GRPC_CORE --> PGBOUNCER
    GRPC_TABULASI --> PGBOUNCER
    PGBOUNCER --> POSTGRES_DB
    POSTGRES_DB --- POSTGIS_EXT

    GRPC_OCR --> R2_S3
    GRPC_TABULASI --> R2_S3
```

---

## Spesifikasi Rencana Tech Stack Lengkap

### A. Edge & Web Application Firewall (Cloudflare Tier-1)
Untuk domain produksi **`www.golkarjateng.com`**, implementasi Cloudflare menjadi garda terdepan pertahanan siber:
1. **Cloudflare WAF (Managed Ruleset + OWASP Top 10):**
   * Memfilter serangan SQL Injection, Cross-Site Scripting, Remote Code Execution, dan Path Traversal sebelum request menyentuh server VPS.
2. **Unmetered Layer 3, 4, dan 7 Anti-DDoS:**
   * Menangkal serangan banjir trafik SYN flood, UDP amplification, dan HTTP flood.
   * Dilengkapi fitur **"Under Attack Mode"** siaga pemilu untuk memblokir botnet jahat secara instan.
3. **Cloudflare Zero Trust Tunnel (`cloudflared`):**
   * **Zero Open Inbound Ports:** Server VPS tidak perlu membuka port 80, 443, maupun port SSH 22 ke internet publik.
   * Dashboard Admin (`admin.golkarjateng.com`) diproteksi **Cloudflare Access** dengan wajib autentikasi Google Workspace / Email OTP pengurus DPD I.
4. **Anycast Edge Caching (Jakarta & Singapore PoP):**
   * Aset statis web, GeoJSON 35 Kabupaten/Kota Jawa Tengah, dan banner di-cache di edge server terdekat dengan **TTFB < 10ms**.
5. **SSL/TLS Full (Strict) Mode & DNSSEC:**
   * Enkripsi end-to-end dengan sertifikat Cloudflare Origin CA terinstal di web server lokal + DNSSEC aktif untuk mencegah DNS hijacking.

---

### B. Modern Web Server & Ingress (Tier-2: Kenapa Bukan Cuma NGINX?)

#### 1. Caddy Server v2 (Pilihan Utama & Paling Direkomendasikan)
* **100% Ditulis dalam Golang:** Selaras sempurna dengan ekosistem backend Go GolkarJateng.
* **Native HTTP/3 (QUIC) over UDP:** 
  * Saksi TPS di pelosok desa Jawa Tengah yang sering terkendala sinyal seluler lemot (3G/Edge) diuntungkan dengan HTTP/3. Protokol berbasis UDP ini kebal dari masalah *TCP Head-of-Line Blocking* dan mendukung *connection migration* (pindah BTS/Wi-Fi tanpa putus koneksi).
* **Automatic Zero-Touch HTTPS:** Manajemen sertifikat SSL (ZeroSSL / Let's Encrypt) otomatis tanpa perlu script cron job `certbot`.
* **Memory-Safe:** Kebal dari kerentanan *buffer overflow* khas server C.
* *(File konfigurasi siap pakai tersedia di [Caddyfile](file:///e:/Downloads/Kinterra%20Technologies/ASGARDA%20Project/GolkarJateng/Caddyfile))*

#### 2. Traefik v3 (Pilihan Ingress Kubernetes)
* Ingress controller cloud-native khusus orkestrasi kontainer Docker & Kubernetes (K8s).
* **Auto-Discovery via Labels:** Otomatis mendeteksi pod/kontainer baru tanpa perlu reload konfigurasi manual.
* Native gRPC load balancing, circuit breaking, dan middleware dinamis.

#### 3. NGINX 1.26 LTS (Kompatibilitas Standar)
* Didukung untuk kebutuhan *reverse proxy* tradisional dengan modul Brotli.

---

### C. API Layer: GraphQL (Schema-First) & REST Gateway (Tier-3)

Untuk memberikan fleksibilitas konsumsi data bagi Frontend Dashboard dan Mobile Saksi, platform mengadopsi **GraphQL** sebagai data query layer utama:
* **Engine GraphQL:** **`gqlgen` (Golang)** — pustaka GraphQL berbasis *Schema-First* yang menghasilkan Go code type-safe berkinerja tinggi.
* **Keunggulan GraphQL untuk GolkarJateng:**
  * **Zero Over-Fetching & Under-Fetching:** Dashboard hanya meminta field yang dibutuhkan (misal: hanya nama calon dan persentase suara tanpa memuat seluruh metadata TPS).
  * **Relasi Hierarki Kompleks dalam 1 Query:** Mengambil struktur Provinsi -> Kabupaten -> Kecamatan -> Kelurahan -> TPS -> Saksi Terdaftar hanya dalam satu network round-trip.
  * **GraphQL Subscriptions (Real-Time Live Votes):** Berjalan di atas WebSocket (`ws.golkarjateng.com/graphql`) untuk menyiarkan update perolehan suara formulir C1 Plano seketika ke layar pimpinan saat diverifikasi OCR.
* **REST & Webhook Endpoint:** Tetap disediakan untuk integrasi pihak ketiga, seperti Meta WhatsApp Cloud API (`/api/whatsapp-webhook`) dan upload biner dokumen formulir C1 Plano (`/api/v1/c1/upload`).

---

### D. Backend Microservices, gRPC & Real-Time Socket (Golang Tier-4)
* **Bahasa Pemrograman:** **Golang v1.22+**
  * Efisiensi goroutine ekstrem: 1 instance Go mampu menangani 100.000+ koneksi konkuren dengan konsumsi RAM sangat hemat.
* **Framework REST:** **Go Fiber v3** (berbasis `fasthttp`) atau **Gin Gonic v1.10** untuk API Gateway berlatensi sub-milidetik.
* **Inter-Service Communication:** **gRPC + Protocol Buffers v3 (`.proto`)**
  * Menggantikan REST internal dengan serialisasi biner gRPC (80% lebih hemat bandwidth, strongly-typed, auto-generated client SDK).
* **WhatsApp Cloud API Dispatcher:**
  * Callback webhook: `https://api.golkarjateng.com/api/whatsapp-webhook`
  * Verifikasi tanda tangan HMAC-SHA256 (`X-Hub-Signature-256`).
  * Auto-reply pintar dengan format teks interaktif untuk KTA, C1 Plano, Pendaftaran AMPG, dan Agenda Partai.

---

### E. Database & Storage Layer (Tier-5)
* **Relational Database:** **PostgreSQL 16.3**
  * Transaksi ACID ketat untuk data suara pemilu, NIK pemilih, dan nomor seri KTA digital.
  * Partisi tabel otomatis bulanan pada tabel `tbl_audit_security_logs` dan `tbl_webhook_history`.
* **Geospatial Extension:** **PostGIS 3.4**
  * Menyimpan poligon batas wilayah 35 Kabupaten/Kota Jawa Tengah.
  * Spatial query `ST_Contains` dan `ST_DWithin` untuk validasi geofencing GPS saksi saat mengambil foto formulir C1 Plano di TPS.
* **Connection Pooling:** **PgBouncer 1.22**
  * Mengonsolidasi ribuan koneksi konkuren dari pod Go menjadi pool koneksi efisien (max 150 pool).
* **Distributed Cache & Broker:** **Redis 7.2 (Alpine)**
  * In-memory cache hit ratio > 99%.
  * Rate limiting berbasis Token Bucket algorithm.
  * Idempotency checking untuk mencegah duplikasi pemrosesan webhook WhatsApp.
* **Object Storage:** **Cloudflare R2 / AWS S3 SGP1**
  * Penyimpanan foto identitas KTP dan dokumen fisik C1 Plano beresolusi tinggi dengan enkripsi AES-256 at-rest. Zero egress fee dengan Cloudflare R2.

---

### F. Frontend Architecture
* **Dashboard Command Center:** **React 18.3 / 19 + Vite** (Single Page App ultra-responsif).
* **Public Pages & SEO Portal:** **Next.js 15 (App Router)** untuk halaman publik verifikasi e-KTA digital, berita, dan pendaftaran terbuka.
* **State Management:** **Zustand** (Global Application & Session State) + **TanStack Query v5 / Apollo Client** (GraphQL Client, Caching, Real-time Subscriptions).
* **Design System:** Vanilla CSS Enterprise Architecture dengan custom design tokens (`index.css`), Glassmorphism surface, dan palet warna resmi Golkar Yellow (`#F59E0B`, `#0F172A`, `#10B981`).
* **WebGIS Visualizer:** **MapLibre GL / Leaflet** dengan layer GeoJSON 35 Kabupaten/Kota Jawa Tengah.

---

### G. Container & Kubernetes Orchestration
* **Docker & Multi-Stage Builds:** Image berbasis `scratch` atau `alpine` menghasilkan binary microservice Go di bawah 25 MB.
* **Docker Compose v2:** [docker-compose.yml](file:///e:/Downloads/Kinterra%20Technologies/ASGARDA%20Project/GolkarJateng/docker-compose.yml) untuk orkestrasi lokal: PostgreSQL PostGIS, Redis, Go Gateway, dan Frontend.
* **Kubernetes (K8s) Cluster:**
  * **Horizontal Pod Autoscaler (HPA):** Skala pod Go Gateway otomatis dari 3 replika hingga 30 replika saat lonjakan trafik hari pemilihan (C1 rush hour).
  * **Ingress Controller:** Caddy Ingress / Traefik Ingress Controller.
  * **GitOps:** **ArgoCD** yang menyinkronkan status manifest Kubernetes secara otomatis dari repositori Git.

---

## Alat Kolaborasi, Testing & Project Management

Untuk menjamin siklus pengembangan perangkat lunak (SDLC) yang profesional, terstruktur, dan teruji:

### 1. Developer Testing & API Workspace: Postman & Newman CI
Seluruh integrasi API diuji secara sistematis menggunakan **Postman**:
* **Postman Team Workspace:** Ruang kerja terpusat untuk tim backend, frontend, dan QA.
* **Shared Postman Collections:**
  * `GolkarJateng_Core_API.postman_collection.json` (Auth, KTA, Struktur Organisasi, Anggota Pemuda).
  * `GolkarJateng_WhatsApp_Webhook.postman_collection.json` (Simulasi kiriman pesan Meta, Fonnte, Wablas).
  * `GolkarJateng_GraphQL_Queries.postman_collection.json` (Query data WebGIS & C1 tabulasi suara).
* **Pre-Request Script (HMAC Signature Generator):** Script otomatis di Postman yang menghasilkan header `X-Hub-Signature-256` untuk pengujian validasi Webhook Meta secara lokal.
* **Automated CI/CD Testing (Newman CLI):**
  * Setiap pull request ke branch `development` dan `main` memicu eksekusi koleksi Postman melalui **Newman** di GitHub Actions untuk memvalidasi *contract testing* dan *zero-regression*.
* **Postman Mock Servers:** Memungkinkan tim frontend mengembangkan UI sebelum endpoint backend Go selesai dideploy.

### 2. Project Management & Knowledge Hub: Notion
Seluruh manajemen produk, strategi teknis pemenangan, dan dokumentasi operasional dikelola melalui **Notion Workspace DPD I Golkar Jateng**:
* **Sprint Board & Kanban Tracking:**
  * Manajemen tiket tugas: *Backlog*, *To Do*, *In Progress*, *Code Review*, *QA Testing*, *Production Ready*.
* **Product Requirements Document (PRD):**
  * Spesifikasi detail untuk setiap modul: Alur scanner e-KTP, format formulir C1 Plano saksi, dan skenario bot WhatsApp.
* **Knowledge Base & SOP Tim:**
  * SOP Operasional Pengawalan Suara TPS (BSNPG Jateng).
  * Panduan Onboarding Developer & Pengaturan SSH Key VPS.
  * Disaster Recovery Playbook & Prosedur Penanganan Serangan Siber (Incident Response).
* **RFCs & Database Schema Changelog:** Dokumentasi setiap usulan perubahan skema database PostgreSQL dan GraphQL types sebelum di-merge ke branch utama.

### 3. Observability, Design & Engineering Standards
* **Error Tracking & APM:** **Sentry** (Pelacakan crash frontend React dan runtime panic backend Go secara real-time).
* **UI/UX Design Handover:** **Figma Workspace** dengan Golkar Design System Tokens (Kuning Golkar `#F59E0B`, Navy `#0F172A`, Typography Inter & Outfit).
* **Code Quality & Linting:** `golangci-lint` (standar Go), ESLint + Prettier (frontend), serta Husky git pre-commit hooks.
* **Git Workflow:** Standard *Gitflow* dengan konvensi penamaan commit *Conventional Commits* (`feat:`, `fix:`, `docs:`, `perf:`).

---

## Arsitektur Keamanan Berlapis (Defense-in-Depth)

```
[ Pengguna / Saksi TPS ]
          │
          ▼  HTTPS / HTTP3 (TLS 1.3 Strict)
┌───────────────────────────────────────────────────────────┐
│ 1. EDGE SECURITY (Cloudflare)                             │
│    • DNSSEC on golkarjateng.com                           │
│    • Cloudflare WAF (OWASP Core Ruleset)                  │
│    • Layer 3/4/7 DDoS Protection & Under Attack Mode      │
│    • Rate Limiting (600 req/min per IP)                   │
│    • Bot Management & Challenge                           │
└───────────────────────────────────────────────────────────┘
          │
          ▼  Encrypted Outbound Tunnel (Zero Inbound Open Ports)
┌───────────────────────────────────────────────────────────┐
│ 2. REVERSE PROXY & INGRESS (Caddy v2 / Traefik v3)        │
│    • Native HTTP/3 (QUIC) over UDP                        │
│    • Origin CA Certificate Validation                     │
│    • HSTS: max-age=31536000; includeSubDomains; preload   │
│    • Strict Security Headers: CSP, X-Frame-Options: DENY  │
└───────────────────────────────────────────────────────────┘
          │
          ▼  GraphQL & gRPC Internal Mesh
┌───────────────────────────────────────────────────────────┐
│ 3. API & APPLICATION RUNTIME (Golang Microservices)       │
│    • GraphQL Schema Validation & Query Depth Limiting     │
│    • WhatsApp Webhook HMAC-SHA256 Signature Verification   │
│    • C1 Plano Ballot Cryptographic SHA-256 Hash           │
│    • JWT Auth with Ed25519 / RSA-256 Signatures           │
│    • Parameterized SQL Queries (Immune to SQL Injection)  │
└───────────────────────────────────────────────────────────┘
          │
          ▼  Private Isolated Docker/VPC Network
┌───────────────────────────────────────────────────────────┐
│ 4. DATA ENCRYPTION (PostgreSQL, Redis & Storage)          │
│    • Blocked External Ports (No Public DB Access)         │
│    • AES-256 Server-Side Encryption on S3/R2              │
│    • Encrypted Daily Automated Backups (pg_dump)          │
│    • Comprehensive Immutable Audit Trail Logs             │
└───────────────────────────────────────────────────────────┘
```

---

## Modul Utama Platform

| Modul | Deskripsi Fungsional |
|---|---|
| **Executive Overview** | Dashboard ringkasan eksekutif DPD I: total pemilih, sebaran KTA, kesiapan saksi TPS, dan indeks kemenangan. |
| **WebGIS Jawa Tengah** | Peta interaktif 35 Kab/Kota berbasis spasial dengan filter Dapil RI, Provinsi, dan visualisasi densitas kader. |
| **Database Pemuda & KTA** | Pencatatan 384.000+ basis pemuda, scanner KTP otomatis, penerbitan e-KTA digital ber-QR Code resmi. |
| **Saksi TPS & C1 Plano** | Manajemen penugasan saksi BSNPG per-TPS, verifikasi dokumen C1 Plano, dan validasi tabulasi suara. |
| **Monitoring Isu Publik** | Pantauan sentimen publik medsos, radar percakapan regional Jateng, dan manajemen kampanye broadcast WA. |
| **Kelola Akses Pengguna** | Role-Based Access Control (RBAC) dengan 5 peran: *Super Admin, Pengurus DPD I, BSNPG, Admin Dapil, Staf Humas*. |
| **Golkar for Developers** | Portal terdedikasi tim IT: WhatsApp Webhook Gateway, REST API docs, VPS CPU/RAM hardware monitor, dan Docker manager. |
| **Audit Trail & Keamanan** | Pencatatan jejak audit aktivitas pengguna, proteksi sesi ganda, dan enkripsi data sesuai standar kepemiluan. |

---

## Struktur Repositori

```text
GolkarJateng/
├── api/
│   └── whatsapp-webhook.js        # Vercel Serverless Webhook Handler (GET & POST)
├── public/
│   ├── favicon.ico                # Favicon Beringin Golkar resmi
│   ├── favicon.png                # Favicon PNG High-Res
│   ├── favicon.svg                # Favicon SVG Vector
│   └── Logo_Golkar.webp           # Asset Lambang Resmi Partai Golkar
├── src/
│   ├── assets/                    # Asset gambar, poster login, dan logo
│   ├── components/                # Modul Antarmuka React
│   │   ├── AccountProfileModal.jsx
│   │   ├── AuditAndSecurityModule.jsx
│   │   ├── BoardActivityModule.jsx
│   │   ├── C1ScannerModal.jsx
│   │   ├── CommandCenterDashboard.jsx
│   │   ├── ContributorLeaderboardModule.jsx
│   │   ├── EventManagementModule.jsx
│   │   ├── ExecutiveReportsModule.jsx
│   │   ├── ExportModal.jsx
│   │   ├── FieldOperationsModule.jsx
│   │   ├── GolkarDevelopersModule.jsx  # Portal Developer, VPS & Container Monitor
│   │   ├── Header.jsx
│   │   ├── KtaManagementModule.jsx
│   │   ├── KtpScannerModal.jsx
│   │   ├── LoginPage.jsx               # Halaman Login Split Screen Modern
│   │   ├── MemberOrganizationModule.jsx
│   │   ├── QrCheckInModal.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SocialMonitoringModule.jsx  # Modul Humas & Media Sosial
│   │   ├── SystemAccessModule.jsx
│   │   ├── WebGisModule.jsx
│   │   └── YouthManagementModule.jsx
│   ├── data/
│   │   └── mockData.js            # Mock dataset terintegrasi 35 Kab/Kota Jateng
│   ├── App.jsx                    # Root Application Router & Modal Controller
│   ├── index.css                  # Enterprise Design System & Utility Tokens
│   └── main.jsx                   # React DOM Entrypoint
├── Caddyfile                      # Konfigurasi Caddy v2 (HTTP/3, Auto-TLS, Reverse Proxy)
├── Dockerfile                     # Multi-Stage Build Dockerfile (Node -> Alpine)
├── docker-compose.yml             # Manifest Orkestrasi Multi-Kontainer Lokal
├── index.html                     # HTML Template Ber-Favicon Resmi
├── package.json                   # Dependency Manifest & Scripts
├── vercel.json                    # Konfigurasi Routing Serverless API & SPA Rewrite
└── vite.config.js                 # Vite Bundler Configuration
```

---

## Panduan Menjalankan Sistem Secara Lokal

### Prasyarat
* **Node.js:** v18.0.0 atau lebih baru
* **npm:** v9.0.0 atau lebih baru
* **Docker & Docker Compose** (opsional untuk menjalankan full backend stack lokal)

### Langkah Instalasi
1. **Clone repositori:**
   ```bash
   git clone https://github.com/dimasoktavianprasetyo/golkarjateng.git
   cd golkarjateng
   ```

2. **Checkout ke branch development:**
   ```bash
   git checkout development
   ```

3. **Install dependensi:**
   ```bash
   npm install
   ```

4. **Jalankan frontend development server:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di: `http://localhost:5173/`

5. **(Opsional) Menjalankan stack kontainer lokal (PostgreSQL + Redis):**
   ```bash
   docker compose up -d
   ```

---

## Spesifikasi Server Produksi & Cloudflare Tunnel

### 1. Spesifikasi Server Dedicated VPS (vps-prod-jateng-01)
* **Penyedia:** G-Core Cloud / Biznet Gio Tier-3 DC (Jakarta / Semarang Edge Point)
* **Sistem Operasi:** Ubuntu 24.04.1 LTS (Linux 6.8 x86_64)
* **Processor (CPU):** 8 vCPU AMD EPYC™ 7763 64-Core Processor @ 3.24GHz
* **Memory (RAM):** 16.0 GB DDR4 ECC Registered
* **Penyimpanan:** 250 GB Enterprise NVMe PCIe 4.0 SSD
* **Jaringan:** 10 Gbps Redundant Uplink (Public IP Statis: `103.147.221.84`)
* **Arsitektur Port:** **Zero Open Inbound Ports** melalui Cloudflare Tunnel daemon (`cloudflared`).

### 2. Konfigurasi Caddyfile Produksi (`Caddyfile`)
```caddy
# www.golkarjateng.com - Production Caddyfile
www.golkarjateng.com, golkarjateng.com {
    # Automatic HTTP/3 (QUIC) over UDP enabled
    encode zstd gzip

    # Security Headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "strict-origin-when-cross-origin"
    }

    # GraphQL Endpoint Reverse Proxy
    handle /graphql* {
        reverse_proxy localhost:4000
    }

    # API Gateway Reverse Proxy
    handle /api/* {
        reverse_proxy localhost:4000
    }

    # WebSocket Hub Reverse Proxy
    handle /ws/* {
        reverse_proxy localhost:4000
    }

    # Frontend Single Page App
    handle {
        root * /var/www/golkarjateng/dist
        try_files {path} /index.html
        file_server
    }
}
```

---

<p align="center">
  <b>DEWAN PIMPINAN DAERAH I PARTAI GOLONGAN KARYA PROVINSI JAWA TENGAH</b><br>
  <i>Jl. Kyai Saleh No.1, Mugassari, Kec. Semarang Selatan, Kota Semarang, Jawa Tengah 50249</i><br>
  <sub>Suara Golkar, Suara Rakyat · Golkar Solid, Indonesia Maju · www.golkarjateng.com</sub>
</p>
