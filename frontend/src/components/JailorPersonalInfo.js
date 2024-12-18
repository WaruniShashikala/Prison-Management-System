import React, { useState } from 'react';
import "./JailorPersonalInfo.css";

function JailorPersonalInfo({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value.toLowerCase() // Ensure value is lowercase
    }));
    validateInput(name, value); // Validate input on change
  };

  const validateInput = (name, value) => {
    const nameRegex = /^[a-zA-Z\s]+$/; // Allow alphabetic characters and spaces for name
    const nicRegex = /^[0-9]{9}[vVxX]?$|^[0-9]{12}$/; // Adjusted NIC regex to allow optional 'v', 'V', 'x', or 'X' at the end
    const contactNumberRegex = /^\d+$/; // Allow any digits for contact number
    const EmergencyContactNumberRegex = /^\d+$/; // Allow any digits for emergency contact number
    const currentDate = new Date(); // Get current date

    switch (name) {
      case 'FirstName':
        if (!nameRegex.test(value)) {
          setFormData(prevData => ({
            ...prevData,
            FirstName: value.replace(/[^a-zA-Z\s]/g, '') // Remove non-alphabetic characters
          }));
        }
        break;
      case 'LastName':
        if (!nameRegex.test(value)) {
          setFormData(prevData => ({
            ...prevData,
            LastName: value.replace(/[^a-zA-Z\s]/g, '') // Remove non-alphabetic characters
          }));
        }
        break;
      case 'NIC':
        if (!nicRegex.test(value)) {
          setFormData(prevData => ({
            ...prevData,
            NIC: value.replace(/[^0-9vVxX\s]/g,'')
          }));
        } 
        break;
      case 'ContactNumber':
        if (!contactNumberRegex.test(value)) {
          setFormData(prevData => ({
            ...prevData,
            ContactNumber:value.replace(/[^\d+\s]/g,'')
          }));
        } 
        break;
      case 'EmergencyContactNumber':
        if (!EmergencyContactNumberRegex.test(value)) {
          setFormData(prevData => ({
            ...prevData,
            EmergencyContactNumber: value.replace(/[^\d+\s]/g,'')
          }));
        } 
        break;
      case 'DateofBirth':
        const dateOfBirth = new Date(value); // Convert input value to a Date object
        if (isNaN(dateOfBirth.getTime())) { // Check if input value is a valid date
          setErrors(prevErrors => ({
            ...prevErrors,
            DateOfBirthError: 'Invalid date of birth'
          }));
        } else {
          const age = currentDate.getFullYear() - dateOfBirth.getFullYear(); // Calculate age
          if (age < 18 || age > 30) { // Validate age
            setErrors(prevErrors => ({
              ...prevErrors,
              DateOfBirthError: 'Age must be between 18 and 30 years'
            }));
          } else {
            setErrors(prevErrors => ({
              ...prevErrors,
              DateOfBirthError: '' // Clear error if age is valid
            }));
          }
        }
        break;
      default:
        break;
    }
  };

  const [errors, setErrors] = useState({
    FirstNameError: '',
    LastNameError: '',
    NICError: '',
    ContactNumberError: '',
    EmergencyContactNumberError: '',
    DateOfBirthError: '' // Error state for date of birth validation
  });

  return (
    <div className='form1'style={{width:650}}>
      <label className='Addjailor-lable'>First Name: </label>
      <input type="text" className='addjailorinputs' name="FirstName" value={formData.FirstName} onChange={handleChange} required/>
      <br />
      {errors.FirstNameError && <span className="error">{errors.FirstNameError}</span>}
      <br/>
      <label className='Addjailor-lable'>Last Name: </label>
      <input type="text" className='addjailorinputs' name="LastName" value={formData.LastName} onChange={handleChange} required/><br />
      {errors.LastNameError && <span className="error">{errors.LastNameError}</span>}
      <br/>
      <label className='Addjailor-lable'>Date of Birth: </label>
      <input type="date" className='addjailorinputs' name="DateofBirth" value={formData.DateofBirth} onChange={handleChange} required/><br />
      {errors.DateOfBirthError && <span className="error">{errors.DateOfBirthError}</span>}
      <br />
      <label className='Addjailor-lable'>NIC: </label>
      <input type="text" className='addjailorinputs' name="NIC" value={formData.NIC} onChange={handleChange} required/><br />
      {errors.NICError && <span className="error">{errors.NICError}</span>}
      <br />
      <label className='Addjailor-lable'>Contact Number: </label>
      <input type="text" className='addjailorinputs' name="ContactNumber" value={formData.ContactNumber} onChange={handleChange} required/><br />
      {errors.ContactNumberError && <span className="error">{errors.ContactNumberError}</span>}
      <br />
      <label className='Addjailor-lable'>Emergency Contact Number: </label>
      <input type="text" className='addjailorinputs' name="EmergencyContactNumber" value={formData.EmergencyContactNumber} onChange={handleChange} required/><br />
      {errors.EmergencyContactNumberError && <span className="error">{errors.EmergencyContactNumberError}</span>}
      <br />
      <label className='Addjailor-lable'>Marital Status:</label>
      <select name="MaritalStatus" className='addjailorinputs' value={formData.MaritalStatus} onChange={handleChange} required>
        <option value="" disabled defaultValue>Choose an option</option>
        <option value="married">Married</option>
        <option value="unmarried">Unmarried</option>
      </select><br />
      <label className='Addjailor-lable'>Religion:</label>
      <select name="Religion" className='addjailorinputs' value={formData.Religion} onChange={handleChange} required>
        <option value="" disabled defaultValue>Choose an option</option>
        <option value="buddhists">Buddhists</option>
        <option value="hindus">Hindus</option>
        <option value="muslims">Muslims</option>
        <option value="christians">Christians</option>
      </select><br />
      <label className='Addjailor-lable'>Gender: </label>
      <input type="radio" id="male" name="Gender" value="male" onChange={handleChange} checked={formData.Gender === "male"} required/>
      <label htmlFor="male" className='radio-lable'>Male</label>
      <input type="radio" id="female" name="Gender" value="female" onChange={handleChange} checked={formData.Gender === "female"} required/>
      <label htmlFor="female" className='radio-lable'>Female</label>
    </div>
  );
}

export default JailorPersonalInfo;