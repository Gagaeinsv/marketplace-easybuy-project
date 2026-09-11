'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function SystemSettings() {
  const { locale } = useLanguage();
  const [commission, setCommission] = useState('5.0');
  const [maintenance, setMaintenance] = useState(false);
  const [stripeStatus, setStripeStatus] = useState('CONNECTED');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast(locale === 'ua' ? 'Налаштування системи збережено!' : 'System settings saved!');
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn max-w-[800px]">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#104c9a] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/20">
          <span className="text-lg">✓</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold font-dm text-[#104c9a]">
          {locale === 'ua' ? 'Системні налаштування маркетплейсу' : 'Platform & System Settings'}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          {locale === 'ua' ? 'Конфігурація фінансових комісій, інтеграцій та технічних параметрів' : 'Configure financial fees, integrations and core parameters'}
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6 text-xs">
        {/* Backend status */}
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col gap-2">
          <span className="font-bold text-gray-800 text-sm">Інфраструктура бекенду</span>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Oracle Cloud Spring Boot API:</span>
            <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">http://89.168.115.138:8080 (Online)</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Stripe Billing & Payouts:</span>
            <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">{stripeStatus}</span>
          </div>
        </div>

        {/* Commission */}
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-gray-700">Базова комісія маркетплейсу з продажів (%)</label>
          <input
            type="number"
            step="0.1"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-mono w-48 outline-none focus:border-[#104c9a]"
          />
          <span className="text-[11px] text-gray-400">Стягується автоматично з продавців при кожному успішному замовленні.</span>
        </div>

        {/* Maintenance */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
          <div>
            <div className="font-bold text-gray-800">Режим технічного обслуговування (Maintenance Mode)</div>
            <div className="text-[11px] text-gray-400">Тимчасово блокує нові замовлення для проведення технічних робіт.</div>
          </div>
          <input
            type="checkbox"
            checked={maintenance}
            onChange={(e) => setMaintenance(e.target.checked)}
            className="w-5 h-5 accent-[#104c9a] cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="bg-[#104c9a] hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md w-fit cursor-pointer"
        >
          {locale === 'ua' ? 'Зберегти зміни' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
