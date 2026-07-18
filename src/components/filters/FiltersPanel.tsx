'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setPriceRange,
  toggleBrand,
  toggleSize,
  toggleColor,
  resetFilters,
} from '@/store/filters/slice';
import { useLanguage } from '@/context/LanguageContext';

const mockBrands = ['EasyBuy', 'A New Day', 'Wild Fable', 'Nike', 'Zara'];
const mockSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const mockColors = [
  { name: 'Black', hex: '#252527' },
  { name: 'Khaki', hex: '#757c6a' },
  { name: 'Burgundy', hex: '#7a1f32' },
  { name: 'Navy', hex: '#066277' },
  { name: 'Grey', hex: '#494e62' },
  { name: 'White', hex: '#ffffff' },
];

interface FiltersPanelProps {
  onClose?: () => void;
}

export default function FiltersPanel({ onClose }: FiltersPanelProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const { t } = useLanguage();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value) || 0;
    dispatch(setPriceRange({ ...filters.price, [type]: value }));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-xl text-[#104c9a]">Filters</h3>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-black">
            ✕
          </button>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-gray-200 pb-4">
        <h4 className="font-bold mb-3">Price</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="w-full border rounded px-2 py-1 text-sm outline-none focus:border-brand-500"
            placeholder="Min"
            value={filters.price.min}
            onChange={(e) => handlePriceChange(e, 'min')}
          />
          <span>-</span>
          <input
            type="number"
            className="w-full border rounded px-2 py-1 text-sm outline-none focus:border-brand-500"
            placeholder="Max"
            value={filters.price.max}
            onChange={(e) => handlePriceChange(e, 'max')}
          />
        </div>
      </div>

      {/* Brands Filter */}
      <div className="border-b border-gray-200 pb-4">
        <h4 className="font-bold mb-3">Brands</h4>
        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
          {mockBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
                checked={filters.brands.includes(brand)}
                onChange={() => dispatch(toggleBrand(brand))}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes Filter */}
      <div className="border-b border-gray-200 pb-4">
        <h4 className="font-bold mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {mockSizes.map((size) => (
            <button
              key={size}
              onClick={() => dispatch(toggleSize(size))}
              className={`px-3 py-1 text-xs border rounded-sm transition-colors ${
                filters.sizes.includes(size)
                  ? 'bg-[#104c9a] text-white border-[#104c9a]'
                  : 'bg-white text-black border-gray-300 hover:border-gray-500'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors Filter */}
      <div className="border-b border-gray-200 pb-4">
        <h4 className="font-bold mb-3">Color</h4>
        <div className="flex flex-wrap gap-2">
          {mockColors.map((color) => (
            <button
              key={color.name}
              title={color.name}
              onClick={() => dispatch(toggleColor(color.name))}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                filters.colors.includes(color.name)
                  ? 'border-brand-500 scale-110 shadow-md'
                  : 'border-transparent hover:scale-110 shadow-sm border-gray-200'
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => dispatch(resetFilters())}
        className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-[#104c9a] font-bold rounded transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
}
