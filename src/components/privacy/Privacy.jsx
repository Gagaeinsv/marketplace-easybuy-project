'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const Privacy = () => {
  const { t } = useLanguage();
  return (
    <div className="flex text-sm text-white font-medium gap-x-6 items-center">
      <Link href="/privacy-policy" className="hover:text-brand-400 transition-colors">
        {t('privacyPolicy') || 'Політика конфіденційності'}
      </Link>
      <Link href="/user-agreement" className="hover:text-brand-400 transition-colors">
        {t('userAgreement') || 'Угода користувача'}
      </Link>
    </div>
  );
};

export default Privacy;
