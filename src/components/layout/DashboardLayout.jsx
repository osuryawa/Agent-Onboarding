'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Pass the sidebar collapsed state to the Sidebar component
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    // For debugging
    console.log("DashboardLayout mounted, currentUser:", currentUser, "loading:", loading);
    
    if (!loading && !currentUser) {
      console.log("Redirecting to login");
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // For debugging - don't redirect yet
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Not Authenticated</h1>
          <p className="mb-4">You need to log in to access this page.</p>
          <button 
            onClick={() => router.push('/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
        <main 
          className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}
        >
          <div className="p-6 h-full overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
