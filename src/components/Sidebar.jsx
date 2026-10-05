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
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  collapsed, 
  setCollapsed,
  youthCount = 384500,
  eventCount = 5,
  pendingC1Count = 12
}) {
  const navSections = [
    {
      title: 'COMMAND CENTER',
      items: [
        { id: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard, badge: 'Live' },
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
            <div className="brand-icon">
              <Sparkles size={22} />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-title">GOLKAR JATENG</span>
              <span className="brand-subtitle">Youth & Command Center</span>
            </div>
          </div>
        ) : (
          <div className="brand-icon" style={{ margin: '0 auto' }}>
            <Sparkles size={22} />
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

      {/* Footer Status */}
      <div className="sidebar-footer">
        {!collapsed ? (
          <div className="system-status-pill">
            <span className="status-dot-pulse"></span>
            <span>G-Core Cloud: Terhubung</span>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className="status-dot-pulse"></span>
          </div>
        )}
      </div>
    </aside>
  );
}
