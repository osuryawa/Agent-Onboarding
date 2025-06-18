'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '../../../../context/DataContext';
import { toast } from 'react-toastify';
import DashboardLayout from '../../../../components/layout/DashboardLayout';

const NewCustomerContent = () => {
  const router = useRouter();
  const { addCustomer } = useData();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
    products: string;
    value: string;
  }>({
    name: '',
    email: '',
    phone: '',
    address: '',
    products: '',
    value: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      // Parse products into an array
      const products = formData.products
        ? formData.products.split(',').map(product => product.trim())
        : [];
      
      // Parse value as a number
      const value = formData.value ? parseFloat(formData.value) : 0;
      
      const newCustomer = addCustomer({
        ...formData,
        products,
        value
      });
      
      toast.success('Customer added successfully!');
      router.push('/dashboard/customers');
    } catch (error) {
      console.error('Error adding customer:', error);
      toast.error('Failed to add customer');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Customer</h1>
        <p className="text-gray-600">Create a new customer record</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Products (comma-separated)</label>
            <input
              type="text"
              name="products"
              value={formData.products}
              onChange={handleChange}
              placeholder="e.g. Insurance Plan A, Investment Portfolio"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/customers')}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Customer
          </button>
        </div>
      </form>
    </div>
  );
};

const NewCustomerPage = () => {
  return (
    <DashboardLayout>
      <NewCustomerContent />
    </DashboardLayout>
  );
};

export default NewCustomerPage;
