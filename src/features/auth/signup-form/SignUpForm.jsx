'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import HideIcon from '@/components/icons/HideIcon.tsx';
import ShowIcon from '@/components/icons/ShowIcon.tsx';
import { useDispatch } from 'react-redux';
import { register } from '@/store/auth/operations';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import TextInput from '@/components/input/TextInput';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

const registrationSchema = Yup.object().shape({
  email: Yup.string().email('Некоректна електронна пошта').required('Обов’язкове поле'),
  number: Yup.string()
    .matches(/^\+\d{9,15}$/, 'Введіть номер у міжнародному форматі (напр. +380991234567)')
    .required('Обов’язкове поле'),
  password: Yup.string()
    .min(6, 'Пароль має бути не менше 6 символів')
    .max(50, 'Пароль не може перевищувати 50 символів')
    .required('Обов’язкове поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Паролі не збігаються')
    .required('Підтвердіть пароль'),
  agreement: Yup.boolean().oneOf([true], 'Потрібно прийняти Угоду користувача').required('Обов’язково'),
  privacy: Yup.boolean().oneOf([true], 'Потрібно прийняти Політику конфіденційності').required('Обов’язково'),
});

const SignUpForm = ({ role = 'CUSTOMER' }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);
    try {
      const { agreement, privacy, ...registrationData } = values;
      const result = await dispatch(register({ ...registrationData, role }));

      if (register.fulfilled.match(result)) {
        router.push('/check-email');
      } else {
        toast.error(t('registrationFailed') || 'Помилка реєстрації.');
        setErrorState(true);

        setTimeout(() => {
          setErrorState(false);
        }, 3000);
      }
    } catch (error) {
      toast.error(t('registrationError') || 'Сталася помилка під час реєстрації');
      setErrorState(true);

      setTimeout(() => {
        setErrorState(false);
      }, 3000);
    } finally {
      setIsLoading(false);
      actions.resetForm();
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto p-1">
      <h1 className="flex justify-center font-dm font-bold text-2xl lg:text-3xl text-[#104c9a] mb-6">
        {t('signUpTitle') || 'Реєстрація'}
      </h1>
      <Formik
        validationSchema={registrationSchema}
        initialValues={{
          email: '',
          number: '',
          password: '',
          confirmPassword: '',
          agreement: false,
          privacy: false,
          role: role,
        }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col text-black gap-3">
          <TextInput
            name="email"
            label={t('emailLabel') || 'Електронна пошта'}
            placeholder={t('emailPlaceholder') || 'example@email.com'}
          />

          <TextInput
            name="number"
            label={t('phoneNumberLabel') || 'Номер телефону'}
            placeholder={t('phoneNumberPlaceholder') || '+380991234567'}
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

          <TextInput
            name="confirmPassword"
            label={t('confirmPasswordLabel') || 'Підтвердження паролю'}
            placeholder={t('confirmPasswordPlaceholder') || '••••••••'}
            type="password"
            showPasswordToggle
            showPassword={showConfirmPassword}
            togglePasswordVisibility={() => setShowConfirmPassword((prev) => !prev)}
            icon={showConfirmPassword ? <HideIcon /> : <ShowIcon />}
          />

          <div className="flex flex-col gap-2 my-2 text-xs text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <Field type="checkbox" name="agreement" className="w-4 h-4 rounded border-gray-300 accent-[#104c9a]" />
              <span className="text-gray-700">{t('userAgreementLink') || 'Я приймаю Угоду користувача'}</span>
            </label>
            <ErrorMessage name="agreement" component="span" className="text-red-500 text-[11px]" />

            <label className="flex items-center gap-2 cursor-pointer">
              <Field type="checkbox" name="privacy" className="w-4 h-4 rounded border-gray-300 accent-[#104c9a]" />
              <span className="text-gray-700">{t('privacyPolicyLink') || 'Я погоджуюсь з Політикою конфіденційності'}</span>
            </label>
            <ErrorMessage name="privacy" component="span" className="text-red-500 text-[11px]" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-bold rounded-xl text-white transition-all duration-300 shadow-md ${
              errorState ? 'bg-red-600' : 'bg-[#104c9a] hover:bg-[#071739]'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isLoading ? (t('loadingText') || 'Завантаження...') : (t('confirmBtn') || 'Зареєструватися')}
          </button>

          <div className="text-center text-xs text-gray-500 mt-2">
            <span>{t('alreadyHaveAccount') || 'Вже є акаунт?'} </span>
            <Link href="/login" className="text-[#104c9a] font-bold hover:underline">
              {t('logInAction') || 'Увійти'}
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpForm;
