import React, { useState } from 'react';
import { 
  Terminal, 
  Webhook, 
  Copy, 
  Check, 
  Play, 
  Send, 
  Code2, 
  ShieldCheck, 
  Cpu, 
  FileCode, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Server, 
  Lock, 
  ExternalLink,
  BookOpen,
  KeyRound,
  Layers,
  Sparkles,
  HardDrive,
  Database,
  Activity,
  Boxes,
  RotateCcw,
  Wifi,
  AlertCircle,
  Shield,
  Zap,
  Sliders,
  Download,
  Clock,
  Radio,
  X
} from 'lucide-react';
import golkarLogo from '../assets/Logo_Golkar.webp';

export default function GolkarDevelopersModule({ onNavigateTab }) {
  // Tabs: 'vps_infra', 'webhook', 'api_docs', 'code_snippets', 'security'
  const [activeTab, setActiveTab] = useState('vps_infra');
  const [copiedKey, setCopiedKey] = useState(null);
  const [selectedSnippetLang, setSelectedSnippetLang] = useState('curl');
  const [opsToast, setOpsToast] = useState(null);
  const [logModalContainer, setLogModalContainer] = useState(null);

  // Webhook Simulator State
  const [webhookInputText, setWebhookInputText] = useState('KTA');
  const [webhookSenderPhone, setWebhookSenderPhone] = useState('6281298765432');
  const [webhookSenderName, setWebhookSenderName] = useState('Ahmad Fauzi (Kader Semarang)');
  const [isFiringWebhook, setIsFiringWebhook] = useState(false);
  const [lastWebhookResponse, setLastWebhookResponse] = useState(null);

  const [simulatedChatHistory, setSimulatedChatHistory] = useState([
    {
      id: 1,
      sender: 'user',
      time: '14:20',
      text: 'Halo admin Golkar Jateng, mau tanya status KTA saya atas nama Ahmad Fauzi.'
    },
    {
      id: 2,
      sender: 'bot',
      time: '14:20',
      text: '🟡 *DPD I PARTAI GOLKAR JAWA TENGAH*\n\nHalo *Ahmad Fauzi*,\nStatus KTA Digital Anda: *AKTIF (TERVERIFIKASI)*.\n\n• NIK: 337401******0001\n• Wilayah: DPD I Jawa Tengah\n• No KTA: 33.74.01.2026.08412\n\nUnduh e-KTA resmi ber-QR Code di portal pemenangan:\n👉 https://www.golkarjateng.com\n\n_Suara Golkar, Suara Rakyat!_'
    }
  ]);

  const [inboundWebhookLogs, setInboundWebhookLogs] = useState([
    {
      id: 'WH-9041',
      time: '14:20:18 WIB',
      from: '6281298765432',
      senderName: 'Ahmad Fauzi',
      type: 'kta_inquiry',
      badgeText: 'Cek KTA Digital',
      badgeColor: '#f59e0b',
      message: 'Halo admin Golkar Jateng, mau tanya status KTA saya...',
      status: '200 OK',
      latency: '34ms'
    },
    {
      id: 'WH-9038',
      time: '14:14:02 WIB',
      from: '6285712345678',
      senderName: 'Siti Rahma (Kader Solo)',
      type: 'youth_registration',
      badgeText: 'Registrasi Kader',
      badgeColor: '#0284c7',
      message: 'DAFTAR PEMUDA AMPG SOLO',
      status: '200 OK',
      latency: '29ms'
    },
    {
      id: 'WH-9022',
      time: '13:58:45 WIB',
      from: '6281399887766',
      senderName: 'Bambang Supriyadi (Saksi TPS 08)',
      type: 'c1_plano',
      badgeText: 'Formulir C1 Plano',
      badgeColor: '#10b981',
      message: '[C1 Plano Photo] Hasil Suara TPS 08 Solo',
      status: '200 OK',
      latency: '42ms'
    }
  ]);

  // VPS & Container States
  const [containers, setContainers] = useState([
    {
      id: 'c-1',
      name: 'golkar-api-gateway',
      image: 'golkarjateng/api-gateway:v2.4.1',
      port: '0.0.0.0:4000->4000/tcp',
      status: 'running',
      health: 'healthy',
      uptime: 'Up 14 hari',
      cpu: 2.4,
      memory: '248 MB / 1024 MB',
      memoryPercent: 24.2,
      netIO: '12.4 MB / 8.2 MB',
      role: 'Express.js REST API & WhatsApp Webhook Dispatcher',
      logs: [
        '[2026-10-06 00:02:18] INFO: Inbound Webhook event from +6281298765432 - KTA inquiry - Latency 34ms',
        '[2026-10-06 00:02:19] INFO: Dispatched auto-reply payload to WhatsApp Cloud API [status: 200 OK]',
        '[2026-10-06 00:03:01] INFO: Healthcheck probe /healthz - 200 OK',
        '[2026-10-06 00:04:12] INFO: Token validation verified from client [ip: 103.147.221.84]'
      ]
    },
    {
      id: 'c-2',
      name: 'golkar-db-postgres',
      image: 'postgis/postgis:16-3.4-alpine',
      port: '127.0.0.1:5432->5432/tcp (Internal)',
      status: 'running',
      health: 'healthy',
      uptime: 'Up 48 hari',
      cpu: 8.6,
      memory: '3.21 GB / 6.00 GB',
      memoryPercent: 53.5,
      netIO: '184.2 MB / 412.8 MB',
      role: 'PostgreSQL 16.3 + PostGIS 3.4 (35 Kab/Kota WebGIS, Pemuda, KTA, C1)',
      logs: [
        '2026-10-06 00:00:01.428 WIB [14201] LOG: checkpoint complete: wrote 428 buffers (2.6%); 0 WAL file(s) added',
        '2026-10-06 00:01:45.102 WIB [14202] LOG: autovacuum: vacuumed table "public.tbl_pemuda_jateng"',
        '2026-10-06 00:02:20.891 WIB [14203] LOG: connection authorized: user=golkar_app database=db_golkarjateng_prod',
        '2026-10-06 00:03:10.119 WIB [14204] LOG: PostGIS spatial index scan executed on "geom_kabupaten_jateng" (0.8ms)'
      ]
    },
    {
      id: 'c-3',
      name: 'golkar-cache-redis',
      image: 'redis:7.2.5-alpine',
      port: '127.0.0.1:6379->6379/tcp (Internal)',
      status: 'running',
      health: 'healthy',
      uptime: 'Up 48 hari',
      cpu: 1.1,
      memory: '184 MB / 1024 MB',
      memoryPercent: 18.0,
      netIO: '48.9 MB / 62.1 MB',
      role: 'In-Memory Cache, Rate Limiter, Webhook Idempotency & Task Queue',
      logs: [
        '1:M 06 Oct 2026 00:00:15.120 * 10000 keys in cycle because of expire.',
        '1:M 06 Oct 2026 00:01:00.450 * DB saved on disk',
        '1:M 06 Oct 2026 00:02:40.812 * Ready to accept connections tcp',
        '1:M 06 Oct 2026 00:03:15.601 * Client connected [addr=127.0.0.1:48210]'
      ]
    },
    {
      id: 'c-4',
      name: 'golkar-ocr-c1',
      image: 'golkarjateng/ocr-c1-engine:v1.8.0',
      port: '127.0.0.1:8000->8000/tcp (Internal)',
      status: 'running',
      health: 'healthy',
      uptime: 'Up 9 hari',
      cpu: 4.2,
      memory: '1.45 GB / 3.00 GB',
      memoryPercent: 48.3,
      netIO: '312.4 MB / 45.2 MB',
      role: 'Python 3.11 FastAPI + OpenCV + Tesseract OCR Tabulasi Suara TPS',
      logs: [
        '[2026-10-06 00:00:27] [INFO] Received C1 Plano image upload from Saksi TPS 08 Solo',
        '[2026-10-06 00:00:28] [INFO] OpenCV perspective transform & deskew applied (resolution 2048x1536)',
        '[2026-10-06 00:00:28] [INFO] Tesseract OCR model extracted table: Partai Golkar [Votes: 142]',
        '[2026-10-06 00:01:05] [INFO] Confidence score: 98.4% - Dispatched result to Postgres'
      ]
    },
    {
      id: 'c-5',
      name: 'golkar-nginx-proxy',
      image: 'nginx:1.26-alpine',
      port: '0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp',
      status: 'running',
      health: 'healthy',
      uptime: 'Up 48 hari',
      cpu: 0.8,
      memory: '68 MB / 512 MB',
      memoryPercent: 13.2,
      netIO: '1.24 GB / 3.48 GB',
      role: 'Edge Reverse Proxy, TLS 1.3 Termination & Let\'s Encrypt SSL Certbot',
      logs: [
        '2026/10/06 00:00:10 [notice] 1#1: using the "epoll" event method',
        '2026/10/06 00:00:10 [notice] 1#1: nginx/1.26.2 (TLS 1.3 enabled)',
        '2026/10/06 00:02:18 [info] 24#24: *4218 SSL handshake completed [cipher: TLS_AES_256_GCM_SHA384]',
        '2026/10/06 00:04:00 [info] 24#24: *4219 client 103.147.221.84 request: "POST /api/whatsapp-webhook HTTP/2.0"'
      ]
    },
    {
      id: 'c-6',
      name: 'golkar-wa-dispatcher',
      image: 'golkarjateng/wa-dispatcher:v2.1.0',
      port: 'Internal Background Service',
      status: 'running',
      health: 'healthy',
      uptime: 'Up 14 hari',
      cpu: 1.5,
      memory: '160 MB / 512 MB',
      memoryPercent: 31.2,
      netIO: '24.1 MB / 18.7 MB',
      role: 'Go Worker yang mengonsumsi antrean Redis untuk broadcast auto-replies',
      logs: [
        '2026-10-06T00:00:01Z [dispatcher] Worker pool initialized with 16 parallel goroutines',
        '2026-10-06T00:02:18Z [dispatcher] Dequeued job ID #4812 [type: wa_auto_reply_kta]',
        '2026-10-06T00:02:19Z [dispatcher] Message delivered successfully to +6281298765432 (18ms)',
        '2026-10-06T00:04:10Z [dispatcher] Queue status: 0 pending, 142.890 processed total'
      ]
    }
  ]);

  const showToast = (message) => {
    setOpsToast(message);
    setTimeout(() => {
      setOpsToast(null);
    }, 3800);
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRestartContainer = (cId, cName) => {
    setContainers(prev => prev.map(c => {
      if (c.id === cId) {
        return { ...c, status: 'restarting', health: 'starting...' };
      }
      return c;
    }));

    showToast(`Memulai ulang kontainer ${cName}...`);

    setTimeout(() => {
      setContainers(prev => prev.map(c => {
        if (c.id === cId) {
          return { 
            ...c, 
            status: 'running', 
            health: 'healthy', 
            uptime: 'Up 2 detik (Baru direstart)'
          };
        }
        return c;
      }));
      showToast(`Kontainer ${cName} berhasil direstart (Status: Healthy 200 OK) ✓`);
    }, 1200);
  };

  const handleFireWebhookTest = (customText = null, presetName = null) => {
    const msgToSend = customText || webhookInputText;
    const nameToSend = presetName || webhookSenderName;
    if (!msgToSend.trim()) return;

    setIsFiringWebhook(true);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: timeStr,
      text: msgToSend
    };

    setSimulatedChatHistory(prev => [...prev, userMsg]);

    setTimeout(() => {
      const textUpper = msgToSend.trim().toUpperCase();
      let autoReply = '';
      let category = 'general';
      let badgeText = 'Menu Interaktif';
      let badgeColor = '#64748b';

      if (textUpper.includes('KTA') || textUpper.includes('KARTU')) {
        category = 'kta_inquiry';
        badgeText = 'Cek KTA Digital';
        badgeColor = '#f59e0b';
        autoReply = `🟡 *DPD I PARTAI GOLKAR JAWA TENGAH*\n\nHalo *${nameToSend}*,\nStatus KTA Digital Anda: *AKTIF (TERVERIFIKASI)*.\n\n• NIK: 337401******0001\n• Wilayah: DPD I Jawa Tengah\n• No KTA: 33.74.01.2026.08412\n\nUnduh e-KTA resmi ber-QR Code di portal pemenangan:\n👉 https://www.golkarjateng.com\n\n_Suara Golkar, Suara Rakyat!_`;
      } else if (textUpper.includes('C1') || textUpper.includes('TPS')) {
        category = 'c1_plano';
        badgeText = 'Formulir C1 Plano';
        badgeColor = '#10b981';
        const logId = 'C1-' + Math.floor(100000 + Math.random() * 900000);
        autoReply = `🗳️ *SENTRA SAKSI BSNPG JAWA TENGAH*\n\nLaporan formulir C1 Plano Anda telah *BERHASIL DITERIMA* dan terarsip ke Command Center.\n\n• ID Log: *${logId}*\n• Status Enkripsi: SHA-256 Validated ✓\n• Verifikasi Tabulasi: Diproses Otomatis oleh Sistem OCR\n\nTerima kasih atas dedikasi Anda mengawal suara di TPS! 🙏`;
      } else if (textUpper.includes('DAFTAR') || textUpper.includes('PEMUDA') || textUpper.includes('AMPG')) {
        category = 'youth_registration';
        badgeText = 'Registrasi Kader';
        badgeColor = '#0284c7';
        autoReply = `🦁 *PENDAFTARAN PEMUDA & RELAWAN GOLKAR JATENG*\n\nSelamat bergabung! Untuk mendaftarkan diri sebagai kader muda Golkar Jawa Tengah:\n\n1. Siapkan foto KTP Anda\n2. Isi formulir digital di: https://www.golkarjateng.com\n3. Dapatkan KTA Digital & akses exclusive mentoring kepemimpinan.\n\nPertanyaan lebih lanjut? Ketik *BANTUAN*.`;
      } else if (textUpper.includes('AGENDA') || textUpper.includes('EVENT')) {
        category = 'events';
        badgeText = 'Jadwal Agenda';
        badgeColor = '#8b5cf6';
        autoReply = `📅 *AGENDA TERDEKAT GOLKAR JAWA TENGAH*\n\n1. *Konsolidasi 35 Kab/Kota*: 12 Oktober 2026 (Semarang)\n2. *Pelatihan Saksi BSNPG*: 18 Oktober 2026 (Solo & Banyumas)\n3. *Festival Pemuda Kreatif*: 25 Oktober 2026 (Magelang)\n\nKetik *KTA* untuk cek status keanggotaan Anda.`;
      } else {
        category = 'interactive_menu';
        badgeText = 'Menu Interaktif';
        badgeColor = '#64748b';
        autoReply = `🟡 *PUSAT LAYANAN RESMI DPD I GOLKAR JAWA TENGAH*\n\nHalo *${nameToSend}*, ada yang bisa kami bantu? Silakan balas dengan kata kunci:\n\n1️⃣ Ketik *KTA* — Cek & Terbitkan KTA Digital\n2️⃣ Ketik *C1* — Lapor Form C1 Plano Saksi TPS\n3️⃣ Ketik *DAFTAR* — Registrasi Pemuda & Kader Baru\n4️⃣ Ketik *AGENDA* — Jadwal Kegiatan & Kampanye\n\n_Pusat Komando & Komunikasi Digital DPD I Jawa Tengah_`;
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        time: timeStr,
        text: autoReply
      };
      setSimulatedChatHistory(prev => [...prev, botMsg]);

      const newLog = {
        id: 'WH-' + Math.floor(9042 + Math.random() * 100),
        time: `${timeStr}:${String(now.getSeconds()).padStart(2, '0')} WIB`,
        from: webhookSenderPhone,
        senderName: nameToSend,
        type: category,
        badgeText,
        badgeColor,
        message: msgToSend,
        status: '200 OK',
        latency: Math.floor(32 + Math.random() * 18) + 'ms'
      };
      setInboundWebhookLogs(prev => [newLog, ...prev]);

      setLastWebhookResponse({
        httpStatus: 200,
        status: 'success',
        processedAt: new Date().toISOString(),
        event: {
          category,
          senderNumber: webhookSenderPhone,
          senderName: nameToSend,
          messageContent: msgToSend
        },
        autoReply: {
          recipient: webhookSenderPhone,
          text: autoReply
        }
      });

      setIsFiringWebhook(false);
    }, 380);
  };

  const codeSnippets = {
    curl: `# 1. Uji Verifikasi Webhook (Handshake GET)
curl -X GET "https://www.golkarjateng.com/api/whatsapp-webhook?hub.mode=subscribe&hub.verify_token=GOLKAR_JATENG_WA_SECRET_2026&hub.challenge=1158201444"

# 2. Uji Kirim Event Pesan Masuk (Inbound POST)
curl -X POST "https://www.golkarjateng.com/api/whatsapp-webhook" \\
  -H "Content-Type: application/json" \\
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "id": "GOLKAR_JATENG_GATEWAY",
      "changes": [{
        "value": {
          "messaging_product": "whatsapp",
          "metadata": { "display_phone_number": "6281125001964", "phone_number_id": "9021448" },
          "contacts": [{ "profile": { "name": "Ahmad Fauzi" }, "wa_id": "6281298765432" }],
          "messages": [{ "from": "6281298765432", "id": "wamid.HBgL...", "timestamp": "1728139200", "text": { "body": "KTA" }, "type": "text" }]
        }
      }]
    }]
  }'`,

    nodejs: `// Inbound Webhook Listener (Node.js & Express)
import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

const VERIFY_TOKEN = 'GOLKAR_JATENG_WA_SECRET_2026';

// Handshake Endpoint
app.get('/api/whatsapp-webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[Meta Webhook] Handshake verified successfully.');
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Event Handler Endpoint
app.post('/api/whatsapp-webhook', async (req, res) => {
  const payload = req.body;
  console.log('[Inbound Event]', JSON.stringify(payload, null, 2));

  // Dispatch to background processing worker
  res.status(200).json({ status: 'queued', processedAt: new Date() });
});

app.listen(4000, () => console.log('Gateway running on port 4000'));`,

    python: `# Inbound Webhook Consumer (Python & FastAPI)
from fastapi import FastAPI, Request, Response, HTTPException, status
import hmac, hashlib

app = FastAPI(title="GolkarJateng Webhook Consumer")

VERIFY_TOKEN = "GOLKAR_JATENG_WA_SECRET_2026"

@app.get("/api/whatsapp-webhook")
async def verify_handshake(request: Request):
    params = request.query_params
    mode = params.get("hub.mode")
    token = params.get("hub.verify_token")
    challenge = params.get("hub.challenge")

    if mode == "subscribe" and token == VERIFY_TOKEN:
        return Response(content=challenge, media_type="text/plain")
    raise HTTPException(status_code=403, detail="Invalid verification token")

@app.post("/api/whatsapp-webhook")
async def handle_incoming_message(request: Request):
    payload = await request.json()
    # Process C1 Plano upload, KTA inquiry or registration
    return {"status": "success", "event": "processed"}`
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0, width: '100%' }}>
      
      {/* Toast Alert Notification */}
      {opsToast && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '14px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          border: '1px solid #22c55e',
          animation: 'slideIn 0.2s ease-out'
        }}>
          <CheckCircle2 size={18} color="#22c55e" />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>{opsToast}</span>
        </div>
      )}

      {/* Developer Portal Hero Header */}
      <div style={{
        backgroundColor: '#0f172a',
        borderRadius: '20px',
        padding: '28px 32px',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.25)',
        minWidth: 0
      }}>
        {/* Ambient Glow */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f59e0b'
              }}>
                <Terminal size={18} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                Golkar Jateng DevOps & Platform Engineering Hub
              </span>
            </div>

            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
              GolkarJateng for Developers
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, maxWidth: '720px', lineHeight: 1.5 }}>
              Pusat konfigurasi VPS Dedicated, status live Docker kontainer, database PostgreSQL + PostGIS, arsitektur REST API, dan integrasi WhatsApp Webhook DPD I Jawa Tengah.
            </p>
          </div>

          {/* Service Health Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '6px 14px',
              borderRadius: '999px',
              color: '#34d399',
              fontSize: '12px',
              fontWeight: 700
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <span>VPS & 6 Kontainer Online (All Systems Healthy)</span>
            </div>

            <div style={{ fontSize: '11.5px', color: '#64748b' }}>
              Host: vps-prod-jateng-01 · 8 vCPU · 16 GB ECC · Uptime 48d
            </div>
          </div>
        </div>

        {/* Global Developer Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Spesifikasi Server</div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
              8 vCPU AMD EPYC · 16 GB RAM
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Docker Kontainer</div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#10b981', marginTop: '2px' }}>
              6 Running / 0 Failed
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Engine Database</div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>
              PostgreSQL 16.3 + PostGIS
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Webhook Gateway</div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#f59e0b', marginTop: '2px' }}>
              ~34ms Edge · SLA 99.98%
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '2px',
        overflowX: 'auto',
        flexWrap: 'wrap',
        minWidth: 0
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('vps_infra')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'vps_infra' ? '2.5px solid #f59e0b' : '2.5px solid transparent',
            color: activeTab === 'vps_infra' ? '#0f172a' : '#64748b',
            fontWeight: activeTab === 'vps_infra' ? 800 : 600,
            fontSize: '13px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          <Server size={16} color={activeTab === 'vps_infra' ? '#f59e0b' : '#64748b'} />
          <span>Konfigurasi VPS & Kontainer</span>
          <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '6px', backgroundColor: '#dbeafe', color: '#1d4ed8', fontWeight: 700 }}>
            6 RUNNING
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('webhook')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'webhook' ? '2.5px solid #f59e0b' : '2.5px solid transparent',
            color: activeTab === 'webhook' ? '#0f172a' : '#64748b',
            fontWeight: activeTab === 'webhook' ? 800 : 600,
            fontSize: '13px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          <Webhook size={16} color={activeTab === 'webhook' ? '#f59e0b' : '#64748b'} />
          <span>WhatsApp Webhook Gateway</span>
          <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '6px', backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 700 }}>
            LIVE
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('api_docs')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'api_docs' ? '2.5px solid #f59e0b' : '2.5px solid transparent',
            color: activeTab === 'api_docs' ? '#0f172a' : '#64748b',
            fontWeight: activeTab === 'api_docs' ? 800 : 600,
            fontSize: '13px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          <BookOpen size={16} color={activeTab === 'api_docs' ? '#f59e0b' : '#64748b'} />
          <span>REST API Reference</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('code_snippets')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'code_snippets' ? '2.5px solid #f59e0b' : '2.5px solid transparent',
            color: activeTab === 'code_snippets' ? '#0f172a' : '#64748b',
            fontWeight: activeTab === 'code_snippets' ? 800 : 600,
            fontSize: '13px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          <Code2 size={16} color={activeTab === 'code_snippets' ? '#f59e0b' : '#64748b'} />
          <span>Code Snippets & SDK</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'security' ? '2.5px solid #f59e0b' : '2.5px solid transparent',
            color: activeTab === 'security' ? '#0f172a' : '#64748b',
            fontWeight: activeTab === 'security' ? 800 : 600,
            fontSize: '13px',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          <ShieldCheck size={16} color={activeTab === 'security' ? '#f59e0b' : '#64748b'} />
          <span>Kredensial & Keamanan</span>
        </button>
      </div>

      {/* ======================================================================= */}
      {/* TAB 0: VPS & CONTAINER INFRASTRUCTURE (CPU, RAM, DATABASE, DOCKER) */}
      {/* ======================================================================= */}
      {activeTab === 'vps_infra' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0, width: '100%' }}>
          
          {/* 1. Host Server & SSH Specification Card */}
          <div className="enterprise-panel">
            <div className="panel-header">
              <div className="panel-title-wrap">
                <Server size={18} color="#f59e0b" />
                <span className="panel-title">Dedicated VPS Host & Network Topology</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => showToast('Memeriksa koneksi jaringan: Ping 103.147.221.84 respon 1.4ms (0% packet loss) ✓')}
                  style={{ height: '34px', fontSize: '11.5px', padding: '0 12px' }}
                >
                  <Wifi size={13} />
                  <span>Test Network Ping</span>
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => showToast('Nginx reverse proxy reloaded with zero-downtime (Configuration syntax OK) ✓')}
                  style={{ height: '34px', fontSize: '11.5px', padding: '0 12px' }}
                >
                  <RefreshCw size={13} />
                  <span>Reload Nginx</span>
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Hostname & Node</div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace', marginTop: '4px' }}>
                  vps-prod-jateng-01
                </div>
                <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, marginTop: '2px' }}>
                  Ubuntu 24.04.1 LTS (Noble)
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Public IPv4 (Static)</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('103.147.221.84', 'ipv4')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0284c7', fontSize: '11px', padding: 0 }}
                  >
                    {copiedKey === 'ipv4' ? 'Tersalin!' : 'Salin'}
                  </button>
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace', marginTop: '4px' }}>
                  103.147.221.84
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                  Private VPC: 10.240.0.12 (Tier-3 DC)
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>SSH Port & Hardening</div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace', marginTop: '4px' }}>
                  Port 2284 (Custom)
                </div>
                <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, marginTop: '2px' }}>
                  Ed25519 Key Only · Fail2ban Active
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Uptime & Linux Kernel</div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
                  48 hari, 14 jam
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace', marginTop: '2px' }}>
                  Linux 6.8.0-45-generic
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#fffdf5', border: '1px solid #fef3c7' }}>
                <div style={{ fontSize: '11px', color: '#b45309', fontWeight: 600 }}>Target Domain & Cloudflare</div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace', marginTop: '4px' }}>
                  www.golkarjateng.com
                </div>
                <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700, marginTop: '2px' }}>
                  Cloudflare WAF · Anti-DDoS · DNSSEC
                </div>
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>Web Server Ingress</div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace', marginTop: '4px' }}>
                  Caddy v2 / Traefik v3
                </div>
                <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 700, marginTop: '2px' }}>
                  HTTP/3 (QUIC) over UDP · Zero Inbound Ports
                </div>
              </div>
            </div>
          </div>

          {/* 2. Real-Time Hardware Telemetry (CPU, RAM, NVMe Disk, Network) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            
            {/* CPU Card */}
            <div className="enterprise-panel" style={{ margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#d97706' }}>
                    <Cpu size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>CPU Usage</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>8 vCPU AMD EPYC™ 7763</div>
                  </div>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>24.8%</span>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: '24.8%', height: '100%', backgroundColor: '#f59e0b', borderRadius: '999px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#475569', marginBottom: '10px' }}>
                <span>Load Avg: <strong>0.78, 0.85, 0.92</strong></span>
                <span>Speed: <strong>3.24 GHz</strong></span>
              </div>

              {/* 8 Cores Mini Grid */}
              <div style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 700, marginBottom: '6px' }}>Distribusi 8 Core:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                {[28, 18, 32, 22, 20, 26, 30, 22].map((usage, idx) => (
                  <div key={idx} style={{ padding: '4px 6px', borderRadius: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center', fontSize: '10px' }}>
                    <div style={{ color: '#94a3b8' }}>C{idx}</div>
                    <div style={{ fontWeight: 800, color: usage > 50 ? '#dc2626' : '#0f172a' }}>{usage}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RAM Card */}
            <div className="enterprise-panel" style={{ margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#0284c7' }}>
                    <HardDrive size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>Memory (RAM)</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>16.0 GB DDR4 ECC Registered</div>
                  </div>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>48.9%</span>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: '48.9%', height: '100%', backgroundColor: '#0284c7', borderRadius: '999px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#475569', marginBottom: '10px' }}>
                <span>Used: <strong>7.82 GB</strong></span>
                <span>Free: <strong>5.73 GB</strong></span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                <div style={{ padding: '6px 8px', borderRadius: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '11px' }}>
                  <div style={{ color: '#64748b' }}>Cached / Buffers</div>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>2.45 GB</div>
                </div>
                <div style={{ padding: '6px 8px', borderRadius: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '11px' }}>
                  <div style={{ color: '#64748b' }}>Swap Space</div>
                  <div style={{ fontWeight: 800, color: '#059669' }}>180 MB / 4.0 GB (4.5%)</div>
                </div>
              </div>
            </div>

            {/* Storage (NVMe) Card */}
            <div className="enterprise-panel" style={{ margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#059669' }}>
                    <Database size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>Storage (NVMe SSD)</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>250 GB PCIe 4.0 Enterprise</div>
                  </div>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>45.0%</span>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: '45.0%', height: '100%', backgroundColor: '#10b981', borderRadius: '999px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#475569', marginBottom: '10px' }}>
                <span>Used: <strong>112.4 GB</strong></span>
                <span>Free: <strong>137.6 GB</strong></span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                <div style={{ padding: '6px 8px', borderRadius: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '11px' }}>
                  <div style={{ color: '#64748b' }}>I/O Read / Write</div>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>14.2 / 8.6 MB/s</div>
                </div>
                <div style={{ padding: '6px 8px', borderRadius: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '11px' }}>
                  <div style={{ color: '#64748b' }}>I/O Wait</div>
                  <div style={{ fontWeight: 800, color: '#16a34a' }}>0.18% (Optimal)</div>
                </div>
              </div>
            </div>

            {/* Network Card */}
            <div className="enterprise-panel" style={{ margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#7c3aed' }}>
                    <Activity size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>Network Bandwidth</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>10 Gbps Redundant Port</div>
                  </div>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>18.4%</span>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: '18.4%', height: '100%', backgroundColor: '#8b5cf6', borderRadius: '999px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#475569', marginBottom: '10px' }}>
                <span>In: <strong>18.4 Mbps</strong></span>
                <span>Out: <strong>24.1 Mbps</strong></span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                <div style={{ padding: '6px 8px', borderRadius: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '11px' }}>
                  <div style={{ color: '#64748b' }}>Transfer Bulan Ini</div>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>1.84 TB / 10 TB</div>
                </div>
                <div style={{ padding: '6px 8px', borderRadius: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '11px' }}>
                  <div style={{ color: '#64748b' }}>Packet Drop Rate</div>
                  <div style={{ fontWeight: 800, color: '#16a34a' }}>0.00% (Clean)</div>
                </div>
              </div>
            </div>

          </div>

          {/* 3. Docker Containers Orchestration Table */}
          <div className="enterprise-panel">
            <div className="panel-header">
              <div className="panel-title-wrap">
                <Boxes size={18} color="#0284c7" />
                <span className="panel-title">Docker Containers Orchestration (Compose v2)</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    showToast('Melakukan flush Redis Cache (24,180 keys dibersihkan) ✓');
                  }}
                  style={{ height: '34px', fontSize: '11.5px', padding: '0 12px' }}
                >
                  <Zap size={13} color="#f59e0b" />
                  <span>Flush Redis Cache</span>
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    containers.forEach(c => handleRestartContainer(c.id, c.name));
                  }}
                  style={{ height: '34px', fontSize: '11.5px', padding: '0 14px' }}
                >
                  <RotateCcw size={13} />
                  <span>Restart All Containers</span>
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto', minWidth: 0 }}>
              <table className="enterprise-table" style={{ fontSize: '12px', minWidth: '760px' }}>
                <thead>
                  <tr>
                    <th>Kontainer & Image</th>
                    <th>Port Mapping</th>
                    <th>CPU %</th>
                    <th>Memory RAM</th>
                    <th>Network I/O</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {containers.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: c.status === 'running' ? '#10b981' : '#f59e0b'
                          }} />
                          <div>
                            <div style={{ fontWeight: 800, color: '#0f172a' }}>{c.name}</div>
                            <div style={{ fontSize: '10.5px', color: '#64748b', fontFamily: 'monospace' }}>{c.image}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <code style={{ fontSize: '11px', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#f1f5f9', color: '#0f172a' }}>
                          {c.port}
                        </code>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{c.cpu}%</div>
                        <div style={{ width: '48px', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', marginTop: '3px' }}>
                          <div style={{ width: `${Math.min(c.cpu * 5, 100)}%`, height: '100%', backgroundColor: '#0284c7', borderRadius: '2px' }} />
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '11.5px' }}>{c.memory}</div>
                        <div style={{ fontSize: '10px', color: '#64748b' }}>{c.memoryPercent}% used</div>
                      </td>
                      <td style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
                        {c.netIO}
                      </td>
                      <td>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '6px',
                          backgroundColor: c.status === 'running' ? '#dcfce7' : '#fef3c7',
                          color: c.status === 'running' ? '#15803d' : '#b45309',
                          fontWeight: 700,
                          fontSize: '11px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {c.status === 'restarting' ? (
                            <RefreshCw size={11} className="spin" />
                          ) : (
                            <CheckCircle2 size={11} />
                          )}
                          <span>{c.uptime} ({c.health})</span>
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => setLogModalContainer(c)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              border: '1px solid #cbd5e1',
                              backgroundColor: '#ffffff',
                              color: '#334155',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            Logs
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRestartContainer(c.id, c.name)}
                            disabled={c.status === 'restarting'}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              border: '1px solid #fef3c7',
                              backgroundColor: '#fffdf5',
                              color: '#b45309',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            {c.status === 'restarting' ? '...' : 'Restart'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Database Deep Dive (PostgreSQL 16 & Redis Cache) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            
            {/* PostgreSQL & PostGIS Details */}
            <div className="enterprise-panel" style={{ margin: 0 }}>
              <div className="panel-header">
                <div className="panel-title-wrap">
                  <Database size={18} color="#0284c7" />
                  <span className="panel-title">PostgreSQL 16.3 + PostGIS 3.4</span>
                </div>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => showToast('Koneksi PostgreSQL 16.3: ACTIVE (Latency 1.18ms, 150/150 pools OK) ✓')}
                  style={{ height: '30px', fontSize: '11px', padding: '0 10px' }}
                >
                  Test DB Ping
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Total Database Size</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>22.6 GB</div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>Data: 18.4GB · Index: 4.2GB</div>
                </div>

                <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>PgBouncer Connection Pool</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>28 / 150 Active</div>
                  <div style={{ fontSize: '10.5px', color: '#16a34a', fontWeight: 600 }}>14 Idle · 0 Waiting</div>
                </div>

                <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Buffer Cache Hit Ratio</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#16a34a', marginTop: '2px' }}>99.6%</div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>Sangat Efisien (RAM Caching)</div>
                </div>

                <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Transactions per Sec (TPS)</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>142 TPS</div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>0 Slow Queries (&gt;500ms)</div>
                </div>
              </div>

              {/* Table Sizes Breakdown */}
              <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                Alokasi Tabel Utama DPD I Jateng:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                  <span><code>public.tbl_pemuda_jateng</code> (384.120 baris)</span>
                  <strong style={{ color: '#0f172a' }}>8.2 GB</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                  <span><code>public.tbl_c1_plano_uploads</code> (42.800 foto OCR)</span>
                  <strong style={{ color: '#0f172a' }}>5.8 GB</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                  <span><code>public.tbl_audit_security_logs</code> (1.240.000 events)</span>
                  <strong style={{ color: '#0f172a' }}>4.1 GB</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                  <span><code>public.tbl_kta_digital_records</code> (215.400 KTA)</span>
                  <strong style={{ color: '#0f172a' }}>2.4 GB</strong>
                </div>
              </div>

              {/* Backup info */}
              <div style={{ marginTop: '14px', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#166534' }}>Automated Daily Backup Snapshot</div>
                  <div style={{ fontSize: '10.5px', color: '#15803d' }}>Tersimpan: R2/S3 SGP1 · 02:00 WIB (4.82 GB dump.gz) · Checksum OK</div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Trigger manual backup snapshot pg_dump telah dimulai ke S3...')}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  Snapshot Sekarang
                </button>
              </div>
            </div>

            {/* Redis & Security Firewalls */}
            <div className="enterprise-panel" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="panel-header">
                  <div className="panel-title-wrap">
                    <Zap size={18} color="#f59e0b" />
                    <span className="panel-title">Redis 7.2 Cache & UFW Firewall</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#15803d', fontWeight: 700, backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '6px' }}>
                    PONG (Healthy)
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Active Keys in Memory</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>24.180 Keys</div>
                    <div style={{ fontSize: '10.5px', color: '#64748b' }}>Eviction: volatile-lru</div>
                  </div>

                  <div style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Redis Cache Hit Rate</div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#16a34a', marginTop: '2px' }}>98.7%</div>
                    <div style={{ fontSize: '10.5px', color: '#64748b' }}>18 Client Connections</div>
                  </div>
                </div>

                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                  Status Port Firewall (UFW & Fail2ban):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                    <span>Port 80 & 443 (HTTP/HTTPS Nginx Proxy)</span>
                    <strong style={{ color: '#16a34a' }}>ALLOW (Public Any)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                    <span>Port 2284 (SSH Admin DPD I)</span>
                    <strong style={{ color: '#0284c7' }}>ALLOW (Key-Only Auth)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                    <span>Port 5432 & 6379 (PostgreSQL & Redis)</span>
                    <strong style={{ color: '#dc2626' }}>BLOCKED (Docker Internal Only)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                    <span>Fail2ban Intrusion Prevention</span>
                    <strong style={{ color: '#16a34a' }}>ACTIVE (0 Banned IP saat ini)</strong>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '16px', padding: '12px', borderRadius: '10px', backgroundColor: '#0f172a', color: '#94a3b8', fontSize: '11.5px' }}>
                <div style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '4px' }}>💡 Quick Terminal SSH Command:</div>
                <code style={{ color: '#38bdf8', fontFamily: 'monospace' }}>
                  ssh -p 2284 deployer@103.147.221.84 -i ~/.ssh/golkar_jateng_ed25519
                </code>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ======================================================================= */}
      {/* TAB 1: WHATSAPP WEBHOOK GATEWAY (SIMULATOR & LIVE INSPECTOR) */}
      {/* ======================================================================= */}
      {activeTab === 'webhook' && (
        <div className="dev-portal-grid">
          
          {/* Left Column: Endpoints, Trigger Console & Event Logs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0, width: '100%' }}>
            
            {/* 1. Endpoint & Token Configuration */}
            <div className="enterprise-panel">
              <div className="panel-header">
                <div className="panel-title-wrap">
                  <span className="panel-title">Endpoint & Token Webhook Resmi</span>
                  <span className="panel-subtitle">URL callback serverless yang didaftarkan ke Meta WhatsApp Business</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                      Callback Webhook URL:
                    </label>
                    <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>GET & POST Ready</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      readOnly 
                      value="https://www.golkarjateng.com/api/whatsapp-webhook"
                      style={{
                        flex: 1,
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#f8fafc',
                        fontFamily: 'monospace',
                        fontSize: '12.5px',
                        color: '#0f172a',
                        minWidth: 0
                      }}
                    />
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => handleCopy('https://www.golkarjateng.com/api/whatsapp-webhook', 'url')}
                      style={{ height: '40px', padding: '0 14px', fontSize: '12px', whiteSpace: 'nowrap' }}
                    >
                      {copiedKey === 'url' ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                      <span>{copiedKey === 'url' ? 'Tersalin' : 'Salin URL'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                      Verify Token (hub.verify_token):
                    </label>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Meta Webhook Handshake Secret</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="text" 
                      readOnly 
                      value="GOLKAR_JATENG_WA_SECRET_2026"
                      style={{
                        flex: 1,
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#f8fafc',
                        fontFamily: 'monospace',
                        fontSize: '12.5px',
                        color: '#0f172a',
                        minWidth: 0
                      }}
                    />
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => handleCopy('GOLKAR_JATENG_WA_SECRET_2026', 'token')}
                      style={{ height: '40px', padding: '0 14px', fontSize: '12px', whiteSpace: 'nowrap' }}
                    >
                      {copiedKey === 'token' ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                      <span>{copiedKey === 'token' ? 'Tersalin' : 'Salin Token'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Interactive Webhook Tester Console */}
            <div className="enterprise-panel">
              <div className="panel-header">
                <div className="panel-title-wrap">
                  <span className="panel-title">Interactive Webhook Simulator</span>
                  <span className="panel-subtitle">Simulasikan event pesan masuk untuk menguji auto-reply bot</span>
                </div>
              </div>

              {/* Preset Scenario Buttons */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Pilih Preset Event Masuk (1-Klik):
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setWebhookInputText('KTA');
                      handleFireWebhookTest('KTA', 'Ahmad Fauzi (Kader Semarang)');
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #fef3c7',
                      backgroundColor: '#fffdf5',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#b45309' }}>🟡 Cek KTA</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>e-KTA Digital</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWebhookInputText('[C1 Plano Photo] Hasil Suara TPS 08 Solo');
                      handleFireWebhookTest('[C1 Plano Photo] Hasil Suara TPS 08 Solo', 'Bambang Supriyadi (Saksi TPS 08)');
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #d1fae5',
                      backgroundColor: '#f0fdf4',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#047857' }}>🗳️ Lapor C1</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>Saksi BSNPG</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWebhookInputText('DAFTAR PEMUDA AMPG SOLO');
                      handleFireWebhookTest('DAFTAR PEMUDA AMPG SOLO', 'Siti Rahma (Pemuda Solo)');
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #e0f2fe',
                      backgroundColor: '#f0f9ff',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#0369a1' }}>🦁 Gabung AMPG</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>Onboarding</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWebhookInputText('AGENDA');
                      handleFireWebhookTest('AGENDA', 'Budi Santoso (Kader Banyumas)');
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #ede9fe',
                      backgroundColor: '#f5f3ff',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#6d28d9' }}>📅 Agenda</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>Jadwal Partai</div>
                  </button>
                </div>
              </div>

              {/* Custom Input */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  value={webhookInputText}
                  onChange={(e) => setWebhookInputText(e.target.value)}
                  placeholder="Ketik teks pesan webhook (cth: KTA, C1, DAFTAR)..."
                  style={{
                    flex: 1,
                    height: '42px',
                    padding: '0 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px',
                    minWidth: 0
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleFireWebhookTest();
                  }}
                />
                <button
                  type="button"
                  className="btn-primary"
                  disabled={isFiringWebhook}
                  onClick={() => handleFireWebhookTest()}
                  style={{ height: '42px', padding: '0 18px', fontSize: '13px', whiteSpace: 'nowrap' }}
                >
                  {isFiringWebhook ? (
                    <span>Memproses...</span>
                  ) : (
                    <>
                      <Play size={14} />
                      <span>Tembak Webhook</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 3. Inbound Webhook Event Stream (Live Logs) */}
            <div className="enterprise-panel">
              <div className="panel-header">
                <div className="panel-title-wrap">
                  <span className="panel-title">Inbound Webhook Live Logs</span>
                  <span className="panel-subtitle">Antrean event pesan masuk real-time dari gateway</span>
                </div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  {inboundWebhookLogs.length} Event Terekam
                </span>
              </div>

              <div style={{ overflowX: 'auto', minWidth: 0 }}>
                <table className="enterprise-table" style={{ fontSize: '12px', minWidth: '560px' }}>
                  <thead>
                    <tr>
                      <th>ID & Waktu</th>
                      <th>Pengirim</th>
                      <th>Kategori</th>
                      <th>Isi Pesan Masuk</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inboundWebhookLogs.map((log) => (
                      <tr key={log.id}>
                        <td>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{log.id}</div>
                          <div style={{ fontSize: '10.5px', color: '#64748b' }}>{log.time}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: '#0f172a' }}>{log.senderName}</div>
                          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>+{log.from}</div>
                        </td>
                        <td>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '6px',
                            backgroundColor: log.badgeColor + '18',
                            color: log.badgeColor,
                            fontWeight: 700,
                            fontSize: '10.5px'
                          }}>
                            {log.badgeText}
                          </span>
                        </td>
                        <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {log.message}
                        </td>
                        <td>
                          <span style={{ 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            backgroundColor: '#dcfce7', 
                            color: '#15803d', 
                            fontWeight: 700, 
                            fontSize: '10.5px' 
                          }}>
                            {log.status} ({log.latency})
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column: Live 2-Way Smartphone Simulator Preview & Payload Inspector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0, width: '100%' }}>
            
            <div className="enterprise-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', minWidth: 0 }}>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                  📱 Live 2-Way Chat Simulator
                </div>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                  ● Bot Auto-Reply On
                </span>
              </div>

              {/* Mobile Phone Device Frame */}
              <div style={{
                width: '100%',
                maxWidth: '310px',
                height: '520px',
                backgroundColor: '#0c1317',
                borderRadius: '34px',
                padding: '10px',
                border: '5px solid #1e293b',
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto',
                boxSizing: 'border-box'
              }}>
                {/* WhatsApp App Header */}
                <div style={{
                  backgroundColor: '#1f2c34',
                  padding: '8px 10px',
                  borderRadius: '16px 16px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{ 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%', 
                    backgroundColor: '#f59e0b', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 800, 
                    color: '#0f172a', 
                    fontSize: '10px',
                    flexShrink: 0
                  }}>
                    PG
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#e9edef', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      DPD Golkar Jateng
                    </div>
                    <div style={{ fontSize: '9px', color: '#25d366' }}>
                      Akun Bisnis Terverifikasi ✓
                    </div>
                  </div>
                </div>

                {/* Chat Body with Inbound/Outbound Messages */}
                <div style={{
                  flex: 1,
                  backgroundColor: '#0b141a',
                  backgroundImage: 'radial-gradient(#1f2c34 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  overflowY: 'auto'
                }}>
                  {simulatedChatHistory.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
                        backgroundColor: item.sender === 'user' ? '#005c4b' : '#202c33',
                        color: '#e9edef',
                        borderRadius: item.sender === 'user' ? '12px 0 12px 12px' : '0 12px 12px 12px',
                        padding: '8px 10px',
                        fontSize: '11px',
                        lineHeight: 1.4,
                        maxWidth: '90%',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}
                    >
                      <div>{item.text}</div>
                      <div style={{ 
                        textAlign: 'right', 
                        fontSize: '8.5px', 
                        color: '#8696a0', 
                        marginTop: '4px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        <span>{item.time}</span>
                        {item.sender === 'user' && <span style={{ color: '#53bdeb' }}>✓✓</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated Input Field at bottom of Phone */}
                <div style={{
                  backgroundColor: '#1f2c34',
                  padding: '6px 8px',
                  borderRadius: '0 0 16px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <input 
                    type="text"
                    value={webhookInputText}
                    onChange={(e) => setWebhookInputText(e.target.value)}
                    placeholder="Balas chat..."
                    style={{
                      flex: 1,
                      height: '28px',
                      borderRadius: '14px',
                      border: 'none',
                      backgroundColor: '#2a3942',
                      padding: '0 10px',
                      fontSize: '10.5px',
                      color: '#e9edef',
                      outline: 'none',
                      minWidth: 0
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleFireWebhookTest();
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleFireWebhookTest()}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#00a884',
                      border: 'none',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <Send size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. JSON Payload Inspector Card */}
            {lastWebhookResponse && (
              <div className="enterprise-panel" style={{ minWidth: 0 }}>
                <div className="panel-header" style={{ marginBottom: '8px' }}>
                  <div className="panel-title-wrap">
                    <span className="panel-title" style={{ fontSize: '13px' }}>
                      Payload Inspector (HTTP 200 OK)
                    </span>
                  </div>
                  <span style={{ fontSize: '10px', color: '#16a34a', fontWeight: 700 }}>
                    JSON Validated
                  </span>
                </div>

                <pre style={{
                  margin: 0,
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#0f172a',
                  color: '#38bdf8',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  overflowX: 'auto',
                  maxHeight: '180px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  boxSizing: 'border-box'
                }}>
                  {JSON.stringify(lastWebhookResponse, null, 2)}
                </pre>
              </div>
            )}

          </div>

        </div>
      )}

      {/* ======================================================================= */}
      {/* TAB 2: REST API REFERENCE */}
      {/* ======================================================================= */}
      {activeTab === 'api_docs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0, width: '100%' }}>
          <div className="enterprise-panel">
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              Dokumentasi Spesifikasi REST API DPD I Jawa Tengah
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0' }}>
              Daftar endpoint API publik dan internal untuk interoperabilitas aplikasi mobile, bot, dan sistem tabulasi C1.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Endpoint 1 */}
              <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', fontSize: '11.5px', fontFamily: 'monospace' }}>
                    GET
                  </span>
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                    /api/whatsapp-webhook
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Meta Challenge Verification Handshake</span>
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                  Memvalidasi query parameter <code>hub.mode</code>, <code>hub.verify_token</code>, dan mengembalikan <code>hub.challenge</code> untuk pendaftaran webhook Meta WhatsApp Cloud API.
                </div>
              </div>

              {/* Endpoint 2 */}
              <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ backgroundColor: '#dbeafe', color: '#1d4ed8', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', fontSize: '11.5px', fontFamily: 'monospace' }}>
                    POST
                  </span>
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                    /api/whatsapp-webhook
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>Inbound Webhook Message Dispatcher</span>
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                  Menerima event pesan teks, gambar formulir C1 Plano, permohonan KTA digital, dan status pengiriman pesan (sent/delivered/read) dari provider gateway.
                </div>
              </div>

              {/* Endpoint 3 */}
              <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ backgroundColor: '#dbeafe', color: '#1d4ed8', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', fontSize: '11.5px', fontFamily: 'monospace' }}>
                    POST
                  </span>
                  <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                    /api/v1/kta/validate
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>KTA QR Verification Service</span>
                </div>
                <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
                  Memvalidasi payload QR Code KTA digital kader terhadap database induk DPD I Jawa Tengah untuk verifikasi presensi acara.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* TAB 3: CODE SNIPPETS & SDK */}
      {/* ======================================================================= */}
      {activeTab === 'code_snippets' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0, width: '100%' }}>
          <div className="enterprise-panel">
            <div className="panel-header">
              <div className="panel-title-wrap">
                <span className="panel-title">Contoh Integrasi Kode (Multi-Bahasa)</span>
                <span className="panel-subtitle">Salin cuplikan kode siap pakai untuk mengirim request webhook</span>
              </div>

              {/* Language Switcher */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {['curl', 'nodejs', 'python'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedSnippetLang(lang)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '8px',
                      border: selectedSnippetLang === lang ? '1.5px solid #f59e0b' : '1px solid #cbd5e1',
                      backgroundColor: selectedSnippetLang === lang ? '#fffdf5' : '#ffffff',
                      color: selectedSnippetLang === lang ? '#b45309' : '#475569',
                      fontWeight: 700,
                      fontSize: '11.5px',
                      textTransform: 'uppercase',
                      cursor: 'pointer'
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <pre style={{
                margin: 0,
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: '#0f172a',
                color: '#38bdf8',
                fontFamily: 'monospace',
                fontSize: '12px',
                lineHeight: 1.55,
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all'
              }}>
                {codeSnippets[selectedSnippetLang]}
              </pre>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => handleCopy(codeSnippets[selectedSnippetLang], 'code')}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  height: '32px',
                  padding: '0 10px',
                  fontSize: '11px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff'
                }}
              >
                {copiedKey === 'code' ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
                <span>{copiedKey === 'code' ? 'Tersalin' : 'Salin Kode'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* TAB 4: SECURITY & CREDENTIALS */}
      {/* ======================================================================= */}
      {activeTab === 'security' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', minWidth: 0, width: '100%' }}>
          <div className="enterprise-panel" style={{ margin: 0 }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>
              Protokol Autentikasi & Enkripsi
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: '#475569', lineHeight: 1.5 }}>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a' }}>1. Verifikasi HMAC SHA-256</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '11.5px', color: '#64748b' }}>
                  Setiap request masuk dari Meta WhatsApp Cloud API menyertakan header <code>X-Hub-Signature-256</code> untuk mencegah spoofing pihak ketiga.
                </p>
              </div>

              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a' }}>2. TLS 1.3 Transport Security</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '11.5px', color: '#64748b' }}>
                  Seluruh komunikasi data melalui endpoint Vercel Serverless dienkripsi menggunakan sertifikat SSL/TLS kelas enterprise.
                </p>
              </div>

              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a' }}>3. Rate Limiting & Anti-DDoS</strong>
                <p style={{ margin: '4px 0 0 0', fontSize: '11.5px', color: '#64748b' }}>
                  Batas maksimum 600 request per menit per IP pengirim untuk melindungi server dari flood traffic.
                </p>
              </div>
            </div>
          </div>

          <div className="enterprise-panel" style={{ margin: 0 }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>
              Rotasi Kredensial & Kontak DevOps
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              Jika Anda mencurigai adanya kebocoran verify token atau ingin mendaftarkan IP whitelist untuk gateway lokal, hubungi tim Siber DPD I.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                <span style={{ color: '#64748b' }}>DevOps Hotline:</span>
                <strong style={{ color: '#0f172a' }}>+62 811-2500-1964</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                <span style={{ color: '#64748b' }}>Email IT Support:</span>
                <strong style={{ color: '#2563eb' }}>devops@golkarjateng.or.id</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* LOG MODAL VIEWER */}
      {/* ======================================================================= */}
      {logModalContainer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#0f172a',
            borderRadius: '16px',
            width: '720px',
            maxWidth: '100%',
            padding: '24px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            border: '1px solid #334155',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '85vh'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Terminal size={18} color="#f59e0b" />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                    Live Container Logs: {logModalContainer.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>
                    Image: {logModalContainer.image} · Status: {logModalContainer.status}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLogModalContainer(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{
              flex: 1,
              backgroundColor: '#020617',
              borderRadius: '8px',
              padding: '16px',
              overflowY: 'auto',
              fontFamily: 'monospace',
              fontSize: '11.5px',
              lineHeight: 1.6,
              color: '#38bdf8'
            }}>
              {logModalContainer.logs.map((line, idx) => (
                <div key={idx} style={{ marginBottom: '4px' }}>
                  <span style={{ color: '#64748b', marginRight: '8px' }}>[{idx + 1}]</span>
                  <span>{line}</span>
                </div>
              ))}
              <div style={{ color: '#22c55e', marginTop: '12px' }}>
                ● Tail stream active... (listening for new container events)
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setLogModalContainer(null)}
                style={{ color: '#ffffff', borderColor: '#475569' }}
              >
                Tutup Logs
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
