import React, { useState } from 'react';
import { 
  Trophy, 
  Target, 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { CONTRIBUTORS_LEADERBOARD, KAB_KOTA_JATENG } from '../data/mockData';

export default function ContributorLeaderboardModule() {
  const [selectedKab, setSelectedKab] = useState('ALL');
  const [selectedUnit, setSelectedUnit] = useState('ALL');

  const filteredLeaderboard = CONTRIBUTORS_LEADERBOARD.filter(item => {
    const matchesKab = selectedKab === 'ALL' || item.kabKota === selectedKab;
    const matchesUnit = selectedUnit === 'ALL' || item.unit.includes(selectedUnit);
    return matchesKab && matchesUnit;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-wrap">
          <h1 className="page-title">Manajemen Kader Penginput Data & Leaderboard</h1>
          <p className="page-description">
            Pemantauan produktivitas enumerator lapangan, pencapaian target kuota data administratif terverifikasi, dan apresiasi kinerja kader.
          </p>
        </div>
      </div>

      {/* Aggregate Contributor Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total Data Diinput</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>12.450</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Seluruh Operator Se-Jateng</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Tervalidasi Fisik & NIK</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#059669' }}>11.890</div>
          <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>95.5% Tingkat Akurasi</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Data Pending Verifikasi</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#f59e0b' }}>480</div>
          <div style={{ fontSize: '11px', color: '#b45309' }}>Menunggu Cek Dokumen</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '18px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Duplikasi Ditolak</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#e11d48' }}>80</div>
          <div style={{ fontSize: '11px', color: '#e11d48' }}>0.6% Terdeteksi Ganda</div>
        </div>
      </div>

      {/* Main Grid: Leaderboard and Quota Target Rules */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '24px' }}>
        {/* Left: Leaderboard Table */}
        <div className="enterprise-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Peringkat Internal Kontributor (Top Performers)</span>
              <span className="panel-subtitle">Dihitung berdasarkan jumlah data administratif yang tervalidasi</span>
            </div>
            
            {/* Filter */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                className="form-select" 
                style={{ fontSize: '12px', padding: '6px 10px' }}
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
              >
                <option value="ALL">Semua Unit</option>
                <option value="AMPG">AMPG</option>
                <option value="KPPG">KPPG</option>
                <option value="AMPI">AMPI</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Rank & Nama Kader</th>
                  <th>Wilayah & Unit</th>
                  <th>Data Valid</th>
                  <th>Target & Progress</th>
                  <th>Status Akurasi</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaderboard.map((item) => (
                  <tr key={item.rank}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div 
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: item.rank === 1 ? '#F59E0B' : item.rank === 2 ? '#94A3B8' : item.rank === 3 ? '#B45309' : '#F1F5F9',
                            color: item.rank <= 3 ? '#ffffff' : '#475569',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '12px'
                          }}
                        >
                          {item.rank}
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, color: '#0f172a' }}>{item.name}</div>
                          <span className="metric-badge badge-warning" style={{ fontSize: '10px', padding: '1px 6px' }}>
                            {item.badge}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{item.kabKota}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{item.unit}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#059669' }}>
                        {item.verified.toLocaleString('id-ID')}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#64748b' }}>
                        Pending: {item.pending} · Duplikat: {item.duplicate}
                      </div>
                    </td>
                    <td>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                          <span style={{ color: '#64748b' }}>Target: {item.target}</span>
                          <span style={{ fontWeight: 800, color: '#0f172a' }}>{item.achievement}%</span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div 
                            style={{ 
                              height: '100%', 
                              width: `${Math.min(100, item.achievement)}%`, 
                              backgroundColor: item.achievement >= 95 ? '#10b981' : '#f59e0b' 
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`metric-badge ${item.achievement >= 90 ? 'badge-success' : 'badge-neutral'}`}>
                        {item.achievement >= 90 ? 'Achieved' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Target & Quota Rules Panel (PRD 3.2) */}
        <div className="enterprise-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Manajemen Target & Kuota</span>
              <span className="panel-subtitle">Periode Oktober 2026</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '14px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                Skema Penghitungan Ranking Adil
              </div>
              <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.5 }}>
                Sesuai ketentuan PRD Seksi 3.3, ranking dihitung secara ketat berdasarkan <strong>data KTP yang berhasil diverifikasi</strong>, bukan sekadar jumlah scan mentah, guna mencegah data fiktif atau duplikasi.
              </p>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#fffdf5', borderRadius: '12px', border: '1px solid #fef3c7' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#b45309', marginBottom: '6px' }}>
                Kriteria Reward Kinerja Kader
              </div>
              <ul style={{ fontSize: '11px', color: '#78350F', paddingLeft: '16px', lineHeight: 1.6 }}>
                <li><strong>Gold Performer (≥95%):</strong> Piagam Ketua DPD I & Prioritas Bimtek Nasional.</li>
                <li><strong>Silver Performer (≥90%):</strong> Sertifikat Kehormatan DPD Golkar Jateng.</li>
                <li><strong>Insentif Operasional:</strong> Ditransfer otomatis ke rekening kader tervalidasi.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
