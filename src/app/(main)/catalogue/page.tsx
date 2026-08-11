'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/store/products/operations';
import {
  setPriceRange,
  toggleBrand,
  toggleSize,
  toggleColor,
  toggleMaterial,
  toggleOnlyDiscount,
  setRating,
  setSort,
  resetFilters,
} from '@/store/filters/slice';
import ProductGrid from '@/components/product-grid/ProductGrid';
import FilterPillsBar from '@/components/filters/FilterPillsBar';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function CataloguePageWrapper() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-[#104c9a] font-bold">Loading catalogue...</div>}>
      <CataloguePage />
    </Suspense>
  );
}

function CataloguePage() {
  const dispatch = useAppDispatch();
  const { items: products, isLoading, error } = useAppSelector((state) => state.products);
  const filters = useAppSelector((state) => state.filters);
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(false);

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
      isInitialized.current = true;
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    const queryParams: Record<string, string> = {};
    if (filters.brands.length) queryParams.brands = filters.brands.join(',');
    if (filters.sizes.length) queryParams.sizes = filters.sizes.join(',');
    if (filters.colors.length) queryParams.colors = filters.colors.join(',');
    if (filters.price.min > 0) queryParams.minPrice = filters.price.min.toString();
    if (filters.price.max < 10000) queryParams.maxPrice = filters.price.max.toString();
    if (filters.sort && filters.sort !== 'newest') queryParams.sort = filters.sort;

    dispatch(fetchProducts(queryParams));

    if (isInitialized.current) {
      const params = new URLSearchParams(queryParams);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [dispatch, filters, pathname, router]);

  // Client-side filtering logic
  let filteredProducts = products.filter((product) => {
    if (product.price < filters.price.min || product.price > filters.price.max) {
      return false;
    }
    if (filters.onlyDiscount && product.discountStatus !== 'ACTIVE' && !product.discountValue) {
      return false;
    }
    if (filters.rating && (product.rating || 5) < filters.rating) {
      return false;
    }
    return true;
  });

  // Client-side sorting logic
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sort === 'price_asc') return a.price - b.price;
    if (filters.sort === 'price_desc') return b.price - a.price;
    if (filters.sort === 'popular') return (b.rating || 0) - (a.rating || 0);
    return 0; // 'newest' default
  });

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.materials.length > 0 ||
    filters.onlyDiscount ||
    filters.rating !== null ||
    filters.price.min > 0 ||
    filters.price.max < 10000;

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Top Filter Bar Strip matching Figma Filters_1 frame */}
      <div className="bg-[#EEF2F6] border-b border-gray-200 py-4 mb-8">
        <div className="container mx-auto px-4 max-w-[1440px] flex flex-col gap-4">
          {/* Row 1: Breadcrumbs, Sort, and Subscribe */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-gray-600 font-medium">
              <Link href="/" className="hover:text-[#104c9a]">
                Clothes for Women
              </Link>
              <span>/</span>
              <span>Outerwear</span>
              <span>/</span>
              <span className="font-bold text-[#104c9a]">Jackets</span>
            </nav>

            {/* Right Controls: Sort & Subscribe */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              {/* Sort Select */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-600">Sort:</span>
                <select
                  value={filters.sort}
                  onChange={(e) => dispatch(setSort(e.target.value))}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none focus:border-[#104c9a] cursor-pointer shadow-sm"
                >
                  <option value="price_asc">from cheap to expensive</option>
                  <option value="price_desc">from expensive to cheap</option>
                  <option value="newest">newest</option>
                  <option value="popular">popular</option>
                </select>
              </div>

              {/* Subscribe your searches */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 font-medium hidden sm:inline">Subscribe your searches</span>
                <button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border shadow-sm flex items-center gap-1.5 ${
                    isSubscribed
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#104c9a]'
                  }`}
                >
                  <span>{isSubscribed ? '✓ Subscribed' : '🔔 Subscribe'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Horizontal Filter Pills */}
          <FilterPillsBar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-[1440px]">
        {/* Active Filter Tags Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 bg-[#f8f9fa] p-3.5 rounded-xl border border-gray-200">
            <span className="text-xs font-bold text-gray-500 mr-1">Active filters:</span>
            {filters.brands.map((b) => (
              <span
                key={b}
                onClick={() => dispatch(toggleBrand(b))}
                className="bg-white text-[#104c9a] border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-blue-50 shadow-sm"
              >
                Brand: {b} <span className="font-bold">✕</span>
              </span>
            ))}
            {filters.sizes.map((s) => (
              <span
                key={s}
                onClick={() => dispatch(toggleSize(s))}
                className="bg-white text-[#104c9a] border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-blue-50 shadow-sm"
              >
                Size: {s} <span className="font-bold">✕</span>
              </span>
            ))}
            {filters.colors.map((c) => (
              <span
                key={c}
                onClick={() => dispatch(toggleColor(c))}
                className="bg-white text-[#104c9a] border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-blue-50 shadow-sm"
              >
                Color: {c} <span className="font-bold">✕</span>
              </span>
            ))}
            {filters.onlyDiscount && (
              <span
                onClick={() => dispatch(toggleOnlyDiscount())}
                className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-amber-100 shadow-sm"
              >
                Discount 🏷️ <span className="font-bold">✕</span>
              </span>
            )}
            <button
              onClick={() => dispatch(resetFilters())}
              className="text-xs text-red-500 font-bold hover:underline ml-auto"
            >
              Reset all
            </button>
          </div>
        )}

        {/* 5-Column Product Grid Area (Figma Filters_1 frame layout) */}
        <main className="w-full flex flex-col gap-10">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-200 text-sm">
              Error loading products: {error}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center border border-gray-200 shadow-sm flex flex-col items-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-bold text-[#104c9a] mb-1">No products found</h3>
              <p className="text-sm text-gray-500 mb-4">Try resetting or adjusting your selected filters</p>
              <button
                onClick={() => dispatch(resetFilters())}
                className="px-6 py-2.5 bg-[#104c9a] text-white font-bold rounded-xl text-xs hover:brightness-110 shadow-md"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <>
              {/* Product Grid with 5 columns on desktop */}
              <div className="w-full">
                <ProductGrid products={filteredProducts} isLoading={isLoading} />
              </div>

              {/* Centered Pagination matching Figma < 1 2 3 4 5 > */}
              <div className="flex justify-center items-center gap-2 py-6">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  ‹
                </button>
                {[1, 2, 3, 4, 5].map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === pageNum
                        ? 'bg-blue-50 text-[#104c9a] border border-blue-200 font-extrabold shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 5))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  ›
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
