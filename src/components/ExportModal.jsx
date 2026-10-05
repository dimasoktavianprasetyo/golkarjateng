import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  FileText, 
  FileCode, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export default function ExportModal({ isOpen, onClose, activeRole }) {
  if (!isOpen) return null;

  const [datasetType, setDatasetType] = useState('youth'); // 'youth' | 'kta' | 'tps' | 'audit'
  const [format, setFormat] = useState('xlsx'); // 'xlsx' | 'csv' | 'pdf'
  const [isExporting, setIsExporting] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setDownloadReady(false);

    setTimeout(() => {
      setIsExporting(false);
      setDownloadReady(true);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileSpreadsheet size={18} color="#d97706" />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                Pusat Ekspor Data & Laporan Resmi
              </h3>
              <p style={{ fontSize: '11.5px', color: '#64748b' }}>
                Unduh rekapitulasi data terenkripsi sesuai ketentuan PRD Seksi 7 & 17.
              </p>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Dataset Type Selector */}
          <div className="form-group">
            <label className="form-label">Pilih Modul Data yang Diekspor</label>
            <select 
              className="form-select"
              value={datasetType}
              onChange={(e) => setDatasetType(e.target.value)}
            >
              <option value="youth">Database Pemuda & NIK Terverifikasi (35 Kab/Kota)</option>
              <option value="kta">Laporan Penerbitan KTA Digital & Status Pengiriman</option>
              <option value="tps">Rekapitulasi Suara C1 Plano TPS Se-Jateng</option>
              <option value="audit">Log Audit Trail & Aktivitas Sistem (Keamanan)</option>
            </select>
          </div>

          {/* Format Radio Selection */}
          <div className="form-group">
            <label className="form-label">Format Dokumen Output</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div 
                onClick={() => setFormat('xlsx')}
                style={{
                  border: `2px solid ${format === 'xlsx' ? '#f59e0b' : '#e2e8f0'}`,
                  borderRadius: '10px',
                  padding: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: format === 'xlsx' ? '#fffdf5' : '#ffffff'
                }}
              >
                <FileSpreadsheet size={22} color="#059669" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>Excel (.xlsx)</div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>Spreadsheet</div>
              </div>

              <div 
                onClick={() => setFormat('csv')}
                style={{
                  border: `2px solid ${format === 'csv' ? '#f59e0b' : '#e2e8f0'}`,
                  borderRadius: '10px',
                  padding: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: format === 'csv' ? '#fffdf5' : '#ffffff'
                }}
              >
                <FileCode size={22} color="#0284c7" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>CSV Tabular</div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>Data Mentah</div>
              </div>

              <div 
                onClick={() => setFormat('pdf')}
                style={{
                  border: `2px solid ${format === 'pdf' ? '#f59e0b' : '#e2e8f0'}`,
                  borderRadius: '10px',
                  padding: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: format === 'pdf' ? '#fffdf5' : '#ffffff'
                }}
              >
                <FileText size={22} color="#e11d48" style={{ margin: '0 auto 4px' }} />
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>PDF Report</div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>Resmi Berkop</div>
              </div>
            </div>
          </div>

          {/* Access Warning info */}
          <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '11.5px', color: '#64748b', lineHeight: 1.4 }}>
            <ShieldCheck size={14} color="#059669" style={{ display: 'inline', marginRight: '4px' }} />
            Otorisasi Ekspor: <strong>{activeRole.toUpperCase()}</strong>. Seluruh proses ekspor akan dicatat secara otomatis dalam Audit Trail sesuai kepatuhan perlindungan data pribadi (UU PDP).
          </div>

          {/* Download Ready notification */}
          {downloadReady && (
            <div style={{ marginTop: '14px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#059669" />
              <span style={{ fontSize: '12px', color: '#065f46', fontWeight: 600 }}>
                File laporan siap! Unduhan simulasi telah dimulai otomatis.
              </span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Tutup</button>
          <button className="btn-primary" onClick={handleExport} disabled={isExporting}>
            <Download size={14} />
            <span>{isExporting ? 'Membuat Berkas...' : 'Ekspor & Unduh File'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
