'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppDispatch } from '@/store/hooks';
import { logOut } from '@/store/auth/operations';

const initialReviews = [
  { id: '1', author: 'Anthony Hopkins', date: '18.11.2024', rating: 5, text: 'This is not the first time I buy from this store. Quality products and nice sellers. I recommend.', reply: 'Thank you for choosing our store! Enjoy your shopping!' },
  { id: '2', author: 'Harry Potter', date: '15.11.2024', rating: 4, text: 'The magic broom is excellent! Processing speed was fast, but delivery took 3 days.', reply: '' },
];

const Reviews = () => {
  const { t, locale } = useLanguage();
  const dispatch = useAppDispatch();
  const [reviews, setReviews] = useState(initialReviews);
  const [replyText, setReplyText] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState('Year');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleSendReply = (reviewId) => {
    const text = replyText[reviewId];
    if (!text || !text.trim()) return;

    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, reply: text } : r));
    setReplyText(prev => ({ ...prev, [reviewId]: '' }));
    showToast(locale === 'ua' ? 'Відповідь опубліковано!' : 'Reply published!');
  };

  return (
    <div className="animate-fadeIn flex flex-col gap-6 font-dm max-w-[1440px] mx-auto pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#104c9a] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/20">
          <span className="text-lg">✓</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header matching Figma */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-[#104c9a]">
          {t('sellerReviews') || 'Reviews'}
        </h1>
        <button 
          onClick={handleLogout}
          className="px-6 py-2 border border-[#104c9a] hover:bg-blue-50 text-sm font-medium text-[#104c9a] rounded-lg transition-all cursor-pointer bg-white shadow-sm"
        >
          {t('logOut') || 'Log out'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: All reviews list */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-base font-bold text-gray-900">
            {locale === 'ua' ? 'Всі відгуки' : 'All reviews'}
          </h2>

          <div className="flex flex-col gap-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-gray-900 text-sm">{review.author}</span>
                    <span className="text-gray-400 text-xs ml-3">{review.date}</span>
                  </div>
                  <span className="text-yellow-400 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed font-medium">{review.text}</p>

                {review.reply ? (
                  <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-3 text-xs">
                    <span className="font-bold text-[#104c9a] block mb-0.5">Nike (You):</span>
                    <p className="text-gray-700 font-medium">{review.reply}</p>
                  </div>
                ) : (
                  <div className="flex gap-2 mt-1">
                    <input 
                      type="text"
                      placeholder="Reply to customer feedback..."
                      value={replyText[review.id] || ''}
                      onChange={e => setReplyText({ ...replyText, [review.id]: e.target.value })}
                      className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500"
                    />
                    <button 
                      type="button"
                      onClick={() => handleSendReply(review.id)}
                      className="px-4 py-1.5 bg-[#4e46b4] hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Rating details by reviews matching Figma exactly */}
        <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          {/* Positive score box matching Figma */}
          <div className="flex items-center gap-4">
            <span className="text-5xl font-extrabold text-[#104c9a]">90%</span>
            <div>
              <span className="text-[11px] font-bold text-gray-700 uppercase block tracking-wider">
                POSITIVE
              </span>
              <span className="text-[10px] text-gray-500 font-medium block uppercase tracking-wider">
                OUT OF REVIEWS PER YEAR
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs text-gray-500 block mb-1">Total reviews in 1 year</span>
            <div className="text-yellow-400 text-base">★★★★★</div>
          </div>

          {/* Rating details table matching Figma */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm text-[#104c9a]">
                {t('ratingDetailsByReviews') || 'Rating details by reviews'}
              </h3>
              <select 
                value={selectedPeriod}
                onChange={e => setSelectedPeriod(e.target.value)}
                className="px-2 py-1 border border-gray-200 rounded text-xs bg-white text-gray-700 outline-none cursor-pointer"
              >
                <option value="Year">Year ⌄</option>
                <option value="Month">Month ⌄</option>
              </select>
            </div>

            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400">
                  <th className="py-2"></th>
                  <th className="py-2 text-center">1 month</th>
                  <th className="py-2 text-center">6 months</th>
                  <th className="py-2 text-center">12 months</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
                <tr>
                  <td className="py-2.5 text-green-600 font-bold">Positive</td>
                  <td className="py-2.5 text-center">3</td>
                  <td className="py-2.5 text-center">48</td>
                  <td className="py-2.5 text-center">147</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-yellow-600 font-bold">Neutral</td>
                  <td className="py-2.5 text-center">1</td>
                  <td className="py-2.5 text-center">13</td>
                  <td className="py-2.5 text-center">28</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-red-600 font-bold">Negative</td>
                  <td className="py-2.5 text-center">0</td>
                  <td className="py-2.5 text-center">5</td>
                  <td className="py-2.5 text-center">15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
