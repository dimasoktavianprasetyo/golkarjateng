import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  MapPin, 
  ChevronRight, 
  Award,
  Layers
} from 'lucide-react';
import { KAB_KOTA_JATENG } from '../data/mockData';

export default function MemberOrganizationModule() {
  const [activeTab, setActiveTab] = useState('sayap');

  const wings = [
    { code: 'AMPG', name: 'Angkatan Muda Partai Golkar', category: 'Sayap Pemuda', members: '184.200', ketua: 'Bambang Eko', badge: 'Pemuda & Pengamanan' },
    { code: 'KPPG', name: 'Kesatuan Perempuan Partai Golkar', category: 'Sayap Perempuan', members: '142.100', ketua: 'Hj. Endang Tri K., S.Sos', badge: 'Perempuan Berdaya' },
    { code: 'AMPI', name: 'Angkatan Muda Pembaharuan Indonesia', category: 'Sayap Pemuda', members: '68.400', ketua: 'Dimas Rangga Prasetyo', badge: 'Kreatif & Digital' },
    { code: 'SOKSI', name: 'Sentral Organisasi Karyawan Swadiri Indonesia', category: 'Hasta Karya', members: '94.500', ketua: 'Ir. Handoyo', badge: 'Buruh & Karyawan' },
    { code: 'KOSGORO 1957', name: 'Kesatuan Organisasi Serbaguna Gotong Royong', category: 'Hasta Karya', members: '112.000', ketua: 'Drs. H. Sugeng', badge: 'Koperasi & UMKM' },
    { code: 'MKGR', name: 'Musyawarah Kekeluargaan Gotong Royong', category: 'Hasta Karya', members: '88.300', ketua: 'Hj. Sri Mulyani', badge: 'Sosial & Budaya' },
    { code: 'SATKAR ULAMA', name: 'Satuan Karya Ulama Indonesia Jateng', category: 'Keagamaan', members: '45.200', ketua: 'K.H. Ahmad Dahlan', badge: 'Dakwah & Pesantren' },
    { code: 'MDI', name: 'Majelis Dakwah Islamiyah', category: 'Keagamaan', members: '38.000', ketua: 'Drs. H. Munawir', badge: 'Pendidikan Islam' },
    { code: 'AL-HIDAYAH', name: 'Pengajian Al-Hidayah Jawa Tengah', category: 'Keagamaan', members: '52.400', ketua: 'Hj. Siti Fatimah', badge: 'Majelis Taklim' }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-wrap">
          <h1 className="page-title">Struktur Organisasi & Sayap Partai Golkar</h1>
          <p className="page-description">
            Manajemen hierarkis kelembagaan DPD Provinsi Jawa Tengah, 35 DPD Kabupaten/Kota, Hasta Karya, dan Badan Otonom.
          </p>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#ffffff', padding: '4px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <button 
            style={{ 
              padding: '6px 14px', 
              fontSize: '12px', 
              fontWeight: 700, 
              borderRadius: '8px', 
              border: 'none', 
              cursor: 'pointer',
              backgroundColor: activeTab === 'sayap' ? '#fef3c7' : 'transparent',
              color: activeTab === 'sayap' ? '#b45309' : '#64748b'
            }}
            onClick={() => setActiveTab('sayap')}
          >
            Sayap & Hasta Karya
          </button>
          <button 
            style={{ 
              padding: '6px 14px', 
              fontSize: '12px', 
              fontWeight: 700, 
              borderRadius: '8px', 
              border: 'none', 
              cursor: 'pointer',
              backgroundColor: activeTab === 'hierarki' ? '#ecfdf5' : 'transparent',
              color: activeTab === 'hierarki' ? '#065f46' : '#64748b'
            }}
            onClick={() => setActiveTab('hierarki')}
          >
            Hierarki Hak Akses (RBAC)
          </button>
        </div>
      </div>

      {activeTab === 'sayap' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
          {wings.map((w, idx) => (
            <div 
              key={idx}
              className="enterprise-panel"
              style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="metric-badge badge-warning" style={{ fontSize: '12px', fontWeight: 800 }}>
                    {w.code}
                  </span>
                  <span className="metric-badge badge-neutral" style={{ fontSize: '10px' }}>
                    {w.category}
                  </span>
                </div>

                <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  {w.name}
                </div>

                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
                  Ketua Wilayah: <strong style={{ color: '#1e293b' }}>{w.ketua}</strong>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Kader Terdaftar:</div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#059669' }}>{w.members}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Hierarchical Access Table (PRD 6.2) */
        <div className="enterprise-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Tingkatan Hak Akses Berdasarkan Wilayah (PRD Seksi 6)</span>
              <span className="panel-subtitle">Pembatasan wewenang data organisasi dan pelaporan</span>
            </div>
          </div>

          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Tingkat Pengguna</th>
                  <th>Cakupan Wilayah</th>
                  <th>Wewenang Input Data</th>
                  <th>Wewenang Export Data</th>
                  <th>Level Otorisasi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#0f172a' }}>Super Admin</strong></td>
                  <td>Seluruh Provinsi Jawa Tengah</td>
                  <td>Penuh (Semua Modul)</td>
                  <td>Penuh (Excel/CSV/PDF)</td>
                  <td><span className="metric-badge badge-danger">L1 - Root</span></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#0f172a' }}>DPD Provinsi Jateng</strong></td>
                  <td>35 Kabupaten & Kota</td>
                  <td>Manajemen Event & KTA</td>
                  <td>Rekapitulasi Provinsi</td>
                  <td><span className="metric-badge badge-warning">L2 - Provinsi</span></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#0f172a' }}>DPD Kab/Kota</strong></td>
                  <td>Hanya Wilayah Masing-Masing</td>
                  <td>Verifikasi Kader Lokal</td>
                  <td>Laporan Daerah Sendiri</td>
                  <td><span className="metric-badge badge-info">L3 - Daerah</span></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#0f172a' }}>Operator Lapangan</strong></td>
                  <td>Kecamatan / Dapil Tertentu</td>
                  <td>Input Scan KTP & Verif</td>
                  <td>Tidak Diizinkan</td>
                  <td><span className="metric-badge badge-success">L4 - Operator</span></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#0f172a' }}>Saksi TPS (BSNPG)</strong></td>
                  <td>Nomor TPS Terdaftar</td>
                  <td>Upload Foto & OCR C1</td>
                  <td>Tidak Diizinkan</td>
                  <td><span className="metric-badge badge-neutral">L5 - Field Saksi</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
