'use client';
 
import Link from 'next/link';
import Logo from '@/components/logo/Logo.jsx';
import CloseBtnIcon from '@/components/icons/CloseBtnIcon.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '@/store/auth/operations';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CatalogIcon, UserIcon, FlameIcon, DeliveryIcon, ShieldIcon, ReturnIcon, MegaphoneIcon, GuideIcon, SupportIcon, TagIcon, MobileCartIcon, MobileFavoriteIcon } from '@/components/icons/mobile/MenuIcons.jsx';
import FacebookIcon from '@/components/icons/FacebookIcon.jsx';
import InstagramIcon from '@/components/icons/InstagramIcon.jsx';
import TelegramIcon from '@/components/icons/TelegramIcon.jsx';
import YouTubeIcon from '@/components/icons/YouTubeIcon.jsx';
import { catalogData } from '@/data/catalogData';
import { CategoryIcon } from '@/components/icons/CategoryIcons';

export default function MobileMenu({ onClose }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, locale } = useLanguage();

  const [activeView, setActiveView] = useState('main'); // 'main' | 'catalog'
  const [activeCatL1, setActiveCatL1] = useState(null);
  const [activeCatL2, setActiveCatL2] = useState(null);

  const handleLogout = () => {
    dispatch(logOut());
    onClose();
    router.push('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-out Menu Panel */}
      <div className="relative flex flex-col w-full max-w-[320px] h-full bg-white text-text shadow-2xl transition-transform duration-300 ease-out z-10 overflow-y-auto custom-scrollbar">
        
        {/* Header - Blue */}
        <div className="flex items-center justify-center bg-brand-700 h-[60px] md:h-[72px] shrink-0 relative">
          <div className="w-[120px] md:w-[150px]">
            <Logo />
          </div>
          {/* Close Button is NOT in screenshot, but we need one! Let's put it on top right, inside the blue header, but maybe just use the backdrop to close it. Wait, the user might need a close button. Let's add it discreetly or just rely on backdrop. Actually, no close button in screenshot. I will omit it, they can tap outside. */}
        </div>

        {/* Content */}
        <div className="flex flex-col p-4 flex-1">
          {activeView === 'main' ? (
            <>
              {/* Product Catalog Button */}
              <button 
                type="button"
                onClick={() => setActiveView('catalog')}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-b from-[#ff7400] to-[#df4300] text-white font-bold py-3 rounded-lg shadow-sm hover:brightness-110 active:scale-[0.98] transition-all mb-4 cursor-pointer"
              >
                <CatalogIcon className="w-5 h-5" />
                <span>{t('catalogue')}</span>
              </button>

              {/* Nav List 1 */}
              <ul className="flex flex-col gap-4 py-2">
                {!isLoggedIn ? (
                  <li>
                    <Link href="/login" onClick={onClose} className="flex items-center gap-3 text-sm hover:text-brand-700 transition-colors">
                      <UserIcon className="w-5 h-5 text-gray-500" />
                      <span>{t('signUp')}</span>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <div className="flex flex-col gap-3">
                      <Link href="/profile" onClick={onClose} className="flex items-center gap-3 text-sm hover:text-brand-700 transition-colors">
                        <UserIcon className="w-5 h-5 text-gray-500" />
                        <span>{t('myProfile')}</span>
                      </Link>
                      <button onClick={handleLogout} className="flex items-center gap-3 text-sm hover:text-brand-700 transition-colors text-left cursor-pointer">
                        <span className="w-5 h-5 flex justify-center items-center text-gray-500">🚪</span>
                        <span>{t('logOut')}</span>
                      </button>
                    </div>
                  </li>
                )}
                <li>
                  <Link href="/cart" onClick={onClose} className="flex items-center gap-3 text-sm hover:text-brand-700 transition-colors">
                    <MobileCartIcon className="w-5 h-5 text-gray-500" />
                    <span>{t('cart')}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/favorites" onClick={onClose} className="flex items-center gap-3 text-sm hover:text-brand-700 transition-colors">
                    <MobileFavoriteIcon className="w-5 h-5 text-gray-500" />
                    <span>{t('favorites')}</span>
                  </Link>
                </li>
                <li>
                  <Link href="/sale" onClick={onClose} className="flex items-center gap-3 text-sm hover:text-brand-700 transition-colors">
                    <FlameIcon className="w-5 h-5 text-gray-500" />
                    <span>{t('sale')}</span>
                  </Link>
                </li>
              </ul>

              <div className="h-[1px] bg-gray-200 my-2" />

              {/* Nav List 2 */}
              <ul className="flex flex-col gap-4 py-2">
                <li>
                  <Link href="#" onClick={onClose} className="flex items-center gap-3 text-sm hover:text-brand-700 transition-colors">
                    <DeliveryIcon className="w-5 h-5 text-gray-500" />
                    <span>{t('deliveryPayment')}</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={onClose} className="flex items-center gap-3 text-sm hover:text-brand-700 transition-colors">
                    <ShieldIcon className="w-5 h-5 text-gray-500" />
                    <span>{t('guarantee') || 'Guarantee'}</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={onClose} className="flex items-center gap-3 text-sm hover:text-brand-700 transition-colors">
                    <ReturnIcon className="w-5 h-5 text-gray-500" />
                    <span>{t('productReturn') || 'Product return'}</span>
                  </Link>
                </li>
              </ul>

              <div className="h-[1px] bg-gray-200 my-2" />

              {/* Nav List 3 */}
              <ul className="flex flex-col gap-4 py-2">
                <li>
                  <Link href="#" onClick={onClose} className="flex items-center gap-3 text-sm hover:text-brand-700 transition-colors">
                    <MegaphoneIcon className="w-5 h-5 text-gray-500" />
                    <span>{t('news') || 'News'}</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={onClose} className="flex items-center gap-3 text-sm hover:text-brand-700 transition-colors">
                    <GuideIcon className="w-5 h-5 text-gray-500" />
                    <span>{t('marketplaceGuide') || 'Marketplace Guide'}</span>
                  </Link>
                </li>
              </ul>

              <div className="h-[1px] bg-gray-200 my-2" />

              {/* Nav List 4 */}
              <ul className="flex flex-col gap-4 py-2">
                <li>
                  <Link href="#" onClick={onClose} className="flex items-center gap-3 text-sm hover:text-brand-700 transition-colors">
                    <SupportIcon className="w-5 h-5 text-gray-500" />
                    <span>{t('support') || 'Support'}</span>
                  </Link>
                </li>
              </ul>

              {/* Sell Your Item Button */}
              <Link 
                href="/seller/dashboard" 
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full mt-4 border border-[#ff7400] text-[#ff7400] font-bold py-3 rounded-lg hover:bg-orange-50 active:scale-[0.98] transition-all"
              >
                <TagIcon className="w-5 h-5" />
                <span>{t('sellButton')}</span>
              </Link>

              {/* Socials */}
              <div className="mt-auto pt-6 pb-2 flex justify-center gap-6 items-center">
                <Link href="#" className="text-gray-500 hover:text-brand-700 transition-colors"><FacebookIcon className="w-7 h-7" /></Link>
                <Link href="#" className="text-gray-500 hover:text-brand-700 transition-colors"><InstagramIcon className="w-7 h-7" /></Link>
                <Link href="#" className="text-gray-500 hover:text-brand-700 transition-colors"><TelegramIcon className="w-7 h-7" /></Link>
                <Link href="#" className="text-gray-500 hover:text-brand-700 transition-colors"><YouTubeIcon className="w-7 h-7" /></Link>
              </div>
            </>
          ) : (
            /* Catalog Drill-down View */
            <div className="flex flex-col h-full animate-fadeIn">
              <button 
                onClick={() => {
                  if (activeCatL2) setActiveCatL2(null);
                  else if (activeCatL1) setActiveCatL1(null);
                  else setActiveView('main');
                }}
                className="flex items-center gap-2 text-brand-700 font-bold mb-4 pb-4 border-b border-gray-200 cursor-pointer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                <span>Back</span>
              </button>

              <h2 className="text-lg font-bold mb-4 text-gray-800">
                {activeCatL2 ? activeCatL2.label : activeCatL1 ? activeCatL1.label : t('catalogue')}
              </h2>

              <ul className="flex flex-col">
                {(!activeCatL1 ? catalogData : !activeCatL2 ? activeCatL1.children : activeCatL2.children)?.map(cat => (
                  <li key={cat.id}>
                    <div 
                      onClick={() => {
                        if (cat.children && cat.children.length > 0) {
                          if (!activeCatL1) setActiveCatL1(cat);
                          else if (!activeCatL2) setActiveCatL2(cat);
                        } else {
                          onClose();
                          router.push(`/category/${cat.id}`);
                        }
                      }}
                      className="flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer hover:bg-brand-50/50"
                    >
                      <div className="flex items-center gap-3">
                        {!activeCatL1 && <CategoryIcon name={cat.icon} className="w-[20px] h-[20px]" />}
                        <span className="text-[15px] font-medium">{cat.label}</span>
                      </div>
                      {cat.children && cat.children.length > 0 && (
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 9l4-4-4-4"/></svg>
                      )}
                    </div>
                  </li>
                ))}
                {activeCatL1 && (!activeCatL2 ? activeCatL1.children : activeCatL2.children)?.length === 0 && (
                  <li className="text-gray-400 italic text-sm py-4">No subcategories</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
