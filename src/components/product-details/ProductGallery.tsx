'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // If no images are provided, use a generic placeholder
  const displayImages = images.length > 0 ? images : ['https://placehold.co/600x800?text=No+Image'];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image */}
      <div className="relative w-full aspect-[8/9] bg-[#f0f0f0] rounded-[20px] overflow-hidden flex justify-center items-center">
        <Image 
          src={displayImages[activeIndex]} 
          alt="Product Main Image" 
          fill 
          className="object-cover mix-blend-multiply" 
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar w-full">
        {displayImages.slice(0, 3).map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-[30%] aspect-square rounded-xl overflow-hidden border-2 transition-all bg-gray-100 ${
              activeIndex === idx ? 'border-[#104c9a]' : 'border-transparent'
            }`}
          >
            <Image src={img} alt={`Thumbnail ${idx + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover mix-blend-multiply" />
          </button>
        ))}
      </div>
      
      <button className="text-[#104c9a] text-sm font-bold underline mt-1 text-left hover:text-[#ff6b00] transition-colors w-fit">
        Show More
      </button>
    </div>
  );
}
