'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Overview({ setActiveSection }) {
  const { locale } = useLanguage();

  const stats = [
    { title: 'Загальний обіг (GMV)', val: '₴1,428,500', change: '+14.2%', icon: '💰', color: 'from-blue-600 to-blue-800' },
    { title: 'Активні магазини', val: '48', change: '+3 цього тижня', icon: '🏪', color: 'from-indigo-600 to-indigo-800' },
    { title: 'Замовлень за місяць', val: '1,284', change: '+8.7%', icon: '📦', color: 'from-sky-600 to-sky-800' },
    { title: 'Скарги / Повернення', val: '4 відкритих', change: 'Потребує уваги', icon: '🎫', color: 'from-orange-500 to-red-600' },
  ];

  const pendingApprovals = [
    { id: 'SH-104', name: 'Urban Threads Studio', category: 'Одяг та взуття', date: '29.08.2026', owner: 'Андрій Коваль', status: 'Очікує' },
    { id: 'SH-105', name: 'TechZone Ukraine', category: 'Електроніка', date: '28.08.2026', owner: 'Олена Мороз', status: 'Очікує' },
    { id: 'SH-106', name: 'EcoCraft Ceramics', category: 'Дім та затишок', date: '27.08.2026', owner: 'Дмитро Мельник', status: 'Очікує' },
  ];

  const recentTickets = [
    { id: 'TCK-881', client: 'Іван Петренко', issue: 'Запит на повернення #EB-849201', time: '15 хв тому', priority: 'Високий' },
    { id: 'TCK-880', client: 'Марія Сидоренко', issue: 'Невідповідність розміру #EB-739120', time: '1 год тому', priority: 'Звичайний' },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold font-dm text-[#104c9a]">
            {locale === 'ua' ? 'Панель керування маркетплейсом' : 'Marketplace Admin Overview'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {locale === 'ua' ? 'Огляд ключових метрик, модерація продавців та статус системи' : 'Key metrics overview, seller moderation and system status'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-xl text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Oracle API: Online</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-bold text-gray-500">{st.title}</span>
              <span className="text-2xl">{st.icon}</span>
            </div>
            <div>
              <div className="text-2xl font-bold font-dm text-gray-900 mb-1">{st.val}</div>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {st.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Two columns: Pending Shops & Recent Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Shops */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-base font-bold font-dm text-[#104c9a]">
                {locale === 'ua' ? 'Магазини, що очікують схвалення' : 'Pending Shop Applications'}
              </h2>
              <p className="text-xs text-gray-400">Нові заявки на реєстрацію продавців</p>
            </div>
            <button 
              onClick={() => setActiveSection('shops')}
              className="text-xs font-bold text-[#104c9a] hover:underline"
            >
              Всі заявки →
            </button>
          </div>

          <div className="space-y-3">
            {pendingApprovals.map((shop) => (
              <div key={shop.id} className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-gray-800">{shop.name}</div>
                  <div className="text-[11px] text-gray-400">{shop.category} • Власник: {shop.owner}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                    {shop.status}
                  </span>
                  <button 
                    onClick={() => setActiveSection('shops')}
                    className="text-xs font-bold text-white bg-[#104c9a] px-3 py-1.5 rounded-lg hover:bg-blue-800"
                  >
                    Перевірити
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-base font-bold font-dm text-[#104c9a]">
                {locale === 'ua' ? 'Останні звернення та повернення' : 'Recent Tickets & Disputes'}
              </h2>
              <p className="text-xs text-gray-400">Запити клієнтів, що потребують модерації</p>
            </div>
            <button 
              onClick={() => setActiveSection('tickets')}
              className="text-xs font-bold text-[#104c9a] hover:underline"
            >
              Всі тікети →
            </button>
          </div>

          <div className="space-y-3">
            {recentTickets.map((tck) => (
              <div key={tck.id} className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-gray-800">{tck.issue}</div>
                  <div className="text-[11px] text-gray-400">{tck.client} • {tck.time}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md">
                    {tck.priority}
                  </span>
                  <button 
                    onClick={() => setActiveSection('tickets')}
                    className="text-xs font-bold text-white bg-[#ff7400] px-3 py-1.5 rounded-lg hover:brightness-110"
                  >
                    Відкрити
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
