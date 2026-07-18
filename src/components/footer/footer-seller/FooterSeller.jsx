'use client';

import SellItemBtn from '@/components/button/sell-item-btn/SellItemBtn.jsx';
import { useLanguage } from '@/context/LanguageContext';

const FooterSeller = () => {
  const { t } = useLanguage();
  return (
    <div className="text-white">
      <h2 className="font-bold text-lg md:text-xl mb-2">{t('startSelling')}</h2>
      <p className="text-sm md:text-[13px] mb-4 hidden md:block">
        {t('sellSubtitle')}
      </p>
      <ul className="ml-5 mb-5 list-disc flex flex-col gap-1 text-[11px] md:text-xs hidden md:flex">
        <li>{t('sellPoint1')}</li>
        <li>{t('sellPoint2')}</li>
        <li>{t('sellPoint3')}</li>
      </ul>
      <SellItemBtn />
    </div>
  );
};

export default FooterSeller;
