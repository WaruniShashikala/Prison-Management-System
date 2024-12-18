import React, { useState, useEffect } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import '../AddSecurityStaff/AddIncident.css';
import '../UpdateSecurityStaff.css'

const UpdateIncident = ({ isOpen, onClose, refreshList, incidentId }) => {
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

  useEffect(() => {
    if (isOpen && incidentId) {
      fetchIncidentDetails(incidentId);
    }
  }, [isOpen, incidentId]);

  const fetchIncidentDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3500/api/incident/${id}`);
      const incident = response.data;
      const date = new Date(incident.dateOfIncident).toISOString().split('T')[0];
      setIncidentData({
        reportedBy: incident.reportedBy || '',
        reportNumber: incident.reportNumber || '',
        incidentType: incident.incidentType || '',
        dateOfIncident: date || '',
        location: incident.location || '',
        time: incident.time || '',
        description: incident.description || '',
        inmateNumber: incident.inmateNumber || '',
        inmateName: incident.inmateName || '',
        action: incident.action || '',
      });
    } catch (error) {
      console.error('Error fetching incident details:', error);
    }
  };

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
      await axios.put(`http://localhost:3500/api/incident/update/${incidentId}`, incidentData);
      toast.success('Incident Details Successfully Updated ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      onClose(); // Close the dialog after successful update
      refreshList(); // Refresh the incident list
    } catch (error) {
      console.error('Error updating incident details:', error);
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'sec-show' : 'sec-hide'}`}>
      <div className="update-model "  >
        <FaWindowClose size={25} color='red' onClick={onClose} className="close-icon" />
        <div>
          <h2 className='update-title'>Update Incident Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-6">
              <div className="w-1/2">
                <div className="form-input-div">
                  <label className="form-lable">Reported By:</label>
                  <div>
                    <input type="text" name="reportedBy" value={incidentData.reportedBy} onChange={handleChange} className={`border ${errors.reportedBy ? 'border-red-500' : 'border-gray-300'} form-input`} />
                    {errors.reportedBy && <span className="error-message">{errors.reportedBy}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Report Number:</label>
                  <div>
                    <input type="text" name="reportNumber" value={incidentData.reportNumber} onChange={handleChange} className={`border ${errors.reportNumber ? 'border-red-500' : 'border-gray-300'} form-input`} />
                    {errors.reportNumber && <span className="error-message">{errors.reportNumber}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Incident Type:</label>
                  <div>
                    <input type="text" name="incidentType" value={incidentData.incidentType} onChange={handleChange} className={`border ${errors.incidentType ? 'border-red-500' : 'border-gray-300'} form-input`} />
                    {errors.incidentType && <span className="error-message">{errors.incidentType}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Date of Incident:</label>
                  <div>
                    <input type="date" name="dateOfIncident" value={incidentData.dateOfIncident} onChange={handleChange} className={`border ${errors.dateOfIncident ? 'border-red-500' : 'border-gray-300'} form-input`} />
                    {errors.dateOfIncident && <span className="error-message">{errors.dateOfIncident}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Location:</label>
                  <div>
                    <input type="text" name="location" value={incidentData.location} onChange={handleChange} className={`border ${errors.location ? 'border-red-500' : 'border-gray-300'} form-input`} />
                    {errors.location && <span className="error-message">{errors.location}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Time:</label>
                  <div>
                    <input type="time" name="time" value={incidentData.time} onChange={handleChange} className={`border ${errors.time ? 'border-red-500' : 'border-gray-300'} form-input`} />
                    {errors.time && <span className="error-message">{errors.time}</span>}
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                

                <div className="form-input-div">
                  <label className="form-lable">Inmate Number:</label>
                  <div>
                    <input type="text" name="inmateNumber" value={incidentData.inmateNumber} onChange={handleChange} className={`border ${errors.inmateNumber ? 'border-red-500' : 'border-gray-300'} form-input`} />
                    {errors.inmateNumber && <span className="error-message">{errors.inmateNumber}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Inmate Name:</label>
                  <div>
                    <input type="text" name="inmateName" value={incidentData.inmateName} onChange={handleChange} className={`border ${errors.inmateName ? 'border-red-500' : 'border-gray-300'} form-input`} />
                    {errors.inmateName && <span className="error-message">{errors.inmateName}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Action:</label>
                  <div>
                    <input type="text" name="action" value={incidentData.action} onChange={handleChange} className={`border ${errors.action ? 'border-red-500' : 'border-gray-300'} form-input`} />
                    {errors.action && <span className="error-message">{errors.action}</span>}
                  </div>
                </div>
                <div className="form-input-div">
                  <label className="form-lable">Description:</label>
                  <div>
                    <textarea name="description" value={incidentData.description} onChange={handleChange} className={`border ${errors.description ? 'border-red-500' : 'border-gray-300'} form-input`} />
                    {errors.description && <span className="error-message">{errors.description}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button type="submit" className="print-button">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateIncident;
