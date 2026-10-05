import React, { useState } from 'react';
import { 
  CreditCard, 
  Printer, 
  Download, 
  Send, 
  Search, 
  CheckCircle2, 
  RotateCw, 
  QrCode, 
  ShieldCheck, 
  Share2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { INITIAL_YOUTH_RECORDS } from '../data/mockData';

export default function KtaManagementModule({ selectedKtaPerson, onClearSelectedKta }) {
  const [activeKtaPerson, setActiveKtaPerson] = useState(selectedKtaPerson || INITIAL_YOUTH_RECORDS[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  const filteredMembers = INITIAL_YOUTH_RECORDS.filter(m => 
    m.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.ktaNumber.includes(searchTerm) ||
    m.kabKota.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendWhatsApp = () => {
    setDeliveryStatus('sending');
    setTimeout(() => {
      setDeliveryStatus('sent');
      setTimeout(() => setDeliveryStatus(null), 4000);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-wrap">
          <h1 className="page-title">Manajemen KTA Digital Partai GOLKAR</h1>
          <p className="page-description">
            Penerbitan Kartu Tanda Anggota berbasis digital dengan QR Code terenkripsi, verifikasi NIK otomatis, dan distribusi langsung via WhatsApp.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={handlePrint}>
            <Printer size={15} />
            <span>Cetak KTA (PDF)</span>
          </button>
          <button className="btn-primary" onClick={handleSendWhatsApp}>
            <Send size={15} />
            <span>Kirim via WhatsApp API</span>
          </button>
        </div>
      </div>

      {deliveryStatus === 'sent' && (
        <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', padding: '12px 18px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={18} color="#059669" />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>
            KTA Digital format PDF & Passcode QR berhasil dikirimkan ke nomor WhatsApp <strong>{activeKtaPerson.phone}</strong> ({activeKtaPerson.nama}).
          </span>
        </div>
      )}

      {/* Main Grid: Left is Interactive 3D Card, Right is Members Directory */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: 3D Flippable KTA Card Showcase */}
        <div className="enterprise-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Preview KTA Digital (Interactive)</span>
              <span className="metric-badge badge-warning">Klik Kartu Untuk Membalik</span>
            </div>
            <button 
              className="icon-btn" 
              onClick={() => setIsFlipped(!isFlipped)}
              title="Balik Sisi Depan / Belakang"
            >
              <RotateCw size={15} />
            </button>
          </div>

          {/* 3D KTA Card Container */}
          <div className="kta-card-3d-wrap" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`kta-card-inner ${isFlipped ? 'flipped' : ''}`}>
              {/* FRONT OF KTA */}
              <div className="kta-front">
                {/* Header of Card */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 900, boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                      🌳
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#1E293B', letterSpacing: '0.04em' }}>PARTAI GOLONGAN KARYA</div>
                      <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#B45309' }}>DPD PROVINSI JAWA TENGAH</div>
                    </div>
                  </div>
                  {/* Hologram Emblem */}
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'radial-gradient(circle, #FDE68A 0%, #D97706 70%, #92400E 100%)', border: '1px solid #ffffff', boxShadow: '0 0 8px rgba(245, 158, 11, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800, color: '#ffffff' }}>
                    ORIGINAL
                  </div>
                </div>

                {/* Middle: Photo + Info */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', margin: '8px 0' }}>
                  {/* Avatar Photo Frame */}
                  <div style={{ width: '74px', height: '94px', borderRadius: '8px', backgroundColor: '#CBD5E1', border: '2px solid #F59E0B', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'linear-gradient(135deg, #E2E8F0, #94A3B8)' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px' }}>👤</div>
                      <div style={{ fontSize: '9px', fontWeight: 700, color: '#1E293B' }}>FOTO KADER</div>
                    </div>
                  </div>

                  {/* Text details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {activeKtaPerson.nama}
                    </div>
                    <div style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: 700, color: '#B45309', marginBottom: '4px' }}>
                      KTA: {activeKtaPerson.ktaNumber}
                    </div>
                    <div style={{ fontSize: '10px', color: '#475569', lineHeight: 1.3 }}>
                      <div>NIK: {activeKtaPerson.nik}</div>
                      <div>TTL: {activeKtaPerson.birthPlace}, {activeKtaPerson.birthDate}</div>
                      <div>Wilayah: {activeKtaPerson.kabKota}</div>
                    </div>
                  </div>

                  {/* QR Code Security */}
                  <div style={{ width: '64px', height: '64px', backgroundColor: '#ffffff', padding: '4px', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <QrCode size={52} color="#0F172A" />
                  </div>
                </div>

                {/* Footer of Card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(217, 119, 6, 0.3)', paddingTop: '6px' }}>
                  <div style={{ fontSize: '9px', color: '#64748B' }}>
                    <div>Sayap: <strong style={{ color: '#0F172A' }}>{activeKtaPerson.organisasi}</strong></div>
                    <div>Berlaku s/d: <strong>Seumur Hidup</strong></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '8px', color: '#64748B' }}>Semarang, DPD I Jawa Tengah</div>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: '#0F172A' }}>Ir. Panggah Susanto, M.M.</div>
                    <div style={{ fontSize: '8px', color: '#B45309' }}>Ketua DPD I GOLKAR Jateng</div>
                  </div>
                </div>
              </div>

              {/* BACK OF KTA */}
              <div className="kta-back">
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#FBBF24', textAlign: 'center', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    IKRAR PANCA BHAKTI PARTAI GOLONGAN KARYA
                  </div>
                  <ol style={{ fontSize: '9px', color: '#CBD5E1', paddingLeft: '14px', lineHeight: 1.4 }}>
                    <li>Bertaqwa kepada Tuhan Yang Maha Esa.</li>
                    <li>Setia kepada Pancasila dan Undang-Undang Dasar 1945.</li>
                    <li>Membela dan mempertahankan Negara Kesatuan Republik Indonesia.</li>
                    <li>Mengutamakan karya nyata untuk kemakmuran dan kesejahteraan rakyat.</li>
                    <li>Menegakkan disiplin, solidaritas dan persatuan partai.</li>
                  </ol>
                </div>

                <div style={{ borderTop: '1px solid #334155', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '8.5px', color: '#94A3B8' }}>
                    Kartu ini sah milik anggota Partai Golkar.<br />
                    Jika menemukan kartu ini, harap hubungi DPD Golkar Jateng.
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '2px', color: '#FBBF24' }}>
                    ||||||||||||||||||||||||||||
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Toolbar under Card */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '22px' }}>
            <button className="btn-secondary" onClick={() => setIsFlipped(!isFlipped)}>
              <RotateCw size={14} />
              <span>{isFlipped ? 'Lihat Sisi Depan' : 'Lihat Sisi Belakang'}</span>
            </button>
            <button className="btn-primary" onClick={handlePrint}>
              <Download size={14} />
              <span>Unduh File KTA (PDF)</span>
            </button>
          </div>
        </div>

        {/* Right: KTA Issuance Queue & Member Selection */}
        <div className="enterprise-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Daftar Penerbitan KTA</span>
              <span className="panel-subtitle">Pilih kader untuk pratinjau</span>
            </div>
          </div>

          <div style={{ marginBottom: '14px', position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              className="form-input" 
              style={{ width: '100%', paddingLeft: '32px' }}
              placeholder="Cari anggota / No. KTA..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '380px', overflowY: 'auto' }}>
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => setActiveKtaPerson(member)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: `1px solid ${activeKtaPerson.id === member.id ? '#f59e0b' : '#e2e8f0'}`,
                  backgroundColor: activeKtaPerson.id === member.id ? '#fffdf5' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{member.nama}</div>
                  <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#b45309' }}>{member.ktaNumber}</div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>{member.kabKota} · {member.organisasi}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={`metric-badge ${member.ktaStatus === 'Printed' ? 'badge-success' : member.ktaStatus === 'Generated' ? 'badge-info' : 'badge-neutral'}`}>
                    {member.ktaStatus}
                  </span>
                  <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>
                    {member.registrationDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
