'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFavoriteIds, toggleFavorite } from '@/store/favorites/slice';
import { addToCart, openCart } from '@/store/cart/slice';
import { useLanguage } from '@/context/LanguageContext';
import SmallCartIcon from '@/components/icons/SmallCartIcon';
import LikeIcon from '@/components/icons/LikeIcon';
import LinkIcon from '@/components/icons/LinkIcon';
import StarRating from '@/components/star-rating/StarRating';
import Modal from '@/components/modal/Modal';

const mockStoreData = {
  id: 'yourfashion',
  name: 'YourFashion Boutique',
  taglineUa: 'Офіційний виробник та дистриб’ютор сучасного повсякденного та святкового одягу.',
  taglineEn: 'Official manufacturer and distributor of modern everyday and festive apparel.',
  rating: 4.9,
  reviewsCount: 142,
  salesCount: '1 250+',
  cityUa: 'м. Київ, Україна',
  cityEn: 'Kyiv, Ukraine',
  sinceYear: '2023',
  businessTypeUa: 'Виробник / Бренд',
  businessTypeEn: 'Manufacturer / Brand',
  coverUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&auto=format&fit=crop&q=80',
  logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  phone: '+380 44 234 5678',
  email: 'sales@yourfashion.ua',
};

const mockStoreProducts = [
  {
    id: '1',
    name: 'Зимова куртка Oversize з капюшоном PUMA WarmCELL',
    nameEn: 'PUMA WarmCELL Winter Oversize Hooded Jacket',
    price: 2450,
    oldPrice: 3100,
    art: '626514',
    rating: 4.9,
    reviewsCount: 14,
    mainImageUrl: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop&q=80',
    category: 'outerwear',
    categoryNameUa: 'Верхній одяг',
    categoryNameEn: 'Outerwear',
  },
  {
    id: '2',
    name: 'Елегантна сукня максі з поясом та відкритими плечима',
    nameEn: 'Elegant Off-Shoulder Maxi Dress with Belt',
    price: 1250,
    oldPrice: 1600,
    art: '849201',
    rating: 5.0,
    reviewsCount: 18,
    mainImageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80',
    category: 'dresses',
    categoryNameUa: 'Сукні',
    categoryNameEn: 'Dresses',
  },
  {
    id: '3',
    name: 'Шкіряні зимові черевики на платформі з хутром',
    nameEn: 'Leather Platform Winter Boots with Fur',
    price: 2950,
    oldPrice: 3400,
    art: '849203',
    rating: 4.8,
    reviewsCount: 31,
    mainImageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
    category: 'shoes',
    categoryNameUa: 'Взуття',
    categoryNameEn: 'Shoes',
  },
  {
    id: '4',
    name: 'В’язаний оверсайз кардиган з ґудзиками',
    nameEn: 'Knitted Oversize Cardigan with Buttons',
    price: 1100,
    oldPrice: 1450,
    art: '849204',
    rating: 4.7,
    reviewsCount: 15,
    mainImageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80',
    category: 'cardigans',
    categoryNameUa: 'Кардигани',
    categoryNameEn: 'Cardigans',
  },
  {
    id: '5',
    name: 'Шовкова блуза з бантом на комірі',
    nameEn: 'Silk Blouse with Bow Necktie',
    price: 980,
    oldPrice: 1200,
    art: '849205',
    rating: 4.9,
    reviewsCount: 22,
    mainImageUrl: 'https://images.unsplash.com/photo-1589810635657-232948472d98?w=600&auto=format&fit=crop&q=80',
    category: 'dresses',
    categoryNameUa: 'Блузи',
    categoryNameEn: 'Blouses',
  },
  {
    id: '6',
    name: 'Класичні жіночі брюки палаццо з високою талією',
    nameEn: 'Classic High-Waist Palazzo Trousers',
    price: 1450,
    oldPrice: 1750,
    art: '849206',
    rating: 4.8,
    reviewsCount: 19,
    mainImageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
    category: 'outerwear',
    categoryNameUa: 'Штани',
    categoryNameEn: 'Trousers',
  },
];

const mockStoreReviews = [
  {
    id: 1,
    author: 'Марія К.',
    date: '15.02.2025',
    rating: 5,
    comment: 'Чудовий магазин! Замовляла дві сукні та пальто — все ідеально підійшло за розмірною сіткою. Тканина якісна, пошиття на висоті. Швидка відправка в день замовлення.',
  },
  {
    id: 2,
    author: 'Дмитро В.',
    date: '02.01.2025',
    rating: 5,
    comment: 'Купував куртку для дружини на подарунок. Менеджер магазину проконсультував щодо розміру та організував святкове пакування. Дякую за сервіс!',
  },
  {
    id: 3,
    author: 'Катерина Л.',
    date: '10.12.2024',
    rating: 4,
    comment: 'Якісні речі, відповідають фото. Єдине, що доставка Укрпоштою зайняла 4 дні замість обіцяних двох, але це претензія до перевізника, а не до магазину.',
  },
];

export default function StorePage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector(selectFavoriteIds);
  const { t, locale } = useLanguage() as any;

  const [activeTab, setActiveTab] = useState<'products' | 'about' | 'reviews'>('products');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<'default' | 'price_asc' | 'price_desc' | 'rating'>('default');

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast(t('linkCopiedToast') || 'Посилання скопійовано!');
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setIsContactModalOpen(false);
    setMessageText('');
    showToast(locale === 'ua' ? 'Повідомлення надіслано продавцю!' : 'Message sent to seller!');
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = mockStoreProducts;

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.art.includes(q)
      );
    }

    if (sortOption === 'price_asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortOption === 'price_desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortOption === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [selectedCategory, searchQuery, sortOption]);

  const categories = [
    { id: 'all', labelUa: 'Всі товари', labelEn: 'All Products' },
    { id: 'outerwear', labelUa: 'Верхній одяг', labelEn: 'Outerwear' },
    { id: 'dresses', labelUa: 'Сукні та блузи', labelEn: 'Dresses & Blouses' },
    { id: 'shoes', labelUa: 'Взуття', labelEn: 'Shoes' },
    { id: 'cardigans', labelUa: 'Кардигани та светри', labelEn: 'Cardigans & Sweaters' },
  ];

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#104c9a] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/20">
          <span className="text-lg">✓</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-3 flex justify-between items-center text-xs text-[#104c9a] font-semibold">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline opacity-80">{t('home') || 'Головна'}</Link>
            <span>/</span>
            <Link href="/catalogue" className="hover:underline opacity-80">{t('catalogue') || 'Каталог'}</Link>
            <span>/</span>
            <span className="font-bold text-[#104c9a]">{mockStoreData.name}</span>
          </div>

          <Link href="/catalogue" className="border border-[#104c9a] rounded-lg px-3 py-1 flex items-center gap-1.5 text-[#104c9a] font-bold bg-transparent hover:bg-blue-50 transition-colors text-xs">
            <span>← {t('backToCatalog') || 'До каталогу'}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-6 lg:py-10">
        
        {/* Store Hero Banner & Header */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-200 bg-white mb-8">
          
          {/* Cover Image */}
          <div className="relative w-full h-[180px] sm:h-[240px] lg:h-[280px] bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
            <Image 
              src={mockStoreData.coverUrl} 
              alt="Store Cover" 
              fill 
              className="object-cover opacity-50 mix-blend-overlay"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          {/* Store Info Bar */}
          <div className="px-6 sm:px-10 pb-6 pt-0 relative flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-16 sm:-mt-20">
            
            {/* Logo and Titles */}
            <div className="flex items-end gap-5">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white flex-shrink-0">
                <Image src={mockStoreData.logoUrl} alt={mockStoreData.name} fill className="object-cover" />
              </div>

              <div className="flex flex-col mb-1 text-gray-900">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold font-dm text-[#104c9a] leading-tight">
                    {mockStoreData.name}
                  </h1>
                  <span className="text-xs bg-green-50 text-green-700 font-bold px-2.5 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                    ✓ {t('verifiedSellerBadge') || 'Перевірений продавець'}
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm text-gray-600 max-w-[500px] mt-1 font-medium line-clamp-2">
                  {locale === 'ua' ? mockStoreData.taglineUa : mockStoreData.taglineEn}
                </p>

                {/* Key Badges */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-3 font-semibold">
                  <div className="flex items-center gap-1 text-[#ff7400]">
                    <span>★ {mockStoreData.rating}</span>
                    <span className="text-gray-500 font-normal">({mockStoreData.reviewsCount} відгуків)</span>
                  </div>
                  <span>•</span>
                  <span>{mockStoreData.salesCount} {t('storeSalesCount') || 'успішних продажів'}</span>
                  <span>•</span>
                  <span>📍 {locale === 'ua' ? mockStoreData.cityUa : mockStoreData.cityEn}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 w-full md:w-auto mt-2 md:mt-0">
              <button 
                onClick={() => {
                  setIsSubscribed(!isSubscribed);
                  showToast(isSubscribed ? (locale === 'ua' ? 'Ви відписалися від магазину' : 'Unsubscribed from store') : (locale === 'ua' ? 'Ви успішно підписалися на магазин!' : 'Subscribed to store!'));
                }}
                className={`flex-1 md:flex-initial text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${
                  isSubscribed 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300' 
                    : 'bg-[#ff7400] text-white hover:brightness-110'
                }`}
              >
                <span>{isSubscribed ? '✓ ' + (t('subscribedStore') || 'Ви підписані') : '+ ' + (t('subscribeStore') || 'Підписатися')}</span>
              </button>

              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="flex-1 md:flex-initial bg-[#104c9a] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
              >
                {t('contactSeller') || 'Написати продавцю'}
              </button>

              <button 
                onClick={handleShare}
                className="w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-[#104c9a] hover:bg-blue-50 transition-colors flex-shrink-0"
                title="Поділитися"
              >
                <LinkIcon className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

        {/* Store Tabs Navigation */}
        <div className="flex gap-3 border-b border-gray-200 mb-8 pb-3 overflow-x-auto custom-scrollbar">
          {[
            { id: 'products', label: `${t('storeProductsTab') || 'Товари магазину'} (${mockStoreProducts.length})` },
            { id: 'about', label: t('storeAboutTab') || 'Про магазин та умови' },
            { id: 'reviews', label: `${t('storeReviewsTab') || 'Відгуки покупців'} (${mockStoreReviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-[#104c9a] text-white shadow-sm' 
                  : 'text-gray-600 hover:text-[#104c9a] hover:bg-blue-50/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: STORE PRODUCTS */}
        {activeTab === 'products' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            
            {/* Filter Toolbar */}
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#104c9a] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {locale === 'ua' ? cat.labelUa : cat.labelEn}
                  </button>
                ))}
              </div>

              {/* Search & Sort */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:w-[260px]">
                  <input 
                    type="text" 
                    placeholder={t('searchInStore') || 'Пошук серед товарів магазину...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#104c9a]"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="border border-gray-300 rounded-xl px-3 py-2 text-xs bg-white text-[#104c9a] font-semibold outline-none focus:border-[#104c9a]"
                >
                  <option value="default">{locale === 'ua' ? 'За популярністю' : 'Popularity'}</option>
                  <option value="price_asc">{t('fromCheapToExpensive') || 'Від дешевих до дорогих'}</option>
                  <option value="price_desc">{t('fromExpensiveToCheap') || 'Від дорогих до дешевих'}</option>
                  <option value="rating">{locale === 'ua' ? 'За рейтингом' : 'By rating'}</option>
                </select>
              </div>

            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((item) => (
                  <div 
                    key={item.id}
                    className="group border border-gray-200/80 rounded-2xl p-4 bg-white flex flex-col hover:shadow-xl transition-all duration-300 relative"
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-[4/5] bg-[#f7f7f7] rounded-xl overflow-hidden mb-3.5">
                      <Image 
                        src={item.mainImageUrl} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      
                      {item.oldPrice && (
                        <div className="absolute top-2.5 left-2.5 bg-[#ff7400] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                          -{Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)}%
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button 
                        onClick={() => {
                          dispatch(toggleFavorite(item.id));
                          showToast(favoriteIds.includes(item.id) ? (t('removedFromFavorites') || 'Видалено з обраного') : (t('addedToFavorites') || 'Додано до обраного'));
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#104c9a] hover:text-[#ff7400] transition-colors"
                      >
                        <LikeIcon className={`w-4 h-4 ${favoriteIds.includes(item.id) ? 'text-[#ff7400] fill-[#ff7400]' : ''}`} />
                      </button>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <StarRating initialRating={item.rating} activeColor="#ff7400" className="gap-[2px]" />
                      <span className="text-gray-400 text-[11px] font-semibold">({item.reviewsCount})</span>
                    </div>

                    {/* Product Title */}
                    <Link 
                      href={`/product/${item.id}`} 
                      className="text-sm font-bold text-[#104c9a] leading-snug line-clamp-2 mb-2 group-hover:text-[#ff7400] transition-colors"
                    >
                      {locale === 'ua' ? item.name : item.nameEn}
                    </Link>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-auto mb-4">
                      <span className="text-lg font-bold font-dm text-[#104c9a]">{item.price} ₴</span>
                      {item.oldPrice && (
                        <span className="text-xs text-gray-400 line-through font-dm">{item.oldPrice} ₴</span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                      onClick={() => {
                        dispatch(addToCart({
                          id: item.id,
                          art: item.art,
                          name: item.name,
                          price: item.price,
                          image: item.mainImageUrl,
                          quantity: 1,
                          size: 'S',
                        }));
                        showToast(t('addedToCartToast') || 'Товар додано до кошика!');
                        dispatch(openCart());
                      }}
                      className="w-full bg-[#104c9a] text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"
                    >
                      <SmallCartIcon className="w-4 h-4 text-white" />
                      <span>{t('addToCart') || 'В кошик'}</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <p className="text-base font-bold text-gray-700">{t('noProductsFound') || 'Товарів не знайдено'}</p>
                <button 
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="mt-3 text-xs font-bold text-[#104c9a] underline"
                >
                  {t('resetAll') || 'Скинути фільтри'}
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: ABOUT STORE */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            
            {/* Left Col: Info & Bio */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold font-dm text-[#104c9a] mb-3">
                  {locale === 'ua' ? 'Про бренд YourFashion' : 'About YourFashion Brand'}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {mockStoreData.name} — український бренд дизайнерського одягу, заснований у 2023 році. Ми створюємо стильні, якісні та зручні речі для повсякденного життя та особливих подій. Усі вироби шиються на власному виробництві в Києві з використанням європейських преміум-тканин та надійної фурнітури.
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-bold text-[#104c9a] text-sm mb-4">{t('warrantyAndReturns') || 'Гарантія та повернення'}</h4>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  {t('warrantyAndReturnsDesc') || '14 днів на повернення або обмін згідно із Законом України «Про захист прав споживачів».'}
                </p>
                <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                  <li>Збережено товарний вигляд, ярлики та оригінальне пакування.</li>
                  <li>Швидке повернення коштів на картку протягом 1-3 банківських днів.</li>
                  <li>Обмін на інший розмір або колір здійснюється за наш рахунок.</li>
                </ul>
              </div>
            </div>

            {/* Right Col: Store Credentials Card */}
            <div className="bg-gradient-to-b from-blue-50/60 to-white rounded-2xl p-6 border border-blue-100 shadow-sm flex flex-col gap-4">
              <h4 className="font-bold text-[#104c9a] text-base">{locale === 'ua' ? 'Юридична інформація' : 'Store Details'}</h4>
              
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">{t('businessType') || 'Тип діяльності'}:</span>
                  <span className="font-bold text-gray-800">{locale === 'ua' ? mockStoreData.businessTypeUa : mockStoreData.businessTypeEn}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">{t('storeLocation') || 'Місцезнаходження'}:</span>
                  <span className="font-bold text-gray-800">{locale === 'ua' ? mockStoreData.cityUa : mockStoreData.cityEn}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">{t('storeSince') || 'На платформі з'}:</span>
                  <span className="font-bold text-gray-800">{mockStoreData.sinceYear} року</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-bold text-[#104c9a]">{mockStoreData.email}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-gray-500">Телефон:</span>
                  <span className="font-bold text-gray-800">{mockStoreData.phone}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="w-full mt-2 bg-[#104c9a] text-white font-bold py-3 rounded-xl text-xs hover:bg-blue-800 transition-colors shadow-sm"
              >
                {t('contactSeller') || 'Написати продавцю'}
              </button>
            </div>

          </div>
        )}

        {/* TAB 3: STORE REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="flex flex-col gap-6 animate-fadeIn max-w-[800px]">
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold font-dm text-[#ff7400]">
                  {mockStoreData.rating}
                </div>
                <div>
                  <StarRating initialRating={mockStoreData.rating} activeColor="#ff7400" />
                  <p className="text-xs text-gray-500 mt-1">Загальний рейтинг на основі {mockStoreData.reviewsCount} оцінок</p>
                </div>
              </div>

              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-[#ff7400] text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:brightness-110 transition-all shadow-sm"
              >
                + Залишити відгук
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {mockStoreReviews.map((rev) => (
                <div key={rev.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#104c9a] text-sm">{rev.author}</span>
                      <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-full border border-green-200">
                        ✓ Перевірена покупка
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center text-[#ff7400] text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed mt-1">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Contact Seller Modal */}
      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
        <form onSubmit={handleSendMessage} className="p-6 max-w-[480px] w-full flex flex-col gap-4">
          <h3 className="text-2xl font-bold font-dm text-[#104c9a]">
            {t('contactSeller') || 'Написати продавцю'}
          </h3>
          <p className="text-xs text-gray-600">
            Ви надсилаєте повідомлення менеджеру магазину <strong>{mockStoreData.name}</strong>. Відповідь надійде у ваш особистий кабінет та на електронну пошту.
          </p>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Тема звернення</label>
            <input 
              type="text" 
              placeholder="Уточнення щодо розміру або наявності..."
              className="border border-gray-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#104c9a]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Текст повідомлення</label>
            <textarea 
              rows={4}
              required
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Доброго дня! Підкажіть, будь ласка..."
              className="border border-gray-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#104c9a]"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button 
              type="button"
              onClick={() => setIsContactModalOpen(false)}
              className="flex-1 border border-gray-300 py-3 rounded-xl text-xs font-bold hover:bg-gray-100"
            >
              Скасувати
            </button>
            <button 
              type="submit"
              className="flex-1 bg-[#104c9a] text-white font-bold py-3 rounded-xl text-xs hover:bg-blue-800 shadow-md transition-colors"
            >
              Надіслати
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
