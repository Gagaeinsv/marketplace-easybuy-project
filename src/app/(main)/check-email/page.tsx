'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function CheckEmailPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center">
        <div className="w-16 h-16 bg-blue-50 text-[#104c9a] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {t('checkEmailTitle') || 'Check Your Email'}
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          {t('checkEmailDesc') || 'We have sent a confirmation email to your address. Please follow the instructions in the email to complete your registration.'}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full py-3 px-4 bg-[#104c9a] text-white font-bold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all text-center"
          >
            {t('goToLogin') || 'Go to Login'}
          </Link>

          <Link
            href="/"
            className="w-full py-3 px-4 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all text-center"
          >
            {t('backToHome') || 'Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
