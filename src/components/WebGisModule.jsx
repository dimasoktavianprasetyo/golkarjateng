import React, { useState } from 'react';
import { 
  Map, 
  Layers, 
  Filter, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Vote, 
  Phone, 
  Send, 
  Eye, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { KAB_KOTA_JATENG } from '../data/mockData';

export default function WebGisModule({ onNavigateYouth }) {
  const [selectedKab, setSelectedKab] = useState(KAB_KOTA_JATENG[0]); // default Semarang
  const [viewMode, setViewMode] = useState('density'); // 'density' | 'target' | 'tps'
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKabList = KAB_KOTA_JATENG.filter(k => 
    k.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.dapil.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper color scale for map points
  const getNodeColor = (kab) => {
    if (viewMode === 'density') {
      if (kab.youthCount > 15000) return '#D97706'; // high gold
      if (kab.youthCount > 10000) return '#F59E0B'; // medium gold
      return '#FCD34D'; // light gold
    } else if (viewMode === 'target') {
      const pct = (kab.youthCount / kab.target) * 100;
      if (pct >= 95) return '#10B981'; // green
      if (pct >= 85) return '#0284C7'; // blue
      return '#F59E0B'; // amber
    } else {
      // tps c1
      return '#059669';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-wrap">
          <h1 className="page-title">Sistem Informasi Geografis (WebGIS) Jawa Tengah</h1>
          <p className="page-description">
            Pemetaan spasial agregat distribusi kader pemuda, capaian target kuota, dan cakupan TPS di 35 Kabupaten/Kota se-Jawa Tengah.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', gap: '8px', backgroundColor: '#ffffff', padding: '4px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <button 
            style={{ 
              padding: '6px 14px', 
              fontSize: '12px', 
              fontWeight: 700, 
              borderRadius: '8px', 
              border: 'none', 
              cursor: 'pointer',
              backgroundColor: viewMode === 'density' ? '#fef3c7' : 'transparent',
              color: viewMode === 'density' ? '#b45309' : '#64748b'
            }}
            onClick={() => setViewMode('density')}
          >
            Kepadatan Pemuda
          </button>
          <button 
            style={{ 
              padding: '6px 14px', 
              fontSize: '12px', 
              fontWeight: 700, 
              borderRadius: '8px', 
              border: 'none', 
              cursor: 'pointer',
              backgroundColor: viewMode === 'target' ? '#ecfdf5' : 'transparent',
              color: viewMode === 'target' ? '#065f46' : '#64748b'
            }}
            onClick={() => setViewMode('target')}
          >
            Capaian Target (%)
          </button>
          <button 
            style={{ 
              padding: '6px 14px', 
              fontSize: '12px', 
              fontWeight: 700, 
              borderRadius: '8px', 
              border: 'none', 
              cursor: 'pointer',
              backgroundColor: viewMode === 'tps' ? '#f0f9ff' : 'transparent',
              color: viewMode === 'tps' ? '#0369a1' : '#64748b'
            }}
            onClick={() => setViewMode('tps')}
          >
            Cakupan C1 TPS
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map (Left) and Regency Inspector (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '24px' }}>
        {/* Map Panel */}
        <div className="enterprise-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header" style={{ marginBottom: '12px' }}>
            <div className="panel-title-wrap">
              <span className="panel-title">Peta Spasial Terintegrasi Jawa Tengah</span>
              <span className="panel-subtitle">Klik simpul wilayah untuk inspeksi detail</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#D97706' }}></span>
                <span>Tinggi</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
                <span>Sedang</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FCD34D' }}></span>
                <span>Dasar</span>
              </div>
            </div>
          </div>

          {/* SVG Map Canvas of Central Java */}
          <div 
            style={{ 
              position: 'relative', 
              backgroundColor: '#F8FAFC', 
              borderRadius: '16px', 
              border: '1px solid #E2E8F0', 
              height: '460px', 
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Water / Background contour */}
            <svg 
              viewBox="100 50 750 440" 
              style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.04))' }}
            >
              {/* Jawa Tengah Island Contour Outline */}
              <path 
                d="M 120 180 Q 200 120 340 130 T 520 160 T 630 80 T 720 130 T 820 140 L 800 240 Q 760 300 680 440 Q 640 450 560 380 Q 420 380 320 380 Q 200 370 160 360 Q 140 300 130 240 Z" 
                fill="#EDF2F7" 
                stroke="#CBD5E1" 
                strokeWidth="2" 
                strokeDasharray="4 2"
              />

              {/* Connecting lines for regional clusters */}
              <line x1="520" y1="160" x2="620" y2="340" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="520" y1="160" x2="230" y2="310" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="620" y1="340" x2="680" y2="340" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />

              {/* Interactive Regency Nodes */}
              {KAB_KOTA_JATENG.map((kab) => {
                const isSelected = selectedKab.id === kab.id;
                const nodeColor = getNodeColor(kab);
                const radius = isSelected ? 16 : (kab.youthCount > 12000 ? 12 : 9);

                return (
                  <g 
                    key={kab.id} 
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    onClick={() => setSelectedKab(kab)}
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle 
                        cx={kab.x} 
                        cy={kab.y} 
                        r={radius + 8} 
                        fill="none" 
                        stroke="#F59E0B" 
                        strokeWidth="2" 
                        opacity="0.6"
                      >
                        <animate attributeName="r" values={`${radius + 4};${radius + 12};${radius + 4}`} dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Main Node Circle */}
                    <circle 
                      cx={kab.x} 
                      cy={kab.y} 
                      r={radius} 
                      fill={nodeColor} 
                      stroke="#FFFFFF" 
                      strokeWidth={isSelected ? 3 : 2} 
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
                    />

                    {/* Regency Label */}
                    <text 
                      x={kab.x} 
                      y={kab.y - radius - 5} 
                      textAnchor="middle" 
                      fontSize={isSelected ? '12' : '9.5'} 
                      fontWeight={isSelected ? '800' : '600'} 
                      fill={isSelected ? '#0F172A' : '#475569'}
                      style={{ pointerEvents: 'none', textShadow: '0 1px 3px #ffffff' }}
                    >
                      {kab.name.replace('Kab. ', '').replace('Kota ', '')}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Floating Map Legend Indicator */}
            <div 
              style={{
                position: 'absolute',
                bottom: '14px',
                left: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(6px)',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '8px 12px',
                fontSize: '11px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ fontWeight: 700, color: '#0f172a' }}>Wilayah Terpilih: {selectedKab.name}</div>
              <div style={{ color: '#64748b' }}>Koordinat: {selectedKab.x} E, {selectedKab.y} S · Dapil {selectedKab.dapil}</div>
            </div>
          </div>
        </div>

        {/* Right: Regency Detailed Inspector Card */}
        <div className="enterprise-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">{selectedKab.name}</span>
              <span className="metric-badge badge-warning">{selectedKab.dapil}</span>
            </div>
            <span className="metric-badge badge-success">Optimal</span>
          </div>

          {/* Quick Metrics of the Regency */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Total Pemuda Terdata</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                {selectedKab.youthCount.toLocaleString('id-ID')}
              </div>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>
                {((selectedKab.youthCount / selectedKab.target) * 100).toFixed(1)}% dari target
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>KTA Digital Terbit</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669' }}>
                {selectedKab.ktaCount.toLocaleString('id-ID')}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                {((selectedKab.ktaCount / selectedKab.youthCount) * 100).toFixed(1)}% terdistribusi
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>C1 Plano Terverifikasi</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0284c7' }}>
                {selectedKab.c1Submitted.toLocaleString('id-ID')}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                dari {selectedKab.tpsCount.toLocaleString('id-ID')} TPS
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Target Kuota Daerah</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#b45309' }}>
                {selectedKab.target.toLocaleString('id-ID')}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Tersisa {(selectedKab.target - selectedKab.youthCount).toLocaleString('id-ID')}</div>
            </div>
          </div>

          {/* Regional Youth Coordinator Info */}
          <div style={{ backgroundColor: '#fffdf5', border: '1px solid #fef3c7', borderRadius: '12px', padding: '14px', marginBottom: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#b45309', marginBottom: '6px' }}>
              Koordinator Lapangan & PIC Daerah
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>{selectedKab.coordinator}</div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>DPD Golkar {selectedKab.name}</div>
              </div>
              <a 
                href={`https://wa.me/${selectedKab.phone.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="btn-primary" 
                style={{ fontSize: '11.5px', padding: '6px 12px' }}
              >
                <Phone size={13} />
                <span>Hubungi</span>
              </a>
            </div>
          </div>

          {/* Action button */}
          <div style={{ marginTop: 'auto' }}>
            <button 
              className="btn-secondary" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={onNavigateYouth}
            >
              <Users size={14} />
              <span>Lihat Daftar Pemuda di {selectedKab.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
