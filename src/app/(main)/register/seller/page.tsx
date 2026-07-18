'use client';

import Home from '../../page';
import Modal from '@/components/modal/Modal';
import SignUpForm from '@/features/auth/signup-form/SignUpForm';
import { useRouter } from 'next/navigation';

export default function SellerRegisterPage() {
  const router = useRouter();
  const SignUpFormAny = SignUpForm as any;

  return (
    <>
      <Home />
      <Modal isOpen={true} onClose={() => router.push('/')}>
        <SignUpFormAny role="SELLER" />
      </Modal>
    </>
  );
}

