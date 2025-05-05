
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../../componants/button';

const Input = ({ label, name, value, onChange, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`mt-1 p-2 w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

const FileInput = ({ label, name, onChange, error, file }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="file"
      id={name}
      name={name}
      onChange={onChange}
      className={`mt-1 p-2 w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md`}
    />
    {file && <p className="text-gray-500 text-sm mt-2">Selected: {file.name}</p>}
    {error && <p className="text-red-500 text-sm">{error}</p>}
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
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          {stepLabels.map((label, index) => (
            <div key={index} className="flex-1 flex flex-col items-center relative">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${step === index + 1 ? 'bg-gray-800 text-white' : step > index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
                {index + 1}
              </div>
              <p className="text-xs mt-1 text-center">{label}</p>
              {index !== stepLabels.length - 1 && (
                <div className="absolute top-3 left-full w-full h-0.5 bg-gray-300">
                  <div className={`h-0.5 ${step > index + 1 ? 'bg-blue-600' : 'bg-gray-300'}`} style={{ width: '100%' }}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <>
            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
            <Input label="Surname" name="surname" value={formData.surname} onChange={handleChange} error={errors.surname} />
            <Input label="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <Input label="Contact No" name="contactNo" value={formData.contactNo} onChange={handleChange} error={errors.contactNo} />
          </>
        )}
        {step === 2 && (
          <>
            <Input label="Address Line 1" name="address1" value={formData.address1} onChange={handleChange} error={errors.address1} />
            <Input label="Address Line 2" name="address2" value={formData.address2} onChange={handleChange} />
            <Input label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
            <Input label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} />
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
        {/* {step === 5 && (
          <>
            <Input label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} error={errors.accountNumber} />
            <Input label="IFSC Code" name="ifsc" value={formData.ifsc} onChange={handleChange} error={errors.ifsc} />
            <Input label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} error={errors.bankName} />
            <Input label="Branch Name" name="branchName" value={formData.branchName} onChange={handleChange} error={errors.branchName} />
            <FileInput label="Upload Bank Cheque" name="bankCheque" onChange={handleChange} file={formData.bankCheque} />
          </>
        )}
        {step === 6 && (
          <div className="space-y-3">
            <Checkbox name="declaration1" label="I agree to the terms and conditions." checked={formData.declaration1} onChange={handleChange} />
            <Checkbox name="declaration2" label="I confirm all information is accurate." checked={formData.declaration2} onChange={handleChange} />
            <Checkbox name="declaration3" label="I allow my data to be processed." checked={formData.declaration3} onChange={handleChange} />
            {errors.declaration && <p className="text-red-500 text-sm">{errors.declaration}</p>}
          </div>
        )} */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button onClick={handleBack} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Back</button>
          )}
          {step === 4 ? (
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Submit</button>
          ) : (
            <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Next</button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">✅ Submission Successful!</h3>
            <p>Thank you for completing your registration.</p>
            <p>Our team will verify the provided details, and once approved, your <strong>User ID and Password</strong> will be sent to your registered email address.</p>
            <p className="mt-2">Please allow up to <strong>2 working days</strong> for this process.</p>
            <div className="mt-4 text-right">
              <button onClick={() => router.push('/login')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600">Go to login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
