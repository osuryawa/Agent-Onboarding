'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { currentUser, logout } = useAuth();

  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      {
        name: 'Dashboard',
        href: '/dashboard',
      },
      {
        name: 'Profile',
        href: '/dashboard/profile',
      },
    ];

    const agentItems = [
      {
        name: 'Leads',
        href: '/dashboard/leads',
      },
      {
        name: 'Customers',
        href: '/dashboard/customers',
      },
      {
        name: 'Tasks',
        href: '/dashboard/tasks',
      },
      {
        name: 'Performance',
        href: '/dashboard/performance',
      },
      {
        name: 'Notifications',
        href: '/dashboard/notifications',
      },
    ];

    const supervisorItems = [
      {
        name: 'Team',
        href: '/dashboard/team',
      },
    ];

    const adminItems = [
      {
        name: 'Settings',
        href: '/dashboard/settings',
      },
    ];

    // Combine items based on user role
    let items = [...baseItems];

    if (currentUser) {
      if (currentUser.role === 'agent' || currentUser.role === 'supervisor') {
        items = [...items, ...agentItems];
      }

      if (currentUser.role === 'supervisor' || currentUser.role === 'admin') {
        items = [...items, ...supervisorItems];
      }

      if (currentUser.role === 'admin') {
        items = [...items, ...adminItems];
      }
    }

    return items;
  };

  const navItems = getNavItems();

  return (
    <div
      className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      } fixed left-0 top-0 z-10`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <div className="font-bold text-xl">Agent Portal</div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1 rounded-full hover:bg-gray-700 ${
            collapsed ? 'mx-auto' : ''
          }`}
        >
          {collapsed ? (
            <span>→</span>
          ) : (
            <span>←</span>
          )}
        </button>
      </div>

      {currentUser && (
        <div className={`p-4 border-b border-gray-700 ${collapsed ? 'text-center' : ''}`}>
          {!collapsed ? (
            <>
              <div className="font-medium">{currentUser.name}</div>
              <div className="text-sm text-gray-400 capitalize">{currentUser.role}</div>
            </>
          ) : (
            <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
              {currentUser.name.charAt(0)}
            </div>
          )}
        </div>
      )}

      <nav className="mt-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center py-3 px-4 ${
                  collapsed ? 'justify-center' : 'space-x-3'
                } ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="w-6 h-6 flex items-center justify-center">•</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full border-t border-gray-700">
        <button
          onClick={logout}
          className={`flex items-center py-3 px-4 w-full text-gray-300 hover:bg-gray-700 ${
            collapsed ? 'justify-center' : 'space-x-3'
          }`}
        >
          <span className="w-6 h-6 flex items-center justify-center">←</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
