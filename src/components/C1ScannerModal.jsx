import React, { useState } from 'react';
import {
  Camera,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Upload,
  FileCheck,
  Sparkles,
  Vote
} from 'lucide-react';
import { KAB_KOTA_JATENG } from '../data/mockData';

export default function C1ScannerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'verified'
  const [tpsInfo, setTpsInfo] = useState({
    kabKota: 'Kota Semarang',
    kecamatan: 'Semarang Selatan',
    kelurahan: 'Pleburan',
    tpsNo: '018',
    dptTotal: 292,
    suaraGolkar: 134,
    suaraPartaiA: 62,
    suaraPartaiB: 50,
    suaraLain: 34,
    suaraSah: 280,
    suaraRusak: 12
  });

  const handleStartOcr = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('verified');
    }, 1500);
  };

  const isMathValid = (tpsInfo.suaraSah + tpsInfo.suaraRusak) === tpsInfo.dptTotal;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Vote size={18} color="#d97706" />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                Simulasi OCR Dokumen C1 Plano Pemilu
              </h3>
              <p style={{ fontSize: '11.5px', color: '#64748b' }}>
                Ekstraksi otomatis angka perolehan suara partai dan validasi integritas formulir C1.
              </p>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* C1 Preview Frame */}
          <div
            style={{
              backgroundColor: '#FEF3C7',
              border: '2px solid #FCD34D',
              borderRadius: '14px',
              padding: '18px',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '16px'
            }}
          >
            {scanState === 'scanning' && <div className="ktp-laser"></div>}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #FCD34D', paddingBottom: '8px', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#92400E' }}>FORMULIR MODEL C1-PLANO DPR/DPRD</span>
                <div style={{ fontSize: '10px', color: '#78350F' }}>KPU PROV. JATENG · TPS {tpsInfo.tpsNo} {tpsInfo.kelurahan}</div>
              </div>
              <span className="metric-badge badge-warning">BSNPG ENCRYPTED</span>
            </div>

            {scanState === 'idle' ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <Camera size={40} color="#D97706" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#92400E' }}>Foto C1 Plano Siap Dianalisis</div>
                <div style={{ fontSize: '11px', color: '#78350F' }}>Klik tombol di bawah untuk menjalankan OCR ekstraksi angka</div>
              </div>
            ) : scanState === 'scanning' ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#10B981' }}>MEMPROSES EKSTRAKSI TINTA C1...</div>
                <div style={{ fontSize: '11px', color: '#78350F' }}>Mencocokkan tanda tally dan angka digital...</div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#FDE68A', borderRadius: '8px', fontWeight: 800, color: '#92400E', marginBottom: '8px' }}>
                  <span>04. PARTAI GOLONGAN KARYA</span>
                  <span style={{ fontSize: '16px' }}>{tpsInfo.suaraGolkar} Suara</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '11px', color: '#78350F', marginBottom: '10px' }}>
                  <div style={{ backgroundColor: '#ffffff', padding: '6px', borderRadius: '6px', border: '1px solid #FCD34D' }}>Partai A: <strong>{tpsInfo.suaraPartaiA}</strong></div>
                  <div style={{ backgroundColor: '#ffffff', padding: '6px', borderRadius: '6px', border: '1px solid #FCD34D' }}>Partai B: <strong>{tpsInfo.suaraPartaiB}</strong></div>
                  <div style={{ backgroundColor: '#ffffff', padding: '6px', borderRadius: '6px', border: '1px solid #FCD34D' }}>Partai Lain: <strong>{tpsInfo.suaraLain}</strong></div>
                </div>

                <div style={{ borderTop: '1px dashed #FCD34D', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700 }}>
                  <span style={{ color: '#059669' }}>Suara Sah: {tpsInfo.suaraSah} | Rusak: {tpsInfo.suaraRusak}</span>
                  <span style={{ color: '#0F172A' }}>Total DPT: {tpsInfo.dptTotal}</span>
                </div>
              </div>
            )}
          </div>

          {/* Validation Alert */}
          {scanState === 'verified' && (
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#059669" />
              <div style={{ fontSize: '11.5px', color: '#065f46' }}>
                <strong>Validasi Matematis Lolos 100%:</strong> Jumlah suara sah ({tpsInfo.suaraSah}) + suara tidak sah ({tpsInfo.suaraRusak}) tepat sama dengan total pengguna hak pilih ({tpsInfo.dptTotal}).
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Tutup</button>
          {scanState !== 'verified' ? (
            <button className="btn-primary" onClick={handleStartOcr}>
              <Sparkles size={14} />
              <span>Jalankan OCR Ekstraksi Suara</span>
            </button>
          ) : (
            <button
              className="btn-primary"
              onClick={() => {
                alert('Dokumen C1 Plano Berhasil Diverifikasi & Disimpan!');
                onClose();
              }}
            >
              <ShieldCheck size={14} />
              <span>Simpan & Kunci Hasil C1 Ini</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
