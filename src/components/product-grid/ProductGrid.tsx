import React from 'react';
import ProductCard from '@/components/product-card/ProductCard';
import { ProductItem } from '@/store/products/operations';

interface ProductGridProps {
  products: ProductItem[];
  isLoading: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-xl font-medium text-[#104c9a]">Loading products...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-xl font-medium text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
      {products.map((item) => {
        // Map backend API data to the format ProductCard expects
        const productProps = {
          id: item.id,
          image: item.mainImageUrl || `https://placehold.co/600x800?text=${encodeURIComponent(item.name)}`,
          title: item.name,
          price: item.price,
          oldPrice: item.discountValue ? item.price + item.discountValue : item.price,
          isOnSale: item.discountStatus !== 'NONE',
          brand: 'EasyBuy', // Placeholder until backend provides brand
          colors: ['#252527', '#757c6a'], // Placeholder colors
        };

        return (
          <li
            key={item.id}
            className="flex flex-col bg-white border border-[#e2e2e2] relative rounded-[8px] overflow-hidden transition-all duration-300 hover:shadow-main"
          >
            <ProductCard {...productProps} />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductGrid;
