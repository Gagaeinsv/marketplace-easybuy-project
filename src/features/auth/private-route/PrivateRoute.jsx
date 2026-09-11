'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isLoggedIn && process.env.NODE_ENV !== 'development') {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn && process.env.NODE_ENV !== 'development') {
    return (
      <div className="min-h-[400px] flex items-center justify-center text-sm font-semibold text-[#104c9a]">
        {t('loading') || 'Завантаження...'}
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
