'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const initialUsers = [
  { id: 'USR-1', name: 'Олександр Гагарін', email: 'oleksandr@easybuy.ua', role: 'ADMIN', status: 'ACTIVE', regDate: '01.05.2026', orders: 15 },
  { id: 'USR-2', name: 'Андрій Коваль', email: 'urbanthreads@example.com', role: 'SELLER', status: 'ACTIVE', regDate: '29.08.2026', orders: 0 },
  { id: 'USR-3', name: 'Іван Петренко', email: 'ivan.p@example.com', role: 'BUYER', status: 'ACTIVE', regDate: '12.06.2026', orders: 6 },
  { id: 'USR-4', name: 'Марія Сидоренко', email: 'maria.s@example.com', role: 'BUYER', status: 'ACTIVE', regDate: '18.07.2026', orders: 3 },
  { id: 'USR-5', name: 'Спамер Невідомий', email: 'spammer99@junkmail.com', role: 'BUYER', status: 'BANNED', regDate: '05.08.2026', orders: 0 },
];

export default function UsersManagement() {
  const { locale } = useLanguage();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const toggleBan = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'BANNED' : 'ACTIVE' } : u));
  };

  const filtered = users.filter(u => {
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold font-dm text-[#104c9a]">
            {locale === 'ua' ? 'Керування користувачами та ролями' : 'Users & Roles Management'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {locale === 'ua' ? 'Перегляд облікових записів покупців, продавців та адміністраторів' : 'View customer, merchant and administrator accounts'}
          </p>
        </div>

        <div className="flex gap-2">
          {['ALL', 'BUYER', 'SELLER', 'ADMIN'].map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                roleFilter === r ? 'bg-[#104c9a] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {r === 'ALL' ? 'Всі' : r === 'BUYER' ? 'Покупці' : r === 'SELLER' ? 'Продавці' : 'Адміни'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Пошук за ім'ям або email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs outline-none text-gray-700 font-medium"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Користувач</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Роль</th>
                <th className="py-3 px-4">Дата реєстрації</th>
                <th className="py-3 px-4">Замовлень</th>
                <th className="py-3 px-4">Статус</th>
                <th className="py-3 px-4 text-right">Дія</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{u.name}</td>
                  <td className="py-3.5 px-4 text-gray-600 font-mono">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                      u.role === 'SELLER' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">{u.regDate}</td>
                  <td className="py-3.5 px-4 font-bold">{u.orders}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      u.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {u.status === 'ACTIVE' ? 'Активний' : 'Заблоковано'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {u.role !== 'ADMIN' && (
                      <button
                        onClick={() => toggleBan(u.id)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                          u.status === 'ACTIVE'
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white'
                        }`}
                      >
                        {u.status === 'ACTIVE' ? 'Заблокувати' : 'Розблокувати'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
