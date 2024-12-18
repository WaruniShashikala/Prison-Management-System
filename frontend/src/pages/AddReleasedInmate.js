import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import "./releasedformStyle.css";

const { TextArea } = Input;

const AddReleasedInmate = ({ selectedInmate, updateInmate, onUpdate }) => {
    const [updatedInmateData, setUpdatedInmateData] = useState({
        status: '',
        realReleaseDate: '',
        releaseReason: '',
        releaseBy: '',
        confirmReleased: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any required field is empty
        if (!validateForm()) {
            return;
        }

        await updateInmate(selectedInmate._id, updatedInmateData);
        onUpdate(updatedInmateData);
        redirectToReleasedInmate();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInmateData({ ...updatedInmateData, [name]: value });
    };

    const validateForm = () => {
        // Check if any required field is empty
        const { status, realReleaseDate, releaseReason, releaseBy, confirmReleased } = updatedInmateData;
        if (!status || !realReleaseDate || !releaseReason || !releaseBy || !confirmReleased) {
            alert('Please fill out all required fields.');
            return false;
        }
        return true;
    };

    const redirectToReleasedInmate = () => {
        window.location.href = '/released';
    };

    return (
        <div className="releaseformContainer">
            <form onSubmit={handleSubmit}>
                
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={updatedInmateData.status}
                        onChange={handleInputChange}
                        required 
                    >
                        <option value="" disabled defaultValue>Select the status</option>
                        <option value="Current">Current</option>
                        <option value="Released">Released</option>
                        <option value="Wanted">Wanted</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="realReleaseDate">Real Release Date:</label>
                    <input
                        type="date"
                        id="realReleaseDate"
                        name="realReleaseDate"
                        value={updatedInmateData.realReleaseDate}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                {/* Release Reason */}
                <div>
                    <label htmlFor="releaseReason">Release Reason:</label>
                    <input
                        type="text"
                        id="releaseReason"
                        name="releaseReason"
                        value={updatedInmateData.releaseReason}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                {/* Release By */}
                <div>
                    <label htmlFor="releaseBy">Release By:</label>
                    <input
                        type="text"
                        id="releaseBy"
                        name="releaseBy"
                        value={updatedInmateData.releaseBy}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                {/* Confirm Released */}
                <div>
                    <label>Confirm Released:</label>
                    <div>
                        <label htmlFor="confirmReleasedYes">
                            <input
                                type="radio"
                                id="confirmReleasedYes"
                                name="confirmReleased"
                                value="Yes"
                                checked={updatedInmateData.confirmReleased === "Yes"}
                                onChange={handleInputChange}
                                required 
                            />
                            Yes
                        </label>
                    </div>
                    <div>
                        <label htmlFor="confirmReleasedNo">
                            <input
                                type="radio"
                                id="confirmReleasedNo"
                                name="confirmReleased"
                                value="No"
                                checked={updatedInmateData.confirmReleased === "No"}
                                onChange={handleInputChange}
                                required 
                            />
                            No
                        </label>
                    </div>
                </div>

                <button type="submit">Add to Released List</button>
            </form>
        </div>
    );
};

export default AddReleasedInmate;
