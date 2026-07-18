'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeFavorites, toggleFavorite, selectFavoriteIds, selectIsFavoritesOpen } from '@/store/favorites/slice';
import { useAppSelector as useProductsSelector } from '@/store/hooks';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FavoritesDrawer() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsFavoritesOpen);
  const favoriteIds = useAppSelector(selectFavoriteIds);
  // We need products to display favorites. For MVP we get them from the products slice 
  // (assuming they are loaded in catalog). In a real app we'd fetch them specifically or have a cache.
  const allProducts = useProductsSelector((state) => state.products.items);
  
  const favoriteProducts = allProducts.filter(p => favoriteIds.includes(p.id));

  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => dispatch(closeFavorites())}
      />
      <div className="fixed top-0 right-0 h-full w-[90%] sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold font-dm text-[#104c9a]">Улюблені товари</h2>
          <button 
            onClick={() => dispatch(closeFavorites())}
            className="text-gray-400 hover:text-black text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {favoriteProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-300">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <p className="text-xl font-bold text-gray-800">Список бажань порожній</p>
              <p className="text-gray-500 text-sm">Додайте сюди товари, щоб повернутися до них пізніше.</p>
              <Button onClick={() => dispatch(closeFavorites())} className="mt-4">
                Повернутись до каталогу
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {favoriteProducts.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                  <div className="relative w-24 h-24 bg-[#f7f7f7] rounded flex-shrink-0">
                    <Image src={item.mainImageUrl || "https://placehold.co/600x800"} alt={item.name} fill sizes="80px" className="object-cover p-2 mix-blend-multiply" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <Link href={`/product/${item.id}`} onClick={() => dispatch(closeFavorites())} className="font-bold text-[#104c9a] hover:underline line-clamp-1">
                        {item.name}
                      </Link>
                      <button 
                        onClick={() => dispatch(toggleFavorite(item.id))}
                        className="text-red-400 hover:text-red-600"
                        title="Прибрати з улюблених"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      </button>
                    </div>
                    
                    <div className="font-bold text-[#104c9a] mt-auto">$ {(item.price).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
