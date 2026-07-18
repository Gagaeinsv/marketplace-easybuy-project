'use client';

import Home from '../page';
import Modal from '@/components/modal/Modal';
import SignInForm from '@/features/auth/sign-in/SignInForm';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <>
      <Home />
      <Modal isOpen={true} onClose={() => router.push('/')}>
        <SignInForm />
      </Modal>
    </>
  );
}

