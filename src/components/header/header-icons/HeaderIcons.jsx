'use client';

import Link from 'next/link';
import LikeIcon from '@/components/icons/LikeIcon';
import TouchIcon from '@/components/icons/TouchIcon';
import CartIcon from '@/components/icons/CartIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { openCart, selectCartTotalItems } from '@/store/cart/slice';
import { openFavorites, selectFavoriteIds } from '@/store/favorites/slice';

const HeaderIcons = () => {
  const dispatch = useAppDispatch();
  const cartItemsCount = useAppSelector(selectCartTotalItems);
  const favoriteIds = useAppSelector(selectFavoriteIds);

  return (
    <ul className="flex items-center gap-5">
      <li className="hidden lg:flex relative">
        <button onClick={() => dispatch(openFavorites())} className="relative">
          <LikeIcon className="transition duration-200 group/icon hover:fill-white2 focus:fill-white2" />
          {favoriteIds.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#ff7400] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {favoriteIds.length}
            </span>
          )}
        </button>
      </li>
      <li className="hidden lg:flex">
        <Link href="#">
          <TouchIcon className="transition duration-200 group/icon hover:fill-white2 focus:fill-white2" />
        </Link>
      </li>
      <li className="relative">
        <button onClick={() => dispatch(openCart())} className="relative">
          <CartIcon className="transition duration-200 group/icon hover:fill-white2 focus:fill-white2" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#ff7400] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {cartItemsCount}
            </span>
          )}
        </button>
      </li>
    </ul>
  );
};

export default HeaderIcons;
