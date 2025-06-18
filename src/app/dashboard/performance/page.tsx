'use client';

import React, { useState } from 'react';
import { useData } from '../../../context/DataContext';
import { useAuth } from '../../../context/AuthContext';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PerformanceContent = () => {
  const { currentUser } = useAuth();
  const { 
    leads, 
    customers, 
    tasks, 
    getLeadStats, 
    getCustomerStats, 
    getTaskStats 
  } = useData();
  
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'quarter', 'year'
  
  // Get stats
  const leadStats = getLeadStats();
  const customerStats = getCustomerStats();
  const taskStats = getTaskStats();
  
  // Calculate conversion rate
  const conversionRate = leads.length > 0 
    ? ((leadStats.converted / leads.length) * 100).toFixed(1) 
    : 0;
  
  // Generate monthly data for charts (simplified for demo)
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    // Use last 6 months
    const labels = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      labels.push(months[monthIndex]);
    }
    
    // Generate random data for demo
    const generateRandomData = (min, max) => {
      return Array.from({ length: 6 }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    };
    
    return {
      labels,
      leadsData: generateRandomData(5, 15),
      customersData: generateRandomData(2, 8),
      tasksCompletedData: generateRandomData(10, 25),
    };
  };
  
  const monthlyData = generateMonthlyData();
  
  // Chart data
  const leadStatusData = {
    labels: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Converted', 'Lost'],
    datasets: [
      {
        label: 'Lead Status',
        data: [
          leadStats.new,
          leadStats.contacted,
          leadStats.qualified,
          leadStats.proposal,
          leadStats.negotiation,
          leadStats.converted,
          leadStats.lost
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(46, 204, 113, 0.6)',
          'rgba(231, 76, 60, 0.6)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const taskStatusData = {
    labels: ['Pending', 'Completed', 'Overdue'],
    datasets: [
      {
        label: 'Task Status',
        data: [taskStats.pending, taskStats.completed, taskStats.overdue],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(46, 204, 113, 0.6)',
          'rgba(231, 76, 60, 0.6)'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const monthlyLeadsCustomersData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'New Leads',
        data: monthlyData.leadsData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'New Customers',
        data: monthlyData.customersData,
        backgroundColor: 'rgba(46, 204, 113, 0.5)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const monthlyTasksCompletedData = {
    labels: monthlyData.labels,
    datasets: [
      {
        label: 'Tasks Completed',
        data: monthlyData.tasksCompletedData,
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
      },
    ],
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Performance Dashboard</h1>
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800">Total Leads</h3>
            <p className="text-2xl font-bold">{leadStats.total}</p>
            <p className="text-sm text-blue-600 mt-1">
              {leadStats.new} new leads
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">Customers</h3>
            <p className="text-2xl font-bold">{customerStats.total}</p>
            <p className="text-sm text-green-600 mt-1">
              ${customerStats.totalValue.toLocaleString()} total value
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-800">Tasks</h3>
            <p className="text-2xl font-bold">{taskStats.total}</p>
            <p className="text-sm text-purple-600 mt-1">
              {taskStats.completed} completed, {taskStats.pending} pending
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800">Conversion Rate</h3>
            <p className="text-2xl font-bold">{conversionRate}%</p>
            <p className="text-sm text-yellow-600 mt-1">
              {leadStats.converted} leads converted
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Lead Status Distribution</h2>
          <div className="h-64">
            <Doughnut 
              data={leadStatusData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Task Status Distribution</h2>
          <div className="h-64">
            <Doughnut 
              data={taskStatusData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Monthly Leads & Customers</h2>
          <div className="h-64">
            <Bar 
              data={monthlyLeadsCustomersData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">Tasks Completed</h2>
          <div className="h-64">
            <Line 
              data={monthlyTasksCompletedData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PerformancePage = () => {
  return (
    <DashboardLayout>
      <PerformanceContent />
    </DashboardLayout>
  );
};

export default PerformancePage;
