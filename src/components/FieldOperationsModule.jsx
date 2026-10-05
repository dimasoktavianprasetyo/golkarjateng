import React, { useState } from 'react';
import { 
  Vote, 
  Smartphone, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  Search, 
  FileCheck, 
  Eye, 
  ShieldCheck, 
  Sparkles,
  Phone
} from 'lucide-react';
import { TPS_FIELD_DATA, KAB_KOTA_JATENG } from '../data/mockData';

export default function FieldOperationsModule({ onOpenC1Modal }) {
  const [tpsList, setTpsList] = useState(TPS_FIELD_DATA);
  const [selectedTps, setSelectedTps] = useState(tpsList[0]);
  const [showMobileFrame, setShowMobileFrame] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const filteredTps = tpsList.filter(t => 
    t.kabKota.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.saksiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.tpsId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerifySelectedTps = () => {
    setTpsList(tpsList.map(t => {
      if (t.tpsId === selectedTps.tpsId) {
        return { ...t, c1Status: 'Verified', verifiedBy: 'Super Admin DPD I Jateng' };
      }
      return t;
    }));

    setSelectedTps({ ...selectedTps, c1Status: 'Verified', verifiedBy: 'Super Admin DPD I Jateng' });
    setVerificationSuccess(true);
    setTimeout(() => setVerificationSuccess(false), 3000);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-wrap">
          <h1 className="page-title">Operasional Lapangan, Saksi TPS & Form C1 Plano</h1>
          <p className="page-description">
            Sistem rekapitulasi dokumen C1 Plano Pemilu berbasis OCR kecerdasan buatan, pemantauan penugasan saksi BSNPG, dan validasi matematis suara sah.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-secondary"
            onClick={() => setShowMobileFrame(!showMobileFrame)}
          >
            <Smartphone size={14} />
            <span>{showMobileFrame ? 'Tutup Tampilan Mobile' : 'Simulasi Aplikasi Mobile Saksi'}</span>
          </button>
          <button className="btn-primary" onClick={onOpenC1Modal}>
            <Camera size={15} />
            <span>Simulasi Scan C1 Plano OCR</span>
          </button>
        </div>
      </div>

      {verificationSuccess && (
        <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', padding: '12px 18px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={18} color="#059669" />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>
            Dokumen C1 Plano {selectedTps.tpsId} berhasil diverifikasi dan angka suara telah terkunci ke database pusat!
          </span>
        </div>
      )}

      {/* High-level status bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total TPS Terdaftar</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>117.299</div>
          <div style={{ fontSize: '11px', color: '#10b981' }}>35 Kab/Kota Se-Jateng</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Saksi BSNPG Terploting</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#0284c7' }}>115.420</div>
          <div style={{ fontSize: '11px', color: '#0284c7' }}>98.4% Cakupan Personel</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>C1 Plano Masuk</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#059669' }}>114.890</div>
          <div style={{ fontSize: '11px', color: '#059669' }}>97.9% Terunggah</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Dokumen Perlu Review</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#e11d48' }}>530</div>
          <div style={{ fontSize: '11px', color: '#e11d48' }}>Selisih Angka / Buram</div>
        </div>
      </div>

      {/* Main Grid: TPS Table & C1 Plano Document Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: showMobileFrame ? '1fr 340px' : '1.3fr 1fr', gap: '24px' }}>
        {/* Left: TPS List Table */}
        <div className="enterprise-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Monitoring Rekapitulasi per TPS</span>
              <span className="panel-subtitle">Hasil ekstraksi OCR dan verifikasi saksi</span>
            </div>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                className="form-input" 
                style={{ width: '100%', paddingLeft: '32px', fontSize: '12px' }}
                placeholder="Cari TPS, Saksi, Daerah..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Kode TPS & Wilayah</th>
                  <th>Nama Saksi</th>
                  <th>Suara Golkar</th>
                  <th>Sah / Tidak Sah</th>
                  <th>Status C1</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTps.map((tps) => {
                  const isSelected = selectedTps.tpsId === tps.tpsId;
                  return (
                    <tr 
                      key={tps.tpsId}
                      style={{ backgroundColor: isSelected ? '#fffdf5' : 'transparent', cursor: 'pointer' }}
                      onClick={() => setSelectedTps(tps)}
                    >
                      <td>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{tps.tpsId}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          {tps.kabKota}, Kec. {tps.kecamatan}, Kel. {tps.kelurahan}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{tps.saksiName}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{tps.saksiPhone}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#b45309' }}>
                          {tps.suaraGolkar} <span style={{ fontSize: '10px', color: '#64748b' }}>suara</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: '12px', fontWeight: 600 }}>{tps.sah} / {tps.tidakSah}</div>
                        <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>DPT: {tps.dptTotal}</div>
                      </td>
                      <td>
                        <span className={`metric-badge ${tps.c1Status === 'Verified' ? 'badge-success' : 'badge-danger'}`}>
                          {tps.c1Status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="icon-btn" 
                          style={{ width: '28px', height: '28px' }}
                          title="Inspeksi C1"
                        >
                          <Eye size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Selected C1 Plano Form Detail & OCR Verification */}
        {!showMobileFrame ? (
          <div className="enterprise-panel">
            <div className="panel-header">
              <div className="panel-title-wrap">
                <span className="panel-title">Dokumen C1 Plano Terpilih</span>
                <span className="metric-badge badge-neutral">{selectedTps.tpsId}</span>
              </div>
              <span className={`metric-badge ${selectedTps.c1Status === 'Verified' ? 'badge-success' : 'badge-danger'}`}>
                {selectedTps.c1Status}
              </span>
            </div>

            {/* Simulated C1 Paper Document Canvas */}
            <div 
              style={{
                backgroundColor: '#FFFBEB',
                border: '2px solid #FDE68A',
                borderRadius: '14px',
                padding: '16px',
                marginBottom: '18px',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #FCD34D', paddingBottom: '8px', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#92400E' }}>MODEL C1-PLANO (BERITA ACARA PEMILU)</div>
                  <div style={{ fontSize: '10px', color: '#78350F' }}>KPU PROVINSI JAWA TENGAH · TPS {selectedTps.tpsNo}</div>
                </div>
                <div style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, color: '#B45309' }}>
                  OCR CONFIDENCE 99.4%
                </div>
              </div>

              {/* Vote Table extracted */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#FEF3C7', padding: '6px 10px', borderRadius: '6px', fontWeight: 800, color: '#B45309' }}>
                  <span>04. PARTAI GOLONGAN KARYA</span>
                  <span>{selectedTps.suaraGolkar}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 10px', color: '#475569' }}>
                  <span>Partai Pesaing A</span>
                  <span>{selectedTps.suaraPartai2}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 10px', color: '#475569' }}>
                  <span>Partai Pesaing B</span>
                  <span>{selectedTps.suaraPartai3}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 10px', color: '#475569' }}>
                  <span>Partai Lainnya (Akumulasi)</span>
                  <span>{selectedTps.suaraLain}</span>
                </div>
              </div>

              {/* Math Check Alert */}
              <div style={{ marginTop: '12px', borderTop: '1px dashed #FCD34D', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: 700 }}>
                <span style={{ color: '#059669' }}>✓ Validasi Matematika: Sah ({selectedTps.sah}) + Rusak ({selectedTps.tidakSah}) = {selectedTps.totalMasuk}</span>
                <span style={{ color: '#0f172a' }}>DPT: {selectedTps.dptTotal}</span>
              </div>
            </div>

            {/* Saksi Details & Verification Info */}
            <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '18px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                Saksi BSNPG Penanggung Jawab
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{selectedTps.saksiName}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Waktu Kirim: {selectedTps.timestamp}</div>
                </div>
                <a 
                  href={`https://wa.me/${selectedTps.saksiPhone.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-secondary" 
                  style={{ fontSize: '11px', padding: '4px 10px' }}
                >
                  <Phone size={12} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Action Button */}
            <div style={{ marginTop: 'auto' }}>
              {selectedTps.c1Status !== 'Verified' ? (
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={handleVerifySelectedTps}
                >
                  <ShieldCheck size={15} />
                  <span>Verifikasi & Setujui Dokumen C1 Ini</span>
                </button>
              ) : (
                <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#059669', padding: '8px' }}>
                  ✓ Dokumen ini telah tervalidasi oleh: {selectedTps.verifiedBy}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Mobile Phone Frame Simulator for Saksi */
          <div 
            style={{
              backgroundColor: '#1E293B',
              borderRadius: '36px',
              padding: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              border: '4px solid #334155'
            }}
          >
            {/* Phone Screen */}
            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '26px',
                height: '560px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Phone Status Bar */}
              <div style={{ height: '24px', backgroundColor: '#F59E0B', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', fontSize: '10px', color: '#000', fontWeight: 800 }}>
                <span>09:41</span>
                <span>BSNPG Mobile App</span>
                <span>100%</span>
              </div>

              {/* App Content inside Phone */}
              <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
                  Aplikasi Saksi TPS BSNPG
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '14px' }}>
                  Selamat bertugas, <strong>{selectedTps.saksiName}</strong>
                </div>

                <div style={{ backgroundColor: '#FEF3C7', padding: '12px', borderRadius: '12px', border: '1px solid #FDE68A', marginBottom: '14px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: '#B45309' }}>TPS TUGAS ANDA</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{selectedTps.tpsId}</div>
                  <div style={{ fontSize: '10.5px', color: '#78350F' }}>{selectedTps.kelurahan}, {selectedTps.kecamatan}</div>
                </div>

                <div 
                  style={{
                    border: '2px dashed #CBD5E1',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    marginBottom: '14px',
                    backgroundColor: '#F8FAFC',
                    cursor: 'pointer'
                  }}
                  onClick={onOpenC1Modal}
                >
                  <Camera size={32} color="#F59E0B" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Foto Form C1 Plano</div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>Arahkan kamera ke kertas pleno TPS</div>
                </div>

                <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.4, marginTop: 'auto' }}>
                  * Foto C1 Plano akan langsung dianalisis oleh AI OCR untuk menghitung suara Golkar secara instan.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
