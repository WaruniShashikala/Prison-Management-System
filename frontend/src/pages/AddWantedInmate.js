import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import "./releasedformStyle.css";

const { TextArea } = Input;


const AddWantedInmate = ({ selectedInmate, updateInmate, onUpdate }) => {
    const [updatedInmateData, setUpdatedInmateData] = useState({
        status: '',
        escapedDate: '',
        escapedTime: '',
        escapedLocation: '',
        physicalDescription: '',
        clothingDescription: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateInmate(selectedInmate._id, updatedInmateData);
        onUpdate(updatedInmateData);
        redirectToWantedInmate();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInmateData({ ...updatedInmateData, [name]: value });
    };

    const redirectToWantedInmate = () => {
        window.location.href = '/wanted';
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
                {/* Escaped Date */}
                <div>
                    <label htmlFor="escapedDate">Escaped Date:</label>
                    <input
                        type="date"
                        id="escapedDate"
                        name="escapedDate"
                        value={updatedInmateData.escapedDate}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                {/* Escaped Time */}
                <div>
                    <label htmlFor="escapedTime">Escaped Time:</label>
                    <input
                        type="time"
                        id="escapedTime"
                        className="escapedTime"
                        name="escapedTime"
                        value={updatedInmateData.escapedTime}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                {/* Escaped Location */}
                <div>
                    <label htmlFor="escapedLocation">Escaped Location (prison name, city, state):</label>
                    <input
                        type="text"
                        id="escapedLocation"
                        name="escapedLocation"
                        value={updatedInmateData.escapedLocation}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                {/* Physical Description */}
                <div>
                    <label htmlFor="physicalDescription">Physical Description (height, weight, distinguishing features):</label>
                    <input
                        type="text"
                        id="physicalDescription"
                        name="physicalDescription"
                        value={updatedInmateData.physicalDescription}
                        onChange={handleInputChange}
                        required 
                    />
                </div>
                {/* Clothing description at the time of escape */}
                <div>
                    <label htmlFor="clothingDescription">Clothing description at the time of escape (if known):</label>
                    <input
                        type="text"
                        id="clothingDescription"
                        name="clothingDescription"
                        value={updatedInmateData.clothingDescription}
                        onChange={handleInputChange}
                        required 
                    />
                </div>


                <button type="submit">Add to Wanted List</button>
            </form>
        </div>
    );
};

export default AddWantedInmate;
