'use client';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '@/components/input/TextInput';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLanguage } from '@/context/LanguageContext';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function ForgotPasswordForm({ onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);
    try {
      // Simulate API call for password reset request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Password reset link sent to your email.');
      actions.resetForm();
    } catch (e) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="flex justify-center font-dm font-medium text-[32px] lg:text-[40px] mb-2 text-center">
        {t('resetPasswordTitle')}
      </h1>
      <p className="text-sm text-center mb-6 text-gray-500">
        {t('resetPasswordSub')}
      </p>
      <Formik
        validationSchema={forgotPasswordSchema}
        initialValues={{ email: '' }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col text-black">
          <TextInput name="email" label={t('emailLabel')} placeholder={t('emailPlaceholder')} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-bold rounded-lg px-4 py-3 text-white bg-brand-700 hover:bg-brand-400 transition-colors border-none mb-3 cursor-pointer h-12 flex items-center justify-center"
          >
            {isLoading ? t('sendingText') : t('sendResetLinkBtn')}
          </button>
          
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="text-center text-sm font-semibold text-blue-500 hover:underline cursor-pointer bg-transparent border-none mt-2"
            >
              {t('backToLoginBtn')}
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
}
