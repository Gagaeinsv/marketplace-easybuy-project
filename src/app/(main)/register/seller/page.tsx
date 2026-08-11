'use client';

import React from 'react';
import Modal from '@/components/modal/Modal';
import SellerSignUpForm from '@/features/auth/seller-signup-form/SellerSignUpForm';
import { useRouter } from 'next/navigation';
import Home from '../../page';

export default function SellerRegisterPage() {
  const router = useRouter();

  return (
    <>
      <Home />
      <Modal isOpen={true} onClose={() => router.push('/')}>
        <SellerSignUpForm />
      </Modal>
    </>
  );
}
