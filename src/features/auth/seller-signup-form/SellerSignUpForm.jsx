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
import Link from 'next/link';

const sellerRegistrationSchema = Yup.object().shape({
  storeName: Yup.string()
    .min(2, 'Назва магазину має містити принаймні 2 символи')
    .required('Обов’язкове поле'),
  email: Yup.string().email('Некоректний email').required('Обов’язкове поле'),
  number: Yup.string()
    .matches(/^\+\d{9,15}$/, 'Введіть номер у міжнародному форматі (напр. +380505222222)')
    .required('Обов’язкове поле'),
  password: Yup.string()
    .min(6, 'Пароль має бути не менше 6 символів')
    .required('Обов’язкове поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Паролі не збігаються')
    .required('Обов’язкове поле'),
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

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);
    try {
      const { agreement, privacy, confirmPassword, storeName, ...registrationData } = values;
      const result = await dispatch(register({
        ...registrationData,
        role: 'SELLER',
        storeName,
      }));

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
    <div className="w-full max-w-[420px] mx-auto p-1">
      {/* Title matching Figma frame 4125:33092 */}
      <h1 className="text-2xl md:text-3xl font-bold font-dm text-center text-[#104c9a] mb-6">
        Реєстрація продавця
      </h1>

      <Formik
        validationSchema={sellerRegistrationSchema}
        initialValues={{
          storeName: '',
          email: '',
          number: '',
          password: '',
          confirmPassword: '',
          agreement: false,
          privacy: false,
        }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col text-black gap-4">
          {/* Field 1: Store Name */}
          <div className="flex flex-col gap-1">
            <TextInput
              name="storeName"
              label="Назва магазину"
              placeholder="Введіть назву"
            />
            {/* Figma Help Guidelines Bullets */}
            <ul className="text-[10px] text-gray-500 space-y-0.5 mt-1 list-disc list-inside leading-tight bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <li>Ви можете вказати юридичну назву магазину. Наприклад, "ФОП Іванов", "ТОВ Айсберг".</li>
              <li>Ви не можете додавати посилання на сторонні сайти в назву.</li>
              <li>Не можна вказувати нікнейм з Instagram.</li>
              <li>Не можна вказувати номер телефону.</li>
              <li>Не можна вказувати назву торгової марки, якщо ви не володієте правами на неї.</li>
            </ul>
          </div>

          {/* Field 2: Email */}
          <TextInput
            name="email"
            label="Електронна пошта"
            placeholder="Введіть email"
          />

          {/* Field 3: Phone Number */}
          <TextInput
            name="number"
            label="Номер телефону"
            placeholder="+380 50 522 22 22"
          />

          {/* Field 4: Password */}
          <TextInput
            name="password"
            label="Пароль"
            placeholder="Введіть пароль"
            type="password"
            showPasswordToggle
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
            icon={showPassword ? <HideIcon /> : <ShowIcon />}
          />

          {/* Field 5: Repeat Password */}
          <TextInput
            name="confirmPassword"
            label="Повторіть пароль"
            placeholder="Повторіть пароль"
            type="password"
            showPasswordToggle
            showPassword={showConfirmPassword}
            togglePasswordVisibility={() => setShowConfirmPassword((prev) => !prev)}
            icon={showConfirmPassword ? <HideIcon /> : <ShowIcon />}
          />

          {/* Checkboxes matching Figma frame 4125:33092 */}
          <div className="flex flex-col gap-2 my-1 text-xs text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <Field type="checkbox" name="agreement" className="w-4 h-4 rounded border-gray-300 accent-[#104c9a]" />
              <span>Угода користувача</span>
            </label>
            <ErrorMessage name="agreement" component="span" className="text-red-500 text-[11px]" />

            <label className="flex items-center gap-2 cursor-pointer">
              <Field type="checkbox" name="privacy" className="w-4 h-4 rounded border-gray-300 accent-[#104c9a]" />
              <span>Політика конфіденційності</span>
            </label>
            <ErrorMessage name="privacy" component="span" className="text-red-500 text-[11px]" />
          </div>

          {/* Action Button matching Figma [ Next ] */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 font-bold rounded-lg text-white transition-all duration-300 shadow-md ${
              errorState ? 'bg-red-600' : 'bg-[#104c9a] hover:bg-[#071739]'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isLoading ? 'Завантаження...' : 'Далі'}
          </button>

          {/* Bottom Link matching Figma "Already have an account? Log in" */}
          <div className="text-center text-xs text-gray-500 mt-2">
            <span>Вже є акаунт? </span>
            <Link href="/login" className="text-[#104c9a] font-bold hover:underline">
              Увійти
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
