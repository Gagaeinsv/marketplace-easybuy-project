'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Modal from '@/components/modal/Modal';

const initialCards = [
  {
    id: 'card-1',
    brand: 'Mastercard',
    last4: '5412',
    holder: 'OLEKSANDR HAHARIN',
    exp: '08/28',
    isDefault: true,
  },
  {
    id: 'card-2',
    brand: 'Visa',
    last4: '8841',
    holder: 'OLEKSANDR HAHARIN',
    exp: '12/26',
    isDefault: false,
  },
];

const Payment = () => {
  const { t, locale } = useLanguage();
  const [cards, setCards] = useState(initialCards);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !cardExp) return;

    const newCard = {
      id: `card-${Date.now()}`,
      brand: cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      last4: cardNumber.slice(-4) || '1234',
      holder: cardHolder.toUpperCase(),
      exp: cardExp,
      isDefault: cards.length === 0,
    };

    setCards([...cards, newCard]);
    setIsModalOpen(false);
    setCardNumber('');
    setCardHolder('');
    setCardExp('');
    setCardCvv('');
    showToast(locale === 'ua' ? 'Картку успішно додано!' : 'Card added successfully!');
  };

  const handleSetDefault = (id) => {
    setCards(cards.map(c => ({ ...c, isDefault: c.id === id })));
    showToast(locale === 'ua' ? 'Картку встановлено за замовчуванням' : 'Default card updated');
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter(c => c.id !== id));
    showToast(locale === 'ua' ? 'Картку видалено' : 'Card removed');
  };

  return (
    <div className="w-full flex flex-col animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#104c9a] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/20">
          <span className="text-lg">✓</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-2xl font-bold font-dm text-[#104c9a]">
            {t('payment') || 'Збережені способи оплати'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Керуйте платіжними картками для швидкого та безпечного оформлення замовлень
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#104c9a] text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"
        >
          + {t('addPaymentMethodBtn') || 'Додати картку'}
        </button>
      </div>

      {/* Cards List */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {cards.map((card) => (
            <div 
              key={card.id}
              className={`rounded-2xl p-5 border relative flex flex-col justify-between h-[190px] shadow-sm transition-all ${
                card.isDefault 
                  ? 'bg-gradient-to-br from-[#104c9a] to-[#071739] text-white border-[#104c9a]' 
                  : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Card Top */}
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className={`text-xs font-bold ${card.isDefault ? 'text-blue-200' : 'text-gray-400'}`}>
                    {card.brand}
                  </span>
                  {card.isDefault && (
                    <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-md mt-1 w-fit">
                      {locale === 'ua' ? 'Основна картка' : 'Default'}
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => handleDeleteCard(card.id)}
                  className={`text-xs font-bold hover:underline ${card.isDefault ? 'text-white/80 hover:text-white' : 'text-red-500 hover:text-red-700'}`}
                  title="Видалити"
                >
                  ✕
                </button>
              </div>

              {/* Card Middle Number */}
              <div className="font-mono text-lg font-bold tracking-widest my-auto">
                •••• •••• •••• {card.last4}
              </div>

              {/* Card Bottom */}
              <div className="flex justify-between items-end text-xs">
                <div>
                  <span className={`block text-[9px] uppercase font-semibold ${card.isDefault ? 'text-blue-200' : 'text-gray-400'}`}>
                    Власник
                  </span>
                  <span className="font-bold">{card.holder}</span>
                </div>

                <div className="text-right">
                  <span className={`block text-[9px] uppercase font-semibold ${card.isDefault ? 'text-blue-200' : 'text-gray-400'}`}>
                    Термін дії
                  </span>
                  <span className="font-bold font-mono">{card.exp}</span>
                </div>

                {!card.isDefault && (
                  <button 
                    onClick={() => handleSetDefault(card.id)}
                    className="text-[11px] text-[#104c9a] font-bold underline ml-2 hover:text-[#ff7400]"
                  >
                    Зробити основною
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full flex flex-col items-center justify-center py-16 px-4 animate-fadeIn text-center">
          <div className="w-16 h-16 bg-blue-50 text-[#104c9a] rounded-full flex items-center justify-center text-2xl font-bold mb-4">
            💳
          </div>
          <h3 className="text-xl font-bold text-[#104c9a] mb-2">
            {t('noPaymentMethods') || 'Немає збережених карток'}
          </h3>
          <p className="text-xs text-gray-500 mb-6 max-w-sm">
            {t('noPaymentMethodsDesc') || 'Додайте банківську картку Visa або Mastercard для швидких покупок без повторного введення реквізитів.'}
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#ff7400] text-white font-bold py-3 px-6 rounded-xl hover:brightness-110 shadow-md transition-all text-xs"
          >
            {t('addPaymentMethodBtn') || 'Додати платіжну картку'}
          </button>
        </div>
      )}

      {/* Add Card Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleAddCard} className="p-6 max-w-[440px] w-full flex flex-col gap-4">
          <h3 className="text-2xl font-bold font-dm text-[#104c9a]">
            {t('addPaymentMethodBtn') || 'Додати банківську картку'}
          </h3>
          <p className="text-xs text-gray-500">
            Дані вашої картки захищені відповідно до міжнародних стандартів безпеки PCI DSS.
          </p>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Номер картки</label>
            <input 
              type="text" 
              required
              maxLength={19}
              placeholder="4141 1234 5678 9012"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#104c9a]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Ім’я та прізвище на картці</label>
            <input 
              type="text" 
              required
              placeholder="OLEKSANDR HAHARIN"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm uppercase focus:outline-none focus:border-[#104c9a]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">Термін (ММ/РР)</label>
              <input 
                type="text" 
                required
                maxLength={5}
                placeholder="12/28"
                value={cardExp}
                onChange={(e) => setCardExp(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#104c9a]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-700">CVV / CVC</label>
              <input 
                type="password" 
                required
                maxLength={3}
                placeholder="•••"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#104c9a]"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-3">
            <button 
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 border border-gray-300 py-3 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors"
            >
              Скасувати
            </button>
            <button 
              type="submit"
              className="flex-1 bg-[#104c9a] text-white font-bold py-3 rounded-xl text-xs hover:bg-blue-800 shadow-md transition-colors"
            >
              Зберегти картку
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Payment;
