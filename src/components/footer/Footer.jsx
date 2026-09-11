'use client';

import FooterList from '@/components/footer/footer-list/FooterList.jsx';
import FooterSeller from '@/components/footer/footer-seller/FooterSeller.jsx';
import SocialList from '@/components/social-list/SocialList.jsx';
import Privacy from '@/components/privacy/Privacy.jsx';
import LogoFooter from '@/components/footer/logo-footer/LogoFooter.jsx';
import CopyrightIcon from '@/components/icons/CopyrightIcon.jsx';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-700 text-white pt-10 pb-6 font-dm">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 w-full">
        <div className="flex flex-col md:flex-row md:justify-between items-center md:items-start mb-10 gap-y-10 md:gap-y-0">
          
          <div className="flex flex-col flex-1 items-center md:items-start w-full order-2 md:order-1">
            <div className="mb-6 hidden md:block">
              <LogoFooter />
            </div>
            <FooterList />
          </div>
          
          <div className="w-full max-w-[400px] flex flex-col items-center md:items-start order-1 md:order-2 text-center md:text-left">
            <div className="mb-6 md:hidden">
              <LogoFooter />
            </div>
            <FooterSeller />
          </div>

        </div>
        
        {/* Bottom Bar: Social Links, Single Copyright, Privacy Links */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/20 pt-6 mt-6 gap-y-4 md:gap-y-0">
          <SocialList />
          
          <div className="flex items-center gap-x-2 text-xs font-medium text-white/90">
            <CopyrightIcon />
            <span>{t('copyright') || '© Easybuy. 2024–2026 Всі права захищені'}</span>
          </div>

          <div className="hidden md:block">
            <Privacy />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
