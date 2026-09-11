'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/catalog');
  }, [router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#104c9a] border-t-transparent"></div>
    </div>
  );
}
