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
    .matches(/^\+\d{9,15}$/, 'Введіть номер у міжнародному форматі (+380...)')
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

const SignUpForm = ({ role = 'CUSTOMER', onToggleMode }) => {
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
    <div className="w-full max-w-[400px] mx-auto font-dm">
      <h1 className="flex justify-center font-bold text-xl lg:text-2xl text-[#104c9a] mb-3">
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
        <Form className="flex flex-col text-black gap-2">
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

          <div className="flex flex-col gap-1.5 my-1 text-[11px] text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <Field type="checkbox" name="agreement" className="w-3.5 h-3.5 rounded border-gray-300 accent-[#104c9a]" />
              <span className="text-gray-700 leading-tight">{t('userAgreementLink') || 'Я приймаю Угоду користувача'}</span>
            </label>
            <ErrorMessage name="agreement" component="span" className="text-red-500 text-[10px]" />

            <label className="flex items-center gap-2 cursor-pointer">
              <Field type="checkbox" name="privacy" className="w-3.5 h-3.5 rounded border-gray-300 accent-[#104c9a]" />
              <span className="text-gray-700 leading-tight">{t('privacyPolicyLink') || 'Я погоджуюсь з Політикою конфіденційності'}</span>
            </label>
            <ErrorMessage name="privacy" component="span" className="text-red-500 text-[10px]" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 font-bold rounded-xl text-white text-sm transition-all duration-300 shadow-md mt-1 ${
              errorState ? 'bg-red-600' : 'bg-[#104c9a] hover:bg-[#071739]'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isLoading ? (t('loadingText') || 'Завантаження...') : (t('confirmBtn') || 'Зареєструватися')}
          </button>

          <div className="text-center text-xs text-gray-500 mt-1.5">
            <span>{t('alreadyHaveAccount') || 'Вже є акаунт?'} </span>
            {onToggleMode ? (
              <button 
                type="button" 
                onClick={onToggleMode}
                className="text-[#104c9a] font-bold hover:underline bg-transparent border-none cursor-pointer"
              >
                {t('logInAction') || 'Увійти'}
              </button>
            ) : (
              <Link href="/login" className="text-[#104c9a] font-bold hover:underline">
                {t('logInAction') || 'Увійти'}
              </Link>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpForm;
