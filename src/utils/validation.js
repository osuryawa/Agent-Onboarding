export const validateStep = (step, formData) => {
  const errors = {};

  switch (step) {
    case 1:
      if (!formData.firstName?.trim())
        errors.firstName = "First name is required";
      if (!formData.surname?.trim()) errors.surname = "Surname is required";
      if (!formData.email?.trim()) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        errors.email = "Invalid email format";
      if (!formData.contactNo?.trim())
        errors.contactNo = "Contact number is required";
      else if (!/^\d{10}$/.test(formData.contactNo))
        errors.contactNo = "Contact number must be 10 digits";
      break;

    case 2:
      if (!formData.address1?.trim())
        errors.address1 = "Address Line 1 is required";
      if (!formData.city?.trim()) errors.city = "City is required";
      if (!formData.state?.trim()) errors.state = "State is required";
      if (!formData.pin?.trim()) errors.pin = "PIN code is required";
      else if (!/^\d{6}$/.test(formData.pin))
        errors.pin = "PIN code must be 6 digits";
      break;

    case 3:
      if (!formData.aadharNo?.trim())
        errors.aadharNo = "Aadhar number is required";
      else if (!/^\d{12}$/.test(formData.aadharNo))
        errors.aadharNo = "Aadhar number must be 12 digits";

      if (!formData.panNo?.trim()) errors.panNo = "PAN number is required";
      else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(formData.panNo))
        errors.panNo = "Invalid PAN format";

      if (!formData.aadhar) errors.aadhar = "Aadhar file is required";
      if (!formData.pan) errors.pan = "PAN file is required";
      if (!formData.photo) errors.photo = "Photo is required";
      break;

    case 4:
      if (!formData.highestDegree?.trim())
        errors.highestDegree = "Degree is required";
      if (!formData.university?.trim())
        errors.university = "University name is required";
      if (!formData.degreeCertificate)
        errors.degreeCertificate = "Degree certificate is required";
      break;

    case 5:
      if (!formData.accountNumber?.trim())
        errors.accountNumber = "Account number is required";
      if (!formData.ifsc?.trim()) errors.ifsc = "IFSC code is required";
      else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc))
        errors.ifsc = "Invalid IFSC format";
      if (!formData.bankName?.trim()) errors.bankName = "Bank name is required";
      if (!formData.branchName?.trim())
        errors.branchName = "Branch name is required";
      if (!formData.bankCheque)
        errors.bankCheque = "Cancelled cheque is required";
      break;

    case 6:
      if (!formData.declaration1)
        errors.declaration1 = "You must accept the first declaration";
      if (!formData.declaration2)
        errors.declaration2 = "You must accept the second declaration";
      if (!formData.declaration3)
        errors.declaration3 = "You must accept the third declaration";
      break;

    default:
      break;
  }

  return errors;
};
