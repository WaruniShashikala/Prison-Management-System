import React, { useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import '../AddSecurityStaff/AddIncident.css';

const AddIncident = ({ isOpen, onClose, refreshList }) => {
  const [incidentData, setIncidentData] = useState({
    reportedBy: '',
    reportNumber: '',
    incidentType: '',
    dateOfIncident: '',
    location: '',
    time: '',
    description: '',
    inmateNumber: '',
    inmateName: '',
    action: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncidentData({ ...incidentData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!incidentData.reportedBy.trim()) {
      errors.reportedBy = 'Reported By is required';
    }

    if (!incidentData.reportNumber.trim()) {
      errors.reportNumber = 'Report Number is required';
    }

    if (!incidentData.incidentType.trim()) {
      errors.incidentType = 'Incident Type is required';
    }

    if (!incidentData.dateOfIncident) {
      errors.dateOfIncident = 'Date of Incident is required';
    } else {
      const incidentDate = new Date(incidentData.dateOfIncident);
      const currentDate = new Date();
      if (incidentDate > currentDate) {
        errors.dateOfIncident = 'Date of Incident cannot be a future date';
      }
    }

    if (!incidentData.location.trim()) {
      errors.location = 'Location is required';
    }

    if (!incidentData.time.trim()) {
      errors.time = 'Time is required';
    }

    if (!incidentData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!incidentData.inmateNumber.trim()) {
      errors.inmateNumber = 'Inmate Number is required';
    }

    if (!incidentData.inmateName.trim()) {
      errors.inmateName = 'Inmate Name is required';
    }
    if (!incidentData.inmateName.trim()) {
      errors.inmateName = 'Inmate Name is required';
    } else if (!/^[a-zA-Z]+$/.test(incidentData.inmateName)) {
      errors.inmateName = 'First Name cannot contain numbers or symbols';
    }

    if (!incidentData.action.trim()) {
      errors.action = 'Action is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:3500/api/incident/add', incidentData);
      refreshList(); // Refresh the list after successful addition
      onClose(); // Close the modal after successful addition
      console.log('Incident added successfully');
      toast.success('Incident Successfully Added ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });


      // Reset form fields
      setIncidentData({
        reportedBy: '',
        reportNumber: '',
        incidentType: '',
        dateOfIncident: '',
        location: '',
        time: '',
        description: '',
        inmateNumber: '',
        inmateName: '',
        action: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding incident:', error);
    }
  };

  return (
    <div className={`add-incident-overlay ${isOpen ? 'inci' : 'inci-hide'}`}>
      <div className="add-incident-container" >
        <FaWindowClose size={25} color='red' onClick={onClose} className="add-incident-close" />
        <div>
          <h2 className=''>Add New Incident</h2>
          <form onSubmit={handleSubmit}>
            <div className='flex gap-2'style={{display: "flex", alignItems:"center"}}>
              <div className="add-sec-div">
                <label className="text-gray-700">Reported By:</label>
                <div>
                  <input type="text" name="reportedBy" value={incidentData.reportedBy} onChange={handleChange} className={`border form-input`} />
                  {errors.reportedBy && <span className="add-incident-eroor">{errors.reportedBy}</span>}
                </div>
              </div>

              <div className="add-sec-div">
                <label className="text-gray-700">Report Number:</label>
                <div>
                  <input type="text" name="reportNumber" value={incidentData.reportNumber} onChange={handleChange} className={`border form-input`} />
                  {errors.reportNumber && <span className="add-incident-eroor">{errors.reportNumber}</span>}
                </div>
              </div>
            </div>


            <div className="add-sec-div">
              <label className="text-gray-700">Incident Type:</label>
              <div>
                <input type="text" name="incidentType" value={incidentData.incidentType} onChange={handleChange} className={`border  form-input`} />
                {errors.incidentType && <span className="add-incident-eroor">{errors.incidentType}</span>}
              </div>
            </div>

            <div style={{display: "flex", alignItems:"center"}}>
              <div className="add-sec-div">
                <label className="text-gray-700">Date of Incident:</label>
                <div>
                  <input type="date" name="dateOfIncident" value={incidentData.dateOfIncident} onChange={handleChange} className={`border form-input`} />
                  {errors.dateOfIncident && <span className="add-incident-eroor">{errors.dateOfIncident}</span>}
                </div>
              </div>
              <div className="add-sec-div">
                <label className="text-gray-700">Time:</label>
                <div>
                  <input type="time" name="time" value={incidentData.time} onChange={handleChange} className={`border  form-input`} />
                  {errors.time && <span className="add-incident-eroor">{errors.time}</span>}
                </div>
              </div>
            </div>

            <div className="add-sec-div">
              <label className="text-gray-700">Location:</label>
              <div>
                <input type="text" name="location" value={incidentData.location} onChange={handleChange} className={`border form-input`} />
                {errors.location && <span className="add-incident-eroor">{errors.location}</span>}
              </div>
            </div>
            <div style={{display: "flex", alignItems:"center"}}>
              <div className="add-sec-div">
                <label className="text-gray-700">Inmate Number:</label>
                <div>
                  <input type="text" name="inmateNumber" value={incidentData.inmateNumber} onChange={handleChange} className={`border  form-input`} />
                  {errors.inmateNumber && <span className="add-incident-eroor">{errors.inmateNumber}</span>}
                </div>
              </div>
              <div className="add-sec-div">
                <label className="text-gray-700">Inmate Name:</label>
                <div>
                  <input type="text" name="inmateName" value={incidentData.inmateName} onChange={handleChange} className={`border form-input`} />
                  {errors.inmateName && <span className="add-incident-eroor">{errors.inmateName}</span>}
                </div>
              </div>
            </div>
            <div className="add-sec-div">
              <label className="text-gray-700">Action:</label>
              <div>
                <input type="text" name="action" value={incidentData.action} onChange={handleChange} className={`border form-input`} />
                {errors.action && <span className="add-incident-eroor">{errors.action}</span>}
              </div>
            </div>
            <div className="add-sec-div">
              <label className="text-gray-700">Description:</label>
              <div>
                <textarea name="description" value={incidentData.description} onChange={handleChange} className={`border  form-input`} />
                {errors.description && <span className="add-incident-eroor">{errors.description}</span>}
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button type="submit" className='add-incident-button'>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddIncident;
