'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppDispatch } from '@/store/hooks';
import { logOut } from '@/store/auth/operations';

const initialPromotions = [
  { id: '1', name: 'Новорічні знижки 2026', code: 'NEWYEAR26', period: '09.12.25 - 07.01.26', value: '-10%', category: 'Взуття', status: 'Active', description: 'Святковий розпродаж зимової колекції' },
  { id: '2', name: 'Black Friday EasyBuy', code: 'BLACKFRIDAY', period: '20.11.25 - 30.11.25', value: '-20%', category: 'Одяг', status: 'Completed', description: 'Грандіозний розпродаж' },
  { id: '3', name: 'Весняний старт PROMO', code: 'SPRING26', period: '01.03.26 - 31.03.26', value: '-15%', category: 'Верхній одяг', status: 'Planned', description: 'Знижка на нові куртки та вітровки' },
  { id: '4', name: 'Безкоштовна доставка', code: 'FREESHIP', period: '01.01.26 - 31.12.26', value: '0 ₴', category: 'Всі категорії', status: 'Active', description: 'Безкоштовна доставка на замовлення від 1500 грн' },
  { id: '5', name: 'Великодній купон', code: 'EASTER10', period: '15.04.26 - 25.04.26', value: '-10%', category: 'Сукні', status: 'Planned', description: 'Знижка до свят' },
];

const Promotions = () => {
  const { t, locale } = useLanguage();
  const dispatch = useAppDispatch();
  const [promotions, setPromotions] = useState(initialPromotions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromoId, setEditingPromoId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const [formData, setFormData] = useState({
    type: 'Discount on product (%)',
    name: '',
    code: '',
    description: '',
    category: 'Взуття',
    value: '-10%',
    startDate: '',
    endDate: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getStatusLabel = (status) => {
    if (status === 'Active') return locale === 'ua' ? 'Активна' : 'Active';
    if (status === 'Planned') return locale === 'ua' ? 'Запланована' : 'Planned';
    if (status === 'Completed') return locale === 'ua' ? 'Завершена' : 'Completed';
    return status;
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleOpenCreate = () => {
    setEditingPromoId(null);
    setFormData({
      type: 'Discount on product (%)',
      name: '',
      code: '',
      description: '',
      category: 'Взуття',
      value: '-10%',
      startDate: '',
      endDate: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (promo) => {
    setEditingPromoId(promo.id);
    const dates = promo.period.split(' - ');
    setFormData({
      type: promo.value.includes('%') ? 'Discount on product (%)' : 'Free shipping',
      name: promo.name,
      code: promo.code || '',
      description: promo.description || '',
      category: promo.category,
      value: promo.value,
      startDate: dates[0] || '',
      endDate: dates[1] || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setPromotions(prev => prev.filter(p => p.id !== id));
    showToast(locale === 'ua' ? 'Акцію успішно видалено!' : 'Promotion deleted!');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const period = `${formData.startDate || '01.01.26'} - ${formData.endDate || '31.12.26'}`;

    if (editingPromoId) {
      setPromotions(prev => prev.map(p => p.id === editingPromoId ? {
        ...p,
        name: formData.name,
        code: formData.code,
        period,
        value: formData.value,
        category: formData.category,
        description: formData.description,
      } : p));
      showToast(locale === 'ua' ? 'Акцію оновлено!' : 'Promotion updated!');
    } else {
      setPromotions(prev => [
        {
          id: String(Date.now()),
          name: formData.name,
          code: formData.code || 'PROMO' + Math.floor(100 + Math.random() * 900),
          period,
          value: formData.value,
          category: formData.category,
          status: 'Active',
          description: formData.description
        },
        ...prev
      ]);
      showToast(locale === 'ua' ? 'Нову акцію успішно створено!' : 'New promotion created!');
    }

    setIsModalOpen(false);
  };

  const filteredPromotions = promotions.filter(promo => {
    const matchesStatus = filterStatus === 'All' || promo.status === filterStatus;
    const matchesSearch = promo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (promo.code && promo.code.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 animate-fadeIn font-dm">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#104c9a] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/20">
          <span className="text-lg">✓</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="w-[80px]" />
        <h1 className="text-xl font-extrabold text-[#104c9a] uppercase tracking-wider text-center">
          {t('sellerPromotions') || 'Акції та промокоди'}
        </h1>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 border border-blue-200 hover:bg-blue-50 text-xs font-bold text-[#104c9a] rounded-xl transition-all duration-150 cursor-pointer"
        >
          {t('logOut') || 'Вийти'}
        </button>
      </div>

      {/* Filter and Create buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 px-1">
        <div className="flex items-center gap-2.5 flex-1">
          <input 
            type="text" 
            placeholder={locale === 'ua' ? 'Пошук акції або промокоду...' : 'Search promotions...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="px-3.5 py-2 border border-gray-200 rounded-xl text-xs outline-none shadow-sm focus:border-[#104c9a] w-full max-w-[280px]"
          />
          <select 
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-xs bg-white font-semibold text-gray-700 outline-none shadow-sm cursor-pointer"
          >
            <option value="All">{locale === 'ua' ? 'Всі статуси' : 'All statuses'}</option>
            <option value="Active">{locale === 'ua' ? 'Активні' : 'Active'}</option>
            <option value="Planned">{locale === 'ua' ? 'Заплановані' : 'Planned'}</option>
            <option value="Completed">{locale === 'ua' ? 'Завершені' : 'Completed'}</option>
          </select>
        </div>

        <button 
          onClick={handleOpenCreate}
          className="px-5 py-2.5 bg-[#ff7400] hover:brightness-110 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span>+</span>
          <span>{t('createPromotion') || 'Створити акцію'}</span>
        </button>
      </div>

      {/* Promotions Table */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-[#104c9a] text-white">
              <th className="py-3.5 px-4 rounded-l-2xl font-bold">{locale === 'ua' ? 'Назва акції / Промокод' : 'Promotion Name'}</th>
              <th className="py-3.5 px-4 font-bold">{locale === 'ua' ? 'Період дії' : 'Period'}</th>
              <th className="py-3.5 px-4 font-bold">{locale === 'ua' ? 'Знижка / Бонус' : 'Discount'}</th>
              <th className="py-3.5 px-4 font-bold">{locale === 'ua' ? 'Категорія' : 'Category'}</th>
              <th className="py-3.5 px-4 font-bold">{locale === 'ua' ? 'Статус' : 'Status'}</th>
              <th className="py-3.5 px-4 rounded-r-2xl font-bold text-right">{locale === 'ua' ? 'Дії' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.map(promo => (
              <tr key={promo.id} className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-bold text-gray-900 text-xs">{promo.name}</div>
                  <div className="text-[11px] font-mono text-[#104c9a] font-bold mt-0.5">{promo.code}</div>
                </td>
                <td className="py-4 px-4 font-bold text-gray-600 text-xs">{promo.period}</td>
                <td className="py-4 px-4 font-extrabold text-[#ff7400] text-xs">{promo.value}</td>
                <td className="py-4 px-4 font-semibold text-gray-500 text-xs">{promo.category}</td>
                <td className="py-4 px-4 font-bold text-xs">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] ${
                    promo.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold' 
                      : promo.status === 'Planned'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getStatusLabel(promo.status)}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-xs font-bold">
                    <button 
                      onClick={() => handleOpenEdit(promo)}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-[#104c9a] hover:text-white text-gray-700 rounded-lg transition-colors cursor-pointer"
                    >
                      {locale === 'ua' ? 'Редагувати' : 'Edit'}
                    </button>
                    <button 
                      onClick={() => handleDelete(promo.id)}
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 rounded-lg transition-colors cursor-pointer"
                    >
                      {locale === 'ua' ? 'Видалити' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPromotions.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-xs font-semibold">
            {locale === 'ua' ? 'Акцій не знайдено за вашим запитом' : 'No promotions found'}
          </div>
        )}
      </div>

      {/* Create / Edit Promotion Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleUp flex flex-col gap-4 text-xs">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-bold font-dm text-[#104c9a] text-lg">
                {editingPromoId ? (locale === 'ua' ? 'Редагувати акцію' : 'Edit Promotion') : (locale === 'ua' ? 'Створити нову акцію' : 'Create Promotion')}
              </h3>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1 font-bold text-gray-700">
                {locale === 'ua' ? 'Назва акції' : 'Promotion Name'} *
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Наприклад: Знижка -15% на літню колекцію"
                  className="px-3.5 py-2 border border-gray-200 rounded-xl outline-none font-medium text-sm focus:border-[#104c9a]"
                />
              </label>

              <label className="flex flex-col gap-1 font-bold text-gray-700">
                {locale === 'ua' ? 'Промокод (якщо є)' : 'Promo Code'}
                <input 
                  type="text" 
                  value={formData.code}
                  onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="EASYBUY15"
                  className="px-3.5 py-2 border border-gray-200 rounded-xl outline-none font-mono text-sm uppercase focus:border-[#104c9a]"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1 font-bold text-gray-700">
                {locale === 'ua' ? 'Розмір знижки / Бонус' : 'Discount Value'} *
                <input 
                  type="text" 
                  value={formData.value}
                  onChange={e => setFormData({ ...formData, value: e.target.value })}
                  placeholder="-15% або 0 ₴"
                  className="px-3.5 py-2 border border-gray-200 rounded-xl outline-none font-medium text-sm focus:border-[#104c9a]"
                />
              </label>

              <label className="flex flex-col gap-1 font-bold text-gray-700">
                {locale === 'ua' ? 'Категорія товарів' : 'Category'}
                <select 
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="px-3.5 py-2 border border-gray-200 rounded-xl outline-none font-medium text-sm bg-white focus:border-[#104c9a]"
                >
                  <option value="Всі категорії">Всі категорії</option>
                  <option value="Взуття">Взуття</option>
                  <option value="Одяг">Одяг</option>
                  <option value="Верхній одяг">Верхній одяг</option>
                  <option value="Сукні">Сукні</option>
                  <option value="Аксесуари">Аксесуари</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1 font-bold text-gray-700">
                {locale === 'ua' ? 'Дата початку' : 'Start Date'}
                <input 
                  type="text" 
                  value={formData.startDate}
                  onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                  placeholder="01.09.2026"
                  className="px-3.5 py-2 border border-gray-200 rounded-xl outline-none font-medium text-sm focus:border-[#104c9a]"
                />
              </label>

              <label className="flex flex-col gap-1 font-bold text-gray-700">
                {locale === 'ua' ? 'Дата завершення' : 'End Date'}
                <input 
                  type="text" 
                  value={formData.endDate}
                  onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                  placeholder="30.09.2026"
                  className="px-3.5 py-2 border border-gray-200 rounded-xl outline-none font-medium text-sm focus:border-[#104c9a]"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1 font-bold text-gray-700">
              {locale === 'ua' ? 'Опис акції' : 'Description'}
              <textarea 
                rows={2}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Короткий опис умов акції для покупців..."
                className="px-3.5 py-2 border border-gray-200 rounded-xl outline-none font-medium text-sm focus:border-[#104c9a]"
              />
            </label>

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 mt-2">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                {locale === 'ua' ? 'Скасувати' : 'Cancel'}
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-[#104c9a] hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                {locale === 'ua' ? 'Зберегти акцію' : 'Save Promotion'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Promotions;
