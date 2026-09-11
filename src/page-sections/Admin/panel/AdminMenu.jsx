'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const menuItems = [
  { id: 'overview', labelUa: 'Огляд та аналітика', labelEn: 'Overview & Stats', icon: '📊' },
  { id: 'shops', labelUa: 'Модерація магазинів', labelEn: 'Shops Moderation', icon: '🏪', badge: 3 },
  { id: 'goods', labelUa: 'Модерація товарів', labelEn: 'Goods Moderation', icon: '📦', badge: 5 },
  { id: 'tickets', labelUa: 'Скарги та повернення', labelEn: 'Tickets & Refunds', icon: '🎫', badge: 2 },
  { id: 'users', labelUa: 'Користувачі', labelEn: 'Users & Roles', icon: '👥' },
  { id: 'settings', labelUa: 'Налаштування системи', labelEn: 'System Settings', icon: '⚙️' },
];

export default function AdminMenu({ activeSection, setActiveSection }) {
  const { locale } = useLanguage();

  return (
    <div className="flex flex-col h-full py-6 px-4 text-white">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white text-[#104c9a] rounded-xl flex items-center justify-center font-bold text-xl shadow-md">
            E
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight">EasyBuy</span>
            <span className="block text-[10px] font-bold text-orange-400 uppercase tracking-widest -mt-1">
              Admin Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Menu List */}
      <nav className="flex-1 space-y-1.5">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          const label = locale === 'ua' ? item.labelUa : item.labelEn;

          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                isActive
                  ? 'bg-white text-[#104c9a] shadow-md transform translate-x-1'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span>{label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-[#ff7400] text-white' : 'bg-white/20 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Navigation */}
      <div className="pt-6 border-t border-white/10 mt-auto flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span>🌐</span>
          <span>{locale === 'ua' ? 'На головну сайту' : 'Back to Storefront'}</span>
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <span>🏪</span>
          <span>{locale === 'ua' ? 'Кабінет продавця' : 'Seller Dashboard'}</span>
        </Link>
      </div>
    </div>
  );
}
