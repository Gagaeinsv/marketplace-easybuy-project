'use client';

import { useState } from 'react';
import Menu from '@/page-sections/Buyer/panel/Menu.jsx';
import SectionContent from '@/page-sections/Buyer/panel/SectionContent.jsx';

const UserPanel = () => {
  const [activeSection, setActiveSection] = useState('menu');
  
  // Default to personalData on desktop if menu is selected
  const displaySection = activeSection === 'menu' ? 'personalData' : activeSection;

  return (
    <div className="bg-white md:bg-[#F8F9FA] min-h-screen py-0 md:py-10">
      <div className="container mx-auto px-0 md:px-4 max-w-[1440px] flex flex-col md:flex-row items-start gap-6 md:gap-8">
        
        {/* Sidebar (Menu) */}
        <aside className={`w-full px-4 pt-6 md:px-0 md:pt-0 md:w-[320px] lg:w-[343px] shrink-0 ${activeSection !== 'menu' ? 'hidden md:block' : 'block'}`}>
          <div className="w-full bg-white md:rounded-[16px] md:shadow-sm py-6">
            <Menu setActiveSection={setActiveSection} activeSection={displaySection} />
          </div>
        </aside>

        <main className={`w-full flex-grow px-4 pt-6 md:px-0 md:pt-0 ${activeSection === 'menu' ? 'hidden md:block' : 'block'}`}>
          <div className="w-full md:bg-white md:rounded-[16px] md:shadow-sm md:p-8 min-h-[500px]">
            <SectionContent sectionKey={displaySection} onBack={() => setActiveSection('menu')} />
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default UserPanel;
