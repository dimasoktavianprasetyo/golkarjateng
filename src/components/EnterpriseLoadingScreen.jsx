import React, { useState, useEffect } from 'react';
import golkarLogo from '../assets/Logo_Golkar.webp';

/**
 * EnterpriseLoadingScreen
 * Ultra-clean, seamless minimalist light frosted splash screen:
 * - Light frosted-glass blur backdrop (luminous, semi-translucent)
 * - Centered elegant Golkar emblem with warm golden pulse
 * - Clean high-contrast typography (Dark slate & Golkar gold)
 * - Ultra-thin golden liquid progress bar
 * - Butter-smooth GPU dissolve transition
 */
export default function EnterpriseLoadingScreen({ 
  onFinished, 
  title = "GOLKAR JAWA TENGAH",
  subtitle = "Youth & Digital Command Center",
  duration = 1500
}) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsExiting(true);
        const timer = setTimeout(() => {
          if (onFinished) onFinished();
        }, 650);
        return () => clearTimeout(timer);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [duration, onFinished]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // Luminous light frosted-glass blur with GPU acceleration
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.02)' : 'scale(1)',
        pointerEvents: isExiting ? 'none' : 'auto',
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        userSelect: 'none'
      }}
    >
      {/* Centered Ambient Warm Golden Glow */}
      <div
        style={{
          position: 'absolute',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(245, 158, 11, 0) 70%)',
          pointerEvents: 'none',
          animation: 'cleanPulse 2.6s ease-in-out infinite alternate'
        }}
      />

      {/* Clean Emblem Section */}
      <div style={{ position: 'relative', marginBottom: '22px' }}>
        <img
          src={golkarLogo}
          alt="Logo Golkar Jateng"
          style={{
            width: '72px',
            height: '72px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 24px rgba(245, 158, 11, 0.35))',
            animation: 'cleanFloat 2.4s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* Clean Branding (Golkar Gold) */}
      <div style={{
        fontSize: '11px',
        fontWeight: 800,
        letterSpacing: '3px',
        color: '#b45309',
        textTransform: 'uppercase',
        marginBottom: '6px'
      }}>
        {title}
      </div>

      {/* Subtitle (Crisp Dark Slate) */}
      <div style={{
        fontSize: '16px',
        fontWeight: 700,
        color: '#0f172a',
        letterSpacing: '-0.3px',
        marginBottom: '26px'
      }}>
        {subtitle}
      </div>

      {/* Ultra-Thin Minimalist Progress Line */}
      <div style={{
        width: '210px',
        height: '3.5px',
        borderRadius: '999px',
        backgroundColor: 'rgba(15, 23, 42, 0.08)',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '12px'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          borderRadius: '999px',
          background: 'linear-gradient(90deg, #d97706, #f59e0b, #fbbf24)',
          boxShadow: '0 0 10px rgba(245, 158, 11, 0.75)',
          transition: 'width 0.08s ease-out'
        }} />
      </div>

      {/* Discreet percentage ticker */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        fontWeight: 600,
        color: '#64748b',
        letterSpacing: '0.5px'
      }}>
        {progress}%
      </div>

      <style>{`
        @keyframes cleanPulse {
          0% { transform: scale(0.9); opacity: 0.55; }
          100% { transform: scale(1.15); opacity: 0.9; }
        }
        @keyframes cleanFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
