'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import ArrLeftIcon from '@/components/icons/ArrLeftIcon';
import ArrRightIcon from '@/components/icons/ArrRightIcon';
import SliderArrow from '@/components/slider-arrow/SliderArrow';

export interface SmallSliderProps {
  images: string[];
  autoplaySpeed?: number;
  imageClassName?: string;
  isFixedSize?: boolean;
}

export default function SmallSlider({
  images,
  autoplaySpeed = 2000,
  imageClassName,
  isFixedSize = false,
}: SmallSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative flex overflow-visible w-full max-w-screen-xl mx-auto mb-16 px-4 lg:px-0 items-center justify-center">
      <SliderArrow
        direction="left"
        onClick={() => swiperRef.current?.slidePrev()}
        icon={<ArrLeftIcon />}
      />

      <SliderArrow
        direction="right"
        onClick={() => swiperRef.current?.slideNext()}
        icon={<ArrRightIcon />}
      />

      <Swiper
        loop={true}
        speed={3000}
        autoplay={{
          delay: autoplaySpeed,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 48,
          },
        }}
        grabCursor={true}
        className="w-full  h-[220px] items-center"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center overflow-visible h-auto"
          >
            <div
              className="
                flex items-center justify-center rounded-2xl md:rounded-[24px]
                bg-[#f1f1f1]
                w-full max-w-[100px] aspect-square lg:max-w-none lg:w-[184px] lg:h-[184px]
                transition-all duration-300 hover:shadow-md
              "
            >
              {isFixedSize ? (
                <Image
                  src={img}
                  alt={`brand-${index}`}
                  width={182}
                  height={184}
                  className={`w-[80%] max-w-[100px] h-auto object-contain ${imageClassName ?? ''}`}
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`brand-${index}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (min-width: 1024px) 50vw, 33vw"
                    className={`absolute w-full h-full ${imageClassName ?? ''}`}
                  />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
