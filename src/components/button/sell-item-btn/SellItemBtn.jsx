'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const SellItemBtn = () => {
  const { t } = useLanguage();
  return (
    <Link
      href="/register/seller"
      className="font-bold flex justify-center items-center w-full max-w-[320px] h-13 text-white rounded-lg bg-orange-400 mb-15 md:mb-0 hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer text-center"
    >
      {t('sellButton')}
    </Link>
  );
};

export default SellItemBtn;
