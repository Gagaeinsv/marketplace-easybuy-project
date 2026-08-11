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

const sellerRegistrationSchema = Yup.object().shape({
  storeName: Yup.string()
    .min(2, 'Назва магазину має містити принаймні 2 символи')
    .required('Назва магазину обов’язкова'),
  taxId: Yup.string()
    .matches(/^\d{8,10}$/, 'Введіть коректний код ЄДРПОУ (8 цифр) або ІПН (10 цифр)')
    .required('Код ЄДРПОУ / ІПН обов’язковий'),
  fullName: Yup.string()
    .min(3, 'Введіть повне ім’я контактної особи')
    .required('ПІБ контактної особи обов’язкове'),
  email: Yup.string().email('Некоректний email').required('Email обов’язковий'),
  number: Yup.string()
    .matches(/^\+\d{9,15}$/, 'Введіть номер у міжнародному форматі (напр. +380991234567)')
    .required('Номер телефону обов’язковий'),
  password: Yup.string()
    .min(6, 'Пароль має бути не менше 6 символів')
    .required('Пароль обов’язковий'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Паролі не збігаються')
    .required('Підтвердіть пароль'),
  agreement: Yup.boolean().oneOf([true], 'Потрібно прийняти Угоду користувача').required('Обов’язково'),
  privacy: Yup.boolean().oneOf([true], 'Потрібно прийняти Політику конфіденційності').required('Обов’язково'),
});

export default function SellerSignUpForm() {
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
      const { agreement, privacy, confirmPassword, ...registrationData } = values;
      const result = await dispatch(register({ ...registrationData, role: 'SELLER' }));

      if (register.fulfilled.match(result)) {
        toast.success('Реєстрацію продавця успішно відправлено!');
        router.push('/check-email');
      } else {
        toast.error('Помилка реєстрації продавця.');
        setErrorState(true);
        setTimeout(() => setErrorState(false), 3000);
      }
    } catch (error) {
      toast.error('Сталася помилка під час реєстрації');
      setErrorState(true);
      setTimeout(() => setErrorState(false), 3000);
    } finally {
      setIsLoading(false);
      actions.resetForm();
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto p-2">
      <h1 className="text-2xl md:text-3xl font-bold font-dm text-center text-[#104c9a] mb-6">
        Реєстрація продавця
      </h1>
      <Formik
        validationSchema={sellerRegistrationSchema}
        initialValues={{
          storeName: '',
          taxId: '',
          fullName: '',
          email: '',
          number: '',
          password: '',
          confirmPassword: '',
          agreement: false,
          privacy: false,
        }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col text-black gap-3">
          <TextInput
            name="storeName"
            label="Назва магазину / компанії"
            placeholder="ТОВ 'Мой Магазин' або ФОП..."
          />

          <TextInput
            name="taxId"
            label="Код ЄДРПОУ / ІПН"
            placeholder="12345678 або 1234567890"
          />

          <TextInput
            name="fullName"
            label="ПІБ контактної особи"
            placeholder="Шевченко Тарас Григорович"
          />

          <TextInput
            name="email"
            label={t('emailLabel') || 'Електронна пошта'}
            placeholder={t('emailPlaceholder') || 'example@email.com'}
          />

          <TextInput
            name="number"
            label={t('phoneNumberLabel') || 'Номер телефону'}
            placeholder="+380991234567"
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
            label={t('confirmPasswordLabel') || 'Підтвердіть пароль'}
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
              <span>Я приймаю <a href="#" className="text-[#104c9a] font-semibold hover:underline">Угоду користувача</a></span>
            </label>
            <ErrorMessage name="agreement" component="span" className="text-red-500 text-[11px]" />

            <label className="flex items-center gap-2 cursor-pointer">
              <Field type="checkbox" name="privacy" className="w-4 h-4 rounded border-gray-300 accent-[#104c9a]" />
              <span>Я погоджуюсь з <a href="#" className="text-[#104c9a] font-semibold hover:underline">Політикою конфіденційності</a></span>
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
            {isLoading ? 'Завантаження...' : 'Зареєструвати магазин'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}
