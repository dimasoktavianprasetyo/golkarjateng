import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CommandCenterDashboard from './components/CommandCenterDashboard';
import WebGisModule from './components/WebGisModule';
import YouthManagementModule from './components/YouthManagementModule';
import KtaManagementModule from './components/KtaManagementModule';
import EventManagementModule from './components/EventManagementModule';
import ContributorLeaderboardModule from './components/ContributorLeaderboardModule';
import FieldOperationsModule from './components/FieldOperationsModule';
import BoardActivityModule from './components/BoardActivityModule';
import SocialMonitoringModule from './components/SocialMonitoringModule';
import MemberOrganizationModule from './components/MemberOrganizationModule';
import AuditAndSecurityModule from './components/AuditAndSecurityModule';

import KtpScannerModal from './components/KtpScannerModal';
import C1ScannerModal from './components/C1ScannerModal';
import QrCheckInModal from './components/QrCheckInModal';
import ExportModal from './components/ExportModal';

import { INITIAL_YOUTH_RECORDS, KAB_KOTA_JATENG, EVENTS_DATA } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeRole, setActiveRole] = useState('super_admin');

  // Modals state
  const [isKtpModalOpen, setIsKtpModalOpen] = useState(false);
  const [isC1ModalOpen, setIsC1ModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Cross-module states
  const [selectedKtaPerson, setSelectedKtaPerson] = useState(null);
  const [youthRecords, setYouthRecords] = useState(INITIAL_YOUTH_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');

  // Save new youth record from KTP scan
  const handleSaveNewYouth = (newRecord) => {
    setYouthRecords([newRecord, ...youthRecords]);
    // Optionally jump to youth tab or show notification
    setCurrentTab('youth');
  };

  // Jump to KTA preview
  const handleViewKta = (person) => {
    setSelectedKtaPerson(person);
    setCurrentTab('kta');
  };

  return (
    <div className="app-layout">
      {/* Fixed Sidebar */}
      <Sidebar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        youthCount={youthRecords.length}
      />

      {/* Main Content Area */}
      <div className={`main-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Top Header */}
        <Header 
          activeRole={activeRole}
          setActiveRole={setActiveRole}
          onOpenKtpModal={() => setIsKtpModalOpen(true)}
          onOpenQrModal={() => setIsQrModalOpen(true)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Global Search Results Overlay (If user is typing in Omnibar) */}
        {searchQuery.trim().length > 1 && (
          <div 
            style={{
              position: 'fixed',
              top: '72px',
              left: sidebarCollapsed ? '100px' : '290px',
              width: '460px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)',
              zIndex: 60,
              padding: '14px',
              animation: 'slideUp 0.15s ease-out'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Hasil Pencarian Pintar: "{searchQuery}"
              </span>
              <button 
                className="icon-btn" 
                style={{ width: '22px', height: '22px' }}
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '280px', overflowY: 'auto' }}>
              {/* Search in youth records */}
              {youthRecords.filter(y => y.nama.toLowerCase().includes(searchQuery.toLowerCase()) || y.nik.includes(searchQuery)).map(y => (
                <div 
                  key={y.id}
                  onClick={() => {
                    handleViewKta(y);
                    setSearchQuery('');
                  }}
                  style={{ padding: '8px 10px', borderRadius: '8px', backgroundColor: '#f8fafc', cursor: 'pointer', border: '1px solid #e2e8f0' }}
                >
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>{y.nama} (Pemuda)</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>NIK: {y.nik} · {y.kabKota}</div>
                </div>
              ))}

              {/* Search in Kab/Kota */}
              {KAB_KOTA_JATENG.filter(k => k.name.toLowerCase().includes(searchQuery.toLowerCase())).map(k => (
                <div 
                  key={k.id}
                  onClick={() => {
                    setCurrentTab('webgis');
                    setSearchQuery('');
                  }}
                  style={{ padding: '8px 10px', borderRadius: '8px', backgroundColor: '#fffdf5', cursor: 'pointer', border: '1px solid #fef3c7' }}
                >
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#b45309' }}>{k.name} (Wilayah GIS)</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Dapil {k.dapil} · {k.youthCount.toLocaleString('id-ID')} Pemuda</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Viewport Router */}
        <main className="content-viewport">
          {currentTab === 'dashboard' && (
            <CommandCenterDashboard 
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onOpenKtpModal={() => setIsKtpModalOpen(true)}
              onOpenQrModal={() => setIsQrModalOpen(true)}
              onOpenExportModal={() => setIsExportModalOpen(true)}
            />
          )}

          {currentTab === 'webgis' && (
            <WebGisModule 
              onNavigateYouth={() => setCurrentTab('youth')}
            />
          )}

          {currentTab === 'youth' && (
            <YouthManagementModule 
              onOpenKtpModal={() => setIsKtpModalOpen(true)}
              onViewKta={handleViewKta}
              records={youthRecords}
              setRecords={setYouthRecords}
            />
          )}

          {currentTab === 'kta' && (
            <KtaManagementModule 
              selectedKtaPerson={selectedKtaPerson}
              onClearSelectedKta={() => setSelectedKtaPerson(null)}
            />
          )}

          {currentTab === 'members' && (
            <MemberOrganizationModule />
          )}

          {currentTab === 'events' && (
            <EventManagementModule 
              onOpenQrModal={() => setIsQrModalOpen(true)}
              onOpenKtpModal={() => setIsKtpModalOpen(true)}
            />
          )}

          {currentTab === 'contributors' && (
            <ContributorLeaderboardModule />
          )}

          {currentTab === 'field_ops' && (
            <FieldOperationsModule 
              onOpenC1Modal={() => setIsC1ModalOpen(true)}
            />
          )}

          {currentTab === 'board_activity' && (
            <BoardActivityModule />
          )}

          {currentTab === 'social_monitoring' && (
            <SocialMonitoringModule />
          )}

          {currentTab === 'audit' && (
            <AuditAndSecurityModule 
              onOpenExportModal={() => setIsExportModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <KtpScannerModal 
        isOpen={isKtpModalOpen}
        onClose={() => setIsKtpModalOpen(false)}
        onSaveRecord={handleSaveNewYouth}
        activeRole={activeRole}
      />

      <C1ScannerModal 
        isOpen={isC1ModalOpen}
        onClose={() => setIsC1ModalOpen(false)}
      />

      <QrCheckInModal 
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />

      <ExportModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        activeRole={activeRole}
      />
    </div>
  );
}
