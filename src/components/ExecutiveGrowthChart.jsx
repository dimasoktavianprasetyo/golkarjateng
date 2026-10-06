import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  CheckCircle2, 
  Award, 
  Info,
  Calendar,
  Sparkles
} from 'lucide-react';

const MONTHLY_DATA = [
  { month: 'Jan', youth: 124000, kta: 110000, target: 135000, rate: '+12.4%' },
  { month: 'Feb', youth: 148500, kta: 132000, target: 165000, rate: '+19.7%' },
  { month: 'Mar', youth: 176200, kta: 158000, target: 195000, rate: '+18.6%' },
  { month: 'Apr', youth: 212000, kta: 190500, target: 230000, rate: '+20.3%' },
  { month: 'Mei', youth: 245800, kta: 224000, target: 265000, rate: '+15.9%' },
  { month: 'Jun', youth: 280400, kta: 255000, target: 300000, rate: '+14.1%' },
  { month: 'Jul', youth: 312000, kta: 286000, target: 335000, rate: '+11.3%' },
  { month: 'Ags', youth: 342500, kta: 315000, target: 370000, rate: '+9.8%' },
  { month: 'Sep', youth: 369800, kta: 340500, target: 395000, rate: '+8.0%' },
  { month: 'Okt', youth: 384500, kta: 355000, target: 414000, rate: '+4.0%' }
];

const DAPIL_DATA = [
  { id: 'I', name: 'Jateng I', region: 'Kota Semarang, Kendal, Salatiga', youth: 42100, target: 45000, color: '#f59e0b' },
  { id: 'II', name: 'Jateng II', region: 'Demak, Kudus, Jepara', youth: 36400, target: 40000, color: '#0284c7' },
  { id: 'III', name: 'Jateng III', region: 'Pati, Rembang, Blora, Grobogan', youth: 44800, target: 48000, color: '#10b981' },
  { id: 'IV', name: 'Jateng IV', region: 'Wonogiri, Karanganyar, Sragen', youth: 38200, target: 41000, color: '#8b5cf6' },
  { id: 'V', name: 'Jateng V', region: 'Boyolali, Klaten, Sukoharjo, Solo', youth: 49300, target: 52000, color: '#f59e0b', top: true },
  { id: 'VI', name: 'Jateng VI', region: 'Magelang, Temanggung, Wonosobo, Purworejo', youth: 38900, target: 43000, color: '#0284c7' },
  { id: 'VII', name: 'Jateng VII', region: 'Purbalingga, Banjarnegara, Kebumen', youth: 34200, target: 37500, color: '#10b981' },
  { id: 'VIII', name: 'Jateng VIII', region: 'Cilacap, Banyumas', youth: 46500, target: 49000, color: '#f59e0b' },
  { id: 'IX', name: 'Jateng IX', region: 'Brebes, Tegal, Kota Tegal', youth: 31400, target: 38000, color: '#ec4899' },
  { id: 'X', name: 'Jateng X', region: 'Batang, Pekalongan, Pemalang', youth: 22700, target: 25500, color: '#06b6d4' }
];

const DEMOGRAPHIC_DATA = [
  { label: 'Gen Z Pemula (17–21 th)', count: 147600, percentage: 38.4, color: '#f59e0b', note: 'Pelajar & Mahasiswa Aktif' },
  { label: 'Gen Z Produktif (22–26 th)', count: 108400, percentage: 28.2, color: '#0284c7', note: 'First Jobber & Komunitas Kreatif' },
  { label: 'Milenial Muda (27–34 th)', count: 90000, percentage: 23.4, color: '#10b981', note: 'Profesional & Wirausaha Muda' },
  { label: 'Milenial Senior (35–40 th)', count: 38500, percentage: 10.0, color: '#8b5cf6', note: 'Tokoh Penggerak Desa / Karang Taruna' }
];

export default function ExecutiveGrowthChart() {
  const [activeTab, setActiveTab] = useState('monthly'); // 'monthly' | 'dapil' | 'demographic'
  const [hoveredIndex, setHoveredIndex] = useState(9); // Default to latest month (Okt)

  // Chart SVG Coordinates Calculator for Monthly View
  const svgWidth = 840;
  const svgHeight = 260;
  const paddingX = 55;
  const paddingTop = 30;
  const paddingBottom = 40;
  const maxVal = 450000;

  const getX = (idx) => paddingX + (idx * (svgWidth - paddingX * 2)) / (MONTHLY_DATA.length - 1);
  const getY = (val) => svgHeight - paddingBottom - (val / maxVal) * (svgHeight - paddingTop - paddingBottom);

  // Generate SVG Path for Curves
  const createCurvedPath = (dataKey) => {
    const points = MONTHLY_DATA.map((d, i) => ({ x: getX(i), y: getY(d[dataKey]) }));
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 2;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (p1.x - p0.x) / 2;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const youthPath = createCurvedPath('youth');
  const ktaPath = createCurvedPath('kta');
  const youthAreaPath = `${youthPath} L ${getX(MONTHLY_DATA.length - 1)} ${svgHeight - paddingBottom} L ${getX(0)} ${svgHeight - paddingBottom} Z`;
  const ktaAreaPath = `${ktaPath} L ${getX(MONTHLY_DATA.length - 1)} ${svgHeight - paddingBottom} L ${getX(0)} ${svgHeight - paddingBottom} Z`;

  const hoveredData = MONTHLY_DATA[hoveredIndex] || MONTHLY_DATA[9];

  return (
    <div className="enterprise-panel" style={{ padding: '24px', marginBottom: '24px' }}>
      {/* Card Header & Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              color: '#d97706',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '999px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              <TrendingUp size={12} />
              Grafik Eksekutif Real-Time
            </span>
            <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600 }}>
              • Sinkronisasi 35 Kab/Kota
            </span>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
            Tren Progresi Kader Muda & e-KTA Digital 2026
          </h3>
          <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
            Visualisasi kurva akumulasi pendataan pemuda, terbitan e-KTA ber-QR, dan sebaran elektoral 10 Dapil se-Jateng.
          </p>
        </div>

        {/* Tab Filter Switcher */}
        <div style={{
          display: 'inline-flex',
          backgroundColor: '#f1f5f9',
          padding: '4px',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          gap: '4px'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('monthly')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '7px',
              border: 'none',
              backgroundColor: activeTab === 'monthly' ? '#ffffff' : 'transparent',
              color: activeTab === 'monthly' ? '#0f172a' : '#64748b',
              fontWeight: activeTab === 'monthly' ? 700 : 600,
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: activeTab === 'monthly' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <TrendingUp size={14} color={activeTab === 'monthly' ? '#f59e0b' : '#64748b'} />
            <span>Tren Bulanan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dapil')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '7px',
              border: 'none',
              backgroundColor: activeTab === 'dapil' ? '#ffffff' : 'transparent',
              color: activeTab === 'dapil' ? '#0f172a' : '#64748b',
              fontWeight: activeTab === 'dapil' ? 700 : 600,
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: activeTab === 'dapil' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <BarChart3 size={14} color={activeTab === 'dapil' ? '#0284c7' : '#64748b'} />
            <span>Sebaran 10 Dapil</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('demographic')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '7px',
              border: 'none',
              backgroundColor: activeTab === 'demographic' ? '#ffffff' : 'transparent',
              color: activeTab === 'demographic' ? '#0f172a' : '#64748b',
              fontWeight: activeTab === 'demographic' ? 700 : 600,
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: activeTab === 'demographic' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <PieChart size={14} color={activeTab === 'demographic' ? '#10b981' : '#64748b'} />
            <span>Demografi Gen-Z</span>
          </button>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* VIEW 1: MONTHLY LINE & AREA CHART */}
      {/* ======================================================================= */}
      {activeTab === 'monthly' && (
        <div>
          {/* Chart Legends & Hover Metric Status Box */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '14px',
            padding: '10px 16px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#f59e0b' }}></span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                  Kader Pemuda Terdata: <strong>{hoveredData.youth.toLocaleString('id-ID')}</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#0284c7' }}></span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                  e-KTA Digital Terbit: <strong>{hoveredData.kta.toLocaleString('id-ID')}</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '16px', height: '2px', backgroundColor: '#94a3b8', borderTop: '2px dashed #94a3b8' }}></span>
                <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                  Target Akhir: <strong>414.000</strong>
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11.5px', color: '#64748b' }}>Data Periode:</span>
              <span style={{
                fontSize: '12px',
                fontWeight: 800,
                color: '#0f172a',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '3px 10px',
                borderRadius: '6px'
              }}>
                Bulan {hoveredData.month} 2026 ({hoveredData.rate} MoM)
              </span>
            </div>
          </div>

          {/* Responsive SVG Area Chart */}
          <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <svg 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              style={{ width: '100%', height: 'auto', minWidth: '600px', display: 'block' }}
            >
              <defs>
                {/* Yellow Gradient */}
                <linearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
                {/* Blue Gradient */}
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid Lines */}
              {[400000, 300000, 200000, 100000].map((tick) => (
                <g key={tick}>
                  <line 
                    x1={paddingX} 
                    y1={getY(tick)} 
                    x2={svgWidth - paddingX} 
                    y2={getY(tick)} 
                    stroke="#e2e8f0" 
                    strokeDasharray="4 4" 
                    strokeWidth="1"
                  />
                  <text 
                    x={paddingX - 10} 
                    y={getY(tick) + 4} 
                    textAnchor="end" 
                    fontSize="10" 
                    fill="#94a3b8" 
                    fontWeight="600"
                    fontFamily="monospace"
                  >
                    {tick / 1000}k
                  </text>
                </g>
              ))}

              {/* Target Line (414k) */}
              <line 
                x1={paddingX} 
                y1={getY(414000)} 
                x2={svgWidth - paddingX} 
                y2={getY(414000)} 
                stroke="#d97706" 
                strokeDasharray="6 6" 
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />
              <text 
                x={svgWidth - paddingX + 6} 
                y={getY(414000) + 3} 
                fontSize="9.5" 
                fill="#d97706" 
                fontWeight="800"
              >
                Target 414k
              </text>

              {/* Area Fills */}
              <path d={youthAreaPath} fill="url(#yellowGradient)" />
              <path d={ktaAreaPath} fill="url(#blueGradient)" />

              {/* Curve Strokes */}
              <path 
                d={ktaPath} 
                fill="none" 
                stroke="#0284c7" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d={youthPath} 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Data Points (Interactive Hover) */}
              {MONTHLY_DATA.map((d, idx) => {
                const cx = getX(idx);
                const cyYouth = getY(d.youth);
                const cyKta = getY(d.kta);
                const isHovered = hoveredIndex === idx;

                return (
                  <g 
                    key={d.month} 
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                  >
                    {/* Hover vertical guide line */}
                    {isHovered && (
                      <line 
                        x1={cx} 
                        y1={paddingTop} 
                        x2={cx} 
                        y2={svgHeight - paddingBottom} 
                        stroke="#cbd5e1" 
                        strokeWidth="1.5" 
                        strokeDasharray="3 3"
                      />
                    )}

                    {/* KTA circle */}
                    <circle 
                      cx={cx} 
                      cy={cyKta} 
                      r={isHovered ? 5.5 : 3.5} 
                      fill="#ffffff" 
                      stroke="#0284c7" 
                      strokeWidth={isHovered ? 2.5 : 1.8} 
                    />

                    {/* Youth circle */}
                    <circle 
                      cx={cx} 
                      cy={cyYouth} 
                      r={isHovered ? 7 : 4.5} 
                      fill="#f59e0b" 
                      stroke="#ffffff" 
                      strokeWidth={2} 
                      style={{ filter: isHovered ? 'drop-shadow(0 2px 5px rgba(245,158,11,0.5))' : 'none' }}
                    />

                    {/* X-Axis Month Label */}
                    <text 
                      x={cx} 
                      y={svgHeight - 16} 
                      textAnchor="middle" 
                      fontSize={isHovered ? '12' : '11'} 
                      fontWeight={isHovered ? '800' : '600'} 
                      fill={isHovered ? '#0f172a' : '#64748b'}
                    >
                      {d.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* VIEW 2: 10 DAPIL COMPARISON BAR CHART */}
      {/* ======================================================================= */}
      {activeTab === 'dapil' && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '12px'
          }}>
            {DAPIL_DATA.map((d) => {
              const percentage = ((d.youth / d.target) * 100).toFixed(1);
              return (
                <div 
                  key={d.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: d.top ? '#fffdf5' : '#f8fafc',
                    border: d.top ? '1.5px solid #fde68a' : '1px solid #e2e8f0',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: '5px',
                        backgroundColor: d.top ? '#f59e0b' : '#0f172a',
                        color: d.top ? '#0f172a' : '#ffffff'
                      }}>
                        {d.id}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                        {d.name}
                      </span>
                      {d.top && (
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#b45309', backgroundColor: '#fef3c7', padding: '1px 6px', borderRadius: '4px' }}>
                          Tertinggi ★
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '12.5px', fontWeight: 800, color: percentage >= 94 ? '#16a34a' : '#d97706' }}>
                      {percentage}%
                    </span>
                  </div>

                  <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {d.region}
                  </div>

                  {/* Horizontal Bar */}
                  <div style={{ height: '7px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${Math.min(100, percentage)}%`, 
                        height: '100%', 
                        backgroundColor: d.color, 
                        borderRadius: '4px',
                        transition: 'width 0.4s ease'
                      }} 
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                    <span>Capaian: <strong>{d.youth.toLocaleString('id-ID')}</strong></span>
                    <span>Target: <strong>{d.target.toLocaleString('id-ID')}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* VIEW 3: DEMOGRAPHY PIE & AGE CLUSTERS */}
      {/* ======================================================================= */}
      {activeTab === 'demographic' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          alignItems: 'center'
        }}>
          {/* Visual Donut representation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            border: '1px solid #e2e8f0'
          }}>
            <svg width="200" height="200" viewBox="0 0 42 42" style={{ transform: 'rotate(-90deg)' }}>
              {/* Background circle */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="6" />

              {/* Segment 1: Gen Z Pemula (38.4%) */}
              <circle
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth="6"
                strokeDasharray="38.4 61.6"
                strokeDashoffset="0"
              />
              {/* Segment 2: Gen Z Produktif (28.2%) */}
              <circle
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke="#0284c7"
                strokeWidth="6"
                strokeDasharray="28.2 71.8"
                strokeDashoffset="-38.4"
              />
              {/* Segment 3: Milenial Muda (23.4%) */}
              <circle
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="6"
                strokeDasharray="23.4 76.6"
                strokeDashoffset="-66.6"
              />
              {/* Segment 4: Milenial Senior (10%) */}
              <circle
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke="#8b5cf6"
                strokeWidth="6"
                strokeDasharray="10 90"
                strokeDashoffset="-90"
              />

              {/* Center Text in SVG */}
              <g style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}>
                <text x="21" y="19" textAnchor="middle" fontSize="4.5" fontWeight="800" fill="#0f172a">
                  66.6%
                </text>
                <text x="21" y="24" textAnchor="middle" fontSize="2.8" fontWeight="600" fill="#64748b">
                  Gen-Z Total
                </text>
              </g>
            </svg>
          </div>

          {/* Demographic Detail Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {DEMOGRAPHIC_DATA.map((item) => (
              <div 
                key={item.label}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: item.color }}>{item.percentage}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                  <span>{item.note}</span>
                  <span style={{ fontWeight: 600 }}>{item.count.toLocaleString('id-ID')} Kader</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* BOTTOM METRICS RIBBON (EXECUTIVE KPI HIGHLIGHTS) */}
      {/* ======================================================================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '14px',
        marginTop: '20px',
        paddingTop: '16px',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f59e0b',
            flexShrink: 0
          }}>
            <TrendingUp size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Kecepatan Akuisisi</div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
              +1.840 <span style={{ fontSize: '11px', color: '#16a34a' }}>kader/hari</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: 'rgba(2, 132, 199, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0284c7',
            flexShrink: 0
          }}>
            <CreditCard size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Konversi e-KTA QR</div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
              92.3% <span style={{ fontSize: '11px', color: '#0284c7' }}>Terbit</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#10b981',
            flexShrink: 0
          }}>
            <Award size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Dapil Paling Optimal</div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
              Jateng V <span style={{ fontSize: '11px', color: '#16a34a' }}>94.8%</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: 'rgba(139, 92, 246, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8b5cf6',
            flexShrink: 0
          }}>
            <Users size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Dominasi Gen-Z</div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
              66.6% <span style={{ fontSize: '11px', color: '#8b5cf6' }}>Pemilih Muda</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
