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
      log.target.toLowerCase().includes(searchTerm.toLowerCase());
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
            Pencatatan aktivitas sistem tanpa dapat diubah (immutable log), kepatuhan enkripsi identitas KTP, dan pengawasan otorisasi pengguna.
          </p>
        </div>

        <button className="btn-primary" onClick={onOpenExportModal}>
          <Download size={14} />
          <span>Export Audit Log (JSON/CSV)</span>
        </button>
      </div>

      {/* Security Principles Bar (PRD 20) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Lock size={16} color="#059669" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Enkripsi AES-256</span>
          </div>
          <p style={{ fontSize: '11.5px', color: '#64748b' }}>Seluruh NIK dan data pribadi tersandi baik saat transit maupun diam.</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <KeyRound size={16} color="#d97706" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Role-Based Access</span>
          </div>
          <p style={{ fontSize: '11.5px', color: '#64748b' }}>Pembatasan hak akses berbasis wilayah dan tingkat kepengurusan.</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <ShieldCheck size={16} color="#0284c7" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Anti-Duplikasi NIK</span>
          </div>
          <p style={{ fontSize: '11.5px', color: '#64748b' }}>Deteksi instan mencegah satu NIK terdaftar berulang kali.</p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Database size={16} color="#e11d48" />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>G-Core Cloud Backup</span>
          </div>
          <p style={{ fontSize: '11.5px', color: '#64748b' }}>Replikasi cadangan data otomatis berkala setiap 6 jam.</p>
        </div>
      </div>

      {/* Main Audit Trail Table */}
      <div className="enterprise-panel">
        <div className="panel-header">
          <div className="panel-title-wrap">
            <span className="panel-title">Catatan Riwayat Aktivitas Administrator & Operator</span>
            <span className="panel-subtitle">Sesuai ketentuan PRD Seksi 16 (Audit Trail)</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', width: '240px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                className="form-input" 
                style={{ width: '100%', paddingLeft: '32px', fontSize: '12px' }}
                placeholder="Cari User, Aksi, NIK..." 
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
              <option value="SUCCESS">SUCCESS</option>
              <option value="WARNING">WARNING</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Waktu (WIB)</th>
                <th>Pengguna & Hak Akses</th>
                <th>Tipe Tindakan</th>
                <th>Objek Sasaran</th>
                <th>Alamat IP</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '11.5px', color: '#475569' }}>
                    {log.timestamp}
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{log.user}</div>
                    <span className="metric-badge badge-neutral" style={{ fontSize: '10px' }}>
                      {log.role}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, color: '#b45309' }}>
                      {log.action}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '12.5px', color: '#1e293b' }}>{log.target}</div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '11.5px', color: '#64748b' }}>
                    {log.ip}
                  </td>
                  <td>
                    <span className={`metric-badge ${log.status === 'SUCCESS' ? 'badge-success' : 'badge-danger'}`}>
                      {log.status}
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
