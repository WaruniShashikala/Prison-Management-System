import React from 'react';
import './AddIncident.css';

const PersonalInformation = ({ securityStaffData, handleChange, errors }) => {
    return (
        <div>
            <h3 className=''>Personal Information</h3>
            <form>
                <div className=''>
                    <div className="add-sec-div">
                        <label className="text-gray-700">First Name:</label>
                        <div>
                            <input type="text" name="firstName" value={securityStaffData.firstName} onChange={handleChange} className={`form-border ${errors.firstName ? 'form-error-borde' : 'border-gray-300'} form-input`} />
                            {errors.firstName && <span className="add-incident-eroor">{errors.firstName}</span>}
                        </div>
                    </div>

                    <div className="add-sec-div">
                        <label className="text-gray-700">Last Name:</label>
                        <div>
                            <input type="text" name="lastName" value={securityStaffData.lastName} onChange={handleChange} className={`form-border ${errors.lastName ? 'form-error-borde' : 'border-gray-300'} form-input`} />
                            {errors.lastName && <span className="add-incident-eroor">{errors.lastName}</span>}
                        </div>
                    </div>
                </div>


                <div className="add-sec-div">
                    <label className="text-gray-700">Date of Birth:</label>
                    <div>
                        <input type="date" name="dateOfBirth" value={securityStaffData.dateOfBirth} onChange={handleChange} className={`form-border ${errors.dateOfBirth ? 'form-error-borde' : 'border-gray-300'} form-input`} />
                        {errors.dateOfBirth && <span className="add-incident-eroor">{errors.dateOfBirth}</span>}
                    </div>
                </div>

                <div className="add-sec-div">
                    <label className="text-gray-700">Gender:</label>
                    <select name="gender" value={securityStaffData.gender} onChange={handleChange} className={`form-border ${errors.gender ? 'form-error-borde' : 'border-gray-300'} form-input`}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <span className="add-incident-eroor">{errors.gender}</span>}
                </div>

                <div className="add-sec-div">
                    <label className="text-gray-700">NIC:</label>
                    <div>
                        <input type="text" name="nic" value={securityStaffData.nic} onChange={handleChange} className={`form-border ${errors.nic ? 'form-error-borde' : 'border-gray-300'} form-input`} />
                        {errors.nic && <span className="add-incident-eroor">{errors.nic}</span>}
                    </div>
                </div>

                <div className="add-sec-div">
                    <label className="text-gray-700">Phone:</label>
                    <div>
                        <input type="text" name="phone" value={securityStaffData.phone} onChange={handleChange} className={`form-border ${errors.phone ? 'form-error-borde' : 'border-gray-300'} form-input`} />
                        {errors.phone && <span className="add-incident-eroor">{errors.phone}</span>}
                    </div>
                </div>

                <div className="add-sec-div">
                    <label className="text-gray-700">Marital Status:</label>
                    <div>
                        <select name="maritalStatus" value={securityStaffData.maritalStatus} onChange={handleChange} className={`form-border ${errors.maritalStatus ? 'form-error-borde' : 'border-gray-300'} form-input`}>
                            <option value="">Select Marital Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                        </select>
                        {errors.maritalStatus && <span className="add-incident-eroor">{errors.maritalStatus}</span>}
                    </div>
                </div>

                <div className="add-sec-div">
                    <label className="text-gray-700">Religion:</label>
                    <div>
                        <input type="text" name="religion" value={securityStaffData.religion} onChange={handleChange} className={`form-border ${errors.religion ? 'form-error-borde' : 'border-gray-300'} form-input`} />
                        {errors.religion && <span className="add-incident-eroor">{errors.religion}</span>}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PersonalInformation;
