'use client';

import Link from 'next/link.js';
import CopyrightIcon from '../icons/CopyrightIcon.jsx';
import { useLanguage } from '@/context/LanguageContext';

const Privacy = () => {
  const { t } = useLanguage();
  return (
    <div className="flex text-sm text-white font-medium gap-x-8 items-center">
      <div className="flex gap-x-2 items-center">
        <CopyrightIcon />
        <p>{t('copyright')}</p>
      </div>
      <div className="flex text-base gap-x-5">
        <Link href="#!" className="hover:text-brand-400 transition-colors">{t('privacyPolicy')}</Link>
        <Link href="#!" className="hover:text-brand-400 transition-colors">{t('userAgreement')}</Link>
      </div>
    </div>
  );
};

export default Privacy;
