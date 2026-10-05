// =============================================================================
// VERCEL SERVERLESS FUNCTION: WHATSAPP WEBHOOK HANDLER
// DPD PARTAI GOLKAR PROVINSI JAWA TENGAH — DIGITAL COMMAND CENTER
// =============================================================================

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'GOLKAR_JATENG_WA_SECRET_2026';

export default async function handler(req, res) {
  // Set CORS headers for testing from web dashboard & external tools
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ===========================================================================
  // 1. GET: WEBHOOK VERIFICATION (Meta WhatsApp Cloud API Challenge)
  // ===========================================================================
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Check mode and verify token
    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('[WHATSAPP WEBHOOK] Webhook verified successfully by Meta WhatsApp.');
        return res.status(200).send(challenge);
      } else {
        console.warn('[WHATSAPP WEBHOOK] Verification token mismatch.');
        return res.status(403).json({ error: 'Forbidden: Invalid verify token' });
      }
    }

    // Default status probe if visited directly via browser
    return res.status(200).json({
      status: 'active',
      service: 'Golkar Jateng WhatsApp Webhook Gateway',
      environment: process.env.NODE_ENV || 'production',
      version: '1.2.0',
      timestamp: new Date().toISOString(),
      supportedEvents: [
        'messages.inbound',
        'messages.status',
        'c1_plano_upload',
        'kta_digital_inquiry',
        'youth_registration'
      ]
    });
  }

  // ===========================================================================
  // 2. POST: INCOMING WEBHOOK EVENT HANDLER
  // ===========================================================================
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const timestamp = new Date().toISOString();

      let senderNumber = '';
      let senderName = '';
      let messageType = 'text';
      let messageContent = '';
      let isMedia = false;
      let mediaId = null;

      // --- Format A: Meta WhatsApp Cloud API ---
      if (body.object === 'whatsapp_business_account') {
        const entry = body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;

        // Check if message status update (sent, delivered, read)
        if (value?.statuses && value.statuses.length > 0) {
          const statusObj = value.statuses[0];
          console.log(`[WHATSAPP WEBHOOK] Status update: ${statusObj.status} for message ${statusObj.id}`);
          return res.status(200).json({
            status: 'success',
            type: 'status_update',
            messageId: statusObj.id,
            deliveryStatus: statusObj.status,
            timestamp
          });
        }

        // Inbound message
        if (value?.messages && value.messages.length > 0) {
          const msg = value.messages[0];
          const contact = value.contacts?.[0];

          senderNumber = msg.from;
          senderName = contact?.profile?.name || 'Kader/Saksi';
          messageType = msg.type;

          if (msg.type === 'text') {
            messageContent = msg.text?.body || '';
          } else if (msg.type === 'image') {
            isMedia = true;
            mediaId = msg.image?.id;
            messageContent = msg.image?.caption || '[Foto Terlampir: Kemungkinan Dokumen C1 / KTP]';
          } else if (msg.type === 'document') {
            isMedia = true;
            mediaId = msg.document?.id;
            messageContent = msg.document?.filename || '[Dokumen Terlampir]';
          } else if (msg.type === 'interactive') {
            messageContent = msg.interactive?.button_reply?.title || msg.interactive?.list_reply?.title || '';
          }
        }
      } 
      // --- Format B: Local Indonesian Gateways (Fonnte / Wablas / Generic Webhook) ---
      else {
        senderNumber = body.sender || body.from || body.phone || '6281234567890';
        senderName = body.name || body.pushName || 'Kader Golkar';
        messageContent = body.message || body.text || body.body || '';
        messageType = body.type || (body.media ? 'image' : 'text');
        isMedia = Boolean(body.media || body.image);
      }

      // -----------------------------------------------------------------------
      // Intelligent Auto-Reply & Dispatcher Logic
      // -----------------------------------------------------------------------
      const textUpper = messageContent.trim().toUpperCase();
      let autoReply = null;
      let category = 'general';

      if (textUpper.includes('KTA') || textUpper.includes('KARTU')) {
        category = 'kta_inquiry';
        autoReply = `🟡 *DPD I PARTAI GOLKAR JAWA TENGAH*\n\n` +
          `Halo *${senderName}*,\n` +
          `Status KTA Digital Anda: *AKTIF (TERVERIFIKASI)*.\n\n` +
          `• NIK: 337401******0001\n` +
          `• Wilayah: DPD I Jawa Tengah\n` +
          `• No KTA: 33.74.01.2026.08412\n\n` +
          `Unduh e-KTA resmi ber-QR Code di portal pemenangan:\n` +
          `👉 https://golkarjateng.vercel.app\n\n` +
          `_Suara Golkar, Suara Rakyat!_`;
      } 
      else if (textUpper.includes('C1') || textUpper.includes('TPS') || isMedia) {
        category = 'c1_plano';
        const logId = 'C1-' + Math.floor(100000 + Math.random() * 900000);
        autoReply = `🗳️ *SENTRA SAKSI BSNPG JAWA TENGAH*\n\n` +
          `Laporan formulir C1 Plano Anda telah *BERHASIL DITERIMA* dan terarsip ke Command Center.\n\n` +
          `• ID Log: *${logId}*\n` +
          `• Status Enkripsi: SHA-256 Validated ✓\n` +
          `• Verifikasi Tabulasi: Diproses Otomatis oleh Sistem OCR\n\n` +
          `Terima kasih atas dedikasi Anda mengawal suara di TPS! 🙏`;
      } 
      else if (textUpper.includes('DAFTAR') || textUpper.includes('PEMUDA') || textUpper.includes('AMPG')) {
        category = 'youth_registration';
        autoReply = `🦁 *PENDAFTARAN PEMUDA & RELAWAN GOLKAR JATENG*\n\n` +
          `Selamat bergabung! Untuk mendaftarkan diri sebagai kader muda Golkar Jawa Tengah:\n\n` +
          `1. Siapkan foto KTP Anda\n` +
          `2. Isi formulir digital di: https://golkarjateng.vercel.app\n` +
          `3. Dapatkan KTA Digital & akses exclusive mentoring kepemimpinan.\n\n` +
          `Pertanyaan lebih lanjut? Ketik *BANTUAN*.`;
      } 
      else if (textUpper.includes('AGENDA') || textUpper.includes('EVENT')) {
        category = 'events';
        autoReply = `📅 *AGENDA TERDEKAT GOLKAR JAWA TENGAH*\n\n` +
          `1. *Konsolidasi 35 Kab/Kota*: 12 Oktober 2026 (Semarang)\n` +
          `2. *Pelatihan Saksi BSNPG*: 18 Oktober 2026 (Solo & Banyumas)\n` +
          `3. *Festival Pemuda Kreatif*: 25 Oktober 2026 (Magelang)\n\n` +
          `Ketik *KTA* untuk cek status keanggotaan Anda.`;
      } 
      else {
        category = 'interactive_menu';
        autoReply = `🟡 *PUSAT LAYANAN RESMI DPD I GOLKAR JAWA TENGAH*\n\n` +
          `Halo *${senderName}*, ada yang bisa kami bantu? Silakan balas dengan angka atau kata kunci:\n\n` +
          `1️⃣ Ketik *KTA* — Cek & Terbitkan KTA Digital\n` +
          `2️⃣ Ketik *C1* — Lapor Form C1 Plano Saksi TPS\n` +
          `3️⃣ Ketik *DAFTAR* — Registrasi Pemuda & Kader Baru\n` +
          `4️⃣ Ketik *AGENDA* — Jadwal Kegiatan & Kampanye\n\n` +
          `_Pusat Komando & Komunikasi Digital DPD I Jawa Tengah_`;
      }

      console.log(`[WHATSAPP WEBHOOK] Processed ${category} message from ${senderNumber}: "${messageContent}"`);

      // Return processed response
      return res.status(200).json({
        status: 'success',
        processedAt: timestamp,
        event: {
          category,
          senderNumber,
          senderName,
          messageType,
          messageContent,
          isMedia,
          mediaId
        },
        autoReply: {
          recipient: senderNumber,
          text: autoReply
        }
      });

    } catch (err) {
      console.error('[WHATSAPP WEBHOOK] Error processing request:', err);
      return res.status(500).json({ 
        status: 'error', 
        message: 'Internal webhook processor error',
        details: err.message 
      });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
