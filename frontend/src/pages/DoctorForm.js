// DoctorForm.js
import React, { useState } from 'react';
import "./DoctorForm.css"
import axios from 'axios';
function DoctorForm() {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        DateofBirth: '',
        NIC: '',
        ContactNumber: '',
        Gender: '',
        Specialty: '',
        MedicalLicenseNumber: '',
        EducationalBackground: '',
        StartDate: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3500/Doctros", formData);
            console.log("Form submitted successfully!");
            // Optionally, you can perform any actions after successful submission
        } catch (error) {
            console.error("Error:", error);
            // Optionally, you might want to inform the user that there was an error
            // Make sure you have imported and initialized message.error correctly
            // message.error('Error submitting form. Please try again.');
        }
      };
    

   
    return (
        <form onSubmit={handleSubmit} className="doctor-form" style={{marginLeft:-10}}>
            <label htmlFor="firstName" className="Doctor-form-label">First Name:</label>
            <input
                type="text"
                id="firstName"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="lastName" className="Doctor-form-label">Last Name:</label>
            <input
                type="text"
                id="lastName"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="DateofBirth" className="Doctor-form-label">Date of Birth:</label>
            <input
                type="date"
                id="dateOfBirth"
                name="DateofBirth"
                value={formData.DateofBirth}
                onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="NIC" className="Doctor-form-label">NIC:</label>
            <input
                type="text"
                id="nic"
                name="NIC"
                value={formData.NIC}
                onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="contactNumber" className="Doctor-form-label">Contact Number:</label>
            <input
                type="tel"
                id="contactNumber"
                name="ContactNumber"
                value={formData.ContactNumber}
                onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="gender" className="Doctor-form-label">Gender:</label>
            <input
                type="text"
                id="gender"
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="specialty" className="Doctor-form-label">Specialty:</label>
            <input
                type="text"
                id="specialty"
                name="Specialty"
                value={formData.Specialty}
                onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="medicalLicenseNumber" className="Doctor-form-label">Medical License Number:</label>
            <input
                type="text"
                id="medicalLicenseNumber"
                name="MedicalLicenseNumber"
                value={formData.MedicalLicenseNumber}
                onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="educationalBackground" className="Doctor-form-label">Educational Background:</label>
            <input
                type="text"
                id="educationalBackground"
                name="EducationalBackground"
                value={formData.EducationalBackground}
                onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="startDate" className="Doctor-form-label">Start Date:</label>
            <input
                type="date"
                id="startDate"
                name="StartDate"
                value={formData.StartDate}
                onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <button type="submit" className="Doctor-submit-button">Submit</button>
        </form>
    );
}

export default DoctorForm;
