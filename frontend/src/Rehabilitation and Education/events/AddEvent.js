import React, { useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/AllForm.css';

const AddEvent = ({ isOpen, onClose, refreshList }) => {
  const [eventData, setEventData] = useState({
    eventName: '',
    category: '',
    date: '',
    time: '',
    organizer: '',
    targetAudience: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleKeyPress = (e) => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/g;
    if (regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!eventData.eventName.trim()) {
      errors.eventName = 'Event Name is required';
    } else if (/[^a-zA-Z0-9\s]/.test(eventData.eventName.trim())) {
      errors.eventName = 'Event Name cannot include symbols';
    }

    if (!eventData.category.trim()) {
      errors.category = 'Category is required';
    }

    if (!eventData.date) {
      errors.date = 'Date is required';
    } else {
      const selectedDate = new Date(eventData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to start of day for comparison
      if (selectedDate < today) {
        errors.date = 'Date must be today or in the future';
      }
    }

    if (!eventData.time.trim()) {
      errors.time = 'Time is required';
    } 

    if (!/^[a-zA-Z\s]*$/.test(eventData.organizer.trim())) {
      errors.organizer = 'Organizer cannot include numbers or symbols';
    }

    if (!eventData.organizer.trim()) {
      errors.organizer = 'Organizer is required';
    }

    if (!eventData.targetAudience.trim()) {
      errors.targetAudience = 'Target Audience is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post('http://localhost:3500/api/event/add', eventData);
      refreshList();
      onClose();
      console.log('Event added successfully');
      toast.success('Event Successfully Added ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setEventData({
        eventName: '',
        category: '',
        date: '',
        time: '',
        organizer: '',
        targetAudience: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className={`r-add-incident-overlay ${isOpen ? 'r-inci' : 'r-inci-hide'}`}>
      <div className="r-add-incident-container" >
        <FaWindowClose size={25} color='red' onClick={onClose} className="r-add-incident-close" />
        <div>
          <h2 className='p-4 text-xl font-semibold text-center'>Add New Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="r-add-sec-div">
              <label className="text-gray-700">Event Name:</label>
              <div>
                <input
                  type="text"
                  name="eventName"
                  value={eventData.eventName}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className={`border ${errors.eventName ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`}
                />
                {errors.eventName && <span className="r-add-incident-error">{errors.eventName}</span>}
              </div>
            </div>

            <div className="r-add-sec-div">
              <label className="text-gray-700">Category:</label>
              <div>
                <select
                  name="category"
                  value={eventData.category}
                  onChange={handleChange}
                  className={`border ${errors.category ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`}
                >
                  <option value="">Select Category</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Religious">Religious</option>
                  <option value="Health and Wellness">Health and Wellness</option>
                  <option value="Professional Development">Professional Development</option>
                </select>
                {errors.category && <span className="r-add-incident-error">{errors.category}</span>}
              </div>
            </div>

            <div className="r-add-sec-div">
              <label className="text-gray-700">Date:</label>
              <div>
                <input
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleChange}
                  className={`border ${errors.date ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`}
                />
                {errors.date && <span className="r-add-incident-error">{errors.date}</span>}
              </div>
            </div>

            <div className="r-add-sec-div">
              <label className="text-gray-700">Time:</label>
              <div>
                <input
                  type="time"
                  name="time"
                  value={eventData.time}
                  onChange={handleChange}
                  className={`border ${errors.time ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`}
                />
                {errors.time && <span className="r-add-incident-error">{errors.time}</span>}
              </div>
            </div>

            <div className="r-add-sec-div">
              <label className="text-gray-700">Organizer:</label>
              <div>
                <input
                  type="text"
                  name="organizer"
                  value={eventData.organizer}
                  onChange={handleChange}
                  className={`border ${errors.organizer ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`}
                />
                {errors.organizer && <span className="r-add-incident-error">{errors.organizer}</span>}
              </div>
            </div>

            <div className="r-add-sec-div">
              <label className="text-gray-700">Target Audience:</label>
              <div>
                <select
                  name="targetAudience"
                  value={eventData.targetAudience}
                  onChange={handleChange}
                  className={`border ${errors.targetAudience ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`}
                >
                  <option value="">Select Target Audience</option>
                  <option value="Inmates">Inmates</option>
                  <option value="Staff">Staff</option>
                  <option value="Both">Both</option>
                </select>
                {errors.targetAudience && <span className="r-add-incident-error">{errors.targetAudience}</span>}
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <button type="submit" className="r-add-incident-button">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
