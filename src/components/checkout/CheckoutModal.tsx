'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectIsCheckoutOpen,
  closeCheckout,
  selectCheckoutStep,
  setStep,
  updateContactData,
  updateDeliveryData,
  updatePaymentData,
  applyPromoCode,
  removePromoCode,
  completeOrder,
  resetCheckout,
  selectCheckoutContactData,
  selectCheckoutDeliveryData,
  selectCheckoutDiscountData,
  selectCheckoutPaymentData,
  selectCheckoutOrderSuccess,
} from '@/store/checkout/slice';
import { selectCartItems, selectCartTotalPrice, clearCart } from '@/store/cart/slice';
import { useLanguage } from '@/context/LanguageContext';
import Modal from '@/components/modal/Modal';
import Auth from '@/features/auth/Auth';
import Image from 'next/image';

export default function CheckoutModal() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [validationError, setValidationError] = useState('');

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCheckoutOpen);
  const currentStep = useAppSelector(selectCheckoutStep);
  const contactData = useAppSelector(selectCheckoutContactData);
  const deliveryData = useAppSelector(selectCheckoutDeliveryData);
  const discountData = useAppSelector(selectCheckoutDiscountData);
  const paymentData = useAppSelector(selectCheckoutPaymentData);
  const orderSuccess = useAppSelector(selectCheckoutOrderSuccess);
  
  const cartItems = useAppSelector(selectCartItems);
  const subtotalPrice = useAppSelector(selectCartTotalPrice);
  const { t, locale } = useLanguage() as any;

  if (!isOpen) return null;

  // Calculate pricing
  const discountAmount = discountData.isApplied
    ? (subtotalPrice * discountData.discountPercent) / 100
    : 0;
  const deliveryPrice = deliveryData.method === 'pickup' ? 0 : 80;
  const finalPrice = Math.max(0, subtotalPrice - discountAmount + (subtotalPrice > 0 ? deliveryPrice : 0));

  const steps = [
    t('stepContacts') || 'Контакти',
    t('stepDelivery') || 'Доставка',
    t('stepDiscounts') || 'Знижки',
    t('stepPayment') || 'Оплата',
  ];

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateContactData({ [e.target.name]: e.target.value }));
    setValidationError('');
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      dispatch(updateDeliveryData({ [name]: checked }));
    } else {
      dispatch(updateDeliveryData({ [name]: value }));
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      dispatch(updatePaymentData({ [name]: checked }));
    } else {
      dispatch(updatePaymentData({ [name]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep === 0) {
      if (!contactData.name.trim() || !contactData.phone.trim()) {
        setValidationError(locale === 'ua' ? 'Будь ласка, заповніть ім’я та номер телефону' : 'Please provide your name and phone number');
        return;
      }
    }
    if (currentStep === 1) {
      if (deliveryData.method !== 'pickup' && !deliveryData.city.trim()) {
        setValidationError(locale === 'ua' ? 'Будь ласка, вкажіть місто доставки' : 'Please specify a delivery city');
        return;
      }
    }
    setValidationError('');
    if (currentStep < 3) {
      dispatch(setStep(currentStep + 1));
    } else if (currentStep === 3) {
      // Complete order
      const randomOrderId = `EB-${Math.floor(100000 + Math.random() * 900000)}`;
      dispatch(completeOrder(randomOrderId));
      dispatch(clearCart());
    }
  };

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    dispatch(applyPromoCode(promoInput));
  };

  const handleClose = () => {
    dispatch(closeCheckout());
    if (orderSuccess.isSuccess) {
      dispatch(resetCheckout());
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none">
        <div 
          className="bg-white rounded-[24px] w-full max-w-[560px] max-h-[92vh] flex flex-col shadow-2xl relative pointer-events-auto overflow-hidden animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="pt-7 pb-4 px-6 relative flex justify-between items-center border-b border-gray-100">
            <h2 className="text-2xl lg:text-[26px] font-bold font-dm text-[#104c9a]">
              {orderSuccess.isSuccess ? (t('orderSuccessTitle') || 'Замовлення оформлено!') : (t('checkoutTitle') || 'Оформлення замовлення')}
            </h2>
            
            <button 
              onClick={handleClose}
              className="text-[#ff6b00] hover:bg-orange-50 w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#ff6b00] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13"/>
              </svg>
            </button>
          </div>

          {/* Stepper Bar (if not success) */}
          {!orderSuccess.isSuccess && (
            <div className="px-6 py-4 bg-gray-50/70 border-b border-gray-100">
              <div className="flex justify-between items-center relative">
                {steps.map((step, index) => (
                  <div key={step} className="flex flex-col items-center relative z-10">
                    <button
                      onClick={() => {
                        if (index < currentStep) dispatch(setStep(index));
                      }}
                      disabled={index > currentStep}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 ${
                        currentStep === index 
                          ? 'bg-[#104c9a] text-white border-[#104c9a] shadow-sm ring-2 ring-blue-100' 
                          : currentStep > index 
                            ? 'bg-white text-[#104c9a] border-[#104c9a] cursor-pointer'
                            : 'bg-gray-200 text-gray-400 border-transparent cursor-not-allowed'
                      }`}
                    >
                      <span>{index + 1}.</span>
                      <span className="hidden sm:inline">{step}</span>
                    </button>
                  </div>
                ))}
                {/* Connecting line */}
                <div className="absolute top-1/2 left-[5%] right-[5%] h-[2px] bg-gray-200 z-0 -translate-y-1/2"></div>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 custom-scrollbar">
            
            {/* STEP 0: CONTACTS */}
            {currentStep === 0 && !orderSuccess.isSuccess && (
              <div className="flex flex-col animate-fadeIn">
                {/* Auth Banner */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50/40 rounded-2xl p-4 text-center border border-blue-100/60 mb-5">
                  <p className="text-xs text-gray-700 font-semibold mb-3">
                    {t('authDesc') || 'Увійдіть до особистого кабінету, щоб отримати персональні бонуси'}
                  </p>
                  <div className="flex gap-2.5 justify-center">
                    <button 
                      type="button"
                      className="bg-[#104c9a] text-white font-bold text-xs rounded-lg px-4 py-2.5 hover:bg-blue-800 transition-colors shadow-sm" 
                      onClick={() => setIsAuthOpen(true)}
                    >
                      {t('loginToCabinet') || 'Увійти в кабінет'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => dispatch(setStep(1))}
                      className="bg-white text-[#104c9a] border border-[#104c9a] font-bold text-xs rounded-lg px-4 py-2.5 hover:bg-blue-50 transition-colors"
                    >
                      {t('continueWithoutAuth') || 'Продовжити як гість'}
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-3.5 mb-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700 ml-1">
                      {t('nameLabel') || 'Ваше ім’я'} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder={t('namePlaceholder') || 'Олександр'}
                      value={contactData.name}
                      onChange={handleContactChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#104c9a] focus:ring-1 focus:ring-[#104c9a] transition-all"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700 ml-1">
                      {t('phoneNumberLabel') || 'Номер телефону'} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder={t('phoneNumberPlaceholder') || '+380 99 123 4567'}
                      value={contactData.phone}
                      onChange={handleContactChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#104c9a] focus:ring-1 focus:ring-[#104c9a] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700 ml-1">
                      {t('emailLabel') || 'Електронна пошта'}
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder={t('emailPlaceholder') || 'example@mail.com'}
                      value={contactData.email}
                      onChange={handleContactChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#104c9a] focus:ring-1 focus:ring-[#104c9a] transition-all"
                    />
                  </div>
                </div>

                {validationError && (
                  <div className="text-red-500 text-xs font-semibold mb-4 bg-red-50 p-2.5 rounded-lg border border-red-100">
                    {validationError}
                  </div>
                )}
              </div>
            )}

            {/* STEP 1: DELIVERY */}
            {currentStep === 1 && !orderSuccess.isSuccess && (
              <div className="flex flex-col animate-fadeIn">
                <h3 className="text-sm font-bold text-[#104c9a] uppercase tracking-wider mb-3">
                  {t('deliveryMethod') || 'Спосіб доставки'}
                </h3>

                {/* Delivery Options */}
                <div className="flex flex-col gap-2.5 mb-5">
                  <label className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${deliveryData.method === 'nova_poshta_branch' ? 'border-[#104c9a] bg-blue-50/40 ring-1 ring-[#104c9a]' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="method" 
                        value="nova_poshta_branch" 
                        checked={deliveryData.method === 'nova_poshta_branch'}
                        onChange={handleDeliveryChange}
                        className="accent-[#104c9a] w-4 h-4"
                      />
                      <span className="text-sm font-semibold text-gray-800">
                        {t('novaPoshtaBranch') || 'Нова Пошта (Відділення / Поштомат)'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">80 ₴</span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${deliveryData.method === 'nova_poshta_courier' ? 'border-[#104c9a] bg-blue-50/40 ring-1 ring-[#104c9a]' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="method" 
                        value="nova_poshta_courier" 
                        checked={deliveryData.method === 'nova_poshta_courier'}
                        onChange={handleDeliveryChange}
                        className="accent-[#104c9a] w-4 h-4"
                      />
                      <span className="text-sm font-semibold text-gray-800">
                        {t('novaPoshtaCourier') || 'Нова Пошта (Кур’єрська доставка)'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">120 ₴</span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${deliveryData.method === 'ukrposhta_branch' ? 'border-[#104c9a] bg-blue-50/40 ring-1 ring-[#104c9a]' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="method" 
                        value="ukrposhta_branch" 
                        checked={deliveryData.method === 'ukrposhta_branch'}
                        onChange={handleDeliveryChange}
                        className="accent-[#104c9a] w-4 h-4"
                      />
                      <span className="text-sm font-semibold text-gray-800">
                        {t('ukrPoshtaBranch') || 'Укрпошта (Відділення)'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">50 ₴</span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${deliveryData.method === 'pickup' ? 'border-[#104c9a] bg-blue-50/40 ring-1 ring-[#104c9a]' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="method" 
                        value="pickup" 
                        checked={deliveryData.method === 'pickup'}
                        onChange={handleDeliveryChange}
                        className="accent-[#104c9a] w-4 h-4"
                      />
                      <span className="text-sm font-semibold text-gray-800">
                        {t('pickup') || 'Самовивіз з точки видачі'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-green-600">Безкоштовно</span>
                  </label>
                </div>

                {/* Delivery Location Details */}
                {deliveryData.method !== 'pickup' && (
                  <div className="flex flex-col gap-3.5 mb-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-700">
                        {t('cityLabel') || 'Місто доставки'} <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        name="city"
                        placeholder={t('cityPlaceholder') || 'Київ'}
                        value={deliveryData.city}
                        onChange={handleDeliveryChange}
                        className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-[#104c9a]"
                      />
                    </div>

                    {deliveryData.method === 'nova_poshta_courier' ? (
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700">
                          {t('addressLabel') || 'Адреса (вулиця, будинок, квартира)'}
                        </label>
                        <input 
                          type="text" 
                          name="address"
                          placeholder={t('addressPlaceholder') || 'вул. Тараса Шевченка, 10, кв. 25'}
                          value={deliveryData.address}
                          onChange={handleDeliveryChange}
                          className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-[#104c9a]"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700">
                          {t('branchLabel') || 'Номер відділення або поштомату'}
                        </label>
                        <input 
                          type="text" 
                          name="branch"
                          placeholder={t('branchPlaceholder') || 'Відділення № 25 (вул. Хрещатик, 1)'}
                          value={deliveryData.branch}
                          onChange={handleDeliveryChange}
                          className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:border-[#104c9a]"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Recipient is another person */}
                <div className="mb-4">
                  <label className="flex items-center gap-2.5 text-xs font-bold text-gray-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="isAnotherRecipient"
                      checked={deliveryData.isAnotherRecipient}
                      onChange={handleDeliveryChange}
                      className="accent-[#104c9a] w-4 h-4 rounded"
                    />
                    <span>{t('recipientAnother') || 'Отримувачем буде інша особа'}</span>
                  </label>

                  {deliveryData.isAnotherRecipient && (
                    <div className="flex flex-col gap-3 mt-3 p-3.5 bg-gray-50 rounded-xl border border-gray-200 animate-fadeIn">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-600">{t('recipientNameLabel') || 'Ім’я та прізвище отримувача'}</label>
                        <input 
                          type="text" 
                          name="recipientName"
                          value={deliveryData.recipientName}
                          onChange={handleDeliveryChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-600">{t('recipientPhoneLabel') || 'Телефон отримувача'}</label>
                        <input 
                          type="tel" 
                          name="recipientPhone"
                          value={deliveryData.recipientPhone}
                          onChange={handleDeliveryChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {validationError && (
                  <div className="text-red-500 text-xs font-semibold mb-4 bg-red-50 p-2.5 rounded-lg border border-red-100">
                    {validationError}
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: DISCOUNTS & PROMO CODES */}
            {currentStep === 2 && !orderSuccess.isSuccess && (
              <div className="flex flex-col animate-fadeIn">
                <h3 className="text-sm font-bold text-[#104c9a] uppercase tracking-wider mb-2">
                  {t('promoCodeTitle') || 'Промокод або сертифікат'}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  {locale === 'ua' ? 'Введіть промокод на знижку для отримання спеціальної ціни' : 'Enter a promo code to apply instant discounts'}
                </p>

                {/* Promo input */}
                <div className="flex gap-2 mb-4">
                  <input 
                    type="text" 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder={t('promoCodePlaceholder') || 'Введіть промокод (напр. EASYBUY10)'}
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm uppercase placeholder:normal-case font-mono focus:outline-none focus:border-[#104c9a]"
                  />
                  <button 
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-[#104c9a] text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-800 transition-colors"
                  >
                    {t('applyPromo') || 'Застосувати'}
                  </button>
                </div>

                {discountData.isApplied && (
                  <div className="flex items-center justify-between bg-green-50 text-green-800 border border-green-200 p-3.5 rounded-xl mb-4 text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>{t('promoApplied') || `Промокод на -${discountData.discountPercent}% успішно застосовано!`}</span>
                    </div>
                    <button 
                      onClick={() => dispatch(removePromoCode())}
                      className="text-red-500 font-bold hover:underline"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {discountData.error && (
                  <div className="text-red-500 text-xs font-semibold mb-4 bg-red-50 p-2.5 rounded-lg border border-red-100">
                    {t('promoInvalid') || 'Недійсний промокод. Спробуйте EASYBUY10 або SALE20'}
                  </div>
                )}

                {/* Promo hints */}
                <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-4 mt-2">
                  <div className="text-xs font-bold text-amber-900 mb-1">🎁 Доступні промокоди для тесту:</div>
                  <div className="flex gap-2 mt-2">
                    <span 
                      onClick={() => { setPromoInput('EASYBUY10'); dispatch(applyPromoCode('EASYBUY10')); }}
                      className="bg-white border border-amber-300 text-amber-800 text-xs font-mono font-bold px-2.5 py-1 rounded-md cursor-pointer hover:bg-amber-100"
                    >
                      EASYBUY10 (-10%)
                    </span>
                    <span 
                      onClick={() => { setPromoInput('SALE20'); dispatch(applyPromoCode('SALE20')); }}
                      className="bg-white border border-amber-300 text-amber-800 text-xs font-mono font-bold px-2.5 py-1 rounded-md cursor-pointer hover:bg-amber-100"
                    >
                      SALE20 (-20%)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT & SUMMARY */}
            {currentStep === 3 && !orderSuccess.isSuccess && (
              <div className="flex flex-col animate-fadeIn">
                <h3 className="text-sm font-bold text-[#104c9a] uppercase tracking-wider mb-3">
                  {t('paymentMethod') || 'Спосіб оплати'}
                </h3>

                {/* Payment Options */}
                <div className="flex flex-col gap-2.5 mb-5">
                  <label className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${paymentData.method === 'card_online' ? 'border-[#104c9a] bg-blue-50/40 ring-1 ring-[#104c9a]' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input 
                      type="radio" 
                      name="method" 
                      value="card_online" 
                      checked={paymentData.method === 'card_online'}
                      onChange={handlePaymentChange}
                      className="accent-[#104c9a] w-4 h-4"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">
                        {t('cardOnline') || 'Оплата онлайн (Visa / Mastercard / Stripe)'}
                      </span>
                      <span className="text-[11px] text-gray-500">Миттєва безпечна оплата без комісії</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer transition-all ${paymentData.method === 'cash_on_delivery' ? 'border-[#104c9a] bg-blue-50/40 ring-1 ring-[#104c9a]' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input 
                      type="radio" 
                      name="method" 
                      value="cash_on_delivery" 
                      checked={paymentData.method === 'cash_on_delivery'}
                      onChange={handlePaymentChange}
                      className="accent-[#104c9a] w-4 h-4"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">
                        {t('cashOnDelivery') || 'Оплата при отриманні (післяплата)'}
                      </span>
                      <span className="text-[11px] text-gray-500">Оплата у відділенні після огляду товару</span>
                    </div>
                  </label>
                </div>

                {/* Order Comment */}
                <div className="flex flex-col gap-1 mb-4">
                  <label className="text-xs font-bold text-gray-700">{t('commentLabel') || 'Коментар до замовлення'}</label>
                  <textarea 
                    name="comment"
                    rows={2}
                    placeholder={t('commentPlaceholder') || 'Побажання щодо доставки або упакування...'}
                    value={paymentData.comment}
                    onChange={handlePaymentChange}
                    className="w-full border border-gray-300 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:border-[#104c9a]"
                  />
                </div>

                {/* Call me back checkbox */}
                <label className="flex items-center gap-2.5 text-xs font-bold text-gray-700 cursor-pointer mb-5">
                  <input 
                    type="checkbox" 
                    name="callMeBack"
                    checked={paymentData.callMeBack}
                    onChange={handlePaymentChange}
                    className="accent-[#104c9a] w-4 h-4 rounded"
                  />
                  <span>{t('callMeBackLabel') || 'Не перетелефоновувати для підтвердження'}</span>
                </label>

                {/* Order Breakdown Summary */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs text-gray-600 flex flex-col gap-2 mb-2">
                  <div className="flex justify-between">
                    <span>Товарів у кошику ({cartItems.length}):</span>
                    <span className="font-semibold">${subtotalPrice.toFixed(2)}</span>
                  </div>
                  {discountData.isApplied && (
                    <div className="flex justify-between text-green-700 font-semibold">
                      <span>Знижка ({discountData.discountPercent}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Доставка ({deliveryData.method === 'pickup' ? 'Самовивіз' : 'Пошта'}):</span>
                    <span className="font-semibold">{deliveryPrice === 0 ? 'Безкоштовно' : `${deliveryPrice} ₴ (~$2.00)`}</span>
                  </div>
                  <div className="h-[1px] bg-gray-200 my-1" />
                  <div className="flex justify-between text-sm font-bold text-[#104c9a]">
                    <span>Разом до сплати:</span>
                    <span className="text-base font-dm">${finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: ORDER SUCCESS */}
            {orderSuccess.isSuccess && (
              <div className="flex flex-col items-center justify-center text-center py-6 animate-fadeIn">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-sm">
                  ✓
                </div>
                <h3 className="text-2xl font-bold font-dm text-gray-900 mb-2">
                  {t('orderSuccessTitle') || 'Дякуємо за замовлення!'}
                </h3>
                <p className="text-sm text-gray-600 max-w-[380px] mb-4">
                  {t('orderSuccessDesc') || 'Ваше замовлення успішно прийнято в обробку.'}
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-3.5 mb-6 text-center">
                  <div className="text-xs text-gray-500 uppercase font-semibold">{t('orderNumberLabel') || 'Номер замовлення'}</div>
                  <div className="text-xl font-bold font-mono text-[#104c9a] mt-0.5">{orderSuccess.orderId}</div>
                </div>

                <p className="text-xs text-gray-400 mb-8 max-w-[340px]">
                  {t('orderSuccessEmailNotice') || 'Деталі та статус відправлено на вашу електронну пошту.'}
                </p>

                <button 
                  onClick={handleClose}
                  className="w-full bg-[#ff7400] text-white font-bold py-3.5 rounded-xl hover:brightness-110 shadow-md transition-all text-sm"
                >
                  {t('backToCatalog') || 'Повернутися до покупок'}
                </button>
              </div>
            )}

          </div>

          {/* Footer Controls (when not on success screen) */}
          {!orderSuccess.isSuccess && (
            <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-3">
              {currentStep > 0 ? (
                <button 
                  type="button"
                  className="px-5 py-3 border border-gray-300 bg-white text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-100 transition-colors"
                  onClick={() => dispatch(setStep(currentStep - 1))}
                >
                  {t('prevStep') || 'Назад'}
                </button>
              ) : (
                <button 
                  type="button"
                  className="px-5 py-3 border border-gray-300 bg-white text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-100 transition-colors"
                  onClick={handleClose}
                >
                  {t('continueShopping') || 'Продовжити покупки'}
                </button>
              )}

              <button 
                type="button"
                className="flex-1 bg-[#ff7400] text-white font-bold text-xs sm:text-sm py-3 rounded-xl hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2"
                onClick={handleNext}
              >
                <span>{currentStep === 3 ? (t('placeOrder') || 'Оформити замовлення') : (t('nextStep') || 'Далі')}</span>
                {currentStep < 3 && <span>→</span>}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Auth Modal overlayed on top */}
      <Modal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)}>
        <Auth />
      </Modal>
    </>
  );
}
