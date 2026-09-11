'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppDispatch } from '@/store/hooks';
import { logOut } from '@/store/auth/operations';

const HomePanel = () => {
  const { t, locale } = useLanguage();
  const dispatch = useAppDispatch();
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  const handleLogout = () => {
    dispatch(logOut());
  };

  // Figma exact chart bar values
  const chartDays = [
    { day: '01 Nov', val: 7500, type: 'red' },
    { day: '02.11', val: 22000, type: 'green' },
    { day: '03.11', val: 13000, type: 'green' },
    { day: '04.11', val: 13000, type: 'green' },
    { day: '05.11', val: 17000, type: 'green' },
    { day: '06.11', val: 13000, type: 'green' },
    { day: '07.11', val: 7500, type: 'red' },
    { day: '08.11', val: 22000, type: 'green' },
    { day: '09.11', val: 7500, type: 'red' },
    { day: '10.11', val: 5000, type: 'red' },
    { day: '11.11', val: 7500, type: 'red' },
    { day: '12.11', val: 17000, type: 'green' },
    { day: '13.11', val: 5000, type: 'red' },
    { day: '14.11', val: 17000, type: 'green' },
    { day: '15.11', val: 5000, type: 'red' },
    { day: '16.11', val: 7500, type: 'red' },
    { day: '17.11', val: 5000, type: 'red' },
    { day: '18.11', val: 7500, type: 'red' },
    { day: '19.11', val: 22000, type: 'green' },
    { day: '20.11', val: 14500, type: 'green' },
    { day: '21.11', val: 15500, type: 'green' },
    { day: '22.11', val: 17000, type: 'green' },
    { day: '23.11', val: 19500, type: 'green' },
    { day: '24.11', val: 10000, type: 'green' },
    { day: '25.11', val: 17000, type: 'green' },
    { day: '26.11', val: 22000, type: 'green' },
    { day: '27.11', val: 11500, type: 'green' },
    { day: '28.11', val: 15500, type: 'green' },
    { day: '29.11', val: 17000, type: 'green' },
    { day: '30.11', val: 15500, type: 'green' },
    { day: '31.11', val: 17000, type: 'green' },
  ];

  return (
    <div className="animate-fadeIn flex flex-col gap-6 font-dm max-w-[1440px] mx-auto pb-12">
      {/* Top Header Bar matching Figma */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-[#104c9a]">
            {t('sellerHome') || 'Home panel'}
          </h1>
          <p className="text-lg font-bold text-gray-900 mt-1">
            {t('sellerGeneralOverview') || 'General overview'}
          </p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <button 
            onClick={handleLogout}
            className="px-6 py-2 border border-[#104c9a] hover:bg-blue-50 text-sm font-medium text-[#104c9a] rounded-lg transition-all cursor-pointer bg-white shadow-sm"
          >
            {t('logOut') || 'Log out'}
          </button>

          <select 
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700 outline-none font-medium shadow-sm cursor-pointer"
          >
            <option value="30">{locale === 'ua' ? 'Останні 30 днів' : 'Last 30 days'}</option>
            <option value="7">{locale === 'ua' ? 'Останні 7 днів' : 'Last 7 days'}</option>
            <option value="365">{locale === 'ua' ? 'За останній рік' : 'Last 12 months'}</option>
          </select>
        </div>
      </div>

      {/* 4 Top KPI Metric Cards matching Figma exactly */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Number of orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <h3 className="font-bold text-sm text-gray-900 text-center mb-4">
            {t('numberOfOrders') || 'Number of orders'}
          </h3>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">{t('statusCompleted') || 'Completed'}</span>
              <strong className="text-gray-900 text-sm font-bold">845</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">{t('statusInProcessing') || 'In progress'}</span>
              <strong className="text-gray-900 text-sm font-bold">478</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">{t('statusCancelled') || 'Cancelled'}</span>
              <strong className="text-gray-900 text-sm font-bold">34</strong>
            </div>
          </div>
        </div>

        {/* Card 2: Store rating */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-between text-center">
          <h3 className="font-bold text-sm text-gray-900 mb-2">
            {t('storeRating') || 'Store rating'}
          </h3>
          <div>
            <span className="text-4xl font-extrabold text-gray-900">4,7</span>
            <span className="text-xl text-gray-500 font-medium">/ 5</span>
          </div>
          <div className="text-yellow-400 text-xl tracking-wider mt-2">
            ★★★★★
          </div>
        </div>

        {/* Card 3: Views */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <h3 className="font-bold text-sm text-gray-900 text-center mb-4">
            {t('storeViews') || 'Views'}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="text-2xl font-extrabold text-gray-900 block">294</span>
              <span className="text-[11px] text-gray-500 font-medium leading-tight block mt-1">
                {t('storePageViews') || 'Store page views'}
              </span>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-gray-900 block">982</span>
              <span className="text-[11px] text-gray-500 font-medium leading-tight block mt-1">
                {t('productViews') || 'Product views'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Interaction */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <h3 className="font-bold text-sm text-gray-900 text-center mb-4">
            {t('interaction') || 'Interaction'}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="text-2xl font-extrabold text-gray-900 block">567</span>
              <span className="text-[11px] text-gray-500 font-medium leading-tight block mt-1">
                {t('addedToCart') || 'Items added to cart'}
              </span>
            </div>
            <div>
              <span className="text-2xl font-extrabold text-gray-900 block">845</span>
              <span className="text-[11px] text-gray-500 font-medium leading-tight block mt-1">
                {t('ordersPlaced') || 'Orders placed'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Chart & General Information Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart (3 cols) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-3 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-[#104c9a]">Income, UAH</span>
            <span className="text-sm font-semibold text-gray-800">2026</span>
          </div>

          {/* Chart Container */}
          <div className="relative h-64 flex items-end pt-4 pb-6 px-2 border-b border-l border-gray-800">
            {/* Y-axis labels */}
            <div className="absolute left-[-45px] top-0 bottom-6 flex flex-col justify-between text-[10px] text-[#104c9a] font-bold text-right pr-2">
              <span>25,000</span>
              <span>20,000</span>
              <span>15,000</span>
              <span>10,000</span>
              <span>5,000</span>
              <span>0</span>
            </div>

            {/* Bars */}
            <div className="flex-1 flex items-end justify-between gap-1 h-full pl-2">
              {chartDays.map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  <div 
                    style={{ height: `${(bar.val / 25000) * 100}%` }}
                    className={`w-full rounded-t transition-all cursor-pointer ${
                      bar.type === 'green' ? 'bg-[#7bc88f] hover:bg-emerald-600' : 'bg-[#e5908f] hover:bg-rose-500'
                    }`}
                  />
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-1 hidden group-hover:block bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap">
                    {bar.day}: {bar.val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} UAH
                  </span>
                </div>
              ))}
            </div>

            <span className="absolute right-[-30px] bottom-1 text-[11px] text-[#104c9a] font-bold">
              Day
            </span>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-[8px] text-gray-500 font-medium pt-2 pl-2">
            <span>01 Nov</span>
            <span>07.11</span>
            <span>14.11</span>
            <span>21.11</span>
            <span>28.11</span>
            <span>31.11</span>
          </div>
        </div>

        {/* General Information Card with Orange Left Border */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative border-l-4 border-l-[#ff6600] flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-6">
              {t('generalInformation') || 'General information'}
            </h3>

            <div className="flex flex-col gap-4 text-xs">
              <div>
                <span className="text-gray-700 font-bold block">{t('period') || 'Period:'}</span>
                <span className="text-gray-900 font-medium">2026 year</span>
              </div>

              <div>
                <span className="text-gray-700 font-bold block">{t('incomeAmount') || 'Income amount:'}</span>
                <span className="text-gray-900 font-bold text-sm">141,000 UAH</span>
              </div>

              <div>
                <span className="text-gray-700 font-bold block">{locale === 'ua' ? 'Кількість проданих товарів:' : 'Number of items sold:'}</span>
                <span className="text-gray-900 font-medium">674 pcs</span>
              </div>

              <div>
                <span className="text-gray-700 font-bold block">{locale === 'ua' ? 'Кількість активних замовлень:' : 'Number of active orders:'}</span>
                <span className="text-gray-900 font-medium">0</span>
              </div>

              <div>
                <span className="text-gray-700 font-bold block">{locale === 'ua' ? 'Кількість виконаних замовлень:' : 'Number of completed orders:'}</span>
                <span className="text-gray-900 font-medium">578</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePanel;
