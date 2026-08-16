'use client';

import Image from 'next/image';
import MenuItem from '@/page-sections/Buyer/panel/MenuItem.jsx';
import ProfileIcon from '@/components/icons/mobile/ProfileIcon.jsx';
import OrderIcon from '@/components/icons/mobile/OrderIcon.jsx';
import CartIcon from '@/components/icons/mobile/CartIcon.jsx';
import MessageIcon from '@/components/icons/mobile/MessageIcon.jsx';
import WishListIcon from '@/components/icons/mobile/WishListIcon.jsx';
import CompareIcon from '@/components/icons/mobile/CompareIcon.jsx';
import PaymentIcon from '@/components/icons/mobile/PaymentIcon.jsx';
import EditIcon from '@/components/icons/mobile/EditIcon.jsx';
import RightArrIcon from '@/components/icons/mobile/RightArrIcon.jsx';
import { logOut } from '@/store/auth/operations';
import PrivateRoute from '@/features/auth/private-route/PrivateRoute';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUserProfile } from '@/store/user/selectors';
import { useLanguage } from '@/context/LanguageContext';

import { SupportIcon } from '@/components/icons/mobile/MenuIcons.jsx';

const Menu = ({ setActiveSection, activeSection }) => {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectUserProfile);

  const displayName = profile?.name || profile?.email || 'User';

  const sections = {
    personalData: { label: t('personalData') || 'Personal Data', icon: <ProfileIcon /> },
    orders: { label: t('myOrders') || 'My Orders', icon: <OrderIcon /> },
    cart: { label: t('cartMenu') || 'Cart', icon: <CartIcon /> },
    message: { label: t('message') || 'Messages', icon: <MessageIcon /> },
    wishlist: { label: t('wishlist') || 'Wishlist', icon: <WishListIcon /> },
    product: { label: t('productsToCompare') || 'Compare', icon: <CompareIcon /> },
    payment: { label: t('payment') || 'Payment', icon: <PaymentIcon /> },
    setting: { label: t('settings') || 'Settings', icon: <EditIcon /> },
    help: { label: t('helpCenter') || 'Support & FAQ', icon: <SupportIcon /> },
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <PrivateRoute>
      <div className="flex items-center gap-4 px-6 mb-6">
        <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0 bg-blue-100 flex items-center justify-center text-[#104c9a] font-bold text-xl border border-blue-200">
          {profile?.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt={displayName}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            displayName.charAt(0).toUpperCase()
          )}
        </div>
        <div className="overflow-hidden">
          <h2 className="font-bold text-lg text-[#104c9a] truncate">{displayName}</h2>
          {profile?.email && <p className="text-xs text-gray-500 truncate">{profile.email}</p>}
        </div>
      </div>

      <nav className="flex flex-col gap-1 text-gray-600 px-4">
        {Object.entries(sections).map(([key, { label, icon }]) => (
          <MenuItem
            key={key}
            icon={icon}
            label={label}
            iconArr={<RightArrIcon />}
            isActive={activeSection === key}
            onClick={() => setActiveSection(key)}
          />
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center justify-between w-full p-3 mt-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm"
        >
          <span>{t('logOut') || 'Log Out'}</span>
        </button>
      </nav>
    </PrivateRoute>
  );
};

export default Menu;
