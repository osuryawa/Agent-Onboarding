'use client';

import React from 'react';
import DashboardHome from './DashboardHome';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function Dashboard() {
  console.log("Dashboard page component rendering");
  
  return (
    <DashboardLayout>
      <DashboardHome />
    </DashboardLayout>
  );
}