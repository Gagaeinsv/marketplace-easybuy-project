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

export default function ProductCard({ id, isOnSale, image, title, brand, price, oldPrice }) {
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
        art: id,
        name: title,
        price,
        image,
        quantity: 1,
      }));
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-[16px] border border-[#E2E2E2] p-3 md:p-4 group relative shadow-sm hover:shadow-md transition-shadow">
      <Link href={id ? `/product/${id}` : '#'} className="absolute inset-0 z-0" />
      
      {/* Image Container (Figma Specs) */}
      <div className="relative w-full aspect-[4/5] bg-[#E2E4E8] rounded-[12px] flex justify-center items-center overflow-hidden transition-all duration-300 pointer-events-none">
        {isOnSale && (
          <div className="text-gray-800 text-[11px] font-semibold py-0.5 px-2.5 absolute top-2.5 left-2.5 bg-white border border-gray-200 rounded-full shadow-sm z-10">
            On Sale
          </div>
        )}
        <button 
          className="absolute top-2.5 right-2.5 z-20 transition-transform duration-300 hover:scale-110 active:scale-95 pointer-events-auto bg-white/80 p-1.5 rounded-full shadow-sm"
          onClick={handleToggleFavorite}
        >
          <FavoriteBtn isFavorite={isFavorite} />
        </button>
        {image ? (
          <Image className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" src={image} alt={title || 'Product'} fill sizes="(max-width: 768px) 50vw, 20vw" />
        ) : (
          <div className="text-gray-400 text-3xl">🖼️</div>
        )}
      </div>

      {/* Product Content (Figma Specs) */}
      <div className="flex flex-col flex-1 mt-3 z-10 pointer-events-none">
        {/* Star Rating */}
        <div className="flex gap-0.5 text-amber-400 mb-1.5">
          <StarRating initialRating={4} activeColor="#F59E0B" />
        </div>

        {/* Title */}
        <p className="text-xs md:text-sm text-gray-800 font-normal mb-1 line-clamp-2 leading-tight pointer-events-auto">
          <Link href={id ? `/product/${id}` : '#'} className="hover:text-[#104c9a]">
            {title || 'Title Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
          </Link>
        </p>

        {/* Subtitle / Metadata */}
        <p className="text-[11px] text-gray-400 mb-2">
          {brand || 'Brand, Size, Colour'}
        </p>

        {/* Price */}
        <div className="mb-3 mt-auto flex items-baseline gap-x-2">
          <span className="font-bold text-gray-900 text-sm md:text-base whitespace-nowrap">
            $ {price ? price.toFixed(0) : '30'}
          </span>
          {oldPrice && oldPrice > price && (
            <span className="line-through text-gray-400 text-xs whitespace-nowrap">
              $ {oldPrice.toFixed(0)}
            </span>
          )}
        </div>

        {/* Add to Cart Button (Figma Light Grey Button Specs) */}
        <button 
          onClick={handleAddToCart} 
          className="w-full bg-[#F1F3F5] hover:bg-[#E5E7EB] border border-[#D1D5DB] text-gray-700 text-xs font-semibold py-2 rounded-lg flex justify-center items-center gap-2 transition-colors cursor-pointer pointer-events-auto z-20 relative"
        >
          <SmallCartIcon className="w-3.5 h-3.5 text-gray-700" />
          <span>{t('addToCart') || 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
}
