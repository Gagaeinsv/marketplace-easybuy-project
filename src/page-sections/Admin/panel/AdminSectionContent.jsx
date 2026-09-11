'use client';

import React from 'react';
import Overview from '../sections/Overview';
import ShopsModeration from '../sections/ShopsModeration';
import GoodsModeration from '../sections/GoodsModeration';
import TicketsComplaints from '../sections/TicketsComplaints';
import UsersManagement from '../sections/UsersManagement';
import SystemSettings from '../sections/SystemSettings';

export default function AdminSectionContent({ activeSection, setActiveSection }) {
  switch (activeSection) {
    case 'overview':
      return <Overview setActiveSection={setActiveSection} />;
    case 'shops':
      return <ShopsModeration />;
    case 'goods':
      return <GoodsModeration />;
    case 'tickets':
      return <TicketsComplaints />;
    case 'users':
      return <UsersManagement />;
    case 'settings':
      return <SystemSettings />;
    default:
      return <Overview setActiveSection={setActiveSection} />;
  }
}
