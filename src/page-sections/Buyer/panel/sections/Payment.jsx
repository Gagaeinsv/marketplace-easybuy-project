'use client';

import React from 'react';
import Image from 'next/image';

const Payment = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 px-4 animate-fadeIn">
      <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] relative mb-6">
        <Image src="/images/empty-cart.svg" alt="No payment methods" fill sizes="400px" className="object-contain" />
      </div>
      <h3 className="text-xl font-bold text-[#104c9a] mb-2 text-center">No payment methods</h3>
      <p className="text-sm text-[#104c9a] opacity-70 mb-8 text-center max-w-md">
        You don't have any saved payment methods yet. Add a credit or debit card for faster checkout in the future.
      </p>
      <button className="bg-gradient-to-b from-[#4b99ff] to-[#071739] text-white font-bold py-3 px-8 rounded-xl hover:brightness-110 shadow-md transition-all text-sm">
        Add Payment Method
      </button>
    </div>
  );
};

export default Payment;
