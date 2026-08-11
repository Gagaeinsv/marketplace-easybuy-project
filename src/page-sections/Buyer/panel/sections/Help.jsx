'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import toast from 'react-hot-toast';

export default function Help() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState('1');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const faqs = [
    {
      id: '1',
      question: t('faq1Q') || 'How can I track my order?',
      answer: t('faq1A') || 'You can track your order status directly in your account under the "My Orders" section or via the tracking link sent to your email.',
    },
    {
      id: '2',
      question: t('faq2Q') || 'What payment methods are supported?',
      answer: t('faq2A') || 'We accept Visa, Mastercard, Apple Pay, Google Pay, and Cash on Delivery (COD).',
    },
    {
      id: '3',
      question: t('faq3Q') || 'How do I return a product?',
      answer: t('faq3A') || 'You can initiate a return request within 14 days of receiving your item via the "Refunds" section in your buyer cabinet.',
    },
    {
      id: '4',
      question: t('faq4Q') || 'How do I contact a seller directly?',
      answer: t('faq4A') || 'Go to the product page or your order details and click "Message Seller" to open a direct chat thread.',
    },
  ];

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    if (!subject || !message) {
      toast.error(t('fillAllFields') || 'Please enter subject and message.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(t('supportTicketCreated') || 'Support request sent! Our team will get back to you shortly.');
      setSubject('');
      setMessage('');
    }, 800);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col gap-8">
      {/* FAQ Section */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-[#104c9a] mb-4">
          {t('faqTitle') || 'Frequently Asked Questions'}
        </h3>

        <div className="flex flex-col gap-3">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden transition-colors">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors text-sm md:text-base"
                >
                  <span>{faq.question}</span>
                  <span className="text-[#104c9a] text-xl font-bold ml-2">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Support Form */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold text-[#104c9a] mb-2">
          {t('contactSupportTitle') || 'Need Further Help?'}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {t('contactSupportDesc') || 'Send us a message and our support team will respond within 24 hours.'}
        </p>

        <form onSubmit={handleSupportSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('subjectLabel') || 'Subject'}
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t('subjectPlaceholder') || 'e.g., Question about my order #1234'}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#104c9a] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('messageLabel') || 'Message'}
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('messagePlaceholder') || 'Describe your issue or question in detail...'}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-[#104c9a] focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto self-start px-6 py-2.5 bg-[#104c9a] text-white font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all"
          >
            {isSubmitting ? t('sending') || 'Sending...' : t('sendSupportRequestBtn') || 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
