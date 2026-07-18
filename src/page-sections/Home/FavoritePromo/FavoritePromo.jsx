import Image from 'next/image.js';
import PumaIcon from '@/components/icons/PumaIcon.jsx';

export default function FavoritePromo() {
  return (
    <section className="bg-[#fff5ee] rounded-3xl shadow-sm lg:rounded-[24px] mx-auto overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-center p-6 lg:py-[77px] lg:px-[143px]">
        <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
          <p className="text-[56px] text-center bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent font-zen lg:text-[160px] leading-none mb-4">
            -30%
          </p>
          <PumaIcon />
        </div>
        <div className="w-full flex justify-center lg:w-auto">
          <Image src="/img/cross puma.png" alt="Puma Shoe" width={809} height={439} className="w-full max-w-[280px] md:max-w-[400px] lg:max-w-[809px] h-auto object-contain" />
        </div>
      </div>
    </section>
  );
}
