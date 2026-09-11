'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppDispatch } from '@/store/hooks';
import { logOut } from '@/store/auth/operations';

const faqsData = [
  { id: '1', num: '1', q: 'How to place an order?', a: 'Placing an order is very simple:\n- Find the product you are interested in and add it to your cart by clicking the "Add to Cart" button.\n- Go to your cart and click "Checkout".\n- Enter your contact details, delivery address, and select a payment method.\n- Confirm your order. You will receive a notification of successful checkout.' },
  { id: '2', num: '2', q: 'Can I cancel an order?', a: 'Yes, you can cancel your order before it has been shipped by the seller. Go to the "Orders" tab in your dashboard and select the cancel option, or contact customer support directly.' },
  { id: '3', num: '3', q: 'How to track an order?', a: 'You can track your order using the tracking number sent to your email or check the live shipment status under the "Orders" tab on your dashboard.' },
  { id: '4', num: '4', q: 'What should I do if the product is damaged or does not match the description?', a: 'Please take photos of the damaged item and original packaging, then submit a dispute under the "Support & Tickets" section within 14 days of receipt.' },
  { id: '5', num: '5', q: 'How do I a review about a product?', a: 'Once your order status changes to "Completed", go to the product page or "My Orders" tab and click "Leave a review" with a star rating and comment.' },
  { id: '6', num: '6', q: 'How do I change my delivery address?', a: 'You can update your default shipping address in Profile Settings, or contact the seller in Chat before the package is dispatched.' },
  { id: '7', num: '7', q: 'Can I pay for my order by cash on delivery?', a: 'Yes, cash on delivery is available for all major postal operators (Nova Poshta, Ukrposhta) upon parcel pickup.' },
];

const Support = () => {
  const { t, locale } = useLanguage();
  const dispatch = useAppDispatch();
  const [openFaqId, setOpenFaqId] = useState('1');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const toggleFaq = (id) => {
    setOpenFaqId(prev => prev === id ? null : id);
  };

  const handleSend = (e) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      showToast(locale === 'ua' ? 'Повідомлення надіслано в підтримку!' : 'Message sent to support!');
      setContactForm({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <div className="animate-fadeIn flex flex-col gap-8 font-dm max-w-4xl pb-16">
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
          {t('sellerSupport') || 'Technical support'}
        </h1>
        <button 
          onClick={handleLogout}
          className="px-6 py-2 border border-[#104c9a] hover:bg-blue-50 text-sm font-medium text-[#104c9a] rounded-lg transition-all cursor-pointer bg-white shadow-sm"
        >
          {t('logOut') || 'Log out'}
        </button>
      </div>

      {/* 3 Quick Contact Icons with orange circular outlines matching Figma */}
      <div className="flex items-center gap-8">
        <a href="tel:0800111222" className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          <div className="w-10 h-10 rounded-full border border-[#ff6600] flex items-center justify-center text-[#ff6600] text-lg bg-orange-50/20">
            🎧
          </div>
          <span>Call Center</span>
        </a>

        <a href="https://t.me/easybuy_support" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          <div className="w-10 h-10 rounded-full border border-[#ff6600] flex items-center justify-center text-[#ff6600] text-lg bg-orange-50/20">
            ✈️
          </div>
          <span>Telegram Chat</span>
        </a>

        <a href="https://wa.me/380501112233" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-xs font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          <div className="w-10 h-10 rounded-full border border-[#ff6600] flex items-center justify-center text-[#ff6600] text-lg bg-orange-50/20">
            💬
          </div>
          <span>WhatsApp Chat</span>
        </a>
      </div>

      {/* Contact Us Form matching Figma */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#104c9a]">
            {t('contactUs') || 'Contact us'}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Send us a message by email.
          </p>
        </div>

        <form onSubmit={handleSend} className="flex flex-col gap-4 max-w-lg">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">Name</label>
            <input 
              type="text"
              placeholder="Enter"
              value={contactForm.name}
              onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
              required
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-xs outline-none bg-white focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">Email</label>
            <input 
              type="email"
              placeholder="Enter"
              value={contactForm.email}
              onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
              required
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-xs outline-none bg-white focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">Message</label>
            <textarea 
              rows={4}
              placeholder="Enter"
              value={contactForm.message}
              onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
              required
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-xs outline-none bg-white focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <button 
              type="submit"
              disabled={isSending}
              className="px-8 py-2.5 bg-[#4e46b4] hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>

      {/* FAQ Accordion with all 7 questions matching Figma exactly */}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-[#104c9a] mb-2">
          FAQ
        </h2>

        <div className="flex flex-col gap-2">
          {faqsData.map(faq => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs">
                <button 
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-4 py-3 flex justify-between items-center text-left hover:bg-gray-50/50 cursor-pointer"
                >
                  <span className="text-xs font-semibold text-[#104c9a]">
                    {faq.num}. {faq.q}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {isOpen ? '⌃' : '⌄'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 text-xs text-gray-600 whitespace-pre-line leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Support;
