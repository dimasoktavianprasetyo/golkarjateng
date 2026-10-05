import React from 'react';
import { 
  X, 
  FileText, 
  CreditCard, 
  UserCheck, 
  ShieldCheck, 
  KeyRound, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  ExternalLink, 
  LogOut 
} from 'lucide-react';
import golkarLogo from '../assets/Logo_Golkar.webp';

export default function AccountProfileModal({ 
  isOpen, 
  onClose, 
  activeRole, 
  onNavigateTab,
  onLogout 
}) {
  if (!isOpen) return null;

  const roleLabels = {
    super_admin: 'Super Admin — DPD I Jawa Tengah',
    dpd_semarang: 'Admin DPD II Kota Semarang',
    dpd_banyumas: 'Admin DPD II Kab. Banyumas',
    operator: 'Operator / Enumerator Pemuda',
    saksi_tps: 'Saksi TPS Lapangan (BSNPG)'
  };

  const currentRoleLabel = roleLabels[activeRole] || 'Super Admin — DPD I Jawa Tengah';

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        className="modal-content" 
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(15, 23, 42, 0.35)',
          overflow: 'hidden',
          animation: 'slideUp 0.18s ease-out'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={golkarLogo} 
              alt="Logo Golkar" 
              style={{ width: '34px', height: '34px', objectFit: 'contain' }} 
            />
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                Profil Akun Pimpinan DPD I
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Pusat Komando Eksekutif Partai GOLKAR Jawa Tengah
              </div>
            </div>
          </div>

          <button 
            className="icon-btn"
            style={{ width: '32px', height: '32px' }}
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '22px 24px' }}>
          {/* User Profile Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '16px',
            borderRadius: '14px',
            backgroundColor: '#fffdf5',
            border: '1px solid #fef3c7',
            marginBottom: '18px'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#0f172a',
              color: '#f59e0b',
              fontWeight: 800,
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #f59e0b',
              boxShadow: '0 4px 10px rgba(245, 158, 11, 0.25)',
              flexShrink: 0
            }}>
              PG
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                Ir. Panggah Susanto, M.M.
              </div>
              <div style={{ fontSize: '12px', color: '#b45309', fontWeight: 700 }}>
                Ketua DPD I Partai GOLKAR Provinsi Jawa Tengah
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                Anggota DPR-RI Komisi IV (Dapil Jateng VI)
              </div>
            </div>
          </div>

          {/* Account Details Data Grid */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '12.5px',
            marginBottom: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Nomor KTA Digital:</span>
              <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>33.74.01.196205.0001</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>NIK Kependudukan:</span>
              <strong style={{ color: '#0f172a', fontFamily: 'monospace' }}>3374011205620001</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Hak Akses Aktif:</span>
              <span style={{ 
                padding: '2px 8px', 
                borderRadius: '6px', 
                backgroundColor: '#fef3c7', 
                color: '#b45309', 
                fontWeight: 700,
                fontSize: '11.5px'
              }}>
                {currentRoleLabel}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Wilayah Kerja:</span>
              <strong style={{ color: '#0f172a' }}>35 Kabupaten / Kota se-Jateng</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Email Kontak:</span>
              <strong style={{ color: '#2563eb' }}>panggah.susanto@golkarjateng.or.id</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Keamanan Sesi:</span>
              <span style={{ color: '#16a34a', fontWeight: 600 }}>TLS 1.3 · IP 182.253.14.88 (Online Aktif)</span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button
                className="btn-secondary"
                onClick={() => {
                  onClose();
                  if (onNavigateTab) onNavigateTab('executive_reports');
                }}
                style={{ justifyContent: 'center', height: '36px', fontSize: '11.5px', padding: '0 6px' }}
              >
                <FileText size={13} />
                <span>Laporan</span>
              </button>

              <button
                className="btn-secondary"
                onClick={() => {
                  onClose();
                  if (onNavigateTab) onNavigateTab('access_control');
                }}
                style={{ justifyContent: 'center', height: '36px', fontSize: '11.5px', padding: '0 6px' }}
              >
                <UserCheck size={13} />
                <span>Kelola Akses</span>
              </button>

              <button
                className="btn-secondary"
                onClick={() => {
                  onClose();
                  if (onNavigateTab) onNavigateTab('kta');
                }}
                style={{ justifyContent: 'center', height: '36px', fontSize: '11.5px', padding: '0 6px' }}
              >
                <CreditCard size={13} />
                <span>KTA Saya</span>
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onLogout) onLogout();
                }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  height: '38px',
                  borderRadius: '10px',
                  border: '1px solid #fee2e2',
                  backgroundColor: '#fef2f2',
                  color: '#dc2626',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fee2e2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fef2f2';
                }}
              >
                <LogOut size={14} />
                <span>Keluar (Logout)</span>
              </button>

              <button
                className="btn-secondary"
                onClick={onClose}
                style={{ flex: 1, justifyContent: 'center', height: '38px', fontSize: '12px', backgroundColor: '#f8fafc' }}
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
