'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { mockCart } from '@/data/mockCart';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite, selectFavoriteIds } from '@/store/favorites/slice';

// Inline Icons for Cart
const TrashIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const CompareIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const DotsIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1"></circle>
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="12" cy="19" r="1"></circle>
  </svg>
);

const EmptyCartIllustration = () => (
  <div className="w-full flex flex-col items-center justify-center py-10">
    <div className="w-[320px] h-[320px] relative mb-2">
      <Image src="/images/empty-cart-new.svg" alt="Empty Cart" fill sizes="400px" className="object-contain" priority />
    </div>
  </div>
);

const Cart = () => {
  const { t } = useLanguage();
  const [cartItems, setCartItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector(selectFavoriteIds);

  useEffect(() => {
    setCartItems(mockCart);
    setSelectedIds(mockCart.map(item => item.id));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (!mounted) return null;

  const handleToggleCompare = (id) => {
    setCompareIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    setToastMessage('Compare list updated');
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === cartItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cartItems.map(item => item.id));
    }
  };

  const handleToggleItem = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleUpdateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const handleRemove = (id) => {
    setItemToDelete(id);
  };

  const confirmRemove = () => {
    if (itemToDelete) {
      setCartItems(prev => prev.filter(item => item.id !== itemToDelete));
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== itemToDelete));
      setItemToDelete(null);
    }
  };

  const cancelRemove = () => {
    setItemToDelete(null);
  };

  const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));
  const total = selectedItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const subtotal = total; 
  const discount = 0;

  if (cartItems.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center animate-fadeIn text-center">
        <EmptyCartIllustration />
        <h3 className="text-xl font-bold text-blue-900 mb-2">{t('emptyCartTitle')}</h3>
        <p className="text-gray-500 mb-8">{t('emptyCartDesc')}</p>
        <Link 
          href="/catalogue"
          className="w-full max-w-[320px] bg-gradient-to-b from-[#4b99ff] to-[#071739] text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 transition"
        >
          GO TO SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col relative animate-fadeIn pb-[180px] md:pb-0">
      
      <div className="flex items-center gap-3 mb-6">
        <div 
          onClick={handleToggleSelectAll}
          className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer border ${selectedIds.length === cartItems.length ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}
        >
          {selectedIds.length === cartItems.length && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </div>
        <span className="font-bold text-blue-900">{t('allItems')}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full items-start">
        
        <div className="flex flex-col gap-4 w-full md:w-[65%]">
          {cartItems.map(item => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <div 
                key={item.id} 
                className={`flex gap-4 p-4 border rounded-xl shadow-sm transition-all duration-200 ${isSelected ? 'bg-blue-50/50 border-blue-400 shadow-md' : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'}`}
              >
                <div className="pt-2">
                  <div 
                    onClick={() => handleToggleItem(item.id)}
                    className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer border transition-colors ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}
                  >
                    {isSelected && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                </div>

                <div className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <Image src={item.image} alt={item.name} fill sizes="100px" className="object-cover" />
                </div>

                <div className="flex flex-col flex-grow justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-blue-500 font-medium text-sm md:text-base line-clamp-3 leading-tight">
                      {item.name}
                    </span>
                    
                    <div className="flex items-center gap-1 md:gap-3">
                      <button 
                        onClick={() => dispatch(toggleFavorite(item.id))} 
                        className={`p-1 transition-colors ${favoriteIds.includes(item.id) ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'}`}
                      >
                        <HeartIcon className={`w-5 h-5 ${favoriteIds.includes(item.id) ? 'fill-orange-500' : ''}`} />
                      </button>
                      <button 
                        onClick={() => handleToggleCompare(item.id)} 
                        className={`p-1 transition-colors ${compareIds.includes(item.id) ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}
                      >
                        <CompareIcon className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleRemove(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center border border-gray-300 rounded-full bg-white">
                      <button 
                        onClick={() => handleUpdateQty(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-900 transition font-bold"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-gray-700">{item.qty}</span>
                      <button 
                        onClick={() => handleUpdateQty(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-900 transition font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-blue-900 text-lg">US ${item.price}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Summary Card */}
        <div className="w-full md:sticky md:top-[120px] md:w-[35%] z-20">
          <div className="bg-white border md:border border-gray-200 shadow-sm md:rounded-xl p-6 rounded-xl mt-4 md:mt-0">
            <h3 className="text-xl font-bold text-blue-900 text-center mb-6">{t('summary')}</h3>
            
            <div className="hidden md:flex flex-col gap-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-blue-500">{t('subtotal')}</span>
                <span className="font-semibold text-blue-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-500">{t('discount')}</span>
                <span className="font-semibold text-blue-900">${discount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-blue-900">{t('total')}</span>
              <span className="font-bold text-blue-900 text-xl">${total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-gradient-to-b from-[#4b99ff] to-[#071739] text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 transition">
              {t('checkoutTitle')}
            </button>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={cancelRemove}>
          <div className="bg-white rounded-2xl w-full max-w-[360px] p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={cancelRemove} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h2 className="text-[16px] font-bold text-[#1e293b] mb-2 pr-6">{t('deleteItemTitle')}</h2>
            <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">{t('deleteItemDesc')}</p>
            <div className="flex flex-col gap-3">
              <button onClick={confirmRemove} className="w-full py-3 px-4 bg-gradient-to-b from-[#4b99ff] to-[#071739] text-white rounded-xl font-bold hover:brightness-110 shadow-md transition-all text-sm">
                {t('deleteItemYes')}
              </button>
              <button onClick={cancelRemove} className="w-full py-3 px-4 border border-gray-300 rounded-xl text-[#0f172a] font-bold hover:bg-gray-50 transition-colors text-sm">
                {t('deleteItemNo')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 bg-blue-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadeIn">
          {toastMessage}
        </div>
      )}

    </div>
  );
};

export default Cart;
