'use client';

import Image from 'next/image.js';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart } from '@/store/cart/slice';
import { toggleFavorite, selectFavoriteIds } from '@/store/favorites/slice';
import FavoriteBtn from '@/components/button/favorite-btn/FavoriteBtn.jsx';
import StarRating from '@/components/star-rating/StarRating.jsx';
import SmallCartIcon from '@/components/icons/SmallCartIcon.jsx';

import { useLanguage } from '@/context/LanguageContext';

export default function ProductCard({ id, isOnSale, image, title, brand, price, oldPrice, colors }) {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector(selectFavoriteIds);
  const isFavorite = favoriteIds.includes(id);
  const { t } = useLanguage();

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    if (id) dispatch(toggleFavorite(id));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(addToCart({
        id,
        art: id, // Mock SKU
        name: title,
        price,
        image,
        quantity: 1,
      }));
    }
  };

  return (
    <div className="flex flex-col h-full group relative">
      <Link href={id ? `/product/${id}` : '#'} className="absolute inset-0 z-0" />
      <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-[#e6e8eb] flex justify-center items-center overflow-hidden transition-all duration-300 pointer-events-none">
        {isOnSale && (
          <div className="text-white text-[10px] font-bold py-1 px-3 absolute top-3 left-3 bg-[#ff7400] rounded-[4px] md:text-sm md:top-4 md:left-4 z-10">
            {t('onSale')}
          </div>
        )}
        <button className="absolute top-3 right-3 md:top-4 md:right-4 z-20 transition-transform duration-300 hover:scale-110 active:scale-95 pointer-events-auto" onClick={handleToggleFavorite}>
          <FavoriteBtn isFavorite={isFavorite} />
        </button>
        <Image className="object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-110" src={image} alt={title} fill sizes="(max-width: 768px) 50vw, 25vw" />
      </div>
      <div className="flex flex-col flex-1 p-3 md:p-5 md:pb-6 z-10 pointer-events-none">
        <div className="flex gap-0.5 text-gray-400 mb-2 mt-1">
          <StarRating initialRating={4} activeColor="#104c9a" />
        </div>
        <p className="text-xs md:text-sm font-bold text-[#104c9a] mb-1 line-clamp-2 leading-tight pointer-events-auto"><Link href={id ? `/product/${id}` : '#'}>{title}</Link></p>
        <p className="text-[10px] md:text-xs text-[#6391c8] mb-3">{brand}</p>

        <div className="flex gap-x-2 mb-2">
          {colors?.map((color, idx) => (
            <span key={idx} className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] shadow-sm border border-black/10 rounded-sm" style={{ backgroundColor: color }}></span>
          ))}
        </div>

        <div className="mb-4 mt-auto flex flex-wrap items-baseline gap-x-2">
          <span className="font-dm font-bold text-[#104c9a] text-lg md:text-xl whitespace-nowrap">$ {price?.toFixed(2).replace('.', ',')}</span>
          {oldPrice && (
            <span className="line-through text-[#104c9a] opacity-70 text-xs md:text-sm whitespace-nowrap">{oldPrice?.toFixed(2).replace('.', ',')}</span>
          )}
        </div>
        <button onClick={handleAddToCart} className="bg-gradient-brand flex justify-center items-center py-2 md:py-3 w-full rounded-[4px] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer mt-auto pointer-events-auto z-20 relative">
          <SmallCartIcon />
          <p className="text-white text-xs md:text-sm font-bold ml-2">{t('addToCart')}</p>
        </button>
      </div>
    </div>
  );
}
