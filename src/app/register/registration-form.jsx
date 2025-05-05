'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../componants/button';

const Input = ({ label, name, value, onChange, error }) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1 uppercase">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`p-3 w-full bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
    />
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

const FileInput = ({ label, name, onChange, error, file }) => (
  <div className="mb-6">
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1 uppercase">{label}</label>
    <div className={`relative border ${error ? 'border-red-500' : 'border-gray-700'} rounded-md p-3 bg-gray-800 hover:bg-gray-750 transition-all`}>
      <input
        type="file"
        id={name}
        name={name}
        onChange={onChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex items-center justify-between">
        <span className="text-gray-400">{file ? file.name : 'Choose file...'}</span>
        <span className="bg-gray-700 py-1 px-3 border border-gray-600 rounded-md text-sm font-medium text-gray-300 shadow-sm">Browse</span>
      </div>
    </div>
    {file && <p className="text-gray-400 text-sm mt-1">Selected: {file.name}</p>}
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    contactNo: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pin: '',
    aadharNo: '',
    panNo: '',
    aadhar: null,
    pan: null,
    photo: null,
    suggested: null,
    highestDegree: '',
    university: '',
    degreeCertificate: null,
    accountNumber: '',
    ifsc: '',
    bankName: '',
    branchName: '',
    bankCheque: null,
    declaration1: false,
    declaration2: false,
    declaration3: false,
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const validateStep = () => {
    const stepErrors = {};
    if (step === 1) {
      if (!formData.firstName) stepErrors.firstName = 'First Name is required';
      if (!formData.surname) stepErrors.surname = 'Surname is required';
      if (!formData.email) stepErrors.email = 'Email is required';
      if (!formData.contactNo) stepErrors.contactNo = 'Contact No is required';
    } else if (step === 2) {
      if (!formData.address1) stepErrors.address1 = 'Address Line 1 is required';
      if (!formData.city) stepErrors.city = 'City is required';
      if (!formData.state) stepErrors.state = 'State is required';
      if (!formData.pin) stepErrors.pin = 'Pin Code is required';
    } else if (step === 3) {
      if (!formData.aadharNo) stepErrors.aadharNo = 'Aadhar Number is required';
      if (!formData.panNo) stepErrors.panNo = 'PAN Number is required';
      // if (!formData.photoIdNo) stepErrors.photoIdNo = 'Photo ID Number is required';
      // if (!formData.aadhar) stepErrors.aadhar = 'Aadhar file required';
      // if (!formData.pan) stepErrors.pan = 'PAN file required';
      // if (!formData.photo) stepErrors.photo = 'Photo file required';
    } else if (step === 4) {
      if (!formData.highestDegree) stepErrors.highestDegree = 'Degree is required';
      if (!formData.university) stepErrors.university = 'University is required';
    } 
    // else if (step === 6) {
    //   if (!formData.declaration1 || !formData.declaration2 || !formData.declaration3) {
    //     stepErrors.declaration = 'All declarations must be accepted';
    //   }
    // }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    console.log(step, "step")
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);
  const handleSubmit = () => setShowModal(true);

  const stepLabels = ['Personal Info', 'Address', 'Identity Verification', 'Education'];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-800">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">Agent Onboarding</h1>
          <p className="text-gray-400 mt-2">Let's get you started, Agent!</p>
        </div>

        <div className="flex items-center justify-between mb-8">
          {stepLabels.map((label, index) => (
            <div key={index} className="flex-1 flex flex-col items-center relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                ${step === index + 1 ? 'bg-blue-600 text-white' : step > index + 1 ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400'} border border-gray-700`}>
                {step > index + 1 ? '✓' : (
                  <span className="flex items-center justify-center w-full h-full">
                    {index === 0 && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                    {index === 1 && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
                    {index === 2 && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>}
                    {index === 3 && <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                  </span>
                )}
              </div>
              <p className="text-xs mt-2 text-center text-gray-400">{label}</p>
              {index !== stepLabels.length - 1 && (
                <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-800">
                  <div className={`h-0.5 ${step > index + 1 ? 'bg-green-500' : 'bg-gray-800'}`} style={{ width: '100%' }}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <>
            <div className="uppercase text-sm font-bold text-gray-400 mb-4">First Name</div>
            <Input label="" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
            
            <div className="uppercase text-sm font-bold text-gray-400 mb-4">Surname</div>
            <Input label="" name="surname" value={formData.surname} onChange={handleChange} error={errors.surname} />
            
            <div className="uppercase text-sm font-bold text-gray-400 mb-4">Contact No</div>
            <Input label="" name="contactNo" value={formData.contactNo} onChange={handleChange} error={errors.contactNo} />
            
            <div className="uppercase text-sm font-bold text-gray-400 mb-4">Email</div>
            <Input label="" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
          </>
        )}
        
        {step === 2 && (
          <>
            <Input label="Address Line 1" name="address1" value={formData.address1} onChange={handleChange} error={errors.address1} />
            <Input label="Address Line 2" name="address2" value={formData.address2} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
              <Input label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} />
            </div>
            <Input label="Pin Code" name="pin" value={formData.pin} onChange={handleChange} error={errors.pin} />
          </>
        )}
        
        {step === 3 && (
          <>
            <Input label="Aadhar Number" name="aadharNo" value={formData.aadharNo} onChange={handleChange} error={errors.aadharNo} />
            <Input label="PAN Number" name="panNo" value={formData.panNo} onChange={handleChange} error={errors.panNo} />
            <FileInput label="Upload Aadhaar" name="aadhar" onChange={handleChange} error={errors.aadhar} file={formData.aadhar} />
            <FileInput label="Upload PAN" name="pan" onChange={handleChange} error={errors.pan} file={formData.pan} />
            <FileInput label="Upload Photo" name="photo" onChange={handleChange} error={errors.photo} file={formData.photo} />
          </>
        )}
        
        {step === 4 && (
          <>
            <Input label="Highest Degree" name="highestDegree" value={formData.highestDegree} onChange={handleChange} error={errors.highestDegree} />
            <Input label="University/College" name="university" value={formData.university} onChange={handleChange} error={errors.university} />
            <FileInput label="Upload Degree Certificate" name="degreeCertificate" onChange={handleChange} file={formData.degreeCertificate} />
          </>
        )}
        
        <div className="flex justify-end mt-8">
          {step > 1 && (
            <button 
              onClick={handleBack} 
              className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 mr-4 transition-all"
            >
              Back
            </button>
          )}
          {step === 4 ? (
            <button 
              onClick={handleSubmit} 
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all"
            >
              Submit
            </button>
          ) : (
            <button 
              onClick={handleNext} 
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-white">✅ Submission Successful!</h3>
            <p className="text-gray-300 mb-2">Thank you for completing your registration.</p>
            <p className="text-gray-300 mb-2">Our team will verify the provided details, and once approved, your <strong>User ID and Password</strong> will be sent to your registered email address.</p>
            <p className="text-gray-300 mb-4">Please allow up to <strong>2 working days</strong> for this process.</p>
            <div className="mt-6">
              <button 
                onClick={() => router.push('/login')} 
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-all"
              >
                Go to login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
