import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ScanLine, 
  UserPlus, 
  ShieldCheck, 
  AlertTriangle, 
  CreditCard, 
  Eye, 
  CheckCircle2, 
  FileSpreadsheet,
  Download,
  Share2
} from 'lucide-react';
import { INITIAL_YOUTH_RECORDS, KAB_KOTA_JATENG } from '../data/mockData';

export default function YouthManagementModule({ 
  onOpenKtpModal, 
  onViewKta,
  records,
  setRecords 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKab, setSelectedKab] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedMethod, setSelectedMethod] = useState('ALL');
  const [selectedRecordForDetail, setSelectedRecordForDetail] = useState(null);

  // Filter records
  const filteredRecords = records.filter((rec) => {
    const matchesSearch = 
      rec.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.nik.includes(searchTerm) ||
      rec.kecamatan.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesKab = selectedKab === 'ALL' || rec.kabKota === selectedKab;
    const matchesStatus = selectedStatus === 'ALL' || rec.verificationStatus === selectedStatus;
    const matchesMethod = selectedMethod === 'ALL' || rec.method === selectedMethod;

    return matchesSearch && matchesKab && matchesStatus && matchesMethod;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-wrap">
          <h1 className="page-title">Database Pemuda & Generasi Muda Golkar</h1>
          <p className="page-description">
            Sistem pendataan administratif pemuda berbasis KTP, OCR extraction, verifikasi kader, dan integrasi penomoran KTA digital otomatis.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-secondary"
            onClick={() => alert('Fitur Import CSV/Excel: File template siap diunduh.')}
          >
            <FileSpreadsheet size={14} />
            <span>Import Excel / CSV</span>
          </button>
          <button 
            className="btn-primary"
            onClick={onOpenKtpModal}
          >
            <ScanLine size={15} />
            <span>Scan KTP & Ekstraksi Data</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="enterprise-panel" style={{ padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ flex: '1 1 240px', position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              className="form-input" 
              style={{ width: '100%', paddingLeft: '34px' }}
              placeholder="Cari NIK, Nama Pemuda, atau Kecamatan..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Regency Filter */}
          <div style={{ minWidth: '180px' }}>
            <select 
              className="form-select" 
              style={{ width: '100%' }}
              value={selectedKab}
              onChange={(e) => setSelectedKab(e.target.value)}
            >
              <option value="ALL">Semua Kab/Kota (35 Daerah)</option>
              {KAB_KOTA_JATENG.map(k => (
                <option key={k.id} value={k.name}>{k.name}</option>
              ))}
            </select>
          </div>

          {/* Verification Status Filter */}
          <div style={{ minWidth: '150px' }}>
            <select 
              className="form-select" 
              style={{ width: '100%' }}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="ALL">Semua Status Verif</option>
              <option value="Verified">Terverifikasi (Valid)</option>
              <option value="Pending">Pending Verifikasi</option>
              <option value="Duplicate">Terdeteksi Duplikat</option>
            </select>
          </div>

          {/* Method Filter */}
          <div style={{ minWidth: '170px' }}>
            <select 
              className="form-select" 
              style={{ width: '100%' }}
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
            >
              <option value="ALL">Semua Metode Registrasi</option>
              <option value="Assisted Registration">Assisted (Kader/Operator)</option>
              <option value="Self Registration">Self Registration (Mandiri)</option>
            </select>
          </div>

          {/* Result Count */}
          <div style={{ marginLeft: 'auto', fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>
            Menampilkan <strong style={{ color: '#0f172a' }}>{filteredRecords.length}</strong> dari {records.length} data pemuda
          </div>
        </div>
      </div>

      {/* Main Table Panel */}
      <div className="enterprise-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Data Pemuda & NIK</th>
                <th>Wilayah Administratif</th>
                <th>Profil & Organisasi</th>
                <th>Metode & Audit Trail</th>
                <th>Status KTA</th>
                <th>Status Verifikasi</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((item) => (
                <tr key={item.id}>
                  {/* NIK & Name */}
                  <td>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '13.5px' }}>{item.nama}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
                      <span>NIK: {item.nik}</span>
                      <span>·</span>
                      <span>{item.gender === 'Laki-Laki' ? 'L' : 'P'}</span>
                    </div>
                  </td>

                  {/* Region */}
                  <td>
                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{item.kabKota}</div>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                      Kec. {item.kecamatan}, Kel. {item.kelurahan}
                    </div>
                  </td>

                  {/* Profile & Org */}
                  <td>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{item.statusPemuda}</div>
                    <div style={{ display: 'flex', gap: '4px', marginTop: '3px' }}>
                      <span className="metric-badge badge-warning" style={{ fontSize: '10px', padding: '1px 6px' }}>
                        {item.organisasi}
                      </span>
                      <span style={{ fontSize: '10.5px', color: '#64748b' }}>{item.interest}</span>
                    </div>
                  </td>

                  {/* Audit Trail: Registered By */}
                  <td>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>{item.method}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      Oleh: <strong style={{ color: '#0f172a' }}>{item.registeredBy}</strong>
                    </div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Tgl: {item.registrationDate}</div>
                  </td>

                  {/* KTA Status */}
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span 
                        className={`metric-badge ${
                          item.ktaStatus === 'Printed' || item.ktaStatus === 'Delivered' 
                            ? 'badge-success' 
                            : item.ktaStatus === 'Generated' 
                            ? 'badge-info' 
                            : 'badge-neutral'
                        }`}
                        style={{ width: 'fit-content' }}
                      >
                        {item.ktaStatus}
                      </span>
                      <span style={{ fontSize: '10px', fontFamily: 'monospace', color: '#64748b' }}>
                        {item.ktaNumber}
                      </span>
                    </div>
                  </td>

                  {/* Verification Status */}
                  <td>
                    {item.verificationStatus === 'Verified' && (
                      <span className="metric-badge badge-success">
                        <CheckCircle2 size={11} style={{ marginRight: '4px' }} />
                        Verified
                      </span>
                    )}
                    {item.verificationStatus === 'Pending' && (
                      <span className="metric-badge badge-warning">
                        Pending
                      </span>
                    )}
                    {item.verificationStatus === 'Duplicate' && (
                      <span className="metric-badge badge-danger">
                        <AlertTriangle size={11} style={{ marginRight: '4px' }} />
                        Duplicate NIK
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      <button 
                        className="icon-btn" 
                        style={{ width: '30px', height: '30px' }}
                        title="Lihat KTA Digital"
                        onClick={() => onViewKta(item)}
                      >
                        <CreditCard size={14} color="#d97706" />
                      </button>
                      <button 
                        className="icon-btn" 
                        style={{ width: '30px', height: '30px' }}
                        title="Lihat Detail Profil & Dokumen"
                        onClick={() => setSelectedRecordForDetail(item)}
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecordForDetail && (
        <div className="modal-overlay" onClick={() => setSelectedRecordForDetail(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Detail Registrasi Pemuda</h3>
                <p style={{ fontSize: '12px', color: '#64748b' }}>Audit trail ID: {selectedRecordForDetail.id}</p>
              </div>
              <button className="icon-btn" onClick={() => setSelectedRecordForDetail(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label">Nomor Induk Kependudukan (NIK)</label>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
                    {selectedRecordForDetail.nik}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Nama Lengkap</label>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
                    {selectedRecordForDetail.nama}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Tempat, Tanggal Lahir</label>
                  <div style={{ color: '#334155' }}>
                    {selectedRecordForDetail.birthPlace}, {selectedRecordForDetail.birthDate}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">No. Telepon / WhatsApp</label>
                  <div style={{ color: '#334155', fontWeight: 600 }}>
                    {selectedRecordForDetail.phone}
                  </div>
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Alamat Lengkap</label>
                  <div style={{ color: '#334155' }}>
                    {selectedRecordForDetail.address}, Kel. {selectedRecordForDetail.kelurahan}, Kec. {selectedRecordForDetail.kecamatan}, {selectedRecordForDetail.kabKota}, Jawa Tengah
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Status & Minat Isu</label>
                  <div style={{ color: '#334155' }}>
                    {selectedRecordForDetail.statusPemuda} · {selectedRecordForDetail.interest}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Sayap Organisasi</label>
                  <div>
                    <span className="metric-badge badge-warning">{selectedRecordForDetail.organisasi}</span>
                  </div>
                </div>
              </div>

              {/* Audit Trail Box */}
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  Audit Trail Pendataan (Sesuai PRD Seksi 2.2)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '11.5px' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>Metode Input:</span>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedRecordForDetail.method}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Inputter / Kader:</span>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedRecordForDetail.registeredBy}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Waktu Registrasi:</span>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{selectedRecordForDetail.registrationDate}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedRecordForDetail(null)}>Tutup</button>
              <button 
                className="btn-primary" 
                onClick={() => {
                  const target = selectedRecordForDetail;
                  setSelectedRecordForDetail(null);
                  onViewKta(target);
                }}
              >
                <CreditCard size={14} />
                <span>Buka KTA Digital</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
