import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';
import posterImg from '../assets/postera.png';
import golkarLogo from '../assets/Logo_Golkar.webp';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('panggah.susanto@golkarjateng.id');
  const [password, setPassword] = useState('GolkarJateng2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('super_admin');
  const [isLoading, setIsLoading] = useState(false);
  const [alertNotice, setAlertNotice] = useState('');

  const demoAccounts = [
    {
      roleKey: 'super_admin',
      name: 'Ir. Panggah Susanto',
      roleName: 'Ketua DPD I Jateng',
      email: 'panggah.susanto@golkarjateng.id'
    },
    {
      roleKey: 'dpd_semarang',
      name: 'Rizki Aditya, S.T.',
      roleName: 'Admin DPD II Semarang',
      email: 'semarang@golkarjateng.id'
    },
    {
      roleKey: 'operator',
      name: 'Budi Santoso',
      roleName: 'Verifikator KTP Pemuda',
      email: 'verif.budi@golkarjateng.id'
    },
    {
      roleKey: 'saksi_tps',
      name: 'Tim BSNPG Jateng',
      roleName: 'Sentra Saksi TPS C1',
      email: 'bsnpg@golkarjateng.id'
    }
  ];

  const handleSelectDemo = (acc) => {
    setUsername(acc.email);
    setSelectedRole(acc.roleKey);
    setPassword('GolkarJateng2026!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) {
        onLogin(selectedRole);
      }
    }, 500);
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      backgroundColor: '#141210',
      backgroundImage: 'radial-gradient(circle at 50% 40%, #26221f 0%, #0d0c0b 85%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Full-size Rounded Outer Frame */}
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#121110',
        borderRadius: '36px',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1.08fr 0.92fr',
        boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        position: 'relative'
      }}>
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Visual Showcase with postera.png */}
        {/* ========================================================================= */}
        <div style={{
          position: 'relative',
          height: '100%',
          backgroundColor: '#0c0b0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: 0
        }}>
          {/* Subtle Ambient Radial Lighting Behind Poster */}
          <div style={{
            position: 'absolute',
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(245, 158, 11, 0) 70%)',
            top: '25%',
            left: '20%',
            pointerEvents: 'none',
            zIndex: 1
          }} />

          {/* User's provided poster image */}
          <img
            src={posterImg}
            alt="Sistem Manajemen Partai Golkar"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              position: 'relative',
              zIndex: 2,
              filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.6))'
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Modern White Sign In Card (Payoneer Aesthetic) */}
        {/* ========================================================================= */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '30px',
          margin: '10px',
          padding: '36px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto',
          boxSizing: 'border-box',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          {/* Top Bar: Brand Logo & Sign Up Link */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={golkarLogo}
                alt="Logo Golkar"
                style={{ width: '38px', height: '38px', objectFit: 'contain' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#0f172a',
                  letterSpacing: '-0.4px',
                  lineHeight: 1.1
                }}>
                  Golkar Jateng
                </span>
                <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 600 }}>
                  Youth & Command Center
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setAlertNotice('Untuk registrasi kader atau akun dinas baru, silakan hubungi Sekretariat DPD I Jawa Tengah.');
                setTimeout(() => setAlertNotice(''), 4500);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#334155',
                fontSize: '13px',
                fontWeight: 600,
                padding: '6px 10px',
                borderRadius: '8px',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569'
              }}>
                <UserPlus size={14} />
              </div>
              <span>Sign Up</span>
            </button>
          </div>

          {/* Notification if any */}
          {alertNotice && (
            <div style={{
              margin: '12px 0 0',
              padding: '10px 14px',
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '12px',
              fontSize: '12px',
              color: '#b45309',
              lineHeight: 1.4
            }}>
              {alertNotice}
            </div>
          )}

          {/* Form Content Area */}
          <div style={{ margin: 'auto 0', padding: '16px 0', maxWidth: '420px', width: '100%', alignSelf: 'center' }}>
            <h1 style={{
              fontSize: '38px',
              fontWeight: 800,
              color: '#111827',
              letterSpacing: '-1px',
              margin: '0 0 8px 0',
              lineHeight: 1.1
            }}>
              Sign In
            </h1>
            <p style={{
              fontSize: '13px',
              color: '#6b7280',
              margin: '0 0 28px 0',
              lineHeight: 1.5
            }}>
              Akses portal terpusat pemenangan pemuda, logistik C1 plano, dan database kader se-Jawa Tengah.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Input Email or Username */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email or Username"
                  required
                  style={{
                    width: '100%',
                    height: '52px',
                    padding: '0 24px',
                    borderRadius: '999px',
                    border: '1.5px solid #e5e7eb',
                    fontSize: '14px',
                    color: '#111827',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f97316';
                    e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Input Password */}
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  style={{
                    width: '100%',
                    height: '52px',
                    padding: '0 52px 0 24px',
                    borderRadius: '999px',
                    border: '1.5px solid #e5e7eb',
                    fontSize: '14px',
                    color: '#111827',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f97316';
                    e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '18px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Forgot Password link (Reddish-orange, left-aligned matching reference image) */}
              <div style={{ marginTop: '-4px', textAlign: 'left', paddingLeft: '4px' }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setAlertNotice('Instruksi pemulihan kata sandi telah dikirim ke nomor WhatsApp pimpinan terdaftar.');
                    setTimeout(() => setAlertNotice(''), 4500);
                  }}
                  style={{
                    fontSize: '13px',
                    color: '#f95738',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button (Pill gradient button with LogIn icon) */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  height: '52px',
                  borderRadius: '999px',
                  background: 'linear-gradient(90deg, #ff4d00 0%, #ff7a00 100%)',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: isLoading ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 24px rgba(255, 77, 0, 0.35)',
                  transition: 'all 0.18s ease',
                  marginTop: '8px'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(255, 77, 0, 0.45)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 77, 0, 0.35)';
                }}
              >
                {isLoading ? (
                  <span>Memverifikasi Akses...</span>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </>
                )}
              </button>

              {/* Quick Demo Switcher Cards */}
              <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  letterSpacing: '0.4px'
                }}>
                  <span>Pilih Akun Demo (1-Klik):</span>
                  <span style={{ color: '#f97316' }}>{selectedRole.toUpperCase()}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {demoAccounts.map((acc) => {
                    const isSelected = selectedRole === acc.roleKey;
                    return (
                      <button
                        key={acc.roleKey}
                        type="button"
                        onClick={() => handleSelectDemo(acc)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '12px',
                          border: isSelected ? '1.5px solid #f97316' : '1px solid #e5e7eb',
                          backgroundColor: isSelected ? '#fff7ed' : '#f9fafb',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.borderColor = '#cbd5e1';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                      >
                        <div style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: isSelected ? '#c2410c' : '#111827',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {acc.name}
                        </div>
                        <div style={{
                          fontSize: '10.5px',
                          color: isSelected ? '#ea580c' : '#6b7280',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {acc.roleName}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>

          {/* Bottom Footer: Copyright and Contact */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11.5px',
            color: '#9ca3af',
            paddingTop: '12px',
            borderTop: '1px solid #f3f4f6'
          }}>
            <span>© 2026 DPD Partai Golkar Jawa Tengah</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span
                style={{ cursor: 'pointer', transition: 'color 0.15s' }}
                onMouseEnter={(e) => e.target.style.color = '#4b5563'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                onClick={() => alert('Pusat Layanan Siber & IT DPD I: helpdesk@golkarjateng.or.id')}
              >
                Contact Us
              </span>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#4b5563'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                <span>Indonesia</span>
                <ChevronDown size={13} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
