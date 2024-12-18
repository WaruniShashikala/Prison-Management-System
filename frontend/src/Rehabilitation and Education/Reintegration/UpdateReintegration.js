import React, { useState, useEffect } from 'react';
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/AllForm.css';

const UpdateReintegration = ({ isOpen, onClose, refreshList, reintegrationId }) => {
    const [reintegrationData, setReintegrationData] = useState({
        recordName: '',
        recordType: '',
        startDate: '',
        endDate: '',
        programLocation: '',
        programCoordinator: '',
        preferredLanguage: '',
        specialAccommodations: '',
        participation: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen && reintegrationId) {
            fetchReintegrationDetails(reintegrationId);
        }
    }, [isOpen, reintegrationId]);

    const fetchReintegrationDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/registration//${id}`);
            const reintegration = response.data;
            const startDate = new Date(reintegration.startDate).toISOString().split('T')[0];
            const endDate = new Date(reintegration.endDate).toISOString().split('T')[0];
            setReintegrationData({
                recordName: reintegration.recordName,
                recordType: reintegration.recordType,
                startDate: startDate,
                endDate: endDate,
                programLocation: reintegration.programLocation,
                programCoordinator: reintegration.programCoordinator,
                preferredLanguage: reintegration.preferredLanguage,
                specialAccommodations: reintegration.specialAccommodations,
                participation: reintegration.participation
            });
        } catch (error) {
            console.error('Error fetching reintegration details:', error);
        }
    };

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
            await axios.put(`http://localhost:3500/api/registration/update/${reintegrationId}`, reintegrationData);
            toast.success('Reintegration Successfully Updated ', {
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
            refreshList(); // Refresh the reintegration list
        } catch (error) {
            console.error('Error updating reintegration:', error);
        }
    };

    return (
        <div className={`r-add-incident-overlay ${isOpen ? 'r-inci' : 'r-inci-hide'}`}>
            <div className="r-add-incident-container" >
                <FaWindowClose size={25} color='red' onClick={onClose} className="r-add-incident-close" />
                <div>
                    <h2 >Update Reintegration Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="r-add-sec-div">
                            <label className="text-gray-700">Record Name:</label>
                            <div>
                                <input type="text" name="recordName" value={reintegrationData.recordName} onChange={handleChange} className={`border ${errors.recordName ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.recordName && <span className="r-add-incident-eroor">{errors.recordName}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label className="text-gray-700">Record Type:</label>
                            <div>
                                <input type="text" name="recordType" value={reintegrationData.recordType} onChange={handleChange} className={`border ${errors.recordType ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.recordType && <span className="r-add-incident-eroor">{errors.recordType}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label className="text-gray-700">Start Date:</label>
                            <div>
                                <input type="date" name="startDate" value={reintegrationData.startDate} onChange={handleChange} className={`border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.startDate && <span className="r-add-incident-eroor">{errors.startDate}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label className="text-gray-700">End Date:</label>
                            <div>
                                <input type="date" name="endDate" value={reintegrationData.endDate} onChange={handleChange} className={`border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.endDate && <span className="r-add-incident-eroor">{errors.endDate}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label className="text-gray-700">Program Location:</label>
                            <div>
                                <input type="text" name="programLocation" value={reintegrationData.programLocation} onChange={handleChange} className={`border ${errors.programLocation ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.programLocation && <span className="r-add-incident-eroor">{errors.programLocation}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label className="text-gray-700">Program Coordinator:</label>
                            <div>
                                <input type="text" name="programCoordinator" value={reintegrationData.programCoordinator} onChange={handleChange} className={`border ${errors.programCoordinator ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.programCoordinator && <span className="r-add-incident-eroor">{errors.programCoordinator}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label className="text-gray-700">Preferred Language:</label>
                            <div>
                                <input type="text" name="preferredLanguage" value={reintegrationData.preferredLanguage} onChange={handleChange} className={`border ${errors.preferredLanguage ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.preferredLanguage && <span className="r-add-incident-eroor">{errors.preferredLanguage}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label className="text-gray-700">Special Accommodations:</label>
                            <div>
                                <input type="text" name="specialAccommodations" value={reintegrationData.specialAccommodations} onChange={handleChange} className={`border ${errors.specialAccommodations ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.specialAccommodations && <span className="r-add-incident-eroor">{errors.specialAccommodations}</span>}
                            </div>
                        </div>

                        <div className="r-add-sec-div">
                            <label className="text-gray-700">Participation:</label>
                            <div>
                                <input type="text" name="participation" value={reintegrationData.participation} onChange={handleChange} className={`border ${errors.participation ? 'border-red-500' : 'border-gray-300'} r-border r-form-input`} />
                                {errors.participation && <span className="r-add-incident-eroor">{errors.participation}</span>}
                            </div>
                        </div>

                        <div >
                            <button type="submit" className="r-add-incident-button">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateReintegration;
