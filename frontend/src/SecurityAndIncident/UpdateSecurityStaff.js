import React, { useState, useEffect } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import './UpdateSecurityStaff.css'

const UpdateSecurityStaff = ({ isOpen, onClose, refreshList, securityStaffId }) => {

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
    completedCourses: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && securityStaffId) {
      fetchSecurityStaffDetails(securityStaffId);
    }
  }, [isOpen, securityStaffId]);

  const fetchSecurityStaffDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3500/api/securityStaff/${id}`);
      const staff = response.data;
      const date = new Date(staff.dateOfBirth).toISOString().split('T')[0];
      setSecurityStaffData({
        firstName: staff.firstName,
        lastName: staff.lastName,
        dateOfBirth: date,
        gender: staff.gender,
        nic: staff.nic,
        phone: staff.phone,
        maritalStatus: staff.maritalStatus,
        religion: staff.religion,
        educationalBackground: staff.educationalBackground,
        certification: staff.certification,
        completedCourses: staff.completedCourses.join(', '),
      });
    } catch (error) {
      console.error('Error fetching security staff details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSecurityStaffData({ ...securityStaffData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!securityStaffData.firstName.trim()) {
      errors.firstName = 'First Name is required';
    } else if (!/^[a-zA-Z]+$/.test(securityStaffData.firstName.trim())) {
      errors.firstName = 'First Name should contain only letters';
    }

    if (!securityStaffData.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    } else if (!/^[a-zA-Z]+$/.test(securityStaffData.lastName.trim())) {
      errors.lastName = 'Last Name should contain only letters';
    }

    if (!securityStaffData.dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required';
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(securityStaffData.dateOfBirth);
      if (selectedDate > currentDate) {
        errors.dateOfBirth = 'Date of Birth cannot be a future date';
      }
    }

    if (!securityStaffData.nic.trim()) {
      errors.nic = 'NIC is required';
    } else if (!/^(\d{9}[x|X|v|V]|\d{12})$/.test(securityStaffData.nic)) {
      errors.nic = 'NIC should be in the format 996587458v ';
    }

    if (!securityStaffData.phone.trim()) {
      errors.phone = 'Phone is required';
    } else if (!/^0\d{9}$/.test(securityStaffData.phone.trim())) {
      errors.phone = 'Phone number should start with 0 and be 10 digits long';
    }

    if (!securityStaffData.maritalStatus.trim()) {
      errors.maritalStatus = 'Marital Status is required';
    }

    if (!securityStaffData.religion.trim()) {
      errors.religion = 'Religion is required';
    }

    if (!securityStaffData.educationalBackground.trim()) {
      errors.educationalBackground = 'Educational Background is required';
    }

    if (!securityStaffData.certification.trim()) {
      errors.certification = 'Certification is required';
    }

    if (!securityStaffData.completedCourses.trim()) {
      errors.completedCourses = 'Completed Courses is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.put(`http://localhost:3500/api/securityStaff/update/${securityStaffId}`, securityStaffData);
      toast.success('Security Staff Successfully Updated ', {
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
      refreshList(); // Refresh the security staff list
    } catch (error) {
      console.error('Error updating security staff:', error);
    }
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'sec-show' : 'sec-hide'}`}>
      <div className="update-model " >
        <FaWindowClose size={25} color='red' onClick={onClose} className="close-icon" />
        <div>
          <h2 className='update-title'>Update Security Staff Details</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="w-1/2">
                <div className="form-input-div">
                  <label className="form-lable">First Name:</label>
                  <div>
                    <input type="text" name="firstName" value={securityStaffData.firstName} onChange={handleChange} className={`${errors.firstName ? 'form-error-border' : 'form-border'}  form-input`} />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Last Name:</label>
                  <div>
                    <input type="text" name="lastName" value={securityStaffData.lastName} onChange={handleChange} className={` ${errors.lastName ? 'form-error-border' : 'form-border'}  form-input`} />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
                <div className="form-input-div">
                  <label className="form-lable">Date of Birth:</label>
                  <div>
                    <input type="date" name="dateOfBirth" value={securityStaffData.dateOfBirth} onChange={handleChange} className={` ${errors.dateOfBirth ? 'form-error-border' : 'form-border'}  form-input`} />
                    {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Gender:</label>
                  <div>
                    <select name="gender" value={securityStaffData.gender} onChange={handleChange} className={` ${errors.gender ? 'form-error-border' : 'form-border'}  form-input`}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <span className="error-message">{errors.gender}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">NIC:</label>
                  <div>
                    <input type="text" name="nic" value={securityStaffData.nic} onChange={handleChange} className={` ${errors.nic ? 'form-error-border' : 'form-border'}  form-input`} />
                    {errors.nic && <span className="error-message">{errors.nic}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Phone:</label>
                  <div>
                    <input type="text" name="phone" value={securityStaffData.phone} onChange={handleChange} className={` ${errors.phone ? 'form-error-border' : 'form-border'}  form-input`} />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                <div className="form-input-div">
                  <label className="form-lable">Marital Status:</label>
                  <div>
                    <select name="maritalStatus" value={securityStaffData.maritalStatus} onChange={handleChange} className={` ${errors.maritalStatus ? 'form-error-border' : 'form-border'}  form-input`}>
                      <option value="">Select Marital Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                    </select>
                    {errors.maritalStatus && <span className="error-message">{errors.maritalStatus}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Religion:</label>
                  <div>
                    <input type="text" name="religion" value={securityStaffData.religion} onChange={handleChange} className={` ${errors.religion ? 'form-error-border' : 'form-border'}  form-input`} />
                    {errors.religion && <span className="error-message">{errors.religion}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Educational Background:</label>
                  <div>
                    <input type="text" name="educationalBackground" value={securityStaffData.educationalBackground} onChange={handleChange} className={` ${errors.educationalBackground ? 'form-error-border' : 'form-border'}  form-input`} />
                    {errors.educationalBackground && <span className="error-message">{errors.educationalBackground}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Certification:</label>
                  <div>
                    <input type="text" name="certification" value={securityStaffData.certification} onChange={handleChange} className={` ${errors.certification ? 'form-error-border' : 'form-border'}  form-input`} />
                    {errors.certification && <span className="error-message">{errors.certification}</span>}
                  </div>
                </div>

                <div className="form-input-div">
                  <label className="form-lable">Completed Courses:</label>
                  <div>
                    <textarea
                      name="completedCourses"
                      value={securityStaffData.completedCourses}
                      onChange={handleChange}
                      className={`border ${errors.completedCourses ? 'form-error-border' : 'form-border'}  form-input`}
                    />
                    {errors.completedCourses && <span className="error-message">{errors.completedCourses}</span>}
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

export default UpdateSecurityStaff;
