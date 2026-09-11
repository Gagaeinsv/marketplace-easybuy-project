'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppDispatch } from '@/store/hooks';
import { logOut } from '@/store/auth/operations';

// Exact notification items from Figma screen (figma_notifications.png)
const initialNotifications = [
  { id: '1', title: 'Congratulations!', date: '18.11.2024', desc: 'This is not the first time I buy from this store. Quality products and nice sellers. I recommend' },
  { id: '2', title: 'You received feedback.', date: '18.11.2024', desc: 'A user P. Diddy has left you a review. Learn more.' },
  { id: '3', title: 'Congratulations!', date: '18.11.2024', desc: 'This is not the first time I buy from this store. Quality products and nice sellers. I recommend' },
  { id: '4', title: 'You received feedback.', date: '18.11.2024', desc: 'A user P. Diddy has left you a review. Learn more.' },
  { id: '5', title: 'You received feedback.', date: '18.11.2024', desc: 'A user P. Diddy has left you a review. Learn more.' },
];

const Notifications = () => {
  const { t, locale } = useLanguage();
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="animate-fadeIn flex flex-col gap-6 font-dm max-w-3xl pb-16">
      {/* Top Header matching Figma */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-[#104c9a]">
          {t('sellerNotifications') || 'Notification'}
        </h1>
        <button 
          onClick={handleLogout}
          className="px-6 py-2 border border-[#104c9a] hover:bg-blue-50 text-sm font-medium text-[#104c9a] rounded-lg transition-all cursor-pointer bg-white shadow-sm"
        >
          {t('logOut') || 'Log out'}
        </button>
      </div>

      {/* Notifications List matching Figma soft rounded card style */}
      <div className="flex flex-col gap-4 mt-2">
        {notifications.map(notif => (
          <div 
            key={notif.id}
            className="bg-[#ebebf4]/70 hover:bg-[#ebebf4] transition-colors rounded-xl p-5 flex flex-col gap-2 shadow-2xs border border-transparent hover:border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm">
                {notif.title}
              </h3>
              <span className="text-xs font-bold text-gray-800">
                {notif.date}
              </span>
            </div>
            <p className="text-xs text-gray-700 font-medium leading-relaxed">
              {notif.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
