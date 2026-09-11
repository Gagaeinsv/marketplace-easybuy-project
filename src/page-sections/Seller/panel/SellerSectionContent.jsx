'use client';

import React from 'react';
import HomePanel from '../sections/HomePanel';
import Products from '../sections/Products';
import Orders from '../sections/Orders';
import Chat from '../sections/Chat';
import Reviews from '../sections/Reviews';
import Notifications from '../sections/Notifications';
import Settings from '../sections/Settings';
import Managers from '../sections/Managers';
import Promotions from '../sections/Promotions';
import Support from '../sections/Support';

const SellerSectionContent = ({ activeSection }) => {
  switch (activeSection) {
    case 'home':
      return <HomePanel />;
    case 'products':
      return <Products />;
    case 'orders':
      return <Orders />;
    case 'chat':
      return <Chat />;
    case 'reviews':
      return <Reviews />;
    case 'notifications':
      return <Notifications />;
    case 'settings':
      return <Settings />;
    case 'managers':
      return <Managers />;
    case 'promotions':
      return <Promotions />;
    case 'support':
      return <Support />;
    default:
      return <HomePanel />;
  }
};

export default SellerSectionContent;
