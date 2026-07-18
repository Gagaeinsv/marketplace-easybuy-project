'use client';

import { useState } from 'react';

import ProfileIcon from '@/components/icons/ProfileIcon.jsx';
import Modal from '@/components/modal/Modal';
import Auth from '@/features/auth/Auth';
import { useLanguage } from '@/context/LanguageContext';

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <button 
        className="hidden lg:flex items-center text-sm font-semibold text-white hover:text-brand-400 transition-colors cursor-pointer whitespace-nowrap" 
        onClick={() => setOpen(true)}
      >
        <ProfileIcon className="mr-2.5 shrink-0" />
        <span className="text-left font-sans">
          {t('signUp')}
        </span>
      </button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Auth />
      </Modal>
    </>
  );
};

export default SignUp;
