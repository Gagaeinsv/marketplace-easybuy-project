import PersonalData from '@/page-sections/Buyer/panel/sections/PersonalData.jsx';
import Orders from '@/page-sections/Buyer/panel/sections/Orders.jsx';
import Cart from '@/page-sections/Buyer/panel/sections/Cart.jsx';
import Message from '@/page-sections/Buyer/panel/sections/Message.jsx';
import Wishlist from '@/page-sections/Buyer/panel/sections/Wishlist.jsx';
import Product from '@/page-sections/Buyer/panel/sections/Products.jsx';
import Payment from '@/page-sections/Buyer/panel/sections/Payment.jsx';
import Setting from '@/page-sections/Buyer/panel/sections/Setting.jsx';
import Help from '@/page-sections/Buyer/panel/sections/Help.jsx';
import LeftArrIcon from '@/components/icons/mobile/LeftArrIcon.jsx';

import { useLanguage } from '@/context/LanguageContext';

const SectionContent = ({ sectionKey, onBack }) => {
  const { t } = useLanguage();

  const sections = {
    personalData: { label: t('personalData'), component: PersonalData },
    orders: { label: t('myOrders'), component: Orders },
    cart: { label: t('cartMenu'), component: Cart },
    message: { label: t('message'), component: Message },
    wishlist: { label: t('wishlist'), component: Wishlist },
    product: { label: t('productsToCompare'), component: Product },
    payment: { label: t('payment'), component: Payment },
    setting: { label: t('settings'), component: Setting },
    help: { label: t('helpCenter'), component: Help },
  };

  const SectionComponent = sections[sectionKey]?.component;

  return (
    <div className="w-full mx-auto md:mx-0">
      <div className="mb-4 flex items-center relative">
        {/* Mobile back button */}
        <button
          onClick={onBack}
          className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 p-2"
        >
          <LeftArrIcon />
        </button>
        {/* Title */}
        <h2 className="text-xl md:text-3xl font-bold text-blue-900 w-full text-center md:text-left pt-2 md:pt-0">
          {sections[sectionKey]?.label || 'Section'}
        </h2>
      </div>

      <div className="p-4">
        {SectionComponent ? <SectionComponent /> : <div>Section not found</div>}
      </div>
    </div>
  );
};

export default SectionContent;
