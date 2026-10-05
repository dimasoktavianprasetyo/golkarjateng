import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  Share2, 
  Heart, 
  AlertTriangle, 
  Globe, 
  Radio, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { SOCIAL_SENTIMENT_DATA } from '../data/mockData';

export default function SocialMonitoringModule() {
  const { totalMentions, growthPercent, sentimentRatio, platforms, trendingTopics } = SOCIAL_SENTIMENT_DATA;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-wrap">
          <h1 className="page-title">Monitoring Isu & Opini Publik Digital Jawa Tengah</h1>
          <p className="page-description">
            Analisis sentimen media sosial, pelacakan percakapan publik di 35 Kabupaten/Kota, dan deteksi anomali isu kepemudaan secara real-time.
          </p>
        </div>
      </div>

      {/* Sentiment Overview Bar */}
      <div className="enterprise-panel" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Indeks Sentimen Net Percakapan Golkar Jateng</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>
              68% Sentimen Positif <span style={{ fontSize: '13px', fontWeight: 600, color: '#10b981' }}>{growthPercent} bulan ini</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Total Percakapan Dianalisis</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{totalMentions.toLocaleString('id-ID')} Post</div>
          </div>
        </div>

        {/* Triple Segment Bar */}
        <div style={{ height: '14px', borderRadius: '7px', display: 'flex', overflow: 'hidden', backgroundColor: '#e2e8f0', marginBottom: '10px' }}>
          <div style={{ width: `${sentimentRatio.positive}%`, backgroundColor: '#10b981' }} title={`Positif: ${sentimentRatio.positive}%`}></div>
          <div style={{ width: `${sentimentRatio.neutral}%`, backgroundColor: '#94a3b8' }} title={`Netral: ${sentimentRatio.neutral}%`}></div>
          <div style={{ width: `${sentimentRatio.negative}%`, backgroundColor: '#e11d48' }} title={`Negatif: ${sentimentRatio.negative}%`}></div>
        </div>

        <div style={{ display: 'flex', gap: '24px', fontSize: '12px', fontWeight: 700 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
            <span style={{ color: '#0f172a' }}>Positif ({sentimentRatio.positive}%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#94a3b8' }}></span>
            <span style={{ color: '#64748b' }}>Netral ({sentimentRatio.neutral}%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e11d48' }}></span>
            <span style={{ color: '#e11d48' }}>Negatif ({sentimentRatio.negative}%)</span>
          </div>
        </div>
      </div>

      {/* Grid: Connected Platforms & Trending Topics Radar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '24px' }}>
        {/* Left: Accounts & Growth */}
        <div className="enterprise-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Platform Resmi Terhubung</span>
              <span className="panel-subtitle">Metrik jangkauan & followers</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {platforms.map((p, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px'
                }}
              >
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>{p.name}</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>{p.handle}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{p.followers}</div>
                  <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>
                    {p.growth} ({p.engagement} eng.)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Trending Issue Radar */}
        <div className="enterprise-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Radar Isu Daerah Paling Dibicarakan</span>
              <span className="panel-subtitle">Sentimen & sebaran wilayah</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {trendingTopics.map((topic, idx) => (
              <div 
                key={idx}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  backgroundColor: topic.sentiment === 'negative' ? '#fff1f2' : '#f8fafc',
                  border: `1px solid ${topic.sentiment === 'negative' ? '#fecdd3' : '#e2e8f0'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                    #{topic.tag.replace(/\s+/g, '')}
                  </div>
                  <span className={`metric-badge ${topic.sentiment === 'positive' ? 'badge-success' : topic.sentiment === 'negative' ? 'badge-danger' : 'badge-neutral'}`}>
                    {topic.sentiment.toUpperCase()}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#64748b' }}>
                  <span>Wilayah Fokus: <strong style={{ color: '#1e293b' }}>{topic.region}</strong></span>
                  <span>{topic.mentions.toLocaleString('id-ID')} sebutan</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
