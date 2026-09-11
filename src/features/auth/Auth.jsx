'use client';

import { useState } from 'react';
import SignUpForm from '@/features/auth/signup-form/SignUpForm.jsx';
import SignInForm from '@/features/auth/sign-in/SignInForm.jsx';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div>
      {isLogin ? (
        <SignInForm onToggleMode={() => setIsLogin(false)} />
      ) : (
        <SignUpForm onToggleMode={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default Auth;
