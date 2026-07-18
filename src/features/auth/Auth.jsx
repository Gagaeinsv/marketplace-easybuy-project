'use client';

import { useState } from 'react';
import SignUpForm from '@/features/auth/signup-form/SignUpForm.jsx';
import SignInForm from '@/features/auth/sign-in/SignInForm.jsx';
import { useLanguage } from '@/context/LanguageContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { t } = useLanguage();
  
  return (
    <>
      {isLogin ? (
        <>
          <SignInForm />
          <div className="flex gap-3 justify-end ">
            <p className="text-[#08034b]">{t('dontHaveAccount')}</p>
            <button className="text-[#2080c0] underline" onClick={() => setIsLogin(false)}>
              {t('signUpAction')}
            </button>
          </div>
        </>
      ) : (
        <>
          <SignUpForm />
          <div className="flex gap-3 justify-end ">
            <p className="text-[#08034b]">{t('alreadyHaveAccount')}</p>
            <button
              className="text-[#2080c0] underline lg:cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              {t('logInAction')}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Auth;
