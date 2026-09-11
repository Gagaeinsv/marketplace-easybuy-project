'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAppSelector } from '@/store/hooks';
import { selectUserProfile } from '@/store/user/selectors';

import {
  CatalogIcon,
  UserIcon,
  DeliveryIcon,
  SupportIcon,
  TagIcon,
  MegaphoneIcon,
  GuideIcon,
} from '@/components/icons/mobile/MenuIcons.jsx';
import OrderIcon from '@/components/icons/mobile/OrderIcon.jsx';
import MessageIcon from '@/components/icons/mobile/MessageIcon.jsx';
import EditIcon from '@/components/icons/mobile/EditIcon.jsx';

const SellerMenu = ({ setActiveSection, activeSection }) => {
  const { t } = useLanguage();
  const profile = useAppSelector(selectUserProfile);

  const storeName = profile?.name || 'Nike';

  const menuItems = {
    home: { label: t('sellerHome') || 'Home panel', icon: <CatalogIcon className="w-5 h-5" /> },
    products: { label: t('sellerProducts') || 'Products', icon: <TagIcon className="w-5 h-5" /> },
    orders: { label: t('sellerOrders') || 'Order', icon: <OrderIcon className="w-5 h-5" /> },
    chat: { label: t('sellerChat') || 'Chat with customers', icon: <MessageIcon className="w-5 h-5" /> },
    reviews: { label: t('sellerReviews') || 'Reviews', icon: <GuideIcon className="w-5 h-5" /> },
    notifications: { label: t('sellerNotifications') || 'Notification', icon: <MegaphoneIcon className="w-5 h-5" /> },
    settings: { label: t('sellerSettings') || 'Profile settings', icon: <EditIcon className="w-5 h-5" /> },
    managers: { label: t('sellerManagers') || 'Managers', icon: <UserIcon className="w-5 h-5" /> },
    promotions: { label: t('sellerPromotions') || 'Promotions', icon: <DeliveryIcon className="w-5 h-5" /> },
    support: { label: t('sellerSupport') || 'Technical support', icon: <SupportIcon className="w-5 h-5" /> },
  };

  return (
    <div className="bg-[#104c9a] text-white flex flex-col h-full py-6">
      {/* Brand/Logo Area */}
      <div className="flex flex-col items-center mb-8 px-6">
        <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg border-2 border-white/20">
          <svg viewBox="0 0 24 24" fill="black" className="w-12 h-12">
            <path d="M21 6.5c-1.2 1.5-4.4 4.5-9 7.8-2.6 1.9-5.2 3-7.5 3-.9 0-1.5-.3-1.8-.9-.3-.5-.3-1.2.2-2.1.8-1.5 2.6-3.8 5.4-6.8 1-.9 2-.6 2 .3 0 .7-.3 1.8-.7 3.2-.5 1.5-.6 2.3-.4 2.5.2.2.6 0 1.3-.6 2.2-1.7 5.4-4.8 9.6-9.2.4-.4.8-.4 1-.1.2.3.1.9-.1 1.1z"/>
          </svg>
        </div>
        <h2 className="text-white font-extrabold text-lg mt-3 uppercase tracking-wider">{storeName}</h2>
      </div>

      {/* Navigation list */}
      <nav className="flex flex-col flex-grow">
        {Object.entries(menuItems).map(([key, item]) => {
          const isActive = activeSection === key;
          return (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`relative flex items-center gap-3 w-full px-6 py-3.5 text-left text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'text-white font-bold bg-[#0d3d7b]'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-white/70'}>
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
              
              {/* Active Tab Vertical Indicator on the Right edge */}
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SellerMenu;
