'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/product-card/ProductCard.jsx';
import LinkIcon from '@/components/icons/LinkIcon.jsx';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import axios from 'axios';

export default function RecommendationsNew() {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/goods`);
        const mappedProducts = response.data.map(item => ({
          id: item.id,
          image: item.mainImageUrl,
          title: item.name,
          price: item.price,
          oldPrice: item.discountValue ? item.price + item.discountValue : item.price,
          isOnSale: item.discountStatus !== 'NONE',
          brand: 'EasyBuy',
          colors: ['#252527', '#757c6a'], // placeholder
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="section-container">
      <div className="flex items-center justify-between mb-[24px] lg:mb-[72px] border-b border-dashed border-[#e2e2e2]">
        <h2 className="font-dm font-bold lg:text-[40px]">{t('recommendations')}</h2>
        <Link
          className='relative inline-flex items-center gap-2 text-[32px] leading-[48px] transition-colors duration-300 ease-in-out hover:text-brand-400
         after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-700
         after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100
         after:transition-transform after:duration-300 after:ease-in-out group'
          href="#"
        >
          <span className="hidden md:inline text-4xl text-[#104c9a]">{t('shopNow')}</span>
          <LinkIcon className="transition-transform duration-300 ease-in-out group-hover:translate-x-[5px] text-[#104c9a]" />
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">Loading products...</div>
      ) : (
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex flex-col bg-white border border-[#e2e2e2] relative rounded-[4px] overflow-hidden transition-all duration-300 hover:shadow-main"
            >
              <ProductCard {...product} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
