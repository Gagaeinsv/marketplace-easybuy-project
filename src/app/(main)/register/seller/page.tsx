'use client';

import React from 'react';
import Modal from '@/components/modal/Modal';
import SignUpForm from '@/features/auth/signup-form/SignUpForm';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function SellerRegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const SignUpFormAny = SignUpForm as any;

  return (
    <div className="bg-[#f8f9fa] min-h-screen flex items-center justify-center py-12 px-4">
      <Modal isOpen={true} onClose={() => router.push('/')}>
        <div className="max-w-md w-full p-2">
          {/* Seller Registration Header Badge */}
          <div className="bg-gradient-to-r from-[#104c9a] to-[#071739] text-white p-4 rounded-xl mb-6 text-center">
            <div className="text-2xl mb-1">🚀</div>
            <h2 className="text-xl font-bold">Реєстрація продавця на EasyBuy</h2>
            <p className="text-xs opacity-90 mt-1">
              Відкрийте свій магазин та збільшуйте продажі вже сьогодні!
            </p>
          </div>

          <SignUpFormAny role="SELLER" />

          {/* Seller Advantages List */}
          <div className="mt-6 border-t pt-4 text-xs text-gray-500 flex justify-between gap-2 text-center">
            <div>
              <span className="font-bold text-[#104c9a] block">👥 Мільйони</span>
              <span>покупців</span>
            </div>
            <div className="border-x px-2">
              <span className="font-bold text-[#104c9a] block">⚡ Простий</span>
              <span>кабінет</span>
            </div>
            <div>
              <span className="font-bold text-[#104c9a] block">💳 Швидкі</span>
              <span>виплати</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
