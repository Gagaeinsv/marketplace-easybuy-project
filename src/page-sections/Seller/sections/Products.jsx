'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppDispatch } from '@/store/hooks';
import { logOut } from '@/store/auth/operations';
import Image from 'next/image';

const initialProducts = [
  { id: '1', name: 'Nike Air Max Plus Triple Black', code: '34432', category: 'Взуття', price: 82, stock: 10, options: '5 опцій', status: 'Available to order', mainImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80' },
  { id: '2', name: 'Nike Dunk Low Retro White Black', code: '8701', category: 'Взуття', price: 95, stock: 0, options: '-', status: 'Out of stock', mainImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format&fit=crop&q=80' },
  { id: '3', name: 'Jordan Light Grey Sneaker Classic', code: '664', category: 'Взуття', price: 110, stock: 8, options: '3 опції', status: 'Available to order', mainImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&auto=format&fit=crop&q=80' },
  { id: '4', name: 'Тепла зимова парка з хутряним капюшоном', code: '8900', category: 'Верхній одяг', price: 145, stock: 12, options: '4 опції', status: 'Available to order', mainImage: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=400&auto=format&fit=crop&q=80' },
  { id: '5', name: 'Сукня міді з натурального шовку', code: '04984', category: 'Сукні', price: 78, stock: 5, options: '2 опції', status: 'Available to order', mainImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&auto=format&fit=crop&q=80' },
];

const availableColors = [
  { hex: '#000000', name: 'Чорний' },
  { hex: '#ffffff', name: 'Білий' },
  { hex: '#757c6a', name: 'Хакі' },
  { hex: '#a6174a', name: 'Бордо' },
  { hex: '#104c9a', name: 'Синій' },
  { hex: '#ff7400', name: 'Оранжевий' },
];

const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '39', '40', '41', '42', '43', '44', '45'];

const Products = () => {
  const { t, locale } = useLanguage();
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState(initialProducts);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [visibility, setVisibility] = useState('Published');
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getStatusLabel = (status) => {
    if (status === 'Available to order') return t('availableToOrder') || 'Доступно до замовлення';
    if (status === 'Review') return t('review') || 'На модерації';
    if (status === 'Out of stock') return t('outOfStock') || 'Немає в наявності';
    return status;
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(products.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)));
    setSelectedIds([]);
    showToast(locale === 'ua' ? 'Обрані товари видалено' : 'Selected products deleted');
  };

  const handleEdit = (product) => {
    setCurrentProduct({
      ...product,
      colors: product.colors || ['#000000'],
      sizes: product.sizes || ['S', 'M'],
      season: product.season || 'Демісезон',
      material: product.material || '100% бавовна',
      description: product.description || 'Якісний оригінальний товар від перевіреного постачальника.',
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentProduct({
      id: String(Date.now()),
      name: '',
      code: String(Math.floor(10000 + Math.random() * 90000)),
      category: 'Одяг',
      price: '',
      stock: 10,
      options: '1 опція',
      status: 'Available to order',
      mainImage: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop&q=80',
      colors: ['#000000', '#ffffff'],
      sizes: ['S', 'M', 'L'],
      season: 'Всесезонний',
      material: 'Бавовна / Еластан',
      description: '',
    });
    setIsEditing(true);
  };

  const handleToggleColor = (hex) => {
    if (!currentProduct) return;
    const colors = currentProduct.colors || [];
    if (colors.includes(hex)) {
      setCurrentProduct({ ...currentProduct, colors: colors.filter(c => c !== hex) });
    } else {
      setCurrentProduct({ ...currentProduct, colors: [...colors, hex] });
    }
  };

  const handleToggleSize = (size) => {
    if (!currentProduct) return;
    const sizes = currentProduct.sizes || [];
    if (sizes.includes(size)) {
      setCurrentProduct({ ...currentProduct, sizes: sizes.filter(s => s !== size) });
    } else {
      setCurrentProduct({ ...currentProduct, sizes: [...sizes, size] });
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCurrentProduct({ ...currentProduct, mainImage: url });
      showToast(locale === 'ua' ? 'Фото успішно завантажено!' : 'Image uploaded!');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!currentProduct.name.trim()) return;

    setProducts(prev => {
      const exists = prev.some(p => p.id === currentProduct.id);
      if (exists) {
        return prev.map(p => p.id === currentProduct.id ? currentProduct : p);
      } else {
        return [currentProduct, ...prev];
      }
    });
    setIsEditing(false);
    setCurrentProduct(null);
    showToast(locale === 'ua' ? 'Товар успішно збережено!' : 'Product saved successfully!');
  };

  // Filtered Products
  const displayedProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchFilter.toLowerCase()) || p.code.includes(searchFilter);
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#104c9a] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/20">
          <span className="text-lg">✓</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* EDIT / ADD PRODUCT VIEW */}
      {isEditing && currentProduct ? (
        <form onSubmit={handleSave} className="flex flex-col gap-6 animate-fadeIn pb-12">
          {/* Top Header Bar */}
          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 rounded-xl transition-all duration-150 cursor-pointer"
            >
              ← {t('back') || 'Назад'}
            </button>
            
            <h1 className="text-xl font-extrabold font-dm text-[#104c9a] uppercase tracking-wider text-center">
              {currentProduct.name ? (t('update') || 'Редагування товару') : (t('addProduct') || 'Додавання товару')}
            </h1>
            
            <button 
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 border border-blue-200 hover:bg-blue-50 text-xs font-bold text-[#104c9a] rounded-xl transition-all duration-150"
            >
              {t('logOut') || 'Вийти'}
            </button>
          </div>

          {/* Edit Action Buttons */}
          <div className="flex justify-between items-center px-1">
            <div className="flex gap-2.5">
              <button 
                type="button"
                onClick={() => {
                  setProducts(prev => prev.filter(p => p.id !== currentProduct.id));
                  setIsEditing(false);
                  showToast(locale === 'ua' ? 'Товар видалено' : 'Product deleted');
                }}
                className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                {t('delete') || 'Видалити'}
              </button>
              
              <button 
                type="button"
                onClick={() => {
                  setCurrentProduct({...currentProduct, status: 'Out of stock'});
                  showToast(locale === 'ua' ? 'Товар деактивовано' : 'Product deactivated');
                }}
                className="px-4 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                {t('deactivate') || 'Деактивувати'}
              </button>
            </div>

            <button 
              type="submit"
              className="px-6 py-2.5 bg-[#ff7400] hover:brightness-110 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              {t('update') || 'Зберегти зміни'}
            </button>
          </div>

          {/* Multi-column Add/Edit product layout exactly matching Figma */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl items-start">
            
            {/* Left Columns (takes 2/3 space) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Image Upload Area */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-sm font-bold text-[#104c9a] uppercase tracking-wider">
                  {t('imageUploadTitle') || 'Головне фото товару'}
                </h3>
                
                <label className="border-2 border-dashed border-gray-200 hover:border-[#104c9a] rounded-2xl min-h-[220px] flex flex-col items-center justify-center p-6 bg-gray-50/50 hover:bg-blue-50/20 transition-all duration-150 cursor-pointer relative overflow-hidden">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                  {currentProduct.mainImage ? (
                    <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-sm">
                      <Image src={currentProduct.mainImage} alt="Product Preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <>
                      <span className="text-4xl mb-2 text-[#104c9a]">📷</span>
                      <span className="text-sm font-bold text-gray-700">{t('imageUploadTip') || 'Перетягніть фото сюди або клікніть для вибору'}</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG до 5MB</span>
                    </>
                  )}
                </label>

                {/* Thumbnails row */}
                <div className="grid grid-cols-4 gap-3 mt-1">
                  <div className="relative border border-gray-200 rounded-xl h-20 bg-gray-100 overflow-hidden flex items-center justify-center">
                    {currentProduct.mainImage && <Image src={currentProduct.mainImage} alt="Thumb 1" fill className="object-cover" />}
                  </div>
                  <div className="border border-gray-200 rounded-xl h-20 bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400">Фото 2</div>
                  <div className="border border-gray-200 rounded-xl h-20 bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400">Фото 3</div>
                  
                  <label className="border-2 border-dashed border-gray-200 hover:border-[#104c9a] rounded-xl h-20 flex flex-col items-center justify-center text-xs font-bold text-gray-500 hover:text-[#104c9a] cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                    <span>+</span>
                    <span>{t('addProduct') || 'Додати'}</span>
                  </label>
                </div>
              </div>

              {/* General Information Details */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-sm font-bold text-[#104c9a] uppercase tracking-wider">
                  {t('generalInformation') || 'Загальна інформація'}
                </h3>
                
                <label className="flex flex-col gap-1 text-xs font-bold text-gray-700">
                  {t('productName') || 'Назва товару'} <span className="text-red-500">*</span>
                  <input 
                    type="text" 
                    value={currentProduct.name}
                    onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                    required
                    placeholder="Наприклад: Зимова куртка Oversize WarmCELL"
                    className="px-4 py-2.5 border border-gray-200 rounded-xl font-medium outline-none text-gray-800 focus:border-[#104c9a] text-sm"
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1 text-xs font-bold text-gray-700">
                    {t('productCode') || 'Артикул товару'} <span className="text-red-500">*</span>
                    <input 
                      type="text" 
                      value={currentProduct.code}
                      onChange={e => setCurrentProduct({...currentProduct, code: e.target.value})}
                      required
                      className="px-4 py-2.5 border border-gray-200 rounded-xl font-medium outline-none text-gray-800 focus:border-[#104c9a] text-sm font-mono"
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-xs font-bold text-gray-700">
                    {t('category') || 'Категорія'}
                    <select 
                      value={currentProduct.category}
                      onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}
                      className="px-4 py-2.5 border border-gray-200 rounded-xl font-medium outline-none text-gray-800 focus:border-[#104c9a] text-sm bg-white"
                    >
                      <option value="Взуття">Взуття (Shoes)</option>
                      <option value="Верхній одяг">Верхній одяг (Outerwear)</option>
                      <option value="Сукні">Сукні та блузи (Dresses)</option>
                      <option value="Штани">Штани та джинси (Pants)</option>
                      <option value="Аксесуари">Аксесуари (Accessories)</option>
                    </select>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="flex flex-col gap-1 text-xs font-bold text-gray-700">
                    {t('price') || 'Ціна (₴)'} <span className="text-red-500">*</span>
                    <input 
                      type="number" 
                      value={currentProduct.price}
                      onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                      required
                      placeholder="1200"
                      className="px-4 py-2.5 border border-gray-200 rounded-xl font-medium outline-none text-gray-800 focus:border-[#104c9a] text-sm"
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-xs font-bold text-gray-700">
                    {t('remainder') || 'Залишок на складі (шт)'}
                    <input 
                      type="number" 
                      value={currentProduct.stock}
                      onChange={e => setCurrentProduct({...currentProduct, stock: Number(e.target.value)})}
                      required
                      className="px-4 py-2.5 border border-gray-200 rounded-xl font-medium outline-none text-gray-800 focus:border-[#104c9a] text-sm"
                    />
                  </label>

                  <label className="flex flex-col gap-1 text-xs font-bold text-gray-700">
                    {t('options') || 'Опції'}
                    <input 
                      type="text" 
                      value={currentProduct.options}
                      onChange={e => setCurrentProduct({...currentProduct, options: e.target.value})}
                      placeholder="3 опції"
                      className="px-4 py-2.5 border border-gray-200 rounded-xl font-medium outline-none text-gray-800 focus:border-[#104c9a] text-sm"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-1 text-xs font-bold text-gray-700">
                  {t('description') || 'Опис товару'}
                  <textarea 
                    rows={4}
                    value={currentProduct.description}
                    onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                    placeholder="Детальний опис товару, переваг, фасону..."
                    className="px-4 py-2.5 border border-gray-200 rounded-xl font-medium outline-none text-gray-800 focus:border-[#104c9a] text-sm"
                  />
                </label>
              </div>

            </div>

            {/* Right Column (takes 1/3 space) */}
            <div className="flex flex-col gap-6">
              
              {/* Product Rating Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  {t('productRating') || 'Рейтинг товару'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#104c9a]">4,8</span>
                  <span className="text-sm text-gray-400 font-medium">/ 5.0</span>
                </div>
                <p className="text-[#ff7400] text-lg mt-1">★★★★★</p>
              </div>

              {/* Sales stats Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  {t('sellerGeneralOverview') || 'Загальний огляд'}
                </h4>
                <div className="flex justify-between text-xs font-semibold text-gray-600 border-b border-gray-50 pb-2">
                  <span>{t('initialQty') || 'Початкова кількість'}:</span>
                  <strong className="text-gray-900">{currentProduct.stock || 10} шт</strong>
                </div>
                <div className="flex justify-between text-xs font-semibold text-gray-600 border-b border-gray-50 pb-2">
                  <span>{t('soldQty') || 'Продано одиниць'}:</span>
                  <strong className="text-gray-900">14 шт</strong>
                </div>
                <div className="flex justify-between text-xs font-semibold text-gray-600">
                  <span>{t('stockAvailability') || 'Наявність на складі'}:</span>
                  <strong className="text-gray-900">{currentProduct.stock || 10} шт</strong>
                </div>
              </div>

              {/* Visibility Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {t('visibility') || 'Видимість товару'}
                </h4>
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name="visibility" 
                      checked={visibility === 'Published'} 
                      onChange={() => setVisibility('Published')} 
                      className="accent-[#104c9a]"
                    />
                    {t('published') || 'Опубліковано на вітрині'}
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name="visibility" 
                      checked={visibility === 'Draft'} 
                      onChange={() => setVisibility('Draft')} 
                      className="accent-[#104c9a]"
                    />
                    {t('draft') || 'Чернетка'}
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name="visibility" 
                      checked={visibility === 'Hidden'} 
                      onChange={() => setVisibility('Hidden')} 
                      className="accent-[#104c9a]"
                    />
                    {t('hidden') || 'Приховано від покупців'}
                  </label>
                </div>
              </div>

              {/* Variations / Options Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-4">
                <h4 className="text-xs font-bold text-[#104c9a] uppercase tracking-wider mb-1">
                  {t('variations') || 'Варіації та параметри'}
                </h4>

                {/* Color Selector */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-gray-600">{t('chooseColor') || 'Оберіть кольори'}:</span>
                  <div className="flex gap-2 flex-wrap">
                    {availableColors.map(color => {
                      const isChecked = (currentProduct.colors || []).includes(color.hex);
                      return (
                        <button 
                          key={color.hex} 
                          type="button"
                          onClick={() => handleToggleColor(color.hex)}
                          style={{ backgroundColor: color.hex }}
                          className={`w-7 h-7 rounded-full border border-gray-300 transition-all flex items-center justify-center ${
                            isChecked ? 'ring-2 ring-[#104c9a] ring-offset-2 scale-110 shadow-sm' : 'hover:scale-105'
                          }`}
                          title={color.name}
                        >
                          {isChecked && <span className={color.hex === '#ffffff' ? 'text-black text-xs font-bold' : 'text-white text-xs font-bold'}>✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-xs font-bold text-gray-600">{t('chooseSize') || 'Оберіть розміри'}:</span>
                  <div className="grid grid-cols-4 gap-2">
                    {availableSizes.map(size => {
                      const isChecked = (currentProduct.sizes || []).includes(size);
                      return (
                        <button 
                          key={size}
                          type="button"
                          onClick={() => handleToggleSize(size)}
                          className={`py-1.5 border rounded-lg text-xs font-bold transition-colors ${
                            isChecked 
                              ? 'border-[#104c9a] bg-blue-50 text-[#104c9a]' 
                              : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <label className="flex flex-col gap-1 text-xs font-bold text-gray-600 mt-2">
                  {t('season') || 'Сезон'}
                  <input 
                    type="text" 
                    value={currentProduct.season}
                    onChange={e => setCurrentProduct({...currentProduct, season: e.target.value})}
                    placeholder="Зима / Демісезон"
                    className="px-3 py-2 border border-gray-200 rounded-xl font-medium outline-none text-gray-800 text-xs focus:border-[#104c9a]"
                  />
                </label>

                <label className="flex flex-col gap-1 text-xs font-bold text-gray-600">
                  {t('material') || 'Матеріал'}
                  <input 
                    type="text" 
                    value={currentProduct.material}
                    onChange={e => setCurrentProduct({...currentProduct, material: e.target.value})}
                    placeholder="100% нейлон ripstop"
                    className="px-3 py-2 border border-gray-200 rounded-xl font-medium outline-none text-gray-800 text-xs focus:border-[#104c9a]"
                  />
                </label>
              </div>

            </div>

          </div>
        </form>
      ) : (
        /* PRODUCTS LIST TABLE VIEW */
        <div className="flex flex-col gap-6 animate-fadeIn">
          
          {/* Top Header Bar */}
          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">📦</span>
              <h1 className="text-xl font-extrabold font-dm text-[#104c9a] uppercase tracking-wider">
                {t('sellerProducts') || 'Товари продавця'}
              </h1>
            </div>
            
            <button 
              onClick={handleLogout}
              className="px-4 py-2 border border-blue-200 hover:bg-blue-50 text-xs font-bold text-[#104c9a] rounded-xl transition-all duration-150 cursor-pointer"
            >
              {t('logOut') || 'Вийти'}
            </button>
          </div>

          {/* Table search/filter bar */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 px-1">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  checked={selectedIds.length === products.length && products.length > 0}
                  className="rounded border-gray-300 accent-[#104c9a]"
                />
                {t('allProducts') || 'Всі товари'} ({products.length})
              </label>
              
              {selectedIds.length > 0 && (
                <button 
                  onClick={handleDeleteSelected}
                  className="text-red-500 hover:text-red-700 text-xs font-bold cursor-pointer underline"
                >
                  {t('deleteSelected') || 'Видалити обрані'} ({selectedIds.length})
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-2.5">
              <select 
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white font-semibold text-gray-600 outline-none shadow-sm focus:border-[#104c9a]"
              >
                <option value="All">{locale === 'ua' ? 'Всі категорії' : 'All Categories'}</option>
                <option value="Взуття">Взуття</option>
                <option value="Верхній одяг">Верхній одяг</option>
                <option value="Сукні">Сукні</option>
              </select>

              <input 
                type="text" 
                placeholder={t('searchPlaceholder') || 'Пошук товару або артикулу...'}
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none shadow-sm focus:border-[#104c9a] w-[180px] sm:w-[220px]"
              />
              
              <button 
                onClick={handleAddNew}
                className="px-5 py-2.5 bg-[#ff7400] hover:brightness-110 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>+</span>
                <span>{t('addProduct') || 'Додати товар'}</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#104c9a] text-white">
                  <th className="py-3.5 px-4 rounded-l-2xl font-bold"></th>
                  <th className="py-3.5 px-4 font-bold">{t('productName') || 'Назва товару'}</th>
                  <th className="py-3.5 px-4 font-bold">{t('productCode') || 'Артикул'}</th>
                  <th className="py-3.5 px-4 font-bold">{t('category') || 'Категорія'}</th>
                  <th className="py-3.5 px-4 font-bold">{t('price') || 'Ціна'}</th>
                  <th className="py-3.5 px-4 font-bold">{t('remainder') || 'Залишок'}</th>
                  <th className="py-3.5 px-4 font-bold">{t('options') || 'Опції'}</th>
                  <th className="py-3.5 px-4 rounded-r-2xl font-bold">{t('implementationStatus') || 'Статус'}</th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.map(product => {
                  const isSelected = selectedIds.includes(product.id);
                  return (
                    <tr 
                      key={product.id} 
                      className={`border-b border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/20' : ''}`}
                      onClick={() => handleEdit(product)}
                    >
                      <td className="py-4 px-4" onClick={e => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => handleSelectOne(product.id)}
                          className="rounded border-gray-300 accent-[#104c9a]"
                        />
                      </td>
                      <td className="py-4 px-4 font-bold text-gray-800 text-xs leading-snug">
                        <div className="flex items-center gap-3">
                          {product.mainImage && (
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                              <Image src={product.mainImage} alt={product.name} fill className="object-cover" />
                            </div>
                          )}
                          <span className="hover:text-[#104c9a]">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-gray-600 text-xs font-mono">{product.code}</td>
                      <td className="py-4 px-4 font-semibold text-gray-500 text-xs">{product.category}</td>
                      <td className="py-4 px-4 font-bold text-[#104c9a] text-xs">${product.price}</td>
                      <td className="py-4 px-4 font-bold text-gray-700 text-xs">{product.stock} шт</td>
                      <td className="py-4 px-4 font-semibold text-gray-500 text-xs">{product.options}</td>
                      <td className="py-4 px-4 font-bold text-xs">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] ${
                          product.status === 'Available to order' 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {getStatusLabel(product.status)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Empty filter result */}
            {displayedProducts.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-sm">
                Товарів не знайдено за вашим запитом.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
