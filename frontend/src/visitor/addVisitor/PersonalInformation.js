import React from 'react';
import '../CssFiles/AllForm.css';

const PersonalInformation = ({ visitorData, handleChange, errors }) => {

    return (
        <div>
            <h3 >Personal Information</h3>
            <form>
                <div className='flex justify-between gap-4'>
                    <div className="v-add-sec-div">
                        <label className="text-gray-700">First Name:</label>
                        <div className="">
                            <input type="text" name="firstName" value={visitorData.firstName} onChange={handleChange} className={`border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} v-form-input`} />
                            {errors.firstName && <span className="v-add-incident-eroor">{errors.firstName}</span>}
                        </div>
                    </div>

                    <div className="v-add-sec-div">
                        <label className="text-gray-700">Last Name:</label>
                        <div>
                            <input type="text" name="lastName" value={visitorData.lastName} onChange={handleChange} className={`border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} v-form-input`} />
                            {errors.lastName && <span className="v-add-incident-eroor">{errors.lastName}</span>}
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between gap-4'>
                    <div className="v-add-sec-div">
                        <label className="text-gray-700">Date of Birth:</label>
                        <div>
                            <input type="date" name="dateOfBirth" value={visitorData.dateOfBirth} onChange={handleChange} className={`border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} v-form-input`} />
                            {errors.dateOfBirth && <span className="v-add-incident-eroor">{errors.dateOfBirth}</span>}
                        </div>
                    </div>

                    <div className="v-add-sec-div">
                        <label className="text-gray-700">Gender:</label>
                        <select name="gender" value={visitorData.gender} onChange={handleChange} className={`border ${errors.gender ? 'border-red-500' : 'border-gray-300'} v-form-input`}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && <span className="v-add-incident-eroor">{errors.gender}</span>}
                    </div>
                </div>

                <div className='flex items-center justify-between gap-4'>
                    <div className="v-add-sec-div">
                        <label className="text-gray-700">NIC:</label>
                        <div>
                            <input type="text" name="nic" value={visitorData.nic} onChange={handleChange} className={`border ${errors.nic ? 'border-red-500' : 'border-gray-300'} v-form-input`} />
                            {errors.nic && <span className="v-add-incident-eroor">{errors.nic}</span>}
                        </div>
                    </div>

                    <div className="v-add-sec-div">
                        <label className="text-gray-700">Address:</label>
                        <div>
                            <input type="text" name="address" value={visitorData.address} onChange={handleChange} className={`border ${errors.address ? 'border-red-500' : 'border-gray-300'} v-form-input`} />
                            {errors.address && <span className="v-add-incident-eroor">{errors.address}</span>}
                        </div>
                    </div>

                </div>

                <div className="v-add-sec-div">
                    <label className="text-gray-700">Email:</label>
                    <div>
                        <input type="email" name="email" value={visitorData.email} onChange={handleChange} className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} v-form-input`} />
                        {errors.email && <span className="v-add-incident-eroor">{errors.email}</span>}
                    </div>
                </div>

                <div className="v-add-sec-div">
                    <label className="text-gray-700">Contact Number:</label>
                    <div>
                        <input type="number" name="contactNumber" value={visitorData.contactNumber} onChange={handleChange} className={`border ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'} v-form-input`} />
                        {errors.contactNumber && <span className="v-add-incident-eroor">{errors.contactNumber}</span>}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PersonalInformation;
