import React from 'react';
import MetricCard from './MetricCard';
import { 
  Sun, 
  AlertCircle, 
  Database, 
  DollarSign, 
  MapPin, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Users, 
  Calendar, 
  Vote, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  Download
} from 'lucide-react';
import { KAB_KOTA_JATENG, EVENTS_DATA, CONTRIBUTORS_LEADERBOARD } from '../data/mockData';

export default function CommandCenterDashboard({ 
  onNavigateTab, 
  onOpenKtpModal, 
  onOpenQrModal,
  onOpenExportModal 
}) {
  // Aggregate real stats from mockData
  const totalYouth = KAB_KOTA_JATENG.reduce((acc, curr) => acc + curr.youthCount, 0);
  const totalTarget = KAB_KOTA_JATENG.reduce((acc, curr) => acc + curr.target, 0);
  const totalKta = KAB_KOTA_JATENG.reduce((acc, curr) => acc + curr.ktaCount, 0);
  const totalTps = KAB_KOTA_JATENG.reduce((acc, curr) => acc + curr.tpsCount, 0);
  const totalC1 = KAB_KOTA_JATENG.reduce((acc, curr) => acc + curr.c1Submitted, 0);
  const c1Percentage = ((totalC1 / totalTps) * 100).toFixed(1);

  // Active ongoing event
  const ongoingEvent = EVENTS_DATA.find(e => e.status === 'Ongoing') || EVENTS_DATA[0];

  return (
    <div className="dashboard-container">
      {/* Page Title & Breadcrumbs */}
      <div className="page-header">
        <div className="page-title-wrap">
          <h1 className="page-title">Digital Command Center — Jawa Tengah</h1>
          <p className="page-description">
            Monitoring terpusat pendataan pemuda, KTA digital, operasional saksi TPS, dan aktivitas organisasi 35 Kabupaten/Kota secara real-time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-secondary"
            onClick={onOpenExportModal}
          >
            <Download size={14} />
            <span>Export Rekapitulasi</span>
          </button>
          <button 
            className="btn-primary"
            onClick={onOpenKtpModal}
          >
            <Sparkles size={14} />
            <span>Pendaftaran KTP Baru</span>
          </button>
        </div>
      </div>

      {/* METRICS ROW (EXACT DESIGN FROM REFERENCE IMAGE) */}
      <div className="metrics-grid">
        {/* Card 1: Rata-Rata IKE Fasilitas / Total Pemuda */}
        <MetricCard
          icon={Sun}
          iconBg="#FEF3C7"
          iconColor="#D97706"
          title="Rata-Rata IKE Fasilitas"
          badges={[
            { label: 'Efisien', type: 'success' },
            { label: 'Moderate', type: 'neutral' },
            { label: 'Baseline', type: 'neutral' }
          ]}
          value="1.800"
          unit="GJ/Ton"
          subtext="Normalisasi US DOE 2020"
          visualType="sparkline-green"
        />

        {/* Card 2: Pemborosan Terdeteksi / Deviasi */}
        <MetricCard
          icon={AlertCircle}
          iconBg="#F1F5F9"
          iconColor="#475569"
          title="Pemborosan Terdeteksi"
          badges={[
            { label: 'Deviasi', type: 'danger' },
            { label: 'Residu +1.5σ', type: 'neutral' }
          ]}
          value="108.7"
          unit="GJ"
          subtext="~Rp 33 Juta (Deviasi Terakumulasi)"
          visualType="sparkline-red"
        />

        {/* Card 3: Integritas Telemetri Sensor */}
        <MetricCard
          icon={Database}
          iconBg="#F0F9FF"
          iconColor="#0284C7"
          title="Integritas Telemetri Sensor"
          badges={[
            { label: 'Validasi Fisik', type: 'info' },
            { label: '0 Hilang', type: 'success' }
          ]}
          value="90"
          unit="/90"
          subtext="100% Lolos Validasi Fisik"
          visualType="slider-progress"
          visualValue={90}
        />

        {/* Card 4: Biaya Useful Heat CNG */}
        <MetricCard
          icon={DollarSign}
          iconBg="#F8FAFC"
          iconColor="#334155"
          title="Biaya Useful Heat CNG"
          badges={[
            { label: 'Pasokan AGE', type: 'success' },
            { label: 'LHV Basis', type: 'neutral' }
          ]}
          value="Rp 242.596"
          unit="/GJ"
          subtext="Hemat 37.7% vs LPG"
          visualType="mini-bars"
        />
      </div>

      {/* SECONDARY ROW: GOLKAR JATENG SPECIFIC KPI METRICS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Database Pemuda Jateng</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{totalYouth.toLocaleString('id-ID')} <span style={{ fontSize: '11px', fontWeight: 600, color: '#10b981' }}>+4.2%</span></div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Target: {totalTarget.toLocaleString('id-ID')}</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>KTA Digital Terbit</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{totalKta.toLocaleString('id-ID')} <span style={{ fontSize: '11px', fontWeight: 600, color: '#059669' }}>88.2%</span></div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Terverifikasi QR & NIK</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Vote size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>C1 Plano Masuk</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{c1Percentage}% <span style={{ fontSize: '11px', fontWeight: 600, color: '#0284c7' }}>{totalC1.toLocaleString('id-ID')} TPS</span></div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Total {totalTps.toLocaleString('id-ID')} TPS Se-Jateng</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Calendar size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Event & Pelatihan</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>{EVENTS_DATA.length} Event <span style={{ fontSize: '11px', fontWeight: 600, color: '#e11d48' }}>Live</span></div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>8.410 Peserta Terdaftar</div>
          </div>
        </div>
      </div>

      {/* TWO COLUMN ENTERPRISE SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Left: Top Regional Performance & Map Shortcut */}
        <div className="enterprise-panel" style={{ margin: 0 }}>
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Sebaran Wilayah & Capaian Kuota Pemuda</span>
              <span className="panel-subtitle">Top 6 Daerah Tertinggi di Jawa Tengah</span>
            </div>
            <button 
              className="btn-secondary" 
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={() => onNavigateTab('webgis')}
            >
              <span>Buka WebGIS Lengkap</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Kabupaten / Kota</th>
                  <th>Dapil</th>
                  <th>Pemuda Terdata</th>
                  <th>Capaian Target</th>
                  <th>KTA Terbit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {KAB_KOTA_JATENG.slice(0, 6).map((kab) => {
                  const percent = ((kab.youthCount / kab.target) * 100).toFixed(1);
                  return (
                    <tr key={kab.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{kab.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>Koord: {kab.coordinator}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#f1f5f9', color: '#475569' }}>
                          {kab.dapil}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700 }}>{kab.youthCount.toLocaleString('id-ID')}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                            <div 
                              style={{ 
                                height: '100%', 
                                width: `${Math.min(100, percent)}%`, 
                                backgroundColor: percent >= 95 ? '#10b981' : '#f59e0b',
                                borderRadius: '3px'
                              }}
                            ></div>
                          </div>
                          <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#1e293b' }}>{percent}%</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600, color: '#059669' }}>{kab.ktaCount.toLocaleString('id-ID')}</td>
                      <td>
                        <span className={`metric-badge ${percent >= 90 ? 'badge-success' : 'badge-warning'}`}>
                          {percent >= 90 ? 'Optimal' : 'In Progress'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Live Event Monitor & QR Check-In Widget */}
        <div className="enterprise-panel" style={{ margin: 0, display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Event Berlangsung</span>
              <span className="metric-badge badge-danger" style={{ animation: 'pulse 2s infinite' }}>LIVE</span>
            </div>
            <button 
              className="btn-primary" 
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={onOpenQrModal}
            >
              <span>Scan QR</span>
            </button>
          </div>

          <div style={{ padding: '16px', borderRadius: '14px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              {ongoingEvent.title}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#64748b', marginBottom: '4px' }}>
              <Clock size={13} />
              <span>{ongoingEvent.date} · {ongoingEvent.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#64748b' }}>
              <MapPin size={13} />
              <span>{ongoingEvent.location}</span>
            </div>
          </div>

          {/* Attendance Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
            <div style={{ backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Terdaftar</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{ongoingEvent.registered}</div>
            </div>
            <div style={{ backgroundColor: '#ecfdf5', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Hadir (QR)</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669' }}>{ongoingEvent.present}</div>
            </div>
            <div style={{ backgroundColor: '#fff1f2', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#e11d48', fontWeight: 600 }}>Belum Hadir</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#e11d48' }}>{ongoingEvent.absent}</div>
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ color: '#64748b' }}>Tingkat Kehadiran:</span>
              <span style={{ fontWeight: 800, color: '#10b981' }}>{((ongoingEvent.present / ongoingEvent.registered) * 100).toFixed(1)}%</span>
            </div>
            <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${(ongoingEvent.present / ongoingEvent.registered) * 100}%`, 
                  backgroundColor: '#10b981' 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: TOP ENUMERATOR LEADERBOARD & RECENT AUDIT LOGS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Contributor Leaderboard Preview */}
        <div className="enterprise-panel" style={{ margin: 0 }}>
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Top 4 Kontributor & Kader Penginput Data</span>
              <span className="panel-subtitle">Berdasarkan data KTP tervalidasi</span>
            </div>
            <button 
              className="btn-secondary" 
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={() => onNavigateTab('contributors')}
            >
              <span>Semua Leaderboard</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {CONTRIBUTORS_LEADERBOARD.slice(0, 4).map((contributor) => (
              <div 
                key={contributor.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: contributor.rank === 1 ? '#f59e0b' : contributor.rank === 2 ? '#94a3b8' : contributor.rank === 3 ? '#b45309' : '#e2e8f0',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 800
                    }}
                  >
                    {contributor.rank}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{contributor.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{contributor.unit} · {contributor.kabKota}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#059669' }}>
                    {contributor.verified.toLocaleString('id-ID')} <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>verif</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                    {contributor.achievement}% Target
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Audit Trail Preview */}
        <div className="enterprise-panel" style={{ margin: 0 }}>
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Audit Trail & Aktivitas Sistem</span>
              <span className="panel-subtitle">Catatan kepatuhan & integritas data identitas</span>
            </div>
            <button 
              className="btn-secondary" 
              style={{ fontSize: '12px', padding: '6px 12px' }}
              onClick={() => onNavigateTab('audit')}
            >
              <span>Audit Log Penuh</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>VERIFY_KTP_OCR (Rizky Alamsyah)</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Operator DPD I · 13:15 WIB · IP 192.168.10.45</div>
              </div>
              <span className="metric-badge badge-success">SUCCESS</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', backgroundColor: '#fff1f2', borderRadius: '10px', border: '1px solid #fecdd3' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e11d48' }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>DETECT_DUPLICATE_NIK (Demak)</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Sistem OCR · NIK 3321061907990002 terdeteksi ganda</div>
              </div>
              <span className="metric-badge badge-danger">WARNING</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0284c7' }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>BATCH_VALIDATE_C1 (Kota Semarang)</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>BSNPG Engine · 4.646 TPS sinkron dengan form model C1</div>
              </div>
              <span className="metric-badge badge-info">VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
