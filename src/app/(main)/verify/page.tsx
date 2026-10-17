'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import axios, { setAuthHeader } from '@/services/api/axiosClient';
import { useAppDispatch } from '@/store/hooks';
import { setAccessToken } from '@/store/auth/slice';

function VerifyEmailComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = searchParams?.get('token');
  const code = searchParams?.get('code');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    async function verify() {
      if (!token && !code) {
        setStatus('error');
        return;
      }
      try {
        const res = await axios.post('v1/auth/confirm', {
          token: token || code,
          code: code || token,
        });
        const accessToken = res.data?.token || res.data?.accessToken;
        const refreshToken = res.data?.refreshToken;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          setAuthHeader(accessToken);
          dispatch(setAccessToken(accessToken));
        }
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        setStatus('success');
        toast.success('Email verified successfully!');
      } catch (e: any) {
        setStatus('error');
        toast.error(e?.response?.data?.message || 'Email verification failed.');
      }
    }
    verify();
  }, [token, code, dispatch]);

  return (
    <div className="text-center">
      {status === 'loading' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-[#104c9a]">Verifying your email...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#104c9a] mx-auto"></div>
        </div>
      )}
      {status === 'success' && (
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
          <p className="mb-6 text-gray-600">Your email has been verified. You can now log in.</p>
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-[#104c9a] text-white font-bold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
          >
            Go to Login
          </button>
        </div>
      )}
      {status === 'error' && (
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h2>
          <p className="mb-6 text-gray-600">The link might be invalid or expired.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Go Home
          </button>
        </div>
      )}
    </div>
  );
}

import Home from '../page';
import Modal from '@/components/modal/Modal';

export default function VerifyPage() {
  const router = useRouter();
  return (
    <>
      <Home />
      <Modal isOpen={true} onClose={() => router.push('/')}>
        <Suspense fallback={<div className="text-center">Loading verification page...</div>}>
          <VerifyEmailComponent />
        </Suspense>
      </Modal>
    </>
  );
}
