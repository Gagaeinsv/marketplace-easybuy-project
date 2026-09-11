'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SellerMenu from '@/page-sections/Seller/panel/SellerMenu.jsx';
import SellerSectionContent from '@/page-sections/Seller/panel/SellerSectionContent.jsx';

const SellerDashboardPage = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen w-full font-dm antialiased">
      {/* Sidebar Menu (Blue Panel) */}
      <aside className={`md:w-[260px] bg-[#104c9a] flex-shrink-0 shadow-lg z-20 ${
        activeSection === 'menu' ? 'flex flex-col w-full min-h-screen' : 'hidden md:flex md:flex-col md:w-[260px]'
      }`}>
        <SellerMenu 
          setActiveSection={(sec) => setActiveSection(sec)} 
          activeSection={activeSection} 
        />
      </aside>

      {/* Content Pane */}
      <main className={`flex-1 flex flex-col min-h-screen ${
        activeSection === 'menu' ? 'hidden md:flex' : 'flex'
      }`}>
        {/* Mobile Header with Menu / Back Button */}
        <div className="md:hidden flex items-center justify-between bg-[#104c9a] text-white px-4 py-3 shrink-0 shadow-sm">
          <button
            onClick={() => setActiveSection('menu')}
            className="text-white hover:text-blue-100 font-bold text-sm flex items-center gap-1.5 cursor-pointer"
          >
            ☰ {t('menu') || 'Меню'}
          </button>
          <span className="text-xs uppercase font-extrabold tracking-wider opacity-90">
            {activeSection.toUpperCase()}
          </span>
        </div>

        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <SellerSectionContent activeSection={activeSection === 'menu' ? 'home' : activeSection} />
        </div>
      </main>
    </div>
  );
};

export default SellerDashboardPage;
