'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

const mockGoods = [
  { id: '1', title: 'Худі чоловіче преміум', category: 'Одяг', shop: 'EasySport Gear', price: '1,899 ₴', status: 'APPROVED', image: 'https://placehold.co/100x100?text=Hoodie' },
  { id: '2', title: 'Смарт-годинник EasyWatch Pro', category: 'Електроніка', shop: 'TechZone Ukraine', price: '3,499 ₴', status: 'PENDING', image: 'https://placehold.co/100x100?text=Watch' },
  { id: '3', title: 'Кросівки бігові Air Light', category: 'Взуття', shop: 'EasySport Gear', price: '2,750 ₴', status: 'APPROVED', image: 'https://placehold.co/100x100?text=Shoes' },
  { id: '4', title: 'Керамічна чашка "Карпати"', category: 'Дім', shop: 'EcoCraft Ceramics', price: '450 ₴', status: 'PENDING', image: 'https://placehold.co/100x100?text=Cup' },
  { id: '5', title: 'Сонцезахисні окуляри Retro', category: 'Аксесуари', shop: 'Fake Brands Store', price: '250 ₴', status: 'BLOCKED', image: 'https://placehold.co/100x100?text=Glasses' },
];

export default function GoodsModeration() {
  const { locale } = useLanguage();
  const [goods, setGoods] = useState(mockGoods);
  const [filter, setFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStatusChange = (id, newStatus) => {
    setGoods(goods.map(g => g.id === id ? { ...g, status: newStatus } : g));
    showToast(locale === 'ua' ? 'Статус товару оновлено' : 'Product status updated');
  };

  const filtered = goods.filter(g => filter === 'ALL' || g.status === filter);

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
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
            {locale === 'ua' ? 'Модерація товарів' : 'Goods & Catalog Moderation'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {locale === 'ua' ? 'Контроль якості товарних карток, відповідності категоріям та цінам' : 'Verify product quality, categories and pricing compliance'}
          </p>
        </div>

        <div className="flex gap-2">
          {['ALL', 'PENDING', 'APPROVED', 'BLOCKED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === f ? 'bg-[#104c9a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'ALL' ? 'Всі' : f === 'PENDING' ? 'Очікують' : f === 'APPROVED' ? 'Схвалені' : 'Заблоковані'}
            </button>
          ))}
        </div>
      </div>

      {/* Goods Table */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
              <th className="py-3 px-4">Фото</th>
              <th className="py-3 px-4">Назва / Категорія</th>
              <th className="py-3 px-4">Магазин продавця</th>
              <th className="py-3 px-4">Ціна</th>
              <th className="py-3 px-4">Статус</th>
              <th className="py-3 px-4 text-right">Модерація</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(item => (
              <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden relative border border-gray-200">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-bold text-gray-900">{item.title}</div>
                  <div className="text-[11px] text-gray-400">Категорія: {item.category}</div>
                </td>
                <td className="py-3 px-4 font-medium text-gray-800">{item.shop}</td>
                <td className="py-3 px-4 font-bold text-gray-900">{item.price}</td>
                <td className="py-3 px-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                    item.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                    item.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {item.status === 'APPROVED' ? 'Опубліковано' : item.status === 'PENDING' ? 'На перевірці' : 'Приховано'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {item.status !== 'APPROVED' && (
                      <button
                        onClick={() => handleStatusChange(item.id, 'APPROVED')}
                        className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        ✓ Схвалити
                      </button>
                    )}
                    {item.status !== 'BLOCKED' && (
                      <button
                        onClick={() => handleStatusChange(item.id, 'BLOCKED')}
                        className="bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white font-bold px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        ✕ Заблокувати
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
