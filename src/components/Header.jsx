import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  UserCheck, 
  ScanLine, 
  QrCode, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { NOTIFICATIONS_LOG } from '../data/mockData';

export default function Header({ 
  activeRole, 
  setActiveRole, 
  onOpenKtpModal, 
  onOpenQrModal,
  onOpenExportModal,
  searchQuery,
  setSearchQuery,
  onSelectSearchResult
}) {
  const [currentTime, setCurrentTime] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('id-ID', { hour12: false });
      const dateStr = now.toLocaleDateString('id-ID', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      });
      setCurrentTime(`${timeStr} WIB · ${dateStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const roles = [
    { id: 'super_admin', label: 'Super Admin — DPD I Jawa Tengah', short: 'Super Admin', scope: 'Seluruh 35 Kab/Kota' },
    { id: 'dpd_semarang', label: 'DPD II Kota Semarang', short: 'Kota Semarang', scope: 'Wilayah Kota Semarang' },
    { id: 'dpd_banyumas', label: 'DPD II Kab. Banyumas', short: 'Kab. Banyumas', scope: 'Wilayah Banyumas & Dapil VIII' },
    { id: 'operator', label: 'Operator / Enumerator Pemuda', short: 'Operator', scope: 'Data Entry & Assisted Verif' },
    { id: 'saksi_tps', label: 'Saksi TPS Lapangan (BSNPG)', short: 'Saksi TPS', scope: 'Upload C1 Plano & Rekapitulasi' }
  ];

  const currentRoleObj = roles.find(r => r.id === activeRole) || roles[0];

  return (
    <header className="top-header">
      {/* Left: Global Search Omnibar */}
      <div className="header-left">
        <div className="search-box">
          <Search size={15} className="text-slate-400" style={{ flexShrink: 0 }} />
          <input
            type="text"
            className="search-input"
            placeholder="Cari NIK, Pemuda, TPS, Kab/Kota..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-shortcut">⌘K</span>
        </div>

        {/* Live Clock & Server Pulse */}
        <div className="system-status-pill">
          <Clock size={13} className="text-slate-500" style={{ flexShrink: 0 }} />
          <span>{currentTime}</span>
        </div>
      </div>

      {/* Right: Quick Tools, Role Switcher & Profile */}
      <div className="header-right">
        {/* Quick KTP Scan Button */}
        <button 
          className="quick-action-btn"
          onClick={onOpenKtpModal}
          title="Scan KTP Fisik untuk Ekstraksi Data Otomatis via OCR"
        >
          <ScanLine size={16} />
          <span>Scan KTP</span>
        </button>

        {/* Quick QR Check-in Button */}
        <button 
          className="btn-secondary"
          onClick={onOpenQrModal}
          style={{ height: '36px', padding: '0 14px', fontSize: '12.5px' }}
          title="Pindai QR Peserta untuk Presensi Event"
        >
          <QrCode size={15} />
          <span>Check-in QR</span>
        </button>

        {/* Export Center Trigger */}
        <button
          className="icon-btn"
          onClick={onOpenExportModal}
          title="Export Data ke Excel, CSV & PDF"
        >
          <FileSpreadsheet size={17} />
        </button>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            className="icon-btn"
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            title="Pusat Notifikasi & Log WhatsApp"
          >
            <Bell size={18} />
            <span className="notif-badge-dot"></span>
          </button>

          {showNotifMenu && (
            <div 
              style={{
                position: 'absolute',
                right: 0,
                top: '46px',
                width: '360px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
                zIndex: 50,
                padding: '14px',
                animation: 'slideUp 0.15s ease-out'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>Pusat Notifikasi Real-time</span>
                <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>WhatsApp Engine Ready</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                {NOTIFICATIONS_LOG.map((notif) => (
                  <div 
                    key={notif.id}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      backgroundColor: notif.type === 'warning' ? '#fff1f2' : '#f8fafc',
                      border: `1px solid ${notif.type === 'warning' ? '#fecdd3' : '#e2e8f0'}`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      {notif.type === 'warning' ? <AlertTriangle size={13} color="#e11d48" /> : <CheckCircle2 size={13} color="#10b981" />}
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{notif.title}</span>
                      <span style={{ fontSize: '10px', color: '#94a3b8', marginLeft: 'auto' }}>{notif.time}</span>
                    </div>
                    <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.4 }}>{notif.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher Simulator */}
        <div style={{ position: 'relative' }}>
          <div 
            className="role-switcher"
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            title="Ganti Mode Hak Akses (RBAC Simulator)"
          >
            <ShieldCheck size={14} color="#d97706" style={{ flexShrink: 0 }} />
            <span>Role:</span>
            <span className="role-badge">{currentRoleObj.short || currentRoleObj.label}</span>
            <ChevronDown size={13} style={{ flexShrink: 0 }} />
          </div>

          {showRoleMenu && (
            <div 
              style={{
                position: 'absolute',
                right: 0,
                top: '42px',
                width: '320px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.1)',
                zIndex: 50,
                padding: '8px',
                animation: 'slideUp 0.15s ease-out'
              }}
            >
              <div style={{ padding: '8px 10px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Simulasi Hak Akses (RBAC)
              </div>
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => {
                    setActiveRole(role.id);
                    setShowRoleMenu(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: activeRole === role.id ? '#fef3c7' : 'transparent',
                    marginBottom: '4px',
                    transition: 'background-color 0.15s'
                  }}
                >
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: activeRole === role.id ? '#b45309' : '#1e293b' }}>
                    {role.label}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    Cakupan: {role.scope}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="user-profile">
          <div className="user-avatar">
            PG
          </div>
          <div className="user-info">
            <span className="user-name">Ir. Panggah Susanto, M.M.</span>
            <span className="user-role">Ketua DPD I GOLKAR Jateng</span>
          </div>
        </div>
      </div>
    </header>
  );
}
