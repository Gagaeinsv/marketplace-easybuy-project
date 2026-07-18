'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '@/components/input/TextInput';
import HideIcon from '@/components/icons/HideIcon';
import ShowIcon from '@/components/icons/ShowIcon';
import toast from 'react-hot-toast';

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(50, 'Password cannot exceed 50 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams?.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any, actions: any) => {
    setIsLoading(true);
    try {
      // Simulate API call for resetting password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Password reset successfully!');
      router.push('/login');
    } catch (e) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="flex justify-center font-dm font-medium text-[32px] lg:text-[40px] mb-2 text-center text-[#104c9a]">
        New Password
      </h1>
      <p className="text-sm text-center mb-6 text-gray-500">
        Please enter and confirm your new password below.
      </p>
      <Formik
        validationSchema={resetPasswordSchema}
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col text-black">
          <TextInput
            name="password"
            label="New Password"
            placeholder="Enter new password"
            type="password"
            showPasswordToggle
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword((prev) => !prev)}
            icon={showPassword ? <HideIcon /> : <ShowIcon />}
          />

          <TextInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm new password"
            type="password"
            showPasswordToggle
            showPassword={showConfirmPassword}
            togglePasswordVisibility={() => setShowConfirmPassword((prev) => !prev)}
            icon={showConfirmPassword ? <HideIcon /> : <ShowIcon />}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-bold rounded-lg px-4 py-3 text-white bg-[#104c9a] hover:brightness-110 active:scale-[0.98] transition-all border-none mb-3 cursor-pointer h-12 flex items-center justify-center"
          >
            {isLoading ? 'Resetting...' : 'Confirm'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

import Home from '../page';
import Modal from '@/components/modal/Modal';

export default function ResetPasswordPage() {
  const router = useRouter();
  return (
    <>
      <Home />
      <Modal isOpen={true} onClose={() => router.push('/')}>
        <Suspense fallback={<div className="text-center">Loading page...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </Modal>
    </>
  );
}
