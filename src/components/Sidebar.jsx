import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  CreditCard, 
  CalendarDays, 
  Trophy, 
  Vote, 
  Building2, 
  FileText, 
  BarChart3, 
  ShieldAlert, 
  UserCheck,
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Terminal
} from 'lucide-react';
import golkarLogo from '../assets/Logo_Golkar.webp';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  collapsed, 
  setCollapsed,
  youthCount = 384500,
  eventCount = 5,
  pendingC1Count = 12,
  onOpenAccountModal
}) {
  const navSections = [
    {
      title: 'COMMAND CENTER',
      items: [
        { id: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard, badge: 'Live' },
        { id: 'executive_reports', label: 'Executive Reports', icon: FileText, badge: 'Q3' },
        { id: 'webgis', label: 'WebGIS Jawa Tengah', icon: Map, badge: '35 Kab' }
      ]
    },
    {
      title: 'DATA & KEANGGOTAAN',
      items: [
        { id: 'youth', label: 'Database Pemuda', icon: Users, badge: '384k' },
        { id: 'kta', label: 'Manajemen KTA Digital', icon: CreditCard, badge: 'QR KTA' },
        { id: 'members', label: 'Struktur Organisasi', icon: Building2 }
      ]
    },
    {
      title: 'OPERASIONAL & EVENT',
      items: [
        { id: 'events', label: 'Event & Check-in QR', icon: CalendarDays, badge: eventCount },
        { id: 'contributors', label: 'Kader & Leaderboard', icon: Trophy, badge: 'Top 10' },
        { id: 'field_ops', label: 'Saksi TPS & C1 Plano', icon: Vote, badge: `${pendingC1Count} Review` },
        { id: 'board_activity', label: 'Laporan Kegiatan Dewan', icon: FileText }
      ]
    },
    {
      title: 'INTELIJEN & SISTEM',
      items: [
        { id: 'social_monitoring', label: 'Monitoring Isu Publik', icon: BarChart3, badge: '+18%' },
        { id: 'access_control', label: 'Kelola Akses & Pengguna', icon: UserCheck, badge: '5 Peran' },
        { id: 'developers', label: 'Golkar for Developers', icon: Terminal, badge: 'API' },
        { id: 'audit', label: 'Audit Trail & Keamanan', icon: ShieldAlert }
      ]
    }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        {!collapsed ? (
          <div className="sidebar-brand">
            <div className="brand-icon" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
              <img 
                src={golkarLogo} 
                alt="Logo Golkar Jateng" 
                style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
              />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-title">GOLKAR JATENG</span>
              <span className="brand-subtitle">Youth & Command Center</span>
            </div>
          </div>
        ) : (
          <div className="brand-icon" style={{ margin: '0 auto', backgroundColor: 'transparent', boxShadow: 'none' }}>
            <img 
              src={golkarLogo} 
              alt="Logo Golkar Jateng" 
              style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
            />
          </div>
        )}

        <button 
          className="icon-btn"
          style={{ width: '28px', height: '28px' }}
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Perluas Sidebar" : "Perkecil Sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav List */}
      <nav className="sidebar-nav">
        {navSections.map((section, sIdx) => (
          <div key={sIdx}>
            {!collapsed && <div className="nav-group-title">{section.title}</div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {section.items.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentTab === item.id;

                return (
                  <div
                    key={item.id}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setCurrentTab(item.id)}
                    title={collapsed ? item.label : undefined}
                  >
                    <IconComponent size={18} strokeWidth={isActive ? 2.4 : 1.8} style={{ flexShrink: 0 }} />
                    {!collapsed && <span className="nav-item-label">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer User Account & Status (Pojok Kiri Bawah) */}
      <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: collapsed ? '12px 6px' : '14px' }}>
        {/* User Account Card */}
        {!collapsed ? (
          <div 
            onClick={() => onOpenAccountModal && onOpenAccountModal()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 10px',
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fffdf5';
              e.currentTarget.style.borderColor = '#fde68a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
            title="Profil Akun Pimpinan (Klik untuk Buka Detail)"
          >
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#0f172a',
                color: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11.5px',
                fontWeight: 800,
                flexShrink: 0,
                position: 'relative'
              }}
            >
              PG
              <span 
                style={{
                  position: 'absolute',
                  bottom: '-1px',
                  right: '-1px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  border: '2px solid #ffffff'
                }}
              />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Ir. Panggah Susanto, M.M.
              </div>
              <div style={{ fontSize: '10.5px', color: '#b45309', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Ketua DPD I GOLKAR
              </div>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => onOpenAccountModal && onOpenAccountModal()}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#0f172a',
              color: '#f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 800,
              margin: '0 auto',
              cursor: 'pointer',
              position: 'relative'
            }}
            title="Ir. Panggah Susanto, M.M. (Ketua DPD I)"
          >
            PG
            <span 
              style={{
                position: 'absolute',
                bottom: '-1px',
                right: '-1px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                border: '2px solid #ffffff'
              }}
            />
          </div>
        )}

        {/* System Connectivity Status */}
        {!collapsed ? (
          <div className="system-status-pill" style={{ justifyContent: 'center', padding: '4px 10px', fontSize: '10.5px' }}>
            <span className="status-dot-pulse"></span>
            <span>G-Core Cloud Terhubung</span>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className="status-dot-pulse" title="G-Core Cloud Terhubung"></span>
          </div>
        )}
      </div>
    </aside>
  );
}
