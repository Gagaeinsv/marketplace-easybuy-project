'use client';

import Link from 'next/link';
import Logo from '@/components/logo/Logo.jsx';
import DropdownBtn from '@/components/button/dropdown-btn/DropdownBtn.jsx';
import SearchBox from '@/components/search-box/SearchBox.jsx';
import HeaderIcons from '@/components/header/header-icons/HeaderIcons.jsx';
import BurgerButton from '@/components/button/burger-btn/BurgerBtn.tsx';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import SignUp from '@/features/auth/sign-up-btn/SignUp';
import { useLanguage } from '@/context/LanguageContext';
import MobileMenu from '@/components/header/mobile-menu/MobileMenu.jsx';

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { locale, setLocale, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header relative z-50 w-full">
      <nav className="header-inner container">
        {/* MOBILE: два ряди */}
        <div className="flex flex-col gap-3 lg:hidden py-3">
          {/* Верхній ряд: Бургер, Лого, Іконки */}
          <div className="flex items-center justify-between">
            <BurgerButton onClick={() => setIsMobileMenuOpen(true)} />
            <Logo />
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <Link href="/profile" className="lg:hidden">
                  <p className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center text-[13px] text-brand-700 font-bold">
                    {locale === 'ua' ? 'П' : 'P'}
                  </p>
                </Link>
              ) : (
                <Link href="/login" className="lg:hidden text-white hover:text-brand-400 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </Link>
              )}
              <HeaderIcons />
            </div>
          </div>
          
          {/* Нижній ряд: Рядок пошуку */}
          <div className="w-full">
            <SearchBox />
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:flex items-center justify-between h-[112px] w-full">
          {/* Left group */}
          <div className="flex items-center gap-4 xl:gap-8">
            <Logo />
            <DropdownBtn />
            <Link className="text-[16px] font-semibold text-white hover:text-brand-400 transition-colors leading-none" href="/sale">
              {t('sale')}
            </Link>
          </div>

          {/* Center group */}
          <div className="flex-1 max-w-[584px] mx-4 xl:mx-8">
            <SearchBox />
          </div>

          {/* Right group */}
          <div className="flex items-center gap-3 xl:gap-6">
            {/* Desktop Language Switcher */}
            <div className="flex items-center gap-1 font-semibold text-sm text-white/80 select-none">
              <button 
                onClick={() => setLocale('ua')} 
                className={`cursor-pointer hover:text-brand-400 transition-colors ${locale === 'ua' ? 'text-brand-400 font-bold' : ''}`}
              >
                UA
              </button>
              <span className="text-white/30">|</span>
              <button 
                onClick={() => setLocale('en')} 
                className={`cursor-pointer hover:text-brand-400 transition-colors ${locale === 'en' ? 'text-brand-400 font-bold' : ''}`}
              >
                EN
              </button>
            </div>

            <div className="h-5 w-[1px] bg-white/20" />

            <HeaderIcons />

            {isLoggedIn ? (
              <Link href="/profile">
                <p className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-xl text-brand-700 font-bold">
                  {locale === 'ua' ? 'П' : 'P'}
                </p>
              </Link>
            ) : (
              <SignUp />
            )}
          </div>
        </div>
      </nav>

      {/* Render Mobile Menu */}
      {isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />}
    </header>
  );
};

export default Header;
