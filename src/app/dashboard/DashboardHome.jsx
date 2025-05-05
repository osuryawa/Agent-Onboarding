'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Link from 'next/link';

// Simple component without HeroIcons dependency
const StatCard = ({ title, value, color, href }) => {
  return (
    <Link
      href={href}
      className="bg-white rounded-lg shadow-sm p-6 flex items-center hover:shadow-md transition-shadow"
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}
      >
      </div>
      <div className="ml-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </Link>
  );
};

const RecentActivity = ({ title, items }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No recent activities</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border-b border-gray-100 pb-3 last:border-0">
              <div className="flex justify-between">
                <p className="font-medium">{item.title}</p>
                <span className="text-xs text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardHome = () => {
  const { currentUser } = useAuth();
  const { leads, tasks, customers, getAgentPerformance } = useData();
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalCustomers: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    if (currentUser) {
      // Calculate stats
      const pendingTasks = tasks.filter((task) => task.status === 'pending').length;
      const completedTasks = tasks.filter((task) => task.status === 'completed').length;

      setStats({
        totalLeads: leads.length,
        totalCustomers: customers.length,
        pendingTasks,
        completedTasks,
      });

      // Generate recent activities
      const activities = [];

      // Add recent leads
      leads.slice(0, 3).forEach((lead) => {
        activities.push({
          id: `lead-${lead.id}`,
          title: `New Lead: ${lead.name}`,
          description: `Source: ${lead.source}`,
          date: lead.createdAt,
        });
      });

      // Add recent tasks
      tasks.slice(0, 3).forEach((task) => {
        activities.push({
          id: `task-${task.id}`,
          title: task.title,
          description: task.description,
          date: task.createdAt,
        });
      });

      // Sort by date (newest first)
      activities.sort((a, b) => new Date(b.date) - new Date(a.date));

      setRecentActivities(activities.slice(0, 5));
    }
  }, [currentUser, leads, tasks, customers]);

  // Simple debug output to check if component is rendering
  console.log("DashboardHome rendering, currentUser:", currentUser);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {currentUser?.name || 'User'}! Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          color="bg-blue-500"
          href="/dashboard/leads"
        />
        <StatCard
          title="Customers"
          value={stats.totalCustomers}
          color="bg-green-500"
          href="/dashboard/customers"
        />
        <StatCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          color="bg-yellow-500"
          href="/dashboard/tasks"
        />
        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          color="bg-purple-500"
          href="/dashboard/tasks"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity title="Recent Activities" items={recentActivities} />
        
        {currentUser?.role === 'agent' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/dashboard/leads/new"
                className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors"
              >
                <span className="font-medium">Add New Lead</span>
              </Link>
              <Link
                href="/dashboard/tasks"
                className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors"
              >
                <span className="font-medium">View Tasks</span>
              </Link>
              <Link
                href="/dashboard/customers/new"
                className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors"
              >
                <span className="font-medium">Add Customer</span>
              </Link>
              <Link
                href="/dashboard/performance"
                className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors"
              >
                <span className="font-medium">View Performance</span>
              </Link>
            </div>
          </div>
        )}

        {currentUser?.role === 'supervisor' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Team Overview</h2>
            <div className="space-y-4">
              <Link
                href="/dashboard/team"
                className="block bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex items-center transition-colors"
              >
                <div>
                  <span className="font-medium">Manage Team</span>
                  <p className="text-sm text-gray-600">View and manage your team members</p>
                </div>
              </Link>
              <Link
                href="/dashboard/performance"
                className="block bg-green-50 hover:bg-green-100 p-4 rounded-lg flex items-center transition-colors"
              >
                <div>
                  <span className="font-medium">Team Performance</span>
                  <p className="text-sm text-gray-600">View team performance metrics</p>
                </div>
              </Link>
              <Link
                href="/dashboard/tasks/assign"
                className="block bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex items-center transition-colors"
              >
                <div>
                  <span className="font-medium">Assign Tasks</span>
                  <p className="text-sm text-gray-600">Create and assign tasks to team members</p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
