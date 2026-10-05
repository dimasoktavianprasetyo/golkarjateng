import React, { useState } from 'react';
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
  ArrowUpRight,
  Search,
  CheckCircle2,
  Bookmark,
  Eye,
  Repeat,
  Send,
  Smartphone,
  SlidersHorizontal,
  Layers,
  ShieldCheck,
  Check,
  ExternalLink
} from 'lucide-react';
import { 
  SOCIAL_SENTIMENT_DATA, 
  KOL_WATCHLIST, 
  LIVE_TWEETS_FEED, 
  WA_BROADCAST_CAMPAIGNS 
} from '../data/mockData';

export default function SocialMonitoringModule() {
  const [activeTab, setActiveTab] = useState('tweets'); // tweets, kol, radar, wa_broadcast
  const [sentimentFilter, setSentimentFilter] = useState('ALL'); // ALL, POSITIF, NETRAL, KRITIS
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKolCategory, setSelectedKolCategory] = useState('ALL');
  const [draftReplyModalPost, setDraftReplyModalPost] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [escalatedPosts, setEscalatedPosts] = useState({});
  const [activeCampaignIdx, setActiveCampaignIdx] = useState(0);

  const { totalMentions, growthPercent, sentimentRatio, platforms, trendingTopics } = SOCIAL_SENTIMENT_DATA;

  // Filter tweets
  const filteredTweets = LIVE_TWEETS_FEED.filter(t => {
    const matchSentiment = sentimentFilter === 'ALL' || t.sentiment === sentimentFilter;
    const matchSearch = searchQuery.trim() === '' || 
      t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSentiment && matchSearch;
  });

  // Filter KOLs
  const filteredKols = KOL_WATCHLIST.filter(k => {
    return selectedKolCategory === 'ALL' || k.category === selectedKolCategory;
  });

  const handleEscalate = (postId) => {
    setEscalatedPosts(prev => ({
      ...prev,
      [postId]: true
    }));
  };

  const handleSendDraftReply = () => {
    alert(`Draft tanggapan resmi berhasil dikirim ke Tim Humas & Biro Media untuk diposting via akun resmi @pemudagolkarjateng!`);
    setDraftReplyModalPost(null);
    setReplyText('');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: '20px' }}>
        <div className="page-title-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="metric-badge badge-success" style={{ fontSize: '11px', fontWeight: 800 }}>
              <Radio size={12} className="animate-pulse" /> RADAR MEDIA SOSIAL & OPINI PUBLIK
            </span>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Update real-time setiap 3 menit</span>
          </div>
          <h1 className="page-title">Monitoring Isu & Intelijen Opini Publik Digital Jawa Tengah</h1>
          <p className="page-description">
            Pemantauan cuitan X/Twitter, sentimen isu kepemudaan di 35 Kabupaten/Kota, watchlist tokoh kunci (KOL), serta pusat broadcast pengumuman WhatsApp.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div style={{ display: 'flex', gap: '6px', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('tweets')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              backgroundColor: activeTab === 'tweets' ? '#ffffff' : 'transparent',
              color: activeTab === 'tweets' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'tweets' ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <MessageSquare size={14} color={activeTab === 'tweets' ? '#2563eb' : '#64748b'} />
            <span>Feed Cuitan & Postingan</span>
            <span style={{ 
              fontSize: '10.5px', 
              padding: '1px 6px', 
              borderRadius: '10px', 
              backgroundColor: activeTab === 'tweets' ? '#e0f2fe' : '#e2e8f0',
              color: activeTab === 'tweets' ? '#0369a1' : '#64748b',
              whiteSpace: 'nowrap'
            }}>
              {LIVE_TWEETS_FEED.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('kol')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              backgroundColor: activeTab === 'kol' ? '#ffffff' : 'transparent',
              color: activeTab === 'kol' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'kol' ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <ShieldCheck size={14} color={activeTab === 'kol' ? '#f59e0b' : '#64748b'} />
            <span>KOL & Tokoh Publik</span>
            <span style={{ 
              fontSize: '10.5px', 
              padding: '1px 6px', 
              borderRadius: '10px', 
              backgroundColor: activeTab === 'kol' ? '#fef3c7' : '#e2e8f0',
              color: activeTab === 'kol' ? '#b45309' : '#64748b',
              whiteSpace: 'nowrap'
            }}>
              {KOL_WATCHLIST.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              backgroundColor: activeTab === 'radar' ? '#ffffff' : 'transparent',
              color: activeTab === 'radar' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'radar' ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <BarChart3 size={14} color={activeTab === 'radar' ? '#10b981' : '#64748b'} />
            <span>Radar Isu & Sentimen</span>
          </button>

          <button
            onClick={() => setActiveTab('wa_broadcast')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              backgroundColor: activeTab === 'wa_broadcast' ? '#ffffff' : 'transparent',
              color: activeTab === 'wa_broadcast' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'wa_broadcast' ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Smartphone size={14} color={activeTab === 'wa_broadcast' ? '#22c55e' : '#64748b'} />
            <span>WhatsApp Broadcast Hub</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FEED CUITAN & POSTINGAN TERPANTAU (Rich Social Feed) */}
      {/* ========================================================================= */}
      {activeTab === 'tweets' && (
        <div>
          {/* Controls: Search & Sentiment Filter Pills */}
          <div className="enterprise-panel" style={{ padding: '14px 18px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              {/* Search Bar */}
              <div style={{ position: 'relative', width: '380px', maxWidth: '100%' }}>
                <Search size={15} style={{ position: 'absolute', left: '12px', top: '11px', color: '#94a3b8' }} />
                <input 
                  type="text"
                  placeholder="Cari cuitan, hashtag #..., nama akun, kota..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    height: '38px',
                    paddingLeft: '36px',
                    paddingRight: '12px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12.5px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Sentiment Filter Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 700, marginRight: '4px' }}>Filter Sentimen:</span>
                <button
                  onClick={() => setSentimentFilter('ALL')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: sentimentFilter === 'ALL' ? '#0f172a' : '#ffffff',
                    color: sentimentFilter === 'ALL' ? '#ffffff' : '#64748b'
                  }}
                >
                  Semua ({LIVE_TWEETS_FEED.length})
                </button>

                <button
                  onClick={() => setSentimentFilter('POSITIF')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid #a7f3d0',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: sentimentFilter === 'POSITIF' ? '#10b981' : '#f0fdf4',
                    color: sentimentFilter === 'POSITIF' ? '#ffffff' : '#047857'
                  }}
                >
                  Positif ({LIVE_TWEETS_FEED.filter(t => t.sentiment === 'POSITIF').length})
                </button>

                <button
                  onClick={() => setSentimentFilter('NETRAL')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: sentimentFilter === 'NETRAL' ? '#64748b' : '#f8fafc',
                    color: sentimentFilter === 'NETRAL' ? '#ffffff' : '#334155'
                  }}
                >
                  Netral ({LIVE_TWEETS_FEED.filter(t => t.sentiment === 'NETRAL').length})
                </button>

                <button
                  onClick={() => setSentimentFilter('KRITIS')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid #fecdd3',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: sentimentFilter === 'KRITIS' ? '#e11d48' : '#fff1f2',
                    color: sentimentFilter === 'KRITIS' ? '#ffffff' : '#be123c'
                  }}
                >
                  Kritis ({LIVE_TWEETS_FEED.filter(t => t.sentiment === 'KRITIS').length})
                </button>
              </div>
            </div>
          </div>

          {/* Tweet Grid Feed (3 Kolom) */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '16px',
            alignItems: 'stretch'
          }}>
            {filteredTweets.map((tweet) => {
              const isEscalated = !!escalatedPosts[tweet.id];
              return (
                <div 
                  key={tweet.id}
                  className="enterprise-panel"
                  style={{
                    margin: 0,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderTop: tweet.sentiment === 'POSITIF' 
                      ? '4px solid #10b981' 
                      : tweet.sentiment === 'KRITIS' 
                      ? '4px solid #e11d48' 
                      : '4px solid #94a3b8',
                    borderRadius: '14px',
                    backgroundColor: '#ffffff',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {/* Top Bar: Author, Handle, Verification, Platform, Time */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/* Avatar */}
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          backgroundColor: tweet.avatarBg,
                          color: '#0f172a',
                          fontWeight: 800,
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #cbd5e1',
                          flexShrink: 0
                        }}>
                          {tweet.avatarText}
                        </div>

                        {/* Names & Handle */}
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {tweet.author}
                            </span>
                            {tweet.verified && (
                              <span title="Akun Terverifikasi" style={{ flexShrink: 0 }}>
                                <CheckCircle2 size={13} color="#0284c7" />
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {tweet.handle}
                          </div>
                        </div>
                      </div>

                      {/* Sentiment Badge */}
                      <span className={`metric-badge ${
                        tweet.sentiment === 'POSITIF' 
                          ? 'badge-success' 
                          : tweet.sentiment === 'KRITIS' 
                          ? 'badge-danger' 
                          : 'badge-neutral'
                      }`} style={{ fontSize: '10px', padding: '3px 8px', flexShrink: 0 }}>
                        {tweet.sentiment}
                      </span>
                    </div>

                    {/* Metadata Sub-bar: Platform, Time, Location */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9', marginBottom: '10px' }}>
                      <span>{tweet.platform} · {tweet.time}</span>
                      <span style={{ color: '#0284c7', fontWeight: 600 }}>📍 {tweet.region}</span>
                    </div>

                    {/* Tweet Content Body */}
                    <p style={{
                      fontSize: '13px',
                      color: '#1e293b',
                      lineHeight: 1.55,
                      margin: '0 0 14px 0',
                      fontWeight: 500
                    }}>
                      {tweet.content}
                    </p>
                  </div>

                  {/* Bottom: Metrics & Action Buttons */}
                  <div>
                    {/* Metrics Badges */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      fontSize: '11.5px', 
                      color: '#64748b',
                      padding: '8px 10px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      marginBottom: '10px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} title="Jumlah Suka">
                        <Heart size={13} color="#e11d48" />
                        <span>{tweet.likes.toLocaleString('id-ID')}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} title="Jumlah Retweet / Repost">
                        <Repeat size={13} color="#059669" />
                        <span>{tweet.retweets.toLocaleString('id-ID')}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} title="Komentar">
                        <MessageSquare size={13} color="#0284c7" />
                        <span>{tweet.replies}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} title="Total Penayangan (Impressions)">
                        <Eye size={13} color="#64748b" />
                        <span>{tweet.views}</span>
                      </div>
                    </div>

                    {/* Action Buttons: 2 columns inside card */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      <button 
                        className="btn-secondary"
                        onClick={() => {
                          setDraftReplyModalPost(tweet);
                          setReplyText(`Halo ${tweet.handle}, terima kasih atas masukannya. DPD Partai Golkar Jateng berkomitmen untuk terus mengawal aspirasi pemuda di ${tweet.region}.`);
                        }}
                        style={{ height: '30px', padding: '0 6px', fontSize: '11px', justifyContent: 'center' }}
                      >
                        <Send size={12} />
                        <span>Tanggapi</span>
                      </button>

                      <button 
                        onClick={() => handleEscalate(tweet.id)}
                        disabled={isEscalated}
                        style={{
                          height: '30px',
                          padding: '0 6px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: isEscalated ? 'default' : 'pointer',
                          border: isEscalated ? '1px solid #bbf7d0' : '1px solid #cbd5e1',
                          backgroundColor: isEscalated ? '#f0fdf4' : '#ffffff',
                          color: isEscalated ? '#166534' : '#0f172a',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px'
                        }}
                      >
                        {isEscalated ? (
                          <>
                            <Check size={12} color="#16a34a" />
                            <span>Terkirim</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle size={12} color="#d97706" />
                            <span>Eskalasi</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: KOL & TOKOH PUBLIK WATCHLIST */}
      {/* ========================================================================= */}
      {activeTab === 'kol' && (
        <div>
          {/* Category Filter */}
          <div className="enterprise-panel" style={{ padding: '14px 18px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>Kategori Tokoh:</span>
              {['ALL', 'Akademisi & Pengamat', 'Tokoh Komunitas', 'Influencer Kreatif', 'Aktivis Buruh', 'Media Massa', 'Kader Internal'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedKolCategory(cat)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    backgroundColor: selectedKolCategory === cat ? '#0f172a' : '#ffffff',
                    color: selectedKolCategory === cat ? '#ffffff' : '#64748b'
                  }}
                >
                  {cat === 'ALL' ? 'Semua Kategori' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* KOL Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '18px' }}>
            {filteredKols.map((kol) => (
              <div 
                key={kol.id}
                className="enterprise-panel"
                style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  {/* Top: Name, Role, Category */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{kol.name}</div>
                      <div style={{ fontSize: '12px', color: '#0284c7', fontWeight: 700 }}>{kol.handle}</div>
                      <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>{kol.role}</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span className="metric-badge badge-neutral" style={{ fontSize: '10.5px' }}>
                        {kol.category}
                      </span>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8', marginTop: '4px' }}>
                        {kol.platform}
                      </div>
                    </div>
                  </div>

                  {/* Impact Meter & Followers */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 1fr', 
                    gap: '8px', 
                    padding: '10px', 
                    backgroundColor: '#f8fafc', 
                    borderRadius: '10px', 
                    border: '1px solid #e2e8f0',
                    marginBottom: '14px',
                    textAlign: 'center'
                  }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>Pengikut</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{kol.followers}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>Engagement</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#10b981' }}>{kol.engagement}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>Impact Score</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#b45309' }}>{kol.impactScore}/100</div>
                    </div>
                  </div>

                  {/* Latest Statement */}
                  <div style={{ 
                    padding: '12px', 
                    borderRadius: '10px', 
                    backgroundColor: '#ffffff', 
                    border: '1px dashed #cbd5e1',
                    marginBottom: '14px'
                  }}>
                    <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Pernyataan Terpantau Terakhir:
                    </div>
                    <p style={{ fontSize: '12px', color: '#334155', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
                      "{kol.lastStatement}"
                    </p>
                  </div>
                </div>

                {/* Footer Tone */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f1f5f9', fontSize: '11.5px' }}>
                  <span style={{ color: '#64748b' }}>Nada Bicara:</span>
                  <span style={{ 
                    fontWeight: 700, 
                    color: kol.sentimentTone.includes('Positif') ? '#059669' : kol.sentimentTone.includes('Kritis') ? '#e11d48' : '#334155' 
                  }}>
                    ● {kol.sentimentTone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: RADAR ISU & SENTIMEN (Existing Analytical Engine) */}
      {/* ========================================================================= */}
      {activeTab === 'radar' && (
        <div>
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
      )}

      {/* ========================================================================= */}
      {/* TAB 4: WHATSAPP BROADCAST HUB */}
      {/* ========================================================================= */}
      {activeTab === 'wa_broadcast' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
          {/* Left: Broadcast Campaigns List */}
          <div className="enterprise-panel">
            <div className="panel-header">
              <div className="panel-title-wrap">
                <span className="panel-title">Pusat Siaran Notifikasi WhatsApp</span>
                <span className="panel-subtitle">Engine distribusi resmi pesan terjadwal & KTA digital</span>
              </div>
              <button 
                className="btn-primary"
                onClick={() => alert('Fitur simulasi: Buka form penulisan siaran massal dengan segmentasi pemilih')}
                style={{ height: '34px', padding: '0 12px', fontSize: '12px' }}
              >
                + Buat Siaran Baru
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {WA_BROADCAST_CAMPAIGNS.map((camp, idx) => (
                <div 
                  key={camp.id}
                  onClick={() => setActiveCampaignIdx(idx)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: activeCampaignIdx === idx ? '#f0fdf4' : '#ffffff',
                    border: activeCampaignIdx === idx ? '2px solid #22c55e' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b' }}>{camp.id} · {camp.date}</span>
                    <span className="metric-badge badge-success">{camp.status}</span>
                  </div>

                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
                    {camp.title}
                  </h4>

                  <div style={{ fontSize: '12px', color: '#0284c7', fontWeight: 600, marginBottom: '10px' }}>
                    Target: {camp.targetSegment}
                  </div>

                  {/* Delivery Stats Bar */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', padding: '8px', backgroundColor: '#f8fafc', borderRadius: '8px', textAlign: 'center', fontSize: '11px' }}>
                    <div>
                      <div style={{ color: '#64748b' }}>Terkirim</div>
                      <div style={{ fontWeight: 800, color: '#0f172a' }}>{camp.sentCount.toLocaleString('id-ID')}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b' }}>Diterima</div>
                      <div style={{ fontWeight: 800, color: '#059669' }}>{camp.deliveredCount.toLocaleString('id-ID')}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b' }}>Dibaca</div>
                      <div style={{ fontWeight: 800, color: '#0284c7' }}>{camp.readCount.toLocaleString('id-ID')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Phone Simulator Preview */}
          <div className="enterprise-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px' }}>
            <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a', marginBottom: '14px', textAlign: 'center' }}>
              📱 Preview Tampilan Pesan WhatsApp Penerima
            </div>

            {/* Mobile Phone Device Frame */}
            <div style={{
              width: '300px',
              height: '520px',
              backgroundColor: '#0c1317',
              borderRadius: '36px',
              padding: '12px',
              border: '6px solid #1e293b',
              boxShadow: '0 20px 40px rgba(15, 23, 42, 0.25)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* WhatsApp App Header */}
              <div style={{
                backgroundColor: '#1f2c34',
                padding: '10px 12px',
                borderRadius: '16px 16px 0 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#78350f', fontSize: '11px' }}>
                  G
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#e9edef' }}>DPD Golkar Jateng (Resmi)</div>
                  <div style={{ fontSize: '9px', color: '#25d366' }}>Akun Bisnis Terverifikasi ✓</div>
                </div>
              </div>

              {/* Chat Body */}
              <div style={{
                flex: 1,
                backgroundColor: '#0b141a',
                backgroundImage: 'radial-gradient(#1f2c34 1px, transparent 1px)',
                backgroundSize: '16px 16px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}>
                {/* Incoming Message Bubble */}
                <div style={{
                  backgroundColor: '#202c33',
                  color: '#e9edef',
                  borderRadius: '0 12px 12px 12px',
                  padding: '10px 12px',
                  fontSize: '11.5px',
                  lineHeight: 1.5,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  maxWidth: '92%'
                }}>
                  <div style={{ fontWeight: 700, color: '#25d366', fontSize: '10.5px', marginBottom: '4px' }}>
                    {WA_BROADCAST_CAMPAIGNS[activeCampaignIdx]?.title}
                  </div>
                  <p style={{ margin: '0 0 6px 0' }}>
                    {WA_BROADCAST_CAMPAIGNS[activeCampaignIdx]?.messagePreview}
                  </p>
                  <div style={{ textAlign: 'right', fontSize: '9px', color: '#8696a0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px' }}>
                    <span>14:02</span>
                    <span style={{ color: '#53bdeb' }}>✓✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Draft Modal */}
      {draftReplyModalPost && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            width: '520px',
            maxWidth: '100%',
            padding: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            animation: 'slideUp 0.15s ease-out'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0' }}>
              Draft Tanggapan Resmi Humas
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 14px 0' }}>
              Menanggapi cuitan dari <strong style={{ color: '#0f172a' }}>{draftReplyModalPost.author}</strong> ({draftReplyModalPost.handle})
            </p>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                lineHeight: 1.5,
                outline: 'none',
                marginBottom: '16px',
                fontFamily: 'inherit'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                className="btn-secondary"
                onClick={() => setDraftReplyModalPost(null)}
              >
                Batal
              </button>
              <button 
                className="btn-primary"
                onClick={handleSendDraftReply}
              >
                <Send size={14} />
                <span>Kirim ke Tim Humas</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
