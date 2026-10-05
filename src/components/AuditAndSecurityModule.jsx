import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  KeyRound, 
  Database,
  ExternalLink
} from 'lucide-react';
import { AUDIT_TRAIL_DATA } from '../data/mockData';

export default function AuditAndSecurityModule({ onOpenExportModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredLogs = AUDIT_TRAIL_DATA.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.location && log.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-wrap">
          <h1 className="page-title">Audit Trail & Tata Kelola Keamanan Data</h1>
          <p className="page-description">
            Pencatatan riwayat operasional dan verifikasi berkas organisasi secara transparan, kepatuhan perlindungan data identitas kader, dan pengawasan integritas sistem.
          </p>
        </div>

        <button className="btn-primary" onClick={onOpenExportModal}>
          <Download size={14} />
          <span>Ekspor Catatan Audit (JSON/CSV)</span>
        </button>
      </div>

      {/* Security Principles Bar (PRD 20) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Lock size={16} color="#059669" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Enkripsi Data Identitas</span>
          </div>
          <p style={{ fontSize: '11.5px', color: '#64748b' }}>Seluruh NIK dan data identitas pemuda tersandi aman sesuai standar PDP.</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <KeyRound size={16} color="#d97706" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Otorisasi Berjenjang</span>
          </div>
          <p style={{ fontSize: '11.5px', color: '#64748b' }}>Pembatasan hak akses berbasis tingkatan DPD I, DPD II, hingga Kecamatan.</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <ShieldCheck size={16} color="#0284c7" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Pencegahan Duplikasi NIK</span>
          </div>
          <p style={{ fontSize: '11.5px', color: '#64748b' }}>Verifikasi real-time otomatis mencegah satu NIK didaftarkan ganda.</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Database size={16} color="#e11d48" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Pencadangan Cloud DPD I</span>
          </div>
          <p style={{ fontSize: '11.5px', color: '#64748b' }}>Replikasi cadangan data berintegritas tinggi otomatis setiap 6 jam.</p>
        </div>
      </div>

      {/* Main Audit Trail Table */}
      <div className="enterprise-panel">
        <div className="panel-header">
          <div className="panel-title-wrap">
            <span className="panel-title">Catatan Riwayat Aktivitas & Verifikasi Berkas</span>
            <span className="panel-subtitle">Riwayat operasional verifikasi berkas kader, penerbitan KTA, dan sinkronisasi saksi TPS</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', width: '260px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                className="form-input" 
                style={{ width: '100%', paddingLeft: '32px', fontSize: '12px' }}
                placeholder="Cari Petugas, Aktivitas, Wilayah..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select 
              className="form-select" 
              style={{ fontSize: '12px', padding: '6px 12px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Semua Status</option>
              <option value="Berhasil">Berhasil</option>
              <option value="Peringatan">Peringatan Dicegah</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Waktu (WIB)</th>
                <th>Petugas / Pejabat</th>
                <th>Aktivitas Organisasi</th>
                <th>Sasaran & Keterangan Berkas</th>
                <th>Kanal / Lokasi</th>
                <th>Status Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: '12px', color: '#475569', whiteSpace: 'nowrap' }}>
                    {log.timestamp}
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{log.user}</div>
                    <span className="metric-badge badge-neutral" style={{ fontSize: '10px' }}>
                      {log.role}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                      {log.action}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '12.5px', color: '#334155' }}>{log.target}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#94a3b8' }}></span>
                      {log.location || 'Sistem Terpusat'}
                    </div>
                  </td>
                  <td>
                    <span 
                      className={`metric-badge ${log.status === 'Berhasil' ? 'badge-success' : 'badge-warning'}`}
                      style={log.status === 'Peringatan' ? { backgroundColor: '#fef3c7', color: '#b45309', border: '1px solid #fde68a' } : {}}
                    >
                      {log.status === 'Berhasil' ? 'Berhasil' : 'Peringatan Dicegah'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
