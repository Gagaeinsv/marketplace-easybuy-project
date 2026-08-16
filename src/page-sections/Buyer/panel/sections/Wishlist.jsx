'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useAppSelector } from '@/store/hooks';
import { selectFavoriteIds } from '@/store/favorites/slice';
import { mockProducts } from '@/data/mockProducts';
import ProductCard from '@/components/product-card/ProductCard';
import ShareIcon from '@/components/icons/ShareIcon';
import Image from 'next/image';
import Link from 'next/link';

const EmptyWishlistIllustration = () => {
  const { t } = useLanguage();
  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      <div className="w-[320px] h-[320px] relative mb-4">
        <Image src="/images/empty-wishlist.svg" alt="Empty Wishlist" fill sizes="400px" className="object-contain" priority />
      </div>
      <h3 className="text-xl font-bold text-[#104c9a] mb-2">{t('wishlistEmptyTitle')}</h3>
      <p className="text-sm text-[#104c9a] opacity-70 mb-6 text-center max-w-sm">{t('wishlistEmptyDesc')}</p>
      <Link href="/catalogue">
        <button className="bg-gradient-to-b from-[#4b99ff] to-[#071739] text-white font-bold py-3 px-8 rounded-xl hover:brightness-110 shadow-md transition-all">
          {t('catalogueBtn')}
        </button>
      </Link>
    </div>
  );
};

const Wishlist = () => {
  const { t } = useLanguage();
  const favoriteIds = useAppSelector(selectFavoriteIds);
  
  const favoriteProducts = mockProducts.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#104c9a]">{t('wishlist') || 'Wishlist'}</h2>
        {favoriteProducts.length > 0 && (
          <button className="flex items-center gap-2 text-[#104c9a] font-bold hover:text-blue-700 transition-colors text-sm">
            <ShareIcon className="w-4 h-4" />
            {t('shareWishlist')}
          </button>
        )}
      </div>

      {favoriteProducts.length === 0 ? (
        <EmptyWishlistIllustration />
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 h-full">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
