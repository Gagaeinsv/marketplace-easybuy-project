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
import FiltersPanel from '@/components/filters/FiltersPanel';
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
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      <div className="container mx-auto px-4 max-w-[1440px] pt-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Link href="/" className="hover:text-[#104c9a]">
            {t('home') || 'Головна'}
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#104c9a]">{t('catalogue') || 'Каталог'}</span>
        </nav>

        {/* Title and Top Controls */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#104c9a]">
              {t('catalogue') || 'Каталог товарів'}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Знайдено <span className="font-bold text-[#104c9a]">{filteredProducts.length}</span> товарів
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden bg-[#104c9a] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm"
            >
              <span>⚙️ Фільтри</span>
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-amber-400" />}
            </button>

            {/* Sorting Select */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-500 whitespace-nowrap hidden sm:inline">
                Сортувати:
              </label>
              <select
                value={filters.sort}
                onChange={(e) => dispatch(setSort(e.target.value))}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-[#104c9a] cursor-pointer"
              >
                <option value="newest">Новинки</option>
                <option value="popular">За популярністю</option>
                <option value="price_asc">Від дешевих до дорогих</option>
                <option value="price_desc">Від дорогих до дешевих</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs font-bold text-gray-500 mr-2">Активні фільтри:</span>
            {filters.brands.map((b) => (
              <span
                key={b}
                onClick={() => dispatch(toggleBrand(b))}
                className="bg-blue-50 text-[#104c9a] border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-blue-100"
              >
                Бренд: {b} <span className="font-bold">✕</span>
              </span>
            ))}
            {filters.sizes.map((s) => (
              <span
                key={s}
                onClick={() => dispatch(toggleSize(s))}
                className="bg-blue-50 text-[#104c9a] border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-blue-100"
              >
                Розмір: {s} <span className="font-bold">✕</span>
              </span>
            ))}
            {filters.colors.map((c) => (
              <span
                key={c}
                onClick={() => dispatch(toggleColor(c))}
                className="bg-blue-50 text-[#104c9a] border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-blue-100"
              >
                Колір: {c} <span className="font-bold">✕</span>
              </span>
            ))}
            {filters.onlyDiscount && (
              <span
                onClick={() => dispatch(toggleOnlyDiscount())}
                className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer hover:bg-amber-100"
              >
                Знижка 🏷️ <span className="font-bold">✕</span>
              </span>
            )}
            <button
              onClick={() => dispatch(resetFilters())}
              className="text-xs text-red-500 font-bold hover:underline ml-auto"
            >
              Скинути все
            </button>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-[300px] shrink-0 sticky top-28">
            <FiltersPanel />
          </aside>

          {/* Mobile Filters Drawer */}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex justify-end lg:hidden">
              <div className="w-[320px] bg-white h-full overflow-y-auto p-4 shadow-xl">
                <FiltersPanel onClose={() => setIsMobileFiltersOpen(false)} />
              </div>
            </div>
          )}

          {/* Product Grid Area */}
          <main className="flex-1 w-full">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 border border-red-200 text-sm">
                Помилка завантаження товарів: {error}
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-lg font-bold text-[#104c9a] mb-1">Товарів не знайдено</h3>
                <p className="text-sm text-gray-500 mb-4">Спробуйте змінити або скинути обрані фільтри</p>
                <button
                  onClick={() => dispatch(resetFilters())}
                  className="px-6 py-2.5 bg-[#104c9a] text-white font-bold rounded-xl text-sm hover:brightness-110"
                >
                  Скинути всі фільтри
                </button>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} isLoading={isLoading} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
