'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeCart, removeFromCart, updateQuantity, clearCart, selectCartItems, selectIsCartOpen, selectCartTotalPrice, selectCartTotalItems } from '@/store/cart/slice';
import { selectRecentlyViewed } from '@/store/recently-viewed/slice';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const RecentlyViewedCarousel = () => {
  const viewedItems = useAppSelector(selectRecentlyViewed);
  const { t } = useLanguage();

  if (viewedItems.length === 0) {
    return <div className="text-gray-400 text-sm">{t('noViewedProducts') || 'Немає переглянутих товарів'}</div>;
  }

  return (
    <>
      {viewedItems.map(item => (
        <div key={item.id} className="min-w-[120px] w-[120px] border border-gray-100 rounded-lg p-2 snap-start">
          <div className="relative w-full h-[100px] bg-[#f7f7f7] rounded mb-2">
            <Image src={item.mainImageUrl} alt={item.name} fill className="object-cover rounded mix-blend-multiply p-1" />
          </div>
          <Link href={`/product/${item.id}`} className="text-xs font-medium text-gray-800 line-clamp-2 hover:text-[#104c9a]">
            {item.name}
          </Link>
          <div className="text-[#104c9a] font-bold text-xs mt-1">₴{item.price.toFixed(0)}</div>
        </div>
      ))}
    </>
  );
};

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCartOpen);
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectCartTotalPrice);
  const totalItemsCount = useAppSelector(selectCartTotalItems);
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity flex items-center justify-center p-4"
        onClick={() => dispatch(closeCart())}
      >
        {/* Centered Modal Container */}
        <div 
          className="bg-white rounded-xl w-full max-w-[500px] max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden font-dm"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          {/* Header */}
          <div className="flex justify-center items-center p-5 border-b border-gray-100 relative">
            <h2 className="text-2xl font-bold font-dm text-[#104c9a]">{t('cartTitle') || 'Кошик'}</h2>
            <button 
              onClick={() => dispatch(closeCart())}
              className="absolute right-5 text-[#ff7400] hover:bg-orange-50 w-8 h-8 flex items-center justify-center rounded-full border border-[#ff7400] transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13"/></svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                <div className="relative w-[180px] h-[140px] mb-1">
                  <Image src="/images/empty-cart.svg" alt="Empty Cart" fill className="object-contain" priority />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{t('emptyCartTitle') || 'Ваш кошик порожній'}</h3>
                <p className="text-gray-500 text-sm max-w-[280px] leading-relaxed">{t('emptyCartDesc') || 'Схоже, ви ще не додали жодного товару до кошика'}</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {/* List Header */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-sm">{totalItemsCount} {totalItemsCount !== 1 ? t('itemsCount') : t('itemCount')}</span>
                  <button 
                    onClick={() => dispatch(clearCart())}
                    className="text-[#104c9a] hover:underline text-sm font-medium cursor-pointer"
                  >
                    {t('deleteAll') || 'Видалити все'}
                  </button>
                </div>

                {/* Items List */}
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3 border border-gray-200 rounded-lg p-3">
                      <div className="relative w-[80px] h-[80px] bg-[#f7f7f7] rounded flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover rounded mix-blend-multiply" />
                      </div>
                      
                      <div className="flex flex-col flex-1 justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <Link href={`/product/${item.id}`} onClick={() => dispatch(closeCart())} className="font-medium text-xs text-gray-800 leading-tight line-clamp-2 hover:text-[#104c9a]">
                            {item.name}
                          </Link>
                          <div className="flex flex-col gap-2 items-center">
                            <button 
                              onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }))}
                              className="text-[#ff7400] hover:text-orange-600 cursor-pointer"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-end mt-2">
                          <span className="font-bold text-[#104c9a] text-sm">₴{item.price.toFixed(0)}</span>
                          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden h-7">
                            <button 
                              className="px-2.5 hover:bg-gray-100 disabled:opacity-50 text-gray-600 cursor-pointer"
                              disabled={item.quantity <= 1}
                              onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, color: item.color, quantity: item.quantity - 1 }))}
                            >-</button>
                            <span className="px-1 text-xs font-medium w-4 text-center">{item.quantity}</span>
                            <button 
                              className="px-2.5 hover:bg-gray-100 text-gray-600 cursor-pointer"
                              onClick={() => dispatch(updateQuantity({ id: item.id, size: item.size, color: item.color, quantity: item.quantity + 1 }))}
                            >+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-6 pt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>{t('subtotal') || 'Вартість'}</span>
                    <span>₴{totalPrice.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <span>{t('discount') || 'Знижка'}</span>
                    <span>₴0</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#104c9a] text-base mb-6">
                    <span>{t('total') || 'Всього'}</span>
                    <span>₴{totalPrice.toFixed(0)}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => dispatch(closeCart())} 
                      className="flex-1 !py-2.5 !bg-white !text-[#104c9a] !border-[#104c9a] border whitespace-nowrap cursor-pointer"
                    >
                      {t('continueShopping') || 'Продовжити покупки'}
                    </Button>
                    <Button 
                      onClick={() => {
                        dispatch(closeCart());
                        import('@/store/checkout/slice').then(({ openCheckout }) => {
                          dispatch(openCheckout());
                        });
                      }}
                      className="flex-1 !py-2.5 !bg-[#ff7400] !text-white !border-none hover:!brightness-110 whitespace-nowrap cursor-pointer"
                    >
                      {t('placeOrder') || 'Оформити замовлення'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Products You Viewed Section */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {t('viewedProducts') || 'Переглянуті товари'}
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
                <RecentlyViewedCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
