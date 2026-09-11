import React from 'react'

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F8F9FA]">
      {/* children = menu/page.jsx або home-panel/page.jsx */}
      {children}
    </div>
  );
}
