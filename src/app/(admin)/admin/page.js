'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AdminMenu from '@/page-sections/Admin/panel/AdminMenu.jsx';
import AdminSectionContent from '@/page-sections/Admin/panel/AdminSectionContent.jsx';

export default function AdminDashboardPage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen w-full font-dm antialiased">
      {/* Sidebar Menu (Blue Panel) */}
      <aside className={`w-[270px] bg-[#104c9a] flex-shrink-0 shadow-xl z-20 ${
        activeSection !== 'menu' ? 'hidden md:flex flex-col' : 'flex flex-col w-full'
      }`}>
        <AdminMenu 
          setActiveSection={setActiveSection} 
          activeSection={activeSection} 
        />
      </aside>

      {/* Content Pane */}
      <main className={`flex-grow flex flex-col min-h-screen ${
        activeSection === 'menu' ? 'hidden md:flex' : 'flex'
      }`}>
        {/* Mobile Header with Back Button */}
        {activeSection !== 'overview' && (
          <div className="md:hidden flex items-center bg-white px-4 py-3 border-b border-gray-100 shrink-0">
            <button
              onClick={() => setActiveSection('overview')}
              className="text-[#104c9a] hover:text-blue-800 font-bold text-sm flex items-center gap-1"
            >
              ← {t('backToMenu') || 'Огляд'}
            </button>
          </div>
        )}

        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <AdminSectionContent 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
        </div>
      </main>
    </div>
  );
}
