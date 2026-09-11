'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '@/components/input/TextInput';
import HideIcon from '@/components/icons/HideIcon';
import ShowIcon from '@/components/icons/ShowIcon';
import toast from 'react-hot-toast';
import { useLanguage } from '@/context/LanguageContext';
import Home from '../page';
import Modal from '@/components/modal/Modal';

function ResetPasswordForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetPasswordSchema = useMemo(() => {
    return Yup.object().shape({
      password: Yup.string()
        .min(6, t('passwordReqMin') || 'Password must be at least 6 characters long')
        .max(50, t('passwordReqMax') || 'Password cannot exceed 50 characters')
        .matches(/[a-z]/, t('passwordReqLower') || 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, t('passwordReqUpper') || 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, t('passwordReqNumber') || 'Password must contain at least one number')
        .matches(/[^a-zA-Z0-9]/, t('passwordReqSpecial') || 'Password must contain at least one special character')
        .required(t('passwordReqRequired') || 'Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], t('passwordReqMatch') || 'Passwords must match')
        .required(t('confirmPasswordRequired') || 'Please confirm your password'),
    });
  }, [t]);

  const handleSubmit = async (values: any, actions: any) => {
    setIsLoading(true);
    try {
      // Simulate API call for resetting password
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success(t('passwordResetSuccess') || 'Пароль успішно відновлено!');
      router.push('/login');
    } catch (e) {
      toast.error(t('registrationError') || 'Сталася помилка. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="font-dm">
      <h1 className="flex justify-center font-medium text-[28px] lg:text-[36px] mb-2 text-center text-[#104c9a]">
        {t('newPasswordTitle') || 'Відновлення паролю'}
      </h1>
      <p className="text-sm text-center mb-6 text-gray-500">
        {t('enterNewPasswordSub') || 'Введіть новий пароль для вашого облікового запису.'}
      </p>
      <Formik
        validationSchema={resetPasswordSchema}
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col text-black">
          <TextInput
            name="password"
            label={t('newPasswordLabel') || 'Новий пароль'}
            placeholder={t('newPasswordPlaceholder') || 'Введіть новий пароль'}
            type="password"
            showPasswordToggle
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
            icon={showPassword ? <HideIcon /> : <ShowIcon />}
          />

          <TextInput
            name="confirmPassword"
            label={t('confirmNewPasswordLabel') || 'Підтвердіть новий пароль'}
            placeholder={t('confirmNewPasswordPlaceholder') || 'Підтвердіть новий пароль'}
            type="password"
            showPasswordToggle
            showPassword={showConfirmPassword}
            togglePasswordVisibility={() => setShowConfirmPassword((prev) => !prev)}
            icon={showConfirmPassword ? <HideIcon /> : <ShowIcon />}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-bold rounded-lg px-4 py-3 text-white bg-[#104c9a] hover:brightness-110 active:scale-[0.98] transition-all border-none mb-3 cursor-pointer h-12 flex items-center justify-center shadow-md"
          >
            {isLoading ? (t('resetting') || 'Оновлення...') : (t('confirm') || 'Підтвердити')}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const { t } = useLanguage();
  
  return (
    <>
      <Home />
      <Modal isOpen={true} onClose={() => router.push('/')}>
        <Suspense fallback={<div className="text-center p-6 text-gray-500">{t('loadingText') || 'Завантаження...'}</div>}>
          <ResetPasswordForm />
        </Suspense>
      </Modal>
    </>
  );
}
