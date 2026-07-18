'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && process.env.NODE_ENV !== 'development') {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn && process.env.NODE_ENV !== 'development') {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
