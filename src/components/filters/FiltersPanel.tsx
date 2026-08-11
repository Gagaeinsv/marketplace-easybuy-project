'use client';

import React, { useState } from 'react';
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

const availableBrands = [
  'Nike',
  'Puma',
  'Zara',
  'Adidas',
  'A New Day',
  'Wild Fable',
  'Mango',
  'H&M',
  'Levi\'s',
];

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const availableColors = [
  { id: 'black', name: 'Чорний', hex: '#1E1E1E' },
  { id: 'white', name: 'Білий', hex: '#FFFFFF', border: true },
  { id: 'blue', name: 'Синій', hex: '#104C9A' },
  { id: 'red', name: 'Червоний', hex: '#E53E3E' },
  { id: 'beige', name: 'Бежевий', hex: '#E5D3B3' },
  { id: 'green', name: 'Зелений', hex: '#2F855A' },
  { id: 'grey', name: 'Сірий', hex: '#718096' },
];

const availableMaterials = [
  'Бавовна (Cotton)',
  'Шкіра (Leather)',
  'Вовна (Wool)',
  'Шовк (Silk)',
  'Синтетика (Polyester)',
];

interface FiltersPanelProps {
  onClose?: () => void;
}

export default function FiltersPanel({ onClose }: FiltersPanelProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const { t } = useLanguage();

  const [brandSearch, setBrandSearch] = useState('');

  const filteredBrandsList = availableBrands.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const val = parseInt(e.target.value) || 0;
    dispatch(setPriceRange({ ...filters.price, [type]: val }));
  };

  return (
    <aside className="w-full bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <h3 className="font-bold text-xl text-[#104c9a]">
          {t('filters') || 'Фільтри'}
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(resetFilters())}
            className="text-xs text-red-500 font-semibold hover:underline"
          >
            {t('reset') || 'Скинути'}
          </button>
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-gray-500 text-lg font-bold">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-3 pb-5 border-b border-gray-100">
        <h4 className="font-bold text-sm text-gray-800">{t('price') || 'Ціна (₴)'}</h4>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={filters.price.min}
            onChange={(e) => handlePriceChange(e, 'min')}
            placeholder="Від 0"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#104c9a] outline-none transition-colors"
          />
          <span className="text-gray-400 font-medium">-</span>
          <input
            type="number"
            value={filters.price.max}
            onChange={(e) => handlePriceChange(e, 'max')}
            placeholder="До 10000"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#104c9a] outline-none transition-colors"
          />
        </div>
      </div>

      {/* Discount / Sale Only Toggle */}
      <div className="pb-5 border-b border-gray-100">
        <label className="flex items-center justify-between cursor-pointer select-none">
          <span className="font-bold text-sm text-gray-800">{t('onlyDiscounts') || 'Тільки зі знижкою 🏷️'}</span>
          <input
            type="checkbox"
            checked={filters.onlyDiscount}
            onChange={() => dispatch(toggleOnlyDiscount())}
            className="w-5 h-5 accent-[#104c9a] rounded cursor-pointer"
          />
        </label>
      </div>

      {/* Brands Filter with Search */}
      <div className="flex flex-col gap-3 pb-5 border-b border-gray-100">
        <h4 className="font-bold text-sm text-gray-800">{t('brands') || 'Бренди'}</h4>
        <input
          type="text"
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
          placeholder={t('searchBrand') || 'Пошук бренду...'}
          className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-xs outline-none focus:border-[#104c9a]"
        />
        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
          {filteredBrandsList.map((brand) => {
            const isSelected = filters.brands.includes(brand);
            return (
              <label key={brand} className="flex items-center justify-between text-sm cursor-pointer hover:text-[#104c9a]">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => dispatch(toggleBrand(brand))}
                    className="w-4 h-4 accent-[#104c9a] rounded cursor-pointer"
                  />
                  <span className={isSelected ? 'font-semibold text-[#104c9a]' : 'text-gray-700'}>{brand}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Sizes Filter */}
      <div className="flex flex-col gap-3 pb-5 border-b border-gray-100">
        <h4 className="font-bold text-sm text-gray-800">{t('sizes') || 'Розміри'}</h4>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => dispatch(toggleSize(size))}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-[#104c9a] text-white border-[#104c9a] shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#104c9a]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Colors Swatches */}
      <div className="flex flex-col gap-3 pb-5 border-b border-gray-100">
        <h4 className="font-bold text-sm text-gray-800">{t('colors') || 'Колір'}</h4>
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
                {isSelected && (
                  <span className={color.id === 'white' ? 'text-black text-xs font-bold' : 'text-white text-xs font-bold'}>
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Materials Filter */}
      <div className="flex flex-col gap-3 pb-5 border-b border-gray-100">
        <h4 className="font-bold text-sm text-gray-800">{t('material') || 'Матеріал'}</h4>
        <div className="flex flex-col gap-2">
          {availableMaterials.map((mat) => {
            const isSelected = filters.materials.includes(mat);
            return (
              <label key={mat} className="flex items-center gap-2 text-sm cursor-pointer hover:text-[#104c9a]">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => dispatch(toggleMaterial(mat))}
                  className="w-4 h-4 accent-[#104c9a] rounded cursor-pointer"
                />
                <span className={isSelected ? 'font-semibold text-[#104c9a]' : 'text-gray-700'}>{mat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Star Rating Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="font-bold text-sm text-gray-800">{t('rating') || 'Рейтинг'}</h4>
        <div className="flex flex-col gap-2">
          {[4, 3].map((stars) => {
            const isSelected = filters.rating === stars;
            return (
              <button
                key={stars}
                onClick={() => dispatch(setRating(isSelected ? null : stars))}
                className={`flex items-center gap-2 text-sm py-1 px-2.5 rounded-lg border transition-colors ${
                  isSelected ? 'bg-amber-50 border-amber-300 font-semibold' : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <span className="text-amber-500 font-bold">★ {stars}.0+</span>
                <span className="text-xs text-gray-500">і вище</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Apply Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="mt-2 w-full py-3 bg-[#104c9a] text-white font-bold rounded-xl shadow-md"
        >
          {t('applyFilters') || 'Застосувати фільтри'}
        </button>
      )}
    </aside>
  );
}
