import React, { useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import PersonalInformation from './PersonalInformation';
import Qualifications from './Qualifications';
import './AddIncident.css';

const AddSecurityStaff = ({ isOpen, onClose, refreshList }) => {
  const [securityStaffData, setSecurityStaffData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nic: '',
    phone: '', 
    maritalStatus: '',
    religion: '',
    educationalBackground: '',
    certification: '',
    completedCourses: []
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nic: '',
    phone: '', 
    maritalStatus: '',
    religion: '',
    educationalBackground: '',
    certification: '',
    completedCourses: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'completedCourses') {
      // Split the value by newline to convert it into an array
      const coursesArray = value.split('\n');
      setSecurityStaffData({
        ...securityStaffData,
        [name]: coursesArray
      });
    } else {
      setSecurityStaffData({
        ...securityStaffData,
        [name]: value
      });
    }
    // Clear the error message when the user starts typing again
    setErrors({
      ...errors,
      [name]: ''
    });
  };
  
  const validatePhone = (phone) => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateStep = (step) => {
    const validationErrors = {};

    // Personal Information validation
    if (step === 1) {
      // Perform validation for each field
      if (!securityStaffData.firstName) {
        validationErrors.firstName = 'First Name is required';
      } else if (!/^[a-zA-Z]+$/.test(securityStaffData.firstName)) {
        validationErrors.firstName = 'First Name cannot contain numbers or symbols';
      }

      if (!securityStaffData.lastName) {
        validationErrors.lastName = 'Last Name is required';
      } else if (!/^[a-zA-Z]+$/.test(securityStaffData.lastName)) {
        validationErrors.lastName = 'Last Name cannot contain numbers or symbols';
      }

      if (!securityStaffData.dateOfBirth) {
        validationErrors.dateOfBirth = 'Date of Birth is required';
      } else {
        const currentDate = new Date();
        const selectedDate = new Date(securityStaffData.dateOfBirth);
        if (selectedDate > currentDate) {
          validationErrors.dateOfBirth = 'Date of Birth cannot be a future date';
        }
      }
      if (!securityStaffData.gender) {
        validationErrors.gender = 'Gender is required';
      }
      if (!securityStaffData.nic) {
        validationErrors.nic = 'NIC is required';
      } else if (!/^(\d{9}[x|X|v|V]|\d{12})$/.test(securityStaffData.nic)) {
        validationErrors.nic = 'NIC should be in the format 993465678v';
      }

      if (!securityStaffData.phone) {
        validationErrors.phone = 'Phone Number is required';
      } else if (!validatePhone(securityStaffData.phone)) {
        validationErrors.phone = 'Phone Number should start with 0 and be 10 digits';
      }
      
      if (!securityStaffData.maritalStatus) {
        validationErrors.maritalStatus = 'Marital Status is required';
      }
      if (!securityStaffData.religion) {
        validationErrors.religion = 'Religion is required';
      }
    }

    // Qualifications validation
    if (step === 2) {
      if (!securityStaffData.educationalBackground) {
        validationErrors.educationalBackground = 'Educational Background is required';
      }
      if (!securityStaffData.certification) {
        validationErrors.certification = 'Certification is required';
      }
      if (securityStaffData.completedCourses.length === 0) {
        validationErrors.completedCourses = 'At least one Completed Course is required';
      }
    }

    // Set errors if there are any
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const [step, setStep] = useState(1);

  const handleNext = () => {
    // Validate input fields before proceeding to the next step
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input fields before submitting the form
    if (validateStep(step)) {
      try {
        const response = await axios.post('http://localhost:3500/api/securityStaff/add', securityStaffData);
        onClose();
        refreshList();
        // Show success toast notification
        toast.success('Security Staff Successfully Added ', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // Clear form data
        setSecurityStaffData({
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          gender: '',
          nic: '',
          phone: '',
          maritalStatus: '',
          religion: '',
          educationalBackground: '',
          certification: '',
          completedCourses: []
        });
        console.log(response);
      } catch (error) {
        console.error('Error adding security staff:', error.message);
        // Show error toast notification
        toast.error('Error adding security staff', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div className={`add-incident-overlay ${isOpen ? 'inci-show' : 'inci-hide'}`}>
      <div className=" add-incident-container">
        <FaWindowClose size={25} color='red' onClick={onClose} className="add-incident-close" />
        {step === 1 && <PersonalInformation securityStaffData={securityStaffData} handleChange={handleChange} errors={errors} />}
        {step === 2 && <Qualifications securityStaffData={securityStaffData} handleChange={handleChange} errors={errors} />}
        <div id="button-line">
          {step > 1 && (
            <button onClick={handlePrevious} className="add-incident-button">Previous</button>
          )}
          {step < 2 ? (
            <button onClick={handleNext} className="add-incident-button">Next</button>
          ) : (
            <button onClick={handleSubmit} className="add-incident-button">Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSecurityStaff;
