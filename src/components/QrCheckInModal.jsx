import React, { useState } from 'react';
import { 
  QrCode, 
  CheckCircle2, 
  UserCheck, 
  Camera, 
  Sparkles, 
  Clock,
  Ticket
} from 'lucide-react';

export default function QrCheckInModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [scanState, setScanState] = useState('viewfinder'); // 'viewfinder' | 'success'
  const [scannedPerson, setScannedPerson] = useState(null);

  const sampleAttendees = [
    { name: 'Rizky Alamsyah Pratama', nik: '3374052809980003', event: 'Apel Akbar AMPG Jateng 2026', ticketNo: 'TKT-0011-JTG', time: '13:50 WIB' },
    { name: 'Dinda Ayu Maharani', nik: '3372036104010002', event: 'Apel Akbar AMPG Jateng 2026', ticketNo: 'TKT-0012-JTG', time: '13:51 WIB' },
    { name: 'Fahri Ramadhan, S.Kom', nik: '3302141508990001', event: 'Apel Akbar AMPG Jateng 2026', ticketNo: 'TKT-0013-JTG', time: '13:52 WIB' }
  ];

  const handleSimulateScan = (attendee) => {
    setScannedPerson(attendee);
    setScanState('success');
  };

  const handleReset = () => {
    setScanState('viewfinder');
    setScannedPerson(null);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <QrCode size={18} color="#d97706" />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                Kamera Check-in QR Peserta Event
              </h3>
              <p style={{ fontSize: '11.5px', color: '#64748b' }}>
                Pindai QR Code pada e-tiket / KTA peserta untuk pencatatan waktu kehadiran otomatis.
              </p>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {scanState === 'viewfinder' ? (
            <div>
              {/* Camera Viewfinder Box */}
              <div 
                style={{
                  height: '240px',
                  backgroundColor: '#0F172A',
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #334155',
                  marginBottom: '16px'
                }}
              >
                {/* Laser scan line */}
                <div className="ktp-laser"></div>

                {/* Target Frame Box */}
                <div 
                  style={{
                    width: '150px',
                    height: '150px',
                    border: '2px dashed #F59E0B',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Camera size={36} color="rgba(245, 158, 11, 0.4)" />
                </div>

                <div 
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    color: '#ffffff',
                    fontSize: '11px',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: '4px 12px',
                    borderRadius: '20px'
                  }}
                >
                  Kamera Aktif · Arahkan QR Code Peserta
                </div>
              </div>

              {/* Sample QR Simulation Buttons */}
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '8px' }}>
                  Simulasi Pindai Tiket Peserta:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {sampleAttendees.map((att, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleSimulateScan(att)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Ticket size={16} color="#d97706" />
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>{att.name}</div>
                          <div style={{ fontSize: '10.5px', color: '#64748b' }}>{att.ticketNo} · NIK {att.nik}</div>
                        </div>
                      </div>
                      <button className="btn-primary" style={{ fontSize: '11px', padding: '4px 10px' }}>
                        Check-in
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Successful Check-in Screen */
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                CHECK-IN BERHASIL!
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '18px' }}>
                Peserta terverifikasi dan waktu kedatangan telah dicatat ke database.
              </div>

              <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', textAlign: 'left', marginBottom: '20px' }}>
                <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                  {scannedPerson.name}
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginBottom: '10px' }}>
                  NIK: <span style={{ fontFamily: 'monospace', color: '#0F172A', fontWeight: 700 }}>{scannedPerson.nik}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11.5px', borderTop: '1px solid #E2E8F0', paddingTop: '10px' }}>
                  <div>
                    <span style={{ color: '#64748B' }}>Tiket:</span>
                    <div style={{ fontWeight: 700, color: '#B45309' }}>{scannedPerson.ticketNo}</div>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>Waktu Check-in:</span>
                    <div style={{ fontWeight: 700, color: '#059669' }}>{scannedPerson.time}</div>
                  </div>
                </div>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleReset}>
                <Camera size={14} />
                <span>Pindai Peserta Berikutnya</span>
              </button>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Selesai</button>
        </div>
      </div>
    </div>
  );
}
