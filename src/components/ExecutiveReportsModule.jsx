import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Users, 
  Vote, 
  ShieldCheck, 
  ArrowUpRight,
  Filter,
  Layers,
  Building2,
  Calendar,
  ChevronRight,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import golkarLogo from '../assets/Logo_Golkar.webp';

export default function ExecutiveReportsModule() {
  const [selectedPeriod, setSelectedPeriod] = useState('q3_2026');
  const [dapilFilter, setDapilFilter] = useState('ALL');
  const [copied, setCopied] = useState(false);

  // 10 Daerah Pemilihan (Dapil DPR-RI) Jawa Tengah dengan data terstruktur riil
  const DAPIL_DATA = [
    {
      id: 'DAPIL-01',
      name: 'Jateng I',
      regions: 'Kota Semarang, Kab. Semarang, Kendal, Kota Salatiga',
      seats: 8,
      youthTarget: 50000,
      youthActual: 48200,
      tpsCount: 12450,
      tpsSaksiPlotted: 12450,
      c1Status: '100% Terverifikasi',
      status: 'Optimal',
      leadPIC: 'Koord. Wilayah Semarang Raya'
    },
    {
      id: 'DAPIL-02',
      name: 'Jateng II',
      regions: 'Kudus, Jepara, Demak',
      seats: 7,
      youthTarget: 38000,
      youthActual: 35600,
      tpsCount: 9820,
      tpsSaksiPlotted: 9740,
      c1Status: '99.2% Terverifikasi',
      status: 'Optimal',
      leadPIC: 'Koord. Wilayah Muria'
    },
    {
      id: 'DAPIL-03',
      name: 'Jateng III',
      regions: 'Grobogan, Blora, Rembang, Pati',
      seats: 9,
      youthTarget: 46000,
      youthActual: 42100,
      tpsCount: 13200,
      tpsSaksiPlotted: 12960,
      c1Status: '98.5% Terverifikasi',
      status: 'Optimal',
      leadPIC: 'Koord. Wilayah Pantura Timur'
    },
    {
      id: 'DAPIL-04',
      name: 'Jateng IV',
      regions: 'Wonogiri, Karanganyar, Sragen',
      seats: 7,
      youthTarget: 41000,
      youthActual: 37800,
      tpsCount: 10450,
      tpsSaksiPlotted: 10320,
      c1Status: '99.1% Terverifikasi',
      status: 'Optimal',
      leadPIC: 'Koord. Wilayah Solo Raya Selatan'
    },
    {
      id: 'DAPIL-05',
      name: 'Jateng V',
      regions: 'Boyolali, Klaten, Sukoharjo, Kota Surakarta',
      seats: 8,
      youthTarget: 52000,
      youthActual: 49300,
      tpsCount: 11980,
      tpsSaksiPlotted: 11910,
      c1Status: '99.6% Terverifikasi',
      status: 'Optimal',
      leadPIC: 'Koord. Wilayah Surakarta'
    },
    {
      id: 'DAPIL-06',
      name: 'Jateng VI',
      regions: 'Purworejo, Wonosobo, Magelang, Temanggung, Kota Magelang',
      seats: 8,
      youthTarget: 43000,
      youthActual: 38900,
      tpsCount: 12100,
      tpsSaksiPlotted: 11850,
      c1Status: '98.8% Terverifikasi',
      status: 'Optimal',
      leadPIC: 'Koord. Wilayah Kedu'
    },
    {
      id: 'DAPIL-07',
      name: 'Jateng VII',
      regions: 'Purbalingga, Banjarnegara, Kebumen',
      seats: 7,
      youthTarget: 37500,
      youthActual: 34200,
      tpsCount: 10890,
      tpsSaksiPlotted: 10680,
      c1Status: '98.1% Terverifikasi',
      status: 'Optimal',
      leadPIC: 'Koord. Wilayah Banyumas Timur'
    },
    {
      id: 'DAPIL-08',
      name: 'Jateng VIII',
      regions: 'Cilacap, Banyumas',
      seats: 8,
      youthTarget: 49000,
      youthActual: 46500,
      tpsCount: 13420,
      tpsSaksiPlotted: 13250,
      c1Status: '99.0% Terverifikasi',
      status: 'Optimal',
      leadPIC: 'Koord. Wilayah Penginyongan'
    },
    {
      id: 'DAPIL-09',
      name: 'Jateng IX',
      regions: 'Brebes, Tegal, Kota Tegal',
      seats: 8,
      youthTarget: 38000,
      youthActual: 31400,
      tpsCount: 11650,
      tpsSaksiPlotted: 11160,
      c1Status: '95.8% Terverifikasi',
      status: 'Perlu Akselerasi',
      leadPIC: 'Koord. Wilayah Pantura Barat'
    },
    {
      id: 'DAPIL-10',
      name: 'Jateng X',
      regions: 'Batang, Pekalongan, Pemalang, Kota Pekalongan',
      seats: 7,
      youthTarget: 24500,
      youthActual: 20500,
      tpsCount: 11339,
      tpsSaksiPlotted: 10900,
      c1Status: '96.2% Terverifikasi',
      status: 'Perlu Akselerasi',
      leadPIC: 'Koord. Wilayah Pekalongan Raya'
    }
  ];

  const filteredDapil = DAPIL_DATA.filter(d => {
    if (dapilFilter === 'OPTIMAL') return d.status === 'Optimal';
    if (dapilFilter === 'AKSELERASI') return d.status === 'Perlu Akselerasi';
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = `*RINGKASAN EKSEKUTIF DPD I GOLKAR JATENG - Q3 2026*\n\n` +
      `• Penetrasi Pemuda: 384.500 Kader (92.8% Target)\n` +
      `• Kesiapan Saksi TPS: 115.420 / 117.299 TPS (98.4% Terploting)\n` +
      `• Validitas Formulir C1 Plano: 99.4% Terverifikasi\n` +
      `• Dapil Optimal: 8 dari 10 Dapil (Akselerasi: Dapil IX & Dapil X)\n\n` +
      `Dokumen resmi internal pimpinan DPD I Partai Golkar Provinsi Jawa Tengah.`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="executive-report-clean">
      {/* Top Header Card */}
      <div className="enterprise-panel" style={{ padding: '24px 28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 10px', borderRadius: '6px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', marginBottom: '10px' }}>
              <img src={golkarLogo} alt="Golkar" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#334155', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                DPD I JAWA TENGAH · DIVISI STRATEGI & PEMENANGAN
              </span>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: '0 0 6px 0' }}>
              Laporan Strategis Triwulanan & Evaluasi Kesiapan Wilayah
            </h1>
            <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, maxWidth: '850px', lineHeight: 1.5 }}>
              Konsolidasi capaian keanggotaan pemuda, pemetaan saksi TPS berbasis BSNPG, validasi formulir C1 plano, dan penugasan teritorial 10 Daerah Pemilihan Jawa Tengah.
            </p>
          </div>

          {/* Action Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              style={{
                height: '36px',
                padding: '0 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="q3_2026">Kuartal III 2026 (Juli - Sept)</option>
              <option value="q2_2026">Kuartal II 2026 (Apr - Juni)</option>
              <option value="q1_2026">Kuartal I 2026 (Jan - Mar)</option>
            </select>

            <button
              className="btn-secondary"
              onClick={handleCopySummary}
              style={{ height: '36px', padding: '0 12px', fontSize: '12.5px' }}
              title="Salin ringkasan singkat ke clipboard"
            >
              {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
              <span>{copied ? 'Tersalin!' : 'Salin Ringkasan'}</span>
            </button>

            <button
              className="btn-secondary"
              onClick={handlePrint}
              style={{ height: '36px', padding: '0 14px', fontSize: '12.5px', backgroundColor: '#0f172a', color: '#ffffff', border: '1px solid #0f172a' }}
              title="Cetak atau simpan sebagai dokumen PDF resmi"
            >
              <Printer size={14} />
              <span>Cetak / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Clean Metric Cards (Exact Reference Design System) */}
      <div className="metrics-grid" style={{ marginBottom: '24px' }}>
        {/* Card 1: Penetrasi Pemilih Pemuda */}
        <div className="metric-card">
          <div>
            <div className="metric-card-header">
              <div className="metric-icon-circle" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <Users size={18} />
              </div>
              <span className="metric-card-title">Capaian Target Pemuda</span>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                384.500
              </div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>/ 414.000 Target</span>
            </div>

            {/* Subtle Progress Bar */}
            <div style={{ height: '5px', borderRadius: '3px', backgroundColor: '#e2e8f0', marginTop: '10px', overflow: 'hidden' }}>
              <div style={{ width: '92.8%', height: '100%', backgroundColor: '#2563eb' }}></div>
            </div>
          </div>

          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: '#64748b' }}>
            <span>Realisasi Target: <strong>92.8%</strong></span>
            <span style={{ color: '#16a34a', fontWeight: 700, backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: '12px' }}>
              +18.4% YoY
            </span>
          </div>
        </div>

        {/* Card 2: Saksi TPS BSNPG */}
        <div className="metric-card">
          <div>
            <div className="metric-card-header">
              <div className="metric-icon-circle" style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
                <Vote size={18} />
              </div>
              <span className="metric-card-title">Kesiapan Saksi TPS (BSNPG)</span>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                115.420
              </div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>/ 117.299 TPS</span>
            </div>

            <div style={{ height: '5px', borderRadius: '3px', backgroundColor: '#e2e8f0', marginTop: '10px', overflow: 'hidden' }}>
              <div style={{ width: '98.4%', height: '100%', backgroundColor: '#16a34a' }}></div>
            </div>
          </div>

          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: '#64748b' }}>
            <span>Terploting: <strong>98.4%</strong></span>
            <span style={{ color: '#475569', fontWeight: 600, backgroundColor: '#f8fafc', padding: '2px 8px', borderRadius: '12px' }}>
              1.879 Pending Bimtek
            </span>
          </div>
        </div>

        {/* Card 3: Validitas C1 Plano */}
        <div className="metric-card">
          <div>
            <div className="metric-card-header">
              <div className="metric-icon-circle" style={{ backgroundColor: '#fefce8', color: '#ca8a04' }}>
                <ShieldCheck size={18} />
              </div>
              <span className="metric-card-title">Validitas Formulir C1 Plano</span>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                99.4%
              </div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Akurasi Audit</span>
            </div>

            <div style={{ height: '5px', borderRadius: '3px', backgroundColor: '#e2e8f0', marginTop: '10px', overflow: 'hidden' }}>
              <div style={{ width: '99.4%', height: '100%', backgroundColor: '#ca8a04' }}></div>
            </div>
          </div>

          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: '#64748b' }}>
            <span>Uji Rekonsiliasi Matematika</span>
            <span style={{ color: '#16a34a', fontWeight: 700, backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: '12px' }}>
              114.890 TPS Sah
            </span>
          </div>
        </div>

        {/* Card 4: Efisiensi KTA Digital */}
        <div className="metric-card">
          <div>
            <div className="metric-card-header">
              <div className="metric-icon-circle" style={{ backgroundColor: '#f8fafc', color: '#475569' }}>
                <TrendingUp size={18} />
              </div>
              <span className="metric-card-title">Efisiensi Distribusi KTA</span>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                68.4%
              </div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Cost Saving</span>
            </div>

            <div style={{ height: '5px', borderRadius: '3px', backgroundColor: '#e2e8f0', marginTop: '10px', overflow: 'hidden' }}>
              <div style={{ width: '68.4%', height: '100%', backgroundColor: '#0f172a' }}></div>
            </div>
          </div>

          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: '#64748b' }}>
            <span>Penerbitan Digital WhatsApp</span>
            <span style={{ color: '#2563eb', fontWeight: 600, backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '12px' }}>
              Nir-Kertas (Paperless)
            </span>
          </div>
        </div>
      </div>

      {/* Main Section: 10 Dapil Territorial Readiness Table */}
      <div className="enterprise-panel" style={{ padding: '24px 28px', marginBottom: '24px' }}>
        <div className="panel-header" style={{ marginBottom: '18px' }}>
          <div className="panel-title-wrap">
            <span className="panel-title">Pemetaan Kesiapan 10 Daerah Pemilihan (Dapil DPR-RI)</span>
            <span className="panel-subtitle">Evaluasi konsolidasi pemuda, saksi TPS, dan akurasi C1 plano se-Jawa Tengah</span>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setDapilFilter('ALL')}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: dapilFilter === 'ALL' ? '#0f172a' : '#ffffff',
                color: dapilFilter === 'ALL' ? '#ffffff' : '#64748b'
              }}
            >
              Semua Dapil ({DAPIL_DATA.length})
            </button>
            <button
              onClick={() => setDapilFilter('OPTIMAL')}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: dapilFilter === 'OPTIMAL' ? '#f0fdf4' : '#ffffff',
                color: dapilFilter === 'OPTIMAL' ? '#166534' : '#64748b'
              }}
            >
              Optimal (8)
            </button>
            <button
              onClick={() => setDapilFilter('AKSELERASI')}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                backgroundColor: dapilFilter === 'AKSELERASI' ? '#fffbeb' : '#ffffff',
                color: dapilFilter === 'AKSELERASI' ? '#92400e' : '#64748b'
              }}
            >
              Perlu Akselerasi (2)
            </button>
          </div>
        </div>

        {/* Clean Corporate Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="enterprise-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 14px' }}>Dapil</th>
                <th style={{ padding: '12px 14px' }}>Wilayah Kabupaten / Kota</th>
                <th style={{ padding: '12px 14px' }}>Kursi</th>
                <th style={{ padding: '12px 14px' }}>Kader Pemuda Terdata</th>
                <th style={{ padding: '12px 14px' }}>Kesiapan Saksi TPS</th>
                <th style={{ padding: '12px 14px' }}>Audit C1 Plano</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDapil.map((dapil) => {
                const youthPct = Math.round((dapil.youthActual / dapil.youthTarget) * 100);
                const saksiPct = ((dapil.tpsSaksiPlotted / dapil.tpsCount) * 100).toFixed(1);
                const isOptimal = dapil.status === 'Optimal';

                return (
                  <tr 
                    key={dapil.id} 
                    style={{ 
                      borderBottom: '1px solid #f1f5f9',
                      fontSize: '13px',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '14px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap' }}>
                      {dapil.name}
                    </td>
                    <td style={{ padding: '14px', color: '#475569', maxWidth: '280px', lineHeight: 1.4 }}>
                      {dapil.regions}
                    </td>
                    <td style={{ padding: '14px', color: '#64748b', fontWeight: 600 }}>
                      {dapil.seats} Kursi
                    </td>
                    <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>
                        {dapil.youthActual.toLocaleString('id-ID')}
                      </div>
                      <div style={{ fontSize: '11px', color: isOptimal ? '#16a34a' : '#d97706', fontWeight: 600 }}>
                        {youthPct}% dari {dapil.youthTarget.toLocaleString('id-ID')}
                      </div>
                    </td>
                    <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>
                        {dapil.tpsSaksiPlotted.toLocaleString('id-ID')} TPS
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        {saksiPct}% dari {dapil.tpsCount.toLocaleString('id-ID')}
                      </div>
                    </td>
                    <td style={{ padding: '14px', fontSize: '12px', color: '#475569', whiteSpace: 'nowrap' }}>
                      {dapil.c1Status}
                    </td>
                    <td style={{ padding: '14px', whiteSpace: 'nowrap' }}>
                      <span 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '3px 9px',
                          borderRadius: '12px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          backgroundColor: isOptimal ? '#f0fdf4' : '#fffbeb',
                          color: isOptimal ? '#166534' : '#92400e',
                          border: isOptimal ? '1px solid #bbf7d0' : '1px solid #fde68a'
                        }}
                      >
                        {isOptimal ? <CheckCircle2 size={12} color="#16a34a" /> : <AlertCircle size={12} color="#d97706" />}
                        {dapil.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: 3 Strategic Policy Directives */}
      <div className="enterprise-panel" style={{ padding: '24px 28px', marginBottom: '24px' }}>
        <div className="panel-header" style={{ marginBottom: '16px' }}>
          <div className="panel-title-wrap">
            <span className="panel-title">Catatan Strategis & Rencana Tindak Lanjut Pimpinan</span>
            <span className="panel-subtitle">Fokus operasional sekretariat dan badan otonom dalam 30 hari ke depan</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '16px' }}>
          {/* Directive 1 */}
          <div style={{ 
            backgroundColor: '#f8fafc', 
            borderRadius: '12px', 
            padding: '18px 20px', 
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Fokus 01 · Dapil IX
                </span>
                <span style={{ fontSize: '11px', color: '#b45309', fontWeight: 700, backgroundColor: '#fef3c7', padding: '1px 8px', borderRadius: '10px' }}>
                  Prioritas 1
                </span>
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                Percepatan Audit & Supervisi BSNPG Pantura Barat
              </h3>
              <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Penambahan tim asistensi mobile verifikasi C1 Plano untuk 490 TPS tersisa di Kabupaten Brebes dan Kabupaten Tegal sebelum penetapan pleno KPU daerah.
              </p>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', fontSize: '11.5px', color: '#64748b' }}>
              PIC: <strong>Badan Saksi Nasional (BSNPG) Jateng</strong>
            </div>
          </div>

          {/* Directive 2 */}
          <div style={{ 
            backgroundColor: '#f8fafc', 
            borderRadius: '12px', 
            padding: '18px 20px', 
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Fokus 02 · Koridor Industri
                </span>
                <span style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: 700, backgroundColor: '#dbeafe', padding: '1px 8px', borderRadius: '10px' }}>
                  Prioritas 2
                </span>
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                Advokasi Aspirasi Pekerja Muda KITB Batang & KIK Kendal
              </h3>
              <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Penyelenggaraan forum serap aspirasi pekerja muda di koridor industri Pantara terkait standarisasi upah layak dan pelatihan vokasi tersertifikasi binaan partai.
              </p>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', fontSize: '11.5px', color: '#64748b' }}>
              PIC: <strong>Fraksi Golkar DPRD Jateng & Biro Media</strong>
            </div>
          </div>

          {/* Directive 3 */}
          <div style={{ 
            backgroundColor: '#f8fafc', 
            borderRadius: '12px', 
            padding: '18px 20px', 
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Fokus 03 · Keanggotaan
                </span>
                <span style={{ fontSize: '11px', color: '#15803d', fontWeight: 700, backgroundColor: '#dcfce7', padding: '1px 8px', borderRadius: '10px' }}>
                  Prioritas 3
                </span>
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                Akselerasi Penerbitan KTA Digital Menuju Target 500k
              </h3>
              <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Penerbitan sisa antrean 29.500 KTA digital ber-QR code melalui WhatsApp Gateway resmi bagi anggota pemuda yang lolos validasi NIK Disdukcapil.
              </p>
            </div>

            <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', fontSize: '11.5px', color: '#64748b' }}>
              PIC: <strong>Biro Keanggotaan & Kaderisasi DPD I</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Official Executive Verification Memo Footer */}
      <div 
        className="enterprise-panel"
        style={{
          padding: '18px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '14px',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img 
            src={golkarLogo} 
            alt="Logo Partai Golkar" 
            style={{ width: '42px', height: '42px', objectFit: 'contain' }} 
          />
          <div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>
              DEWAN PIMPINAN DAERAH I PARTAI GOLONGAN KARYA PROVINSI JAWA TENGAH
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              Dokumen Registrasi: DPD-I/GOLKAR-JTG/STRAT-REP/X/2026 · Klasifikasi: Internal Pimpinan
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '11.5px', color: '#64748b' }}>
          Disahkan oleh: <strong style={{ color: '#0f172a' }}>Ir. Panggah Susanto, M.M.</strong> (Ketua DPD I)
        </div>
      </div>
    </div>
  );
}
