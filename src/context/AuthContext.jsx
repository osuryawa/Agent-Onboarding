'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

// Sample user data - in a real application, this would come from a database
const sampleUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    profileComplete: true,
  },
  {
    id: '2',
    email: 'supervisor@example.com',
    password: 'super123',
    name: 'Supervisor User',
    role: 'supervisor',
    profileComplete: true,
    team: ['3', '4', '5']
  },
  {
    id: '3',
    email: 'agent@example.com',
    password: 'agent123',
    name: 'Agent One',
    role: 'agent',
    profileComplete: true,
    supervisorId: '2'
  },
  {
    id: '4',
    email: 'agent2@example.com',
    password: 'agent123',
    name: 'Agent Two',
    role: 'agent',
    profileComplete: false,
    supervisorId: '2'
  },
  {
    id: '5',
    email: 'agent3@example.com',
    password: 'agent123',
    name: 'Agent Three',
    role: 'agent',
    profileComplete: false,
    supervisorId: '2'
  }
];

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // For debugging
  console.log("AuthProvider initialized");

  useEffect(() => {
    console.log("AuthProvider useEffect running");
    // Check if user is stored in localStorage
    try {
      const storedUser = localStorage.getItem('currentUser');
      console.log("Stored user from localStorage:", storedUser);
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user:", parsedUser);
        setCurrentUser(parsedUser);
      } else {
        // For demo purposes, create a default user
        console.log("No stored user, creating demo user");
        const demoUser = {
          id: 'demo123',
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'agent',
          profileComplete: false
        };
        setCurrentUser(demoUser);
        localStorage.setItem('currentUser', JSON.stringify(demoUser));
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    console.log("Login attempt:", email);
    
    // Find user in sample data
    const user = sampleUsers.find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      console.log("User found:", user);
      // Don't store password in localStorage for security
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    } else {
      console.log("User not found in sample data");
      
      // For demo purposes, create a user anyway
      const demoUser = {
        id: 'demo123',
        name: 'Demo User',
        email: email,
        role: 'agent',
        profileComplete: false
      };
      setCurrentUser(demoUser);
      localStorage.setItem('currentUser', JSON.stringify(demoUser));
      return demoUser;
    }
  };

  const logout = () => {
    console.log("Logging out");
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    // Clear any other auth-related data that might be stored
    sessionStorage.clear();
    // Set loading to false to ensure the login page works correctly after logout
    setLoading(false);
  };

  const register = (userData) => {
    console.log("Registering new user:", userData);
    // In a real app, this would be an API call to create a new user
    const newUser = {
      id: (sampleUsers.length + 1).toString(),
      ...userData,
      role: 'agent',
      profileComplete: false
    };
    
    // For demo purposes, we'll just add to our sample array
    sampleUsers.push(newUser);
    
    // Auto login after registration
    const { password, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  };

  const updateUserProfile = (profileData) => {
    if (!currentUser) return null;
    
    console.log("Updating user profile:", profileData);
    
    // Update the user in our sample array
    const userIndex = sampleUsers.findIndex(u => u.id === currentUser.id);
    if (userIndex >= 0) {
      const updatedUser = {
        ...sampleUsers[userIndex],
        ...profileData,
        profileComplete: true
      };
      sampleUsers[userIndex] = updatedUser;
      
      // Update current user state
      const { password, ...userWithoutPassword } = updatedUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    }
    
    // If user not found in sample data, just update the current user
    const updatedUser = {
      ...currentUser,
      ...profileData,
      profileComplete: true
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return updatedUser;
  };

  const getTeamMembers = () => {
    if (!currentUser) return [];
    
    if (currentUser.role === 'supervisor') {
      return sampleUsers.filter(user => 
        currentUser.team && currentUser.team.includes(user.id)
      );
    }
    
    return [];
  };

  const getAllAgents = () => {
    return sampleUsers.filter(user => user.role === 'agent');
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    updateUserProfile,
    getTeamMembers,
    getAllAgents,
    loading
  };

  console.log("AuthProvider rendering with currentUser:", currentUser, "loading:", loading);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
