import React, { useState } from 'react';
import { 
  ScanLine, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  CreditCard, 
  Save, 
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

export default function KtpScannerModal({ isOpen, onClose, onSaveRecord, activeRole }) {
  if (!isOpen) return null;

  const [scanState, setScanState] = useState('idle'); // 'idle' | 'scanning' | 'extracted'
  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    gender: 'Laki-Laki',
    birthPlace: '',
    birthDate: '',
    kabKota: 'Kota Semarang',
    kecamatan: '',
    kelurahan: '',
    address: '',
    statusPemuda: 'Pekerja Muda',
    organisasi: 'AMPG',
    phone: '',
    interest: 'Teknologi & Ekonomi Digital'
  });

  const [isDuplicate, setIsDuplicate] = useState(false);

  // Sample KTP templates to test quick scanning
  const sampleKtpList = [
    {
      label: 'KTP Contoh A (Semarang - Baru)',
      data: {
        nik: '3374081504990005',
        nama: 'Aditya Wicaksono, S.T.',
        gender: 'Laki-Laki',
        birthPlace: 'Semarang',
        birthDate: '15-04-1999',
        kabKota: 'Kota Semarang',
        kecamatan: 'Candisari',
        kelurahan: 'Jatingaleh',
        address: 'Jl. Teuku Umar No. 82 RT 03/RW 02',
        statusPemuda: 'Pekerja Muda',
        organisasi: 'AMPG',
        phone: '0812-9988-3344',
        interest: 'Inovasi Digital & Industri Kreatif'
      },
      duplicate: false
    },
    {
      label: 'KTP Contoh B (Surakarta - Mahasiswi)',
      data: {
        nik: '3372015208020008',
        nama: 'Anindya Kusuma Putri',
        gender: 'Perempuan',
        birthPlace: 'Surakarta',
        birthDate: '12-08-2002',
        kabKota: 'Kota Surakarta',
        kecamatan: 'Jebres',
        kelurahan: 'Kentingan',
        address: 'Jl. Ir. Sutami No. 36 RT 01/RW 05',
        statusPemuda: 'Mahasiswa',
        organisasi: 'KPPG',
        phone: '0857-3344-9911',
        interest: 'Pendidikan & Kewirausahaan'
      },
      duplicate: false
    },
    {
      label: 'KTP Contoh C (Simulasi NIK Duplikat)',
      data: {
        nik: '3321061907990002', // known duplicate NIK in mock data
        nama: 'Hendra Setiawan',
        gender: 'Laki-Laki',
        birthPlace: 'Demak',
        birthDate: '19-07-1999',
        kabKota: 'Kab. Demak',
        kecamatan: 'Sayung',
        kelurahan: 'Sriwulan',
        address: 'Jl. Pantura Sayung Km 11',
        statusPemuda: 'Pekerja Muda',
        organisasi: 'AMPG',
        phone: '0813-7722-1144',
        interest: 'Ketahanan Lingkungan'
      },
      duplicate: true
    }
  ];

  const handleStartScan = (sample = sampleKtpList[0]) => {
    setScanState('scanning');
    setIsDuplicate(false);

    // Simulate laser OCR reading
    setTimeout(() => {
      setFormData(sample.data);
      setIsDuplicate(sample.duplicate);
      setScanState('extracted');
    }, 1400);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.nik || !formData.nama) return;

    const newRecord = {
      id: `YTH-NEW-${Date.now().toString().slice(-4)}`,
      ...formData,
      ktaNumber: isDuplicate ? 'Pending Duplicate Review' : `33.${formData.kabKota.includes('Kota') ? '74' : '02'}.08.2026.${Math.floor(1000 + Math.random() * 9000)}`,
      ktaStatus: isDuplicate ? 'Draft' : 'Generated',
      method: activeRole === 'operator' ? 'Assisted Registration' : 'Assisted Registration',
      registeredBy: activeRole === 'operator' ? 'Operator Lapangan' : 'Super Admin DPD I Jateng',
      registrationDate: new Date().toLocaleDateString('id-ID'),
      verificationStatus: isDuplicate ? 'Duplicate' : 'Verified'
    };

    onSaveRecord(newRecord);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ScanLine size={18} color="#d97706" />
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                KTP Scanner & Optical Character Recognition (OCR)
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b' }}>
              Pindai fisik KTP elektronik untuk ekstraksi data otomatis & verifikasi duplikasi NIK real-time.
            </p>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Top: Sample selector buttons for convenience */}
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '6px' }}>
              Pilih Sampel KTP Uji Coba:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {sampleKtpList.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="btn-secondary"
                  style={{ fontSize: '11px', padding: '6px 12px' }}
                  onClick={() => handleStartScan(sample)}
                >
                  <Sparkles size={12} color="#d97706" />
                  <span>{sample.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scanner Viewport Preview with Laser Line */}
          <div className="ktp-scanner-preview" style={{ marginBottom: '18px' }}>
            {scanState === 'scanning' && <div className="ktp-laser"></div>}

            <div style={{ textAlign: 'center', color: '#ffffff', zIndex: 1 }}>
              {scanState === 'idle' && (
                <div>
                  <ScanLine size={48} color="#f59e0b" style={{ margin: '0 auto 10px' }} />
                  <div style={{ fontSize: '13.5px', fontWeight: 700 }}>Arahkan KTP ke dalam bingkai kamera</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Klik salah satu tombol sampel di atas untuk simulasi pemindaian</div>
                </div>
              )}

              {scanState === 'scanning' && (
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#10b981', letterSpacing: '0.04em' }}>
                    MEMINDAI DOKUMEN & EKSTRAKSI OCR...
                  </div>
                  <div style={{ fontSize: '11px', color: '#cbd5e1' }}>Memeriksa keaslian format NIK & basic duplicate detection...</div>
                </div>
              )}

              {scanState === 'extracted' && (
                <div>
                  <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#10b981' }}>
                    EKSTRAKSI OCR BERHASIL (100% CONFIDENCE)
                  </div>
                  <div style={{ fontSize: '11px', color: '#cbd5e1' }}>Silakan verifikasi data hasil pindaian di bawah sebelum menyimpan.</div>
                </div>
              )}
            </div>
          </div>

          {/* Duplicate Warning Alert */}
          {isDuplicate && (
            <div style={{ backgroundColor: '#fff1f2', border: '1px solid #fecdd3', color: '#be123c', padding: '12px 16px', borderRadius: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={18} color="#e11d48" />
              <div style={{ fontSize: '12px' }}>
                <strong>Peringatan Duplikasi NIK:</strong> NIK <strong>{formData.nik}</strong> telah terdaftar sebelumnya dalam database Dapil II Demak. Data ini akan ditandai flag <em>Duplicate</em> untuk peninjauan admin.
              </div>
            </div>
          )}

          {/* Extracted Form Fields */}
          <form id="ktp-extract-form" onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Nomor Induk Kependudukan (NIK)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ fontFamily: 'monospace', fontWeight: 700 }}
                  value={formData.nik} 
                  onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                  placeholder="3374xxxxxxxxxxxx"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nama Lengkap (Sesuai KTP)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ fontWeight: 700 }}
                  value={formData.nama} 
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Nama Lengkap"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tempat / Tanggal Lahir</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    style={{ flex: 1 }}
                    value={formData.birthPlace} 
                    onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                    placeholder="Kota Lahir"
                  />
                  <input 
                    type="text" 
                    className="form-input" 
                    style={{ flex: 1 }}
                    value={formData.birthDate} 
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    placeholder="DD-MM-YYYY"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Kabupaten / Kota</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.kabKota} 
                  onChange={(e) => setFormData({ ...formData, kabKota: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Kecamatan & Kelurahan</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    style={{ flex: 1 }}
                    placeholder="Kecamatan"
                    value={formData.kecamatan} 
                    onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                  />
                  <input 
                    type="text" 
                    className="form-input" 
                    style={{ flex: 1 }}
                    placeholder="Kelurahan"
                    value={formData.kelurahan} 
                    onChange={(e) => setFormData({ ...formData, kelurahan: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">No. Telepon / WhatsApp</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0812-xxxx-xxxx"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status Pemuda</label>
                <select 
                  className="form-select"
                  value={formData.statusPemuda}
                  onChange={(e) => setFormData({ ...formData, statusPemuda: e.target.value })}
                >
                  <option value="Mahasiswa">Mahasiswa</option>
                  <option value="Pekerja Muda">Pekerja Muda</option>
                  <option value="Wirausaha Muda">Wirausaha Muda</option>
                  <option value="Komunitas Kreatif">Komunitas Kreatif</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Unit Sayap Organisasi</label>
                <select 
                  className="form-select"
                  value={formData.organisasi}
                  onChange={(e) => setFormData({ ...formData, organisasi: e.target.value })}
                >
                  <option value="AMPG">AMPG (Angkatan Muda Partai Golkar)</option>
                  <option value="KPPG">KPPG (Kesatuan Perempuan)</option>
                  <option value="AMPI">AMPI (Pembaharuan Indonesia)</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Batal
          </button>
          <button 
            type="submit" 
            form="ktp-extract-form" 
            className="btn-primary"
            disabled={!formData.nik || !formData.nama}
          >
            <Save size={15} />
            <span>Simpan Data Pemuda & Generate KTA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
