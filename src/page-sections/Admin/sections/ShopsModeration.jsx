'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Modal from '@/components/modal/Modal';

const initialShops = [
  {
    id: 'SH-101',
    name: 'EasySport Gear',
    category: 'Спорт та відпочинок',
    owner: 'Олександр Г.',
    phone: '+380 50 123 4567',
    email: 'easysport@example.com',
    edrpou: '43920194',
    rating: 4.9,
    productsCount: 42,
    status: 'ACTIVE',
    date: '15.06.2026',
    description: 'Магазин спортивного інвентаря, термобілизни та аксесуарів для бігу.',
  },
  {
    id: 'SH-102',
    name: 'Nordic Style Kyiv',
    category: 'Одяг та взуття',
    owner: 'Світлана Бондар',
    phone: '+380 67 987 6543',
    email: 'nordic@example.com',
    edrpou: '38194021',
    rating: 4.8,
    productsCount: 18,
    status: 'ACTIVE',
    date: '20.07.2026',
    description: 'Оригінальний скандинавський мінімалістичний одяг для щоденного гардеробу.',
  },
  {
    id: 'SH-103',
    name: 'Vogue Boutique',
    category: 'Жіночий одяг',
    owner: 'Ірина Шевченко',
    phone: '+380 93 456 7890',
    email: 'vogue@example.com',
    edrpou: '40192837',
    rating: 4.7,
    productsCount: 29,
    status: 'ACTIVE',
    date: '02.08.2026',
    description: 'Ексклюзивний жіночий одяг від європейських дизайнерів.',
  },
  {
    id: 'SH-104',
    name: 'Urban Threads Studio',
    category: 'Одяг та взуття',
    owner: 'Андрій Коваль',
    phone: '+380 97 111 2233',
    email: 'urbanthreads@example.com',
    edrpou: '45129481',
    rating: 0,
    productsCount: 0,
    status: 'PENDING',
    date: '29.08.2026',
    description: 'Український бренд стрітвір одягу з натуральних тканин та власного виробництва.',
  },
  {
    id: 'SH-105',
    name: 'TechZone Ukraine',
    category: 'Електроніка',
    owner: 'Олена Мороз',
    phone: '+380 63 333 4455',
    email: 'techzone@example.com',
    edrpou: '41928374',
    rating: 0,
    productsCount: 0,
    status: 'PENDING',
    date: '28.08.2026',
    description: 'Гаджети, розумні годинники та аксесуари для смартфонів з офіційною гарантією.',
  },
  {
    id: 'SH-106',
    name: 'EcoCraft Ceramics',
    category: 'Дім та затишок',
    owner: 'Дмитро Мельник',
    phone: '+380 50 777 8899',
    email: 'ecocraft@example.com',
    edrpou: '39481726',
    rating: 0,
    productsCount: 0,
    status: 'PENDING',
    date: '27.08.2026',
    description: 'Авторський керамічний посуд ручної роботи з екологічно чистих матеріалів.',
  },
  {
    id: 'SH-107',
    name: 'Fake Brands Store',
    category: 'Аксесуари',
    owner: 'Невідомий Продавець',
    phone: '+380 99 000 1122',
    email: 'suspicious@example.com',
    edrpou: '00000000',
    rating: 2.1,
    productsCount: 5,
    status: 'BANNED',
    date: '10.08.2026',
    description: 'Порушення правил маркетплейсу: скарги на контрафактну продукцію.',
  },
];

export default function ShopsModeration() {
  const { locale } = useLanguage();
  const [shops, setShops] = useState(initialShops);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShop, setSelectedShop] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApprove = (id) => {
    setShops(shops.map(s => s.id === id ? { ...s, status: 'ACTIVE' } : s));
    setSelectedShop(null);
    showToast(locale === 'ua' ? 'Магазин успішно схвалено!' : 'Shop approved successfully!');
  };

  const handleReject = (id) => {
    setShops(shops.map(s => s.id === id ? { ...s, status: 'REJECTED' } : s));
    setSelectedShop(null);
    showToast(locale === 'ua' ? 'Заявку магазину відхилено' : 'Shop application rejected');
  };

  const handleBan = (id) => {
    setShops(shops.map(s => s.id === id ? { ...s, status: 'BANNED' } : s));
    setSelectedShop(null);
    showToast(locale === 'ua' ? 'Магазин заблоковано' : 'Shop has been banned');
  };

  const filteredShops = shops.filter(shop => {
    const matchStatus = filterStatus === 'ALL' || shop.status === filterStatus;
    const matchSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        shop.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        shop.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#104c9a] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/20">
          <span className="text-lg">✓</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold font-dm text-[#104c9a]">
            {locale === 'ua' ? 'Модерація магазинів продавців' : 'Shops Moderation & Verification'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {locale === 'ua' ? 'Перевірка реєстраційних даних, схвалення заявок та контроль якості продавців' : 'Review registrations, approve applications and manage sellers'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'ALL', label: 'Всі' },
            { id: 'PENDING', label: 'Очікують (3)' },
            { id: 'ACTIVE', label: 'Активні' },
            { id: 'BANNED', label: 'Заблоковані' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-[#104c9a] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Пошук за назвою магазину, власником або ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs outline-none text-gray-700 placeholder-gray-400 font-medium"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Магазин / Категорія</th>
                <th className="py-3 px-4">Власник / Контакти</th>
                <th className="py-3 px-4">ЄДРПОУ</th>
                <th className="py-3 px-4">Дата подачі</th>
                <th className="py-3 px-4">Статус</th>
                <th className="py-3 px-4 text-right">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredShops.map((shop) => (
                <tr key={shop.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-600">{shop.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{shop.name}</div>
                    <div className="text-[11px] text-gray-400">{shop.category}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-gray-800">{shop.owner}</div>
                    <div className="text-[11px] text-gray-400">{shop.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-600">{shop.edrpou}</td>
                  <td className="py-3.5 px-4 text-gray-500">{shop.date}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                      shop.status === 'ACTIVE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : shop.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800 animate-pulse'
                        : shop.status === 'BANNED'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {shop.status === 'ACTIVE' ? 'Активний' :
                       shop.status === 'PENDING' ? 'Очікує' :
                       shop.status === 'BANNED' ? 'Заблоковано' : 'Відхилено'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedShop(shop)}
                      className="bg-gray-100 hover:bg-[#104c9a] hover:text-white text-[#104c9a] font-bold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      Деталі
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shop Details & Moderation Modal */}
      <Modal isOpen={!!selectedShop} onClose={() => setSelectedShop(null)}>
        {selectedShop && (
          <div className="p-6 max-w-[500px] w-full flex flex-col gap-4 text-xs">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-gray-400">{selectedShop.id}</span>
                <h3 className="text-xl font-bold font-dm text-[#104c9a]">{selectedShop.name}</h3>
                <span className="text-[11px] text-gray-500 font-semibold">{selectedShop.category}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                selectedShop.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' :
                selectedShop.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {selectedShop.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-400">Власник</span>
                <span className="font-bold text-gray-800">{selectedShop.owner}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-400">ЄДРПОУ / ІПН</span>
                <span className="font-mono font-bold text-gray-800">{selectedShop.edrpou}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-400">Телефон</span>
                <span className="font-medium text-gray-800">{selectedShop.phone}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-400">Email</span>
                <span className="font-medium text-gray-800">{selectedShop.email}</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Опис магазину</span>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs leading-relaxed">
                {selectedShop.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2">
              {selectedShop.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => handleApprove(selectedShop.id)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    ✓ Схвалити магазин
                  </button>
                  <button
                    onClick={() => handleReject(selectedShop.id)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    ✕ Відхилити
                  </button>
                </>
              )}

              {selectedShop.status === 'ACTIVE' && (
                <button
                  onClick={() => handleBan(selectedShop.id)}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  ⚠️ Заблокувати магазин
                </button>
              )}

              {selectedShop.status === 'BANNED' && (
                <button
                  onClick={() => handleApprove(selectedShop.id)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Розблокувати магазин
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
