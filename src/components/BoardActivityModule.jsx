import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Image as ImageIcon,
  Clock, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { BOARD_ACTIVITIES } from '../data/mockData';

export default function BoardActivityModule() {
  const [activities, setActivities] = useState(BOARD_ACTIVITIES);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(activities[0]);

  // Form states
  const [title, setTitle] = useState('');
  const [dewanName, setDewanName] = useState('Ir. Panggah Susanto, M.M.');
  const [category, setCategory] = useState('Reses & Penyerapan Aspirasi');
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState('350');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newAct = {
      id: `ACT-2026-0${activities.length + 85}`,
      dewanName,
      role: 'Anggota Fraksi Partai Golkar',
      category,
      title,
      date: '05 Oktober 2026',
      location: location || 'Jawa Tengah',
      participants: parseInt(participants) || 200,
      pic: 'Staf Ahli Lapangan',
      status: 'Approved',
      description: description || 'Dokumentasi penyerapan aspirasi dan kegiatan organisasi bersama konstituen.',
      imagePlaceholder: 'general-doc'
    };

    setActivities([newAct, ...activities]);
    setSelectedActivity(newAct);
    setShowSubmitModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-wrap">
          <h1 className="page-title">Laporan Aktivitas Anggota Dewan & Pengurus</h1>
          <p className="page-description">
            Digitalisasi pelaporan kegiatan kedewanan (Reses, Sosialisasi Perda, Baksos, Pelatihan) lengkap dengan dokumentasi foto dan validasi geotag.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setShowSubmitModal(true)}>
          <Plus size={15} />
          <span>Buat Laporan Baru</span>
        </button>
      </div>

      {/* Grid: Activity Feed and Detail Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
        {/* Left: Activities List */}
        <div className="enterprise-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Riwayat Kegiatan Dewan Tervalidasi</span>
              <span className="panel-subtitle">Workflow: Submit → Review → Approved</span>
            </div>
            <span className="metric-badge badge-success">{activities.length} Laporan</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activities.map((act) => {
              const isSelected = selectedActivity.id === act.id;

              return (
                <div
                  key={act.id}
                  onClick={() => setSelectedActivity(act)}
                  style={{
                    padding: '18px',
                    borderRadius: '14px',
                    border: `1px solid ${isSelected ? '#f59e0b' : '#e2e8f0'}`,
                    backgroundColor: isSelected ? '#fffdf5' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="metric-badge badge-warning" style={{ fontSize: '10.5px' }}>
                      {act.category}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{act.id} · {act.date}</span>
                  </div>

                  <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', lineHeight: 1.3 }}>
                    {act.title}
                  </div>

                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#b45309', marginBottom: '8px' }}>
                    {act.dewanName} <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>({act.role})</span>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', fontSize: '11.5px', color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} />
                      <span>{act.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={13} />
                      <span>{act.participants} Peserta</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Activity Inspector & Documentation Photo */}
        <div className="enterprise-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Dokumentasi & Bukti Lapangan</span>
              <span className="metric-badge badge-success">Status: {selectedActivity.status}</span>
            </div>
          </div>

          {/* Photo Documentation Placeholder */}
          <div 
            style={{
              height: '200px',
              borderRadius: '14px',
              backgroundColor: '#1E293B',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              marginBottom: '18px',
              background: 'linear-gradient(135deg, #334155, #0F172A)'
            }}
          >
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <ImageIcon size={36} color="#F59E0B" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '13px', fontWeight: 700 }}>Foto Dokumentasi Resmi Kegiatan</div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>{selectedActivity.location} · Geotag Verified</div>
            </div>

            <div 
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '12px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '10px',
                fontFamily: 'monospace'
              }}
            >
              GPS: -7.150975, 110.140259
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Judul Acara</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{selectedActivity.title}</div>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Uraian Hasil Kegiatan</div>
              <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.5, marginTop: '4px' }}>
                {selectedActivity.description}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>PIC Lapangan:</span>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>{selectedActivity.pic}</div>
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Jumlah Konstituen:</span>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#059669' }}>{selectedActivity.participants} Orang</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Activity Report Modal */}
      {showSubmitModal && (
        <div className="modal-overlay" onClick={() => setShowSubmitModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Input Laporan Kegiatan Dewan</h3>
              <button className="icon-btn" onClick={() => setShowSubmitModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nama Anggota Dewan / Pengurus</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={dewanName}
                    onChange={(e) => setDewanName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Kategori Kegiatan</label>
                  <select 
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Reses & Penyerapan Aspirasi">Reses & Penyerapan Aspirasi</option>
                    <option value="Konsolidasi Organisasi">Konsolidasi Organisasi</option>
                    <option value="Bakti Sosial & Kesehatan">Bakti Sosial & Kesehatan</option>
                    <option value="Pelatihan Pemuda Kreatif">Pelatihan Pemuda Kreatif</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Judul Kegiatan</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Contoh: Sosialisasi Perda Ketenagakerjaan Pemuda"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Lokasi / Daerah</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: Balai Pertemuan Kab. Batang"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Perkiraan Jumlah Peserta</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={participants}
                      onChange={(e) => setParticipants(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Uraian / Ringkasan Aspirasi</label>
                  <textarea 
                    className="form-textarea" 
                    rows="3"
                    placeholder="Catatan aspirasi masyarakat yang dihimpun..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowSubmitModal(false)}>Batal</button>
                <button type="submit" className="btn-primary">Kirim Laporan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
