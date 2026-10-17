'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import axios, { setAuthHeader } from '@/services/api/axiosClient';
import { useAppDispatch } from '@/store/hooks';
import { setAccessToken } from '@/store/auth/slice';
import toast from 'react-hot-toast';

export default function CheckEmailPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post('v1/auth/confirm', {
        code: trimmed,
        token: trimmed,
      });
      const accessToken = res.data?.token || res.data?.accessToken;
      const refreshToken = res.data?.refreshToken;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        setAuthHeader(accessToken);
        dispatch(setAccessToken(accessToken));
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      toast.success('Пошту успішно підтверджено!');
      router.push(accessToken ? '/' : '/login');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Невірний або прострочений код підтвердження');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center">
        <div className="w-16 h-16 bg-blue-50 text-[#104c9a] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {t('checkEmailTitle') || 'Перевірте вашу пошту'}
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed text-sm">
          {t('checkEmailDesc') || 'Ми надіслали лист із посиланням або кодом підтвердження на вашу електронну адресу. Перейдіть за посиланням у листі або введіть код нижче.'}
        </p>

        <form onSubmit={handleConfirmCode} className="mb-6 flex flex-col gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Код або токен з листа (необов'язково)"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:border-[#104c9a]"
          />
          {code.trim() && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-[#104c9a] text-white font-bold rounded-lg hover:brightness-110 transition-all text-sm cursor-pointer"
            >
              {isSubmitting ? 'Перевірка...' : 'Підтвердити код'}
            </button>
          )}
        </form>

        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full py-3 px-4 bg-[#104c9a] text-white font-bold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all text-center"
          >
            {t('goToLogin') || 'Перейти до входу'}
          </Link>

          <Link
            href="/"
            className="w-full py-3 px-4 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 active:scale-[0.98] transition-all text-center"
          >
            {t('backToHome') || 'На головну'}
          </Link>
        </div>
      </div>
    </div>
  );
}
