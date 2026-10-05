import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  KeyRound, 
  UserPlus, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  ExternalLink, 
  RefreshCw,
  Clock,
  Laptop,
  Smartphone,
  Eye,
  Check,
  Building2,
  Vote,
  Sparkles
} from 'lucide-react';
import { SYSTEM_USERS_DATA, SYSTEM_ROLES_PERMISSIONS } from '../data/mockData';

export default function SystemAccessModule() {
  const [activeSubTab, setActiveSubTab] = useState('users'); // 'users' | 'roles' | 'sessions'
  const [users, setUsers] = useState(SYSTEM_USERS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedUserDetail, setSelectedUserDetail] = useState(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Form state for new user
  const [newUser, setNewUser] = useState({
    nama: '',
    username: '',
    email: '',
    phone: '',
    roleKey: 'admin_dpd2',
    wilayah: 'Kota Semarang',
    dapil: 'Dapil Jateng I',
    organisasi: 'DPD II Partai GOLKAR',
    assignedScope: 'Wilayah Kabupaten / Kota Terpilih'
  });

  const showToast = (msg) => {
    setFeedbackToast(msg);
    setTimeout(() => {
      setFeedbackToast(null);
    }, 3500);
  };

  const handleToggleStatus = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
        showToast(`Status akun ${u.nama} berhasil diubah menjadi ${nextStatus}.`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUser.nama.trim() || !newUser.username.trim()) {
      alert('Mohon isi nama lengkap dan nama pengguna (username).');
      return;
    }

    const roleObj = SYSTEM_ROLES_PERMISSIONS.find(r => r.key === newUser.roleKey) || SYSTEM_ROLES_PERMISSIONS[1];

    const created = {
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      nama: newUser.nama,
      username: newUser.username.toLowerCase().replace(/\s+/g, '.'),
      email: newUser.email || `${newUser.username.toLowerCase()}@golkarjateng.id`,
      phone: newUser.phone || '0812-0000-0000',
      role: roleObj.name,
      roleKey: newUser.roleKey,
      wilayah: newUser.wilayah,
      dapil: newUser.dapil,
      organisasi: newUser.organisasi,
      status: 'Aktif',
      twoFactor: true,
      lastLogin: 'Baru Dibuat (Belum Login)',
      assignedScope: newUser.assignedScope,
      avatarBg: roleObj.badgeColor || '#0f172a'
    };

    setUsers([created, ...users]);
    setIsAddUserModalOpen(false);
    setNewUser({
      nama: '',
      username: '',
      email: '',
      phone: '',
      roleKey: 'admin_dpd2',
      wilayah: 'Kota Semarang',
      dapil: 'Dapil Jateng I',
      organisasi: 'DPD II Partai GOLKAR',
      assignedScope: 'Wilayah Kabupaten / Kota Terpilih'
    });
    showToast(`Akun pengguna ${created.nama} berhasil didaftarkan dan diaktifkan!`);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.wilayah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || user.roleKey === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalActive = users.filter(u => u.status === 'Aktif').length;
  const adminCount = users.filter(u => u.roleKey === 'super_admin' || u.roleKey === 'admin_dpd2').length;
  const verifCount = users.filter(u => u.roleKey === 'operator_verif').length;
  const saksiCount = users.filter(u => u.roleKey === 'koordinator_bsnpg').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Toast Feedback */}
      {feedbackToast && (
        <div 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 9999,
            fontSize: '13px',
            fontWeight: 600,
            border: '1px solid #334155',
            animation: 'slideUp 0.2s ease-out'
          }}
        >
          <CheckCircle2 size={16} color="#10b981" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header" style={{ margin: 0 }}>
        <div className="page-title-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="page-title">Kelola Akses Sistem & Manajemen Pengguna</h1>
            <span 
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: '#ecfdf5',
                padding: '3px 10px',
                borderRadius: '999px',
                border: '1px solid #a7f3d0'
              }}
            >
              RBAC Aktif · 5 Tingkatan Peran
            </span>
          </div>
          <p className="page-description">
            Pengaturan hak akses berjenjang pimpinan DPD I, DPD II 35 Kab/Kota, verifikator KTP, koordinator saksi BSNPG, dan kader lapangan.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-primary"
            onClick={() => setIsAddUserModalOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <UserPlus size={15} />
            <span>Tambah Akun Pengguna</span>
          </button>
        </div>
      </div>

      {/* Top Metric Indicators */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Total Pengguna Terdaftar</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={16} color="#0f172a" />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>{users.length} <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>User</span></div>
          <div style={{ fontSize: '11.5px', color: '#059669', marginTop: '4px', fontWeight: 600 }}>
            ● {totalActive} akun aktif berotoritas
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Pimpinan DPD I & DPD II</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={16} color="#d97706" />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>{adminCount} <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Pejabat</span></div>
          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
            Super Admin & Admin 35 Kab/Kota
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Verifikator KTP & KTA</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={16} color="#0284c7" />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>{verifCount} <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Operator</span></div>
          <div style={{ fontSize: '11.5px', color: '#0284c7', marginTop: '4px', fontWeight: 600 }}>
            Antrean verifikasi real-time aktif
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Koordinator Saksi BSNPG</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Vote size={16} color="#059669" />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>{saksiCount} <span style={{ fontSize: '13px', fontWeight: 500, color: '#64748b' }}>Sentra</span></div>
          <div style={{ fontSize: '11.5px', color: '#059669', marginTop: '4px', fontWeight: 600 }}>
            Sinkronisasi C1 10 Dapil Jateng
          </div>
        </div>
      </div>

      {/* SubTab Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px' }}>
        <button
          onClick={() => setActiveSubTab('users')}
          style={{
            padding: '9px 18px',
            fontSize: '13px',
            fontWeight: 700,
            color: activeSubTab === 'users' ? '#0f172a' : '#64748b',
            backgroundColor: activeSubTab === 'users' ? '#f1f5f9' : 'transparent',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Users size={15} color={activeSubTab === 'users' ? '#0f172a' : '#64748b'} />
          <span>Daftar Pengguna & Penugasan</span>
          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', backgroundColor: activeSubTab === 'users' ? '#e2e8f0' : '#f8fafc', color: '#0f172a', fontWeight: 700 }}>
            {users.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('roles')}
          style={{
            padding: '9px 18px',
            fontSize: '13px',
            fontWeight: 700,
            color: activeSubTab === 'roles' ? '#0f172a' : '#64748b',
            backgroundColor: activeSubTab === 'roles' ? '#f1f5f9' : 'transparent',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ShieldCheck size={15} color={activeSubTab === 'roles' ? '#0f172a' : '#64748b'} />
          <span>Matriks Otoritas Peran (5 Level RBAC)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sessions')}
          style={{
            padding: '9px 18px',
            fontSize: '13px',
            fontWeight: 700,
            color: activeSubTab === 'sessions' ? '#0f172a' : '#64748b',
            backgroundColor: activeSubTab === 'sessions' ? '#f1f5f9' : 'transparent',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Lock size={15} color={activeSubTab === 'sessions' ? '#0f172a' : '#64748b'} />
          <span>Keamanan Sesi & 2FA</span>
        </button>
      </div>

      {/* SUBTAB 1: DAFTAR PENGGUNA */}
      {activeSubTab === 'users' && (
        <div className="enterprise-panel" style={{ margin: 0 }}>
          <div className="panel-header" style={{ flexWrap: 'wrap', gap: '12px' }}>
            <div className="panel-title-wrap">
              <span className="panel-title">Direktori Akun Pengguna Terdaftar</span>
              <span className="panel-subtitle">Daftar pejabat, operator, dan pengawas pemenangan dengan status otentikasi aktif</span>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {/* Search Bar */}
              <div style={{ position: 'relative', width: '260px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ width: '100%', paddingLeft: '32px', fontSize: '12px' }}
                  placeholder="Cari Nama, Username, Wilayah..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Role Filter */}
              <select 
                className="form-select" 
                style={{ fontSize: '12px', padding: '6px 12px' }}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="ALL">Semua Peran</option>
                <option value="super_admin">Super Admin (DPD I)</option>
                <option value="admin_dpd2">Admin Wilayah (DPD II)</option>
                <option value="operator_verif">Operator Verifikator</option>
                <option value="koordinator_bsnpg">Koordinator BSNPG</option>
                <option value="enumerator">Enumerator Lapangan</option>
              </select>

              {/* Status Filter */}
              <select 
                className="form-select" 
                style={{ fontSize: '12px', padding: '6px 12px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">Semua Status</option>
                <option value="Aktif">Status Aktif</option>
                <option value="Nonaktif">Status Nonaktif</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Pengguna & Akun</th>
                  <th>Peran & Tingkat Otoritas</th>
                  <th>Cakupan Wilayah / Penugasan</th>
                  <th>Kontak Resmi</th>
                  <th>Keamanan 2FA</th>
                  <th>Aktivitas Terakhir</th>
                  <th>Status Akun</th>
                  <th style={{ textAlign: 'center' }}>Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div 
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            backgroundColor: user.avatarBg || '#0f172a',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 700,
                            flexShrink: 0
                          }}
                        >
                          {user.nama.split(' ').map(n => n[0]).filter((_, i) => i < 2).join('')}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13px' }}>
                            {user.nama}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>
                            @{user.username} · <span style={{ fontFamily: 'monospace' }}>{user.id}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span 
                        className="metric-badge"
                        style={{
                          backgroundColor: user.roleKey === 'super_admin' ? '#0f172a' : user.roleKey === 'admin_dpd2' ? '#fffbeb' : user.roleKey === 'operator_verif' ? '#f0f9ff' : user.roleKey === 'koordinator_bsnpg' ? '#ecfdf5' : '#f8fafc',
                          color: user.roleKey === 'super_admin' ? '#ffffff' : user.roleKey === 'admin_dpd2' ? '#b45309' : user.roleKey === 'operator_verif' ? '#0284c7' : user.roleKey === 'koordinator_bsnpg' ? '#059669' : '#475569',
                          border: `1px solid ${user.roleKey === 'super_admin' ? '#0f172a' : user.roleKey === 'admin_dpd2' ? '#fde68a' : user.roleKey === 'operator_verif' ? '#bae6fd' : user.roleKey === 'koordinator_bsnpg' ? '#a7f3d0' : '#e2e8f0'}`,
                          fontSize: '11px',
                          fontWeight: 700
                        }}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#1e293b' }}>
                        {user.wilayah}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        {user.dapil} · {user.assignedScope}
                      </div>
                    </td>

                    <td>
                      <div style={{ fontSize: '11.5px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Mail size={12} color="#64748b" />
                        <span>{user.email}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                        <Phone size={12} color="#64748b" />
                        <span>{user.phone}</span>
                      </div>
                    </td>

                    <td>
                      {user.twoFactor ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#059669', fontWeight: 700 }}>
                          <CheckCircle2 size={13} color="#059669" />
                          <span>Aktif (OTP)</span>
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#b45309', fontWeight: 600 }}>
                          <AlertTriangle size={13} color="#b45309" />
                          <span>Belum Diatur</span>
                        </span>
                      )}
                    </td>

                    <td style={{ fontSize: '11.5px', color: '#64748b', whiteSpace: 'nowrap' }}>
                      {user.lastLogin}
                    </td>

                    <td>
                      <span 
                        className={`metric-badge ${user.status === 'Aktif' ? 'badge-success' : 'badge-danger'}`}
                        style={{ fontSize: '11px' }}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => setSelectedUserDetail(user)}
                          title="Lihat Detail Profil & Hak Akses"
                          style={{
                            padding: '5px 8px',
                            backgroundColor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#334155',
                            cursor: 'pointer'
                          }}
                        >
                          Detail
                        </button>

                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          title={user.status === 'Aktif' ? "Tangguhkan Akun" : "Aktifkan Akun"}
                          style={{
                            padding: '5px 8px',
                            backgroundColor: user.status === 'Aktif' ? '#fff1f2' : '#ecfdf5',
                            border: `1px solid ${user.status === 'Aktif' ? '#fecdd3' : '#a7f3d0'}`,
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: user.status === 'Aktif' ? '#e11d48' : '#059669',
                            cursor: 'pointer'
                          }}
                        >
                          {user.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 2: MATRIKS OTORITAS PERAN (RBAC) */}
      {activeSubTab === 'roles' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="enterprise-panel" style={{ margin: 0 }}>
            <div className="panel-header">
              <div className="panel-title-wrap">
                <span className="panel-title">Matriks Otoritas & Izin Akses (RBAC Matrix)</span>
                <span className="panel-subtitle">Pembatasan wewenang fungsional berdasarkan peran resmi organisasi sesuai PRD Seksi 20</span>
              </div>
            </div>

            <div className="table-container">
              <table className="enterprise-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: '220px' }}>Fitur & Otoritas Sistem</th>
                    <th style={{ textAlign: 'center' }}>Super Admin (DPD I)</th>
                    <th style={{ textAlign: 'center' }}>Admin Wilayah (DPD II)</th>
                    <th style={{ textAlign: 'center' }}>Verifikator KTP/KTA</th>
                    <th style={{ textAlign: 'center' }}>Koord. BSNPG (Saksi)</th>
                    <th style={{ textAlign: 'center' }}>Enumerator Lapangan</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Akses Dasbor Eksekutif & WebGIS 35 Kab/Kota', key: 'view_executive_dashboard' },
                    { label: 'Pendaftaran & Input Berkas Pemuda (KTP)', key: 'input_youth_ktp' },
                    { label: 'Verifikasi OCR KTP & Atasi NIK Ganda', key: 'verify_ktp_ocr' },
                    { label: 'Penerbitan KTA Digital Ber-QR Otomatis', key: 'generate_kta' },
                    { label: 'Broadcast Pesan Massal (WhatsApp Gateway)', key: 'wa_blast_broadcast' },
                    { label: 'Input Formulir C1 Plano Saksi TPS', key: 'input_c1_tps' },
                    { label: 'Validasi Tabulasi Pleno BSNPG & Hitung Suara', key: 'validate_c1_bsnpg' },
                    { label: 'Ekspor Dokumen Resmi (Excel, CSV, PDF)', key: 'export_data_official' },
                    { label: 'Manajemen Akun Pengguna & Otoritas Sistem', key: 'manage_system_users' }
                  ].map((perm, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600, color: '#0f172a', fontSize: '13px' }}>
                        {perm.label}
                      </td>
                      {SYSTEM_ROLES_PERMISSIONS.map(role => {
                        const isGranted = role.permissions[perm.key];
                        return (
                          <td key={role.key} style={{ textAlign: 'center' }}>
                            {isGranted ? (
                              <span 
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  backgroundColor: '#ecfdf5',
                                  color: '#059669'
                                }}
                              >
                                <Check size={14} strokeWidth={3} />
                              </span>
                            ) : (
                              <span style={{ color: '#cbd5e1', fontSize: '16px' }}>—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Role Cards Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {SYSTEM_ROLES_PERMISSIONS.map(role => (
              <div 
                key={role.key}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span 
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 9px',
                      borderRadius: '6px',
                      backgroundColor: role.badgeColor,
                      color: '#ffffff'
                    }}
                  >
                    {role.badge}
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                    {role.userCount} Personil
                  </span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                  {role.name}
                </div>
                <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                  {role.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: KEAMANAN SESI & LOG LOGIN */}
      {activeSubTab === 'sessions' && (
        <div className="enterprise-panel" style={{ margin: 0 }}>
          <div className="panel-header">
            <div className="panel-title-wrap">
              <span className="panel-title">Sesi Aktif & Integritas Akses Akun</span>
              <span className="panel-subtitle">Pemantauan perangkat yang sedang terautentikasi dan riwayat login pejabat DPD I</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Laptop size={20} color="#0f172a" />
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>
                    Sesi Saat Ini · Chrome pada macOS (Terminal DPD I Semarang)
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                    Ir. Panggah Susanto · Alamat IP: 180.252.88.10 · Aktif sejak 13:28 WIB
                  </div>
                </div>
              </div>
              <span className="metric-badge badge-success" style={{ fontSize: '11px' }}>Sesi Aktif Ini</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Laptop size={20} color="#0284c7" />
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>
                    Meja Verifikasi 02 · Windows Workstation
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                    Budi Santoso (Operator) · IP: 192.168.10.45 · Aktif sejak 13:15 WIB
                  </div>
                </div>
              </div>
              <button 
                onClick={() => showToast('Sesi operator Meja 02 diputus secara aman.')}
                style={{ padding: '6px 12px', fontSize: '11.5px', backgroundColor: '#fff1f2', border: '1px solid #fecdd3', color: '#e11d48', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
              >
                Putus Sesi
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Smartphone size={20} color="#059669" />
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>
                    Ponsel Petugas BSNPG · Android App (BSNPG Gateway)
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                    Zainal Abidin (Demak) · IP: 114.125.10.22 · Aktif sejak 11:40 WIB
                  </div>
                </div>
              </div>
              <button 
                onClick={() => showToast('Sesi ponsel petugas BSNPG diputus.')}
                style={{ padding: '6px 12px', fontSize: '11.5px', backgroundColor: '#fff1f2', border: '1px solid #fecdd3', color: '#e11d48', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
              >
                Putus Sesi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETAIL USER */}
      {selectedUserDetail && (
        <div className="modal-overlay" onClick={() => setSelectedUserDetail(null)}>
          <div className="modal-content" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: selectedUserDetail.avatarBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  {selectedUserDetail.nama.split(' ').map(n => n[0]).filter((_, i) => i < 2).join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {selectedUserDetail.nama}
                  </h3>
                  <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0 }}>
                    {selectedUserDetail.role}
                  </p>
                </div>
              </div>
              <button className="icon-btn" onClick={() => setSelectedUserDetail(null)}>✕</button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Nama Pengguna</div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>@{selectedUserDetail.username}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Nomor ID Akun</div>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>{selectedUserDetail.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Email Resmi</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>{selectedUserDetail.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>WhatsApp / Telp</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>{selectedUserDetail.phone}</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Wilayah Otoritas & Penugasan
                </div>
                <div style={{ padding: '10px', backgroundColor: '#fffdf5', border: '1px solid #fef3c7', borderRadius: '8px', fontSize: '12px', color: '#78350f' }}>
                  {selectedUserDetail.wilayah} · {selectedUserDetail.dapil}
                  <div style={{ marginTop: '4px', color: '#92400e', fontWeight: 500 }}>
                    Lingkup Tugas: {selectedUserDetail.assignedScope}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Status Otentikasi & Keamanan
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={15} color="#059669" />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>Verifikasi 2 Langkah (2FA)</span>
                  </div>
                  <span className="metric-badge badge-success">Aktif Terproteksi</span>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button 
                className="btn-secondary"
                onClick={() => {
                  handleToggleStatus(selectedUserDetail.id);
                  setSelectedUserDetail(null);
                }}
              >
                {selectedUserDetail.status === 'Aktif' ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}
              </button>
              <button className="btn-primary" onClick={() => setSelectedUserDetail(null)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH PENGGUNA BARU */}
      {isAddUserModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddUserModalOpen(false)}>
          <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserPlus size={18} color="#059669" />
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                    Pendaftaran Akun Pengguna Baru
                  </h3>
                  <p style={{ fontSize: '11.5px', color: '#64748b' }}>
                    Tambahkan pejabat atau operator ke dalam sistem hak akses berjenjang.
                  </p>
                </div>
              </div>
              <button className="icon-btn" onClick={() => setIsAddUserModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateUser}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap & Gelar</label>
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Drs. Wahyu Hidayat, M.Si."
                    value={newUser.nama}
                    onChange={(e) => setNewUser({ ...newUser, nama: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group">
                    <label className="form-label">Nama Pengguna (Username)</label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="wahyu.hidayat"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Peran Sistem (Role)</label>
                    <select 
                      className="form-select"
                      value={newUser.roleKey}
                      onChange={(e) => setNewUser({ ...newUser, roleKey: e.target.value })}
                    >
                      <option value="super_admin">Super Admin (DPD I)</option>
                      <option value="admin_dpd2">Admin Wilayah (DPD II)</option>
                      <option value="operator_verif">Operator Verifikator</option>
                      <option value="koordinator_bsnpg">Koordinator BSNPG Saksi</option>
                      <option value="enumerator">Enumerator Lapangan</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group">
                    <label className="form-label">Email Kedinasan</label>
                    <input 
                      type="email"
                      className="form-input"
                      placeholder="wahyu@golkarjateng.id"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">No. Telepon / WhatsApp</label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="0812-3456-7890"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group">
                    <label className="form-label">Wilayah Penugasan</label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="Contoh: Kota Semarang"
                      value={newUser.wilayah}
                      onChange={(e) => setNewUser({ ...newUser, wilayah: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Dapil DPR-RI</label>
                    <input 
                      type="text"
                      className="form-input"
                      placeholder="Dapil Jateng I"
                      value={newUser.dapil}
                      onChange={(e) => setNewUser({ ...newUser, dapil: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Cakupan Tanggung Jawab / Catatan Otoritas</label>
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="Contoh: Pengawasan pendaftaran pemuda wilayah Semarang Barat"
                    value={newUser.assignedScope}
                    onChange={(e) => setNewUser({ ...newUser, assignedScope: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setIsAddUserModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Simpan & Terbitkan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
