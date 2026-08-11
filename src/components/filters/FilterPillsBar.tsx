'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setPriceRange,
  toggleBrand,
  toggleSize,
  toggleColor,
  toggleMaterial,
  toggleOnlyDiscount,
  setRating,
  resetFilters,
} from '@/store/filters/slice';
import { useLanguage } from '@/context/LanguageContext';

const availableBrands = ['Nike', 'Puma', 'Zara', 'Adidas', 'A New Day', 'Wild Fable', 'Mango', 'H&M', 'Levi\'s'];
const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const availableColors = [
  { id: 'black', name: 'Black', hex: '#1E1E1E' },
  { id: 'white', name: 'White', hex: '#FFFFFF', border: true },
  { id: 'blue', name: 'Blue', hex: '#104C9A' },
  { id: 'red', name: 'Red', hex: '#E53E3E' },
  { id: 'beige', name: 'Beige', hex: '#E5D3B3' },
  { id: 'green', name: 'Green', hex: '#2F855A' },
  { id: 'grey', name: 'Grey', hex: '#718096' },
];
const availableMaterials = ['Cotton', 'Leather', 'Wool', 'Silk', 'Polyester'];

export default function FilterPillsBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const { t } = useLanguage();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [brandSearch, setBrandSearch] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const filteredBrands = availableBrands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const val = parseInt(e.target.value) || 0;
    dispatch(setPriceRange({ ...filters.price, [type]: val }));
  };

  return (
    <div className="relative w-full" ref={popoverRef}>
      {/* Horizontal Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        {/* All Filters Pill */}
        <button
          onClick={() => toggleDropdown('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${
            activeDropdown === 'all'
              ? 'bg-[#104c9a] text-white border-[#104c9a] shadow-sm'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#104c9a]'
          }`}
        >
          <span>⚙️ All Filters</span>
        </button>

        {/* Price Pill */}
        <button
          onClick={() => toggleDropdown('price')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 border transition-all ${
            filters.price.min > 0 || filters.price.max < 10000 || activeDropdown === 'price'
              ? 'bg-[#104c9a] text-white border-[#104c9a]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#104c9a]'
          }`}
        >
          <span>Price ▾</span>
        </button>

        {/* Brand Pill */}
        <button
          onClick={() => toggleDropdown('brand')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 border transition-all ${
            filters.brands.length > 0 || activeDropdown === 'brand'
              ? 'bg-[#104c9a] text-white border-[#104c9a]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#104c9a]'
          }`}
        >
          <span>Brand {filters.brands.length ? `(${filters.brands.length})` : ''} ▾</span>
        </button>

        {/* Size Pill */}
        <button
          onClick={() => toggleDropdown('size')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 border transition-all ${
            filters.sizes.length > 0 || activeDropdown === 'size'
              ? 'bg-[#104c9a] text-white border-[#104c9a]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#104c9a]'
          }`}
        >
          <span>Size {filters.sizes.length ? `(${filters.sizes.length})` : ''} ▾</span>
        </button>

        {/* Color Pill */}
        <button
          onClick={() => toggleDropdown('color')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 border transition-all ${
            filters.colors.length > 0 || activeDropdown === 'color'
              ? 'bg-[#104c9a] text-white border-[#104c9a]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#104c9a]'
          }`}
        >
          <span>Color {filters.colors.length ? `(${filters.colors.length})` : ''} ▾</span>
        </button>

        {/* Material Pill */}
        <button
          onClick={() => toggleDropdown('material')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 border transition-all ${
            filters.materials.length > 0 || activeDropdown === 'material'
              ? 'bg-[#104c9a] text-white border-[#104c9a]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#104c9a]'
          }`}
        >
          <span>Material {filters.materials.length ? `(${filters.materials.length})` : ''} ▾</span>
        </button>

        {/* Discount Pill */}
        <button
          onClick={() => dispatch(toggleOnlyDiscount())}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 border transition-all ${
            filters.onlyDiscount
              ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
              : 'bg-white text-gray-700 border-gray-300 hover:border-amber-500'
          }`}
        >
          <span>Discount 🏷️</span>
        </button>

        {/* Rating Pill */}
        <button
          onClick={() => toggleDropdown('rating')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 border transition-all ${
            filters.rating !== null || activeDropdown === 'rating'
              ? 'bg-[#104c9a] text-white border-[#104c9a]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#104c9a]'
          }`}
        >
          <span>Rating {filters.rating ? `(${filters.rating}+★)` : ''} ▾</span>
        </button>

        {/* Reset All */}
        {(filters.brands.length > 0 || filters.sizes.length > 0 || filters.colors.length > 0 || filters.materials.length > 0 || filters.onlyDiscount || filters.rating || filters.price.min > 0 || filters.price.max < 10000) && (
          <button
            onClick={() => dispatch(resetFilters())}
            className="text-xs text-red-500 font-bold hover:underline ml-2 whitespace-nowrap"
          >
            Reset
          </button>
        )}
      </div>

      {/* Floating Popovers */}
      {activeDropdown && (
        <div className="absolute left-0 top-12 z-50 bg-white rounded-2xl shadow-xl border border-gray-200 p-5 min-w-[260px] max-w-[340px] animate-fadeIn">
          {/* Price Popover */}
          {activeDropdown === 'price' && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm text-[#104c9a]">Price Range ($)</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={filters.price.min}
                  onChange={(e) => handlePriceChange(e, 'min')}
                  placeholder="Min"
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs outline-none focus:border-[#104c9a]"
                />
                <span>-</span>
                <input
                  type="number"
                  value={filters.price.max}
                  onChange={(e) => handlePriceChange(e, 'max')}
                  placeholder="Max"
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs outline-none focus:border-[#104c9a]"
                />
              </div>
            </div>
          )}

          {/* Brand Popover */}
          {activeDropdown === 'brand' && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm text-[#104c9a]">Filter by Brand</h4>
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Search brand..."
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs outline-none focus:border-[#104c9a]"
              />
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                {filteredBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-xs cursor-pointer hover:text-[#104c9a]">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => dispatch(toggleBrand(brand))}
                      className="w-4 h-4 accent-[#104c9a] rounded"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Size Popover */}
          {activeDropdown === 'size' && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm text-[#104c9a]">Filter by Size</h4>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => dispatch(toggleSize(size))}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                      filters.sizes.includes(size)
                        ? 'bg-[#104c9a] text-white border-[#104c9a]'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#104c9a]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Popover */}
          {activeDropdown === 'color' && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm text-[#104c9a]">Filter by Color</h4>
              <div className="flex flex-wrap gap-2.5">
                {availableColors.map((color) => {
                  const isSelected = filters.colors.includes(color.id);
                  return (
                    <button
                      key={color.id}
                      title={color.name}
                      onClick={() => dispatch(toggleColor(color.id))}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        color.border ? 'border border-gray-300' : ''
                      } ${isSelected ? 'ring-2 ring-offset-2 ring-[#104c9a]' : 'hover:scale-110'}`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && <span className={color.id === 'white' ? 'text-black text-xs font-bold' : 'text-white text-xs font-bold'}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Material Popover */}
          {activeDropdown === 'material' && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm text-[#104c9a]">Filter by Material</h4>
              <div className="flex flex-col gap-2">
                {availableMaterials.map((mat) => (
                  <label key={mat} className="flex items-center gap-2 text-xs cursor-pointer hover:text-[#104c9a]">
                    <input
                      type="checkbox"
                      checked={filters.materials.includes(mat)}
                      onChange={() => dispatch(toggleMaterial(mat))}
                      className="w-4 h-4 accent-[#104c9a] rounded"
                    />
                    <span>{mat}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Rating Popover */}
          {activeDropdown === 'rating' && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm text-[#104c9a]">Filter by Rating</h4>
              <div className="flex flex-col gap-2">
                {[4, 3].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => dispatch(setRating(filters.rating === stars ? null : stars))}
                    className={`flex items-center gap-2 text-xs py-1.5 px-3 rounded-lg border transition-colors ${
                      filters.rating === stars ? 'bg-amber-50 border-amber-300 font-bold' : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <span className="text-amber-500">★ {stars}.0+ stars</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All Filters Popover (Summary) */}
          {activeDropdown === 'all' && (
            <div className="flex flex-col gap-4 max-h-96 overflow-y-auto pr-1">
              <h4 className="font-bold text-base text-[#104c9a] border-b pb-2">All Filters</h4>
              
              <div>
                <p className="font-bold text-xs text-gray-700 mb-1">Price Range ($)</p>
                <div className="flex items-center gap-2">
                  <input type="number" value={filters.price.min} onChange={(e) => handlePriceChange(e, 'min')} className="w-full border rounded px-2 py-1 text-xs" placeholder="Min" />
                  <span>-</span>
                  <input type="number" value={filters.price.max} onChange={(e) => handlePriceChange(e, 'max')} className="w-full border rounded px-2 py-1 text-xs" placeholder="Max" />
                </div>
              </div>

              <div>
                <p className="font-bold text-xs text-gray-700 mb-1">Brands</p>
                <div className="flex flex-wrap gap-1">
                  {availableBrands.map((b) => (
                    <button
                      key={b}
                      onClick={() => dispatch(toggleBrand(b))}
                      className={`px-2 py-0.5 text-xs rounded border ${filters.brands.includes(b) ? 'bg-[#104c9a] text-white' : 'bg-gray-50'}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t flex justify-between">
                <button onClick={() => dispatch(resetFilters())} className="text-xs text-red-500 font-bold hover:underline">Reset All</button>
                <button onClick={() => setActiveDropdown(null)} className="px-4 py-1.5 bg-[#104c9a] text-white font-bold rounded-lg text-xs">Apply</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
