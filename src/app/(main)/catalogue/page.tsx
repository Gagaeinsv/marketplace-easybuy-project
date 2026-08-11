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
    <Suspense fallback={<div className="p-12 text-center text-[#104c9a] font-bold">Завантаження каталогу...</div>}>
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
    return 0;
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
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      {/* Top Filter Bar Strip */}
      <div className="bg-[#E9EEF4] border-b border-gray-200 py-3 mb-8">
        <div className="container mx-auto px-4 max-w-[1440px] flex flex-col gap-3">
          {/* Row 1: Breadcrumbs, Sort, and Subscribe */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Breadcrumbs - Default "Головна / Каталог" */}
            <nav className="flex items-center gap-2 text-xs text-gray-600 font-normal">
              <Link href="/" className="hover:text-[#104c9a]">
                {t('home') || 'Головна'}
              </Link>
              <span>/</span>
              <span className="font-semibold text-gray-800">{t('catalogue') || 'Каталог'}</span>
            </nav>

            {/* Right Controls: Sort & Subscribe */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
              {/* Sort Select */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 font-semibold">{t('sort') || 'Сортувати'}:</span>
                <select
                  value={filters.sort}
                  onChange={(e) => dispatch(setSort(e.target.value))}
                  className="bg-white border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-700 outline-none focus:border-[#104c9a] cursor-pointer shadow-sm"
                >
                  <option value="price_asc">{t('fromCheapToExpensive') || 'Від дешевих до дорогих'}</option>
                  <option value="price_desc">{t('fromExpensiveToCheap') || 'Від дорогих до дешевих'}</option>
                  <option value="popular">{t('byPopularity') || 'За популярністю'}</option>
                  <option value="newest">{t('byNovelty') || 'За новинками'}</option>
                </select>
              </div>

              {/* Subscribe your searches */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 font-medium hidden sm:inline">{t('subscribeSearches') || 'Підписатися на оновлення'}</span>
                <button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all border flex items-center gap-1.5 ${
                    isSubscribed
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#104c9a]'
                  }`}
                >
                  <span>{isSubscribed ? '✓ Ви підписані' : `🔔 ${t('subscribe') || 'Підписатися'}`}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Horizontal Filter Pills Bar */}
          <FilterPillsBar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-[1440px]">
        {/* Active Filter Tags Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
            <span className="text-xs font-bold text-gray-500 mr-1">{t('activeFilters') || 'Активні фільтри'}:</span>
            {filters.brands.map((b) => (
              <span
                key={b}
                onClick={() => dispatch(toggleBrand(b))}
                className="bg-gray-100 text-gray-800 border border-gray-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer hover:bg-gray-200"
              >
                {t('brand') || 'Бренд'}: {b} <span className="font-bold">✕</span>
              </span>
            ))}
            {filters.sizes.map((s) => (
              <span
                key={s}
                onClick={() => dispatch(toggleSize(s))}
                className="bg-gray-100 text-gray-800 border border-gray-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer hover:bg-gray-200"
              >
                {t('size') || 'Розмір'}: {s} <span className="font-bold">✕</span>
              </span>
            ))}
            {filters.colors.map((c) => (
              <span
                key={c}
                onClick={() => dispatch(toggleColor(c))}
                className="bg-gray-100 text-gray-800 border border-gray-300 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer hover:bg-gray-200"
              >
                {t('color') || 'Колір'}: {c} <span className="font-bold">✕</span>
              </span>
            ))}
            {filters.onlyDiscount && (
              <span
                onClick={() => dispatch(toggleOnlyDiscount())}
                className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer hover:bg-amber-100"
              >
                {t('discount') || 'Знижка'} 🏷️ <span className="font-bold">✕</span>
              </span>
            )}
            <button
              onClick={() => dispatch(resetFilters())}
              className="text-xs text-red-500 font-bold hover:underline ml-auto"
            >
              {t('resetAll') || 'Скинути все'}
            </button>
          </div>
        )}

        {/* 5-Column Product Grid */}
        <main className="w-full flex flex-col gap-8">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-200 text-sm">
              Помилка завантаження товарів: {error}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center border border-gray-200 shadow-sm flex flex-col items-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{t('noProductsFound') || 'Товарів не знайдено'}</h3>
              <p className="text-sm text-gray-500 mb-4">{t('tryResettingFilters') || 'Спробуйте змінити або скинути обрані фільтри'}</p>
              <button
                onClick={() => dispatch(resetFilters())}
                className="px-6 py-2.5 bg-[#104c9a] text-white font-bold rounded-xl text-xs hover:brightness-110 shadow-md"
              >
                {t('resetAll') || 'Скинути всі фільтри'}
              </button>
            </div>
          ) : (
            <>
              {/* Product Grid */}
              <ProductGrid products={filteredProducts} isLoading={isLoading} />

              {/* Centered Pagination < 1 2 3 4 5 > */}
              <div className="flex justify-center items-center gap-2 py-8">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-sm"
                >
                  ‹
                </button>
                {[1, 2, 3, 4, 5].map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all border ${
                      currentPage === pageNum
                        ? 'bg-white text-gray-900 border-gray-400 font-bold shadow-sm'
                        : 'bg-transparent text-gray-600 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 5))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-sm"
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
