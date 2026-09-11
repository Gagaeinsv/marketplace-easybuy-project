'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CategoryIcon } from '@/components/icons/CategoryIcons';
import { catalogData } from '@/data/catalogData';
import { catalogTranslations } from '@/data/catalogTranslations';

const DropdownBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeL1, setActiveL1] = useState(catalogData[0]);
  const [activeL2, setActiveL2] = useState(catalogData[0]?.children ? catalogData[0].children[0] : null);
  const { t, locale } = useLanguage();
  const router = useRouter();

  const getLabel = (label) => {
    if (locale === 'ua') {
      return catalogTranslations[label] || label;
    }
    return label;
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleCatalogueClick = (e) => {
    e.preventDefault();
    router.push('/catalogue');
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div 
        className="hidden lg:relative lg:block group"
        onMouseEnter={() => setIsOpen(true)}
      >
        <Link 
          href="/catalogue"
          onClick={handleCatalogueClick}
          className="text-[24px] font-semibold text-white bg-transparent border-2 border-white rounded-lg px-[40px] py-[6px] shadow-[0_0_14px_rgba(201,223,255,0.52)] flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer leading-tight" 
        >
          <span>{t('catalogue') || 'Каталог'}</span>
        </Link>
      </div>

      {isOpen && (
        <div 
          className="fixed top-[112px] left-0 w-full h-[calc(100vh-112px)] bg-black/40 z-50 flex justify-center" 
          onClick={closeMenu}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-[1440px] h-[680px] bg-white flex shadow-2xl relative" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Column 1: Level 1 Categories */}
            <div className="w-[300px] bg-white border-r border-gray-200 overflow-y-auto py-4 custom-scrollbar">
              {catalogData.map((cat) => (
                <Link
                  key={cat.id}
                  href="/catalogue"
                  onClick={closeMenu}
                  className={`flex items-center justify-between px-6 py-2.5 cursor-pointer transition-colors ${activeL1?.id === cat.id ? 'text-brand-700 bg-brand-50/40 font-medium' : 'text-gray-600 hover:text-brand-700 hover:bg-brand-50/20'}`}
                  onMouseEnter={() => {
                    setActiveL1(cat);
                    setActiveL2(cat.children ? cat.children[0] : null);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <CategoryIcon name={cat.icon} className="w-[20px] h-[20px]" />
                    <span className="text-[15px]">{getLabel(cat.label)}</span>
                  </div>
                  {cat.children && (
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>
              ))}
            </div>

            {/* Column 2: Level 2 Categories */}
            <div className="w-[300px] border-r border-gray-200 overflow-y-auto py-4 bg-white custom-scrollbar">
              {activeL1?.children ? (
                activeL1.children.map((child) => (
                  <Link 
                    key={child.id}
                    href="/catalogue"
                    onClick={closeMenu}
                    className={`flex items-center justify-between px-6 py-3 cursor-pointer transition-colors ${activeL2?.id === child.id ? 'text-brand-700 font-semibold' : 'text-gray-700 hover:text-brand-700'}`}
                    onMouseEnter={() => setActiveL2(child)}
                  >
                    <span className="font-medium text-[15px]">{getLabel(child.label)}</span>
                    {child.children && (
                      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </Link>
                ))
              ) : (
                <div className="px-6 py-4 text-gray-400 text-sm italic">{locale === 'ua' ? 'Немає підкатегорій' : 'No subcategories'}</div>
              )}
            </div>

            {/* Column 3: Level 3 Categories */}
            <div className="w-[300px] border-r border-gray-200 overflow-y-auto py-4 bg-white custom-scrollbar">
              {activeL2?.children ? (
                activeL2.children.map((subchild) => (
                  <Link 
                    key={subchild.id}
                    href="/catalogue"
                    onClick={closeMenu}
                    className="flex items-center px-6 py-2.5 cursor-pointer transition-colors text-gray-600 hover:text-brand-700 text-[14px]"
                  >
                    <span>{getLabel(subchild.label)}</span>
                  </Link>
                ))
              ) : null}
            </div>

            {/* Column 4: Promotional area */}
            <div className="flex-1 bg-white p-8 flex flex-col items-center justify-center relative">
              <div className="relative w-full h-[320px] max-w-[360px]">
                <Image src="/images/catalog-illustration.svg" alt="Catalog Promotion" fill className="object-contain" priority />
              </div>
              <Link href="/catalogue" onClick={closeMenu}>
                <button className="mt-4 px-8 py-3 bg-[#104c9a] text-white font-bold rounded-xl shadow-md hover:brightness-110 transition-all">
                  {locale === 'ua' ? 'Перейти до всіх товарів' : 'Go to all products'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DropdownBtn;
