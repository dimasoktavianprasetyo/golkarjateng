import React, { useState } from 'react';
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  Clock, 
  Plus, 
  QrCode, 
  CheckCircle2, 
  Search, 
  ScanLine, 
  Sparkles,
  Ticket,
  UserCheck
} from 'lucide-react';
import { EVENTS_DATA } from '../data/mockData';

export default function EventManagementModule({ onOpenQrModal, onOpenKtpModal }) {
  const [events, setEvents] = useState(EVENTS_DATA);
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventCapacity, setNewEventCapacity] = useState('1000');

  // Simulated attendees for the selected event
  const [attendees, setAttendees] = useState([
    { id: 'ATT-001', name: 'Rizky Alamsyah Pratama', nik: '3374052809980003', region: 'Kota Semarang', status: 'Checked-in', time: '08:14 WIB' },
    { id: 'ATT-002', name: 'Budi Santoso, S.Sos', nik: '3374011204850001', region: 'Kota Semarang', status: 'Checked-in', time: '08:22 WIB' },
    { id: 'ATT-003', name: 'Dinda Ayu Maharani', nik: '3372036104010002', region: 'Kota Surakarta', status: 'Checked-in', time: '08:35 WIB' },
    { id: 'ATT-004', name: 'Fahri Ramadhan, S.Kom', nik: '3302141508990001', region: 'Kab. Banyumas', status: 'Pending', time: '-' },
    { id: 'ATT-005', name: 'Nabila Zahra Putri', nik: '3310085406020005', region: 'Kab. Klaten', status: 'Pending', time: '-' }
  ]);

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle) return;

    const created = {
      id: `EVT-2026-00${events.length + 1}`,
      title: newEventTitle,
      date: newEventDate || '18 Oktober 2026',
      time: '09:00 - 15:00 WIB',
      location: newEventLocation || 'Gedung DPD Golkar Jateng',
      organizer: 'DPD Partai GOLKAR Jawa Tengah',
      pic: 'Panitia Pelaksana',
      capacity: parseInt(newEventCapacity) || 1000,
      registered: 0,
      present: 0,
      absent: 0,
      status: 'Upcoming',
      category: 'Konsolidasi'
    };

    setEvents([created, ...events]);
    setSelectedEvent(created);
    setShowCreateModal(false);
    setNewEventTitle('');
  };

  const handleSimulateCheckIn = (attendeeId) => {
    setAttendees(attendees.map(a => {
      if (a.id === attendeeId) {
        return {
          ...a,
          status: 'Checked-in',
          time: new Date().toLocaleTimeString('id-ID', { hour12: false }) + ' WIB'
        };
      }
      return a;
    }));

    // Update event counter
    setSelectedEvent({
      ...selectedEvent,
      present: selectedEvent.present + 1,
      absent: Math.max(0, selectedEvent.absent - 1)
    });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-wrap">
          <h1 className="page-title">Manajemen Event & Presensi QR Code</h1>
          <p className="page-description">
            Pengelolaan event kepemudaan, registrasi cepat scan KTP, tiket digital QR Code, dan validasi check-in real-time.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={onOpenQrModal}>
            <QrCode size={14} />
            <span>Kamera QR Scanner</span>
          </button>
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={15} />
            <span>Buat Event Baru</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Event Catalog (Left) and Live Attendance Dashboard (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '24px' }}>
        {/* Left: Events List */}
        <div className="enterprise-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Daftar Agenda Kegiatan</span>
              <span className="metric-badge badge-neutral">{events.length} Event</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {events.map((evt) => {
              const isSelected = selectedEvent.id === evt.id;
              const percent = ((evt.registered / evt.capacity) * 100).toFixed(0);

              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    border: `1px solid ${isSelected ? '#f59e0b' : '#e2e8f0'}`,
                    backgroundColor: isSelected ? '#fffdf5' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(245, 158, 11, 0.1)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span 
                      className={`metric-badge ${
                        evt.status === 'Ongoing' ? 'badge-danger' : evt.status === 'Completed' ? 'badge-neutral' : 'badge-success'
                      }`}
                      style={{ fontSize: '10.5px' }}
                    >
                      {evt.status}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>{evt.id}</span>
                  </div>

                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', lineHeight: 1.3 }}>
                    {evt.title}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px', color: '#64748b', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={13} />
                      <span>{evt.date} · {evt.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={13} />
                      <span>{evt.location}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                      <span style={{ color: '#64748b' }}>Kapasitas Terisi:</span>
                      <span style={{ fontWeight: 700, color: '#1e293b' }}>{evt.registered} / {evt.capacity} ({percent}%)</span>
                    </div>
                    <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(100, percent)}%`, backgroundColor: '#f59e0b' }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Event Live Attendance Center */}
        <div className="enterprise-panel">
          <div className="panel-header">
            <div>
              <span className="panel-title">Monitoring Kehadiran Event</span>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{selectedEvent.title}</div>
            </div>
            <button 
              className="btn-primary" 
              style={{ fontSize: '12px', padding: '6px 14px' }}
              onClick={onOpenQrModal}
            >
              <QrCode size={13} />
              <span>Buka QR Scanner</span>
            </button>
          </div>

          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Kapasitas</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{selectedEvent.capacity}</div>
            </div>
            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Terdaftar</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{selectedEvent.registered}</div>
            </div>
            <div style={{ backgroundColor: '#ecfdf5', padding: '12px', borderRadius: '12px', border: '1px solid #a7f3d0', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Hadir (QR)</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669' }}>{selectedEvent.present}</div>
            </div>
            <div style={{ backgroundColor: '#fff1f2', padding: '12px', borderRadius: '12px', border: '1px solid #fecdd3', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#e11d48', fontWeight: 600 }}>Belum Hadir</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#e11d48' }}>{selectedEvent.absent}</div>
            </div>
          </div>

          {/* Quick Registration & Scanner Shortcut */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
            <button 
              className="btn-secondary" 
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={onOpenKtpModal}
            >
              <ScanLine size={14} />
              <span>Quick Register via KTP</span>
            </button>
            <button 
              className="btn-primary" 
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={onOpenQrModal}
            >
              <QrCode size={14} />
              <span>Check-in Kamera QR</span>
            </button>
          </div>

          {/* Live Attendee Stream Table */}
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Daftar Peserta Terdaftar (Real-time Stream)
          </div>

          <div className="table-container" style={{ maxHeight: '280px', overflowY: 'auto' }}>
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Nama & NIK</th>
                  <th>Asal Daerah</th>
                  <th>Waktu Hadir</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((att) => (
                  <tr key={att.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{att.name}</div>
                      <div style={{ fontSize: '10.5px', fontFamily: 'monospace', color: '#64748b' }}>NIK: {att.nik}</div>
                    </td>
                    <td>{att.region}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '11.5px' }}>{att.time}</td>
                    <td>
                      <span className={`metric-badge ${att.status === 'Checked-in' ? 'badge-success' : 'badge-neutral'}`}>
                        {att.status}
                      </span>
                    </td>
                    <td>
                      {att.status === 'Pending' ? (
                        <button 
                          className="btn-primary" 
                          style={{ fontSize: '11px', padding: '4px 8px' }}
                          onClick={() => handleSimulateCheckIn(att.id)}
                        >
                          Check-in
                        </button>
                      ) : (
                        <CheckCircle2 size={16} color="#10b981" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Buat Agenda Event Baru</h3>
              <button className="icon-btn" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateEvent}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nama Event / Kegiatan</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Contoh: Apel Konsolidasi Pemuda Beringin 2026"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Tanggal Pelaksanaan</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: 25 Oktober 2026"
                      value={newEventDate}
                      onChange={(e) => setNewEventDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Kapasitas Maksimal</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={newEventCapacity}
                      onChange={(e) => setNewEventCapacity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Lokasi / Venue</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Contoh: Gedung DPD I Partai Golkar Jateng, Semarang"
                    value={newEventLocation}
                    onChange={(e) => setNewEventLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>Batal</button>
                <button type="submit" className="btn-primary">Publikasikan Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
