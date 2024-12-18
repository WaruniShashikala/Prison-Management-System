import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd'; 
import JailorPersonalInfo from './JailorPersonalInfo';
import JailorEmploymentInfo from './JailorEmploymentInfo';
import JailorHealthandEqumentInfo from './JailorHealthandEqumentInfo';
import './AddjailorForm.css'; 

function AddjailorForm() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    DateofBirth: "",
    NIC: "",
    ContactNumber: "",
    EmergencyContactNumber: "",
    MaritalStatus: "",
    Religion: "",
    Gender: "",
    jobTitle: "",
    Department: "",
    StartDate: "",
    EducationalBackground: "",
    RelevantCertifications: "",
    TrainingCoursesCompleted: "",
    UniformSize: "",
    IssuedEquipment: "",
    EquipmentTrainingStatus: "",
    MedicalConditions: "",
    Allergies: "",
    EmergencyMedicalInformation: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform form submission if on the last page
      if (page === FormTitles.length - 1) {
        try {
          await axios.post("http://localhost:3500/Jailors", formData);
          console.log("Form submitted successfully!");
          setIsSubmitted(true);
        } catch (error) {
          console.error("Error:", error);
          // Optionally, you might want to inform the user that there was an error
          message.error('Error submitting form. Please try again.');
        }
      } else {
        // Proceed to the next page
        setPage(page + 1);
      }
    } else {
      // Display error message for incomplete form
      message.error('Please fill out all required fields.');
    }
  };

  const handleFormClose = () => {
    // Logic to close the form
    setIsSubmitted(false);
  };

  const FormTitles = [
    "Jailor Personal Info",
    "Employment Details & Qualification and Training info",
    "Uniform and Equipment & Health and Medical Info"
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return <JailorPersonalInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <JailorEmploymentInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <JailorHealthandEqumentInfo formData={formData} setFormData={setFormData} />;
    }
  };

  if (isSubmitted) {
    return <div>Form submitted successfully!</div>;
  }

  const validateForm = () => {
    // Check for required fields based on the current page
    if (page === 0) {
      const requiredFields = ['FirstName', 'LastName', 'DateofBirth', 'NIC', 'ContactNumber', 'EmergencyContactNumber', 'MaritalStatus', 'Religion', 'Gender'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          return false;
        }
      }
    } else if (page === 1) {
      const requiredFields = ['jobTitle', 'Department', 'StartDate', 'EducationalBackground', 'RelevantCertifications', 'TrainingCoursesCompleted'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          return false;
        }
      }
    } else {
      const requiredFields = ['UniformSize', 'IssuedEquipment', 'MedicalConditions', 'Allergies', 'EmergencyMedicalInformation'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div className='form-Jailor' style={{marginLeft: -65,marginTop:-40}}>
        <div className='form-container' style={{border:'none'}}>
            <div className='header'>
                <div className='progressbar'style={{width:600}}>
                    <div className='progress' style={{ width: `${((page + 1) / FormTitles.length) * 100}%` }}></div>
                </div>
                <h2 style={{color: '#000000',marginLeft:50,width:500}}>{FormTitles[page]}</h2>
            </div>
            <div className='body'>
                {PageDisplay()}
            </div>
            <div className='addjailor-footer'>
                <button
                    disabled={page === 0}
                    onClick={() => setPage(currPage => currPage - 1)}
                    className='Addjailor-button-prev'
                >
                    Prev
                </button>
                {page !== FormTitles.length - 1 && (
                    <button onClick={() => setPage(currPage => currPage + 1)} className='Addjailor-button-next'style={{marginLeft:500}}>
                        Next
                    </button>
                )}
                {page === FormTitles.length - 1 && (
                    <button onClick={handleSubmit} className='Addjailor-button-submit'style={{marginLeft:500}}>
                        Submit
                    </button>
                )}
            </div>
        </div>
    </div>
);
}

export default AddjailorForm;
