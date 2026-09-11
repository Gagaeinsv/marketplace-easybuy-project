'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppDispatch } from '@/store/hooks';
import { logOut } from '@/store/auth/operations';

const initialManagers = [
  { id: '1', name: 'Олександр Смирнов', role: 'Керуючий магазином', email: 'alex.smirnov@easybuy.ua', phone: '+380 50 987 6543' },
  { id: '2', name: 'Анна Коваленко', role: 'Менеджер з замовлень', email: 'anna.k@easybuy.ua', phone: '+380 63 123 4567' },
  { id: '3', name: 'Сергій Бондар', role: 'Служба клієнтської підтримки', email: 'serhii.b@easybuy.ua', phone: '+380 97 333 2211' },
];

const Managers = () => {
  const { t, locale } = useLanguage();
  const dispatch = useAppDispatch();
  const [managers, setManagers] = useState(initialManagers);
  const [isAdding, setIsAdding] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [newManager, setNewManager] = useState({ name: '', role: 'Керуючий магазином', email: '', phone: '+380' });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newManager.name.trim() || !newManager.email.trim()) return;

    setManagers(prev => [...prev, { ...newManager, id: String(Date.now()) }]);
    setNewManager({ name: '', role: 'Керуючий магазином', email: '', phone: '+380' });
    setIsAdding(false);
    showToast(locale === 'ua' ? 'Менеджера успішно додано!' : 'Manager added successfully!');
  };

  const handleDelete = (id) => {
    setManagers(prev => prev.filter(m => m.id !== id));
    showToast(locale === 'ua' ? 'Менеджера видалено' : 'Manager removed');
  };

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
          {t('sellerManagers') || 'Менеджери та співробітники'}
        </h1>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 border border-blue-200 hover:bg-blue-50 text-xs font-bold text-[#104c9a] rounded-xl transition-all duration-150 cursor-pointer"
        >
          {t('logOut') || 'Вийти'}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        {/* Header and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900 text-sm">
            Команда магазину ({managers.length})
          </h3>
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="px-5 py-2.5 bg-[#ff7400] hover:brightness-110 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>+</span>
              <span>{locale === 'ua' ? 'Додати менеджера' : 'Add Manager'}</span>
            </button>
          )}
        </div>

        {/* Add Manager Form */}
        {isAdding && (
          <form onSubmit={handleAdd} className="mb-6 p-5 bg-gray-50 border border-gray-200 rounded-2xl flex flex-col gap-3">
            <h4 className="font-bold text-xs text-[#104c9a] uppercase tracking-wider">Новий співробітник</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <label className="flex flex-col gap-1 text-xs font-bold text-gray-700">
                ПІБ Співробітника *
                <input 
                  type="text" 
                  value={newManager.name}
                  onChange={e => setNewManager({ ...newManager, name: e.target.value })}
                  required
                  placeholder="Іваненко Петро"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs bg-white outline-none focus:border-[#104c9a]"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-bold text-gray-700">
                Роль / Посада
                <select 
                  value={newManager.role}
                  onChange={e => setNewManager({ ...newManager, role: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs bg-white outline-none focus:border-[#104c9a]"
                >
                  <option value="Керуючий магазином">Керуючий магазином</option>
                  <option value="Менеджер з замовлень">Менеджер з замовлень</option>
                  <option value="Служба клієнтської підтримки">Служба підтримки</option>
                  <option value="Контент-менеджер">Контент-менеджер</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-bold text-gray-700">
                Email *
                <input 
                  type="email" 
                  value={newManager.email}
                  onChange={e => setNewManager({ ...newManager, email: e.target.value })}
                  required
                  placeholder="manager@easybuy.ua"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs bg-white outline-none focus:border-[#104c9a]"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-bold text-gray-700">
                Телефон
                <input 
                  type="text" 
                  value={newManager.phone}
                  onChange={e => setNewManager({ ...newManager, phone: e.target.value })}
                  placeholder="+380..."
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-xs bg-white outline-none focus:border-[#104c9a]"
                />
              </label>
            </div>
            <div className="flex justify-end gap-2.5 mt-2">
              <button 
                type="button" 
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                {t('cancelBtn') || 'Скасувати'}
              </button>
              <button 
                type="submit" 
                className="px-5 py-2 bg-[#104c9a] hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                {t('saveBtn') || 'Зберегти'}
              </button>
            </div>
          </form>
        )}

        {/* Managers Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#104c9a] text-white">
                <th className="py-3.5 px-4 rounded-l-2xl font-bold">{locale === 'ua' ? 'Співробітник' : 'Name'}</th>
                <th className="py-3.5 px-4 font-bold">{locale === 'ua' ? 'Посада' : 'Role'}</th>
                <th className="py-3.5 px-4 font-bold">{locale === 'ua' ? 'Email' : 'Email'}</th>
                <th className="py-3.5 px-4 font-bold">{locale === 'ua' ? 'Телефон' : 'Phone'}</th>
                <th className="py-3.5 px-4 rounded-r-2xl font-bold text-right">{locale === 'ua' ? 'Дії' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {managers.map(manager => (
                <tr key={manager.id} className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-gray-900 text-xs uppercase">{manager.name}</td>
                  <td className="py-4 px-4">
                    <span className="bg-blue-50 text-[#104c9a] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {manager.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-600 text-xs font-mono">{manager.email}</td>
                  <td className="py-4 px-4 font-semibold text-gray-600 text-xs">{manager.phone || '-'}</td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={() => handleDelete(manager.id)}
                      className="px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      {locale === 'ua' ? 'Видалити' : 'Remove'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Managers;
