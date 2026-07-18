'use client';

import Promo from '@/page-sections/Home/Promo/Promo';
import FavoriteBrands from '@/page-sections/Home/FavoriteBrands/FavoriteBrands';
import UkrainianBrands from '@/page-sections/Home/UkrainianBrands/UkrainianBrands';
import Recommendations from '@/page-sections/Home/Recommendations/Recommendations';

const Home = () => {
  return (
    <div className="container px-4 mx-auto">
      <Promo />
      <FavoriteBrands />
      <UkrainianBrands />
      <Recommendations />
    </div>
  );
};

export default Home;
