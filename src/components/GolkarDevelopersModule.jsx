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
  Sparkles
} from 'lucide-react';
import golkarLogo from '../assets/Logo_Golkar.webp';

export default function GolkarDevelopersModule({ onNavigateTab }) {
  const [activeTab, setActiveTab] = useState('webhook'); // 'webhook', 'api_docs', 'code_snippets', 'security'
  const [copiedKey, setCopiedKey] = useState(null);
  const [selectedSnippetLang, setSelectedSnippetLang] = useState('curl'); // 'curl', 'nodejs', 'python', 'php'

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
      text: '🟡 *DPD I PARTAI GOLKAR JAWA TENGAH*\n\nHalo *Ahmad Fauzi*,\nStatus KTA Digital Anda: *AKTIF (TERVERIFIKASI)*.\n\n• NIK: 337401******0001\n• Wilayah: DPD I Jawa Tengah\n• No KTA: 33.74.01.2026.08412\n\nUnduh e-KTA resmi ber-QR Code di portal:\n👉 https://golkarjateng.vercel.app\n\n_Suara Golkar, Suara Rakyat!_'
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
      message: 'Halo admin Golkar Jateng, mau tanya status KTA saya atas nama Ahmad Fauzi.',
      status: '200 OK',
      latency: '36ms'
    },
    {
      id: 'WH-9040',
      time: '14:15:02 WIB',
      from: '6285712344321',
      senderName: 'Bambang Supriyadi (Saksi Solo)',
      type: 'c1_plano',
      badgeText: 'Formulir C1 Plano',
      badgeColor: '#10b981',
      message: '[Foto Terlampir] Lapor hasil C1 Plano TPS 08 Pasar Kliwon Surakarta.',
      status: '200 OK',
      latency: '42ms'
    },
    {
      id: 'WH-9039',
      time: '14:02:44 WIB',
      from: '6282133445566',
      senderName: 'Rina Kartika (Pemuda Banyumas)',
      type: 'youth_registration',
      badgeText: 'Registrasi Kader',
      badgeColor: '#0284c7',
      message: 'DAFTAR PEMUDA GOLKAR BANYUMAS',
      status: '200 OK',
      latency: '39ms'
    }
  ]);

  const handleCopy = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleFireWebhookTest = (presetMessage = null, presetName = null) => {
    const msgToSend = presetMessage || webhookInputText;
    const nameToSend = presetName || webhookSenderName;
    if (!msgToSend.trim()) return;

    setIsFiringWebhook(true);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Add user message to chat immediately
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
        autoReply = `🟡 *DPD I PARTAI GOLKAR JAWA TENGAH*\n\nHalo *${nameToSend}*,\nStatus KTA Digital Anda: *AKTIF (TERVERIFIKASI)*.\n\n• NIK: 337401******0001\n• Wilayah: DPD I Jawa Tengah\n• No KTA: 33.74.01.2026.08412\n\nUnduh e-KTA resmi ber-QR Code di portal pemenangan:\n👉 https://golkarjateng.vercel.app\n\n_Suara Golkar, Suara Rakyat!_`;
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
        autoReply = `🦁 *PENDAFTARAN PEMUDA & RELAWAN GOLKAR JATENG*\n\nSelamat bergabung! Untuk mendaftarkan diri sebagai kader muda Golkar Jawa Tengah:\n\n1. Siapkan foto KTP Anda\n2. Isi formulir digital di: https://golkarjateng.vercel.app\n3. Dapatkan KTA Digital & akses exclusive mentoring kepemimpinan.\n\nPertanyaan lebih lanjut? Ketik *BANTUAN*.`;
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
curl -X GET "https://golkarjateng.vercel.app/api/whatsapp-webhook?hub.mode=subscribe&hub.verify_token=GOLKAR_JATENG_WA_SECRET_2026&hub.challenge=1158201444"

# 2. Uji Kirim Event Pesan Masuk (Inbound POST)
curl -X POST "https://golkarjateng.vercel.app/api/whatsapp-webhook" \\
  -H "Content-Type: application/json" \\
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "changes": [{
        "value": {
          "messages": [{
            "from": "6281298765432",
            "type": "text",
            "text": { "body": "KTA" }
          }],
          "contacts": [{
            "profile": { "name": "Ahmad Fauzi" }
          }]
        }
      }]
    }]
  }'`,

    nodejs: `// Node.js (ES Modules / Axios)
import axios from 'axios';

const WEBHOOK_URL = 'https://golkarjateng.vercel.app/api/whatsapp-webhook';

// Simulasi kirim pesan KTA
async function testInboundWebhook() {
  try {
    const response = await axios.post(WEBHOOK_URL, {
      sender: '6281298765432',
      name: 'Ahmad Fauzi',
      message: 'KTA'
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('Status HTTP:', response.status);
    console.log('Bot Response:', response.data.autoReply.text);
  } catch (error) {
    console.error('Error Webhook:', error.response?.data || error.message);
  }
}

testInboundWebhook();`,

    python: `# Python 3 (requests)
import requests

WEBHOOK_URL = "https://golkarjateng.vercel.app/api/whatsapp-webhook"

payload = {
    "sender": "6281298765432",
    "name": "Bambang Supriyadi",
    "message": "C1",
    "media": True
}

response = requests.post(WEBHOOK_URL, json=payload)
print(f"Status Code: {response.status_code}")
print("Response JSON:", response.json())`,

    php: `<?php
// PHP cURL Webhook Tester
$ch = curl_init('https://golkarjateng.vercel.app/api/whatsapp-webhook');

$payload = json_encode([
    'sender' => '6281298765432',
    'name' => 'Ahmad Fauzi',
    'message' => 'KTA'
]);

curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: $httpCode\\n";
echo "Response: $result\\n";
?>`
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Developer Portal Hero Header */}
      <div style={{
        backgroundColor: '#0f172a',
        borderRadius: '20px',
        padding: '32px',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.25)'
      }}>
        {/* Ambient Glow & Grid lines */}
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
                Golkar Jateng Open Platform & Dev Hub
              </span>
            </div>

            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
              GolkarJateng for Developers
            </h1>
            <p style={{ fontSize: '13.5px', color: '#94a3b8', margin: 0, maxWidth: '640px', lineHeight: 1.5 }}>
              Pusat dokumentasi arsitektur API, gateway integrasi WhatsApp Webhook, audit cryptographic C1 Plano, dan interoperabilitas sistem DPD I Jawa Tengah.
            </p>
          </div>

          {/* Service Health Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '999px',
              padding: '6px 14px',
              color: '#34d399',
              fontSize: '11.5px',
              fontWeight: 700
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <span>Vercel Serverless · All Systems Operational</span>
            </div>

            <div style={{ fontSize: '11.5px', color: '#64748b' }}>
              Meta Cloud API v20.0 · TLS 1.3 · SLA 99.98%
            </div>
          </div>
        </div>

        {/* Global Developer Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginTop: '28px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Webhook Endpoint</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', fontFamily: 'monospace', marginTop: '2px' }}>
              /api/whatsapp-webhook
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Rata-rata Latensi</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#10b981', marginTop: '2px' }}>
              ~36ms (Edge Invocations)
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Event Inbound Terlayani</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b', marginTop: '2px' }}>
              142.890 requests (35 Kab/Kota)
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Protokol Keamanan</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>
              SHA-256 HMAC Signature
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
        paddingBottom: '2px'
      }}>
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
            cursor: 'pointer'
          }}
        >
          <Webhook size={16} color={activeTab === 'webhook' ? '#f59e0b' : '#64748b'} />
          <span>WhatsApp Webhook Gateway</span>
          <span style={{ fontSize: '10.5px', padding: '2px 6px', borderRadius: '6px', backgroundColor: '#dcfce7', color: '#15803d', fontWeight: 700 }}>
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
            cursor: 'pointer'
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
            cursor: 'pointer'
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
            cursor: 'pointer'
          }}
        >
          <ShieldCheck size={16} color={activeTab === 'security' ? '#f59e0b' : '#64748b'} />
          <span>Kredensial & Keamanan</span>
        </button>
      </div>

      {/* ======================================================================= */}
      {/* TAB 1: WHATSAPP WEBHOOK GATEWAY (SIMULATOR & LIVE INSPECTOR) */}
      {/* ======================================================================= */}
      {activeTab === 'webhook' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: '24px' }}>
          
          {/* Left Column: Endpoints, Trigger Console & Event Logs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
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
                      value="https://golkarjateng.vercel.app/api/whatsapp-webhook"
                      style={{
                        flex: 1,
                        height: '40px',
                        padding: '0 12px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        backgroundColor: '#f8fafc',
                        fontFamily: 'monospace',
                        fontSize: '12.5px',
                        color: '#0f172a'
                      }}
                    />
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => handleCopy('https://golkarjateng.vercel.app/api/whatsapp-webhook', 'url')}
                      style={{ height: '40px', padding: '0 14px', fontSize: '12px' }}
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
                        color: '#0f172a'
                      }}
                    />
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => handleCopy('GOLKAR_JATENG_WA_SECRET_2026', 'token')}
                      style={{ height: '40px', padding: '0 14px', fontSize: '12px' }}
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setWebhookInputText('KTA');
                      setWebhookSenderName('Ahmad Fauzi (Kader Semarang)');
                      handleFireWebhookTest('KTA', 'Ahmad Fauzi (Kader Semarang)');
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #fef3c7',
                      backgroundColor: '#fffdf5',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#b45309' }}>🟡 Cek KTA</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>e-KTA Digital</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWebhookInputText('[C1 Plano Photo] Hasil Suara TPS 08 Solo');
                      setWebhookSenderName('Bambang Supriyadi (Saksi TPS 08)');
                      handleFireWebhookTest('[C1 Plano Photo] Hasil Suara TPS 08 Solo', 'Bambang Supriyadi (Saksi TPS 08)');
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #dcfce7',
                      backgroundColor: '#f0fdf4',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#15803d' }}>🗳️ Lapor C1</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>Saksi BSNPG</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWebhookInputText('DAFTAR PEMUDA GOLKAR BANYUMAS');
                      setWebhookSenderName('Rina Kartika (Pemuda)');
                      handleFireWebhookTest('DAFTAR PEMUDA GOLKAR BANYUMAS', 'Rina Kartika (Pemuda)');
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #e0f2fe',
                      backgroundColor: '#f0f9ff',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0369a1' }}>🦁 Gabung AMPG</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>Onboarding</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWebhookInputText('AGENDA KAMPANYE MINGGU INI');
                      setWebhookSenderName('Samsul Hadi (Relawan Magelang)');
                      handleFireWebhookTest('AGENDA KAMPANYE MINGGU INI', 'Samsul Hadi (Relawan Magelang)');
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: '1px solid #ede9fe',
                      backgroundColor: '#f5f3ff',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#6d28d9' }}>📅 Agenda</div>
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
                  placeholder="Ketik teks pesan webhook (cth: KTA, C1, DAFTAR, atau teks bebas)..."
                  style={{
                    flex: 1,
                    height: '42px',
                    padding: '0 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13px'
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
                  style={{ height: '42px', padding: '0 18px', fontSize: '13px' }}
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

              <div style={{ overflowX: 'auto' }}>
                <table className="enterprise-table" style={{ fontSize: '12px' }}>
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
                        <td style={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="enterprise-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
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
                width: '320px',
                height: '560px',
                backgroundColor: '#0c1317',
                borderRadius: '36px',
                padding: '12px',
                border: '6px solid #1e293b',
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.25)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* WhatsApp App Header */}
                <div style={{
                  backgroundColor: '#1f2c34',
                  padding: '10px 12px',
                  borderRadius: '16px 16px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{ 
                    width: '30px', 
                    height: '30px', 
                    borderRadius: '50%', 
                    backgroundColor: '#f59e0b', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 800, 
                    color: '#0f172a', 
                    fontSize: '11px' 
                  }}>
                    PG
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#e9edef' }}>
                      DPD Golkar Jateng
                    </div>
                    <div style={{ fontSize: '9.5px', color: '#25d366' }}>
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
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
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
                        padding: '8px 12px',
                        fontSize: '11px',
                        lineHeight: 1.45,
                        maxWidth: '88%',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      <div>{item.text}</div>
                      <div style={{ 
                        textAlign: 'right', 
                        fontSize: '8.5px', 
                        color: item.sender === 'user' ? '#8696a0' : '#8696a0', 
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
                  padding: '8px 10px',
                  borderRadius: '0 0 16px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
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
                      outline: 'none'
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
                      cursor: 'pointer'
                    }}
                  >
                    <Send size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. JSON Payload Inspector Card */}
            {lastWebhookResponse && (
              <div className="enterprise-panel">
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
                  maxHeight: '180px'
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="enterprise-panel">
            <div className="panel-header">
              <div className="panel-title-wrap">
                <span className="panel-title">Contoh Integrasi Kode (Multi-Bahasa)</span>
                <span className="panel-subtitle">Salin cuplikan kode siap pakai untuk mengirim request webhook</span>
              </div>

              {/* Language Switcher */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {['curl', 'nodejs', 'python', 'php'].map((lang) => (
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
                fontSize: '12.5px',
                lineHeight: 1.55,
                overflowX: 'auto'
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="enterprise-panel">
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

          <div className="enterprise-panel">
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
    </div>
  );
}
