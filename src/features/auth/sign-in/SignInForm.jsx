'use client';

import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import HideIcon from '@/components/icons/HideIcon.tsx';
import ShowIcon from '@/components/icons/ShowIcon.tsx';
import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/store/auth/operations';
import TextInput from '@/components/input/TextInput';
import { useLanguage } from '@/context/LanguageContext';

const SignInForm = ({ onToggleMode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);

  const loginSchema = useMemo(() => {
    return Yup.object().shape({
      email: Yup.string()
        .email(t('registrationFailed') || 'Некоректний email')
        .required(t('passwordReqRequired') || 'Обов’язкове поле'),
      password: Yup.string()
        .min(6, t('passwordReqMin') || 'Пароль має бути не менше 6 символів')
        .max(50, t('passwordReqMax') || 'Пароль не може перевищувати 50 символів')
        .required(t('passwordReqRequired') || 'Обов’язкове поле'),
    });
  }, [t]);

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);
    try {
      const result = await dispatch(login(values));

      if (result.meta.requestStatus === 'fulfilled') {
        toast.success(t('loginSuccess') || 'Вхід успішний');
        router.push('/');
      } else {
        toast.error(t('loginFailed') || 'Невірний email або пароль');
        setErrorState(true);

        setTimeout(() => {
          setErrorState(false);
        }, 3000);
      }
    } catch (error) {
      toast.error(t('loginError') || 'Сталася помилка під час входу');
      setErrorState(true);
      setTimeout(() => {
        setErrorState(false);
      }, 3000);
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto p-1 font-dm">
      <h1 className="flex justify-center font-bold text-2xl lg:text-3xl text-[#104c9a] mb-6">
        {t('logInTitle') || 'Вхід'}
      </h1>
      <Formik
        validationSchema={loginSchema}
        initialValues={{ email: '', password: '', rememberMe: false }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col text-black gap-3">
          <TextInput 
            name="email" 
            label={t('emailLabel') || 'Електронна пошта'} 
            placeholder={t('emailPlaceholder') || 'example@email.com'} 
          />

          <TextInput
            name="password"
            label={t('passwordLabel') || 'Пароль'}
            placeholder={t('passwordPlaceholder') || '••••••••'}
            type="password"
            showPasswordToggle
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
            icon={showPassword ? <HideIcon /> : <ShowIcon />}
          />

          <div className="flex items-center justify-between my-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <Field 
                type="checkbox" 
                name="rememberMe" 
                id="rememberMe" 
                className="w-4 h-4 rounded border-gray-300 accent-[#104c9a]" 
              />
              <span className="text-xs text-gray-600 font-medium">
                {t('rememberMe') || 'Запам’ятати мене'}
              </span>
            </label>

            <Link 
              href="/reset-password" 
              className="text-xs text-[#104c9a] font-semibold hover:underline"
            >
              {t('forgotPassword') || 'Забули пароль?'}
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-3 font-bold rounded-xl text-white transition-all duration-300 shadow-md mt-2
              ${errorState ? 'bg-red-600' : 'bg-[#104c9a] hover:bg-[#071739]'}
              ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
              border-none
            `}
          >
            {isLoading ? (t('loadingText') || 'Завантаження...') : (t('logInAction') || 'Увійти')}
          </button>

          <div className="text-center text-xs text-gray-500 mt-3">
            <span>{t('dontHaveAccount') || 'Немає акаунту?'} </span>
            {onToggleMode ? (
              <button 
                type="button" 
                onClick={onToggleMode}
                className="text-[#104c9a] font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                {t('signUpAction') || 'Зареєструватися'}
              </button>
            ) : (
              <Link href="/register/buyer" className="text-[#104c9a] font-bold hover:underline">
                {t('signUpAction') || 'Зареєструватися'}
              </Link>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignInForm;
