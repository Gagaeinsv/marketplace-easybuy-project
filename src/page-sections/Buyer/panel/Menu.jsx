'use client';


import Image from 'next/image.js'
import MenuItem from '@/page-sections/Buyer/panel/MenuItem.jsx';
import ProfileIcon from '@/components/icons/mobile/ProfileIcon.jsx';
import OrderIcon from '@/components/icons/mobile/OrderIcon.jsx';
import CartIcon from '@/components/icons/mobile/CartIcon.jsx';
import MessageIcon from '@/components/icons/mobile/MessageIcon.jsx';
import WishListIcon from '@/components/icons/mobile/WishListIcon.jsx';
import CompareIcon from '@/components/icons/mobile/CompareIcon.jsx';
import PaymentIcon from '@/components/icons/mobile/PaymentIcon.jsx';
import RightArrIcon from '@/components/icons/mobile/RightArrIcon.jsx';
import { logOut } from '@/store/auth/operations';
import PrivateRoute from '@/features/auth/private-route/PrivateRoute';
import { useAppDispatch } from '@/store/hooks'
import { useLanguage } from '@/context/LanguageContext';

const Menu = ({ setActiveSection, activeSection }) => {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();

  const sections = {
    personalData: { label: t('personalData'), icon: <ProfileIcon /> },
    orders: { label: t('myOrders'), icon: <OrderIcon /> },
    cart: { label: t('cartMenu'), icon: <CartIcon /> },
    message: { label: t('message'), icon: <MessageIcon /> },
    wishlist: { label: t('wishlist'), icon: <WishListIcon /> },
    product: { label: t('productsToCompare'), icon: <CompareIcon /> },
    payment: { label: t('payment'), icon: <PaymentIcon /> },
  };

  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <PrivateRoute>
      <div className="flex items-center justify-center gap-6 mb-5">
        <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/img/avatar.png"
            alt="Avatar"
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-bold text-2xl text-blue-800">Anthony Hopkins</h2>
        </div>
      </div>

      <nav className="flex flex-col gap-6 text-gray-500 pl-7">
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
      </nav>

      <div className="mt-3 border-t pt-5 text-gray-500 space-y-2 mb-4.5">
        <p className="text-gray-500 text-[20px] pl-7  hover:text-blue-900 transition">{t('settings')}</p>
        <p className="text-gray-500 text-[20px] pl-7  hover:text-blue-900 transition">
          {t('helpCenter')}
        </p>
      </div>

      <button
        className="flex mx-auto py-3 px-12 border border-blue-800 text-blue-800 rounded-lg hover:bg-blue-50 transition"
        onClick={handleLogout}
      >
        {t('logOut')}
      </button>
    </PrivateRoute>
  );
};

export default Menu;
