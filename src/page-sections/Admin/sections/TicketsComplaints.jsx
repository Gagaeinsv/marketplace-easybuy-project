'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Modal from '@/components/modal/Modal';

const initialTickets = [
  {
    id: 'TCK-881',
    user: 'Іван Петренко',
    email: 'ivan.p@example.com',
    orderId: '#EB-849201',
    subject: 'Запит на повернення коштів',
    reason: 'Товар не відповідає опису (розмір L завеликий)',
    shop: 'EasySport Gear',
    amount: '1,899 ₴',
    status: 'OPEN',
    date: '29.08.2026 14:20',
  },
  {
    id: 'TCK-880',
    user: 'Марія Сидоренко',
    email: 'maria.s@example.com',
    orderId: '#EB-739120',
    subject: 'Пошкоджена упаковка при доставці',
    reason: 'Пошкоджена картонна коробка, товар цілий, потрібна компенсація',
    shop: 'Nordic Style Kyiv',
    amount: '2,450 ₴',
    status: 'IN_PROGRESS',
    date: '28.08.2026 19:15',
  },
  {
    id: 'TCK-879',
    user: 'Олег Данилюк',
    email: 'oleg.d@example.com',
    orderId: '#EB-619284',
    subject: 'Скасування замовлення',
    reason: 'Покупець скасував замовлення до відправки, кошти повернуто',
    shop: 'TechZone Ukraine',
    amount: '3,499 ₴',
    status: 'RESOLVED',
    date: '26.08.2026 11:30',
  },
];

export default function TicketsComplaints() {
  const { locale } = useLanguage();
  const [tickets, setTickets] = useState(initialTickets);
  const [activeTicket, setActiveTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResolve = (id) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'RESOLVED' } : t));
    setActiveTicket(null);
    setReplyText('');
    showToast(locale === 'ua' ? 'Тікет успішно закрито / вирішено' : 'Ticket resolved');
  };

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
            {locale === 'ua' ? 'Центр скарг та повернень' : 'Tickets, Disputes & Refunds'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {locale === 'ua' ? 'Арбітраж суперечок між покупцями та продавцями, обробка заявок на повернення' : 'Manage disputes and customer refund requests'}
          </p>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
              <th className="py-3 px-4">ID Тікета</th>
              <th className="py-3 px-4">Покупець / Контакт</th>
              <th className="py-3 px-4">Замовлення / Сума</th>
              <th className="py-3 px-4">Магазин продавця</th>
              <th className="py-3 px-4">Тема звернення</th>
              <th className="py-3 px-4">Статус</th>
              <th className="py-3 px-4 text-right">Дія</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tickets.map(tck => (
              <tr key={tck.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-gray-700">{tck.id}</td>
                <td className="py-3.5 px-4">
                  <div className="font-bold text-gray-900">{tck.user}</div>
                  <div className="text-[11px] text-gray-400">{tck.email}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-mono font-bold text-blue-700">{tck.orderId}</div>
                  <div className="text-[11px] text-gray-500">{tck.amount}</div>
                </td>
                <td className="py-3.5 px-4 font-medium text-gray-800">{tck.shop}</td>
                <td className="py-3.5 px-4 text-gray-700 max-w-[200px] truncate">{tck.subject}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                    tck.status === 'OPEN' ? 'bg-rose-100 text-rose-800' :
                    tck.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {tck.status === 'OPEN' ? 'Новий' : tck.status === 'IN_PROGRESS' ? 'В роботі' : 'Вирішено'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => setActiveTicket(tck)}
                    className="bg-gray-100 hover:bg-[#ff7400] hover:text-white text-gray-800 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                  >
                    Розглянути
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ticket Details Modal */}
      <Modal isOpen={!!activeTicket} onClose={() => setActiveTicket(null)}>
        {activeTicket && (
          <div className="p-6 max-w-[520px] w-full flex flex-col gap-4 text-xs">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-mono text-gray-400">{activeTicket.id}</span>
                <h3 className="text-xl font-bold font-dm text-[#104c9a]">{activeTicket.subject}</h3>
                <span className="text-xs font-semibold text-gray-500">Замовлення: {activeTicket.orderId} ({activeTicket.amount})</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 flex flex-col gap-2">
              <div className="flex justify-between text-gray-600">
                <span><strong>Покупець:</strong> {activeTicket.user}</span>
                <span><strong>Магазин:</strong> {activeTicket.shop}</span>
              </div>
              <div>
                <strong className="block text-gray-700 mb-1">Опис проблеми від покупця:</strong>
                <p className="text-gray-800 bg-white p-2.5 rounded-lg border border-gray-200 text-xs">
                  {activeTicket.reason}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-bold text-gray-700">Рішення адміністратора / Відповідь клієнту</label>
              <textarea
                rows={3}
                placeholder="Введіть коментар арбітражу або інструкцію для повернення коштів..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 text-xs outline-none focus:border-[#104c9a]"
              />
            </div>

            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setActiveTicket(null)}
                className="flex-1 py-2.5 border border-gray-300 rounded-xl font-bold hover:bg-gray-100"
              >
                Закрити
              </button>
              <button
                type="button"
                onClick={() => handleResolve(activeTicket.id)}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors"
              >
                ✓ Схвалити компенсацію / Закрити
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
