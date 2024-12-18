import React, { useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import PersonalInformation from './PersonalInformation';
import VisitDetails from './VisitDetails';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../CssFiles/AllForm.css';

const AddNewVisitor = ({ isOpen, onClose, refreshList }) => {
  const [visitorData, setVisitorData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nic: '',
    address: '',
    email: '',
    contactNumber: '',
    inmateNo: '',
    inmateName: '',
    dateOfVisit: '',
    timeOfVisit: '',
    purposeOfVisit: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nic: '',
    address: '',
    email: '',
    contactNumber: '',
    inmateNo: '',
    inmateName: '',
    dateOfVisit: '',
    timeOfVisit: '',
    purposeOfVisit: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisitorData({
      ...visitorData,
      [name]: value
    });
    // Clear the error message when the user starts typing again
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const validatePhone = (phone) => {
    const phoneRegex = /^(0)\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateStep = (step) => {
    const validationErrors = {};
    // Personal Information validation
    if (step === 1) {
      // Perform validation for each field
      if (!visitorData.firstName) {
        validationErrors.firstName = 'First Name is required';
      } else if (!/^[a-zA-Z]+$/.test(visitorData.firstName)) {
        validationErrors.firstName = 'First Name cannot contain symbols or numbers';
      }
      if (!visitorData.lastName) {
        validationErrors.lastName = 'Last Name is required';
      } else if (!/^[a-zA-Z]+$/.test(visitorData.lastName)) {
        validationErrors.lastName = 'Last Name cannot contain symbols or numbers';
      }
      if (!visitorData.dateOfBirth) {
        validationErrors.dateOfBirth = 'Date of Birth is required';
      } else {
        const today = new Date();
        const selectedDate = new Date(visitorData.dateOfBirth);
        if (selectedDate >= today) {
          validationErrors.dateOfBirth = 'Date of Birth cannot be today or a future date';
        }
      }
      if (!visitorData.gender) {
        validationErrors.gender = 'Gender is required';
      }
      if (!visitorData.nic) {
        validationErrors.nic = 'NIC is required';
      } else {
        const nicRegex = /^(?:\d{12}|(?:\d{9}[xXvV]))$/;
        if (!nicRegex.test(visitorData.nic)) {
          validationErrors.nic = 'Invalid NIC format';
        }
      }
      if (!visitorData.address) {
        validationErrors.address = 'Address is required';
      }
      if (!visitorData.email) {
        validationErrors.email = 'Email is required';
      } else if (!validateEmail(visitorData.email)) {
        validationErrors.email = 'Invalid email format';
      }
      if (!visitorData.contactNumber) {
        validationErrors.contactNumber = 'Contact Number is required';
      } else if (!validatePhone(visitorData.contactNumber)) {
        validationErrors.contactNumber = 'Contact number must start with 0 and have 10 digits';
      }
    }
    // Visit Details validation
    if (step === 2) {
      if (!visitorData.inmateNo) {
        validationErrors.inmateNo = 'Inmate Number is required';
      }
      if (!visitorData.inmateName) {
        validationErrors.inmateName = 'Inmate Name is required';
      }
      if (!visitorData.dateOfVisit) {
        validationErrors.dateOfVisit = 'Date of Visit is required';
      }
      if (!visitorData.timeOfVisit) {
        validationErrors.timeOfVisit = 'Time of Visit is required';
      }
      if (!visitorData.purposeOfVisit) {
        validationErrors.purposeOfVisit = 'Purpose of Visit is required';
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
        const response = await axios.post('http://localhost:3500/api/visitor/add', visitorData);
        onClose();
        refreshList();
        toast.success('Visitor Successfully Added ', {
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
        setVisitorData({
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          gender: '',
          nic: '',
          address: '',
          email: '',
          contactNumber: '',
          inmateNo: '',
          inmateName: '',
          dateOfVisit: '',
          timeOfVisit: '',
          purposeOfVisit: ''
        });
        console.log(response);
      } catch (error) {
        console.error('Error adding visitor:', error.message);
        toast.error('Error adding visitor', {
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
    <div className={`v-add-incident-overlay ${isOpen ? 'v-inci-show' : 'v-inci-hide'}`}>
      <div className="v-add-incident-container">
        <FaWindowClose size={25} color='red' onClick={onClose} className="v-add-incident-close" />
        {step === 1 && <PersonalInformation visitorData={visitorData} handleChange={handleChange} errors={errors} />}
        {step === 2 && <VisitDetails visitorData={visitorData} handleChange={handleChange} errors={errors} />}
        <div className="v-button-line">
          {step > 1 && (
            <button onClick={handlePrevious} className="v-add-incident-button">Previous</button>
          )}
          {step < 2 ? (
            <button onClick={handleNext} className="v-add-incident-button">Next</button>
          ) : (
            <button onClick={handleSubmit} className="v-add-incident-button">Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewVisitor;
