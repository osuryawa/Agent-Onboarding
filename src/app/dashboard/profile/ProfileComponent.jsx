'use client';

import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { useAuth } from '../../../context/AuthContext';

const ProfileComponent = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  const personalInfoFormik = useFormik({
    initialValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: currentUser?.address || '',
      city: currentUser?.city || '',
      state: currentUser?.state || '',
      pincode: currentUser?.pincode || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      pincode: Yup.string().required('Pincode is required'),
    }),
    onSubmit: (values) => {
      updateUserProfile({
        ...values,
        personalInfoComplete: true,
      });
      toast.success('Personal information updated successfully');
    },
  });

  const kycFormik = useFormik({
    initialValues: {
      aadharNumber: currentUser?.aadharNumber || '',
      panNumber: currentUser?.panNumber || '',
      aadharFile: null,
      panFile: null,
      photoFile: null,
    },
    validationSchema: Yup.object({
      aadharNumber: Yup.string().required('Aadhar number is required'),
      panNumber: Yup.string().required('PAN number is required'),
    }),
    onSubmit: (values) => {
      updateUserProfile({
        ...values,
        kycComplete: true,
      });
      toast.success('KYC information updated successfully');
    },
  });

  const bankFormik = useFormik({
    initialValues: {
      accountNumber: currentUser?.accountNumber || '',
      ifscCode: currentUser?.ifscCode || '',
      bankName: currentUser?.bankName || '',
      branchName: currentUser?.branchName || '',
      accountType: currentUser?.accountType || '',
    },
    validationSchema: Yup.object({
      accountNumber: Yup.string().required('Account number is required'),
      ifscCode: Yup.string().required('IFSC code is required'),
      bankName: Yup.string().required('Bank name is required'),
      branchName: Yup.string().required('Branch name is required'),
      accountType: Yup.string().required('Account type is required'),
    }),
    onSubmit: (values) => {
      updateUserProfile({
        ...values,
        bankInfoComplete: true,
      });
      toast.success('Bank information updated successfully');
    },
  });

  const handleFileChange = (e, formik, field) => {
    formik.setFieldValue(field, e.target.files[0]);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Agent Profile</h1>
        <p className="text-gray-600">
          Manage your profile information and complete verification
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-4 py-3 font-medium ${
              activeTab === 'personal'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Information
          </button>
          <button
            className={`px-4 py-3 font-medium ${
              activeTab === 'kyc'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('kyc')}
          >
            KYC Verification
          </button>
          <button
            className={`px-4 py-3 font-medium ${
              activeTab === 'bank'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('bank')}
          >
            Bank Details
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <form onSubmit={personalInfoFormik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={personalInfoFormik.values.name}
                    onChange={personalInfoFormik.handleChange}
                    onBlur={personalInfoFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      personalInfoFormik.touched.name && personalInfoFormik.errors.name
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {personalInfoFormik.touched.name && personalInfoFormik.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{personalInfoFormik.errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfoFormik.values.email}
                    onChange={personalInfoFormik.handleChange}
                    onBlur={personalInfoFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      personalInfoFormik.touched.email && personalInfoFormik.errors.email
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {personalInfoFormik.touched.email && personalInfoFormik.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{personalInfoFormik.errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={personalInfoFormik.values.phone}
                    onChange={personalInfoFormik.handleChange}
                    onBlur={personalInfoFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      personalInfoFormik.touched.phone && personalInfoFormik.errors.phone
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {personalInfoFormik.touched.phone && personalInfoFormik.errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{personalInfoFormik.errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={personalInfoFormik.values.address}
                    onChange={personalInfoFormik.handleChange}
                    onBlur={personalInfoFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      personalInfoFormik.touched.address && personalInfoFormik.errors.address
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {personalInfoFormik.touched.address && personalInfoFormik.errors.address && (
                    <p className="text-red-500 text-sm mt-1">{personalInfoFormik.errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={personalInfoFormik.values.city}
                    onChange={personalInfoFormik.handleChange}
                    onBlur={personalInfoFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      personalInfoFormik.touched.city && personalInfoFormik.errors.city
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {personalInfoFormik.touched.city && personalInfoFormik.errors.city && (
                    <p className="text-red-500 text-sm mt-1">{personalInfoFormik.errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={personalInfoFormik.values.state}
                    onChange={personalInfoFormik.handleChange}
                    onBlur={personalInfoFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      personalInfoFormik.touched.state && personalInfoFormik.errors.state
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {personalInfoFormik.touched.state && personalInfoFormik.errors.state && (
                    <p className="text-red-500 text-sm mt-1">{personalInfoFormik.errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={personalInfoFormik.values.pincode}
                    onChange={personalInfoFormik.handleChange}
                    onBlur={personalInfoFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      personalInfoFormik.touched.pincode && personalInfoFormik.errors.pincode
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {personalInfoFormik.touched.pincode && personalInfoFormik.errors.pincode && (
                    <p className="text-red-500 text-sm mt-1">{personalInfoFormik.errors.pincode}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save Personal Information
                </button>
              </div>
            </form>
          )}

          {activeTab === 'kyc' && (
            <form onSubmit={kycFormik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhar Number
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={kycFormik.values.aadharNumber}
                    onChange={kycFormik.handleChange}
                    onBlur={kycFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      kycFormik.touched.aadharNumber && kycFormik.errors.aadharNumber
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {kycFormik.touched.aadharNumber && kycFormik.errors.aadharNumber && (
                    <p className="text-red-500 text-sm mt-1">{kycFormik.errors.aadharNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={kycFormik.values.panNumber}
                    onChange={kycFormik.handleChange}
                    onBlur={kycFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      kycFormik.touched.panNumber && kycFormik.errors.panNumber
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {kycFormik.touched.panNumber && kycFormik.errors.panNumber && (
                    <p className="text-red-500 text-sm mt-1">{kycFormik.errors.panNumber}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Aadhar Card
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, kycFormik, 'aadharFile')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {kycFormik.values.aadharFile && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {kycFormik.values.aadharFile.name}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload PAN Card
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, kycFormik, 'panFile')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {kycFormik.values.panFile && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {kycFormik.values.panFile.name}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, kycFormik, 'photoFile')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  {kycFormik.values.photoFile && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {kycFormik.values.photoFile.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Submit KYC Information
                </button>
              </div>
            </form>
          )}

          {activeTab === 'bank' && (
            <form onSubmit={bankFormik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={bankFormik.values.accountNumber}
                    onChange={bankFormik.handleChange}
                    onBlur={bankFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      bankFormik.touched.accountNumber && bankFormik.errors.accountNumber
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {bankFormik.touched.accountNumber && bankFormik.errors.accountNumber && (
                    <p className="text-red-500 text-sm mt-1">{bankFormik.errors.accountNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={bankFormik.values.ifscCode}
                    onChange={bankFormik.handleChange}
                    onBlur={bankFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      bankFormik.touched.ifscCode && bankFormik.errors.ifscCode
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {bankFormik.touched.ifscCode && bankFormik.errors.ifscCode && (
                    <p className="text-red-500 text-sm mt-1">{bankFormik.errors.ifscCode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={bankFormik.values.bankName}
                    onChange={bankFormik.handleChange}
                    onBlur={bankFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      bankFormik.touched.bankName && bankFormik.errors.bankName
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {bankFormik.touched.bankName && bankFormik.errors.bankName && (
                    <p className="text-red-500 text-sm mt-1">{bankFormik.errors.bankName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    name="branchName"
                    value={bankFormik.values.branchName}
                    onChange={bankFormik.handleChange}
                    onBlur={bankFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      bankFormik.touched.branchName && bankFormik.errors.branchName
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {bankFormik.touched.branchName && bankFormik.errors.branchName && (
                    <p className="text-red-500 text-sm mt-1">{bankFormik.errors.branchName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <select
                    name="accountType"
                    value={bankFormik.values.accountType}
                    onChange={bankFormik.handleChange}
                    onBlur={bankFormik.handleBlur}
                    className={`w-full p-2 border rounded-md ${
                      bankFormik.touched.accountType && bankFormik.errors.accountType
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Account Type</option>
                    <option value="savings">Savings</option>
                    <option value="current">Current</option>
                  </select>
                  {bankFormik.touched.accountType && bankFormik.errors.accountType && (
                    <p className="text-red-500 text-sm mt-1">{bankFormik.errors.accountType}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save Bank Details
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileComponent;
