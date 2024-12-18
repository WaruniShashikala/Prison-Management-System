import React, { useState,useEffect } from 'react';
import axios from 'axios'; 
import "./UpdateDoctor.css"

function UpdateDoctor({ selectedDoctor, onUpdate, updateDoctor }) {
    const [inputs, setInputs] = useState(selectedDoctor);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/Doctros/${selectedDoctor._id}`);
                setInputs(response.data);
            } catch (error) {
                console.error('Error fetching jailor data:', error);
            }
        };
        fetchDoctorData();
    }, [selectedDoctor]);
    const handleSubmit = async (e) => {
      e.preventDefault();
      await updateDoctor(selectedDoctor._id, inputs);
      onUpdate(inputs);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
};

return (
    <div>
            <form onSubmit={handleSubmit}>

            <label htmlFor="firstName" className="Doctor-form-label">First Name:</label>
            <input
                type="text"
                id="firstName"
                name="FirstName"
                value={inputs.FirstName} onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="lastName" className="Doctor-form-label">Last Name:</label>
            <input
                type="text"
                id="lastName"
                name="LastName"
                value={inputs. LastName} onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="DateofBirth" className="Doctor-form-label">Date of Birth:</label>
            <input
                type="date"
                id="dateOfBirth"
                name="DateofBirth"
                value={inputs.DateofBirth} onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="NIC" className="Doctor-form-label">NIC:</label>
            <input
                type="text"
                id="nic"
                name="NIC"
                value={inputs.NIC} onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="contactNumber" className="Doctor-form-label">Contact Number:</label>
            <input
                type="tel"
                id="contactNumber"
                name="ContactNumber"
                value={inputs.ContactNumber} onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="gender" className="Doctor-form-label">Gender:</label>
            <input
                type="text"
                id="gender"
                name="Gender"
                value={inputs.Gender} onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="specialty" className="Doctor-form-label">Specialty:</label>
            <input
                type="text"
                id="specialty"
                name="Specialty"
                value={inputs.Specialty} onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="medicalLicenseNumber" className="Doctor-form-label">Medical License Number:</label>
            <input
                type="text"
                id="medicalLicenseNumber"
                name="MedicalLicenseNumber"
                value={inputs.MedicalLicenseNumber} onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="educationalBackground" className="Doctor-form-label">Educational Background:</label>
            <input
                type="text"
                id="educationalBackground"
                name="EducationalBackground"
                value={inputs.EducationalBackground} onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

            <label htmlFor="startDate" className="Doctor-form-label">Start Date:</label>
            <input
                type="date"
                id="startDate"
                name="StartDate"
                value={inputs.StartDate} onChange={handleChange}
                className="Doctor-form-input"
                required
            /><br/>

<button type="submit" className='update-Doctor-submit-button'>Submit</button>
            </form>
            </div>
)
}
export default UpdateDoctor;
