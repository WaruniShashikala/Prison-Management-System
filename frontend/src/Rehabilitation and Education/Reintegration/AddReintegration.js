import React, { useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/AllForm.css';

const AddReintegration = ({ isOpen, onClose, refreshList }) => {
    const [reintegrationData, setReintegrationData] = useState({
        recordName: '',
        recordType: '',
        startDate: '',
        endDate: '',
        programLocation: '',
        programCoordinator: '',
        preferredLanguage: '',
        specialAccommodations: '',
        participation: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReintegrationData({ ...reintegrationData, [name]: value });
    };

    const validateForm = () => {
        const errors = {};

        if (!reintegrationData.recordName.trim()) {
            errors.recordName = 'Record Name is required';
        }

        if (!reintegrationData.recordType.trim()) {
            errors.recordType = 'Record Type is required';
        }

        if (!reintegrationData.startDate) {
            errors.startDate = 'Start Date is required';
        }

        if (!reintegrationData.endDate) {
            errors.endDate = 'End Date is required';
        }

        if (!reintegrationData.programLocation.trim()) {
            errors.programLocation = 'Program Location is required';
        }

        if (!reintegrationData.programCoordinator.trim()) {
            errors.programCoordinator = 'Program Coordinator is required';
        }

        if (!reintegrationData.preferredLanguage.trim()) {
            errors.preferredLanguage = 'Preferred Language is required';
        }
        if (!reintegrationData.specialAccommodations.trim()) {
            errors.specialAccommodations = 'Special Accommodations is required';
        }

        if (!reintegrationData.participation.trim()) {
            errors.participation = 'Participation is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.post('http://localhost:3500/api/registration/add', reintegrationData);
            refreshList(); // Refresh the list after successful addition
            onClose(); // Close the modal after successful addition
            console.log('Reintegration added successfully');
            toast.success('Reintegration Successfully Added ', {
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
            setReintegrationData({
                recordName: '',
                recordType: '',
                startDate: '',
                endDate: '',
                programLocation: '',
                programCoordinator: '',
                preferredLanguage: '',
                specialAccommodations: '',
                participation: '',
            });
            setErrors({});
        } catch (error) {
            console.error('Error adding reintegration:', error.message);
        }
    };

    return (
        <div className={`r-add-incident-overlay ${isOpen ? 'r-inci' : 'r-inci-hide'}`}>
            <div className="r-add-incident-container" >
                <FaWindowClose size={25} color='red' onClick={onClose} className="r-add-incident-close" />
                <div>
                    <h2 className='p-4 text-xl font-semibold text-center'>Add New Reintegration</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="r-add-sec-div">
                            <label >Record Name:</label>
                            <div>
                                <input type="text" name="recordName" value={reintegrationData.recordName} onChange={handleChange} className={`border ${errors.recordName ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.recordName && <span className="r-add-incident-error">{errors.recordName}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label >Record Type:</label>
                            <div>
                                <input type="text" name="recordType" value={reintegrationData.recordType} onChange={handleChange} className={`border ${errors.recordType ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.recordType && <span className="r-add-incident-error">{errors.recordType}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label >Start Date:</label>
                            <div>
                                <input type="date" name="startDate" value={reintegrationData.startDate} onChange={handleChange} className={`border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.startDate && <span className="r-add-incident-error">{errors.startDate}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label >End Date:</label>
                            <div>
                                <input type="date" name="endDate" value={reintegrationData.endDate} onChange={handleChange} className={`border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.endDate && <span className="r-add-incident-error">{errors.endDate}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label >Program Location:</label>
                            <div>
                                <input type="text" name="programLocation" value={reintegrationData.programLocation} onChange={handleChange} className={`border ${errors.programLocation ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.programLocation && <span className="r-add-incident-error">{errors.programLocation}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label >Program Coordinator:</label>
                            <div>
                                <input type="text" name="programCoordinator" value={reintegrationData.programCoordinator} onChange={handleChange} className={`border ${errors.programCoordinator ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.programCoordinator && <span className="r-add-incident-error">{errors.programCoordinator}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label >Preferred Language:</label>
                            <div>
                                <select name="preferredLanguage" value={reintegrationData.preferredLanguage} onChange={handleChange} className={`border ${errors.preferredLanguage ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} >
                                    <option value="English">English</option>
                                    <option value="Sinhala">Sinhala</option>
                                    <option value="Tamil">Tamil</option>
                                </select>
                                {errors.preferredLanguage && <span className="r-add-incident-error">{errors.preferredLanguage}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label >Special Accommodations:</label>
                            <div>
                                <input type="text" name="specialAccommodations" value={reintegrationData.specialAccommodations} onChange={handleChange} className={`border ${errors.specialAccommodations ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.specialAccommodations && <span className="r-add-incident-error">{errors.specialAccommodations}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label >Participation:</label>
                            <div>
                                <input type="text" name="participation" value={reintegrationData.participation} onChange={handleChange} className={`border ${errors.participation ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.participation && <span className="r-add-incident-error">{errors.participation}</span>}
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

export default AddReintegration;
