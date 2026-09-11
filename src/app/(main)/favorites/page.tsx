'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFavoriteIds, toggleFavorite, clearFavorites } from '@/store/favorites/slice';
import { addToCart, openCart } from '@/store/cart/slice';
import { useLanguage } from '@/context/LanguageContext';
import SmallCartIcon from '@/components/icons/SmallCartIcon';
import StarRating from '@/components/star-rating/StarRating';

// Fallback initial products if Redux products store is empty
const defaultCatalogItems = [
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
    category: 'Верхній одяг',
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
    category: 'Сукні',
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
    category: 'Взуття',
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
    category: 'Кардигани',
  },
];

const mockRecommended = [
  {
    id: 'rec-1',
    name: 'Теплий вовняний светр вільного крою',
    nameEn: 'Warm Loose Fit Woolen Sweater',
    price: 1350,
    oldPrice: 1700,
    rating: 4.8,
    reviewsCount: 22,
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60',
    art: '849301',
  },
  {
    id: 'rec-2',
    name: 'Стьобана демісезонна куртка Oversize',
    nameEn: 'Quilted Demi-Season Oversize Jacket',
    price: 2100,
    oldPrice: 2800,
    rating: 4.9,
    reviewsCount: 29,
    imageUrl: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=500&auto=format&fit=crop&q=60',
    art: '849302',
  },
  {
    id: 'rec-3',
    name: 'Жіночі прямі джинси з високою посадкою',
    nameEn: 'Women High-Rise Straight Leg Jeans',
    price: 1490,
    oldPrice: 1850,
    rating: 4.7,
    reviewsCount: 16,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60',
    art: '849303',
  },
  {
    id: 'rec-4',
    name: 'Сумка-тоут зі шкіри з подвійною ручкою',
    nameEn: 'Leather Tote Bag with Double Handle',
    price: 1850,
    oldPrice: 2300,
    rating: 5.0,
    reviewsCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60',
    art: '849304',
  },
];

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector(selectFavoriteIds);
  const storeProducts = useAppSelector((state) => state.products.items);
  const { t, locale } = useLanguage() as any;

  const [sortOption, setSortOption] = useState<'default' | 'price_asc' | 'price_desc' | 'rating'>('default');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Combine products from store and fallbacks
  const allAvailableProducts = useMemo(() => {
    const combined = [...storeProducts];
    defaultCatalogItems.forEach(item => {
      if (!combined.some(p => p.id === item.id)) {
        combined.push(item as any);
      }
    });
    return combined;
  }, [storeProducts]);

  // Filter items that are in favorites
  const favoriteItems = useMemo(() => {
    const items = allAvailableProducts.filter(p => favoriteIds.includes(p.id));
    
    // Sort
    if (sortOption === 'price_asc') {
      return [...items].sort((a, b) => a.price - b.price);
    }
    if (sortOption === 'price_desc') {
      return [...items].sort((a, b) => b.price - a.price);
    }
    if (sortOption === 'rating') {
      return [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return items;
  }, [allAvailableProducts, favoriteIds, sortOption]);

  const handleMoveAllToCart = () => {
    if (favoriteItems.length === 0) return;
    favoriteItems.forEach(item => {
      dispatch(addToCart({
        id: item.id,
        art: item.art || '626514',
        name: item.name,
        price: item.price,
        image: item.mainImageUrl || "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop&q=80",
        quantity: 1,
        size: 'S',
      }));
    });
    showToast(t('allMovedToCartToast') || 'Всі збережені товари додано до вашого кошика!');
    dispatch(openCart());
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
    showToast(t('wishlistClearedToast') || 'Список бажань очищено');
  };

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
        <div className="max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-4 flex justify-between items-center text-xs lg:text-sm text-[#104c9a] font-semibold">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:underline opacity-80">{t('home') || 'Головна'}</Link>
            <span>/</span>
            <span className="font-bold text-[#104c9a]">{t('favorites') || 'Обране'}</span>
          </div>

          <Link href="/catalogue" className="border border-[#104c9a] rounded-lg px-3.5 py-1.5 flex items-center gap-1.5 text-[#104c9a] font-bold bg-transparent hover:bg-blue-50 transition-colors text-xs">
            <span>← {t('backToCatalog') || 'До каталогу'}</span>
          </Link>
        </div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-8 lg:py-12">
        
        {/* Title & Top Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-3xl lg:text-[34px] font-bold font-dm text-[#104c9a] mb-1">
              {t('favoritesPageTitle') || 'Список бажань та обране'}
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              {favoriteItems.length} {t('itemsInWishlistCount') || 'товарів у списку'}
            </p>
          </div>

          {favoriteItems.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs text-gray-600 font-bold">
                <span className="hidden sm:inline">{t('sort') || 'Сортувати'}:</span>
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="border border-gray-300 rounded-xl px-3 py-2 text-xs bg-white text-[#104c9a] font-semibold outline-none focus:border-[#104c9a]"
                >
                  <option value="default">{locale === 'ua' ? 'За замовчуванням' : 'Default'}</option>
                  <option value="price_asc">{t('fromCheapToExpensive') || 'Від дешевих до дорогих'}</option>
                  <option value="price_desc">{t('fromExpensiveToCheap') || 'Від дорогих до дешевих'}</option>
                  <option value="rating">{locale === 'ua' ? 'За рейтингом' : 'By rating'}</option>
                </select>
              </div>

              {/* Action buttons */}
              <button 
                onClick={handleMoveAllToCart}
                className="bg-[#104c9a] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"
              >
                {t('addAllToCart') || 'Перемістити все в кошик'}
              </button>

              <button 
                onClick={handleClearFavorites}
                className="border border-gray-300 text-gray-600 hover:text-red-500 hover:border-red-300 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                {t('clearWishlist') || 'Очистити'}
              </button>
            </div>
          )}
        </div>

        {/* Favorites Content Grid */}
        {favoriteItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {favoriteItems.map((item) => (
              <div 
                key={item.id}
                className="group border border-gray-200/80 rounded-2xl p-4 bg-white flex flex-col hover:shadow-xl transition-all duration-300 relative"
              >
                {/* Image Box */}
                <div className="relative w-full aspect-[4/5] bg-[#f7f7f7] rounded-xl overflow-hidden mb-3.5">
                  <Image 
                    src={item.mainImageUrl || "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop&q=80"} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {(item as any).oldPrice && (
                    <div className="absolute top-2.5 left-2.5 bg-[#ff7400] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                      -{Math.round((((item as any).oldPrice - item.price) / (item as any).oldPrice) * 100)}%
                    </div>
                  )}

                  {/* Remove heart button */}
                  <button 
                    onClick={() => {
                      dispatch(toggleFavorite(item.id));
                      showToast(t('removedFromFavorites') || 'Видалено з обраного');
                    }}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-red-500 hover:scale-110 transition-transform cursor-pointer"
                    title="Видалити з обраного"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-2">
                  <StarRating initialRating={item.rating || 4.8} activeColor="#ff7400" className="gap-[2px]" />
                  <span className="text-gray-400 text-[11px] font-semibold">({item.reviewsCount || 10})</span>
                </div>

                {/* Product Title */}
                <Link 
                  href={`/product/${item.id}`} 
                  className="text-sm font-bold text-[#104c9a] leading-snug line-clamp-2 mb-2 group-hover:text-[#ff7400] transition-colors"
                >
                  {item.name}
                </Link>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-auto mb-4">
                  <span className="text-lg font-bold font-dm text-[#104c9a]">{item.price} ₴</span>
                  {(item as any).oldPrice && (
                    <span className="text-xs text-gray-400 line-through font-dm">{(item as any).oldPrice} ₴</span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => {
                    dispatch(addToCart({
                      id: item.id,
                      art: item.art || '626514',
                      name: item.name,
                      price: item.price,
                      image: item.mainImageUrl || "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop&q=80",
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
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center max-w-[480px] mx-auto mb-16 animate-fadeIn">
            <div className="w-24 h-24 bg-orange-50 text-[#ff7400] rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
              ♡
            </div>
            <h2 className="text-2xl font-bold font-dm text-gray-900 mb-2">
              {t('emptyFavoritesTitle') || 'Ваш список бажань порожній'}
            </h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              {t('emptyFavoritesDesc') || 'Додавайте вподобані товари, натиснувши на іконку сердечка на картці товару, щоб зберегти їх на потім.'}
            </p>
            <Link 
              href="/catalogue"
              className="bg-[#ff7400] text-white font-bold px-8 py-3.5 rounded-xl hover:brightness-110 transition-all shadow-md text-sm"
            >
              {t('catalogue') || 'Перейти до каталогу'}
            </Link>
          </div>
        )}

        <div className="border-t border-dashed border-gray-200 my-10"></div>

        {/* Recommended Products Carousel */}
        <div className="mt-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl lg:text-[28px] font-bold font-dm text-[#104c9a]">
                {t('recommendations') || 'Рекомендації для вас'}
              </h2>
              <p className="text-xs text-gray-500">Популярні товари з високим рейтингом покупців</p>
            </div>
            <Link href="/catalogue" className="text-[#104c9a] font-bold flex items-center gap-1.5 text-xs hover:underline">
              <span>{t('allProducts') || 'Всі товари'}</span> →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockRecommended.map((item) => (
              <div 
                key={item.id}
                className="group border border-gray-200/80 rounded-2xl p-3.5 bg-white flex flex-col hover:shadow-xl transition-all duration-300 relative"
              >
                <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-3">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-2 left-2 bg-[#ff7400] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-sm">
                    -20%
                  </div>
                  <button 
                    onClick={() => {
                      dispatch(toggleFavorite(item.id));
                      showToast(favoriteIds.includes(item.id) ? (t('removedFromFavorites') || 'Видалено з обраного') : (t('addedToFavorites') || 'Додано до обраного'));
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#104c9a] hover:text-[#ff7400] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={favoriteIds.includes(item.id) ? '#ff7400' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[#ff7400] text-xs mb-1.5">
                  <span>★ {item.rating}</span>
                  <span className="text-gray-400 text-[11px]">({item.reviewsCount})</span>
                </div>

                <Link 
                  href={`/product/${item.id}`} 
                  className="text-xs font-bold text-[#104c9a] leading-snug line-clamp-2 mb-2 group-hover:text-[#ff7400] transition-colors"
                >
                  {locale === 'ua' ? item.name : item.nameEn}
                </Link>

                <div className="flex items-baseline gap-2 mt-auto mb-3">
                  <span className="text-base font-bold font-dm text-[#104c9a]">{item.price} ₴</span>
                  <span className="text-xs text-gray-400 line-through">{item.oldPrice} ₴</span>
                </div>

                <button 
                  onClick={() => {
                    dispatch(addToCart({
                      id: item.id,
                      art: item.art,
                      name: item.name,
                      price: item.price,
                      image: item.imageUrl,
                      quantity: 1,
                      size: 'M',
                    }));
                    showToast(t('addedToCartToast') || 'Товар додано до кошика!');
                  }}
                  className="w-full bg-[#104c9a] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"
                >
                  <SmallCartIcon className="w-4 h-4 text-white" />
                  <span>{t('addToCart') || 'В кошик'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
