import React, { useEffect, useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import './CssFiles/AllForm.css';

const UpdateVisitor = ({ isOpen, onClose, refreshList, visitorId }) => {
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

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen && visitorId) {
            fetchVisitorDetails(visitorId);
        }
    }, [isOpen, visitorId]);

    const fetchVisitorDetails = async (visitorId) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/visitor/${visitorId}`);
            const { dateOfBirth, dateOfVisit, ...visitorDetails } = response.data;
            
            // Format dateOfBirth
            const formattedDateOfBirth = new Date(dateOfBirth).toISOString().split('T')[0];
            // Format dateOfVisit
            const formattedDateOfVisit = new Date(dateOfVisit).toISOString().split('T')[0];
            
            // Set formatted dates along with other visitor details
            setVisitorData({
                ...visitorDetails,
                dateOfBirth: formattedDateOfBirth,
                dateOfVisit: formattedDateOfVisit
            });
        } catch (error) {
            console.error('Error fetching visitor details:', error);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVisitorData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const errors = {};

        // Validation rules
        if (!visitorData.firstName.trim()) {
            errors.firstName = 'First Name is required';
        } else if (!/^[a-zA-Z]+$/.test(visitorData.firstName)) {
            errors.firstName = 'First Name cannot contain symbols or numbers';
        }
        if (!visitorData.lastName.trim()) {
            errors.lastName = 'Last Name is required';
        } else if (!/^[a-zA-Z]+$/.test(visitorData.lastName)) {
            errors.lastName = 'Last Name cannot contain symbols or numbers';
        }
        if (!visitorData.dateOfBirth) {
            errors.dateOfBirth = 'Date of Birth is required';
        } else {
            const today = new Date();
            const selectedDate = new Date(visitorData.dateOfBirth);
            if (selectedDate >= today) {
                errors.dateOfBirth = 'Date of Birth cannot be today or a future date';
            }
        }
        if (!visitorData.gender) {
            errors.gender = 'Gender is required';
        }
        if (!visitorData.nic.trim()) {
            errors.nic = 'NIC is required';
        } else {
            const nicRegex = /^(?:\d{9}[xXvV]|\d{12})$/;
            if (!nicRegex.test(visitorData.nic)) {
                errors.nic = 'Invalid NIC format';
            }
        }
        if (!visitorData.address.trim()) {
            errors.address = 'Address is required';
        }
        if (!visitorData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(visitorData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!visitorData.contactNumber.trim()) {
            errors.contactNumber = 'Contact Number is required';
        } else if (!/^0\d{9}$/.test(visitorData.contactNumber)) {
            errors.contactNumber = 'Contact number must start with 0 and have 10 digits';
        }
        if (!visitorData.inmateNo.trim()) {
            errors.inmateNo = 'Inmate Number is required';
        }
        if (!visitorData.inmateName.trim()) {
            errors.inmateName = 'Inmate Name is required';
        }
        if (!visitorData.dateOfVisit) {
            errors.dateOfVisit = 'Date of Visit is required';
        }
        if (!visitorData.timeOfVisit) {
            errors.timeOfVisit = 'Time of Visit is required';
        }
        if (!visitorData.purposeOfVisit.trim()) {
            errors.purposeOfVisit = 'Purpose of Visit is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValidEmail = (email) => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.put(`http://localhost:3500/api/visitor/update/${visitorId}`, visitorData);
            toast.success('Visitor Successfully Updated ', {
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
            refreshList(); // Refresh the visitor list
        } catch (error) {
            console.error('Error updating visitor:', error);
        }
    };


    return (
        <div className={`v-add-incident-overlay ${isOpen ? 'v-inci' : 'v-inci-hide'}`}>
            <div className="v-add-incident-container">
                <FaWindowClose size={25} color='red' onClick={onClose} className="v-add-incident-close" />
                <h1 className="mb-4 text-xl font-bold text-center">Update Visitor</h1>
                <form onSubmit={handleSubmit}>
                   
                    <div className='' style={{display: 'flex', justifyContent:"space-between", gap: "15px"}}>
                      
                        <div>
                            <div className="" style={{padding: '2px'}}>
                                <label style={{marginBottom: '5px'}}>First Name:</label>
                                <input type="text" name="firstName" value={visitorData.firstName} onChange={handleChange} className={`v-form-input ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                                {errors.firstName && <span className="v-add-incident-eroor">{errors.firstName}</span>}
                            </div>
                            <div className="" style={{padding: '5px'}}>
                                <label style={{marginBottom: '5px'}}>Last Name:</label>
                                <input type="text" name="lastName" value={visitorData.lastName} onChange={handleChange} className={`v-form-input ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                                {errors.lastName && <span className="v-add-incident-eroor">{errors.lastName}</span>}
                            </div>
                            <div className="" style={{padding: '5px'}}>
                                <label style={{marginBottom: '5px'}}>Date of Birth:</label>
                                <input type="date" name="dateOfBirth" value={visitorData.dateOfBirth} onChange={handleChange} className={`v-form-input ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                                {errors.dateOfBirth && <span className="v-add-incident-eroor">{errors.dateOfBirth}</span>}
                            </div>
                            <div className="" style={{padding: '5px'}}>
                                <label style={{marginBottom: '5px'}}>Gender:</label>
                                <select name="gender" value={visitorData.gender} onChange={handleChange} className={`v-form-input ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md`}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender && <span className="v-add-incident-eroor">{errors.gender}</span>}
                            </div>
                            <div className="" style={{padding: '5px'}}>
                                <label style={{marginBottom: '5px'}}>NIC:</label>
                                <input type="text" name="nic" value={visitorData.nic} onChange={handleChange} className={`v-form-input ${errors.nic ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                                {errors.nic && <span className="v-add-incident-eroor">{errors.nic}</span>}
                            </div>
                            <div className="" style={{padding: '5px'}}>
                                <label style={{marginBottom: '5px'}}>Address:</label>
                                <input type="text" name="address" value={visitorData.address} onChange={handleChange} className={`v-form-input ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                                {errors.address && <span className="v-add-incident-eroor">{errors.address}</span>}
                            </div>
                            <div className="" style={{padding: '5px'}}>
                                <label style={{marginBottom: '5px'}}>Email:</label>
                                <input type="email" name="email" value={visitorData.email} onChange={handleChange} className={`v-form-input ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                                {errors.email && <span className="v-add-incident-eroor">{errors.email}</span>}
                            </div>
                            <div className="" style={{padding: '5px'}}>
                                <label style={{marginBottom: '5px'}}>Contact Number:</label>
                                <input type="text" name="contactNumber" value={visitorData.contactNumber} onChange={handleChange} className={`v-form-input ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                                {errors.contactNumber && <span className="v-add-incident-eroor">{errors.contactNumber}</span>}
                            </div>
                        </div>
                        {/* Right column */}
                        <div>
                            <div className="" style={{padding: '5px'}}>
                                <label style={{marginBottom: '5px'}}>Inmate Number:</label>
                                <input type="text" name="inmateNo" value={visitorData.inmateNo} onChange={handleChange} className={`v-form-input ${errors.inmateNo ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                                {errors.inmateNo && <span className="v-add-incident-eroor">{errors.inmateNo}</span>}
                            </div>
                            <div className="" style={{padding: '5px'}}>
                                <label style={{marginBottom: '5px'}}>Inmate Name:</label>
                                <input type="text" name="inmateName" value={visitorData.inmateName} onChange={handleChange} className={`v-form-input ${errors.inmateName ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                                {errors.inmateName && <span className="v-add-incident-eroor">{errors.inmateName}</span>}
                            </div>
                            <div className="" style={{padding: '5px'}}>
                                <label style={{marginBottom: '5px'}}>Date of Visit:</label>
                                <input type="date" name="dateOfVisit" value={visitorData.dateOfVisit} onChange={handleChange} className={`v-form-input ${errors.dateOfVisit ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                                {errors.dateOfVisit && <span className="v-add-incident-eroor">{errors.dateOfVisit}</span>}
                            </div>
                            <div className="" style={{padding: '5px'}}>
                                <label style={{marginBottom: '5px'}}>Time of Visit:</label>
                                <input type="time" name="timeOfVisit" value={visitorData.timeOfVisit} onChange={handleChange} className={`v-form-input ${errors.timeOfVisit ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                                {errors.timeOfVisit && <span className="v-add-incident-eroor">{errors.timeOfVisit}</span>}
                            </div>
                            <div className="" style={{padding: '5px'}}>
                                <label style={{marginBottom: '5px'}}>Purpose of Visit:</label>
                                <textarea name="purposeOfVisit" value={visitorData.purposeOfVisit} onChange={handleChange} className={`v-form-input ${errors.purposeOfVisit ? 'border-red-500' : 'border-gray-300'} rounded-md`} />
                                {errors.purposeOfVisit && <span className="v-add-incident-eroor">{errors.purposeOfVisit}</span>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end" style={{marginTop: "20px"}}>
                        <button type="submit" className='v-add-incident-button' style={{marginRight: '20px'}}>Update</button>
                        <button type="button" onClick={onClose} className='v-add-incident-button' style={{backgroundColor:"red"}}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateVisitor;
