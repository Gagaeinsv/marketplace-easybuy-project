'use client';

import { useLanguage } from '@/context/LanguageContext';

const SellItemBtn = () => {
  const { t } = useLanguage();
  return (
    <button
      type="button"
      className="font-bold flex justify-center items-center w-full max-w-[320px] h-13 text-white rounded-lg bg-orange-400 mb-15 md:mb-0 hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer"
    >
      {t('sellButton')}
    </button>
  );
};

export default SellItemBtn;
