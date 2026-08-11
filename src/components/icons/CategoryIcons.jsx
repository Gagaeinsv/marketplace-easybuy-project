import React from 'react';

export const CategoryIcon = ({ name, className = 'w-5 h-5' }) => {
  const icons = {
    // Women's clothing - Dress/Feminine Fashion Icon
    women: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2.5 2.5 0 0 0-2.5 2.5c0 .75.33 1.42.85 1.9L4 11v2h2.5l1.5 9h8l1.5-9H20v-2l-6.35-4.6A2.5 2.5 0 0 0 12 2z" />
        <path d="M9 11l3-5 3 5" />
      </svg>
    ),

    // Men's clothing - Shirt/Collar Icon
    men: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4l6 3 6-3v4l-6 3-6-3V4z" />
        <path d="M6 4L2 7v13h20V7l-4-3" />
        <path d="M12 10v10" />
      </svg>
    ),

    // Children's clothing - Cute T-Shirt/Baby Icon
    children: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3a3 3 0 0 0 8 0l3 3-2.5 3.5L18 20H6l1.5-10.5L5 6l3-3z" />
        <circle cx="12" cy="11" r="1" fill="currentColor" />
        <circle cx="12" cy="15" r="1" fill="currentColor" />
      </svg>
    ),

    // Accessories - Handbag/Purse Icon
    accessories: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9V6a4 4 0 0 1 8 0v3" />
        <rect x="3" y="9" width="18" height="12" rx="3" />
        <path d="M12 13v2" />
      </svg>
    ),

    // Technology & Electronics - Laptop & Phone Icon
    tech: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="12" rx="2" />
        <path d="M2 20h20" />
        <line x1="12" y1="16" x2="12" y2="20" />
      </svg>
    ),

    // Home - House Icon
    home: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9.5z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),

    // Beauty & Health - Sparkle/Cosmetics Icon
    beauty: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l2.2 4.8L19 9l-3.8 3.5L16.2 18 12 15.3 7.8 18l1-5.5L5 9l4.8-1.2L12 3z" />
        <path d="M19 18l1.5 3L22 22l-1-1.5L22 19l-1.5.5L19 18z" />
      </svg>
    ),

    // Sports & Outdoors - Dumbbell/Basketball Icon
    sports: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 1 9 9" />
        <path d="M12 21a9 9 0 0 1-9-9" />
        <line x1="3" y1="12" x2="21" y2="12" />
      </svg>
    ),

    // Pets - Paw Print Icon
    pets: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="8.5" r="2" />
        <circle cx="17" cy="8.5" r="2" />
        <circle cx="12" cy="5.5" r="2" />
        <path d="M12 13c-3 0-5.5 1.5-5.5 4.5 0 2 1.5 3.5 3.5 3.5 1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 3.5-1.5 3.5-3.5 0-3-2.5-4.5-5.5-4.5z" />
      </svg>
    ),

    // Brands Directory - Tag/Badge Icon
    brands: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="3" />
      </svg>
    ),

    // Other - Grid/More Icon
    other: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  };

  return icons[name] || icons['other'];
};
