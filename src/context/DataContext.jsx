'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';

// Sample data
const sampleLeads = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-123-4567',
    status: 'new',
    source: 'website',
    notes: 'Interested in insurance products',
    assignedTo: '3',
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2023, 5, 15).toISOString(),
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '555-987-6543',
    status: 'contacted',
    source: 'referral',
    notes: 'Follow up next week',
    assignedTo: '3',
    createdAt: new Date(2023, 5, 10).toISOString(),
    updatedAt: new Date(2023, 5, 12).toISOString(),
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '555-456-7890',
    status: 'qualified',
    source: 'social media',
    notes: 'High potential client',
    assignedTo: '4',
    createdAt: new Date(2023, 5, 5).toISOString(),
    updatedAt: new Date(2023, 5, 8).toISOString(),
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    phone: '555-789-0123',
    status: 'proposal',
    source: 'event',
    notes: 'Sent proposal on 6/1',
    assignedTo: '4',
    createdAt: new Date(2023, 4, 28).toISOString(),
    updatedAt: new Date(2023, 5, 1).toISOString(),
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@example.com',
    phone: '555-321-6547',
    status: 'negotiation',
    source: 'website',
    notes: 'Negotiating terms',
    assignedTo: '5',
    createdAt: new Date(2023, 4, 20).toISOString(),
    updatedAt: new Date(2023, 5, 5).toISOString(),
  },
];

const sampleCustomers = [
  {
    id: '1',
    name: 'Robert Taylor',
    email: 'robert.t@example.com',
    phone: '555-111-2222',
    address: '123 Main St, Anytown, USA',
    status: 'active',
    assignedTo: '3',
    createdAt: new Date(2023, 3, 15).toISOString(),
    updatedAt: new Date(2023, 3, 15).toISOString(),
    products: ['Insurance Plan A', 'Investment Portfolio'],
    value: 5000,
  },
  {
    id: '2',
    name: 'Jennifer Adams',
    email: 'jennifer.a@example.com',
    phone: '555-333-4444',
    address: '456 Oak Ave, Somewhere, USA',
    status: 'active',
    assignedTo: '3',
    createdAt: new Date(2023, 2, 10).toISOString(),
    updatedAt: new Date(2023, 2, 10).toISOString(),
    products: ['Insurance Plan B'],
    value: 2500,
  },
  {
    id: '3',
    name: 'Thomas White',
    email: 'thomas.w@example.com',
    phone: '555-555-6666',
    address: '789 Pine Rd, Nowhere, USA',
    status: 'inactive',
    assignedTo: '4',
    createdAt: new Date(2023, 1, 5).toISOString(),
    updatedAt: new Date(2023, 1, 5).toISOString(),
    products: ['Investment Portfolio', 'Retirement Plan'],
    value: 10000,
  },
];

const sampleTasks = [
  {
    id: '1',
    title: 'Call John Smith',
    description: 'Follow up on insurance inquiry',
    status: 'pending',
    priority: 'high',
    dueDate: new Date(2023, 5, 20).toISOString(),
    assignedTo: '3',
    createdBy: '2',
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2023, 5, 15).toISOString(),
    relatedTo: { type: 'lead', id: '1' },
  },
  {
    id: '2',
    title: 'Send proposal to Emily Davis',
    description: 'Prepare and send updated proposal',
    status: 'completed',
    priority: 'medium',
    dueDate: new Date(2023, 5, 1).toISOString(),
    completedAt: new Date(2023, 5, 1).toISOString(),
    assignedTo: '4',
    createdBy: '2',
    createdAt: new Date(2023, 4, 29).toISOString(),
    updatedAt: new Date(2023, 5, 1).toISOString(),
    relatedTo: { type: 'lead', id: '4' },
  },
  {
    id: '3',
    title: 'Quarterly review with Robert Taylor',
    description: 'Review portfolio performance and discuss new opportunities',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date(2023, 6, 15).toISOString(),
    assignedTo: '3',
    createdBy: '2',
    createdAt: new Date(2023, 5, 10).toISOString(),
    updatedAt: new Date(2023, 5, 10).toISOString(),
    relatedTo: { type: 'customer', id: '1' },
  },
];

const sampleNotifications = [
  {
    id: '1',
    title: 'New Lead Assigned',
    message: 'A new lead has been assigned to you: John Smith',
    read: false,
    userId: '3',
    createdAt: new Date(2023, 5, 15).toISOString(),
  },
  {
    id: '2',
    title: 'Task Due Soon',
    message: 'Your task "Call John Smith" is due in 2 days',
    read: false,
    userId: '3',
    createdAt: new Date(2023, 5, 18).toISOString(),
  },
  {
    id: '3',
    title: 'Customer Status Update',
    message: 'Thomas White has been marked as inactive',
    read: true,
    userId: '4',
    createdAt: new Date(2023, 5, 5).toISOString(),
  },
];

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  
  // Initialize state with sample data
  const [leads, setLeads] = useState(sampleLeads);
  const [customers, setCustomers] = useState(sampleCustomers);
  const [tasks, setTasks] = useState(sampleTasks);
  const [notifications, setNotifications] = useState(sampleNotifications);
  
  console.log("DataProvider initialized with currentUser:", currentUser);

  // Filter data based on current user
  const getUserLeads = () => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'agent') {
      return leads.filter(lead => lead.assignedTo === currentUser.id);
    } else if (currentUser.role === 'supervisor') {
      const teamIds = currentUser.team || [];
      return leads.filter(lead => teamIds.includes(lead.assignedTo));
    } else if (currentUser.role === 'admin') {
      return leads;
    }
    
    // For demo purposes, return all leads if role doesn't match or for demo users
    return leads;
  };
  
  const getUserCustomers = () => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'agent') {
      return customers.filter(customer => customer.assignedTo === currentUser.id);
    } else if (currentUser.role === 'supervisor') {
      const teamIds = currentUser.team || [];
      return customers.filter(customer => teamIds.includes(customer.assignedTo));
    } else if (currentUser.role === 'admin') {
      return customers;
    }
    
    // For demo purposes, return all customers if role doesn't match or for demo users
    return customers;
  };
  
  const getUserTasks = () => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'agent') {
      return tasks.filter(task => task.assignedTo === currentUser.id);
    } else if (currentUser.role === 'supervisor') {
      return tasks.filter(task => task.createdBy === currentUser.id);
    } else if (currentUser.role === 'admin') {
      return tasks;
    }
    
    // For demo purposes, return all tasks if role doesn't match or for demo users
    return tasks;
  };
  
  const getUserNotifications = () => {
    if (!currentUser) return [];
    
    return notifications.filter(notification => 
      notification.userId === currentUser.id || notification.userId === 'all'
    );
  };
  
  // CRUD operations for leads
  const addLead = (leadData) => {
    const newLead = {
      id: uuidv4(),
      ...leadData,
      assignedTo: leadData.assignedTo || currentUser?.id,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setLeads(prevLeads => [...prevLeads, newLead]);
    
    // Create notification for assigned agent if different from current user
    if (newLead.assignedTo && newLead.assignedTo !== currentUser?.id) {
      addNotification({
        title: 'New Lead Assigned',
        message: `A new lead has been assigned to you: ${newLead.name}`,
        userId: newLead.assignedTo,
      });
    }
    
    return newLead;
  };
  
  const updateLead = (id, leadData) => {
    const leadIndex = leads.findIndex(lead => lead.id === id);
    if (leadIndex === -1) return null;
    
    const updatedLead = {
      ...leads[leadIndex],
      ...leadData,
      updatedAt: new Date().toISOString(),
    };
    
    const newLeads = [...leads];
    newLeads[leadIndex] = updatedLead;
    setLeads(newLeads);
    
    // If status changed to 'converted', create a new customer
    if (leadData.status === 'converted' && leads[leadIndex].status !== 'converted') {
      const newCustomer = {
        id: uuidv4(),
        name: updatedLead.name,
        email: updatedLead.email,
        phone: updatedLead.phone,
        address: leadData.address || '',
        status: 'active',
        assignedTo: updatedLead.assignedTo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: [],
        value: 0,
      };
      
      setCustomers(prevCustomers => [...prevCustomers, newCustomer]);
      
      // Notify the agent
      addNotification({
        title: 'Lead Converted',
        message: `Lead ${updatedLead.name} has been converted to a customer`,
        userId: updatedLead.assignedTo,
      });
    }
    
    return updatedLead;
  };
  
  const deleteLead = (id) => {
    setLeads(prevLeads => prevLeads.filter(lead => lead.id !== id));
  };
  
  // CRUD operations for customers
  const addCustomer = (customerData) => {
    const newCustomer = {
      id: uuidv4(),
      ...customerData,
      assignedTo: customerData.assignedTo || currentUser?.id,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      products: customerData.products || [],
      value: customerData.value || 0,
    };
    
    setCustomers(prevCustomers => [...prevCustomers, newCustomer]);
    
    return newCustomer;
  };
  
  const updateCustomer = (id, customerData) => {
    const customerIndex = customers.findIndex(customer => customer.id === id);
    if (customerIndex === -1) return null;
    
    const updatedCustomer = {
      ...customers[customerIndex],
      ...customerData,
      updatedAt: new Date().toISOString(),
    };
    
    const newCustomers = [...customers];
    newCustomers[customerIndex] = updatedCustomer;
    setCustomers(newCustomers);
    
    return updatedCustomer;
  };
  
  const deleteCustomer = (id) => {
    setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== id));
  };
  
  // CRUD operations for tasks
  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      ...taskData,
      status: 'pending',
      createdBy: currentUser?.id,
      assignedTo: taskData.assignedTo || currentUser?.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    
    // Create notification for assigned agent if different from current user
    if (newTask.assignedTo && newTask.assignedTo !== currentUser?.id) {
      addNotification({
        title: 'New Task Assigned',
        message: `A new task has been assigned to you: ${newTask.title}`,
        userId: newTask.assignedTo,
      });
    }
    
    return newTask;
  };
  
  const updateTask = (id, taskData) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString(),
    };
    
    // If task is being marked as completed, add completedAt timestamp
    if (taskData.status === 'completed' && tasks[taskIndex].status !== 'completed') {
      updatedTask.completedAt = new Date().toISOString();
      
      // Notify the task creator if different from current user
      if (updatedTask.createdBy && updatedTask.createdBy !== currentUser?.id) {
        addNotification({
          title: 'Task Completed',
          message: `Task "${updatedTask.title}" has been completed`,
          userId: updatedTask.createdBy,
        });
      }
    }
    
    const newTasks = [...tasks];
    newTasks[taskIndex] = updatedTask;
    setTasks(newTasks);
    
    return updatedTask;
  };
  
  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  
  // Notification operations
  const addNotification = (notificationData) => {
    const newNotification = {
      id: uuidv4(),
      ...notificationData,
      read: false,
      createdAt: new Date().toISOString(),
    };
    
    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    
    return newNotification;
  };
  
  const markNotificationAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllNotificationsAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const deleteNotification = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };
  
  // Analytics functions
  const getLeadStats = () => {
    const userLeads = getUserLeads();
    
    return {
      total: userLeads.length,
      new: userLeads.filter(lead => lead.status === 'new').length,
      contacted: userLeads.filter(lead => lead.status === 'contacted').length,
      qualified: userLeads.filter(lead => lead.status === 'qualified').length,
      proposal: userLeads.filter(lead => lead.status === 'proposal').length,
      negotiation: userLeads.filter(lead => lead.status === 'negotiation').length,
      converted: userLeads.filter(lead => lead.status === 'converted').length,
      lost: userLeads.filter(lead => lead.status === 'lost').length,
    };
  };
  
  const getCustomerStats = () => {
    const userCustomers = getUserCustomers();
    
    return {
      total: userCustomers.length,
      active: userCustomers.filter(customer => customer.status === 'active').length,
      inactive: userCustomers.filter(customer => customer.status === 'inactive').length,
      totalValue: userCustomers.reduce((sum, customer) => sum + (customer.value || 0), 0),
    };
  };
  
  const getTaskStats = () => {
    const userTasks = getUserTasks();
    
    return {
      total: userTasks.length,
      pending: userTasks.filter(task => task.status === 'pending').length,
      completed: userTasks.filter(task => task.status === 'completed').length,
      overdue: userTasks.filter(task => 
        task.status === 'pending' && new Date(task.dueDate) < new Date()
      ).length,
    };
  };
  
  // Provide all functions and data
  const value = {
    // Data access
    leads: getUserLeads(),
    customers: getUserCustomers(),
    tasks: getUserTasks(),
    notifications: getUserNotifications(),
    
    // CRUD operations
    addLead,
    updateLead,
    deleteLead,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addTask,
    updateTask,
    deleteTask,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    
    // Analytics
    getLeadStats,
    getCustomerStats,
    getTaskStats,
  };
  
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
