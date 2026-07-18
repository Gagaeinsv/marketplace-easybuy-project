'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const linkGroups = [
  [
    { key: 'catalogue', text: 'Catalogue', href: '#!' },
    { key: 'contacts', text: 'Contacts', href: '#!' },
    { key: 'sale', text: 'Sale', href: '/sale' }
  ],
  [
    { key: 'deliveryPayment', text: 'Delivery and payment', href: '#!' },
    { key: 'guarantee', text: 'Guarantee', href: '#!' },
    { key: 'productReturn', text: 'Product return', href: '#!' }
  ],
  [
    { key: 'support', text: 'Support', href: '#!' },
    { key: 'news', text: 'News', href: '#!' },
    { key: 'marketplaceGuide', text: 'Marketplace Guide', href: '#!' }
  ],
];

const FooterList = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 gap-y-4 md:gap-y-0 md:gap-x-8 lg:gap-x-16 w-full max-w-2xl text-left pl-6 md:pl-0">
      {linkGroups.map((group, i) => (
        <ul key={i} className="flex flex-col gap-3">
          {group.map((item) => (
            <li key={item.key}>
              <Link href={item.href} className="text-[15px] md:text-base font-medium text-white hover:text-brand-400 transition-colors">
                {t(item.key)}
              </Link>
            </li>
          ))}
        </ul>
      ))}
      {/* Mobile-only privacy links */}
      <ul className="flex flex-col gap-3 md:hidden mt-2">
        <li>
          <Link href="/user-agreement" className="text-[15px] font-medium text-white hover:text-brand-400 transition-colors">
            User Agreement
          </Link>
        </li>
        <li>
          <Link href="/privacy-policy" className="text-[15px] font-medium text-white hover:text-brand-400 transition-colors">
            Privacy Policy
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterList;
