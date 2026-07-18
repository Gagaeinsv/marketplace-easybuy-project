'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsCheckoutOpen, closeCheckout, selectCheckoutStep, setStep, updateContactData, selectCheckoutContactData } from '@/store/checkout/slice';
import Button from '@/components/ui/Button/Button';
import { useLanguage } from '@/context/LanguageContext';
import Modal from '@/components/modal/Modal';
import Auth from '@/features/auth/Auth';

export default function CheckoutModal() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCheckoutOpen);
  const currentStep = useAppSelector(selectCheckoutStep);
  const contactData = useAppSelector(selectCheckoutContactData);
  const { t } = useLanguage() as any;

  if (!isOpen) return null;

  const steps = [t('stepContacts'), t('stepDelivery'), t('stepDiscounts'), t('stepPayment')];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateContactData({ [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      dispatch(setStep(currentStep + 1));
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
        onClick={() => dispatch(closeCheckout())}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none">
        <div 
          className="bg-white rounded-[24px] w-full max-w-[500px] max-h-[90vh] flex flex-col shadow-2xl relative pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="pt-8 pb-4 relative flex justify-center items-center">
            <h2 className="text-[32px] font-bold font-dm text-[#104c9a]">{t('checkoutTitle')}</h2>
            
            <button 
              onClick={() => dispatch(closeCheckout())}
              className="absolute right-6 top-6 text-[#ff6b00] hover:bg-orange-50 w-8 h-8 flex items-center justify-center rounded-full border-2 border-[#ff6b00] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13"/>
              </svg>
            </button>
          </div>

          {/* Stepper */}
          <div className="px-6 py-2 relative mb-6">
            <div className="flex justify-between items-center relative z-10">
              {steps.map((step, index) => (
                <div key={step} className="flex flex-col items-center relative">
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                    currentStep === index 
                      ? 'bg-white text-[#104c9a] border-gray-300 shadow-sm' 
                      : currentStep > index 
                        ? 'bg-[#f0f0f0] text-gray-800 border-transparent'
                        : 'bg-[#f0f0f0] text-gray-400 border-transparent'
                  }`}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
            {/* Connecting line */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-gray-300 z-0 -translate-y-1/2"></div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-10 pb-8 custom-scrollbar">
            {currentStep === 0 && (
              <div className="animate-fade-in flex flex-col">
                
                {/* Auth Banner */}
                <div className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.1)] mb-6">
                  <p className="text-[13px] text-gray-800 font-bold mb-4">{t('authDesc')}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      className="bg-[#104c9a] text-white font-bold text-xs rounded-lg flex-1 py-3 hover:bg-blue-800 transition-colors" 
                      onClick={() => setIsAuthOpen(true)}
                    >
                      {t('loginToCabinet')}
                    </button>
                    <button 
                      className="bg-[#2080c0] text-white font-bold text-xs rounded-lg flex-1 py-3 hover:bg-blue-500 transition-colors"
                    >
                      {t('continueWithoutAuth')}
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 ml-1">{t('nameLabel')}</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder={t('namePlaceholder')}
                      value={contactData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#104c9a] placeholder-gray-300 focus:outline-none focus:border-[#104c9a] transition-all"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 ml-1">{t('phoneNumberLabel')}</label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder={t('phoneNumberPlaceholder')}
                      value={contactData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#104c9a] placeholder-gray-300 focus:outline-none focus:border-[#104c9a] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 ml-1">{t('emailLabel')}</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder={t('emailPlaceholder')}
                      value={contactData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-[#104c9a] placeholder-gray-300 focus:outline-none focus:border-[#104c9a] transition-all"
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    className="bg-[#2080c0] text-white font-bold text-sm rounded-lg flex-1 py-3.5 hover:bg-blue-500 transition-colors"
                    onClick={() => dispatch(closeCheckout())}
                  >
                    {t('continueShopping')}
                  </button>
                  <button 
                    className="bg-[#ff6b00] text-white font-bold text-sm rounded-lg flex-1 py-3.5 hover:brightness-110 transition-all"
                    onClick={handleNext}
                  >
                    {currentStep === 0 ? t('placeOrder') : t('placeOrder')}
                  </button>
                </div>
              </div>
            )}
            
            {currentStep > 0 && (
              <div className="animate-fade-in flex flex-col items-center justify-center py-20 text-center">
                <h3 className="text-2xl font-bold text-gray-400 mb-2">Step {steps[currentStep]}</h3>
                <button 
                  onClick={() => dispatch(setStep(0))} 
                  className="mt-6 bg-white text-[#104c9a] border border-[#104c9a] font-bold rounded-lg px-6 py-3 hover:bg-blue-50 transition-colors"
                >
                  Back to Contacts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Auth Modal overlayed on top */}
      <Modal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)}>
        <Auth />
      </Modal>
    </>
  );
}
