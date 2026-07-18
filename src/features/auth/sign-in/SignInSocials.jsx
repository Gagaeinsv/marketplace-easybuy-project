'use client';

import GoogleAuthIcon from '@/components/icons/GoogleAuthIcon';
import FacebookAuthIcon from '@/components/icons/FacebookAuthIcon';
import AppleAuthIcon from '@/components/icons/AppleAuthIcon';
import ArrRAuth from '@/components/icons/ArrRAuth';

export default function SignInSocials() {
  const providers = [
    { name: 'Google', icon: GoogleAuthIcon, href: '#' },
    { name: 'Facebook', icon: FacebookAuthIcon, href: '#' },
    { name: 'Apple', icon: AppleAuthIcon, href: '#' },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center my-6 text-[#787e86] text-sm font-medium">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-3">Or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex flex-col gap-3">
        {providers.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.name}
              type="button"
              className="flex items-center justify-between w-full h-12 px-4 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200/50 active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Icon />
                <span className="font-dm font-medium text-sm text-[#1f1f1f]">{p.name}</span>
              </div>
              <ArrRAuth />
            </button>
          );
        })}
      </div>
    </div>
  );
}
