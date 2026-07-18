'use client';

import { Slide } from '@/types/Slider';
import LargeSlider from '@/components/large-slider/LargeSlider';
import { useLanguage } from '@/context/LanguageContext';

export default function Promo() {
  const { t } = useLanguage() as any;

  const slides: Slide[] = [
    {
      id: 1,
      image: '/img/1.jpg',
      title: t('promoTitle1'),
      description: t('promoDesc1'),
    },
    {
      id: 2,
      image: '/img/2.jpg',
      title: t('promoTitle2'),
      description: t('promoDesc2'),
    },
    {
      id: 3,
      image: '/img/3.jpg',
      title: t('promoTitle3'),
      description: t('promoDesc3'),
    },
  ];

  return (
    <section className="pt-6 lg:pt-[56px]">
      <LargeSlider slides={slides} />
    </section>
  );
}
