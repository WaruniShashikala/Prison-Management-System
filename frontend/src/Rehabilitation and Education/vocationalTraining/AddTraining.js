import React, { useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/AllForm.css';

const AddTraining = ({ isOpen, onClose, refreshList }) => {
  const [trainingData, setTrainingData] = useState({
    trainingName: '',
    vocationalField: '',
    date: '',
    time: '',
    location: '', 
    durationHours: '', 
    leadInstructor: '', 
    maxParticipants: '' 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainingData({ ...trainingData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!trainingData.trainingName.trim()) {
      errors.trainingName = 'Training Name is required';
    }

    if (!trainingData.vocationalField.trim()) {
      errors.vocationalField = 'Vocational Field is required';
    }

    if (!trainingData.date) {
      errors.date = 'Date is required';
    } else {
      const selectedDate = new Date(trainingData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to start of day for comparison
      if (selectedDate < today) {
        errors.date = 'Date must be today or in the future';
      }
    }

    if (!trainingData.time.trim()) {
      errors.time = 'Time is required';
    }

    if (!trainingData.location.trim()) { // Validate location
      errors.location = 'Location is required';
    }

    if (!trainingData.durationHours.trim()) { // Validate durationHours
      errors.durationHours = 'Duration (Hours) is required';
    } else if (!/^\d+$/.test(trainingData.durationHours)) {
      errors.durationHours = 'Duration (Hours) must be a number';
    }

    if (!trainingData.leadInstructor.trim()) { // Validate leadInstructor
      errors.leadInstructor = 'Lead Instructor is required';
    } else if (!/^[a-zA-Z\s]*$/.test(trainingData.leadInstructor.trim())) {
      errors.leadInstructor = 'Lead Instructor cannot include numbers or symbols';
    }

    if (!trainingData.maxParticipants.trim()) { // Validate maxParticipants
      errors.maxParticipants = 'Max Participants is required';
    } else if (!/^\d+$/.test(trainingData.maxParticipants)) {
      errors.maxParticipants = 'Max Participants must be a number';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:3500/api/vocationalTraining/add', trainingData);
      refreshList(); // Refresh the list after successful addition
      onClose(); // Close the modal after successful addition
      console.log('Training added successfully');
      toast.success('Training Successfully Added ', {
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
      setTrainingData({
        trainingName: '',
        vocationalField: '',
        date: '',
        time: '',
        location: '', // Reset location field
        durationHours: '', // Reset durationHours field
        leadInstructor: '', // Reset leadInstructor field
        maxParticipants: '' // Reset maxParticipants field
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding training:', error);
    }
  };

  return (
    <div className={`r-add-incident-overlay ${isOpen ? 'r-inci' : 'r-inci-hide'}`}>
      <div className="r-add-incident-container"  >
        <FaWindowClose size={25} color='red' onClick={onClose} className="r-add-incident-close"  />
        <div>
          <h2 >Add New Training</h2>
          <form onSubmit={handleSubmit}>
            <div className="r-add-sec-div">
              <label className="text-gray-700">Training Name:</label>
              <div>
                <input type="text" name="trainingName" value={trainingData.trainingName} onChange={handleChange} className={`border ${errors.trainingName ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                {errors.trainingName && <span className="r-add-incident-error">{errors.trainingName}</span>}
              </div>
            </div>

            <div className="r-add-sec-div">
              <label className="text-gray-700">Vocational Field:</label>
              <div>
                <input type="text" name="vocationalField" value={trainingData.vocationalField} onChange={handleChange} className={`border ${errors.vocationalField ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                {errors.vocationalField && <span className="r-add-incident-error">{errors.vocationalField}</span>}
              </div>
            </div>

            <div className="r-add-sec-div">
              <label className="text-gray-700">Date:</label>
              <div>
                <input type="date" name="date" value={trainingData.date} onChange={handleChange} className={`border ${errors.date ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                {errors.date && <span className="r-add-incident-error">{errors.date}</span>}
              </div>
            </div>

            <div className="r-add-sec-div">
              <label className="text-gray-700">Time:</label>
              <div>
                <input type="time" name="time" value={trainingData.time} onChange={handleChange} className={`border ${errors.time ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                {errors.time && <span className="r-add-incident-error">{errors.time}</span>}
              </div>
            </div>

            <div className="r-add-sec-div">
              <label className="text-gray-700">Location:</label>
              <div>
                <input type="text" name="location" value={trainingData.location} onChange={handleChange} className={`border ${errors.location ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                {errors.location && <span className="r-add-incident-error">{errors.location}</span>}
              </div>
            </div>

            <div className="r-add-sec-div">
              <label className="text-gray-700">Duration (Hours):</label>
              <div>
                <input type="number" name="durationHours" value={trainingData.durationHours} onChange={handleChange} className={`border ${errors.durationHours ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                {errors.durationHours && <span className="r-add-incident-error">{errors.durationHours}</span>}
              </div>
            </div>

            <div className="r-add-sec-div">
              <label className="text-gray-700">Lead Instructor:</label>
              <div>
                <input type="text" name="leadInstructor" value={trainingData.leadInstructor} onChange={handleChange} className={`border ${errors.leadInstructor ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                {errors.leadInstructor && <span className="r-add-incident-error">{errors.leadInstructor}</span>}
              </div>
            </div>

            <div className="r-add-sec-div">
              <label className="text-gray-700">Max Participants:</label>
              <div>
                <input type="number" name="maxParticipants" value={trainingData.maxParticipants} onChange={handleChange} className={`border ${errors.maxParticipants ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                {errors.maxParticipants && <span className="r-add-incident-error">{errors.maxParticipants}</span>}
              </div>
            </div>

            <div >
              <button type="submit" className="r-add-incident-button">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTraining;
