'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/store/products/operations';
import { setPriceRange, toggleBrand, toggleSize, toggleColor, setSort } from '@/store/filters/slice';
import ProductGrid from '@/components/product-grid/ProductGrid';
import FiltersPanel from '@/components/filters/FiltersPanel';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function CataloguePageWrapper() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading catalogue...</div>}>
      <CataloguePage />
    </Suspense>
  );
}

function CataloguePage() {
  const dispatch = useAppDispatch();
  const { items: products, isLoading, error } = useAppSelector((state) => state.products);
  const filters = useAppSelector((state) => state.filters);
  const { t } = useLanguage();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);

  // Load initial filters from URL on mount
  useEffect(() => {
    if (!isInitialized.current) {
      const min = parseInt(searchParams?.get('minPrice') || '0');
      const max = parseInt(searchParams?.get('maxPrice') || '10000');
      if (min !== 0 || max !== 10000) dispatch(setPriceRange({ min, max }));
      // other filters can be parsed similarly if needed
      isInitialized.current = true;
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    // Format filters for the API
    const queryParams: Record<string, string> = {};
    if (filters.brands.length) queryParams.brands = filters.brands.join(',');
    if (filters.sizes.length) queryParams.sizes = filters.sizes.join(',');
    if (filters.colors.length) queryParams.colors = filters.colors.join(',');
    if (filters.price.min > 0) queryParams.minPrice = filters.price.min.toString();
    if (filters.price.max < 10000) queryParams.maxPrice = filters.price.max.toString();
    if (filters.sort && filters.sort !== 'newest') queryParams.sort = filters.sort;

    dispatch(fetchProducts(queryParams));

    // Sync with URL if initialized
    if (isInitialized.current) {
      const params = new URLSearchParams(queryParams);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [dispatch, filters, pathname, router]);

  // Temporary client-side filtering since backend doesn't support query params yet
  const filteredProducts = products.filter(product => {
    // Price filter
    if (product.price < filters.price.min || product.price > filters.price.max) {
      return false;
    }
    // Brand filter (mocking brands randomly since backend doesn't have it yet, 
    // or we just skip brand filtering if the backend object doesn't have it)
    // Same for sizes and colors. For now, we only filter by price reliably, 
    // but let's implement the logic for future proofing.
    return true;
  });

  return (
    <div className="container px-4 mx-auto py-8 lg:py-12">
      <div className="mb-6 lg:mb-10 border-b border-dashed border-[#e2e2e2] pb-4 flex justify-between items-end">
        <h1 className="font-dm font-bold text-3xl lg:text-[40px] text-[#104c9a]">
          {t('catalogue') || 'Catalogue'}
        </h1>
        <button 
          onClick={() => setIsMobileFiltersOpen(true)}
          className="lg:hidden bg-brand-500 text-white px-4 py-2 rounded-md font-bold text-sm"
        >
          Filters
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6 border border-red-200">
          <p>Failed to load products: {error}</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filters Drawer Overlay */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobileFiltersOpen(false)} />
        )}

        {/* Filters Sidebar / Drawer */}
        <aside className={`
          fixed top-0 left-0 h-full w-4/5 max-w-[320px] bg-white z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out
          ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 lg:w-1/4 lg:bg-[#f7f7f7] lg:rounded-md lg:min-h-[500px] lg:z-auto
        `}>
          <FiltersPanel onClose={() => setIsMobileFiltersOpen(false)} />
        </aside>

        {/* Main Product Grid */}
        <main className="w-full lg:w-3/4">
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
        </main>
      </div>
    </div>
  );
}
