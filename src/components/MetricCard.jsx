import React from 'react';

export default function MetricCard({
  icon: Icon,
  iconBg = '#FEF3C7',
  iconColor = '#D97706',
  title,
  badges = [],
  value,
  unit,
  subtext,
  visualType = 'sparkline-green', // 'sparkline-green' | 'sparkline-red' | 'slider-progress' | 'mini-bars'
  visualValue = 85
}) {
  return (
    <div className="metric-card">
      {/* Top Row: Icon + Title */}
      <div className="metric-card-header">
        <div 
          className="metric-icon-circle"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          {Icon && <Icon size={18} strokeWidth={2.2} />}
        </div>
        <span className="metric-card-title">{title}</span>
      </div>

      {/* Second Row: Badges / Pill Tags */}
      <div className="metric-card-badges">
        {badges.map((badge, idx) => {
          let badgeClass = 'badge-neutral';
          if (badge.type === 'success') badgeClass = 'badge-success';
          if (badge.type === 'danger') badgeClass = 'badge-danger';
          if (badge.type === 'info') badgeClass = 'badge-info';
          if (badge.type === 'warning') badgeClass = 'badge-warning';

          return (
            <span key={idx} className={`metric-badge ${badgeClass}`}>
              {badge.label}
            </span>
          );
        })}
      </div>

      {/* Third Row: Big Metric Value + Unit */}
      <div className="metric-card-value-wrap">
        <span className="metric-card-value">{value}</span>
        {unit && <span className="metric-card-unit">{unit}</span>}
      </div>

      {/* Fourth Row: Subtext + Micro-visualization */}
      <div className="metric-card-footer">
        <span className="metric-card-subtext">{subtext}</span>
        
        <div className="metric-card-visual">
          {visualType === 'sparkline-green' && (
            <svg width="48" height="22" viewBox="0 0 48 22" fill="none">
              <path 
                d="M2 18C8 18 12 12 18 12C24 12 28 8 36 8C42 8 44 4 46 3" 
                stroke="#10B981" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}

          {visualType === 'sparkline-red' && (
            <svg width="48" height="22" viewBox="0 0 48 22" fill="none">
              <path 
                d="M2 16C10 16 14 8 22 8C30 8 34 14 40 14C43 14 45 12 46 11" 
                stroke="#E11D48" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}

          {visualType === 'slider-progress' && (
            <div className="slider-progress-wrap" title={`${visualValue}% Validasi`}>
              <div className="slider-track-green" style={{ width: '60%' }}></div>
              <div className="slider-dot"></div>
              <div className="slider-track-grey"></div>
            </div>
          )}

          {visualType === 'mini-bars' && (
            <div className="mini-bars-wrap">
              <span className="mini-bar" style={{ height: '35%' }}></span>
              <span className="mini-bar" style={{ height: '55%' }}></span>
              <span className="mini-bar" style={{ height: '70%' }}></span>
              <span className="mini-bar" style={{ height: '88%' }}></span>
              <span className="mini-bar" style={{ height: '100%' }}></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
